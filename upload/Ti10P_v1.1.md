# Ti10P (d&b audiotechnik) — Master Schema

**Category**: speakers | **Brand**: d&b audiotechnik (db) | **Schema Phase**: Phase 4 (d&b 11번째 제품군 투입, Ti10L과 동시)

**스켈레톤 근거**: `speakers/db/Ti10L_v1.0.md`(형제 파일)와 동일 원본(공용 OM, 개별 SPS/AE)에서 독립 확인. 음향/물리 스펙은 Ti10L과 완전 동일(두 제품 "acoustically identical") — **차이는 라인어레이 리깅 장비의 유무뿐**: Ti10P는 라인어레이 체인 리깅(Front/Splay link)이 전혀 없고, 대신 포인트소스 전용 액세서리 마운팅용 6개 나사산 삽입물만 갖는다(원문 "Ti10P: Point source version **without line array rigging devices**"). Weight도 리깅 하드웨어 유무로 인해 Ti10L(11kg)보다 가벼운 10.5kg.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | Ti10P | - |
| Model_Number | Z0552 | - |
| Product_Series | T-Series | - |
| Product_Category | very compact installation-oriented loudspeaker, point source version (no line array rigging), usable as a stand-alone loudspeaker with both horn orientations | - |
| Product_Type | Point source loudspeaker / Line array loudspeaker (field-switchable via rotatable waveguide, standalone use only; no line array chaining rigging) | - |
| Description | 2-way dipolar passive loudspeaker, acoustically identical to T10/Ti10L, installation-oriented "P"(point source, no line array rigging) variant; mounted via six threaded inserts to point source rigging accessories (Z5371 T Flying bracket, Z5372 T Horizontal bracket, Z5354 E8/E12 Flying adapter, Z5020/25 Flying adapter 02/03) | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | in conformity with the provisions of the respective EC directives including all applicable amendments (specific directive names not enumerated in OM Chapter 4.1) | - |
| WEEE_Marking | Yes (EU), WEEE-Reg.-Nr. DE: 13421928 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS(Datasheet, dbaudio-datasheet-ti10p-1.1-en.pdf, 03/2023) p.1-2, AE(txt+Datasheet 공통); OM(Ti10 Manual v1.2 en, Ti10L/Ti10P 공용) Chapter 2.1 p.5, Chapter 4.1/4.2 p.12.
**나머지 근거**: Ti10L_v1.0.md와 동일(공용 OM 기준).

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | null | Hz |
| Frequency_Response_5dB_Hz | 68 - 18000 | Hz |
| Frequency_Response_6dB_Hz | null | Hz |
| Frequency_Response_3dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak [1] | 130 | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| Max_SPL_Single_Module | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | 90 (point source mode); 105 (line source mode, standalone use only) | deg |
| Nominal_Directivity_Vertical | 35 (point source mode only) | deg |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS "System data" 표; OM Chapter 2.5 "Technical specifications" p.9-10(Ti10L/Ti10P 공용 표).
**[1] Max_SPL_Peak — Ti10P 자신의 Datasheet 기준(PS 조건) 채택**: Ti10P SPS "Max. sound pressure (PS setup, 1 m, free field): 10D/D6 127 dB / 40D/30D/D80/D40/D20/D12 130 dB." 상위 앰프군(6종) 조건인 130dB를 대표값 채택, 127dB(10D/D6)는 보존. Line/Arc 조건(132/129dB)은 Ti10L과 동일 물리 설계이므로 이론상 적용 가능하나 Ti10P 자신의 헤드라인 스펙이 아니므로 대표값에서 제외.
**Cardioid_Capability=No**: T10/Ti10L과 동일 근거.
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.

## signal_processing

| Key | Value | Unit |
|---|---|---|
| CUT_Mode_Available | Yes | - |
| CUT_Mode_Frequency_Response_5dB_Hz | 120 - 18000 | Hz |
| CUT_Mode_Frequency_Response_10dB_Hz | null | Hz |
| HFA_Function_Settings | PS(Point source) setup only; HF response attenuated starting gradually at 1 kHz, dropping approx. 3 dB at 10 kHz — Ti10P's primary/only reachable setup | - |
| HFC_Function_Settings [1] | null | - |
| Coupling_Function_Range | 0 to -9 dB attenuation (correction begins gradually around 1 kHz, maximum attenuation below 400 Hz); +0 to +5 dB LF boost (full range mode only, without subwoofers) | dB |

### 주석 및 출처 (Notes & Sources)

**출처**: OM Chapter 2.3.1 "Controller settings" p.7-8(Ti10L과 공용).
**[1] HFC_Function_Settings — 비적용(Ti10P 아키텍처상 도달 불가능한 setup)**: HFC는 원문상 "Ti10L Arc/Line setups only"로 명시 — "T10 Arc/T10 Line" setup은 어레이 조립을 전제로 하나 Ti10P는 라인어레이 리깅 자체가 없어 이 setup에 물리적으로 도달할 수 없다(Ti10L 파일 각주 참조). 미확인이 아니라 아키텍처상 비적용으로 처리.
**CPL**: Ti10L과 동일하게 Coupling_Function_Range 재사용. HFC와 달리 원문이 setup 종류로 명시적으로 제한하지 않아 Ti10P에도 실값으로 유지.

## transducers

Ti10L_v1.0.md와 완전 동일.

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 2 x 6.5" driver with neodymium magnet, dipolar arrangement | - |
| Front_LF_Transducer | null | - |
| Side_LF_Transducer | null | - |
| HF_Transducer | 1 x 1.4" exit compression driver on rotatable waveguide (dedicated wave shaping device with integrated acoustic lens, field-switchable line/point source dispersion) | - |
| LF_Acoustical_Load | null | - |
| HF_Acoustical_Load | dedicated wave shaping device (rotatable waveguide + horn + acoustic lens) | - |
| Passive_Crossover_Network | Yes | - |
| Nominal_Impedance_Overall | 16 | Ohm |
| LF_Nominal_Impedance | null | - |
| HF_Nominal_Impedance | null | - |
| Front_LF_Nominal_Impedance | null | - |
| Side_LF_MF_HF_Nominal_Impedance | null | - |
| Power_Handling_Front_LF_RMS | null | W |
| Power_Handling_Front_LF_Peak_10ms | null | W |
| Power_Handling_Side_LF_MF_HF_RMS | null | W |
| Power_Handling_Side_LF_MF_HF_Peak_10ms | null | W |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_HF | null | W |
| RMS_Power_Handling_Overall | 200 | W |
| Peak_Power_Handling_10ms_Overall | 800 | W |

### 주석 및 출처 (Notes & Sources)

**출처 및 근거**: Ti10L_v1.0.md와 완전 동일.

## connectivity

Ti10L_v1.0.md와 완전 동일.

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 2 x NL4 M (identical connectors, all four pins wired in parallel; either serves as input) | - |
| Link_Connector | null | - |
| NL4_Pinout_Pin1 | Full-range signal (LF + HF combined via internal passive crossover); wiring 1+/1- | - |
| NL4_Pinout_Pin2 | Not used by Ti10P itself — designated pass-through for actively driven subwoofers; wiring 2+/2- | - |

### 주석 및 출처 (Notes & Sources)

**출처 및 근거**: Ti10L_v1.0.md와 동일.

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | 30D/10D/D80/D20/D12/D6 (Manual explicit list) | - |
| Max_Enclosures_Per_Controller_Output | 4 (both Ti10L Line source and Ti10P Point source setups) | count |
| Max_Enclosures_Per_Controller_Total | null | - |
| Crossover_Type | Passive (2-way, single amplifier channel, LF+HF combined via internal passive crossover network) | - |

### 주석 및 출처 (Notes & Sources)

**출처 및 근거**: Ti10L_v1.0.md와 동일(공용 OM Chapter 2.3).

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type [1] | no line array chaining rigging (no Front/Splay links) — six threaded inserts for point source mounting accessories (Z5371 T Flying bracket, Z5372 T Horizontal bracket, Z5354 E8/E12 Flying adapter, Z5020/25 Flying adapter 02/03); standalone/point-source mounting only | - |
| Inter_Enclosure_Angles_deg | 0 - 15 (1° increments) [2] | deg |
| Handles | null | - |
| Weight_Net | 10.5 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: OM Chapter 2.1 "Product description"/"Ti-Series rigging components and arrays" p.5; SPS "Loudspeaker data"(Weight 행).
**[1] Ti10L과 근본적으로 다른 리깅 — 어레이 체이닝 불가**: 원문 "Ti10P: Point source version without line array rigging devices. It can be used as a stand-alone loudspeaker with both horn orientations." — Front link/Splay link가 물리적으로 없어 다른 Ti10P나 Ti10L 캐비닛과 체인 연결이 불가능하다(어레이 조립 자체가 불가능한 아키텍처).
**[2] Inter_Enclosure_Angles_deg — Key 유지하나 사실상 비적용**: SPS/OM 모두 "Splay angle settings: 0...15°"를 스펙표에 여전히 명시(공용 표 상속으로 판단)하나, Ti10P는 어레이 체이닝 리깅이 없어 이 값을 실제로 활용할 방법이 없다 — 원문에 명시된 수치이므로 삭제하지 않고 값은 유지하되 이 각주로 그 한계를 명확히 기록.
**Weight_Net=10.5kg(Ti10L보다 0.5kg 가벼움)**: 라인어레이 리깅 하드웨어(Front/Splay link, 로킹 핀 등) 부재로 인한 실질적 중량 차이로 판단.

## physical

Ti10L_v1.0.md와 완전 동일(캐비닛 치수/재질 공통).

| Key | Value | Unit |
|---|---|---|
| Width_mm | 470 | mm |
| Height_mm | 197 | mm |
| Depth_mm | 300 | mm |
| Dimensions_Raw | null | mm |
| Cabinet_Material | polyurethane integral hard foam | - |
| Front_Material | rigid metal grill backed by an acoustically transparent foam | - |
| Rigging_Components_Material | null | - |
| Finish_Color | Black | - |
| Finish_Type | PCP (Polyurea Cabinet Protection), impact and weather protected | - |
| IP_Rating | null | - |

### 주석 및 출처 (Notes & Sources)

**출처 및 근거**: Ti10L_v1.0.md와 동일(AE "The dimensions in upright position (H x W x D) shall not exceed 470 x 197 x 300 mm" — Ti10P 자신의 AE는 축 나열 순서가 HxWxD로 다르게 표기되나 실제 치수 값 자체는 도면 라벨링과 완전 일치하여 동일하게 확정).

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| null | null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**비적용 사유**: Ti10L/T10과 동일.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms |
|---|---|---|
| null | null | null |

### 주석 및 출처 (Notes & Sources)

**비적용 사유**: Ti10L/T10과 동일.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| null | null | null | null |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | null | - |
| Max_Wind_Load | null | - |

### 주석 및 출처 (Notes & Sources)

**비적용 사유**: Ti10P는 어레이/플라잉 프레임 리깅이 없는 스탠드얼론 전용 구조 — mechanical_safety 섹션이 다루는 "어레이 플라잉/그라운드스택 하중 한도" 개념 자체가 성립하지 않는다(Ti10L의 Z5373 Cluster bracket 3대 상한, Z5370 Flying frame 등은 모두 라인어레이 리깅 전제 액세서리이며 Ti10P에는 적용되지 않음). 개별 액세서리(T Flying bracket 등)의 자체 하중 정격은 해당 액세서리 자신의 문서(미제공)에 있을 수 있으나 이 세션 범위 밖.

## Null Report

**미확인(정보 부족)**: Usable_Bandwidth_Hz, Frequency_Response_6dB_Hz, Frequency_Response_3dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, Max_SPL_Single_Module, AES75_Max_Linear_SPL, DSP_Preset_Name, CUT_Mode_Frequency_Response_10dB_Hz, LF_Nominal_Impedance, HF_Nominal_Impedance, Front_LF_Nominal_Impedance, Side_LF_MF_HF_Nominal_Impedance, Power_Handling_Front_LF_RMS, Power_Handling_Front_LF_Peak_10ms, Power_Handling_Side_LF_MF_HF_RMS, Power_Handling_Side_LF_MF_HF_Peak_10ms, RMS_Power_Handling_LF, RMS_Power_Handling_HF, LF_Acoustical_Load, Link_Connector, Max_Enclosures_Per_Controller_Total, Handles, Rigging_Components_Material, IP_Rating — 24건.
**비적용(Ti10P 아키텍처상 개념 자체 불성립)**: Front_LF_Transducer, Side_LF_Transducer(다이폴 배치), HFC_Function_Settings(어레이 리깅 부재로 Arc/Line setup 도달 불가), preset_guide_and_matching(전 항목), delay_defaults(전 항목), mechanical_safety(전 항목 — Safe_Limit/Maximum_Limit/Safety_Factor/Max_Wind_Load 4건, 어레이 리깅 자체가 없음) — 9건.

**총계**: null 33건 (미확인 24건 + 비적용 9건). 확정적 비존재(0/No)로 명시한 항목은 1건 — Cardioid_Capability="No".

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — Ti10L과 동시 투입, Ti10L_v1.0.md를 스켈레톤으로 사용(형제 파일, 공용 OM). 음향/물리 스펙은 Ti10L과 완전 동일하나 라인어레이 리깅 장비가 전혀 없어(Front/Splay link 부재) mechanical_safety 섹션 전체가 비적용으로 처리됨(Ti10L은 Z5373 Cluster bracket 3대 상한 실값 확보와 대조). HFC_Function_Settings도 Arc/Line setup 도달 불가로 비적용(HFA/CUT/CPL은 실값 유지). Weight_Net=10.5kg(Ti10L 11kg보다 0.5kg 가벼움, 리깅 하드웨어 부재분). Null Report 32건(미확인 23+비적용 9), 확정적 비존재 1건. |
| v1.1 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-19) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래, 미확인) 반영. Null Report 33건(미확인 24건+비적용 9건)으로 갱신. |
