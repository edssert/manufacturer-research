import { SPEAKERS } from "../js/domains/speakers/speakers.data.js";
import { AMPLIFIERS } from "../js/domains/amplifiers/amplifiers.data.js";
import { amplifiersSchema, AMP_MFR } from "../js/domains/amplifiers/amplifiers.schema.js";
import { passes, sortItems } from "../js/core/filter-engine.js";
import { cardHTML as ampCardHTML, modalBodyHTML as ampModalBodyHTML } from "../js/domains/amplifiers/amplifiers.view.js";
import { registerSpeakers, registerAmplifiers, resolveAmpIdForModel, findAmplifierById, findSpeakerById } from "../js/relationships/cross-ref.js";
import { createState } from "../js/core/state.js";

registerSpeakers(SPEAKERS);
registerAmplifiers(AMPLIFIERS);

let failCount = 0;
const log = (name, cond, extra = "") => {
  if (!cond) failCount++;
  console.log(`${name}:`, cond ? "PASS" : "FAIL", extra);
};

// [2026-07 현행화] L-Acoustics 7개(LA1.16i/LA2Xi/LA12X/LA4X/LA7.16/
// LA-RAK III/LA-RAK II AVB) + d&b 1개(D90) = 8개.
log("Test1 (8 amplifiers loaded)", AMPLIFIERS.length === 8, `(${AMPLIFIERS.length})`);

// Test2: every amp id is unique
const ids = AMPLIFIERS.map(a => a.id);
log("Test2 (unique amp IDs)", new Set(ids).size === ids.length);

// Test3: every speaker's relations.ampIds resolve to a real amplifier.
// [2026-07 현행화] d&b D40/D80/40D 는 앰프 상세 데이터가 아직 미입력 상태
// (amplifiers/data/db.data.js 재작성 노트 참고 — 추후 확정 시 채움).
// 이 "알려진 공백"은 허용하고, 그 외의 미해결 참조만 실패로 처리한다.
const KNOWN_MISSING_AMP_IDS = new Set(["amp-db-d40", "amp-db-d80", "amp-db-40d"]);
let allResolve = true;
SPEAKERS.forEach(s => {
  (s.relations.ampIds || []).forEach(aid => {
    if (!findAmplifierById(aid) && !KNOWN_MISSING_AMP_IDS.has(aid)) {
      allResolve = false;
      console.log("  MISSING:", aid, "referenced by", s.id);
    }
  });
});
log("Test3 (speaker ampIds resolve, 알려진 d&b 공백 제외)", allResolve);

// Test4: every amplifier's relations.speakerIds resolve to a real speaker
let allResolve2 = true;
AMPLIFIERS.forEach(a => {
  a.relations.speakerIds.forEach(sid => {
    if (!findSpeakerById(sid)) { allResolve2 = false; console.log("  MISSING:", sid, "referenced by", a.id); }
  });
});
log("Test4 (all amp speakerIds resolve)", allResolve2);

// Test5: resolveAmpIdForModel merged-model fallback — " / " 병기 문자열은
// 첫 토큰으로 해석한다. [2026-07 현행화] D40 데이터가 삭제돼 기존 케이스
// ("D40 / ...")는 null 이 정상 — 존재하는 모델(D90)을 첫 토큰으로 검증.
log("Test5 (merged model resolves via first token)", resolveAmpIdForModel("db", "D90 / D40") === "amp-db-d90", `(got: ${resolveAmpIdForModel("db", "D90 / D40")})`);
log("Test5b (missing model resolves to null)", resolveAmpIdForModel("db", "D40 / D80") === null);

// Test6: resolveAmpIdForModel normal case
log("Test6 (normal model resolves)", resolveAmpIdForModel("la", "LA1.16i") === "amp-la-la1dot16i");

// Test7: cross-ref symmetry — 스피커 S 가 앰프 A 를 참조하면 A 도 S 를
// 참조해야 한다. [2026-07 현행화] relations.speakerIds 가 비어있는 앰프
// (D90 — 매칭 확정 전까지 의도적으로 비움, db.data.js 노트)는 제외.
let symmetric = true;
SPEAKERS.forEach(s => {
  (s.relations.ampIds || []).forEach(aid => {
    const amp = findAmplifierById(aid);
    if (amp && amp.relations.speakerIds.length && !amp.relations.speakerIds.includes(s.id)) {
      symmetric = false;
      console.log("  ASYMMETRIC:", s.id, "->", aid);
    }
  });
});
log("Test7 (relations symmetric, 미입력 앰프 제외)", symmetric);

// Test8: amp filter/search — 검색어 정규화 포함. 현재 d&b 앰프는 D90 1개.
const state = createState();
state.q = "d&b";
let view = AMPLIFIERS.filter(a => passes(a, state, amplifiersSchema));
log("Test8 (search 'd&b' amps)", view.length === 1 && view.every(a => a.mfr === "db"), `(${view.length} results)`);
// Test8b: 검색어 정규화 — 구분자 표기 변형이 같은 결과를 낸다.
const s2 = createState(); s2.q = "la 12x";
const v2 = AMPLIFIERS.filter(a => passes(a, s2, amplifiersSchema));
log("Test8b (normalized search 'la 12x' → LA12X)", v2.length === 1 && v2[0].id === "amp-la-la12x", `(${v2.length})`);

// Test9/10: cardHTML + modalBodyHTML render without throwing
const html = ampCardHTML(AMPLIFIERS[0]);
log("Test9 (ampCardHTML renders)", html.includes(`data-id="${AMPLIFIERS[0].id}"`));
const { body } = ampModalBodyHTML(AMPLIFIERS[0], (sid) => findSpeakerById(sid)?.name || sid);
log("Test10 (ampModalBodyHTML renders + has Configurations toggle)", body.includes('data-section-toggle="amp-configs"'));

// Test11/12: CCL8 — [2026-07 현행화] 병기 1건이 아니라 모델별 4개 항목
// (D40/D80/D90/40D)으로 분리 입력됨. 데이터가 입력된 D90 항목만 클릭 가능.
const ccl8 = SPEAKERS.find(s => s.id === "spk-db-ccl8");
log("Test11 (CCL8 exists with 4 amp entries)", !!ccl8 && ccl8.amps.length === 4, `(${ccl8 ? ccl8.amps.length : "-"})`);
const d90Entry = ccl8 && ccl8.amps.find(a => a.model === "D90");
log("Test12 (CCL8 D90 row clickable)", !!d90Entry && resolveAmpIdForModel(ccl8.mk, d90Entry.model) === "amp-db-d90");

if (failCount) { console.log(`\n${failCount} FAIL`); process.exit(1); }
console.log("\nALL PASS");
