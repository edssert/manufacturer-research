/**
 * @module domains/software/schema
 * 범용 필터/그리드 엔진(core/filter-engine.js)이 이 도메인 레코드를 어떻게
 * 다룰지 선언하는 스키마. 검색 필드·칩 필터·범위 필터·정렬 규칙과
 * 제조사 표시 정보(MFR 맵: 이름/색상/축약형)가 모두 여기에 모여 있다.
 * UI 나 데이터 파일이 아닌 "규칙"을 바꿀 때 수정하는 파일.
 */
import { normalizeSearchText } from "../../core/filter-engine.js";
import { MANUFACTURERS, MANUFACTURER_ORDER } from "../../core/manufacturers.js";

export const SW_MFR = MANUFACTURERS;
export const SW_MK_ORDER = MANUFACTURER_ORDER;

/**
 * 분류(섹션) 표시 순서 — 워크플로 순서(설계 → 제어 → 공간음향 → 처리기술).
 * 분류 근거는 볼트 노트 "음향 소프트웨어 기능 분류" 참고.
 */
export const SW_TYPE_ORDER = [
  "Design & Simulation",
  "Control & Monitoring",
  "Spatial Audio",
  "Signal Processing",
];

/**
 * 소프트웨어의 대표 분류(배열의 첫 값). 카드 배지·정렬처럼 하나만 써야 하는
 * 곳에서 쓴다. 데이터가 스칼라여도 안전하게 동작한다.
 * @param {Object} s 소프트웨어 레코드
 * @returns {string}
 */
export function primaryType(s) {
  return Array.isArray(s.type) ? (s.type[0] ?? "") : (s.type ?? "");
}

export const softwareSchema = {
  unitLabel: "software",
  emptyTitle: "일치하는 소프트웨어가 없습니다",
  emptyHint: "검색어나 필터 조건을 넓혀 보세요.",
  searchFields: ["name"],
  // q 는 filter-engine 이 이미 normalizeSearchText 로 정규화해 넘긴다.
  customSearchMatch: (item, q) => normalizeSearchText(SW_MFR[item.mfr].name).includes(q),
  chipFields: [
    { key: "mfr", label: "Manufacturer", order: SW_MK_ORDER, labelFor: (v) => SW_MFR[v].name },
    // type 은 배열 — 기능이 겹치는 제품은 두 개 이상의 분류에 동시에 속한다.
    // filter-engine/ui/filters 가 배열을 "하나라도 겹치면 통과"로 처리한다.
    { key: "type", label: "Type", labelFor: (v) => v },
    { key: "platform", label: "Platform", labelFor: (v) => v },
  ],
  rangeFields: [],
  sorters: {
    name: (a, b) => a.name.localeCompare(b.name),
    // 분류별 보기 — 섹션 순서는 groupBy.order 가 잡고, 여기선 섹션 내부 순서만.
    type: (a, b) =>
      SW_TYPE_ORDER.indexOf(primaryType(a)) - SW_TYPE_ORDER.indexOf(primaryType(b)) ||
      a.name.localeCompare(b.name),
    // 제조사별 보기
    mfr: (a, b) =>
      SW_MK_ORDER.indexOf(a.mfr) - SW_MK_ORDER.indexOf(b.mfr) ||
      SW_TYPE_ORDER.indexOf(primaryType(a)) - SW_TYPE_ORDER.indexOf(primaryType(b)) ||
      a.name.localeCompare(b.name),
  },
};
