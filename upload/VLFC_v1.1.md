# VLFC (Meyer Sound) — Master Schema

**Category**: speakers | **Brand**: Meyer Sound (MY) | **Schema Phase**: Phase 4 (Meyer Sound 12번째 제품군 투입)

**스켈레톤 근거**: `speakers/MY/LEOPARD_v1.1.md`를 뼈대로 사용(XLR 5-pin 기본/3-pin 대안, RMS Network, Linear_Peak_SPL 계열 아키텍처 공통) — 다만 VLFC는 이 계열에서 **유일하게 Class AB/H(MOSFET) 증폭 방식**을 쓴다(다른 모든 MY 제품은 Class-D). powerCON 32(다른 제품의 powerCON 20보다 대용량) 커넥터와 5600W 피크 출력도 이 브랜드 서브우퍼 중 최대 규모.

**원본 문서 구성**: 이 제품은 SPS(Datasheet) 단일 문서만 제공되며(OM/AE 별도 파일 없음), SPS 말미에 "Architectural Specifications" 절이 포함되어 AE 역할을 겸한다(10페이지 전체를 스펙+AE 텍스트로 확보).

**아키텍처 판단(원본 근거)**: AE(SPS 내 포함) "The loudspeaker shall be a linear, low-distortion, self-powered, very low-frequency control element and shall be capable of flown, groundstacked, and cardioid configurations. Its transducers shall include two 18-inch long-excursion low-resonance cone drivers. The loudspeaker shall incorporate internal processing and a 2-channel Class AB/H amplifier with complementary MOSFET output stages." — 채널-드라이버 배선 관계(1:1 매핑인지, 브릿지 구성인지)는 원문에 명시되지 않아 임의 추정하지 않음. Passive_Crossover_Network는 SPS(10p) 전량 스캔 결과 "crossover" 키워드 0건으로 No 판정. **1100-LFC 컴패니언 제품**: SPS "Using the same footprint of the 1100-LFC, the VLFC integrates seamlessly with existing infrastructure" — USW-210P/USW-112XP에 이어 세 번째로 1100-LFC(이 프로젝트에 아직 투입되지 않은 제품)가 언급된 사례, 리깅 액세서리(MRK-1100/MTG-1100/MCF-1100/MAS-1100)도 1100-LFC와 완전히 공유.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | VLFC | - |
| Model_Number | null | - |
| Product_Series | null | - |
| Product_Category | Subwoofer | - |
| Product_Type | Self-powered very low-frequency control element | - |
| Description | self-powered, linear, low-distortion, very low-frequency control element (subwoofer), 1-way, 360° coverage, flown/groundstacked/cardioid capable, companion to 1100-LFC | - |
| Way_Count | 1 | - |
| Onboard_Amplification | Yes | - |
| Compliance_Standards [1] | UL and CE certified (specific standard codes/editions not stated in this source) | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS(Datasheet, Architectural Specifications 절 포함) p.1-10.
**[1] Compliance_Standards**: SPS "UL and CE operating voltage range shall be 208-235 V AC." — 다른 MY 제품들의 상세 FCC Part 15/ICES-003/CISPR32 챕터나 인증 마크 이미지가 이 문서에는 없어 UL/CE 인증 존재만 확인, 구체적 조항/에디션은 미확인.
**Model_Number/Product_Series/WEEE_Marking**: 전량 스캔 결과 없음 — 미확인.
**Way_Count=1**: LF 단일 대역(18인치 콘 드라이버 2발, 동일 대역 병렬 구성)만 재생.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz [1] | 13 - 35 | Hz |
| Frequency_Response_6dB_Hz | null | Hz |
| Frequency_Response_3dB_Hz | null | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz [2] | 13 - 30 | Hz |
| Max_SPL_Peak | null | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| Max_SPL_Single_Module | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Linear_Peak_SPL [3] | 125.5 dB with crest factor > 10.5 dB (M-noise), 125.5 dB (Pink noise) | - |
| Nominal_Directivity_Horizontal_deg | 360 | deg |
| Nominal_Directivity_Vertical | null | - |
| Phase_Response | 13 - 30 Hz ±30 | deg |
| THD_IM_TIM | < 0.02 | % |
| Cardioid_Capability [4] | Array-based, manual reversed-unit stacking/flying (구체적 딜레이/극성 수치는 이 문서에 없음, 750/900-LFC와 다름) | - |
| DSP_Preset_Name | null | - |
| Cardioid_Pattern_Array_Min_Size | null | count |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.6 "Specifications"(ACOUSTICAL); p.2("13 Hz to 30 Hz operating frequency response complements Meyer Sound's 1100-LFC and other subwoofers in the lowest octaves even below the typical 20 Hz limit").
**[1] Usable_Bandwidth_Hz — 다른 MY 제품 대비 극저역**: 이 브랜드 서브우퍼 중 가장 낮은 대역(13Hz~)을 재생 — "very low-frequency control element"라는 제품 분류명 자체가 이를 반영.
**[2] Frequency_Response_4dB_Hz**: 각주 3 "Measured in half-space with pink noise at 4 m, 1/3-octave frequency resolution."
**[3] Linear_Peak_SPL — 압축 특성 추가 명시**: 각주 4 "Loudspeaker SPL compression measured with M-noise at the onset of limiting, 2-hour duration, and 50-degree C ambient temperature is <2 dB." — 다른 MY 제품에는 없는 장시간/고온 조건 압축 특성 수치가 명시됨. B-noise 수치는 이 제품 원문에 없어(LEOPARD/LINA/750/900-LFC는 3종 병기) M-noise/Pink noise 2종만 병기.
**[4] Cardioid_Capability**: SPS "Stack units normally or reversed for cardioid configurations."; "The GuideALinks also accommodate reversed units for flown cardioid arrays." — KS28과 유사하게 유닛 반전 배치 원리이나, 750/900-LFC처럼 구체적 딜레이(ms)/극성 반전 수치가 이 문서에 명시되지 않음 — 원리만 확인, 파라미터는 미확인.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 2 x 18" long-excursion low-resonance cone drivers | - |
| LF_Acoustical_Load | optimally tuned, vented enclosure | - |
| Passive_Crossover_Network | No | - |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_Overall | null | W |
| Peak_Power_Handling_10ms_Overall | null | W |
| LF_Nominal_Impedance | 8 | Ohm |
| Nominal_Impedance_Overall | null | Ohm |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.6 "TRANSDUCERS"("Two 18-inch long-excursion low-resonance cone drivers; 8 Ω nominal impedance").
**LF_Nominal_Impedance=8Ω**: 다른 MY 서브우퍼(2~4Ω)보다 높은 임피던스 — 대구경 듀얼드라이버+대출력 앰프 조합에 따른 설계 차이로 추정(원문에 명시적 설명 없음).
**Passive_Crossover_Network=No**: SPS(10p) 전량 스캔 결과 "crossover" 키워드 0건 검출.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Analog_Input_Connector [1] | XLR 5-pin female input with male loop output (base); XLR 3-pin female available (balanced audio only, no RMS) | - |
| Analog_Loop_Output_Connector | XLR 5-pin male (base); XLR 3-pin male available | - |
| Analog_Input_Impedance | 10000 | Ohm |
| Analog_Nominal_Input_Level | 0 dBV (1.0 V rms) continuous, typically onset of limiting for noise and music | - |
| Analog_Input_Pinout_Pin1 | Chassis/earth through 220 kOhm, 1000 pF, 15 V clamp network (virtual ground lift at audio frequencies) | - |
| Analog_Input_Pinout_Pin2 | Signal (+) | - |
| Analog_Input_Pinout_Pin3 | Signal (-) | - |
| Analog_Input_Pinout_Pin4 [2] | RMS | - |
| Analog_Input_Pinout_Pin5 [2] | RMS | - |
| Analog_Input_Pinout_Case | Earth ground and chassis | - |
| Analog_Source_Drive_Requirement | +20 dBV (10 V rms) into 600 Ohm (for maximum peak SPL) | - |
| Digital_Input_Connector | null | - |
| Digital_Input_Format | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.6-7 "AUDIO INPUT"(Type/Maximum Common Mode Range/Connectors/Input Impedance/Wiring/Nominal Input Sensitivity/Input Level).
**[1] Analog_Input_Connector**: LEOPARD와 동일한 5-pin 기본/3-pin 대안 관계(LINA/750-LFC의 3-pin 기본과 반대).
**[2] Pin4/Pin5(RMS)**: 각주 5 "Pins 4 and 5 (RMS) only included with XLR 5-pin connector that accommodates both balanced audio and RMS signals."
**Digital_Input_Connector/Format=null**: 디지털(Milan AVB/AES67 등) 오디오 입력 자체가 없음 — 아날로그 전용 제품.

## power_supply

self-powered 아키텍처 전용 섹션. **단일 전압 조건(230V AC)만 명시**(다른 MY 제품의 115/230/100V 3조건 병기와 다름) — 이 제품은 208-235VAC 좁은 정격 범위만 지원하는 것으로 판단.

| Key | Value | Unit |
|---|---|---|
| AC_Connector | powerCON 32 input | - |
| AC_Nominal_Voltage_Range [1] | 208 - 235 | V AC |
| AC_Operating_Voltage_Range [2] | 165 - 264 | V AC |
| AC_Frequency_Range | 50 - 60 | Hz |
| Max_Long_Term_Continuous_Power | null | W |
| Burst_Power | null | W |
| Idle_Power | null | W |
| Max_Cable_Round_Trip_Resistance | null | Ohm |
| AC_Inlet_Pinout | null | - |
| Power_Supply_Protection_Features | EMI filtering, soft current turn-on, surge suppression | - |
| Amplifier_Total_Output_Power | 5600 | W |
| Idle_Current [3] | 0.6 A rms (230 V AC only) | - |
| Max_Long_Term_Continuous_Current [3] | 10.5 A rms (230 V AC only) | - |
| Burst_Current [3] | 18 A rms (230 V AC only) | - |
| Max_Instantaneous_Peak_Current [3] | 53 A peak (230 V AC only) | - |
| Inrush_Current | < 30 | A peak |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.7-8 "AC POWER"/"CURRENT DRAW".
**[1] AC_Connector — powerCON 32(이 브랜드 최대 용량)**: 다른 MY 제품의 powerCON 20보다 대용량 커넥터 — 5600W 피크 출력에 대응하기 위한 것으로 판단.
**[2] AC_Operating_Voltage_Range**: SPS "Turn-on and Turn-off Points: 165 V AC turn-on; 264 V AC turn-off."
**[3] 단일 전압(230VAC)만 병기**: 다른 MY 제품(LEOPARD/LINA/750/900-LFC 등)은 115/230/100VAC 3조건을 병기했으나, VLFC의 SPS/AE 전량 스캔 결과 오직 "230 V AC" 단일 조건만 명시 — AC_Nominal_Voltage_Range(208-235VAC)가 애초에 100/115VAC를 포함하지 않는 좁은 정격이라 정합됨.
**Amplifier_Total_Output_Power**: SPS "Total Output Power: 5600 W peak" — 이 브랜드 서브우퍼 중 최대 출력.
**Max_Long_Term_Continuous_Power/Burst_Power/Idle_Power=null**: A 단위로만 제공, 임의 환산 금지 원칙에 따라 null 유지.

## protection_thermal

self-powered 아키텍처 전용 섹션.

| Key | Value | Unit |
|---|---|---|
| Limiter_Type | TruPower limiting | - |
| Limiter_Indication | null | - |
| Cooling_Type [1] | forced-air, three ultra high-speed primary fans, three ultra high-speed reserve fans | - |
| IP_Rating | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.7 "AMPLIFIER"("Cooling: Three ultra high-speed primary fans; three ultra high-speed reserve fans"); AE 절("Protection circuits shall include TruPower limiting").
**[1] Cooling_Type — 이 브랜드 최다 팬 구성(6개)**: 주 냉각팬 3개+예비팬 3개로 총 6개 — 다른 MY 제품(PANTHER 2개, 2100-LFC 개수 미상) 대비 압도적으로 많은 팬 수, 5600W급 대출력 앰프의 발열 관리 필요성을 반영한 것으로 판단.
**Limiter_Indication/IP_Rating**: OM이 없어 LED 상태 표시 체계나 IP 등급 수치가 SPS에 명시되지 않음(SPS 본문에 "weather protection... available options"라는 정성적 서술만 있음) — 미확인.

## network_monitoring

self-powered/네트워크 연동 섹션. RMS Network.

| Key | Value | Unit |
|---|---|---|
| Network_Protocol | null | - |
| Telemetry_Software | Compass control software (RMS™ remote monitoring system) | - |
| Telemetry_Transport [1] | two-conductor, twisted-pair network (RMS module included as standard) | - |
| Device_Identification_Function | null | - |
| Network_Connectivity_LED | null | - |
| AES67_Support | null | - |
| Service_Port_Type | null | - |
| Remote_Mute_Control | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.2("The RMS™ remote monitoring system provides comprehensive, real-time information about loudspeaker parameters from a Mac® or Windows®-based computer running Compass® control software via the RMS™ interface"), p.8 "RMS NETWORK"; AE 절("The loudspeaker shall include an RMS remote monitoring system module").
**[1] Telemetry_Transport — RMS 기본 포함(옵션 아님)**: 다른 MY 제품(LEOPARD/LINA/750/900-LFC)은 RMS 모듈이 옵션이었으나, VLFC의 AE는 "shall include an RMS remote monitoring system module"로 **기본 포함**을 명시 — 이 브랜드 서브우퍼 중 유일하게 확정적으로 기본 탑재.
**신규 액세서리 발견(동기화 대상 아님)**: SPS "MDM-5000 Distribution Module — MDM-5000 units conveniently power 1100-LFC/VLFC systems, routing up to six channels of AC power, balanced audio and RMS signals to the loudspeakers." — 이 제품 고유의 대규모 배전 액세서리, 기존 스키마에 대응 Key 없음(제품 자체 스펙이 아닌 주변기기라 신규 Key 신설 대상 아님, 이 각주로만 기록).

## amplification_requirements

self-powered이므로 외부 앰프 매칭 개념이 원천적으로 비적용.

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | null | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type [1] | Active (1-way subwoofer, two 18-inch drivers driven by internal 2-channel Class AB/H bridged amplifier — 채널-드라이버 배선 관계는 원문 미기재) | - |

### 주석 및 출처 (Notes & Sources)

**비적용 사유**: self-powered 제품이라 외부 앰프 매칭 불필요.
**[1] Crossover_Type**: "bridged" 구성이 두 채널을 하나의 부하로 묶는 것을 의미하는지, 드라이버 1:1 매핑인지 원문에 명시되지 않아 단정하지 않음(USW-121P와 동일한 판단 원칙).

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type [1] | optional MRK-1100 rigging kit (4 captive GuideALinks, 8 quick-release pins, 0.5in x 1.25in QRP); MTG-1100 top grid(6 pickup points, laser/inclinometer bracket mounts); MCF-1100 caster frame(transport); MAS-1100 array spacer(vertical directionality); MVP Motor Vee Plate(horizontal aim, compatible with MTG-LEO-M/MTG-LYON/MTG-1100/MG-LEOPARD-900) | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | null | - |
| Weight_Net [2] | 135.2 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.2-6 "Accessories and Associated Products"(MRK-1100/MTG-1100/MVP/MAS-1100/MCF-1100), p.8 "PHYSICAL"(Rigging 행), p.9(Rigging 상세).
**[1] Rigging_System_Type — 1100-LFC와 액세서리 완전 공유**: 모든 리깅 액세서리명이 "1100"을 포함(MRK-1100/MTG-1100/MCF-1100/MAS-1100) — VLFC 전용 액세서리가 별도로 없고 1100-LFC와 완전히 동일한 리깅 생태계를 공유.
**Inter_Enclosure_Angles_deg**: MAS-1100 Array Spacer가 "lengthen the array and improve vertical directionality"로 서술되나 구체적 각도 수치는 없음 — 미확인.
**Handles**: SPS "Convenient pinned handles and slots make the GuideALinks... easy to set" — 이는 일반 캐리 핸들이 아니라 GuideALinks 조작용 핀형 손잡이 서술이라 이 Key(일반 핸들 개수/형태)에는 반영하지 않음 — 미확인.
**[2] Weight_Net**: SPS "Weight without Rigging: 298 lb (135.2 kg)" — 리깅 장착 시 332 lb(150.7 kg)로 증가(다른 MY 제품과 동일하게 미장착 기준 채택).

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 1388 | mm |
| Height_mm | 520 | mm |
| Depth_mm | 838 | mm |
| Dimensions_Raw | null | mm |
| Cabinet_Material | premium multi-ply birch with slightly textured black finish | - |
| Front_Material | powder-coated, hex-stamped steel with acoustical black mesh | - |
| Rigging_Components_Material | null | - |
| Finish_Color | slightly textured black | - |
| Finish_Type | custom color finishes available for fixed installations with specific cosmetic requirements | - |
| IP_Rating | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.1(도면), p.8 "PHYSICAL"(Dimensions without/with Rigging 행); AE 절("Dimensions without optional rigging shall be 54.65 in (1388 mm) wide x 20.48 in (520 mm) high x 33.00 in (838 mm) deep").
**리깅 장착 시 치수 동일 표기(원문 특이사항)**: SPS "Dimensions with Rigging" 행이 "Dimensions without Rigging"과 완전히 동일한 수치(1388/520/838mm)로 표기됨 — 다른 MY 제품(TIGRA 등)은 리깅 장착 시 치수가 소폭 증가했으나, 이 제품은 원문 자체가 증가분을 반영하지 않은 것으로 보임(원문 그대로 보존, 오기재 여부는 판단하지 않음).
**Dimensions_Raw**: 축이 명확히 확인되어 상위 호환 Key로 대체 — null.
**IP_Rating**: protection_thermal 섹션 참조(미확인).

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| null | null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: SPS "Galileo GALAXY Network Platform... GALAXY devices' improved Delay Integration lets you combine VLFCs with different Meyer Sound loudspeakers." — 시스템 프로세서(Galileo GALAXY) 기반 통합 기능이 서술되나 구성별 권장 비율/주파수범위 표는 없음 — 미확인.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms |
|---|---|---|
| null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: preset_guide_and_matching과 동일 — Galileo GALAXY의 "Delay Integration" 기능이 언급되나 구체적 기본값 표는 SPS에 없음.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| flown | MTG-1100 Top Grid (+ MRK-1100 rigging kit) | null | 16 x VLFC/1100-LFC |
| transport (not flown) | MCF-1100 Caster Frame | null | 3 cabinets |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 5:1 | - |
| Max_Wind_Load | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.3("MTG-1100 Top Grid — With some restrictions, flies up to 16 1100-LFCs/VLFCs at a 5:1 safety factor"), p.5("MCF-1100 Caster Frame — Safely transports up to three 1100-LFC/VLFC cabinets").
**flown=16대**: 1100-LFC와 VLFC를 혼합해도 총 16대까지("with some restrictions" — 구체적 제한 조건은 SPS에 상세 서술 없음, MAPP 소프트웨어로 검증 권고).
**Safe_Limit 열 null 사유**: 원문이 "Maximum" 상한만 제공.
**Safety_Factor=5**: SPS 전반에서 "5:1 safety factor" 반복 확인.
**Max_Wind_Load**: 전량 스캔 결과 구체적 수치 없음 — 미확인.

## Null Report

**미확인(정보 부족, 대부분 OM 부재에 기인)**: Model_Number, Product_Series, WEEE_Marking, Frequency_Response_6dB_Hz, Frequency_Response_3dB_Hz, Frequency_Response_5dB_Hz, Max_SPL_Peak, Max_SPL_4x_Array_Far_Field_Scaled_1m, Max_SPL_Single_Module, Nominal_Directivity_Vertical, DSP_Preset_Name, Cardioid_Pattern_Array_Min_Size, RMS_Power_Handling_LF, Max_Long_Term_Continuous_Power, Burst_Power, Idle_Power, Max_Cable_Round_Trip_Resistance, AC_Inlet_Pinout, Limiter_Indication, IP_Rating(protection_thermal), Network_Protocol, Device_Identification_Function, Network_Connectivity_LED, AES67_Support, Service_Port_Type, Inter_Enclosure_Angles_deg, Handles, Rigging_Components_Material, IP_Rating(physical), preset_guide_and_matching(전 항목), delay_defaults(전 항목), mechanical_safety(Safe_Limit 열, 2건), Max_Wind_Load, Digital_Input_Connector, Digital_Input_Format, Remote_Mute_Control(RMS Network가 기본 포함이나 이 제품 원본에서 원격 뮤트 기능 자체가 아직 재확인되지 않음) — 35건.
**비적용(VLFC 아키텍처상 개념 자체 불성립)**: Compatible_Amplified_Controller, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, Dimensions_Raw, Nominal_Impedance_Overall, RMS_Power_Handling_Overall, AES75_Max_Linear_SPL(Linear_Peak_SPL 채택 제품이라 상호 배타적 Key), Peak_Power_Handling_10ms_Overall(self-powered 구조상 Amplifier_Total_Output_Power로 보고) — 8건.

**총계**: null 43건 (미확인 35건 + 비적용 8건). 확정적 비존재(0/No)로 명시한 항목은 1건 — Passive_Crossover_Network(No). **v1.1(2026-07-19)**: speakers 카테고리 전체 일괄 동기화 라운드 — 신규 Key 2종(Peak_Power_Handling_10ms_Overall=비적용, Remote_Mute_Control=미확인) 반영, 총계 41건→43건.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — Meyer Sound 12번째 제품군(VLFC) 최초 투입, LEOPARD_v1.1.md를 스켈레톤으로 사용. `upload/` 폴더 제공 Datasheet(SPS 10p, Architectural Specifications 절 포함) 단일 소스 — OM/별도 AE 파일 없음. 이 브랜드 유일의 Class AB/H(MOSFET) 증폭 방식(다른 전 제품은 Class-D), powerCON 32(최대 용량 커넥터)와 5600W 피크(이 브랜드 최대 출력) 확인. 신규 발견: 냉각팬 6개(주 3+예비 3, 이 브랜드 최다), RMS Network가 옵션이 아닌 기본 포함으로 확정 명시된 유일한 사례, 1100-LFC(미투입)와 리깅 액세서리 전면 공유(MRK/MTG/MCF/MAS-1100), 리깅 장착 전후 치수가 원문상 동일하게 표기된 특이사항 보존, MDM-5000 배전 액세서리(6채널 AC+오디오+RMS 통합 배전) 발견. Linear_Peak_SPL은 M-noise/Pink noise 2종만 병기(B-noise 없음, LEOPARD/LINA와 다름). 단일 전압(230VAC)만 전류 스펙 제공(다른 제품의 3전압 병기와 다름). Null Report 41건(미확인 34건+비적용 7건). |
| v1.1 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-19) — 신규 Key 2종 반영: Peak_Power_Handling_10ms_Overall(비적용, self-powered 구조), Remote_Mute_Control(미확인, RMS Network는 기본 포함이나 원본 재확인 안 됨). Null Report 41건→43건(미확인 35+비적용 8). |
