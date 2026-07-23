// Meyer Sound MM Series 스피커 데이터 (3개 모델 — MM-10AC/MM-10ACX/MM-10XP,
// 초소형 설치용 서브우퍼. 음향/트랜스듀서/치수 스펙은 3개 모델 공통이고
// 전원 공급 방식만 다르다: AC=내장 AC 전원+오디오 루프아웃, ACX=내장 AC 전원
// +MM-4XP 새틀라이트 2대 DC전원/오디오 배급 허브, XP=외부 48V DC(MPS
// IntelligentDC 파워서플라이) 공급).
// 필드 스키마 설명은 speakers.schema.js 참조.
// 파생 필드(wayCount / network / lowUnitConfig)는 로드 시 normalize 함수가 생성하므로 저장하지 않는다.
// 세 모델 모두 앰프/DSP 내장(single-channel, 440W peak)의 self-powered 구조 —
// XP 도 원문(OM "preserving the advantages of self-powered loudspeaker
// systems", Onboard_Amplification=Yes)에 따라 selfPowered: true 유지, 외부
// 요소는 앰프가 아니라 전원(48V DC)뿐이며 구동 방식은 connectors/notes 에 명시.
// Max SPL 실측값이 원문에 없어 spl 은 Linear_Peak_SPL 최댓값(120.5dB,
// B-noise) 채택, 상세는 notes 에 병기. img 는 아직 이미지가 없어 null.
export const MY_MM_SERIES = [
  {
    "id": "spk-my-mm-10ac",
    "mfr": "Meyer Sound",
    "mk": "my",
    "name": "MM-10AC",
    "series": "MM Series",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": null,
    "lowInch": 10,
    "lowQty": 1,
    "crossover": "1-way, active",
    "crossoverTags": [
      "1-way",
      "active"
    ],
    "spl": 120.5,
    "cov": {
      "h": "360°"
    },
    "freqs": [
      {
        "db": "Operating Range",
        "lo": "33 Hz",
        "hi": "228 Hz"
      },
      {
        "db": "-4 dB",
        "lo": "35 Hz",
        "hi": "208 Hz"
      },
      {
        "db": "Phase ±45°",
        "lo": "38 Hz",
        "hi": "138 Hz"
      }
    ],
    "weight": 12.79,
    "transducers": "LF: 1 × 10″ cone driver, 2″ voice coil (4 Ω) · bass-reflex 인클로저",
    "connectors": "Analog: XLR 3-pin female in / male loop out(루프아웃은 AC 모델 전용) · AC: locking powerCON in/loop out, 90–265 V AC 자동전압 · Amp: 1ch 내장, 440 W peak",
    "ip": null,
    "dims": "483 x 279 x 305 mm",
    "amps": [],
    "selfPowered": true,
    "ampRaw": null,
    "img": null,
    "relations": {
      "ampIds": []
    },
    "watt": 440,
    "wattByBand": null,
    "notes": "Self-powered miniature subwoofer — built-in single-channel amplification (440 W peak) with onboard processing, no external amplifier required. AC-powered variant: internal power supply, powerCON AC in/loop out, audio loop out 포함(3개 모델 중 유일). Max SPL 실측값은 원문에 없음 — Linear Peak SPL 최댓값 채택: 118.5 dB (M-noise, crest factor > 11 dB) / 117.5 dB (Pink noise) / 120.5 dB (B-noise). MM-4XP miniature loudspeaker 의 컴패니언 설치용 서브우퍼 — QuickFly 리깅 없음, 너트플레이트 고정 또는 MUB-MM10 U-브래킷 벽/천장 마운트(옵션)."
  },
  {
    "id": "spk-my-mm-10acx",
    "mfr": "Meyer Sound",
    "mk": "my",
    "name": "MM-10ACX",
    "series": "MM Series",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": null,
    "lowInch": 10,
    "lowQty": 1,
    "crossover": "1-way, active",
    "crossoverTags": [
      "1-way",
      "active"
    ],
    "spl": 120.5,
    "cov": {
      "h": "360°"
    },
    "freqs": [
      {
        "db": "Operating Range",
        "lo": "33 Hz",
        "hi": "228 Hz"
      },
      {
        "db": "-4 dB",
        "lo": "35 Hz",
        "hi": "208 Hz"
      },
      {
        "db": "Phase ±45°",
        "lo": "38 Hz",
        "hi": "138 Hz"
      }
    ],
    "weight": 13.97,
    "transducers": "LF: 1 × 10″ cone driver, 2″ voice coil (4 Ω) · bass-reflex 인클로저",
    "connectors": "Analog: XLR 3-pin female ×3 (Subwoofer / Satellite 1 / Satellite 2, 루프아웃 없음) · Satellite Out: Phoenix 5-pin male 또는 EN3 5-pin female ×2 — 출력당 48 V DC 2.1 A + 밸런스 오디오, MM-4XP 최대 2대 구동 · AC: locking powerCON in/loop out, 90–264 V AC 자동전압 · Amp: 1ch 내장, 440 W peak",
    "ip": null,
    "dims": "483 x 279 x 305 mm",
    "amps": [],
    "selfPowered": true,
    "ampRaw": null,
    "img": null,
    "relations": {
      "ampIds": []
    },
    "watt": 440,
    "wattByBand": null,
    "notes": "Self-powered miniature subwoofer — built-in single-channel amplification (440 W peak), no external amplifier required. AC-powered '허브' variant: 서브우퍼 자신 외에 최대 2대의 MM-4XP 새틀라이트 스피커에 DC 전원(48 V DC, 2.1 A/출력)+오디오를 온보드로 배급해 컴팩트 풀레인지 시스템의 중심 역할. Input Select 스위치(SUB CH / SUM CH 1+2)와 Gain 노브(off~+10 dB)로 서브우퍼 신호 라우팅 제어. Max SPL 실측값은 원문에 없음 — Linear Peak SPL 최댓값 채택: 118.5 dB (M-noise, crest factor > 11 dB) / 117.5 dB (Pink noise) / 120.5 dB (B-noise). 3개 모델 중 최중량(13.97 kg, 새틀라이트 구동 회로 추가)."
  },
  {
    "id": "spk-my-mm-10xp",
    "mfr": "Meyer Sound",
    "mk": "my",
    "name": "MM-10XP",
    "series": "MM Series",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": null,
    "lowInch": 10,
    "lowQty": 1,
    "crossover": "1-way, active",
    "crossoverTags": [
      "1-way",
      "active"
    ],
    "spl": 120.5,
    "cov": {
      "h": "360°"
    },
    "freqs": [
      {
        "db": "Operating Range",
        "lo": "33 Hz",
        "hi": "228 Hz"
      },
      {
        "db": "-4 dB",
        "lo": "35 Hz",
        "hi": "208 Hz"
      },
      {
        "db": "Phase ±45°",
        "lo": "38 Hz",
        "hi": "138 Hz"
      }
    ],
    "weight": 12.11,
    "transducers": "LF: 1 × 10″ cone driver, 2″ voice coil (4 Ω) · bass-reflex 인클로저",
    "connectors": "Input: Phoenix 5-pin male 또는 SwitchCraft EN3 5-pin male 단일 커넥터 — 48 V DC 전원 2핀 + 밸런스 오디오 3핀 결합(루프아웃/별도 AC 커넥터 없음) · 외부 전원 필수: Meyer Sound MPS IntelligentDC 파워서플라이(MPS-488HP 19″ 1U 최대 8ch 또는 MPS-482HP 하프랙 2ch), 케이블 왕복 저항 최대 2 Ω · Amp: 1ch 내장, 440 W peak",
    "ip": null,
    "dims": "483 x 279 x 305 mm",
    "amps": [],
    "selfPowered": true,
    "ampRaw": null,
    "img": null,
    "relations": {
      "ampIds": []
    },
    "watt": 440,
    "wattByBand": null,
    "notes": "Self-powered miniature subwoofer — 앰프/DSP 는 유닛에 내장(single-channel, 440 W peak)하되 전원은 외부 48 V DC 로 공급받는 DC-powered variant. 외부 Meyer Sound MPS IntelligentDC 파워서플라이(MPS-488HP/MPS-482HP)가 전원+오디오를 단일 5핀 케이블로 공급 — 외장 '앰프'가 아니라 외장 '전원'이므로 self-powered 분류 유지(원문 근거). UL 2043(공조 공간 사용 적합) 인증은 XP 모델 전용. Max SPL 실측값은 원문에 없음 — Linear Peak SPL 최댓값 채택: 118.5 dB (M-noise, crest factor > 11 dB) / 117.5 dB (Pink noise) / 120.5 dB (B-noise). 3개 모델 중 최경량(12.11 kg)."
  }
];
