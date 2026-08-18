/**
 * @module domains/speakers/schema
 * 범용 필터/그리드 엔진(core/filter-engine.js)이 이 도메인 레코드를 어떻게
 * 다룰지 선언하는 스키마. 검색 필드·칩 필터·범위 필터·정렬 규칙과
 * 제조사 표시 정보(MFR 맵: 이름/색상/축약형)가 모두 여기에 모여 있다.
 * UI 나 데이터 파일이 아닌 "규칙"을 바꿀 때 수정하는 파일.
 */
// This is the only place that knows Speakers have fields like "mk", "type", "lowInch", "spl".
import { normalizeSearchText } from "../../core/filter-engine.js";
import { MANUFACTURERS, MANUFACTURER_ORDER } from "../../core/manufacturers.js";

export const MFR = MANUFACTURERS;
export const MK_ORDER = MANUFACTURER_ORDER;
export const TYPE_ORDER = [
  "Line Array",
  "Progressive Ultra-Dense Line Source",
  "Constant Curvature Line",
  "Point",
  "Colinear",
  "Subwoofer",
];
// Type 태그가 card__config 줄(전용 한 줄, 공간 여유)로 옮겨간
// 뒤로는 축약할 필요가 없어져 풀스펠링을 그대로 쓴다 — 매핑은 빈 상태로 유지
// (필요해지면 TYPE_BADGE_LABEL[v] || v 폴백 그대로 재사용 가능).
export const TYPE_BADGE_LABEL = {};
export const THROWCAT_ORDER = ["Long Throw", "Medium Throw", "Short Throw"];
export const SERIES_ORDER_BY_MANUFACTURER = Object.freeze({
  la: Object.freeze(["K Series", "L Series", "A Series", "X Series", "S Series", "Subwoofers"]),
  db: Object.freeze([
    "SL Series",
    "V Series",
    "Y Series",
    "T Series",
    "CL Series",
    "AL Series",
    "xS Series",
    "xC Series",
    "E Series",
    "U Series",
    "Monitors",
    "Subwoofers",
  ]),
  my: Object.freeze([
    "PANTHER Series",
    "TIGRA Series",
    "LEOPARD Series",
    "LINA Series",
    "ULTRA-X Series",
    "UP Series",
    "Ashby Series",
    "MJF Series",
    "MM Series",
    "LFC Series",
    "USW Series",
    "Cinema Series",
  ]),
  ad: Object.freeze(["Vergence Group", "CS Series", "M Series", "IS Series", "S Series", "E Series"]),
  co: Object.freeze(["CO Series", "CP Series", "CM Series", "CSB Series", "CF Series"]),
  nexo: Object.freeze([
    "Alpha+ Series",
    "STM",
    "M28",
    "GEO M Series",
    "P+ Series",
    "ID Series",
    "ePS Series",
    "ePS Outdoor",
    "45N12",
    "GEO S12",
    "LS18",
    "RS",
  ]),
  martin: Object.freeze([
    "Wavefront Precision",
    "Torus",
    "FlexPoint",
    "TH Series",
    "XE Stage Monitors",
    "CDD-LIVE!",
    "O-Line",
    "BlacklineQ",
    "BlacklineX Powered Series",
    "BlacklineX Series",
    "CDD/CDD-WR Series",
    "Adorn Series",
    "Ceiling Series",
    "SX Series",
    "LE Stage Monitors",
    "Blackline3 Series",
    "DDX Series",
    "V.Series",
    "S.Series",
    "D.Series",
    "P.I.",
    "XD Series",
  ]),
  jbl: Object.freeze([
    "VTX Touring Systems",
    "SRX Touring Systems",
    "VLA & VRX Line Arrays",
    "Portable Powered Systems",
    "Portable Passive Systems",
    "Installed High-Output Systems",
    "Installed Columns & Distributed",
    "Installed Ceiling Systems",
    "Installed Surface & Architectural",
    "Landscape & Paging",
  ]),
  pk: Object.freeze(["Line Source", "Low Frequency", "Point Source"]),
  eaw: Object.freeze([
    "ADAPTive Series",
    "Newport",
    "KF Series",
    "QX Series",
    "MKD Series",
    "MK Series",
    "MKC Series",
    "RSX Series",
    "RS Series",
    "LA Series",
    "SB Series",
    "SBX Series",
    "MW Series",
    "SM Series",
    "CIS Series",
    "LS Series",
  ]),
  coda: Object.freeze([
    "ViFORCE Series",
    "AiRAY Series",
    "CiRAY Series",
    "ViRAY Series",
    "N-RAY Series",
    "TiRAY Series",
    "CoRAY Series",
    "APS Series",
    "APSi Series",
    "N-APS Series",
    "HOPS Series",
    "CUE Series",
    "SC SUB Series",
    "G Series",
    "D Series",
    "Multipurpose Subwoofers",
    "Special Applications",
  ]),
  funktion: Object.freeze([
    "Vero",
    "Vero VX",
    "Evolution",
    "Compact",
    "Horn Loaded Bass",
    "Bass Reflex",
    "Dance Stack",
    "Public Address",
    "Monitor",
  ]),
  ev: Object.freeze([
    "EVERSE",
    "EKX",
    "EVC",
    "EVID ENTRY CEILING",
    "EVID CEILING G2",
    "EVOLVE",
    "EVA",
    "PXM",
    "ELX200",
    "ZLX G2",
    "EVIVA",
    "EVF G2",
    "EVH G2",
    "LRC",
    "ETX",
    "EVID PENDANT",
    "MTS",
    "X-Line Advance",
    "MFX",
    "EVID SURFACE",
    "EVID PREMIUM CEILING",
    "XLE",
    "XLD",
    "Other Installed",
    "EVID CEILING",
  ]),
  rcf: Object.freeze([
    "HDL Series",
    "HDL Flyable Subwoofers",
    "KX Series",
    "NX Column Arrays",
    "NX 9 Series",
    "NX Series",
    "NX Stage Monitors",
    "SUB 9000",
    "SUB Series",
    "ART 9 Series",
    "ART 7 MK5 Series",
    "EVOX Systems",
    "SUB AX Series",
    "Portable SUB Series",
    "HL Series",
    "HVL Series",
    "X Series",
    "COMPACT C Series",
    "COMPACT Series",
    "COMPACT M Series",
    "COMPACT A Series",
    "P Series",
    "MAX Series",
    "ART Installed",
    "Premium Speakers",
    "Speaker & Ceiling",
    "VSA Series",
    "Installed High-Power Subwoofers",
    "Installed Compact Subwoofers",
    "Acoustica Subwoofers",
    "Ultra-Compact Subwoofers",
  ]),
});

export function seriesRank(manufacturerId, series) {
  const order = SERIES_ORDER_BY_MANUFACTURER[manufacturerId];
  const index = order?.indexOf(series) ?? -1;
  return index < 0 ? Number.MAX_SAFE_INTEGER : index;
}

const PRODUCT_ORDER_BY_SERIES = Object.freeze({
  "eaw::ADAPTive Series": Object.freeze(["Anya", "Anna", "AC6", "Otto"]),
  "eaw::Newport": Object.freeze(["NT206L", "NT208L", "NTX210L", "NT116S"]),
  "martin::Torus": Object.freeze(["TORUS T820", "TORUS T1215", "TORUS T1230"]),
  "martin::TH Series": Object.freeze(["THS", "THH", "THV"]),
  "jbl::VTX Touring Systems": Object.freeze([
    "VTX A12",
    "VTX A12W",
    "VTX A8",
    "VTX A6",
    "VTX V25-II",
    "VTX V25-II-CS",
    "VTX V20",
    "VTX F35/95",
    "VTX F35/64",
    "VTX F15",
    "VTX F12",
    "VTX F18S",
    "VTX M22",
    "VTX M20",
    "VTX B35",
    "VTX B35G",
    "VTX B28",
    "VTX B18",
    "VTX B15",
    "VTX B15G",
    "VTX S28",
    "VTX S25",
  ]),
});

export function productRank(manufacturerId, series, productName) {
  const order = PRODUCT_ORDER_BY_SERIES[`${manufacturerId}::${series}`];
  const index = order?.indexOf(productName) ?? -1;
  return index < 0 ? Number.MAX_SAFE_INTEGER : index;
}
export const WAY_ORDER = ["2-way", "3-way", "16-channel", "N/A"];
export const NETWORK_ORDER = ["Active", "Passive", "Hybrid"];
const WAY_LABEL = { "2-way": "2-Way", "3-way": "3-Way", "16-channel": "16-Channel", "N/A": "Full-range / Sub" };

// Controls the order the "Low Unit Config" chip filter appears in. Korean public
// tender specs (나라장터/조달청) commonly gate on whether the low unit is a dual
// configuration, so this is exposed as its own chip filter (see lowUnitConfig below).
export const LOW_UNIT_CONFIG_ORDER = ["Single", "Dual", "Multi"];

function crossoverFields(speaker) {
  // 조사 전 항목은 빈 crossover를 Passive로 오인하지 않도록 필터 파생값을
  // 명시적으로 비운다.
  if (speaker.pending) return { wayCount: null, network: null };
  const crossover = (speaker.crossover || "").toLowerCase();
  let wayCount = "N/A";
  if (crossover.includes("16-channel")) wayCount = "16-channel";
  else if (crossover.includes("3-way")) wayCount = "3-way";
  else if (crossover.includes("2-way")) wayCount = "2-way";

  const hasActive = crossover.includes("active");
  const hasPassive = crossover.includes("passive");
  let network = "Passive";
  if (hasActive && hasPassive) network = "Hybrid";
  else if (hasActive) network = "Active";
  return { wayCount, network };
}

function lowUnitConfigOf(speaker) {
  if (speaker.pending) return null;
  if (speaker.lowQty === 1) return "Single";
  if (speaker.lowQty === 2) return "Dual";
  if (speaker.lowQty > 2) return "Multi";
  return "N/A";
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
  const toMatch = s.match(/^([\d.]+)\s*°?\s*(?:to|[-–—])\s*([\d.]+)\s*°?$/i);
  if (toMatch) {
    const a = parseFloat(toMatch[1]),
      b = parseFloat(toMatch[2]);
    return [Math.min(a, b), Math.max(a, b)];
  }

  // 콤마로 여러 그룹(=여러 프리셋/옵션) 분리, 그룹별로 슬래시 결합 규칙 적용
  const groups = s
    .split(",")
    .map(g => g.trim())
    .filter(Boolean);
  const values = [];
  groups.forEach(g => {
    const signedNums = g.match(/[+-]?\d+(?:\.\d+)?/g) || [];
    const hasSign = /[+-]/.test(g);
    if (g.includes("/") && hasSign && signedNums.length === 2) {
      // 부호 있는 슬래시("+5°/-21°"): 위/아래 비대칭 틸트 -> 절대 스팬(합계)
      const a = parseFloat(signedNums[0]),
        b = parseFloat(signedNums[1]);
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

function angleRangeFields(speaker) {
  const coverage = speaker.cov;
  return {
    hRange: coverage ? parseAngleRange(coverage.h) : null,
    vRange: coverage ? parseAngleRange(coverage.v) : null,
    splayRange: coverage?.splayList?.length ? [Math.min(...coverage.splayList), Math.max(...coverage.splayList)] : null,
  };
}

/**
 * 원본 수집 레코드와 파생 UI 필드를 분리한 동결 catalog를 만든다. 중첩 사양은
 * 읽기 전용으로 공유하고 최상위 객체만 새로 만들어 원본에 필터 상태가 섞이지
 * 않게 한다.
 * @param {Object[]} speakers
 * @returns {readonly Object[]}
 */
export function createSpeakerCatalog(speakers) {
  if (!Array.isArray(speakers)) throw new TypeError("speakers must be an array");
  return Object.freeze(
    speakers.map(speaker =>
      Object.freeze({
        ...speaker,
        ...crossoverFields(speaker),
        lowUnitConfig: lowUnitConfigOf(speaker),
        ...angleRangeFields(speaker),
      }),
    ),
  );
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
    { key: "mk", label: "Manufacturer", order: MK_ORDER, labelFor: v => MFR[v].name },
    { key: "type", label: "Type", order: TYPE_ORDER },
    { key: "lowInch", label: "Low Driver ″", labelFor: v => v + "″" },
    { key: "lowUnitConfig", label: "Low Unit Config", order: LOW_UNIT_CONFIG_ORDER },
    { key: "wayCount", label: "Way", order: WAY_ORDER, labelFor: v => WAY_LABEL[v] || v },
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
  sorters: {
    spl: (a, b) => (b.spl || 0) - (a.spl || 0) || a.name.localeCompare(b.name),
    "inch-desc": (a, b) => (b.lowInch || 0) - (a.lowInch || 0) || a.name.localeCompare(b.name),
    "inch-asc": (a, b) => (a.lowInch || 0) - (b.lowInch || 0) || a.name.localeCompare(b.name),
    name: (a, b) => a.name.localeCompare(b.name),
    // "series" sort is handled via groupBy in the view (matches legacy grouped-by-series behavior)
    series: (a, b) => a.name.localeCompare(b.name),
  },
};
