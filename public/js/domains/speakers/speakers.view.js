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

/**
 * transducers 원본 문자열에서 로우 드라이버 외 나머지 대역 수를 센다.
 *
 * 카드는 폭이 좁아 "LC: 2 × 18″ · LF: 4 × 15″ · MF: 8 × 8″ …" 전체를 못 담는다
 * — 로우 드라이버(lowInch/lowQty)만 강조 박스로 크게 보여주고 나머지는 "+N
 * band" 로 개수만 알린다. 전체는 모달 Transducers 행에서 원본 그대로 표시.
 * @param {string} raw 원본 transducers 문자열
 * @returns {number} 로우 1개를 제외한 나머지 대역(가운뎃점으로 구분된 항목) 개수
 */
function otherBandCount(raw) {
  if (!raw) return 0;
  const parts = raw.split("·").map(s => s.trim()).filter(Boolean);
  return Math.max(0, parts.length - 1);
}

/**
 * transducers 원본 문자열("LF: 2 × 15″ · MF: 4 × 6.5″")을 [{band, detail}] 로
 * 분리한다. 첫 ":" 기준으로 라벨/값을 나누므로 "LF front: 1 × 15″"처럼 라벨에
 * 공백이 섞여도 된다.
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
 * 멀티밴드 스피커의 Low Driver 자리를 대체하는 half 행.
 * K1 처럼 LF/MF/HF 를 가진 모델은 로우 대역 하나보다 전체 대역 구성이 유용해
 * 같은 자리(Max SPL 과 짝) 에 밴드별 배지+값 리스트로 보여준다.
 * 파싱 실패 시 원본 문자열을 그대로 표시해 정보 유실을 막는다.
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
  // 앰프 칸의 세 상태 구분이 중요하다: 매칭 있음 / Self-Powered / 미지정.
  // Meyer PANTHER·LEOPARD·TIGRA·LINA 처럼 DSP 앰프를 내장한 모델은 외부 앰프
  // 매칭이 없는 게 정상 스펙이라, 데이터 미입력을 뜻하는 "— 미지정"으로 보이면
  // 오해를 준다 — d.selfPowered 가 있으면 "Self-Powered"로 명시한다.
  // 값 색은 전역 accent 가 아니라 제조사 색(stat-grid__value--mfr).
  const ampBlock = p ? `
    <div class="stat-grid">
      <div class="stat-grid__cell"><span class="stat-grid__key">Amp</span><span class="stat-grid__value stat-grid__value--mfr">${esc(p.model)}</span></div>
      <div class="stat-grid__cell"><span class="stat-grid__key">Max / amp</span><span class="stat-grid__value">${p.total}<small> ea</small></span></div>
      <div class="stat-grid__cell"><span class="stat-grid__key">Links / ch</span><span class="stat-grid__value">${p.perCh}</span></div>
    </div>`
    : d.selfPowered
      ? `<div class="stat-grid"><div class="stat-grid__cell"><span class="stat-grid__key">Amp</span><span class="stat-grid__value stat-grid__value--mfr">Self-Powered</span></div></div>`
      : `<div class="stat-grid"><div class="stat-grid__cell"><span class="stat-grid__key">Amp</span><span class="stat-grid__value stat-grid__value--na">— 미지정</span></div></div>`;
  // 뷰가 2개 이상이면 호버 시 크로스페이드(두 이미지를 겹쳐 쌓고 CSS opacity
  // 전환 — JS 상태 없음). 세 번째 이상 뷰는 카드가 좁아 모달에서만 본다.
  // d.cardHoverView 로 호버 대상 뷰를 개별 지정할 수 있다(K1 처럼 모달의 뷰
  // 순서는 그대로 두면서 카드만 다른 뷰를 쓰고 싶을 때). 없으면 views[1].
  const views = getViews(d);
  const hoverView = (d.cardHoverView && views.find(v => v.label === d.cardHoverView)) || views[1];
  const media = views.length
    ? (views.length > 1 && hoverView
        ? `<img class="card__img card__img--front" loading="lazy" src="${views[0].src}" alt="${esc(d.name)}"><img class="card__img card__img--back" loading="lazy" src="${hoverView.src}" alt="${esc(d.name)} ${esc(hoverView.label)}">`
        : `<img class="card__img" loading="lazy" src="${views[0].src}" alt="${esc(d.name)}">`)
    : `<div class="card__noimg">◢</div>`;
  // 드라이버 구성: 로우 드라이버만 강조 박스, 나머지는 개수만(otherBandCount).
  const extra = otherBandCount(d.transducers);
  const lowBadge = d.lowInch != null
    ? `<span class="card__low-badge"><b>${d.lowQty ? esc(d.lowQty) + "×" : ""}${esc(d.lowInch)}″</b><small>LOW</small></span>`
    : "";
  const cfg = `${lowBadge}${extra > 0 ? `<span class="card__low-extra">+${extra}개 대역</span>` : ""}`;
  const { nameRowHTML, configRowHTML } = cardTagsHTML(d);
  return `<article class="card" style="--mfr:${color}" tabindex="0" data-id="${d.id}" role="button" aria-label="${esc(d.name)} 상세">
    <div class="card__media">${media}</div>
    <div class="card__body">
      <div class="eyebrow"><span class="eyebrow__brand">${esc(M.short)}</span> · ${d.throwCat ? esc(d.throwCat) + ' · ' : ''}${esc(d.series)}</div>
      <div class="card__name-row">
        <div class="card__name">${esc(d.name)}</div>
        ${nameRowHTML}
      </div>
      <div class="card__config">${d.pending ? '<span class="hint-text">스펙 조사 전 — 이미지만 등록됨</span>' : `${cfg}${configRowHTML}`}</div>
      <div class="spl-meter"><div class="spl-meter__track"><div class="spl-meter__fill" style="width:${d.spl != null ? splPct(d.spl) : 0}%"></div></div><div class="spl-meter__value">${d.spl != null ? d.spl : "—"}<small>dB SPL</small></div></div>
      <div class="card__stats">${ampBlock}</div>
    </div>
  </article>`;
}

/**
 * 제목 옆에 나란히 보여줄 Type·Crossover 요약 배지.
 * Type 은 축약 라벨(TYPE_BADGE_LABEL, 예: PULS), Crossover 는 원본 태그를
 * 쓴다. 다만 데이터 원본 순서("3-way" 다음 "active")와 달리 능동/수동을 대역
 * 수보다 먼저 놓는다 — "Line Array, active, 3-way".
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
 * 쓰지만 카드는 폭이 좁아 축약한다. 축약 규칙 4가지:
 *   1. 괄호 상세 제거 — "passive (side LF+MF+HF)" → "passive".
 *      d&b SL/CL 은 원본을 그대로 쓰면 배지가 카드 폭을 넘겨 겹친다.
 *   2. "1ch" 같은 채널 수 단독 태그는 생략(정보 가치가 낮다. 모달엔 남는다).
 *   3. active 태그가 이미 있으면 "passive" 단독 태그는 중복이라 제거 —
 *      GSL/KSL/XSL 의 하이브리드("2ch active split" + "passive (side ...)")
 *      대응. CCL-SUB 처럼 passive 만 있는 순수 수동은 그대로 유지된다.
 *   4. wayCount("3-way", d&b 공식 표기)를 뒤에 덧붙인다.
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
  // 줄 배치: Type 태그(길지만 1개)는 이름 옆 줄에, crossover 태그(여러 개지만
  // 각각 짧음)는 config 줄에. 반대로 두면 "Progressive Ultra-Dense Line…" 같은
  // 긴 Type 라벨이 로우 배지와 폭을 다투는 config 줄에서 말줄임된다.
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
 *
 * 행은 HTML 문자열이 아니라 {key, value, full, pin} 객체로 모은다 —
 * serializeSpecRows 가 배치를 계산한 뒤 HTML 을 딱 한 번 만든다. HTML 을
 * 만들어놓고 정규식으로 재파싱해 배치를 고치면 취약하다.
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
 * 모달 사양은 Acoustical / General 로 나눠 .section-label 로 구분한다.
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
 * connectors 를 브랜드별 표기 차이에 맞춰 행으로 쪼갠다.
 * d&b·L-Acoustics 는 단일 커넥터 타입("4-point speakON")이지만 Meyer 는
 * "Analog: … · Digital: … · AC: …" 처럼 여러 인터페이스를 한 줄에 넣어 훨씬
 * 길다 — "라벨: 값" 쌍 패턴이 감지되면 각 쌍을 half 행으로 분리해 같은 밀도로
 * 보이게 하고, 패턴이 없으면 "Connectors" 단일 full 행으로 둔다.
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

// PA-COM 8핀(A/B, C/D, E/F, G/H)이 각각 어느 대역으로 배선되는지.
// L-Acoustics active WST 인클로저에만 있는 값이라 d.paComPinout 이 없는
// 스피커(speakON/terminal block 제품)에서는 행 자체가 생략된다.
function paComPinoutRow(pinout) {
  if (!pinout) return null;
  const val = `A/B: ${pinout.ab} · C/D: ${pinout.cd} · E/F: ${pinout.ef} · G/H: ${pinout.gh}`;
  return specRow("PA-COM Pinout", val, true);
}

/**
 * "IP55 (Neutrik TOP 커넥터 체결 시)"처럼 조건부 설명이 괄호로 붙은 IP 값을
 * 분리한다. IP Rating 은 Dimensions/Weight 와 한 행을 쓰는 좁은 칸이라 괄호를
 * 그대로 두면 줄바꿈이 지저분하다 — 셀에는 위첨자 번호만 남기고 설명은 모달
 * 하단 footnote 로 보낸다. 각주가 여러 개 쌓이므로 "*" 가 아니라 번호를 쓴다.
 * @param {string} val d.ip 원본 문자열
 * @returns {{display: string, note: string|null}}
 */
function splitIpFootnote(val) {
  const m = String(val).match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  if (!m) return { display: val, note: null };
  return { display: m[1].trim(), note: m[2].trim() };
}

/**
 * Dimensions·Weight·IP Rating 3분할 행 — 한 행에 3열로 붙는 단일 --full 셀
 * (spec-table__tri). Dimensions 가 "(W×H×D)" 힌트 + mm/in 토글까지 들어가
 * 라벨이 가장 길어 3열 중 가장 넓은 칸에 둔다. 셋 중 하나라도 값이 있으면 행을
 * 렌더링하고 없는 항목은 "—".
 *
 * 단위 토글을 두는 이유: dims 원본이 "1300 x 391 x 627 mm / 51.2 x 15.4 x
 * 24.7 in" 처럼 mm·in 을 병기해 항상 길다 — 한 번에 하나만 보여주면 짧아진다.
 * Weight 도 같은 패턴이지만 원본에 lb 값이 없어 kg × 2.20462 로 계산한다.
 * 버튼 동작은 ui/pane-interactions.js 의 wireDimsUnitSwitch·wireWeightUnitSwitch.
 * @param {Object} d 스피커 레코드
 * @param {string[]} footnotes 각주 수집 배열 (IP 괄호 설명이 여기 쌓인다)
 * @returns {Object[]} 행 객체 1개(셋 다 없으면 빈 배열)
 */
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
 * RMS Power Handling 행. 표 배치 순서는 Max SPL · RMS Total · Transducers ·
 * By Band 이고, 둘 다 half 셀이라 pin 없이 그 순서대로 짝이 맞는다.
 * - Active(d.wattByBand 있음, 예: K1 의 LF/MF/HF): Total + By Band 두 행.
 * - Passive(밴드 데이터 없음): Total 한 행만 — 뒤따르는 Transducers 를 full 로
 *   승격시켜 짝을 맞추는 처리는 acousticalRows 쪽에 있다.
 * @param {Object} d 스피커 레코드
 * @returns {Array<Object>} 행 객체 배열 (Total 도 밴드도 없으면 빈 배열)
 */
function maxWattRows(d) {
  const hasBands = Array.isArray(d.wattByBand) && d.wattByBand.length > 0;
  const totalStr = d.watt != null ? d.watt + " W" + (d.wattVerified === false ? " (검증필요)" : "") : null;
  if (totalStr == null && !hasBands) return [];
  if (!hasBands) return [specRow("RMS Power Handling (Total)", totalStr)];
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
 * 커버리지(수평/수직/스플레이 각도) 행들.
 *
 * **splayList 가 있으면 Vertical 행을 생략한다.** 라인어레이는 엘리먼트를 여러
 * 각도로 조합해 수직 커버리지를 만들므로 splayList 가 진짜 수직 정보이고,
 * cov.v("10°")는 낱장 엘리먼트의 고정 방사각일 뿐이다(데이터상 라인어레이류는
 * 거의 항상 10°로 동일해 정보가 없다). splayList 가 없는 서브우퍼·포인트소스는
 * cov.v 가 유일한 수직 정보이므로 그대로 표시한다.
 * 필터의 Vertical 슬라이더(schema 의 vRange)는 이 표시 로직과 무관하게 원본
 * cov.v 를 그대로 쓴다.
 */
function coverageRows(cov) {
  if (!cov) return [];
  const hasSplay = cov.splayList && cov.splayList.length > 0;
  const r = [];
  if (cov.h) r.push(specRow("Horizontal", cov.h));
  if (cov.v && !hasSplay) r.push(specRow("Vertical", cov.v));
  // half 로 둬서 Horizontal 과 같은 행에 온다. 각도가 많아 길어지면
  // spec-table__value 의 word-break 가 처리한다.
  if (hasSplay) r.push(specRow("Inter-element Splay · 선택 각도", cov.splayList.map(a => a + "°").join("  ·  ")));
  if (cov.m) r.push(specRow("Monitor Angle", cov.m));
  return r;
}

/** 주파수 응답(-3dB/-6dB/-10dB) 목록 행 객체 (full) */
function freqRow(freqs) {
  if (!freqs || !freqs.length) return null;
  // freq-badge 는 "-3 dB" 같은 짧은 라벨을 전제로 48px 고정 폭이다 — Meyer
  // PANTHER/LEOPARD 계열의 "Operating Range"·"Phase ±45°" 는 넘쳐서 옆 값과
  // 겹친다. 6자 초과 라벨은 자동 폭(--auto)으로 전환한다.
  const lines = freqs.map(f => {
    const badgeClass = f.db.length > 6 ? "freq-badge freq-badge--auto" : "freq-badge";
    return `<div class="freq-list__row"><span class="${badgeClass}">${esc(f.db)}</span><span class="freq-list__val">${esc(f.lo)} – ${esc(f.hi)}</span></div>`;
  }).join("");
  return { key: `<div class="spec-table__key">Frequency Response</div>`, value: `<div class="spec-table__value freq-list">${lines}</div>`, full: true, pin: null };
}

/**
 * 앰프 매칭 표(.match-table).
 * resolveAmpId 로 해석되는 행에는 data-amp-id 가 붙어 클릭 시 pane2 로 앰프
 * 상세가 열린다(클릭 배선은 controller 담당).
 *
 * 앰프 1개당 모드×프리셋 조합이 여러 행 나올 수 있어(5XT 의 LA4X SE/BTL ×
 * 프리셋들) 대표 행(Max/amp 최대) 1개만 기본 표시하고 나머지는 +N 토글로
 * 펼친다 — 앰프 모달의 Configurations 표와 같은 패턴. 행 클릭은 pane2 이동,
 * +N 버튼은 펼치기만(stopPropagation, wireConfigsToggle).
 * @param {Object} d 스피커 레코드
 * @param {Function|null} resolveAmpId (mk, model) => 앰프 id | null
 * @returns {string}
 */
export function ampMatchingHTML(d, resolveAmpId) {
  if (!d.amps || !d.amps.length) {
    // 파워드 스피커는 외부 앰프 매칭이 없는 게 정상 스펙 — "데이터 미입력"으로
    // 오해되지 않게 구분해 안내한다(카드 Amp 칸과 같은 d.selfPowered).
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
 * 연결된 System Elements(액세서리)를 Type 별로 묶어 클릭 가능한 칩으로 렌더링.
 * 조회는 controller 가 미리 해 {id, name, type} 배열로 넘긴다 — view 는
 * cross-ref 를 직접 참조하지 않는 순수 함수를 유지한다.
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
 * 줄바꿈 지점을 "의미 단위 경계"로 강제한다.
 *
 * 브라우저 기본 word-break 에 맡기면 콤마 바로 뒤가 아니라 그다음 단어에서
 * 끊기거나 "[K1SB_100_NC]" 같은 한 토큰이 갈라진다. 그래서 모든 공백을
 * &nbsp;(줄바꿈 불가)로 바꿔 구(phrase) 단위로 묶고, 경계 지점에만 <wbr> 을
 * 넣어 거기서만 끊기게 한다. 경계는 콤마·플러스·마침표·콜론·긴 대시 뒤와 여는
 * 괄호 앞 — 뒤 셋은 Preset Guide 각주의 문장형 텍스트를 위해 추가했다.
 * 괄호 앞을 넣은 이유: "K1-SB (beside/behind)" 처럼 콤마·플러스가 없는 문구가
 * 폭을 넘으면 anywhere 폴백이 단어 중간을 잘랐다.
 */
function wrapBreakable(text) {
  const MARK = "\u0001"; // 원문에 나올 수 없는 마커 -- 최종적으로 "<wbr> "로 치환
  // 공백은 지우지 않고 남긴 채 MARK 를 끼운다 — 공백을 MARK 로 대체하면
  // <wbr> 자체는 공백을 만들지 않아 "K1 +K1-SB" 처럼 붙어 보인다.
  const marked = String(text)
    .replace(/, /g, ", " + MARK)
    .replace(/\+ /g, "+ " + MARK)
    .replace(/ \(/g, " " + MARK + "(")
    .replace(/\. /g, ". " + MARK)
    .replace(/: /g, ": " + MARK)
    .replace(/ — /g, " — " + MARK);
  return esc(marked)
    .replace(/ /g, "&nbsp;")
    .split(MARK).join("<wbr>");
}

// Configuration/Preset 열의 "+" 뒤·"(" 앞 공백을 표시상으로만 없앤다
// ("K1 + K1-SB (on top)" → "K1 +K1-SB(on top)"). raw-data 원문은 건드리지
// 않고 렌더링 직전에만 적용한다.
// [주의] 공백을 지우면 wrapBreakable 의 "+ "/" (" 패턴과 매치되지 않아 그
// 지점의 <wbr> 도 사라진다 — 전체가 줄바꿈 불가 덩어리가 되지 않도록 지운
// 자리에 폭 없는 줄바꿈 허용 지점(​, zero-width
// space)을 대신 남겨 wrapBreakable 이후에도 그 지점에서 줄바꿈될 수 있게
// 한다.
function tightenConfigText(text) {
  return String(text).replace(/ \+ /g, "​+​").replace(/ \(/g, "​(");
}

// 참고 사항의 "출처: xxx.pdf pNN" 표기를 실제 원본 PDF로
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

/**
 * "Preset Guide" 섹션 — 제조사 프리셋 설계 가이드 원문에서 정리한 구성별
 * 프리셋/음향 특성 표 + 보충 노트. d.presets 가 없으면 섹션째 생략(현재 K1만
 * 데이터 있음). 원문: raw-data/raw-specs/<mk>/references/presets/...
 * @param {Object} d 스피커 레코드
 * @returns {string} 섹션 마크업 (없으면 "")
 */
function presetGuideHTML(d) {
  const p = d.presets;
  if (!p || !Array.isArray(p.rows) || !p.rows.length) return "";
  // Acoustic Properties 는 원문이 길어 셀에는 축약문(acousticShort — 반복
  // 상투구를 빼고 행마다 다른 부분+수치만)을 쓰고 원문은 호버 팝오버로 보여준다.
  // raw-data 원문은 그대로 두고 표시만 축약(CLAUDE.md 원문 보존 원칙).
  // acousticShort 가 없는 행은 원문을 그대로 써 정보 유실을 막는다.
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
  const mainNotesHTML = notesToggleBlockHTML(p.notes, p.source, "spk-preset-guide-notes", d.id);

  // 기본 접힘으로 시작한다 — 모달을 열자마자 긴 표가 화면을 차지하지 않게.
  // Matching Ratio·Delay Defaults·Mechanical Safety 는 이 함수 밖의 별도 섹션
  // 토글이다(호출부에서 나란히 렌더링) — 한 섹션에 표를 다 넣으면 과하다.
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

/** "Matching Ratio & Minimum Line Length" 섹션 (데이터 없으면 생략) */
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

/** "Delay Defaults" 섹션 (데이터 없으면 생략) */
function delayDefaultsHTML(d) {
  const p = d.presets;
  const dd = p && p.delayDefaults;
  if (!dd || !Array.isArray(dd.rows) || !dd.rows.length) return "";
  // 극성은 정상(+)이 기본이라 표시를 생략하고 반전만 데이터에 "(−)" 로 있다.
  // 순서 중요: wrapBreakable 을 먼저 끝낸 뒤 "−" 만 span 으로 감싼다(먼저
  // 감싸면 wrapBreakable 이 태그를 깬다).
  // r.items(엘리먼트별 값)은 각각 .delay-item 으로 감싼다 — CSS 가 border-left
  // 로 표 가로선과 끊긴 짧은 세로 구분선을 그린다("|" 문자 대신).
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

/**
 * 표 아래에 붙는 "참고 사항" 하위 토글 — Preset Guide·Matching Ratio·Delay
 * Defaults 세 표가 공유한다(표는 펼치면 바로 보이고, 각주만 따로 접힌다).
 * notes 항목은 문자열 또는 { text, subs? } — subs 가 있으면 중첩 목록으로
 * 그린다(한 항목에 여러 갈래가 나열될 때 문장으로 잇지 않도록).
 */
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

// Preset Guide와 동급(섹션 레벨) 토글로 "Mechanical Safety"
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
  // Low Driver 와 Transducers 는 한 자리만 쓴다 — 대역 수에 따라 셋 중 하나:
  //   단일 대역(K1-SB 등, "LF: 2 × 15″"): Transducers 생략, Low Driver 만.
  //     둘이 같은 정보라 중복이다.
  //   멀티밴드(K1 의 LC/LF/MF/HF): Low Driver 자리를 밴드별 리스트로 대체.
  //     로우 하나보다 전체 대역 구성이 유용하다(아래 multiBand 분기).
  //   lowStr 없음: 중복 판단 기준이 없으니 Transducers 를 full 로 그대로.
  const isMultiBand = !!lowStr && otherBandCount(d.transducers) > 0;
  const showTransducersFull = !lowStr && !!d.transducers;
  // 뷰가 1개뿐이어도 view-switch 바를 항상 노출한다 — 전환 동작은 없지만
  // 레이아웃이 모든 스피커에서 통일된다. 버튼은 views 길이만큼 동적으로
  // 생성되므로 데이터에 뷰를 추가하면 버튼도 자동으로 늘어난다.
  const views = getViews(d);
  const viewSlug = label => label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  // 세로로 쌓인 스택 칸의 줄 수에 옆 버튼들의 줄 수를 맞춰야 자연스럽다.
  // stackViews 는 뒤에서 만들지만 개수가 parenBodyHTML(줄바꿈 판단)에 필요해
  // 여기서 먼저 센다.
  const STACK_LABELS = d.viewStackLabels || ["Horizontal", "Vertical", "Vertical (Panflex)"];
  const stackCount = views.filter(v => STACK_LABELS.includes(v.label)).length;
  // "Array White (8x + KARAIIi-BUMP)" 처럼 괄호 부가설명이 붙은 뷰 라벨은
  // 괄호를 떼고 안의 내용만 아랫줄 작은 배지(.modal__view-btn-sub)로 옮긴다.
  // 괄호 안이 여러 단어일 때만 — "Vertical (Panflex)" 처럼 한 단어면 이미 한
  // 줄에 들어가므로 원문 그대로 둔다.
  // 그 안의 줄바꿈 규칙 두 가지:
  //   - 하이픈이 든 토큰(KARAIIi-BUMP)은 nowrap span 으로 개별 포장한다.
  //     기본 word-wrap 은 하이픈 지점에서 "KARAIIi-" / "BUMP" 로 쪼갠다.
  //   - 스택이 3줄 이상인 모델(K2)은 첫 "+" 뒤에서 <br> 로 강제 줄바꿈해 옆
  //     버튼도 2줄이 되게 한다. 스택 2개 이하면 <wbr> 로 브라우저에 맡긴다 —
  //     폭에 여유가 있으면 한 줄로 붙어 스택과 줄 수가 안 맞기 때문.
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
  // "Vertical (Panflex)"처럼 괄호 안이 한 단어뿐인 라벨은
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
  // 뷰가 6개까지 늘어난 모델(Kara IIi)은 버튼이 한 줄에 안 들어가 긴 라벨이
  // 꺾이면서 줄 수가 들쭉날쭉해진다 — 라벨이 짧고 항상 함께 다니는 앵글 계열만
  // 세로 스택으로 묶어 가로 한 칸만 쓰게 하고, 부가 설명이 긴 뷰(Array/With
  // SB18)는 가로로 나열한다. 묶을 라벨은 모델마다 달라(K2 는 "Panflex Detail"
  // 포함) d.viewStackLabels 로 지정한다. 스택이 1개 이하면 전부 가로 나열.
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
  const head = `<div class="modal__head">
      <div class="eyebrow"><span class="eyebrow__brand" style="color:${color}">${esc(M.name)}</span> · ${d.throwCat ? esc(d.throwCat) + ' · ' : ''}${esc(d.series)}</div>
      <div class="modal__head-row">
        <div class="modal__title">${esc(d.name)}</div>
        ${titleTagsHTML(d, "modal__title-tags", "modal__title-tag")}
      </div>
      <button class="modal__close" data-modal-close aria-label="닫기"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    </div>`;
  // 섹션마다 독립된 spec-table 이므로 half 셀 배치(고아 승격)도 섹션 단위로
  // 계산된다 — 행이 없는 섹션은 라벨째 생략(specSectionHTML).
  const [maxWattTotalRow, maxWattBandRow] = maxWattRows(d);
  const hasWattBands = Array.isArray(d.wattByBand) && d.wattByBand.length > 0;
  // Passive(By Band 없음)는 RMS Total 이 Max SPL 과 짝을 이루므로 Transducers
  // 를 full 로 승격시켜 한 줄 전체를 쓰게 한다.
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
    specRow("Cardioid Capability", d.cardioidCapability),
  ];
  // 치수·무게·IP·커넥터를 "General" 한 섹션에 모은다 — 나누면 섹션당 항목이
  // 1~2개뿐이라 실익이 없다.
  const footnotes = [];
  const generalRows = [
    ...weightDimsIpRow(d, footnotes),
    ...connectorRows(d.connectors),
    paComPinoutRow(d.paComPinout),
  ];
  const footnoteHTML = footnotes.length
    ? `<div class="footnote">${footnotes.map((n, i) => `<div>${i + 1}. ${esc(n)}</div>`).join("")}</div>`
    : "";
  // 스펙 조사 전(이미지만 등록된) 제품은 표가 전부 "—" 로만 채워져 오해를
  // 부르므로, software 도메인과 동일한 안내 문구를 표 위에 먼저 둔다.
  const pendingNote = d.pending
    ? `<p class="hint-text" style="margin-bottom:12px">스펙 조사 전입니다 — 현재는 제조사 홈페이지 이미지만 등록돼 있습니다.</p>`
    : "";
  const body = `${media}
    <div class="modal__body" id="modal-body-main">
      ${pendingNote}
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