// d&b audiotechnik AL(A-Series) 스피커 데이터 (4개 모델: AL60/AL90 + 설치형 ALi60/ALi90).
// 필드 스키마 설명은 speakers.schema.js 참조.
// 파생 필드(wayCount / network / lowUnitConfig)는 로드 시 normalize 함수가 생성하므로 저장하지 않는다.
// 원본: audio-spec-parsing-skill 마스터 스키마 AL60/AL90/ALi60/ALi90 v1.0 md.
//
// [type 판단 근거] 마스터 스키마 Product_Category 는 "augmented array
// loudspeaker"(d&b 신규 마케팅 용어)이나 Product_Type 은 "Line array
// loudspeaker" 관례를 유지 — TYPE_ORDER(speakers.schema.js) 기존 어휘 중
// "Line Array" 가 가장 부합해 채택(신규 타입 어휘를 늘리지 않음).
// [series 표기] 마스터 스키마 Product_Series 는 "A-Series"이나, 앱 그룹명은
// 요청에 따라 "AL Series" 로 통일.
// [throw=null] 원본 md 에 투사거리 정보 없음 — 추정하지 않고 null.
// [amps configs.total=null] OM 은 채널당 캐비닛 수(PS/Out/In 셋업=2, AP
// 셋업=1)만 명시하고 앰프 1대당 총 대수는 원문에 없음 — 추정하지 않고 null.
// [ip=null] AL60/AL90: SPS 마케팅 불릿에만 "IP55" 언급, 정식 스펙 표에는
// 없어 마스터 스키마가 미확인 처리 — 그대로 null. ALi60/ALi90: AE 원문
// 자체에 IP 병합필드 오류([ERROR: Missing definition...])가 있어 미확인.
// [dims] 원본 md 는 mm 치수만 제공(인치 병기 없음) — mm 만 기재.
// [relations.ampIds] 권장 앰프(D20/D80/30D)가 현재 앰프 DB 에 없어 빈 배열
// (실존 id 만 기재하는 원칙 — 현재 앰프 DB 에는 amp-db-d90 만 존재).
export const DB_AL_SERIES = [
{
  "id": "spk-db-al60",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "AL60",
  "series": "AL Series",
  "throwCat": null,
  "type": "Line Array",
  "throw": null,
  "lowInch": 10,
  "lowQty": 2,
  "crossover": "2-way, passive",
  "crossoverTags": [
    "2-way",
    "passive"
  ],
  "spl": 139,
  "cov": {
    "h": "60°",
    "splayList": [
      20,
      25,
      30,
      35,
      40
    ]
  },
  "freqs": [
    {
      "db": "-5 dB",
      "lo": "60 Hz",
      "hi": "18 kHz"
    }
  ],
  "weight": 23,
  "transducers": "LF: 2 × 10″ · HF: 1 × 1.4″",
  "connectors": "NLT4 F/M (opt. 2 × NL4 M)",
  "ip": null,
  "dims": "700 x 322 x 356 mm",
  "amps": [
    {
      "model": "D20",
      "configs": [
        {
          "mode": "PS/Out/In",
          "perCh": 2,
          "total": null
        },
        {
          "mode": "AP",
          "perCh": 1,
          "total": null
        }
      ]
    },
    {
      "model": "D80",
      "configs": [
        {
          "mode": "PS/Out/In",
          "perCh": 2,
          "total": null
        },
        {
          "mode": "AP",
          "perCh": 1,
          "total": null
        }
      ]
    },
    {
      "model": "30D",
      "configs": [
        {
          "mode": "PS/Out/In",
          "perCh": 2,
          "total": null
        },
        {
          "mode": "AP",
          "perCh": 1,
          "total": null
        }
      ]
    }
  ],
  "ampRaw": "D20 (recommended), D80, 30D — PS/Out/In 2/ch, AP 1/ch",
  "img": null,
  "relations": {
    "ampIds": []
  },
  "watt": 400,
  "mechanicalSafety": {
    "flownRows": [
      {
        "config": "flown",
        "accessory": "Z5455 AL Flying frame",
        "safeLimit": null,
        "maxLimit": "4"
      },
      {
        "config": "horizontal cluster",
        "accessory": "Z5456 AL Flying adapter",
        "safeLimit": null,
        "maxLimit": "4"
      }
    ],
    "stackedRows": [
      {
        "config": "ground-stacked",
        "accessory": "Z5458 AL Base plate",
        "safeLimit": null,
        "maxLimit": "3"
      }
    ],
    "safetyFactor": null,
    "maxWindLoad": null,
    "notes": [
      {
        "text": "up to four loudspeakers flown via Z5455 AL Flying frame; horizontal cluster of up to four via Z5456 AL Flying adapter; stacked maximum three via Z5458 AL Base plate (Z5458은 d&b 서브우퍼 V-SUB/V-GSUB 위에도 배치 가능)."
      },
      {
        "text": "이 제품 OM에는 K1/KS28류의 전용 Mechanical safety 챕터(safe limit/maximum limit 이원 구조·2006/42/EC 안전계수)가 없어 safe limit·safety factor·max wind load 모두 null."
      }
    ],
    "source": "SPS; OM p.5 A-Series rigging components"
  },
  "presets": null,
  "cardioidCapability": "No"
},
{
  "id": "spk-db-al90",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "AL90",
  "series": "AL Series",
  "throwCat": null,
  "type": "Line Array",
  "throw": null,
  "lowInch": 10,
  "lowQty": 2,
  "crossover": "2-way, passive",
  "crossoverTags": [
    "2-way",
    "passive"
  ],
  "spl": 139,
  "cov": {
    "h": "90°",
    "splayList": [
      20,
      25,
      30,
      35,
      40
    ]
  },
  "freqs": [
    {
      "db": "-5 dB",
      "lo": "60 Hz",
      "hi": "18 kHz"
    }
  ],
  "weight": 23,
  "transducers": "LF: 2 × 10″ · HF: 1 × 1.4″",
  "connectors": "NLT4 F/M (opt. 2 × NL4 M)",
  "ip": null,
  "dims": "700 x 322 x 356 mm",
  "amps": [
    {
      "model": "D20",
      "configs": [
        {
          "mode": "PS/Out/In",
          "perCh": 2,
          "total": null
        },
        {
          "mode": "AP",
          "perCh": 1,
          "total": null
        }
      ]
    },
    {
      "model": "D80",
      "configs": [
        {
          "mode": "PS/Out/In",
          "perCh": 2,
          "total": null
        },
        {
          "mode": "AP",
          "perCh": 1,
          "total": null
        }
      ]
    },
    {
      "model": "30D",
      "configs": [
        {
          "mode": "PS/Out/In",
          "perCh": 2,
          "total": null
        },
        {
          "mode": "AP",
          "perCh": 1,
          "total": null
        }
      ]
    }
  ],
  "ampRaw": "D20 (recommended), D80, 30D — PS/Out/In 2/ch, AP 1/ch",
  "img": null,
  "relations": {
    "ampIds": []
  },
  "watt": 400,
  "mechanicalSafety": {
    "flownRows": [
      {
        "config": "flown",
        "accessory": "Z5455 AL Flying frame",
        "safeLimit": null,
        "maxLimit": "4"
      },
      {
        "config": "horizontal cluster",
        "accessory": "Z5456 AL Flying adapter",
        "safeLimit": null,
        "maxLimit": "4"
      }
    ],
    "stackedRows": [
      {
        "config": "ground-stacked",
        "accessory": "Z5458 AL Base plate",
        "safeLimit": null,
        "maxLimit": "3"
      }
    ],
    "safetyFactor": null,
    "maxWindLoad": null,
    "notes": [
      {
        "text": "up to four loudspeakers flown via Z5455 AL Flying frame; horizontal cluster of up to four via Z5456 AL Flying adapter; stacked maximum three via Z5458 AL Base plate (Z5458은 d&b 서브우퍼 V-SUB/V-GSUB 위에도 배치 가능)."
      },
      {
        "text": "이 제품 OM에는 K1/KS28류의 전용 Mechanical safety 챕터(safe limit/maximum limit 이원 구조·2006/42/EC 안전계수)가 없어 safe limit·safety factor·max wind load 모두 null."
      }
    ],
    "source": "SPS; OM p.5 A-Series rigging components"
  },
  "presets": null,
  "cardioidCapability": "No"
},
{
  "id": "spk-db-ali60",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "ALi60",
  "series": "AL Series",
  "throwCat": null,
  "type": "Line Array",
  "throw": null,
  "lowInch": 10,
  "lowQty": 2,
  "crossover": "2-way, passive",
  "crossoverTags": [
    "2-way",
    "passive"
  ],
  "spl": 139,
  "cov": {
    "h": "60°",
    "splayList": [
      20,
      25,
      30,
      35,
      40
    ]
  },
  "freqs": [
    {
      "db": "-5 dB",
      "lo": "60 Hz",
      "hi": "18 kHz"
    }
  ],
  "weight": 23,
  "transducers": "LF: 2 × 10″ · HF: 1 × 1.4″",
  "connectors": "4-pole Phoenix (DFK PC 4/4 GF)",
  "ip": null,
  "dims": "700 x 322 x 356 mm",
  "amps": [
    {
      "model": "30D",
      "configs": [
        {
          "mode": "PS/Out/In",
          "perCh": 2,
          "total": null
        },
        {
          "mode": "AP",
          "perCh": 1,
          "total": null
        }
      ]
    },
    {
      "model": "D20",
      "configs": [
        {
          "mode": "PS/Out/In",
          "perCh": 2,
          "total": null
        },
        {
          "mode": "AP",
          "perCh": 1,
          "total": null
        }
      ]
    },
    {
      "model": "D80",
      "configs": [
        {
          "mode": "PS/Out/In",
          "perCh": 2,
          "total": null
        },
        {
          "mode": "AP",
          "perCh": 1,
          "total": null
        }
      ]
    }
  ],
  "ampRaw": "30D (recommended), D20, D80 (SPS 기준; OM 표는 30D/40D) — PS/Out/In 2/ch, AP 1/ch",
  "img": null,
  "relations": {
    "ampIds": []
  },
  "watt": 400,
  "mechanicalSafety": {
    "flownRows": [
      {
        "config": "flown",
        "accessory": "Z5455 AL Flying frame",
        "safeLimit": null,
        "maxLimit": "4"
      },
      {
        "config": "horizontal cluster",
        "accessory": "Z5456 AL Flying adapter",
        "safeLimit": null,
        "maxLimit": "4"
      }
    ],
    "stackedRows": [
      {
        "config": "ground-stacked",
        "accessory": "Z5458 AL Base plate",
        "safeLimit": null,
        "maxLimit": "3"
      }
    ],
    "safetyFactor": null,
    "maxWindLoad": null,
    "notes": [
      {
        "text": "flown up to four via Z5455 AL Flying frame; horizontal cluster of up to four via Z5456 AL Flying adapter; stacked maximum three via Z5458 AL Base plate — 베이스플레이트는 Vi-SUB/Vi-GSUB(설치용 서브우퍼) 위에도 배치 가능(원문 계열명 그대로 보존)."
      },
      {
        "text": "전용 Mechanical safety 챕터 부재로 safe limit·safety factor·max wind load 모두 null."
      }
    ],
    "source": "OM p.5 A-Series rigging components"
  },
  "presets": null,
  "cardioidCapability": "No",
  "notes": "AL60 설치형 — 음향/캐비닛 동일. 차이: 커넥터가 NLT4 아닌 4극 Phoenix 전용, 핸들 서술 없음, 기본 마감 impact resistant black paint(방수 PCP 는 WR 옵션), EN54-24/ISO 7240-24 인증(WR/SWR/SVS 변형). 권장 앰프 30D(SPS), OM 표는 30D/40D 로 상충."
},
{
  "id": "spk-db-ali90",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "ALi90",
  "series": "AL Series",
  "throwCat": null,
  "type": "Line Array",
  "throw": null,
  "lowInch": 10,
  "lowQty": 2,
  "crossover": "2-way, passive",
  "crossoverTags": [
    "2-way",
    "passive"
  ],
  "spl": 139,
  "cov": {
    "h": "90°",
    "splayList": [
      20,
      25,
      30,
      35,
      40
    ]
  },
  "freqs": [
    {
      "db": "-5 dB",
      "lo": "60 Hz",
      "hi": "18 kHz"
    }
  ],
  "weight": 23,
  "transducers": "LF: 2 × 10″ · HF: 1 × 1.4″",
  "connectors": "4-pole Phoenix (DFK PC 4/4 GF)",
  "ip": null,
  "dims": "700 x 322 x 356 mm",
  "amps": [
    {
      "model": "30D",
      "configs": [
        {
          "mode": "PS/Out/In",
          "perCh": 2,
          "total": null
        },
        {
          "mode": "AP",
          "perCh": 1,
          "total": null
        }
      ]
    },
    {
      "model": "D20",
      "configs": [
        {
          "mode": "PS/Out/In",
          "perCh": 2,
          "total": null
        },
        {
          "mode": "AP",
          "perCh": 1,
          "total": null
        }
      ]
    },
    {
      "model": "D80",
      "configs": [
        {
          "mode": "PS/Out/In",
          "perCh": 2,
          "total": null
        },
        {
          "mode": "AP",
          "perCh": 1,
          "total": null
        }
      ]
    }
  ],
  "ampRaw": "30D (recommended), D20, D80 (SPS 기준; OM 표는 30D/40D) — PS/Out/In 2/ch, AP 1/ch",
  "img": null,
  "relations": {
    "ampIds": []
  },
  "watt": 400,
  "mechanicalSafety": {
    "flownRows": [
      {
        "config": "flown",
        "accessory": "Z5455 AL Flying frame",
        "safeLimit": null,
        "maxLimit": "4"
      },
      {
        "config": "horizontal cluster",
        "accessory": "Z5456 AL Flying adapter",
        "safeLimit": null,
        "maxLimit": "4"
      }
    ],
    "stackedRows": [
      {
        "config": "ground-stacked",
        "accessory": "Z5458 AL Base plate",
        "safeLimit": null,
        "maxLimit": "3"
      }
    ],
    "safetyFactor": null,
    "maxWindLoad": null,
    "notes": [
      {
        "text": "flown up to four via Z5455 AL Flying frame; horizontal cluster of up to four via Z5456 AL Flying adapter; stacked maximum three via Z5458 AL Base plate — 베이스플레이트는 Vi-SUB/Vi-GSUB(설치용 서브우퍼) 위에도 배치 가능(원문 계열명 그대로 보존)."
      },
      {
        "text": "전용 Mechanical safety 챕터 부재로 safe limit·safety factor·max wind load 모두 null."
      }
    ],
    "source": "OM p.5 A-Series rigging components"
  },
  "presets": null,
  "cardioidCapability": "No",
  "notes": "AL90 설치형 — 음향/캐비닛 동일(무게 23 kg 은 SPS/OM 일치값 채택, AE 원문은 22/20 kg 중복 오류). 차이: 4극 Phoenix 전용 커넥터, 핸들 서술 없음, 기본 마감 black paint(PCP 는 WR 옵션), EN54-24 인증. 권장 앰프 30D(SPS), OM 표는 30D/40D 로 상충."
}
];
