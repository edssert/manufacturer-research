/**
 * @module ui/section-nav
 * 화면 왼쪽 섹션 내비게이션(스크롤스파이) — 도메인 비의존.
 *
 * 결과 영역에 렌더된 `.card-group` 섹션들을 읽어 좌측 고정 레일에 목록을
 * 만들고, 스크롤 위치에 따라 현재 섹션을 강조한다. 항목 클릭 시 해당
 * 섹션으로 부드럽게 이동한다.
 *
 * [구현 선택] gumshoe·@fsegurai/scrollspy 같은 기존 스크롤스파이 라이브러리를
 * 검토했으나 둘 다 scroll 이벤트 리스너 기반이라(스크롤마다 모든 섹션의
 * getBoundingClientRect 계산) IntersectionObserver 를 쓰는 편이 더 가볍고
 * 정확하다. 이 앱은 번들러 없이 ESM 을 그대로 불러오고 런타임 의존성이
 * 없으므로 vendor 파일을 추가하지 않고 네이티브 API 로 구현한다.
 *
 * [재렌더 대응] renderGrid 는 필터/정렬이 바뀔 때마다 결과 영역을 통째로 다시
 * 그린다 — 그때마다 이 모듈의 build() 가 다시 호출되며, 이전 observer 는
 * disconnect 로 정리한다.
 *
 * 관련 CSS: css/components/section-nav.css
 */
import { $, esc } from "../core/dom.js";

let observer = null;
/** 섹션 요소 → 레일 링크 */
let linkOf = new Map();
/** 현재 화면에 걸쳐 있는 섹션들 (관측 트리거용) */
let visible = new Set();
/** 현재 레일이 가리키는 섹션 목록 — 스크롤 종료 후 재판정에 쓴다 */
let sectionsRef = [];

const RAIL_ID = "section-nav";

/**
 * 스크롤해도 화면 위에 남는 요소들의 총 높이.
 * 상단 고정 대상은 topbar(로고 바, position: relative)가 아니라 **topnav +
 * 현재 탭의 controls(검색/필터 바)** 다 — 둘 다 position: sticky.
 * 이 높이만큼 비켜야 섹션 헤딩이 바 아래에 가리지 않는다.
 * @returns {number} px
 */
function stickyOffset() {
  const nav = document.getElementById("topnav");
  const navH = nav ? nav.offsetHeight : 0;
  // 탭마다 자기 .controls 를 갖고 있고 숨겨진 탭의 것은 offsetParent 가 null.
  const ctrl = [...document.querySelectorAll(".controls")].find(el => el.offsetParent !== null);
  return navH + (ctrl ? ctrl.offsetHeight : 0);
}

/**
 * [사용자 요청] 섹션이 적어 스크롤바가 안 생기는 탭에서는 하위 분류를 처음부터
 * 펼쳐 둔다(스피커처럼 섹션이 많은 탭만 호버로 펼침).
 *
 * 판단은 어림이 아니라 실측으로 한다 — 전부 펼친 상태를 잠깐 적용해 레일이
 * 넘치는지(scrollHeight > clientHeight) 보고 결정한다. 측정 동안에는
 * transition 을 꺼서 펼침 애니메이션이 중간 높이로 측정되는 것을 막는다.
 * @param {HTMLElement} rail
 */
function applyAutoExpand(rail) {
  // 좁은 화면에서는 레일이 display:none 이라 측정이 무의미하다(resize 시 재계산).
  // [버그 수정] offsetParent 로 판정하면 안 된다 — 레일은 position: fixed 라
  // 화면에 보이더라도 offsetParent 가 항상 null 이어서 측정이 통째로 건너뛰어졌다.
  // 실제 렌더 박스 유무(offsetWidth/Height)로 본다.
  if (!rail.offsetWidth && !rail.offsetHeight) return;
  rail.classList.add("section-nav--measuring", "section-nav--expanded");
  const fits = rail.scrollHeight <= rail.clientHeight;
  rail.classList.toggle("section-nav--expanded", fits);
  void rail.offsetHeight; // 리플로우 강제 — 결정된 상태가 애니메이션 없이 확정
  rail.classList.remove("section-nav--measuring");
}

/** 레일 DOM 을 최초 1회 만들어 두고 재사용한다. */
function railEl() {
  let el = document.getElementById(RAIL_ID);
  if (!el) {
    el = document.createElement("nav");
    el.id = RAIL_ID;
    el.className = "section-nav";
    el.setAttribute("aria-label", "섹션 이동");
    document.body.appendChild(el);
  }
  return el;
}

/**
 * 지금 보고 있는 섹션을 표시한다.
 *
 * 판정은 "고정 바 기준선을 지나간 마지막 섹션" — 즉 top 이 기준선 위로
 * 올라온 것 중 문서상 가장 뒤엣것이다. 이전에는 "관측 밴드에 걸친 첫 섹션"을
 * 썼는데 두 가지가 어긋났다:
 *   1) 페이지 맨 아래에서는 마지막 섹션이 밴드를 지나쳐 버려 영영 활성이 안 됐다
 *      (스크롤이 더 내려갈 수 없어 밴드 안으로 들어오질 못한다).
 *   2) 클릭으로 이동한 직후 밴드에 여러 섹션이 걸리면 의도한 섹션이 아니라
 *      그 뒤의 섹션이 잡히기도 했다.
 * @param {HTMLElement[]} sections 문서 순서의 .card-group 목록
 */
function syncActive(sections) {
  // 클릭 이동은 섹션 top 을 기준선에 딱 맞춘다(scrollToSection). 그런데 실제
  // 렌더 위치는 소수점 픽셀이라 top 이 기준선을 0.x px 넘기는 일이 흔했고,
  // 그러면 방금 이동한 섹션이 판정에서 탈락해 직전 섹션이 활성으로 남았다
  // — 경계에 여유(TOL)를 둔다.
  const TOL = 4;
  const line = stickyOffset() + 12 + TOL;
  let active = null;
  for (const s of sections) {
    if (s.getBoundingClientRect().top <= line) active = s;
    else break;
  }
  // 아직 첫 섹션에도 못 미친 최상단이면 첫 섹션을 활성으로 본다.
  if (!active) active = sections[0] || null;
  let activeGroup = null;
  linkOf.forEach((link, sec) => {
    const on = sec === active;
    link.classList.toggle("section-nav__link--active", on);
    if (on) {
      link.setAttribute("aria-current", "true");
      activeGroup = link.closest(".section-nav__group");
    } else {
      link.removeAttribute("aria-current");
    }
  });
  // 활성 항목이 속한 제조사 그룹에 표시를 남긴다(접힌 상태에서도 위치를 알 수
  // 있게). 펼침은 건드리지 않는다 — 스크롤 중 높이가 출렁이지 않도록.
  // 그룹 상태는 링크 순회와 분리해서 정한다 — 순회 중에 토글하면 활성 항목
  // 뒤의 비활성 형제가 방금 켠 플래그를 도로 끈다.
  const rail = document.getElementById(RAIL_ID);
  rail?.querySelectorAll(".section-nav__group").forEach(g => {
    g.classList.toggle("section-nav__group--active", g === activeGroup);
  });
}

/**
 * 마지막 섹션도 화면 상단까지 끌어올릴 수 있도록 결과 영역 아래에 여유를 준다.
 *
 * 이게 없으면 페이지가 더 내려갈 수 없어 마지막 섹션이 기준선 위로 올라오지
 * 못한다 — 내비게이션에서 그 항목을 눌러도 화면이 움직이지 않고 활성 표시도
 * 붙지 않는다. 필요한 만큼만(마지막 섹션이 짧을 때만) 준다.
 * @param {HTMLElement} resultsEl
 * @param {HTMLElement[]} sections
 */
function padForLastSection(resultsEl, sections, railVisible) {
  const last = sections[sections.length - 1];
  if (!resultsEl || !last) return;
  // 레일이 안 보이는 좁은 화면에서는 이 여유가 빈 공간일 뿐이다.
  if (!railVisible) { resultsEl.style.paddingBottom = ""; return; }
  const need = window.innerHeight - stickyOffset() - last.offsetHeight - 24;
  resultsEl.style.paddingBottom = need > 0 ? `${Math.round(need)}px` : "";
}

/** 스크롤이 끝난 뒤 활성 표시를 다시 계산한다(프로그램 스크롤 대응). */
function nudgeActive() {
  if (sectionsRef.length) syncActive(sectionsRef);
}

/**
 * 부드러운 스크롤로 섹션 상단을 고정 바 아래에 맞춘다.
 * @param {HTMLElement} sec 이동할 .card-group
 */
function scrollToSection(sec) {
  if (sec.classList.contains("card-group--collapsed")) {
    sec.querySelector(".card-group__head")?.click();
  }
  // scrollIntoView 는 고정 바 높이를 모른다 — 직접 계산해 그만큼 위로 더
  // 올린다. 모션 토글(body.reduce-motion)이 켜져 있으면 부드러운 스크롤도
  // 꺼야 한다(CSS 의 transition/animation 차단은 JS 스크롤에 영향 없음).
  const smooth = !document.body.classList.contains("reduce-motion");
  const top = sec.getBoundingClientRect().top + window.scrollY - stickyOffset() - 12;
  window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
  // 스크롤이 멎은 뒤 한 번 더 판정한다 — 목적지 근처에서는 섹션이 관측
  // 경계를 새로 넘지 않아 IntersectionObserver 콜백이 안 올 수 있다.
  if ("onscrollend" in window) window.addEventListener("scrollend", nudgeActive, { once: true });
  else setTimeout(nudgeActive, smooth ? 420 : 30);
}

/**
 * 섹션들을 제조사 배지 기준으로 묶는다(배지가 없으면 단일 묶음).
 * @param {HTMLElement[]} sections
 * @returns {{badge: string, items: HTMLElement[]}[]}
 */
function groupByBadge(sections) {
  const out = [];
  sections.forEach(sec => {
    const badge = sec.querySelector(".card-group__badge")?.textContent.trim() || "";
    const last = out[out.length - 1];
    if (last && last.badge === badge) last.items.push(sec);
    else out.push({ badge, items: [sec] });
  });
  return out;
}

/**
 * 링크 요소 하나를 만든다.
 * @param {string} label 표시 텍스트
 * @param {string} modifier BEM 변경자 접미 ("group" | "sub" | "")
 * @param {Function} onClick 클릭 핸들러
 */
function linkEl(label, modifier, onClick) {
  const a = document.createElement("a");
  a.className = "section-nav__link" + (modifier ? ` section-nav__link--${modifier}` : "");
  a.href = "#";
  a.innerHTML = `<span class="section-nav__title">${esc(label)}</span>`;
  a.addEventListener("click", e => { e.preventDefault(); onClick(); });
  return a;
}

/**
 * 결과 영역의 섹션들로 좌측 레일을 다시 만든다.
 * 섹션이 2개 미만이면(그룹핑이 없거나 결과가 적음) 레일을 숨긴다.
 * @param {HTMLElement} resultsEl 섹션(.card-group)들이 들어 있는 컨테이너
 */
export function buildSectionNav(resultsEl) {
  const rail = railEl();
  if (observer) { observer.disconnect(); observer = null; }
  linkOf = new Map();
  visible = new Set();

  const sections = resultsEl ? [...resultsEl.querySelectorAll(".card-group")] : [];
  sectionsRef = sections;
  if (sections.length < 2) {
    rail.hidden = true;
    rail.innerHTML = "";
    if (resultsEl) resultsEl.style.paddingBottom = "";
    return;
  }

  rail.hidden = false;
  rail.innerHTML = `<ul class="section-nav__list"></ul>`;
  const list = rail.querySelector(".section-nav__list");

  // 제조사 배지가 있는 보기(제조사별)에서는 제조사만 목록에 내놓고 하위
  // 분류는 호버(또는 그 그룹이 활성일 때) 시 펼친다. 배지가 없는 보기
  // (분류별)에서는 평면 목록 그대로.
  groupByBadge(sections).forEach(({ badge, items }) => {
    const li = document.createElement("li");

    if (!badge) {
      items.forEach(sec => {
        const title = sec.querySelector(".card-group__title")?.textContent.trim() || "";
        const a = linkEl(title, "", () => scrollToSection(sec));
        linkOf.set(sec, a);
        const row = document.createElement("li");
        row.appendChild(a);
        list.appendChild(row);
      });
      return;
    }

    li.className = "section-nav__group";
    // 제조사 링크는 그 제조사의 첫 섹션으로 이동한다.
    li.appendChild(linkEl(badge, "group", () => scrollToSection(items[0])));

    const wrap = document.createElement("div");
    wrap.className = "section-nav__sub-wrap";
    const sub = document.createElement("ul");
    sub.className = "section-nav__sub";
    items.forEach(sec => {
      const title = sec.querySelector(".card-group__title")?.textContent.trim() || "";
      const a = linkEl(title, "sub", () => scrollToSection(sec));
      linkOf.set(sec, a);
      const row = document.createElement("li");
      row.appendChild(a);
      sub.appendChild(row);
    });
    wrap.appendChild(sub);
    li.appendChild(wrap);
    list.appendChild(li);
  });

  // 스크롤바가 안 생길 만큼 짧으면 하위 분류를 처음부터 펼쳐 둔다.
  applyAutoExpand(rail);
  // 마지막 섹션도 상단까지 올릴 수 있도록 여유를 준다(레일이 보일 때만).
  padForLastSection(resultsEl, sections, !!(rail.offsetWidth || rail.offsetHeight));

  // IntersectionObserver 가 없는 환경(구형 브라우저·테스트 러너)에서는 스파이
  // 없이 레일만 둔다 — 목록·클릭 이동은 그대로 쓸 수 있다.
  if (typeof IntersectionObserver === "undefined") return;

  // 상단 고정 바(topnav + controls)에 가리는 만큼 관측 영역 위쪽을 깎는다.
  observer = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) visible.add(en.target); else visible.delete(en.target);
    });
    syncActive(sections);
  }, { rootMargin: `-${stickyOffset() + 8}px 0px -55% 0px`, threshold: 0 });

  sections.forEach(s => observer.observe(s));
  syncActive(sections);
}

/**
 * 창 크기가 바뀌면 레일 노출 여부·높이가 달라진다 — 자동펼침 판정을 다시 한다.
 * 모듈 로드 시 1회만 등록한다.
 */
if (typeof window !== "undefined") {
  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const rail = document.getElementById(RAIL_ID);
      if (rail && !rail.hidden) applyAutoExpand(rail);
    }, 150);
  });
}

/** 탭을 벗어날 때 등 레일을 감추고 관측을 정리한다. */
export function clearSectionNav() {
  if (observer) { observer.disconnect(); observer = null; }
  linkOf = new Map();
  visible = new Set();
  sectionsRef = [];
  const rail = document.getElementById(RAIL_ID);
  if (rail) { rail.hidden = true; rail.innerHTML = ""; }
}
