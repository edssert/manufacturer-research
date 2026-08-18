import { createHash } from "node:crypto";
import { copyFile, lstat, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, extname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DATA_ROOT = resolve(PROJECT_ROOT, "public", "js", "domains", "speakers", "data");
const PUBLIC_ROOT = resolve(PROJECT_ROOT, "public", "assets", "img", "speakers");
const RAW_ROOTS = [resolve(PROJECT_ROOT, "raw-data", "raw-assets"), resolve(PROJECT_ROOT, "raw-data", "official-docs")];
const SOURCE_MANIFEST_ROOT = resolve(PROJECT_ROOT, "raw-data", "source-manifests");
const MANIFEST_PATH = resolve(PROJECT_ROOT, "config", "runtime-media-manifest.json");
const OVERRIDES_PATH = resolve(PROJECT_ROOT, "config", "runtime-media-overrides.json");
const MEDIA_SOURCES_PATH = resolve(PROJECT_ROOT, "config", "media-sources.json");
const LA_X_MEDIA_AUDIT_PATH = resolve(PROJECT_ROOT, "raw-data", "catalog-inventory", "la-x-series-media-audit.json");
const LA_A_K_MEDIA_AUDIT_PATH = resolve(
  PROJECT_ROOT,
  "raw-data",
  "catalog-inventory",
  "la-a-k-series-media-audit.json",
);
const SUPPORTED_BRANDS = [
  "ad",
  "co",
  "db",
  "nexo",
  "martin",
  "jbl",
  "my",
  "pk",
  "eaw",
  "coda",
  "funktion",
  "ev",
  "rcf",
  "la",
];
const DEFAULT_TARGET_BRANDS = [...SUPPORTED_BRANDS];
const IMAGE_EXTENSIONS = new Set([".avif", ".jpeg", ".jpg", ".png", ".webp"]);
const REFERENCE_PATTERN =
  /public\/assets\/img\/speakers\/([a-z0-9-]+)\/[A-Za-z0-9_./+@%() -]+?\.(?:avif|jpe?g|png|webp)/gi;
const POLICY = Object.freeze({
  interactiveImageSurface: "official-original-bytes",
  browserImageSource: "public-byte-identical-copy-of-raw",
  preserveOriginalFormat: true,
  preserveOriginalDimensions: true,
  preserveOriginalMetadata: true,
  transformsAllowed: false,
  derivedInteractiveSourcesAllowed: false,
  applyRequiresReviewedDryRun: true,
});
const PUBLIC_PATH_OVERRIDES = new Map([
  [
    "raw-data/raw-assets/la/speakers/x-series/x15-hiq/X15 HiQ/L_Acoustics_X15HiQ.jpg",
    "public/assets/img/speakers/la/official/x-series/x15-hiq/L-Acoustics_X15HiQ_Front_Black.jpg",
  ],
]);

function toPosix(path) {
  return path.split(sep).join("/");
}

function compareText(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

export function isWithin(parent, child) {
  const delta = relative(parent, child);
  return delta === "" || (delta !== ".." && !delta.startsWith(`..${sep}`) && !isAbsolute(delta));
}

async function assertNoSymlink(root, target) {
  if (!isWithin(root, target)) throw new Error(`경로가 허용된 루트를 벗어납니다: ${target}`);
  const delta = relative(root, target);
  let cursor = root;
  for (const part of delta.split(sep).filter(Boolean)) {
    cursor = resolve(cursor, part);
    try {
      if ((await lstat(cursor)).isSymbolicLink()) throw new Error(`심볼릭 링크는 허용되지 않습니다: ${cursor}`);
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
      break;
    }
  }
}

export async function resolveSafe(root, projectRelativePath) {
  if (typeof projectRelativePath !== "string" || !projectRelativePath || isAbsolute(projectRelativePath)) {
    throw new Error(`상대 경로가 필요합니다: ${projectRelativePath}`);
  }
  const target = resolve(PROJECT_ROOT, projectRelativePath);
  await assertNoSymlink(root, target);
  return target;
}

async function listFiles(root, extensions = null) {
  const files = [];
  async function visit(directory) {
    let entries;
    try {
      entries = await readdir(directory, { withFileTypes: true });
    } catch (error) {
      if (error?.code === "ENOENT") return;
      throw error;
    }
    entries.sort((a, b) => compareText(a.name, b.name));
    for (const entry of entries) {
      const path = resolve(directory, entry.name);
      if (entry.isSymbolicLink()) throw new Error(`심볼릭 링크는 허용되지 않습니다: ${path}`);
      if (entry.isDirectory()) await visit(path);
      else if (entry.isFile() && (!extensions || extensions.has(extname(entry.name).toLowerCase()))) files.push(path);
    }
  }
  await visit(root);
  return files;
}

async function readJson(path, fallback = null) {
  try {
    return JSON.parse((await readFile(path, "utf8")).replace(/^\uFEFF/, ""));
  } catch (error) {
    if (fallback !== null && error?.code === "ENOENT") return fallback;
    throw error;
  }
}

async function sha256File(path) {
  const bytes = await readFile(path);
  return { sha256: createHash("sha256").update(bytes).digest("hex"), bytes: bytes.length };
}

async function inspectImage(path) {
  const metadata = await sharp(path, { failOn: "error", limitInputPixels: false }).metadata();
  if (!metadata.width || !metadata.height) throw new Error(`이미지 치수를 읽을 수 없습니다: ${path}`);
  return {
    dimensions: /** @type {[number, number]} */ ([metadata.width, metadata.height]),
    hasAlpha: Boolean(metadata.hasAlpha),
    format: metadata.format,
    orientation: metadata.orientation ?? null,
    space: metadata.space ?? null,
  };
}

async function collectReferences(targetBrands) {
  const sources = await listFiles(DATA_ROOT, new Set([".js"]));
  const references = new Map();
  for (const sourceFile of sources) {
    const content = await readFile(sourceFile, "utf8");
    for (const match of content.matchAll(REFERENCE_PATTERN)) {
      const brand = match[1].toLowerCase();
      if (!targetBrands.includes(brand)) continue;
      const assetPath = match[0].replaceAll("\\", "/");
      if (!references.has(assetPath)) references.set(assetPath, new Set());
      references.get(assetPath).add(toPosix(relative(PROJECT_ROOT, sourceFile)));
    }
  }
  return references;
}

function addSourcePath(index, sourcePath) {
  if (typeof sourcePath !== "string" || !IMAGE_EXTENSIONS.has(extname(sourcePath).toLowerCase())) return;
  const absolute = resolve(PROJECT_ROOT, sourcePath);
  if (!RAW_ROOTS.some(root => isWithin(root, absolute))) return;
  index.add(sourcePath.replaceAll("\\", "/"));
}

async function trustedRawIndex() {
  const trustedPaths = new Set();
  for (const manifestPath of await listFiles(SOURCE_MANIFEST_ROOT, new Set([".json"]))) {
    const manifest = await readJson(manifestPath);
    for (const file of manifest.files ?? []) addSourcePath(trustedPaths, file.path);
  }
  const overrides = await readJson(OVERRIDES_PATH, { maskedDerivatives: [] });
  for (const record of overrides.maskedDerivatives ?? []) addSourcePath(trustedPaths, record.sourcePath);
  const mediaSources = await readJson(MEDIA_SOURCES_PATH, { assets: [] });
  for (const record of mediaSources.assets ?? []) addSourcePath(trustedPaths, record.originalPath);

  const byHash = new Map();
  const byPath = new Map();
  for (const sourcePath of [...trustedPaths].sort(compareText)) {
    const absolute = await resolveSafe(PROJECT_ROOT, sourcePath);
    const hashed = await sha256File(absolute);
    const source = { path: sourcePath, ...hashed };
    byPath.set(sourcePath, source);
    if (!byHash.has(hashed.sha256)) byHash.set(hashed.sha256, []);
    byHash.get(hashed.sha256).push(source);
  }
  return { byHash, byPath };
}

function legacySourceMap(manifest) {
  const byOutput = new Map();
  if (manifest?.schemaVersion !== 1) return byOutput;
  for (const record of manifest.records ?? []) {
    if (record.source?.verifiedRawCopy) byOutput.set(record.output.path, record);
  }
  return byOutput;
}

async function overrideSourceMap() {
  const overrides = await readJson(OVERRIDES_PATH, { maskedDerivatives: [] });
  const byOutput = new Map();
  for (const record of overrides.maskedDerivatives ?? []) {
    for (const outputPath of record.outputPaths ?? []) {
      byOutput.set(outputPath, {
        sourcePath: record.sourcePath,
        originalRuntimePath: outputPath,
        outputSha256: record.outputSha256,
        transform: record.transform,
      });
    }
  }
  return byOutput;
}

function originalRuntimePath(runtimePath, sourcePath) {
  const sourceExtension = extname(sourcePath).toLowerCase();
  if (runtimePath.toLowerCase().endsWith(".runtime.webp")) {
    return `${runtimePath.slice(0, -".runtime.webp".length)}${sourceExtension}`;
  }
  const runtimeExtension = extname(runtimePath);
  return runtimeExtension.toLowerCase() === sourceExtension
    ? runtimePath
    : `${runtimePath.slice(0, -runtimeExtension.length)}${sourceExtension}`;
}

async function buildPlan(targetBrands) {
  const references = await collectReferences(targetBrands);
  const trusted = await trustedRawIndex();
  const previousManifest = await readJson(MANIFEST_PATH, {});
  const legacyByOutput = legacySourceMap(previousManifest);
  const overrideByOutput = await overrideSourceMap();
  const records = [];
  const unresolved = [];

  for (const [runtimePath, referencedBySet] of [...references.entries()].sort(([a], [b]) => compareText(a, b))) {
    const brand = runtimePath.split("/")[4];
    const runtimeAbsolute = await resolveSafe(resolve(PUBLIC_ROOT, brand), runtimePath);
    const runtimeHash = await sha256File(runtimeAbsolute);
    const directSource = trusted.byHash.get(runtimeHash.sha256)?.[0];
    const legacy = legacyByOutput.get(runtimePath);
    const override = overrideByOutput.get(runtimePath);
    const linkedPath = legacy?.source?.path ?? override?.sourcePath;
    const linkedSource = linkedPath ? trusted.byPath.get(linkedPath) : null;
    const source = directSource ?? linkedSource;
    if (!source) {
      unresolved.push(runtimePath);
      continue;
    }

    const sourceAbsolute = await resolveSafe(PROJECT_ROOT, source.path);
    const [sourceImage, runtimeImage] = await Promise.all([
      inspectImage(sourceAbsolute),
      inspectImage(runtimeAbsolute),
    ]);
    const outputPath =
      PUBLIC_PATH_OVERRIDES.get(source.path) ??
      (directSource
        ? runtimePath
        : (legacy?.runtimePath ?? override?.originalRuntimePath ?? originalRuntimePath(runtimePath, source.path)));
    if (override && runtimeHash.sha256 !== override.outputSha256) {
      throw new Error(`문서화된 로컬 마스크 해시가 다릅니다: ${runtimePath}`);
    }
    const action = override
      ? "preserve-documented-mask"
      : outputPath === runtimePath && source.sha256 === runtimeHash.sha256
        ? "preserve-original"
        : "restore-original";
    records.push({
      brand,
      runtimePath,
      action,
      reason:
        action === "preserve-documented-mask"
          ? "reviewed-content-removal-with-pixel-bounds"
          : action === "preserve-original"
            ? "already-byte-identical-to-raw"
            : "replace-derived-interactive-source",
      source: { ...source, ...sourceImage, verifiedRawCopy: true },
      runtimeBefore: { path: runtimePath, ...runtimeHash, ...runtimeImage },
      output: override
        ? { path: outputPath, ...runtimeHash, ...runtimeImage }
        : { path: outputPath, sha256: source.sha256, bytes: source.bytes, ...sourceImage },
      transform: override
        ? { ...override.transform, type: "documented-local-mask", operation: override.transform.type }
        : { type: "none", operation: action === "preserve-original" ? "none" : "byte-for-byte-copy" },
      retiredPath: outputPath === runtimePath ? null : runtimePath,
      referencedBy: [...referencedBySet].sort(compareText),
    });
  }

  if (unresolved.length) {
    throw new Error(
      `공식 raw 원본과 연결되지 않은 제품 이미지가 ${unresolved.length}개입니다:\n${unresolved.map(path => `- ${path}`).join("\n")}`,
    );
  }

  const outputs = new Map();
  for (const record of records) {
    const existing = outputs.get(record.output.path);
    if (existing && existing !== record.source.sha256) {
      throw new Error(`서로 다른 원본이 같은 public 경로를 요구합니다: ${record.output.path}`);
    }
    outputs.set(record.output.path, record.source.sha256);
  }
  return records;
}

function manifestPayload(mode, records, targetBrands) {
  const inputBytes = records.reduce((sum, record) => sum + record.runtimeBefore.bytes, 0);
  const outputBytes = records.reduce((sum, record) => sum + record.output.bytes, 0);
  return {
    schemaVersion: 2,
    mode,
    roots: {
      raw: RAW_ROOTS.map(path => toPosix(relative(PROJECT_ROOT, path))),
      runtime: toPosix(relative(PROJECT_ROOT, PUBLIC_ROOT)),
    },
    supportedBrands: [...SUPPORTED_BRANDS],
    targetBrands: [...targetBrands],
    policy: POLICY,
    totals: {
      records: records.length,
      restoredOriginals: records.filter(record => record.action === "restore-original").length,
      preservedOriginals: records.filter(record => record.action === "preserve-original").length,
      retiredDerivatives: records.filter(record => record.retiredPath).length,
      inputBytes,
      outputBytes,
      byteDelta: outputBytes - inputBytes,
    },
    records,
  };
}

async function writeJson(path, payload) {
  await assertNoSymlink(PROJECT_ROOT, path);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

async function copyOriginal(sourcePath, outputPath) {
  await mkdir(dirname(outputPath), { recursive: true });
  await copyFile(sourcePath, outputPath);
}

async function syncMediaAuditContracts(records) {
  const recordByOldPath = new Map(records.map(record => [record.runtimePath, record]));
  const recordBySourcePath = new Map(records.map(record => [record.source.path, record]));
  const mapPath = path => recordByOldPath.get(path)?.output.path ?? path;

  const mediaSources = await readJson(MEDIA_SOURCES_PATH, { assets: [] });
  for (const asset of mediaSources.assets ?? []) {
    const record = recordBySourcePath.get(asset.originalPath);
    if (!record) continue;
    asset.runtimePath = record.output.path;
    asset.sha256 = record.output.sha256;
    asset.bytes = record.output.bytes;
    asset.dimensions = record.output.dimensions;
  }
  await writeJson(MEDIA_SOURCES_PATH, mediaSources);

  const xAudit = await readJson(LA_X_MEDIA_AUDIT_PATH, { products: [] });
  for (const product of xAudit.products ?? []) {
    product.recommendedPrimary = mapPath(product.recommendedPrimary);
    product.recommendedViewOrder = (product.recommendedViewOrder ?? []).map(mapPath);
  }
  await writeJson(LA_X_MEDIA_AUDIT_PATH, xAudit);

  const akAudit = await readJson(LA_A_K_MEDIA_AUDIT_PATH, { products: [] });
  for (const product of akAudit.products ?? []) {
    const recommendation = product.recommendation;
    if (!recommendation) continue;
    const previousRecommendedPath = recommendation.recommendedPrimary?.path;
    const record = recordByOldPath.get(previousRecommendedPath);
    if (record) {
      recommendation.recommendedPrimary = {
        path: record.output.path,
        sha256: record.output.sha256,
        bytes: record.output.bytes,
        dimensions: record.output.dimensions,
        format: record.output.format,
        hasAlpha: record.output.hasAlpha,
        runtimeManifest: {
          connected: true,
          schemaVersion: 2,
          action: record.action,
          reason: record.reason,
          outputHashMatchesManifest: true,
          source: record.source,
          transform: record.transform,
        },
      };
    }
    if (recommendation.oldToNew?.new) recommendation.oldToNew.new = mapPath(recommendation.oldToNew.new);
    for (const view of recommendation.recommendedViewOrder ?? []) view.path = mapPath(view.path);
  }
  await writeJson(LA_A_K_MEDIA_AUDIT_PATH, akAudit);
}

async function applyPlan(approvedPath) {
  const approved = await readJson(approvedPath);
  let current = manifestPayload("dry-run", await buildPlan(approved.targetBrands), approved.targetBrands);
  if (JSON.stringify(approved) !== JSON.stringify(current)) {
    const references = await collectReferences(approved.targetBrands);
    const approvedOutputs = new Set(approved.records.map(record => record.output.path));
    const isInterruptedApply = [...references.keys()].every(reference => approvedOutputs.has(reference));
    if (!isInterruptedApply) {
      throw new Error("승인된 dry-run 이후 참조 또는 이미지가 바뀌었습니다. dry-run부터 다시 실행하세요.");
    }
    current = approved;
  }

  for (const record of current.records.filter(item => item.action === "restore-original")) {
    const sourcePath = await resolveSafe(PROJECT_ROOT, record.source.path);
    const outputPath = await resolveSafe(resolve(PUBLIC_ROOT, record.brand), record.output.path);
    await copyOriginal(sourcePath, outputPath);
    const outputHash = await sha256File(outputPath);
    if (outputHash.sha256 !== record.source.sha256 || outputHash.bytes !== record.source.bytes) {
      throw new Error(`원본 바이트 복사 검증 실패: ${record.output.path}`);
    }
  }

  const pathMap = new Map(
    current.records
      .filter(item => item.runtimePath !== item.output.path)
      .map(item => [item.runtimePath, item.output.path]),
  );
  for (const dataFile of await listFiles(DATA_ROOT, new Set([".js"]))) {
    const before = await readFile(dataFile, "utf8");
    let after = before;
    for (const [oldPath, newPath] of pathMap) after = after.replaceAll(oldPath, newPath);
    if (after !== before) await writeFile(dataFile, after, "utf8");
  }
  await syncMediaAuditContracts(current.records);

  const referencesAfter = await collectReferences(current.targetBrands);
  for (const record of current.records.filter(item => item.retiredPath)) {
    if (referencesAfter.has(record.retiredPath)) throw new Error(`파생본 참조가 남아 있습니다: ${record.retiredPath}`);
    const retired = await resolveSafe(resolve(PUBLIC_ROOT, record.brand), record.retiredPath);
    let retiredHash;
    try {
      retiredHash = await sha256File(retired);
    } catch (error) {
      if (error?.code === "ENOENT") continue;
      throw error;
    }
    if (retiredHash.sha256 !== record.runtimeBefore.sha256)
      throw new Error(`retired 파일 해시 변경: ${record.retiredPath}`);
    await rm(retired, { force: true, maxRetries: 8, retryDelay: 250 });
  }

  current.mode = "applied";
  await writeJson(MANIFEST_PATH, current);
  return current;
}

export async function verifyManifest() {
  const manifest = await readJson(MANIFEST_PATH);
  if (manifest.schemaVersion !== 2 || manifest.mode !== "applied") {
    throw new Error("원본 표면 계약이 적용된 runtime media manifest가 아닙니다.");
  }
  const references = await collectReferences(manifest.targetBrands);
  const byOutput = new Map(manifest.records.map(record => [record.output.path, record]));
  for (const reference of references.keys()) {
    if (!byOutput.has(reference)) throw new Error(`manifest에 없는 runtime 참조: ${reference}`);
    if (reference.toLowerCase().endsWith(".runtime.webp"))
      throw new Error(`파생본이 img src에 남아 있습니다: ${reference}`);
  }
  for (const record of manifest.records) {
    const sourcePath = await resolveSafe(PROJECT_ROOT, record.source.path);
    const outputPath = await resolveSafe(resolve(PUBLIC_ROOT, record.brand), record.output.path);
    const [sourceHash, outputHash, sourceImage, outputImage] = await Promise.all([
      sha256File(sourcePath),
      sha256File(outputPath),
      inspectImage(sourcePath),
      inspectImage(outputPath),
    ]);
    if (sourceHash.sha256 !== record.source.sha256 || outputHash.sha256 !== record.output.sha256) {
      throw new Error(`해시 검증 실패: ${record.output.path}`);
    }
    const documentedMask = record.transform.type === "documented-local-mask";
    if (!documentedMask && (sourceHash.sha256 !== outputHash.sha256 || sourceHash.bytes !== outputHash.bytes)) {
      throw new Error(`public img src가 raw 원본과 byte-identical하지 않습니다: ${record.output.path}`);
    }
    if (
      JSON.stringify(sourceImage.dimensions) !== JSON.stringify(outputImage.dimensions) ||
      sourceImage.format !== outputImage.format ||
      sourceImage.hasAlpha !== outputImage.hasAlpha
    ) {
      throw new Error(`원본 이미지 형식/치수 불변식 위반: ${record.output.path}`);
    }
  }
  return manifest;
}

function parseArguments(argv) {
  const command = argv[0] ?? "dry-run";
  if (!["dry-run", "apply", "verify"].includes(command)) throw new Error(`지원하지 않는 명령: ${command}`);
  let manifest = command === "dry-run" ? resolve(PROJECT_ROOT, "tmp", "runtime-media-plan.json") : MANIFEST_PATH;
  let approved = null;
  let targetBrands = [...DEFAULT_TARGET_BRANDS];
  for (let index = 1; index < argv.length; index++) {
    const argument = argv[index];
    if (argument === "--manifest") manifest = resolve(PROJECT_ROOT, argv[++index]);
    else if (argument === "--approved-manifest") approved = resolve(PROJECT_ROOT, argv[++index]);
    else if (argument === "--brands") {
      targetBrands = argv[++index]
        .split(",")
        .map(value => value.trim().toLowerCase())
        .filter(Boolean);
      const invalid = targetBrands.filter(brand => !SUPPORTED_BRANDS.includes(brand));
      if (invalid.length) throw new Error(`지원하지 않는 브랜드: ${invalid.join(", ")}`);
    } else throw new Error(`알 수 없는 인자: ${argument}`);
  }
  if (command === "apply" && !approved) throw new Error("apply에는 --approved-manifest가 필요합니다.");
  return { command, manifest, approved, targetBrands: [...new Set(targetBrands)] };
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  let payload;
  if (options.command === "dry-run") {
    payload = manifestPayload("dry-run", await buildPlan(options.targetBrands), options.targetBrands);
    await writeJson(options.manifest, payload);
  } else if (options.command === "apply") {
    payload = await applyPlan(options.approved);
  } else {
    payload = await verifyManifest();
  }
  console.log(
    JSON.stringify(
      { command: options.command, manifest: toPosix(relative(PROJECT_ROOT, options.manifest)), totals: payload.totals },
      null,
      2,
    ),
  );
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => {
    console.error(`runtime media pipeline 실패: ${error.message}`);
    process.exitCode = 1;
  });
}
