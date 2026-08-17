import assert from "node:assert/strict";
import { resolve } from "node:path";

import { isWithin, resolveSafe, verifyManifest } from "../../scripts/runtime-media-pipeline.mjs";

const projectRoot = resolve(import.meta.dirname, "..", "..");
const runtimeRoot = resolve(projectRoot, "public", "assets", "img", "speakers");

assert.equal(isWithin(runtimeRoot, resolve(runtimeRoot, "la", "image.webp")), true);
assert.equal(isWithin(runtimeRoot, resolve(runtimeRoot, "..", "escape.webp")), false);
await assert.rejects(resolveSafe(runtimeRoot, "../escape.webp"), /허용된 루트를 벗어납니다/);

const manifest = await verifyManifest();
assert.equal(manifest.excludedBrands.includes("db"), true);
assert.equal(manifest.excludedBrands.includes("my"), true);
assert.equal(
  manifest.records.some(record => ["db", "my"].includes(record.brand)),
  false,
);
assert.equal(manifest.totals.unmatchedOversize, 0);
assert.equal(
  manifest.records.every(record => record.source.sha256 && record.output.sha256),
  true,
);
assert.equal(
  manifest.records
    .filter(record => record.action === "derive")
    .every(record => record.source.verifiedRawCopy && record.output.visualSha256),
  true,
);

console.log(`runtime media manifest test: PASS (${manifest.records.length} assets)`);
