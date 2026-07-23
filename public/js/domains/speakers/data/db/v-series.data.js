// d&b audiotechnik V 스피커 데이터 (4개 모델: V8, V12, Vi8, Vi12).
// 필드 스키마 설명은 speakers.schema.js 참조.
// 파생 필드(wayCount / network / lowUnitConfig)는 로드 시 normalize 함수가 생성하므로 저장하지 않는다.
//
// 소스(마스터 스키마 v1.1, audio-spec-parsing-skill):
//   C:\Dev\audio-spec-parsing-skill\speakers\db\V8_v1.1.md / V12_v1.1.md / Vi8_v1.1.md / Vi12_v1.1.md
//   (사본: raw-data/raw-specs/db/speakers/v-series/)
//
// 내린 판단:
// - spl=142: 원문 "Max. sound pressure (1m, free field)" 상위 앰프군 조건 채택
//   (V8/V12: with D80/D40 142dB, D20/D12 조건은 139dB · Vi8/Vi12: with 40D 142dB, 30D 조건은 139dB).
// - amps.total = perCh(원문 "Cabinets per channel") × 앰프 채널 수 — cl-series.data.js와 동일 산법.
//   앰프 채널 수는 원문 md에 없어 d&b 공식 스펙 근거: D80/D40/D20/40D/30D=4ch, D12=2ch.
// - relations.ampIds=[]: 앱 앰프 데이터(amplifiers/data/db.data.js)에 실존하는 id는 amp-db-d90뿐인데,
//   D90은 V/Vi 원문 호환 앰프 목록(V: D80/D40/D20/D12, Vi: 40D/30D)에 없음 — 실존+호환 교집합이 공집합.
// - crossover="3-way, passive": 단일 앰프 채널 완전 패시브(내장 패시브 크로스오버로 LF+MF+HF 결합) —
//   SL 시리즈의 "active, passive" 하이브리드와 다름.
// - dims 깊이 460mm: AE 원문의 406mm는 자체 인치값(18")과 환산 불일치하는 오기로 판단,
//   OM 도면의 460mm(18")를 채택 — 마스터 스키마 v1.1의 판단 승계.
// - throw/ip/img=null: 원문에 스로우 거리·IP 등급 없음, 이미지 미확보. freqs는 원문에 있는 -5dB 기준만
//   (CUT 모드 응답 100Hz-18kHz는 컨트롤러 설정값이라 미기재).
// - watt=500: RMS power handling overall (피크 10ms 2000W는 미기재 — sl/cl 파일의 watt와 동일 성격 유지).
export const DB_V_SERIES = [
{
  "id": "spk-db-v8",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "V8",
  "series": "V Series",
  "throwCat": null,
  "type": "Line Array",
  "throw": null,
  "lowInch": 10,
  "lowQty": 2,
  "crossover": "3-way, passive",
  "crossoverTags": [
    "3-way",
    "passive"
  ],
  "spl": 142,
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
      "lo": "67 Hz",
      "hi": "18 kHz"
    }
  ],
  "weight": 34,
  "transducers": "LF: 2 × 10″ · MF: 1 × 8″ · HF: 2 × 1.4″",
  "connectors": "2 x NLT4 F/M",
  "ip": null,
  "dims": "700 x 310 x 460 mm / 27.5 x 12.2 x 18 in",
  "amps": [
    {
      "model": "D80",
      "configs": [
        {
          "mode": "ArrayProcessing",
          "perCh": 1,
          "total": 4
        },
        {
          "mode": "Line/Arc",
          "perCh": 2,
          "total": 8
        }
      ]
    },
    {
      "model": "D40",
      "configs": [
        {
          "mode": "ArrayProcessing",
          "perCh": 1,
          "total": 4
        },
        {
          "mode": "Line/Arc",
          "perCh": 2,
          "total": 8
        }
      ]
    },
    {
      "model": "D20",
      "configs": [
        {
          "mode": "ArrayProcessing",
          "perCh": 1,
          "total": 4
        },
        {
          "mode": "Line/Arc",
          "perCh": 2,
          "total": 8
        }
      ]
    },
    {
      "model": "D12",
      "configs": [
        {
          "mode": "ArrayProcessing",
          "perCh": 1,
          "total": 2
        },
        {
          "mode": "Line/Arc",
          "perCh": 2,
          "total": 4
        }
      ]
    }
  ],
  "ampRaw": "D80(AP1/4-Line2/8), D40(AP1/4-Line2/8), D20(AP1/4-Line2/8), D12(AP1/2-Line2/4)",
  "img": null,
  "relations": {
    "ampIds": []
  },
  "watt": 500,
  "mechanicalSafety": {
    "flownRows": [
      {
        "config": "flown (V8/V12 array, no ArrayCalc check required, any splay config)",
        "accessory": "Z5380 V Flying frame",
        "safeLimit": "10 V8/V12 cabinets (340 kg / 750 lb total system weight)",
        "maxLimit": null
      },
      {
        "config": "flown (V8/V12 array, general — ArrayCalc load verification required)",
        "accessory": "Z5380 V Flying frame",
        "safeLimit": null,
        "maxLimit": "24 V-TOP cabinets (Z5380 frame SWL 860 kg / 1896 lb)"
      }
    ],
    "stackedRows": null,
    "safetyFactor": null,
    "maxWindLoad": "6 Beaufort(비행 비권장 상한); 8 Beaufort 초과 시 반드시 하강·고정",
    "notes": [
      {
        "text": "Safe limit=배치 변수와 무관하게 항상 충족하는 최대 캐비닛 수, Maximum limit=ArrayCalc 하중 검증을 전제로 도달 가능한 최대 수(Z5380 프레임 SWL 860 kg / 1896 lb 기준)."
      },
      {
        "text": "그라운드스택 구성은 OM/Rigging manual에 존재하나 원문 세부 페이지 미열람으로 대수 상한 미확인 — 이 표에는 플라잉 구성만 반영. Safety factor는 매뉴얼에 명시 비율 수치 없어 null."
      }
    ],
    "source": "V-Series Rigging manual v1.12 (Chapter 1.3 Load capacity/System safety p.4, Chapter 1.3.1 Wind loads p.4); OM Chapter 2.1 p.6"
  },
  "presets": null,
  "cardioidCapability": "No"
},
{
  "id": "spk-db-v12",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "V12",
  "series": "V Series",
  "throwCat": null,
  "type": "Line Array",
  "throw": null,
  "lowInch": 10,
  "lowQty": 2,
  "crossover": "3-way, passive",
  "crossoverTags": [
    "3-way",
    "passive"
  ],
  "spl": 142,
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
      "lo": "67 Hz",
      "hi": "18 kHz"
    }
  ],
  "weight": 34,
  "transducers": "LF: 2 × 10″ · MF: 1 × 8″ · HF: 2 × 1.4″",
  "connectors": "2 x NLT4 F/M",
  "ip": null,
  "dims": "700 x 310 x 460 mm / 27.5 x 12.2 x 18 in",
  "amps": [
    {
      "model": "D80",
      "configs": [
        {
          "mode": "ArrayProcessing",
          "perCh": 1,
          "total": 4
        },
        {
          "mode": "Line/Arc",
          "perCh": 2,
          "total": 8
        }
      ]
    },
    {
      "model": "D40",
      "configs": [
        {
          "mode": "ArrayProcessing",
          "perCh": 1,
          "total": 4
        },
        {
          "mode": "Line/Arc",
          "perCh": 2,
          "total": 8
        }
      ]
    },
    {
      "model": "D20",
      "configs": [
        {
          "mode": "ArrayProcessing",
          "perCh": 1,
          "total": 4
        },
        {
          "mode": "Line/Arc",
          "perCh": 2,
          "total": 8
        }
      ]
    },
    {
      "model": "D12",
      "configs": [
        {
          "mode": "ArrayProcessing",
          "perCh": 1,
          "total": 2
        },
        {
          "mode": "Line/Arc",
          "perCh": 2,
          "total": 4
        }
      ]
    }
  ],
  "ampRaw": "D80(AP1/4-Line2/8), D40(AP1/4-Line2/8), D20(AP1/4-Line2/8), D12(AP1/2-Line2/4)",
  "img": null,
  "relations": {
    "ampIds": []
  },
  "watt": 500,
  "mechanicalSafety": {
    "flownRows": [
      {
        "config": "flown (V8/V12 array, no ArrayCalc check required, any splay config)",
        "accessory": "Z5380 V Flying frame",
        "safeLimit": "10 V8/V12 cabinets (340 kg / 750 lb total system weight)",
        "maxLimit": null
      },
      {
        "config": "flown (V8/V12 array, general — ArrayCalc load verification required)",
        "accessory": "Z5380 V Flying frame",
        "safeLimit": null,
        "maxLimit": "24 V-TOP cabinets (Z5380 frame SWL 860 kg / 1896 lb)"
      }
    ],
    "stackedRows": null,
    "safetyFactor": null,
    "maxWindLoad": "6 Beaufort(비행 비권장 상한); 8 Beaufort 초과 시 반드시 하강·고정",
    "notes": [
      {
        "text": "Safe limit=배치 변수와 무관하게 항상 충족하는 최대 캐비닛 수, Maximum limit=ArrayCalc 하중 검증을 전제로 도달 가능한 최대 수(Z5380 프레임 SWL 860 kg / 1896 lb 기준)."
      },
      {
        "text": "그라운드스택 구성은 OM/Rigging manual에 존재하나 원문 세부 페이지 미열람으로 대수 상한 미확인 — 이 표에는 플라잉 구성만 반영. Safety factor는 매뉴얼에 명시 비율 수치 없어 null."
      }
    ],
    "source": "V-Series Rigging manual v1.12 (Chapter 1.3 Load capacity/System safety p.4, Chapter 1.3.1 Wind loads p.4); OM Chapter 2.1 p.6"
  },
  "presets": null,
  "cardioidCapability": "No"
},
{
  "id": "spk-db-vi8",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "Vi8",
  "series": "V Series",
  "throwCat": null,
  "type": "Line Array",
  "throw": null,
  "lowInch": 10,
  "lowQty": 2,
  "crossover": "3-way, passive",
  "crossoverTags": [
    "3-way",
    "passive"
  ],
  "spl": 142,
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
      "lo": "67 Hz",
      "hi": "18 kHz"
    }
  ],
  "weight": 34,
  "transducers": "LF: 2 × 10″ · MF: 1 × 8″ · HF: 2 × 1.4″",
  "connectors": "2 x NL4 M",
  "ip": null,
  "dims": "700 x 310 x 460 mm / 27.5 x 12.2 x 18 in",
  "amps": [
    {
      "model": "40D",
      "configs": [
        {
          "mode": "Line/Arc",
          "perCh": 2,
          "total": 8
        }
      ]
    },
    {
      "model": "30D",
      "configs": [
        {
          "mode": "Line/Arc",
          "perCh": 2,
          "total": 8
        }
      ]
    }
  ],
  "ampRaw": "40D(2/8), 30D(2/8)",
  "notes": "V8의 설치용(installation) 버전 — 음향 스펙 동일, NL4 M 커넥터·후면 그립만(측면 손잡이 없음)·전용 Vi Mounting frame 사용",
  "img": null,
  "relations": {
    "ampIds": []
  },
  "watt": 500,
  "mechanicalSafety": {
    "flownRows": [
      {
        "config": "flown (small array)",
        "accessory": "Z5387.000 Vi Mounting frame top",
        "safeLimit": null,
        "maxLimit": "4 Vi-TOP cabinets (141 kg / 311 lb SWL)"
      },
      {
        "config": "flown (larger array, exceeds Vi Mounting frame capacity, no ArrayCalc check required, any splay config)",
        "accessory": "Z5380 V Flying frame (shared with V8/V12)",
        "safeLimit": "10 Vi8/Vi12 cabinets (340 kg / 750 lb total system weight)",
        "maxLimit": null
      },
      {
        "config": "flown (larger array, general — ArrayCalc verification required)",
        "accessory": "Z5380 V Flying frame (shared with V8/V12)",
        "safeLimit": null,
        "maxLimit": "24 Vi-TOP cabinets (Z5380 frame SWL 860 kg / 1896 lb)"
      }
    ],
    "stackedRows": null,
    "safetyFactor": null,
    "maxWindLoad": null,
    "notes": [
      {
        "text": "대형 어레이가 Vi Mounting frame 용량을 초과하면 Z5380 V Flying frame(V8/V12 공용)을 사용해야 하며 그 상한 수치가 Vi8/Vi12에도 그대로 적용됨이 원문에 명시됨."
      },
      {
        "text": "Max wind load: Vi Rigging manual은 정성적 경고만 있고 6/8 Beaufort 구체 수치 기준 없음 — null. Safety factor: 명시 비율 수치 없음 — null."
      }
    ],
    "source": "Vi Rigging manual v1.4 (Chapter 1.3 Load capacity/System safety p.4, Chapter 2.1 Mounting and flying frames p.7-9); OM Chapter 2.1 p.5"
  },
  "presets": null,
  "cardioidCapability": "No"
},
{
  "id": "spk-db-vi12",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "Vi12",
  "series": "V Series",
  "throwCat": null,
  "type": "Line Array",
  "throw": null,
  "lowInch": 10,
  "lowQty": 2,
  "crossover": "3-way, passive",
  "crossoverTags": [
    "3-way",
    "passive"
  ],
  "spl": 142,
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
      "lo": "67 Hz",
      "hi": "18 kHz"
    }
  ],
  "weight": 34,
  "transducers": "LF: 2 × 10″ · MF: 1 × 8″ · HF: 2 × 1.4″",
  "connectors": "2 x NL4 M",
  "ip": null,
  "dims": "700 x 310 x 460 mm / 27.5 x 12.2 x 18 in",
  "amps": [
    {
      "model": "40D",
      "configs": [
        {
          "mode": "Line/Arc",
          "perCh": 2,
          "total": 8
        }
      ]
    },
    {
      "model": "30D",
      "configs": [
        {
          "mode": "Line/Arc",
          "perCh": 2,
          "total": 8
        }
      ]
    }
  ],
  "ampRaw": "40D(2/8), 30D(2/8)",
  "notes": "V12의 설치용(installation) 버전 — 음향 스펙 동일, NL4 M 커넥터·후면 그립만(측면 손잡이 없음)·전용 Vi Mounting frame 사용",
  "img": null,
  "relations": {
    "ampIds": []
  },
  "watt": 500,
  "mechanicalSafety": {
    "flownRows": [
      {
        "config": "flown (small array)",
        "accessory": "Z5387.000 Vi Mounting frame top",
        "safeLimit": null,
        "maxLimit": "4 Vi-TOP cabinets (141 kg / 311 lb SWL)"
      },
      {
        "config": "flown (larger array, exceeds Vi Mounting frame capacity, no ArrayCalc check required, any splay config)",
        "accessory": "Z5380 V Flying frame (shared with V8/V12)",
        "safeLimit": "10 Vi8/Vi12 cabinets (340 kg / 750 lb total system weight)",
        "maxLimit": null
      },
      {
        "config": "flown (larger array, general — ArrayCalc verification required)",
        "accessory": "Z5380 V Flying frame (shared with V8/V12)",
        "safeLimit": null,
        "maxLimit": "24 Vi-TOP cabinets (Z5380 frame SWL 860 kg / 1896 lb)"
      }
    ],
    "stackedRows": null,
    "safetyFactor": null,
    "maxWindLoad": null,
    "notes": [
      {
        "text": "대형 어레이가 Vi Mounting frame 용량을 초과하면 Z5380 V Flying frame(V8/V12 공용)을 사용해야 하며 그 상한 수치가 Vi8/Vi12에도 그대로 적용됨이 원문에 명시됨."
      },
      {
        "text": "Max wind load: Vi Rigging manual은 정성적 경고만 있고 6/8 Beaufort 구체 수치 기준 없음 — null. Safety factor: 명시 비율 수치 없음 — null."
      }
    ],
    "source": "Vi Rigging manual v1.4 (Chapter 1.3 Load capacity/System safety p.4, Chapter 2.1 Mounting and flying frames p.7-9); OM Chapter 2.1 p.5"
  },
  "presets": null,
  "cardioidCapability": "No"
}
];
