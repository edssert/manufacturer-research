import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { createStaticServer } from "./serve.mjs";

const root = await mkdtemp(join(tmpdir(), "manufacturer-research-serve-"));
await mkdir(join(root, "public"));
await writeFile(join(root, "index.html"), "<!doctype html><title>preview</title>", "utf8");
await writeFile(join(root, "public", "app.js"), "export const ok = true;", "utf8");

const server = createStaticServer({ root, base: "/manufacturer-research/" });
await new Promise(resolveListen => server.listen(0, "127.0.0.1", () => resolveListen(undefined)));
const address = server.address();
assert(address && typeof address === "object");
const origin = `http://127.0.0.1:${address.port}`;

try {
  const index = await fetch(`${origin}/manufacturer-research/`);
  assert.equal(index.status, 200);
  assert.match(index.headers.get("content-type"), /^text\/html/);
  assert.match(await index.text(), /preview/);

  const script = await fetch(`${origin}/manufacturer-research/public/app.js`);
  assert.equal(script.status, 200);
  assert.match(script.headers.get("content-type"), /^text\/javascript/);
  assert.equal(script.headers.get("x-content-type-options"), "nosniff");

  assert.equal((await fetch(`${origin}/`)).status, 404);
  assert.equal((await fetch(`${origin}/manufacturer-research/missing.js`)).status, 404);
  assert.equal((await fetch(`${origin}/manufacturer-research/%E0%A4%A`)).status, 400);
  assert.notEqual((await fetch(`${origin}/manufacturer-research/%2e%2e/package.json`)).status, 200);
} finally {
  try {
    await new Promise((resolveClose, rejectClose) =>
      server.close(error => (error ? rejectClose(error) : resolveClose(undefined))),
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

console.log("preview server tests: PASS");
