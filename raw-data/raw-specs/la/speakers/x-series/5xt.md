# 5XT (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(동일 브랜드 이기종 — X 시리즈/점음원)

**스켈레톤 근거**: 5XT는 X8과 마찬가지로 2-way 패시브 크로스오버(단일 speakON 채널, 통합값)를 가진 동축 점음원 스피커다. 차이점: (1) X8보다 한 단계 더 작은 정육면체 165×165×165mm 캐비닛(5" LF+1" HF), (2) speakON 외에 2x2-point screw terminal이 IN/LINK 겸용 대체 커넥터로 추가 제공, (3) 리깅 방식이 전용 ETR5 U-브라켓 1종(M6 인서트 2개)+마이크스탠드 인서트(3/8")뿐.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | 5XT | - |
| Product_Series | X Series | - |
| Product_Type | Short throw point source | - |
| Description | 2-way passive coaxial enclosure: 5" LF cone driver + 1" HF diaphragm, amplified by LA2Xi / LA4X / LA8 / LA12X | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | EN 62368-1:2014 | - |
| WEEE_Marking | null | - |

### 주석 및 출처

**출처**: 5XT_OM_EN_4.0.pdf p.39 "5XT specifications", p.13 "Mechanical safety"; 5XT_AE_EN.docx.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | [5XT]: 95 - 20000 | Hz |
| Frequency_Response_6dB_Hz | 105 - 20000 | Hz |
| Frequency_Response_3dB_Hz | 115 - 20000 | Hz |
| Max_SPL_Peak | 121 | dB |
| Nominal_Directivity_Horizontal_deg [1] | 110 (axisymmetric) | deg |
| Nominal_Directivity_Vertical [1] | 110 (axisymmetric) | deg |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | 5XT, 5XT_MO | - |

### 주석 및 출처

**출처**: 5XT_OM_EN_4.0.pdf p.6, p.39; 5XT_AE_EN.docx.
**[1] axisymmetric**: X8과 동일 사유 — 점음원 동축 드라이버 구조라 축대칭 단일값(110°).
**Cardioid_Capability=No(확정적 비존재)**: 전량 스캔 0건 — 컴패니언 서브우퍼(SB15m/SB10i) 자신의 카디오이드 언급뿐.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 1 x 5" cone driver | - |
| HF_Transducer | 1 x 1" diaphragm compression driver | - |
| LF_Acoustical_Load | bass-reflex | - |
| Passive_Crossover_Network | Yes | - |
| Nominal_Impedance_Overall | 16 | Ohm |
| RMS_Power_Handling_Overall | 66 | W |

### 주석 및 출처

**출처**: 5XT_OM_EN_4.0.pdf p.39; 5XT_AE_EN.docx(RMS_Power_Handling_Overall=66W은 AE에만 명시).
**Nominal_Impedance_Overall=16Ω**: X8(8Ω)/X15 HiQ와 다름 — 원문 그대로 채택.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 4-point speakON + 2-point screw terminal(IN/LINK 겸용, speakON과 병렬 배선) | - |
| Link_Connector | 1 x 4-point speakON + 2-point screw terminal | - |
| SpeakON_Pinout_1 | + / - (combined LF+HF signal) | - |
| SpeakON_Pinout_2 | Not linked | - |
| Screw_Terminal_Pinout | IN+ / IN- (IN과 LINK 겸용, speakON과 전기적으로 동일 신호를 병렬로 나름) | - |

### 주석 및 출처

**출처**: 5XT_OM_EN_4.0.pdf p.11 "Connectors"("two 4-point speakON connectors wired in parallel and 2 screw terminals... SpeakON connectors can be used interchangeably as IN or LINK connectors").
**Screw_Terminal_Pinout 신규 도입**: 5XT의 screw terminal은 2-point뿐이며 speakON 채널과 동일한 단일 신호(+/-)를 병렬로 나르는 대체 접속 수단.

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA2Xi, LA4X, LA8, LA12X | - |
| Max_Enclosures_Per_Controller_Output | LA2Xi=4(SE) / LA4X=4 / LA8=6 / LA12X=6 | count |
| Max_Enclosures_Per_Controller_Total | LA2Xi=16(SE) / LA4X=16 / LA8=24 / LA12X=24 | count |
| Crossover_Type | Passive (2-way) | - |

### 주석 및 출처

**출처**: 5XT_OM_EN_4.0.pdf p.27 "Enclosure drive capacity per amplified controller" 표.

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | 2 x M6 insert(측면, ETR5 U-브라켓 전용) + 1 x 3/8" insert(하단, 마이크스탠드용) | - |
| Handles | 0 | count |
| Weight_Net | 3.5 | kg |

### 주석 및 출처

**출처**: 5XT_OM_EN_4.0.pdf p.12 "Rigging system description"; p.39.
**Handles=0(확정적 비존재)**: 원문 전량 검색 결과 handle 서술 0건.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 165 | mm |
| Height_mm | 165 | mm |
| Depth_mm | 165 | mm |
| Cabinet_Material | premium grade Baltic birch plywood | - |
| Front_Material | steel with anti-corrosion coating | - |
| Finish_Color | dark grey brown Pantone 426 C, pure white RAL 9010, custom RAL code on special order | - |
| IP_Rating [1] | IP30 / IP54 (5XT-SEALPLATE 장착+하향 20°이상 틸트 시) | - |

### 주석 및 출처

**출처**: 5XT_AE_EN.docx; 5XT_OM_EN_4.0.pdf p.39.
**[1] IP_Rating**: 별매 5XT-SEALPLATE 장착 및 20°이상 하향 틸트 조건에서만 IP54.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| 5XT point source (단독) | [5XT] | 95 - 20000 | null | null |
| 5XT point source with SB15m | [5XT] + [SB15_100] | 40 - 20000 | 1 5XT : 1 SB15m | null |
| 5XT point source with SB10i | [5XT] + [SB10_100] | 27 - 20000 | 1 5XT : 1 SB10i | null |
| 5XT stage monitor (단독) | [5XT_MO] | 95 - 20000 | null | null |
| 5XT stage monitor with SB15m | [5XT_MO] + [SB15_100] | 40 - 20000 | 1 5XT : 1 SB15m | null |
| 5XT stage monitor with SB10i | [5XT_MO] + [SB10_100] | 27 - 20000 | 1 5XT : 1 SB10i | null |

### 주석 및 출처

**출처**: 5XT_OM_EN_4.0.pdf p.13-18 "Loudspeaker configurations".
**저지연 모니터 모드**: [5XT_MO] 프리셋은 3.84ms→1.18ms(LA8)/0.84ms(LA2Xi/LA4X/LA12X) 저지연 동작 모드 사용.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| [5XT] + [SB15_100] | 없음(No pre-alignment delay values required) | - | - |
| [5XT] + [SB10_100] | 0 | SB10i = 1.6 | 5XT = + / SB10i = − |
| [5XT_MO] + [SB15_100] | 0.2 | SB15m = 0 | 5XT = + / SB15m = + |
| [5XT_MO] + [SB10_100] | 0 | SB10i = 1.6 | 5XT = + / SB10i = − |

### 주석 및 출처

**출처**: 5XT_OM_EN_4.0.pdf p.14, 15, 17, 18 "Pre-alignment delays".
**SB10i 조합은 point source/stage monitor 공용**: 동일 딜레이값이 두 구성 모두에 적용.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| wall-mounted / ceiling-mounted | ETR5 | 1 | 1 |
| pole-mounted | microphone stand | 1 | 1 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 5:1 | - |
| Max_Wind_Load | 6 | Beaufort |

### 주석 및 출처

**출처**: 5XT_OM_EN_4.0.pdf p.13 "Mechanical safety".
**flown/ground-stacked 구성 없음**: 초소형 제품이라 원문에 없음.

## Null Report

**미확인**: Model_Number, WEEE_Marking, Frequency_Response_5dB/4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, Peak_Power_Handling_10ms_Overall, Inter_Enclosure_Angles_deg, Rigging_Components_Material, preset_guide_and_matching(8건).
**비적용**: HF_Acoustical_Load.

**[MR_v1.8 반영 메모]**: 이 파일은 `upload/5XT_v1.3.md`를 이 저장소의 raw-spec으로 이관한 것이다(기존 역재구성본을 대체). `public/js/domains/speakers/data/la/x-series.data.js`에 Cardioid_Capability/Preset Guide/Delay Defaults/Mechanical Safety를 신규 반영했다. 기존 필드는 대조 후 이상 없음.
