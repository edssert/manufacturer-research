# X4i (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(X6i/X8i와 동일 계열의 최소형 버전)

**스켈레톤 근거**: X4i는 X6i/X8i와 같은 X 시리즈 설치형 2-way 패시브 동축 점음원이나 (1) **밀폐형(closed enclosure)** 음향 부하, (2) 임피던스 **16Ω**, (3) 커넥터가 terminal block이 아닌 **screw terminal**(나사 단자), (4) 이중 프리셋명이 **[X4]/[X4_60]**(제품명 축약형).

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | X4i | - |
| Product_Series | X Series | - |
| Product_Type | Short throw point source | - |
| Description | 2-way passive coaxial enclosure (installation version): 4" LF neodymium cone driver + 1.4" HF diaphragm compression driver, amplified by LA2Xi / LA4X / LA7.16i / LA12X | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | EN 62368-1:2014 | - |
| WEEE_Marking | null | - |

### 주석 및 출처

**출처**: X4i_AE_EN.docx; X4i_OM_EN_6.0.pdf p.75 "X4i specifications", p.13 "Rigging system description".
**Product_Series**: X4i는 "X Series"(i 없음)로 표기 — X6i/X8i의 "Xi Series"와 다른 원문 자체의 비일관성, 그대로 채택.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz [1] | [X4_60]: 65 - 20000 / [X4]: 120 - 20000 | Hz |
| Frequency_Response_6dB_Hz [1] | [X4_60]: 77 - 20000 / [X4]: 145 - 20000 | Hz |
| Frequency_Response_3dB_Hz [1] | [X4_60]: 105 - 20000 / [X4]: 180 - 20000 | Hz |
| Max_SPL_Peak [1] | [X4]: 116 dB / [X4_60]: 110 dB | dB |
| Nominal_Directivity_Horizontal_deg | 110 (axisymmetric) | deg |
| Nominal_Directivity_Vertical | 110 (axisymmetric) | deg |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | X4, X4_60, X4_MO | - |

### 주석 및 출처

**출처**: X4i_AE_EN.docx; X4i_OM_EN_6.0.pdf p.75, p.25.
**[1] 프리셋-수치 짝짓기 소스 간 충돌**: AE는 "Preset 1: 65Hz/116dB, Preset 2: 120Hz/110dB"로 서술하나 OM 스펙 표는 반대로 "[X4](120Hz)=116dB, [X4_60](65Hz)=110dB" — OM 우선 원칙으로 OM 짝짓기 채택.
**DSP_Preset_Name**: 프리셋명이 "X4i"가 아닌 "X4"(축약형).
**Cardioid_Capability=No(확정적 비존재)**: 전량 스캔 0건.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 4" neodymium cone driver | - |
| HF_Transducer | 1.4" diaphragm compression driver | - |
| LF_Acoustical_Load [1] | closed enclosure | - |
| Passive_Crossover_Network | Yes | - |
| Nominal_Impedance_Overall | 16 | Ohm |
| RMS_Power_Handling_Overall | 42 | W |

### 주석 및 출처

**출처**: X4i_AE_EN.docx; X4i_OM_EN_6.0.pdf p.75.
**[1] LF_Acoustical_Load=closed enclosure**: X6i/X8i(bass-reflex)와 달리 X4i는 밀폐형.
**Nominal_Impedance_Overall=16Ω**: X6i/X8i(8Ω)와 다름.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector [1] | 1 x 2-point screw terminal | - |
| Link_Connector [1] | 1 x 2-point screw terminal | - |
| Screw_Terminal_Pinout_1 | + / - (combined LF+HF signal) | - |
| Screw_Terminal_Pinout_2 | Not linked | - |

### 주석 및 출처

**출처**: X4i_OM_EN_6.0.pdf p.13 "Connectors"; X4i_AE_EN.docx.
**[1] 신규 커넥터 모델 Key**: X6i/X8i는 terminal block(push-in)인 반면 X4i는 명시적으로 "Screw terminal"(나사 조임) — 물리적으로 다른 하드웨어라 별도 Key.

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA2Xi, LA4X, LA7.16i, LA12X | - |
| Crossover_Type | Passive (2-way) | - |

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | 1 x M5 insert + screw (X-U4i/X-B4i 마운트용), 2 x M6 inserts(리깅 액세서리용), 1 x M6 insert(보조 안전용) | - |
| Handles | 0 | count |
| Weight_Net | 1 | kg |

### 주석 및 출처

**출처**: X4i_OM_EN_6.0.pdf p.75; p.13.
**Handles=0(확정적 비존재)**: 전량 스캔 0건 — 초소형(1kg) 설치용 제품.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 116 | mm |
| Height_mm | 116 | mm |
| Depth_mm | 99 | mm |
| Cabinet_Material | premium grade Baltic birch plywood | - |
| Front_Material | coated steel grill, acoustically neutral 3D fabric | - |
| Finish_Color | dark grey brown Pantone 426 C, pure white RAL 9010, custom RAL code on special order | - |
| IP_Rating [1] | IP55 | - |

### 주석 및 출처

**출처**: X4i_AE_EN.docx; X4i_OM_EN_6.0.pdf p.76.
**[1] IP_Rating 조건부**: "With connector sealing plate".

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| X4i standalone (고SPL) | [X4] | 120 - 20000 | null | null |
| X4i with SB6i, closely coupled(200Hz) | [X4] + [SB6_200] | 32 - 20000 | 1 X4i : 1 SB6i | null |
| X4i with SB6i, coupled(100Hz) | [X4] + [SB6_100] | 29 - 20000 | 1 X4i : 1 SB6i | null |
| X4i with SB6i, separated(60Hz) [1] | [X4_60] + [SB6_60] | 29 - 20000 | 2 X4i : 1 SB6i | null |
| X4i with SB10i, closely coupled(200Hz) | [X4] + [SB10_200] | 29 - 20000 | 2 X4i : 1 SB10i | null |
| X4i with SB10i, coupled(100Hz) | [X4] + [SB10_100] | 27 - 20000 | 2 X4i : 1 SB10i | null |
| X4i with SB10i, separated(60Hz) | [X4_60] + [SB10_60] | 25 - 20000 | 3 X4i : 1 SB10i | null |

### 주석 및 출처

**출처**: X4i_OM_EN_6.0.pdf p.25-31 "Loudspeaker configurations".
**[1] Recommended_Ratio 정정**: 원문 표(p.28 "Ratio" 행) 확인 결과 "2 X4i : 1 SB6i"가 정확한 값.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| [X4] or [X4_MO] + [SB6_200] | 0.6 | SB6i = 0 | X4i = + / SB6i = - |
| [X4] or [X4_MO] + [SB6_100] | 0 | SB6i = 0.4 | X4i = + / SB6i = + |
| [X4_60] + [SB6_60] | 1.8 | SB6i = 0 | X4i = + / SB6i = - |

### 주석 및 출처

**출처**: X4i_OM_EN_6.0.pdf p.26-28 "Pre-alignment delays".

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| all configurations | X-U4i, X-B4i 등 | 1 | 1 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 5:1 | - |

### 주석 및 출처

**출처**: X4i_OM_EN_6.0.pdf "Mechanical safety".

## Null Report

**미확인**: Model_Number, WEEE_Marking, Frequency_Response_5dB/4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, Max_Enclosures_Per_Controller_Output/Total, Inter_Enclosure_Angles_deg, Rigging_Components_Material, Max_Wind_Load, preset_guide_and_matching(8건).
**비적용**: HF_Acoustical_Load.

**[MR_v1.8 반영 메모]**: 이 파일은 `upload/X4i_v1.5.md`를 이 저장소의 raw-spec으로 이관한 것이다(기존 역재구성본을 대체). `public/js/domains/speakers/data/la/x-series.data.js`에 Cardioid_Capability/Preset Guide/Matching Ratio/Delay Defaults/Mechanical Safety를 신규 반영했다. 기존 필드는 대조 후 이상 없음.
