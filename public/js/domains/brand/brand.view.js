/**
 * @module domains/brand/view
 * 브랜드 페이지 마크업 생성 (순수 함수 모음).
 * 브랜드는 카드/모달이 아닌, 브랜드당 하나의 와이드 섹션(연혁 타임라인 +
 * 개요)으로 렌더링되는 콘텐츠형 도메인이다.
 *
 * 관련 CSS: css/components/brand.css (.brand-page, .timeline)
 */
import { esc } from "../../core/dom.js";
import { BRAND_MFR } from "./brand.schema.js";

/**
 * [사용자 요청] "무조건 줄바꿈"이 아니라, 텍스트가 길어 브라우저가 어차피
 * 줄바꿈을 해야 할 때 그 지점이 단어 중간이 아니라 의미 단위(콤마로
 * 나열된 사건, em dash 앞뒤)에서 끊기도록 유도한다.
 * [버그 수정] 처음엔 <wbr>(줄바꿈 가능 지점 힌트)을 각 콤마 뒤에 넣었는데,
 * <wbr> 은 "가능한 한 폭을 최대로 채우고 가장 뒤에 있는 후보에서 끊는"
 * 표준 동작이라 — 예를 들어 "..., Panflex 기술 공개, 직원 200명 돌파,
 * 영국 지사 개설" 에서 원했던 지점(Panflex 조각 뒤)이 아니라 폭이 허락하는
 * 한 더 뒤(직원 200명 돌파, 뒤)에서 끊겨버렸다. 원하는 동작은 "각 조각
 * (콤마로 나뉜 사건 하나하나)을 쪼갤 수 없는 하나의 단위로 보고, 그 조각
 * 전체가 남은 폭에 안 들어가면 조각째로 통째로 다음 줄로 넘기는" 것이다.
 * [버그 수정, 2차] 콤마 조각을 white-space:nowrap 으로 감쌌더니 브랜드
 * 비교 모드(컬럼 폭이 좁음)에서 조각 하나가 컬럼 폭보다 길면 nowrap 이
 * 내부 줄바꿈까지 막아 조각째로 옆 컬럼을 침범했다 — CSS 쪽에서
 * display:inline-block + max-width:100% 로 바꿔 "조각 경계는 지키되
 * 조각 내부는 자연스럽게 wrap 되도록" 해결했다(css/components/brand.css
 * .brand-event-part 참고).
 * [사용자 요청] 괄호로 묶인 부분(예: "(2월 13일)")은 그 앞 단어와는 줄이
 * 갈라져도 되지만, 괄호 안 내용 자체는 쪼개지면 안 된다 — 콤마 조각과
 * 별개로, 괄호 부분만 한 번 더 별도의 최소 단위(nowrap 지원 컴포넌트)로
 * 감싼다.
 * @param {string} event 원본 이벤트 텍스트
 * @returns {string} 조각·괄호 단위로 감싼 HTML(esc() 적용됨)
 */
function eventHTML(event) {
  if (!event) return "";
  const raw = event.replace(/\s*—\s*/g, ", ");
  const parts = raw.split(/,\s*/).map(s => s.trim()).filter(Boolean);
  return parts
    .map((p, i) => {
      // 콤마 조각 안의 괄호 부분(예: "(2월 13일)")을 별도의 쪼개지지 않는
      // 최소 단위로 감싼다 — 괄호 앞 단어와는 줄이 갈라져도 되지만, 괄호
      // 안 내용 자체는 중간에서 끊기면 안 되기 때문.
      const withParens = esc(p).replace(
        /\([^()]*\)/g,
        m => `<span class="brand-event-parens">${m}</span>`
      );
      const text = withParens + (i < parts.length - 1 ? "," : "");
      return `<span class="brand-event-part">${text}</span>`;
    })
    .join(" ");
}

/**
 * 연혁 타임라인 HTML.
 * [사용자 요청] 비교 모드처럼 일반 브랜드 페이지의 연혁도 과거순/최신순을
 * 선택해서 볼 수 있어야 한다 — descending 이 true 면 최신 연도가 먼저
 * (배열 순서상 위) 오도록 정렬만 뒤집는다. 세로선/원 좌표 계산(CSS, JS
 * sizeTimelineLines)은 "배열의 첫 항목 ~ 마지막 항목"을 기준으로 실측하는
 * 방식이라, 정렬 순서가 바뀌어도 그대로 재사용된다.
 * @param {Array<{year: number, event: string}>} timeline
 * @param {boolean} [descending=false] true 면 최신순(내림차순) 정렬
 * @returns {string}
 */
function timelineHTML(timeline, descending = false) {
  if (!timeline || !timeline.length) return '<span class="hint-text">등록된 연혁이 없습니다.</span>';
  const sorted = [...timeline].sort((a, b) => descending ? b.year - a.year : a.year - b.year);
  // [버그 수정] 원(::before)이 "이 항목의 연도 줄(.timeline__year) 세로
  // 중앙"에 오도록, 원을 .timeline__year 자신에 붙인다(항목 전체 top
  // 기준 고정 오프셋 대신, 연도 줄 요소를 기준으로 top:50%/translateY로
  // 배치 — 폰트·줄간격이 바뀌어도 항상 그 줄의 정중앙에 맞게).
  return `<div class="timeline">${sorted.map(t => `
    <div class="timeline__item">
      <div class="timeline__year timeline__year--dot">${esc(t.year)}</div>
      <div class="timeline__event">${eventHTML(t.event)}</div>
    </div>`).join("")}</div>`;
}

/**
 * 브랜드 1개의 전체 페이지 섹션 HTML 을 생성한다.
 * brand.controller.js 가 필터링된 브랜드마다 하나씩 이어붙인다.
 * @param {Object} b 브랜드 레코드
 * @param {boolean} [descending=false] true 면 연혁을 최신순(내림차순)으로 표시
 * @returns {string} .brand-page 마크업
 */
export function pageHTML(b, descending = false) {
  const M = BRAND_MFR[b.mfr], color = M.color;
  const notableList = (b.notable || []).map(n => `<div class="brand-page__notable-item">${esc(n)}</div>`).join("");

  const logoHTML = b.logo
    ? `<img class="brand-page__logo" src="${esc(b.logo)}" alt="${esc(b.name)} logo">`
    : "";

  return `<section class="brand-page" style="--mfr:${color}" data-id="${b.id}">
    <div class="brand-page__head">
      <div class="brand-page__title">
        <div class="brand-page__eyebrow"><span class="brand-page__dot"></span>${esc(b.country || "")} · ${esc(b.founded)}</div>
        <h2 class="brand-page__name">${esc(b.name)}</h2>
        <div class="brand-page__meta">
          <span>본사 <b>${esc(b.hq || "—")}</b></span>
          <span>창업자 <b>${esc(b.founder || "—")}</b></span>
        </div>
      </div>
      ${logoHTML}
    </div>
    <div class="brand-page__body">
      <div>
        <div class="brand-page__history-head">
          <p class="section-label">History</p>
          <button class="brand-page__sort-btn" type="button" id="brand-history-sort-btn">${descending ? "최근 → 과거" : "과거 → 최근"}</button>
        </div>
        ${timelineHTML(b.timeline, descending)}
      </div>
      <div>
        <p class="section-label">Overview</p>
        <div class="brand-page__notes">${esc(b.notes || "")}</div>
        <div class="brand-page__notable">${notableList}</div>
      </div>
    </div>
  </section>`;
}

/**
 * [비교 모드] 선택된 브랜드(최대 3개)의 연혁을, 하나의 공통 연도 축 위에
 * 실제 연도 비율로 배치해 나란히 비교하는 다이어그램.
 * 세로축 = 연도이며, 창립연도(founded)를 포함한 모든 timeline 이벤트의
 * 최소/최대 연도로 축 범위를 잡는다 — 그래야 "어느 브랜드가 먼저
 * 설립됐는지"가 원의 세로 위치만으로 바로 비교된다.
 * [사용자 요청] 기본은 위=과거/아래=최근이지만, 반대로 위=최근/아래=과거로
 * 보고 싶을 때도 있다 — descending 이 true 면 축 방향만 뒤집는다(눈금·연도
 * 값 자체는 그대로, top% 계산만 100에서 뺀 값으로 반전).
 * @param {Array<Object>} brands 선택된 브랜드 레코드 배열(0~3개)
 * @param {boolean} [descending=false] true 면 위=최근, 아래=과거로 축 반전
 * @returns {string}
 */
export function compareHTML(brands, descending = false) {
  if (!brands || !brands.length) {
    return `<div class="brand-compare__empty hint-text">비교할 브랜드를 최대 3개까지 선택하세요.</div>`;
  }

  const years = [];
  brands.forEach(b => {
    if (Number.isFinite(b.founded)) years.push(b.founded);
    (b.timeline || []).forEach(t => { if (Number.isFinite(t.year)) years.push(t.year); });
  });
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  // [사용자 요청] "무조건 10년 단위(예: 1970)로 축을 내림하면 실제
  // 최솟값(1979)과 차이만큼 위쪽이 텅 비어 보인다" — 기본 눈금은
  // 10년 단위(1980/1990/2000...)를 그대로 쓰되, 축의 "시작"(위쪽) 끝점은
  // 딱 떨어지는 10년 단위가 아니라 데이터 실제 최솟/최댓값 기준으로 1년치
  // 여백을 두고, "끝"(아래쪽)만 10년 단위로 반올림한다 — 그래야 시작점이
  // 브랜드명 바로 아래에 답답하게 붙지 않는다.
  // [사용자 요청, descending] 축을 뒤집으면(위=최근/아래=과거) "시작"이
  // 최근 쪽이 되므로, 여백을 두는 쪽과 10년 단위로 반올림하는 쪽도 함께
  // 뒤바뀌어야 한다 — 즉 위쪽(시작)엔 항상 실제 데이터값+1년 여백을,
  // 아래쪽(끝)엔 항상 10년 단위 반올림을 적용한다(방향과 무관하게
  // "시작=여백, 끝=10년 단위"라는 규칙 자체는 대칭적으로 유지).
  const axisMin = descending ? Math.floor(minYear / 10) * 10 : minYear - 1;
  const axisMax = descending ? maxYear + 1 : Math.ceil(maxYear / 10) * 10;
  const axisSpan = Math.max(axisMax - axisMin, 1);
  // 정방향 위치(0%=axisMin, 100%=axisMax)를 descending 이면 100에서 빼
  // 위/아래를 뒤집는다 — 오름차순: 위=axisMin(과거), 내림차순: 위=axisMax
  // (최근, 실제 데이터 최댓값+1년 여백 쪽)가 되도록.
  const yearToPct = year => {
    const pct = ((year - axisMin) / axisSpan) * 100;
    return descending ? 100 - pct : pct;
  };

  const ticks = [];
  if (descending) {
    // 위(시작)=실제 최댓값(10년 단위가 아니면 별도 눈금으로 추가),
    // 아래(끝)=10년 단위로 내림한 값까지.
    const lastDecadeTick = Math.floor(maxYear / 10) * 10;
    if (lastDecadeTick !== maxYear) ticks.push(maxYear);
    for (let y = lastDecadeTick; y >= axisMin; y -= 10) ticks.push(y);
  } else {
    const firstDecadeTick = Math.ceil(minYear / 10) * 10;
    if (firstDecadeTick !== minYear) ticks.push(minYear); // 실제 최솟값 눈금(10년 단위가 아닐 때만)
    for (let y = firstDecadeTick; y <= axisMax; y += 10) ticks.push(y);
  }

  const columnsHTML = brands.map(b => {
    const M = BRAND_MFR[b.mfr], color = M.color;
    // [버그 수정] timeline에 창립연도와 같은 해의 이벤트가 이미 있으면
    // "OO 설립" 포인트를 별도로 더 만들지 않는다 — 안 그러면 같은 top%에
    // 점 두 개가 겹쳐 라벨 텍스트가 뒤섞여 보였다(예: L-Acoustics 1984).
    const hasFoundingYearEvent = (b.timeline || []).some(t => t.year === b.founded);
    const points = [
      ...(hasFoundingYearEvent ? [] : [{ year: b.founded, event: `${b.name} 설립`, isFounding: true }]),
      ...(b.timeline || []),
    ].sort((a, c) => a.year - c.year);

    const pointsHTML = points.map(t => `
      <div class="brand-compare__point${t.isFounding ? " brand-compare__point--founding" : ""}" style="top:${yearToPct(t.year).toFixed(2)}%">
        <span class="brand-compare__dot"></span>
        <span class="brand-compare__label"><b>${esc(t.year)}</b><span class="brand-compare__label-text">${eventHTML(t.event)}</span></span>
      </div>`).join("");

    return `<div class="brand-compare__col" style="--mfr:${color}">
      <div class="brand-compare__col-head">${esc(b.name)}</div>
      <div class="brand-compare__track">${pointsHTML}</div>
    </div>`;
  }).join("");

  // [구조, 전면 재설계] 가로선(연도 숫자 + 점선)을 "하나의 요소"로 그린다
  // — .brand-compare__rule 하나가 data-year 로 왼쪽 연도 숫자(::before)를,
  // border-top 으로 오른쪽 점선을 동시에 표현하므로 같은 top% 를 쓰는 한
  // 숫자와 선이 절대 어긋나지 않는다(레이어 분리로 인한 단차 원인 제거).
  const rulesHTML = ticks.map(y => `
    <div class="brand-compare__rule" data-year="${esc(y)}" style="top:${yearToPct(y).toFixed(2)}%"></div>`).join("");

  return `<div class="brand-compare">
    <div class="brand-compare__rules">${rulesHTML}</div>
    <div class="brand-compare__cols">${columnsHTML}</div>
  </div>`;
}
