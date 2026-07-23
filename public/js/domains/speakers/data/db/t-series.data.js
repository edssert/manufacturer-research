// d&b audiotechnik T 스피커 데이터 (3개 모델: T10, Ti10L, Ti10P).
// 필드 스키마 설명은 speakers.schema.js 참조.
// 파생 필드(wayCount / network / lowUnitConfig)는 로드 시 normalize 함수가 생성하므로 저장하지 않는다.
//
// 소스(마스터 스키마 v1.1, audio-spec-parsing-skill):
//   C:\Dev\audio-spec-parsing-skill\speakers\db\T10_v1.1.md / Ti10L_v1.1.md / Ti10P_v1.1.md
//   (사본: raw-data/raw-specs/db/speakers/t-series/)
//
// 내린 판단:
// - type: T10은 회전형 웨이브가이드로 라인어레이/포인트소스 겸용(원문 이중 Product_Type) —
//   주 용도인 "Line Array"로 분류하고 notes에 겸용 명시. Ti10L=Line source 버전(어레이 리깅 포함) →
//   "Line Array", Ti10P=Point source 버전(어레이 리깅 없음) → "Point". 셋 다 음향적으로 동일 설계.
// - spl 대표값: 각 제품 자신의 원문 헤드라인 조건 — T10/Ti10L 132dB(Line/Arc, 상위 앰프군),
//   Ti10P 130dB(PS setup, 상위 앰프군). 하위 앰프군(D6/10D) 조건 129/127dB는 미채택.
// - cov.h="105°,90°": 라인소스 105° / 포인트소스 90° 두 모드 병기(콤마 나열은 schema
//   parseAngleRange가 min~max로 해석). cov.v="35°"는 포인트소스 모드 전용 수직각.
// - Ti10P는 splayList 미기재: 원문 스펙표에 0-15° 값이 남아 있으나(공용 표 상속) 어레이 체이닝
//   리깅 자체가 없어 실사용 불가 — 스플레이 필터 오도 방지를 위해 제외(마스터 스키마 각주 근거).
// - amps.total = perCh(원문 "Cabinets per channel", 전 setup 공통 4) × 앰프 채널 수 —
//   cl-series.data.js와 동일 산법. 앰프 채널 수는 원문 md에 없어 d&b 공식 스펙 근거:
//   D80/D40/D20/30D/10D=4ch, D12/D6=2ch.
// - relations.ampIds=[]: 앱 앰프 데이터(amplifiers/data/db.data.js)에 실존하는 id는 amp-db-d90뿐인데,
//   D90은 T 시리즈 원문 호환 앰프 목록(T10: D80/D40/D12/D20/D6, Ti10: 30D/10D/D80/D20/D12/D6)에 없음.
// - throw/img=null: 원문에 스로우 거리 없음, 이미지 미확보. ip=null: 정식 IP 등급 수치 없음
//   (WR 옵션은 정성적 서술만). watt=200: RMS power handling overall(피크 10ms 800W는 미기재).
export const DB_T_SERIES = [
{
  "id": "spk-db-t10",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "T10",
  "series": "T Series",
  "throwCat": null,
  "type": "Line Array",
  "throw": null,
  "lowInch": 6.5,
  "lowQty": 2,
  "crossover": "2-way, passive",
  "crossoverTags": [
    "2-way",
    "passive"
  ],
  "spl": 132,
  "cov": {
    "h": "105°,90°",
    "v": "35°",
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
      14,
      15
    ]
  },
  "freqs": [
    {
      "db": "-5 dB",
      "lo": "68 Hz",
      "hi": "18 kHz"
    }
  ],
  "weight": 11,
  "transducers": "LF: 2 × 6.5″ · HF: 1 × 1.4″",
  "connectors": "2 x NLT4 F/M",
  "ip": null,
  "dims": "470 x 197 x 300 mm / 18.5 x 7.75 x 11.8 in",
  "amps": [
    {
      "model": "D80",
      "configs": [
        {
          "mode": "Line/Arc/PS",
          "perCh": 4,
          "total": 16
        }
      ]
    },
    {
      "model": "D40",
      "configs": [
        {
          "mode": "Line/Arc/PS",
          "perCh": 4,
          "total": 16
        }
      ]
    },
    {
      "model": "D12",
      "configs": [
        {
          "mode": "Line/Arc/PS",
          "perCh": 4,
          "total": 8
        }
      ]
    },
    {
      "model": "D20",
      "configs": [
        {
          "mode": "Line/Arc/PS",
          "perCh": 4,
          "total": 16
        }
      ]
    },
    {
      "model": "D6",
      "configs": [
        {
          "mode": "Line/Arc/PS",
          "perCh": 4,
          "total": 8
        }
      ]
    }
  ],
  "ampRaw": "D80(4/16), D40(4/16), D12(4/8), D20(4/16), D6(4/8)",
  "notes": "라인어레이/포인트소스 겸용 — 회전형 웨이브가이드+어쿠스틱 렌즈를 공구 없이 90° 전환 (라인소스 수평 105° / 포인트소스 90°×35°)",
  "img": null,
  "relations": {
    "ampIds": []
  },
  "watt": 200
},
{
  "id": "spk-db-ti10l",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "Ti10L",
  "series": "T Series",
  "throwCat": null,
  "type": "Line Array",
  "throw": null,
  "lowInch": 6.5,
  "lowQty": 2,
  "crossover": "2-way, passive",
  "crossoverTags": [
    "2-way",
    "passive"
  ],
  "spl": 132,
  "cov": {
    "h": "105°,90°",
    "v": "35°",
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
      14,
      15
    ]
  },
  "freqs": [
    {
      "db": "-5 dB",
      "lo": "68 Hz",
      "hi": "18 kHz"
    }
  ],
  "weight": 11,
  "transducers": "LF: 2 × 6.5″ · HF: 1 × 1.4″",
  "connectors": "2 x NL4 M",
  "ip": null,
  "dims": "470 x 197 x 300 mm / 18.5 x 7.75 x 11.8 in",
  "amps": [
    {
      "model": "30D",
      "configs": [
        {
          "mode": "Line/Arc",
          "perCh": 4,
          "total": 16
        }
      ]
    },
    {
      "model": "10D",
      "configs": [
        {
          "mode": "Line/Arc",
          "perCh": 4,
          "total": 16
        }
      ]
    },
    {
      "model": "D80",
      "configs": [
        {
          "mode": "Line/Arc",
          "perCh": 4,
          "total": 16
        }
      ]
    },
    {
      "model": "D20",
      "configs": [
        {
          "mode": "Line/Arc",
          "perCh": 4,
          "total": 16
        }
      ]
    },
    {
      "model": "D12",
      "configs": [
        {
          "mode": "Line/Arc",
          "perCh": 4,
          "total": 8
        }
      ]
    },
    {
      "model": "D6",
      "configs": [
        {
          "mode": "Line/Arc",
          "perCh": 4,
          "total": 8
        }
      ]
    }
  ],
  "ampRaw": "30D(4/16), 10D(4/16), D80(4/16), D20(4/16), D12(4/8), D6(4/8)",
  "notes": "T10의 설치용 라인소스 버전(음향 동일, NL4 M 커넥터, 훅·고정볼트식 어레이 리깅 포함) — 스탠드얼론 사용 시 혼 회전으로 포인트소스(90°×35°) 지향도 가능",
  "img": null,
  "relations": {
    "ampIds": []
  },
  "watt": 200
},
{
  "id": "spk-db-ti10p",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "Ti10P",
  "series": "T Series",
  "throwCat": null,
  "type": "Point",
  "throw": null,
  "lowInch": 6.5,
  "lowQty": 2,
  "crossover": "2-way, passive",
  "crossoverTags": [
    "2-way",
    "passive"
  ],
  "spl": 130,
  "cov": {
    "h": "90°,105°",
    "v": "35°"
  },
  "freqs": [
    {
      "db": "-5 dB",
      "lo": "68 Hz",
      "hi": "18 kHz"
    }
  ],
  "weight": 10.5,
  "transducers": "LF: 2 × 6.5″ · HF: 1 × 1.4″",
  "connectors": "2 x NL4 M",
  "ip": null,
  "dims": "470 x 197 x 300 mm / 18.5 x 7.75 x 11.8 in",
  "amps": [
    {
      "model": "30D",
      "configs": [
        {
          "mode": "PS",
          "perCh": 4,
          "total": 16
        }
      ]
    },
    {
      "model": "10D",
      "configs": [
        {
          "mode": "PS",
          "perCh": 4,
          "total": 16
        }
      ]
    },
    {
      "model": "D80",
      "configs": [
        {
          "mode": "PS",
          "perCh": 4,
          "total": 16
        }
      ]
    },
    {
      "model": "D20",
      "configs": [
        {
          "mode": "PS",
          "perCh": 4,
          "total": 16
        }
      ]
    },
    {
      "model": "D12",
      "configs": [
        {
          "mode": "PS",
          "perCh": 4,
          "total": 8
        }
      ]
    },
    {
      "model": "D6",
      "configs": [
        {
          "mode": "PS",
          "perCh": 4,
          "total": 8
        }
      ]
    }
  ],
  "ampRaw": "30D(4/16), 10D(4/16), D80(4/16), D20(4/16), D12(4/8), D6(4/8)",
  "notes": "T10의 설치용 포인트소스 버전(음향 동일, NL4 M 커넥터, 어레이 리깅 없음 — 스탠드얼론 전용) — 혼 회전으로 라인소스(105°) 지향도 가능",
  "img": null,
  "relations": {
    "ampIds": []
  },
  "watt": 200
}
];
