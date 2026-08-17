/**
 * @module domains/speakers/card-model
 * 제조사와 스피커 형식에 독립적인 카드 표시 모델을 만든다. 원본 레코드의
 * 문자열·관계 형식을 뷰가 직접 해석하지 않도록 하고, unknown / not-applicable /
 * self-powered 상태를 구분한다.
 */

/** @param {string} detail @returns {{quantity: string|null, detail: string}} */
function compactDriverDetail(detail) {
  const value = String(detail);
  const compound = value.match(
    /(\d+(?:\.\d+)?)\s*[×x]\s*\(\s*(\d+(?:\.\d+)?)\s*[″"]\s*\+\s*(\d+(?:\.\d+)?)\s*[″"]\s*\)/i,
  );
  if (compound) return { quantity: compound[1], detail: `${compound[2]}″+${compound[3]}″` };
  const direct = value.match(/(\d+(?:\.\d+)?)\s*[×x]\s*(\d+(?:\.\d+)?)\s*[″"]/i);
  if (direct) return { quantity: direct[1], detail: `${direct[2]}″` };
  const quantityMatch = value.match(/(\d+(?:\.\d+)?)\s*[×x]/i);
  const sizes = [...value.matchAll(/(\d+(?:\.\d+)?)\s*[″"]/g)].map(match => match[1]);
  if (quantityMatch && sizes.length) {
    return { quantity: quantityMatch[1], detail: `${sizes.slice(0, 2).join("″ / ")}″` };
  }
  if (quantityMatch) {
    const remainder = value.slice((quantityMatch.index || 0) + quantityMatch[0].length).trim();
    return { quantity: quantityMatch[1], detail: remainder.split(/[\s,(]/, 1)[0] || "—" };
  }
  return { quantity: null, detail: value.split(/[,(]/, 1)[0].trim() };
}

const COMPACT_CLASSIFICATION = Object.freeze({
  "Progressive Ultra-Dense Line Source": "PULS",
  "Constant Curvature Line": "Constant curvature",
});

/** @param {readonly string[]} values @returns {readonly string[]} */
function compactClassification(values) {
  return Object.freeze(values.map(value => COMPACT_CLASSIFICATION[value] || value.replace(/-channel$/i, "-ch")));
}

/**
 * @param {string|null|undefined} raw
 * @returns {readonly {band: string, quantity: string|null, detail: string}[]}
 */
export function cardDriverBands(raw) {
  if (!raw) return Object.freeze([]);
  return Object.freeze(
    String(raw)
      .split("·")
      .map(value => value.trim())
      .filter(Boolean)
      .map(value => {
        const separator = value.indexOf(":");
        if (separator < 0) {
          return Object.freeze({ band: "Driver", ...compactDriverDetail(value) });
        }
        return Object.freeze({
          band: value.slice(0, separator).trim(),
          ...compactDriverDetail(value.slice(separator + 1).trim()),
        });
      })
      .filter(value => value.detail && (value.band !== "Driver" || value.quantity)),
  );
}

/** @param {Object} amp @returns {Object|null} */
function bestAmpConfig(amp) {
  const configs = Array.isArray(amp?.configs) ? amp.configs.filter(config => config.total != null) : [];
  return configs.length ? configs.reduce((best, config) => (config.total > best.total ? config : best)) : null;
}

/** @param {Object} speaker @returns {{model: string, total: number, perCh: number}|null} */
function primaryAmplifier(speaker) {
  for (const amp of Array.isArray(speaker.amps) ? speaker.amps : []) {
    const config = bestAmpConfig(amp);
    if (config) return { model: amp.model, total: config.total, perCh: config.perCh };
  }
  return null;
}

/** @param {unknown} value @returns {string|null} */
function quantity(value) {
  return typeof value === "number" && Number.isFinite(value) ? String(value) : null;
}

/** @param {string} low @param {string} high @returns {string} */
function compactFrequencyRange(low, high) {
  const compact = value => String(value).replace(/\s+(?=(?:k?Hz)\b)/gi, "");
  const lo = compact(low);
  const hi = compact(high);
  const loUnit = lo.match(/k?Hz$/i)?.[0] || "";
  const hiUnit = hi.match(/k?Hz$/i)?.[0] || "";
  return loUnit.toLowerCase() === hiUnit.toLowerCase() && loUnit
    ? `${lo.slice(0, -loUnit.length)} – ${hi}`
    : `${lo} – ${hi}`;
}

/** @param {string|null} value @returns {string|null} */
function shortFrequencyRange(value) {
  if (!value) return null;
  return value
    .replace(/Hz(?=–)/i, "")
    .replace(/kHz$/i, "k")
    .replace(/Hz$/i, "");
}

/** @param {string|null|undefined} value @returns {number|null} */
function frequencyHz(value) {
  const match = String(value || "").match(/(\d+(?:\.\d+)?)\s*(k?Hz)/i);
  if (!match) return null;
  return Number(match[1]) * (match[2].toLowerCase() === "khz" ? 1000 : 1);
}

/** @param {Object|null} range @returns {Readonly<{start: number, width: number}>|null} */
function frequencyVisual(range) {
  const low = frequencyHz(range?.lo);
  const high = frequencyHz(range?.hi);
  if (!low || !high || high <= low) return null;
  const position = value => Math.max(0, Math.min(100, ((Math.log10(value) - Math.log10(20)) / 3) * 100));
  const start = position(low);
  const end = position(high);
  return Object.freeze({ start, width: Math.max(2, end - start) });
}

/**
 * @typedef {Object} CardSpec
 * @property {string} code
 * @property {string} label
 * @property {string} longLabel
 * @property {string} value
 * @property {string|null} longValue
 * @property {Readonly<{start: number, width: number}>|null} visual
 * @property {string|null} basis
 */

/** @param {Object} speaker @returns {readonly CardSpec[]} */
function primarySpecs(speaker) {
  const coverage = speaker.cov || {};
  const horizontalRange =
    Array.isArray(speaker.hRange) && speaker.hRange.length === 2
      ? speaker.hRange[0] === speaker.hRange[1]
        ? `${speaker.hRange[0]}°`
        : `${speaker.hRange[0]}–${speaker.hRange[1]}°`
      : coverage.h || null;
  const splay = Array.isArray(coverage.splayList) ? coverage.splayList.filter(Number.isFinite) : [];
  const verticalRange = splay.length ? `${Math.min(...splay)}–${Math.max(...splay)}°` : coverage.v || null;
  const frequencyRanges = Array.isArray(speaker.freqs) ? speaker.freqs : [];
  const preferredRange =
    frequencyRanges.find(range => String(range.db).replace(/\s/g, "").toLowerCase() === "-10db") ||
    frequencyRanges[0] ||
    null;
  const fullBandwidth = preferredRange
    ? preferredRange.hi && preferredRange.hi !== "?"
      ? compactFrequencyRange(preferredRange.lo, preferredRange.hi)
      : `${preferredRange.lo}+`.replace(/\s+(?=(?:k?Hz)\b)/gi, "")
    : null;
  const weight = quantity(speaker.weight);
  const subCoverage = {
    Integrated: "Cardioid",
    "Dedicated cardioid": "Cardioid",
    "Hypercardioid (passive acoustical)": "Hypercardioid",
    "Array + preset": "Omni",
    "CSA (three or multiples of three)": "Omni",
    No: "Omni",
  }[speaker.cardioidCapability];
  const normalizedHorizontal = speaker.type === "Subwoofer" ? subCoverage || null : horizontalRange;
  const make = (code, label, longLabel, value, unit = "", visual = null, longValue = null, basis = null) =>
    Object.freeze({
      code,
      label,
      longLabel,
      value: value == null ? "—" : `${value}${unit}`,
      longValue,
      visual,
      basis,
    });

  return Object.freeze([
    make("horizontal", "H", "Horizontal coverage", normalizedHorizontal),
    make(
      "vertical",
      splay.length ? "Splay" : "V",
      splay.length ? "Vertical splay range" : "Vertical coverage",
      verticalRange,
    ),
    make(
      "frequency-range",
      "Freq.",
      "Frequency range",
      shortFrequencyRange(fullBandwidth),
      "",
      frequencyVisual(preferredRange),
      fullBandwidth,
      preferredRange?.db || null,
    ),
    make("weight", "Weight", "Weight", weight, "kg"),
  ]);
}

/**
 * @param {Object} speaker 정규화된 스피커 레코드
 * @param {{name: string, short: string}} manufacturer 제조사 표시 메타데이터
 * @returns {Readonly<Object>} 브랜드·제품 형식 독립 카드 표시 모델
 */
export function createSpeakerCardModel(speaker, manufacturer) {
  if (!speaker?.id || !speaker?.name) throw new TypeError("speaker card requires stable id and name");
  if (!manufacturer?.name || !manufacturer?.short) throw new TypeError("speaker card requires manufacturer metadata");

  const pending = speaker.pending === true;
  const drivers = cardDriverBands(speaker.transducers);
  const amplifier = primaryAmplifier(speaker);
  const classification = [speaker.type, speaker.network, speaker.wayCount]
    .filter(value => value && value !== "N/A")
    .filter((value, index, values) => values.indexOf(value) === index);
  const comparisonSpecs = primarySpecs(speaker);
  const frequencySpec = comparisonSpecs.find(spec => spec.code === "frequency-range");

  let amplification;
  if (speaker.selfPowered === true) {
    amplification = { kind: "integrated", label: "Self-powered", model: null, total: null, perCh: null };
  } else if (amplifier) {
    amplification = { kind: "external", label: "Amplifier", ...amplifier };
  } else {
    amplification = { kind: "unknown", label: "Amplification", model: null, total: null, perCh: null };
  }

  return Object.freeze({
    schemaVersion: 1,
    id: speaker.id,
    status: pending ? "pending" : "verified",
    manufacturer: Object.freeze({ id: speaker.mk, name: manufacturer.name, short: manufacturer.short }),
    identity: Object.freeze({ name: speaker.name, series: speaker.series || null }),
    context: Object.freeze({ throwCategory: speaker.throwCat || null }),
    classification: Object.freeze(classification),
    classificationCompact: compactClassification(classification),
    drivers: Object.freeze({ status: drivers.length ? "known" : "unknown", bands: drivers }),
    performance: Object.freeze({
      maxSpl: speaker.spl == null ? null : Number(speaker.spl),
      status: speaker.spl == null ? "unknown" : "known",
      frequencyRange: Object.freeze({
        value: frequencySpec?.longValue || "—",
        basis: frequencySpec?.basis || null,
        status: frequencySpec?.longValue ? "known" : "unknown",
        visual: frequencySpec?.visual || null,
      }),
    }),
    primarySpecs: Object.freeze(comparisonSpecs.filter(spec => spec.code !== "frequency-range")),
    amplification: Object.freeze(amplification),
  });
}
