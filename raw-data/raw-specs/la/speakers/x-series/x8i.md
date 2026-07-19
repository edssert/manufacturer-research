# X8i (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(X8의 install 파생형)

**스켈레톤 근거**: X8i는 X8과 동일한 2-way 패시브 동축 점음원 아키텍처이나 (1) 커넥터가 speakON이 아닌 **4-point terminal block**(push-in), (2) 지향각이 100°가 아닌 **90°**, (3) 무대 모니터 틸트각이 35°/55° 두 단계, (4) 앰프 호환성이 **LA2Xi/LA4X/LA7.16i/LA12X**, (5) IP55(X8은 IP43), (6) **2개의 대체 팩토리 프리셋([X8i]/[X8i_40])**이 서로 다른 대역폭/SPL을 제공.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | X8i | - |
| Product_Series | Xi Series | - |
| Product_Type | Short throw point source | - |
| Description | 2-way passive coaxial enclosure (installation version): 8" LF cone driver + 1.5" HF diaphragm compression driver, amplified by LA2Xi / LA4X / LA7.16i / LA12X | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | EN 62368-1:2014 | - |
| WEEE_Marking | null | - |

### 주석 및 출처

**출처**: X8i_AE_EN.docx; X8i_OM_EN_2.0.pdf p.189 "X8i specifications", p.22 "Mechanical safety".
**Product_Series**: "X Series"가 아닌 "Xi Series"로 별도 표기(X6i도 동일 패턴).

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz [1] | [X8i_40]: 43 - 20000 / [X8i]: 67 - 20000 | Hz |
| Frequency_Response_6dB_Hz [1] | [X8i_40]: 48 - 20000 / [X8i]: 75 - 20000 | Hz |
| Frequency_Response_3dB_Hz [1] | [X8i_40]: 54 - 20000 / [X8i]: 83 - 20000 | Hz |
| Max_SPL_Peak [2] | [X8i_40]: 123 dB / [X8i]: 129 dB (LA2Xi bridge/LA4X/LA7.16i/LA12X); [X8i_40]: 121 dB / [X8i]: 125 dB (LA2Xi single-ended) | dB |
| Nominal_Directivity_Horizontal_deg | 90 (axisymmetric) | deg |
| Nominal_Directivity_Vertical | 90 (axisymmetric) | deg |
| Cardioid_Capability | No | - |
| DSP_Preset_Name [1] | X8i, X8i_40 | - |

### 주석 및 출처

**출처**: X8i_AE_EN.docx; X8i_OM_EN_2.0.pdf p.189.
**Cardioid_Capability=No(확정적 비존재)**: 전량 스캔 0건.
**[1] 이중 프리셋 구조**: [X8i](고SPL, 129dB, 67Hz~)와 [X8i_40](풀레인지, 123dB, 43Hz~).
**[2] Max_SPL_Peak 4중 구조**: 프리셋(2종) × 앰프 모드 조합으로 4개 값.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 8" cone driver | - |
| HF_Transducer | 1.5" diaphragm compression driver, neodymium | - |
| LF_Acoustical_Load | bass-reflex | - |
| Passive_Crossover_Network | Yes | - |
| Nominal_Impedance_Overall | 8 | Ohm |
| RMS_Power_Handling_Overall | 197 | W |

### 주석 및 출처

**출처**: X8i_AE_EN.docx; X8i_OM_EN_2.0.pdf p.189.
**Passive_Crossover_Network=Yes/통합값**: X8와 동일 구조 — terminal block 1채널만 신호, 통합값(8Ω/197W).

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector [1] | 1 x 4-point terminal block with push-in connection | - |
| Link_Connector [1] | 1 x 4-point terminal block with push-in connection | - |
| Terminal_Block_Pinout_1 | + / - (combined LF+HF signal) | - |
| Terminal_Block_Pinout_2 | Not linked | - |

### 주석 및 출처

**출처**: X8i_OM_EN_2.0.pdf p.16 "Connectors"(X8/Kiva II와 동일 표 제목); X8i_AE_EN.docx.

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA2Xi, LA4X, LA7.16i, LA12X | - |
| Crossover_Type | Passive (2-way) | - |

### 주석 및 출처

**출처**: X8i_OM_EN_2.0.pdf "X8i, SB10i(r), Syva Sub, and KS21(i) are driven by LA2Xi / LA4X / LA7.16i / LA12X". X8(LA4X/LA8/LA12X)과 달리 LA8 대신 LA2Xi/LA7.16i 포함.

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | 8 x M6 threaded inserts; wall/ceiling/pole-mount 및 고정/가변 틸트각 액세서리(TILT-SUPPORT, WALLx2, PANx2, TILT5/15/40 등) 다수 조합 지원 | - |
| Weight_Net | 11 | kg |

### 주석 및 출처

**출처**: X8i_OM_EN_2.0.pdf p.189; p.44-45 "Mechanical configurations overview".
**Monitoring_angle=35°/55°**: 무대 모니터 사용 시 두 단계 틸트각 지원.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 240 | mm |
| Height_mm | 490 | mm |
| Depth_mm | 217 | mm |
| Cabinet_Material | premium grade Baltic beech and birch plywood | - |
| Front_Material | coated steel grill, acoustically neutral 3D fabric | - |
| Finish_Color | dark grey brown Pantone 426 C, pure white RAL 9010, custom RAL code on special order | - |
| IP_Rating [1] | IP55 | - |

### 주석 및 출처

**출처**: X8i_AE_EN.docx; X8i_OM_EN_2.0.pdf p.190.
**[1] IP_Rating 조건부**: "With connector at the top and connector sealing plate".

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| X8i standalone (고SPL) | [X8i] | 67 - 20000 | null | null |
| X8i standalone (풀레인지) | [X8i_40] | 43 - 20000 | null | null |
| X8i with SB10i(r), coupled [1] | [X8i] + [SB10_100] | 27 - 20000 | 1 X8i : 1 SB10i(r) | null |
| X8i with SB10i(r), separated [1] | [X8i_40] + [SB10_60] | 25 - 20000 | 1 X8i : 1 SB10i(r) | null |
| X8i with Syva Sub, coupled [1] | [X8i] + [SYVA SUB_100] | 27 - 20000 | 1 X8i : 1 Syva Sub | null |
| X8i with KS21(i), coupled [1] | [X8i] + [KS21_100] | 31 - 20000 | 1 X8i : 1 KS21(i) | null |

### 주석 및 출처

**출처**: X8i_OM_EN_2.0.pdf p.38-42 "Loudspeaker configurations".
**[1] "coupled"/"separated" 거리 조건**: 최대/최소 1.7m 배치 거리 전제.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| [X8i] + [SB10_100] | 0 | SB10i = 0.5 | X8i = + / SB10i = + |
| [X8i_40] + [SB10_60] | 0 | SB10i = 3 | X8i = + / SB10i = + |
| [X8i] + [SYVA SUB_100] | 0 | Syva Sub = 0 | X8i = + / Syva Sub = - |

### 주석 및 출처

**출처**: X8i_OM_EN_2.0.pdf p.39-41 "Pre-alignment delays".
**[X8i] + [KS21_100] 딜레이값 없음**: 원문이 "geometric delays만 추가"만 언급, 이 조합은 표에서 제외.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| all configurations | TILT-SUPPORT, WALLx2, PANx2, TILT5/15/40 등 | 1 | 1 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 5:1 | - |

### 주석 및 출처

**출처**: X8i_OM_EN_2.0.pdf p.22 "Mechanical safety".

## Null Report

**미확인**: Model_Number, WEEE_Marking, Frequency_Response_5dB/4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, Max_Enclosures_Per_Controller_Output/Total, Inter_Enclosure_Angles_deg, Handles, Rigging_Components_Material, Max_Wind_Load, preset_guide_and_matching(8건).
**비적용**: HF_Acoustical_Load.

**[MR_v1.8 반영 메모]**: 이 파일은 `upload/X8i_v1.5.md`를 이 저장소의 raw-spec으로 이관한 것이다(기존 역재구성본을 대체). `public/js/domains/speakers/data/la/x-series.data.js`에 Cardioid_Capability/Preset Guide/Matching Ratio/Delay Defaults/Mechanical Safety를 신규 반영했다. **RMS_Power_Handling_Overall 값 정정**: 기존 watt=211 → 197(X8i_OM_EN_2.0.pdf p.189 기준 — 기존 값은 X8과 혼동되었던 것으로 보임).
