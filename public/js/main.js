/**
 * @module main
 * 앱 진입점. 각 도메인은 자기 controller 안에서 mount/render/모달을 전부
 * 소유하고 라우터에 스스로 등록한다 — 여기서는 부팅 순서만 잡는다.
 *
 * 새 탭 추가: domains/<이름>/ 에 4파일 생성 → 아래 import+호출 1줄 →
 * index.html 에 <div id="view-<이름>" hidden> 1줄. (docs/ARCHITECTURE.md)
 */
import {
  clearPane2Route,
  initRouter,
  onItemClose,
  onPane2Close,
  onPane2Restore,
  refreshActiveRoute,
} from "./core/router.js";
import { parsePaneSpec } from "./core/route-codec.js";
import { renderNav } from "./ui/nav.js";
import { initModal, closeModal, isMobileLayout } from "./ui/modal.js";
import { closeSplitView } from "./ui/split-view.js";
import { initRelationNavigation, openDetailPane } from "./ui/relation-navigation.js";
import { initMediaToggle, initMotionToggle } from "./ui/toggle.js";
import { initStickyHeader } from "./ui/sticky-header.js";
import { $ } from "./core/dom.js";

import { initSpeakersDomain } from "./domains/speakers/speakers.controller.js";
import { initAmplifiersDomain } from "./domains/amplifiers/amplifiers.controller.js";
import { initDspsDomain } from "./domains/dsps/dsps.controller.js";
import { initAccessoriesDomain } from "./domains/accessories/accessories.controller.js";
import { initSoftwareDomain } from "./domains/software/software.controller.js";
import { initBrandDomain, getBrandNames } from "./domains/brand/brand.controller.js";

initModal();
initRelationNavigation();
// 라우터(core)가 ui/modal 을 직접 import 하지 않도록 여기서 연결한다.
onItemClose(closeModal);

/**
 * 딥링크 해시의 pane2 상태를 화면에 복원한다.
 *
 * 관계 항목은 detail registry로 직접 복원하고, 사진과 뷰 전환은 실제 UI 훅을
 * 사용한다. 관계 DOM이 아직 화면에 없더라도 등록된 ID라면 같은 상세를 만든다.
 *
 * spec 형태: "amp-la-la12x" | "media~front" | "amp-la-la12x~media~front"
 */
function restorePane2FromRoute(spec) {
  const modalEl = document.getElementById("modal");
  if (!modalEl) return;
  const pane = parsePaneSpec(spec);
  if (!pane) { clearPane2Route(); return; }
  const entityId = pane.kind === "entity" || pane.kind === "entity-media" ? pane.entityId : "";
  const mediaSlug = pane.kind === "media" || pane.kind === "entity-media" ? pane.mediaSlug : null;
  // 뷰 전환 버튼으로 원하는 뷰를 띄운 뒤 사진을 클릭한다.
  const zoomMedia = (root) => {
    if (mediaSlug) {
      const btn = [...root.querySelectorAll("[data-view-switch]")]
        .find(candidate => candidate.dataset.viewSwitch === mediaSlug);
      if (btn) btn.click();
    }
    const media = root.querySelector(".modal__media");
    if (media) media.click();
  };
  // 라우터는 콜백 전에 이미 최종 pane2 상태를 활성화한다. entity-media 복원
  // 중간의 entity 화면은 모바일 back 스택에만 기록하고 URL은 최종값을 유지한다.
  if (entityId && !openDetailPane(entityId, modalEl, { syncRoute: false })) {
    clearPane2Route();
    return;
  }
  if (mediaSlug == null) return;
  const root = entityId
    ? (isMobileLayout() ? modalEl : modalEl.querySelector(".split-view__pane:nth-child(2)"))
    : modalEl;
  if (root) zoomMedia(root);
}
onPane2Restore(restorePane2FromRoute);
onPane2Close(closeSplitView);

initSpeakersDomain();
initAmplifiersDomain();
initDspsDomain();
initAccessoriesDomain();
initSoftwareDomain();
initBrandDomain();

// 토글 버튼들은 renderNav() 가 그리는 topnav__tools 안에 있으므로 반드시
// renderNav 이후에 연결해야 한다(그 전이면 전역 토글 버튼이 아직 없다).
renderNav($("#topnav"));
initMediaToggle($("#media-toggle"));
initMotionToggle($("#motion-toggle"));
initRouter("speakers");

// 회전/창 크기 변경으로 split과 모바일 전체교체 경계가 바뀌면 같은 URL을
// 새 레이아웃 규칙으로 다시 렌더링해 DOM·스택·스크롤 트랙을 한 상태로 맞춘다.
const modalLayoutQuery = window.matchMedia("(max-width: 860px)");
const refreshModalLayout = () => refreshActiveRoute();
if (typeof modalLayoutQuery.addEventListener === "function") {
  modalLayoutQuery.addEventListener("change", refreshModalLayout);
} else if (typeof modalLayoutQuery.addListener === "function") {
  modalLayoutQuery.addListener(refreshModalLayout);
}

// 상단바 부제 — BRANDS 데이터로 구동되므로 제조사를 추가해도 index.html 은 그대로.
const subtitleEl = $("#brand-subtitle");
if (subtitleEl) subtitleEl.textContent = getBrandNames().join(" · ");

// topnav 고정 — 실제 렌더 높이를 재서 controls 가 그 아래 이어 붙게 한다.
initStickyHeader($("#topnav"));
