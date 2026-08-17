/**
 * @module domains/amplifiers/controller
 * Amplifiers 탭 컨트롤러 — mount/unmount/build/reset/render + 모달·Split View 연결.
 *
 * 구성 요소:
 *   amplifiers.data.js   — 데이터 (브랜드별 파일의 배럴)
 *   amplifiers.detail.js — 관계 조회와 공통 상세 provider
 *   amplifiers.schema.js — 필터/정렬 정의
 *   amplifiers.view.js   — 카드/모달 마크업 (순수 함수)
 */
import { esc } from "../../core/dom.js";
import { createDomainTab } from "../../ui/domain-tab.js";
import { openDetailModal } from "../../ui/relation-navigation.js";
import { findSpeakersMatchingAmp } from "../../relationships/cross-ref.js";

import { AMPLIFIERS } from "./amplifiers.data.js";
import { initAmplifierDetailProvider } from "./amplifiers.detail.js";
import { amplifiersSchema, AMP_MFR, AMP_MK_ORDER, compareModel, withDerivedSpeakerCount } from "./amplifiers.schema.js";
import { cardHTML as ampCardHTML, setWattRange, setRackWattRange, gaugeTotalWatt } from "./amplifiers.view.js";

// speakerCount 는 스피커의 amps[]를 단일 원본으로 삼는 cross-ref 조회값이다.
// 스키마를 한 번 구성하되 조회는 comparator 실행 시 수행해 레지스트리 재등록에
// 따른 인덱스 무효화가 즉시 반영되도록 한다.
const amplifierListSchema = withDerivedSpeakerCount(findSpeakersMatchingAmp);

/**
 * 카드 Watt 게이지 스케일 — 최초 빌드 때 1회.
 * Rack 앰프(8Ω/2.7Ω 기준 총량, 수만 W 대)와 일반 앰프(4Ω 기준,
 * 최대 17,600W)는 절대치 자릿수가 달라 같은 스케일을 쓰면 일반 앰프 바가 전부
 * 짧아 보인다 — type:"Rack" 기준으로 스케일을 분리한다.
 */
function setWattScales() {
  const standaloneVals = AMPLIFIERS.filter(a => a.type !== "Rack").map(gaugeTotalWatt).filter(x => x != null);
  const rackVals = AMPLIFIERS.filter(a => a.type === "Rack").map(gaugeTotalWatt).filter(x => x != null);
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
  return openDetailModal(id, "amplifier");
}

/** Amplifiers 도메인을 라우터에 등록 — main.js 가 호출하는 유일한 공개 API */
export function initAmplifiersDomain() {
  initAmplifierDetailProvider();
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
    schema: amplifierListSchema,
    cardHTML: ampCardHTML,
    openItem: openAmpModal,
    groupBy: amplifiersGroupBy,
    legend: { order: AMP_MK_ORDER, mfrMap: AMP_MFR },
    onBuild: setWattScales,
  });
}
