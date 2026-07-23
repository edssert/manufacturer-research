// d&b audiotechnik SL 시리즈 설치형(install) 변형 6종 — KSLi8/12, XSLi8/12, XSLi8/12 SVS.
// 음향·드라이버·크로스오버·앰프 매칭은 투어링 원본(KSL/XSL)과 동일하며, 물리 스펙
// (중량·깊이·IP·리깅)만 상이하다(파싱 원문 근거). 각 레코드 notes에 차이를 요약.
// 원본을 프로그램적으로 클론 후 차이 필드만 오버라이드해 생성(전사 오류 방지).
// series 필드는 "SL Series" 유지 — UI에서 투어링판과 같은 그룹으로 정렬된다.
export const DB_SL_I_SERIES = [
  {
    "id": "spk-db-ksli8",
    "mfr": "d&b audiotechnik",
    "mk": "db",
    "name": "KSLi8",
    "series": "SL Series",
    "throwCat": null,
    "type": "Line Array",
    "throw": "Long throw >35m",
    "lowInch": 10,
    "lowQty": 2,
    "crossover": "3-way, active, passive",
    "crossoverTags": [
      "2ch active split",
      "passive (side LF+MF+HF)"
    ],
    "spl": 145,
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
        10
      ]
    },
    "freqs": [
      {
        "db": "-5 dB",
        "lo": "54 Hz",
        "hi": "18 kHz"
      }
    ],
    "weight": 57,
    "transducers": "LC: 2 × 8″ · LF: 2 × 10″ · MF: 1 × 8″ · HF: 2 × 1.4″",
    "connectors": "4-point speakON",
    "ip": null,
    "dims": "1000 x 330 x 572 mm / 39.4 x 13 x 22.5 in",
    "amps": [
      {
        "model": "D40",
        "configs": [
          {
            "mode": "AP",
            "perCh": 1,
            "total": 2
          },
          {
            "mode": "Line",
            "perCh": 2,
            "total": 4
          }
        ]
      },
      {
        "model": "D80",
        "configs": [
          {
            "mode": "AP",
            "perCh": 1,
            "total": 2
          },
          {
            "mode": "Line",
            "perCh": 2,
            "total": 4
          }
        ]
      },
      {
        "model": "D90",
        "configs": [
          {
            "mode": "AP",
            "perCh": 1,
            "total": 2
          },
          {
            "mode": "Line",
            "perCh": 2,
            "total": 4
          }
        ]
      }
    ],
    "ampRaw": "D40(AP1/2-Line2/4), D80(AP1/2-Line2/4), D90(AP1/2-Line2/4)",
    "img": null,
    "relations": {
      "ampIds": [
        "amp-db-d40",
        "amp-db-d80",
        "amp-db-d90"
      ]
    },
    "watt": 700,
    "notes": "KSL8의 설치(install) 버전 — 음향·드라이버·크로스오버·앰프 매칭은 KSL8과 동일. 차이: 고정 설치 전용 Mounting frame(투어링 Flying frame과 별개), 깊이 597→572mm, 중량 58→57kg, IP 등급 미표기(실내 설치 지향)."
  },
  {
    "id": "spk-db-ksli12",
    "mfr": "d&b audiotechnik",
    "mk": "db",
    "name": "KSLi12",
    "series": "SL Series",
    "throwCat": null,
    "type": "Line Array",
    "throw": "Long throw >35m",
    "lowInch": 10,
    "lowQty": 2,
    "crossover": "3-way, active, passive",
    "crossoverTags": [
      "2ch active split",
      "passive (side LF+MF+HF)"
    ],
    "spl": 144,
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
        10
      ]
    },
    "freqs": [
      {
        "db": "-5 dB",
        "lo": "54 Hz",
        "hi": "18 kHz"
      }
    ],
    "weight": 57,
    "transducers": "LC: 2 × 8″ · LF: 2 × 10″ · MF: 1 × 8″ · HF: 2 × 1.4″",
    "connectors": "4-point speakON",
    "ip": null,
    "dims": "1000 x 330 x 572 mm / 39.4 x 13 x 22.5 in",
    "amps": [
      {
        "model": "D40",
        "configs": [
          {
            "mode": "AP",
            "perCh": 1,
            "total": 2
          },
          {
            "mode": "Line",
            "perCh": 2,
            "total": 4
          }
        ]
      },
      {
        "model": "D80",
        "configs": [
          {
            "mode": "AP",
            "perCh": 1,
            "total": 2
          },
          {
            "mode": "Line",
            "perCh": 2,
            "total": 4
          }
        ]
      },
      {
        "model": "D90",
        "configs": [
          {
            "mode": "AP",
            "perCh": 1,
            "total": 2
          },
          {
            "mode": "Line",
            "perCh": 2,
            "total": 4
          }
        ]
      }
    ],
    "ampRaw": "D40(AP1/2-Line2/4), D80(AP1/2-Line2/4), D90(AP1/2-Line2/4)",
    "img": null,
    "relations": {
      "ampIds": [
        "amp-db-d40",
        "amp-db-d80",
        "amp-db-d90"
      ]
    },
    "watt": 700,
    "notes": "KSL12의 설치 버전 — 음향은 KSL12와 동일, 물리 스펙만 상이(KSLi8과 동일 패턴)."
  },
  {
    "id": "spk-db-xsli8",
    "mfr": "d&b audiotechnik",
    "mk": "db",
    "name": "XSLi8",
    "series": "SL Series",
    "throwCat": null,
    "type": "Line Array",
    "throw": "Long throw >35m",
    "lowInch": 8,
    "lowQty": 2,
    "crossover": "3-way, active, passive",
    "crossoverTags": [
      "2ch active split",
      "passive (side LF+MF+HF)"
    ],
    "spl": 141,
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
      }
    ],
    "weight": 39,
    "transducers": "LC: 2 × 6.5″ · LF: 2 × 8″ · MF: 1 × 6.5″ · HF: 2 × 1″",
    "connectors": "4-point speakON",
    "ip": null,
    "dims": "700 x 283 x 507 mm / 27.6 x 11.1 x 20 in",
    "amps": [
      {
        "model": "D40",
        "configs": [
          {
            "mode": "AP",
            "perCh": 1,
            "total": 2
          },
          {
            "mode": "Line",
            "perCh": 2,
            "total": 4
          }
        ]
      },
      {
        "model": "D80",
        "configs": [
          {
            "mode": "AP",
            "perCh": 1,
            "total": 2
          },
          {
            "mode": "Line",
            "perCh": 2,
            "total": 4
          }
        ]
      },
      {
        "model": "D90",
        "configs": [
          {
            "mode": "AP",
            "perCh": 1,
            "total": 2
          },
          {
            "mode": "Line",
            "perCh": 2,
            "total": 4
          }
        ]
      }
    ],
    "ampRaw": "D40(AP1/2-Line2/4), D80(AP1/2-Line2/4), D90(AP1/2-Line2/4)",
    "img": null,
    "relations": {
      "ampIds": [
        "amp-db-d40",
        "amp-db-d80",
        "amp-db-d90"
      ]
    },
    "watt": 700,
    "notes": "XSL8의 설치 버전 — 음향·드라이버·치수는 XSL8과 동일, IP 등급 미표기(설치 지향), 고정 설치 리깅."
  },
  {
    "id": "spk-db-xsli12",
    "mfr": "d&b audiotechnik",
    "mk": "db",
    "name": "XSLi12",
    "series": "SL Series",
    "throwCat": null,
    "type": "Line Array",
    "throw": "Long throw >35m",
    "lowInch": 8,
    "lowQty": 2,
    "crossover": "3-way, active, passive",
    "crossoverTags": [
      "2ch active split",
      "passive (side LF+MF+HF)"
    ],
    "spl": 140,
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
      }
    ],
    "weight": 39,
    "transducers": "LC: 2 × 6.5″ · LF: 2 × 8″ · MF: 1 × 6.5″ · HF: 2 × 1″",
    "connectors": "4-point speakON",
    "ip": null,
    "dims": "700 x 283 x 507 mm / 27.6 x 11.1 x 20 in",
    "amps": [
      {
        "model": "D40",
        "configs": [
          {
            "mode": "AP",
            "perCh": 1,
            "total": 2
          },
          {
            "mode": "Line",
            "perCh": 2,
            "total": 4
          }
        ]
      },
      {
        "model": "D80",
        "configs": [
          {
            "mode": "AP",
            "perCh": 1,
            "total": 2
          },
          {
            "mode": "Line",
            "perCh": 2,
            "total": 4
          }
        ]
      },
      {
        "model": "D90",
        "configs": [
          {
            "mode": "AP",
            "perCh": 1,
            "total": 2
          },
          {
            "mode": "Line",
            "perCh": 2,
            "total": 4
          }
        ]
      }
    ],
    "ampRaw": "D40(AP1/2-Line2/4), D80(AP1/2-Line2/4), D90(AP1/2-Line2/4)",
    "img": null,
    "relations": {
      "ampIds": [
        "amp-db-d40",
        "amp-db-d80",
        "amp-db-d90"
      ]
    },
    "watt": 700,
    "notes": "XSL12의 설치 버전 — XSLi8과 동일 패턴."
  },
  {
    "id": "spk-db-xsli8-svs",
    "mfr": "d&b audiotechnik",
    "mk": "db",
    "name": "XSLi8 SVS",
    "series": "SL Series",
    "throwCat": null,
    "type": "Line Array",
    "throw": "Long throw >35m",
    "lowInch": 8,
    "lowQty": 2,
    "crossover": "3-way, active, passive",
    "crossoverTags": [
      "2ch active split",
      "passive (side LF+MF+HF)"
    ],
    "spl": 141,
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
      }
    ],
    "weight": 37,
    "transducers": "LC: 2 × 6.5″ · LF: 2 × 8″ · MF: 1 × 6.5″ · HF: 2 × 1″",
    "connectors": "4-point speakON",
    "ip": "IP55",
    "dims": "700 x 280 x 503 mm / 27.6 x 11 x 19.8 in",
    "amps": [
      {
        "model": "D40",
        "configs": [
          {
            "mode": "AP",
            "perCh": 1,
            "total": 2
          },
          {
            "mode": "Line",
            "perCh": 2,
            "total": 4
          }
        ]
      },
      {
        "model": "D80",
        "configs": [
          {
            "mode": "AP",
            "perCh": 1,
            "total": 2
          },
          {
            "mode": "Line",
            "perCh": 2,
            "total": 4
          }
        ]
      },
      {
        "model": "D90",
        "configs": [
          {
            "mode": "AP",
            "perCh": 1,
            "total": 2
          },
          {
            "mode": "Line",
            "perCh": 2,
            "total": 4
          }
        ]
      }
    ],
    "ampRaw": "D40(AP1/2-Line2/4), D80(AP1/2-Line2/4), D90(AP1/2-Line2/4)",
    "img": null,
    "relations": {
      "ampIds": [
        "amp-db-d40",
        "amp-db-d80",
        "amp-db-d90"
      ]
    },
    "watt": 700,
    "notes": "XSL8 계열의 SVS(설치 특화) 버전 — 음향은 XSL8과 동일. 차이: 경량화(37kg)·소형화(280×503mm), IP55, 권장 앰프 40D(대안 D80/30D). 앰프 매칭은 앱 앰프 인벤토리 정합을 위해 XSL8 것을 승계."
  },
  {
    "id": "spk-db-xsli12-svs",
    "mfr": "d&b audiotechnik",
    "mk": "db",
    "name": "XSLi12 SVS",
    "series": "SL Series",
    "throwCat": null,
    "type": "Line Array",
    "throw": "Long throw >35m",
    "lowInch": 8,
    "lowQty": 2,
    "crossover": "3-way, active, passive",
    "crossoverTags": [
      "2ch active split",
      "passive (side LF+MF+HF)"
    ],
    "spl": 140,
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
      }
    ],
    "weight": 37,
    "transducers": "LC: 2 × 6.5″ · LF: 2 × 8″ · MF: 1 × 6.5″ · HF: 2 × 1″",
    "connectors": "4-point speakON",
    "ip": "IP55",
    "dims": "700 x 280 x 503 mm / 27.6 x 11 x 19.8 in",
    "amps": [
      {
        "model": "D40",
        "configs": [
          {
            "mode": "AP",
            "perCh": 1,
            "total": 2
          },
          {
            "mode": "Line",
            "perCh": 2,
            "total": 4
          }
        ]
      },
      {
        "model": "D80",
        "configs": [
          {
            "mode": "AP",
            "perCh": 1,
            "total": 2
          },
          {
            "mode": "Line",
            "perCh": 2,
            "total": 4
          }
        ]
      },
      {
        "model": "D90",
        "configs": [
          {
            "mode": "AP",
            "perCh": 1,
            "total": 2
          },
          {
            "mode": "Line",
            "perCh": 2,
            "total": 4
          }
        ]
      }
    ],
    "ampRaw": "D40(AP1/2-Line2/4), D80(AP1/2-Line2/4), D90(AP1/2-Line2/4)",
    "img": null,
    "relations": {
      "ampIds": [
        "amp-db-d40",
        "amp-db-d80",
        "amp-db-d90"
      ]
    },
    "watt": 700,
    "notes": "XSL12 계열의 SVS 버전 — XSLi8 SVS와 동일 패턴."
  }
];
