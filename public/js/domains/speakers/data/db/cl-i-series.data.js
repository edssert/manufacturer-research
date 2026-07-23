// d&b audiotechnik CL 시리즈 설치형(install) 변형 2종 — CCLi8, CCLi12.
// 음향·드라이버는 투어링 원본(CCL8/12)과 동일, 물리 스펙만 상이(파싱 원문 근거).
// series 필드는 "CL Series" 유지.
export const DB_CL_I_SERIES = [
  {
    "id": "spk-db-ccli8",
    "mfr": "d&b audiotechnik",
    "mk": "db",
    "name": "CCLi8",
    "series": "CL Series",
    "throwCat": null,
    "type": "Line Array",
    "throw": null,
    "lowInch": 7,
    "lowQty": 2,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 137,
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
      },
      {
        "db": "-10 dB",
        "lo": "55 Hz",
        "hi": "20 kHz"
      }
    ],
    "weight": 18.1,
    "transducers": "LC: 2 × 5″ · LF: 2 × 7″ · HF: 2 × 1.75″",
    "connectors": "NLT4 F/M (NL4)",
    "ip": null,
    "dims": "593 x 209 x 355 mm / 23.3 x 8.2 x 14 in",
    "amps": [
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
        "model": "D90",
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
        "model": "40D",
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
      }
    ],
    "ampRaw": null,
    "img": null,
    "relations": {
      "ampIds": [
        "amp-db-40d",
        "amp-db-d40",
        "amp-db-d80",
        "amp-db-d90"
      ]
    },
    "watt": 400,
    "notes": "CCL8의 설치 버전 — 음향·드라이버는 CCL8과 동일, 중량 17.6→18.1kg, 고정 설치 리깅, 권장 앰프 25D/40D."
  },
  {
    "id": "spk-db-ccli12",
    "mfr": "d&b audiotechnik",
    "mk": "db",
    "name": "CCLi12",
    "series": "CL Series",
    "throwCat": null,
    "type": "Line Array",
    "throw": null,
    "lowInch": 7,
    "lowQty": 2,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 136,
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
        "lo": "60 Hz",
        "hi": "18 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "55 Hz",
        "hi": "18 kHz"
      }
    ],
    "weight": 18.1,
    "transducers": "LC: 2 × 5″ · LF: 2 × 7″ · HF: 2 × 1.75″",
    "connectors": "NLT4 F/M (NL4)",
    "ip": null,
    "dims": "593 x 209 x 355 mm / 23.3 x 8.2 x 14 in",
    "amps": [
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
        "model": "D90",
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
        "model": "40D",
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
      }
    ],
    "ampRaw": null,
    "img": null,
    "relations": {
      "ampIds": [
        "amp-db-40d",
        "amp-db-d40",
        "amp-db-d80",
        "amp-db-d90"
      ]
    },
    "watt": 400,
    "notes": "CCL12의 설치 버전 — CCLi8과 동일 패턴."
  }
];
