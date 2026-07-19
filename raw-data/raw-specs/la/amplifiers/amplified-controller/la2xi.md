> **역재구성본** — 원문은 사용자 제공 원본 문서(LA2Xi_SP_EN_1.5.pdf 스펙시트,
> LA2Xi_AE_EN.docx 제품등록정보, LA2Xi_OM_EN.pdf 사용설명서) 기준으로 이미
> 앱 데이터 파일(`js/domains/amplifiers/data/la.data.js`)에 상세 반영되어
> 있어 다른 항목보다 신뢰도가 높습니다. 이 md는 그 데이터를 정리한
> 참고용입니다. README.md 참고.

# LA2Xi (L-Acoustics, Amplified Controller)

- Type: Amplified Controller, Fixed Install
- Channels: 4 (4x4 with bridge modes)
- Power class: High-efficiency Class D
- Connectivity: Milan-AVB, AES67, AES/EBU, analog
- IP Rating: IP2x
- Rack: 1U, Weight: 4.4 kg / 9.7 lb
- Cooling: 2 integrated temperature-controlled fans
- Operating temp: 0°C/32°F to +50°C/122°F
- Mains: 100-240V ±10%, 50-60Hz / 10A(200-240V)
- Power supply: Universal SMPS with PFC
- External DSP backup: 24V DC
- I/O: Analog 4ch, AES/EBU 4ch(2x AES/EBU, 44.1-192kHz) with active link+bypass relay, Milan-AVB/AES67 4ch from 1 stream(48kHz only)
- Network redundancy: Milan-certified seamless redundancy
- Connections: 2x etherCON 1Gb/s I/O+control, 4x male 3-point terminal blocks(2x switching analog/AES3), 2x male 3-point terminal block AES3 active links. Optional I/O-CON panel(+6 Neutrik XLR, +2 speakON)
- Output: 4ch, 2x female 4-point terminal blocks(optional I/O-CON), min 4Ω
  - 4Ω SE: 4x640W / 8Ω SE: 4x360W / 16Ω SE: 4x190W / 8Ω BTL: 2x1260W / 4Ω PBTL: 1x2550W
- DSP: Gen.4 Dual SHARC 32-bit float, 96kHz internal, AES in 44.1-192kHz, network in 48/96kHz, flexible 4x4 routing
  - EQ: 8 IIR + 4 FIR linear phase per channel
  - Preset library: Factory presets, memory 011-093, 10 user memories
  - Latency: standard 3.84ms / low 0.76ms, delay 0-1000ms
  - Dynamic range: >113dB(20Hz-20kHz, 8Ω, A-weighted, digital input)
- Ecosystem: L-Acoustics remote control software, LA Network Manager / Q-SYS, Crestron, Control4, Savant, HTTP
- Features: Array morphing, Air absorption compensation, Internal IIR/FIR EQ, L-DRIVE protection, Loudspeaker management, Output delay 0-1000ms
- Notes: THD+N <0.1%(20Hz-20kHz, 8Ω, 60W), Channel separation >80dB(1kHz, 8Ω, 60W), Noise <-77dBV
- Protection: Mains — over/under voltage, over temp, overcurrent, inrush current / Outputs — over current limiting, DC, short circuit, over temp
- Interface: LED's only(power/network/status/per-channel signal-limit-clip)
- GPIO: 4 in/out on 10-point terminal block
- Dimensions: 483 x 44.45(1U) x 265 mm / 19 x 1.75(1U) x 10.4 in
- 출처: LA2Xi_SP_EN_1.5.pdf(스펙시트), LA2Xi_AE_EN.docx(제품등록정보), LA2Xi_OM_EN.pdf(사용설명서)
