# K1-SB (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 4 (K1/K2의 오랜 컴패니언 서브우퍼, 최초 독립 파일 투입)

**스켈레톤 근거**: `speakers/LA/KS28_v1.9.md`를 뼈대로 사용 — K1-SB는 KS28과 마찬가지로 LF 단일 대역(Way_Count=1) 패시브 서브우퍼이며, 모든 조합에서 항상 2차 엘리먼트(서브우퍼)로만 등장해 preset_guide_and_matching/delay_defaults가 자기 자신의 관점으로는 성립하지 않는 구조가 동일하다(상세는 해당 섹션 참조).

**원본 문서 특이사항 — 전용 OM 없음, K1 OM에 편입**: 사용자 확인(2026-07-19) — L-Acoustics 웹사이트에서 "K1-SB 오너 매뉴얼"을 다운로드하면 실제로는 `K1_OM_EN_4.0.pdf`(이미 `speakers/LA/Original_PDFs/K1/`에 보존됨)가 내려받힌다. 즉 K1-SB는 별도 OM을 발간하지 않고 K1 OM에 시스템 구성요소로 편입되어 있다. 실제로 K1 OM p.11 "System components > Loudspeaker enclosures"에 "K1-SB | K1 system subwoofer 2×15"" 항목으로 등재되어 있음을 확인(본 파일 작성 시 재확인). 다만 K1 OM은 K1-SB만을 위한 전용 스펙 표(KS28의 p.53 "KS28 specifications"에 해당하는 페이지)는 갖고 있지 않아, 이번 라운드는 신규 업로드된 K1-SB 전용 A&E 시방서(K1-SB_AE_EN.docx)와 스펙시트(K1-SB_SP_EN_2.0.pdf, v2.0)를 주 출처로 삼고, K1/K2 자신의 파일에 이미 K1-SB 관점으로 기록되어 있는 조합 데이터(preset/delay/polarity)를 교차 참조했다.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | K1-SB | - |
| Model_Number | null | - |
| Product_Series | K Series [1] | - |
| Product_Category | large format low-end extension | - |
| Product_Type | Subwoofer | - |
| Description | Flyable large format low-end extension, 2 x 15" high-excursion transducers in bass-reflex enclosure with laminar vents; passive, exclusively driven and amplified by the LA8 controller with dedicated CONTOUR/THROW factory presets; recommended subwoofer complement for K1 or K2 line sources | - |
| Way_Count | 1 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | null | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: K1-SB_AE_EN.docx(A&E 시방서, `speakers/LA/Original_PDFs/K1-SB/`); K1-SB_SP_EN_2.0.pdf(스펙시트 v2.0, 동일 폴더); K1_OM_EN_4.0.pdf p.11 "System components".
**[1] Product_Series="K Series"**: K1-SB_AE_EN.docx 문서 헤더 텍스트("K1-SB - Large format low-end extension K Series Low-end extension Deployment in vertical lines Omni configuration")에서 "K Series" 태그를 확인 — K1/K2/K3 등 K 시리즈 전 제품과 동일 계열 태그(K1_v1.10.md 판단 근거 참조). 헤더가 여러 태그가 구분자 없이 연이어 추출된 형태라 정확한 필드 경계는 불확실하나 "K Series" 자체는 명확히 식별됨.
**Product_Category**: A&E "Short description" 첫 구절("Large format low-end extension") 채택. K1-SB_SP_EN_2.0.pdf는 "FLYABLE HIGH POWER SUBWOOFER"라는 다른 태그라인을 쓰나(마케팅용 헤드라인 성격), Product_Category Key는 프로젝트 전역에서 A&E의 formal한 서술을 우선 채택하는 관례를 따름.
**Description — LA8 단독 구동 서술**: K1-SB_SP_EN_2.0.pdf "The K1-SB is exclusively driven and amplified by the LA8 controller... including dedicated factory presets for the CONTOUR and THROW configurations." K1-SB_AE_EN.docx는 "Exclusively driven and protected by a proprietary amplified controller through a dedicated preset"로 모델명을 특정하지 않고 서술 — 두 표현 모두 "전용 컨트롤러 단독 구동" 사실 자체는 일치하며 모델명(LA8)은 SP에만 명시.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz [1] | 30 - 80 | Hz |
| Frequency_Response_6dB_Hz | 35 - 70 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Frequency_Response_3dB_Hz | 38 - 61 | Hz |
| Max_SPL_Peak [2] | 145 | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | null | deg |
| Nominal_Directivity_Vertical | null | - |
| Cardioid_Capability [3] | No | - |
| DSP_Preset_Name [4] | K1SB_60 (CONTOUR); K1SB_X (THROW, with K1); K1SB_X K2 (THROW, with K2); K1SB_100_NC (noise control, behind configuration) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: K1-SB_AE_EN.docx "Technical requirements"; K1-SB_SP_EN_2.0.pdf 스펙 표; K1_v1.13.md/K2_v1.7.md의 preset_guide_and_matching·delay_defaults(프리셋명 교차 확인).
**[1] Usable_Bandwidth_Hz(-10dB)/Frequency_Response_6dB/3dB_Hz**: AE "Usable bandwidth: 30 Hz - 80 Hz (-10 dB), 35 Hz - 70 Hz (-6 dB), 38 Hz - 61 Hz (-3 dB)" 채택. SP는 하한만 "Low frequency limit (-10 dB) 30 Hz ([K1SB_60] preset)"로 제공하며 프리셋 조건부 값으로 명시(AE는 프리셋 조건을 명시하지 않는 일반 스펙) — 하한(30Hz)은 두 소스 일치, 상한/6dB/3dB는 AE만 제공.
**[2] Max_SPL_Peak 소스 간 충돌**: K1-SB_SP_EN_2.0.pdf "145 dB ([K1SB_X] preset)"(측정 조건: peak level at 1m half space, pink noise crest factor 4) vs K1-SB_AE_EN.docx "141 dB"(동일 측정 조건 서술, 프리셋 미명시) — 145dB(SP)를 대표값으로 채택(프리셋 조건까지 명시해 더 구체적), AE의 141dB는 병기 보존. 어느 쪽이 최신판인지 판단할 개정이력 정보가 양쪽 문서에 없어 우열을 가리지 않음.
**[3] Cardioid_Capability=No(확정적 비존재)**: K1-SB_AE_EN.docx/K1-SB_SP_EN_2.0.pdf 전량을 "cardioid" 키워드로 스캔 — 0건 검출. AE는 오히려 "Omni configuration"을 헤더 태그로 명시하고 "Enclosure directivity: omnidirectional"로 직접 확정 — KS28(4대 어레이 중 1대 역방향 배치로 array-based cardioid 가능)과 달리 K1-SB는 그런 배치 서술 자체가 없음.
**[4] DSP_Preset_Name — 복수 프리셋**: SP가 CONTOUR/THROW 2개 팩토리 프리셋 구성을 명시하고 프리셋명 [K1SB_60]/[K1SB_X]를 스펙 각주에서 확인. K1_v1.13.md/K2_v1.7.md의 preset_guide_and_matching 표에서 [K1SB_X]([K1] 편입/서브우퍼용, K1과 조합), [K1SB_X K2](K2와 조합 시 별도 프리셋명), [K1SB_60](서브우퍼/베사이드/비하인드 조합), [K1SB_100_NC](비하인드 노이즈 컨트롤 조합) 4개 프리셋명을 교차 확인 — K1-SB 단독 문서(AE/SP)에는 없는 정보를 K1/K2 자신의 파일에서 보강.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 2 x 15" neodymium, weather-resistant, direct-radiating, 4" coil, magnesium die-cast basket | - |
| LF_Acoustical_Load | bass-reflex, laminar vents | - |
| Passive_Crossover_Network | No | - |
| LF_Nominal_Impedance | 4 | Ohm |
| Nominal_Impedance_Overall | null | Ohm |
| RMS_Power_Handling_LF [1] | 1200 | W |
| RMS_Power_Handling_Overall | null | W |
| Peak_Power_Handling_10ms_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: K1-SB_SP_EN_2.0.pdf 스펙 표("Transducer", "Nominal impedance", "RMS power handling"); K1-SB_AE_EN.docx "Acoustics"/"Transducers".
**LF_Transducer**: SP "2 x 15", neodymium, weather-resistant, bass-reflex / 4" coil, magnesium die-cast basket" 채택(AE의 "2 x 15in cone drivers"보다 상세). AE는 "high-excursion, direct-radiating"이라는 추가 수식어를 제공해 병합 반영.
**[1] RMS_Power_Handling_LF 소스 간 충돌**: SP "1200 W"를 대표값으로 채택. AE는 "930 W (calculated using the mean impedance measured on the usable bandwidth)"로 계산 방법론까지 명시하며 다른 값을 제공 — AE가 산출 근거를 밝힌 유일한 소스이므로 이 방법론 자체는 신뢰할 만하나, 대표값 선정 기준(더 상세한 스펙시트 우선)에 따라 SP값을 채택하고 AE값과 산출 근거를 각주로 보존.
**Passive_Crossover_Network=No**: K1-SB_AE_EN.docx/K1-SB_SP_EN_2.0.pdf 전량을 "crossover" 키워드로 스캔 — 0건 검출(단일 대역 서브우퍼 구조와도 정합, KS28과 동일 판단).
**Nominal_Impedance_Overall=null**: KS28과 동일 사유 — 단일 대역(LF only) 제품이라 LF_Nominal_Impedance로 이미 온전히 표현됨, 중복 방지 차원에서 null.
**RMS_Power_Handling_Overall/Peak_Power_Handling_10ms_Overall=비적용**: KS28과 동일 사유(단일 대역이라 "통합" 개념 자체가 무의미).

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 4-point speakON | - |
| Link_Connector | null | - |
| SpeakON_Pinout_1 | null | - |
| SpeakON_Pinout_2 | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: K1-SB_SP_EN_2.0.pdf "Connectors: IN: 1 x 4-point SpeakON®"; K1-SB_AE_EN.docx "Connectors: IN: 1 x 4-point speakON".
**Link_Connector=null**: 두 소스 모두 IN 커넥터 하나만 명시, KS28과 동일 판단(비적용).
**SpeakON_Pinout_1/2=null(미확인)**: KS28은 자신의 OM p.11 "Internal pinout for L-Acoustics subwoofers" 표에서 핀 배정을 확보했으나, K1-SB 자신의 두 소스(AE/SP)에는 핀 단위 극성/신호 배정 서술이 없다. K1 OM에도 K1-SB 전용 핀아웃 표는 확인되지 않아(원본성 요건상 KS28 자신의 OM 표를 K1-SB에 유추 적용하지 않음), 미확인으로 보수적으로 유지.

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller [1] | LA8 | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type [2] | Passive (1-way, subwoofer) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: K1-SB_SP_EN_2.0.pdf "The K1-SB is exclusively driven and amplified by the LA8 controller."; K1_OM_EN_4.0.pdf p.11 "System components > Powering and driving system".
**[1] Compatible_Amplified_Controller="LA8" — K1 OM 시스템 구성요소 표와의 불일치**: K1-SB_SP_EN_2.0.pdf는 LA8 단독 구동을 명시적으로 확정하나, K1_OM_EN_4.0.pdf p.11 "Powering and driving system" 절에는 LA12X만 등재되어 있고 LA8은 언급되지 않는다(같은 페이지의 "Loudspeaker enclosures" 표에는 K1-SB가 등재되어 있음에도). 두 문서 중 어느 쪽이 최신인지 판단할 근거가 없어 SP의 명시적 서술(LA8)을 채택하되, 이 불일치를 그대로 기록한다 — LA8이 이 K1 OM 판(4.0)보다 이후에 출시된 전용 서브우퍼 컨트롤러일 가능성이 있으나 확정할 근거는 없다.
**[2] Crossover_Type="Passive"**: K1-SB_AE_EN.docx "Description: Passive large format low-end extension..."로 제품 스스로 "Passive"를 명시 — KS28 파일의 "Active (1-way, subwoofer)" 표기와 다른 용어이나, 이는 KS28 자신의 OM 서술 관행을 따른 것이고 K1-SB는 자신의 원본이 명시적으로 "Passive"라 표기해 그대로 채택했다(임의 통일하지 않음).

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type [1] | four-point flush-fitting hardware, integrated captive rigging system (K1-BUMP structure for flying/stacking) | - |
| Inter_Enclosure_Angles_deg | 0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5 | deg |
| Handles | 4 | count |
| Weight_Net | 83 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: K1-SB_AE_EN.docx "The enclosure integrates four ergonomic handles and a four-point flush-fitting hardware for rigging and combining with other loudspeakers of the same family."; K1-SB_SP_EN_2.0.pdf "Rigging components: Captive 4-point rigging system, Inter-enclosure angles: 0°, 0.5°, 1°, 1.5°, 2°, 2.5°, 3°, 4° or 5°"; K1_OM_EN_4.0.pdf p.11 "Rigging elements: K1-BUMP — Structure for flying and stacking K1 and K1-SB arrays".
**[1] Rigging_System_Type**: AE/SP 양쪽이 "4-point"/"flush-fitting" 구조임을 일치되게 서술. K1_OM_EN_4.0.pdf가 K1-SB 전용 리깅 구조물 K1-BUMP의 존재를 확정(K1과 K1-SB 공용 액세서리) — 세 소스를 종합해 병기.
**Inter_Enclosure_Angles_deg**: K1 자신과 완전히 동일한 각도 목록(K1_v1.13.md 참조) — SP에 명시적으로 재확인됨.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 1342 | mm |
| Height_mm [1] | 505 | mm |
| Depth_mm [1] | 434 | mm |
| Dimensions_Raw [1] | 1342 / 438 / 520 / 505 / 434 | mm |
| Cabinet_Material | premium grade Baltic birch plywood | - |
| Front_Material | steel grill with anti-corrosion coating, Airnet acoustically neutral fabric | - |
| Rigging_Components_Material | high strength steel with anti-corrosion coating | - |
| Finish_Color | dark grey brown Pantone 426 C | - |
| IP_Rating | IP45 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: K1-SB_SP_EN_2.0.pdf 스펙 표+치수 도면("W x H x D: 1342 x 505 x 434 mm"); K1-SB_AE_EN.docx "Physical data: Dimensions (W, H, D): 1342 mm, 438 mm, 520 mm".
**[1] Height_mm/Depth_mm 소스 간 충돌**: SP는 W×H×D=1342×505×434mm(스펙 표+도면 양쪽에서 재확인), AE는 W×H×D=1342×438×520mm로 W는 일치하나 H/D 두 값 모두 다르다. SP 도면에는 별도로 "520 mm/20.5 in" 치수가 명기된 별개의 평면도(캐비닛 뒷면/설치판 관련으로 추정)가 있어, AE의 "520mm"가 이 SP 도면의 부가 치수와 일치할 가능성이 있으나 AE 원문이 이를 Depth로 명시했는지 SP 도면의 그 치수가 정확히 무엇을 재는지 확정할 근거가 없어 임의로 대응시키지 않는다. Value는 SP의 스펙 표+정면 도면 값(505/434)을 채택, AE의 값(438/520)은 Dimensions_Raw에 원문 그대로 보존하고 각주로 충돌을 명시한다.
**IP_Rating**: 두 소스 모두 "IP45"로 일치.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| null | null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: KS28과 동일한 구조적 이유 — 이 표는 "1차 엘리먼트(라인소스 본체) 관점"의 구성/매칭비율을 담는데, K1-SB는 K1/K2와의 모든 조합에서 예외 없이 2차 엘리먼트(서브우퍼)로만 등장한다(K1_v1.13.md/K2_v1.7.md의 preset_guide_and_matching 표에 K1+K1-SB/K2+K1-SB 조합이 K1/K2 자신의 관점으로 이미 전부 기록되어 있음). K1-SB 자신의 두 소스(AE/SP)에도 이런 "구성별 매칭비율" 표는 없다 — K1-SB 관점으로 새로 채울 원본 데이터가 존재하지 않음을 확인.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: KS28과 동일 — `Primary_Element_Delay_ms` 컬럼은 1차 엘리먼트 자신의 지연값을 의미하는데, K1-SB는 K1/K2 조합 전체에서 예외 없이 2차 엘리먼트로만 등장해 "K1-SB 자신의 Primary_Element_Delay_ms" 개념이 성립하지 않는다. 실제 조합별 지연값(K1+K1-SB 3개 프리셋, K2+K1-SB 3개 프리셋 및 KS28/CS1과의 3중 조합)은 K1_v1.13.md/K2_v1.7.md 자신의 delay_defaults 표에 K1-SB를 Secondary_Element_Delay_ms로 이미 전부 기록되어 있다(K1-SB는 [K1SB_X]/[K1SB_60] 조합에서 정상 극성(+), [K1SB_100_NC]에서 반전(-) — K1/K2 파일 참조).

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| flown | K1-BUMP | 20 | 24 |
| flown, with LA-RAK II AVB | K1-BUMP | 18 K1-SB + 3 LA-RAK II AVB | 24 K1-SB + 4 LA-RAK II AVB |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 4:1 | - |
| Max_Wind_Load | 6 | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: K1_OM_EN_4.0.pdf p.31 "Mechanical safety > Flown configurations" K1-SB 표(PowerShell+Windows.Data.Pdf WinRT API로 페이지 이미지 렌더링해 육안 확인 — 이 페이지는 텍스트 레이어가 없어 pdftoppm 기반 자동 추출이 불가했던 페이지); p.11 "Rigging elements: K1-BUMP — Structure for flying and stacking K1 and K1-SB arrays".
**Safe_Limit/Maximum_Limit**: 원문 K1-SB 표 — "flown, K1-BUMP: safe limit 20 / maximum limit 24"와 "flown, K1-BUMP: safe limit 18 K1-SB + 3 LA-RAK II AVB / maximum limit 24 K1-SB + 4 LA-RAK II AVB" 2행. K1(16/24, LA-RAK II AVB 조합 시 14+3/23+4)보다 safe limit이 더 높다(20 vs 16) — 서브우퍼 단일대역 구조가 3-way K1보다 구조적으로 더 가벼운 안전 마진을 허용하는 것으로 추정되나 원문에 이유 서술은 없다.
**Safety_Factor=4:1/Max_Wind_Load=6 Beaufort**: 같은 페이지(p.31) 서두 "2006/42/EC: Machinery Directive specifies a safety factor of 4... flown deployments... achieve a safety factor of 4 or more"는 K1 OM 전체(K1-SB 포함)에 적용되는 공통 서술 — K1 자신의 Safety_Factor/Max_Wind_Load와 동일 근거(OM p.6 "Safety > Instructions", 문서 전역 공통 규정)로 K1-SB에도 동일 값 적용.

## Null Report

**미확인(정보 부족)**: Model_Number, Compliance_Standards, WEEE_Marking, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, Nominal_Directivity_Horizontal_deg, Nominal_Directivity_Vertical, Nominal_Impedance_Overall, SpeakON_Pinout_1, SpeakON_Pinout_2, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, preset_guide_and_matching(K1-SB 관점 데이터 원본 부재, 상대 제품 파일에 기록됨, 단일 항목으로 취급), delay_defaults(K1-SB는 모든 조합에서 2차 엘리먼트라 Primary_Element_Delay_ms 개념 자체가 성립하지 않음, 단일 항목으로 취급) — 16건.
**비적용**: RMS_Power_Handling_Overall, Peak_Power_Handling_10ms_Overall, Link_Connector — 3건.

**총계**: null 19건 (미확인 16건 + 비적용 3건). 확정적 비존재(0/No)로 명시한 항목은 2건 — Passive_Crossover_Network(No, AE+SP 전량 스캔 근거), Cardioid_Capability(No, AE+SP 전량 스캔 근거, AE의 "Omni configuration" 명시적 서술과도 정합). **v1.0 후속 보강(같은 세션 내, 2026-07-19)**: mechanical_safety의 Safe_Limit/Maximum_Limit/Safety_Factor/Max_Wind_Load 4건이 K1 OM p.31 페이지 이미지 렌더링(PowerShell+Windows.Data.Pdf)으로 실값 확보되어 미확인 목록에서 제거 — 총계 23건→19건.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — K1/K2의 오랜 컴패니언 서브우퍼 K1-SB를 독립 마스터 스키마 파일로 최초 투입(2026-07-19). 그동안 K1_v1.13.md/K2_v1.7.md의 preset_guide_and_matching·delay_defaults에 상대방 관점으로만 존재하던 제품. KS28_v1.9.md를 스켈레톤으로 사용(LF 단일 대역 패시브 서브우퍼, 모든 조합에서 2차 엘리먼트). 신규 업로드된 K1-SB_AE_EN.docx(A&E)+K1-SB_SP_EN_2.0.pdf(스펙시트 v2.0) 통합, K1 OM p.11 "System components"로 K1-SB의 공식 시스템 편입 확인. 소스 간 충돌 3건 보존: Max_SPL_Peak(SP 145dB vs AE 141dB, SP 채택), RMS_Power_Handling_LF(SP 1200W vs AE 930W, SP 채택), Height/Depth_mm(SP 505/434mm vs AE 438/520mm, SP 채택). Compatible_Amplified_Controller="LA8"(SP 명시)이 K1 OM 자체의 시스템 구성요소 표(LA12X만 등재)와 불일치하는 점도 각주로 보존. Cardioid_Capability=No/Passive_Crossover_Network=No 확정적 비존재 2건(AE+SP 전량 스캔). mechanical_safety 안전 한계 수치는 K1 OM p.31이 텍스트 레이어 없는 이미지 전용 페이지라 최초 시도(pdftoppm)는 실패했으나, 같은 세션 내에서 PowerShell+Windows.Data.Pdf WinRT API 렌더링으로 재시도해 K1-SB 전용 표(K1-BUMP, safe limit 20/maximum limit 24, LA-RAK II AVB 조합 시 18+3/24+4) 확보 완료. Null Report 최종 19건(미확인 16건+비적용 3건). |
