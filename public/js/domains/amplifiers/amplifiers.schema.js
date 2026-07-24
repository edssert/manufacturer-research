/**
 * @module domains/amplifiers/schema
 * 범용 필터/그리드 엔진(core/filter-engine.js)이 이 도메인 레코드를 어떻게
 * 다룰지 선언하는 스키마. 검색 필드·칩 필터·범위 필터·정렬 규칙과
 * 제조사 표시 정보(MFR 맵: 이름/색상/축약형)가 모두 여기에 모여 있다.
 * UI 나 데이터 파일이 아닌 "규칙"을 바꿀 때 수정하는 파일.
 */
import { normalizeSearchText } from "../../core/filter-engine.js";

export const AMP_MFR = {
  la: { name: "L-Acoustics", color: "var(--la)", short: "L-ACOUSTICS" },
  db: { name: "d&b audiotechnik", color: "var(--db)", short: "d&b" },
  my: { name: "Meyer Sound", color: "var(--my)", short: "MEYER" },
};
export const AMP_MK_ORDER = ["la", "db", "my"];

// [사용자 요청] 기본("model") 정렬은 알파벳순 대신 L-Acoustics 라인업 표시
// 순서를 명시 고정한다: LA7.16 → LA1.16i → LA12X → LA4X → LA2Xi → LA-RAK III
// → LA-RAK II AVB (랙은 개별 앰프를 담은 시스템이라 라인업 맨 뒤). 목록에
// 없는 모델(다른 제조사 등)은 이 뒤에 알파벳순으로 이어진다.
export const MODEL_ORDER = ["LA7.16", "LA1.16i", "LA12X", "LA4X", "LA2Xi", "LA-RAK III", "LA-RAK II AVB"];
// [사용자 요청] d&b 앰프도 알파벳순 대신 플래그십/출력 내림차순으로 고정한다.
// 섹션(투어링/설치, controller.ampTypeOf 참조)이 먼저 갈리므로 여기서는 각
// 섹션 안에서의 순서만 담당한다: 투어링 D90→D80→D40→D25, 설치 40D→25D→30D
// →10D→5DM→5D (모두 4Ω 총출력 기준. 설치의 25D>30D 는 실제 출력·전압·네트워크
// 우위 반영 — 모델 번호와 무관).
export const DB_MODEL_ORDER = ["D90", "D80", "D40", "D25", "40D", "25D", "30D", "10D", "5DM", "5D"];
// 위 순서 배열 기반 comparator — "model" sorter 와 기본("type") 그룹 정렬
// (amplifiers.controller.js 의 groupBy.sortWithinGroup) 양쪽에서 재사용해,
// 정렬 모드를 바꿔도 L-Acoustics/d&b 모델 순서가 항상 일관되게 유지되도록 한다.
// 두 목록 모두에 없는 모델(예: Meyer)은 이 뒤에 알파벳순으로 이어진다.
export function compareModel(a, b) {
  // LA 라인업 순서를 우선 적용하고, 없으면 d&b 순서, 둘 다 없으면 알파벳순.
  const rank = (m) => {
    const il = MODEL_ORDER.indexOf(m);
    if (il !== -1) return il;
    const id = DB_MODEL_ORDER.indexOf(m);
    if (id !== -1) return MODEL_ORDER.length + id;
    return -1;
  };
  const ia = rank(a.model), ib = rank(b.model);
  if (ia !== -1 || ib !== -1) {
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  }
  return a.model.localeCompare(b.model);
}

export const amplifiersSchema = {
  unitLabel: "amplifiers",
  emptyTitle: "일치하는 앰프가 없습니다",
  emptyHint: "검색어나 필터 조건을 넓혀 보세요.",
  searchFields: ["model"],
  // q 는 filter-engine 이 이미 normalizeSearchText 로 정규화해 넘긴다.
  customSearchMatch: (item, q) => normalizeSearchText(AMP_MFR[item.mfr].name).includes(q),
  chipFields: [
    { key: "mfr", label: "Manufacturer", order: AMP_MK_ORDER, labelFor: (v) => AMP_MFR[v].name },
    { key: "channels", label: "Channels", labelFor: (v) => v + "ch" },
    // usage: "Installation only" / "Touring" 등 — LA1.16i 부터 도입된 필드(v1.1).
    // 값이 없는 앰프(기존 d&b 등 단순 스키마)는 filter-engine 이 null 값을
    // 옵션에서 자동으로 제외하므로 이 칩 자체가 나타나지 않는다.
    { key: "usage", label: "Usage" },
    // [사용자 요청] LA-RAK III(투어링 랙) 추가로 "Amplified Controller"(개별
    // 앰프)와 "Rack"(랙 시스템)을 구분해 걸러볼 수 있는 Type 칩을 노출.
    { key: "type", label: "Type" },
  ],
  rangeFields: [],
  defaultSort: "model",
  sorters: {
    model: compareModel,
    channels: (a, b) => (b.channels || 0) - (a.channels || 0) || compareModel(a, b),
    speakerCount: (a, b) => (b.relations.speakerIds.length - a.relations.speakerIds.length) || compareModel(a, b),
  },
};
