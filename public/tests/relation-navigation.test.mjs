/**
 * 상세 provider와 모달 관계 이동의 통합 계약 테스트.
 * 실행: node public/tests/relation-navigation.test.mjs
 */
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { JSDOM } from "jsdom";

import { ACCESSORIES } from "../js/domains/accessories/accessories.data.js";
import { AMPLIFIERS } from "../js/domains/amplifiers/amplifiers.data.js";
import { DSPS } from "../js/domains/dsps/dsps.data.js";
import { SOFTWARE } from "../js/domains/software/software.data.js";
import { SPEAKER_CATALOG } from "../js/domains/speakers/speakers.detail.js";
import { DetailRegistry } from "../js/relationships/detail-registry.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const imp = path => import(pathToFileURL(path).href);
let pass = 0;
let fail = 0;

function check(name, condition) {
  if (condition) pass++;
  else fail++;
  console.log(`${condition ? "PASS" : "FAIL"} — ${name}`);
}

function click(element) {
  element?.dispatchEvent(new window.MouseEvent("click", { bubbles: true, cancelable: true }));
}

function activateNativeButton(element, key) {
  element?.focus();
  element?.dispatchEvent(new window.KeyboardEvent("keydown", { key, bubbles: true, cancelable: true }));
  element?.dispatchEvent(new window.KeyboardEvent("keyup", { key, bubbles: true, cancelable: true }));
  element?.click();
}

/** @param {string} selector @param {ParentNode} [root] @returns {HTMLElement|null} */
function query(selector, root = document) {
  return /** @type {HTMLElement|null} */ (root.querySelector(selector));
}

/** @param {string} selector @param {ParentNode} [root] @returns {NodeListOf<HTMLElement>} */
function queryAll(selector, root = document) {
  return /** @type {NodeListOf<HTMLElement>} */ (root.querySelectorAll(selector));
}

/** @param {Element|null|undefined} element @param {string} selector @returns {HTMLElement|null} */
function closest(element, selector) {
  return /** @type {HTMLElement|null} */ (element?.closest(selector) || null);
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
  return [...queryAll(INTERACTIVE_SELECTOR, root)].filter(element => element.querySelector(INTERACTIVE_SELECTOR));
}

function localRuntimeReferenceError(reference) {
  if (!reference || reference.startsWith("#") || /^(?:https?:|mailto:|tel:|data:)/i.test(reference)) {
    return null;
  }
  if (/^[a-z][a-z\d+.-]*:/i.test(reference) || reference.startsWith("//")) {
    return `허용되지 않은 URL 형식: ${reference}`;
  }
  const pathOnly = reference.split(/[?#]/, 1)[0];
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathOnly);
  } catch {
    return `디코딩할 수 없는 경로: ${reference}`;
  }
  const publicRoot = resolve(ROOT, "public");
  const target = resolve(ROOT, decodedPath);
  const relativeToPublic = relative(publicRoot, target);
  if (!relativeToPublic || relativeToPublic === ".." || relativeToPublic.startsWith(`..${sep}`)) {
    return `배포 public 경계를 벗어난 경로: ${reference}`;
  }
  return existsSync(target) ? null : `배포 파일이 없는 경로: ${reference}`;
}

function runtimeMarkupReferenceErrors(markup) {
  const errors = [];
  const pattern = /\b(?:href|src)\s*=\s*(["'])(.*?)\1/gi;
  for (const match of markup.matchAll(pattern)) {
    const error = localRuntimeReferenceError(match[2]);
    if (error) errors.push(error);
  }
  return errors;
}

const isolated = new DetailRegistry();
isolated.register({
  kind: "fixture",
  attribute: "data-fixture-id",
  records: [{ id: "fixture-one", name: "One" }],
  label: record => record.name,
  render: () => ({ color: "#123456", head: "<h1>One</h1>", body: "<p>Body</p>" }),
});
assert.deepEqual(isolated.resolve("fixture-one"), {
  id: "fixture-one",
  kind: "fixture",
  attribute: "data-fixture-id",
  color: "#123456",
  head: "<h1>One</h1>",
  body: "<p>Body</p>",
  paneId: "fixture-one",
});
assert.equal(isolated.label("fixture-one"), "One");
assert.throws(
  () =>
    isolated.register({
      kind: "fixture",
      attribute: "data-other-id",
      records: [],
      render: () => ({}),
    }),
  /Duplicate detail provider kind/,
);
assert.throws(
  () =>
    isolated.register({
      kind: "other",
      attribute: "data-other-id",
      records: [{ id: "fixture-one" }],
      render: () => ({ color: "x", head: "", body: "" }),
    }),
  /Duplicate detail entity id/,
);
check("provider 등록이 kind와 ID 충돌을 즉시 거절함", true);

const html = readFileSync(join(ROOT, "index.html"), "utf8");
const dom = new JSDOM(html, {
  url: "http://localhost/",
  pretendToBeVisual: true,
});

global.window = dom.window;
global.document = dom.window.document;
global.location = dom.window.location;
global.history = dom.window.history;
global.HTMLElement = dom.window.HTMLElement;
global.getComputedStyle = dom.window.getComputedStyle.bind(dom.window);
global.requestAnimationFrame = dom.window.requestAnimationFrame.bind(dom.window);

let mobileLayout = false;
const modalLayoutListeners = new Set();
const modalLayoutMedia = {
  get matches() {
    return mobileLayout;
  },
  media: "(max-width: 860px)",
  addListener(listener) {
    modalLayoutListeners.add(listener);
  },
  removeListener(listener) {
    modalLayoutListeners.delete(listener);
  },
  addEventListener(type, listener) {
    if (type === "change") modalLayoutListeners.add(listener);
  },
  removeEventListener(type, listener) {
    if (type === "change") modalLayoutListeners.delete(listener);
  },
};
dom.window.matchMedia = query =>
  query === modalLayoutMedia.media
    ? modalLayoutMedia
    : {
        matches: false,
        media: query,
        addListener() {},
        removeListener() {},
        addEventListener() {},
        removeEventListener() {},
      };

function setMobileLayout(next) {
  if (mobileLayout === next) return;
  mobileLayout = next;
  modalLayoutListeners.forEach(listener => listener({ matches: next, media: modalLayoutMedia.media }));
}
dom.window.IntersectionObserver = globalThis.IntersectionObserver = class {
  /** @param {IntersectionObserverCallback} _callback @param {IntersectionObserverInit} [_options] */
  constructor(_callback, _options) {}
  root = null;
  rootMargin = "0px";
  scrollMargin = "0px";
  thresholds = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
};

await imp(join(ROOT, "public/js/main.js"));
const { navigateTo } = await imp(join(ROOT, "public/js/core/router.js"));
const { closeModal } = await imp(join(ROOT, "public/js/ui/modal.js"));
const { closeSplitView } = await imp(join(ROOT, "public/js/ui/split-view.js"));
const { resolveDetail } = await imp(join(ROOT, "public/js/relationships/detail-registry.js"));

const detailFixtures = [
  ["spk-la-k3", "speaker"],
  ["amp-la-la12x", "amplifier"],
  ["acc-la-k1-bump", "accessory"],
  ["dsp-la-p1", "dsp"],
  ["sw-la-soundvision", "software"],
];
check(
  "다섯 kind의 resolveDetail이 공통 head/body/color/paneId 계약을 반환함",
  detailFixtures.every(([id, kind]) => {
    const detail = resolveDetail(id);
    return (
      detail?.kind === kind &&
      detail.paneId === id &&
      typeof detail.head === "string" &&
      typeof detail.body === "string" &&
      typeof detail.color === "string"
    );
  }),
);

const detailIds = [...SPEAKER_CATALOG, ...AMPLIFIERS, ...ACCESSORIES, ...DSPS, ...SOFTWARE].map(record => record.id);
const runtimeReferenceErrors = detailIds.flatMap(id => {
  const detail = resolveDetail(id);
  if (!detail) return [`상세 provider가 없는 ID: ${id}`];
  return runtimeMarkupReferenceErrors(detail.head + detail.body).map(error => `${id}: ${error}`);
});
check(
  "모든 상세 HTML의 로컬 href/src가 배포 public 경계 안의 실제 파일만 가리킴",
  detailIds.length > 0 && runtimeReferenceErrors.length === 0,
);
assert(runtimeMarkupReferenceErrors('<a href="raw-data/manual.pdf">manual</a>').length > 0);

const k1Detail = resolveDetail("spk-la-k1");
const k1Template = document.createElement("template");
k1Template.innerHTML = (k1Detail?.head || "") + (k1Detail?.body || "");
check(
  "배포하지 않는 K1 PDF 출처명은 링크 없이 안전한 일반 텍스트로 표시됨",
  k1Template.content.textContent.includes("K1_OM_EN.pdf") &&
    k1Template.content.textContent.includes("preset_guide_EN.pdf") &&
    ![...queryAll("a[href]", k1Template.content)].some(anchor => /\.pdf(?:$|[#?])/i.test(anchor.getAttribute("href"))),
);

const controllerSources = ["speakers", "amplifiers", "accessories", "dsps", "software"].map(domain =>
  readFileSync(join(ROOT, `public/js/domains/${domain}/${domain}.controller.js`), "utf8"),
);
const accessoryViewSource = readFileSync(join(ROOT, "public/js/domains/accessories/accessories.view.js"), "utf8");
check(
  "도메인 controller가 다른 도메인의 data/schema/view를 직접 import하지 않음",
  controllerSources.every(
    source => !/from\s+["']\.\.\/(?:speakers|amplifiers|accessories|dsps|software)\//.test(source),
  ),
);
check(
  "accessories.view가 relationship 조회를 직접 import하지 않음",
  !accessoryViewSource.includes("relationships/cross-ref"),
);

// Speaker → Amp를 열고 pane2의 Speaker를 누르면 pane1과 URL item만 바뀐다.
navigateTo("speakers");
click(query('[data-id="spk-la-k3"]'));
const ampRows = [...queryAll("#modal .match-table__row[data-amp-id]")];
const firstAmpId = ampRows[0]?.dataset.ampId;
const firstAmpControl = query(".match-table__relation-trigger[data-amp-id]", ampRows[0] || document);
const firstAmpToggle = query(".match-table__toggle-btn", ampRows[0] || document);
check(
  "관계 행은 row 의미를 유지하고 관계 버튼과 +N 버튼을 형제로 분리함",
  ampRows[0]?.getAttribute("role") === "row" &&
    ampRows[0]?.tabIndex === -1 &&
    firstAmpControl?.tagName === "BUTTON" &&
    (!firstAmpToggle || firstAmpToggle.parentElement === firstAmpControl.parentElement) &&
    nestedInteractiveElements(query("#modal")).length === 0,
);
activateNativeButton(firstAmpControl, "Enter");
check(
  "Enter로 독립 관계 버튼을 활성화하면 provider pane과 제목 포커스가 열림",
  query("#modal .split-view__pane:nth-child(2)")?.dataset.detailId === firstAmpId &&
    document.activeElement?.classList.contains("modal__title"),
);
closeSplitView();
check("pane을 닫으면 관계 버튼으로 포커스가 복원됨", document.activeElement === firstAmpControl);
click(ampRows[0]);
let pane2 = query("#modal .split-view__pane:nth-child(2)");
check(
  "Speaker 관계 행의 빈 영역 클릭도 Amplifier pane2를 provider로 엶",
  !!firstAmpId && pane2?.dataset.detailKind === "amplifier" && pane2.dataset.detailId === firstAmpId,
);
check("관계 pane 추가 뒤에도 중첩 인터랙티브 요소가 없음", nestedInteractiveElements(query("#modal")).length === 0);
const inverseSpeaker = [...(pane2 ? queryAll("[data-speaker-id]", pane2) : [])].find(
  element => element.dataset.speakerId && element.dataset.speakerId !== "spk-la-k3",
);
const inverseSpeakerId = inverseSpeaker?.dataset.speakerId;
click(inverseSpeaker);
check(
  "pane2 역관계가 pane1만 교체하고 replaceItemRoute를 반영함",
  !!inverseSpeakerId &&
    query("#modal .split-view")?.dataset.paneId === firstAmpId &&
    query("#modal .split-view__pane:first-child")?.dataset.detailId === inverseSpeakerId &&
    location.hash.includes(`/${encodeURIComponent(inverseSpeakerId)}/${encodeURIComponent(firstAmpId)}`),
);

// 교체된 pane1의 관계도 재배선 없이 위임 listener가 처리하고 같은 ID는 닫힌다.
const sameAmpAgain = [...queryAll("#modal .split-view__pane:first-child [data-amp-id]")].find(
  element => element.dataset.ampId === firstAmpId,
);
click(sameAmpAgain);
check("동적 pane1 교체 뒤 같은 ID 클릭이 pane2를 토글해 닫음", !!sameAmpAgain && !query("#modal .split-view"));
closeModal();

// Configurations 펼침 상태는 다른 Amp pane으로 교체해도 유지된다.
click(query('[data-id="spk-la-k3"]'));
const distinctAmpRows = [...queryAll("#modal .match-table__row[data-amp-id]")].filter(
  (row, index, rows) => rows.findIndex(other => other.dataset.ampId === row.dataset.ampId) === index,
);
click(distinctAmpRows[0]);
let configToggle = query('#modal .split-view__pane:nth-child(2) [data-section-toggle="amp-configs"]');
if (configToggle?.getAttribute("aria-expanded") !== "true") click(configToggle);
click(distinctAmpRows[1]);
configToggle = query('#modal .split-view__pane:nth-child(2) [data-section-toggle="amp-configs"]');
check(
  "Amplifier pane 교체가 Configurations 펼침 상태를 보존함",
  distinctAmpRows.length > 1 && configToggle?.getAttribute("aria-expanded") === "true",
);
closeModal();

// 병합 모델명 안쪽의 구체 ID가 부모 행의 대표 ID보다 우선한다.
navigateTo("amplifiers");
click(query('[data-id="amp-la-la12x"]'));
const mergedPart = [...queryAll("#modal .match-table__model-name-part[data-speaker-id]")].find(part => {
  const row = closest(part, ".match-table__row[data-speaker-id]");
  return (
    part.dataset.speakerId && part.dataset.speakerId !== "null" && row?.dataset.speakerId !== part.dataset.speakerId
  );
});
const mergedRow = closest(mergedPart, ".match-table__row[data-speaker-id]");
click(mergedPart);
check(
  "병합 Speaker 이름은 클릭한 내부 data-speaker-id를 우선함",
  !!mergedPart &&
    mergedPart.dataset.speakerId !== mergedRow?.dataset.speakerId &&
    query("#modal .split-view")?.dataset.paneId === mergedPart.dataset.speakerId,
);
closeModal();

// +N/section toggle은 관계 이동으로 승격되지 않는다.
click(query('[data-id="amp-la-la12x"]'));
const matchToggle = query("#modal .match-table__toggle-btn[data-toggle-group]");
click(matchToggle);
check(
  "Configurations +N 클릭은 펼치기만 하고 관계 pane을 열지 않음",
  !!matchToggle && matchToggle.getAttribute("aria-expanded") === "true" && !query("#modal .split-view"),
);
closeModal();

// DSP ↔ Software도 같은 위임 경로를 쓰며 pane2에서 pane1로 역이동한다.
navigateTo("dsps");
let dspCard = null;
let softwareId = null;
for (const card of queryAll("#dsp-results .card[data-id]")) {
  const detail = resolveDetail(card.dataset.id);
  const match = detail?.body.match(/data-software-id="([^"]+)"/);
  if (match) {
    dspCard = card;
    softwareId = match[1];
    break;
  }
}
click(dspCard);
click([...queryAll("#modal [data-software-id]")].find(chip => chip.dataset.softwareId === softwareId));
pane2 = query("#modal .split-view__pane:nth-child(2)");
// 현재 카탈로그의 DSP→Software 관계는 provenance 기준선상 단방향이다.
// 동적 관계 훅을 넣어 데이터 대칭성과 무관하게 역방향 위임 계약을 검증한다.
const inverseDsp = document.createElement("button");
inverseDsp.type = "button";
inverseDsp.dataset.dspId = dspCard?.dataset.id || "";
pane2?.appendChild(inverseDsp);
const inverseDspId = inverseDsp?.dataset.dspId;
click(inverseDsp);
check(
  "DSP ↔ Software 역관계가 동일한 provider/위임 경로로 동작함",
  !!inverseDspId &&
    query("#modal .split-view__pane:first-child")?.dataset.detailId === inverseDspId &&
    query("#modal .split-view")?.dataset.paneId === softwareId,
);
closeModal();

// Accessory의 Amp, Speaker, Accessory 세 관계 방향을 각각 실제 DOM에서 연다.
navigateTo("accessories");
const accessoryDirections = [
  ["data-amp-id", "amplifier"],
  ["data-speaker-id", "speaker"],
  ["data-accessory-id", "accessory"],
];
let accessoryDirectionPasses = 0;
for (const [attribute, expectedKind] of accessoryDirections) {
  let card = null;
  for (const candidate of queryAll("#acc-results .card[data-id]")) {
    if (resolveDetail(candidate.dataset.id)?.body.includes(`${attribute}=`)) {
      card = candidate;
      break;
    }
  }
  click(card);
  const trigger = query(`#modal [${attribute}]`);
  click(trigger);
  const targetPane = query("#modal .split-view__pane:nth-child(2)");
  if (targetPane?.dataset.detailKind === expectedKind) accessoryDirectionPasses++;
  closeSplitView();
  closeModal();
}
check("Accessory Used In/Related의 세 방향이 모두 provider로 해석됨", accessoryDirectionPasses === 3);

// 열린 split을 다른 item 딥링크가 바로 교체해도 body 트랙은 새 모달 것만 남는다.
navigateTo("speakers");
click(query('[data-id="spk-la-k3"]'));
click(query("#modal .match-table__row[data-amp-id]"));
const splitTrackCount = queryAll("body > .modal__scrollbar-track").length;
history.replaceState(null, "", "#speakers/spk-la-k2");
window.dispatchEvent(new window.HashChangeEvent("hashchange"));
check(
  "다른 item 딥링크가 열린 Split View의 pane 트랙을 교체 전에 모두 정리함",
  splitTrackCount === 2 && !query("#modal .split-view") && queryAll("body > .modal__scrollbar-track").length === 1,
);
closeModal();
check(
  "딥링크로 교체된 모달을 닫으면 scrollbar track이 남지 않음",
  queryAll("body > .modal__scrollbar-track").length === 0,
);

// 모바일에서는 pane을 나누지 않고 stack push/back으로 같은 위임을 유지한다.
setMobileLayout(true);
navigateTo("speakers");
const mobileCard = query('[data-id="spk-la-k3"]');
click(mobileCard);
const mobileTrigger = query("#modal .match-table__row[data-amp-id]");
const mobileAmpId = mobileTrigger?.dataset.ampId;
const mobileRelationControl = query(".match-table__relation-trigger[data-amp-id]", mobileTrigger || document);
activateNativeButton(mobileRelationControl, " ");
check(
  "모바일 Space 관계 이동이 전체 상세 push와 URL pane2를 함께 적용함",
  !!query("#modal [data-modal-back]") &&
    !query("#modal .split-view") &&
    query("#modal .modal__title")?.textContent ===
      resolveDetail(mobileAmpId)?.head.match(/modal__title[^>]*>([^<]+)/)?.[1] &&
    location.hash.endsWith(`/${encodeURIComponent(mobileAmpId)}`),
);
const mobileEntityTitle = query("#modal .modal__title")?.textContent;
const mobileMediaRoot = query("#modal .modal__media");
const mobileVisibleImage = mobileMediaRoot ? query("img:not([hidden])", mobileMediaRoot) : null;
const mobileMediaSlug = mobileVisibleImage?.dataset.view;
click(mobileMediaRoot);
const mobileEntityMediaSpec = `${mobileAmpId}~media~${mobileMediaSlug}`;
check(
  "모바일 entity에서 media를 열면 중첩 URL과 back 단계가 함께 추가됨",
  !!mobileMediaSlug &&
    !!query("#modal .media-split-pane__body") &&
    location.hash.endsWith(`/${encodeURIComponent(mobileEntityMediaSpec)}`),
);
click(query("#modal [data-modal-back]"));
check(
  "모바일 media back이 entity DOM·URL·포커스를 함께 복원함",
  query("#modal .modal__title")?.textContent === mobileEntityTitle &&
    location.hash.endsWith(`/${encodeURIComponent(mobileAmpId)}`) &&
    document.activeElement?.classList.contains("modal__title"),
);
click(query("#modal [data-modal-back]"));
check(
  "모바일 entity back이 원래 item URL과 관계 버튼 포커스를 복원함",
  location.hash === `#speakers/${encodeURIComponent(mobileCard.dataset.id)}` &&
    document.activeElement instanceof HTMLElement &&
    document.activeElement.dataset.ampId === mobileAmpId,
);
closeModal();

const mobileDeepHash = `#speakers/${encodeURIComponent(mobileCard.dataset.id)}/${encodeURIComponent(mobileEntityMediaSpec)}`;
history.replaceState(null, "", mobileDeepHash);
window.dispatchEvent(new window.HashChangeEvent("hashchange"));
check(
  "모바일 entity-media 딥링크가 현재 modal root에서 media를 열고 hash를 유지함",
  location.hash === mobileDeepHash && !!query("#modal .media-split-pane__body") && !query("#modal .split-view"),
);
click(query("#modal [data-modal-back]"));
check(
  "모바일 entity-media 딥링크의 첫 back이 entity URL과 제목 포커스를 복원함",
  location.hash.endsWith(`/${encodeURIComponent(mobileAmpId)}`) &&
    query("#modal .modal__title")?.textContent === mobileEntityTitle &&
    document.activeElement?.classList.contains("modal__title"),
);
click(query("#modal [data-modal-back]"));
check(
  "모바일 entity-media 딥링크의 두 번째 back이 원래 item 상태를 복원함",
  location.hash === `#speakers/${encodeURIComponent(mobileCard.dataset.id)}` && !query("#modal [data-modal-back]"),
);
closeModal();

// 같은 item의 pane2를 URL에서 직접 지우면 모바일 전체교체 스택도 base로 돌아간다.
click(mobileCard);
click([...queryAll("#modal [data-amp-id]")].find(element => element.dataset.ampId === mobileAmpId));
const mobileBaseHash = `#speakers/${encodeURIComponent(mobileCard.dataset.id)}`;
history.replaceState(null, "", mobileBaseHash);
window.dispatchEvent(new window.HashChangeEvent("hashchange"));
check(
  "모바일 pane2 URL 제거가 base item DOM·stack·track을 함께 복원함",
  location.hash === mobileBaseHash &&
    !query("#modal [data-modal-back]") &&
    !query("#modal").dataset.detailId &&
    queryAll("body > .modal__scrollbar-track").length === 1,
);
closeModal();

// desktop split을 모바일로 회전하면 pane2 상세를 현재 화면으로 재구성한다.
setMobileLayout(false);
click(mobileCard);
click([...queryAll("#modal [data-amp-id]")].find(element => element.dataset.ampId === mobileAmpId));
const desktopSplitHash = location.hash;
setMobileLayout(true);
check(
  "desktop→mobile 전환이 split을 현재 entity와 단일 track의 mobile stack으로 정규화함",
  location.hash === desktopSplitHash &&
    query("#modal").dataset.detailId === mobileAmpId &&
    !query("#modal").classList.contains("modal--split") &&
    !query("#modal .split-view") &&
    !!query("#modal [data-modal-back]") &&
    queryAll("body > .modal__scrollbar-track").length === 1,
);
const mobileK1Trigger = query('#modal [data-speaker-id="spk-la-k1"]');
click(mobileK1Trigger);
check(
  "desktop→mobile 후 현재 entity의 관계 이동이 중첩 stack과 URL을 일치시킴",
  !!mobileK1Trigger &&
    query("#modal").dataset.detailId === "spk-la-k1" &&
    location.hash.endsWith("/spk-la-k1") &&
    queryAll("body > .modal__scrollbar-track").length === 1,
);
click(query("#modal [data-modal-back]"));
check(
  "desktop→mobile 후 back이 전환 당시 entity와 URL을 복원함",
  query("#modal").dataset.detailId === mobileAmpId && location.hash === desktopSplitHash,
);
closeModal();

// mobile stack을 데스크탑으로 회전하면 URL의 base/entity를 pane1/pane2로 재구성한다.
click(mobileCard);
click([...queryAll("#modal [data-amp-id]")].find(element => element.dataset.ampId === mobileAmpId));
const mobileEntityHash = location.hash;
setMobileLayout(false);
check(
  "mobile→desktop 전환이 base/entity URL을 split과 두 track으로 정규화함",
  location.hash === mobileEntityHash &&
    query("#modal .split-view")?.dataset.paneId === mobileAmpId &&
    query("#modal .split-view__pane:nth-child(2)")?.dataset.detailId === mobileAmpId &&
    !query("#modal [data-modal-back]") &&
    queryAll("body > .modal__scrollbar-track").length === 2,
);
const desktopK1Trigger = query('#modal .split-view__pane:nth-child(2) [data-speaker-id="spk-la-k1"]');
click(desktopK1Trigger);
check(
  "mobile→desktop 후 pane2 관계 이동이 pane1 item과 reload 가능한 URL을 일치시킴",
  !!desktopK1Trigger &&
    query("#modal .split-view__pane:first-child")?.dataset.detailId === "spk-la-k1" &&
    query("#modal .split-view__pane:nth-child(2)")?.dataset.detailId === mobileAmpId &&
    location.hash === `#speakers/spk-la-k1/${encodeURIComponent(mobileAmpId)}` &&
    !query("#modal [data-modal-back]"),
);
closeModal();
setMobileLayout(false);

// 관계 요소를 DOM에서 다시 찾지 않아도 ID provider로 딥링크 pane을 복원한다.
const routeSpeakerId = "spk-la-k3";
const routeAmpId = "amp-la-la12x";
history.replaceState(null, "", `#speakers/${encodeURIComponent(routeSpeakerId)}/${encodeURIComponent(routeAmpId)}`);
window.dispatchEvent(new window.HashChangeEvent("hashchange"));
check(
  "URL pane2 복원이 등록 ID를 직접 해석해 동적 pane을 만듦",
  query("#modal .split-view")?.dataset.paneId === routeAmpId &&
    query("#modal .split-view__pane:nth-child(2)")?.dataset.detailKind === "amplifier",
);
closeModal();

console.log(`\n결과: ${pass} PASS / ${fail} FAIL`);
process.exit(fail ? 1 : 0);
