# A10i Focus (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(A10 Focus의 install 파생형)

**스켈레톤 근거**: A10i Focus는 A10 Focus와 동일 아키텍처(단일 채널 패시브 크로스오버, 10° 고정 인클로저 각도)이나 커넥터가 speakON이 아닌 **4-point terminal block**(push-in)이며 앰프 호환성이 LA4X/LA8/LA12X가 아닌 **LA1.16i/LA2Xi/LA4X/LA7.16i/LA12X**(5종)로 확장된다.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | A10i Focus | - |
| Model_Number | null | - |
| Product_Series | A Series Install | - |
| Product_Category | medium throw line source (installation version) | - |
| Product_Type | Constant Curvature Line Source | - |
| Description | 2-way passive constant curvature WST 10° enclosure (installation version): 10" LF cone driver + 2.5" HF diaphragm compression driver, amplified by LA1.16i / LA2Xi / LA4X / LA7.16i / LA12X | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | 2006/42/EC Machinery Directive (rigging system, designed per BGV-C1 guidelines) | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: A10i_AE_EN.docx("A10i Focus" 섹션); A10i_OM_EN.pdf(A10i owner's manual EN version 5.0) p.157 "A10i Focus specifications".
**Product_Series/Product_Type**: A10i_AE_EN.docx 최상단 헤더("A10i - Medium throw line source" / "A Series Install" / "Incremental coverage with **fixed** inter-element angles") — install 파생형은 "A Series"가 아닌 "A Series Install"로 별도 표기됨(A10 Focus/Wide의 "A Series"와 구분). Product_Type은 "fixed inter-element angles"를 근거로 "Constant Curvature Line Source"로 정의.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | 66 - 20000 | Hz |
| Frequency_Response_6dB_Hz | 70 - 20000 | Hz |
| Frequency_Response_3dB_Hz | 75 - 20000 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak [1] | 140 dB(LA2Xi bridge/LA4X/LA7.16i/LA12X) / 136 dB(LA2Xi) / 135 dB(LA1.16i bridge) | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | 10 (enclosure) / 70-110 symmetric or 90 asymmetric (L-Fins) | deg |
| Nominal_Directivity_Vertical | 10 | deg |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | A10, A10_FI, A10_MO | - |

### 주석 및 출처 (Notes & Sources)

**Cardioid_Capability=No(확정적 비존재)**: A10i_OM_EN_5.0.pdf/A10i_AE_EN.docx 전량을 "cardioid" 키워드로 스캔 — A10i Focus 자신에 대한 언급 0건, 검출된 언급은 전부 컴패니언 서브우퍼(SB18 IIi/KS21i 등)의 반전 배치 프리셋·전용 액세서리(KS21i-SCREEN 등) 안내뿐.
**출처**: A10i_AE_EN.docx "Technical requirements"; A10i_OM_EN.pdf p.157 "A10i Focus specifications".
**[1] Max_SPL_Peak 앰프별 3단계**: A10(단일값 140dB)과 달리 A10i는 앰프 조건별 3개 값을 명시 — 전부 보존.
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

**출처**: A10i_AE_EN.docx "Technical requirements"; A10i_OM_EN.pdf p.21 "Connectors", p.157 "A10i Focus specifications".
**Peak_Power_Handling_10ms_Overall(신규 Key)**: d&b CCL8에서 신설된 범용 Key — RMS_Power_Handling_Overall은 실값을 보유하나 이번 일괄 동기화 라운드에서는 원본을 재조회하지 않아 미확인으로 유지.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 4-point terminal block with push-in connection + connector sealing plate with cable gland | - |
| Link_Connector | 1 x 4-point terminal block with push-in connection + connector sealing plate with cable gland | - |
| Terminal_Block_Pinout_1 | + / - (combined LF+HF signal, internally split by passive crossover) | - |
| Terminal_Block_Pinout_2 | Not linked | - |

### 주석 및 출처 (Notes & Sources)

**출처**: A10i_OM_EN.pdf p.21 "Connectors"("Internal pinout for L-Acoustics 2-way passive enclosures" — A10i Wide/Focus 공용 표).

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
| Inter_Enclosure_Angles_deg | 10 | deg |
| Handles | null | count |
| Weight_Net | 19 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: A10i_OM_EN.pdf p.157 "A10i Focus specifications".
**Handles 미확인 사유**: A10(2개 명시)와 달리 A10i 스펙 표에 핸들 개수 없음 — 설치용 제품이라 별도 손잡이가 없을 가능성이 있으나 확정적 서술 부재로 미확인.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 569 | mm |
| Height_mm | 350 | mm |
| Depth_mm | 339 | mm |
| Dimensions_Raw [1] | 569 / 350 / 339 / 366 / 294 / 367 | mm |
| Cabinet_Material | premium grade Baltic beech and birch plywood | - |
| Front_Material | coated steel grill, acoustically neutral 3D fabric | - |
| Rigging_Components_Material | null | - |
| Finish_Color | dark grey brown Pantone 426 C, pure white RAL 9010, custom RAL code on special order | - |
| IP_Rating | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: A10i_AE_EN.docx "Physical data" - "Dimensions (W, H, D): 569 mm, 350 mm, 339 mm"; A10i_OM_EN.pdf p.157 "A10i Focus dimensions"(치수 도면).
**[1] Dimensions_Raw**: 도면 6개 숫자 중 569/350/339는 AE와 일치, 나머지(366/294/367)는 부가 치수.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| A10i Focus line source (단독) | [A10] | 66 - 20000 | null | null |
| A10i Focus line source element (단일) | [A10_FI] | 66 - 20000 | null | null |
| A10i Focus with KS21i [1] | [A10] + [KS21_100] | 31 - 20000 | 1 A10i Focus : 1 KS21i | null |

### 주석 및 출처 (Notes & Sources)

**출처**: A10i_OM_EN.pdf p.51-53 "Loudspeaker configurations"("A10i Wide/Focus line source", "...line source with low-frequency element").
**[1] 배치 간격**: coupled(2:1) 최대 1.7m 또는 separated(1:1) 조건 — 대표 1:1 비율 채택.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| [A10] or [A10_FI] or [A10_MO] + [KS21_100] | 0 | KS21i = 0 | A10i Focus = + / KS21i = + |
| [A10] or [A10_FI] + [KS21_100_C] | 5.5 | KS21i = 0 | A10i Focus = + / KS21i = + |
| [A10] or [A10_FI] + [KS21_100_Cx] | 0 | KS21i = 0 | A10i Focus = + / KS21i = + |

### 주석 및 출처 (Notes & Sources)

**출처**: A10i_OM_EN.pdf p.53 "Pre-alignment delays". KS21i는 모든 조합에서 "+"로 일관.
**원문 라벨 정정**: 원문 표는 "A10 Wide/Focus"/"KS21"로 표기(i 접미사 누락, A10 매뉴얼에서 복사된 것으로 추정) — A10i Focus/KS21i로 정정 채택.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| vertical array | A10i-BUMP + rigging plates | 8 | 8 |
| vertical array | A10-Ui | 1 | 1 |
| vertical array | A10-Ui + A10i-ULINK II | 2 | 2 |
| vertical array with pullback | A10i-BUMP + rigging plates + A10i-RIGBAR | 12 | 12 |
| vertical array with pullback | A10i-RIGBAR x2 + rigging plates | 12 | 12 |
| stacked vertical array | Ai-FIXBRACKET + rigging plates | 4 | 4 |
| stacked vertical array with angle adjustment | A10i-TILTBRACKET + rigging plates | 4 | 4 |
| stacked on KS21i [1] | Ai-FIXBRACKET + rigging plates | 4 A10i Focus | 4 KS21i |
| stacked on KS21i, angle adjustment [1] | Ai-FIXBRACKET + A10i-TILT + rigging plates | 4 A10i Focus | 4 KS21i |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 4:1 | - |
| Max_Wind_Load | null | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: A10i_OM_EN.pdf p.49-50 "Mechanical safety". A10i-BUMP+rigging plates+A10i-RIGBAR 행은 원문 "A10i Wide: 8 / A10i Focus: 12 / A10i Wide/Focus: 12"에서 A10i Focus 값(12) 채택.
**[1] KS21i 스택 구성**: "4 KS21i / 4 A10i Wide/Focus" 원문 표기 — 제품 구분 없이 공통값(4/4)이라 Focus/Wide 동일 채택.
**Max_Wind_Load 미확인 사유**: 원문 전량 검색으로도 미발견.

## Null Report

**미확인(정보 부족)**: Model_Number, WEEE_Marking, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, LF_Nominal_Impedance, HF_Nominal_Impedance(단일 통합값만 존재), RMS_Power_Handling_LF/HF(단일 통합값만 존재), Peak_Power_Handling_10ms_Overall, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, Handles, Rigging_Components_Material, Max_Wind_Load, preset_guide_and_matching 섹션 내 Recommended_Ratio/Minimum_Line_Length 셀(5건) — 20건.
**비적용**: 없음 — 0건.

**총계**: null 20건 (미확인 20건 + 비적용 0건). 확정적 비존재(0/No)로 명시한 항목은 0건.

**[MR_v1.8 반영 메모]**: 이 파일은 `upload/A10i_Focus_v1.6.md`(별도 audio-spec-parsing 프로젝트 산출물)를 이 저장소의 raw-spec으로 이관한 것이다. `public/js/domains/speakers/data/la/a-series.data.js`의 A10i Focus 엔트리에 Cardioid_Capability/Preset Guide/Matching Ratio/Delay Defaults/Mechanical Safety를 신규 반영했다. 기존 필드는 대조 후 이상 없음.
