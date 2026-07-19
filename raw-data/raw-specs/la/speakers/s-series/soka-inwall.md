# Sokar (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(Soka의 매입형/recessed 파생형)

**스켈레톤 근거**: Sokar는 Soka의 매입형(in-wall) 버전으로, 자체 OM(Sokar owner's manual EN version 1.0) 도입부가 "Sokar ultra-shallow colinear source"로 Soka와 동일 제품군임을 명시하고, 음향/전기 스펙(대역폭/SPL/지향각/트랜스듀서/임피던스/커넥터)이 Sokar 자신의 스펙 표(p.38 "Sokar specifications")에서 Soka와 완전히 동일하게 독립 확인된다. A&E 시방서는 제공되지 않아 OM 단일 소스 기준. 차이점은 매입형 특성(중량 8.7kg vs 9.4kg, 단일 마감색상, Sokar-inW/Soka-Screen 전용 액세서리)뿐이다.

**이 앱에서의 표시명**: 이 프로젝트 데이터베이스에서는 이 제품을 "Soka inWall"로 표시한다(카드 id: `spk-la-soka-inwall`). L-Acoustics의 정식 제품명은 "Sokar"이며, 이하 이 문서는 원문 그대로 Sokar로 표기한다.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | Sokar | - |
| Model_Number | null | - |
| Product_Series | null | - |
| Product_Category | medium throw ultra-shallow colinear source (recessed version) | - |
| Product_Type | Ultra-shallow colinear source | - |
| Description | 2-way passive colinear enclosure (recessed version): 9 x 3.5" LF neodymium cone drivers + 3 x 1" HF diaphragm compression drivers, amplified by LA2Xi / LA4X / LA7.16i / LA12X | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | EN 62368-1:2014 Audio/video, information and communication technology equipment — Part 1: Safety requirements | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Sokar_OM_EN.pdf(Sokar owner's manual EN version 1.0) p.9 "System components", p.38 "Sokar specifications", p.5 "Safety > Instructions"(Compliance_Standards). A&E 시방서 미제공.
**Product_Series/Product_Type**: Sokar 자신은 A&E가 없어, Soka_AE_EN.docx 헤더("SOKa - ULTRA-SHALLOW colinear source", 시리즈명 줄 없음)를 install/recessed 상속 정책과 동일 근거로 적용 — Product_Type="Ultra-shallow colinear source", Product_Series는 Soka도 null이라 상속할 값 없음.
**WEEE_Marking 미확인**: Soka와 달리 Sokar의 Safety > Instructions 챕터에서 WEEE 마킹 관련 문구를 확인하지 못함(원문 페이지 수가 Soka보다 짧음) — 미확인 유지, Soka의 값(Yes)을 임의로 끌어오지 않음.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | [SOKA_60]: 60 - 20000 / [SOKA]: 100 - 20000 / [SOKA_200]: 200 - 20000 | Hz |
| Frequency_Response_6dB_Hz [2] | [SOKA_60]: 70 - 20000 / [SOKA]: 115 - 20000 / [SOKA_200]: 250 - 20000 | Hz |
| Frequency_Response_3dB_Hz [2] | [SOKA_60]: 100 - 20000 / [SOKA]: 135 - 20000 / [SOKA_200]: 300 - 20000 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak [1] | [SOKA_60]: 124 dB / [SOKA]: 130 dB / [SOKA_200]: 133 dB (with LA2Xi bridge mode/LA4X/LA7.16i/LA12X) | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | 140 | deg |
| Nominal_Directivity_Vertical | +5/-21 (J-shape, > 2 kHz) | deg |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | SOKA_60, SOKA, SOKA_200 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Sokar_OM_EN.pdf p.38 "Sokar specifications", p.11 "Directivity".
**[1] Max_SPL_Peak**: Soka와 완전 동일값(124/130/133dB) — Sokar 자신의 스펙 표에서 독립 재확인.
**Frequency_Response_6dB/3dB_Hz 미확인**: A&E 시방서가 없어(Soka는 AE로 6dB/3dB 임계값 확보) 이 두 세부 임계값은 Sokar 자신의 OM 스펙 표에 없음 — Soka의 값(6dB: 70/115/250, 3dB: 100/135/300)을 끌어오지 않고 정직하게 미확인 유지. **[2] 사용자 정책(2026-07-18) 적용**: install/recessed 버전이 표준형과 치수·무게 외 특이사항이 없다면 드라이버·인클로저 구성이 동일 스펙이므로 상속 가능 — Sokar와 Soka는 6개 항목이 완전 동일함이 독립 확인되어 있어 이 3개 Key도 Soka의 값을 채택.
**Cardioid_Capability=No(확정적 비존재)**: Sokar_OM_EN.pdf 전량을 "cardioid" 키워드로 스캔 — 0건 검출.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 9 x 3.5" neodymium cone driver | - |
| HF_Transducer | 3 x 1" neodymium diaphragm compression driver | - |
| LF_Acoustical_Load | closed enclosure | - |
| HF_Acoustical_Load | conical waveguide, L-Fins | - |
| Passive_Crossover_Network | Yes | - |
| LF_Nominal_Impedance | null | Ohm |
| HF_Nominal_Impedance | null | Ohm |
| Nominal_Impedance_Overall | 8 | Ohm |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_HF | null | W |
| RMS_Power_Handling_Overall [2] | 133 | W |
| Peak_Power_Handling_10ms_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: Sokar_OM_EN.pdf p.38 "Sokar specifications"("Transducers: LF: 9 x 3.5" neodymium cone driver / HF: 3 x 1" neodymium").
**[2] RMS_Power_Handling_Overall = Soka 값 상속**: Sokar 자신의 OM에는 파워 핸들링 항목 자체가 없어 Soka_v1.0.md의 값(133W)을 채택(상세 근거는 general 섹션 [2] 각주 참고).
**Peak_Power_Handling_10ms_Overall(신규 Key)**: d&b CCL8에서 신설된 범용 Key — RMS_Power_Handling_Overall은 실값을 보유하나 이번 일괄 동기화 라운드에서는 원본을 재조회하지 않아 미확인으로 유지.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 4-point terminal block with push-in connection (IN/LINK interchangeable) | - |
| Link_Connector | 1 x 4-point terminal block with push-in connection (IN/LINK interchangeable) | - |
| Terminal_Block_Pinout_1 | + / - (combined LF+HF signal, internally split by passive crossover) | - |
| Terminal_Block_Pinout_2 | Not linked | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Sokar_OM_EN.pdf p.12 "Connectors"("Internal pinout for L-Acoustics 2-way passive enclosures" — Soka와 동일 구조).

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA2Xi, LA4X, LA7.16i, LA12X | - |
| Max_Enclosures_Per_Controller_Output | LA2Xi: 1(SE)/1(BTL) / LA4X: 2 / LA7.16i: 1 / LA12X: 3 | count |
| Max_Enclosures_Per_Controller_Total | LA2Xi: 4(SE)/2(BTL) / LA4X: 8 / LA7.16i: 16 / LA12X: 12 | count |
| Crossover_Type | Passive (2-way) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Sokar_OM_EN.pdf "Enclosure drive capacity per amplified controller" 표 — Soka와 완전 동일값, Sokar 자신의 표에서 독립 재확인.

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | Sokar-inW(매입 프레임) + Soka-Screen(음향 투과 스크린) | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | null | count |
| Weight_Net | 8.7 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: Sokar_OM_EN.pdf p.38 "Sokar specifications"("Weight (net): 8.7 kg"); p.14 "Rigging system description"(Sokar-inW/Soka-Screen).
**Weight_Net**: Soka(9.4kg)보다 가벼움 — 매입형이라 전면 그릴 등 일부 부품이 없는 것으로 추정.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 99 | mm |
| Height_mm | 1064 | mm |
| Depth_mm | 99 | mm |
| Dimensions_Raw [1] | 99 / 1064 / 99 / 104.2 | mm |
| Cabinet_Material | premium grade Baltic beech and birch plywood | - |
| Front_Material | null | - |
| Rigging_Components_Material | null | - |
| Finish_Color | dark grey brown Pantone 426 C | - |
| IP_Rating [2] | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Sokar_OM_EN.pdf p.39 "Sokar dimensions"(치수 도면, Soka와 완전 동일 수치), p.38 "Sokar specifications".
**[1] Width/Height/Depth_mm 축 확정**: Soka와 동일 도면 수치(99/1064/99/104.2mm) — Sokar 자신의 도면에서 독립 확인.
**Front_Material 비적용 사유**: 매입형(recessed) 제품이라 전면 그릴/패브릭 스펙이 원문 표에서 빠짐(Soka-Screen이 별도 액세서리로 그 역할을 대신함).
**Finish_Color 단순화**: Soka는 3가지 마감을 제공하나 Sokar는 원문에 "dark grey brown Pantone 426 C" 1가지만 명시.
**[2] IP_Rating 조건부**: OM 각주 "When integrated in-wall or in-ceiling with screen and connector sealing plate" — Soka와 동일 조건부 표기.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| Sokar colinear source (단독) | [SOKA] | null | null | null |
| Sokar with SB6r, closely coupled(200Hz) | [SOKA_200] + [SB6_200] | 32 - 20000 | 1 Sokar : 2 SB6r | null |
| Sokar with SB6r, coupled(100Hz) | [SOKA] + [SB6_100] | 29 - 20000 | 1 Sokar : 2 SB6r | null |
| Sokar with SB6r, separated(60Hz) | [SOKA_60] + [SB6_60] | 29 - 20000 | 1 Sokar : 2 SB6r | null |
| Sokar with SB10r, closely coupled(200Hz) | [SOKA_200] + [SB10_200] | 29 - 20000 | 1 Sokar : 2 SB10r | null |
| Sokar with SB10r, coupled(100Hz) | [SOKA] + [SB10_100] | 27 - 20000 | 1 Sokar : 2 SB10r | null |
| Sokar with SB10r, separated(60Hz) | [SOKA_60] + [SB10_60] | 25 - 20000 | 1 Sokar : 1 SB10r | null |

### 주석 및 출처 (Notes & Sources)

**출처**: Sokar_OM_EN.pdf p.18-24 "Loudspeaker configurations" — 6개 조합 전량 조사, Soka와 완전 동일한 수치를 Sokar 자신의 문서에서 독립 확인.
**Sokar colinear source(단독) Frequency_Range_10dB_Hz 미확인**: 원문에 Enclosure/Preset 표만 있고 Frequency range 행이 생략됨(Soka는 100-20000Hz로 명시) — 미확인 유지.
**원문 라벨링 오류 정정**: Sokar 자신의 OM 표가 "Soka"/"SB6i"/"SB10i"(매입형 접미사 r 누락)로 표기되어 있음 — 이 파일에서는 Sokar/SB6r/SB10r로 정정 채택.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| [SOKA_200] + [SB6_200] | 1.9 | SB6r = 0 | Sokar = + / SB6r = + |
| [SOKA] + [SB6_100] | 1.4 | SB6r = 0 | Sokar = + / SB6r = + |
| [SOKA_60] + [SB6_60] | 3.6 | SB6r = 0 | Sokar = + / SB6r = − |
| [SOKA_200] + [SB10_200] | 3.2 | SB10r = 0 | Sokar = + / SB10r = + |
| [SOKA] + [SB10_100] | 2.6 | SB10r = 0 | Sokar = + / SB10r = + |
| [SOKA_60] + [SB10_60] | 9 | SB10r = 0 | Sokar = + / SB10r = − |

### 주석 및 출처 (Notes & Sources)

**출처**: Sokar_OM_EN.pdf p.20-24 "Pre-alignment delays" 표 — 딜레이 수치는 텍스트로 확인, Polarity는 5개 페이지 전부 이미지 렌더링해 육안 확인(Soka와 완전 동일한 값/패턴을 Sokar 자신의 문서에서 독립 재확인).
**원문 라벨링 오류**: preset_guide_and_matching과 동일 — 원문 표 자체가 "Soka"/"SB6i"/"SB10i"로 표기되어 있으나 이 파일에서는 Sokar/SB6r/SB10r로 정정.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| in-wall | Sokar-inW + Soka-Screen | 1 | 1 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 5:1 | - |
| Max_Wind_Load | null | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: Sokar_OM_EN.pdf p.17 "Mechanical safety"("The Sokar rigging system complies with EN 62368-1: 2014...", "achieve a safety factor of 5").
**Configuration 단순화**: Soka는 6개 리깅 구성이 있으나 Sokar는 매입형 특성상 "in-wall" 단일 구성만 원문에 존재.

## Null Report

**미확인(정보 부족)**: Model_Number, WEEE_Marking, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, LF_Nominal_Impedance, HF_Nominal_Impedance, RMS_Power_Handling_LF/HF, Peak_Power_Handling_10ms_Overall, Inter_Enclosure_Angles_deg, Handles, Rigging_Components_Material, Front_Material, Max_Wind_Load, preset_guide_and_matching(9건) — 24건.
**비적용**: 없음 — 0건.

**총계**: null 24건 (미확인 24건 + 비적용 0건). 확정적 비존재(0/No)로 명시한 항목은 1건 — Cardioid_Capability(No, 원문 전량 스캔 근거).

**[MR_v1.8 반영 메모]**: 이 파일은 `upload/Sokar_v1.3.md`(별도 audio-spec-parsing 프로젝트 산출물)를 이 저장소의 raw-spec으로 이관한 것이다 — 기존에는 사용자가 채팅으로 제공한 "출처 미검증" 홈페이지 텍스트(무게 11.7kg 주장)만 있었으나, 이 제품의 L-Acoustics 정식 공식 매뉴얼(Sokar_OM_EN.pdf)로 재검증한 결과 실제 무게는 8.7kg(오히려 표준형 9.4kg보다 가벼움 — 매입형이라 전면 그릴 등 부품이 빠짐)임이 확인되어 `public/js/domains/speakers/data/la/s-series.data.js`의 Soka inWall(id: spk-la-soka-inwall) 엔트리 weight를 11.7 → 8.7로 정정했다. Cardioid_Capability/Preset Guide/Matching Ratio/Delay Defaults/Mechanical Safety도 신규 반영. 원본 pdf/docx는 이 프로젝트에 없어(A&E 시방서 자체가 미제공) 이 파일은 계속 폴더화하지 않고 단독 md로 유지한다(README Rule 1, 원본 없는 md는 비폴더화).
