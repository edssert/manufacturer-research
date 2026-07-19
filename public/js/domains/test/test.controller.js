/**
 * @module domains/test/controller
 * [사용자 요청] "카드/모달의 각 부분이 실제로 어떤 클래스명/명칭에 대응하는지"
 * 확인하기 위한 개발용 라벨링 탭. 실제 제품 데이터 대신 더미 플레이스홀더
 * 값을 채운 가짜 레코드를 speakers.view.js 의 cardHTML/modalBodyHTML에
 * 그대로 통과시켜 진짜와 동일한 마크업 구조를 렌더링하고, 그 위에 각
 * 블록의 명칭(한글 설명 + CSS 클래스명)을 라벨로 오버레이한다. 정식
 * 데이터 파일/스키마 없이 정적 마크업만 다룬다.
 */
import { $ } from "../../core/dom.js";
import { registerDomain } from "../../core/router.js";
import { openModalWith } from "../../ui/modal.js";
import { cardHTML as speakerCardHTML, modalBodyHTML as speakerModalBodyHTML } from "../speakers/speakers.view.js";

// 더미 샘플 레코드: 실제 제품 데이터가 아니라 "이 값이 화면 어디에
// 표시되는지"를 보여주기 위한 플레이스홀더. transducers/wattByBand 등
// 멀티밴드 전용 항목도 모두 채워서 라벨링 대상 블록이 최대한 많이
// 나오게 한다. MFR[mk] 조회를 위해 mk는 실제 MFR 테이블에 있는 값을
// 사용하되(그래야 색상 등이 깨지지 않음), name/series 등 사람이 읽는
// 텍스트는 전부 "샘플 ○○" 형태의 더미 값으로 교체했다.
const SAMPLE = {
  id: "spk-sample-demo",
  mfr: "샘플 제조사",
  mk: "la",
  name: "샘플 모델명",
  series: "샘플 시리즈",
  throwCat: "샘플 스로우 구분",
  type: "샘플 타입",
  throw: "샘플 스로우 설명",
  lowInch: 15,
  lowQty: 2,
  crossover: "샘플 크로스오버",
  crossoverTags: ["샘플태그1", "샘플태그2"],
  spl: 999,
  cov: { h: "00°", splayList: [0.1, 1, 2, 3, 4, 5] },
  freqs: [
    { db: "-3 dB", lo: "00 Hz", hi: "00 kHz" },
    { db: "-6 dB", lo: "00 Hz", hi: "00 kHz" },
    { db: "-10 dB", lo: "00 Hz", hi: "00 kHz" }
  ],
  weight: 0,
  transducers: "샘플 트랜스듀서 구성",
  connectors: "샘플 커넥터",
  ip: "IP00 (샘플 각주 설명)",
  dims: "0000 x 000 x 000 mm / 0.0 x 0.0 x 0.0 in",
  amps: [
    {
      model: "샘플 앰프 모델",
      configs: [
        { mode: "", perCh: 0, total: 0, splByPreset: [{ preset: "[샘플 프리셋]", spl: 999 }] }
      ]
    }
  ],
  ampRaw: "샘플 앰프(0/0)",
  img: "",
  views: [{ label: "Front", src: "" }, { label: "Array", src: "" }],
  relations: { ampIds: [], accessoryIds: [] },
  watt: 0,
  wattByBand: [
    { band: "LF", watt: 0 },
    { band: "MF", watt: 0 },
    { band: "HF", watt: 0 }
  ]
};

/**
 * 라벨 배지 HTML. absolute 오버레이로 대상 요소 근처에 명칭을 표시한다.
 * @param {string} text 표시할 한글 설명(+ CSS 클래스명 병기)
 * @param {string} pos CSS로 위치 조정할 인라인 style (top/left/right/bottom)
 * @returns {string}
 */
function tag(text, pos) {
  return `<span class="test-tag" style="${pos}">${text}</span>`;
}

function mountTest() {
  const wrap = $("#view-test");
  wrap.hidden = false;
  if (!wrap.dataset.built) {
    wrap.dataset.built = "1";
    buildTestUI(wrap);
  }
}

function unmountTest() { $("#view-test").hidden = true; }

function buildTestUI(wrap) {
  const cardMarkup = speakerCardHTML(SAMPLE);

  wrap.innerHTML = `
    <div class="content-wrap">
      <p class="test-intro">
        아래 카드는 실제 제품 데이터 대신, 각 칸에 그 칸의 명칭을 직접
        적어 넣은 예시입니다. 카드를 클릭하면 모달도 같은 방식으로
        라벨링되어 열립니다.
      </p>
      <div class="test-card-wrap">
        ${cardMarkup}
      </div>
    </div>`;

  relabelCardFields(wrap);

  $("#view-test .card").addEventListener("click", () => {
    openTestModal();
  });
}

// 카드 DOM의 각 필드 텍스트를 "명칭(클래스명)" 형태로 직접 치환한다.
// 오버레이 배지 대신, 실제 그 칸에 뭐가 표시되는지를 그 칸 자체에서
// 보여주는 방식.
function relabelCardFields(wrap) {
  const card = wrap.querySelector(".card");
  if (!card) return;
  const set = (sel, text) => { const el = card.querySelector(sel); if (el) el.textContent = text; };

  set(".eyebrow__brand", "브랜드명");
  const eyebrow = card.querySelector(".eyebrow");
  if (eyebrow) {
    // eyebrow는 "브랜드 · 스로우구분 · 시리즈" 형태로 텍스트 노드와
    // span이 섞여 있어, 마지막 텍스트 노드(시리즈 부분)만 골라 치환한다.
    const lastText = [...eyebrow.childNodes].reverse().find(n => n.nodeType === 3 && n.textContent.trim());
    if (lastText) lastText.textContent = " 시리즈명";
  }
  set(".card__name", "제품명");
  card.querySelectorAll(".card__name-tag").forEach(el => { el.textContent = "타입태그"; });
  card.querySelectorAll(".card__config-tag").forEach(el => { el.textContent = "크로스오버태그"; });
  const lowBadgeB = card.querySelector(".card__low-badge b");
  if (lowBadgeB) lowBadgeB.textContent = "로우수치";
  const lowBadgeSmall = card.querySelector(".card__low-badge small");
  if (lowBadgeSmall) lowBadgeSmall.textContent = "LOW";
  set(".card__low-extra", "대역수");
  set(".spl-meter__value", "최대음압");
  // .stat-grid__key(Amp / Max·amp / Links·ch)는 원문 자체가 이미 항목명이라
  // 그대로 두고, 실제 값이 들어가는 .stat-grid__value 만 자리 표시로 치환한다.
  card.querySelectorAll(".stat-grid__value").forEach(el => { el.textContent = "값"; });
}

// .section-label 원문 텍스트 → 라벨링용 치환 텍스트 매핑.
// speakers.view.js 의 specSectionHTML()/modalBodyHTML() 이 만드는 실제
// 섹션 제목 문자열과 정확히 일치해야 치환된다.
const SECTION_LABEL_MAP = {
  "System Elements": "System Elements 섹션 (연관 액세서리)",
  "Acoustical": "Acoustical 섹션 (음향 스펙)",
  "General": "General 섹션 (크기·무게·커넥터)",
  "Amplifier Matching": "Amplifier Matching 섹션 (앰프 매칭)",
  "Preset Guide": "Preset Guide 섹션 (프리셋 구성표, K1 등 일부 모델만)"
};

// 더미 연관 액세서리: System Elements 섹션이 실제로 렌더링되게 하기 위한
// 플레이스홀더(빈 배열이면 systemElementsHTML()이 섹션 자체를 생략함).
const SAMPLE_ACCESSORIES = [
  { id: "acc-sample-1", name: "샘플 액세서리 1", type: "샘플 타입 A" },
  { id: "acc-sample-2", name: "샘플 액세서리 2", type: "샘플 타입 A" },
  { id: "acc-sample-3", name: "샘플 액세서리 3", type: "샘플 타입 B" }
];

function openTestModal() {
  const { color, head, body } = speakerModalBodyHTML(SAMPLE, () => null, SAMPLE_ACCESSORIES);
  openModalWith(color, head, body);
  relabelSectionHeadings();
  annotateModal();
}

/** .section-label 헤딩 텍스트 자체를 "원래 텍스트 (설명 — 클래스명)" 형태로 치환한다. */
function relabelSectionHeadings() {
  const modal = $("#modal");
  if (!modal) return;
  modal.querySelectorAll(".section-label").forEach(el => {
    // toggle 버튼(System Elements)은 화살표 span(.section-label__arrow)을
    // 자식으로 포함하므로, 텍스트 노드만 찾아 치환하고 화살표는 보존한다.
    const arrow = el.querySelector(".section-label__arrow");
    const rawText = arrow ? el.firstChild.textContent.trim() : el.textContent.trim();
    const replacement = SECTION_LABEL_MAP[rawText];
    if (!replacement) return;
    if (arrow) {
      el.firstChild.textContent = replacement;
    } else {
      el.textContent = replacement;
    }
  });
}

/**
 * 열린 모달 DOM에 라벨 배지를 덧붙인다(모달 마크업 자체는 건드리지 않음).
 * 고정 픽셀 좌표 대신, 대상 요소의 실제 위치(getBoundingClientRect)를
 * 읽어 그 요소 바로 위 왼쪽에 배지를 붙인다 — 데이터 양에 따라 높이가
 * 바뀌는 .footnote 같은 요소도 항상 정확한 위치에 라벨이 붙는다.
 */
function annotateModal() {
  const modal = $("#modal");
  if (!modal) return;
  modal.style.position = modal.style.position || "relative";
  const overlay = document.createElement("div");
  overlay.className = "test-modal-annotations";
  overlay.style.cssText = "position:absolute; inset:0; pointer-events:none; z-index:5;";
  modal.appendChild(overlay);

  const modalRect = modal.getBoundingClientRect();
  const placeOn = (selector, text) => {
    const el = modal.querySelector(selector);
    if (!el) return;
    const r = el.getBoundingClientRect();
    const top = r.top - modalRect.top;
    const left = r.left - modalRect.left;
    overlay.insertAdjacentHTML("beforeend", tag(text, `position:absolute; top:${top - 20}px; left:${left}px;`));
  };

  placeOn(".modal__head", "헤더 (제품명·닫기버튼)");
  placeOn(".modal__media-wrap", "사진+뷰전환탭");
  placeOn(".modal__body", "본문");
  placeOn(".footnote", "각주");
}

export function initTestDomain() {
  registerDomain("test", { label: "Test", mount: mountTest, unmount: unmountTest, count: () => 1 });
}
