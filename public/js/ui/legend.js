/** @module ui/legend 상단바의 현재 제조사 수 요약을 렌더링한다. */
import { $ } from "../core/dom.js";

/**
 * 데이터에 실제로 존재하는 제조사 수를 표시한다.
 * @param {ReadonlyArray<Object>} data 현재 도메인의 전체 레코드 배열
 * @param {ReadonlyArray<string>} order 제조사 키 순서
 * @param {Object} mfrMap 제조사 표시 정보 맵
 * @param {Function} [keyOf] 레코드에서 제조사 키를 읽는 함수
 */
export function renderLegend(data, order, mfrMap, keyOf = d => d.mfr) {
  const lg = $("#legend");
  if (!lg) return;
  const manufacturerCount = order.filter(k => mfrMap[k] && data.some(d => keyOf(d) === k)).length;
  lg.innerHTML = `<div class="legend__summary"><b>${manufacturerCount}</b> manufacturers</div>`;
}
