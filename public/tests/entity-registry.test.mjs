import assert from "node:assert/strict";

import { EntityRegistry } from "../js/relationships/entity-registry.js";
import {
  accessoriesByIds,
  findAccessoryById,
  findAccessoriesForSpeaker,
  findAmpConfigsBySpeaker,
  findAmplifierById,
  findAmplifiersUsingAccessory,
  findRelatedAccessories,
  findSpeakerById,
  findSpeakersMatchingAmp,
  findSpeakersUsingAccessory,
  registerAccessories,
  registerAmplifiers,
  registerSpeakers,
  resolveAmpIdForModel,
} from "../js/relationships/cross-ref.js";

const registry = new EntityRegistry("fixture");
const firstRecord = { id: "fixture-one", name: "One" };
const sourceArray = [firstRecord];
const snapshot = registry.register(sourceArray);

assert.equal(registry.findById("fixture-one"), firstRecord);
assert.equal(registry.findById("missing"), null);
assert.equal(Object.isFrozen(snapshot), true);

sourceArray.push({ id: "fixture-two", name: "Two" });
assert.equal(registry.findById("fixture-two"), null);
assert.equal(registry.snapshot.length, 1);

assert.throws(
  () => registry.register([{ id: "duplicate" }, { id: "duplicate" }]),
  /Duplicate fixture id: duplicate/,
);
assert.throws(() => registry.register([{ id: " " }]), /invalid id/);
assert.throws(() => registry.register(null), /expects an array/);
assert.equal(registry.findById("fixture-one"), firstRecord);

const amplifierInput = [
  {
    id: "amp-db-d90",
    mfr: "db",
    model: "D90",
    rack: { relatedAccessoryIds: ["acc-rig", "acc-rig"] },
    relations: { speakerIds: ["spk-static-field-is-ignored"] },
  },
  {
    id: "amp-la-la12x",
    mfr: "la",
    model: "LA12X",
    rack: null,
    relations: { speakerIds: [] },
  },
];
const speakerInput = [
  {
    id: "spk-db-ccl8",
    mk: "db",
    name: "CCL8",
    relations: { accessoryIds: ["acc-rig", "acc-rig"] },
    amps: [
      {
        model: "D90 / D40",
        configs: [
          {
            mode: "2-Way Active",
            perCh: 2,
            total: 8,
            splByPreset: [
              { preset: "CUT", spl: 137 },
              { preset: "unused", spl: null },
            ],
          },
          { mode: "", perCh: null, total: 4, spl: 135 },
        ],
      },
      { model: "D90", configs: [] },
    ],
  },
];
const accessoryInput = [
  {
    id: "acc-rig",
    name: "Rigging frame",
    type: "Rigging",
    relatedAccessoryIds: ["acc-flight", "missing-accessory"],
  },
  {
    id: "acc-flight",
    name: "Flight case",
    type: "Transport",
    relatedAccessoryIds: ["acc-rig"],
  },
];

const beforeRegistration = structuredClone({ amplifierInput, speakerInput, accessoryInput });
registerAmplifiers(amplifierInput);
registerSpeakers(speakerInput);
registerAccessories(accessoryInput);

assert.equal(findAmplifierById("amp-db-d90"), amplifierInput[0]);
assert.equal(findSpeakerById("spk-db-ccl8"), speakerInput[0]);
assert.equal(findAccessoryById("acc-rig"), accessoryInput[0]);
assert.equal(resolveAmpIdForModel("db", "D90"), "amp-db-d90");
assert.equal(resolveAmpIdForModel("db", "D90 / D40"), "amp-db-d90");
assert.equal(resolveAmpIdForModel("db", "D40 / D90"), null);

assert.deepEqual(findSpeakersMatchingAmp("amp-db-d90"), ["spk-db-ccl8"]);
assert.deepEqual(findAmpConfigsBySpeaker("amp-db-d90"), [
  {
    speakerId: "spk-db-ccl8",
    speakerName: "CCL8",
    mode: "2-Way Active",
    preset: "CUT",
    perCh: 2,
    total: 8,
    spl: 137,
  },
  {
    speakerId: "spk-db-ccl8",
    speakerName: "CCL8",
    mode: "",
    preset: null,
    perCh: null,
    total: 4,
    spl: 135,
  },
]);
assert.deepEqual(findAmplifiersUsingAccessory("acc-rig"), [
  { id: "amp-db-d90", name: "D90" },
]);
assert.deepEqual(findSpeakersUsingAccessory("acc-rig"), [
  { id: "spk-db-ccl8", name: "CCL8" },
]);
assert.deepEqual(findAccessoriesForSpeaker("spk-db-ccl8"), [
  { id: "acc-rig", name: "Rigging frame", type: "Rigging" },
  { id: "acc-rig", name: "Rigging frame", type: "Rigging" },
]);
assert.deepEqual(findRelatedAccessories("acc-rig"), [
  { id: "acc-flight", name: "Flight case", type: "Transport" },
]);
assert.deepEqual(accessoriesByIds(["missing-accessory", "acc-flight"]), [
  { id: "acc-flight", name: "Flight case", type: "Transport" },
]);

const leakedMatches = findSpeakersMatchingAmp("amp-db-d90");
const leakedConfigs = findAmpConfigsBySpeaker("amp-db-d90");
leakedMatches.push("corrupt-cache");
leakedConfigs[0].speakerName = "Corrupt cache";
assert.deepEqual(findSpeakersMatchingAmp("amp-db-d90"), ["spk-db-ccl8"]);
assert.equal(findAmpConfigsBySpeaker("amp-db-d90")[0].speakerName, "CCL8");
assert.deepEqual({ amplifierInput, speakerInput, accessoryInput }, beforeRegistration);

const replacementAmplifiers = [
  {
    id: "amp-db-d90-next",
    mfr: "db",
    model: "D90",
    rack: { relatedAccessoryIds: ["acc-flight"] },
    relations: { speakerIds: [] },
  },
];
registerAmplifiers(replacementAmplifiers);

assert.equal(findAmplifierById("amp-db-d90"), null);
assert.equal(resolveAmpIdForModel("db", "D90 / D40"), "amp-db-d90-next");
assert.deepEqual(findSpeakersMatchingAmp("amp-db-d90-next"), ["spk-db-ccl8"]);
assert.equal(findAmpConfigsBySpeaker("amp-db-d90-next").length, 2);
assert.deepEqual(findAmplifiersUsingAccessory("acc-rig"), []);
assert.deepEqual(findAmplifiersUsingAccessory("acc-flight"), [
  { id: "amp-db-d90-next", name: "D90" },
]);

const replacementSpeakers = [
  {
    id: "spk-db-ccl8-next",
    mk: "db",
    name: "CCL8 next",
    relations: { accessoryIds: ["acc-flight"] },
    amps: [{ model: "D90", configs: [] }],
  },
];
registerSpeakers(replacementSpeakers);

assert.deepEqual(findSpeakersMatchingAmp("amp-db-d90-next"), ["spk-db-ccl8-next"]);
assert.deepEqual(findSpeakersUsingAccessory("acc-rig"), []);
assert.deepEqual(findSpeakersUsingAccessory("acc-flight"), [
  { id: "spk-db-ccl8-next", name: "CCL8 next" },
]);

assert.throws(
  () => registerAmplifiers([{ id: "amp-duplicate" }, { id: "amp-duplicate" }]),
  /Duplicate amplifier id: amp-duplicate/,
);
assert.equal(findAmplifierById("amp-db-d90-next"), replacementAmplifiers[0]);

console.log("Entity registry and relationship index tests: PASS");
