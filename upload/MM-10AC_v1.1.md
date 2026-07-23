# MM-10AC (Meyer Sound) — Master Schema

**Category**: speakers | **Brand**: Meyer Sound (MY) | **Schema Phase**: Phase 4 (Meyer Sound 7번째 제품군 투입 — 이 브랜드 최초의 소형 설치용 서브우퍼, AC 자가발전 베리언트)

**스켈레톤 근거**: `speakers/MY/900-LFC_v1.0.md`를 뼈대로 사용(AC 자가발전, XLR 3-pin, powerCON 20, 전류 기반 소비전력) — 다만 MM-10 시리즈는 투어링 라인어레이 서브우퍼(2100/750/900-LFC)와 전혀 다른 소형 설치용(install) 제품군이다: QuickFly 리깅/플라잉 그리드 시스템이 아예 없고(벽/천장 브래킷 마운트만 지원), 대역폭이 훨씬 좁으며(33-228Hz), 앰프 출력도 훨씬 작다(440W peak vs 3100W).

**MM-10XP/MM-10AC/MM-10ACX 3개 모델 개별 파일 분리(신규 판단, 2026-07-18)**: 하나의 Datasheet/OM 문서가 "Specifications (All Models)"(음향/트랜스듀서/치수 등 공통)와 "MM-10XP/MM-10AC/MM-10ACX Specifications"(전원/커넥터/기능 각각 독립 챕터) 구조로 세 모델을 명확히 구분해 서술한다 — PANTHER-L/M/W(단순 지향각 Value 차이)와 달리, 이 세 모델은 **전원 공급 방식 자체가 다르다**(XP=외부 48V DC IntelligentDC 전원 필수, AC=내장 AC 전원+루프아웃, ACX=내장 AC 전원+2채널 새틀라이트 스피커 구동 기능 추가)는 근본적 아키텍처 차이가 있어, `speakers/CLAUDE.md`의 "공식 문서가 그 변형들을 별개 모델로 취급하는지" 판단 기준에 따라 GSL8/GSL12식 개별 파일 분리를 적용한다(파트넘버는 셋 다 명시적으로 없으나, 모델 접미사 자체가 이미 공식적으로 구분된 명칭이며 스펙 표 전체가 모델별로 별도 챕터로 완전히 분리되어 있어 PANTHER 유형의 "단일 Value만 다른" 사례와 질적으로 다르다). 이 파일은 AC 자가발전 베리언트를 다룬다.

**아키텍처 판단(원본 근거)**: OM "The MM-10 bass reflex cabinet houses a single 10-inch driver and a single-channel power amplifier complete with onboard processing, including a crossover, driver protection, and frequency and phase correction. The built-in crossover accepts full-range signals, facilitating basic daisy-chaining for signal distribution, eliminating the need for external crossovers in small setups." — 여기서 "crossover"는 LF/HF 드라이버 간 신호 분리용 패시브 크로스오버가 아니라(단일 드라이버, MF/HF 대역 없음), 풀레인지 입력 신호에서 서브우퍼 대역만 추출하고 나머지는 통과/루프시키는 **능동(액티브) 시스템 통합용 크로스오버**다 — `Passive_Crossover_Network`는 이 카테고리 기존 관례(패시브 컴포넌트 기반 드라이버 간 분리 여부)에 따라 여전히 No(단일 드라이버 구조상 개념 자체 불성립). OM "The MM-10AC is ideal for fixed installations and portable applications where AC power is readily available... includes an internal power supply and locking PowerCON connectors for AC input and AC loop output."

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | MM-10AC | - |
| Model_Number | null | - |
| Product_Series | null | - |
| Product_Category | Subwoofer | - |
| Product_Type | Self-powered miniature subwoofer (AC-powered, internal PSU) | - |
| Description | self-powered miniature subwoofer, 1-way, 360° coverage, companion to MM-4XP miniature loudspeaker | - |
| Way_Count | 1 | - |
| Onboard_Amplification | Yes | - |
| Compliance_Standards [1] | IEC/UL/CSA 62368-1 3rd ed. and IEC/BS/EN 62368-1 2nd ed. (Audio/video, IT, and communication technology equipment); CE and FCC Part 15 Class B emission limits applied | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS(Datasheet) p.1-3, p.5-6("MM-10AC Specifications"); OM(Operating Instructions) p.1-2, p.10-19("MM-10AC Subwoofer").
**Product_Type**: OM "The MM-10 miniature subwoofer delivers low frequency for applications that require excellent audio quality from a compact system. Designed primarily as a companion to Meyer Sound's MM-4XP miniature loudspeaker."
**[1] Compliance_Standards**: SPS "COMPLIANCE" 표 — 이 브랜드 서브우퍼 계열에서 처음으로 FCC "Class B"(다른 MY 제품은 대부분 Class A) 등급이 확인됨. "UL 2043 tested Suitable for use in air handling spaces"는 MM-10XP 모델 전용이라 이 파일(AC)에는 비적용.
**Model_Number**: SPS/OM 전량 스캔 결과 액세서리(MUB-MM10 등)의 파트넘버만 있고 MM-10AC 본체 자신의 파트넘버 표기가 없음 — 미확인.
**Way_Count=1**: LF 단일 대역(10인치 콘 드라이버 1발, 2인치 보이스코일)만 재생.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | 33 - 228 | Hz |
| Frequency_Response_6dB_Hz | null | Hz |
| Frequency_Response_3dB_Hz | null | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | 35 - 208 | Hz |
| Max_SPL_Peak | null | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| Max_SPL_Single_Module | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Linear_Peak_SPL | 118.5 dB with crest factor > 11 dB (M-noise), 117.5 dB (pink noise), 120.5 dB (B-noise) | - |
| Nominal_Directivity_Horizontal_deg | 360 | deg |
| Nominal_Directivity_Vertical | null | - |
| Phase_Response | 38 - 138 Hz ±45 | deg |
| THD_IM_TIM | < 0.02 | % |
| Cardioid_Capability | null | - |
| DSP_Preset_Name | null | - |
| Cardioid_Pattern_Array_Min_Size | null | count |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.1-2 "Specifications (All Models)" — 음향 스펙은 MM-10XP/AC/ACX 3개 모델 공통.
**Cardioid_Capability**: SPS/OM 전량 스캔 결과 "cardioid" 키워드 0건 — 소형 설치용 단일 유닛 제품 특성상 어레이 카디오이드 구성 서술 자체가 없음(다른 MY 투어링 서브우퍼와 다른 제품 카테고리) — 미확인으로 유지(구조적 불성립을 확정할 만큼 제품군 성격이 명확하지 않아 비적용이 아닌 미확인 처리).

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 1 x 10" cone driver, 2-inch voice coil | - |
| LF_Acoustical_Load | bass-reflex | - |
| Passive_Crossover_Network | No | - |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_Overall | null | W |
| Peak_Power_Handling_10ms_Overall | null | W |
| LF_Nominal_Impedance | 4 | Ohm |
| Nominal_Impedance_Overall | null | Ohm |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.2 "TRANSDUCERS"; OM p.1("bass reflex cabinet houses a single 10-inch driver").
**LF_Acoustical_Load="bass-reflex"**: 다른 MY 서브우퍼(2100/750/900-LFC)의 "optimally tuned, vented enclosure"와 유사 개념이나 OM이 명시적으로 "bass reflex"라는 용어를 사용해 그대로 채택.
**Passive_Crossover_Network=No**: 단일 드라이버 구조상 드라이버 간 패시브 분리 자체가 불필요(파일 서두 아키텍처 판단 참조) — SPS/OM 전량 스캔 결과 패시브 크로스오버 컴포넌트 서술 없음.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Analog_Input_Connector [1] | XLR 3-pin female input with XLR male loop output | - |
| Analog_Loop_Output_Connector | XLR 3-pin male | - |
| Analog_Input_Impedance | 10000 | Ohm |
| Analog_Nominal_Input_Level | -2.0 dBV (0.8 V rms) continuous, typically onset of limiting | - |
| Analog_Input_Pinout_Pin1 | 220 kOhm to chassis and earth ground (ESD clamped) | - |
| Analog_Input_Pinout_Pin2 | Signal (+) | - |
| Analog_Input_Pinout_Pin3 | Signal (-) | - |
| Analog_Input_Pinout_Case | Earth (AC) ground and chassis | - |
| Analog_Source_Drive_Requirement [2] | +20 dBV (10 V rms) into 600 Ohm (for maximum peak SPL) | - |
| Digital_Input_Connector | null | - |
| Digital_Input_Format | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.2("AUDIO INPUT" 표, 전 모델 공통), p.5("MM-10AC Specifications" REAR PANEL); OM p.16-17(Audio In/Loop Out Connectors).
**[1] Analog_Input_Connector — 루프 아웃 포함**: MM-10AC만 오디오 루프 아웃을 포함(MM-10ACX는 미포함, SPS 각주 7 "Audio loop output only included on the MM-10AC model").
**Pin1 저항값**: SPS "Pin 1: Chassis/earth through 220 kΩ, 1000 pF, 15 V clamp network" — 다른 MY 서브우퍼(1kΩ)보다 훨씬 큰 220kΩ, 각 제품 자신의 원문값 그대로 채택(임의 통일 금지).
**[2] Analog_Source_Drive_Requirement 소스 간 불일치**: SPS "Specifications (All Models)" 표(공통 음향 스펙, p.2)는 "+16 dBV (6.3 V rms) into 600 Ω"로 명시하나, OM p.17 "Audio Loop Out" 절은 "approximately 20 dBV (10 V rms into 600 ohms) to yield the maximum peak SPL"로 다른 값을 명시 — 두 수치 모두 원문 그대로 보존(데이터 충돌 보존 원칙), Value에는 OM의 20dBV를 채택(루프 아웃 구동 조건이 더 구체적으로 서술됨). 공통 스펙표의 16dBV는 이 각주에서 병기.
**Digital_Input_Connector/Format=null**: Milan AVB나 다른 디지털 오디오 입력 형식 언급 없음.

## power_supply

self-powered 아키텍처 전용 섹션. 전류(A) 단위 소비전력 체계.

| Key | Value | Unit |
|---|---|---|
| AC_Connector | locking PowerCON (input with loop output) | - |
| AC_Nominal_Voltage_Range | 100 - 240 | V AC |
| AC_Operating_Voltage_Range [1] | 90 - 265 | V AC |
| AC_Frequency_Range | 50 - 60 | Hz |
| Max_Long_Term_Continuous_Power | null | W |
| Burst_Power | null | W |
| Idle_Power | null | W |
| Max_Cable_Round_Trip_Resistance | null | Ohm |
| AC_Inlet_Pinout | L (brown/hot), N (blue/neutral), E (yellow/green, earth ground/chassis) | - |
| Power_Supply_Protection_Features | internal fuse protection above 265 V AC; sustains operation temporarily during low-voltage brownout (uses stored power) | - |
| Amplifier_Total_Output_Power | 440 | W |
| Idle_Current | 0.13 A rms (115 V AC), 0.13 A rms (230 V AC), 0.14 A rms (100 V AC) | - |
| Max_Long_Term_Continuous_Current | 0.40 A rms (115 V AC), 0.25 A rms (230 V AC), 0.46 A rms (100 V AC) | - |
| Burst_Current | 0.9 A rms (115 V AC), 0.4 A rms (230 V AC), 1.1 A rms (100 V AC) | - |
| Max_Instantaneous_Peak_Current | 2.0 A peak (115 V AC), 1.4 A peak (230 V AC), 2.3 A peak (100 V AC) | - |
| Inrush_Current | 4.0 A peak (115 V AC), 2.4 A peak (230 V AC), 4.0 A peak (100 V AC) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.5-6 "AC POWER"/"CURRENT DRAW"(MM-10AC Specifications); OM p.11-15(AC Connectors, Power Connector Wiring, Voltage/Current Draw Requirements).
**[1] AC_Operating_Voltage_Range**: OM "Automatic Voltage Selection: 90-265 V AC"; "Turn-on and Turn-off Points: 90 V AC turn-on, no turn-off; internal fuse-protection above 265 V AC" — 다른 MY 서브우퍼(90-264VAC)와 달리 이 제품은 상한이 265V로 명시(내부 퓨즈 보호 임계치와 동일값, 두 계층 구분 없음).
**AC_Connector**: SPS "powerCON 20 input with loop output" — OM은 "locking AC PowerCON connectors"로 표현, 두 서술을 결합해 Value에 채택.
**Amplifier_Total_Output_Power**: SPS AMPLIFIER 표 "Total Output Power: 440 W peak" — 이 브랜드 서브우퍼 중 가장 작은 소형 설치용 앰프 출력.
**Max_Long_Term_Continuous_Power/Burst_Power/Idle_Power=null**: A 단위로만 제공(2100/750/900-LFC와 동일 원칙).
**Max_Cable_Round_Trip_Resistance**: OM은 전압강하율(115V=10%/230V=5% 상한)만 서술하고 구체적 저항값(Ohm)은 없음 — 미확인.

## protection_thermal

self-powered 아키텍처 전용 섹션.

| Key | Value | Unit |
|---|---|---|
| Limiter_Type | null | - |
| Limiter_Indication [1] | Limit LED (3-color): green=normal/startup, yellow=limiting active (hard limiting if >3 sec), red flashing=clipping/overload, red solid=fault (voltage drop or failure) | - |
| Cooling_Type | convection | - |
| IP_Rating | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS AMPLIFIER 표(Cooling: Convection); OM p.18-19(MM-10AC Limit LED, Powering On, Limiting, MM-10AC Temperature and Limiting, Clipping).
**Limiter_Type=null**: 다른 MY 서브우퍼는 "TruPower limiting"이라는 명칭이 있었으나, MM-10AC의 SPS/OM 전량 스캔 결과 리미터 방식에 명칭이 부여되어 있지 않음(단순히 "limiter"로만 서술) — 미확인.
**[1] Limiter_Indication**: OM "The Limit LED turns solid yellow when its heat sink temperature reaches 65°C (145°F)... the limiter threshold is lowered to a safe level (causing the output level to be lowered by 6 dB)... When the temperature of the heat sink cools to 50°C (122°F), the LED changes from yellow to green." — 온도 기반 리미팅 임계치가 명시적으로 확인된 최초 사례(다른 MY 서브우퍼에는 이런 구체적 온도 수치가 없었음).
**IP_Rating**: 기본 구성은 등급 수치 없음(XLR/PowerCON 비-TOP 커넥터). "Optional Rain Hood" 액세서리(수평/수직 2종, PN 40.174.015.01/.02) 존재하나 원문에 IPX 넘버링 표기 없음 — 미확인.

## network_monitoring

MM-10AC는 RMS Network나 Milan AVB 등 네트워크 원격 모니터링 기능이 없음(소형 설치용 제품 특성).

| Key | Value | Unit |
|---|---|---|
| Network_Protocol | null | - |
| Telemetry_Software | null | - |
| Telemetry_Transport | null | - |
| Device_Identification_Function | null | - |
| Network_Connectivity_LED | null | - |
| AES67_Support | null | - |
| Service_Port_Type | null | - |
| Remote_Mute_Control | null | - |

### 주석 및 출처 (Notes & Sources)

**비적용 사유**: SPS/OM 전량 스캔 결과 RMS Network, Compass, Milan AVB, Ethernet 등 어떤 네트워크 연동 기능도 서술되어 있지 않음 — 다른 MY 제품군(PANTHER~900-LFC)과 달리 이 소형 설치용 서브우퍼는 네트워크 모니터링 기능 자체를 갖추지 않은 것으로 판단(전량 스캔 근거).

## amplification_requirements

self-powered이므로 외부 앰프 매칭 개념이 원천적으로 비적용.

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | null | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type | Active (1-way subwoofer channel with full-range pass-through for daisy-chaining/loop; onboard driver protection and frequency/phase correction) | - |

### 주석 및 출처 (Notes & Sources)

**비적용 사유**: MM-10AC는 자체 앰프를 내장한 self-powered 제품이라 외부 앰프와 매칭할 필요가 없다.
**Crossover_Type**: 파일 서두 아키텍처 판단 참조 — 패시브 드라이버 간 분리가 아닌 시스템 통합용 액티브 크로스오버.

## rigging_handling

MM-10 시리즈는 투어링 라인어레이 서브우퍼(QuickFly/그리드 플라잉)와 전혀 다른 소형 설치용 마운팅 방식을 사용.

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type [1] | top/side nut plates (3/8-inch-16 or M10 threads); optional MUB-MM10 U-bracket for wall/ceiling mounting at adjustable angles | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | null | - |
| Weight_Net | 12.79 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.3 "PHYSICAL"(Rigging 행, MM-10AC Weight); OM p.33-35(Mounting the MM-10, MUB-MM10 U-bracket).
**[1] Rigging_System_Type**: QuickFly/그리드 플라잉 시스템이 아예 없음(투어링 라인어레이 서브우퍼와 다른 제품 카테고리) — 너트플레이트 기반 고정 설치 또는 U-브래킷 벽/천장 마운트만 지원.
**Inter_Enclosure_Angles_deg**: 어레이 스플레이 개념 자체가 없음(단일 유닛 설치용) — 비적용이 아니라 원본에 서술 자체가 없어 미확인으로 유지(제품 카테고리 성격이 확정적이지 않아 KS28식 완전 비적용 판정은 보류).
**Handles**: SPS/OM 전량 스캔 결과 손잡이 관련 서술 없음(외관 사진상 상단에 작은 캐리 홀만 확인되나 "handle"이라는 명시적 용어 없음) — 미확인.
**Weight_Net**: SPS "MM-10AC Weight: 28.2 lb (12.79 kg)".

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 483 | mm |
| Height_mm | 279 | mm |
| Depth_mm | 305 | mm |
| Dimensions_Raw | null | mm |
| Cabinet_Material | premium multi-ply birch with slightly textured black finish | - |
| Front_Material | powder-coated, hex-stamped steel with black mesh screen | - |
| Rigging_Components_Material | null | - |
| Finish_Color | slightly textured black | - |
| Finish_Type | custom color finishes available for installations | - |
| IP_Rating | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.1("MM-10 Loudspeaker and Dimensions" 도면), p.3(Enclosure/Protective Grille); OM p.2(제품 소개).
**Finish_Type**: OM "custom color finishes for installations and applications with specific cosmetic requirements" — 다른 MY 서브우퍼는 미확인이었으나 MM-10은 커스텀 색상 옵션이 명시적으로 확인됨(신규 발견).
**IP_Rating**: protection_thermal 섹션 참조(미확인, 기본 등급 수치 없음, 우천 후드 옵션은 있으나 IPX 표기 없음).

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| null | null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: MM-4XP와의 조합이 주 용도로 서술되나(OM "Designed primarily as a companion to Meyer Sound's MM-4XP miniature loudspeaker"), 구성별 권장 비율/주파수 범위 표는 SPS/OM 전량 스캔 결과 없음 — 미확인.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms |
|---|---|---|
| null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: SPS/OM 전량 스캔 결과 딜레이 기본값 표나 카디오이드 배치 딜레이 서술 자체가 없음(소형 설치용 단일 유닛 제품 특성) — 미확인.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| null | null | null | null |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | null | - |
| Max_Wind_Load | null | - |

### 주석 및 출처 (Notes & Sources)

**미확인 사유(구조적 특성)**: MM-10 시리즈는 투어링 라인어레이 서브우퍼처럼 다수 캐비닛을 그리드에 매달아 비행시키는 플라잉 구성 자체가 없음(SPS/OM 전량 스캔 결과 "flown"/"grid"/"rigging kit" 등 어레이 비행 관련 서술 0건, 오직 벽/천장 브래킷 마운트만 서술). Safety_Factor/Max_Wind_Load 등 어레이 비행 안전계수 관련 수치도 원본에 없음 — 다른 MY 서브우퍼(2100/750/900-LFC)와 달리 이 섹션 전체가 이 제품 카테고리에 원천적으로 해당하지 않을 가능성이 높으나, 확정적 비적용 판정 대신 미확인으로 보수적으로 유지(제품군 자체가 이 스키마에 처음 등장하는 유형이라 판단 근거가 아직 충분히 축적되지 않음).

## Null Report

**미확인(정보 부족)**: Model_Number, Product_Series, WEEE_Marking, Frequency_Response_6dB_Hz, Frequency_Response_3dB_Hz, Frequency_Response_5dB_Hz, Max_SPL_Peak, Max_SPL_4x_Array_Far_Field_Scaled_1m, Max_SPL_Single_Module, Nominal_Directivity_Vertical, Cardioid_Capability, DSP_Preset_Name, Cardioid_Pattern_Array_Min_Size, RMS_Power_Handling_LF, Max_Long_Term_Continuous_Power, Burst_Power, Idle_Power, Max_Cable_Round_Trip_Resistance, Limiter_Type, IP_Rating(protection_thermal), Network_Protocol, Telemetry_Software, Telemetry_Transport, Device_Identification_Function, Network_Connectivity_LED, AES67_Support, Service_Port_Type, Inter_Enclosure_Angles_deg, Handles, Rigging_Components_Material, IP_Rating(physical), preset_guide_and_matching(전 항목), delay_defaults(전 항목), mechanical_safety(전 항목, Safety_Factor/Max_Wind_Load 포함), Digital_Input_Connector, Digital_Input_Format — 34건.
**비적용(MM-10AC 아키텍처상 개념 자체 불성립)**: Compatible_Amplified_Controller, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, Dimensions_Raw, Nominal_Impedance_Overall, RMS_Power_Handling_Overall, Peak_Power_Handling_10ms_Overall(RMS_Power_Handling_Overall과 동일 사유, self-powered 구조상 Amplifier_Total_Output_Power로 보고), Remote_Mute_Control(network_monitoring 기능 자체가 없는 아키텍처) — 8건.

**총계**: null 42건 (미확인 34건 + 비적용 8건). 확정적 비존재(0/No)로 명시한 항목은 1건 — Passive_Crossover_Network(No, 단일 드라이버 구조 및 전량 스캔 근거). **v1.1(2026-07-19)**: speakers 카테고리 전체 일괄 동기화 라운드 — 신규 Key 2종(Peak_Power_Handling_10ms_Overall, Remote_Mute_Control 모두 비적용) 반영, 총계 40건→42건.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — Meyer Sound 7번째 제품군(MM-10, 이 브랜드 최초의 소형 설치용 서브우퍼) 최초 투입, 900-LFC_v1.0.md를 스켈레톤으로 사용. `upload/` 폴더 제공 Datasheet(SPS 9p, 4개 모델 공통+개별 스펙)+Operating Instructions(OM 47p) 통합. MM-10XP/MM-10AC/MM-10ACX 3개 모델이 전원 공급 방식 자체가 다른 구조적 차이(DC 외부전원 vs AC 내장전원 vs AC+새틀라이트구동)를 가져 개별 파일로 분리(신규 판단, 상세 근거는 파일 서두 참조) — 이 파일은 AC 자가발전 베리언트. 투어링 라인어레이 서브우퍼와 달리 QuickFly/그리드 플라잉 시스템이 없어 rigging_handling/mechanical_safety 섹션 대부분이 미확인·비적용 처리됨. RMS Network 등 네트워크 모니터링 기능도 원문에 없어 network_monitoring 섹션 전체 비적용. 신규 발견: FCC Class B(다른 MY 제품은 대개 Class A), 온도 기반 리미팅 임계치(65°C/50°C, -6dB) 최초 확인, 커스텀 색상 마감 옵션. IntelligentDC 관련 참고자료 2건(`Installation Instructions — IntelligentDC Products Wiring Verification.pdf`, `Wiring_ 48 V IntelligentDC loudspeakers.pdf`)을 `speakers/MY/References/`로 신규 이관(MM-10XP 파일에서 직접 참조 예정). Null Report 40건(미확인 34건+비적용 6건). |
| v1.1 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-19) — 신규 Key 2종(Peak_Power_Handling_10ms_Overall, Remote_Mute_Control) 반영, 둘 다 비적용(파워 핸들링은 self-powered 구조상 Amplifier_Total_Output_Power로 보고, 원격 뮤트는 network_monitoring 기능 자체 부재). Null Report 40건→42건(미확인 34+비적용 8). |
