> **역재구성본** — 원문 미보관, `js/domains/amplifiers/data/la.data.js`에서 역재구성. README.md 참고.

# LA1.16i (L-Acoustics, Amplified Controller)

- Type: Amplified Controller, Fixed Install
- Channels: 16 (16x16 with bridge mode)
- Power class: High-efficiency Class D
- Connectivity: Milan-AVB, AES67, AES/EBU, analog
- IP Rating: IP20
- Rack: 1U, Weight: 5.6 kg / 12.3 lb
- Operating temp: -5°C/23°F to 50°C/122°F
- Mains: 100-240V ±10%, 50-60Hz / 10A(220-240V), 15A(120V), 20A(100V)
- Power supply: Universal SMPS with PFC
- External DSP backup: 24V DC
- I/O: Analog 1ch in, AES/EBU 2ch(1x AES3) with SRC, Milan-AVB/AES67 16ch from up to 16 streams(48kHz only)
- Network redundancy: Milan-certified seamless redundancy
- Connections: 2x etherCON 1Gb/s I/O+control, 1x male 12-point terminal block (AES3 or Analog input/link + GPIO)
- Output: 16ch, 8x female 4-point terminal blocks, min 4Ω
  - 4Ω: 16x160W / 8Ω: 16x80W / 8Ω bridge: 8x300W
- DSP: Gen.5 Dual SHARC 32-bit float, 96kHz internal, 32-bit float, 16x16 routing matrix
  - EQ: 8 IIR + 4 FIR linear phase per channel
  - Preset library: L-SMART enclosure layout (shared with LA7.16(i)), memory 01-074
  - Latency: standard 3.84ms / low 1.18ms
- Ecosystem: L-Acoustics remote control software, LA Network Manager / Q-SYS, Crestron, HTTP, WebUI
- Features: Array morphing(LF contour, zoom factor), Air absorption compensation, Internal IIR/FIR EQ, L-DRIVE protection, L-SMART adaptive power management, Loudspeaker/Amplifier management, Output delay 0-1000ms
- Protection: Mains — over/under voltage, over temp, overcurrent / Outputs — overcurrent, DC, short circuit, over temp
- Interface: LED's only
- GPIO: 3 in/out on 12-point terminal block
