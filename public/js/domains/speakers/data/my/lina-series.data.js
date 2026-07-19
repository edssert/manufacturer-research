// Meyer Sound LINA 스피커 데이터 (단일 모델 — 폭 변형 없음).
// 필드 스키마 설명은 speakers.schema.js 참조.
// 파생 필드(wayCount / network / lowUnitConfig)는 로드 시 normalize 함수가 생성하므로 저장하지 않는다.
// PANTHER/LEOPARD/TIGRA 와 마찬가지로 Meyer Sound 의 자체 DSP 앰프 내장형
// (파워드) 라인어레이 — amps 는 빈 배열(동일 패턴). 3채널 Class D 내장 앰프
// (1950W peak), RMS 네트워크(옵션)는 connectors 필드에 요약. 대표 이미지는
// 사용자가 업로드한 흰 배경 앵글샷(lina_featured-sq.jpg)의 배경을 제거해 반영.
export const MY_LINA_SERIES = [
  {
    "id": "spk-my-lina",
    "mfr": "Meyer Sound",
    "mk": "my",
    "name": "LINA",
    "series": "LINA Series",
    "throwCat": null,
    "type": "Line Array",
    "throw": null,
    "lowInch": 6.5,
    "lowQty": 2,
    "crossover": "2-way, active",
    "crossoverTags": [
      "2-way",
      "active"
    ],
    "spl": 138,
    "cov": {
      "h": "100°"
    },
    "freqs": [
      {
        "db": "Operating Range",
        "lo": "65 Hz",
        "hi": "18 kHz"
      },
      {
        "db": "Phase ±45°",
        "lo": "100 Hz",
        "hi": "18 kHz"
      }
    ],
    "weight": 19.5,
    "transducers": "LF: 2 × 6.5″ long-excursion cone (4 Ω) · HF: 1 × 3″ compression driver via REM® manifold (8 Ω)",
    "connectors": "Analog: XLR 3-pin female in / male loop out(XLR 5-pin 옵션 시 RMS 겸용) · AC: powerCON 20 in/loop out, 90–265 V AC 자동전압 · Amp: 3ch Class D, 합산 1950 W peak · RMS Network: 2선 twisted-pair(옵션), 앰프 상태 리포트",
    "ip": null,
    "dims": "515 x 213 x 389 mm / 20.27 x 8.38 x 15.32 in",
    "amps": [],
    "selfPowered": true,
    "ampRaw": null,
    "img": "public/assets/img/speakers/my/lina-series/spk-my-lina.webp",
    "views": [
      {
        "label": "Front",
        "src": "public/assets/img/speakers/my/lina-series/spk-my-lina.webp"
      }
    ],
    "relations": {
      "ampIds": []
    },
    "watt": 1950,
    "wattByBand": null,
    "notes": "Self-powered loudspeaker — built-in 3-channel Class D amplification (1950 W peak total), no external amplifier required. Linear Peak SPL: 132 dB (M-noise, 19 dB crest factor) / 128 dB (Pink noise) / 130 dB (B-noise). Vertical coverage varies with array length/configuration. Compact format(43 lb/19.5kg) — 가장 작은 Meyer Sound 라인어레이 중 하나."
  }
];
