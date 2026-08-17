/**
 * @module domains/dsps/controller
 * DSPs 탭 컨트롤러 — mount/unmount/build/reset/render + 모달·Split View 연결.
 *
 * 구성 요소:
 *   dsps.data.js   — 데이터 (브랜드별 파일의 배럴)
 *   dsps.detail.js — 공통 상세 provider
 *   dsps.schema.js — 필터/정렬 정의
 *   dsps.view.js   — 카드/모달 마크업 (순수 함수)
 */
import { esc } from "../../core/dom.js";
import { createDomainTab } from "../../ui/domain-tab.js";
import { openDetailModal } from "../../ui/relation-navigation.js";

import { DSPS } from "./dsps.data.js";
import { initDspDetailProvider } from "./dsps.detail.js";
import { dspsSchema, DSP_MFR, DSP_MK_ORDER } from "./dsps.schema.js";
import { cardHTML as dspCardHTML } from "./dsps.view.js";

// category 필드가 없는 DSP(현재 데이터에는 없지만 향후 대비)는 "DSP"로 묶는다.
const dspCategoryOf = d => d.category || "DSP";

/** 제조사별 정렬일 때만 제조사>카테고리 2단 그룹핑, 그 외에는 평면 그리드 */
function dspsGroupBy(state) {
  return state.sort === "category" ? {
      order: DSP_MK_ORDER,
      getKey: d => d.mfr,
      subGroupKey: d => dspCategoryOf(d),
      subGroupOrder: (sgA, sgB) => sgA.localeCompare(sgB),
      sortWithinGroup: (a, b) => a.model.localeCompare(b.model),
      headHTML: (mfr, category, group) => {
        return `<span class="card-group__badge card-group__badge--name" style="border-color:${DSP_MFR[mfr].color}55;color:${DSP_MFR[mfr].color}">${esc(DSP_MFR[mfr].name)}</span><span class="card-group__title">${esc(category)}</span><span class="card-group__count">${group.length} ea</span>`;
      }
    } : null;
}

/**
 * DSP 상세 모달을 연다 (+ URL 해시에 카드 id 기록 — #dsps/<id>).
 * @param {string} id DSP id
 * @returns {boolean} id 가 유효해 모달을 열었으면 true (라우터 딥링크 판정용)
 */
function openDspModal(id) {
  return openDetailModal(id, "dsp");
}

/** DSPs 도메인을 라우터에 등록 — main.js 가 호출하는 유일한 공개 API */
export function initDspsDomain() {
  initDspDetailProvider();
  createDomainTab({
    key: "dsps",
    label: "DSP",
    idPrefix: "dsp",
    searchPlaceholder: "프로세서 검색  ·  e.g.  P1 / DS100 / Galileo",
    sortOptions: [
      { value: "category", label: "정렬 · 제조사별" },
      { value: "model", label: "정렬 · 이름순" },
      { value: "io", label: "정렬 · I/O 많은순" },
      { value: "software", label: "정렬 · 연동 소프트웨어 많은순" },
    ],
    data: DSPS,
    schema: dspsSchema,
    cardHTML: dspCardHTML,
    openItem: openDspModal,
    groupBy: dspsGroupBy,
    legend: { order: DSP_MK_ORDER, mfrMap: DSP_MFR },
  });
}
