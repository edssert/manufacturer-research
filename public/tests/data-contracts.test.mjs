import assert from "node:assert/strict";

import { validateDataCatalog } from "../js/core/data-contracts.js";
import { ACCESSORIES } from "../js/domains/accessories/accessories.data.js";
import { AMPLIFIERS } from "../js/domains/amplifiers/amplifiers.data.js";
import { BRANDS } from "../js/domains/brand/brand.data.js";
import { DSPS } from "../js/domains/dsps/dsps.data.js";
import { SOFTWARE } from "../js/domains/software/software.data.js";
import { SPEAKERS } from "../js/domains/speakers/speakers.data.js";

const datasets = {
  speakers: SPEAKERS,
  amplifiers: AMPLIFIERS,
  dsps: DSPS,
  software: SOFTWARE,
  accessories: ACCESSORIES,
  brand: BRANDS,
};

const issues = validateDataCatalog(datasets);
assert.deepEqual(issues, [], issues.map(issue => `${issue.path}: ${issue.message}`).join("\n"));

const invalid = structuredClone(datasets);
invalid.speakers[0].id = invalid.amplifiers[0].id;
invalid.software[0].relations.dspIds = "not-an-array";
invalid.brand[0].pending = false;
const negativeIssues = validateDataCatalog(invalid);
assert(negativeIssues.some(issue => issue.code === "invalid-id" || issue.code === "duplicate-id"));
assert(negativeIssues.some(issue => issue.path.endsWith("relations.dspIds") && issue.code === "expected-array"));
assert(negativeIssues.some(issue => issue.path.endsWith("pending") && issue.code === "invalid-status"));

console.log(`Data contract tests: PASS (${Object.values(datasets).reduce((sum, records) => sum + records.length, 0)} records)`);
