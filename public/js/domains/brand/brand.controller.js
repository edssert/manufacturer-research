/**
 * @module domains/brand/controller
 * Brand 탭 컨트롤러 — 카드/모달 없이, 한 번에 브랜드 하나의 전체 페이지
 * 섹션만 보여준다. [사용자 요청] 브랜드를 전부 세로로 나열하던 이전 방식
 * 대신, 상단의 텍스트+언더라인 셀렉터(박스 없음)로 브랜드를 전환하는
 * 방식으로 변경 — 브랜드가 3개뿐이라 검색/정렬 컨트롤은 실익이 적어 제거.
 *
 * 구성 요소:
 *   brand.data.js   — 데이터
 *   brand.schema.js — 표시 순서/제조사 맵 정의
 *   brand.view.js   — 페이지 섹션 마크업 (순수 함수)
 */
import { $, esc } from "../../core/dom.js";
import { registerDomain } from "../../core/router.js";
import { refreshNavCounts } from "../../ui/nav.js";
import { renderLegend } from "../../ui/legend.js";

import { BRANDS } from "./brand.data.js";
import { BRAND_MFR, BRAND_MK_ORDER } from "./brand.schema.js";
import { pageHTML as brandPageHTML, compareHTML } from "./brand.view.js";

let activeMk = null;
let compareMode = false;
/** 비교 모드에서 선택된 브랜드 mfr 코드 목록(최대 3개) */
let compareMks = [];
/** [사용자 요청] 비교 다이어그램 연도 축 방향 — false: 위=과거/아래=최근(기본), true: 위=최근/아래=과거 */
let compareDescending = false;
/** [사용자 요청] 일반 브랜드 페이지(비교 모드 아님)의 연혁 타임라인 정렬 방향 — false: 과거→최근(기본), true: 최근→과거 */
let historyDescending = false;

/** 탭 활성화: 최초 1회 UI 빌드 후 렌더 */
function mountBrand() {
  renderLegend(BRANDS, BRAND_MK_ORDER, BRAND_MFR, d => d.mfr);
  const wrap = $("#view-brand");
  wrap.hidden = false;
  if (!wrap.dataset.built) {
    wrap.dataset.built = "1";
    if (!activeMk) activeMk = BRANDS[0]?.mfr || null;
    buildBrandUI(wrap);
  }
  renderBrand();
}

/** 탭 비활성화: 뷰 숨김 */
function unmountBrand() { $("#view-brand").hidden = true; }

/**
 * 브랜드 전환 셀렉터(텍스트+언더라인) + 결과 영역 골격을 1회 빌드한다.
 * @param {HTMLElement} wrap #view-brand 컨테이너
 */
function buildBrandUI(wrap) {
  const tabsHTML = BRAND_MK_ORDER
    .filter(mk => BRANDS.some(b => b.mfr === mk))
    .map(mk => `<button class="brand-switch__tab" type="button" data-mk="${mk}" style="--mfr:${BRAND_MFR[mk].color}">${esc(BRAND_MFR[mk].name)}</button>`)
    .join("");

  wrap.innerHTML = `
    <div class="content-wrap">
      <div class="brand-switch" id="brand-switch">
        ${tabsHTML}
        <div class="brand-switch__actions">
          <button class="brand-switch__sort-btn" type="button" id="brand-compare-sort-btn" hidden></button>
          <button class="brand-switch__compare-btn" type="button" id="brand-compare-btn">브랜드 비교</button>
        </div>
      </div>
      <div class="brand-compare-picker" id="brand-compare-picker" hidden></div>
      <div id="brand-results"></div>
    </div>`;

  wrap.querySelectorAll(".brand-switch__tab").forEach(tab => {
    tab.addEventListener("click", () => {
      // [사용자 요청] 비교 모드를 나갈 땐(탭 클릭으로 벗어나는 경우 포함)
      // 선택 상태를 초기화한다 — 다음에 비교 모드로 다시 들어오면 항상
      // 아무것도 체크 안 된 기본 상태에서 시작해야 한다.
      if (compareMode) compareMks = [];
      compareMode = false;
      activeMk = tab.dataset.mk;
      renderBrand();
    });
  });

  $("#brand-compare-btn").addEventListener("click", () => {
    compareMode = !compareMode;
    if (!compareMode) {
      // [사용자 요청] 비교 모드를 끄면 선택된 브랜드 체크 상태를 초기화한다
      // — 다시 켰을 때 항상 빈 상태(아무 체크 없음)로 시작해야 한다.
      compareMks = [];
    }
    renderBrand();
  });

  // [사용자 요청] 비교 다이어그램의 연도 축 방향(과거→현재 / 현재→과거)을
  // 전환하는 토글. 비교 모드일 때만 의미가 있으므로 브랜드 비교 버튼 옆에
  // 두되, 비교 모드가 아닐 때는 숨긴다(renderBrand 에서 hidden 갱신).
  $("#brand-compare-sort-btn").addEventListener("click", () => {
    compareDescending = !compareDescending;
    renderBrand();
  });
}

/** 비교 모드용 브랜드 선택 체크박스 목록을 그린다(최대 3개 제한). */
function renderComparePicker() {
  const picker = $("#brand-compare-picker");
  picker.hidden = !compareMode;
  if (!compareMode) {
    // [버그 수정] hidden 만으로 감춰도 이전에 그려진 체크박스 마크업이
    // DOM 에 그대로 남아있었다(CSS 명시도 문제로 실제로 화면에 계속
    // 보이기까지 했다 — brand.css picker[hidden] 규칙으로 별도 수정).
    // 비교 모드를 나갈 땐 내용 자체도 비워 다음 진입 시 항상 깨끗하게
    // 다시 그려지도록 한다.
    picker.innerHTML = "";
    return;
  }

  picker.innerHTML = BRAND_MK_ORDER
    .filter(mk => BRANDS.some(b => b.mfr === mk))
    .map(mk => {
      const checked = compareMks.includes(mk);
      const disabled = !checked && compareMks.length >= 3;
      return `<label class="brand-compare-picker__item${disabled ? " brand-compare-picker__item--disabled" : ""}" style="--mfr:${BRAND_MFR[mk].color}">
        <input type="checkbox" data-mk="${mk}" ${checked ? "checked" : ""} ${disabled ? "disabled" : ""}>
        <span>${esc(BRAND_MFR[mk].name)}</span>
      </label>`;
    })
    .join("");

  picker.querySelectorAll("input[type=checkbox]").forEach(cb => {
    cb.addEventListener("change", () => {
      const mk = cb.dataset.mk;
      if (cb.checked) {
        if (compareMks.length >= 3) { cb.checked = false; return; }
        compareMks.push(mk);
      } else {
        compareMks = compareMks.filter(m => m !== mk);
      }
      renderBrand();
    });
  });
}

/** 현재 선택된 브랜드 하나, 또는 비교 모드면 선택된 여러 브랜드를 렌더링 */
function renderBrand() {
  const resultsEl = $("#brand-results");
  const compareBtn = $("#brand-compare-btn");
  const sortBtn = $("#brand-compare-sort-btn");
  compareBtn.classList.toggle("brand-switch__compare-btn--active", compareMode);
  document.querySelectorAll("#brand-switch .brand-switch__tab").forEach(tab => {
    tab.classList.toggle("brand-switch__tab--active", !compareMode && tab.dataset.mk === activeMk);
  });

  renderComparePicker();

  // [사용자 요청] 정렬 방향 토글은 비교 모드에서만 의미가 있다.
  sortBtn.hidden = !compareMode;
  sortBtn.textContent = compareDescending ? "최근 → 과거" : "과거 → 최근";

  if (compareMode) {
    const selected = compareMks.map(mk => BRANDS.find(x => x.mfr === mk)).filter(Boolean);
    $("#count").innerHTML = `<b>${selected.length}</b> / ${BRANDS.length} brands (비교)`;
    resultsEl.innerHTML = compareHTML(selected, compareDescending);
    refreshNavCounts();
    sizeCompareTrack(resultsEl, selected, compareDescending);
    return;
  }

  const b = BRANDS.find(x => x.mfr === activeMk) || BRANDS[0];
  $("#count").innerHTML = b ? `<b>1</b> / ${BRANDS.length} brands` : `<b>0</b> / ${BRANDS.length} brands`;
  resultsEl.innerHTML = b ? brandPageHTML(b, historyDescending) : "";
  refreshNavCounts();
  // [사용자 요청] 비교 모드처럼 일반 브랜드 페이지의 연혁도 정렬 방향을
  // 토글할 수 있어야 한다. resultsEl.innerHTML 을 매번 새로 그리므로
  // 버튼도 매번 새로 생기고, 이벤트도 매번 다시 붙여야 한다.
  const historySortBtn = $("#brand-history-sort-btn");
  if (historySortBtn) {
    historySortBtn.addEventListener("click", () => {
      historyDescending = !historyDescending;
      renderBrand();
    });
  }
  sizeTimelineLines(resultsEl);
}

/**
 * [사용자 요청] 연혁 타임라인 세로선이 마지막 원 아래로 삐져나오지 않고
 * 정확히 "첫 원 중심 ~ 마지막 원 중심"까지만 이어지도록, 실제 렌더된 원
 * 위치를 측정해 .timeline::before 의 높이를 인라인 스타일(--line-h)로
 * 지정한다. 각 항목의 텍스트 줄바꿈에 따라 원 사이 간격이 달라 순수 CSS
 * (고정 bottom 값)로는 마지막 원에서 정확히 끊을 수 없었다 — 그렇다고
 * 사각형으로 덮어 가리면 텍스트와 겹치는 문제가 있어(실제로 겪음), 대신
 * 선 자체의 길이를 원 위치 기준으로 정확히 계산한다.
 * [버그 수정] 원은 .timeline__year(연도 줄) 세로 정중앙에 붙어 있으므로,
 * 항목(item) 자체의 top 에 고정 오프셋(9px)을 더하는 대신 .timeline__year
 * 요소의 실제 렌더 높이를 실측해 그 중앙을 원 위치로 계산해야
 * 폰트/줄간격이 달라도 세로선(::before)과 원이 항상 일치한다.
 * [사용자 요청] 원-원 간격이 설명 줄 수와 무관하게 항상 "1줄 설명 기준
 * 간격"으로 동일해야 한다 — 이를 위해 먼저 모든 항목의 min-height 를
 * 초기화(0)한 상태에서 "실제 필요 높이가 가장 작은 항목"(대개 1줄)의
 * 높이를 기준값으로 잡아 --item-min-h 로 전체에 적용한 다음, 그 상태
 * (레이아웃이 바뀐 이후)에서 다시 원 위치를 실측해 세로선 길이를 구한다
 * — min-height 적용 전/후로 원의 실제 화면 위치가 달라지므로 반드시
 * "적용 후" 값을 써야 세로선이 원과 정확히 맞는다.
 * @param {HTMLElement} root 타임라인이 포함된 컨테이너
 */
function sizeTimelineLines(root) {
  root.querySelectorAll(".timeline").forEach(timeline => {
    const items = timeline.querySelectorAll(".timeline__item");
    // 1) min-height 를 0으로 리셋한 자연 상태에서 각 항목의 실제 필요
    //    높이(콘텐츠 높이, 여백 없음)를 측정하고, 그중 최솟값(대개 설명
    //    1줄인 항목)을 기준으로 삼는다. 여기에 기존 padding-bottom(26px)
    //    이 만들던 "항목 사이 여백"을 그대로 더한다 — 사용자가 "지금
    //    1줄짜리가 가진 간격"을 기준으로 통일해 달라고 했으므로, 콘텐츠
    //    높이만으로 min-height 를 잡으면 그 여백이 사라져 오히려 더
    //    좁아진다.
    const itemGap = 26; // 기존 .timeline__item padding-bottom 값과 동일
    timeline.style.setProperty("--item-min-h", "0px");
    let baseContentH = 0;
    items.forEach((item, i) => {
      if (i === items.length - 1) return; // 마지막 항목은 아래 간격이 없어 기준에서 제외
      const h = item.getBoundingClientRect().height;
      if (baseContentH === 0 || h < baseContentH) baseContentH = h;
    });
    if (baseContentH > 0) timeline.style.setProperty("--item-min-h", `${baseContentH + itemGap}px`);

    const yearEls = timeline.querySelectorAll(".timeline__year--dot");
    if (yearEls.length < 2) {
      timeline.style.setProperty("--line-h", "0px");
      timeline.style.setProperty("--line-top", "0px");
      return;
    }
    // 2) --item-min-h 적용으로 레이아웃이 바뀐 뒤의 실제 위치를 다시
    //    실측해야 세로선이 원과 정확히 맞는다.
    const timelineTop = timeline.getBoundingClientRect().top;
    const centerOf = el => {
      const r = el.getBoundingClientRect();
      return r.top - timelineTop + r.height / 2;
    };
    const firstCenter = centerOf(yearEls[0]);
    const lastCenter = centerOf(yearEls[yearEls.length - 1]);
    timeline.style.setProperty("--line-top", `${firstCenter}px`);
    timeline.style.setProperty("--line-h", `${lastCenter - firstCenter}px`);
  });
}

/**
 * [비교 모드] 연도 축 트랙(.brand-compare__track, .brand-compare__rules)의
 * 높이를, "실제 렌더된 라벨 줄바꿈 높이"까지 반영해 자동으로 계산한다.
 * 고정 px/10년 값을 쓰면 라벨이 짧은 구간은 쓸데없이 넓고, 긴 구간은
 * 여전히 겹칠 수 있다 — 대신 다음 2단계로 "필요한 최소 연도당 px"를
 * 직접 구한다:
 *   1) 트랙을 충분히 큰 임시 높이로 한 번 렌더해 각 라벨의 실제 높이
 *      (줄바꿈 포함)를 getBoundingClientRect() 로 측정한다.
 *   2) 같은 컬럼 안에서 연도순으로 인접한 두 이벤트마다
 *      "겹치지 않는 데 필요한 px 간격 ÷ 두 이벤트의 연도 차이"
 *      = 그 구간에 필요한 px/year 를 구하고, 모든 컬럼·모든 구간 중
 *      최댓값을 최종 px/year 로 채택한다(연도 비례는 항상 유지되므로
 *      가장 빡빡한 구간 하나가 전체 스케일을 결정한다).
 * 최종 트랙 높이 = 이 px/year × 축 전체 연도 스팬.
 * @param {HTMLElement} root compareHTML 이 렌더된 컨테이너
 * @param {Array<Object>} selected 비교 중인 브랜드 배열
 * @param {boolean} [descending=false] compareHTML 에 넘긴 것과 같은 값이어야
 *   한다 — top% → year 역산 공식이 축 방향에 따라 달라지기 때문.
 */
function sizeCompareTrack(root, selected, descending = false) {
  const compareEl = root.querySelector(".brand-compare");
  if (!compareEl) return;

  const years = [];
  selected.forEach(b => {
    if (Number.isFinite(b.founded)) years.push(b.founded);
    (b.timeline || []).forEach(t => { if (Number.isFinite(t.year)) years.push(t.year); });
  });
  const minYear = years.length ? Math.min(...years) : 0;
  const maxYear = years.length ? Math.max(...years) : 0;
  // brand.view.js compareHTML() 과 동일한 축 계산 — descending 이면 축의
  // "시작"(화면 위쪽)이 최근 쪽으로 바뀌므로, 여백을 두는 쪽(축 시작)과
  // 10년 단위로 반올림하는 쪽(축 끝)도 함께 뒤바뀐다. compareHTML() 의
  // axisMin/axisMax 계산과 정확히 같은 공식을 써야 top%→year 역산이
  // 어긋나지 않는다.
  const axisMin = descending ? Math.floor(minYear / 10) * 10 : minYear - 1;
  const axisMax = descending ? maxYear + 1 : Math.ceil(maxYear / 10) * 10;
  const axisSpan = Math.max(axisMax - axisMin, 1);

  // 1) 라벨 실측을 위해 넉넉한 임시 높이로 먼저 그린다.
  const measureH = 20000;
  compareEl.style.setProperty("--compare-track-h", `${measureH}px`);

  const rowGapPx = 10; // 인접 라벨 사이 최소 여백

  // 2) 각 컬럼에서, 연도순으로 인접한 두 포인트 사이 필요 px/year 를 구한다.
  let maxPxPerYear = 0;
  root.querySelectorAll(".brand-compare__col").forEach(col => {
    const points = [...col.querySelectorAll(".brand-compare__point")]
      .map(el => {
        // top% → year 역산: compareHTML() 의 yearToPct 와 정확히 반대 공식.
        // descending 이면 top% 자체가 (100 - 정방향pct) 로 저장돼 있으므로,
        // 먼저 100에서 빼 정방향 pct 로 되돌린 뒤 같은 공식을 적용한다.
        const rawPct = parseFloat(el.style.top);
        const pct = descending ? 100 - rawPct : rawPct;
        return {
          year: axisMin + (pct / 100) * axisSpan,
          // [버그 수정] .brand-compare__label 은 CSS 에서 display:contents 로
          // 렌더되어(grid 부모의 컬럼에 자식을 직접 배치하기 위함) 자기 자신은
          // getBoundingClientRect() 높이가 항상 0으로 측정된다 — 그 결과 겹침
          // 방지 계산이 무력화돼 모든 라벨이 최소 간격으로 뭉쳐 찍히는 버그가
          // 있었다. label 대신 point 자신(display:grid, 실제 렌더 높이를 가짐)을
          // 측정해야 한다.
          h: el.getBoundingClientRect().height,
        };
      })
      .sort((a, b) => a.year - b.year);

    for (let i = 1; i < points.length; i++) {
      const dy = points[i].year - points[i - 1].year;
      if (dy <= 0) continue; // 동일 연도(중복)는 스케일 계산에서 제외
      const neededPx = points[i - 1].h / 2 + points[i].h / 2 + rowGapPx;
      const pxPerYear = neededPx / dy;
      if (pxPerYear > maxPxPerYear) maxPxPerYear = pxPerYear;
    }
  });

  // 스팬이 짧아 이벤트가 하나뿐이거나 계산값이 너무 작은 경우를 대비한 하한선.
  const minPxPerYear = 6;
  const pxPerYear = Math.max(maxPxPerYear, minPxPerYear);

  const h = Math.ceil(pxPerYear * axisSpan);
  compareEl.style.setProperty("--compare-track-h", `${h}px`);
  // 컬럼 헤더 높이(--compare-head-h)는 brand.css 에 고정 상수(44px)로
  // 선언돼 있어 rules(가로선)/cols(컬럼) 두 레이어가 항상 같은 오프셋을
  // 공유한다 — 실측이 필요 없다(브랜드가 추가되거나 이름이 바뀌어도
  // 안정적으로 동작).
}

/** Brand 도메인을 라우터에 등록 — main.js 가 호출하는 유일한 공개 API */
export function initBrandDomain() {
  registerDomain("brand", { label: "Brand", mount: mountBrand, unmount: unmountBrand, count: () => BRANDS.length });
}

/**
 * 데이터에 포함된 모든 브랜드 이름 — index.html 상단바 부제에 사용 (main.js).
 * @returns {string[]}
 */
export function getBrandNames() {
  return BRANDS.map(b => b.name);
}
