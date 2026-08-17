function makeBi10(name, networked, img) {
  return {
    id: `spk-db-${name.toLowerCase()}`,
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
    connectors: networked ? "Milan-AVB or analog audio; AC or PoE++ power" : "Installation connector panel",
    ip: null,
    dims: null,
    amps: [],
    ampRaw: networked ? "Onboard networked amplifier" : "5DM/5D, 10D, D25/25D, D40/40D, D80, D90",
    notes: "Installation-specific bass-reflex subwoofer with omnidirectional dispersion.",
    img,
    relations: { ampIds: [] },
    watt: 500,
    mechanicalSafety: null,
    presets: null,
    cardioidCapability: "No",
    ...(networked ? { selfPowered: true } : {}),
  };
}

export const DB_U_I_SERIES = [
  makeBi10("Bi10-SUB", false, "public/assets/img/speakers/db/u/spk-db-bi10-sub.png"),
  makeBi10("Bi10N-SUB", true, "public/assets/img/speakers/db/u/spk-db-bi10n-sub.png"),
];
