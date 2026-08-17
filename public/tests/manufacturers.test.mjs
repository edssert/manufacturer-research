import { AMPLIFIERS } from "../js/domains/amplifiers/amplifiers.data.js";
import { DSPS } from "../js/domains/dsps/dsps.data.js";
import { SOFTWARE } from "../js/domains/software/software.data.js";
import { SPEAKERS } from "../js/domains/speakers/speakers.data.js";
import {
  MANUFACTURERS,
  MANUFACTURER_ORDER,
  manufacturerById,
  manufacturerIdOf,
} from "../js/core/manufacturers.js";
import { AMP_MFR } from "../js/domains/amplifiers/amplifiers.schema.js";
import { DSP_MFR } from "../js/domains/dsps/dsps.schema.js";
import { MFR } from "../js/domains/speakers/speakers.schema.js";
import { SW_MFR } from "../js/domains/software/software.schema.js";

let passes = 0;
let failures = 0;
function check(name, condition) {
  if (condition) passes += 1;
  else failures += 1;
  console.log(`${condition ? "PASS" : "FAIL"} — ${name}`);
}

check("제조사 순서와 메타데이터 key가 일치함", MANUFACTURER_ORDER.every(id => MANUFACTURERS[id]?.id === id));
check("도메인 스키마가 같은 제조사 원본을 공유함", [MFR, AMP_MFR, DSP_MFR, SW_MFR].every(map => map === MANUFACTURERS));
check("표시명 기반 Speaker 제조사 ID를 해석함", SPEAKERS.every(record => manufacturerIdOf(record) !== null));
check("코드 기반 도메인 제조사 ID를 해석함", [...AMPLIFIERS, ...DSPS, ...SOFTWARE].every(record => manufacturerIdOf(record) !== null));
check("알 수 없는 제조사를 null로 처리함", manufacturerIdOf({ mfr: "unknown" }) === null && manufacturerById("unknown") === null);
check("공유 메타데이터가 불변임", Object.isFrozen(MANUFACTURERS) && Object.values(MANUFACTURERS).every(Object.isFrozen));

console.log(`\n결과: ${passes} PASS / ${failures} FAIL`);
process.exit(failures ? 1 : 0);
