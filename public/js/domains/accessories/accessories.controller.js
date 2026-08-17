/**
 * @module domains/accessories/controller
 * Accessories 탭 컨트롤러 — mount/unmount/build/reset/render + 모달 연결.
 *
 * 구성 요소:
 *   accessories.data.js   — 데이터 (브랜드별 파일의 배럴)
 *   accessories.detail.js — 관계 조회와 공통 상세 provider
 *   accessories.schema.js — 필터/정렬 정의
 *   accessories.view.js   — 카드/모달 마크업 (순수 함수)
 *
 * 리깅 툴/케이블/케이스 등 부속품 전용 탭. Used In과 Related 관계 이동은
 * 모든 도메인과 같은 detail registry/event delegation 경로를 사용한다.
 */
import { esc } from "../../core/dom.js";
import { createDomainTab } from "../../ui/domain-tab.js";
import { openDetailModal } from "../../ui/relation-navigation.js";

import { ACCESSORIES } from "./accessories.data.js";
import { initAccessoryDetailProvider } from "./accessories.detail.js";
import { accessoriesSchema, ACC_MK_ORDER, ACC_MFR } from "./accessories.schema.js";
import { cardHTML as accCardHTML } from "./accessories.view.js";

/** 유형별 정렬일 때만 제조사>Type 2단 그룹핑, 그 외에는 평면 그리드 */
function accessoriesGroupBy(state) {
  return state.sort === "type" ? {
      order: ACC_MK_ORDER,
      getKey: d => d.mfr,
      subGroupKey: d => d.type || "Other",
      subGroupOrder: (sgA, sgB) => sgA.localeCompare(sgB),
      sortWithinGroup: (a, b) => a.name.localeCompare(b.name),
      headHTML: (mfr, type, group) => {
        return `<span class="card-group__badge card-group__badge--name" style="border-color:${ACC_MFR[mfr].color}55;color:${ACC_MFR[mfr].color}">${esc(ACC_MFR[mfr].name)}</span><span class="card-group__title">${esc(type)}</span><span class="card-group__count">${group.length} ea</span>`;
      }
    } : null;
}

/**
 * 액세서리 상세 모달을 연다 (+ URL 해시에 카드 id 기록 — #accessories/<id>).
 * @param {string} id 액세서리 id
 * @returns {boolean} id 가 유효해 모달을 열었으면 true (라우터 딥링크 판정용)
 */
function openAccessoryModal(id) {
  return openDetailModal(id, "accessory");
}

/** Accessories 도메인을 라우터에 등록 — main.js 가 호출하는 유일한 공개 API */
export function initAccessoriesDomain() {
  initAccessoryDetailProvider();
  createDomainTab({
    key: "accessories",
    label: "Accessories",
    idPrefix: "acc",
    searchPlaceholder: "액세서리 검색  ·  e.g.  Rigging / Cable / Case",
    sortOptions: [
      { value: "type", label: "정렬 · 유형별" },
      { value: "name", label: "정렬 · 이름순" },
    ],
    data: ACCESSORIES,
    schema: accessoriesSchema,
    cardHTML: accCardHTML,
    openItem: openAccessoryModal,
    groupBy: accessoriesGroupBy,
    legend: { order: ACC_MK_ORDER, mfrMap: ACC_MFR },
  });
}
