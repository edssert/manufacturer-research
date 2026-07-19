/**
 * @module domains/accessories/schema
 * 범용 필터/그리드 엔진(core/filter-engine.js)이 이 도메인 레코드를 어떻게
 * 다룰지 선언하는 스키마. 검색 필드·칩 필터·범위 필터·정렬 규칙과
 * 제조사 표시 정보(MFR 맵: 이름/색상/축약형)가 모두 여기에 모여 있다.
 * UI 나 데이터 파일이 아닌 "규칙"을 바꿀 때 수정하는 파일.
 *
 * [사용자 요청] 리깅 툴/케이블/케이스 등 부속품을 정리하는 신규 탭.
 * 다른 도메인(DSP/Software)처럼 상호 연동 관계는 없는 단순 카탈로그라
 * relations 필드가 없다. Type 은 정해진 목록이 아니라 자유 텍스트로 두고
 * (사용자 확인) 데이터가 쌓이면 값에 따라 필터 칩이 자동 생성된다.
 */
import { normalizeSearchText } from "../../core/filter-engine.js";
export const ACC_MFR = {
  la: { name: "L-Acoustics", color: "var(--la)", short: "L-ACOUSTICS" },
  db: { name: "d&b audiotechnik", color: "var(--db)", short: "d&b" },
  my: { name: "Meyer Sound", color: "var(--my)", short: "MEYER" },
};
export const ACC_MK_ORDER = ["la", "db", "my"];

export const accessoriesSchema = {
  unitLabel: "accessory",
  emptyTitle: "일치하는 액세서리가 없습니다",
  emptyHint: "검색어나 필터 조건을 넓혀 보세요.",
  searchFields: ["name"],
  // q 는 filter-engine 이 이미 normalizeSearchText 로 정규화해 넘긴다.
  customSearchMatch: (item, q) => normalizeSearchText(ACC_MFR[item.mfr].name).includes(q),
  chipFields: [
    { key: "mfr", label: "Manufacturer", order: ACC_MK_ORDER, labelFor: (v) => ACC_MFR[v].name },
    { key: "type", label: "Type", labelFor: (v) => v },
  ],
  rangeFields: [],
  defaultSort: "name",
  sorters: {
    name: (a, b) => a.name.localeCompare(b.name),
    type: (a, b) => (a.type || "").localeCompare(b.type || "") || a.name.localeCompare(b.name),
  },
};
