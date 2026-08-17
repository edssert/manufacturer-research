// Meyer Sound MJF self-powered 스테이지 모니터 2개 모델.
const MJF_SPECS = {
  "MJF-208": {
    lowInch: 8,
    spl: 129,
    h: "70°",
    v: "50°",
    freqs: [
      { db: "Operating range", lo: "55 Hz", hi: "18 kHz" },
      { db: "±4 dB", lo: "60 Hz", hi: "18 kHz" },
    ],
    weight: 21.3,
    transducers: "LF: 2 × 8″ high-power cone (4 Ω) · HF: 1 × 3″ diaphragm compression driver (16 Ω)",
    dims: "474 x 322 x 472 mm",
    watt: 1770,
    measurement:
      "The Linear Peak SPL table footnote specifies free-field at 4 m referred to 1 m; the architectural specification also describes 1 m on-axis typical boundary loading.",
  },
  "MJF-210": {
    lowInch: 10,
    spl: 134,
    h: "50°",
    v: "70°",
    freqs: [
      { db: "Operating range", lo: "55 Hz", hi: "18 kHz" },
      { db: "±4 dB", lo: "60 Hz", hi: "16 kHz" },
    ],
    weight: 30.4,
    transducers: "LF: 2 × 10″ high-power cone (4 Ω) · HF: 1 × 4″ diaphragm compression driver (8 Ω)",
    dims: "589 x 353 x 531 mm",
    watt: 1950,
    measurement: "Linear Peak SPL is measured 1 m on-axis with typical boundary loading.",
  },
};

function makeMjf(name, img) {
  const spec = MJF_SPECS[name];
  return {
    id: `spk-my-${name.toLowerCase()}`,
    mfr: "Meyer Sound",
    mk: "my",
    name,
    cardioidCapability: "No",
    series: "MJF Series",
    throwCat: null,
    type: "Point",
    throw: "Stage monitor",
    lowInch: spec.lowInch,
    lowQty: 2,
    crossover: "2-way, active",
    crossoverTags: ["2-way", "active"],
    spl: spec.spl,
    cov: { h: spec.h, v: spec.v },
    freqs: spec.freqs,
    weight: spec.weight,
    transducers: spec.transducers,
    connectors:
      "Analog: XLR 3-pin female in / male loop out (optional XLR 5-pin audio+RMS) · AC: powerCON 20 in / loop out",
    ip: null,
    dims: spec.dims,
    amps: [],
    selfPowered: true,
    ampRaw: null,
    img,
    relations: { ampIds: [] },
    watt: spec.watt,
    wattByBand: null,
    notes: `Self-powered 2-way stage monitor with integral 3-channel class-D amplification. Card SPL uses the published ${spec.spl} dB Linear Peak SPL (M-noise) at the onset of limiting. ${spec.measurement}`,
  };
}

export const MY_MJF_SERIES = [
  makeMjf("MJF-208", "public/assets/img/speakers/my/mjf-series/spk-my-mjf-208-official.jpg"),
  makeMjf("MJF-210", "public/assets/img/speakers/my/mjf-series/spk-my-mjf-210-official.jpg"),
];
