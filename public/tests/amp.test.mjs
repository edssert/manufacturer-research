import { SPEAKERS } from "../js/domains/speakers/speakers.data.js";
import { AMPLIFIERS } from "../js/domains/amplifiers/amplifiers.data.js";
import { amplifiersSchema } from "../js/domains/amplifiers/amplifiers.schema.js";
import { passes } from "../js/core/filter-engine.js";
import {
  findAmplifierById,
  findSpeakerById,
  findSpeakersMatchingAmp,
  registerAmplifiers,
  registerSpeakers,
  resolveAmpIdForModel,
} from "../js/relationships/cross-ref.js";
import { createState } from "../js/core/state.js";
import {
  cardHTML as ampCardHTML,
  modalBodyHTML as ampModalBodyHTML,
} from "../js/domains/amplifiers/amplifiers.view.js";

registerSpeakers(SPEAKERS);
registerAmplifiers(AMPLIFIERS);

let failCount = 0;
const log = (name, condition, extra = "") => {
  if (!condition) failCount++;
  console.log(`${name}:`, condition ? "PASS" : "FAIL", extra);
};

const hasBaseShape = AMPLIFIERS.length > 0 && AMPLIFIERS.every(amplifier => (
  typeof amplifier.id === "string" && amplifier.id.startsWith("amp-")
  && typeof amplifier.mfr === "string" && amplifier.mfr.length > 0
  && typeof amplifier.model === "string" && amplifier.model.length > 0
  && Array.isArray(amplifier.views) && amplifier.views.length > 0
  && Array.isArray(amplifier.relations?.speakerIds)
));
log("Test1 (amplifier base contract)", hasBaseShape, `(${AMPLIFIERS.length} records)`);

const ids = AMPLIFIERS.map(amplifier => amplifier.id);
log("Test2 (unique amp IDs)", new Set(ids).size === ids.length);

const missingAmpReferences = [];
for (const speaker of SPEAKERS) {
  for (const amplifierId of speaker.relations?.ampIds || []) {
    if (!findAmplifierById(amplifierId)) missingAmpReferences.push(`${speaker.id} -> ${amplifierId}`);
  }
}
if (missingAmpReferences.length) {
  missingAmpReferences.forEach(reference => console.log("  MISSING:", reference));
}
log("Test3 (all speaker ampIds resolve)", missingAmpReferences.length === 0);

const missingSpeakerReferences = [];
for (const amplifier of AMPLIFIERS) {
  for (const speakerId of amplifier.relations.speakerIds) {
    if (!findSpeakerById(speakerId)) missingSpeakerReferences.push(`${amplifier.id} -> ${speakerId}`);
  }
}
if (missingSpeakerReferences.length) {
  missingSpeakerReferences.forEach(reference => console.log("  MISSING:", reference));
}
log("Test4 (all amp speakerIds resolve)", missingSpeakerReferences.length === 0);

const mergedModel = resolveAmpIdForModel("db", "D90 / D40");
log("Test5 (merged model resolves via first token)", mergedModel === "amp-db-d90", `(got: ${mergedModel})`);
log("Test5b (unregistered legacy model resolves to null)", resolveAmpIdForModel("db", "D6 / D12") === null);
log("Test6 (normal model resolves)", resolveAmpIdForModel("la", "LA1.16i") === "amp-la-la1dot16i");

const reverseRelationMismatches = [];
for (const speaker of SPEAKERS) {
  for (const amplifierId of speaker.relations?.ampIds || []) {
    if (!findSpeakersMatchingAmp(amplifierId).includes(speaker.id)) {
      reverseRelationMismatches.push(`${speaker.id} -> ${amplifierId}`);
    }
  }
}
if (reverseRelationMismatches.length) {
  reverseRelationMismatches.forEach(reference => console.log("  ASYMMETRIC:", reference));
}
log("Test7 (declared amp relations have matching amp rows)", reverseRelationMismatches.length === 0);

const searchState = createState();
searchState.q = "d&b";
const searchResults = AMPLIFIERS.filter(amplifier => passes(amplifier, searchState, amplifiersSchema));
const dbAmplifierCount = AMPLIFIERS.filter(amplifier => amplifier.mfr === "db").length;
log(
  "Test8 (search 'd&b' returns every d&b amp)",
  searchResults.length === dbAmplifierCount && searchResults.every(amplifier => amplifier.mfr === "db"),
  `(${searchResults.length}/${dbAmplifierCount})`,
);

const normalizedSearchState = createState();
normalizedSearchState.q = "la 12x";
const normalizedSearchResults = AMPLIFIERS.filter(amplifier => passes(amplifier, normalizedSearchState, amplifiersSchema));
log(
  "Test8b (normalized search 'la 12x' resolves LA12X)",
  normalizedSearchResults.length === 1 && normalizedSearchResults[0].id === "amp-la-la12x",
  `(${normalizedSearchResults.length})`,
);

const card = ampCardHTML(AMPLIFIERS[0]);
log("Test9 (ampCardHTML renders)", card.includes(`data-id="${AMPLIFIERS[0].id}"`));
const { body } = ampModalBodyHTML(AMPLIFIERS[0], speakerId => findSpeakerById(speakerId)?.name || speakerId);
log("Test10 (ampModalBodyHTML renders configurations toggle)", body.includes('data-section-toggle="amp-configs"'));

const ccl8 = SPEAKERS.find(speaker => speaker.id === "spk-db-ccl8");
const expectedCcl8Models = new Set(["D40", "D80", "D90", "40D"]);
const hasExpectedCcl8Rows = Boolean(ccl8)
  && ccl8.amps.length === expectedCcl8Models.size
  && ccl8.amps.every(row => expectedCcl8Models.has(row.model));
log("Test11 (CCL8 has one row per supported amp model)", hasExpectedCcl8Rows, `(${ccl8?.amps.length ?? "-"})`);
const d90Entry = ccl8?.amps.find(row => row.model === "D90");
log("Test12 (CCL8 D90 row resolves to an amp)", resolveAmpIdForModel(ccl8?.mk, d90Entry?.model) === "amp-db-d90");

if (failCount) {
  console.log(`\n${failCount} FAIL`);
  process.exit(1);
}
console.log("\nALL PASS");
