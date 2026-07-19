> **역재구성본** — 원문 미보관, `js/domains/amplifiers/data/la.data.js`에서 역재구성. README.md 참고.

# LA7.16 (L-Acoustics, Amplified Controller)

- Type: Amplified Controller
- Channels: 16 (16x16)
- Power class: High-efficiency Class D
- Connectivity: Milan-AVB, AES/EBU, analog
- Rack: 2U, Weight: 15.8 kg / 34.8 lb
- Operating temp: -5°C/23°F to +50°C/122°F
- Mains: 100-240V ±10%, 50-60Hz, 32A powerCON / 16A(200-240V), 30A(100-120V)
- Power supply: Universal SMPS with PFC
- External DSP backup: 24V DC
- I/O: Analog 1ch, AES/EBU 2ch(1x AES3) with SRC, Milan-AVB 16ch from up to 16 streams(up to 8ch each)
- Network redundancy: Milan-certified seamless redundancy
- Connections: 2x etherCON 1Gb/s I/O+control, 1x male 12-point terminal block(AES3 or Analog input/link + GPIO)
- Output: 16ch, 1x SC32 connector, min 4Ω
  - 4Ω: 16x1100W / 8Ω: 16x1300W / 16Ω: 16x700W
- DSP: Gen.5 Dual SHARC 32-bit float, 96kHz internal, 16x16 routing+summation matrix
  - EQ: 8 IIR + 4 FIR linear phase per channel
  - Preset library: L-SMART enclosure layout, memory 01-074
  - Latency: standard 3.84ms / low 1.18ms
- Ecosystem: L-Acoustics remote control software, LA Network Manager / Q-SYS, Crestron
- Features: Array morphing(LF contour, zoom factor), Air absorption compensation, Internal IIR/FIR EQ, L-DRIVE protection, L-SMART adaptive power management, Loudspeaker/Amplifier management, Output delay 0-1000ms
- Protection: Mains — over/under voltage, over temp, overcurrent / Outputs — overcurrent, DC, short circuit, over temp
- Interface: 1x TFT color touchscreen(480x128px), 1x encoding wheel with push button
- GPIO: 3 in/out on 12-point terminal block
