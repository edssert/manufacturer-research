# SB10i (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 4(설치용 서브우퍼, X6i/X8i/X4i 매칭용, 신규 제품 최초 투입)

**스켈레톤 근거**: `speakers/LA/SB6i_v1.2.md`를 뼈대로 사용 — SB10i는 SB6i와 동일한 패시브 terminal block 서브우퍼 아키텍처(Way_Count=1, LF 전용)이며 3개 팩토리 프리셋([SB10_60]/[SB10_100]/[SB10_200]) 구조도 동일하다. 다만 (1) 2 x 6.5" 대신 **단일 10" LF 드라이버**(direct-radiating), (2) 8 Ohm(SB6i는 4 Ohm), (3) 깊이 170mm(SB6i는 99mm — SB6i가 "ultra-shallow"인 반면 SB10i는 원문이 스스로 "ultra-compact"로 지칭), (4) 원문에 실제 앰프별 Max_Enclosures_Per_Controller 표와 Max_Wind_Load(6 bft)가 명시되어 SB6i보다 확보 데이터가 많다는 차이가 있다 — 아키텍처는 SB10i 자신의 SB10i_AE_EN.docx/SB10i_OM_EN.pdf(version 2.1)에서 독립 판정했다.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | SB10i | - |
| Model_Number | null | - |
| Product_Series | null | - |
| Product_Category | ultra-compact subwoofer (installation version) | - |
| Product_Type | Subwoofer | - |
| Description | Ultra-compact subwoofer (installation version): 1 x 10" direct-radiating cone driver, amplified by LA2Xi / LA4X / LA7.16i / LA12X | - |
| Way_Count | 1 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards [1] | EN 62368-1: 2014 Audio/video, information and communication technology equipment - Part 1: Safety requirements (rigging system) | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB10i_AE_EN.docx; SB10i_OM_EN.pdf(SB10i owner's manual EN version 2.1) p.35 "SB10i specifications", p.5-6 "Safety > Instructions", p.14 "Mechanical safety".
**[1] Compliance_Standards**: SB6i/SB6r는 "2006/42/EC Machinery Directive(BGV-C1)"를 인용하나, SB10i 자신의 OM은 이 표현을 전혀 사용하지 않고 "The SB10i rigging system complies with EN 62368-1: 2014..."로 명시(원문 전량 검색으로 "2006/42"/"BGV" 0건 확인) — 형제 제품 값을 유추 적용하지 않고 SB10i 자신의 원문 그대로 채택.
**Product_Series/Product_Type(신규 Key, 사용자 지시 2026-07-17)**: SB10i_AE_EN.docx 최상단 헤더("SB10i - Subwoofer" / "Install-specific 10' Subwoofer") — Product_Type="Subwoofer" 채택, 시리즈명 줄이 없어 Product_Series는 null.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz [1] | [SB10_60]: 25-70 / [SB10_100]: 27-118 / [SB10_200]: 29-180 | Hz |
| Frequency_Response_6dB_Hz [1] | [SB10_60]: 27-64 / [SB10_100]: 30-96 / [SB10_200]: 32-125 | Hz |
| Frequency_Response_3dB_Hz [1] | [SB10_60]: 30-55 / [SB10_100]: 33-80 / [SB10_200]: 35-87 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak [2] | [SB10_60]: 119 dB / [SB10_100]: 122 dB / [SB10_200]: 124 dB (LA2Xi bridge mode/LA4X/LA7.16i/LA12X); [SB10_60]: 119 dB / [SB10_100]: 120 dB / [SB10_200]: 122 dB (LA2Xi single-ended) | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | null | deg |
| Nominal_Directivity_Vertical | null | - |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | SB10_60, SB10_100, SB10_200 | - |

### 주석 및 출처 (Notes & Sources)

**Cardioid_Capability=No(확정적 비존재)**: SB10i_OM_EN_2.1.pdf/SB10i_AE_EN.docx 전량을 "cardioid" 키워드로 스캔 — 0건 검출, SB6i와 동일 근거(반전 배치용 프리셋 자체 부재).

**출처**: SB10i_AE_EN.docx "Technical requirements"("Usable bandwidth: Preset 1/2/3"); SB10i_OM_EN.pdf p.11 "Preset description", p.15 "Loudspeaker configurations"("Low frequency limit (-10 dB)"), p.20 "Listening test"([SB10_100] usable bandwidth "27 Hz - 118 Hz"로 교차 확인), p.35 "SB10i specifications".
**[1] 프리셋-Preset 번호 매핑**: AE는 "Preset 1/2/3"로만 표기하나, 각 Preset의 Low frequency limit(-10dB)이 OM의 [SB10_60]=25Hz/[SB10_100]=27Hz/[SB10_200]=29Hz와 정확히 일치(Preset1=25Hz, Preset2=27Hz, Preset3=29Hz)하여 Preset1=[SB10_60], Preset2=[SB10_100], Preset3=[SB10_200]로 확정. OM p.20 Listening test 표가 [SB10_100]의 usable bandwidth를 "27 Hz - 118 Hz"로 명시해 AE의 Preset2(27-118Hz, -10dB) 값과 정확히 일치함을 재확인.
**[2] Max_SPL_Peak 앰프 모드별 이원 구조**: OM 스펙 표가 "with LA2Xi(bridge mode)/LA4X/LA7.16i/LA12X" 행과 "with LA2Xi" 행을 별도로 제공(LA2Xi 단독모드에서 [SB10_100]/[SB10_200]이 각 2dB 감소) — 소스 간 충돌이 아니라 앰프 구동 방식에 따른 실제 스펙 차이이므로 양쪽 다 보존. AE는 브릿지모드/LA4X/LA7.16i/LA12X 공통값(119/122/124dB)만 제공하여 OM의 첫 행과 정확히 일치(충돌 없음).
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 1 x 10" cone driver | - |
| LF_Acoustical_Load | bass-reflex, L-Vents | - |
| Passive_Crossover_Network | No | - |
| LF_Nominal_Impedance | 8 | Ohm |
| Nominal_Impedance_Overall | null | Ohm |
| RMS_Power_Handling_LF [1] | 146 | W |
| RMS_Power_Handling_Overall | null | W |
| Peak_Power_Handling_10ms_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: SB10i_AE_EN.docx "Technical requirements"; SB10i_OM_EN.pdf p.35 "SB10i specifications", p.32-34 "Corrective maintenance"(10" LF speaker - 8 Ohm 교체 부품 표로 임피던스 재확인).
**[1] RMS_Power_Handling_LF**: AE "RMS power handling (Calculated using the mean impedance measured on the usable bandwidth): 146 W" — 프리셋별 개별값이 아닌 단일 통합값(트랜스듀서 고유 정격). SB10i 자신의 OM 스펙 표(p.35)에는 이 항목 자체가 없어 AE 단독 출처.
**Peak_Power_Handling_10ms_Overall(신규 Key)**: d&b CCL8에서 신설된 범용 Key — RMS_Power_Handling_Overall과 동일 사유로 비적용.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 4-point terminal block with push-in connection | - |
| Link_Connector | null | - |
| Terminal_Block_Pinout_1 | + / - | - |
| Terminal_Block_Pinout_2 | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB10i_OM_EN.pdf p.11 "Connectors"("Internal pinout for L-Acoustics subwoofers"), p.28-29 "Cabling SB10i"("connector sealing plate has two holes: one for the input cable and one for the cable connecting to the next enclosure in parallel").
**Link_Connector 미확인 사유**: SB6i와 동일 구조 — 별도 LINK 커넥터가 없고, 단일 4-point 터미널 블록의 두 번째 케이블 글랜드 홀을 통해 병렬(loop-through) 연결을 수행(원문에 "Not linked" 같은 명시적 비적용 서술은 없어 확정적 비적용으로 단정하지 않고 미확인 유지).

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA2Xi, LA4X, LA7.16i, LA12X | - |
| Max_Enclosures_Per_Controller_Output [1] | LA2Xi: 2(SE)/1(BTL), LA4X: 2, LA7.16i: 2, LA12X: 3 | count |
| Max_Enclosures_Per_Controller_Total [1] | LA2Xi: 8(SE)/2(BTL), LA4X: 8, LA7.16i: 32, LA12X: 12 | count |
| Crossover_Type | Active (1-way, subwoofer) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB10i_OM_EN.pdf p.26 "Enclosure drive capacity per amplified controller"("The SB10i subwoofer is driven by the LA2Xi / LA4X / LA7.16i / LA12X amplified controllers").
**[1] Max_Enclosures_Per_Controller 앰프별 표**: 원문 표가 "per output / total"을 앰프 4종(LA2Xi/LA4X/LA7.16i/LA12X) 각각 별도로 제공(SB6i는 이 표를 확보하지 못해 null이었으나 SB10i는 원문에 명시)하여 전부 보존. 각주 원문: "For passive loudspeakers, the value corresponds to the number of enclosures in parallel on the output." LA2Xi는 SE(single-ended)/BTL(bridge-tied load) 모드별로 값이 상이(2/8 vs 1/2)해 병기.

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | 12 x M6 threaded inserts for rigging accessories | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles [1] | 0 | count |
| Weight_Net | 14 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: SB10i_OM_EN.pdf p.35 "SB10i specifications"("Rigging and handling"), p.39 "Specifications for custom rigging"("SB10i has 12 threaded M6 inserts available for rigging").
**[1] Handles 확정적 비존재(0)**: SB10i_OM_EN.txt와 SB10i_AE_EN.txt 전량을 "handle" 키워드로 검색한 결과 0건 검출 — 별도 손잡이는 없고 그라운드 스택 시 4개의 탈착식 러너(runner)를 이용해 이동(p.12 "Four removable runners are provided for ground-stacking SB10i")하는 구조로 확인되어 확정적 비존재로 처리.
**Weight_Net 무충돌**: AE(14 kg / 31 lb)와 OM(14 kg / 31 lb)이 정확히 일치 — SB6i/SB6r과 달리 소스 간 충돌 없음.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 540 | mm |
| Height_mm | 540 | mm |
| Depth_mm | 170 | mm |
| Dimensions_Raw [1] | 539 / 539 / 169 / 178 | mm |
| Cabinet_Material [2] | premium grade Baltic birch plywood | - |
| Front_Material | coated steel grill, acoustically neutral 3D fabric | - |
| Rigging_Components_Material | high grade steel with anti-corrosion coating | - |
| Finish_Color | dark grey brown Pantone 426 C, pure white RAL 9010, custom RAL code on special order | - |
| IP_Rating | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB10i_AE_EN.docx "Physical data"("Dimensions (W, H, D): 540 mm, 540 mm, 170 mm"); SB10i_OM_EN.pdf p.36 "SB10i dimensions"(치수 도면), p.13 "Rigging elements"(SB10i-onCW "Material: high grade steel with anti-corrosion coating").
**[1] Dimensions_Raw**: 도면 4개 숫자(539/539/169/178mm) 중 539(W)·539(H)·169(D)는 AE 확정 W/H/D(540/540/170mm, 반올림 차이)와 근사 일치, 178mm는 부가 치수(연결부 실링 플레이트 포함 깊이로 추정) — 원문 그대로 4개 모두 보존(X8i와 동일 관례).
**[2] Cabinet_Material 표현 차이**: OM 스펙 표(p.35)는 "premium grade Baltic birch plywood"(수식어 없음), AE_EN.docx는 "premium grade Baltic beech and birch plywood"("beech and" 추가) — 무결성 원칙("수식어 없는 보수적 표현을 기본값으로")에 따라 OM의 간결한 표현을 채택하고 AE의 확장 표현을 각주에 병기.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| SB10i standard configuration | [SB10_60] / [SB10_100] / [SB10_200] | 25-70 / 27-118 / 29-180 | null | null |

### 주석 및 출처 (Notes & Sources)

**출처**: SB10i_OM_EN.pdf p.15 "Loudspeaker configurations"("SB10i in standard configuration"). X6i/X8i/X4i와의 조합 데이터는 각 제품 파일(X6i_v1.2.md, X8i_v1.2.md, X4i_v1.2.md)에 이미 그 제품 관점으로 기록됨 — SB10i 자신의 OM에는 X-시리즈와의 조합표(Recommended_Ratio/Minimum_Line_Length)가 없어 미확인 유지.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유(조사 완료 후 확정)**: SB6i와 동일한 구조적 이유 — SB10i는 X6i/X8i/X4i 조합에서 항상 2차 엘리먼트로만 등장하며, SB10i 자신의 OM(p.15 "Loudspeaker configurations")에는 "Refer to the Preset Guide to obtain the pre-alignment delay values"라는 안내만 있고 실제 수치/극성 표가 없음. 실제 딜레이 값은 X6i_v1.2.md/X8i_v1.2.md/X4i_v1.2.md에 그 제품 관점으로 이미 기록됨(예: X6i "[X6i]+[SB10_200]: X6i=1.4ms/SB10i=0ms, 극성 X6i=+/SB10i=-"; X8i "[X8i]+[SB10_100]: X8i=0ms/SB10i=0.5ms, 극성 둘 다 +"). 이 파일에서 원본 재조회 없이 그 값들을 끌어와 채우지 않고 정직하게 미확인으로 유지(SKILL "미확인 원본성 요건").

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| wall-mounted or ceiling-mounted | SB10i-onCW | 1 | 1 |
| ground-stacked | No rigging accessory | 2 | 2 |
| stacked upright | No rigging accessory | 1 | 1 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 5:1 | - |
| Max_Wind_Load | 6 | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: SB10i_OM_EN.pdf p.14 "Mechanical safety > Flown configurations / Other configurations"("The deployments described in this manual achieve a safety factor of 5"); p.5-6 "Safety > Instructions"("If the wind force exceeds 6 bft (Beaufort scale), lower down and/or secure the product or the assembly.").
**Safe_Limit/Maximum_Limit 표기**: 원문이 "safe/maximum limit"를 단일 값으로 표기(KS28-BUMP 행과 동일 관례) — 두 열 모두 동일 값으로 채택.

## Null Report

**미확인(정보 부족)**: Model_Number, WEEE_Marking, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, Nominal_Directivity_Horizontal_deg, Nominal_Directivity_Vertical, Link_Connector, Terminal_Block_Pinout_2, preset_guide_and_matching(Recommended_Ratio/Minimum_Line_Length), delay_defaults(전 항목) — 12건.
**비적용**: Nominal_Impedance_Overall, RMS_Power_Handling_Overall, Peak_Power_Handling_10ms_Overall, Inter_Enclosure_Angles_deg — 4건. (PA_COM_Pinout_*/SpeakON_Pinout_* 등 타 커넥터 고유 Key는 SB10i 자신의 Terminal_Block_Pinout_*으로 이미 표현되어 애초에 생성하지 않음, null 목록에서 제외. MF_Transducer/MF_Acoustical_Load/MF_Nominal_Impedance/RMS_Power_Handling_MF/HF_Transducer/HF_Acoustical_Load/HF_Nominal_Impedance/RMS_Power_Handling_HF는 LF 전용 서브우퍼 구조상 애초에 생성하지 않음.)

**총계**: null 16건 (미확인 12건 + 비적용 4건). 확정적 비존재(0/No)로 명시한 항목은 2건 — Passive_Crossover_Network(No, 단일 대역 구조로 크로스오버 네트워크 불필요), Handles(0, 원본 전량 검색 결과 'handle' 키워드 0건 검출).

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — speakers 카테고리 Phase 4(설치용 서브우퍼, X6i/X8i/X4i 매칭용, 신규 제품 최초 투입). SB6i_v1.2.md를 스켈레톤으로 사용, SB10i_AE_EN.docx + SB10i_OM_EN.pdf(version 2.1) 통합. SB6i와 동일한 3중 프리셋 구조([SB10_60]/[SB10_100]/[SB10_200]) 확인, Preset1/2/3(AE)-프리셋명(OM) 매핑을 Low frequency limit 수치 대조로 확정. SB6i 대비 확보 데이터 확대 — Max_Enclosures_Per_Controller(앰프별 표), Safety_Factor(5:1), Max_Wind_Load(6 bft), Rigging_Components_Material 모두 원문에서 실값 확보. Compliance_Standards는 SB6i의 "2006/42/EC"를 유추 적용하지 않고 SB10i 자신의 원문("EN 62368-1: 2014")을 독립 채택. Max_SPL_Peak는 LA2Xi 단독모드/브릿지모드 이원 구조 확인(X8i와 동일 패턴). OM/AE 간 Cabinet_Material 수식어 차이("beech and" 유무) 발견 및 보수적 표현(OM) 채택 후 각주 병기. |
| v1.1 | 프로젝트 전역 동기화 라운드(사용자 지시 2026-07-17). Product_Series(null)/Product_Type(Subwoofer) Key 신설 — SB10i_AE_EN.docx 최상단 헤더 기준, 시리즈명 줄이 없어 Product_Series는 null. Cardioid_Capability=No 신설(확정적 비존재) — SB10i_OM_EN_2.1.pdf/SB10i_AE_EN.docx 전량을 "cardioid" 키워드로 스캔 0건 검출, SB6i와 동일 근거(반전 배치용 프리셋 자체 부재). d&b 고유 개념인 signal_processing 섹션(CUT_Mode_Available/HFC_Function_Settings/Coupling_Function_Range) 삭제 — L-Acoustics 제품에는 해당 개념 자체가 없어 비적용 표기에서 섹션 삭제로 정리. null 총계 17건(비적용 6건)에서 14건(비적용 3건)으로 갱신. |
| v1.3 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-18, d&b 대량 배치 완료 후) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래, 미확인), `Peak_Power_Handling_10ms_Overall`(d&b CCL8 유래, 비적용) 반영. Null Report 16건(미확인 12건+비적용 4건)으로 갱신. |
