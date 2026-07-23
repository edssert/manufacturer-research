// Meyer Sound USW Series 서브우퍼 데이터 (4개 모델 — USW-112P/112XP/121P/210P).
// 필드 스키마 설명은 speakers.schema.js 참조. 소스: audio-spec-parsing-skill 마스터
// 스키마(USW-112P/112XP/121P/210P v1.1, raw-data/raw-specs/my/speakers/usw-series/).
// 전 모델 self-powered — LEOPARD 패턴 그대로 amps: [], selfPowered: true, ampRaw: null.
// [판단 근거]
// - 시리즈명: USW-112XP 원문만 "USW family" 소속을 명시하나 4개 모델 모두
//   동일 명명 체계라 앱 표기는 "USW Series" 로 통일.
// - spl: 원문에 Max_SPL_Peak 단일값이 없어, Linear_Peak_SPL 계열(112P/112XP/210P)은
//   3종 노이즈 중 최댓값(B-noise)을 정수 채택(소수점은 내림 — 121.5→121,
//   과대표기 방지), AES75 계열(121P)은 dBZpk(피크값) 136 정수 채택. 상세는 notes.
// - watt: Amplifier_Total_Output_Power(W peak). USW-121P 는 앰프 출력 정격이
//   원문에 없어 PANTHER 전례(watt=Max Long-Term Continuous Power 소비전력)를
//   따라 800W 채택(notes 에 명시). W=V×A 환산 금지 원칙 준수.
// - USW-112XP 는 외부 MPS IntelligentDC 파워서플라이(48V DC) 급전 구조이나
//   앰프 자체는 내장(self-powered) — connectors/notes 에 급전 구조를 명시.
// - USW-112P 인치 치수(13.50x23.50x12.00in)는 동일 치수의 USW-112XP AE 원문
//   인치값을 준용(343x597x305mm 동일).
// - cov: 4개 모델 모두 원문 "360°" 표기 확인 — {h:"360°"}.
// - ip: 조건부/충돌 표기(112P 3중 불일치, 112XP SPS·OM 불일치, 121P OT 버전
//   전용)는 원문 그대로 병기하고 대표값을 임의 확정하지 않음.
// - img: null (이미지 미확보, views 필드 미생성).
export const MY_USW_SERIES = [
  {
    "id": "spk-my-usw-112p",
    "mfr": "Meyer Sound",
    "mk": "my",
    "name": "USW-112P",
    "cardioidCapability": "No",
    "series": "USW Series",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": null,
    "lowInch": 12,
    "lowQty": 1,
    "crossover": "1-way, active",
    "crossoverTags": [
      "1-way",
      "active"
    ],
    "spl": 125,
    "cov": {
      "h": "360°"
    },
    "freqs": [
      {
        "db": "dB 미표기",
        "lo": "35 Hz",
        "hi": "140 Hz"
      },
      {
        "db": "-4 dB",
        "lo": "36 Hz",
        "hi": "125 Hz"
      },
      {
        "db": "Phase ±30°",
        "lo": "45 Hz",
        "hi": "120 Hz"
      }
    ],
    "weight": 20,
    "transducers": "LF: 1 × 12″ cone driver (3 Ω)",
    "connectors": "Analog(아날로그 버전): XLR 3-pin female in / male loop out(기본), XLR 5-pin 옵션(오디오+RMS) · Digital(디지털 버전): etherCON TOP, Milan Certified · AC: powerCON 20 in/loop out(아날로그 기본), powerCON TRUE1 TOP(디지털·방수 유닛), 100–240 V AC 자동전압 · Amp: 3ch open-loop Class D, 합산 1200 W peak · Monitoring: Compass(아날로그는 RMS 옵션+RMServer 별매, 디지털은 통합)",
    "ip": "IP54 (weather-protected 버전, SPS 기준 — OM 은 커넥터 IP65/설계목표 IPX4 병기)",
    "dims": "343 x 597 x 305 mm / 13.50 x 23.50 x 12.00 in",
    "amps": [],
    "selfPowered": true,
    "ampRaw": null,
    "img": null,
    "relations": {
      "ampIds": []
    },
    "watt": 1200,
    "wattByBand": null,
    "notes": "Self-powered compact narrow sub-bass system — analog (XLR + optional RMS) or digital (etherCON TOP, Milan) version selected at order, optional weather protection; 3-channel open-loop Class D amplification (1200 W peak total). Linear Peak SPL: 123 dB (M-noise, crest factor >10.5 dB) / 123 dB (Pink noise) / 125 dB (B-noise). IP ratings conflict across sources — IP54 (SPS, weather-protected) / IP65 connectors (OM) / IPX4 design target (OM) — all preserved. Flush-mounts against walls (12 in depth incl. connectors). Companion to ULTRA-X20, UP-4slim, UPM."
  },
  {
    "id": "spk-my-usw-112xp",
    "mfr": "Meyer Sound",
    "mk": "my",
    "name": "USW-112XP",
    "cardioidCapability": "No",
    "series": "USW Series",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": null,
    "lowInch": 12,
    "lowQty": 1,
    "crossover": "1-way, active",
    "crossoverTags": [
      "1-way",
      "active"
    ],
    "spl": 121,
    "cov": {
      "h": "360°"
    },
    "freqs": [
      {
        "db": "dB 미표기",
        "lo": "35 Hz",
        "hi": "140 Hz"
      },
      {
        "db": "-4 dB",
        "lo": "36 Hz",
        "hi": "125 Hz"
      },
      {
        "db": "Phase ±30°",
        "lo": "45 Hz",
        "hi": "120 Hz"
      }
    ],
    "weight": 19.5,
    "transducers": "LF: 1 × 12″ cone driver (3 Ω)",
    "connectors": "Input: Phoenix 5-pin male — DC 전원+밸런스드 오디오 단일 복합 케이블(루프 아웃 없음) · Power: 48 V DC, 외부 Meyer Sound MPS-488HP(8ch)/MPS-482HP(2ch) IntelligentDC 파워서플라이 필요 · Amp: open-loop Class D(채널 수 원문 미기재), 합산 600 W peak · RMS Network: MPS-488HP 측 옵션 모듈 경유, Compass",
    "ip": "IP54 (SPS) / IP56 (OM) — weather-protected + rain hood 기준, 소스 간 불일치 병기",
    "dims": "343 x 597 x 305 mm / 13.50 x 23.50 x 12.00 in",
    "amps": [],
    "selfPowered": true,
    "ampRaw": null,
    "img": null,
    "relations": {
      "ampIds": []
    },
    "watt": 600,
    "wattByBand": null,
    "notes": "Self-powered sub-bass system powered by an external Meyer Sound MPS IntelligentDC supply — 48 V DC + balanced audio over a single Phoenix 5-pin composite cable (max cable round-trip resistance 2 Ω); onboard Class D amplification 600 W peak. Linear Peak SPL: 119.5 dB (M-noise, crest factor >10 dB) / 119.5 dB (Pink noise) / 121.5 dB (B-noise). IP54 (SPS) vs IP56 (OM, rain hood) source conflict preserved. Port design based on USW-210P. Ideal companion to ULTRA-X20XP."
  },
  {
    "id": "spk-my-usw-121p",
    "mfr": "Meyer Sound",
    "mk": "my",
    "name": "USW-121P",
    "cardioidCapability": "No",
    "series": "USW Series",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": null,
    "lowInch": 21,
    "lowQty": 1,
    "crossover": "1-way, active",
    "crossoverTags": [
      "1-way",
      "active"
    ],
    "spl": 136,
    "cov": {
      "h": "360°"
    },
    "freqs": [
      {
        "db": "-10 dB",
        "lo": "20 Hz",
        "hi": "125 Hz"
      },
      {
        "db": "-4 dB",
        "lo": "23 Hz",
        "hi": "105 Hz"
      },
      {
        "db": "Phase ±30°",
        "lo": "28 Hz",
        "hi": "110 Hz"
      }
    ],
    "weight": 89.8,
    "transducers": "LF: 1 × 21″ long-excursion cone driver (4 Ω)",
    "connectors": "Analog: Neutrik XLR 3-pin TOP female in / male loop out · Digital: Neutrik etherCON TOP (AES67, SMPTE 2110 Compliant) · AC: Neutrik powerCON TRUE1 TOP, 200–240 V AC 50/60 Hz · Amp: 2ch Class D 내장 · DSP: GEN-1 임베디드 Galileo GALAXY 출력채널(Nebra 소프트웨어 제어)",
    "ip": "IP55 (OT/Outdoor Treatment 버전 전용, Neutrik TOP 체결 또는 실링 캡 장착 시)",
    "dims": "1321 x 698 x 622 mm / 52.00 x 27.50 x 24.50 in",
    "amps": [],
    "selfPowered": true,
    "ampRaw": null,
    "img": null,
    "relations": {
      "ampIds": []
    },
    "watt": 800,
    "wattByBand": null,
    "notes": "Self-powered sub-bass system — internal 2-channel Class D amplifier, AES67/SMPTE 2110 digital audio (not Milan AVB), GEN-1 technology embedding a Galileo GALAXY output channel's DSP in the loudspeaker (10-band parametric EQ, U-shaping, polarity, delay, gain, mute, HPF/LPF via Nebra). AES75 Max Linear SPL: 136 dBZpk / 125 dBZ (input +4.4 dBV analog / -17.8 dBFS digital). Amplifier output rating not published — watt = max long-term continuous power consumption 800 W (burst 2400 W), following the PANTHER convention. IP55 on OT (Outdoor Treatment) version only."
  },
  {
    "id": "spk-my-usw-210p",
    "mfr": "Meyer Sound",
    "mk": "my",
    "name": "USW-210P",
    "cardioidCapability": "No",
    "series": "USW Series",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": null,
    "lowInch": 10,
    "lowQty": 2,
    "crossover": "1-way, active",
    "crossoverTags": [
      "1-way",
      "active"
    ],
    "spl": 127,
    "cov": {
      "h": "360°"
    },
    "freqs": [
      {
        "db": "dB 미표기",
        "lo": "30 Hz",
        "hi": "140 Hz"
      },
      {
        "db": "-4 dB",
        "lo": "32 Hz",
        "hi": "123 Hz"
      },
      {
        "db": "Phase ±30°",
        "lo": "40 Hz",
        "hi": "123 Hz"
      }
    ],
    "weight": 25.4,
    "transducers": "LF: 2 × 10″ cone driver (4 Ω)",
    "connectors": "Analog: XLR 3-pin female in / male loop out(5-pin 옵션 없음) · AC: powerCON 20 in/loop out, 100–240 V AC 자동전압 · Amp: 2ch Class D(드라이버당 1채널), 합산 1800 W peak · RMS Network: 옵션 모듈(RMServer 인터페이스 경유), Compass",
    "ip": null,
    "dims": "305 x 1050 x 305 mm / 12.00 x 41.33 x 12.00 in",
    "amps": [],
    "selfPowered": true,
    "ampRaw": null,
    "img": null,
    "relations": {
      "ampIds": []
    },
    "watt": 1800,
    "wattByBand": null,
    "notes": "Self-powered narrow dual-driver sub-bass system — 2-channel Class D amplification (one channel per driver, 1800 W peak total). Linear Peak SPL: 126 dB (M-noise, crest factor >11.5 dB) / 126 dB (Pink noise) / 127 dB (B-noise). Horizontal or vertical installation supported (optional MBP-USW-210P aluminum base plate for vertical free-standing). Port design shared with the 1100-LFC. Weather protection available as option (no IP figure published). Companion to CAL and ULTRA Series."
  }
];
