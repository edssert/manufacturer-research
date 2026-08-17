/**
 * class-audit.mjs — CSS ↔ JS/HTML 클래스명 교차 검증 도구.
 *
 * 목적: BEM 리네이밍 이후 JS 템플릿/HTML 이 참조하는 클래스가 CSS 에 실제로
 * 정의되어 있는지(오타·누락 감지), 반대로 CSS 에만 있고 아무 데서도 쓰지
 * 않는 죽은 클래스가 있는지 검사한다.
 *
 * 실행: node public/tests/class-audit.mjs   (프로젝트 루트에서)
 * 종료 코드: 문제 발견 시 1, 이상 없으면 0
 */
import { readFileSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// 앱 자산은 public/ 아래에 있고 index.html 은 프로젝트 루트에 있으므로
// 두 기준 경로를 따로 유지한다.
const PUBLIC = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROOT = join(PUBLIC, "..");

/** 디렉터리를 재귀 순회하며 확장자가 일치하는 파일 경로를 모은다. */
function walk(dir, exts, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { walk(p, exts, out); continue; }
    if (exts.some(e => name.endsWith(e))) out.push(p);
  }
  return out;
}

/* ── 1) CSS 에 정의된 클래스 수집 ── */
const cssClasses = new Set();
for (const file of walk(join(PUBLIC, "css"), [".css"])) {
  const src = readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  // "}" 로 쪼갠 뒤 각 조각에서 "{" 이전(=셀렉터 부분)만 검사 → 선언 값의
  // 소수점(.5)이나 data-URI 의 점은 자연스럽게 제외된다.
  for (const chunk of src.split("}")) {
    const selector = chunk.split("{")[0];
    for (const m of selector.matchAll(/\.([a-zA-Z][\w-]*)/g)) cssClasses.add(m[1]);
  }
}

/* ── 2) JS/HTML 이 사용하는 클래스 수집 ── */
const usedClasses = new Set();
const addTokens = (str) => {
  // 템플릿 보간(${...})은 토큰이 아니므로 공백으로 치환 후 분리한다.
  // class="...${condition ? " modifier" : ""}"처럼 보간 안에 따옴표가
  // 있으면 class 속성 정규식이 그 따옴표에서 먼저 끝나므로, 남은 `${...`
  // 조각도 함께 버려 조건식의 null 등이 클래스명으로 오인되지 않게 한다.
  str.replace(/\$\{[^}]*\}/g, " ").replace(/\$\{.*$/g, " ").split(/\s+/).forEach(t => {
    if (/^[a-zA-Z][\w-]*$/.test(t)) usedClasses.add(t);
  });
};

/**
 * 문자열 리터럴은 보존하면서 실행 코드의 주석만 제거한다.
 * 템플릿 리터럴의 `${...}` 안에서는 다시 JavaScript 문맥으로 전환하므로,
 * 중첩 문자열과 주석도 바깥 코드와 같은 규칙으로 처리한다.
 */
function stripCodeComments(source) {
  const out = [];
  const stack = [{ kind: "code", templateDepth: 0 }];

  for (let i = 0; i < source.length;) {
    const frame = stack[stack.length - 1];
    const char = source[i];
    const next = source[i + 1];

    if (frame.kind === "single" || frame.kind === "double") {
      out.push(char);
      if (char === "\\" && next != null) {
        out.push(next);
        i += 2;
        continue;
      }
      i++;
      if ((frame.kind === "single" && char === "'") || (frame.kind === "double" && char === '"')) stack.pop();
      continue;
    }

    if (frame.kind === "template") {
      out.push(char);
      if (char === "\\" && next != null) {
        out.push(next);
        i += 2;
        continue;
      }
      if (char === "`") {
        stack.pop();
        i++;
        continue;
      }
      if (char === "$" && next === "{") {
        out.push(next);
        stack.push({ kind: "code", templateDepth: 1 });
        i += 2;
        continue;
      }
      i++;
      continue;
    }

    if (char === "/" && next === "/") {
      i += 2;
      while (i < source.length && source[i] !== "\n") i++;
      if (i < source.length) out.push(source[i++]);
      continue;
    }
    if (char === "/" && next === "*") {
      i += 2;
      while (i < source.length && !(source[i] === "*" && source[i + 1] === "/")) {
        if (source[i] === "\n") out.push("\n");
        i++;
      }
      i = Math.min(source.length, i + 2);
      continue;
    }
    if (char === "'") {
      out.push(char);
      stack.push({ kind: "single" });
      i++;
      continue;
    }
    if (char === '"') {
      out.push(char);
      stack.push({ kind: "double" });
      i++;
      continue;
    }
    if (char === "`") {
      out.push(char);
      stack.push({ kind: "template" });
      i++;
      continue;
    }

    out.push(char);
    if (frame.templateDepth > 0) {
      if (char === "{") frame.templateDepth++;
      if (char === "}") {
        frame.templateDepth--;
        if (frame.templateDepth === 0) stack.pop();
      }
    }
    i++;
  }

  return out.join("");
}

const regexEscape = value => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const files = [...walk(join(PUBLIC, "js"), [".js"]), join(ROOT, "index.html")];
for (const file of files) {
  const raw = readFileSync(file, "utf8");
  const src = file.endsWith(".html")
    ? raw.replace(/<!--[\s\S]*?-->/g, "")
    : stripCodeComments(raw);
  for (const m of src.matchAll(/class="([^"]*)"/g)) addTokens(m[1]);                       // HTML class 속성
  for (const m of src.matchAll(/class="([^"$]*)\$\{/g)) addTokens(m[1]);                  // class="base${modifier}"
  for (const m of src.matchAll(/className\s*=\s*["'`]([^"'`]*)["'`]/g)) addTokens(m[1]);   // el.className = "..."
  for (const m of src.matchAll(/classList\.(?:add|remove|toggle)\(\s*["']([\w-]+)["']/g)) usedClasses.add(m[1]); // classList 조작
  for (const m of src.matchAll(/(?:querySelector(?:All)?)\(\s*[`"']([^`"']+)[`"']/g)) {    // 셀렉터 문자열
    // 템플릿 보간(${cf.key} 등) 내부의 점 표기가 클래스로 오인되지 않게 먼저 제거
    const sel = m[1].replace(/\$\{[^}]*\}/g, " ");
    for (const c of sel.matchAll(/\.([a-zA-Z][\w-]*)/g)) usedClasses.add(c[1]);
  }
  // 문자열 리터럴 안의 BEM 형태 토큰 (예: clickableClass 변수에 담긴 " match-table__row--clickable")
  for (const m of src.matchAll(/["'` ]([a-zA-Z][\w-]*(?:__|--)[\w-]+)["'` ]/g)) usedClasses.add(m[1]);

  // CSS에 정의된 정확한 토큰은 템플릿 보간 바로 앞에 있어도 사용으로 센다.
  // 예: class="connection${...}", class="modal__view-btn${...}".
  for (const cssClass of cssClasses) {
    const token = new RegExp(`(^|[^\\w-])${regexEscape(cssClass)}(?=$|[^\\w-])`);
    if (token.test(src)) usedClasses.add(cssClass);
  }

  // `block__part--${modifier}`처럼 수식어가 런타임에 조합되는 경우에는 같은
  // 모듈이 실제 리터럴로 전달하는 값만 CSS 클래스 후보에 결합한다.
  const literalValues = new Set(
    [...src.matchAll(/(["'`])([a-zA-Z][\w-]*)\1/g)].map(match => match[2]),
  );
  for (const match of src.matchAll(/([a-zA-Z][\w-]*(?:__|--)[\w-]*--)\$\{\s*[a-zA-Z_$][\w$]*\s*\}/g)) {
    const prefix = match[1];
    for (const value of literalValues) {
      const candidate = prefix + value;
      if (cssClasses.has(candidate)) usedClasses.add(candidate);
    }
  }
}

/* ── 3) 비교 리포트 ── */
// className = "modal" + extraClass 처럼 문자열 연결로만 쓰이는 기본 블록,
// JS 파일명/식별자가 우연히 잡히는 토큰 등은 여기서 걸러낸다.
const IGNORE_USED = new Set([
  "js", "html", "svg", "search", "range", "modal-body-main",
  // 아래 토큰은 스캐너가 구조적 훅이나 식별자를 CSS 클래스로 인식한 결과다.
  // - card__img: 기본 블록은 .card__media img 하위 선택자로 스타일링(변경자만 CSS 정의)
  // - media-lightbox: ESC 가드가 상태 확인용으로 조회하며 별도 스타일은 필요하지 않음
  // - startIndex: JSDoc/식별자가 스캐너에 오탐된 토큰
  // - match-table__model-name(--split): 래퍼 span 훅 — 스타일은 하위 -part 가 담당
  "card__img", "media-lightbox", "startIndex",
  "match-table__model-name", "match-table__model-name--split",
]);
const missingInCss = [...usedClasses].filter(c => !cssClasses.has(c) && !IGNORE_USED.has(c) && !c.startsWith("rf-") && !c.startsWith("f-") && !c.startsWith("view-") && !c.startsWith("navcount-"));
const deadInCss = [...cssClasses].filter(c => !usedClasses.has(c));

let fail = false;
if (missingInCss.length) {
  fail = true;
  console.log("✗ JS/HTML 에서 사용되지만 CSS 에 정의가 없는 클래스:");
  missingInCss.sort().forEach(c => console.log("   -", c));
} else {
  console.log("✓ JS/HTML 이 참조하는 모든 클래스가 CSS 에 정의되어 있음");
}
if (deadInCss.length) {
  fail = true;
  console.log("✗ CSS 에 정의됐지만 JS/HTML 에서 사용되지 않는 클래스:");
  deadInCss.sort().forEach(c => console.log("   -", c));
} else {
  console.log("✓ CSS 죽은 클래스 없음");
}
console.log(`(CSS 정의 ${cssClasses.size}개 · 사용 토큰 ${usedClasses.size}개 검사)`);
process.exit(fail ? 1 : 0);
