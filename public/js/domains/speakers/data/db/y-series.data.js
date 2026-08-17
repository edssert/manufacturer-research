const amp = model => [{ model, configs: [{ mode: "", perCh: 2, total: null }] }];

export const DB_Y_SERIES = [
  {
    id: "spk-db-y8", mfr: "d&b audiotechnik", mk: "db", name: "Y8", series: "Y Series",
    throwCat: null, type: "Line Array", throw: null, lowInch: 8, lowQty: 2,
    crossover: "2-way passive", crossoverTags: ["passive crossover"], spl: 139,
    cov: { h: "80°", splayList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] },
    freqs: [{ db: "-5 dB", lo: "54 Hz", hi: "19 kHz" }], weight: 20,
    transducers: "LF: 2 × 8″ · HF: 1 × 1.4″", connectors: "2 x NLT4 F/M (optional 2 x NL4)",
    ip: null, dims: "630 x 257 x 375 mm", amps: amp("D80"), ampRaw: "D80 (2 per channel)",
    notes: "Official Y-Series brochure, PDF p.8 (printed pp.14-15).", img: "public/assets/img/speakers/db/y/spk-db-y8.png",
    relations: { ampIds: ["amp-db-d80"] }, watt: 400, mechanicalSafety: null, presets: null, cardioidCapability: "No"
  },
  {
    id: "spk-db-y12", mfr: "d&b audiotechnik", mk: "db", name: "Y12", series: "Y Series",
    throwCat: null, type: "Line Array", throw: null, lowInch: 8, lowQty: 2,
    crossover: "2-way passive", crossoverTags: ["passive crossover"], spl: 139,
    cov: { h: "120°", splayList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] },
    freqs: [{ db: "-5 dB", lo: "54 Hz", hi: "19 kHz" }], weight: 20,
    transducers: "LF: 2 × 8″ · HF: 1 × 1.4″", connectors: "2 x NLT4 F/M (optional 2 x NL4)",
    ip: null, dims: "630 x 257 x 375 mm", amps: amp("D80"), ampRaw: "D80 (2 per channel)",
    notes: "Official Y-Series brochure, PDF p.8 (printed pp.14-15).", img: "public/assets/img/speakers/db/y/spk-db-y12.png",
    relations: { ampIds: ["amp-db-d80"] }, watt: 400, mechanicalSafety: null, presets: null, cardioidCapability: "No"
  },
  {
    id: "spk-db-y7p", mfr: "d&b audiotechnik", mk: "db", name: "Y7P", series: "Y Series",
    throwCat: null, type: "Point", throw: null, lowInch: 8, lowQty: 2,
    crossover: "2-way passive", crossoverTags: ["passive crossover"], spl: 137,
    cov: { h: "75°", v: "40°" }, freqs: [{ db: "-5 dB", lo: "59 Hz", hi: "18 kHz" }], weight: 18,
    transducers: "LF: 2 × 8″ · HF: 1 × 1.4″", connectors: "2 x NLT4 F/M (optional 2 x NL4)",
    ip: null, dims: "257 x 580 x 341 mm", amps: amp("D80"), ampRaw: "D80 (2 per channel)",
    notes: "Official Y-Series brochure, PDF p.6 (printed pp.10-11).", img: "public/assets/img/speakers/db/y/spk-db-y7p.png",
    relations: { ampIds: ["amp-db-d80"] }, watt: 400, mechanicalSafety: null, presets: null, cardioidCapability: "No"
  },
  {
    id: "spk-db-y10p", mfr: "d&b audiotechnik", mk: "db", name: "Y10P", series: "Y Series",
    throwCat: null, type: "Point", throw: null, lowInch: 8, lowQty: 2,
    crossover: "2-way passive", crossoverTags: ["passive crossover"], spl: 136,
    cov: { h: "110°", v: "40°" }, freqs: [{ db: "-5 dB", lo: "59 Hz", hi: "18 kHz" }], weight: 18,
    transducers: "LF: 2 × 8″ · HF: 1 × 1.4″", connectors: "2 x NLT4 F/M (optional 2 x NL4)",
    ip: null, dims: "257 x 580 x 341 mm", amps: amp("D80"), ampRaw: "D80 (2 per channel)",
    notes: "Official Y-Series brochure, PDF p.6 (printed pp.10-11).", img: "public/assets/img/speakers/db/y/spk-db-y10p.png",
    relations: { ampIds: ["amp-db-d80"] }, watt: 400, mechanicalSafety: null, presets: null, cardioidCapability: "No"
  },
  {
    id: "spk-db-y-sub", mfr: "d&b audiotechnik", mk: "db", name: "Y-SUB", series: "Y Series",
    throwCat: null, type: "Subwoofer", throw: null, lowInch: 18, lowQty: 2,
    crossover: "passive", crossoverTags: [], spl: 134, cov: { h: "Cardioid", splayList: [0, 2.5] },
    freqs: [{ db: "-5 dB", lo: "39 Hz", hi: "140 Hz" }], weight: 52,
    transducers: "LF: 1 × 18″ · LC: 1 × 12″", connectors: "2 x NLT4 F/M (optional 2 x NL4)",
    ip: null, dims: "630 x 500 x 700 mm", amps: amp("D80"), ampRaw: "D80 (2 per channel)",
    notes: "Official Y-Series brochure, PDF p.9 (printed pp.16-17).", img: "public/assets/img/speakers/db/y/spk-db-y-sub.png",
    relations: { ampIds: ["amp-db-d80"] }, watt: 600, mechanicalSafety: null, presets: null, cardioidCapability: "Integrated"
  },
  {
    id: "spk-db-b6-sub", mfr: "d&b audiotechnik", mk: "db", name: "B6-SUB", series: "Y Series",
    throwCat: null, type: "Subwoofer", throw: null, lowInch: 18, lowQty: 1,
    crossover: "passive", crossoverTags: [], spl: 134, cov: { h: "Omnidirectional" },
    freqs: [{ db: "-5 dB", lo: "37 Hz", hi: "140 Hz" }], weight: 41,
    transducers: "LF: 1 × 18″", connectors: "2 x NLT4 F/M (optional 2 x NL4)",
    ip: null, dims: "580 x 490 x 700 mm", amps: amp("D80"), ampRaw: "D80 (2 per channel)",
    notes: "Official Y-Series brochure, PDF p.7 (printed pp.12-13).", img: "public/assets/img/speakers/db/y/spk-db-b6-sub.png",
    relations: { ampIds: ["amp-db-d80"] }, watt: 500, mechanicalSafety: null, presets: null, cardioidCapability: "CSA (three or multiples of three)"
  }
];
