import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { databaseUrlFromArgs } from "./lib/catalog-db.mjs";
import { legacyKSeries, sha256, stableJson } from "./lib/k-series-slice.mjs";
import { runKSeriesImport } from "./import-k-series-slice.mjs";
import { projectKSeries } from "./project-k-series-slice.mjs";

const connectionString = databaseUrlFromArgs();
const sourcePath = new URL("../public/js/domains/speakers/data/la/k-series.data.js", import.meta.url);
const sourceBefore = await readFile(sourcePath);

const firstImport = await runKSeriesImport(connectionString);
const firstProjection = await projectKSeries(connectionString);
const secondImport = await runKSeriesImport(connectionString);
const secondProjection = await projectKSeries(connectionString);
const sourceAfter = await readFile(sourcePath);
const legacy = legacyKSeries();

assert.deepEqual(firstImport, secondImport, "re-import changed logical import results");
assert.deepEqual(firstProjection, secondProjection, "re-import changed the database projection");
assert.deepEqual(firstProjection.records, legacy, "database projection differs from the legacy source records");
assert.equal(sha256(sourceBefore), sha256(sourceAfter), "legacy source module changed during import");
assert.equal(
  firstProjection.projectionSha256,
  sha256(stableJson(legacy)),
  "projection hash does not match legacy records",
);

console.log(
  `K Series vertical slice PASS: ${legacy.length} products, ${firstImport.attributes} attributes, ${firstImport.relations} relations, ${firstImport.media} media, idempotent import`,
);
