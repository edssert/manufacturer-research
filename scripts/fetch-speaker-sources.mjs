import { createHash } from "node:crypto";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

import { SPEAKERS } from "../public/js/domains/speakers/speakers.data.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY_PATH = resolve(ROOT, "config/speaker-source-registry.json");
const INVENTORY_PATH = resolve(ROOT, "config/speaker-research.json");
const fetchMode = process.argv.includes("--fetch");

const registry = JSON.parse(await readFile(REGISTRY_PATH, "utf8"));
const inventory = JSON.parse(await readFile(INVENTORY_PATH, "utf8"));
const allowedHosts = new Set(registry.retrievalPolicy.allowedHosts);
const archiveRoot = resolve(ROOT, registry.retrievalPolicy.archiveRoot);
const lockPath = resolve(ROOT, registry.retrievalPolicy.lockFile);
const knownGroups = new Map();
for (const speaker of SPEAKERS) {
  const key = `${speaker.mk}:${speaker.series}`;
  const recordIds = knownGroups.get(key) || [];
  recordIds.push(speaker.id);
  knownGroups.set(key, recordIds);
}
const pendingIds = new Set(inventory.records.map(record => record.id));

const seenIds = new Set();
const seenPaths = new Set();
const coveredIds = new Set();

for (const source of registry.sources) {
  if (!source.id || seenIds.has(source.id)) throw new Error(`duplicate or missing source id: ${source.id}`);
  seenIds.add(source.id);

  const url = new URL(source.url);
  if (url.protocol !== "https:" || !allowedHosts.has(url.hostname)) {
    throw new Error(`source host is not allowed: ${source.url}`);
  }

  const outputPath = resolve(ROOT, source.localPath);
  const relativeOutput = relative(archiveRoot, outputPath);
  if (!relativeOutput || relativeOutput.startsWith(`..${sep}`) || relativeOutput === "..") {
    throw new Error(`source output escapes archive root: ${source.localPath}`);
  }
  if (seenPaths.has(outputPath)) throw new Error(`duplicate source output: ${source.localPath}`);
  seenPaths.add(outputPath);

  for (const series of source.series) {
    const recordIds = knownGroups.get(`${source.manufacturer}:${series}`);
    if (!recordIds) throw new Error(`unknown inventory group: ${source.manufacturer}:${series}`);
    recordIds.forEach(id => coveredIds.add(id));
  }
}

if (!fetchMode) {
  const lock = JSON.parse(await readFile(lockPath, "utf8"));
  const lockedById = new Map(lock.sources.map(source => [source.id, source]));
  if (lockedById.size !== registry.sources.length) throw new Error("source lock and registry counts differ");
  for (const source of registry.sources) {
    const locked = lockedById.get(source.id);
    if (!locked) throw new Error(`source is missing from lock: ${source.id}`);
    if (locked.url !== source.url || locked.localPath !== source.localPath) {
      throw new Error(`source lock metadata differs: ${source.id}`);
    }
    const bytes = await readFile(resolve(ROOT, source.localPath));
    const sha256 = createHash("sha256").update(bytes).digest("hex");
    if (bytes.length !== locked.bytes || sha256 !== locked.sha256) {
      throw new Error(`archived source differs from lock: ${source.id}`);
    }
  }
  console.log(
    `speaker source archive: PASS (${registry.sources.length} locked sources, ${[...coveredIds].filter(id => pendingIds.has(id)).length}/${inventory.summary.pendingRecords} pending records covered)`,
  );
  process.exit(0);
}

const lock = {
  schemaVersion: 1,
  retrievedAt: new Date().toISOString(),
  sources: [],
};

for (const source of registry.sources) {
  const response = await fetch(source.url, {
    redirect: "follow",
    headers: { "user-agent": "manufacturer-research-source-archiver/1.0" },
  });
  if (!response.ok) throw new Error(`${source.id}: HTTP ${response.status}`);
  const resolvedUrl = new URL(response.url);
  if (!allowedHosts.has(resolvedUrl.hostname)) throw new Error(`${source.id}: redirect left allowed hosts`);

  const bytes = Buffer.from(await response.arrayBuffer());
  if (!bytes.length) throw new Error(`${source.id}: empty response`);
  const outputPath = resolve(ROOT, source.localPath);
  const temporaryPath = `${outputPath}.partial`;
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(temporaryPath, bytes);
  await rename(temporaryPath, outputPath).catch(async error => {
    await rm(temporaryPath, { force: true });
    throw error;
  });

  const recordIds = source.series.flatMap(series => knownGroups.get(`${source.manufacturer}:${series}`) || []);
  lock.sources.push({
    id: source.id,
    url: source.url,
    resolvedUrl: response.url,
    localPath: source.localPath,
    contentType: response.headers.get("content-type") || "application/octet-stream",
    bytes: bytes.length,
    sha256: createHash("sha256").update(bytes).digest("hex"),
    recordIds: [...new Set(recordIds)].sort(),
  });
  console.log(`archived ${source.id} (${bytes.length} bytes)`);
}

lock.sources.sort((a, b) => a.id.localeCompare(b.id));
await writeFile(lockPath, `${JSON.stringify(lock, null, 2)}\n`, "utf8");
console.log(`speaker source archive: PASS (${lock.sources.length} sources)`);
