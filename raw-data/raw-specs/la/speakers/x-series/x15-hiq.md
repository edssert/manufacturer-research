# X15 HiQ (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(X 시리즈 최초의 진짜 능동 2-way 제품)

**스켈레톤 근거**: X15 HiQ는 지금까지의 X 시리즈 제품(X8/X12/X6i/X4i/X4r, 전부 단일 채널 패시브)과 달리, 자체 OM 커넥터 핀아웃 표가 "Internal pinout for L-Acoustics 2-way **active** enclosures"로 명시되고(LF+/LF-/HF+/HF- 4핀 분리, K3와 동일 패턴) LF/HF 임피던스·파워핸들링도 대역별 분리값(8Ω/8Ω, 322W/62W)으로 독립 보고되는 **진짜 능동 2-way** 아키텍처다 — X 시리즈 최초 사례. 컴패니언 서브우퍼는 SB18/KS21.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | X15 HiQ | - |
| Product_Series | X Series | - |
| Product_Type | Short throw point source | - |
| Description | 2-way active coaxial enclosure: 15" LF cone driver + 3" HF diaphragm compression driver, amplified by LA4X / LA8 / LA12X | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | EN 62368-1:2014 | - |
| WEEE_Marking | Yes (EU) | - |

### 주석 및 출처

**출처**: X15_HiQ_OM_EN.pdf(EN version 2.0) p.77 "X15 HiQ specifications", p.4 "Safety > Instructions".

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | [X15]: 55 - 20000 | Hz |
| Frequency_Response_6dB_Hz | 62 - 20000 | Hz |
| Frequency_Response_3dB_Hz | 70 - 20000 | Hz |
| Max_SPL_Peak | 138 | dB |
| Nominal_Directivity_Horizontal_deg [1] | 40 (ellipsoid, symmetric) | deg |
| Nominal_Directivity_Vertical [1] | 60 (ellipsoid, symmetric) / Monitoring: 35 or 55 | deg |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | X15, X15_MO | - |

### 주석 및 출처

**출처**: X15_HiQ_OM_EN.pdf p.77; X15HiQ_AE_EN.docx.
**[1] Ellipsoid 지향각**: 원문 "vertical: 60° / horizontal: 40°" — X12와 마찬가지로 타원형 비대칭 지향각.
**Cardioid_Capability=No(확정적 비존재)**: 전량 스캔 0건(컴패니언 SB18/KS21 자신의 카디오이드 구성은 X15 HiQ 자신의 속성이 아님).

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 1 x 15" cone driver | - |
| HF_Transducer | 1 x 3" diaphragm compression driver, neodymium | - |
| LF_Acoustical_Load | bass-reflex, L-Vents | - |
| HF_Acoustical_Load | ellipsoidal waveguide | - |
| Passive_Crossover_Network | No | - |
| LF_Nominal_Impedance | 8 | Ohm |
| HF_Nominal_Impedance | 8 | Ohm |
| RMS_Power_Handling_LF | 322 | W |
| RMS_Power_Handling_HF | 62 | W |

### 주석 및 출처

**출처**: X15_HiQ_OM_EN.pdf p.77; X15HiQ_AE_EN.docx.
**Passive_Crossover_Network=No**: 전문 "crossover" 키워드 스캔 0건 — 2-way active enclosures 표와 일치(K3와 동일 근거).
**대역별 분리 임피던스/파워**: 기존 X 시리즈(통합값)와 달리 진짜 능동 2-way라 LF/HF 대역별 분리 보고.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 4-point speakON (IN) | - |
| Link_Connector | 1 x 4-point speakON (LINK) | - |
| SpeakON_Pinout_1 | LF+ / LF- | - |
| SpeakON_Pinout_2 | HF+ / HF- | - |

### 주석 및 출처

**출처**: X15_HiQ_OM_EN.pdf p.12 "Connectors"("Internal pinout for L-Acoustics 2-way active enclosures").
**K3와 동일 패턴, 기존 X 시리즈와 대조**: X8/X12/X6i/X4i/X4r은 단일 채널(+/-) 구조였으나, X15 HiQ는 speakON 2채널 각각이 LF/HF를 독립 담당.

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA4X, LA8, LA12X | - |
| Crossover_Type | Active (2-way) | - |

### 주석 및 출처

**출처**: X15_HiQ_OM_EN.pdf.

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | 1 x DIN580-compatible M8 threaded insert(보조 안전용), 4 x M10 threaded inserts(외부 리깅용), 2 x 35mm pole socket | - |
| Handles | 2 | count |
| Weight_Net | 21 | kg |

### 주석 및 출처

**출처**: X15_HiQ_OM_EN.pdf p.77.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 430 | mm |
| Height_mm | 580 | mm |
| Depth_mm | 375 | mm |
| Cabinet_Material | premium grade Baltic beech and birch plywood | - |
| Front_Material | steel with anti-corrosion coating, acoustically neutral 3D fabric | - |
| Finish_Color | dark grey brown Pantone 426 C, custom RAL code on special order | - |
| IP_Rating | IP43 | - |

### 주석 및 출처

**출처**: X15_HiQ_OM_EN.pdf p.78; X15HiQ_AE_EN.docx.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| X15 HiQ standalone point source | [X15] | 55 - 20000 | null | null |
| X15 HiQ with SB18 | [X15] + [SB18_100] | 32 - 20000 | 1 X15 HiQ : 1 SB18 | null |
| X15 HiQ with KS21 | [X15] + [KS21_100] | 31 - 20000 | 1 X15 HiQ : 1 KS21 | null |
| X15 HiQ stage monitor (단독) | [X15_MO] | 52 - 20000 | null | null |
| X15 HiQ stage monitor with SB18 | [X15_MO] + [SB18_100] | 32 - 20000 | 1 X15 HiQ : 1 SB18 | null |
| X15 HiQ stage monitor with KS21 | [X15_MO] + [KS21_60] or [KS21_100] | 29-31 - 20000 | 1 X15 HiQ : 1 KS21 | null |

### 주석 및 출처

**출처**: X15_HiQ_OM_EN.pdf p.24-31 "Loudspeaker configurations".
**SB18 IIi/KS21i 호환성**: 원문 "Values and ratios are the same for SB18 IIi"/"KS21i" — 단, KS21i는 pole-mounted 구성과 기계적 비호환.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| [X15] + [SB18_100] | 4 | SB18 = 0 | X15 HiQ = + / SB18 = − |
| [X15] + [SB18_100_C] | 9.7 | SB18 = 0 | X15 HiQ = + / SB18 = − |
| [X15] + [SB18_100_Cx] | 8.25 | SB18 = 0 | X15 HiQ = + / SB18 = + |
| [X15] + [KS21_100] | 0 | KS21 = 1.5 | X15 HiQ = + / KS21 = + |
| [X15] + [KS21_100_C] | 3.9 | KS21 = 0 | X15 HiQ = + / KS21 = + |
| [X15] + [KS21_100_Cx] | 2.6 | KS21 = 0 | X15 HiQ = + / KS21 = − |
| [X15_MO] + [SB18_100] | 0 | SB18 = 1 | X15 HiQ = + / SB18 = + |
| [X15_MO] + [KS21_100] | 0 | KS21 = 1.5 | X15 HiQ = + / KS21 = + |

### 주석 및 출처

**출처**: X15_HiQ_OM_EN.pdf p.27, 28, 30, 31 "Pre-alignment delays" — 딜레이는 텍스트, 폴라리티는 페이지 이미지 렌더링으로 확인.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| wall-mounted | X-US1215 / X-UL15 + X-UTILT (optional) | 1 | 1 |
| ceiling-mounted | X-US1215 / X-UL15 | 1 | 1 |
| flown | X-BAR + CLAMP250 | 1 | 1 |
| pole-mounted | 35 mm pole (+ EMBi and X-US1215 optional) | 1 | 1 |
| ground-stacked | no rigging accessory | 1 | 1 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 5:1 | - |

### 주석 및 출처

**출처**: X15_HiQ_OM_EN.pdf "Mechanical safety".

## Null Report

**미확인**: Model_Number, Frequency_Response_5dB/4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, Max_Enclosures_Per_Controller_Output/Total, Inter_Enclosure_Angles_deg, Rigging_Components_Material, Max_Wind_Load, preset_guide_and_matching Recommended_Ratio/Minimum_Line_Length(8건).
**비적용**: Nominal_Impedance_Overall, RMS_Power_Handling_Overall, Peak_Power_Handling_10ms_Overall.

**[MR_v1.8 반영 메모]**: 이 파일은 `upload/X15_HiQ_v1.3.md`를 이 저장소의 raw-spec으로 이관한 것이다(기존 역재구성본을 대체). `public/js/domains/speakers/data/la/x-series.data.js`에 Cardioid_Capability/wattByBand(LF 322W+HF 62W)/Preset Guide/Matching Ratio/Delay Defaults/Mechanical Safety를 신규 반영했다.
