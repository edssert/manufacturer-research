/**
 * @module ui/media-toggle
 * [사용자 요청] 모든 탭(Speaker/Amplifier/DSP/Software/Accessories) 카드의
 * 사진(card__media)을 한 번에 숨겼다 보이게 하는 전역 토글. theme.js(라이트/
 * 다크 모드)와 동일 패턴 — <body class="hide-media">로 css/components/
 * card.css의 규칙을 활성화하고, 클릭 시 localStorage에 저장해 새로고침 후에도
 * 유지한다. 특정 도메인에 종속되지 않는 body 레벨 클래스라 도메인 컨트롤러를
 * 건드리지 않고 index.html 한 곳(버튼)만 추가하면 전 탭에 자동 적용된다.
 */
const STORAGE_KEY = "mr-hide-media";

function isHidden() {
  return document.body.classList.contains("hide-media");
}

function applyButtonState(btn) {
  const hidden = isHidden();
  btn.setAttribute("aria-pressed", String(hidden));
}

/**
 * 저장된 선호를 즉시 적용한다(FOUC 방지, initMediaToggle 이전에 호출해도 됨).
 */
export function applyStoredMediaPref() {
  try {
    if (localStorage.getItem(STORAGE_KEY) === "1") document.body.classList.add("hide-media");
  } catch (e) { /* 저장 실패해도 기본값(표시)로 계속 */ }
}

/**
 * 토글 버튼을 초기화하고 클릭 이벤트를 연결한다.
 * @param {HTMLElement} btn #media-toggle 버튼
 */
export function initMediaToggle(btn) {
  if (!btn) return;
  applyButtonState(btn);
  btn.addEventListener("click", () => {
    document.body.classList.toggle("hide-media");
    try { localStorage.setItem(STORAGE_KEY, isHidden() ? "1" : "0"); } catch (e) { /* 저장 실패해도 전환 자체는 유지 */ }
    applyButtonState(btn);
  });
}
