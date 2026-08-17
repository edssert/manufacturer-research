import { createHash } from "node:crypto";
import { lstat, mkdir, readFile, readdir, rename, rm, writeFile } from "node:fs/promises";
import { dirname, extname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DATA_ROOT = resolve(PROJECT_ROOT, "public", "js", "domains", "speakers", "data");
const PUBLIC_ROOT = resolve(PROJECT_ROOT, "public", "assets", "img", "speakers");
const RAW_ROOTS = [resolve(PROJECT_ROOT, "raw-data", "raw-assets"), resolve(PROJECT_ROOT, "raw-data", "official-docs")];
const SOURCE_MANIFEST_ROOT = resolve(PROJECT_ROOT, "raw-data", "source-manifests");
const MANIFEST_PATH = resolve(PROJECT_ROOT, "config", "runtime-media-manifest.json");
const SUPPORTED_BRANDS = ["ad", "co", "nexo", "martin", "jbl", "pk", "eaw", "coda", "funktion", "ev", "rcf", "la"];
const DEFAULT_TARGET_BRANDS = ["ad", "co", "nexo", "martin", "pk", "eaw", "coda", "funktion", "ev", "rcf", "la"];
const EXCLUDED_BRANDS = new Set(["db", "my"]);
const IMAGE_EXTENSIONS = new Set([".avif", ".jpeg", ".jpg", ".png", ".webp"]);
const REFERENCE_PATTERN =
  /public\/assets\/img\/speakers\/([a-z0-9-]+)\/[A-Za-z0-9_./+@%() -]+?\.(?:avif|jpe?g|png|webp)/gi;
const POLICY = Object.freeze({
  maxDimension: 2200,
  deriveAboveBytes: 2 * 1024 * 1024,
  maxOutputBytes: 12 * 1024 * 1024,
  encoder: "webp-lossless",
  lossless: true,
  effort: 4,
  resizeKernel: "lanczos3",
  preserveMetadata: false,
  crop: false,
  backgroundChange: false,
  alphaChange: false,
  colorAdjustment: false,
});

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

/** @param {[number, number]} dimensions @returns {[number, number]} */
function expectedDimensions([width, height]) {
  const longest = Math.max(width, height);
  if (longest <= POLICY.maxDimension) return [width, height];
  const scale = POLICY.maxDimension / longest;
  return [Math.round(width * scale), Math.round(height * scale)];
}

function derivativePath(sourcePath) {
  const extension = extname(sourcePath);
  return `${sourcePath.slice(0, -extension.length)}.runtime.webp`;
}

async function collectReferences(targetBrands) {
  const sources = (await listFiles(DATA_ROOT, new Set([".js"]))).filter(path => {
    const normalized = toPosix(relative(DATA_ROOT, path));
    return (
      !normalized.startsWith("db/") &&
      !normalized.startsWith("my/") &&
      normalized !== "db.data.js" &&
      normalized !== "my.data.js"
    );
  });
  const references = new Map();
  for (const sourceFile of sources) {
    const content = await readFile(sourceFile, "utf8");
    for (const match of content.matchAll(REFERENCE_PATTERN)) {
      const brand = match[1].toLowerCase();
      if (!targetBrands.includes(brand) || EXCLUDED_BRANDS.has(brand)) continue;
      const assetPath = match[0].replaceAll("\\", "/");
      if (!references.has(assetPath)) references.set(assetPath, new Set());
      references.get(assetPath).add(toPosix(relative(PROJECT_ROOT, sourceFile)));
    }
  }
  return references;
}

async function rawIndex() {
  const index = new Map();
  for (const manifestPath of await listFiles(SOURCE_MANIFEST_ROOT, new Set([".json"]))) {
    const manifest = JSON.parse((await readFile(manifestPath, "utf8")).replace(/^\uFEFF/, ""));
    for (const file of manifest.files ?? []) {
      if (!IMAGE_EXTENSIONS.has(extname(file.path).toLowerCase()) || !file.sha256) continue;
      const absolute = resolve(PROJECT_ROOT, file.path);
      if (!RAW_ROOTS.some(root => isWithin(root, absolute))) continue;
      if (!index.has(file.sha256)) index.set(file.sha256, []);
      index.get(file.sha256).push({ path: file.path.replaceAll("\\", "/"), bytes: file.bytes });
    }
  }
  for (const sources of index.values()) sources.sort((a, b) => compareText(a.path, b.path));
  return index;
}

async function visualFingerprint(path, width, height) {
  const resized = sharp(path, { failOn: "error", limitInputPixels: false })
    .toColourspace("srgb")
    .resize({ width, height, fit: "fill", kernel: POLICY.resizeKernel })
    .ensureAlpha();
  const [{ data, info }, alpha] = await Promise.all([
    resized
      .clone()
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true }),
    resized.clone().extractChannel("alpha").raw().toBuffer(),
  ]);
  return {
    data,
    alpha,
    visualSha256: createHash("sha256").update(data).digest("hex"),
    alphaSha256: createHash("sha256").update(alpha).digest("hex"),
    dimensions: [info.width, info.height],
    channels: info.channels,
    comparisonSurface: "white",
  };
}

function compareFingerprints(expected, actual) {
  if (expected.alphaSha256 !== actual.alphaSha256) throw new Error("alpha 채널이 달라졌습니다.");
  if (expected.data.length !== actual.data.length) throw new Error("visible 픽셀 길이가 달라졌습니다.");
  let sumAbsolute = 0;
  let sumSquared = 0;
  let maxChannelDelta = 0;
  let changedChannels = 0;
  for (let index = 0; index < expected.data.length; index++) {
    const delta = Math.abs(expected.data[index] - actual.data[index]);
    sumAbsolute += delta;
    sumSquared += delta * delta;
    maxChannelDelta = Math.max(maxChannelDelta, delta);
    if (delta) changedChannels++;
  }
  const meanAbsolute = sumAbsolute / expected.data.length;
  const meanSquared = sumSquared / expected.data.length;
  const psnrDb = meanSquared === 0 ? null : 10 * Math.log10((255 * 255) / meanSquared);
  if (meanAbsolute > 0.5 || (psnrDb !== null && psnrDb < 50)) {
    throw new Error(`visible 픽셀 허용 오차 초과: MAE ${meanAbsolute}, PSNR ${psnrDb}`);
  }
  return {
    comparisonSurface: "white",
    alphaExact: true,
    meanAbsolute: Number(meanAbsolute.toFixed(8)),
    maxChannelDelta,
    changedChannelRatio: Number((changedChannels / expected.data.length).toFixed(8)),
    psnrDb: psnrDb === null ? null : Number(psnrDb.toFixed(4)),
  };
}

async function createDerivative(sourcePath, outputPath, dimensions) {
  const [width, height] = dimensions;
  let pipeline = sharp(sourcePath, { failOn: "error", limitInputPixels: false }).toColourspace("srgb").resize({
    width,
    height,
    fit: "fill",
    kernel: POLICY.resizeKernel,
  });
  if (POLICY.preserveMetadata) pipeline = pipeline.keepMetadata();
  await mkdir(dirname(outputPath), { recursive: true });
  const temporary = `${outputPath}.tmp-${process.pid}`;
  try {
    await pipeline.webp({ lossless: true, effort: POLICY.effort }).toFile(temporary);
    await rename(temporary, outputPath);
  } finally {
    await rm(temporary, { force: true });
  }
}

async function buildPlan(targetBrands) {
  const references = await collectReferences(targetBrands);
  const sourcesByHash = await rawIndex();
  const records = [];
  for (const [runtimePath, referencedBySet] of [...references.entries()].sort(([a], [b]) => compareText(a, b))) {
    const brand = runtimePath.split("/")[4];
    const absolute = await resolveSafe(resolve(PUBLIC_ROOT, brand), runtimePath);
    const hashed = await sha256File(absolute);
    const image = await inspectImage(absolute);
    const sources = sourcesByHash.get(hashed.sha256) ?? [];
    const shouldDerive = Math.max(...image.dimensions) > POLICY.maxDimension || hashed.bytes > POLICY.deriveAboveBytes;
    const action = shouldDerive && sources.length ? "derive" : "preserve";
    const outputPath = action === "derive" ? derivativePath(runtimePath) : runtimePath;
    records.push({
      brand,
      runtimePath,
      action,
      reason:
        action === "derive" ? "runtime-budget" : shouldDerive ? "raw-byte-match-unavailable" : "within-runtime-budget",
      source: {
        path: sources[0]?.path ?? runtimePath,
        sha256: hashed.sha256,
        bytes: hashed.bytes,
        ...image,
        verifiedRawCopy: sources.length > 0,
      },
      output: {
        path: outputPath,
        sha256: action === "preserve" ? hashed.sha256 : null,
        bytes: action === "preserve" ? hashed.bytes : null,
        dimensions: action === "preserve" ? image.dimensions : expectedDimensions(image.dimensions),
        hasAlpha: image.hasAlpha,
        format: action === "preserve" ? image.format : "webp",
        visualSha256: null,
        sourceVisualSha256: null,
        alphaSha256: null,
        visualComparison: null,
      },
      transform:
        action === "derive"
          ? {
              type: "proportional-resize-and-lossless-reencode",
              maxDimension: POLICY.maxDimension,
              kernel: POLICY.resizeKernel,
              encoder: POLICY.encoder,
              lossless: POLICY.lossless,
              effort: POLICY.effort,
              preserveMetadata: POLICY.preserveMetadata,
              outputColorSpace: "srgb",
              colorProfileConversion: image.space === "srgb" ? "none" : "icc-aware-to-srgb",
              crop: POLICY.crop,
              backgroundChange: POLICY.backgroundChange,
              alphaChange: POLICY.alphaChange,
              colorAdjustment: POLICY.colorAdjustment,
            }
          : { type: "none" },
      referencedBy: [...referencedBySet].sort(compareText),
    });
  }
  return records;
}

function manifestPayload(mode, records, targetBrands) {
  const inputBytes = records.reduce((sum, record) => sum + record.source.bytes, 0);
  const outputBytes = records.reduce((sum, record) => sum + (record.output.bytes ?? 0), 0);
  return {
    schemaVersion: 1,
    mode,
    roots: {
      raw: RAW_ROOTS.map(path => toPosix(relative(PROJECT_ROOT, path))),
      runtime: toPosix(relative(PROJECT_ROOT, PUBLIC_ROOT)),
    },
    excludedBrands: [...EXCLUDED_BRANDS].sort(compareText),
    supportedBrands: [...SUPPORTED_BRANDS],
    targetBrands: [...targetBrands],
    policy: POLICY,
    totals: {
      records: records.length,
      derived: records.filter(record => record.action === "derive").length,
      preserved: records.filter(record => record.action === "preserve").length,
      unmatchedOversize: records.filter(record => record.reason === "raw-byte-match-unavailable").length,
      inputBytes,
      outputBytes,
      savedBytes: inputBytes - outputBytes,
    },
    records,
  };
}

async function writeJson(path, payload) {
  await assertNoSymlink(PROJECT_ROOT, path);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

async function applyPlan(approvedPath) {
  const approved = JSON.parse(await readFile(approvedPath, "utf8"));
  const current = manifestPayload("dry-run", await buildPlan(approved.targetBrands), approved.targetBrands);
  if (JSON.stringify(approved) !== JSON.stringify(current)) {
    throw new Error("승인된 dry-run 이후 참조 또는 이미지가 바뀌었습니다. dry-run부터 다시 실행하세요.");
  }

  for (const record of current.records.filter(item => item.action === "derive")) {
    if (!record.source.verifiedRawCopy) throw new Error(`raw 원본이 검증되지 않았습니다: ${record.source.path}`);
    const rawPath = await resolveSafe(PROJECT_ROOT, record.source.path);
    const outputPath = await resolveSafe(resolve(PUBLIC_ROOT, record.brand), record.output.path);
    await createDerivative(rawPath, outputPath, record.output.dimensions);
    const outputHash = await sha256File(outputPath);
    const outputImage = await inspectImage(outputPath);
    if (outputImage.hasAlpha !== record.source.hasAlpha) throw new Error(`알파 불변식 위반: ${record.output.path}`);
    if (JSON.stringify(outputImage.dimensions) !== JSON.stringify(record.output.dimensions)) {
      throw new Error(`치수 불변식 위반: ${record.output.path}`);
    }
    const expectedPixels = await visualFingerprint(rawPath, ...record.output.dimensions);
    const actualPixels = await visualFingerprint(outputPath, ...record.output.dimensions);
    const visualComparison = compareFingerprints(expectedPixels, actualPixels);
    record.output.sha256 = outputHash.sha256;
    record.output.bytes = outputHash.bytes;
    record.output.visualSha256 = actualPixels.visualSha256;
    record.output.sourceVisualSha256 = expectedPixels.visualSha256;
    record.output.alphaSha256 = actualPixels.alphaSha256;
    record.output.visualComparison = visualComparison;
  }

  const pathMap = new Map(
    current.records.filter(item => item.action === "derive").map(item => [item.runtimePath, item.output.path]),
  );
  const dataFiles = await listFiles(DATA_ROOT, new Set([".js"]));
  for (const dataFile of dataFiles) {
    const normalized = toPosix(relative(DATA_ROOT, dataFile));
    if (
      normalized.startsWith("db/") ||
      normalized.startsWith("my/") ||
      normalized === "db.data.js" ||
      normalized === "my.data.js"
    )
      continue;
    const before = await readFile(dataFile, "utf8");
    let after = before;
    for (const [oldPath, newPath] of pathMap) after = after.replaceAll(oldPath, newPath);
    if (after !== before) await writeFile(dataFile, after, "utf8");
  }

  for (const record of current.records.filter(item => item.action === "derive")) {
    const oldAbsolute = await resolveSafe(resolve(PUBLIC_ROOT, record.brand), record.runtimePath);
    const oldHash = await sha256File(oldAbsolute);
    if (oldHash.sha256 !== record.source.sha256)
      throw new Error(`삭제 전 raw-copy 해시가 달라졌습니다: ${record.runtimePath}`);
    await rm(oldAbsolute);
  }

  current.mode = "applied";
  current.totals.outputBytes = current.records.reduce((sum, record) => sum + record.output.bytes, 0);
  current.totals.savedBytes = current.totals.inputBytes - current.totals.outputBytes;
  await writeJson(MANIFEST_PATH, current);
  return current;
}

export async function verifyManifest() {
  const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
  if (manifest.schemaVersion !== 1 || manifest.mode !== "applied")
    throw new Error("적용된 runtime media manifest가 아닙니다.");
  const references = await collectReferences(manifest.targetBrands);
  const outputPaths = new Set(manifest.records.map(record => record.output.path));
  for (const reference of references.keys()) {
    if (!outputPaths.has(reference)) throw new Error(`manifest에 없는 runtime 참조: ${reference}`);
  }
  for (const record of manifest.records) {
    if (EXCLUDED_BRANDS.has(record.brand)) throw new Error(`제외 브랜드가 manifest에 포함되었습니다: ${record.brand}`);
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
    if (JSON.stringify(sourceImage.dimensions) !== JSON.stringify(record.source.dimensions))
      throw new Error(`source 치수 변경: ${record.source.path}`);
    if (JSON.stringify(outputImage.dimensions) !== JSON.stringify(record.output.dimensions))
      throw new Error(`output 치수 변경: ${record.output.path}`);
    if (sourceImage.hasAlpha !== record.source.hasAlpha || outputImage.hasAlpha !== record.output.hasAlpha)
      throw new Error(`알파 검증 실패: ${record.output.path}`);
    if (record.action === "derive") {
      if (!record.source.verifiedRawCopy) throw new Error(`raw 근거가 없는 파생본: ${record.output.path}`);
      if (Math.max(...outputImage.dimensions) > POLICY.maxDimension)
        throw new Error(`최대 치수 초과: ${record.output.path}`);
      if (outputHash.bytes > POLICY.maxOutputBytes) throw new Error(`최대 파일 크기 초과: ${record.output.path}`);
      const [expectedVisual, outputVisual] = await Promise.all([
        visualFingerprint(sourcePath, ...outputImage.dimensions),
        visualFingerprint(outputPath, ...outputImage.dimensions),
      ]);
      const comparison = compareFingerprints(expectedVisual, outputVisual);
      if (
        outputVisual.visualSha256 !== record.output.visualSha256 ||
        expectedVisual.visualSha256 !== record.output.sourceVisualSha256 ||
        outputVisual.alphaSha256 !== record.output.alphaSha256 ||
        JSON.stringify(comparison) !== JSON.stringify(record.output.visualComparison)
      )
        throw new Error(`visible-pixel 또는 alpha 해시 검증 실패: ${record.output.path}`);
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
      const invalid = targetBrands.filter(brand => !SUPPORTED_BRANDS.includes(brand) || EXCLUDED_BRANDS.has(brand));
      if (invalid.length) throw new Error(`지원하지 않거나 제외된 브랜드: ${invalid.join(", ")}`);
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
