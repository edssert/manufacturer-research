// d&b audiotechnik 앰프 데이터.
// 필드 스키마 설명은 amplifiers.schema.js 참조.
//
// [사용자 요청] 기존 D80/D90/D40/40D(레거시 단순 스키마 — channels/
// powerClass/connectivity/configs/notes/relations 만 있던 자리표시 데이터)를
// 전부 지우고, d&b 공식 제품 페이지 스펙을 근거로 D90 하나만 L-Acoustics
// LA1.16i 와 동일한 상세 필드 구조(mains/io/output/dsp/ecosystem/features/
// note 등 중첩 필드)로 새로 작성했다. 기존 D80/D40/40D 에 걸려 있던
// relations.speakerIds 매칭 정보도 함께 삭제됨(사용자 확인 후 진행) — 추후
// 스피커 매칭 데이터가 확정되면 다시 채운다.
export const DB_AMPLIFIERS = [
  {
    "id": "amp-db-d90",
    "mfr": "db",
    "model": "D90",
    "views": [
      { "label": "Front", "src": "public/assets/img/amplifiers/db/amp-db-d90-front.webp" },
      { "label": "Rear", "src": "public/assets/img/amplifiers/db/amp-db-d90-rear.webp" },
      { "label": "Isometric", "src": "public/assets/img/amplifiers/db/amp-db-d90-isometric.webp" }
    ],
    "channels": 4,
    "powerClass": "Class D",
    "connectivity": [
      "Milan-AVB",
      "AES3",
      "analog"
    ],
    "notes": "Mobile specific four channel amplifier. All current d&b loudspeaker setup.",
    "type": null,
    "usage": null,
    "architecture": null,
    "ipRating": null,
    "rackUnit": 2,
    "weight": 18.8,
    "weightLb": 41.5,
    "cooling": null,
    "operatingTemp": null,
    "ampClass": "Class D",
    "mains": {
      "rating": "100 - 127 / 208 - 240 V, 50 - 60 Hz",
      "connector": "powerCON®-HC",
      "powerRequirements": null
    },
    "powerSupply": "Autosensing switch mode power supply with active Power Factor Correction (PFC)",
    "externalDspBackup": null,
    "io": {
      "analogIn": "4 channels (INPUT ANALOG A1-A4, 3 pin XLR female)",
      "aesIn": "4 channels AES3 (INPUT DIGITAL D1/2, D3/4, 3 pin XLR female)",
      "networkAudio": "Milan — 8 channels (INPUT Network Audio M1-M8, etherCON built-in 5-port AVB Ethernet switch 100/1000 Mbit)",
      "networkRedundancy": "Milan-enabled",
      "connections": "2 x etherCON, ANALOG LINK (3 pin XLR male), DIGITAL LINK Output (3 pin XLR male)"
    },
    "output": {
      "channels": 4,
      "connectors": "Mix TOP/SUB / 2-Way Active output A/B and C/D: 2 x NL4, 4 Channel output: 1 x NL8, Speaker outputs A/B/C/D: 4 x NL4",
      "minImpedance": "4 ohms",
      "powerTotal": "4 x 5400/2700 W(4/8Ω)",
      "power8ohms": "4 x 2700 W",
      "power4ohms": "4 x 5400 W",
      "powerBtl8ohms": null,
      "powerByOhm": [
        { "ohm": "4 Ω", "power": "4 x 5400 W" },
        { "ohm": "8 Ω", "power": "4 x 2700 W" }
      ],
      "maxVoltage": "210 Vpeak",
      "maxCurrent": "78 Apeak"
    },
    "dsp": {
      "engine": null,
      "sampleRateInternal": null,
      "sampleRateAesIn": "44.1, 48, 96, 192 kHz",
      "sampleRateNetworkIn": null,
      "bitDepth": null,
      "routing": null,
      "eqSpecs": "2 x 16-band PEQ/notch/shelving/asymmetric",
      "presetLibrary": "Current d&b loudspeakers (ArrayCalc)",
      "latencyStandard": "0.3 ms",
      "latencyLow": null,
      "delaySetting": "0.3 ms - 10 s",
      "dynamicRange": "119 dB (unweighted)"
    },
    "ecosystem": {
      "controlSoft": "d&b ArrayCalc simulation software, R1 Remote control software",
      "integrations": []
    },
    "features": [
      "AutoStandby and AutoWakeup",
      "Function switches (d&b loudspeaker specific circuits)",
      "Frequency generator (Pink noise or Sine wave 10 Hz - 20 kHz)",
      "Flexible Fallback structure",
      "Comprehensive loudspeaker management",
      "Switchable filter functions",
      "Definable equalization"
    ],
    "note": {
      "modelType": "Mobile specific four channel amplifier for touring and rental production companies.",
      "channelProcessing": "2 x 16-band PEQ/notch/shelving/asymmetric equalizer. Latency 0.3 ms (analog and digital inputs). Delay setting 0.3 ms - 10 s.",
      "protection": null,
      "interface": "Colour TFT touchscreen, 4.3\"/480 x 272 pixel. SCROLL/EDIT digital rotary encoder. Power: Mains power switch."
    },
    "circuitProtection": null,
    "interfaceInfo": {
      "displayIndicators": "Colour TFT touchscreen, 4.3\"/480 x 272 pixel",
      "navigation": "Digital rotary encoder (SCROLL/EDIT), Mains power switch"
    },
    // 원본: "2 RU x 19" x 512 mm / 20.2"" — 랙폭(19")은 고정값이라 mm/in
    // 어느 쪽에도 동일하게 표기하고, 깊이(depth)만 512mm/20.2in 로 환산.
    "dimensions": { "mm": "2 RU x 19\" x 512 mm", "in": "2 RU x 19\" x 20.2\"" },
    "gpio": null,
    "configs": [],
    "relations": {
      "speakerIds": []
    }
  },
  {
    "id": "amp-db-10d",
    "mfr": "db",
    "model": "10D",
    "views": [],
    "channels": 4,
    "powerClass": "Class D",
    "connectivity": [
      "AES3",
      "analog"
    ],
    "notes": "4-channel Class D installation amplifier with integrated DSP (next generation).",
    "type": null,
    "usage": null,
    "architecture": null,
    "ipRating": null,
    "rackUnit": 2,
    "weight": 10.6,
    "weightLb": 23.4,
    "cooling": "2x temperature and level controlled fans (32 - 48 dBA)",
    "operatingTemp": "-10 to 40 (continuous) / -10 to 50 (reduced power)",
    "ampClass": "Class D",
    "mains": {
      "rating": "100 - 240 V, 50 - 60 Hz",
      "connector": "powerCON",
      "powerRequirements": null
    },
    "powerSupply": "Universal range switched mode power supply with active Power Factor Correction (PFC)",
    "externalDspBackup": null,
    "io": {
      "analogIn": "4 channels (INPUT ANALOG A1-A4, 3-pin Phoenix Euroblock male, also used as link output wired in parallel)",
      "aesIn": "4 channels AES3 (INPUT DIGITAL D1/2, D3/4, 3-pin Phoenix Euroblock male)",
      "networkAudio": null,
      "networkRedundancy": null,
      "connections": "2x RJ45 (ETHERNET, 10/100 Mbit, built-in 2-port switch, OCA/AES70), 2x RJ45 (CAN, parallel), FAULT contact (NO/C/NC, 3-pin Phoenix Euroblock male)"
    },
    "output": {
      "channels": 4,
      "connectors": "2x 4-pin Phoenix Euroblock female (SPEAKER OUTPUTS A/B/C/D). Output modes: Dual Channel, Mix TOP/SUB, 2-Way Active (per channel pair)",
      "minImpedance": null,
      "powerTotal": "4 x 700/350 W (4/8 Ω, CF 6/12 dB)",
      "power8ohms": "4 x 350 W",
      "power4ohms": "4 x 700 W",
      "powerBtl8ohms": null,
      "powerByOhm": [
        { "ohm": "4 Ω", "power": "4 x 700 W (CF 6/12 dB)" },
        { "ohm": "8 Ω", "power": "4 x 350 W (CF 6/12 dB)" }
      ],
      "maxVoltage": "82 Vpeak",
      "maxCurrent": null
    },
    "dsp": {
      "engine": null,
      "sampleRateInternal": "96 kHz (internal)",
      "sampleRateAesIn": "48, 96 kHz",
      "sampleRateNetworkIn": null,
      "bitDepth": "27 Bit ADC / 24 Bit DAC",
      "routing": "Up to eight input channels (4 analog + 4 AES3) routable to any of 4 output channels",
      "eqSpecs": "2 x 16-band PEQ/Notch/HiShlv/LoShlv/Asym",
      "presetLibrary": null,
      "latencyStandard": "0.3 ms",
      "latencyLow": null,
      "delaySetting": "0.3 ms - 10 s",
      "dynamicRange": null
    },
    "ecosystem": {
      "controlSoft": "d&b R1 Remote control software, d&b ArrayCalc simulation software",
      "integrations": []
    },
    "features": [
      "LoadMatch (cable compensation up to 70 m)",
      "System check and Load monitoring (LM)",
      "Loudspeaker-specific functions (CUT, HFA, HFC, CSA, CPL)",
      "Fallback / Override",
      "AutoStandby / AutoWakeup",
      "Integrated Web Remote interface",
      "5x opto-coupled GPIO"
    ],
    "note": {
      "modelType": "4-channel Class D installation amplifier (next generation), AES3 + Ethernet(OCA/AES70)/CAN-Bus control.",
      "channelProcessing": "2 x 16-band PEQ/notch/shelving/asymmetric equalizer. Latency 0.3 ms. Delay 0.3 ms - 10 s. S/N ratio >101 dBr (analog) / >103 dBr (digital). Damping factor >80.",
      "protection": "Mains/PSU: voltage monitoring, inrush current limiter, self-resetting overtemperature, under/overvoltage, PFC. Output: ground fault, pop-noise suppression, DC offset, HF voltage limitation, current limitation/protection, self-resetting overtemperature.",
      "interface": "Status LEDs only (POWER, DATA, Mute/ISP/GR/OVL per channel); no display. Integrated Web Remote interface via Ethernet."
    },
    "circuitProtection": null,
    "interfaceInfo": {
      "displayIndicators": "Status LEDs only (POWER, DATA, Mute A/B/C/D, ISP A/B/C/D, GR A/B/C/D, OVL/Error A/B/C/D); no touchscreen or display",
      "navigation": "Web Remote interface (browser-based via Ethernet)"
    },
    "dimensions": { "mm": "2 RU x 19\" x 435 mm", "in": null },
    "gpio": "5x opto-coupled GPIO (configurable per-pin as GPI/GPO), 6-pin Phoenix Euroblock; external 24 VDC required",
    "configs": [],
    "relations": {
      "speakerIds": []
    }
  },
  {
    "id": "amp-db-25d",
    "mfr": "db",
    "model": "25D",
    "views": [],
    "channels": 4,
    "powerClass": "Class D",
    "connectivity": [
      "Milan-AVB",
      "AES3",
      "analog"
    ],
    "notes": "4-channel Class D installation amplifier with integrated DSP, Milan-AVB networked.",
    "type": null,
    "usage": null,
    "architecture": null,
    "ipRating": null,
    "rackUnit": 2,
    "weight": 13.3,
    "weightLb": 29.3,
    "cooling": "2x temperature-dependent RPM fans (30 - 50 dBA), self-resetting overtemperature protection",
    "operatingTemp": "-10 to 40 (continuous) / -10 to 50 (short-term)",
    "ampClass": "Class D",
    "mains": {
      "rating": "100 - 127 / 208 - 240 V, 50 - 60 Hz",
      "connector": "powerCON TRUE1 TOP",
      "powerRequirements": null
    },
    "powerSupply": "Switched mode power supply with automatic mains range selection and active Power Factor Correction (PFC)",
    "externalDspBackup": null,
    "io": {
      "analogIn": "4 channels (INPUT A1-A4, 3-pin Phoenix Euroblock male, also used as link output/cable tap)",
      "aesIn": "4 channels AES3 (INPUT D1/2, D3/4, 3-pin Phoenix Euroblock male)",
      "networkAudio": "Milan — 1 redundant stream, up to 8 channels @ 48/96 kHz (Routable Milan inputs M1-M8), 2x RJ45 etherCON",
      "networkRedundancy": "Milan redundancy, always active (ETH1/PRI + ETH2/SEC)",
      "connections": "2x RJ45 etherCON (ETHERNET 1/PRI, ETHERNET 2/SEC), digital LINK out (D1/2, D3/4), FAULT contact (NO/C/NC, 3-pin Phoenix Euroblock male)"
    },
    "output": {
      "channels": 4,
      "connectors": "2x 4-pin Phoenix Euroblock female (A/B, C/D pairs, hardwired). Output modes: Dual Channel, Mix TOP/SUB, 2-Way Active (per channel pair)",
      "minImpedance": null,
      "powerTotal": "4 x 1800/900 W (4/8 Ω, CF 12 dB); 4 x 250 W long term (4 Ω)",
      "power8ohms": "4 x 900 W",
      "power4ohms": "4 x 1800 W",
      "powerBtl8ohms": null,
      "powerByOhm": [
        { "ohm": "4 Ω", "power": "4 x 1800 W (CF 12 dB) / 4 x 250 W (long term)" },
        { "ohm": "8 Ω", "power": "4 x 900 W (CF 12 dB)" }
      ],
      "maxVoltage": "120 Vpeak",
      "maxCurrent": "35 Apeak"
    },
    "dsp": {
      "engine": "Combination of high-resolution fixed point and floating point processing",
      "sampleRateInternal": "96 kHz (internal, fixed)",
      "sampleRateAesIn": "44.1, 48, 96, 192 kHz",
      "sampleRateNetworkIn": "48, 96 kHz",
      "bitDepth": "27 Bit (dual-stacked A/D converters)",
      "routing": "Four analog + four AES3 input channels, each routable to any of 4 output channels A-D",
      "eqSpecs": "2 x 16-band PEQ/Notch/HiShlv/LoShlv/Asym",
      "presetLibrary": null,
      "latencyStandard": "0.3 ms",
      "latencyLow": null,
      "delaySetting": "0.3 ms - 10 s",
      "dynamicRange": "108 dB (analog) / 112 dB (digital/Milan) unweighted; 110 / 114 dB A-weighted (reference 180 Vpk)"
    },
    "ecosystem": {
      "controlSoft": "d&b R1 Remote control software, d&b ArrayCalc (simulation)",
      "integrations": [
        "OCA/AES70",
        "R90 Touchscreen remote control",
        "Beckhoff",
        "Q-SYS",
        "Crestron",
        "AMX",
        "MediaMatrix"
      ]
    },
    "features": [
      "LoadMatch (cable compensation up to 70 m)",
      "ArrayProcessing",
      "System check and Load monitoring (LM)",
      "EcoMode (energy saving)",
      "Fallback / Override",
      "AutoStandby / AutoWakeup",
      "Integrated Web Remote interface",
      "8x GPI + 4x GPO"
    ],
    "note": {
      "modelType": "4-channel Class D installation amplifier, Milan-AVB networked with Phoenix Euroblock connectors (hybrid of D25 platform + 10D-style I/O).",
      "channelProcessing": "2 x 16-band PEQ/notch/shelving/asymmetric equalizer. Latency 0.3 ms. Delay 0.3 ms - 10 s. THD+N < -83 dB (4 Ω) / < -86 dB (8 Ω).",
      "protection": "Mains/PSU: overvoltage and undervoltage, inrush current limiter, internal fuse. Output: overcurrent, DC offset, HF voltage limiter, pop-noise suppression, self-resetting overtemperature.",
      "interface": "TFT colour touchscreen 4.3\"/480 x 272 pixel (resistive); rear RESET push-button. Integrated Web Remote interface."
    },
    "circuitProtection": null,
    "interfaceInfo": {
      "displayIndicators": "Colour TFT touchscreen, 4.3\"/480 x 272 pixel (resistive)",
      "navigation": "Touchscreen; rear panel RESET push-button"
    },
    "dimensions": { "mm": "2 RU x 19\" x 465 mm", "in": "2 RU x 19\" x 18.3\"" },
    "gpio": "8x opto-coupled GPI (9-pin Phoenix Euroblock) + 4x GPO Low-Side-Switch-Relay (5-pin Phoenix Euroblock); external 24 VDC/150 W required",
    "configs": [],
    "relations": {
      "speakerIds": []
    }
  },
  {
    "id": "amp-db-30d",
    "mfr": "db",
    "model": "30D",
    "views": [],
    "channels": 4,
    "powerClass": "Class D",
    "connectivity": [
      "AES3",
      "analog"
    ],
    "notes": "4-channel Class D installation amplifier with integrated DSP (next generation), higher output variant of 10D.",
    "type": null,
    "usage": null,
    "architecture": null,
    "ipRating": null,
    "rackUnit": 2,
    "weight": 10.6,
    "weightLb": 23.4,
    "cooling": "2x temperature and level controlled fans (32 - 48 dBA)",
    "operatingTemp": "-10 to 40 (continuous) / -10 to 50 (reduced power)",
    "ampClass": "Class D",
    "mains": {
      "rating": "100 - 240 V, 50 - 60 Hz",
      "connector": "powerCON",
      "powerRequirements": null
    },
    "powerSupply": "Universal range switched mode power supply with active Power Factor Correction (PFC)",
    "externalDspBackup": null,
    "io": {
      "analogIn": "4 channels (INPUT ANALOG A1-A4, 3-pin Phoenix Euroblock male, also used as link output wired in parallel)",
      "aesIn": "4 channels AES3 (INPUT DIGITAL D1/2, D3/4, 3-pin Phoenix Euroblock male)",
      "networkAudio": null,
      "networkRedundancy": null,
      "connections": "2x RJ45 (ETHERNET, 10/100 Mbit, built-in 2-port switch, OCA/AES70), 2x RJ45 (CAN, parallel), FAULT contact (NO/C/NC, 3-pin Phoenix Euroblock male)"
    },
    "output": {
      "channels": 4,
      "connectors": "2x 4-pin Phoenix Euroblock female (SPEAKER OUTPUTS A/B/C/D). Output modes: Dual Channel, Mix TOP/SUB, 2-Way Active (per channel pair)",
      "minImpedance": null,
      "powerTotal": "4 x 1000-1600/800 W (4/8 Ω, CF 6/12 dB)",
      "power8ohms": "4 x 800 W",
      "power4ohms": "4 x 1600 W",
      "powerBtl8ohms": null,
      "powerByOhm": [
        { "ohm": "4 Ω", "power": "4 x 1000 W (CF 6 dB) / 4 x 1600 W (CF 12 dB)" },
        { "ohm": "8 Ω", "power": "4 x 800 W (CF 6/12 dB)" }
      ],
      "maxVoltage": "117 Vpeak",
      "maxCurrent": null
    },
    "dsp": {
      "engine": null,
      "sampleRateInternal": "96 kHz (internal)",
      "sampleRateAesIn": "48, 96 kHz",
      "sampleRateNetworkIn": null,
      "bitDepth": "27 Bit ADC / 24 Bit DAC",
      "routing": "Up to eight input channels (4 analog + 4 AES3) routable to any of 4 output channels",
      "eqSpecs": "2 x 16-band PEQ/Notch/HiShlv/LoShlv/Asym",
      "presetLibrary": null,
      "latencyStandard": "0.3 ms",
      "latencyLow": null,
      "delaySetting": "0.3 ms - 10 s",
      "dynamicRange": null
    },
    "ecosystem": {
      "controlSoft": "d&b R1 Remote control software, d&b ArrayCalc simulation software",
      "integrations": []
    },
    "features": [
      "LoadMatch (cable compensation up to 70 m)",
      "System check and Load monitoring (LM)",
      "Loudspeaker-specific functions (CUT, HFA, HFC, CSA, CPL)",
      "Fallback / Override",
      "AutoStandby / AutoWakeup",
      "Integrated Web Remote interface",
      "5x opto-coupled GPIO"
    ],
    "note": {
      "modelType": "4-channel Class D installation amplifier (next generation), higher output variant of 10D (shared chassis/control board).",
      "channelProcessing": "2 x 16-band PEQ/notch/shelving/asymmetric equalizer. Latency 0.3 ms. Delay 0.3 ms - 10 s. S/N ratio >104 dBr (analog) / >106 dBr (digital). Damping factor >80.",
      "protection": "Mains/PSU: voltage monitoring, inrush current limiter, self-resetting overtemperature, under/overvoltage, PFC. Output: ground fault, pop-noise suppression, DC offset, HF voltage limitation, current limitation/protection, self-resetting overtemperature.",
      "interface": "Status LEDs only (POWER, DATA, Mute/ISP/GR/OVL per channel); no display. Integrated Web Remote interface via Ethernet."
    },
    "circuitProtection": null,
    "interfaceInfo": {
      "displayIndicators": "Status LEDs only (POWER, DATA, Mute A/B/C/D, ISP A/B/C/D, GR A/B/C/D, OVL/Error A/B/C/D); no touchscreen or display",
      "navigation": "Web Remote interface (browser-based via Ethernet)"
    },
    "dimensions": { "mm": "2 RU x 19\" x 435 mm", "in": null },
    "gpio": "5x opto-coupled GPIO (configurable per-pin as GPI/GPO), 6-pin Phoenix Euroblock; external 24 VDC required",
    "configs": [],
    "relations": {
      "speakerIds": []
    }
  },
  {
    "id": "amp-db-40d",
    "mfr": "db",
    "model": "40D",
    "views": [],
    "channels": 4,
    "powerClass": "Class D",
    "connectivity": [
      "Milan-AVB",
      "AES3",
      "analog"
    ],
    "notes": "4-channel Class D installation amplifier with integrated DSP, Milan-networked high-voltage variant.",
    "type": null,
    "usage": null,
    "architecture": null,
    "ipRating": null,
    "rackUnit": 2,
    "weight": 13.3,
    "weightLb": 29.3,
    "cooling": "2x temperature-dependent RPM fans (30 - 50 dBA), self-resetting overtemperature protection",
    "operatingTemp": "-10 to 40 (continuous) / -10 to 50 (short-term)",
    "ampClass": "Class D",
    "mains": {
      "rating": "100 - 127 / 208 - 240 V, 50 - 60 Hz",
      "connector": "powerCON TRUE1 TOP",
      "powerRequirements": null
    },
    "powerSupply": "Switched mode power supply with automatic mains range selection and active Power Factor Correction (PFC)",
    "externalDspBackup": null,
    "io": {
      "analogIn": "4 channels (INPUT A1-A4, 3-pin Phoenix Euroblock male, also used as link output/cable tap)",
      "aesIn": "4 channels AES3 (INPUT D1/2, D3/4, 3-pin Phoenix Euroblock male)",
      "networkAudio": "Milan — 1 redundant stream, up to 8 channels @ 48/96 kHz (Routable Milan inputs M1-M8), 2x RJ45 etherCON",
      "networkRedundancy": "Milan redundancy, always active (ETH1/PRI + ETH2/SEC)",
      "connections": "2x RJ45 etherCON (ETHERNET 1/PRI, ETHERNET 2/SEC), analog/digital LINK out (Phoenix Euroblock male), FAULT contact (NO/C/NC, 3-pin Phoenix Euroblock male)"
    },
    "output": {
      "channels": 4,
      "connectors": "2x 4-pin Phoenix Euroblock female (SPEAKER OUTPUTS A/B/C/D). Output modes: Dual Channel, Mix TOP/SUB, 2-Way Active (per channel pair)",
      "minImpedance": null,
      "powerTotal": "4 x 2400/2000 W (4/8 Ω, CF 12 dB); 4 x 250 W long term (4 Ω)",
      "power8ohms": "4 x 2000 W",
      "power4ohms": "4 x 2400 W",
      "powerBtl8ohms": null,
      "powerByOhm": [
        { "ohm": "4 Ω", "power": "4 x 2400 W (CF 12 dB) / 4 x 250 W (long term)" },
        { "ohm": "8 Ω", "power": "4 x 2000 W (CF 12 dB)" }
      ],
      "maxVoltage": "180 Vpeak",
      "maxCurrent": "35 Apeak"
    },
    "dsp": {
      "engine": "Combination of high-resolution fixed point and floating point processing",
      "sampleRateInternal": "96 kHz (internal, fixed)",
      "sampleRateAesIn": "44.1, 48, 96, 192 kHz",
      "sampleRateNetworkIn": "48, 96 kHz",
      "bitDepth": "27 Bit (dual-stacked A/D converters)",
      "routing": "Four analog + four AES3 + up to eight Milan inputs (16 total), each routable to any of 4 output channels A-D",
      "eqSpecs": "2 x 16-band PEQ/Notch/HiShlv/LoShlv/Asym",
      "presetLibrary": null,
      "latencyStandard": "0.3 ms",
      "latencyLow": null,
      "delaySetting": "0.3 ms - 10 s",
      "dynamicRange": "111 dB (analog) / 116 dB (digital/Milan) unweighted; 114 / 119 dB A-weighted (reference 180 Vpk)"
    },
    "ecosystem": {
      "controlSoft": "d&b R1 Remote control software, d&b ArrayCalc (simulation)",
      "integrations": [
        "OCA/AES70",
        "R90 Touchscreen remote control",
        "Beckhoff",
        "Q-SYS",
        "Crestron",
        "AMX",
        "MediaMatrix"
      ]
    },
    "features": [
      "LoadMatch (cable compensation up to 70 m)",
      "ArrayProcessing",
      "System check and Load monitoring (LM)",
      "EcoMode (energy saving)",
      "Fallback / Override",
      "AutoStandby / AutoWakeup",
      "Integrated Web Remote interface",
      "8x GPI + 4x GPO"
    ],
    "note": {
      "modelType": "4-channel Class D installation amplifier, Milan-networked high-voltage/high-output variant (next generation, Phoenix Euroblock I/O).",
      "channelProcessing": "2 x 16-band PEQ/notch/shelving/asymmetric equalizer. Latency 0.3 ms. Delay 0.3 ms - 10 s. THD+N < -83 dB (4 Ω) / < -86 dB (8 Ω).",
      "protection": "Mains/PSU: overvoltage and undervoltage, inrush current limiter, internal fuse. Output: overcurrent, DC offset, HF voltage limiter, pop-noise suppression, self-resetting overtemperature.",
      "interface": "TFT colour touchscreen 4.3\"/480 x 272 pixel; rear RESET push-button. Integrated Web Remote interface."
    },
    "circuitProtection": null,
    "interfaceInfo": {
      "displayIndicators": "Colour TFT touchscreen, 4.3\"/480 x 272 pixel",
      "navigation": "Touchscreen; rear panel RESET push-button"
    },
    "dimensions": { "mm": "2 RU x 19\" x 465 mm", "in": "2 RU x 19\" x 18.3\"" },
    "gpio": "8x GPI opto-coupled (9-pin Phoenix Euroblock) + 4x GPO Low-Side-Switch-Relay (5-pin Phoenix Euroblock); external 24 VDC/150 W required",
    "configs": [],
    "relations": {
      "speakerIds": []
    }
  },
  {
    "id": "amp-db-5d",
    "mfr": "db",
    "model": "5D",
    "views": [],
    "channels": 4,
    "powerClass": "Class D",
    "connectivity": [
      "Dante",
      "analog"
    ],
    "notes": "4-channel Class D installation amplifier with integrated DSP, Dante-native, 9.5\" half-rack.",
    "type": null,
    "usage": null,
    "architecture": null,
    "ipRating": null,
    "rackUnit": 1,
    "weight": 4.6,
    "weightLb": 10,
    "cooling": "1x temperature-dependent fan (max. 42 dBA), self-resetting overtemperature protection",
    "operatingTemp": "-10 to 40 (continuous) / -10 to 50 (short-term)",
    "ampClass": "Class D",
    "mains": {
      "rating": "100 - 240 V, 50 - 60 Hz",
      "connector": "IEC-60320 C14",
      "powerRequirements": null
    },
    "powerSupply": "Wide range switched mode power supply with active Power Factor Correction (PFC)",
    "externalDspBackup": null,
    "io": {
      "analogIn": "4 channels (INPUT A1-A4, 6-pin Euroblock male, 3-pin used per channel, doubles as link/cable tap)",
      "aesIn": null,
      "networkAudio": "Dante — 4 RX channels, Primary only, 48/96 kHz, 2 RX flows (Unicast or Multicast), 2x RJ45",
      "networkRedundancy": "Primary only (no secondary/redundant Dante network)",
      "connections": "2x RJ45 (integrated 2-port switch, 1 Gbit/100 Mbit, Dante + OCA/AES70), FAULT contact (NO/C/NC, 3-pin Euroblock 3.5 mm male)"
    },
    "output": {
      "channels": 4,
      "connectors": "2x 4-pin Euroblock female (OUTPUTS A/B, C/D pairs, hardwired)",
      "minImpedance": null,
      "powerTotal": "4 x 600/600 W (4/8 Ω, CF 12 dB); 4 x 37.5 W long term (4 Ω)",
      "power8ohms": "4 x 600 W",
      "power4ohms": "4 x 600 W",
      "powerBtl8ohms": null,
      "powerByOhm": [
        { "ohm": "4 Ω", "power": "4 x 600 W (CF 12 dB) / 4 x 37.5 W (long term)" },
        { "ohm": "8 Ω", "power": "4 x 600 W (CF 12 dB)" }
      ],
      "maxVoltage": "120 Vpeak",
      "maxCurrent": "20 Apeak"
    },
    "dsp": {
      "engine": null,
      "sampleRateInternal": "48 kHz (internal, fixed)",
      "sampleRateAesIn": null,
      "sampleRateNetworkIn": "48, 96 kHz",
      "bitDepth": "24 Bit ADC/DAC",
      "routing": null,
      "eqSpecs": "1 x 8-band PEQ/Notch/HiShlv/LoShlv/Asym",
      "presetLibrary": null,
      "latencyStandard": "1.1 ms (analog input); 3 ms (Dante input)",
      "latencyLow": null,
      "delaySetting": "1.1 - 300 ms",
      "dynamicRange": "108 dB (analog) / 111 dB (Dante) unweighted; 111 / 113 dB A-weighted (reference 120 Vpk)"
    },
    "ecosystem": {
      "controlSoft": "d&b R1 Remote control software, d&b ArrayCalc (simulation)",
      "integrations": []
    },
    "features": [
      "System check and Load monitoring (LM)",
      "Fallback / Override",
      "AutoStandby / AutoWakeup",
      "4x GPI with VCA functionality"
    ],
    "note": {
      "modelType": "4-channel Class D installation amplifier, Dante-native, 9.5\" half-rack (1U). Euroblock connectors, LED-only UI.",
      "channelProcessing": "1 x 8-band PEQ/notch/shelving/asymmetric equalizer. Latency 1.1 ms (analog) / 3 ms (Dante). Delay 1.1 - 300 ms. THD+N < -60 dB. Crosstalk < -50 dBr.",
      "protection": "Mains/PSU: overvoltage, inrush current limiter, internal fuse. Output: overcurrent, DC offset, HF voltage limiter, pop-noise suppression, self-resetting overtemperature.",
      "interface": "LED indicators only; rear mains rocker switch; rear recessed RESET push-button."
    },
    "circuitProtection": null,
    "interfaceInfo": {
      "displayIndicators": "LED indicators only (POWER, Data, Mute A/B/C/D, ISP A/B/C/D, GR A/B/C/D, OVL/Error A/B/C/D)",
      "navigation": "Rear panel mains rocker switch; rear panel RESET push-button; d&b R1 Remote"
    },
    "dimensions": { "mm": "1 RU x 9.5\" x 405 mm (435 mm with rack ears)", "in": "1 RU x 9.5\" x 16\"" },
    "gpio": "4x GPI (level/edge triggering, VCA functionality via 10 kOhm potentiometer), 6-pin Euroblock; onboard 12 VDC/50 mA",
    "configs": [],
    "relations": {
      "speakerIds": []
    }
  },
  {
    "id": "amp-db-5dm",
    "mfr": "db",
    "model": "5DM",
    "views": [],
    "channels": 4,
    "powerClass": "Class D",
    "connectivity": [
      "Milan-AVB",
      "analog"
    ],
    "notes": "4-channel Class D installation amplifier with integrated DSP, Milan-native, 9.5\" half-rack (preliminary).",
    "type": null,
    "usage": null,
    "architecture": null,
    "ipRating": null,
    "rackUnit": 1,
    "weight": 4.6,
    "weightLb": 10,
    "cooling": "1x temperature-dependent fan (max. 42 dBA), self-resetting overtemperature protection",
    "operatingTemp": "-10 to 40 (continuous) / -10 to 50 (short-term)",
    "ampClass": "Class D",
    "mains": {
      "rating": "100 - 240 V, 50 - 60 Hz",
      "connector": "IEC-60320 C14",
      "powerRequirements": null
    },
    "powerSupply": "Wide range switched mode power supply with active Power Factor Correction (PFC)",
    "externalDspBackup": null,
    "io": {
      "analogIn": "4 channels (INPUT A1-A4, 6-pin Euroblock male, 3-pin used per channel, doubles as link/cable tap)",
      "aesIn": null,
      "networkAudio": "Milan — 2 streams up to 8 channels each @ 48/96 kHz (4 of 16 channels routable, M1-M4), 2x RJ45",
      "networkRedundancy": "No (Redundancy: no)",
      "connections": "2x RJ45 (2 individual Ethernet ports, 1 Gbit/s each; Single cable / Split mode selectable via R1), FAULT contact (NO/C/NC, 3-pin Euroblock 3.5 mm male)"
    },
    "output": {
      "channels": 4,
      "connectors": "2x 4-pin Euroblock female (OUTPUTS A/B, C/D pairs, hardwired)",
      "minImpedance": null,
      "powerTotal": "4 x 600/600 W (4/8 Ω, CF 12 dB); 4 x 37.5 W long term (4 Ω)",
      "power8ohms": "4 x 600 W",
      "power4ohms": "4 x 600 W",
      "powerBtl8ohms": null,
      "powerByOhm": [
        { "ohm": "4 Ω", "power": "4 x 600 W (CF 12 dB) / 4 x 37.5 W (long term)" },
        { "ohm": "8 Ω", "power": "4 x 600 W (CF 12 dB)" }
      ],
      "maxVoltage": "120 Vpeak",
      "maxCurrent": "20 Apeak"
    },
    "dsp": {
      "engine": null,
      "sampleRateInternal": "48 kHz (internal, fixed)",
      "sampleRateAesIn": null,
      "sampleRateNetworkIn": "48, 96 kHz",
      "bitDepth": null,
      "routing": null,
      "eqSpecs": "1 x 8-band PEQ/Notch/HiShlv/LoShlv/Asym",
      "presetLibrary": null,
      "latencyStandard": "1.1 ms (analog input); Milan input -tbd-",
      "latencyLow": null,
      "delaySetting": "1.1 - 300 ms",
      "dynamicRange": "108 dB (analog) unweighted / 111 dB A-weighted (reference 120 Vpk); Milan -tbd-"
    },
    "ecosystem": {
      "controlSoft": "d&b R1 Remote control software, d&b ArrayCalc (simulation)",
      "integrations": []
    },
    "features": [
      "AmpPresets",
      "8-band EQ per output",
      "4x GPI with VCA functionality",
      "Milan (2 streams, no redundancy)"
    ],
    "note": {
      "modelType": "4-channel Class D installation amplifier, Milan-native (Milan version of 5D), 9.5\" half-rack (1U). Preliminary product.",
      "channelProcessing": "1 x 8-band PEQ/notch/shelving/asymmetric equalizer. Latency 1.1 ms (analog); Milan -tbd-. Delay 1.1 - 300 ms. THD+N < -60 dB. Crosstalk < -50 dBr.",
      "protection": "Mains/PSU: overvoltage, inrush current limiter, internal fuse. Output: overcurrent, DC offset, HF voltage limiter, pop-noise suppression, self-resetting overtemperature.",
      "interface": "LED indicators only; rear mains rocker switch; rear recessed RESET push-button."
    },
    "circuitProtection": null,
    "interfaceInfo": {
      "displayIndicators": "LED indicators only (POWER, Data, Mute A/B/C/D, ISP A/B/C/D, GR A/B/C/D, OVL/Error A/B/C/D)",
      "navigation": "Rear panel mains rocker switch; rear panel RESET push-button; d&b R1 Remote"
    },
    "dimensions": { "mm": "1 RU x 9.5\" x 405 mm (435 mm with rack ears)", "in": "1 RU x 9.5\" x 16\"" },
    "gpio": "4x GPI (level/edge triggering, VCA functionality via 10 kOhm potentiometer), 6-pin Euroblock; onboard 12 VDC/50 mA",
    "configs": [],
    "relations": {
      "speakerIds": []
    }
  },
  {
    "id": "amp-db-d25",
    "mfr": "db",
    "model": "D25",
    "views": [],
    "channels": 4,
    "powerClass": "Class D",
    "connectivity": [
      "Milan-AVB",
      "AES3",
      "analog"
    ],
    "notes": "4-channel Class D amplifier with integrated DSP, mobile/touring specific.",
    "type": null,
    "usage": null,
    "architecture": null,
    "ipRating": null,
    "rackUnit": 2,
    "weight": 13.8,
    "weightLb": 30.4,
    "cooling": "2x temperature-dependent RPM fans (30 - 50 dBA), self-resetting overtemperature protection",
    "operatingTemp": "-10 to 40 (continuous) / -10 to 50 (short-term)",
    "ampClass": "Class D",
    "mains": {
      "rating": "100 - 127 / 208 - 240 V, 50 - 60 Hz",
      "connector": "powerCON TRUE1 TOP",
      "powerRequirements": null
    },
    "powerSupply": "Switched mode power supply with automatic mains range selection and active Power Factor Correction (PFC)",
    "externalDspBackup": null,
    "io": {
      "analogIn": "4 channels (INPUT A1-A4, 3-pin XLR female)",
      "aesIn": "4 channels AES3 (D1/2, D3/4, 3-pin XLR female)",
      "networkAudio": "Milan — 1 redundant stream, up to 8 channels @ 48/96 kHz (Routable Milan inputs M1-M8), 2x etherCON",
      "networkRedundancy": "Milan redundancy, always active (ETH1/PRI + ETH2/SEC)",
      "connections": "2x etherCON (ETH1/PRI, ETH2/SEC), 4x analog link (3-pin XLR male), 2x digital out (3-pin XLR male)"
    },
    "output": {
      "channels": 4,
      "connectors": "4x NL4 (Dual Channel A/B/C/D), 2x NL4 (Mix TOP/SUB or 2-Way Active), 1x NL8 (4-channel multicore). Output modes: Dual Channel, Mix TOP/SUB, 2-Way Active (per channel pair)",
      "minImpedance": null,
      "powerTotal": "4 x 1800/900 W (4/8 Ω, CF 12 dB); 4 x 250 W long term (4 Ω)",
      "power8ohms": "4 x 900 W",
      "power4ohms": "4 x 1800 W",
      "powerBtl8ohms": null,
      "powerByOhm": [
        { "ohm": "4 Ω", "power": "4 x 1800 W (CF 12 dB) / 4 x 250 W (long term)" },
        { "ohm": "8 Ω", "power": "4 x 900 W (CF 12 dB)" }
      ],
      "maxVoltage": "120 Vpeak",
      "maxCurrent": "35 Apeak"
    },
    "dsp": {
      "engine": "Combination of high-resolution fixed point and floating point processing",
      "sampleRateInternal": "96 kHz (internal, fixed)",
      "sampleRateAesIn": "44.1, 48, 96, 192 kHz",
      "sampleRateNetworkIn": "48, 96 kHz",
      "bitDepth": "27 Bit (dual-stacked A/D converters)",
      "routing": null,
      "eqSpecs": "2 x 16-band PEQ/Notch/HiShlv/LoShlv/Asym",
      "presetLibrary": null,
      "latencyStandard": "0.3 ms",
      "latencyLow": null,
      "delaySetting": "0.3 ms - 10 s",
      "dynamicRange": "108 dB (analog) / 112 dB (digital/Milan) unweighted; 110 / 114 dB A-weighted (reference 180 Vpk)"
    },
    "ecosystem": {
      "controlSoft": "d&b R1 Remote control software, d&b ArrayCalc (simulation)",
      "integrations": []
    },
    "features": [
      "LoadMatch (cable compensation up to 70 m)",
      "ArrayProcessing (HF Trim)",
      "System check and Load monitoring (LM)",
      "Mains Current Limitation (MCL)",
      "EcoMode (energy saving)",
      "Fallback / Override",
      "AutoStandby / AutoWakeup"
    ],
    "note": {
      "modelType": "4-channel Class D mobile/touring amplifier with Milan Endstation and 4.3\" touchscreen.",
      "channelProcessing": "2 x 16-band PEQ/notch/shelving/asymmetric equalizer. Latency 0.3 ms. Delay 0.3 ms - 10 s. THD+N < -83 dB (4 Ω) / < -86 dB (8 Ω).",
      "protection": "Mains/PSU: overvoltage and undervoltage, inrush current limiter, internal fuse. Output: overcurrent, DC offset, HF voltage limiter, pop-noise suppression, self-resetting overtemperature.",
      "interface": "TFT colour touchscreen 4.3\"/480 x 272 pixel, digital rotary encoder (SCROLL/EDIT), mains power switch."
    },
    "circuitProtection": null,
    "interfaceInfo": {
      "displayIndicators": "Colour TFT touchscreen, 4.3\"/480 x 272 pixel",
      "navigation": "Digital rotary encoder (SCROLL/EDIT), Mains power switch"
    },
    "dimensions": { "mm": "2 RU x 19\" x 512 mm", "in": "2 RU x 19\" x 20.2\"" },
    "gpio": "None (GPIO not available)",
    "configs": [],
    "relations": {
      "speakerIds": []
    }
  },
  {
    "id": "amp-db-d40",
    "mfr": "db",
    "model": "D40",
    "views": [],
    "channels": 4,
    "powerClass": "Class D",
    "connectivity": [
      "Milan-AVB",
      "AES3",
      "analog"
    ],
    "notes": "4-channel Class D amplifier with integrated DSP, mobile/touring specific, high voltage/high power variant.",
    "type": null,
    "usage": null,
    "architecture": null,
    "ipRating": null,
    "rackUnit": 2,
    "weight": 13.8,
    "weightLb": 30.4,
    "cooling": "2x temperature-dependent RPM fans (30 - 50 dBA), self-resetting overtemperature protection",
    "operatingTemp": "-10 to 40 (continuous) / -10 to 50 (short-term)",
    "ampClass": "Class D",
    "mains": {
      "rating": "100 - 127 / 208 - 240 V, 50 - 60 Hz",
      "connector": "powerCON TRUE1 TOP",
      "powerRequirements": null
    },
    "powerSupply": "Switched mode power supply with automatic mains range selection and active Power Factor Correction (PFC)",
    "externalDspBackup": null,
    "io": {
      "analogIn": "4 channels (INPUT A1-A4, 3-pin XLR female)",
      "aesIn": "4 channels AES3 (D1/2, D3/4, 3-pin XLR female)",
      "networkAudio": "Milan — 1 redundant stream, up to 8 channels @ 48/96 kHz (Routable Milan inputs M1-M8), 2x etherCON",
      "networkRedundancy": "Milan redundancy, always active (ETH1/PRI + ETH2/SEC)",
      "connections": "2x etherCON (ETH1/PRI, ETH2/SEC), 4x analog link (3-pin XLR male), 2x digital out (3-pin XLR male)"
    },
    "output": {
      "channels": 4,
      "connectors": "4x NL4 (Dual Channel A/B/C/D), 2x NL4 (Mix TOP/SUB or 2-Way Active), 1x NL8 (4-channel multicore). Output modes: Dual Channel, Mix TOP/SUB, 2-Way Active (per channel pair)",
      "minImpedance": null,
      "powerTotal": "4 x 2400/2000 W (4/8 Ω, CF 12 dB); 4 x 250 W long term (4 Ω)",
      "power8ohms": "4 x 2000 W",
      "power4ohms": "4 x 2400 W",
      "powerBtl8ohms": null,
      "powerByOhm": [
        { "ohm": "4 Ω", "power": "4 x 2400 W (CF 12 dB) / 4 x 250 W (long term)" },
        { "ohm": "8 Ω", "power": "4 x 2000 W (CF 12 dB)" }
      ],
      "maxVoltage": "180 Vpeak",
      "maxCurrent": "35 Apeak"
    },
    "dsp": {
      "engine": "Combination of high-resolution fixed point and floating point processing",
      "sampleRateInternal": "96 kHz (internal, fixed)",
      "sampleRateAesIn": "44.1, 48, 96, 192 kHz",
      "sampleRateNetworkIn": "48, 96 kHz",
      "bitDepth": "27 Bit (dual-stacked A/D converters)",
      "routing": null,
      "eqSpecs": "2 x 16-band PEQ/Notch/HiShlv/LoShlv/Asym",
      "presetLibrary": null,
      "latencyStandard": "0.3 ms",
      "latencyLow": null,
      "delaySetting": "0.3 ms - 10 s",
      "dynamicRange": "111 dB (analog) / 116 dB (digital/Milan) unweighted; 114 / 119 dB A-weighted (reference 180 Vpk)"
    },
    "ecosystem": {
      "controlSoft": "d&b R1 Remote control software, d&b ArrayCalc (simulation)",
      "integrations": []
    },
    "features": [
      "LoadMatch (cable compensation up to 70 m)",
      "ArrayProcessing (HF Trim)",
      "System check and Load monitoring (LM)",
      "Mains Current Limitation (MCL)",
      "EcoMode (energy saving)",
      "Fallback / Override",
      "AutoStandby / AutoWakeup"
    ],
    "note": {
      "modelType": "4-channel Class D mobile/touring amplifier, high-voltage/high-power variant (KSL capable), Milan Endstation, 4.3\" touchscreen.",
      "channelProcessing": "2 x 16-band PEQ/notch/shelving/asymmetric equalizer. Latency 0.3 ms. Delay 0.3 ms - 10 s. THD+N < -83 dB (4 Ω) / < -86 dB (8 Ω).",
      "protection": "Mains/PSU: overvoltage and undervoltage, inrush current limiter, internal fuse. Output: overcurrent, DC offset, HF voltage limiter, pop-noise suppression, self-resetting overtemperature.",
      "interface": "TFT colour touchscreen 4.3\"/480 x 272 pixel, digital rotary encoder (SCROLL/EDIT), mains power switch."
    },
    "circuitProtection": null,
    "interfaceInfo": {
      "displayIndicators": "Colour TFT touchscreen, 4.3\"/480 x 272 pixel",
      "navigation": "Digital rotary encoder (SCROLL/EDIT), Mains power switch"
    },
    "dimensions": { "mm": "2 RU x 19\" x 512 mm", "in": "2 RU x 19\" x 20.2\"" },
    "gpio": "None (GPIO not available)",
    "configs": [],
    "relations": {
      "speakerIds": []
    }
  },
  {
    "id": "amp-db-d80",
    "mfr": "db",
    "model": "D80",
    "views": [],
    "channels": 4,
    "powerClass": "Class D",
    "connectivity": [
      "AES3",
      "analog"
    ],
    "notes": "4-channel Class D amplifier with integrated DSP (touring), CAN-Bus/OCA control.",
    "type": null,
    "usage": null,
    "architecture": null,
    "ipRating": null,
    "rackUnit": 2,
    "weight": 19,
    "weightLb": null,
    "cooling": "3x temperature and level controlled fans, front to rear airflow (34 - 49 dBA)",
    "operatingTemp": "-10 to 40 (continuous) / -10 to 50 (reduced power)",
    "ampClass": "Class D",
    "mains": {
      "rating": "100 - 127 / 208 - 240 V, 50 - 60 Hz",
      "connector": "powerCON-HC",
      "powerRequirements": null
    },
    "powerSupply": "Autosensing switch mode power supply with active Power Factor Correction (PFC)",
    "externalDspBackup": null,
    "io": {
      "analogIn": "4 channels (INPUT A1-A4, 3-pin XLR female, 2 configurable as AES)",
      "aesIn": "AES/EBU (AES3), up to 4 channels (2 of 4 analog slots software-configurable as AES)",
      "networkAudio": null,
      "networkRedundancy": null,
      "connections": "2x etherCON (10/100 Mbit, OCA/AES70), 2x RJ45 (CAN, parallel), 4x analog/digital link (3-pin XLR male)"
    },
    "output": {
      "channels": 4,
      "connectors": "4x NL4 (optional 4x EP5), 1x NL8 (4-channel multicore output). Output modes: Dual Channel, Mix TOP/SUB, 2-Way Active, LINEAR mode",
      "minImpedance": null,
      "powerTotal": "4 x 2600-4000/2000 W (4/8 Ω, CF 6/12 dB)",
      "power8ohms": "4 x 2000 W",
      "power4ohms": "4 x 4000 W",
      "powerBtl8ohms": null,
      "powerByOhm": [
        { "ohm": "4 Ω", "power": "4 x 2600 W (CF 6 dB) / 4 x 4000 W (CF 12 dB)" },
        { "ohm": "8 Ω", "power": "4 x 2000 W (CF 6/12 dB)" }
      ],
      "maxVoltage": "180 Vpeak",
      "maxCurrent": null
    },
    "dsp": {
      "engine": null,
      "sampleRateInternal": "96 kHz (internal, fixed)",
      "sampleRateAesIn": "48, 96 kHz",
      "sampleRateNetworkIn": null,
      "bitDepth": "27 Bit ADC / 24 Bit DAC",
      "routing": null,
      "eqSpecs": "2 x 16-band PEQ/Notch/HiShlv/LoShlv/Asym",
      "presetLibrary": null,
      "latencyStandard": "0.3 ms (SRC off, input Fs = 48 or 96 kHz)",
      "latencyLow": null,
      "delaySetting": "0.3 ms - 10 s",
      "dynamicRange": null
    },
    "ecosystem": {
      "controlSoft": "d&b R1 Remote control software V2, d&b ArrayCalc (simulation)",
      "integrations": []
    },
    "features": [
      "LoadMatch (cable compensation up to 70 m)",
      "ArrayProcessing-compatible",
      "System check and Load monitoring (LM)",
      "Mains Current Limitation (MCL)",
      "Fallback / Override",
      "AutoStandby / AutoWakeup",
      "Integrated Web Remote interface"
    ],
    "note": {
      "modelType": "4-channel Class D touring amplifier, CAN-Bus/OCA control (no Milan). 3.5\" touchscreen.",
      "channelProcessing": "2 x 16-band PEQ/notch/shelving/asymmetric equalizer. Latency 0.3 ms (SRC off, 48/96 kHz). Delay 0.3 ms - 10 s. THD+N < 0.5% (4 Ω). Damping factor >100. S/N ratio >110 dBr (analog) / >114 dBr (digital).",
      "protection": "Mains/PSU: mains voltage monitoring, over/undervoltage, inrush current limiter, self-resetting overtemperature, Mains Current Limitation (MCL). Output: ground fault, current limitation/protection, DC offset, HF voltage limiter, pop-noise suppression, self-resetting overtemperature.",
      "interface": "TFT colour touchscreen 3.5\"/320 x 240 pixel, digital rotary encoder (SCROLL/EDIT), mains power switch. Integrated Web Remote interface."
    },
    "circuitProtection": null,
    "interfaceInfo": {
      "displayIndicators": "Colour TFT touchscreen, 3.5\"/320 x 240 pixel",
      "navigation": "Digital rotary encoder (SCROLL/EDIT), Mains power switch"
    },
    "dimensions": { "mm": "2 RU x 19\" x 530.5 mm", "in": null },
    "gpio": "None (GPIO not available)",
    "configs": [],
    "relations": {
      "speakerIds": []
    }
  }
];
