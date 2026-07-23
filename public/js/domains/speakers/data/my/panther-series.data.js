// Meyer Sound PANTHER Series 스피커 데이터 (3개 모델 — L/M/W, 수평 커버리지만 다름).
// 필드 스키마 설명은 speakers.schema.js 참조.
// 파생 필드(wayCount / network / lowUnitConfig)는 로드 시 normalize 함수가 생성하므로 저장하지 않는다.
// PANTHER 는 Meyer Sound 의 자체 DSP 앰프 내장형(파워드) 라인어레이라
// L-Acoustics/d&b 처럼 외부 앰프를 골라 매칭하는 개념이 없다 — amps 는
// 항상 빈 배열이고(사용자 확인), 대신 AC Power/Audio Input 스펙을
// connectors 필드에 요약해 담는다. 대표 이미지는 사용자가 업로드한 흰 배경
// 앵글샷(panther_portal-sq.jpg)의 배경을 제거해 반영 — L/M/W 세 모델 모두
// 외형이 동일(커버리지 각도만 다름)해 같은 사진을 공유한다(사용자 확인).
export const MY_PANTHER_SERIES = [
  {
    "id": "spk-my-panther-l",
    "mfr": "Meyer Sound",
    "mk": "my",
    "name": "PANTHER-L",
    "cardioidCapability": "Array + preset",
    "series": "PANTHER Series",
    "throwCat": null,
    "type": "Line Array",
    "throw": null,
    "lowInch": 12,
    "lowQty": 2,
    "crossover": "2-way, active",
    "crossoverTags": [
      "2-way",
      "active"
    ],
    "spl": 150.5,
    "cov": {
      "h": "80°"
    },
    "freqs": null,
    "weight": 68,
    "transducers": "LF: 2 × 12″ (4 Ω) · HF: 2 × 3″ compression driver (8 Ω)",
    "connectors": "Analog: Neutrik XLR 3-pin TOP female in / male loop out · Digital: Neutrik etherCON TOP (AVB, Milan Certified) · AC: Neutrik powerCON TRUE1 TOP, 200–240 V AC 50/60 Hz",
    "ip": "IP55 (Neutrik TOP 커넥터 체결 시)",
    "dims": "969 x 377 x 565 mm / 38.15 x 14.84 x 22.24 in",
    "amps": [],
    "selfPowered": true,
    "ampRaw": null,
    "img": "public/assets/img/speakers/my/panther-series/spk-my-panther.webp",
    "views": [
      {
        "label": "Front",
        "src": "public/assets/img/speakers/my/panther-series/spk-my-panther.webp"
      }
    ],
    "relations": {
      "ampIds": []
    },
    "watt": 1100,
    "wattByBand": null,
    "notes": "Self-powered loudspeaker — built-in DSP amplification, no external amplifier required. Burst power 2200 W (<1 sec), idle power 150 W."
  },
  {
    "id": "spk-my-panther-m",
    "mfr": "Meyer Sound",
    "mk": "my",
    "name": "PANTHER-M",
    "cardioidCapability": "Array + preset",
    "series": "PANTHER Series",
    "throwCat": null,
    "type": "Line Array",
    "throw": null,
    "lowInch": 12,
    "lowQty": 2,
    "crossover": "2-way, active",
    "crossoverTags": [
      "2-way",
      "active"
    ],
    "spl": 150.5,
    "cov": {
      "h": "95°"
    },
    "freqs": null,
    "weight": 68,
    "transducers": "LF: 2 × 12″ (4 Ω) · HF: 2 × 3″ compression driver (8 Ω)",
    "connectors": "Analog: Neutrik XLR 3-pin TOP female in / male loop out · Digital: Neutrik etherCON TOP (AVB, Milan Certified) · AC: Neutrik powerCON TRUE1 TOP, 200–240 V AC 50/60 Hz",
    "ip": "IP55 (Neutrik TOP 커넥터 체결 시)",
    "dims": "969 x 377 x 565 mm / 38.15 x 14.84 x 22.24 in",
    "amps": [],
    "selfPowered": true,
    "ampRaw": null,
    "img": "public/assets/img/speakers/my/panther-series/spk-my-panther.webp",
    "views": [
      {
        "label": "Front",
        "src": "public/assets/img/speakers/my/panther-series/spk-my-panther.webp"
      }
    ],
    "relations": {
      "ampIds": []
    },
    "watt": 1100,
    "wattByBand": null,
    "notes": "Self-powered loudspeaker — built-in DSP amplification, no external amplifier required. Burst power 2200 W (<1 sec), idle power 150 W."
  },
  {
    "id": "spk-my-panther-w",
    "mfr": "Meyer Sound",
    "mk": "my",
    "name": "PANTHER-W",
    "cardioidCapability": "Array + preset",
    "series": "PANTHER Series",
    "throwCat": null,
    "type": "Line Array",
    "throw": null,
    "lowInch": 12,
    "lowQty": 2,
    "crossover": "2-way, active",
    "crossoverTags": [
      "2-way",
      "active"
    ],
    "spl": 149.5,
    "cov": {
      "h": "110°"
    },
    "freqs": null,
    "weight": 68,
    "transducers": "LF: 2 × 12″ (4 Ω) · HF: 2 × 3″ compression driver (8 Ω)",
    "connectors": "Analog: Neutrik XLR 3-pin TOP female in / male loop out · Digital: Neutrik etherCON TOP (AVB, Milan Certified) · AC: Neutrik powerCON TRUE1 TOP, 200–240 V AC 50/60 Hz",
    "ip": "IP55 (Neutrik TOP 커넥터 체결 시)",
    "dims": "969 x 377 x 565 mm / 38.15 x 14.84 x 22.24 in",
    "amps": [],
    "selfPowered": true,
    "ampRaw": null,
    "img": "public/assets/img/speakers/my/panther-series/spk-my-panther.webp",
    "views": [
      {
        "label": "Front",
        "src": "public/assets/img/speakers/my/panther-series/spk-my-panther.webp"
      }
    ],
    "relations": {
      "ampIds": []
    },
    "watt": 1100,
    "wattByBand": null,
    "notes": "Self-powered loudspeaker — built-in DSP amplification, no external amplifier required. Burst power 2200 W (<1 sec), idle power 150 W."
  }
];
