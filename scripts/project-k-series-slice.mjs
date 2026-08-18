import { writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { createCatalogClient, databaseUrlFromArgs } from "./lib/catalog-db.mjs";
import { REPO_ROOT, sha256, stableJson } from "./lib/k-series-slice.mjs";

function attributeValue(row) {
  if (row.semantics !== "known") return null;
  if (row.value_kind === "number" || row.value_kind === "quantity") return Number(row.number_value);
  if (row.value_kind === "boolean") return row.boolean_value;
  if (row.value_kind === "json") return row.json_value;
  return row.text_value;
}

export async function projectKSeries(connectionString) {
  const client = createCatalogClient(connectionString);
  await client.connect();
  try {
    const identity = await client.query(
      `SELECT p.id, p.stable_key, p.display_name, p.display_order, m.stable_key AS manufacturer_key,
                m.display_name AS manufacturer_name, g.official_series_name
           FROM catalog.product p
           JOIN catalog.manufacturer m ON m.id = p.manufacturer_id
           JOIN catalog.product_group g ON g.id = p.group_id
          WHERE g.stable_key = 'la:k-series'
          ORDER BY p.display_order, p.stable_key`,
    );
    const attributes = await client.query(
      `SELECT p.stable_key AS product_key, d.code, d.value_kind, d.constraints_json, a.semantics,
                a.text_value, a.number_value, a.boolean_value, a.json_value
           FROM catalog.product_attribute a
           JOIN catalog.product p ON p.id = a.product_id
           JOIN catalog.product_group g ON g.id = p.group_id
           JOIN catalog.attribute_definition d ON d.id = a.definition_id
          WHERE g.stable_key = 'la:k-series'
          ORDER BY p.display_order, d.code`,
    );
    const media = await client.query(
      `SELECT p.stable_key AS product_key, mp.role, mp.ordinal, mp.delivery_path,
                mp.focal_point, mp.download_filename, ma.object_key, ma.sha256, ma.byte_size,
                ma.mime_type, ma.width, ma.height, ma.has_alpha
           FROM catalog.media_placement mp
           JOIN catalog.product p ON p.id = mp.product_id
           JOIN catalog.product_group g ON g.id = p.group_id
           JOIN catalog.media_asset ma ON ma.id = mp.media_id
          WHERE g.stable_key = 'la:k-series'
          ORDER BY p.display_order, mp.ordinal`,
    );
    const relations = await client.query(
      `SELECT source.stable_key AS product_key, target.stable_key AS target_key,
                relation.metadata
           FROM catalog.product_relation relation
           JOIN catalog.product source ON source.id = relation.from_product_id
           JOIN catalog.product target ON target.id = relation.to_product_id
           JOIN catalog.product_group g ON g.id = source.group_id
          WHERE g.stable_key = 'la:k-series' AND relation.type_code = 'compatible_accessory'
          ORDER BY source.display_order, (relation.metadata->>'legacyOrder')::integer, target.stable_key`,
    );
    const run = await client.query(
      `SELECT importer_version, source_sha256, evidence_sha256, result_json
           FROM catalog.import_run WHERE stable_key = 'la:k-series:v1'`,
    );
    if (run.rowCount !== 1) throw new Error("K Series import run is missing");

    const attrsByProduct = Map.groupBy(attributes.rows, row => row.product_key);
    const mediaByProduct = Map.groupBy(media.rows, row => row.product_key);
    const relationsByProduct = Map.groupBy(relations.rows, row => row.product_key);
    const records = identity.rows.map(product => {
      const record = {
        id: product.stable_key,
        mfr: product.manufacturer_name,
        mk: product.manufacturer_key,
        name: product.display_name,
        series: product.official_series_name,
      };
      for (const row of attrsByProduct.get(product.stable_key) ?? []) {
        const legacyKey = row.constraints_json.legacyKey;
        if (!legacyKey) throw new Error(`Attribute ${row.code} has no legacyKey`);
        record[legacyKey] = attributeValue(row);
      }
      const placements = mediaByProduct.get(product.stable_key) ?? [];
      if (!placements.length) throw new Error(`${product.stable_key} has no media placements`);
      record.img = placements[0].delivery_path;
      record.views = placements.map(row => ({ label: row.focal_point.legacyLabel, src: row.delivery_path }));
      record.relations = { ampIds: [] };
      const accessoryIds = (relationsByProduct.get(product.stable_key) ?? []).map(row => row.target_key);
      if (accessoryIds.length) record.relations.accessoryIds = accessoryIds;
      return record;
    });
    const projection = {
      schemaVersion: 1,
      slice: "la:k-series",
      importerVersion: run.rows[0].importer_version,
      sourceSha256: run.rows[0].source_sha256,
      evidenceSha256: run.rows[0].evidence_sha256,
      records,
      projectionSha256: sha256(stableJson(records)),
    };
    return projection;
  } finally {
    await client.end();
  }
}

function outputPathFromArgs(argv) {
  const index = argv.indexOf("--output");
  if (index < 0) return null;
  if (!argv[index + 1]) throw new Error("--output requires a path");
  const target = path.resolve(REPO_ROOT, argv[index + 1]);
  if (!target.startsWith(`${REPO_ROOT}${path.sep}`)) throw new Error("Output path escapes repository");
  return target;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const projection = await projectKSeries(databaseUrlFromArgs());
  const output = outputPathFromArgs(process.argv.slice(2));
  if (output) await writeFile(output, `${JSON.stringify(projection, null, 2)}\n`, "utf8");
  else console.log(JSON.stringify(projection, null, 2));
}
