/**
 * @module domains/accessories/view
 * 액세서리 카드 + 상세 모달 마크업 생성 (순수 함수 모음).
 *
 * 관련 CSS: css/components/card.css, css/components/spec-table.css
 */
import { esc } from "../../core/dom.js";
import { ACC_MFR } from "./accessories.schema.js";

/**
 * 카드 표시용 짧은 Type 라벨. [사용자 요청] "Protections & Transportations"
 * 처럼 긴 Type 명이 카드 eyebrow/Type 칸에서 줄바꿈되는 문제 — 카드에서만
 * 축약 라벨을 쓰고, 필터 칩/모달 제목 등 실제 데이터 값(a.type)은 그대로
 * 둔다(필터링·검색은 원래 값 기준으로 계속 동작).
 * @param {string} type 원본 Type 값
 * @returns {string} 카드 표시용 라벨(매핑 없으면 원본 그대로)
 */
const CARD_TYPE_LABEL = {
  "Protections & Transportations": "Protection",
};
function cardTypeLabel(type) {
  return CARD_TYPE_LABEL[type] || type;
}

/**
 * 액세서리의 제품 이미지 뷰 목록을 반환한다 — [{label, src}, ...].
 * speakers.view.js / amplifiers.view.js 의 getViews() 와 동일한 패턴: a.views
 * 배열을 직접 선언하거나(임의 개수/라벨), 레거시 img+imgBack 필드를 자동
 * 변환한다. views 도 img 도 없으면 빈 배열(카드에 ⚙ 아이콘 표시).
 * @param {Object} a 액세서리 레코드
 * @returns {{label: string, src: string}[]}
 */
function getViews(a) {
  if (Array.isArray(a.views) && a.views.length) return a.views;
  if (!a.img) return [];
  const views = [{ label: "Front", src: a.img }];
  if (a.imgBack) views.push({ label: "Rear", src: a.imgBack });
  return views;
}

/**
 * 길이만 다른 케이블 변형(a.lengths)을 칩 목록 HTML 로 렌더링한다.
 * [사용자 요청] 같은 케이블의 길이 변형(예: SP.7/SP5/SP10/SP25)은 카드를
 * 따로 만들지 않고 1개 레코드로 통합해 여기서 길이 칩으로 나열한다.
 * @param {{id:string, value:string}[]} lengths
 * @returns {string} 칩 목록 마크업 (없으면 "")
 */
function lengthChipsHTML(lengths) {
  if (!lengths || !lengths.length) return "";
  return `<div class="chip-group chip-group--compact">${lengths.map(l => `<span class="chip" style="cursor:default">${esc(l.value)}</span>`).join("")}</div>`;
}

/**
 * 길이 칩을 이름 옆(card__name-row)에 붙일 작은 태그 형태로 렌더링한다.
 * [사용자 요청] 길이 칩이 이름 아래 별도 줄(전체 폭)을 차지하던 것을,
 * speakers.view.js titleTagsHTML 과 동일한 패턴으로 이름 줄 오른쪽 끝에
 * 나란히 배치 — 별도 열 없이 공간을 절약한다. 길이가 1개뿐인 케이블
 * (POW2 "2m" 등)도 일관되게 표시(사용자 확인).
 * @param {{id:string, value:string}[]} lengths
 * @returns {string} 태그 목록 마크업 (없으면 "")
 */
function lengthNameTagsHTML(lengths) {
  if (!lengths || !lengths.length) return "";
  return `<div class="card__name-tags">${lengths.map(l => `<span class="card__name-tag">${esc(l.value)}</span>`).join("")}</div>`;
}

/**
 * connection.out 배열(개별 커넥터가 1개씩 나열된 배열)을 "라벨 x 개수"로
 * 압축한다. [사용자 요청] BOB32(NL4 x 8)처럼 같은 커넥터가 여러 개 나오는
 * 경우 박스를 개수만큼 늘어놓지 않고 "NL4 x 8" 배지 1개로 축약 — 순서는
 * 유지하되 연속된 동일 라벨만 묶는다(예: ["CA-COM","CA-COM","NL4",...,"NL4"]
 * → [{label:"CA-COM", count:2}, {label:"NL4", count:8}]).
 * @param {string[]} out
 * @returns {{label:string, count:number}[]}
 */
function collapseConnOut(out) {
  const groups = [];
  out.forEach(o => {
    const last = groups[groups.length - 1];
    if (last && last.label === o) last.count++;
    else groups.push({ label: o, count: 1 });
  });
  return groups;
}

/**
 * 커넥터 연결 다이어그램 HTML — 입력 커넥터 1개 → 출력 커넥터 N개(진짜
 * breakout 분기, 예: BOB32) 뿐 아니라, 분기 없이 양끝이 같은 커넥터인
 * 단순 케이블(예: DO의 "CA-COM → CA-COM")도 함께 표현한다. [사용자 요청]
 * 필드/함수 이름이 "breakout"이면 분기 개념만 뜻하는 것처럼 보여 혼동이
 * 있었다 — "connection"으로 통일해 분기든 단순 연결이든 포괄하는 이름으로
 * 정리(BOB32/SC32-4DO/DOFILL-LA8/DO3WFILL/DOSUB-LA8 = 분기, DO = 단순 연결).
 * "CA-COM > 2 NL-2 + 1 NL4" 같은 텍스트 표기 대신 입력 박스 → 화살표 →
 * 출력 박스(들)로 도식화하고, 같은 커넥터가 여럿이면(collapseConnOut)
 * "라벨 x 개수" 배지 1개로 압축해 보여준다.
 * @param {{in:string, out:string[], bidirectional?:boolean}} connection
 * @param {boolean} [afterUsedIn] true 면 위에 Used In 섹션이 있다는 뜻 —
 *   여백+구분선을 추가해 두 섹션을 시각적으로 분리한다(사용자 요청).
 * @returns {string} 다이어그램 마크업 (없으면 "")
 */
function connectionDiagramHTML(connection, afterUsedIn) {
  if (!connection || !connection.in || !connection.out || !connection.out.length) return "";
  // [사용자 요청] bidirectional(양방향, 예: CA-COM 19-pole ↔ CA-COM
  // 19-pole 처럼 양끝이 완전히 동일한 케이블)일 때는 오른쪽(out) 박스도
  // 왼쪽(in)과 똑같은 강조 스타일(connection__box--in: 진한 글자색 +
  // 제조사 강조 테두리)을 받는다 — 방향성이 없는 대칭 연결이라 왼쪽만
  // 강조되고 오른쪽이 밋밋해 보이면 어색했다(사용자 확인). 단방향(→)
  // 연결은 기존처럼 out 박스가 기본(연한) 스타일을 유지한다.
  const outBoxClass = connection.bidirectional ? "connection__box connection__box--in" : "connection__box";
  const outBoxes = collapseConnOut(connection.out)
    .map(g => `<span class="${outBoxClass}">${esc(g.label)}${g.count > 1 ? ` <span class="connection__count">x ${g.count}</span>` : ""}</span>`)
    .join("");
  // [사용자 요청] DOE처럼 양끝이 동일한 대칭 케이블(분기가 아닌 양방향
  // 연결)은 in→out 화살표(→) 대신 ↔로 표시해 방향성이 없음을 나타낸다.
  const arrow = connection.bidirectional ? "↔" : "→";
  return `<div class="connection${afterUsedIn ? " connection--after-used-in" : ""}">
    <span class="connection__box connection__box--in">${esc(connection.in)}</span>
    <span class="connection__arrow">${arrow}</span>
    <div class="connection__out">${outBoxes}</div>
  </div>`;
}

/**
 * 액세서리 카드 1장의 HTML 을 생성한다.
 * @param {Object} a 액세서리 레코드
 * @returns {string} .card 마크업
 */
export function cardHTML(a) {
  const M = ACC_MFR[a.mfr], color = M.color;
  // [Front/Rear 호버 전환] views 가 2개 이상이면 speakers/amplifiers 와
  // 동일한 패턴으로 두 장을 함께 렌더링 — 평소엔 Front, 카드에 마우스를
  // 올리면 Rear 로 크로스페이드(card.css 의 --front/--back 규칙).
  const views = getViews(a);
  // [사용자 요청] 흰 배경 다이어그램(DO3WFILL Signal Flow 등)은 이미지 크기는
  // 그대로 두고, 카드 미디어 배경만 흰색으로 바꿔 이미지의 흰 배경과 이어지게
  // 한다 — card__img--whitebg 마커(v.whitebg 플래그가 있는 view에만 적용),
  // 실제 배경 전환은 card.css 의 :has() 규칙이 담당.
  const wbClass = v => (v.whitebg ? " card__img--whitebg" : "") + (v.whitebg2 ? " card__img--whitebg2" : "");
  const media = views.length
    ? (views.length > 1
        ? `<img class="card__img card__img--front${wbClass(views[0])}" loading="lazy" src="${views[0].src}" alt="${esc(a.name)}"><img class="card__img card__img--back${wbClass(views[1])}" loading="lazy" src="${views[1].src}" alt="${esc(a.name)} ${esc(views[1].label)}">`
        : `<img class="card__img${wbClass(views[0])}" loading="lazy" src="${views[0].src}" alt="${esc(a.name)}">`)
    : `<div class="card__noimg">⚙</div>`;
  // [사용자 요청] Type 이 eyebrow(L-ACOUSTICS · Protection 등)에 이미
  // 나와 있어 stat-grid 의 Type 칸은 중복이었다 — 제거하고 Compatible
  // With 1열만 남긴다(값 없으면 "—"). Lengths 는 이름 옆 태그
  // (lengthNameTagsHTML)로 이미 표시되므로 stat-grid 에 다시 넣지 않는다.
  const typeLabel = cardTypeLabel(a.type);
  // [사용자 요청] 카드 강조 값(Compatible With)을 전역 accent(앰버) 대신
  // 제조사 색(--mfr, 카드 article 에 인라인 주입됨)으로 — speakers 탭의
  // Amp/Self-Powered 색상 변경과 동일한 원칙을 모든 도메인에 적용.
  const statsHTML = `<div class="stat-grid stat-grid--acc-1col">
          <div class="stat-grid__cell"><span class="stat-grid__key">Compatible</span><span class="stat-grid__value stat-grid__value--mfr">${esc(a.compatibleWith || "—")}</span></div>
        </div>`;
  // [사용자 요청] notes(카드 첫 줄, "Breakout box: SC32 to..." 등)는
  // breakout 다이어그램/이름과 내용이 겹쳐 카드가 지저분해 보였다 —
  // card__config 줄 자체를 제거(모달 상세에서는 Notes 행으로 계속 확인 가능).
  // [사용자 요청] 길이 칩(25m/10m/5m/0.7m 등)을 이름 아래 별도 줄(전체 폭)
  // 대신 이름 줄 오른쪽 끝에 나란히 배치 — speakers.view.js 의
  // card__name-row(이름+태그) 패턴 재사용.
  return `<article class="card" style="--mfr:${color}" tabindex="0" data-id="${a.id}" role="button" aria-label="${esc(a.name)} 상세">
    <div class="card__media">${media}</div>
    <div class="card__body">
      <div class="eyebrow"><span class="eyebrow__brand">${esc(M.short)}</span> · ${esc(typeLabel || "")}</div>
      <div class="card__name-row">
        <div class="card__name">${esc(a.name)}</div>
        ${lengthNameTagsHTML(a.lengths)}
      </div>
      ${a.connection ? connectionDiagramHTML(a.connection) : ""}
      <div class="card__stats">${statsHTML}</div>
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
 * 이 액세서리를 System Elements 로 쓰는 앰프/스피커 목록을 클릭 가능한
 * 칩으로 렌더링한다 — amplifiers.view.js systemElementsHTML(앰프→액세서리
 * 방향), speakers.view.js systemElementsHTML(스피커→액세서리 방향)의
 * 역방향. [사용자 요청] Matched Speakers/Amplifier Matching 처럼 액세서리
 * 모달에서도 "이 부속품을 어떤 랙 앰프/스피커가 쓰는지" 보여준다 — 실제
 * 조회(cross-ref.findAmplifiersUsingAccessory/findSpeakersUsingAccessory)는
 * controller 가 미리 수행해 {id, name} 배열로 넘겨준다(view.js 는
 * cross-ref 를 직접 참조하지 않는 순수 함수 원칙 유지). 앰프 칩은
 * data-amp-id, 스피커 칩은 data-speaker-id 로 구분해 각 controller 가
 * 이미 쓰는 클릭 배선 셀렉터를 그대로 재사용한다.
 * @param {{id:string, name:string}[]} amps
 * @param {{id:string, name:string}[]} speakers
 * @returns {string} 섹션 마크업 (없으면 "")
 */
/**
 * @param {{id:string, name:string}[]} amps 이 액세서리를 쓰는 앰프
 * @param {{id:string, name:string}[]} speakers 이 액세서리를 쓰는 스피커
 * @param {{id:string, name:string, type:string}[]} [related] 이 액세서리와
 *   짝을 이루는 다른 액세서리(예: K-BUMPFLIGHT ↔ K1-BUMP) — 별도 섹션이
 *   아니라 이 Used In 블록 안의 "Accessories" 그룹으로 합쳐서 보여준다
 *   (사용자 요청, controller 가 cross-ref.findRelatedAccessories() 로
 *   미리 조회해 전달).
 * @returns {string} 섹션 마크업 (없으면 "")
 */
function usedInHTML(amps, speakers, related) {
  const hasAmps = amps && amps.length;
  const hasSpeakers = speakers && speakers.length;
  const hasRelated = related && related.length;
  if (!hasAmps && !hasSpeakers && !hasRelated) return "";
  // [사용자 요청] 앰프/스피커/관련 액세서리가 한 줄에 섞여 있으면 어느
  // 쪽인지 구분이 안 됐다 — amplifiers/speakers.view.js 의 System
  // Elements 섹션과 동일한 system-elements__group(소그룹 라벨 +
  // chip-group) 패턴으로 그룹을 나눠 보여준다.
  const ampGroup = hasAmps
    ? `<div class="system-elements__group">
        <div class="system-elements__group-label">Amplifiers</div>
        <div class="chip-group">${amps.map(a => `<button type="button" class="chip" data-amp-id="${esc(a.id)}">${esc(a.name)}</button>`).join("")}</div>
      </div>` : "";
  const speakerGroup = hasSpeakers
    ? `<div class="system-elements__group">
        <div class="system-elements__group-label">Speakers</div>
        <div class="chip-group">${speakers.map(s => `<button type="button" class="chip" data-speaker-id="${esc(s.id)}">${esc(s.name)}</button>`).join("")}</div>
      </div>` : "";
  const relatedGroup = hasRelated
    ? `<div class="system-elements__group">
        <div class="system-elements__group-label">Accessories</div>
        <div class="chip-group">${related.map(r => `<button type="button" class="chip" data-accessory-id="${esc(r.id)}">${esc(r.name)}</button>`).join("")}</div>
      </div>` : "";
  return `<p class="section-label">Used In</p>${ampGroup}${speakerGroup}${relatedGroup}`;
}

/**
 * 액세서리 상세 모달의 head/body 마크업을 생성한다.
 * @param {Object} a 액세서리 레코드
 * @param {{id:string, name:string}[]} [usedByAmps] 이 액세서리를 쓰는 앰프
 *   목록. controller 가 cross-ref.findAmplifiersUsingAccessory() 로 미리
 *   조회해 전달한다.
 * @param {{id:string, name:string}[]} [usedBySpeakers] 이 액세서리를 쓰는
 *   스피커 목록. controller 가 cross-ref.findSpeakersUsingAccessory() 로
 *   미리 조회해 전달한다.
 * @param {{id:string, name:string, type:string}[]} [related] 이 액세서리와
 *   짝을 이루는 다른 액세서리 목록(예: K-BUMPFLIGHT ↔ K1-BUMP). controller
 *   가 cross-ref.findRelatedAccessories() 로 미리 조회해 전달한다.
 * @returns {{color: string, head: string, body: string}}
 */
export function modalBodyHTML(a, usedByAmps, usedBySpeakers, related) {
  const M = ACC_MFR[a.mfr], color = M.color;
  const head = `<div class="modal__head">
      <div class="eyebrow"><span class="eyebrow__brand" style="color:${color}">${esc(M.name)}</span> · ${esc(a.type || "")}</div>
      <div class="modal__title">${esc(a.name)}</div>
      <button class="modal__close" data-modal-close aria-label="닫기"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    </div>`;
  // 뷰가 2개 이상(Front/Rear 등)인 액세서리만 전환 버튼을 노출한다 —
  // speakers/amplifiers modalBodyHTML 의 동일 로직 재사용(getViews, 버튼
  // 클릭 연결은 js/ui/modal.js 의 wireViewSwitch 가 도메인 무관하게 처리).
  const views = getViews(a);
  const viewSlug = label => label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  // [사용자 요청] K1-BUMP 처럼 사진 자체가 없는 액세서리는 예전엔 media
  // 영역이 통째로 생략돼(카드에서는 card__noimg ⚙ 아이콘 폴백이 있는데
  // 모달만 없었음) 단일 모달·Split View 양쪽에서 사진 자리 없이 헤더
  // 바로 아래 System Elements 가 붙어 카드와 느낌이 달랐다 — 모달에도
  // 동일한 톤의 자리표시 아이콘(modal__media--noimg)을 넣어 사진 유무와
  // 무관하게 항상 같은 레이아웃(헤더 → 미디어 → 본문)을 유지한다.
  const modalWbClass = v => (v.whitebg ? " modal__img--whitebg" : "") + (v.whitebg2 ? " modal__img--whitebg2" : "");
  const media = views.length
    ? (views.length > 1
        ? `<div class="modal__media-wrap">
            <div class="modal__media">
              ${views.map((v, i) => `<img class="modal__img${modalWbClass(v)}" data-view="${viewSlug(v.label)}" src="${v.src}" alt="${esc(a.name)} ${esc(v.label)}" loading="lazy" decoding="async"${i === 0 ? "" : " hidden"}>`).join("")}
            </div>
            <div class="modal__view-switch" role="group" aria-label="이미지 보기 선택">
              ${views.map((v, i) => `<button type="button" class="modal__view-btn${i === 0 ? " is-active" : ""}" data-view-switch="${viewSlug(v.label)}">${esc(v.label)}</button>`).join("")}
            </div>
          </div>`
        : `<div class="modal__media"><img class="${modalWbClass(views[0]).trim()}" src="${views[0].src}" alt="${esc(a.name)}"></div>`)
    : `<div class="modal__media-wrap"><div class="modal__media modal__media--noimg">⚙</div></div>`;
  // [사용자 요청 — 재정정] 길이가 1개(단일)뿐인 케이블도 "Available
  // Lengths" 행을 그대로 만든다 — 예전엔 길이가 2개 이상일 때만 행을
  // 만들고 단일 길이는 생략했는데, 단일 길이 케이블도 모달에서 그 길이
  // 값을 바로 확인할 수 있어야 한다는 요청으로 조건을 없앤다(a.lengths
  // 가 존재하기만 하면 항상 표시).
  // [사용자 요청 — 모달 폭 확대(628px) 후 재검증] 예전엔 전체 폭(--full)
  // 으로 혼자 한 줄을 차지했는데, Type 처럼 앞의 절반 폭 셀이 홀로 남아
  // 나머지 절반이 빈칸으로 보이는 경우가 생겼다 — 절반 폭 일반 셀로
  // 바꿔 Type 옆에 나란히 배치되게 한다(specSectionHTML/spec-table 의
  // 고아 승격 로직과 동일하게, 짝이 없으면 자동으로 --full 로 승격되는
  // 다른 섹션과 달리 이 표는 정적 마크업이라 항상 Type 다음에 위치).
  const lengthsRow = a.lengths && a.lengths.length
    ? `<div class="spec-table__cell"><div class="spec-table__key">Available Lengths</div><div class="spec-table__value">${lengthChipsHTML(a.lengths)}</div></div>`
    : "";
  // connection(커넥터 연결/변환) 다이어그램 — spec-table(General) 바로
  // 아래에 둔다(구조를 먼저, 설명은 그다음이라는 기존 감각 유지).
  // [사용자 요청 — 순서 변경] Used In 이 없는 항목(예: K1-BUMP, 이 부속품을
  // 참조하는 스피커/앰프/다른 액세서리가 아직 없는 경우)은 예전엔 General
  // 이 맨 위로 붙어, Used In 이 있는 다른 모달과 General 의 세로 위치가
  // 서로 달라 보였다 — General(+연결 다이어그램)을 항상 먼저 고정 배치하고
  // Used In 을 그 아래로 옮겨, Used In 유무와 무관하게 General 위치가
  // 항상 일정하게 한다.
  const connectionHTML = a.connection ? connectionDiagramHTML(a.connection, false) : "";
  const body = `${media}
    <div class="modal__body" id="modal-body-main">
      <p class="section-label">General</p>
      <div class="spec-table">
        ${specRow("Type", a.type)}
        ${specRow("Price", a.price)}
        ${specRow("Weight", a.weight)}
        ${specRow("Material", a.material)}
        ${specRow("Compatible With", a.compatibleWith)}
        ${lengthsRow}
        ${specRow("Notes", a.notes, true)}
      </div>
      ${connectionHTML}
      ${usedInHTML(usedByAmps, usedBySpeakers, related)}
    </div>`;
  return { color, head, body };
}
