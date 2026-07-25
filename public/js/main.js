/**
 * @module main
 * 앱 진입점. 각 도메인은 자기 controller 안에서 mount/render/모달을 전부
 * 소유하고 라우터에 스스로 등록한다 — 여기서는 부팅 순서만 잡는다.
 *
 * 새 탭 추가: domains/<이름>/ 에 4파일 생성 → 아래 import+호출 1줄 →
 * index.html 에 <div id="view-<이름>" hidden> 1줄. (docs/ARCHITECTURE.md)
 */
import { initRouter, onItemClose, onPane2Restore, onPane2Close, clearPane2Route } from "./core/router.js";
import { renderNav } from "./ui/nav.js";
import { initModal, closeModal } from "./ui/modal.js";
import { closeSplitView } from "./ui/split-view.js";
import { initTheme, initMediaToggle, initMotionToggle } from "./ui/toggle.js";
import { initStickyHeader } from "./ui/sticky-header.js";
import { $ } from "./core/dom.js";

import { initSpeakersDomain } from "./domains/speakers/speakers.controller.js";
import { initAmplifiersDomain } from "./domains/amplifiers/amplifiers.controller.js";
import { initDspsDomain } from "./domains/dsps/dsps.controller.js";
import { initAccessoriesDomain } from "./domains/accessories/accessories.controller.js";
import { initSoftwareDomain } from "./domains/software/software.controller.js";
import { initBrandDomain, getBrandNames } from "./domains/brand/brand.controller.js";

initModal();
// 라우터(core)가 ui/modal 을 직접 import 하지 않도록 여기서 연결한다.
onItemClose(closeModal);

/**
 * 딥링크 해시의 pane2 상태를 화면에 복원한다.
 *
 * 별도 상태 저장소를 두는 대신 실제 사용자가 했을 클릭(연관 항목 행/칩, 사진,
 * 뷰 전환 버튼)을 시뮬레이션한다 — 각 controller 가 걸어둔 배선을 그대로
 * 재사용하므로 복원 경로와 실사용 경로가 어긋날 수 없다.
 *
 * spec 형태: "amp-la-la12x" | "media~front" | "amp-la-la12x~media~front"
 */
function restorePane2FromRoute(spec) {
  const modalEl = document.getElementById("modal");
  if (!modalEl) return;
  let entityId = "", mediaSlug = null;
  if (spec.startsWith("media~")) {
    mediaSlug = spec.slice("media~".length);
  } else if (spec.includes("~media~")) {
    const i = spec.indexOf("~media~");
    entityId = spec.slice(0, i);
    mediaSlug = spec.slice(i + "~media~".length);
  } else {
    entityId = spec;
  }
  // 앰프 행·스피커 행·액세서리/소프트웨어/DSP 칩을 한 번에 커버한다.
  const clickEntity = () => {
    const sel = ["data-amp-id", "data-speaker-id", "data-accessory-id", "data-software-id", "data-dsp-id"]
      .map(a => `[${a}="${entityId.replace(/"/g, '\\"')}"]`).join(",");
    const el = modalEl.querySelector(sel);
    if (el) { el.click(); return true; }
    return false;
  };
  // 뷰 전환 버튼으로 원하는 뷰를 띄운 뒤 사진을 클릭한다.
  const zoomMedia = (root) => {
    if (mediaSlug) {
      const btn = root.querySelector(`[data-view-switch="${mediaSlug}"]`);
      if (btn) btn.click();
    }
    const media = root.querySelector(".modal__media");
    if (media) media.click();
  };
  if (entityId && !clickEntity()) { clearPane2Route(); return; } // 무효 id — 해시만 원복
  if (mediaSlug == null) return;
  const root = entityId
    ? modalEl.querySelector(".split-view__pane:nth-child(2)")
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
// renderNav 이후에 연결해야 한다(그 전이면 #theme-toggle 등이 아직 null).
renderNav($("#topnav"));
initTheme($("#theme-toggle"));
initMediaToggle($("#media-toggle"));
initMotionToggle($("#motion-toggle"));
initRouter("speakers");

// 상단바 부제 — BRANDS 데이터로 구동되므로 제조사를 추가해도 index.html 은 그대로.
const subtitleEl = $("#brand-subtitle");
if (subtitleEl) subtitleEl.textContent = getBrandNames().join(" · ");

// topnav 고정 — 실제 렌더 높이를 재서 controls 가 그 아래 이어 붙게 한다.
initStickyHeader($("#topnav"));
