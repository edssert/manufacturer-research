/**
 * @module ui/legend
 * 상단바 제조사 색상 범례(#legend) — 전 도메인 공용.
 *
 * 원래 speakers 컨트롤러 전용 함수여서 다른 탭에서는 범례가 갱신되지
 * 않았다(개선사항 0-2). 각 도메인이 mount 시 자기 데이터·MFR 맵으로
 * 호출해, 항상 현재 탭의 데이터 기준으로 범례가 표시된다.
 */
import { $, esc } from "../core/dom.js";

/**
 * 범례를 렌더링한다 — 데이터에 실제로 존재하는 제조사만, order 순서대로.
 * @param {Object[]} data 현재 도메인의 전체 레코드 배열
 * @param {string[]} order 제조사 키 표시 순서 (예: ["la","db","my"])
 * @param {Object} mfrMap 제조사 표시 정보 맵 { key: { name, color } }
 * @param {Function} [keyOf] 레코드에서 제조사 키를 읽는 함수 (기본 d.mfr —
 *   speakers 도메인만 d.mk 를 사용)
 */
export function renderLegend(data, order, mfrMap, keyOf = d => d.mfr) {
  const lg = $("#legend");
  if (!lg) return;
  lg.innerHTML = order
    .filter(k => data.some(d => keyOf(d) === k))
    .map(k => `<div class="legend__item"><span class="legend__dot" style="background:${mfrMap[k].color}"></span>${esc(mfrMap[k].name)}</div>`)
    .join("");
}
