// L-Acoustics 앰프 데이터.
// 필드 스키마 설명은 amplifiers.schema.js 참조.
//
// [전면 리뉴얼] 4개 앰프(LA1.16i/LA12X/LA4X/LA7.16) 모두 사용자가 제공한
// 원본 스펙 텍스트를 근거로 완전히 동일한 필드 집합(중첩 구조 포함)을 갖도록
// 재작성했다 — 브랜드(d&b db.data.js)와도 필드 구성이 동일해야 모달/카드
// 양식이 일치한다(사용자 요청). 데이터가 없는 필드는 전부 null 로 채우고,
// amplifiers.view.js 의 specRow 는 값이 없으면 "—"로 표시하도록 되어 있어
// 화면에는 항상 같은 행/섹션 구성이 보인다.
// 이전에 있던 thirdPartyManagement(Q-SYS/Crestron 등)는 ecosystem.
// integrations 와 완전히 같은 정보의 중복 필드였어서 제거하고 integrations
// 하나로 통일했다. gpio 는 고유 정보라 유지, dimensions 는 d&b D90 에는
// 있지만 L-Acoustics 스펙 텍스트에는 명시된 적 없어 null.
export const LA_AMPLIFIERS = [
  {
    "id": "amp-la-la1dot16i",
    "mfr": "la",
    "model": "LA1.16i",
    "views": [
      { "label": "Front", "src": "public/assets/img/amplifiers/la/amp-la-la1dot16i-front.webp" },
      { "label": "Rear", "src": "public/assets/img/amplifiers/la/amp-la-la1dot16i-rear.webp" },
      { "label": "Isometric", "src": "public/assets/img/amplifiers/la/amp-la-la1dot16i-isometric.webp" }
    ],
    "channels": 16,
    "powerClass": "High-efficiency Class D",
    "connectivity": [
      "Milan-AVB",
      "AES67",
      "AES/EBU",
      "analog"
    ],
    "notes": "New AES67 compatible Amplified Controller. Fixed Install, MILAN-Certified Redundancy. Multi-channel amplified controller for install.",
    "type": "Amplified Controller",
    "usage": "Fixed Install",
    "architecture": "16 x 16 with bridge mode",
    "ipRating": "IP20",
    "rackUnit": 1,
    "weight": 5.6,
    "weightLb": 12.3,
    "cooling": null,
    "operatingTemp": "-5 °C / 23 °F to 50 °C / 122 °F",
    "ampClass": "High-efficiency Class D",
    "mains": {
      "rating": "100 V - 240 V ± 10%, 50 Hz - 60 Hz",
      "connector": null,
      "powerRequirements": "10 A (220-240 V), 15 A (120 V), 20 A (100 V)"
    },
    "powerSupply": "Universal Switched Mode Power Supply (SMPS) with Power Factor Correction (PFC)",
    "externalDspBackup": "24 V DC",
    "io": {
      "analogIn": "1 channel analog",
      "aesIn": "2 channels AES/EBU (1 x AES3) with SRC",
      "networkAudio": "Milan-AVB — 16 channels from up to 16 streams (of up to 8 channels each), AES67 — 16 channels from up to 16 streams (of up to 8 channels each) (48 kHz only)",
      "networkRedundancy": "Milan-certified with seamless network redundancy",
      "connections": "2 x etherCON 1 Gb/s I/O + control, 1 x male 12-point terminal block (AES3 or Analog input/link + GPIO)"
    },
    "output": {
      "channels": 16,
      "connectors": "8 x female 4-point terminal blocks",
      "minImpedance": "4 ohms",
      // [검증 필요] 이전에 있던 "1200 W" 총합 값은 사용자가 재확인한 공식
      // 스펙 텍스트 어디에도 근거가 없어(16x80=1280W, 16x160=2560W 어느 쪽과도
      // 안 맞음) 제거했다. 채널당 정격만 확실한 데이터이므로 powerTotal 은
      // null 로 비워두고 카드/게이지 모두 "N x W" 채널당 표기만 사용한다.
      "powerTotal": null,
      "power8ohms": "16 x 80 W",
      "power4ohms": "16 x 160 W",
      "powerBtl8ohms": "8 x 300 W",
      "powerByOhm": [
        { "ohm": "4 Ω", "power": "16 x 160 W" },
        { "ohm": "8 Ω", "power": "16 x 80 W" },
        { "ohm": "8 Ω (bridge)", "power": "8 x 300 W" }
      ],
      "maxVoltage": null,
      "maxCurrent": null
    },
    "dsp": {
      "engine": "Gen.5 Dual SHARC 32-bit, floating point",
      "sampleRateInternal": "96 kHz",
      "sampleRateAesIn": null,
      "sampleRateNetworkIn": null,
      "bitDepth": "32-bit floating point",
      "routing": "16 x 16 routing and summation matrix",
      "eqSpecs": "8 IIR, 4 FIR linear phase EQ filters per output channel",
      "presetLibrary": "L-SMART enclosure layout library shared with LA7.16(i), memory locations 01-074",
      "latencyStandard": "3.84 ms",
      "latencyLow": "1.18 ms",
      "delaySetting": null,
      "dynamicRange": null
    },
    "ecosystem": {
      "controlSoft": "L-Acoustics remote control software, LA Network Manager",
      "integrations": [
        "Q-SYS",
        "Crestron",
        "HTTP",
        "WebUI"
      ]
    },
    "features": [
      "Array morphing (LF contour, zoom factor)",
      "Air absorption compensation filters",
      "Internal IIR and FIR EQ algorithms",
      "L-DRIVE advanced system protection",
      "L-SMART adaptative power management",
      "Loudspeaker management",
      "Amplifier management",
      "Output delay from 0 to 1000 ms"
    ],
    "note": {
      "modelType": "Multi-channel amplified controller for install.",
      "channelProcessing": "Built-in EQ station with 8 IIR, 4 FIR linear phase EQ filters per output channel. Array morphing (LF contour, zoom factor), Air absorption compensation filters. Internal IIR and FIR EQ algorithms for speaker phase linearization and improved impulse responses.",
      "protection": "Mains and power supply: over and under voltage / over temperature / overcurrent. Power outputs: overcurrent / DC / short circuit / over temperature.",
      "interface": "Display: LED's only."
    },
    "circuitProtection": {
      "mainsAndPowerSupply": "Over and under voltage / over temperature / overcurrent",
      "powerOutputs": "Overcurrent / DC / short circuit / over temperature"
    },
    "interfaceInfo": {
      "displayIndicators": "LED's only",
      "navigation": null
    },
    "gpio": "3 in/out on 12 point terminal block",
    "dimensions": null,
    "configs": [],
    "relations": {
      "speakerIds": []
    }
  },
  {
    // [신규 추가] 사용자 제공 자료(LA2Xi_SP_EN_1.5.pdf 스펙시트, LA2Xi_AE_EN.docx
    // 제품등록정보, LA2Xi_OM_EN.pdf 사용설명서) 기준 작성. 기존 LA1.16i/LA12X/
    // LA4X/LA7.16 과 완전히 동일한 필드 구조를 따른다. BTL/PBTL 출력처럼 기존
    // 필드로 다 담기지 않는 세부 스펙(4채널 SE/2채널 BTL/1채널 PBTL 3가지
    // 브릿지 모드별 임피던스-출력)은 output.powerByOhm 에 5개 항목으로 모두
    // 나열해 담았다(다른 앰프의 powerByOhm 은 보통 2-3개 임피던스뿐이라 이
    // 앰프만 항목이 많음 — 원본 스펙시트 표 자체가 5개 열이라 그대로 반영).
    "id": "amp-la-la2xi",
    "mfr": "la",
    "model": "LA2Xi",
    "views": [
      { "label": "Front", "src": "public/assets/img/amplifiers/la/amp-la-la2xi-front.webp" },
      { "label": "Rear", "src": "public/assets/img/amplifiers/la/amp-la-la2xi-rear.webp" },
      { "label": "Isometric", "src": "public/assets/img/amplifiers/la/amp-la-la2xi-isometric.webp" }
    ],
    "channels": 4,
    "powerClass": "High-efficiency Class D",
    "connectivity": [
      "Milan-AVB",
      "AES67",
      "AES/EBU",
      "analog"
    ],
    "notes": "New AES67 compatible Amplified Controller. Fixed Install, MILAN-Certified Redundancy. Amplified controller for install.",
    "type": "Amplified Controller",
    "usage": "Fixed Install",
    "architecture": "4 x 4 with bridge modes",
    "ipRating": "IP2x",
    "rackUnit": 1,
    "weight": 4.4,
    "weightLb": 9.7,
    "cooling": "2 integrated, temperature-controlled fans",
    "operatingTemp": "0 °C / 32 °F to +50 °C / 122 °F",
    "ampClass": "High-efficiency Class D",
    "mains": {
      "rating": "100 V - 240 V ±10%, 50-60 Hz",
      "connector": null,
      "powerRequirements": "10 A (200-240 V)"
    },
    "powerSupply": "Universal Switched Mode Power Supply (SMPS) with Power Factor Correction (PFC)",
    "externalDspBackup": "24 V DC",
    "io": {
      "analogIn": "4 channels",
      "aesIn": "4 channels (2 x AES/EBU, 44.1 - 192 kHz sampling rate) with active link outputs and bypass relay",
      "networkAudio": "Milan-AVB — 4 channels from 1 stream (of up to 8 channels), AES67 — 4 channels from 1 stream (of up to 8 channels each) (48 kHz only)",
      "networkRedundancy": "Milan-certified with seamless network redundancy",
      "connections": "2 x etherCON 1 Gb/s I/O + control, 4 x male 3-point terminal blocks (2 x switching analog/AES3), 2 x male 3-point terminal block AES3 active links. Optional I/O-CON panel (adds 6 x Neutrik XLR + 2 x speakON)"
    },
    "output": {
      "channels": 4,
      "connectors": "2 x female 4-point terminal blocks (Optional I/O-CON panel)",
      "minImpedance": "4 ohms",
      "powerTotal": "4 x 640 W(4Ω)",
      "power8ohms": "4 x 360 W",
      "power4ohms": "4 x 640 W",
      "powerBtl8ohms": "2 x 1260 W",
      "powerByOhm": [
        { "ohm": "4 Ω (SE)", "power": "4 x 640 W" },
        { "ohm": "8 Ω (SE)", "power": "4 x 360 W" },
        { "ohm": "16 Ω (SE)", "power": "4 x 190 W" },
        { "ohm": "8 Ω (BTL)", "power": "2 x 1260 W" },
        { "ohm": "4 Ω (PBTL)", "power": "1 x 2550 W" }
      ],
      "maxVoltage": null,
      "maxCurrent": null
    },
    "dsp": {
      "engine": "Gen.4 Dual SHARC 32-bit, floating point",
      "sampleRateInternal": "96 kHz",
      "sampleRateAesIn": "44.1 - 192 kHz",
      "sampleRateNetworkIn": "48 / 96 kHz",
      "bitDepth": "32-bit floating point",
      "routing": "Flexible 4x4 routing matrix",
      "eqSpecs": "8 IIR, 4 FIR linear phase EQ filters per output channel",
      "presetLibrary": "Factory presets for all L-Acoustics loudspeakers, memory locations 011-093, 10 user memories",
      "latencyStandard": "3.84 ms",
      "latencyLow": "0.76 ms",
      "delaySetting": "0 to 1000 ms",
      "dynamicRange": "> 113 dB (20 Hz - 20 kHz, 8 Ω, A-weighted, digital input)"
    },
    "ecosystem": {
      "controlSoft": "L-Acoustics remote control software, LA Network Manager",
      "integrations": [
        "Q-SYS",
        "Crestron",
        "Control4",
        "Savant",
        "HTTP"
      ]
    },
    "features": [
      "Array morphing (LF contour, zoom factor)",
      "Air absorption compensation filters",
      "Internal IIR and FIR EQ algorithms",
      "L-DRIVE advanced system protection",
      "Loudspeaker management",
      "Output delay from 0 to 1000 ms"
    ],
    "note": {
      "modelType": "Four-channel amplified controller dedicated to permanent installations. Ideal for background music systems, distributed fills, studio monitors and private auditorium systems.",
      "channelProcessing": "Built-in EQ station with 8 IIR, 4 FIR EQ filters per output channel. Array morphing (LF contour, zoom factor), Air absorption compensation filters. Internal IIR and FIR EQ algorithms for speaker phase linearization and improved impulse responses. Distortion THD+N < 0.1% (20 Hz - 20 kHz, 8 Ω, 60 W output power). Channel separation > 80 dB (1 kHz, 8 Ω, 60 W). Noise level < -77 dBV.",
      "protection": "Mains and power supply: over and under voltage / over temperature / overcurrent / inrush current protection. Power outputs: over current limiting / DC / short circuit / over temperature.",
      "interface": "Display/indicators: LED's only (power, network, status, per-channel signal/limit/clip)."
    },
    "circuitProtection": {
      "mainsAndPowerSupply": "Over and under voltage / over temperature / overcurrent / inrush current protection",
      "powerOutputs": "Over current limiting / DC / short circuit / over temperature"
    },
    "interfaceInfo": {
      "displayIndicators": "LED's only",
      "navigation": null
    },
    "gpio": "4 in/out on 10 point terminal block",
    "dimensions": { "mm": "483 x 44.45 (1U) x 265 mm", "in": "19 x 1.75 (1U) x 10.4 in" },
    "configs": [],
    "relations": {
      "speakerIds": []
    }
  },
  {
    "id": "amp-la-la12x",
    "mfr": "la",
    "model": "LA12X",
    "views": [
      { "label": "Front", "src": "public/assets/img/amplifiers/la/amp-la-la12x-front.webp" },
      { "label": "Rear", "src": "public/assets/img/amplifiers/la/amp-la-la12x-rear.webp" },
      { "label": "Isometric", "src": "public/assets/img/amplifiers/la/amp-la-la12x-isometric.webp" }
    ],
    "channels": 4,
    "powerClass": "Class D",
    "connectivity": [
      "Milan-AVB",
      "AES/EBU",
      "analog"
    ],
    "notes": "Amplified Controller. MILAN-Certified Redundancy.",
    "type": "Amplified Controller",
    "usage": null,
    "architecture": "4 x 4",
    "ipRating": "IP20",
    "rackUnit": 2,
    "weight": 14.5,
    "weightLb": 32,
    "cooling": null,
    "operatingTemp": "0º C / 32º F to +50º C / 122º F",
    "ampClass": "Class D",
    "mains": {
      "rating": "100 V - 240 V ±10%, 50-60 Hz",
      "connector": null,
      "powerRequirements": null
    },
    "powerSupply": "Universal Switched Mode Power Supply (SMPS) with Power Factor Correction (PFC)",
    "externalDspBackup": null,
    "io": {
      "analogIn": "4 channels",
      "aesIn": "4 channels AES/EBU (2 x AES3) with SRC",
      "networkAudio": "Milan-AVB — 4 channels from 1 stream (of up to 8 channels)",
      "networkRedundancy": "Milan-certified with seamless network redundancy",
      "connections": "2 x etherCON 1 Gb/s I/O + control, 4 x female 3-pin XLR (2 x switching analog/AES3), 4 x male 3-pin XLR links"
    },
    "output": {
      "channels": 4,
      "connectors": "2 × 4-point speakON®, 1 × 8-point CA-COM",
      "minImpedance": "2.7 ohms",
      "powerTotal": "4 x 3300 W(2.7Ω)",
      "power8ohms": null,
      "power4ohms": null,
      "powerBtl8ohms": null,
      "powerByOhm": [
        { "ohm": "2.7 Ω", "power": "4 x 3300 W" },
        { "ohm": "4 Ω", "power": "4 x 2600 W" },
        { "ohm": "8 Ω", "power": "4 x 1400 W" }
      ],
      "maxVoltage": null,
      "maxCurrent": null
    },
    "dsp": {
      "engine": "Dual SHARC 32-bit, floating point",
      "sampleRateInternal": "96 kHz",
      "sampleRateAesIn": null,
      "sampleRateNetworkIn": null,
      "bitDepth": "32-bit floating point",
      "routing": "Flexible 4x4 routing matrix",
      "eqSpecs": "8 IIR, 4 FIR linear phase EQ filters per output channel",
      "presetLibrary": "Factory presets for all L-Acoustics loudspeakers, memory locations 011-138, 10 user memories",
      "latencyStandard": "3.84 ms",
      "latencyLow": "0.84 ms",
      "delaySetting": null,
      "dynamicRange": null
    },
    "ecosystem": {
      "controlSoft": "L-Acoustics remote control software, LA Network Manager",
      "integrations": [
        "Q-SYS",
        "Crestron",
        "Control4",
        "Savant",
        "SNMP",
        "Extron"
      ]
    },
    "features": [
      "Array morphing",
      "Air absorption compensation filters",
      "Internal IIR and FIR EQ algorithms",
      "L-DRIVE advanced system protection",
      "Loudspeaker management",
      "Output delay from 0 to 1000 ms"
    ],
    "note": {
      "modelType": null,
      "channelProcessing": "Built-in EQ station with 8 IIR, 4 FIR linear phase EQ filters per output channel. Array morphing, Air absorption compensation filters. Internal IIR and FIR EQ algorithms.",
      "protection": "Mains and power supply: over and under voltage / over temperature / overcurrent. Power outputs: over current / DC / short circuit / rail over and under voltage / over temperature.",
      "interface": "Display/indicators: LCD and LED's. Navigation: Rotary encoder, power and mute keys."
    },
    "circuitProtection": {
      "mainsAndPowerSupply": "Over and under voltage / over temperature / overcurrent",
      "powerOutputs": "Over current / DC / short circuit / rail over and under voltage / over temperature"
    },
    "interfaceInfo": {
      "displayIndicators": "LCD and LED's",
      "navigation": "Rotary encoder, power and mute keys"
    },
    "gpio": null,
    "dimensions": null,
    "configs": [],
    "relations": {
      "speakerIds": []
    }
  },
  {
    "id": "amp-la-la4x",
    "mfr": "la",
    "model": "LA4X",
    "views": [
      { "label": "Front", "src": "public/assets/img/amplifiers/la/amp-la-la4x-front.webp" },
      { "label": "Rear", "src": "public/assets/img/amplifiers/la/amp-la-la4x-rear.webp" },
      { "label": "Isometric", "src": "public/assets/img/amplifiers/la/amp-la-la4x-isometric.webp" }
    ],
    "channels": 4,
    "powerClass": "Class D",
    "connectivity": [
      "Milan-AVB",
      "AES/EBU",
      "analog"
    ],
    "notes": "Amplified Controller. MILAN-Certified.",
    "type": "Amplified Controller",
    "usage": null,
    "architecture": "4 x 4",
    "ipRating": "IP30",
    "rackUnit": 2,
    "weight": 11.3,
    "weightLb": 24.9,
    "cooling": null,
    "operatingTemp": "0º C / 32º F to +50º C / 122º F",
    "ampClass": "Class D",
    "mains": {
      "rating": "100 V - 240 V ±10%, 50-60 Hz",
      "connector": null,
      "powerRequirements": null
    },
    "powerSupply": "Universal Switched Mode Power Supply (SMPS) with Power Factor Correction (PFC)",
    "externalDspBackup": null,
    "io": {
      "analogIn": "4 channels",
      "aesIn": "4 channels AES/EBU (2 x AES3) with SRC",
      "networkAudio": "Milan-AVB — 4 channels from 1 stream (of up to 8 channels)",
      "networkRedundancy": "Milan-certified with seamless network redundancy",
      "connections": "2 x etherCON 1 Gb/s I/O + control, 4 x female 3-pin XLR (2 x switching analog/AES3), 4 x male 3-pin XLR links"
    },
    "output": {
      "channels": 4,
      "connectors": "4 x SpeakON",
      "minImpedance": "4 ohms",
      "powerTotal": "4 x 1000 W(4/8Ω)",
      "power8ohms": "4 x 1000 W",
      "power4ohms": "4 x 1000 W",
      "powerBtl8ohms": null,
      "powerByOhm": [
        { "ohm": "4 Ω", "power": "4 x 1000 W" },
        { "ohm": "8 Ω", "power": "4 x 1000 W" }
      ],
      "maxVoltage": null,
      "maxCurrent": null
    },
    "dsp": {
      "engine": "SHARC 32-bit, floating point",
      "sampleRateInternal": "96 kHz",
      "sampleRateAesIn": null,
      "sampleRateNetworkIn": null,
      "bitDepth": "32-bit floating point",
      "routing": "Flexible 4x4 routing matrix",
      "eqSpecs": "8 IIR, 4 FIR linear phase EQ filters per output channel",
      "presetLibrary": "Factory presets for all L-Acoustics loudspeakers, memory locations 011-127, 10 user memories",
      "latencyStandard": "3.84 ms",
      "latencyLow": "0.84 ms",
      "delaySetting": null,
      "dynamicRange": null
    },
    "ecosystem": {
      "controlSoft": "L-Acoustics remote control software, LA Network Manager",
      "integrations": [
        "Q-SYS",
        "Crestron",
        "Control4",
        "Savant",
        "SNMP",
        "Extron"
      ]
    },
    "features": [
      "Array morphing",
      "Air absorption compensation filters",
      "Internal IIR and FIR EQ algorithms",
      "L-DRIVE advanced system protection",
      "Loudspeaker management",
      "Output delay from 0 to 1000 ms"
    ],
    "note": {
      "modelType": null,
      "channelProcessing": "Built-in EQ station with 8 IIR, 4 FIR linear phase EQ filters per output channel. Array morphing, Air absorption compensation filters. Internal IIR and FIR EQ algorithms.",
      "protection": "Mains and power supply: over and under voltage / over temperature / overcurrent. Power outputs: overcurrent / short circuit / over temperature.",
      "interface": "Display/indicators: LCD and LED's. Navigation: Rotary encoder, power and mute keys."
    },
    "circuitProtection": {
      "mainsAndPowerSupply": "Over and under voltage / over temperature / overcurrent",
      "powerOutputs": "Overcurrent / short circuit / over temperature"
    },
    "interfaceInfo": {
      "displayIndicators": "LCD and LED's",
      "navigation": "Rotary encoder, power and mute keys"
    },
    "gpio": null,
    "dimensions": null,
    "configs": [],
    "relations": {
      "speakerIds": []
    }
  },
  {
    "id": "amp-la-la7dot16",
    "mfr": "la",
    "model": "LA7.16",
    "views": [
      { "label": "Front", "src": "public/assets/img/amplifiers/la/amp-la-la7dot16-front.webp" },
      { "label": "Rear", "src": "public/assets/img/amplifiers/la/amp-la-la7dot16-rear.webp" },
      { "label": "Isometric", "src": "public/assets/img/amplifiers/la/amp-la-la7dot16-isometric.webp" }
    ],
    "channels": 16,
    "powerClass": "High-efficiency Class D",
    "connectivity": [
      "Milan-AVB",
      "AES/EBU",
      "analog"
    ],
    "notes": "Amplified Controller. MILAN-Certified Redundancy. Multi-channel amplified controller.",
    "type": "Amplified Controller",
    "usage": null,
    "architecture": "16 x 16",
    "ipRating": null,
    "rackUnit": 2,
    "weight": 15.8,
    "weightLb": 34.8,
    "cooling": null,
    "operatingTemp": "-5º C / 23º F to +50º C / 122º F",
    "ampClass": "High-efficiency Class D",
    "mains": {
      "rating": "100 V - 240 V ±10%, 50-60 Hz",
      "connector": "32 A powerCON",
      "powerRequirements": "16 A (200-240 V), 30 A (100-120 V)"
    },
    "powerSupply": "Universal Switched Mode Power Supply (SMPS) with Power Factor Correction (PFC)",
    "externalDspBackup": "24 V DC",
    "io": {
      "analogIn": "1 channel",
      "aesIn": "2 channels AES/EBU (1 x AES3) with SRC",
      "networkAudio": "Milan-AVB — 16 channels from up to 16 streams (of up to 8 channels each)",
      "networkRedundancy": "Milan-certified with seamless network redundancy",
      "connections": "2 x etherCON 1 Gb/s I/O + control, 1 x male 12-point terminal block (AES3 or Analog input/link + GPIO)"
    },
    "output": {
      "channels": 16,
      "connectors": "1 x SC32 connector",
      "minImpedance": "4 ohms",
      "powerTotal": "16 x 1300 W(8Ω)",
      "power8ohms": "16 x 1300 W",
      "power4ohms": "16 x 1100 W",
      "powerBtl8ohms": null,
      "powerByOhm": [
        { "ohm": "4 Ω", "power": "16 x 1100 W" },
        { "ohm": "8 Ω", "power": "16 x 1300 W" },
        { "ohm": "16 Ω", "power": "16 x 700 W" }
      ],
      "maxVoltage": null,
      "maxCurrent": null
    },
    "dsp": {
      "engine": "Gen.5 Dual SHARC 32-bit, floating point",
      "sampleRateInternal": "96 kHz",
      "sampleRateAesIn": null,
      "sampleRateNetworkIn": null,
      "bitDepth": "32-bit floating point",
      "routing": "16 x 16 routing and summation matrix",
      "eqSpecs": "8 IIR, 4 FIR linear phase EQ filters per output channel",
      "presetLibrary": "L-SMART enclosure layout library, memory locations 01-074",
      "latencyStandard": "3.84 ms",
      "latencyLow": "1.18 ms",
      "delaySetting": null,
      "dynamicRange": null
    },
    "ecosystem": {
      "controlSoft": "L-Acoustics remote control software, LA Network Manager",
      "integrations": [
        "Q-SYS",
        "Crestron"
      ]
    },
    "features": [
      "Array morphing (LF contour, zoom factor)",
      "Air absorption compensation filters",
      "Internal IIR and FIR EQ algorithms",
      "L-DRIVE advanced system protection",
      "L-SMART adaptative power management",
      "Loudspeaker management",
      "Amplifier management",
      "Output delay from 0 to 1000 ms"
    ],
    "note": {
      "modelType": "Multi-channel amplified controller.",
      "channelProcessing": "Built-in EQ station with 8 IIR, 4 FIR linear phase EQ filters per output channel. Array morphing (LF contour, zoom factor), Air absorption compensation filters. Internal IIR and FIR EQ algorithms for speaker phase linearization and improved impulse responses.",
      "protection": "Mains and power supply: over and under voltage / over temperature / overcurrent. Power outputs: overcurrent / DC / short circuit / over temperature.",
      "interface": "Display/indicators: 1 TFT color touchscreen display (480 × 128 px). Navigation: 1 encoding wheel with push button."
    },
    "circuitProtection": {
      "mainsAndPowerSupply": "Over and under voltage / over temperature / overcurrent",
      "powerOutputs": "Overcurrent / DC / short circuit / over temperature"
    },
    "interfaceInfo": {
      "displayIndicators": "1 TFT color touchscreen display (480 × 128 px)",
      "navigation": "1 encoding wheel with push button"
    },
    "gpio": "3 in/out on 12 point terminal block",
    "dimensions": null,
    "configs": [],
    "relations": {
      "speakerIds": []
    }
  },
  {
    // [Racks 카테고리] 개별 앰프가 아니라 LA7.16 3대 + LS10 AVB 스위치 2대 +
    // LA-PANEL III/LA-POWER II(오디오/전원 배전)를 담은 투어링 랙 시스템 —
    // 사용자 요청으로 앰프 탭에 "Racks"로 분류. 원문(raw-data/raw-specs/la/
    // amplifiers/rack/la-rak-iii.md) 전체를 반영해 랙 고유 구조
    // (rack: content/audioDistribution/powerDistribution/cables/rigging/
    // physical)로 담았다 — 개별 앰프 필드(dsp/io/output 등)는 "1대 기준"
    // 스펙이라 랙에는 대부분 해당 없어(null) amplifiers.view.js 가
    // a.type === "Rack" 일 때 전용 렌더 경로(모달 섹션 우선순위: General →
    // Content → Power Distribution → Audio Distribution → Cables →
    // Physical → Rigging & Handling → Notes)로 분기해 보여준다.
    "id": "amp-la-la-rak-iii",
    "mfr": "la",
    "model": "LA-RAK III",
    "views": [
      { "label": "Front", "src": "public/assets/img/amplifiers/la/amp-la-la-rak-iii-front.webp" },
      { "label": "Rear", "src": "public/assets/img/amplifiers/la/amp-la-la-rak-iii-rear.webp" },
      { "label": "Isometric", "src": "public/assets/img/amplifiers/la/amp-la-la-rak-iii-isometric.webp" }
    ],
    "channels": 48,
    "powerClass": "High-efficiency Class D",
    "connectivity": [
      "Milan-AVB",
      "AES/EBU",
      "analog"
    ],
    "notes": "Touring rack with 3 LA7.16. MILAN-Certified Redundancy.",
    "type": "Rack",
    "usage": "Touring",
    "architecture": "3 x LA7.16 (48 channels of amplification)",
    "ipRating": null,
    "rackUnit": 9,
    "weight": 117.5,
    "weightLb": 259,
    "cooling": null,
    "operatingTemp": null,
    "ampClass": "High-efficiency Class D",
    "mains": { "rating": null, "connector": null, "powerRequirements": "Three-phase 32 A IEC in/link, 30 A NEMA for 110 V" },
    "powerSupply": null,
    "externalDspBackup": null,
    "io": null,
    "output": {
      "channels": 48,
      "connectors": null,
      "minImpedance": "8 ohms",
      "powerTotal": "Up to 62,400 W at 8 ohms",
      "power8ohms": null,
      "power4ohms": null,
      "powerBtl8ohms": null,
      "powerByOhm": [],
      "maxVoltage": null,
      "maxCurrent": null
    },
    "dsp": null,
    "ecosystem": {
      "controlSoft": "L-Acoustics remote control software, LA Network Manager",
      "integrations": []
    },
    "features": [
      "MILAN-Certified Redundancy",
      "Milan-certified with seamless network redundancy"
    ],
    "note": null,
    "circuitProtection": null,
    "interfaceInfo": null,
    "gpio": null,
    "dimensions": null,
    "configs": [],
    "relations": {
      "speakerIds": []
    },
    // [Rack 전용 데이터] 원문(la-rak-iii.md) 섹션을 그대로 구조화 — 아래
    // 필드들은 amplifiers.view.js 의 Rack 전용 렌더 경로에서만 사용된다.
    "rack": {
      "content": [
        { "label": "Amplification", "value": "3 LA7.16 Amplified controllers" },
        { "label": "Network", "value": "2 LS10 AVB switches" },
        { "label": "Distribution", "value": "1 LA-PANEL III for audio distribution, 1 LA-POWER II for power distribution" },
        { "label": "Misc", "value": "2 doors, cables and 2 coupling bars" }
      ],
      "audioDistribution": [
        { "label": "Analog input / link", "value": "3 x female Neutrik® XLR3 (IN) / 3 x male Neutrik® XLR3 (LINK) (Shared with AES/EBU)" },
        { "label": "AES/EBU", "value": "3 x female Neutrik® XLR3 (IN) / 3 x male Neutrik® XLR3 (LINK) (Shared with Analog)" },
        { "label": "Analog input / link (rear)", "value": "3 x 12-point terminal block connectors (Shared with AES/EBU)" },
        { "label": "AES/EBU (rear)", "value": "3 x 12-point terminal block connectors (Shared with Analog)" }
      ],
      "powerDistribution": [
        { "label": "AC input (US)", "value": "30 A - NEMA L21-30P (3P+N+E) male outlet" },
        { "label": "AC input/link out (EU)", "value": "32 A - IEC 60309 (3P+N+E) male outlet / 32 A - IEC 60309 (3P+N+E) female outlet" },
        { "label": "AC presence", "value": "3 x dual LEDs: Left: US AC input / right: EU AC input" },
        { "label": "AC auxiliary output (US)", "value": "NEMA 5-15 female outlet (AUX US MODE)" },
        { "label": "AC auxiliary output (EU)", "value": "Type F «Schuko» female outlet (AUX EU MODE)" },
        { "label": "Protection", "value": "10 A type C circuit breaker (AUX L3)" },
        { "label": "AC output for LA12X (rear)", "value": "3 x power cords fitted with 32 A Neutrik powerCON® connectors (AMP 1 L1, AMP 2 L2, AMP 3 L3)" },
        { "label": "AC input selector switch (rear)", "value": "Switch between EU MODE and US MODE" },
        { "label": "AC output for LS10 (rear)", "value": "2 x IEC 60320-1 type C13 female outlets (AUX L3)" }
      ],
      "network": "Milan-certified with seamless network redundancy",
      "cables": [
        { "label": "Analog", "value": "3 ANALOG OUT XLR3 male/female labeled cables, 1.10 m / 3.61 ft; 3 ANALOG XLR3 male/female labeled cables, 0.55 m / 1.8 ft" },
        { "label": "AES / EBU", "value": "3 AES3 OUT XLR3 male/female labeled cables, 1.10 m / 3.61 ft; 3 AES3 LINK XLR3 male/female labeled cables, 1.10 m / 3.61 ft; 2 AES3 XLR3 male/female labeled cables, 0.55 m / 1.8 ft" },
        { "label": "Network", "value": "3 CAT7 red Ethernet labeled cables, 1 m / 3 ft; 3 CAT7 black Ethernet labeled cables, 1 m / 3 ft; 2 RJ45 blockout cover for LA-PANEL II" }
      ],
      "rigging": "Storage and transportation: 2 coupling bars, 2 coupling rails, 4 handles, 1 dolly board.",
      "material": "Polyethylene, aluminium and steel external structure, LEXAN® polycarbonate doors.",
      // [System Elements 연결] l-acoustics.com/products/la-rak-iii/ 제품
      // 페이지의 "System Elements" 목록을 사용자가 채팅으로 제공한 그대로
      // 전량 반영(리깅 3 + 케이블 다수 — 원문:
      // raw-data/raw-specs/la/accessories/system-elements.md 참고).
      // accessories.data.js 는 길이만 다른 변형을 lengths 배열로 통합해
      // 최상위 레코드 1개로 관리하므로(예: DOE2/45/100 → acc-la-doe),
      // findAccessoryById() 가 최상위 id 로만 조회 가능한 점에 맞춰 여기도
      // 통합 레코드의 최상위 id 를 참조한다(개별 길이 id 아님).
      "relatedAccessoryIds": ["acc-la-la-rakmount", "acc-la-la-rak-bump-iii", "acc-la-pow2", "acc-la-doe", "acc-la-bob32", "acc-la-dosub-la8", "acc-la-sc32-4do", "acc-la-sc32", "acc-la-dom-cross", "acc-la-domf", "acc-la-do"]
    }
  },
  {
    // [Racks 카테고리] LA-RAK III 와 동일한 패턴 — LA12X 3대 + LS10 AVB
    // 스위치 2대 + LA-PANEL II/LA-POWER II 를 담은 투어링 랙. 원문은
    // raw-data/raw-specs/la/amplifiers/rack/la-rak-ii-avb.md 참고.
    "id": "amp-la-la-rak-ii-avb",
    "mfr": "la",
    "model": "LA-RAK II AVB",
    "views": [],
    "channels": 12,
    "powerClass": "Class D",
    "connectivity": [
      "Milan-AVB",
      "AES/EBU",
      "analog"
    ],
    "notes": "Touring rack with 3 LA12X. MILAN-Certified Redundancy.",
    "type": "Rack",
    "usage": "Touring",
    "architecture": "3 x LA12X (12 channels of amplification)",
    "ipRating": null,
    "rackUnit": 9,
    "weight": 101.5,
    "weightLb": 223.8,
    "cooling": null,
    "operatingTemp": null,
    "ampClass": "Class D",
    "mains": { "rating": null, "connector": null, "powerRequirements": "Three-phase 32 A IEC in/link, 30 A NEMA for 110 V" },
    "powerSupply": null,
    "externalDspBackup": null,
    "io": null,
    "output": {
      "channels": 12,
      "connectors": null,
      "minImpedance": "2.7 ohms",
      "powerTotal": "Up to 40,000 W at 2.7 ohms",
      "power8ohms": null,
      "power4ohms": null,
      "powerBtl8ohms": null,
      "powerByOhm": [],
      "maxVoltage": null,
      "maxCurrent": null
    },
    "dsp": null,
    "ecosystem": {
      "controlSoft": "L-Acoustics remote control software, LA Network Manager",
      "integrations": []
    },
    "features": [
      "MILAN-Certified Redundancy",
      "Milan-certified with seamless network redundancy"
    ],
    "note": null,
    "circuitProtection": null,
    "interfaceInfo": null,
    "gpio": null,
    "dimensions": null,
    "configs": [],
    "relations": {
      "speakerIds": []
    },
    "rack": {
      "content": [
        { "label": "Amplification", "value": "3 LA12X Amplified controllers" },
        { "label": "Network", "value": "2 LS10 AVB switches" },
        { "label": "Distribution", "value": "1 LA-PANEL II for audio distribution, 1 LA-POWER II for power distribution" },
        { "label": "Misc", "value": "2 doors, cables and 2 coupling bars" }
      ],
      "audioDistribution": [
        { "label": "Analog input / link", "value": "2 x 19-point CA-COM" },
        { "label": "AES/EBU", "value": "3 x female Neutrik® XLR3 (IN) / 3 x male Neutrik® XLR3 (LINK)" },
        { "label": "Analog input / link (rear)", "value": "6 x male Neutrik® XLR3 (IN 1 to IN 6)" },
        { "label": "AES/EBU (rear)", "value": "3 x female Neutrik® XLR3 (IN) / 3 x male Neutrik® XLR3 (LINK)" }
      ],
      "powerDistribution": [
        { "label": "AC input (US)", "value": "30 A - NEMA L21-30P (3P+N+E) male outlet" },
        { "label": "AC input/link out (EU)", "value": "32 A - IEC 60309 (3P+N+E) male outlet / 32 A - IEC 60309 (3P+N+E) female outlet" },
        { "label": "AC presence", "value": "3 x dual LEDs: Left: US AC input / right: EU AC input" },
        { "label": "AC auxiliary output (US)", "value": "NEMA 5-15 female outlet (AUX US MODE)" },
        { "label": "AC auxiliary output (EU)", "value": "Type F «Schuko» female outlet (AUX EU MODE)" },
        { "label": "Protection", "value": "10 A type C circuit breaker (AUX L3)" },
        { "label": "AC output for LA12X (rear)", "value": "3 x power cords fitted with 32 A Neutrik powerCON® connectors (AMP 1 L1, AMP 2 L2, AMP 3 L3)" },
        { "label": "AC input selector switch (rear)", "value": "Switch between EU MODE and US MODE" },
        { "label": "AC output for LS10 (rear)", "value": "2 x IEC 60320-1 type C13 female outlets (AUX L3)" }
      ],
      "network": "Milan-certified with seamless network redundancy",
      "cables": [
        { "label": "Analog", "value": "6 ANALOG OUT XLR3 male/female labeled cables, 1.10 m / 3.61 ft; 2 ANALOG XLR3 male/female labeled cables, 0.55 m / 1.8 ft" },
        { "label": "AES / EBU", "value": "3 AES3 OUT XLR3 male/female labeled cables, 1.10 m / 3.61 ft; 3 AES3 LINK XLR3 male/female labeled cables, 1.10 m / 3.61 ft; 2 AES3 XLR3 male/female labeled cables, 0.55 m / 1.8 ft" },
        { "label": "Network", "value": "3 CAT7 red Ethernet labeled cables, 1 m / 3 ft; 3 CAT7 black Ethernet labeled cables, 1 m / 3 ft; 2 RJ45 blockout cover for LA-PANEL II" }
      ],
      "rigging": "Storage and transportation: 2 coupling bars, 2 coupling rails, 4 handles, 1 dolly board.",
      "material": "Polyethylene, aluminium and steel external structure, LEXAN® polycarbonate doors.",
      // [System Elements 연결] l-acoustics.com/products/la-rak-ii-avb/ 제품
      // 페이지의 "System Elements" 목록을 사용자가 채팅으로 제공한 그대로
      // 전량 반영(카탈로그 25개 전량 — 원문: raw-data/raw-specs/la/amplifiers/
      // rack/la-rak-ii-avb.md 의 System Elements 섹션 참고). accessories.data.js
      // 는 길이만 다른 변형을 lengths 배열로 통합해 최상위 레코드 1개로
      // 관리하므로(예: SP25/10/5/.7 → acc-la-sp) 통합 레코드의 최상위 id 를
      // 참조한다(findAccessoryById() 는 최상위 id 로만 조회 가능).
      "relatedAccessoryIds": ["acc-la-la-rak-bump-iii", "acc-la-la-rakmount", "acc-la-k2-rakmount", "acc-la-pow2", "acc-la-doe", "acc-la-dom-cross", "acc-la-dom2", "acc-la-domp-2", "acc-la-domf", "acc-la-domm", "acc-la-sp", "acc-la-sp-y1", "acc-la-do", "acc-la-dofill-la8", "acc-la-do3wfill", "acc-la-dosub-la8"]
    }
  }
];
