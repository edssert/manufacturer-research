/**
 * smoke.test.mjs — jsdom 기반 통합 스모크 테스트.
 *
 * 실제 브라우저 없이 index.html + main.js 전체 부팅을 재현해서
 * 탭 전환 · 카드 렌더링 · 모달 열기 · Split View 열기/닫기가
 * 런타임 에러 없이 동작하는지 검증한다.
 *
 * 준비: npm i jsdom (프로젝트 루트에서)
 * 실행: node public/tests/smoke.test.mjs   (프로젝트 루트에서)
 */
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { JSDOM } from "jsdom";

// [v1.8 재배치] tests/ 가 public/tests/ 로 이동하면서 index.html(루트 유지)까지
// 두 단계 위로 올라가야 한다 — 프로젝트 ROOT = public/tests/../.. .
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
let pass = 0, failCount = 0;
const check = (name, cond) => { cond ? pass++ : failCount++; console.log(`${cond ? "PASS" : "FAIL"} — ${name}`); };

// ── jsdom 부팅: index.html 로드 + 전역 노출 ──
const html = readFileSync(join(ROOT, "index.html"), "utf8");
const dom = new JSDOM(html, { url: "http://localhost/" });
global.window = dom.window;
global.document = dom.window.document;
global.location = dom.window.location;
global.HTMLElement = dom.window.HTMLElement;
// [모달 라우팅] core/router 가 history.replaceState 를 사용한다.
global.history = dom.window.history;
// [테스트 환경 보강] jsdom 은 matchMedia 를 구현하지 않는다 —
// isMobileLayout(ui/modal.js)이 호출하므로 데스크탑(false) 스텁을 제공.
dom.window.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} });

// main.js import → 모든 도메인 등록 + 기본 탭(speakers) 마운트까지 실행됨
await import(join(ROOT, "public/js/main.js"));
const { navigateTo } = await import(join(ROOT, "public/js/core/router.js"));

// ── 부팅 상태 검증 ──
check("Speakers 탭이 기본으로 마운트됨", document.querySelector("#view-speakers").hidden === false);
// [2026-07 현행화] Accessories·Test 탭 추가로 7개.
check("탭 7개 렌더링", document.querySelectorAll(".topnav__tab").length === 7);
check("활성 탭 변경자 적용", document.querySelector(".topnav__tab--active") !== null);
check("스피커 카드 렌더링(> 40장)", document.querySelectorAll("#spk-results .card").length > 40);
check("카드 그룹(시리즈) 헤더 존재", document.querySelectorAll("#spk-results .card-group__head").length > 5);
check("필터 칩 렌더링", document.querySelectorAll("#spk-filters .chip").length > 10);
check("상단바 부제(브랜드 목록) 주입", document.querySelector("#brand-subtitle").textContent.includes("L-Acoustics"));

// ── 모달 열기 (카드 클릭) ──
const firstCard = document.querySelector("#spk-results .card[data-id]");
firstCard.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
check("카드 클릭 → 모달 열림", document.querySelector("#modalbg").classList.contains("modal-overlay--open"));
check("모달 제목 존재", document.querySelector("#modal .modal__title") !== null);
check("모달 사양 표 렌더링", document.querySelectorAll("#modal .spec-table__cell").length > 3);
// [모달 라우팅] 카드 모달이 열리면 해시가 #speakers/<카드id> 로 바뀐다.
check("모달 열림 → URL 해시에 카드 id 기록", dom.window.location.hash === `#speakers/${encodeURIComponent(firstCard.dataset.id)}`);

// ── Split View (모달 안 앰프 행 클릭) ──
const ampRow = document.querySelector("#modal .match-table__row[data-amp-id]");
check("클릭 가능한 앰프 행 존재", ampRow !== null);
if (ampRow) {
  const ampId = ampRow.dataset.ampId;
  ampRow.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
  check("Split View 확장 변경자 적용", document.querySelector("#modal").classList.contains("modal--split"));
  check("pane 2 렌더링", document.querySelectorAll("#modal .split-view__pane").length === 2);
  // [모달 라우팅] pane2 상태가 해시 3번째 단에 기록된다.
  check("Split View → URL 해시에 pane2 기록", dom.window.location.hash.endsWith(`/${encodeURIComponent(ampId)}`));
  // [2026-07 현행화] pane2 헤더는 이제 pane1 과 동일한 .modal__head 구조 —
  // 닫기 버튼 셀렉터를 [data-modal-close] 로 변경.
  const closeBtn = document.querySelector("#modal .split-view__pane:nth-child(2) [data-modal-close]");
  closeBtn.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
  check("pane 2 닫기 → 단일 pane 복귀", document.querySelectorAll("#modal .split-view__pane").length === 0 && document.querySelector("#modal .modal__title") !== null);
  check("pane 2 닫기 → URL 해시에서 pane2 제거", !dom.window.location.hash.includes(encodeURIComponent(ampId)));
}

// ── 나머지 탭 전환 ──
for (const key of ["amplifiers", "dsps", "software", "brand", "speakers"]) {
  let ok = true;
  try { navigateTo(key); } catch (e) { ok = false; console.log("   에러:", e.message); }
  check(`탭 전환: ${key}`, ok && document.querySelector(`#view-${key === "speakers" ? "speakers" : key}`).hidden === false);
}
check("앰프 카드 렌더링", document.querySelectorAll("#amp-results .card").length >= 8);
// [2026-07 현행화] 브랜드 탭은 브랜드 스위치 방식 — 한 번에 1개 페이지만 렌더링.
check("브랜드 페이지 렌더링", document.querySelectorAll("#brand-results .brand-page").length === 1);
check("타임라인 렌더링", document.querySelectorAll("#brand-results .timeline__item").length > 5);

console.log(`\n결과: ${pass} PASS / ${failCount} FAIL`);
process.exit(failCount ? 1 : 0);
