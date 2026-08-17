const U_TOP_SPECS = {
  U3: {
    lowInch: 5,
    spl: 128,
    h: "100°",
    v: "65°",
    f5: ["61 Hz", "18 kHz"],
    f10: ["52 Hz", "19 kHz"],
    weight: 7.1,
    dims: "411 x 187 x 244.5 mm",
    hf: "0.75″",
  },
  U5: {
    lowInch: 6.5,
    spl: 133,
    h: "90°",
    v: "60°",
    f5: ["58 Hz", "17 kHz"],
    f10: ["52 Hz", "18 kHz"],
    weight: 11.5,
    dims: "509 x 223 x 295 mm",
    hf: "1″",
  },
  U7: {
    lowInch: 8,
    spl: 136,
    h: "80°",
    v: "55°",
    f5: ["55 Hz", "18 kHz"],
    f10: ["50 Hz", "20 kHz"],
    weight: 19.2,
    dims: "611 x 268 x 355 mm",
    hf: "1.26″",
  },
};

function makeUTop(name, networked, img) {
  const baseName = name.replace(/N$/, "");
  const spec = U_TOP_SPECS[baseName];
  return {
    id: `spk-db-${name.toLowerCase()}`,
    mfr: "d&b audiotechnik",
    mk: "db",
    name,
    series: "U Series",
    throwCat: null,
    type: "Point",
    throw: "Multipurpose point source",
    lowInch: spec.lowInch,
    lowQty: 2,
    crossover: `2-way, ${networked ? "active" : "passive"}`,
    crossoverTags: ["2-way", networked ? "active" : "passive"],
    spl: spec.spl,
    cov: { h: spec.h, v: spec.v, rotatable: true },
    freqs: [
      { db: "-5 dB", lo: spec.f5[0], hi: spec.f5[1] },
      { db: "-10 dB", lo: spec.f10[0], hi: spec.f10[1] },
    ],
    weight: spec.weight + (networked ? { U3: 0.4, U5: 0.5, U7: 0.2 }[baseName] : 0),
    transducers: `LF: 2 × ${spec.lowInch}″ · HF: 1 × ${spec.hf}`,
    connectors: networked
      ? "Milan-AVB or analog audio; AC or PoE++ power"
      : "2-pin Euroblock; optional NLT4 F/M connector panel",
    ip: null,
    dims: spec.dims,
    amps: [],
    ampRaw: networked ? "Onboard networked amplifier" : "5DM/5D, 10D, D25/25D, D40/40D, D80, D90",
    notes: networked
      ? "Onboard amplification with Milan-AVB/analog signal and AC/PoE++ hybrid power."
      : "Passive U-Series variant; acoustically identical to its networked counterpart.",
    img,
    relations: { ampIds: [] },
    watt: null,
    mechanicalSafety: null,
    presets: null,
    cardioidCapability: "No",
    ...(networked ? { selfPowered: true } : {}),
  };
}

function makeB10(name, networked, img) {
  return {
    id: `spk-db-${name.toLowerCase().replace("-sub", "-sub")}`,
    mfr: "d&b audiotechnik",
    mk: "db",
    name,
    series: "U Series",
    throwCat: null,
    type: "Subwoofer",
    throw: null,
    lowInch: 10,
    lowQty: 2,
    crossover: `Subwoofer, ${networked ? "active" : "passive"}`,
    crossoverTags: [networked ? "active" : "passive"],
    spl: 130,
    cov: null,
    freqs: [
      { db: "-5 dB", lo: "38 Hz", hi: "150 Hz" },
      { db: "-10 dB", lo: "34 Hz", hi: "200 Hz" },
    ],
    weight: networked ? 28.5 : 27,
    transducers: "LF: 2 × 10″",
    connectors: networked ? "Milan-AVB or analog audio; AC or PoE++ power" : "NLT4 F/M",
    ip: null,
    dims: null,
    amps: [],
    ampRaw: networked ? "Onboard networked amplifier" : "5DM/5D, 10D, D25/25D, D40/40D, D80, D90",
    notes: "Bass-reflex subwoofer with omnidirectional dispersion.",
    img,
    relations: { ampIds: [] },
    watt: 500,
    mechanicalSafety: null,
    presets: null,
    cardioidCapability: "No",
    ...(networked ? { selfPowered: true } : {}),
  };
}

export const DB_U_SERIES = [
  makeUTop("U3", false, "public/assets/img/speakers/db/u/spk-db-u3.png"),
  makeUTop("U3N", true, "public/assets/img/speakers/db/u/spk-db-u3n.png"),
  makeUTop("U5", false, "public/assets/img/speakers/db/u/spk-db-u5.png"),
  makeUTop("U5N", true, "public/assets/img/speakers/db/u/spk-db-u5n.png"),
  makeUTop("U7", false, "public/assets/img/speakers/db/u/spk-db-u7.png"),
  makeUTop("U7N", true, "public/assets/img/speakers/db/u/spk-db-u7n.png"),
  makeB10("B10-SUB", false, "public/assets/img/speakers/db/u/spk-db-b10-sub.png"),
  makeB10("B10N-SUB", true, "public/assets/img/speakers/db/u/spk-db-b10n-sub.png"),
];
