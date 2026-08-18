import assert from "node:assert/strict";
import { resolve } from "node:path";

import { isWithin, resolveSafe, verifyManifest } from "../../scripts/runtime-media-pipeline.mjs";

const projectRoot = resolve(import.meta.dirname, "..", "..");
const runtimeRoot = resolve(projectRoot, "public", "assets", "img", "speakers");

assert.equal(isWithin(runtimeRoot, resolve(runtimeRoot, "la", "image.webp")), true);
assert.equal(isWithin(runtimeRoot, resolve(runtimeRoot, "..", "escape.webp")), false);
await assert.rejects(resolveSafe(runtimeRoot, "../escape.webp"), /허용된 루트를 벗어납니다/);

const manifest = await verifyManifest();
assert.equal(manifest.schemaVersion, 2);
assert.equal(manifest.policy.interactiveImageSurface, "official-original-bytes");
assert.equal(
  ["db", "my"].every(brand => manifest.targetBrands.includes(brand)),
  true,
);
assert.equal(
  manifest.records.every(
    record =>
      record.source.verifiedRawCopy &&
      ["none", "documented-local-mask"].includes(record.transform.type) &&
      (record.transform.type === "documented-local-mask" ||
        (record.source.sha256 === record.output.sha256 && record.source.bytes === record.output.bytes)) &&
      JSON.stringify(record.source.dimensions) === JSON.stringify(record.output.dimensions) &&
      record.source.format === record.output.format,
  ),
  true,
);
assert.equal(
  manifest.records.every(record => !record.output.path.endsWith(".runtime.webp")),
  true,
);

const x15Hiq = manifest.records.find(
  record =>
    record.output.path === "public/assets/img/speakers/la/official/x-series/x15-hiq/L-Acoustics_X15HiQ_Front_Black.jpg",
);
assert(x15Hiq, "X15 HiQ 대표 원본 JPEG가 manifest에 없습니다.");
assert.equal(x15Hiq.source.path, "raw-data/raw-assets/la/speakers/x-series/x15-hiq/X15 HiQ/L_Acoustics_X15HiQ.jpg");
assert.equal(x15Hiq.output.format, "jpeg");
assert.deepEqual(x15Hiq.output.dimensions, [3000, 3000]);
assert.equal(x15Hiq.output.sha256, "8f6e894e59a5ceeda105f568f368d04d4ed5802f2477f0e904c9e5ac27a3c170");
assert.equal(x15Hiq.output.path.split("/").at(-1), "L-Acoustics_X15HiQ_Front_Black.jpg");

console.log(`runtime media manifest test: PASS (${manifest.records.length} assets)`);
