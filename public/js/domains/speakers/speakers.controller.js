/**
 * @module domains/speakers/controller
 * Speakers 탭 컨트롤러 — mount/unmount/build/reset/render + 모달·Split View 연결.
 * 라우터에 스스로 등록하므로, 이 탭의 내부 동작을 밖에서 알 필요가 없다.
 *
 * 구성 요소:
 *   speakers.data.js   — 데이터 (시리즈별 파일의 배럴)
 *   speakers.schema.js — 필터/정렬/파생 필드 정의
 *   speakers.view.js   — 카드/모달 마크업 (순수 함수)
 */
import { createState, resetState } from "../../core/state.js";
import { $, esc, debounce } from "../../core/dom.js";
import { buildFilters, wireFilterToggle, controlsBarHTML } from "../../ui/filters.js";
import { renderGrid } from "../../ui/card-grid.js";
import { openModalWith } from "../../ui/modal.js";
import { openSplitPane, replaceSplitPane1 } from "../../ui/split-view.js";
import { registerDomain, setItemRoute, replaceItemRoute } from "../../core/router.js";
import { refreshNavCounts } from "../../ui/nav.js";
import { renderLegend } from "../../ui/legend.js";
import { registerSpeakers, resolveAmpIdForModel, findAmplifierById, findSpeakerById, findSpeakersMatchingAmp, findAmpConfigsBySpeaker, findAccessoriesForSpeaker, findAccessoryById } from "../../relationships/cross-ref.js";

import { SPEAKERS } from "./speakers.data.js";
import { speakersSchema, MFR, MK_ORDER, normalizeCrossover, normalizeLowUnitConfig, normalizeAngleRanges, THROWCAT_ORDER, SERIES_ORDER_OVERRIDE } from "./speakers.schema.js";
import { cardHTML as speakerCardHTML, modalBodyHTML as speakerModalBodyHTML, setSplRange } from "./speakers.view.js";

// 스피커 모달 안에서 앰프 행을 클릭하면 Split View pane 2 에 앰프 상세를 띄운다.
// 이때 앰프의 "순수 뷰 함수"만 import — 앰프 controller 를 import 하지 않아
// 컨트롤러 간 결합이 생기지 않는다.
import { AMP_MFR } from "../amplifiers/amplifiers.schema.js";
import { modalBodyHTML as ampModalBodyHTML } from "../amplifiers/amplifiers.view.js";

// [사용자 요청] 스피커 모달 안에서도 System Elements(리깅/프로텍션 등
// 액세서리) 칩을 클릭하면 Split View pane 2 에 액세서리 상세를 띄운다 —
// amplifiers.controller.js 의 wireAmpModalAccessoryClicks 와 동일한 패턴.
// 액세서리의 "순수 뷰 함수"와 색상 맵만 import.
import { ACC_MFR } from "../accessories/accessories.schema.js";
import { modalBodyHTML as accessoryModalBodyHTML } from "../accessories/accessories.view.js";

// 파생 필드(wayCount/network/lowUnitConfig/hRange/vRange/splayRange)를 UI 가
// 읽기 전에 생성하고, cross-ref 레지스트리에 스피커 데이터를 등록한다
// (모듈 로드 시 1회).
normalizeCrossover(SPEAKERS);
normalizeLowUnitConfig(SPEAKERS);
normalizeAngleRanges(SPEAKERS);
registerSpeakers(SPEAKERS);

const speakersState = createState();
speakersState.sort = "series";

/** 탭 활성화: 최초 1회 UI 빌드 후 렌더 (이후엔 hidden 만 해제) */
function mountSpeakers() {
  renderLegend(SPEAKERS, MK_ORDER, MFR, d => d.mk);
  const wrap = $("#view-speakers");
  wrap.hidden = false;
  if (!wrap.dataset.built) {
    wrap.dataset.built = "1";
    buildSpeakersUI(wrap);
  }
  renderSpeakers();
}

/** 탭 비활성화: 뷰 숨김 (상태/DOM 유지) */
function unmountSpeakers() { $("#view-speakers").hidden = true; }

/**
 * 검색/정렬/필터 컨트롤 바 + 결과 영역의 골격을 1회 빌드하고 이벤트를 연결한다.
 * @param {HTMLElement} wrap #view-speakers 컨테이너
 */
function buildSpeakersUI(wrap) {
  const splVals = SPEAKERS.map(d => d.spl).filter(x => x != null);
  setSplRange(Math.floor(Math.min(...splVals)), Math.ceil(Math.max(...splVals)));

  wrap.innerHTML = controlsBarHTML("spk", "스피커 이름 검색  ·  e.g.  K2 / KS28 / GSL12 / Syva", [
    { value: "series", label: "정렬 · 시리즈" },
    { value: "spl", label: "정렬 · 음압 높은순" },
    { value: "inch-desc", label: "정렬 · 드라이버 큰순" },
    { value: "inch-asc", label: "정렬 · 드라이버 작은순" },
    { value: "name", label: "정렬 · 이름순" },
  ]) + `
    <div class="content-wrap">
      <div id="spk-results"></div>
    </div>`;

  buildFilters($("#spk-filters"), SPEAKERS, speakersState, speakersSchema, renderSpeakers);
  wireFilterToggle($("#spk-filter-toggle"), $("#spk-filters"));

  // [성능] 타이핑마다 그리드 전체를 재생성하지 않도록 렌더만 디바운스
  // (상태 갱신은 즉시 — 다른 코드가 state.q 를 읽어도 항상 최신값).
  const debouncedRender = debounce(renderSpeakers);
  $("#spk-q").addEventListener("input", e => { speakersState.q = e.target.value.trim(); debouncedRender(); });
  $("#spk-sort").addEventListener("change", e => { speakersState.sort = e.target.value; renderSpeakers(); });
  $("#spk-reset").onclick = resetSpeakers;
}

/** 검색어/칩/정렬을 초기화하고 필터 패널을 재빌드한 뒤 다시 렌더링 */
function resetSpeakers() {
  resetState(speakersState, speakersSchema);
  $("#spk-q").value = "";
  $("#spk-sort").value = "series";
  document.querySelectorAll("#spk-filters .chip").forEach(c => c.setAttribute("aria-pressed", "false"));
  buildFilters($("#spk-filters"), SPEAKERS, speakersState, speakersSchema, renderSpeakers);
  renderSpeakers();
}

/** 현재 상태로 결과 그리드를 렌더링 (시리즈 정렬 시 제조사>시리즈 그룹핑) */
function renderSpeakers() {
  renderGrid({
    resultsEl: $("#spk-results"),
    countEl: $("#count"),
    filterPanelEl: $("#spk-filters"),
    data: SPEAKERS,
    state: speakersState,
    schema: speakersSchema,
    cardHTML: speakerCardHTML,
    onOpen: openSpeakerModal,
    groupBy: speakersState.sort === "series" ? {
      order: MK_ORDER,
      getKey: d => d.mk,
      subGroupKey: d => d.series,
      // 시리즈는 throw 등급(Long → Medium → Short) 순으로 배치. throwCat 이
      // 없는 독립 서브우퍼 시리즈(예: L-Acoustics "Subwoofers")는 맨 뒤로.
      // d&b CL/SL 처럼 throwCat 이 둘 다 없어(-1) 알파벳순으로 밀리던 경우는
      // SERIES_ORDER_OVERRIDE 로 명시 우선순위를 먼저 확인(사용자 요청 —
      // SL 을 CL 보다 먼저).
      subGroupOrder: (sgA, sgB) => {
        const oa = SERIES_ORDER_OVERRIDE[sgA], ob = SERIES_ORDER_OVERRIDE[sgB];
        if (oa != null && ob != null) return oa - ob;
        if (oa != null) return -1;
        if (ob != null) return 1;
        const itemA = SPEAKERS.find(d => d.series === sgA);
        const itemB = SPEAKERS.find(d => d.series === sgB);
        const ia = itemA && itemA.throwCat ? THROWCAT_ORDER.indexOf(itemA.throwCat) : -1;
        const ib = itemB && itemB.throwCat ? THROWCAT_ORDER.indexOf(itemB.throwCat) : -1;
        const ra = ia === -1 ? THROWCAT_ORDER.length : ia;
        const rb = ib === -1 ? THROWCAT_ORDER.length : ib;
        if (ra !== rb) return ra - rb;
        return String(sgA).localeCompare(String(sgB));
      },
      // 시리즈 내부: Subwoofer 타입(K1-SB, CCL-SUB 등)은 항상 뒤로,
      // 나머지는 저역 드라이버 크기 큰 순 (동률이면 이름순).
      // S Series 예외(사용자 요청): Soka(및 Soka inWall 등 Soka 계열)는
      // lowInch 기준으로는 Syva 계열보다 앞서지만, Syva/Syva Low/Syva Sub
      // 를 먼저 묶어 보여준 뒤 Soka 계열이 마지막에 오도록 명시적으로
      // 뒤로 보낸다. Soka 계열 내부는 이름순(Soka → Soka inWall)으로 자연
      // 정렬.
      sortWithinGroup: (a, b) => {
        const sokaA = a.name.startsWith("Soka") ? 1 : 0;
        const sokaB = b.name.startsWith("Soka") ? 1 : 0;
        if (sokaA !== sokaB) return sokaA - sokaB;
        const subA = a.type === "Subwoofer" ? 1 : 0;
        const subB = b.type === "Subwoofer" ? 1 : 0;
        if (subA !== subB) return subA - subB;
        const diA = a.lowInch || 0, diB = b.lowInch || 0;
        if (diA !== diB) return diB - diA;
        return a.name.localeCompare(b.name);
      },
      headHTML: (mk, series, group) => {
        const gt = group[0].throwCat ? esc(group[0].throwCat) + ' · ' + esc(series) : esc(series);
        return `<span class="card-group__badge card-group__badge--name" style="border-color:${MFR[mk].color}55;color:${MFR[mk].color}">${esc(MFR[mk].name)}</span><span class="card-group__title">${gt}</span><span class="card-group__count">${group.length} ea</span>`;
      }
    } : null,
  });
  refreshNavCounts();
}

/**
 * 스피커 상세 모달을 연다 (+ URL 해시에 카드 id 기록 — #speakers/<id>).
 * @param {string} id 스피커 id
 * @returns {boolean} id 가 유효해 모달을 열었으면 true (라우터 딥링크 판정용)
 */
function openSpeakerModal(id) {
  const d = SPEAKERS.find(s => s.id === id);
  if (!d) return false;
  const { color, head, body } = speakerModalBodyHTML(d, resolveAmpIdForModel, findAccessoriesForSpeaker(d.id));
  openModalWith(color, head, body);
  wireSpeakerModalAmpClicks();
  wireSpeakerModalAccessoryClicks();
  setItemRoute(id);
  return true;
}

/**
 * 스피커 모달 안의 System Elements 칩(연관 액세서리) 클릭 → Split View
 * pane 2 에 액세서리 상세. amplifiers.controller.js
 * wireAmpModalAccessoryClicks 와 동일한 패턴(같은 액세서리를 다시 클릭하면
 * paneId 일치로 pane 2 가 닫힌다).
 */
function wireSpeakerModalAccessoryClicks() {
  document.querySelectorAll("#modal [data-accessory-id]").forEach(chip => {
    chip.addEventListener("click", () => {
      const aid = chip.dataset.accessoryId;
      const acc = findAccessoryById(aid);
      if (!acc) return;
      const M = ACC_MFR[acc.mfr];
      const { head, body } = accessoryModalBodyHTML(acc);
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
 * 방금 렌더된 스피커 모달 안의 앰프 행 클릭 → Split View pane 2 에 앰프 상세.
 * (스피커 → 앰프 방향)
 */
function wireSpeakerModalAmpClicks() {
  document.querySelectorAll("#modal .match-table__row[data-amp-id]").forEach(row => {
    row.addEventListener("click", () => {
      const ampId = row.dataset.ampId;
      const amp = findAmplifierById(ampId);
      if (!amp) return;
      const M = AMP_MFR[amp.mfr];
      // [사용자 요청] pane 2(앰프)의 Configurations 섹션이 펼쳐진 상태에서
      // 다른 앰프로 바꿔도(pane 1 의 Amplifier Matching 행 클릭) 그 펼침
      // 상태가 유지되어야 한다 — openSplitPane 은 기존 pane 2 를 통째로
      // remove() 하고 새로 만들기 때문에(위 openSplitPane 주석 참고), 교체
      // 전에 펼침 여부를 읽어뒀다가 onMounted 에서 새 pane 2 에 다시 적용한다.
      const oldPane2 = document.querySelector("#modal .split-view__pane:nth-child(2)");
      const wasConfigsExpanded = !!oldPane2 && oldPane2.querySelector('[data-section-toggle="amp-configs"]')?.getAttribute("aria-expanded") === "true";
      const { head, body } = ampModalBodyHTML(amp, (sid) => { const s = findSpeakerById(sid); return s ? s.name : sid; }, findSpeakersMatchingAmp(ampId), findAmpConfigsBySpeaker(ampId));
      // 같은 앰프 행을 다시 클릭하면(paneId 일치) pane 2 가 열려있지 않고
      // 토글로 닫힌다 — X 버튼까지 마우스를 옮기지 않아도 됨. head 는
      // pane1(스피커 모달)과 동일한 .modal__head 구조라 X 버튼 위치·제목
      // 표기 방식이 좌우 pane 모두 통일된다.
      // 공통 인터랙션(뷰 전환·줌·+N 토글)은 openSplitPane 이 배선하고,
      // 도메인 고유 배선(스피커 칩 클릭)만 onMounted 로 넘긴다. [0-1]
      openSplitPane({
        headHTML: head,
        paneColor: M.color,
        bodyHTML: body,
        paneId: ampId,
        onMounted: (pane2El) => {
          wireSplitPaneSpeakerChips(pane2El);
          if (wasConfigsExpanded) {
            const btn = pane2El.querySelector('[data-section-toggle="amp-configs"]');
            const bodyEl = pane2El.querySelector('[data-section-toggle-body="amp-configs"]');
            if (btn && bodyEl) { btn.setAttribute("aria-expanded", "true"); bodyEl.hidden = false; }
          }
        },
      });
    });
  });
}

/**
 * Split View pane 2(앰프 상세) 안의 스피커 클릭(Configurations 표 행) →
 * pane 1(왼쪽, 스피커 상세)을 그 스피커로 교체한다. pane 2(앰프)는 그대로
 * 유지 — amplifiers.controller.js 의 wireSplitPaneAmpRows(앰프 → 스피커
 * 방향의 미러) 와 동일한 패턴. 이전에는 openSpeakerModal() 을 호출해 Split
 * View 전체가 해제되고 스피커 단일 모달로 바뀌는 버그가 있었다.
 * @param {HTMLElement} pane2El openSplitPane onMounted 가 넘겨주는 pane 2 요소
 */
function wireSplitPaneSpeakerChips(pane2El) {
  pane2El.querySelectorAll(".match-table__row[data-speaker-id]").forEach(row => {
    row.addEventListener("click", () => {
      const sid = row.dataset.speakerId;
      const s = findSpeakerById(sid);
      if (!s) return;
      const M = MFR[s.mk];
      const { head, body } = speakerModalBodyHTML(s, resolveAmpIdForModel);
      replaceSplitPane1({
        headHTML: head,
        paneColor: M.color,
        bodyHTML: body,
        onMounted: wireSpeakerModalAmpClicks,
      });
      // [모달 라우팅] pane1 이 이 스피커로 교체됐음을 URL item 단에 반영
      // (pane2 상태는 유지, 히스토리 엔트리 추가 없음).
      replaceItemRoute(sid);
    });
  });
}

/** Speakers 도메인을 라우터에 등록 — main.js 가 호출하는 유일한 공개 API */
export function initSpeakersDomain() {
  registerDomain("speakers", { label: "Speaker", mount: mountSpeakers, unmount: unmountSpeakers, count: () => SPEAKERS.length, openItem: openSpeakerModal });
}
