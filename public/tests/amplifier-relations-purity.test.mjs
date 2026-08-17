import assert from "node:assert/strict";

import { sortItems } from "../js/core/filter-engine.js";
import { AMPLIFIERS } from "../js/domains/amplifiers/amplifiers.data.js";
import { compareModel, withDerivedSpeakerCount } from "../js/domains/amplifiers/amplifiers.schema.js";
import { SPEAKERS } from "../js/domains/speakers/speakers.data.js";
import {
  findSpeakersMatchingAmp,
  registerAmplifiers,
  registerSpeakers,
} from "../js/relationships/cross-ref.js";

const sourceSnapshot = structuredClone(AMPLIFIERS);
const sourceRecords = [...AMPLIFIERS];
const sourceSpeakerIdArrays = AMPLIFIERS.map(amplifier => amplifier.relations.speakerIds);

registerAmplifiers(AMPLIFIERS);
registerSpeakers(SPEAKERS);

const schema = withDerivedSpeakerCount(findSpeakersMatchingAmp);
const sorted = sortItems(AMPLIFIERS, "speakerCount", schema);
const counts = sorted.map(({ id }) => findSpeakersMatchingAmp(id).length);

assert.ok(counts.some(count => count > 0), "실제 스피커 관계가 한 건 이상 파생돼야 한다");
assert.ok(
  counts.every((count, index) => index === 0 || counts[index - 1] >= count),
  "speakerCount 정렬은 cross-ref 파생 관계 수의 내림차순이어야 한다",
);
assert.ok(
  sorted.every((amplifier, index) => (
    index === 0
    || counts[index - 1] !== counts[index]
    || compareModel(sorted[index - 1], amplifier) <= 0
  )),
  "관계 수가 같으면 기존 모델 정렬 순서를 유지해야 한다",
);
assert.notStrictEqual(sorted, AMPLIFIERS, "정렬 결과는 새 배열이어야 한다");
assert.deepEqual(AMPLIFIERS, sourceSnapshot, "파생 조회와 정렬은 원본 레코드 값을 바꾸면 안 된다");
assert.ok(
  AMPLIFIERS.every((amplifier, index) => amplifier === sourceRecords[index]),
  "원본 배열의 순서와 레코드 참조를 유지해야 한다",
);
assert.ok(
  AMPLIFIERS.every((amplifier, index) => amplifier.relations.speakerIds === sourceSpeakerIdArrays[index]),
  "원본 speakerIds 배열을 교체하면 안 된다",
);

console.log(`amplifier relation purity: PASS (${AMPLIFIERS.length} amplifiers, max ${counts[0]} matches)`);
