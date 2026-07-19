# Kara II (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1 (동일 브랜드 이기종, K3 대비)

**스켈레톤 근거**: `speakers/LA/K3_v1.0.md`를 뼈대로 사용 — Kara II도 2-way, speakON 커넥터 아키텍처로 K3와 가장 유사(Kara_II 자신의 OM "Connectors" 절, docx "2-way active enclosure" 확인). K3보다 소형(8" LF, 3" HF vs K3의 12"/4")이며 LA8 호환은 없음(LA4X/LA12X만).

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | Kara II | - |
| Model_Number | null | - |
| Product_Series | K Series | - |
| Product_Category | long throw line source | - |
| Product_Type | Variable Curvature Line Source | - |
| Description | 2-way active enclosure with two weather-resistant premium 8 in transducers and high-output 3 in diaphragm compression driver, user-adjustable horizontal directivity | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | 2006/42/EC Machinery Directive (rigging system, designed per BGV-C1 guidelines) | - |
| WEEE_Marking | Yes (EU) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Kara_II_AE_EN.docx; Kara_II_OM_EN_5.0.pdf(Kara II owner's manual EN version 5.0) p.6("Safety > Instructions", WEEE 마킹 문구 K1/K3와 동일 확인).
**Product_Series/Product_Type(신규 Key, 사용자 지시 2026-07-17, 2026-07-18 재정의)**: Kara_II_AE_EN.docx 최상단 헤더("Kara II - Long throw line source" / "K Series" / "Incremental coverage with **variable** inter-element angles"). Product_Type은 "variable inter-element angles"를 근거로 "Variable Curvature Line Source"로 재정의(사용자 지적 2026-07-18, 상세 근거는 K1_v1.10.md 참조).

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | 55 - 20000 | Hz |
| Frequency_Response_6dB_Hz | 63 - 20000 | Hz |
| Frequency_Response_3dB_Hz | 80 - 19000 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak | 142 | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| Max_SPL_Single_Module | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | 70/110 symmetric or 90 asymmetric (35/90) | deg |
| Nominal_Directivity_Vertical | dependent upon the number of elements and the line source curvature | - |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | KARA II 70, KARA II 90, KARA II 110 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Kara_II_AE_EN.docx "Technical requirements".
**DSP_Preset_Name**: amplification-reference-tb-en.pdf(v16.0)의 "Enclosure maximum SPL per amplified controller" 표에서 "[KARA II 70]" 프리셋명 확인(교차검증) — 137dB(LA4X)/142dB(LA12X)로 앰프별 SPL 값이 다름을 참고.
**Cardioid_Capability=No(확정적 비존재)**: Kara_II_OM_EN_5.0.pdf/Kara_II_AE_EN.docx 전량을 "cardioid" 키워드로 스캔 — Kara II 자신에 대한 언급 0건, 검출된 언급은 전부 컴패니언 서브우퍼(SB18 등)의 일반 반전 배치 프리셋 안내뿐.
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 2 x 8" cone drivers | - |
| HF_Transducer | 3" diaphragm compression driver | - |
| LF_Acoustical_Load | bass-reflex | - |
| HF_Acoustical_Load | null | - |
| Passive_Crossover_Network | No | - |
| LF_Nominal_Impedance | 8 | Ohm |
| Nominal_Impedance_Overall | null | Ohm |
| HF_Nominal_Impedance | 8 | Ohm |
| RMS_Power_Handling_LF | 280 | W |
| RMS_Power_Handling_HF | 75 | W |
| RMS_Power_Handling_Overall | null | W |
| Peak_Power_Handling_10ms_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: Kara_II_AE_EN.docx "Technical requirements".
**Passive_Crossover_Network=No**: Kara_II_OM_EN_5.0.pdf 전문을 "crossover" 키워드로 전량 스캔 — 0건 검출. 확정적 비존재.
**Peak_Power_Handling_10ms_Overall(신규 Key)**: d&b CCL8에서 신설된 범용 Key — RMS_Power_Handling_Overall과 동일 사유로 비적용.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 2 x 4-point speakON (IN/LINK interchangeable) | - |
| Link_Connector | 2 x 4-point speakON (IN/LINK interchangeable) | - |
| SpeakON_Pinout_1 | LF+ / LF- | - |
| SpeakON_Pinout_2 | HF+ / HF- | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Kara_II_OM_EN_5.0.pdf p.459 "Connectors"; Kara_II_AE_EN.docx "Connectors: 2 x 4-point speakON"(교차검증 일치).

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA4X, LA12X | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type | Active (2-way) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Kara_II_OM_EN_5.0.pdf "The Kara II enclosure is driven by the LA4X / LA12X amplified controllers."(복수 위치에서 반복 확인, LA8 언급 없음 — K3와 달리 LA8 비호환으로 판단).

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | 4-point captive rigging system | - |
| Inter_Enclosure_Angles_deg | 0, 1, 2, 3, 4, 5, 7.5, 10 | deg |
| Handles | 4 | count |
| Weight_Net | 26 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: Kara_II_AE_EN.docx "Description"("four ergonomic handles"), "Weight (net): 26 kg"; Kara_II_OM_EN_5.0.pdf p.166 "Kara II specifications"("Rigging and handling — inter-enclosure angles: 0°, 1°, 2°, 3°, 4°, 5°, 7.5° or 10°").
**Inter_Enclosure_Angles_deg**: K3(0.25°~10°, 8단)와 유사하나 최솟값이 0.25°가 아닌 0°로 시작 — 원문 그대로 채택(임의 통일하지 않음).

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 730 | mm |
| Height_mm | 250 | mm |
| Depth_mm | 383 | mm |
| Dimensions_Raw | null | mm |
| Cabinet_Material | premium grade Baltic birch plywood | - |
| Front_Material | coated steel grill, acoustically transparent fabric | - |
| Rigging_Components_Material | null | - |
| Finish_Color | dark grey brown Pantone 426 C | - |
| IP_Rating | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Kara_II_AE_EN.docx "Physical data".

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| Kara II line source (단독) | [KARA II 70] / [KARA II 90] / [KARA II 110] | 55 - 20000 | - | - |
| Coupled SB18 or KS21 | [KARA II 70/90/110] + [xxxx_100] | 32 (SB18) / 31 (KS21) - 20000 | 3 Kara II : 1 SB18 or KS21 | 9 Kara II + 3 SB18 |
| Separated SB18 or KS21 | [KARA II 70/90/110] + [xxxx_60] | 32 (SB18) / 29 (KS21) - 20000 | 3 Kara II : 2 SB18 or KS21 | - |
| Coupled SB18 or KS21 with KS28 | [KARA II 70/90/110] + [xxxx_100] + [KS28_60] | 25 - 20000 | 3 Kara II : 1 SB18 or KS21 : 1 KS28 | 9 Kara II + 3 SB18 |
| Line source element (단독) | [KARA II_FI] | 85 - 20000 | - | - |
| Line source element with LF element | [KARA II_FI] + [xxxx_100] | 32 (SB18) / 31 (KS21) - 20000 | - | - |
| Stage monitor | [KARA II_MO] | 55 - 20000 | - | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Kara_II_OM_EN_5.0.pdf p.32-40 "Loudspeaker configurations" 전체(Line source / Line source with low-frequency element(Coupled/Separated/Coupled with KS28) / Line source element / Line source element with low-frequency element / Stage monitor) 전량 조사(이전 버전의 "시간 제약상 미확보" 방치를 시정, SKILL v1.17).
**KS21 비고**: 각주에 "KS21 cannot be mechanically coupled with a Kara II line source in an array — KS21과 Kara II 어레이는 각각 독립적으로 플라잉해야 함" 명시.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| [KARA II] + [SB18_100] | 0 | SB18 = 0 | Kara II = + / SB18 = + |
| [KARA II] + [SB18_100_C] | 5.5 | SB18 = 0 | Kara II = + / SB18 = + |
| [KARA II] + [SB18_100_Cx] | 4 | SB18 = 0 | Kara II = + / SB18 = − |
| [KARA II] + [KS21_100] | 0 | KS21 = 0.5 | Kara II = + / KS21 = + |
| [KARA II] + [KS21_100_C] | 5 | KS21 = 0 | Kara II = + / KS21 = + |
| [KARA II] + [KS21_100_Cx] | 4 | KS21 = 0 | Kara II = + / KS21 = − |
| [KARA II] + [SB18_60] | 2.5 | SB18 = 0 | Kara II = + / SB18 = + |
| [KARA II] + [SB18_60_C] | 8 | SB18 = 0 | Kara II = + / SB18 = + |
| [KARA II] + [SB18_60_Cx] | 6.5 | SB18 = 0 | Kara II = + / SB18 = − |
| [KARA II] + [KS21_60] | 0.5 | KS21 = 0 | Kara II = + / KS21 = + |
| [KARA II] + [KS21_60_C] | 6 | KS21 = 0 | Kara II = + / KS21 = + |
| [KARA II] + [KS21_60_Cx] | 5.5 | KS21 = 0 | Kara II = + / KS21 = − |
| [KARA II] + [SB18_100] + [KS28_60] | 0 | SB18 = 0 / KS28 = 5.5 | Kara II = + / SB18 = + / KS28 = − |
| [KARA II] + [SB18_100] + [KS28_60_C] | 0 | SB18 = 0 / KS28 = 0 | Kara II = + / SB18 = + / KS28 = − |
| [KARA II] + [SB18_100] + [KS28_60_Cx] | 5.5 | SB18 = 5.5 / KS28 = 0 | Kara II = + / SB18 = + / KS28 = + |
| [KARA II] + [KS21_100] + [KS28_60] | 0 | KS21 = 0 / KS28 = 5.5 | Kara II = + / KS21 = + / KS28 = − |
| [KARA II] + [KS21_100] + [KS28_60_C] | 0 | KS21 = 0.5 / KS28 = 0 | Kara II = + / KS21 = + / KS28 = − |
| [KARA II] + [KS21_100] + [KS28_60_Cx] | 5.5 | KS21 = 6 / KS28 = 0 | Kara II = + / KS21 = + / KS28 = + |
| [KARA_II_FI] + [SB18_100] | 3 | SB18 = 0 | Kara II = + / SB18 = + |
| [KARA_II_FI] + [SB18_100_C] | 8.5 | SB18 = 0 | Kara II = + / SB18 = + |
| [KARA_II_FI] + [SB18_100_Cx] | 7 | SB18 = 0 | Kara II = + / SB18 = − |
| [KARA_II_FI] + [KS21_100] | 0 | KS21 = 2.5 | Kara II = + / KS21 = − |
| [KARA_II_FI] + [KS21_100_C] | 3 | KS21 = 0 | Kara II = + / KS21 = − |
| [KARA_II_FI] + [KS21_100_Cx] | 2 | KS21 = 0 | Kara II = + / KS21 = + |

### 주석 및 출처 (Notes & Sources)

**출처**: Kara_II_OM_EN_5.0.pdf p.35(Coupled SB18/KS21), p.36(Separated SB18/KS21), p.38(Coupled with KS28), p.40(KARA_II_FI 조합) "Pre-alignment delays" 표 전체 24개 조합 — 딜레이 수치는 텍스트로 확인, Polarity는 4개 페이지 전부 PowerShell+Windows.Data.Pdf로 이미지 렌더링해 회색 "+"/빨간 "-" 아이콘을 전부 육안 확인(이전 "시간 제약상 미확보" 방치를 시정, SKILL v1.17).
**K1/K2/K3와 다른 폴라리티 패턴**: K1/K2/K3 계열은 서브우퍼가 기본적으로 반전(-)인 경우가 많았으나, Kara II는 정반대로 **표준 조합(비-Cx)에서는 서브우퍼가 대부분 정상(+)이고, Cx(카디오이드 반전) 조합에서만 반전(-)** 되는 경향을 보인다 — 단, KS28을 포함한 3중 조합의 Cx 케이스는 KS28이 오히려 +로 뒤집히는 등 단순 규칙으로 일반화되지 않아 24개 조합 전부를 개별 확인해 그대로 기록했다.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| flown | M-BUMP + M-BAR (optional) | 16 | 24 |
| flown | KARA-MINIBU | 6 | 6 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 4:1 | - |
| Max_Wind_Load | 6 | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: Kara_II_OM_EN_5.0.pdf "Mechanical safety > Flown configurations"; Safety 섹션(Max_Wind_Load, "6 bft").
**KARA-MINIBU 행**: 원문에 "maximum/safe limit" 단일 값(6)만 표기되어 두 열 모두 6으로 채택(K1의 KARA-DOWNK1과 유사한 표 구조).
**범위 제한**: pullback 구성, SB18/Kara II 혼합 어레이 등 추가 구성이 있으나 기본 플라잉 구성만 채택.

## Null Report

**미확인(정보 부족)**: Model_Number, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, HF_Acoustical_Load, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, Rigging_Components_Material, Dimensions_Raw(상위 호환) — 10건.
**비적용**: Nominal_Impedance_Overall/RMS_Power_Handling_Overall/Max_SPL_Single_Module(Kiva II/L2 투입으로 신설된 범용 Key — 단일 채널 패시브 아키텍처나 멀티모듈 구조에 적용되는 개념이며, Kara II는 대역별 개별 임피던스·파워핸들링을 갖는 능동 구동 단일 모듈 구조라 해당 없음), Peak_Power_Handling_10ms_Overall(RMS_Power_Handling_Overall과 동일 사유) — 4건. (PA_COM_Pinout_*/Terminal_Block_Pinout_* 등 타 커넥터 고유 Key는 Kara II 자신의 SpeakON_Pinout_*으로 이미 표현되어 애초에 생성하지 않음, null 목록에서 제외.)

**총계**: null 14건 (미확인 10건 + 비적용 4건). 확정적 비존재(0/No)로 명시한 항목은 1건 — Passive_Crossover_Network(No). **v1.8 정정(2026-07-18, 각주 버전 참조 최신성 감사에서 발견 — K1_v1.11.md와 동일 유형)**: 이전까지 이 총계 줄이 "Kiva II/L2 투입 이전 기준"에 머물러 있었고, 그로 인해 추가된 3건이 비적용 목록에 정식 반영되지 않은 채 각주 서술로만 존재해왔다 — 이번에 목록과 총계 모두 실제 상태(12건)로 정정했다. LC_Transducer/LC_Acoustical_Load/LC_Nominal_Impedance는 한때 동기화되어 있었으나 LC가 L2 라인 고유 설계 요소라는 사용자 지적(2026-07-17)에 따라 v1.4에서 삭제(SKILL v1.16). **v1.5에서 WEEE_Marking/Inter_Enclosure_Angles_deg/preset_guide_and_matching/delay_defaults가 실값으로 채워지며 이전 미확인 목록에서 5개 항목 빠짐** — 이전 "시간 제약상" 사유는 SKILL v1.17 위반으로 판정되어 원본 재조사로 해소했다.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — speakers 카테고리 Phase 3-1(L-Acoustics 동일 브랜드, K3와 유사 아키텍처). K3_v1.0.md를 스켈레톤으로 사용, Kara_II_AE_EN.docx + Kara_II_OM_EN_5.0.pdf 통합. K3보다 소형(8"/3" 드라이버), LA8 비호환(LA4X/LA12X만) 확인. |
| v1.1 | Kiva II/L2(신규 제품) 투입으로 신설된 6개 Key(LC_Transducer, LC_Acoustical_Load, LC_Nominal_Impedance, Nominal_Impedance_Overall, RMS_Power_Handling_Overall, Max_SPL_Single_Module)를 이 제품에 비적용 null로 동기화 반영. |
| v1.4 | LC_Transducer/LC_Acoustical_Load/LC_Nominal_Impedance 삭제(사용자 피드백 2026-07-17) — LC는 L2 라인 고유의 물리적 설계 요소이지 업계 표준 대역 구분이 아니므로 v1.1의 범용 동기화 판단을 정정(SKILL v1.16). |

**참고(커넥터 핀아웃 Null Report 정확도)**: 위 총계는 이 파일이 처음 작성된 시점 기준이며, 이후 타 커넥터 모델 고유 Key(PA_COM_Pinout_*/SpeakON_Pinout_*/Terminal_Block_Pinout_* 중 이 제품 자신의 실제 커넥터가 아닌 것들)를 전부 삭제하는 후속 정리가 있었다(2026-07-17) — 삭제된 Key는 null 목록에도 더 이상 포함되지 않는다. 정확한 현재 Key 구성은 각 섹션 표를 직접 참조할 것.
| v1.2 | K3의 PA-COM/터미널 블록 커넥터 Key 삭제(사용자 피드백 2026-07-17) — 제품 자신의 실제 커넥터가 아닌 타 커넥터 모델(PA-COM/speakON/terminal block 등) 고유 핀아웃 Key를 null 목록에서도 완전히 제거. 이 제품의 실제 커넥터 핀아웃은 아래 표기된 자기 자신의 Key만으로 온전히 표현됨. |
| v1.3 | Null Report 산술 오류 정정 — 비적용 항목이 실제로는 7개(CUT_Mode_Available, HFC_Function_Settings, Coupling_Function_Range, MF_Transducer, MF_Acoustical_Load, MF_Nominal_Impedance, RMS_Power_Handling_MF)임에도 목록 자체 표기가 "8건", 총계 줄이 "11건"으로 서로 다르게 오기재되어 있던 것을 발견(2026-07-17 전수 감사)하고 7건으로 통일, 총계를 20건(13+7)으로 재계산. 데이터 자체(어느 Key가 null인지)는 변경 없음, 요약 산술만 정정. |
| v1.5 | "시간 제약상" 방치되어 있던 WEEE_Marking/Inter_Enclosure_Angles_deg/preset_guide_and_matching/delay_defaults를 전면 재조사(SKILL v1.17 위반 시정) — WEEE_Marking은 OM p.6에서 K1/K3와 동일 문구 확인. Inter_Enclosure_Angles_deg는 OM p.166에서 "0°~10° 8단"(K3와 유사하나 최솟값 0°) 확인. preset_guide_and_matching은 OM p.32-40 전체를 조사해 7개 구성(단독 라인소스/Coupled/Separated/Coupled+KS28/엘리먼트 단독/엘리먼트+LF/스테이지 모니터) 확보. delay_defaults는 OM p.35/36/38/40 4개 페이지의 24개 조합 전부 확보, 폴라리티는 페이지 이미지 렌더링으로 확인 — K1/K2/K3와 달리 표준 조합에서는 서브우퍼가 대체로 정상(+), Cx 조합에서만 반전(-)되는 정반대 경향을 발견하고 그대로 기록(단순 규칙화하지 않고 24개 전부 개별 확인). delay_defaults 컬럼명 `K1_Delay_ms`를 `Primary_Element_Delay_ms`로 개명(SKILL v1.18). |
| v1.6 | MF_Transducer/MF_Acoustical_Load/MF_Nominal_Impedance/RMS_Power_Handling_MF 4개 Key 삭제(SKILL v1.19) — 이 제품은 확인된 2-way 구조라 MF 대역 드라이버 자체가 없으므로, null 동기화 대상이 아니라 삭제 대상으로 재분류(K1 v1.4의 기존 반대 판단을 뒤집는 정책 변경, GSL의 Front_LF_Transducer와 동일 원칙 적용). 검증 과정에서 v1.5부터 이어진 미확인 목록 산술 오류(실제 항목 9개인데 "8건"으로 표기)를 추가 발견해 정정(미확인 9건, 총계 12건). |
| v1.7 | Product_Series("K Series")/Product_Type 2개 Key 신규 반영(사용자 지시 2026-07-17, Kara_II_AE_EN.docx 헤더 근거, Product_Type은 "Variable Curvature Line Source"로 재정의 — 근거는 K1_v1.10.md 참조). Cardioid_Capability=No 확정 반영 — Kara_II_OM_EN_5.0.pdf/Kara_II_AE_EN.docx 전량을 "cardioid" 키워드로 스캔, Kara II 자신에 대한 언급 0건(컴패니언 서브우퍼 SB18 등의 일반 반전 배치 프리셋 안내뿐). signal_processing 섹션(CUT_Mode_Available/HFC_Function_Settings/Coupling_Function_Range) 전체 삭제 — d&b 고유 개념 정리. 비적용 null 3건 -> 0건, 총계 12건 -> 9건으로 재계산. |
| v1.7 to v1.8 | (표기 정정, Minor) 각주 버전 참조 최신성 감사(2026-07-18)에서 Null Report 총계가 "Kiva II/L2 투입 이전 기준"에 머물러 있었고, Kiva II/L2 투입으로 추가된 3건(Nominal_Impedance_Overall/RMS_Power_Handling_Overall/Max_SPL_Single_Module)이 비적용 목록에 정식 반영되지 않은 채 각주 서술로만 존재해온 것을 발견(K1_v1.11.md와 동일 유형) — 비적용 목록에 3건을 정식 추가하고 총계를 9건에서 12건으로 정정했다. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다. |
| v1.10 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-18, d&b 대량 배치 완료 후) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래, 미확인), `Peak_Power_Handling_10ms_Overall`(d&b CCL8 유래, 비적용) 반영. Null Report 14건(미확인 10건+비적용 4건)으로 갱신. |
