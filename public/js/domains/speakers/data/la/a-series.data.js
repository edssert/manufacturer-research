// L-Acoustics A Series 스피커 데이터 (4개 모델).
// 필드 스키마 설명은 speakers.schema.js 참조.
// 파생 필드(wayCount / network / lowUnitConfig)는 로드 시 normalize 함수가 생성하므로 저장하지 않는다.
export const LA_A_SERIES = [
  {
    "id": "spk-la-a10-focus",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "A10 Focus",
    "series": "A Series",
    "throwCat": "Medium Throw",
    "type": "Constant Curvature Line",
    "throw": "Medium throw <45m",
    "lowInch": 10,
    "lowQty": 1,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 140,
    "cov": {
      "h": "70°,110°,55°/35°,35°/55°",
      "v": "10°"
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "75 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "70 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "66 Hz",
        "hi": "20 kHz"
      }
    ],
    // [upload/A10_Focus_v1.6.md 마스터 스키마 반영] Cardioid_Capability.
    "cardioidCapability": "No",
    "weight": 22,
    "transducers": "LF: 1 × 10″ · HF: 1 × 2.5″",
    "connectors": "4-point speakON",
    "ip": "IP55",
    "dims": "581 x 354 x 339 mm / 22.9 x 13.9 x 13.3 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 3,
            "total": 12,
            "splByPreset": [
              {
                "preset": "[A10]",
                "spl": 140
              }
            ]
          }
        ]
      },
      {
        "model": "LA2Xi",
        "configs": [
          {
            "mode": "BTL",
            "perCh": 1,
            "total": 2,
            "splByPreset": [
              {
                "preset": "[A10]",
                "spl": 140
              }
            ]
          }
        ]
      },
      {
        "model": "LA2Xi",
        "configs": [
          {
            "mode": "SE",
            "perCh": 2,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[A10]",
                "spl": 136
              }
            ]
          }
        ]
      },
      {
        "model": "LA4X",
        "configs": [
          {
            "mode": "",
            "perCh": 2,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[A10]",
                "spl": 140
              }
            ]
          }
        ]
      },
      {
        "model": "LA7.16",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 16,
            "splByPreset": [
              {
                "preset": "[A10]",
                "spl": 140
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/12), LA2Xi(BTL1/2), LA2Xi(SE2/8), LA4X(2/8), LA7.16(1/16)",
    "img": "public/assets/img/speakers/la/a-series/spk-la-a10-focus.webp",
    "views": [
      {
        "label": "Front",
        "src": "public/assets/img/speakers/la/a-series/spk-la-a10-focus.webp"
      },
      {
        "label": "Array",
        "src": "public/assets/img/speakers/la/a-series/spk-la-a10-focus-array.webp"
      }
    ],
    "relations": {
      "ampIds": []
    },
    "watt": 296,
    // [upload/A10_Focus_v1.6.md 마스터 스키마 반영] Preset Guide/Matching
    // Ratio/Delay Defaults/Mechanical Safety 전체 신규 반영.
    "presets": {
      "rows": [
        { "config": "A10 Focus line source", "preset": "[A10]", "acoustic": "66 Hz - 20 kHz", "acousticShort": "66 Hz - 20 kHz" },
        { "config": "A10 Focus line source element", "preset": "[A10_FI]", "acoustic": "66 Hz - 20 kHz", "acousticShort": "66 Hz - 20 kHz" },
        { "config": "A10 Focus + KS21", "preset": "[A10] + [KS21_100]", "acoustic": "reinforced LF contour, down to 31 Hz", "acousticShort": "reinforced contour, down to 31 Hz", "ratio": "1 A10 Focus : 1 KS21" }
      ],
      "notes": [
        { "text": "Acoustic Properties 열의 주파수 대역은 -10 dB 기준 대역폭/저역 한계다." },
        { "text": "카디오이드 배열 시 [KS21_100_C] 또는 [KS21_100_Cx] 프리셋을 쓴다." }
      ],
      "ratioSource": "A10_OM_EN.pdf p.49-52",
      "delayDefaults": {
        "rows": [
          { "combo": "[A10]/[A10_FI]/[A10_MO] + [KS21_100]", "items": ["A10 = 0 ms", "KS21 = 0 ms"] },
          { "combo": "[A10]/[A10_FI] + [KS21_100_C]", "items": ["A10 = 5.5 ms", "KS21 = 0 ms"] },
          { "combo": "[A10]/[A10_FI] + [KS21_100_Cx]", "items": ["A10 = 0 ms", "KS21 = 0 ms"] }
        ],
        "notes": [
          { "text": "3개 조합 전부 A10/KS21 양측 폴라리티가 정상(+)으로 확인됐다(반전 없음)." }
        ],
        "source": "A10_OM_EN.pdf p.50"
      },
      "source": "A10_OM_EN.pdf p.49-52"
    },
    "mechanicalSafety": {
      "flownRows": [
        { "config": "flown", "accessory": "X-BAR", "safeLimit": "1", "maxLimit": "1" }
      ],
      "stackedRows": [
        { "config": "vertical array", "accessory": "A10-BUMP", "safeLimit": "8", "maxLimit": "8" },
        { "config": "vertical array", "accessory": "A10-RIGBAR", "safeLimit": "4", "maxLimit": "4" },
        { "config": "vertical array with pullback", "accessory": "A10-BUMP + A10-RIGBAR", "safeLimit": "8", "maxLimit": "8" }
      ],
      "safetyFactor": "4:1",
      "maxWindLoad": "6 Beaufort",
      "source": "A10_OM_EN.pdf"
    }
  },
  {
    "id": "spk-la-a10i-focus",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "A10i Focus",
    "series": "A Series",
    "throwCat": "Medium Throw",
    "type": "Constant Curvature Line",
    "throw": "Medium throw <45m",
    "lowInch": 10,
    "lowQty": 1,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 140,
    "cov": {
      "h": "70°,110°,55°/35°,35°/55°",
      "v": "10°"
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "75 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "70 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "66 Hz",
        "hi": "20 kHz"
      }
    ],
    // [upload/A10i_Focus_v1.6.md 마스터 스키마 반영] Cardioid_Capability.
    "cardioidCapability": "No",
    "weight": 19,
    "transducers": "LF: 1 × 10″ · HF: 1 × 2.5″",
    "connectors": "4-point terminal block with push-in connection",
    "ip": "IP55",
    "dims": "569 x 350 x 339 mm / 22.4 x 13.8 x 13.3 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 3,
            "total": 12,
            "splByPreset": [
              {
                "preset": "[A10]",
                "spl": 140
              }
            ]
          }
        ]
      },
      {
        "model": "LA2Xi",
        "configs": [
          {
            "mode": "BTL",
            "perCh": 1,
            "total": 2,
            "splByPreset": [
              {
                "preset": "[A10]",
                "spl": 140
              }
            ]
          }
        ]
      },
      {
        "model": "LA2Xi",
        "configs": [
          {
            "mode": "SE",
            "perCh": 2,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[A10]",
                "spl": 136
              }
            ]
          }
        ]
      },
      {
        "model": "LA4X",
        "configs": [
          {
            "mode": "",
            "perCh": 2,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[A10]",
                "spl": 140
              }
            ]
          }
        ]
      },
      {
        "model": "LA7.16",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 16,
            "splByPreset": [
              {
                "preset": "[A10]",
                "spl": 140
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/12), LA2Xi(BTL1/2), LA2Xi(SE2/8), LA4X(2/8), LA7.16(1/16)",
    "img": "public/assets/img/speakers/la/a-series/spk-la-a10i-focus.webp",
    "views": [
      {
        "label": "Front",
        "src": "public/assets/img/speakers/la/a-series/spk-la-a10i-focus.webp"
      },
      {
        "label": "Array",
        "src": "public/assets/img/speakers/la/a-series/spk-la-a10i-focus-array.webp"
      }
    ],
    "notes": "A10 Wide/Focus의 설치용(install) 버전. L-Acoustics preset_guide_EN.pdf(v29.0)에 A10/A10i가 동일 인클로저로 팩토리 프리셋·앰프 매칭을 공유한다고 명시되어 있어 음향 스펙은 A10 Focus와 동일하게 반영. 물리 스펙은 공식 스펙시트(A10i_AE_EN.docx, 2026-07-10 확보)로 채움.",
    "relations": {
      "ampIds": []
    },
    "watt": 296,
    // [upload/A10i_Focus_v1.6.md 마스터 스키마 반영] Preset Guide/Matching
    // Ratio/Delay Defaults/Mechanical Safety 전체 신규 반영.
    "presets": {
      "rows": [
        { "config": "A10i Focus line source", "preset": "[A10]", "acoustic": "66 Hz - 20 kHz", "acousticShort": "66 Hz - 20 kHz" },
        { "config": "A10i Focus line source element", "preset": "[A10_FI]", "acoustic": "66 Hz - 20 kHz", "acousticShort": "66 Hz - 20 kHz" },
        { "config": "A10i Focus + KS21i", "preset": "[A10] + [KS21_100]", "acoustic": "reinforced LF contour, down to 31 Hz", "acousticShort": "reinforced contour, down to 31 Hz", "ratio": "1 A10i Focus : 1 KS21i" }
      ],
      "notes": [
        { "text": "Acoustic Properties 열의 주파수 대역은 -10 dB 기준 대역폭/저역 한계다." },
        { "text": "카디오이드 배열 시 [KS21_100_C] 또는 [KS21_100_Cx] 프리셋을 쓴다." }
      ],
      "ratioSource": "A10i_OM_EN.pdf p.51-53",
      "delayDefaults": {
        "rows": [
          { "combo": "[A10]/[A10_FI]/[A10_MO] + [KS21_100]", "items": ["A10i Focus = 0 ms", "KS21i = 0 ms"] },
          { "combo": "[A10]/[A10_FI] + [KS21_100_C]", "items": ["A10i Focus = 5.5 ms", "KS21i = 0 ms"] },
          { "combo": "[A10]/[A10_FI] + [KS21_100_Cx]", "items": ["A10i Focus = 0 ms", "KS21i = 0 ms"] }
        ],
        "notes": [
          { "text": "3개 조합 전부 A10i Focus/KS21i 양측 폴라리티가 정상(+)으로 확인됐다(반전 없음)." }
        ],
        "source": "A10i_OM_EN.pdf p.53"
      },
      "source": "A10i_OM_EN.pdf p.51-53"
    },
    "mechanicalSafety": {
      "stackedRows": [
        { "config": "vertical array", "accessory": "A10i-BUMP + rigging plates", "safeLimit": "8", "maxLimit": "8" },
        { "config": "vertical array", "accessory": "A10-Ui", "safeLimit": "1", "maxLimit": "1" },
        { "config": "vertical array", "accessory": "A10-Ui + A10i-ULINK II", "safeLimit": "2", "maxLimit": "2" },
        { "config": "vertical array with pullback", "accessory": "A10i-BUMP + rigging plates + A10i-RIGBAR", "safeLimit": "12", "maxLimit": "12" },
        { "config": "vertical array with pullback", "accessory": "A10i-RIGBAR x2 + rigging plates", "safeLimit": "12", "maxLimit": "12" },
        { "config": "stacked vertical array", "accessory": "Ai-FIXBRACKET + rigging plates", "safeLimit": "4", "maxLimit": "4" },
        { "config": "stacked vertical array with angle adjustment", "accessory": "A10i-TILTBRACKET + rigging plates", "safeLimit": "4", "maxLimit": "4" },
        { "config": "stacked on KS21i", "accessory": "Ai-FIXBRACKET + rigging plates", "safeLimit": "4 A10i Focus", "maxLimit": "4 KS21i" },
        { "config": "stacked on KS21i, angle adjustment", "accessory": "Ai-FIXBRACKET + A10i-TILT + rigging plates", "safeLimit": "4 A10i Focus", "maxLimit": "4 KS21i" }
      ],
      "safetyFactor": "4:1",
      "source": "A10i_OM_EN.pdf"
    }
  },
  {
    "id": "spk-la-a10-wide",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "A10 Wide",
    "series": "A Series",
    "throwCat": "Medium Throw",
    "type": "Constant Curvature Line",
    "throw": "Medium throw <45m",
    "lowInch": 10,
    "lowQty": 1,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 137,
    "cov": {
      "h": "70°,110°,55°/35°,35°/55°",
      "v": "30°"
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "78 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "72 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "67 Hz",
        "hi": "20 kHz"
      }
    ],
    // [upload/A10_Wide_v1.6.md 마스터 스키마 반영] Cardioid_Capability.
    "cardioidCapability": "No",
    "weight": 20,
    "transducers": "LF: 1 × 10″ · HF: 1 × 2.5″",
    "connectors": "4-point speakON",
    "ip": "IP55",
    "dims": "581 x 347 x 180 mm / 22.9 x 13.7 x 7.1 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 3,
            "total": 12,
            "splByPreset": [
              {
                "preset": "[A10]",
                "spl": 137
              }
            ]
          }
        ]
      },
      {
        "model": "LA2Xi",
        "configs": [
          {
            "mode": "BTL",
            "perCh": 1,
            "total": 2,
            "splByPreset": [
              {
                "preset": "[A10]",
                "spl": 137
              }
            ]
          }
        ]
      },
      {
        "model": "LA2Xi",
        "configs": [
          {
            "mode": "SE",
            "perCh": 2,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[A10]",
                "spl": 133
              }
            ]
          }
        ]
      },
      {
        "model": "LA4X",
        "configs": [
          {
            "mode": "",
            "perCh": 2,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[A10]",
                "spl": 137
              }
            ]
          }
        ]
      },
      {
        "model": "LA7.16",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 16,
            "splByPreset": [
              {
                "preset": "[A10]",
                "spl": 137
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/12), LA2Xi(BTL1/2), LA2Xi(SE2/8), LA4X(2/8), LA7.16(1/16)",
    "img": "public/assets/img/speakers/la/a-series/spk-la-a10-wide.webp",
    "views": [
      {
        "label": "Front",
        "src": "public/assets/img/speakers/la/a-series/spk-la-a10-wide.webp"
      },
      {
        "label": "Array",
        "src": "public/assets/img/speakers/la/a-series/spk-la-a10-wide-array.webp"
      }
    ],
    "relations": {
      "ampIds": []
    },
    "watt": 296,
    // [upload/A10_Wide_v1.6.md 마스터 스키마 반영] Preset Guide/Matching
    // Ratio/Delay Defaults/Mechanical Safety 전체 신규 반영.
    "presets": {
      "rows": [
        { "config": "A10 Wide line source", "preset": "[A10]", "acoustic": "67 Hz - 20 kHz", "acousticShort": "67 Hz - 20 kHz" },
        { "config": "A10 Wide line source element", "preset": "[A10_FI]", "acoustic": "67 Hz - 20 kHz", "acousticShort": "67 Hz - 20 kHz" },
        { "config": "A10 Wide + KS21", "preset": "[A10] + [KS21_100]", "acoustic": "reinforced LF contour, down to 31 Hz", "acousticShort": "reinforced contour, down to 31 Hz", "ratio": "1 A10 Wide : 1 KS21" }
      ],
      "notes": [
        { "text": "Acoustic Properties 열의 주파수 대역은 -10 dB 기준 대역폭/저역 한계다." },
        { "text": "카디오이드 배열 시 [KS21_100_C] 또는 [KS21_100_Cx] 프리셋을 쓴다." }
      ],
      "ratioSource": "A10_OM_EN.pdf p.49-52",
      "delayDefaults": {
        "rows": [
          { "combo": "[A10]/[A10_FI]/[A10_MO] + [KS21_100]", "items": ["A10 = 0 ms", "KS21 = 0 ms"] },
          { "combo": "[A10]/[A10_FI] + [KS21_100_C]", "items": ["A10 = 5.5 ms", "KS21 = 0 ms"] },
          { "combo": "[A10]/[A10_FI] + [KS21_100_Cx]", "items": ["A10 = 0 ms", "KS21 = 0 ms"] }
        ],
        "notes": [
          { "text": "3개 조합 전부 A10/KS21 양측 폴라리티가 정상(+)으로 확인됐다(반전 없음)." }
        ],
        "source": "A10_OM_EN.pdf p.50"
      },
      "source": "A10_OM_EN.pdf p.49-52"
    },
    "mechanicalSafety": {
      "flownRows": [
        { "config": "flown", "accessory": "X-BAR", "safeLimit": "1", "maxLimit": "1" }
      ],
      "stackedRows": [
        { "config": "vertical array", "accessory": "A10-BUMP", "safeLimit": "8", "maxLimit": "8" },
        { "config": "vertical array", "accessory": "A10-RIGBAR", "safeLimit": "4", "maxLimit": "4" },
        { "config": "vertical array with pullback", "accessory": "A10-BUMP + A10-RIGBAR", "safeLimit": "4", "maxLimit": "4" }
      ],
      "safetyFactor": "4:1",
      "maxWindLoad": "6 Beaufort",
      "source": "A10_OM_EN.pdf"
    }
  },
  {
    "id": "spk-la-a10i-wide",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "A10i Wide",
    "series": "A Series",
    "throwCat": "Medium Throw",
    "type": "Constant Curvature Line",
    "throw": "Medium throw <45m",
    "lowInch": 10,
    "lowQty": 1,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 137,
    "cov": {
      "h": "70°,110°,55°/35°,35°/55°",
      "v": "30°"
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "78 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "72 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "67 Hz",
        "hi": "20 kHz"
      }
    ],
    // [upload/A10i_Wide_v1.7.md 마스터 스키마 반영] Cardioid_Capability.
    "cardioidCapability": "No",
    "weight": 18,
    "transducers": "LF: 1 × 10″ · HF: 1 × 2.5″",
    "connectors": "4-point terminal block with push-in connection",
    "ip": "IP55",
    "dims": "569 x 347 x 345 mm / 22.4 x 13.7 x 13.6 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 3,
            "total": 12,
            "splByPreset": [
              {
                "preset": "[A10]",
                "spl": 137
              }
            ]
          }
        ]
      },
      {
        "model": "LA2Xi",
        "configs": [
          {
            "mode": "BTL",
            "perCh": 1,
            "total": 2,
            "splByPreset": [
              {
                "preset": "[A10]",
                "spl": 137
              }
            ]
          }
        ]
      },
      {
        "model": "LA2Xi",
        "configs": [
          {
            "mode": "SE",
            "perCh": 2,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[A10]",
                "spl": 133
              }
            ]
          }
        ]
      },
      {
        "model": "LA4X",
        "configs": [
          {
            "mode": "",
            "perCh": 2,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[A10]",
                "spl": 137
              }
            ]
          }
        ]
      },
      {
        "model": "LA7.16",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 16,
            "splByPreset": [
              {
                "preset": "[A10]",
                "spl": 137
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/12), LA2Xi(BTL1/2), LA2Xi(SE2/8), LA4X(2/8), LA7.16(1/16)",
    "img": "public/assets/img/speakers/la/a-series/spk-la-a10i-wide.webp",
    "views": [
      {
        "label": "Front",
        "src": "public/assets/img/speakers/la/a-series/spk-la-a10i-wide.webp"
      },
      {
        "label": "Array",
        "src": "public/assets/img/speakers/la/a-series/spk-la-a10i-wide-array.webp"
      }
    ],
    "notes": "A10 Wide/Focus의 설치용(install) 버전. L-Acoustics preset_guide_EN.pdf(v29.0)에 A10/A10i가 동일 인클로저로 팩토리 프리셋·앰프 매칭을 공유한다고 명시되어 있어 음향 스펙은 A10 Wide와 동일하게 반영. 물리 스펙은 공식 스펙시트(A10i_AE_EN.docx, 2026-07-10 확보)로 채움.",
    "relations": {
      "ampIds": []
    },
    "watt": 296,
    // [upload/A10i_Wide_v1.7.md 마스터 스키마 반영] Preset Guide/Matching
    // Ratio/Delay Defaults/Mechanical Safety 전체 신규 반영.
    "presets": {
      "rows": [
        { "config": "A10i Wide line source", "preset": "[A10]", "acoustic": "67 Hz - 20 kHz", "acousticShort": "67 Hz - 20 kHz" },
        { "config": "A10i Wide line source element", "preset": "[A10_FI]", "acoustic": "67 Hz - 20 kHz", "acousticShort": "67 Hz - 20 kHz" },
        { "config": "A10i Wide + KS21i", "preset": "[A10] + [KS21_100]", "acoustic": "reinforced LF contour, down to 31 Hz", "acousticShort": "reinforced contour, down to 31 Hz", "ratio": "1 A10i Wide : 1 KS21i" }
      ],
      "notes": [
        { "text": "Acoustic Properties 열의 주파수 대역은 -10 dB 기준 대역폭/저역 한계다." },
        { "text": "카디오이드 배열 시 [KS21_100_C] 또는 [KS21_100_Cx] 프리셋을 쓴다." }
      ],
      "ratioSource": "A10i_OM_EN.pdf p.51-53",
      "delayDefaults": {
        "rows": [
          { "combo": "[A10]/[A10_FI]/[A10_MO] + [KS21_100]", "items": ["A10i Wide = 0 ms", "KS21i = 0 ms"] },
          { "combo": "[A10]/[A10_FI] + [KS21_100_C]", "items": ["A10i Wide = 5.5 ms", "KS21i = 0 ms"] },
          { "combo": "[A10]/[A10_FI] + [KS21_100_Cx]", "items": ["A10i Wide = 0 ms", "KS21i = 0 ms"] }
        ],
        "notes": [
          { "text": "3개 조합 전부 A10i Wide/KS21i 양측 폴라리티가 정상(+)으로 확인됐다(반전 없음)." }
        ],
        "source": "A10i_OM_EN.pdf p.53"
      },
      "source": "A10i_OM_EN.pdf p.51-53"
    },
    "mechanicalSafety": {
      "stackedRows": [
        { "config": "vertical array", "accessory": "A10i-BUMP + rigging plates", "safeLimit": "8", "maxLimit": "8" },
        { "config": "vertical array", "accessory": "A10-Ui", "safeLimit": "1", "maxLimit": "1" },
        { "config": "vertical array", "accessory": "A10-Ui + A10i-ULINK II", "safeLimit": "2", "maxLimit": "2" },
        { "config": "vertical array with pullback", "accessory": "A10i-BUMP + rigging plates + A10i-RIGBAR", "safeLimit": "8", "maxLimit": "8" },
        { "config": "vertical array with pullback", "accessory": "A10i-RIGBAR x2 + rigging plates", "safeLimit": "12", "maxLimit": "12" },
        { "config": "stacked vertical array", "accessory": "Ai-FIXBRACKET + rigging plates", "safeLimit": "4", "maxLimit": "4" },
        { "config": "stacked vertical array with angle adjustment", "accessory": "A10i-TILTBRACKET + rigging plates", "safeLimit": "4", "maxLimit": "4" },
        { "config": "stacked on KS21i", "accessory": "Ai-FIXBRACKET + rigging plates", "safeLimit": "4 A10i Wide", "maxLimit": "4 KS21i" },
        { "config": "stacked on KS21i, angle adjustment", "accessory": "Ai-FIXBRACKET + A10i-TILT + rigging plates", "safeLimit": "4 A10i Wide", "maxLimit": "4 KS21i" }
      ],
      "safetyFactor": "4:1",
      "source": "A10i_OM_EN.pdf"
    }
  },
  {
    "id": "spk-la-a15-focus",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "A15 Focus",
    "series": "A Series",
    "throwCat": "Medium Throw",
    "type": "Constant Curvature Line",
    "throw": "Medium throw <45m",
    "lowInch": 15,
    "lowQty": 1,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 144,
    "cov": {
      "h": "70°,110°,55°/35°,35°/55°",
      "v": "10°"
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "47 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "44 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "41 Hz",
        "hi": "20 kHz"
      }
    ],
    // [upload/A15_Focus_v1.7.md 마스터 스키마 반영] Cardioid_Capability.
    "cardioidCapability": "No",
    "weight": 35,
    "transducers": "LF: 1 × 15″ · HF: 1 × 3″",
    "connectors": "4-point speakON",
    "ip": "IP55",
    "dims": "762 x 427 x 490 mm / 30 x 16.8 x 19.3 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 3,
            "total": 12,
            "splByPreset": [
              {
                "preset": "[A15]",
                "spl": 144
              }
            ]
          }
        ]
      },
      {
        "model": "LA2Xi",
        "configs": [
          {
            "mode": "BTL",
            "perCh": 1,
            "total": 2,
            "splByPreset": [
              {
                "preset": "[A15]",
                "spl": 144
              }
            ]
          }
        ]
      },
      {
        "model": "LA2Xi",
        "configs": [
          {
            "mode": "SE",
            "perCh": 1,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[A15]",
                "spl": 139
              }
            ]
          }
        ]
      },
      {
        "model": "LA4X",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[A15]",
                "spl": 144
              }
            ]
          }
        ]
      },
      {
        "model": "LA7.16",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 10,
            "splByPreset": [
              {
                "preset": "[A15]",
                "spl": 144
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/12), LA2Xi(BTL1/2), LA2Xi(SE1/4), LA4X(1/4), LA7.16(1/10)",
    "img": "public/assets/img/speakers/la/a-series/spk-la-a15-focus.webp",
    "views": [
      {
        "label": "Front",
        "src": "public/assets/img/speakers/la/a-series/spk-la-a15-focus.webp"
      },
      {
        "label": "Array",
        "src": "public/assets/img/speakers/la/a-series/spk-la-a15-focus-array.webp"
      }
    ],
    "relations": {
      "ampIds": []
    },
    "watt": 446,
    // [upload/A15_Focus_v1.7.md 마스터 스키마 반영] Preset Guide/Matching
    // Ratio/Delay Defaults/Mechanical Safety 전체 신규 반영.
    "presets": {
      "rows": [
        { "config": "A15 Focus line source", "preset": "[A15]", "acoustic": "41 Hz - 20 kHz", "acousticShort": "41 Hz - 20 kHz" },
        { "config": "A15 Focus line source element", "preset": "[A15_FI]", "acoustic": "42 Hz - 20 kHz", "acousticShort": "42 Hz - 20 kHz" },
        { "config": "A15 Focus + KS21", "preset": "[A15] + [KS21_60]", "acoustic": "reinforced LF contour, down to 29 Hz", "acousticShort": "reinforced contour, down to 29 Hz", "ratio": "1 A15 Focus : 1 KS21" }
      ],
      "notes": [
        { "text": "Acoustic Properties 열의 주파수 대역은 -10 dB 기준 대역폭/저역 한계다. line source 단독(41Hz)과 line source element 단독(42Hz)은 원문에도 서로 다른 하한으로 명시되어 있다(오기재 아님)." },
        { "text": "카디오이드 배열 시 [KS21_60_C] 또는 [KS21_60_Cx] 프리셋을 쓴다." }
      ],
      "ratioSource": "A15_OM_EN.pdf p.49-52",
      "delayDefaults": {
        "rows": [
          { "combo": "[A15]/[A15_FI]/[A15_MO] + [KS21_60]", "items": ["A15 Focus = 0 ms", "KS21 = 2.3 ms"] },
          { "combo": "[A15]/[A15_FI] + [KS21_60_C]", "items": ["A15 Focus = 9 ms", "KS21 = 0 ms (−)"] },
          { "combo": "[A15]/[A15_FI] + [KS21_60_Cx]", "items": ["A15 Focus = 8 ms", "KS21 = 0 ms"] }
        ],
        "notes": [
          { "text": "별도 표기가 없으면 극성은 반전 없는 정상(+). [KS21_60_C] 조합만 KS21이 반전(-)이고, 나머지 두 조합은 KS21도 정상(+)이다." }
        ],
        "source": "A15_OM_EN.pdf p.51-52"
      },
      "source": "A15_OM_EN.pdf p.49-52"
    },
    "mechanicalSafety": {
      "flownRows": [
        { "config": "flown", "accessory": "X-BAR", "safeLimit": "1", "maxLimit": "1" }
      ],
      "stackedRows": [
        { "config": "vertical array", "accessory": "A15-BUMP + M-BAR (optional)", "safeLimit": "8", "maxLimit": "8" },
        { "config": "vertical array", "accessory": "A15-RIGBAR", "safeLimit": "4", "maxLimit": "4" },
        { "config": "vertical array with pullback", "accessory": "A15-BUMP + M-BAR (optional) + A15-RIGBAR", "safeLimit": "8", "maxLimit": "8" },
        { "config": "vertical array with pullback", "accessory": "2 x A15-RIGBAR", "safeLimit": "4", "maxLimit": "4" },
        { "config": "stacked vertical array", "accessory": "no rigging accessory", "safeLimit": "1", "maxLimit": "1" },
        { "config": "stacked vertical array", "accessory": "KS21-OUTRIG", "safeLimit": "4", "maxLimit": "4" },
        { "config": "pole-mounted", "accessory": "A-MOUNT", "safeLimit": "1", "maxLimit": "1" },
        { "config": "stacked on KS21, angle adjustment", "accessory": "A-TILT + KS21-OUTRIG or KS21-CHARIOT with K2-JACK", "safeLimit": "4 (KS21 포함)", "maxLimit": "4 A15 Focus + 4 KS21" },
        { "config": "stacked on KS21", "accessory": "KS21-OUTRIG or KS21-CHARIOT with K2-JACK", "safeLimit": "3 A15 Focus", "maxLimit": "3 KS21" }
      ],
      "safetyFactor": "4:1",
      "maxWindLoad": "6 Beaufort",
      "source": "A15_OM_EN.pdf"
    }
  },
  {
    "id": "spk-la-a15i-focus",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "A15i Focus",
    "series": "A Series",
    "throwCat": "Medium Throw",
    "type": "Constant Curvature Line",
    "throw": "Medium throw <45m",
    "lowInch": 15,
    "lowQty": 1,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 144,
    "cov": {
      "h": "70°,110°,55°/35°,35°/55°",
      "v": "10°"
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "47 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "44 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "41 Hz",
        "hi": "20 kHz"
      }
    ],
    // [upload/A15i_Focus_v1.6.md 마스터 스키마 반영] Cardioid_Capability.
    "cardioidCapability": "No",
    // [upload/A15i_Focus_v1.6.md 마스터 스키마 재검증 — 값 정정] 33kg → 32kg
    // (OM 스펙 표 기준; AE_EN.docx의 33kg과 소스 간 충돌 확인, OM 우선 원칙).
    "weight": 32,
    "transducers": "LF: 1 × 15″ · HF: 1 × 3″",
    "connectors": "4-point terminal block with push-in connection",
    "ip": "IP55",
    "dims": "752 x 427 x 490 mm / 30 x 16.8 x 19.3 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 3,
            "total": 12,
            "splByPreset": [
              {
                "preset": "[A15]",
                "spl": 144
              }
            ]
          }
        ]
      },
      {
        "model": "LA2Xi",
        "configs": [
          {
            "mode": "BTL",
            "perCh": 1,
            "total": 2,
            "splByPreset": [
              {
                "preset": "[A15]",
                "spl": 144
              }
            ]
          }
        ]
      },
      {
        "model": "LA2Xi",
        "configs": [
          {
            "mode": "SE",
            "perCh": 1,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[A15]",
                "spl": 139
              }
            ]
          }
        ]
      },
      {
        "model": "LA4X",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[A15]",
                "spl": 144
              }
            ]
          }
        ]
      },
      {
        "model": "LA7.16",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 10,
            "splByPreset": [
              {
                "preset": "[A15]",
                "spl": 144
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/12), LA2Xi(BTL1/2), LA2Xi(SE1/4), LA4X(1/4), LA7.16(1/10)",
    "img": "public/assets/img/speakers/la/a-series/spk-la-a15i-focus.webp",
    "views": [
      {
        "label": "Front",
        "src": "public/assets/img/speakers/la/a-series/spk-la-a15i-focus.webp"
      },
      {
        "label": "Array",
        "src": "public/assets/img/speakers/la/a-series/spk-la-a15i-focus-array.webp"
      }
    ],
    "notes": "A15 Wide/Focus의 설치용(install) 버전. L-Acoustics preset_guide_EN.pdf(v29.0)에 A15/A15i가 동일 인클로저로 팩토리 프리셋·앰프 매칭을 공유한다고 명시되어 있어 음향 스펙은 A15 Focus와 동일하게 반영. 물리 스펙은 공식 스펙시트(A15i_AE_EN.docx, 2026-07-10 확보)로 채움.",
    "relations": {
      "ampIds": []
    },
    "watt": 446,
    // [upload/A15i_Focus_v1.6.md 마스터 스키마 반영] Preset Guide/Matching
    // Ratio/Delay Defaults/Mechanical Safety 전체 신규 반영.
    "presets": {
      "rows": [
        { "config": "A15i Focus line source", "preset": "[A15]", "acoustic": "41 Hz - 20 kHz", "acousticShort": "41 Hz - 20 kHz" },
        { "config": "A15i Focus line source element", "preset": "[A15_FI]", "acoustic": "42 Hz - 20 kHz", "acousticShort": "42 Hz - 20 kHz" },
        { "config": "A15i Focus + KS21i", "preset": "[A15] + [KS21_60]", "acoustic": "reinforced LF contour, down to 29 Hz", "acousticShort": "reinforced contour, down to 29 Hz", "ratio": "1 A15i Focus : 1 KS21i" }
      ],
      "notes": [
        { "text": "Acoustic Properties 열의 주파수 대역은 -10 dB 기준 대역폭/저역 한계다." },
        { "text": "카디오이드 배열 시 [KS21_60_C] 또는 [KS21_60_Cx] 프리셋을 쓴다." }
      ],
      "ratioSource": "A15i_OM_EN.pdf p.47-50",
      "delayDefaults": {
        "rows": [
          { "combo": "[A15]/[A15_FI]/[A15_MO] + [KS21_60]", "items": ["A15i Focus = 0 ms", "KS21i = 2.3 ms"] },
          { "combo": "[A15]/[A15_FI] + [KS21_60_C]", "items": ["A15i Focus = 9 ms", "KS21i = 0 ms (−)"] },
          { "combo": "[A15]/[A15_FI] + [KS21_60_Cx]", "items": ["A15i Focus = 8 ms", "KS21i = 0 ms"] }
        ],
        "notes": [
          { "text": "별도 표기가 없으면 극성은 반전 없는 정상(+). [KS21_60_C] 조합만 KS21i가 반전(-)이다(A15와 동일 패턴)." }
        ],
        "source": "A15i_OM_EN.pdf p.49-50"
      },
      "source": "A15i_OM_EN.pdf p.47-50"
    },
    "mechanicalSafety": {
      "stackedRows": [
        { "config": "vertical array", "accessory": "A15i-BUMP + M-BARi (optional) + rigging plates", "safeLimit": "8", "maxLimit": "8" },
        { "config": "vertical array", "accessory": "A15KS-Ui", "safeLimit": "1", "maxLimit": "1" },
        { "config": "vertical array", "accessory": "A15KS-Ui + A15i-ULINK II", "safeLimit": "2", "maxLimit": "2" },
        { "config": "vertical array with pullback", "accessory": "A15i-BUMP + rigging plates + A15i-RIGBAR", "safeLimit": "12", "maxLimit": "12" },
        { "config": "vertical array with pullback", "accessory": "A15i-RIGBAR x2 + rigging plates", "safeLimit": "8", "maxLimit": "8" },
        { "config": "stacked vertical array", "accessory": "Ai-FIXBRACKET + rigging plates", "safeLimit": "4", "maxLimit": "4" },
        { "config": "stacked vertical array with angle adjustment", "accessory": "A15i-TILTBRACKET + rigging plates", "safeLimit": "4", "maxLimit": "4" },
        { "config": "stacked on KS21i, pullback", "accessory": "A15i-BUMP + A15i-TILT (optional) + rigging plates + A15i-RIGBAR", "safeLimit": "4 A15i Focus", "maxLimit": "4 KS21i" }
      ],
      "safetyFactor": "4:1",
      "source": "A15i_OM_EN.pdf"
    }
  },
  {
    "id": "spk-la-a15-wide",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "A15 Wide",
    "series": "A Series",
    "throwCat": "Medium Throw",
    "type": "Constant Curvature Line",
    "throw": "Medium throw <45m",
    "lowInch": 15,
    "lowQty": 1,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 141,
    "cov": null,
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "52 Hz",
        "hi": "19 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "47 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "42 Hz",
        "hi": "20 kHz"
      }
    ],
    // [upload/A15_Wide_v1.6.md 마스터 스키마 반영] Cardioid_Capability.
    "cardioidCapability": "No",
    "weight": 33,
    "transducers": "LF: 1 × 15″ · HF: 1 × 3″",
    "connectors": "4-point speakON",
    "ip": "IP55",
    "dims": "762 x 424 x 494 mm / 30 x 16.7 x 19.4 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 3,
            "total": 12,
            "splByPreset": [
              {
                "preset": "[A15]",
                "spl": 141
              }
            ]
          }
        ]
      },
      {
        "model": "LA2Xi",
        "configs": [
          {
            "mode": "BTL",
            "perCh": 1,
            "total": 2,
            "splByPreset": [
              {
                "preset": "[A15]",
                "spl": 141
              }
            ]
          }
        ]
      },
      {
        "model": "LA2Xi",
        "configs": [
          {
            "mode": "SE",
            "perCh": 1,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[A15]",
                "spl": 136
              }
            ]
          }
        ]
      },
      {
        "model": "LA4X",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[A15]",
                "spl": 141
              }
            ]
          }
        ]
      },
      {
        "model": "LA7.16",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 10,
            "splByPreset": [
              {
                "preset": "[A15]",
                "spl": 141
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/12), LA2Xi(BTL1/2), LA2Xi(SE1/4), LA4X(1/4), LA7.16(1/10)",
    "img": "public/assets/img/speakers/la/a-series/spk-la-a15-wide.webp",
    "views": [
      {
        "label": "Front",
        "src": "public/assets/img/speakers/la/a-series/spk-la-a15-wide.webp"
      },
      {
        "label": "Array",
        "src": "public/assets/img/speakers/la/a-series/spk-la-a15-wide-array.webp"
      }
    ],
    "relations": {
      "ampIds": []
    },
    "watt": 446,
    // [upload/A15_Wide_v1.6.md 마스터 스키마 반영] Preset Guide/Matching
    // Ratio/Delay Defaults/Mechanical Safety 전체 신규 반영.
    "presets": {
      "rows": [
        { "config": "A15 Wide line source", "preset": "[A15]", "acoustic": "42 Hz - 20 kHz", "acousticShort": "42 Hz - 20 kHz" },
        { "config": "A15 Wide line source element", "preset": "[A15_FI]", "acoustic": "43 Hz - 20 kHz", "acousticShort": "43 Hz - 20 kHz" },
        { "config": "A15 Wide + KS21", "preset": "[A15] + [KS21_60]", "acoustic": "reinforced LF contour, down to 29 Hz", "acousticShort": "reinforced contour, down to 29 Hz", "ratio": "1 A15 Wide : 1 KS21" }
      ],
      "notes": [
        { "text": "Acoustic Properties 열의 주파수 대역은 -10 dB 기준 대역폭/저역 한계다." },
        { "text": "카디오이드 배열 시 [KS21_60_C] 또는 [KS21_60_Cx] 프리셋을 쓴다." }
      ],
      "ratioSource": "A15_OM_EN.pdf p.49-52",
      "delayDefaults": {
        "rows": [
          { "combo": "[A15]/[A15_FI]/[A15_MO] + [KS21_60]", "items": ["A15 Wide = 0 ms", "KS21 = 2.3 ms"] },
          { "combo": "[A15]/[A15_FI] + [KS21_60_C]", "items": ["A15 Wide = 9 ms", "KS21 = 0 ms (−)"] },
          { "combo": "[A15]/[A15_FI] + [KS21_60_Cx]", "items": ["A15 Wide = 8 ms", "KS21 = 0 ms"] }
        ],
        "notes": [
          { "text": "별도 표기가 없으면 극성은 반전 없는 정상(+). [KS21_60_C] 조합만 KS21이 반전(-)이다." }
        ],
        "source": "A15_OM_EN.pdf p.51-52"
      },
      "source": "A15_OM_EN.pdf p.49-52"
    },
    "mechanicalSafety": {
      "flownRows": [
        { "config": "flown", "accessory": "X-BAR", "safeLimit": "1", "maxLimit": "1" }
      ],
      "stackedRows": [
        { "config": "vertical array", "accessory": "A15-BUMP + M-BAR (optional)", "safeLimit": "8", "maxLimit": "8" },
        { "config": "vertical array", "accessory": "A15-RIGBAR", "safeLimit": "4", "maxLimit": "4" },
        { "config": "vertical array with pullback", "accessory": "A15-BUMP + M-BAR (optional) + A15-RIGBAR", "safeLimit": "5", "maxLimit": "5" },
        { "config": "vertical array with pullback", "accessory": "2 x A15-RIGBAR", "safeLimit": "4", "maxLimit": "4" },
        { "config": "stacked vertical array", "accessory": "no rigging accessory", "safeLimit": "1", "maxLimit": "1" },
        { "config": "stacked vertical array", "accessory": "KS21-OUTRIG", "safeLimit": "4", "maxLimit": "4" },
        { "config": "pole-mounted", "accessory": "A-MOUNT", "safeLimit": "1", "maxLimit": "1" },
        { "config": "stacked on KS21, angle adjustment", "accessory": "A-TILT + KS21-OUTRIG or KS21-CHARIOT with K2-JACK", "safeLimit": "4 (KS21 포함)", "maxLimit": "4 A15 Wide + 4 KS21" },
        { "config": "stacked on KS21", "accessory": "KS21-OUTRIG or KS21-CHARIOT with K2-JACK", "safeLimit": "2 A15 Wide", "maxLimit": "3 KS21" }
      ],
      "safetyFactor": "4:1",
      "maxWindLoad": "6 Beaufort",
      "source": "A15_OM_EN.pdf"
    }
  },
  {
    "id": "spk-la-a15i-wide",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "A15i Wide",
    "series": "A Series",
    "throwCat": "Medium Throw",
    "type": "Constant Curvature Line",
    "throw": "Medium throw <45m",
    "lowInch": 15,
    "lowQty": 1,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 141,
    "cov": null,
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "52 Hz",
        "hi": "19 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "47 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "42 Hz",
        "hi": "20 kHz"
      }
    ],
    // [upload/A15i_Wide_v1.6.md 마스터 스키마 반영] Cardioid_Capability.
    "cardioidCapability": "No",
    "weight": 29,
    "transducers": "LF: 1 × 15″ · HF: 1 × 3″",
    "connectors": "4-point terminal block with push-in connection",
    "ip": "IP55",
    "dims": "752 x 424 x 494 mm / 30 x 16.7 x 19.4 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 3,
            "total": 12,
            "splByPreset": [
              {
                "preset": "[A15]",
                "spl": 141
              }
            ]
          }
        ]
      },
      {
        "model": "LA2Xi",
        "configs": [
          {
            "mode": "BTL",
            "perCh": 1,
            "total": 2,
            "splByPreset": [
              {
                "preset": "[A15]",
                "spl": 141
              }
            ]
          }
        ]
      },
      {
        "model": "LA2Xi",
        "configs": [
          {
            "mode": "SE",
            "perCh": 1,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[A15]",
                "spl": 136
              }
            ]
          }
        ]
      },
      {
        "model": "LA4X",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[A15]",
                "spl": 141
              }
            ]
          }
        ]
      },
      {
        "model": "LA7.16",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 10,
            "splByPreset": [
              {
                "preset": "[A15]",
                "spl": 141
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/12), LA2Xi(BTL1/2), LA2Xi(SE1/4), LA4X(1/4), LA7.16(1/10)",
    "img": "public/assets/img/speakers/la/a-series/spk-la-a15i-wide.webp",
    "views": [
      {
        "label": "Front",
        "src": "public/assets/img/speakers/la/a-series/spk-la-a15i-wide.webp"
      },
      {
        "label": "Array",
        "src": "public/assets/img/speakers/la/a-series/spk-la-a15i-wide-array.webp"
      }
    ],
    "notes": "A15 Wide/Focus의 설치용(install) 버전. L-Acoustics preset_guide_EN.pdf(v29.0)에 A15/A15i가 동일 인클로저로 팩토리 프리셋·앰프 매칭을 공유한다고 명시되어 있어 음향 스펙은 A15 Wide와 동일하게 반영. 물리 스펙은 공식 스펙시트(A15i_AE_EN.docx, 2026-07-10 확보)로 채움.",
    "relations": {
      "ampIds": []
    },
    "watt": 446,
    // [upload/A15i_Wide_v1.6.md 마스터 스키마 반영] Preset Guide/Matching
    // Ratio/Delay Defaults/Mechanical Safety 전체 신규 반영.
    "presets": {
      "rows": [
        { "config": "A15i Wide line source", "preset": "[A15]", "acoustic": "42 Hz - 20 kHz", "acousticShort": "42 Hz - 20 kHz" },
        { "config": "A15i Wide line source element", "preset": "[A15_FI]", "acoustic": "43 Hz - 20 kHz", "acousticShort": "43 Hz - 20 kHz" },
        { "config": "A15i Wide + KS21i", "preset": "[A15] + [KS21_60]", "acoustic": "reinforced LF contour, down to 29 Hz", "acousticShort": "reinforced contour, down to 29 Hz", "ratio": "1 A15i Wide : 1 KS21i" }
      ],
      "notes": [
        { "text": "Acoustic Properties 열의 주파수 대역은 -10 dB 기준 대역폭/저역 한계다." },
        { "text": "카디오이드 배열 시 [KS21_60_C] 또는 [KS21_60_Cx] 프리셋을 쓴다." }
      ],
      "ratioSource": "A15i_OM_EN.pdf p.47-50",
      "delayDefaults": {
        "rows": [
          { "combo": "[A15]/[A15_FI]/[A15_MO] + [KS21_60]", "items": ["A15i Wide = 0 ms", "KS21i = 2.3 ms"] },
          { "combo": "[A15]/[A15_FI] + [KS21_60_C]", "items": ["A15i Wide = 9 ms", "KS21i = 0 ms (−)"] },
          { "combo": "[A15]/[A15_FI] + [KS21_60_Cx]", "items": ["A15i Wide = 8 ms", "KS21i = 0 ms"] }
        ],
        "notes": [
          { "text": "별도 표기가 없으면 극성은 반전 없는 정상(+). [KS21_60_C] 조합만 KS21i가 반전(-)이다." }
        ],
        "source": "A15i_OM_EN.pdf p.49-50"
      },
      "source": "A15i_OM_EN.pdf p.47-50"
    },
    "mechanicalSafety": {
      "stackedRows": [
        { "config": "vertical array", "accessory": "A15i-BUMP + M-BARi (optional) + rigging plates", "safeLimit": "8", "maxLimit": "8" },
        { "config": "vertical array", "accessory": "A15KS-Ui", "safeLimit": "1", "maxLimit": "1" },
        { "config": "vertical array", "accessory": "A15KS-Ui + A15i-ULINK II", "safeLimit": "2", "maxLimit": "2" },
        { "config": "vertical array with pullback", "accessory": "A15i-BUMP + rigging plates + A15i-RIGBAR", "safeLimit": "6", "maxLimit": "6" },
        { "config": "vertical array with pullback", "accessory": "A15i-RIGBAR x2 + rigging plates", "safeLimit": "8", "maxLimit": "8" },
        { "config": "stacked vertical array", "accessory": "Ai-FIXBRACKET + rigging plates", "safeLimit": "4", "maxLimit": "4" },
        { "config": "stacked vertical array with angle adjustment", "accessory": "A15i-TILTBRACKET + rigging plates", "safeLimit": "4", "maxLimit": "4" },
        { "config": "stacked on KS21i, pullback", "accessory": "A15i-BUMP + A15i-TILT (optional) + rigging plates + A15i-RIGBAR", "safeLimit": "4 A15i Wide", "maxLimit": "4 KS21i" }
      ],
      "safetyFactor": "4:1",
      "source": "A15i_OM_EN.pdf"
    }
  }
];
