import assert from "node:assert/strict";

import { EAW_SPEAKERS } from "../js/domains/speakers/data/eaw.data.js";
import { MARTIN_SPEAKERS } from "../js/domains/speakers/data/martin.data.js";
import { productRank } from "../js/domains/speakers/speakers.schema.js";

const adaptive = EAW_SPEAKERS.filter(speaker => speaker.series === "ADAPTive Series")
  .sort((a, b) => productRank(a.mk, a.series, a.name) - productRank(b.mk, b.series, b.name))
  .map(speaker => speaker.name);

assert.deepEqual(adaptive, ["Anya", "Anna", "AC6", "Otto"]);
assert.equal(new Set(adaptive).size, 4, "Every ADAPTive product must have one stable display position");

const newport = EAW_SPEAKERS.filter(speaker => speaker.series === "Newport")
  .sort((a, b) => productRank(a.mk, a.series, a.name) - productRank(b.mk, b.series, b.name))
  .map(speaker => speaker.name);
assert.deepEqual(newport, ["NT206L", "NT208L", "NTX210L", "NT116S"]);

const martinSourceOrder = series =>
  MARTIN_SPEAKERS.filter(speaker => speaker.series === series).map(speaker => speaker.name);
assert.deepEqual(martinSourceOrder("Wavefront Precision"), ["WPM", "WPS", "WPC", "WPL"]);
assert.deepEqual(martinSourceOrder("FlexPoint"), [
  "FlexPoint FP4",
  "FlexPoint FP6",
  "FlexPoint FP8",
  "FlexPoint FP12",
  "FlexPoint FP15",
]);
assert.deepEqual(
  martinSourceOrder("Torus").sort((a, b) => productRank("martin", "Torus", a) - productRank("martin", "Torus", b)),
  ["TORUS T820", "TORUS T1215", "TORUS T1230"],
);
assert.deepEqual(
  martinSourceOrder("TH Series").sort(
    (a, b) => productRank("martin", "TH Series", a) - productRank("martin", "TH Series", b),
  ),
  ["THS", "THH", "THV"],
);

console.log(`PASS speaker product hierarchy (EAW ${adaptive.join(" → ")}; Martin official source order)`);
