# Soka (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(신규 제품, 초박형 medium throw colinear source)

**스켈레톤 근거**: `speakers/LA/X4i_v1.2.md`를 뼈대로 사용 — Soka는 X4i처럼 소형 설치용 2-way 패시브 단일채널 인클로저이며 EN 62368-1:2014 준수, terminal block 커넥터, SB6i/SB10i 조합형 preset_guide/delay_defaults 구조까지 아키텍처가 가장 유사하다(자체 OM p.14 "Internal pinout for L-Acoustics 2-way passive enclosures" 표로 확인). X4i와의 차이: (1) 커넥터가 screw terminal이 아니라 X6i/X8i와 같은 **4-point terminal block(push-in)**이라 신규 Screw_Terminal_Pinout_* 대신 Terminal_Block_Pinout_*을 사용, (2) 드라이버 구성이 9 x 3.5" + 3 x 1"인 "ultra-shallow colinear source"(초박형 99mm 깊이, 1064mm 높이의 세로형 컬럼) 폼팩터로 X4i의 소형 동축 포인트소스와 물리적으로 다름, (3) 프리셋명이 [SOKA]/[SOKA_60]/[SOKA_200](제품명 그대로) 구조.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | Soka | - |
| Model_Number | null | - |
| Product_Series | null | - |
| Product_Category | medium throw ultra-shallow colinear source | - |
| Product_Type | Ultra-shallow colinear source | - |
| Description | 2-way passive colinear enclosure: 9 x 3.5" LF neodymium cone drivers + 3 x 1" HF diaphragm compression drivers, amplified by LA2Xi / LA4X / LA7.16i / LA12X | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | EN 62368-1:2014 Audio/video, information and communication technology equipment — Part 1: Safety requirements | - |
| WEEE_Marking | Yes (EU) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Soka_OM_EN.pdf(Soka owner's manual EN version 3.0) p.9 "System components", p.94 "Soka specifications", p.6 "Safety > Instructions"(Compliance_Standards/WEEE_Marking); Soka_AE_EN.docx.
**Product_Series/Product_Type(신규 Key, 사용자 지시 2026-07-17)**: Soka_AE_EN.docx 최상단 헤더("SOKa - ULTRA-SHALLOW colinear source", 시리즈명 줄 없이 바로 "Medium throw loudspeaker: 35 m"로 이어짐 — Syva(동일 colinear 계열)는 "S Series" 줄이 있는 것과 대조적) — Product_Type="Ultra-shallow colinear source"(대문자 강조 정규화), Product_Series는 원문에 시리즈명 자체가 없어 null(Syva와의 비대칭을 임의로 통일하지 않음).
**Product_Category**: OM Introduction 챕터 제목("Soka ultra-shallow colinear source")과 AE의 "Medium throw loudspeaker: 35 m" 서술을 결합해 채택 — Way_Count=2의 소형 포인트소스(X4i 등)와 달리 세로형 컬럼(1064mm 높이)의 "colinear source" 폼팩터.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz [1] | [SOKA_60]: 60 - 20000 / [SOKA]: 100 - 20000 / [SOKA_200]: 200 - 20000 | Hz |
| Frequency_Response_6dB_Hz [1] | [SOKA_60]: 70 - 20000 / [SOKA]: 115 - 20000 / [SOKA_200]: 250 - 20000 | Hz |
| Frequency_Response_3dB_Hz [1] | [SOKA_60]: 100 - 20000 / [SOKA]: 135 - 20000 / [SOKA_200]: 300 - 20000 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak [2] | [SOKA_60]: 124 dB / [SOKA]: 130 dB / [SOKA_200]: 133 dB (with LA2Xi bridge mode/LA4X/LA7.16i/LA12X) | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | 140 | deg |
| Nominal_Directivity_Vertical [3] | +5/-21 (J-shape, > 2 kHz) | deg |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | SOKA_60, SOKA, SOKA_200 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Soka_OM_EN.pdf p.94 "Soka specifications", p.11 "Directivity"; Soka_AE_EN.docx "Technical requirements".
**[1] 프리셋별 3단계 대역폭**: OM 스펙 표와 AE 시방서 양쪽 모두 [SOKA_60]/[SOKA]/[SOKA_200] 3개 프리셋별로 -10dB/-6dB/-3dB 임계값을 동일하게 제공 — 완전 일치 교차 확인.
**[2] Max_SPL_Peak 앰프별 2단계**: 원문 "with LA2Xi (bridge mode)/LA4X/LA7.16i/LA12X: 124/130/133dB" vs "with LA2Xi: 124/128/130dB" — SOKA_60 프리셋은 두 조건이 동일(124dB)하나 SOKA/SOKA_200은 LA2Xi 비-브릿지 조건에서 2-3dB 낮음. 대표값은 다수 앰프 조건과 일치하는 브릿지/LA4X/LA7.16i/LA12X 값을 채택.
**[3] Nominal_Directivity_Vertical 비대칭**: 원문 "+5°/-21° in J-shape (> 2 kHz)" — 상하 비대칭 J자형 지향 패턴(2kHz 이상 주파수에서 유효), K1의 이중 개념 표기 관례를 따라 원문 그대로 병기.
**Cardioid_Capability=No(확정적 비존재)**: Soka_OM_EN.pdf/Soka_AE_EN.docx 전량을 "cardioid" 키워드로 스캔 — 0건 검출. 카디오이드 프리셋/배치 옵션 자체가 없는 표준 지향성 전용 제품으로 판정(CS1/KS28과 구분, 사용자 지적 2026-07-17로 신설된 Key 최초 적용 사례 중 하나).
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer [1] | 9 x 3.5" neodymium cone driver | - |
| HF_Transducer | 3 x 1" neodymium diaphragm compression driver | - |
| LF_Acoustical_Load | closed enclosure | - |
| HF_Acoustical_Load | conical waveguide, L-Fins | - |
| Passive_Crossover_Network | Yes | - |
| LF_Nominal_Impedance | null | Ohm |
| HF_Nominal_Impedance | null | Ohm |
| Nominal_Impedance_Overall | 8 | Ohm |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_HF | null | W |
| RMS_Power_Handling_Overall | 133 | W |
| Peak_Power_Handling_10ms_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: Soka_OM_EN.pdf p.94 "Soka specifications"("Transducers: LF: 9 x 3.5" neodymium cone driver / HF: 3 x 1" neodymium"); Soka_AE_EN.docx "Technical requirements".
**[1] LF_Transducer 소스 간 명명 충돌**: Soka_OM_EN.pdf(스펙 표 및 electro-acoustical description 본문 "nine 3.5" neodymium LF speakers")는 이 드라이버를 명확히 **LF**로 명명하는 반면, Soka_AE_EN.docx는 동일 드라이버를 "MF transducer"로 서술 — 물리적으로 동일한 9발 3.5" 드라이버를 가리키나 대역 명칭이 소스 간 정확히 반대다. L-Acoustics 브랜드 OM 우선 원칙(SKILL 출력 포맷 규칙)에 따라 OM의 "LF" 명명을 채택하고 AE의 "MF" 표기는 이 각주에 보존(데이터 충돌 보존 원칙) — 임의로 조용히 병합하지 않음.
**RMS_Power_Handling_Overall=133W**: AE 시방서 "RMS power handling (Calculated using the mean impedance measured on the usable bandwidth): 133 W" — LF/HF 대역별 분리 없이 통합값만 제공.
**Peak_Power_Handling_10ms_Overall(신규 Key)**: d&b CCL8에서 신설된 범용 Key(10ms 피크 파워 핸들링, 업계 표준 측정 조건) — 이 제품 자신의 RMS_Power_Handling_Overall은 실값을 보유하나 이번 일괄 동기화 라운드에서는 원본을 재조회하지 않고 소급 반영했으므로 미확인으로 유지(원본성 요건, LA12X 브릿징 Key 판단 사례와 동일 원칙).

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 4-point terminal block with push-in connection (IN/LINK interchangeable) | - |
| Link_Connector | 1 x 4-point terminal block with push-in connection (IN/LINK interchangeable) | - |
| Terminal_Block_Pinout_1 | + / - (combined LF+HF signal, internally split by passive crossover) | - |
| Terminal_Block_Pinout_2 | Not linked | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Soka_OM_EN.pdf p.14 "Connectors"("Internal pinout for L-Acoustics 2-way passive enclosures" — "Screw terminal points IN +/IN -"); Soka_AE_EN.docx "Connectors: 1 x 4-point terminal block with push-in connection".
**IN/LINK 상호 교환**: OM 커넥터 다이어그램에 "IN"과 "LINK" 두 케이블 글랜드가 표기되나 스펙 표는 "1 x 4-point terminal block"(단수)만 명시 — KS21i와 동일하게 하나의 터미널 블록을 IN/LINK 겸용으로 사용하는 구조로 판단.
**"Screw terminal points" 문구와 커넥터 종류 구분**: pinout 표의 "Screw terminal points"는 단자 블록 내부 나사 접점을 가리키는 일반 명칭이며, X4i의 독립형 "screw terminal" 커넥터(신규 Screw_Terminal_Pinout_* Key)와는 다른 개념 — Soka의 실제 커넥터는 스펙 표에 명시된 대로 "4-point terminal block with push-in connection"이므로 Terminal_Block_Pinout_*로 표현.

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA2Xi, LA4X, LA7.16i, LA12X | - |
| Max_Enclosures_Per_Controller_Output [1] | LA2Xi: 1(SE)/1(BTL) / LA4X: 2 / LA7.16i: 1 / LA12X: 3 | count |
| Max_Enclosures_Per_Controller_Total [1] | LA2Xi: 4(SE)/2(BTL) / LA4X: 8 / LA7.16i: 16 / LA12X: 12 | count |
| Crossover_Type | Passive (2-way) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Soka_OM_EN.pdf "The Soka enclosure is driven by the LA2Xi / LA4X / LA7.16i / LA12X amplified controllers"; p.연결 챕터 "Enclosure drive capacity per amplified controller" 표.
**[1] 앰프별 전체 구동 대수 표**: 원문이 4개 앰프 각각의 output당/전체 대수를 모두 명시하는 완전한 표를 제공(SB15m/SB10i 파싱 라운드와 동일하게 원문에 실값이 있으면 단일 대표값으로 축약하지 않고 전체 병기) — LA2Xi는 SE(단일단)/BTL(브릿지) 모드별로 다시 나뉨.

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | 6 x M6 inserts for external rigging and safety | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | null | count |
| Weight_Net | 9.4 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: Soka_OM_EN.pdf p.94 "Soka specifications"("Rigging and handling: 6 M6 inserts for external rigging and safety", "Weight (net): 9.4 kg").
**Handles 미확인**: 원문에 handle 개수 서술 없음(X4i처럼 "0건 확정"으로 판단할 만한 명시적 스캔 근거도 없어 미확인으로 유지 — 초박형 컬럼 인클로저 특성상 핸들이 없을 가능성이 높으나 확정하지 않음).
**Inter_Enclosure_Angles_deg**: Soka는 단일 유닛 전용 배치("All the mechanical configurations described in this manual are destined to mount a single Soka")이며 여러 유닛 간 각도 조정 개념 자체가 원문에 없음 — 미확인.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 99 | mm |
| Height_mm | 1064 | mm |
| Depth_mm | 99 | mm |
| Dimensions_Raw [1] | 99 / 1064 / 99 / 104.2 | mm |
| Cabinet_Material | premium grade Baltic beech and birch plywood | - |
| Front_Material | coated steel grill, acoustically neutral 3D fabric | - |
| Rigging_Components_Material | null | - |
| Finish_Color | dark grey brown Pantone 426 C, pure white RAL 9010, custom RAL code on special order | - |
| IP_Rating | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Soka_OM_EN.pdf p.95 "Soka dimensions"(치수 도면); Soka_AE_EN.docx "Physical data" - "Dimensions (W, H, D): 99 mm, 1065 mm, 99 mm"(AE는 높이 1065mm로 도면의 1064mm와 1mm 오차 — 원문 그대로 병기, 임의 반올림하지 않음).
**[1] Dimensions_Raw**: 도면 4개 숫자 중 99/1064/99는 W/H/D와 일치, 104.2mm는 후면 리깅 인서트 관련 부가 치수로 추정(SB6r 등 유사 사례와 동일 패턴).
**Cabinet_Material 표기 차이**: OM은 "Baltic beech and birch plywood", 대부분의 타 제품은 "Baltic birch plywood"만 명시 — 원문 그대로 채택(SB6i 계열과 동일하게 beech 포함).

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| Soka colinear source (단독) | [SOKA] | 100 - 20000 | null | null |
| Soka with SB6i, closely coupled(200Hz) | [SOKA_200] + [SB6_200] | 32 - 20000 | 1 Soka : 2 SB6i | null |
| Soka with SB6i, coupled(100Hz) | [SOKA] + [SB6_100] | 29 - 20000 | 1 Soka : 2 SB6i | null |
| Soka with SB6i, separated(60Hz) | [SOKA_60] + [SB6_60] | 29 - 20000 | 1 Soka : 2 SB6i | null |
| Soka with SB10i, closely coupled(200Hz) | [SOKA_200] + [SB10_200] | 29 - 20000 | 1 Soka : 2 SB10i | null |
| Soka with SB10i, coupled(100Hz) | [SOKA] + [SB10_100] | 27 - 20000 | 1 Soka : 2 SB10i | null |
| Soka with SB10i, separated(60Hz) | [SOKA_60] + [SB10_60] | 25 - 20000 | 1 Soka : 1 SB10i | null |

### 주석 및 출처 (Notes & Sources)

**출처**: Soka_OM_EN.pdf p.27-33 "Loudspeaker configurations"("Soka colinear source" p.27, "Soka ultra-shallow colinear source with low-frequency element" — "Soka with SB6i" p.28-30, "Soka with SB10i" p.31-33) — SB6i/SB10i 각 3단계(closely coupled/coupled/separated) 조합 전량 조사.
**Minimum_Line_Length 전 행 미확인**: 원문은 이 조합들에 대해 "Recommended ratio"만 제공하고 최소 라인 길이 개념 자체가 없음(Soka는 단일 유닛 배치 전용이라 배열 최소 길이 개념이 구조적으로 성립하지 않음).

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| [SOKA_200] + [SB6_200] | 1.9 | SB6i = 0 | Soka = + / SB6i = + |
| [SOKA] + [SB6_100] | 1.4 | SB6i = 0 | Soka = + / SB6i = + |
| [SOKA_60] + [SB6_60] | 3.6 | SB6i = 0 | Soka = + / SB6i = − |
| [SOKA_200] + [SB10_200] | 3.2 | SB10i = 0 | Soka = + / SB10i = + |
| [SOKA] + [SB10_100] | 2.6 | SB10i = 0 | Soka = + / SB10i = + |
| [SOKA_60] + [SB10_60] | 9 | SB10i = 0 | Soka = + / SB10i = − |

### 주석 및 출처 (Notes & Sources)

**출처**: Soka_OM_EN.pdf p.29(SB6i closely coupled/coupled), p.30(SB6i separated), p.31(SB10i closely coupled), p.32(SB10i coupled), p.33(SB10i separated) "Pre-alignment delays" 표 — 딜레이 수치는 텍스트로 확인, Polarity는 5개 페이지 전부 PowerShell+Windows.Data.Pdf로 이미지 렌더링해 회색 "+"/빨간 "-" 아이콘을 전부 육안 확인.
**패턴**: Soka는 모든 조합에서 항상 정상(+). SB6i/SB10i 둘 다 closely coupled/coupled(200Hz/100Hz 프리셋)에서는 정상(+), separated(60Hz 프리셋)에서만 반전(-) — X4i/X6i와 유사하되 closely coupled에서도 반전되는 X4i의 SB6_200 조합과는 다른 패턴(제품별로 상이, 임의 일반화하지 않고 원문 그대로 기록).

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| wall-mounted | Soka-onW | 1 | 1 |
| wall-mounted | TILT-SUPPORT + TILT5 + PAN (optional) | 1 | 1 |
| wall-mounted | WALLx2 | 1 | 1 |
| wall-mounted | PANx2 | 1 | 1 |
| ceiling-mounted / flown | VBAR | 1 | 1 |
| pole-mounted | POLE | 1 | 1 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 5:1 | - |
| Max_Wind_Load | null | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: Soka_OM_EN.pdf p.25 "Mechanical safety > Flown configurations"("The Soka rigging system complies with EN 62368-1: 2014...", "achieve a safety factor of 5", "Safe/maximum limit: 1 — All the mechanical configurations described in this manual are destined to mount a single Soka").
**전 구성 Safe/Maximum_Limit=1**: 원문이 모든 리깅 액세서리 조합에 대해 "단일 Soka 장착 전용"임을 명시적으로 서술 — X4i 등 소형 설치 제품과 동일 패턴.
**Max_Wind_Load 미확인**: 원문 전량 검색으로도 풍하중 수치 미발견(X4i/X6i와 동일 사유).

## Null Report

**미확인(정보 부족)**: Model_Number, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, LF_Nominal_Impedance, HF_Nominal_Impedance(단일 통합값만 존재), RMS_Power_Handling_LF/HF(단일 통합값만 존재), Peak_Power_Handling_10ms_Overall, Handles, Inter_Enclosure_Angles_deg, Rigging_Components_Material, Max_Wind_Load, preset_guide_and_matching(Minimum_Line_Length 전 7행 + 단독 구성(Soka colinear source)의 Recommended_Ratio 1건=8건) — 21건.
**비적용**: 없음 — 0건. (PA_COM_Pinout_*/SpeakON_Pinout_*/Screw_Terminal_Pinout_* 등 타 커넥터 고유 Key는 Soka 자신의 Terminal_Block_Pinout_*으로 이미 표현되어 애초에 생성하지 않음, null 목록에서 제외.)

**총계**: null 21건 (미확인 21건 + 비적용 0건). 확정적 비존재(0/No)로 명시한 항목은 1건 — Cardioid_Capability(No, 원문 전량 스캔 근거). **v1.2 정정(2026-07-18, 각주 버전 참조 최신성 감사 중 발견)**: preset_guide_and_matching의 null 셀이 표 위 각주("Minimum_Line_Length 전 행 미확인")에만 서술되고 Null Report 미확인 목록 자체에는 전혀 반영되지 않아 총계 산정에서 완전히 누락되어 있던 것을 발견(K1_v1.11.md/L2_v1.7.md와 같은 결합형 불릿 오카운트의 극단형 — 1건으로 축약되는 대신 0건으로 누락). 실제로는 Minimum_Line_Length가 7개 Configuration 행 전부에서 null이고, 추가로 "Soka colinear source"(단독) 행은 SB6i/SB10i 짝이 없어 Recommended_Ratio도 null이므로 7+1=8개의 개별 null 셀이다. 미확인 11건→19건, 총계 11건→19건으로 재계산. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — speakers 카테고리 신규 제품(초박형 medium throw colinear source, 9 x 3.5" LF + 3 x 1" HF). X4i_v1.2.md를 스켈레톤으로 사용, OM(Soka owner's manual EN version 3.0) + Soka_AE_EN.docx 통합. LF_Transducer 소스 간 명명 충돌 발견(OM="LF", AE="MF") 및 OM 우선 원칙으로 해결(양쪽 값 보존). preset_guide_and_matching/delay_defaults는 SB6i/SB10i 각 3단계(closely coupled/coupled/separated) 조합 6개 전부 원문 직접 조사로 실값 확보(극성 5개 페이지 전부 이미지 렌더링). 신규 Key `Cardioid_Capability` 최초 적용(No, 원문 전량 스캔 근거) — CS1/GSL8/GSL12와 함께 이번 라운드에 신설된 Key. |
| v1.1 | 프로젝트 전역 동기화 라운드(사용자 지시 2026-07-17). Product_Series(null)/Product_Type(Ultra-shallow colinear source) Key 신설 — Soka_AE_EN.docx 최상단 헤더("SOKa - ULTRA-SHALLOW colinear source") 기준, 시리즈명 줄이 없어(Syva는 "S Series" 줄 존재, Soka와 대조) Product_Series는 null(임의 통일하지 않음). d&b 고유 개념인 signal_processing 섹션(CUT_Mode_Available/HFC_Function_Settings/Coupling_Function_Range) 삭제 — L-Acoustics 제품에는 해당 개념 자체가 없어 비적용 표기에서 섹션 삭제로 정리. null 총계 14건(비적용 3건)에서 11건(비적용 0건)으로 갱신. |
| v1.1 to v1.2 | (표기 정정, Minor) 각주 버전 참조 최신성 감사(2026-07-18)에서 preset_guide_and_matching의 null 셀이 표 위 각주에만 서술되고 Null Report 미확인 목록에는 전혀 반영되지 않아 총계에서 완전히 누락되어 있던 것을 발견·정정(K1_v1.11.md/L2_v1.7.md와 같은 결합형 불릿 오카운트의 극단형). 실제로는 Minimum_Line_Length 7행 + 단독 구성의 Recommended_Ratio 1건=8개 셀. 미확인 11건→19건, 총계 11건→19건으로 재계산. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다. |
| v1.4 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-18, d&b 대량 배치 완료 후) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래), `Peak_Power_Handling_10ms_Overall`(d&b CCL8 유래) 둘 다 미확인으로 반영. Null Report 21건(미확인 21건+비적용 0건)으로 갱신. |
