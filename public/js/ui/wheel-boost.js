/**
 * @module ui/wheel-boost
 * [사용자 요청] 마우스 휠 한 번에 움직이는 거리가 답답하다 — 사이트 쪽에서
 * 늘린다.
 *
 * 브라우저에는 "휠 한 칸당 스크롤 양"을 바꾸는 표준 API 가 없다. 방법은 wheel
 * 이벤트를 가로채(preventDefault) 직접 스크롤하는 것뿐인데, 이건 흔히
 * 스크롤 하이재킹이라 불리며 잘못 만들면 원래보다 나빠진다. 그래서 아래 두
 * 가지를 지킨다:
 *
 *   1) **건드릴 때만 건드린다.** 트랙패드/터치처럼 잘게 자주 들어오는 입력,
 *      확대(ctrl+휠), 페이지 단위 스크롤, 그리고 모달·분할 뷰처럼 자체 스크롤
 *      영역 위에서는 손대지 않고 브라우저 기본 동작에 맡긴다.
 *   2) **관성을 흉내 낸다.** 늘린 거리를 그 자리에서 점프시키면 뚝뚝 끊긴다 —
 *      목표 지점을 누적해 두고 매 프레임 그쪽으로 당겨 붙인다.
 *
 * 되돌리려면 main.js 의 initWheelBoost() 호출 한 줄만 지우면 된다.
 */

/** 휠 한 칸당 이동 배수 — 1 이면 기본과 같다. (1.9 는 살짝 빠르다는 지적으로 하향) */
const MULT = 1.6;
/** 한 프레임에 남은 거리의 몇 %를 따라갈지 (클수록 빠르고 덜 미끄럽다) */
const FOLLOW = 0.24;
/** 이보다 작은 델타는 트랙패드/정밀 입력으로 보고 건드리지 않는다(px) */
const MIN_DELTA = 40;
/** deltaMode 가 "줄 단위"일 때 한 줄을 몇 px 로 볼지 */
const LINE_PX = 16;

let target = null;
let raf = null;

/** 문서 최대 스크롤 y */
function maxScroll() {
  return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
}

/**
 * 이벤트가 자체 스크롤 영역(모달 본문, 분할 뷰 pane 등) 안에서 났는지.
 * 그런 곳은 브라우저에 맡긴다 — 페이지를 대신 굴리면 모달이 안 움직인다.
 * @param {EventTarget} node
 */
function insideScrollable(node) {
  let el = node instanceof Element ? node : null;
  while (el && el !== document.body && el !== document.documentElement) {
    if (el.scrollHeight > el.clientHeight + 1) {
      const oy = getComputedStyle(el).overflowY;
      if (oy === "auto" || oy === "scroll") return true;
    }
    el = el.parentElement;
  }
  return false;
}

function step() {
  const cur = window.scrollY;
  const diff = target - cur;
  if (Math.abs(diff) < 0.5) {
    window.scrollTo(0, Math.round(target));
    target = null;
    raf = null;
    return;
  }
  window.scrollTo(0, Math.round(cur + diff * FOLLOW));
  raf = requestAnimationFrame(step);
}

function onWheel(e) {
  if (e.defaultPrevented) return;
  if (e.ctrlKey || e.metaKey) return;          // 확대/축소
  if (e.deltaMode === 2) return;               // 페이지 단위 — 그대로 둔다
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;  // 가로 스크롤
  const px = e.deltaMode === 1 ? e.deltaY * LINE_PX : e.deltaY;
  // 트랙패드는 작은 값이 촘촘히 들어온다 — 배수를 먹이면 걷잡을 수 없어진다.
  if (Math.abs(px) < MIN_DELTA) return;
  if (insideScrollable(e.target)) return;

  e.preventDefault();
  const base = target == null ? window.scrollY : target;
  const next = Math.min(maxScroll(), Math.max(0, base + px * MULT));
  // 모션 토글이 켜져 있으면 관성 없이 곧바로 옮긴다 — 이동 거리는 그대로
  // 늘리되(그게 이 기능의 목적) 미끄러지는 연출만 뺀다.
  if (document.body.classList.contains("reduce-motion")) {
    cancelWheelBoost();
    window.scrollTo(0, Math.round(next));
    return;
  }
  target = next;
  if (raf == null) raf = requestAnimationFrame(step);
}

/** 진행 중인 관성 이동을 버린다 — 다른 주체가 스크롤을 가져갈 때. */
export function cancelWheelBoost() {
  if (raf != null) cancelAnimationFrame(raf);
  raf = null;
  target = null;
}

/** main.js 가 부팅 시 1회 호출. */
export function initWheelBoost() {
  // passive:false 여야 preventDefault 가 먹는다.
  window.addEventListener("wheel", onWheel, { passive: false });
  // 키보드·터치로 스크롤을 가져가면 남아 있던 관성은 버린다(둘이 다투면 튄다).
  ["keydown", "touchstart"].forEach(type => {
    window.addEventListener(type, cancelWheelBoost, { passive: true });
  });
}
