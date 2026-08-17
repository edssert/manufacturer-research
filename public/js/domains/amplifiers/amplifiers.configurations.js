/**
 * @module domains/amplifiers/configurations
 * 앰프 상세의 스피커별 Configuration 표 모델과 마크업을 만든다.
 * 입력 행은 관계 인덱스의 읽기 전용 결과로 취급하며 정렬·병합 과정에서 변경하지 않는다.
 */
import { esc } from "../../core/dom.js";

const EMPTY_TABLE_HTML = `<div class="data-empty-note">설정 데이터가 없습니다.</div>`;

function rowSignature(group) {
  return [...group.rows]
    .sort((left, right) => (right.total || 0) - (left.total || 0))
    .map(row => `${row.mode || ""}|${row.preset || ""}|${row.perCh ?? ""}|${row.total ?? ""}|${row.spl ?? ""}`)
    .join(";");
}

function findSingleIInsertionIndex(shorter, longer) {
  if (longer.length !== shorter.length + 1) return null;
  let differenceIndex = -1;
  for (let index = 0; index < longer.length; index += 1) {
    const shorterIndex = index - (differenceIndex === -1 ? 0 : 1);
    if (shorter[shorterIndex] === longer[index]) continue;
    if (differenceIndex !== -1) return null;
    differenceIndex = index;
  }
  if (differenceIndex === -1) differenceIndex = shorter.length;
  return longer[differenceIndex] === "i" ? differenceIndex : null;
}

function isTrailingRIVariant(left, right) {
  if (left.length !== right.length || left.length === 0) return false;
  if (left.slice(0, -1) !== right.slice(0, -1)) return false;
  const leftSuffix = left.slice(-1).toLowerCase();
  const rightSuffix = right.slice(-1).toLowerCase();
  return (leftSuffix === "r" && rightSuffix === "i") || (leftSuffix === "i" && rightSuffix === "r");
}

function canMergeVariants(left, right) {
  const leftName = left.speakerName;
  const rightName = right.speakerName;
  const [prefix, fullName] = leftName.length <= rightName.length ? [leftName, rightName] : [rightName, leftName];
  const suffix = fullName.startsWith(prefix) ? fullName.slice(prefix.length).trim() : null;
  const isSupportedPrefix = suffix !== null && (suffix === "" || /i$/.test(suffix) || suffix === "inWall");
  const [shorter, longer] = leftName.length <= rightName.length ? [leftName, rightName] : [rightName, leftName];
  const hasInsertedI = leftName.length !== rightName.length && findSingleIInsertionIndex(shorter, longer) !== null;

  return (
    (isSupportedPrefix || hasInsertedI || isTrailingRIVariant(leftName, rightName)) &&
    rowSignature(left) === rowSignature(right)
  );
}

function variantNameParts(primary, variant) {
  if (variant.speakerName.startsWith(primary.speakerName)) {
    const suffix = variant.speakerName.slice(primary.speakerName.length).trim();
    return suffix
      ? [
          { text: primary.speakerName, id: primary.speakerId, label: primary.speakerName },
          { text: `(${suffix})`, id: variant.speakerId, label: variant.speakerName },
        ]
      : [{ text: primary.speakerName, id: primary.speakerId, label: primary.speakerName }];
  }

  if (isTrailingRIVariant(primary.speakerName, variant.speakerName)) {
    const base = primary.speakerName.slice(0, -1);
    const primarySuffix = primary.speakerName.slice(-1).toLowerCase();
    const rId = primarySuffix === "r" ? primary.speakerId : variant.speakerId;
    const iId = primarySuffix === "i" ? primary.speakerId : variant.speakerId;
    const rLabel = primarySuffix === "r" ? primary.speakerName : variant.speakerName;
    const iLabel = primarySuffix === "i" ? primary.speakerName : variant.speakerName;
    return [
      { text: base, id: null },
      { text: "(r", id: rId, label: rLabel },
      { text: "/i)", id: iId, label: iLabel },
    ];
  }

  const insertionIndex = findSingleIInsertionIndex(primary.speakerName, variant.speakerName);
  return [
    {
      text: primary.speakerName.slice(0, insertionIndex),
      id: primary.speakerId,
      group: "primary",
      label: primary.speakerName,
    },
    { text: "(i)", id: variant.speakerId, group: "variant", label: variant.speakerName },
    {
      text: primary.speakerName.slice(insertionIndex),
      id: primary.speakerId,
      group: "primary",
      label: primary.speakerName,
    },
  ];
}

/**
 * 관계 행을 스피커별로 묶고, 동일 설정을 가진 지원 대상 변형 모델만 표시 그룹으로 합친다.
 * 그룹과 행의 최초 등장 순서는 유지된다.
 *
 * @param {{speakerId:string, speakerName:string, mode:string, preset:string|null, perCh:number|null, total:number|null, spl:number|null}[]} rows
 * @returns {{speakerId:string, speakerName?:string, nameParts?:{text:string,id:string|null,group?:string,label?:string}[], rows:Object[]}[]}
 */
export function groupConfigurationsBySpeaker(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return [];

  const groups = [];
  const groupsBySpeakerId = new Map();
  rows.forEach(row => {
    if (!groupsBySpeakerId.has(row.speakerId)) {
      const group = {
        speakerId: row.speakerId,
        speakerName: row.speakerName,
        rows: [],
      };
      groupsBySpeakerId.set(row.speakerId, group);
      groups.push(group);
    }
    groupsBySpeakerId.get(row.speakerId).rows.push(row);
  });

  const mergedGroups = [];
  const consumedIndexes = new Set();
  groups.forEach((group, groupIndex) => {
    if (consumedIndexes.has(groupIndex)) return;
    const variantIndex = groups.findIndex(
      (candidate, candidateIndex) =>
        candidateIndex !== groupIndex && !consumedIndexes.has(candidateIndex) && canMergeVariants(group, candidate),
    );
    if (variantIndex === -1) {
      mergedGroups.push(group);
      return;
    }

    consumedIndexes.add(groupIndex);
    consumedIndexes.add(variantIndex);
    const variant = groups[variantIndex];
    const [primary, secondary] =
      group.speakerName.length <= variant.speakerName.length ? [group, variant] : [variant, group];
    mergedGroups.push({
      speakerId: primary.speakerId,
      nameParts: variantNameParts(primary, secondary),
      rows: group.rows,
    });
  });

  return mergedGroups;
}

function valueHTML(value, suffix = "") {
  return value == null || value === "" ? "—" : esc(`${value}${suffix}`);
}

function configurationCellsHTML(row, includeModelCell) {
  return `${includeModelCell ? `<div class="match-table__cell match-table__cell--model" role="cell"></div>` : ""}<div class="match-table__cell match-table__cell--mode" role="cell">${valueHTML(row.mode)}</div><div class="match-table__cell match-table__cell--preset" role="cell">${valueHTML(row.preset)}</div><div class="match-table__cell" role="cell">${valueHTML(row.perCh)}</div><div class="match-table__cell" role="cell">${valueHTML(row.total)}</div><div class="match-table__cell" role="cell">${valueHTML(row.spl, " dB")}</div>`;
}

function nameHTML(group) {
  if (!group.nameParts) {
    return `<button type="button" class="match-table__relation-trigger match-table__model-name" data-speaker-id="${esc(group.speakerId)}" aria-label="${esc(group.speakerName)} 스피커 상세 보기">${esc(group.speakerName)}</button>`;
  }
  const focusableIds = new Set();
  const parts = group.nameParts
    .map(part => {
      const id = part.id == null ? "null" : esc(part.id);
      if (part.id == null || focusableIds.has(part.id)) {
        return `<span class="match-table__model-name-part" data-speaker-id="${id}">${esc(part.text)}</span>`;
      }
      focusableIds.add(part.id);
      return `<button type="button" class="match-table__relation-trigger match-table__model-name-part" data-speaker-id="${id}" aria-label="${esc(part.label || part.text)} 스피커 상세 보기">${esc(part.text)}</button>`;
    })
    .join("");
  return `<span class="match-table__model-name match-table__model-name--split">${parts}</span>`;
}

/**
 * 스피커별 Configuration 표를 렌더링한다. 대표 행은 Max/amp가 가장 큰 설정이고,
 * 나머지 행은 기존 data-toggle-group/data-toggle-member 계약으로 접힌다.
 *
 * @param {{speakerId:string, speakerName:string, mode:string, preset:string|null, perCh:number|null, total:number|null, spl:number|null}[]} rows
 * @returns {string}
 */
export function configurationsBySpeakerTableHTML(rows) {
  const groups = groupConfigurationsBySpeaker(rows);
  if (groups.length === 0) return EMPTY_TABLE_HTML;

  const body = groups
    .map((group, groupIndex) => {
      const sortedRows = [...group.rows].sort((left, right) => (right.total || 0) - (left.total || 0));
      const [representative, ...additionalRows] = sortedRows;
      const toggleGroupId = `amp-cfg-${groupIndex}`;
      const toggleButton = additionalRows.length
        ? `<button type="button" class="match-table__toggle-btn" data-toggle-group="${toggleGroupId}" aria-expanded="false" aria-label="설정 ${additionalRows.length}개 더 보기">+${additionalRows.length}</button>`
        : "";
      const representativeRow = `<div class="match-table__row match-table__row--clickable" role="row" data-speaker-id="${esc(group.speakerId)}"><div class="match-table__cell match-table__cell--model" role="cell">${nameHTML(group)}${toggleButton}</div>${configurationCellsHTML(representative, false)}</div>`;
      const collapsedRows = additionalRows
        .map(
          row =>
            `<div class="match-table__row match-table__row--sub" role="row" data-toggle-member="${toggleGroupId}" hidden>${configurationCellsHTML(row, true)}</div>`,
        )
        .join("");
      return representativeRow + collapsedRows;
    })
    .join("");

  return `<div class="match-table match-table--toggleable match-table--amp-view" role="table" aria-label="Speaker configurations" aria-colcount="6"><div class="match-table__row match-table__row--head" role="row"><div class="match-table__cell" role="columnheader">Speaker</div><div class="match-table__cell" role="columnheader">Mode</div><div class="match-table__cell" role="columnheader">Preset</div><div class="match-table__cell" role="columnheader">Links/ch</div><div class="match-table__cell" role="columnheader">Max/amp</div><div class="match-table__cell" role="columnheader">Max SPL</div></div><div class="match-table__body" role="rowgroup">${body}</div></div>`;
}
