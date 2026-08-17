import { readFileSync, readdirSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { ACCESSORIES as ACCESSORY_DATA } from "../js/domains/accessories/accessories.data.js";
import { AMPLIFIERS as AMPLIFIER_DATA } from "../js/domains/amplifiers/amplifiers.data.js";
import { BRANDS as BRAND_DATA } from "../js/domains/brand/brand.data.js";
import { DSPS as DSP_DATA } from "../js/domains/dsps/dsps.data.js";
import { SOFTWARE as SOFTWARE_DATA } from "../js/domains/software/software.data.js";
import { SPEAKERS as SPEAKER_DATA } from "../js/domains/speakers/speakers.data.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const GOVERNANCE_PATH = resolve(ROOT, "config", "data-governance.json");
const governance = JSON.parse(readFileSync(GOVERNANCE_PATH, "utf8"));

function deepFreeze(value) {
  if (value === null || typeof value !== "object" || Object.isFrozen(value)) return value;
  for (const child of Object.values(value)) deepFreeze(child);
  return Object.freeze(value);
}

function immutableSnapshot(records) {
  return deepFreeze(structuredClone(records));
}

const datasets = Object.freeze({
  speakers: immutableSnapshot(SPEAKER_DATA),
  amplifiers: immutableSnapshot(AMPLIFIER_DATA),
  dsps: immutableSnapshot(DSP_DATA),
  software: immutableSnapshot(SOFTWARE_DATA),
  brand: immutableSnapshot(BRAND_DATA),
  accessories: immutableSnapshot(ACCESSORY_DATA),
});

const failures = [];
let checks = 0;

function check(condition, message) {
  checks++;
  if (!condition) failures.push(message);
}

function asciiCompare(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

function normalizedStrings(values) {
  return values.map((value) => String(value).toLowerCase()).sort(asciiCompare);
}

function checkExactStrings(label, actual, expected) {
  const actualValues = normalizedStrings(actual);
  const expectedValues = normalizedStrings(expected);
  check(
    JSON.stringify(actualValues) === JSON.stringify(expectedValues),
    `${label}: expected ${JSON.stringify(expectedValues)}, received ${JSON.stringify(actualValues)}`,
  );
}

function relationKey({ dspId, softwareId }) {
  return `${String(dspId).toLowerCase()}->${String(softwareId).toLowerCase()}`;
}

function checkExactRelations(label, actual, expected) {
  checkExactStrings(label, actual.map(relationKey), expected.map(relationKey));
}

function normalizedPath(filePath) {
  return filePath.replaceAll("\\", "/").toLowerCase();
}

function listFiles(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const entryPath = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...listFiles(entryPath));
    else if (entry.isFile()) files.push(entryPath);
  }
  return files;
}

function domainDocuments(allMarkdownFiles, coverage) {
  const directorySegments = new Set(coverage.directorySegments.map((value) => value.toLowerCase()));
  return allMarkdownFiles.filter((filePath) => {
    const segments = normalizedPath(relative(canonicalRoot, filePath)).split("/");
    return segments.length >= 3 && directorySegments.has(segments[1]);
  });
}

function sourceRecordId(filePath, coverage) {
  const segments = normalizedPath(relative(canonicalRoot, filePath)).split("/");
  const filename = segments.at(-1);
  const extension = extname(filename);
  const stem = filename.slice(0, -extension.length);
  const versionSuffix = new RegExp(coverage.versionSuffixPattern, "i");
  return `${coverage.recordIdPrefix}-${segments[0]}-${stem.replace(versionSuffix, "")}`;
}

function duplicateValues(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts.entries()].filter(([, count]) => count > 1).map(([value]) => value);
}

check(governance.schemaVersion === 1, "schemaVersion은 1이어야 함");
check(
  governance.sourceRegistry?.canonical?.root === "raw-data/raw-specs"
    && governance.sourceRegistry.canonical.role === "canonical-source"
    && governance.sourceRegistry.canonical.acceptedForCoverage === true
    && governance.sourceRegistry.canonical.auditSurface === "paths-and-filenames-only",
  "raw-data/raw-specs만 경로·파일명 감사 대상 canonical source여야 함",
);
check(
  governance.sourceRegistry?.legacyStaging?.root === "upload"
    && governance.sourceRegistry.legacyStaging.role === "legacy-staging"
    && governance.sourceRegistry.legacyStaging.acceptedForCoverage === false,
  "upload은 coverage에 포함되지 않는 legacy staging이어야 함",
);
check(
  governance.dataStatus?.field === "pending"
    && governance.dataStatus.pendingValue === true
    && governance.dataStatus.defaultWhenAbsent === "complete"
    && governance.dataStatus.completeRequiresCanonicalSource === true
    && governance.dataStatus.pendingMayLackCanonicalSource === true
    && governance.dataStatus.missingCompleteSourcesMustBeListedAsKnownGaps === true,
  "pending/complete source 규칙이 명시되어야 함",
);

const canonicalRoot = resolve(ROOT, governance.sourceRegistry.canonical.root);
const allMarkdownFiles = listFiles(canonicalRoot)
  .filter((filePath) => extname(filePath).toLowerCase() === ".md");
const coverageBaselines = governance.sourceCoverage;
const missingSourceBaselines = governance.knownGaps.missingCanonicalSourceRecordIds;

for (const domainName of ["speakers", "amplifiers", "dsps", "software", "brand"]) {
  const coverage = coverageBaselines[domainName];
  const allRecords = datasets[domainName];
  const records = coverage.recordScope === "complete"
    ? allRecords.filter((record) => record.pending !== true)
    : allRecords;
  const documents = domainDocuments(allMarkdownFiles, coverage);
  const documentRecordIds = documents.map((filePath) => sourceRecordId(filePath, coverage));
  const recordIds = records.map(({ id }) => id);
  const documentIdSet = new Set(documentRecordIds.map((id) => id.toLowerCase()));
  const recordIdSet = new Set(recordIds.map((id) => id.toLowerCase()));
  const missingIds = recordIds.filter((id) => !documentIdSet.has(id.toLowerCase()));
  const orphanDocumentIds = documentRecordIds.filter((id) => !recordIdSet.has(id.toLowerCase()));

  check(
    records.length === coverage.expectedRecordCount,
    `${domainName}: expected ${coverage.expectedRecordCount} coverage records, received ${records.length}`,
  );
  check(
    documents.length === coverage.expectedDocumentCount,
    `${domainName}: expected ${coverage.expectedDocumentCount} source documents, received ${documents.length}`,
  );
  checkExactStrings(`${domainName}: missing canonical sources`, missingIds, missingSourceBaselines[domainName]);
  checkExactStrings(`${domainName}: orphan canonical documents`, orphanDocumentIds, []);
  checkExactStrings(`${domainName}: duplicate canonical document mappings`, duplicateValues(documentRecordIds), []);
}

const accessoryCoverage = coverageBaselines.accessories;
const accessoryDocuments = domainDocuments(allMarkdownFiles, accessoryCoverage);
const accessoryDocumentPaths = accessoryDocuments.map((filePath) =>
  normalizedPath(relative(canonicalRoot, filePath))
);
check(
  datasets.accessories.length === accessoryCoverage.expectedRecordCount,
  `accessories: expected ${accessoryCoverage.expectedRecordCount} records, received ${datasets.accessories.length}`,
);
check(
  accessoryDocuments.length === accessoryCoverage.expectedDocumentCount,
  `accessories: expected ${accessoryCoverage.expectedDocumentCount} collection documents, received ${accessoryDocuments.length}`,
);
checkExactStrings(
  "accessories: collection document paths",
  accessoryDocumentPaths,
  accessoryCoverage.expectedDocumentPaths,
);

const speakerDocumentCount = domainDocuments(allMarkdownFiles, coverageBaselines.speakers).length;
const completeSpeakerCount = datasets.speakers.filter((speaker) => speaker.pending !== true).length;
check(
  speakerDocumentCount === completeSpeakerCount,
  `speakers: canonical documents (${speakerDocumentCount}) must map 1:1 to complete records (${completeSpeakerCount})`,
);
check(
  datasets.software.every((record) => record.pending === true),
  "software: source가 없는 현재 18개 레코드는 모두 pending이어야 함",
);

const amplifierModels = new Set(
  datasets.amplifiers.map(({ model }) => String(model).trim().toLowerCase()),
);
const unresolvedAmplifierRows = datasets.speakers.flatMap((speaker) =>
  (speaker.amps ?? [])
    .filter(({ model }) => !amplifierModels.has(String(model).trim().toLowerCase()))
    .map(({ model }) => ({ speakerId: speaker.id, model: String(model) }))
);
checkExactStrings(
  "speaker amplifier models: unresolved model baseline",
  [...new Set(unresolvedAmplifierRows.map(({ model }) => model))],
  governance.knownGaps.unresolvedSpeakerAmplifierModels.models,
);
check(
  unresolvedAmplifierRows.length
    === governance.knownGaps.unresolvedSpeakerAmplifierModels.referenceRowCount,
  `speaker amplifier models: expected ${governance.knownGaps.unresolvedSpeakerAmplifierModels.referenceRowCount} unresolved rows, received ${unresolvedAmplifierRows.length}`,
);

const dspsById = new Map(datasets.dsps.map((record) => [record.id, record]));
const softwareById = new Map(datasets.software.map((record) => [record.id, record]));
const dspSoftwareAsymmetries = new Map();

for (const dsp of datasets.dsps) {
  for (const softwareId of dsp.relations?.softwareIds ?? []) {
    if (!(softwareById.get(softwareId)?.relations?.dspIds ?? []).includes(dsp.id)) {
      const relation = { dspId: dsp.id, softwareId };
      dspSoftwareAsymmetries.set(relationKey(relation), relation);
    }
  }
}
for (const software of datasets.software) {
  for (const dspId of software.relations?.dspIds ?? []) {
    if (!(dspsById.get(dspId)?.relations?.softwareIds ?? []).includes(software.id)) {
      const relation = { dspId, softwareId: software.id };
      dspSoftwareAsymmetries.set(relationKey(relation), relation);
    }
  }
}
checkExactRelations(
  "DSP/software relation asymmetries",
  [...dspSoftwareAsymmetries.values()],
  governance.knownGaps.asymmetricRelations.dspSoftware,
);

const accessoriesById = new Map(datasets.accessories.map((record) => [record.id, record]));
const accessoryAsymmetries = [];
for (const accessory of datasets.accessories) {
  for (const relatedId of accessory.relatedAccessoryIds ?? []) {
    if (!(accessoriesById.get(relatedId)?.relatedAccessoryIds ?? []).includes(accessory.id)) {
      accessoryAsymmetries.push(`${accessory.id}->${relatedId}`);
    }
  }
}
checkExactStrings(
  "accessory relation asymmetries",
  accessoryAsymmetries,
  governance.knownGaps.asymmetricRelations.accessoryAccessory,
);

if (failures.length) {
  console.error(`출처 거버넌스 감사 실패: ${failures.length}건`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `출처 거버넌스 감사 통과: ${checks}개 조건, canonical markdown ${allMarkdownFiles.length}개`,
);
