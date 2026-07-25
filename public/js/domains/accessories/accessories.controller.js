/**
 * @module domains/accessories/controller
 * Accessories 탭 컨트롤러 — mount/unmount/build/reset/render + 모달 연결.
 *
 * 구성 요소:
 *   accessories.data.js   — 데이터 (브랜드별 파일의 배럴)
 *   accessories.schema.js — 필터/정렬 정의
 *   accessories.view.js   — 카드/모달 마크업 (순수 함수)
 *
 * 리깅 툴/케이블/케이스 등 부속품 전용 탭. 다른 도메인과
 * 상호 참조 관계가 없는 단순 카탈로그라 software.controller.js 의 DSP
 * 칩 연결(Split View wiring) 부분은 없다.
 */
import { esc } from "../../core/dom.js";
import { createDomainTab } from "../../ui/domain-tab.js";
import { openModalWith } from "../../ui/modal.js";
import { wireChipPanes } from "../../ui/split-view.js";
import { setItemRoute } from "../../core/router.js";
import { registerAccessories, findAmplifiersUsingAccessory, findSpeakersUsingAccessory, findAmplifierById, findSpeakerById, findSpeakersMatchingAmp, findAmpConfigsBySpeaker, resolveAmpIdForModel, findAccessoriesForSpeaker, findRelatedAccessories, accessoriesByIds } from "../../relationships/cross-ref.js";

import { ACCESSORIES } from "./accessories.data.js";
import { accessoriesSchema, ACC_MK_ORDER, ACC_MFR } from "./accessories.schema.js";
import { cardHTML as accCardHTML, modalBodyHTML as accModalBodyHTML, panePropsFor as accessoryPaneProps } from "./accessories.view.js";

// 액세서리 모달에서 "이 부속품을 어떤 랙 앰프가 쓰는지"를 역방향으로 보여주기
// 위해 앰프 모달 함수를 재사용한다. 순수 뷰 함수와 색상 맵만 가져오고
// controller 는 참조하지 않는다(순환 의존 방지 — speakers/amplifiers 가 서로를
// 참조하는 기존 패턴과 동일). 앰프 레코드 조회도 cross-ref.findAmplifierById()
// 를 거친다 — 다른 도메인의 데이터 모듈을 직접 import 하지 않는다는 원칙.
import { AMP_MFR } from "../amplifiers/amplifiers.schema.js";
import { modalBodyHTML as amplifierModalBodyHTML } from "../amplifiers/amplifiers.view.js";

// 액세서리 모달에서 "이 부속품을 어떤 스피커가 쓰는지"도
// 역방향으로 보여준다 — 스피커 모달 함수를 순수 뷰 함수로만 import.
import { MFR as SPK_MFR } from "../speakers/speakers.schema.js";
import { modalBodyHTML as speakerModalBodyHTML } from "../speakers/speakers.view.js";

// cross-ref 레지스트리에 액세서리 데이터 등록(모듈 로드 시 1회) — Rack
// 타입 앰프(LA-RAK III 등)가 자신의 System Elements(케이블/리깅)를 id 로
// 참조해 모달에서 클릭 가능한 칩으로 보여줄 때 조회한다.
registerAccessories(ACCESSORIES);

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
  const a = ACCESSORIES.find(x => x.id === id);
  if (!a) return false;
  const { color, head, body } = accModalBodyHTML(a, findAmplifiersUsingAccessory(a.id), findSpeakersUsingAccessory(a.id), findRelatedAccessories(a.id));
  openModalWith(color, head, body);
  // "Used In"(앰프/스피커)·"Related Accessories" 칩 → pane 2 에 그 항목 상세
  // (같은 칩을 다시 누르면 paneId 일치로 닫힌다).
  wireChipPanes("amp-id", ampPaneProps);
  wireChipPanes("speaker-id", speakerPaneProps);
  wireChipPanes("accessory-id", accessoryPaneProps);
  setItemRoute(id);
  return true;
}

/** "Used In" 앰프 칩 → pane 2 열기 인자 */
function ampPaneProps(ampId) {
  const amp = findAmplifierById(ampId);
  if (!amp) return null;
  const { head, body } = amplifierModalBodyHTML(amp, (sid) => { const s = findSpeakerById(sid); return s ? s.name : sid; }, findSpeakersMatchingAmp(amp.id), findAmpConfigsBySpeaker(amp.id), accessoriesByIds(amp.rack && amp.rack.relatedAccessoryIds));
  return { headHTML: head, paneColor: AMP_MFR[amp.mfr].color, bodyHTML: body, paneId: ampId };
}

/** "Used In" 스피커 칩 → pane 2 열기 인자 */
function speakerPaneProps(sid) {
  const s = findSpeakerById(sid);
  if (!s) return null;
  const { head, body } = speakerModalBodyHTML(s, resolveAmpIdForModel, findAccessoriesForSpeaker(s.id));
  return { headHTML: head, paneColor: SPK_MFR[s.mk].color, bodyHTML: body, paneId: sid };
}

/** Accessories 도메인을 라우터에 등록 — main.js 가 호출하는 유일한 공개 API */
export function initAccessoriesDomain() {
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
