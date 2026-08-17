/** @module ui/modal */
import { clearItemRoute, clearPane2Route, setPane2Route } from "../core/router.js";
import { wirePaneInteractions, removeScrollbarTrack } from "./pane-interactions.js";

let modalBgEl, modalEl;
const DIALOG_TITLE_ID = "modal-dialog-title";
const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[contenteditable='true']",
  "[tabindex]:not([tabindex='-1'])",
].join(",");
const FOCUS_TOKEN_ATTRIBUTES = [
  "data-amp-id",
  "data-speaker-id",
  "data-accessory-id",
  "data-software-id",
  "data-dsp-id",
  "data-view-switch",
  "data-toggle-group",
  "data-modal-close",
  "data-modal-back",
];
let returnFocusEl = null;
let inertBackground = [];
let scrollLockState = null;

// [모바일] Split View 대신 "전체 교체 + 뒤로가기"를 쓸 때 이전 화면을 쌓는
// 스택 { color, headHTML, bodyHTML, onMounted }. onMounted 까지 함께 저장해야
// 뒤로가기로 복원한 화면의 클릭 배선이 되살아난다. 데스크탑에선 항상 비어 있다.
let mobileStack = [];
// 지금 렌더된 원본 콘텐츠 문자열. DOM 에서 outerHTML 로 역추출하면 그 사이
// 추가된 뒤로가기 버튼 같은 부산물이 섞이므로 렌더에 쓴 문자열을 들고 있는다.
let currentContent = null;

/** 현재 모달과 Split View pane에 연결된 body 오버레이 트랙을 모두 정리한다. */
function removeModalScrollbarTracks() {
  if (!modalEl) return;
  modalEl.querySelectorAll(".split-view__pane").forEach(removeScrollbarTrack);
  removeScrollbarTrack(modalEl);
}

/** 모바일 화면 스택의 시각 상태와 라우터 pane2 상태를 함께 맞춘다. */
function syncMobilePaneRoute(pane2Spec) {
  if (pane2Spec) setPane2Route(pane2Spec);
  else clearPane2Route();
}

function clearDetailMetadata() {
  if (!modalEl) return;
  delete modalEl.dataset.detailId;
  delete modalEl.dataset.detailKind;
}

/** @returns {boolean} 오버레이가 사용자에게 열린 상태인지 여부 */
function isModalOpen() {
  return !!modalBgEl && modalBgEl.classList.contains("modal-overlay--open");
}

/** hidden/inert 조상 안의 요소에는 포커스를 돌려보내지 않는다. */
function cannotReceiveFocus(el) {
  if (!(el instanceof HTMLElement) || !el.isConnected || el.matches(":disabled")) return true;
  for (let node = el; node && node !== document.body; node = node.parentElement) {
    if (node.hidden || node.hasAttribute("inert") || node.getAttribute("aria-hidden") === "true") return true;
  }
  return false;
}

/** 실제 탭 순서에 참여할 수 있는 자손만 반환한다. */
function focusableElements(root) {
  if (!root) return [];
  return [...root.querySelectorAll(FOCUSABLE_SELECTOR)].filter(el => el.tabIndex >= 0 && !cannotReceiveFocus(el));
}

function focusElement(el) {
  if (cannotReceiveFocus(el)) return false;
  try {
    el.focus({ preventScroll: true });
  } catch {
    el.focus();
  }
  return document.activeElement === el;
}

/**
 * 새 pane은 제목부터 읽게 하고, 제목이 없으면 닫기 버튼과 pane 자체 순으로
 * 폴백한다. 제목의 tabindex=-1은 일반 탭 순서를 늘리지 않고 프로그램 방식
 * 포커스만 허용한다.
 * @param {HTMLElement} root
 */
export function focusModalRegion(root) {
  if (!root) return;
  const title = /** @type {HTMLElement|null} */ (root.querySelector(".modal__title"));
  if (title) {
    title.tabIndex = -1;
    if (focusElement(title)) return;
  }
  const closeBtn = root.querySelector("[data-modal-close]");
  if (focusElement(closeBtn)) return;
  if (!root.hasAttribute("tabindex")) root.tabIndex = -1;
  focusElement(root);
}

/**
 * pane을 연 요소로 포커스를 복원하되, 그 요소가 교체되었으면 남은 pane의
 * 제목으로 이동한다.
 * @param {HTMLElement|null} target
 * @param {HTMLElement|null} fallbackRoot
 */
export function restoreModalFocus(target, fallbackRoot = modalEl) {
  if (focusElement(target)) return;
  if (isModalOpen()) focusModalRegion(fallbackRoot);
}

/** 모바일 콘텐츠 재생성 뒤 같은 관계 행/버튼을 찾기 위한 안정적인 토큰. */
function captureFocusToken(root) {
  const active = document.activeElement;
  if (!(active instanceof HTMLElement) || !root.contains(active)) return null;
  if (active.id) return { kind: "id", value: active.id };
  for (const name of FOCUS_TOKEN_ATTRIBUTES) {
    if (active.hasAttribute(name)) return { kind: "attribute", name, value: active.getAttribute(name) };
  }
  const index = focusableElements(root).indexOf(active);
  return index >= 0 ? { kind: "index", value: index } : null;
}

function resolveFocusToken(root, token) {
  if (!root || !token) return null;
  if (token.kind === "id") {
    const candidate = document.getElementById(token.value);
    return candidate && root.contains(candidate) ? candidate : null;
  }
  if (token.kind === "attribute") {
    const candidates = [...root.querySelectorAll(`[${token.name}]`)].filter(
      el => el.getAttribute(token.name) === token.value,
    );
    return candidates.find(el => el.tabIndex >= 0 && !cannotReceiveFocus(el)) || candidates[0] || null;
  }
  if (token.kind === "index") return focusableElements(root)[token.value] || null;
  return null;
}

/** pane 1의 제목 하나만 dialog 이름으로 연결한다. */
export function refreshModalLabel() {
  if (!modalBgEl || !modalEl) return;
  modalEl.querySelectorAll(`[id="${DIALOG_TITLE_ID}"]`).forEach(el => el.removeAttribute("id"));
  const primaryPane = modalEl.querySelector(".split-view__pane:first-child") || modalEl;
  const title =
    primaryPane.querySelector(".modal__title") ||
    primaryPane.querySelector(".modal__head .eyebrow") ||
    primaryPane.querySelector(".modal__head");
  if (!title) {
    modalBgEl.removeAttribute("aria-labelledby");
    return;
  }
  title.id = DIALOG_TITLE_ID;
  modalBgEl.setAttribute("aria-labelledby", DIALOG_TITLE_ID);
}

function activateDialogSemantics() {
  modalBgEl.setAttribute("role", "dialog");
  modalBgEl.setAttribute("aria-modal", "true");
  modalBgEl.setAttribute("aria-hidden", "false");
  refreshModalLabel();
}

function deactivateDialogSemantics() {
  if (!modalBgEl) return;
  modalBgEl.setAttribute("aria-hidden", "true");
  modalBgEl.removeAttribute("role");
  modalBgEl.removeAttribute("aria-modal");
  modalBgEl.removeAttribute("aria-labelledby");
}

/** 오버레이를 제외한 앱 영역을 보조기술과 키보드 탐색에서 함께 제외한다. */
function inertBackgroundContent() {
  if (inertBackground.length) return;
  inertBackground = [...document.body.children]
    .filter(el => el !== modalBgEl && !["SCRIPT", "STYLE", "TEMPLATE"].includes(el.tagName))
    .map(el => ({
      el,
      hadInert: el.hasAttribute("inert"),
      ariaHidden: el.getAttribute("aria-hidden"),
    }));
  inertBackground.forEach(({ el }) => {
    el.setAttribute("inert", "");
    el.setAttribute("aria-hidden", "true");
  });
}

function restoreBackgroundContent() {
  inertBackground.forEach(({ el, hadInert, ariaHidden }) => {
    if (!hadInert) el.removeAttribute("inert");
    if (ariaHidden == null) el.removeAttribute("aria-hidden");
    else el.setAttribute("aria-hidden", ariaHidden);
  });
  inertBackground = [];
}

function lockBackgroundScroll() {
  if (!scrollLockState) {
    scrollLockState = {
      html: document.documentElement.style.overflow,
      body: document.body.style.overflow,
    };
  }
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
}

function restoreBackgroundScroll() {
  if (!scrollLockState) return;
  document.documentElement.style.overflow = scrollLockState.html;
  document.body.style.overflow = scrollLockState.body;
  scrollLockState = null;
}

function trapModalFocus(event) {
  const focusable = focusableElements(modalEl);
  if (!focusable.length) {
    event.preventDefault();
    focusModalRegion(modalEl);
    return;
  }
  const currentIndex = focusable.indexOf(document.activeElement);
  const next = event.shiftKey
    ? currentIndex <= 0
      ? focusable[focusable.length - 1]
      : null
    : currentIndex === -1 || currentIndex === focusable.length - 1
      ? focusable[0]
      : null;
  if (!next) return;
  event.preventDefault();
  focusElement(next);
}

/**
 * 모바일 브레이크포인트 판정 — split-view.css 의 세로 스택 전환 기준(860px)과
 * 같은 값. 리사이즈 중 경계를 오갈 수 있어 캐시하지 않는다.
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
  deactivateDialogSemantics();
  // 배경 클릭은 pane2 → 모달 전체 순으로 한 단계씩 닫는다.
  modalBgEl.addEventListener("click", e => {
    if (e.target !== modalBgEl || !isModalOpen()) return;
    if (splitViewCloser && splitViewCloser()) return;
    closeModal();
  });
  // ESC 도 한 단계씩 — 라이트박스가 떠 있으면 그것만 닫는다.
  document.addEventListener("keydown", e => {
    if (!isModalOpen()) return;
    if (e.key === "Tab") {
      trapModalFocus(e);
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      const lightbox = document.querySelector(".media-lightbox");
      if (lightbox) {
        lightbox.remove();
        return;
      }
      if (splitViewCloser && splitViewCloser()) return;
      closeModal();
    }
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
  const wasOpen = isModalOpen();
  if (!wasOpen) returnFocusEl = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  // 완전히 새 모달을 여는 진입점 — 이전 카드의 뒤로가기 스택이 남아 있으면
  // 관계없는 "뒤로가기"가 뜨므로 비운다.
  mobileStack = [];
  // 열린 Split View를 다른 딥링크 상세가 바로 교체할 수 있다. innerHTML로
  // pane을 없애기 전에 body에 분리되어 있는 각 스크롤바 트랙부터 회수한다.
  removeModalScrollbarTracks();
  modalEl.className = "modal modal--pop-in" + (extraClass ? " " + extraClass : "");
  modalEl.style.setProperty("--mfr", color);
  clearDetailMetadata();
  modalEl.innerHTML = headHTML + bodyHTML;
  currentContent = { color, headHTML, bodyHTML, onMounted: null, pane2Spec: "" };
  modalBgEl.classList.add("modal-overlay--open");
  activateDialogSemantics();
  if (!wasOpen) inertBackgroundContent();
  // 배경 스크롤 잠금 — html 도 함께 잠근다. base.css 가 html 에
  // overflow-y:scroll(스크롤바 자리 고정)을 걸어둬서 body 만으로는 안 막힌다.
  lockBackgroundScroll();
  // scrollTop 리셋은 오버레이를 연 *뒤에* — display:none 인 동안 대입하면
  // Chrome 이 다시 보이는 순간 이전 위치를 복원해 무효가 된다.
  modalEl.scrollTop = 0;
  const closeBtn = modalEl.querySelector("[data-modal-close]");
  if (closeBtn) closeBtn.onclick = closeModal;
  wirePaneInteractions(modalEl);
  renderBackButton();
  focusModalRegion(modalEl);
}

/**
 * 모바일에서 Split View 대신 쓰는 "전체 교체" 진입점 — 현재 내용을 뒤로가기
 * 스택에 쌓고 모달 전체를 새 콘텐츠로 바꾼다. split-view.js 가 화면 폭을 보고
 * openSplitPane/replaceSplitPane1 대신 이쪽으로 위임한다.
 * @param {string} color 새 콘텐츠의 --mfr 색상
 * @param {string} headHTML 새 콘텐츠 헤더
 * @param {string} bodyHTML 새 콘텐츠 본문
 * @param {Function} [onMounted] 새 콘텐츠 DOM 이 붙은 직후 modalEl 을 인자로 호출
 * @param {string} [pane2Spec=""] 이 화면을 나타내는 URL pane2 상태
 */
export function pushMobileModal(color, headHTML, bodyHTML, onMounted, pane2Spec = "") {
  if (currentContent) {
    mobileStack.push({ ...currentContent, focusToken: captureFocusToken(modalEl) });
  }
  modalEl.style.setProperty("--mfr", color);
  clearDetailMetadata();
  modalEl.innerHTML = headHTML + bodyHTML;
  currentContent = { color, headHTML, bodyHTML, onMounted: onMounted || null, pane2Spec };
  const closeBtn = modalEl.querySelector("[data-modal-close]");
  if (closeBtn) closeBtn.onclick = closeModal;
  wirePaneInteractions(modalEl);
  if (onMounted) onMounted(modalEl);
  renderBackButton();
  refreshModalLabel();
  focusModalRegion(modalEl);
}

/**
 * 모바일 뒤로가기 스택의 마지막 항목을 복원한다. 저장해둔 onMounted 도 다시
 * 실행해야 복원된 화면의 클릭이 동작한다.
 */
function popMobileModal() {
  const prev = mobileStack.pop();
  if (!prev) return;
  modalEl.style.setProperty("--mfr", prev.color);
  clearDetailMetadata();
  modalEl.innerHTML = prev.headHTML + prev.bodyHTML;
  currentContent = prev;
  const closeBtn = modalEl.querySelector("[data-modal-close]");
  if (closeBtn) closeBtn.onclick = closeModal;
  wirePaneInteractions(modalEl);
  if (prev.onMounted) prev.onMounted(modalEl);
  renderBackButton();
  refreshModalLabel();
  syncMobilePaneRoute(prev.pane2Spec);
  restoreModalFocus(resolveFocusToken(modalEl, prev.focusToken), modalEl);
}

/** 모바일 media 경로가 현재 관계 상세의 entity 접두사를 보존하는 데 사용한다. */
export function getCurrentMobilePaneRoute() {
  return currentContent?.pane2Spec || "";
}

/**
 * 모달 헤더 좌측에 뒤로가기 버튼을 그린다 — 스택에 이전 항목이 있을 때만.
 * 모달 내용이 바뀔 때마다 다시 호출해야 버튼 유무가 맞는다.
 */
function renderBackButton() {
  const head = modalEl.querySelector(".modal__head");
  if (!head) return;
  const existing = head.querySelector("[data-modal-back]");
  if (existing) existing.remove();
  // :has() 없이도 왼쪽 여백을 줄 수 있도록 head 클래스로도 표시한다.
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

// 배경(모달 바깥) 클릭 시 — Split View 가 열려있으면 오른쪽
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
 * 모달 닫기 (배경 스크롤 잠금 해제 포함). Split View 구조도 함께 해체한다 —
 * 남겨두면 다음에 열리는 모달과 뒤섞인다.
 */
export function closeModal() {
  const wasOpen = isModalOpen();
  modalBgEl.classList.remove("modal-overlay--open");
  deactivateDialogSemantics();
  restoreBackgroundContent();
  restoreBackgroundScroll();
  if (modalEl) {
    modalEl.classList.remove("modal--split");
    const splitView = modalEl.querySelector(".split-view");
    if (splitView) {
      // pane1(head+body)만 다시 모달 최상위로 꺼내고 나머지(.split-view, pane2)는 제거.
      const pane1 = splitView.querySelector(".split-view__pane");
      const pane2 = splitView.querySelector(".split-view__pane:nth-child(2)");
      // pane 기준으로 body 에 붙어있던 스크롤바 트랙은 고아가 되므로 정리.
      removeScrollbarTrack(pane1);
      removeScrollbarTrack(pane2);
      if (pane1) {
        while (pane1.firstChild) modalEl.appendChild(pane1.firstChild);
      }
      splitView.remove();
    }
    removeScrollbarTrack(modalEl);
  }
  mobileStack = [];
  currentContent = null;
  // [모달 라우팅] 해시의 카드 id 를 지워 목록 상태(#speakers)로 되돌린다.
  // 뒤로가기로 닫힌 경우엔 라우터가 이미 비운 뒤라 no-op.
  clearItemRoute();
  if (wasOpen) {
    const target = returnFocusEl;
    returnFocusEl = null;
    if (!focusElement(target)) {
      focusElement(document.querySelector('[role="tab"][aria-selected="true"]'));
    }
  }
}

/**
 * 현재 모달 본체 요소 반환 — split-view.js 가 pane 래핑에 사용.
 * @returns {HTMLElement}
 */
export function getModalEl() {
  return modalEl;
}
