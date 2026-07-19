// Meyer Sound TIGRA Series 스피커 데이터 (2개 모델 — L/W, 수평 커버리지만 다름).
// 필드 스키마 설명은 speakers.schema.js 참조.
// 파생 필드(wayCount / network / lowUnitConfig)는 로드 시 normalize 함수가 생성하므로 저장하지 않는다.
// PANTHER/LEOPARD 와 마찬가지로 Meyer Sound 의 자체 DSP 앰프 내장형(파워드)
// 라인어레이 — amps 는 빈 배열(사용자 확인 패턴 재사용). AC Power/Audio
// Input 스펙은 connectors 필드에 요약. 대표 이미지는 사용자가 업로드한 흰
// 배경 앵글샷(tigra-l_featured-sq.jpg)의 배경을 제거해 반영 — 파일명은
// TIGRA-L 전용이지만 L/W 두 모델 외형이 동일(커버리지 각도만 다름)해 같은
// 사진을 공유한다(사용자 확인 — "같은 시리즈는 같은 사진 사용").
// [치수/무게 출처] 카드 요약 텍스트(33.94in/114.7lb)와 스펙표(33.92in/120lb,
// mm·kg 병기)가 서로 약간 다름 — 스펙표 쪽이 mm/kg 원본값을 직접 명시하고
// 있어 더 신뢰할 수 있는 소스로 판단해 스펙표 값(862 x 324 x 565mm, 54kg)을 채택.
export const MY_TIGRA_SERIES = [
  {
    "id": "spk-my-tigra-l",
    "mfr": "Meyer Sound",
    "mk": "my",
    "name": "TIGRA-L",
    "series": "TIGRA Series",
    "throwCat": null,
    "type": "Line Array",
    "throw": null,
    "lowInch": 10,
    "lowQty": 2,
    "crossover": "2-way, active",
    "crossoverTags": [
      "2-way",
      "active"
    ],
    "spl": 146,
    "cov": {
      "h": "85°"
    },
    "freqs": null,
    "weight": 54,
    "transducers": "LF: 2 × 10″ long-excursion cone · HF: 1 × 4″ compression driver coupled to horn",
    "connectors": "Analog: Neutrik XLR 3-pin TOP airtight female in / male loop out · Digital: 2 x Neutrik RJ45 etherCON TOP airtight (Milan AVB) · AC: Neutrik powerCON TRUE1 NAC3PX-TRUE1, 100–240 V AC 50/60 Hz",
    "ip": "IP55 (Neutrik powerCON TRUE1 커넥터 체결 시)",
    "dims": "862 x 324 x 565 mm / 33.92 x 12.76 x 22.25 in",
    "amps": [],
    "selfPowered": true,
    "ampRaw": null,
    "img": "public/assets/img/speakers/my/tigra-series/spk-my-tigra.webp",
    "views": [
      {
        "label": "Front",
        "src": "public/assets/img/speakers/my/tigra-series/spk-my-tigra.webp"
      }
    ],
    "relations": {
      "ampIds": []
    },
    "watt": 550,
    "wattByBand": null,
    "notes": "Self-powered loudspeaker — built-in DSP amplification, no external amplifier required. Burst power 1270 W (<1 sec), idle power 50 W. AES75 max linear: 122 dBz, 140.5 dBzpk (RMS input +4 dBV). Arrays of 6+ units functionally create a cardioid polar pattern at all SPL levels."
  },
  {
    "id": "spk-my-tigra-w",
    "mfr": "Meyer Sound",
    "mk": "my",
    "name": "TIGRA-W",
    "series": "TIGRA Series",
    "throwCat": null,
    "type": "Line Array",
    "throw": null,
    "lowInch": 10,
    "lowQty": 2,
    "crossover": "2-way, active",
    "crossoverTags": [
      "2-way",
      "active"
    ],
    "spl": 145,
    "cov": {
      "h": "110°"
    },
    "freqs": null,
    "weight": 54,
    "transducers": "LF: 2 × 10″ long-excursion cone · HF: 1 × 4″ compression driver coupled to horn",
    "connectors": "Analog: Neutrik XLR 3-pin TOP airtight female in / male loop out · Digital: 2 x Neutrik RJ45 etherCON TOP airtight (Milan AVB) · AC: Neutrik powerCON TRUE1 NAC3PX-TRUE1, 100–240 V AC 50/60 Hz",
    "ip": "IP55 (Neutrik powerCON TRUE1 커넥터 체결 시)",
    "dims": "862 x 324 x 565 mm / 33.92 x 12.76 x 22.25 in",
    "amps": [],
    "selfPowered": true,
    "ampRaw": null,
    "img": "public/assets/img/speakers/my/tigra-series/spk-my-tigra.webp",
    "views": [
      {
        "label": "Front",
        "src": "public/assets/img/speakers/my/tigra-series/spk-my-tigra.webp"
      }
    ],
    "relations": {
      "ampIds": []
    },
    "watt": 550,
    "wattByBand": null,
    "notes": "Self-powered loudspeaker — built-in DSP amplification, no external amplifier required. Burst power 1270 W (<1 sec), idle power 50 W. AES75 max linear: 121 dBz, 139.5 dBzpk (RMS input +3 dBV). Arrays of 6+ units functionally create a cardioid polar pattern at all SPL levels."
  }
];
