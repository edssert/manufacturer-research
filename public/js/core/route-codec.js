/**
 * @module core/route-codec
 * URL 해시와 Split View 상태 문자열을 DOM 없이 파싱하고 직렬화한다.
 * 라우터와 딥링크 복원 코드는 이 모듈의 구조화된 결과만 사용한다.
 */

function decodeSegment(segment) {
  try {
    return { value: decodeURIComponent(segment), valid: true };
  } catch {
    return { value: segment, valid: false };
  }
}

function nonEmptyString(value) {
  return typeof value === "string" && value.length > 0;
}

/**
 * @param {string} hash `#domain/item/pane` 또는 선행 `#`가 없는 같은 문자열
 * @returns {{key:string, item:string, pane2:string, valid:boolean}}
 */
export function parseHashRoute(hash) {
  const source = String(hash ?? "");
  const body = source.startsWith("#") ? source.slice(1) : source;
  const parts = body.split("/");
  const structureValid = parts.length <= 3;
  const decoded = parts.slice(0, 3).map(decodeSegment);
  const [key = { value: "", valid: true }, item = { value: "", valid: true }, pane2 = { value: "", valid: true }] =
    decoded;
  const hierarchyValid = !pane2.value || Boolean(item.value);

  return {
    key: key.value,
    item: item.value,
    pane2: hierarchyValid ? pane2.value : "",
    valid: structureValid && hierarchyValid && decoded.every(part => part.valid),
  };
}

/**
 * @param {{key:string, item?:string, pane2?:string}} route
 * @returns {string}
 */
export function formatHashRoute({ key, item = "", pane2 = "" }) {
  if (!nonEmptyString(key)) throw new TypeError("route key는 비어 있지 않은 문자열이어야 합니다.");
  if (typeof item !== "string" || typeof pane2 !== "string") {
    throw new TypeError("route item과 pane2는 문자열이어야 합니다.");
  }
  if (pane2 && !item) throw new TypeError("pane2 route에는 item이 필요합니다.");

  const segments = [key];
  if (item) segments.push(item);
  if (pane2) segments.push(pane2);
  return `#${segments.map(encodeURIComponent).join("/")}`;
}

/**
 * pane 상태를 명시적인 세 형태로 변환한다.
 * @param {string} spec
 * @returns {{kind:"entity", entityId:string}|{kind:"media", mediaSlug:string}|{kind:"entity-media", entityId:string, mediaSlug:string}|null}
 */
export function parsePaneSpec(spec) {
  if (!nonEmptyString(spec)) return null;
  const parts = spec.split("~");
  if (parts.some(part => !part)) return null;

  if (parts.length === 1) {
    return { kind: "entity", entityId: parts[0] };
  }
  if (parts.length === 2 && parts[0] === "media") {
    return { kind: "media", mediaSlug: parts[1] };
  }
  if (parts.length === 3 && parts[1] === "media") {
    return { kind: "entity-media", entityId: parts[0], mediaSlug: parts[2] };
  }
  return null;
}

/**
 * @param {{kind:"entity", entityId:string}|{kind:"media", mediaSlug:string}|{kind:"entity-media", entityId:string, mediaSlug:string}} pane
 * @returns {string}
 */
export function formatPaneSpec(pane) {
  if (!pane || typeof pane !== "object") throw new TypeError("pane 상태 객체가 필요합니다.");
  const paneKind = String(/** @type {Record<string, unknown>} */ (pane).kind);
  const token = (value, name) => {
    if (!nonEmptyString(value) || value.includes("~")) {
      throw new TypeError(`${name}은 비어 있지 않고 '~'를 포함하지 않는 문자열이어야 합니다.`);
    }
    return value;
  };

  if (pane.kind === "entity") return token(pane.entityId, "entityId");
  if (pane.kind === "media") return `media~${token(pane.mediaSlug, "mediaSlug")}`;
  if (pane.kind === "entity-media") {
    return `${token(pane.entityId, "entityId")}~media~${token(pane.mediaSlug, "mediaSlug")}`;
  }
  throw new TypeError(`지원하지 않는 pane 상태입니다: ${paneKind}`);
}
