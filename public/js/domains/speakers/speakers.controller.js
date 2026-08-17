/**
 * @module domains/speakers/controller
 * Speakers 탭 컨트롤러 — mount/unmount/build/reset/render + 모달·Split View 연결.
 * 라우터에 스스로 등록하므로, 이 탭의 내부 동작을 밖에서 알 필요가 없다.
 *
 * 구성 요소:
 *   speakers.data.js   — 데이터 (시리즈별 파일의 배럴)
 *   speakers.detail.js — runtime catalog와 공통 상세 provider
 *   speakers.schema.js — 필터/정렬/파생 필드 정의
 *   speakers.view.js   — 카드/모달 마크업 (순수 함수)
 */
import { esc } from "../../core/dom.js";
import { createDomainTab } from "../../ui/domain-tab.js";
import { openDetailModal } from "../../ui/relation-navigation.js";

import { SPEAKER_CATALOG, initSpeakerDetailProvider } from "./speakers.detail.js";
import { speakersSchema, MFR, MK_ORDER, THROWCAT_ORDER, SERIES_ORDER_OVERRIDE } from "./speakers.schema.js";
import { cardHTML as speakerCardHTML, setSplRange } from "./speakers.view.js";

/** 시리즈 정렬일 때만 제조사>시리즈 2단 그룹핑, 그 외에는 평면 그리드 */
function speakersGroupBy(state) {
  return state.sort === "series" ? {
      order: MK_ORDER,
      getKey: d => d.mk,
      subGroupKey: d => d.series,
      // 시리즈는 throw 등급(Long → Medium → Short) 순으로 배치. throwCat 이
      // 없는 독립 서브우퍼 시리즈(예: L-Acoustics "Subwoofers")는 맨 뒤로.
      // d&b CL/SL처럼 throwCat이 둘 다 없으면 SERIES_ORDER_OVERRIDE를 먼저
      // 적용해 SL을 CL보다 앞에 둔다.
      subGroupOrder: (sgA, sgB) => {
        const oa = SERIES_ORDER_OVERRIDE[sgA], ob = SERIES_ORDER_OVERRIDE[sgB];
        if (oa != null && ob != null) return oa - ob;
        if (oa != null) return -1;
        if (ob != null) return 1;
        const itemA = SPEAKER_CATALOG.find(d => d.series === sgA);
        const itemB = SPEAKER_CATALOG.find(d => d.series === sgB);
        const ia = itemA && itemA.throwCat ? THROWCAT_ORDER.indexOf(itemA.throwCat) : -1;
        const ib = itemB && itemB.throwCat ? THROWCAT_ORDER.indexOf(itemB.throwCat) : -1;
        const ra = ia === -1 ? THROWCAT_ORDER.length : ia;
        const rb = ib === -1 ? THROWCAT_ORDER.length : ib;
        if (ra !== rb) return ra - rb;
        return String(sgA).localeCompare(String(sgB));
      },
      // 시리즈 내부: Subwoofer 타입(K1-SB, CCL-SUB 등)은 항상 뒤로,
      // 나머지는 저역 드라이버 크기 큰 순 (동률이면 이름순).
      // S Series에서 Soka 계열은 lowInch와 무관하게 Syva/Syva Low/Syva Sub
      // 뒤에 오도록 명시적으로
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
    } : null;
}

/**
 * 스피커 상세 모달을 연다 (+ URL 해시에 카드 id 기록 — #speakers/<id>).
 * @param {string} id 스피커 id
 * @returns {boolean} id 가 유효해 모달을 열었으면 true (라우터 딥링크 판정용)
 */
function openSpeakerModal(id) {
  return openDetailModal(id, "speaker");
}

/** Speakers 도메인을 라우터에 등록 — main.js 가 호출하는 유일한 공개 API */
export function initSpeakersDomain() {
  initSpeakerDetailProvider();
  createDomainTab({
    key: "speakers",
    label: "Speaker",
    idPrefix: "spk",
    searchPlaceholder: "스피커 이름 검색  ·  e.g.  K2 / KS28 / GSL12 / Syva",
    sortOptions: [
      { value: "series", label: "정렬 · 시리즈" },
      { value: "spl", label: "정렬 · 음압 높은순" },
      { value: "inch-desc", label: "정렬 · 드라이버 큰순" },
      { value: "inch-asc", label: "정렬 · 드라이버 작은순" },
      { value: "name", label: "정렬 · 이름순" },
    ],
    data: SPEAKER_CATALOG,
    schema: speakersSchema,
    cardHTML: speakerCardHTML,
    openItem: openSpeakerModal,
    groupBy: speakersGroupBy,
    legend: { order: MK_ORDER, mfrMap: MFR, keyOf: d => d.mk },
    // 카드 SPL 게이지 스케일 — 전체 스피커의 min/max 로 한 번만 설정.
    onBuild: () => {
      const splVals = SPEAKER_CATALOG.map(d => d.spl).filter(x => x != null);
      setSplRange(Math.floor(Math.min(...splVals)), Math.ceil(Math.max(...splVals)));
    },
  });
}
