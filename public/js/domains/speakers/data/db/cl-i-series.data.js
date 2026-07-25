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
    "img": "public/assets/img/speakers/db/cl/spk-db-ccli8.png",
    "relations": {
      "ampIds": [
        "amp-db-40d",
        "amp-db-d40",
        "amp-db-d80",
        "amp-db-d90"
      ]
    },
    "watt": 400,
    "notes": "CCL8의 설치 버전 — 음향·드라이버는 CCL8과 동일, 중량 17.6→18.1kg, 고정 설치 리깅, 권장 앰프 25D/40D.",
    "mechanicalSafety": {
      "flownRows": [
        { "config": "flown", "accessory": "Z5826 CCLi Flying frame", "safeLimit": null, "maxLimit": "24 cabinets (500 kg SWL total system weight incl. rigging components)" }
      ],
      "stackedRows": [],
      "notes": [
        { "text": "설치형 전용 Flying frame(Z5826, 투어링 CCL의 Z5820과 별개). Maximum_Limit 24대(500kg SWL)는 CCLi Rigging manual SWL과 Z5826의 CCL 대응 정격 근거로 CCL과 동일 채택 — AE 문장에 24대 수치가 직접 명시되지 않아 CCL8보다 근거 신뢰도 약간 낮음(원문 명시). Safe_Limit 열은 원문에 없어 null." }
      ],
      "safetyFactor": null,
      "maxWindLoad": null,
      "source": "CCLi Rigging manual p.5; AE/SPS"
    },
    "presets": null,
    "cardioidCapability": "Integrated"
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
    "img": "public/assets/img/speakers/db/cl/spk-db-ccli12.png",
    "relations": {
      "ampIds": [
        "amp-db-40d",
        "amp-db-d40",
        "amp-db-d80",
        "amp-db-d90"
      ]
    },
    "watt": 400,
    "notes": "CCL12의 설치 버전 — CCLi8과 동일 패턴.",
    "mechanicalSafety": {
      "flownRows": [
        { "config": "flown", "accessory": "Z5826 CCLi Flying frame", "safeLimit": null, "maxLimit": "24 cabinets (500 kg SWL total system weight incl. rigging components)" }
      ],
      "stackedRows": [],
      "notes": [
        { "text": "설치형 전용 Flying frame(Z5826). CCLi8과 리깅 액세서리·SWL 공용. 24대 수치는 AE 문장에 직접 명시되지 않고 CCLi Rigging manual SWL·Z5820/CCL 대응 정격 근거로 채택. Safe_Limit 열은 원문에 없어 null." }
      ],
      "safetyFactor": null,
      "maxWindLoad": null,
      "source": "CCLi Rigging manual p.5; AE/SPS"
    },
    "presets": null,
    "cardioidCapability": "Integrated"
  },
// ── 아래부터는 스펙 조사 전(pending) — 제조사 공식 이미지만 등록된 항목이다.
// 스펙 필드는 전부 null/빈 배열이며 파생 태그(wayCount/network/lowUnitConfig)는
// normalize* 가 pending 을 건너뛰어 생성되지 않는다. 조사가 끝나면 이 주석 위쪽
// 항목들과 같은 형태로 값을 채우고 pending 플래그를 지운다.
{
  "id": "spk-db-ccli-sub",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "CCLi-SUB",
  "series": "CL Series",
  "throwCat": null,
  "type": null,
  "throw": null,
  "lowInch": null,
  "lowQty": null,
  "crossover": null,
  "crossoverTags": [],
  "spl": null,
  "cov": null,
  "freqs": [],
  "weight": null,
  "transducers": null,
  "connectors": null,
  "ip": null,
  "dims": null,
  "amps": [],
  "ampRaw": null,
  "notes": null,
  "img": "public/assets/img/speakers/db/cl/spk-db-ccli-sub.png",
  "relations": {
    "ampIds": []
  },
  "watt": null,
  "mechanicalSafety": null,
  "presets": null,
  "cardioidCapability": null,
  "pending": true
},
{
  "id": "spk-db-bi12-sub",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "Bi12-SUB",
  "series": "CL Series",
  "throwCat": null,
  "type": null,
  "throw": null,
  "lowInch": null,
  "lowQty": null,
  "crossover": null,
  "crossoverTags": [],
  "spl": null,
  "cov": null,
  "freqs": [],
  "weight": null,
  "transducers": null,
  "connectors": null,
  "ip": null,
  "dims": null,
  "amps": [],
  "ampRaw": null,
  "notes": null,
  "img": "public/assets/img/speakers/db/cl/spk-db-bi12-sub.png",
  "relations": {
    "ampIds": []
  },
  "watt": null,
  "mechanicalSafety": null,
  "presets": null,
  "cardioidCapability": null,
  "pending": true
}
];
