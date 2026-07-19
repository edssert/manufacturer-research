/**
 * @module ui/pane-interactions
 * 모달/Split View pane 내부 공통 인터랙션 배선 모음.
 * [v1.8 모듈 분리] 원래 ui/modal.js 에 함께 있던 wire* 함수들을 분리 —
 * modal.js 는 모달 수명주기(열기/닫기/모바일 스택)만, 이 파일은 pane 안
 * 콘텐츠의 상호작용(뷰 전환·단위 토글·사진 확대·접기/펼치기·커스텀
 * 스크롤바·호버 팝오버)만 담당한다. 로직 변경 없이 그대로 이동했다.
 *
 * 진입점은 wirePaneInteractions(root) 하나 — openModalWith(pane 1)와
 * split-view.js openSplitPane(pane 2)이 각자의 루트 요소로 호출한다.
 * 모든 하위 배선은 해당 마크업이 없으면 아무 일도 하지 않으므로 어떤
 * 도메인의 pane 에나 안전하다. [개선사항 0-1]
 */

// [사용자 요청] 사진 클릭 시 Split View 오른쪽 pane 자리에 확대본을 연다.
// 이 모듈은 split-view.js 의 openSplitPane 을 직접 import 하면 순환
// import(split-view.js 가 이미 이 모듈을 import)가 생기므로, 대신 이
// 콜백 슬롯을 두고 split-view.js 가 자기 초기화 시점에 실제 함수를 등록한다
// (아래 setMediaLightboxOpener). 등록 전(초기화 순서 문제 등)에는 안전하게
// 아무 일도 하지 않는다.
let mediaLightboxOpener = null;

/**
 * split-view.js 가 앱 초기화 시 1회 호출해 실제 "사진 확대 pane 열기" 구현을
 * 등록한다.
 * @param {(views: {src: string, alt: string, label: string}[], startIndex: number, paneColor: string, onViewChange: (index: number) => void, sourceId?: string) => void} opener
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
  // [사용자 요청] 커서 추적 hover-zoom 기능 전반 off.
  wireMediaLightbox(root);
  wireConfigsToggle(root);
  wireSectionToggle(root);
  wireScrollbarAutoShow(root);
  wireAcousticTips(root);
}

/**
 * [버그 수정] speakers.view.js 의 Preset Guide "Acoustic Properties" 호버
 * 팝오버(.acoustic-tip__popover)가 CSS 만으로(부모에 overflow: visible)는
 * 모달/pane 자체의 스크롤 컨테이너(overflow-y: auto, modal.css)를 벗어나지
 * 못하고 잘렸다 — overflow: auto 인 조상이 있으면 그 자손이 아무리
 * visible 이어도 조상 경계 밖으로는 절대 못 나가는 CSS 구조적 한계다.
 * 커스텀 스크롤바(wireScrollbarAutoShow)와 동일한 해법 — 팝오버를
 * document.body 에 직접 옮겨 놓고 position: fixed + getBoundingClientRect()
 * 로 트리거 요소 기준 화면 좌표를 계산해 배치하면 스크롤 컨테이너와
 * 완전히 무관해진다.
 * @param {HTMLElement} root 배선 대상 컨테이너 (모달 전체 또는 pane)
 */
function wireAcousticTips(root) {
  root.querySelectorAll(".acoustic-tip").forEach(tip => {
    const pop = tip.querySelector(".acoustic-tip__popover");
    if (!pop) return;
    // [DOM 이동] 원래 자리(셀 안)는 그대로 두되, 화면에 보일 때만 body 로
    // 옮겨 fixed 배치한다 — 이동 전 원래 부모를 기억해뒀다가 숨길 때
    // 되돌리지는 않고(다음 open 때 항상 새로 만들어지므로) 그냥 제자리에
    // 남겨도 무방하지만, 매번 같은 tip 이 재사용될 수 있어(wirePaneInteractions
    // 반복 호출) 원래 위치 참조를 유지해 중복 이동을 막는다.
    const show = () => {
      const rect = tip.getBoundingClientRect();
      pop.classList.add("acoustic-tip__popover--fixed");
      document.body.appendChild(pop);
      pop.style.left = `${rect.left}px`;
      pop.style.top = `${rect.bottom + 8}px`;
      pop.style.visibility = "visible";
      pop.style.opacity = "1";
      // [화면 밖 방지] 팝오버 폭(max-width 240px)이 뷰포트 오른쪽을
      // 넘으면 왼쪽으로 당겨 잘리지 않게 한다.
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

/**
 * [사용자 요청] "웹툰 스크롤"처럼 평소엔 숨어있다가 스크롤 중(또는 호버)
 * 에만 살짝 나타나는 짧고 얇은 막대 — 커스텀 오버레이 구현.
 * [배경] 네이티브(webkit) 스크롤바 thumb 은 "트랙 길이 × (가시영역/전체
 * 콘텐츠)" 비율로 브라우저가 강제로 그려서, CSS 만으로는 막대의 실제
 * 길이를 원하는 만큼 짧게 고정할 수 없었다(margin/min-height/border-clip
 * 다 시도했지만 칠해진 색만 줄어들 뿐 실제 점유 길이는 그대로). 그래서
 * 네이티브 스크롤바는 CSS 로 완전히 숨기고(modal.css), 여기서 스크롤
 * 비율을 직접 계산해 그린 오버레이 막대(.modal__scrollbar-thumb)로
 * 대체한다 — 길이를 항상 짧게(MIN_THUMB~MAX_THUMB) 고정할 수 있다.
 * root 자체가 스크롤 컨테이너다 — 단일 모달은 #modal 자신, Split View 는
 * 각 .split-view__pane.
 * @param {HTMLElement} root 스크롤 컨테이너 (모달 전체 또는 pane)
 */
const SCROLLBAR_MARGIN = 28; // modal.css .modal__scrollbar-track 의 top 과 동일(라운드 모서리 회피)
const SCROLLBAR_MIN_THUMB = 24;
// [버그 수정] 70px 로 너무 짧게 고정해뒀더니 막대가 트랙 대비 지나치게
// 작아 스크롤량과 막대 이동 거리의 체감 비율이 어긋나(살짝만 스크롤해도
// 막대가 확 움직이는 느낌) 부자연스러웠다. 트랙 실제 비율(clientHeight/
// scrollHeight)에 훨씬 가깝게, 그러나 트랙을 꽉 채우지는 않도록 상한만
// 넉넉히 늘린다.
const SCROLLBAR_MAX_THUMB = 160;

function wireScrollbarAutoShow(root) {
  // [사용자 요청] 사진 확대 pane(split-view.css .split-view__pane--media,
  // overflow-y: hidden)은 스크롤 자체가 없어야 하는 pane 이다 — 그런데
  // overflow:hidden 이어도 콘텐츠가 박스보다 크면 scrollHeight 는 여전히
  // 커지므로, 아래 update() 의 "scrollable > 0 이면 트랙 표시" 판정에 걸려
  // 커스텀 스크롤바만 계속 나타났다. 이 pane 은 아예 배선을 건너뛴다.
  if (root.closest && root.closest(".split-view__pane--media")) return;
  // [DOM 준비] 트랙은 document.body 에 직접 붙인다 — .modal(스크롤 컨테이너)
  // 의 자식으로 두면 position:fixed 라도 여전히 스크롤 오프셋 계산에
  // 얽혀(브라우저에 따라 scrollHeight 를 부풀리는 경우가 있었다) 스크롤이
  // 실제 콘텐츠보다 훨씬 아래까지 내려가는 문제가 생겼다. body 자식이면
  // root 의 스크롤과 완전히 무관해지고, getBoundingClientRect() 로 매번
  // root 의 화면 좌표를 읽어 track 의 위치만 맞춰주면 된다. root 마다
  // 트랙을 하나씩 재사용(root._scrollbarTrack)한다.
  let track = root._scrollbarTrack;
  if (!track) {
    track = document.createElement("div");
    track.className = "modal__scrollbar-track";
    track.innerHTML = `<div class="modal__scrollbar-thumb"></div>`;
    document.body.appendChild(track);
    root._scrollbarTrack = track;
  }
  const thumb = track.querySelector(".modal__scrollbar-thumb");

  const update = () => {
    const rect = root.getBoundingClientRect();
    const trackH = rect.height - SCROLLBAR_MARGIN * 2;
    track.style.top = `${rect.top + SCROLLBAR_MARGIN}px`;
    track.style.left = `${rect.right - 7}px`;
    track.style.height = `${Math.max(0, trackH)}px`;
    const scrollable = root.scrollHeight - root.clientHeight;
    if (scrollable <= 1) { track.style.display = "none"; return; }
    track.style.display = "";
    const thumbH = Math.min(SCROLLBAR_MAX_THUMB, Math.max(SCROLLBAR_MIN_THUMB, trackH * (root.clientHeight / root.scrollHeight)));
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
  root.onmouseenter = () => { update(); track.classList.add("is-visible"); };
  root.onmouseleave = () => { if (!root._scrollHideTimer) track.classList.remove("is-visible"); };
  // 새로 열린 직후에도 트랙 위치/막대 길이를 미리 계산해둔다(스크롤/호버
  // 전에도 다음 상호작용에서 바로 정확한 값이 보이도록).
  update();
  // [버그 수정 — 첫 오픈 시 트랙이 살짝 왼쪽에 붙어있다 스크롤해야 제자리로
  // 오던 문제] 모달이 열리자마자(.modal--pop-in, modal.css) translateY(8px)
  // →none 팝업 애니메이션이 0.18초간 재생되는데, 그 애니메이션이 아직 끝나기
  // 전(카드가 완전히 자리잡기 전) getBoundingClientRect() 를 읽으면 최종
  // 좌표가 아닌 중간 좌표가 잡힌다. 애니메이션이 끝난 뒤 한 번 더 갱신해
  // 최종 위치로 정확히 맞춘다.
  setTimeout(update, 200);
}

/**
 * root(모달/pane)에 연결된 커스텀 스크롤바 트랙(body 에 직접 붙어있음, 위
 * wireScrollbarAutoShow 참고)을 제거한다. Split View 진입/해제로 DOM 이
 * 재구성될 때(split-view.js) 옛 root 기준 트랙이 고아 상태로 화면에 남지
 * 않도록 호출한다.
 * @param {HTMLElement} root
 */
export function removeScrollbarTrack(root) {
  if (root && root._scrollbarTrack) {
    root._scrollbarTrack.remove();
    root._scrollbarTrack = null;
  }
}

/**
 * 모달 안의 이미지 뷰 전환 버튼([data-view-switch])을 활성화한다.
 * 뷰가 2개 이상인 스피커(Front/Rear, Front/Array 등)만 이 마크업이
 * 존재한다(speakers.view.js modalBodyHTML 의 getViews 참조) — 버튼이
 * 없는 모달(대부분의 다른 항목, 뷰 1개짜리 스피커)은 querySelectorAll 이
 * 빈 NodeList 를 반환해 아무 일도 하지 않는다. 버튼 개수·라벨과 무관하게
 * 동작하므로 향후 3번째, 4번째 뷰(I·O 등)가 추가돼도 이 함수는 그대로 쓴다.
 * @param {HTMLElement} root 버튼/이미지를 담고 있는 컨테이너 (모달 전체)
 */
function wireViewSwitch(root) {
  const btns = root.querySelectorAll("[data-view-switch]");
  if (!btns.length) return;
  const media = root.querySelector(".modal__media");
  if (!media) return;
  const imgs = media.querySelectorAll(".modal__img[data-view]");
  btns.forEach(btn => {
    btn.onclick = () => {
      const view = btn.dataset.viewSwitch;
      btns.forEach(b => b.classList.toggle("is-active", b === btn));
      imgs.forEach(img => { img.hidden = img.dataset.view !== view; });
    };
  });
}

/**
 * 모달 안의 Dimensions mm/in 단위 전환 버튼([data-dims-unit])을 활성화한다.
 * wireViewSwitch 와 동일한 토글 패턴 — 버튼이 없는 모달(Dimensions 데이터가
 * 없는 항목)은 querySelectorAll 이 빈 NodeList 를 반환해 아무 일도 하지
 * 않는다 (speakers.view.js weightDimsRow 참조).
 * @param {HTMLElement} root 버튼/값을 담고 있는 컨테이너 (모달 전체)
 */
function wireDimsUnitSwitch(root) {
  const btns = root.querySelectorAll("[data-dims-unit]");
  if (!btns.length) return;
  const mmEl = root.querySelector("[data-dims-mm]");
  const inEl = root.querySelector("[data-dims-in]");
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
 * 모달 안의 Weight kg/lb 단위 전환 버튼([data-weight-unit])을 활성화한다.
 * wireDimsUnitSwitch 와 동일한 토글 패턴 — 버튼이 없는 모달(Weight 데이터가
 * 없는 항목)은 querySelectorAll 이 빈 NodeList 를 반환해 아무 일도 하지
 * 않는다 (speakers.view.js weightDimsIpRow 참조).
 * @param {HTMLElement} root 버튼/값을 담고 있는 컨테이너 (모달 전체)
 */
function wireWeightUnitSwitch(root) {
  const btns = root.querySelectorAll("[data-weight-unit]");
  if (!btns.length) return;
  const kgEl = root.querySelector("[data-weight-kg]");
  const lbEl = root.querySelector("[data-weight-lb]");
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
 * 모달 이미지 영역(.modal__media)에 마우스 위치 기준 확대(zoom) 인터랙션을
 * 연결한다. mousemove 로 커서 위치를 읽어 CSS 변수 --zoom-x/--zoom-y (0~100%)
 * 로 넘기면, modal.css 의 img:hover 규칙이 transform-origin 을 이 변수로
 * 읽어 커서가 있는 지점을 중심으로 확대한다. 뷰가 없는 모달(.modal__media
 * 자체가 없는 항목)은 querySelector 가 null 을 반환해 아무 일도 하지 않는다.
 * [사용자 요청] 현재 hover-zoom 전반 off — wirePaneInteractions 에서 호출하지
 * 않지만, 개별 재활성화에 대비해 함수는 남겨둔다.
 * @param {HTMLElement} root 모달 전체 컨테이너
 */
function wireMediaZoom(root) {
  const media = root.querySelector(".modal__media");
  if (!media) return;
  media.addEventListener("mousemove", e => {
    const rect = media.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    media.style.setProperty("--zoom-x", `${x}%`);
    media.style.setProperty("--zoom-y", `${y}%`);
  });
}

/**
 * 모달 이미지를 클릭하면 Split View 오른쪽 pane 자리에 원본 확대본을 연다
 * (실제 오픈 로직은 split-view.js, 위 setMediaLightboxOpener 참고).
 * 이 함수는 .modal__media 에 data-lightbox="off" 가 있으면 아무 일도 하지
 * 않고 조용히 빠진다(현재는 모든 모달에서 기본 on, 필요해지면 각 도메인의
 * view 가 이 속성만 추가하면 됨).
 * [사용자 요청 — 확대 pane 안에서도 뷰 전환] 클릭 시점의 이미지 하나만
 * 넘기던 것을, .modal__media 안의 모든 [data-view] img 를 순서대로 모아
 * views 배열로 넘기도록 바꿨다 — split-view.js 가 이 배열로 확대 pane
 * 하단에도 원본 모달과 같은 뷰 전환 버튼을 그릴 수 있다. 클릭 시점에
 * hidden 이 아니던 이미지의 인덱스를 startIndex 로 함께 넘겨, 확대pane도
 * 클릭 당시 보고 있던 뷰로 시작한다.
 * @param {HTMLElement} root 모달 전체 컨테이너
 */
function wireMediaLightbox(root) {
  const media = root.querySelector(".modal__media");
  if (!media || media.dataset.lightbox === "off") return;
  // [버그 수정 — 리스너 중복] wirePaneInteractions 는 같은 모달/pane 을 열
  // 때마다(카드를 다시 클릭할 때마다) 반복 호출되는데, addEventListener 를
  // 쓰면 같은 .modal__media 노드에 클릭 리스너가 계속 누적됐다 — 그 결과
  // 클릭 한 번에 wrap.classList.add 와 mediaLightboxOpener 호출이 여러 번
  // 실행돼, 왼쪽 사진 접힘 트랜지션이 몇 번 열고 닫아야만 눈에 보이고,
  // 확대 pane 의 onClose 콜백도 중복 등록되어 X 를 두 번 눌러야 완전히
  // 닫히는 버그로 이어졌다. 다른 wire* 함수들처럼 onclick 할당(매번
  // 덮어써짐)으로 통일한다.
  media.onclick = () => {
    const imgs = [...media.querySelectorAll("img[data-view]")];
    const list = imgs.length ? imgs : [...media.querySelectorAll("img")];
    if (!list.length || !mediaLightboxOpener) return;
    const startIndex = Math.max(0, list.findIndex(img => !img.hidden));
    const views = list.map(img => ({ src: img.src, alt: img.alt, label: img.dataset.viewLabel || img.dataset.view || "", slug: img.dataset.view || "" }));
    // [사용자 요청] 오른쪽 확대 pane 상단 강조선도 왼쪽(원본) pane 과 같은
    // 제조사 포인트 색을 쓴다 — root(pane1 또는 modalEl)에 이미 걸려있는
    // --mfr CSS 변수를 그대로 읽어 넘긴다.
    const paneColor = getComputedStyle(root).getPropertyValue("--mfr").trim();
    // [사용자 요청] 오른쪽에 확대 pane 이 열리는 동안, 왼쪽(원본) 모달의
    // 사진 영역은 위로 슬라이드되며 서서히 사라진다 — 높이와 불투명도를
    // 함께 줄여(modal.css .modal__media-wrap--collapsing) 사진이 접히듯
    // 사라지고 아래 콘텐츠(System Elements 등)가 그만큼 바로 올라온다.
    const wrap = media.closest(".modal__media-wrap");
    // [사용자 요청] 확대 pane 에서 뷰를 바꾼 뒤 닫으면, 왼쪽(원본) 모달도
    // 그 바뀐 뷰 그대로 돌아온다 — 확대 pane 이 닫히는 시점에 그 뷰의 slug
    // 를 넘겨받아, slug 가 같은 원본 모달의 뷰 전환 버튼을 그대로
    // 클릭시켜 wireViewSwitch(위) 의 기존 토글 로직을 재사용한다. 인덱스가
    // 아니라 slug 로 매칭하는 이유: 스택 그룹(K2 등)이 있는 카드는 버튼의
    // DOM 순서가 views 배열 순서와 달라(스택 칸이 먼저 렌더링) 인덱스만
    // 으로는 엉뚱한 버튼을 클릭할 수 있다.
    const onViewChange = slug => {
      const btn = [...root.querySelectorAll("[data-view-switch]")].find(b => b.dataset.viewSwitch === slug);
      if (btn) btn.click();
    };
    // [모달 라우팅] 클릭된 사진의 출처 식별 — root 가 Split View 의
    // pane2(연관 항목 상세)라면 그 항목의 paneId 를 함께 넘겨, URL 에
    // "<항목id>~media~<뷰>" 형태로 기록/복원할 수 있게 한다. pane1(원본
    // 모달)의 사진이면 sourceId 없이 "media~<뷰>" 로 기록된다.
    const sourceId = (root.matches && root.matches(".split-view__pane:nth-child(2)"))
      ? (root.closest(".split-view") || {}).dataset?.paneId || ""
      : "";
    // [사용자 요청] 오른쪽 확대 pane 오픈과 왼쪽 사진 영역 접힘이 동시에
    // 시작돼야 한다 — 그래서 pane 오픈(mediaLightboxOpener, 모달 자식을
    // pane1 로 옮기는 DOM 재구성 포함)을 먼저 즉시 실행하고, wrap 이 그
    // 새 부모(pane1) 안에 자리를 잡은 바로 다음에 --collapsing 클래스를
    // 붙여 트랜지션을 재생한다.
    // [이전 버그] 반대 순서(클래스 먼저 → 그 다음 DOM 이동)로 하면, 같은
    // 동기 흐름 안에서 "접히기 전" 상태를 화면에 한 번도 그리지 못한 채
    // 두 변경이 합쳐져 트랜지션 없이 곧장 최종(접힌) 모습으로 렌더링됐다.
    // 지금 순서는 이동을 먼저 끝내(요소는 여전히 문서 안에 남아있고 부모만
    // 바뀌므로 트랜지션 자체에는 영향 없음) 그 상태를 한 프레임 그리게 한
    // 뒤 클래스를 추가하므로, "펼쳐진 상태"가 먼저 확실히 페인트되고
    // 그 다음 "접힌 상태"로의 전환이 트랜지션으로 재생된다.
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
 * 버튼을 연결한다 — 클릭 시 같은 data-toggle-group 을 가진 하위 행(--sub)
 * 을 펼치거나 접는다. 버튼이 대표 행(match-table__row--clickable) 안에
 * 중첩돼 있으므로, 버튼 클릭이 행의 Split View 이동 클릭으로 버블링되지
 * 않도록 stopPropagation 한다. root 범위로만 탐색하므로 pane 1/pane 2 에
 * 같은 토글 그룹 id 가 있어도 서로 간섭하지 않는다.
 * (amplifiers.controller 전용이었던 것을 pane 공통으로 승격 — 0-1)
 * @param {HTMLElement} root 배선 대상 컨테이너
 */
function wireConfigsToggle(root) {
  root.querySelectorAll(".match-table__toggle-btn").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const groupId = btn.dataset.toggleGroup;
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const members = root.querySelectorAll(`[data-toggle-member="${groupId}"]`);
      members.forEach(row => { row.hidden = expanded; });
      btn.setAttribute("aria-expanded", String(!expanded));
      btn.textContent = expanded ? `+${members.length}` : "−";
    };
  });
}

/**
 * 모달 안의 섹션 통째 접기/펼치기 버튼([data-section-toggle])을 활성화한다.
 * wireConfigsToggle(표 안의 개별 행 펼치기)과 달리, 이건 "Configurations"
 * 같은 section-label 자체를 클릭하면 그 아래 표 전체(data-section-toggle-body)
 * 가 통째로 열리고 닫히는 더 상위 레벨의 토글이다(사용자 요청 — 앰프 모달
 * Configurations 를 기본 접힘 상태로). 버튼이 없는 모달은 querySelectorAll 이
 * 빈 NodeList 를 반환해 아무 일도 하지 않는다.
 * @param {HTMLElement} root 배선 대상 컨테이너
 */
function wireSectionToggle(root) {
  // [사용자 요청] 아무 토글 버튼이든 Ctrl/Cmd 를 누른 채 클릭하면, 그
  // 버튼 하나만 토글하는 대신 같은 모달(root) 안의 모든 섹션 토글을 한
  // 번에 펼치거나 접는다 — 클릭한 버튼이 지금 펼쳐진 상태였으면 전체
  // 접기, 접힌 상태였으면 전체 펼치기(그 버튼 자신의 다음 상태를 기준으로
  // 나머지를 맞춘다).
  const pairs = [...root.querySelectorAll("[data-section-toggle]")]
    .map(btn => ({ btn, bodyEl: root.querySelector(`[data-section-toggle-body="${btn.dataset.sectionToggle}"]`) }))
    .filter(p => p.bodyEl);
  // [사용자 요청] 펼침/접힘이 즉시 뚝 끊기지 않고 아주 약하게 트랜지션이
  // 느껴지도록 함 — hidden 속성은 display:none 이라 트랜지션이 걸릴 수
  // 없으므로, hidden을 떼고 max-height/opacity 트랜지션(css)이 끝난 뒤에만
  // hidden을 다시 붙인다(접을 때). setSectionBodyExpanded 가 그 처리를 맡는다.
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
 * data-section-toggle-body 요소를 트랜지션과 함께 펼치거나 접는다.
 * opacity/transform 만 트랜지션하면 실제 레이아웃 높이는 그대로 유지되다가
 * hidden 이 붙는 순간 스크롤 위치가 훅 튀는 문제가 있어, max-height 를
 * 실측 scrollHeight 값으로 애니메이션한다(고정값이면 내용 길이에 따라
 * 트랜지션 체감 속도가 들쭉날쭉해짐).
 * 펼칠 때: hidden 제거 → max-height:0 에서 실제 높이로 트랜지션 → 트랜지션
 * 종료 후 max-height:none 으로 풀어 이후 내용 변화에 대응.
 * 접을 때: 현재 실제 높이를 max-height 로 고정(px) → 다음 프레임에 0으로
 * 줄여 트랜지션 시작 → 트랜지션 종료 후 hidden 추가.
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
