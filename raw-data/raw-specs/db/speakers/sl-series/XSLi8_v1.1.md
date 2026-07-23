# XSLi8 (d&b audiotechnik) — Master Schema

**Category**: speakers | **Brand**: d&b audiotechnik (db) | **Schema Phase**: Phase 4 (d&b 7번째 제품군 투입, XSL8/XSL12 대비 설치용 버전)

**스켈레톤 근거**: `speakers/db/XSL8_v1.0.md`를 뼈대로 사용 — 음향/드라이버/크로스오버/캐비닛 소재는 XSL8과 완전 동일(3-way, 2채널 하이브리드, injection molded ABS), 설치용(i) 버전 차이는 Phoenix 옵션 커넥터 추가, T-handle 임시 리프팅 핀(핸들 없음), 전용 XSLi Rigging manual(투어링 Flying/Top mounting frame과 별개).

**신규 발견 — AE와 OM 간 리깅 프레임 서술 불일치(중요, 데이터 충돌 보존)**: AE(Datasheet) 원문 "The cabinet shall incorporate a three point rigging system for the assembly of vertical line source arrays of up to 12 cabinets in connection with a dedicated mounting frame." — 단일 "mounting frame"으로 12대 상한만 명시. 반면 Manual "Product description" 원문 "When the XSLi Flying frame is used, up to 24 XSLi8 cabinets can be flown in vertical columns in tension mode rigging... When the XSLi Top mounting frame is used, up to 12 XSLi8 cabinets can be flown in tension mode rigging." — **"XSLi Flying frame"(24대)와 "XSLi Top mounting frame"(12대) 2종을 구분해 서술**. 그러나 XSLi Rigging manual(별도 문서, v1.2 en)은 "Z5787.000 XSLi Top mounting frame"(12대 SWL 500kg)만 확인되고, 이 문서의 "Mounting frames and adapter" 절 어디에도 "XSLi Flying frame"이라는 별도 모델명이나 24대 상한 서술이 없다 — 세 문서 간 명백한 불일치. 어느 쪽도 폐기하지 않고 AE(12대)를 Value로 채택(리깅 매뉴얼과 정합), Manual의 "XSLi Flying frame 24대" 서술은 각주로 보존한다(원문에 실재하는 서술이나 리깅 매뉴얼로 뒷받침되지 않는 미상 항목으로 취급).

**제품 계열**: SL-Series. Model_Number는 Manual Chapter 3.1 "d&b Z0776 XSLi8 loudspeaker".

**XSLi8/XSLi12 관계**: XSL8/XSL12 전례와 동일하게 별도 두 파일로 분리. 두 제품 모두 자체 Datasheet 보유.

**아키텍처 판단(원본 근거)**: AE "The loudspeaker system shall be 3-way, actively driven between the forward LF drivers and the sideward LF driver with mid/high sections. Passive crossovers shall be used between the sideward LF driver and the mid/high sections." — XSL8과 완전 동일.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | XSLi8 | - |
| Model_Number | Z0776 | - |
| Product_Series | SL-Series | - |
| Product_Category | installation-specific line array loudspeaker for small to medium-scale sound reinforcement applications | - |
| Product_Type | Line array loudspeaker | - |
| Description [1] | 3-way line array loudspeaker (installation specific version); up to 12 cabinets flown via XSLi Top mounting frame, producing 80 deg constant directivity dispersion in the horizontal plane; supplements other SL-Series systems for fill and/or delay purposes | - |
| Way_Count | 3 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | in conformity with the provisions of the respective directives (specific directive names not enumerated in OM) | - |
| WEEE_Marking | Yes (EU), WEEE-Reg.-Nr. DE: 13421928 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS(Datasheet) v1.3 en; AE v1.2; OM(XSLi8/XSLi12 Manual v1.5 en) Chapter "Intended use" p.6, "Manufacturer's declarations" p.12; XSLi Rigging manual v1.2 en Chapter 1.4 p.5.
**[1] Description — 리깅 대수 서술 충돌(파일 서두 참조)**: AE/리깅매뉴얼 기준 12대로 채택, Manual의 "XSLi Flying frame 24대" 서술은 미상으로 보존(mechanical_safety 섹션 각주 참조).
**Model_Number**: OM "d&b Z0776 XSLi8 loudspeaker".

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | 55 - 20000 | Hz |
| Frequency_Response_5dB_Hz | 60 - 18000 | Hz |
| Frequency_Response_6dB_Hz | null | Hz |
| Frequency_Response_3dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak [1] | 141 | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | 153 | dB |
| Max_SPL_Single_Module | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | 80 | deg |
| Nominal_Directivity_Vertical | null | - |
| Cardioid_Capability | Built-in (XSL8과 동일 근거) | - |
| DSP_Preset_Name | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS "System data"; OM Chapter "Technical specifications" p.10(XSLi8/XSLi12 병기 표).
**[1] Max_SPL — 이 브랜드 최초의 "30D" 저가형 앰프 단일 조건(신규 발견)**: SPS "Max. sound pressure... With 30D: 138 dB / With D90/D80/D40/40D: 141 dB" — 이전 db 제품(GSL/CCL/KSL/XSL)은 모두 D90/D80/D40/40D 조건만 제공했으나, XSLi8은 처음으로 하위 앰프(30D) 단일 조건 수치가 추가됨. 4대 어레이 값(153dB)은 D90/D80/D40/40D 조건에서만 제공(30D 조건의 4대 값은 없음) — Value에는 상위 조건(D90/D80/D40/40D, 141dB) 채택, 30D 조건(138dB)은 이 각주로 보존.

## signal_processing

XSL8과 유사하나 HFC 거리 설정값이 다름(신규 발견).

| Key | Value | Unit |
|---|---|---|
| CUT_Mode_Available | null | - |
| HFA_Function_Settings | null | - |
| CUT_Mode_Frequency_Response_5dB_Hz | 90 - 18000 | Hz |
| CUT_Mode_Frequency_Response_10dB_Hz | 68 - 20000 | Hz |
| HFC_Function_Settings [1] | HFC1: 30 m additional distance compensation; HFC2: 60 m additional distance compensation (reference: 50% RH, 22 deg C) | - |
| Coupling_Function_Range | Low: +5 to -5; Mid: 0 to -8; increments of 0.5 | dB |

### 주석 및 출처 (Notes & Sources)

**출처**: OM Chapter "Controller settings" p.8-9.
**CUT_Mode_Available=null**: OM p.10 "Technical specifications" 표에 "Frequency response (-5 dB CUT mode)"/"Frequency response (-10 dB CUT mode)" 수치가 명시되어 CUT mode 자체는 존재함을 시사하나, 다른 db 제품(GSL/CCL/KSL/XSL)에 있던 "Set to CUT, the low frequency level of the cabinets is reduced..." 같은 CUT mode 전용 서술 단락이 XSLi8/XSLi12 Manual "Controller settings" 절(p.8-9)에서 확인되지 않음(HFC/Coupling 서술만 존재) — 대역폭 수치는 있으나 기능 자체의 명시적 존재 확인 문장이 없어 null로 보수 처리(다른 db 제품과 다른 판단, 원본에 실제로 이 단락이 누락된 것으로 보임).
**[1] HFC_Function_Settings — XSL8과 다른 거리(신규 발견)**: OM "HFC1 compensates for 30 m (100 ft) and HFC2 for 60 m (200 ft) of additional distance from a reference position." — XSL8(HFC1=40m/HFC2=80m)보다 짧은 거리, GSL/CCL/KSL/XSL 4개 제품군 모두 40m/80m로 동일했던 패턴이 처음 깨짐 — 설치용(i) 버전이라 소형 공간을 전제한 것으로 추정되나 확정 근거는 없음.

## transducers

XSL8_v1.0.md와 완전 동일한 Key 구조 및 값.

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | null | - |
| Front_LF_Transducer | 2 x 8" neodymium, forward-firing | - |
| Side_LF_Transducer | 2 x 6.5" neodymium, side-firing | - |
| MF_Transducer | 1 x 6.5" driver, horn-loaded | - |
| HF_Transducer | 2 x 1" exit compression drivers with 2" coil, mounted to dedicated wave shaping device | - |
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

**출처 및 근거**: XSL8_v1.0.md와 동일(드라이버/파워/임피던스 완전 일치 재확인).

## connectivity

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

**출처**: OM Chapter "Connections" p.7("Phoenix option" 절, KSLi8과 완전히 동일한 문구 구조); SPS "Phoenix option" 행.
**나머지 근거**: KSLi8_v1.0.md와 동일한 판단 원칙(하이브리드 2채널 신호 그대로 반영).

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | D90/D80/D40/40D | - |
| Max_Enclosures_Per_Controller_Output | 2 (Line/Arc mode); 1 (AP mode) | count |
| Max_Enclosures_Per_Controller_Total | null | - |
| Crossover_Type | Hybrid — active (front LF channel) + passive (side LF/MF/HF channel) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: OM Chapter "Intended use" p.6(NOTICE "Recommended amplifiers: D90/D80/D40/40D") — XSL8과 동일.
**나머지 근거**: XSL8_v1.0.md와 동일.

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type [1] | three point rigging system (front rigging strands + splay/rear link mechanism); Z5787.000 XSLi Top mounting frame required for array assembly (tension mode only); T-handle lifting pin slots (temporary aid) | - |
| Inter_Enclosure_Angles_deg | 0 - 14 (1° increments) | deg |
| Handles | null | - |
| Weight_Net | 39 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: OM Chapter "Intended use" p.6; XSLi Rigging manual v1.2 en Chapter 2.1 "Mounting frames and adapter" p.6, Chapter 1.4 "Load capacity" p.5.
**[1] Rigging_System_Type**: 파일 서두 "신규 발견" 참조 — AE/리깅매뉴얼은 Z5787.000 XSLi Top mounting frame(12대) 단일 체계만 확인, Manual에만 있는 "XSLi Flying frame"(24대) 서술은 리깅 매뉴얼에서 뒷받침되지 않아 채택하지 않음.
**Handles=null**: KSLi8과 동일 — T-handle 임시 리프팅 핀만 존재, 일반 손잡이 서술 없음.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 700 | mm |
| Height_mm | 283 | mm |
| Depth_mm | 507 | mm |
| Dimensions_Raw | null | mm |
| Cabinet_Material | injection molded ABS Polycarbonate | - |
| Front_Material | rigid metal grill backed by acoustically transparent and water repellent fabric | - |
| Rigging_Components_Material | null | - |
| Finish_Color | null | - |
| Finish_Type | 2K finish, impact and weather protected | - |
| IP_Rating | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS/AE "The dimensions (W x H x D) shall not exceed 700 x 283 x 507 mm."
**나머지 근거**: XSL8_v1.0.md와 동일(치수/소재 완전 동일).

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| null | null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**비적용 사유**: 다른 db 제품과 동일.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms |
|---|---|---|
| null | null | null |

### 주석 및 출처 (Notes & Sources)

**비적용 사유**: 다른 db 제품과 동일.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| fixed install (TOP only, tension mode) | Z5787.000 XSLi Top mounting frame | null | 12 cabinets (500 kg SWL total system weight incl. rigging) |
| SUB column (XSLi-SUB) | Z5788 XSLi-SUB Mounting frame | null | 7 cabinets (500 kg SWL total system weight incl. rigging) |
| mixed (TOP below SUB) | Z5788 XSLi-SUB Mounting frame + Z5780 XSLi-SUB Adapter frame | null | 500 kg SWL total system weight incl. rigging (혼합 배열, XSLi-TOP 아래 XSLi-SUB) |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | null | - |
| Max_Wind_Load [1] | not suspended by hoisting chains/steel wire ropes; must be firmly attached to onsite roof construction (fixed outdoor installations) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: XSLi Rigging manual v1.2 en Chapter 1.4 "Load capacity" p.5, Chapter 1.4.1 "Wind loads" p.5.
**[1] Max_Wind_Load — KSLi와 동일 유형**: "For this reason, arrays must not be suspended using hoisting chains or steel wire ropes. The arrays must be firmly attached to the onsite roof construction." — KSLi8과 완전히 동일한 구조적 요구사항(구체적 Beaufort 수치 없음, 투어링 XSL의 6/8 Beaufort와 다른 유형).
**Manual의 "XSLi Flying frame 24대" 미채택**: 파일 서두 "신규 발견" 참조 — 리깅 매뉴얼에 이 프레임 모델 자체가 없어 정식 채택하지 않음.

## Null Report

**미확인(정보 부족)**: Nominal_Directivity_Vertical, Max_SPL_Single_Module, AES75_Max_Linear_SPL, LF_Nominal_Impedance, HF_Nominal_Impedance, Max_Enclosures_Per_Controller_Total, Handles, Rigging_Components_Material, Finish_Color, IP_Rating, mechanical_safety(Safe_Limit 3건), Safety_Factor, CUT_Mode_Available, Frequency_Response_4dB_Hz — 15건.
**비적용(XSLi8 아키텍처상 개념 자체 불성립)**: DSP_Preset_Name, LF_Transducer, LF_Nominal_Impedance, MF_Nominal_Impedance, HF_Nominal_Impedance, HFA_Function_Settings, Peak_Power_Handling_10ms_Overall, preset_guide_and_matching(전 항목), delay_defaults(전 항목) — 9건.

**총계**: null 24건 (미확인 15건 + 비적용 9건). 확정적 비존재(0/No)로 명시한 항목은 0건 — Passive_Crossover_Network는 "Yes"로 실값 확보. **v1.1(2026-07-19)**: speakers 카테고리 전체 일괄 동기화 라운드 — 신규 Key 3종 반영, 총계 21건→24건.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — d&b audiotechnik 7번째 제품군(XSLi8) 최초 투입, XSL8_v1.0.md를 스켈레톤으로 사용(음향/드라이버/소재 완전 동일, 리깅/커넥터/신호처리 일부 상이). `upload/` 폴더 제공 Datasheet+AE+Manual(XSLi8/XSLi12 공용)+**XSLi 전용 Rigging manual** 통합. 신규 발견: 이 브랜드 최초의 "30D" 저가형 앰프 단일 SPL 조건(138dB), HFC 거리 설정이 XSL8(40/80m)과 달리 30/60m로 축소(4개 제품군 연속 동일 패턴이 처음 깨짐), CUT_Mode_Available이 대역폭 수치는 있으나 기능 서술 문단 자체가 원문에서 확인되지 않아 null 처리. **AE("mounting frame" 12대)와 Manual("XSLi Flying frame" 24대+"XSLi Top mounting frame" 12대) 간 리깅 대수 서술 불일치를 발견해 데이터 충돌 보존 원칙에 따라 각주 처리** — 리깅 매뉴얼로 뒷받침되는 12대만 정식 채택, 24대는 미상으로 보존. Null Report 21건(미확인 14건+비적용 7건). |
| v1.1 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-19) — 신규 Key 3종(Frequency_Response_4dB_Hz=미확인, HFA_Function_Settings=비적용, Peak_Power_Handling_10ms_Overall=비적용) 반영. Null Report 21건→24건(미확인 15+비적용 9). |
