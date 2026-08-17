// Meyer Sound Ashby IntelligentDC 인실링 포인트소스 2개 모델.
const ASHBY_SPECS = {
  "Ashby-5C": {
    lowInch: 5,
    spl: 112,
    coverage: "110°",
    freqs: [
      { db: "Operating range", lo: "100 Hz", hi: "18 kHz" },
      { db: "±4 dB", lo: "110 Hz", hi: "16 kHz" },
    ],
    weight: 3.53,
    transducers: "LF: 1 × 5″ coaxial cone · HF: 1 × 0.75″ dome tweeter mounted concentrically in waveguide",
    dims: "226.5 mm diameter x 182 mm depth",
  },
  "Ashby-8C": {
    lowInch: 8,
    spl: 114,
    coverage: "100°",
    freqs: [
      { db: "Operating range", lo: "60 Hz", hi: "18 kHz" },
      { db: "±4 dB", lo: "67 Hz", hi: "16 kHz" },
    ],
    weight: 6.26,
    transducers: "LF: 1 × 8″ coaxial cone · HF: 1 × 0.75″ dome tweeter mounted concentrically in waveguide",
    dims: "321 mm diameter x 225.3 mm depth",
  },
};

function makeAshby(name, img) {
  const spec = ASHBY_SPECS[name];
  return {
    id: `spk-my-${name.toLowerCase()}`,
    mfr: "Meyer Sound",
    mk: "my",
    name,
    cardioidCapability: "No",
    series: "Ashby Series",
    throwCat: null,
    type: "Point",
    throw: "Ceiling loudspeaker",
    lowInch: spec.lowInch,
    lowQty: 1,
    crossover: "2-way, active",
    crossoverTags: ["2-way", "active"],
    spl: spec.spl,
    cov: { h: spec.coverage, v: spec.coverage },
    freqs: spec.freqs,
    weight: spec.weight,
    transducers: spec.transducers,
    connectors: "Phoenix 5-pin male input + hardwired loop output — balanced audio + 48 V DC",
    ip: null,
    dims: spec.dims,
    amps: [],
    selfPowered: true,
    ampRaw: null,
    img,
    relations: { ampIds: [] },
    watt: 440,
    wattByBand: null,
    notes: `Self-powered coaxial ceiling loudspeaker with integral class-D amplification; Meyer Sound MPS IntelligentDC external 48 V power supply required. Card SPL uses the published ${spec.spl} dB Linear Peak SPL (M-noise), measured at 4 m and referred to 1 m at the onset of limiting.`,
  };
}

export const MY_ASHBY_SERIES = [
  makeAshby("Ashby-5C", "public/assets/img/speakers/my/ashby-series/spk-my-ashby-5c-official.jpg"),
  makeAshby("Ashby-8C", "public/assets/img/speakers/my/ashby-series/spk-my-ashby-8c-official.jpg"),
];
