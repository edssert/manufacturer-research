/**
 * comment-audit.mjs — 주석이 코드/파일 구조를 정확히 가리키는지 검증.
 *
 * 주석은 대상이 옮겨져도 따라가지 않는다. 2026-07-25 전수 점검에서 11건이
 * 나왔는데 그중 7건이 이 스크립트로 잡히는 유형이었다(모듈이 분리되며 함수가
 * 다른 파일로 갔는데 주석은 옛 파일을 가리킴, 이미지 원본을 OneDrive 로
 * 이관했는데 주석은 옛 경로를 가리킴).
 *
 * 검사 4종:
 *   1) "<파일>.js 의 <함수>" 교차참조가 실제 정의 위치와 맞는가
 *   2) 주석이 호출 형태로 언급한 함수가 코드에 존재하는가
 *   3) 주석에 적힌 저장소 상대 경로가 실재하는가
 *   4) 주석이 언급한 CSS 클래스가 정의돼 있는가
 *
 * 자동으로 못 잡는 것: "이 필드는 K1 에만 있다" 같은 데이터 주장. 개수·한정
 * 표현은 사람이 데이터와 대조해야 한다(그 유형이 나머지 4건이었다).
 *
 * 실행: node public/tests/comment-audit.mjs   (프로젝트 루트에서)
 * 종료 코드: 문제 발견 시 1, 이상 없으면 0
 */
import { readFileSync, readdirSync, statSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const PUBLIC = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROOT = join(PUBLIC, "..");
const norm = p => p.split("\\").join("/").split(ROOT.split("\\").join("/") + "/").pop();

function walk(dir, exts, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, exts, out);
    else if (exts.some(e => name.endsWith(e))) out.push(p);
  }
  return out;
}

const jsFiles = walk(join(PUBLIC, "js"), [".js"]);
const cssFiles = walk(join(PUBLIC, "css"), [".css"]);
const isComment = line => /^\s*(\/\/|\*|\/\*)/.test(line);

/* ── 사전 수집 ── */
const symbolOwners = new Map();   // 함수/상수명 → 정의 파일 목록
for (const f of jsFiles) {
  const rel = norm(f);
  const src = readFileSync(f, "utf8");
  const names = new Set();
  for (const m of src.matchAll(/^(?:export\s+)?(?:async\s+)?function\s+(\w+)/gm)) names.add(m[1]);
  for (const m of src.matchAll(/^(?:export\s+)?const\s+(\w+)\s*=/gm)) names.add(m[1]);
  for (const n of names) {
    if (!symbolOwners.has(n)) symbolOwners.set(n, []);
    symbolOwners.get(n).push(rel);
  }
}
const allCode = jsFiles.map(f => readFileSync(f, "utf8")).join("\n");
const codeIdents = new Set(allCode.match(/\b[A-Za-z_$][\w$]*\b/g) || []);

const cssClasses = new Set();
for (const f of cssFiles) {
  for (const m of readFileSync(f, "utf8").matchAll(/\.([a-zA-Z][\w-]*)/g)) cssClasses.add(m[1]);
}
// JS 템플릿 문자열이 직접 붙이는 클래스도 실재로 인정
for (const m of allCode.matchAll(/class="([^"]+)"/g)) {
  for (const c of m[1].split(/\s+/)) if (/^[a-z]/.test(c) && !c.includes("$")) cssClasses.add(c);
}

/* ── 검사 ── */
const findings = { xref: [], symbol: [], path: [], css: [] };

for (const f of jsFiles) {
  const rel = norm(f);
  readFileSync(f, "utf8").split(/\r?\n/).forEach((line, i) => {
    if (!isComment(line)) return;
    const at = `${rel}:${i + 1}`;
    const text = line.trim();

    // 1) 교차참조
    const fileRefs = [...line.matchAll(/([\w-]+(?:\.[\w-]+)*\.js)\b/g)].map(m => m[1]);
    if (fileRefs.length) {
      const idents = new Set([
        ...[...line.matchAll(/\b([a-z][a-zA-Z0-9]{4,})\s*\(/g)].map(m => m[1]),
        ...[...line.matchAll(/\b([a-z]+[A-Z][a-zA-Z0-9]{3,})\b/g)].map(m => m[1]),
      ]);
      for (const id of idents) {
        const owners = symbolOwners.get(id);
        if (!owners) continue;
        for (const fr of fileRefs) {
          if (fr === "main.js") continue;   // main 은 호출만 하므로 정의가 없는 게 정상
          if (!owners.some(o => o.endsWith("/" + fr) || o === fr)) {
            findings.xref.push(`${at}\n    주석: "${fr} 의 ${id}"  실제: ${owners.join(", ")}\n    ${text}`);
          }
        }
      }
    }

    // 2) 없는 함수
    for (const m of line.matchAll(/\b([a-z][a-zA-Z0-9]{5,})\(\)/g)) {
      if (!codeIdents.has(m[1])) findings.symbol.push(`${at}  ${m[1]}()  | ${text}`);
    }

    // 3) 없는 경로
    for (const m of line.matchAll(/\b((?:public|raw-data|docs|upload)\/[\w./-]+)/g)) {
      const p = m[1].replace(/[.,)]+$/, "");
      if (!existsSync(join(ROOT, p))) findings.path.push(`${at}  ${p}  | ${text}`);
    }

    // 4) 없는 CSS 클래스 (BEM 형태만 — 일반 단어 오탐 방지)
    for (const m of line.matchAll(/\.([a-z][\w-]*(?:__|--)[\w-]+)/g)) {
      if (!cssClasses.has(m[1])) findings.css.push(`${at}  .${m[1]}  | ${text}`);
    }
  });
}

/* ── 출력 ── */
const groups = [
  ["주석이 가리킨 파일에 그 함수가 없음", findings.xref],
  ["주석이 언급했지만 코드에 없는 함수", findings.symbol],
  ["주석에 적힌 경로가 존재하지 않음", findings.path],
  ["주석이 언급했지만 정의 없는 CSS 클래스", findings.css],
];
let total = 0;
for (const [title, arr] of groups) {
  const uniq = [...new Set(arr)];
  total += uniq.length;
  if (uniq.length) {
    console.log(`\n! ${title} (${uniq.length}건)`);
    for (const line of uniq) console.log("   " + line.split("\n").join("\n   "));
  }
}
if (!total) console.log(`✓ 주석의 코드·경로 참조가 모두 실재함 (js ${jsFiles.length}개 검사)`);
else console.log(`\n총 ${total}건 — 대상이 옮겨졌는데 주석이 안 따라간 곳입니다.`);
process.exit(total ? 1 : 0);
