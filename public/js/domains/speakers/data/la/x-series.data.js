// L-Acoustics X Series 스피커 데이터 (8개 모델).
// 필드 스키마 설명은 speakers.schema.js 참조.
// 파생 필드(wayCount / network / lowUnitConfig)는 로드 시 normalize 함수가 생성하므로 저장하지 않는다.
// X8i: preset_guide_EN.pdf(v29.0) + 사용자 제공 공식 스펙 기반 신규 추가(2026-07-08).
export const LA_X_SERIES = [
  {
    "id": "spk-la-x15-hiq",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "X15 HiQ",
    "series": "X Series",
    "throwCat": "Short Throw",
    "type": "Point",
    "throw": "Short throw",
    "lowInch": 15,
    "lowQty": 1,
    "crossover": "2-way, active",
    "crossoverTags": [
      "2-way",
      "active"
    ],
    "spl": 138,
    "cov": {
      "h": "40°",
      "v": "60°",
      "m": "35°/55°"
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "70 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "62 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "55 Hz",
        "hi": "20 kHz"
      }
    ],
    // [upload/X15_HiQ_v1.3.md 마스터 스키마 반영] Cardioid_Capability.
    "cardioidCapability": "No",
    "weight": 21,
    "transducers": "LF: 1 × 15″ · HF: 1 × 3″",
    "connectors": "4-point speakON",
    "ip": "IP43",
    "dims": "430 x 580 x 375 mm / 16.9 x 22.8 x 14.8 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 3,
            "total": 6,
            "splByPreset": [
              {
                "preset": "[X15]",
                "spl": 138
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
            "total": 2,
            "splByPreset": [
              {
                "preset": "[X15]",
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
            "perCh": 1,
            "total": 2,
            "splByPreset": [
              {
                "preset": "[X15]",
                "spl": 138
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
            "total": 8,
            "splByPreset": [
              {
                "preset": "[X15]",
                "spl": 138
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/6), LA2Xi(SE1/2), LA4X(1/2), LA7.16(1/8)",
    "img": "public/assets/img/speakers/la/x-series/spk-la-x15-hiq.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 384,
    "wattByBand": [
      { "band": "LF", "watt": 322 },
      { "band": "HF", "watt": 62 }
    ],
    // [upload/X15_HiQ_v1.3.md 마스터 스키마 반영] Preset Guide/Matching
    // Ratio/Delay Defaults/Mechanical Safety 전체 신규 반영.
    "presets": {
      "rows": [
        { "config": "X15 HiQ standalone point source", "preset": "[X15]", "acoustic": "55 Hz - 20 kHz", "acousticShort": "55 Hz - 20 kHz" },
        { "config": "X15 HiQ with SB18", "preset": "[X15] + [SB18_100]", "acoustic": "reinforced LF contour, down to 32 Hz", "acousticShort": "reinforced contour, down to 32 Hz", "ratio": "1 X15 HiQ : 1 SB18" },
        { "config": "X15 HiQ with KS21", "preset": "[X15] + [KS21_100]", "acoustic": "reinforced LF contour, down to 31 Hz", "acousticShort": "reinforced contour, down to 31 Hz", "ratio": "1 X15 HiQ : 1 KS21" },
        { "config": "X15 HiQ stage monitor", "preset": "[X15_MO]", "acoustic": "52 Hz - 20 kHz", "acousticShort": "52 Hz - 20 kHz" },
        { "config": "X15 HiQ stage monitor with SB18", "preset": "[X15_MO] + [SB18_100]", "acoustic": "reinforced LF contour, down to 32 Hz", "acousticShort": "reinforced contour, down to 32 Hz", "ratio": "1 X15 HiQ : 1 SB18" },
        { "config": "X15 HiQ stage monitor with KS21", "preset": "[X15_MO] + [KS21_60] or [KS21_100]", "acoustic": "reinforced LF contour, down to 29-31 Hz", "acousticShort": "reinforced contour, down to 29-31 Hz", "ratio": "1 X15 HiQ : 1 KS21" }
      ],
      "notes": [
        { "text": "Acoustic Properties 열의 주파수 대역은 -10 dB 기준 대역폭/저역 한계다." },
        { "text": "SB18 IIi/KS21i 조합도 동일 수치가 적용되나, KS21i는 pole-mounted 구성과 기계적으로 호환되지 않는다." }
      ],
      "ratioSource": "X15_HiQ_OM_EN.pdf p.24-31",
      "delayDefaults": {
        "rows": [
          { "combo": "[X15] + [SB18_100]", "items": ["X15 HiQ = 4 ms", "SB18 = 0 ms (−)"] },
          { "combo": "[X15] + [SB18_100_C]", "items": ["X15 HiQ = 9.7 ms", "SB18 = 0 ms (−)"] },
          { "combo": "[X15] + [SB18_100_Cx]", "items": ["X15 HiQ = 8.25 ms", "SB18 = 0 ms"] },
          { "combo": "[X15] + [KS21_100]", "items": ["X15 HiQ = 0 ms", "KS21 = 1.5 ms"] },
          { "combo": "[X15] + [KS21_100_C]", "items": ["X15 HiQ = 3.9 ms", "KS21 = 0 ms"] },
          { "combo": "[X15] + [KS21_100_Cx]", "items": ["X15 HiQ = 2.6 ms", "KS21 = 0 ms (−)"] },
          { "combo": "[X15_MO] + [SB18_100]", "items": ["X15 HiQ = 0 ms", "SB18 = 1 ms"] },
          { "combo": "[X15_MO] + [KS21_100]", "items": ["X15 HiQ = 0 ms", "KS21 = 1.5 ms"] }
        ],
        "notes": [
          { "text": "별도 표기가 없으면 극성은 반전 없는 정상(+). X15 HiQ는 모든 조합에서 항상 정상(+)." }
        ],
        "source": "X15_HiQ_OM_EN.pdf p.27, 28, 30, 31"
      },
      "source": "X15_HiQ_OM_EN.pdf p.24-31"
    },
    "mechanicalSafety": {
      "stackedRows": [
        { "config": "wall-mounted", "accessory": "X-US1215 / X-UL15 + X-UTILT (optional)", "safeLimit": "1", "maxLimit": "1" },
        { "config": "ceiling-mounted", "accessory": "X-US1215 / X-UL15", "safeLimit": "1", "maxLimit": "1" },
        { "config": "flown", "accessory": "X-BAR + CLAMP250", "safeLimit": "1", "maxLimit": "1" },
        { "config": "pole-mounted", "accessory": "35 mm pole (+ EMBi and X-US1215 optional)", "safeLimit": "1", "maxLimit": "1" },
        { "config": "ground-stacked", "accessory": "no rigging accessory", "safeLimit": "1", "maxLimit": "1" }
      ],
      "safetyFactor": "5:1",
      "source": "X15_HiQ_OM_EN.pdf"
    }
  },
  {
    "id": "spk-la-x12",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "X12",
    "series": "X Series",
    "throwCat": "Short Throw",
    "type": "Point",
    "throw": "Short throw",
    "lowInch": 12,
    "lowQty": 1,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 136,
    "cov": {
      "h": "60°",
      "v": "90°",
      "m": "35°/55°"
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "70 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "63 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "59 Hz",
        "hi": "20 kHz"
      }
    ],
    // [upload/X12_v1.5.md 마스터 스키마 반영] Cardioid_Capability.
    "cardioidCapability": "No",
    "weight": 20,
    "transducers": "LF: 1 × 12″ · HF: 1 × 3″",
    "connectors": "4-point speakON",
    "ip": "IP43",
    "dims": "430 x 496 x 375 mm / 16.9 x 19.5 x 14.8 in",
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
                "preset": "[X12]",
                "spl": 136
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
                "preset": "[X12]",
                "spl": 136
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
                "preset": "[X12]",
                "spl": 131
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
                "preset": "[X12]",
                "spl": 136
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
            "total": 14,
            "splByPreset": [
              {
                "preset": "[X12]",
                "spl": 136
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/12), LA2Xi(BTL1/2), LA2Xi(SE1/4), LA4X(1/4), LA7.16(1/14)",
    "img": "public/assets/img/speakers/la/x-series/spk-la-x12.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 331,
    // [upload/X12_v1.5.md 마스터 스키마 반영] Preset Guide/Matching Ratio/
    // Delay Defaults/Mechanical Safety 전체 신규 반영.
    "presets": {
      "rows": [
        { "config": "X12 standalone", "preset": "[X12]", "acoustic": "59 Hz - 20 kHz", "acousticShort": "59 Hz - 20 kHz" },
        { "config": "X12 with SB15m", "preset": "[X12] + [SB15_100]", "acoustic": "reinforced LF contour, down to 40 Hz", "acousticShort": "reinforced contour, down to 40 Hz", "ratio": "1 X12 : 1 SB15m" },
        { "config": "X12 with SB18", "preset": "[X12] + [SB18_100]", "acoustic": "reinforced LF contour, down to 32 Hz", "acousticShort": "reinforced contour, down to 32 Hz", "ratio": "1 X12 : 1 SB18" },
        { "config": "X12 with KS21", "preset": "[X12] + [KS21_100]", "acoustic": "reinforced LF contour, down to 31 Hz", "acousticShort": "reinforced contour, down to 31 Hz", "ratio": "1 X12 : 1 KS21" }
      ],
      "notes": [
        { "text": "Acoustic Properties 열의 주파수 대역은 -10 dB 기준 대역폭/저역 한계다." },
        { "text": "SB18 IIi/KS21i도 동일 수치가 적용되나, 두 install 파생형 모두 pole-mounted 구성과 기계적으로 호환되지 않는다." }
      ],
      "ratioSource": "X12_OM_EN_2.0.pdf p.25-28",
      "delayDefaults": {
        "rows": [
          { "combo": "[X12] + [SB15_100]", "items": ["X12 = 1.5 ms", "SB15m = 0 ms (−)"] },
          { "combo": "[X12] + [SB15_100_C]", "items": ["X12 = 5.1 ms", "SB15m = 0 ms (−)"] },
          { "combo": "[X12] + [SB15_100_Cx]", "items": ["X12 = 3 ms", "SB15m = 0 ms (−)"] },
          { "combo": "[X12] + [SB18_100]", "items": ["X12 = 0 ms", "SB18 = 0 ms"] },
          { "combo": "[X12] + [SB18_100_C]", "items": ["X12 = 5.7 ms", "SB18 = 0 ms"] },
          { "combo": "[X12] + [SB18_100_Cx]", "items": ["X12 = 4 ms", "SB18 = 0 ms (−)"] },
          { "combo": "[X12] + [KS21_100]", "items": ["X12 = 0 ms", "KS21 = 1 ms"] },
          { "combo": "[X12] + [KS21_100_C]", "items": ["X12 = 4.8 ms", "KS21 = 0 ms"] },
          { "combo": "[X12] + [KS21_100_Cx]", "items": ["X12 = 3.4 ms", "KS21 = 0 ms (−)"] }
        ],
        "notes": [
          { "text": "별도 표기가 없으면 극성은 반전 없는 정상(+). SB15m은 모든 조합에서 반전(-), SB18/KS21은 조합에 따라 다르다." }
        ],
        "source": "X12_OM_EN_2.0.pdf p.27, 28, 29"
      },
      "source": "X12_OM_EN_2.0.pdf p.25-28"
    },
    "mechanicalSafety": {
      "stackedRows": [
        { "config": "all configurations", "accessory": "X-US12/X-UL12류", "safeLimit": "1", "maxLimit": "1" }
      ],
      "safetyFactor": "5:1",
      "source": "X12_OM_EN_2.0.pdf p.24"
    }
  },
  {
    "id": "spk-la-x8",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "X8",
    "series": "X Series",
    "throwCat": "Short Throw",
    "type": "Point",
    "throw": "Short throw",
    "lowInch": 8,
    "lowQty": 1,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 129,
    "cov": {
      "h": "100°",
      "v": "100°",
      "m": "35°"
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "70 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "65 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "60 Hz",
        "hi": "20 kHz"
      }
    ],
    // [upload/X8_v1.5.md 마스터 스키마 반영] Cardioid_Capability.
    "cardioidCapability": "No",
    "weight": 12,
    "transducers": "LF: 1 × 8″ · HF: 1 × 1.5″",
    "connectors": "4-point speakON",
    "ip": "IP43",
    "dims": "250 x 424 x 264 mm / 9.8 x 16.7 x 10.4 in",
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
                "preset": "[X8]",
                "spl": 129
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
                "preset": "[X8]",
                "spl": 129
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
                "preset": "[X8]",
                "spl": 125
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
                "preset": "[X8]",
                "spl": 129
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
                "preset": "[X8]",
                "spl": 129
              }
            ]
          }
        ]
      },
      {
        "model": "LA1.16i",
        "configs": [
          {
            "mode": "SE",
            "perCh": 2,
            "total": 32,
            "splByPreset": [
              {
                "preset": "[X8]",
                "spl": 117
              }
            ]
          },
          {
            "mode": "BTL",
            "perCh": 1,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[X8]",
                "spl": 124
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/12), LA2Xi(BTL1/2), LA2Xi(SE2/8), LA4X(2/8), LA7.16(1/16)",
    "img": "public/assets/img/speakers/la/x-series/spk-la-x8.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 211,
    // [upload/X8_v1.5.md 마스터 스키마 반영] Preset Guide/Delay Defaults/
    // Mechanical Safety 전체 신규 반영.
    "presets": {
      "rows": [
        { "config": "X8 point source", "preset": "[X8]", "acoustic": "60 Hz - 20 kHz", "acousticShort": "60 Hz - 20 kHz" },
        { "config": "X8 point source with SB15m", "preset": "[X8] + [SB15_100]", "acoustic": "reinforced LF contour, down to 40 Hz", "acousticShort": "reinforced contour, down to 40 Hz", "ratio": "1 X8 : 1 SB15m" },
        { "config": "X8 stage monitor", "preset": "[X8_MO]", "acoustic": "55 Hz - 20 kHz", "acousticShort": "55 Hz - 20 kHz" },
        { "config": "X8 stage monitor with SB15m", "preset": "[X8_MO] + [SB15_100]", "acoustic": "reinforced LF contour, down to 40 Hz", "acousticShort": "reinforced contour, down to 40 Hz", "ratio": "1 X8 : 1 SB15m" }
      ],
      "notes": [
        { "text": "Acoustic Properties 열의 주파수 대역은 -10 dB 기준 대역폭/저역 한계다." },
        { "text": "X8은 라인 어레이가 아닌 단일 점음원 제품이라 최소 라인 길이 개념 자체가 원문에 없다." }
      ],
      "ratioSource": "X8_OM_EN_2.0.pdf p.22-26",
      "delayDefaults": {
        "rows": [
          { "combo": "[X8] + [SB15_100]", "items": ["X8 = 2 ms", "SB15m = 0 ms (−)"] },
          { "combo": "[X8] + [SB15_100_C]", "items": ["X8 = 5.7 ms", "SB15m = 0 ms (−)"] },
          { "combo": "[X8] + [SB15_100_Cx]", "items": ["X8 = 3.8 ms", "SB15m = 0 ms (−)"] },
          { "combo": "[X8_MO] + [SB15_100]", "items": ["X8 = 0 ms", "SB15m = 3 ms"] }
        ],
        "notes": [
          { "text": "별도 표기가 없으면 극성은 반전 없는 정상(+). point source 조합은 SB15m이 항상 반전(-)이나, stage monitor 조합은 SB15m이 정상(+)이다." }
        ],
        "source": "X8_OM_EN_2.0.pdf p.24, 26"
      },
      "source": "X8_OM_EN_2.0.pdf p.22-26"
    },
    "mechanicalSafety": {
      "stackedRows": [
        { "config": "wall-mounted", "accessory": "X-US8 / X-UL8 + X-UTILT (optional)", "safeLimit": "1", "maxLimit": "1" },
        { "config": "wall-mounted", "accessory": "X-UL8i", "safeLimit": "1", "maxLimit": "1" },
        { "config": "ceiling-mounted", "accessory": "X-US8 / X-UL8 / X-UL8i", "safeLimit": "1", "maxLimit": "1" },
        { "config": "flown", "accessory": "X-US8 / X-UL8 / X-UL8i / X-BAR + CLAMP250 (optional)", "safeLimit": "1", "maxLimit": "1" },
        { "config": "pole-mounted", "accessory": "35 mm pole + EMBi and X-US8 (optional)", "safeLimit": "1", "maxLimit": "1" },
        { "config": "ground-stacked", "accessory": "no rigging accessory", "safeLimit": "1", "maxLimit": "1" }
      ],
      "safetyFactor": "5:1",
      "maxWindLoad": "6 Beaufort",
      "source": "X8_OM_EN_2.0.pdf p.22"
    }
  },
  {
    "id": "spk-la-x8i",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "X8i",
    "series": "X Series",
    "throwCat": "Short Throw",
    "type": "Point",
    "throw": "Short throw",
    "lowInch": 8,
    "lowQty": 1,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 129,
    "cov": {
      "h": "90°",
      "v": "90°",
      "m": "35°/55°"
    },
    "freqs": [
      {
        "db": "-10 dB",
        "lo": "67 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "43 Hz",
        "hi": "20 kHz"
      }
    ],
    // [upload/X8i_v1.5.md 마스터 스키마 반영] Cardioid_Capability.
    "cardioidCapability": "No",
    "weight": 11,
    "transducers": "LF: 1 × 8″ · HF: 1 × 1.5″",
    "connectors": "2-point terminal block",
    "ip": "IP55",
    "dims": "240 x 480 x 217 mm / 9.4 x 16.9 x 8.5 in",
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
                "preset": "[X8i_40]",
                "spl": 123
              },
              {
                "preset": "[X8i]",
                "spl": 129
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
                "preset": "[X8i_40]",
                "spl": 123
              },
              {
                "preset": "[X8i]",
                "spl": 129
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
                "preset": "[X8i_40]",
                "spl": 121
              },
              {
                "preset": "[X8i]",
                "spl": 125
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
                "preset": "[X8i_40]",
                "spl": 123
              },
              {
                "preset": "[X8i]",
                "spl": 129
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
                "preset": "[X8i_40]",
                "spl": 123
              },
              {
                "preset": "[X8i]",
                "spl": 129
              }
            ]
          }
        ]
      },
      {
        "model": "LA1.16i",
        "configs": [
          {
            "mode": "SE",
            "perCh": 2,
            "total": 30,
            "splByPreset": [
              {
                "preset": "[X8i_40]",
                "spl": 114
              },
              {
                "preset": "[X8i]",
                "spl": 117
              }
            ]
          },
          {
            "mode": "BTL",
            "perCh": 1,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[X8i_40]",
                "spl": 121
              },
              {
                "preset": "[X8i]",
                "spl": 124
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/12), LA2Xi(BTL1/2), LA2Xi(SE2/8), LA4X(2/8), LA7.16(1/16), LA1.16i(SE2/30, BTL1/8)",
    "img": "public/assets/img/speakers/la/x-series/spk-la-x8i.webp",
    "views": [
      {
        "label": "Front (Black)",
        "src": "public/assets/img/speakers/la/x-series/spk-la-x8i.webp"
      },
      {
        "label": "Rear (White)",
        "src": "public/assets/img/speakers/la/x-series/spk-la-x8i-white-rear.webp"
      },
      {
        "label": "Front (White)",
        "src": "public/assets/img/speakers/la/x-series/spk-la-x8i-white-front.webp"
      }
    ],
    "relations": {
      "ampIds": []
    },
    // [upload/X8i_v1.5.md 마스터 스키마 값 정정] 211W → 197W
    // (X8i_OM_EN_2.0.pdf p.189 "X8i specifications" RMS_Power_Handling_Overall
    // 기준 — 기존 211W는 X8(다른 제품)의 값과 혼동된 것으로 보임).
    "watt": 197,
    // [upload/X8i_v1.5.md 마스터 스키마 반영] Preset Guide/Matching Ratio/
    // Delay Defaults/Mechanical Safety 전체 신규 반영.
    "presets": {
      "rows": [
        { "config": "X8i standalone (고SPL)", "preset": "[X8i]", "acoustic": "67 Hz - 20 kHz", "acousticShort": "67 Hz - 20 kHz" },
        { "config": "X8i standalone (풀레인지)", "preset": "[X8i_40]", "acoustic": "43 Hz - 20 kHz", "acousticShort": "43 Hz - 20 kHz" },
        { "config": "X8i with SB10i(r), coupled", "preset": "[X8i] + [SB10_100]", "acoustic": "reinforced LF contour, down to 27 Hz", "acousticShort": "reinforced contour, down to 27 Hz", "ratio": "1 X8i : 1 SB10i(r)" },
        { "config": "X8i with SB10i(r), separated", "preset": "[X8i_40] + [SB10_60]", "acoustic": "reinforced LF contour, down to 25 Hz", "acousticShort": "reinforced contour, down to 25 Hz", "ratio": "1 X8i : 1 SB10i(r)" },
        { "config": "X8i with Syva Sub, coupled", "preset": "[X8i] + [SYVA SUB_100]", "acoustic": "reinforced LF contour, down to 27 Hz", "acousticShort": "reinforced contour, down to 27 Hz", "ratio": "1 X8i : 1 Syva Sub" },
        { "config": "X8i with KS21(i), coupled", "preset": "[X8i] + [KS21_100]", "acoustic": "reinforced LF contour, down to 31 Hz", "acousticShort": "reinforced contour, down to 31 Hz", "ratio": "1 X8i : 1 KS21(i)" }
      ],
      "notes": [
        { "text": "Acoustic Properties 열의 주파수 대역은 -10 dB 기준 대역폭/저역 한계다." },
        { "text": "X8i는 [X8i](고SPL)/[X8i_40](풀레인지) 두 팩토리 프리셋을 제공하며 서로 다른 대역폭/SPL 트레이드오프를 갖는다." },
        { "text": "각 조합은 X8i와 서브우퍼 간 coupled(최대 1.7m)/separated(최소 1.7m) 배치 거리를 전제한다." }
      ],
      "ratioSource": "X8i_OM_EN_2.0.pdf p.38-42",
      "delayDefaults": {
        "rows": [
          { "combo": "[X8i] + [SB10_100]", "items": ["X8i = 0 ms", "SB10i = 0.5 ms"] },
          { "combo": "[X8i_40] + [SB10_60]", "items": ["X8i = 0 ms", "SB10i = 3 ms"] },
          { "combo": "[X8i] + [SYVA SUB_100]", "items": ["X8i = 0 ms", "Syva Sub = 0 ms (−)"] }
        ],
        "notes": [
          { "text": "별도 표기가 없으면 극성은 반전 없는 정상(+)." },
          { "text": "[X8i]+[KS21_100] 조합은 원문에 딜레이 표 자체가 없어(\"geometric delays만 추가\" 서술) 이 표에서 제외했다." }
        ],
        "source": "X8i_OM_EN_2.0.pdf p.39-41"
      },
      "source": "X8i_OM_EN_2.0.pdf p.38-42"
    },
    "mechanicalSafety": {
      "stackedRows": [
        { "config": "all configurations", "accessory": "TILT-SUPPORT/WALLx2/PANx2/TILT5/15/40 등", "safeLimit": "1", "maxLimit": "1" }
      ],
      "safetyFactor": "5:1",
      "source": "X8i_OM_EN_2.0.pdf p.22"
    }
  },
  {
    "id": "spk-la-x6i",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "X6i",
    "series": "X Series",
    "throwCat": "Short Throw",
    "type": "Point",
    "throw": "Short throw",
    "lowInch": 6.5,
    "lowQty": 1,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 123,
    "cov": {
      "h": "90°",
      "v": "90°",
      "m": "35°/55°"
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "84 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "76 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "69 Hz",
        "hi": "20 kHz"
      }
    ],
    // [upload/X6i_v1.5.md 마스터 스키마 반영] Cardioid_Capability.
    "cardioidCapability": "No",
    "weight": 6.3,
    "transducers": "LF: 1 × 6.5″ · HF: 1 × 1.5″",
    "connectors": "2-point terminal block",
    "ip": "IP55",
    "dims": "187 x 362 x 170 mm / 7.4 x 14.3 x 6.7 in",
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
                "preset": "[X6i_50]",
                "spl": 117
              },
              {
                "preset": "[X6i]",
                "spl": 123
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
                "preset": "[X6i_50]",
                "spl": null
              },
              {
                "preset": "[X6i]",
                "spl": 123
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
                "preset": "[X6i_50]",
                "spl": 117
              },
              {
                "preset": "[X6i]",
                "spl": 122
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
                "preset": "[X6i_50]",
                "spl": 117
              },
              {
                "preset": "[X6i]",
                "spl": 123
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
                "preset": "[X6i_50]",
                "spl": 117
              },
              {
                "preset": "[X6i]",
                "spl": 123
              }
            ]
          }
        ]
      },
      {
        "model": "LA1.16i",
        "configs": [
          {
            "mode": "SE",
            "perCh": 2,
            "total": 20,
            "splByPreset": [
              {
                "preset": "[X6i_50]",
                "spl": 110
              },
              {
                "preset": "[X6i]",
                "spl": 115
              }
            ]
          },
          {
            "mode": "BTL",
            "perCh": 1,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[X6i_50]",
                "spl": 117
              },
              {
                "preset": "[X6i]",
                "spl": 122
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/12), LA2Xi(BTL1/2), LA2Xi(SE2/8), LA4X(2/8), LA7.16(1/16)",
    "img": "public/assets/img/speakers/la/x-series/spk-la-x6i.webp",
    "views": [
      {
        "label": "Front (Black)",
        "src": "public/assets/img/speakers/la/x-series/spk-la-x6i.webp"
      },
      {
        "label": "Rear (White)",
        "src": "public/assets/img/speakers/la/x-series/spk-la-x6i-white-rear.webp"
      },
      {
        "label": "Front (White)",
        "src": "public/assets/img/speakers/la/x-series/spk-la-x6i-white-front.webp"
      }
    ],
    "relations": {
      "ampIds": []
    },
    "watt": 83,
    // [upload/X6i_v1.5.md 마스터 스키마 반영] Preset Guide/Matching Ratio/
    // Delay Defaults/Mechanical Safety 전체 신규 반영.
    "presets": {
      "rows": [
        { "config": "X6i standalone (고SPL)", "preset": "[X6i]", "acoustic": "69 Hz - 20 kHz", "acousticShort": "69 Hz - 20 kHz" },
        { "config": "X6i standalone (풀레인지)", "preset": "[X6i_50]", "acoustic": "54 Hz - 20 kHz", "acousticShort": "54 Hz - 20 kHz" },
        { "config": "X6i with SB6i(r), closely coupled(200Hz)", "preset": "[X6i] + [SB6_200]", "acoustic": "reinforced LF contour, down to 32 Hz", "acousticShort": "reinforced contour, down to 32 Hz", "ratio": "1 X6i : 2 SB6i" },
        { "config": "X6i with SB6i(r), coupled(100Hz)", "preset": "[X6i] + [SB6_100]", "acoustic": "reinforced LF contour, down to 29 Hz", "acousticShort": "reinforced contour, down to 29 Hz", "ratio": "1 X6i : 2 SB6i(r)" },
        { "config": "X6i with SB6i(r), separated(60Hz)", "preset": "[X6i_50] + [SB6_60]", "acoustic": "reinforced LF contour, down to 29 Hz", "acousticShort": "reinforced contour, down to 29 Hz", "ratio": "1 X6i : 1 SB6i(r)" },
        { "config": "X6i with SB10i(r), closely coupled(200Hz)", "preset": "[X6i] + [SB10_200]", "acoustic": "reinforced LF contour, down to 29 Hz", "acousticShort": "reinforced contour, down to 29 Hz", "ratio": "1 X6i : 1 SB10i(r)" },
        { "config": "X6i with SB10i(r), coupled(100Hz)", "preset": "[X6i] + [SB10_100]", "acoustic": "reinforced LF contour, down to 27 Hz", "acousticShort": "reinforced contour, down to 27 Hz", "ratio": "1 X6i : 1 SB10i(r)" },
        { "config": "X6i with SB10i(r), separated(60Hz)", "preset": "[X6i_50] + [SB10_60]", "acoustic": "reinforced LF contour, down to 27 Hz", "acousticShort": "reinforced contour, down to 27 Hz", "ratio": "1 X6i : 1 SB10i(r)" }
      ],
      "notes": [
        { "text": "Acoustic Properties 열의 주파수 대역은 -10 dB 기준 대역폭/저역 한계다." },
        { "text": "X6i는 [X6i](고SPL)/[X6i_50](풀레인지) 두 팩토리 프리셋을 제공한다." }
      ],
      "ratioSource": "X6i_OM_EN_2.0.pdf p.37-44",
      "delayDefaults": {
        "rows": [
          { "combo": "[X6i] + [SB6_200]", "items": ["X6i = 0 ms", "SB6i = 0 ms (−)"] },
          { "combo": "[X6i] + [SB6_100]", "items": ["X6i = 0 ms", "SB6i = 1.2 ms"] },
          { "combo": "[X6i_50] + [SB6_60]", "items": ["X6i = 0 ms", "SB6i = 2 ms"] },
          { "combo": "[X6i] + [SB10_200]", "items": ["X6i = 1.4 ms", "SB10i = 0 ms (−)"] },
          { "combo": "[X6i_50] + [SB10_60]", "items": ["X6i = 0 ms", "SB10i = 6.8 ms (−)"] }
        ],
        "notes": [
          { "text": "별도 표기가 없으면 극성은 반전 없는 정상(+). SB6i(r)는 closely coupled 조합만 반전(-)이고 나머지는 정상, SB10i(r)는 closely coupled/separated 두 조합 모두 반전(-)이다." },
          { "text": "[X6i]+[SB10_100](coupled) 조합은 원문에 딜레이 표 자체가 없어(\"딜레이 불필요\" 서술) 이 표에서 제외했다." }
        ],
        "source": "X6i_OM_EN_2.0.pdf p.39-44"
      },
      "source": "X6i_OM_EN_2.0.pdf p.37-44"
    },
    "mechanicalSafety": {
      "stackedRows": [
        { "config": "all configurations", "accessory": "X8i와 동일 액세서리 체계", "safeLimit": "1", "maxLimit": "1" }
      ],
      "safetyFactor": "5:1",
      "source": "X6i_OM_EN_2.0.pdf"
    }
  },
  {
    "id": "spk-la-5xt",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "5XT",
    "series": "X Series",
    "throwCat": "Short Throw",
    "type": "Point",
    "throw": "Short throw",
    "lowInch": 5,
    "lowQty": 1,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 121,
    "cov": {
      "h": "110°",
      "v": "110°"
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "115 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "105 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "95 Hz",
        "hi": "20 kHz"
      }
    ],
    // [upload/5XT_v1.3.md 마스터 스키마 반영] Cardioid_Capability.
    "cardioidCapability": "No",
    "weight": 3.5,
    "transducers": "LF: 1 × 5″ · HF: 1 × 1″",
    "connectors": "4-point speakON",
    "ip": "IP30(IP54 Option)",
    "dims": "165 x 165 x 165 mm / 6.5 x 6.5 x 6.5 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 6,
            "total": 24,
            "splByPreset": [
              {
                "preset": "[5XT]",
                "spl": 121
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
            "perCh": 4,
            "total": 16,
            "splByPreset": [
              {
                "preset": "[5XT]",
                "spl": 121
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
            "perCh": 4,
            "total": 16,
            "splByPreset": [
              {
                "preset": "[5XT]",
                "spl": 121
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
            "perCh": 3,
            "total": 48,
            "splByPreset": [
              {
                "preset": "[5XT]",
                "spl": 121
              }
            ]
          }
        ]
      },
      {
        "model": "LA1.16i",
        "configs": [
          {
            "mode": "SE",
            "perCh": 3,
            "total": 48,
            "splByPreset": [
              {
                "preset": "[5XT]",
                "spl": 112
              }
            ]
          },
          {
            "mode": "BTL",
            "perCh": 2,
            "total": 14,
            "splByPreset": [
              {
                "preset": "[5XT]",
                "spl": 120
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(6/24), LA2Xi(SE4/16), LA4X(4/16), LA7.16(3/48)",
    "img": "public/assets/img/speakers/la/x-series/spk-la-5xt.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 66,
    // [upload/5XT_v1.3.md 마스터 스키마 반영] Preset Guide/Delay Defaults/
    // Mechanical Safety 전체 신규 반영.
    "presets": {
      "rows": [
        { "config": "5XT point source", "preset": "[5XT]", "acoustic": "95 Hz - 20 kHz", "acousticShort": "95 Hz - 20 kHz" },
        { "config": "5XT point source with SB15m", "preset": "[5XT] + [SB15_100]", "acoustic": "reinforced LF contour, down to 40 Hz", "acousticShort": "reinforced contour, down to 40 Hz", "ratio": "1 5XT : 1 SB15m" },
        { "config": "5XT point source with SB10i", "preset": "[5XT] + [SB10_100]", "acoustic": "reinforced LF contour, down to 27 Hz", "acousticShort": "reinforced contour, down to 27 Hz", "ratio": "1 5XT : 1 SB10i" },
        { "config": "5XT stage monitor", "preset": "[5XT_MO]", "acoustic": "95 Hz - 20 kHz", "acousticShort": "95 Hz - 20 kHz" },
        { "config": "5XT stage monitor with SB15m", "preset": "[5XT_MO] + [SB15_100]", "acoustic": "reinforced LF contour, down to 40 Hz", "acousticShort": "reinforced contour, down to 40 Hz", "ratio": "1 5XT : 1 SB15m" },
        { "config": "5XT stage monitor with SB10i", "preset": "[5XT_MO] + [SB10_100]", "acoustic": "reinforced LF contour, down to 27 Hz", "acousticShort": "reinforced contour, down to 27 Hz", "ratio": "1 5XT : 1 SB10i" }
      ],
      "notes": [
        { "text": "Acoustic Properties 열의 주파수 대역은 -10 dB 기준 대역폭/저역 한계다." }
      ],
      "ratioSource": "5XT_OM_EN_4.0.pdf p.13-18",
      "delayDefaults": {
        "rows": [
          { "combo": "[5XT] + [SB15_100]", "items": ["별도 사전 정렬 딜레이 불필요"] },
          { "combo": "[5XT] + [SB10_100]", "items": ["5XT = 0 ms", "SB10i = 1.6 ms (−)"] },
          { "combo": "[5XT_MO] + [SB15_100]", "items": ["5XT = 0.2 ms", "SB15m = 0 ms"] },
          { "combo": "[5XT_MO] + [SB10_100]", "items": ["5XT = 0 ms", "SB10i = 1.6 ms (−)"] }
        ],
        "notes": [
          { "text": "별도 표기가 없으면 극성은 반전 없는 정상(+). SB10i 조합은 point source/stage monitor 공용으로 동일 값이 적용된다." }
        ],
        "source": "5XT_OM_EN_4.0.pdf p.14, 15, 17, 18"
      },
      "source": "5XT_OM_EN_4.0.pdf p.13-18"
    },
    "mechanicalSafety": {
      "stackedRows": [
        { "config": "wall-mounted / ceiling-mounted", "accessory": "ETR5", "safeLimit": "1", "maxLimit": "1" },
        { "config": "pole-mounted", "accessory": "microphone stand", "safeLimit": "1", "maxLimit": "1" }
      ],
      "safetyFactor": "5:1",
      "maxWindLoad": "6 Beaufort",
      "source": "5XT_OM_EN_4.0.pdf p.13"
    }
  },
  {
    "id": "spk-la-x4i",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "X4i",
    "series": "X Series",
    "throwCat": "Short Throw",
    "type": "Point",
    "throw": "Short throw",
    "lowInch": 4,
    "lowQty": 1,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 116,
    "cov": {
      "h": "110°",
      "v": "110°"
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "105 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "77 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "65 Hz",
        "hi": "20 kHz"
      }
    ],
    // [upload/X4i_v1.5.md 마스터 스키마 반영] Cardioid_Capability.
    "cardioidCapability": "No",
    "weight": 1,
    "transducers": "LF: 1 × 4″ · HF: 1 × 1.4″",
    "connectors": "2-point screw terminal",
    "ip": "IP55",
    "dims": "116 x 116 x 99 mm / 4.6 x 4.6 x 3.9 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 6,
            "total": 24,
            "splByPreset": [
              {
                "preset": "[X4]",
                "spl": 116
              },
              {
                "preset": "[X4_60]",
                "spl": 110
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
            "perCh": 4,
            "total": 16,
            "splByPreset": [
              {
                "preset": "[X4]",
                "spl": 116
              },
              {
                "preset": "[X4_60]",
                "spl": 110
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
            "perCh": 4,
            "total": 16,
            "splByPreset": [
              {
                "preset": "[X4]",
                "spl": 116
              },
              {
                "preset": "[X4_60]",
                "spl": 110
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
            "perCh": 4,
            "total": 64,
            "splByPreset": [
              {
                "preset": "[X4]",
                "spl": 116
              },
              {
                "preset": "[X4_60]",
                "spl": 110
              }
            ]
          }
        ]
      },
      {
        "model": "LA1.16i",
        "configs": [
          {
            "mode": "SE",
            "perCh": 3,
            "total": 48,
            "splByPreset": [
              {
                "preset": "[X4]",
                "spl": 107
              },
              {
                "preset": "[X4_60]",
                "spl": 104
              }
            ]
          },
          {
            "mode": "BTL",
            "perCh": 2,
            "total": 12,
            "splByPreset": [
              {
                "preset": "[X4]",
                "spl": 115
              },
              {
                "preset": "[X4_60]",
                "spl": 110
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(6/24), LA2Xi(SE4/16), LA4X(4/16), LA7.16(4/64)",
    "img": "public/assets/img/speakers/la/x-series/spk-la-x4i.webp",
    "views": [
      {
        "label": "Front (Black)",
        "src": "public/assets/img/speakers/la/x-series/spk-la-x4i.webp"
      },
      {
        "label": "Front (White)",
        "src": "public/assets/img/speakers/la/x-series/spk-la-x4i-white-front.webp"
      },
      {
        "label": "Install (In-Situ)",
        "src": "public/assets/img/speakers/la/x-series/spk-la-x4i-insitu.webp"
      }
    ],
    "relations": {
      "ampIds": []
    },
    "watt": 42,
    // [upload/X4i_v1.5.md 마스터 스키마 반영] Preset Guide/Matching Ratio/
    // Delay Defaults/Mechanical Safety 전체 신규 반영.
    "presets": {
      "rows": [
        { "config": "X4i standalone (고SPL)", "preset": "[X4]", "acoustic": "120 Hz - 20 kHz", "acousticShort": "120 Hz - 20 kHz" },
        { "config": "X4i with SB6i, closely coupled(200Hz)", "preset": "[X4] + [SB6_200]", "acoustic": "reinforced LF contour, down to 32 Hz", "acousticShort": "reinforced contour, down to 32 Hz", "ratio": "1 X4i : 1 SB6i" },
        { "config": "X4i with SB6i, coupled(100Hz)", "preset": "[X4] + [SB6_100]", "acoustic": "reinforced LF contour, down to 29 Hz", "acousticShort": "reinforced contour, down to 29 Hz", "ratio": "1 X4i : 1 SB6i" },
        { "config": "X4i with SB6i, separated(60Hz)", "preset": "[X4_60] + [SB6_60]", "acoustic": "reinforced LF contour, down to 29 Hz", "acousticShort": "reinforced contour, down to 29 Hz", "ratio": "2 X4i : 1 SB6i" },
        { "config": "X4i with SB10i, closely coupled(200Hz)", "preset": "[X4] + [SB10_200]", "acoustic": "reinforced LF contour, down to 29 Hz", "acousticShort": "reinforced contour, down to 29 Hz", "ratio": "2 X4i : 1 SB10i" },
        { "config": "X4i with SB10i, coupled(100Hz)", "preset": "[X4] + [SB10_100]", "acoustic": "reinforced LF contour, down to 27 Hz", "acousticShort": "reinforced contour, down to 27 Hz", "ratio": "2 X4i : 1 SB10i" },
        { "config": "X4i with SB10i, separated(60Hz)", "preset": "[X4_60] + [SB10_60]", "acoustic": "reinforced LF contour, down to 25 Hz", "acousticShort": "reinforced contour, down to 25 Hz", "ratio": "3 X4i : 1 SB10i" }
      ],
      "notes": [
        { "text": "Acoustic Properties 열의 주파수 대역은 -10 dB 기준 대역폭/저역 한계다." }
      ],
      "ratioSource": "X4i_OM_EN_6.0.pdf p.25-31",
      "delayDefaults": {
        "rows": [
          { "combo": "[X4] or [X4_MO] + [SB6_200]", "items": ["X4i = 0.6 ms", "SB6i = 0 ms (−)"] },
          { "combo": "[X4] or [X4_MO] + [SB6_100]", "items": ["X4i = 0 ms", "SB6i = 0.4 ms"] },
          { "combo": "[X4_60] + [SB6_60]", "items": ["X4i = 1.8 ms", "SB6i = 0 ms (−)"] }
        ],
        "notes": [
          { "text": "별도 표기가 없으면 극성은 반전 없는 정상(+)." }
        ],
        "source": "X4i_OM_EN_6.0.pdf p.26-28"
      },
      "source": "X4i_OM_EN_6.0.pdf p.25-31"
    },
    "mechanicalSafety": {
      "stackedRows": [
        { "config": "all configurations", "accessory": "X-U4i, X-B4i 등", "safeLimit": "1", "maxLimit": "1" }
      ],
      "safetyFactor": "5:1",
      "source": "X4i_OM_EN_6.0.pdf"
    }
  },
  {
    "id": "spk-la-x4r",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "X4r",
    "series": "X Series",
    "throwCat": "Short Throw",
    "type": "Point",
    "throw": "Short throw",
    "lowInch": 4,
    "lowQty": 1,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 116,
    "cov": {
      "h": "110°",
      "v": "110°"
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "105 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "77 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "65 Hz",
        "hi": "20 kHz"
      }
    ],
    // [upload/X4r_v1.5.md 마스터 스키마 반영] Cardioid_Capability.
    "cardioidCapability": "No",
    "weight": 1.6,
    "transducers": "LF: 1 × 4″ · HF: 1 × 1.4″",
    "connectors": "2-point screw terminal",
    "ip": "IP55",
    // [값 정정] Depth 109mm → 99mm (X4r_OM_EN.pdf 도면 기준 — 109mm은
    // 마운팅 브래킷 관련 부가 치수이며 실제 엔클로저 깊이가 아님, X4i와
    // 동일한 99mm임을 upload/X4r_v1.5.md에서 확인).
    "dims": "116 x 116 x 99 mm / 4.6 x 4.6 x 3.9 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 6,
            "total": 24,
            "splByPreset": [
              {
                "preset": "[X4]",
                "spl": 116
              },
              {
                "preset": "[X4_60]",
                "spl": 110
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
            "perCh": 4,
            "total": 16,
            "splByPreset": [
              {
                "preset": "[X4]",
                "spl": 116
              },
              {
                "preset": "[X4_60]",
                "spl": 110
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
            "perCh": 4,
            "total": 16,
            "splByPreset": [
              {
                "preset": "[X4]",
                "spl": 116
              },
              {
                "preset": "[X4_60]",
                "spl": 110
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
            "perCh": 4,
            "total": 64,
            "splByPreset": [
              {
                "preset": "[X4]",
                "spl": 116
              },
              {
                "preset": "[X4_60]",
                "spl": 110
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(6/24), LA2Xi(SE4/16), LA4X(4/16), LA7.16(4/64)",
    "img": "public/assets/img/speakers/la/x-series/spk-la-x4r.webp",
    "views": [
      {
        "label": "Front",
        "src": "public/assets/img/speakers/la/x-series/spk-la-x4r.webp"
      },
      {
        "label": "Install (In-Tile)",
        "src": "public/assets/img/speakers/la/x-series/spk-la-x4r-intile.webp"
      },
      {
        "label": "Install (In-Wall)",
        "src": "public/assets/img/speakers/la/x-series/spk-la-x4r-inwall.webp"
      }
    ],
    "relations": {
      "ampIds": []
    },
    "watt": 42,
    // [upload/X4r_v1.5.md 마스터 스키마 반영] Preset Guide/Matching Ratio/
    // Delay Defaults/Mechanical Safety 전체 신규 반영. X4i와 동일 아키텍처의
    // 매입형(recessed) 버전 — 원문 딜레이 표의 "X4i"/"SB6i"/"SB10i" 라벨은
    // X4r/SB6r/SB10r로 정정 채택.
    "presets": {
      "rows": [
        { "config": "X4r standalone (고SPL)", "preset": "[X4]", "acoustic": "120 Hz - 20 kHz", "acousticShort": "120 Hz - 20 kHz" },
        { "config": "X4r with SB6r, closely coupled(200Hz)", "preset": "[X4] + [SB6_200]", "acoustic": "reinforced LF contour, down to 32 Hz", "acousticShort": "reinforced contour, down to 32 Hz", "ratio": "1 X4r : 1 SB6r" },
        { "config": "X4r with SB6r, coupled(100Hz)", "preset": "[X4] + [SB6_100]", "acoustic": "reinforced LF contour, down to 29 Hz", "acousticShort": "reinforced contour, down to 29 Hz", "ratio": "1 X4r : 1 SB6r" },
        { "config": "X4r with SB6r, separated(60Hz)", "preset": "[X4_60] + [SB6_60]", "acoustic": "reinforced LF contour, down to 29 Hz", "acousticShort": "reinforced contour, down to 29 Hz", "ratio": "2 X4r : 1 SB6r" },
        { "config": "X4r with SB10r, closely coupled(200Hz)", "preset": "[X4] + [SB10_200]", "acoustic": "reinforced LF contour, down to 29 Hz", "acousticShort": "reinforced contour, down to 29 Hz", "ratio": "2 X4r : 1 SB10r" },
        { "config": "X4r with SB10r, coupled(100Hz)", "preset": "[X4] + [SB10_100]", "acoustic": "reinforced LF contour, down to 27 Hz", "acousticShort": "reinforced contour, down to 27 Hz", "ratio": "2 X4r : 1 SB10r" },
        { "config": "X4r with SB10r, separated(60Hz)", "preset": "[X4_60] + [SB10_60]", "acoustic": "reinforced LF contour, down to 25 Hz", "acousticShort": "reinforced contour, down to 25 Hz", "ratio": "3 X4r : 1 SB10r" }
      ],
      "notes": [
        { "text": "Acoustic Properties 열의 주파수 대역은 -10 dB 기준 대역폭/저역 한계다." }
      ],
      "ratioSource": "X4r_OM_EN.pdf p.17-24",
      "delayDefaults": {
        "rows": [
          { "combo": "[X4] or [X4_MO] + [SB6_200]", "items": ["X4r = 0.6 ms", "SB6r = 0 ms (−)"] },
          { "combo": "[X4] or [X4_MO] + [SB6_100]", "items": ["X4r = 0 ms", "SB6r = 0.4 ms"] },
          { "combo": "[X4_60] + [SB6_60]", "items": ["X4r = 1.8 ms", "SB6r = 0 ms (−)"] },
          { "combo": "[X4] + [SB10_200]", "items": ["X4r = 1.9 ms", "SB10r = 0 ms (−)"] },
          { "combo": "[X4_MO] + [SB10_200]", "items": ["X4r = 0 ms", "SB10r = 0 ms"] },
          { "combo": "[X4] or [X4_MO] + [SB10_100]", "items": ["X4r = 0.8 ms", "SB10r = 0 ms"] },
          { "combo": "[X4_60] + [SB10_60]", "items": ["X4r = 7.2 ms", "SB10r = 0 ms (−)"] }
        ],
        "notes": [
          { "text": "별도 표기가 없으면 극성은 반전 없는 정상(+)." }
        ],
        "source": "X4r_OM_EN.pdf p.19-24"
      },
      "source": "X4r_OM_EN.pdf p.17-24"
    },
    "mechanicalSafety": {
      "stackedRows": [
        { "config": "all configurations", "accessory": "X4r-inCW, X-U4i 등", "safeLimit": "1", "maxLimit": "1" }
      ],
      "safetyFactor": "5:1",
      "source": "X4r_OM_EN.pdf"
    }
  }
];
