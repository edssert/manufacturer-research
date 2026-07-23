// Meyer Sound LFC Series 서브우퍼 데이터 (5개 모델 — 750/900/1800/2100-LFC, VLFC).
// 필드 스키마 설명은 speakers.schema.js 참조. 소스: audio-spec-parsing-skill 마스터
// 스키마(750-LFC/900-LFC/1800-LFC/2100-LFC/VLFC v1.1, raw-data/raw-specs/my/speakers/lfc-series/).
// 전 모델 self-powered — LEOPARD 패턴 그대로 amps: [], selfPowered: true, ampRaw: null.
// [판단 근거]
// - spl: 원문에 Max_SPL_Peak 단일값이 없어, Linear_Peak_SPL 계열(750/900-LFC/VLFC)은
//   3종 노이즈 중 최댓값(대개 B-noise)을 정수 채택(소수점은 내림 — 134.5→134,
//   과대표기 방지), AES75 계열(1800/2100-LFC)은 dBZpk(피크값)를 정수 채택.
//   상세 수치는 각 notes에 병기.
// - watt: Amplifier_Total_Output_Power(W peak). 2100-LFC 는 앰프 출력 정격이
//   원문에 없어 PANTHER 전례(watt=Max Long-Term Continuous Power 소비전력)를
//   따라 1200W 채택(notes 에 명시). 1800-LFC 는 프리릴리즈 문서라 어느 쪽도
//   없어 null. W=V×A 환산 금지 원칙 준수.
// - weight/dims: 리깅 미장착 기준(원문 대표값). 750-LFC(21.81x20.28x20.87in)와
//   1800-LFC(34.02x22.52x24.02in)의 인치값은 원문 md 에 미보존이라 mm 에서 환산.
// - cov: 원문 "360° (single unit)" 표기가 있는 모델만 {h:"360°"}, 1800-LFC 는
//   원문에 커버리지 항목 자체가 없어 null.
// - 1800-LFC 는 "Preliminary Product Information"(출시 전 공식 문서, 3p) 단일
//   소스 — self-powered 여부도 명명 유추(원문 명시 없음)이나 시리즈 일관성에
//   따라 selfPowered: true 로 통일, 미확정 사항은 notes 에 기록.
// - img: null (이미지 미확보, views 필드 미생성).
export const MY_LFC_SERIES = [
  {
    "id": "spk-my-750-lfc",
    "mfr": "Meyer Sound",
    "mk": "my",
    "name": "750-LFC",
    "series": "LFC Series",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": null,
    "lowInch": 15,
    "lowQty": 1,
    "crossover": "1-way, active",
    "crossoverTags": [
      "1-way",
      "active"
    ],
    "spl": 132,
    "cov": {
      "h": "360°"
    },
    "freqs": [
      {
        "db": "dB 미표기",
        "lo": "35 Hz",
        "hi": "125 Hz"
      },
      {
        "db": "-4 dB",
        "lo": "37 Hz",
        "hi": "110 Hz"
      },
      {
        "db": "Phase ±30°",
        "lo": "43 Hz",
        "hi": "110 Hz"
      }
    ],
    "weight": 40.3,
    "transducers": "LF: 1 × 15″ dual-coil, long-excursion cone driver (2 Ω)",
    "connectors": "Analog: XLR 3-pin female in / male loop out(기본), XLR 5-pin 옵션(오디오+RMS 겸용) · AC: powerCON 20 in/loop out, 90–264 V AC 자동전압 · Amp: 2ch open-loop Class D(보이스코일당 1채널), 합산 3100 W peak · RMS Network: 2선 twisted-pair(옵션, 주문 시 지정), Compass RMS",
    "ip": null,
    "dims": "554 x 515 x 530 mm / 21.81 x 20.28 x 20.87 in",
    "amps": [],
    "selfPowered": true,
    "ampRaw": null,
    "img": null,
    "relations": {
      "ampIds": []
    },
    "watt": 3100,
    "wattByBand": null,
    "notes": "Self-powered low-frequency control element — built-in 2-channel open-loop Class D amplification (3100 W peak total, one channel per voice coil), no external amplifier required. Linear Peak SPL: 130.5 dB (M-noise, crest factor >9 dB) / 130.5 dB (Pink noise) / 132 dB (B-noise). Cardioid: manual 3-unit coplanar configuration (rear-facing unit with reversed polarity + 2.9 ms delay). Weight/dims exclude optional MRK-750 rigging kit (47.6 kg with rigging). Native Mode companion to LINA."
  },
  {
    "id": "spk-my-900-lfc",
    "mfr": "Meyer Sound",
    "mk": "my",
    "name": "900-LFC",
    "series": "LFC Series",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": null,
    "lowInch": 18,
    "lowQty": 1,
    "crossover": "1-way, active",
    "crossoverTags": [
      "1-way",
      "active"
    ],
    "spl": 134,
    "cov": {
      "h": "360°"
    },
    "freqs": [
      {
        "db": "dB 미표기",
        "lo": "30 Hz",
        "hi": "125 Hz"
      },
      {
        "db": "-4 dB",
        "lo": "32 Hz",
        "hi": "115 Hz"
      },
      {
        "db": "Phase ±30°",
        "lo": "40 Hz",
        "hi": "110 Hz"
      }
    ],
    "weight": 61.7,
    "transducers": "LF: 1 × 18″ dual-coil, long-excursion cone driver (2 Ω)",
    "connectors": "Analog: XLR 5-pin female in / male loop out(기본, RMS 겸용), XLR 3-pin 가능(오디오 전용) · AC: powerCON 20 in/loop out, 90–264 V AC 자동전압 · Amp: 2ch open-loop Class D(보이스코일당 1채널), 합산 3100 W peak · RMS Network: 2선 twisted-pair, Compass RMS",
    "ip": null,
    "dims": "697 x 621 x 632 mm / 27.43 x 24.43 x 24.89 in",
    "amps": [],
    "selfPowered": true,
    "ampRaw": null,
    "img": null,
    "relations": {
      "ampIds": []
    },
    "watt": 3100,
    "wattByBand": null,
    "notes": "Self-powered low-frequency control element — built-in 2-channel open-loop Class D amplification (3100 W peak total, one channel per voice coil), no external amplifier required. Linear Peak SPL: 133 dB (M-noise, crest factor >10 dB) / 133 dB (Pink noise) / 134.5 dB (B-noise). Cardioid: manual 3-unit coplanar configuration (rear-facing unit with reversed polarity + 3.8 ms delay). Weight/dims exclude optional MRK-900-LFC rigging kit (72.1 kg with rigging). Weather protection options: Standard IPX4 / Ultra IPX5. Companion subwoofer for LEOPARD."
  },
  {
    "id": "spk-my-1800-lfc",
    "mfr": "Meyer Sound",
    "mk": "my",
    "name": "1800-LFC",
    "series": "LFC Series",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": null,
    "lowInch": 18,
    "lowQty": 1,
    "crossover": "1-way, active",
    "crossoverTags": [
      "1-way",
      "active"
    ],
    "spl": 134,
    "cov": null,
    "freqs": [
      {
        "db": "dB 미표기",
        "lo": "30 Hz",
        "hi": "125 Hz"
      }
    ],
    "weight": 64,
    "transducers": "LF: 1 × 18″ long-excursion cone driver",
    "connectors": "Analog: Neutrik XLR 3-pin TOP female in / male loop out · Digital: Neutrik etherCON TOP (Milan AVB + AES67/SMPTE ST 2110-30 동시 지원, 아날로그/디지털 모두 기본 제공) · AC: Neutrik powerCON TRUE1 TOP, 100–240 V AC 50/60 Hz",
    "ip": "IP55 (Neutrik TOP 커넥터 체결 시)",
    "dims": "864 x 572 x 610 mm / 34.02 x 22.52 x 24.02 in",
    "amps": [],
    "selfPowered": true,
    "ampRaw": null,
    "img": null,
    "relations": {
      "ampIds": []
    },
    "watt": null,
    "wattByBand": null,
    "notes": "Based on official Preliminary Product Information (pre-release, 3 pages) — many specs not yet published, including amplifier output and power consumption. AES75 Max Linear SPL: 134 dBZpk / 124 dBZ (input +3.7 dBV, half space, ±2 dB). Source states tolerances of ±2 in on dimensions and ±5 kg on weight. Only Meyer Sound product supporting Milan AVB and AES67 (SMPTE ST 2110-30) simultaneously. Self-powered status inferred from LFC product-line naming (not explicitly stated in the pre-release source)."
  },
  {
    "id": "spk-my-2100-lfc",
    "mfr": "Meyer Sound",
    "mk": "my",
    "name": "2100-LFC",
    "series": "LFC Series",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": null,
    "lowInch": 21,
    "lowQty": 1,
    "crossover": "1-way, active",
    "crossoverTags": [
      "1-way",
      "active"
    ],
    "spl": 139,
    "cov": {
      "h": "360°"
    },
    "freqs": [
      {
        "db": "dB 미표기",
        "lo": "30 Hz",
        "hi": "125 Hz"
      },
      {
        "db": "-4 dB",
        "lo": "30 Hz",
        "hi": "112 Hz"
      },
      {
        "db": "Phase ±30°",
        "lo": "41 Hz",
        "hi": "121 Hz"
      }
    ],
    "weight": 106.6,
    "transducers": "LF: 1 × 21″ long-excursion cone driver, 4 voice coils (4 Ω)",
    "connectors": "Analog: Neutrik XLR 3-pin TOP female in / male loop out · Digital: Neutrik etherCON TOP (AVB, Milan Certified) · AC: Neutrik powerCON TRUE1 TOP, 200–240 V AC 50/60 Hz · Amp: 2ch Class D 내장 · Monitoring: Nebra 소프트웨어(Milan AVB)",
    "ip": "IP65 (OM 기준, Neutrik TOP 커넥터 체결 시 — SPS/AE 표기는 IP55)",
    "dims": "1105 x 616 x 660 mm / 43.49 x 24.25 x 26.00 in",
    "amps": [],
    "selfPowered": true,
    "ampRaw": null,
    "img": null,
    "relations": {
      "ampIds": []
    },
    "watt": 1200,
    "wattByBand": null,
    "notes": "Self-powered low-frequency control element — internal 2-channel Class D amplifier driving a single 21-inch driver with 4 voice coils. AES75 Max Linear SPL: 139.1 dBZpk / 129.2 dBZ (input +6.0 dBV analog / -17.8 dBFS digital). Amplifier output rating not published — watt = max long-term continuous power consumption 1200 W (burst 2400 W), following the PANTHER convention. Splay angle between cabinets fixed at 0°. Designed to deploy alongside PANTHER systems."
  },
  {
    "id": "spk-my-vlfc",
    "mfr": "Meyer Sound",
    "mk": "my",
    "name": "VLFC",
    "series": "LFC Series",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": null,
    "lowInch": 18,
    "lowQty": 2,
    "crossover": "1-way, active",
    "crossoverTags": [
      "1-way",
      "active"
    ],
    "spl": 125,
    "cov": {
      "h": "360°"
    },
    "freqs": [
      {
        "db": "dB 미표기",
        "lo": "13 Hz",
        "hi": "35 Hz"
      },
      {
        "db": "-4 dB",
        "lo": "13 Hz",
        "hi": "30 Hz"
      },
      {
        "db": "Phase ±30°",
        "lo": "13 Hz",
        "hi": "30 Hz"
      }
    ],
    "weight": 135.2,
    "transducers": "LF: 2 × 18″ long-excursion low-resonance cone driver (8 Ω)",
    "connectors": "Analog: XLR 5-pin female in / male loop out(기본, RMS 겸용), XLR 3-pin 가능(오디오 전용) · AC: powerCON 32, 208–235 V AC 정격(동작 165–264 V) · Amp: 2ch Class AB/H(MOSFET), 합산 5600 W peak · RMS Network: 2선 twisted-pair 기본 포함, Compass",
    "ip": null,
    "dims": "1388 x 520 x 838 mm / 54.65 x 20.48 x 33.00 in",
    "amps": [],
    "selfPowered": true,
    "ampRaw": null,
    "img": null,
    "relations": {
      "ampIds": []
    },
    "watt": 5600,
    "wattByBand": null,
    "notes": "Self-powered very low-frequency control element (13–30 Hz, below the typical 20 Hz limit) — only Meyer Sound loudspeaker with Class AB/H (MOSFET) amplification, 5600 W peak (brand's largest), powerCON 32. Linear Peak SPL: 125.5 dB (M-noise, crest factor >10.5 dB) / 125.5 dB (Pink noise) — no B-noise figure in source. Cardioid: reversed-unit stacking/flying supported (no delay/polarity parameters published). RMS network included as standard. Weight excludes rigging (150.7 kg with rigging). Shares rigging accessories with 1100-LFC."
  }
];
