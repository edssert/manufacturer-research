/**
 * @module domains/amplifiers/controller
 * Amplifiers 탭 컨트롤러 — mount/unmount/build/reset/render + 모달·Split View 연결.
 *
 * 구성 요소:
 *   amplifiers.data.js   — 데이터 (브랜드별 파일의 배럴)
 *   amplifiers.schema.js — 필터/정렬 정의
 *   amplifiers.view.js   — 카드/모달 마크업 (순수 함수)
 */
import { esc } from "../../core/dom.js";
import { createDomainTab } from "../../ui/domain-tab.js";
import { openModalWith } from "../../ui/modal.js";
import { replaceSplitPane1, wireChipPanes } from "../../ui/split-view.js";
import { setItemRoute, replaceItemRoute } from "../../core/router.js";
import { registerAmplifiers, resolveAmpIdForModel, findSpeakerById, findSpeakersMatchingAmp, findAmpConfigsBySpeaker, accessoriesByIds } from "../../relationships/cross-ref.js";

import { AMPLIFIERS } from "./amplifiers.data.js";
import { amplifiersSchema, AMP_MFR, AMP_MK_ORDER, compareModel } from "./amplifiers.schema.js";
import { cardHTML as ampCardHTML, modalBodyHTML as ampModalBodyHTML, setWattRange, setRackWattRange, totalWatt4Ohm } from "./amplifiers.view.js";

// 앰프 모달 안에서 스피커 칩을 클릭하면 Split View pane 2 에 스피커 상세를
// 띄운다. 스피커의 "순수 뷰 함수"와 색상 맵만 import (controller 미참조).
import { MFR } from "../speakers/speakers.schema.js";
import { modalBodyHTML as speakerModalBodyHTML } from "../speakers/speakers.view.js";

// Rack 타입 앰프(LA-RAK III 등) 모달 안에서 System Elements 칩을 클릭하면
// Split View pane 2 에 액세서리(리깅/케이블) 상세를 띄운다 — 스피커와
// 동일한 패턴. "액세서리를 pane 으로 여는 법"은 액세서리 도메인이 제공한다.
import { panePropsFor as accessoryPaneProps } from "../accessories/accessories.view.js";

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

/**
 * 카드 Watt 게이지 스케일 — 최초 빌드 때 1회.
 * Rack 앰프(8Ω/2.7Ω 기준 총량, 수만 W 대)와 일반 앰프(4Ω 기준,
 * 최대 17,600W)는 절대치 자릿수가 달라 같은 스케일을 쓰면 일반 앰프 바가 전부
 * 짧아 보인다 — type:"Rack" 기준으로 스케일을 분리한다.
 */
function setWattScales() {
  const standaloneVals = AMPLIFIERS.filter(a => a.type !== "Rack").map(totalWatt4Ohm).filter(x => x != null);
  const rackVals = AMPLIFIERS.filter(a => a.type === "Rack").map(totalWatt4Ohm).filter(x => x != null);
  if (standaloneVals.length) setWattRange(Math.floor(Math.min(...standaloneVals)), Math.ceil(Math.max(...standaloneVals)));
  if (rackVals.length) setRackWattRange(Math.floor(Math.min(...rackVals)), Math.ceil(Math.max(...rackVals)));
}

/**
 * 섹션 분류 키 — 앰프에는 스피커의 series 에 대응하는 필드가 없다.
 * Rack(LA-RAK 등)은 개별 앰프와 성격이 달라 usage 와 무관하게 따로 빼고,
 * 나머지는 시장(usage: Touring/Installation) → type → 기본값 순으로 폴백한다.
 * type 자체는 Type 필터 칩으로도 계속 쓰인다.
 */
const ampTypeOf = a => a.type === "Rack" ? "Rack" : (a.usage || a.type || "Amplifier");

/** 제조사/타입 정렬일 때만 제조사>타입 2단 그룹핑, 그 외에는 평면 그리드 */
function amplifiersGroupBy(state) {
  return state.sort === "type" ? {
      order: AMP_MK_ORDER,
      getKey: d => d.mfr,
      subGroupKey: d => ampTypeOf(d),
      // 섹션 표시 순서: 플래그십인 Touring 을 Installation 보다 위로(LA·d&b
      // 공통). type 폴백 키(Amplified Controller/Rack)도 순서에 두어 안전.
      // 목록에 없는 키는 뒤에 알파벳순.
      subGroupOrder: (sgA, sgB) => {
        const ORDER = ["Amplified Controller", "Touring", "Installation", "Rack"];
        const ia = ORDER.indexOf(sgA), ib = ORDER.indexOf(sgB);
        return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || sgA.localeCompare(sgB);
      },
      sortWithinGroup: compareModel,
      headHTML: (mfr, type, group) => {
        return `<span class="card-group__badge card-group__badge--name" style="border-color:${AMP_MFR[mfr].color}55;color:${AMP_MFR[mfr].color}">${esc(AMP_MFR[mfr].name)}</span><span class="card-group__title">${esc(type)}</span><span class="card-group__count">${group.length} ea</span>`;
      }
    } : null;
}

/**
 * 앰프 상세 모달을 연다 (+ URL 해시에 카드 id 기록 — #amplifiers/<id>).
 * @param {string} id 앰프 id
 * @returns {boolean} id 가 유효해 모달을 열었으면 true (라우터 딥링크 판정용)
 */
function openAmpModal(id) {
  const a = AMPLIFIERS.find(x => x.id === id);
  if (!a) return false;
  const { color, head, body } = ampModalBodyHTML(a, (sid) => { const s = findSpeakerById(sid); return s ? s.name : sid; }, findSpeakersMatchingAmp(a.id), findAmpConfigsBySpeaker(a.id), accessoriesByIds(a.rack && a.rack.relatedAccessoryIds));
  openModalWith(color, head, body);
  wireAmpModalSpeakerClicks();
  // Rack 앰프의 System Elements 칩 → pane 2 에 액세서리 상세.
  wireChipPanes("accessory-id", accessoryPaneProps);
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
 */
function wireAmpModalSpeakerClicks() {
  wireChipPanes("speaker-id", sid => {
    // "K3(i)" 처럼 병합된 행의 공통 텍스트 파트는 id 가 없다(전파는 이미
    // wireChipPanes 가 막았으므로 여기서는 그냥 열지 않으면 된다).
    if (!sid || sid === "null") return null;
    const s = findSpeakerById(sid);
    if (!s) return null;
    const { head, body } = speakerModalBodyHTML(s, resolveAmpIdForModel);
    return {
      headHTML: head,
      paneColor: MFR[s.mk].color,
      bodyHTML: body,
      paneId: sid,
      onMounted: wireSplitPaneAmpRows,
    };
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
        onMounted: wireAmpModalSpeakerClicks,
      });
      // [모달 라우팅] pane1 이 이 앰프로 교체됐음을 URL item 단에 반영
      // (pane2 상태는 유지, 히스토리 엔트리 추가 없음).
      replaceItemRoute(ampId);
    });
  });
}

/** Amplifiers 도메인을 라우터에 등록 — main.js 가 호출하는 유일한 공개 API */
export function initAmplifiersDomain() {
  createDomainTab({
    key: "amplifiers",
    label: "Amplifier",
    idPrefix: "amp",
    searchPlaceholder: "앰프 모델 검색  ·  e.g.  LA12X / D90",
    sortOptions: [
      { value: "type", label: "정렬 · 제조사/타입별" },
      { value: "model", label: "정렬 · 이름순" },
      { value: "channels", label: "정렬 · 채널 많은순" },
      { value: "speakerCount", label: "정렬 · 매칭 스피커 많은순" },
    ],
    data: AMPLIFIERS,
    schema: amplifiersSchema,
    cardHTML: ampCardHTML,
    openItem: openAmpModal,
    groupBy: amplifiersGroupBy,
    legend: { order: AMP_MK_ORDER, mfrMap: AMP_MFR },
    onMount: syncMatchedSpeakerIds,
    onBuild: setWattScales,
  });
}
