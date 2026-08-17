/**
 * @module ui/toggle
 * 상단 도구 바(topnav__tools, js/ui/nav.js 가 마크업 생성)의 켜기/끄기 버튼들.
 *
 * 사진 숨기기·모션 끄기 토글이 "표식을 붙였다 뗀다 + localStorage 저장
 * + 버튼 aria-pressed 동기화"라는 같은 동작이라 이 모듈이 함께 담당한다.
 */

const store = (key, val) => {
  try {
    localStorage.setItem(key, val);
  } catch (e) {
    /* 저장 실패해도 전환 자체는 유지 */
  }
};
const read = key => {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
};

/**
 * 버튼 하나에 토글 동작을 연결한다 — 클릭 시 상태를 뒤집고 aria-pressed 를
 * 현재 상태에 맞춘다(CSS 가 이 속성을 읽어 아이콘 on/off 를 바꾼다).
 * @param {HTMLElement} btn 토글 버튼 (없으면 아무 일도 하지 않음)
 * @param {() => boolean} isOn 지금 켜져 있는지
 * @param {(on: boolean) => void} setOn 상태 적용(DOM 표식 + 저장)
 */
function wire(btn, isOn, setOn) {
  if (!btn) return;
  const sync = () => btn.setAttribute("aria-pressed", String(isOn()));
  sync();
  btn.addEventListener("click", () => {
    setOn(!isOn());
    sync();
  });
}

/**
 * body 클래스로 표현되는 토글(사진 숨기기·모션 끄기)의 공통 구현.
 * @param {HTMLElement} btn 토글 버튼
 * @param {string} key localStorage 키
 * @param {string} cls body 에 붙일 클래스명
 */
function bodyClassToggle(btn, key, cls) {
  wire(
    btn,
    () => document.body.classList.contains(cls),
    on => {
      document.body.classList.toggle(cls, on);
      store(key, on ? "1" : "0");
    },
  );
}

/**
 * 전 탭 카드 사진 숨기기 토글. 저장된 선호는 bootstrap-preferences.js가
 * CSS 로드 전에 적용한다.
 * @param {HTMLElement} btn #media-toggle
 */
export function initMediaToggle(btn) {
  bodyClassToggle(btn, "mr-hide-media", "hide-media");
}

/**
 * 전역 애니메이션/트랜지션 끄기 토글.
 * @param {HTMLElement} btn #motion-toggle
 */
export function initMotionToggle(btn) {
  if (read("mr-reduce-motion") === "1") document.body.classList.add("reduce-motion");
  bodyClassToggle(btn, "mr-reduce-motion", "reduce-motion");
}
