import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { JBL_SPEAKERS } from "../js/domains/speakers/data/jbl.data.js";

const auditUrl = new URL("../../raw-data/catalog-inventory/jbl-current-hierarchy-audit.json", import.meta.url);
const audit = JSON.parse(await readFile(auditUrl, "utf8"));

assert.equal(audit.schemaVersion, 1);
assert.equal(audit.manufacturerId, "jbl");
assert.equal(JBL_SPEAKERS.length, audit.runtimeInventoryAudit.runtimeProductCount);
assert.deepEqual(audit.runtimeInventoryAudit.legacyOnlyRuntimeIds, []);
assert.deepEqual(audit.runtimeInventoryAudit.deletionIds, []);

const runtimeVtx = JBL_SPEAKERS.filter(product => product.series.startsWith("VTX"));
const runtimeVtxIds = new Set(runtimeVtx.map(product => product.id));
const auditedVtxIds = new Set(audit.vtxAudit.products.map(product => product.id));

assert.equal(runtimeVtx.length, audit.vtxAudit.runtimeCount);
assert.equal(auditedVtxIds.size, audit.vtxAudit.runtimeCount, "Every audited VTX ID must be unique");
assert.deepEqual(auditedVtxIds, runtimeVtxIds, "The lifecycle audit must cover every runtime VTX product exactly once");
assert.equal(
  audit.vtxAudit.products.filter(product => product.lifecycle === "current-catalog-and-family").length,
  audit.vtxAudit.catalogAndCurrentFamilyCount,
);
assert.equal(
  audit.vtxAudit.products.filter(product => product.lifecycle === "current-family-only").length,
  audit.vtxAudit.currentFamilyOnlyCount,
);
assert.equal(
  audit.vtxAudit.products.filter(product => product.lifecycle === "legacy-only").length,
  audit.vtxAudit.legacyOnlyCount,
);
assert.deepEqual(
  audit.vtxAudit.products
    .filter(product => product.lifecycle === "current-family-only")
    .map(product => product.id)
    .sort(),
  [...audit.vtxAudit.currentFamilyOnlyIds].sort(),
);

assert.deepEqual(audit.displayHierarchy.manufacturerFamilyPriority, ["A", "V", "F", "M", "B", "S"]);
assert.deepEqual(audit.displayHierarchy.recommendedRuntimeOrder.slice(0, 4), [
  "VTX A12",
  "VTX A12W",
  "VTX A8",
  "VTX A6",
]);
assert.equal(new Set(audit.displayHierarchy.recommendedRuntimeOrder).size, audit.vtxAudit.runtimeCount);
assert.deepEqual(
  new Set(audit.displayHierarchy.recommendedRuntimeOrder),
  new Set(runtimeVtx.map(product => product.name)),
  "The recommended order must cover every runtime VTX name exactly once",
);
assert.deepEqual(audit.handoff.deleteRuntimeIds, []);
assert.deepEqual(audit.handoff.setVtxOrderTo, audit.displayHierarchy.recommendedRuntimeOrder);

console.log(
  `PASS JBL current hierarchy audit (${JBL_SPEAKERS.length} runtime products, ${runtimeVtx.length} current-family VTX products)`,
);
