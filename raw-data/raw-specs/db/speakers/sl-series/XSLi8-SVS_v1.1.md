# XSLi8-SVS (d&b audiotechnik) — Master Schema

**Category**: speakers | **Brand**: d&b audiotechnik (db) | **Schema Phase**: Phase 4 (d&b 8번째 제품군 투입, XSLi8 대비 Stadium 특수 버전)

**원본 문서 특이사항(사용자 확인 원칙 적용)**: 이 제품의 원본은 Datasheet(2p, AE 절 포함) 단일 문서뿐이며, 문서 하단에 "- preliminary -" 표기가 반복된다 — CCLi8/CCLi12와 동일한 프리릴리즈 상태, 제조사(d&b audiotechnik GmbH & Co. KG) 공식 발간 자료이나 정식 Manual/Rigging manual이 아직 없는 출시 전 단계임을 전제한다(Meyer Sound 1800-LFC 사례에서 확립된 원칙과 동일하게 적용). 전용 Manual/Rigging manual이 세션에 제공되지 않아 다수 항목이 미확인으로 남는다.

**스켈레톤 근거**: `speakers/db/XSLi8_v1.0.md`를 뼈대로 사용 — 음향/드라이버/크로스오버 구성은 XSLi8과 유사하나(3-way, 2채널 하이브리드), SVS(Special Version Stadium)는 근본적으로 다른 커넥터·리깅 방식을 쓴다: NLT4/Phoenix가 아닌 **Faston type connector**(2 x 6.3mm, female)를 사용하고, 리깅도 프레임 방식이 아닌 **캐비닛 자체의 M10 나사산 삽입물**(측면 4개+후면 1개)을 통한 "custom rigging accessories"(주문형 리깅 액세서리, 구체적 부품 카탈로그는 이 문서에 없음)만 지원한다.

**신규 발견 — 이 브랜드 최초의 정식 IP55 등급(정량적 확정)**: AE "The cabinet shall be rated IP55 in accordance to IEC529." — 다른 db 제품(GSL/CCL/KSL/XSL 등)은 IP 등급이 전부 미확인이었으나, SVS는 처음으로 명시적이고 조건 없는 IP55 등급을 확보(Meyer Sound의 조건부 IP 등급들과 달리 무조건적 정격).

**제품 계열**: SL-Series(추정 — 원문에 명시적 시리즈명 서술 없음, 다른 db 제품과의 명명 패턴 일관성에 근거한 추정임을 명시). Model_Number는 이 단일 문서에 없어 미확인.

**아키텍처 판단(원본 근거)**: AE "The loudspeaker system shall be 3-way, actively driven between the forward LF drivers and the sideward LF driver with mid/high sections. Passive crossovers shall be used between the sideward LF driver and the mid/high sections." — XSLi8과 동일한 하이브리드 구조.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | XSLi8 SVS | - |
| Model_Number | null | - |
| Product_Series | SL-Series (추정, 원문 명시 없음) | - |
| Product_Category | installation-specific line array loudspeaker for small to medium-scale sound reinforcement applications (Special Version Stadium) | - |
| Product_Type | Line array loudspeaker | - |
| Description | 3-way line array loudspeaker (Special Version Stadium, custom rigging), IP55 rated for permanent outdoor use, producing 80 deg constant directivity dispersion in the horizontal plane | - |
| Way_Count | 3 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | null | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS(Datasheet, preliminary) p.1-2, AE 절 포함.
**Description**: SPS "This Special Version Stadium (SVS) loudspeaker uses custom rigging solutions to meet the specific requirements of stadium applications. The XSLi8 SVS loudspeaker is optimized for permanent outdoor use with an enclosure rated at IP55."
**Model_Number/Compliance_Standards/WEEE_Marking**: 단일 문서(Datasheet)에 이런 항목 자체가 없음(다른 db 제품의 Manual "Manufacturer's declarations" 챕터에서 확보되던 정보) — 미확인.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | null | Hz |
| Frequency_Response_6dB_Hz | null | Hz |
| Frequency_Response_5dB_Hz | 60 - 18000 | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Frequency_Response_3dB_Hz | null | Hz |
| Max_SPL_Peak [1] | 141 | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| Max_SPL_Single_Module | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | 80 | deg |
| Nominal_Directivity_Vertical | null | - |
| Cardioid_Capability | Built-in (XSLi8과 동일 근거, 정성적 서술만) | - |
| DSP_Preset_Name | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS "System data"/"Loudspeaker data".
**Usable_Bandwidth_Hz(–10dB 기준)**: 다른 db 제품은 이 문서에 -10dB 기준 수치가 있었으나, SVS의 Datasheet는 "-5 dB standard"와 "-5 dB CUT mode" 2개 항목만 제공하고 -10dB IEC60268 기준 수치 자체가 없음 — 미확인.
**[1] Max_SPL — 40D/D80/30D 3종 앰프 조건(신규 발견)**: SPS "Max. sound pressure(1m, free field): With D40/D80: 141 dB / With 30D: 138 dB" — XSLi8과 동일 수치(141/138dB)이나, 이 제품은 "d&b 40D amplifier is recommended... The d&b D80 and 30D amplifier can also be used"로 권장앰프 서열까지 명시(40D가 1순위, D80/30D는 보조).
**Max_SPL_4x_Array_Far_Field_Scaled_1m=null**: 다른 db 제품에 있던 4대 어레이 조건 수치가 이 문서에 없음(custom rigging이라 표준 4대 배열 자체가 전제되지 않는 것으로 추정) — 미확인.
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.

## signal_processing

XSLi8과 동일한 하이브리드 아키텍처이나, 이 제품은 전용 Manual("Controller settings" 챕터)이 없는 단일 Datasheet 소스뿐이라 CUT/HFC/Coupling 관련 수치가 원문에 전혀 없다.

| Key | Value | Unit |
|---|---|---|
| CUT_Mode_Available | null | - |
| HFA_Function_Settings | null | - |
| CUT_Mode_Frequency_Response_5dB_Hz | null | Hz |
| CUT_Mode_Frequency_Response_10dB_Hz | null | Hz |
| HFC_Function_Settings | null | - |
| Coupling_Function_Range | null | dB |

### 주석 및 출처 (Notes & Sources)

**신규 섹션(2026-07-19 speakers 카테고리 일괄 동기화 라운드)**: 이 파일은 v1.0 최초 작성 시 signal_processing 섹션 자체가 누락되어 있었다(다른 db 제품과의 Key 목록 100% 일치 요건 위반) — XSLi8 등 형제 제품과 동일한 Key 6종으로 신설.
**HFA_Function_Settings=비적용**: XSLi8과 동일 아키텍처(2채널 하이브리드, point-source setup이 없는 구조)이므로 다른 db 2채널 하이브리드 제품과 동일 사유로 비적용.
**나머지 5개(CUT_Mode_Available/CUT_Mode_Frequency_Response_5dB_Hz/10dB_Hz/HFC_Function_Settings/Coupling_Function_Range)=미확인**: XSLi8의 동일 Key들은 전용 Manual의 "Controller settings" 챕터(p.8-9)에서 실값을 확보했으나, 이 제품은 그 챕터를 포함하는 Manual 자체가 없는 단일 Datasheet(preliminary) 소스뿐이라 원본에 해당 서술이 없음 — 개념 자체는 XSLi8과 동일하게 성립할 것으로 추정되나(비적용 아님), 원본성 요건상 확인 불가로 미확인 유지.

## transducers

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

**출처**: AE "The loudspeaker system shall consist of two forward 8" LF neodymium drivers in a vented enclosure radiating to the front..." — XSLi8과 완전 동일한 드라이버 구성/파워 핸들링/임피던스.
**LF_Acoustical_Load — XSLi8보다 상세**: AE에 "vented enclosure" 서술이 명시적으로 확인되어 XSLi8(null이었음)보다 실값 확보.
**Peak_Power_Handling_10ms_Overall(신규 Key)**: d&b CCL8에서 신설된 범용 Key — XSLi8과 동일 사유(2채널 하이브리드 구조, front/side 분리 보고)로 비적용.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector [1] | Faston type connector (2 x 6.3 mm), female | - |
| Link_Connector | null | - |
| Faston_Pinout | null (개별 핀 극성/신호 배정 서술 없음) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS "Connections: Faston type connector (2 x 6.3 mm), female"; AE "The connection panel on the rear shall recessed and include corresponding Faston type connectors (2 x 6.3 mm, female). A cover plate which accepts single or dual PG cable glands (Type PG13.5 for cable diameters from 6 - 12 mm) shall be provided."
**[1] Input_Connector — 이 브랜드 최초의 Faston 커넥터(신규 아키텍처)**: 다른 db 제품(NLT4 F/M 또는 Phoenix)과 완전히 다른 커넥터 계열 — Faston은 통상 슬라이드온 스페이드 단자 방식으로, 다른 db 제품의 다핀 로킹 커넥터보다 단순한 2단자(신호 ±로 추정)일 가능성이 높으나 원문에 극성 배정이 명시되지 않아 단정하지 않음.
**Link_Connector=null**: 단일 커넥터(2단자)만 확인, 루프스루용 별도 커넥터 서술 없음 — 미확인.

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller [1] | 40D (recommended); D80, 30D (also usable) | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | - |
| Crossover_Type | Hybrid — active (front LF channel) + passive (side LF/MF/HF channel) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS "The d&b 40D amplifier is recommended to drive the XSLi8 SVS loudspeaker with the appropriate loudspeaker setup selected. The d&b D80 and 30D amplifier can also be used."
**[1] Compatible_Amplified_Controller — 권장 서열 명시(이 브랜드 최초)**: 다른 db 제품은 여러 앰프를 대등하게 나열했으나, SVS는 "recommended"(1순위)와 "can also be used"(대안)를 명시적으로 구분 — 원문 그대로 서열 구조 보존.

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type [1] | four M10 threaded inserts on each side panel + one M10 on rear panel, for custom rigging accessories (no standard flying/mounting frame) | - |
| Inter_Enclosure_Angles_deg | 0 - 14 (1° increments) | deg |
| Handles | null | - |
| Weight_Net | 37 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: AE "The cabinet shall incorporate four M10 threated inserts on each side panel and one M10 on the rear panel for custom rigging accessories."
**[1] Rigging_System_Type — 표준 프레임 없음(다른 db 제품과 근본적으로 다름)**: 다른 SL-Series 제품은 전용 Flying frame/Mounting frame 모델(Z넘버)이 있었으나, SVS는 "custom rigging accessories"(현장별 맞춤 리깅)만 지원하는 나사산 삽입물 구조 — 이 배치에 표준 리깅 액세서리 카탈로그가 제공되지 않아 구체적 안전 정격은 미확인.
**Weight_Net=37kg(XSLi8보다 가벼움)**: XSLi8(39kg)보다 2kg 가벼움 — 표준 리깅 하드웨어(전면/후면 스트랜드 메커니즘)가 빠진 대신 단순 나사산 삽입물만 있어서로 추정.

## physical

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
| IP_Rating [1] | 55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: AE "The dimensions (W x H x D) shall not exceed 700 x 280 x 503 mm."; SPS 도면.
**[1] IP_Rating — 이 브랜드 최초의 무조건적 정식 IP55**: 파일 서두 "신규 발견" 참조 — AE "The cabinet shall be rated IP55 in accordance to IEC529." 조건 없이 확정.
**치수 — XSLi8과 미세하게 다름**: XSLi8(700x283x507mm)보다 Height 3mm/Depth 4mm씩 작음 — Faston 커넥터+커버플레이트 구조가 XSLi8의 NLT4/Phoenix 리세스 패널보다 얕은 것으로 추정(원문에 명시적 설명 없음).

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| null | null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: 단일 Datasheet 문서에 이런 정보 자체가 없음.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms |
|---|---|---|
| null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: 단일 Datasheet 문서에 이런 정보 자체가 없음.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| null | null | null | null |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | null | - |
| Max_Wind_Load | null | - |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: "custom rigging accessories"라는 서술만 있고 구체적 액세서리 카탈로그/하중 정격/안전계수가 이 단일 문서에 전혀 없음 — 다른 db SVS 계열 제품 전용 Rigging manual이 별도로 존재할 가능성이 있으나 이번 배치에는 제공되지 않음.

## Null Report

**미확인(정보 부족, 대부분 전용 Manual/Rigging manual 부재에 기인)**: Model_Number, Compliance_Standards, WEEE_Marking, Usable_Bandwidth_Hz, Frequency_Response_6dB_Hz, Frequency_Response_3dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, Max_SPL_Single_Module, AES75_Max_Linear_SPL, Nominal_Directivity_Vertical, DSP_Preset_Name, LF_Transducer, LF_Nominal_Impedance, MF_Nominal_Impedance, HF_Nominal_Impedance, Link_Connector, Faston_Pinout, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, Handles, Rigging_Components_Material, Finish_Color, preset_guide_and_matching(전 항목), delay_defaults(전 항목), mechanical_safety(전 항목, Safety_Factor/Max_Wind_Load 포함), RMS_Power_Handling_LF, RMS_Power_Handling_MF, RMS_Power_Handling_HF, CUT_Mode_Available, CUT_Mode_Frequency_Response_5dB_Hz, CUT_Mode_Frequency_Response_10dB_Hz, HFC_Function_Settings, Coupling_Function_Range — 36건.
**비적용(XSLi8-SVS 아키텍처상 개념 자체 불성립)**: Nominal_Impedance_Overall, RMS_Power_Handling_Overall, HFA_Function_Settings, Peak_Power_Handling_10ms_Overall — 4건.

**총계**: null 40건 (미확인 36건 + 비적용 4건). 확정적 비존재(0/No)로 명시한 항목은 0건. **v1.1(2026-07-19)**: speakers 카테고리 전체 일괄 동기화 라운드 — 누락되어 있던 signal_processing 섹션(6개 Key) 신설 + 신규 Key 2종(Frequency_Response_4dB_Hz, Peak_Power_Handling_10ms_Overall) 반영, 총계 32건→40건.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — d&b audiotechnik 8번째 제품군(XSLi8-SVS) 최초 투입, XSLi8_v1.0.md를 스켈레톤으로 사용. 원본이 Datasheet(preliminary, AE 절 포함) 단일 문서뿐 — 전용 Manual/Rigging manual 부재. 신규 발견: 이 브랜드 최초의 무조건적 정식 IP55 등급, 이 브랜드 최초의 Faston type connector(NLT4/Phoenix와 완전히 다른 커넥터 계열), 표준 Flying/Mounting frame 없이 M10 나사산 삽입물을 통한 "custom rigging accessories"만 지원(다른 SL-Series 제품과 근본적으로 다른 리깅 철학), 권장 앰프 서열 명시(40D 1순위, D80/30D 대안). Null Report 32건(미확인 30건+비적용 2건). |
| v1.1 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-19) — v1.0에서 signal_processing 섹션 자체가 누락되어 있던 것을 발견(형제 XSLi8과 Key 목록 불일치, 완벽한 양방향 스키마 동기화 위반), CUT_Mode_Available/HFA_Function_Settings/CUT_Mode_Frequency_Response_5dB_Hz/CUT_Mode_Frequency_Response_10dB_Hz/HFC_Function_Settings/Coupling_Function_Range 6개 Key로 신설(HFA_Function_Settings만 비적용, 나머지는 전용 Manual 부재로 미확인). 신규 Key 2종(Frequency_Response_4dB_Hz=미확인, Peak_Power_Handling_10ms_Overall=비적용) 추가 반영. Null Report 32건→40건(미확인 36+비적용 4). |
