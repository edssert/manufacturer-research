/**
 * ID 기반 도메인 레코드를 등록 순서대로 보존하면서 상수 시간에 조회한다.
 * 레코드 객체의 동일성은 유지하되 배열 구조는 복사해 호출자의 배열 변경이
 * 레지스트리 상태에 섞이지 않게 한다.
 */
export class EntityRegistry {
  #kind;
  #snapshot = Object.freeze([]);
  #byId = new Map();
  #revision = 0;

  /**
   * @param {string} kind 오류 메시지에 표시할 엔터티 종류
   */
  constructor(kind) {
    if (typeof kind !== "string" || !kind.trim()) {
      throw new TypeError("EntityRegistry kind must be a non-empty string");
    }
    this.#kind = kind.trim();
  }

  /**
   * 현재 레코드 전체를 새 스냅샷으로 교체한다. 검증을 마친 뒤에만 상태를
   * 교체하므로 잘못된 재등록이 기존의 정상 레지스트리를 손상시키지 않는다.
   * @param {readonly Object[]} list
   * @returns {readonly Object[]}
   */
  register(list) {
    if (!Array.isArray(list)) {
      throw new TypeError(`${this.#kind} registry expects an array`);
    }

    const snapshot = Object.freeze([...list]);
    const byId = new Map();

    snapshot.forEach((record, index) => {
      if (!record || typeof record !== "object" || Array.isArray(record)) {
        throw new TypeError(`${this.#kind} record at index ${index} must be an object`);
      }

      const { id } = record;
      if (typeof id !== "string" || !id.trim() || id !== id.trim()) {
        throw new TypeError(`${this.#kind} record at index ${index} has an invalid id`);
      }
      if (byId.has(id)) {
        throw new Error(`Duplicate ${this.#kind} id: ${id}`);
      }
      byId.set(id, record);
    });

    this.#snapshot = snapshot;
    this.#byId = byId;
    this.#revision += 1;
    return snapshot;
  }

  /** @param {string} id @returns {Object|null} */
  findById(id) {
    return this.#byId.get(id) || null;
  }

  /** @returns {readonly Object[]} */
  get snapshot() {
    return this.#snapshot;
  }

  /** @returns {number} */
  get revision() {
    return this.#revision;
  }
}
