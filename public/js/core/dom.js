/**
 * @module core/dom
 * 모든 도메인이 공유하는 소형 DOM/유틸 헬퍼.
 */

/**
 * querySelector 단축 헬퍼.
 * @param {string} s CSS 셀렉터
 * @param {ParentNode} [root=document] 탐색 루트
 * @returns {Element|null}
 */
export const $ = (s, root = document) => root.querySelector(s);

/**
 * querySelectorAll 단축 헬퍼 (배열 반환).
 * @param {string} s CSS 셀렉터
 * @param {ParentNode} [root=document] 탐색 루트
 * @returns {Element[]}
 */
export const $all = (s, root = document) => [...root.querySelectorAll(s)];

/**
 * HTML 이스케이프 — 템플릿 문자열에 데이터 값을 넣기 전 반드시 통과시킬 것.
 * @param {*} s 원본 값 (null/undefined 는 빈 문자열)
 * @returns {string}
 */
export const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/**
 * 배열 중복 제거 (원본 순서 유지).
 * @param {Array} a
 * @returns {Array}
 */
export const uniq = (a) => [...new Set(a)];

/**
 * 디바운스 — 연속 호출을 마지막 호출 후 ms 가 지난 시점 1회로 합친다.
 * [성능] 검색 입력마다 그리드 전체를 innerHTML 로 재생성하는 렌더 함수에
 * 사용 — 빠른 타이핑 중 불필요한 중간 렌더링을 건너뛴다.
 * @param {Function} fn 지연 실행할 함수
 * @param {number} [ms=120] 지연 시간 (ms)
 * @returns {Function}
 */
export function debounce(fn, ms = 120) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

/**
 * 레코드의 제품 이미지 뷰 목록을 반환한다 — [{label, src}, ...].
 * [v1.8 리팩토링] speakers.view.js / amplifiers.view.js 에 동일하게 존재하던
 * getViews() 중복을 공통 유틸로 추출 — 두 파일에서 이 함수를 그대로 import 해
 * 쓴다(로직 변경 없음).
 * 두 가지 데이터 형태를 지원한다:
 *   1) d.views 배열을 직접 선언 (임의 개수/라벨, 예: Front/Rear/Array/I·O)
 *   2) 레거시 img + imgBack 필드 (자동으로 [{Front, img}, {Rear, imgBack}] 로 변환)
 * views 가 없고 img 만 있으면 뷰 1개(Front)만 반환하고, img 도 없으면 빈 배열.
 * @param {Object} d 스피커 또는 앰프 레코드
 * @returns {{label: string, src: string}[]}
 */
export function getViews(d) {
  if (Array.isArray(d.views) && d.views.length) return d.views;
  if (!d.img) return [];
  const views = [{ label: "Front", src: d.img }];
  if (d.imgBack) views.push({ label: "Rear", src: d.imgBack });
  return views;
}
