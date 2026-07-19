# Syva Low (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(Syva의 컴패니언 서브우퍼, 2x12" 고출력 저역확장형)

**스켈레톤 근거**: `speakers/LA/KS28_v1.5.md`를 뼈대로 사용 — Syva Low는 KS28과 마찬가지로 LF 전용(Way_Count=1) 서브우퍼이며 외부 앰프 구동 방식도 동일하다. Syva/Syva_Sub와 물리적으로 동일한 소스 문서(Syva_OM_EN.pdf)를 공유하지만 자체 스펙 표(p.72 "Syva Low specifications")와 전용 치수 도면을 갖는 별개 물리 제품이라 L2/L2D·GSL8/GSL12 전례와 동일 원칙으로 분리 파일 처리. KS28과의 차이: (1) 2x12" 드라이버(KS28은 1x21"), (2) 4Ω 임피던스(KS28은 8Ω 계열), (3) Syva 전용 AutoConnect 스택 구성 지원(하부에 배치되어 Syva에 전원 패스스루).

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | Syva Low | - |
| Model_Number | null | - |
| Product_Series | S Series | - |
| Product_Category | high power low frequency subwoofer | - |
| Product_Type | Subwoofer | - |
| Description | Passive low-end extension: 2 x 12" LF cone drivers, amplified by LA2Xi / LA4X / LA7.16i / LA12X | - |
| Way_Count | 1 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | 2006/42/EC Machinery Directive (rigging system, designed per BGV-C1 guidelines) | - |
| WEEE_Marking | Yes (EU) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Syva_OM_EN.pdf(Syva owner's manual EN version 2.0, Syva/Syva Low/Syva Sub 공용 문서) p.72 "Syva Low specifications", p.4 "Safety > Instructions"(Compliance_Standards/WEEE_Marking, Syva와 공용 챕터); Syva_Low_AE_EN.docx.
**Product_Series/Product_Type(신규 Key, 사용자 지시 2026-07-17)**: Syva_Low_AE_EN.docx 최상단 헤더("Syva Low - Subwoofer" / "S Series") — 서브우퍼 계열이지만 KS21/SB 계열과 달리 Syva 패밀리는 시리즈명이 명시됨(Syva 자신과 동일 "S Series"), Product_Type="Subwoofer" 채택.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz [1] | [SYVA LOW_100]: 40 - 130 | Hz |
| Frequency_Response_6dB_Hz [1] | 42 - 110 | Hz |
| Frequency_Response_3dB_Hz [1] | 47 - 93 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak | 137 dB (with LA4X/LA12X) / 131 dB (with LA2Xi) | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | null | deg |
| Nominal_Directivity_Vertical | standard | - |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | SYVA LOW_100 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Syva_OM_EN.pdf p.72 "Syva Low specifications"("Low frequency limit (-10 dB): 40 Hz ([SYVA LOW_100])"); Syva_Low_AE_EN.docx "Technical requirements"(6dB/3dB 임계값 및 -10dB 상한 130Hz 출처).
**[1] Usable_Bandwidth_Hz 상한**: OM 자체 스펙 표는 하한(40Hz)만 명시하고 상한을 생략 — AE 시방서로 상한(130Hz) 및 6dB/3dB 세부 임계값 확보(KS28의 AE 통합 패턴과 동일).
**Nominal_Directivity_Vertical="standard"**: AE "Coverage: Enclosure directivity: standard" — 각도값이 아닌 배치 모드 서술.
**Cardioid_Capability=No(확정적 비존재)**: Syva_OM_EN.pdf/Syva_Low_AE_EN.docx 전량을 "cardioid" 키워드로 스캔 — 0건 검출.
**Max_SPL_Peak**: OM "137 dB ([SYVA LOW_100]) with LA4X / LA12X" / "131 dB ([SYVA LOW_100]) with LA2Xi" — LA7.16i 조건은 원문에 명시 없음.
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 2 x 12" cone driver | - |
| LF_Acoustical_Load | bass-reflex, L-Vents | - |
| Passive_Crossover_Network | No | - |
| LF_Nominal_Impedance | 4 | Ohm |
| Nominal_Impedance_Overall | null | Ohm |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_Overall | 894 | W |
| Peak_Power_Handling_10ms_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: Syva_OM_EN.pdf p.72 "Syva Low specifications"; Syva_Low_AE_EN.docx "Technical requirements"(RMS_Power_Handling_Overall=894W 출처).
**Passive_Crossover_Network=No**: Syva_OM_EN.pdf 전문을 "crossover" 키워드로 전량 스캔 — 0건 검출(KS28과 동일 근거, 단일 대역 서브우퍼).
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

**출처**: Syva_OM_EN.pdf p.14 "Connectors"("Syva Low and Syva Sub are equipped with one 4-point speakON connector. Use the labels to differentiate the subwoofers."); p.15 "Syva combined with Syva Low or Syva Sub"("With Syva on top of Syva Low or Syva Sub, AutoConnect is enabled and power is routed through the subwoofer connector plate to the enclosure").
**AutoConnect_Pinout**: Syva의 AutoConnect(1+/1-=LF, 2+/2-=MF/HF 분리 2채널)와 달리 Syva Low 자신은 단순 전원 패스스루 역할만 하며 원문에 별도 핀 배열 표가 없음 — Syva_v1.0.md의 AutoConnect_Pinout과는 다른 개념(신규 커넥터 고유 Key이므로 값 구조도 제품마다 다르게 유지, 타 파일에 강제 동기화하지 않음).

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA2Xi, LA4X, LA7.16i, LA12X | - |
| Max_Enclosures_Per_Controller_Output [1] | LA2Xi: 1(SE) / LA4X: 1 / LA7.16i: 1 / LA12X: 2 | count |
| Max_Enclosures_Per_Controller_Total [1] | LA2Xi: 4(SE) / LA4X: 4 / LA7.16i: 8 / LA12X: 6 | count |
| Crossover_Type | Active (1-way, subwoofer) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Syva_OM_EN.pdf "Enclosure drive capacity per amplified controller" 표(Syva/Syva Low/Syva Sub 공용 표).
**[1] LA12X 각주**: 원문 "LA12X can drive up to two Syva Low per output, but no more than six per controller at high level" — output당 2대, 컨트롤러 전체 6대(다른 앰프의 "output당 값 x output수=전체값" 산술과 다른 특수 제약, 원문 그대로 채택).

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | Syva Base(그라운드 스택용) | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | null | count |
| Weight_Net | 29 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: Syva_OM_EN.pdf p.72 "Syva Low specifications"("Weight (net): 29 kg"); p.18 "Rigging system description > Syva Low and Syva Sub".

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

**출처**: Syva_OM_EN.pdf p.72 "Syva Low dimensions"(치수 도면); Syva_Low_AE_EN.docx "Physical data" - "Dimensions (W, H, D): 849 mm, 334 mm, 350 mm"(AE 축 라벨링과 도면 3개 숫자 완전 일치, 부가 숫자 없음).

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| Syva Low standard 구성 | [SYVA LOW_100] | 40 - 20000(Syva 결합 시) | null | null |

### 주석 및 출처 (Notes & Sources)

**출처**: Syva_OM_EN.pdf "Syva with Syva Low" 챕터 — Syva Low 자신의 단독 대역폭 서술은 없고 항상 Syva와 결합된 시스템 대역폭(40Hz-20kHz)으로만 서술됨(KS28과 동일한 구조적 이유 — 2차 엘리먼트 전용).

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유(조사 완료 후 확정)**: Syva Low는 항상 2차 엘리먼트(서브우퍼)로만 등장 — Syva_OM_EN.pdf 전체를 확인한 결과 Syva Low를 1차 엘리먼트로 하는 조합이 원본 어디에도 없다. 실제 조합별 지연값([SYVA]+[SYVA LOW_100]+[SYVA SUB_100] 등)은 Syva_v1.0.md에 Syva 자신의 관점으로 이미 기록되어 있다. [SYVA LOW SYVA] hybrid 구성 자체는 원문에 "No pre-alignment delay values are required"로 명시되어 있어 이 조합에는 애초에 딜레이 개념이 성립하지 않는다.

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

**출처**: Syva_OM_EN.pdf p.22-23 "Mechanical safety"("Syva Low / Syva Sub" 표, "Syva on top of Syva Low or Syva Sub" 표 — Syva와 공용 챕터, 준수 규격/안전계수 동일).

## Null Report

**미확인(정보 부족)**: Model_Number, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, Nominal_Directivity_Horizontal_deg, RMS_Power_Handling_LF, Peak_Power_Handling_10ms_Overall, Max_Enclosures_Per_Controller_Output/Total(LA2Xi BTL 모드 값), Handles, Rigging_Components_Material, Max_Wind_Load, preset_guide_and_matching(Recommended_Ratio/Minimum_Line_Length) — 14건.
**비적용**: Link_Connector, Inter_Enclosure_Angles_deg — 2건. (PA_COM_Pinout_*/Terminal_Block_Pinout_* 등 타 커넥터 고유 Key는 Syva Low 자신의 SpeakON_Pinout_*/AutoConnect_Pinout으로 이미 표현되어 애초에 생성하지 않음, null 목록에서 제외.)

**총계**: null 16건 (미확인 14건 + 비적용 2건). 확정적 비존재(0/No)로 명시한 항목은 2건 — Passive_Crossover_Network(No, 원문 전량 스캔 근거), Cardioid_Capability(No, 원문 전량 스캔 근거).

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — speakers 카테고리(Syva의 컴패니언 고출력 저역확장 서브우퍼, 2x12"). KS28_v1.5.md를 스켈레톤으로 사용, Syva_OM_EN.pdf(Syva/Syva Low/Syva Sub 공용 문서) + Syva_Low_AE_EN.docx 통합. Syva와 물리적으로 별개 제품(자체 스펙 표/치수 도면)이라 별도 파일 분리. 신규 커넥터 개념 AutoConnect_Pinout 적용(단순 전원 패스스루 역할, Syva 자신의 AutoConnect와는 다른 단순 구조). delay_defaults는 KS28과 동일한 구조적 이유(2차 엘리먼트 전용)로 미확인 유지 — 실값은 Syva_v1.0.md에 이미 기록됨. Cardioid_Capability=No 최초 확인. |
| v1.1 | 프로젝트 전역 동기화 라운드(사용자 지시 2026-07-17). Product_Series(S Series)/Product_Type(Subwoofer) Key 신설 — Syva_Low_AE_EN.docx 최상단 헤더("Syva Low - Subwoofer" / "S Series") 기준, 서브우퍼 계열이지만 KS21/SB 계열과 달리 Syva 패밀리는 시리즈명이 명시됨(Syva 자신과 동일 "S Series"). d&b 고유 개념인 signal_processing 섹션(CUT_Mode_Available/HFC_Function_Settings/Coupling_Function_Range) 삭제 — L-Acoustics 제품에는 해당 개념 자체가 없어 비적용 표기에서 섹션 삭제로 정리(Link_Connector/Inter_Enclosure_Angles_deg는 비적용으로 잔류). null 총계 17건(비적용 5건)에서 14건(비적용 2건)으로 갱신. |
| v1.2 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-18, d&b 대량 배치 완료 후) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래, 미확인), `Peak_Power_Handling_10ms_Overall`(d&b CCL8 유래, 미확인) 반영. Null Report 16건(미확인 14건+비적용 2건)으로 갱신. |
