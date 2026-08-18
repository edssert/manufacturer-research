import { createCatalogClient, databaseUrlFromArgs, upsertReturningId } from "./lib/catalog-db.mjs";
import { pathToFileURL } from "node:url";
import {
  buildKSeriesSlice,
  deterministicUuid,
  IMPORTER_VERSION,
  K_SERIES_IMPORT_RUN_KEY,
} from "./lib/k-series-slice.mjs";

function json(value) {
  return JSON.stringify(value);
}

function attributeColumns(attribute) {
  const values = { text: null, number: null, boolean: null, json: null };
  if (attribute.value === null) return { ...values, semantics: "unknown" };
  if (attribute.kind === "text" || attribute.kind === "enum") values.text = attribute.value;
  else if (attribute.kind === "number" || attribute.kind === "quantity") values.number = attribute.value;
  else if (attribute.kind === "boolean") values.boolean = attribute.value;
  else values.json = attribute.value;
  return { ...values, semantics: "known" };
}

async function importSlice(client, slice) {
  const manufacturerId = await upsertReturningId(
    client,
    `INSERT INTO catalog.manufacturer (id, stable_key, display_name, lifecycle)
     VALUES ($1, $2, $3, 'current')
     ON CONFLICT (stable_key) DO UPDATE SET display_name = EXCLUDED.display_name, updated_at = now()
     RETURNING id`,
    [deterministicUuid("manufacturer:la"), slice.manufacturer.stableKey, slice.manufacturer.displayName],
  );
  const familyId = await upsertReturningId(
    client,
    `INSERT INTO catalog.product_family (id, stable_key, manufacturer_id, domain, display_name, schema_version)
     VALUES ($1, $2, $3, $4, $5, $6)
     ON CONFLICT (stable_key) DO UPDATE SET display_name = EXCLUDED.display_name, schema_version = EXCLUDED.schema_version, updated_at = now()
     RETURNING id`,
    [
      deterministicUuid("family:la:speaker"),
      slice.family.stableKey,
      manufacturerId,
      slice.family.domain,
      slice.family.displayName,
      slice.schemaVersion,
    ],
  );
  const groupId = await upsertReturningId(
    client,
    `INSERT INTO catalog.product_group (id, stable_key, manufacturer_id, family_id, display_name, official_series_name, display_order, lifecycle)
     VALUES ($1, $2, $3, $4, $5, $6, 0, 'current')
     ON CONFLICT (stable_key) DO UPDATE SET display_name = EXCLUDED.display_name, official_series_name = EXCLUDED.official_series_name, display_order = 0, updated_at = now()
     RETURNING id`,
    [
      deterministicUuid("group:la:k-series"),
      slice.group.stableKey,
      manufacturerId,
      familyId,
      slice.group.displayName,
      slice.group.officialSeriesName,
    ],
  );

  const accessoryFamilyId = await upsertReturningId(
    client,
    `INSERT INTO catalog.product_family (id, stable_key, manufacturer_id, domain, display_name, schema_version)
     VALUES ($1, 'la:accessory-reference', $2, 'accessory', 'Referenced accessory', 1)
     ON CONFLICT (stable_key) DO UPDATE SET updated_at = now()
     RETURNING id`,
    [deterministicUuid("family:la:accessory-reference"), manufacturerId],
  );
  const accessoryGroupId = await upsertReturningId(
    client,
    `INSERT INTO catalog.product_group (id, stable_key, manufacturer_id, family_id, display_name, official_series_name, display_order, lifecycle)
     VALUES ($1, 'la:accessory-reference', $2, $3, 'Referenced accessories', NULL, 9999, 'current')
     ON CONFLICT (stable_key) DO UPDATE SET updated_at = now()
     RETURNING id`,
    [deterministicUuid("group:la:accessory-reference"), manufacturerId, accessoryFamilyId],
  );

  const productIds = new Map();
  for (const product of slice.products) {
    const id = await upsertReturningId(
      client,
      `INSERT INTO catalog.product (id, stable_key, manufacturer_id, family_id, group_id, display_name, model_code, slug, display_order, lifecycle, verification)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'current', 'verified')
       ON CONFLICT (stable_key) DO UPDATE SET display_name = EXCLUDED.display_name, model_code = EXCLUDED.model_code, slug = EXCLUDED.slug, group_id = EXCLUDED.group_id, display_order = EXCLUDED.display_order, verification = 'verified', updated_at = now()
       RETURNING id`,
      [
        deterministicUuid(`product:${product.stableKey}`),
        product.stableKey,
        manufacturerId,
        familyId,
        groupId,
        product.displayName,
        product.modelCode,
        product.slug,
        product.displayOrder,
      ],
    );
    productIds.set(product.stableKey, id);
  }
  for (const stableKey of slice.relationTargets) {
    const label = stableKey.replace(/^acc-la-/, "").toUpperCase();
    const id = await upsertReturningId(
      client,
      `INSERT INTO catalog.product (id, stable_key, manufacturer_id, family_id, group_id, display_name, model_code, slug, lifecycle, verification)
       VALUES ($1, $2, $3, $4, $5, $6, $6, $7, 'current', 'pending')
       ON CONFLICT (stable_key) DO UPDATE SET updated_at = now()
       RETURNING id`,
      [
        deterministicUuid(`product:${stableKey}`),
        stableKey,
        manufacturerId,
        accessoryFamilyId,
        accessoryGroupId,
        label,
        stableKey.replace(/^acc-la-/, ""),
      ],
    );
    productIds.set(stableKey, id);
  }

  const sliceProductIds = slice.products.map(product => productIds.get(product.stableKey));
  await client.query(
    "DELETE FROM catalog.product_relation WHERE from_product_id = ANY($1::uuid[]) AND type_code = 'compatible_accessory'",
    [sliceProductIds],
  );
  await client.query("DELETE FROM catalog.assertion WHERE product_id = ANY($1::uuid[])", [sliceProductIds]);
  await client.query("DELETE FROM catalog.media_placement WHERE product_id = ANY($1::uuid[])", [sliceProductIds]);
  await client.query("DELETE FROM catalog.media_asset WHERE stable_key LIKE 'la:k-series:media:%'");
  await client.query("DELETE FROM catalog.product_attribute WHERE product_id = ANY($1::uuid[])", [sliceProductIds]);
  await client.query("DELETE FROM catalog.source_document WHERE stable_key LIKE 'la:k-series:%'");

  for (const unit of [
    ["in", "in", "length", 0.0254],
    ["db-spl", "dB SPL", "sound_pressure_level", 1],
    ["kg", "kg", "mass", 1],
    ["w", "W", "power", 1],
  ]) {
    await client.query(
      `INSERT INTO catalog.unit (code, symbol, dimension, factor_to_base) VALUES ($1, $2, $3, $4)
       ON CONFLICT (code) DO UPDATE SET symbol = EXCLUDED.symbol, dimension = EXCLUDED.dimension, factor_to_base = EXCLUDED.factor_to_base`,
      unit,
    );
  }

  const definitionIds = new Map();
  for (const definition of slice.definitions) {
    const id = await upsertReturningId(
      client,
      `INSERT INTO catalog.attribute_definition
         (id, code, label, value_kind, canonical_unit_code, cardinality, constraints_json, searchable, facetable, sortable, comparable)
       VALUES ($1, $2, $3, $4::catalog.value_kind, $5, 'one', $6::jsonb, $7, $8, $9, $9)
       ON CONFLICT (code) DO UPDATE SET label = EXCLUDED.label, value_kind = EXCLUDED.value_kind, canonical_unit_code = EXCLUDED.canonical_unit_code, constraints_json = EXCLUDED.constraints_json
       RETURNING id`,
      [
        deterministicUuid(`attribute-definition:${definition.code}`),
        definition.code,
        definition.legacyKey,
        definition.kind,
        definition.unit ?? null,
        json({ legacyKey: definition.legacyKey }),
        ["speaker.type", "speaker.throw-category"].includes(definition.code),
        ["speaker.type", "speaker.throw-category", "speaker.cardioid-capability"].includes(definition.code),
        ["speaker.max-spl", "speaker.weight", "speaker.low-driver-inch", "speaker.power"].includes(definition.code),
      ],
    );
    definitionIds.set(definition.code, id);
  }

  const sourceIds = new Map();
  const locatorIds = new Map();
  for (const source of slice.sources) {
    const id = await upsertReturningId(
      client,
      `INSERT INTO catalog.source_document
         (id, stable_key, title, source_url, object_key, sha256, byte_size, mime_type, retrieved_at, verification, metadata)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10::catalog.verification_status, $11::jsonb)
       ON CONFLICT (stable_key) DO UPDATE SET title = EXCLUDED.title, source_url = EXCLUDED.source_url, object_key = EXCLUDED.object_key, sha256 = EXCLUDED.sha256, byte_size = EXCLUDED.byte_size, mime_type = EXCLUDED.mime_type, retrieved_at = EXCLUDED.retrieved_at, verification = EXCLUDED.verification, metadata = EXCLUDED.metadata
       RETURNING id`,
      [
        deterministicUuid(`source:${source.stableKey}`),
        source.stableKey,
        source.title,
        source.sourceUrl ?? null,
        source.objectKey ?? null,
        source.sha256,
        source.byteSize,
        source.mimeType,
        source.retrievedAt ?? null,
        source.verification,
        json({ productId: source.productId }),
      ],
    );
    sourceIds.set(source.stableKey, id);
    if (source.locator) {
      const locatorId = deterministicUuid(`locator:${source.locator.stableKey}`);
      await client.query(
        `INSERT INTO catalog.source_locator (id, source_id, section)
         VALUES ($1, $2, $3)
         ON CONFLICT (id) DO UPDATE SET source_id = EXCLUDED.source_id, section = EXCLUDED.section`,
        [locatorId, id, source.locator.section],
      );
      locatorIds.set(source.locator.stableKey, locatorId);
    }
  }

  for (const product of slice.products) {
    for (const attribute of product.attributes) {
      const columns = attributeColumns(attribute);
      await client.query(
        `INSERT INTO catalog.product_attribute
           (id, product_id, definition_id, ordinal, semantics, text_value, number_value, boolean_value, json_value, unit_code, original_text)
         VALUES ($1, $2, $3, 0, $4::catalog.null_semantics, $5, $6, $7, $8::jsonb, $9, $10)
         ON CONFLICT (product_id, definition_id, ordinal) DO UPDATE SET semantics = EXCLUDED.semantics, text_value = EXCLUDED.text_value, number_value = EXCLUDED.number_value, boolean_value = EXCLUDED.boolean_value, json_value = EXCLUDED.json_value, unit_code = EXCLUDED.unit_code, original_text = EXCLUDED.original_text, updated_at = now()`,
        [
          deterministicUuid(`attribute:${product.stableKey}:${attribute.code}`),
          productIds.get(product.stableKey),
          definitionIds.get(attribute.code),
          columns.semantics,
          columns.text,
          columns.number,
          columns.boolean,
          columns.json === null ? null : json(columns.json),
          attribute.unit ?? null,
          typeof attribute.value === "string" ? attribute.value : json(attribute.value),
        ],
      );
    }
  }

  for (const assertion of slice.assertions) {
    const assertionId = deterministicUuid(`assertion:${assertion.stableKey}`);
    await client.query(
      `INSERT INTO catalog.assertion (id, product_id, field_path, asserted_value, status)
       VALUES ($1, $2, $3, $4::jsonb, 'verified')
       ON CONFLICT (id) DO UPDATE SET product_id = EXCLUDED.product_id, field_path = EXCLUDED.field_path, asserted_value = EXCLUDED.asserted_value, status = 'verified'`,
      [assertionId, productIds.get(assertion.productId), assertion.fieldPath, json(assertion.value)],
    );
    await client.query(
      `INSERT INTO catalog.assertion_evidence (assertion_id, locator_id, evidence_order)
       VALUES ($1, $2, 0) ON CONFLICT (assertion_id, locator_id) DO UPDATE SET evidence_order = 0`,
      [assertionId, locatorIds.get(assertion.locatorKey)],
    );
  }

  await client.query(
    `INSERT INTO catalog.relation_type (code, directed, inverse_code, requires_evidence)
     VALUES ('compatible_accessory', true, NULL, true)
     ON CONFLICT (code) DO UPDATE SET directed = true, requires_evidence = true`,
  );
  for (const relation of slice.relations) {
    const relationId = deterministicUuid(`relation:${relation.stableKey}`);
    await client.query(
      `INSERT INTO catalog.product_relation (id, type_code, from_product_id, to_product_id, status, metadata)
       VALUES ($1, $2, $3, $4, 'verified', $5::jsonb)
       ON CONFLICT (type_code, from_product_id, to_product_id) DO UPDATE SET status = 'verified', metadata = EXCLUDED.metadata
       RETURNING id`,
      [
        relationId,
        relation.typeCode,
        productIds.get(relation.from),
        productIds.get(relation.to),
        json({ legacyOrder: relation.ordinal }),
      ],
    );
    await client.query(
      `INSERT INTO catalog.relation_evidence (relation_id, locator_id)
       VALUES ($1, $2) ON CONFLICT (relation_id, locator_id) DO NOTHING`,
      [relationId, locatorIds.get(relation.locatorKey)],
    );
  }

  for (const item of slice.media) {
    const mediaId = await upsertReturningId(
      client,
      `INSERT INTO catalog.media_asset
         (id, stable_key, object_key, original_filename, sha256, byte_size, mime_type, width, height, has_alpha, background_policy, rights_status, source_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'official-original', 'manufacturer-provided', $11)
       ON CONFLICT (stable_key) DO UPDATE SET object_key = EXCLUDED.object_key, original_filename = EXCLUDED.original_filename, sha256 = EXCLUDED.sha256, byte_size = EXCLUDED.byte_size, mime_type = EXCLUDED.mime_type, width = EXCLUDED.width, height = EXCLUDED.height, has_alpha = EXCLUDED.has_alpha, source_id = EXCLUDED.source_id
       RETURNING id`,
      [
        deterministicUuid(`media:${item.stableKey}`),
        item.stableKey,
        item.objectKey,
        item.originalFilename,
        item.sha256,
        item.byteSize,
        item.mimeType,
        item.width,
        item.height,
        item.hasAlpha,
        sourceIds.get(item.sourceKey),
      ],
    );
    await client.query(
      `INSERT INTO catalog.media_placement
         (id, product_id, media_id, role, ordinal, alt_text, download_filename, delivery_path, focal_point, is_downloadable)
       VALUES ($1, $2, $3, $4::catalog.media_role, $5, $6, $7, $8, $9::jsonb, true)
       ON CONFLICT (product_id, role, ordinal) DO UPDATE SET media_id = EXCLUDED.media_id, alt_text = EXCLUDED.alt_text, download_filename = EXCLUDED.download_filename, delivery_path = EXCLUDED.delivery_path, focal_point = EXCLUDED.focal_point, is_downloadable = true`,
      [
        deterministicUuid(`placement:${item.productId}:${item.ordinal}`),
        productIds.get(item.productId),
        mediaId,
        item.role,
        item.ordinal,
        item.altText,
        item.downloadFilename,
        item.deliveryPath,
        json({ legacyLabel: item.label }),
      ],
    );
  }

  const result = {
    products: slice.products.length,
    attributes: slice.products.reduce((sum, product) => sum + product.attributes.length, 0),
    relations: slice.relations.length,
    media: slice.media.length,
    sources: slice.sources.length,
    assertions: slice.assertions.length,
    logicalSha256: slice.logicalSha256,
  };
  await client.query(
    `INSERT INTO catalog.import_run
       (id, stable_key, importer_version, source_sha256, evidence_sha256, status, result_json, started_at, completed_at)
     VALUES ($1, $2, $3, $4, $5, 'completed', $6::jsonb, now(), now())
     ON CONFLICT (stable_key) DO UPDATE SET importer_version = EXCLUDED.importer_version, source_sha256 = EXCLUDED.source_sha256, evidence_sha256 = EXCLUDED.evidence_sha256, status = 'completed', result_json = EXCLUDED.result_json, started_at = now(), completed_at = now()`,
    [
      deterministicUuid(`import-run:${K_SERIES_IMPORT_RUN_KEY}`),
      K_SERIES_IMPORT_RUN_KEY,
      IMPORTER_VERSION,
      slice.sourceSha256,
      slice.evidenceSha256,
      json(result),
    ],
  );
  return result;
}

export async function runKSeriesImport(connectionString) {
  const slice = await buildKSeriesSlice();
  const client = createCatalogClient(connectionString);
  await client.connect();
  try {
    await client.query("BEGIN");
    const result = await importSlice(client, slice);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    await client.end();
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = await runKSeriesImport(databaseUrlFromArgs());
  console.log(JSON.stringify(result, null, 2));
}
