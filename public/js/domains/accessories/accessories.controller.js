/**
 * @module domains/accessories/controller
 * Accessories 탭 컨트롤러 — mount/unmount/build/reset/render + 모달 연결.
 *
 * 구성 요소:
 *   accessories.data.js   — 데이터 (브랜드별 파일의 배럴)
 *   accessories.schema.js — 필터/정렬 정의
 *   accessories.view.js   — 카드/모달 마크업 (순수 함수)
 *
 * [사용자 요청] 리깅 툴/케이블/케이스 등 부속품 전용 탭. 다른 도메인과
 * 상호 참조 관계가 없는 단순 카탈로그라 software.controller.js 의 DSP
 * 칩 연결(Split View wiring) 부분은 없다.
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
import { registerAccessories, findAmplifiersUsingAccessory, findSpeakersUsingAccessory, findAmplifierById, findSpeakerById, findSpeakersMatchingAmp, findAmpConfigsBySpeaker, resolveAmpIdForModel, findAccessoriesForSpeaker, findRelatedAccessories, findAccessoryById } from "../../relationships/cross-ref.js";

import { ACCESSORIES } from "./accessories.data.js";
import { accessoriesSchema, ACC_MK_ORDER, ACC_MFR } from "./accessories.schema.js";
import { cardHTML as accCardHTML, modalBodyHTML as accModalBodyHTML } from "./accessories.view.js";

// [사용자 요청] 액세서리 모달에서도 "이 부속품을 어떤 랙 앰프가 쓰는지"
// 역방향으로 보여주기 위해 앰프 모달 함수를 재사용 — 순수 뷰 함수와 색상
// 맵만 import(amplifiers.controller.js 미참조, 순환 의존 방지는 speakers/
// amplifiers 가 서로를 참조하는 기존 패턴과 동일). 앰프 레코드 자체는
// cross-ref.findAmplifierById() 로 조회하고 amplifiers.data.js 는 직접
// import 하지 않는다(다른 도메인 데이터 모듈을 직접 참조하지 않는 원칙).
import { AMP_MFR } from "../amplifiers/amplifiers.schema.js";
import { modalBodyHTML as amplifierModalBodyHTML } from "../amplifiers/amplifiers.view.js";

// [사용자 요청] 액세서리 모달에서 "이 부속품을 어떤 스피커가 쓰는지"도
// 역방향으로 보여준다 — 스피커 모달 함수를 순수 뷰 함수로만 import.
import { MFR as SPK_MFR } from "../speakers/speakers.schema.js";
import { modalBodyHTML as speakerModalBodyHTML } from "../speakers/speakers.view.js";

// cross-ref 레지스트리에 액세서리 데이터 등록(모듈 로드 시 1회) — Rack
// 타입 앰프(LA-RAK III 등)가 자신의 System Elements(케이블/리깅)를 id 로
// 참조해 모달에서 클릭 가능한 칩으로 보여줄 때 조회한다.
registerAccessories(ACCESSORIES);

const accState = createState();
accState.sort = "type";

/** 탭 활성화: 최초 1회 UI 빌드 후 렌더 */
function mountAccessories() {
  renderLegend(ACCESSORIES, ACC_MK_ORDER, ACC_MFR);
  const wrap = $("#view-accessories");
  wrap.hidden = false;
  if (!wrap.dataset.built) {
    wrap.dataset.built = "1";
    buildAccessoriesUI(wrap);
  }
  renderAccessories();
}

/** 탭 비활성화: 뷰 숨김 */
function unmountAccessories() { $("#view-accessories").hidden = true; }

/**
 * 컨트롤 바 + 결과 영역 골격을 1회 빌드하고 이벤트를 연결한다.
 * @param {HTMLElement} wrap #view-accessories 컨테이너
 */
function buildAccessoriesUI(wrap) {
  wrap.innerHTML = controlsBarHTML("acc", "액세서리 검색  ·  e.g.  Rigging / Cable / Case", [
    { value: "type", label: "정렬 · 유형별" },
    { value: "name", label: "정렬 · 이름순" },
  ]) + `
    <div class="content-wrap">
      <div id="acc-results"></div>
    </div>`;

  buildFilters($("#acc-filters"), ACCESSORIES, accState, accessoriesSchema, renderAccessories);
  wireFilterToggle($("#acc-filter-toggle"), $("#acc-filters"));

  // [성능] 타이핑마다 그리드 전체를 재생성하지 않도록 렌더만 디바운스.
  const debouncedRender = debounce(renderAccessories);
  $("#acc-q").addEventListener("input", e => { accState.q = e.target.value.trim(); debouncedRender(); });
  $("#acc-sort").addEventListener("change", e => { accState.sort = e.target.value; renderAccessories(); });
  $("#acc-reset").onclick = resetAccessories;
}

/** 검색어/칩/정렬 초기화 후 재렌더링 */
function resetAccessories() {
  resetState(accState, accessoriesSchema);
  accState.sort = "type";
  $("#acc-q").value = "";
  $("#acc-sort").value = "type";
  document.querySelectorAll("#acc-filters .chip").forEach(c => c.setAttribute("aria-pressed", "false"));
  buildFilters($("#acc-filters"), ACCESSORIES, accState, accessoriesSchema, renderAccessories);
  renderAccessories();
}

/** 현재 상태로 결과 그리드 렌더링 (유형별 정렬 시 제조사>Type 그룹핑 —
 * amplifiers.controller.js renderAmplifiers 와 동일 패턴) */
function renderAccessories() {
  renderGrid({
    resultsEl: $("#acc-results"),
    countEl: $("#count"),
    filterPanelEl: $("#acc-filters"),
    data: ACCESSORIES,
    state: accState,
    schema: accessoriesSchema,
    cardHTML: accCardHTML,
    onOpen: openAccessoryModal,
    groupBy: accState.sort === "type" ? {
      order: ACC_MK_ORDER,
      getKey: d => d.mfr,
      subGroupKey: d => d.type || "Other",
      subGroupOrder: (sgA, sgB) => sgA.localeCompare(sgB),
      sortWithinGroup: (a, b) => a.name.localeCompare(b.name),
      headHTML: (mfr, type, group) => {
        return `<span class="card-group__badge card-group__badge--name" style="border-color:${ACC_MFR[mfr].color}55;color:${ACC_MFR[mfr].color}">${esc(ACC_MFR[mfr].name)}</span><span class="card-group__title">${esc(type)}</span><span class="card-group__count">${group.length} ea</span>`;
      }
    } : null,
  });
  refreshNavCounts();
}

/**
 * 액세서리 상세 모달을 연다 (+ URL 해시에 카드 id 기록 — #accessories/<id>).
 * @param {string} id 액세서리 id
 * @returns {boolean} id 가 유효해 모달을 열었으면 true (라우터 딥링크 판정용)
 */
function openAccessoryModal(id) {
  const a = ACCESSORIES.find(x => x.id === id);
  if (!a) return false;
  const { color, head, body } = accModalBodyHTML(a, findAmplifiersUsingAccessory(a.id), findSpeakersUsingAccessory(a.id), findRelatedAccessories(a.id));
  openModalWith(color, head, body);
  wireAccessoryModalAmpClicks();
  wireAccessoryModalSpeakerClicks();
  wireAccessoryModalRelatedClicks();
  setItemRoute(id);
  return true;
}

/**
 * 액세서리 모달 안의 "Related Accessories" 칩(짝을 이루는 다른 액세서리,
 * 예: K-BUMPFLIGHT ↔ K1-BUMP) 클릭 → Split View pane 2 에 그 액세서리 상세.
 * wireAccessoryModalAmpClicks/wireAccessoryModalSpeakerClicks 와 동일한
 * 패턴(같은 액세서리를 다시 클릭하면 paneId 일치로 pane 2 가 닫힌다).
 * pane 2 에서는 Used In/Related 정보 없이 기본 상세만 보여준다(스피커→
 * 액세서리 방향 wireSpeakerModalAccessoryClicks 와 동일한 절제).
 */
function wireAccessoryModalRelatedClicks() {
  document.querySelectorAll("#modal [data-accessory-id]").forEach(chip => {
    chip.addEventListener("click", () => {
      const aid = chip.dataset.accessoryId;
      const acc = findAccessoryById(aid);
      if (!acc) return;
      const M = ACC_MFR[acc.mfr];
      const { head, body } = accModalBodyHTML(acc);
      openSplitPane({
        headHTML: head,
        paneColor: M.color,
        bodyHTML: body,
        paneId: aid,
      });
    });
  });
}

/**
 * 액세서리 모달 안의 "Used In" 스피커 칩 클릭 → Split View pane 2 에 스피커
 * 상세. speakers.controller.js wireSpeakerModalAccessoryClicks(스피커→
 * 액세서리 방향)의 미러. 같은 스피커를 다시 클릭하면(paneId 일치) pane 2 가
 * 닫힌다.
 */
function wireAccessoryModalSpeakerClicks() {
  document.querySelectorAll("#modal [data-speaker-id]").forEach(chip => {
    chip.addEventListener("click", () => {
      const sid = chip.dataset.speakerId;
      const s = findSpeakerById(sid);
      if (!s) return;
      const M = SPK_MFR[s.mk];
      const { head, body } = speakerModalBodyHTML(s, resolveAmpIdForModel, findAccessoriesForSpeaker(s.id));
      openSplitPane({
        headHTML: head,
        paneColor: M.color,
        bodyHTML: body,
        paneId: sid,
      });
    });
  });
}

/**
 * 액세서리 모달 안의 "Used In" 앰프 칩 클릭 → Split View pane 2 에 앰프
 * 상세. amplifiers.controller.js wireAmpModalAccessoryClicks(앰프→액세서리
 * 방향)의 미러. 같은 앰프를 다시 클릭하면(paneId 일치) pane 2 가 닫힌다.
 */
function wireAccessoryModalAmpClicks() {
  document.querySelectorAll("#modal [data-amp-id]").forEach(chip => {
    chip.addEventListener("click", () => {
      const ampId = chip.dataset.ampId;
      const amp = findAmplifierById(ampId);
      if (!amp) return;
      const M = AMP_MFR[amp.mfr];
      const { head, body } = amplifierModalBodyHTML(amp, (sid) => { const s = findSpeakerById(sid); return s ? s.name : sid; }, findSpeakersMatchingAmp(amp.id), findAmpConfigsBySpeaker(amp.id), relatedAccessoriesOfAmp(amp));
      openSplitPane({
        headHTML: head,
        paneColor: M.color,
        bodyHTML: body,
        paneId: ampId,
      });
    });
  });
}

/**
 * Rack 타입 앰프의 relatedAccessoryIds 를 amplifierModalBodyHTML 이 기대하는
 * {id, name, type} 배열로 조회 — amplifiers.controller.js relatedAccessoriesOf
 * 와 동일 로직(중복 정의를 피하고 싶지만 순환 의존 방지를 위해 액세서리
 * 도메인에서 자체 조회; ACCESSORIES 는 이미 이 파일에서 import 되어 있음).
 * @param {Object} amp 앰프 레코드
 * @returns {{id:string, name:string, type:string}[]}
 */
function relatedAccessoriesOfAmp(amp) {
  const ids = (amp.rack && amp.rack.relatedAccessoryIds) || [];
  return ids.map(id => ACCESSORIES.find(x => x.id === id)).filter(Boolean).map(acc => ({ id: acc.id, name: acc.name, type: acc.type }));
}

/** Accessories 도메인을 라우터에 등록 — main.js 가 호출하는 유일한 공개 API */
export function initAccessoriesDomain() {
  registerDomain("accessories", { label: "Accessories", mount: mountAccessories, unmount: unmountAccessories, count: () => ACCESSORIES.length, openItem: openAccessoryModal });
}
