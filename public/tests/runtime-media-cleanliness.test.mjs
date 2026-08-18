import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

import { SPEAKERS } from "../js/domains/speakers/speakers.data.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const manifest = JSON.parse(readFileSync(resolve(ROOT, "config/runtime-media-overrides.json"), "utf8"));
const byId = new Map(SPEAKERS.map(product => [product.id, product]));
const sha256 = bytes => createHash("sha256").update(bytes).digest("hex");

assert.equal(manifest.schemaVersion, 1);
assert.equal(manifest.scope, "speaker-representative-media");

for (const record of manifest.maskedDerivatives) {
  const sourcePath = resolve(ROOT, record.sourcePath);
  assert(existsSync(sourcePath), `${record.sourcePath}: missing raw source`);
  const sourceBytes = readFileSync(sourcePath);
  assert.equal(sha256(sourceBytes), record.sourceSha256, `${record.sourcePath}: source hash`);

  for (const outputRelative of record.outputPaths) {
    const outputPath = resolve(ROOT, outputRelative);
    assert(existsSync(outputPath), `${outputRelative}: missing output`);
    const outputBytes = readFileSync(outputPath);
    assert.equal(sha256(outputBytes), record.outputSha256, `${outputRelative}: output hash`);

    const [before, after] = await Promise.all([
      sharp(sourceBytes).ensureAlpha().raw().toBuffer({ resolveWithObject: true }),
      sharp(outputBytes).ensureAlpha().raw().toBuffer({ resolveWithObject: true }),
    ]);
    assert.deepEqual([before.info.width, before.info.height], record.dimensions, `${outputRelative}: source size`);
    assert.deepEqual([after.info.width, after.info.height], record.dimensions, `${outputRelative}: output size`);
    assert.equal(before.data.length, after.data.length, `${outputRelative}: pixel buffer size`);

    const [minX, minY, maxX, maxY] = record.transform.editBoundsInclusive;
    let changedPixels = 0;
    for (let index = 0; index < before.data.length; index += 4) {
      let changed = false;
      for (let channel = 0; channel < 4; channel++) changed ||= before.data[index + channel] !== after.data[index + channel];
      if (!changed) continue;
      const pixel = index / 4;
      const x = pixel % before.info.width;
      const y = Math.floor(pixel / before.info.width);
      assert(x >= minX && x <= maxX && y >= minY && y <= maxY, `${outputRelative}: edit escaped declared bounds`);
      changedPixels++;
    }
    assert.equal(changedPixels, record.transform.changedPixels, `${outputRelative}: changed pixel count`);
    assert.equal(record.transform.productPixelsChanged, false, `${outputRelative}: product pixels policy`);
    assert.equal(record.transform.generativeEditing, false, `${outputRelative}: generative edit policy`);
  }
}

for (const record of manifest.officialSubstitutions) {
  const product = byId.get(record.productId);
  assert(product, `${record.productId}: missing product`);
  assert.equal(product.img, record.runtimePath, `${record.productId}: representative path`);
  assert(product.views.every(view => view.src !== record.retiredRuntimePath), `${record.productId}: rejected callout view remains`);
  assert(!existsSync(resolve(ROOT, record.retiredRuntimePath)), `${record.productId}: retired runtime callout remains`);
  assert.equal(sha256(readFileSync(resolve(ROOT, record.runtimePath))), record.runtimeSha256, `${record.productId}: runtime hash`);
  assert.equal(sha256(readFileSync(resolve(ROOT, record.rejectedSourcePath))), record.rejectedSha256, `${record.productId}: rejected source hash`);
  const evidence = readFileSync(resolve(ROOT, record.evidencePath), "utf8");
  assert(evidence.includes(record.productId.replace("spk-martin-", "").toUpperCase()), `${record.productId}: evidence identity`);
}

console.log(
  `runtime media cleanliness: PASS (${manifest.maskedDerivatives.length} masked source, ${manifest.officialSubstitutions.length} official substitutions)`,
);
