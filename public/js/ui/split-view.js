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
// [v1.8 모듈 분리] pane 내부 인터랙션 배선/커스텀 스크롤바/사진 확대 오프너
// 슬롯은 ui/pane-interactions.js 로 분리됐다 (기존 modal.js 에서 이동).
import { wirePaneInteractions, removeScrollbarTrack, setMediaLightboxOpener } from "./pane-interactions.js";
// [모달 라우팅] Split View pane2 의 열림/교체/닫힘을 URL 해시 3번째 단에
// 반영한다 (core/router.js 해시 형식 주석 참고) — replaceState 기반이라
// 히스토리를 어지럽히지 않고, 공유한 URL 만으로 Split View 가 복원된다.
import { setPane2Route, clearPane2Route } from "../core/router.js";

/**
 * 사진 클릭 시 Split View 오른쪽 pane 자리에 확대본만 여는 전용 pane.
 * 헤더/사양 없이 닫기 버튼 + 큰 이미지 + (뷰가 여러 개면) 하단 뷰 전환
 * 버튼만 있는 빈 카드 배경 위에 사진을 띄운다. 뷰 전환 버튼은 원본 모달과
 * 동일한 마크업(.modal__media/.modal__view-switch, data-view)을 그대로
 * 써서 modal.js 의 wireViewSwitch(공통 배선, wirePaneInteractions 가 이미
 * 모든 pane 에 걸어줌)가 별도 코드 추가 없이 그대로 동작한다.
 * modal.js 의 wireMediaLightbox 가 사진 클릭 시 호출한다.
 *
 * [버그 수정] 스피커 pane1 + 앰프(LA12X 등) pane2 가 이미 열려있는 상태에서
 * 앰프 사진을 클릭하면, openSplitPane 이 "기존 pane2 를 새 pane2로 교체"
 * 하는 원래 동작 때문에 앰프 pane2 가 통째로 사라지고 그 자리가 사진
 * 확대 pane 으로 바뀌었다 — 이 상태에서 확대 pane 의 X 를 누르면
 * closeSplitPane2 가 "지금 있는 pane2(=사진 확대)" 를 닫아 스플릿뷰
 * 전체가 닫혀버려, 원래 보고 있던 앰프 pane2 로 못 돌아갔다.
 * 해결: 기존 pane2 DOM 노드 자체를 지우지 않고 detach 해서 보관해두고
 * (innerHTML 문자열로 복사하면 onMounted 가 걸어둔 이벤트 리스너 — 예:
 * wireSplitPaneAmpRows 의 System Elements 칩 클릭 — 가 유실된다), 확대
 * pane 의 X 클릭 시 그 노드를 다시 pane2 자리에 그대로 붙여 완전히
 * 원상복구한다.
 * @param {{src: string, alt: string, label: string, slug: string}[]} views
 * @param {number} startIndex 클릭 시점에 보고 있던 뷰의 인덱스
 * @param {string} paneColor
 * @param {(slug: string) => void} [onViewChange] 확대 pane 이 닫히는
 *   시점에 그때 보고 있던 뷰의 slug 를 넘겨 호출 — modal.js 가 왼쪽 원본
 *   모달의 같은 slug 뷰 버튼을 클릭시켜 동기화하는 데 쓴다(사용자 요청).
 *   인덱스가 아니라 slug 인 이유: 원본 모달의 뷰 전환 버튼(K2 등 스택
 *   그룹이 있는 카드)은 DOM 순서가 views 배열 순서와 다를 수 있다.
 */
function openMediaSplitPane(views, startIndex, paneColor, onViewChange, sourceId) {
  const modalEl = getModalEl();
  const container = modalEl.querySelector(".split-view");
  const existingPane2 = container && container.querySelector(".split-view__pane:nth-child(2)");
  const existingPaneId = container && container.dataset.paneId;
  // detach(제거하되 참조는 유지) — openSplitPane 이 "기존 pane2 제거 후
  // 새로 추가"할 때 이 노드를 파괴하지 않도록 미리 부모에서 떼어낸다.
  if (existingPane2) existingPane2.remove();

  // [사용자 요청] 확대 pane 에서 뷰를 바꾼 뒤 닫으면 왼쪽 원본 모달도 그
  // 뷰로 동기화되어야 한다 — closeSplitPane2 가 이 pane 을 DOM 에서 지운
  // *뒤에* onClose 가 호출되므로(openSplitPane 참고) 그 시점엔 이 pane 의
  // img/hidden 상태를 더 이상 읽을 수 없다. 대신 뷰 전환 버튼을 누를
  // 때마다 이 클로저 변수에 최신 slug 를 미리 저장해둔다.
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
    // [사용자 요청] 오른쪽 확대 pane 상단 강조선도 왼쪽(원본) pane 과 같은
    // 제조사 포인트 색으로 — modal.js wireMediaLightbox 가 왼쪽 pane 의
    // --mfr 값을 읽어 넘겨준다.
    paneColor: paneColor || "transparent",
    // [버그 수정] wireMediaLightbox(modal.js) 는 data-lightbox="off" 가
    // 없는 모든 .modal__media 에 배선되는데, 이 pane 자신도 .modal__media
    // 를 쓰고 있어 확대 pane 안의 사진을 클릭하면 그 사진이 또 자기 자신을
    // 확대하려 openMediaSplitPane 을 재귀 호출 — 기존 pane2(자기 자신)를
    // remove 하고 다시 만드는 과정이 반복돼 화면이 깜빡였다. 이 pane
    // 에서는 사진 클릭 자체를 꺼서 버튼 외 클릭은 아무 반응이 없게 한다.
    bodyHTML: `<div class="media-split-pane__body-wrap">
        <div class="modal__media media-split-pane__body" data-lightbox="off">${imgsHTML}</div>
        ${switchHTML}
      </div>`,
    onClose: () => {
      if (onViewChange) onViewChange(currentSlug);
      if (existingPane2) restorePane2(existingPane2, existingPaneId);
    },
    // [사용자 요청] 확대 pane 은 사진 + 뷰 전환 버튼만 있어 스크롤이 생길
    // 만큼 콘텐츠가 길지 않다 — split-view.css 의 기본 overflow-y:auto 를
    // 이 pane 에서만 꺼서 스크롤바 자체가 아예 안 뜨게 한다.
    paneClass: "split-view__pane--media",
    onMounted: pane2 => {
      // [사용자 요청] wireViewSwitch(modal.js, wirePaneInteractions 가 이미
      // 배선)가 클릭 시 hidden 토글을 담당하므로, 여기서는 그 뒤에 이어서
      // currentSlug 만 갱신한다 — 버튼 자체의 onclick 은 modal.js 가 이미
      // 점유하고 있어 덮어쓰지 않도록 addEventListener 를 병행 등록한다.
      pane2.querySelectorAll("[data-view-switch]").forEach(btn => {
        btn.addEventListener("click", () => {
          currentSlug = btn.dataset.viewSwitch;
          // [모달 라우팅] 확대 pane 안에서 뷰를 바꾸면 URL 의 media 슬러그도
          // 함께 갱신 — 지금 보는 그 뷰 그대로 공유된다.
          setPane2Route(mediaRouteSpec(sourceId, currentSlug));
        });
      });
    }
  });
  // [모달 라우팅] 확대 pane 상태를 URL 에 기록 — pane1 사진이면 "media~<슬러그>",
  // pane2(연관 항목) 사진이면 "<항목id>~media~<슬러그>".
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
 * openMediaSplitPane 이 detach 해둔 원래 pane2 DOM 노드를 그대로 되살린다.
 * 사진 확대 pane 이 닫힌 직후(closeSplitPane2 가 사진 확대 pane 을 지우고
 * 스플릿뷰까지 완전히 해제한 뒤, pane1 은 다시 modalEl 의 단일 모달로
 * 돌아간 상태)이므로, openSplitPane 을 다시 호출해 pane1 을 재래핑시키고,
 * 그 직후 새로 생긴 빈 pane2 를 이 원본 노드로 교체한다 — innerHTML 복사가
 * 아니라 노드 자체를 재사용하므로 이벤트 리스너(onMounted 배선분)가 그대로
 * 살아있다.
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
  // [버그 수정 — 복원된 pane2 의 사진 영역이 사라져 보임] 사진을 클릭해
  // 확대 pane 을 열 때 wireMediaLightbox(modal.js)가 원본 pane2 안의
  // .modal__media-wrap 에 --collapsing 클래스(높이 0·투명, 접히는 애니
  // 메이션용)를 걸어둔다. openMediaSplitPane 이 이 pane2El 을 detach 해
  // 보관하는 시점엔 그 클래스가 걸린 채로 저장되므로, 나중에 그대로
  // 되살리면(여기) 사진 영역이 계속 접힌 채(투명·높이 0)로 남아 "사진이
  // 사라진" 것처럼 보인다 — closeSplitPane2 가 pane1(왼쪽)에서는 이
  // 클래스를 정상적으로 떼어내지만, pane2 복원 경로는 별도라 그 처리가
  // 없었다. 여기서도 동일하게 떼어내 펼침 상태로 되돌린다.
  const wrap = pane2El.querySelector(".modal__media-wrap--collapsing");
  if (wrap) wrap.classList.remove("modal__media-wrap--collapsing");
}

/**
 * Split View pane 2 열기 (pane 2 가 이미 있으면 교체).
 *
 * pane1(기존 모달)과 pane2(Split View 로 새로 여는 상세)가 완전히 동일한
 * 헤더 구조(.modal__head: eyebrow + .modal__title + 우측 상단 고정
 * .modal__close)를 쓰도록, headHTML 을 각 도메인의 modalBodyHTML() 이
 * 만드는 head 마크업을 그대로 받는다 — 이전에는 pane2 만 별도의 축소된
 * 헤더(.split-view__pane-head, 한 줄짜리 작은 텍스트)를 썼는데, pane1 은
 * eyebrow(제조사·부가정보) 위에 큰 제목이 오는 2단 구조라 좌우 X 버튼
 * 위치와 제목 표기 방식이 서로 달라 보였다. 이제 두 pane 모두 같은
 * .modal__head 마크업을 쓰므로 X 버튼이 항상 각 pane 우측 상단 끝에
 * 동일한 오프셋으로 고정되고, 제목 표기 방식(eyebrow/큰 제목)도 통일된다.
 *
 * paneId 로 "같은 대상을 다시 클릭하면 닫기" 토글 동작을 지원한다 — 예를
 * 들어 앰프 모달에서 SB10i 칩을 클릭해 pane 2 에 SB10i 가 열린 상태에서
 * SB10i 를 다시 클릭하면(오른쪽 위 X 버튼까지 마우스를 옮기지 않아도)
 * pane 2 가 닫힌다. 이미 열려있는 pane 2 의 id 는 container 의
 * dataset.paneId 에 저장해 추적한다.
 * @param {Object} opts
 * @param {string} opts.headHTML pane 2 헤더 마크업 — 각 도메인
 *   modalBodyHTML() 이 반환하는 head 를 그대로 전달(.modal__head 구조,
 *   [data-modal-close] 버튼 포함).
 * @param {string} opts.paneColor pane 2 포인트 색 (CSS 변수 --mfr 로 주입)
 * @param {string} opts.bodyHTML pane 2 본문 마크업
 * @param {string} [opts.paneId] pane 2 로 여는 대상의 고유 id(스피커/앰프
 *   id 등). 이미 이 id 로 pane 2 가 열려 있으면 열지 않고 대신 닫는다.
 * @param {Function} [opts.onMounted] pane 2 DOM 이 붙은 직후 pane 2 요소를
 *   인자로 호출되는 콜백 (선택) — 도메인별 추가 배선(칩 클릭 등)에 사용.
 *   공통 인터랙션(뷰 전환·단위 토글·줌·+N 토글)은 여기서 이미 배선되므로
 *   콜백에서 다시 할 필요 없다. [개선사항 0-1]
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
    // 첫 진입: 현재 모달의 자식 전체를 pane 1 로 감싼다.
    // [버그 수정] 이전에는 .modal__head 와 #modal-body-main 만 골라 옮겼는데,
    // 그 사이에 있는 이미지 영역(.modal__media / .modal__media-wrap)은
    // 옮겨지지 않은 채 modalEl.innerHTML = "" 로 파괴돼 — 스피커 모달에서
    // Amplifier Matching 의 앰프 행을 클릭하면 사진이 사라졌다. 모달의
    // 모든 자식을 DOM 순서 그대로 이동시키면 어떤 구조가 와도 안전하다.
    // [사용자 요청 — 스크롤 위치 유지] 자식을 옮기기 전에 지금까지
    // modalEl(단일 모달 상태의 스크롤 컨테이너, modal.css 참고) 이 갖고
    // 있던 스크롤 위치를 기억해뒀다가, pane1(다음 스크롤 컨테이너가 될
    // 요소)에 그대로 복원한다 — 안 하면 스크롤 주체가 바뀌는 순간 항상
    // 0(최상단)으로 리셋되어 보였다.
    const prevScrollTop = modalEl.scrollTop;
    // [버그 수정 — 커스텀 스크롤바] wireScrollbarAutoShow(ui/modal.js) 가
    // modalEl 기준으로 만들어 body 에 붙여둔 트랙은 modalEl 이 더 이상
    // 스크롤 컨테이너가 아니게 되면(pane1 로 대체) 고아 상태로 화면에
    // 남는다 — pane1 은 아래에서 자기 몫의 새 트랙을 따로 받으므로, 옛
    // 것은 미리 제거한다.
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
    // [커스텀 스크롤바] pane1 자신을 기준으로 한 새 오버레이 막대를
    // 만들어준다 — wirePaneInteractions 의 다른 배선(뷰 전환 등)은 이미
    // pane1 이 갖고 있던 원본 이벤트라 다시 호출해도 onXxx 재할당으로
    // 안전하게 덮어써진다.
    wirePaneInteractions(pane1);
  }

  // 기존 pane 2 제거 후 새로 추가 (다른 항목 클릭 시 교체 동작)
  const oldPane2 = container.querySelector(".split-view__pane:nth-child(2)");
  // [버그 수정 — 사진 확대 pane 이 열려있는 도중 pane1 안의 다른 항목을
  // 클릭해 pane2 를 교체하면 pane1 사진 영역이 계속 접힌 채로 남음]
  // 이 케이스는 closeSplitPane2/restorePane2 를 전혀 거치지 않고 여기서
  // 바로 oldPane2 를 지우고 새 pane2 를 붙이는 경로라, pane1 에 걸린
  // modal__media-wrap--collapsing(wireMediaLightbox, modal.js)을 풀어줄
  // 기회가 없었다 — 지금 닫히는 pane2 가 사진 확대 pane 이었을 때만
  // pane1 의 collapsing 클래스를 여기서 직접 제거한다.
  if (oldPane2 && oldPane2.classList.contains("split-view__pane--media")) {
    const pane1 = container.querySelector(".split-view__pane:first-child");
    const wrap = pane1 ? pane1.querySelector(".modal__media-wrap--collapsing") : null;
    if (wrap) wrap.classList.remove("modal__media-wrap--collapsing");
  }
  if (oldPane2) oldPane2.remove();

  if (paneId) container.dataset.paneId = paneId; else delete container.dataset.paneId;

  const pane2 = document.createElement("div");
  // [사용자 요청] pane 2 가 이미 열려있는 상태에서 다른 항목으로 "교체"될
  // 때는(예: Split View 안에서 앰프를 바꿔가며 확인) 모달 자체의 폭 확장이
  // 없으므로 최초 오픈 때의 .22s 지연(모달 확장 트랜지션과 맞추기 위한
  // 것)이 불필요해 체감상 느리게 느껴졌다 — 최초 오픈에만
  // split-view__pane--enter(지연 있는 페이드인)를 쓰고, 교체 시에는 지연
  // 없는 split-view__pane--swap 을 쓴다.
  pane2.className = `split-view__pane ${isFirstOpen ? "split-view__pane--enter" : "split-view__pane--swap"}${paneClass ? ` ${paneClass}` : ""}`;
  pane2.style.setProperty("--mfr", paneColor);
  pane2.innerHTML = headHTML + bodyHTML;
  container.appendChild(pane2);
  // [버그 수정 — 사진 확대 pane 을 배경 클릭으로 닫으면 원래 pane2(예:
  // 다른 제품의 Split View)가 복원되지 않고 Split View 전체가 꺼짐]
  // X 버튼 클릭은 아래에서 onClose 를 호출하지만, 배경(좌우 빈 공간)
  // 클릭은 modal.js splitViewCloser → closeSplitView() 경로를 타는데
  // 그동안 이 경로는 closeSplitPane2 만 호출하고 onClose 를 몰랐다 —
  // openMediaSplitPane 이 넘긴 onClose(사진 확대 pane 전용, restorePane2
  // 로 원래 pane2 를 되살림)가 이 경로에서는 누락돼 그냥 Split View 가
  // 통째로 닫혀버렸다. pane2 DOM 노드 자체에 콜백을 매달아두면 X 버튼
  // 경로든 배경 클릭 경로든 같은 곳(closeSplitPane2 직전)에서 꺼내 쓸 수
  // 있다.
  pane2._onClose = onClose || null;
  const closeBtn = pane2.querySelector("[data-modal-close]");
  if (closeBtn) {
    closeBtn.onclick = () => {
      closeSplitPane2(modalEl, container);
      if (onClose) onClose();
    };
  }
  // [개선사항 0-1] pane 2 공통 인터랙션 배선 — 이전에는 openModalWith()
  // 에서만 배선돼 pane 2 의 뷰 전환·mm/in·줌·+N 토글이 전부 무반응이었다.
  wirePaneInteractions(pane2);
  if (onMounted) onMounted(pane2);
  // [모달 라우팅] 연관 항목 pane2 는 그 항목 id 를 URL 에 기록한다. 사진
  // 확대 pane(paneId 없음)은 openMediaSplitPane 이 자기 스펙("media~...")을
  // 직접 기록하므로 여기서는 건드리지 않는다.
  if (paneId) setPane2Route(paneId);
  return true;
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
  // [사용자 요청] 사진 확대 pane 은 열릴 때 페이드인 애니메이션이 있는데
  // X 를 누르면 그냥 즉시 사라져 어색했다 — 이 pane 에서만 역방향(축소
  // +페이드아웃) 애니메이션을 재생한 뒤 실제로 제거한다. 다른 도메인
  // pane2(앰프 등)는 기존 동작(즉시 제거) 그대로 유지.
  // [구현] 아래에서 container 자체를 곧 remove() 하므로, pane2 가 그 안에
  // 남아있으면 애니메이션이 재생될 새도 없이 함께 사라진다 — 애니메이션
  // 재생 중인 동안만 화면 좌표(getBoundingClientRect)를 그대로 고정한 채
  // document.body 로 옮겨 붙여두고, 끝나면 제거한다.
  if (pane2 && pane2.classList.contains("split-view__pane--media")) {
    removeScrollbarTrack(pane2);
    const rect = pane2.getBoundingClientRect();
    pane2.style.position = "fixed";
    pane2.style.top = `${rect.top}px`;
    pane2.style.left = `${rect.left}px`;
    pane2.style.width = `${rect.width}px`;
    pane2.style.height = `${rect.height}px`;
    pane2.style.margin = "0";
    // [버그 수정 — 애니메이션이 안 보임] document.body 로 옮기면 더 이상
    // .modal-overlay(z-index:100) 의 자손이 아니게 되는데, 이 pane 은
    // z-index 를 별도로 갖고 있지 않아 기본값(auto)으로 오버레이보다 아래
    // 깔려버렸다 — 애니메이션 자체는 재생되고 있었지만 화면에 전혀 보이지
    // 않았던 것. 오버레이보다 위로 명시한다.
    pane2.style.zIndex = "150";
    document.body.appendChild(pane2);
    // [버그 수정] --enter/--swap 클래스가 이미 걸려있는 채로 --exit 를
    // 추가하면 같은 요소에 animation 단축 속성이 두 클래스에서 각각
    // 선언돼(둘 다 "both" 로 종료 상태를 고정) 충돌해 --exit 가 재생되지
    // 않았다 — 이전 진입 애니메이션 클래스를 먼저 떼어내고 --exit 만
    // 단독으로 남긴다.
    // [버그 수정] 모션 토글(body.reduce-motion, css/base.css)이 켜져있으면
    // animation 이 전역으로 꺼져 animationend 이벤트가 영영 발생하지 않는다
    // — 이 경우 애니메이션을 재생할 필요도 없으므로(모션 off 의 취지대로
    // 즉시 반응해야 함) 클래스 조작 없이 곧장 제거한다. setTimeout 안전
    //장치를 두면 모션이 꺼진 상태에서도 클릭 반응이 그 시간만큼 지연되어
    // "즉시 꺼짐"이라는 모션 off 의 취지에 어긋난다.
    if (document.body.classList.contains("reduce-motion")) {
      pane2.remove();
    } else {
      // [버그 수정] --enter/--swap 클래스가 이미 걸려있는 채로 --exit 를
      // 추가하면 같은 요소에 animation 단축 속성이 두 클래스에서 각각
      // 선언돼(둘 다 "both" 로 종료 상태를 고정) 충돌해 --exit 가 재생되지
      // 않았다 — 이전 진입 애니메이션 클래스를 먼저 떼어내고 --exit 만
      // 단독으로 남긴다.
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
  // [버그 수정 — 스크롤 위치 유지] 반드시 modal--split 클래스를 떼기
  // *전에* scrollTop 을 읽어야 한다. 클래스를 먼저 떼면 .modal 이 그
  // 순간 단일 모달 CSS(width:628px 등, modal.css)로 즉시 리레이아웃되고,
  // 그 안의 pane1 은 아직 .split-view 안에 있어 크기가 뒤틀리면서
  // scrollHeight <= clientHeight 가 돼버려(스크롤 불가능한 상태) scrollTop
  // 이 읽는 시점에 이미 0으로 꺾여 있었다 — 이전 시도에서 순서가 이렇게
  // 잘못돼 있었다.
  const prevScrollTop = pane1 ? pane1.scrollTop : 0;
  // [커스텀 스크롤바] pane1 자신 기준으로 body 에 붙어있던 트랙은 modalEl
  // 로 넘겨받으면 잘못된 값으로 남는다 — 옮기지 않고 미리 제거, modalEl
  // 은 아래에서 자기 몫의 새 트랙을 받는다.
  removeScrollbarTrack(pane1);
  modalEl.classList.remove("modal--split");
  // [사용자 요청] 사진 확대 pane 을 열 때 왼쪽 pane 의 사진 영역에 걸어둔
  // 접힘 애니메이션 클래스(modal.js wireMediaLightbox 참고) — 확대 pane 이
  // 닫히면 사진 영역이 다시 펼쳐지는 트랜지션이 보여야 한다. 재부모화(DOM
  // 이동) 전에 클래스부터 떼면 "펼쳐지기 전(접힌)" 상태를 화면에 한 번도
  // 그리지 못한 채 이동까지 같은 흐름에서 끝나버려 트랜지션이 안 보였다 —
  // 이동을 먼저 끝내(요소는 문서 안에 남아있고 부모만 바뀌므로 트랜지션엔
  // 영향 없음) 그 상태가 한 프레임 페인트된 뒤에 클래스를 떼어 펼침
  // 트랜지션이 재생되게 한다.
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
  // [모달 라우팅] pane2 가 닫혔으니 URL 3번째 단도 지운다 — 사진 확대 pane
  // 닫기 후 원래 pane2 복원(restorePane2 → openSplitPane) 경로에서는 바로
  // 다음에 setPane2Route 가 다시 기록하므로 일시적 초기화로 끝난다.
  clearPane2Route();
}

/**
 * Split View 해제 — pane 2 제거 + 모달 폭 원복. 외부(배경 클릭 등)에서 호출.
 * [사용자 요청] 배경 클릭 시 pane2 부터 먼저 닫는 데 쓰인다(modal.js
 * setSplitViewCloser 참고) — 닫을 pane2 가 있었으면 true, 스플릿뷰 자체가
 * 없었으면(이미 단일 모달 상태) false 를 반환해 호출부가 "이번 클릭으로
 * 뭔가 닫혔는지"를 판단할 수 있게 한다.
 * @returns {boolean}
 */
export function closeSplitView() {
  const modalEl = getModalEl();
  const container = modalEl.querySelector(".split-view");
  if (container) {
    // [버그 수정] X 버튼 클릭 경로(위 openSplitPane)와 동일하게, pane2가
    // onClose 콜백을 갖고 있으면(현재는 사진 확대 pane 전용 —
    // openMediaSplitPane 이 매단 restorePane2 호출) closeSplitPane2 로
    // pane2를 지우기 *전에* 참조를 읽어두고, 지운 뒤 호출한다. 사진
    // 확대가 아닌 일반 pane2(앰프 등)는 _onClose 가 없어 기존과 동일하게
    // 그냥 Split View 가 닫힌다.
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
