// Meyer Sound X-400C 스피커 데이터 (단일 모델 — Compact Cinema Subwoofer).
// 필드 스키마 설명은 speakers.schema.js 참조.
// 파생 필드(wayCount / network / lowUnitConfig)는 로드 시 normalize 함수가 생성하므로 저장하지 않는다.
// [배치 판단] X-400C 는 MM 시리즈와 무관한 독립 모델로 단독 파일로 분리 —
// 원문(SPS "Part of Meyer Sound's cinema series, the X-400C Compact Cinema
// Subwoofer...")이 명시한 시리즈명을 그대로 채택해 series: "Cinema Series".
// 컴패니언은 Acheron 스크린 채널/HMS 서라운드 스피커, 자매 모델 X-800C(미투입)
// — 향후 시네마 계열 제품 추가 시 같은 시리즈로 묶인다.
// Self-powered(단일 채널 앰프 900W peak 내장) 서브우퍼 — amps 는 빈 배열
// (다른 MY self-powered 제품과 동일 패턴). Max SPL 실측값이 원문에 없어
// spl 은 Linear_Peak_SPL 최댓값(131.5dB, B-noise) 채택, 상세는 notes 병기.
// Coverage 는 원문이 "Varies with number of units and configuration"만 서술
// (단일 유닛 360° 표기 없음)해 cov: null. img 는 아직 이미지가 없어 null.
export const MY_X400C = [
  {
    "id": "spk-my-x-400c",
    "mfr": "Meyer Sound",
    "mk": "my",
    "name": "X-400C",
    "cardioidCapability": "No",
    "series": "Cinema Series",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": null,
    "lowInch": 18,
    "lowQty": 1,
    "crossover": "1-way, active",
    "crossoverTags": [
      "1-way",
      "active"
    ],
    "spl": 131.5,
    "cov": null,
    "freqs": [
      {
        "db": "dB 미표기",
        "lo": "20 Hz",
        "hi": "200 Hz"
      },
      {
        "db": "-4 dB",
        "lo": "23 Hz",
        "hi": "160 Hz"
      },
      {
        "db": "Phase ±30°",
        "lo": "32 Hz",
        "hi": "175 Hz"
      }
    ],
    "weight": 38.6,
    "transducers": "LF: 1 × 18″ long-excursion cone driver (4 Ω) · optimally tuned, vented 인클로저",
    "connectors": "Analog: XLR 3-pin female in / male loop out · Pad Switch: -7.5 dB 입력 패드(청취자 근접 배치 시 상류 노이즈 저감) · AC: powerCON 20 in/loop out, 90–265 V AC 자동전압(Intelligent AC) · Amp: 1ch 내장, 900 W peak · RMS Network(옵션): 2선 twisted-pair 모듈, RMServer 하드웨어 별매",
    "ip": null,
    "dims": "787 x 525 x 528 mm / 31.00 x 20.65 x 20.79 in",
    "amps": [],
    "selfPowered": true,
    "ampRaw": null,
    "img": null,
    "relations": {
      "ampIds": []
    },
    "watt": 900,
    "wattByBand": null,
    "notes": "Self-powered compact cinema subwoofer — built-in single-channel amplification (900 W peak) driving a single 18″ driver (1:1 channel-driver mapping), no external amplifier required. Meyer Sound cinema series 소속 — Acheron 스크린 채널/HMS 서라운드 스피커의 컴패니언, 대형 자매 모델 X-800C 와 유사한 음향 특성. Max SPL 실측값은 원문에 없음 — Linear Peak SPL 최댓값 채택: 127.5 dB (M-noise, crest factor > 11.5 dB) / 127.5 dB (Pink noise) / 131.5 dB (B-noise). Coverage 는 유닛 수/구성에 따라 가변(원문에 단일 유닛 지향각 표기 없음). 리깅 시스템 서술 없음(고정 시네마 설치용) — 그릴은 금속이 아닌 black cloth 옵션."
  }
];
