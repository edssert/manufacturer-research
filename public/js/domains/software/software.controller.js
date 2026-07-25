/**
 * @module domains/software/controller
 * Software 탭 컨트롤러 — mount/unmount/build/reset/render + 모달·Split View 연결.
 *
 * 구성 요소:
 *   software.data.js   — 데이터 (브랜드별 파일의 배럴)
 *   software.schema.js — 필터/정렬 정의
 *   software.view.js   — 카드/모달 마크업 (순수 함수)
 */
import { createState, resetState } from "../../core/state.js";
import { $, esc, debounce } from "../../core/dom.js";
import { buildFilters, wireFilterToggle, controlsBarHTML } from "../../ui/filters.js";
import { renderGrid } from "../../ui/card-grid.js";
import { openModalWith } from "../../ui/modal.js";
import { openSplitPane } from "../../ui/split-view.js";
import { registerDomain, setItemRoute } from "../../core/router.js";
import { refreshNavCounts } from "../../ui/nav.js";
import { renderLegend } from "../../ui/legend.js";

import { SOFTWARE } from "./software.data.js";
import { softwareSchema, SW_MFR, SW_MK_ORDER, SW_TYPE_ORDER, primaryType } from "./software.schema.js";
import { cardHTML as swCardHTML, modalBodyHTML as swModalBodyHTML } from "./software.view.js";

// 소프트웨어 모달 안의 DSP 칩 클릭 → Split View pane 2 에 DSP 상세.
// DSP 의 "순수 뷰 함수"와 색상 맵만 import (controller 미참조).
import { DSPS } from "../dsps/dsps.data.js";
import { DSP_MFR } from "../dsps/dsps.schema.js";
import { modalBodyHTML as dspModalBodyHTML } from "../dsps/dsps.view.js";

const swState = createState();
swState.sort = "mfr";

/** 탭 활성화: 최초 1회 UI 빌드 후 렌더 */
function mountSoftware() {
  renderLegend(SOFTWARE, SW_MK_ORDER, SW_MFR);
  const wrap = $("#view-software");
  wrap.hidden = false;
  if (!wrap.dataset.built) {
    wrap.dataset.built = "1";
    buildSoftwareUI(wrap);
  }
  renderSoftware();
}

/** 탭 비활성화: 뷰 숨김 */
function unmountSoftware() { $("#view-software").hidden = true; }

/**
 * 컨트롤 바 + 결과 영역 골격을 1회 빌드하고 이벤트를 연결한다.
 * @param {HTMLElement} wrap #view-software 컨테이너
 */
function buildSoftwareUI(wrap) {
  wrap.innerHTML = controlsBarHTML("sw", "소프트웨어 검색  ·  e.g.  Soundvision / R1 / Compass", [
    // 첫 항목이 select 의 기본 선택값 — swState.sort 초기값과 일치시킬 것.
    { value: "mfr", label: "보기 · 제조사별" },
    { value: "type", label: "보기 · 분류별" },
    { value: "name", label: "정렬 · 이름순" },
  ]) + `
    <div class="content-wrap">
      <div id="sw-results"></div>
    </div>`;

  buildFilters($("#sw-filters"), SOFTWARE, swState, softwareSchema, renderSoftware);
  wireFilterToggle($("#sw-filter-toggle"), $("#sw-filters"));

  // [성능] 타이핑마다 그리드 전체를 재생성하지 않도록 렌더만 디바운스.
  const debouncedRender = debounce(renderSoftware);
  $("#sw-q").addEventListener("input", e => { swState.q = e.target.value.trim(); debouncedRender(); });
  $("#sw-sort").addEventListener("change", e => { swState.sort = e.target.value; renderSoftware(); });
  $("#sw-reset").onclick = resetSoftware;
}

/** 검색어/칩/정렬 초기화 후 재렌더링 */
function resetSoftware() {
  resetState(swState, softwareSchema);
  $("#sw-q").value = "";
  $("#sw-sort").value = "mfr";
  document.querySelectorAll("#sw-filters .chip").forEach(c => c.setAttribute("aria-pressed", "false"));
  buildFilters($("#sw-filters"), SOFTWARE, swState, softwareSchema, renderSoftware);
  renderSoftware();
}

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
 * @returns {Object|null} renderGrid 의 groupBy 설정
 */
function swGroupBy() {
  if (swState.sort === "type") {
    return {
      order: SW_TYPE_ORDER,
      getKey: d => (Array.isArray(d.type) ? d.type : [swTypeOf(d)]),
      sortWithinGroup: (a, b) =>
        SW_MK_ORDER.indexOf(a.mfr) - SW_MK_ORDER.indexOf(b.mfr) || a.name.localeCompare(b.name),
      headHTML: (type, _sg, group) =>
        `<span class="card-group__title">${esc(type)}</span><span class="card-group__mfr-dots">${mfrMarkers(group)}</span><span class="card-group__count">${group.length} ea</span>`,
    };
  }
  if (swState.sort === "mfr") {
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

/** 현재 상태로 결과 그리드 렌더링 (그룹핑 방식은 swGroupBy 참고) */
function renderSoftware() {
  renderGrid({
    resultsEl: $("#sw-results"),
    countEl: $("#count"),
    filterPanelEl: $("#sw-filters"),
    data: SOFTWARE,
    state: swState,
    schema: softwareSchema,
    cardHTML: swCardHTML,
    onOpen: openSoftwareModal,
    groupBy: swGroupBy(),
  });
  refreshNavCounts();
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
  wireSoftwareModalDspClicks();
  setItemRoute(id);
  return true;
}

/** 소프트웨어 모달 안의 DSP 칩 클릭 → Split View pane 2 에 DSP 상세 */
function wireSoftwareModalDspClicks() {
  document.querySelectorAll("#modal [data-dsp-id]").forEach(chip => {
    chip.addEventListener("click", () => {
      const did = chip.dataset.dspId;
      const d = DSPS.find(x => x.id === did);
      if (!d) return;
      const M = DSP_MFR[d.mfr];
      const { head, body } = dspModalBodyHTML(d, (sid) => { const s = SOFTWARE.find(x => x.id === sid); return s ? s.name : sid; });
      openSplitPane({ headHTML: head, paneColor: M.color, bodyHTML: body });
    });
  });
}

/** Software 도메인을 라우터에 등록 — main.js 가 호출하는 유일한 공개 API */
export function initSoftwareDomain() {
  registerDomain("software", { label: "Software", mount: mountSoftware, unmount: unmountSoftware, count: () => SOFTWARE.length, openItem: openSoftwareModal });
}
