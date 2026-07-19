/**
 * @module main
 * 앱 진입점(entry point).
 *
 * 아키텍처 요약:
 *   - 각 도메인(Speaker/Amplifier/DSP/Software/Brand)은 자기 폴더의
 *     <이름>.controller.js 안에서 mount/build/render/모달 수명주기를 전부
 *     소유하고, import 되는 순간 라우터에 스스로 등록된다.
 *   - 이 파일은 도메인 controller 들을 import 하고 모달/내비/라우터를
 *     부팅만 한다.
 *
 * 새 도메인(탭) 추가 절차:
 *   1) js/domains/<이름>/ 폴더에 controller/schema/view/data 4개 파일 생성
 *   2) 아래에 initXxxDomain() import + 호출 한 줄씩 추가
 *   3) index.html 의 <main> 에 <div id="view-<이름>" hidden></div> 추가
 *   — 이것으로 끝. 다른 파일은 수정할 필요 없음 (자세한 내용: ARCHITECTURE.md)
 */
import { initRouter, onItemClose, onPane2Restore, onPane2Close, clearPane2Route } from "./core/router.js";
import { renderNav } from "./ui/nav.js";
import { initModal, closeModal } from "./ui/modal.js";
import { closeSplitView } from "./ui/split-view.js";
import { initTheme } from "./ui/theme.js";
import { initMediaToggle } from "./ui/media-toggle.js";
import { initMotionToggle } from "./ui/motion-toggle.js";
import { initStickyHeader } from "./ui/sticky-header.js";
import { $ } from "./core/dom.js";

import { initSpeakersDomain } from "./domains/speakers/speakers.controller.js";
import { initAmplifiersDomain } from "./domains/amplifiers/amplifiers.controller.js";
import { initDspsDomain } from "./domains/dsps/dsps.controller.js";
import { initAccessoriesDomain } from "./domains/accessories/accessories.controller.js";
import { initSoftwareDomain } from "./domains/software/software.controller.js";
import { initBrandDomain, getBrandNames } from "./domains/brand/brand.controller.js";
// [사용자 요청] 카드/모달의 각 블록이 실제로 어떤 CSS 클래스명에 대응하는지
// 확인하기 위한 개발용 라벨링 탭 — 정식 도메인이 아니라 speakers 데이터
// 샘플 1개를 재사용하는 정적 뷰(js/domains/test/test.controller.js 참고).
import { initTestDomain } from "./domains/test/test.controller.js";

initModal();
// [모달 라우팅] 브라우저 뒤로가기 등으로 해시에서 카드 id 가 사라지면 모달을
// 닫는다 — 라우터(core)가 ui/modal 을 직접 import 하지 않도록 여기서 연결.
onItemClose(closeModal);

/**
 * [모달 라우팅 — Split View 딥링크 복원] 해시 3번째 단(pane2 스펙)을 읽어
 * 이미 열린 카드 모달 위에 Split View 상태를 복원한다. 별도 상태 저장소를
 * 두는 대신, 실제 사용자가 했을 클릭(연관 항목 행/칩, 사진, 뷰 전환 버튼)을
 * 그대로 시뮬레이션한다 — 각 도메인 controller 가 걸어둔 기존 배선을 100%
 * 재사용하므로 복원 전용 로직과 실사용 로직이 어긋날 수 없다.
 *
 * pane2 스펙 형태 (core/router.js 해시 형식 주석 참고):
 *   "amp-la-la12x"               → 연관 항목 상세 pane
 *   "media~front"                → pane1(원본 모달) 사진 확대 pane
 *   "amp-la-la12x~media~front"   → 연관 항목의 사진 확대 pane
 */
function restorePane2FromRoute(spec) {
  const modalEl = document.getElementById("modal");
  if (!modalEl) return;
  // 스펙 파싱
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
  // 연관 항목 클릭 — 모달 안에서 이 id 를 가리키는 클릭 가능한 요소를 찾는다
  // (앰프 행/스피커 행/액세서리 칩/소프트웨어 칩/DSP 칩 전부 커버).
  const clickEntity = () => {
    const sel = ["data-amp-id", "data-speaker-id", "data-accessory-id", "data-software-id", "data-dsp-id"]
      .map(a => `[${a}="${entityId.replace(/"/g, '\\"')}"]`).join(",");
    const el = modalEl.querySelector(sel);
    if (el) { el.click(); return true; }
    return false;
  };
  // 사진 확대 — 뷰 전환 버튼으로 원하는 뷰를 먼저 띄운 뒤 사진을 클릭한다.
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
    ? modalEl.querySelector(".split-view__pane:nth-child(2)") // 방금 연 연관 항목 pane 의 사진
    : modalEl;                                                 // pane1(원본 모달)의 사진
  if (root) zoomMedia(root);
}
onPane2Restore(restorePane2FromRoute);
// 해시에서 pane2 단이 사라지면(URL 직접 수정 등) Split View pane2 를 닫는다.
onPane2Close(closeSplitView);

initSpeakersDomain();
initAmplifiersDomain();
initDspsDomain();
initAccessoriesDomain();
initSoftwareDomain();
initBrandDomain();
initTestDomain();

// [사용자 요청] 사진/다크모드/모션 토글 버튼이 이제 topbar 가 아니라
// renderNav() 가 그리는 topnav__tools 안에 있으므로, 버튼을 DOM 에서 찾아
// 연결하는 initTheme/initMediaToggle/initMotionToggle 은 반드시 renderNav
// 이후에 호출해야 한다(이전 순서대로 두면 #theme-toggle 등이 아직 없어 null).
renderNav($("#topnav"));
initTheme($("#theme-toggle"));
initMediaToggle($("#media-toggle"));
initMotionToggle($("#motion-toggle"));
initRouter("speakers");

// 상단바 부제: 데이터에 포함된 전체 브랜드 목록 — BRANDS 데이터로 구동되므로
// 새 제조사(JBL, Coda, Clair, ...)를 추가해도 index.html 을 손댈 필요가 없다.
const subtitleEl = $("#brand-subtitle");
if (subtitleEl) subtitleEl.textContent = getBrandNames().join(" · ");

// [사용자 요청] topnav(도메인 탭) 상단 고정 — 실제 렌더링된 높이를 측정해
// controls(검색/필터 바)가 그 바로 아래 이어 붙도록 한다.
initStickyHeader($("#topnav"));
