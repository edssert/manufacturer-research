# A10 Wide (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(A10 Focus의 30° 고정 커버리지 자매품)

**스켈레톤 근거**: A10 Wide는 A10 Focus와 동일 OM(A10 owner's manual EN version 2.1, "A10 Wide/Focus" 공용 챕터)에서 다뤄지는 자매품이며, 트랜스듀서/커넥터/앰프 호환성/아키텍처(단일 채널 패시브 크로스오버)가 완전히 동일하고 고정 인클로저 각도만 30°(Focus는 10°)로 상이하다.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | A10 Wide | - |
| Model_Number | null | - |
| Product_Series | A Series | - |
| Product_Category | medium throw line source | - |
| Product_Type | Constant Curvature Line Source | - |
| Description | 2-way passive constant curvature WST 30° enclosure: 10" LF cone driver + 2.5" HF diaphragm compression driver, amplified by LA4X / LA8 / LA12X | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | 2006/42/EC Machinery Directive (rigging system, designed per BGV-C1 guidelines) | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: A10_AE_EN.docx("A10 Wide" 섹션); A10_OM_EN.pdf(A10 owner's manual EN version 2.1) p.122 "A10 Wide specifications".
**Product_Series/Product_Type**: A10_AE_EN.docx 최상단 헤더("A10 - Medium throw line source" / "A Series" / "Incremental coverage with **fixed** inter-element angles") — A10 Focus와 공용 AE. Product_Type은 "fixed inter-element angles"(고정 각도=constant curvature)를 근거로 "Constant Curvature Line Source"로 정의.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | 67 - 20000 | Hz |
| Frequency_Response_6dB_Hz | 72 - 20000 | Hz |
| Frequency_Response_3dB_Hz | 78 - 20000 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak | 137 | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | 30 (enclosure) / 70-110 symmetric or 90 asymmetric (L-Fins) | deg |
| Nominal_Directivity_Vertical | 30 | deg |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | A10, A10_FI, A10_MO | - |

### 주석 및 출처 (Notes & Sources)

**Cardioid_Capability=No(확정적 비존재)**: A10_OM_EN_2.1.pdf/A10_AE_EN.docx 전량을 "cardioid" 키워드로 스캔 — A10 Wide 자신에 대한 언급 0건, 검출된 언급은 전부 컴패니언 서브우퍼의 일반 반전 배치 프리셋 안내뿐(4대 어레이 중 1대 반전 방식).
**출처**: A10_AE_EN.docx "Technical requirements"; A10_OM_EN.pdf p.122 "A10 Wide specifications".
**Nominal_Directivity_Horizontal_deg 이중 개념**: A10 Focus와 동일 사유 — "enclosure: 30°"(고정)와 "L-Fins: 70°/110°/90°"(조정형) 병기.
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 10" neodymium cone driver | - |
| HF_Transducer | 2.5" neodymium diaphragm compression driver | - |
| LF_Acoustical_Load | L-Vents, bass-reflex | - |
| HF_Acoustical_Load | DOSC waveguide, L-Fins | - |
| Passive_Crossover_Network | Yes | - |
| LF_Nominal_Impedance | null | Ohm |
| HF_Nominal_Impedance | null | Ohm |
| Nominal_Impedance_Overall | 8 | Ohm |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_HF | null | W |
| RMS_Power_Handling_Overall | 296 | W |
| Peak_Power_Handling_10ms_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: A10_AE_EN.docx "Technical requirements"; A10_OM_EN.pdf p.20 "Connectors", p.122 "A10 Wide specifications".
**RMS_Power_Handling_Overall=296W**: A10 Focus와 동일값(트랜스듀서가 같음) — 원문에서 각각 독립 확인.
**Peak_Power_Handling_10ms_Overall(신규 Key)**: d&b CCL8에서 신설된 범용 Key — RMS_Power_Handling_Overall은 실값을 보유하나 이번 일괄 동기화 라운드에서는 원본을 재조회하지 않아 미확인으로 유지.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 2 x 4-point speakON (IN/LINK interchangeable, only 1 channel carries signal) | - |
| Link_Connector | 2 x 4-point speakON (IN/LINK interchangeable, only 1 channel carries signal) | - |
| SpeakON_Pinout_1 | + / - (combined LF+HF signal, internally split by passive crossover) | - |
| SpeakON_Pinout_2 | Not linked | - |

### 주석 및 출처 (Notes & Sources)

**출처**: A10_OM_EN.pdf p.20 "Connectors"(A10 Wide/Focus 공용 표).

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA4X, LA8, LA12X | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type | Passive (2-way) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: A10_OM_EN.pdf "The A10 Wide/Focus enclosures are driven by the LA4X / LA8 / LA12X amplified controllers".

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | flush-fitting 2-point rigging system(rotating rigging arm + spring-loaded pin) | - |
| Inter_Enclosure_Angles_deg | 30 | deg |
| Handles | 2 | count |
| Weight_Net | 20 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: A10_OM_EN.pdf p.122 "A10 Wide specifications"; p.20 "A10 system rigging"(Focus와 공용).
**Inter_Enclosure_Angles_deg=30**: 원문 "The line source directivity is equal to N x 30 degree".

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 581 | mm |
| Height_mm | 347 | mm |
| Depth_mm | 344 | mm |
| Dimensions_Raw [1] | 581 / 347 / 180 / 344 / 569 / 367 | mm |
| Cabinet_Material | premium grade Baltic beech and birch plywood | - |
| Front_Material | coated steel grill, acoustically neutral 3D fabric | - |
| Rigging_Components_Material | high grade steel with anti-corrosion coating | - |
| Finish_Color | dark grey brown Pantone 426 C | - |
| IP_Rating | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: A10_AE_EN.docx "Physical data" - "Dimensions (W, H/h, D): 581 mm, 347 mm/180 mm, 344 mm"; A10_OM_EN.pdf p.123 "A10 Wide dimensions"(치수 도면).
**[1] Height 이중 표기**: 원문이 "H/h: 347mm/180mm"로 두 개의 높이값을 병기(웨지형 인클로저 특성상 앞/뒤 높이가 다른 것으로 추정) — Height_mm에는 대표값(347)만 채택.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| A10 Wide line source (단독) | [A10] | 67 - 20000 | null | null |
| A10 Wide line source element (단일) | [A10_FI] | 67 - 20000 | null | null |
| A10 Wide with KS21 | [A10] + [KS21_100] | 31 - 20000 | 1 A10 Wide : 1 KS21 | null |

### 주석 및 출처 (Notes & Sources)

**출처**: A10_OM_EN.pdf p.49-52 "Loudspeaker configurations"(A10 Wide/Focus 공용 챕터, A10 Focus와 동일 구조 공유).

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| [A10] or [A10_FI] or [A10_MO] + [KS21_100] | 0 | KS21 = 0 | A10 = + / KS21 = + |
| [A10] or [A10_FI] + [KS21_100_C] | 5.5 | KS21 = 0 | A10 = + / KS21 = + |
| [A10] or [A10_FI] + [KS21_100_Cx] | 0 | KS21 = 0 | A10 = + / KS21 = + |

### 주석 및 출처 (Notes & Sources)

**출처**: A10_OM_EN.pdf p.50 "A10 Wide/Focus line source with low-frequency element"(A10 Focus와 동일 수치). 3개 조합 전부 A10/KS21 양측 폴라리티가 "+"로 동일.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| flown | X-BAR | 1 | 1 |
| vertical array | A10-BUMP | 8 | 8 |
| vertical array | A10-RIGBAR | 4 | 4 |
| vertical array with pullback | A10-BUMP + A10-RIGBAR | 4 | 4 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 4:1 | - |
| Max_Wind_Load | 6 | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: A10_OM_EN.pdf "Mechanical safety"(A10 Focus와 공용 챕터).
**A10-BUMP+A10-RIGBAR 행**: 원문 "A10 Wide: 4 / A10 Focus: 8 / A10 Wide/Focus: 8" — A10 Wide 자신의 값(4)만 채택.

## Null Report

**미확인(정보 부족)**: Model_Number, WEEE_Marking, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, LF_Nominal_Impedance, HF_Nominal_Impedance(단일 통합값만 존재), RMS_Power_Handling_LF/HF(단일 통합값만 존재), Peak_Power_Handling_10ms_Overall, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, preset_guide_and_matching 섹션 내 Recommended_Ratio/Minimum_Line_Length 셀(5건) — 17건.
**비적용**: 없음 — 0건.

**총계**: null 17건 (미확인 17건 + 비적용 0건). 확정적 비존재(0/No)로 명시한 항목은 0건.

**[MR_v1.8 반영 메모]**: 이 파일은 `upload/A10_Wide_v1.6.md`(별도 audio-spec-parsing 프로젝트 산출물)를 이 저장소의 raw-spec으로 이관한 것이다(기존 역재구성본을 대체). `public/js/domains/speakers/data/la/a-series.data.js`의 A10 Wide 엔트리에 Cardioid_Capability/Preset Guide/Matching Ratio/Delay Defaults/Mechanical Safety를 신규 반영했다. 기존 필드는 대조 후 이상 없음.
