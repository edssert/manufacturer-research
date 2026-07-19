# K1-SB (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 4 (K1/K2의 오랜 컴패니언 서브우퍼, 최초 독립 파일 투입)

**스켈레톤 근거**: `speakers/LA/KS28_v1.9.md`를 뼈대로 사용 — K1-SB는 KS28과 마찬가지로 LF 단일 대역(Way_Count=1) 패시브 서브우퍼이며, 모든 조합에서 항상 2차 엘리먼트(서브우퍼)로만 등장해 preset_guide_and_matching/delay_defaults가 자기 자신의 관점으로는 성립하지 않는 구조가 동일하다.

**원본 문서 특이사항 — 전용 OM 없음, K1 OM에 편입**: L-Acoustics 웹사이트에서 "K1-SB 오너 매뉴얼"을 다운로드하면 실제로는 `K1_OM_EN_4.0.pdf`가 내려받힌다. K1-SB는 별도 OM을 발간하지 않고 K1 OM에 시스템 구성요소로 편입되어 있다(K1 OM p.11 "System components > Loudspeaker enclosures"에 "K1-SB | K1 system subwoofer 2×15"" 항목으로 등재). K1 OM은 K1-SB 전용 스펙 표는 갖고 있지 않아, K1-SB 전용 A&E 시방서(K1-SB_AE_EN.docx)와 스펙시트(K1-SB_SP_EN_2.0.pdf, v2.0)를 주 출처로 삼고, K1/K2 자신의 파일에 이미 K1-SB 관점으로 기록되어 있는 조합 데이터(preset/delay/polarity)를 교차 참조했다.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | K1-SB | - |
| Model_Number | null | - |
| Product_Series | K Series | - |
| Product_Category | large format low-end extension | - |
| Product_Type | Subwoofer | - |
| Description | Flyable large format low-end extension, 2 x 15" high-excursion transducers in bass-reflex enclosure with laminar vents; passive, exclusively driven and amplified by the LA8 controller with dedicated CONTOUR/THROW factory presets; recommended subwoofer complement for K1 or K2 line sources | - |
| Way_Count | 1 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | null | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: K1-SB_AE_EN.docx(A&E 시방서, 동일 폴더에 원본 보관); K1-SB_SP_EN_2.0.pdf(스펙시트 v2.0); K1_OM_EN_4.0.pdf p.11 "System components".
**Product_Series="K Series"**: K1-SB_AE_EN.docx 문서 헤더 텍스트에서 "K Series" 태그를 확인 — K1/K2/K3 등 K 시리즈 전 제품과 동일 계열 태그.
**Description — LA8 단독 구동 서술**: K1-SB_SP_EN_2.0.pdf "The K1-SB is exclusively driven and amplified by the LA8 controller... including dedicated factory presets for the CONTOUR and THROW configurations."

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | 30 - 80 | Hz |
| Frequency_Response_6dB_Hz | 35 - 70 | Hz |
| Frequency_Response_3dB_Hz | 38 - 61 | Hz |
| Max_SPL_Peak | 145 | dB |
| Nominal_Directivity_Horizontal_deg | null | deg |
| Nominal_Directivity_Vertical | null | - |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | K1SB_60 (CONTOUR); K1SB_X (THROW, with K1); K1SB_X K2 (THROW, with K2); K1SB_100_NC (noise control, behind configuration) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: K1-SB_AE_EN.docx "Technical requirements"; K1-SB_SP_EN_2.0.pdf 스펙 표; K1_v1.13.md/K2_v1.7.md의 preset_guide_and_matching·delay_defaults(프리셋명 교차 확인).
**Usable_Bandwidth_Hz(-10dB)/Frequency_Response_6dB/3dB_Hz**: AE "Usable bandwidth: 30 Hz - 80 Hz (-10 dB), 35 Hz - 70 Hz (-6 dB), 38 Hz - 61 Hz (-3 dB)" 채택.
**Max_SPL_Peak 소스 간 충돌**: K1-SB_SP_EN_2.0.pdf "145 dB ([K1SB_X] preset)" vs K1-SB_AE_EN.docx "141 dB" — 145dB(SP)를 대표값으로 채택(프리셋 조건까지 명시해 더 구체적), AE의 141dB는 병기 보존. **이 저장소의 data.js는 이미 프리셋별로 세분화되어 있어([K1SB_60] 141dB, [K1SB_100_NC] 142dB, [K1SB_X] 145dB 모두 반영) 수정하지 않았다.**
**Cardioid_Capability=No(확정적 비존재)**: K1-SB_AE_EN.docx/K1-SB_SP_EN_2.0.pdf 전량을 "cardioid" 키워드로 스캔 — 0건 검출. AE는 오히려 "Omni configuration"을 헤더 태그로 명시하고 "Enclosure directivity: omnidirectional"로 직접 확정.
**DSP_Preset_Name — 복수 프리셋**: K1_v1.13.md/K2_v1.7.md의 preset_guide_and_matching 표에서 [K1SB_X]([K1] 편입/서브우퍼용), [K1SB_X K2](K2와 조합 시), [K1SB_60](서브우퍼/베사이드/비하인드 조합), [K1SB_100_NC](비하인드 노이즈 컨트롤 조합) 4개 프리셋명을 교차 확인.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 2 x 15" neodymium, weather-resistant, direct-radiating, 4" coil, magnesium die-cast basket | - |
| LF_Acoustical_Load | bass-reflex, laminar vents | - |
| Passive_Crossover_Network | No | - |
| LF_Nominal_Impedance | 4 | Ohm |
| Nominal_Impedance_Overall | null | Ohm |
| RMS_Power_Handling_LF | 1200 | W |
| RMS_Power_Handling_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: K1-SB_SP_EN_2.0.pdf 스펙 표; K1-SB_AE_EN.docx "Acoustics"/"Transducers".
**RMS_Power_Handling_LF 소스 간 충돌**: SP "1200 W"를 대표값으로 채택. AE는 "930 W (calculated using the mean impedance measured on the usable bandwidth)"로 다른 값을 제공 — 산출 근거를 밝힌 유일한 소스이나, 대표값 선정 기준(더 상세한 스펙시트 우선)에 따라 SP값을 채택하고 AE값을 각주로 보존. **이 저장소의 data.js(watt: 930)는 AE 값을 그대로 유지 — SP/AE 어느 쪽이 최신판인지 판단할 근거가 없어 이번 라운드에서는 수정하지 않았다(추가 확인 필요 시 재검토).**
**Passive_Crossover_Network=No**: 전량 "crossover" 키워드 스캔 — 0건 검출.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 4-point speakON | - |
| Link_Connector | null | - |
| SpeakON_Pinout_1 | null | - |
| SpeakON_Pinout_2 | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: K1-SB_SP_EN_2.0.pdf "Connectors: IN: 1 x 4-point SpeakON®"; K1-SB_AE_EN.docx "Connectors: IN: 1 x 4-point speakON".
**SpeakON_Pinout_1/2=null(미확인)**: K1-SB 자신의 두 소스(AE/SP)에는 핀 단위 극성/신호 배정 서술이 없다.

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA8 | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type | Passive (1-way, subwoofer) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: K1-SB_SP_EN_2.0.pdf "The K1-SB is exclusively driven and amplified by the LA8 controller."; K1_OM_EN_4.0.pdf p.11 "System components > Powering and driving system".
**Compatible_Amplified_Controller="LA8" — K1 OM 시스템 구성요소 표와의 불일치**: K1-SB_SP_EN_2.0.pdf는 LA8 단독 구동을 명시적으로 확정하나, K1_OM_EN_4.0.pdf p.11 "Powering and driving system" 절에는 LA12X만 등재되어 있고 LA8은 언급되지 않는다. 어느 쪽이 최신인지 판단할 근거가 없어 SP의 명시적 서술(LA8)을 채택하되, 이 불일치를 그대로 기록한다. **이 저장소의 data.js(amps: LA12X 1/4, 프리셋별 SPL 141/142/145dB)는 K1 OM의 시스템 구성요소 표 및 프리셋별 SPL 실측값과 일치해 이번 라운드에서는 수정하지 않았다 — LA8 전용이라는 SP 서술은 이 각주로만 보존.**
**Crossover_Type="Passive"**: K1-SB_AE_EN.docx "Description: Passive large format low-end extension..."로 제품 스스로 "Passive"를 명시.

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | four-point flush-fitting hardware, integrated captive rigging system (K1-BUMP structure for flying/stacking) | - |
| Inter_Enclosure_Angles_deg | 0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5 | deg |
| Handles | 4 | count |
| Weight_Net | 83 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: K1-SB_AE_EN.docx; K1-SB_SP_EN_2.0.pdf; K1_OM_EN_4.0.pdf p.11 "Rigging elements: K1-BUMP — Structure for flying and stacking K1 and K1-SB arrays".
**Inter_Enclosure_Angles_deg**: K1 자신과 완전히 동일한 각도 목록.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 1342 | mm |
| Height_mm | 438 | mm |
| Depth_mm | 520 | mm |
| Cabinet_Material | premium grade Baltic birch plywood | - |
| Front_Material | steel grill with anti-corrosion coating, Airnet acoustically neutral fabric | - |
| Rigging_Components_Material | high strength steel with anti-corrosion coating | - |
| Finish_Color | dark grey brown Pantone 426 C | - |
| IP_Rating | IP45 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: K1-SB_AE_EN.docx "Physical data: Dimensions (W, H, D): 1342 mm, 438 mm, 520 mm"; 이 저장소에 기존 보관된 K1-SB 스펙시트 발췌본(동일 치수 438/520mm 재확인).
**Height_mm/Depth_mm — upload 마스터 스키마와의 차이**: `upload/K1-SB_v1.0.md`는 K1-SB_SP_EN_2.0.pdf 도면 판독 결과로 Height=505mm/Depth=434mm를 제시하나, 이 저장소에 이미 보관되어 있던 스펙시트 발췌 텍스트(사용자 제공)는 AE와 동일하게 438mm/520mm를 명시한다 — 즉 두 개의 독립 소스(AE + 이 저장소의 기존 스펙시트 발췌)가 438/520로 일치하고, upload 마스터 스키마의 도면 판독(505/434)만 다르다. 우열을 가리기 어려워 **이번 라운드에서는 기존 값(438/520)을 유지**하고 이 불일치만 기록한다 — 추후 원본 PDF 도면을 직접 재확인하면 정정이 필요할 수 있다.
**IP_Rating**: 모든 소스 "IP45"로 일치.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| null | null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: KS28과 동일한 구조적 이유 — K1-SB는 K1/K2와의 모든 조합에서 예외 없이 2차 엘리먼트(서브우퍼)로만 등장한다(K1_v1.13.md/K2_v1.7.md의 preset_guide_and_matching 표에 K1+K1-SB/K2+K1-SB 조합이 K1/K2 자신의 관점으로 이미 전부 기록되어 있음). K1-SB 자신의 두 소스(AE/SP)에도 이런 표는 없다.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: KS28과 동일 — K1-SB는 K1/K2 조합 전체에서 예외 없이 2차 엘리먼트로만 등장. 실제 조합별 지연값은 K1_v1.13.md/K2_v1.7.md 자신의 delay_defaults 표에 K1-SB를 Secondary_Element_Delay_ms로 이미 전부 기록되어 있다([K1SB_X]/[K1SB_60] 조합에서 정상 극성(+), [K1SB_100_NC]에서 반전(-)).

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| flown | K1-BUMP | 20 | 24 |
| flown, with LA-RAK II AVB | K1-BUMP | 18 K1-SB + 3 LA-RAK II AVB | 24 K1-SB + 4 LA-RAK II AVB |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 4:1 | - |
| Max_Wind_Load | 6 | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: K1_OM_EN_4.0.pdf p.31 "Mechanical safety > Flown configurations" K1-SB 표(페이지 이미지 렌더링으로 육안 확인); p.11 "Rigging elements: K1-BUMP".
**Safe_Limit/Maximum_Limit**: K1(16/24, LA-RAK II AVB 조합 시 14+3/23+4)보다 safe limit이 더 높다(20 vs 16) — 서브우퍼 단일대역 구조가 3-way K1보다 구조적으로 더 가벼운 안전 마진을 허용하는 것으로 추정되나 원문에 이유 서술은 없다.
**Safety_Factor=4:1/Max_Wind_Load=6 Beaufort**: K1 OM 전체(K1-SB 포함)에 적용되는 공통 서술 — K1 자신의 값과 동일 근거.

## Null Report

**미확인**: Model_Number, Compliance_Standards, WEEE_Marking, Frequency_Response_5/4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, Nominal_Directivity_Horizontal_deg, Nominal_Directivity_Vertical, Nominal_Impedance_Overall, SpeakON_Pinout_1, SpeakON_Pinout_2, Max_Enclosures_Per_Controller_Output/Total, preset_guide_and_matching, delay_defaults — 16건.
**비적용**: RMS_Power_Handling_Overall, Peak_Power_Handling_10ms_Overall, Link_Connector — 3건.

**총계**: null 19건(미확인 16건 + 비적용 3건). 확정적 비존재(No): Passive_Crossover_Network, Cardioid_Capability — 2건.

---

**[MR_v1.8 반영 메모]**: 이 파일은 `upload/K1-SB_v1.0.md`를 이 저장소의 raw-spec으로 이관한 것이다(기존 원본 docx는 그대로 유지). `public/js/domains/speakers/data/la/k-series.data.js`에 Cardioid_Capability/Mechanical Safety를 신규 반영했다. **수정하지 않은 항목(소스 충돌, 불확실)**: Max_SPL_Peak(145 vs 141, 기존 데이터가 이미 프리셋별로 세분화되어 있어 그대로 둠), RMS_Power_Handling_LF(1200 vs 930, 기존 값 930 유지), Compatible_Amplified_Controller(LA8 vs LA12X, 기존 값 LA12X 유지 — K1 OM 시스템 구성요소 표 및 실측 SPL과 일치), Height/Depth_mm(505/434 vs 438/520, 기존 값 438/520 유지 — 이 저장소에 이미 있던 별도 소스도 438/520과 일치해 도면 판독 결과와 다른 두 독립 소스 쪽을 신뢰).
