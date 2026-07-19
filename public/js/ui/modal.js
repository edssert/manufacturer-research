/**
 * @module ui/modal
 * 카드형 상세 팝업(모달)의 열기/닫기 공통 프리미티브.
 * 모든 도메인이 공유하며, 모달 내부 마크업은 호출자(각 도메인의 view)가 공급한다.
 * [v1.8 모듈 분리] pane 내부 인터랙션 배선(wire*)은 ui/pane-interactions.js 로
 * 분리 — 이 파일은 모달 수명주기(열기/닫기/모바일 뒤로가기 스택)만 담당한다.
 *
 * 관련 CSS: css/components/modal.css (.modal-overlay, .modal)
 * 닫기 경로: 배경 클릭 · ESC 키 · [data-modal-close] 버튼 클릭
 */
import { clearItemRoute } from "../core/router.js";
import { wirePaneInteractions, removeScrollbarTrack } from "./pane-interactions.js";

let modalBgEl, modalEl;

// [모바일 전용] 데스크탑 Split View 대신 "전체 교체 + 뒤로가기" 방식을 쓸 때
// 이전 모달 내용을 쌓아두는 스택. { color, headHTML, bodyHTML, onMounted }
// 항목 — onMounted 는 그 화면을 원래 열었던 쪽이 넘긴 배선 콜백(예: 스피커
// 모달의 앰프 행 클릭 배선)을 그대로 저장해뒀다가 뒤로가기로 복원할 때 다시
// 실행한다. 모바일에서만 채워지고, 데스크탑 폭에서는 항상 비어있다(뒤로가기
// 버튼도 그래서 안 보임).
let mobileStack = [];
// 현재 modalEl 에 실제로 렌더된 원본 콘텐츠 — DOM 에서 역추출(outerHTML)하면
// 그 사이 추가된 뒤로가기 버튼 등 부산물까지 섞여 들어가 취약하므로, 렌더할
// 때 쓴 문자열 자체를 별도로 계속 들고 있는다(다음 push 때 이 값을 스택에
// 넣는다).
let currentContent = null;

/**
 * 현재 화면 폭이 모바일 브레이크포인트인지 판정 — split-view.css 의 세로
 * 스택 전환 기준(860px)과 동일한 값을 쓴다. 리사이즈 도중 경계값을 오갈 수
 * 있어 호출마다 매번 새로 판정한다(캐시하지 않음).
 * @returns {boolean}
 */
export function isMobileLayout() {
  return window.matchMedia("(max-width: 860px)").matches;
}

/**
 * 모달 시스템 초기화 — 앱 시작 시 1회 호출 (main.js).
 * @param {string} [bgId="modalbg"] 오버레이 요소 id
 * @param {string} [modalId="modal"] 모달 본체 요소 id
 * @returns {{modalBgEl: HTMLElement, modalEl: HTMLElement}}
 */
export function initModal(bgId = "modalbg", modalId = "modal") {
  modalBgEl = document.getElementById(bgId);
  modalEl = document.getElementById(modalId);
  // [사용자 요청] Split View 가 열려있을 땐 배경 클릭 한 번에 전체가 닫히지
  // 않고, 오른쪽 pane2 부터 먼저 닫힌 뒤 그 다음 클릭에 왼쪽 단일 모달이
  // 닫힌다 — splitViewCloser 가 pane2 를 닫았으면(true) 거기서 멈추고,
  // 닫을 pane2 가 없었으면(false, 스플릿뷰가 아예 없거나 이미 pane1만
  // 남은 상태) 기존처럼 모달 전체를 닫는다.
  modalBgEl.addEventListener("click", e => {
    if (e.target !== modalBgEl) return;
    if (splitViewCloser && splitViewCloser()) return;
    closeModal();
  });
  // [사용자 요청] 라이트박스(wireMediaLightbox)가 떠 있을 때 ESC 를 누르면
  // 라이트박스만 닫히고 뒤의 상세 모달까지 함께 닫히지 않아야 한다 —
  // 라이트박스가 있으면 그것만 제거하고 return, 없을 때만 기존처럼 모달을 닫는다.
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    const lightbox = document.querySelector(".media-lightbox");
    if (lightbox) { lightbox.remove(); return; }
    closeModal();
  });
  return { modalBgEl, modalEl };
}

/**
 * 모달을 지정한 내용으로 열기.
 * @param {string} color 제조사 색상 (CSS 변수 --mfr 로 주입, 예: "var(--la)")
 * @param {string} headHTML 헤더 영역 마크업 (.modal__head)
 * @param {string} bodyHTML 본문 영역 마크업 (.modal__body)
 * @param {string} [extraClass] 모달에 추가할 변경자 클래스 (선택)
 */
export function openModalWith(color, headHTML, bodyHTML, extraClass) {
  // [버그 방지] 이전에 Split View(.modal--split + .split-view 구조)가 열려
  // 있던 상태로 모달이 닫혔다가 다시 열리는 경우, className/innerHTML 을
  // 아래에서 전부 새로 쓰므로 잔재는 남지 않지만 혹시 모를 경합을 막기 위해
  // 명시적으로도 초기화한다.
  // [사용자 요청] 카드 목록에서 완전히 새 모달을 여는 진입점이므로 이전
  // 세션의 모바일 뒤로가기 스택도 함께 비운다 — 스택이 남아있으면 이번에
  // 새로 연 모달에 관계없는 이전 카드의 "뒤로가기"가 뜨는 문제를 방지.
  mobileStack = [];
  modalEl.className = "modal modal--pop-in" + (extraClass ? " " + extraClass : "");
  modalEl.style.setProperty("--mfr", color);
  modalEl.innerHTML = headHTML + bodyHTML;
  currentContent = { color, headHTML, bodyHTML, onMounted: null };
  modalBgEl.classList.add("modal-overlay--open");
  // [버그 수정] body 만 잠그면 html 자체가 overflow-y: scroll(base.css,
  // 스크롤바 자리 고정용)이라 여전히 스크롤됐다 — html 도 함께 잠가야
  // 모달이 열린 동안 배경(카드 그리드) 스크롤이 완전히 막힌다.
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden"; // 배경 스크롤 잠금
  // [버그 수정] modalEl 은 매번 innerHTML 만 갈아끼우는 재사용 DOM 노드라
  // 브라우저가 이전에 쌓인 scrollTop 을 그대로 기억한다 — 오버레이가 아직
  // display:none 인 시점(modal-overlay--open 클래스 추가 전)에 scrollTop=0
  // 을 대입하면 Chrome 이 그 뒤 다시 보이는 순간 이전 스크롤 위치를
  // 복원해버려 리셋이 무효화됐다. 오버레이를 연 *뒤에* 대입해야 확실히
  // 반영된다.
  modalEl.scrollTop = 0;
  const closeBtn = modalEl.querySelector("[data-modal-close]");
  if (closeBtn) closeBtn.onclick = closeModal;
  wirePaneInteractions(modalEl);
  renderBackButton();
}

/**
 * 모바일 레이아웃에서 Split View 대신 쓰는 "전체 교체" 진입점.
 * 현재 모달 내용(원본 문자열 그대로, DOM 역추출 아님)을 뒤로가기 스택에
 * 쌓아두고, 모달 전체를 새 콘텐츠로 바꾼다(데스크탑의
 * openSplitPane/replaceSplitPane1 이 호출하는 공용 함수 — split-view.js 가
 * 폭을 보고 이 함수로 위임한다).
 * @param {string} color 새 콘텐츠의 --mfr 색상
 * @param {string} headHTML 새 콘텐츠 헤더
 * @param {string} bodyHTML 새 콘텐츠 본문
 * @param {Function} [onMounted] 새 콘텐츠 DOM 이 붙은 직후 modalEl 을 인자로 호출
 */
export function pushMobileModal(color, headHTML, bodyHTML, onMounted) {
  if (currentContent) mobileStack.push(currentContent);
  modalEl.style.setProperty("--mfr", color);
  modalEl.innerHTML = headHTML + bodyHTML;
  currentContent = { color, headHTML, bodyHTML, onMounted: onMounted || null };
  const closeBtn = modalEl.querySelector("[data-modal-close]");
  if (closeBtn) closeBtn.onclick = closeModal;
  wirePaneInteractions(modalEl);
  if (onMounted) onMounted(modalEl);
  renderBackButton();
}

/**
 * 모바일 뒤로가기 스택의 마지막 항목을 복원한다. 스택이 비어있으면 아무
 * 일도 하지 않는다(뒤로가기 버튼 자체가 이 경우 안 보이므로 정상적으로는
 * 호출되지 않는다). 복원된 화면의 원래 onMounted 콜백(예: 앰프/스피커 행
 * 클릭 배선)도 함께 다시 실행해 다음 클릭이 정상 동작하도록 한다.
 */
function popMobileModal() {
  const prev = mobileStack.pop();
  if (!prev) return;
  modalEl.style.setProperty("--mfr", prev.color);
  modalEl.innerHTML = prev.headHTML + prev.bodyHTML;
  currentContent = prev;
  const closeBtn = modalEl.querySelector("[data-modal-close]");
  if (closeBtn) closeBtn.onclick = closeModal;
  wirePaneInteractions(modalEl);
  if (prev.onMounted) prev.onMounted(modalEl);
  renderBackButton();
}

/**
 * 모달 헤더 좌측(닫기 X 의 반대편)에 뒤로가기 버튼을 그린다 — 스택에 이전
 * 항목이 있을 때만 보인다. openModalWith/pushMobileModal/popMobileModal 이
 * 모달 내용을 바꿀 때마다 다시 호출해 버튼 유무·클릭 대상을 최신 상태로
 * 맞춘다.
 */
function renderBackButton() {
  const head = modalEl.querySelector(".modal__head");
  if (!head) return;
  const existing = head.querySelector("[data-modal-back]");
  if (existing) existing.remove();
  // [브라우저 호환] CSS :has() 선택자 없이도 동작하도록, 뒤로가기 버튼
  // 유무를 head 자체의 클래스로도 표시해 eyebrow/제목 줄 왼쪽 여백을 튼다.
  head.classList.toggle("modal__head--has-back", mobileStack.length > 0);
  if (!mobileStack.length) return;
  const btn = document.createElement("button");
  btn.className = "modal__back";
  btn.type = "button";
  btn.setAttribute("data-modal-back", "");
  btn.setAttribute("aria-label", "뒤로가기");
  btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>`;
  btn.onclick = () => popMobileModal();
  head.appendChild(btn);
}

// [사용자 요청] 배경(모달 바깥) 클릭 시 — Split View 가 열려있으면 오른쪽
// pane2 만 먼저 닫고, pane2 가 없으면(또는 이미 닫힌 뒤 한 번 더 클릭하면)
// 그제서야 모달 전체를 닫는다. split-view.js 의 closeSplitView 를 콜백
// 슬롯 패턴으로 등록받는다 — modal.js 가 split-view.js 를 직접 import 하면
// 순환 import 가 생기기 때문이다.
let splitViewCloser = null;

/**
 * split-view.js 가 앱 초기화 시 1회 호출해 "Split View pane2만 닫기" 구현을
 * 등록한다.
 * @param {() => boolean} closer pane2 가 있어서 닫았으면 true, 없어서 아무
 *   일도 하지 않았으면 false 를 반환해야 한다.
 */
export function setSplitViewCloser(closer) {
  splitViewCloser = closer;
}

/**
 * 모달 닫기 (배경 스크롤 잠금 해제 포함).
 * Split View 가 열려 있었다면 함께 정리 — 닫혔다 다시 열릴 때 이전 pane 구조가
 * 남아 있다가 다음 모달과 뒤섞여 보이는 문제를 방지한다.
 */
export function closeModal() {
  modalBgEl.classList.remove("modal-overlay--open");
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  if (modalEl) {
    modalEl.classList.remove("modal--split");
    const splitView = modalEl.querySelector(".split-view");
    if (splitView) {
      // pane1(head+body)만 다시 모달 최상위로 꺼내고 나머지(.split-view, pane2)는 제거.
      const pane1 = splitView.querySelector(".split-view__pane");
      const pane2 = splitView.querySelector(".split-view__pane:nth-child(2)");
      // [커스텀 스크롤바] pane1/pane2 기준으로 body 에 붙어있던 트랙은
      // pane 자체가 사라지면 고아로 남으므로 함께 정리한다.
      removeScrollbarTrack(pane1);
      removeScrollbarTrack(pane2);
      if (pane1) {
        while (pane1.firstChild) modalEl.appendChild(pane1.firstChild);
      }
      splitView.remove();
    }
    removeScrollbarTrack(modalEl);
  }
  // [모바일] 모달을 완전히 닫으면 뒤로가기 스택도 함께 비운다 — 다음에
  // 다른 카드를 열었을 때 이전 세션의 스택이 남아있지 않도록.
  mobileStack = [];
  currentContent = null;
  // [모달 라우팅] X 버튼·ESC·배경 클릭으로 닫힐 때 해시의 카드 id 부분을
  // 지워 URL 을 목록 상태(#speakers 등)로 되돌린다. 뒤로가기로 닫힌
  // 경우에는 라우터가 이미 activeItem 을 비운 뒤라 no-op(중복 안전).
  clearItemRoute();
}

/**
 * 현재 모달 본체 요소 반환 — split-view.js 가 pane 래핑에 사용.
 * @returns {HTMLElement}
 */
export function getModalEl() {
  return modalEl;
}

/**
 * 공용 닫기(X) 아이콘 SVG 문자열.
 * @returns {string}
 */
export function closeIconSVG() {
  return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>`;
}
