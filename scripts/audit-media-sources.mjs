import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = resolve(ROOT, "config/media-sources.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const officialHosts = new Set([
  "www.l-acoustics.com",
  "prdstglaxxwe001.blob.core.windows.net",
  "adamson.ai",
  "adamson-media-storage-prod.tor1.cdn.digitaloceanspaces.com",
  "www.cohesionaudio.com",
  "cdn.prod.website-files.com",
  "www.dbaudio.com",
  "meyersound.com",
]);

assert.equal(manifest.schemaVersion, 1, "지원하지 않는 media source schema입니다.");
assert(Array.isArray(manifest.assets) && manifest.assets.length > 0, "media source 항목이 필요합니다.");

for (const asset of manifest.assets) {
  assert.match(asset.runtimePath, /^public\/assets\/img\//, "런타임 이미지 경계 밖의 경로입니다.");
  const filePath = resolve(ROOT, asset.runtimePath);
  assert(existsSync(filePath), `공식 출처 자산이 없습니다: ${asset.runtimePath}`);
  const bytes = readFileSync(filePath);
  assert.equal(statSync(filePath).size, asset.bytes, `${asset.runtimePath} 바이트가 manifest와 다릅니다.`);
  assert.equal(
    createHash("sha256").update(bytes).digest("hex"),
    asset.sha256,
    `${asset.runtimePath} 해시가 manifest와 다릅니다.`,
  );
  for (const key of ["sourcePage", "sourceAsset", "officialVisualArchive"].filter(key => asset[key])) {
    const url = new URL(asset[key]);
    assert.equal(url.protocol, "https:", `${key}는 HTTPS여야 합니다.`);
    assert(officialHosts.has(url.hostname), `${key}가 승인된 공식 호스트가 아닙니다.`);
  }
  if (asset.originalPath) {
    assert.match(asset.originalPath, /^raw-data\/raw-assets\//, "원본 이미지 경계 밖의 경로입니다.");
    const originalPath = resolve(ROOT, asset.originalPath);
    assert(existsSync(originalPath), `보존 원본이 없습니다: ${asset.originalPath}`);
    const originalBytes = readFileSync(originalPath);
    assert.equal(
      statSync(originalPath).size,
      asset.originalBytes,
      `${asset.originalPath} 바이트가 manifest와 다릅니다.`,
    );
    assert.equal(
      createHash("sha256").update(originalBytes).digest("hex"),
      asset.originalSha256,
      `${asset.originalPath} 해시가 manifest와 다릅니다.`,
    );
  }
  if (asset.runtimePath.endsWith(".png")) {
    assert(bytes.subarray(1, 4).equals(Buffer.from("PNG")), `${asset.runtimePath}는 PNG가 아닙니다.`);
    assert.deepEqual(
      [bytes.readUInt32BE(16), bytes.readUInt32BE(20)],
      asset.dimensions,
      `${asset.runtimePath} 해상도가 manifest와 다릅니다.`,
    );
  }
}

console.log(`media source audit: PASS (${manifest.assets.length} assets)`);
