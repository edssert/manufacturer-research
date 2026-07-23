# MM-10ACX (Meyer Sound) — Master Schema

**Category**: speakers | **Brand**: Meyer Sound (MY) | **Schema Phase**: Phase 4 (Meyer Sound 7번째 제품군 투입, MM-10AC/XP와 동시)

**스켈레톤 근거**: `speakers/MY/MM-10AC_v1.0.md`(형제 파일)와 동일 원본에서 독립 확인 — 음향/트랜스듀서/물리 스펙은 3개 모델 공통. **차이점**: MM-10ACX는 MM-10AC의 AC 자가발전 구조에 더해, 최대 2대의 MM-4XP 새틀라이트(위성) 스피커를 위한 DC전원+오디오 배급 기능을 온보드로 통합한다(OM "The MM-10ACX model includes onboard DC power and audio routing for driving a pair of MM-4XP miniature loudspeakers, effectively placing the MM-10ACX at the heart of an extremely capable compact, full-range loudspeaker system").

**신규 아키텍처(이 카테고리 최초, MM-10ACX 고유)**: 서브우퍼가 자신의 앰프 채널과 별개로 새틀라이트(풀레인지) 스피커에 DC전원+오디오를 배급하는 "허브형" 구조는 이 카테고리 어떤 기존 제품에도 없던 개념이다. 신규 Key 3종(`Satellite_Output_Connector`, `Satellite_Output_Max_Count`, `Input_Select_Switch_Function`)을 connectivity 섹션에 신설했다 — 이 Key군은 MM-10ACX 고유 물리적 기능(새틀라이트 허브)을 지칭하므로 MM-10AC/XP 및 다른 MY 파일에는 생성하지 않는다(SKILL v1.14 원칙, GSL의 Front_LF_Transducer와 동일 처리).

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | MM-10ACX | - |
| Model_Number | null | - |
| Product_Series | null | - |
| Product_Category | Subwoofer | - |
| Product_Type | Self-powered miniature subwoofer with integrated satellite loudspeaker power/audio distribution (AC-powered) | - |
| Description | self-powered miniature subwoofer, 1-way, 360° coverage, with onboard DC power and audio routing for driving up to two MM-4XP satellite loudspeakers | - |
| Way_Count | 1 | - |
| Onboard_Amplification | Yes | - |
| Compliance_Standards | IEC/UL/CSA 62368-1 3rd ed. and IEC/BS/EN 62368-1 2nd ed.; CE and FCC Part 15 Class B emission limits applied | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS(Datasheet) p.1-3, p.7-8("MM-10ACX Specifications"); OM(Operating Instructions) p.19-33("MM-10ACX Subwoofer").
**Product_Type**: OM "The MM-10ACX is extremely versatile. It can be used as a standalone subwoofer or it can be connected to and used with satellite loudspeakers in several different configurations."
**Model_Number**: 미확인(다른 두 모델과 동일 사유).

## acoustical_performance

MM-10AC_v1.0.md와 완전 동일(3개 모델 공통 스펙).

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

**출처 및 근거**: MM-10AC_v1.0.md와 동일.

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
| Analog_Input_Connector | XLR 3-pin female input (Subwoofer Audio In) | - |
| Analog_Loop_Output_Connector | null | - |
| Analog_Input_Impedance | 10000 | Ohm |
| Analog_Nominal_Input_Level | -2.0 dBV (0.8 V rms) continuous, typically onset of limiting | - |
| Analog_Input_Pinout_Pin1 | 220 kOhm to chassis and earth ground (ESD clamped) | - |
| Analog_Input_Pinout_Pin2 | Signal (+) | - |
| Analog_Input_Pinout_Pin3 | Signal (-) | - |
| Analog_Input_Pinout_Case | Earth (AC) ground and chassis | - |
| Analog_Source_Drive_Requirement | +16 dBV (6.3 V rms) into 600 Ohm (for maximum peak SPL) | - |
| Digital_Input_Connector | null | - |
| Digital_Input_Format | null | - |
| Satellite_Output_Connector [1] | Phoenix 5-pin male or EN3 5-pin female (2 pins DC power, 3 pins balanced audio); each output 48 V DC, 2.1 A max | - |
| Satellite_Output_Max_Count [1] | 2 | count |
| Input_Select_Switch_Function [2] | SUB CH (down) = subwoofer signal from dedicated Subwoofer Audio In; SUM CH 1+2 (up) = subwoofer signal summed from Satellite 1+2 Audio Ins (attenuated -6 dB) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.7-8 "MM-10ACX Specifications"(REAR PANEL); OM p.19-29(MM-10ACX Subwoofer, Satellite Out Connectors, Input Select Switch, Gain Knob, Satellite Configurations).
**Analog_Loop_Output_Connector=null**: SPS 각주 "Audio loop output only included on the MM-10AC model" — MM-10ACX는 루프 아웃 없음(대신 2개의 독립 새틀라이트 XLR 입력을 가짐, 아래 참조).
**[1] Satellite_Output_Connector/Max_Count(신규 Key, MM-10ACX 고유)**: OM "Three XLR female inputs are included for receiving audio for the subwoofer and two satellite loudspeakers... available with either Phoenix 5-Pin male or EN3 5-pin female satellite outputs." 실제로는 3개의 독립 XLR 입력(Satellite 1/Satellite 2/Subwoofer)이 있고, 이 중 Satellite 1/2 입력 신호가 2개의 Satellite Out 커넥터로 라우팅되어 MM-4XP에 DC전원+오디오를 공급한다.
**[2] Input_Select_Switch_Function(신규 Key, MM-10ACX 고유)**: OM "The Input Select switch determines the audio source signal for the subwoofer. When the switch is in the down position (SUB CH), the source signal is received from the Subwoofer Audio In connector. When the switch is in the up position (SUM CH 1+2), the source signal is received from the Satellite 1 and Satellite 2 Audio In connectors and is summed." — 서브우퍼 자신의 입력 신호원만 결정하며 새틀라이트 아웃 신호에는 영향 없음(OM "The Input Select switch only affects the subwoofer signal. It has no effect on the Satellite Outs").
**Gain Knob(신규 개념, Key 미신설)**: OM "The Gain knob adjust the subwoofer signal from completely attenuated to +10 dB... always active regardless of the Input Select switch setting." — 서브우퍼 신호 전용 게인 조절, 기존 스키마에 대응 Key가 없어 이 각주로만 기록(범용 게인 컨트롤 개념이라 신규 Key 신설의 실익이 낮다고 판단, 필요 시 향후 확장).

## power_supply

self-powered 아키텍처 전용 섹션. AC 전원 + 새틀라이트 DC 배급 겸용.

| Key | Value | Unit |
|---|---|---|
| AC_Connector | locking PowerCON (input with loop output) | - |
| AC_Nominal_Voltage_Range | 100 - 240 | V AC |
| AC_Operating_Voltage_Range | 90 - 264 | V AC |
| AC_Frequency_Range | 50 - 60 | Hz |
| Max_Long_Term_Continuous_Power | null | W |
| Burst_Power | null | W |
| Idle_Power | null | W |
| Max_Cable_Round_Trip_Resistance | null | Ohm |
| AC_Inlet_Pinout | L (brown/hot), N (blue/neutral), E (yellow/green, earth ground/chassis) | - |
| Power_Supply_Protection_Features | internal fuse protection above 265 V AC; sustains operation temporarily during low-voltage brownout (uses stored power) | - |
| Amplifier_Total_Output_Power | 440 | W |
| Idle_Current [1] | 0.21 A rms (115 V AC), 0.20 A rms (230 V AC), 0.23 A rms (100 V AC) | - |
| Max_Long_Term_Continuous_Current [1] | 0.48 A rms (115 V AC), 0.31 A rms (230 V AC), 0.55 A rms (100 V AC) | - |
| Burst_Current [1] | 1.1 A rms (115 V AC), 0.6 A rms (230 V AC), 1.3 A rms (100 V AC) | - |
| Max_Instantaneous_Peak_Current [1] | 2.2 A peak (115 V AC), 1.6 A peak (230 V AC), 2.5 A peak (100 V AC) | - |
| Inrush_Current [1] | 6.6 A peak (115 V AC), 3.7 A peak (230 V AC), 7.2 A peak (100 V AC) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.7-8 "AC POWER"/"CURRENT DRAW"(MM-10ACX Specifications); OM p.21-24(MM-10ACX AC Connectors, Voltage/Current Draw Requirements).
**AC_Operating_Voltage_Range**: OM "90-264 V AC" — MM-10AC(90-265)와 1V 차이, 각 모델 자신의 원문값 그대로 채택(임의 통일 금지).
**[1] Idle_Current 등 — 새틀라이트 미연결 기준**: OM "Table 7. MM-10ACX Current Draw"(새틀라이트 미연결, 서브우퍼 단독 기준) 값을 기본값으로 채택. **2대의 MM-4XP 새틀라이트 연결 시(Table 8)**: Idle 0.32/0.26/0.36 A rms, Max Long-Term 0.90/0.51/1.02 A rms, Burst 2.5/1.3/3.0 A rms, Peak 4.5/2.8/5.0 A peak, Inrush 7.6/4.4/8.4 A peak(115/230/100VAC) — 새틀라이트 연결 시 전류가 증가하나, 기존 스키마 Key 구조가 "연결 구성별 조건부 값" 병기를 지원하지 않아 기본(미연결) 값만 표에 채택하고 연결 시 수치는 이 각주로 보존.
**Amplifier_Total_Output_Power**: MM-10AC와 동일(서브우퍼 자체 앰프, 새틀라이트 구동은 별도 DC 배급이지 앰프 출력이 아님).

## protection_thermal

MM-10AC_v1.0.md와 동일한 리미터/냉각 구조.

| Key | Value | Unit |
|---|---|---|
| Limiter_Type | null | - |
| Limiter_Indication | Limit LED (3-color): green=normal/startup, yellow=limiting active (hard limiting if >3 sec), red flashing=clipping/overload, red solid=fault (voltage drop or failure) | - |
| Cooling_Type | convection | - |
| IP_Rating | null | - |

### 주석 및 출처 (Notes & Sources)

**출처 및 근거**: MM-10AC_v1.0.md와 동일(OM "MM-10ACX Temperature and Limiting"/"Clipping (Red)" 절 동일 문구 확인).

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

**비적용 사유**: MM-10AC와 동일.

## rigging_handling

MM-10AC_v1.0.md와 동일한 마운팅 방식, Weight_Net만 모델별 상이.

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | top/side nut plates (3/8-inch-16 or M10 threads); optional MUB-MM10 U-bracket for wall/ceiling mounting at adjustable angles | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | null | - |
| Weight_Net | 13.97 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS "MM-10ACX Weight: 30.8 lb (13.97 kg)" — 3개 모델 중 가장 무거움(새틀라이트 구동 회로 추가).
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

**미확인 사유**: MM-10AC와 동일. 단, MM-10ACX 자신의 위성 배선 구성 가이드(단채널/2채널/2.1채널 3종)는 OM에 상세 서술되어 있으나, 이는 이 표가 요구하는 "권장 비율/주파수범위/최소라인길이" 형식이 아니라 배선 절차 안내라 이 표에 반영되지 않음.

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

**미확인 사유**: MM-10AC와 동일.

## Null Report

**미확인(정보 부족)**: Model_Number, Product_Series, WEEE_Marking, Frequency_Response_6dB_Hz, Frequency_Response_3dB_Hz, Frequency_Response_5dB_Hz, Max_SPL_Peak, Max_SPL_4x_Array_Far_Field_Scaled_1m, Max_SPL_Single_Module, Nominal_Directivity_Vertical, Cardioid_Capability, DSP_Preset_Name, Cardioid_Pattern_Array_Min_Size, RMS_Power_Handling_LF, Max_Long_Term_Continuous_Power, Burst_Power, Idle_Power, Max_Cable_Round_Trip_Resistance, Limiter_Type, IP_Rating(protection_thermal), Network_Protocol, Telemetry_Software, Telemetry_Transport, Device_Identification_Function, Network_Connectivity_LED, AES67_Support, Service_Port_Type, Inter_Enclosure_Angles_deg, Handles, Rigging_Components_Material, IP_Rating(physical), preset_guide_and_matching(전 항목), delay_defaults(전 항목), mechanical_safety(전 항목), Digital_Input_Connector, Digital_Input_Format — 34건.
**비적용(MM-10ACX 아키텍처상 개념 자체 불성립)**: Compatible_Amplified_Controller, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, Dimensions_Raw, Nominal_Impedance_Overall, RMS_Power_Handling_Overall, Analog_Loop_Output_Connector, Peak_Power_Handling_10ms_Overall(self-powered 구조상 Amplifier_Total_Output_Power로 보고), Remote_Mute_Control(network_monitoring 기능 자체가 없는 아키텍처) — 9건.

**총계**: null 43건 (미확인 34건 + 비적용 9건). 확정적 비존재(0/No)로 명시한 항목은 1건 — Passive_Crossover_Network(No). **v1.1(2026-07-19)**: speakers 카테고리 전체 일괄 동기화 라운드 — 신규 Key 2종(둘 다 비적용) 반영, 총계 41건→43건.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — MM-10AC/XP와 동시 투입, MM-10AC_v1.0.md를 스켈레톤으로 사용(형제 파일). MM-10ACX 고유의 새틀라이트(위성) 스피커 DC전원+오디오 배급 허브 기능(최대 2대 MM-4XP)을 신규 Key 2종(`Satellite_Output_Connector`, `Satellite_Output_Max_Count`)과 `Input_Select_Switch_Function`으로 신설 — 3개 모두 MM-10ACX 고유 물리 기능이라 다른 파일에 동기화하지 않음. Input Select 스위치(SUB CH/SUM CH 1+2)와 Gain 노브(항상 활성) 등 서브우퍼 신호 라우팅 제어 기능도 확인. 새틀라이트 연결 여부에 따라 전류 소비가 달라짐(연결 시 값은 각주로 보존, 기본값은 미연결 기준). Weight_Net=13.97kg으로 3개 모델 중 최대. Null Report 41건(미확인 34건+비적용 7건). |
| v1.1 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-19) — 신규 Key 2종(Peak_Power_Handling_10ms_Overall, Remote_Mute_Control) 반영, 둘 다 비적용(MM-10AC와 동일 사유). Null Report 41건→43건(미확인 34+비적용 9). |
