/** 단일 저자극 라이트 팔레트와 핵심 대비 계약. */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = path => readFileSync(resolve(ROOT, path), "utf8");
const tokens = read("public/css/tokens.css");
const base = read("public/css/base.css");
const card = read("public/css/components/card.css");
const modal = read("public/css/components/modal.css");
const nav = read("public/js/ui/nav.js");
const main = read("public/js/main.js");
const bootstrap = read("public/js/bootstrap-preferences.js");

function token(name) {
  const value = tokens.match(new RegExp(`--${name}:\\s*(#[0-9a-f]{3,8})`, "i"))?.[1];
  assert(value, `색상 토큰 누락: --${name}`);
  return value;
}

function rgb(hex) {
  const raw = hex.slice(1);
  const full = raw.length === 3 ? [...raw].map(char => char + char).join("") : raw.slice(0, 6);
  return [0, 2, 4].map(index => Number.parseInt(full.slice(index, index + 2), 16));
}

function luminance(hex) {
  const channels = rgb(hex).map(value => {
    const normalized = value / 255;
    return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrast(foreground, background) {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

const panel = token("panel");
const raised = token("surface-raised");
assert.equal(token("product-media-surface").toLowerCase(), "#fff", "제품 사진 면은 순백색이어야 합니다.");
assert.notEqual(token("bg").toLowerCase(), "#fff", "앱 전체 배경은 눈부심을 줄이기 위해 순백색이면 안 됩니다.");
assert.notEqual(token("panel").toLowerCase(), "#fff", "넓은 정보 패널은 순백색 제품 면과 구분되어야 합니다.");
for (const name of ["ink", "ink-2", "muted", "accent", "la", "db", "my"]) {
  assert(contrast(token(name), panel) >= 4.5, `${name} 토큰은 흰 카드에서 4.5:1 대비가 필요합니다.`);
  assert(contrast(token(name), raised) >= 4.5, `${name} 토큰은 제품 카드에서 4.5:1 대비가 필요합니다.`);
}

const themeSurface = [tokens, base, nav, main, bootstrap].join("\n");
assert(!/data-theme|theme-toggle|mr-theme/.test(themeSurface), "제거한 다크모드 상태나 토글이 남아 있습니다.");
assert(base.includes("color-scheme: light"), "네이티브 UI도 라이트 팔레트를 사용해야 합니다.");
assert(card.includes("box-shadow: var(--shadow-card)"), "카드는 색 변화 대신 공통 깊이 토큰을 사용해야 합니다.");
assert(card.includes("background: var(--surface-raised)"), "제품 카드는 전용 순백색 표면 토큰을 사용해야 합니다.");
assert(!/\.card\s*\{[^}]*border-left:/s.test(card), "제조사 색을 카드 전체 테두리에 반복하지 않습니다.");
assert(
  tokens.includes("--gauge-spl-start") && tokens.includes("--gauge-spl-end"),
  "SPL 전용 중성 게이지 토큰이 필요합니다.",
);
assert(!tokens.includes("--gauge-amber"), "SPL 게이지에 앰버 팔레트를 재사용하지 않습니다.");
assert(card.includes("var(--gauge-spl-start), var(--gauge-spl-end)"), "SPL 바는 중성 청회색 토큰을 사용해야 합니다.");
assert(modal.includes("box-shadow: var(--shadow-modal)"), "모달은 공통 깊이 토큰을 사용해야 합니다.");

console.log("color system tests: PASS");
