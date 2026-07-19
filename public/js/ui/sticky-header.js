/**
 * @module ui/sticky-header
 * [사용자 요청] 도메인 탭 바(topnav)가 스크롤해도 계속 보이도록 상단
 * 고정 — 검색/필터 바(controls)는 topnav 바로 아래 이어 붙어야 하는데
 * topnav 높이는 고정값이 아니다(반응형 줄바꿈 등) — CSS 만으로는 정확한
 * 값을 알 수 없어, 이 모듈이 실제 렌더링된 topnav 높이를 측정해 :root 의
 * --topnav-h CSS 변수에 반영한다(css/components/controls.css 가
 * top: var(--topnav-h) 로 참조). 창 크기 변경으로 높이가 바뀔 때마다
 * (ResizeObserver) 다시 계산한다.
 * [참고] topbar(로고/토글 바)는 스크롤 고정 대상이 아니라 이 모듈에서
 * 다루지 않는다(css/layout.css .topbar 는 position: relative 그대로).
 */

/**
 * topnav 요소 높이를 측정해 CSS 변수(--topnav-h)를 갱신한다.
 * @param {HTMLElement} topnavEl
 */
function updateStickyVars(topnavEl) {
  document.documentElement.style.setProperty("--topnav-h", `${topnavEl.offsetHeight}px`);
}

/**
 * topnav 상단 고정 높이 동기화를 초기화한다. main.js가 부팅 시 1회 호출.
 * @param {HTMLElement} topnavEl #topnav
 */
export function initStickyHeader(topnavEl) {
  if (!topnavEl) return;
  const update = () => updateStickyVars(topnavEl);
  update();
  if (typeof ResizeObserver !== "undefined") {
    const ro = new ResizeObserver(update);
    ro.observe(topnavEl);
  } else {
    window.addEventListener("resize", update);
  }
}
