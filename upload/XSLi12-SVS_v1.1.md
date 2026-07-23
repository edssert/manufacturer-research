# XSLi12-SVS (d&b audiotechnik) — Master Schema

**Category**: speakers | **Brand**: d&b audiotechnik (db) | **Schema Phase**: Phase 4 (d&b 8번째 제품군 투입, XSLi8-SVS와 동시)

**스켈레톤 근거**: `speakers/db/XSLi8-SVS_v1.0.md`(형제 파일)와 동일 원본 구성(Datasheet, preliminary, AE 절 포함 — 자체 문서)에서 독립 확인 — **베리언트 간 차이는 수평 지향각(80° vs 120°)에 종속되는 값뿐**: Nominal_Directivity_Horizontal_deg, Max_SPL_Peak(D40/D80 및 30D 조건 둘 다).

**원본 문서 특이사항**: XSLi8-SVS와 동일 — Datasheet(2p, preliminary) 단일 문서, 전용 Manual/Rigging manual 없음.

**아키텍처 판단(원본 근거)**: XSLi8-SVS_v1.0.md와 동일.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | XSLi12 SVS | - |
| Model_Number | null | - |
| Product_Series | SL-Series (추정, 원문 명시 없음) | - |
| Product_Category | installation-specific line array loudspeaker for small to medium-scale sound reinforcement applications (Special Version Stadium) | - |
| Product_Type | Line array loudspeaker | - |
| Description | 3-way line array loudspeaker (Special Version Stadium, custom rigging), IP55 rated for permanent outdoor use, producing 120 deg constant directivity dispersion in the horizontal plane | - |
| Way_Count | 3 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | null | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS(Datasheet, preliminary) p.1-2, AE 절 포함.
**나머지 근거**: XSLi8-SVS_v1.0.md와 동일.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | null | Hz |
| Frequency_Response_6dB_Hz | null | Hz |
| Frequency_Response_5dB_Hz | 60 - 18000 | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Frequency_Response_3dB_Hz | null | Hz |
| Max_SPL_Peak [1] | 140 | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| Max_SPL_Single_Module | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | 120 | deg |
| Nominal_Directivity_Vertical | null | - |
| Cardioid_Capability | Built-in (XSLi8-SVS와 동일 근거) | - |
| DSP_Preset_Name | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS "Max. sound pressure(1m, free field): With D40/D80: 140 dB / With 30D: 137 dB".
**[1] Max_SPL — XSLi8-SVS보다 1dB 낮음(120° 확산)**: XSLi8-SVS(141/138dB)와 동일 경향.
**나머지 근거**: XSLi8-SVS_v1.0.md와 동일.
**Frequency_Response_4dB_Hz(신규 Key)**: XSLi8-SVS와 동일 사유로 미확인.

## signal_processing

XSLi8-SVS_v1.0.md와 완전 동일(형제 파일, 전용 Manual 부재로 동일 사유).

| Key | Value | Unit |
|---|---|---|
| CUT_Mode_Available | null | - |
| HFA_Function_Settings | null | - |
| CUT_Mode_Frequency_Response_5dB_Hz | null | Hz |
| CUT_Mode_Frequency_Response_10dB_Hz | null | Hz |
| HFC_Function_Settings | null | - |
| Coupling_Function_Range | null | dB |

### 주석 및 출처 (Notes & Sources)

**신규 섹션(2026-07-19 speakers 카테고리 일괄 동기화 라운드)**: XSLi8-SVS와 동일하게 v1.0에서 signal_processing 섹션이 누락되어 있었음 — 형제 파일과 동일 근거로 신설.
**HFA_Function_Settings=비적용, 나머지=미확인**: XSLi8-SVS_v1.1.md와 동일 사유(2채널 하이브리드 구조상 비적용 / 전용 Manual 부재로 미확인).

## transducers

XSLi8-SVS_v1.0.md와 완전 동일.

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | null | - |
| Front_LF_Transducer | 2 x 8" neodymium, forward-firing | - |
| Side_LF_Transducer | 2 x 6.5" neodymium, side-firing | - |
| MF_Transducer | 1 x 6.5" driver, horn-loaded | - |
| HF_Transducer | 2 x 1" exit compression drivers with 2" coil, mounted to dedicated wave shaping device | - |
| LF_Acoustical_Load | vented enclosure (front LF driver only) | - |
| MF_Acoustical_Load | horn-loaded | - |
| HF_Acoustical_Load | dedicated wave shaping device | - |
| Passive_Crossover_Network | Yes | - |
| LF_Nominal_Impedance | null | - |
| Nominal_Impedance_Overall | null | Ohm |
| MF_Nominal_Impedance | null | - |
| HF_Nominal_Impedance | null | - |
| Front_LF_Nominal_Impedance | 8 | Ohm |
| Side_LF_MF_HF_Nominal_Impedance | 8 | Ohm |
| Power_Handling_Front_LF_RMS | 400 | W |
| Power_Handling_Front_LF_Peak_10ms | 1200 | W |
| Power_Handling_Side_LF_MF_HF_RMS | 300 | W |
| Power_Handling_Side_LF_MF_HF_Peak_10ms | 850 | W |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_MF | null | W |
| RMS_Power_Handling_HF | null | W |
| RMS_Power_Handling_Overall | null | W |
| Peak_Power_Handling_10ms_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처 및 근거**: XSLi8-SVS_v1.0.md와 동일.
**Peak_Power_Handling_10ms_Overall(신규 Key)**: XSLi8-SVS와 동일 사유(2채널 하이브리드 구조, front/side 분리 보고)로 비적용.

## connectivity

XSLi8-SVS_v1.0.md와 완전 동일.

| Key | Value | Unit |
|---|---|---|
| Input_Connector | Faston type connector (2 x 6.3 mm), female | - |
| Link_Connector | null | - |
| Faston_Pinout | null (개별 핀 극성/신호 배정 서술 없음) | - |

### 주석 및 출처 (Notes & Sources)

**출처 및 근거**: XSLi8-SVS_v1.0.md와 동일.

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | 40D (recommended); D80, 30D (also usable) | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | - |
| Crossover_Type | Hybrid — active (front LF channel) + passive (side LF/MF/HF channel) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS "The d&b 40D amplifier is recommended to drive the XSLi12 SVS loudspeaker with the appropriate loudspeaker setup selected. The d&b D80 and 30D amplifier can also be used."

## rigging_handling

XSLi8-SVS_v1.0.md와 완전 동일.

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | four M10 threaded inserts on each side panel + one M10 on rear panel, for custom rigging accessories (no standard flying/mounting frame) | - |
| Inter_Enclosure_Angles_deg | 0 - 14 (1° increments) | deg |
| Handles | null | - |
| Weight_Net | 37 | kg |

### 주석 및 출처 (Notes & Sources)

**출처 및 근거**: XSLi8-SVS_v1.0.md와 동일(두 모델 공용 중량/리깅).

## physical

XSLi8-SVS_v1.0.md와 완전 동일(캐비닛 치수 공통).

| Key | Value | Unit |
|---|---|---|
| Width_mm | 700 | mm |
| Height_mm | 280 | mm |
| Depth_mm | 503 | mm |
| Dimensions_Raw | null | mm |
| Cabinet_Material | injection molded ABS Polycarbonate | - |
| Front_Material | rigid metal grill backed by acoustically transparent and water repellent fabric | - |
| Rigging_Components_Material | null | - |
| Finish_Color | null | - |
| Finish_Type | 2K finish, impact and weather protected | - |
| IP_Rating | 55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: AE "The dimensions (W x H x D) shall not exceed 700 x 280 x 503 mm."; "The cabinet shall be rated IP55 in accordance to IEC529."
**나머지 근거**: XSLi8-SVS_v1.0.md와 동일.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| null | null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: XSLi8-SVS와 동일.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms |
|---|---|---|
| null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: XSLi8-SVS와 동일.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| null | null | null | null |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | null | - |
| Max_Wind_Load | null | - |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: XSLi8-SVS와 동일.

## Null Report

**미확인(정보 부족)**: Model_Number, Compliance_Standards, WEEE_Marking, Usable_Bandwidth_Hz, Frequency_Response_6dB_Hz, Frequency_Response_3dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, Max_SPL_Single_Module, AES75_Max_Linear_SPL, Nominal_Directivity_Vertical, DSP_Preset_Name, LF_Transducer, LF_Nominal_Impedance, MF_Nominal_Impedance, HF_Nominal_Impedance, Link_Connector, Faston_Pinout, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, Handles, Rigging_Components_Material, Finish_Color, preset_guide_and_matching(전 항목), delay_defaults(전 항목), mechanical_safety(전 항목), RMS_Power_Handling_LF, RMS_Power_Handling_MF, RMS_Power_Handling_HF, CUT_Mode_Available, CUT_Mode_Frequency_Response_5dB_Hz, CUT_Mode_Frequency_Response_10dB_Hz, HFC_Function_Settings, Coupling_Function_Range — 36건.
**비적용(XSLi12-SVS 아키텍처상 개념 자체 불성립)**: Nominal_Impedance_Overall, RMS_Power_Handling_Overall, HFA_Function_Settings, Peak_Power_Handling_10ms_Overall — 4건.

**총계**: null 40건 (미확인 36건 + 비적용 4건). 확정적 비존재(0/No)로 명시한 항목은 0건. XSLi8-SVS와 총계까지 일치. **v1.1(2026-07-19)**: signal_processing 섹션 신설 + 신규 Key 2종 반영, 총계 32건→40건.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — XSLi8-SVS와 동시 투입, XSLi8-SVS_v1.0.md를 스켈레톤으로 사용(형제 파일). 베리언트 종속 값(Nominal_Directivity_Horizontal_deg=120°, Max_SPL_Peak=140/137dB)만 XSLi12-SVS 자신의 원문값으로 대입, 나머지 전 섹션은 XSLi8-SVS와 완전 동일. Null Report 32건(미확인 30건+비적용 2건), XSLi8-SVS와 총계까지 일치. |
| v1.1 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-19) — XSLi8-SVS와 동일하게 signal_processing 섹션(6개 Key) 신설 + 신규 Key 2종(Frequency_Response_4dB_Hz=미확인, Peak_Power_Handling_10ms_Overall=비적용) 반영. Null Report 32건→40건(미확인 36+비적용 4), XSLi8-SVS와 총계까지 일치. |
