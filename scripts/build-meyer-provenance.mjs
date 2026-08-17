import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, relative, resolve, sep } from "node:path";

import { MY_SPEAKERS } from "../public/js/domains/speakers/data/my.data.js";

const ROOT = resolve(import.meta.dirname, "..");
const groups = JSON.parse(readFileSync(resolve(ROOT, "raw-data/catalog-inventory/my-import-groups.json"), "utf8"));
const selected = JSON.parse(readFileSync(resolve(ROOT, "raw-data/catalog-inventory/my-media-selection.json"), "utf8"));
const retrievedAt = "2026-08-18";
const toPosix = path => relative(ROOT, path).split(sep).join("/");
const walk = root =>
  readdirSync(root, { withFileTypes: true }).flatMap(entry => {
    const path = resolve(root, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
const sha256 = path => createHash("sha256").update(readFileSync(path)).digest("hex");
const safeName = url => decodeURIComponent(new URL(url).pathname.split("/").at(-1)).replace(/[^A-Za-z0-9._-]/g, "-");
const mime = path =>
  ({
    ".html": "text/html",
    ".pdf": "application/pdf",
    ".zip": "application/zip",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
  })[extname(path).toLowerCase()] ?? "application/octet-stream";

for (const item of selected) {
  mkdirSync(dirname(resolve(ROOT, item.runtime)), { recursive: true });
  copyFileSync(resolve(ROOT, item.raw), resolve(ROOT, item.runtime));
}

const seriesProducts = new Map();
for (const product of MY_SPEAKERS) {
  const key = product.series;
  if (!seriesProducts.has(key)) seriesProducts.set(key, []);
  seriesProducts.get(key).push(product.id);
}
const seriesSlugToName = new Map(
  groups.map(group => [group.series, MY_SPEAKERS.find(product => group.productIds.includes(product.id))?.series]),
);
const selectedByRaw = new Map(selected.map(item => [item.raw, item]));

const htmlFiles = walk(resolve(ROOT, "raw-data/official-docs/my")).filter(
  path => extname(path).toLowerCase() === ".html",
);
const sourceByLocalHtml = new Map();
const linkedSourceByName = new Map();
for (const path of htmlFiles) {
  const name = basename(path);
  let source;
  if (name === "documentation-index-en.html") source = "https://docs.meyersound.com/products/en/index-en.html";
  else if (name.endsWith("-product-page.html"))
    source = `https://meyersound.com/product/${name.replace(/-product-page\.html$/, "")}/`;
  else if (name.endsWith("-documentation.html"))
    source = `https://docs.meyersound.com/products/en/${name.replace(/-documentation\.html$/, "")}.html`;
  else if (name.endsWith("-datasheet.html") && !name.startsWith("datasheet---"))
    source = `https://docs.meyersound.com/products/en/datasheet---${name.replace(/-datasheet\.html$/, "")}.html`;
  else source = `https://docs.meyersound.com/products/en/${name}`;
  sourceByLocalHtml.set(path, source);
  const html = readFileSync(path, "utf8");
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    try {
      const url = new URL(match[1].replaceAll("&amp;", "&"), source).href;
      if (url.startsWith("https://docs.meyersound.com/") || url.startsWith("https://meyersound.com/")) {
        const nameKey = safeName(url);
        if (!linkedSourceByName.has(nameKey)) linkedSourceByName.set(nameKey, url);
      }
    } catch {
      continue;
    }
  }
}

function productsForPath(path) {
  const posix = toPosix(path);
  if (posix.includes("/references/")) return [];
  const seriesSlug = groups.find(group => posix.includes(`/speakers/${group.series}/`))?.series;
  if (!seriesSlug) return MY_SPEAKERS.map(product => product.id);
  const exactGroup = groups.find(group => posix.includes(`/speakers/${group.series}/${group.slug}/`));
  if (exactGroup) return exactGroup.productIds;
  const seriesName = seriesSlugToName.get(seriesSlug);
  return seriesProducts.get(seriesName) ?? [];
}

function sourcePageFor(path, productIds) {
  if (sourceByLocalHtml.has(path)) return sourceByLocalHtml.get(path);
  const selectedItem = selectedByRaw.get(toPosix(path));
  if (selectedItem) return selectedItem.page;
  const product = MY_SPEAKERS.find(item => productIds.includes(item.id));
  const slug = product?.id.replace(/^spk-my-/, "");
  return slug
    ? `https://docs.meyersound.com/products/en/${slug}.html`
    : "https://docs.meyersound.com/products/en/index-en.html";
}

function sourceAssetFor(path, sourcePage) {
  const selectedItem = selectedByRaw.get(toPosix(path));
  if (selectedItem) return selectedItem.asset;
  return linkedSourceByName.get(basename(path)) ?? sourcePage;
}

function roleFor(path) {
  const name = basename(path).toLowerCase();
  const posix = toPosix(path);
  if (posix.startsWith("raw-data/raw-assets/")) return "product-image";
  if (name === "documentation-index-en.html") return "downloads-index-snapshot";
  if (name.endsWith("-product-page.html")) return "product-page-snapshot";
  if (name.includes("datasheet")) return "datasheet";
  if (name.includes("operating-instructions") || /_oi_[a-z0-9-]*\.pdf$/.test(name)) return "manual";
  if (name.includes("rigging") || /_ag_[a-z0-9-]*\.pdf$/.test(name)) return "rigging-manual";
  if (name.includes("b-noise") || name.includes("system_examples")) return "whitepaper";
  if (name.endsWith(".zip")) return name.includes("ease") ? "media-or-data-archive" : "technical-drawing-archive";
  if (name.endsWith(".pdf")) return "official-document";
  return "technical-document";
}

const archiveFiles = [
  ...walk(resolve(ROOT, "raw-data/raw-assets/my")),
  ...walk(resolve(ROOT, "raw-data/official-docs/my")),
]
  .filter(path => statSync(path).size > 0)
  .sort((a, b) => (toPosix(a) < toPosix(b) ? -1 : toPosix(a) > toPosix(b) ? 1 : 0));

const manifestFiles = archiveFiles.map(path => {
  const productIds = productsForPath(path);
  const role = roleFor(path);
  const sourcePage = sourcePageFor(path, productIds);
  return {
    path: toPosix(path),
    productIds: productIds.length || !["downloads-index-snapshot"].includes(role) ? productIds : [],
    role,
    sourcePage,
    sourceAsset: sourceAssetFor(path, sourcePage),
    retrievedAt,
    sha256: sha256(path),
    bytes: statSync(path).size,
    mimeType: mime(path),
  };
});

const mediaByProduct = new Map();
for (const item of selected) for (const productId of item.productIds) mediaByProduct.set(productId, item);
const inventory = {
  schemaVersion: 1,
  manufacturerId: "my",
  scope: "loudspeakers",
  sourcePages: ["https://meyersound.com/products/", "https://docs.meyersound.com/products/en/index-en.html"],
  retrievedAt,
  currentProducts: MY_SPEAKERS.map(product => {
    const media = mediaByProduct.get(product.id);
    return {
      id: product.id,
      name: product.name,
      series: product.series,
      status: "verified",
      sourcePage: media.page,
      rawImage: media.raw,
      runtimeImage: media.runtime,
      sharedOfficialMediaProductIds: media.productIds,
    };
  }),
  excluded: [],
};
const seriesOrder = {
  schemaVersion: 1,
  manufacturerId: "my",
  sourcePage: "https://meyersound.com/products/",
  retrievedAt,
  seriesOrder: [...new Set(MY_SPEAKERS.map(product => product.series))],
  basis:
    "official product families, flagship touring systems first, followed by point-source, installation, monitor, cinema, and low-frequency families",
};

mkdirSync(resolve(ROOT, "raw-data/source-manifests"), { recursive: true });
mkdirSync(resolve(ROOT, "raw-data/catalog-inventory"), { recursive: true });
mkdirSync(resolve(ROOT, "raw-data/series-order"), { recursive: true });
writeFileSync(
  resolve(ROOT, "raw-data/source-manifests/my.json"),
  `${JSON.stringify({ schemaVersion: 1, manufacturerId: "my", scope: "loudspeakers", files: manifestFiles }, null, 2)}\n`,
);
writeFileSync(resolve(ROOT, "raw-data/catalog-inventory/my.json"), `${JSON.stringify(inventory, null, 2)}\n`);
writeFileSync(resolve(ROOT, "raw-data/series-order/my.json"), `${JSON.stringify(seriesOrder, null, 2)}\n`);

const hashMismatches = selected.filter(item => sha256(resolve(ROOT, item.raw)) !== sha256(resolve(ROOT, item.runtime)));
const missingRuntime = MY_SPEAKERS.filter(product => !existsSync(resolve(ROOT, product.img)));
console.log(
  JSON.stringify(
    {
      products: MY_SPEAKERS.length,
      runtimeImages: new Set(MY_SPEAKERS.map(product => product.img)).size,
      archivedFiles: manifestFiles.length,
      hashMatches: selected.length - hashMismatches.length,
      hashMismatches: hashMismatches.map(item => item.slug),
      missingRuntime: missingRuntime.map(product => product.id),
    },
    null,
    2,
  ),
);
