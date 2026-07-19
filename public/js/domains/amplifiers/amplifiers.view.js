/**
 * @module domains/amplifiers/view
 * 앰프 카드 + 상세 모달 마크업 생성 (순수 함수 모음).
 *
 * 관련 CSS: css/components/card.css, css/components/spec-table.css
 */
import { esc, getViews } from "../../core/dom.js";
import { AMP_MFR } from "./amplifiers.schema.js";

/* ── Total Watt 게이지 스케일 — speakers.view.js 의 SPL_RANGE/setSplRange/
   splPct 와 동일한 패턴을 재사용해 스피커 탭의 SPL 바와 같은 시각 언어로
   앰프의 총 출력을 카드에서 한눈에 비교할 수 있게 한다(사용자 요청).
   [사용자 요청, 2차] Rack 앰프(LA-RAK III/II AVB)는 채널당 4Ω 정격이 없어
   8Ω/2.7Ω 기준 총량(62,400W/40,000W)을 대신 쓰는데, 이 값이 일반 앰프의
   4Ω 기준 값(최대 17,600W)보다 훨씬 커서 같은 스케일이면 일반 앰프 바가
   전부 짧아 보인다 — Rack 과 일반 앰프(Standalone)를 별도 스케일로 분리. */
const WATT_RANGE = { lo: 0, hi: 0 };
const WATT_RANGE_RACK = { lo: 0, hi: 0 };

/**
 * Total Watt 게이지의 표시 범위를 설정한다 — amplifiers.controller.js 가
 * 빌드 시 호출.
 * @param {number} lo 데이터 최저 총 와트(4Ω 기준)
 * @param {number} hi 데이터 최고 총 와트(4Ω 기준)
 */
export function setWattRange(lo, hi) { WATT_RANGE.lo = lo; WATT_RANGE.hi = hi; }

/**
 * Rack 타입 앰프 전용 Total Watt 게이지 표시 범위를 설정한다.
 * @param {number} lo
 * @param {number} hi
 */
export function setRackWattRange(lo, hi) { WATT_RANGE_RACK.lo = lo; WATT_RANGE_RACK.hi = hi; }

/**
 * 와트 값 → 게이지 채움 비율(%) (최소 4% 보장으로 항상 보이게).
 * [사용자 요청] 처음엔 min-max 상대비교(최저~최고 구간을 0~100%로 매핑)
 * 였는데, LA2Xi(2560W)처럼 그룹 내 최저값에 가까운 앰프는 실제로는 결코
 * 작지 않은 출력인데도 게이지가 거의 안 찬 것처럼 보였다 — Rack 그룹에서
 * 먼저 적용한 것과 동일하게, 0 을 기준선으로 한 절대비교(v/hi)로 통일해
 * 값의 실제 크기(비율)가 그대로 드러나게 한다. hi 는 여전히 그룹별 최고
 * 총 와트(setWattRange/setRackWattRange, 데이터 갱신 시 자동 재계산)를 쓰므로
 * 새 앰프가 추가돼도 스케일이 알아서 맞춰진다.
 */
const wattPctFrom0 = (v, range) => Math.max(4, Math.min(100, (v / (range.hi || 1)) * 100));
const wattPct = v => wattPctFrom0(v, WATT_RANGE);
const rackWattPct = v => wattPctFrom0(v, WATT_RANGE_RACK);

/**
 * "N x W" 형식의 채널당 정격 문자열(예: "16 x 160 W", "4 x 1000 W")에서
 * 4Ω 기준 총 와트를 얻는다. output.power4ohms 를 우선 쓰고, 없으면
 * powerByOhm 배열에서 "4 Ω" 항목을 찾아 대신 쓴다.
 * [주의] 이 값은 제조사 스펙시트의 "채널당 정격 × 채널 수" 단순 곱셈이라,
 * 파워서플라이 정격 등에 따라 실제로 모든 채널을 동시에 그 값으로 구동
 * 가능한지는 보장하지 않는다 — 카드/게이지 모두 참고용 비교 지표로만
 * 쓴다는 전제. (검증된 공식 Total 값이 별도로 있는 앰프가 확인되면
 * output.powerTotal 을 우선 쓰도록 재조정할 것.)
 * @param {Object} a 앰프 레코드
 * @returns {number|null} 4Ω 기준 채널당×채널수 총 와트
 */
export function totalWatt4Ohm(a) {
  const raw = output4OhmRaw(a);
  if (raw) {
    const m = String(raw).match(/(\d+(?:\.\d+)?)\s*x\s*(\d+(?:\.\d+)?)/i);
    if (m) return parseFloat(m[1]) * parseFloat(m[2]);
  }
  // [사용자 요청] LA-RAK III/LA-RAK II AVB 처럼 채널당 4Ω 정격 자체가 없고
  // powerTotal 원문이 이미 총합("Up to 62,400 W at 8 ohms")으로만 주어지는
  // 앰프는 위 계산이 불가능해 와트 바가 "—"로 비어 있었다 — powerTotal 의
  // 총 와트 숫자를 대신 읽어 게이지에 쓴다(기준 임피던스는 카드 Output
  // 칸의 배지로 이미 표시되므로, 게이지는 임피던스 무관 총량 참고 지표).
  const total = a.output && a.output.powerTotal;
  if (total) {
    const m = String(total).replace(/,/g, "").match(/(\d+(?:\.\d+)?)\s*W/i);
    if (m) return parseFloat(m[1]);
  }
  return null;
}

/**
 * output.power4ohms(없으면 powerByOhm 의 "4 Ω" 항목)에서 원본 문자열을
 * 그대로 읽는다 — totalWatt4Ohm(게이지용 숫자)과 output4OhmLabel(카드
 * 표기용 문자열)이 같은 원본을 공유하도록 분리한 헬퍼.
 * @param {Object} a 앰프 레코드
 * @returns {string|null}
 */
function output4OhmRaw(a) {
  const output = a.output || {};
  let raw = output.power4ohms;
  if (!raw && output.powerByOhm) {
    const hit = output.powerByOhm.find(p => p.ohm.replace(/\s/g, "").startsWith("4Ω"));
    if (hit) raw = hit.power;
  }
  return raw || null;
}

/**
 * 카드 Output 칸에 표시할 "4Ω 기준" 채널당 스펙 표기를 만든다. output.
 * powerTotal(예: LA12X "4 x 3300 W(2.7Ω)")은 앰프마다 표기 임피던스가
 * 2.7Ω/4Ω/8Ω 등으로 제각각이라 카드에서 서로 비교하기 어려웠다 — 항상
 * 4Ω 값(output4OhmRaw)으로 통일해 "N x W(4Ω)" 형식으로 반환한다.
 * @param {Object} a 앰프 레코드
 * @returns {string|null} 예: "4 x 3300 W(4Ω)" — 4Ω 데이터가 없으면 null
 */
function output4OhmLabel(a) {
  const raw = output4OhmRaw(a);
  return raw ? `${raw}(4Ω)` : null;
}

/**
 * output4OhmLabel/powerTotal 문자열을 {value, impedance} 로 분리한다.
 * "16 x 1100 W(4Ω)" → {value:"16 x 1100 W", impedance:"4Ω"}.
 * [사용자 요청] LA-RAK III 처럼 4Ω/8Ω 채널당 데이터가 없어 powerTotal
 * 원문("Up to 62,400 W at 8 ohms")으로 폴백하는 경우, 괄호 형식이 아니라
 * "at N ohms" 형식이라 기존 정규식이 임피던스를 못 잡았다 — 이 형식도
 * 함께 파싱해 "62,400 W" + "8Ω" 배지로 동일하게 분리한다.
 * @param {Object} a 앰프 레코드
 * @returns {{value:string, impedance:string|null}}
 */
function outputParts(a) {
  const label = output4OhmLabel(a) || (a.output && a.output.powerTotal) || null;
  if (!label) return { value: "—", impedance: null };
  const paren = String(label).match(/^(.*?)\(([^)]+)\)\s*$/);
  if (paren) return { value: paren[1], impedance: paren[2] };
  const atOhms = String(label).match(/^(?:up to\s+)?(.*?)\s+at\s+([\d.]+)\s*ohms?\s*$/i);
  // [사용자 요청] "Up to " 접두사는 다른 앰프들도 이미 최고치 기준으로만
  // 값을 표기하고 있어(예: LA12X "4 x 3300 W") 중복이므로 카드에서 생략.
  if (atOhms) return { value: atOhms[1], impedance: `${atOhms[2]}Ω` };
  return { value: label, impedance: null };
}

// [v1.8 리팩토링] getViews()는 speakers.view.js 와 동일한 로직이라
// js/core/dom.js 공통 유틸로 추출됨 — 위 import 참고. views 도 img 도 없으면
// 빈 배열(카드에 ⚡ 아이콘 표시, 모달엔 미디어 영역 자체가 생략됨).

/**
 * 이름 옆에 나란히 보여줄 Connectivity 태그 목록 HTML — 스피커
 * 카드(speakers.view.js titleTagsHTML)와 동일한 위치·역할. 스피커 카드는
 * name-row(이름+태그) 아래 config(로우드라이버 배지)·spl-meter 까지 있어
 * 세로 구성이 4단이었는데, 앰프 카드는 eyebrow+name+stats 3단뿐이라 카드
 * 높이가 서로 달랐다 — 이 태그 줄을 추가해 세로 리듬을 맞춘다(사용자 요청).
 * Type("Amplified Controller" 등)은 eyebrow 옆에 넣지 않은 이유와 별개로
 * 카드에서는 제외 — 이름이 이미 타입을 암시하고(예: LA1.16i) 태그 줄이
 * 길어지는 걸 사용자가 원치 않아 Connectivity 만 남김.
 * @param {Object} a 앰프 레코드
 * @param {string} wrapClass 감싸는 div 클래스
 * @param {string} tagClass 태그 span 클래스
 * @returns {string}
 */
function ampTagsHTML(a, wrapClass, tagClass) {
  const tags = [...(a.connectivity || [])];
  if (!tags.length) return "";
  return `<div class="${wrapClass}">${tags.map(t => `<span class="${tagClass}">${esc(t)}</span>`).join("")}</div>`;
}

/**
 * 카드 전용 축약 모델명. [사용자 요청] "LA-RAK II AVB"가 태그 3개와 함께
 * 좁은 카드 폭에서 심하게 말줄임돼("LA-RAK II A...") 알아보기 어려웠다 —
 * 실제 데이터(a.model)는 그대로 두고 카드 표시에서만 " AVB" 접미사를
 * 생략한다(연결 프로토콜은 이름 옆 태그에 이미 "Milan-AVB"로 나와 있어
 * 정보 손실 없음). 모달 제목 등 다른 곳은 영향받지 않음.
 * @param {string} model 앰프 model 값
 * @returns {string}
 */
function cardModelLabel(model) {
  return model.replace(/\s+AVB$/, "");
}

/**
 * 카드 전용 축약 Architecture 값. [사용자 요청] "4 x 4 with bridge modes"
 * (부가 설명), "3 x LA7.16 (48 channels of amplification)"(괄호 부연) 처럼
 * 핵심 수치 뒤에 설명이 붙으면 좁은 stat-grid 칸에서 잘린다 — 핵심
 * 수치("4 x 4", "3 x LA7.16")는 그대로 두고 이 부가 설명만 카드에서
 * 생략한다(모달 상세 스펙 표는 원본 a.architecture 값을 그대로 사용해
 * 정보 손실 없음).
 * @param {string} architecture a.architecture 값
 * @returns {string}
 */
function cardArchitectureLabel(architecture) {
  return architecture
    .replace(/\s+with bridge modes?$/i, "")
    .replace(/\s*\([^)]*\)\s*$/, "");
}

/**
 * 앰프 카드 1장의 HTML 을 생성한다.
 * [정보 우선순위] speakers.view.js cardHTML 과 동일한 원칙 — "이 앰프로
 * 무엇을 할 수 있는가"(실사용 스펙)를 최우선으로 보여준다. "몇 개 스피커와
 * 호환되는가"(Speakers 개수)는 매칭 정보가 갱신될 때마다 바뀌는 부가 지표라
 * 카드 첫 화면보다는 모달 상세에 더 어울린다 — 대신 이 앰프 자체의 스펙인
 * 채널 수(Channels)를 카드에 노출한다.
 * configs(스피커 매칭 설정)가 비어 있는 앰프(예: 신규 등록되어 아직 매칭
 * 정보가 없는 LA1.16i)는 Max Total/Modes 대신 usage/type 같은 일반 스펙을
 * 보여줘 카드가 빈 값으로 허전해 보이지 않게 한다.
 * @param {Object} a 앰프 레코드
 * @returns {string} .card 마크업
 */
export function cardHTML(a) {
  const M = AMP_MFR[a.mfr], color = M.color;
  const hasConfigs = a.configs && a.configs.length;
  const maxTotal = hasConfigs ? a.configs.reduce((m, c) => (c.total != null && c.total > m ? c.total : m), 0) : 0;
  const modes = hasConfigs ? [...new Set(a.configs.map(c => c.mode).filter(Boolean))] : [];
  // [사용자 요청] Usage 칸은 "Installation only" 처럼 긴 값이 stat-grid
  // (1.5fr 열)에서 말줄임(...)으로 잘리는 문제가 있었고, Usage 정보 자체가
  // Type 태그(모달 General 섹션)로도 확인 가능해 카드에서는 Architecture
  // (예: "4 x 4")로 교체 — configs 없는 앰프(LA12X/LA4X/LA7.16 등)의 카드
  // 요약을 Architecture/Output 2칸으로 구성. Channels 는 Architecture
  // 값("4 x 4"의 앞 숫자 = 입력 채널 수)에 이미 담긴 정보라 중복이므로
  // 제거(CLAUDE.md "중복 정보 생략" 원칙).
  // [사용자 요청] 카드 강조 값(Max Total / Architecture)을 전역 accent
  // (앰버) 대신 제조사 색(--mfr)으로 — speakers 탭과 동일한 원칙.
  const statsBlock = hasConfigs
    ? `<div class="stat-grid">
          <div class="stat-grid__cell"><span class="stat-grid__key">Max Total</span><span class="stat-grid__value stat-grid__value--mfr">${maxTotal || "—"}</span></div>
          <div class="stat-grid__cell"><span class="stat-grid__key">Modes</span><span class="stat-grid__value">${modes.length ? modes.join(" · ") : "—"}</span></div>
          <div class="stat-grid__cell"><span class="stat-grid__key">Channels</span><span class="stat-grid__value">${a.channels || "—"}</span></div>
        </div>`
    : (() => {
        const out = outputParts(a);
        return `<div class="stat-grid stat-grid--amp-2col">
          <div class="stat-grid__cell"><span class="stat-grid__key">Architecture</span><span class="stat-grid__value stat-grid__value--mfr">${a.architecture ? esc(cardArchitectureLabel(a.architecture)) : "—"}</span></div>
          <div class="stat-grid__cell"><span class="stat-grid__key">Output${out.impedance ? `<span class="stat-grid__key-badge">${esc(out.impedance)}</span>` : ""}</span><span class="stat-grid__value">${esc(out.value)}</span></div>
        </div>`;
      })();
  // 1U 랩마운트 앰프는 실물 비율이 매우 가로로 긴 편(예: LA1.16i 약
  // 10.6:1)이라 card__media 의 기본 max-width 80% 제약을 그대로 쓰면
  // max-height(106px)보다 max-width 쪽이 먼저 걸려 실제 렌더 높이가
  // 지나치게 얇아진다(세로 여백만 다른 카드와 맞으면 되고, 가로는 최대한
  // 채워도 된다는 요청 반영) — card__img--wide 변경자로 이 카드에서만
  // max-width 를 넓혀(94%) 세로 크기(다른 카드와 통일된 리듬)는 유지한
  // 채 가로로 최대한 크게 보이게 한다.
  // [Front/Rear 호버 전환] views 가 2개 이상이면 speakers.view.js 와 동일한
  // 패턴으로 Front/Rear 두 장을 함께 렌더링한다 — 평소엔 Front, 카드에
  // 마우스를 올리면 Rear 로 크로스페이드(card.css 의 --front/--back 규칙).
  const views = getViews(a);
  const media = views.length
    ? (views.length > 1
        ? `<img class="card__img card__img--front card__img--wide" loading="lazy" src="${views[0].src}" alt="${esc(a.model)}"><img class="card__img card__img--back card__img--wide" loading="lazy" src="${views[1].src}" alt="${esc(a.model)} ${esc(views[1].label)}">`
        : `<img class="card__img card__img--wide" loading="lazy" src="${views[0].src}" alt="${esc(a.model)}">`)
    : `<div class="card__noimg">⚡</div>`;
  const nameTags = ampTagsHTML(a, "card__name-tags", "card__name-tag");
  // [사용자 요청] 스피커 탭의 SPL 바(spl-meter)와 동일한 시각 언어로, 4Ω
  // 기준 Total Watt 값을 게이지로 보여준다. 값이 없는 앰프(파싱 실패 등)는
  // 스피커 카드가 "spl == null" 일 때와 동일하게 게이지를 0%로, 값 자리에
  // "—"만 표시(레이아웃은 유지, 값만 비움).
  // [사용자 요청] configs 없는 앰프(hasConfigs=false)는 아래 stat-grid
  // Output 칸에 임피던스 배지가 이미 있어 "@4Ω"가 중복 정보다 — 이 경우만
  // 생략. Output 칸 자체가 없는 hasConfigs 앰프(D90 등)는 와트 미터가
  // 유일한 임피던스 표시라 유지(CLAUDE.md "중복 정보 생략" 원칙).
  // [사용자 요청, 2차] Rack 앰프(LA-RAK III/II AVB)는 8Ω/2.7Ω 기준 총량이라
  // 일반 앰프의 4Ω 기준 값과 절대치가 섞여 있으면 비교가 왜곡된다 — 별도
  // 스케일(rackWattPct/WATT_RANGE_RACK)을 쓰고, spl-meter--rack 변경자로
  // 바 색상도 다르게(card.css) 해서 "이건 다른 기준"임을 시각적으로 구분.
  const isRack = a.type === "Rack";
  const watt4 = totalWatt4Ohm(a);
  const wattPercent = watt4 == null ? 0 : (isRack ? rackWattPct(watt4) : wattPct(watt4));
  const wattMeter = `<div class="spl-meter${isRack ? " spl-meter--rack" : ""}"><div class="spl-meter__track"><div class="spl-meter__fill" style="width:${wattPercent}%"></div></div><div class="spl-meter__value">${watt4 != null ? watt4 : "—"}<small>W${hasConfigs ? " @4Ω" : ""}</small></div></div>`;
  return `<article class="card" style="--mfr:${color}" tabindex="0" data-id="${a.id}" role="button" aria-label="${esc(a.model)} 상세">
    <div class="card__media">${media}</div>
    <div class="card__body card__body--amp">
      <div class="eyebrow"><span class="eyebrow__brand">${esc(M.short)}</span> · ${esc(a.powerClass || "")}</div>
      <div class="card__name-row">
        <div class="card__name">${esc(cardModelLabel(a.model))}</div>
        ${nameTags}
      </div>
      ${wattMeter}
      <div class="card__stats">${statsBlock}</div>
    </div>
  </article>`;
}

/**
 * 사양 표 행 1개 HTML. [사용자 요청] d&b(D90)와 L-Acoustics 앰프가 서로
 * 다른 필드를 채워둔 상태라, 값이 없으면 행 자체를 생략하던 이전 방식으로는
 * 브랜드마다 모달 섹션 구성(어떤 행이 보이는지)이 달라 보였다 — 이제 값이
 * 없어도 행 자체는 항상 렌더링하고 값 자리에 "—"만 넣어, 두 브랜드의 모달
 * 양식(섹션·행 구성)이 데이터 유무와 무관하게 항상 동일하게 보이도록 한다.
 * (detailSection 은 "rows 가 전부 빈 문자열일 때만 섹션 생략"이므로, 이제
 * 행이 항상 채워지는 이상 필드가 하나도 없는 극단적 경우가 아니면 섹션도
 * 항상 나타난다.)
 * @param {string} label 항목명
 * @param {*} val 값 (없으면 "—" 로 표시)
 * @param {boolean} [full] true 면 2열 전체 폭 사용
 */
function specRow(label, val, full) {
  const hasVal = val != null && String(val).trim() !== "";
  return `<div class="spec-table__cell${full ? ' spec-table__cell--full' : ''}"><div class="spec-table__key">${esc(label)}</div><div class="spec-table__value${hasVal ? '' : ' spec-table__value--na'}">${hasVal ? esc(val) : "—"}</div></div>`;
}

/**
 * 앰프 설정(모드별 Links/Max) 3열 표 HTML. 앰프 자체 필드(a.configs)를 쓴다
 * — d&b 등 기존 앰프처럼 "모델 고정, 모드만 다른" 데이터에 적합.
 * @param {Object[]} configs 앰프의 configs 배열
 * @returns {string}
 */
function configsTableHTML(configs) {
  if (!configs || !configs.length) return `<div class="data-empty-note">설정 데이터가 없습니다.</div>`;
  const rows = configs.map(c => `<div class="match-table__row"><div class="match-table__cell match-table__cell--mode">${c.mode ? esc(c.mode) : "—"}</div><div class="match-table__cell">${c.perCh != null ? c.perCh : "—"}</div><div class="match-table__cell">${c.total != null ? c.total : "—"}</div></div>`).join("");
  return `<div class="match-table match-table--cols-3"><div class="match-table__row match-table__row--head"><div class="match-table__cell">Mode</div><div class="match-table__cell">Links/ch</div><div class="match-table__cell">Max/amp</div></div><div class="match-table__body">${rows}</div></div>`;
}

/**
 * 앰프 설정 표를 스피커 기준으로 렌더링 — 왼쪽 열이 앰프 모델명이 아니라
 * "이 앰프로 어떤 스피커를 어떤 모드/프리셋으로 몇 대까지 구동해 몇 dB 를
 * 내는지"의 스피커 이름이 되는 버전. 스피커 모달의 Amplifier Matching 표
 * (ampMatchingHTML)와 동일한 6열(Speaker·Mode·Preset·Links/ch·Max/amp·
 * Max SPL) 구조를 그대로 재사용해 SPL 정보도 빠짐없이 보여준다. LA1.16i
 * 처럼 앰프 자체 configs 필드가 비어있어도 cross-ref.findAmpConfigsBySpeaker()
 * 가 스피커 쪽 매칭 데이터(splByPreset 포함)에서 역으로 구성해주므로 그대로
 * 쓴다.
 *
 * 스피커 1개당 모드×프리셋 조합이 여러 행 나올 수 있어(예: SE/BTL × 3개
 * 프리셋 = 6행) 스피커 이름이 여러 번 반복되어 표가 길고 복잡해 보이는
 * 문제를, 스피커별로 대표 행(Max/amp 가 가장 큰 설정) 1개만 기본 표시하고
 * 나머지 행은 별도의 펼치기 버튼(▸)으로 열리는 접기/펼치기 구조로
 * 해결한다(스피커 이름 반복 없이 요약 → 필요할 때만 모드/프리셋별 상세).
 * 클릭 영역을 명확히 분리: 스피커 이름(모델 셀)을 클릭하면 항상 Split
 * View 로 이동하고, 별도의 ▸ 토글 버튼을 클릭하면 나머지 설정 행이
 * 펼쳐진다 — 두 동작이 같은 셀에서 겹치지 않게 버튼을 분리된 요소로 둔다.
 * @param {{speakerId:string, speakerName:string, mode:string, preset:string|null, perCh:number|null, total:number|null, spl:number|null}[]} rows
 * @returns {string}
 */
function configsBySpeakerTableHTML(rows) {
  if (!rows || !rows.length) return `<div class="data-empty-note">설정 데이터가 없습니다.</div>`;

  // 스피커 id 순으로 등장 순서를 보존하며 그룹핑
  const groups = [];
  const bySid = new Map();
  rows.forEach(r => {
    if (!bySid.has(r.speakerId)) { const g = { speakerId: r.speakerId, speakerName: r.speakerName, rows: [] }; bySid.set(r.speakerId, g); groups.push(g); }
    bySid.get(r.speakerId).rows.push(r);
  });

  // [사용자 요청] "K3"/"K3i"(i버전), "SB18"/"SB18 IIi"(리비전+i버전),
  // "Soka"/"Soka inWall"(설치 변형), "A10 Focus"/"A10i Focus"(i가 모델
  // 코드와 서픽스 사이 중간에 삽입되는 A시리즈 패턴), "SB10r"/"SB10i"
  // (마지막 글자만 r↔i로 다른 패턴) 처럼 이름이 유사하고 설정 데이터
  // (mode/preset/perCh/total/spl 조합 전체)가 완전히 동일하면 한 행으로
  // 합쳐 "SB18(IIi)"/"A10(i) Focus"/"SB10(r/i)" 식으로 표기한다.
  // [주의] r/i 페어는 실제로는 i버전에만 LA1.16i 매칭 항목이 추가로 있어
  // amps 구성이 다른 경우가 많다 — 그래서 이름 패턴만 추가하고 병합
  // 여부는 기존과 동일하게 rowsSignature 완전 일치 조건에 맡긴다(사용자
  // 확인: "일단 완전 일치할때만 병합해줘"). 데이터가 다르면 자동으로
  // 병합되지 않고 별개 행으로 남는다.
  // 이름 유사성은 세 가지 패턴을 모두 잡는다:
  //  1) 접두사 관계(startsWith) — 짧은 이름이 긴 이름의 앞부분과 일치
  //     (SB18 → SB18 IIi, Soka → Soka inWall, K3 → K3i)
  //  2) "i" 중간 삽입 관계 — 한쪽에서 "i" 문자 하나만 제거하면 다른 쪽과
  //     완전히 같아짐 (A10 Focus → A10i Focus, 접두사 관계가 아님: "i"가
  //     문자열 끝이 아니라 "A10"과 " Focus" 사이에 끼어 있기 때문)
  //  3) 끝글자 r↔i 치환 관계 — 길이가 같고 마지막 한 글자만 "r"과 "i"로
  //     다름 (SB10r ↔ SB10i, SB6r ↔ SB6i, X4r ↔ X4i)
  const rowsSignature = g => [...g.rows]
    .sort((a, b) => (b.total || 0) - (a.total || 0))
    .map(r => `${r.mode || ""}|${r.preset || ""}|${r.perCh ?? ""}|${r.total ?? ""}|${r.spl ?? ""}`)
    .join(";");
  // a에서 "i" 문자 하나만 제거하면 b와 같아지는지 확인하고, 그렇다면
  // 그 "i"가 삽입된 위치(인덱스)를 반환한다. 아니면 null.
  function findSingleIInsertionIndex(shorter, longer) {
    if (longer.length !== shorter.length + 1) return null;
    let diffAt = -1;
    for (let k = 0; k < longer.length; k++) {
      if (shorter[k - (diffAt === -1 ? 0 : 1)] !== longer[k]) {
        if (diffAt !== -1) return null; // 차이가 두 곳 이상이면 불일치
        diffAt = k;
      }
    }
    if (diffAt === -1) diffAt = shorter.length; // 맨 끝에 삽입된 경우
    if (longer[diffAt] !== "i") return null;
    return diffAt;
  }
  // 길이가 같고 마지막 한 글자만 "r"↔"i" 로 다른지 확인한다 (SB10r/SB10i 등).
  function isTrailingRIVariant(a, b) {
    if (a.length !== b.length || a.length === 0) return false;
    if (a.slice(0, -1) !== b.slice(0, -1)) return false;
    const lastA = a.slice(-1).toLowerCase(), lastB = b.slice(-1).toLowerCase();
    return (lastA === "r" && lastB === "i") || (lastA === "i" && lastB === "r");
  }
  const merged = [];
  const consumed = new Set();
  groups.forEach((g, i) => {
    if (consumed.has(i)) return;
    // 이 그룹과 병합 가능한 파트너(이름이 접두사 관계이거나 "i" 삽입
    // 관계, 또는 끝글자 r↔i 치환 관계 + 설정 데이터 동일)를 찾는다.
    //
    // [버그 수정 — 오탐 방지] 전체 스피커 이름을 전수 검증한 결과, 순수
    // startsWith 접두사 조건만으로는 "K1"↔"K1-SB"(라인어레이 vs 전용
    // 서브우퍼), "L1"↔"L1D", "L2"↔"L2D", "Syva"↔"Syva Low"/"Syva Sub"
    // 처럼 실제로는 전혀 다른 별개 제품인데 우연히 접두사 관계라는 이유로
    // 병합 후보가 되는 경우가 발견됐다. 지금은 rowsSignature(설정 데이터)
    // 완전 일치 조건이 최종 방어선 역할을 하지만, 데이터가 우연히 겹치는
    // 극단적 케이스가 생기면 서로 다른 제품이 잘못 합쳐질 위험이 있다.
    // 그래서 접두사 관계는 "뒤에 남는 나머지 부분이 i-버전 표기(순수
    // 'i', 또는 'IIi'처럼 끝이 'i'로 끝나는 리비전 표기)일 때만" 허용
    // 하도록 좁힌다 — K3/K3i, SB18/SB18 IIi는 유지되고 K1/K1-SB,
    // L1/L1D, L2/L2D, Syva/Syva Low, Syva/Syva Sub 는 제외된다.
    // "Soka"/"Soka inWall"만 예외로 별도 허용(설치 변형, 끝이 "i"가
    // 아닌 "inWall"이지만 기존에 이미 확인된 정상 케이스).
    const j = groups.findIndex((g2, i2) => {
      if (i2 === i || consumed.has(i2)) return false;
      const a = g.speakerName, b = g2.speakerName;
      const [pShort, pLong] = a.length <= b.length ? [a, b] : [b, a];
      const prefixSuffix = pLong.startsWith(pShort) ? pLong.slice(pShort.length).trim() : null;
      const isPrefix = prefixSuffix !== null && (prefixSuffix === "" || /i$/.test(prefixSuffix) || prefixSuffix === "inWall");
      const [shorter, longer] = a.length <= b.length ? [a, b] : [b, a];
      const isIInsertion = a.length !== b.length && findSingleIInsertionIndex(shorter, longer) !== null;
      const isRIVariant = isTrailingRIVariant(a, b);
      return (isPrefix || isIInsertion || isRIVariant) && rowsSignature(g2) === rowsSignature(g);
    });
    if (j === -1) { merged.push(g); return; }
    consumed.add(i); consumed.add(j);
    const g2 = groups[j];
    // 짧은 쪽을 기본형(대표 id·표시 이름의 앞부분)으로 삼는다.
    const [shortG, longG] = g.speakerName.length <= g2.speakerName.length ? [g, g2] : [g2, g];
    // [사용자 요청] 병합된 행도 두 스피커(기본형/변형) 각각의 상세로
    // 들어갈 수 있어야 한다 — 이름 표기를 "기본 파트"(클릭 시 shortG로
    // 이동)와 "변형 파트"(클릭 시 longG로 이동) 두 조각으로 나눠서
    // 반환한다. nameParts 는 렌더링 시 각각 별도의 data-speaker-id 를
    // 가진 요소로 만든다.
    let nameParts;
    if (longG.speakerName.startsWith(shortG.speakerName)) {
      // 접두사 관계: 뒤에 붙는 나머지를 그대로 괄호로 표기 (K3 → K3(i))
      const suffix = longG.speakerName.slice(shortG.speakerName.length).trim();
      nameParts = suffix
        ? [{ text: shortG.speakerName, id: shortG.speakerId }, { text: `(${suffix})`, id: longG.speakerId }]
        : [{ text: shortG.speakerName, id: shortG.speakerId }];
    } else if (isTrailingRIVariant(shortG.speakerName, longG.speakerName)) {
      // 끝글자 r↔i 치환 관계: 마지막 글자를 떼고 "(r/i)"로 합쳐 표기
      // (SB10r + SB10i → SB10(r/i)) — 어느 쪽이 shortG/longG 인지는
      // 알파벳순(r < i 순서 무관)이라 실제 접미사 문자로 판별한다.
      const base = shortG.speakerName.slice(0, -1);
      const rId = shortG.speakerName.slice(-1).toLowerCase() === "r" ? shortG.speakerId : longG.speakerId;
      const iId = shortG.speakerName.slice(-1).toLowerCase() === "i" ? shortG.speakerId : longG.speakerId;
      nameParts = [{ text: base, id: null }, { text: "(r", id: rId }, { text: "/i)", id: iId }];
    } else {
      // "i" 중간 삽입 관계: 삽입 지점에 "(i)"를 끼워 넣는다
      // (A10 Focus + A10i Focus → A10(i) Focus). 앞뒤로 잘린 기본형
      // 텍스트("A10", " Focus")는 한 덩어리로 묶어 기본형(shortG)
      // 클릭 영역 하나로 취급 — 따로 나누면 같은 speakerId 인데
      // 클릭 영역만 둘로 쪼개져 어색하다.
      const insertAt = findSingleIInsertionIndex(shortG.speakerName, longG.speakerName);
      const before = shortG.speakerName.slice(0, insertAt);
      const after = shortG.speakerName.slice(insertAt);
      nameParts = [
        { text: before, id: shortG.speakerId, group: "short" },
        { text: "(i)", id: longG.speakerId, group: "long" },
        { text: after, id: shortG.speakerId, group: "short" }
      ];
    }
    merged.push({ speakerId: shortG.speakerId, nameParts, rows: g.rows });
  });

  const subCell = r => `<div class="match-table__cell match-table__cell--model"></div><div class="match-table__cell match-table__cell--mode">${r.mode ? esc(r.mode) : "—"}</div><div class="match-table__cell match-table__cell--preset">${r.preset ? esc(r.preset) : "—"}</div><div class="match-table__cell">${r.perCh != null ? r.perCh : "—"}</div><div class="match-table__cell">${r.total != null ? r.total : "—"}</div><div class="match-table__cell">${r.spl != null ? r.spl + " dB" : "—"}</div>`;

  const body = merged.map((g, gi) => {
    const sorted = [...g.rows].sort((a, b) => (b.total || 0) - (a.total || 0));
    const rep = sorted[0];
    const rest = sorted.slice(1);
    const groupId = `amp-cfg-${gi}`;
    const toggleBtn = rest.length ? `<button type="button" class="match-table__toggle-btn" data-toggle-group="${groupId}" aria-expanded="false" aria-label="설정 ${rest.length}개 더 보기">+${rest.length}</button>` : "";
    // [버그 수정] rep.speakerName 은 개별 매칭 row 의 원본 이름(병합 전
    // "K3"/"K3i")이라 병합된 그룹에서는 신뢰할 수 없다 — 병합 로직이
    // 설정한 그룹 레벨 이름(g.nameParts)을 대신 쓴다.
    // [사용자 요청] 병합된 행에서 기본형/i버전 각각의 상세로 들어갈 수
    // 있어야 한다 — g.nameParts 가 있으면(=병합된 그룹) 이름을 파트별로
    // 나눠 각자 다른 data-speaker-id 를 가진 span 으로 렌더링한다. 행
    // 전체의 data-speaker-id(mode/preset 등 나머지 셀 클릭용)는 대표
    // (g.speakerId, 기본형)로 유지 — 이름 span 자체는 이벤트 버블링으로
    // 행 클릭 핸들러도 같이 타므로, controller 에서 이름 span 클릭 시
    // 그 span 의 data-speaker-id 를 우선 사용하도록 처리해야 한다.
    const nameHTML = g.nameParts
      ? `<span class="match-table__model-name match-table__model-name--split">${g.nameParts.map(p => `<span class="match-table__model-name-part" data-speaker-id="${p.id}">${esc(p.text)}</span>`).join("")}</span>`
      : `<span class="match-table__model-name" data-speaker-id="${g.speakerId}">${esc(g.speakerName)}</span>`;
    const repRow = `<div class="match-table__row match-table__row--clickable" data-speaker-id="${g.speakerId}"><div class="match-table__cell match-table__cell--model">${nameHTML}${toggleBtn}</div><div class="match-table__cell match-table__cell--mode">${rep.mode ? esc(rep.mode) : "—"}</div><div class="match-table__cell match-table__cell--preset">${rep.preset ? esc(rep.preset) : "—"}</div><div class="match-table__cell">${rep.perCh != null ? rep.perCh : "—"}</div><div class="match-table__cell">${rep.total != null ? rep.total : "—"}</div><div class="match-table__cell">${rep.spl != null ? rep.spl + " dB" : "—"}</div></div>`;
    if (!rest.length) return repRow;
    const restRows = rest.map(r => `<div class="match-table__row match-table__row--sub" data-toggle-member="${groupId}" hidden>${subCell(r)}</div>`).join("");
    return repRow + restRows;
  }).join("");

  // match-table--amp-view 변경자 — 이 표(앰프 모달의 Configurations, "이
  // 앰프로 어떤 스피커를 구동하는가")는 스피커 모달의 Amplifier Matching
  // 표("이 스피커를 어떤 앰프로 구동하는가")와 6열 구조·클래스를 공유하지만,
  // 왼쪽 열의 실제 콘텐츠가 반대다 — 여기서는 앰프 모델명(짧다, 예:
  // "LA1.16i")이 아니라 스피커 모델명(길다, 예: "SB10i", "Syva Low" 등)이
  // 들어간다. 공유 컬럼 비율(spec-table.css .match-table__row)은 앰프 모델
  // 폭 기준으로 좁게 잡혀 있어 스피커 이름이 "S...", "5..."처럼 잘리는
  // 문제가 있었다 — 이 변경자로 앰프 쪽만 열 너비를 독립적으로 재정의한다
  // (spec-table.css 의 .match-table--amp-view 규칙 참고).
  return `<div class="match-table match-table--toggleable match-table--amp-view"><div class="match-table__row match-table__row--head"><div class="match-table__cell">Speaker</div><div class="match-table__cell">Mode</div><div class="match-table__cell">Preset</div><div class="match-table__cell">Links/ch</div><div class="match-table__cell">Max/amp</div><div class="match-table__cell">Max SPL</div></div><div class="match-table__body">${body}</div></div>`;
}

/**
 * 상세 스펙 섹션 1개 HTML — 제목(section-label) + spec-table.
 * rows 가 전부 빈 문자열(specRow 가 값 없어 생략한 경우)이면 섹션 자체를
 * 통째로 생략한다 — d&b 등 이 필드들이 없는 앰프에서 빈 제목만 남지 않게.
 * @param {string} title 섹션 제목
 * @param {string} rows specRow() 등으로 만든 spec-table__cell 마크업들의 연결
 * @returns {string}
 */
function detailSection(title, rows) {
  if (!rows || !rows.trim()) return "";
  return `<p class="section-label" style="margin-top:20px">${esc(title)}</p><div class="spec-table">${rows}</div>`;
}

/**
 * features(문자열 배열)를 칩 형태로 렌더링.
 * @param {string[]} list
 * @returns {string}
 */
function featureChips(list) {
  if (!list || !list.length) return "";
  return `<div class="chip-group">${list.map(f => `<span class="chip" style="cursor:default">${esc(f)}</span>`).join("")}</div>`;
}

/**
 * 배지(짧은 라벨) + 값 쌍의 목록을 스피커 모달의 Frequency Response와 같은
 * freq-list 그리드로 렌더링한다. Latency Standard/Low 처럼 같은 항목의
 * 서로 다른 모드를 한 셀 안에 나란히 묶어 보여줄 때 쓴다(각각 별도 행으로
 * 흩어놓지 않음). 값이 있는 항목만 표시하고, 전부 없으면 빈 문자열 반환.
 * @param {{label:string, value:*}[]} items
 * @returns {string} spec-table__value 안에 넣을 freq-list 마크업 (없으면 "")
 */
function badgeListHTML(items) {
  const rows = items.filter(it => it.value != null && String(it.value).trim() !== "")
    .map(it => `<div class="freq-list__row"><span class="freq-badge freq-badge--auto">${esc(it.label)}</span><span class="freq-list__val">${esc(it.value)}</span></div>`)
    .join("");
  return rows ? `<div class="freq-list">${rows}</div>` : "";
}

/**
 * label/value 쌍 배열(예: a.rack.content)을 spec-table 행들로 렌더링한다.
 * Rack 전용 필드들(content/audioDistribution/powerDistribution/cables)이
 * 모두 이 { label, value } 배열 형태를 공유하므로 공통 헬퍼로 뺐다.
 * @param {{label:string, value:string}[]} items
 * @returns {string} specRow 들의 연결 (항목 없으면 "")
 */
function rackRowsHTML(items) {
  if (!items || !items.length) return "";
  return items.map(it => specRow(it.label, it.value, true)).join("");
}

/**
 * 랙과 연결된 System Elements(액세서리) 목록을 Type(Rigging/Cables 등)별로
 * 묶어 클릭 가능한 칩으로 렌더링한다. 스피커 모달의 Matched Speakers 칩과
 * 동일한 패턴 — 실제 조회(cross-ref.findAccessoryById)는 controller 가
 * 미리 수행해 {id, name, type} 배열로 넘겨준다(view.js 는 cross-ref 를
 * 직접 참조하지 않는 순수 함수 원칙 유지).
 * [사용자 요청] 모달 최상단(General 위)에 배치하고, Configurations 섹션과
 * 동일한 접기/펼치기 토글(section-label--toggle, data-section-toggle)을
 * 적용한다 — 클릭 배선은 js/ui/modal.js 의 공통 섹션 토글 배선이
 * 도메인 무관하게 처리하므로 마크업만 그 패턴에 맞추면 된다.
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
  return `<button type="button" class="section-label section-label--toggle" data-section-toggle="amp-system-elements" aria-expanded="false">System Elements<span class="section-label__arrow">▸</span></button><div data-section-toggle-body="amp-system-elements" hidden>${groupsHTML}</div>`;
}

/**
 * Rack 타입 앰프(LA-RAK III 등) 전용 모달 body — 개별 앰프(Amplified
 * Controller)와는 데이터 우선순위가 근본적으로 달라 별도 함수로 분리했다.
 * 랙은 "이 랙 안에 무엇이 들어있는가(Content)"가 가장 먼저 알아야 할
 * 정보이고, 그다음 배전(오디오/전원)·케이블·물리 스펙·리깅 순으로 실사용
 * 우선순위를 매겼다 — 개별 앰프 모달의 DSP/Ecosystem 같은 섹션은 랙
 * 자체에는 해당 없어(a.dsp/a.io 가 null) 등장하지 않는다.
 * 섹션 순서: System Elements(연관 액세서리, 접힌 토글, 클릭 시 Split View)
 *   → General(개요) → Content(구성품, 최우선 — "무엇이 들어있나")
 *   → Power Distribution → Audio Distribution → Network → Cables
 *   → Physical(무게/치수/재질) → Rigging & Handling → Notes & Protection.
 * @param {Object} a 앰프 레코드 (a.type === "Rack")
 * @param {string} media 이미지 마크업 (modalBodyHTML 에서 공통 생성해 전달)
 * @param {Object} physicalRowsExtra 물리 스펙 spec-table 행 문자열 (weight/dims 포함, modalBodyHTML 과 공유)
 * @param {{id:string, name:string, type:string}[]} relatedAccessories 연관 System Elements (controller 가 findAccessoryById 로 조회해 전달)
 * @returns {string} modal__body 마크업
 */
function rackBodyHTML(a, media, physicalRowsExtra, relatedAccessories) {
  const rack = a.rack || {};
  const generalRows = [
    specRow("Architecture", a.architecture, true),
    specRow("Output Power", a.output && a.output.powerTotal, true),
    specRow("Power Requirements", a.mains && a.mains.powerRequirements, true),
    specRow("Connectivity", (a.connectivity || []).join(" · "), true),
    specRow("Network", rack.network),
    specRow("Usage", a.usage),
  ].join("");

  const contentRows = rackRowsHTML(rack.content);
  const powerRows = rackRowsHTML(rack.powerDistribution);
  const audioRows = rackRowsHTML(rack.audioDistribution);
  const cableRows = rackRowsHTML(rack.cables);

  return `${media}
    <div class="modal__body" id="modal-body-main">
      ${systemElementsHTML(relatedAccessories)}
      ${a.notes ? `<p class="modal__notes modal__notes--after-toggle">${esc(a.notes)}</p>` : ""}
      <p class="section-label">General</p>
      <div class="spec-table">
        ${generalRows}
      </div>
      ${detailSection("Content", contentRows)}
      ${detailSection("Power Distribution", powerRows)}
      ${detailSection("Audio Distribution", audioRows)}
      ${detailSection("Cables", cableRows)}
      ${a.features && a.features.length ? `<p class="section-label" style="margin-top:20px">Features</p>${featureChips(a.features)}` : ""}
      ${detailSection("Physical", physicalRowsExtra)}
      ${rack.rigging ? `<p class="section-label" style="margin-top:20px">Rigging & Handling</p><div class="spec-table">${specRow("Storage & Transportation", rack.rigging, true)}</div>` : ""}
    </div>`;
}

/**
 * 앰프 상세 모달의 head/body 마크업을 생성한다.
 * 매칭 스피커 칩에는 data-speaker-id 가 붙는다 — 클릭 → Split View 연결은
 * controller 가 담당 (앰프 → 스피커 방향).
 * @param {Object} a 앰프 레코드
 * @param {Function|null} resolveSpeakerName (speakerId) => 표시 이름
 * @param {string[]} [speakerIds] 이 앰프를 매칭하는 스피커 id 목록. 미지정 시
 *   a.relations.speakerIds 로 폴백(레거시 정적 필드 — 현재는 비어있는 경우가
 *   많으므로 controller 가 cross-ref.findSpeakersMatchingAmp() 로 동적 계산해
 *   넘겨주는 것을 권장).
 * @param {Object[]} [configsBySpeaker] cross-ref.findAmpConfigsBySpeaker() 로
 *   구한 스피커 기준 설정 행. a.configs(앰프 자체 필드)가 비어있을 때
 *   Configurations 표를 이걸로 대체 렌더링한다(LA1.16i 등).
 * @param {{id:string, name:string, type:string}[]} [relatedAccessories] Rack
 *   타입 앰프(a.rack.relatedAccessoryIds)의 System Elements 조회 결과.
 *   controller 가 cross-ref.findAccessoryById() 로 미리 조회해 전달한다.
 * @returns {{color: string, head: string, body: string}}
 */
export function modalBodyHTML(a, resolveSpeakerName, speakerIds, configsBySpeaker, relatedAccessories) {
  const M = AMP_MFR[a.mfr], color = M.color;
  // 뷰가 2개 이상(Front/Rear/Isometric 등)인 앰프만 전환 버튼을 노출한다
  // — speakers.view.js modalBodyHTML 의 동일 로직 재사용(getViews, 버튼
  // 클릭 연결은 js/ui/modal.js 의 wireViewSwitch 가 도메인 무관하게 처리).
  const views = getViews(a);
  const viewSlug = label => label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  // 1U 랩마운트 앰프(LA1.16i 등)는 실물 비율이 매우 가로로 길어 기본
  // max-width 74% 를 쓰면 세로 크기가 지나치게 얇아진다 — card__img--wide
  // 와 동일한 이유로 modal__img--wide 변경자를 둬서 max-width 만 넓힌다.
  const media = views.length
    ? (views.length > 1
        ? `<div class="modal__media-wrap">
            <div class="modal__media">
              ${views.map((v, i) => `<img class="modal__img modal__img--wide" data-view="${viewSlug(v.label)}" src="${v.src}" alt="${esc(a.model)} ${esc(v.label)}" loading="lazy" decoding="async"${i === 0 ? "" : " hidden"}>`).join("")}
            </div>
            <div class="modal__view-switch" role="group" aria-label="이미지 보기 선택">
              ${views.map((v, i) => `<button type="button" class="modal__view-btn${i === 0 ? " is-active" : ""}" data-view-switch="${viewSlug(v.label)}">${esc(v.label)}</button>`).join("")}
            </div>
          </div>`
        : `<div class="modal__media"><img class="modal__img--wide" src="${views[0].src}" alt="${esc(a.model)}"></div>`)
    : "";
  const head = `<div class="modal__head">
      <div class="eyebrow"><span class="eyebrow__brand" style="color:${color}">${esc(M.name)}</span> · ${esc(a.powerClass || "")}</div>
      <div class="modal__title">${esc(a.model)}</div>
      <button class="modal__close" data-modal-close aria-label="닫기"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    </div>`;
  // 상세 스펙 섹션들 — mains/io/output/dsp/ecosystem 등은 L-Acoustics
  // LA1.16i 부터 도입된 신규 필드(v1.1)라 d&b 등 기존 앰프에는 없을 수
  // 있다. detailSection()이 빈 rows 는 섹션째로 생략하므로, 필드가 없는
  // 앰프의 모달에는 자연스럽게 General/Configurations/Matched Speakers만
  // 남고 나머지 섹션은 나타나지 않는다.
  const mains = a.mains || {};
  const io = a.io || {};
  const output = a.output || {};
  const dsp = a.dsp || {};
  const eco = a.ecosystem || {};
  const note = a.note || {};

  // [정보 재구성] speakers.view.js modalBodyHTML 과 동일한 원칙 — 실사용에
  // 필요한 핵심 스펙을 최상단 spec-table 하나에 압축하고, 섹션을 잘게
  // 쪼개 스크롤을 늘리지 않는다. 기존에는 General/Mains/I·O/Output/DSP/
  // Ecosystem 이 6개 섹션으로 나뉘어 있었는데:
  //   - output.channels 는 General 의 Channels 와 항상 같은 값이라 중복
  //     이었으므로 제거(CLAUDE.md "중복 정보 생략" 원칙).
  //   - Connectivity(대역폭 연결 방식)는 I·O 스펙과 성격이 같아 General
  //     에서 빼내 I/O 섹션으로 합쳤다.
  //   - Power Supply/External DSP Backup 은 전원 관련 스펙이라 Mains
  //     섹션으로 합쳤다.
  //   - I/O 와 Output 은 "입력 쪽/출력 쪽"으로 나뉘어 있었지만 실사용
  //     관점에서는 "이 앰프의 연결·출력 스펙"으로 함께 보는 게 자연스러워
  //     하나의 Connections & Output 섹션으로 합쳤다.
  //   - IP 등급/랙유닛/무게/냉각/동작온도는 "이 앰프가 무엇인가"보다는
  //     설치 시에나 참고하는 물리적 스펙이라 General 에서 빼내 맨 아래
  //     Physical 섹션으로 내렸다.
  // 그 결과 General(개요) → Matched Speakers/Configurations(가장 자주
  // 쓰는 정보) → Mains → Connections & Output → DSP → Ecosystem → Features
  // → Notes & Protection → Physical(부가 정보) 순으로, 중요도 높은 정보가
  // 위로, 설치용 참고 스펙은 맨 아래로 정리됐다.
  // General 은 "이 앰프가 무엇인가"(채널·파워클래스·타입·용도)만 남기고,
  // 설치/물리 스펙(IP 등급·랙유닛·무게·냉각·동작온도)은 실사용 의사결정
  // (구동 가능한 스피커/모드 확인)에는 덜 중요한 부가 정보라 Physical
  // 섹션으로 분리해 아래쪽으로 뺀다.
  const generalRows = [
    specRow("Channels", a.channels != null ? a.channels + "ch" : null),
    specRow("Power Class", a.powerClass),
    specRow("Type", a.type),
    specRow("Usage", a.usage),
  ].join("");

  // Weight/Dimensions — speakers.view.js weightDimsIpRow 와 동일한 kg/lb,
  // mm/in 토글 패턴(사용자 요청: 스피커와 통일감). 버튼 클릭 배선은
  // js/ui/modal.js 의 wireDimsUnitSwitch/wireWeightUnitSwitch 가 도메인
  // 구분 없이 data-attribute 로 공통 처리하므로 마크업만 맞추면 된다.
  const weightLbCalc = a.weight != null ? (a.weightLb != null ? a.weightLb : Math.round(a.weight * 2.20462)) : null;
  const weightCell = a.weight != null ? `<div class="spec-table__key-row">
        <div class="spec-table__key">Weight</div>
        <div class="dims-unit-switch" role="group" aria-label="무게 단위 선택">
          <button type="button" class="dims-unit-btn is-active" data-weight-unit="kg">kg</button>
          <button type="button" class="dims-unit-btn" data-weight-unit="lb">lb</button>
        </div>
      </div>
      <div class="spec-table__value" data-weight-kg>${esc(a.weight + " kg")}</div>
      <div class="spec-table__value" data-weight-lb hidden>${esc(weightLbCalc + " lb")}</div>` : `<div class="spec-table__key">Weight</div><div class="spec-table__value spec-table__value--na">—</div>`;
  const dims = a.dimensions || {};
  const dimsCell = (dims.mm || dims.in) ? `<div class="spec-table__key-row">
        <div class="spec-table__key">Dimensions</div>
        <div class="dims-unit-switch" role="group" aria-label="치수 단위 선택">
          <button type="button" class="dims-unit-btn is-active" data-dims-unit="mm">mm</button>
          <button type="button" class="dims-unit-btn" data-dims-unit="in">in</button>
        </div>
      </div>
      <div class="spec-table__value" data-dims-mm>${esc(dims.mm || "—")}</div>
      <div class="spec-table__value" data-dims-in hidden>${esc(dims.in || "—")}</div>` : `<div class="spec-table__key">Dimensions</div><div class="spec-table__value spec-table__value--na">—</div>`;

  const physicalRows = [
    specRow("IP Rating", a.ipRating),
    specRow("Rack Unit", a.rackUnit != null ? a.rackUnit + "U" : null),
    specRow("Cooling", a.cooling),
    specRow("Operating Temp", a.operatingTemp),
    `<div class="spec-table__cell spec-table__cell--full"><div class="spec-table__tri" style="grid-template-columns:1fr 1fr"><div>${dimsCell}</div><div>${weightCell}</div></div></div>`,
    specRow("Material", a.material, true),
    specRow("Rigging & Handling", a.rigging, true),
  ].join("");

  const mainsRows = [
    specRow("Rating", mains.rating),
    specRow("Connector", mains.connector),
    specRow("Power Supply", a.powerSupply),
    specRow("External DSP Backup", a.externalDspBackup),
    specRow("Power Requirements", mains.powerRequirements, true),
  ].join("");

  // Connections & Output — 입력 연결(Connectivity/Analog/AES/Network)과
  // 출력 스펙(Connectors/Impedance/Power)을 한 섹션에 모은다. output.channels
  // 는 General 의 Channels 와 값이 항상 같아 제거했다(중복 정보 생략).
  // output.powerByOhm(예: LA12X — 2.7Ω/4Ω/8Ω 3가지 임피던스)이 있으면
  // 스피커 도메인의 wattByBand(LF/MF/HF 배지+값 리스트)와 동일한 패턴으로
  // badgeListHTML 을 재사용해 임피던스별 출력을 한 셀에 나란히 보여준다.
  // 기존 2임피던스(power8ohms/power4ohms)만 있는 앰프(LA1.16i 등)는 이
  // 필드가 없으므로 기존 개별 행 방식 그대로 유지된다.
  const powerByOhmList = badgeListHTML((output.powerByOhm || []).map(p => ({ label: p.ohm, value: p.power })));
  const ioRows = [
    specRow("Connectivity", (a.connectivity || []).join(" · "), true),
    specRow("Analog In", io.analogIn),
    specRow("AES In", io.aesIn),
    specRow("Network Audio", io.networkAudio),
    specRow("Network Redundancy", io.networkRedundancy),
    specRow("Connections", io.connections, true),
    specRow("Output Connectors", output.connectors),
    specRow("Min Impedance", output.minImpedance),
    specRow("Total Power", output.powerTotal),
    `<div class="spec-table__cell spec-table__cell--full"><div class="spec-table__key">Output Power (All Channels Loaded)</div><div class="spec-table__value${powerByOhmList ? '' : ' spec-table__value--na'}">${powerByOhmList || "—"}</div></div>`,
    specRow("Power @8Ω", output.power8ohms),
    specRow("Power @4Ω", output.power4ohms),
    specRow("Power BTL @8Ω", output.powerBtl8ohms),
    specRow("Max Voltage", output.maxVoltage),
    specRow("Max Current", output.maxCurrent),
    specRow("GPIO", a.gpio),
  ].join("");

  // Latency Standard/Low 와 Sample Rate Internal/AES In/Network In 모두
  // Frequency Response(-3dB/-6dB/-10dB)와 같은 방식으로 "모드 배지 + 값"을
  // 한 셀에 나란히 묶는다(badgeListHTML). Sample Rate 는 값이 길어 배지
  // 폭이 자동(freq-badge--auto)이라도 한 줄에 다 안 들어갈 수 있으므로
  // 병합 셀(--full)에 넣어 폭을 넉넉히 확보한다.
  const latencyList = badgeListHTML([
    { label: "Standard", value: dsp.latencyStandard },
    { label: "Low", value: dsp.latencyLow },
  ]);
  const sampleRateList = badgeListHTML([
    { label: "Internal", value: dsp.sampleRateInternal },
    { label: "AES In", value: dsp.sampleRateAesIn },
    { label: "Network In", value: dsp.sampleRateNetworkIn },
  ]);
  // [사용자 요청] 값이 하나도 없어도 "Sample Rate"/"Latency" 행 자체는
  // 항상 렌더링(brandconsistency) — specRow 와 동일하게 "—"로 표시.
  const dspRows = [
    specRow("Engine", dsp.engine),
    `<div class="spec-table__cell spec-table__cell--full"><div class="spec-table__key">Sample Rate</div><div class="spec-table__value${sampleRateList ? '' : ' spec-table__value--na'}">${sampleRateList || "—"}</div></div>`,
    specRow("Bit Depth", dsp.bitDepth),
    specRow("Routing", dsp.routing),
    specRow("EQ Specs", dsp.eqSpecs, true),
    specRow("Preset Library", dsp.presetLibrary),
    `<div class="spec-table__cell"><div class="spec-table__key">Latency</div><div class="spec-table__value${latencyList ? '' : ' spec-table__value--na'}">${latencyList || "—"}</div></div>`,
    specRow("Delay Setting", dsp.delaySetting),
    specRow("Dynamic Range", dsp.dynamicRange),
  ].join("");

  const ecoRows = [
    specRow("Control Software", eco.controlSoft),
    specRow("Integrations", (eco.integrations || []).join(" · ")),
  ].join("");

  const noteRows = [
    specRow("Model Type", note.modelType, true),
    specRow("Channel Processing", note.channelProcessing, true),
    specRow("Protection", note.protection, true),
    specRow("Interface", note.interface, true),
  ].join("");

  // Matched Speakers/Configurations 는 Split View 로 스피커 상세를 오가며
  // 가장 자주 쓰이는 핵심 정보라, 상세 스펙(Mains/I·O/Output/DSP/...)보다
  // 먼저 General 섹션 바로 아래에 배치한다 — 모달을 열자마자 스크롤 없이
  // 바로 매칭 스피커 칩을 보고 클릭할 수 있게.
  // a.notes(자유 서술문, 예: "설치용(install-only) 16채널 앰프 컨트롤러...")는
  // 카드에서는 뺐다(스피커 카드의 card__config 처럼 짧은 스펙 요약이 아니라
  // 문장형이라 카드 첫 화면에는 어울리지 않음) — 정보 자체는 유실하지 않고
  // 모달 상세 첫 줄(General 표 바로 위)에 노출한다.
  // [Rack 타입 분기] LA-RAK III 등 "랙 시스템"은 개별 앰프와 데이터
  // 우선순위가 근본적으로 다르다(DSP/샘플레이트 등은 해당 없고, 대신
  // "무엇이 들어있는가/배전/케이블/리깅"이 핵심) — rackBodyHTML 로 완전히
  // 별도 렌더링하고, head/media(이미지 전환 등)만 공통 로직을 재사용한다.
  if (a.type === "Rack") {
    return { color, head, body: rackBodyHTML(a, media, physicalRows, relatedAccessories) };
  }

  const body = `${media}
    <div class="modal__body" id="modal-body-main">
      ${a.notes ? `<p class="modal__notes">${esc(a.notes)}</p>` : ""}
      <div class="spec-table">
        ${generalRows}
      </div>
      <button type="button" class="section-label section-label--toggle" style="margin-top:20px" data-section-toggle="amp-configs" aria-expanded="false">Configurations<span class="section-label__arrow">▸</span></button>
      <div data-section-toggle-body="amp-configs" hidden>
        ${a.configs && a.configs.length ? configsTableHTML(a.configs) : configsBySpeakerTableHTML(configsBySpeaker || [])}
      </div>
      ${detailSection("Power", mainsRows)}
      ${detailSection("Connections & Output", ioRows)}
      ${detailSection("DSP", dspRows)}
      ${detailSection("Ecosystem", ecoRows)}
      ${a.features && a.features.length ? `<p class="section-label" style="margin-top:20px">Features</p>${featureChips(a.features)}` : ""}
      ${detailSection("Notes & Protection", noteRows)}
      ${detailSection("Physical", physicalRows)}
    </div>`;
  return { color, head, body };
}
