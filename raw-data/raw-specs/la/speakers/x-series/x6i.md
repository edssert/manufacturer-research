# X6i (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(X8i와 동일 아키텍처의 소형 버전)

**스켈레톤 근거**: X6i는 X8i와 완전히 동일한 아키텍처(2-way 패시브 동축, terminal block, 90° axisymmetric, 이중 프리셋 구조, IP55, EN 62368-1)이며 차이는 트랜스듀서 크기(6.5" LF vs 8" LF)와 스펙 수치뿐이다.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | X6i | - |
| Product_Series | Xi Series | - |
| Product_Type | Short throw point source | - |
| Description | 2-way passive coaxial enclosure (installation version): 6.5" LF cone driver + 1.5" HF diaphragm compression driver, amplified by LA2Xi / LA4X / LA7.16i / LA12X | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | EN 62368-1:2014 | - |
| WEEE_Marking | null | - |

### 주석 및 출처

**출처**: X6i_AE_EN.docx; X6i_OM_EN_2.0.pdf p.194 "X6i specifications".

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz [1] | [X6i_50]: 54 - 20000 / [X6i]: 69 - 20000 | Hz |
| Frequency_Response_6dB_Hz [1] | [X6i_50]: 60 - 20000 / [X6i]: 76 - 20000 | Hz |
| Frequency_Response_3dB_Hz [1] | [X6i_50]: 67 - 20000 / [X6i]: 84 - 20000 | Hz |
| Max_SPL_Peak [2] | [X6i_50]: 117 dB / [X6i]: 123 dB (LA2Xi bridge/LA4X/LA7.16i/LA12X); [X6i]: 122 dB (LA2Xi single-ended) | dB |
| Nominal_Directivity_Horizontal_deg | 90 (axisymmetric) | deg |
| Nominal_Directivity_Vertical | 90 (axisymmetric) | deg |
| Cardioid_Capability | No | - |
| DSP_Preset_Name [1] | X6i, X6i_50 | - |

### 주석 및 출처

**출처**: X6i_AE_EN.docx; X6i_OM_EN_2.0.pdf p.194.
**Cardioid_Capability=No(확정적 비존재)**: 전량 스캔 0건.
**[1] 이중 프리셋 구조**: X8i와 동일 개념 — [X6i](고SPL, 123dB, 69Hz~)와 [X6i_50](풀레인지, 117dB, 54Hz~).
**[2] Max_SPL_Peak 원문 표 일부 결측**: LA2Xi 단독모드([X6i_50]) 값이 원문에서 확인되지 않음.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 6.5" cone driver | - |
| HF_Transducer | 1.5" diaphragm compression driver, neodymium | - |
| LF_Acoustical_Load | bass-reflex | - |
| Passive_Crossover_Network | Yes | - |
| Nominal_Impedance_Overall | 8 | Ohm |
| RMS_Power_Handling_Overall | 83 | W |

### 주석 및 출처

**출처**: X6i_AE_EN.docx; X6i_OM_EN_2.0.pdf p.194.
**Passive_Crossover_Network=Yes/통합값**: X8i와 동일 구조 — 통합값(8Ω/83W).

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 4-point terminal block with push-in connection | - |
| Link_Connector | 1 x 4-point terminal block with push-in connection | - |
| Terminal_Block_Pinout_1 | + / - (combined LF+HF signal) | - |
| Terminal_Block_Pinout_2 | Not linked | - |

### 주석 및 출처

**출처**: X6i_OM_EN_2.0.pdf "Connectors"(X8i와 동일 표 제목/구조); X6i_AE_EN.docx.

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA2Xi, LA4X, LA7.16i, LA12X | - |
| Crossover_Type | Passive (2-way) | - |

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | 8 x M6 threaded inserts; wall/ceiling/pole-mount 및 고정/가변 틸트각 액세서리(X8i와 동일 액세서리 체계) | - |
| Weight_Net | 6.3 | kg |

### 주석 및 출처

**출처**: X6i_OM_EN_2.0.pdf p.194.
**Monitoring_angle=35°/55°**: X8i와 동일 이중 틸트각 지원.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 187 | mm |
| Height_mm | 362 | mm |
| Depth_mm | 170 | mm |
| Cabinet_Material | premium grade Baltic beech and birch plywood | - |
| Front_Material | coated steel grill, acoustically neutral 3D fabric | - |
| Finish_Color | dark grey brown Pantone 426 C, pure white RAL 9010, custom RAL code on special order | - |
| IP_Rating | IP55 | - |

### 주석 및 출처

**출처**: X6i_AE_EN.docx; X6i_OM_EN_2.0.pdf p.195.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| X6i standalone (고SPL) | [X6i] | 69 - 20000 | null | null |
| X6i standalone (풀레인지) | [X6i_50] | 54 - 20000 | null | null |
| X6i with SB6i(r), closely coupled(200Hz) | [X6i] + [SB6_200] | 32 - 20000 | 1 X6i : 2 SB6i | null |
| X6i with SB6i(r), coupled(100Hz) | [X6i] + [SB6_100] | 29 - 20000 | 1 X6i : 2 SB6i(r) | null |
| X6i with SB6i(r), separated(60Hz) | [X6i_50] + [SB6_60] | 29 - 20000 | 1 X6i : 1 SB6i(r) | null |
| X6i with SB10i(r), closely coupled(200Hz) | [X6i] + [SB10_200] | 29 - 20000 | 1 X6i : 1 SB10i(r) | null |
| X6i with SB10i(r), coupled(100Hz) | [X6i] + [SB10_100] | 27 - 20000 | 1 X6i : 1 SB10i(r) | null |
| X6i with SB10i(r), separated(60Hz) [1] | [X6i_50] + [SB10_60] | 27 - 20000 | 1 X6i : 1 SB10i(r) | null |

### 주석 및 출처

**출처**: X6i_OM_EN_2.0.pdf p.37-44 "Loudspeaker configurations".
**[1] separated 조합 대역폭 원문 내 서술-표 불일치**: 서술문은 25Hz, 스펙 표는 27Hz — 표 값(27Hz) 채택.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| [X6i] + [SB6_200] | 0 | SB6i = 0 | X6i = + / SB6i = - |
| [X6i] + [SB6_100] | 0 | SB6i = 1.2 | X6i = + / SB6i = + |
| [X6i_50] + [SB6_60] | 0 | SB6i = 2 | X6i = + / SB6i = + |
| [X6i] + [SB10_200] | 1.4 | SB10i = 0 | X6i = + / SB10i = - |
| [X6i_50] + [SB10_60] | 0 | SB10i = 6.8 | X6i = + / SB10i = - |

### 주석 및 출처

**출처**: X6i_OM_EN_2.0.pdf p.39-44 "Pre-alignment delays".
**[X6i]+[SB10_100](coupled) 조합**: 원문에 딜레이 표 자체가 없음("No pre-alignment delay values are required") — 이 표에서 제외.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| all configurations | X8i와 동일 액세서리 체계 | 1 | 1 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 5:1 | - |

### 주석 및 출처

**출처**: X6i_OM_EN_2.0.pdf "Mechanical safety".

## Null Report

**미확인**: Model_Number, WEEE_Marking, Frequency_Response_5dB/4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, Max_Enclosures_Per_Controller_Output/Total, Inter_Enclosure_Angles_deg, Handles, Rigging_Components_Material, Max_Wind_Load, delay_defaults([X6i]+[SB10_100]), preset_guide_and_matching(10건).
**비적용**: HF_Acoustical_Load.

**[MR_v1.8 반영 메모]**: 이 파일은 `upload/X6i_v1.5.md`를 이 저장소의 raw-spec으로 이관한 것이다(기존 역재구성본을 대체). `public/js/domains/speakers/data/la/x-series.data.js`에 Cardioid_Capability/Preset Guide/Matching Ratio/Delay Defaults/Mechanical Safety를 신규 반영했다. 기존 필드는 대조 후 이상 없음.
