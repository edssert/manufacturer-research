# CS1 (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 4 (신규 제품 — 이 카테고리 최초의 카디오이드 전용 대형 포맷 서브우퍼)

**스켈레톤 근거**: `speakers/LA/KS28_v1.5.md`를 뼈대로 사용 — CS1도 KS28과 마찬가지로 서브우퍼(LF 전용, Way_Count=1, MF/HF 대역 없음) 아키텍처이며 외부 앰프(LA12X/LA7.16/LA7.16i) 구동 방식도 동일하다. 다만 KS28은 "standard 또는 cardioid" 중 선택 가능한 범용 서브우퍼인 반면, CS1은 4 × 21" LF 드라이버(전방 SB 2발 + 측면 SC 2발)로 처음부터 cardioid/supercardioid 두 모드만 지원하도록 설계된 대형 포맷 전용 카디오이드 서브우퍼이며, 커넥터도 KS28의 4-point speakON이 아니라 K1/K2와 동일한 8-point PA-COM 계열(4채널 독립 구동, IN+LINK 각 1개)을 사용한다. A&E 시방서는 제공되지 않아 OM(CS1 owner's manual EN version 2.0) 단일 소스 기준.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | CS1 | - |
| Model_Number | null | - |
| Product_Series | L Series | - |
| Product_Category | large format cardioid subwoofer | - |
| Product_Type | Cardioid subwoofer | - |
| Description | Cardioid subwoofer 4 x 21", amplified by LA12X / LA7.16 / LA7.16i | - |
| Way_Count | 1 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | 2006/42/EC Machinery Directive (rigging system, designed per BGV-C1 guidelines) | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: CS1_OM_EN_2.0.pdf p.87 "CS1 specifications"; p.7 "Introduction"("CS1 Large Format Cardioid Subwoofer 4 x 21" LF"); p.35 "Mechanical safety > Flown configurations"(Compliance_Standards).
**Product_Series/Product_Type(신규 Key, 사용자 지시 2026-07-17)**: CS1은 A&E가 없어 L-Acoustics 표준 헤더 형식이 없음 — OM 본문 Introduction 챕터("...Whether deployed independently or as part of the **flagship L Series**, CS1 combines impact, precision...")에서 Product_Series="L Series" 직접 확인(L2/L2D와 동일 시리즈). Product_Type은 OM 자체 서술("CS1 Large Format Cardioid Subwoofer")에서 "Cardioid subwoofer"로 채택(대문자 강조 정규화).
**Way_Count=1**: 서브우퍼는 LF 단일 대역만 재생 — KS28과 동일 이유.
**Product_Category**: OM Introduction 챕터 제목("CS1 Large Format Cardioid Subwoofer 4 x 21" LF")을 축약해 채택 — KS28("flyable subwoofer")과 달리 대형 포맷·카디오이드 전용이라는 두 속성을 모두 반영.
**WEEE_Marking 미확인**: Safety 섹션에 폐기물 처리 마크에 대한 일반 서술("This marking indicates that this product should not be disposed of...")은 있으나 "WEEE"라는 단어나 로고 자체가 문자로 명시되지 않아 KS28/SB6i와 동일하게 미확인 유지.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz [1] | 25 - null | Hz |
| Frequency_Response_6dB_Hz | null | Hz |
| Frequency_Response_3dB_Hz | null | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak [2] | 150 | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | null | deg |
| Nominal_Directivity_Vertical | null | - |
| Cardioid_Capability [4] | Built-in (single enclosure, 2 x front SB + 2 x side SC 드라이버 내장 배치로 카디오이드/수퍼카디오이드 성형 — 추가 유닛이나 역방향 배치 불필요) | - |
| DSP_Preset_Name | CS1_60, CS1_60_S, CS1_X, CS1_X_S | - |
| Minimum_Distance_From_Wall_m [3] | 1 | m |
| Minimum_Distance_Between_Stacks_m [3] | 1.5 | m |

### 주석 및 출처 (Notes & Sources)

**출처**: CS1_OM_EN_2.0.pdf p.87 "CS1 specifications"; p.38 "CS1 as a subwoofer, using the [CS1_60] / [CS1_60_S] preset"; p.14 "CS1 presets" 표.
**[1] Usable_Bandwidth_Hz 상한 미확인**: OM 스펙 표와 p.38 표 모두 "Low frequency limit (-10 dB): 25 Hz ([CS1_60])"만 제공하고 상한을 명시하지 않음 — KS28은 신규 업로드된 A&E 시방서로 상한(110Hz)을 확보했으나, CS1은 A&E가 제공되지 않아 원문에 없는 수치를 임의로 채우지 않음.
**[2] Max_SPL_Peak**: 원문 "Enclosure maximum SPL per amplified controller: 150 dB ([CS1_X])", 각주 "Peak level at 1 m under half space conditions using pink noise with crest factor 4 (preset specified in brackets)." — KS28처럼 앰프 종류별로 값이 갈리지 않고 단일값(호환 컨트롤러 공통), [CS1_X](L1(D) 라인소스 편입용 광대역 프리셋) 기준. `Preset_Guide_OM_EN_29.0.pdf`(References)의 [CS1_X] SPL 표에도 동일하게 150dB로 기재되어 교차 확인됨.
**Nominal_Directivity_Horizontal/Vertical**: 원문 "Nominal directivity (-6 dB): cardioid or supercardioid" — KS28의 "standard or cardioid"와 동일하게 각도(deg)가 아닌 패턴 모드 서술이라 기존 Key 구조로 표현되지 않음(두 Key 모두 null 유지, 정보 자체는 존재함을 명시).
**DSP_Preset_Name**: p.14 "CS1 presets" 표 — preset option [CS1] -> CS1 preset [CS1_60](서브우퍼 용도)/[CS1_X](L1(D) 라인소스 LF 편입용), preset option [CS1_S] -> [CS1_60_S]/[CS1_X_S](수퍼카디오이드 버전).
**[3] Minimum_Distance_From_Wall_m/Minimum_Distance_Between_Stacks_m (신규 Key)**: OM p.38 "Minimum distance from the wall: CS1 configurations require a minimum distance of 1 m / 3 ft from the wall. Below this distance, rear rejection performance can be degraded." / "Minimum distance between two stacks of CS1: CS1 configurations require a minimum distance of 1.5 m / 5 ft between stacks. Below this distance, rear rejection performance can be degraded." — 카디오이드 서브우퍼의 후방 배제(rear rejection) 성능 유지에 필요한 최소 이격 거리로 이 카테고리에서 처음 등장하는 개념. 특정 제품의 물리적 부품명이 아니라 카디오이드 배치 조건이라는 브랜드 무관 범용 개념으로 판단되어 신규 Key로 추가했으나, 다른 카디오이드 가능 제품(KS28 등) 파일로의 null 역동기화는 이번 라운드에서 수행하지 않았다 — 별도 통합 작업으로 이관.
**[4] Cardioid_Capability 신규 Key(v1.1, 2026-07-17)**: 사용자 지적("CS1과 GSL 등 자체 카디오이드 내장 여부 Key가 없다")을 계기로, "단일 인클로저 자체가 카디오이드 지향성을 갖는가(built-in), 여러 대 배치가 있어야만 성립하는가(array-based)"를 구분하는 브랜드 무관 범용 Key 신설. CS1은 OM p.13 "Polar pattern" 원문("Two low frequency loudspeakers (SB) at the front. Two low cardioid loudspeakers (SC) on the sides.")으로 단일 인클로저 자체에 내장된 4드라이버 배치만으로 카디오이드/수퍼카디오이드 패턴이 성립함을 확인 — KS28(4대 어레이 중 1대 역방향 배치 필요)과 구조적으로 다름. 다른 제품 파일로의 양방향 동기화는 신규 제품 파싱 완료 후 진행 예정인 최종 동기화 라운드(TaskList #39)에서 함께 처리.
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer [1] | 4 x 21" neodymium | - |
| LF_Acoustical_Load | bass-reflex, L-Vents | - |
| Passive_Crossover_Network | No | - |
| LF_Nominal_Impedance | 8 | Ohm |
| Nominal_Impedance_Overall | null | Ohm |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_Overall | null | W |
| Peak_Power_Handling_10ms_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: CS1_OM_EN_2.0.pdf p.87 "CS1 specifications"; p.82/85 "D/R - SB speaker"/"D/R - SC speaker"(Corrective maintenance, "21" LF speaker - 8 Ω" 재확인).
**Peak_Power_Handling_10ms_Overall(신규 Key)**: d&b CCL8에서 신설된 범용 Key — RMS_Power_Handling_Overall과 동일 사유로 비적용.
**[1] LF_Transducer**: 4발 모두 물리적으로 동일한 21" neodymium 드라이버이며, 전방에 2발(SB, standard 서브우퍼 채널), 측면에 2발(SC, cardioid 채널)로 배치되어 카디오이드 패턴을 형성한다(OM p.13 "Polar pattern"). 스펙 표에도 "Transducers: 4 × 21" neodymium", "Nominal impedance: 8Ω"로 위치 구분 없는 단일값만 기재되어 있어, GSL의 `Front_LF_Transducer`/`Side_LF_Transducer`처럼 위치별 스펙 차이가 확인되지 않는 한 통합 LF_Transducer/LF_Nominal_Impedance Key로 표현한다.
**LF_Nominal_Impedance=8**: 대역이 하나뿐이라 Nominal_Impedance_Overall 대신 LF_Nominal_Impedance로 표현(KS28과 동일 근거).
**RMS_Power_Handling_LF 미확인**: OM 전문에서 "power handling"/"RMS" 키워드 전량 스캔 — 0건 검출. A&E 시방서 미제공으로 KS28처럼 별도 문서에서 확보할 경로도 없어 미확인 유지.
**Passive_Crossover_Network=No**: OM 전문에서 "crossover" 키워드 전량 스캔 — 0건 검출(KS28과 동일 근거, 단일 대역 서브우퍼이므로 크로스오버 개념 자체가 구조적으로 불필요하다는 정황과도 일치).

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 8-point PA-COM | - |
| Link_Connector | 1 x 8-point PA-COM | - |
| PA_COM_Pinout_AB | LF1 | - |
| PA_COM_Pinout_CD | LF2 | - |
| PA_COM_Pinout_EF | LF3 | - |
| PA_COM_Pinout_GH | LF4 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: CS1_OM_EN_2.0.pdf p.15 "Connectors"(Electro-acoustical description 챕터) — "CS1 / 2 × 8-point PA-COM" 커넥터 다이어그램(IN + LINK 각 1개)과 "Internal pinout for L-Acoustics active 4-channel subwoofers" 표(connector points A/B, C/D, E/F, G/H -> Transducer connectors LF1, LF2, LF3, LF4). 핀아웃 자체는 텍스트 표로 명시되어 있었으나 다이어그램 배치 확인을 위해 PowerShell+Windows.Data.Pdf로 해당 페이지를 이미지 렌더링해 재확인.
**커넥터 명칭 원문 내 불일치 발견**: 이 OM 문서 내에서 CS1의 8-point 커넥터 명칭이 "PA-COM"(p.15 다이어그램/핀아웃표 캡션, 1회)과 "CA-COM"(p.9 "SC32-4DO: SC32 connector to 4 × 8-point CA-COM", p.72 "4-channel CA-COM output" 다이어그램 제목, p.87 Specifications 표 "Connectors: IN: 8-point CA-COM" — 총 3회)으로 서로 다르게 표기되어 있다. p.9 System components 섹션은 같은 문단에서 "DO cables: PA-COM loudspeaker cables"라고 CS1에 실제 연결되는 케이블 자체를 PA-COM으로 명시하는데, 케이블과 소켓은 동일 커넥터 표준이어야 정합되므로 "CA-COM" 3회 표기가 이 매뉴얼(v2.0 "various fixes and improvements") 편집 과정의 오기일 가능성이 높다고 판단했다. 가장 상세하고 그래픽으로 직접 확인 가능한 p.15 다이어그램/핀아웃표의 "PA-COM"을 채택해 K1/K2와 동일한 `PA_COM_Pinout_*` Key 체계를 그대로 사용했다. "CA-COM" 표기 3건은 삭제하지 않고 이 각주에 원문 그대로 보존한다(데이터 충돌 보존 원칙) — 향후 L-Acoustics가 CS1부터 실제로 커넥터 규격/명칭을 개명한 것으로 확인될 경우 재검토가 필요하다.

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA12X, LA7.16, LA7.16i | - |
| Max_Enclosures_Per_Controller_Output [1] | LA7.16(i): 1 / LA12X: 2 | count |
| Max_Enclosures_Per_Controller_Total [1] | LA7.16(i): 2 / LA12X: 2 | count |
| Crossover_Type [2] | Active (1-way, subwoofer, 4-channel independent drive) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: CS1_OM_EN_2.0.pdf p.9 "System components"(Powering and driving system); p.37 "CS1 can be driven by the LA7.16(i) and LA12X amplified controllers."; p.72 "Connection to LA amplified controllers" > "Enclosure drive capacity per amplified controller" 표.
**[1] Max_Enclosures_Per_Controller_Output/Total**: p.72 표 원문 — LA7.16(i): per output 1 / total 2, LA12X: per output 2 / total 2. KS28/SB6i는 이 값들이 미확인이었으나 CS1은 OM 자체에 컨트롤러별 실값이 명시되어 있어 최초로 확보.
**[2] Crossover_Type**: OM p.15 커넥터 섹션 캡션 "Internal pinout for L-Acoustics active 4-channel subwoofers"의 "active" 표현을 반영 — 여기서 "active"는 온보드 앰프(Onboard_Amplification)를 의미하지 않고, 외부 컨트롤러가 LF1-4 4채널을 카디오이드 스티어링을 위해 각각 독립적으로 구동하는 방식을 지칭한다(K1의 "active WST enclosure" 표기와 동일한 어법).

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | flush-fitting 4-point captive rigging system, 6 handles, 2 ground runners, 8 side runners | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | 6 | count |
| Weight_Net | 180 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: CS1_OM_EN_2.0.pdf p.87 "CS1 specifications"("Rigging and handling: flush-fitting 4-point captive rigging system / 6 handles / 2 ground runners / 8 side runners", "Weight (net): 180 kg / 397 lb"); p.17 "Three ergonomic handles on each side of the enclosure"(총 6개 재확인); p.49 등 다수 "Heavy load: one CS1 weighs 180 kg"(반복 확인).
**Inter_Enclosure_Angles_deg 미확인**: OM 전문에 CS1 자체 엘리먼트 간 스플레이 각도 표(K1 등의 개별 각도 리스트)가 없음. K1-DELTA의 -10°~+10° azimuth 조정은 배열 전체의 방위각 틸트 기능이며 엘리먼트 간 스플레이 각도와는 별개 개념이므로 이 Key에 대입하지 않았다.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm [1] | 1514 | mm |
| Height_mm [1] | 1117 | mm |
| Depth_mm [1] | 588 | mm |
| Dimensions_Raw [1] | 1514 / 1117 / 588 | mm |
| Cabinet_Material | premium grade Baltic beech and birch plywood | - |
| Front_Material | coated steel grill, acoustically neutral 3D fabric | - |
| Rigging_Components_Material | high grade steel with anti-corrosion coating | - |
| Finish_Color | dark grey brown Pantone 426 C | - |
| IP_Rating | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: CS1_OM_EN_2.0.pdf p.87 "CS1 specifications"; p.88 "CS1 dimensions"(치수 도면).
**[1] Width/Height/Depth_mm 축 확정**: A&E 시방서가 없어 KS28처럼 문서 간 교차 확인은 불가했으나, p.88 도면을 PowerShell+Windows.Data.Pdf로 이미지 렌더링해 직접 판독했다 — 전면도(핸들 없는 측)에 가로 1514mm(폭), 저면/커넥터판 평면도에 588mm(깊이), 핸들이 보이는 측면 입면도에 세로 1117mm(높이)로 각각 명확히 표기되어 있어 3개 숫자와 축의 대응 관계를 확정할 수 있었다. 도면 판독은 SKILL의 "PDF 문서 분석 및 이미지 처리" 절 취지(순수 텍스트로 확인 불가능한 도면상 축 정보 확인)에 따라 예외적으로 수행했다.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| CS1 as a subwoofer (cardioid or supercardioid) | [CS1_60] / [CS1_60_S] | 25 - null | null | null |
| CS1 as an LF extension in an L1(D) line source | [CS1_X] / [CS1_X_S] | null | null | null |

### 주석 및 출처 (Notes & Sources)

**출처**: CS1_OM_EN_2.0.pdf p.37-38 "Loudspeaker configurations" 챕터 전체("CS1 as a subwoofer, using the [CS1_60]/[CS1_60_S] preset" / "CS1 as an LF extension in an L1(D) line source, using the [CS1_X]/[CS1_X_S] preset").
**행1(subwoofer) Frequency_Range_10dB_Hz 상한 미확인**: OM에 "Low frequency limit (-10 dB): 25 Hz"만 명시, 상한 없음(acoustical_performance의 Usable_Bandwidth_Hz와 동일 근거·동일 한계).
**행2(LF extension) 전체 미확인**: [CS1_X]/[CS1_X_S] 프리셋은 "CS1에 L1(D) 로우섹션과 동일한 주파수 응답을 부여한다"는 서술만 있고, CS1 자신의 OM에는 구체적 수치(주파수 범위/비율/최소길이)가 없다 — L1(D) 자신의 스펙에 종속된 값이며, L1(D)는 이 프로젝트에 아직 파싱된 파일이 없는 신규 참조 제품("flagship L Series")이라 대조할 원본도 없다.
**K1/K2/K3/L2/L2D와의 조합**: 각 제품 자신의 파일에 그 제품 관점으로 이미 기록되어 있다(예: K1_v1.9.md "K1 + CS1" 행, 2 K1 : 1 CS1) — KS28과 동일 원칙으로 CS1 자신의 파일에는 중복 기재하지 않는다.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유(조사 완료 후 확정)**: OM p.38 "Delay values: When combining a line source with subwoofers, delays may have to be added to the presets. Refer to the Preset Guide to obtain the pre-alignment delay values." — KS28과 동일하게 CS1 자신의 OM은 실제 딜레이 수치를 수록하지 않고 별도 공용 문서(`Preset_Guide_OM_EN_29.0.pdf`, `speakers/LA/References/`)를 참조하도록 명시한다. 해당 Preset Guide를 직접 재조회한 결과, K1+CS1/K2+CS1/K2+K1-SB+CS1/K3+CS1/L2·L2D+CS1 조합의 딜레이 값은 모두 각 1차 엘리먼트(K1/K2/K3/L2/L2D) 관점으로 이미 수록되어 있으며, CS1은 예외 없이 2차 엘리먼트(Secondary_Element_Delay_ms)로만 등장한다(예: K1+CS1은 K1=7.5ms/CS1=0ms, L2·L2D+CS1은 L2·L2D=0ms/CS1=4.7ms — 수치의 대소와 무관하게 역할은 항상 2차). CS1은 KS28과 달리 구조적으로 1차 엘리먼트가 될 수 있는 프리셋([CS1_X], L1(D) 라인소스 LF 편입용)을 자체적으로 보유하지만, 그 조합의 실제 딜레이 수치는 Preset Guide에도 없다 — L1(D)가 아직 이 프로젝트에 파싱되지 않은 참조 제품이라 Preset Guide의 [CS1_X] 관련 항목은 SPL 표(150dB 단독 기재)만 있고 딜레이 표 자체가 존재하지 않음을 "CS1_X" 키워드 전량 검색으로 확인했다. 따라서 비적용이 아닌 미확인으로 유지한다.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| flown | CS1-BUMP + CS1-BAR (optional) | null | 8 CS1 |
| flown | CS1-BUMP + L1CS1-RAKMOUNT + CS1-BAR | null | 2 LA-RAK III + 8 CS1 |
| flown | L1-BUMP + L1-BAR (optional) | null | 16 CS1 |
| flown | L1-BUMP + 2 CS1-BAR (optional) | null | 12 CS1 |
| flown | L1-BUMP + L1CS1-RAKMOUNT + L1-BAR | null | 4 LA-RAK III + 14 CS1 |
| ground-stacked | no rigging accessory | null | 4 |
| stacked on chariot | CS1-CHARIOT | null | 4 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor [1] | 5:1 | - |
| Max_Wind_Load | 6 | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: CS1_OM_EN_2.0.pdf p.35 "Mechanical safety > Flown configurations / Other configurations"(표 2개); p.6 Safety 섹션("If the wind force exceeds 6 bft (Beaufort scale), lower down and/or secure the product or the assembly.").
**Safe_Limit 전 항목 미확인**: CS1의 OM은 flown/기타 구성 표 모두 "maximum limit" 컬럼만 제공한다("The maximum limit gives the maximum number of elements for which the safety factor can be compliant with the 2006/42/EC: Machinery Directive..."). KS28은 원문이 "maximum/safe limit"를 단일 값으로 병기해 두 컬럼 모두 같은 수치를 채택했으나, CS1은 "safe limit" 개념 자체가 표에 없어 임의로 maximum 값을 복제하지 않고 null로 유지한다.
**[1] Safety_Factor=5**: 원문 "The flown deployments described in this manual achieve a safety factor of 5 or more." — KS28과 완전히 동일한 문장(2006/42/EC 요구 최소치 4보다 높은 안전계수).

## Null Report

**미확인(정보 부족)**: Model_Number, WEEE_Marking, Usable_Bandwidth_Hz(상한), Frequency_Response_6dB_Hz, Frequency_Response_3dB_Hz, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, Nominal_Directivity_Horizontal_deg, Nominal_Directivity_Vertical, RMS_Power_Handling_LF, Inter_Enclosure_Angles_deg, preset_guide_and_matching(subwoofer 구성 행의 Frequency_Range_10dB_Hz 상한/Recommended_Ratio/Minimum_Line_Length 3건 + LF extension 구성 행의 Frequency_Range_10dB_Hz/Recommended_Ratio/Minimum_Line_Length 3건, 총 6건), delay_defaults(전 항목, 1건 — CS1 자신의 OM/Preset Guide 모두에 [CS1_X] 조합 딜레이 수치 부재), mechanical_safety(Safe_Limit 전 항목, 1건 — 7개 구성 모두 원문에 safe limit 개념 자체 없음) — 21건.
**비적용**: Nominal_Impedance_Overall, RMS_Power_Handling_Overall, Peak_Power_Handling_10ms_Overall — 3건. (Terminal_Block_Pinout_*/SpeakON_Pinout_* 등 타 커넥터 고유 Key는 CS1 자신의 PA_COM_Pinout_*으로 이미 표현되어 애초에 생성하지 않음, null 목록에서 제외. MF_Transducer/MF_Acoustical_Load/MF_Nominal_Impedance/RMS_Power_Handling_MF/HF_Transducer/HF_Acoustical_Load/HF_Nominal_Impedance/RMS_Power_Handling_HF는 LF-only 서브우퍼 구조라 애초에 생성하지 않음, SKILL v1.19.)

**총계**: null 24건 (미확인 21건 + 비적용 3건). 확정적 비존재(0/No)로 명시한 항목은 1건 — Passive_Crossover_Network(No, OM 전문 "crossover" 키워드 0건 검출).

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — speakers 카테고리 신규 제품(이 카테고리 최초의 카디오이드 전용 대형 포맷 서브우퍼, 4 x 21" LF, 전방 SB 2발 + 측면 SC 2발). KS28_v1.5.md를 스켈레톤으로 사용, OM(CS1 owner's manual EN version 2.0) 단일 소스(A&E 시방서 미제공). 신규 Key 2개 추가(Minimum_Distance_From_Wall_m/Minimum_Distance_Between_Stacks_m — 카디오이드 후방배제 성능 유지용 최소 이격거리, 브랜드 무관 범용 개념으로 판단, 타 카디오이드 가능 제품 동기화는 별도 통합 작업으로 이관). 커넥터는 PA_COM_Pinout_AB/CD/EF/GH(K1/K2와 동일 체계, LF1-4 4채널 독립 구동) 채택 — 원문 내 "PA-COM"(다이어그램/핀아웃표, 1회)과 "CA-COM"(시스템 구성/커넥션/스펙표, 3회) 표기 불일치를 발견, 도면 기반 PA-COM을 채택하고 각주에 충돌 보존. 치수(1514/1117/588mm)는 도면 이미지 렌더링(PowerShell+Windows.Data.Pdf)으로 축 확정. Max_Enclosures_Per_Controller_Output/Total은 컨트롤러별(LA7.16(i)/LA12X) 실값 최초 확보(KS28/SB6i는 미확인이었음). delay_defaults는 CS1 자신의 OM과 Preset_Guide_OM_EN_29.0.pdf(References) 모두 재확인한 결과 [CS1_X](L1(D) 라인소스 편입) 조합의 딜레이 수치가 원본 어디에도 없어 미확인 유지(L1(D) 자체가 이 프로젝트에 아직 파싱되지 않은 참조 제품). Null Report 20건(미확인)+5건(비적용)=25건, 확정적 비존재(No) 1건(Passive_Crossover_Network). |
| v1.1 | 신규 Key `Cardioid_Capability` 추가(사용자 지적 2026-07-17) — CS1은 단일 인클로저 자체 내장형(Built-in)임을 OM p.13 "Polar pattern" 원문으로 확정. KS28_v1.6.md에도 동일 라운드로 반영(array-based). 다른 제품 파일로의 양방향 동기화는 TaskList #39에서 처리 예정. |
| v1.2 | Product_Series(L Series)/Product_Type(Cardioid subwoofer) 신규 Key 2건 추가 — CS1은 A&E 미보유라 OM 본문 Introduction 챕터("...flagship L Series...")에서 Product_Series 확인(L2/L2D와 동일 시리즈), Product_Type은 OM 자체 서술("CS1 Large Format Cardioid Subwoofer")에서 채택(사용자 지시 2026-07-17). signal_processing 섹션(CUT_Mode_Available/HFC_Function_Settings/Coupling_Function_Range, d&b 전용 개념)이 L-Acoustics 파일에 null 플레이스홀더로 잘못 추가되어 있던 것을 프로젝트 전역 동기화 라운드에서 삭제. Null Report 갱신(비적용 5건→2건, 총계 25건→22건). |
| v1.3 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-18, d&b 대량 배치 완료 후) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래, 미확인), `Peak_Power_Handling_10ms_Overall`(d&b CCL8 유래, 비적용 — RMS_Power_Handling_Overall과 동일 사유) 반영. Null Report 24건(미확인 21건+비적용 3건)으로 갱신. |
