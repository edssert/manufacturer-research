import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { JSDOM } from "jsdom";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const index = readFileSync(resolve(ROOT, "index.html"), "utf8");
const bootstrap = readFileSync(resolve(ROOT, "public/js/bootstrap-preferences.js"), "utf8");

const policy = index.match(/<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]+)"/i)?.[1];
assert(policy, "CSP meta policy가 필요합니다.");
for (const directive of [
  "default-src 'self'",
  "script-src 'self'",
  "connect-src 'none'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
]) {
  assert(policy.includes(directive), `CSP directive 누락: ${directive}`);
}

const scripts = [...index.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
assert(scripts.length >= 2, "bootstrap과 main 스크립트가 필요합니다.");
assert(scripts.every(([, attributes, body]) => /\bsrc="[^"]+"/.test(attributes) && body.trim() === ""), "인라인 스크립트는 CSP에서 허용하지 않습니다.");
assert(index.indexOf("public/js/bootstrap-preferences.js") < index.indexOf("public/css/tokens.css"), "표시 선호 bootstrap은 CSS보다 먼저 로드해야 합니다.");

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "https://example.test/",
  runScripts: "outside-only",
});
dom.window.localStorage.setItem("mr-theme", "light");
dom.window.localStorage.setItem("mr-hide-media", "1");
dom.window.eval(bootstrap);
dom.window.document.dispatchEvent(new dom.window.Event("DOMContentLoaded"));
assert.equal(dom.window.document.documentElement.dataset.theme, "light");
assert(dom.window.document.body.classList.contains("hide-media"));

console.log("security policy tests: PASS");
