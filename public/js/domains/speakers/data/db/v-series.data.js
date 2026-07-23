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
  "watt": 500
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
  "watt": 500
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
  "watt": 500
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
  "watt": 500
}
];
