# SB10r (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 4(SB10i의 recessed/매입형 파생형, 신규 제품 최초 투입)

**스켈레톤 근거**: `speakers/LA/SB10i_v1.0.md`를 뼈대로 사용 — SB10r은 원문이 명시적으로 "SB10r is the recessed version of the SB10i enclosure"라 서술하는 매입형 파생품(SB6r/SB6i 관계와 동일 패턴)이며, 스펙 표 핵심 수치(저역한계/Max SPL, 앰프 모드별 이원 구조 포함)가 SB10i와 완전히 일치함을 SB10r 자신의 OM(p.45)에서 직접 확인했다. A&E 시방서는 제공되지 않아 OM(SB10r owner's manual EN version 1.1) 단일 소스 기준.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | SB10r | - |
| Model_Number | null | - |
| Product_Series | null | - |
| Product_Category | ultra-compact subwoofer (recessed version) | - |
| Product_Type | Subwoofer | - |
| Description | Ultra-compact subwoofer (recessed version): 1 x 10" direct-radiating cone driver, amplified by LA2Xi / LA4X / LA7.16i / LA12X | - |
| Way_Count | 1 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | EN 62368-1: 2014 Audio/video, information and communication technology equipment - Part 1: Safety requirements (rigging system) | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB10r_OM_EN.pdf(SB10r owner's manual EN version 1.1) p.45 "SB10r specifications"(A&E 시방서 미제공), p.17 "Mechanical safety"(SB10r 자신의 원문에서 "EN 62368-1: 2014"로 독립 확인 — SB6r처럼 형제 제품 값을 유추하지 않음).
**Product_Series/Product_Type**: SB10r 자신의 문서에는 series/type 헤더가 없어(A&E 미제공), SB10i_AE_EN.docx 헤더를 install/recessed 상속 정책과 동일 근거로 적용 — Product_Type="Subwoofer", Product_Series는 SB10i도 null이라 null.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | [SB10_60]: 25 - null / [SB10_100]: 27 - null / [SB10_200]: 29 - null | Hz |
| Frequency_Response_6dB_Hz | [SB10_60]: 27-64 / [SB10_100]: 30-96 / [SB10_200]: 32-125 | Hz |
| Frequency_Response_3dB_Hz | [SB10_60]: 30-55 / [SB10_100]: 33-80 / [SB10_200]: 35-87 | Hz |
| Max_SPL_Peak | [SB10_60]: 119 dB / [SB10_100]: 122 dB / [SB10_200]: 124 dB (LA2Xi bridge mode/LA4X/LA7.16i/LA12X); [SB10_60]: 119 dB / [SB10_100]: 120 dB / [SB10_200]: 122 dB (LA2Xi single-ended) | dB |
| Nominal_Directivity_Horizontal_deg | null | deg |
| Nominal_Directivity_Vertical | null | - |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | SB10_60, SB10_100, SB10_200 | - |

### 주석 및 출처 (Notes & Sources)

**Cardioid_Capability=No(확정적 비존재)**: SB10r_OM_EN_1.1.pdf 전량을 "cardioid" 키워드로 스캔 — 0건 검출, SB6i/SB10i와 동일 근거.
**출처**: SB10r_OM_EN.pdf p.11 "Preset description", p.18 "Loudspeaker configurations", p.45 "SB10r specifications".
**Usable_Bandwidth_Hz 상한 미확인**: OM은 저역한계만 제공하고 상한을 명시하지 않음 — SB10i는 A&E로 상한을 확보했으나, SB10r은 A&E 미제공이라 원문에 없는 수치를 임의로 채우지 않음(SB6r과 동일 원칙).
**Max_SPL_Peak**: SB10r 자신의 OM 스펙 표가 SB10i와 동일한 앰프 모드별 이원 구조를 독립적으로 명시.
**Frequency_Response_6dB_Hz/3dB_Hz = SB10i 값 상속(사용자 정책 지침)**: install/recessed 버전이 표준형과 치수·무게·리깅 외 특이사항이 없다면 드라이버·인클로저 구성이 동일 스펙이므로 상속 가능 — SB10i_v1.1.md 값 채택.

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

**출처**: SB10r_OM_EN.pdf p.45 "SB10r specifications".
**RMS_Power_Handling_LF = SB10i 값 상속(사용자 정책 지침)**: SB10i는 자체 A&E로 146W를 확보했으나 SB10r은 A&E 미제공에 OM 스펙 표에도 항목 자체가 없어 install/recessed 상속 정책에 따라 SB10i_v1.1.md 값(146W) 채택.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 4-point terminal block with push-in connection | - |
| Link_Connector | null | - |
| Terminal_Block_Pinout_1 | + / - | - |
| Terminal_Block_Pinout_2 | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB10r_OM_EN.pdf p.11 "Connectors"; p.42-43 "Cabling SB10r".
**Link_Connector 미확인 사유**: SB10i와 동일 — 별도 LINK 커넥터 없이 단일 4-point 터미널 블록의 두 번째 케이블 글랜드 홀로 병렬 연결.

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA2Xi, LA4X, LA7.16i, LA12X | - |
| Max_Enclosures_Per_Controller_Output | LA2Xi: 2(SE)/1(BTL), LA4X: 2, LA7.16i: 2, LA12X: 3 | count |
| Max_Enclosures_Per_Controller_Total | LA2Xi: 8(SE)/2(BTL), LA4X: 8, LA7.16i: 32, LA12X: 12 | count |
| Crossover_Type | Active (1-way, subwoofer) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB10r_OM_EN.pdf p.40 "Enclosure drive capacity per amplified controller".
**Max_Enclosures_Per_Controller**: SB10r 자신의 OM이 SB10i와 수치까지 동일한 앰프별 표를 독립적으로 제공(SB10r 자신의 p.40에서 재확인).

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | 12 x M6 threaded inserts for rigging accessories | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | 0 | count |
| Weight_Net | 13 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: SB10r_OM_EN.pdf p.45 "SB10r specifications"; p.51 "Specifications for custom rigging".
**Handles 확정적 비존재(0)**: SB10r_OM_EN.txt 전량을 "handle" 키워드로 검색한 결과 0건 검출.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 539 | mm |
| Height_mm | 547 | mm |
| Depth_mm | 169 | mm |
| Dimensions_Raw | 539 / 547 / 169 | mm |
| Cabinet_Material | premium grade Baltic birch plywood | - |
| Front_Material | null | - |
| Rigging_Components_Material | high grade steel with anti-corrosion coating (SB10r-inW/-inC); steel with anti-corrosion coating (SB10r-Screen/-Tilescreen) | - |
| Finish_Color | dark grey brown Pantone 426 C | - |
| IP_Rating | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB10r_OM_EN.pdf p.45 "SB10r specifications"/"SB10r dimensions"; p.46-49 "SB10r-inW/-inC/-Screen/-Tilescreen specifications".
**Width/Height/Depth_mm 축 확정**: A&E 미제공이라 문서 간 교차 확인은 불가했으나, p.45 도면을 이미지 렌더링해 육안 확인 — 전면도에 가로 539mm(폭)·세로 547mm(높이), 하단 측면도에 169mm(깊이)로 각 치수선이 명확히 표기됨. SB10i(539x539mm 정사각형)와 달리 폭≠높이 — SB10r 고유의 매입형 프레임 형상 차이로 판단.
**Front_Material 비적용 사유**: 매입형 제품이라 전면 그릴/패브릭 스펙이 원문 표에서 빠짐.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| SB10r standard configuration | [SB10_60] / [SB10_100] / [SB10_200] | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: OM 자신의 스펙 표에 저역한계만 있고 전체 대역 범위(상한 포함)가 없어 채울 수 없음. X-시리즈 계열과의 조합 데이터는 SB10r 자신의 문서에서 별도 확인하지 못함.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: SB10i와 동일한 구조적 이유 — SB10r은 항상 2차 엘리먼트로만 등장. 정확한 SB10r 전용 딜레이 값은 SB10r 자신의 원본 문서에 "Refer to the Preset Guide to obtain the pre-alignment delay values" 안내만 있을 뿐 실제 수치/극성 표가 없어 미확인으로 유지.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| in-wall | SB10r-inW + SB10r-Screen | 1 | 1 |
| in-ceiling | SB10r-inC + SB10r-Screen | 1 | 1 |
| in-tile | SB10r-Tilescreen | 1 | 1 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 5:1 | - |
| Max_Wind_Load | null | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: SB10r_OM_EN.pdf p.17 "Mechanical safety"("The deployments described in this manual achieve a safety factor of 5").
**Max_Wind_Load 미확인 사유**: SB10r_OM_EN.txt 전량을 "bft"/"beaufort"/"wind" 키워드로 검색한 결과 0건 검출(SB10i는 6 bft 명시와 대조) — SB10r은 in-wall/in-ceiling/in-tile 매입형 전용 구조로 풍하중이 문제되는 배치 시나리오 자체가 없어 미확인으로 유지.

## Null Report

**미확인**: Model_Number, WEEE_Marking, Usable_Bandwidth_Hz(상한), Frequency_Response_5/4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, Nominal_Directivity_Horizontal_deg, Nominal_Directivity_Vertical, Link_Connector, Terminal_Block_Pinout_2, preset_guide_and_matching(3건), delay_defaults, Max_Wind_Load — 14건.
**비적용**: Nominal_Impedance_Overall, RMS_Power_Handling_Overall, Peak_Power_Handling_10ms_Overall, Inter_Enclosure_Angles_deg, Front_Material — 5건.

**총계**: null 19건(미확인 14건 + 비적용 5건). 확정적 비존재(No): Passive_Crossover_Network, Handles — 2건.

---

**[MR_v1.8 반영 메모]**: 이 파일은 `upload/SB10r_v1.4.md`를 이 저장소의 raw-spec으로 이관한 것이다(기존 역재구성본을 대체, 원본 파일 자체는 없어 폴더화하지 않음). `public/js/domains/speakers/data/la/subwoofers.data.js`에 Cardioid_Capability/Preset Guide/Mechanical Safety를 신규 반영했다. **정정**: dims 값(547 x 539 x 169mm)이 W/H 축을 뒤바꿔 표기했다 — Width=539/Height=547/Depth=169mm로 정정.
