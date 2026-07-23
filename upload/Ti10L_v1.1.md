# Ti10L (d&b audiotechnik) — Master Schema

**Category**: speakers | **Brand**: d&b audiotechnik (db) | **Schema Phase**: Phase 4 (d&b 10번째 제품군 투입, T10의 설치용 자매 제품)

**스켈레톤 근거**: `speakers/db/T10_v1.0.md`를 뼈대로 사용 — 트랜스듀서/크로스오버/임피던스/파워 핸들링/치수 등 음향·물리 스펙이 T10과 완전히 동일하다(원문 "Ti10L: Line source version including line array rigging devices... acoustically identical" — T10과 Ti10L/Ti10P는 사실상 동일한 음향 설계를 리깅 하드웨어 구성만 다르게 공급하는 관계). 커넥터는 T10(NLT4 F/M)과 달리 **NL4 M**이 기본이라 이 부분만 신규 Key로 대체했다.

**Ti10L/Ti10P 관계 및 T10과의 차이(원본 근거, 중요)**: OM Chapter 2.1 "Ti-Series rigging components and arrays" — "For line and point source applications the Ti10 loudspeaker is available in two different cabinet versions **which are acoustically identical**: Ti10L: Line source version **including line array rigging devices**. It can be used as a line array and as a stand-alone loudspeaker **with both horn orientations**. Ti10P: Point source version **without line array rigging devices**. It can be used as a stand-alone loudspeaker with both horn orientations." 즉 Ti10L과 Ti10P 모두 T10과 동일하게 로테이터블 웨이브가이드+렌즈로 라인/포인트소스 두 방향 전환이 물리적으로 가능하나(스탠드얼론 사용 시), **차이는 지향 특성이 아니라 리깅 하드웨어 유무**다 — Ti10L만 캐비닛을 체인처럼 연결하는 라인어레이 리깅(Front link+Splay link)을 갖추고, Ti10P는 이 리깅이 전혀 없어 스탠드얼론(또는 6개 나사산 삽입물을 통한 포인트소스 전용 액세서리 마운팅)으로만 사용 가능하다. TODO.md의 기존 추정("고정 지향성 모델로 분리")은 부정확했음을 이번 원본 확인으로 정정 — 실제로는 "지향 고정"이 아니라 "리깅 장비 유무"가 두 제품의 진짜 차이다.

**Ti10L 고유 리깅 메커니즘**: OM Chapter 3 "Ti10L Rigging procedure" — "Ti10L and T10 cabinets have different front rigging mechanisms. The Ti10L front rigging is equipped with **hooks and fixed bolts instead of locking pins** and is hidden behind a cover in cabinet color." T10과 동일한 Z5370 T Flying frame/T-Series Rigging manual 절차를 따르되, 캐비닛 간 체결 메커니즘 자체는 T10(로킹 핀)과 다름.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | Ti10L | - |
| Model_Number | Z0551 | - |
| Product_Series | T-Series | - |
| Product_Category | very compact installation-oriented loudspeaker, line source rigging version, usable as a line array or as a stand-alone loudspeaker with both horn orientations | - |
| Product_Type | Line array loudspeaker / Point source loudspeaker (field-switchable via rotatable waveguide; includes line array chaining rigging) | - |
| Description | 2-way dipolar passive loudspeaker, acoustically identical to T10, installation-oriented "L"(line source rigging) variant with hook-and-bolt Front/Splay link mechanism; supports line arrays up to 3 cabinets via Z5373 T Cluster bracket, or larger arrays via Z5370 T Flying frame per T-Series Rigging manual procedure | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | in conformity with the provisions of the respective EC directives including all applicable amendments (specific directive names not enumerated in OM Chapter 4.1) | - |
| WEEE_Marking | Yes (EU), WEEE-Reg.-Nr. DE: 13421928 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS(Datasheet, dbaudio-datasheet-ti10l-1.1-en.pdf, 03/2023) p.1-2, AE(Architectural specifications, txt+Datasheet 공통); OM(Ti10 Manual v1.2 en, D2602.EN.01, 10/2018 — T10L/Ti10P 공용 단일 매뉴얼) Chapter 2.1 "Product description" p.5, Chapter 4.1/4.2 p.12.
**Product_Series="T-Series"**: T10과 동일 브랜드 계열(OM 전문에 "Ti-Series rigging components and arrays" 표기도 있으나 EC Declaration/전체 문맥상 T-Series 하위로 판단 — T10/T-SUB와 동일 Rigging manual 공유).
**Model_Number**: OM Chapter 4.1 "This declaration applies to: d&b Z0551 Ti10L loudspeaker / d&b Z0552 Ti10P loudspeaker."(두 제품 공동 선언).
**WEEE_Marking**: T10과 동일 등록번호(WEEE-Reg.-Nr. DE: 13421928), OM Chapter 4.2에서 직접 확인.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | null | Hz |
| Frequency_Response_5dB_Hz | 68 - 18000 | Hz |
| Frequency_Response_6dB_Hz | null | Hz |
| Frequency_Response_3dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak [1] | 132 | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| Max_SPL_Single_Module | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg [2] | 105 (line source mode); 90 (point source mode) | deg |
| Nominal_Directivity_Vertical [2] | 35 (point source mode only) | deg |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS "System data" 표; OM Chapter 2.5 "Technical specifications" p.9-10(Ti10L/Ti10P 공용 "Ti10 system data"/"Ti10L/Ti10P loudspeaker" 표).
**[1] Max_SPL_Peak — Ti10L 자신의 Datasheet 기준(Line/Arc 조건) 채택**: Ti10L SPS "Max. sound pressure (Line/Arc setup, 1 m, free field): 10D/D6 129 dB / 30D/40D/D80/D40/D20/D12 132 dB." 상위 앰프군(6종) 조건인 132dB를 대표값 채택, 129dB(10D/D6)는 보존. OM의 공용 "Ti10 system data" 표는 더 짧은 앰프 목록(10D/D6, 30D/D80/D20/D12)으로 동일 dB값을 제시 — SPS가 더 넓은 앰프 목록(40D/D40 추가) 제공.
**[1-보충] Point source 조건(참고, Ti10L 자신도 스탠드얼론 시 적용 가능)**: OM 공용 표 "Max. sound pressure (PS setup, 1 m, free field): 10D/D6 127 dB / 30D/D80/D20/D12 130 dB" — Ti10L과 Ti10P가 "acoustically identical"이므로 Ti10L을 스탠드얼론+포인트소스 방향으로 사용 시 이 조건도 물리적으로 동일하게 적용될 것으로 판단되나, Ti10L 자신의 개별 Datasheet는 Line/Arc 조건만 헤드라인으로 제시하므로 대표값에서는 제외하고 참고 각주로만 보존.
**[2] Nominal_Directivity — T10과 동일한 이중 모드**: 두 방향 모두 물리적으로 가능(원문 "with both horn orientations")하나 Ti10L은 라인어레이 리깅을 포함하는 버전이라 라인소스(105°)가 주 용도.
**Cardioid_Capability=No**: T10과 동일 근거(다이폴 배치, 카디오이드 아님) — Ti10L 자신의 SPS/AE/OM 전량 스캔으로 재확인.
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.

## signal_processing

Ti10 컨트롤러(30D/10D/D80/D20/D12/D6 등)에서 설정 가능한 파라미터형 음향 보정 기능. T10과 동일한 CUT/HFA/HFC/CPL 4종 체계를 공유하는 단일 OM(Ti10 Manual)을 사용하나, **HFC는 setup 종류(Arc/Line)에 종속되어 Ti10L에서만 실질적으로 사용 가능**하다.

| Key | Value | Unit |
|---|---|---|
| CUT_Mode_Available | Yes | - |
| CUT_Mode_Frequency_Response_5dB_Hz | 120 - 18000 | Hz |
| CUT_Mode_Frequency_Response_10dB_Hz | null | Hz |
| HFA_Function_Settings | PS(Point source) setup only; HF response attenuated starting gradually at 1 kHz, dropping approx. 3 dB at 10 kHz (Ti10L usable when configured standalone in PS setup) | - |
| HFC_Function_Settings [1] | Arc/Line setups only(원문 "HFC function (Ti10L Arc/Line setups only)"); HFC1: distances greater than 25 m (80 ft); HFC2: distances greater than 50 m (160 ft) (reference: 40% relative humidity) | - |
| Coupling_Function_Range | 0 to -9 dB attenuation (correction begins gradually around 1 kHz, maximum attenuation below 400 Hz); +0 to +5 dB LF boost (full range mode only, without subwoofers) | dB |

### 주석 및 출처 (Notes & Sources)

**출처**: OM Chapter 2.3.1 "Controller settings" p.7-8(T10과 동일 문구, "Ti10" 표기로 통일).
**[1] HFC_Function_Settings — "T10 Arc/T10 Line" setup은 라인어레이 리깅 보유 캐비닛에서만 성립**: "T10 Arc"/"T10 Line" setup은 어레이 조립(splay progression) 상황을 전제로 하므로, 라인어레이 리깅을 갖춘 Ti10L에서만 실질적으로 도달 가능한 setup이다 — Ti10P는 리깅이 없어 이 setup에 도달할 수 없음(Ti10P 파일에서는 비적용 처리).
**CPL(원문 명칭)**: T10과 동일하게 기존 Coupling_Function_Range Key 재사용.

## transducers

T10과 완전 동일(음향적으로 동일 설계).

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 2 x 6.5" driver with neodymium magnet, dipolar arrangement | - |
| Front_LF_Transducer | null | - |
| Side_LF_Transducer | null | - |
| HF_Transducer | 1 x 1.4" exit compression driver on rotatable waveguide (dedicated wave shaping device with integrated acoustic lens, field-switchable line/point source dispersion) | - |
| LF_Acoustical_Load | null | - |
| HF_Acoustical_Load | dedicated wave shaping device (rotatable waveguide + horn + acoustic lens) | - |
| Passive_Crossover_Network | Yes | - |
| Nominal_Impedance_Overall | 16 | Ohm |
| LF_Nominal_Impedance | null | - |
| HF_Nominal_Impedance | null | - |
| Front_LF_Nominal_Impedance | null | - |
| Side_LF_MF_HF_Nominal_Impedance | null | - |
| Power_Handling_Front_LF_RMS | null | W |
| Power_Handling_Front_LF_Peak_10ms | null | W |
| Power_Handling_Side_LF_MF_HF_RMS | null | W |
| Power_Handling_Side_LF_MF_HF_Peak_10ms | null | W |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_HF | null | W |
| RMS_Power_Handling_Overall | 200 | W |
| Peak_Power_Handling_10ms_Overall | 800 | W |

### 주석 및 출처 (Notes & Sources)

**출처 및 근거**: T10_v1.0.md와 완전 동일(OM "Ti10L/Ti10P loudspeaker" 통합 표, SPS "Loudspeaker data").

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector [1] | 2 x NL4 M (identical connectors, all four pins wired in parallel; either serves as input) | - |
| Link_Connector | null | - |
| NL4_Pinout_Pin1 [신규 Key] | Full-range signal (LF + HF combined via internal passive crossover); wiring 1+/1- | - |
| NL4_Pinout_Pin2 [신규 Key] | Not used by Ti10L itself — designated pass-through for actively driven subwoofers; wiring 2+/2- | - |

### 주석 및 출처 (Notes & Sources)

**출처**: OM Chapter 2.2 "Connections" p.6("Connector wiring" 도해, NL4 M pin 표); SPS "Connections"/"Pin assignment" 행.
**[1] Input_Connector — T10과 다른 커넥터 모델(신규 Key군)**: T10은 NLT4 F/M을 표준으로 쓰나, Ti10L/Ti10P는 **NL4 M**(Neutrik 4-pole speakON, NLT4와 다른 커넥터 계열)이 표준이며 T10의 NLT4_Pinout_Pin1/Pin2를 재사용하지 않고 이 제품 자신의 커넥터 모델명이 반영된 NL4_Pinout_Pin1/Pin2를 신설했다(SKILL v1.14, 커넥터 모델명이 Key에 박힌 경우 그 제품 자신의 것만 생성). 두 커넥터 모두 방향성 구분 없이 동일(T10과 동일 원칙).
**WR(Weather Resistance) 옵션**: OM "WR option (Weather Resistance)" — Faston type 커넥터(2 x 6.3mm, female)+고정 케이블(5m, H-07-RN-F 2x2.5mm²/AWG13) 옵션 구성. 기본 커넥터가 아니므로 별도 Key를 신설하지 않고 이 각주로 보존(XSLi-SVS의 Faston 커넥터와 물리적으로 동일 계열이나 T10과 마찬가지로 옵션 취급). NOTICE: "The WR option enables operation of loudspeakers in changing ambient conditions, however it is not intended to enable permanent, unprotected operation of loudspeakers outdoors."(정식 IP 등급이 아님, physical 섹션 IP_Rating 각주 참조).

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller [1] | 30D/10D/D80/D20/D12/D6 (Manual explicit list) | - |
| Max_Enclosures_Per_Controller_Output | 4 (both Ti10L Line source and Ti10P Point source setups) | count |
| Max_Enclosures_Per_Controller_Total | null | - |
| Crossover_Type | Passive (2-way, single amplifier channel, LF+HF combined via internal passive crossover network) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: OM Chapter 2.3 "Operation" p.7(NOTICE "Applicable d&b amplifiers: 30D/10D/D80/D20/D12/D6", "Cabinets per channel" 표).
**[1] Compatible_Amplified_Controller — SPS/OM 앰프 목록 차이 보존**: OM의 명시적 목록(6종)에는 40D가 없으나, SPS "Max. sound pressure" 표는 40D를 포함한 그룹을 사용 — T10과 동일한 패턴의 목록 불일치, 두 값 모두 보존.
**Max_Enclosures_Per_Controller_Output**: OM "Cabinets per channel" 표 — Ti10L Line source(T10 Arc/T10 Line) 4대, Ti10P Point source(T10 PS) 4대.

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type [1] | line array rigging devices — Front links (both sides of cabinet front) + central Splay link at rear, hook-and-fixed-bolt mechanism (not locking pins, hidden behind cabinet-color cover); Z5370 T Flying frame used per T-Series Rigging manual procedure; line arrays of up to 3 cabinets also supportable via Z5373 T Cluster bracket (flown or high-stand mounted) | - |
| Inter_Enclosure_Angles_deg | 0 - 15 (1° increments) | deg |
| Handles | null | - |
| Weight_Net | 11 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: OM Chapter 2.1 "Product description"/"Ti-Series rigging components and arrays" p.5, Chapter 3 "Ti10L Rigging procedure" p.11; SPS "Loudspeaker data"(Weight 행).
**[1] 대형 어레이(Z5370 프레임) 상한 미확인 — T10과 다른 판단**: T10은 전용 T-Series Rigging manual의 "Limitation" 절에서 명시적 상한(10/20대)을 확보했으나, 그 Rigging manual의 EC Declaration(p.42)은 대상 제품을 "d&b Z0550 T10 loudspeaker / d&b Z0560 T-SUB loudspeaker"로만 명시하고 **Ti10L(Z0551)은 열거하지 않는다** — OM Chapter 3은 "Ti10L line arrays are set up using the Z5370 T Flying frame. The rigging procedure follows the description given in the T-Series Rigging manual"이라고만 서술해 일반 절차 준용은 확인되나, T10과 동일한 수치 상한(10대/20대)이 Ti10L에도 그대로 적용되는지는 원본에 명시적 재확인이 없다 — 임의로 동일 수치를 전재하지 않고 미확인 유지, 확인된 수치는 Z5373 Cluster bracket의 3대 상한뿐(아래 mechanical_safety 참조).
**Handles**: T10과 동일 사유로 미확인.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 470 | mm |
| Height_mm | 197 | mm |
| Depth_mm | 300 | mm |
| Dimensions_Raw | null | mm |
| Cabinet_Material | polyurethane integral hard foam | - |
| Front_Material | rigid metal grill backed by an acoustically transparent foam | - |
| Rigging_Components_Material | null | - |
| Finish_Color [1] | Black | - |
| Finish_Type [1] | PCP (Polyurea Cabinet Protection), impact and weather protected | - |
| IP_Rating [2] | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.2 "Ti10L cabinet dimensions in mm [inch]"(도면, W/H/D 명시적 라벨링); AE 텍스트; OM Chapter 2.1 p.5.
**[1] Finish_Color/Finish_Type — T10과 달리 커스텀 RAL 색상 옵션 확인(신규 정보)**: AE "Special colours according to RAL table and a weather resistant option shall be available upon request." — T10 자신의 AE에는 없던 문구로, Ti10L/Ti10P가 RAL 표준 커스텀 색상 주문 옵션을 지원함을 확인(T-Series 내에서도 Ti10 라인 고유 옵션일 가능성, T10 재확인 필요 여부는 TODO 기록 대상 아님 — T10 자신의 원문에 없는 문구를 사후에 추가하지 않음). 기본 색상은 SPS 서술("black paint finish")대로 Black 유지.
**[2] IP_Rating**: WR 옵션은 "suitable for outdoor use"라는 정성적 서술만 있고 정식 IP 등급 수치 없음(XSLi-SVS의 명시적 IP55와 대조) — 미확인 유지. NOTICE 문구가 "영구적/무방비 옥외 사용을 위한 것은 아님"이라고 명시적으로 한정하고 있어, 이 부재가 단순 누락이 아니라 제조사가 의도적으로 정식 IP 등급을 부여하지 않은 것으로 판단되나 보수적으로 null 유지.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| null | null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**비적용 사유**: T10과 동일.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms |
|---|---|---|
| null | null | null |

### 주석 및 출처 (Notes & Sources)

**비적용 사유**: T10과 동일.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| line array (Z5373 T Cluster bracket, flown or high-stand mounted) | Z5373 T Cluster bracket | null | 3 Ti10L cabinets |
| line array (Z5370 T Flying frame, general) [1] | Z5370 T Flying frame | null | null |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | null | - |
| Max_Wind_Load | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: OM Chapter 2.1 p.5("Ti10L line arrays of up to 3 cabinets can be supported with the Z5373T Cluster bracket"), Chapter 3 "Ti10L Rigging procedure" p.11.
**[1] Z5370 T Flying frame 조건 — 상한 미확인**: rigging_handling 섹션 각주 참조 — 절차 준용은 확인되나 T10과 동일한 수치 상한이 명시적으로 재확인되지 않아 Maximum_Limit null 유지(GSL/CCL과 달리 "무자료"가 아니라 "인접 문서의 수치를 그대로 전재하지 않기 위한" 의도적 미확인 — 원본성 요건).
**Safety_Factor/Max_Wind_Load**: T-Series Rigging manual 자체는 확보했으나 EC Declaration상 Ti10L이 명시적으로 포함되지 않아(위 각주 참조) 이 수치들을 Ti10L에 직접 적용하는 것은 보수적으로 보류 — 미확인.

## Null Report

**미확인(정보 부족)**: Usable_Bandwidth_Hz, Frequency_Response_6dB_Hz, Frequency_Response_3dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, Max_SPL_Single_Module, AES75_Max_Linear_SPL, DSP_Preset_Name, CUT_Mode_Frequency_Response_10dB_Hz, LF_Nominal_Impedance, HF_Nominal_Impedance, Front_LF_Nominal_Impedance, Side_LF_MF_HF_Nominal_Impedance, Power_Handling_Front_LF_RMS, Power_Handling_Front_LF_Peak_10ms, Power_Handling_Side_LF_MF_HF_RMS, Power_Handling_Side_LF_MF_HF_Peak_10ms, RMS_Power_Handling_LF, RMS_Power_Handling_HF, LF_Acoustical_Load, Link_Connector, Max_Enclosures_Per_Controller_Total, Handles, Rigging_Components_Material, IP_Rating, mechanical_safety(Safe_Limit 2행, Maximum_Limit 1행, Safety_Factor, Max_Wind_Load) — 30건.
**비적용(Ti10L 아키텍처상 개념 자체 불성립)**: Front_LF_Transducer, Side_LF_Transducer(다이폴 배치), preset_guide_and_matching(전 항목), delay_defaults(전 항목) — 4건.

**총계**: null 34건 (미확인 30건 + 비적용 4건). 확정적 비존재(0/No)로 명시한 항목은 1건 — Cardioid_Capability="No"(T10과 동일 근거, 자신의 SPS+AE+OM 전량 스캔).

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — T10_v1.0.md를 스켈레톤으로 사용(음향/물리 스펙 동일, 리깅·커넥터만 상이). Ti10L/Ti10P는 "acoustically identical"이며 진짜 차이는 지향각 고정이 아니라 **라인어레이 리깅 장비 유무**임을 원본으로 확인(TODO.md의 기존 추정 정정). NL4 M 커넥터(신규 Key군 NL4_Pinout_Pin1/Pin2, T10의 NLT4_Pinout_*과 별개) 신설. HFC 기능이 Arc/Line setup 전용이라 Ti10L에서만 실질 사용 가능함을 확인. mechanical_safety에서 Z5373 Cluster bracket(3대 상한)은 실값 확보했으나, Z5370 Flying frame 경유 대형 어레이 상한은 T-Series Rigging manual의 EC Declaration이 Ti10L을 명시적으로 포함하지 않아 보수적으로 미확인 유지. Null Report 33건(미확인 29+비적용 4), 확정적 비존재 1건. |
| v1.1 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-19) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래, 미확인) 반영. Null Report 34건(미확인 30건+비적용 4건)으로 갱신. |
