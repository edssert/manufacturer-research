/**
 * @module domains/amplifiers/controller
 * Amplifiers 탭 컨트롤러 — mount/unmount/build/reset/render + 모달·Split View 연결.
 *
 * 구성 요소:
 *   amplifiers.data.js   — 데이터 (브랜드별 파일의 배럴)
 *   amplifiers.schema.js — 필터/정렬 정의
 *   amplifiers.view.js   — 카드/모달 마크업 (순수 함수)
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
import { registerAmplifiers, resolveAmpIdForModel, findSpeakerById, findSpeakersMatchingAmp, findAmpConfigsBySpeaker, findAccessoryById } from "../../relationships/cross-ref.js";

import { AMPLIFIERS } from "./amplifiers.data.js";
import { amplifiersSchema, AMP_MFR, AMP_MK_ORDER, compareModel } from "./amplifiers.schema.js";
import { cardHTML as ampCardHTML, modalBodyHTML as ampModalBodyHTML, setWattRange, setRackWattRange, totalWatt4Ohm } from "./amplifiers.view.js";

// 앰프 모달 안에서 스피커 칩을 클릭하면 Split View pane 2 에 스피커 상세를
// 띄운다. 스피커의 "순수 뷰 함수"와 색상 맵만 import (controller 미참조).
import { MFR } from "../speakers/speakers.schema.js";
import { modalBodyHTML as speakerModalBodyHTML } from "../speakers/speakers.view.js";

// Rack 타입 앰프(LA-RAK III 등) 모달 안에서 System Elements 칩을 클릭하면
// Split View pane 2 에 액세서리(리깅/케이블) 상세를 띄운다 — 스피커와
// 동일한 패턴. 액세서리의 "순수 뷰 함수"와 색상 맵만 import.
import { ACC_MFR } from "../accessories/accessories.schema.js";
import { modalBodyHTML as accessoryModalBodyHTML } from "../accessories/accessories.view.js";

// cross-ref 레지스트리에 앰프 데이터 등록 (모듈 로드 시 1회)
registerAmplifiers(AMPLIFIERS);

// relations.speakerIds(정적 필드)는 현재 대부분 비어있으므로, 실제 매칭은
// 스피커 쪽 amps[].model 을 역해석해 동적으로 채운다(findSpeakersMatchingAmp).
// 카드의 "Speakers" 개수·정렬(speakerCount)·모달의 Matched Speakers 가 모두
// 이 필드를 읽으므로, 렌더링 전에 한 번 채워두면 기존 코드를 그대로 재사용할
// 수 있다. registerSpeakers() 가 이미 호출된 뒤(스피커 도메인이 먼저 import
// 되어 모듈 최상단에서 등록됨)라야 정확히 계산되므로 mount 시점에 수행한다.
function syncMatchedSpeakerIds() {
  AMPLIFIERS.forEach(a => { a.relations.speakerIds = findSpeakersMatchingAmp(a.id); });
}

const ampState = createState();
ampState.sort = "type";

/** 탭 활성화: 최초 1회 UI 빌드 후 렌더 */
function mountAmplifiers() {
  renderLegend(AMPLIFIERS, AMP_MK_ORDER, AMP_MFR);
  syncMatchedSpeakerIds();
  const wrap = $("#view-amplifiers");
  wrap.hidden = false;
  if (!wrap.dataset.built) {
    wrap.dataset.built = "1";
    buildAmplifiersUI(wrap);
  }
  renderAmplifiers();
}

/** 탭 비활성화: 뷰 숨김 */
function unmountAmplifiers() { $("#view-amplifiers").hidden = true; }

/**
 * 컨트롤 바 + 결과 영역 골격을 1회 빌드하고 이벤트를 연결한다.
 * @param {HTMLElement} wrap #view-amplifiers 컨테이너
 */
function buildAmplifiersUI(wrap) {
  // [사용자 요청] 스피커 탭의 SPL 게이지(setSplRange)와 동일한 패턴 —
  // 전체 앰프의 Total Watt 값 min/max 로 카드 게이지 스케일을 설정.
  // [사용자 요청, 2차] Rack 앰프(8Ω/2.7Ω 기준 총량, 수만 W 대)와 일반 앰프
  // (4Ω 기준, 최대 17,600W)는 절대치 자릿수가 달라 같은 스케일을 쓰면 일반
  // 앰프 바가 전부 짧아 보인다 — type:"Rack" 기준으로 스케일을 분리.
  const standaloneVals = AMPLIFIERS.filter(a => a.type !== "Rack").map(totalWatt4Ohm).filter(x => x != null);
  const rackVals = AMPLIFIERS.filter(a => a.type === "Rack").map(totalWatt4Ohm).filter(x => x != null);
  if (standaloneVals.length) setWattRange(Math.floor(Math.min(...standaloneVals)), Math.ceil(Math.max(...standaloneVals)));
  if (rackVals.length) setRackWattRange(Math.floor(Math.min(...rackVals)), Math.ceil(Math.max(...rackVals)));
  wrap.innerHTML = controlsBarHTML("amp", "앰프 모델 검색  ·  e.g.  LA12X / D90", [
    { value: "type", label: "정렬 · 제조사/타입별" },
    { value: "model", label: "정렬 · 이름순" },
    { value: "channels", label: "정렬 · 채널 많은순" },
    { value: "speakerCount", label: "정렬 · 매칭 스피커 많은순" },
  ]) + `
    <div class="content-wrap">
      <div id="amp-results"></div>
    </div>`;

  buildFilters($("#amp-filters"), AMPLIFIERS, ampState, amplifiersSchema, renderAmplifiers);
  wireFilterToggle($("#amp-filter-toggle"), $("#amp-filters"));

  // [성능] 타이핑마다 그리드 전체를 재생성하지 않도록 렌더만 디바운스.
  const debouncedRender = debounce(renderAmplifiers);
  $("#amp-q").addEventListener("input", e => { ampState.q = e.target.value.trim(); debouncedRender(); });
  $("#amp-sort").addEventListener("change", e => { ampState.sort = e.target.value; renderAmplifiers(); });
  $("#amp-reset").onclick = resetAmplifiers;
}

/** 검색어/칩/정렬 초기화 후 재렌더링 */
function resetAmplifiers() {
  resetState(ampState, amplifiersSchema);
  $("#amp-q").value = "";
  $("#amp-sort").value = "type";
  document.querySelectorAll("#amp-filters .chip").forEach(c => c.setAttribute("aria-pressed", "false"));
  buildFilters($("#amp-filters"), AMPLIFIERS, ampState, amplifiersSchema, renderAmplifiers);
  renderAmplifiers();
}

/** 앰프에 시리즈 개념이 없어 스피커의 series 필드를 대신할 분류 필드가
 * 없다 — 대신 `type`(예: "Amplified Controller")을 쓰되, 이 필드가 없는
 * 앰프(d&b D80/D90 등 기존 단순 스키마)는 랙형 투어링 앰프이므로 기본값
 * "Amplifier"로 묶는다("Rack"은 파워/네트워크까지 통합된 별도 장비 분류라
 * 이 데이터에는 아직 해당 사항 없음). */
const ampTypeOf = a => a.type || "Amplifier";

/** 현재 상태로 결과 그리드 렌더링 (제조사/타입 정렬 시 제조사>타입 그룹핑) */
function renderAmplifiers() {
  renderGrid({
    resultsEl: $("#amp-results"),
    countEl: $("#count"),
    filterPanelEl: $("#amp-filters"),
    data: AMPLIFIERS,
    state: ampState,
    schema: amplifiersSchema,
    cardHTML: ampCardHTML,
    onOpen: openAmpModal,
    groupBy: ampState.sort === "type" ? {
      order: AMP_MK_ORDER,
      getKey: d => d.mfr,
      subGroupKey: d => ampTypeOf(d),
      subGroupOrder: (sgA, sgB) => sgA.localeCompare(sgB),
      sortWithinGroup: compareModel,
      headHTML: (mfr, type, group) => {
        return `<span class="card-group__badge card-group__badge--name" style="border-color:${AMP_MFR[mfr].color}55;color:${AMP_MFR[mfr].color}">${esc(AMP_MFR[mfr].name)}</span><span class="card-group__title">${esc(type)}</span><span class="card-group__count">${group.length} ea</span>`;
      }
    } : null,
  });
  refreshNavCounts();
}

/**
 * Rack 타입 앰프(a.rack.relatedAccessoryIds)의 id 목록을 실제 액세서리
 * {id, name, type} 객체 배열로 조회한다 — cross-ref.findAccessoryById() 로
 * 하나씩 조회하고, 존재하지 않는 id(데이터 오타 등)는 조용히 걸러낸다.
 * @param {Object} a 앰프 레코드
 * @returns {{id:string, name:string, type:string}[]}
 */
function relatedAccessoriesOf(a) {
  const ids = (a.rack && a.rack.relatedAccessoryIds) || [];
  return ids.map(findAccessoryById).filter(Boolean).map(acc => ({ id: acc.id, name: acc.name, type: acc.type }));
}

/**
 * 앰프 상세 모달을 연다 (+ URL 해시에 카드 id 기록 — #amplifiers/<id>).
 * @param {string} id 앰프 id
 * @returns {boolean} id 가 유효해 모달을 열었으면 true (라우터 딥링크 판정용)
 */
function openAmpModal(id) {
  const a = AMPLIFIERS.find(x => x.id === id);
  if (!a) return false;
  const { color, head, body } = ampModalBodyHTML(a, (sid) => { const s = findSpeakerById(sid); return s ? s.name : sid; }, findSpeakersMatchingAmp(a.id), findAmpConfigsBySpeaker(a.id), relatedAccessoriesOf(a));
  openModalWith(color, head, body);
  wireAmpModalSpeakerClicks(a);
  wireAmpModalAccessoryClicks(a);
  // Configurations +N 토글 배선은 openModalWith → wirePaneInteractions 로
  // 이동 (pane 2 에서도 동작해야 하므로 공통화 — 개선사항 0-1).
  setItemRoute(id);
  return true;
}

/**
 * 앰프 모달 안의 스피커 칩(Matched Speakers) 또는 Configurations 표 대표
 * 행 클릭 → Split View pane 2 에 스피커 상세.
 * (앰프 → 스피커 방향 — 스피커 → 앰프 흐름의 미러)
 * pane 2 안에서 또 다른 스피커를 클릭하면 pane 2 가 교체되고, 이미 pane 2
 * 에 열려있는 것과 같은 스피커를 다시 클릭하면(paneId 일치) 대신 닫힌다 —
 * X 버튼까지 마우스를 옮기지 않아도 됨.
 * @param {Object} amp 현재 모달의 앰프 레코드
 */
function wireAmpModalSpeakerClicks(amp) {
  document.querySelectorAll("#modal [data-speaker-id]").forEach(chip => {
    chip.addEventListener("click", (e) => {
      // [사용자 요청] Configurations 표에서 병합된 행(예: "K3(i)")의 이름을
      // "K3"/"(i)" 두 파트로 나눠 각각 다른 스피커 상세로 이동할 수 있게
      // 했다 — 이름 파트(.match-table__model-name-part)도 부모 행
      // (.match-table__row--clickable)도 둘 다 [data-speaker-id] 를 갖고
      // 있어 이 querySelectorAll 이 둘 다 선택한다. 파트를 클릭했을 때
      // 버블링으로 부모 행의 리스너까지 실행되면 방금 연 파트별 상세가
      // 곧바로 행의 대표 id 상세로 덮어써지므로 전파를 막는다.
      e.stopPropagation();
      const sid = chip.dataset.speakerId;
      if (!sid || sid === "null") return; // "i" 삽입 케이스의 공통 텍스트 파트(id 없음)
      const s = findSpeakerById(sid);
      if (!s) return;
      const M = MFR[s.mk];
      const { head, body } = speakerModalBodyHTML(s, resolveAmpIdForModel);
      openSplitPane({
        headHTML: head,
        paneColor: M.color,
        bodyHTML: body,
        paneId: sid,
        onMounted: wireSplitPaneAmpRows,
      });
    });
  });
}

/**
 * Rack 타입 앰프 모달 안의 System Elements 칩(연관 액세서리) 클릭 →
 * Split View pane 2 에 액세서리 상세. wireAmpModalSpeakerClicks 와 동일한
 * 패턴(같은 액세서리를 다시 클릭하면 paneId 일치로 pane 2 가 닫힌다).
 * @param {Object} amp 현재 모달의 앰프 레코드 (미사용이나 시그니처 통일)
 */
function wireAmpModalAccessoryClicks(amp) {
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
 * Split View pane 2(스피커 상세) 안의 Amplifier Matching 표 행 클릭 →
 * pane 1(왼쪽, 앰프 상세)을 그 앰프로 교체한다. pane 2 는 그대로 유지.
 * (스피커 → 앰프 방향 — wireSpeakerModalAmpClicks 의 pane 1 버전)
 * @param {HTMLElement} pane2El openSplitPane onMounted 가 넘겨주는 pane 2 요소
 */
function wireSplitPaneAmpRows(pane2El) {
  pane2El.querySelectorAll(".match-table__row[data-amp-id]").forEach(row => {
    row.addEventListener("click", () => {
      const ampId = row.dataset.ampId;
      const a = AMPLIFIERS.find(x => x.id === ampId);
      if (!a) return;
      const M = AMP_MFR[a.mfr];
      const { head, body } = ampModalBodyHTML(a, (sid) => { const s = findSpeakerById(sid); return s ? s.name : sid; }, findSpeakersMatchingAmp(a.id), findAmpConfigsBySpeaker(a.id));
      replaceSplitPane1({
        headHTML: head,
        paneColor: M.color,
        bodyHTML: body,
        onMounted: () => wireAmpModalSpeakerClicks(a),
      });
      // [모달 라우팅] pane1 이 이 앰프로 교체됐음을 URL item 단에 반영
      // (pane2 상태는 유지, 히스토리 엔트리 추가 없음).
      replaceItemRoute(ampId);
    });
  });
}

/** Amplifiers 도메인을 라우터에 등록 — main.js 가 호출하는 유일한 공개 API */
export function initAmplifiersDomain() {
  registerDomain("amplifiers", { label: "Amplifier", mount: mountAmplifiers, unmount: unmountAmplifiers, count: () => AMPLIFIERS.length, openItem: openAmpModal });
}
