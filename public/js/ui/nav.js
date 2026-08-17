/**
 * @module ui/nav
 * 상단 탭 내비게이션 렌더링 + 라우터 연결.
 * 탭 목록은 라우터에 등록된 도메인(registerDomain)에서 자동 생성되므로
 * 새 도메인을 추가해도 이 파일은 수정할 필요가 없다.
 *
 * 사진 숨기기/모션(애니메이션·트랜지션) 토글도 이
 * 탭 바 오른쪽 끝에 함께 렌더링한다 — 각 도메인 컨트롤 바(검색/필터)는
 * 도메인마다 따로 렌더링돼 전역 토글을 두기에 부적합하지만, 이 탭 바는
 * 모든 도메인이 공유하는 유일한 상시 표시 영역이라 여기 한 곳에 두면 탭을
 * 넘나들어도 위치가 흔들리지 않는다. 버튼 자체의 상태/이벤트는 여전히
 * js/ui/toggle.js 가 담당(main.js가 initMediaToggle/initMotionToggle 호출)
 * — 이 파일은 마크업만 제공.
 *
 * 관련 CSS: css/nav.css (.topnav)
 */
import { getDomains, navigateTo, getActiveKey, onRouteChange } from "../core/router.js";
import { esc } from "../core/dom.js";

/**
 * 탭 바를 렌더링하고 클릭 → 라우터 이동을 연결한다. 앱 시작 시 1회 호출.
 * @param {HTMLElement} mountEl 탭 바를 그릴 컨테이너 (#topnav)
 */
export function renderNav(mountEl) {
  const domains = getDomains();
  mountEl.innerHTML = `<div class="topnav__row">
    <div class="topnav__inner" role="tablist" aria-label="제품 분류">${domains
      .map(
        ([key, cfg]) => `
      <button class="topnav__tab" id="nav-tab-${esc(key)}" data-key="${esc(key)}" role="tab" aria-controls="view-${esc(key)}" aria-selected="false" tabindex="-1">
        ${esc(cfg.label)}<span class="topnav__tab-count" id="navcount-${key}">${cfg.count ? cfg.count() : ""}</span>
      </button>`,
      )
      .join("")}</div>
    <div class="topnav__tools">
      <button class="media-toggle" id="media-toggle" type="button" aria-label="카드 사진 숨기기/표시" aria-pressed="false">
        <svg class="media-toggle__icon media-toggle__icon--on" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M21 16l-5-4-4 3-3-2-6 5"/></svg>
        <svg class="media-toggle__icon media-toggle__icon--off" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M21 16l-5-4-4 3-3-2-6 5"/><path d="M3 3l18 18"/></svg>
      </button>
      <button class="motion-toggle" id="motion-toggle" type="button" aria-label="전체 애니메이션/트랜지션 켜기·끄기" aria-pressed="false">
        <svg class="motion-toggle__icon motion-toggle__icon--on" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12c2-4 4-4 6 0s4 4 6 0 4-4 4-4"/></svg>
        <svg class="motion-toggle__icon motion-toggle__icon--off" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16"/></svg>
      </button>
    </div>
  </div>`;

  const tabs = /** @type {HTMLElement[]} */ ([...mountEl.querySelectorAll(".topnav__tab")]);
  tabs.forEach((btn, index) => {
    btn.addEventListener("click", () => navigateTo(btn.dataset.key));
    btn.addEventListener("keydown", event => {
      let nextIndex = null;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = tabs.length - 1;
      if (nextIndex == null) return;
      event.preventDefault();
      const nextTab = tabs[nextIndex];
      nextTab.focus();
      navigateTo(nextTab.dataset.key);
    });
  });

  /** 활성 탭 표시(변경자 클래스 + aria-selected)를 현재 라우트와 동기화 */
  const syncActive = key => {
    tabs.forEach(btn => {
      const active = btn.dataset.key === key;
      btn.classList.toggle("topnav__tab--active", active);
      btn.setAttribute("aria-selected", String(active));
      btn.tabIndex = active ? 0 : -1;
    });
  };

  onRouteChange(key => syncActive(key));
  syncActive(getActiveKey());
}

/**
 * 각 탭의 항목 수 배지를 갱신한다.
 * 도메인 render 함수들이 렌더링 직후 호출.
 */
export function refreshNavCounts() {
  getDomains().forEach(([key, cfg]) => {
    const el = document.getElementById(`navcount-${key}`);
    if (el && cfg.count) el.textContent = cfg.count();
  });
}
