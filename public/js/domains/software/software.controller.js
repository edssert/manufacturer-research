/**
 * @module domains/software/controller
 * Software 탭 컨트롤러 — mount/unmount/build/reset/render + 모달·Split View 연결.
 *
 * 구성 요소:
 *   software.data.js   — 데이터 (브랜드별 파일의 배럴)
 *   software.schema.js — 필터/정렬 정의
 *   software.view.js   — 카드/모달 마크업 (순수 함수)
 */
import { esc } from "../../core/dom.js";
import { createDomainTab } from "../../ui/domain-tab.js";
import { openModalWith } from "../../ui/modal.js";
import { wireChipPanes } from "../../ui/split-view.js";
import { setItemRoute } from "../../core/router.js";

import { SOFTWARE } from "./software.data.js";
import { softwareSchema, SW_MFR, SW_MK_ORDER, SW_TYPE_ORDER, primaryType } from "./software.schema.js";
import { cardHTML as swCardHTML, modalBodyHTML as swModalBodyHTML } from "./software.view.js";

// 소프트웨어 모달 안의 DSP 칩 클릭 → Split View pane 2 에 DSP 상세.
// DSP 의 "순수 뷰 함수"와 색상 맵만 import (controller 미참조).
import { DSPS } from "../dsps/dsps.data.js";
import { DSP_MFR } from "../dsps/dsps.schema.js";
import { modalBodyHTML as dspModalBodyHTML } from "../dsps/dsps.view.js";

// type 이 없는 소프트웨어(현재 데이터에는 없지만 향후 대비) 대비 폴백.
const swTypeOf = s => primaryType(s) || "Software";

/** 섹션에 포함된 제조사를 헤더에 색 마커로 표시 (상단바 범례와 같은 모양) */
const mfrMarkers = group => SW_MK_ORDER
  .filter(mk => group.some(g => g.mfr === mk))
  .map(mk => `<span class="card-group__mfr-dot" style="background:${SW_MFR[mk].color}" title="${esc(SW_MFR[mk].name)}"></span>`)
  .join("");

/**
 * 보기 방식에 따른 그룹핑 설정.
 *
 *   type — 분류(Design/Control/Spatial/Signal) 하나만 축으로. 섹션이 4개로
 *          크게 묶여 읽기 쉽고, type 이 배열이라 기능이 겹치는 제품은 해당
 *          섹션 모두에 노출된다(CueStation = 제어 + 공간음향).
 *   mfr  — 제조사 > 분류 2단 그룹핑(탭 기본값). 브랜드별로 무엇을 갖췄는지
 *          비교할 때. 분류 순서는 type 보기와 같게 맞춰 두 보기를 오갈 때
 *          섹션 순서가 흔들리지 않게 한다.
 *   그 외(name) — 평면 그리드.
 *
 * @param {Object} state 이 탭의 상태 (ui/domain-tab.js 가 넘긴다)
 * @returns {Object|null} renderGrid 의 groupBy 설정
 */
function swGroupBy(state) {
  if (state.sort === "type") {
    return {
      order: SW_TYPE_ORDER,
      getKey: d => (Array.isArray(d.type) ? d.type : [swTypeOf(d)]),
      sortWithinGroup: (a, b) =>
        SW_MK_ORDER.indexOf(a.mfr) - SW_MK_ORDER.indexOf(b.mfr) || a.name.localeCompare(b.name),
      headHTML: (type, _sg, group) =>
        `<span class="card-group__title">${esc(type)}</span><span class="card-group__mfr-dots">${mfrMarkers(group)}</span><span class="card-group__count">${group.length} ea</span>`,
    };
  }
  if (state.sort === "mfr") {
    return {
      order: SW_MK_ORDER,
      getKey: d => d.mfr,
      subGroupKey: d => swTypeOf(d),
      subGroupOrder: (a, b) => SW_TYPE_ORDER.indexOf(a) - SW_TYPE_ORDER.indexOf(b),
      sortWithinGroup: (a, b) => a.name.localeCompare(b.name),
      headHTML: (mfr, type, group) =>
        `<span class="card-group__badge card-group__badge--name" style="border-color:${SW_MFR[mfr].color}55;color:${SW_MFR[mfr].color}">${esc(SW_MFR[mfr].name)}</span><span class="card-group__title">${esc(type)}</span><span class="card-group__count">${group.length} ea</span>`,
    };
  }
  return null;
}

/**
 * 소프트웨어 상세 모달을 연다 (+ URL 해시에 카드 id 기록 — #software/<id>).
 * @param {string} id 소프트웨어 id
 * @returns {boolean} id 가 유효해 모달을 열었으면 true (라우터 딥링크 판정용)
 */
function openSoftwareModal(id) {
  const s = SOFTWARE.find(x => x.id === id);
  if (!s) return false;
  const { color, head, body } = swModalBodyHTML(s, (did) => { const d = DSPS.find(x => x.id === did); return d ? d.model : did; });
  openModalWith(color, head, body);
  // DSP 칩 → Split View pane 2 에 DSP 상세.
  wireChipPanes("dsp-id", did => {
    const d = DSPS.find(x => x.id === did);
    if (!d) return null;
    const { head, body } = dspModalBodyHTML(d, (sid) => { const s = SOFTWARE.find(x => x.id === sid); return s ? s.name : sid; });
    return { headHTML: head, paneColor: DSP_MFR[d.mfr].color, bodyHTML: body };
  });
  setItemRoute(id);
  return true;
}

/** Software 도메인을 라우터에 등록 — main.js 가 호출하는 유일한 공개 API */
export function initSoftwareDomain() {
  createDomainTab({
    key: "software",
    label: "Software",
    idPrefix: "sw",
    searchPlaceholder: "소프트웨어 검색  ·  e.g.  Soundvision / R1 / Compass",
    sortOptions: [
      { value: "mfr", label: "보기 · 제조사별" },
      { value: "type", label: "보기 · 분류별" },
      { value: "name", label: "정렬 · 이름순" },
    ],
    data: SOFTWARE,
    schema: softwareSchema,
    cardHTML: swCardHTML,
    openItem: openSoftwareModal,
    groupBy: swGroupBy,
    legend: { order: SW_MK_ORDER, mfrMap: SW_MFR },
  });
}
