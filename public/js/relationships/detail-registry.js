/**
 * @module relationships/detail-registry
 * 상세 화면 provider를 ID와 HTML data-* 훅에 연결하는 전역 레지스트리다.
 * 도메인은 자기 레코드와 순수 view 함수만 등록하고, UI 계층은 도메인 import
 * 없이 resolveDetail() 하나로 모달과 Split View 내용을 만든다.
 */

const KIND_PATTERN = /^[a-z][a-z0-9-]*$/;
const ATTRIBUTE_PATTERN = /^data-[a-z][a-z0-9-]*-id$/;

function assertProvider(provider) {
  if (!provider || typeof provider !== "object") {
    throw new TypeError("Detail provider must be an object");
  }
  const { kind, attribute, records, render, label } = provider;
  if (typeof kind !== "string" || !KIND_PATTERN.test(kind)) {
    throw new TypeError(`Invalid detail provider kind: ${String(kind)}`);
  }
  if (typeof attribute !== "string" || !ATTRIBUTE_PATTERN.test(attribute)) {
    throw new TypeError(`Invalid detail provider attribute: ${String(attribute)}`);
  }
  if (!Array.isArray(records)) {
    throw new TypeError(`${kind} detail provider expects a records array`);
  }
  if (typeof render !== "function") {
    throw new TypeError(`${kind} detail provider expects a render function`);
  }
  if (label != null && typeof label !== "function") {
    throw new TypeError(`${kind} detail provider label must be a function`);
  }
}

function normalizeDetail(entry, rendered) {
  if (!rendered || typeof rendered !== "object") {
    throw new TypeError(`${entry.kind} detail renderer returned no detail for ${entry.id}`);
  }
  const { color, head, body } = rendered;
  if (typeof color !== "string" || typeof head !== "string" || typeof body !== "string") {
    throw new TypeError(`${entry.kind} detail renderer returned an invalid shape for ${entry.id}`);
  }
  if (rendered.paneId != null && rendered.paneId !== entry.id) {
    throw new Error(`${entry.kind} detail paneId must match its registered id: ${entry.id}`);
  }
  return Object.freeze({
    id: entry.id,
    kind: entry.kind,
    attribute: entry.attribute,
    color,
    head,
    body,
    paneId: entry.id,
  });
}

/** 상세 provider를 독립적으로 구성할 수 있는 레지스트리. */
export class DetailRegistry {
  #providersByKind = new Map();
  #kindsByAttribute = new Map();
  #entriesById = new Map();

  /**
   * provider와 그 provider가 소유한 모든 ID를 원자적으로 등록한다.
   * kind, attribute, ID가 겹치면 일부만 등록하지 않고 즉시 실패한다.
   * @param {{kind:string, attribute:string, records:readonly Object[], render:Function, label?:Function}} provider
   */
  register(provider) {
    assertProvider(provider);
    const { kind, attribute, records, render, label } = provider;
    if (this.#providersByKind.has(kind)) throw new Error(`Duplicate detail provider kind: ${kind}`);
    if (this.#kindsByAttribute.has(attribute)) throw new Error(`Duplicate detail provider attribute: ${attribute}`);

    const localIds = new Set();
    const entries = records.map(record => {
      const id = record && record.id;
      if (typeof id !== "string" || !id.trim()) {
        throw new TypeError(`${kind} detail provider contains an invalid id`);
      }
      if (localIds.has(id) || this.#entriesById.has(id)) {
        throw new Error(`Duplicate detail entity id: ${id}`);
      }
      localIds.add(id);
      return Object.freeze({ id, kind, attribute, record, render, label: label || null });
    });

    const registeredProvider = Object.freeze({ kind, attribute, records: Object.freeze([...records]) });
    this.#providersByKind.set(kind, registeredProvider);
    this.#kindsByAttribute.set(attribute, kind);
    entries.forEach(entry => this.#entriesById.set(entry.id, entry));
    return registeredProvider;
  }

  /** @returns {readonly {kind:string, attribute:string}[]} 등록 순서의 trigger 계약 */
  get triggers() {
    return Object.freeze(
      [...this.#providersByKind.values()].map(({ kind, attribute }) => Object.freeze({ kind, attribute })),
    );
  }

  /** @param {string} id @returns {string|null} */
  kindOf(id) {
    return this.#entriesById.get(id)?.kind || null;
  }

  /** @param {string} attribute @returns {string|null} */
  kindForAttribute(attribute) {
    return this.#kindsByAttribute.get(attribute) || null;
  }

  /**
   * @param {string} id
   * @returns {{id:string, kind:string, attribute:string, color:string, head:string, body:string, paneId:string}|null}
   */
  resolve(id) {
    const entry = this.#entriesById.get(id);
    return entry ? normalizeDetail(entry, entry.render(entry.record)) : null;
  }

  /** @param {string} id @returns {string|null} */
  label(id) {
    const entry = this.#entriesById.get(id);
    if (!entry) return null;
    const value = entry.label ? entry.label(entry.record) : entry.record.name || entry.record.model || id;
    return value == null ? null : String(value);
  }
}

const detailRegistry = new DetailRegistry();

/** @param {Parameters<DetailRegistry["register"]>[0]} provider */
export function registerDetailProvider(provider) {
  return detailRegistry.register(provider);
}

/** @param {string} id */
export function resolveDetail(id) {
  return detailRegistry.resolve(id);
}

/** @param {string} id */
export function detailKindOf(id) {
  return detailRegistry.kindOf(id);
}

/** @param {string} id */
export function detailLabelOf(id) {
  return detailRegistry.label(id);
}

/** 등록된 data-* 훅과 kind의 읽기 전용 목록. */
export function detailTriggers() {
  return detailRegistry.triggers;
}
