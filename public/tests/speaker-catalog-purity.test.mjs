import assert from "node:assert/strict";

import { SPEAKERS } from "../js/domains/speakers/speakers.data.js";
import { createSpeakerCatalog } from "../js/domains/speakers/speakers.schema.js";

const sourceSnapshot = structuredClone(SPEAKERS);
const sourceRecords = [...SPEAKERS];
const nestedReferences = SPEAKERS.map(speaker => ({
  amps: speaker.amps,
  views: speaker.views,
  relations: speaker.relations,
  coverage: speaker.cov,
}));

const catalog = createSpeakerCatalog(SPEAKERS);
assert.equal(catalog.length, SPEAKERS.length);
assert.deepEqual(catalog.map(({ id }) => id), SPEAKERS.map(({ id }) => id));
assert(Object.isFrozen(catalog));
assert(catalog.every(Object.isFrozen));
assert(catalog.every((speaker, index) => speaker !== SPEAKERS[index]));

const k1 = catalog.find(({ id }) => id === "spk-la-k1");
assert.deepEqual(
  {
    wayCount: k1.wayCount,
    network: k1.network,
    lowUnitConfig: k1.lowUnitConfig,
    hRange: k1.hRange,
    vRange: k1.vRange,
    splayRange: k1.splayRange,
  },
  {
    wayCount: "3-way",
    network: "Active",
    lowUnitConfig: "Dual",
    hRange: [90, 90],
    vRange: null,
    splayRange: [0.25, 5],
  },
);

const pending = catalog.find(({ id }) => id === "spk-db-sl-sub");
assert.deepEqual(
  [pending.wayCount, pending.network, pending.lowUnitConfig, pending.hRange, pending.vRange, pending.splayRange],
  [null, null, null, null, null, null],
);

assert.deepEqual(SPEAKERS, sourceSnapshot);
assert(SPEAKERS.every((speaker, index) => speaker === sourceRecords[index]));
assert(SPEAKERS.every((speaker, index) => (
  speaker.amps === nestedReferences[index].amps
  && speaker.views === nestedReferences[index].views
  && speaker.relations === nestedReferences[index].relations
  && speaker.cov === nestedReferences[index].coverage
)));

assert.throws(() => createSpeakerCatalog(null), /array/);
console.log(`speaker catalog purity: PASS (${catalog.length} records)`);
