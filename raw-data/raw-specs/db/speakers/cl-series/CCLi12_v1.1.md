# CCLi12 (d&b audiotechnik) — Master Schema

**Category**: speakers | **Brand**: d&b audiotechnik (db) | **Schema Phase**: Phase 4 (d&b 3번째 제품군 투입, CCLi8과 동시)

**스켈레톤 근거**: `speakers/db/CCLi8_v1.0.md`(형제 파일)와 대부분 동일 원본(공유 Manual/Rigging manual)에서 독립 확인 — 이 제품은 형제 파일과 달리 **자체 Datasheet PDF를 보유**(CCLi8은 없음). **베리언트 간 차이는 수평 지향각(80° vs 120°)에 종속되는 값뿐**: Nominal_Directivity_Horizontal_deg, Max_SPL_Peak, Max_SPL_4x_Array_Far_Field_Scaled_1m.

**중요 — 프리릴리즈 표기**: 이 제품의 Datasheet 자체에 "- preliminary -" 워터마크가 반복 표기됨(CCLi8_v1.0.md 서두 참조 — 제조사 공식 자료이나 출시 전 단계).

**아키텍처 판단(원본 근거)**: CCLi8_v1.0.md와 동일 — 2-way 완전 패시브 단일 채널, Phoenix 4극 커넥터.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | CCLi12 | - |
| Model_Number | Z0891 | - |
| Product_Series | CL-Series | - |
| Product_Category | compact cardioid line array loudspeaker for small to medium-scale sound reinforcement in fixed install applications | - |
| Product_Type | Line array loudspeaker | - |
| Description | 2-way line array loudspeaker (fixed install version); up to 24 cabinets flown per column via CCLi Flying frame, producing 120 deg constant directivity dispersion in the horizontal plane; requires only one amplifier channel | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | in conformity with the provisions of the respective directives (specific directive names not enumerated in OM) | - |
| WEEE_Marking | Yes (EU), WEEE-Reg.-Nr. DE: 13421928 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS(Datasheet, preliminary) v1.2 en p.1-2; AE v1.2; OM(CCLi8/CCLi12 Manual v1.2 en) Chapter 3.1 p.12.
**Model_Number**: OM "d&b Z0891 CCLi12 loudspeaker".
**나머지 근거**: CCLi8_v1.0.md와 동일.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | 55 - 20000 | Hz |
| Frequency_Response_5dB_Hz | 60 - 18000 | Hz |
| Frequency_Response_6dB_Hz | null | Hz |
| Frequency_Response_3dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak [1] | 136 | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | 148 | dB |
| Max_SPL_Single_Module | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | 120 | deg |
| Nominal_Directivity_Vertical | null | - |
| Cardioid_Capability | Built-in (CCL8/CCLi8과 동일 근거) | - |
| DSP_Preset_Name | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS "System data"/"Loudspeaker data" 표(preliminary).
**[1] Max_SPL**: SPS "CCLi12 with D25/D20/25D/30D: 134 dB / with D90/D80/D40/40D: 136 dB / 4x CCLi12: 148 dB" — CCL12와 완전히 동일한 수치(음향 성능은 커넥터와 무관).
**나머지 근거**: CCLi8_v1.0.md와 동일.
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.

## transducers

CCLi8_v1.0.md와 완전 동일.

| Key | Value | Unit |
|---|---|---|
| Front_LF_Transducer | 2 x 7" neodymium, forward-firing | - |
| Side_LF_Transducer | 2 x 5" neodymium, side-firing | - |
| HF_Transducer | 2 x 10.2 x 63 mm exit compression drivers with 1.75" coil, coupled to dedicated wave shaping device | - |
| LF_Acoustical_Load | vented enclosure (front LF driver only) | - |
| HF_Acoustical_Load | dedicated wave shaping device | - |
| Passive_Crossover_Network | Yes | - |
| Nominal_Impedance_Overall | 10 | Ohm |
| LF_Nominal_Impedance | null | - |
| HF_Nominal_Impedance | null | - |
| RMS_Power_Handling_Overall | 400 | W |
| Peak_Power_Handling_10ms_Overall | 1200 | W |

### 주석 및 출처 (Notes & Sources)

**출처 및 근거**: CCLi8_v1.0.md와 동일.

## connectivity

CCLi8_v1.0.md와 완전 동일.

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 4-pole Phoenix connector socket (Type DFK PC 4/4 GF), pins 1(+)/2(-) | - |
| Link_Connector | same 4-pole Phoenix connector socket, pins 3(+)/4(-) | - |
| Phoenix_Pinout_Pin1 | Input Signal (+) | - |
| Phoenix_Pinout_Pin2 | Input Signal (-) | - |
| Phoenix_Pinout_Pin3 | Link Signal (+) | - |
| Phoenix_Pinout_Pin4 | Link Signal (-) | - |

### 주석 및 출처 (Notes & Sources)

**출처 및 근거**: CCLi8_v1.0.md와 동일(두 베리언트 공용 커넥터/배선).

## signal_processing

CCLi8_v1.0.md와 완전 동일.

| Key | Value | Unit |
|---|---|---|
| CUT_Mode_Available | Yes | - |
| CUT_Mode_Frequency_Response_5dB_Hz | 90 - 18000 | Hz |
| CUT_Mode_Frequency_Response_10dB_Hz | 80 - 20000 | Hz |
| HFC_Function_Settings | HFC1: 40 m additional distance compensation; HFC2: 80 m additional distance compensation (reference: 50% RH, 22 deg C) | - |
| Coupling_Function_Range | Low: +5 to -5; Mid: 0 to -8; increments of 0.5 | dB |
| HFA_Function_Settings | null | - |

### 주석 및 출처 (Notes & Sources)

**출처 및 근거**: CCLi8_v1.0.md와 동일.
**HFA_Function_Settings(신규 Key, 비적용)**: T10/Ti10L/Ti10P에서 신설된 db 고유 기능 Key(PS/point-source setup 전용 HF 감쇠) — 이 제품은 point-source setup이 없는 구조라 비적용.

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | 25D/40D | - |
| Max_Enclosures_Per_Controller_Output | 2 (Line/Arc mode); 1 (AP mode) | count |
| Max_Enclosures_Per_Controller_Total | null | - |
| Crossover_Type | Passive (2-way, single amplifier channel, front LF+side LF+HF combined via internal passive crossover network) | - |

### 주석 및 출처 (Notes & Sources)

**출처 및 근거**: CCLi8_v1.0.md와 동일(OM Cabinets per channel 표에 CCLi12 항목으로 별도 표기, 수치는 CCL12와 동일).

## rigging_handling

CCLi8_v1.0.md와 완전 동일(캐비닛 외형/중량 공통).

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | three point rigging system (front rigging strands + splay/rear link mechanism); Z5826 CCLi Flying frame required for array assembly; 4 dedicated fixing screws (flange head cap screw M8x20) enclosed | - |
| Inter_Enclosure_Angles_deg | 0 - 14 (1° increments) | deg |
| Handles | null | - |
| Weight_Net | 18.1 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: CCLi Rigging manual "Z0890/Z0891 CCLi8/CCLi12 cabinets ... 18.1 kg (40 lb)"로 두 모델 공용 중량 명시.
**나머지 근거**: CCLi8_v1.0.md와 동일.

## physical

CCLi8_v1.0.md와 완전 동일(캐비닛 치수 공통).

| Key | Value | Unit |
|---|---|---|
| Width_mm | 593 | mm |
| Height_mm | 209 | mm |
| Depth_mm | 355 | mm |
| Dimensions_Raw | 593 / 209 / 355 / 254 | mm |
| Cabinet_Material | injection molded ABS Polycarbonate | - |
| Front_Material | rigid, perforated steel grill backed with acoustically transparent and water repellent fabric; front grill incorporates integrated mounting plate (Front link) on both sides | - |
| Rigging_Components_Material | null | - |
| Finish_Color | null | - |
| Finish_Type | 2K finish, impact resistant and weather protecting | - |
| IP_Rating | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.2 "CCLi12 cabinet dimensions in mm [inch]"(도면, 254mm 4번째 치수 재확인).
**나머지 근거**: CCLi8_v1.0.md와 동일.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| null | null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**비적용 사유**: CCLi8과 동일.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms |
|---|---|---|
| null | null | null |

### 주석 및 출처 (Notes & Sources)

**비적용 사유**: CCLi8과 동일.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| flown | Z5826 CCLi Flying frame | null | 24 cabinets (500 kg SWL total system weight incl. rigging components) |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | null | - |
| Max_Wind_Load | null | - |

### 주석 및 출처 (Notes & Sources)

**출처 및 근거**: CCLi8_v1.0.md와 동일 — SPS/AE "The cabinet shall incorporate a three point rigging system for the assembly of vertical line source arrays in connection with dedicated flying frames"(24대 수치는 SPS/AE 문장 자체에 없음, CCLi Rigging manual SWL 500kg 및 Z5820/CCL 대응 정격 근거로 CCL과 동일값 채택).

## Null Report

**미확인(정보 부족)**: Nominal_Directivity_Vertical, Max_SPL_Single_Module, AES75_Max_Linear_SPL, LF_Nominal_Impedance, HF_Nominal_Impedance, Max_Enclosures_Per_Controller_Total, Handles, Rigging_Components_Material, Finish_Color, IP_Rating, Frequency_Response_4dB_Hz, mechanical_safety(Safe_Limit 1건, Safety_Factor, Max_Wind_Load) — 13건.
**비적용(CCLi12 아키텍처상 개념 자체 불성립)**: DSP_Preset_Name, HFA_Function_Settings, preset_guide_and_matching(전 항목), delay_defaults(전 항목) — 4건.

**총계**: null 17건 (미확인 13건 + 비적용 4건). 확정적 비존재(0/No)로 명시한 항목은 0건. CCLi8과 총계까지 일치.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — CCLi8과 동시 투입, CCLi8_v1.0.md를 스켈레톤으로 사용(형제 파일). 이 제품은 형제와 달리 자체 Datasheet(preliminary) PDF 보유. 베리언트 종속 3개 Key(Nominal_Directivity_Horizontal_deg=120°, Max_SPL_Peak=136dB, Max_SPL_4x_Array_Far_Field_Scaled_1m=148dB)만 CCLi12 자신의 원문값으로 대입, 나머지 전 섹션은 CCLi8과 완전 동일. Null Report 15건(미확인 12건+비적용 3건), CCLi8과 총계까지 일치. |
| v1.1 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-18, d&b 대량 배치 완료 후) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래, 미확인), `HFA_Function_Settings`(T10 유래, 비적용) 반영. Null Report 17건(미확인 13건+비적용 4건)으로 갱신. |
