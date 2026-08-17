import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { lstat, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, extname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const POLICY_PATH = resolve(PROJECT_ROOT, "config", "asset-policy.json");
const ASSET_POLICY = JSON.parse(await readFile(POLICY_PATH, "utf8"));
const ASSET_ROOT = resolve(PROJECT_ROOT, ASSET_POLICY.runtimeAssets.root);
const RUNTIME_EXTENSIONS = new Set(ASSET_POLICY.runtimeAssets.supportedExtensions);
const SOURCE_EXTENSIONS = new Set([".css", ".html", ".js"]);
const CODE_ASSET_PATTERN = /public\/assets\/[A-Za-z0-9_./+@%() -]+?(?=["'`?#\s]|$)/g;
const CSS_URL_PATTERN = /url\(\s*(["']?)(.*?)\1\s*\)/g;

function toPosix(path) {
  return path.split(sep).join("/");
}

function compareText(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

function isWithin(parent, child) {
  const pathFromParent = relative(parent, child);
  return (
    pathFromParent === "" ||
    (pathFromParent !== ".." && !pathFromParent.startsWith(`..${sep}`) && !isAbsolute(pathFromParent))
  );
}

async function listFiles(root, extensions) {
  const files = [];
  async function visit(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    entries.sort((a, b) => compareText(a.name, b.name));
    for (const entry of entries) {
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "__pycache__") continue;
        await visit(path);
      } else if (entry.isFile() && extensions.has(extname(entry.name).toLowerCase())) {
        files.push(path);
      }
    }
  }
  await visit(root);
  return files;
}

async function hashFile(path) {
  const hash = createHash("sha256");
  await new Promise((finish, fail) => {
    const stream = createReadStream(path);
    stream.on("data", chunk => hash.update(chunk));
    stream.on("error", fail);
    stream.on("end", () => finish(undefined));
  });
  const stats = await lstat(path);
  return { sha256: hash.digest("hex"), bytes: stats.size };
}

function normalizeCodeReference(reference) {
  return reference.replaceAll("\\", "/");
}

function resolveCssReference(sourcePath, reference) {
  const withoutFragment = reference.split(/[?#]/, 1)[0];
  if (!withoutFragment || /^(?:data:|https?:|\/\/)/i.test(withoutFragment)) return null;
  const absolute = withoutFragment.startsWith("/")
    ? resolve(PROJECT_ROOT, withoutFragment.slice(1))
    : resolve(dirname(sourcePath), withoutFragment);
  return isWithin(ASSET_ROOT, absolute) ? toPosix(relative(PROJECT_ROOT, absolute)) : null;
}

async function collectReferences() {
  const sources = [resolve(PROJECT_ROOT, "index.html")];
  sources.push(...(await listFiles(resolve(PROJECT_ROOT, "public", "css"), SOURCE_EXTENSIONS)));
  sources.push(...(await listFiles(resolve(PROJECT_ROOT, "public", "js"), SOURCE_EXTENSIONS)));

  const references = new Map();
  const add = (assetPath, sourcePath) => {
    if (!references.has(assetPath)) references.set(assetPath, new Set());
    references.get(assetPath).add(toPosix(relative(PROJECT_ROOT, sourcePath)));
  };

  for (const sourcePath of sources) {
    const source = await readFile(sourcePath, "utf8");
    for (const match of source.matchAll(CODE_ASSET_PATTERN)) {
      add(normalizeCodeReference(match[0]), sourcePath);
    }
    if (extname(sourcePath).toLowerCase() === ".css") {
      for (const match of source.matchAll(CSS_URL_PATTERN)) {
        const assetPath = resolveCssReference(sourcePath, match[2]);
        if (assetPath) add(assetPath, sourcePath);
      }
    }
  }
  return references;
}

function duplicateGroups(hashedFiles) {
  const byHash = new Map();
  for (const file of hashedFiles) {
    if (!byHash.has(file.sha256)) byHash.set(file.sha256, []);
    byHash.get(file.sha256).push(file);
  }
  return [...byHash.entries()]
    .filter(([, files]) => files.length > 1)
    .map(([sha256, files]) => ({
      sha256,
      bytesPerFile: files[0].bytes,
      recoverableBytes: files[0].bytes * (files.length - 1),
      files: files.map(file => file.path).sort(compareText),
    }))
    .sort((left, right) => compareText(left.sha256, right.sha256));
}

function parseArguments(argv) {
  const options = { output: null };
  for (let index = 0; index < argv.length; index++) {
    const argument = argv[index];
    if (argument === "--json") {
      const value = argv[++index];
      if (!value) throw new Error("--json 뒤에 출력 경로가 필요합니다.");
      options.output = resolve(PROJECT_ROOT, value);
      continue;
    }
    throw new Error(`알 수 없는 인자: ${argument}`);
  }
  return options;
}

async function auditAssets() {
  if (ASSET_POLICY.schemaVersion !== 1 || !isWithin(PROJECT_ROOT, ASSET_ROOT)) {
    throw new Error("asset policy의 schemaVersion 또는 runtime root가 올바르지 않습니다.");
  }
  const assetFiles = await listFiles(ASSET_ROOT, RUNTIME_EXTENSIONS);
  const references = await collectReferences();
  const hashedFiles = [];

  for (const path of assetFiles) {
    hashedFiles.push({
      path: toPosix(relative(PROJECT_ROOT, path)),
      ...(await hashFile(path)),
    });
  }
  hashedFiles.sort((left, right) => compareText(left.path, right.path));

  const actualPaths = new Set(hashedFiles.map(file => file.path));
  const referencedPaths = new Set(references.keys());
  const missing = [...referencedPaths]
    .filter(path => !actualPaths.has(path))
    .sort(compareText)
    .map(path => ({ path, referencedBy: [...references.get(path)].sort(compareText) }));
  const orphaned = [...actualPaths].filter(path => !referencedPaths.has(path)).sort(compareText);
  const duplicates = duplicateGroups(hashedFiles);

  return {
    schemaVersion: 1,
    totals: {
      files: hashedFiles.length,
      bytes: hashedFiles.reduce((sum, file) => sum + file.bytes, 0),
      references: referencedPaths.size,
      missing: missing.length,
      orphaned: orphaned.length,
      duplicateGroups: duplicates.length,
      duplicateFiles: duplicates.reduce((sum, group) => sum + group.files.length, 0),
      recoverableDuplicateBytes: duplicates.reduce((sum, group) => sum + group.recoverableBytes, 0),
    },
    missing,
    orphaned,
    duplicates,
  };
}

try {
  const options = parseArguments(process.argv.slice(2));
  const report = await auditAssets();
  if (options.output) {
    if (!isWithin(PROJECT_ROOT, options.output)) throw new Error("JSON 출력은 프로젝트 경계 안이어야 합니다.");
    await writeFile(options.output, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  }

  console.log(
    `자산 감사: ${report.totals.files}개/${report.totals.bytes}바이트, ` +
      `참조 ${report.totals.references}, 누락 ${report.totals.missing}, ` +
      `고아 ${report.totals.orphaned}, 중복 ${report.totals.duplicateGroups}그룹 ` +
      `(${report.totals.recoverableDuplicateBytes}바이트)`,
  );
  if (report.missing.length) {
    report.missing.forEach(entry => console.error(`누락: ${entry.path} <- ${entry.referencedBy.join(", ")}`));
  }
  if (report.orphaned.length) {
    report.orphaned.forEach(path => console.error(`미참조: ${path}`));
  }
  const duplicateBaseline = ASSET_POLICY.knownExactDuplicates;
  const baselineMatches =
    report.totals.duplicateGroups === duplicateBaseline.groups &&
    report.totals.duplicateFiles === duplicateBaseline.files &&
    report.totals.recoverableDuplicateBytes === duplicateBaseline.recoverableBytes;
  if (!baselineMatches) {
    console.error(
      "완전 중복 baseline이 달라졌습니다. 의미 검수 후 config/asset-policy.json을 갱신하세요: " +
        `${report.totals.duplicateGroups}그룹/${report.totals.duplicateFiles}파일/` +
        `${report.totals.recoverableDuplicateBytes}바이트`,
    );
  }
  const missingAllowed = ASSET_POLICY.runtimeAssets.missingReferencesAllowed;
  const orphanedAllowed = ASSET_POLICY.runtimeAssets.orphanFilesAllowed;
  if (report.missing.length > missingAllowed || report.orphaned.length > orphanedAllowed || !baselineMatches) {
    process.exitCode = 1;
  }
} catch (error) {
  console.error(`자산 감사 실패: ${error.message}`);
  process.exitCode = 1;
}
