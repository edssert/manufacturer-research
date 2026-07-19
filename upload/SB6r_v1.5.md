# SB6r (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(SB6i의 recessed/매입형 파생형)

**스켈레톤 근거**: `speakers/LA/SB6i_v1.0.md`를 뼈대로 사용 — SB6r은 원문이 명시적으로 "SB6r is the recessed version of the SB6i enclosure"라 서술하는 매입형 파생품으로, 스펙 표 수치(저역한계/Max SPL: 29Hz/110dB, 29Hz/111dB, 32Hz/115dB — 3개 프리셋 전부)가 SB6i와 완전히 일치함을 원문에서 직접 확인했다. A&E 시방서는 제공되지 않아 OM(SB6r owner's manual EN version 1.1) 단일 소스 기준.

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
**Product_Series/Product_Type(신규 Key, 사용자 지시 2026-07-17)**: SB6r 자신의 문서에는 series/type 헤더가 없어(A&E 미제공), SB6i_AE_EN.docx 헤더("SB6i - Subwoofer")를 install/recessed 상속 정책과 동일 근거로 적용 — Product_Type="Subwoofer", Product_Series는 SB6i도 null이라 상속할 값 자체가 없어 null.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz [1] | [SB6_60]: 29 - null / [SB6_100]: 29 - null / [SB6_200]: 32 - null | Hz |
| Frequency_Response_6dB_Hz [2] | [SB6_60]: 32-90 / [SB6_100]: 31-120 / [SB6_200]: 35-250 | Hz |
| Frequency_Response_3dB_Hz [2] | [SB6_60]: 34-75 / [SB6_100]: 35-100 / [SB6_200]: 40-200 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak | [SB6_60]: 110 / [SB6_100]: 111 / [SB6_200]: 115 | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | null | deg |
| Nominal_Directivity_Vertical | null | - |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | SB6_60, SB6_100, SB6_200 | - |

### 주석 및 출처 (Notes & Sources)

**Cardioid_Capability=No(확정적 비존재)**: SB6r_OM_EN_1.1.pdf(단일 소스, A&E 미제공) 전량을 "cardioid" 키워드로 스캔 — 0건 검출, SB6i와 동일 근거(반전 배치용 프리셋 자체 부재).

**출처**: SB6r_OM_EN.pdf p.45 "SB6r specifications".
**[1] Usable_Bandwidth_Hz 상한 미확인**: OM 스펙 표는 "Low frequency limit (-10 dB)"만 제공하고 상한(예: 20kHz)을 명시하지 않음 — SB6i는 자체 A&E 시방서로 상한 및 -6dB/-3dB 세부값(예: 29-107Hz)을 확보했으나, SB6r은 A&E 미제공이라 원문에 없는 수치를 SB6i에서 끌어와 채우지 않음(SB6i와 저역한계·SPL이 완전히 동일하다는 사실은 확인되었으나, 상한/중간 dB 임계값까지 동일하다고 단정할 근거는 SB6r 자신의 문서에 없음). Usable_Bandwidth_Hz 자체(-10dB 상한)는 이 판단을 유지하나, 아래 [2]의 사용자 정책에 따라 6dB/3dB 세부값은 별도로 상속 처리.
**[2] Frequency_Response_6dB_Hz/3dB_Hz = SB6i 값 상속(사용자 정책 지침 2026-07-18)**: install/recessed 버전이 표준형과 치수·무게·리깅 외 특이사항이 없다면 드라이버·인클로저 구성이 동일 스펙이므로 상속 가능하다는 사용자 지침에 따라 SB6i_v1.3.md 값 채택 — SB6r 자신의 스켈레톤 근거 각주에서 이미 SB6i와의 스펙 완전 동일성(저역한계/Max SPL 3개 프리셋 전부)이 독립 확인되어 있어 이 정책의 전제 조건 충족. **RMS_Power_Handling_Overall은 상속 대상 아님**: SB6i 자신도 이 Key가 비적용(구조적 부재)이므로 SB6r도 동일하게 비적용 유지(끌어올 실값 자체가 없음).
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 2 x 6.5" cone driver | - |
| LF_Acoustical_Load | bass-reflex, L-Vents | - |
| Passive_Crossover_Network | No | - |
| LF_Nominal_Impedance | 4 | Ohm |
| Nominal_Impedance_Overall | null | Ohm |
| RMS_Power_Handling_LF [3] | 85 | W |
| RMS_Power_Handling_Overall | null | W |
| Peak_Power_Handling_10ms_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: SB6r_OM_EN.pdf p.45 "SB6r specifications".
**[3] RMS_Power_Handling_LF = SB6i 값 상속(사용자 정책 지침 2026-07-18)**: SB6i는 AE로 85W를 확보했으나 SB6r은 A&E 미제공, OM 스펙 표에도 파워 핸들링 항목 자체가 없어 v1.0에서는 미확인 유지했음 — install/recessed 상속 정책에 따라 SB6i_v1.3.md 값(85W) 채택(각주 [2]와 동일 근거).
**Peak_Power_Handling_10ms_Overall(신규 Key, 비적용)**: d&b CCL8에서 신설된 범용 Key — RMS_Power_Handling_Overall과 동일 사유(LF 단일 대역 통합 수치 개념 자체가 무의미)로 비적용, SB6i도 동일 처리라 상속 대상 아님.

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

**출처**: SB6r_OM_EN.pdf p.45 "SB6r specifications"("Rigging and handling"). SB6i(8.6kg)보다 가벼움 — 매입형이라 전면 그릴 등 일부 부품이 없는 것으로 추정.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 360 | mm |
| Height_mm | 532 | mm |
| Depth_mm | 99 | mm |
| Dimensions_Raw [1] | 360 / 532 / 99 / 104.2 | mm |
| Cabinet_Material | premium grade Baltic beech and birch plywood | - |
| Front_Material | null | - |
| Rigging_Components_Material | null | - |
| Finish_Color | dark grey brown Pantone 426 C | - |
| IP_Rating [2] | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB6r_OM_EN.pdf p.45-46 "SB6r specifications"/"SB6r dimensions"(치수 도면, SB6i와 완전 동일 수치).
**[1] Dimensions_Raw / Width·Height·Depth_mm 축 확정(재조사 완료, 2026-07-18)**: SB6i와 동일 도면 수치(360/532/99/104.2mm) — 이번에 SB6r 자신의 p.45-46 도면을 PowerShell+Windows.Data.Pdf로 이미지 렌더링해 육안 확인, 전면도에 가로 360mm(폭)·세로 532mm(높이), 측면 입면도 상단에 99mm(깊이)로 명확히 표기됨을 독립 재확인했다. 측면도 하단의 104.2mm는 별도 작은 구획(후면 실링 플레이트 관련 부가 치수로 추정)에 표기되어 있어 깊이 값(Depth_mm)과 구분되는 부가 치수로 판단, Dimensions_Raw에만 원문 그대로 보존한다(TODO.md 치수 W/H/D 축 구분 신뢰도 감사 항목 해소).
**Front_Material 비적용 사유**: 매입형(recessed) 제품이라 전면 그릴/패브릭 스펙이 원문 표에서 빠짐(X4r과 동일 패턴).
**Finish_Color 단순화**: SB6i는 3가지 마감을 제공하나 SB6r은 원문에 "dark grey brown Pantone 426 C" 1가지만 명시.
**[2] IP_Rating 조건부**: OM 각주 2 "When integrated in-wall or in-ceiling with screen and connector sealing plate".

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| SB6r standard configuration | [SB6_60] / [SB6_100] / [SB6_200] | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: OM 자체 스펙 표에 저역한계만 있고 전체 대역 범위(상한 포함)가 없어 Frequency_Range_10dB_Hz를 채울 수 없음. X6i/X4i 계열과의 조합 데이터는 원본에서 별도 확인하지 못함(X6i/X4i 매뉴얼에는 SB6i(r) 표기로 SB6i와 SB6r을 함께 지칭하는 조합 프리셋이 있었으나, SB6r 자신의 문서에는 상세 조합표가 없음).

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유(조사 완료 후 확정)**: SB6i와 동일한 구조적 이유 — SB6r은 항상 2차 엘리먼트로만 등장. X6i 매뉴얼의 "SB6i(r)" 표기가 SB6i와 SB6r을 공용으로 다루는 것으로 보이나, 정확한 SB6r 전용 딜레이 값은 X6i/X4i 파일에도 "SB6i" 명의로만 기록되어 있어(SB6r 명의 데이터 별도 확인 안 됨) 이 파일에서는 미확인으로 유지.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| null | null | null | null |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | null | - |
| Max_Wind_Load | null | Beaufort |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: SB6i와 동일 사유.

## Null Report

**미확인(정보 부족)**: Model_Number, WEEE_Marking, Usable_Bandwidth_Hz(상한), Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, Nominal_Directivity_Horizontal_deg, Nominal_Directivity_Vertical, Link_Connector, Terminal_Block_Pinout_2, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, Handles, Front_Material, Rigging_Components_Material, preset_guide_and_matching(전 항목), delay_defaults(전 항목), mechanical_safety(전 항목), Safety_Factor, Max_Wind_Load — 21건.
**비적용**: Nominal_Impedance_Overall, RMS_Power_Handling_Overall, Peak_Power_Handling_10ms_Overall — 3건. (PA_COM_Pinout_*/SpeakON_Pinout_* 등 타 커넥터 고유 Key는 SB6r 자신의 Terminal_Block_Pinout_*으로 이미 표현되어 애초에 생성하지 않음, null 목록에서 제외. MF_Transducer/MF_Acoustical_Load/MF_Nominal_Impedance/RMS_Power_Handling_MF/HF_Transducer/HF_Acoustical_Load/HF_Nominal_Impedance/RMS_Power_Handling_HF는 v1.2부터 삭제됨.)

**총계**: null 24건 (미확인 21건 + 비적용 3건). 확정적 비존재(0/No)로 명시한 항목은 1건 — Passive_Crossover_Network(No).

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — speakers 카테고리(SB6i의 recessed/매입형 파생형). SB6i_v1.0.md를 스켈레톤으로 사용, OM(SB6r owner's manual EN version 1.1) 단일 소스(A&E 시방서 미제공). 스펙 표 수치(저역한계/Max SPL)가 SB6i와 완전 동일함을 확인했으나, A&E 부재로 대역 상한/파워 핸들링/조합 데이터는 SB6i에서 끌어오지 않고 정직하게 미확인으로 유지(SKILL "미확인 원본성 요건" 원칙 준수). |
| v1.1 | delay_defaults 표의 컬럼명 `K1_Delay_ms`를 `Primary_Element_Delay_ms`로 전면 개명(SKILL v1.18) — 값 변경 없음(사용자 지적 2026-07-17). |
| v1.2 | MF_Transducer/MF_Acoustical_Load/MF_Nominal_Impedance/RMS_Power_Handling_MF/HF_Transducer/HF_Acoustical_Load/HF_Nominal_Impedance/RMS_Power_Handling_HF 8개 Key 삭제(SKILL v1.19) — 이 제품은 LF 전용 서브우퍼 구조라 MF/HF 대역 드라이버 자체가 없으므로, null 동기화 대상이 아니라 삭제 대상으로 재분류(K1 v1.4의 기존 반대 판단을 뒤집는 정책 변경, GSL의 Front_LF_Transducer와 동일 원칙 적용). |
| v1.3 | Cardioid_Capability 신규 Key 적용(No, 원문 전량 스캔 근거). d&b 고유 signal_processing(CUT_Mode/HFC/Coupling) 섹션 삭제(사용자 지적 2026-07-18, `speakers/CLAUDE.md` 규칙 2 위반 시정). **사용자 정책 지침(2026-07-18)에 따라 Frequency_Response_6dB_Hz/3dB_Hz/RMS_Power_Handling_LF를 SB6i_v1.3.md 값으로 상속**(85W 등) — install/recessed 버전이 표준형과 치수·무게·리깅 외 특이사항이 없다면 드라이버·인클로저 구성이 동일 스펙이므로 상속 허용(스켈레톤 근거 각주로 스펙 완전 동일성 이미 확인됨). RMS_Power_Handling_Overall은 SB6i 자신도 구조적 비적용이라 상속 대상 없음(변경 없음). Product_Series/Product_Type 신규 Key는 다음 라운드 예정(미적용). |
| v1.4 | 치수 W/H/D 축 구분 신뢰도 감사(TODO.md, 2026-07-18) — A&E 시방서 미제공으로 축 확정 근거가 약했던 Width/Height/Depth_mm을 p.45-46 도면 PowerShell+Windows.Data.Pdf 이미지 렌더링으로 육안 재확인, 기존 값(360/532/99mm)이 정확함을 확정(변경 없음, 각주만 보강). |
| v1.5 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-18, d&b 대량 배치 완료 후) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래, 미확인), `Peak_Power_Handling_10ms_Overall`(d&b CCL8 유래, 비적용 — RMS_Power_Handling_Overall과 동일 사유) 반영. Null Report 24건(미확인 21건+비적용 3건)으로 갱신. |
