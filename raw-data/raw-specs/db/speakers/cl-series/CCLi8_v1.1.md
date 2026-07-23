# CCLi8 (d&b audiotechnik) — Master Schema

**Category**: speakers | **Brand**: d&b audiotechnik (db) | **Schema Phase**: Phase 4 (d&b 3번째 제품군 투입, CCL8/CCL12 대비 설치용 버전)

**스켈레톤 근거**: `speakers/db/CCL8_v1.0.md`를 뼈대로 사용 — 음향/드라이버 구성은 CCL8과 완전 동일(2-way, 단일 채널 완전 패시브)하나, 설치용(i) 버전 특유의 차이가 있다: 커넥터가 NLT4(speakON)에서 **4극 Phoenix 커넥터**(Type DFK PC 4/4 GF)로 변경, 전용 손잡이가 없는 대신 전면 그릴 양쪽에 통합 마운팅 플레이트("Front link")가 추가, 권장 앰프가 CCL8의 4종(D25/D40/D90/D80)에서 **25D/40D 2종**으로 축소.

**중요 — 이 제품 계열은 원본 문서에 "preliminary"(프리릴리즈) 표기가 있음**: Datasheet(CCLi12용, CCLi8 자체 Datasheet는 미제공)와 Rigging manual 표지/본문에 "- preliminary -" 워터마크가 명시적으로 표기되어 있다 — Meyer Sound 1800-LFC와 동일하게 제조사(d&b audiotechnik) 공식 홈페이지에서 발간된 정식 자료이나, 제품 출시 전 단계라 일부 스펙이 최종 확정본이 아닐 수 있음을 전제한다. Manual(CCLi8/CCLi12 Manual 1.2 en) 자체에는 이 워터마크가 없어, 이 문서만은 상대적으로 더 확정된 것으로 판단된다.

**원본 문서 구성 — CCLi8 자체 Datasheet 없음**: `upload/` 폴더에 CCLi12용 Datasheet PDF는 있으나 CCLi8용은 없음(AE txt만 제공) — CCLi8의 상세 수치는 AE(txt)+공유 Manual(CCLi8/CCLi12 Manual)에서 확보.

**CCLi8/CCLi12 관계**: CCL8/CCL12 전례와 동일하게 별도 두 파일로 분리. Model_Number는 Manual Chapter 3.1 "d&b Z0890 CCLi8 loudspeaker".

**아키텍처 판단(원본 근거)**: AE "The loudspeaker system shall be a bipolar 2-way design with passive crossover network..." — CCL8과 완전 동일한 드라이버/크로스오버 구조. Manual "Requires only one amplifier channel"(CCL8/CCL12 Manual과 동일 문구, Features and benefits 절 재확인).

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | CCLi8 | - |
| Model_Number | Z0890 | - |
| Product_Series | CL-Series | - |
| Product_Category | compact cardioid line array loudspeaker for small to medium-scale sound reinforcement in fixed install applications | - |
| Product_Type | Line array loudspeaker | - |
| Description | 2-way line array loudspeaker (fixed install version); up to 24 cabinets flown per column via CCLi Flying frame, producing 80 deg constant directivity dispersion in the horizontal plane; requires only one amplifier channel | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | in conformity with the provisions of the respective directives (specific directive names not enumerated in OM) | - |
| WEEE_Marking | Yes (EU), WEEE-Reg.-Nr. DE: 13421928 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: AE(Architectural specifications) v1.2; OM(CCLi8/CCLi12 Manual v1.2 en) Chapter 2.1 "Intended use" p.5, Chapter 3.1/3.2 p.12.
**Product_Category="...in fixed install applications"**: OM "The CCLi8 is a compact cardioid line array loudspeaker for small to medium-scale sound reinforcement in fixed install applications." — CCL8의 "in mobile applications"과 대조되는 설치용 명시적 표현.
**Model_Number**: OM Chapter 3.1 "This declaration applies to: d&b Z0890 CCLi8 loudspeaker".
**WEEE_Marking**: CCL8/GSL8과 동일 등록번호.

## acoustical_performance

CCL8_v1.0.md와 완전 동일한 음향 스펙(동일 드라이버 구성, 커넥터만 다름).

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | 55 - 20000 | Hz |
| Frequency_Response_5dB_Hz | 60 - 18000 | Hz |
| Frequency_Response_6dB_Hz | null | Hz |
| Frequency_Response_3dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak [1] | 137 | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | 149 | dB |
| Max_SPL_Single_Module | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | 80 | deg |
| Nominal_Directivity_Vertical | null | - |
| Cardioid_Capability | Built-in (CCL8과 동일 근거, "compact cardioid line array loudspeaker" 자기 서술) | - |
| DSP_Preset_Name | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: OM Chapter 2.5 "Technical specifications" p.10(CCLi8/CCLi12 병기 표).
**[1] Max_SPL**: OM "CCLi8 with D25/D20/25D/30D: 135 dB / CCLi8 with D90/D80/D40/40D: 137 dB" — CCL8과 완전히 동일한 수치(음향 성능 자체는 커넥터 변경과 무관). 4대 어레이 값(149dB)도 동일.
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.
**나머지 근거**: CCL8_v1.0.md와 동일.

## transducers

CCL8_v1.0.md와 완전 동일.

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

**출처 및 근거**: CCL8_v1.0.md와 동일(드라이버 구성/파워 핸들링 완전 동일).

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector [1] | 4-pole Phoenix connector socket (Type DFK PC 4/4 GF), pins 1(+)/2(-) | - |
| Link_Connector [1] | same 4-pole Phoenix connector socket, pins 3(+)/4(-) | - |
| Phoenix_Pinout_Pin1 [1] | Input Signal (+) | - |
| Phoenix_Pinout_Pin2 [1] | Input Signal (-) | - |
| Phoenix_Pinout_Pin3 [1] | Link Signal (+) | - |
| Phoenix_Pinout_Pin4 [1] | Link Signal (-) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: OM Chapter 2.2 "Connections" p.6("Connector wiring" 도해, "Input"/"Link" 라벨).
**[1] 신규 Key군(Phoenix_Pinout_*, 이 브랜드 최초의 Phoenix 커넥터 핀아웃)**: OM "The cabinets are fitted with a 4-pole Phoenix connector socket (Type: DFK PC 4/4 GF) using the pin assignment 1:+, 2:-, 3:+, 4:-. Pins 1/3 and 2/4 are linked." — Input(1+/2-)과 Link(3+/4-)가 하나의 물리적 커넥터 안에 병렬로 배선된 구조(전기적으로는 CCL8의 NLT4 F/M 루프스루와 동일 기능이나 물리적으로 단일 커넥터). GSL의 NLT4_Pinout_*, CCL8의 NLT4_Pinout_*과 병렬되는 신규 커넥터 모델 고유 Key — 다른 db 파일에는 생성하지 않는다(SKILL v1.14, 커넥터 모델명이 Key에 박힌 브랜드/제품 고유 유형).
**동봉 플러그**: OM "A corresponding Phoenix plug (Type: SPC 5/4) is enclosed with the cabinet." — 원문 표기 그대로 보존(5/4라는 표기가 4극 소켓과 다소 이례적이나 원문 그대로).
**d&b LoadMatch**: OM "With the d&b four channel amplifier platform, the LoadMatch function enables the amplifier to electrically compensate for the properties of the loudspeaker cable used without the need for an additional sense wire." — CCL8에도 동일 서술 있었으나 이 파일에서 처음 완전한 형태로 인용(CCL8에는 각주로 미기재), 커넥터 타입과 무관하게 적용 가능한 기능.

## signal_processing

CCL8_v1.0.md와 완전 동일.

| Key | Value | Unit |
|---|---|---|
| CUT_Mode_Available | Yes | - |
| CUT_Mode_Frequency_Response_5dB_Hz | 90 - 18000 | Hz |
| CUT_Mode_Frequency_Response_10dB_Hz | 80 - 20000 | Hz |
| HFC_Function_Settings | HFC1: 40 m additional distance compensation; HFC2: 80 m additional distance compensation (reference: 50% RH, 22 deg C) | - |
| Coupling_Function_Range | Low: +5 to -5; Mid: 0 to -8; increments of 0.5 | dB |
| HFA_Function_Settings | null | - |

### 주석 및 출처 (Notes & Sources)

**출처 및 근거**: CCL8_v1.0.md와 동일(수치 완전 일치 재확인).
**HFA_Function_Settings(신규 Key, 비적용)**: T10/Ti10L/Ti10P에서 신설된 db 고유 기능 Key(PS/point-source setup 전용 HF 감쇠) — 이 제품은 point-source setup이 없는 구조라 비적용.

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller [1] | 25D/40D | - |
| Max_Enclosures_Per_Controller_Output | 2 (Line/Arc mode); 1 (AP mode) | count |
| Max_Enclosures_Per_Controller_Total | null | - |
| Crossover_Type | Passive (2-way, single amplifier channel, front LF+side LF+HF combined via internal passive crossover network) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: OM Chapter 2.1 "Intended use" p.5(NOTICE "Recommended amplifiers: 25D/40D").
**[1] Compatible_Amplified_Controller — CCL8과 다름(설치용 축소 세트)**: CCL8은 D25/D40/D90/D80 4종이 권장되었으나 CCLi8은 25D/40D 2종만 권장 — 설치용 버전이 투어링용 상위 앰프(D90/D80)를 권장 목록에서 제외한 것으로 판단(임의 추정 아님, OM 원문 그대로 반영).
**나머지 근거**: CCL8_v1.0.md와 동일(Cabinets per channel 표는 CCLi8/CCLi12 항목으로 별도 표기되나 수치는 CCL8과 동일).

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type [1] | three point rigging system (front rigging strands + splay/rear link mechanism); Z5826 CCLi Flying frame required for array assembly; 4 dedicated fixing screws (flange head cap screw M8x20) enclosed | - |
| Inter_Enclosure_Angles_deg | 0 - 14 (1° increments) | deg |
| Handles | null | - |
| Weight_Net | 18.1 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: OM Chapter 2.1 p.5("Four dedicated fixing screws [F]... are enclosed with the respective loudspeaker"), p.6("CL-Series rigging components and arrays"); CCLi Rigging manual v1.1 en(preliminary) Chapter 1.3 "Load capacity/Components and weights" p.5.
**[1] Z5826 CCLi Flying frame 하중 정격**: CCLi Rigging manual "The Z5826 CCLi Flying frame including Beam extension is designed to support a maximum total system weight of up to 500 kg (1100 lb) - SWL including all rigging components." — CCL의 Z5820과 동일 정격(500kg), 별도 모델명(Z5826)만 다름.
**Handles=null(CCL8과 다름)**: CCL8은 측면 손잡이 1개+후면 지지 손잡이 2개가 명시됐으나, CCLi8은 OM/AE 전량 스캔 결과 손잡이 서술이 전혀 없음 — 대신 "Front link" 통합 마운팅 플레이트(양쪽)가 명시(설치용 버전 특성 반영, 임의로 CCL8 값을 대입하지 않음).

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 593 | mm |
| Height_mm | 209 | mm |
| Depth_mm | 355 | mm |
| Dimensions_Raw [1] | 593 / 209 / 355 / 254 | mm |
| Cabinet_Material | injection molded ABS Polycarbonate | - |
| Front_Material [2] | rigid, perforated steel grill backed with acoustically transparent and water repellent fabric; front grill incorporates integrated mounting plate (Front link) on both sides | - |
| Rigging_Components_Material | null | - |
| Finish_Color | null | - |
| Finish_Type | 2K finish, impact resistant and weather protecting | - |
| IP_Rating [3] | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: OM p.11 "CCLi8/CCLi12 cabinet dimensions in mm [inch]"(도면).
**W/H/D 축 확정**: AE "The dimensions (W x H x D) shall not exceed 593 x 209 x 355 mm" — CCL8과 동일 치수.
**[1] Dimensions_Raw — 4번째 치수(CCL8에 없던 수치)**: 도면 상면도에 "254 [10]"이라는 CCL8/CCL12 도면에는 없던 추가 치수가 표기됨(추정: Front link 마운팅 플레이트 관련 폭 또는 후면 패널 폭) — 정확한 축/의미가 원문에 라벨링되어 있지 않아 임의 해석하지 않고 Dimensions_Raw에 4번째 숫자로 보존.
**[2] Front_Material**: OM "The front grill also incorporates an integrated mounting plate (Front link) on both sides." — CCL8에 없던 설치용 마운팅 기능.
**[3] IP_Rating**: CCL8과 동일한 "Possible risk of water ingress" NOTICE 확인(OM Chapter 2.1) — 정식 등급 수치 없음, 미확인.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| null | null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**비적용 사유**: CCL8과 동일.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms |
|---|---|---|
| null | null | null |

### 주석 및 출처 (Notes & Sources)

**비적용 사유**: CCL8과 동일.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| flown | Z5826 CCLi Flying frame | null | 24 cabinets (500 kg SWL total system weight incl. rigging components) |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | null | - |
| Max_Wind_Load | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: AE "The cabinet shall incorporate a three point rigging system for the assembly of vertical line source arrays in connection with dedicated flying frames"(CCL8과 달리 "up to 24 cabinets" 수치가 AE 문장 자체에는 없음 — Datasheet 미보유로 Maximum_Limit은 CCLi Rigging manual의 SWL 수치와 Z5826의 CCL 대응 정격을 근거로 CCL과 동일하게 채택, 완전히 동일한 수치가 명시적으로 재확인되지는 않아 CCL8보다 근거 신뢰도가 약간 낮음을 명시); CCLi Rigging manual p.5(SWL 500kg).
**Safe_Limit 열 null 사유**: CCL8과 동일.

## Null Report

**미확인(정보 부족)**: Nominal_Directivity_Vertical, Max_SPL_Single_Module, AES75_Max_Linear_SPL, LF_Nominal_Impedance, HF_Nominal_Impedance, Max_Enclosures_Per_Controller_Total, Handles, Rigging_Components_Material, Finish_Color, IP_Rating, Frequency_Response_4dB_Hz, mechanical_safety(Safe_Limit 1건, Safety_Factor, Max_Wind_Load) — 13건.
**비적용(CCLi8 아키텍처상 개념 자체 불성립)**: DSP_Preset_Name, HFA_Function_Settings, preset_guide_and_matching(전 항목), delay_defaults(전 항목) — 4건. MF 관련 Key, GSL 고유 Key, CCL8의 NLT4_Pinout_* Key는 이 제품의 커넥터(Phoenix)와 무관해 애초에 생성하지 않음.

**총계**: null 17건 (미확인 13건 + 비적용 4건). 확정적 비존재(0/No)로 명시한 항목은 0건.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — d&b audiotechnik 3번째 제품군(CCLi8) 최초 투입, CCL8_v1.0.md를 스켈레톤으로 사용(설치용 버전, 음향 스펙 동일·커넥터/손잡이/권장앰프 상이). 자체 Datasheet PDF가 없어 AE(txt)+CCLi8/CCLi12 공용 Manual+CCLi Rigging manual로 파싱 — 원본 문서 3종에 "preliminary"(프리릴리즈) 표기 확인(제조사 공식 홈페이지 발간 정식 자료, 출시 전 단계). 신규 Key군 `Phoenix_Pinout_Pin1~4` 신설(이 브랜드 최초 Phoenix 커넥터 핀아웃, 커넥터 모델 고유라 비동기화). CCL8과의 차이: 권장 앰프 축소(25D/40D만), 손잡이 없음 대신 Front link 마운팅 플레이트, 도면에 CCL8에 없던 4번째 치수(254mm) 확인. Null Report 15건(미확인 12건+비적용 3건). |
| v1.1 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-18, d&b 대량 배치 완료 후) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래, 미확인), `HFA_Function_Settings`(T10 유래, 비적용) 반영. Null Report 17건(미확인 13건+비적용 4건)으로 갱신. |
