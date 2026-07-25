/**
 * @module domains/software/view
 * 소프트웨어 카드 + 상세 모달 마크업 생성 (순수 함수 모음).
 *
 * 관련 CSS: css/components/card.css, css/components/spec-table.css
 */
import { esc } from "../../core/dom.js";
import { SW_MFR, primaryType } from "./software.schema.js";

/**
 * 소프트웨어 카드 1장의 HTML 을 생성한다.
 * @param {Object} s 소프트웨어 레코드
 * @returns {string} .card 마크업
 */
/**
 * 분류 표시용 문자열. type 이 배열이면 " · " 로 잇는다 — 기능이 겹쳐 두 개
 * 이상의 분류에 속하는 제품을 모달·헤더에서 전부 보여주기 위함.
 * @param {Object} s 소프트웨어 레코드
 * @returns {string}
 */
function typeList(s) {
  return Array.isArray(s.type) ? s.type.join(" · ") : (s.type || "");
}

export function cardHTML(s) {
  const M = SW_MFR[s.mfr], color = M.color;
  // 이미지가 있으면 쓰고, 없으면 기존 ⌘ 플레이스홀더 유지.
  const media = s.img
    ? `<img class="card__img" loading="lazy" src="${s.img}" alt="${esc(s.name)}">`
    : `<div class="card__noimg">⌘</div>`;
  return `<article class="card" style="--mfr:${color}" tabindex="0" data-id="${s.id}" role="button" aria-label="${esc(s.name)} 상세">
    <div class="card__media">${media}<span class="card__type-badge">${esc(primaryType(s) || "SW")}</span></div>
    <div class="card__body">
      <div class="eyebrow"><span class="eyebrow__brand">${esc(M.short)}</span> · ${esc(s.platform || "")}</div>
      <div class="card__name">${esc(s.name)}</div>
      <div class="card__config">${s.pending ? '<span class="hint-text">스펙 조사 전 — 이미지만 등록됨</span>' : esc(s.notes || "")}</div>
      <div class="card__stats">
        <!-- 카드 강조 값을 전역 accent 대신 제조사 색으로 -->
        <div class="stat-grid">
          <div class="stat-grid__cell"><span class="stat-grid__key">Price</span><span class="stat-grid__value stat-grid__value--mfr">${esc(s.price || "—")}</span></div>
          <div class="stat-grid__cell"><span class="stat-grid__key">Platform</span><span class="stat-grid__value">${esc(s.platform || "—")}</span></div>
          <div class="stat-grid__cell"><span class="stat-grid__key">DSPs</span><span class="stat-grid__value">${s.relations.dspIds.length}</span></div>
        </div>
      </div>
    </div>
  </article>`;
}

/**
 * 사양 표 행 1개 HTML (값이 비어 있으면 행 자체를 생략).
 * @param {string} label 항목명
 * @param {*} val 값
 * @param {boolean} [full] true 면 2열 전체 폭 사용
 */
function specRow(label, val, full) {
  if (val == null || String(val).trim() === "") return "";
  return `<div class="spec-table__cell${full ? ' spec-table__cell--full' : ''}"><div class="spec-table__key">${esc(label)}</div><div class="spec-table__value">${esc(val)}</div></div>`;
}

/**
 * 소프트웨어 상세 모달의 head/body 마크업을 생성한다.
 * 연동 DSP 칩에는 data-dsp-id 가 붙는다 — 클릭 → Split View 연결은
 * controller 가 담당.
 * @param {Object} s 소프트웨어 레코드
 * @param {Function|null} resolveDspName (dspId) => 표시 이름
 * @returns {{color: string, head: string, body: string}}
 */
export function modalBodyHTML(s, resolveDspName) {
  const M = SW_MFR[s.mfr], color = M.color;
  const head = `<div class="modal__head">
      <div class="eyebrow"><span class="eyebrow__brand" style="color:${color}">${esc(M.name)}</span> · ${esc(typeList(s))}</div>
      <div class="modal__title">${esc(s.name)}</div>
      <button class="modal__close" data-modal-close aria-label="닫기"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    </div>`;
  const dspChips = s.relations.dspIds.map(did => {
    const name = resolveDspName ? resolveDspName(did) : did;
    return `<button class="chip" data-dsp-id="${did}" type="button">${esc(name)}</button>`;
  }).join("");
  const media = s.img
    ? `<div class="modal__media-wrap"><div class="modal__media"><img class="modal__img" src="${s.img}" alt="${esc(s.name)}" loading="lazy" decoding="async"></div></div>`
    : "";
  const pendingNote = s.pending
    ? `<p class="hint-text" style="margin-bottom:12px">스펙 조사 전입니다 — 현재는 제조사 홈페이지 이미지만 등록돼 있습니다.</p>`
    : "";
  const body = `
    <div class="modal__body" id="modal-body-main">
      ${media}
      ${pendingNote}
      <div class="spec-table">
        ${specRow("Type", typeList(s))}
        ${specRow("Platform", s.platform)}
        ${specRow("Price", s.price)}
        ${specRow("Notes", s.notes, true)}
      </div>
      <p class="section-label" style="margin-top:20px">Related Processors (${s.relations.dspIds.length})</p>
      <div class="chip-group">${dspChips || '<span class="hint-text">연동 프로세서가 없습니다.</span>'}</div>
    </div>`;
  return { color, head, body };
}
