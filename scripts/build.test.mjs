import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { collectReachableJavaScript, DIST_DIR, verifyDist } from "./verify-dist.mjs";

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BUILD_SCRIPT = resolve(PROJECT_ROOT, "scripts/build.mjs");

function runBuild() {
  const result = spawnSync(process.execPath, [BUILD_SCRIPT], {
    cwd: PROJECT_ROOT,
    encoding: "utf8",
  });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  assert.equal(result.status, 0, "빌드 프로세스가 실패했습니다.");
}

async function manifestHash() {
  const contents = await readFile(resolve(DIST_DIR, "asset-manifest.json"));
  return createHash("sha256").update(contents).digest("hex");
}

async function listFiles(directory) {
  const files = [];
  async function visit(currentDirectory) {
    const entries = await readdir(currentDirectory, { withFileTypes: true });
    for (const entry of entries) {
      const entryPath = resolve(currentDirectory, entry.name);
      if (entry.isDirectory()) await visit(entryPath);
      else if (entry.isFile()) files.push(entryPath);
    }
  }
  await visit(directory);
  return files;
}

async function writeFixture(root, path, contents) {
  const target = resolve(root, path);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, contents, "utf8");
}

async function testGraphPolicy() {
  const fixtureRoot = await mkdtemp(join(tmpdir(), "manufacturer-research-build-"));
  try {
    await writeFixture(
      fixtureRoot,
      "index.html",
      [
        '<script src="public/js/bootstrap.js"></script>',
        '<script type="module" src="public/js/main.js"></script>',
      ].join("\n"),
    );
    await writeFixture(fixtureRoot, "public/js/bootstrap.js", "globalThis.fixtureReady = true;\n");
    await writeFixture(
      fixtureRoot,
      "public/js/main.js",
      [
        'import { value } from "./dependency.js";',
        'import "./side-effect.js";',
        'export { exported } from "./exported.js";',
        'export const lazy = () => import("./dynamic.js");',
        "console.log(value);",
      ].join("\n"),
    );
    await writeFixture(fixtureRoot, "public/js/dependency.js", "export const value = 1;\n");
    await writeFixture(fixtureRoot, "public/js/side-effect.js", "globalThis.sideEffect = true;\n");
    await writeFixture(fixtureRoot, "public/js/exported.js", "export const exported = true;\n");
    await writeFixture(fixtureRoot, "public/js/dynamic.js", "export default true;\n");

    const reachable = await collectReachableJavaScript(fixtureRoot);
    assert.deepEqual(
      reachable.map(file => file.artifactPath),
      [
        "public/js/bootstrap.js",
        "public/js/dependency.js",
        "public/js/dynamic.js",
        "public/js/exported.js",
        "public/js/main.js",
        "public/js/side-effect.js",
      ],
      "정적 import 종류별 그래프가 완전해야 합니다.",
    );

    for (const invalidSpecifier of ["some-package", "https://example.com/module.js"]) {
      await writeFixture(fixtureRoot, "public/js/main.js", `import "${invalidSpecifier}";\n`);
      await assert.rejects(
        collectReachableJavaScript(fixtureRoot),
        /외부 또는 bare import/,
        `${invalidSpecifier} import는 거부되어야 합니다.`,
      );
    }

    await writeFixture(fixtureRoot, "public/js/main.js", 'import "../../outside.js";\n');
    await assert.rejects(collectReachableJavaScript(fixtureRoot), /경계를 벗어납니다/);

    await writeFixture(fixtureRoot, "public/js/main.js", 'import "./missing.js";\n');
    await assert.rejects(collectReachableJavaScript(fixtureRoot), /존재하지 않습니다/);

    await writeFixture(fixtureRoot, "public/js/main.js", 'const name = "dynamic"; import("./" + name + ".js");\n');
    await assert.rejects(collectReachableJavaScript(fixtureRoot), /하나의 정적 문자열/);
  } finally {
    await rm(fixtureRoot, { recursive: true, force: true });
  }
}

await testGraphPolicy();

runBuild();
const firstManifestHash = await manifestHash();
runBuild();
assert.equal(await manifestHash(), firstManifestHash, "동일 입력의 manifest가 결정적이지 않습니다.");

const requiredRuntimeModules = [
  "public/js/bootstrap-preferences.js",
  "public/js/main.js",
  "public/js/core/manufacturers.js",
  "public/js/core/route-codec.js",
  "public/js/relationships/entity-registry.js",
];
for (const runtimeModule of requiredRuntimeModules) {
  assert(existsSync(resolve(DIST_DIR, runtimeModule)), `도달 가능한 런타임 모듈이 누락되었습니다: ${runtimeModule}`);
}

const sourceDataFiles = (await listFiles(resolve(PROJECT_ROOT, "public/js/domains"))).filter(file =>
  file.endsWith(".data.js"),
);
assert(sourceDataFiles.length > 0, "검사할 런타임 데이터 모듈이 없습니다.");
for (const sourceDataFile of sourceDataFiles) {
  const artifactPath = relative(PROJECT_ROOT, sourceDataFile).split(sep).join("/");
  assert(existsSync(resolve(DIST_DIR, artifactPath)), `런타임 데이터 모듈이 누락되었습니다: ${artifactPath}`);
}

const dataContractsSource = resolve(PROJECT_ROOT, "public/js/core/data-contracts.js");
assert(existsSync(dataContractsSource), "미도달 모듈 제외 검사가 유효하려면 data-contracts.js 소스가 있어야 합니다.");
assert(
  !existsSync(resolve(DIST_DIR, "public/js/core/data-contracts.js")),
  "미도달 data-contracts.js가 배포되었습니다.",
);

const deployedJavaScript = (await listFiles(resolve(DIST_DIR, "public/js"))).filter(file =>
  [".js", ".json", ".mjs"].includes(extname(file).toLowerCase()),
);
const reachableJavaScript = await collectReachableJavaScript(DIST_DIR);
assert.equal(deployedJavaScript.length, reachableJavaScript.length, "미도달 JavaScript가 dist에 포함되었습니다.");

const verification = await verifyDist();
console.log(
  `빌드 그래프 테스트 통과: JavaScript ${reachableJavaScript.length}개, 전체 ${verification.files}개 파일, manifest ${firstManifestHash}`,
);
