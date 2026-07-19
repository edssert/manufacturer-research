# SB6i (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(초박형 설치용 서브우퍼, X6i/X4i 매칭용)

**스켈레톤 근거**: `speakers/LA/KS21i_v1.0.md`를 뼈대로 사용 — SB6i는 KS21i와 동일한 패시브 terminal block 서브우퍼 아키텍처이나 (1) 단일 21" 대신 **2 x 6.5" LF 드라이버**, (2) 초박형(depth 99mm) 설치 전용 폼팩터, (3) **3개 팩토리 프리셋**([SB6_60]/[SB6_100]/[SB6_200], KS21i의 2개보다 많음) 구조를 가진다.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | SB6i | - |
| Model_Number | null | - |
| Product_Series | null | - |
| Product_Category | ultra-shallow subwoofer (installation version) | - |
| Product_Type | Subwoofer | - |
| Description | Ultra-shallow subwoofer (installation version): 2 x 6.5" neodymium cone drivers, amplified by LA2Xi / LA4X / LA7.16i / LA12X | - |
| Way_Count | 1 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | 2006/42/EC Machinery Directive (rigging system, designed per BGV-C1 guidelines) | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB6i_AE_EN.docx; SB6i_OM_EN.pdf(SB6i owner's manual EN version 1.1) p.33 "SB6i specifications".
**Product_Series/Product_Type(신규 Key, 사용자 지시 2026-07-17)**: SB6i_AE_EN.docx 최상단 헤더("SB6i - Subwoofer" / "Ultra-shallow install-specific 6.5' Subwoofer") — Product_Type="Subwoofer" 채택, 시리즈명 줄이 없어 Product_Series는 null.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz [1] | [SB6_60]: 29-107 / [SB6_100]: 29-150 / [SB6_200]: 32-300 | Hz |
| Frequency_Response_6dB_Hz [1] | [SB6_60]: 32-90 / [SB6_100]: 31-120 / [SB6_200]: 35-250 | Hz |
| Frequency_Response_3dB_Hz [1] | [SB6_60]: 34-75 / [SB6_100]: 35-100 / [SB6_200]: 40-200 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak [2] | [SB6_60]: 110(OM)/112(AE) dB / [SB6_100]: 111(OM)/113(AE) dB / [SB6_200]: 115(OM)/117(AE) dB | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | null | deg |
| Nominal_Directivity_Vertical | null | - |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | SB6_60, SB6_100, SB6_200 | - |

### 주석 및 출처 (Notes & Sources)

**Cardioid_Capability=No(확정적 비존재)**: SB6i_OM_EN_1.1.pdf/SB6i_AE_EN.docx 전량을 "cardioid" 키워드로 스캔 — 0건 검출. SB15m/SB18/KS21/KS28과 달리 SB6i는 반전 배치용 [xxxx_xx_C]/[xxxx_xx_Cx] 프리셋 자체가 존재하지 않음(3종 프리셋 SB6_60/100/200 전부 표준 구성 전용) — 초박형 소형 서브우퍼 특성상 카디오이드 어레이 기능이 제공되지 않는 것으로 판단.

**출처**: SB6i_AE_EN.docx "Technical requirements"; SB6i_OM_EN.pdf p.33 "SB6i specifications".
**[1] 3중 프리셋 구조(신규, X 시리즈보다 많음)**: [SB6_60](저역 확장, 60Hz 상한)/[SB6_100](표준, 100Hz 상한)/[SB6_200](고역 확장, 200Hz 상한) — X8i/X6i의 이중 프리셋보다 한 단계 더 세분화된 구조.
**[2] Max_SPL_Peak 소스 간 충돌**: OM 스펙 표(110/111/115dB)와 AE_EN.docx(112/113/117dB)가 프리셋별로 각각 2dB씩 다름 — L-Acoustics 브랜드 OM 우선 원칙에 따라 OM 값을 대표로 표기하되 AE 값도 병기(데이터 충돌 보존).
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 2 x 6.5" neodymium cone driver | - |
| LF_Acoustical_Load | bass-reflex, L-Vents | - |
| Passive_Crossover_Network | No | - |
| LF_Nominal_Impedance | 4 | Ohm |
| Nominal_Impedance_Overall | null | Ohm |
| RMS_Power_Handling_LF | 85 | W |
| RMS_Power_Handling_Overall | null | W |
| Peak_Power_Handling_10ms_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: SB6i_AE_EN.docx "Technical requirements"; SB6i_OM_EN.pdf p.33 "SB6i specifications".
**Peak_Power_Handling_10ms_Overall(신규 Key, 비적용)**: d&b CCL8에서 신설된 범용 Key — RMS_Power_Handling_Overall과 동일 사유(LF 단일 대역 통합 수치 개념 자체가 무의미, RMS_Power_Handling_LF로 이미 표현)로 비적용.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 4-point terminal block with push-in connection | - |
| Link_Connector | null | - |
| Terminal_Block_Pinout_1 | + / - | - |
| Terminal_Block_Pinout_2 | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB6i_OM_EN.pdf p.9 "Connectors"("Internal pinout for L-Acoustics subwoofers"). KS21i와 달리 LINK 커넥터가 별도로 명시되지 않고 단일 4-point 터미널 블록 하나만 존재 — Link_Connector/Terminal_Block_Pinout_2는 비적용이 아닌 미확인으로 유지(원문에 "Not linked" 같은 명시적 서술이 없어 확정적 비적용 판단 근거 부족).

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA2Xi, LA4X, LA7.16i, LA12X | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type | Active (1-way, subwoofer) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB6i_OM_EN.pdf "The SB6i subwoofer is driven by the LA2Xi / LA4X / LA7.16i / LA12X amplified controllers".

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | 8 x M6 threaded inserts for rigging accessories | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | null | count |
| Weight_Net [1] | 8.6 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: SB6i_OM_EN.pdf p.33 "SB6i specifications"("Rigging and handling").
**[1] Weight_Net 소스 간 충돌**: OM은 8.6kg, AE_EN.docx는 9kg — OM을 대표값으로 채택(브랜드 우선 원칙), AE 값 병기.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 360 | mm |
| Height_mm | 532 | mm |
| Depth_mm | 99 | mm |
| Dimensions_Raw [1] | 360 / 532 / 99 / 104.2 | mm |
| Cabinet_Material | premium grade Baltic beech and birch plywood | - |
| Front_Material | coated steel grill, acoustically neutral 3D fabric | - |
| Rigging_Components_Material | null | - |
| Finish_Color | dark grey brown Pantone 426 C, pure white RAL 9010, custom RAL code on special order | - |
| IP_Rating | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB6i_AE_EN.docx "Physical data" - "Dimensions (W, H, D): 360 mm, 532 mm, 99 mm"; SB6i_OM_EN.pdf p.34 "SB6i dimensions"(치수 도면).
**[1] Dimensions_Raw**: 도면 4개 숫자 중 360/532/99는 AE와 일치, 104.2는 부가 치수(실링 플레이트 포함 깊이로 추정).

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| SB6i standard configuration | [SB6_60] / [SB6_100] / [SB6_200] | 29-107 / 29-150 / 32-300 | null | null |

### 주석 및 출처 (Notes & Sources)

**출처**: SB6i_OM_EN.pdf "Loudspeaker configurations". X6i/X4i와의 조합 데이터는 각 제품 파일(X6i_v1.0.md, X4i_v1.0.md)에 이미 그 제품 관점으로 기록됨.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유(조사 완료 후 확정)**: KS21i와 동일한 구조적 이유 — SB6i는 X6i/X4i 조합에서 항상 2차 엘리먼트로만 등장하며, 실제 딜레이 값은 X6i_v1.0.md/X4i_v1.0.md에 그 제품 관점으로 이미 기록됨(예: "[X6i] + [SB6_200] X6i=0ms SB6i=0ms").

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| null | null | null | null |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | null | - |
| Max_Wind_Load | null | Beaufort |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: SB6i는 벽/천장 부착형(mounted on-wall, on-ceiling, in-wall, in-ceiling) 전용 초소형 제품이라 K1~KS21i 계열의 "flown array safety factor" 개념 자체가 원문에 다른 방식(EN 62368-1 또는 자체 마운트 하중 규정)으로 존재할 가능성이 있으나, 이 문서에서 명확한 Safety_Factor 수치를 확인하지 못함 — 미확인으로 유지.

## Null Report

**미확인(정보 부족)**: Model_Number, WEEE_Marking, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, Nominal_Directivity_Horizontal_deg, Nominal_Directivity_Vertical, Link_Connector, Terminal_Block_Pinout_2, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, Handles, Rigging_Components_Material, preset_guide_and_matching(Recommended_Ratio/Minimum_Line_Length), delay_defaults(전 항목), mechanical_safety(전 항목), Safety_Factor, Max_Wind_Load — 19건.
**비적용**: Nominal_Impedance_Overall, RMS_Power_Handling_Overall, Peak_Power_Handling_10ms_Overall — 3건. (PA_COM_Pinout_*/SpeakON_Pinout_* 등 타 커넥터 고유 Key는 SB6i 자신의 Terminal_Block_Pinout_*으로 이미 표현되어 애초에 생성하지 않음, null 목록에서 제외. MF_Transducer/MF_Acoustical_Load/MF_Nominal_Impedance/RMS_Power_Handling_MF/HF_Transducer/HF_Acoustical_Load/HF_Nominal_Impedance/RMS_Power_Handling_HF는 v1.2부터 삭제됨.)

**총계**: null 22건 (미확인 19건 + 비적용 3건). 확정적 비존재(0/No)로 명시한 항목은 1건 — Passive_Crossover_Network(No, 원문에 명시적 crossover 서술 없음 및 단일 대역 구조로 판단).

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — speakers 카테고리(초박형 설치용 서브우퍼, X6i/X4i 매칭용). KS21i_v1.0.md를 스켈레톤으로 사용, SB6i_AE_EN.docx + SB6i_OM_EN.pdf 통합. 3중 프리셋 구조([SB6_60]/[SB6_100]/[SB6_200]) 확인. AE/OM 간 Max_SPL_Peak(각 2dB 차이) 및 Weight_Net(9kg vs 8.6kg) 소스 충돌 발견 및 OM 우선 원칙으로 해결(양쪽 값 보존). delay_defaults/mechanical_safety는 KS21i와 동일한 구조적 이유로 미확인 유지(실값은 X6i/X4i 파일에 이미 기록). |
| v1.1 | delay_defaults 표의 컬럼명 `K1_Delay_ms`를 `Primary_Element_Delay_ms`로 전면 개명(SKILL v1.18) — 값 변경 없음(사용자 지적 2026-07-17). |
| v1.2 | MF_Transducer/MF_Acoustical_Load/MF_Nominal_Impedance/RMS_Power_Handling_MF/HF_Transducer/HF_Acoustical_Load/HF_Nominal_Impedance/RMS_Power_Handling_HF 8개 Key 삭제(SKILL v1.19) — 이 제품은 LF 전용 서브우퍼 구조라 MF/HF 대역 드라이버 자체가 없으므로, null 동기화 대상이 아니라 삭제 대상으로 재분류(K1 v1.4의 기존 반대 판단을 뒤집는 정책 변경, GSL의 Front_LF_Transducer와 동일 원칙 적용). |
| v1.3 | 프로젝트 전역 동기화 라운드(사용자 지시 2026-07-17). Product_Series(null)/Product_Type(Subwoofer) Key 신설 — SB6i_AE_EN.docx 최상단 헤더 기준, 시리즈명 줄이 없어 Product_Series는 null. Cardioid_Capability=No 신설(확정적 비존재) — SB6i_OM_EN_1.1.pdf/SB6i_AE_EN.docx 전량을 "cardioid" 키워드로 스캔 0건 검출, SB15m/SB18/KS21/KS28과 달리 반전 배치용 [xxxx_xx_C]/[xxxx_xx_Cx] 프리셋 자체가 존재하지 않음(3종 프리셋 전부 표준 구성 전용) — 초박형 소형 서브우퍼 특성상 카디오이드 기능 비제공으로 판단. d&b 고유 개념인 signal_processing 섹션(CUT_Mode_Available/HFC_Function_Settings/Coupling_Function_Range) 삭제 — L-Acoustics 제품에는 해당 개념 자체가 없어 비적용 표기에서 섹션 삭제로 정리. null 총계 23건(비적용 5건)에서 20건(비적용 2건)으로 갱신. |
| v1.4 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-18, d&b 대량 배치 완료 후) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래, 미확인), `Peak_Power_Handling_10ms_Overall`(d&b CCL8 유래, 비적용 — RMS_Power_Handling_Overall과 동일 사유) 반영. Null Report 22건(미확인 19건+비적용 3건)으로 갱신. |
