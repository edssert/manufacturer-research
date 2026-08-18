import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { SERIES_ORDER_BY_MANUFACTURER } from "../js/domains/speakers/speakers.schema.js";

const sourceOrder = JSON.parse(await readFile("raw-data/series-order/martin.json", "utf8"));
const appOrder = SERIES_ORDER_BY_MANUFACTURER.martin;

assert.deepEqual(
  appOrder.slice(0, 3),
  ["Wavefront Precision", "Torus", "FlexPoint"],
  "Martin Audio's official premium system trio must lead the catalogue",
);
assert.deepEqual(appOrder, sourceOrder.displaySeriesOrder, "Runtime and documented Martin display order must match");
assert.deepEqual(
  new Set(appOrder),
  new Set(sourceOrder.series.map(entry => entry.series)),
  "Display order must cover every official Martin series exactly once",
);

console.log(`PASS Martin Audio series hierarchy (${appOrder.length} series)`);
