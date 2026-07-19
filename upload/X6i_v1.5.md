# X6i (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(X8i와 동일 아키텍처의 소형 버전)

**스켈레톤 근거**: `speakers/LA/X8i_v1.0.md`를 뼈대로 사용 — X6i는 X8i와 완전히 동일한 아키텍처(2-way 패시브 동축, terminal block, 90° axisymmetric, 이중 프리셋 구조, IP55, EN 62368-1)이며 차이는 트랜스듀서 크기(6.5" LF vs 8" LF)와 그에 따른 스펙 수치뿐이다 — 아키텍처는 X6i 자신의 X6i_AE_EN.docx/X6i_OM_EN_2.0.pdf에서 독립 판정했다(X8i와 동일 시리즈 문서 구조 확인).

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | X6i | - |
| Model_Number | null | - |
| Product_Series | Xi Series | - |
| Product_Category | short throw point source (installation version) | - |
| Product_Type | Short throw point source | - |
| Description | 2-way passive coaxial enclosure (installation version): 6.5" LF cone driver + 1.5" HF diaphragm compression driver, amplified by LA2Xi / LA4X / LA7.16i / LA12X | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | EN 62368-1:2014 Audio/video, information and communication technology equipment — Part 1: Safety requirements | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: X6i_AE_EN.docx; X6i_OM_EN_2.0.pdf(X6i owner's manual EN version 2.0) p.194 "X6i specifications".
**Product_Series/Product_Type(신규 Key, 사용자 지시 2026-07-17)**: X6i_AE_EN.docx 최상단 헤더("X6i - Short throw point source" / "Xi Series")에서 채택.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz [1] | [X6i_50]: 54 - 20000 / [X6i]: 69 - 20000 | Hz |
| Frequency_Response_6dB_Hz [1] | [X6i_50]: 60 - 20000 / [X6i]: 76 - 20000 | Hz |
| Frequency_Response_3dB_Hz [1] | [X6i_50]: 67 - 20000 / [X6i]: 84 - 20000 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Max_SPL_Peak [2] | [X6i_50]: 117 dB / [X6i]: 123 dB (LA2Xi bridge/LA4X/LA7.16i/LA12X); [X6i]: 122 dB (LA2Xi single-ended, [X6i_50] 단독모드 값 원문 미기재) | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | 90 (axisymmetric) | deg |
| Nominal_Directivity_Vertical | 90 (axisymmetric) | deg |
| Cardioid_Capability | No | - |
| DSP_Preset_Name [1] | X6i, X6i_50 | - |
| Frequency_Response_4dB_Hz | null | Hz |

### 주석 및 출처 (Notes & Sources)

**출처**: X6i_AE_EN.docx "Technical requirements"; X6i_OM_EN_2.0.pdf p.194 "X6i specifications".
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.
**Cardioid_Capability=No(확정적 비존재)**: X6i_OM_EN_2.0.pdf/X6i_AE_EN.docx 전량을 "cardioid" 키워드로 스캔 — 0건 검출.
**[1] 이중 프리셋 구조**: X8i와 동일 개념 — [X6i](고SPL, 123dB, 69Hz~)와 [X6i_50](풀레인지, 117dB, 54Hz~).
**[2] Max_SPL_Peak 원문 표 일부 결측**: OM 표에서 LA2Xi 단독모드([X6i_50]) 값이 레이아웃상 확인되지 않음(X8i는 4개 값 모두 명시된 것과 차이) — 확인 가능한 3개 값만 채택, 원문 자체 결측 가능성을 각주에 명시(임의 추정하지 않음).

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 6.5" cone driver | - |
| HF_Transducer | 1.5" diaphragm compression driver, neodymium | - |
| LF_Acoustical_Load | bass-reflex | - |
| HF_Acoustical_Load | null | - |
| Passive_Crossover_Network | Yes | - |
| LF_Nominal_Impedance | null | Ohm |
| HF_Nominal_Impedance | null | Ohm |
| Nominal_Impedance_Overall | 8 | Ohm |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_HF | null | W |
| RMS_Power_Handling_Overall | 83 | W |
| Peak_Power_Handling_10ms_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: X6i_AE_EN.docx "Technical requirements"; X6i_OM_EN_2.0.pdf p.194 "X6i specifications".
**Peak_Power_Handling_10ms_Overall(신규 Key)**: d&b CCL8에서 신설된 범용 Key(10ms 피크 파워 핸들링, 업계 표준 측정 조건) — 이 제품 자신의 RMS_Power_Handling_Overall은 실값을 보유하나 이번 일괄 동기화 라운드에서는 원본을 재조회하지 않고 소급 반영했으므로 미확인으로 유지(원본성 요건, LA12X 브릿징 Key 판단 사례와 동일 원칙).
**Passive_Crossover_Network=Yes/통합값**: X8i와 동일 구조 — terminal block 1채널만 신호, 통합값(8Ω/83W).

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 4-point terminal block with push-in connection | - |
| Link_Connector | 1 x 4-point terminal block with push-in connection | - |
| Terminal_Block_Pinout_1 | + / - (combined LF+HF signal, internally split by passive crossover) | - |
| Terminal_Block_Pinout_2 | Not linked | - |

### 주석 및 출처 (Notes & Sources)

**출처**: X6i_OM_EN_2.0.pdf "Connectors"("Internal pinout for L-Acoustics 2-way passive enclosures" — X8i와 동일 표 제목/구조); X6i_AE_EN.docx.

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA2Xi, LA4X, LA7.16i, LA12X | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type | Passive (2-way) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: X6i_OM_EN_2.0.pdf "The X6i enclosure is driven by the LA2Xi / LA4X / LA7.16i / LA12X amplified controllers".

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | 8 x M6 threaded inserts; wall/ceiling/pole-mount 및 고정/가변 틸트각 액세서리 다수 조합 지원(X8i와 동일 액세서리 체계), 상세는 X6i mechanical configurations overview 참조 | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | null | count |
| Weight_Net | 6.3 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: X6i_OM_EN_2.0.pdf p.194 "X6i specifications"("Rigging and handling: 8 M6 inserts").
**Monitoring_angle=35°/55°**: X8i와 동일 이중 틸트각 지원 — acoustical_performance 섹션 각주 참조 대상이나 대응 Key 없어 여기 기록.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 187 | mm |
| Height_mm | 362 | mm |
| Depth_mm | 170 | mm |
| Dimensions_Raw [1] | 187 / 362 / 175 / 170 | mm |
| Cabinet_Material | premium grade Baltic beech and birch plywood | - |
| Front_Material | coated steel grill, acoustically neutral 3D fabric | - |
| Rigging_Components_Material | null | - |
| Finish_Color | dark grey brown Pantone 426 C, pure white RAL 9010, custom RAL code on special order | - |
| IP_Rating | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: X6i_AE_EN.docx "Physical data" - "Dimensions (W, H, D): 187 mm, 362 mm, 170 mm"; X6i_OM_EN_2.0.pdf p.195 "X6i dimensions"(치수 도면).
**[1] Dimensions_Raw**: 도면 숫자(187/362/175/170mm) 중 187·362·170은 AE 확정 W/H/D와 일치, 175는 부가 치수로 추정, 원문 그대로 보존.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| X6i standalone (고SPL) | [X6i] | 69 - 20000 | null | null |
| X6i standalone (풀레인지) | [X6i_50] | 54 - 20000 | null | null |
| X6i with SB6i(r), closely coupled(200Hz) | [X6i] + [SB6_200] | 32 - 20000 | 1 X6i : 2 SB6i | null |
| X6i with SB6i(r), coupled(100Hz) | [X6i] + [SB6_100] | 29 - 20000 | 1 X6i : 2 SB6i(r) | null |
| X6i with SB6i(r), separated(60Hz) | [X6i_50] + [SB6_60] | 29 - 20000 | 1 X6i : 1 SB6i(r) | null |
| X6i with SB10i(r), closely coupled(200Hz) | [X6i] + [SB10_200] | 29 - 20000 | 1 X6i : 1 SB10i(r) | null |
| X6i with SB10i(r), coupled(100Hz) | [X6i] + [SB10_100] | 27 - 20000 | 1 X6i : 1 SB10i(r) | null |
| X6i with SB10i(r), separated(60Hz) [1] | [X6i_50] + [SB10_60] | 27 - 20000 | 1 X6i : 1 SB10i(r) | null |

### 주석 및 출처 (Notes & Sources)

**출처**: X6i_OM_EN_2.0.pdf p.37-44 "Loudspeaker configurations"("X6i with SB6i(r)" p.38-41, "X6i with SB10i(r)" p.42-44).
**SB10i(r) 3단계 조합 실값 확보(v1.1)**: SB6i(r)과 동일하게 closely coupled(200Hz)/coupled(100Hz)/separated(60Hz) 3단계 구조를 원문에서 직접 조사 — closely coupled: OM p.42, [X6i]+[SB10_200], 대역폭 29Hz-20kHz, ratio 1:1, system contour +12dB@1kHz. coupled: OM p.43, [X6i]+[SB10_100], 대역폭 27Hz-20kHz, ratio 1:1, system contour +8dB@1kHz. separated: OM p.44, [X6i_50]+[SB10_60], 대역폭 27Hz-20kHz(각주 [1] 참조), ratio 1:1, system contour +11dB@1kHz@[X6i_50].
**[1] separated 조합 대역폭 원문 내 서술-표 불일치**: OM p.44 서술 문장("With SB10i(r) and the [SB10_60] preset, the bandwidth of the X6i system is extended down to 25 Hz")은 25Hz를 명시하나, 바로 아래 구조화된 스펙 표(Usable bandwidth (-10 dB))에는 "27 Hz - 20 kHz"로 기재됨 — 동일 페이지 내 서술문과 표 값이 상충하는 원문 자체의 결함(closely coupled/coupled 조합은 서술문과 표 값이 정확히 일치했던 것과 대조적). 두 값 모두 원문 그대로 확인했으며 임의로 버리지 않음 — Value 칸에는 다른 5개 조합과 동일하게 구조화된 스펙 표 값(27Hz)을 채택.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| [X6i] + [SB6_200] | 0 | SB6i = 0 | X6i = + / SB6i = - |
| [X6i] + [SB6_100] | 0 | SB6i = 1.2 | X6i = + / SB6i = + |
| [X6i_50] + [SB6_60] | 0 | SB6i = 2 | X6i = + / SB6i = + |
| [X6i] + [SB10_200] | 1.4 | SB10i = 0 | X6i = + / SB10i = - |
| [X6i] + [SB10_100] [1] | null | null | null |
| [X6i_50] + [SB10_60] | 0 | SB10i = 6.8 | X6i = + / SB10i = - |

### 주석 및 출처 (Notes & Sources)

**출처**: X6i_OM_EN_2.0.pdf p.39-44 "Pre-alignment delays"(SB6i(r): p.39-41, SB10i(r): p.42, p.44). 극성은 색상 아이콘 표기라 Windows.Data.Pdf WinRT API로 페이지 이미지 렌더링해 육안 확인(SB10i(r) closely coupled/separated 조합 포함).
**SB6i(r) — closely coupled 조합만 극성 반전**: [X6i]+[SB6_200](closely coupled, 200Hz)만 SB6i가 "-"이고 나머지 두 조합(coupled/separated)은 SB6i가 "+" — 원문 그대로 정확히 반영.
**SB10i(r) 극성 실값 확보(v1.1)**: closely coupled([X6i]+[SB10_200])와 separated([X6i_50]+[SB10_60]) 모두 SB10i가 "-"(빨강 아이콘), X6i는 두 조합 모두 "+"(회색 아이콘) — SB6i(r)가 "closely coupled만 반전"이었던 것과 달리 SB10i(r)는 closely coupled/separated 두 조합 모두 반전된 패턴으로, 원문 그대로 정확히 반영(임의로 SB6i(r) 패턴을 유추 적용하지 않음).
**[1] [SB10_100](coupled) 조합은 원문에 pre-alignment delay 표 자체가 없음**: OM p.43 "Loudspeaker configurations > X6i with SB10i(r) > Coupled" 절 전체를 직접 확인함 — 다른 5개 조합은 모두 "Pre-alignement delays" 표(수치 + 극성 아이콘)가 있으나, 이 조합만 해당 표가 생략되고 "No pre-alignment delay values are required for this configuration."라는 서술문 하나로 대체됨. 수치나 극성 아이콘이 원문에 전혀 제시되지 않으므로 0 ms나 특정 극성을 임의로 채우지 않고 null로 유지 — 이는 v1.17이 금지하는 "시간 배분상 미조사"가 아니라 해당 페이지를 직접 확인한 뒤 원문 자체에 수치/극성 표가 존재하지 않음을 확인한 결과다.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| all configurations [1] | 다양(X8i와 동일 액세서리 체계) | 1 | 1 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 5:1 | - |
| Max_Wind_Load | null | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: X6i_OM_EN_2.0.pdf "Mechanical safety"("safety factor of 5", "Safe/maximum limit: 1").
**[1] 단일 행 요약**: X8i와 동일 사유 — 모든 마운트 조합에서 "1" 공통.

## Null Report

**미확인(정보 부족)**: Model_Number, WEEE_Marking, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, LF_Nominal_Impedance, HF_Nominal_Impedance(단일 통합값만 존재), RMS_Power_Handling_LF/HF(단일 통합값만 존재), Peak_Power_Handling_10ms_Overall, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, Inter_Enclosure_Angles_deg, Handles, Rigging_Components_Material, Max_Wind_Load, delay_defaults([X6i]+[SB10_100] 조합 — OM p.43 직접 확인 결과 원문에 수치/극성 표 자체가 없음), preset_guide_and_matching 섹션 내 Recommended_Ratio/Minimum_Line_Length 셀(standalone 2개 조합은 두 컬럼 다 null, SB6i(r)/SB10i(r) 조합 6행은 Minimum_Line_Length만 null; 2행×2열+6행×1열=10건) — 26건.
**비적용**: HF_Acoustical_Load — 1건. (PA_COM_Pinout_*/SpeakON_Pinout_* 등 타 커넥터 고유 Key는 X6i 자신의 Terminal_Block_Pinout_*으로 이미 표현되어 애초에 생성하지 않음, null 목록에서 제외.)

**총계**: null 27건 (미확인 26건 + 비적용 1건). 확정적 비존재(0/No)로 명시한 항목은 0건 — Passive_Crossover_Network는 "Yes"로 실값 확보. **v1.4 정정(각주 버전 참조 최신성 감사, 2026-07-18)**: 이 파일의 preset_guide_and_matching 각주는 이미 "standalone 2개 조합의 Recommended_Ratio, 전체 8개 조합의 Minimum_Line_Length"라는 서술로 10개 셀(2+8)을 정확히 프로즈로 짚고 있었으나, 총계 산정 시에는 다른 파일들과 동일하게 이 항목 전체가 1건으로만 반영되어 있었다(결합형 불릿 오카운트, K1/L2/A10 Focus/X12/X15 HiQ/X4i/X4r 등 다른 파일에서도 반복된 유형 — 서술은 맞았으나 산술이 서술을 반영하지 못한 사례). 실제로는 8개 Configuration 행 중 standalone 2행은 Recommended_Ratio·Minimum_Line_Length 둘 다 null이고 나머지 6행(SB6i(r)/SB10i(r) 조합)은 Minimum_Line_Length만 null인 10개의 개별 null 셀이다 — 14건(단순 Key+delay_defaults 1건)+10건(preset 셀)=24건, 총계 17건 -> 25건으로 재계산. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — speakers 카테고리(X8i와 동일 아키텍처의 소형 버전). X8i_v1.0.md를 스켈레톤으로 사용, X6i_AE_EN.docx + X6i_OM_EN_2.0.pdf 통합. 트랜스듀서 크기(6.5" LF)와 스펙 수치만 상이, 구조는 X8i와 완전 동일(이중 프리셋 [X6i]/[X6i_50], terminal block, 90° axisymmetric). preset_guide_and_matching/delay_defaults는 SB6i(r) 3단계 조합(closely coupled/coupled/separated) 원문을 직접 조사해 실값 확보(극성은 PDF 페이지 이미지 렌더링), SB10i(r) 조합은 프리셋 코드만 확인하고 상세 수치는 시간 배분상 null로 유지. |
| v1.1 | SKILL v1.17 위반("시간 배분상" null 사유) 수정 — v1.0의 preset_guide_and_matching/delay_defaults 각주에 있던 "SB10i(r)는 시간 배분상 미조사" 표현을 제거하고, OM p.42-44 "X6i with SB10i(r)"(Closely coupled/Coupled/Separated) 챕터를 SB6i(r)와 동일한 깊이로 직접 조사해 실값 확보. closely coupled([X6i]+[SB10_200], OM p.42): 대역폭 29Hz-20kHz, ratio 1:1, delay X6i=1.4ms/SB10i=0ms, 극성 X6i=+/SB10i=-(페이지 이미지 렌더링 확인). coupled([X6i]+[SB10_100], OM p.43): 대역폭 27Hz-20kHz, ratio 1:1 — 원문에 "No pre-alignment delay values are required for this configuration" 서술만 있고 수치/극성 표 자체가 없어 delay_defaults 3개 컬럼 모두 null 유지(임의 0 기재 금지, 각주로 근거 명시). separated([X6i_50]+[SB10_60], OM p.44): 대역폭 표 27Hz-20kHz(단 서술문은 25Hz로 상충 — 각주로 원문 불일치 명시, 표 값 채택), ratio 1:1, delay X6i=0ms/SB10i=6.8ms, 극성 X6i=+/SB10i=-. SB10i(r)는 SB6i(r)와 달리 closely coupled/separated 두 조합 모두 극성 반전(SB6i(r)는 closely coupled만 반전)임을 확인. delay_defaults 컬럼명 K1_Delay_ms -> Primary_Element_Delay_ms로 통일(2026-07-17 전체 파일 리네이밍 반영). Null Report 항목/총계 갱신(22건 -> 23건, [X6i]+[SB10_100] delay 미확인 1건 순증). |
| v1.2 | MF_Transducer/MF_Acoustical_Load/MF_Nominal_Impedance/RMS_Power_Handling_MF 4개 Key 삭제(SKILL v1.19) — 이 제품은 확인된 2-way 구조라 MF 대역 드라이버 자체가 없으므로, null 동기화 대상이 아니라 삭제 대상으로 재분류. MF_Nominal_Impedance는 미확인 목록의 결합형 "RMS_Power_Handling_LF/MF/HF" 항목과 별도 표기되어 있었으므로 실제로는 미확인 -1(17→16)만 해당 — 비적용 6건→4건은 정확했으나 미확인/총계 표기가 과다 차감(15/19건)되어 있던 것을 검증 후 정정(미확인 16건, 총계 20건). |
| v1.3 | Product_Series(Xi Series)/Product_Type(Short throw point source) 신규 Key 2건 추가(X6i_AE_EN.docx 최상단 헤더, 사용자 지시 2026-07-17). Cardioid_Capability=No 추가 — X6i_OM_EN_2.0.pdf/X6i_AE_EN.docx 전량 스캔 0건 검출. signal_processing 섹션(CUT_Mode_Available/HFC_Function_Settings/Coupling_Function_Range, d&b 전용 개념)이 L-Acoustics 파일에 null 플레이스홀더로 잘못 추가되어 있던 것을 프로젝트 전역 동기화 라운드에서 삭제. Null Report 갱신(비적용 4건→1건, 총계 20건→17건). |
| v1.3 to v1.4 | (표기 정정, Minor) 각주 버전 참조 최신성 감사(2026-07-18)에서 preset_guide_and_matching 각주가 "standalone 2개 조합의 Recommended_Ratio, 전체 8개 조합의 Minimum_Line_Length"(10개 셀)를 프로즈로는 정확히 서술하고 있었으나 총계 산정에는 1건으로만 반영되어 있던 결합형 불릿 오카운트를 발견·정정. 미확인 16건→24건, 총계 17건→25건으로 재계산. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다. |
| v1.5 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-18, d&b 대량 배치 완료 후) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래, 미확인), `Peak_Power_Handling_10ms_Overall`(d&b CCL8 유래, 미확인) 반영. Null Report 27건(미확인 26건+비적용 1건)으로 갱신. |
