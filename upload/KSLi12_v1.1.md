# KSLi12 (d&b audiotechnik) — Master Schema

**Category**: speakers | **Brand**: d&b audiotechnik (db) | **Schema Phase**: Phase 4 (d&b 5번째 제품군 투입, KSLi8과 동시)

**스켈레톤 근거**: `speakers/db/KSLi8_v1.0.md`(형제 파일)와 동일 원본(공유 Manual/KSLi Rigging manual, 자체 Datasheet+AE 개별)에서 독립 확인 — **베리언트 간 차이는 수평 지향각(80° vs 120°)에 종속되는 값뿐**: Nominal_Directivity_Horizontal_deg, Max_SPL_Peak, Max_SPL_4x_Array_Far_Field_Scaled_1m.

**제품 계열**: SL-Series. Model_Number는 Manual Chapter 3.1 "d&b Z0791 KSLi12 loudspeaker".

**아키텍처 판단(원본 근거)**: KSLi8_v1.0.md와 동일.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | KSLi12 | - |
| Model_Number | Z0791 | - |
| Product_Series | SL-Series | - |
| Product_Category | installation specific line array loudspeaker for medium to large-scale sound reinforcement applications | - |
| Product_Type | Line array loudspeaker | - |
| Description | 3-way line array loudspeaker (installation specific version); up to 24 cabinets flown per column via KSLi Mounting frame, producing 120 deg constant directivity dispersion in the horizontal plane; KSLi-SUB Mounting adapter allows mixed arrays with KSLi-SUB cabinets on top | - |
| Way_Count | 3 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | in conformity with the provisions of the respective directives (specific directive names not enumerated in OM) | - |
| WEEE_Marking | Yes (EU), WEEE-Reg.-Nr. DE: 13421928 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS(Datasheet) v1.2 en; AE v1.2; OM(KSLi8/KSLi12 Manual v1.4 en) Chapter 3.1 p.13.
**Model_Number**: OM "d&b Z0791 KSLi12 loudspeaker".
**나머지 근거**: KSLi8_v1.0.md와 동일.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | 48 - 19000 | Hz |
| Frequency_Response_5dB_Hz | 54 - 18000 | Hz |
| Frequency_Response_6dB_Hz | null | Hz |
| Frequency_Response_3dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak [1] | 144 | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m [1] | 156 | dB |
| Max_SPL_Single_Module | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | 120 constant directivity (merging into cardioid dispersion below 150 Hz) | deg |
| Nominal_Directivity_Vertical | null | - |
| Cardioid_Capability | Built-in (KSLi8과 동일 근거) | - |
| DSP_Preset_Name | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: AE "Maximum sound pressure level (SPLmax peak/1 m/free field) of single cabinet shall be at least 144 dB while maximum sound pressure level (SPLmax far field, scaled to1 m) of 4 modules shall be at least 156 dB."; OM Chapter 2.5 p.11(KSLi8/KSLi12 병기 표).
**[1] Max_SPL — KSLi8과 다른 값(120° 확산)**: KSL12(144/156dB)와 완전히 동일한 수치 — 커넥터 옵션 유무와 무관하게 음향 성능은 KSL12와 동일함을 재확인.
**나머지 근거**: KSLi8_v1.0.md와 동일.

## signal_processing

KSLi8_v1.0.md와 완전 동일.

| Key | Value | Unit |
|---|---|---|
| CUT_Mode_Available | Yes | - |
| HFA_Function_Settings | null | - |
| CUT_Mode_Frequency_Response_5dB_Hz | 75 - 18000 | Hz |
| CUT_Mode_Frequency_Response_10dB_Hz | 63 - 19000 | Hz |
| HFC_Function_Settings | HFC1: 40 m additional distance compensation; HFC2: 80 m additional distance compensation (reference: 50% RH, 22 deg C) | - |
| Coupling_Function_Range | Low: +5 to -5; Mid: 0 to -8; increments of 0.5 | dB |

### 주석 및 출처 (Notes & Sources)

**출처 및 근거**: KSLi8_v1.0.md와 동일(두 베리언트 공통).

## transducers

KSLi8_v1.0.md와 완전 동일.

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | null | - |
| Front_LF_Transducer | 2 x 10" neodymium, forward-firing | - |
| Side_LF_Transducer | 2 x 8" neodymium, side-firing | - |
| MF_Transducer | 1 x 8" driver, horn-loaded | - |
| HF_Transducer | 2 x 1.4" exit compression drivers with 3" coil, mounted to dedicated wave shaping device | - |
| LF_Acoustical_Load | null | - |
| MF_Acoustical_Load | horn-loaded | - |
| HF_Acoustical_Load | dedicated wave shaping device | - |
| Passive_Crossover_Network | Yes | - |
| LF_Nominal_Impedance | null | - |
| Nominal_Impedance_Overall | null | Ohm |
| MF_Nominal_Impedance | null | - |
| HF_Nominal_Impedance | null | - |
| Front_LF_Nominal_Impedance | 8 | Ohm |
| Side_LF_MF_HF_Nominal_Impedance | 8 | Ohm |
| Power_Handling_Front_LF_RMS | 450 | W |
| Power_Handling_Front_LF_Peak_10ms | 1800 | W |
| Power_Handling_Side_LF_MF_HF_RMS | 250 | W |
| Power_Handling_Side_LF_MF_HF_Peak_10ms | 1000 | W |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_MF | null | W |
| RMS_Power_Handling_HF | null | W |
| RMS_Power_Handling_Overall | null | W |
| Peak_Power_Handling_10ms_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처 및 근거**: KSLi8_v1.0.md와 동일(드라이버/파워/임피던스 완전 공통).

## connectivity

KSLi8_v1.0.md와 완전 동일.

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x NLT4 F/M (base); 4-pole Phoenix connector socket (Type DFK PC 4/4 GF, option), pins 1(+)/2(-) | - |
| Link_Connector | null (NLT4 F/M 병렬 배선) | - |
| NLT4_Pinout_Pin1 | Front LF+ / Front LF- | - |
| NLT4_Pinout_Pin2 | Side LF/MF/HF+ / Side LF/MF/HF- | - |
| Phoenix_Pinout_Pin1 | Front LF+ | - |
| Phoenix_Pinout_Pin2 | Front LF- | - |
| Phoenix_Pinout_Pin3 | Side LF/MF/HF+ | - |
| Phoenix_Pinout_Pin4 | Side LF/MF/HF- | - |

### 주석 및 출처 (Notes & Sources)

**출처 및 근거**: KSLi8_v1.0.md와 동일(두 베리언트 공용 커넥터/배선).

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | D90/D80/D40/40D | - |
| Max_Enclosures_Per_Controller_Output | 2 (Line/Arc mode); 1 (AP mode) | count |
| Max_Enclosures_Per_Controller_Total | null | - |
| Crossover_Type | Hybrid — active (front LF channel) + passive (side LF/MF/HF channel) | - |

### 주석 및 출처 (Notes & Sources)

**출처 및 근거**: KSLi8_v1.0.md와 동일.

## rigging_handling

KSLi8_v1.0.md와 완전 동일(캐비닛 외형/중량 공통).

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | three point rigging system (front rigging strands + splay/rear link mechanism); Z5743 KSLi-TOP Mounting frame required for array assembly; fixed outdoor installations must be firmly attached to onsite roof construction, not suspended by hoisting chains/steel wire ropes | - |
| Inter_Enclosure_Angles_deg | 0 - 10 (1° increments) | deg |
| Handles | null | - |
| Weight_Net | 57 | kg |

### 주석 및 출처 (Notes & Sources)

**출처 및 근거**: KSLi8_v1.0.md와 동일 — KSLi Rigging manual "Z0790/Z0791 KSLi8/KSLi12 cabinets ... 57 kg (126 lb)"로 두 모델 공용 중량 명시.

## physical

KSLi8_v1.0.md와 완전 동일(캐비닛 치수 공통).

| Key | Value | Unit |
|---|---|---|
| Width_mm | 1000 | mm |
| Height_mm | 330 | mm |
| Depth_mm | 572 | mm |
| Dimensions_Raw | null | mm |
| Cabinet_Material | marine plywood | - |
| Front_Material | rigid metal grill backed by acoustically transparent and water repellent fabric | - |
| Rigging_Components_Material | null | - |
| Finish_Color | null | - |
| Finish_Type | PCP (Polyurea Cabinet Protection), impact and weather protected | - |
| IP_Rating | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: AE "The dimensions (W x H x D) shall not exceed 1000 x 330 x 572 mm."
**나머지 근거**: KSLi8_v1.0.md와 동일.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| null | null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**비적용 사유**: KSLi8과 동일.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms |
|---|---|---|
| null | null | null |

### 주석 및 출처 (Notes & Sources)

**비적용 사유**: KSLi8과 동일.

## mechanical_safety

KSLi8_v1.0.md와 완전 동일(리깅 액세서리 두 모델 공용).

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| fixed install (TOP only) | Z5743 KSLi-TOP Mounting frame | null | 10 cabinets (650 kg SWL total system weight incl. rigging) |
| SUB column (KSLi-SUB) | Z5744 KSLi-SUB Mounting frame | null | 6 cabinets (550 kg SWL total system weight incl. rigging) |
| mixed (TOP below SUB) | Z5744 KSLi-SUB Mounting frame + Z5745 KSLi-SUB Mounting adapter | null | 6 x KSLi-TOP below 2 x KSLi-SUB (600 kg SWL total system weight incl. rigging) |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | null | - |
| Max_Wind_Load | not suspended by hoisting chains/steel wire ropes; must be firmly attached to onsite roof construction (fixed outdoor installations) | - |

### 주석 및 출처 (Notes & Sources)

**출처 및 근거**: KSLi8_v1.0.md와 동일(KSLi Rigging manual, 두 모델 공용 하중 정격).

## Null Report

**미확인(정보 부족)**: Nominal_Directivity_Vertical, Max_SPL_Single_Module, AES75_Max_Linear_SPL, LF_Nominal_Impedance, HF_Nominal_Impedance, Max_Enclosures_Per_Controller_Total, Handles, Rigging_Components_Material, Finish_Color, IP_Rating, mechanical_safety(Safe_Limit 3건), Safety_Factor, Frequency_Response_4dB_Hz — 14건.
**비적용(KSLi12 아키텍처상 개념 자체 불성립)**: DSP_Preset_Name, LF_Transducer, LF_Nominal_Impedance, MF_Nominal_Impedance, HF_Nominal_Impedance, HFA_Function_Settings, Peak_Power_Handling_10ms_Overall, preset_guide_and_matching(전 항목), delay_defaults(전 항목) — 9건.

**총계**: null 23건 (미확인 14건 + 비적용 9건). 확정적 비존재(0/No)로 명시한 항목은 0건. KSLi8과 총계까지 일치. **v1.1(2026-07-19)**: speakers 카테고리 전체 일괄 동기화 라운드 — 신규 Key 3종 반영, 총계 20건→23건.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — KSLi8과 동시 투입, KSLi8_v1.0.md를 스켈레톤으로 사용(형제 파일). 베리언트 종속 3개 Key(Nominal_Directivity_Horizontal_deg=120°, Max_SPL_Peak=144dB, Max_SPL_4x_Array_Far_Field_Scaled_1m=156dB)만 KSLi12 자신의 원문값으로 대입, 나머지 전 섹션은 KSLi8과 완전 동일. Null Report 20건(미확인 13건+비적용 7건), KSLi8과 총계까지 일치. |
| v1.1 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-19) — 신규 Key 3종(Frequency_Response_4dB_Hz=미확인, HFA_Function_Settings=비적용, Peak_Power_Handling_10ms_Overall=비적용) 반영. Null Report 20건→23건(미확인 14+비적용 9). KSLi8과 총계까지 일치. |
