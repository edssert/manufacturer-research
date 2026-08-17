import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { copyFile, lstat, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, extname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { collectReachableJavaScript, DIST_DIR, verifyDist } from "./verify-dist.mjs";

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const COPY_ROOTS = Object.freeze([
  { source: "index.html", kind: "file", extensions: new Set([".html"]) },
  {
    source: "public/assets",
    kind: "directory",
    extensions: new Set([
      ".avif",
      ".gif",
      ".ico",
      ".jpeg",
      ".jpg",
      ".otf",
      ".png",
      ".svg",
      ".ttf",
      ".webp",
      ".woff",
      ".woff2",
    ]),
  },
  { source: "public/css", kind: "directory", extensions: new Set([".css"]) },
]);
const SOURCE_ONLY_ASSET_FILES = new Set(["public/assets/img/README.md"]);
const SOURCE_ONLY_DIRECTORY_NAMES = new Set(["__pycache__"]);

function compareText(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function toPosixPath(path) {
  return path.split(sep).join("/");
}

function isWithin(parent, child) {
  const pathFromParent = relative(parent, child);
  return (
    pathFromParent !== "" &&
    !pathFromParent.startsWith(`..${sep}`) &&
    pathFromParent !== ".." &&
    !isAbsolute(pathFromParent)
  );
}

function validateBoundaries() {
  assert(isWithin(PROJECT_ROOT, DIST_DIR), "dist가 프로젝트 루트 밖을 가리킵니다.");
  assert(relative(PROJECT_ROOT, DIST_DIR) === "dist", "빌드 출력 경계는 루트의 dist로 고정되어야 합니다.");

  for (const entry of COPY_ROOTS) {
    const sourcePath = resolve(PROJECT_ROOT, entry.source);
    assert(isWithin(PROJECT_ROOT, sourcePath), `소스 경계를 벗어난 경로입니다: ${entry.source}`);
    assert(!isWithin(sourcePath, DIST_DIR) && sourcePath !== DIST_DIR, `dist가 소스 경로와 겹칩니다: ${entry.source}`);
  }
}

async function hashFile(filePath) {
  const hash = createHash("sha256");
  await new Promise((resolveHash, rejectHash) => {
    const stream = createReadStream(filePath);
    stream.on("data", chunk => hash.update(chunk));
    stream.on("error", rejectHash);
    stream.on("end", () => resolveHash(undefined));
  });
  return hash.digest("hex");
}

async function collectDirectoryFiles(rootConfig) {
  const sourceRoot = resolve(PROJECT_ROOT, rootConfig.source);
  const files = [];

  async function visit(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    entries.sort((a, b) => compareText(a.name, b.name));

    for (const entry of entries) {
      const sourcePath = resolve(directory, entry.name);
      const artifactPath = toPosixPath(relative(PROJECT_ROOT, sourcePath));
      assert(isWithin(sourceRoot, sourcePath), `소스 복사 경계를 벗어난 경로입니다: ${artifactPath}`);
      assert(!entry.isSymbolicLink(), `심볼릭 링크는 배포할 수 없습니다: ${artifactPath}`);

      if (entry.isDirectory()) {
        if (SOURCE_ONLY_DIRECTORY_NAMES.has(entry.name)) continue;
        await visit(sourcePath);
        continue;
      }

      assert(entry.isFile(), `지원하지 않는 파일 시스템 항목입니다: ${artifactPath}`);
      if (SOURCE_ONLY_ASSET_FILES.has(artifactPath)) continue;

      const extension = extname(entry.name).toLowerCase();
      assert(rootConfig.extensions.has(extension), `런타임 파일 형식이 아닙니다: ${artifactPath}`);
      files.push({ sourcePath, artifactPath });
    }
  }

  const stats = await lstat(sourceRoot);
  assert(stats.isDirectory() && !stats.isSymbolicLink(), `필수 소스 디렉터리가 없습니다: ${rootConfig.source}`);
  await visit(sourceRoot);
  assert(files.length > 0, `복사할 런타임 파일이 없습니다: ${rootConfig.source}`);
  return files;
}

async function createCopyPlan() {
  const plan = await collectReachableJavaScript(PROJECT_ROOT);

  for (const rootConfig of COPY_ROOTS) {
    const sourcePath = resolve(PROJECT_ROOT, rootConfig.source);
    if (rootConfig.kind === "directory") {
      plan.push(...(await collectDirectoryFiles(rootConfig)));
      continue;
    }

    const stats = await lstat(sourcePath);
    assert(stats.isFile() && !stats.isSymbolicLink(), `필수 소스 파일이 없습니다: ${rootConfig.source}`);
    assert(
      rootConfig.extensions.has(extname(sourcePath).toLowerCase()),
      `런타임 파일 형식이 아닙니다: ${rootConfig.source}`,
    );
    plan.push({ sourcePath, artifactPath: rootConfig.source });
  }

  plan.sort((a, b) => compareText(a.artifactPath, b.artifactPath));
  const uniquePaths = new Set(plan.map(entry => entry.artifactPath));
  assert(uniquePaths.size === plan.length, "빌드 복사 계획에 중복 경로가 있습니다.");
  return plan;
}

async function build() {
  validateBoundaries();
  const copyPlan = await createCopyPlan();

  // 삭제 대상은 위에서 정확한 루트/dist인지 검증한 뒤에만 정리한다.
  await rm(DIST_DIR, { recursive: true, force: true });
  await mkdir(DIST_DIR, { recursive: false });

  const manifestFiles = [];
  for (const entry of copyPlan) {
    const destination = resolve(DIST_DIR, entry.artifactPath);
    assert(isWithin(DIST_DIR, destination), `빌드 출력 경계를 벗어난 경로입니다: ${entry.artifactPath}`);
    await mkdir(dirname(destination), { recursive: true });
    await copyFile(entry.sourcePath, destination);
    const stats = await lstat(destination);
    manifestFiles.push({
      path: entry.artifactPath,
      bytes: stats.size,
      sha256: await hashFile(destination),
    });
  }

  const manifest = {
    schemaVersion: 1,
    files: manifestFiles,
    totals: {
      files: manifestFiles.length,
      bytes: manifestFiles.reduce((sum, file) => sum + file.bytes, 0),
    },
  };
  await writeFile(resolve(DIST_DIR, "asset-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  const result = await verifyDist(DIST_DIR);
  console.log(`dist 빌드 완료: ${result.files}개 파일, ${result.bytes}바이트`);
}

try {
  await build();
} catch (error) {
  console.error(`dist 빌드 실패: ${error.message}`);
  process.exitCode = 1;
}
