// d&b audiotechnik 앰프 데이터.
// 필드 스키마 설명은 amplifiers.schema.js 참조.
//
// [사용자 요청] 기존 D80/D90/D40/40D(레거시 단순 스키마 — channels/
// powerClass/connectivity/configs/notes/relations 만 있던 자리표시 데이터)를
// 전부 지우고, d&b 공식 제품 페이지 스펙을 근거로 D90 하나만 L-Acoustics
// LA1.16i 와 동일한 상세 필드 구조(mains/io/output/dsp/ecosystem/features/
// note 등 중첩 필드)로 새로 작성했다. 기존 D80/D40/40D 에 걸려 있던
// relations.speakerIds 매칭 정보도 함께 삭제됨(사용자 확인 후 진행) — 추후
// 스피커 매칭 데이터가 확정되면 다시 채운다.
export const DB_AMPLIFIERS = [
  {
    "id": "amp-db-d90",
    "mfr": "db",
    "model": "D90",
    "views": [
      { "label": "Front", "src": "public/assets/img/amplifiers/db/amp-db-d90-front.webp" },
      { "label": "Rear", "src": "public/assets/img/amplifiers/db/amp-db-d90-rear.webp" },
      { "label": "Isometric", "src": "public/assets/img/amplifiers/db/amp-db-d90-isometric.webp" }
    ],
    "channels": 4,
    "powerClass": "Class D",
    "connectivity": [
      "Milan-AVB",
      "AES3",
      "analog"
    ],
    "notes": "Mobile specific four channel amplifier. All current d&b loudspeaker setup.",
    "type": null,
    "usage": null,
    "architecture": null,
    "ipRating": null,
    "rackUnit": 2,
    "weight": 18.8,
    "weightLb": 41.5,
    "cooling": null,
    "operatingTemp": null,
    "ampClass": "Class D",
    "mains": {
      "rating": "100 - 127 / 208 - 240 V, 50 - 60 Hz",
      "connector": "powerCON®-HC",
      "powerRequirements": null
    },
    "powerSupply": "Autosensing switch mode power supply with active Power Factor Correction (PFC)",
    "externalDspBackup": null,
    "io": {
      "analogIn": "4 channels (INPUT ANALOG A1-A4, 3 pin XLR female)",
      "aesIn": "4 channels AES3 (INPUT DIGITAL D1/2, D3/4, 3 pin XLR female)",
      "networkAudio": "Milan — 8 channels (INPUT Network Audio M1-M8, etherCON built-in 5-port AVB Ethernet switch 100/1000 Mbit)",
      "networkRedundancy": "Milan-enabled",
      "connections": "2 x etherCON, ANALOG LINK (3 pin XLR male), DIGITAL LINK Output (3 pin XLR male)"
    },
    "output": {
      "channels": 4,
      "connectors": "Mix TOP/SUB / 2-Way Active output A/B and C/D: 2 x NL4, 4 Channel output: 1 x NL8, Speaker outputs A/B/C/D: 4 x NL4",
      "minImpedance": "4 ohms",
      "powerTotal": "4 x 5400/2700 W(4/8Ω)",
      "power8ohms": "4 x 2700 W",
      "power4ohms": "4 x 5400 W",
      "powerBtl8ohms": null,
      "powerByOhm": [
        { "ohm": "4 Ω", "power": "4 x 5400 W" },
        { "ohm": "8 Ω", "power": "4 x 2700 W" }
      ],
      "maxVoltage": "210 Vpeak",
      "maxCurrent": "78 Apeak"
    },
    "dsp": {
      "engine": null,
      "sampleRateInternal": null,
      "sampleRateAesIn": "44.1, 48, 96, 192 kHz",
      "sampleRateNetworkIn": null,
      "bitDepth": null,
      "routing": null,
      "eqSpecs": "2 x 16-band PEQ/notch/shelving/asymmetric",
      "presetLibrary": "Current d&b loudspeakers (ArrayCalc)",
      "latencyStandard": "0.3 ms",
      "latencyLow": null,
      "delaySetting": "0.3 ms - 10 s",
      "dynamicRange": "119 dB (unweighted)"
    },
    "ecosystem": {
      "controlSoft": "d&b ArrayCalc simulation software, R1 Remote control software",
      "integrations": []
    },
    "features": [
      "AutoStandby and AutoWakeup",
      "Function switches (d&b loudspeaker specific circuits)",
      "Frequency generator (Pink noise or Sine wave 10 Hz - 20 kHz)",
      "Flexible Fallback structure",
      "Comprehensive loudspeaker management",
      "Switchable filter functions",
      "Definable equalization"
    ],
    "note": {
      "modelType": "Mobile specific four channel amplifier for touring and rental production companies.",
      "channelProcessing": "2 x 16-band PEQ/notch/shelving/asymmetric equalizer. Latency 0.3 ms (analog and digital inputs). Delay setting 0.3 ms - 10 s.",
      "protection": null,
      "interface": "Colour TFT touchscreen, 4.3\"/480 x 272 pixel. SCROLL/EDIT digital rotary encoder. Power: Mains power switch."
    },
    "circuitProtection": null,
    "interfaceInfo": {
      "displayIndicators": "Colour TFT touchscreen, 4.3\"/480 x 272 pixel",
      "navigation": "Digital rotary encoder (SCROLL/EDIT), Mains power switch"
    },
    // 원본: "2 RU x 19" x 512 mm / 20.2"" — 랙폭(19")은 고정값이라 mm/in
    // 어느 쪽에도 동일하게 표기하고, 깊이(depth)만 512mm/20.2in 로 환산.
    "dimensions": { "mm": "2 RU x 19\" x 512 mm", "in": "2 RU x 19\" x 20.2\"" },
    "gpio": null,
    "configs": [],
    "relations": {
      "speakerIds": []
    }
  }
];
