# Vi8 (d&b audiotechnik) — Master Schema

**Category**: speakers | **Brand**: d&b audiotechnik (db) | **Schema Phase**: Phase 4 (d&b 14번째 제품군 투입, V8의 설치용 자매 제품)

**스켈레톤 근거**: `speakers/db/V8_v1.0.md`를 뼈대로 사용 — 음향(트랜스듀서/크로스오버/임피던스/파워 핸들링/치수/CUT·HFC·CPL 체계) 스펙이 V8과 완전히 동일하다(OM "The Vi8 is a line array loudspeaker... The Vi12 line array loudspeaker is acoustically and mechanically compatible with the Vi8" — V8/V12와 동일한 3-way 다이폴 설계). 이름의 "i" 접미사는 이 프로젝트에서 이미 확인된 L-Acoustics K3/K3i, d&b GSL/GSLi 패턴과 동일하게 **설치용(installation)** 버전을 의미 — 커넥터(NL4 M, NLT4 아님)와 손잡이(측면 손잡이 없음, 후면 오목 그립만) 구성이 V8과 다르며, 전용 리깅 프레임(Z5387.xxx "Vi Mounting frame", V8/V12의 "V Flying frame"과 별개 명칭 — flying frame vs mounting frame 명명 관례 재확인)을 사용한다.

**커넥터 표기 불일치 발견(원본 자체 모순)**: OM Chapter 2.2 "Connections" 본문은 "The cabinets are fitted with **NLT4 F/M** connectors..."라고 서술하나, 바로 아래 핀 배정 표의 헤더와 Chapter 2.5 "Technical specifications"의 "Connections"/"Pin assignment" 행, 그리고 AE(txt) 전체는 일관되게 "**NL4 M**"으로 명시한다. AE에는 "NLT4"라는 단어 자체가 전혀 등장하지 않는다 — OM 본문의 "NLT4 F/M" 문구는 V8/V12 Manual(실제로 NLT4 F/M 커넥터 사용)의 서술이 Vi8/Vi12 Manual 작성 시 미수정 상태로 남은 복사-붙여넣기 잔재로 판단된다. 3개 독립 출처(AE, 핀 배정 표, 기술사양 표)가 일치하는 "NL4 M"을 채택하고, 본문의 상충 문구는 데이터 충돌 보존 원칙에 따라 각주로 보존한다.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | Vi8 | - |
| Model_Number | Z0535 | - |
| Product_Series | V-Series | - |
| Product_Category | installation-oriented line array loudspeaker for medium to large-scale sound reinforcement | - |
| Product_Type | Line array loudspeaker | - |
| Description | 3-way dipolar passive line array loudspeaker, installation-oriented "i" variant of V8 (NL4 M connectors, rear recessed grips only, no side handles, dedicated Z5387.xxx Vi Mounting frames); up to 24 cabinets flown per column, producing 80 deg constant directivity dispersion in the horizontal plane | - |
| Way_Count | 3 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | in conformity with the provisions of the respective directives including all applicable amendments (specific directive names not enumerated in OM Chapter 3.1) | - |
| WEEE_Marking | Yes (EU), WEEE-Reg.-Nr. DE: 13421928 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: AE(txt, dbaudio-arch-specs-vi8-en.txt); OM(Vi8/Vi12 Manual v1.4 en, D2706.EN.01, 09/2022) Chapter 2.1 "Product description" p.5, Chapter 3.1/3.2 p.11; Vi Rigging manual v1.4 en(D2708.EN.01, 05/2022).
**Model_Number**: OM Chapter 3.1 "d&b Z0535 Vi8 loudspeaker / d&b Z0536 Vi12 loudspeaker."
**WEEE_Marking**: 브랜드 공통 등록번호, OM Chapter 3.2에서 직접 확인.

## acoustical_performance

V8과 완전 동일(음향 설계 자체가 동일, 앰프 모델명만 다름).

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | null | Hz |
| Frequency_Response_5dB_Hz | 67 - 18000 | Hz |
| Frequency_Response_6dB_Hz | null | Hz |
| Frequency_Response_3dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak [1] | 142 | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| Max_SPL_Single_Module | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | 80 | deg |
| Nominal_Directivity_Vertical | null | - |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: OM Chapter 2.5 "Technical specifications" p.10.
**[1] Max_SPL_Peak — V8과 동일 수치, 앰프 모델명만 상이**: OM "Max. sound pressure (1 m, free field): with 30D: 139 dB / with 40D: 142 dB." V8/V12는 "D20/D12: 139dB, D80/D40: 142dB"였으나 Vi8/Vi12는 "30D: 139dB, 40D: 142dB"로 수치는 동일하고 대응 앰프 모델만 다름(Vi 라인이 최신 앰프(30D/40D) 전용으로 좁혀진 것으로 판단, 아래 amplification_requirements 참조).
**Cardioid_Capability=No**: V8과 동일 근거(자신의 AE+OM 전량 스캔, 다이폴 배치이지 카디오이드 아님).
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.

## signal_processing

V8과 완전 동일(공용 CUT/HFC/CPL 수치, HFA는 여전히 비적용 — 순수 라인어레이).

| Key | Value | Unit |
|---|---|---|
| CUT_Mode_Available | Yes | - |
| CUT_Mode_Frequency_Response_5dB_Hz | 100 - 18000 | Hz |
| CUT_Mode_Frequency_Response_10dB_Hz | null | Hz |
| HFA_Function_Settings | null | - |
| HFC_Function_Settings | HFC1: distances greater than 30 m (100 ft); HFC2: distances greater than 60 m (200 ft) (reference: 40% relative humidity) | - |
| Coupling_Function_Range | 0 to -9 dB attenuation (correction begins gradually around 2 kHz, maximum attenuation below 100 Hz); +0 to +5 dB LF boost (full range mode only, without subwoofers) | dB |

### 주석 및 출처 (Notes & Sources)

**출처**: OM Chapter 2.3.1 "Controller settings" p.7-8.
**CUT mode**: LF 레벨을 낮춰 d&b Vi-SUB 또는 J-SUB 서브우퍼와 함께 사용하도록 구성.
**HFA_Function_Settings=null(비적용)**: V8과 동일 사유 — 순수 라인어레이, 포인트소스 setup 없음.

## transducers

V8과 완전 동일.

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 2 x 10" driver with neodymium magnet, dipolar arrangement | - |
| Front_LF_Transducer | null | - |
| Side_LF_Transducer | null | - |
| MF_Transducer | 1 x 8" driver, horn-loaded | - |
| HF_Transducer | 2 x 1.4" exit compression drivers with 2.5" diaphragms, mounted to dedicated wave shaping device | - |
| LF_Acoustical_Load | null | - |
| MF_Acoustical_Load | horn-loaded | - |
| HF_Acoustical_Load | dedicated wave shaping device | - |
| Passive_Crossover_Network | Yes | - |
| Nominal_Impedance_Overall | 8 | Ohm |
| LF_Nominal_Impedance | null | - |
| MF_Nominal_Impedance | null | - |
| HF_Nominal_Impedance | null | - |
| Front_LF_Nominal_Impedance | null | - |
| Side_LF_MF_HF_Nominal_Impedance | null | - |
| Power_Handling_Front_LF_RMS | null | W |
| Power_Handling_Front_LF_Peak_10ms | null | W |
| Power_Handling_Side_LF_MF_HF_RMS | null | W |
| Power_Handling_Side_LF_MF_HF_Peak_10ms | null | W |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_MF | null | W |
| RMS_Power_Handling_HF | null | W |
| RMS_Power_Handling_Overall | 500 | W |
| Peak_Power_Handling_10ms_Overall | 2000 | W |

### 주석 및 출처 (Notes & Sources)

**출처 및 근거**: V8_v1.0.md와 완전 동일(OM "Loudspeaker data" 표 수치 동일).

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector [1] | 2 x NL4 M (identical connectors, all four pins wired in parallel; either serves as input) | - |
| Link_Connector | null | - |
| NL4_Pinout_Pin1 | Full-range signal (LF + MF + HF combined via internal passive crossover); wiring 1+/1- | - |
| NL4_Pinout_Pin2 | Not used by Vi8 itself — designated pass-through for actively driven subwoofers; wiring 2+/2- | - |

### 주석 및 출처 (Notes & Sources)

**출처**: OM Chapter 2.2 "Connections" p.6(핀 배정 표); Chapter 2.5 "Technical specifications" p.10; AE.
**[1] Input_Connector — 파일 서두 "커넥터 표기 불일치" 각주 참조**: NL4 M 커넥터를 채택한 근거는 AE+기술사양표+핀배정표 3개 독립 출처의 일치. OM 본문 한 문장("NLT4 F/M connectors")만 상충하며 V8/V12 Manual 텍스트의 미수정 잔재로 판단(파일 서두 각주). Ti10L/Ti10P에서 신설한 NL4_Pinout_Pin1/Pin2 Key군을 재사용(T10/V8의 NLT4_Pinout_*과 별개 커넥터 모델).
**WR/SVS/SWR 3단계 환경 옵션(V8/V12보다 다양)**: OM "WR(Weather resistant): 옥외용, black PCP 마감. SVS(Special version stadium): 옥외용, 전용 금속 브라켓으로 기계적 지지. SWR(Sea water resistant): 습윤/염분/산성 환경용." — V8/V12는 단순 EP5/NL4M 옵션만 있었으나 Vi8/Vi12는 설치용답게 환경 옵션이 세분화됨. 기본 커넥터가 아니므로 별도 Key 미신설, 이 각주로 보존.

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller [1] | 40D/30D (Manual explicit list) | - |
| Max_Enclosures_Per_Controller_Output | 2 (Vi8 Arc/Vi8 Line setup) | count |
| Max_Enclosures_Per_Controller_Total | null | - |
| Crossover_Type | Passive (3-way, single amplifier channel, LF+MF+HF combined via internal passive crossover network) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: OM Chapter 2.3 "Operation" p.7(NOTICE "Applicable d&b amplifiers: 40D|30D", "Cabinets per channel" 표).
**[1] Compatible_Amplified_Controller — V8보다 좁은 앰프 목록(AP setup 없음)**: V8/V12(D80/D40/D20/D12, Line/Arc/AP 3종 setup)와 달리 Vi8/Vi12는 40D/30D 2종 앰프만 명시되고 setup도 "Vi8 Arc/Vi8 Line" 2종뿐 — AP(ArrayProcessing) setup이 표에 없음(원문에 AP 관련 서술 자체가 Vi8/Vi12 Manual에 없음, 전량 스캔 확인).

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type [1] | three point rigging system (Front links both sides of cabinet front + central Splay/Rear link at rear); dedicated Z5387.000 Vi Mounting frame top (SWL 141 kg/311 lb, up to 4 cabinets) and Z5387.001 Vi Mounting frame bottom (pullback/adapter device, same SWL); larger arrays require the Z5380 V Flying frame (shared with V8/V12); Vi-TOP Splay link is a straight link with drilled holes, removable from the last cabinet of an array | - |
| Inter_Enclosure_Angles_deg | 0 - 14 (1° increments) | deg |
| Handles [2] | 2 (rear recessed grips only, no side handles) | count |
| Weight_Net | 34 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: OM Chapter 2.1 "Product description"/"Vi rigging components and arrays" p.5; Vi Rigging manual v1.4 en Chapter 1.3 "Load capacity/System safety" p.4, Chapter 2.1 "Mounting and flying frames" p.7-9.
**[1] 전용 마운팅 프레임(V8/V12와 다른 명칭)**: "Flying frame"(V8/V12)이 아니라 "**Mounting frame**"으로 명명 — L-Acoustics K3/K3i, d&b GSL/GSLi에서 확인된 것과 동일한 투어링용(flying) vs 설치용(mounting) 명명 관례가 V-Series에도 적용됨을 재확인.
**[2] Handles — V8과 다름(측면 손잡이 없음)**: OM "Two additional recessed grips are provided at the rear bottom of the cabinet."(측면 손잡이 서술 없음) vs V8 AE "one handle in each side panel and two additional recessed grips" — Vi8은 후면 오목 그립 2개만, 측면 손잡이가 없다(GSLi 등 다른 "i" 설치용 라인의 "손잡이 없음" 관례와 일치).

## physical

V8과 완전 동일(캐비닛 치수 공통).

| Key | Value | Unit |
|---|---|---|
| Width_mm | 700 | mm |
| Height_mm | 310 | mm |
| Depth_mm | 460 | mm |
| Dimensions_Raw | null | mm |
| Cabinet_Material | marine plywood | - |
| Front_Material | rigid metal grill backed by an acoustically transparent foam | - |
| Rigging_Components_Material | null | - |
| Finish_Color | null | - |
| Finish_Type | PCP (Polyurea Cabinet Protection), impact and weather protected | - |
| IP_Rating | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: AE "The dimensions (WxHxD) shall not exceed 700 x 310 x 406 mm (27.5" x 12.2" x 18")." — V8과 동일한 406mm/18" 환산 불일치, V8과 동일 근거(OM 공용 도면의 460mm 채택)로 처리.
**IP_Rating**: WR/SVS/SWR 옵션 모두 정성적 서술("suitable for outdoor use" 등)만 있고 정식 IP 등급 수치 없음 — 미확인 유지(V8과 동일 원칙).

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| null | null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**비적용 사유**: V8과 동일.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms |
|---|---|---|
| null | null | null |

### 주석 및 출처 (Notes & Sources)

**비적용 사유**: V8과 동일.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| flown (small array) | Z5387.000 Vi Mounting frame top | null | 4 Vi-TOP cabinets (141 kg / 311 lb SWL) |
| flown (larger array, exceeds Vi Mounting frame capacity, no ArrayCalc check required, any splay config) [1] | Z5380 V Flying frame (shared with V8/V12) | 10 Vi8/Vi12 cabinets (340 kg / 750 lb total system weight) | null |
| flown (larger array, general — ArrayCalc verification required) | 상동 | null | 24 Vi-TOP cabinets (Z5380 frame SWL 860 kg / 1896 lb) |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | null | - |
| Max_Wind_Load | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Vi Rigging manual Chapter 1.3 "Load capacity/System safety" p.4.
**[1] Z5380 V Flying frame 겸용 확인(Ti10L과 다른 신뢰도)**: 원문 "For any other array configuration which exceeds the maximum permissible system weight for the Vi Mounting frame top, the Z5380 V Flying frame must be used."로 명시적으로 확인 — Ti10L의 T10 Flying frame 겸용 여부가 미확인이었던 것과 달리, 여기서는 대형 어레이 시 V8/V12용 Z5380 프레임(및 그 상한 수치)이 Vi8/Vi12에도 그대로 적용됨이 원문에 명확히 서술되어 있어 V8_v1.0.md의 수치를 신뢰도 있게 재사용했다.
**Max_Wind_Load**: Vi Rigging manual Chapter 1.3.1 "Wind loads"는 "고정 옥외 설치 시 예측불가능한 풍하중을 고려해야 한다"는 정성적 경고만 있고, GSL/T10/V8처럼 6/8 Beaufort 구체적 수치 기준이 명시되지 않음(고정 설치 전용 제품이라 플라잉 전용 수치 기준이 적용되지 않는 것으로 추정되나 확정 불가) — 미확인 유지.
**Safety_Factor**: 명시적 비율 수치 없음 — 미확인.

## Null Report

**미확인(정보 부족)**: Usable_Bandwidth_Hz, Frequency_Response_6dB_Hz, Frequency_Response_3dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, Max_SPL_Single_Module, AES75_Max_Linear_SPL, Nominal_Directivity_Vertical, DSP_Preset_Name, CUT_Mode_Frequency_Response_10dB_Hz, LF_Nominal_Impedance, MF_Nominal_Impedance, HF_Nominal_Impedance, Front_LF_Nominal_Impedance, Side_LF_MF_HF_Nominal_Impedance, Power_Handling_Front_LF_RMS, Power_Handling_Front_LF_Peak_10ms, Power_Handling_Side_LF_MF_HF_RMS, Power_Handling_Side_LF_MF_HF_Peak_10ms, RMS_Power_Handling_LF, RMS_Power_Handling_MF, RMS_Power_Handling_HF, LF_Acoustical_Load, Link_Connector, Max_Enclosures_Per_Controller_Total, Rigging_Components_Material, Finish_Color, IP_Rating, mechanical_safety(Safe_Limit 2행, Max_Wind_Load, Safety_Factor) — 31건.
**비적용(Vi8 아키텍처상 개념 자체 불성립)**: Front_LF_Transducer, Side_LF_Transducer(다이폴 배치), HFA_Function_Settings(순수 라인어레이, PS setup 없음), preset_guide_and_matching(전 항목), delay_defaults(전 항목) — 5건.

**총계**: null 36건 (미확인 31건 + 비적용 5건). 확정적 비존재(0/No)로 명시한 항목은 1건 — Cardioid_Capability="No".

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — d&b audiotechnik 14번째 제품군(Vi8), V8의 설치용("i") 자매 제품. V8_v1.0.md를 스켈레톤으로 사용(음향 설계 완전 동일)하되 커넥터(NL4 M, Ti10L에서 신설된 NL4_Pinout_* Key군 재사용)와 손잡이(후면 그립만, 측면 없음)를 반영. OM 본문의 "NLT4 F/M" 서술이 AE/기술사양표/핀배정표 3개 출처와 상충함을 발견 — V8/V12 Manual 텍스트의 미수정 복사 잔재로 판단, NL4 M 채택. 전용 Z5387.xxx "Vi Mounting frame"(V8/V12의 "V Flying frame"과 별개, flying/mounting 명명 관례 재확인) 확인 — Vi Rigging manual(15p)에서 소형 어레이 상한(4대/141kg)과 대형 어레이 시 Z5380 V Flying frame 겸용 및 그 상한(10대/24대) 명시적 확인. Null Report 35건(미확인 30+비적용 5), 확정적 비존재 1건. |
| v1.1 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-19) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래, 미확인) 반영. Null Report 36건(미확인 31건+비적용 5건)으로 갱신. |
