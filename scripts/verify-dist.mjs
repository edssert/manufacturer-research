import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { lstat, readFile, readdir } from "node:fs/promises";
import { dirname, extname, isAbsolute, posix, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const DIST_DIR = resolve(PROJECT_ROOT, "dist");

const MANIFEST_FILE = "asset-manifest.json";
const REQUIRED_TOP_LEVEL = [MANIFEST_FILE, "index.html", "public"];
const REQUIRED_PUBLIC_DIRS = ["assets", "css", "js"];
const FORBIDDEN_SEGMENTS = new Set(["docs", "node_modules", "raw-data", "tests", "upload"]);
const FORBIDDEN_FILES = new Set(["package-lock.json", "package.json"]);
const ALLOWED_EXTENSIONS = Object.freeze({
  "public/assets": new Set([
    ".avif",
    ".gif",
    ".ico",
    ".jpeg",
    ".jpg",
    ".otf",
    ".png",
    ".svg",
    ".ttf",
    ".webp",
    ".woff",
    ".woff2",
  ]),
  "public/css": new Set([".css"]),
  "public/js": new Set([".js", ".json", ".mjs"]),
});

function compareText(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function toPosixPath(path) {
  return path.split(sep).join("/");
}

function isWithin(parent, child) {
  const pathFromParent = relative(parent, child);
  return (
    pathFromParent !== "" &&
    !pathFromParent.startsWith(`..${sep}`) &&
    pathFromParent !== ".." &&
    !isAbsolute(pathFromParent)
  );
}

function isIdentifierStart(character) {
  return character === "$" || character === "_" || /[A-Za-z]/.test(character);
}

function isIdentifierPart(character) {
  return isIdentifierStart(character) || /[0-9]/.test(character);
}

function readStringToken(source, start, modulePath) {
  const quote = source[start];
  let index = start + 1;
  let value = "";

  function readHexDigits(count, escapeName) {
    const raw = source.slice(index, index + count);
    assert(new RegExp(`^[a-fA-F\\d]{${count}}$`).test(raw), `${modulePath}: 잘못된 ${escapeName} 이스케이프입니다.`);
    index += count;
    return Number.parseInt(raw, 16);
  }

  while (index < source.length) {
    const character = source[index];
    if (character === quote) return { nextIndex: index + 1, value };
    assert(!/[\n\r\u2028\u2029]/.test(character), `${modulePath}: 닫히지 않은 문자열 리터럴입니다.`);

    if (character !== "\\") {
      value += character;
      index += 1;
      continue;
    }

    index += 1;
    assert(index < source.length, `${modulePath}: 닫히지 않은 문자열 이스케이프입니다.`);
    const escaped = source[index];
    index += 1;

    const simpleEscapes = {
      0: "\0",
      b: "\b",
      f: "\f",
      n: "\n",
      r: "\r",
      t: "\t",
      v: "\v",
    };
    if (Object.hasOwn(simpleEscapes, escaped)) {
      assert(
        escaped !== "0" || !/[0-9]/.test(source[index] || ""),
        `${modulePath}: 8진수 문자열 이스케이프는 허용되지 않습니다.`,
      );
      value += simpleEscapes[escaped];
    } else if (escaped === "x") {
      value += String.fromCodePoint(readHexDigits(2, "16진수"));
    } else if (escaped === "u") {
      if (source[index] === "{") {
        const closingBrace = source.indexOf("}", index + 1);
        assert(closingBrace !== -1, `${modulePath}: 닫히지 않은 유니코드 이스케이프입니다.`);
        const rawCodePoint = source.slice(index + 1, closingBrace);
        assert(/^[a-fA-F\d]{1,6}$/.test(rawCodePoint), `${modulePath}: 잘못된 유니코드 이스케이프입니다.`);
        const codePoint = Number.parseInt(rawCodePoint, 16);
        assert(codePoint <= 0x10ffff, `${modulePath}: 유니코드 코드 포인트 범위를 벗어났습니다.`);
        value += String.fromCodePoint(codePoint);
        index = closingBrace + 1;
      } else {
        value += String.fromCodePoint(readHexDigits(4, "유니코드"));
      }
    } else if (escaped === "\r" || escaped === "\n") {
      if (escaped === "\r" && source[index] === "\n") index += 1;
    } else {
      assert(!/[1-9]/.test(escaped), `${modulePath}: 8진수 문자열 이스케이프는 허용되지 않습니다.`);
      value += escaped;
    }
  }

  throw new Error(`${modulePath}: 닫히지 않은 문자열 리터럴입니다.`);
}

const REGEX_PREFIX_KEYWORDS = new Set([
  "await",
  "case",
  "delete",
  "do",
  "else",
  "in",
  "instanceof",
  "new",
  "of",
  "return",
  "throw",
  "typeof",
  "void",
  "yield",
]);

function canStartRegex(previousToken) {
  if (!previousToken) return true;
  if (previousToken.type === "identifier") return REGEX_PREFIX_KEYWORDS.has(previousToken.value);
  if (["number", "regex", "string", "template"].includes(previousToken.type)) return false;
  return ![")", "]", "}", "++", "--"].includes(previousToken.value);
}

function tokenizeJavaScript(source, modulePath) {
  const tokens = [];
  let index = 0;
  let braceDepth = 0;
  let bracketDepth = 0;
  let parenDepth = 0;

  function depth() {
    return braceDepth + bracketDepth + parenDepth;
  }

  function pushToken(type, value, start, tokenDepth = depth()) {
    tokens.push({ type, value, start, depth: tokenDepth });
  }

  function skipLineComment() {
    index += 2;
    while (index < source.length && !/[\n\r\u2028\u2029]/.test(source[index])) index += 1;
  }

  function skipBlockComment() {
    const closingComment = source.indexOf("*/", index + 2);
    assert(closingComment !== -1, `${modulePath}: 닫히지 않은 블록 주석입니다.`);
    index = closingComment + 2;
  }

  function readRegexToken(tokenFloor) {
    const start = index;
    index += 1;
    let inCharacterClass = false;

    while (index < source.length) {
      const character = source[index];
      assert(!/[\n\r\u2028\u2029]/.test(character), `${modulePath}: 닫히지 않은 정규식 리터럴입니다.`);
      if (character === "\\") {
        index += 2;
        continue;
      }
      if (character === "[") inCharacterClass = true;
      else if (character === "]") inCharacterClass = false;
      else if (character === "/" && !inCharacterClass) {
        index += 1;
        while (index < source.length && isIdentifierPart(source[index])) index += 1;
        pushToken("regex", source.slice(start, index), start);
        return;
      }
      index += 1;
    }

    const previous = tokens.length > tokenFloor ? tokens.at(-1) : null;
    throw new Error(`${modulePath}: ${previous ? "정규식" : "선행 정규식"} 리터럴이 닫히지 않았습니다.`);
  }

  function scanTemplateLiteral() {
    const start = index;
    const templateDepth = depth();
    index += 1;

    while (index < source.length) {
      const character = source[index];
      if (character === "\\") {
        index += 2;
        continue;
      }
      if (character === "`") {
        index += 1;
        pushToken("template", "template", start, templateDepth);
        return;
      }
      if (character === "$" && source[index + 1] === "{") {
        index += 2;
        braceDepth += 1;
        const tokenFloor = tokens.length;
        scanCode(braceDepth, tokenFloor);
        continue;
      }
      index += 1;
    }

    throw new Error(`${modulePath}: 닫히지 않은 템플릿 리터럴입니다.`);
  }

  function scanCode(templateExpressionDepth = null, tokenFloor = 0) {
    while (index < source.length) {
      const character = source[index];

      if (templateExpressionDepth !== null && character === "}" && braceDepth === templateExpressionDepth) {
        braceDepth -= 1;
        index += 1;
        return;
      }
      if (/\s/.test(character)) {
        index += 1;
        continue;
      }
      if (character === "/" && source[index + 1] === "/") {
        skipLineComment();
        continue;
      }
      if (character === "/" && source[index + 1] === "*") {
        skipBlockComment();
        continue;
      }
      if (character === '"' || character === "'") {
        const start = index;
        const stringToken = readStringToken(source, start, modulePath);
        index = stringToken.nextIndex;
        pushToken("string", stringToken.value, start);
        continue;
      }
      if (character === "`") {
        scanTemplateLiteral();
        continue;
      }
      if (character === "/") {
        const previous = tokens.length > tokenFloor ? tokens.at(-1) : null;
        if (canStartRegex(previous)) {
          readRegexToken(tokenFloor);
          continue;
        }
      }
      if (isIdentifierStart(character)) {
        const start = index;
        index += 1;
        while (index < source.length && isIdentifierPart(source[index])) index += 1;
        pushToken("identifier", source.slice(start, index), start);
        continue;
      }
      if (/[0-9]/.test(character)) {
        const start = index;
        index += 1;
        while (index < source.length && /[A-Za-z\d._]/.test(source[index])) index += 1;
        pushToken("number", source.slice(start, index), start);
        continue;
      }

      const start = index;
      const twoCharacters = source.slice(index, index + 2);
      const punctuator = ["++", "--", "?."].includes(twoCharacters) ? twoCharacters : character;
      index += punctuator.length;
      pushToken("punctuator", punctuator, start);

      if (character === "{") braceDepth += 1;
      else if (character === "[") bracketDepth += 1;
      else if (character === "(") parenDepth += 1;
      else if (character === "}") {
        assert(braceDepth > 0, `${modulePath}: 짝이 없는 닫는 중괄호입니다.`);
        braceDepth -= 1;
      } else if (character === "]") {
        assert(bracketDepth > 0, `${modulePath}: 짝이 없는 닫는 대괄호입니다.`);
        bracketDepth -= 1;
      } else if (character === ")") {
        assert(parenDepth > 0, `${modulePath}: 짝이 없는 닫는 괄호입니다.`);
        parenDepth -= 1;
      }
    }

    assert(templateExpressionDepth === null, `${modulePath}: 닫히지 않은 템플릿 표현식입니다.`);
  }

  scanCode();
  assert(braceDepth === 0 && bracketDepth === 0 && parenDepth === 0, `${modulePath}: 괄호가 닫히지 않았습니다.`);
  return tokens;
}

function extractModuleSpecifiers(source, modulePath) {
  const tokens = tokenizeJavaScript(source, modulePath);
  const specifiers = [];

  function addStringToken(token, description) {
    assert(token?.type === "string", `${modulePath}: ${description}에는 정적 문자열 경로가 필요합니다.`);
    specifiers.push(token.value);
  }

  function findFromSpecifier(startIndex, description) {
    for (let index = startIndex; index < tokens.length; index += 1) {
      const token = tokens[index];
      if (token.depth === 0 && token.value === ";") break;
      if (token.depth === 0 && token.type === "identifier" && token.value === "from") {
        addStringToken(tokens[index + 1], description);
        return;
      }
    }
    throw new Error(`${modulePath}: ${description}의 from 경로를 찾을 수 없습니다.`);
  }

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (token.type !== "identifier") continue;

    if (token.value === "import") {
      const previous = tokens[index - 1];
      const next = tokens[index + 1];
      if (previous?.value === "." || previous?.value === "?." || next?.value === ".") continue;

      if (next?.value === "(") {
        const argument = tokens[index + 2];
        addStringToken(argument, "dynamic import");
        const afterArgument = tokens[index + 3];
        assert(
          afterArgument?.value === ")" || afterArgument?.value === ",",
          `${modulePath}: dynamic import 경로는 하나의 정적 문자열이어야 합니다.`,
        );
        continue;
      }

      if (token.depth !== 0) continue;
      if (next?.type === "string") addStringToken(next, "side-effect import");
      else findFromSpecifier(index + 1, "import");
      continue;
    }

    if (token.value !== "export" || token.depth !== 0) continue;
    const next = tokens[index + 1];
    if (next?.value === "*") {
      findFromSpecifier(index + 2, "export-from");
    } else if (next?.value === "{") {
      let closingIndex = index + 2;
      while (
        closingIndex < tokens.length &&
        !(tokens[closingIndex].value === "}" && tokens[closingIndex].depth === 1)
      ) {
        closingIndex += 1;
      }
      assert(closingIndex < tokens.length, `${modulePath}: export 목록이 닫히지 않았습니다.`);
      if (tokens[closingIndex + 1]?.value === "from") {
        addStringToken(tokens[closingIndex + 2], "export-from");
      }
    }
  }

  return specifiers;
}

function parseHtmlAttributes(rawAttributes) {
  const attributes = new Map();
  const attributePattern = /([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  for (const match of rawAttributes.matchAll(attributePattern)) {
    attributes.set(match[1].toLowerCase(), match[2] ?? match[3] ?? match[4] ?? "");
  }
  return attributes;
}

async function assertRegularFilePath(rootDir, targetPath, label) {
  assert(isWithin(rootDir, targetPath), `${label}이 런타임 JavaScript 경계를 벗어납니다.`);
  const pathFromRoot = relative(rootDir, targetPath);
  let cursor = rootDir;

  const rootStats = await lstat(rootDir);
  assert(
    rootStats.isDirectory() && !rootStats.isSymbolicLink(),
    `런타임 JavaScript 루트가 일반 디렉터리가 아닙니다: ${rootDir}`,
  );

  for (const segment of pathFromRoot.split(sep)) {
    cursor = resolve(cursor, segment);
    let stats;
    try {
      stats = await lstat(cursor);
    } catch (error) {
      if (error?.code === "ENOENT") throw new Error(`${label}이 존재하지 않습니다: ${targetPath}`, { cause: error });
      throw error;
    }
    assert(!stats.isSymbolicLink(), `${label}에 심볼릭 링크가 포함되었습니다: ${targetPath}`);
  }

  const targetStats = await lstat(targetPath);
  assert(targetStats.isFile(), `${label}이 일반 파일이 아닙니다: ${targetPath}`);
}

function decodeModulePath(reference, context) {
  assert(reference && typeof reference === "string", `${context}: 빈 모듈 경로입니다.`);
  assert(!reference.includes("\\"), `${context}: 모듈 경로에 역슬래시를 사용할 수 없습니다: ${reference}`);
  const pathReference = reference.split(/[?#]/, 1)[0];
  assert(pathReference, `${context}: 빈 모듈 파일 경로입니다.`);
  try {
    const decoded = decodeURIComponent(pathReference);
    assert(!decoded.includes("\\"), `${context}: 디코딩된 모듈 경로에 역슬래시를 사용할 수 없습니다: ${reference}`);
    return decoded;
  } catch (error) {
    throw new Error(`${context}: 잘못 인코딩된 모듈 경로입니다: ${reference}`, { cause: error });
  }
}

async function discoverScriptEntries(rootDir, javascriptRoot) {
  const indexPath = resolve(rootDir, "index.html");
  const indexHtml = await readFile(indexPath, "utf8");
  const scriptPattern = /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi;
  const entries = [];

  for (const match of indexHtml.matchAll(scriptPattern)) {
    const attributes = parseHtmlAttributes(match[1]);
    const sourceReference = attributes.get("src");
    if (sourceReference === undefined) {
      assert(match[2].trim() === "", "index.html의 인라인 script는 배포 그래프에서 허용되지 않습니다.");
      continue;
    }

    assert(
      !/^[a-z][a-z\d+.-]*:/i.test(sourceReference) && !sourceReference.startsWith("//"),
      `외부 script 엔트리는 허용되지 않습니다: ${sourceReference}`,
    );
    assert(!sourceReference.startsWith("/"), `script 엔트리는 상대 경로여야 합니다: ${sourceReference}`);
    assert(!sourceReference.includes("&"), `HTML 엔티티가 포함된 script 경로는 허용되지 않습니다: ${sourceReference}`);

    const decodedReference = decodeModulePath(sourceReference, "index.html");
    const entryPath = resolve(rootDir, decodedReference);
    await assertRegularFilePath(javascriptRoot, entryPath, `script 엔트리 ${sourceReference}`);
    assert(
      [".js", ".mjs"].includes(extname(entryPath).toLowerCase()),
      `script 엔트리 형식이 올바르지 않습니다: ${sourceReference}`,
    );
    entries.push(entryPath);
  }

  assert(entries.length > 0, "index.html에 로컬 script 엔트리가 없습니다.");
  return [...new Set(entries)].sort(compareText);
}

async function resolveModuleDependency(rootDir, javascriptRoot, importerPath, specifier) {
  const context = toPosixPath(relative(rootDir, importerPath));
  assert(
    specifier.startsWith("./") || specifier.startsWith("../"),
    `${context}: 외부 또는 bare import는 허용되지 않습니다: ${specifier}`,
  );
  const decodedSpecifier = decodeModulePath(specifier, context);
  const dependencyPath = resolve(dirname(importerPath), decodedSpecifier);
  await assertRegularFilePath(javascriptRoot, dependencyPath, `${context}의 import ${specifier}`);
  assert(
    [".js", ".json", ".mjs"].includes(extname(dependencyPath).toLowerCase()),
    `${context}: 지원하지 않는 모듈 형식입니다: ${specifier}`,
  );
  return dependencyPath;
}

export async function collectReachableJavaScript(rootDir = PROJECT_ROOT) {
  const resolvedRoot = resolve(rootDir);
  const javascriptRoot = resolve(resolvedRoot, "public/js");
  assert(isWithin(resolvedRoot, javascriptRoot), "런타임 JavaScript 루트가 배포 경계를 벗어납니다.");

  const queue = await discoverScriptEntries(resolvedRoot, javascriptRoot);
  const visited = new Set();
  const runtimeFiles = [];

  while (queue.length > 0) {
    queue.sort(compareText);
    const modulePath = queue.shift();
    if (visited.has(modulePath)) continue;
    visited.add(modulePath);

    const artifactPath = toPosixPath(relative(resolvedRoot, modulePath));
    runtimeFiles.push({ sourcePath: modulePath, artifactPath });
    if (extname(modulePath).toLowerCase() === ".json") continue;

    const source = await readFile(modulePath, "utf8");
    const specifiers = extractModuleSpecifiers(source, artifactPath);
    for (const specifier of specifiers) {
      const dependencyPath = await resolveModuleDependency(resolvedRoot, javascriptRoot, modulePath, specifier);
      if (!visited.has(dependencyPath)) queue.push(dependencyPath);
    }
  }

  runtimeFiles.sort((a, b) => compareText(a.artifactPath, b.artifactPath));
  return runtimeFiles;
}

function validateDistBoundary(distDir) {
  const resolvedDist = resolve(distDir);
  assert(resolvedDist === DIST_DIR, `검증 대상은 프로젝트의 dist 디렉터리여야 합니다: ${resolvedDist}`);
  assert(isWithin(PROJECT_ROOT, resolvedDist), "dist가 프로젝트 루트 밖을 가리킵니다.");
  return resolvedDist;
}

async function hashFile(filePath) {
  const hash = createHash("sha256");
  await new Promise((resolveHash, rejectHash) => {
    const stream = createReadStream(filePath);
    stream.on("data", chunk => hash.update(chunk));
    stream.on("error", rejectHash);
    stream.on("end", () => resolveHash(undefined));
  });
  return hash.digest("hex");
}

async function inspectTree(rootDir) {
  const files = [];
  const directories = new Set();

  async function visit(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    entries.sort((a, b) => compareText(a.name, b.name));

    for (const entry of entries) {
      const absolutePath = resolve(directory, entry.name);
      const artifactPath = toPosixPath(relative(rootDir, absolutePath));

      assert(isWithin(rootDir, absolutePath), `artifact 경계를 벗어난 경로입니다: ${artifactPath}`);
      assert(!entry.isSymbolicLink(), `심볼릭 링크는 배포할 수 없습니다: ${artifactPath}`);

      if (entry.isDirectory()) {
        directories.add(artifactPath);
        await visit(absolutePath);
      } else if (entry.isFile()) {
        const stats = await lstat(absolutePath);
        assert(stats.isFile(), `일반 파일이 아닌 항목입니다: ${artifactPath}`);
        files.push({ absolutePath, path: artifactPath, bytes: stats.size });
      } else {
        throw new Error(`지원하지 않는 파일 시스템 항목입니다: ${artifactPath}`);
      }
    }
  }

  await visit(rootDir);
  files.sort((a, b) => compareText(a.path, b.path));
  return { directories, files };
}

function validateArtifactPath(artifactPath) {
  assert(artifactPath !== "", "빈 artifact 경로가 있습니다.");
  assert(!artifactPath.includes("\\"), `역슬래시 경로는 허용되지 않습니다: ${artifactPath}`);
  assert(!posix.isAbsolute(artifactPath), `절대 경로는 허용되지 않습니다: ${artifactPath}`);
  assert(posix.normalize(artifactPath) === artifactPath, `정규화되지 않은 경로입니다: ${artifactPath}`);
  assert(!artifactPath.startsWith("../"), `artifact 경계를 벗어난 경로입니다: ${artifactPath}`);

  const segments = artifactPath.split("/");
  for (const segment of segments) {
    assert(!FORBIDDEN_SEGMENTS.has(segment), `소스 전용 디렉터리가 포함되었습니다: ${artifactPath}`);
  }
  assert(!FORBIDDEN_FILES.has(segments.at(-1)), `프로젝트 구성 파일이 포함되었습니다: ${artifactPath}`);

  if (artifactPath === "index.html" || artifactPath === MANIFEST_FILE) return;

  const runtimeRoot = Object.keys(ALLOWED_EXTENSIONS).find(prefix => artifactPath.startsWith(`${prefix}/`));
  assert(runtimeRoot, `허용되지 않은 배포 경로입니다: ${artifactPath}`);
  assert(
    ALLOWED_EXTENSIONS[runtimeRoot].has(extname(artifactPath).toLowerCase()),
    `런타임 파일 형식이 아닙니다: ${artifactPath}`,
  );
}

async function validateIndexReferences(distDir) {
  const indexHtml = await readFile(resolve(distDir, "index.html"), "utf8");
  const referencePattern = /\b(?:href|src)\s*=\s*["']([^"']+)["']/gi;
  const missing = [];

  for (const match of indexHtml.matchAll(referencePattern)) {
    const reference = match[1].trim();
    if (!reference || reference.startsWith("#") || reference.startsWith("data:")) continue;
    if (/^[a-z][a-z\d+.-]*:/i.test(reference) || reference.startsWith("//")) continue;

    const withoutQuery = reference.split(/[?#]/, 1)[0];
    let decodedReference;
    try {
      decodedReference = decodeURIComponent(withoutQuery);
    } catch {
      throw new Error(`index.html에 잘못 인코딩된 로컬 참조가 있습니다: ${reference}`);
    }

    const artifactReference = decodedReference.replace(/^\/+/, "");
    const targetPath = resolve(distDir, artifactReference);
    assert(isWithin(distDir, targetPath), `index.html 참조가 artifact 경계를 벗어납니다: ${reference}`);

    try {
      const stats = await lstat(targetPath);
      if (!stats.isFile()) missing.push(reference);
    } catch (error) {
      if (error?.code === "ENOENT") missing.push(reference);
      else throw error;
    }
  }

  assert(missing.length === 0, `index.html의 로컬 참조가 누락되었습니다: ${missing.join(", ")}`);
}

function parseManifest(rawManifest) {
  let manifest;
  try {
    manifest = JSON.parse(rawManifest);
  } catch (error) {
    throw new Error(`asset manifest를 읽을 수 없습니다: ${error.message}`, { cause: error });
  }

  assert(manifest?.schemaVersion === 1, "지원하지 않는 asset manifest 버전입니다.");
  assert(Array.isArray(manifest.files), "asset manifest에 files 배열이 없습니다.");
  assert(Number.isSafeInteger(manifest?.totals?.files), "asset manifest의 파일 합계가 올바르지 않습니다.");
  assert(Number.isSafeInteger(manifest?.totals?.bytes), "asset manifest의 바이트 합계가 올바르지 않습니다.");
  return manifest;
}

export async function verifyDist(distDir = DIST_DIR) {
  const resolvedDist = validateDistBoundary(distDir);
  const rootStats = await lstat(resolvedDist);
  assert(rootStats.isDirectory() && !rootStats.isSymbolicLink(), "dist가 일반 디렉터리가 아닙니다.");

  const topLevel = (await readdir(resolvedDist)).sort(compareText);
  assert(
    JSON.stringify(topLevel) === JSON.stringify(REQUIRED_TOP_LEVEL),
    `dist 최상위 항목이 허용 목록과 다릅니다: ${topLevel.join(", ")}`,
  );

  const publicEntries = (await readdir(resolve(resolvedDist, "public"))).sort(compareText);
  assert(
    JSON.stringify(publicEntries) === JSON.stringify(REQUIRED_PUBLIC_DIRS),
    `dist/public 항목이 허용 목록과 다릅니다: ${publicEntries.join(", ")}`,
  );

  const { directories, files } = await inspectTree(resolvedDist);
  for (const requiredDirectory of REQUIRED_PUBLIC_DIRS) {
    assert(
      directories.has(`public/${requiredDirectory}`),
      `필수 런타임 디렉터리가 없습니다: public/${requiredDirectory}`,
    );
  }

  for (const file of files) validateArtifactPath(file.path);

  const manifestPath = resolve(resolvedDist, MANIFEST_FILE);
  const manifest = parseManifest(await readFile(manifestPath, "utf8"));
  const artifactFiles = files.filter(file => file.path !== MANIFEST_FILE);
  const seenPaths = new Set();
  let totalBytes = 0;

  for (const requiredDirectory of REQUIRED_PUBLIC_DIRS) {
    const prefix = `public/${requiredDirectory}/`;
    assert(
      artifactFiles.some(file => file.path.startsWith(prefix)),
      `필수 런타임 디렉터리가 비어 있습니다: public/${requiredDirectory}`,
    );
  }

  const reachableJavaScript = await collectReachableJavaScript(resolvedDist);
  const reachableJavaScriptPaths = reachableJavaScript.map(file => file.artifactPath);
  const deployedJavaScriptPaths = artifactFiles
    .filter(file => file.path.startsWith("public/js/"))
    .map(file => file.path);
  assert(
    JSON.stringify(deployedJavaScriptPaths) === JSON.stringify(reachableJavaScriptPaths),
    `배포 JavaScript가 엔트리 import 그래프와 다릅니다: ${deployedJavaScriptPaths.filter(path => !reachableJavaScriptPaths.includes(path)).join(", ") || "도달 가능한 모듈 누락"}`,
  );

  assert(manifest.files.length === artifactFiles.length, "asset manifest의 파일 수가 실제 artifact와 다릅니다.");

  for (let index = 0; index < artifactFiles.length; index += 1) {
    const actual = artifactFiles[index];
    const recorded = manifest.files[index];
    assert(recorded && typeof recorded === "object", `asset manifest ${index}번 항목이 올바르지 않습니다.`);
    assert(typeof recorded.path === "string", `asset manifest ${index}번 경로가 올바르지 않습니다.`);
    validateArtifactPath(recorded.path);
    assert(!seenPaths.has(recorded.path), `asset manifest 경로가 중복됩니다: ${recorded.path}`);
    seenPaths.add(recorded.path);

    assert(recorded.path === actual.path, `asset manifest 정렬 또는 경로가 다릅니다: ${recorded.path}`);
    assert(recorded.bytes === actual.bytes, `파일 크기가 asset manifest와 다릅니다: ${actual.path}`);
    assert(/^[a-f\d]{64}$/.test(recorded.sha256), `SHA-256 값이 올바르지 않습니다: ${actual.path}`);
    assert((await hashFile(actual.absolutePath)) === recorded.sha256, `SHA-256 검증에 실패했습니다: ${actual.path}`);
    totalBytes += actual.bytes;
  }

  assert(manifest.totals.files === artifactFiles.length, "asset manifest의 파일 합계가 다릅니다.");
  assert(manifest.totals.bytes === totalBytes, "asset manifest의 바이트 합계가 다릅니다.");
  await validateIndexReferences(resolvedDist);

  return { files: artifactFiles.length, bytes: totalBytes };
}

const invokedDirectly = process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url;

if (invokedDirectly) {
  try {
    const result = await verifyDist();
    console.log(`dist 검증 통과: ${result.files}개 파일, ${result.bytes}바이트`);
  } catch (error) {
    console.error(`dist 검증 실패: ${error.message}`);
    process.exitCode = 1;
  }
}
