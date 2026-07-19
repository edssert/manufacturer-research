/**
 * @module ui/motion-toggle
 * [사용자 요청] 라이트/다크 모드·사진 숨기기 토글과 같은 패턴의 전역
 * 애니메이션/트랜지션 켜기·끄기 스위치 — <body class="reduce-motion">를
 * 토글해 css/base.css의 전역 규칙(모든 transition/animation을 즉시 종료
 * 처리)을 활성화한다. localStorage에 저장해 새로고침 후에도 유지된다.
 */
const STORAGE_KEY = "mr-reduce-motion";

function isReduced() {
  return document.body.classList.contains("reduce-motion");
}

function applyButtonState(btn) {
  const reduced = isReduced();
  btn.setAttribute("aria-pressed", String(reduced));
}

/**
 * 저장된 선호를 즉시 적용한다(FOUC 방지, initMotionToggle 이전에 호출해도 됨).
 */
export function applyStoredMotionPref() {
  try {
    if (localStorage.getItem(STORAGE_KEY) === "1") document.body.classList.add("reduce-motion");
  } catch (e) { /* 저장 실패해도 기본값(모션 켜짐)으로 계속 */ }
}

/**
 * 토글 버튼을 초기화하고 클릭 이벤트를 연결한다.
 * @param {HTMLElement} btn #motion-toggle 버튼
 */
export function initMotionToggle(btn) {
  if (!btn) return;
  applyButtonState(btn);
  btn.addEventListener("click", () => {
    document.body.classList.toggle("reduce-motion");
    try { localStorage.setItem(STORAGE_KEY, isReduced() ? "1" : "0"); } catch (e) { /* 저장 실패해도 전환 자체는 유지 */ }
    applyButtonState(btn);
  });
}
