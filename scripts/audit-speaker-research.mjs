import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { format, resolveConfig } from "prettier";

import { SPEAKERS } from "../public/js/domains/speakers/speakers.data.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT = join(ROOT, "config", "speaker-research.json");
const SPECS_ROOT = join(ROOT, "raw-data", "raw-specs");
const MEDIA = JSON.parse(readFileSync(join(ROOT, "config", "media-sources.json"), "utf8"));

function walk(directory, extension, output = []) {
  if (!existsSync(directory)) return output;
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) walk(path, extension, output);
    else if (name.toLowerCase().endsWith(extension)) output.push(path);
  }
  return output;
}

const sourceRecordId = (manufacturer, filename) => {
  const stem = filename.replace(/\.(?:json|md)$/i, "").replace(/_v\d+(?:\.\d+)*$/i, "");
  return `spk-${manufacturer}-${stem}`.toLowerCase();
};

const canonicalDocuments = new Map();
const canonicalSourcePaths = [...walk(SPECS_ROOT, ".md"), ...walk(SPECS_ROOT, ".json")].sort();
for (const path of canonicalSourcePaths) {
  const segments = relative(SPECS_ROOT, path).split(/[\\/]/);
  if (segments[1] !== "speakers") continue;
  const key = sourceRecordId(segments[0], segments.at(-1));
  const paths = canonicalDocuments.get(key) || [];
  paths.push(relative(ROOT, path).replaceAll("\\", "/"));
  canonicalDocuments.set(key, paths);
}

const mediaByProduct = new Map();
for (const asset of MEDIA.assets) {
  const entries = mediaByProduct.get(asset.productId) || [];
  entries.push(asset.runtimePath);
  mediaByProduct.set(asset.productId, entries);
}

function missingCardFields(speaker) {
  const missing = [];
  if (!speaker.type) missing.push("classification.type");
  if (!speaker.network) missing.push("classification.network");
  if (!speaker.wayCount) missing.push("classification.wayCount");
  if (!speaker.transducers) missing.push("drivers.transducers");
  if (speaker.spl == null) missing.push("performance.maxSpl");
  if (!speaker.cov && !speaker.hRange) missing.push("comparison.coverage");
  if (!Array.isArray(speaker.freqs) || !speaker.freqs.length) missing.push("comparison.frequencyRange");
  if (speaker.weight == null) missing.push("comparison.weight");
  if (speaker.selfPowered !== true && (!Array.isArray(speaker.amps) || !speaker.amps.length)) {
    missing.push("amplification");
  }
  return missing;
}

function buildInventory() {
  const pending = SPEAKERS.filter(speaker => "pending" in speaker && speaker.pending === true).map(speaker => {
    const documents = canonicalDocuments.get(speaker.id.toLowerCase()) || [];
    const trackedMedia = mediaByProduct.get(speaker.id) || [];
    return {
      id: speaker.id,
      manufacturer: speaker.mk,
      series: speaker.series,
      name: speaker.name,
      missingCardFields: missingCardFields(speaker),
      canonicalDocuments: documents,
      canonicalSourceStatus: documents.length ? "available" : "missing",
      trackedOfficialMedia: trackedMedia,
      mediaSourceStatus: trackedMedia.length ? "tracked" : "untracked",
      acquisitionStatus: documents.length ? "review-source" : "queued",
    };
  });

  const fieldGapCounts = {};
  for (const record of pending) {
    for (const field of record.missingCardFields) fieldGapCounts[field] = (fieldGapCounts[field] || 0) + 1;
  }

  const groups = Object.values(
    pending.reduce((result, record) => {
      const key = `${record.manufacturer}:${record.series}`;
      result[key] ||= {
        manufacturer: record.manufacturer,
        series: record.series,
        recordCount: 0,
        recordIds: [],
      };
      result[key].recordCount++;
      result[key].recordIds.push(record.id);
      return result;
    }, {}),
  );

  return {
    schemaVersion: 1,
    scope: "speaker-card-research",
    policy: {
      officialSourcesOnly: true,
      canonicalTextRoot: "raw-data/raw-specs/<manufacturer>/speakers/<series>/<model>.{md,json}",
      originalAssetRoot: "raw-data/raw-assets/<manufacturer>/speakers/<series>/",
      runtimeAssetsAreDerivatives: true,
      completionRule: "pending may be removed only after card fields and canonical source are verified",
    },
    summary: {
      totalRecords: SPEAKERS.length,
      verifiedRecords: SPEAKERS.length - pending.length,
      pendingRecords: pending.length,
      pendingGroups: groups.length,
      missingCanonicalDocuments: pending.filter(record => record.canonicalSourceStatus === "missing").length,
      untrackedOfficialMedia: pending.filter(record => record.mediaSourceStatus === "untracked").length,
      fieldGapCounts,
    },
    groups,
    records: pending,
  };
}

const inventory = buildInventory();
const prettierConfig = (await resolveConfig(OUTPUT)) ?? {};
const serialized = await format(JSON.stringify(inventory), { ...prettierConfig, parser: "json" });

if (process.argv.includes("--write")) {
  writeFileSync(OUTPUT, serialized);
  console.log(`speaker research inventory written: ${relative(ROOT, OUTPUT)} (${inventory.records.length} pending)`);
} else {
  const current = existsSync(OUTPUT) ? readFileSync(OUTPUT, "utf8") : "";
  if (current !== serialized) {
    console.error("speaker research inventory is stale; run npm run inventory:speakers");
    process.exit(1);
  }
  console.log(
    `speaker research audit: PASS (${inventory.summary.verifiedRecords} verified, ${inventory.summary.pendingRecords} pending, ${inventory.summary.pendingGroups} groups)`,
  );
}
