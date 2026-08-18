import assert from "node:assert/strict";

import { SPEAKERS } from "../js/domains/speakers/speakers.data.js";

const invalid = SPEAKERS.filter(
  speaker => Number.isFinite(speaker.lowInch) && (speaker.lowInch < 1 || speaker.lowInch > 36),
);
assert.deepEqual(
  invalid.map(speaker => ({ id: speaker.id, lowInch: speaker.lowInch })),
  [],
  "Low Driver 필터에는 실제 인치 호칭 범위만 노출되어야 합니다.",
);

const expected = new Map([
  ["spk-ev-evid-pc6-2", 6.5],
  ["spk-ev-evid-pc8-2", 8],
  ["spk-ev-evid-c12-2", 12],
]);
for (const [id, lowInch] of expected) {
  const speaker = SPEAKERS.find(item => item.id === id);
  assert.ok(speaker, `${id} 레코드가 필요합니다.`);
  assert.equal(speaker.lowInch, lowInch);
  assert.match(speaker.transducers, new RegExp(`${String(lowInch).replace(".", "\\.")}″`));
}

console.log(`PASS speaker driver values (${SPEAKERS.length} products, ${expected.size} corrected fixtures)`);
