/**
 * @module ui/sticky-header
 * 최상단 로고 바(topbar) · 도메인 탭 바(topnav) · 검색/필터 바
 * (controls) 세 줄이 모두 스크롤해도 계속 보이도록 상단 고정된다. 아래 두 바는
 * 위 바들이 차지한 높이만큼 top 을 내려야 정확히 이어 붙는데, 그 높이는
 * 고정값이 아니다(반응형 줄바꿈, 브랜드 목록 길이 등) — 이 모듈이 실제 렌더된
 * 높이를 측정해 :root 의 --topbar-h / --topnav-h 에 반영한다
 * (css/layout.css 의 .topnav, css/components/controls.css 의 .controls 가 참조).
 * 높이가 바뀔 때마다(ResizeObserver) 다시 계산한다.
 */

/**
 * 두 바의 높이를 측정해 CSS 변수로 내보낸다.
 * @param {HTMLElement|null} topbarEl
 * @param {HTMLElement|null} topnavEl
 */
function updateStickyVars(topbarEl, topnavEl) {
  const root = document.documentElement.style;
  if (topbarEl) root.setProperty("--topbar-h", `${topbarEl.offsetHeight}px`);
  if (topnavEl) root.setProperty("--topnav-h", `${topnavEl.offsetHeight}px`);
}

/**
 * 상단 고정 바 높이 동기화를 초기화한다. main.js가 부팅 시 1회 호출.
 * @param {HTMLElement} topnavEl #topnav
 */
export function initStickyHeader(topnavEl) {
  const topbarEl = /** @type {HTMLElement|null} */ (document.querySelector(".topbar"));
  if (!topnavEl && !topbarEl) return;
  const update = () => updateStickyVars(topbarEl, topnavEl);
  update();
  if (typeof ResizeObserver !== "undefined") {
    const ro = new ResizeObserver(update);
    if (topbarEl) ro.observe(topbarEl);
    if (topnavEl) ro.observe(topnavEl);
  } else {
    window.addEventListener("resize", update);
  }
}
