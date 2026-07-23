// L-Acoustics Subwoofers 스피커 데이터 (9개 모델).
// 필드 스키마 설명은 speakers.schema.js 참조.
// 파생 필드(wayCount / network / lowUnitConfig)는 로드 시 normalize 함수가 생성하므로 저장하지 않는다.
export const LA_SUBWOOFERS = [
  {
    "id": "spk-la-cs1",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "CS1",
    "series": "Subwoofers",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": "Subwoofers",
    "lowInch": 21,
    "lowQty": 4,
    "crossover": "passive",
    "crossoverTags": [
      "passive"
    ],
    "spl": 150,
    "cov": null,
    "freqs": [
      {
        "db": "-10 dB",
        "lo": "25 Hz",
        "hi": "?"
      }
    ],
    // [upload/CS1_v1.3.md 마스터 스키마 반영] Cardioid_Capability — 원문:
    // CS1_OM_EN_2.0.pdf p.13 "Polar pattern"(전방 SB 2발 + 측면 SC 2발
    // 내장 배치로 단일 인클로저 자체가 카디오이드 성형).
    "cardioidCapability": "Integrated",
    "weight": 180,
    // [수정] transducers/connectors/lowQty — 마스터 스키마(CS1_OM_EN_2.0.pdf
    // p.87 "CS1 specifications")로 대조한 결과 기존 값이 부정확했다:
    // [사용자 확인] "LC"는 오기가 아니라 제조사(CS1_OM_EN_2.0.pdf) 표기
    // 그대로 — LC(측면 SC 채널)/LF(전방 SB 채널)로 역할이 구분되어
    // 하나로 뭉쳐 표기하지 않는다. 커넥터 명칭은 원문 다이어그램/핀아웃표
    // 기준 "PA-COM"(스펙 표의 "CA-COM" 3회 표기는 문서 내 오기로 판단,
    // K1/K2와 동일 8-point PA-COM 체계).
    "transducers": "LC: 2 × 21″ · LF: 2 × 21″",
    "connectors": "8-point PA-COM x2 (IN 1 + LINK 1)",
    // [upload/CS1_v1.3.md 마스터 스키마 반영] PA-COM 8핀 그룹별 매핑.
    // 원문: CS1_OM_EN_2.0.pdf p.15 "Connectors"(4채널 독립 구동).
    "paComPinout": { "ab": "LF1", "cd": "LF2", "ef": "LF3", "gh": "LF4" },
    "ip": "IP55",
    // [수정] dims — 기존 값의 축이 W x D x H 순으로 뒤섞여 있었다.
    // 마스터 스키마(도면 이미지 렌더링 확인)가 Width=1514/Height=1117/
    // Depth=588mm로 축을 확정 — W x H x D 순으로 정정.
    "dims": "1514 x 1117 x 588 mm / 59.6 x 44 x 23.1 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 2,
            "total": 2,
            "splByPreset": [
              {
                "preset": "[CS1_60]",
                "spl": 147
              },
              {
                "preset": "[CS1_X]",
                "spl": null
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(2/2)",
    "img": "public/assets/img/speakers/la/subwoofers/spk-la-cs1.webp",
    "views": [
      {
        "label": "Front",
        "src": "public/assets/img/speakers/la/subwoofers/spk-la-cs1.webp"
      },
      {
        "label": "Rear",
        "src": "public/assets/img/speakers/la/subwoofers/spk-la-cs1-rear.webp"
      }
    ],
    "relations": {
      "ampIds": []
    },
    "watt": null,
    // [upload/CS1_v1.3.md 마스터 스키마 반영] Preset Guide/Mechanical
    // Safety 신규 반영.
    "presets": {
      "rows": [
        { "config": "CS1 as a subwoofer (cardioid)", "preset": "[CS1_60]", "acoustic": "25 Hz~ (cardioid)", "acousticShort": "25 Hz~, cardioid" },
        { "config": "CS1 as a subwoofer (supercardioid)", "preset": "[CS1_60_S]", "acoustic": "25 Hz~ (supercardioid)", "acousticShort": "25 Hz~, supercardioid" },
        { "config": "CS1 as an LF extension in an L1(D) line source", "preset": "[CS1_X] / [CS1_X_S]", "acoustic": "—", "acousticShort": "—" }
      ],
      "notes": [
        { "text": "카디오이드 배치 시 최소 이격 거리: 벽에서 1 m 이상, 스택 간 1.5 m 이상 — 이보다 가까우면 후방 배제(rear rejection) 성능이 저하될 수 있다." },
        { "text": "[CS1_X]/[CS1_X_S]는 CS1을 L1(D) 라인소스의 LF 확장으로 편입할 때 쓰는 프리셋으로, CS1 자신의 매뉴얼에는 구체적 주파수 범위/매칭 비율이 없다(L1(D) 자체 스펙에 종속)." },
        { "text": "K1/K2/K3/L2/L2D와의 조합 매칭 비율·딜레이 값은 각 라인소스 제품 자신의 데이터에 이미 반영되어 있다(CS1은 항상 2차 엘리먼트)." }
      ],
      "source": "CS1_OM_EN_2.0.pdf p.37-38"
    },
    "mechanicalSafety": {
      "flownRows": [
        { "config": "flown", "accessory": "CS1-BUMP + CS1-BAR (optional)", "safeLimit": "—", "maxLimit": "8 CS1" },
        { "config": "flown", "accessory": "CS1-BUMP + L1CS1-RAKMOUNT + CS1-BAR", "safeLimit": "—", "maxLimit": "2 LA-RAK III + 8 CS1" },
        { "config": "flown", "accessory": "L1-BUMP + L1-BAR (optional)", "safeLimit": "—", "maxLimit": "16 CS1" },
        { "config": "flown", "accessory": "L1-BUMP + 2 CS1-BAR (optional)", "safeLimit": "—", "maxLimit": "12 CS1" },
        { "config": "flown", "accessory": "L1-BUMP + L1CS1-RAKMOUNT + L1-BAR", "safeLimit": "—", "maxLimit": "4 LA-RAK III + 14 CS1" }
      ],
      "stackedRows": [
        { "config": "ground-stacked", "accessory": "no rigging accessory", "safeLimit": "—", "maxLimit": "4" },
        { "config": "stacked on chariot", "accessory": "CS1-CHARIOT", "safeLimit": "—", "maxLimit": "4" }
      ],
      "safetyFactor": "5:1",
      "maxWindLoad": "6 Beaufort",
      "source": "CS1_OM_EN_2.0.pdf p.35"
    }
  },
  {
    "id": "spk-la-ks28",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "KS28",
    "series": "Subwoofers",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": "Subwoofers",
    "lowInch": 18,
    "lowQty": 2,
    "crossover": "passive",
    "crossoverTags": [
      "passive"
    ],
    "spl": 142,
    "cov": null,
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "32 Hz",
        "hi": "76 Hz"
      },
      {
        "db": "-6 dB",
        "lo": "29 Hz",
        "hi": "96 Hz"
      },
      {
        "db": "-10 dB",
        "lo": "25 Hz",
        "hi": "110 Hz"
      }
    ],
    // [upload/KS28_v1.9.md 마스터 스키마 반영] Cardioid_Capability.
    "cardioidCapability": "Array + preset",
    "weight": 79,
    "transducers": "LF: 2 × 18″",
    "connectors": "4-point speakON",
    "ip": "IP55",
    // [수정] dims — 기존 값(1340 x 550 x 719mm)이 부정확했다. 마스터
    // 스키마(KS28_AE_EN.docx "Dimensions (W, H, D)")가 Width=1340/
    // Height=719/Depth=565mm로 축을 확정 — 정정.
    "dims": "1340 x 719 x 565 mm / 52.8 x 28.3 x 22.2 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[KS28_100]",
                "spl": 143
              }
            ]
          }
        ]
      },
      {
        "model": "LA2Xi",
        "configs": [
          {
            "mode": "PBTL",
            "perCh": 1,
            "total": 1,
            "splByPreset": [
              {
                "preset": "[KS28_100]",
                "spl": 143
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
                "preset": "[KS28_100]",
                "spl": 136
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(1/4), LA2Xi(PBTL1/1), LA2Xi(SE1/4)",
    "img": "public/assets/img/speakers/la/subwoofers/spk-la-ks28.webp",
    "views": [
      {
        "label": "Front",
        "src": "public/assets/img/speakers/la/subwoofers/spk-la-ks28.webp"
      },
      {
        "label": "With K3 (4x K3 + 2x KS28 + K3-TILT)",
        "src": "public/assets/img/speakers/la/subwoofers/spk-la-ks28-with-k3.webp"
      }
    ],
    "relations": {
      "ampIds": []
    },
    "watt": 1181,
    // [upload/KS28_v1.9.md 마스터 스키마 반영] Mechanical Safety 신규
    // 반영. KS28은 preset_guide_and_matching/delay_defaults가 원본에
    // KS28 관점 데이터 없이 전부 null(항상 2차 엘리먼트, 실값은 K1/K2/
    // K3/Kara II/Kiva II/L2/L2D 자신의 데이터에 이미 반영됨)이라 presets
    // 필드는 추가하지 않았다.
    "mechanicalSafety": {
      "flownRows": [
        { "config": "flown", "accessory": "KS28-BUMP", "safeLimit": "16", "maxLimit": "16" }
      ],
      "stackedRows": [
        { "config": "ground-stacked", "accessory": "no rigging accessory", "safeLimit": "—", "maxLimit": "4" },
        { "config": "stacked upright", "accessory": "no rigging accessory", "safeLimit": "—", "maxLimit": "2" },
        { "config": "stacked on chariot", "accessory": "KS28-CHARIOT", "safeLimit": "—", "maxLimit": "4" }
      ],
      "safetyFactor": "5:1",
      "maxWindLoad": "6 Beaufort",
      "source": "KS28_OM_EN_1.0.pdf"
    }
  },
  {
    "id": "spk-la-ks21",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "KS21",
    "series": "Subwoofers",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": "Subwoofers",
    "lowInch": 21,
    "lowQty": 1,
    "crossover": "passive",
    "crossoverTags": [
      "passive"
    ],
    "spl": 138,
    "cov": null,
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "35 Hz",
        "hi": "60 Hz"
      },
      {
        "db": "-6 dB",
        "lo": "32 Hz",
        "hi": "71 Hz"
      },
      {
        "db": "-10 dB",
        "lo": "29 Hz",
        "hi": "83 Hz"
      }
    ],
    // [upload/KS21_v1.5.md 마스터 스키마 반영] Cardioid_Capability.
    "cardioidCapability": "Array + preset",
    "weight": 49,
    "transducers": "LF: 1 × 21″",
    "connectors": "4-point speakON",
    "ip": "IP55",
    // [수정] dims — 기존 값(764 x 571 x 601mm)이 부정확했다. 마스터
    // 스키마(KS21_AE_EN.docx "Dimensions (W, H, D)")가 Width=762/
    // Height=576/Depth=620mm로 축을 확정 — 정정.
    "dims": "762 x 576 x 620 mm / 30 x 22.7 x 24.4 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 2,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[KS21_100]",
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
            "mode": "BTL",
            "perCh": 1,
            "total": 2,
            "splByPreset": [
              {
                "preset": "[KS21_100]",
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
            "total": 4,
            "splByPreset": [
              {
                "preset": "[KS21_100]",
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
                "preset": "[KS21_100]",
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
                "preset": "[KS21_100]",
                "spl": 138
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(2/8), LA2Xi(BTL1/2), LA2Xi(SE1/4), LA4X(1/4), LA7.16(1/8)",
    "img": "public/assets/img/speakers/la/subwoofers/spk-la-ks21.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 467,
    // [upload/KS21_v1.5.md 마스터 스키마 반영] Preset Guide/Mechanical
    // Safety 신규 반영. A10/A15와의 조합 delay_defaults는 KS21이 항상
    // 2차 엘리먼트라 해당 라인소스 자신의 데이터에 이미 반영되어 있다.
    "presets": {
      "rows": [
        { "config": "KS21 standard configuration", "preset": "[KS21_60] / [KS21_100]", "acoustic": "29 - 83 Hz / 31 - 100 Hz", "acousticShort": "29-83 / 31-100 Hz" }
      ],
      "notes": [
        { "text": "인접 서브우퍼 음향 중심 간 최대 거리: [KS21_60](60Hz 상한) 사용 시 2.8 m, [KS21_100](100Hz 상한) 사용 시 1.7 m." }
      ],
      "source": "KS21_OM_EN.pdf p.26-27"
    },
    "mechanicalSafety": {
      "flownRows": [
        { "config": "Vertical array (flown)", "accessory": "A15-BUMP", "safeLimit": "8", "maxLimit": "16" },
        { "config": "Vertical array (flown)", "accessory": "A15-RIGBAR", "safeLimit": "4", "maxLimit": "4" }
      ],
      "stackedRows": [
        { "config": "Stacked vertical array", "accessory": "no rigging accessory", "safeLimit": "3", "maxLimit": "3" },
        { "config": "Stacked vertical array", "accessory": "KS21-OUTRIG", "safeLimit": "4", "maxLimit": "4" },
        { "config": "Stacked upright", "accessory": "no rigging accessory", "safeLimit": "3", "maxLimit": "3" },
        { "config": "Stacked on chariot", "accessory": "KS21-CHARIOT", "safeLimit": "3", "maxLimit": "3" },
        { "config": "Stacked on chariot with stabilizers", "accessory": "KS21-CHARIOT + K2-JACK", "safeLimit": "4", "maxLimit": "4" }
      ],
      "safetyFactor": "4:1",
      "maxWindLoad": "6 Beaufort",
      "source": "KS21_OM_EN.pdf p.25"
    }
  },
  {
    "id": "spk-la-ks21i",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "KS21i",
    "series": "Subwoofers",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": "Subwoofers",
    "lowInch": 21,
    "lowQty": 1,
    "crossover": "passive",
    "crossoverTags": [
      "passive"
    ],
    "spl": 138,
    "cov": null,
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "35 Hz",
        "hi": "60 Hz"
      },
      {
        "db": "-6 dB",
        "lo": "32 Hz",
        "hi": "71 Hz"
      },
      {
        "db": "-10 dB",
        "lo": "29 Hz",
        "hi": "83 Hz"
      }
    ],
    // [upload/KS21i_v1.4.md 마스터 스키마 반영] Cardioid_Capability.
    "cardioidCapability": "Array + preset",
    "weight": 46,
    "transducers": "LF: 1 × 21″ neodymium",
    "connectors": "4-point terminal block with push-in connection",
    "ip": "IP55",
    "dims": "752 x 569 x 602 mm / 29.6 x 22.4 x 23.7 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 2,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[KS21_100]",
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
            "mode": "BTL",
            "perCh": 1,
            "total": 2,
            "splByPreset": [
              {
                "preset": "[KS21_100]",
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
            "total": 4,
            "splByPreset": [
              {
                "preset": "[KS21_100]",
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
                "preset": "[KS21_100]",
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
                "preset": "[KS21_100]",
                "spl": 138
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(2/8), LA2Xi(BTL1/2), LA2Xi(SE1/4), LA4X(1/4), LA7.16(1/8)",
    "img": "public/assets/img/speakers/la/subwoofers/spk-la-ks21i.webp",
    "notes": "KS21의 설치용(install) 버전. L-Acoustics preset_guide_EN.pdf(v29.0)에 KS21/KS21i가 동일 인클로저로 팩토리 프리셋·앰프 매칭을 공유한다고 명시되어 있어 음향 스펙은 KS21과 동일하게 반영. 물리 스펙은 공식 스펙시트(KS21i_AE_EN.docx, 2026-07-10 확보)로 채움 — non-i(KS21)와 값이 다름(weight 46kg vs 49kg 등), 별개 실측치로 확인.",
    "relations": {
      "ampIds": []
    },
    "watt": 467,
    // [upload/KS21i_v1.4.md 마스터 스키마 반영] Preset Guide 신규 반영.
    // Mechanical Safety 상세 표는 KS21i 자신의 원본에 없고 A10i/A15i
    // 파일에 이미 그 제품 관점으로 반영되어 있어 safetyFactor만 채운다.
    "presets": {
      "rows": [
        { "config": "KS21i standard configuration", "preset": "[KS21_60] / [KS21_100]", "acoustic": "29 - 83 Hz / 31 - 100 Hz", "acousticShort": "29-83 / 31-100 Hz" }
      ],
      "source": "KS21i_OM_EN.pdf"
    },
    "mechanicalSafety": {
      "safetyFactor": "4:1",
      "source": "KS21i_OM_EN.pdf (상세 표는 A10i/A15i 파일에 이미 반영됨)"
    }
  },
  {
    "id": "spk-la-sb18",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "SB18",
    "series": "Subwoofers",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": "Subwoofers",
    "lowInch": 18,
    "lowQty": 1,
    "crossover": "passive",
    "crossoverTags": [
      "passive"
    ],
    "spl": 138,
    "cov": null,
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "37 Hz",
        "hi": "82 Hz"
      },
      {
        "db": "-6 dB",
        "lo": "34 Hz",
        "hi": "100 Hz"
      },
      {
        "db": "-10 dB",
        "lo": "32 Hz",
        "hi": "110 Hz"
      }
    ],
    // [upload/SB18_v1.3.md 마스터 스키마 반영] Cardioid_Capability.
    "cardioidCapability": "Array + preset",
    "weight": 52,
    "transducers": "LF: 1 × 18″",
    "connectors": "4-point speakON",
    "ip": "IP55",
    "dims": "750 x 553 x 707 mm / 29.5 x 21.8 x 27.8 in",
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
                "preset": "[SB18_100]",
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
            "mode": "BTL",
            "perCh": 1,
            "total": 2,
            "splByPreset": [
              {
                "preset": "[SB18_100]",
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
            "total": 4,
            "splByPreset": [
              {
                "preset": "[SB18_100]",
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
            "total": 4,
            "splByPreset": [
              {
                "preset": "[SB18_100]",
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
            "total": 6,
            "splByPreset": [
              {
                "preset": "[SB18_100]",
                "spl": 138
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/12), LA2Xi(BTL1/2), LA2Xi(SE1/4), LA4X(1/4), LA7.16(1/6)",
    "img": "public/assets/img/speakers/la/subwoofers/spk-la-sb18.webp",
    "views": [
      {
        "label": "Front",
        "src": "public/assets/img/speakers/la/subwoofers/spk-la-sb18.webp"
      },
      {
        "label": "With Kara II (3x SB18 + 9x Kara II)",
        "src": "public/assets/img/speakers/la/subwoofers/spk-la-sb18-with-kara-ii.webp"
      }
    ],
    "relations": {
      "ampIds": []
    },
    "watt": 387,
    // [upload/SB18_v1.3.md 마스터 스키마 반영] Preset Guide 신규 반영.
    // Mechanical Safety는 SB18 자신의 리깅 매뉴얼에 구성별 표가 없어
    // Max_Wind_Load만 실값으로 확인된다(K1/K2/K3/Kara II와의 조합 딜레이는
    // 각 라인소스 자신의 데이터에 이미 반영됨, SB18은 항상 2차 엘리먼트).
    "presets": {
      "rows": [
        { "config": "SB18 standard configuration", "preset": "[SB18_60] / [SB18_100]", "acoustic": "[SB18_100]: 32 - 110 Hz", "acousticShort": "[SB18_100]: 32-110 Hz" },
        { "config": "SB18 cardioid configuration", "preset": "[SB18_60_C]/[SB18_60_Cx] / [SB18_100_C]/[SB18_100_Cx]", "acoustic": "[SB18_100]: 32 - 110 Hz", "acousticShort": "[SB18_100]: 32-110 Hz" }
      ],
      "source": "SB18_UM_EN_6.0.pdf p.8-9"
    },
    "mechanicalSafety": {
      "maxWindLoad": "6 Beaufort",
      "source": "SB18_RM_EN_2.0.pdf p.2"
    }
  },
  {
    "id": "spk-la-sb18-iii",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "SB18 IIi",
    "cardioidCapability": "Array + preset",
    "series": "Subwoofers",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": "Subwoofers",
    "lowInch": 18,
    "lowQty": 1,
    "crossover": "passive",
    "crossoverTags": [
      "passive"
    ],
    "spl": 138,
    "cov": null,
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "37 Hz",
        "hi": "82 Hz"
      },
      {
        "db": "-6 dB",
        "lo": "34 Hz",
        "hi": "100 Hz"
      },
      {
        "db": "-10 dB",
        "lo": "32 Hz",
        "hi": "110 Hz"
      }
    ],
    "weight": 48,
    "transducers": "LF: 1 × 18″",
    "connectors": "4-point terminal block with push-in connection",
    "ip": "IP55",
    "dims": "701 x 540 x 728 mm / 27.6 x 21.3 x 28.7 in",
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
                "preset": "[SB18_100]",
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
            "mode": "BTL",
            "perCh": 1,
            "total": 2,
            "splByPreset": [
              {
                "preset": "[SB18_100]",
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
            "total": 4,
            "splByPreset": [
              {
                "preset": "[SB18_100]",
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
            "total": 4,
            "splByPreset": [
              {
                "preset": "[SB18_100]",
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
            "total": 6,
            "splByPreset": [
              {
                "preset": "[SB18_100]",
                "spl": 138
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/12), LA2Xi(BTL1/2), LA2Xi(SE1/4), LA4X(1/4), LA7.16(1/6)",
    "img": "public/assets/img/speakers/la/subwoofers/spk-la-sb18-iii.webp",
    "views": [
      {
        "label": "Front",
        "src": "public/assets/img/speakers/la/subwoofers/spk-la-sb18-iii.webp"
      },
      {
        "label": "With Kara IIi (3x SB18 IIi + 9x Kara IIi + KARAIIi-BUMP)",
        "src": "public/assets/img/speakers/la/subwoofers/spk-la-sb18-iii-with-kara-iii.webp"
      }
    ],
    "notes": "SB18(i/m)과 함께 [SB18_100] 프리셋 계열을 공유하는 후속 모델. L-Acoustics preset_guide_EN.pdf(v29.0) drive capacity 표에 'SB18(i/m) / SB18 IIi'로 병기되어 동일한 앰프 매칭 값을 사용. 물리 스펙은 공식 스펙시트(SB18_IIi_AE_EN.docx, 2026-07-10 확보)로 채움.",
    "relations": {
      "ampIds": []
    },
    "watt": 387
  },
  {
    "id": "spk-la-sb15m",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "SB15m",
    "series": "Subwoofers",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": "Subwoofers",
    "lowInch": 15,
    "lowQty": 1,
    "crossover": "passive",
    "crossoverTags": [
      "passive"
    ],
    "spl": 137,
    "cov": null,
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "49 Hz",
        "hi": "85 Hz"
      },
      {
        "db": "-6 dB",
        "lo": "46 Hz",
        "hi": "102 Hz"
      },
      {
        "db": "-10 dB",
        "lo": "40 Hz",
        "hi": "120 Hz"
      }
    ],
    // [upload/SB15m_v1.4.md 마스터 스키마 반영] Cardioid_Capability.
    "cardioidCapability": "Array + preset",
    "weight": 36,
    "transducers": "LF: 1 × 15″",
    "connectors": "4-point speakON",
    "ip": "IP55",
    "dims": "579 x 439 x 520 mm / 22.8 x 17.3 x 20.5 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 2,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[SB15_100]",
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
                "preset": "[SB15_100]",
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
                "preset": "[SB15_100]",
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
                "preset": "[SB15_100]",
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
                "preset": "[SB15_100]",
                "spl": 137
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(2/8), LA2Xi(BTL1/2), LA2Xi(SE1/4), LA4X(1/4), LA7.16(1/16)",
    "img": "public/assets/img/speakers/la/subwoofers/spk-la-sb15m.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 608,
    // [upload/SB15m_v1.4.md 마스터 스키마 반영] Preset Guide/Mechanical
    // Safety 신규 반영. X8/X12와의 조합 delay_defaults는 SB15m이 항상
    // 2차 엘리먼트라 각 라인소스 자신의 데이터에 이미 반영되어 있다.
    "presets": {
      "rows": [
        { "config": "SB15m standard configuration", "preset": "[SB15_100]", "acoustic": "40 - 120 Hz", "acousticShort": "40-120 Hz" },
        { "config": "SB15m cardioid configuration", "preset": "[SB15_100_C]", "acoustic": "40 - 120 Hz", "acousticShort": "40-120 Hz" }
      ],
      "source": "SB15m_UM_EN_4.1.pdf p.7-8"
    },
    "mechanicalSafety": {
      "flownRows": [
        { "config": "flown", "accessory": "KIBU-SB + bow shackle WLL 1t", "safeLimit": "—", "maxLimit": "8" },
        { "config": "flown", "accessory": "KIBU-SB + CLAMP250", "safeLimit": "—", "maxLimit": "6" }
      ],
      "stackedRows": [
        { "config": "ground-stacked", "accessory": "no rigging accessory", "safeLimit": "—", "maxLimit": "8" }
      ],
      "maxWindLoad": "6 Beaufort",
      "source": "SB15m_RM_EN_2.0.pdf p.7"
    }
  },
  {
    "id": "spk-la-sb10r",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "SB10r",
    "series": "Subwoofers",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": "Subwoofers",
    "lowInch": 10,
    "lowQty": 1,
    "crossover": "passive",
    "crossoverTags": [
      "passive"
    ],
    "spl": 124,
    "cov": null,
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "30 Hz",
        "hi": "55 Hz"
      },
      {
        "db": "-6 dB",
        "lo": "27 Hz",
        "hi": "64 Hz"
      },
      {
        "db": "-10 dB",
        "lo": "25 Hz",
        "hi": "70 Hz"
      }
    ],
    // [upload/SB10r_v1.4.md 마스터 스키마 반영] Cardioid_Capability.
    "cardioidCapability": "No",
    "weight": 13,
    "transducers": "LF: 1 × 10″",
    "connectors": "4-point terminal block",
    "ip": "IP55",
    // [수정] dims — 기존 값이 W/H 축을 뒤바꿔 표기했다. 마스터 스키마
    // (SB10r_OM_EN.pdf 도면 이미지 렌더링 확인)가 Width=539/Height=547/
    // Depth=169mm로 축을 확정 — 정정.
    "dims": "539 x 547 x 169 mm / 21.2 x 21.5 x 6.7 in",
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
                "preset": "[SB10_60]",
                "spl": 119
              },
              {
                "preset": "[SB10_100]",
                "spl": 122
              },
              {
                "preset": "[SB10_200]",
                "spl": 125
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
                "preset": "[SB10_60]",
                "spl": null
              },
              {
                "preset": "[SB10_100]",
                "spl": 122
              },
              {
                "preset": "[SB10_200]",
                "spl": 125
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
                "preset": "[SB10_60]",
                "spl": 119
              },
              {
                "preset": "[SB10_100]",
                "spl": 120
              },
              {
                "preset": "[SB10_200]",
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
            "perCh": 2,
            "total": 32,
            "splByPreset": [
              {
                "preset": "[SB10_60]",
                "spl": 119
              },
              {
                "preset": "[SB10_100]",
                "spl": 122
              },
              {
                "preset": "[SB10_200]",
                "spl": 125
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/12), LA2Xi(BTL1/2), LA2Xi(SE2/8), LA7.16(2/32)",
    "img": "public/assets/img/speakers/la/subwoofers/spk-la-sb10r.webp",
    "views": [
      {
        "label": "Front",
        "src": "public/assets/img/speakers/la/subwoofers/spk-la-sb10r.webp"
      },
      {
        "label": "Install (In-Tile)",
        "src": "public/assets/img/speakers/la/subwoofers/spk-la-sb10r-intile.webp"
      },
      {
        "label": "Install (In-Wall)",
        "src": "public/assets/img/speakers/la/subwoofers/spk-la-sb10r-inwall.webp"
      }
    ],
    "relations": {
      "ampIds": []
    },
    "watt": 146,
    // [upload/SB10r_v1.4.md 마스터 스키마 반영] Preset Guide/Mechanical
    // Safety 신규 반영. X-시리즈와의 조합 delay_defaults는 SB10r이 항상
    // 2차 엘리먼트라 각 라인소스 자신의 데이터에 이미 반영되어 있다.
    "presets": {
      "rows": [
        { "config": "SB10r standard configuration", "preset": "[SB10_60] / [SB10_100] / [SB10_200]", "acoustic": "25 Hz~ / 27 Hz~ / 29 Hz~", "acousticShort": "25/27/29 Hz~" }
      ],
      "source": "SB10r_OM_EN.pdf p.18"
    },
    "mechanicalSafety": {
      "flownRows": [
        { "config": "in-wall", "accessory": "SB10r-inW + SB10r-Screen", "safeLimit": "1", "maxLimit": "1" },
        { "config": "in-ceiling", "accessory": "SB10r-inC + SB10r-Screen", "safeLimit": "1", "maxLimit": "1" },
        { "config": "in-tile", "accessory": "SB10r-Tilescreen", "safeLimit": "1", "maxLimit": "1" }
      ],
      "safetyFactor": "5:1",
      "source": "SB10r_OM_EN.pdf p.17"
    }
  },
  {
    "id": "spk-la-sb10i",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "SB10i",
    "series": "Subwoofers",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": "Subwoofers",
    "lowInch": 10,
    "lowQty": 1,
    "crossover": "passive",
    "crossoverTags": [
      "passive"
    ],
    "spl": 124,
    "cov": null,
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "30 Hz",
        "hi": "55 Hz"
      },
      {
        "db": "-6 dB",
        "lo": "27 Hz",
        "hi": "64 Hz"
      },
      {
        "db": "-10 dB",
        "lo": "25 Hz",
        "hi": "70 Hz"
      }
    ],
    // [upload/SB10i_v1.3.md 마스터 스키마 반영] Cardioid_Capability.
    "cardioidCapability": "No",
    "weight": 15,
    "transducers": "LF: 1 × 10″",
    "connectors": "4-point terminal block",
    "ip": "IP55",
    "dims": "540 x 540 x 170 mm / 21.3 x 21.3 x 6.7 in",
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
                "preset": "[SB10_60]",
                "spl": 119
              },
              {
                "preset": "[SB10_100]",
                "spl": 122
              },
              {
                "preset": "[SB10_200]",
                "spl": 125
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
                "preset": "[SB10_60]",
                "spl": null
              },
              {
                "preset": "[SB10_100]",
                "spl": 122
              },
              {
                "preset": "[SB10_200]",
                "spl": 125
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
                "preset": "[SB10_60]",
                "spl": 119
              },
              {
                "preset": "[SB10_100]",
                "spl": 120
              },
              {
                "preset": "[SB10_200]",
                "spl": 123
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
                "preset": "[SB10_60]",
                "spl": 119
              },
              {
                "preset": "[SB10_100]",
                "spl": 122
              },
              {
                "preset": "[SB10_200]",
                "spl": 125
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
            "perCh": 2,
            "total": 32,
            "splByPreset": [
              {
                "preset": "[SB10_60]",
                "spl": 119
              },
              {
                "preset": "[SB10_100]",
                "spl": 122
              },
              {
                "preset": "[SB10_200]",
                "spl": 125
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
                "preset": "[SB10_60]",
                "spl": 111
              },
              {
                "preset": "[SB10_100]",
                "spl": 112
              },
              {
                "preset": "[SB10_200]",
                "spl": 114
              }
            ]
          },
          {
            "mode": "BTL",
            "perCh": 1,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[SB10_60]",
                "spl": 118
              },
              {
                "preset": "[SB10_100]",
                "spl": 120
              },
              {
                "preset": "[SB10_200]",
                "spl": 123
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/12), LA2Xi(BTL1/2), LA2Xi(SE2/8), LA4X(2/8), LA7.16(2/32)",
    "img": "public/assets/img/speakers/la/subwoofers/spk-la-sb10i.webp",
    "views": [
      {
        "label": "Front (Black)",
        "src": "public/assets/img/speakers/la/subwoofers/spk-la-sb10i.webp"
      },
      {
        "label": "Rear",
        "src": "public/assets/img/speakers/la/subwoofers/spk-la-sb10i-rear.webp"
      },
      {
        "label": "Front (White)",
        "src": "public/assets/img/speakers/la/subwoofers/spk-la-sb10i-white-front.webp"
      },
      {
        "label": "Install (In-Situ)",
        "src": "public/assets/img/speakers/la/subwoofers/spk-la-sb10i-insitu.webp"
      }
    ],
    "relations": {
      "ampIds": []
    },
    "watt": 146,
    // [upload/SB10i_v1.3.md 마스터 스키마 반영] Preset Guide/Mechanical
    // Safety 신규 반영. X-시리즈와의 조합 delay_defaults는 SB10i가 항상
    // 2차 엘리먼트라 각 라인소스 자신의 데이터에 이미 반영되어 있다.
    "presets": {
      "rows": [
        { "config": "SB10i standard configuration", "preset": "[SB10_60] / [SB10_100] / [SB10_200]", "acoustic": "25-70 / 27-118 / 29-180 Hz", "acousticShort": "25-70 / 27-118 / 29-180 Hz" }
      ],
      "source": "SB10i_OM_EN.pdf p.15"
    },
    "mechanicalSafety": {
      "flownRows": [
        { "config": "wall-mounted or ceiling-mounted", "accessory": "SB10i-onCW", "safeLimit": "1", "maxLimit": "1" }
      ],
      "stackedRows": [
        { "config": "ground-stacked", "accessory": "no rigging accessory", "safeLimit": "2", "maxLimit": "2" },
        { "config": "stacked upright", "accessory": "no rigging accessory", "safeLimit": "1", "maxLimit": "1" }
      ],
      "safetyFactor": "5:1",
      "maxWindLoad": "6 Beaufort",
      "source": "SB10i_OM_EN.pdf p.14"
    }
  },
  {
    "id": "spk-la-sb6r",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "SB6r",
    "series": "Subwoofers",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": "Subwoofers",
    "lowInch": 6.5,
    "lowQty": 2,
    "crossover": "passive",
    "crossoverTags": [
      "passive"
    ],
    "spl": 115,
    "cov": null,
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "34 Hz",
        "hi": "75 Hz"
      },
      {
        "db": "-6 dB",
        "lo": "32 Hz",
        "hi": "90 Hz"
      },
      {
        "db": "-10 dB",
        "lo": "29 Hz",
        "hi": "107 Hz"
      }
    ],
    // [upload/SB6r_v1.5.md 마스터 스키마 반영] Cardioid_Capability.
    "cardioidCapability": "No",
    "weight": 10.6,
    "transducers": "LF: 2 × 6.5″",
    "connectors": "4-point terminal block",
    "ip": "IP55",
    "dims": "360 x 532 x 99 mm / 14.2 x 20.9 x 3.9 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 2,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[SB6_60]",
                "spl": 110
              },
              {
                "preset": "[SB6_100]",
                "spl": 111
              },
              {
                "preset": "[SB6_200]",
                "spl": 115
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
                "preset": "[SB6_60]",
                "spl": 110
              },
              {
                "preset": "[SB6_100]",
                "spl": 111
              },
              {
                "preset": "[SB6_200]",
                "spl": 115
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
                "preset": "[SB6_60]",
                "spl": 110
              },
              {
                "preset": "[SB6_100]",
                "spl": 111
              },
              {
                "preset": "[SB6_200]",
                "spl": 115
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
                "preset": "[SB6_60]",
                "spl": 110
              },
              {
                "preset": "[SB6_100]",
                "spl": 111
              },
              {
                "preset": "[SB6_200]",
                "spl": 115
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(2/8), LA2Xi(SE1/4), LA4X(1/4), LA7.16(1/16)",
    "img": "public/assets/img/speakers/la/subwoofers/spk-la-sb6r.webp",
    "views": [
      {
        "label": "Front",
        "src": "public/assets/img/speakers/la/subwoofers/spk-la-sb6r.webp"
      },
      {
        "label": "Install (In-Tile)",
        "src": "public/assets/img/speakers/la/subwoofers/spk-la-sb6r-intile.webp"
      }
    ],
    "relations": {
      "ampIds": []
    },
    "watt": 85,
    // [upload/SB6r_v1.5.md 마스터 스키마 반영] Preset Guide 신규 반영.
    // Mechanical Safety는 SB6r 자신의 원본에 표가 없어(SB6i와 동일 사유)
    // 추가하지 않았다. X6i/X4i와의 조합 delay_defaults도 SB6r이 항상
    // 2차 엘리먼트라 각 라인소스 자신의 데이터에 이미 반영되어 있다.
    "presets": {
      "rows": [
        { "config": "SB6r standard configuration", "preset": "[SB6_60] / [SB6_100] / [SB6_200]", "acoustic": "29 Hz~ / 29 Hz~ / 32 Hz~", "acousticShort": "29/29/32 Hz~" }
      ],
      "source": "SB6r_OM_EN.pdf"
    }
  },
  {
    "id": "spk-la-sb6i",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "SB6i",
    "series": "Subwoofers",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": "Subwoofers",
    "lowInch": 6.5,
    "lowQty": 2,
    "crossover": "passive",
    "crossoverTags": [
      "passive"
    ],
    "spl": 115,
    "cov": null,
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "34 Hz",
        "hi": "75 Hz"
      },
      {
        "db": "-6 dB",
        "lo": "32 Hz",
        "hi": "90 Hz"
      },
      {
        "db": "-10 dB",
        "lo": "29 Hz",
        "hi": "107 Hz"
      }
    ],
    // [upload/SB6i_v1.4.md 마스터 스키마 반영] Cardioid_Capability.
    "cardioidCapability": "No",
    "weight": 9,
    "transducers": "LF: 2 × 6.5″",
    "connectors": "4-point terminal block",
    "ip": "IP55",
    "dims": "360 x 532 x 99 mm / 14.2 x 20.9 x 3.9 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 2,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[SB6_60]",
                "spl": 110
              },
              {
                "preset": "[SB6_100]",
                "spl": 111
              },
              {
                "preset": "[SB6_200]",
                "spl": 115
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
                "preset": "[SB6_60]",
                "spl": 110
              },
              {
                "preset": "[SB6_100]",
                "spl": 111
              },
              {
                "preset": "[SB6_200]",
                "spl": 115
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
                "preset": "[SB6_60]",
                "spl": 110
              },
              {
                "preset": "[SB6_100]",
                "spl": 111
              },
              {
                "preset": "[SB6_200]",
                "spl": 115
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
                "preset": "[SB6_60]",
                "spl": 110
              },
              {
                "preset": "[SB6_100]",
                "spl": 111
              },
              {
                "preset": "[SB6_200]",
                "spl": 115
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
            "perCh": 1,
            "total": 12,
            "splByPreset": [
              {
                "preset": "[SB6_60]",
                "spl": 106
              },
              {
                "preset": "[SB6_100]",
                "spl": 106
              },
              {
                "preset": "[SB6_200]",
                "spl": 108
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(2/8), LA2Xi(SE1/4), LA4X(1/4), LA7.16(1/16)",
    "img": "public/assets/img/speakers/la/subwoofers/spk-la-sb6i.webp",
    "views": [
      {
        "label": "Front (Black)",
        "src": "public/assets/img/speakers/la/subwoofers/spk-la-sb6i.webp"
      },
      {
        "label": "Rear",
        "src": "public/assets/img/speakers/la/subwoofers/spk-la-sb6i-rear.webp"
      },
      {
        "label": "Front (White)",
        "src": "public/assets/img/speakers/la/subwoofers/spk-la-sb6i-white-front.webp"
      },
      {
        "label": "Install (In-Situ)",
        "src": "public/assets/img/speakers/la/subwoofers/spk-la-sb6i-insitu.webp"
      }
    ],
    "relations": {
      "ampIds": []
    },
    "watt": 85,
    // [upload/SB6i_v1.4.md 마스터 스키마 반영] Preset Guide 신규 반영.
    // Mechanical Safety는 SB6i 자신의 원본에 안전계수/구성별 표가 없어
    // 추가하지 않았다. X6i/X4i와의 조합 delay_defaults도 SB6i가 항상
    // 2차 엘리먼트라 각 라인소스 자신의 데이터에 이미 반영되어 있다.
    "presets": {
      "rows": [
        { "config": "SB6i standard configuration", "preset": "[SB6_60] / [SB6_100] / [SB6_200]", "acoustic": "29-107 / 29-150 / 32-300 Hz", "acousticShort": "29-107 / 29-150 / 32-300 Hz" }
      ],
      "source": "SB6i_OM_EN.pdf"
    }
  }
];
