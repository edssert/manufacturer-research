import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { LA_X_SERIES } from "../js/domains/speakers/data/la/x-series.data.js";

const root = resolve(import.meta.dirname, "../..");
const audit = JSON.parse(
  await readFile(resolve(root, "raw-data/catalog-inventory/la-x-series-media-audit.json"), "utf8"),
);
const sourceManifest = JSON.parse(await readFile(resolve(root, "raw-data/source-manifests/la.json"), "utf8"));
const byId = new Map(LA_X_SERIES.map(product => [product.id, product]));
const sourceByPath = new Map(sourceManifest.files.map(file => [file.path, file]));

assert.equal(
  byId.get("spk-la-x15-hiq")?.img,
  "public/assets/img/speakers/la/official/x-series/x15-hiq/L-Acoustics_X15HiQ_Front_Black.jpg",
  "X15 HiQ user-approved primary must not regress",
);

assert.equal(audit.products.length, LA_X_SERIES.length, "audit must cover the complete X Series");

for (const audited of audit.products) {
  const product = byId.get(audited.id);
  assert.ok(product, `${audited.id}: product`);
  assert.equal(product.img, audited.recommendedPrimary, `${audited.id}: primary`);
  assert.equal(product.views[0]?.src, product.img, `${audited.id}: first gallery view`);
  assert.deepEqual(
    product.views.map(view => view.src),
    audited.recommendedViewOrder,
    `${audited.id}: gallery order`,
  );
  assert.doesNotMatch(product.img, /gamme-x|x-series\.runtime/i, `${audited.id}: no family primary`);
  await access(resolve(root, product.img));

  for (const rawPath of [audited.representativeRawPath, audited.officialPageHeroRawPath]) {
    const source = sourceByPath.get(rawPath);
    assert.ok(source, `${audited.id}: source manifest ${rawPath}`);
    assert.ok(source.productIds.includes(audited.id), `${audited.id}: source product linkage`);
    const bytes = await readFile(resolve(root, rawPath));
    assert.equal(bytes.byteLength, source.bytes, `${rawPath}: byte count`);
    assert.equal(createHash("sha256").update(bytes).digest("hex"), source.sha256, `${rawPath}: sha256`);
  }
}

for (const id of ["spk-la-x8i", "spk-la-x6i", "spk-la-x4i"]) {
  assert.match(byId.get(id).img, /white/i, `${id}: installation primary`);
}

console.log(`PASS L-Acoustics X Series media order (${audit.products.length} products)`);
