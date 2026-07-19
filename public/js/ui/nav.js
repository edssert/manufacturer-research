/**
 * @module ui/nav
 * 상단 탭 내비게이션 렌더링 + 라우터 연결.
 * 탭 목록은 라우터에 등록된 도메인(registerDomain)에서 자동 생성되므로
 * 새 도메인을 추가해도 이 파일은 수정할 필요가 없다.
 *
 * [사용자 요청] 사진 숨기기/다크모드/모션(애니메이션·트랜지션) 토글도 이
 * 탭 바 오른쪽 끝에 함께 렌더링한다 — 각 도메인 컨트롤 바(검색/필터)는
 * 도메인마다 따로 렌더링돼 전역 토글을 두기에 부적합하지만, 이 탭 바는
 * 모든 도메인이 공유하는 유일한 상시 표시 영역이라 여기 한 곳에 두면 탭을
 * 넘나들어도 위치가 흔들리지 않는다. 버튼 자체의 상태/이벤트는 여전히
 * js/ui/media-toggle.js, js/ui/theme.js, js/ui/motion-toggle.js 가 담당
 * (main.js가 initMediaToggle/initTheme/initMotionToggle 호출) — 이 파일은
 * 마크업만 제공.
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
    <div class="topnav__inner">${domains.map(([key, cfg]) => `
      <button class="topnav__tab" data-key="${key}" role="tab" aria-selected="false">
        ${esc(cfg.label)}<span class="topnav__tab-count" id="navcount-${key}">${cfg.count ? cfg.count() : ""}</span>
      </button>`).join("")}</div>
    <div class="topnav__tools">
      <button class="media-toggle" id="media-toggle" type="button" aria-label="카드 사진 숨기기/표시" aria-pressed="false">
        <svg class="media-toggle__icon media-toggle__icon--on" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M21 16l-5-4-4 3-3-2-6 5"/></svg>
        <svg class="media-toggle__icon media-toggle__icon--off" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M21 16l-5-4-4 3-3-2-6 5"/><path d="M3 3l18 18"/></svg>
      </button>
      <button class="theme-toggle" id="theme-toggle" type="button" aria-label="라이트/다크 모드 전환" aria-pressed="false">
        <svg class="theme-toggle__icon theme-toggle__icon--sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
        <svg class="theme-toggle__icon theme-toggle__icon--moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
      </button>
      <button class="motion-toggle" id="motion-toggle" type="button" aria-label="전체 애니메이션/트랜지션 켜기·끄기" aria-pressed="false">
        <svg class="motion-toggle__icon motion-toggle__icon--on" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12c2-4 4-4 6 0s4 4 6 0 4-4 4-4"/></svg>
        <svg class="motion-toggle__icon motion-toggle__icon--off" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16"/></svg>
      </button>
    </div>
  </div>`;

  mountEl.querySelectorAll(".topnav__tab").forEach(btn => {
    btn.addEventListener("click", () => navigateTo(btn.dataset.key));
  });

  /** 활성 탭 표시(변경자 클래스 + aria-selected)를 현재 라우트와 동기화 */
  const syncActive = (key) => {
    mountEl.querySelectorAll(".topnav__tab").forEach(btn => {
      const active = btn.dataset.key === key;
      btn.classList.toggle("topnav__tab--active", active);
      btn.setAttribute("aria-selected", String(active));
    });
  };

  onRouteChange((key) => syncActive(key));
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
