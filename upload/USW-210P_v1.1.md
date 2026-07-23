# USW-210P (Meyer Sound) — Master Schema

**Category**: speakers | **Brand**: Meyer Sound (MY) | **Schema Phase**: Phase 4 (Meyer Sound 10번째 제품군 투입)

**스켈레톤 근거**: `speakers/MY/USW-112XP_v1.0.md`/`USW-112P_v1.0.md`를 뼈대로 사용(동일 "USW-" 소형 설치용 서브우퍼 계열, powerCON 20, RMS Network 옵션) — 다만 USW-210P는 아날로그/디지털 버전 분기(USW-112P)나 DC 전원 버전(USW-112XP) 없이 **단일 AC 전원 구성만 존재**하는 가장 단순한 아키텍처다. 드라이버도 1발(USW-112 계열)이 아니라 **2발**(10인치 x2)이며, 앰프도 명시적으로 "2-channel, one channel for each driver"로 채널-드라이버 1:1 매핑이 원문에서 확정된다(USW-112XP의 채널 수 미상 서술과 다름).

**원본 문서 분량 특이사항**: 이 제품의 OM(Operating Instructions)은 단 2페이지로, 제품 소개 단락과 사진 1장만 포함하고(안전 지침은 별도 하이퍼링크 문서로 대체, 본문에 텍스트 포함되지 않음) 상세 스펙/배선도/리깅 안전 표가 전혀 없다 — 이 브랜드 다른 제품들(OM 32~64페이지)과 대조적. 따라서 이 파일은 **SPS(Datasheet, Architectural Specifications 절 포함, 10페이지)가 사실상 유일한 상세 소스**이며, OM은 보조적 확인(제품 개요 문구 교차검증)에만 쓰였다.

**아키텍처 판단(원본 근거)**: AE "The loudspeaker shall be a self-powered, sub-bass system. The transducers shall consist of two 10-inch cone drivers. The loudspeaker shall incorporate internal processing electronics and a two-channel amplifier, one channel for each driver... Amplifier channels shall be class D." SPS "Type: 2-channel (class D) with crossover" — "crossover"는 패시브 드라이버 간 분리가 아닌 능동 신호처리용(다른 MY 서브우퍼와 동일 해석). Passive_Crossover_Network는 SPS(10p)+OM(2p) 전량 스캔 결과 패시브 컴포넌트 기반 분리 서술이 없어 No로 판정.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | USW-210P | - |
| Model_Number | null | - |
| Product_Series | null | - |
| Product_Category | Subwoofer | - |
| Product_Type | Self-powered sub-bass system | - |
| Description | self-powered sub-bass system, 1-way, 360° coverage, narrow dual-driver enclosure for tight installation spaces (12 in/305 mm depth including connectors), companion to CAL and ULTRA Series loudspeakers | - |
| Way_Count | 1 | - |
| Onboard_Amplification | Yes | - |
| Compliance_Standards | null | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS(Datasheet, "Architectural Specifications" 절 포함) p.1-9; OM(Operating Instructions) p.1(제품 개요 단락).
**Compliance_Standards**: SPS(10p)+OM(2p) 전량 스캔 결과 FCC/UL/CE/ICES 등 EMC/안전 인증 관련 문구를 찾지 못함 — 다른 MY 서브우퍼(750/900-LFC/USW-112XP)와 달리 이 제품 원본에는 해당 섹션 자체가 없음 — 미확인.
**Model_Number/Product_Series**: 전량 스캔 결과 없음 — 미확인.
**Description**: SPS "The USW-210P integrates easily with Meyer Sound loudspeaker systems, such as CAL™ and ULTRA Series loudspeakers." — USW-112(XP)의 ULTRA-X20(XP)/UP-4slim/UPM 계열과 달리 CAL 시리즈도 명시적으로 언급.
**Way_Count=1**: LF 단일 대역(10인치 콘 드라이버 2발, 동일 대역 병렬 구성)만 재생 — 드라이버는 2발이나 대역 자체는 하나(LF)뿐이라 Way_Count는 1.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz [1] | 30 - 140 | Hz |
| Frequency_Response_6dB_Hz | null | Hz |
| Frequency_Response_3dB_Hz | null | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz [2] | 32 - 123 | Hz |
| Max_SPL_Peak | null | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| Max_SPL_Single_Module | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Linear_Peak_SPL | 126 dB with crest factor > 11.5 dB (M-noise), 126 dB (Pink noise), 127 dB (B-noise) | - |
| Nominal_Directivity_Horizontal_deg | 360 | deg |
| Nominal_Directivity_Vertical | null | - |
| Phase_Response | 40 - 123 Hz ±30 | deg |
| THD_IM_TIM | < 0.02 | % |
| Cardioid_Capability | null | - |
| DSP_Preset_Name | null | - |
| Cardioid_Pattern_Array_Min_Size | null | count |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.6 "Specifications"(ACOUSTICAL); AE p.9(Performance specifications 단락).
**[1] Usable_Bandwidth_Hz — 조건 명시**: SPS 각주 1 "Recommended maximum operating frequency range. Response depends upon loading conditions and room acoustics." — USW-112XP와 동일한 조건부 서술 패턴.
**[2] Frequency_Response_4dB_Hz**: SPS 각주 2 "Measured in half-space with pink noise at 4 meters, 1/3-octave frequency resolution."
**Cardioid_Capability**: 전량 스캔 결과 "cardioid" 키워드 0건 — 미확인.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 2 x 10" cone drivers | - |
| LF_Acoustical_Load [1] | bass reflex, same port design as Meyer Sound 1100-LFC | - |
| Passive_Crossover_Network | No | - |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_Overall | null | W |
| Peak_Power_Handling_10ms_Overall | null | W |
| LF_Nominal_Impedance | 4 | Ohm |
| Nominal_Impedance_Overall | null | Ohm |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.6 "TRANSDUCERS"("Low Frequency: Two 10-inch cone drivers, nominal impedance 4 Ω"); OM p.1.
**[1] LF_Acoustical_Load — 계보 정보(1100-LFC)**: SPS "The long skinny bass reflex cabinet employs the same port design as Meyer Sound's flagship 1100-LFC low frequency control element for high efficiency and low port distortion." — USW-112XP가 USW-210P 자신의 포트 설계를 계승했다고 서술했던 것과 짝을 이루는 원류 확인(1100-LFC → USW-210P → USW-112XP로 이어지는 포트 설계 계보, 1100-LFC는 이 프로젝트에 아직 투입되지 않은 제품).
**Passive_Crossover_Network=No**: SPS/OM 전량 스캔 결과 패시브 컴포넌트 기반 크로스오버 서술 없음(파일 서두 아키텍처 판단 참조).

## connectivity

| Key | Value | Unit |
|---|---|---|
| Analog_Input_Connector | XLR 3-pin female input with male loop output | - |
| Analog_Loop_Output_Connector | XLR 3-pin male | - |
| Analog_Input_Impedance | 10000 | Ohm |
| Analog_Nominal_Input_Level | 0 dBV (1 V rms) continuous, typically onset of limiting for noise and music | - |
| Analog_Input_Pinout_Pin1 | Chassis/earth through 1 kOhm, 1000 pF, 15 V clamp network (virtual ground lift at audio frequencies) | - |
| Analog_Input_Pinout_Pin2 | Signal (+) | - |
| Analog_Input_Pinout_Pin3 | Signal (-) | - |
| Analog_Input_Pinout_Pin4 | null | - |
| Analog_Input_Pinout_Pin5 | null | - |
| Analog_Input_Pinout_Case | Earth ground and chassis | - |
| Analog_Source_Drive_Requirement | +20 dBV (10 V rms) into 600 Ohm (for maximum peak SPL) | - |
| Digital_Input_Connector | null | - |
| Digital_Input_Format | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.6 "AUDIO INPUT"(Type/Maximum Common Mode Range/Connectors/Input Impedance/Wiring/Nominal Input Sensitivity/Input Level).
**Analog_Input_Pinout_Pin4/Pin5=null(비적용)**: 다른 MY 서브우퍼(USW-112P/900-LFC 등)는 XLR 5-pin 옵션이 있어 이 두 핀에 RMS 신호가 할당됐으나, USW-210P의 SPS/OM 전량 스캔 결과 5-pin 옵션 서술 자체가 없음 — XLR 3-pin 단일 구성만 존재. RMS Network는 오디오 커넥터가 아닌 별도 RMServer 인터페이스로 제공(network_monitoring 섹션 참조).
**Digital_Input_Connector/Format=null**: 디지털(Milan AVB 등) 버전 자체가 없음(USW-112P와 달리 아날로그 단일 구성).

## power_supply

self-powered 아키텍처 전용 섹션. 전류(A) 단위 소비전력 체계.

| Key | Value | Unit |
|---|---|---|
| AC_Connector | powerCON 20 input with loop output | - |
| AC_Nominal_Voltage_Range | 100 - 240 | V AC |
| AC_Operating_Voltage_Range [1] | 90 - 265 | V AC |
| AC_Frequency_Range | 50 - 60 | Hz |
| Max_Long_Term_Continuous_Power | null | W |
| Burst_Power | null | W |
| Idle_Power | null | W |
| Max_Cable_Round_Trip_Resistance | null | Ohm |
| AC_Inlet_Pinout | null | - |
| Power_Supply_Protection_Features [2] | Intelligent AC power supply: automatic voltage selection, EMI filtering, soft current turn-on, surge suppression; internal fuse protection above 265 V AC | - |
| Amplifier_Total_Output_Power | 1800 | W |
| Idle_Current | 0.27 A rms (115 V AC), 0.25 A rms (230 V AC), 0.29 A rms (100 V AC) | - |
| Max_Long_Term_Continuous_Current | 1.4 A rms (115 V AC), 0.7 A rms (230 V AC), 1.6 A rms (100 V AC) | - |
| Burst_Current | 4.5 A rms (115 V AC), 2.1 A rms (230 V AC), 4.8 A rms (100 V AC) | - |
| Max_Instantaneous_Peak_Current | 9.7 A peak (115 V AC), 4.6 A peak (230 V AC), 10.8 A peak (100 V AC) | - |
| Inrush_Current | < 20 | A peak |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.7 "AC POWER"/"CURRENT DRAW"; AE p.9.
**[1] AC_Operating_Voltage_Range**: SPS "Turn-on and Turn-off Points: 90 V AC turn-on, no turn-off; internal fuse-protection above 265 V AC" — 다른 제품처럼 OM/SPS 간 1V 미세 충돌 없이 단일 소스(SPS)에서만 확인(OM에 별도 전원 챕터가 없음).
**[2] Power_Supply_Protection_Features**: SPS "The Intelligent AC power supply provides automatic voltage selection, EMI filtering, soft current turn-on, and surge suppression." — 다른 MY 서브우퍼와 동일한 "Intelligent AC" 명칭 사용 확인.
**AC_Inlet_Pinout**: 전량 스캔 결과 L/N/PE 핀 배선도 자체가 없음(OM에 배선도 챕터 부재) — 미확인.
**Amplifier_Total_Output_Power**: SPS "Total Output Power: 1800 W peak" — 이 브랜드 소형 설치용 서브우퍼 중 가장 큰 앰프 출력(USW-112P 1200W, USW-112XP 600W보다 큼, 드라이버 2발 구조 반영).
**AC 케이블 게이지 주의사항**: SPS 각주 5 "AC power cabling must be of sufficient gauge so that under burst current rms conditions, cable transmission losses do not cause the loudspeaker's voltage to drop below the specified operating range." — 다른 제품의 "Max_Cable_Round_Trip_Resistance" 같은 구체적 저항 수치는 아니고 정성적 주의사항이라 그 Key에는 반영하지 않음, 이 각주로만 기록.

## protection_thermal

self-powered 아키텍처 전용 섹션.

| Key | Value | Unit |
|---|---|---|
| Limiter_Type | null | - |
| Limiter_Indication | null | - |
| Cooling_Type | convection | - |
| IP_Rating | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.6 "AMPLIFIERS"("Cooling: Convection").
**Limiter_Type/Limiter_Indication=null**: SPS/OM 전량 스캔 결과 리미터 명칭이나 LED 상태 표시 서술이 전혀 없음(2페이지짜리 OM에 이런 상세 운용 정보 자체가 없음) — 다른 MY 서브우퍼와 대조적으로 이 제품 원본의 정보 밀도가 낮음을 반영한 결과.
**IP_Rating**: SPS 본문 "Weather protection and custom color finishes for specific cosmetic requirements are available options."라는 서술만 있고 구체적 IP 수치(IPX4 등) 표기가 없음 — 미확인.

## network_monitoring

self-powered/네트워크 연동 섹션. RMS Network(옵션).

| Key | Value | Unit |
|---|---|---|
| Network_Protocol | null | - |
| Telemetry_Software | Compass control software (RMS™ remote monitoring system) | - |
| Telemetry_Transport [1] | two-conductor, twisted-pair network via RMServer interface (optional module) | - |
| Device_Identification_Function | null | - |
| Network_Connectivity_LED | null | - |
| AES67_Support | null | - |
| Service_Port_Type | null | - |
| Remote_Mute_Control | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.3("The optional RMS™ remote monitoring system module provides comprehensive, real-time information about loudspeaker parameters from a Mac® or Windows®-based computer running Compass® control software via the RMServer interface"), p.8("RMS NETWORK (OPTIONAL)" 표).
**[1] Telemetry_Transport**: USW-112XP(외부 MPS-488HP 파워서플라이 경유)와 달리, 이 제품은 제품 자신에 RMS 모듈을 옵션으로 직접 장착하는 구조로 서술됨(LEOPARD/LINA/750-LFC와 유사한 방식) — 각 제품 자신의 원문에 따라 RMS 아키텍처가 다름을 재확인.
**Device_Identification_Function 등**: SPS/OM 전량 스캔 결과 Wink 등 식별 기능 서술 없음 — 미확인.

## amplification_requirements

self-powered이므로 외부 앰프 매칭 개념이 원천적으로 비적용.

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | null | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type | Active (1-way subwoofer, two 10-inch drivers driven by 2-channel Class-D amplifier, 1 channel per driver) | - |

### 주석 및 출처 (Notes & Sources)

**비적용 사유**: self-powered 제품이라 외부 앰프 매칭 불필요.
**Crossover_Type**: AE "a two-channel amplifier, one channel for each driver" — 채널-드라이버 매핑이 원문에서 명시적으로 확정된 사례(USW-112XP는 채널 수 자체가 미상이었음).

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type [1] | top/bottom mounting points with M8 threads; optional MUB-USW-210P U-bracket (wall/ceiling mount); optional MBP-USW-210P aluminum base plate (vertical free-standing stability) | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | null | - |
| Weight_Net | 25.40 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.4("Accessories and Associated Products" — MBP-USW-210P Base Plate, MUB-USW-210P U-Bracket), p.7 "PHYSICAL"(Rigging 행).
**[1] Rigging_System_Type — 수평/수직 양방향 설치**: SPS "With its versatile shape, the USW-210P can be placed on the ground in a horizontal or vertical position to accommodate installation requirements... can be securely mounted in a vertical orientation (connectors at top or bottom) using an optional aluminum base plate." — 다른 MY 소형 서브우퍼(USW-112 계열)와 달리 수평/수직 양쪽 설치를 모두 공식 지원하며, 수직 설치 시 안정성을 위한 전용 알루미늄 베이스 플레이트(MBP-USW-210P)가 있다는 점이 특이.
**Handles**: 전량 스캔 결과 손잡이 관련 서술 없음 — 미확인.
**Weight_Net**: SPS "Weight: 56 lb (25.40 kg)".

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 305 | mm |
| Height_mm | 1050 | mm |
| Depth_mm | 305 | mm |
| Dimensions_Raw | null | mm |
| Cabinet_Material | premium birch plywood, slightly textured black finish | - |
| Front_Material | powder-coated, stamped-steel protective grille | - |
| Rigging_Components_Material | null | - |
| Finish_Color | slightly textured black | - |
| Finish_Type | custom color finishes available for specific cosmetic requirements | - |
| IP_Rating | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.2(도면 "USW-210P Loudspeaker and Dimensions"), p.6-7 "PHYSICAL"(Dimensions/Enclosure 행); AE p.9(Dimensions W:12.00in(304.8mm) x H:41.33in(1049.8mm) x D:12.00in(304.8mm) without mounting bracket).
**Dimensions_Raw**: 축이 명확히 확인되어 상위 호환 Key로 대체 — null. 도면에는 추가 보조 치수(6.00in/152mm 상단 슬랜트부, 21.71in/551mm, 5.15in/131mm, 6.85in/174mm)가 있으나 W/H/D 3축과 별개의 보조 치수선으로 판단, KS28의 Dimensions_Raw 처리 전례와 달리 이번엔 W/H/D가 AE로 명확히 축 확정되어 굳이 별도 보존하지 않음.
**IP_Rating**: protection_thermal 섹션 참조(미확인) — physical에서는 중복 방지로 null.
**Rigging_Components_Material**: 전량 스캔 결과 서술 없음 — 미확인.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| null | null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: CAL/ULTRA Series와의 병용이 주 용도로 서술되나, 구성별 권장 비율/주파수범위 표는 SPS/OM 전량 스캔 결과 없음 — 미확인.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms |
|---|---|---|
| null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: SPS/OM 전량 스캔 결과 딜레이 기본값 표 자체가 없음 — 미확인.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| null | null | null | null |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | null | - |
| Max_Wind_Load | null | - |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: SPS/OM 전량 스캔 결과 안전계수, 마운팅 액세서리별 하중 정격(kg/lb, 대수 등) 수치 서술이 전혀 없음 — U-브래킷/베이스플레이트의 존재만 확인되고 정량적 안전 데이터는 원문에 없음(다른 MY 소형 서브우퍼는 U-브래킷에 "5:1 safety factor"가 명시됐던 것과 대조적, 이 제품 원본의 정보 밀도가 낮음을 반영).

## Null Report

**미확인(정보 부족)**: Model_Number, Product_Series, Compliance_Standards, WEEE_Marking, Frequency_Response_6dB_Hz, Frequency_Response_3dB_Hz, Frequency_Response_5dB_Hz, Max_SPL_Peak, Max_SPL_4x_Array_Far_Field_Scaled_1m, Max_SPL_Single_Module, Nominal_Directivity_Vertical, Cardioid_Capability, DSP_Preset_Name, Cardioid_Pattern_Array_Min_Size, RMS_Power_Handling_LF, Max_Long_Term_Continuous_Power, Burst_Power, Idle_Power, Max_Cable_Round_Trip_Resistance, AC_Inlet_Pinout, Limiter_Type, Limiter_Indication, IP_Rating(protection_thermal), Network_Protocol, Device_Identification_Function, Network_Connectivity_LED, AES67_Support, Service_Port_Type, Handles, Rigging_Components_Material, IP_Rating(physical), preset_guide_and_matching(전 항목), delay_defaults(전 항목), mechanical_safety(전 항목, Safety_Factor/Max_Wind_Load 포함), Inter_Enclosure_Angles_deg, Digital_Input_Connector, Digital_Input_Format, Remote_Mute_Control(RMS Network는 존재하나 이 제품 원본에서 원격 뮤트 기능 자체가 아직 재확인되지 않음) — 35건.
**비적용(USW-210P 아키텍처상 개념 자체 불성립)**: Compatible_Amplified_Controller, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, Dimensions_Raw, Nominal_Impedance_Overall, RMS_Power_Handling_Overall, Analog_Input_Pinout_Pin4, Analog_Input_Pinout_Pin5, Peak_Power_Handling_10ms_Overall(self-powered 구조상 Amplifier_Total_Output_Power로 보고) — 9건.

**총계**: null 44건 (미확인 35건 + 비적용 9건). 확정적 비존재(0/No)로 명시한 항목은 1건 — Passive_Crossover_Network(No). **v1.1(2026-07-19)**: speakers 카테고리 전체 일괄 동기화 라운드 — 신규 Key 2종(Peak_Power_Handling_10ms_Overall=비적용, Remote_Mute_Control=미확인) 반영, 총계 42건→44건.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — Meyer Sound 10번째 제품군(USW-210P) 최초 투입, USW-112XP_v1.0.md를 스켈레톤으로 사용. `upload/` 폴더 제공 Datasheet(SPS 10p, Architectural Specifications 절 포함)+Operating Instructions(OM 단 2p, 제품 개요만 포함) 통합 — 이 브랜드에서 가장 정보 밀도가 낮은 원본 조합(OM에 배선도/리깅 안전표/LED 상태표 등 상세 운용 정보 전무), 그 결과 protection_thermal/mechanical_safety 섹션 대부분 미확인. 아날로그/디지털 분기(USW-112P)나 DC 전원(USW-112XP) 없이 단일 AC 전원 구성만 존재하는 가장 단순한 아키텍처, 드라이버 2발(10인치)-앰프 2채널 1:1 매핑이 원문에서 명시적으로 확정. 신규 발견: 1100-LFC(미투입 제품)의 포트 설계를 계승했다는 계보 서술(USW-112XP가 이 제품의 포트 설계를 다시 계승한다는 연쇄 확인), 수평/수직 양방향 설치 공식 지원과 전용 수직 설치용 알루미늄 베이스 플레이트(MBP-USW-210P). Null Report 42건(미확인 34건+비적용 8건). |
| v1.1 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-19) — 신규 Key 2종 반영: Peak_Power_Handling_10ms_Overall(비적용, self-powered 구조), Remote_Mute_Control(미확인, RMS Network는 있으나 원본 재확인 안 됨). Null Report 42건→44건(미확인 35+비적용 9). |
