# USW-112P (Meyer Sound) — Master Schema

**Category**: speakers | **Brand**: Meyer Sound (MY) | **Schema Phase**: Phase 4 (Meyer Sound 8번째 제품군 투입)

**스켈레톤 근거**: `speakers/MY/900-LFC_v1.0.md`를 뼈대로 사용(서브우퍼 구조, 전류 기반 소비전력) — 다만 USW-112P는 **아날로그 버전(XLR+선택적 RMS)과 디지털 버전(etherCON TOP+Milan)을 하나의 제품명 아래 주문 시점 옵션으로 제공**하는 이 브랜드 최초의 사례다(공식 문서가 "USW-112P Analog"/"USW-112P Digital"처럼 별도 모델명을 쓰지 않고, AE 원문도 "The model shall be the Meyer Sound USW-112P"로 단일 모델명만 명시 — MM-10XP/AC/ACX처럼 접미사로 구분되는 별개 모델이 아니라, LEOPARD의 "3-pin 기본/5-pin 옵션"과 동일한 성격의 주문형 옵션). 따라서 개별 파일로 분리하지 않고 하나의 파일에서 아날로그/디지털 값을 병기한다. 추가로 **날씨 방수(Weather-protected) 옵션**도 아날로그/디지털 양쪽에 적용 가능한 별도의 직교 옵션이다(LEOPARD/LINA의 Weather Protection 전례와 동일 성격).

**아키텍처 판단(원본 근거)**: AE "The loudspeaker shall be a self-powered, sub-bass system. The transducer shall consist of one 12-inch cone driver... incorporate internal processing electronics and an open-loop, class-D amplifier." OM은 추가로 "The USW-112P drivers are powered by a proprietary three-channel, open-loop, class D amplifier"라고 서술 — 단일 드라이버(1발)임에도 앰프가 "3채널"로 명시되어 있어 그 정확한 배선 구조(왜 1발 드라이버에 3채널이 필요한지)는 원문에 설명이 없다. 임의로 해석하지 않고 원문 그대로 기록. Passive_Crossover_Network는 OM(56p)+SPS(9p, AE 절 포함) 전량 스캔 결과 "crossover"가 "electronic crossover"(신호처리용, 능동)로만 1회 등장하며 패시브 드라이버 간 분리 개념은 없어 No로 판정.

**USW-112XP(별도 파일, 후속 투입 예정)**: OM p.3 "The USW-112XP version with IntelligentDC technology suits applications where AC power distribution is a limiting factor. It receives DC power and balanced audio from a Meyer Sound power supply over a single composite cable." — MM-10XP와 동일한 DC 전원 아키텍처를 가진 별도 모델로 확인, 이 파일과 분리해 별도 투입 예정(TODO.md 기록).

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | USW-112P | - |
| Model_Number | null | - |
| Product_Series | null | - |
| Product_Category | Subwoofer | - |
| Product_Type | Self-powered sub-bass system | - |
| Description | self-powered sub-bass system, 1-way, 360° coverage, compact narrow enclosure for tight installation spaces; analog(XLR, optional RMS) or digital(etherCON TOP, Milan) audio version, optional weather protection | - |
| Way_Count | 1 | - |
| Onboard_Amplification | Yes | - |
| Compliance_Standards | UL and CE (operating voltage range 100-240 V AC) | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS(Datasheet, "Architectural Specifications" 절 포함) p.1-3, p.8-9; OM(Operating Instructions) p.1-3.
**Product_Type**: AE "The loudspeaker shall be a self-powered, sub-bass system."
**Description**: OM "The USW-112P compact narrow subwoofer provides big bass sound for very tight spaces. Its compact rectangular enclosure and slanted connector panel enable flush-mounting of the cabinet against wall surfaces, reducing required installation depth to 12 inches, including connectors." 컴패니언 제품은 ULTRA-X20(주력), UP-4slim, UPM 계열.
**Model_Number**: SPS/OM 전량 스캔 결과 액세서리(MUB-USW-112 등)의 파트넘버만 있고 본체 자신의 파트넘버 표기가 없음 — 미확인.
**Compliance_Standards**: AE "UL and CE operating voltage range shall be 100-240 V AC" — 다른 MY 서브우퍼처럼 FCC/ICES/CISPR 등 별도 EMC 인증 챕터는 이 원본 2개 문서에 없음(56p OM 전량 스캔 결과 미발견) — 750/900-LFC와 다른 결과, 각 제품 자신의 원본 확인 결과를 그대로 반영.
**Way_Count=1**: LF 단일 대역(12인치 콘 드라이버 1발)만 재생.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | 35 - 140 | Hz |
| Frequency_Response_6dB_Hz | null | Hz |
| Frequency_Response_3dB_Hz | null | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | 36 - 125 | Hz |
| Max_SPL_Peak | null | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| Max_SPL_Single_Module | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Linear_Peak_SPL | 123 dB with > 10.5 dB crest factor (M-noise), 123 dB (pink noise), 125 dB (B-noise) | - |
| Nominal_Directivity_Horizontal_deg | 360 | deg |
| Nominal_Directivity_Vertical | null | - |
| Phase_Response | 45 - 120 Hz ±30 | deg |
| THD_IM_TIM | < 0.02 | % |
| Cardioid_Capability | null | - |
| DSP_Preset_Name | null | - |
| Cardioid_Pattern_Array_Min_Size | null | count |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.4 "Specifications"(ACOUSTICAL); AE p.8(Performance specifications 단락).
**Cardioid_Capability**: SPS/OM 전량 스캔 결과 "cardioid" 키워드 0건 — 미확인(750/900-LFC와 달리 이 제품은 카디오이드 배치 서술 자체가 없음, 확정적 비적용으로 단정할 근거는 부족).

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 1 x 12" cone driver | - |
| LF_Acoustical_Load | bass-reflex, low-velocity port design | - |
| Passive_Crossover_Network | No | - |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_Overall | null | W |
| Peak_Power_Handling_10ms_Overall | null | W |
| LF_Nominal_Impedance | 3 | Ohm |
| Nominal_Impedance_Overall | null | Ohm |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.4 "TRANSDUCER"; OM p.1("bass reflex cabinet employs a low-velocity port design for high efficiency and low port distortion").
**LF_Acoustical_Load**: 다른 MY 서브우퍼의 "optimally tuned, vented enclosure"와 달리 "low-velocity port design"이라는 구체적 설계 특징이 명시되어 그대로 채택.
**Passive_Crossover_Network=No**: 파일 서두 아키텍처 판단 참조 — "electronic crossover"(능동 신호처리)만 확인, 패시브 컴포넌트 기반 크로스오버 없음.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Analog_Input_Connector [1] | XLR 3-pin female input with male loop output (analog version); optional XLR 5-pin (balanced audio + RMS); XLR 3-pin TOP (weather-protected analog units only) — 비적용/null for digital version | - |
| Analog_Loop_Output_Connector | XLR 3-pin male (analog version); optional XLR 5-pin male — 비적용/null for digital version | - |
| Analog_Input_Impedance | 10000 | Ohm |
| Analog_Nominal_Input_Level | 0 dBV (1.0 V rms) continuous, typically onset of limiting | - |
| Analog_Input_Pinout_Pin1 | 1 kOhm to chassis and earth ground (ESD clamped) | - |
| Analog_Input_Pinout_Pin2 | Signal (+) | - |
| Analog_Input_Pinout_Pin3 | Signal (-) | - |
| Analog_Input_Pinout_Pin4 [2] | RMS (polarity insensitive) | - |
| Analog_Input_Pinout_Pin5 [2] | RMS (polarity insensitive) | - |
| Analog_Input_Pinout_Case | Earth (AC) ground and chassis | - |
| Analog_Source_Drive_Requirement | +20 dBV (10 V rms) into 600 Ohm (for maximum peak SPL) | - |
| Digital_Input_Connector [3] | etherCON TOP (Type 3M Audio Input Module) | - |
| Digital_Input_Format | Milan Certified | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.4-5 "AUDIO INPUT"(ANALOG/DIGITAL 열 구분); OM p.30-31(Audio Input/Loop Output), p.33(Weather-Protected Analog Audio Connectors), p.39-40(USW-112P Digital Version, Audio Connector).
**[1] Analog_Input_Connector — 아날로그 버전 전용**: 디지털 버전은 이 Key 대신 Digital_Input_Connector(etherCON TOP)만 사용 — 한 제품 내 두 개의 상호 배타적 커넥터 생태계가 공존하는 구조. 날씨 방수 아날로그 유닛은 XLR 3-pin TOP(5-pin 옵션 미제공, SPS 각주 "The 5-pin XLR connector is not available on weather-protected models"), 날씨 방수 디지털 유닛은 etherCON TOP(기본과 동일 커넥터, TOP 인증만 추가).
**[2] Pin4/Pin5(RMS)**: 아날로그 버전의 5-pin 옵션에만 존재.
**[3] Digital_Input_Connector**: OM "The Milan Endpoint loudspeaker has an etherCON TOP chassis connector." — 날씨 방수 여부와 무관하게 디지털 버전은 항상 TOP 등급.
**Analog_Nominal_Input_Level**: AE "shall accept a nominal 0 dBV (1 V rms) signal."

## power_supply

self-powered 아키텍처 전용 섹션. 전류(A) 단위 소비전력 체계.

| Key | Value | Unit |
|---|---|---|
| AC_Connector [1] | powerCON 20 input with loop output (analog, standard); powerCON TRUE1 TOP with loop output (digital version and weather-protected analog units) | - |
| AC_Nominal_Voltage_Range | 100 - 240 | V AC |
| AC_Operating_Voltage_Range [2] | 90 - 264 | V AC |
| AC_Frequency_Range | 50 - 60 | Hz |
| Max_Long_Term_Continuous_Power | null | W |
| Burst_Power | null | W |
| Idle_Power | null | W |
| Max_Cable_Round_Trip_Resistance | null | Ohm |
| AC_Inlet_Pinout | L (Line), N (Neutral), PE (Protective Earth or Ground) | - |
| Power_Supply_Protection_Features | EMI filtering (common mode and differential mode), soft-start current turn-on, surge suppression (up to several kilovolts), sustains operation temporarily during low-voltage periods (Intelligent AC) | - |
| Amplifier_Total_Output_Power | 1200 | W |
| Idle_Current | 0.23 A rms (115 V AC), 0.18 A rms (230 V AC), 0.25 A rms (100 V AC) | - |
| Max_Long_Term_Continuous_Current | 1.2 A rms (115 V AC), 0.7 A rms (230 V AC), 1.4 A rms (100 V AC) | - |
| Burst_Current | 3.6 A rms (115 V AC), 1.8 A rms (230 V AC), 4.1 A rms (100 V AC) | - |
| Max_Instantaneous_Peak_Current | 8.9 A peak (115 V AC), 4.5 A peak (230 V AC), 10.3 A peak (100 V AC) | - |
| Inrush_Current | < 20 | A peak |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.6 "AC POWER"/"CURRENT DRAW"; AE p.9; OM p.6-16(Power Requirements, AC Power Distribution, AC Connectors, Voltage/Current Requirements, Table 3).
**[1] AC_Connector**: SPS/OM 모두 "powerCON 20(아날로그 표준) / powerCON TRUE1 TOP(디지털 및 날씨방수 유닛)"으로 명시적 구분 — LEOPARD/LINA/750/900-LFC와 동일한 powerCON 20 체계이나, 이 제품은 디지털 버전 선택만으로도 TOP 등급 커넥터가 적용된다는 점이 특이(다른 제품은 날씨방수 옵션에서만 TOP).
**[2] AC_Operating_Voltage_Range 소스 간 미세 충돌**: SPS "Automatic Voltage Selection: 90-265 V AC"; OM "90-264 V AC" — 750/900-LFC와 동일한 유형의 1V 차이, 둘 다 원문 보존, Value에는 OM 채택.
**AC Loop Output(20A) 관련 참고**: OM Table 1 "Maximum USW-112Ps that Can Be Looped with AC Power" — 회로차단기 정격(15A/20A)별 최대 루프 대수 표 존재(예: 20A/115VAC=14대 루프+본체 포함 15대 총) — 기존 스키마에 대응 Key가 없어 이 각주에만 기록.
**Amplifier_Total_Output_Power**: SPS "Total Output Power: 1200 W peak".

## protection_thermal

self-powered 아키텍처 전용 섹션.

| Key | Value | Unit |
|---|---|---|
| Limiter_Type | TruPower limiting | - |
| Limiter_Indication [1] | combined Limit and On/Status LED: solid green=normal, yellow=limiting active, red=fault/overheat (may continue outputting at reduced level) | - |
| Cooling_Type | convection | - |
| IP_Rating [2] | 54 (weather-protected version, per SPS); connectors rated IP65 when mated with Neutrik TOP cables (per OM installation note); Standard Weather Protection designed toward IPX4 (per OM Weather Protection section) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.7 "PHYSICAL"(IP Rating 행); OM p.34-36(Limiting, On/Status), p.42(Amplifier Cooling System), p.43-48(Weather Protection, IP Ratings).
**[1] Limiter_Indication**: OM "The Limit and On/Status LED displays yellow when the loudspeaker's signal rises above the limiting threshold... During normal operation... the Limit and On/Status LED is solid green. If the loudspeaker encounters a hardware fault, or the unit begins to overheat, the LED displays red."
**[2] IP_Rating — 3중 소스 불일치(임의 통일 금지)**: 이 제품에서 처음 확인된 3단계 서로 다른 IP 표기: (a) SPS "IP Rating: Weather-protected version rated IP54"; (b) OM p.18 "For individual weather-protected connectors, installers must use Neutrik TOP XLR cables to meet the IP65 rating of the connectors"; (c) OM p.45 "Meyer Sound designs toward an IP rating of IPX4 for Standard Weather Protection." 세 수치(54/65/IPX4) 모두 원문 그대로 보존 — 어느 것도 폐기하지 않음. 900-LFC의 "Standard(IPX4)/Ultra(IPX5)" 2단계 체계와 유사하나 이 제품은 제품 전체 등급(SPS의 IP54)과 커넥터 단위 등급(OM의 IP65)이 서로 다른 수치로 명시되어 더 복잡한 충돌 패턴.

## network_monitoring

self-powered/네트워크 연동 섹션. **아날로그(RMS Network, LEOPARD/LINA 계열)와 디지털(Milan AVB, PANTHER/TIGRA 계열) 양쪽 아키텍처가 하나의 제품에 공존**하는 이 브랜드 최초 사례.

| Key | Value | Unit |
|---|---|---|
| Network_Protocol | null (analog version); Milan AVB (digital version) | - |
| Telemetry_Software | Compass Control Software (both versions) | - |
| Telemetry_Transport [1] | two-conductor twisted-pair RMS network via optional RMServer hardware unit (analog version, optional, module+RMServer 별도 구매); Ethernet/AVB network (digital version, integrated) | - |
| Device_Identification_Function [2] | Wink (digital version only) | - |
| Network_Connectivity_LED [3] | solid yellow when 100 Mb link established, otherwise off (digital version only) | - |
| AES67_Support | null | - |
| Service_Port_Type | null | - |
| Remote_Mute_Control | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.6 "REMOTE MONITORING"(ANALOG/DIGITAL 열 구분); OM p.40-42(Remote Monitoring, Wink Function, Ethernet/Network Connectivity LED).
**[1] Telemetry_Transport**: SPS "Optional RMS module: two-conductor twisted-pair network that reports all operating parameters of amplifiers to system operator's host computer via the RMServer hardware unit"(아날로그) / "Integrated monitoring via Compass Control Software"(디지털). RMServer 하드웨어 유닛은 별매(각주 "RMServer hardware unit required and sold separately").
**[2] Device_Identification_Function="Wink"(디지털 버전에서만 확인)**: OM "Once the Milan Endpoint loudspeaker has been configured into a network in Compass Control Software, the icons within the loudspeaker's detail page include a W (Wink) icon... Pressing this icon will turn it green and cause the Wink push button of the associated loudspeaker to illuminate."
**아날로그 버전의 유저패널 NID 표기**: OM 아날로그 버전 패널 이미지에 "NID: 02FC17F70C00"(네트워크 식별자, RMS 모듈 관련)와 "Remote Monitor System: Wink Activity" LED가 표시되나, 이는 RMS 옵션 모듈 장착 시에만 유효한 표시로 판단되며 Wink 버튼 자체의 유무는 아날로그 버전 본문에 명시적으로 서술되지 않음 — Device_Identification_Function은 디지털 버전 원문 서술(위 인용)에 근거해서만 "Wink"로 확정, 아날로그 버전은 이 Value에서 제외.

## amplification_requirements

self-powered이므로 외부 앰프 매칭 개념이 원천적으로 비적용.

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | null | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type | Active (1-way subwoofer, single driver driven by proprietary 3-channel open-loop Class-D amplifier — 채널-드라이버 배선 관계는 원문 미기재) | - |

### 주석 및 출처 (Notes & Sources)

**비적용 사유**: self-powered 제품이라 외부 앰프 매칭 불필요.
**Crossover_Type**: 파일 서두 아키텍처 판단 참조 — 단일 드라이버에 3채널 앰프라는 원문 서술을 그대로 반영, 배선 관계 임의 추정 없음.

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type [1] | two integrated M8 threaded rigging points (top/bottom); integral 35 mm pole mount receptacle with M20 threads; optional MUB-USW-112 U-bracket (wall/ceiling/truss); QuickFly-compatible | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | null | - |
| Weight_Net | 20 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.7 "PHYSICAL"(Rigging 행); OM p.19-20(Rigging Points), p.21-24(MUB-USW-112 U-Bracket Load Ratings, Mounting Hole Configurations).
**[1] Rigging_System_Type**: OM "The USW-112P loudspeaker is compatible with Meyer Sound's QuickFly system... enables deploying USW-112P loudspeakers at precise angles" — 다른 MY 서브우퍼(2100/750/900-LFC)의 QuickFly는 전용 리깅 키트(MTG/MRK 등) 기반이었으나, USW-112P는 M8 나사산 리깅 포인트와 U-브래킷 조합만으로 QuickFly 생태계와 호환 — 전용 그리드/프레임 액세서리는 원문에 없음.
**MUB-USW-112 U-Bracket 안전계수**: OM "One USW-112P or USW-112XP can be safely mounted with the MUB-USW-112 U-bracket at a 5:1 safety factor" — 1/2인치 중앙홀·1/2인치 외곽홀 2개·1/4인치 모서리홀 4개 모두 5:1, 1/4인치 중앙홀 2개는 폴마운트 어댑터 전용(마운팅 정격 없음).
**Handles**: SPS/OM 전량 스캔 결과 손잡이 관련 명시적 서술 없음(외관 사진상 상단 캐리 핸들이 보이나 정확한 개수/명칭 서술 없음) — 미확인.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 343 | mm |
| Height_mm | 597 | mm |
| Depth_mm | 305 | mm |
| Dimensions_Raw | null | mm |
| Cabinet_Material | premium multi-ply birch, slightly textured (durable) black finish | - |
| Front_Material | powder-coated, round-perforated steel | - |
| Rigging_Components_Material | null | - |
| Finish_Color | slightly textured black | - |
| Finish_Type | custom color finishes available for specific cosmetic requirements | - |
| IP_Rating | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.1(도면), p.7 "PHYSICAL"(Dimensions 행); AE p.9.
**Dimensions_Raw**: 축이 명확히 확인되어 상위 호환 Key로 대체 — null.
**IP_Rating**: protection_thermal 섹션 참조(3중 소스 충돌 값 보존).
**Finish_Type**: OM "Weather protection and custom color finishes for specific cosmetic requirements are available options."

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| null | null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: ULTRA-X20과의 병용이 주 용도로 서술되나(OM "ULTRA-X20 Pole Mounted on the USW-112P using the MPK-POLE and a PAS-M8 Adapter Sleeve"), 구성별 권장 비율/주파수범위 표는 SPS/OM 전량 스캔 결과 없음 — 미확인.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms |
|---|---|---|
| null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: SPS/OM 전량 스캔 결과 딜레이 기본값 표나 카디오이드 배치 딜레이 서술 자체가 없음 — 미확인.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| wall/ceiling/truss mount | MUB-USW-112 U-bracket | null | 1 unit (USW-112P or USW-112XP) |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 5:1 | - |
| Max_Wind_Load | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: OM p.21("One USW-112P or USW-112XP can be safely mounted with the MUB-USW-112 U-bracket at a 5:1 safety factor").
**Maximum_Limit="1 unit"**: 다른 MY 서브우퍼처럼 다수 유닛 플라잉 그리드가 아니라, 단일 유닛을 U-브래킷 하나로 마운트하는 구조 — 이 제품 카테고리(소형 벽부착형 서브우퍼)의 특성.
**Safe_Limit 열 null 사유**: 원문이 "safely mounted at 5:1 safety factor"라는 정성적 서술만 제공, 별도 안전한도 수치 구분 없음.
**Max_Wind_Load**: 전량 스캔 결과 구체적 수치 없음 — 미확인.

## Null Report

**미확인(정보 부족)**: Model_Number, Product_Series, WEEE_Marking, Frequency_Response_6dB_Hz, Frequency_Response_3dB_Hz, Frequency_Response_5dB_Hz, Max_SPL_Peak, Max_SPL_4x_Array_Far_Field_Scaled_1m, Max_SPL_Single_Module, Nominal_Directivity_Vertical, Cardioid_Capability, DSP_Preset_Name, Cardioid_Pattern_Array_Min_Size, RMS_Power_Handling_LF, Max_Long_Term_Continuous_Power, Burst_Power, Idle_Power, Max_Cable_Round_Trip_Resistance, AES67_Support, Service_Port_Type, Handles, Rigging_Components_Material, IP_Rating(physical), preset_guide_and_matching(전 항목), delay_defaults(전 항목), mechanical_safety(Safe_Limit 열, 1건), Inter_Enclosure_Angles_deg, Remote_Mute_Control(RMS Network는 존재하나 이 제품 원본에서 원격 뮤트 기능 자체가 아직 재확인되지 않음) — 27건.
**비적용(USW-112P 아키텍처상 개념 자체 불성립)**: Compatible_Amplified_Controller, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, Dimensions_Raw, Nominal_Impedance_Overall, RMS_Power_Handling_Overall, Peak_Power_Handling_10ms_Overall(self-powered 구조상 Amplifier_Total_Output_Power로 보고) — 7건.

**총계**: null 34건 (미확인 27건 + 비적용 7건). 확정적 비존재(0/No)로 명시한 항목은 1건 — Passive_Crossover_Network(No). **v1.1(2026-07-19)**: speakers 카테고리 전체 일괄 동기화 라운드 — 신규 Key 2종(Peak_Power_Handling_10ms_Overall=비적용, Remote_Mute_Control=미확인) 반영, 총계 32건→34건.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — Meyer Sound 8번째 제품군(USW-112P) 최초 투입, 900-LFC_v1.0.md를 스켈레톤으로 사용. `upload/` 폴더 제공 Datasheet(SPS 9p, Architectural Specifications 절 포함)+Operating Instructions(OM 56p) 통합. 이 브랜드 최초로 아날로그(XLR+선택적 RMS)/디지털(etherCON TOP+Milan) 버전을 하나의 제품명 아래 주문형 옵션으로 제공하는 구조 확인 — 별도 파일 분리 없이 connectivity/network_monitoring 섹션에서 두 값을 병기. 날씨방수 옵션도 별도 직교 축으로 존재. 신규 발견: 단일 드라이버에 "3채널" 앰프라는 원문 서술(배선 미상), IP 등급 3중 소스 불일치(SPS IP54/OM 커넥터 IP65/OM Weather Protection IPX4 설계목표), Compliance_Standards에 FCC/ICES/CISPR 챕터 부재(750/900-LFC와 다른 결과), AC 루프 최대 대수 표(회로차단기 정격별). USW-112XP(DC 전원 버전)는 OM에서 언급만 확인, 별도 파일로 후속 투입 예정. Null Report 32건(미확인 26건+비적용 6건). |
| v1.1 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-19) — 신규 Key 2종 반영: Peak_Power_Handling_10ms_Overall(비적용, self-powered 구조), Remote_Mute_Control(미확인, RMS Network는 있으나 원본 재확인 안 됨). Null Report 32건→34건(미확인 27+비적용 7). |
