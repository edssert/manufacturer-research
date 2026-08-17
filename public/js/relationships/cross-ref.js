/**
 * @module relationships/cross-ref
 * 도메인 모듈 사이의 순환 import 없이 ID와 관계를 해석하는 레지스트리다.
 * 관계의 원본은 각 레코드 한쪽에만 두고 역방향 표시는 지연 인덱스로 만든다.
 */
import { EntityRegistry } from "./entity-registry.js";

const amplifiers = new EntityRegistry("amplifier");
const speakers = new EntityRegistry("speaker");
const accessories = new EntityRegistry("accessory");

let ampModelIndex = null;
let speakerRelationIndex = null;
let accessoryUsageIndex = null;

function invalidateDerivedIndexes() {
  ampModelIndex = null;
  speakerRelationIndex = null;
  accessoryUsageIndex = null;
}

/**
 * 제조사와 모델의 경계를 보존하는 키를 만든다. 문자열 연결 구분자가 실제
 * 필드에 들어와도 충돌하지 않도록 튜플을 직렬화한다.
 */
function modelKey(mfr, model) {
  return JSON.stringify([mfr, model]);
}

function getAmpModelIndex() {
  if (ampModelIndex) return ampModelIndex;

  const next = new Map();
  for (const amplifier of amplifiers.snapshot) {
    if (typeof amplifier.mfr !== "string" || typeof amplifier.model !== "string") continue;
    const key = modelKey(amplifier.mfr, amplifier.model);
    if (!next.has(key)) next.set(key, amplifier.id);
  }
  ampModelIndex = next;
  return ampModelIndex;
}

function resolveAmpId(mfr, model) {
  const index = getAmpModelIndex();
  const direct = index.get(modelKey(mfr, model));
  if (direct) return direct;

  if (typeof model === "string" && model.includes(" / ")) {
    const firstModel = model.split(" / ")[0].trim();
    return index.get(modelKey(mfr, firstModel)) || null;
  }
  return null;
}

function appendToIndex(index, key, value) {
  const values = index.get(key);
  if (values) values.push(value);
  else index.set(key, [value]);
}

function getSpeakerRelationIndex() {
  if (speakerRelationIndex) return speakerRelationIndex;

  const speakerIdsByAmpId = new Map();
  const configsByAmpId = new Map();

  for (const speaker of speakers.snapshot) {
    const matchedAmpIds = new Set();
    const ampRows = Array.isArray(speaker.amps) ? speaker.amps : [];

    for (const ampRow of ampRows) {
      const ampId = resolveAmpId(speaker.mk, ampRow && ampRow.model);
      if (!ampId) continue;

      if (!matchedAmpIds.has(ampId)) {
        appendToIndex(speakerIdsByAmpId, ampId, speaker.id);
        matchedAmpIds.add(ampId);
      }

      const configs = Array.isArray(ampRow.configs) ? ampRow.configs : [];
      for (const config of configs) {
        const presets = Array.isArray(config.splByPreset)
          ? config.splByPreset.filter(preset => preset && preset.spl != null)
          : [];

        if (presets.length) {
          for (const preset of presets) {
            appendToIndex(
              configsByAmpId,
              ampId,
              Object.freeze({
                speakerId: speaker.id,
                speakerName: speaker.name,
                mode: config.mode || "",
                preset: preset.preset,
                perCh: config.perCh != null ? config.perCh : null,
                total: config.total != null ? config.total : null,
                spl: preset.spl,
              }),
            );
          }
        } else {
          appendToIndex(
            configsByAmpId,
            ampId,
            Object.freeze({
              speakerId: speaker.id,
              speakerName: speaker.name,
              mode: config.mode || "",
              preset: null,
              perCh: config.perCh != null ? config.perCh : null,
              total: config.total != null ? config.total : null,
              spl: config.spl != null ? config.spl : null,
            }),
          );
        }
      }
    }
  }

  for (const [ampId, ids] of speakerIdsByAmpId) {
    speakerIdsByAmpId.set(ampId, Object.freeze(ids));
  }
  for (const [ampId, rows] of configsByAmpId) {
    configsByAmpId.set(ampId, Object.freeze(rows));
  }

  speakerRelationIndex = { speakerIdsByAmpId, configsByAmpId };
  return speakerRelationIndex;
}

function getAccessoryUsageIndex() {
  if (accessoryUsageIndex) return accessoryUsageIndex;

  const amplifierIdsByAccessoryId = new Map();
  const speakerIdsByAccessoryId = new Map();

  for (const amplifier of amplifiers.snapshot) {
    const ids = Array.isArray(amplifier.rack && amplifier.rack.relatedAccessoryIds)
      ? amplifier.rack.relatedAccessoryIds
      : [];
    for (const accessoryId of new Set(ids)) {
      appendToIndex(amplifierIdsByAccessoryId, accessoryId, amplifier.id);
    }
  }

  for (const speaker of speakers.snapshot) {
    const ids = Array.isArray(speaker.relations && speaker.relations.accessoryIds)
      ? speaker.relations.accessoryIds
      : [];
    for (const accessoryId of new Set(ids)) {
      appendToIndex(speakerIdsByAccessoryId, accessoryId, speaker.id);
    }
  }

  accessoryUsageIndex = { amplifierIdsByAccessoryId, speakerIdsByAccessoryId };
  return accessoryUsageIndex;
}

/** @param {readonly Object[]} list 전체 앰프 배열 */
export function registerAmplifiers(list) {
  amplifiers.register(list);
  invalidateDerivedIndexes();
}

/** @param {readonly Object[]} list 전체 스피커 배열 */
export function registerSpeakers(list) {
  speakers.register(list);
  invalidateDerivedIndexes();
}

/** @param {readonly Object[]} list 전체 액세서리 배열 */
export function registerAccessories(list) {
  accessories.register(list);
  invalidateDerivedIndexes();
}

/** @param {string} id @returns {Object|null} */
export function findAmplifierById(id) {
  return amplifiers.findById(id);
}

/** @param {string} id @returns {Object|null} */
export function findSpeakerById(id) {
  return speakers.findById(id);
}

/** @param {string} id @returns {Object|null} */
export function findAccessoryById(id) {
  return accessories.findById(id);
}

/**
 * @param {string[]} ids
 * @returns {{id:string, name:string, type:string}[]}
 */
export function accessoriesByIds(ids) {
  return (ids || [])
    .map(id => accessories.findById(id))
    .filter(Boolean)
    .map(accessory => ({ id: accessory.id, name: accessory.name, type: accessory.type }));
}

/**
 * @param {string} accessoryId
 * @returns {{id:string, name:string}[]}
 */
export function findAmplifiersUsingAccessory(accessoryId) {
  const { amplifierIdsByAccessoryId } = getAccessoryUsageIndex();
  return (amplifierIdsByAccessoryId.get(accessoryId) || []).map(id => {
    const amplifier = amplifiers.findById(id);
    return { id, name: amplifier.model };
  });
}

/**
 * @param {string} speakerId
 * @returns {{id:string, name:string, type:string}[]}
 */
export function findAccessoriesForSpeaker(speakerId) {
  const speaker = speakers.findById(speakerId);
  return accessoriesByIds(speaker && speaker.relations && speaker.relations.accessoryIds);
}

/**
 * @param {string} accessoryId
 * @returns {{id:string, name:string}[]}
 */
export function findSpeakersUsingAccessory(accessoryId) {
  const { speakerIdsByAccessoryId } = getAccessoryUsageIndex();
  return (speakerIdsByAccessoryId.get(accessoryId) || []).map(id => {
    const speaker = speakers.findById(id);
    return { id, name: speaker.name };
  });
}

/**
 * @param {string} accessoryId
 * @returns {{id:string, name:string, type:string}[]}
 */
export function findRelatedAccessories(accessoryId) {
  const accessory = accessories.findById(accessoryId);
  return accessoriesByIds(accessory && accessory.relatedAccessoryIds);
}

/**
 * 원본 데이터의 병합 모델 표기는 첫 모델을 fallback으로 해석한다.
 * @param {string} mfr 제조사 키
 * @param {string} model 앰프 모델 또는 병합 모델 문자열
 * @returns {string|null}
 */
export function resolveAmpIdForModel(mfr, model) {
  return resolveAmpId(mfr, model);
}

/**
 * 스피커의 amps[]가 앰프 관계의 단일 원본이다.
 * @param {string} ampId
 * @returns {string[]}
 */
export function findSpeakersMatchingAmp(ampId) {
  if (!amplifiers.findById(ampId)) return [];
  const { speakerIdsByAmpId } = getSpeakerRelationIndex();
  return [...(speakerIdsByAmpId.get(ampId) || [])];
}

/**
 * 스피커의 amps[].configs를 앰프 기준 행으로 투영한다.
 * @param {string} ampId
 * @returns {{speakerId:string, speakerName:string, mode:string, preset:string|null, perCh:number|null, total:number|null, spl:number|null}[]}
 */
export function findAmpConfigsBySpeaker(ampId) {
  if (!amplifiers.findById(ampId)) return [];
  const { configsByAmpId } = getSpeakerRelationIndex();
  return (configsByAmpId.get(ampId) || []).map(row => ({ ...row }));
}
