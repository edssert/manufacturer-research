/**
 * 주석이 현재 코드 구조와 프로젝트의 주석 작성 규칙을 따르는지 검증한다.
 *
 * 검사 범위는 앱·테스트 JavaScript, CSS, 루트 HTML, 빌드·자산 스크립트다.
 * 데이터 원문과 문서·변경 기록은 서로 다른 작성 규칙을 가지므로 제외한다.
 *
 * 검사 항목:
 *   1) 파일과 심볼을 함께 언급한 교차 참조의 정의 위치
 *   2) 호출 형태로 언급한 함수의 존재 여부
 *   3) 저장소 상대 경로의 존재 여부
 *   4) BEM 형태로 언급한 CSS 클래스의 존재 여부
 *   5) 요청자·임시 출처·수정 이력·버전·날짜를 주석에 기록한 표기
 *
 * 실행: node public/tests/comment-audit.mjs
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const PUBLIC = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROOT = join(PUBLIC, "..");
const INDEX = join(ROOT, "index.html");
const norm = path => relative(ROOT, path).split("\\").join("/");

function walk(dir, extensions, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, extensions, out);
    else if (extensions.some(extension => name.endsWith(extension))) out.push(path);
  }
  return out;
}

function splitComment(text, firstLine) {
  return text.split(/\r?\n/).map((line, index) => ({
    line: firstLine + index,
    text: line.trim(),
  }));
}

/** 문자열 리터럴 안의 주석 모양은 제외하고 JS/CSS 주석만 추출한다. */
function collectSlashComments(source) {
  const comments = [];
  let line = 1;
  let quote = null;

  for (let index = 0; index < source.length;) {
    const char = source[index];
    const next = source[index + 1];

    if (char === "\n") {
      line += 1;
      index += 1;
      continue;
    }

    if (quote) {
      if (char === "\\") {
        index += 2;
      } else {
        if (char === quote) quote = null;
        index += 1;
      }
      continue;
    }

    if (char === "\"" || char === "'" || char === "`") {
      quote = char;
      index += 1;
      continue;
    }

    if (char === "/" && next === "/") {
      const end = source.indexOf("\n", index);
      comments.push(...splitComment(source.slice(index, end < 0 ? source.length : end), line));
      index = end < 0 ? source.length : end;
      continue;
    }

    if (char === "/" && next === "*") {
      const startLine = line;
      const end = source.indexOf("*/", index + 2);
      const stop = end < 0 ? source.length : end + 2;
      const comment = source.slice(index, stop);
      comments.push(...splitComment(comment, startLine));
      line += (comment.match(/\n/g) || []).length;
      index = stop;
      continue;
    }

    index += 1;
  }

  return comments;
}

function collectHtmlComments(source) {
  const comments = [];
  let index = 0;
  let line = 1;

  while (index < source.length) {
    const start = source.indexOf("<!--", index);
    if (start < 0) break;
    line += (source.slice(index, start).match(/\n/g) || []).length;
    const end = source.indexOf("-->", start + 4);
    const stop = end < 0 ? source.length : end + 3;
    const comment = source.slice(start, stop);
    comments.push(...splitComment(comment, line));
    line += (comment.match(/\n/g) || []).length;
    index = stop;
  }

  return comments;
}

/** Python 문자열과 삼중 따옴표 블록을 건너뛰고 # 주석만 추출한다. */
function collectPythonComments(source) {
  const comments = [];
  let tripleQuote = null;

  source.split(/\r?\n/).forEach((line, lineIndex) => {
    let quote = null;
    for (let index = 0; index < line.length;) {
      const triple = line.slice(index, index + 3);

      if (tripleQuote) {
        if (triple === tripleQuote) {
          tripleQuote = null;
          index += 3;
        } else {
          index += 1;
        }
        continue;
      }

      if (quote) {
        if (line[index] === "\\") index += 2;
        else {
          if (line[index] === quote) quote = null;
          index += 1;
        }
        continue;
      }

      if (triple === "'''" || triple === '"""') {
        tripleQuote = triple;
        index += 3;
      } else if (line[index] === "'" || line[index] === '"') {
        quote = line[index];
        index += 1;
      } else if (line[index] === "#") {
        comments.push({ line: lineIndex + 1, text: line.slice(index).trim() });
        break;
      } else {
        index += 1;
      }
    }
  });

  return comments;
}

function collectCommentLines(source, file) {
  if (extname(file) === ".html") return collectHtmlComments(source);
  if (extname(file) === ".py") return collectPythonComments(source);
  return collectSlashComments(source);
}

// 금지 표현과 같은 데이터 문자열을 주석으로 오인하면 감사 자체가 신뢰할 수 없다.
const slashLexerFixture = 'const value = "upload/example 사용자 요청";\n// 사용자 요청';
const pythonLexerFixture = 'value = "upload/example 사용자 요청"\n# 사용자 요청';
const htmlLexerFixture = '<p data-note="upload/example 사용자 요청"></p><!-- 사용자 요청 -->';
if (collectSlashComments(slashLexerFixture).length !== 1
  || collectPythonComments(pythonLexerFixture).length !== 1
  || collectHtmlComments(htmlLexerFixture).length !== 1) {
  throw new Error("comment lexer가 문자열과 주석을 구분하지 못했습니다.");
}

const appJsFiles = walk(join(PUBLIC, "js"), [".js"]);
const testJsFiles = walk(join(PUBLIC, "tests"), [".mjs", ".js"]);
const cssFiles = walk(join(PUBLIC, "css"), [".css"]);
const scriptFiles = walk(join(ROOT, "scripts"), [".mjs", ".py"]);
const scriptJsFiles = scriptFiles.filter(file => file.endsWith(".mjs"));
const sourceFiles = [...appJsFiles, ...testJsFiles, ...cssFiles, ...scriptFiles, INDEX];

const symbolOwners = new Map();
for (const file of [...appJsFiles, ...testJsFiles, ...scriptJsFiles]) {
  const source = readFileSync(file, "utf8");
  const names = new Set();
  for (const match of source.matchAll(/^(?:export\s+)?(?:async\s+)?function\s+(\w+)/gm)) names.add(match[1]);
  for (const match of source.matchAll(/^(?:export\s+)?const\s+(\w+)\s*=/gm)) names.add(match[1]);
  for (const name of names) {
    if (!symbolOwners.has(name)) symbolOwners.set(name, []);
    symbolOwners.get(name).push(norm(file));
  }
}

const allCode = [...appJsFiles, ...testJsFiles, ...scriptJsFiles]
  .map(file => readFileSync(file, "utf8"))
  .join("\n");
const codeIdentifiers = new Set(allCode.match(/\b[A-Za-z_$][\w$]*\b/g) || []);

const cssClasses = new Set();
for (const file of cssFiles) {
  for (const match of readFileSync(file, "utf8").matchAll(/\.([a-zA-Z][\w-]*)/g)) {
    cssClasses.add(match[1]);
  }
}
for (const file of [...appJsFiles, INDEX]) {
  const source = readFileSync(file, "utf8");
  for (const match of source.matchAll(/class="([^"]+)"/g)) {
    for (const className of match[1].split(/\s+/)) {
      if (/^[a-z]/.test(className) && !className.includes("$")) cssClasses.add(className);
    }
  }
}

const forbiddenHistoryPatterns = [
  /\[(?:사용자\s*(?:요청|제공|업로드|확인)[^\]]*|버그\s*수정[^\]]*|개선사항[^\]]*|신규\s*추가[^\]]*|재?정정[^\]]*|수정[^\]]*|전면\s*(?:리뉴얼|재설계|교체)[^\]]*)\]/i,
  /\[[vV]\d+(?:\.\d+)*(?:\s+[^\]]*)?\]/,
  /\[(?:19|20)\d{2}-\d{1,2}(?:-\d{1,2})?(?:\s+[^\]]*)?\]/,
  /사용자(?:가|의)?\s*(?:요청|제공|업로드|확인|지적|재확인|채팅)/i,
  /사용자\s*(?:요청|제공|업로드|확인|지적|재확인|채팅)/i,
  /\bupload[\\/]/i,
  /마스터\s*스키마/i,
  /(?:값\s*(?:정정|수정)|재검증|기존\s*값|최초\s*반영|신규\s*(?:반영|추가)|부터\s*도입|예전(?:에는|엔)?|이전(?:에는|에)?\s*있)/i,
  /(?:19|20)\d{2}-\d{1,2}-\d{1,2}/,
];

const findings = { xref: [], symbol: [], path: [], css: [], history: [] };

for (const file of sourceFiles) {
  const rel = norm(file);
  const source = readFileSync(file, "utf8");

  for (const comment of collectCommentLines(source, file)) {
    const at = `${rel}:${comment.line}`;
    const text = comment.text;

    const fileRefs = [...text.matchAll(/([\w-]+(?:\.[\w-]+)*\.(?:m?js))\b/g)].map(match => match[1]);
    if (fileRefs.length) {
      const identifiers = new Set([
        ...[...text.matchAll(/\b([a-z][a-zA-Z0-9]{4,})\s*\(/g)].map(match => match[1]),
        ...[...text.matchAll(/\b([a-z]+[A-Z][a-zA-Z0-9]{3,})\b/g)].map(match => match[1]),
      ]);
      for (const identifier of identifiers) {
        const owners = symbolOwners.get(identifier);
        if (!owners) continue;
        for (const fileRef of fileRefs) {
          if (fileRef === "main.js") continue;
          if (!owners.some(owner => owner.endsWith(`/${fileRef}`) || owner === fileRef)) {
            findings.xref.push(`${at}\n    주석: "${fileRef} 의 ${identifier}"  실제: ${owners.join(", ")}\n    ${text}`);
          }
        }
      }
    }

    for (const match of text.matchAll(/\b([a-z][a-zA-Z0-9]{5,})\(\)/g)) {
      if (!codeIdentifiers.has(match[1])) findings.symbol.push(`${at}  ${match[1]}()  | ${text}`);
    }

    for (const match of text.matchAll(/\b((?:public|raw-data|docs|upload)\/[\w./-]+)/g)) {
      const path = match[1].replace(/[.,)]+$/, "");
      if (!existsSync(join(ROOT, path))) findings.path.push(`${at}  ${path}  | ${text}`);
    }

    for (const match of text.matchAll(/\.([a-z][\w-]*(?:__|--)[\w-]+)/g)) {
      if (!cssClasses.has(match[1])) findings.css.push(`${at}  .${match[1]}  | ${text}`);
    }

    if (forbiddenHistoryPatterns.some(pattern => pattern.test(text))) {
      findings.history.push(`${at}  ${text}`);
    }
  }
}

const groups = [
  ["주석이 가리킨 파일에 그 함수가 없음", findings.xref],
  ["주석이 언급했지만 코드에 없는 함수", findings.symbol],
  ["주석에 적힌 경로가 존재하지 않음", findings.path],
  ["주석이 언급했지만 정의되지 않은 CSS 클래스", findings.css],
  ["주석 규칙에서 금지한 요청·임시 출처·이력 표현", findings.history],
];

let total = 0;
for (const [title, items] of groups) {
  const uniqueItems = [...new Set(items)];
  total += uniqueItems.length;
  if (!uniqueItems.length) continue;
  console.log(`\n! ${title} (${uniqueItems.length}건)`);
  for (const item of uniqueItems) console.log(`   ${item.split("\n").join("\n   ")}`);
}

if (!total) {
  console.log(`✓ 주석 참조와 작성 규칙 통과 (${sourceFiles.length}개 소스 검사)`);
} else {
  console.log(`\n총 ${total}건의 주석 문제를 발견했습니다.`);
}
process.exit(total ? 1 : 0);
