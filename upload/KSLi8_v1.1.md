# KSLi8 (d&b audiotechnik) — Master Schema

**Category**: speakers | **Brand**: d&b audiotechnik (db) | **Schema Phase**: Phase 4 (d&b 5번째 제품군 투입, KSL8/KSL12 대비 설치용 버전)

**스켈레톤 근거**: `speakers/db/KSL8_v1.0.md`를 뼈대로 사용 — 음향/드라이버/크로스오버 구성은 KSL8과 완전 동일(3-way, 2채널 하이브리드), 다만 설치용(i) 버전 특유의 차이: 커넥터에 4극 Phoenix 옵션 추가(CCLi8과 유사하되 여기서는 NLT4가 기본이고 Phoenix가 "옵션"), 리깅 하드웨어가 완전히 별도 체계(**KSLi 전용 Mounting frame**, KSL8의 "Flying frame + touring cart" 투어링 시스템과 무관), 손잡이 대신 T-handle 임시 리프팅 핀(CCLi8과 유사한 슬롯 방식이나 명칭이 다름), 권장 앰프는 KSL8과 동일(D90/D80/D40/40D, CCLi8처럼 축소되지 않음).

**KSLi 전용 리깅 시스템(중요, KSL과 무관)**: `dbaudio-rigging-manual-ksli-1.1-en.pdf`(KSLi Rigging manual, 2020년 최초 발간)를 확보 — KSL8/KSL12의 "GSL/KSL 공용 Flying frame + 터치링 카트" 투어링 리깅 시스템과 완전히 별개의 체계다. KSLi는 **Z5743 KSLi-TOP Mounting frame**(고정 설치용)을 사용하며, 원문이 "Wind loads" 절에서 "When setting up fixed outdoor installations, unpredictable wind loads must be taken into account. For this reason, **arrays must not be suspended using hoisting chains or steel wire ropes. The arrays must be firmly attached to the onsite roof construction**"라고 명시 — 투어링용 KSL과 달리 KSLi는 애초에 체인호이스트로 매다는 방식 자체가 금지되고 지붕 구조물에 고정하는 영구 설치 전용임이 확인된다.

**제품 계열**: SL-Series(KSL과 동일). Model_Number는 Manual Chapter 3.1 "d&b Z0790 KSLi8 loudspeaker".

**KSLi8/KSLi12 관계**: KSL8/KSL12 전례와 동일하게 별도 두 파일로 분리. 두 제품 모두 자체 Datasheet 보유(CCLi8과 달리 KSLi8도 자체 Datasheet가 있음).

**아키텍처 판단(원본 근거)**: AE "The loudspeaker system shall be 3-way, actively driven between the forward LF drivers and the sideward LF driver with mid/high sections. Passive crossovers shall be used between the sideward LF driver and the mid/high sections." — KSL8과 완전 동일한 하이브리드 크로스오버 구조.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | KSLi8 | - |
| Model_Number | Z0790 | - |
| Product_Series | SL-Series | - |
| Product_Category | installation specific line array loudspeaker for medium to large-scale sound reinforcement applications | - |
| Product_Type | Line array loudspeaker | - |
| Description | 3-way line array loudspeaker (installation specific version); up to 24 cabinets flown per column via KSLi Mounting frame, producing 80 deg constant directivity dispersion in the horizontal plane; KSLi-SUB Mounting adapter allows mixed arrays with KSLi-SUB cabinets on top | - |
| Way_Count | 3 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | in conformity with the provisions of the respective directives (specific directive names not enumerated in OM) | - |
| WEEE_Marking | Yes (EU), WEEE-Reg.-Nr. DE: 13421928 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS(Datasheet) v1.2 en p.1-2; AE v1.2; OM(KSLi8/KSLi12 Manual v1.4 en) Chapter 2.1 "Intended use" p.6, Chapter 3.1/3.2 p.13.
**Product_Category**: OM "The KSLi8 is an installation specific line array loudspeaker for medium to large-scale sound reinforcement applications."
**Model_Number**: OM "d&b Z0790 KSLi8 loudspeaker".
**Description — KSLi-SUB Mounting adapter(신규 개념)**: OM "The KSLi-SUB Mounting adapter allows the setup of mixed arrays with KSLi-SUB cabinets at the top of the array." — KSL8과 GSL의 SUB 파트너(SL-SUB/SL-GSUB) 관계와 유사하나, 이 제품은 전용 어댑터 프레임(Z5745)까지 갖춘 명시적 혼합 배열 지원 구조.

## acoustical_performance

KSL8_v1.0.md와 완전 동일한 음향 스펙(커넥터만 다름, 성능은 동일).

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | 48 - 19000 | Hz |
| Frequency_Response_5dB_Hz | 54 - 18000 | Hz |
| Frequency_Response_6dB_Hz | null | Hz |
| Frequency_Response_3dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak | 145 | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | 157 | dB |
| Max_SPL_Single_Module | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | 80 constant directivity (merging into cardioid dispersion below 150 Hz) | deg |
| Nominal_Directivity_Vertical | null | - |
| Cardioid_Capability | Built-in (KSL8과 동일 근거) | - |
| DSP_Preset_Name | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: OM Chapter 2.5 "Technical specifications" p.11(KSLi8/KSLi12 병기 표).
**나머지 근거**: KSL8_v1.0.md와 동일(수치까지 완전 일치 재확인).

## signal_processing

KSL8_v1.0.md와 완전 동일.

| Key | Value | Unit |
|---|---|---|
| CUT_Mode_Available | Yes | - |
| HFA_Function_Settings | null | - |
| CUT_Mode_Frequency_Response_5dB_Hz | 75 - 18000 | Hz |
| CUT_Mode_Frequency_Response_10dB_Hz | 63 - 19000 | Hz |
| HFC_Function_Settings | HFC1: 40 m additional distance compensation; HFC2: 80 m additional distance compensation (reference: 50% RH, 22 deg C) | - |
| Coupling_Function_Range | Low: +5 to -5; Mid: 0 to -8; increments of 0.5 | dB |

### 주석 및 출처 (Notes & Sources)

**출처**: OM Chapter 2.3.1 "Controller settings" p.9.
**CUT mode — KSLi 전용 서브우퍼 파트너**: OM "The KSLi8/KSLi12 array is now configured for use with the actively driven d&b KSLi-SUB or KSLi-GSUB cabinets." — KSL8의 SL-SUB/SL-GSUB과 이름은 유사하나 KSLi 전용 접두사가 붙은 별도 모델(KSLi-SUB/KSLi-GSUB)로 명시.

## transducers

KSL8_v1.0.md와 완전 동일한 Key 구조 및 값.

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

**출처 및 근거**: KSL8_v1.0.md와 동일(드라이버 구성/파워 핸들링/임피던스 완전 일치 재확인).

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x NLT4 F/M (base); 4-pole Phoenix connector socket (Type DFK PC 4/4 GF, option), pins 1(+)/2(-) | - |
| Link_Connector | null (NLT4 F/M 병렬 배선) | - |
| NLT4_Pinout_Pin1 | Front LF+ / Front LF- | - |
| NLT4_Pinout_Pin2 | Side LF/MF/HF+ / Side LF/MF/HF- | - |
| Phoenix_Pinout_Pin1 [1] | Front LF+ | - |
| Phoenix_Pinout_Pin2 [1] | Front LF- | - |
| Phoenix_Pinout_Pin3 [1] | Side LF/MF/HF+ | - |
| Phoenix_Pinout_Pin4 [1] | Side LF/MF/HF- | - |

### 주석 및 출처 (Notes & Sources)

**출처**: OM Chapter 2.2 "Connections"("Phoenix option" 절 p.7); SPS "Phoenix option" 행.
**[1] Phoenix_Pinout — CCLi8과 다른 핀 의미**: OM "Cabinets with the Phoenix option are fitted with a 4-pole Phoenix connector socket... Pins 1+/2- feeding the forward LF drivers. Pins 3+/4- are connected to the passive crossover networks feeding the side firing LF drivers and the MF/HF driver sections." — CCLi8의 Phoenix_Pinout_*(Input/Link 개념, 오디오 신호 단일 채널)와 달리, KSLi8은 **Front LF/Side LF·MF·HF 2채널 하이브리드 신호를 그대로 반영**한 핀 배정(신규 Key 값이나 Key 이름 자체는 CCLi8과 공유, 커넥터 모델이 동일해 재사용). NOTICE! 경고: "Risk of damage to the system components! Different pin assignment on the loudspeaker and amplifier. Please refer to the corresponding amplifier manual." — Phoenix 옵션은 NLT4와 핀 배정 규칙이 근본적으로 다르므로 혼용 시 위험하다는 제조사 경고.
**Link_Connector**: KSL8과 동일하게 NLT4 F/M 병렬 배선 구조라 별도 루프스루 개념 없음.

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | D90/D80/D40/40D | - |
| Max_Enclosures_Per_Controller_Output | 2 (Line/Arc mode); 1 (AP mode) | count |
| Max_Enclosures_Per_Controller_Total | null | - |
| Crossover_Type | Hybrid — active (front LF channel) + passive (side LF/MF/HF channel) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: OM Chapter 2.1 p.6(NOTICE "Recommended amplifiers: D90/D80/D40/40D") — KSL8과 완전 동일(CCLi8의 25D/40D 축소와 다름, 설치용이라고 항상 앰프 세트가 축소되는 것은 아님을 재확인).
**나머지 근거**: KSL8_v1.0.md와 동일.

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type [1] | three point rigging system (front rigging strands + splay/rear link mechanism); Z5743 KSLi-TOP Mounting frame required for array assembly; fixed outdoor installations must be firmly attached to onsite roof construction, not suspended by hoisting chains/steel wire ropes | - |
| Inter_Enclosure_Angles_deg | 0 - 10 (1° increments) | deg |
| Handles | null | - |
| Weight_Net | 57 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: OM Chapter 2.1 p.6-7("Rigging components and arrays", T-handle 리프팅 핀); KSLi Rigging manual v1.1 en Chapter 1.4 "System components and weights/Load capacity" p.5, Chapter 1.4.1 "Wind loads" p.5.
**[1] Rigging_System_Type — KSL8과 완전히 다른 리깅 생태계**: KSLi는 Z5743 KSLi-TOP Mounting frame(투어링용 Z5722 KSL Flying frame과 별개 모델) 사용. "Wind loads" 절의 명시적 금지 문구("must not be suspended using hoisting chains or steel wire ropes")는 KSL8에는 없던 서술 — 고정 설치 전용 아키텍처 특성.
**Handles=null(KSL8과 다름)**: KSL8은 "recessed handle x2 + rear handles x2"였으나, KSLi8은 OM/AE 전량 스캔 결과 손잡이 서술이 없음(대신 T-handle 임시 리프팅 핀 슬롯만 존재, CCLi8과 유사한 패턴) — 임의로 KSL8 값을 대입하지 않음.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 1000 | mm |
| Height_mm | 330 | mm |
| Depth_mm [1] | 572 | mm |
| Dimensions_Raw | null | mm |
| Cabinet_Material | marine plywood | - |
| Front_Material | rigid metal grill backed by acoustically transparent and water repellent fabric | - |
| Rigging_Components_Material | null | - |
| Finish_Color | null | - |
| Finish_Type | PCP (Polyurea Cabinet Protection), impact and weather protected | - |
| IP_Rating | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS/AE "The dimensions (W x H x D) shall not exceed 1000 x 330 x 572 mm."
**[1] Depth_mm=572mm(KSL8과 다름)**: KSL8은 597mm였으나 KSLi8은 572mm — 25mm 더 얕음(NLT4/Phoenix 겸용 커넥터 패널이 투어링용 대비 슬림하게 설계된 것으로 추정, 원문에 명시적 설명은 없음).
**IP_Rating/Finish_Color/Rigging_Components_Material**: 전량 스캔 결과 없음 — 미확인.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| null | null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**비적용 사유**: KSL8과 동일.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms |
|---|---|---|
| null | null | null |

### 주석 및 출처 (Notes & Sources)

**비적용 사유**: KSL8과 동일.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| fixed install (TOP only) | Z5743 KSLi-TOP Mounting frame | null | 10 cabinets (650 kg SWL total system weight incl. rigging) |
| SUB column (KSLi-SUB) | Z5744 KSLi-SUB Mounting frame | null | 6 cabinets (550 kg SWL total system weight incl. rigging) |
| mixed (TOP below SUB) | Z5744 KSLi-SUB Mounting frame + Z5745 KSLi-SUB Mounting adapter | null | 6 x KSLi-TOP below 2 x KSLi-SUB (600 kg SWL total system weight incl. rigging) |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | null | - |
| Max_Wind_Load [1] | not suspended by hoisting chains/steel wire ropes; must be firmly attached to onsite roof construction (fixed outdoor installations) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: KSLi Rigging manual v1.1 en Chapter 1.4 "Load capacity" p.5, Chapter 1.4.1 "Wind loads" p.5.
**[1] Max_Wind_Load — KSL8과 완전히 다른 성격의 정보(구체적 Beaufort 수치 없음)**: KSL8/GSL은 "6/8 Beaufort" 구체적 풍속 임계치가 있었으나, KSLi Rigging manual은 구체적 수치 대신 **구조적 요구사항**(체인/와이어로프 매달기 금지, 지붕 구조물 고정 필수)만 명시 — 정성적 정보를 이 Key에 그대로 보존, 구체적 Beaufort 수치가 없다는 점에서 KSL8과 다른 유형의 정보임을 명시.
**Safety_Factor**: KSLi Rigging manual 전량 스캔 결과 "5:1" 같은 비율 수치 없음(Secondary safety 절도 정성적 서술만) — 미확인.

## Null Report

**미확인(정보 부족)**: Nominal_Directivity_Vertical, Max_SPL_Single_Module, AES75_Max_Linear_SPL, LF_Nominal_Impedance, HF_Nominal_Impedance, Max_Enclosures_Per_Controller_Total, Handles, Rigging_Components_Material, Finish_Color, IP_Rating, mechanical_safety(Safe_Limit 3건), Safety_Factor, Frequency_Response_4dB_Hz — 14건.
**비적용(KSLi8 아키텍처상 개념 자체 불성립)**: DSP_Preset_Name, LF_Transducer, LF_Nominal_Impedance, MF_Nominal_Impedance, HF_Nominal_Impedance, HFA_Function_Settings, Peak_Power_Handling_10ms_Overall, preset_guide_and_matching(전 항목), delay_defaults(전 항목) — 9건. Link_Connector는 명시적으로 "NLT4 병렬 배선 구조상 별도 개념 없음"으로 판정(KSL8과 동일 원칙, null이지만 비적용).

**총계**: null 23건 (미확인 14건 + 비적용 9건). 확정적 비존재(0/No)로 명시한 항목은 0건 — Passive_Crossover_Network는 "Yes"로 실값 확보. **v1.1(2026-07-19)**: speakers 카테고리 전체 일괄 동기화 라운드 — 신규 Key 3종 반영, 총계 20건→23건.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — d&b audiotechnik 5번째 제품군(KSLi8) 최초 투입, KSL8_v1.0.md를 스켈레톤으로 사용(음향/드라이버 완전 동일, 리깅/커넥터만 상이). `upload/` 폴더 제공 Datasheet+AE+Manual(KSLi8/KSLi12 공용)+**KSLi 전용 Rigging manual**(2020년 최초 발간, KSL8/GSL의 투어링 Flying frame과 완전히 별개인 고정 설치 전용 Mounting frame 체계) 통합. 신규 발견: "Wind loads" 절에서 체인호이스트/와이어로프 매달기 금지+지붕구조물 고정 필수라는 구조적 요구사항(KSL8/GSL의 구체적 Beaufort 수치와 다른 유형의 정보), KSLi-SUB Mounting adapter를 통한 명시적 혼합배열 지원, Phoenix 커넥터 핀아웃이 CCLi8과 달리 하이브리드 2채널 신호를 그대로 반영. Depth_mm=572mm로 KSL8(597mm)보다 25mm 얕음. 권장 앰프는 CCLi8과 달리 축소되지 않고 KSL8과 동일(4종). Null Report 20건(미확인 13건+비적용 7건). |
| v1.1 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-19) — 신규 Key 3종(Frequency_Response_4dB_Hz=미확인, HFA_Function_Settings=비적용, Peak_Power_Handling_10ms_Overall=비적용) 반영. Null Report 20건→23건(미확인 14+비적용 9). |
