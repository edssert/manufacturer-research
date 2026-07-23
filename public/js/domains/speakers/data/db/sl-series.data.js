// d&b audiotechnik SL 스피커 데이터 (6개 모델).
// 필드 스키마 설명은 speakers.schema.js 참조.
// 파생 필드(wayCount / network / lowUnitConfig)는 로드 시 normalize 함수가 생성하므로 저장하지 않는다.
export const DB_SL_SERIES = [
{
  "id": "spk-db-gsl8",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "GSL8",
  "series": "SL Series",
  "throwCat": null,
  "type": "Line Array",
  "throw": "Long throw >35m",
  "lowInch": 14,
  "lowQty": 2,
  "crossover": "3-way, active, passive",
  "crossoverTags": [
    "2ch active split",
    "passive (side LF+MF+HF)"
  ],
  "spl": 150,
  "cov": {
    "h": "80°",
    "splayList": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ]
  },
  "freqs": [
    {
      "db": "-5 dB",
      "lo": "45 Hz",
      "hi": "18 kHz"
    }
  ],
  "weight": 80,
  "transducers": "LC: 2 × 10″ · LF: 2 × 14″ · MF: 1 × 10″ · HF: 3 × 1.4″",
  "connectors": "4-point speakON",
  "ip": "IP55",
  "dims": "1300 x 391 x 627 mm / 51.2 x 15.4 x 24.7 in",
  "amps": [
    {
      "model": "D80",
      "configs": [
        {
          "mode": "",
          "perCh": 1,
          "total": 2
        }
      ]
    },
    {
      "model": "D90",
      "configs": [
        {
          "mode": "",
          "perCh": 1,
          "total": 2
        }
      ]
    }
  ],
  "ampRaw": "D80(1/2), D90(1/2)",
  "img": "public/assets/img/speakers/db/sl/spk-db-gsl8.webp",
  "relations": {
    "ampIds": [
      "amp-db-d80",
      "amp-db-d90"
    ]
  },
  "watt": 1600,
  "mechanicalSafety": {
    "flownRows": [
      { "config": "flown (any splay config, up to 10 cabinets)", "accessory": "Z5701 GSL Flying frame + Z5702 GSL Load beam + Z5707 SL Aiming plate", "safeLimit": null, "maxLimit": "10 cabinets (800 kg system weight)" },
      { "config": "flown (general, ArrayCalc verification required)", "accessory": "Z5701 GSL Flying frame + Z5702 GSL Load beam + Z5707 SL Aiming plate", "safeLimit": null, "maxLimit": "24 cabinets (2000 kg SWL total system weight incl. rigging)" },
      { "config": "SUB column (SL-SUB)", "accessory": "Z5701 GSL Flying frame + Z5702 GSL Load beam + Z5707 SL Aiming plate", "safeLimit": null, "maxLimit": "14 cabinets" }
    ],
    "stackedRows": [],
    "notes": [
      { "text": "Safe_Limit(안전 한도) 열은 원문 리깅 매뉴얼에 없어 null — SWL 기준 Maximum_Limit(상한)만 명시. 10대(800kg) 이하는 모든 splay 각도에서 무조건 안전, 그 이상 최대 24대는 d&b ArrayCalc 시뮬레이션 검증 필요." }
    ],
    "safetyFactor": null,
    "maxWindLoad": "6 Beaufort(비행 비권장 상한); 8 Beaufort 초과 시 반드시 하강·고정",
    "source": "GSL/KSL Rigging manual v1.16 en Ch.1.3, 1.5"
  },
  "presets": null,
  "cardioidCapability": "Built-in (단일 인클로저, 150Hz 이하 카디오이드 지향성 수렴)"
},
{
  "id": "spk-db-gsl12",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "GSL12",
  "series": "SL Series",
  "throwCat": null,
  "type": "Line Array",
  "throw": "Long throw >35m",
  "lowInch": 14,
  "lowQty": 2,
  "crossover": "3-way, active, passive",
  "crossoverTags": [
    "2ch active split",
    "passive (side LF+MF+HF)"
  ],
  "spl": 149,
  "cov": {
    "h": "120°",
    "splayList": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ]
  },
  "freqs": [
    {
      "db": "-5 dB",
      "lo": "45 Hz",
      "hi": "18 kHz"
    }
  ],
  "weight": 80,
  "transducers": "LC: 2 × 10″ · LF: 2 × 14″ · MF: 1 × 10″ · HF: 3 × 1.4″",
  "connectors": "4-point speakON",
  "ip": "IP55",
  "dims": "1300 x 391 x 627 mm / 51.2 x 15.4 x 24.7 in",
  "amps": [
    {
      "model": "D80",
      "configs": [
        {
          "mode": "",
          "perCh": 1,
          "total": 2
        }
      ]
    },
    {
      "model": "D90",
      "configs": [
        {
          "mode": "",
          "perCh": 1,
          "total": 2
        }
      ]
    }
  ],
  "ampRaw": "D80(1/2), D90(1/2)",
  "img": "public/assets/img/speakers/db/sl/spk-db-gsl12.webp",
  "relations": {
    "ampIds": [
      "amp-db-d80",
      "amp-db-d90"
    ]
  },
  "watt": 1600,
  "mechanicalSafety": {
    "flownRows": [
      { "config": "flown (any splay config, up to 10 cabinets)", "accessory": "Z5701 GSL Flying frame + Z5702 GSL Load beam + Z5707 SL Aiming plate", "safeLimit": null, "maxLimit": "10 cabinets (800 kg system weight)" },
      { "config": "flown (general, ArrayCalc verification required)", "accessory": "Z5701 GSL Flying frame + Z5702 GSL Load beam + Z5707 SL Aiming plate", "safeLimit": null, "maxLimit": "24 cabinets (2000 kg SWL total system weight incl. rigging)" },
      { "config": "SUB column (SL-SUB)", "accessory": "Z5701 GSL Flying frame + Z5702 GSL Load beam + Z5707 SL Aiming plate", "safeLimit": null, "maxLimit": "14 cabinets" }
    ],
    "stackedRows": [],
    "notes": [
      { "text": "Safe_Limit(안전 한도) 열은 원문 리깅 매뉴얼에 없어 null — SWL 기준 Maximum_Limit(상한)만 명시. 10대(800kg) 이하는 모든 splay 각도에서 무조건 안전, 그 이상 최대 24대는 d&b ArrayCalc 시뮬레이션 검증 필요. GSL12는 GSL8과 동일 중량·공용 리깅." }
    ],
    "safetyFactor": null,
    "maxWindLoad": "6 Beaufort(비행 비권장 상한); 8 Beaufort 초과 시 반드시 하강·고정",
    "source": "GSL/KSL Rigging manual v1.16 en Ch.1.3, 1.5"
  },
  "presets": null,
  "cardioidCapability": "Built-in (단일 인클로저, 150Hz 이하 카디오이드 지향성 수렴)"
},
{
  "id": "spk-db-ksl8",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "KSL8",
  "series": "SL Series",
  "throwCat": null,
  "type": "Line Array",
  "throw": "Long throw >35m",
  "lowInch": 10,
  "lowQty": 2,
  "crossover": "3-way, active, passive",
  "crossoverTags": [
    "2ch active split",
    "passive (side LF+MF+HF)"
  ],
  "spl": 145,
  "cov": {
    "h": "80°",
    "splayList": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10
    ]
  },
  "freqs": [
    {
      "db": "-5 dB",
      "lo": "54 Hz",
      "hi": "18 kHz"
    }
  ],
  "weight": 58,
  "transducers": "LC: 2 × 8″ · LF: 2 × 10″ · MF: 1 × 8″ · HF: 2 × 1.4″",
  "connectors": "4-point speakON",
  "ip": "IP55",
  "dims": "1000 x 330 x 597 mm / 39.4 x 13 x 23.5 in",
  "amps": [
    {
      "model": "D40",
      "configs": [
        {
          "mode": "AP",
          "perCh": 1,
          "total": 2
        },
        {
          "mode": "Line",
          "perCh": 2,
          "total": 4
        }
      ]
    },
    {
      "model": "D80",
      "configs": [
        {
          "mode": "AP",
          "perCh": 1,
          "total": 2
        },
        {
          "mode": "Line",
          "perCh": 2,
          "total": 4
        }
      ]
    },
    {
      "model": "D90",
      "configs": [
        {
          "mode": "AP",
          "perCh": 1,
          "total": 2
        },
        {
          "mode": "Line",
          "perCh": 2,
          "total": 4
        }
      ]
    }
  ],
  "ampRaw": "D40(AP1/2-Line2/4), D80(AP1/2-Line2/4), D90(AP1/2-Line2/4)",
  "img": "public/assets/img/speakers/db/sl/spk-db-ksl8.webp",
  "relations": {
    "ampIds": [
      "amp-db-d40",
      "amp-db-d80",
      "amp-db-d90"
    ]
  },
  "watt": 700,
  "mechanicalSafety": {
    "flownRows": [
      { "config": "flown (any splay config, up to 10 cabinets)", "accessory": "Z5722 KSL Flying frame + Z5723 KSL Load beam + Z5707 SL Aiming plate", "safeLimit": null, "maxLimit": "10 cabinets (685 kg system weight)" },
      { "config": "flown (general, ArrayCalc verification required)", "accessory": "Z5722 KSL Flying frame + Z5723 KSL Load beam + Z5707 SL Aiming plate", "safeLimit": null, "maxLimit": "24 cabinets (1500 kg SWL total system weight incl. rigging)" },
      { "config": "SUB column (KSL-SUB)", "accessory": "Z5722 KSL Flying frame + Z5723 KSL Load beam + Z5707 SL Aiming plate", "safeLimit": null, "maxLimit": "16 cabinets" }
    ],
    "stackedRows": [],
    "notes": [
      { "text": "Safe_Limit(안전 한도) 열은 원문 리깅 매뉴얼에 없어 null — SWL 기준 Maximum_Limit(상한)만 명시. 10대(685kg) 이하는 모든 splay 각도에서 무조건 안전, 그 이상 최대 24대는 d&b ArrayCalc 검증 필요." }
    ],
    "safetyFactor": null,
    "maxWindLoad": "6 Beaufort(비행 비권장 상한); 8 Beaufort 초과 시 반드시 하강·고정",
    "source": "GSL/KSL Rigging manual v1.16 en Ch.1.3, 1.5"
  },
  "presets": null,
  "cardioidCapability": "Built-in (단일 인클로저, 150Hz 이하 카디오이드 지향성 수렴 — GSL과 동일 메커니즘)"
},
{
  "id": "spk-db-ksl12",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "KSL12",
  "series": "SL Series",
  "throwCat": null,
  "type": "Line Array",
  "throw": "Long throw >35m",
  "lowInch": 10,
  "lowQty": 2,
  "crossover": "3-way, active, passive",
  "crossoverTags": [
    "2ch active split",
    "passive (side LF+MF+HF)"
  ],
  "spl": 144,
  "cov": {
    "h": "120°",
    "splayList": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10
    ]
  },
  "freqs": [
    {
      "db": "-5 dB",
      "lo": "54 Hz",
      "hi": "18 kHz"
    }
  ],
  "weight": 58,
  "transducers": "LC: 2 × 8″ · LF: 2 × 10″ · MF: 1 × 8″ · HF: 2 × 1.4″",
  "connectors": "4-point speakON",
  "ip": "IP55",
  "dims": "1000 x 330 x 597 mm / 39.4 x 13 x 23.5 in",
  "amps": [
    {
      "model": "D40",
      "configs": [
        {
          "mode": "AP",
          "perCh": 1,
          "total": 2
        },
        {
          "mode": "Line",
          "perCh": 2,
          "total": 4
        }
      ]
    },
    {
      "model": "D80",
      "configs": [
        {
          "mode": "AP",
          "perCh": 1,
          "total": 2
        },
        {
          "mode": "Line",
          "perCh": 2,
          "total": 4
        }
      ]
    },
    {
      "model": "D90",
      "configs": [
        {
          "mode": "AP",
          "perCh": 1,
          "total": 2
        },
        {
          "mode": "Line",
          "perCh": 2,
          "total": 4
        }
      ]
    }
  ],
  "ampRaw": "D40(AP1/2-Line2/4), D80(AP1/2-Line2/4), D90(AP1/2-Line2/4)",
  "img": "public/assets/img/speakers/db/sl/spk-db-ksl12.webp",
  "relations": {
    "ampIds": [
      "amp-db-d40",
      "amp-db-d80",
      "amp-db-d90"
    ]
  },
  "watt": 700,
  "mechanicalSafety": {
    "flownRows": [
      { "config": "flown (any splay config, up to 10 cabinets)", "accessory": "Z5722 KSL Flying frame + Z5723 KSL Load beam + Z5707 SL Aiming plate", "safeLimit": null, "maxLimit": "10 cabinets (685 kg system weight)" },
      { "config": "flown (general, ArrayCalc verification required)", "accessory": "Z5722 KSL Flying frame + Z5723 KSL Load beam + Z5707 SL Aiming plate", "safeLimit": null, "maxLimit": "24 cabinets (1500 kg SWL total system weight incl. rigging)" },
      { "config": "SUB column (KSL-SUB)", "accessory": "Z5722 KSL Flying frame + Z5723 KSL Load beam + Z5707 SL Aiming plate", "safeLimit": null, "maxLimit": "16 cabinets" }
    ],
    "stackedRows": [],
    "notes": [
      { "text": "Safe_Limit(안전 한도) 열은 원문 리깅 매뉴얼에 없어 null — SWL 기준 Maximum_Limit(상한)만 명시. KSL8과 리깅 액세서리·하중 정격 공용." }
    ],
    "safetyFactor": null,
    "maxWindLoad": "6 Beaufort(비행 비권장 상한); 8 Beaufort 초과 시 반드시 하강·고정",
    "source": "GSL/KSL Rigging manual v1.16 en Ch.1.3, 1.5"
  },
  "presets": null,
  "cardioidCapability": "Built-in (KSL8과 동일 근거)"
},
{
  "id": "spk-db-xsl8",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "XSL8",
  "series": "SL Series",
  "throwCat": null,
  "type": "Line Array",
  "throw": "Long throw >35m",
  "lowInch": 8,
  "lowQty": 2,
  "crossover": "3-way, active, passive",
  "crossoverTags": [
    "2ch active split",
    "passive (side LF+MF+HF)"
  ],
  "spl": 141,
  "cov": {
    "h": "80°",
    "splayList": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14
    ]
  },
  "freqs": [
    {
      "db": "-5 dB",
      "lo": "60 Hz",
      "hi": "18 kHz"
    }
  ],
  "weight": 39,
  "transducers": "LC: 2 × 6.5″ · LF: 2 × 8″ · MF: 1 × 6.5″ · HF: 2 × 1″",
  "connectors": "4-point speakON",
  "ip": "IP55",
  "dims": "700 x 283 x 507 mm / 27.6 x 11.1 x 20 in",
  "amps": [
    {
      "model": "D40",
      "configs": [
        {
          "mode": "AP",
          "perCh": 1,
          "total": 2
        },
        {
          "mode": "Line",
          "perCh": 2,
          "total": 4
        }
      ]
    },
    {
      "model": "D80",
      "configs": [
        {
          "mode": "AP",
          "perCh": 1,
          "total": 2
        },
        {
          "mode": "Line",
          "perCh": 2,
          "total": 4
        }
      ]
    },
    {
      "model": "D90",
      "configs": [
        {
          "mode": "AP",
          "perCh": 1,
          "total": 2
        },
        {
          "mode": "Line",
          "perCh": 2,
          "total": 4
        }
      ]
    }
  ],
  "ampRaw": "D40(AP1/2-Line2/4), D80(AP1/2-Line2/4), D90(AP1/2-Line2/4)",
  "img": "public/assets/img/speakers/db/sl/spk-db-xsl8.webp",
  "relations": {
    "ampIds": [
      "amp-db-d40",
      "amp-db-d80",
      "amp-db-d90"
    ]
  },
  "watt": 700,
  "mechanicalSafety": {
    "flownRows": [
      { "config": "flown, compression and/or tension mode", "accessory": "Z5771 XSL Flying frame + Z5772 XSL Load beam + Z5707 SL Aiming plate", "safeLimit": null, "maxLimit": "24 cabinets (1000 kg SWL total system weight incl. rigging)" },
      { "config": "flown, tension mode only", "accessory": "XSL Top mounting frame", "safeLimit": null, "maxLimit": "12 cabinets" },
      { "config": "SUB column (XSL-SUB, mixed)", "accessory": "Z5783 XSL-SUB Adapter frame", "safeLimit": null, "maxLimit": "1000 kg SWL total system weight incl. rigging (혼합 배열, XSL-TOP 아래 XSL-SUB)" }
    ],
    "stackedRows": [],
    "notes": [
      { "text": "Safe_Limit(안전 한도) 열은 원문 리깅 매뉴얼에 없어 null — SWL 기준 Maximum_Limit(상한)만 명시. XSL은 Compression/Tension 이원 리깅 모드 지원(Flying frame 24대 겸용, Top mounting frame은 tension 전용 12대)." }
    ],
    "safetyFactor": null,
    "maxWindLoad": "6 Beaufort(비행 비권장 상한); 8 Beaufort 초과 시 반드시 하강·고정",
    "source": "XSL Rigging manual v1.5 en Ch.1.3, 1.3.1"
  },
  "presets": null,
  "cardioidCapability": "Built-in (단일 인클로저, 카디오이드 기법을 저음역에서 사용 — 구체적 수렴 대역 조건은 XSL 원문에 명시 없음, GSL/KSL과 다른 근거 수준)"
},
{
  "id": "spk-db-xsl12",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "XSL12",
  "series": "SL Series",
  "throwCat": null,
  "type": "Line Array",
  "throw": "Long throw >35m",
  "lowInch": 8,
  "lowQty": 2,
  "crossover": "3-way, active, passive",
  "crossoverTags": [
    "2ch active split",
    "passive (side LF+MF+HF)"
  ],
  "spl": 140,
  "cov": {
    "h": "80°,120°",
    "splayList": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14
    ]
  },
  "freqs": [
    {
      "db": "-5 dB",
      "lo": "60 Hz",
      "hi": "18 kHz"
    }
  ],
  "weight": 39,
  "transducers": "LC: 2 × 6.5″ · LF: 2 × 8″ · MF: 1 × 6.5″ · HF: 2 × 1″",
  "connectors": "4-point speakON",
  "ip": "IP55",
  "dims": "700 x 283 x 507 mm / 27.6 x 11.1 x 20 in",
  "amps": [
    {
      "model": "D40",
      "configs": [
        {
          "mode": "AP",
          "perCh": 1,
          "total": 2
        },
        {
          "mode": "Line",
          "perCh": 2,
          "total": 4
        }
      ]
    },
    {
      "model": "D80",
      "configs": [
        {
          "mode": "AP",
          "perCh": 1,
          "total": 2
        },
        {
          "mode": "Line",
          "perCh": 2,
          "total": 4
        }
      ]
    },
    {
      "model": "D90",
      "configs": [
        {
          "mode": "AP",
          "perCh": 1,
          "total": 2
        },
        {
          "mode": "Line",
          "perCh": 2,
          "total": 4
        }
      ]
    }
  ],
  "ampRaw": "D40(AP1/2-Line2/4), D80(AP1/2-Line2/4), D90(AP1/2-Line2/4)",
  "img": "public/assets/img/speakers/db/sl/spk-db-xsl12.webp",
  "relations": {
    "ampIds": [
      "amp-db-d40",
      "amp-db-d80",
      "amp-db-d90"
    ]
  },
  "watt": 700,
  "mechanicalSafety": {
    "flownRows": [
      { "config": "flown, compression and/or tension mode", "accessory": "Z5771 XSL Flying frame + Z5772 XSL Load beam + Z5707 SL Aiming plate", "safeLimit": null, "maxLimit": "24 cabinets (1000 kg SWL total system weight incl. rigging)" },
      { "config": "flown, tension mode only", "accessory": "XSL Top mounting frame", "safeLimit": null, "maxLimit": "12 cabinets" },
      { "config": "SUB column (XSL-SUB, mixed)", "accessory": "Z5783 XSL-SUB Adapter frame", "safeLimit": null, "maxLimit": "1000 kg SWL total system weight incl. rigging (혼합 배열, XSL-TOP 아래 XSL-SUB)" }
    ],
    "stackedRows": [],
    "notes": [
      { "text": "Safe_Limit(안전 한도) 열은 원문 리깅 매뉴얼에 없어 null — SWL 기준 Maximum_Limit(상한)만 명시. XSL8과 리깅 액세서리·하중 정격 공용." }
    ],
    "safetyFactor": null,
    "maxWindLoad": "6 Beaufort(비행 비권장 상한); 8 Beaufort 초과 시 반드시 하강·고정",
    "source": "XSL Rigging manual v1.5 en Ch.1.3, 1.3.1"
  },
  "presets": null,
  "cardioidCapability": "Built-in (XSL8과 동일 근거)"
}
];
