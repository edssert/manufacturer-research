# A10i Wide (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(A10i Focus의 30° 자매품)

**스켈레톤 근거**: A10 Wide/Focus와 동일한 관계로, A10i Wide는 A10i Focus와 완전히 동일한 아키텍처(terminal block, 5종 앰프 호환)이며 고정 인클로저 각도만 30°(Focus는 10°)로 상이하다.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | A10i Wide | - |
| Model_Number | null | - |
| Product_Series | A Series Install | - |
| Product_Category | medium throw line source (installation version) | - |
| Product_Type | Constant Curvature Line Source | - |
| Description | 2-way passive constant curvature WST 30° enclosure (installation version): 10" LF cone driver + 2.5" HF diaphragm compression driver, amplified by LA1.16i / LA2Xi / LA4X / LA7.16i / LA12X | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | 2006/42/EC Machinery Directive (rigging system, designed per BGV-C1 guidelines) | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: A10i_AE_EN.docx("A10i Wide" 섹션); A10i_OM_EN.pdf(A10i owner's manual EN version 5.0) p.159 "A10i Wide specifications".
**Product_Series/Product_Type**: A10i_AE_EN.docx 최상단 헤더("A10i - Medium throw line source" / "A Series Install") — A10i Focus와 공용 AE, 동일 헤더. Product_Type은 "fixed inter-element angles"를 근거로 "Constant Curvature Line Source"로 정의.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | 67 - 20000 | Hz |
| Frequency_Response_6dB_Hz | 72 - 20000 | Hz |
| Frequency_Response_3dB_Hz | 78 - 20000 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak | 137 dB(LA2Xi bridge/LA4X/LA7.16i/LA12X) / 133 dB(LA2Xi) / 132 dB(LA1.16i bridge) | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | 30 (enclosure) / 70-110 symmetric or 90 asymmetric (L-Fins) | deg |
| Nominal_Directivity_Vertical | 30 | deg |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | A10, A10_FI, A10_MO | - |

### 주석 및 출처 (Notes & Sources)

**Cardioid_Capability=No(확정적 비존재)**: A10i_OM_EN_5.0.pdf/A10i_AE_EN.docx 전량을 "cardioid" 키워드로 스캔 — A10i Wide 자신에 대한 언급 0건, 검출된 언급은 전부 컴패니언 서브우퍼(SB18 IIi/KS21i 등)의 반전 배치 프리셋·전용 액세서리 안내뿐.
**출처**: A10i_AE_EN.docx "Technical requirements"; A10i_OM_EN.pdf p.159 "A10i Wide specifications".
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 10" cone driver | - |
| HF_Transducer | 2.5" diaphragm compression driver, neodymium | - |
| LF_Acoustical_Load | bass-reflex, L-Vents | - |
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

**출처**: A10i_AE_EN.docx "Technical requirements"; A10i_OM_EN.pdf p.159 "A10i Wide specifications".
**Peak_Power_Handling_10ms_Overall(신규 Key)**: d&b CCL8에서 신설된 범용 Key — RMS_Power_Handling_Overall은 실값을 보유하나 이번 일괄 동기화 라운드에서는 원본을 재조회하지 않아 미확인으로 유지.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 4-point terminal block with push-in connection + connector sealing plate with cable gland | - |
| Link_Connector | 1 x 4-point terminal block with push-in connection + connector sealing plate with cable gland | - |
| Terminal_Block_Pinout_1 | + / - (combined LF+HF signal, internally split by passive crossover) | - |
| Terminal_Block_Pinout_2 | Not linked | - |

### 주석 및 출처 (Notes & Sources)

**출처**: A10i_OM_EN.pdf p.21 "Connectors"(A10i Wide/Focus 공용 표).

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA1.16i, LA2Xi, LA4X, LA7.16i, LA12X | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type | Passive (2-way) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: A10i_OM_EN.pdf "The A10i Wide/Focus enclosures are driven by the LA1.16i / LA2Xi / LA4X / LA7.16i / LA12X amplified controllers".

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | external rigging kits; M6 inserts(rigging plates), M8 inserts(A10-Ui), 4 M6 inserts(rigging accessory), 1 DIN580-compatible M8 insert(secondary safety) | - |
| Inter_Enclosure_Angles_deg | 30 | deg |
| Handles | null | count |
| Weight_Net | 18 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: A10i_OM_EN.pdf p.159 "A10i Wide specifications".

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 569 | mm |
| Height_mm | 347 | mm |
| Depth_mm | 345 | mm |
| Dimensions_Raw [1] | 569 / 347 / 180 / 371 / 345 / 366 | mm |
| Cabinet_Material | premium grade Baltic beech and birch plywood | - |
| Front_Material | coated steel grill, acoustically neutral 3D fabric | - |
| Rigging_Components_Material | null | - |
| Finish_Color | dark grey brown Pantone 426 C, pure white RAL 9010, custom RAL code on special order | - |
| IP_Rating | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: A10i_AE_EN.docx "Physical data" - "Dimensions (W, H, D): 569 mm, 347 mm, 345 mm"; A10i_OM_EN.pdf p.160 "A10i Wide dimensions"(치수 도면).
**[1] Dimensions_Raw**: 도면 6개 숫자 중 569/347/345는 AE와 일치, 나머지(180=후면 리깅 플레이트 폭, 371/366=부가 치수)는 도면에서 직접 확인.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| A10i Wide line source (단독) | [A10] | 67 - 20000 | null | null |
| A10i Wide line source element (단일) | [A10_FI] | 67 - 20000 | null | null |
| A10i Wide with KS21i | [A10] + [KS21_100] | 31 - 20000 | 1 A10i Wide : 1 KS21i | null |

### 주석 및 출처 (Notes & Sources)

**출처**: A10i_OM_EN.pdf p.51-53 "Loudspeaker configurations"(A10i Focus와 동일 구조 공유).

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| [A10] or [A10_FI] or [A10_MO] + [KS21_100] | 0 | KS21i = 0 | A10i Wide = + / KS21i = + |
| [A10] or [A10_FI] + [KS21_100_C] | 5.5 | KS21i = 0 | A10i Wide = + / KS21i = + |
| [A10] or [A10_FI] + [KS21_100_Cx] | 0 | KS21i = 0 | A10i Wide = + / KS21i = + |

### 주석 및 출처 (Notes & Sources)

**출처**: A10i_OM_EN.pdf p.53 "Pre-alignment delays"(A10i Focus와 공용 표, 동일 수치).

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| vertical array | A10i-BUMP + rigging plates | 8 | 8 |
| vertical array | A10-Ui | 1 | 1 |
| vertical array | A10-Ui + A10i-ULINK II | 2 | 2 |
| vertical array with pullback | A10i-BUMP + rigging plates + A10i-RIGBAR | 8 | 8 |
| vertical array with pullback | A10i-RIGBAR x2 + rigging plates | 12 | 12 |
| stacked vertical array | Ai-FIXBRACKET + rigging plates | 4 | 4 |
| stacked vertical array with angle adjustment | A10i-TILTBRACKET + rigging plates | 4 | 4 |
| stacked on KS21i | Ai-FIXBRACKET + rigging plates | 4 A10i Wide | 4 KS21i |
| stacked on KS21i, angle adjustment | Ai-FIXBRACKET + A10i-TILT + rigging plates | 4 A10i Wide | 4 KS21i |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 4:1 | - |
| Max_Wind_Load | null | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: A10i_OM_EN.pdf p.49-50 "Mechanical safety"(A10i Focus와 공용 챕터).
**A10i-BUMP+rigging plates+A10i-RIGBAR 행**: 원문 "A10i Wide: 8 / A10i Focus: 12 / A10i Wide/Focus: 12"에서 A10i Wide 값(8) 채택(Focus의 12와 다름).

## Null Report

**미확인(정보 부족)**: Model_Number, WEEE_Marking, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, LF_Nominal_Impedance, HF_Nominal_Impedance(단일 통합값만 존재), RMS_Power_Handling_LF/HF(단일 통합값만 존재), Peak_Power_Handling_10ms_Overall, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, Handles, Rigging_Components_Material, Max_Wind_Load, preset_guide_and_matching 섹션 내 Recommended_Ratio/Minimum_Line_Length 셀(5건) — 20건.
**비적용**: 없음 — 0건.

**총계**: null 20건 (미확인 20건 + 비적용 0건). 확정적 비존재(0/No)로 명시한 항목은 0건.

**[MR_v1.8 반영 메모]**: 이 파일은 `upload/A10i_Wide_v1.7.md`(별도 audio-spec-parsing 프로젝트 산출물)를 이 저장소의 raw-spec으로 이관한 것이다. `public/js/domains/speakers/data/la/a-series.data.js`의 A10i Wide 엔트리에 Cardioid_Capability/Preset Guide/Matching Ratio/Delay Defaults/Mechanical Safety를 신규 반영했다. 기존 필드는 대조 후 이상 없음.
