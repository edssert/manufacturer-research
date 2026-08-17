import assert from "node:assert/strict";

import { JSDOM } from "jsdom";

import {
  configurationsBySpeakerTableHTML,
  groupConfigurationsBySpeaker,
} from "../js/domains/amplifiers/amplifiers.configurations.js";

const configuration = (speakerId, speakerName, overrides = {}) => ({
  speakerId,
  speakerName,
  mode: "SE",
  preset: "FULL RANGE",
  perCh: 2,
  total: 8,
  spl: 137,
  ...overrides,
});

const mergeRows = [
  configuration("spk-k3", "K3"),
  configuration("spk-k3i", "K3i"),
  configuration("spk-a10", "A10 Focus"),
  configuration("spk-a10i", "A10i Focus"),
  configuration("spk-sb10r", "SB10r"),
  configuration("spk-sb10i", "SB10i"),
];
const mergeSnapshot = structuredClone(mergeRows);
const merged = groupConfigurationsBySpeaker(mergeRows);

assert.equal(merged.length, 3, "지원 대상 변형 모델 세 쌍을 각각 하나로 합쳐야 한다");
assert.deepEqual(
  merged.map(group => group.nameParts.map(part => part.text).join("")),
  ["K3(i)", "A10(i) Focus", "SB10(r/i)"],
);
assert.deepEqual(
  merged[0].nameParts.map(part => part.id),
  ["spk-k3", "spk-k3i"],
  "병합된 이름의 각 파트가 개별 상세 ID를 유지해야 한다",
);
assert.deepEqual(mergeRows, mergeSnapshot, "그룹화는 입력 행을 변경하면 안 된다");

const sameSignature = configuration("spk-k1-sb", "K1-SB");
const distinctProducts = groupConfigurationsBySpeaker([
  configuration("spk-k1", "K1"),
  sameSignature,
  configuration("spk-x4r", "X4r"),
  configuration("spk-x4i", "X4i", { total: 4 }),
]);
assert.equal(distinctProducts.length, 4, "일반 접두사 제품과 설정이 다른 r/i 모델은 합치면 안 된다");

const rows = [
  configuration("spk-one", "One & <Two>", {
    mode: "SE <unsafe>",
    preset: 'Preset "A"',
    total: 4,
    spl: null,
  }),
  configuration("spk-one", "One & <Two>", {
    mode: "BTL",
    preset: null,
    perCh: 1,
    total: 12,
    spl: 140,
  }),
];
const rowsSnapshot = structuredClone(rows);
const html = configurationsBySpeakerTableHTML(rows);
const document = new JSDOM(`<main>${html}</main>`).window.document;
const representative = document.querySelector(".match-table__body > .match-table__row--clickable");
const collapsed = document.querySelector("[data-toggle-member='amp-cfg-0']");
const toggle = representative.querySelector("[data-toggle-group='amp-cfg-0']");

assert.equal(representative.dataset.speakerId, "spk-one");
assert.equal(
  representative.querySelector(".match-table__cell--mode").textContent,
  "BTL",
  "Max/amp가 가장 큰 설정이 대표 행이어야 한다",
);
assert.equal(toggle.textContent, "+1");
assert.equal(toggle.getAttribute("aria-expanded"), "false");
assert.equal(collapsed.hidden, true);
assert.equal(collapsed.querySelector(".match-table__cell--mode").textContent, "SE <unsafe>");
assert.match(html, /One &amp; &lt;Two&gt;/, "동적 텍스트는 HTML 이스케이프해야 한다");
assert.doesNotMatch(html, /SE <unsafe>/);
assert.deepEqual(rows, rowsSnapshot, "대표 행 정렬은 입력 배열과 레코드를 변경하면 안 된다");

const trailingVariantHTML = configurationsBySpeakerTableHTML(mergeRows.slice(4));
const trailingDocument = new JSDOM(`<main>${trailingVariantHTML}</main>`).window.document;
const trailingParts = [...trailingDocument.querySelectorAll(".match-table__model-name-part")];
assert.deepEqual(
  trailingParts.map(part => part.dataset.speakerId),
  ["null", "spk-sb10r", "spk-sb10i"],
  "공통 텍스트 sentinel과 r/i 상세 훅 계약을 유지해야 한다",
);

const mergedDocument = new JSDOM(`<main>${configurationsBySpeakerTableHTML(mergeRows)}</main>`).window.document;
const mergedControls = [...mergedDocument.querySelectorAll(".match-table__relation-trigger[data-speaker-id]")];
assert.equal(
  new Set(mergedControls.map(control => control.dataset.speakerId)).size,
  mergedControls.length,
  "병합 이름은 같은 상세로 가는 중복 키보드 포커스 지점을 만들면 안 된다",
);
assert.deepEqual(
  mergedControls
    .filter(control => control.dataset.speakerId?.startsWith("spk-a10"))
    .map(control => control.getAttribute("aria-label")),
  ["A10 Focus 스피커 상세 보기", "A10i Focus 스피커 상세 보기"],
  "분리 렌더링된 이름 조각도 전체 모델명을 접근 가능한 이름으로 제공해야 한다",
);

assert.match(configurationsBySpeakerTableHTML([]), /data-empty-note/);
assert.match(configurationsBySpeakerTableHTML(null), /설정 데이터가 없습니다/);

console.log("Amplifier configuration grouping and rendering: PASS");
