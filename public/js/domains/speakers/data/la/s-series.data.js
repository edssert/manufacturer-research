// L-Acoustics S Series 스피커 데이터 (4개 모델).
// 필드 스키마 설명은 speakers.schema.js 참조.
// 파생 필드(wayCount / network / lowUnitConfig)는 로드 시 normalize 함수가 생성하므로 저장하지 않는다.
export const LA_S_SERIES = [
  {
    "id": "spk-la-soka",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "Soka",
    "series": "S Series",
    "throwCat": "Medium Throw",
    "type": "Colinear",
    "throw": "Medium throw <45m",
    "lowInch": 3.5,
    "lowQty": 9,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 133,
    "cov": {
      "h": "140°",
      "v": "+5°/-21°"
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "100 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "70 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "60 Hz",
        "hi": "20 kHz"
      }
    ],
    // [upload/Soka_v1.4.md 마스터 스키마 반영] Cardioid_Capability.
    "cardioidCapability": "No",
    "weight": 9.4,
    "transducers": "LF: 9 × 3.5″ · HF: 3 × 1″",
    "connectors": "4-point screw terminal",
    "ip": "IP55",
    "dims": "99 x 1065 x 99 mm / 3.9 x 41.9 x 3.9 in",
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
                "preset": "[SOKA_60]",
                "spl": 124
              },
              {
                "preset": "[SOKA]",
                "spl": 130
              },
              {
                "preset": "[SOKA_200]",
                "spl": 133
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
                "preset": "[SOKA_60]",
                "spl": 124
              },
              {
                "preset": "[SOKA]",
                "spl": 130
              },
              {
                "preset": "[SOKA_200]",
                "spl": 133
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
                "preset": "[SOKA_60]",
                "spl": 124
              },
              {
                "preset": "[SOKA]",
                "spl": 128
              },
              {
                "preset": "[SOKA_200]",
                "spl": 130
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
                "preset": "[SOKA_60]",
                "spl": 124
              },
              {
                "preset": "[SOKA]",
                "spl": 130
              },
              {
                "preset": "[SOKA_200]",
                "spl": 133
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
                "preset": "[SOKA_60]",
                "spl": 124
              },
              {
                "preset": "[SOKA]",
                "spl": 130
              },
              {
                "preset": "[SOKA_200]",
                "spl": 133
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
            "total": 26,
            "splByPreset": [
              {
                "preset": "[SOKA_60]",
                "spl": 114
              },
              {
                "preset": "[SOKA]",
                "spl": 119
              },
              {
                "preset": "[SOKA_200]",
                "spl": 120
              }
            ]
          },
          {
            "mode": "BTL",
            "perCh": 1,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[SOKA_60]",
                "spl": 122
              },
              {
                "preset": "[SOKA]",
                "spl": 127
              },
              {
                "preset": "[SOKA_200]",
                "spl": 130
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/12), LA2Xi(BTL1/2), LA2Xi(SE1/4), LA4X(1/4), LA7.16(1/16)",
    "img": "public/assets/img/speakers/la/s-series/spk-la-soka.webp",
    "views": [
      {
        "label": "Front (Black)",
        "src": "public/assets/img/speakers/la/s-series/spk-la-soka.webp"
      },
      {
        "label": "Front (White)",
        "src": "public/assets/img/speakers/la/s-series/spk-la-soka-white-front.webp"
      }
    ],
    "relations": {
      "ampIds": []
    },
    "watt": 133,
    // [upload/Soka_v1.4.md 마스터 스키마 반영] Preset Guide/Matching Ratio/
    // Delay Defaults/Mechanical Safety 전체 신규 반영.
    "presets": {
      "rows": [
        { "config": "Soka colinear source", "preset": "[SOKA]", "acoustic": "100 Hz - 20 kHz", "acousticShort": "100 Hz - 20 kHz" },
        { "config": "Soka + SB6i, closely coupled (200Hz)", "preset": "[SOKA_200] + [SB6_200]", "acoustic": "reinforced LF contour, down to 32 Hz", "acousticShort": "reinforced contour, down to 32 Hz", "ratio": "1 Soka : 2 SB6i" },
        { "config": "Soka + SB6i, coupled (100Hz)", "preset": "[SOKA] + [SB6_100]", "acoustic": "reinforced LF contour, down to 29 Hz", "acousticShort": "reinforced contour, down to 29 Hz", "ratio": "1 Soka : 2 SB6i" },
        { "config": "Soka + SB6i, separated (60Hz)", "preset": "[SOKA_60] + [SB6_60]", "acoustic": "reinforced LF contour, down to 29 Hz", "acousticShort": "reinforced contour, down to 29 Hz", "ratio": "1 Soka : 2 SB6i" },
        { "config": "Soka + SB10i, closely coupled (200Hz)", "preset": "[SOKA_200] + [SB10_200]", "acoustic": "reinforced LF contour, down to 29 Hz", "acousticShort": "reinforced contour, down to 29 Hz", "ratio": "1 Soka : 2 SB10i" },
        { "config": "Soka + SB10i, coupled (100Hz)", "preset": "[SOKA] + [SB10_100]", "acoustic": "reinforced LF contour, down to 27 Hz", "acousticShort": "reinforced contour, down to 27 Hz", "ratio": "1 Soka : 2 SB10i" },
        { "config": "Soka + SB10i, separated (60Hz)", "preset": "[SOKA_60] + [SB10_60]", "acoustic": "reinforced LF contour, down to 25 Hz", "acousticShort": "reinforced contour, down to 25 Hz", "ratio": "1 Soka : 1 SB10i" }
      ],
      "notes": [
        { "text": "Acoustic Properties 열의 주파수 대역은 -10 dB 기준 대역폭/저역 한계다." },
        { "text": "Soka는 단일 유닛 배치 전용 제품이라 최소 라인 길이 개념 자체가 원문에 없다." }
      ],
      "ratioSource": "Soka_OM_EN.pdf p.27-33",
      "delayDefaults": {
        "rows": [
          { "combo": "[SOKA_200] + [SB6_200]", "items": ["Soka = 1.9 ms", "SB6i = 0 ms"] },
          { "combo": "[SOKA] + [SB6_100]", "items": ["Soka = 1.4 ms", "SB6i = 0 ms"] },
          { "combo": "[SOKA_60] + [SB6_60]", "items": ["Soka = 3.6 ms", "SB6i = 0 ms (−)"] },
          { "combo": "[SOKA_200] + [SB10_200]", "items": ["Soka = 3.2 ms", "SB10i = 0 ms"] },
          { "combo": "[SOKA] + [SB10_100]", "items": ["Soka = 2.6 ms", "SB10i = 0 ms"] },
          { "combo": "[SOKA_60] + [SB10_60]", "items": ["Soka = 9 ms", "SB10i = 0 ms (−)"] }
        ],
        "notes": [
          { "text": "별도 표기가 없으면 극성은 반전 없는 정상(+). Soka는 모든 조합에서 항상 정상(+). SB6i/SB10i는 closely coupled(200Hz)/coupled(100Hz)에서는 정상, separated(60Hz)에서만 반전(-)이다." }
        ],
        "source": "Soka_OM_EN.pdf p.29-33"
      },
      "source": "Soka_OM_EN.pdf p.27-33"
    },
    "mechanicalSafety": {
      "stackedRows": [
        { "config": "wall-mounted", "accessory": "Soka-onW", "safeLimit": "1", "maxLimit": "1" },
        { "config": "wall-mounted", "accessory": "TILT-SUPPORT + TILT5 + PAN (optional)", "safeLimit": "1", "maxLimit": "1" },
        { "config": "wall-mounted", "accessory": "WALLx2", "safeLimit": "1", "maxLimit": "1" },
        { "config": "wall-mounted", "accessory": "PANx2", "safeLimit": "1", "maxLimit": "1" },
        { "config": "ceiling-mounted / flown", "accessory": "VBAR", "safeLimit": "1", "maxLimit": "1" },
        { "config": "pole-mounted", "accessory": "POLE", "safeLimit": "1", "maxLimit": "1" }
      ],
      "notes": [
        { "text": "모든 리깅 구성이 단일 Soka 장착 전용(원문 명시)." }
      ],
      "safetyFactor": "5:1",
      "source": "Soka_OM_EN.pdf p.25"
    }
  },
  {
    "id": "spk-la-soka-inwall",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "Soka inWall",
    "series": "S Series",
    "throwCat": "Medium Throw",
    "type": "Colinear",
    "throw": "Medium throw <45m",
    "lowInch": 3.5,
    "lowQty": 9,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 133,
    "cov": {
      "h": "140°",
      "v": "+5°/-21°"
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "100 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "70 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "60 Hz",
        "hi": "20 kHz"
      }
    ],
    // [upload/Sokar_v1.3.md 마스터 스키마 반영] Cardioid_Capability. 이 제품은
    // upload 파일에서 "Sokar"(Soka의 매입형/recessed 파생형 정식 명칭)로
    // 확인됨 — 표시명(Soka inWall)은 변경하지 않고 데이터만 반영.
    "cardioidCapability": "No",
    // [값 정정] 11.7kg → 8.7kg (Sokar_OM_EN.pdf p.38 "Sokar specifications"
    // "Weight (net): 8.7 kg" 기준 — 매입형은 전면 그릴 등 일부 부품이 없어
    // 표준형(9.4kg)보다 가벼움. 기존 11.7kg은 근거 문서 없이 "무게가 더
    // 무거울 것"이라는 가정으로 작성된 값으로 보임).
    "weight": 8.7,
    "transducers": "LF: 9 × 3.5″ · HF: 3 × 1″",
    "connectors": "4-point screw terminal",
    "ip": "IP55",
    "dims": "99 x 1065 x 99 mm / 3.9 x 41.9 x 3.9 in",
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
                "preset": "[SOKA_60]",
                "spl": 124
              },
              {
                "preset": "[SOKA]",
                "spl": 130
              },
              {
                "preset": "[SOKA_200]",
                "spl": 133
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
                "preset": "[SOKA_60]",
                "spl": 124
              },
              {
                "preset": "[SOKA]",
                "spl": 130
              },
              {
                "preset": "[SOKA_200]",
                "spl": 133
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
                "preset": "[SOKA_60]",
                "spl": 124
              },
              {
                "preset": "[SOKA]",
                "spl": 128
              },
              {
                "preset": "[SOKA_200]",
                "spl": 130
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
                "preset": "[SOKA_60]",
                "spl": 124
              },
              {
                "preset": "[SOKA]",
                "spl": 130
              },
              {
                "preset": "[SOKA_200]",
                "spl": 133
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
                "preset": "[SOKA_60]",
                "spl": 124
              },
              {
                "preset": "[SOKA]",
                "spl": 130
              },
              {
                "preset": "[SOKA_200]",
                "spl": 133
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
            "total": 26,
            "splByPreset": [
              {
                "preset": "[SOKA_60]",
                "spl": 114
              },
              {
                "preset": "[SOKA]",
                "spl": 119
              },
              {
                "preset": "[SOKA_200]",
                "spl": 120
              }
            ]
          },
          {
            "mode": "BTL",
            "perCh": 1,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[SOKA_60]",
                "spl": 122
              },
              {
                "preset": "[SOKA]",
                "spl": 127
              },
              {
                "preset": "[SOKA_200]",
                "spl": 130
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/12), LA2Xi(BTL1/2), LA2Xi(SE1/4), LA4X(1/4), LA7.16(1/16)",
    "img": "public/assets/img/speakers/la/s-series/spk-la-soka-inwall.webp",
    "views": [
      {
        "label": "Install (In-Wall)",
        "src": "public/assets/img/speakers/la/s-series/spk-la-soka-inwall.webp"
      },
      {
        "label": "Install (In-Situ)",
        "src": "public/assets/img/speakers/la/s-series/spk-la-soka-inwall-insitu.webp"
      }
    ],
    "notes": "Soka의 벽매립(in-wall) 설치용 버전 — L-Acoustics 정식 제품명은 \"Sokar\"(Sokar owner's manual EN version 1.0 기준). 음향 스펙(SPL/대역폭/커버리지/앰프 매칭)은 Soka와 동일하나, 매입형이라 전면 그릴 등 일부 부품이 빠져 오히려 더 가볍다(9.4kg → 8.7kg, upload/Sokar_v1.3.md로 정정). 치수는 엔클로저 기준으로 Soka와 동일.",
    "relations": {
      "ampIds": []
    },
    "watt": 133,
    // [upload/Sokar_v1.3.md 마스터 스키마 반영] Preset Guide/Matching Ratio/
    // Delay Defaults/Mechanical Safety 전체 신규 반영 — Sokar 자신의 OM에서
    // 독립 확인된 값(Soka와 수치 동일, 라벨만 Sokar/SB6r/SB10r로 정정).
    "presets": {
      "rows": [
        { "config": "Sokar colinear source", "preset": "[SOKA]", "acoustic": "—", "acousticShort": "—" },
        { "config": "Sokar + SB6r, closely coupled (200Hz)", "preset": "[SOKA_200] + [SB6_200]", "acoustic": "reinforced LF contour, down to 32 Hz", "acousticShort": "reinforced contour, down to 32 Hz", "ratio": "1 Sokar : 2 SB6r" },
        { "config": "Sokar + SB6r, coupled (100Hz)", "preset": "[SOKA] + [SB6_100]", "acoustic": "reinforced LF contour, down to 29 Hz", "acousticShort": "reinforced contour, down to 29 Hz", "ratio": "1 Sokar : 2 SB6r" },
        { "config": "Sokar + SB6r, separated (60Hz)", "preset": "[SOKA_60] + [SB6_60]", "acoustic": "reinforced LF contour, down to 29 Hz", "acousticShort": "reinforced contour, down to 29 Hz", "ratio": "1 Sokar : 2 SB6r" },
        { "config": "Sokar + SB10r, closely coupled (200Hz)", "preset": "[SOKA_200] + [SB10_200]", "acoustic": "reinforced LF contour, down to 29 Hz", "acousticShort": "reinforced contour, down to 29 Hz", "ratio": "1 Sokar : 2 SB10r" },
        { "config": "Sokar + SB10r, coupled (100Hz)", "preset": "[SOKA] + [SB10_100]", "acoustic": "reinforced LF contour, down to 27 Hz", "acousticShort": "reinforced contour, down to 27 Hz", "ratio": "1 Sokar : 2 SB10r" },
        { "config": "Sokar + SB10r, separated (60Hz)", "preset": "[SOKA_60] + [SB10_60]", "acoustic": "reinforced LF contour, down to 25 Hz", "acousticShort": "reinforced contour, down to 25 Hz", "ratio": "1 Sokar : 1 SB10r" }
      ],
      "notes": [
        { "text": "단독 구성(Sokar colinear source)은 원문에 Frequency Range 행이 생략되어 있어 미확인." },
        { "text": "Sokar는 단일 유닛 배치 전용 제품이라 최소 라인 길이 개념 자체가 원문에 없다." }
      ],
      "ratioSource": "Sokar_OM_EN.pdf p.18-24",
      "delayDefaults": {
        "rows": [
          { "combo": "[SOKA_200] + [SB6_200]", "items": ["Sokar = 1.9 ms", "SB6r = 0 ms"] },
          { "combo": "[SOKA] + [SB6_100]", "items": ["Sokar = 1.4 ms", "SB6r = 0 ms"] },
          { "combo": "[SOKA_60] + [SB6_60]", "items": ["Sokar = 3.6 ms", "SB6r = 0 ms (−)"] },
          { "combo": "[SOKA_200] + [SB10_200]", "items": ["Sokar = 3.2 ms", "SB10r = 0 ms"] },
          { "combo": "[SOKA] + [SB10_100]", "items": ["Sokar = 2.6 ms", "SB10r = 0 ms"] },
          { "combo": "[SOKA_60] + [SB10_60]", "items": ["Sokar = 9 ms", "SB10r = 0 ms (−)"] }
        ],
        "notes": [
          { "text": "별도 표기가 없으면 극성은 반전 없는 정상(+). Sokar는 모든 조합에서 항상 정상(+). SB6r/SB10r은 closely coupled/coupled에서는 정상, separated(60Hz)에서만 반전(-)이다(Soka와 동일 패턴)." }
        ],
        "source": "Sokar_OM_EN.pdf p.20-24"
      },
      "source": "Sokar_OM_EN.pdf p.18-24"
    },
    "mechanicalSafety": {
      "stackedRows": [
        { "config": "in-wall", "accessory": "Sokar-inW + Soka-Screen", "safeLimit": "1", "maxLimit": "1" }
      ],
      "safetyFactor": "5:1",
      "source": "Sokar_OM_EN.pdf p.17"
    }
  },
  {
    "id": "spk-la-syva",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "Syva",
    "series": "S Series",
    "throwCat": "Medium Throw",
    "type": "Colinear",
    "throw": "Medium throw <45m",
    "lowInch": 5,
    "lowQty": 6,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 137,
    "cov": {
      "h": "140°",
      "v": "+5°/-21°"
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "102 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "92 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "87 Hz",
        "hi": "20 kHz"
      }
    ],
    // [upload/Syva_v1.3.md 마스터 스키마 반영] Cardioid_Capability.
    "cardioidCapability": "No",
    "weight": 21,
    "transducers": "LF: 6 × 5″ · HF: 3 × 1.75″",
    "connectors": "4-point speakON, 2-point screw terminal, proprietary connector",
    "ip": "IP54",
    "dims": "144 x 1304 x 209 mm / 5.7 x 51.3 x 8.2 in",
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
                "preset": "[SYVA]",
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
                "preset": "[SYVA]",
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
            "perCh": 1,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[SYVA]",
                "spl": 130
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
                "preset": "[SYVA]",
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
            "total": 10,
            "splByPreset": [
              {
                "preset": "[SYVA]",
                "spl": 137
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/12), LA2Xi(BTL1/2), LA2Xi(SE1/4), LA4X(1/4), LA7.16(1/10)",
    "img": "public/assets/img/speakers/la/s-series/spk-la-syva.webp",
    "views": [
      {
        "label": "Front",
        "src": "public/assets/img/speakers/la/s-series/spk-la-syva.webp"
      },
      {
        "label": "With Syva Low",
        "src": "public/assets/img/speakers/la/s-series/spk-la-syva-syva-low-combo.webp"
      }
    ],
    "relations": {
      "ampIds": []
    },
    "watt": 454,
    // [upload/Syva_v1.3.md 마스터 스키마 반영] Preset Guide/Delay Defaults/
    // Mechanical Safety 전체 신규 반영. Recommended_Ratio는 3제품 조합
    // 2건에만 원문 명시(나머지는 원문에 비율 서술이 없어 미기재).
    "presets": {
      "rows": [
        { "config": "Syva colinear source", "preset": "[SYVA]", "acoustic": "87 Hz - 20 kHz", "acousticShort": "87 Hz - 20 kHz" },
        { "config": "Syva + Syva Low, hybrid (AutoConnect)", "preset": "[SYVA LOW SYVA]", "acoustic": "reinforced LF contour, down to 42 Hz", "acousticShort": "reinforced contour, down to 42 Hz" },
        { "config": "Syva + Syva Low, coupled", "preset": "[SYVA] + [SYVA LOW_100]", "acoustic": "reinforced LF contour, down to 40 Hz", "acousticShort": "reinforced contour, down to 40 Hz" },
        { "config": "Syva + Syva Sub, hybrid (AutoConnect)", "preset": "[SYVA SUB SYVA]", "acoustic": "reinforced LF contour, down to 28 Hz", "acousticShort": "reinforced contour, down to 28 Hz" },
        { "config": "Syva + Syva Sub, coupled", "preset": "[SYVA] + [SYVA SUB_100]", "acoustic": "reinforced LF contour, down to 27 Hz", "acousticShort": "reinforced contour, down to 27 Hz" },
        { "config": "Syva + Syva Low + Syva Sub, hybrid", "preset": "[SYVA LOW SYVA] + [SYVA SUB_100]", "acoustic": "reinforced LF contour, down to 27 Hz", "acousticShort": "reinforced contour, down to 27 Hz", "ratio": "1 Syva : 1 Syva Low : 2 Syva Sub" },
        { "config": "Syva + Syva Low + Syva Sub, coupled", "preset": "[SYVA] + [SYVA LOW_100] + [SYVA SUB_100]", "acoustic": "reinforced LF contour, down to 27 Hz", "acousticShort": "reinforced contour, down to 27 Hz", "ratio": "1 Syva : 1 Syva Low : 2 Syva Sub" }
      ],
      "notes": [
        { "text": "Acoustic Properties 열의 주파수 대역은 -10 dB 기준 대역폭/저역 한계다." },
        { "text": "AutoConnect 하이브리드 구성([SYVA LOW SYVA]/[SYVA SUB SYVA])은 Syva를 Syva Low/Syva Sub 위에 물리적으로 스택하고 전용 커넥터로 전원이 자동 라우팅되는 구성이며, 원문에 \"별도 사전 정렬 딜레이가 필요 없다\"고 명시되어 있다." },
        { "text": "Recommended_Ratio는 3제품 조합 2건에만 원문에 명시되어 있고, 2제품 조합에는 비율 서술 자체가 없다(임의 추정하지 않음). Syva는 단일 유닛 배치 전용 제품이라 최소 라인 길이 개념도 원문에 없다." }
      ],
      "ratioSource": "Syva_OM_EN.pdf p.25-31",
      "delayDefaults": {
        "rows": [
          { "combo": "[SYVA] + [SYVA SUB_100]", "items": ["Syva = 0 ms", "Syva Sub = 2.6 ms"] },
          { "combo": "[SYVA] + [SYVA LOW_100] + [SYVA SUB_100]", "items": ["Syva = 0 ms", "Syva Low = 0 ms", "Syva Sub = 3.8 ms"] }
        ],
        "notes": [
          { "text": "두 조합 모두 전 엘리먼트가 정상 극성(+)이며 반전 조합은 없다." },
          { "text": "AutoConnect 하이브리드 조합은 원문에 \"별도 사전 정렬 딜레이가 필요 없다\"고 명시되어 있어 이 표에 포함하지 않는다." }
        ],
        "source": "Syva_OM_EN.pdf p.29, 31"
      },
      "source": "Syva_OM_EN.pdf p.25-31"
    },
    "mechanicalSafety": {
      "stackedRows": [
        { "config": "flown", "accessory": "Syva Bar", "safeLimit": "1", "maxLimit": "1" },
        { "config": "wall-mounted", "accessory": "Syva Wall", "safeLimit": "1", "maxLimit": "1" },
        { "config": "ground-stacked", "accessory": "Syva Base", "safeLimit": "1", "maxLimit": "1" },
        { "config": "pole-mounted", "accessory": "Syva Pole", "safeLimit": "1", "maxLimit": "1" }
      ],
      "safetyFactor": "4:1",
      "source": "Syva_OM_EN.pdf p.22-23"
    }
  },
  {
    "id": "spk-la-syva-low",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "Syva Low",
    "series": "S Series",
    "throwCat": "Medium Throw",
    "type": "Subwoofer",
    "throw": "Low-end extension",
    "lowInch": 12,
    "lowQty": 2,
    "crossover": "passive",
    "crossoverTags": [
      "passive"
    ],
    "spl": 137,
    "cov": null,
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "47 Hz",
        "hi": "93 Hz"
      },
      {
        "db": "-6 dB",
        "lo": "42 Hz",
        "hi": "110 Hz"
      },
      {
        "db": "-10 dB",
        "lo": "40 Hz",
        "hi": "130 Hz"
      }
    ],
    // [upload/Syva_Low_v1.2.md 마스터 스키마 반영] Cardioid_Capability.
    "cardioidCapability": "No",
    "weight": 29,
    "transducers": "LF: 2 × 12″",
    "connectors": "4-point speakON, proprietary connector",
    "ip": "IP55",
    "dims": "849 x 334 x 350 mm / 33.4 x 13.1 x 13.8 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 2,
            "total": 6,
            "splByPreset": [
              {
                "preset": "[SYVA LOW_100]",
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
            "perCh": 1,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[SYVA LOW_100]",
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
                "preset": "[SYVA LOW_100]",
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
            "total": 8,
            "splByPreset": [
              {
                "preset": "[SYVA LOW_100]",
                "spl": 137
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(2/6), LA2Xi(SE1/4), LA4X(1/4), LA7.16(1/8)",
    "img": "public/assets/img/speakers/la/s-series/spk-la-syva-low.webp",
    "views": [
      {
        "label": "Front",
        "src": "public/assets/img/speakers/la/s-series/spk-la-syva-low.webp"
      },
      {
        "label": "With Syva",
        "src": "public/assets/img/speakers/la/s-series/spk-la-syva-syva-low-combo.webp"
      }
    ],
    "relations": {
      "ampIds": []
    },
    "watt": 894,
    // [upload/Syva_Low_v1.2.md 마스터 스키마 반영] Preset Guide/Mechanical
    // Safety 신규 반영. Syva Low는 항상 2차 엘리먼트(서브우퍼)로만 등장해
    // delay_defaults는 Syva 카드(spk-la-syva)에 이미 기록되어 있다.
    "presets": {
      "rows": [
        { "config": "Syva Low standard 구성", "preset": "[SYVA LOW_100]", "acoustic": "40 Hz - 20 kHz (Syva 결합 시)", "acousticShort": "40 Hz - 20 kHz (결합 시)" }
      ],
      "notes": [
        { "text": "Syva Low는 항상 Syva와 결합된 시스템 대역폭으로만 서술되며, 단독 대역폭 개념이 원문에 없다." }
      ],
      "source": "Syva_OM_EN.pdf"
    },
    "mechanicalSafety": {
      "stackedRows": [
        { "config": "ground-stacked", "accessory": "Syva Base", "safeLimit": "1", "maxLimit": "1" },
        { "config": "ground-stacked", "accessory": "no rigging accessory", "safeLimit": "1", "maxLimit": "1" },
        { "config": "ground-stacked (Syva 스택 하부)", "accessory": "Syva Base", "safeLimit": "1", "maxLimit": "1" }
      ],
      "safetyFactor": "4:1",
      "source": "Syva_OM_EN.pdf p.22-23"
    }
  },
  {
    "id": "spk-la-syva-sub",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "Syva Sub",
    "series": "S Series",
    "throwCat": "Medium Throw",
    "type": "Subwoofer",
    "throw": "Subwoofers",
    "lowInch": 12,
    "lowQty": 1,
    "crossover": "passive",
    "crossoverTags": [
      "passive"
    ],
    "spl": 128,
    "cov": null,
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "33 Hz",
        "hi": "80 Hz"
      },
      {
        "db": "-6 dB",
        "lo": "29 Hz",
        "hi": "100 Hz"
      },
      {
        "db": "-10 dB",
        "lo": "27 Hz",
        "hi": "120 Hz"
      }
    ],
    // [upload/Syva_Sub_v1.2.md 마스터 스키마 반영] Cardioid_Capability.
    "cardioidCapability": "No",
    "weight": 27,
    "transducers": "LF: 1 × 12″",
    "connectors": "4-point speakON, proprietary connector",
    "ip": "IP55",
    "dims": "849 x 334 x 350 mm / 33.4 x 13.1 x 13.8 in",
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
                "preset": "[SYVA SUB_60]",
                "spl": 122
              },
              {
                "preset": "[SYVA SUB_100]",
                "spl": 128
              },
              {
                "preset": "[SYVA SUB_200]",
                "spl": 130
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
                "preset": "[SYVA SUB_60]",
                "spl": null
              },
              {
                "preset": "[SYVA SUB_100]",
                "spl": 128
              },
              {
                "preset": "[SYVA SUB_200]",
                "spl": 130
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
                "preset": "[SYVA SUB_60]",
                "spl": 122
              },
              {
                "preset": "[SYVA SUB_100]",
                "spl": 123
              },
              {
                "preset": "[SYVA SUB_200]",
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
            "perCh": 1,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[SYVA SUB_60]",
                "spl": 122
              },
              {
                "preset": "[SYVA SUB_100]",
                "spl": 128
              },
              {
                "preset": "[SYVA SUB_200]",
                "spl": 130
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
                "preset": "[SYVA SUB_60]",
                "spl": 122
              },
              {
                "preset": "[SYVA SUB_100]",
                "spl": 128
              },
              {
                "preset": "[SYVA SUB_200]",
                "spl": 130
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/12), LA2Xi(BTL1/2), LA2Xi(SE1/4), LA4X(1/4), LA7.16(1/16)",
    "img": "public/assets/img/speakers/la/s-series/spk-la-syva-sub.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 250,
    // [upload/Syva_Sub_v1.2.md 마스터 스키마 반영] Preset Guide/Mechanical
    // Safety 신규 반영. Syva Sub도 항상 2차 엘리먼트로만 등장해
    // delay_defaults는 Syva 카드(spk-la-syva)에 이미 기록되어 있다.
    "presets": {
      "rows": [
        { "config": "Syva Sub standard 구성", "preset": "[SYVA SUB_100]", "acoustic": "27 Hz - 20 kHz (Syva 결합 시)", "acousticShort": "27 Hz - 20 kHz (결합 시)" }
      ],
      "notes": [
        { "text": "Syva Sub는 항상 Syva와 결합된 시스템 대역폭으로만 서술되며, 단독 대역폭 개념이 원문에 없다." }
      ],
      "source": "Syva_OM_EN.pdf"
    },
    "mechanicalSafety": {
      "stackedRows": [
        { "config": "ground-stacked", "accessory": "Syva Base", "safeLimit": "1", "maxLimit": "1" },
        { "config": "ground-stacked", "accessory": "no rigging accessory", "safeLimit": "1", "maxLimit": "1" },
        { "config": "ground-stacked (Syva 스택 하부)", "accessory": "Syva Base", "safeLimit": "1", "maxLimit": "1" }
      ],
      "safetyFactor": "4:1",
      "source": "Syva_OM_EN.pdf p.22-23"
    }
  }
];
