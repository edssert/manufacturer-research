import assert from "node:assert/strict";

import {
  buildKSeriesSlice,
  legacyKSeries,
  legacyProjectionFromSlice,
  sha256,
  stableJson,
} from "../../scripts/lib/k-series-slice.mjs";

const slice = await buildKSeriesSlice();
const legacy = legacyKSeries();
const projected = legacyProjectionFromSlice(slice);

assert.equal(slice.products.length, 8);
assert.equal(new Set(slice.products.map(product => product.stableKey)).size, 8);
assert.deepEqual(projected, legacy, "canonical adapter must preserve every legacy field");
assert.equal(sha256(stableJson(projected)), sha256(stableJson(legacy)));
assert.ok(slice.relations.length > 0, "representative slice must include relations");
assert.ok(slice.media.length > slice.products.length, "representative slice must include multiple media placements");
assert.equal(
  slice.assertions.length,
  slice.products.reduce((sum, product) => sum + product.attributes.length, 0),
);
assert.ok(slice.sources.every(source => source.sha256 && source.byteSize > 0));
assert.ok(slice.media.every(item => item.sha256 && item.deliveryPath.startsWith("public/assets/img/")));

console.log(
  `K Series adapter PASS: ${slice.products.length} products, ${slice.assertions.length} assertions, ${slice.relations.length} relations, ${slice.media.length} media`,
);
