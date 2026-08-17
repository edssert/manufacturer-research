import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { SPEAKERS } from "../public/js/domains/speakers/speakers.data.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST_ROOT = resolve(ROOT, "raw-data/source-manifests");
const ROLES = new Set([
  "product-image",
  "list-image",
  "datasheet",
  "manual",
  "rigging-manual",
  "system-guide",
  "catalogue",
  "whitepaper",
  "application-guide",
  "brochure",
  "canonical-spec",
  "current-catalogue",
  "downloads-index-snapshot",
  "legacy-systems-snapshot",
  "lifecycle-exclusion-record",
  "media-archive",
  "media-library-archive",
  "media-or-data-archive",
  "official-document",
  "product-page",
  "product-page-snapshot",
  "series-modules-snapshot",
  "series-page-snapshot",
  "source-metadata",
  "technical-document",
  "technical-drawing",
  "technical-drawing-archive",
]);
const MANUFACTURER_SCOPE_ROLES = new Set([
  "current-catalogue",
  "downloads-index-snapshot",
  "legacy-systems-snapshot",
  "lifecycle-exclusion-record",
  "source-metadata",
]);
const speakerIds = new Set(SPEAKERS.map(({ id }) => id));
const manifestFiles = readdirSync(MANIFEST_ROOT)
  .filter(name => name.endsWith(".json"))
  .sort();
const seenPaths = new Set();
let sourceFiles = 0;

for (const filename of manifestFiles) {
  const manifest = JSON.parse(readFileSync(resolve(MANIFEST_ROOT, filename), "utf8").replace(/^\uFEFF/, ""));
  assert.equal(manifest.schemaVersion, 1, `${filename}: schemaVersion`);
  assert.equal(manifest.scope, "loudspeakers", `${filename}: scope`);
  assert.equal(filename, `${manifest.manufacturerId}.json`, `${filename}: manufacturerId`);
  assert(Array.isArray(manifest.files) && manifest.files.length > 0, `${filename}: files`);

  const paths = manifest.files.map(({ path }) => path);
  assert.deepEqual(paths, [...paths].sort(), `${filename}: files must be sorted by path`);

  for (const entry of manifest.files) {
    const archiveBoundary =
      entry.role === "canonical-spec" ? /^raw-data\/raw-specs\// : /^raw-data\/(?:official-docs|raw-assets)\//;
    assert.match(entry.path, archiveBoundary, `${entry.path}: archive boundary`);
    assert(!seenPaths.has(entry.path), `${entry.path}: duplicate manifest path`);
    seenPaths.add(entry.path);
    assert(
      Array.isArray(entry.productIds) && (entry.productIds.length > 0 || MANUFACTURER_SCOPE_ROLES.has(entry.role)),
      `${entry.path}: productIds`,
    );
    for (const productId of entry.productIds) assert(speakerIds.has(productId), `${entry.path}: unknown ${productId}`);
    assert(ROLES.has(entry.role), `${entry.path}: role`);
    assert.equal(new URL(entry.sourcePage).protocol, "https:", `${entry.path}: sourcePage`);
    assert.equal(new URL(entry.sourceAsset).protocol, "https:", `${entry.path}: sourceAsset`);
    assert.match(entry.retrievedAt, /^\d{4}-\d{2}-\d{2}$/, `${entry.path}: retrievedAt`);
    assert.match(entry.sha256, /^[a-f0-9]{64}$/, `${entry.path}: sha256`);
    assert(Number.isSafeInteger(entry.bytes) && entry.bytes > 0, `${entry.path}: bytes`);
    assert.equal(typeof entry.mimeType, "string", `${entry.path}: mimeType`);

    const archivedPath = resolve(ROOT, entry.path);
    assert(existsSync(archivedPath), `${entry.path}: missing file`);
    const bytes = readFileSync(archivedPath);
    assert.equal(statSync(archivedPath).size, entry.bytes, `${entry.path}: byte mismatch`);
    assert.equal(createHash("sha256").update(bytes).digest("hex"), entry.sha256, `${entry.path}: hash mismatch`);
    sourceFiles++;
  }
}

console.log(`source manifest audit: PASS (${manifestFiles.length} manufacturers, ${sourceFiles} files)`);
