/**
 * @module domains/speakers/view
 * 스피커 카드 + 상세 모달 마크업 생성 (순수 함수 모음).
 * "스피커가 어떻게 보이는가"만 담당하며, 범용 그리드/모달 엔진(ui/)과 분리됨.
 *
 * 관련 CSS: css/components/card.css, css/components/spec-table.css
 */
import { esc, getViews } from "../../core/dom.js";
import { MFR, TYPE_BADGE_LABEL } from "./speakers.schema.js";

/* ── SPL 게이지 스케일 (전체 데이터의 min/max 로 컨트롤러가 설정) ── */
const SPL_RANGE = { lo: 0, hi: 0 };

/**
 * SPL 게이지의 표시 범위를 설정한다 — speakers.controller.js 가 빌드 시 호출.
 * @param {number} lo 데이터 최저 SPL
 * @param {number} hi 데이터 최고 SPL
 */
export function setSplRange(lo, hi) { SPL_RANGE.lo = lo; SPL_RANGE.hi = hi; }

/** SPL 값 → 게이지 채움 비율(%) (최소 4% 보장으로 항상 보이게) */
const splPct = v => Math.max(4, Math.min(100, ((v - (SPL_RANGE.lo - 2)) / ((SPL_RANGE.hi + 2) - (SPL_RANGE.lo - 2))) * 100));

/** 앰프 항목에서 total 이 가장 큰 설정 반환 (카드 요약용) */
function bestCfg(a) { const n = a.configs.filter(c => c.total != null); return n.length ? n.reduce((x, y) => y.total > x.total ? y : x) : null; }

/** 스피커의 대표(첫 유효) 앰프 매칭 요약 { model, perCh, total } 반환 */
function primaryOf(d) { if (!d.amps || !d.amps.length) return null; for (const a of d.amps) { const c = bestCfg(a); if (c) return { model: a.model, perCh: c.perCh, total: c.total }; } return null; }

/**
 * 검색어 매칭 규칙 (이름/시리즈/제조사명).
 * @param {Object} d 스피커 레코드
 * @param {string} q 소문자 검색어
 * @returns {boolean}
 */
export function speakerMatchesQuery(d, q) {
  const s = q.toLowerCase();
  return d.name.toLowerCase().includes(s) || d.series.toLowerCase().includes(s) || MFR[d.mk].name.toLowerCase().includes(s);
}

// [v1.8 리팩토링] getViews()는 amplifiers.view.js 와 동일한 로직이라
// js/core/dom.js 공통 유틸로 추출됨 — 위 import 참고. 카드 호버 크로스페이드·
// 모달 Front/Rear 버튼 모두 이 함수 하나로 개수를 신경 쓰지 않고 동작한다 —
// 새 스피커에 뷰를 추가할 때 데이터에 views 배열만 채우면 된다.

/**
 * transducers 원본 문자열에서 로우 드라이버 외 나머지 대역 수를 센다.
 * 카드는 폭이 좁아 "LC: 2 × 18″ · LF: 4 × 15″ · MF: 8 × 8″ · HF: 6 × …" 같은
 * 전체 텍스트를 다 담기 어려우므로, 카드에는 가장 중요한 로우 드라이버
 * (lowInch/lowQty)만 색상 강조 박스로 크게 보여주고, 나머지 대역은 "+N band"
 * 처럼 개수만 짧게 알려준다. 전체 상세는 모달의 Transducers 행(원본 그대로
 * 표시)에서 확인한다.
 * @param {string} raw 원본 transducers 문자열
 * @returns {number} 로우 1개를 제외한 나머지 대역(가운데점으로 구분된 항목) 개수
 */
function otherBandCount(raw) {
  if (!raw) return 0;
  const parts = raw.split("·").map(s => s.trim()).filter(Boolean);
  return Math.max(0, parts.length - 1);
}

/**
 * transducers 원본 문자열("LF: 2 × 15″ · MF: 4 × 6.5″ · HF: 3 × 3″")을
 * [{band, detail}, ...] 로 분리한다 — 모달의 Low Driver 자리에 밴드별
 * 배지+값 리스트(Frequency Response 와 동일한 freq-list 패턴)로 보여주기
 * 위함(modalBodyHTML 참고). 각 항목은 첫 ":" 를 기준으로 라벨/값을
 * 나눈다 — "LF front: 1 × 15″"처럼 라벨에 공백이 섞인 경우도 첫 콜론
 * 앞부분을 그대로 라벨로 쓰므로 문제없다.
 * @param {string} raw 원본 transducers 문자열
 * @returns {{band: string, detail: string}[]} 콜론이 없는 항목은 건너뜀
 */
function parseTransducerBands(raw) {
  if (!raw) return [];
  return raw.split("·").map(s => s.trim()).filter(Boolean).map(part => {
    const i = part.indexOf(":");
    if (i === -1) return null;
    return { band: part.slice(0, i).trim(), detail: part.slice(i + 1).trim() };
  }).filter(Boolean);
}

/**
 * 2-way 이상(멀티밴드) 스피커의 Low Driver 자리를 대체하는 half 행 객체.
 * K1 처럼 LF/MF/HF 등 여러 대역을 가진 스피커는 로우 대역 하나만 보여주는
 * "Low Driver" 보다 전체 대역 구성이 훨씬 유용한 정보이므로, 같은 자리
 * (Max SPL 과 짝을 이루는 첫 half 셀)에 Frequency Response 와 동일한
 * 배지+값 리스트(freq-list/freq-badge)로 밴드별 구성을 보여준다.
 * 파싱에 실패하면(parseTransducerBands 가 빈 배열 반환) 원본 문자열을
 * 그대로 값으로 표시해 정보 유실을 막는다.
 * @param {string} raw 원본 transducers 문자열
 * @returns {Object} 행 객체 (serializeSpecRows 참고)
 */
function transducerBandsRow(raw) {
  const bands = parseTransducerBands(raw);
  if (!bands.length) return specRow("Transducers", raw);
  const lines = bands.map(b =>
    `<div class="freq-list__row"><span class="freq-badge freq-badge--auto">${esc(b.band)}</span><span class="freq-list__val">${esc(b.detail)}</span></div>`
  ).join("");
  return { key: `<div class="spec-table__key">Transducers</div>`, value: `<div class="spec-table__value freq-list">${lines}</div>`, full: false, pin: null };
}

/**
 * 스피커 카드 1장의 HTML 을 생성한다.
 * @param {Object} d 스피커 레코드
 * @returns {string} .card 마크업
 */
export function cardHTML(d) {
  const M = MFR[d.mk], color = M.color;
  const p = primaryOf(d);
  // [사용자 요청] "N개 앰프·모드 옵션 · 탭하여 전체 보기" 힌트 줄 제거 —
  // 카드 높이를 앰프 탭과 통일하는 기준으로 삼기 위해 삭제. 옵션 전체 목록은
  // 모달에서 여전히 확인 가능(정보 유실 없음).
  // [사용자 요청] Meyer Sound PANTHER/LEOPARD/TIGRA/LINA 처럼 자체 DSP 앰프를
  // 내장한(파워드) 스피커는 외부 앰프 매칭 자체가 없는 게 정상 스펙이라,
  // 데이터 미입력을 뜻하는 "— 미지정"으로 보이면 오해를 준다 — d.selfPowered
  // 플래그가 있으면 "Self-Powered"로 명시한다(영어 표기, 사용자 요청).
  const ampBlock = p ? `
    <div class="stat-grid">
      <!-- [사용자 요청] Amp 모델명(D40/D80 등)도 Self-Powered 와 동일하게
           전역 accent 대신 제조사 색을 따라간다(stat-grid__value--mfr,
           card.css 참고) — d&b/Meyer 카드에서 그 브랜드색으로 표시. -->
      <div class="stat-grid__cell"><span class="stat-grid__key">Amp</span><span class="stat-grid__value stat-grid__value--mfr">${esc(p.model)}</span></div>
      <div class="stat-grid__cell"><span class="stat-grid__key">Max / amp</span><span class="stat-grid__value">${p.total}<small> ea</small></span></div>
      <div class="stat-grid__cell"><span class="stat-grid__key">Links / ch</span><span class="stat-grid__value">${p.perCh}</span></div>
    </div>`
    : d.selfPowered
      // [사용자 요청] Self-Powered 는 전역 accent(앰버) 대신 제조사 색
      // (stat-grid__value--mfr, card.css 참고)을 따라간다 — d&b/Meyer
      // 카드에서도 그 브랜드색으로 보여야 자연스럽다는 요청.
      ? `<div class="stat-grid"><div class="stat-grid__cell"><span class="stat-grid__key">Amp</span><span class="stat-grid__value stat-grid__value--mfr">Self-Powered</span></div></div>`
      : `<div class="stat-grid"><div class="stat-grid__cell"><span class="stat-grid__key">Amp</span><span class="stat-grid__value stat-grid__value--na">— 미지정</span></div></div>`;
  // 뷰가 2개 이상(Front/Rear, Front/Array 등)인 모델만 호버 시 첫→두 번째
  // 뷰로 크로스페이드를 적용한다(카드는 좁아 세 번째 이상은 모달에서만 확인).
  // 두 이미지를 겹쳐 쌓고 CSS(:hover)로 opacity 를 전환하므로 JS 상태 없이
  // 동작하며, 뷰가 1개뿐인 모델은 기존과 동일하게 이미지 1장만 렌더링된다.
  // [사용자 요청 — K1] 모달 안 뷰 순서(Horizontal/Vertical/Array...)는
  // 그대로 두되, 카드 hover 대상만 개별적으로 다른 뷰를 쓰고 싶은 모델을
  // 위해 d.cardHoverView(뷰 label 문자열)를 두면 그 label 의 뷰를 hover
  // 대상으로 쓴다. 없으면 기존과 동일하게 views[1](두 번째 뷰)을 쓴다.
  // 스피커마다 필요한 hover 규칙이 다를 수 있어 이 필드가 없는 모델은
  // 영향받지 않는다.
  const views = getViews(d);
  const hoverView = (d.cardHoverView && views.find(v => v.label === d.cardHoverView)) || views[1];
  const media = views.length
    ? (views.length > 1 && hoverView
        ? `<img class="card__img card__img--front" loading="lazy" src="${views[0].src}" alt="${esc(d.name)}"><img class="card__img card__img--back" loading="lazy" src="${hoverView.src}" alt="${esc(d.name)} ${esc(hoverView.label)}">`
        : `<img class="card__img" loading="lazy" src="${views[0].src}" alt="${esc(d.name)}">`)
    : `<div class="card__noimg">◢</div>`;
  // 드라이버 구성: 텍스트 나열 대신 로우 드라이버(lowInch/lowQty)만 제조사
  // 색상 강조 박스로 표시하고, 나머지 대역은 개수만 짧게 덧붙인다. 텍스트
  // 축약으로 한 줄에 욱여넣던 이전 방식(잘림 문제)을 대체한다.
  const extra = otherBandCount(d.transducers);
  const lowBadge = d.lowInch != null
    ? `<span class="card__low-badge"><b>${d.lowQty ? esc(d.lowQty) + "×" : ""}${esc(d.lowInch)}″</b><small>LOW</small></span>`
    : "";
  const cfg = `${lowBadge}${extra > 0 ? `<span class="card__low-extra">+${extra}개 대역</span>` : ""}`;
  // 이름(card__name) 오른쪽에 Crossover(active/passive/N-way/N-channel)
  // 요약 태그를 나란히 붙인다 — Type 라벨("Constant Curvature Line" 등
  // 긴 텍스트)만 별도로 card__config 줄(로우 배지 옆, 우측 정렬)로 내린다
  // (cardTagsHTML 설명 참고, 사용자 요청: 이름 압박 방지는 Type 태그만
  // 내리는 것으로 충분 — active/N-channel 은 짧아 이름 줄에 남겨도 됨).
  const { nameRowHTML, configRowHTML } = cardTagsHTML(d);
  return `<article class="card" style="--mfr:${color}" tabindex="0" data-id="${d.id}" role="button" aria-label="${esc(d.name)} 상세">
    <div class="card__media">${media}</div>
    <div class="card__body">
      <div class="eyebrow"><span class="eyebrow__brand">${esc(M.short)}</span> · ${d.throwCat ? esc(d.throwCat) + ' · ' : ''}${esc(d.series)}</div>
      <div class="card__name-row">
        <div class="card__name">${esc(d.name)}</div>
        ${nameRowHTML}
      </div>
      <div class="card__config">${cfg}${configRowHTML}</div>
      <div class="spl-meter"><div class="spl-meter__track"><div class="spl-meter__fill" style="width:${d.spl != null ? splPct(d.spl) : 0}%"></div></div><div class="spl-meter__value">${d.spl != null ? d.spl : "—"}<small>dB SPL</small></div></div>
      <div class="card__stats">${ampBlock}</div>
    </div>
  </article>`;
}

/**
 * 제목 옆에 나란히 보여줄 Type·Crossover 해시태그 배지 목록 HTML.
 * 예전에는 이 둘이 spec-table 안의 일반 행이었는데, 표에 넣기보다 제목과
 * 함께 한눈에 보이는 "요약 태그"로 더 잘 어울려서 head/카드 이름 옆으로
 * 옮겼다. Type 은 카드 배지와 같은 축약 라벨(TYPE_BADGE_LABEL, 예: PULS)을
 * 쓰고, Crossover 는 원본 태그(crossoverTags, 예: "3-way"/"active")를 쓰되
 * 데이터 원본 순서("3-way" 다음 "active")와 달리 "능동/수동" 여부(active/
 * passive)가 "N-way" 대역 수보다 먼저 오도록 정렬한다 — 예: "Line Array,
 * active, 3-way". 모달 head(.modal__title 옆)와 카드 이름(.card__name 옆)
 * 양쪽에서 같은 데이터로 재사용하되 감싸는/배지 클래스만 다르게 지정할 수
 * 있도록 파라미터로 받는다.
 * @param {Object} d 스피커 레코드
 * @param {string} wrapClass 목록 wrapper 에 붙일 클래스 (예: "modal__title-tags")
 * @param {string} tagClass 배지 각각에 붙일 클래스 (예: "modal__title-tag")
 * @returns {string} 배지들의 HTML (표시할 게 없으면 빈 문자열)
 */
function titleTagsHTML(d, wrapClass, tagClass) {
  const typeLabel = d.type ? (TYPE_BADGE_LABEL[d.type] || d.type) : null;
  // active/passive 태그를 N-way 태그보다 앞으로 — /active|passive/ 매칭되는
  // 태그는 정렬 키 0, 나머지("3-way" 등)는 1로 줘서 stable sort 로 순서만 바꾼다.
  const crossover = [...(d.crossoverTags || [])].sort((a, b) => {
    const rank = t => /active|passive/i.test(t) ? 0 : 1;
    return rank(a) - rank(b);
  });
  const tags = [
    ...(typeLabel ? [typeLabel] : []),
    ...crossover,
  ];
  if (!tags.length) return "";
  return `<div class="${wrapClass}">${tags.map(t => `<span class="${tagClass}">${esc(t)}</span>`).join("")}</div>`;
}

/**
 * 카드 전용 축약 배지 — 모달(titleTagsHTML)은 crossoverTags 원본을 그대로
 * 보여주지만, 카드는 폭이 좁아 "passive (side LF+MF+HF)"처럼 괄호 상세가
 * 붙은 원본을 그대로 쓰면 배지 하나가 카드 폭을 넘겨 다른 요소와 겹쳐
 * 보이는 문제가 있었다(d&b SL/CL 시리즈에서 발견). 카드에서는 다음만
 * 남긴다: Type(Line Array 등) · crossoverTags 각 항목의 괄호 상세 제거
 * (예: "passive (side LF+MF+HF)" → "passive") · wayCount(있으면, 예:
 * "3-way" — normalizeCrossover 가 crossover 원본 문자열에서 파생한 값을
 * 재사용. d&b 공식 스펙 표기를 따름). "1ch"처럼 링크/채널 수 태그는 정보
 * 가치가 낮아 카드에서는 생략(모달에는 그대로 남음). GSL/KSL/XSL 처럼
 * "2ch active split"(능동 분할) + "passive (side ...)"(수동 인클로저 대역)
 * 가 함께 있는 하이브리드 크로스오버는, active 쪽 태그가 이미 있으면
 * "passive" 단독 태그가 중복 정보라 제거한다(예: CCL-SUB 처럼 passive만
 * 있는 순수 수동 스피커는 그대로 유지).
 * @param {Object} d 스피커 레코드
 * @returns {string} 배지들의 HTML (표시할 게 없으면 빈 문자열)
 */
function cardTagsHTML(d) {
  const typeLabel = d.type ? (TYPE_BADGE_LABEL[d.type] || d.type) : null;
  let crossover = (d.crossoverTags || [])
    .map(t => t.replace(/\s*\([^)]*\)\s*$/, "").trim()) // 괄호 상세 제거
    .filter(t => !/^\d+ch$/i.test(t)); // "1ch" 단독 태그는 정보 가치가 낮아 생략
  const hasActive = crossover.some(t => /active/i.test(t));
  if (hasActive) crossover = crossover.filter(t => t.toLowerCase() !== "passive");
  const sorted = [...crossover].sort((a, b) => {
    const rank = t => /active|passive/i.test(t) ? 0 : 1;
    return rank(a) - rank(b);
  });
  const wayTag = d.wayCount && d.wayCount !== "N/A" ? d.wayCount : null;
  const crossoverTags = [
    ...sorted,
    ...(wayTag && !sorted.includes(wayTag) ? [wayTag] : []),
  ];
  // [사용자 요청] 처음엔 Type 태그를 config 줄로 내렸는데, "Progressive
  // Ultra-Dense Line..."처럼 풀스펠링 Type 라벨이 오히려 config 줄(로우
  // 배지와 폭을 다투는 좁은 줄)에서 말줄임됐다 — 위/아래 줄을 맞바꿔
  // Type 태그(길지만 1개)는 이름 옆 줄(card__name-tags, 이름이 필요시
  // 양보)에 남기고, crossover 태그(active/passive/N-way — 여러 개지만
  // 각각 짧음)를 config 줄로 내린다.
  const nameRowHTML = typeLabel
    ? `<div class="card__name-tags"><span class="card__name-tag">${esc(typeLabel)}</span></div>`
    : "";
  const configRowHTML = crossoverTags.length
    ? `<div class="card__type-tag card__type-tag--group">${crossoverTags.map(t => `<span class="card__config-tag">${esc(t)}</span>`).join("")}</div>`
    : "";
  return { nameRowHTML, configRowHTML };
}

/**
 * 사양 표 행 1개의 "행 객체"를 만든다 (값이 비어 있으면 null — 행 생략).
 * [2-2 리팩토링] 이전에는 각 헬퍼가 HTML 문자열을 반환하고, 마지막에
 * fillOrphanHalfCells 가 그 문자열을 정규식으로 재파싱해 고아 half 셀을
 * 승격시키는 후처리 구조였다 — HTML 을 데이터처럼 다시 읽는 취약한
 * 방식이라 버그 이력이 있었다(공백 블록 인덱스 밀림 등). 이제 모든 행을
 * {key, value, full, pin} 객체로 모은 뒤 serializeSpecRows 가 배치 계산과
 * 직렬화를 한 번에 수행한다 — HTML 은 마지막에 딱 한 번 생성된다.
 * @param {string} label 항목명
 * @param {*} val 값
 * @param {boolean} [full] true 면 2열 전체 폭 사용
 * @param {string} [pin] 고정 쌍 그룹명 — 같은 그룹의 두 행이 항상 같은
 *   행에 나란히 붙도록 보장 (예: Weight/Dimensions)
 * @returns {Object|null} {key, value, full, pin} — 값이 없으면 null
 */
function specRow(label, val, full, pin) {
  if (val == null || String(val).trim() === "" || String(val).trim() === "nan") return null;
  return {
    key: `<div class="spec-table__key">${esc(label)}</div>`,
    value: `<div class="spec-table__value">${esc(val)}</div>`,
    full: !!full,
    pin: pin || null,
  };
}

/**
 * 행 객체 배열 → spec-table 셀 HTML 직렬화.
 * grid-column 을 지정하지 않은 half 셀은 순서대로 2열씩 자동 배치되고,
 * --full 셀(grid-column:1/-1)을 만나면 그 지점에서 새 행이 시작된다 —
 * 이 동작을 "현재 열 위치(0|1)" 추적으로 시뮬레이션해, 오른쪽 짝이 비게
 * 되는 고아 half 행은 full 로 승격시킨다(옆에 빈 회색 칸이 남는 문제
 * 방지). pin 그룹의 첫 행이 오른쪽 열에 배치될 상황이면 --full 과
 * 동일하게 강제 새 행을 시작해 고정 쌍(Weight+Dimensions, Max Watt
 * Total+By Band)이 항상 온전한 한 행을 차지하게 한다.
 * @param {Array<Object|null>} rows 행 객체 배열 (null 은 자동 제거)
 * @returns {string} spec-table__cell 들의 HTML
 */
function serializeSpecRows(rows) {
  const list = rows.filter(Boolean);
  let col = 0;         // 0: 다음 half 는 왼쪽 열, 1: 다음 half 는 오른쪽 열
  let pending = null;  // 왼쪽 열에 배치되어 아직 짝을 못 받은 half 행
  let curPin = null;   // 현재 왼쪽 열을 차지 중인 pin 그룹
  for (const r of list) {
    const startsNewPinPair = r.pin && r.pin !== curPin && col === 1;
    if (r.full || startsNewPinPair) {
      if (pending) pending.full = true;
      col = 0; pending = null; curPin = null;
      if (r.full) continue;
    }
    if (col === 0) { pending = r; col = 1; curPin = r.pin; }
    else { pending = null; col = 0; curPin = null; } // 오른쪽 열까지 채워짐 — 짝 완성
  }
  if (pending) pending.full = true; // 끝까지 짝을 못 받은 마지막 half
  return list.map(r => `<div class="spec-table__cell${r.full ? " spec-table__cell--full" : ""}">${r.key}${r.value}</div>`).join("");
}

/**
 * 섹션 라벨 + spec-table 1개 HTML (행이 하나도 없으면 섹션째 생략).
 * [2-1] 모달 사양을 Acoustical / Physical / Connectivity 3그룹으로 나눠
 * 기존 .section-label(Amplifier Matching 과 동일 스타일)로 구분한다.
 * @param {string} label 섹션 제목
 * @param {Array<Object|null>} rows 행 객체 배열
 * @returns {string}
 */
function specSectionHTML(label, rows) {
  const inner = serializeSpecRows(rows);
  if (!inner) return "";
  return `<p class="section-label">${esc(label)}</p><div class="spec-table">${inner}</div>`;
}

/**
 * dims 원본 문자열("1300 x 391 x 627 mm / 51.2 x 15.4 x 24.7 in")을
 * { mm, in } 으로 분리한다. "x"/"×" 구분자, 다양한 공백을 모두 허용한다.
 * @param {string} raw dims 원본 문자열
 * @returns {{mm: string, in: string}|null} 파싱 실패 시 null (원본을 그대로 보여주기 위함)
 */
function parseDims(raw) {
  if (!raw) return null;
  const parts = raw.split("/").map(s => s.trim());
  if (parts.length !== 2) return null;
  return { mm: parts[0], in: parts[1] };
}

/**
 * Dimensions + Weight + IP Rating 3분할 행 HTML — 항상 한 행에 3열로
 * 나란히 붙는 단일 --full 셀(spec-table__tri, spec-table.css 참고). 순서는
 * Dimensions·Weight·IP Rating — Dimensions 는 "(W×H×D)" 힌트 + mm/in
 * 토글까지 들어가 라벨이 가장 길어 잘리기 쉬우므로, 3열 중 가장 넓은 칸에
 * 배치한다(spec-table__tri 의 grid-template-columns 비율 참고). 셋 중
 * 하나라도 값이 있으면 행 전체를 렌더링하고, 값이 없는 항목은 "—"로 표시.
 * mm/in 토글(.dims-unit-switch)은 유지한다 — dims 원본이 "1300 x 391 x
 * 627 mm / 51.2 x 15.4 x 24.7 in"처럼 mm·in 을 동시에 병기해 항상 길었는데,
 * 토글로 한 번에 하나만 보여주면 값 길이가 짧아진다(버튼 클릭 동작은
 * js/ui/modal.js 의 wireDimsUnitSwitch 가 연결 — 뷰 전환 버튼
 * wireViewSwitch 와 동일한 data-attribute 토글 패턴). Weight 도 동일한
 * 패턴으로 kg/lb 토글을 붙인다 — 원본 데이터에 lb 값이 없으므로
 * kg × 2.20462 를 정수로 반올림해 계산(버튼 클릭 동작은 modal.js 의
 * wireWeightUnitSwitch).
 * @param {Object} d 스피커 레코드
 * @returns {Object[]} 행 객체 1개(셋 다 없으면 빈 배열)
 */
/**
 * [사용자 요청] d&b/L-Acoustics 는 connectors 가 대부분 단일 커넥터 타입
 * 문자열("4-point speakON")인 반면, Meyer Sound 는 "Analog: ... · Digital:
 * ... · AC: ..." 처럼 여러 인터페이스를 한 줄에 압축해 넣어 다른 브랜드보다
 * 훨씬 길어 보이는 문제가 있었다. " · " 로 구분된 "라벨: 값" 쌍 패턴이
 * 감지되면(Meyer 케이스) 각 쌍을 별도 spec-table 행(half 폭, 2열 자동배치)
 * 으로 분리해 d&b/LA 와 같은 밀도로 보이게 한다 — 패턴이 없는 값(대부분의
 * d&b/LA)은 기존처럼 "Connectors" 단일 full 행 그대로 유지.
 * @param {string|null} val d.connectors 원본 문자열
 * @returns {Object[]} 행 객체 배열 (값이 없으면 빈 배열)
 */
function connectorRows(val) {
  if (val == null || String(val).trim() === "") return [];
  const parts = String(val).split(" · ");
  // 모든 조각이 "짧은 라벨: 값" 형태(콜론이 앞부분 20자 이내에 있음)일 때만
  // 구조화된 데이터로 간주 — 그렇지 않으면 단일 문자열에 우연히 콜론이
  // 섞여도 잘못 쪼개지 않는다.
  const isLabeled = parts.length > 1 && parts.every(p => {
    const idx = p.indexOf(":");
    return idx > 0 && idx <= 20;
  });
  if (!isLabeled) return [specRow("Connectors", val, true)];
  return parts.map(p => {
    const idx = p.indexOf(":");
    return specRow(p.slice(0, idx).trim(), p.slice(idx + 1).trim());
  });
}

// [upload/*_v*.md 마스터 스키마 반영] PA-COM 8핀(A/B, C/D, E/F, G/H)이
// 각각 어느 대역으로 배선되는지 — L-Acoustics active WST 인클로저(PA-COM
// 커넥터 사용 제품)에만 존재하는 값이라 d.paComPinout 이 없는 스피커(타
// 브랜드, speakON/terminal block 커넥터 제품)에서는 행 자체가 생략된다.
function paComPinoutRow(pinout) {
  if (!pinout) return null;
  const val = `A/B: ${pinout.ab} · C/D: ${pinout.cd} · E/F: ${pinout.ef} · G/H: ${pinout.gh}`;
  return specRow("PA-COM Pinout", val, true);
}

/**
 * [사용자 요청] "IP55 (Neutrik TOP 커넥터 체결 시)"처럼 IP Rating 값에 조건부
 * 설명이 괄호로 붙으면, IP Rating 은 Dimensions/Weight 와 한 행(3열,
 * spec-table__tri)을 공유하는 좁은 칸이라 줄바꿈이 지저분해진다 — 괄호
 * 안 내용을 분리해 셀에는 위첨자 번호만 남기고, 실제 설명은 모달 하단
 * footnote 로 옮긴다. [사용자 요청, 2차] 각주가 여러 개 쌓일 수 있어 "*"
 * 대신 번호를 쓴다 — 어떤 값이 어떤 각주를 가리키는지 구분되도록.
 * @param {string} val d.ip 원본 문자열
 * @returns {{display: string, note: string|null}}
 */
function splitIpFootnote(val) {
  const m = String(val).match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  if (!m) return { display: val, note: null };
  return { display: m[1].trim(), note: m[2].trim() };
}

function weightDimsIpRow(d, footnotes) {
  const weightStr = d.weight != null ? d.weight + " kg" : null;
  const weightLbStr = d.weight != null ? Math.round(d.weight * 2.20462) + " lb" : null;
  const dims = parseDims(d.dims);
  if (weightStr == null && !dims && !d.dims && !d.ip) return [];
  const weightCell = weightStr != null ? `<div>
      <div class="spec-table__key-row">
        <div class="spec-table__key">Weight</div>
        <div class="dims-unit-switch" role="group" aria-label="무게 단위 선택">
          <button type="button" class="dims-unit-btn is-active" data-weight-unit="kg">kg</button>
          <button type="button" class="dims-unit-btn" data-weight-unit="lb">lb</button>
        </div>
      </div>
      <div class="spec-table__value" data-weight-kg>${esc(weightStr)}</div>
      <div class="spec-table__value" data-weight-lb hidden>${esc(weightLbStr)}</div>
    </div>` : `<div>
      <div class="spec-table__key">Weight</div>
      <div class="spec-table__value spec-table__value--na">—</div>
    </div>`;
  let dimsCell;
  if (dims) {
    dimsCell = `<div>
        <div class="spec-table__key-row">
          <div class="spec-table__key">Dimensions <span class="spec-table__key-hint">(W×H×D)</span></div>
          <div class="dims-unit-switch" role="group" aria-label="치수 단위 선택">
            <button type="button" class="dims-unit-btn is-active" data-dims-unit="mm">mm</button>
            <button type="button" class="dims-unit-btn" data-dims-unit="in">in</button>
          </div>
        </div>
        <div class="spec-table__value" data-dims-mm>${esc(dims.mm)}</div>
        <div class="spec-table__value" data-dims-in hidden>${esc(dims.in)}</div>
      </div>`;
  } else if (d.dims) {
    // parseDims 가 "/" 구분자를 못 찾은 비정형 데이터 — 원본을 그대로 표시.
    dimsCell = `<div>
        <div class="spec-table__key">Dimensions <span class="spec-table__key-hint">(W×H×D)</span></div>
        <div class="spec-table__value">${esc(d.dims)}</div>
      </div>`;
  } else {
    dimsCell = `<div>
        <div class="spec-table__key">Dimensions <span class="spec-table__key-hint">(W×H×D)</span></div>
        <div class="spec-table__value spec-table__value--na">—</div>
      </div>`;
  }
  let ipDisplay = "—";
  if (d.ip) {
    const { display, note } = splitIpFootnote(d.ip);
    if (note) {
      footnotes.push(note);
      ipDisplay = `${esc(display)}<sup class="spec-table__footnote-ref">${footnotes.length}</sup>`;
    } else {
      ipDisplay = esc(display);
    }
  }
  const ipCell = `<div>
      <div class="spec-table__key">IP Rating</div>
      <div class="spec-table__value${d.ip ? '' : ' spec-table__value--na'}">${d.ip ? ipDisplay : "—"}</div>
    </div>`;
  return [{
    key: "", value: `<div class="spec-table__tri">${dimsCell}${weightCell}${ipCell}</div>`,
    full: true, pin: null,
  }];
}

/**
 * RMS Power Handling(Max Watt) 행 HTML.
 * - Active(d.wattByBand 있음, 예: K1 의 LF/MF/HF RMS power handling):
 *   Total 은 Max SPL 과, By Band 는 Transducers 와 각각 짝을 이루도록
 *   acousticalRows 순서에 맞춰 일반 half 셀로 배치한다(고정 쌍 아님 —
 *   사용자 요청으로 Max SPL/Transducers/RMS Total/By Band 배치를
 *   Max SPL·RMS Total·Transducers·By Band 순으로 바꾸면서 제거).
 * - Passive(밴드별 데이터 없음, 예: K1 처럼 By Band 가 없는 스피커): Total
 *   값 하나만 있는 half 셀 — Max SPL 과 같은 행에 짝을 이루고, 대신 그
 *   다음에 오는 Transducers/Low Driver 를 --full 로 승격시켜 혼자 한 행을
 *   차지하게 한다(acousticalRows 조립부의 passive 분기 참고).
 * @param {Object} d 스피커 레코드
 * @returns {Array<Object>} 행 객체 배열 (Total 도 밴드도 없으면 빈 배열)
 */
function maxWattRows(d) {
  const hasBands = Array.isArray(d.wattByBand) && d.wattByBand.length > 0;
  const totalStr = d.watt != null ? d.watt + " W" + (d.wattVerified === false ? " (검증필요)" : "") : null;
  if (totalStr == null && !hasBands) return [];
  if (!hasBands) {
    // Passive — 밴드 데이터 없음. Max SPL 과 짝을 이루도록 half 로 둔다
    // (혼자 한 행을 차지하는 처리는 대신 Transducers/Low Driver 쪽에서 함 —
    // acousticalRows 조립부 참고).
    return [specRow("RMS Power Handling (Total)", totalStr)];
  }
  // Active — Total 은 Max SPL 과 같은 행(half), By Band 는 Transducers 와
  // 같은 행(half)에 배치된다(acousticalRows 순서 참고).
  const totalRow = {
    key: `<div class="spec-table__key">RMS Power Handling (Total)</div>`,
    value: `<div class="spec-table__value${totalStr == null ? ' spec-table__value--na' : ''}">${totalStr != null ? esc(totalStr) : "—"}</div>`,
    full: false, pin: null,
  };
  const bandLines = d.wattByBand.map(b =>
    `<div class="freq-list__row"><span class="freq-badge freq-badge--auto">${esc(b.band)}</span><span class="freq-list__val">${esc(b.watt)} W</span></div>`
  ).join("");
  const bandRow = {
    key: `<div class="spec-table__key">By Band</div>`,
    value: `<div class="spec-table__value freq-list">${bandLines}</div>`,
    full: false, pin: null,
  };
  return [totalRow, bandRow];
}

/**
 * 커버리지(수평/수직/스플레이 각도) 행들 HTML.
 * 라인어레이는 엘리먼트를 여러 각도로 조합해 수직 커버리지를 만들기
 * 때문에, splayList(Inter-element Splay · 선택 각도)가 진짜 수직 커버리지
 * 정보이고 cov.v(예: "10°")는 낱장 엘리먼트 하나의 고정된 수직 방사각일
 * 뿐이라 사실상 의미가 없다(데이터상 라인어레이류는 거의 항상 "10°"로
 * 동일). splayList 가 있으면 Vertical 행을 생략해 중복/무의미한 정보
 * 노출을 없앤다 — 서브우퍼·포인트소스처럼 splayList 가 없는 스피커는
 * cov.v 가 유일한 수직 커버리지 정보이므로 그대로 표시한다.
 * 필터 사이드바의 Vertical 슬라이더(speakers.schema.js 의 vRange)는 이
 * 표시 로직과 무관하게 그대로 유지 — cov.v 원본 데이터/normalizeAngleRanges
 * 는 건드리지 않았다.
 */
function coverageRows(cov) {
  if (!cov) return [];
  const hasSplay = cov.splayList && cov.splayList.length > 0;
  const r = [];
  if (cov.h) r.push(specRow("Horizontal", cov.h));
  if (cov.v && !hasSplay) r.push(specRow("Vertical", cov.v));
  // [사용자 요청] L2(splayList 없음, Horizontal+Vertical 이 이미 한 행에
  // half+half 로 나란히 배치됨)와 동일한 패턴으로, Splay 가 있는 스피커도
  // Horizontal 과 같은 행에 오도록 --full 을 제거(half). 각도 값이 많아
  // 길어지는 경우는 spec-table__value 의 기존 word-break 규칙이 자연스럽게
  // 줄바꿈을 처리한다.
  if (hasSplay) r.push(specRow("Inter-element Splay · 선택 각도", cov.splayList.map(a => a + "°").join("  ·  ")));
  if (cov.m) r.push(specRow("Monitor Angle", cov.m));
  return r;
}

/** 주파수 응답(-3dB/-6dB/-10dB) 목록 행 객체 (full) */
function freqRow(freqs) {
  if (!freqs || !freqs.length) return null;
  // 배지(-3 dB/-6 dB/-10 dB)와 값(Hz 범위)을 각각 별도 grid 열에 배치해
  // 배지 폭·값 시작 위치가 항목마다 다르지 않고 세로로 정렬되게 한다.
  // [버그 수정] freq-badge 는 원래 "-3 dB"/"-10 dB" 처럼 항상 짧은 라벨을
  // 전제로 48px 고정 폭을 쓰는데, Meyer Sound PANTHER/LEOPARD/TIGRA/LINA
  // 데이터에서 "Operating Range"/"Phase ±45°" 처럼 긴 라벨을 쓰면서 텍스트가
  // 배지 폭을 넘쳐 옆 값과 겹쳐 보였다. 6자를 넘는 라벨은 자동 폭
  // (freq-badge--auto, transducerBandsRow/wattByBand 등 다른 곳에서 이미
  // 쓰는 변경자)으로 전환해 라벨 길이에 안전하게 대응한다.
  const lines = freqs.map(f => {
    const badgeClass = f.db.length > 6 ? "freq-badge freq-badge--auto" : "freq-badge";
    return `<div class="freq-list__row"><span class="${badgeClass}">${esc(f.db)}</span><span class="freq-list__val">${esc(f.lo)} – ${esc(f.hi)}</span></div>`;
  }).join("");
  return { key: `<div class="spec-table__key">Frequency Response</div>`, value: `<div class="spec-table__value freq-list">${lines}</div>`, full: true, pin: null };
}

/**
 * 앰프 매칭 표(.match-table) HTML 을 생성한다.
 * resolveAmpId 로 해석되는 행에는 data-amp-id 가 붙어 클릭 시 Split View 로
 * 앰프 상세를 열 수 있다 (클릭 연결은 controller 가 담당).
 *
 * [접기/펼치기] 앰프 1개당 모드×프리셋 조합이 여러 행 나올 수 있어(예:
 * 5XT 의 LA4X SE/BTL × 프리셋들) 표가 길고 복잡해 보이는 문제를, 앰프
 * 모달의 Configurations 표(amplifiers.view.js configsBySpeakerTableHTML)와
 * 동일한 패턴으로 해결한다 — 앰프별로 대표 행(Max/amp 가 가장 큰 설정)
 * 1개만 기본 표시하고, 나머지 행은 +N 토글 버튼으로 펼친다. 클릭 영역
 * 분리: 앰프 이름(행)을 클릭하면 Split View 로 이동, +N 버튼은 펼치기만
 * 담당(버튼 클릭은 stopPropagation — js/ui/modal.js wireConfigsToggle).
 * 모든 스피커의 매칭 데이터에 자동 적용된다.
 * @param {Object} d 스피커 레코드
 * @param {Function|null} resolveAmpId (mk, model) => 앰프 id | null
 * @returns {string}
 */
export function ampMatchingHTML(d, resolveAmpId) {
  if (!d.amps || !d.amps.length) {
    // [사용자 요청] Meyer Sound 처럼 자체 DSP 앰프 내장형(파워드) 스피커는
    // 외부 앰프 매칭이 원래 없는 게 정상 스펙이므로, "데이터 미입력"으로
    // 오해되는 기본 문구 대신 명시적으로 안내한다(카드의 Amp 칸과 동일한
    // d.selfPowered 플래그 재사용).
    return d.selfPowered
      ? `<div class="data-empty-note">Self-powered loudspeaker — built-in amplification, no external amplifier required.</div>`
      : `<div class="data-empty-note">이 모델의 앰프 매칭 데이터가 아직 입력되지 않았습니다.</div>`;
  }
  let rows = "";
  d.amps.forEach((a, gi) => {
    const ampId = resolveAmpId ? resolveAmpId(d.mk, a.model) : null;
    const clickableAttr = ampId ? ` data-amp-id="${ampId}"` : "";
    // 현재 앰프 DB에 등록된 모델(ampId 해석 성공)만 클릭 가능하게 표시하고,
    // 매칭 정보는 있으나 등록되지 않은 구형/미등록 모델(LA12X 등)은
    // match-table__row--static 으로 비활성 느낌을 준다.
    const clickableClass = ampId ? " match-table__row--clickable" : " match-table__row--static";
    if (!a.configs.length) {
      rows += `<div class="match-table__row${clickableClass}"${clickableAttr}><div class="match-table__cell match-table__cell--model">${esc(a.model)}</div><div class="match-table__cell match-table__cell--mode">—</div><div class="match-table__cell"></div><div class="match-table__cell">—</div><div class="match-table__cell">—</div><div class="match-table__cell">—</div></div>`;
      return;
    }
    // 이 앰프의 모든 (모드 × 프리셋) 조합을 평탄화 — 원본 자료에 SPL 이
    // 게재된 조합만 표시(기존과 동일한 필터링).
    const flat = [];
    a.configs.forEach(c => {
      const byPreset = c.splByPreset ? c.splByPreset.filter(p => p.spl != null) : null;
      if (byPreset && byPreset.length) {
        byPreset.forEach(p => flat.push({ mode: c.mode, preset: p.preset, perCh: c.perCh, total: c.total, spl: p.spl }));
      } else if (!c.splByPreset && c.spl != null) {
        flat.push({ mode: c.mode, preset: null, perCh: c.perCh, total: c.total, spl: c.spl });
      } else if (!c.splByPreset) {
        // SPL 미게재 설정(d&b 등 — 원본이 per-config SPL 을 제공하지 않는
        // 브랜드)도 앰프·모드·Links/ch·Max/amp 매칭 정보는 유효하므로 행을
        // 표시한다(SPL 열만 "—"). 이게 없으면 d&b 스피커는 매칭표가 빈다.
        flat.push({ mode: c.mode, preset: null, perCh: c.perCh, total: c.total, spl: null });
      }
    });
    if (!flat.length) return;
    // 대표 행 = Max/amp 가 가장 큰 설정 (앰프 모달 Configurations 와 동일 규칙)
    const sorted = [...flat].sort((x, y) => (y.total || 0) - (x.total || 0));
    const rep = sorted[0];
    const rest = sorted.slice(1);
    const groupId = `spk-amp-${gi}`;
    const toggleBtn = rest.length ? `<button type="button" class="match-table__toggle-btn" data-toggle-group="${groupId}" aria-expanded="false" aria-label="설정 ${rest.length}개 더 보기">+${rest.length}</button>` : "";
    rows += `<div class="match-table__row${clickableClass}"${clickableAttr}><div class="match-table__cell match-table__cell--model" title="${esc(a.model)}"><span class="match-table__model-name">${esc(a.model)}</span>${toggleBtn}</div><div class="match-table__cell match-table__cell--mode">${rep.mode ? esc(rep.mode) : "—"}</div><div class="match-table__cell match-table__cell--preset" title="${rep.preset ? esc(rep.preset) : ""}">${rep.preset ? esc(rep.preset) : "—"}</div><div class="match-table__cell">${rep.perCh != null ? rep.perCh : "—"}</div><div class="match-table__cell">${rep.total != null ? rep.total : "—"}</div><div class="match-table__cell">${rep.spl != null ? rep.spl + " dB" : "—"}</div></div>`;
    rows += rest.map(r => `<div class="match-table__row match-table__row--sub" data-toggle-member="${groupId}" hidden><div class="match-table__cell match-table__cell--model"></div><div class="match-table__cell match-table__cell--mode">${r.mode ? esc(r.mode) : "—"}</div><div class="match-table__cell match-table__cell--preset" title="${r.preset ? esc(r.preset) : ""}">${r.preset ? esc(r.preset) : "—"}</div><div class="match-table__cell">${r.perCh != null ? r.perCh : "—"}</div><div class="match-table__cell">${r.total != null ? r.total : "—"}</div><div class="match-table__cell">${r.spl != null ? r.spl + " dB" : "—"}</div></div>`).join("");
  });
  return `<div class="match-table match-table--toggleable"><div class="match-table__row match-table__row--head"><div class="match-table__cell">Amplifier</div><div class="match-table__cell">Mode</div><div class="match-table__cell">Preset</div><div class="match-table__cell">Links/ch</div><div class="match-table__cell">Max/amp</div><div class="match-table__cell">Max SPL</div></div><div class="match-table__body">${rows}</div></div>`;
}

/**
 * 스피커와 연결된 System Elements(액세서리) 목록을 Type(Rigging/Protections
 * & Transportations 등)별로 묶어 클릭 가능한 칩으로 렌더링한다.
 * amplifiers.view.js systemElementsHTML(Rack 앰프용)과 동일한 패턴 — 실제
 * 조회(cross-ref.findAccessoriesForSpeaker)는 controller 가 미리 수행해
 * {id, name, type} 배열로 넘겨준다(view.js 는 cross-ref 를 직접 참조하지
 * 않는 순수 함수 원칙 유지). [사용자 요청] K1 등 리깅/프로텍션 부속품이
 * 많은 스피커에서 "이 스피커에 필요한 System Elements"를 한눈에 보여준다.
 * @param {{id:string, name:string, type:string}[]} accessories
 * @returns {string} 섹션 마크업 (없으면 "")
 */
function systemElementsHTML(accessories) {
  if (!accessories || !accessories.length) return "";
  const groups = new Map();
  accessories.forEach(acc => {
    const key = acc.type || "Other";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(acc);
  });
  const groupsHTML = [...groups.entries()].map(([type, items]) => `
    <div class="system-elements__group">
      <div class="system-elements__group-label">${esc(type)}</div>
      <div class="chip-group">
        ${items.map(acc => `<button type="button" class="chip" data-accessory-id="${esc(acc.id)}">${esc(acc.name)}</button>`).join("")}
      </div>
    </div>`).join("");
  return `<button type="button" class="section-label section-label--toggle" data-section-toggle="spk-system-elements" aria-expanded="false">System Elements<span class="section-label__arrow">▸</span></button><div data-section-toggle-body="spk-system-elements" hidden>${groupsHTML}</div>`;
}

/**
 * "프리셋 가이드" 섹션 HTML — 제조사 프리셋 설계 가이드(preset guide)
 * 원문에서 정리한 구성별 프리셋/음향 특성 표 + 보충 노트를 보여준다.
 * d.presets 가 없는 모델은 섹션째 생략(K1 외 모델은 아직 데이터 없음).
 * 원문: raw-data/raw-specs/<mk>/references/presets/<series>/<model>.md
 * @param {Object} d 스피커 레코드
 * @returns {string} 섹션 마크업 (없으면 "")
 */
// 긴 문장/토큰 나열의 줄바꿈 지점을 "의미 단위 경계"로 강제한다. 브라우저
// 기본 word-break(공백마다 줄바꿈 가능)에 맡기면 "reinforced LF contour,
// LF / rejection(...)"처럼 콤마 바로 뒤가 아니라 그다음 단어에서 끊기거나,
// "[K1SB_100_NC]"처럼 대괄호로 묶인 한 토큰이 갈라지는 등 읽기 어색한
// 지점에서 잘린다. 콤마(,)와 플러스(+) 뒤, 여는 괄호 앞을 제외한 모든
// 공백을 줄바꿈 불가능한 &nbsp;로 바꿔 "구(phrase)" 단위로만 묶어서
// 흐르게 하고, 그 구 사이(콤마/플러스 뒤, 괄호 앞)에만 <wbr>(줄바꿈
// "가능 지점"만 표시, 글자는 그대로)을 넣어 그 지점에서만 줄바꿈이
// 일어나게 한다. [사용자 요청] "K1-SB (beside/behind)"처럼 콤마/플러스
// 없는 문구가 폭을 넘으면 anywhere 폴백이 단어 중간에서 잘랐다 — 괄호 앞
// 공백도 break 지점으로 추가해 "K1-SB"까지는 항상 붙어있게 한다.
function wrapBreakable(text) {
  const MARK = "\u0001"; // 원문에 나올 수 없는 마커 -- 최종적으로 "<wbr> "로 치환
  // [버그 수정] "+ "(플러스+공백)를 "+"+MARK 로 바꾸면 원문의 공백 문자
  // 자체가 사라지고 그 자리에 MARK(추후 <wbr>로 치환, 그 자체는 공백을
  // 만들지 않음)만 남아 "K1 +K1-SB"처럼 붙어 보였다 — 공백을 지우지 않고
  // 그대로 둔 채 MARK 를 끼워 넣어, 최종적으로 <wbr> 다음에 (줄바꿈이
  // 일어나지 않을 땐 그냥 공백 문자로 보이는) 진짜 공백이 남게 한다.
  const marked = String(text)
    .replace(/, /g, ", " + MARK)
    .replace(/\+ /g, "+ " + MARK)
    .replace(/ \(/g, " " + MARK + "(")
    // [사용자 요청 — 각주 긴 문장 대응] 표 셀 라벨용이던 이 함수가 Preset
    // Guide 각주(notes)의 문장형 텍스트에도 쓰이게 되면서, 마침표/콜론/긴
    // 대시 뒤에도 break 지점을 추가한다 — 대부분 절·문장의 경계라 다음
    // 단어와 붙어 넘어가면 오히려 읽는 흐름이 끊겨 보였다(사용자 확인).
    .replace(/\. /g, ". " + MARK)
    .replace(/: /g, ": " + MARK)
    .replace(/ — /g, " — " + MARK);
  return esc(marked)
    .replace(/ /g, "&nbsp;")
    .split(MARK).join("<wbr>");
}

// [사용자 요청] Loudspeaker Configuration/Preset 열에서 "+" 뒤와 "(" 앞
// 공백이 있다 없다 뒤섞여 보였다("K1 + K1-SB (on top)"처럼) — 표시상으로만
// 그 두 지점의 공백을 없애 "K1 +K1-SB(on top)"처럼 붙는 쪽으로 통일한다.
// raw-data 원문(r.config/r.preset)은 건드리지 않고 렌더링 직전에만 적용.
// [주의] 공백을 지운 자리는 더 이상 wrapBreakable 의 "+ "/" (" 패턴과
// 매치되지 않아 그 지점의 <wbr>(줄바꿈 허용 지점)도 함께 사라진다 —
// "K1 +K1-SB(on top)" 전체가 줄바꿈 불가능한 한 덩어리가 되는 걸 막기
// 위해, 지운 공백 자리에 폭 없는 줄바꿈 허용 지점(​, zero-width
// space)을 대신 남겨 wrapBreakable 이후에도 그 지점에서 줄바꿈될 수 있게
// 한다.
function tightenConfigText(text) {
  return String(text).replace(/ \+ /g, "​+​").replace(/ \(/g, "​(");
}

// [사용자 요청] 참고 사항의 "출처: xxx.pdf pNN" 표기를 실제 원본 PDF로
// 바로 이동하는 링크로 바꾼다 — 단, 원본 PDF 파일이 실제로 저장소에
// 보관된 제품만(대부분 "역재구성본"이라 원본이 없음). 현재는 K1만
// 해당(K1_OM_EN.pdf, preset_guide_EN.pdf 원본 보관 확인됨). 다른 제품이
// 추가되면 이 맵에 { speakerId: { "파일명.pdf": "상대경로" } } 을 추가하면
// 된다.
const PDF_SOURCE_LINKS = {
  "spk-la-k1": {
    "K1_OM_EN.pdf": "raw-data/raw-specs/la/speakers/k-series/k1/K1_OM_EN.pdf",
    "preset_guide_EN.pdf": "raw-data/raw-specs/la/references/preset-guide-en/preset-guide-en.pdf",
  },
};

/**
 * 출처 문자열을 escape 하면서, PDF_SOURCE_LINKS 에 등록된 제품/파일명이면
 * 그 파일명 부분만 "#page=N" 링크로 바꾼다(N 은 같은 세미콜론 구간 안에서
 * 파일명 뒤에 처음 나오는 "p.NN" 값, 없으면 1페이지).
 */
function linkifySource(source, speakerId) {
  if (!source) return "";
  const map = PDF_SOURCE_LINKS[speakerId];
  if (!map) return esc(source);
  return esc(source).replace(/[\w-]+\.pdf/g, fileName => {
    const path = map[fileName];
    if (!path) return fileName;
    const idx = source.indexOf(fileName);
    const nextSemi = source.indexOf(";", idx);
    const segment = nextSemi === -1 ? source.slice(idx) : source.slice(idx, nextSemi);
    const pageMatch = segment.match(/p\.\s*(\d+)/);
    const page = pageMatch ? pageMatch[1] : "1";
    return `<a href="${path}#page=${page}" target="_blank" rel="noopener">${fileName}</a>`;
  });
}

function presetGuideHTML(d) {
  const p = d.presets;
  if (!p || !Array.isArray(p.rows) || !p.rows.length) return "";
  // [사용자 요청] Acoustic Properties 열은 원문이 길어 줄바꿈이 잦았다 —
  // 셀에는 한 줄로 들어가는 축약문(acousticShort, 원문에서 "reinforced LF
  // contour" 같은 반복 상투구를 빼고 행마다 다른 부분+수치만 남긴 것)을
  // 보여주고, 원문 전체는 마우스를 올렸을 때만 커스텀 팝오버로 보여준다
  // (raw-data 원문은 그대로 두고 표시만 축약 — CLAUDE.md 원문 보존 원칙).
  // acousticShort 가 없는(향후 다른 모델 데이터 미입력) 행은 원문을 그대로
  // 보여줘 정보 유실을 막는다.
  const rows = p.rows.map(r => {
    const short = r.acousticShort || r.acoustic;
    const acousticCell = r.acousticShort && r.acousticShort !== r.acoustic
      ? `<span class="acoustic-tip" tabindex="0">${wrapBreakable(short)}<span class="acoustic-tip__popover">${wrapBreakable(r.acoustic)}</span></span>`
      : wrapBreakable(short);
    return `
    <div class="match-table__row match-table__row--static">
      <div class="match-table__cell match-table__cell--model">${wrapBreakable(tightenConfigText(r.config))}</div>
      <div class="match-table__cell match-table__cell--preset">${wrapBreakable(tightenConfigText(r.preset))}</div>
      <div class="match-table__cell">${acousticCell}</div>
    </div>`;
  }).join("");
  // [사용자 요청 — 2차 가독성 개선] notes 항목이 { text, subs? } 객체로
  // 바뀌어(k-series.data.js 참고) subs 가 있으면 항목 안에 중첩 <ul>
  // (하위 글머리 기호, footnote--sublist)을 추가로 그린다 — Downfill/출력
  // 라우팅처럼 한 항목 안에 여러 갈래가 나열될 때 문장으로 줄줄이 잇는
  // 대신 하위 목록으로 나눠 항목 간 경계를 분명히 한다. 문자열 항목만
  // 있던 이전 데이터와도 호환되도록 문자열이면 text 로 취급한다.
  const noteItemHTML = n => {
    const item = typeof n === "string" ? { text: n } : n;
    const subsHTML = Array.isArray(item.subs) && item.subs.length
      ? `<ul class="footnote__sublist">${item.subs.map(s => `<li>${wrapBreakable(s)}</li>`).join("")}</ul>`
      : "";
    return `<li>${wrapBreakable(item.text)}${subsHTML}</li>`;
  };
  // [사용자 요청 — 3개 하위 표 통일 구조] Preset Guide 안의 표 3개(메인/
  // Matching Ratio/Delay Defaults) 모두 펼치는 즉시 바로 보이고(표 자체는
  // 더 이상 토글하지 않음), 표마다 그 밑에 "참고 사항" 토글을 하나씩 붙여
  // 총 3개의 참고 사항 토글이 생기는 구조로 통일한다(전에는 메인 표만
  // notes 토글이 있고 Delay Defaults는 열자마자 참고 사항까지 다 보이는
  // 등 표마다 패턴이 달라 일관성이 없었다는 지적). 표 아래 notes+source를
  // 만드는 공통 헬퍼로 뺀다.
  const notesBlockHTML = (notes, source, toggleId) => {
    const listHTML = Array.isArray(notes) && notes.length
      ? `<ul class="footnote footnote--list">${notes.map(noteItemHTML).join("")}</ul>`
      : "";
    const srcHTML = source ? `<div class="footnote">출처: ${linkifySource(source, d.id)}</div>` : "";
    if (!listHTML && !srcHTML) return "";
    return `<button type="button" class="section-label section-label--toggle section-label--toggle-sub" data-section-toggle="${toggleId}" aria-expanded="false">참고 사항<span class="section-label__arrow">▸</span></button>
      <div data-section-toggle-body="${toggleId}" hidden>
        ${listHTML}
        ${srcHTML}
      </div>`;
  };
  const mainNotesHTML = notesBlockHTML(p.notes, p.source, "spk-preset-guide-notes");

  // [사용자 요청] System Elements/Configurations 와 동일한 섹션 통째
  // 접기/펼치기 패턴(wireSectionToggle, ui/modal.js) — 기본 접힘 상태로
  // 시작해 모달을 열자마자 긴 표가 화면을 차지하지 않게 한다.
  // [사용자 요청 — 섹션 분리] Matching Ratio/Delay Defaults 는 원래 이
  // 함수 안 하위 토글이었으나, Preset Guide 를 열면 여전히 표가 너무
  // 많아 보인다는 지적으로 matchingRatioHTML/delayDefaultsHTML 이라는
  // 별도 함수로 빼서 Mechanical Safety 와 동급(섹션 레벨) 토글로
  // 승격했다 — 호출부(스피커 모달 조립부)에서 나란히 렌더링.
  return `<button type="button" class="section-label section-label--toggle" data-section-toggle="spk-preset-guide" aria-expanded="false">Preset Guide<span class="section-label__arrow">▸</span></button>
    <div data-section-toggle-body="spk-preset-guide" hidden>
      <div class="match-table match-table--preset-guide">
        <div class="match-table__row match-table__row--head">
          <div class="match-table__cell">Loudspeaker Configuration</div>
          <div class="match-table__cell">Preset</div>
          <div class="match-table__cell">Acoustic Properties</div>
        </div>
        <div class="match-table__body">${rows}</div>
      </div>
      ${mainNotesHTML}
    </div>`;
}

// [사용자 요청 — 섹션 분리] Preset Guide 안에 있던 "Matching Ratio & Minimum
// Line Length" 하위 토글을 Preset Guide/Mechanical Safety 와 동급인 최상위
// 섹션 토글로 승격 — Preset Guide 를 열었을 때 정보량이 너무 많다는 지적.
// notesBlockHTML 은 presetGuideHTML 안의 클로저라 재사용할 수 없어 동일한
// 모양의 참고 사항 토글을 이 함수 안에서 다시 만든다(로직 자체는 동일).
function matchingRatioHTML(d) {
  const p = d.presets;
  if (!p || !Array.isArray(p.rows) || !p.rows.length) return "";
  const ratioRows = p.rows.filter(r => r.ratio || r.minLine);
  if (!ratioRows.length) return "";
  const ratioRowsHTML = ratioRows.map(r => `
      <div class="match-table__row match-table__row--static">
        <div class="match-table__cell match-table__cell--model">${wrapBreakable(tightenConfigText(r.config))}</div>
        <div class="match-table__cell">${r.ratio ? wrapBreakable(r.ratio) : "—"}</div>
        <div class="match-table__cell">${r.minLine ? wrapBreakable(r.minLine) : "—"}</div>
      </div>`).join("");
  const notesHTML = notesToggleBlockHTML(p.ratioNotes, p.ratioSource, "spk-matching-ratio-notes", d.id);
  return `<button type="button" class="section-label section-label--toggle" data-section-toggle="spk-matching-ratio" aria-expanded="false">Matching Ratio &amp; Minimum Line Length<span class="section-label__arrow">▸</span></button>
    <div data-section-toggle-body="spk-matching-ratio" hidden>
      <div class="match-table match-table--preset-guide-ratio">
        <div class="match-table__row match-table__row--head">
          <div class="match-table__cell">Loudspeaker Configuration</div>
          <div class="match-table__cell">Recommended Ratio</div>
          <div class="match-table__cell">Minimum Line Length</div>
        </div>
        <div class="match-table__body">${ratioRowsHTML}</div>
      </div>
      ${notesHTML}
    </div>`;
}

// [사용자 요청 — 섹션 분리] Preset Guide 안에 있던 "Delay Defaults" 하위
// 토글을 matchingRatioHTML 과 동일한 이유로 최상위 섹션 토글로 승격.
function delayDefaultsHTML(d) {
  const p = d.presets;
  const dd = p && p.delayDefaults;
  if (!dd || !Array.isArray(dd.rows) || !dd.rows.length) return "";
  // [사용자 요청] 극성 정상(+)은 기본값이라 표시를 생략하고(k-series.data.js
  // 참고), 반전인 경우만 데이터에 "(−)" 로 표기된다 — wrapBreakable로
  // &nbsp;/<wbr> 처리를 마친 뒤 그 안의 "−" 기호만(괄호는 일반 색 그대로
  // 두고) 빨간 글씨 span으로 감싼다(순서 중요: wrapBreakable이 먼저
  // 끝나야 태그가 깨지지 않는다).
  // [사용자 요청 — 표 구분 기능] r.items(문자열 배열, K1/K1-SB/KS28 등
  // 엘리먼트별 값)을 각각 .delay-item span으로 감싸 나열 — CSS
  // (spec-table.css .delay-item + .delay-item)가 border-left로 위아래
  // 표 가로선과는 끊긴 짧은 세로 구분선을 그린다(텍스트 "|" 문자 대신
  // 실제 표 구분선 스타일).
  const highlightPolarityFlip = html => html.replace(/−/g, '<span class="polarity-flip">−</span>');
  const delayRowsHTML = dd.rows.map(r => {
    const itemsHTML = (r.items || []).map(item =>
      `<span class="delay-item">${highlightPolarityFlip(wrapBreakable(item))}</span>`
    ).join("");
    return `
      <div class="match-table__row match-table__row--static">
        <div class="match-table__cell match-table__cell--preset">${wrapBreakable(r.combo)}</div>
        <div class="match-table__cell match-table__cell--delay-items">${itemsHTML}</div>
      </div>`;
  }).join("");
  const notesHTML = notesToggleBlockHTML(dd.notes, dd.source, "spk-delay-defaults-notes", d.id);
  return `<button type="button" class="section-label section-label--toggle" data-section-toggle="spk-delay-defaults" aria-expanded="false">Delay Defaults<span class="section-label__arrow">▸</span></button>
    <div data-section-toggle-body="spk-delay-defaults" hidden>
      <div class="match-table match-table--preset-guide-delay">
        <div class="match-table__row match-table__row--head">
          <div class="match-table__cell">Preset combo</div>
          <div class="match-table__cell">Pre-alignment delay &amp; Polarity</div>
        </div>
        <div class="match-table__body">${delayRowsHTML}</div>
      </div>
      ${notesHTML}
    </div>`;
}

// [사용자 요청 — 섹션 분리] presetGuideHTML 안의 notesBlockHTML 과 동일한
// "참고 사항" 하위 토글을 matchingRatioHTML/delayDefaultsHTML 이 각자
// 클로저 없이도 쓸 수 있도록 모듈 레벨 헬퍼로 뽑아낸 버전 — noteItemHTML
// 렌더링 로직도 presetGuideHTML 것과 동일하게 맞춘다.
function notesToggleBlockHTML(notes, source, toggleId, speakerId) {
  const noteItemHTML = n => {
    const item = typeof n === "string" ? { text: n } : n;
    const subsHTML = Array.isArray(item.subs) && item.subs.length
      ? `<ul class="footnote__sublist">${item.subs.map(s => `<li>${wrapBreakable(s)}</li>`).join("")}</ul>`
      : "";
    return `<li>${wrapBreakable(item.text)}${subsHTML}</li>`;
  };
  const listHTML = Array.isArray(notes) && notes.length
    ? `<ul class="footnote footnote--list">${notes.map(noteItemHTML).join("")}</ul>`
    : "";
  const srcHTML = source ? `<div class="footnote">출처: ${linkifySource(source, speakerId)}</div>` : "";
  if (!listHTML && !srcHTML) return "";
  return `<button type="button" class="section-label section-label--toggle section-label--toggle-sub" data-section-toggle="${toggleId}" aria-expanded="false">참고 사항<span class="section-label__arrow">▸</span></button>
      <div data-section-toggle-body="${toggleId}" hidden>
        ${listHTML}
        ${srcHTML}
      </div>`;
}

// [사용자 요청] Preset Guide와 동급(섹션 레벨) 토글로 "Mechanical Safety"
// 섹션 추가 — 오너 매뉴얼 "Mechanical safety" 중 그 제품 자체(K1)에
// 해당하는 부분만(k-series.data.js mechanicalSafety, K1-SB/KS28/CS1 등
// 다른 제품의 리깅 한계 표는 제외) 표로 정리. Flown/Stacked 두 표는 항상
// 바로 보이고(matchingRatioHTML/delayDefaultsHTML 같은 별도 섹션 토글과는
// 달리 이 안에서는 하위 구분만 함, section-label--sub), 경고문+참고 사항은
// 표 아래 별도 토글로 접어둔다 — 텍스트 설명이 길어도 참고 사항 토글 뒤에
// 가려지므로 누락 없이 전부 옮겨 담는다.
function mechanicalSafetyHTML(d) {
  const ms = d.mechanicalSafety;
  if (!ms) return "";
  // 값이 없는 셀은 "null" 문자열 대신 "—"로 (원문 Safe/Max limit 미기재가 흔함).
  const cell = v => v != null ? wrapBreakable(v) : "—";
  const rowsHTML = rows => (rows || []).map(r => `
    <div class="match-table__row match-table__row--static">
      <div class="match-table__cell match-table__cell--model">${cell(r.config)}</div>
      <div class="match-table__cell">${cell(r.accessory)}</div>
      <div class="match-table__cell">${cell(r.safeLimit)}</div>
      <div class="match-table__cell">${cell(r.maxLimit)}</div>
    </div>`).join("");
  const tableHTML = (title, rowsArr) => rowsArr && rowsArr.length
    ? `<div class="section-label section-label--sub">${esc(title)}</div>
      <div class="match-table match-table--mech-safety">
        <div class="match-table__row match-table__row--head">
          <div class="match-table__cell">Configuration</div>
          <div class="match-table__cell">Rigging accessory</div>
          <div class="match-table__cell">Safe limit</div>
          <div class="match-table__cell">Maximum limit</div>
        </div>
        <div class="match-table__body">${rowsHTML(rowsArr)}</div>
      </div>`
    : "";
  // [upload/*_v*.md 마스터 스키마 반영] Safety_Factor/Max_Wind_Load — 기존
  // specRow/serializeSpecRows 헬퍼를 그대로 재사용해 Flown/Stacked 표 위에
  // 작은 spec-table 로 표시(둘 다 없으면 생략).
  const safetyFactorRows = serializeSpecRows([
    specRow("Safety Factor", ms.safetyFactor),
    specRow("Max Wind Load", ms.maxWindLoad),
  ]);
  const safetyFactorHTML = safetyFactorRows ? `<div class="spec-table">${safetyFactorRows}</div>` : "";
  const flownHTML = tableHTML("Flown", ms.flownRows);
  const stackedHTML = tableHTML("Stacked / Other configurations", ms.stackedRows);
  // 경고문(원문 warning 아이콘 문단) — 참고 사항과 별개로, 항상 눈에 띄어야
  // 하는 항목이라 footnote--list 가 아니라 강조된 별도 리스트로 그린다.
  const warningsHTML = Array.isArray(ms.warnings) && ms.warnings.length
    ? `<ul class="mech-safety-warning">${ms.warnings.map(w => `<li>${wrapBreakable(w)}</li>`).join("")}</ul>`
    : "";
  const noteItemHTML = n => {
    const item = typeof n === "string" ? { text: n } : n;
    const subsHTML = Array.isArray(item.subs) && item.subs.length
      ? `<ul class="footnote__sublist">${item.subs.map(s => `<li>${wrapBreakable(s)}</li>`).join("")}</ul>`
      : "";
    return `<li>${wrapBreakable(item.text)}${subsHTML}</li>`;
  };
  const notesListHTML = Array.isArray(ms.notes) && ms.notes.length
    ? `<ul class="footnote footnote--list">${ms.notes.map(noteItemHTML).join("")}</ul>`
    : "";
  const sourceHTML = ms.source ? `<div class="footnote">출처: ${linkifySource(ms.source, d.id)}</div>` : "";
  const notesToggleHTML = (notesListHTML || sourceHTML)
    ? `<button type="button" class="section-label section-label--toggle section-label--toggle-sub" data-section-toggle="spk-mech-safety-notes" aria-expanded="false">참고 사항<span class="section-label__arrow">▸</span></button>
      <div data-section-toggle-body="spk-mech-safety-notes" hidden>
        ${notesListHTML}
        ${sourceHTML}
      </div>`
    : "";
  return `<button type="button" class="section-label section-label--toggle" data-section-toggle="spk-mech-safety" aria-expanded="false">Mechanical Safety<span class="section-label__arrow">▸</span></button>
    <div data-section-toggle-body="spk-mech-safety" hidden>
      ${safetyFactorHTML}
      ${flownHTML}
      ${stackedHTML}
      ${warningsHTML}
      ${notesToggleHTML}
    </div>`;
}

/**
 * 스피커 상세 모달의 head/body 마크업을 생성한다.
 * @param {Object} d 스피커 레코드
 * @param {Function|null} resolveAmpId cross-ref 의 resolveAmpIdForModel
 * @param {{id:string, name:string, type:string}[]} [relatedAccessories] 이
 *   스피커의 System Elements(d.relations.accessoryIds) 조회 결과.
 *   controller 가 cross-ref.findAccessoriesForSpeaker() 로 미리 조회해
 *   전달한다.
 * @returns {{color: string, head: string, body: string}}
 */
export function modalBodyHTML(d, resolveAmpId, relatedAccessories) {
  const lowStr = d.lowInch != null ? `${d.lowQty || ""}${d.lowQty ? " × " : ""}${d.lowInch}″` : null;
  // K1-SB 같은 서브우퍼처럼 transducers 가 로우 대역 1개뿐이면("LF: 2 × 15″")
  // 이미 위의 Low Driver 행("2 × 15″")과 실질적으로 같은 정보를 중복
  // 표시하게 된다. otherBandCount()가 0이면 — 즉 대역이 로우 하나뿐이면 —
  // Transducers 를 생략하고 Low Driver 만 보여준다.
  // K1 처럼 LC/LF/MF/HF 등 대역이 2개 이상(멀티밴드)인 스피커는 Low
  // Driver(로우 대역 하나만) 보다 Transducers(전체 대역 구성)가 훨씬
  // 유용한 정보이므로, Low Driver 행 자체를 밴드별 배지+값 리스트로
  // 대체한다(중복 없이 한 자리만 사용) — 아래 spec-table 조립부의
  // multiBand 분기 참고. lowStr 이 없는(로우 드라이버 정보 자체가 없는)
  // 경우는 중복 판단 기준이 없으므로 안전하게 Transducers 를 --full 로
  // 그대로 표시한다.
  const isMultiBand = !!lowStr && otherBandCount(d.transducers) > 0;
  const showTransducersFull = !lowStr && !!d.transducers;
  // 뷰가 1개뿐이어도(Front 단일 이미지) K1(Front/Rear, Front/Array 등 여러
  // 뷰)과 동일하게 .modal__media-wrap + .modal__view-switch 바를 항상
  // 노출한다 — 버튼이 1개뿐이면 그냥 "Front" 라벨 하나만 표시(전환 동작은
  // 없지만 시각적 레이아웃을 모든 스피커에서 통일). 버튼은 같은
  // .modal__media 안에서 이미지의 표시 여부를 토글하는 data-view-switch 로
  // 동작하며(연결은 modal.js), 버튼 개수는 views 배열 길이만큼 동적으로
  // 생성되므로 새 뷰(Array 등)를 데이터에 추가하기만 하면 버튼이 자동으로
  // 늘어난다. 사진을 가리지 않도록 버튼은 사진 아래 별도 바에 두고,
  // .modal__media-wrap 이 그라디언트 배경을 통째로 감싸 사진 영역과 버튼 바
  // 사이에 경계선/색 전환 없이 하나로 이어지게 한다.
  const views = getViews(d);
  const viewSlug = label => label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  // [사용자 요청] 스택 그룹(Horizontal/Vertical/... 세로로 쌓인 칸)이 몇
  // 줄인지에 따라 옆(가로로 나열된) 버튼들의 줄 수를 맞춰야 자연스럽다 —
  // STACK_LABELS/stackViews 는 뒤에서 계산되지만 그 개수가 아래
  // parenBodyHTML(줄바꿈 여부 결정)에 필요해 먼저 끌어올려 계산한다.
  const STACK_LABELS = d.viewStackLabels || ["Horizontal", "Vertical", "Vertical (Panflex)"];
  const stackCount = views.filter(v => STACK_LABELS.includes(v.label)).length;
  // [사용자 요청] "Array White (8x + KARAIIi-BUMP)"처럼 괄호 부가설명이
  // 붙은 뷰 라벨은 괄호가 줄 중간(2번째 줄 시작)과 끝(3번째 줄 끝)에
  // 걸쳐 보여 미관상 어색했다 — 괄호 자체를 없애고 안의 내용만 별도 줄에
  // 작고 연한 배지 텍스트(.modal__view-btn-sub)로 보여준다("Array White"
  // / "8x + KARAIIi-BUMP", 괄호 없이). 괄호 안이 여러 단어일 때만 이렇게
  // 분리하고, "Vertical (Panflex)"처럼 한 단어뿐이라 이미 한 줄에 들어가는
  // 라벨은 원문 그대로 괄호까지 포함해 한 줄에 붙여둔다(굳이 뗄 필요 없음).
  // [사용자 요청] "8x + KARAIIi-BUMP"를 브라우저 기본 word-wrap 에 맡기면
  // "KARAIIi-BUMP"처럼 하이픈이 든 한 "단어"를 하이픈 지점에서 쪼개
  // "KARAIIi-" / "BUMP"로 잘랐다 — 하이픈이 든 각 토큰(모델명, 예:
  // KARAIIi-BUMP)만 white-space: nowrap 인 span 으로 개별 포장해 그 토큰
  // 내부에서는 쪼개지지 않게 한다.
  // [사용자 요청 — 줄 수를 스택과 맞춤] 처음엔 폭이 넉넉하면(K1 등, 스택
  // 2개 이하) <wbr>(공간 부족할 때만 허용)로 자연스럽게 뒀는데, K2처럼
  // 스택이 3개(Horizontal/Vertical/Panflex Detail = 3줄)인 모델은 옆의
  // Array/On Chariot 버튼도 폭에 여유가 있어 한 줄로 붙어버려 스택과 줄
  // 수가 안 맞았다 — 스택이 3개 이상일 때만 첫 "+" 뒤에서 <br> 로 항상
  // 강제 줄바꿈해 옆 버튼도 2줄(본문+서브)로 맞추고, 스택이 2개 이하(또는
  // 없음)면 <wbr> 로 폭에 따라 브라우저가 자동 판단하게 둔다.
  const wrapHyphenTokens = text => esc(text).replace(/[\w]+-[\w-]+/g, m => `<span class="modal__view-btn-sub-nowrap">${m}</span>`);
  const parenBodyHTML = paren => {
    const plusIdx = paren.indexOf("+ ");
    if (plusIdx === -1) return wrapHyphenTokens(paren);
    const before = paren.slice(0, plusIdx + 1); // 첫 "+"까지 포함
    const after = paren.slice(plusIdx + 2); // 첫 "+" 다음 나머지 전체
    const breakTag = stackCount >= 3 ? "<br>" : "<wbr> ";
    return `${esc(before)}${breakTag}${wrapHyphenTokens(after)}`;
  };
  const viewBtnLabelHTML = label => {
    const i = label.indexOf(" (");
    if (i === -1) return esc(label);
    const paren = label.slice(i + 2, -1); // 괄호 자체(양끝 "(", ")") 제거 — i 는 " (" 의 공백 위치라 +2 부터 "(" 다음
    const hasMultipleWords = / /.test(paren);
    return hasMultipleWords
      ? `${esc(label.slice(0, i))}<span class="modal__view-btn-sub">${parenBodyHTML(paren)}</span>`
      : esc(label);
  };
  // [사용자 요청] "Vertical (Panflex)"처럼 괄호 안이 한 단어뿐인 라벨은
  // <br> 강제분기 없이 한 줄 텍스트 그대로지만, 버튼 폭이 좁으면(스택 칸이
  // Horizontal/Vertical 같은 짧은 라벨 기준으로 좁게 잡혀서) 브라우저가
  // 여전히 공백에서 자동 줄바꿈해버려 "Vertical" / "(Panflex)"로 갈라져
  // 보였다 — 이 라벨들만 white-space: nowrap(modal__view-btn--nowrap)을
  // 줘 폭이 좁아도 절대 줄바꿈되지 않게 한다. 괄호 안이 여러 단어인 Array
  // 계열은 그 자연 줄바꿈이 오히려 의도된 동작이라 nowrap 을 주지 않는다.
  const isNowrapLabel = label => {
    const i = label.indexOf(" (");
    if (i === -1) return true;
    const paren = label.slice(i + 1);
    return !/ /.test(paren.slice(1, -1));
  };
  // 첫 번째 뷰(views[0])가 항상 초기 활성 뷰이므로, 그룹으로 재배치된
  // 뒤에도 label 로 활성 여부를 판정한다(배열 내 위치 i 에 더 이상
  // 의존할 수 없으므로). views 가 빈 배열(이미지 없는 모델)일 수 있어
  // views[0]?.label 로 안전하게 접근 — 아래 media 는 views.length 를
  // 먼저 체크해 이 경우 viewSwitchHTML 자체를 쓰지 않는다.
  const firstLabel = views[0]?.label;
  const viewBtnHTML = v =>
    `<button type="button" class="modal__view-btn${isNowrapLabel(v.label) ? " modal__view-btn--nowrap" : ""}${v.label === firstLabel ? " is-active" : ""}" data-view-switch="${viewSlug(v.label)}">${viewBtnLabelHTML(v.label)}</button>`;
  // [사용자 요청 — Kara IIi 등 뷰가 6개까지 늘어난 모델] 버튼이 많아지자
  // 한 줄에 다 안 들어가 "Array White (8x + KARAIIi-BUMP)"처럼 긴 라벨이
  // 여러 줄로 꺾여 줄 수가 들쭉날쭉해 보였다 — 라벨이 짧고 항상 함께
  // 다니는 "앵글" 계열 뷰만 별도로 세로로 쌓은 그룹
  // (.modal__view-switch-stack)으로 묶어 가로 폭을 한 칸만 차지하게 하고,
  // 나머지(Array/With SB18 등 부가 설명이 긴 뷰)는 기존처럼 가로로
  // 나열한다. 어떤 라벨을 묶을지는 모델마다 다를 수 있어(예: K2 는
  // "Panflex Detail"까지 포함) d.viewStackLabels(문자열 배열)로 지정할 수
  // 있게 하고, 지정이 없으면 기본값(Horizontal/Vertical/Vertical
  // (Panflex))을 쓴다(STACK_LABELS 는 위에서 이미 계산). 이 라벨들이
  // 없거나 2개 이하인 모델(K1 등 뷰가 적은 모델)은 stackViews.length <= 1
  // 이라 전부 기존 가로 나열로 남는다 — 하위 호환.
  const stackViews = views.filter(v => STACK_LABELS.includes(v.label));
  const restViews = views.filter(v => !STACK_LABELS.includes(v.label));
  const viewSwitchHTML = stackViews.length > 1
    ? `<div class="modal__view-switch modal__view-switch--grouped" role="group" aria-label="이미지 보기 선택">
        <div class="modal__view-switch-stack">${stackViews.map(viewBtnHTML).join("")}</div>
        ${restViews.map(viewBtnHTML).join("")}
      </div>`
    : `<div class="modal__view-switch" role="group" aria-label="이미지 보기 선택">
        ${views.map(viewBtnHTML).join("")}
      </div>`;
  const media = views.length
    ? `<div class="modal__media-wrap">
        <div class="modal__media">
          ${views.map((v, i) => `<img class="modal__img" data-view="${viewSlug(v.label)}" data-view-label="${esc(v.label)}" src="${v.src}" alt="${esc(d.name)} ${esc(v.label)}" loading="lazy" decoding="async"${i === 0 ? "" : " hidden"}>`).join("")}
        </div>
        ${viewSwitchHTML}
      </div>`
    : "";
  const M = MFR[d.mk], color = M.color;
  // Type(라인 어레이/서브우퍼 등)·Crossover(2-way/active 등) 배지는 표
  // 안에 넣기보다 제목과 함께 한눈에 보이는 "요약 태그"로 더 잘 어울려서
  // head 영역의 제목(modal__title) 오른쪽에 배치한다(titleTagsHTML).
  const head = `<div class="modal__head">
      <div class="eyebrow"><span class="eyebrow__brand" style="color:${color}">${esc(M.name)}</span> · ${d.throwCat ? esc(d.throwCat) + ' · ' : ''}${esc(d.series)}</div>
      <div class="modal__head-row">
        <div class="modal__title">${esc(d.name)}</div>
        ${titleTagsHTML(d, "modal__title-tags", "modal__title-tag")}
      </div>
      <button class="modal__close" data-modal-close aria-label="닫기"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    </div>`;
  // [2-1] 사양을 Acoustical / Physical / Connectivity 3섹션으로 그룹화.
  // 각 섹션은 독립된 spec-table 이므로 half 셀 배치(고아 승격)도 섹션
  // 단위로 계산된다 — 행이 하나도 없는 섹션은 라벨째 생략(specSectionHTML).
  const [maxWattTotalRow, maxWattBandRow] = maxWattRows(d);
  const hasWattBands = Array.isArray(d.wattByBand) && d.wattByBand.length > 0;
  // By Band 가 없는(Passive) 스피커는 RMS Total 이 Max SPL 과 짝을 이루므로,
  // 대신 Transducers/Low Driver 자리를 --full 로 승격시켜 혼자 한 행을
  // 차지하게 한다(사용자 요청 — By Band 없는 스피커는 Transducers 가 한 줄
  // 전체를 사용).
  const transducerRow = isMultiBand ? transducerBandsRow(d.transducers) : specRow("Low Driver", lowStr);
  if (transducerRow && !hasWattBands) transducerRow.full = true;
  const acousticalRows = [
    specRow("Max SPL", d.spl != null ? d.spl + " dB" : null),
    maxWattTotalRow || null,
    transducerRow,
    maxWattBandRow || null,
    showTransducersFull ? specRow("Transducers", d.transducers, true) : null,
    ...coverageRows(d.cov),
    freqRow(d.freqs),
    // [upload/*_v*.md 마스터 스키마 반영] Cardioid_Capability — 마스터
    // 스키마가 아직 반영되지 않은 스피커는 필드 자체가 없어 행이 자동
    // 생략된다(specRow 의 null 처리).
    specRow("Cardioid Capability", d.cardioidCapability),
  ];
  // [사용자 요청] 기존 Physical(Dimensions/Weight/IP Rating) + Connectivity
  // (Connectors) 2섹션을 "General" 하나로 통합 — 분리했을 때 각 섹션에 항목이
  // 1~2개뿐이라 나눌 실익이 적고, 합친 뒤에는 "Physical"이라는 이름이
  // Connectors 까지 아우르기엔 어울리지 않아 더 포괄적인 이름으로 변경.
  const footnotes = [];
  const generalRows = [
    ...weightDimsIpRow(d, footnotes),
    ...connectorRows(d.connectors),
    paComPinoutRow(d.paComPinout),
  ];
  const footnoteHTML = footnotes.length
    ? `<div class="footnote">${footnotes.map((n, i) => `<div>${i + 1}. ${esc(n)}</div>`).join("")}</div>`
    : "";
  const body = `${media}
    <div class="modal__body" id="modal-body-main">
      ${systemElementsHTML(relatedAccessories)}
      ${specSectionHTML("Acoustical", acousticalRows)}
      ${specSectionHTML("General", generalRows)}
      ${footnoteHTML}
      <p class="section-label">Amplifier Matching</p>
      ${ampMatchingHTML(d, resolveAmpId)}
      ${presetGuideHTML(d)}
      ${matchingRatioHTML(d)}
      ${delayDefaultsHTML(d)}
      ${mechanicalSafetyHTML(d)}
    </div>`;
  return { color, head, body };
}