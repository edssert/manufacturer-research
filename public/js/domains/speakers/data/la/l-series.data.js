// L-Acoustics L Series 스피커 데이터 (4개 모델).
// 필드 스키마 설명은 speakers.schema.js 참조.
// 파생 필드(wayCount / network / lowUnitConfig)는 로드 시 normalize 함수가 생성하므로 저장하지 않는다.
export const LA_L_SERIES = [
  {
    "id": "spk-la-l2",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "L2",
    "series": "L Series",
    "throwCat": "Long Throw",
    "type": "Progressive Ultra-Dense Line Source",
    "throw": "Long throw >35m",
    "lowInch": 10,
    "lowQty": 8,
    "crossover": "16-channel, active",
    "crossoverTags": [
      "16-channel",
      "active"
    ],
    "spl": 155,
    "cov": {
      "h": "110°,70°,55°/35°,35°/55°",
      "v": "10°"
    },
    "freqs": [
      {
        "db": "-10 dB",
        "lo": "45 Hz",
        "hi": "20 kHz"
      }
    ],
    // [upload/L2_v1.8.md 마스터 스키마 반영] Cardioid_Capability — L2/L2D
    // 고유의 제3의 유형(CS1류의 Built-in도, KS28류의 Array-based only도
    // 아닌, 전용 LC 드라이버군 내장 + standard array + 프리셋 선택으로
    // 성립). 원문: L2_OM_EN_5.0.pdf "L2 and L2D each feature four low
    // cardioid (LC) loudspeakers on the sides...".
    "cardioidCapability": "Integrated",
    "weight": 158,
    "transducers": "LC: 4 × 12″ · LF: 8 × 10″ · HF: 8 × 3″",
    "connectors": "37-point male connector (32 points used)",
    "ip": "IP55",
    "dims": "850 x 1197 x 559 mm / 33.5 x 47.1 x 22 in",
    "amps": [
      {
        "model": "LA7.16",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 1,
            "splByPreset": [
              {
                "preset": "[L2 70]",
                "spl": 155
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA7.16(1/1)",
    "img": "public/assets/img/speakers/la/l-series/spk-la-l2-front.webp",
    "views": [
      {
        "label": "Front",
        "src": "public/assets/img/speakers/la/l-series/spk-la-l2-front.webp"
      },
      {
        "label": "Rear",
        "src": "public/assets/img/speakers/la/l-series/spk-la-l2-rear.webp"
      },
      {
        "label": "Array",
        "src": "public/assets/img/speakers/la/l-series/spk-la-l2-array.webp"
      },
      {
        "label": "On Chariot",
        "src": "public/assets/img/speakers/la/l-series/spk-la-l2-chariot.webp"
      }
    ],
    "cardHoverView": "Array",
    "relations": {
      "ampIds": []
    },
    "watt": 1586,
    // [upload/L2_v1.8.md 마스터 스키마 반영] Preset Guide/Delay Defaults/
    // Mechanical Safety 신규 반영. ratio/minLine은 원문이 비율/최소길이
    // 대신 물리적 거리(coupled)·최대 간격(separated)으로 정보를 제공해
    // 대응되지 않아 notes에만 원문 값을 보존한다(K1과 다른 구조).
    "presets": {
      "rows": [
        { "config": "L2 line source (단독)", "preset": "[L2 70] / [L2 90] / [L2 110] / [L2 70_S] / [L2 90_S] / [L2 110_S]", "acoustic": "45 Hz - 20 kHz", "acousticShort": "45 Hz - 20 kHz" },
        { "config": "L2 line source with coupled KS28", "preset": "[L2 xx] + [KS28 L2_C] / [KS28 L2_Cx]", "acoustic": "25 Hz - 20 kHz", "acousticShort": "25 Hz - 20 kHz" },
        { "config": "L2 line source with separated KS28", "preset": "[L2 xx] + [KS28 L2] / [KS28 L2_C] / [KS28 L2_Cx]", "acoustic": "25 Hz - 20 kHz", "acousticShort": "25 Hz - 20 kHz" }
      ],
      "notes": [
        { "text": "\"_S\" 접미사가 붙은 프리셋(예: [L2 70_S])은 슈퍼카디오이드 모드를 가리킨다(카디오이드/슈퍼카디오이드는 DSP 프리셋 선택으로 전환)." },
        { "text": "Coupled KS28 배치 거리: 서브우퍼를 뒤쪽(behind)에 둘 경우 1~2 m 권장, 옆쪽(beside)에 둘 경우 0.5~1 m." },
        { "text": "Separated KS28 간격: 상한 주파수 60Hz 기준일 때 인접 서브우퍼 음향 중심 간 최대 거리 2.8 m." }
      ],
      "delayDefaults": {
        "rows": [
          { "combo": "[L2] + [KS28 L2]", "items": ["L2 = 0 ms", "KS28 = 5 ms (−)"] },
          { "combo": "[L2] + [KS28 L2_C]", "items": ["L2 = 0 ms", "KS28 = 0 ms (−)"] },
          { "combo": "[L2] + [KS28 L2_Cx]", "items": ["L2 = 0 ms", "KS28 = 5 ms (−)"] }
        ],
        "notes": [
          { "text": "별도 표기가 없으면 극성은 정상(+). L2는 모든 조합에서 항상 정상(+), KS28은 항상 반전(−)." }
        ],
        "source": "L2_OM_EN_5.0.pdf p.54"
      },
      "source": "L2_OM_EN_5.0.pdf p.51-53"
    },
    "mechanicalSafety": {
      "safetyFactor": "4:1",
      "maxWindLoad": "6 Beaufort",
      "flownRows": [
        { "config": "flown", "accessory": "L2-BUMP + L2-BAR (optional)", "safeLimit": "4", "maxLimit": "4" },
        { "config": "flown", "accessory": "L2-BUMP + LA-RAKMOUNT + 2 L2-BAR + 2 LA-SLING2T", "safeLimit": "4 L2 + 1 LA-RAK III", "maxLimit": "4 L2 + 1 LA-RAK III" },
        { "config": "flown", "accessory": "L2-ROLL", "safeLimit": "1", "maxLimit": "1" },
        { "config": "flown and pullback", "accessory": "L2-BUMP + L2-BAR + L2-RIGBAR", "safeLimit": "2", "maxLimit": "4" },
        { "config": "flown and pullback", "accessory": "L2-RIGBAR x 2", "safeLimit": "2", "maxLimit": "2" }
      ],
      "stackedRows": [
        { "config": "stacked", "accessory": "L2-CHARIOT + K2-JACK", "safeLimit": "1", "maxLimit": "1" }
      ],
      "source": "L2_OM_EN_5.0.pdf p.49"
    }
  },
  {
    "id": "spk-la-l2d",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "L2D",
    "series": "L Series",
    "throwCat": "Long Throw",
    "type": "Progressive Ultra-Dense Line Source",
    "throw": "Long throw >35m",
    "lowInch": 10,
    "lowQty": 8,
    "crossover": "16-channel, active",
    "crossoverTags": [
      "16-channel",
      "active"
    ],
    "spl": 151,
    "cov": {
      "h": "100° to 140°",
      "v": "60°"
    },
    "freqs": [
      {
        "db": "-10 dB",
        "lo": "45 Hz",
        "hi": "20 kHz"
      }
    ],
    // [upload/L2D_v1.6.md 마스터 스키마 반영] Cardioid_Capability — L2와
    // 동일 근거(공용 매뉴얼 챕터, "L2 and L2D each feature four low
    // cardioid (LC) loudspeakers on the sides...").
    "cardioidCapability": "Integrated",
    "weight": 149,
    "transducers": "LC: 4 × 12″ · LF: 8 × 10″ · HF: 8 × 3″",
    "connectors": "37-point male connector (32 points used)",
    "ip": "IP55",
    "dims": "850 x 1252 x 559 mm / 33.5 x 49.3 x 22 in",
    "amps": [
      {
        "model": "LA7.16",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 1,
            "splByPreset": [
              {
                "preset": "[L2D 70]",
                "spl": 151
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA7.16(1/1)",
    "img": "public/assets/img/speakers/la/l-series/spk-la-l2d-front.webp",
    "views": [
      {
        "label": "Front",
        "src": "public/assets/img/speakers/la/l-series/spk-la-l2d-front.webp"
      },
      {
        "label": "Rear",
        "src": "public/assets/img/speakers/la/l-series/spk-la-l2d-rear.webp"
      },
      {
        "label": "Array",
        "src": "public/assets/img/speakers/la/l-series/spk-la-l2-array.webp"
      },
      {
        "label": "On Chariot",
        "src": "public/assets/img/speakers/la/l-series/spk-la-l2-chariot.webp"
      }
    ],
    "cardHoverView": "Rear",
    "relations": {
      "ampIds": []
    },
    "watt": 1586,
    // [upload/L2D_v1.6.md 마스터 스키마 반영] Preset Guide/Delay Defaults/
    // Mechanical Safety 신규 반영. L2/L2D 공용 매뉴얼 챕터라 구조는 L2와
    // 동일 — L2D 단독으로 명시된 값만 채택(L2와의 혼합 배열 값은 제외).
    "presets": {
      "rows": [
        { "config": "L2D line source (단독)", "preset": "[L2D 70] / [L2D 90] / [L2D 110] / [L2D 70_S] / [L2D 90_S] / [L2D 110_S]", "acoustic": "45 Hz - 20 kHz", "acousticShort": "45 Hz - 20 kHz" },
        { "config": "L2D line source with coupled KS28", "preset": "[L2D xx] + [KS28 L2_C] / [KS28 L2_Cx]", "acoustic": "25 Hz - 20 kHz", "acousticShort": "25 Hz - 20 kHz" },
        { "config": "L2D line source with separated KS28", "preset": "[L2D xx] + [KS28 L2] / [KS28 L2_C] / [KS28 L2_Cx]", "acoustic": "25 Hz - 20 kHz", "acousticShort": "25 Hz - 20 kHz" }
      ],
      "notes": [
        { "text": "\"_S\" 접미사가 붙은 프리셋(예: [L2D 70_S])은 슈퍼카디오이드 모드를 가리킨다." },
        { "text": "Coupled/Separated KS28 배치 거리는 L2와 완전히 동일(공용 챕터) — 뒤쪽 1~2 m, 옆쪽 0.5~1 m, separated 최대 간격 2.8 m." }
      ],
      "delayDefaults": {
        "rows": [
          { "combo": "[L2D] + [KS28 L2]", "items": ["L2D = 0 ms", "KS28 = 5 ms (−)"] },
          { "combo": "[L2D] + [KS28 L2_C]", "items": ["L2D = 0 ms", "KS28 = 0 ms (−)"] },
          { "combo": "[L2D] + [KS28 L2_Cx]", "items": ["L2D = 0 ms", "KS28 = 5 ms (−)"] }
        ],
        "notes": [
          { "text": "별도 표기가 없으면 극성은 정상(+). L2D는 모든 조합에서 항상 정상(+), KS28은 항상 반전(−)." }
        ],
        "source": "L2_OM_EN_5.0.pdf p.54"
      },
      "source": "L2_OM_EN_5.0.pdf p.51-53"
    },
    "mechanicalSafety": {
      "safetyFactor": "4:1",
      "maxWindLoad": "6 Beaufort",
      "flownRows": [
        { "config": "flown", "accessory": "L2-ROLL", "safeLimit": "1", "maxLimit": "1" }
      ],
      "stackedRows": [
        { "config": "stacked", "accessory": "L2D-CHARIOT + K2-JACK", "safeLimit": "1", "maxLimit": "1" }
      ],
      "source": "L2_OM_EN_5.0.pdf (Mechanical safety, L2/L2D 공용 챕터)"
    }
  },
  {
    "id": "spk-la-l1",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "L1",
    "cardioidCapability": "No",
    "series": "L Series",
    "throwCat": "Long Throw",
    "type": "Progressive Ultra-Dense Line Source",
    "throw": "Long throw >35m",
    "lowInch": 15,
    "lowQty": 4,
    "crossover": "16-channel, active",
    "crossoverTags": [
      "16-channel",
      "active"
    ],
    "spl": 160,
    "cov": {
      "h": "90°,70°,45°/35°,35°/45°"
    },
    "freqs": [
      {
        "db": "-10 dB",
        "lo": "35 Hz",
        "hi": "20 kHz"
      }
    ],
    "weight": 256,
    "transducers": "LC: 2 × 18″ · LF: 4 × 15″ · MF: 8 × 8″ · HF: 6 × (4″ + 2.5″) Coaxial",
    "connectors": "37-point male connector (32 points used)",
    "ip": null,
    "dims": "1500 x 1005 x 750 mm / 59.1 x 39.6 x 29.5 in",
    "amps": [],
    "ampRaw": null,
    "img": "public/assets/img/speakers/la/l-series/spk-la-l1.webp",
    "views": [
      {
        "label": "Front",
        "src": "public/assets/img/speakers/la/l-series/spk-la-l1.webp"
      },
      {
        "label": "Rear",
        "src": "public/assets/img/speakers/la/l-series/spk-la-l1-rear.webp"
      },
      {
        "label": "Array (L1x2 + L1Dx1 + CS1x1)",
        "src": "public/assets/img/speakers/la/l-series/spk-la-l1-array.webp"
      }
    ],
    "cardHoverView": "Array (L1x2 + L1Dx1 + CS1x1)",
    "relations": {
      "ampIds": []
    },
    "watt": null
  },
  {
    "id": "spk-la-l1d",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "L1D",
    "cardioidCapability": "No",
    "series": "L Series",
    "throwCat": "Long Throw",
    "type": "Progressive Ultra-Dense Line Source",
    "throw": "Long throw >35m",
    "lowInch": 15,
    "lowQty": 4,
    "crossover": "16-channel, active",
    "crossoverTags": [
      "16-channel",
      "active"
    ],
    "spl": 155,
    "cov": {
      "h": "70°,110°,55°/35°,35°/55°"
    },
    "freqs": [
      {
        "db": "-10 dB",
        "lo": "35 Hz",
        "hi": "20 kHz"
      }
    ],
    "weight": 239,
    "transducers": "LC: 2 × 18″ · LF: 4 × 15″ · MF: 8 × 8″ · HF: 6 × (4″ + 2.5″) Coaxial",
    "connectors": "37-point male connector (32 points used)",
    "ip": null,
    "dims": "1500 x 1167 x 750 mm / 59.1 x 45.9 x 29.5 in",
    "amps": [],
    "ampRaw": null,
    "img": "public/assets/img/speakers/la/l-series/spk-la-l1d.webp",
    "imgBack": "public/assets/img/speakers/la/l-series/spk-la-l1d-rear.webp",
    "views": [
      {
        "label": "Front",
        "src": "public/assets/img/speakers/la/l-series/spk-la-l1d.webp"
      },
      {
        "label": "Rear",
        "src": "public/assets/img/speakers/la/l-series/spk-la-l1d-rear.webp"
      },
      {
        "label": "Array (L1x2 + L1Dx1 + CS1x1)",
        "src": "public/assets/img/speakers/la/l-series/spk-la-l1-array.webp"
      }
    ],
    "cardHoverView": "Rear",
    "relations": {
      "ampIds": []
    },
    "watt": null
  }
];
