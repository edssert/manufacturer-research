/**
 * 상세 표의 반응형 열 구조와 stylesheet 순서를 검증한다.
 * 브라우저 시각 검증을 보완하는 정적 계약으로, 선택자 범위가 넓어져 서로 다른
 * 열 구조를 덮거나 모바일 최소폭이 도달 불가능해지는 경우를 즉시 찾는다.
 */
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = relativePath => readFileSync(join(ROOT, relativePath), "utf8");
const stripComments = css => css.replace(/\/\*[\s\S]*?\*\//g, "");
const normalize = value => value.replace(/\s+/g, " ").trim();

let pass = 0;
let fail = 0;

function check(name, condition) {
  if (condition) pass++;
  else fail++;
  console.log(`${condition ? "PASS" : "FAIL"} — ${name}`);
}

function blockFor(css, header) {
  const source = stripComments(css);
  const start = source.indexOf(header);
  if (start === -1) return "";
  const open = source.indexOf("{", start + header.length);
  if (open === -1) return "";
  let depth = 1;
  for (let i = open + 1; i < source.length; i++) {
    if (source[i] === "{") depth++;
    if (source[i] === "}") depth--;
    if (depth === 0) return source.slice(open + 1, i);
  }
  return "";
}

function leafRules(css) {
  const rules = [];
  const source = stripComments(css);
  const pattern = /([^{}]+)\{([^{}]*)\}/g;
  for (const match of source.matchAll(pattern)) {
    const declarations = normalize(match[2]);
    for (const selector of match[1].split(",")) {
      rules.push({
        selector: normalize(selector),
        declarations,
        offset: match.index,
      });
    }
  }
  return rules;
}

const indexHTML = read("index.html");
const specCSS = read("public/css/components/spec-table.css");
const splitCSS = read("public/css/components/split-view.css");
const catalogCSS = read("public/css/catalog-refresh.css");
const stylesheetHrefs = [...indexHTML.matchAll(/<link\s+rel="stylesheet"\s+href="([^"]+)"/g)].map(match => match[1]);

const specIndex = stylesheetHrefs.indexOf("public/css/components/spec-table.css");
const splitIndex = stylesheetHrefs.indexOf("public/css/components/split-view.css");
check("기본 표 스타일 뒤에 Split View 보정 스타일을 로드함", specIndex !== -1 && splitIndex > specIndex);

const splitResponsive = blockFor(splitCSS, "@media (max-width: 1200px)");
const splitRules = leafRules(splitResponsive);
const splitSelectors = new Set(splitRules.map(rule => rule.selector));
check(
  "Split View 열 축소는 실제 6열 토글형 표에만 적용됨",
  splitSelectors.has(".split-view__pane .match-table--toggleable .match-table__row"),
);
check(
  "Split View 셀 축소도 실제 6열 토글형 표에만 적용됨",
  splitSelectors.has(".split-view__pane .match-table--toggleable .match-table__cell"),
);
check(
  "서로 다른 열 구조를 덮는 일반 match-table 행 선택자가 없음",
  !splitSelectors.has(".split-view__pane .match-table__row"),
);
check(
  "서로 다른 열 구조의 셀을 숨기는 일반 match-table 셀 선택자가 없음",
  !splitSelectors.has(".split-view__pane .match-table__cell") &&
    !splitSelectors.has(".split-view__pane .match-table__cell:nth-child(4)") &&
    !splitSelectors.has(".split-view__pane .match-table__cell:nth-child(5)"),
);

const collapsedColumns = splitRules.find(
  rule => rule.selector === ".split-view__pane .match-table--toggleable .match-table__row",
);
check(
  "Split View의 6열 표는 가운데 두 열만 접은 6개 트랙을 유지함",
  collapsedColumns?.declarations.includes("grid-template-columns: 1.3fr .8fr 1fr 0 0 .8fr;"),
);

const specializedSelectors = new Set(leafRules(specCSS).map(rule => rule.selector));
check(
  "2·3·4·6열 상세 표의 전용 열 계약이 모두 존재함",
  [
    ".match-table--preset-guide-delay .match-table__row",
    ".match-table--preset-guide-ratio .match-table__row",
    ".match-table--preset-guide .match-table__row",
    ".match-table--mech-safety .match-table__row",
    ".match-table--amp-view .match-table__row",
  ].every(selector => specializedSelectors.has(selector)),
);
check("사용되지 않는 3열 변경자 계약이 남아 있지 않음", !specCSS.includes("match-table--cols-3"));

const mobileRules = leafRules(blockFor(specCSS, "@media (max-width: 480px)"));
const speakerMinWidth = mobileRules.find(rule => rule.selector === ".match-table--toggleable .match-table__row");
const ampMinWidth = mobileRules.find(rule => rule.selector === ".match-table--amp-view .match-table__row");
check("모바일 Speaker 6열 표가 520px 최소폭을 가짐", speakerMinWidth?.declarations.includes("min-width: 520px;"));
check(
  "모바일 Amplifier 표의 560px 최소폭이 공통 520px 규칙보다 뒤에서 우선함",
  Boolean(speakerMinWidth) &&
    ampMinWidth?.declarations.includes("min-width: 560px;") &&
    ampMinWidth.offset > speakerMinWidth.offset,
);

const catalogRules = leafRules(catalogCSS);
const speakerGrid = catalogRules.find(
  rule =>
    rule.selector === "#spk-results .card-grid" &&
    rule.declarations.includes("grid-template-columns: repeat(auto-fill, 288px);"),
);
const speakerGroup = catalogRules.find(rule => rule.selector === "#spk-results .card-group");
const speakerHead = catalogRules.find(
  rule => rule.selector === "#spk-results .card-group__head" && rule.declarations.includes("--group-card-count"),
);
const speakerHeadSpacing = catalogRules.find(
  rule => rule.selector === "#spk-results .card-group__head" && rule.declarations.includes("--catalog-gap"),
);
const speakerGridWidth = catalogRules.find(
  rule => rule.selector === "#spk-results .card-grid" && rule.declarations.includes("--group-card-count"),
);
const speakerRoot = catalogRules.find(rule => rule.selector === "#spk-results");
const speakerContent = catalogRules.find(rule => rule.selector === '.content-wrap[data-domain="spk"]');
const speakerSpecs = catalogRules.find(rule => rule.selector === ".card-pilot__specs");
const speakerSpecValue = catalogRules.find(rule => rule.selector === ".card-pilot__value");
const speakerDrivers = catalogRules.find(rule => rule.selector === ".card-pilot__driver-list");
const speakerFrequencyTrack = catalogRules.find(rule => rule.selector === ".card-pilot__frequency-track");
check(
  "Speaker 카드는 창 너비와 무관한 288px 열을 사용함",
  speakerGrid?.declarations.includes("grid-template-columns: repeat(auto-fill, 288px);") &&
    speakerGrid?.declarations.includes("justify-content: start;"),
);
check(
  "Speaker 섹션은 중앙 4열 프레임을 공유함",
  speakerGroup?.declarations.includes("width: min(100%, 1200px);") &&
    speakerGroup?.declarations.includes("margin-left: auto;"),
);
check(
  "섹션 헤더와 카드 목록은 실제 카드 수만큼만 늘어나고 공통 좌측선에서 시작함",
  speakerHead?.declarations.includes("width: min(100%, calc(min(var(--group-card-count), 4) * 304px - 16px));") &&
    speakerGridWidth?.declarations.includes("width: min(100%, calc(min(var(--group-card-count), 4) * 304px - 16px));"),
);
check(
  "Speaker 섹션 헤더는 중복 가로 구분선을 사용하지 않음",
  catalogRules.some(rule => rule.selector === ".card-group__head" && rule.declarations.includes("border-bottom: 0;")),
);
check(
  "Speaker 카드·헤더·섹션 간격은 하나의 16px 토큰을 공유함",
  speakerRoot?.declarations.includes("--catalog-gap: 16px;") &&
    speakerGroup?.declarations.includes("margin-bottom: var(--catalog-gap);") &&
    speakerHeadSpacing?.declarations.includes("margin-bottom: var(--catalog-gap);") &&
    speakerGrid?.declarations.includes("gap: var(--catalog-gap);"),
);
check(
  "첫 Speaker 섹션도 상단 컨트롤과 16px 간격을 사용함",
  speakerContent?.declarations.includes("padding-top: 16px;"),
);
check(
  "Speaker 카드 하단 네 비교 슬롯은 같은 폭을 사용함",
  speakerSpecs?.declarations.includes("grid-template-columns: repeat(4, minmax(0, 1fr));"),
);
check(
  "Speaker 카드 하단 값은 굵은 강조를 사용하지 않음",
  speakerSpecValue?.declarations.includes("font-weight: 550;") &&
    !speakerSpecValue?.declarations.includes("font-weight: 700;"),
);
check(
  "Speaker 드라이버 대역도 같은 4등분 슬롯을 왼쪽부터 사용함",
  speakerDrivers?.declarations.includes("grid-template-columns: repeat(4, minmax(0, 1fr));"),
);
check(
  "Speaker 주파수 범위는 셀 내부가 아닌 전체 폭 바로 분리됨",
  speakerFrequencyTrack?.declarations.includes("display: block;") &&
    speakerFrequencyTrack?.declarations.includes("height: 6px;") &&
    speakerFrequencyTrack?.declarations.includes("background: var(--panel-3);"),
);
check(
  "일반 카드 그리드에는 전체 도메인을 강제로 고정하는 재정의가 없음",
  !catalogRules.some(
    rule =>
      rule.selector === ".card-grid" && rule.declarations.includes("grid-template-columns: repeat(auto-fill, 288px);"),
  ),
);

console.log(`\n결과: ${pass} PASS / ${fail} FAIL`);
process.exit(fail ? 1 : 0);
