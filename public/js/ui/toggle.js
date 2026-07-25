/**
 * @module ui/toggle
 * 상단 도구 바(topnav__tools, js/ui/nav.js 가 마크업 생성)의 켜기/끄기 버튼들.
 *
 * 라이트모드·사진 숨기기·모션 끄기 세 토글이 "표식을 붙였다 뗀다
 * + localStorage 저장 + 버튼 aria-pressed 동기화"라는 완전히 같은 동작이라
 * 파일 3개(ui/theme.js · ui/media-toggle.js · ui/motion-toggle.js)를 여기
 * 하나로 합쳤다. 표식을 어디에 붙이는지만 다르다 — 테마는
 * <html data-theme="light">(css/tokens.css 의 변수 세트), 나머지 둘은
 * <body class="...">(css/base.css · css/components/card.css 의 규칙).
 */

const store = (key, val) => { try { localStorage.setItem(key, val); } catch (e) { /* 저장 실패해도 전환 자체는 유지 */ } };
const read = (key) => { try { return localStorage.getItem(key); } catch (e) { return null; } };

/**
 * 버튼 하나에 토글 동작을 연결한다 — 클릭 시 상태를 뒤집고 aria-pressed 를
 * 현재 상태에 맞춘다(CSS 가 이 속성을 읽어 아이콘 on/off 를 바꾼다).
 * @param {HTMLElement} btn 토글 버튼 (없으면 아무 일도 하지 않음)
 * @param {() => boolean} isOn 지금 켜져 있는지
 * @param {(on: boolean) => void} setOn 상태 적용(DOM 표식 + 저장)
 */
function wire(btn, isOn, setOn) {
  if (!btn) return;
  const sync = () => btn.setAttribute("aria-pressed", String(isOn()));
  sync();
  btn.addEventListener("click", () => { setOn(!isOn()); sync(); });
}

/**
 * body 클래스로 표현되는 토글(사진 숨기기·모션 끄기)의 공통 구현.
 * @param {HTMLElement} btn 토글 버튼
 * @param {string} key localStorage 키
 * @param {string} cls body 에 붙일 클래스명
 */
function bodyClassToggle(btn, key, cls) {
  wire(btn, () => document.body.classList.contains(cls), on => {
    document.body.classList.toggle(cls, on);
    store(key, on ? "1" : "0");
  });
}

/**
 * 라이트/다크 모드 토글. 저장된 선호의 최초 적용은 index.html
 * 인라인 스크립트가 이미 처리했으므로(FOUC 방지) 여기서는 전환만 담당한다.
 * 기본값은 항상 dark — 저장된 값이 없으면 속성을 안 붙인 :root 그대로.
 * @param {HTMLElement} btn #theme-toggle
 */
export function initTheme(btn) {
  const root = document.documentElement;
  wire(btn, () => root.getAttribute("data-theme") === "light", on => {
    if (on) root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
    store("mr-theme", on ? "light" : "dark");
  });
}

/**
 * 전 탭 카드 사진 숨기기 토글. 저장된 선호의 최초 적용은
 * index.html 인라인 스크립트가 처리한다(사진이 잠깐 보였다 사라지는 것 방지).
 * @param {HTMLElement} btn #media-toggle
 */
export function initMediaToggle(btn) {
  bodyClassToggle(btn, "mr-hide-media", "hide-media");
}

/**
 * 전역 애니메이션/트랜지션 끄기 토글.
 * 이전에는 저장만 하고 읽는 쪽(applyStoredMotionPref)을 아무도
 * 호출하지 않아 새로고침하면 설정이 풀렸다 — 모션 차단은 늦게 적용돼도
 * 깜빡임이 없으므로(테마/사진과 달리 index.html 인라인이 필요 없다) 여기서
 * 읽어 적용한다.
 * @param {HTMLElement} btn #motion-toggle
 */
export function initMotionToggle(btn) {
  if (read("mr-reduce-motion") === "1") document.body.classList.add("reduce-motion");
  bodyClassToggle(btn, "mr-reduce-motion", "reduce-motion");
}
