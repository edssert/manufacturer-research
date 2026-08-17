/**
 * @module core/manufacturers
 * 모든 도메인이 공유하는 제조사 식별자와 표시 메타데이터의 단일 원본이다.
 */

/** @typedef {"la"|"db"|"my"} ManufacturerId */

/** @type {readonly ManufacturerId[]} */
export const MANUFACTURER_ORDER = Object.freeze(["la", "db", "my"]);

export const MANUFACTURERS = Object.freeze({
  la: Object.freeze({ id: "la", name: "L-Acoustics", color: "var(--la)", short: "L-ACOUSTICS" }),
  db: Object.freeze({ id: "db", name: "d&b audiotechnik", color: "var(--db)", short: "d&b" }),
  my: Object.freeze({ id: "my", name: "Meyer Sound", color: "var(--my)", short: "MEYER" }),
});

/** @type {Map<string, ManufacturerId>} */
const MANUFACTURER_ID_BY_NAME = new Map(
  Object.values(MANUFACTURERS).map(manufacturer => [manufacturer.name, manufacturer.id]),
);

/**
 * @param {unknown} value
 * @returns {value is ManufacturerId}
 */
function isManufacturerId(value) {
  return typeof value === "string" && Object.hasOwn(MANUFACTURERS, value);
}

/**
 * 도메인별 과도기 필드(`mk` 또는 `mfr`)를 공통 제조사 ID로 읽는다.
 * 원본 레코드를 바꾸지 않으므로 데이터 마이그레이션 중에도 사용할 수 있다.
 * @param {{mk?:string, mfr?:string}|null|undefined} record
 * @returns {"la"|"db"|"my"|null}
 */
export function manufacturerIdOf(record) {
  if (!record || typeof record !== "object") return null;
  if (isManufacturerId(record.mk)) return record.mk;
  if (typeof record.mfr !== "string") return null;
  if (isManufacturerId(record.mfr)) return record.mfr;
  return MANUFACTURER_ID_BY_NAME.get(record.mfr) || null;
}

/**
 * @param {string} id
 * @returns {{id:string, name:string, color:string, short:string}|null}
 */
export function manufacturerById(id) {
  return isManufacturerId(id) ? MANUFACTURERS[id] : null;
}
