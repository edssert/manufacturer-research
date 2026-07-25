/**
 * @module ui/split-view
 * 나란히 비교(Side-by-Side) Split View.
 *
 * 동작 원리: 열려 있는 모달에 .modal--split 변경자를 토글하고, 기존
 * 모달 내용(.modal__head + #modal-body-main)을 pane 1 로 감싼 뒤 그 옆에
 * pane 2 를 추가한다. 기존 모달 DOM 은 파괴하지 않으므로 원본 카드의
 * 상태가 그대로 유지된다. 좁은 화면에서는 CSS 가 세로 스택으로 전환.
 *
 * 관련 CSS: css/components/split-view.css (.split-view, .modal--split)
 */
import { getModalEl, closeModal, isMobileLayout, pushMobileModal, setSplitViewCloser } from "./modal.js";
import { wirePaneInteractions, removeScrollbarTrack, setMediaLightboxOpener } from "./pane-interactions.js";
// [모달 라우팅] pane2 의 열림/교체/닫힘을 URL 해시 3번째 단에 replaceState 로
// 반영한다 — 히스토리를 어지럽히지 않고 URL 만으로 복원된다(core/router.js).
import { setPane2Route, clearPane2Route } from "../core/router.js";

/**
 * 사진 클릭 시 pane 2 자리에 확대본만 여는 전용 pane.
 * 원본 모달과 동일한 마크업(.modal__media/.modal__view-switch/data-view)을
 * 쓰므로 wirePaneInteractions 의 뷰 전환 배선이 그대로 동작한다.
 *
 * 이미 열려 있던 pane2(예: 앰프 상세)는 지우지 않고 detach 해 보관한 뒤 확대
 * pane 을 닫을 때 그 노드를 그대로 되돌린다 — innerHTML 로 복사하면 onMounted
 * 가 걸어둔 리스너(칩 클릭 등)가 유실되기 때문.
 * @param {{src: string, alt: string, label: string, slug: string}[]} views
 * @param {number} startIndex 클릭 시점에 보고 있던 뷰의 인덱스
 * @param {string} paneColor
 * @param {(slug: string) => void} [onViewChange] 확대 pane 이 닫힐 때 그때
 *   보고 있던 뷰의 slug — 왼쪽 원본 모달을 같은 뷰로 동기화하는 데 쓴다.
 *   인덱스가 아니라 slug 인 이유: 스택 그룹이 있는 카드(K2 등)는 뷰 버튼의
 *   DOM 순서가 views 배열 순서와 다를 수 있다.
 */
function openMediaSplitPane(views, startIndex, paneColor, onViewChange, sourceId) {
  const modalEl = getModalEl();
  const container = modalEl.querySelector(".split-view");
  const existingPane2 = container && container.querySelector(".split-view__pane:nth-child(2)");
  const existingPaneId = container && container.dataset.paneId;
  // detach(제거하되 참조는 유지) — openSplitPane 이 "기존 pane2 제거 후
  // 새로 추가"할 때 이 노드를 파괴하지 않도록 미리 부모에서 떼어낸다.
  if (existingPane2) existingPane2.remove();

  // onClose 는 이 pane 이 DOM 에서 지워진 *뒤에* 호출되므로 그 시점엔 img
  // 상태를 읽을 수 없다 — 뷰를 바꿀 때마다 최신 slug 를 여기 저장해둔다.
  let currentSlug = views[startIndex] ? views[startIndex].slug : "";
  const imgsHTML = views.map((v, i) =>
    `<img class="modal__img media-split-pane__img" data-view="${v.slug || `v${i}`}" src="${v.src}" alt="${v.alt}" loading="lazy" decoding="async"${i === startIndex ? "" : " hidden"}>`
  ).join("");
  const switchHTML = views.length > 1
    ? `<div class="modal__view-switch" role="group" aria-label="이미지 보기 선택">
        ${views.map((v, i) => `<button type="button" class="modal__view-btn${i === startIndex ? " is-active" : ""}" data-view-switch="${v.slug || `v${i}`}">${v.label || `#${i + 1}`}</button>`).join("")}
      </div>`
    : "";

  openSplitPane({
    headHTML: `<div class="modal__head modal__head--media-only"><button class="modal__close" data-modal-close aria-label="닫기"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>`,
    // 상단 강조선을 왼쪽 pane 과 같은 제조사 색으로.
    paneColor: paneColor || "transparent",
    // data-lightbox="off" 필수 — 이 pane 자신도 .modal__media 라서 없으면
    // 사진 클릭이 openMediaSplitPane 을 재귀 호출해 화면이 깜빡인다.
    bodyHTML: `<div class="media-split-pane__body-wrap">
        <div class="modal__media media-split-pane__body" data-lightbox="off">${imgsHTML}</div>
        ${switchHTML}
      </div>`,
    onClose: () => {
      if (onViewChange) onViewChange(currentSlug);
      if (existingPane2) restorePane2(existingPane2, existingPaneId);
    },
    // 스크롤이 생길 만큼 길지 않은 pane — split-view.css 의 기본
    // overflow-y:auto 를 꺼서 스크롤바가 아예 안 뜨게 한다.
    paneClass: "split-view__pane--media",
    onMounted: pane2 => {
      // hidden 토글은 wireViewSwitch 가 이미 onclick 으로 점유하고 있으므로
      // 덮어쓰지 않도록 addEventListener 로 slug 추적만 덧붙인다.
      pane2.querySelectorAll("[data-view-switch]").forEach(btn => {
        btn.addEventListener("click", () => {
          currentSlug = btn.dataset.viewSwitch;
          setPane2Route(mediaRouteSpec(sourceId, currentSlug));
        });
      });
    }
  });
  // [모달 라우팅] pane1 사진이면 "media~<슬러그>", pane2 항목 사진이면
  // "<항목id>~media~<슬러그>".
  setPane2Route(mediaRouteSpec(sourceId, currentSlug));
}

/**
 * 사진 확대 pane 의 URL pane2 스펙 문자열을 만든다.
 * @param {string|undefined} sourceId 사진의 출처가 pane2 항목이면 그 id, pane1 이면 falsy
 * @param {string} slug 현재 보고 있는 뷰 슬러그 (front/rear/array 등)
 * @returns {string}
 */
function mediaRouteSpec(sourceId, slug) {
  return `${sourceId ? `${sourceId}~` : ""}media~${slug || ""}`;
}
setMediaLightboxOpener(openMediaSplitPane);

/**
 * openMediaSplitPane 이 detach 해둔 원래 pane2 노드를 되살린다.
 * 호출 시점엔 스플릿뷰가 이미 완전히 해제돼 있으므로, openSplitPane 으로
 * pane1 을 다시 감싸게 하고 새로 생긴 빈 pane2 를 원본 노드로 교체한다.
 * @param {HTMLElement} pane2El 원래 pane2 DOM 노드 (detach 된 상태)
 * @param {string|undefined} paneId 원래 pane2 의 paneId
 */
function restorePane2(pane2El, paneId) {
  openSplitPane({ headHTML: "", bodyHTML: "", paneId });
  const modalEl = getModalEl();
  const container = modalEl.querySelector(".split-view");
  const placeholder = container.querySelector(".split-view__pane:nth-child(2)");
  if (placeholder) placeholder.replaceWith(pane2El);
  if (paneId) container.dataset.paneId = paneId; else delete container.dataset.paneId;
  // detach 될 때 --collapsing(사진 영역 접힘)이 걸린 채로 보관됐다면 풀어준다
  // — 안 풀면 복원된 pane2 의 사진이 계속 접힌 채(투명·높이 0) 남는다.
  const wrap = pane2El.querySelector(".modal__media-wrap--collapsing");
  if (wrap) wrap.classList.remove("modal__media-wrap--collapsing");
}

/**
 * Split View pane 2 열기 (pane 2 가 이미 있으면 교체).
 *
 * 두 pane 모두 도메인 modalBodyHTML() 이 만드는 같은 .modal__head 마크업을
 * 쓴다 — X 버튼 위치와 제목 표기가 좌우에서 어긋나지 않게 하기 위함.
 *
 * paneId 는 "같은 대상을 다시 클릭하면 닫기" 토글용이다(열려 있는 pane2 의
 * id 는 container.dataset.paneId 로 추적).
 * @param {Object} opts
 * @param {string} opts.headHTML pane 2 헤더 마크업 — 도메인 modalBodyHTML()
 *   이 반환하는 head 를 그대로 전달([data-modal-close] 버튼 포함).
 * @param {string} opts.paneColor pane 2 포인트 색 (CSS 변수 --mfr 로 주입)
 * @param {string} opts.bodyHTML pane 2 본문 마크업
 * @param {string} [opts.paneId] pane 2 로 여는 대상의 고유 id(스피커/앰프
 *   id 등). 이미 이 id 로 pane 2 가 열려 있으면 열지 않고 대신 닫는다.
 * @param {Function} [opts.onMounted] pane 2 DOM 이 붙은 직후 pane 2 요소를
 *   인자로 호출되는 콜백 (선택) — 도메인별 추가 배선(칩 클릭 등)에 사용.
 *   공통 인터랙션(뷰 전환·단위 토글·줌·+N 토글)은 여기서 이미 배선되므로
 *   콜백에서 다시 할 필요 없다.
 * @param {Function} [opts.onClose] pane 2 닫기 시 콜백 (선택)
 * @returns {boolean} pane 2 를 열었으면 true, (토글로) 닫았으면 false
 */
export function openSplitPane({ headHTML, paneColor, bodyHTML, paneId, onMounted, onClose, paneClass }) {
  // [모바일] 좁은 화면은 나란히 보기 대신 "전체 교체 + 뒤로가기" 방식을
  // 쓴다(사용자 요청 — 모바일에서 Split View 대신 그냥 앰프 모달이 바로
  // 열리는 것처럼). paneId 토글-닫기(같은 대상 재클릭 시 pane2 닫기)는
  // 나란히 보기 개념 자체가 없는 이 모드에서는 의미가 없어 생략한다.
  if (isMobileLayout()) {
    pushMobileModal(paneColor, headHTML, bodyHTML, onMounted);
    // [모달 라우팅] 모바일 "전체 교체" 모드에서도 URL 은 동일하게 기록 —
    // 이 URL 을 데스크탑에서 열면 같은 상태가 Split View 로 복원된다.
    if (paneId) setPane2Route(paneId);
    return true;
  }
  const modalEl = getModalEl();
  let container = modalEl.querySelector(".split-view");

  // 이미 같은 대상으로 pane 2 가 열려 있으면 여닫이 토글 — 다시 열지 않고 닫는다.
  if (container && paneId && container.dataset.paneId === paneId) {
    closeSplitPane2(modalEl, container);
    if (onClose) onClose();
    return false;
  }

  const isFirstOpen = !container;
  if (isFirstOpen) {
    // 첫 진입: 모달의 자식을 골라내지 말고 *전부* pane1 로 옮긴다 — 사이에
    // 있는 사진 영역(.modal__media-wrap)이 누락돼 사라지는 일을 막는다.
    // 스크롤 주체가 modalEl → pane1 로 바뀌므로 위치를 옮겨 심어야 한다
    // (안 하면 스플릿뷰 진입 순간 최상단으로 리셋).
    const prevScrollTop = modalEl.scrollTop;
    // modalEl 기준으로 body 에 붙어 있던 커스텀 스크롤바 트랙은 이제 고아가
    // 된다 — pane1 은 아래에서 자기 몫을 새로 받는다.
    removeScrollbarTrack(modalEl);

    const pane1 = document.createElement("div");
    pane1.className = "split-view__pane";
    while (modalEl.firstChild) pane1.appendChild(modalEl.firstChild);

    container = document.createElement("div");
    container.className = "split-view";
    container.appendChild(pane1);
    modalEl.appendChild(container);
    modalEl.classList.add("modal--split");
    pane1.scrollTop = prevScrollTop;
    // pane1 기준의 새 스크롤바 트랙을 만든다. 나머지 배선은 onXxx 재할당이라
    // 다시 호출해도 안전하게 덮어써진다.
    wirePaneInteractions(pane1);
  }

  // 기존 pane 2 제거 후 새로 추가 (다른 항목 클릭 시 교체 동작)
  const oldPane2 = container.querySelector(".split-view__pane:nth-child(2)");
  // 사진 확대 pane 을 이 경로로 교체하면 closeSplitPane2 를 거치지 않으므로
  // pane1 의 --collapsing(접힌 사진 영역)을 여기서 직접 풀어야 한다.
  if (oldPane2 && oldPane2.classList.contains("split-view__pane--media")) {
    const pane1 = container.querySelector(".split-view__pane:first-child");
    const wrap = pane1 ? pane1.querySelector(".modal__media-wrap--collapsing") : null;
    if (wrap) wrap.classList.remove("modal__media-wrap--collapsing");
  }
  if (oldPane2) oldPane2.remove();

  if (paneId) container.dataset.paneId = paneId; else delete container.dataset.paneId;

  const pane2 = document.createElement("div");
  // 최초 오픈은 모달 폭 확장 트랜지션과 맞추려 .22s 지연되는 --enter,
  // 교체(pane2 만 바뀜)는 지연이 없는 --swap. 교체에 지연을 주면 느리게 느껴진다.
  pane2.className = `split-view__pane ${isFirstOpen ? "split-view__pane--enter" : "split-view__pane--swap"}${paneClass ? ` ${paneClass}` : ""}`;
  pane2.style.setProperty("--mfr", paneColor);
  pane2.innerHTML = headHTML + bodyHTML;
  container.appendChild(pane2);
  // onClose 를 노드 자체에 매달아 둔다 — X 버튼 경로와 배경 클릭 경로
  // (closeSplitView)가 같은 곳에서 꺼내 쓸 수 있게 하기 위함. 안 그러면
  // 배경 클릭으로 닫을 때 restorePane2 가 누락돼 원래 pane2 가 안 돌아온다.
  pane2._onClose = onClose || null;
  const closeBtn = pane2.querySelector("[data-modal-close]");
  if (closeBtn) {
    closeBtn.onclick = () => {
      closeSplitPane2(modalEl, container);
      if (onClose) onClose();
    };
  }
  wirePaneInteractions(pane2);
  if (onMounted) onMounted(pane2);
  // [모달 라우팅] 연관 항목 pane2 는 그 항목 id 를 URL 에 기록한다. 사진
  // 확대 pane(paneId 없음)은 openMediaSplitPane 이 자기 스펙("media~...")을
  // 직접 기록하므로 여기서는 건드리지 않는다.
  if (paneId) setPane2Route(paneId);
  return true;
}

/**
 * 모달 안에서 [data-<attr>] 를 가진 요소(연관 항목 칩·표 행)를 클릭하면
 * Split View pane 2 에 그 항목 상세를 여는 배선.
 *
 *
 * stopPropagation 은 resolve 보다 먼저 한다: 앰프 모달의 Configurations 표는
 * 병합된 이름 파트(.match-table__model-name-part)와 부모 행이 둘 다
 * [data-speaker-id] 를 갖고 있어, 파트를 눌렀을 때 부모 행 리스너까지 실행되면
 * 방금 연 상세가 곧바로 행의 대표 id 상세로 덮어써진다. id 가 없는 공통 텍스트
 * 파트("(i)" 삽입 케이스)도 부모로 새어나가면 안 되므로 순서가 중요하다.
 * @param {string} attr data- 접두사를 뺀 속성명 (예: "accessory-id")
 * @param {(id: string) => Object|null} resolve id → openSplitPane 인자.
 *   해당 id 로 열 게 없으면 null 을 반환한다.
 */
export function wireChipPanes(attr, resolve) {
  document.querySelectorAll(`#modal [data-${attr}]`).forEach(el => {
    el.addEventListener("click", e => {
      e.stopPropagation();
      const opts = resolve(el.getAttribute(`data-${attr}`));
      if (opts) openSplitPane(opts);
    });
  });
}

/**
 * Split View 가 열린 상태에서 pane 1(왼쪽, 원래 모달) 내용을 교체한다.
 * pane 2(오른쪽) 안에서 다른 항목을 클릭했을 때 "왼쪽도 그 항목으로
 * 바뀌는" 동작에 사용 — pane 2 는 그대로 두고 pane 1 만 새로 그린다.
 * @param {Object} opts
 * @param {string} opts.headHTML 새 pane 1 헤더 마크업
 * @param {string} opts.paneColor 새 pane 1 포인트 색 (--mfr)
 * @param {string} opts.bodyHTML 새 pane 1 본문 마크업
 * @param {Function} [opts.onMounted] pane 1 DOM 이 붙은 직후 pane 1 요소를
 *   인자로 호출되는 콜백(도메인별 추가 배선용).
 * @returns {boolean} pane 1 을 교체했으면 true, Split View 가 열려있지 않으면 false
 */
export function replaceSplitPane1({ headHTML, paneColor, bodyHTML, onMounted }) {
  // [모바일] Split View 자체가 없는 모드이므로 "pane1 교체"라는 개념도
  // 없다 — 지금 보이는 화면(이전에 전체교체로 열린 것) 역시 새 대상으로
  // 전체교체하고 스택에 쌓는다. openSplitPane 의 모바일 분기와 동일한 처리.
  if (isMobileLayout()) {
    pushMobileModal(paneColor, headHTML, bodyHTML, onMounted);
    return true;
  }
  const modalEl = getModalEl();
  const container = modalEl.querySelector(".split-view");
  if (!container) return false;
  const pane1 = container.querySelector(".split-view__pane:first-child");
  if (!pane1) return false;
  pane1.style.setProperty("--mfr", paneColor);
  pane1.innerHTML = headHTML + bodyHTML;
  // pane1 의 X 버튼은 기존과 동일하게 모달 전체 닫기(openModalWith 가 최초
  // 연결한 것과 같은 동작) — Split View 해제가 아니라 닫기.
  const closeBtn = pane1.querySelector("[data-modal-close]");
  if (closeBtn) closeBtn.onclick = closeModal;
  wirePaneInteractions(pane1);
  if (onMounted) onMounted(pane1);
  return true;
}

/**
 * pane 2 를 제거하고 pane1(head+body)을 .split-view 래핑에서 꺼내 모달
 * 최상위 자식으로 되돌린다 — X 버튼 클릭과 paneId 토글 닫기가 이 로직을
 * 공유해 두 경로 모두 동일하게 깨끗한 DOM 상태로 복귀한다(모달을 닫았다
 * 다시 열 때 .split-view 잔재가 남지 않도록).
 * @param {HTMLElement} modalEl
 * @param {HTMLElement} container .split-view 컨테이너
 */
function closeSplitPane2(modalEl, container) {
  const pane2 = container.querySelector(".split-view__pane:nth-child(2)");
  // 사진 확대 pane 만 닫힘 애니메이션(--exit)을 재생한다. 아래에서 container
  // 를 곧 remove() 하므로 그 안에 남겨두면 재생될 틈 없이 함께 사라진다 —
  // 화면 좌표를 fixed 로 고정해 body 로 옮겨두고 끝난 뒤 제거한다.
  if (pane2 && pane2.classList.contains("split-view__pane--media")) {
    removeScrollbarTrack(pane2);
    const rect = pane2.getBoundingClientRect();
    pane2.style.position = "fixed";
    pane2.style.top = `${rect.top}px`;
    pane2.style.left = `${rect.left}px`;
    pane2.style.width = `${rect.width}px`;
    pane2.style.height = `${rect.height}px`;
    pane2.style.margin = "0";
    // body 자식이 되면 .modal-overlay(z-index:100) 밖이라 기본값으로는 그
    // 아래 깔려 애니메이션이 안 보인다 — 오버레이보다 위로 명시한다.
    pane2.style.zIndex = "150";
    document.body.appendChild(pane2);
    // 모션 off 면 animation 이 전역 차단돼 animationend 가 영영 안 온다.
    // setTimeout 안전장치를 두면 그만큼 반응이 늦어 취지에 어긋나므로 즉시 제거.
    if (document.body.classList.contains("reduce-motion")) {
      pane2.remove();
    } else {
      // --enter/--swap 이 남아 있으면 animation 단축 속성이 둘 다 종료 상태를
      // 고정해 --exit 가 재생되지 않는다 — 먼저 떼어내고 단독으로 남긴다.
      pane2.classList.remove("split-view__pane--enter", "split-view__pane--swap");
      void pane2.offsetHeight; // 클래스 제거를 강제 커밋(다음 클래스 추가 시 애니메이션 재시작 보장)
      pane2.classList.add("split-view__pane--exit");
      pane2.addEventListener("animationend", () => pane2.remove(), { once: true });
    }
  } else if (pane2) {
    removeScrollbarTrack(pane2);
    pane2.remove();
  }
  const pane1 = container.querySelector(".split-view__pane");
  // scrollTop 은 반드시 modal--split 을 떼기 *전에* 읽는다 — 먼저 떼면 .modal
  // 이 단일 모달 폭으로 리레이아웃되면서 pane1 이 스크롤 불가 상태가 돼 값이
  // 0으로 꺾인다.
  const prevScrollTop = pane1 ? pane1.scrollTop : 0;
  // pane1 기준 스크롤바 트랙은 modalEl 로 물려받으면 값이 틀리므로 버린다.
  removeScrollbarTrack(pane1);
  modalEl.classList.remove("modal--split");
  // 사진 영역 펼침 트랜지션은 DOM 이동을 먼저 끝낸 뒤에 클래스를 떼야 보인다
  // — 같은 흐름에서 둘을 처리하면 "접힌 상태"가 한 번도 페인트되지 않는다.
  const wrap = pane1 ? pane1.querySelector(".modal__media-wrap--collapsing") : null;
  if (pane1) {
    while (pane1.firstChild) modalEl.insertBefore(pane1.firstChild, container);
  }
  container.remove();
  // 자식을 modalEl 로 다 옮긴 뒤, modalEl 이 이제 스크롤 컨테이너다.
  modalEl.scrollTop = prevScrollTop;
  // modalEl 자신을 기준으로 한 새 오버레이 막대를 다시 만든다.
  wirePaneInteractions(modalEl);
  if (wrap) {
    requestAnimationFrame(() => {
      wrap.classList.remove("modal__media-wrap--collapsing");
    });
  }
  // [모달 라우팅] pane2 가 닫혔으니 URL 3번째 단도 지운다. restorePane2 경로는
  // 바로 다음에 setPane2Route 가 다시 기록하므로 일시적 초기화로 끝난다.
  clearPane2Route();
}

/**
 * Split View 해제 — pane 2 제거 + 모달 폭 원복. 배경 클릭 시 modal.js 가
 * "pane2 부터 먼저 닫기"에 쓴다(setSplitViewCloser).
 * @returns {boolean} 닫을 pane2 가 있었으면 true — 호출부가 "이번 클릭으로
 *   뭔가 닫혔는지" 판단해 모달 전체 닫기로 넘어갈지 결정한다.
 */
export function closeSplitView() {
  const modalEl = getModalEl();
  const container = modalEl.querySelector(".split-view");
  if (container) {
    // _onClose(사진 확대 pane 의 restorePane2)는 pane2 를 지우기 *전에*
    // 읽어두고 지운 뒤 호출한다. 일반 pane2 는 _onClose 가 없다.
    const pane2 = container.querySelector(".split-view__pane:nth-child(2)");
    const onClose = pane2 ? pane2._onClose : null;
    closeSplitPane2(modalEl, container);
    if (onClose) onClose();
    return true;
  }
  modalEl.classList.remove("modal--split");
  const pane2 = modalEl.querySelector(".split-view__pane:nth-child(2)");
  if (pane2) { pane2.remove(); return true; }
  return false;
}
setSplitViewCloser(closeSplitView);
