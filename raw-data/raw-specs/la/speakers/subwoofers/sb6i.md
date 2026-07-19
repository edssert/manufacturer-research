# SB6i (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(초박형 설치용 서브우퍼, X6i/X4i 매칭용)

**스켈레톤 근거**: `speakers/LA/KS21i_v1.0.md`를 뼈대로 사용 — SB6i는 KS21i와 동일한 패시브 terminal block 서브우퍼 아키텍처이나 (1) 단일 21" 대신 2 x 6.5" LF 드라이버, (2) 초박형(depth 99mm) 설치 전용 폼팩터, (3) 3개 팩토리 프리셋([SB6_60]/[SB6_100]/[SB6_200], KS21i의 2개보다 많음) 구조를 가진다.

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
**Product_Series/Product_Type**: SB6i_AE_EN.docx 최상단 헤더("SB6i - Subwoofer" / "Ultra-shallow install-specific 6.5' Subwoofer") — Product_Type="Subwoofer" 채택, 시리즈명 줄이 없어 Product_Series는 null.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | [SB6_60]: 29-107 / [SB6_100]: 29-150 / [SB6_200]: 32-300 | Hz |
| Frequency_Response_6dB_Hz | [SB6_60]: 32-90 / [SB6_100]: 31-120 / [SB6_200]: 35-250 | Hz |
| Frequency_Response_3dB_Hz | [SB6_60]: 34-75 / [SB6_100]: 35-100 / [SB6_200]: 40-200 | Hz |
| Max_SPL_Peak | [SB6_60]: 110(OM)/112(AE) dB / [SB6_100]: 111(OM)/113(AE) dB / [SB6_200]: 115(OM)/117(AE) dB | dB |
| Nominal_Directivity_Horizontal_deg | null | deg |
| Nominal_Directivity_Vertical | null | - |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | SB6_60, SB6_100, SB6_200 | - |

### 주석 및 출처 (Notes & Sources)

**Cardioid_Capability=No(확정적 비존재)**: SB6i_OM_EN_1.1.pdf/SB6i_AE_EN.docx 전량을 "cardioid" 키워드로 스캔 — 0건 검출, 3종 프리셋 전부 표준 구성 전용 — 초박형 소형 서브우퍼 특성상 카디오이드 어레이 기능이 제공되지 않는 것으로 판단.
**출처**: SB6i_AE_EN.docx "Technical requirements"; SB6i_OM_EN.pdf p.33 "SB6i specifications".
**3중 프리셋 구조**: [SB6_60](저역 확장, 60Hz 상한)/[SB6_100](표준, 100Hz 상한)/[SB6_200](고역 확장, 200Hz 상한) — X8i/X6i의 이중 프리셋보다 한 단계 더 세분화된 구조.
**Max_SPL_Peak 소스 간 충돌**: OM 스펙 표(110/111/115dB)와 AE_EN.docx(112/113/117dB)가 프리셋별로 각각 2dB씩 다름 — OM 값을 대표로 표기하되 AE 값도 병기.

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

### 주석 및 출처 (Notes & Sources)

**출처**: SB6i_AE_EN.docx "Technical requirements"; SB6i_OM_EN.pdf p.33 "SB6i specifications".

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 4-point terminal block with push-in connection | - |
| Link_Connector | null | - |
| Terminal_Block_Pinout_1 | + / - | - |
| Terminal_Block_Pinout_2 | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB6i_OM_EN.pdf p.9 "Connectors"("Internal pinout for L-Acoustics subwoofers"). KS21i와 달리 LINK 커넥터가 별도로 명시되지 않고 단일 4-point 터미널 블록 하나만 존재 — Link_Connector/Terminal_Block_Pinout_2는 비적용이 아닌 미확인으로 유지.

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
| Weight_Net | 8.6 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: SB6i_OM_EN.pdf p.33 "SB6i specifications"("Rigging and handling").
**Weight_Net 소스 간 충돌**: OM은 8.6kg, AE_EN.docx는 9kg — OM을 대표값으로 채택.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 360 | mm |
| Height_mm | 532 | mm |
| Depth_mm | 99 | mm |
| Dimensions_Raw | 360 / 532 / 99 / 104.2 | mm |
| Cabinet_Material | premium grade Baltic beech and birch plywood | - |
| Front_Material | coated steel grill, acoustically neutral 3D fabric | - |
| Rigging_Components_Material | null | - |
| Finish_Color | dark grey brown Pantone 426 C, pure white RAL 9010, custom RAL code on special order | - |
| IP_Rating | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB6i_AE_EN.docx "Physical data" - "Dimensions (W, H, D): 360 mm, 532 mm, 99 mm"; SB6i_OM_EN.pdf p.34 "SB6i dimensions".
**Dimensions_Raw**: 도면 4개 숫자 중 360/532/99는 AE와 일치, 104.2는 부가 치수(실링 플레이트 포함 깊이로 추정).

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| SB6i standard configuration | [SB6_60] / [SB6_100] / [SB6_200] | 29-107 / 29-150 / 32-300 | null | null |

### 주석 및 출처 (Notes & Sources)

**출처**: SB6i_OM_EN.pdf "Loudspeaker configurations". X6i/X4i와의 조합 데이터는 각 제품 파일에 이미 그 제품 관점으로 기록됨.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: KS21i와 동일한 구조적 이유 — SB6i는 X6i/X4i 조합에서 항상 2차 엘리먼트로만 등장하며, 실제 딜레이 값은 X6i/X4i 파일에 그 제품 관점으로 이미 기록됨.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| null | null | null | null |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | null | - |
| Max_Wind_Load | null | Beaufort |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: SB6i는 벽/천장 부착형 전용 초소형 제품이라 K1~KS21i 계열의 "flown array safety factor" 개념 자체가 원문에 다른 방식으로 존재할 가능성이 있으나, 이 문서에서 명확한 Safety_Factor 수치를 확인하지 못함.

## Null Report

**미확인**: Model_Number, WEEE_Marking, Frequency_Response_5/4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, Nominal_Directivity_Horizontal_deg, Nominal_Directivity_Vertical, Link_Connector, Terminal_Block_Pinout_2, Max_Enclosures_Per_Controller_Output/Total, Handles, Rigging_Components_Material, preset_guide_and_matching(2건), delay_defaults, mechanical_safety(전 항목), Safety_Factor, Max_Wind_Load — 19건.
**비적용**: Nominal_Impedance_Overall, RMS_Power_Handling_Overall, Peak_Power_Handling_10ms_Overall — 3건.

**총계**: null 22건(미확인 19건 + 비적용 3건). 확정적 비존재(No): Passive_Crossover_Network 1건.

---

**[MR_v1.8 반영 메모]**: 이 파일은 `upload/SB6i_v1.4.md`를 이 저장소의 raw-spec으로 이관한 것이다(기존 역재구성본을 대체, 원본 파일 자체는 없어 폴더화하지 않음). `public/js/domains/speakers/data/la/subwoofers.data.js`에 Cardioid_Capability/Preset Guide를 신규 반영했다. 기존 필드(dims/freqs/watt 등)는 대조 후 이상 없음.
