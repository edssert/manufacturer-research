/**
 * @module core/router
 * 해시 기반 미니 라우터 — 활성 도메인 탭 전환 + 카드 상세 모달 딥링크 담당.
 * 각 도메인이 registerDomain() 으로 스스로 등록하면, 라우터는 어느 탭이
 * 활성인지와 URL 해시 동기화(링크 공유/뒤로가기)만 책임진다.
 *
 * 해시 형식 (최대 3단): #<도메인>/<카드id>/<pane2 상태>
 *   #speakers                          — 도메인 탭
 *   #speakers/la-k2                    — 카드 상세 모달 (개별 공유 가능 URL)
 *   #speakers/la-k2/amp-la-la12x       — Split View: [좌] 카드 상세 [우] 연관 항목 상세
 *   #speakers/la-k2/media~front        — Split View: [좌] 카드 상세 [우] 사진 확대(front 뷰)
 *   #speakers/la-k2/amp-la-la12x~media~front
 *                                      — Split View: [좌] 카드 상세 [우] 연관 항목(앰프)의 사진 확대
 * 카드 모달을 열면 히스토리 엔트리가 쌓여 브라우저 뒤로가기로 모달이 닫히고,
 * 해시가 담긴 URL 로 진입하면 모달·Split View 상태가 그대로 복원된다(딥링크).
 * pane2(3번째 단)는 replaceState 로만 기록해 히스토리를 어지럽히지 않는다 —
 * 공유용 URL 반영이 목적이고, 뒤로가기 1회는 "모달 전체 닫기"로 동작한다.
 */

import { formatHashRoute, parseHashRoute } from "./route-codec.js";

/** @type {Map<string, {label: string, mount: Function, unmount: Function, count?: Function, openItem?: Function}>} */
const registry = new Map();
let activeKey = null;
let activeItem = ""; // 현재 해시에 반영된 카드 상세(item) id ("" = 없음)
let activePane2 = ""; // 현재 해시에 반영된 Split View pane2 상태 ("" = 없음)
let onChangeCb = null;
let onItemCloseCb = null; // item 이 해시에서 사라질 때 호출 (main.js 가 closeModal 연결)
let onPane2RestoreCb = null; // 딥링크의 pane2 상태 복원 담당 (main.js 가 등록)
let onPane2CloseCb = null; // 해시에서 pane2 가 사라질 때 호출 (main.js 가 closeSplitView 연결)

/**
 * 현재 location.hash 를 { key, item, pane2 } 으로 파싱한다.
 * @returns {{key: string, item: string, pane2: string, valid: boolean}}
 */
function parseHash() {
  const route = parseHashRoute(location.hash);
  if (route.valid) return route;
  return { key: route.key, item: "", pane2: "", valid: false };
}

/** 현재 상태를 해시 문자열로 조립한다. */
function buildHash() {
  return formatHashRoute({ key: activeKey, item: activeItem, pane2: activePane2 });
}

/** 활성 도메인 우선으로 등록 provider에서 item 상세를 연다. */
function openRegisteredItem(key, item) {
  const config = registry.get(key);
  if (config?.openItem?.(item)) return true;
  for (const [registeredKey, registeredConfig] of registry) {
    if (registeredKey !== key && registeredConfig.openItem?.(item)) return true;
  }
  return false;
}

/**
 * 도메인을 라우터에 등록한다. 각 도메인 controller 의 init 함수가 호출.
 * @param {string} key 라우트 키 (URL 해시로 사용, 예: "speakers")
 * @param {Object} config
 * @param {string} config.label 탭에 표시할 이름
 * @param {Function} config.mount 탭 활성화 시 호출 (뷰 표시/빌드)
 * @param {Function} config.unmount 탭 비활성화 시 호출 (뷰 숨김)
 * @param {Function} [config.count] 탭 배지에 표시할 항목 수 반환
 * @param {Function} [config.openItem] (id) => boolean — 해시의 item 부분으로
 *   카드 상세 모달을 연다(딥링크/뒤로가기 복원용). id 가 유효하지 않으면
 *   false 를 반환해야 하며, 이때 라우터가 해시에서 item 을 지운다.
 */
export function registerDomain(key, config) {
  registry.set(key, config);
}

/**
 * 등록된 모든 도메인 [key, config] 쌍 목록 (등록 순서 = 탭 순서).
 * @returns {Array<[string, Object]>}
 */
export function getDomains() {
  return [...registry.entries()];
}

/**
 * 라우트 변경 콜백 등록 (nav 의 활성 탭 표시 동기화용).
 * @param {Function} cb (newKey, prevKey) => void
 */
export function onRouteChange(cb) {
  onChangeCb = cb;
}

/**
 * 카드 상세(item)가 해시에서 사라졌을 때(뒤로가기/탭 전환) 호출할 콜백 등록.
 * main.js 가 modal 의 closeModal 을 연결한다 — 라우터(core)가 ui/modal 을
 * 직접 import 하지 않기 위한 의존성 역전.
 * @param {Function} cb () => void
 */
export function onItemClose(cb) {
  onItemCloseCb = cb;
}

/**
 * 딥링크 해시의 pane2 상태(3번째 단)를 화면에 복원할 콜백 등록 — main.js 가
 * DOM 클릭 시뮬레이션 기반 복원 함수를 연결한다.
 * @param {Function} cb (pane2Spec: string) => void
 */
export function onPane2Restore(cb) {
  onPane2RestoreCb = cb;
}

/**
 * 해시에서 pane2 상태가 사라졌을 때(URL 직접 수정 등) Split View pane2 를
 * 닫을 콜백 등록 — main.js 가 split-view 의 closeSplitView 를 연결한다.
 * @param {Function} cb () => void
 */
export function onPane2Close(cb) {
  onPane2CloseCb = cb;
}

/**
 * 지정한 도메인으로 전환한다 (이전 도메인 unmount → 새 도메인 mount).
 * @param {string} key 이동할 라우트 키
 */
export function navigateTo(key) {
  if (!registry.has(key)) return;
  if (activeKey === key) return;
  const prev = activeKey;
  activeKey = key;
  // [모달 라우팅] 해시에는 "key/item" 2단이 올 수 있으므로 key 부분만 비교 —
  // 통짜 비교(slice(1) !== key)면 딥링크 진입 시 item 부분을 지워버린다.
  if (parseHash().key !== key) location.hash = formatHashRoute({ key });
  if (prev && registry.get(prev).unmount) registry.get(prev).unmount();
  registry.get(key).mount();
  if (onChangeCb) onChangeCb(key, prev);
}

/**
 * 현재 활성 라우트 키.
 * @returns {string|null}
 */
export function getActiveKey() {
  return activeKey;
}

/**
 * 카드 상세 모달이 열릴 때 해시에 item 을 기록한다 — 각 도메인의
 * openXxxModal() 이 모달을 연 뒤 호출. location.hash 대입은 히스토리
 * 엔트리를 쌓으므로 브라우저 뒤로가기가 "모달 닫기"로 동작한다.
 * 딥링크(해시 → openItem) 경로로 이미 activeItem 이 같은 값이면 중복
 * 기록하지 않는다(해시 재대입으로 인한 hashchange 루프 방지).
 * @param {string} id 카드 id
 */
export function setItemRoute(id) {
  if (!activeKey || activeItem === id) return;
  activeItem = id;
  activePane2 = ""; // 새 카드 모달 = pane2 없는 초기 상태
  location.hash = buildHash();
}

/**
 * Split View 안에서 pane1(왼쪽) 내용이 다른 항목으로 교체될 때 해시의
 * item 부분만 바꾼다 — pane2 상태는 유지, replaceState 라 히스토리에
 * 새 엔트리를 쌓지 않는다 (replaceSplitPane1 경로에서 호출).
 * @param {string} id 새 pane1 카드 id
 */
export function replaceItemRoute(id) {
  if (!activeKey || activeItem === id) return;
  activeItem = id;
  history.replaceState(null, "", buildHash());
}

/**
 * 모달이 URL 외 경로(X 버튼·ESC·배경 클릭)로 닫힐 때 해시에서 item 을
 * 지운다 — replaceState 라 히스토리 엔트리를 추가로 쌓지 않고,
 * hashchange 이벤트도 발생시키지 않아 닫기 루프가 생기지 않는다.
 */
export function clearItemRoute() {
  if (!activeItem) return;
  activeItem = "";
  activePane2 = "";
  history.replaceState(null, "", formatHashRoute({ key: activeKey }));
}

/**
 * Split View pane2 상태를 해시 3번째 단에 기록한다 — split-view.js 가
 * pane2 를 열거나 교체할 때 호출. replaceState 라 pane2 를 아무리 바꿔도
 * 히스토리 엔트리는 카드 모달 1개(item 단계)만 유지된다.
 * @param {string} spec pane2 상태 문자열 — 연관 항목 id ("amp-la-la12x"),
 *   pane1 사진 확대 ("media~front"), pane2 항목의 사진 확대
 *   ("amp-la-la12x~media~front") 세 형태.
 */
export function setPane2Route(spec) {
  if (!activeItem || activePane2 === spec) return;
  activePane2 = spec;
  history.replaceState(null, "", buildHash());
}

/**
 * Split View pane2 가 닫힐 때 해시 3번째 단을 지운다 (replaceState).
 */
export function clearPane2Route() {
  if (!activePane2) return;
  activePane2 = "";
  history.replaceState(null, "", buildHash());
}

/**
 * 해시가 가리키는 상태(도메인 + 카드 상세 + pane2)를 화면에 반영한다.
 * @param {string} key 도메인 키
 * @param {string} item 카드 id ("" = 상세 없음)
 * @param {string} pane2 Split View pane2 상태 ("" = 없음)
 */
function applyRoute(key, item, pane2) {
  navigateTo(key);
  if (item && item !== activeItem) {
    activeItem = item;
    // 새 item의 pane 상태는 빈 문자열까지 포함해 먼저 확정한다. openItem이
    // 기존 Split View DOM을 교체하는 동안 setItemRoute가 같은 item이라 no-op
    // 이어도 이전 item의 pane 상태가 라우터에 남지 않는다.
    activePane2 = pane2;
    if (!openRegisteredItem(key, item)) {
      clearItemRoute();
      return;
    }
    if (pane2 && onPane2RestoreCb) onPane2RestoreCb(pane2);
  } else if (!item && activeItem) {
    // 뒤로가기 등으로 item 이 사라짐 → 모달 닫기
    activeItem = "";
    activePane2 = "";
    if (onItemCloseCb) onItemCloseCb();
  } else if (item && item === activeItem && pane2 !== activePane2) {
    // 같은 item의 URL pane 상태를 직접 바꾸면 현재 DOM도 URL 스냅샷에서
    // 다시 만든다. 모바일 전체교체 스택과 데스크탑 split 어느 쪽이었든
    // 이전 구조가 남지 않고 같은 복원 경로를 공유한다.
    activePane2 = pane2;
    if (!openRegisteredItem(key, item)) {
      clearItemRoute();
      return;
    }
    if (pane2) {
      if (onPane2RestoreCb) onPane2RestoreCb(pane2);
    } else if (onPane2CloseCb) onPane2CloseCb();
  }
}

/**
 * breakpoint 전환처럼 URL은 그대로이고 표현 방식만 달라질 때 현재 스냅샷을
 * 다시 렌더링한다. activeItem/activePane2는 바꾸지 않아 history도 보존한다.
 */
export function refreshActiveRoute() {
  if (!activeKey || !activeItem) return false;
  if (!openRegisteredItem(activeKey, activeItem)) {
    clearItemRoute();
    return false;
  }
  if (activePane2 && onPane2RestoreCb) onPane2RestoreCb(activePane2);
  return true;
}

/**
 * 라우터 시작 — URL 해시가 유효하면 그 탭(+카드 상세/Split View 딥링크)으로,
 * 아니면 기본 탭으로 진입.
 * @param {string} defaultKey 기본 라우트 키
 */
export function initRouter(defaultKey) {
  window.addEventListener("hashchange", () => {
    const { key, item, pane2, valid } = parseHash();
    if (!valid && registry.has(key)) {
      history.replaceState(null, "", formatHashRoute({ key }));
    }
    if (registry.has(key)) applyRoute(key, item, pane2);
  });
  const { key, item, pane2, valid } = parseHash();
  if (!valid && registry.has(key)) {
    history.replaceState(null, "", formatHashRoute({ key }));
  }
  if (registry.has(key)) applyRoute(key, item, pane2);
  else navigateTo(defaultKey);
}
