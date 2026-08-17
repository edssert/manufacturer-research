// d&b audiotechnik CL 스피커 데이터 (3개 모델).
// 필드 스키마 설명은 speakers.schema.js 참조.
// 파생 필드(wayCount / network / lowUnitConfig)는 로드 시 normalize 함수가 생성하므로 저장하지 않는다.
export const DB_CL_SERIES = [
  {
    id: "spk-db-ccl8",
    mfr: "d&b audiotechnik",
    mk: "db",
    name: "CCL8",
    series: "CL Series",
    throwCat: null,
    type: "Line Array",
    throw: null,
    lowInch: 7,
    lowQty: 2,
    crossover: "2-way, passive",
    crossoverTags: ["2-way", "passive"],
    spl: 137,
    cov: {
      h: "80°",
      splayList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    },
    freqs: [
      {
        db: "-5 dB",
        lo: "60 Hz",
        hi: "18 kHz",
      },
      {
        db: "-10 dB",
        lo: "55 Hz",
        hi: "20 kHz",
      },
    ],
    weight: 17.6,
    transducers: "LC: 2 × 5″ · LF: 2 × 7″ · HF: 2 × 1.75″",
    connectors: "NLT4 F/M (NL4)",
    ip: null,
    dims: "209 × 593 × 355 mm / 8.2 × 23.4 × 14 in",
    amps: [
      {
        model: "D40",
        configs: [
          {
            mode: "ArrayProcessing",
            perCh: 1,
            total: 4,
          },
          {
            mode: "Line/Arc",
            perCh: 2,
            total: 8,
          },
        ],
      },
      {
        model: "D80",
        configs: [
          {
            mode: "ArrayProcessing",
            perCh: 1,
            total: 4,
          },
          {
            mode: "Line/Arc",
            perCh: 2,
            total: 8,
          },
        ],
      },
      {
        model: "D90",
        configs: [
          {
            mode: "ArrayProcessing",
            perCh: 1,
            total: 4,
          },
          {
            mode: "Line/Arc",
            perCh: 2,
            total: 8,
          },
        ],
      },
      {
        model: "40D",
        configs: [
          {
            mode: "ArrayProcessing",
            perCh: 1,
            total: 4,
          },
          {
            mode: "Line/Arc",
            perCh: 2,
            total: 8,
          },
        ],
      },
    ],
    ampRaw: null,
    img: "public/assets/img/speakers/db/cl/spk-db-ccl8.png",
    relations: {
      ampIds: ["amp-db-40d", "amp-db-d40", "amp-db-d80", "amp-db-d90"],
    },
    watt: 400,
    mechanicalSafety: {
      flownRows: [
        {
          config: "flown",
          accessory: "Z5820 CCL Flying frame",
          safeLimit: null,
          maxLimit: "24 cabinets (500 kg SWL total system weight incl. rigging components)",
        },
      ],
      stackedRows: [],
      notes: [
        {
          text: "3-point rigging system, 최대 24대 수직 라인 어레이(전용 Flying frame). Safe_Limit 열은 확보한 리깅 매뉴얼(p.5)에 없어 null — Maximum SWL 상한만 명시.",
        },
      ],
      safetyFactor: null,
      maxWindLoad: null,
      source: "CCL Rigging manual v1.3 en p.5; AE/SPS",
    },
    presets: null,
    cardioidCapability: "Integrated",
  },
  {
    id: "spk-db-ccl12",
    mfr: "d&b audiotechnik",
    mk: "db",
    name: "CCL12",
    series: "CL Series",
    throwCat: null,
    type: "Line Array",
    throw: null,
    lowInch: 7,
    lowQty: 2,
    crossover: "2-way, passive",
    crossoverTags: ["2-way", "passive"],
    spl: 136,
    cov: {
      h: "120°",
      splayList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    },
    freqs: [
      {
        db: "-5 dB",
        lo: "60 Hz",
        hi: "18 kHz",
      },
      {
        db: "-10 dB",
        lo: "55 Hz",
        hi: "18 kHz",
      },
    ],
    weight: 17.6,
    transducers: "LC: 2 × 5″ · LF: 2 × 7″ · HF: 2 × 1.75″",
    connectors: "NLT4 F/M (NL4)",
    ip: null,
    dims: "209 × 593 × 355 mm / 8.2 × 23.4 × 14 in",
    amps: [
      {
        model: "D40",
        configs: [
          {
            mode: "ArrayProcessing",
            perCh: 1,
            total: 4,
          },
          {
            mode: "Line/Arc",
            perCh: 2,
            total: 8,
          },
        ],
      },
      {
        model: "D80",
        configs: [
          {
            mode: "ArrayProcessing",
            perCh: 1,
            total: 4,
          },
          {
            mode: "Line/Arc",
            perCh: 2,
            total: 8,
          },
        ],
      },
      {
        model: "D90",
        configs: [
          {
            mode: "ArrayProcessing",
            perCh: 1,
            total: 4,
          },
          {
            mode: "Line/Arc",
            perCh: 2,
            total: 8,
          },
        ],
      },
      {
        model: "40D",
        configs: [
          {
            mode: "ArrayProcessing",
            perCh: 1,
            total: 4,
          },
          {
            mode: "Line/Arc",
            perCh: 2,
            total: 8,
          },
        ],
      },
    ],
    ampRaw: null,
    img: "public/assets/img/speakers/db/cl/spk-db-ccl12.png",
    relations: {
      ampIds: ["amp-db-40d", "amp-db-d40", "amp-db-d80", "amp-db-d90"],
    },
    watt: 400,
    mechanicalSafety: {
      flownRows: [
        {
          config: "flown",
          accessory: "Z5820 CCL Flying frame",
          safeLimit: null,
          maxLimit: "24 cabinets (500 kg SWL total system weight incl. rigging components)",
        },
      ],
      stackedRows: [],
      notes: [
        {
          text: "3-point rigging system, 최대 24대 수직 라인 어레이(전용 Flying frame). CCL8과 리깅 액세서리·SWL 공용. Safe_Limit 열은 원문에 없어 null.",
        },
      ],
      safetyFactor: null,
      maxWindLoad: null,
      source: "CCL Rigging manual v1.3 en p.5; AE/SPS",
    },
    presets: null,
    cardioidCapability: "Integrated",
  },
  {
    id: "spk-db-ccl-sub",
    mfr: "d&b audiotechnik",
    mk: "db",
    name: "CCL-SUB",
    series: "CL Series",
    throwCat: null,
    type: "Subwoofer",
    throw: null,
    lowInch: 15,
    lowQty: 1,
    crossover: null,
    crossoverTags: ["1ch", "passive (front+rear cardioid)"],
    spl: 132,
    cov: null,
    freqs: [
      {
        db: "-5 dB",
        lo: "39 Hz",
        hi: "150 Hz",
      },
      {
        db: "-10 dB",
        lo: "35 Hz",
        hi: "180 Hz",
      },
    ],
    weight: 44.5,
    transducers: "LF front: 1 × 15″ · LF rear: 1 × 10″ (cardioid pair)",
    connectors: "NLT4 F/M (NL4)",
    ip: null,
    dims: "457 × 590 × 710 mm / 18.0 × 23.3 × 28.0 in",
    amps: [
      {
        model: "D40",
        configs: [
          {
            mode: "ArrayProcessing",
            perCh: 1,
            total: 4,
          },
          {
            mode: "Line/Arc",
            perCh: 2,
            total: 8,
          },
        ],
      },
      {
        model: "D80",
        configs: [
          {
            mode: "ArrayProcessing",
            perCh: 1,
            total: 4,
          },
          {
            mode: "Line/Arc",
            perCh: 2,
            total: 8,
          },
        ],
      },
      {
        model: "D90",
        configs: [
          {
            mode: "ArrayProcessing",
            perCh: 1,
            total: 4,
          },
          {
            mode: "Line/Arc",
            perCh: 2,
            total: 8,
          },
        ],
      },
      {
        model: "40D",
        configs: [
          {
            mode: "ArrayProcessing",
            perCh: 1,
            total: 4,
          },
          {
            mode: "Line/Arc",
            perCh: 2,
            total: 8,
          },
        ],
      },
    ],
    ampRaw: null,
    img: "public/assets/img/speakers/db/cl/spk-db-ccl-sub.png",
    relations: {
      ampIds: ["amp-db-40d", "amp-db-d40", "amp-db-d80", "amp-db-d90"],
    },
    watt: 500,
    mechanicalSafety: null,
    presets: null,
    cardioidCapability: "No",
  },
  {
    id: "spk-db-b12-sub",
    mfr: "d&b audiotechnik",
    mk: "db",
    name: "B12-SUB",
    series: "CL Series",
    throwCat: null,
    type: "Subwoofer",
    throw: null,
    lowInch: 15,
    lowQty: 2,
    crossover: "Subwoofer, passive",
    crossoverTags: ["passive"],
    spl: 132,
    cov: null,
    freqs: [
      { db: "-5 dB", lo: "39 Hz", hi: "150 Hz" },
      { db: "-10 dB", lo: "35 Hz", hi: "180 Hz" },
    ],
    weight: 42,
    transducers: "LF front: 1 × 15″ · LF rear: 1 × 10″",
    connectors: "1 x NLT4 F/M",
    ip: null,
    dims: "455 x 590 x 687 mm without wheels / 812 mm with wheels",
    amps: [
      { model: "D40", configs: [{ mode: "Standard", perCh: 8, total: 32 }] },
      { model: "D80", configs: [{ mode: "Standard", perCh: 8, total: 32 }] },
      { model: "D90", configs: [{ mode: "Standard", perCh: 8, total: 32 }] },
      { model: "40D", configs: [{ mode: "Standard", perCh: 8, total: 32 }] },
    ],
    ampRaw: "D40/D80/D90/40D (8 cabinets/channel)",
    notes:
      "Ground-stacked-only integrated cardioid subwoofer. The detailed weight table states 42 kg; the page summary rounds/displays 42.5 kg.",
    img: "public/assets/img/speakers/db/cl/spk-db-b12-sub.png",
    relations: {
      ampIds: ["amp-db-d40", "amp-db-d80", "amp-db-d90", "amp-db-40d"],
    },
    watt: 500,
    mechanicalSafety: null,
    presets: null,
    cardioidCapability: "Integrated",
  },
];
