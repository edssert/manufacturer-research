/**
 * @module domains/speakers/schema
 * 범용 필터/그리드 엔진(core/filter-engine.js)이 이 도메인 레코드를 어떻게
 * 다룰지 선언하는 스키마. 검색 필드·칩 필터·범위 필터·정렬 규칙과
 * 제조사 표시 정보(MFR 맵: 이름/색상/축약형)가 모두 여기에 모여 있다.
 * UI 나 데이터 파일이 아닌 "규칙"을 바꿀 때 수정하는 파일.
 */
// This is the only place that knows Speakers have fields like "mk", "type", "lowInch", "spl".
import { normalizeSearchText } from "../../core/filter-engine.js";

export const MFR = {
  la: { name: "L-Acoustics", color: "var(--la)", short: "L-ACOUSTICS" },
  db: { name: "d&b audiotechnik", color: "var(--db)", short: "d&b" },
  my: { name: "Meyer Sound", color: "var(--my)", short: "MEYER" },
};
export const MK_ORDER = ["la", "db", "my"];
export const TYPE_ORDER = ["Line Array", "Progressive Ultra-Dense Line Source", "Constant Curvature Line", "Point", "Colinear", "Subwoofer"];
// [사용자 요청] Type 태그가 card__config 줄(전용 한 줄, 공간 여유)로 옮겨간
// 뒤로는 축약할 필요가 없어져 풀스펠링을 그대로 쓴다 — 매핑은 빈 상태로 유지
// (필요해지면 TYPE_BADGE_LABEL[v] || v 폴백 그대로 재사용 가능).
export const TYPE_BADGE_LABEL = {};
// Controls the order series/subgroups appear in within the "series" sort view.
// Standalone subwoofer series (no throwCat, e.g. L-Acoustics "Subwoofers") sort
// after the throw-distance tiers; anything unrecognized falls back after that.
export const THROWCAT_ORDER = ["Long Throw", "Medium Throw", "Short Throw"];
// d&b 시리즈는 throwCat 이 없어(둘 다 null) THROWCAT_ORDER 로 순서가 갈리지
// 않고 알파벳순("CL"<"SL")으로 밀렸었다 — 사용자 요청으로 SL 을 CL 보다
// 먼저 오도록 명시 우선순위 지정(speakers.controller.js subGroupOrder 참고).
// Meyer Sound 도 동일한 이유(모든 시리즈 throwCat: null)로 알파벳순
// (LEOPARD<LINA<PANTHER<TIGRA)으로 밀렸었다 — 사용자 요청으로 체급(무게) 큰
// 순서로 명시 지정: PANTHER(68kg) > TIGRA(54kg) > LEOPARD(34kg) > LINA(19.5kg).
export const SERIES_ORDER_OVERRIDE = {
  "SL Series": 0, "CL Series": 1,
  "PANTHER Series": 2, "TIGRA Series": 3, "LEOPARD Series": 4, "LINA Series": 5,
};
export const WAY_ORDER = ["2-way", "3-way", "16-channel", "N/A"];
export const NETWORK_ORDER = ["Active", "Passive", "Hybrid"];
const WAY_LABEL = { "2-way": "2-Way", "3-way": "3-Way", "16-channel": "16-Channel", "N/A": "Full-range / Sub" };

// Controls the order the "Low Unit Config" chip filter appears in. Korean public
// tender specs (나라장터/조달청) commonly gate on whether the low unit is a dual
// configuration, so this is exposed as its own chip filter (see lowUnitConfig below).
export const LOW_UNIT_CONFIG_ORDER = ["Single", "Dual", "Multi"];

// Derives { wayCount, network } from the raw `crossover` string (e.g. "3-way, active",
// "2-way, passive", "passive", "3-way, active, passive", "16-channel, active").
// Mutates each speaker in place — called once at load time in main.js before any
// rendering happens, so downstream code can treat wayCount/network as plain fields
// (the generic filter engine only knows how to read flat fields, not parse strings).
export function normalizeCrossover(speakers) {
  speakers.forEach(d => {
    const cx = (d.crossover || "").toLowerCase();
    let wayCount = "N/A";
    if (cx.includes("16-channel")) wayCount = "16-channel";
    else if (cx.includes("3-way")) wayCount = "3-way";
    else if (cx.includes("2-way")) wayCount = "2-way";
    const hasActive = cx.includes("active");
    const hasPassive = cx.includes("passive");
    let network = "Passive";
    if (hasActive && hasPassive) network = "Hybrid";
    else if (hasActive) network = "Active";
    else if (hasPassive) network = "Passive";
    d.wayCount = wayCount;
    d.network = network;
  });
  return speakers;
}

// Derives `lowUnitConfig` from `lowQty` (number of low-frequency drivers):
// exactly 2 => "Dual" (the configuration Korean public-tender specs usually
// gate on), 1 => "Single", 3+ => "Multi". Mutates each speaker in place,
// same pattern/timing as normalizeCrossover (called once at load time).
export function normalizeLowUnitConfig(speakers) {
  speakers.forEach(d => {
    const q = d.lowQty;
    let cfg = "N/A";
    if (q === 1) cfg = "Single";
    else if (q === 2) cfg = "Dual";
    else if (q > 2) cfg = "Multi";
    d.lowUnitConfig = cfg;
  });
  return speakers;
}

// Parses a raw coverage-angle string (cov.h / cov.v) into a [min, max] range
// in degrees, so it can be used with the generic range-slider filter engine.
// Raw formats found in the data (see speakers data files) and how each is
// interpreted:
//   "90°"                          -> [90, 90]                 단일 값
//   "100° to 140°"                 -> [100, 140]                진짜 연속 범위
//   "80°,120°"                     -> [80, 120]                 콤마로 나열된 개별 옵션들의 최소~최대
//   "55°/35°"                      -> 55+35=90 -> [90, 90]      좌우(또는 상하) 대칭 절반의 합산 실효각
//   "110°,70°,55°/35°,35°/55°"     -> 각 콤마 그룹을 위 규칙으로 해석 후 [min,max]
//                                      (110, 70, 90, 90 중 최소~최대 = [70, 110])
//   "+5°/-21°"                     -> |5-(-21)|=26 -> [26, 26]  부호 있는 비대칭 틸트의 스팬(합계)
// 값이 없거나 파싱 불가하면 null.
export function parseAngleRange(raw) {
  if (!raw) return null;
  const s = String(raw).trim();

  // "A to B" — 진짜 연속 범위 표기
  const toMatch = s.match(/^([\d.]+)\s*°?\s*to\s*([\d.]+)\s*°?$/i);
  if (toMatch) {
    const a = parseFloat(toMatch[1]), b = parseFloat(toMatch[2]);
    return [Math.min(a, b), Math.max(a, b)];
  }

  // 콤마로 여러 그룹(=여러 프리셋/옵션) 분리, 그룹별로 슬래시 결합 규칙 적용
  const groups = s.split(",").map(g => g.trim()).filter(Boolean);
  const values = [];
  groups.forEach(g => {
    const signedNums = g.match(/[+-]?\d+(?:\.\d+)?/g) || [];
    const hasSign = /[+-]/.test(g);
    if (g.includes("/") && hasSign && signedNums.length === 2) {
      // 부호 있는 슬래시("+5°/-21°"): 위/아래 비대칭 틸트 -> 절대 스팬(합계)
      const a = parseFloat(signedNums[0]), b = parseFloat(signedNums[1]);
      values.push(Math.abs(a - b));
    } else if (g.includes("/")) {
      // 부호 없는 슬래시("55°/35°"): 좌우 대칭 절반 -> 합산 실효각
      const nums = (g.match(/[\d.]+/g) || []).map(parseFloat);
      values.push(nums.reduce((a, b) => a + b, 0));
    } else {
      const nums = (g.match(/[\d.]+/g) || []).map(parseFloat);
      if (nums.length) values.push(nums[0]);
    }
  });
  if (!values.length) return null;
  return [Math.min(...values), Math.max(...values)];
}

// Derives range-filterable numeric fields from `cov` (coverage angle object)
// and stores them as plain [min,max] arrays: `hRange`/`vRange` (horizontal /
// vertical coverage angle) and `splayRange` (inter-element splay angle set).
// Mutates each speaker in place, same load-time pattern as the other
// normalize*() functions in this file.
export function normalizeAngleRanges(speakers) {
  speakers.forEach(d => {
    const cov = d.cov;
    d.hRange = cov ? parseAngleRange(cov.h) : null;
    d.vRange = cov ? parseAngleRange(cov.v) : null;
    if (cov && cov.splayList && cov.splayList.length) {
      d.splayRange = [Math.min(...cov.splayList), Math.max(...cov.splayList)];
    } else {
      d.splayRange = null;
    }
  });
  return speakers;
}

export const speakersSchema = {
  unitLabel: "models",
  emptyTitle: "일치하는 스피커가 없습니다",
  emptyHint: "검색어나 필터 조건을 넓혀 보세요.",
  searchFields: ["name", "series"],
  // q 는 filter-engine 이 이미 normalizeSearchText 로 정규화해 넘긴다 —
  // 비교 대상(제조사명)도 같은 함수로 정규화해야 "lacoustics" 등이 매칭된다.
  customSearchMatch: (item, q) => normalizeSearchText(MFR[item.mk].name).includes(q), // also match manufacturer name
  chipFields: [
    { key: "mk", label: "Manufacturer", order: MK_ORDER, labelFor: (v) => MFR[v].name },
    { key: "type", label: "Type", order: TYPE_ORDER },
    { key: "lowInch", label: 'Low Driver ″', labelFor: (v) => v + "″" },
    { key: "lowUnitConfig", label: "Low Unit Config", order: LOW_UNIT_CONFIG_ORDER },
    { key: "wayCount", label: "Way", order: WAY_ORDER, labelFor: (v) => WAY_LABEL[v] || v },
    { key: "network", label: "Network", order: NETWORK_ORDER },
  ],
  rangeFields: [
    { key: "spl", label: "Max SPL", unit: "dB SPL" },
    // step:100 makes the slider snap to hundreds (나라장터/조달청 tender specs commonly
    // gate on "OOOW 이상" in round hundreds) instead of SPL's 1-unit granularity.
    { key: "watt", label: "Max Watt", unit: "W", step: 100 },
    // ── 각도 범위 필터 (isRange: true — 값이 스칼라가 아니라 [min,max] 배열) ──
    // 필터 슬라이더의 [lo,hi] 구간과 항목의 [min,max] 구간이 하나라도 겹치면
    // 통과시킨다 (core/filter-engine.js 의 passes() 참조).
    // splayRange: Inter-element Splay(엘리먼트 간 선택 각도) — 원본 데이터가
    // 0.25° 단위까지 있어 조작 정밀도를 위해 step 1°.
    { key: "splayRange", label: "Splay Angle", unit: "°", step: 1, isRange: true },
    // hRange/vRange: 수평/수직 커버리지 각도 — 원본 스팬이 10~140°로 넓고
    // 정수 단위 표기뿐이라 5° 단위가 조작하기 편하다.
    { key: "hRange", label: "Horizontal", unit: "°", step: 5, isRange: true },
    { key: "vRange", label: "Vertical", unit: "°", step: 5, isRange: true },
  ],
  defaultSort: "series",
  sorters: {
    spl: (a, b) => (b.spl || 0) - (a.spl || 0) || a.name.localeCompare(b.name),
    "inch-desc": (a, b) => (b.lowInch || 0) - (a.lowInch || 0) || a.name.localeCompare(b.name),
    "inch-asc": (a, b) => (a.lowInch || 0) - (b.lowInch || 0) || a.name.localeCompare(b.name),
    name: (a, b) => a.name.localeCompare(b.name),
    // "series" sort is handled via groupBy in the view (matches legacy grouped-by-series behavior)
    series: (a, b) => a.name.localeCompare(b.name),
  },
};
