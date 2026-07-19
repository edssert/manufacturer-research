# Amplification Reference (L-Acoustics)

> 원본 출처: `Amplification_Reference_TB_EN.pdf` — technical bulletin v16.0
> (동일 폴더에 원본 PDF 보관: `amplification-reference-tb-en.pdf`)

## Introduction

This document is intended for all users of L-Acoustics products. It gathers reference information about connecting enclosures to amplified controllers.

- Refer to *Impedance load and output power* (p.1) to identify the nominal impedance of an enclosure and calculate the total impedance, and identify the amplified controller maximum output power.
- Refer to *Enclosure drive capacity per amplified controller* (p.2) to identify the type and quantity of enclosures that can be driven by each amplified controller.
- Refer to *Enclosure maximum SPL per amplified controller* (p.4) to identify the maximum SPL delivered by an enclosure, depending on the preset and the amplified controller.
- *Loudspeaker connection* (p.5) contains generic cabling schemes with L-Acoustics speaker cables, categorized by type of enclosure.
- To prepare cables for a fixed installation project, refer to *Recommendation for speaker cables* (p.10).

For more information about enclosure presets and delay settings, refer to the Preset Guide.

## Impedance load and output power (p.1)

Most enclosures have a nominal impedance of 8 Ω. The exceptions are:

- 16 Ω: K2 (HF section), Kiva II, V-DOSC (HF section), 5XT, X4i
- 4 Ω: SB28, KS28, Syva Low, K1-SB, SB6i

**Total impedance — number of enclosures/sections in parallel**

| Nominal | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|
| 16 Ω | 8 Ω | 5.3 Ω | 4 Ω | 3.2 Ω | 2.7 Ω |
| 8 Ω | 4 Ω | 2.7 Ω | — | — | — |

\* 4 Ω enclosures cannot be connected in parallel, with the exception of Syva Low and SB6i.

Refer to *Enclosure drive capacity per amplified controller* (p.2) for the maximum number of enclosures/sections per output and in total on each amplified controller.

## Enclosure drive capacity per amplified controller (p.2)

### Amplified controllers maximum output power

| Type | 16 Ω load | 8 Ω load | 4 Ω load | 2.7 Ω load |
|---|---|---|---|---|
| LA12X | 4 × 700 W | 4 × 1400 W | 4 × 2600 W | 4 × 3300 W |
| LA7.16(i) | 16 × 580 W | 16 × 920 W | 16 × 1000 W | — |
| LA4X | 4 × 500 W | 4 × 1000 W | — | |
| LA2Xi SE | 4 × 190 W | 4 × 360 W | 4 × 640 W | |
| LA2Xi BTL | 2 × 710 W | 2 × 1260 W | — | — |
| LA2Xi PBTL | — | — | 1 × 2550 W | |
| LA1.16i SE | 16 × 40 W | 16 × 80 W | 16 × 120 W | — |
| LA1.16i BTL | 8 × 160 W | 8 × 230 W | — | |

CEA-2006/490A 1 kHz test method, all channels driven.

> **주의 (원문 경고 문구)**: Risks of output mute, global attenuation, or loss of audio quality. Do not exceed the maximum number of connected enclosures per channel and in total. Driving more enclosures than indicated can trigger the amplified controller protection systems.
>
> For L-SMART compatible amplified controllers (LA1.16i and LA7.16(i)), values are given for nominal use, assuming that all channels are driven at full power. When sending the same signal to all outputs, never exceed the maximum numbers, regardless of the Power Budget values, otherwise the Fuse Protect algorithm may be triggered. For LA7.16(i), when powered by a 100 V power supply, reduce the number of enclosures in order not to exceed 75% of the power gauge.
>
> For LA1.16i, the maximum number of connected enclosures in total may differ depending on the preset. Refer to Soundvision and LA Network Manager for Power Budget monitoring.

### Drive capacity table (per output / total)

표기: `SE` `BTL` `PBTL`는 LA1.16i/LA2Xi의 출력 모드. 값은 `per output / total` 형식.
컬럼은 원본 표 헤더 기준 `LA1.16i-SE / LA1.16i-BTL / LA2Xi-SE / LA2Xi-BTL / LA2Xi-PBTL / LA4X / LA7.16(i) / LA12X` 8개.
\* For passive loudspeakers, the value corresponds to the number of enclosures in parallel on the output. For active loudspeakers, the value corresponds to the number of sections in parallel on the output.

| Product | LA1.16i SE | LA1.16i BTL | LA2Xi SE | LA2Xi BTL | LA2Xi PBTL | LA4X | LA7.16(i) | LA12X |
|---|---|---|---|---|---|---|---|---|
| X4i | 3 / 48 | 2 / 12 | 4 / 16 | — | — | 4 / 16 | 4 / 64 | 6 / 24 |
| 5XT | 3 / 48 | 2 / 14 | 4 / 16 | — | — | 4 / 16 | 3 / 48 | 6 / 24 |
| X6i | 2 / 20 | 1 / 8 | 2 / 8 | 1 / 2 | — | 2 / 8 | 1 / 16 | 3 / 12 |
| X8 | 2 / 32 | 1 / 8 | 2 / 8 | 1 / 2 | — | 2 / 8 | 1 / 16 | 3 / 12 |
| X8i | 2 / 30 | 1 / 8 | 2 / 8 | 1 / 2 | — | 2 / 8 | 1 / 16 | 3 / 12 |
| X12 | — | 1 / 4 | 1 / 4 | 1 / 2 | — | 1 / 4 | 1 / 14 | 3 / 12 |
| X15 HiQ | — | — | 1 / 2 | — | — | 1 / 2 | 1 / 8 | 3 / 6 |
| Soka | 2 / 26 | 1 / 4 | 1 / 4 | 1 / 2 | — | 2 / 8 | 1 / 16 | 3 / 12 |
| Syva | — | — | 1 / 4 | 1 / 2 | — | 1 / 4 | 1 / 10 | 3 / 12 |
| A10(i) Wide/Focus | — | 1 / 4 | 2 / 8 | 1 / 2 | — | 2 / 8 | 1 / 16 | 3 / 12 |
| A15(i) Wide/Focus | — | — | 1 / 4 | 1 / 2 | — | 1 / 4 | 1 / 10 | 3 / 12 |
| K1 | — | — | — | — | — | — | — | 2 / 2 |
| K1-SB | — | — | — | — | — | — | — | 1 / 4 |
| K2 | — | — | — | — | — | 1 / 1 | 1 / 4 | 3 / 3 |
| K3(i) | — | — | — | — | — | 1 / 2 | 1 / 8 | 3 / 6 |
| Kara II(i) | — | — | 2 / 4 | — | — | 2 / 4 | 1 / 8 | 3 / 6 |
| Kiva II | — | 2 / 10 | 2 / 8 | 2 / 4 | — | 2 / 8 | 2 / 32 | 6 / 24 |
| L2 / L2D | — | — | — | — | — | — | 1 / 1 | — |
| CS1 | — | — | — | — | — | — | 1 / 2 | 2 / 2 |
| KS28 | — | — | 1 / 4 | — | 1 / 1 | — | — | 1 / 4 |
| KS21(i) | — | — | 1 / 4 | 1 / 2 | — | 1 / 4 | 1 / 8 | 2 / 8 |
| SB18 / SB18 IIi | — | — | 1 / 4 | 1 / 2 | — | 1 / 4 | 1 / 6 | 3 / 12 |
| SB15m | — | — | 1 / 4 | 1 / 2 | — | 1 / 4 | 1 / 9 | 3 / 12 |
| Syva Low | — | — | 1 / 4 | — | — | 1 / 4 | 1 / 8 | 2 / 6ᵃ |
| Syva Sub | — | 1 / 4 | 1 / 4 | 1 / 2 | — | 1 / 4 | 1 / 16 | 3 / 12 |
| SB10i | 2 / 20 | 1 / 4 | 2 / 8 | 1 / 2 | — | 2 / 8 | 2 / 32 | 3 / 12 |
| SB6i | 1 / 12 | — | 1 / 4 | — | — | 1 / 4 | 1 / 16 | 2 / 8 |

> ✅ 위 표는 pdfplumber로 원본 PDF 2~3페이지 표를 셀 단위(컬럼 9개: Product +
> LA1.16i-SE/BTL + LA2Xi-SE/BTL/PBTL + LA4X + LA7.16(i) + LA12X)로 재추출해
> 검증 완료. 이 표는 실제 셀 경계선(도형 좌표) 확인 결과 모든 행에서 LA4X·
> LA7.16(i)·LA12X 세 칸이 항상 분리되어 있어(아래 SPL 표와 달리 병합 없음)
> 값 복사가 필요 없음. 정밀 대조 필요 시 원본 PDF
> (`amplification-reference-tb-en.pdf`) 2~3페이지 직접 참고.

ᵃ Syva Low 각주(원문): "LA12X can drive up to two Syva Low per output, but no more than six per controller at high level." — 표의 LA12X 값 자체가 "2 / 6"(즉 출력당 최대 2개, 컨트롤러 총 6개)이며, 이 각주가 그 조건을 설명.

For discontinued loudspeaker enclosures and amplified controllers, refer to the Preset Guide.

## Enclosure maximum SPL per amplified controller (p.4-5)

Peak level measured at 1 m, under free field conditions for full range loudspeakers and half space conditions for subwoofers, using pink noise with crest factor 4.

원본 표는 실제 셀 경계선(PDF 도형 좌표 기준) 검증 결과, 항상 10개 컬럼
(Product, Preset, LA1.16i-SE, LA1.16i-BTL, LA2Xi-SE, LA2Xi-BTL, LA2Xi-PBTL,
LA4X, LA7.16(i), LA12X)으로 격자가 그어져 있다. 다만 대부분의 행에서는
LA4X·LA7.16(i)·LA12X 세 칸을 가로지르는 경계선이 생략되어 하나의 병합된
칸으로 인쇄되어 있다(즉 칸은 나뉘어 있으나 그 사이 세로선이 없는 것 —
PDF 편집 시점의 표기 관례로 추정). 아래 표는 PDF 원본의 셀 병합 여부를
무시하고 항상 10개 컬럼으로 고정하며, 병합되어 있던 값은 그 값이 걸쳐
있던 모든 컬럼에 동일하게 복사해 채운다(사용자 지시에 따른 표기 방식).

| Product | Preset | LA1.16i SE | LA1.16i BTL | LA2Xi SE | LA2Xi BTL | LA2Xi PBTL | LA4X | LA7.16(i) | LA12X |
|---|---|---|---|---|---|---|---|---|---|
| X4i | [X4] | 107 dB | 115 dB | 116 dB | — | — | 116 dB | 116 dB | 116 dB |
| X4i | [X4_60] | 104 dB | 110 dB | 110 dB | — | — | 110 dB | 110 dB | 110 dB |
| 5XT | [5XT] | 112 dB | 120 dB | 121 dB | — | — | 121 dB | 121 dB | 121 dB |
| X6i | [X6i_50] | 110 dB | 117 dB | 117 dB | — | — | 117 dB | 117 dB | 117 dB |
| X6i | [X6i] | 115 dB | 122 dB | 122 dB | 123 dB | — | 123 dB | 123 dB | 123 dB |
| X8 | [X8] | 117 dB | 124 dB | 125 dB | 129 dB | — | 129 dB | 129 dB | 129 dB |
| X8i | [X8i_40] | 114 dB | 121 dB | 121 dB | 123 dB | — | 123 dB | 123 dB | 123 dB |
| X8i | [X8i] | 117 dB | 124 dB | 125 dB | 129 dB | — | 129 dB | 129 dB | 129 dB |
| X12 | [X12] | — | 131 dB | 131 dB | 136 dB | — | 136 dB | 136 dB | 136 dB |
| X15 HiQ | [X15] | — | — | 133 dB | — | — | 138 dB | 138 dB | 138 dB |
| Soka | [SOKA] | 119 dB | 127 dB | 128 dB | 130 dB | — | 130 dB | 130 dB | 130 dB |
| Soka | [SOKA_60] | 114 dB | 122 dB | 124 dB | 124 dB | — | 124 dB | 124 dB | 124 dB |
| Soka | [SOKA_200] | 120 dB | 130 dB | 130 dB | 133 dB | — | 133 dB | 133 dB | 133 dB |
| Syva | [SYVA] | — | — | 130 dB | 137 dB | — | 137 dB | 137 dB | 137 dB |
| A10(i) Wide | [A10] (70°) | — | 132 dB | 133 dB | 137 dB | — | 137 dB | 137 dB | 137 dB |
| A10(i) Focus | [A10] (70°) | — | 135 dB | 136 dB | 140 dB | — | 140 dB | 140 dB | 140 dB |
| A15(i) Wide | [A15] (70°) | — | — | 136 dB | 141 dB | — | 141 dB | 141 dB | 141 dB |
| A15(i) Focus | [A15] (70°) | — | — | 139 dB | 144 dB | — | 144 dB | 144 dB | 144 dB |
| K1 | [K1] | — | — | — | — | — | — | — | 149 dB |
| K1-SB | [K1SB_60] | — | — | — | — | — | — | — | 141 dB |
| K1-SB | [K1SB_100_NC] | — | — | — | — | — | — | — | 142 dB |
| K1-SB | [K1SB_X] | — | — | — | — | — | — | — | 145 dB |
| K2 | [K2 70] | — | — | — | — | — | 147 dB | 147 dB | 147 dB |
| K3(i) | [K3 70] | — | — | — | — | — | 143 dB | 143 dB | 143 dB |
| Kara II(i) | [KARA II 70] | — | — | 137 dB | — | — | 142 dB | 142 dB | 142 dB |
| Kiva II | [KIVA II] | — | 132 dB | 133 dB | 138 dB | — | 138 dB | 138 dB | 138 dB |
| L2 (entire enclosure) | [L2 70] | — | — | — | — | — | — | 155 dB | — |
| L2D (entire enclosure) | [L2D 70] | — | — | — | — | — | — | 151 dB | — |
| CS1 | [CS1_60] | — | — | — | — | — | — | 147 dB | 147 dB |
| CS1 | [CS1_X] | — | — | — | — | — | — | 150 dB | — |
| KS28 | [KS28_100] | — | — | 136 dB | — | 143 dB | — | — | 143 dB |
| KS21(i) | [KS21_100] | — | — | 131 dB | 138 dB | — | 138 dB | 138 dB | 138 dB |
| SB18 (IIi) | [SB18_100] | — | — | 133 dB | 138 dB | — | 138 dB | 138 dB | 138 dB |
| SB15m | [SB15_100] | — | — | 131 dB | 137 dB | — | 137 dB | 137 dB | 137 dB |
| Syva Low | [SYVA LOW_100] | — | — | 131 dB | — | — | 137 dB | 137 dB | 137 dB |
| Syva Sub | [SYVA SUB_60] | — | 119 dB | 122 dB | — | — | 122 dB | 122 dB | 122 dB |
| Syva Sub | [SYVA SUB_100] | — | 122 dB | 123 dB | 128 dB | — | 128 dB | 128 dB | 128 dB |
| Syva Sub | [SYVA SUB_200] | — | 123 dB | 125 dB | 130 dB | — | 130 dB | 130 dB | 130 dB |
| SB10i | [SB10_60] | 111 dB | 118 dB | 119 dB | — | — | 119 dB | 119 dB | 119 dB |
| SB10i | [SB10_100] | 112 dB | 120 dB | 120 dB | 122 dB | — | 122 dB | 122 dB | 122 dB |
| SB10i | [SB10_200] | 114 dB | 123 dB | 123 dB | 125 dB | — | 125 dB | 125 dB | 125 dB |
| SB6i | [SB6_60] | 106 dB | — | 110 dB | — | — | 110 dB | 110 dB | 110 dB |
| SB6i | [SB6_100] | 106 dB | — | 111 dB | — | — | 111 dB | 111 dB | 111 dB |
| SB6i | [SB6_200] | 108 dB | — | 115 dB | — | — | 115 dB | 115 dB | 115 dB |

> **셀 병합 상세(행별로 다름, PDF 세로선 좌표 검증 결과)**:
> - K1, K1-SB(전 3행), KS28: LA4X·LA7.16(i)·LA12X 세 칸이 완전히 분리되어
>   있음 — 실제로 LA4X="—"(값 없음), LA7.16(i)="—", LA12X만 값 있음(K1/K1-SB),
>   KS28은 LA4X="—", LA7.16(i)="—", LA12X="143 dB"로 세 칸 모두 원문 그대로.
> - L2, L2D: LA4X="—"(분리), LA7.16(i)에 값, LA12X="—"(분리) — 세 칸 분리.
> - CS1 [CS1_60]: LA4X="—"(분리), LA7.16(i)+LA12X 병합(147 dB 복사).
> - CS1 [CS1_X]: 세 칸 완전 분리 — LA4X="—", LA7.16(i)="150 dB", LA12X="—".
> - 그 외 모든 행(X-series, Soka, Syva, A-series, K2, K3(i), Kara II(i),
>   Kiva II, KS21(i), SB18, SB15m, Syva Low, Syva Sub, SB10i, SB6i): LA4X·
>   LA7.16(i)·LA12X 세 칸이 하나로 병합되어 있어 동일 값을 세 컬럼에 복사.

> ✅ 위 표는 pdfplumber로 PDF 4~5페이지의 단어 좌표(x0)뿐 아니라 실제 셀
> 경계선(도형 좌표)까지 재추출하여 병합 여부를 확인 후 검증 완료. 정밀 대조
> 필요 시 원본 PDF(`amplification-reference-tb-en.pdf`) 4~5페이지 직접 참고.

## Loudspeaker connection (p.5-9)

For specific cabling instructions, refer to the user documentation of the enclosure system. 이 섹션은 배선도(다이어그램) 위주 페이지로, PDF 텍스트 추출 특성상 도면의 라벨/핀 번호만 순서 없이 나열됨 — 원본 PDF의 그림을 참고해야 정확히 이해 가능. 아래는 추출된 라벨 텍스트 그대로:

### 1-channel enclosures — 1-channel speakON output

- SP custom cable
- SP 2.5 mm² cable
- 1+/1- / 1+/1- / +-+- / 1+ / 1-

### 2-channel enclosures

**2-channel speakON output**
- CH(1) / SP SP-Y1 / SP / CC4FP / CH(2)
- 1+/1- / 2+/2- / 2.5 mm² cable / +-+- / 1+ / 1- / 2.5 mm² cable / +-+- / custom cable / 1+/1- 2+ / 2- / 2+/2-

**4-channel CA-COM output**
- DO / SP / 8AL-BUSOD / SPK1 / SPK2 / SPK3 / SPK4

**LA1.16i / LA2Xi / LA7.16i terminal block output (SE)**
- 1+ / 1− / 2+ / 2− / +-+- / 2.5 mm² cables / 1+/1- / custom cable / 1+ 1+ / 1− 1- / 2+ / 2− SP

**LA1.16i / LA2Xi terminal block output (BTL)**
- 1+ / 1− / 2+ / 2− / +-+- / 2.5 mm² cables / 1+/1- / 1+ 1+ custom cable / 1− / 2+ / 2− 1- SP

**LA2Xi terminal block output (PBTL)**
- custom cable / 1+ 1+ / 1− 1- / 2+ / 2− 1+/1- / 3+ / 3− / 4+ / 2.5 mm² cables / 4−

**2-channel speakON output (추가 배선)**
- SP / SP / 1+/1- 1+/1- / 2+/2- 2+/2- / + - + - / LF HF / + - + / custom cable / 1-1+ 2-2+ / - / 2.5 mm² cables

**4-channel CA-COM output**
- DO / SP / 8AL-LLIFOD / 2W CH(A) / 2W CH(B)
- DO / SP / LLIFW3OD / 2WAY / SUB1 / SUB2

**LA2Xi / LA7.16i terminal block output (SE)**
- 1+ / 1− / 2+ / 2− / + / 2.5 mm² cables / - + - / LF HF / + - + -

### 4-channel enclosures

**4-channel CA-COM output**: DO / DO

**LA7.16i terminal block output**
- 1+ A / 4− H
- 1− B / 4+ G
- 2+ C / 3− F
- 2− D / 3+ E
- custom cable

**4-channel SC32 output**: SC32-4DO

### 16-channel enclosures

**16-channel connector output**: SC32

**LA7.16i terminal block output**
- 1+ 4− 5+ 8− 9+ 12− 13+ 16−
- 1− 4+ 5− 8+ 9− 12+ 13− 16+
- 2+ 3− 6+ 7− 10+ 11− 14+ 15−
- 2− 3+ 6− 7+ 10− 11+ 14− 15+
- custom patch / SC32 BE

## Recommendation for speaker cables (p.10)

### Cable quality and resistance

Only use high-quality fully insulated loudspeaker cables made of stranded copper wire. Use cables with a gauge offering low resistance per unit length and keep the cables as short as possible.

It is good practice to keep loudspeaker cables short to ensure optimal system performance. L-Acoustics strongly recommends using cables of similar type, length, and gauge to address symmetrical deployment of loudspeakers, such as stereo systems, L-ISA frontal systems, or outfill systems.

For more information about cable effect on loudspeaker frequency response, refer to the publication *Demystifying the effects of loudspeaker cables* on the L-Acoustics website, in Education > Scientific resources > Scientific publications.

Refer to the following table for recommended cable length for uncompromised performance.

**Cable gauge — recommended maximum length**

| Cable gauge (mm²) | SWG | AWG | 8 Ω load (m) | 8 Ω load (ft) | 4 Ω load (m) | 4 Ω load (ft) | 2.7 Ω load (m) | 2.7 Ω load (ft) |
|---|---|---|---|---|---|---|---|---|
| 1.5 | 18 | 16 | 18 | 60 | 9 | 30 | ‒ | ‒ |
| 2.5 | 15 | 14 | 30 | 100 | 15 | 50 | 10 | 33 |
| 4 | 13 | 11 | 50 | 160 | 25 | 80 | 17 | 53 |
| 6 | 11 | 9 | 74 | 240 | 37 | 120 | 25 | 80 |

Use the more detailed L-Acoustics calculation tool to evaluate cable length and gauge based on the type and number of loudspeakers connected. The calculation tool is available on our website: https://www.l-acoustics.com/installation-tools/

---

**Document meta**: Amplification reference technical bulletin (EN) version 16.0
