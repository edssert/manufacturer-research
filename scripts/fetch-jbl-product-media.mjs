import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { JBL_SPEAKERS } from "../public/js/domains/speakers/data/jbl.data.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DATA_PATH = resolve(ROOT, "public/js/domains/speakers/data/jbl.data.js");
const INVENTORY_PATH = resolve(ROOT, "raw-data/catalog-inventory/jbl.json");
const MANIFEST_PATH = resolve(ROOT, "raw-data/source-manifests/jbl.json");
const APPLY = process.argv.includes("--apply");
const prefixArg = process.argv.find(argument => argument.startsWith("--id-prefix="));
const ID_PREFIX = prefixArg?.slice("--id-prefix=".length) || "spk-jbl-vtx-";
const RETRIEVED_AT = new Date().toISOString().slice(0, 10);
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140.0.0.0 Safari/537.36";

const REVIEWED_REPRESENTATIVE_BY_ID = new Map([
  ["spk-jbl-control-45c-t", { preserveRuntime: true }],
  ["spk-jbl-vtx-a12w", { galleryIndex: 2 }],
  ["spk-jbl-vtx-a8", { galleryIndex: 1 }],
  ["spk-jbl-vtx-m22", { galleryIndex: 1 }],
]);

function slug(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function decodeHtml(value) {
  return value.replaceAll("&amp;", "&");
}

function extensionFor(url, mimeType) {
  const extension = extname(new URL(url).pathname).toLowerCase();
  if ([".avif", ".jpeg", ".jpg", ".png", ".webp"].includes(extension)) return extension;
  return { "image/avif": ".avif", "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp" }[mimeType];
}

async function fetchBytes(url, attempt = 1) {
  const response = await fetch(url, {
    headers: { "accept-language": "en-US,en;q=0.9", "user-agent": USER_AGENT },
    redirect: "follow",
  });
  if ((response.status === 429 || response.status >= 500) && attempt < 4) {
    await new Promise(resolveDelay => setTimeout(resolveDelay, attempt * 3000));
    return fetchBytes(url, attempt + 1);
  }
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return { bytes: Buffer.from(await response.arrayBuffer()), response };
}

function galleryUrls(html) {
  const start = html.indexOf('id="product_thumbnails"');
  if (start >= 0) {
    const end = html.indexOf("</ul>", start);
    const gallery = html.slice(start, end >= 0 ? end : start + 100_000);
    const urls = [...gallery.matchAll(/class="product_thumbnail" href="([^"]+)"/g)].map(match => decodeHtml(match[1]));
    if (urls.length) return [...new Set(urls)];
  }
  const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/i)?.[1];
  return ogImage ? [decodeHtml(ogImage)] : [];
}

const inventory = JSON.parse(await readFile(INVENTORY_PATH, "utf8"));
const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
const inventoryById = new Map(inventory.products.map(product => [product.id, product]));
const targets = JBL_SPEAKERS.filter(speaker => speaker.id.startsWith(ID_PREFIX));
if (!targets.length) throw new Error(`No JBL products match ${ID_PREFIX}`);

console.log(`${APPLY ? "APPLY" : "DRY RUN"}: ${targets.length} JBL products (${ID_PREFIX})`);
if (!APPLY) {
  for (const speaker of targets)
    console.log(`${speaker.id}\t${inventoryById.get(speaker.id)?.productPage || "NO URL"}`);
  process.exit(0);
}

const updatedImages = new Map();
const newManifestEntries = [];
for (const [index, speaker] of targets.entries()) {
  const product = inventoryById.get(speaker.id);
  if (!product?.productPage) throw new Error(`${speaker.id}: missing productPage`);
  const pageUrl = product.productPage.replace("/en/", "/en-US/");
  const { bytes: pageBytes } = await fetchBytes(pageUrl);
  const html = pageBytes.toString("utf8");
  if (!html.includes(speaker.name) || /page not found|404 not found/i.test(html)) {
    throw new Error(`${speaker.id}: product identity not confirmed`);
  }
  const urls = galleryUrls(html);
  if (!urls.length) throw new Error(`${speaker.id}: no official product gallery image`);
  const representative = REVIEWED_REPRESENTATIVE_BY_ID.get(speaker.id);
  const representativeIndex = representative?.galleryIndex ?? 0;
  if (!representative?.preserveRuntime && representativeIndex >= urls.length) {
    throw new Error(`${speaker.id}: reviewed representative index ${representativeIndex} is unavailable`);
  }

  const modelSlug = speaker.id.replace(/^spk-jbl-/, "");
  const seriesSlug = slug(speaker.series);
  const pagePath = `raw-data/official-docs/jbl/speakers/product-pages/${modelSlug}.html`;
  await mkdir(dirname(resolve(ROOT, pagePath)), { recursive: true });
  await writeFile(resolve(ROOT, pagePath), pageBytes);
  newManifestEntries.push({
    path: pagePath,
    productIds: [speaker.id],
    role: "product-page-snapshot",
    sourcePage: pageUrl,
    sourceAsset: pageUrl,
    retrievedAt: RETRIEVED_AT,
    sha256: sha256(pageBytes),
    bytes: pageBytes.length,
    mimeType: "text/html",
  });

  for (const [viewIndex, url] of urls.entries()) {
    const { bytes, response } = await fetchBytes(url);
    const mimeType = response.headers.get("content-type")?.split(";")[0].toLowerCase();
    if (!mimeType?.startsWith("image/")) throw new Error(`${speaker.id}: ${url} returned ${mimeType}`);
    const extension = extensionFor(url, mimeType);
    if (!extension) throw new Error(`${speaker.id}: unsupported ${mimeType}`);
    const filename =
      viewIndex === 0 ? `front${extension}` : `view-${String(viewIndex + 1).padStart(2, "0")}${extension}`;
    const rawPath = `raw-data/raw-assets/jbl/speakers/${seriesSlug}/${modelSlug}/${filename}`;
    await mkdir(dirname(resolve(ROOT, rawPath)), { recursive: true });
    await writeFile(resolve(ROOT, rawPath), bytes);
    newManifestEntries.push({
      path: rawPath,
      productIds: [speaker.id],
      role: "product-image",
      sourcePage: pageUrl,
      sourceAsset: url,
      retrievedAt: RETRIEVED_AT,
      sha256: sha256(bytes),
      bytes: bytes.length,
      mimeType,
    });
    if (!representative?.preserveRuntime && viewIndex === representativeIndex) {
      const runtimePath = `public/assets/img/speakers/jbl/${seriesSlug}/${speaker.id}${extension}`;
      await mkdir(dirname(resolve(ROOT, runtimePath)), { recursive: true });
      await writeFile(resolve(ROOT, runtimePath), bytes);
      updatedImages.set(speaker.id, runtimePath);
    }
  }
  if (representative?.preserveRuntime) updatedImages.set(speaker.id, speaker.img);
  console.log(`[${index + 1}/${targets.length}] ${speaker.name}: ${urls.length} images`);
  await new Promise(resolveDelay => setTimeout(resolveDelay, 350));
}

const dataSource = await readFile(DATA_PATH, "utf8");
const prefix = dataSource.slice(0, dataSource.indexOf("const JBL_SPEAKER_RECORDS = ["));
const records = JBL_SPEAKERS.map(({ catalogGroup: _catalogGroup, ...speaker }) => {
  const runtimePath = updatedImages.get(speaker.id);
  return runtimePath ? { ...speaker, img: runtimePath, views: [{ label: "front", src: runtimePath }] } : speaker;
});
const suffix = `export const JBL_SPEAKERS = JBL_SPEAKER_RECORDS.map(speaker => ({
  ...speaker,
  catalogGroup: JBL_CATALOG_GROUP_BY_SERIES.get(speaker.series) || speaker.series,
}));
`;
await writeFile(DATA_PATH, `${prefix}const JBL_SPEAKER_RECORDS = ${JSON.stringify(records, null, 2)};\n\n${suffix}`);

const replacedPaths = new Set(newManifestEntries.map(entry => entry.path));
manifest.files = manifest.files
  .filter(entry => !replacedPaths.has(entry.path))
  .concat(newManifestEntries)
  .sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Updated ${updatedImages.size} runtime images and ${newManifestEntries.length} source records.`);
