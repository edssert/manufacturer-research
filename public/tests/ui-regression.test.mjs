/**
 * UI 경계 회귀 테스트 — 모달 단계 닫기, Split View 수명주기, 안전한 라우트
 * 복원, 배열형 필터를 실제 DOM에서 검증한다.
 *
 * 실행: node public/tests/ui-regression.test.mjs
 */
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { JSDOM } from "jsdom";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const imp = path => import(pathToFileURL(path).href);
let pass = 0;
let fail = 0;

function check(name, condition) {
  if (condition) pass++;
  else fail++;
  console.log(`${condition ? "PASS" : "FAIL"} — ${name}`);
}

const html = readFileSync(join(ROOT, "index.html"), "utf8");
const dom = new JSDOM(html, {
  url: "http://localhost/#speakers/%E0%A4%A",
  pretendToBeVisual: true,
});

global.window = dom.window;
global.document = dom.window.document;
global.location = dom.window.location;
global.history = dom.window.history;
global.HTMLElement = dom.window.HTMLElement;
global.getComputedStyle = dom.window.getComputedStyle.bind(dom.window);
global.requestAnimationFrame = dom.window.requestAnimationFrame.bind(dom.window);

let osReducedMotion = false;
dom.window.matchMedia = query => ({
  matches: query === "(prefers-reduced-motion: reduce)" ? osReducedMotion : false,
  media: query,
  addListener() {},
  removeListener() {},
  addEventListener() {},
  removeEventListener() {},
});
dom.window.IntersectionObserver = globalThis.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

let bootError = null;
try {
  await imp(join(ROOT, "public/js/main.js"));
} catch (error) {
  bootError = error;
}
check("잘못된 퍼센트 인코딩 해시에서도 앱이 부팅됨", bootError === null);
check("유효하지 않은 item 해시는 도메인 경로로 정리됨", location.hash === "#speakers");

const { navigateTo } = await imp(join(ROOT, "public/js/core/router.js"));
const { closeModal, openModalWith } = await imp(join(ROOT, "public/js/ui/modal.js"));
const { closeSplitView, openSplitPane } = await imp(join(ROOT, "public/js/ui/split-view.js"));
const { removeScrollbarTrack, wirePaneInteractions } = await imp(join(ROOT, "public/js/ui/pane-interactions.js"));
const { buildFilters, updateChipDisabledStates } = await imp(join(ROOT, "public/js/ui/filters.js"));

function click(el) {
  el.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
}

function activateNativeButton(element, key) {
  element.focus();
  element.dispatchEvent(new dom.window.KeyboardEvent("keydown", { key, bubbles: true, cancelable: true }));
  element.dispatchEvent(new dom.window.KeyboardEvent("keyup", { key, bubbles: true, cancelable: true }));
  element.click();
}

const INTERACTIVE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[role='button']",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function nestedInteractiveElements(root) {
  if (!root) return [];
  return [...root.querySelectorAll(INTERACTIVE_SELECTOR)].filter(element =>
    element.querySelector(INTERACTIVE_SELECTOR),
  );
}

function openCardContaining(cardSelector, detailSelector) {
  for (const card of document.querySelectorAll(cardSelector)) {
    click(card);
    const detail = document.querySelector(detailSelector);
    if (detail) return { card, detail };
    closeModal();
  }
  return { card: null, detail: null };
}

// L-Acoustics K Series만 카드→상세→확대까지 흰 제품 스테이지를 이어받는다.
navigateTo("speakers");
const kSeriesCard = document.querySelector('#spk-results .card[data-id="spk-la-k3"]');
check(
  "K Series 카드가 흰 제품 스테이지를 사용함",
  kSeriesCard?.querySelector(".card__media")?.classList.contains("product-media--white"),
);
if (kSeriesCard) click(kSeriesCard);
const kSeriesModalMedia = document.querySelector("#modal .modal__media-wrap");
check("K Series 상세가 흰 제품 스테이지를 사용함", kSeriesModalMedia?.classList.contains("product-media--white"));
if (kSeriesModalMedia) click(kSeriesModalMedia.querySelector(".modal__media"));
check(
  "K Series 이미지 확대가 흰 제품 스테이지를 이어받음",
  document.querySelector("#modal .media-split-pane__body-wrap")?.classList.contains("product-media--white"),
);
closeModal();

// 라우트의 값은 CSS selector에 직접 보간하지 않고 속성값으로 비교해야 한다.
navigateTo("speakers");
const speakerWithAmp = openCardContaining("#spk-results .card[data-id]", "#modal [data-amp-id]");
let selectorRouteSafe = true;
if (speakerWithAmp.card) {
  const badPaneId = "not-found\\";
  history.replaceState(
    null,
    "",
    `#speakers/${encodeURIComponent(speakerWithAmp.card.dataset.id)}/${encodeURIComponent(badPaneId)}`,
  );
  try {
    window.dispatchEvent(new dom.window.HashChangeEvent("hashchange"));
  } catch {
    selectorRouteSafe = false;
  }
  selectorRouteSafe =
    selectorRouteSafe && location.hash === `#speakers/${encodeURIComponent(speakerWithAmp.card.dataset.id)}`;
}
check("selector 메타문자가 포함된 pane 경로를 안전하게 거절함", selectorRouteSafe);

// ESC는 오른쪽 pane을 먼저 닫고, 다음 입력에서 전체 모달을 닫아야 한다.
const currentAmpDetail = document.querySelector("#modal [data-amp-id]");
const currentAmpRow = currentAmpDetail?.closest(".match-table__row[data-amp-id]");
const currentAmpControl = currentAmpRow?.querySelector(".match-table__relation-trigger[data-amp-id]");
const currentAmpToggle = currentAmpRow?.querySelector(".match-table__toggle-btn");
check(
  "관계 표가 row/cell 의미와 형제 관계 버튼을 유지해 중첩 인터랙티브 요소가 없음",
  currentAmpRow?.getAttribute("role") === "row" &&
    currentAmpControl?.tagName === "BUTTON" &&
    currentAmpControl.parentElement?.getAttribute("role") === "cell" &&
    (!currentAmpToggle || currentAmpToggle.parentElement === currentAmpControl.parentElement) &&
    nestedInteractiveElements(document.getElementById("modal")).length === 0,
);
if (currentAmpControl) activateNativeButton(currentAmpControl, "Enter");
check(
  "Enter 관계 이동은 새 pane 제목으로 포커스를 이동함",
  document.querySelector("#modal .split-view__pane:nth-child(2)")?.contains(document.activeElement) &&
    document.activeElement?.classList.contains("modal__title"),
);
document.dispatchEvent(new dom.window.KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
check(
  "첫 ESC는 pane 2만 닫고 관계 버튼으로 포커스를 복원함",
  document.querySelector("#modalbg").classList.contains("modal-overlay--open") &&
    !document.querySelector("#modal .split-view") &&
    document.activeElement === currentAmpControl,
);
document.dispatchEvent(new dom.window.KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
check("두 번째 ESC는 모달을 닫음", !document.querySelector("#modalbg").classList.contains("modal-overlay--open"));

// 배열 필드의 칩은 배열 원소 단위로 활성 가능 여부를 계산한다.
const filterPanel = document.createElement("div");
const filterData = [{ type: ["Control", "Spatial"] }, { type: ["Design"] }];
const filterState = { chipFilters: {}, range: {} };
const filterSchema = {
  chipFields: [{ key: "type", label: "Type" }],
  rangeFields: [],
};
buildFilters(filterPanel, filterData, filterState, filterSchema, () => {});
updateChipDisabledStates(filterPanel, filterData, filterState, filterSchema, () => true);
const spatialChip = [...filterPanel.querySelectorAll(".chip")].find(chip => chip.dataset.val === "Spatial");
check("배열 안에만 존재하는 칩 값이 비활성화되지 않음", spatialChip && !spatialChip.disabled);

// data-* 값에 selector 문자가 포함돼도 그룹 토글이 정확한 행만 찾는다.
const interactionRoot = document.createElement("div");
const configButton = document.createElement("button");
configButton.className = "match-table__toggle-btn";
configButton.dataset.toggleGroup = `group"]]`;
configButton.setAttribute("aria-expanded", "false");
const configRow = document.createElement("div");
configRow.dataset.toggleMember = configButton.dataset.toggleGroup;
configRow.hidden = true;
interactionRoot.append(configButton, configRow);
let dataSelectorSafe = true;
try {
  wirePaneInteractions(interactionRoot);
  click(configButton);
} catch {
  dataSelectorSafe = false;
}
check("selector 문자가 포함된 data 그룹 값도 안전하게 토글됨", dataSelectorSafe && !configRow.hidden);
removeScrollbarTrack(interactionRoot);

// DSP → Software pane은 id를 보존해 URL 복원과 같은 칩 재클릭 토글을 지원한다.
navigateTo("dsps");
const dspWithSoftware = openCardContaining("#dsp-results .card[data-id]", "#modal [data-software-id]");
if (dspWithSoftware.detail) click(dspWithSoftware.detail);
const softwareId = dspWithSoftware.detail && dspWithSoftware.detail.dataset.softwareId;
check(
  "DSP → Software pane에 paneId가 기록됨",
  softwareId && document.querySelector("#modal .split-view")?.dataset.paneId === softwareId,
);
if (dspWithSoftware.detail) click(dspWithSoftware.detail);
check("같은 Software 칩 재클릭으로 pane 2가 닫힘", !document.querySelector("#modal .split-view"));
closeModal();

// pane 교체와 미디어 pane 복원 뒤에도 body 트랙은 pane 수만큼만 존재해야 한다.
const head = `<div class="modal__head"><button data-modal-close type="button">닫기</button></div>`;
const body = `<div class="modal__body"><p>pane 1</p></div>`;
const paneBody = `<div class="modal__body">
  <div class="modal__media-wrap">
    <div class="modal__media">
      <img class="modal__img" data-view="front" data-view-label="Front" src="/front.png" alt="Front">
      <img class="modal__img" data-view="rear" data-view-label="Rear" src="/rear.png" alt="Rear" hidden>
    </div>
  </div>
</div>`;
openModalWith("#123456", head, body);
openSplitPane({ headHTML: head, paneColor: "#123456", bodyHTML: paneBody, paneId: "pane-a" });
openSplitPane({ headHTML: head, paneColor: "#654321", bodyHTML: paneBody, paneId: "pane-b" });
check(
  "pane 2 교체 후 커스텀 스크롤바 트랙이 누적되지 않음",
  document.querySelectorAll("body > .modal__scrollbar-track").length === 2,
);

const pane2 = document.querySelector("#modal .split-view__pane:nth-child(2)");
const sourceImg = pane2.querySelector("img");
const unsafeSlug = `front" data-injected="yes`;
const unsafeAlt = `"><script data-injected></script>`;
const unsafeLabel = `<b>Front</b>`;
sourceImg.dataset.view = unsafeSlug;
sourceImg.alt = unsafeAlt;
sourceImg.dataset.viewLabel = unsafeLabel;
wirePaneInteractions(pane2);
click(pane2.querySelector(".modal__media"));

const mediaPane = document.querySelector("#modal .split-view__pane--media");
const serializedImg = mediaPane && mediaPane.querySelector("img");
const serializedButton = mediaPane && mediaPane.querySelector("[data-view-switch]");
check(
  "미디어 pane 재직렬화가 속성·텍스트를 그대로 보존함",
  serializedImg?.dataset.view === unsafeSlug &&
    serializedImg?.alt === unsafeAlt &&
    serializedButton?.textContent === unsafeLabel &&
    !mediaPane.querySelector("[data-injected], script, b"),
);

osReducedMotion = true;
closeSplitView();
check("OS 모션 최소화에서 닫힌 미디어 pane이 즉시 제거됨", !document.querySelector("body > .split-view__pane--media"));
check(
  "미디어 종료 후 원래 pane 복원에도 스크롤바 트랙이 누적되지 않음",
  document.querySelector("#modal .split-view")?.dataset.paneId === "pane-b" &&
    document.querySelectorAll("body > .modal__scrollbar-track").length === 2,
);
closeModal();
check(
  "모달 종료 시 커스텀 스크롤바 트랙이 모두 정리됨",
  document.querySelectorAll("body > .modal__scrollbar-track").length === 0,
);

console.log(`\n결과: ${pass} PASS / ${fail} FAIL`);
process.exit(fail ? 1 : 0);
