# Syva Sub (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(Syva의 컴패니언 서브우퍼, 1x12" 초저역 확장형)

**스켈레톤 근거**: `speakers/LA/Syva_Low_v1.0.md`를 뼈대로 사용 — Syva Sub는 Syva Low와 물리적 인클로저 치수(849x334x350mm)를 완전히 공유하는 자매품이나 드라이버가 1x12"(Syva Low는 2x12")뿐이라 임피던스(8Ω vs 4Ω)/중량(27kg vs 29kg)/RMS 파워(250W vs 894W)가 상이한 별개 물리 제품(자체 스펙 표 p.74 "Syva Sub specifications" 보유) — Syva/Syva_Low와 동일한 소스 문서(Syva_OM_EN.pdf) 공유.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | Syva Sub | - |
| Model_Number | null | - |
| Product_Series | S Series | - |
| Product_Category | infra low frequency subwoofer | - |
| Product_Type | Subwoofer | - |
| Description | Passive subwoofer: 1 x 12" LF cone driver, amplified by LA2Xi / LA4X / LA7.16i / LA12X | - |
| Way_Count | 1 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | 2006/42/EC Machinery Directive (rigging system, designed per BGV-C1 guidelines) | - |
| WEEE_Marking | Yes (EU) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Syva_OM_EN.pdf(Syva owner's manual EN version 2.0, Syva/Syva Low/Syva Sub 공용 문서) p.74 "Syva Sub specifications", p.4 "Safety > Instructions"(Compliance_Standards/WEEE_Marking, Syva/Syva Low와 공용 챕터); Syva_Sub_AE_EN.docx.
**Product_Series/Product_Type(신규 Key, 사용자 지시 2026-07-17)**: Syva_Sub_AE_EN.docx 최상단 헤더("Syva Sub - Subwoofer" / "S Series") — Syva/Syva Low와 동일 시리즈, Product_Type="Subwoofer" 채택.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz [1] | [SYVA SUB_100]: 27 - 120 | Hz |
| Frequency_Response_6dB_Hz [1] | 29 - 100 | Hz |
| Frequency_Response_3dB_Hz [1] | 33 - 80 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak | 128 dB (with LA2Xi bridge mode/LA4X/LA12X) / 123 dB (with LA2Xi) | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | null | deg |
| Nominal_Directivity_Vertical | standard | - |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | SYVA SUB_100 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Syva_OM_EN.pdf p.74 "Syva Sub specifications"("Low frequency limit (-10 dB): 27 Hz ([SYVA SUB_100])"); Syva_Sub_AE_EN.docx "Technical requirements".
**[1] Usable_Bandwidth_Hz 소스 간 불일치 발견**: Syva_Sub_AE_EN.docx는 대역폭을 **두 세트**로 병기한다 — "27 Hz - 120 Hz(-10dB)/29-100(-6dB)/33-80(-3dB)" **및** "29 Hz - 200 Hz(-10dB)/32-150(-6dB)/37-105(-3dB)". 그러나 OM 스펙 표는 프리셋명을 [SYVA SUB_100] 단 하나만 명시하고 두 번째 세트(29-200Hz)에 대응하는 별도 프리셋명을 어디에도 서술하지 않는다 — OM "Loudspeaker configurations" 챕터를 전량 재확인했으나 [SYVA SUB_60]이나 이와 유사한 2번째 프리셋명은 발견되지 않았다. 원문에 라벨이 없는 수치를 임의로 두 번째 프리셋에 배정하지 않고, OM이 명시적으로 이름 붙인 첫 번째 세트(27-120Hz, [SYVA SUB_100])만 채택 — 두 번째 세트(29-200Hz)는 정체 불명 상태로 이 각주에 보존(향후 재조사 필요, 시간 배분상 방치가 아니라 원문 자체에 대응 프리셋명이 없어 구조적으로 미확정).
**Cardioid_Capability=No(확정적 비존재)**: Syva_OM_EN.pdf/Syva_Sub_AE_EN.docx 전량을 "cardioid" 키워드로 스캔 — 0건 검출.
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 1 x 12" cone driver | - |
| LF_Acoustical_Load | bass-reflex, L-Vents | - |
| Passive_Crossover_Network | No | - |
| LF_Nominal_Impedance | 8 | Ohm |
| Nominal_Impedance_Overall | null | Ohm |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_Overall | 250 | W |
| Peak_Power_Handling_10ms_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: Syva_OM_EN.pdf p.74 "Syva Sub specifications"; Syva_Sub_AE_EN.docx "Technical requirements"(RMS_Power_Handling_Overall=250W 출처).
**Passive_Crossover_Network=No**: Syva_OM_EN.pdf 전문을 "crossover" 키워드로 전량 스캔 — 0건 검출.
**Peak_Power_Handling_10ms_Overall(신규 Key)**: d&b CCL8에서 신설된 범용 Key(10ms 피크 파워 핸들링, 업계 표준 측정 조건) — 이 제품 자신의 RMS_Power_Handling_Overall은 실값을 보유하나 이번 일괄 동기화 라운드에서는 원본을 재조회하지 않고 소급 반영했으므로 미확인으로 유지(원본성 요건, LA12X 브릿징 Key 판단 사례와 동일 원칙).

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 4-point speakON | - |
| Link_Connector | null | - |
| SpeakON_Pinout_1 | + / - | - |
| SpeakON_Pinout_2 | Not linked | - |
| AutoConnect_Pinout | 1 (하부에 배치 시 Syva에 전원 패스스루 — 자체 신호 채널 분리 없음) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Syva_OM_EN.pdf p.14 "Connectors"("Syva Low and Syva Sub are equipped with one 4-point speakON connector"), p.15 "Syva combined with Syva Low or Syva Sub" — Syva Low와 완전 동일 구조.

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA2Xi, LA4X, LA7.16i, LA12X | - |
| Max_Enclosures_Per_Controller_Output | LA2Xi: 1(SE)/1(BTL) / LA4X: 1 / LA7.16i: 1 / LA12X: 3 | count |
| Max_Enclosures_Per_Controller_Total | LA2Xi: 4(SE)/2(BTL) / LA4X: 4 / LA7.16i: 16 / LA12X: 12 | count |
| Crossover_Type | Active (1-way, subwoofer) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Syva_OM_EN.pdf "Enclosure drive capacity per amplified controller" 표(Syva/Syva Low/Syva Sub 공용 표) — Syva Sub 행은 Syva 자신과 동일한 앰프별 대수를 가지며 Syva Low(LA12X 예외 각주 있음)와는 다름.

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | Syva Base(그라운드 스택용) | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | null | count |
| Weight_Net | 27 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: Syva_OM_EN.pdf p.74 "Syva Sub specifications"("Weight (net): 27 kg"); p.18 "Rigging system description > Syva Low and Syva Sub"(공용 챕터).

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 849 | mm |
| Height_mm | 334 | mm |
| Depth_mm | 350 | mm |
| Dimensions_Raw | 849 / 334 / 350 | mm |
| Cabinet_Material | premium grade Baltic beech and birch plywood | - |
| Front_Material | coated steel grill, acoustically neutral 3D fabric | - |
| Rigging_Components_Material | null | - |
| Finish_Color | dark grey brown Pantone 426 C, pure white RAL 9010, custom RAL code on special order | - |
| IP_Rating | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Syva_OM_EN.pdf p.74 "Syva Sub dimensions"(치수 도면, Syva Low와 완전 동일 수치); Syva_Sub_AE_EN.docx "Physical data" - "Dimensions (W, H, D): 849 mm, 334 mm, 350 mm"(AE 축 라벨링과 도면 3개 숫자 완전 일치, 부가 숫자 없음).
**Syva Low와 완전 동일 인클로저 치수**: 드라이버 수(1발 vs 2발)만 다르고 외형 캐비닛 치수는 동일 — Syva Sub 자신의 AE/도면에서 독립 재확인.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| Syva Sub standard 구성 | [SYVA SUB_100] | 27 - 20000(Syva 결합 시) | null | null |

### 주석 및 출처 (Notes & Sources)

**출처**: Syva_OM_EN.pdf "Syva with Syva Sub" 챕터 — Syva Sub 자신의 단독 대역폭 서술은 없고 항상 Syva와 결합된 시스템 대역폭(27Hz-20kHz)으로만 서술됨(Syva Low와 동일한 구조적 이유 — 2차 엘리먼트 전용).

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유(조사 완료 후 확정)**: Syva Sub는 항상 2차 엘리먼트(서브우퍼)로만 등장 — Syva Low와 동일한 구조적 이유. 실제 조합별 지연값([SYVA]+[SYVA SUB_100]=Syva 0ms/Syva Sub 2.6ms, [SYVA]+[SYVA LOW_100]+[SYVA SUB_100]=Syva Sub 3.8ms 등)은 Syva_v1.0.md에 Syva 자신의 관점으로 이미 기록되어 있다. [SYVA SUB SYVA] hybrid 구성 자체는 원문에 "No pre-alignment delay values are required"로 명시되어 있어 이 조합에는 애초에 딜레이 개념이 성립하지 않는다.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| ground-stacked | Syva Base | 1 | 1 |
| ground-stacked | no rigging accessory | 1 | 1 |
| ground-stacked (Syva 스택 하부) | Syva Base | 1 | 1 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 4:1 | - |
| Max_Wind_Load | null | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: Syva_OM_EN.pdf p.22-23 "Mechanical safety"("Syva Low / Syva Sub" 표, "Syva on top of Syva Low or Syva Sub" 표 — Syva/Syva Low와 공용 챕터, 준수 규격/안전계수 동일).

## Null Report

**미확인(정보 부족)**: Model_Number, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, Nominal_Directivity_Horizontal_deg, RMS_Power_Handling_LF, Peak_Power_Handling_10ms_Overall, Handles, Rigging_Components_Material, Max_Wind_Load, preset_guide_and_matching(Recommended_Ratio/Minimum_Line_Length) — 12건.
**비적용**: Link_Connector, Inter_Enclosure_Angles_deg — 2건. (PA_COM_Pinout_*/Terminal_Block_Pinout_* 등 타 커넥터 고유 Key는 Syva Sub 자신의 SpeakON_Pinout_*/AutoConnect_Pinout으로 이미 표현되어 애초에 생성하지 않음, null 목록에서 제외.)

**총계**: null 14건 (미확인 12건 + 비적용 2건). 확정적 비존재(0/No)로 명시한 항목은 2건 — Passive_Crossover_Network(No, 원문 전량 스캔 근거), Cardioid_Capability(No, 원문 전량 스캔 근거).

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — speakers 카테고리(Syva의 컴패니언 초저역 확장 서브우퍼, 1x12"). Syva_Low_v1.0.md를 스켈레톤으로 사용, Syva_OM_EN.pdf(Syva/Syva Low/Syva Sub 공용 문서) + Syva_Sub_AE_EN.docx 통합. Syva Low와 인클로저 치수는 동일하나 드라이버 수/임피던스/RMS 파워가 상이한 별개 제품임을 확인. **AE 시방서의 대역폭 이중 표기(27-120Hz + 29-200Hz) 소스 불일치 발견** — OM에는 [SYVA SUB_100] 프리셋(27-120Hz)만 명시되어 있고 두 번째 세트(29-200Hz)에 대응하는 프리셋명이 OM "Loudspeaker configurations" 챕터 전량 재확인에도 없어 구조적으로 미확정 상태임을 각주에 명시(임의 배정 금지). delay_defaults는 Syva Low와 동일한 구조적 이유(2차 엘리먼트 전용)로 미확인 유지 — 실값은 Syva_v1.0.md에 이미 기록됨. Cardioid_Capability=No 최초 확인. |
| v1.1 | 프로젝트 전역 동기화 라운드(사용자 지시 2026-07-17). Product_Series(S Series)/Product_Type(Subwoofer) Key 신설 — Syva_Sub_AE_EN.docx 최상단 헤더("Syva Sub - Subwoofer" / "S Series") 기준, Syva/Syva Low와 동일 시리즈. d&b 고유 개념인 signal_processing 섹션(CUT_Mode_Available/HFC_Function_Settings/Coupling_Function_Range) 삭제 — L-Acoustics 제품에는 해당 개념 자체가 없어 비적용 표기에서 섹션 삭제로 정리(Link_Connector/Inter_Enclosure_Angles_deg는 비적용으로 잔류). null 총계 15건(비적용 5건)에서 12건(비적용 2건)으로 갱신. |
| v1.2 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-18, d&b 대량 배치 완료 후) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래, 미확인), `Peak_Power_Handling_10ms_Overall`(d&b CCL8 유래, 미확인) 반영. Null Report 14건(미확인 12건+비적용 2건)으로 갱신. |
