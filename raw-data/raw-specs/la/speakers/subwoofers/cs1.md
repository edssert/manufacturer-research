# CS1 (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 4 (신규 제품 — 이 카테고리 최초의 카디오이드 전용 대형 포맷 서브우퍼)

**스켈레톤 근거**: `speakers/LA/KS28_v1.5.md`를 뼈대로 사용 — CS1도 KS28과 마찬가지로 서브우퍼(LF 전용, Way_Count=1, MF/HF 대역 없음) 아키텍처이며 외부 앰프(LA12X/LA7.16/LA7.16i) 구동 방식도 동일하다. 다만 KS28은 "standard 또는 cardioid" 중 선택 가능한 범용 서브우퍼인 반면, CS1은 4 × 21" LF 드라이버(전방 SB 2개 + 측면 SC 2개)로 처음부터 cardioid/supercardioid 두 모드만 지원하도록 설계된 대형 포맷 전용 카디오이드 서브우퍼이며, 커넥터도 KS28의 4-point speakON이 아니라 K1/K2와 동일한 8-point PA-COM 계열(4채널 독립 구동, IN+LINK 각 1개)을 사용한다. A&E 시방서는 제공되지 않아 OM(CS1 owner's manual EN version 2.0) 단일 소스 기준.

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
**Product_Series/Product_Type**: CS1은 A&E가 없어 L-Acoustics 표준 헤더 형식이 없음 — OM 본문 Introduction 챕터("...flagship L Series...")에서 Product_Series="L Series" 직접 확인(L2/L2D와 동일 시리즈). Product_Type은 OM 자체 서술("CS1 Large Format Cardioid Subwoofer")에서 "Cardioid subwoofer"로 채택.
**Way_Count=1**: 서브우퍼는 LF 단일 대역만 재생 — KS28과 동일 이유.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | 25 - null | Hz |
| Frequency_Response_6dB_Hz | null | Hz |
| Frequency_Response_3dB_Hz | null | Hz |
| Max_SPL_Peak | 150 | dB |
| Nominal_Directivity_Horizontal_deg | null | deg |
| Nominal_Directivity_Vertical | null | - |
| Cardioid_Capability | Integrated cardioid (single enclosure, 전방 SB 2개 + 측면 SC 2개 드라이버 내장 배치로 카디오이드/수퍼카디오이드 성형 — 추가 유닛이나 역방향 배치 불필요) | - |
| DSP_Preset_Name | CS1_60, CS1_60_S, CS1_X, CS1_X_S | - |
| Minimum_Distance_From_Wall_m | 1 | m |
| Minimum_Distance_Between_Stacks_m | 1.5 | m |

### 주석 및 출처 (Notes & Sources)

**출처**: CS1_OM_EN_2.0.pdf p.87 "CS1 specifications"; p.38 "CS1 as a subwoofer, using the [CS1_60] / [CS1_60_S] preset"; p.14 "CS1 presets" 표.
**Usable_Bandwidth_Hz 상한 미확인**: OM 스펙 표와 p.38 표 모두 "Low frequency limit (-10 dB): 25 Hz ([CS1_60])"만 제공하고 상한을 명시하지 않음.
**Max_SPL_Peak**: 원문 "Enclosure maximum SPL per amplified controller: 150 dB ([CS1_X])" — [CS1_X](L1(D) 라인소스 편입용 광대역 프리셋) 기준.
**Nominal_Directivity_Horizontal/Vertical**: 원문 "Nominal directivity (-6 dB): cardioid or supercardioid" — 각도(deg)가 아닌 패턴 모드 서술이라 기존 Key 구조로 표현되지 않음(정보 자체는 존재).
**DSP_Preset_Name**: p.14 "CS1 presets" 표 — preset option [CS1] -> CS1 preset [CS1_60](서브우퍼 용도)/[CS1_X](L1(D) 라인소스 LF 편입용), preset option [CS1_S] -> [CS1_60_S]/[CS1_X_S](수퍼카디오이드 버전).
**Minimum_Distance_From_Wall_m/Minimum_Distance_Between_Stacks_m**: OM p.38 — 카디오이드 서브우퍼의 후방 배제(rear rejection) 성능 유지에 필요한 최소 이격 거리.
**Cardioid_Capability=Integrated cardioid**: OM p.13 "Polar pattern"("Two low frequency loudspeakers (SB) at the front. Two low cardioid loudspeakers (SC) on the sides.") — 단일 인클로저 자체에 내장된 4드라이버 배치만으로 카디오이드/수퍼카디오이드 패턴이 성립함을 확인, KS28(4대 어레이 중 1대 역방향 배치 필요)과 구조적으로 다름.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 4 x 21" neodymium | - |
| LF_Acoustical_Load | bass-reflex, L-Vents | - |
| Passive_Crossover_Network | No | - |
| LF_Nominal_Impedance | 8 | Ohm |
| Nominal_Impedance_Overall | null | Ohm |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: CS1_OM_EN_2.0.pdf p.87 "CS1 specifications"; p.82/85 "D/R - SB speaker"/"D/R - SC speaker"(Corrective maintenance, "21" LF speaker - 8 Ω" 재확인).
**LF_Transducer**: 4개 모두 물리적으로 동일한 21" neodymium 드라이버이며, 전방에 2개(SB, standard 서브우퍼 채널), 측면에 2개(SC, cardioid 채널)로 배치되어 카디오이드 패턴을 형성한다(OM p.13 "Polar pattern").
**LF_Nominal_Impedance=8**: 대역이 하나뿐이라 Nominal_Impedance_Overall 대신 LF_Nominal_Impedance로 표현(KS28과 동일 근거).
**RMS_Power_Handling_LF 미확인**: OM 전문에서 "power handling"/"RMS" 키워드 전량 스캔 — 0건 검출. A&E 시방서 미제공으로 미확인 유지.
**Passive_Crossover_Network=No**: OM 전문에서 "crossover" 키워드 전량 스캔 — 0건 검출.

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

**출처**: CS1_OM_EN_2.0.pdf p.15 "Connectors"(Electro-acoustical description 챕터) — "CS1 / 2 × 8-point PA-COM" 커넥터 다이어그램(IN + LINK 각 1개)과 "Internal pinout for L-Acoustics active 4-channel subwoofers" 표(connector points A/B, C/D, E/F, G/H -> Transducer connectors LF1, LF2, LF3, LF4).
**커넥터 명칭 원문 내 불일치**: 이 OM 문서 내에서 CS1의 8-point 커넥터 명칭이 "PA-COM"(p.15 다이어그램/핀아웃표 캡션, 1회)과 "CA-COM"(p.9/p.72/p.87, 총 3회)으로 서로 다르게 표기되어 있다. 가장 상세하고 그래픽으로 직접 확인 가능한 p.15 다이어그램/핀아웃표의 "PA-COM"을 채택해 K1/K2와 동일한 `PA_COM_Pinout_*` Key 체계를 그대로 사용했다. "CA-COM" 표기 3건은 이 매뉴얼 편집 과정의 오기일 가능성이 높다고 판단했다.

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA12X, LA7.16, LA7.16i | - |
| Max_Enclosures_Per_Controller_Output | LA7.16(i): 1 / LA12X: 2 | count |
| Max_Enclosures_Per_Controller_Total | LA7.16(i): 2 / LA12X: 2 | count |
| Crossover_Type | Active (1-way, subwoofer, 4-channel independent drive) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: CS1_OM_EN_2.0.pdf p.9 "System components"; p.37 "CS1 can be driven by the LA7.16(i) and LA12X amplified controllers."; p.72 "Enclosure drive capacity per amplified controller" 표.
**Crossover_Type**: OM p.15 커넥터 섹션 캡션 "Internal pinout for L-Acoustics active 4-channel subwoofers"의 "active" 표현을 반영 — 외부 컨트롤러가 LF1-4 4채널을 카디오이드 스티어링을 위해 각각 독립적으로 구동하는 방식을 지칭.

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | flush-fitting 4-point captive rigging system, 6 handles, 2 ground runners, 8 side runners | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | 6 | count |
| Weight_Net | 180 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: CS1_OM_EN_2.0.pdf p.87 "CS1 specifications"("Rigging and handling"; "Weight (net): 180 kg / 397 lb"); p.17 "Three ergonomic handles on each side of the enclosure"(총 6개 재확인).

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 1514 | mm |
| Height_mm | 1117 | mm |
| Depth_mm | 588 | mm |
| Cabinet_Material | premium grade Baltic beech and birch plywood | - |
| Front_Material | coated steel grill, acoustically neutral 3D fabric | - |
| Rigging_Components_Material | high grade steel with anti-corrosion coating | - |
| Finish_Color | dark grey brown Pantone 426 C | - |
| IP_Rating | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: CS1_OM_EN_2.0.pdf p.87 "CS1 specifications"; p.88 "CS1 dimensions"(치수 도면).
**Width/Height/Depth_mm 축 확정**: p.88 도면을 이미지 렌더링해 직접 판독 — 전면도(핸들 없는 측)에 가로 1514mm(폭), 저면/커넥터판 평면도에 588mm(깊이), 핸들이 보이는 측면 입면도에 세로 1117mm(높이)로 각각 명확히 표기.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| CS1 as a subwoofer (cardioid or supercardioid) | [CS1_60] / [CS1_60_S] | 25 - null | null | null |
| CS1 as an LF extension in an L1(D) line source | [CS1_X] / [CS1_X_S] | null | null | null |

### 주석 및 출처 (Notes & Sources)

**출처**: CS1_OM_EN_2.0.pdf p.37-38 "Loudspeaker configurations" 챕터.
**행2(LF extension) 전체 미확인**: [CS1_X]/[CS1_X_S] 프리셋은 L1(D) 로우섹션과 동일한 주파수 응답을 부여한다는 서술만 있고 구체적 수치가 없음 — L1(D)는 이 프로젝트에 파싱된 파일이 없는 신규 참조 제품.
**K1/K2/K3/L2/L2D와의 조합**: 각 제품 자신의 파일에 그 제품 관점으로 이미 기록되어 있다(예: K1 "K1 + CS1" 행, 2 K1 : 1 CS1).

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: OM p.38 "Refer to the Preset Guide to obtain the pre-alignment delay values." — CS1은 예외 없이 2차 엘리먼트(Secondary_Element_Delay_ms)로만 등장한다(예: K1+CS1은 K1=7.5ms/CS1=0ms). CS1 자체가 1차 엘리먼트가 되는 [CS1_X] 조합의 실제 딜레이 수치는 Preset Guide에도 없음(L1(D)가 아직 파싱되지 않은 참조 제품).

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
| Safety_Factor | 5:1 | - |
| Max_Wind_Load | 6 | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: CS1_OM_EN_2.0.pdf p.35 "Mechanical safety > Flown configurations / Other configurations"; p.6 Safety 섹션.
**Safe_Limit 전 항목 미확인**: CS1의 OM은 "maximum limit" 컬럼만 제공한다 — "safe limit" 개념 자체가 표에 없어 null로 유지.
**Safety_Factor=5**: 원문 "The flown deployments described in this manual achieve a safety factor of 5 or more."

## Null Report

**미확인**: Model_Number, WEEE_Marking, Usable_Bandwidth_Hz(상한), Frequency_Response_5/4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, Nominal_Directivity_Horizontal_deg, Nominal_Directivity_Vertical, RMS_Power_Handling_LF, Inter_Enclosure_Angles_deg, preset_guide_and_matching(6건), delay_defaults, mechanical_safety(Safe_Limit 전 항목) — 21건.
**비적용**: Nominal_Impedance_Overall, RMS_Power_Handling_Overall, Peak_Power_Handling_10ms_Overall — 3건.

**총계**: null 24건(미확인 21건 + 비적용 3건). 확정적 비존재(No): Passive_Crossover_Network 1건.

---

**[MR_v1.8 반영 메모]**: 이 파일은 `upload/CS1_v1.3.md`를 이 저장소의 raw-spec으로 이관한 것이다(기존 역재구성본을 대체, 원본 파일 자체는 없어 폴더화하지 않음). `public/js/domains/speakers/data/la/subwoofers.data.js`에 Cardioid_Capability/PA-COM Pinout/Preset Guide/Mechanical Safety를 신규 반영했다. **확인**: transducers 필드의 "LC: 2×21″ · LF: 2×21″"는 제조사 스펙 표(CS1_OM_EN_2.0.pdf) 표기 그대로이며 오기가 아니다(LC=측면 SC 채널, LF=전방 SB 채널) — 변경 없이 유지. connectors "8-point CA-COM" → "8-point PA-COM"(원문 다이어그램 기준)으로 정정, dims 축 순서(W x D x H로 뒤섞여 있던 것) → W x H x D(1514 x 1117 x 588mm)로 정정, lowQty 2 → 4(실제 트랜스듀서 총수 기준).
