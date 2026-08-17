/**
 * 앱 데이터의 파일 경로와 도메인 간 참조가 실제 레코드로 해석되는지 검증한다.
 * 관계 ID는 UI 조회기가 사용하는 최상위 레코드 ID만 유효하다.
 */
import { existsSync } from "node:fs";
import { dirname, isAbsolute, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { ACCESSORIES } from "../js/domains/accessories/accessories.data.js";
import { AMPLIFIERS } from "../js/domains/amplifiers/amplifiers.data.js";
import { BRANDS } from "../js/domains/brand/brand.data.js";
import { DSPS } from "../js/domains/dsps/dsps.data.js";
import { SOFTWARE } from "../js/domains/software/software.data.js";
import { SPEAKERS } from "../js/domains/speakers/speakers.data.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const DOMAINS = [
  ["speakers", SPEAKERS],
  ["amplifiers", AMPLIFIERS],
  ["dsps", DSPS],
  ["software", SOFTWARE],
  ["accessories", ACCESSORIES],
  ["brand", BRANDS],
];

const failures = [];
let checks = 0;

function check(condition, message) {
  checks++;
  if (!condition) failures.push(message);
}

function checkAsset(owner, field, assetPath) {
  check(
    typeof assetPath === "string" && assetPath.trim() !== "",
    `${owner}.${field}: 파일 경로가 비어 있음`,
  );
  if (typeof assetPath !== "string" || assetPath.trim() === "") return;

  const absolutePath = resolve(ROOT, assetPath);
  const relativePath = relative(ROOT, absolutePath);
  const staysInRepository = relativePath !== ".."
    && !relativePath.startsWith(`..${process.platform === "win32" ? "\\" : "/"}`)
    && !isAbsolute(relativePath);

  check(staysInRepository, `${owner}.${field}: 저장소 밖 경로 ${assetPath}`);
  if (staysInRepository) {
    check(existsSync(absolutePath), `${owner}.${field}: 파일 없음 ${assetPath}`);
  }
}

function checkReferences(records, relationName, getReferences, validIds) {
  for (const record of records) {
    const references = getReferences(record);
    check(Array.isArray(references), `${record.id}.${relationName}: 배열이 아님`);
    if (!Array.isArray(references)) continue;

    for (const referencedId of references) {
      check(
        validIds.has(referencedId),
        `${record.id}.${relationName}: 최상위 레코드로 해석되지 않음 (${referencedId})`,
      );
    }
  }
}

const idOwners = new Map();
for (const [domainName, records] of DOMAINS) {
  for (const record of records) {
    check(
      typeof record.id === "string" && record.id.trim() !== "",
      `${domainName}: 최상위 레코드 ID가 비어 있음`,
    );
    if (typeof record.id !== "string" || record.id.trim() === "") continue;

    const previousOwner = idOwners.get(record.id);
    check(
      previousOwner === undefined,
      `${record.id}: 최상위 ID 중복 (${previousOwner}, ${domainName})`,
    );
    if (previousOwner === undefined) idOwners.set(record.id, domainName);

    for (const field of ["img", "imgBack", "logo"]) {
      if (record[field] != null) checkAsset(`${domainName}.${record.id}`, field, record[field]);
    }
    if (record.views == null) continue;

    check(Array.isArray(record.views), `${domainName}.${record.id}.views: 배열이 아님`);
    if (!Array.isArray(record.views)) continue;
    record.views.forEach((view, index) => {
      checkAsset(`${domainName}.${record.id}`, `views[${index}].src`, view?.src);
    });
  }
}

const accessoryIds = new Set(ACCESSORIES.map(({ id }) => id));
const dspIds = new Set(DSPS.map(({ id }) => id));
const softwareIds = new Set(SOFTWARE.map(({ id }) => id));

checkReferences(
  SPEAKERS,
  "relations.accessoryIds",
  (speaker) => speaker.relations?.accessoryIds ?? [],
  accessoryIds,
);
checkReferences(
  AMPLIFIERS,
  "rack.relatedAccessoryIds",
  (amplifier) => amplifier.rack?.relatedAccessoryIds ?? [],
  accessoryIds,
);
checkReferences(
  DSPS,
  "relations.softwareIds",
  (dsp) => dsp.relations?.softwareIds ?? [],
  softwareIds,
);
checkReferences(
  SOFTWARE,
  "relations.dspIds",
  (software) => software.relations?.dspIds ?? [],
  dspIds,
);
checkReferences(
  ACCESSORIES,
  "relatedAccessoryIds",
  (accessory) => accessory.relatedAccessoryIds ?? [],
  accessoryIds,
);

if (failures.length) {
  console.error(`데이터 감사 실패: ${failures.length}건`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

const recordCount = DOMAINS.reduce((total, [, records]) => total + records.length, 0);
console.log(`데이터 감사 통과: ${recordCount}개 레코드, ${checks}개 조건`);
