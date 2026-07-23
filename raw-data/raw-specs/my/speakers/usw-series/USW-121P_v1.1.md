# USW-121P (Meyer Sound) — Master Schema

**Category**: speakers | **Brand**: Meyer Sound (MY) | **Schema Phase**: Phase 4 (Meyer Sound 11번째 제품군 투입)

**스켈레톤 근거**: `speakers/MY/2100-LFC_v1.0.md`를 뼈대로 사용 — 같은 "USW-" 명명이지만 USW-112P/112XP/210P(powerCON 20, RMS Network, Linear_Peak_SPL 계열)와 완전히 다른 아키텍처다. USW-121P는 **AES75 표준, Neutrik TOP 커넥터, AES67/SMPTE 2110 디지털 오디오, TruPower limiting**을 갖춘 PANTHER/TIGRA/2100-LFC 계열에 속한다 — "USW-"라는 이름만으로 자매 제품군과 동일 아키텍처를 짐작해서는 안 된다는 원칙(speakers/CLAUDE.md)이 이 브랜드 내부에서도 반복 확인된 사례.

**원본 문서 구성 특이사항**: 이 제품은 AE+SPS 2종만 제공되고 OM(Operating Instructions)이 없다 — 따라서 배선도 핀아웃, LED 상태 표시, 리깅 안전계수 등 OM에서만 통상 확보되던 상세 운용 정보 다수가 미확인으로 남는다. 이는 "정보가 부실해서"가 아니라 "해당 소스 문서 자체가 이번 투입분에 없어서"임을 각 항목 각주에 구분해 명시한다.

**신규 발견 — GEN-1 임베디드 DSP(이 브랜드 최초 아키텍처)**: SPS "USER DSP" 절 — "Type 3P input module features GEN-1 technology, embedding the signal processing of a Galileo GALAXY output channel in the loudspeaker, controlled via Nebra software." 이는 PANTHER/TIGRA/2100-LFC의 단순 온보드 DSP(드라이버 보호, 주파수/위상 보정)를 넘어, **Meyer Sound 자사 시스템 프로세서(Galileo GALAXY)의 출력 채널 전체 기능(10밴드 파라메트릭 EQ, U-shaping 필터, 극성, 딜레이, 게인, 뮤트, 하이/로우패스 필터, product integration)을 스피커 자체에 임베드**한 구조 — 이 프로젝트에 처음 등장하는 개념이라 신규 Key `User_DSP_Module_Type`/`User_DSP_Onboard_Functions`를 acoustical_performance 섹션에 신설했다. 다른 MY 제품에는 이 개념 자체가 없어(전량 확인은 각 제품 재조회 필요) 이번 라운드에서는 동기화하지 않는다(원본성 요건).

**아키텍처 판단(원본 근거)**: AE "The loudspeaker shall be a linear, low-distortion, self-powered, sub-bass system. Its transducer shall be a single 21-inch long-excursion cone driver. The loudspeaker shall incorporate internal processing and a 2-channel class-D amplifier." — 단일 드라이버에 2채널 앰프(2100-LFC와 동일 채널수이나 드라이버는 1발, 즉 배선 관계가 다를 수 있으나 원문에 상세 서술 없음). Passive_Crossover_Network는 AE(2p)+SPS(4p) 전량 스캔 결과 "crossover" 키워드 0건으로 No 판정.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | USW-121P | - |
| Model_Number | null | - |
| Product_Series | null | - |
| Product_Category | Subwoofer | - |
| Product_Type | Self-powered sub-bass system | - |
| Description | self-powered, linear, low-distortion sub-bass system, 1-way, 360° coverage, single 21-inch driver, AES67/SMPTE 2110 digital audio with embedded Galileo GALAXY-equivalent onboard DSP; optional OT(Outdoor Treatment) version | - |
| Way_Count | 1 | - |
| Onboard_Amplification | Yes | - |
| Compliance_Standards [1] | cUL Listed (3JKB Commercial Audio System); UKCA; CE marked | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS(Datasheet) p.1-4; AE(Architectural Specification) p.1-2.
**[1] Compliance_Standards(이미지 인증마크에서 확보)**: SPS p.4 하단 인증 마크 이미지 — "cUL LISTED, 3JKB COMMERCIAL AUDIO SYSTEM" + UKCA + CE 확인, FCC/ICES 마크는 이 이미지에 없음(다른 MY 서브우퍼는 FCC Class A/B가 있었으나 이 제품은 확인되지 않음) — SKILL v1.13 예외 규정(이미지 내 텍스트) 적용.
**Model_Number/Product_Series/WEEE_Marking**: AE+SPS 전량 스캔 결과 없음 — 미확인.
**Way_Count=1**: LF 단일 대역(21인치 콘 드라이버 1발)만 재생.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz [1] | 20 - 125 | Hz |
| Frequency_Response_6dB_Hz | null | Hz |
| Frequency_Response_3dB_Hz | null | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz [2] | 23 - 105 | Hz |
| Max_SPL_Peak | null | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| Max_SPL_Single_Module | null | dB |
| AES75_Max_Linear_SPL [3] | 136 dBZpk / 125 dBZ (input +4.4 dBV analog / -17.8 dBFS digital) | - |
| Linear_Peak_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | 360 | deg |
| Nominal_Directivity_Vertical | null | - |
| Phase_Response | 28 - 110 Hz ±30 | deg |
| THD_IM_TIM | null | - |
| Cardioid_Capability | null | - |
| DSP_Preset_Name | null | - |
| Cardioid_Pattern_Array_Min_Size | null | count |
| User_DSP_Module_Type [4] | Type 3P input module, GEN-1 technology, embeds Galileo GALAXY output channel signal processing in the loudspeaker, controlled via Nebra software | - |
| User_DSP_Onboard_Functions [4] | 10-band parametric EQ, U-shaping filters, polarity, delay, gain, mute, high-pass and low-pass filters, product integration | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.2-3 "USW-121P Specifications"(ACOUSTICAL, USER DSP); AE p.1(Performance specifications 단락).
**[1] Usable_Bandwidth_Hz — 조건 명시**: SPS 각주 1 "Recommended maximum operating frequency range. The response depends on loading conditions and room acoustics." — 원문 표기는 "-10dB" 기준점까지 명시(다른 MY 서브우퍼의 무조건부 서술과 달리 dB 기준점이 Key 이름과 별개로 원문에 재확인됨).
**[2] Frequency_Response_4dB_Hz**: SPS 각주 2 "Measured in half-space with pink noise at 4 meters, 1/3-octave frequency resolution."
**[3] AES75_Max_Linear_SPL**: PANTHER/TIGRA/2100-LFC와 동일한 단일 복합값 Key 재사용(번들 원자화 금지 원칙) — 이 제품은 dBA 수치 없이 dBZpk/dBZ 2개만 제공.
**[4] User_DSP_Module_Type/Onboard_Functions(신규 Key, 이 브랜드 최초)**: 파일 서두 "신규 발견" 참조. SPS 각주 3 "Both analog and digital audio inputs are provided as standard." — Type 3P 모듈이 아날로그/디지털 오디오 입력 둘 다 표준 제공을 전제로 동작.
**Max_SPL_Peak/THD_IM_TIM**: OM 부재로 다른 제품들이 SPS AMPLIFIER 표에서 확보하던 이 수치들이 이 제품 SPS에는 없음(AMPLIFIER 섹션 자체가 없고 AC POWER/POWER CONSUMPTION만 있음) — 미확인.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 1 x 21" long-excursion cone driver | - |
| LF_Acoustical_Load | optimally tuned, vented enclosure | - |
| Passive_Crossover_Network | No | - |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_Overall | null | W |
| Peak_Power_Handling_10ms_Overall | null | W |
| LF_Nominal_Impedance | 4 | Ohm |
| Nominal_Impedance_Overall | null | Ohm |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.2 "TRANSDUCERS"; AE p.1.
**LF_Acoustical_Load**: AE "Components shall be mounted in an optimally tuned, vented enclosure" — 2100-LFC와 동일 표현.
**Passive_Crossover_Network=No**: AE(2p)+SPS(4p) 전량 스캔 결과 "crossover" 키워드 0건 검출.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Analog_Input_Connector | Neutrik XLR 3-pin TOP female input with male loop output | - |
| Analog_Loop_Output_Connector | Neutrik XLR 3-pin TOP male | - |
| Analog_Input_Impedance | 10000 | Ohm |
| Analog_Nominal_Input_Level | 0 dBV (1.0 V rms) | - |
| Analog_Input_Pinout_Pin1 | null | - |
| Analog_Input_Pinout_Pin2 | null | - |
| Analog_Input_Pinout_Pin3 | null | - |
| Analog_Input_Pinout_Case | null | - |
| Analog_Source_Drive_Requirement | null | - |
| Digital_Input_Connector | Neutrik etherCON TOP | - |
| Digital_Input_Format [1] | AES67, SMPTE 2110 Compliant | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.3 "ANALOG AUDIO INPUT"/"DIGITAL AUDIO INPUT"; AE p.1.
**[1] Digital_Input_Format — Milan AVB 아님**: PANTHER/TIGRA/2100-LFC는 "AVB, Milan Certified"였으나 USW-121P는 **AES67**(업계 표준 오디오오버IP)+SMPTE 2110(방송/미디어 표준) 준수로 명시 — 동일 브랜드 내에서도 제품별로 디지털 오디오 프로토콜이 다를 수 있음을 재확인(원본 자체가 이렇게 명시).
**Analog_Input_Pinout_Pin1/2/3/Case/Analog_Source_Drive_Requirement=null**: OM이 없어 배선도(Pin별 신호 할당)와 소스 구동 요구치가 이 AE+SPS 2종에 명시되지 않음 — 미확인(다른 MY 제품은 OM에서 이 정보를 확보했음).

## power_supply

self-powered 아키텍처 전용 섹션.

| Key | Value | Unit |
|---|---|---|
| AC_Connector | Neutrik powerCON TRUE1 TOP | - |
| AC_Nominal_Voltage_Range | 200 - 240 | V AC |
| AC_Operating_Voltage_Range | null | V AC |
| AC_Frequency_Range | 50 - 60 | Hz |
| Max_Long_Term_Continuous_Power | 800 | W |
| Burst_Power | 2400 | W |
| Idle_Power | null | W |
| Max_Cable_Round_Trip_Resistance | null | Ohm |
| AC_Inlet_Pinout | null | - |
| Power_Supply_Protection_Features | EMI filtering, soft current turn-on, surge suppression | - |
| Amplifier_Total_Output_Power | null | W |
| Idle_Current | null | - |
| Max_Long_Term_Continuous_Current | null | - |
| Burst_Current | null | - |
| Max_Instantaneous_Peak_Current | null | - |
| Inrush_Current | null | A peak |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.3 "AC POWER"/"POWER CONSUMPTION"; AE p.1-2.
**AC_Operating_Voltage_Range/Max_Cable_Round_Trip_Resistance/AC_Inlet_Pinout**: OM 부재로 동작 전압 범위(정격 대비 확장 범위), 케이블 저항 한계, 인렛 핀 배선도가 AE+SPS에 명시되지 않음 — 미확인.
**Amplifier_Total_Output_Power/Idle_Current 등 전류 세부값**: SPS에 "AMPLIFIER" 챕터 자체가 없고 "AC POWER"/"POWER CONSUMPTION"만 존재(다른 제품과 다른 구조) — Max_Long_Term_Continuous_Power(800W)/Burst_Power(2400W)는 확보했으나 앰프 자체 출력 정격이나 전압별 전류 세부표는 없음 — 미확인.
**Power_Supply_Protection_Features**: AE "The internal power supply shall perform EMI filtering, soft current turn-on, and surge suppression." — 다른 MY 제품의 "sustains operation during low-voltage periods" 같은 부가 서술은 이 제품 원문에 없음.

## protection_thermal

self-powered 아키텍처 전용 섹션.

| Key | Value | Unit |
|---|---|---|
| Limiter_Type | TruPower limiting | - |
| Limiter_Indication | null | - |
| Cooling_Type | null | - |
| IP_Rating [1] | 55 (OT version only, when connected with Neutrik TOP-terminated cables or when connector sealing caps are in place) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: AE p.1("Protection circuits shall include TruPower limiting"), p.1-2(IP rating 서술); SPS p.2 "IEC Ingress Protection Rating (IP Rating)".
**Limiter_Indication/Cooling_Type**: OM이 없어 LED 상태 표시 체계나 냉각 방식(강제공랭/컨벡션) 서술이 AE+SPS에 없음 — 미확인.
**[1] IP_Rating — 조건부, OT(Outdoor Treatment) 버전 전용**: SPS "OT version is IP55 rated when connected to cables terminated with Neutrik TOP connectors."; AE "The IP rating shall be IP55 when the OT version is specified and connected cables are terminated with Neutrik TOP connectors or when the connector sealing caps are in place." — 기본(비-OT) 버전은 IP 등급 자체가 없음(옵션 버전에만 조건부 적용). 다른 MY 제품의 "제품 전체 vs 커넥터 단위" 충돌과 달리, 이 제품은 애초에 "OT 버전 + 특정 커넥터 조건" 둘 다 충족해야 하는 조건부 등급이라는 점이 원문에 명시적으로 확인됨.

## network_monitoring

self-powered/네트워크 연동 아키텍처 전용 섹션.

| Key | Value | Unit |
|---|---|---|
| Network_Protocol | null | - |
| Telemetry_Software [1] | Nebra | - |
| Telemetry_Transport | via Ethernet network (Remote Product Monitoring, RPM) | - |
| Device_Identification_Function | null | - |
| Network_Connectivity_LED | null | - |
| AES67_Support [2] | Yes (digital audio input format) | - |
| Service_Port_Type | null | - |
| Remote_Mute_Control | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.3 "MONITORING"("Remote Product Monitoring: RPM data is transmitted via the Ethernet port and displayed in software"), p.3 "USER DSP"("controlled via Nebra software"); AE p.1("The loudspeaker shall include a telemetry monitoring function via an Ethernet network").
**[1] Telemetry_Software="Nebra"**: MONITORING 절 자체는 소프트웨어명을 반복하지 않으나("displayed in software"), 같은 문서의 USER DSP 절이 "controlled via Nebra software"로 명시 — 이 제품 자신의 문서에서 확인된 Nebra 소프트웨어 생태계와 동일한 것으로 판단해 채택(원본성 요건 충족 — 다른 제품 유추가 아닌 이 제품 자신의 원문 확인).
**[2] AES67_Support="Yes"**: 기존 스키마의 AES67_Support Key는 그동안 PANTHER/TIGRA 등에서 "미확인" 또는 비적용이었으나, 이 제품은 Digital_Input_Format 자체가 AES67이라 명시적으로 Yes 확정.
**Network_Protocol=null**: Milan AVB 같은 명명된 네트워크 프로토콜 서술이 텔레메트리 관련해서는 없음("Ethernet network"이라는 일반 서술만 존재) — 미확인.

## amplification_requirements

self-powered이므로 외부 앰프 매칭 개념이 원천적으로 비적용.

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | null | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type | Active (1-way subwoofer, single driver driven by internal 2-channel Class-D amplifier — 채널-드라이버 배선 관계는 원문 미기재) | - |

### 주석 및 출처 (Notes & Sources)

**비적용 사유**: self-powered 제품이라 외부 앰프 매칭 불필요.

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type [1] | 10 x M8 x 1.25 mm accessory attachment points (6 on left side, 4 on right side) | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | null | - |
| Weight_Net | 89.8 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.2 "PHYSICAL"(Rigging 행).
**[1] Rigging_System_Type — 이 브랜드 서브우퍼 중 유일하게 측면(좌/우) 배치**: 다른 MY 서브우퍼(2100/750/900-LFC)는 상단/하단(top/bottom) 리깅 포인트였으나, USW-121P는 **좌측 6개+우측 4개**로 측면에 비대칭 배치된 액세서리 부착점만 명시 — QuickFly/그리드 플라잉 시스템에 대한 서술이 AE+SPS 어디에도 없음(OM 부재로 실제 리깅 액세서리 종류/방식은 미확인).
**Handles**: 전량 스캔 결과 서술 없음 — 미확인.
**Weight_Net**: SPS/AE 공통 "89.8 kg (198 lb)".

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 1321 | mm |
| Height_mm | 698 | mm |
| Depth_mm | 622 | mm |
| Dimensions_Raw | null | mm |
| Cabinet_Material [1] | premium multi-ply birch, slightly textured black finish. OT version includes additional wood treatment. | - |
| Front_Material [2] | powder-coated, stamped steel (optional); OT version includes stainless steel mesh behind the grille | - |
| Rigging_Components_Material | null | - |
| Finish_Color | slightly textured black | - |
| Finish_Type | null | - |
| IP_Rating | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SPS p.1(도면 "USW-121P Dimensions"), p.2 "PHYSICAL"(Dimensions/Enclosure/Protective Grille 행); AE p.1-2(Dimensions W:52.00in(1321mm) x H:27.50in(698mm) x D:24.50in(622mm)).
**[1] Cabinet_Material — OT 버전 차등 처리**: SPS "The OT version includes additional treatment of the cabinet wood." — 구체적 처리 방식(방수 코팅 등)은 명시되지 않음.
**[2] Front_Material="optional"**: AE "The optional front protective grille shall be powder-coated stamped steel." — 다른 MY 제품은 그릴이 항상 기본 포함이었으나, 이 제품은 원문이 명시적으로 "optional"이라 표현 — 그대로 보존(임의로 "기본 포함"으로 해석하지 않음). OT 버전은 그릴 뒤에 스테인리스 스틸 메시가 추가됨.
**Dimensions_Raw**: 축이 명확히 확인되어 상위 호환 Key로 대체 — null.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| null | null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: AE+SPS 전량 스캔 결과 구성별 권장 비율/주파수범위 표 자체가 없음(OM 부재로 더 상세한 정보 확보 불가) — 미확인.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms |
|---|---|---|
| null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: AE+SPS 전량 스캔 결과 딜레이 기본값 표 자체가 없음 — 미확인. User_DSP_Onboard_Functions에 "delay" 항목이 있으나 이는 사용자가 Nebra 소프트웨어로 자유 설정하는 파라미터이지 제조사가 제공하는 프리셋 기본값 표가 아니다.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| null | null | null | null |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | null | - |
| Max_Wind_Load | null | - |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: OM이 없어 리깅 액세서리별 안전계수/최대 하중/풍하중 등 정량적 안전 데이터가 AE+SPS 어디에도 없음(M8 부착점 10개의 존재만 확인, 실제 사용 가능한 액세서리 종류와 정격은 불명) — 미확인.

## Null Report

**미확인(정보 부족, 대부분 OM 부재에 기인)**: Model_Number, Product_Series, WEEE_Marking, Frequency_Response_6dB_Hz, Frequency_Response_3dB_Hz, Frequency_Response_5dB_Hz, Max_SPL_Peak, Max_SPL_4x_Array_Far_Field_Scaled_1m, Max_SPL_Single_Module, Nominal_Directivity_Vertical, THD_IM_TIM, Cardioid_Capability, DSP_Preset_Name, Cardioid_Pattern_Array_Min_Size, RMS_Power_Handling_LF, Analog_Input_Pinout_Pin1, Analog_Input_Pinout_Pin2, Analog_Input_Pinout_Pin3, Analog_Input_Pinout_Case, Analog_Source_Drive_Requirement, AC_Operating_Voltage_Range, Max_Cable_Round_Trip_Resistance, AC_Inlet_Pinout, Amplifier_Total_Output_Power, Idle_Current, Max_Long_Term_Continuous_Current, Burst_Current, Max_Instantaneous_Peak_Current, Inrush_Current, Idle_Power, Limiter_Indication, Cooling_Type, Network_Protocol, Device_Identification_Function, Network_Connectivity_LED, Service_Port_Type, Rigging_Components_Material, Finish_Type, IP_Rating(physical), Handles, Inter_Enclosure_Angles_deg, preset_guide_and_matching(전 항목), delay_defaults(전 항목), mechanical_safety(전 항목, Safety_Factor/Max_Wind_Load 포함), Remote_Mute_Control(OM 부재로 원격 뮤트 기능 자체가 재확인되지 않음) — 41건.
**비적용(USW-121P 아키텍처상 개념 자체 불성립)**: Compatible_Amplified_Controller, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, Dimensions_Raw, Nominal_Impedance_Overall, RMS_Power_Handling_Overall, Linear_Peak_SPL(AES75 채택 제품이라 상호 배타적 Key), Peak_Power_Handling_10ms_Overall(self-powered 구조상 Amplifier_Total_Output_Power로 보고) — 8건.

**총계**: null 49건 (미확인 41건 + 비적용 8건). 확정적 비존재(0/No)로 명시한 항목은 1건 — Passive_Crossover_Network(No). **v1.1(2026-07-19)**: speakers 카테고리 전체 일괄 동기화 라운드 — 신규 Key 2종(Peak_Power_Handling_10ms_Overall=비적용, Remote_Mute_Control=미확인) 반영, 총계 47건→49건.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — Meyer Sound 11번째 제품군(USW-121P) 최초 투입, 2100-LFC_v1.0.md를 스켈레톤으로 사용. USW-112P/112XP/210P와 달리 AES75/Neutrik TOP/AES67·SMPTE2110/TruPower limiting을 갖춘 PANTHER/TIGRA/2100-LFC 계열 아키텍처임을 확인 — 같은 브랜드 내 "USW-" 명명이 아키텍처 동일성을 보장하지 않음을 재확인. `upload/` 폴더 제공 Datasheet(SPS 4p)+Architectural Specification(AE 2p) 통합, **OM 없음** — 배선도 핀아웃/LED 상태/리깅 안전계수 등 다수 항목이 "OM 부재"를 명확한 사유로 미확인 처리됨. 신규 발견: 이 브랜드 최초의 "임베디드 Galileo GALAXY 채널" DSP 아키텍처(신규 Key `User_DSP_Module_Type`/`User_DSP_Onboard_Functions`, 동기화는 원본성 요건상 보류), Digital_Input_Format이 Milan AVB가 아닌 AES67/SMPTE2110, 측면(좌6/우4) 비대칭 리깅 포인트 배치, IP55가 OT(Outdoor Treatment) 옵션 버전에만 조건부 적용(기본 버전은 IP 등급 없음), 전면 그릴이 "optional"로 명시. Null Report 47건(미확인 40건+비적용 7건). |
| v1.1 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-19) — 신규 Key 2종 반영: Peak_Power_Handling_10ms_Overall(비적용, self-powered 구조), Remote_Mute_Control(미확인, OM 부재로 재확인 안 됨). Null Report 47건→49건(미확인 41+비적용 8). |
