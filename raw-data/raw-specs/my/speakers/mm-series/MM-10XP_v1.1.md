# MM-10XP (Meyer Sound) — Master Schema

**Category**: speakers | **Brand**: Meyer Sound (MY) | **Schema Phase**: Phase 4 (Meyer Sound 7번째 제품군 투입, MM-10AC와 동시)

**스켈레톤 근거**: `speakers/MY/MM-10AC_v1.0.md`(형제 파일)와 동일 원본(SPS/OM)에서 독립 확인 — 음향/트랜스듀서/물리 스펙(acoustical_performance/transducers/physical)은 "Specifications (All Models)"에 따라 3개 모델 완전 공통이라 MM-10AC와 동일값이다. **차이점은 전원 공급 방식**: MM-10XP는 내장 AC 전원부가 없고, 외부 Meyer Sound MPS IntelligentDC 파워서플라이로부터 48V DC 전원과 오디오를 동시에 공급받는 구조다(OM "The MM-10XP is powered by an external 48 V DC power supply... eliminating the need for wiring conduits while still preserving the advantages of self-powered loudspeaker systems").

**신규 아키텍처(이 카테고리 최초)**: DC 전원 공급 방식은 이 speakers 카테고리 전체에서 최초로 확인된 사례다 — 기존 스키마의 AC_* Key군(AC_Connector/AC_Nominal_Voltage_Range/AC_Operating_Voltage_Range/AC_Frequency_Range/AC_Inlet_Pinout)은 이 제품에 적용되지 않아 비적용 처리하고, 신규 Key `DC_Operating_Voltage`(48V DC)와 `External_Power_Supply_Required`(MPS IntelligentDC 파워서플라이 모델명)를 신설했다. 전류(A) 기반 소비전력 Key(Idle_Current 등)는 기존 체계를 그대로 재사용 가능(단위가 A로 동일).

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | MM-10XP | - |
| Model_Number | null | - |
| Product_Series | null | - |
| Product_Category | Subwoofer | - |
| Product_Type | Self-powered miniature subwoofer (DC-powered via external IntelligentDC power supply) | - |
| Description | self-powered miniature subwoofer, 1-way, 360° coverage, DC-powered via Meyer Sound MPS IntelligentDC power supply, companion to MM-4XP miniature loudspeaker | - |
| Way_Count | 1 | - |
| Onboard_Amplification | Yes | - |
| Compliance_Standards [1] | IEC/UL/CSA 62368-1 3rd ed. and IEC/BS/EN 62368-1 2nd ed.; CE and FCC Part 15 Class B emission limits applied; UL 2043 tested, suitable for use in air handling spaces | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS(Datasheet) p.1-4("Specifications (All Models)", "MM-10XP SPECIFICATIONS"); OM(Operating Instructions) p.1-9("MM-10XP Subwoofer").
**[1] Compliance_Standards — UL 2043 MM-10XP 전용**: SPS 각주 "UL 2043 tested Suitable for use in air handling spaces (MM-10XP model only)" — 3개 모델 중 MM-10XP만 해당하는 추가 인증, MM-10AC/ACX 파일에는 포함하지 않음(모델별 실제 사실 차이).
**Onboard_Amplification=Yes**: 외부 DC 전원을 받지만 앰프/DSP 자체는 유닛 내장(OM "preserving the advantages of self-powered loudspeaker systems") — self-powered 분류 유지, 전원 공급원의 위치(내장 AC PSU vs 외부 DC 공급)만 다르다.

## acoustical_performance

MM-10AC_v1.0.md와 완전 동일(3개 모델 공통 스펙) — 아래 표는 참조용으로 재기재.

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

**출처 및 근거**: MM-10AC_v1.0.md와 동일(SPS "Specifications (All Models)" 표, 3개 모델 공통).

## transducers

MM-10AC_v1.0.md와 완전 동일.

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

**출처 및 근거**: MM-10AC_v1.0.md와 동일.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Analog_Input_Connector [1] | Phoenix 5-pin male or SwitchCraft EN3 5-pin male (combined DC power + balanced audio) | - |
| Analog_Loop_Output_Connector | null | - |
| Analog_Input_Impedance | 10000 | Ohm |
| Analog_Nominal_Input_Level | -2.0 dBV (0.8 V rms) continuous, typically onset of limiting | - |
| Analog_Input_Pinout_Pin1 | DC power negative (-) | - |
| Analog_Input_Pinout_Pin2 | DC power positive (+) | - |
| Analog_Input_Pinout_Pin3 [2] | Balanced audio shield, chassis/earth | - |
| Analog_Input_Pinout_Pin4 [2] | Balanced audio (-) | - |
| Analog_Input_Pinout_Pin5 [2] | Balanced audio (+) | - |
| Analog_Input_Pinout_Case | null | - |
| Analog_Source_Drive_Requirement | +16 dBV (6.3 V rms) into 600 Ohm (for maximum peak SPL) | - |
| Digital_Input_Connector | null | - |
| Digital_Input_Format | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.4 "MM-10XP SPECIFICATIONS"(REAR PANEL); OM p.4-5(MM-10XP Input Connector).
**[1] Analog_Input_Connector — DC전원+오디오 결합 커넥터(신규 아키텍처)**: 5개 핀 중 2개가 DC 전원(±), 3개가 밸런스 오디오(shield/-/+)로 통합된 단일 커넥터 — MM-10AC/ACX의 순수 오디오 전용 XLR과 근본적으로 다른 구조. 별도 AC 전원 커넥터 없음.
**[2] Pin3/4/5 순서 각주**: OM "The pin outputs for the MM-10XP EN3 connector is identical to that of the MM-4XP. However, the MM-10XP EN3 connector has been rotated to accommodate the unit's internal connections." — 커넥터 방향이 물리적으로 회전되어 있으나 핀 기능 자체는 동일.
**Input Polarity Switch 각주**: OM "The text for the Input Polarity switch on the MM-10XP rear panel shows Pin 2 and Pin 3, which is the convention used for the MM-10AC and MM-10ACX models. However, the MM-10XP Input Polarity switch actually reverses the polarity for Pin 4 and Pin 5 of its input connector." — 패널 인쇄 라벨과 실제 동작 핀 번호가 다르다는 원문의 명시적 경고, 오기입이 아니라 원문 자체의 설계 노트이므로 그대로 기록.
**Analog_Loop_Output_Connector/Analog_Input_Pinout_Case=null**: MM-10XP는 루프 아웃 커넥터가 없고(DC전원 겸용 단일 입력만 존재), Case(커넥터 외피) 접지 개념도 XLR이 아닌 Phoenix/EN3 구조라 대응되지 않음 — 비적용.
**Analog_Source_Drive_Requirement**: SPS 공통 스펙표의 "+16 dBV" 값 채택(MM-10XP 전용 챕터에 별도 수치가 없어 공통값 재사용).

## power_supply

self-powered이나 **외부 DC 전원 공급 구조**(이 카테고리 최초) — AC 관련 Key는 전부 비적용.

| Key | Value | Unit |
|---|---|---|
| AC_Connector | null | - |
| AC_Nominal_Voltage_Range | null | - |
| AC_Operating_Voltage_Range | null | - |
| AC_Frequency_Range | null | - |
| Max_Long_Term_Continuous_Power | null | W |
| Burst_Power | null | W |
| Idle_Power | null | W |
| Max_Cable_Round_Trip_Resistance [1] | 2 | Ohm |
| AC_Inlet_Pinout | null | - |
| Power_Supply_Protection_Features | tolerates voltage drops up to 30% with long cable runs; onboard circuits designed to store DC power and tolerate voltage drops | - |
| Amplifier_Total_Output_Power | 440 | W |
| Idle_Current | 0.16 | A rms |
| Max_Long_Term_Continuous_Current | 0.90 | A rms |
| Burst_Current | 2.5 | A rms |
| Max_Instantaneous_Peak_Current | 3.0 | A peak |
| Inrush_Current | < 7.0 | A peak |
| DC_Operating_Voltage [2] | 48 | V DC |
| External_Power_Supply_Required [2] | Meyer Sound MPS IntelligentDC Power Supply (MPS-488HP single-space 19" rack, up to 8 channels; or MPS-482HP half-rack, 2 channels) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.5 "DC POWER"/"CURRENT DRAW"(MM-10XP); OM p.1-9(MM-10XP Subwoofer, Meyer Sound IntelligentDC External Power Supply, Cable Lengths and Cable Gauges).
**[1] Max_Cable_Round_Trip_Resistance=2**: OM "When connecting an MM-10XP to an MPS-488HP channel output, the total cable resistance should not exceed 2 ohms." — DC 전원 회로 특성상 케이블 왕복 저항 상한이 명시적으로 확정된 최초 사례(다른 MY 서브우퍼는 AC 회로라 이 개념이 미확인이었음).
**[2] 신규 Key(DC 전원 아키텍처)**: `DC_Operating_Voltage`/`External_Power_Supply_Required` — SPS "Safety Agency Rated Operating Range: 48 V DC"; OM "MM-10XPs require a Meyer Sound IntelligentDC external power supply. The MPS-488HP single-space 19-inch rack unit... can deliver DC power to up to eight MM-10XP subwoofers... The smaller, 1RU, half-rack MPS-482HP unit provides power and audio to two loudspeakers." 상세 배선/케이블 참고자료는 `speakers/MY/References/`의 IntelligentDC 관련 문서 2건 참조. 이 Key군은 이 제품(MM-10XP)에만 적용되는 브랜드/아키텍처 고유 개념이라 MM-10AC/ACX 및 다른 MY 제품 파일에는 생성하지 않는다(비적용 삭제 대상, SKILL v1.14 원칙).
**AC_* Key 전부 null(비적용)**: 외부 DC 공급 구조라 AC 관련 개념 자체가 성립하지 않음.
**Idle_Current 등**: SPS "CURRENT DRAW" 표 — 단일 전압(48V DC)이라 다른 MY 제품처럼 115/230/100VAC 3조건 병기가 필요 없음(단일값).

## protection_thermal

| Key | Value | Unit |
|---|---|---|
| Limiter_Type | null | - |
| Limiter_Indication | Limit LED (3-color): green=normal/startup, yellow=limiting active (hard limiting if >3 sec), red flashing=clipping/overload, red solid=fault (voltage dropped below 25 V DC or failure) | - |
| Cooling_Type | convection | - |
| IP_Rating | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: OM p.6-8(MM-10XP Limit LED, Powering On, Limiting, Temperature and Limiting, Clipping).
**Limiter_Indication**: MM-10AC와 동일한 3색 LED 구조·온도 임계치(65°C/50°C, -6dB)이나, 저전압 폴트 기준이 "voltage dropped below 25 V DC"로 DC 전원 특성에 맞게 다름(MM-10AC는 "below 90 V AC").

## network_monitoring

MM-10AC_v1.0.md와 완전 동일 — 네트워크 모니터링 기능 없음.

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

**비적용 사유**: MM-10AC와 동일(전량 스캔 근거).

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | null | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type | Active (1-way subwoofer channel with full-range pass-through for daisy-chaining/loop; onboard driver protection and frequency/phase correction) | - |

### 주석 및 출처 (Notes & Sources)

**비적용 사유**: MM-10AC와 동일 — self-powered 제품이라 외부 앰프 매칭 불필요.

## rigging_handling

MM-10AC_v1.0.md와 동일한 마운팅 방식, Weight_Net만 모델별 상이.

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | top/side nut plates (3/8-inch-16 or M10 threads); optional MUB-MM10 U-bracket for wall/ceiling mounting at adjustable angles | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | null | - |
| Weight_Net | 12.11 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.3 "MM-10XP Weight: 26.7 lb (12.11 kg)".
**나머지 근거**: MM-10AC_v1.0.md와 동일.

## physical

MM-10AC_v1.0.md와 완전 동일(캐비닛/치수 공통).

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

**출처 및 근거**: MM-10AC_v1.0.md와 동일.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| null | null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: MM-10AC와 동일.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms |
|---|---|---|
| null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: MM-10AC와 동일.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| null | null | null | null |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | null | - |
| Max_Wind_Load | null | - |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: MM-10AC와 동일 — 어레이 플라잉 구성 자체가 없는 제품 카테고리.

## Null Report

**미확인(정보 부족)**: Model_Number, Product_Series, WEEE_Marking, Frequency_Response_6dB_Hz, Frequency_Response_3dB_Hz, Frequency_Response_5dB_Hz, Max_SPL_Peak, Max_SPL_4x_Array_Far_Field_Scaled_1m, Max_SPL_Single_Module, Nominal_Directivity_Vertical, Cardioid_Capability, DSP_Preset_Name, Cardioid_Pattern_Array_Min_Size, RMS_Power_Handling_LF, Limiter_Type, IP_Rating(protection_thermal), Network_Protocol, Telemetry_Software, Telemetry_Transport, Device_Identification_Function, Network_Connectivity_LED, AES67_Support, Service_Port_Type, Inter_Enclosure_Angles_deg, Handles, Rigging_Components_Material, IP_Rating(physical), preset_guide_and_matching(전 항목), delay_defaults(전 항목), mechanical_safety(전 항목), Digital_Input_Connector, Digital_Input_Format — 32건.
**비적용(MM-10XP 아키텍처상 개념 자체 불성립)**: Compatible_Amplified_Controller, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, Dimensions_Raw, Nominal_Impedance_Overall, RMS_Power_Handling_Overall, Analog_Loop_Output_Connector, Analog_Input_Pinout_Case, AC_Connector, AC_Nominal_Voltage_Range, AC_Operating_Voltage_Range, AC_Frequency_Range, Max_Long_Term_Continuous_Power, Burst_Power, Idle_Power, AC_Inlet_Pinout, Peak_Power_Handling_10ms_Overall(self-powered 구조상 Amplifier_Total_Output_Power로 보고), Remote_Mute_Control(network_monitoring 기능 자체가 없는 아키텍처) — 18건.

**총계**: null 50건 (미확인 32건 + 비적용 18건). 확정적 비존재(0/No)로 명시한 항목은 1건 — Passive_Crossover_Network(No). **v1.1(2026-07-19)**: speakers 카테고리 전체 일괄 동기화 라운드 — 신규 Key 2종(둘 다 비적용) 반영, 총계 48건→50건.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — MM-10AC와 동시 투입, MM-10AC_v1.0.md를 스켈레톤으로 사용(형제 파일, 동일 원본에서 독립 확인). 이 speakers 카테고리 최초의 DC 전원 공급 아키텍처(외부 Meyer Sound MPS IntelligentDC 파워서플라이 필요) — AC_* Key군 전체 비적용, 신규 Key `DC_Operating_Voltage`/`External_Power_Supply_Required` 신설(MM-10XP 고유, 다른 파일에 동기화하지 않음). Max_Cable_Round_Trip_Resistance는 DC 회로 특성상 명시적 수치(2Ω) 확보(다른 MY 서브우퍼는 대부분 미확인이었음). Phoenix/EN3 5핀 커넥터가 DC전원 2핀+오디오 3핀을 결합한 구조임을 확인, Input Polarity 스위치의 패널 라벨과 실제 동작 핀 번호 불일치(원문 자체의 설계 노트)를 각주로 보존. IntelligentDC 배선 참고자료 2건은 `speakers/MY/References/`에 위치(MM-10AC 파일 참조). Null Report 48건(미확인 32건+비적용 16건). |
| v1.1 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-19) — 신규 Key 2종(Peak_Power_Handling_10ms_Overall, Remote_Mute_Control) 반영, 둘 다 비적용(MM-10AC와 동일 사유). Null Report 48건→50건(미확인 32+비적용 18). |
