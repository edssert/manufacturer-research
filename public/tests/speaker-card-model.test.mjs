import assert from "node:assert/strict";

import { SPEAKER_CATALOG } from "../js/domains/speakers/speakers.detail.js";
import { createSpeakerCardModel } from "../js/domains/speakers/speakers.card-model.js";
import { MFR } from "../js/domains/speakers/speakers.schema.js";

const before = JSON.stringify(SPEAKER_CATALOG);
const models = SPEAKER_CATALOG.map(speaker => createSpeakerCardModel(speaker, MFR[speaker.mk]));
const byId = id => models.find(model => model.id === id);

assert.equal(models.length, SPEAKER_CATALOG.length, "모든 스피커가 카드 표시 모델로 투영되어야 합니다.");
assert.equal(JSON.stringify(SPEAKER_CATALOG), before, "카드 투영은 원본 데이터를 변경하지 않아야 합니다.");
assert(
  models.every(model => model.schemaVersion === 1),
  "표시 모델은 명시적 스키마 버전을 가져야 합니다.",
);
assert(
  models.every(model => Object.isFrozen(model)),
  "표시 모델은 불변이어야 합니다.",
);
assert(
  models.every(model => Object.isFrozen(model.drivers.bands) && model.drivers.bands.every(Object.isFrozen)),
  "대역 표시 값까지 불변이어야 합니다.",
);
assert(
  models.every(model => !model.classification.includes("N/A")),
  "해당 없음 값은 카드 분류에 노출하지 않습니다.",
);
assert(
  models.every(model => model.performance.status === (model.performance.maxSpl == null ? "unknown" : "known")),
  "SPL 값과 상태가 일치해야 합니다.",
);

const k1 = byId("spk-la-k1");
assert.deepEqual(
  k1.drivers.bands.map(band => `${band.band} ${band.detail}`),
  ["LF 15″", "MF 6.5″", "HF 3″"],
  "K1의 3대역 구성이 보존되어야 합니다.",
);
assert.deepEqual(
  k1.drivers.bands.map(band => band.quantity),
  ["2", "4", "3"],
  "드라이버 개수는 대역명 옆의 독립 값이어야 합니다.",
);
assert.deepEqual(k1.classification, ["Line Array", "Active", "3-way"]);
assert.deepEqual(k1.classificationCompact, ["Line Array", "Active", "3-way"]);
assert.equal(k1.amplification.kind, "external");
assert.deepEqual(
  k1.primarySpecs.map(spec => [spec.code, spec.value]),
  [
    ["horizontal", "90°"],
    ["vertical", "0.25–5°"],
    ["weight", "106kg"],
  ],
  "모든 카드의 목록 비교 사양은 수평·수직/Splay·무게여야 합니다.",
);
assert.equal(k1.primarySpecs[0].label, "H", "긴 Horizontal 라벨 대신 공통 축 표기를 사용해야 합니다.");
assert.equal(k1.primarySpecs[1].label, "Splay", "라인어레이의 두 번째 비교 슬롯은 Splay여야 합니다.");
assert.equal(k1.performance.frequencyRange.value, "35Hz – 20kHz");
assert.equal(k1.performance.frequencyRange.basis, "-10 dB");
assert(k1.performance.frequencyRange.visual, "주파수 범위는 20Hz–20kHz 로그 바 좌표를 가져야 합니다.");

const gsl12 = byId("spk-db-gsl12");
assert.equal(gsl12.drivers.bands.length, 4, "d&b 4대역 구성도 손실 없이 보존되어야 합니다.");
assert(gsl12.classification.includes("Hybrid"), "Hybrid 네트워크를 구분해야 합니다.");

const k2 = byId("spk-la-k2");
assert.equal(
  k2.primarySpecs.find(spec => spec.code === "horizontal")?.value,
  "70–110°",
  "여러 Panflex 옵션은 카드에서 비교 가능한 수평 범위로 정규화해야 합니다.",
);

const l1 = byId("spk-la-l1");
assert.deepEqual(l1.classificationCompact, ["PULS", "Active", "16-ch"]);
assert.deepEqual(
  l1.drivers.bands.find(band => band.band === "HF"),
  {
    band: "HF",
    quantity: "6",
    detail: "4″+2.5″",
  },
);

const ks28 = byId("spk-la-ks28");
assert.equal(ks28.drivers.bands.length, 1, "서브우퍼 단일 대역을 지원해야 합니다.");
assert.deepEqual(ks28.classification, ["Subwoofer", "Passive"]);
assert.deepEqual(
  ks28.primarySpecs.map(spec => [spec.code, spec.value]),
  [
    ["horizontal", "Omni"],
    ["vertical", "—"],
    ["weight", "79kg"],
  ],
  "외부 배열이 필요한 서브우퍼는 단일 캐비닛 지향성을 표시해야 합니다.",
);

const panther = byId("spk-my-panther-l");
assert.equal(panther.amplification.kind, "integrated", "셀프파워드 제품은 외부 앰프 미입력과 구분해야 합니다.");
assert.equal(panther.manufacturer.name, "Meyer Sound");

const cp218 = byId("spk-co-cp218-ii-plus");
assert.equal(
  cp218.primarySpecs.find(spec => spec.code === "horizontal")?.value,
  "Omni",
  "외부 배열로만 카디오이드를 구성하는 서브우퍼는 단일 캐비닛을 Cardioid로 표시하면 안 됩니다.",
);

const arrayConfiguredSubwoofers = models.filter(model =>
  ["spk-co-cp218-ii-plus", "spk-db-b6-sub", "spk-db-bi6-sub"].includes(model.id),
);
assert.equal(arrayConfiguredSubwoofers.length, 3);
assert(
  arrayConfiguredSubwoofers.every(
    model => model.primarySpecs.find(spec => spec.code === "horizontal")?.value === "Omni",
  ),
  "외부 배열로만 카디오이드가 되는 서브우퍼는 단일 캐비닛 지향성을 Omni로 표시해야 합니다.",
);

const co8 = byId("spk-co-co8");
assert.equal(
  co8.primarySpecs.find(spec => spec.code === "horizontal")?.value,
  "80–160°",
  "선택형 waveguide 각도는 합산하지 않고 최소–최대 옵션 범위로 표시해야 합니다.",
);

assert.equal(
  byId("spk-pk-trinity-black").primarySpecs.find(spec => spec.code === "horizontal")?.value,
  "60–120°",
  "대시로 표기한 공식 가변 지향각도 최소–최대 범위로 유지해야 합니다.",
);
assert(
  models
    .filter(model => model.classification[0] !== "Subwoofer")
    .every(model => {
      const value = model.primarySpecs.find(spec => spec.code === "horizontal")?.value ?? "";
      return !/^\d+(?:–\d+)?°$/.test(value) || Math.max(...value.match(/\d+/g).map(Number)) <= 180;
    }),
  "비서브 제품의 수평 지향각은 180°를 초과하면 안 됩니다.",
);

const pending = createSpeakerCardModel(
  { id: "spk-fixture-pending", name: "Pending fixture", mk: "db", pending: true },
  MFR.db,
);
assert.equal(pending.status, "pending");
assert.equal(pending.drivers.status, "unknown");
assert.equal(pending.performance.status, "unknown");
assert.equal(pending.amplification.kind, "unknown");
assert.deepEqual(
  pending.primarySpecs.map(spec => [spec.code, spec.value]),
  [
    ["horizontal", "—"],
    ["vertical", "—"],
    ["weight", "—"],
  ],
  "검증 대기 제품도 같은 세 슬롯을 유지해야 합니다.",
);
assert(
  models.every(
    model =>
      model.primarySpecs.map(spec => spec.code).join(",") === "horizontal,vertical,weight" &&
      model.primarySpecs.length === 3,
  ),
  "모든 카드의 비교 스키마와 순서는 같아야 합니다.",
);

console.log(`speaker card model: PASS (${models.length} records)`);
