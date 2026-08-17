/**
 * @module ui/domain-tab
 * 카드 목록형 탭(Speaker/Amplifier/DSP/Software/Accessories)의 공통 뼈대.
 *
 * 다섯 컨트롤러가 mount/unmount/build/reset/render 를 id 접두사만
 * 바꿔 그대로 복사해 두고 있었다(도메인당 ~45줄 × 5). 실제로 도메인마다 다른
 * 것은 데이터·스키마·카드 마크업·그룹핑·모달 열기뿐이라, 나머지 배선을 여기로
 * 올렸다 — 각 컨트롤러에는 "이 탭은 무엇인가"(설정)와 도메인 고유 로직(모달
 * 안 연관 항목 배선 등)만 남는다.
 *
 * 기본 정렬은 sortOptions 의 첫 항목으로 정의한다 — select 가 화면에 보여주는
 * 값과 상태(state.sort)가 어긋날 수 없게 하기 위함(이전에는 컨트롤러의 초기값·
 * 리셋 시 대입값·schema.defaultSort 세 군데에 따로 적혀 있었고, 실제로 네
 * 도메인에서 서로 달랐다).
 */
import { $, debounce } from "../core/dom.js";
import { createState, resetState } from "../core/state.js";
import { buildFilters, wireFilterToggle, controlsBarHTML } from "./filters.js";
import { renderGrid } from "./card-grid.js";
import { registerDomain } from "../core/router.js";
import { refreshNavCounts } from "./nav.js";
import { renderLegend } from "./legend.js";

/**
 * 카드 목록형 탭 하나를 만들어 라우터에 등록한다.
 * @param {Object} cfg
 * @param {string} cfg.key 라우트 키 (= #view-<key> 컨테이너 id)
 * @param {string} cfg.label 탭에 표시할 이름
 * @param {string} cfg.idPrefix 컨트롤 바 DOM id 접두사 ("spk"/"amp"/...)
 * @param {string} cfg.searchPlaceholder 검색창 placeholder
 * @param {{value:string, label:string}[]} cfg.sortOptions 정렬 select 옵션
 *   (첫 항목이 기본 정렬 = "필터 초기화" 가 되돌아갈 값)
 * @param {ReadonlyArray<Object>} cfg.data 전체 레코드 배열
 * @param {Object} cfg.schema 도메인 스키마 (filter-engine 이 소비)
 * @param {Function} cfg.cardHTML (item) => 카드 HTML
 * @param {Function} cfg.openItem (id) => boolean — 카드 클릭/딥링크로 모달 열기
 * @param {Function} [cfg.groupBy] (state) => renderGrid 의 groupBy 설정 또는 null
 * @param {{order: ReadonlyArray<string>, mfrMap: Object, keyOf?: Function}} cfg.legend 상단바 범례
 * @param {Function} [cfg.onMount] 탭이 활성화될 때마다 (범례 렌더 직후)
 * @param {Function} [cfg.onBuild] 최초 UI 빌드 직전 1회 (카드 게이지 범위 설정 등)
 * @returns {{render: Function, state: Object}}
 */
export function createDomainTab({
  key, label, idPrefix, searchPlaceholder, sortOptions,
  data, schema, cardHTML, openItem, groupBy, legend, onMount, onBuild,
}) {
  const state = createState();
  const defaultSort = sortOptions[0].value;
  state.sort = defaultSort;
  /** 이 탭의 컨트롤 바 요소 셀렉터 (#spk-q, #spk-filters, ...) */
  const sel = (suffix) => `#${idPrefix}-${suffix}`;

  const render = () => {
    renderGrid({
      resultsEl: $(sel("results")),
      countEl: $("#count"),
      filterPanelEl: $(sel("filters")),
      data, state, schema, cardHTML,
      onOpen: openItem,
      groupBy: groupBy ? groupBy(state) : null,
    });
    refreshNavCounts();
  };

  /** 검색어/칩/정렬을 초기화하고 필터 패널을 재빌드한 뒤 다시 렌더링 */
  const reset = () => {
    resetState(state);
    state.sort = defaultSort;
    /** @type {HTMLInputElement} */ ($(sel("q"))).value = "";
    /** @type {HTMLSelectElement} */ ($(sel("sort"))).value = defaultSort;
    document.querySelectorAll(`${sel("filters")} .chip`).forEach(c => c.setAttribute("aria-pressed", "false"));
    buildFilters($(sel("filters")), data, state, schema, render);
    render();
  };
  // 빈 결과 화면의 "필터 초기화" 버튼(ui/card-grid.js)은
  // schema.onReset 을 호출하는데 이 값을 대입하는 곳이 아무 데도 없어
  // 눌러도 아무 일이 없었다 — 탭을 만드는 이 시점에 연결한다.
  schema.onReset = reset;

  /** 검색/정렬/필터 컨트롤 바 + 결과 영역 골격을 1회 빌드하고 이벤트를 연결 */
  const build = (wrap) => {
    if (onBuild) onBuild();
    wrap.innerHTML = controlsBarHTML(idPrefix, searchPlaceholder, sortOptions) + `
    <div class="content-wrap">
      <div id="${idPrefix}-results"></div>
    </div>`;
    buildFilters($(sel("filters")), data, state, schema, render);
    wireFilterToggle($(sel("filter-toggle")), $(sel("filters")));
    // [성능] 타이핑마다 그리드 전체를 재생성하지 않도록 렌더만 디바운스
    // (상태 갱신은 즉시 — 다른 코드가 state.q 를 읽어도 항상 최신값).
    const debouncedRender = debounce(render);
    $(sel("q")).addEventListener("input", e => {
      const input = /** @type {HTMLInputElement} */ (e.currentTarget);
      state.q = input.value.trim();
      debouncedRender();
    });
    $(sel("sort")).addEventListener("change", e => {
      const select = /** @type {HTMLSelectElement} */ (e.currentTarget);
      state.sort = select.value;
      render();
    });
    $(sel("reset")).onclick = reset;
  };

  /** 탭 활성화: 최초 1회 UI 빌드 후 렌더 (이후엔 hidden 만 해제) */
  const mount = () => {
    renderLegend(data, legend.order, legend.mfrMap, legend.keyOf);
    if (onMount) onMount();
    const wrap = $(`#view-${key}`);
    wrap.hidden = false;
    if (!wrap.dataset.built) {
      wrap.dataset.built = "1";
      build(wrap);
    }
    render();
  };

  registerDomain(key, {
    label,
    mount,
    unmount: () => { $(`#view-${key}`).hidden = true; },
    count: () => data.length,
    openItem,
  });

  return { render, state };
}
