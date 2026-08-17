/**
 * @module core/data-contracts
 * 런타임 레코드의 최소 구조를 도메인별로 검증한다. UI 필터 설정인
 * `*.schema.js`와 데이터 계약을 분리해 두 역할을 혼동하지 않게 한다.
 */
import { MANUFACTURERS, manufacturerIdOf } from "./manufacturers.js";

export const DATA_DOMAINS = Object.freeze({
  speakers: Object.freeze({ idPrefix: "spk-", labelField: "name" }),
  amplifiers: Object.freeze({ idPrefix: "amp-", labelField: "model" }),
  dsps: Object.freeze({ idPrefix: "dsp-", labelField: "model" }),
  software: Object.freeze({ idPrefix: "sw-", labelField: "name" }),
  accessories: Object.freeze({ idPrefix: "acc-", labelField: "name" }),
  brand: Object.freeze({ idPrefix: "brand-", labelField: "name" }),
});

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function validateRelationArray(record, field, issues, basePath, { required = true } = {}) {
  const value = record.relations?.[field];
  if (value === undefined && !required) return;
  if (!Array.isArray(value)) {
    issues.push({
      path: `${basePath}.relations.${field}`,
      code: "expected-array",
      message: "관계 ID 목록은 배열이어야 합니다.",
    });
    return;
  }
  value.forEach((id, index) => {
    if (typeof id !== "string" || !id) {
      issues.push({
        path: `${basePath}.relations.${field}[${index}]`,
        code: "invalid-reference",
        message: "관계 ID는 비어 있지 않은 문자열이어야 합니다.",
      });
    }
  });
}

function validateDomainShape(domain, record, issues, basePath) {
  if (domain === "speakers") {
    if (record.mk !== manufacturerIdOf(record) || record.mfr !== MANUFACTURERS[record.mk]?.name) {
      issues.push({
        path: `${basePath}.mfr`,
        code: "manufacturer-mismatch",
        message: "Speaker의 mk 코드와 mfr 표시명이 일치해야 합니다.",
      });
    }
    for (const field of ["series", "type"]) {
      if (field === "type" && record.pending === true && record[field] == null) continue;
      if (typeof record[field] !== "string" || !record[field]) {
        issues.push({
          path: `${basePath}.${field}`,
          code: "required-string",
          message: `${field}는 비어 있지 않은 문자열이어야 합니다.`,
        });
      }
    }
    if (!Array.isArray(record.amps)) {
      issues.push({ path: `${basePath}.amps`, code: "expected-array", message: "앰프 매칭 원본은 배열이어야 합니다." });
    } else {
      record.amps.forEach((row, index) => {
        if (!isObject(row) || typeof row.model !== "string" || !row.model || !Array.isArray(row.configs)) {
          issues.push({
            path: `${basePath}.amps[${index}]`,
            code: "invalid-amp-row",
            message: "앰프 행에는 model 문자열과 configs 배열이 필요합니다.",
          });
        }
      });
    }
    validateRelationArray(record, "ampIds", issues, basePath);
    validateRelationArray(record, "accessoryIds", issues, basePath, { required: false });
    return;
  }

  if (domain === "amplifiers") {
    if (!Array.isArray(record.views) || record.views.length === 0) {
      issues.push({
        path: `${basePath}.views`,
        code: "required-views",
        message: "Amplifier에는 한 개 이상의 제품 뷰가 필요합니다.",
      });
    }
    if (!Number.isFinite(record.channels) || record.channels <= 0) {
      issues.push({ path: `${basePath}.channels`, code: "invalid-number", message: "channels는 양수여야 합니다." });
    }
    validateRelationArray(record, "speakerIds", issues, basePath);
    return;
  }

  if (domain === "dsps") {
    validateRelationArray(record, "softwareIds", issues, basePath);
    if (!isObject(record.ioSummary)) {
      issues.push({
        path: `${basePath}.ioSummary`,
        code: "required-object",
        message: "DSP 입출력 요약 객체가 필요합니다.",
      });
    }
    return;
  }

  if (domain === "software") {
    validateRelationArray(record, "dspIds", issues, basePath);
    if (!Array.isArray(record.type) || record.type.length === 0) {
      issues.push({
        path: `${basePath}.type`,
        code: "required-array",
        message: "Software 분류는 한 개 이상의 값이 필요합니다.",
      });
    }
    return;
  }

  if (domain === "accessories") {
    if (record.relatedAccessoryIds !== undefined && !Array.isArray(record.relatedAccessoryIds)) {
      issues.push({
        path: `${basePath}.relatedAccessoryIds`,
        code: "expected-array",
        message: "연관 액세서리 ID는 배열이어야 합니다.",
      });
    }
    return;
  }

  if (domain === "brand" && !Array.isArray(record.timeline)) {
    issues.push({ path: `${basePath}.timeline`, code: "required-array", message: "Brand 연혁은 배열이어야 합니다." });
  }
}

/**
 * @param {Record<string, Object[]>} datasets DATA_DOMAINS 키별 레코드 배열
 * @returns {{path:string, code:string, message:string}[]}
 */
export function validateDataCatalog(datasets) {
  const issues = [];
  const idOwners = new Map();

  for (const [domain, contract] of Object.entries(DATA_DOMAINS)) {
    const records = datasets?.[domain];
    if (!Array.isArray(records)) {
      issues.push({ path: domain, code: "expected-array", message: "도메인 데이터는 배열이어야 합니다." });
      continue;
    }

    records.forEach((record, index) => {
      const basePath = `${domain}[${index}]`;
      if (!isObject(record)) {
        issues.push({ path: basePath, code: "expected-object", message: "레코드는 객체여야 합니다." });
        return;
      }

      if (typeof record.id !== "string" || !record.id.startsWith(contract.idPrefix)) {
        issues.push({
          path: `${basePath}.id`,
          code: "invalid-id",
          message: `ID는 ${contract.idPrefix} 접두사로 시작해야 합니다.`,
        });
      } else if (idOwners.has(record.id)) {
        issues.push({
          path: `${basePath}.id`,
          code: "duplicate-id",
          message: `${idOwners.get(record.id)}와 ID가 중복됩니다.`,
        });
      } else {
        idOwners.set(record.id, domain);
      }

      const label = record[contract.labelField];
      if (typeof label !== "string" || !label.trim()) {
        issues.push({
          path: `${basePath}.${contract.labelField}`,
          code: "required-label",
          message: "표시 이름이 필요합니다.",
        });
      }
      if (!manufacturerIdOf(record)) {
        issues.push({ path: `${basePath}.mfr`, code: "invalid-manufacturer", message: "등록되지 않은 제조사입니다." });
      }
      if (record.pending !== undefined && record.pending !== true) {
        issues.push({
          path: `${basePath}.pending`,
          code: "invalid-status",
          message: "pending은 미확인 레코드에서 true로만 표시합니다.",
        });
      }

      validateDomainShape(domain, record, issues, basePath);
    });
  }

  return issues;
}
