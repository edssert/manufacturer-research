/**
 * @module ui/filters
 * 칩(chip) + 범위 슬라이더 필터 패널 — 도메인의 schema 로만 구동되는 범용 UI.
 * "스피커"·"앰프" 같은 도메인 지식은 전혀 없으며 schema.chipFields /
 * schema.rangeFields 정의만 읽는다.
 *
 * 관련 CSS: css/components/controls.css (.filter-panel, .chip, .range-slider)
 * 상태 저장: 각 도메인의 state 객체 (core/state.js 참조)
 */
import { $, esc, uniq } from "../core/dom.js";

/**
 * 토글형 칩 버튼 1개를 생성한다.
 * 선택 상태는 aria-pressed 속성으로 표현하며 CSS 가 이를 읽어 스타일링한다.
 * @param {string} label 표시 텍스트
 * @param {string} val 필터 값 (문자열화된 원본 값)
 * @param {Set<string>} set 이 필드의 선택값 집합 (state.chipFilters[key])
 * @param {number|null} sub 우측에 표시할 항목 수 (null 이면 숨김)
 * @param {Function} onchange 토글 시 호출할 콜백 (보통 도메인의 render)
 * @returns {HTMLButtonElement}
 */
function chipEl(label, val, set, sub, onchange) {
  const b = document.createElement("button");
  b.className = "chip";
  b.setAttribute("aria-pressed", "false");
  b.dataset.val = val;
  b.innerHTML = esc(label) + (sub != null ? ` <span class="chip__count">${sub}</span>` : "");
  b.onclick = () => {
    set.has(val) ? set.delete(val) : set.add(val);
    b.setAttribute("aria-pressed", set.has(val));
    onchange();
  };
  return b;
}

/**
 * [v1.8 리팩토링] 5개 도메인 컨트롤러(speakers/amplifiers/dsps/software/
 * accessories)에 동일하게 반복되던 검색바+정렬+필터토글 컨트롤 바 마크업을
 * 공통 헬퍼로 추출한 것 — id 접두사·placeholder·정렬 옵션만 도메인별로
 * 다르고 나머지 구조(controls__inner/search-box/controls__tools/
 * filter-panel)는 완전히 동일했다. 이벤트 연결(input/change/reset)과
 * content-wrap/결과 영역은 도메인마다 근소하게 달라(예: accessories 의
 * resetAccessories 가 sort 기본값을 추가로 되돌림) 그대로 각 컨트롤러에 남긴다
 * — 이 함수는 마크업 생성만 담당한다.
 * @param {string} idPrefix DOM id 접두사 (예: "spk", "amp", "dsp", "sw", "acc")
 * @param {string} searchPlaceholder 검색창 placeholder 텍스트
 * @param {{value:string, label:string}[]} sortOptions select 옵션 목록 (순서 유지)
 * @returns {string} .controls 마크업 (컨트롤러가 wrap.innerHTML 에 그대로 대입)
 */
export function controlsBarHTML(idPrefix, searchPlaceholder, sortOptions) {
  const optionsHTML = sortOptions.map(o => `<option value="${esc(o.value)}">${esc(o.label)}</option>`).join("");
  return `
    <div class="controls">
      <div class="controls__inner">
        <div class="controls__row">
          <label class="search-box">
            <svg class="search-box__icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
            <input class="search-box__input" id="${idPrefix}-q" type="search" placeholder="${esc(searchPlaceholder)}" autocomplete="off" spellcheck="false" />
          </label>
          <div class="controls__tools">
            <select class="select" id="${idPrefix}-sort">${optionsHTML}</select>
            <button class="btn" id="${idPrefix}-reset">필터 초기화</button>
            <button class="btn btn--toggle" id="${idPrefix}-filter-toggle" type="button" aria-expanded="false">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
              필터
            </button>
          </div>
        </div>
        <div class="filter-panel" id="${idPrefix}-filters"></div>
      </div>
    </div>`;
}

/**
 * 필터 패널 전체(칩 행 + 범위 슬라이더 행)를 panelEl 안에 빌드한다.
 * @param {HTMLElement} panelEl 필터 패널 컨테이너 (.filter-panel)
 * @param {Object[]} data 필터 대상 전체(미필터) 데이터 배열
 * @param {Object} state 도메인 상태 객체 (core/state.js createState)
 * @param {Object} schema 도메인 스키마 (chipFields/rangeFields 정의)
 * @param {Function} onChange 필터 변경 시 호출할 콜백 (도메인의 render)
 */
export function buildFilters(panelEl, data, state, schema, onChange) {
  panelEl.innerHTML = "";

  // ── 칩 필터 행 ──
  schema.chipFields.forEach(cf => {
    if (!state.chipFilters[cf.key]) state.chipFilters[cf.key] = new Set();
    const row = document.createElement("div");
    row.className = "filter-panel__row";
    row.innerHTML = `<div class="filter-panel__label">${esc(cf.label)}</div><div class="chip-group" id="f-${cf.key}"></div>`;
    panelEl.appendChild(row);
    const chipsEl = row.querySelector(".chip-group");
    // cf.order 가 있으면 그 순서대로, 없으면 데이터에서 발견한 값을 정렬해 사용
    const values = cf.order
      ? cf.order.filter(v => data.some(d => String(resolve(d, cf.key)) === String(v)))
      : uniq(data.map(d => resolve(d, cf.key))).filter(v => v != null).sort();
    values.forEach(v => {
      const label = cf.labelFor ? cf.labelFor(v) : String(v);
      const count = data.filter(d => String(resolve(d, cf.key)) === String(v)).length;
      chipsEl.appendChild(chipEl(label, String(v), state.chipFilters[cf.key], count, onChange));
    });
  });

  // ── 범위 슬라이더 행 ──
  schema.rangeFields.forEach(rf => {
    const raw = data.map(d => resolve(d, rf.key)).filter(x => x != null);
    if (!raw.length) return;
    // isRange 필드는 값이 스칼라가 아니라 [min,max] 구간 배열이므로, 슬라이더
    // 자체의 전체 min/max 는 모든 항목의 구간을 펼쳐(flat) 계산한다.
    const vals = rf.isRange ? raw.flat() : raw;
    if (!vals.length) return;
    // step: 슬라이더 눈금 단위이자 자동 감지된 min/max 의 반올림 단위
    // (예: Watt 는 step:100 → 슬라이더가 깔끔한 백 단위로 스냅)
    const step = rf.step || 1;
    const lo = Math.floor(Math.min(...vals) / step) * step;
    const hi = Math.ceil(Math.max(...vals) / step) * step;
    state.range[rf.key] = { lo, hi, min: lo, max: hi };
    const row = document.createElement("div");
    row.className = "filter-panel__row";
    row.innerHTML = `<div class="filter-panel__label">${esc(rf.label)}</div>
      <div class="range-slider">
        <div class="range-slider__track-zone">
          <div class="range-slider__rail"><div class="range-slider__fill" id="rf-${rf.key}-fill"></div></div>
          <input type="range" class="range-slider__input" id="rf-${rf.key}-min" aria-label="min ${esc(rf.label)}">
          <input type="range" class="range-slider__input" id="rf-${rf.key}-max" aria-label="max ${esc(rf.label)}">
        </div>
        <div class="range-slider__readout"><b id="rf-${rf.key}-minv">–</b> – <b id="rf-${rf.key}-maxv">–</b><span>${esc(rf.unit || "")}</span></div>
      </div>`;
    panelEl.appendChild(row);
    wireRange(row, rf.key, lo, hi, state, onChange, step, rf.minGap);
  });
}

/**
 * min/max 이중 핸들 슬라이더 1개의 동작을 연결한다.
 * @param {HTMLElement} row 슬라이더가 들어있는 행 요소
 * @param {string} key 필드 키 (state.range[key] 에 결과 저장)
 * @param {number} lo 슬라이더 최솟값
 * @param {number} hi 슬라이더 최댓값
 * @param {Object} state 도메인 상태 객체
 * @param {Function} onChange 값 변경 시 콜백
 * @param {number} [step=1] 눈금 단위 (예: SPL 1, Watt 100)
 * @param {number} [minGap] 두 핸들 사이 최소 간격 (기본값: step)
 */
function wireRange(row, key, lo, hi, state, onChange, step = 1, minGap) {
  const MINGAP = minGap != null ? minGap : step;
  const mn = row.querySelector(`#rf-${key}-min`), mx = row.querySelector(`#rf-${key}-max`);
  const fill = row.querySelector(`#rf-${key}-fill`);
  const minv = row.querySelector(`#rf-${key}-minv`), maxv = row.querySelector(`#rf-${key}-maxv`);
  mn.min = mx.min = lo; mn.max = mx.max = hi; mn.step = mx.step = step;
  mn.value = lo; mx.value = hi;
  const upd = (e) => {
    let a = +mn.value, b = +mx.value;
    // 두 핸들이 MINGAP 미만으로 겹치지 않도록 조정
    if (b - a < MINGAP) {
      if (e && e.target === mn) { a = b - MINGAP; if (a < lo) { a = lo; b = a + MINGAP; mx.value = b; } mn.value = a; }
      else { b = a + MINGAP; if (b > hi) { b = hi; a = b - MINGAP; mn.value = a; } mx.value = b; }
    }
    state.range[key] = { lo: a, hi: b, min: lo, max: hi };
    const pa = (a - lo) / (hi - lo) * 100, pb = (b - lo) / (hi - lo) * 100;
    fill.style.left = pa + "%"; fill.style.width = (pb - pa) + "%";
    minv.textContent = a; maxv.textContent = b;
    onChange();
  };
  mn.oninput = upd; mx.oninput = upd; upd();
}

/**
 * 필터 패널 접기/펼치기 토글 버튼을 연결한다.
 * 상태는 DOM(aria-expanded + 변경자 클래스)에만 저장 — 탭 UI 는 최초 1회만
 * 빌드되고 이후 hidden 토글만 하므로 상태가 유지된다.
 * 사이트 진입(최초 빌드) 시에는 기본적으로 접힌 상태로 시작한다.
 * @param {HTMLElement} toggleBtn 토글 버튼 (#xxx-filter-toggle)
 * @param {HTMLElement} panelEl 필터 패널 (#xxx-filters)
 */
export function wireFilterToggle(toggleBtn, panelEl) {
  if (!toggleBtn || !panelEl) return;
  // 기본 상태: 접힘. 버튼 마크업에 aria-expanded="true" 가 명시된 경우에만 펼침 유지.
  const startExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
  toggleBtn.setAttribute("aria-expanded", String(startExpanded));
  panelEl.classList.toggle("filter-panel--collapsed", !startExpanded);
  toggleBtn.onclick = () => {
    const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", String(!expanded));
    panelEl.classList.toggle("filter-panel--collapsed", expanded);
  };
}

/**
 * 현재 필터 조합에서 결과가 0이 되는 칩을 비활성화(disabled) 처리한다.
 * 렌더링 직후 card-grid.js 가 호출.
 * @param {HTMLElement} panelEl 필터 패널
 * @param {Object[]} data 전체 데이터
 * @param {Object} state 도메인 상태
 * @param {Object} schema 도메인 스키마
 * @param {Function} passesFn (item, exceptKey) => boolean — 해당 필드를 제외한 필터 통과 여부
 */
export function updateChipDisabledStates(panelEl, data, state, schema, passesFn) {
  schema.chipFields.forEach(cf => {
    const chipsEl = panelEl.querySelector(`#f-${cf.key}`);
    if (!chipsEl) return;
    chipsEl.querySelectorAll(".chip").forEach(c => {
      const val = c.dataset.val;
      const active = c.getAttribute("aria-pressed") === "true";
      const has = data.some(d => String(resolve(d, cf.key)) === val && passesFn(d, cf.key));
      const disable = !has && !active;
      c.disabled = disable;
      c.setAttribute("aria-disabled", String(disable));
    });
  });
}

/**
 * "a.b.c" 형태의 경로 문자열로 중첩 객체 값을 읽는다.
 * @param {Object} obj 대상 객체
 * @param {string} path 점 표기 경로
 * @returns {*}
 */
function resolve(obj, path) {
  return path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
}
