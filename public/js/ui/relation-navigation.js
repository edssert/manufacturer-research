/**
 * @module ui/relation-navigation
 * 모달의 관계 훅을 단일 이벤트 위임으로 상세 provider와 연결한다.
 * 모달과 pane 내용은 교체돼도 최상위 #modal은 유지되므로 재배선이 필요 없다.
 */
import { replaceItemRoute, setItemRoute } from "../core/router.js";
import { detailTriggers, resolveDetail } from "../relationships/detail-registry.js";
import { openModalWith } from "./modal.js";
import { openSplitPane, replaceSplitPane1 } from "./split-view.js";

const initializedRoots = new WeakSet();
const INTERACTION_ONLY_SELECTOR = "[data-toggle-group], [data-section-toggle], [data-modal-close], [data-modal-back]";

function splitPaneProps(detail, restoreAmpConfigs = false) {
  return {
    headHTML: detail.head,
    paneColor: detail.color,
    bodyHTML: detail.body,
    paneId: detail.paneId,
    onMounted: pane => {
      pane.dataset.detailId = detail.id;
      pane.dataset.detailKind = detail.kind;
      if (!restoreAmpConfigs || detail.kind !== "amplifier") return;
      const button = pane.querySelector('[data-section-toggle="amp-configs"]');
      const body = pane.querySelector('[data-section-toggle-body="amp-configs"]');
      if (button && body) {
        button.setAttribute("aria-expanded", "true");
        body.hidden = false;
      }
    },
  };
}

function findRelationTrigger(start, root) {
  const ElementCtor = root.ownerDocument?.defaultView?.Element;
  if (!ElementCtor || !(start instanceof ElementCtor)) return null;
  const triggers = detailTriggers();
  for (let element = start; element; element = element.parentElement) {
    for (const trigger of triggers) {
      if (element.hasAttribute(trigger.attribute)) {
        return {
          element,
          id: element.getAttribute(trigger.attribute),
          kind: trigger.kind,
          attribute: trigger.attribute,
        };
      }
    }
    if (element === root) break;
  }
  return null;
}

function isSecondPane(element) {
  const pane = element.closest(".split-view__pane");
  const container = pane?.parentElement;
  if (!pane || !container?.classList.contains("split-view")) return false;
  const panes = [...container.children].filter(child => child.classList.contains("split-view__pane"));
  return panes[1] === pane;
}

function currentAmpConfigsExpanded(root) {
  const pane2 = root.querySelector(".split-view > .split-view__pane:nth-child(2)");
  return pane2?.querySelector('[data-section-toggle="amp-configs"]')?.getAttribute("aria-expanded") === "true";
}

/**
 * 등록된 상세를 카드의 기본 모달로 연다.
 * @param {string} id
 * @param {string} [expectedKind] 도메인 openItem이 다른 kind를 가로채지 않게 하는 경계
 */
export function openDetailModal(id, expectedKind) {
  const detail = resolveDetail(id);
  if (!detail || (expectedKind && detail.kind !== expectedKind)) return false;
  openModalWith(detail.color, detail.head, detail.body);
  setItemRoute(detail.id);
  return true;
}

/**
 * URL 복원과 관계 클릭이 공유하는 pane2 열기 경로.
 * @param {string} id
 * @param {HTMLElement} [root]
 * @param {{syncRoute?: boolean}} [options]
 */
export function openDetailPane(id, root = document.getElementById("modal"), { syncRoute = true } = {}) {
  const detail = resolveDetail(id);
  if (!detail || !root) return false;
  const restoreAmpConfigs = currentAmpConfigsExpanded(root);
  return openSplitPane({ ...splitPaneProps(detail, restoreAmpConfigs), syncRoute });
}

/**
 * 관계 클릭 한 건을 처리한다. pane1에서는 pane2를 열거나 같은 ID를 닫고,
 * pane2에서는 pane1만 교체해 비교 대상과 URL item을 함께 유지한다.
 */
export function handleRelationNavigation(event, root = document.getElementById("modal")) {
  const ElementCtor = root?.ownerDocument?.defaultView?.Element;
  if (!root || !ElementCtor || !(event.target instanceof ElementCtor)) return false;
  if (event.target.closest(INTERACTION_ONLY_SELECTOR)) return false;
  const trigger = findRelationTrigger(event.target, root);
  if (!trigger) return false;

  // 병합 이름의 안쪽 훅이 유효하지 않아도 부모 대표 행으로 이벤트가 새지
  // 않아야 한다. 가장 가까운 data-* 훅이 항상 최종 선택이다.
  event.stopPropagation();
  const detail = resolveDetail(trigger.id);
  if (!detail || detail.kind !== trigger.kind) return false;

  if (isSecondPane(trigger.element)) {
    const replaced = replaceSplitPane1({
      headHTML: detail.head,
      paneColor: detail.color,
      bodyHTML: detail.body,
      onMounted: pane => {
        pane.dataset.detailId = detail.id;
        pane.dataset.detailKind = detail.kind;
      },
    });
    if (replaced) replaceItemRoute(detail.id);
    return replaced;
  }

  return openDetailPane(detail.id, root);
}

/** #modal에 영속적인 관계 클릭 listener를 한 번만 등록한다. */
export function initRelationNavigation(root = document.getElementById("modal")) {
  if (!root || initializedRoots.has(root)) return false;
  root.addEventListener("click", event => handleRelationNavigation(event, root));
  initializedRoots.add(root);
  return true;
}
