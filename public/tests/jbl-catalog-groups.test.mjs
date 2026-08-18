import assert from "node:assert/strict";

import { JBL_SPEAKERS } from "../js/domains/speakers/data/jbl.data.js";
import { SERIES_ORDER_BY_MANUFACTURER, productRank, seriesRank } from "../js/domains/speakers/speakers.schema.js";

const groupOrder = SERIES_ORDER_BY_MANUFACTURER.jbl;
const groups = new Set(JBL_SPEAKERS.map(speaker => speaker.catalogGroup));

assert.equal(JBL_SPEAKERS.length, 270, "JBL canonical product count changed unexpectedly");
assert.equal(groupOrder[0], "VTX Touring Systems", "VTX must lead the JBL catalogue");
assert.deepEqual(groups, new Set(groupOrder), "Every JBL card must map to one reviewed catalogue group");
assert.ok(
  JBL_SPEAKERS.filter(speaker => speaker.series.startsWith("VTX")).every(
    speaker => speaker.catalogGroup === "VTX Touring Systems" && seriesRank("jbl", speaker.catalogGroup) === 0,
  ),
  "Every VTX product must appear in the leading touring group",
);

const vtxDisplayOrder = JBL_SPEAKERS.filter(speaker => speaker.catalogGroup === "VTX Touring Systems")
  .sort((a, b) => productRank(a.mk, a.catalogGroup, a.name) - productRank(b.mk, b.catalogGroup, b.name))
  .map(speaker => speaker.name);
assert.deepEqual(
  vtxDisplayOrder.slice(0, 4),
  ["VTX A12", "VTX A12W", "VTX A8", "VTX A6"],
  "Flagship VTX A Series must lead from full-size to sub-compact",
);
assert.equal(new Set(vtxDisplayOrder).size, 22, "Every VTX product must have one stable display position");
assert.ok(
  JBL_SPEAKERS.every(speaker => speaker.series && speaker.catalogGroup),
  "Grouping must preserve the exact manufacturer series while adding a display group",
);

const control47 = JBL_SPEAKERS.find(speaker => speaker.id === "spk-jbl-control-47c-t");
assert.ok(control47, "Control 47C/T must remain a canonical loudspeaker");
assert.match(control47.img, /spk-jbl-control-47c-t\.webp$/, "Control 47C/T must use the official speaker image");

console.log(`PASS JBL catalogue groups (${JBL_SPEAKERS.length} products, ${groups.size} groups)`);
