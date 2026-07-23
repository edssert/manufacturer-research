// Meyer Sound LEOPARD Series 스피커 데이터 (2개 모델 — 표준/M80, 수평 커버리지만 다름).
// 필드 스키마 설명은 speakers.schema.js 참조.
// 파생 필드(wayCount / network / lowUnitConfig)는 로드 시 normalize 함수가 생성하므로 저장하지 않는다.
// LEOPARD 는 PANTHER 와 마찬가지로 Meyer Sound 의 자체 DSP 앰프 내장형
// (파워드) 라인어레이 — amps 는 빈 배열(사용자 확인, PANTHER 와 동일 패턴).
// 3채널 Class D 앰프(합산 3900W peak)와 RMS 네트워크(Galileo GALAXY 연동)
// 스펙은 connectors 필드에 요약. 대표 이미지는 사용자가 업로드한 흰 배경
// 앵글샷(leopard_portal-sq.jpg)의 배경을 제거해 반영 — 표준/M80 두 모델
// 모두 외형이 동일(커버리지 각도만 다름)해 같은 사진을 공유한다(사용자 확인).
export const MY_LEOPARD_SERIES = [
  {
    "id": "spk-my-leopard",
    "mfr": "Meyer Sound",
    "mk": "my",
    "name": "LEOPARD",
    "cardioidCapability": "No",
    "series": "LEOPARD Series",
    "throwCat": null,
    "type": "Line Array",
    "throw": null,
    "lowInch": 9,
    "lowQty": 2,
    "crossover": "2-way, active",
    "crossoverTags": [
      "2-way",
      "active"
    ],
    "spl": 142,
    "cov": {
      "h": "110°"
    },
    "freqs": [
      {
        "db": "dB 미표기",
        "lo": "55 Hz",
        "hi": "18 kHz"
      },
      {
        "db": "Phase ±30°",
        "lo": "92 Hz",
        "hi": "18 kHz"
      }
    ],
    "weight": 34,
    "transducers": "LF: 2 × 9″ long-excursion cone (2 Ω) · HF: 1 × 3″ compression driver via REM® manifold (4 Ω)",
    "connectors": "Analog: XLR 5-pin female in / male loop out(RMS 겸용), XLR 3-pin 도 가능(오디오 전용) · AC: powerCON 20 in/loop out, 90–265 V AC 자동전압 · Amp: 3ch open-loop Class D, 합산 3900 W peak · RMS Network: 2선 twisted-pair, Galileo GALAXY 로 앰프 상태 리포트",
    "ip": null,
    "dims": "684 x 282 x 550 mm / 26.93 x 11.11 x 21.66 in",
    "amps": [],
    "selfPowered": true,
    "ampRaw": null,
    "img": "public/assets/img/speakers/my/leopard-series/spk-my-leopard.webp",
    "views": [
      {
        "label": "Front",
        "src": "public/assets/img/speakers/my/leopard-series/spk-my-leopard.webp"
      }
    ],
    "relations": {
      "ampIds": []
    },
    "watt": 3900,
    "wattByBand": null,
    "notes": "Self-powered loudspeaker — built-in 3-channel Class D amplification (3900 W peak total), no external amplifier required. Linear Peak SPL: 133.5 dB (M-noise, 18 dB crest factor) / 130 dB (Pink noise) / 134.5 dB (B-noise). Vertical coverage varies with array length/configuration."
  },
  {
    "id": "spk-my-leopard-m80",
    "mfr": "Meyer Sound",
    "mk": "my",
    "name": "LEOPARD-M80",
    "cardioidCapability": "No",
    "series": "LEOPARD Series",
    "throwCat": null,
    "type": "Line Array",
    "throw": null,
    "lowInch": 9,
    "lowQty": 2,
    "crossover": "2-way, active",
    "crossoverTags": [
      "2-way",
      "active"
    ],
    "spl": 142,
    "cov": {
      "h": "80°"
    },
    "freqs": [
      {
        "db": "dB 미표기",
        "lo": "55 Hz",
        "hi": "18 kHz"
      },
      {
        "db": "Phase ±30°",
        "lo": "92 Hz",
        "hi": "18 kHz"
      }
    ],
    "weight": 34,
    "transducers": "LF: 2 × 9″ long-excursion cone (2 Ω) · HF: 1 × 3″ compression driver via REM® manifold (4 Ω)",
    "connectors": "Analog: XLR 5-pin female in / male loop out(RMS 겸용), XLR 3-pin 도 가능(오디오 전용) · AC: powerCON 20 in/loop out, 90–265 V AC 자동전압 · Amp: 3ch open-loop Class D, 합산 3900 W peak · RMS Network: 2선 twisted-pair, Galileo GALAXY 로 앰프 상태 리포트",
    "ip": null,
    "dims": "684 x 282 x 550 mm / 26.93 x 11.11 x 21.66 in",
    "amps": [],
    "selfPowered": true,
    "ampRaw": null,
    "img": "public/assets/img/speakers/my/leopard-series/spk-my-leopard.webp",
    "views": [
      {
        "label": "Front",
        "src": "public/assets/img/speakers/my/leopard-series/spk-my-leopard.webp"
      }
    ],
    "relations": {
      "ampIds": []
    },
    "watt": 3900,
    "wattByBand": null,
    "notes": "Self-powered loudspeaker — built-in 3-channel Class D amplification (3900 W peak total), no external amplifier required. Linear Peak SPL: 135 dB (M-noise, 19 dB crest factor) / 132 dB (Pink noise) / 136.5 dB (B-noise). Vertical coverage varies with array length/configuration."
  }
];
