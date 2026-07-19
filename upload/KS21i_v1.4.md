# KS21i (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(KS21의 install 파생형)

**스켈레톤 근거**: `speakers/LA/KS21_v1.0.md`를 뼈대로 사용 — KS21i는 KS21과 동일 아키텍처(단일 21" LF, 패시브, 이중 프리셋)이나 커넥터가 speakON이 아닌 **4-point terminal block**(push-in)이며 앰프 호환성이 LA4X/LA8/LA12X가 아닌 **LA2Xi/LA4X/LA7.16i/LA12X**로 상이하다(LA8 없음, LA2Xi/LA7.16i 추가).

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | KS21i | - |
| Model_Number | null | - |
| Product_Series | null | - |
| Product_Category | high power compact subwoofer (installation version) | - |
| Product_Type | Subwoofer | - |
| Description | High power compact subwoofer (installation version): 1 x 21" neodymium cone driver, amplified by LA2Xi / LA4X / LA7.16i / LA12X | - |
| Way_Count | 1 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | 2006/42/EC Machinery Directive (rigging system, designed per BGV-C1 guidelines) | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: KS21i_AE_EN.docx; KS21i_OM_EN.pdf(KS21i owner's manual EN version 4.0) p.71 "KS21i specifications".
**Product_Series/Product_Type(신규 Key, 사용자 지시 2026-07-17)**: KS21i_AE_EN.docx 최상단 헤더("KS21i - Subwoofer" / "Install specific 21' Subwoofer") — KS21과 동일하게 서브우퍼 계열은 시리즈명 줄이 없고 세부 스펙 서술이 그 자리에 옴, Product_Type="Subwoofer" 채택, Product_Series는 null(짐작 금지).

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | [KS21_60]: 29 - 83 / [KS21_100]: 31 - 100 | Hz |
| Frequency_Response_6dB_Hz | [KS21_60]: 32 - 71 / [KS21_100]: 35 - 87 | Hz |
| Frequency_Response_3dB_Hz | [KS21_60]: 35 - 60 / [KS21_100]: 40 - 78 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak [1] | 138 dB(LA2Xi bridge/LA4X/LA7.16i/LA12X) / 131 dB(LA2Xi) | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | null | deg |
| Nominal_Directivity_Vertical | null | - |
| Cardioid_Capability | Array-based only (4대 어레이 중 1대 반전 배치 필요) | - |
| DSP_Preset_Name | KS21_60, KS21_100 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: KS21i_AE_EN.docx "Technical requirements"; KS21i_OM_EN.pdf p.71 "KS21i specifications".
**[1] Max_SPL_Peak 앰프별 2단계**: KS21(단일값 138dB)과 달리 KS21i는 앰프 조건별 2개 값 명시.
**Cardioid_Capability=Array-based only(KS21과 동일 유형)**: OM "KS21i in cardioid configuration"("Deployed in a cardioid configuration, a KS21i system produces a rear SPL rejection. The deployment consists of an array of four KS21i with one element turned towards the rear (reversed)") — 전용 프리셋 [KS21_60_C]/[KS21_60_Cx]/[KS21_100_C]/[KS21_100_Cx] 존재.
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 21" neodymium cone driver | - |
| LF_Acoustical_Load | bass-reflex, L-Vents | - |
| Passive_Crossover_Network | No | - |
| LF_Nominal_Impedance | 8 | Ohm |
| Nominal_Impedance_Overall | null | Ohm |
| RMS_Power_Handling_LF | 467 | W |
| RMS_Power_Handling_Overall | null | W |
| Peak_Power_Handling_10ms_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: KS21i_AE_EN.docx "Technical requirements"; KS21i_OM_EN.pdf p.71 "KS21i specifications".
**Passive_Crossover_Network=No**: KS21과 동일 사유.
**Peak_Power_Handling_10ms_Overall(신규 Key, 비적용)**: d&b CCL8에서 신설된 범용 Key — RMS_Power_Handling_Overall과 동일 사유(LF 단일 대역 통합 임피던스/파워로 보고되지 않는 구조)로 비적용.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 4-point terminal block with push-in connection | - |
| Link_Connector | 1 x 4-point terminal block with push-in connection | - |
| Terminal_Block_Pinout_1 | LF+ / LF- | - |
| Terminal_Block_Pinout_2 | Not linked | - |

### 주석 및 출처 (Notes & Sources)

**출처**: KS21i_OM_EN.pdf p.12 "Connectors"("Internal pinout for L-Acoustics subwoofers" — "Each set of terminal block connectors (+ and −) can be used interchangeably as IN or LINK connector").

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA2Xi, LA4X, LA7.16i, LA12X | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type | Active (1-way, subwoofer) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: KS21i_OM_EN.pdf "The KS21i subwoofer is driven by the LA2Xi / LA4X / LA7.16i / LA12X amplified controller".

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | external rigging kits; M6 inserts(rigging plates), M8 inserts(A15KS-Ui), 1 DIN580-compatible M8 insert(secondary safety) | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | null | count |
| Weight_Net | 46 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: KS21i_OM_EN.pdf p.71 "KS21i specifications"("Rigging and handling").
**Handles 미확인 사유**: KS21(4개 명시)과 달리 KS21i 스펙 표에 핸들 개수 없음.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 752 | mm |
| Height_mm | 569 | mm |
| Depth_mm | 602 | mm |
| Dimensions_Raw | null | mm |
| Cabinet_Material | premium grade Baltic beech and birch plywood | - |
| Front_Material | coated steel grill, acoustically neutral 3D fabric | - |
| Rigging_Components_Material | null | - |
| Finish_Color | dark grey brown Pantone 426 C, pure white RAL 9010, custom RAL code on special order | - |
| IP_Rating | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: KS21i_AE_EN.docx "Physical data" - "Dimensions (W, H, D): 752 mm, 569 mm, 602 mm".

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| KS21i standard configuration | [KS21_60] / [KS21_100] | 29-83 / 31-100 | null | null |

### 주석 및 출처 (Notes & Sources)

**출처**: KS21i_OM_EN.pdf "Loudspeaker configurations"(KS21과 동일 구조). A10i/A15i와의 조합 데이터는 각 라인소스 제품 파일에 이미 그 제품 관점으로 기록됨.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유(조사 완료 후 확정)**: KS21/KS28과 동일한 구조적 이유 — KS21i_OM_EN.pdf 자신도 "Refer to the Preset Guide to obtain the pre-alignment delay values"로 별도 공용 문서를 참조하도록 명시하며, KS21i는 모든 조합에서 2차 엘리먼트로만 등장해 KS21i 자신을 1차 엘리먼트로 하는 Primary_Element_Delay_ms 개념이 성립하지 않는다. 실제 값은 A10i/A15i 등 상대 제품 파일에 이미 기록됨.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| null | null | null | null |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 4:1 | - |
| Max_Wind_Load | null | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: KS21i_OM_EN.pdf "Mechanical safety"(2006/42/EC 준수 확인). 상세 표는 A10i/A15i 파일에 "KS21i" 관점 행으로 이미 일부 반영됨(예: A10i_Focus_v1.1.md의 "stacked on KS21i" 행) — KS21i 자신의 파일에서는 중복 기재를 피하고 null 유지.

## Null Report

**미확인(정보 부족)**: Model_Number, WEEE_Marking, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, Nominal_Directivity_Horizontal_deg, Nominal_Directivity_Vertical, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, Handles, Dimensions_Raw, Rigging_Components_Material, Max_Wind_Load, preset_guide_and_matching(Recommended_Ratio/Minimum_Line_Length), mechanical_safety(전 항목, A10i/A15i 파일에 중복 반영됨) — 16건.
**비적용**: Nominal_Impedance_Overall, RMS_Power_Handling_Overall, Peak_Power_Handling_10ms_Overall — 3건. (PA_COM_Pinout_*/SpeakON_Pinout_* 등 타 커넥터 고유 Key는 KS21i 자신의 Terminal_Block_Pinout_*으로 이미 표현되어 애초에 생성하지 않음, null 목록에서 제외. MF_Transducer/MF_Acoustical_Load/MF_Nominal_Impedance/RMS_Power_Handling_MF/HF_Transducer/HF_Acoustical_Load/HF_Nominal_Impedance/RMS_Power_Handling_HF는 v1.2부터 삭제됨.)

**총계**: null 19건 (미확인 16건 + 비적용 3건). 확정적 비존재(0/No)로 명시한 항목은 1건 — Passive_Crossover_Network(No).

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — speakers 카테고리(KS21의 install 파생형). KS21_v1.0.md를 스켈레톤으로 사용, KS21i_AE_EN.docx + KS21i_OM_EN.pdf 통합. 커넥터(terminal block), 앰프 호환성(LA2Xi/LA7.16i 추가, LA8 없음), 앰프별 2단계 Max SPL 확인. delay_defaults/mechanical_safety는 KS21과 동일한 구조적 이유(2차 엘리먼트 전용, Preset Guide 참조)로 null 유지 — 실값은 A10i/A15i 파일에 이미 그 제품 관점으로 기록됨. |
| v1.1 | delay_defaults 표의 컬럼명 `K1_Delay_ms`를 `Primary_Element_Delay_ms`로 전면 개명(SKILL v1.18) — 값 변경 없음(사용자 지적 2026-07-17). |
| v1.2 | MF_Transducer/MF_Acoustical_Load/MF_Nominal_Impedance/RMS_Power_Handling_MF/HF_Transducer/HF_Acoustical_Load/HF_Nominal_Impedance/RMS_Power_Handling_HF 8개 Key 삭제(SKILL v1.19) — 이 제품은 LF 전용 서브우퍼 구조라 MF/HF 대역 드라이버 자체가 없으므로, null 동기화 대상이 아니라 삭제 대상으로 재분류(K1 v1.4의 기존 반대 판단을 뒤집는 정책 변경, GSL의 Front_LF_Transducer와 동일 원칙 적용). |
| v1.3 | Product_Series/Product_Type Key 신규 추가(사용자 지시 2026-07-17) — KS21i_AE_EN.docx 헤더 기반으로 Product_Type=Subwoofer 채택, Product_Series는 시리즈명 부재로 null. 신규 Key Cardioid_Capability=Array-based only 추가(OM "KS21i in cardioid configuration" — KS21과 동일 유형, 4대 어레이 중 1대 반전 배치로 성립, 전용 프리셋 [KS21_60_C] 등 존재). signal_processing 섹션(CUT_Mode_Available/HFC_Function_Settings/Coupling_Function_Range) 삭제 — d&b 고유 개념이 K1 계열 관례를 따라 L-Acoustics 파일에 null placeholder로 잘못 추가되어 있던 것을 프로젝트 전역 동기화 라운드에서 제거. Null Report 총계 20건(미확인 15+비적용 5)→17건(미확인 15+비적용 2). |
| v1.4 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-18, d&b 대량 배치 완료 후) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래, 미확인), `Peak_Power_Handling_10ms_Overall`(d&b CCL8 유래, 비적용 — RMS_Power_Handling_Overall과 동일 사유) 반영. Null Report 19건(미확인 16건+비적용 3건)으로 갱신. |
