import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

import { LA_K_SERIES } from "../../public/js/domains/speakers/data/la/k-series.data.js";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SOURCE_MODULE = "public/js/domains/speakers/data/la/k-series.data.js";
const SOURCE_MANIFEST = "raw-data/source-manifests/la.json";
const RUNTIME_MANIFEST = "config/runtime-media-manifest.json";
const IMPORTER_VERSION = 1;

const RAW_SPEC_BY_PRODUCT = Object.freeze({
  "spk-la-k1": "raw-data/raw-specs/la/speakers/k-series/k1/k1.md",
  "spk-la-k2": "raw-data/raw-specs/la/speakers/k-series/k2/k2.md",
  "spk-la-k3": "raw-data/raw-specs/la/speakers/k-series/k3/k3.md",
  "spk-la-k3i": "raw-data/raw-specs/la/speakers/k-series/k3i/k3i.md",
  "spk-la-kara-ii": "raw-data/raw-specs/la/speakers/k-series/kara-ii/kara-ii.md",
  "spk-la-kara-iii": "raw-data/raw-specs/la/speakers/k-series/kara-iii/kara-iii.md",
  "spk-la-kiva-ii": "raw-data/raw-specs/la/speakers/k-series/kiva-ii/kiva-ii.md",
  "spk-la-k1-sb": "raw-data/raw-specs/la/speakers/k-series/k1-sb/k1-sb.md",
});

const IDENTITY_KEYS = new Set(["id", "mfr", "mk", "name", "series", "img", "views", "relations"]);
const ATTRIBUTE_CONTRACT = Object.freeze({
  throwCat: { code: "speaker.throw-category", kind: "text" },
  type: { code: "speaker.type", kind: "text" },
  throw: { code: "speaker.throw-description", kind: "text" },
  lowInch: { code: "speaker.low-driver-inch", kind: "quantity", unit: "in" },
  lowQty: { code: "speaker.low-driver-quantity", kind: "number" },
  crossover: { code: "speaker.crossover", kind: "text" },
  cov: { code: "speaker.coverage", kind: "json" },
  spl: { code: "speaker.max-spl", kind: "quantity", unit: "db-spl" },
  cardioidCapability: { code: "speaker.cardioid-capability", kind: "enum" },
  weight: { code: "speaker.weight", kind: "quantity", unit: "kg" },
  transducers: { code: "speaker.transducers", kind: "text" },
  connectors: { code: "speaker.connectors", kind: "text" },
  ip: { code: "speaker.ip-rating", kind: "text" },
  dims: { code: "speaker.dimensions", kind: "text" },
  watt: { code: "speaker.power", kind: "quantity", unit: "w" },
});

function absolute(relativePath) {
  const resolved = path.resolve(REPO_ROOT, relativePath);
  if (!resolved.startsWith(`${REPO_ROOT}${path.sep}`)) throw new Error(`Path escapes repository: ${relativePath}`);
  return resolved;
}

export function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map(key => `${JSON.stringify(key)}:${stableJson(value[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function deterministicUuid(key) {
  const hex = sha256(`sound-systems-index:${key}`).slice(0, 32).split("");
  hex[12] = "5";
  hex[16] = ["8", "9", "a", "b"][Number.parseInt(hex[16], 16) % 4];
  return `${hex.slice(0, 8).join("")}-${hex.slice(8, 12).join("")}-${hex.slice(12, 16).join("")}-${hex.slice(16, 20).join("")}-${hex.slice(20).join("")}`;
}

function attributeContract(legacyKey, value) {
  const known = ATTRIBUTE_CONTRACT[legacyKey];
  if (known) return { legacyKey, ...known };
  const kebab = legacyKey.replaceAll(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  const kind =
    Array.isArray(value) || (value && typeof value === "object")
      ? "json"
      : typeof value === "boolean"
        ? "boolean"
        : typeof value === "number"
          ? "number"
          : "text";
  return { legacyKey, code: `speaker.${kebab}`, kind };
}

function mediaRole(label, index) {
  if (index === 0) return "primary";
  const normalized = label.toLowerCase();
  if (normalized.includes("rear") || normalized.includes("arriere")) return "rear";
  if (normalized.includes("side") || normalized.includes("horizontal")) return "side";
  if (normalized.includes("front") || normalized.includes("avant")) return "front";
  if (normalized.includes("perspective")) return "perspective";
  if (/\d+x|array|bump|chariot|stack/.test(normalized)) return "array";
  if (normalized.includes("detail")) return "detail";
  return "perspective";
}

function safeFilenamePart(value) {
  return value
    .normalize("NFKD")
    .replaceAll(/[^A-Za-z0-9]+/g, "_")
    .replaceAll(/^_+|_+$/g, "");
}

function downloadFilename(product, view, runtimePath) {
  const extension = path.extname(runtimePath).toLowerCase();
  return `L-Acoustics_${safeFilenamePart(product.name)}_${safeFilenamePart(view.label || "Product")}${extension}`;
}

async function fileFingerprint(relativePath) {
  const bytes = await readFile(absolute(relativePath));
  return { sha256: sha256(bytes), bytes: bytes.byteLength };
}

function sourceEntryByPath(entries, rawPath) {
  const entry = entries.find(candidate => candidate.path === rawPath);
  if (!entry) throw new Error(`Official source manifest is missing ${rawPath}`);
  return entry;
}

export async function buildKSeriesSlice() {
  const [sourceText, sourceManifestText, runtimeManifestText] = await Promise.all([
    readFile(absolute(SOURCE_MODULE), "utf8"),
    readFile(absolute(SOURCE_MANIFEST), "utf8"),
    readFile(absolute(RUNTIME_MANIFEST), "utf8"),
  ]);
  const sourceManifest = JSON.parse(sourceManifestText);
  const runtimeManifest = JSON.parse(runtimeManifestText);
  const sourceEntries = sourceManifest.files ?? sourceManifest.entries;
  if (!Array.isArray(sourceEntries)) throw new Error("L-Acoustics source manifest has no file list");

  const definitions = new Map();
  const sources = [];
  const products = [];
  const relations = [];
  const media = [];
  const assertions = [];
  const sourceHashes = [];

  for (const [productIndex, product] of LA_K_SERIES.entries()) {
    const rawSpecPath = RAW_SPEC_BY_PRODUCT[product.id];
    if (!rawSpecPath) throw new Error(`Raw spec mapping is missing for ${product.id}`);
    const rawSpec = await fileFingerprint(rawSpecPath);
    sourceHashes.push(`${rawSpecPath}:${rawSpec.sha256}`);
    const specSourceKey = `la:k-series:spec:${product.id}`;
    const locatorKey = `${specSourceKey}:record`;
    sources.push({
      stableKey: specSourceKey,
      title: `${product.name} canonical research record`,
      objectKey: rawSpecPath,
      sha256: rawSpec.sha256,
      byteSize: rawSpec.bytes,
      mimeType: "text/markdown",
      verification: "verified",
      productId: product.id,
      locator: { stableKey: locatorKey, section: "canonical product record" },
    });

    const attributes = [];
    for (const [legacyKey, value] of Object.entries(product)) {
      if (IDENTITY_KEYS.has(legacyKey)) continue;
      const contract = attributeContract(legacyKey, value);
      definitions.set(contract.code, contract);
      attributes.push({ ...contract, value });
      assertions.push({
        stableKey: `la:k-series:assertion:${product.id}:${contract.code}`,
        productId: product.id,
        fieldPath: `attributes.${contract.code}`,
        value,
        locatorKey,
      });
    }

    products.push({
      stableKey: product.id,
      displayName: product.name,
      modelCode: product.name,
      slug: product.id.replace(/^spk-la-/, ""),
      displayOrder: productIndex,
      attributes,
    });

    for (const [relationIndex, targetId] of (product.relations?.accessoryIds ?? []).entries()) {
      relations.push({
        stableKey: `compatible-accessory:${product.id}:${targetId}`,
        typeCode: "compatible_accessory",
        from: product.id,
        to: targetId,
        ordinal: relationIndex,
        locatorKey,
      });
    }

    const viewByPath = new Map(product.views.map(view => [view.src, view]));
    if (!viewByPath.has(product.img)) throw new Error(`${product.id} primary image is absent from views`);
    for (const [viewIndex, view] of product.views.entries()) {
      const runtimeRecord = runtimeManifest.records.find(record => record.runtimePath === view.src);
      if (!runtimeRecord?.source?.path || !runtimeRecord.output)
        throw new Error(`Runtime provenance is missing ${view.src}`);
      const rawEntry = sourceEntryByPath(sourceEntries, runtimeRecord.source.path);
      if (rawEntry.sha256 !== runtimeRecord.output.sha256) throw new Error(`Runtime/raw hash mismatch for ${view.src}`);
      const runtimeFingerprint = await fileFingerprint(view.src);
      if (runtimeFingerprint.sha256 !== rawEntry.sha256)
        throw new Error(`Public image is not the official original: ${view.src}`);
      const image = await sharp(absolute(view.src)).metadata();
      const sourceKey = `la:k-series:media-source:${sha256(runtimeRecord.source.path).slice(0, 24)}`;
      if (!sources.some(source => source.stableKey === sourceKey)) {
        sources.push({
          stableKey: sourceKey,
          title: path.basename(runtimeRecord.source.path),
          sourceUrl: rawEntry.sourceAsset,
          objectKey: runtimeRecord.source.path,
          sha256: rawEntry.sha256,
          byteSize: rawEntry.bytes,
          mimeType: rawEntry.mimeType,
          retrievedAt: rawEntry.retrievedAt,
          verification: "verified",
          productId: product.id,
        });
      }
      sourceHashes.push(`${runtimeRecord.source.path}:${rawEntry.sha256}`);
      media.push({
        stableKey: `la:k-series:media:${sha256(runtimeRecord.source.path).slice(0, 24)}`,
        productId: product.id,
        sourceKey,
        objectKey: runtimeRecord.source.path,
        deliveryPath: view.src,
        originalFilename: path.basename(runtimeRecord.source.path),
        downloadFilename: downloadFilename(product, view, view.src),
        sha256: rawEntry.sha256,
        byteSize: rawEntry.bytes,
        mimeType: rawEntry.mimeType,
        width: image.width,
        height: image.height,
        hasAlpha: Boolean(image.hasAlpha),
        role: mediaRole(view.label, viewIndex),
        ordinal: viewIndex,
        altText: `${product.name} — ${view.label}`,
        label: view.label,
      });
    }
  }

  const slice = {
    schemaVersion: 1,
    importerVersion: IMPORTER_VERSION,
    manufacturer: { stableKey: "la", displayName: "L-Acoustics" },
    family: { stableKey: "la:speaker", domain: "speaker", displayName: "Loudspeaker" },
    group: { stableKey: "la:k-series", displayName: "K Series", officialSeriesName: "K Series" },
    definitions: [...definitions.values()].sort((a, b) => a.code.localeCompare(b.code)),
    products,
    relationTargets: [...new Set(relations.map(relation => relation.to))].sort(),
    relations,
    sources: sources.sort((a, b) => a.stableKey.localeCompare(b.stableKey)),
    assertions,
    media,
  };
  const evidenceSha256 = sha256(sourceHashes.sort().join("\n"));
  return {
    ...slice,
    sourceModule: SOURCE_MODULE,
    sourceSha256: sha256(sourceText),
    evidenceSha256,
    logicalSha256: sha256(stableJson(slice)),
  };
}

export function legacyProjectionFromSlice(slice) {
  const mediaByProduct = Map.groupBy(slice.media, item => item.productId);
  const relationByProduct = Map.groupBy(slice.relations, item => item.from);
  return slice.products.map(product => {
    const record = {
      id: product.stableKey,
      mfr: slice.manufacturer.displayName,
      mk: slice.manufacturer.stableKey,
      name: product.displayName,
      series: slice.group.officialSeriesName,
    };
    for (const attribute of product.attributes) record[attribute.legacyKey] = attribute.value;
    const placements = [...(mediaByProduct.get(product.stableKey) ?? [])].sort((a, b) => a.ordinal - b.ordinal);
    record.img = placements[0].deliveryPath;
    record.views = placements.map(item => ({ label: item.label, src: item.deliveryPath }));
    const accessoryIds = (relationByProduct.get(product.stableKey) ?? []).map(item => item.to);
    record.relations = { ampIds: [] };
    if (accessoryIds.length) record.relations.accessoryIds = accessoryIds;
    return record;
  });
}

export function legacyKSeries() {
  return structuredClone(LA_K_SERIES);
}

export const K_SERIES_IMPORT_RUN_KEY = "la:k-series:v1";
export { IMPORTER_VERSION, REPO_ROOT };
