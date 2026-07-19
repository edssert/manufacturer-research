# SB10i (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 4(설치용 서브우퍼, X6i/X8i/X4i 매칭용, 신규 제품 최초 투입)

**스켈레톤 근거**: `speakers/LA/SB6i_v1.2.md`를 뼈대로 사용 — SB10i는 SB6i와 동일한 패시브 terminal block 서브우퍼 아키텍처(Way_Count=1, LF 전용)이며 3개 팩토리 프리셋([SB10_60]/[SB10_100]/[SB10_200]) 구조도 동일하다. 다만 (1) 2 x 6.5" 대신 단일 10" LF 드라이버(direct-radiating), (2) 8 Ohm(SB6i는 4 Ohm), (3) 깊이 170mm(SB6i는 99mm), (4) 원문에 실제 앰프별 Max_Enclosures_Per_Controller 표와 Max_Wind_Load(6 bft)가 명시되어 SB6i보다 확보 데이터가 많다.

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
| Compliance_Standards | EN 62368-1: 2014 Audio/video, information and communication technology equipment - Part 1: Safety requirements (rigging system) | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB10i_AE_EN.docx; SB10i_OM_EN.pdf(SB10i owner's manual EN version 2.1) p.35 "SB10i specifications", p.5-6 "Safety > Instructions", p.14 "Mechanical safety".
**Compliance_Standards**: SB6i/SB6r는 "2006/42/EC Machinery Directive(BGV-C1)"를 인용하나, SB10i 자신의 OM은 이 표현을 전혀 사용하지 않고 "The SB10i rigging system complies with EN 62368-1: 2014..."로 명시.
**Product_Series/Product_Type**: SB10i_AE_EN.docx 최상단 헤더("SB10i - Subwoofer" / "Install-specific 10' Subwoofer") — Product_Type="Subwoofer" 채택, Product_Series는 null.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | [SB10_60]: 25-70 / [SB10_100]: 27-118 / [SB10_200]: 29-180 | Hz |
| Frequency_Response_6dB_Hz | [SB10_60]: 27-64 / [SB10_100]: 30-96 / [SB10_200]: 32-125 | Hz |
| Frequency_Response_3dB_Hz | [SB10_60]: 30-55 / [SB10_100]: 33-80 / [SB10_200]: 35-87 | Hz |
| Max_SPL_Peak | [SB10_60]: 119 dB / [SB10_100]: 122 dB / [SB10_200]: 124 dB (LA2Xi bridge mode/LA4X/LA7.16i/LA12X); [SB10_60]: 119 dB / [SB10_100]: 120 dB / [SB10_200]: 122 dB (LA2Xi single-ended) | dB |
| Nominal_Directivity_Horizontal_deg | null | deg |
| Nominal_Directivity_Vertical | null | - |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | SB10_60, SB10_100, SB10_200 | - |

### 주석 및 출처 (Notes & Sources)

**Cardioid_Capability=No(확정적 비존재)**: SB10i_OM_EN_2.1.pdf/SB10i_AE_EN.docx 전량을 "cardioid" 키워드로 스캔 — 0건 검출.
**출처**: SB10i_AE_EN.docx "Technical requirements"; SB10i_OM_EN.pdf p.11 "Preset description", p.15 "Loudspeaker configurations", p.20 "Listening test", p.35 "SB10i specifications".
**프리셋-Preset 번호 매핑**: AE는 "Preset 1/2/3"로만 표기하나, 각 Preset의 Low frequency limit(-10dB)이 OM의 [SB10_60]=25Hz/[SB10_100]=27Hz/[SB10_200]=29Hz와 정확히 일치.
**Max_SPL_Peak 앰프 모드별 이원 구조**: OM 스펙 표가 "with LA2Xi(bridge mode)/LA4X/LA7.16i/LA12X" 행과 "with LA2Xi" 행을 별도로 제공(LA2Xi 단독모드에서 [SB10_100]/[SB10_200]이 각 2dB 감소).

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 1 x 10" cone driver | - |
| LF_Acoustical_Load | bass-reflex, L-Vents | - |
| Passive_Crossover_Network | No | - |
| LF_Nominal_Impedance | 8 | Ohm |
| Nominal_Impedance_Overall | null | Ohm |
| RMS_Power_Handling_LF | 146 | W |
| RMS_Power_Handling_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: SB10i_AE_EN.docx "Technical requirements"; SB10i_OM_EN.pdf p.35 "SB10i specifications", p.32-34 "Corrective maintenance"(10" LF speaker - 8 Ohm 재확인).
**RMS_Power_Handling_LF**: AE "RMS power handling (Calculated using the mean impedance measured on the usable bandwidth): 146 W" — 프리셋별 개별값이 아닌 단일 통합값.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 4-point terminal block with push-in connection | - |
| Link_Connector | null | - |
| Terminal_Block_Pinout_1 | + / - | - |
| Terminal_Block_Pinout_2 | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB10i_OM_EN.pdf p.11 "Connectors"; p.28-29 "Cabling SB10i".
**Link_Connector 미확인 사유**: SB6i와 동일 구조 — 별도 LINK 커넥터가 없고, 단일 4-point 터미널 블록의 두 번째 케이블 글랜드 홀을 통해 병렬(loop-through) 연결을 수행.

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA2Xi, LA4X, LA7.16i, LA12X | - |
| Max_Enclosures_Per_Controller_Output | LA2Xi: 2(SE)/1(BTL), LA4X: 2, LA7.16i: 2, LA12X: 3 | count |
| Max_Enclosures_Per_Controller_Total | LA2Xi: 8(SE)/2(BTL), LA4X: 8, LA7.16i: 32, LA12X: 12 | count |
| Crossover_Type | Active (1-way, subwoofer) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB10i_OM_EN.pdf p.26 "Enclosure drive capacity per amplified controller".
**Max_Enclosures_Per_Controller 앰프별 표**: 원문 표가 "per output / total"을 앰프 4종 각각 별도로 제공(SB6i는 이 표를 확보하지 못해 null이었으나 SB10i는 원문에 명시). LA2Xi는 SE(single-ended)/BTL(bridge-tied load) 모드별로 값이 상이.

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | 12 x M6 threaded inserts for rigging accessories | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | 0 | count |
| Weight_Net | 14 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: SB10i_OM_EN.pdf p.35 "SB10i specifications"; p.39 "Specifications for custom rigging".
**Handles 확정적 비존재(0)**: "handle" 키워드 전량 검색 0건 — 그라운드 스택 시 4개의 탈착식 러너(runner)를 이용해 이동.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 540 | mm |
| Height_mm | 540 | mm |
| Depth_mm | 170 | mm |
| Dimensions_Raw | 539 / 539 / 169 / 178 | mm |
| Cabinet_Material | premium grade Baltic birch plywood | - |
| Front_Material | coated steel grill, acoustically neutral 3D fabric | - |
| Rigging_Components_Material | high grade steel with anti-corrosion coating | - |
| Finish_Color | dark grey brown Pantone 426 C, pure white RAL 9010, custom RAL code on special order | - |
| IP_Rating | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB10i_AE_EN.docx "Physical data"("Dimensions (W, H, D): 540 mm, 540 mm, 170 mm"); SB10i_OM_EN.pdf p.36 "SB10i dimensions"; p.13 "Rigging elements".
**Cabinet_Material 표현 차이**: OM 스펙 표(p.35)는 "premium grade Baltic birch plywood"(수식어 없음), AE_EN.docx는 "beech and birch plywood" — OM의 간결한 표현을 채택.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| SB10i standard configuration | [SB10_60] / [SB10_100] / [SB10_200] | 25-70 / 27-118 / 29-180 | null | null |

### 주석 및 출처 (Notes & Sources)

**출처**: SB10i_OM_EN.pdf p.15 "Loudspeaker configurations". X6i/X8i/X4i와의 조합 데이터는 각 제품 파일에 이미 그 제품 관점으로 기록됨.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: SB6i와 동일한 구조적 이유 — SB10i는 X6i/X8i/X4i 조합에서 항상 2차 엘리먼트로만 등장하며, SB10i 자신의 OM에는 "Refer to the Preset Guide to obtain the pre-alignment delay values"라는 안내만 있고 실제 수치/극성 표가 없다.

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

**출처**: SB10i_OM_EN.pdf p.14 "Mechanical safety > Flown configurations / Other configurations"; p.5-6 "Safety > Instructions".
**Safe_Limit/Maximum_Limit 표기**: 원문이 "safe/maximum limit"를 단일 값으로 표기 — 두 열 모두 동일 값으로 채택.

## Null Report

**미확인**: Model_Number, WEEE_Marking, Frequency_Response_5/4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, Nominal_Directivity_Horizontal_deg, Nominal_Directivity_Vertical, Link_Connector, Terminal_Block_Pinout_2, preset_guide_and_matching(2건), delay_defaults — 12건.
**비적용**: Nominal_Impedance_Overall, RMS_Power_Handling_Overall, Peak_Power_Handling_10ms_Overall, Inter_Enclosure_Angles_deg — 4건.

**총계**: null 16건(미확인 12건 + 비적용 4건). 확정적 비존재(No): Passive_Crossover_Network, Handles — 2건.

---

**[MR_v1.8 반영 메모]**: 이 파일은 `upload/SB10i_v1.3.md`를 이 저장소의 raw-spec으로 이관한 것이다(기존 역재구성본을 대체, 원본 파일 자체는 없어 폴더화하지 않음). `public/js/domains/speakers/data/la/subwoofers.data.js`에 Cardioid_Capability/Preset Guide/Mechanical Safety를 신규 반영했다. 기존 필드(dims/freqs/watt 등)는 대조 후 이상 없음.
