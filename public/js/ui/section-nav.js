/** @module ui/section-nav */
import { esc } from "../core/dom.js";

/** 섹션 요소 → 레일 링크 */
let linkOf = new Map();
/** 현재 레일이 가리키는 섹션 목록 (문서 순서) */
let sectionsRef = [];
/** 섹션들의 문서상 y 좌표 캐시 — 매 프레임 레이아웃을 읽지 않기 위함 */
let sectionTops = [];
/** 상단 고정 바 총 높이 캐시 (measure 에서 갱신) */
let stickyH = 0;
/** 스크롤 위치를 따라 미끄러지는 표시 막대 */
let markerEl = null;
/** 결과 영역 참조 — 레이아웃이 바뀌면 좌표 캐시를 다시 잡아야 한다 */
let resultsRef = null;
/** 결과 영역 크기 감시자 */
let resultsRO = null;
/** 마지막으로 반영한 정수 활성 인덱스 — 바뀔 때만 클래스/다이얼을 손댄다 */
let lastActiveIdx = -1;

const RAIL_ID = "section-nav";

/**
 * 스크롤해도 화면 위에 남는 세 바(topbar + topnav + 현재 탭 controls)의 총
 * 높이 — 이만큼 비켜야 섹션 헤딩이 바 아래에 가리지 않는다.
 * @returns {number} px
 */
function stickyOffset() {
  const bar = /** @type {HTMLElement|null} */ (document.querySelector(".topbar"));
  const nav = document.getElementById("topnav");
  // 탭마다 자기 .controls 를 갖고 있고 숨겨진 탭의 것은 offsetParent 가 null.
  const ctrl = /** @type {HTMLElement[]} */ ([...document.querySelectorAll(".controls")])
    .find(el => el.offsetParent !== null);
  return (bar ? bar.offsetHeight : 0) + (nav ? nav.offsetHeight : 0) + (ctrl ? ctrl.offsetHeight : 0);
}

/**
 * 지금 이 순간 상단 바들이 실제로 끝나는 화면 y 좌표.
 * stickyOffset() 은 "붙어 있을 때의 높이"(고정값)라 다르다 — topbar 는 문서
 * 흐름에 있어 최상단에서는 아래로 밀려 있다가 스크롤하면 걷혀 올라간다.
 * @returns {number} px
 */
function barsBottomOnScreen() {
  const ctrl = /** @type {HTMLElement[]} */ ([...document.querySelectorAll(".controls")])
    .find(el => el.offsetParent !== null);
  const el = ctrl || document.getElementById("topnav");
  return el ? Math.max(0, el.getBoundingClientRect().bottom) : 0;
}

/**
 * 레일이 차지할 세로 띠의 top 을 실측값으로 묶는다.
 *
 * vh 기반(top:50% + height:70vh)으로 두면 브라우저를 확대할 때 바들이 차지하는
 * 비율이 커져 레일 윗부분이 그 아래로 가린다(레일 z-index 20 < controls 40).
 * 실측한 화면 좌표를 CSS 변수로 넘기면 배율과 무관하게 항상 바 아래에서 시작한다.
 * @param {HTMLElement} rail
 */
function applyRailBounds(rail) {
  // 고정값이 아니라 barsBottomOnScreen 을 따라간다 — topbar 가 걷혀 올라갈 때
  // 레일도 같이 움직여야 최상단에서 가리지 않는다(스크롤 핸들러가 갱신).
  // 24px 는 본문 첫 섹션 제목과 눈높이를 맞추는 여유.
  rail.style.setProperty("--rail-top", `${Math.round(barsBottomOnScreen()) + 24}px`);
}

/** 다이얼 초점에서 이만큼 떨어지면 더 이상 작아지지 않는다(CSS calc 과 짝). */
const DIAL_MAX = 4;
/** 섹션 순서대로의 링크 목록 — 다이얼 거리 계산용 */
let dialLinks = [];

/**
 * 초점에서의 거리를 각 링크에 --d 로 넣는다(CSS 가 글자·불투명도를 계산).
 *
 * 초점은 정수가 아니라 소수다 — 크기 변화가 계단이 아니라 흐름으로 보여야
 * 하므로. CSS 트랜지션에 기대지 않고 매 프레임 직접 값을 넣는다(트랜지션을
 * 걸면 매 프레임 갱신과 겹쳐 한 박자 늦게 뭉개진다).
 * @param {number} focus 소수 초점 위치(예: 3.42 = 4번째 섹션을 42% 지난 지점)
 */
function applyDial(focus) {
  dialLinks.forEach((link, i) => {
    if (!link) return;
    const d = Math.min(DIAL_MAX, Math.abs(i - focus));
    // 소수 둘째 자리면 충분하다 — 그 이상은 눈에 안 보이면서 스타일 문자열만 길어진다.
    link.style.setProperty("--d", d.toFixed(2));
  });
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
 * 섹션들의 문서상 y 좌표와 고정 바 높이를 다시 잰다.
 * 매 프레임 레이아웃을 읽지 않기 위한 캐시 — 빌드·리사이즈 때만 부른다.
 */
function measure() {
  stickyH = stickyOffset();
  const y = window.scrollY;
  sectionTops = sectionsRef.map(s => s.getBoundingClientRect().top + y);
}

/**
 * 본문 레이아웃이 바뀐 뒤 좌표 캐시와 표시를 다시 잡는다.
 * 카드 섹션을 접으면 문서가 짧아지는데 캐시는 "펼쳐진 높이" 그대로여서, 끝까지
 * 스크롤해도 활성 섹션이 중간에서 멈춘다. 마지막 섹션용 여백도 함께 다시 잡는다.
 */
function refreshLayout() {
  if (!sectionsRef.length) return;
  const rail = document.getElementById(RAIL_ID);
  padForLastSection(resultsRef, sectionsRef, !!(rail && (rail.offsetWidth || rail.offsetHeight)));
  measure();
  updateSpy();
}

/**
 * 지금 스크롤 위치가 섹션 목록의 어디쯤인지 소수로 계산한다.
 *
 * 정수부는 "지금 보고 있는 섹션"(기준선을 지나간 마지막 섹션), 소수부는 그
 * 섹션을 얼마나 지나왔는지(다음 섹션까지의 진행률)다. 표시 막대를 이 소수
 * 위치로 옮기면 스크롤과 같은 속도로 미끄러진다.
 * @returns {{idx: number, frac: number}}
 */
function scrollPos() {
  // 클릭 이동은 섹션 top 을 기준선에 딱 맞춘다(scrollToSection). 실제 렌더
  // 위치는 소수점 픽셀이라 기준선을 0.x px 넘기는 일이 흔해, 방금 이동한 섹션이
  // 판정에서 탈락하곤 했다 — 경계에 여유(TOL)를 둔다.
  const TOL = 4;
  const line = window.scrollY + stickyH + 12 + TOL;
  let idx = 0;
  for (let i = 0; i < sectionTops.length; i++) {
    if (sectionTops[i] <= line) idx = i;
    else break;
  }
  const cur = sectionTops[idx];
  const next = sectionTops[idx + 1];
  // 마지막 섹션엔 "다음"이 없다 — 진행률을 0 으로 두고 막대를 그 항목에 붙인다.
  const span = next != null ? next - cur : 0;
  const frac = span > 0 ? Math.min(1, Math.max(0, (line - cur) / span)) : 0;
  return { idx, frac };
}

/**
 * 링크가 화면에서 "실제로 보이는" 세로 범위를 화면 좌표로 돌려준다.
 *
 * 브랜드 접힘은 래퍼를 0 높이로 만들어 잘라내는 방식(grid 0fr + overflow:hidden)
 * 인데, 잘려 안 보이는 동안에도 링크 자신의 좌표는 펼쳤을 때 값 그대로다 —
 * getBoundingClientRect 는 조상의 클리핑을 반영하지 않는다. 그래서 잘라내는
 * 주체(.section-nav__sub)의 범위로 교차시켜야 막대가 엉뚱한 자리로 튀지 않는다.
 * 완전히 가려졌으면 그 브랜드 헤더를 가리킨다("이 브랜드 안을 보고 있다").
 * @param {HTMLElement|null|undefined} link
 * @returns {{top: number, height: number}|null}
 */
function visibleSpan(link) {
  if (!link) return null;
  const r = link.getBoundingClientRect();
  const clip = link.closest(".section-nav__sub");
  if (!clip) return { top: r.top, height: r.height };
  const c = clip.getBoundingClientRect();
  const top = Math.max(r.top, c.top);
  const bottom = Math.min(r.bottom, c.bottom);
  if (bottom - top > 1) return { top, height: bottom - top };
  const head = link.closest(".section-nav__group")?.querySelector(".section-nav__link--group");
  if (!head) return null;
  const h = head.getBoundingClientRect();
  return { top: h.top, height: h.height };
}

/**
 * 표시 막대를 두 링크 사이 소수 위치로 옮긴다.
 *
 * 좌표는 화면 기준으로 읽어 목록 기준으로 환산한다 — 레일이 자체 스크롤될 때도
 * 보정이 필요 없다. 모션 off 면 소수 보간을 버리고 현재 항목에 딱 붙인다.
 * @param {number} idx 정수 인덱스
 * @param {number} frac 0~1 진행률
 */
function placeMarker(idx, frac) {
  if (!markerEl) return;
  const a = visibleSpan(dialLinks[idx]);
  if (!a) { markerEl.style.opacity = "0"; return; }
  const b = visibleSpan(dialLinks[idx + 1]) || a;
  const f = document.body.classList.contains("reduce-motion") ? 0 : frac;
  const listTop = markerEl.parentElement.getBoundingClientRect().top;
  const top = a.top + (b.top - a.top) * f - listTop;
  const h = a.height + (b.height - a.height) * f;
  markerEl.style.opacity = h > 0.5 ? "1" : "0";
  markerEl.style.transform = `translateY(${Math.round(top)}px)`;
  markerEl.style.height = `${Math.max(0, Math.round(h))}px`;
}

/**
 * 스크롤 위치를 읽어 활성 표시·다이얼·표시 막대를 갱신한다.
 *
 * 다이얼과 막대는 매 프레임 소수 위치로 갱신하고(연속적으로 흐르게), 클래스
 * 토글(활성 항목·활성 그룹)만 정수 인덱스가 실제로 바뀌었을 때 건드린다 —
 * 클래스는 상태 표시라 중간값이 없고, 매 프레임 토글할 이유도 없다.
 */
function updateSpy() {
  if (!sectionsRef.length) return;
  const { idx, frac } = scrollPos();
  if (idx !== lastActiveIdx) {
    lastActiveIdx = idx;
    const active = sectionsRef[idx];
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
    // 그룹 상태는 링크 순회와 분리해서 정한다 — 순회 중에 토글하면 활성 항목
    // 뒤의 비활성 형제가 방금 켠 플래그를 도로 끈다.
    const rail = document.getElementById(RAIL_ID);
    rail?.querySelectorAll(".section-nav__group").forEach(g => {
      g.classList.toggle("section-nav__group--active", g === activeGroup);
    });
  }
  // 모션 off 면 섹션 단위로 끊는다 — 스크롤에 맞춰 흐르는 것 자체가 모션이다.
  const reduce = document.body.classList.contains("reduce-motion");
  applyDial(reduce ? idx : idx + frac);
  placeMarker(idx, frac);
}

/**
 * 마지막 섹션도 화면 상단까지 끌어올릴 수 있도록 결과 영역 아래에 여유를 준다.
 * 없으면 페이지가 더 내려가지 않아 그 항목을 눌러도 화면이 안 움직이고 활성
 * 표시도 안 붙는다. 필요한 만큼만(마지막 섹션이 짧을 때만) 준다.
 * @param {HTMLElement} resultsEl
 * @param {HTMLElement[]} sections
 */
function padForLastSection(resultsEl, sections, railVisible) {
  const last = sections[sections.length - 1];
  if (!resultsEl || !last) return;
  // 레일이 안 보이는 좁은 화면에서는 이 여유가 빈 공간일 뿐이다.
  const next = railVisible
    ? (() => {
        const need = window.innerHeight - stickyOffset() - last.offsetHeight - 24;
        return need > 0 ? `${Math.round(need)}px` : "";
      })()
    : "";
  // 값이 같으면 쓰지 않는다 — 이 여백을 쓰면 결과 영역 크기가 바뀌어
  // ResizeObserver(refreshLayout)가 다시 돌기 때문에, 같은 값을 계속 쓰면
  // 관찰 → 쓰기 → 관찰 이 끝없이 이어질 수 있다.
  if (resultsEl.style.paddingBottom !== next) resultsEl.style.paddingBottom = next;
}

/** 레일 안 레이아웃 애니메이션을 따라가는 rAF 핸들 */
let trackRaf = null;

/**
 * 레일 안쪽 레이아웃이 애니메이션되는 동안 표시를 계속 다시 잡는다.
 * 브랜드 접기는 스크롤 없이 레일 안 좌표만 바꾸므로 막대가 옛 자리에 남고,
 * 0.24s 트랜지션이라 한 번 다시 읽어서는 중간 좌표를 잡는다.
 * @param {number} ms 따라갈 시간 (CSS 트랜지션보다 조금 넉넉하게)
 */
function trackRailChange(ms = 320) {
  if (trackRaf) cancelAnimationFrame(trackRaf);
  const end = performance.now() + ms;
  const tick = now => {
    updateSpy();
    trackRaf = now < end ? requestAnimationFrame(tick) : null;
  };
  trackRaf = requestAnimationFrame(tick);
}

/**
 * 섹션 상단을 고정 바 아래에 맞춰 이동한다.
 * 모션 토글이 켜져 있으면 즉시 이동한다 — CSS 의 transition 차단은 JS
 * 스크롤에 영향이 없어 여기서 따로 처리해야 한다.
 * @param {HTMLElement} sec 이동할 .card-group
 */
function scrollToSection(sec) {
  if (sec.classList.contains("card-group--collapsed")) {
    /** @type {HTMLElement|null} */ (sec.querySelector(".card-group__head"))?.click();
  }
  // scrollIntoView 는 고정 바 높이를 모른다 — 그만큼 위로 더 올린다.
  const top = Math.max(0, Math.round(sec.getBoundingClientRect().top + window.scrollY - stickyOffset() - 12));
  const behavior = document.body.classList.contains("reduce-motion") ? "auto" : "smooth";
  window.scrollTo({ top, behavior });
  updateSpy();
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
 * 접어 둔 제조사 배지 목록.
 * 모듈 수준에 두는 이유: 레일은 필터/정렬마다 통째로 다시 만들어지므로
 * (buildSectionNav) DOM 에만 두면 접어 둔 상태가 매번 풀린다. clearSectionNav
 * 에서도 비우지 않는다.
 * @type {Set<string>}
 */
const collapsedBrands = new Set();

/**
 * 제조사 헤더 줄(제목 링크 + 접기 버튼)을 만든다.
 * @param {string} badge 제조사 배지 텍스트
 * @param {HTMLElement} firstSection 제목 링크가 이동할 첫 섹션
 * @param {HTMLElement} li 이 헤더가 속한 .section-nav__group
 */
function groupHeadEl(badge, firstSection, li) {
  const head = document.createElement("div");
  head.className = "section-nav__group-head";
  head.appendChild(linkEl(badge, "group", () => scrollToSection(firstSection)));

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "section-nav__fold";
  btn.setAttribute("aria-label", `${badge} 하위 목록 접기/펼치기`);
  btn.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>`;
  const sync = () => {
    const collapsed = collapsedBrands.has(badge);
    li.classList.toggle("section-nav__group--collapsed", collapsed);
    btn.setAttribute("aria-expanded", String(!collapsed));
  };
  btn.addEventListener("click", () => {
    if (collapsedBrands.has(badge)) collapsedBrands.delete(badge);
    else collapsedBrands.add(badge);
    sync();
    // 접힘/펼침 애니메이션 동안 링크 좌표가 계속 바뀐다 — 표시 막대를 따라붙인다.
    trackRailChange();
  });
  sync();
  head.appendChild(btn);
  return head;
}

/**
 * 결과 영역의 섹션들로 좌측 레일을 다시 만든다.
 * 섹션이 2개 미만이면(그룹핑이 없거나 결과가 적음) 레일을 숨긴다.
 * @param {HTMLElement} resultsEl 섹션(.card-group)들이 들어 있는 컨테이너
 */
export function buildSectionNav(resultsEl) {
  const rail = railEl();
  linkOf = new Map();
  lastActiveIdx = -1;

  const sections = resultsEl
    ? /** @type {HTMLElement[]} */ ([...resultsEl.querySelectorAll(".card-group")])
    : [];
  sectionsRef = sections;
  resultsRef = resultsEl || null;
  if (sections.length < 2) {
    rail.hidden = true;
    rail.innerHTML = "";
    markerEl = null;
    if (resultsRO) { resultsRO.disconnect(); resultsRO = null; }
    if (resultsEl) resultsEl.style.paddingBottom = "";
    return;
  }

  rail.hidden = false;
  rail.innerHTML = `<ul class="section-nav__list"><i class="section-nav__marker" aria-hidden="true"></i></ul>`;
  const list = rail.querySelector(".section-nav__list");
  markerEl = rail.querySelector(".section-nav__marker");

  // 제조사 배지가 있는 보기(제조사별)에서는 제조사 헤더 아래 하위 분류를
  // 모두 내놓는다 — 접기/펼치기는 없고 다이얼(거리별 크기)로 정리한다.
  // 배지가 없는 보기(분류별)에서는 평면 목록 그대로.
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
    // 제목 링크(그 제조사의 첫 섹션으로 이동) + 접기 버튼을 한 줄에 둔다.
    li.appendChild(groupHeadEl(badge, items[0], li));

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

  // 다이얼 대상 링크를 섹션 순서대로 모아 둔다(거리 계산의 기준 순서).
  dialLinks = sections.map(sec => linkOf.get(sec) || null);
  dialLinks.forEach(a => a?.classList.add("section-nav__link--dial"));
  applyDial(0);

  // 레일 띠를 sticky 바 아래로 묶는다.
  applyRailBounds(rail);
  // 마지막 섹션도 상단까지 올릴 수 있도록 여유를 준다(레일이 보일 때만).
  padForLastSection(resultsEl, sections, !!(rail.offsetWidth || rail.offsetHeight));

  // 좌표 캐시를 잡고 현재 위치를 즉시 반영한다.
  measure();
  updateSpy();

  // 카드 섹션 접기·이미지 로드 등으로 본문 높이가 바뀌는 일은 스크롤 없이
  // 일어난다 — 결과 영역 크기를 직접 감시해 캐시를 다시 잡는다(도메인 쪽에
  // 통지 코드를 심지 않아도 되고 원인을 가리지 않는다).
  if (resultsRO) { resultsRO.disconnect(); resultsRO = null; }
  if (typeof ResizeObserver !== "undefined" && resultsEl) {
    resultsRO = new ResizeObserver(() => refreshLayout());
    resultsRO.observe(resultsEl);
  }
}

/**
 * 창 크기가 바뀌면 레일 노출 여부·높이가 달라진다 — 자동펼침 판정을 다시 한다.
 * 모듈 로드 시 1회만 등록한다.
 */
if (typeof window !== "undefined") {
  // 스크롤스파이 본체 — 표시 막대가 스크롤과 같은 속도로 미끄러져야 하므로
  // 프레임마다 갱신하되, rAF 로 묶어 프레임당 한 번만 계산한다.
  let spyRaf = null;
  window.addEventListener("scroll", () => {
    if (spyRaf) return;
    spyRaf = requestAnimationFrame(() => {
      spyRaf = null;
      const rail = document.getElementById(RAIL_ID);
      if (!rail || rail.hidden) return;
      applyRailBounds(rail);
      updateSpy();
    });
  }, { passive: true });

  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const rail = document.getElementById(RAIL_ID);
      if (!rail || rail.hidden) return;
      // 확대/축소도 resize 로 잡힌다 — sticky 바 높이와 섹션 좌표가 모두 달라진다.
      applyRailBounds(rail);
      refreshLayout();
    }, 150);
  });
}

/** 탭을 벗어날 때 등 레일을 감추고 관측을 정리한다. */
export function clearSectionNav() {
  linkOf = new Map();
  sectionsRef = [];
  sectionTops = [];
  dialLinks = [];
  lastActiveIdx = -1;
  markerEl = null;
  resultsRef = null;
  if (resultsRO) { resultsRO.disconnect(); resultsRO = null; }
  if (trackRaf) { cancelAnimationFrame(trackRaf); trackRaf = null; }
  const rail = document.getElementById(RAIL_ID);
  if (rail) { rail.hidden = true; rail.innerHTML = ""; }
}
