# X4r (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(X4i의 recessed/매입형 파생형)

**스켈레톤 근거**: X4r은 X4i와 음향/전기 스펙이 완전히 동일한 "recessed version"(벽/천장 매입형). 스펙 표 수치([X4]=120Hz/116dB, [X4_60]=65Hz/110dB, 110° axisymmetric, 4"/1.4" 트랜스듀서, 밀폐형, 16Ω, screw terminal)가 X4i와 완전히 일치함을 확인했다. 차이는 전면 그릴 유무, 중량(0.94kg vs 1kg), 리깅 하드웨어(X4r-inCW) 정도. A&E 시방서는 제공되지 않아 OM(X4r owner's manual EN version 1.0) 단일 소스 기준.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | X4r | - |
| Product_Series | X Series | - |
| Product_Type | Short throw point source | - |
| Description | 2-way passive coaxial enclosure (recessed version): 4" LF neodymium cone driver + 1.4" HF diaphragm compression driver, amplified by LA2Xi / LA4X / LA7.16i / LA12X | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | EN 62368-1:2014 | - |
| WEEE_Marking | null | - |

### 주석 및 출처

**출처**: X4r_OM_EN.pdf(X4r owner's manual EN version 1.0) p.37 "X4r specifications"(A&E 시방서 미제공).

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | [X4_60]: 65 - 20000 / [X4]: 120 - 20000 | Hz |
| Frequency_Response_6dB_Hz [1] | [X4_60]: 77 - 20000 / [X4]: 145 - 20000 | Hz |
| Frequency_Response_3dB_Hz [1] | [X4_60]: 105 - 20000 / [X4]: 180 - 20000 | Hz |
| Max_SPL_Peak | [X4]: 116 dB / [X4_60]: 110 dB | dB |
| Nominal_Directivity_Horizontal_deg | 110 (axisymmetric) | deg |
| Nominal_Directivity_Vertical | 110 (axisymmetric) | deg |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | X4, X4_60, X4_MO | - |

### 주석 및 출처

**출처**: X4r_OM_EN.pdf p.37(X4i와 수치 완전 일치, 독립 확인).
**[1] Frequency_Response_6dB/3dB_Hz, RMS_Power_Handling_Overall = X4i 값 상속(사용자 정책 지침)**: X4r 자신의 OM에는 이 수치가 없어(A&E 미제공) install/recessed 상속 정책에 따라 X4i의 값을 채택.
**Cardioid_Capability=No(확정적 비존재)**: 전량 스캔 0건.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 4" neodymium cone driver | - |
| HF_Transducer | 1.4" diaphragm compression driver | - |
| LF_Acoustical_Load | closed enclosure | - |
| Passive_Crossover_Network | Yes | - |
| Nominal_Impedance_Overall | 16 | Ohm |
| RMS_Power_Handling_Overall [1] | 42 | W |

### 주석 및 출처

**출처**: X4r_OM_EN.pdf p.37.
**[1] X4i 값 상속**: general 섹션 [1] 각주 참조.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 2-point screw terminal | - |
| Link_Connector | 1 x 2-point screw terminal | - |
| Screw_Terminal_Pinout_1 | + / - (combined LF+HF signal) | - |
| Screw_Terminal_Pinout_2 | Not linked | - |

### 주석 및 출처

**출처**: X4r_OM_EN.pdf "Connectors"(X4i와 동일 표 제목/구조).

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA2Xi, LA4X, LA7.16i, LA12X | - |
| Crossover_Type | Passive (2-way) | - |

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | 2 x M5 inserts(X4r-inCW/X-U4i 마운트용), 2 x M6 inserts(리깅 액세서리용), 1 x M6 insert(보조 안전용) | - |
| Handles | 0 | count |
| Weight_Net | 0.94 | kg |

### 주석 및 출처

**출처**: X4r_OM_EN.pdf p.37.
**Handles=0**: X4i와 동일 사유(전량 스캔 0건) — 매입형이라 더 명확히 불필요.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 116 | mm |
| Height_mm | 116 | mm |
| Depth_mm | 99 | mm |
| Cabinet_Material | premium grade Baltic birch plywood | - |
| Front_Material | null | - |
| Finish_Color | dark grey brown Pantone 426 C | - |
| IP_Rating [1] | IP55 | - |

### 주석 및 출처

**출처**: X4r_OM_EN.pdf p.37, "X4r dimensions"(치수 도면, X4i와 동일 수치).
**Front_Material 비적용 사유**: 매입형이라 전면 그릴/패브릭 스펙이 원문 표에서 빠짐(X4r-inCW 등 스크린/커버 액세서리가 별도).
**Finish_Color 단순화**: X4i는 3가지 마감이나 X4r은 1가지만 명시.
**[1] IP_Rating 조건부**: "When integrated in-wall or in-ceiling with screen and connector sealing plate".

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| X4r standalone (고SPL) | [X4] | 120 - 20000 | null | null |
| X4r with SB6r, closely coupled(200Hz) | [X4] + [SB6_200] | 32 - 20000 | 1 X4r : 1 SB6r | null |
| X4r with SB6r, coupled(100Hz) | [X4] + [SB6_100] | 29 - 20000 | 1 X4r : 1 SB6r | null |
| X4r with SB6r, separated(60Hz) | [X4_60] + [SB6_60] | 29 - 20000 | 2 X4r : 1 SB6r | null |
| X4r with SB10r, closely coupled(200Hz) | [X4] + [SB10_200] | 29 - 20000 | 2 X4r : 1 SB10r | null |
| X4r with SB10r, coupled(100Hz) | [X4] + [SB10_100] | 27 - 20000 | 2 X4r : 1 SB10r | null |
| X4r with SB10r, separated(60Hz) | [X4_60] + [SB10_60] | 25 - 20000 | 3 X4r : 1 SB10r | null |

### 주석 및 출처

**출처**: X4r_OM_EN.pdf p.17-24 "Loudspeaker configurations". X4i와 달리 6개 조합 모두 상세 조사됨.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| [X4] or [X4_MO] + [SB6_200] | 0.6 | SB6r = 0 | X4r = + / SB6r = - |
| [X4] or [X4_MO] + [SB6_100] | 0 | SB6r = 0.4 | X4r = + / SB6r = + |
| [X4_60] + [SB6_60] | 1.8 | SB6r = 0 | X4r = + / SB6r = - |
| [X4] + [SB10_200] | 1.9 | SB10r = 0 | X4r = + / SB10r = - |
| [X4_MO] + [SB10_200] | 0 | SB10r = 0 | X4r = + / SB10r = + |
| [X4] or [X4_MO] + [SB10_100] | 0.8 | SB10r = 0 | X4r = + / SB10r = + |
| [X4_60] + [SB10_60] | 7.2 | SB10r = 0 | X4r = + / SB10r = - |

### 주석 및 출처

**출처**: X4r_OM_EN.pdf p.19-24 "Pre-alignment delays". 원문 표의 "X4i"/"SB6i"/"SB10i" 라벨은 X4r/SB6r/SB10r로 정정 채택(매뉴얼 복사 잔재로 판단).

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| all configurations | X4r-inCW, X-U4i 등 | 1 | 1 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 5:1 | - |

### 주석 및 출처

**출처**: X4r_OM_EN.pdf "Mechanical safety"(X4i와 동일 서술).

## Null Report

**미확인**: Model_Number, WEEE_Marking, Frequency_Response_5dB/4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, Max_Enclosures_Per_Controller_Output/Total, Inter_Enclosure_Angles_deg, Front_Material, Rigging_Components_Material, Max_Wind_Load, preset_guide_and_matching(8건).
**비적용**: HF_Acoustical_Load.

**[MR_v1.8 반영 메모]**: 이 파일은 `upload/X4r_v1.5.md`를 이 저장소의 raw-spec으로 이관한 것이다(기존 역재구성본을 대체). `public/js/domains/speakers/data/la/x-series.data.js`에 Cardioid_Capability/Preset Guide/Matching Ratio/Delay Defaults/Mechanical Safety를 신규 반영했다. **Depth 값 정정**: 기존 109mm → 99mm(X4r_OM_EN.pdf 도면 기준 — 109mm은 마운팅 브래킷 부가 치수, 실제 엔클로저 깊이는 X4i와 동일한 99mm).
