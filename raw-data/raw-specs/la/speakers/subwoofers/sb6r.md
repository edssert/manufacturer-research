# SB6r (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(SB6i의 recessed/매입형 파생형)

**스켈레톤 근거**: `speakers/LA/SB6i_v1.0.md`를 뼈대로 사용 — SB6r은 원문이 명시적으로 "SB6r is the recessed version of the SB6i enclosure"라 서술하는 매입형 파생품으로, 스펙 표 수치(저역한계/Max SPL — 3개 프리셋 전부)가 SB6i와 완전히 일치함을 원문에서 직접 확인했다. A&E 시방서는 제공되지 않아 OM(SB6r owner's manual EN version 1.1) 단일 소스 기준.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | SB6r | - |
| Model_Number | null | - |
| Product_Series | null | - |
| Product_Category | ultra-shallow subwoofer (recessed version) | - |
| Product_Type | Subwoofer | - |
| Description | Ultra-shallow subwoofer (recessed version): 2 x 6.5" cone drivers, amplified by LA2Xi / LA4X / LA7.16i / LA12X | - |
| Way_Count | 1 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | 2006/42/EC Machinery Directive (rigging system, designed per BGV-C1 guidelines) | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB6r_OM_EN.pdf(SB6r owner's manual EN version 1.1) p.45 "SB6r specifications"(A&E 시방서 미제공).
**Product_Series/Product_Type**: SB6r 자신의 문서에는 series/type 헤더가 없어(A&E 미제공), SB6i_AE_EN.docx 헤더를 install/recessed 상속 정책과 동일 근거로 적용 — Product_Type="Subwoofer", Product_Series는 SB6i도 null이라 null.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | [SB6_60]: 29 - null / [SB6_100]: 29 - null / [SB6_200]: 32 - null | Hz |
| Frequency_Response_6dB_Hz | [SB6_60]: 32-90 / [SB6_100]: 31-120 / [SB6_200]: 35-250 | Hz |
| Frequency_Response_3dB_Hz | [SB6_60]: 34-75 / [SB6_100]: 35-100 / [SB6_200]: 40-200 | Hz |
| Max_SPL_Peak | [SB6_60]: 110 / [SB6_100]: 111 / [SB6_200]: 115 | dB |
| Nominal_Directivity_Horizontal_deg | null | deg |
| Nominal_Directivity_Vertical | null | - |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | SB6_60, SB6_100, SB6_200 | - |

### 주석 및 출처 (Notes & Sources)

**Cardioid_Capability=No(확정적 비존재)**: SB6r_OM_EN_1.1.pdf(단일 소스, A&E 미제공) 전량을 "cardioid" 키워드로 스캔 — 0건 검출, SB6i와 동일 근거.
**출처**: SB6r_OM_EN.pdf p.45 "SB6r specifications".
**Usable_Bandwidth_Hz 상한 미확인**: OM 스펙 표는 "Low frequency limit (-10 dB)"만 제공하고 상한을 명시하지 않음 — SB6i는 A&E로 상한을 확보했으나, SB6r은 A&E 미제공이라 임의로 채우지 않음.
**Frequency_Response_6dB_Hz/3dB_Hz = SB6i 값 상속(사용자 정책 지침)**: install/recessed 버전이 표준형과 치수·무게·리깅 외 특이사항이 없다면 드라이버·인클로저 구성이 동일 스펙이므로 상속 가능 — SB6i_v1.3.md 값 채택.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 2 x 6.5" cone driver | - |
| LF_Acoustical_Load | bass-reflex, L-Vents | - |
| Passive_Crossover_Network | No | - |
| LF_Nominal_Impedance | 4 | Ohm |
| Nominal_Impedance_Overall | null | Ohm |
| RMS_Power_Handling_LF | 85 | W |
| RMS_Power_Handling_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: SB6r_OM_EN.pdf p.45 "SB6r specifications".
**RMS_Power_Handling_LF = SB6i 값 상속(사용자 정책 지침)**: SB6i는 AE로 85W를 확보했으나 SB6r은 A&E 미제공, OM 스펙 표에도 파워 핸들링 항목 자체가 없어 install/recessed 상속 정책에 따라 SB6i_v1.3.md 값(85W) 채택.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 4-point terminal block with push-in connection | - |
| Link_Connector | null | - |
| Terminal_Block_Pinout_1 | + / - | - |
| Terminal_Block_Pinout_2 | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB6r_OM_EN.pdf "Connectors"("Internal pinout for L-Acoustics subwoofers" — SB6i와 동일 구조).

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA2Xi, LA4X, LA7.16i, LA12X | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type | Active (1-way, subwoofer) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB6r_OM_EN.pdf "The SB6r subwoofer is driven by the LA2Xi / LA4X / LA7.16i / LA12X amplified controllers".

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | 8 x M6 threaded inserts for rigging accessories | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | null | count |
| Weight_Net | 7.6 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: SB6r_OM_EN.pdf p.45 "SB6r specifications". SB6i(8.6kg)보다 가벼움 — 매입형이라 전면 그릴 등 일부 부품이 없는 것으로 추정.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 360 | mm |
| Height_mm | 532 | mm |
| Depth_mm | 99 | mm |
| Dimensions_Raw | 360 / 532 / 99 / 104.2 | mm |
| Cabinet_Material | premium grade Baltic beech and birch plywood | - |
| Front_Material | null | - |
| Rigging_Components_Material | null | - |
| Finish_Color | dark grey brown Pantone 426 C | - |
| IP_Rating | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB6r_OM_EN.pdf p.45-46 "SB6r specifications"/"SB6r dimensions"(SB6i와 완전 동일 수치).
**Front_Material 비적용 사유**: 매입형(recessed) 제품이라 전면 그릴/패브릭 스펙이 원문 표에서 빠짐(X4r과 동일 패턴).
**Finish_Color 단순화**: SB6i는 3가지 마감을 제공하나 SB6r은 1가지만 명시.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| SB6r standard configuration | [SB6_60] / [SB6_100] / [SB6_200] | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: OM 자체 스펙 표에 저역한계만 있고 전체 대역 범위가 없어 채울 수 없음. X6i/X4i 계열과의 조합 데이터는 원본에서 별도 확인하지 못함.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: SB6i와 동일한 구조적 이유 — SB6r은 항상 2차 엘리먼트로만 등장. 정확한 SB6r 전용 딜레이 값은 원본에 없어 미확인으로 유지.

## Null Report

**미확인**: Model_Number, WEEE_Marking, Usable_Bandwidth_Hz(상한), Frequency_Response_5/4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, Nominal_Directivity_Horizontal_deg, Nominal_Directivity_Vertical, Link_Connector, Terminal_Block_Pinout_2, Max_Enclosures_Per_Controller_Output/Total, Handles, Front_Material, Rigging_Components_Material, preset_guide_and_matching(전 항목), delay_defaults — 21건.
**비적용**: Nominal_Impedance_Overall, RMS_Power_Handling_Overall, Peak_Power_Handling_10ms_Overall — 3건.

**총계**: null 24건(미확인 21건 + 비적용 3건). 확정적 비존재(No): Passive_Crossover_Network 1건.

---

**[MR_v1.8 반영 메모]**: 이 파일은 `upload/SB6r_v1.5.md`를 이 저장소의 raw-spec으로 이관한 것이다(기존 역재구성본을 대체, 원본 파일 자체는 없어 폴더화하지 않음). `public/js/domains/speakers/data/la/subwoofers.data.js`에 Cardioid_Capability/Preset Guide를 신규 반영했다. 기존 필드(dims/freqs/watt 등)는 대조 후 이상 없음.
