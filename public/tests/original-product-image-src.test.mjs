import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { JSDOM } from "jsdom";

import { SPEAKERS } from "../js/domains/speakers/speakers.data.js";
import { cardHTML, modalBodyHTML } from "../js/domains/speakers/speakers.view.js";

const ROOT = resolve(import.meta.dirname, "..", "..");
const manifest = JSON.parse(readFileSync(resolve(ROOT, "config/runtime-media-manifest.json"), "utf8"));
const byOutput = new Map(manifest.records.map(record => [record.output.path, record]));
const hashCache = new Map();
const sha256 = path => {
  if (!hashCache.has(path)) {
    hashCache.set(
      path,
      createHash("sha256")
        .update(readFileSync(resolve(ROOT, path)))
        .digest("hex"),
    );
  }
  return hashCache.get(path);
};

assert.equal(manifest.schemaVersion, 2, "원본 이미지 표면 manifest schema가 필요합니다.");

function assertOriginalSource(src, context) {
  if (src === "public/assets/img/speakers/jbl/pending.svg") return;
  assert.notEqual(src.endsWith("/pending.svg"), true, `${context}: 승인되지 않은 placeholder path`);
  assert(!src.endsWith(".runtime.webp"), `${context}: optimized derivative가 img src에 남았습니다.`);
  const record = byOutput.get(src);
  assert(record, `${context}: manifest에 없는 img src (${src})`);
  if (record.transform.type === "documented-local-mask") {
    assert.equal(sha256(src), record.output.sha256, `${context}: documented mask hash`);
  } else {
    assert.equal(record.output.sha256, record.source.sha256, `${context}: public/raw manifest hash`);
    assert.equal(sha256(src), sha256(record.source.path), `${context}: public img src/raw byte hash`);
  }
}

const x15Hiq = SPEAKERS.find(product => product.id === "spk-la-x15-hiq");
assert.equal(
  x15Hiq?.img,
  "public/assets/img/speakers/la/official/x-series/x15-hiq/L-Acoustics_X15HiQ_Front_Black.jpg",
  "X15 HiQ right-click/save URL basename",
);

for (const product of SPEAKERS) {
  const declared = [product.img, product.imgBack, ...(product.views ?? []).map(view => view.src)].filter(Boolean);
  for (const src of declared) assertOriginalSource(src, `${product.id} declared media`);

  const card = JSDOM.fragment(cardHTML(product));
  for (const image of card.querySelectorAll("img[src]")) {
    assertOriginalSource(image.getAttribute("src"), `${product.id} card right-click surface`);
  }

  const modal = JSDOM.fragment(modalBodyHTML(product, null, []).body);
  for (const image of modal.querySelectorAll("img[src]")) {
    assertOriginalSource(image.getAttribute("src"), `${product.id} detail right-click surface`);
  }
}

console.log(`original product image src: PASS (${SPEAKERS.length} products, ${byOutput.size} original assets)`);
