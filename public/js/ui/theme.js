/**
 * @module ui/theme
 * [사용자 요청] 라이트/다크 모드 토글 — <html data-theme="light"> 속성으로
 * css/tokens.css 의 [data-theme="light"] 변수 세트를 활성화한다.
 * FOUC 방지용 초기 적용은 index.html 의 인라인 스크립트가 이미 처리했으므로,
 * 여기서는 버튼 클릭 시 전환 + localStorage 저장만 담당한다.
 * 기본값은 항상 dark(사용자 확인) — 저장된 값이 없으면 dark 로 표시.
 */
const STORAGE_KEY = "mr-theme";

function isLight() {
  return document.documentElement.getAttribute("data-theme") === "light";
}

function applyButtonState(btn) {
  const light = isLight();
  btn.setAttribute("aria-pressed", String(light));
}

/**
 * 토글 버튼을 초기화하고 클릭 이벤트를 연결한다.
 * @param {HTMLElement} btn #theme-toggle 버튼
 */
export function initTheme(btn) {
  if (!btn) return;
  applyButtonState(btn);
  btn.addEventListener("click", () => {
    const next = isLight() ? "dark" : "light";
    if (next === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* 저장 실패해도 전환 자체는 유지 */ }
    applyButtonState(btn);
  });
}
