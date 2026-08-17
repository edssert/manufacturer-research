import { createReadStream, realpathSync } from "node:fs";
import { createServer } from "node:http";
import { lstat } from "node:fs/promises";
import { dirname, extname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const MIME_TYPES = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

function isWithin(parent, child) {
  const pathFromParent = relative(parent, child);
  return (
    pathFromParent === "" ||
    (pathFromParent !== ".." && !pathFromParent.startsWith(`..${sep}`) && !isAbsolute(pathFromParent))
  );
}

function normalizeBase(base) {
  if (typeof base !== "string" || !base.startsWith("/")) throw new TypeError("base는 /로 시작해야 합니다.");
  return base.endsWith("/") ? base : `${base}/`;
}

/**
 * @param {{root:string, base?:string}} options
 * @returns {import("node:http").Server}
 */
export function createStaticServer({ root, base = "/" }) {
  const serveRoot = resolve(root);
  const canonicalRoot = realpathSync(serveRoot);
  const basePath = normalizeBase(base);

  return createServer(async (request, response) => {
    try {
      const url = new URL(request.url || "/", "http://localhost");
      const pathname = decodeURIComponent(url.pathname);
      if (!pathname.startsWith(basePath)) {
        response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Not Found");
        return;
      }

      const relativePath = pathname.slice(basePath.length) || "index.html";
      let filePath = resolve(serveRoot, relativePath);
      if (!isWithin(serveRoot, filePath)) {
        response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Forbidden");
        return;
      }

      filePath = realpathSync(filePath);
      if (!isWithin(canonicalRoot, filePath)) throw new Error("resolved path escaped serve root");
      let stats = await lstat(filePath);
      if (stats.isDirectory()) {
        filePath = resolve(filePath, "index.html");
        filePath = realpathSync(filePath);
        if (!isWithin(canonicalRoot, filePath)) throw new Error("resolved path escaped serve root");
        stats = await lstat(filePath);
      }
      if (!stats.isFile() || stats.isSymbolicLink()) throw new Error("not a regular file");

      response.writeHead(200, {
        "Content-Type": MIME_TYPES.get(extname(filePath).toLowerCase()) || "application/octet-stream",
        "Content-Length": stats.size,
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      });
      createReadStream(filePath).pipe(response);
    } catch (error) {
      const status = error instanceof URIError ? 400 : 404;
      response.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
      response.end(status === 400 ? "Bad Request" : "Not Found");
    }
  });
}

function parseArguments(argv) {
  const options = { root: "dist", base: "/manufacturer-research/", port: 4173 };
  for (let index = 0; index < argv.length; index++) {
    const name = argv[index];
    const value = argv[++index];
    if (value == null) throw new Error(`${name} 값이 필요합니다.`);
    if (name === "--root") options.root = value;
    else if (name === "--base") options.base = value;
    else if (name === "--port") options.port = Number(value);
    else throw new Error(`알 수 없는 인자: ${name}`);
  }
  if (!Number.isInteger(options.port) || options.port < 0 || options.port > 65535) {
    throw new Error("port는 0~65535 정수여야 합니다.");
  }
  return options;
}

const invokedDirectly = process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url;
if (invokedDirectly) {
  try {
    const options = parseArguments(process.argv.slice(2));
    const root = resolve(PROJECT_ROOT, options.root);
    if (!isWithin(PROJECT_ROOT, root)) throw new Error("serve root는 프로젝트 경계 안이어야 합니다.");
    const server = createStaticServer({ root, base: options.base });
    server.listen(options.port, "127.0.0.1", () => {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : options.port;
      console.log(`preview: http://127.0.0.1:${port}${normalizeBase(options.base)}`);
    });
  } catch (error) {
    console.error(`preview 시작 실패: ${error.message}`);
    process.exitCode = 1;
  }
}
