# USW-112XP (Meyer Sound) — Master Schema

**Category**: speakers | **Brand**: Meyer Sound (MY) | **Schema Phase**: Phase 4 (Meyer Sound 9번째 제품군 투입)

**스켈레톤 근거**: `speakers/MY/MM-10XP_v1.0.md`를 뼈대로 사용(외부 Meyer Sound MPS IntelligentDC 파워서플라이로부터 단일 Phoenix 5-pin 커넥터를 통해 DC전원+오디오를 동시에 수급하는 구조가 완전히 동일) — 다만 USW-112XP는 `speakers/MY/USW-112P_v1.0.md`(동일 "USW family" 제품명, 아날로그/디지털 옵션 버전)와는 별도의 독립 모델이다. AE 원문이 "The model shall be the Meyer Sound USW-112XP"로 명시적으로 별도 모델명을 선언하며, USW-112P는 AC 전원(아날로그/디지털 옵션)인 반면 USW-112XP는 DC 전원(IntelligentDC) 전용이라는 근본적 차이가 있다 — MM-10 시리즈에서 확립된 "XP=외부 DC 전원" 명명 관례가 USW 시리즈에도 그대로 적용됨을 확인.

**아키텍처 판단(원본 근거)**: AE "The loudspeaker shall be a self-powered, sub-bass system. The transducer shall consist of one 12-inch cone driver. The loudspeaker system shall incorporate internal processing electronics and an open-loop, class-D amplifier. Processing functions shall include driver protection, and frequency and phase correction. Peak output power shall be 600 W total with 3 Ω nominal impedance." — MM-10XP/USW-112P와 달리 앰프 채널 수(2채널/3채널 등)에 대한 명시적 서술이 SPS/OM/AE 어디에도 없음(단순히 "open-loop, Class-D"로만 서술) — 임의로 채널 수를 추정하지 않고 원문 그대로 미상 처리. SPS "The bass reflex cabinet employs a low-velocity port based on the Meyer Sound USW-210P subwoofer design for high efficiency and low port distortion" — USW-210P의 포트 설계를 계승했다는 계보 정보 확인(USW-210P는 이후 별도 투입 예정 제품).

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | USW-112XP | - |
| Model_Number | null | - |
| Product_Series | USW family | - |
| Product_Category | Subwoofer | - |
| Product_Type | Self-powered sub-bass system (DC-powered via external IntelligentDC power supply) | - |
| Description | self-powered sub-bass system, 1-way, 360° coverage, DC-powered via Meyer Sound MPS IntelligentDC power supply, compact narrow enclosure (12 in/305 mm depth including connectors), ideal companion to ULTRA-X20XP | - |
| Way_Count | 1 | - |
| Onboard_Amplification | Yes | - |
| Compliance_Standards [1] | FCC Part 15 Class A; Industry Canada ICES-003; cUL Listed (3K59 or 3JKB Commercial Audio System); CE marked; NEC ANSI/NFPA 70 Class 2 Wiring Approved | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS(Datasheet, "Architectural Specifications" 절 포함) p.1-8; OM(Operating Instructions) p.1-32.
**Product_Series="USW family"(신규 발견)**: SPS "The USW-112XP compact narrow subwoofer further extends the USW family." — 다른 MY 서브우퍼는 이 표현이 원문에 없어 미확인이었으나, 이 제품은 명시적으로 "USW family" 소속을 선언 — 형제 제품 USW-112P/USW-210P/USW-121P도 동일 시리즈 소속으로 추정되나, 각 제품 자신의 원본에서 독립 확인 전까지는 그 파일들에 소급 반영하지 않는다(원본성 요건).
**[1] Compliance_Standards(이미지 텍스트에서 확보)**: OM p.5 "USW-112XP Rear Panel with Phoenix 5-pin Male Connector" 이미지 내 인쇄 라벨 텍스트 — "This device complies with part 15 of the FCC Rules... This Class A digital apparatus complies with Canadian ICES-003... cUL LISTED... 3K59 OR 3JKB COMMERCIAL AUDIO SYSTEM" 및 CE 마크 확인. 이는 텍스트 레이어가 아닌 후면 패널 이미지 내 인쇄 라벨이라 SKILL v1.13 예외 규정(예외적 이미지 분석)에 따라 확보 — 다른 MY 서브우퍼(750/900-LFC)의 FCC Class A/ICES-003/CISPR32 조합과 유사하나 CISPR32 대신 cUL Listed/NEC Class 2가 확인된 점이 다름.
**Description**: SPS "Designed to be the ideal companion to Meyer Sound's ULTRA-X20XP, it also complements the low frequencies in other Meyer Sound loudspeakers, such as the UP-4slim and those in the UPM family." — USW-112P의 컴패니언(ULTRA-X20, XP 접미사 없음)과 달리 XP 버전끼리 짝을 이루는 명명 일관성 확인.
**Way_Count=1**: LF 단일 대역(12인치 콘 드라이버 1발)만 재생.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz [1] | 35 - 140 | Hz |
| Frequency_Response_6dB_Hz | null | Hz |
| Frequency_Response_3dB_Hz | null | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | 36 - 125 | Hz |
| Max_SPL_Peak | null | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| Max_SPL_Single_Module | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Linear_Peak_SPL | 119.5 dB with > 10 dB crest factor (M-noise), 119.5 dB (Pink Noise), 121.5 dB (B-noise) | - |
| Nominal_Directivity_Horizontal_deg | 360 | deg |
| Nominal_Directivity_Vertical | null | - |
| Phase_Response | 45 - 120 Hz ±30 | deg |
| THD_IM_TIM | < 0.02 | % |
| Cardioid_Capability | null | - |
| DSP_Preset_Name | null | - |
| Cardioid_Pattern_Array_Min_Size | null | count |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.4-5 "Specifications"(ACOUSTICAL); AE p.7-8(Performance specifications 단락).
**[1] Usable_Bandwidth_Hz — 조건 명시**: SPS 각주 2 "Recommended maximum operating frequency range. Response depends on loading conditions and room acoustics." — LEOPARD와 유사하게 조건부 서술이 명시됨(TIGRA의 "조건 서술 자체 부재"와 다름).
**Cardioid_Capability**: SPS/OM 전량 스캔 결과 "cardioid" 키워드 0건 — 미확인.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 1 x 12" cone driver | - |
| LF_Acoustical_Load [1] | bass-reflex, low-velocity port design (based on USW-210P subwoofer design) | - |
| Passive_Crossover_Network | No | - |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_Overall | null | W |
| Peak_Power_Handling_10ms_Overall | null | W |
| LF_Nominal_Impedance | 3 | Ohm |
| Nominal_Impedance_Overall | null | Ohm |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.4-5 "TRANSDUCER"; AE p.7("The transducer shall consist of one 12-inch cone driver").
**[1] LF_Acoustical_Load — 계보 정보**: SPS "The bass reflex cabinet employs a low-velocity port based on the Meyer Sound USW-210P subwoofer design for high efficiency and low port distortion." — USW-112P와 동일한 "low-velocity port design" 표현이나, 이 제품은 원류가 USW-210P임을 명시적으로 밝힘(USW-112P 원문에는 이 계보 서술이 없었음).
**Passive_Crossover_Network=No**: SPS/OM/AE 전량 스캔 결과 패시브 크로스오버 컴포넌트 서술 없음 — 단일 드라이버 구조상 개념 자체 불필요.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Analog_Input_Connector [1] | Phoenix 5-pin male (combined DC power + balanced audio) | - |
| Analog_Loop_Output_Connector | null | - |
| Analog_Input_Impedance | 10000 | Ohm |
| Analog_Nominal_Input_Level | 0 dBV (1.0 V rms) continuous, typically onset of limiting | - |
| Analog_Input_Pinout_Pin1 | DC power negative (-) | - |
| Analog_Input_Pinout_Pin2 | DC power positive (+) | - |
| Analog_Input_Pinout_Pin3 | Audio shield, chassis/earth | - |
| Analog_Input_Pinout_Pin4 | Audio (-) | - |
| Analog_Input_Pinout_Pin5 | Audio (+) | - |
| Analog_Input_Pinout_Case | null | - |
| Analog_Source_Drive_Requirement | +20 dBV (10 V rms) into 600 Ohm (for maximum peak SPL) | - |
| Digital_Input_Connector | null | - |
| Digital_Input_Format | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.5 "AUDIO INPUT"; OM p.5(USW-112XP Input Connector, Rear Panel).
**[1] Analog_Input_Connector — DC전원+오디오 결합 커넥터**: MM-10XP와 동일한 아키텍처 — 5개 핀 중 2개(DC전원 ±)+3개(오디오 shield/-/+). Type="Differential, electronically balanced"; Maximum Common Mode Range=±15 V DC, clamped to earth for voltage transient protection(SPS 명시, MM-10XP에는 없던 수치).
**핀 순서 — MM-10XP와 동일**: OM 배선도(Belden 1502 케이블 결선표) — Pin1=Black=DC power(-), Pin2=Red=DC power(+), Pin3=Shield drain=Audio shield, Pin4=Blue=Audio(-), Pin5=White=Audio(+). MM-10XP의 "Input Polarity 스위치 라벨 불일치" 같은 특이사항은 이 제품 원문에 없음.
**Analog_Loop_Output_Connector/Analog_Input_Pinout_Case=null**: 루프 아웃 커넥터 없음(단일 DC전원 겸용 입력만 존재), Case 접지 개념도 Phoenix 구조라 비적용.

## power_supply

self-powered이나 **외부 DC 전원 공급 구조**(MM-10XP와 동일 아키텍처) — AC 관련 Key는 전부 비적용.

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
| Power_Supply_Protection_Features | tolerates voltage drops (due to long cable runs) up to 30%; onboard amplifier/signal-processing circuits store DC power and tolerate voltage drops | - |
| Amplifier_Total_Output_Power | 600 | W |
| Idle_Current | null | - |
| Max_Long_Term_Continuous_Current | null | - |
| Burst_Current | null | - |
| Max_Instantaneous_Peak_Current | null | - |
| Inrush_Current | null | A peak |
| DC_Operating_Voltage [2] | 48 | V DC |
| External_Power_Supply_Required [2] | Meyer Sound MPS IntelligentDC Power Supply (MPS-488HP single-space 19" rack, up to 8 channels; or MPS-482HP half-rack, 2 channels) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.6 "AMPLIFIER"/"DC POWER"; AE p.7-8; OM p.7-11(USW-112XP Current Draw and Cable Requirements, Cable Lengths and Cable Gauges, Connecting to an External Meyer Sound Power Supply).
**[1] Max_Cable_Round_Trip_Resistance=2**: OM "The total cable resistance between the USW-112XP and its external power supply should not exceed 2 Ω." — MM-10XP와 동일 수치.
**[2] DC_Operating_Voltage/External_Power_Supply_Required**: SPS "Safety Rated Voltage Range: 48 V DC—Meyer Sound MPS-482HP or MPS-488HP Power Supply required (NEC ANSI/NFPA 70 Class 2 Wiring Approved)." MM-10XP 파싱 시 신설된 이 브랜드 고유 Key군을 그대로 재사용(이 제품에 실값 반영, MM-10XP/AC/ACX 등 다른 파일에는 동기화하지 않음 — 각 XP 제품이 자기 자신의 값을 이미 보유).
**Idle_Current 등 전류 세부값 미확인**: MM-10XP는 SPS에 "CURRENT DRAW" 표가 별도로 있었으나, USW-112XP의 SPS(8p) 전량 확인 결과 이런 세부 전류 표 자체가 없음(DC POWER 섹션에 Connector/Safety Rated Voltage Range만 명시) — 미확인.
**Amplifier_Total_Output_Power**: SPS "Total Output Power: 600 W peak" — USW-112P(1200W)의 절반, MM-10XP(440W)보다 큼.
**AC_* Key 전부 null(비적용)**: 외부 DC 공급 구조라 AC 관련 개념 자체가 성립하지 않음(MM-10XP와 동일).

## protection_thermal

| Key | Value | Unit |
|---|---|---|
| Limiter_Type | null | - |
| Limiter_Indication [1] | Limit and On/Status LED (3-color): flashes all colors during power-up then solid green=ready; yellow=limiting active (signal 2dB above threshold); red flashing=clipping (input stage overload, reduce source level); solid red with continued audio=voltage dropped below 25 V DC, cease operation | - |
| Cooling_Type | convection | - |
| IP_Rating [2] | 54 (SPS, weather-protected units with rain hood properly installed); 56 (OM, weather-protected units using rain hood) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.6("Cooling: Convection"), p.7("IP Rating" 행); OM p.6-7(USW-112XP LED, Power On, Limiting, Clipping), p.24-25(Rain Hood, IP Ratings 절).
**[1] Limiter_Indication**: MM-10XP와 유사한 3색 LED 구조이나 저전압 폴트 기준(25V DC 미만)은 동일하고, 리미팅 임계치 서술은 온도 기반(MM-10XP)이 아니라 신호레벨 기반("signal rises 2 dB above the limiting threshold")으로 다름 — 각 제품 자신의 원문 그대로 채택.
**[2] IP_Rating — 소스 간 명시적 수치 불일치(신규 발견)**: SPS PHYSICAL 표 "IP Rating: IP54 for weather-protected units with rain hood properly installed." 반면 OM "Rain Hood" 절 "Weather-protected USW-112XP loudspeakers using the rain hood are rated IP56 for protection against solid objects and water intrusion." — 두 수치(54/56) 모두 "우천 후드 장착 시"라는 동일 조건을 전제로 하면서도 서로 다른 2자리 IP 코드를 명시하는 드문 직접 충돌 사례(900-LFC의 "2단계 등급 체계"나 PANTHER의 "제품 전체 vs 커넥터 단위" 충돌과 달리, 동일 구성에 대한 단순 수치 불일치로 보임) — 어느 쪽도 폐기하지 않고 둘 다 Value에 병기, 대표값을 정하지 않음.

## network_monitoring

self-powered/네트워크 연동 섹션. RMS Network(옵션, MPS-488HP 파워서플라이 경유).

| Key | Value | Unit |
|---|---|---|
| Network_Protocol | null | - |
| Telemetry_Software | Compass Control Software (RMS™ remote monitoring system) | - |
| Telemetry_Transport [1] | via optional RMS module purchased with the MPS-488HP external power supply (not on the loudspeaker itself) | - |
| Device_Identification_Function | null | - |
| Network_Connectivity_LED | null | - |
| AES67_Support | null | - |
| Service_Port_Type | null | - |
| Remote_Mute_Control | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.2("The MPS-488HP can be optionally purchased with an RMS module for connecting to Meyer Sound's remote monitoring system"); AE p.8("Meyer Sound's RMS remote monitoring system shall be optionally available via the MPS-488HP power supply").
**[1] Telemetry_Transport — 이 브랜드 최초의 "전원공급기 경유" RMS 아키텍처**: 다른 MY 제품(LEOPARD/LINA/750-LFC/900-LFC)은 RMS 모듈이 제품 자신에 내장/옵션이었으나, USW-112XP는 제품 자체가 아니라 **외부 MPS-488HP 파워서플라이 쪽에 옵션으로 장착**되는 구조 — DC전원 아키텍처 특성상 원격 모니터링 인텔리전스가 전원공급 허브에 집중된 것으로 판단. Device_Identification_Function(Wink) 등은 SPS/OM 전량 스캔 결과 이 제품 자신의 원문에 없어 미확인.

## amplification_requirements

self-powered이므로 외부 앰프 매칭 개념이 원천적으로 비적용.

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | null | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type [1] | Active (1-way subwoofer, single driver driven by open-loop Class-D amplifier — 채널 수 원문 미기재) | - |

### 주석 및 출처 (Notes & Sources)

**비적용 사유**: self-powered 제품이라 외부 앰프 매칭 불필요.
**[1] Crossover_Type**: 파일 서두 아키텍처 판단 참조 — MM-10XP/USW-112P와 달리 앰프 채널 수에 대한 원문 서술이 전혀 없어(단순히 "open-loop, Class-D") 임의로 채널 수를 추정하지 않음.

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type [1] | two integrated M8 threaded rigging points (top/bottom, stainless steel); integral 35 mm pole mount receptacle with M20 threads; optional MUB-USW-112 U-bracket (wall/ceiling/truss/floor); optional MPK-POLE-35MM-M20 adjustable pole mount kit (927-1524mm, gas-cylinder assisted lift); QuickFly-compatible | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | eye bolt (optional accessory, shown mounted on top panel) | - |
| Weight_Net | 19.5 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.4("Accessories and Associated Products" — MUB-USW-112 U-Bracket, MPK-POLE-35MM/M20 Adjustable Pole Mount), p.7("PHYSICAL" Rigging 행); OM p.12-17(QuickFly Rigging, Rigging Points, MUB-USW-112 U-Bracket, MPK-POLE Pole Mount).
**[1] Rigging_System_Type — USW-112P와 공유하는 액세서리**: OM "One USW-112P or USW-112XP can be safely mounted with the MUB-USW-112 U-bracket at a 5:1 safety factor." — 두 모델이 리깅 액세서리를 공유하는 것이 확인됨.
**MPK-POLE 안전 주의사항**: OM "When pole-mounting an ULTRA-X20XP onto a USW-112XP, to keep it stable, do not lift the ULTRA-X20XP higher than 44 inches from the top of the USW-112XP. This limit is due to the small footprint and light weight of the USW-112XP." — 폴마운트 시 상단 탑재물 높이 제한이 명시적으로 확인된 최초 사례.
**Handles="eye bolt"**: OM 이미지 캡션 "USW-112XP with Eye Bolt" — 다른 MY 서브우퍼의 "detachable side handles"와 다른 형태, 정확한 손잡이 유무/개수 서술은 없으나 아이볼트 옵션 장착 사례가 이미지로 확인됨(불완전한 정보, 정식 handle 서술은 아님을 명시).
**Weight_Net**: SPS "Weight: 43 lb (19.5 kg)".

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 343 | mm |
| Height_mm | 597 | mm |
| Depth_mm | 305 | mm |
| Dimensions_Raw | null | mm |
| Cabinet_Material | premium multi-ply birch with slightly textured black finish | - |
| Front_Material | powder-coated, round-perforated steel | - |
| Rigging_Components_Material | high-strength, corrosion-resistant stainless steel (rigging points only) | - |
| Finish_Color | slightly textured black | - |
| Finish_Type | custom color finishes available for specific cosmetic requirements | - |
| IP_Rating | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.6-7 "PHYSICAL"(Dimensions/Enclosure 행); AE p.8("acoustically vented trapezoidal enclosure... Dimensions shall be W: 13.5 in (343 mm) x H: 23.5 in (597 mm) x D: 12 in (305 mm)").
**Rigging_Components_Material(신규 확보)**: OM "The top and bottom faces of the USW-112XP cabinet each include a high-strength, corrosion-resistant stainless steel point" — 다른 MY 서브우퍼는 이 항목이 대부분 미확인이었으나 이 제품에서 실값 확보.
**Cabinet 형태**: AE "acoustically vented trapezoidal enclosure" — 다른 MY 서브우퍼의 사각형 인클로저와 달리 사다리꼴(trapezoidal) 형태로 명시(경사진 커넥터 패널 반영).
**IP_Rating**: protection_thermal 섹션 참조(SPS/OM 소스 충돌 값 보존, 54 vs 56) — physical에서는 중복 방지로 null.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| null | null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: ULTRA-X20XP와의 병용이 주 용도로 서술되나(폴마운트 물리적 결합 방식은 상세), 구성별 권장 비율/주파수범위 표는 SPS/OM 전량 스캔 결과 없음 — 미확인.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms |
|---|---|---|
| null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: SPS/OM 전량 스캔 결과 딜레이 기본값 표 자체가 없음 — 미확인.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| wall/ceiling/truss/floor mount | MUB-USW-112 U-bracket | null | 1 unit (USW-112XP or USW-112P) |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 5:1 | - |
| Max_Wind_Load | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: OM p.14-15("One USW-112XP or USW-112P can be safely mounted with the MUB-USW-112 U-bracket at a 5:1 safety factor", Table 5 Mounting Hole Configurations).
**Mounting Hole Configurations 세부**: 1/2인치 중앙홀=5:1, 1/2인치 외곽홀 2개=5:1, 1/4인치 모서리홀 4개=5:1, 1/4인치 중앙홀 2개=마운팅 정격 없음(폴마운트 어댑터 전용) — USW-112P와 완전 동일 표.
**Safe_Limit 열 null 사유**: 원문이 "safely mounted at 5:1 safety factor"라는 정성적 서술만 제공.
**Max_Wind_Load**: 전량 스캔 결과 구체적 수치 없음 — 미확인.

## Null Report

**미확인(정보 부족)**: Model_Number, WEEE_Marking, Frequency_Response_6dB_Hz, Frequency_Response_3dB_Hz, Frequency_Response_5dB_Hz, Max_SPL_Peak, Max_SPL_4x_Array_Far_Field_Scaled_1m, Max_SPL_Single_Module, Nominal_Directivity_Vertical, Cardioid_Capability, DSP_Preset_Name, Cardioid_Pattern_Array_Min_Size, RMS_Power_Handling_LF, Limiter_Type, Idle_Current, Max_Long_Term_Continuous_Current, Burst_Current, Max_Instantaneous_Peak_Current, Inrush_Current, Network_Protocol, Device_Identification_Function, Network_Connectivity_LED, AES67_Support, Service_Port_Type, Inter_Enclosure_Angles_deg, IP_Rating(physical, 중복방지), preset_guide_and_matching(전 항목), delay_defaults(전 항목), mechanical_safety(Safe_Limit 열, 1건), Max_Wind_Load, Digital_Input_Connector, Digital_Input_Format, Remote_Mute_Control(RMS Network는 존재하나 이 제품 원본에서 원격 뮤트 기능 자체가 아직 재확인되지 않음) — 31건.
**비적용(USW-112XP 아키텍처상 개념 자체 불성립)**: Compatible_Amplified_Controller, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, Dimensions_Raw, Nominal_Impedance_Overall, RMS_Power_Handling_Overall, Analog_Loop_Output_Connector, Analog_Input_Pinout_Case, AC_Connector, AC_Nominal_Voltage_Range, AC_Operating_Voltage_Range, AC_Frequency_Range, Max_Long_Term_Continuous_Power, Burst_Power, Idle_Power, AC_Inlet_Pinout, Peak_Power_Handling_10ms_Overall(self-powered 구조상 Amplifier_Total_Output_Power로 보고) — 17건.

**총계**: null 48건 (미확인 31건 + 비적용 17건). 확정적 비존재(0/No)로 명시한 항목은 1건 — Passive_Crossover_Network(No). **v1.1(2026-07-19)**: speakers 카테고리 전체 일괄 동기화 라운드 — 신규 Key 2종(Peak_Power_Handling_10ms_Overall=비적용, Remote_Mute_Control=미확인) 반영, 총계 46건→48건.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — Meyer Sound 9번째 제품군(USW-112XP) 최초 투입, MM-10XP_v1.0.md를 스켈레톤으로 사용(동일 IntelligentDC 아키텍처). USW-112P와 "USW family" 소속은 공유하나 완전히 별도 모델(AC vs DC 전원) — MM-10 시리즈의 XP 명명 관례가 USW 시리즈에도 적용됨을 확인. `upload/` 폴더 제공 Datasheet(SPS 8p, Architectural Specifications 절 포함)+Operating Instructions(OM 32p) 통합. 신규 발견: IP_Rating이 SPS(54)/OM(56)에서 서로 다른 2자리 코드로 직접 충돌(단순 수치 불일치, 기존 사례들과 다른 유형), RMS Network가 제품 자신이 아닌 외부 MPS-488HP 파워서플라이 쪽 옵션으로 존재하는 이 브랜드 최초 아키텍처, 앰프 채널 수가 원문에 전혀 명시되지 않음(다른 XP 제품과 다름), Rigging_Components_Material 실값 확보(스테인리스 스틸 리깅 포인트), USW-210P 포트 설계 계보 확인. Product_Series="USW family" 신규 확보(다른 MY 서브우퍼는 이 항목이 대개 미확인). Null Report 46건(미확인 30건+비적용 16건). |
| v1.1 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-19) — 신규 Key 2종 반영: Peak_Power_Handling_10ms_Overall(비적용, self-powered 구조), Remote_Mute_Control(미확인, RMS Network는 있으나 원본 재확인 안 됨). Null Report 46건→48건(미확인 31+비적용 17). |
