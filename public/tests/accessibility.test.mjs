/**
 * 키보드·포커스·ARIA 회귀 테스트.
 *
 * 실행: node public/tests/accessibility.test.mjs
 */
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { JSDOM } from "jsdom";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const imp = path => import(pathToFileURL(path).href);
let pass = 0;
let fail = 0;

function check(name, condition) {
  if (condition) pass++;
  else fail++;
  console.log(`${condition ? "PASS" : "FAIL"} — ${name}`);
}

function click(el) {
  el.dispatchEvent(new window.MouseEvent("click", { bubbles: true, cancelable: true }));
}

function keydown(target, key, shiftKey = false) {
  target.dispatchEvent(
    new window.KeyboardEvent("keydown", {
      key,
      shiftKey,
      bubbles: true,
      cancelable: true,
    }),
  );
}

// jsdom은 네이티브 버튼의 키보드 기본 동작을 합성하지 않으므로, 실제
// 브라우저의 Enter/Space 기본 활성화에 해당하는 click을 함께 실행한다.
function activateNativeButton(target, key) {
  target.focus();
  keydown(target, key);
  target.dispatchEvent(new window.KeyboardEvent("keyup", { key, bubbles: true, cancelable: true }));
  target.click();
}

function visibleFocusable(root) {
  return [
    ...root.querySelectorAll(
      "button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
    ),
  ].filter(el => el.tabIndex >= 0 && !el.closest("[hidden], [inert], [aria-hidden='true']"));
}

function duplicateIds(root = document) {
  const seen = new Set();
  const duplicates = new Set();
  root.querySelectorAll("[id]").forEach(el => {
    if (seen.has(el.id)) duplicates.add(el.id);
    seen.add(el.id);
  });
  return [...duplicates];
}

const INTERACTIVE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[role='button']",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function nestedInteractiveElements(root) {
  return [...root.querySelectorAll(INTERACTIVE_SELECTOR)].filter(element =>
    element.querySelector(INTERACTIVE_SELECTOR),
  );
}

const html = readFileSync(join(ROOT, "index.html"), "utf8");
const dom = new JSDOM(html, {
  url: "http://localhost/",
  pretendToBeVisual: true,
});

global.window = dom.window;
global.document = dom.window.document;
global.location = dom.window.location;
global.history = dom.window.history;
global.HTMLElement = dom.window.HTMLElement;
global.getComputedStyle = dom.window.getComputedStyle.bind(dom.window);
global.requestAnimationFrame = dom.window.requestAnimationFrame.bind(dom.window);

let mobileLayout = false;
dom.window.matchMedia = query => ({
  matches: query === "(max-width: 860px)" ? mobileLayout : false,
  media: query,
  addListener() {},
  removeListener() {},
  addEventListener() {},
  removeEventListener() {},
});
dom.window.IntersectionObserver = globalThis.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

await imp(join(ROOT, "public/js/main.js"));
const { navigateTo } = await imp(join(ROOT, "public/js/core/router.js"));
const { closeModal } = await imp(join(ROOT, "public/js/ui/modal.js"));

const overlay = document.getElementById("modalbg");
check(
  "닫힌 모달은 접근성 트리에서 제외됨",
  overlay.getAttribute("aria-hidden") === "true" &&
    !overlay.hasAttribute("role") &&
    !overlay.hasAttribute("aria-modal"),
);

const tabs = [...document.querySelectorAll(".topnav__tab")];
check(
  "탭과 패널의 ARIA 참조가 모두 연결됨",
  tabs.length === 6 &&
    tabs.every(tab => {
      const panel = document.getElementById(tab.getAttribute("aria-controls"));
      return (
        tab.id === `nav-tab-${tab.dataset.key}` &&
        panel?.getAttribute("role") === "tabpanel" &&
        panel.getAttribute("aria-labelledby") === tab.id
      );
    }),
);
check(
  "활성 탭만 순차 포커스에 참여함",
  tabs.every(tab => tab.tabIndex === (tab.getAttribute("aria-selected") === "true" ? 0 : -1)),
);

tabs[0].focus();
keydown(tabs[0], "ArrowRight");
check(
  "오른쪽 화살표가 다음 탭을 활성화하고 포커스함",
  document.activeElement === tabs[1] && tabs[1].getAttribute("aria-selected") === "true",
);
keydown(tabs[1], "End");
check(
  "End 키가 마지막 탭을 활성화함",
  document.activeElement === tabs[tabs.length - 1] && tabs.at(-1).getAttribute("aria-selected") === "true",
);
keydown(tabs.at(-1), "Home");
check(
  "Home 키가 첫 탭을 활성화함",
  document.activeElement === tabs[0] && tabs[0].getAttribute("aria-selected") === "true",
);

tabs.forEach(tab => navigateTo(tab.dataset.key));
navigateTo("speakers");
check("모든 탭을 빌드한 뒤에도 id가 고유함", duplicateIds().length === 0);
const filterToggle = document.getElementById("spk-filter-toggle");
const filterPanel = document.getElementById("spk-filters");
check(
  "접힌 필터는 제어 관계와 비활성 상태를 함께 노출함",
  filterToggle.getAttribute("aria-controls") === filterPanel.id &&
    filterToggle.getAttribute("aria-expanded") === "false" &&
    filterPanel.getAttribute("aria-hidden") === "true" &&
    filterPanel.hasAttribute("inert"),
);
click(filterToggle);
check(
  "필터를 펼치면 aria-hidden과 inert가 함께 해제됨",
  filterToggle.getAttribute("aria-expanded") === "true" &&
    filterPanel.getAttribute("aria-hidden") === "false" &&
    !filterPanel.hasAttribute("inert"),
);
click(filterToggle);

const sourceCard = document.querySelector('[data-id="spk-la-sb10i"]');
sourceCard.focus();
click(sourceCard);
const labelId = overlay.getAttribute("aria-labelledby");
check(
  "열린 모달에 dialog 이름과 모달 상태가 설정됨",
  overlay.getAttribute("role") === "dialog" &&
    overlay.getAttribute("aria-modal") === "true" &&
    overlay.getAttribute("aria-hidden") === "false" &&
    !!labelId &&
    document.getElementById(labelId)?.classList.contains("modal__title"),
);
check("모달을 열면 제목으로 초기 포커스가 이동함", document.activeElement === document.getElementById(labelId));
check(
  "모달 배경의 주요 앱 영역이 inert 처리됨",
  ["topbar", "topnav", "domain-views"].every(id => document.getElementById(id).hasAttribute("inert")),
);

let focusable = visibleFocusable(document.getElementById("modal"));
focusable.at(-1).focus();
keydown(document, "Tab");
check("Tab이 모달 끝에서 처음으로 순환함", document.activeElement === focusable[0]);
focusable[0].focus();
keydown(document, "Tab", true);
check("Shift+Tab이 모달 처음에서 끝으로 순환함", document.activeElement === focusable.at(-1));

const relationRow = document.querySelector("#modal .match-table__row[data-amp-id]");
const relationControl = relationRow.querySelector(".match-table__relation-trigger[data-amp-id]");
const nestedToggle = relationRow.querySelector(".match-table__toggle-btn");
check(
  "관계 표는 행 의미와 독립 네이티브 관계 버튼을 함께 유지함",
  relationRow.getAttribute("role") === "row" &&
    relationRow.tabIndex === -1 &&
    relationControl?.tagName === "BUTTON" &&
    relationControl.parentElement?.getAttribute("role") === "cell",
);
check(
  "관계 버튼과 +N 버튼 사이에 중첩 인터랙티브 요소가 없음",
  relationControl?.parentElement === nestedToggle?.parentElement &&
    nestedInteractiveElements(document.getElementById("modal")).length === 0,
);
nestedToggle.focus();
click(nestedToggle);
check(
  "행 안의 펼치기 버튼은 관계 상세를 함께 열지 않음",
  nestedToggle.getAttribute("aria-expanded") === "true" && !document.querySelector("#modal .split-view"),
);

activateNativeButton(relationControl, " ");
const pane2 = document.querySelector("#modal .split-view__pane:nth-child(2)");
check(
  "Space로 관계 버튼을 활성화하면 pane 2가 열리고 포커스가 이동함",
  !!pane2 && pane2.contains(document.activeElement) && document.activeElement.classList.contains("modal__title"),
);
check(
  "분할 pane을 연 뒤에도 인터랙티브 요소가 중첩되지 않음",
  nestedInteractiveElements(document.getElementById("modal")).length === 0,
);
const splitDuplicateIds = duplicateIds();
check(
  `Split View에도 중복 id가 없음${splitDuplicateIds.length ? ` (${splitDuplicateIds.join(", ")})` : ""}`,
  splitDuplicateIds.length === 0,
);

keydown(document, "Escape");
check(
  "첫 Escape는 pane 2만 닫고 관계 버튼으로 포커스를 복원함",
  overlay.classList.contains("modal-overlay--open") &&
    !document.querySelector("#modal .split-view") &&
    document.activeElement === relationControl,
);
keydown(document, "Escape");
check(
  "두 번째 Escape는 모달을 닫고 원래 카드로 포커스를 복원함",
  overlay.getAttribute("aria-hidden") === "true" &&
    !overlay.hasAttribute("role") &&
    document.activeElement === sourceCard &&
    ["topbar", "topnav", "domain-views"].every(id => !document.getElementById(id).hasAttribute("inert")),
);
keydown(document, "Escape");
check("닫힌 모달에서는 Escape가 포커스를 바꾸지 않음", document.activeElement === sourceCard);

mobileLayout = true;
sourceCard.focus();
click(sourceCard);
const mobileRelationRow = document.querySelector("#modal .match-table__row[data-amp-id]");
const mobileRelationControl = mobileRelationRow.querySelector(".match-table__relation-trigger[data-amp-id]");
activateNativeButton(mobileRelationControl, "Enter");
const mobileBack = document.querySelector("#modal [data-modal-back]");
check(
  "모바일 관계 이동은 전체 pane을 교체하고 새 제목에 포커스함",
  !!mobileBack &&
    !document.querySelector("#modal .split-view") &&
    document.activeElement.classList.contains("modal__title"),
);
click(document.querySelector("#modal .modal__media"));
const mobileMediaLabelId = overlay.getAttribute("aria-labelledby");
const mobileMediaLabel = document.getElementById(mobileMediaLabelId);
check(
  "모바일 media 전체교체도 실제 텍스트로 dialog 이름과 초기 포커스를 제공함",
  !!mobileMediaLabel &&
    mobileMediaLabel.classList.contains("modal__title--sr-only") &&
    mobileMediaLabel.textContent.trim().length > 0 &&
    document.activeElement === mobileMediaLabel,
);
click(document.querySelector("#modal [data-modal-back]"));
click(document.querySelector("#modal [data-modal-back]"));
const restoredMobileRow = document.querySelector(
  `#modal .match-table__row[data-amp-id="${mobileRelationRow.dataset.ampId}"]`,
);
const restoredMobileControl = restoredMobileRow?.querySelector(".match-table__relation-trigger[data-amp-id]");
check(
  "모바일 뒤로가기는 재생성된 원래 관계 버튼으로 포커스를 복원함",
  !!restoredMobileControl && document.activeElement === restoredMobileControl,
);
const mobileDuplicateIds = duplicateIds();
check(
  `모바일 push/pop 뒤에도 중복 id가 없음${mobileDuplicateIds.length ? ` (${mobileDuplicateIds.join(", ")})` : ""}`,
  mobileDuplicateIds.length === 0,
);
closeModal();

console.log(`\n결과: ${pass} PASS / ${fail} FAIL`);
process.exit(fail ? 1 : 0);
