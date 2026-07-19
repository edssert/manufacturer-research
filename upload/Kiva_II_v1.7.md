# Kiva II (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1 (동일 브랜드 이기종, Kara II 대비 — 단, 아키텍처 축 하나가 근본적으로 다름)

**스켈레톤 근거**: `speakers/LA/Kara_II_v1.0.md`를 뼈대로 사용하되, **핵심 아키텍처가 다르다** — Kiva II는 이 프로젝트에서 처음 등장한 **passive(패시브) 크로스오버** L-Acoustics 제품이다. K1/K2/K3/Kara II/Kara IIi는 모두 자체 OM 커넥터 표에 "Internal pinout for L-Acoustics 2-way **active** enclosures"로 명시된 반면, Kiva II는 "Internal pinout for L-Acoustics 2-way **passive** enclosures"로 명시되며, speakON 2개 채널 중 1개(1+/1-)만 LF+HF 신호를 함께 실어나르고 2번째 채널은 "Not linked"(LINK 전용, 신호 없음)이다 — 즉 앰프가 대역 분리 없이 1채널만 공급하고, 인클로저 내부의 패시브 크로스오버가 LF/HF로 나눈다. 이 때문에 Nominal impedance와 RMS power handling도 대역별이 아닌 단일 통합값으로 보고된다.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | Kiva II | - |
| Model_Number | null | - |
| Product_Series | K Series | - |
| Product_Category | long throw line source (colinear) | - |
| Product_Type | Variable Curvature Line Source | - |
| Description | 2-way passive enclosure with two weather-resistant premium 6.5 in transducers and high output 1.75 in diaphragm compression driver, 110 deg horizontal coverage | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | 2006/42/EC Machinery Directive (rigging system, designed per BGV-C1 guidelines) | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Kiva_II_AE_EN.docx; Kiva_II_OM_EN_3.0.pdf(Kiva II owner's manual EN version 3.0).
**Product_Series/Product_Type(신규 Key, 사용자 지시 2026-07-17, 2026-07-18 재정의)**: Kiva_II_AE_EN.docx 최상단 헤더("Kiva II - Long throw line source" / "K Series" / "Incremental coverage with **variable** inter-element angles") — Product_Category의 "(colinear)" 괄호 서술은 이 프로젝트의 자유 서술 보강이며, 제조사 원문 헤더 자체엔 "colinear"가 없어 Product_Type에 추가하지 않음. Product_Type은 "variable inter-element angles"를 근거로 "Variable Curvature Line Source"로 재정의(사용자 지적 2026-07-18, 상세 근거는 K1_v1.10.md 참조).
**Product_Category**: docx short description "2-way passive colinear source" — "colinear"(동일 수직축 정렬 방식) 표현은 K1/K2/K3/Kara 계열에는 없던 용어, Kiva II 고유 설계 개념으로 원문 그대로 채택.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | 70 - 20000 | Hz |
| Frequency_Response_6dB_Hz | 75 - 20000 | Hz |
| Frequency_Response_3dB_Hz | 84 - 20000 | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Max_SPL_Peak | 138 | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | 100 symmetrical | deg |
| Nominal_Directivity_Vertical | 15 (single), depending on the number of elements and array curvature | deg |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | KIVA II, KIVA II_FI | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Kiva_II_AE_EN.docx "Technical requirements"; Kiva_II_OM_EN_3.0.pdf p.23-29 "Loudspeaker configurations" 챕터 전량 조사(SKILL v1.17 위반 시정 — 이전 "시간 제약상 전량 확인은 못함" 방치를 원본 재조사로 해소).
**Nominal_Directivity_Horizontal_deg 표기 차이**: docx short description은 "100° horizontal waveguide directivity"라 하고 본문 Description은 "110 degrees of horizontal coverage"라 하며, Technical requirements의 Coverage 항목은 "Waveguide directivity: 100° symmetrical"이라 한다 — 100°(waveguide 고유값, Technical requirements 채택)와 110°(전체 coverage 서술값) 두 수치가 문서 내에서 다르게 등장하는 것으로 보이나, Technical requirements 섹션이 이 프로젝트의 구조화 데이터 채택 기준(스펙 표 우선)이므로 100°를 채택하고 110° 언급은 이 각주에 병기.
**DSP_Preset_Name**: OM p.23-29 "Loudspeaker configurations" 챕터에서 두 개의 Kiva II 자체 프리셋을 확인 — `[KIVA II]`(medium to long throw, line source 전체 구성에서 사용, p.23/25/26)와 `[KIVA II_FI]`(short throw, 최대 3대까지의 line source element 구성에서 사용, p.28/29). K3/Kara II처럼 지향각(70/90/110)별로 나뉜 프리셋 세트가 아니라 스로우 거리(long vs short) 기준의 2종 프리셋 체계로, 서브우퍼 프리셋(`[SB15_100]`, `[SB18_60]` 등)은 Kiva II 자신의 DSP_Preset_Name이 아니므로 제외.
**Cardioid_Capability=No(확정적 비존재)**: Kiva_II_OM_EN_3.0.pdf/Kiva_II_AE_EN.docx 전량을 "cardioid" 키워드로 스캔 — Kiva II 자신에 대한 언급 0건, 검출된 언급은 전부 컴패니언 서브우퍼의 일반 반전 배치 프리셋 안내뿐.
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 6.5" cone driver | - |
| HF_Transducer | 1.75" diaphragm compression driver | - |
| LF_Acoustical_Load | bass-reflex | - |
| HF_Acoustical_Load | null | - |
| Passive_Crossover_Network [1] | Yes | - |
| LF_Nominal_Impedance | null | Ohm |
| HF_Nominal_Impedance | null | Ohm |
| Nominal_Impedance_Overall [2] | 16 | Ohm |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_HF | null | W |
| RMS_Power_Handling_Overall [2] | 186 | W |
| Peak_Power_Handling_10ms_Overall [3] | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: Kiva_II_AE_EN.docx "Technical requirements"; Kiva_II_OM_EN_3.0.pdf p.12 "Connectors"("Internal pinout for L-Acoustics 2-way passive enclosures").
**[1] Passive_Crossover_Network=Yes**: OM 커넥터 표가 "2-way passive enclosures"로 명시하고, speakON 2채널 중 1채널(1+/1-)만 신호를 나르며 2채널은 "Not linked"(연결 없음, LINK 전용) — 앰프는 대역 분리 없이 단일 채널만 공급하고 인클로저 내부에서 패시브 크로스오버가 LF/HF로 분리하는 구조로 확인. K1/K2/K3/Kara II(모두 "active enclosures" 표기 + LF/HF 별도 채널)와 명확히 대조.
**[2] Nominal_Impedance_Overall/RMS_Power_Handling_Overall(신규 Key)**: Kiva II는 단일 채널로 LF+HF를 함께 구동하므로 임피던스와 파워 핸들링이 대역별이 아닌 통합값 하나로만 보고된다(docx 원문: "Nominal impedance: 16 Ohm", "RMS power handling: 186 W" — LF/HF 구분 없음). 이는 K1 계열의 LF/MF/HF Key 구조로 표현할 수 없어 신규 Key를 만들었다 — 이 Key는 "단일 채널 패시브 크로스오버 아키텍처"라는 브랜드 무관 범용 개념(어느 브랜드든 이런 구조면 통합값으로 보고할 것)이므로 다른 제품 파일에도 null로 동기화 대상이다(GSL의 Front_LF류처럼 브랜드 고유 배선명이 아님).
**[3] Peak_Power_Handling_10ms_Overall(신규 Key)**: d&b CCL8에서 신설된 범용 Key(10ms 피크 파워 핸들링, 업계 표준 측정 조건) — 이 제품 자신의 RMS_Power_Handling_Overall은 실값을 보유하나 이번 일괄 동기화 라운드에서는 원본을 재조회하지 않고 소급 반영했으므로 미확인으로 유지(원본성 요건, LA12X 브릿징 Key 판단 사례와 동일 원칙).
**LF_Nominal_Impedance/MF/HF 및 RMS_Power_Handling_LF/MF/HF 비적용 사유**: Kiva II 자신은 대역별 값을 보고하지 않아(단일 통합값만 존재) 이 Key들은 비적용.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 2 x 4-point speakON (IN/LINK interchangeable, only 1 channel carries signal) | - |
| Link_Connector | 2 x 4-point speakON (IN/LINK interchangeable, only 1 channel carries signal) | - |
| SpeakON_Pinout_1 | + / - (combined LF+HF signal, internally split by passive crossover) | - |
| SpeakON_Pinout_2 | Not linked | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Kiva_II_OM_EN_3.0.pdf p.12 "Connectors"; Kiva_II_AE_EN.docx "Connectors: 2 x 4-point speakON"(교차검증 일치).
**SpeakON_Pinout_1 표기**: 원문 표는 대역 라벨 없이 단순 "+ / -"로만 표기(K1/K3의 "LF+/LF-" 같은 대역 라벨이 없음) — 패시브 크로스오버로 두 대역이 함께 실리므로 대역별 라벨을 붙일 수 없어 원문 그대로 보존.

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA2Xi, LA4X, LA8, LA12X | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type | Passive (2-way) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Kiva_II_OM_EN_3.0.pdf "Kiva II is driven by the LA2Xi / LA4X / LA8 / LA12X amplified controllers"(복수 위치 확인).
**Crossover_Type=Passive**: transducers 섹션의 Passive_Crossover_Network=Yes 판정과 정합.

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | 3-point captive rigging system (rigging arm + spring-loaded pin at back, two pairs of rigging axis at front) | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | 2 | count |
| Weight_Net | 14 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: Kiva_II_OM_EN_3.0.pdf p.13 "Rigging system description"; Kiva_II_AE_EN.docx "Description"("two handles"), "Weight (net): 14 kg".
**Rigging_System_Type**: K1/K2/K3/Kara II 모두 "4-point" 리깅인 반면 Kiva II는 "3-point"(3점) — 소형 제품 특성 반영, 원문 그대로 보존.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 525 | mm |
| Height_mm | 202 | mm |
| Depth_mm | 357 | mm |
| Dimensions_Raw | null | mm |
| Cabinet_Material | composite sandwich structure (moisture-resistant composite material) | - |
| Front_Material | composite grill, acoustically transparent fabric | - |
| Rigging_Components_Material | null | - |
| Finish_Color | dark grey brown Pantone 426 C, pure white RAL 9010, custom RAL code on special order | - |
| IP_Rating | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Kiva_II_AE_EN.docx "Physical data".
**Cabinet_Material**: K1~Kara IIi가 모두 "Baltic birch plywood"(자작나무 합판) 계열인 반면 Kiva II는 "composite"(복합소재) — 소형/경량 설계를 위한 재질 차이로 보이며, 원문 그대로 보존(임의로 통일하지 않음).

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| Kiva II line source (단독) | [KIVA II] | 70 - 20000 | - | - |
| Kiva II line source with SB15m | [KIVA II] + [SB15_100] | 40 - 20000 | 3 Kiva II : 1 SB15m / 2 Kiva II : 1 SB15m | 12 Kiva II + 4 SB15m |
| Kiva II line source with SB15m and SB18 | [KIVA II] + [SB15_100] + [SB18_60] | 32 - 20000 | 3 Kiva II : 1 SB15m : 1 SB18 / 2 Kiva II : 1 SB15m : 1 SB18 | 12 Kiva II + 4 SB15m |
| Kiva II line source element (단독, 최대 3대) | [KIVA II_FI] | 70 - 20000 | - | - |
| Kiva II line source element with SB15m [1] | [KIVA II_FI] + [SB15_100] | 40 - 70 | 3 Kiva II : 1 SB15m / 2 Kiva II : 1 SB15m | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Kiva_II_OM_EN_3.0.pdf p.23-29 "Loudspeaker configurations" 챕터 전체(Kiva II line source(단독) / with SB15m / with SB15m and SB18 / Kiva II line source element(단독) / element with SB15m) 전량 조사(이전 버전의 "시간 제약상 미확보" 방치를 시정, SKILL v1.17).
**Recommended_Ratio/Minimum_Line_Length**: OM 본문은 "Maximum line length: 12 Kiva II + 4 SB15m"(p.25, p.26) 형태로만 명시하며 별도의 "minimum" 수치는 원문에 없다 — 기존 K1~Kara II 파일들과 동일하게 이 컬럼에 원문의 최대 라인 길이 값을 그대로 기록(컬럼명과 원문 표기의 불일치는 기존 제품 파일들에서도 동일하게 존재하는 기존 관행이며 이번 수정 범위 밖). Line source element(엘리먼트) 구성에는 이 수치 자체가 원문에 없어 "-"로 표기.
**[1] Frequency_Range_10dB_Hz=40-70(Kiva II line source element with SB15m)**: OM p.29 표에 원문 그대로 "40 Hz - 70 Hz"로 명시되어 있다. 같은 SB15m 조합이라도 "line source"(전체 어레이) 구성(p.25)은 "40 Hz - 20 kHz"로 상한이 20 kHz인 반면, "line source element"(최대 3대, short throw) 구성은 상한이 70 Hz로 표기되어 있어 두 구성 간 표기가 대칭적이지 않다 — 원문을 임의로 "40 Hz - 20 kHz"로 정정하지 않고 그대로 채택.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| [KIVA II] + [SB15_100] | 0 | SB15m = 1 | Kiva II = + / SB15m = + |
| [KIVA II] + [SB15_100_C] | 2.5 | SB15m = 0 | Kiva II = + / SB15m = + |
| [KIVA II] + [SB15_100] + [SB18_60] | 0 | SB15m = 1 / SB18 = 1 | Kiva II = + / SB15m = + / SB18 = − |
| [KIVA II] + [SB15_100] + [SB18_60_C] | 4.5 | SB15m = 5.5 / SB18 = 0 | Kiva II = + / SB15m = + / SB18 = − |
| [KIVA II] + [SB15_100_C] + [SB18_60] | 2.5 | SB15m = 0 / SB18 = 3.5 | Kiva II = + / SB15m = + / SB18 = − |
| [KIVA II] + [SB15_100_C] + [SB18_60_C] | 4.5 | SB15m = 2 / SB18 = 0 | Kiva II = + / SB15m = + / SB18 = − |
| [KIVA II_FI] + [SB15_100] | 0 | SB15m = 1 | Kiva II = + / SB15m = + |
| [KIVA II_FI] + [SB15_100_C] | 2.5 | SB15m = 0 | Kiva II = + / SB15m = + |

### 주석 및 출처 (Notes & Sources)

**출처**: Kiva_II_OM_EN_3.0.pdf p.26(Pre-alignment delays, [KIVA II]+[SB15_100] 2개 조합), p.27(Pre-alignment delays, [KIVA II]+[SB15_100]+[SB18_60] 4개 조합), p.29(Pre-alignment delays, [KIVA II_FI]+[SB15_100] 2개 조합) — 딜레이 수치는 텍스트로 확인, Polarity는 3개 페이지 전부 PowerShell+Windows.Data.Pdf로 이미지 렌더링해 회색 "+"/빨간 "-" 아이콘을 전부 육안 확인(이전 "시간 제약상 미확보" 방치를 시정, SKILL v1.17).
**폴라리티 패턴**: Kiva II와 SB15m은 모든 조합에서 정상(+)이며, SB18은 3중 조합 4개 전부에서 반전(-)으로 확인 — Kara II(표준 조합은 서브우퍼 +, Cx 조합만 반전)와도, K1/K2/K3(서브우퍼 기본 반전 경향)와도 다른 자기 고유 패턴이므로 임의로 일반화하지 않고 8개 조합 전부를 개별 확인해 그대로 기록했다.
**컬럼명 K1_Delay_ms -> Primary_Element_Delay_ms**: 2026-07-17 프로젝트 전체 동기화(SKILL v1.18)에 따라 이 파일도 동일하게 개명 반영.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| flown | KIBU-SB | 8 | 20 |
| flown | KIBU II | 8 | 20 |
| ceiling-mounted | KIET II | null | 3 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 4:1 | - |
| Max_Wind_Load | 6 | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: Kiva_II_OM_EN_3.0.pdf "Mechanical safety > Flown configurations"; Safety 섹션(Max_Wind_Load, "6 bft").
**KIET II 행**: 원문에 상한(3)만 명시, safe limit 별도 없음 — null.

## Null Report

**미확인(정보 부족)**: Model_Number, WEEE_Marking, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Peak_Power_Handling_10ms_Overall, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, HF_Acoustical_Load, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, Inter_Enclosure_Angles_deg, Rigging_Components_Material, Dimensions_Raw(상위 호환), mechanical_safety(KIET II Safe_Limit) — 14건.
**비적용**: LF_Nominal_Impedance, HF_Nominal_Impedance(단일 통합값만 존재), RMS_Power_Handling_LF, RMS_Power_Handling_HF(단일 통합값만 존재) — 4건. (PA_COM_Pinout_*/Terminal_Block_Pinout_* 등 타 커넥터 고유 Key는 Kiva II 자신의 SpeakON_Pinout_*으로 이미 표현되어 애초에 생성하지 않음, null 목록에서 제외.)

**총계**: null 18건 (미확인 14건 + 비적용 4건). 확정적 비존재(0/No)로 명시한 항목은 0건 — Passive_Crossover_Network는 "Yes"로 실값 확보. **v1.6 정정(2026-07-18, 각주 버전 참조 최신성 감사에서 발견)**: 비적용 목록의 "RMS_Power_Handling_LF/HF"가 결합형 불릿으로 서술되며 실제로는 2개 별도 Key(RMS_Power_Handling_LF, RMS_Power_Handling_HF)인데 1건으로만 카운트되어 있던 것을 발견·정정(K1_v1.11.md 등 다른 파일에서도 반복된 유형) — 비적용 3건→4건, 총계 15건→16건. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다. **v1.3에서 DSP_Preset_Name/preset_guide_and_matching/delay_defaults가 실값으로 채워지며 이전 미확인 목록에서 3개 항목 빠짐** — 이전 "시간 제약상" 사유는 SKILL v1.17 위반으로 판정되어 원본 재조사(OM p.23-29 "Loudspeaker configurations" 챕터 전량, 폴라리티는 p.26/27/29 이미지 렌더링)로 해소했다.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — speakers 카테고리 Phase 3-1(L-Acoustics 동일 브랜드, Kara II를 스켈레톤으로 사용). **이 카테고리 내 최초의 패시브 크로스오버 제품** — K1~Kara IIi가 모두 "active enclosures"(대역별 독립 채널)인 반면 Kiva II는 "passive enclosures"(단일 채널 + 내부 패시브 크로스오버)로 확인, Passive_Crossover_Network=Yes(K1~Kara IIi는 전부 No였음). 신규 Key Nominal_Impedance_Overall/RMS_Power_Handling_Overall 도입 — 단일 채널 패시브 아키텍처라는 범용 개념이므로 타 제품 파일에도 null로 동기화 필요(다음 커밋에서 일괄 반영 예정). |

**참고(커넥터 핀아웃 Null Report 정확도)**: 위 총계는 이 파일이 처음 작성된 시점 기준이며, 이후 타 커넥터 모델 고유 Key(PA_COM_Pinout_*/SpeakON_Pinout_*/Terminal_Block_Pinout_* 중 이 제품 자신의 실제 커넥터가 아닌 것들)를 전부 삭제하는 후속 정리가 있었다(2026-07-17) — 삭제된 Key는 null 목록에도 더 이상 포함되지 않는다. 정확한 현재 Key 구성은 각 섹션 표를 직접 참조할 것.
| v1.1 | PA-COM/터미널 블록 커넥터 Key 삭제(사용자 피드백 2026-07-17) — 제품 자신의 실제 커넥터가 아닌 타 커넥터 모델(PA-COM/speakON/terminal block 등) 고유 핀아웃 Key를 null 목록에서도 완전히 제거. 이 제품의 실제 커넥터 핀아웃은 아래 표기된 자기 자신의 Key만으로 온전히 표현됨. |
| v1.2 | Null Report 산술 오류 정정 — 총계 줄의 비적용 수치("13건")가 비적용 목록 자체가 나열하는 실제 11개 Key와 불일치하던 것을 발견(2026-07-17 전수 감사)하고 11건으로 통일, 총계를 26건(15+11)으로 재계산. 데이터 자체(어느 Key가 null인지)는 변경 없음, 요약 산술만 정정. |
| v1.3 | SKILL v1.17 위반 시정(2026-07-17) — acoustical_performance의 DSP_Preset_Name과 preset_guide_and_matching/delay_defaults 전 섹션에 남아있던 "시간 제약상 전량 확인은 못함"/"시간 제약상 미확보" 문구(금지된 null 사유)를 원본 OM 재조사로 해소. Kiva_II_OM_EN_3.0.pdf p.23-29 "Loudspeaker configurations" 챕터를 전량 조사해 Kiva II 고유 프리셋 2종([KIVA II] long throw / [KIVA II_FI] short throw, p.23/25/26/28/29)과 5개 구성(단독 라인소스 / SB15m 결합 / SB15m+SB18 결합 / 엘리먼트 단독 / 엘리먼트+SB15m)의 Frequency_Range_10dB_Hz·Recommended_Ratio·Minimum_Line_Length를 확보했다. delay_defaults는 p.26(2개 조합)/p.27(4개 조합)/p.29(2개 조합) 총 8개 preset 조합의 딜레이 수치를 텍스트로, 폴라리티(+/-)는 PowerShell+Windows.Data.Pdf 이미지 렌더링으로 3개 페이지 전부 육안 확인 — Kiva II/SB15m은 전 조합 정상(+), SB18은 3중 조합 4개 전부 반전(-)인 Kiva II 고유 패턴을 확인했다. delay_defaults 컬럼명 `K1_Delay_ms`를 `Primary_Element_Delay_ms`로 개명(2026-07-17 전 파일 동기화, SKILL v1.18). preset_guide_and_matching 테이블에서 확인된 "line source element with SB15m" 구성의 Frequency_Range_10dB_Hz가 원문 그대로 "40 Hz - 70 Hz"(같은 SB15m 조합의 "line source"(전체 어레이) 구성은 "40 Hz - 20 kHz")로 두 구성 간 비대칭 표기임을 발견 — 임의 정정 없이 원문 그대로 채택하고 각주에 명기. Null Report 미확인 15건에서 3건(DSP_Preset_Name/preset_guide_and_matching/delay_defaults) 감소하여 총계 26건 -> 23건(미확인 12건 + 비적용 11건)으로 재계산. |
| v1.4 | MF_Transducer/MF_Acoustical_Load/MF_Nominal_Impedance/RMS_Power_Handling_MF 4개 Key 삭제(SKILL v1.19) — 이 제품은 확인된 2-way 구조라 MF 대역 드라이버 자체가 없으므로, null 동기화 대상이 아니라 삭제 대상으로 재분류. 비적용 목록 자체(9개 항목)와 이전 표기 "11건"이 이미 불일치했던 것도 함께 발견 — 실제 항목 수 기준으로 재계산해 비적용 9건→6건, 총계 21건→18건으로 정정(직전 v1.3의 "23건" 표기 자체도 오기재였음). |
| v1.5 | Product_Series("K Series")/Product_Type 2개 Key 신규 반영(사용자 지시 2026-07-17, Kiva_II_AE_EN.docx 헤더 근거 — Product_Category의 "(colinear)" 괄호 서술은 이 프로젝트의 자유 서술 보강이며 제조사 원문 헤더엔 없어 Product_Type에는 미반영. Product_Type은 "Variable Curvature Line Source"로 재정의, 근거는 K1_v1.10.md 참조). Cardioid_Capability=No 확정 반영 — Kiva_II_OM_EN_3.0.pdf/Kiva_II_AE_EN.docx 전량을 "cardioid" 키워드로 스캔, Kiva II 자신에 대한 언급 0건(컴패니언 서브우퍼의 일반 반전 배치 프리셋 안내뿐). signal_processing 섹션(CUT_Mode_Available/HFC_Function_Settings/Coupling_Function_Range) 전체 삭제 — d&b 고유 개념 정리(LF_Nominal_Impedance/HF_Nominal_Impedance/RMS_Power_Handling_LF/HF는 단일 통합값만 존재하는 비적용 항목으로 그대로 유지). 비적용 null 6건 -> 3건, 총계 18건 -> 15건으로 재계산. |
| v1.5 to v1.6 | (표기 정정, Minor) 각주 버전 참조 최신성 감사(2026-07-18)에서 비적용 목록의 "RMS_Power_Handling_LF/HF"가 결합형 불릿으로 서술되며 실제 2개 별도 Key가 1건으로만 카운트되어 있던 것을 발견·정정(K1_v1.11.md와 동일 유형). 비적용 3건→4건, 총계 15건→16건으로 재계산. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다. |
| v1.7 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-18, d&b 대량 배치 완료 후) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래, 미확인), `Peak_Power_Handling_10ms_Overall`(d&b CCL8 유래, 미확인 — RMS_Power_Handling_Overall은 실값 보유하나 원본 재조회 없이 소급 반영) 반영. Null Report 18건(미확인 14건+비적용 4건)으로 갱신. |
