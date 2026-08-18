import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const files = ["0001_catalog_core.sql", "0002_knowledge_workflows.sql", "0003_supabase_auth.sql"];
const migrations = await Promise.all(
  files.map(async file => ({ file, sql: await readFile(resolve(root, "database/migrations", file), "utf8") })),
);
const combined = migrations.map(({ sql }) => sql).join("\n");

for (const { file, sql } of migrations) {
  assert.match(sql, /^BEGIN;/m, `${file}: transaction start`);
  assert.match(sql, /^COMMIT;/m, `${file}: transaction commit`);
  assert.doesNotMatch(sql, /\bDROP\s+(?:TABLE|SCHEMA|TYPE)\b/i, `${file}: destructive DDL`);
}

const requiredTables = [
  "manufacturer",
  "product_family",
  "product_group",
  "product",
  "attribute_definition",
  "product_attribute",
  "source_document",
  "source_locator",
  "assertion",
  "product_relation",
  "media_asset",
  "media_placement",
  "app_user",
  "change_request",
  "approval",
  "audit_log",
  "procurement_notice",
  "notice_version",
  "requirement",
  "requirement_evaluation",
  "venue",
  "application_case",
  "deployed_component",
  "technology_concept",
  "technology_support",
  "timeline_event",
];

for (const table of requiredTables) {
  assert.match(combined, new RegExp(`CREATE TABLE catalog\\.${table}\\s*\\(`), `${table}: table`);
}

assert.match(combined, /stable_key text NOT NULL UNIQUE/, "stable identity contract");
assert.match(combined, /audit_log_append_only/, "append-only audit trigger");
assert.match(combined, /CHECK \(num_nonnulls\(product_id, candidate_system_id\) = 1\)/, "evaluation target xor");
assert.match(combined, /content_sha256 text NOT NULL/, "notice version content hash");
assert.match(combined, /date_precision catalog\.date_precision NOT NULL/, "timeline date precision");
assert.match(combined, /auth_subject uuid NOT NULL UNIQUE/, "Supabase UUID identity contract");
assert.match(combined, /REFERENCES auth\.users\(id\)/, "Supabase Auth identity foreign key");
assert.match(combined, /REVOKE ALL ON SCHEMA catalog FROM PUBLIC, anon, authenticated/, "private catalog schema");

console.log(`database schema: PASS (${requiredTables.length} required tables, ${files.length} migrations)`);
