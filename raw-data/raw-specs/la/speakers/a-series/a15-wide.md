# A15 Wide (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(A15 Focus의 30° 자매품)

**스켈레톤 근거**: A15 Wide는 A15 Focus와 완전히 동일한 아키텍처이며 고정 인클로저 각도만 30°(Focus는 10°)로 상이하다.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | A15 Wide | - |
| Model_Number | null | - |
| Product_Series | A Series | - |
| Product_Category | medium throw line source | - |
| Product_Type | Constant Curvature Line Source | - |
| Description | 2-way passive constant curvature WST 30° enclosure: 15" LF cone driver + 3" HF diaphragm compression driver, amplified by LA2Xi / LA4X / LA7.16 / LA7.16i / LA12X | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | 2006/42/EC Machinery Directive (rigging system, designed per BGV-C1 guidelines) | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: A15_AE_EN.docx("A15 Wide" 섹션); A15_OM_EN.pdf(A15 owner's manual EN version 3.3) p.138 "A15 Wide specifications".
**Product_Series/Product_Type**: A15_AE_EN.docx 최상단 헤더("A15 - Medium throw line source" / "A Series") — A15 Focus와 공용 AE, 동일 헤더. Product_Type은 "fixed inter-element angles"를 근거로 "Constant Curvature Line Source"로 정의.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | 42 - 20000 | Hz |
| Frequency_Response_6dB_Hz | 47 - 20000 | Hz |
| Frequency_Response_3dB_Hz | 52 - 19000 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak | 141 | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | 30 (enclosure) / 70-110 symmetric or 90 asymmetric (L-Fins) | deg |
| Nominal_Directivity_Vertical | 30 | deg |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | A15, A15_FI, A15_MO | - |

### 주석 및 출처 (Notes & Sources)

**Cardioid_Capability=No(확정적 비존재)**: A15_OM_EN_3.3.pdf/A15_AE_EN.docx 전량을 "cardioid" 키워드로 스캔 — A15 Wide 자신에 대한 언급 0건, 검출된 언급은 전부 컴패니언 서브우퍼의 반전 배치 프리셋 안내뿐.
**출처**: A15_AE_EN.docx "Technical requirements"; A15_OM_EN.pdf p.138 "A15 Wide specifications".
**Frequency_Response_3dB_Hz 상한 19000**: 원문 그대로 채택 — 다른 제품들의 상한(20000)과 달리 A15 Wide만 19kHz로 명시(오기재 가능성도 있으나 임의 정정하지 않음).
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 15" neodymium cone driver | - |
| HF_Transducer | 3" neodymium diaphragm compression driver | - |
| LF_Acoustical_Load | bass-reflex, L-Vents | - |
| HF_Acoustical_Load | DOSC waveguide, L-Fins | - |
| Passive_Crossover_Network | Yes | - |
| LF_Nominal_Impedance | null | Ohm |
| HF_Nominal_Impedance | null | Ohm |
| Nominal_Impedance_Overall | 8 | Ohm |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_HF | null | W |
| RMS_Power_Handling_Overall | 446 | W |
| Peak_Power_Handling_10ms_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: A15_AE_EN.docx "Technical requirements"; A15_OM_EN.pdf p.138 "A15 Wide specifications".
**Peak_Power_Handling_10ms_Overall(신규 Key)**: d&b CCL8에서 신설된 범용 Key — RMS_Power_Handling_Overall은 실값을 보유하나 이번 일괄 동기화 라운드에서는 원본을 재조회하지 않아 미확인으로 유지.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 2 x 4-point speakON (IN/LINK interchangeable, only 1 channel carries signal) | - |
| Link_Connector | 2 x 4-point speakON (IN/LINK interchangeable, only 1 channel carries signal) | - |
| SpeakON_Pinout_1 | + / - (combined LF+HF signal, internally split by passive crossover) | - |
| SpeakON_Pinout_2 | Not linked | - |

### 주석 및 출처 (Notes & Sources)

**출처**: A15_OM_EN.pdf "Connectors"(A15 Wide/Focus 공용 표).

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA2Xi, LA4X, LA7.16, LA7.16i, LA12X | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type | Passive (2-way) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: A15_OM_EN.pdf "The A15 Wide/Focus enclosures are driven by the LA2Xi / LA4X / LA7.16 / LA7.16i / LA12X amplified controllers".

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | flush-fitting 2-point rigging system(rotating rigging arm + spring-loaded pin) | - |
| Inter_Enclosure_Angles_deg | 30 | deg |
| Handles | 2 | count |
| Weight_Net | 33 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: A15_OM_EN.pdf p.138 "A15 Wide specifications"("Rigging and handling").

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 762 | mm |
| Height_mm | 424 | mm |
| Depth_mm | 494 | mm |
| Dimensions_Raw [1] | 762 / 424 / 182 / 494 | mm |
| Cabinet_Material | premium grade Baltic beech and birch plywood | - |
| Front_Material | coated steel grill, acoustically neutral 3D fabric | - |
| Rigging_Components_Material | high grade steel with anti-corrosion coating | - |
| Finish_Color | dark grey brown Pantone 426 C | - |
| IP_Rating | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: A15_AE_EN.docx "Physical data" - "Dimensions (W, H/h, D): 762 mm, 424 mm/182 mm, 494 mm".
**[1] Height 이중 표기**: A10 Wide와 동일 사유 — 웨지형 인클로저의 앞/뒤 높이(424mm/182mm) 병기, Height_mm에는 대표값(424)만 채택.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| A15 Wide line source (단독) | [A15] | 42 - 20000 | null | null |
| A15 Wide line source element (단일) | [A15_FI] | 43 - 20000 | null | null |
| A15 Wide with KS21 [1] | [A15] + [KS21_60] | 29 - 20000 | 1 A15 Wide : 1 KS21 | null |

### 주석 및 출처 (Notes & Sources)

**출처**: A15_OM_EN.pdf p.49-52 "Loudspeaker configurations"(A15 Focus와 동일 구조 공유).
**[1] 배치 간격**: A15 Focus와 동일 사유 — coupled(3:2) 최대 2.8m 또는 separated(1:1) 조건, 대표 1:1 비율 채택.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| [A15] or [A15_FI] or [A15_MO] + [KS21_60] | 0 | KS21 = 2.3 | A15 Wide = + / KS21 = + |
| [A15] or [A15_FI] + [KS21_60_C] | 9 | KS21 = 0 | A15 Wide = + / KS21 = - |
| [A15] or [A15_FI] + [KS21_60_Cx] | 8 | KS21 = 0 | A15 Wide = + / KS21 = + |

### 주석 및 출처 (Notes & Sources)

**출처**: A15_OM_EN.pdf p.51-52 "Pre-alignment delays"(A15 Wide/Focus 공용 표, A15 Focus와 동일 수치).

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| flown | X-BAR | 1 | 1 |
| vertical array | A15-BUMP + M-BAR (optional) | 8 | 8 |
| vertical array | A15-RIGBAR | 4 | 4 |
| vertical array with pullback | A15-BUMP + M-BAR (optional) + A15-RIGBAR | 5 | 5 |
| vertical array with pullback | 2 x A15-RIGBAR | 4 | 4 |
| stacked vertical array | no rigging accessory | 1 | 1 |
| stacked vertical array | KS21-OUTRIG | 4 | 4 |
| pole-mounted | A-MOUNT | 1 | 1 |
| stacked on KS21, angle adjustment [1] | A-TILT + KS21-OUTRIG or KS21-CHARIOT with K2-JACK | 4 (KS21 포함) | 4 A15 Wide + 4 KS21 |
| stacked on KS21 [1] | KS21-OUTRIG or KS21-CHARIOT with K2-JACK | 2 A15 Wide | 3 KS21 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 4:1 | - |
| Max_Wind_Load | 6 | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: A15_OM_EN.pdf p.47-48 "Mechanical safety"(A15 Focus와 공용 챕터).
**A15-BUMP+M-BAR+A15-RIGBAR 행**: 원문 "A15 Wide: 5 / A15 Focus: 8 / A15 Wide/Focus: 8" — A15 Wide 자신의 값(5)만 채택(Focus의 8과 다름).
**[1] KS21 스택 구성**: "3 A15 Focus / 2 A15 Wide" — A15 Wide 자신의 값(2)만 채택.

## Null Report

**미확인(정보 부족)**: Model_Number, WEEE_Marking, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, LF_Nominal_Impedance, HF_Nominal_Impedance(단일 통합값만 존재), RMS_Power_Handling_LF/HF(단일 통합값만 존재), Peak_Power_Handling_10ms_Overall, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, preset_guide_and_matching(5건) — 17건.
**비적용**: 없음 — 0건.

**총계**: null 17건 (미확인 17건 + 비적용 0건). 확정적 비존재(0/No)로 명시한 항목은 0건.

**[MR_v1.8 반영 메모]**: 이 파일은 `upload/A15_Wide_v1.6.md`(별도 audio-spec-parsing 프로젝트 산출물)를 이 저장소의 raw-spec으로 이관한 것이다(기존 역재구성본을 대체). `public/js/domains/speakers/data/la/a-series.data.js`의 A15 Wide 엔트리에 Cardioid_Capability/Preset Guide/Matching Ratio/Delay Defaults/Mechanical Safety를 신규 반영했다. 기존 필드는 대조 후 이상 없음.
