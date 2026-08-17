/**
 * @module ui/pane-interactions
 * pane 안 콘텐츠의 상호작용(뷰 전환·단위 토글·사진 확대·접기/펼치기·커스텀
 * 스크롤바·호버 팝오버). 모달 수명주기는 ui/modal.js 담당.
 *
 * 진입점은 wirePaneInteractions(root) 하나 — openModalWith(pane 1)와
 * openSplitPane(pane 2)이 각자의 루트로 호출한다. 하위 배선은 해당 마크업이
 * 없으면 아무 일도 하지 않으므로 어떤 도메인의 pane 에나 안전하다.
 */

// split-view.js 의 openSplitPane 을 직접 import 하면 순환 import 가 되므로
// (split-view.js 가 이 모듈을 import) 콜백 슬롯을 두고 그쪽이 등록한다.
let mediaLightboxOpener = null;

/**
 * @typedef {HTMLElement & {
 *   _scrollbarTrack?: HTMLDivElement|null,
 *   _scrollHideTimer?: ReturnType<typeof setTimeout>
 * }} InteractiveElement
 */

/**
 * split-view.js 가 앱 초기화 시 1회 호출해 실제 "사진 확대 pane 열기" 구현을
 * 등록한다.
 * @param {(views: {src: string, alt: string, label: string, slug: string}[], startIndex: number, paneColor: string, onViewChange?: (slug: string) => void, sourceId?: string) => void} opener
 */
export function setMediaLightboxOpener(opener) {
  mediaLightboxOpener = opener;
}

/**
 * 모달/pane 공통 인터랙션 일괄 배선 — 뷰 전환·mm/in 토글·이미지 확대·
 * Configurations +N 토글·섹션 접기/펼치기·커스텀 스크롤바·호버 팝오버.
 * @param {HTMLElement} root 배선 대상 컨테이너 (모달 전체 또는 pane 2)
 */
export function wirePaneInteractions(root) {
  wireViewSwitch(root);
  wireDimsUnitSwitch(root);
  wireWeightUnitSwitch(root);
  wireMediaLightbox(root);
  wireConfigsToggle(root);
  wireSectionToggle(root);
  wireScrollbarAutoShow(root);
  wireAcousticTips(root);
}

/**
 * Preset Guide 의 "Acoustic Properties" 호버 팝오버를 배치한다.
 * overflow:auto 인 조상(모달/pane 스크롤 컨테이너) 안에서는 자손이 아무리
 * visible 이어도 그 경계를 못 넘는다 — 보일 때만 body 로 옮겨 fixed 로
 * 배치하면 스크롤 컨테이너와 무관해진다(커스텀 스크롤바와 같은 해법).
 * @param {HTMLElement} root 배선 대상 컨테이너 (모달 전체 또는 pane)
 */
function wireAcousticTips(root) {
  /** @type {NodeListOf<HTMLElement>} */ (root.querySelectorAll(".acoustic-tip")).forEach(tip => {
    const pop = /** @type {HTMLElement|null} */ (tip.querySelector(".acoustic-tip__popover"));
    if (!pop) return;
    const show = () => {
      const rect = tip.getBoundingClientRect();
      pop.classList.add("acoustic-tip__popover--fixed");
      document.body.appendChild(pop);
      pop.style.left = `${rect.left}px`;
      pop.style.top = `${rect.bottom + 8}px`;
      pop.style.visibility = "visible";
      pop.style.opacity = "1";
      // 뷰포트 오른쪽을 넘으면 왼쪽으로 당겨 잘리지 않게 한다.
      const popRect = pop.getBoundingClientRect();
      if (popRect.right > window.innerWidth - 8) {
        pop.style.left = `${window.innerWidth - 8 - popRect.width}px`;
      }
    };
    const hide = () => {
      pop.style.visibility = "";
      pop.style.opacity = "";
      if (pop.parentElement === document.body) tip.appendChild(pop);
    };
    tip.onmouseenter = show;
    tip.onmouseleave = hide;
    tip.onfocus = show;
    tip.onblur = hide;
  });
}

/** modal.css .modal__scrollbar-track 의 top 과 동일(라운드 모서리 회피) */
const SCROLLBAR_MARGIN = 28;
const SCROLLBAR_MIN_THUMB = 24;
/** 상한이 너무 낮으면(70px 였음) 스크롤량 대비 막대 이동이 과장돼 보인다. */
const SCROLLBAR_MAX_THUMB = 160;

/**
 * 평소엔 숨어있다가 스크롤/호버 때만 나타나는 짧고 얇은 막대.
 * 네이티브 thumb 은 길이가 "트랙 × (가시영역/전체 콘텐츠)"로 강제되어 CSS 로
 * 짧게 고정할 수 없다 — 네이티브는 modal.css 에서 숨기고 오버레이로 대체한다.
 * root 가 스크롤 컨테이너다(단일 모달은 #modal, Split View 는 각 pane).
 * @param {InteractiveElement} root 스크롤 컨테이너 (모달 전체 또는 pane)
 */
function wireScrollbarAutoShow(root) {
  // 사진 확대 pane 은 overflow:hidden 이어도 scrollHeight 는 커지므로 아래
  // 판정에 걸려 막대만 뜬다 — 배선 자체를 건너뛴다.
  if (root.closest && root.closest(".split-view__pane--media")) return;
  // 트랙은 body 에 붙인다. 스크롤 컨테이너의 자식으로 두면 fixed 라도
  // scrollHeight 가 부풀어 실제 콘텐츠보다 아래까지 스크롤됐다.
  let track = root._scrollbarTrack;
  if (!track) {
    track = document.createElement("div");
    track.className = "modal__scrollbar-track";
    track.innerHTML = `<div class="modal__scrollbar-thumb"></div>`;
    document.body.appendChild(track);
    root._scrollbarTrack = track;
  }
  const thumb = /** @type {HTMLElement} */ (track.querySelector(".modal__scrollbar-thumb"));

  const update = () => {
    const rect = root.getBoundingClientRect();
    const trackH = rect.height - SCROLLBAR_MARGIN * 2;
    track.style.top = `${rect.top + SCROLLBAR_MARGIN}px`;
    track.style.left = `${rect.right - 7}px`;
    track.style.height = `${Math.max(0, trackH)}px`;
    const scrollable = root.scrollHeight - root.clientHeight;
    if (scrollable <= 1) {
      track.style.display = "none";
      return;
    }
    track.style.display = "";
    const thumbH = Math.min(
      SCROLLBAR_MAX_THUMB,
      Math.max(SCROLLBAR_MIN_THUMB, trackH * (root.clientHeight / root.scrollHeight)),
    );
    const maxThumbTop = Math.max(0, trackH - thumbH);
    const thumbTop = (root.scrollTop / scrollable) * maxThumbTop;
    thumb.style.height = `${thumbH}px`;
    thumb.style.top = `${thumbTop}px`;
  };

  // [중복 등록 방지] wirePaneInteractions 는 같은 모달을 열 때마다(카드를
  // 새로 클릭할 때마다) 반복 호출되는데, root(#modal 등)는 고정된 DOM
  // 요소라 addEventListener 를 쓰면 열 때마다 리스너가 계속 누적된다.
  // 다른 wire* 함수들처럼 onXxx 속성 할당(매번 덮어써짐)으로 통일한다.
  // 숨김 타이머 id 도 클로저 변수 대신 root 에 직접 저장해, 재호출로 함수
  // 클로저가 새로 생겨도 이전 타이머를 확실히 취소할 수 있게 한다.
  root.onscroll = () => {
    update();
    track.classList.add("is-visible");
    clearTimeout(root._scrollHideTimer);
    root._scrollHideTimer = setTimeout(() => track.classList.remove("is-visible"), 700);
  };
  root.onmouseenter = () => {
    update();
    track.classList.add("is-visible");
  };
  root.onmouseleave = () => {
    if (!root._scrollHideTimer) track.classList.remove("is-visible");
  };
  update();
  // .modal--pop-in 팝업 애니메이션(0.18s)이 끝나기 전에 rect 를 읽으면 중간
  // 좌표가 잡혀 트랙이 왼쪽에 어긋난다 — 끝난 뒤 한 번 더 잡는다.
  setTimeout(update, 200);
}

/**
 * root 에 연결된 커스텀 스크롤바 트랙을 제거한다 — Split View 진입/해제로
 * 스크롤 컨테이너가 바뀔 때 옛 트랙이 화면에 고아로 남지 않도록.
 * @param {InteractiveElement} root
 */
export function removeScrollbarTrack(root) {
  if (root && root._scrollbarTrack) {
    root._scrollbarTrack.remove();
    root._scrollbarTrack = null;
  }
}

/**
 * 이미지 뷰 전환 버튼([data-view-switch]). 뷰가 2개 이상일 때만 마크업이
 * 존재하며, 버튼 개수·라벨과 무관하게 동작한다.
 * @param {HTMLElement} root 버튼/이미지를 담고 있는 컨테이너
 */
function wireViewSwitch(root) {
  const btns = /** @type {NodeListOf<HTMLElement>} */ (root.querySelectorAll("[data-view-switch]"));
  if (!btns.length) return;
  const media = /** @type {HTMLElement|null} */ (root.querySelector(".modal__media"));
  if (!media) return;
  const imgs = /** @type {NodeListOf<HTMLElement>} */ (media.querySelectorAll(".modal__img[data-view]"));
  btns.forEach(btn => {
    btn.onclick = () => {
      const view = btn.dataset.viewSwitch;
      btns.forEach(b => b.classList.toggle("is-active", b === btn));
      imgs.forEach(img => {
        img.hidden = img.dataset.view !== view;
      });
    };
  });
}

/**
 * Dimensions mm/in 단위 전환 버튼([data-dims-unit]) — wireViewSwitch 와 같은 패턴.
 * @param {HTMLElement} root 버튼/값을 담고 있는 컨테이너
 */
function wireDimsUnitSwitch(root) {
  const btns = /** @type {NodeListOf<HTMLElement>} */ (root.querySelectorAll("[data-dims-unit]"));
  if (!btns.length) return;
  const mmEl = /** @type {HTMLElement|null} */ (root.querySelector("[data-dims-mm]"));
  const inEl = /** @type {HTMLElement|null} */ (root.querySelector("[data-dims-in]"));
  if (!mmEl || !inEl) return;
  btns.forEach(btn => {
    btn.onclick = () => {
      const unit = btn.dataset.dimsUnit;
      btns.forEach(b => b.classList.toggle("is-active", b === btn));
      mmEl.hidden = unit !== "mm";
      inEl.hidden = unit !== "in";
    };
  });
}

/**
 * Weight kg/lb 단위 전환 버튼([data-weight-unit]) — 위와 같은 패턴.
 * @param {HTMLElement} root 버튼/값을 담고 있는 컨테이너
 */
function wireWeightUnitSwitch(root) {
  const btns = /** @type {NodeListOf<HTMLElement>} */ (root.querySelectorAll("[data-weight-unit]"));
  if (!btns.length) return;
  const kgEl = /** @type {HTMLElement|null} */ (root.querySelector("[data-weight-kg]"));
  const lbEl = /** @type {HTMLElement|null} */ (root.querySelector("[data-weight-lb]"));
  if (!kgEl || !lbEl) return;
  btns.forEach(btn => {
    btn.onclick = () => {
      const unit = btn.dataset.weightUnit;
      btns.forEach(b => b.classList.toggle("is-active", b === btn));
      kgEl.hidden = unit !== "kg";
      lbEl.hidden = unit !== "lb";
    };
  });
}

/**
 * 사진을 클릭하면 pane 2 자리에 확대본을 연다(오픈 로직은 split-view.js).
 * .modal__media 에 data-lightbox="off" 가 있으면 조용히 빠진다.
 *
 * .modal__media 안의 [data-view] img 전부를 views 배열로 넘긴다 — 확대 pane
 * 하단에도 같은 뷰 전환 버튼을 그릴 수 있게. startIndex 는 클릭 시점에 보이던
 * 이미지라 확대 pane 도 그 뷰로 시작한다.
 * @param {HTMLElement} root 모달 전체 컨테이너
 */
function wireMediaLightbox(root) {
  const media = /** @type {HTMLElement|null} */ (root.querySelector(".modal__media"));
  if (!media || media.dataset.lightbox === "off") return;
  // addEventListener 금지 — wirePaneInteractions 는 모달을 열 때마다 다시
  // 호출되므로 리스너가 누적돼 클릭 한 번에 확대 pane 이 여러 번 열린다.
  media.onclick = () => {
    const imgs = [.../** @type {NodeListOf<HTMLImageElement>} */ (media.querySelectorAll("img[data-view]"))];
    const list = imgs.length ? imgs : [.../** @type {NodeListOf<HTMLImageElement>} */ (media.querySelectorAll("img"))];
    if (!list.length || !mediaLightboxOpener) return;
    const startIndex = Math.max(
      0,
      list.findIndex(img => !img.hidden),
    );
    const views = list.map(img => ({
      src: img.src,
      alt: img.alt,
      label: img.dataset.viewLabel || img.dataset.view || "",
      slug: img.dataset.view || "",
    }));
    // 확대 pane 강조선도 원본 pane 과 같은 제조사 색.
    const paneColor = getComputedStyle(root).getPropertyValue("--mfr").trim();
    // 확대 pane 이 열리는 동안 원본 모달의 사진 영역은 접히며 사라진다.
    const wrap = /** @type {HTMLElement|null} */ (media.closest(".modal__media-wrap"));
    // 확대 pane 을 닫을 때 원본 모달도 그 뷰로 되돌린다 — 같은 slug 의 뷰
    // 버튼을 클릭시켜 wireViewSwitch 의 토글 로직을 재사용한다. 인덱스가
    // 아니라 slug 인 이유: 스택 그룹이 있는 카드는 버튼 DOM 순서가 views
    // 순서와 달라 인덱스로는 엉뚱한 버튼을 누른다.
    const onViewChange = slug => {
      const btn = [.../** @type {NodeListOf<HTMLElement>} */ (root.querySelectorAll("[data-view-switch]"))].find(
        b => b.dataset.viewSwitch === slug,
      );
      if (btn) btn.click();
    };
    // [모달 라우팅] pane2 사진이면 그 항목 id 를 함께 넘겨 URL 에
    // "<항목id>~media~<뷰>" 로 기록한다. pane1 사진이면 "media~<뷰>".
    const splitView = /** @type {HTMLElement|null} */ (root.closest(".split-view"));
    const sourceId = root.matches(".split-view__pane:nth-child(2)") ? splitView?.dataset.paneId || "" : "";
    // 순서 주의: pane 오픈(DOM 재구성 포함)을 먼저 끝내고, 다음 프레임에
    // --collapsing 을 붙인다. 클래스를 먼저 붙이면 "접히기 전" 상태가 한 번도
    // 페인트되지 않아 트랜지션 없이 최종 모습으로 튄다.
    mediaLightboxOpener(views, startIndex, paneColor, onViewChange, sourceId);
    if (wrap) {
      requestAnimationFrame(() => {
        wrap.classList.add("modal__media-wrap--collapsing");
      });
    }
  };
}

/**
 * Configurations 표(스피커 기준, configsBySpeakerTableHTML)의 +N 토글
 * 버튼 — 같은 data-toggle-group 의 하위 행(--sub)을 펼치거나 접는다.
 * 버튼이 클릭 가능한 대표 행 안에 중첩돼 있어 stopPropagation 이 필요하다.
 * root 범위로만 탐색하므로 pane1/pane2 에 같은 그룹 id 가 있어도 간섭하지 않는다.
 * @param {HTMLElement} root 배선 대상 컨테이너
 */
function wireConfigsToggle(root) {
  /** @type {NodeListOf<HTMLElement>} */ (root.querySelectorAll(".match-table__toggle-btn")).forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      const groupId = btn.dataset.toggleGroup;
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const members = [
        .../** @type {NodeListOf<HTMLElement>} */ (root.querySelectorAll("[data-toggle-member]")),
      ].filter(row => row.dataset.toggleMember === groupId);
      members.forEach(row => {
        row.hidden = expanded;
      });
      btn.setAttribute("aria-expanded", String(!expanded));
      btn.textContent = expanded ? `+${members.length}` : "−";
    };
  });
}

/**
 * 섹션 통째 접기/펼치기([data-section-toggle]) — section-label 을 누르면 그
 * 아래 표 전체가 열리고 닫힌다(wireConfigsToggle 은 표 안의 개별 행 단위).
 * Ctrl/Cmd + 클릭이면 root 안의 모든 섹션을 한 번에 맞춘다.
 * @param {HTMLElement} root 배선 대상 컨테이너
 */
function wireSectionToggle(root) {
  const pairs = [.../** @type {NodeListOf<HTMLElement>} */ (root.querySelectorAll("[data-section-toggle]"))]
    .map(btn => ({
      btn,
      bodyEl: [.../** @type {NodeListOf<HTMLElement>} */ (root.querySelectorAll("[data-section-toggle-body]"))].find(
        el => el.dataset.sectionToggleBody === btn.dataset.sectionToggle,
      ),
    }))
    .filter(p => p.bodyEl);
  pairs.forEach(({ btn, bodyEl }) => {
    btn.onclick = e => {
      const expandNext = btn.getAttribute("aria-expanded") !== "true";
      if (e.ctrlKey || e.metaKey) {
        pairs.forEach(p => {
          p.btn.setAttribute("aria-expanded", String(expandNext));
          setSectionBodyExpanded(p.bodyEl, expandNext);
        });
        return;
      }
      btn.setAttribute("aria-expanded", String(expandNext));
      setSectionBodyExpanded(bodyEl, expandNext);
    };
  });
}

/**
 * data-section-toggle-body 를 트랜지션과 함께 펼치거나 접는다.
 * hidden(display:none)은 트랜지션이 안 걸리므로 max-height 를 실측
 * scrollHeight 로 애니메이션하고, 접힘이 끝난 뒤에야 hidden 을 붙인다.
 * 고정 max-height 를 쓰면 내용 길이에 따라 체감 속도가 들쭉날쭉해진다.
 * 펼침: hidden 제거 → 0 → 실제 높이 → 종료 후 none(이후 내용 변화 대응).
 * 접힘: 실제 높이 고정 → 다음 프레임에 0 → 종료 후 hidden.
 * @param {HTMLElement} bodyEl
 * @param {boolean} expand
 */
function setSectionBodyExpanded(bodyEl, expand) {
  bodyEl.addEventListener("transitionend", function onEnd(e) {
    if (e.target !== bodyEl || e.propertyName !== "max-height") return;
    bodyEl.removeEventListener("transitionend", onEnd);
    if (expand) {
      bodyEl.style.maxHeight = "none";
    } else {
      bodyEl.hidden = true;
    }
  });
  if (expand) {
    bodyEl.hidden = false;
    bodyEl.style.maxHeight = "0px";
    requestAnimationFrame(() => {
      bodyEl.classList.add("is-expanded");
      bodyEl.style.maxHeight = `${bodyEl.scrollHeight}px`;
    });
  } else {
    bodyEl.style.maxHeight = `${bodyEl.scrollHeight}px`;
    requestAnimationFrame(() => {
      bodyEl.classList.remove("is-expanded");
      bodyEl.style.maxHeight = "0px";
    });
  }
}
