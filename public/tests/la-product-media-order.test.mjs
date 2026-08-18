import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { LA_A_SERIES } from "../js/domains/speakers/data/la/a-series.data.js";
import { LA_K_SERIES } from "../js/domains/speakers/data/la/k-series.data.js";

const auditUrl = new URL("../../raw-data/catalog-inventory/la-a-k-series-media-audit.json", import.meta.url);
const audit = JSON.parse(await readFile(auditUrl, "utf8"));
const byId = new Map([...LA_A_SERIES, ...LA_K_SERIES].map(product => [product.id, product]));
const userConfirmedOverrides = {
  "spk-la-kiva-ii": [
    "public/assets/img/speakers/la/official/k-series/kiva-ii/05-3dr-kiva-ii-perspective-01-800x400-1.png",
    "public/assets/img/speakers/la/official/k-series/kiva-ii/03-l-acoustics-kivaii-6.jpg",
    "public/assets/img/speakers/la/official/k-series/kiva-ii/01-l-acoustics-kivaii-front.jpg",
    "public/assets/img/speakers/la/official/k-series/kiva-ii/04-l-acoustics-kivaii-rear.jpg",
  ],
};

for (const audited of audit.products) {
  const product = byId.get(audited.id);
  assert.ok(product, `${audited.id}: product`);
  const expectedViews =
    userConfirmedOverrides[audited.id] ?? audited.recommendation.recommendedViewOrder.map(view => view.path);
  assert.equal(product.img, expectedViews[0], `${audited.id}: primary`);
  assert.deepEqual(
    product.views.map(view => view.src),
    expectedViews,
    `${audited.id}: view order`,
  );
}

for (const product of LA_A_SERIES.filter(item => item.name.includes("i "))) {
  assert.match(product.img, /white/i, `${product.id}: installation product must use an official white primary`);
}

console.log(`PASS L-Acoustics A/K product media order (${audit.products.length} products)`);
