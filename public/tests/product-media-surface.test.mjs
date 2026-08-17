/** L-Acoustics K Series 제품 이미지 스테이지 범위 계약. */
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { SPEAKERS } from "../js/domains/speakers/speakers.data.js";
import { cardHTML, modalBodyHTML } from "../js/domains/speakers/speakers.view.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
let pass = 0;
let fail = 0;

function check(name, condition) {
  if (condition) pass++;
  else fail++;
  console.log(`${condition ? "PASS" : "FAIL"} — ${name}`);
}

const kSeries = SPEAKERS.filter(speaker => speaker.mk === "la" && speaker.series === "K Series");
const outsidePilot = SPEAKERS.find(speaker => speaker.mk !== "la" || speaker.series !== "K Series");

check("K Series 파일럿 레코드가 존재함", kSeries.length > 0);
check(
  "모든 K Series 카드가 흰 제품 스테이지 변경자를 가짐",
  kSeries.every(speaker => cardHTML(speaker).includes('class="card__media product-media--white"')),
);
check(
  "모든 K Series 상세가 흰 제품 스테이지 변경자를 가짐",
  kSeries.every(speaker =>
    modalBodyHTML(speaker, null, []).body.includes('class="modal__media-wrap product-media--white"'),
  ),
);
check(
  "파일럿 밖 스피커에는 흰 제품 스테이지를 강제하지 않음",
  Boolean(outsidePilot) &&
    !cardHTML(outsidePilot).includes("product-media--white") &&
    !modalBodyHTML(outsidePilot, null, []).body.includes("product-media--white"),
);

const tokensCSS = readFileSync(join(ROOT, "public/css/tokens.css"), "utf8");
const cardCSS = readFileSync(join(ROOT, "public/css/components/card.css"), "utf8");
const modalCSS = readFileSync(join(ROOT, "public/css/components/modal.css"), "utf8");
check("제품 이미지 스테이지의 단일 흰색 토큰이 정의됨", tokensCSS.includes("--product-media-surface: #fff;"));
check(
  "카드 흰 스테이지가 그라디언트와 인공 그림자를 제거함",
  cardCSS.includes(".card__media.product-media--white") &&
    cardCSS.includes("background-image: none;") &&
    cardCSS.includes(".card__media.product-media--white img { filter: none; }"),
);
check(
  "상세·확대 흰 스테이지가 같은 표면 토큰을 사용함",
  modalCSS.includes(".modal__media-wrap.product-media--white") &&
    modalCSS.includes(".media-split-pane__body-wrap.product-media--white") &&
    modalCSS.includes("background: var(--product-media-surface);"),
);
check(
  "다중 뷰 선택기가 이미지와 분리되어 모달 내부에서 가로 스크롤됨",
  /\.modal__view-switch\s*\{[^}]*position:\s*relative;[^}]*overflow-x:\s*auto;/s.test(modalCSS) &&
    modalCSS.includes(".modal__view-switch > .modal__view-btn") &&
    modalCSS.includes("flex: 0 0 auto;"),
);

console.log(`\n결과: ${pass} PASS / ${fail} FAIL`);
process.exit(fail ? 1 : 0);
