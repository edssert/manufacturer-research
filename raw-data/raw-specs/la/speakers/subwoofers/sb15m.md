# SB15m (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1 (동일 브랜드 이기종 — 기존 서브우퍼 계열에 신규 제품 투입)

**스켈레톤 근거**: `speakers/LA/KS28_v1.5.md`를 뼈대로 사용 — SB15m은 KS28/KS21과 마찬가지로 단일 대역 LF 전용 서브우퍼(Way_Count=1, MF/HF 대역 없음), speakON 커넥터, 외부 앰프(LA4X/LA8/LA12X)로 구동되는 패시브 인클로저 아키텍처를 가진다. KS28/KS21 대비 실제로 다른 점: (1) LINK 커넥터가 실제로 신호를 전달하는 기능성 커넥터(LA8 사용 시 병렬 연결 가능), (2) 컨트롤러별 연결 가능 대수 상한이 원문에 명시, (3) 준수 규격이 "2006/42/EC Machinery Directive"가 아니라 BGV-C1(2012)/DIN 18800/EN ISO 12100-1(2004) 조합, (4) LA2Xi 호환성 없음(LA4/LA4X/LA8/LA12X만 해당).

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | SB15m | - |
| Model_Number | null | - |
| Product_Series | null | - |
| Product_Category | High-power subwoofer | - |
| Product_Type | Subwoofer | - |
| Description | Ultra-compact passive subwoofer: 1 x 15" high excursion cone driver in bass-reflex tuned enclosure with laminar vents, amplified by LA4X / LA8 / LA12X | - |
| Way_Count | 1 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | BGV-C1 (2012), DIN 18800, EN ISO 12100-1 (2004) | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB15m_UM_EN_4.1.pdf p.4 "SB15m subwoofer enclosure", p.5; SB15m_AE_EN.docx "Short description"/"Description"; SB15m_RM_EN_2.0.pdf(rigging manual) p.7 "2.1 Maximum configurations".
**Compliance_Standards**: SB15m_RM_EN_2.0.pdf p.7 "The SB15m rigging system complies with BGV-C1 (2012), DIN 18800 and EN ISO 12100-1 (2004)..." — K1~KS21 계열이 공통으로 명시하는 "2006/42/EC Machinery Directive"는 SB15m 문서 전량 스캔 결과 0건 검출.
**Product_Series/Product_Type**: SB15m_AE_EN.docx 최상단 헤더("SB15m - Subwoofer" / "15' Subwoofer") — Product_Type="Subwoofer" 채택, Product_Series는 null.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | 40 - 120 | Hz |
| Frequency_Response_6dB_Hz | 46 - 102 | Hz |
| Frequency_Response_3dB_Hz | 49 - 85 | Hz |
| Max_SPL_Peak | 137 | dB |
| Nominal_Directivity_Horizontal_deg | null | deg |
| Nominal_Directivity_Vertical | null | - |
| Cardioid_Capability | Array-based only (4대 어레이 중 1대 반전 배치 필요) | - |
| DSP_Preset_Name | SB15_100, SB15_100_C | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB15m_AE_EN.docx "Technical requirements"; SB15m_UM_EN_4.1.pdf p.14 "SPECIFICATIONS".
**Cardioid_Capability=Array-based only**: SB15m_UM_EN_4.1.pdf "2.2 Cardioid configuration"("The [SB15_100_C] preset features a 100 Hz upper frequency limit and delay settings optimized for cardioid SB15m arrays") — KS21/KS28과 동일 유형, 단 SB15m은 [SB15_100_Cx](반전 버전)는 원문에서 확인되지 않고 [SB15_100_C] 1종만 확인됨.
**Usable_Bandwidth_Hz/Frequency_Response_6dB/3dB_Hz**: UM은 "Low frequency limit (-10 dB): 40 Hz"만 명시하나 AE가 "40 Hz - 120 Hz (-10 dB), 46 Hz - 102 Hz (-6 dB), 49 Hz - 85 Hz (-3 dB)"로 전체 명시.
**Max_SPL_Peak**: UM(137 dB)과 AE(137 dB)가 정확히 일치.
**DSP_Preset_Name**: SB15m_UM_EN_4.1.pdf Appendix A "PRESET DESCRIPTION"에 [SB15_100]/[SB15_100_C] 2개 프리셋만 수록 — X8_v1.2.md/X12_v1.2.md의 delay_defaults 표에 등장하는 [SB15_100_Cx]는 SB15m 자신의 UM(버전 4.1)에는 없어 임의로 추가하지 않음(불일치 사항으로 보존).

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 1 x 15" weather-resistant cone driver | - |
| LF_Acoustical_Load | bass-reflex, laminar vents | - |
| Passive_Crossover_Network | No | - |
| LF_Nominal_Impedance | 8 | Ohm |
| Nominal_Impedance_Overall | null | Ohm |
| RMS_Power_Handling_LF | 600 | W |
| RMS_Power_Handling_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: SB15m_AE_EN.docx "Technical requirements"; SB15m_UM_EN_4.1.pdf p.14 "SPECIFICATIONS".
**RMS_Power_Handling_LF 소스 간 충돌**: UM 스펙 표는 "600 W"(반올림 추정), AE_EN.docx는 "608 W"(더 정밀한 계산값) — L-Acoustics 브랜드 OM(UM) 우선 원칙에 따라 600W를 대표값으로 채택.
**LF_Acoustical_Load="laminar vents"**: KS28/KS21/SB6i 등은 "L-Vents" 상표명을 사용하나, SB15m 자신의 문서는 이 상표명을 쓰지 않고 "laminar vents"로만 표현 — 원문 그대로 채택.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 4-point speakON (IN) | - |
| Link_Connector | 1 x 4-point speakON (LINK) | - |
| SpeakON_Pinout_1 | LF+ / LF- | - |
| SpeakON_Pinout_2 | Not used | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB15m_UM_EN_4.1.pdf p.9 "3.1 Connectors"; p.14 "SPECIFICATIONS"; SB15m_AE_EN.docx "Connectors: 2 x 4-point speakON".
**Link_Connector=실값(KS28/KS21과의 핵심 차이)**: "The IN connector allows receiving the audio signal and the LINK connector allows routing it to another SB15m enclosure in parallel" — 다만 "The SB15m connection in parallel is only possible with the LA8 amplified controller"라는 제약이 있음(LA4/LA4X에서는 병렬 연결 불가).

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA4X, LA8, LA12X | - |
| Max_Enclosures_Per_Controller_Output | LA4/LA4X: 1 / LA8: 2 | count |
| Max_Enclosures_Per_Controller_Total | LA4/LA4X: 4 / LA8: 6 | count |
| Crossover_Type | Active (1-way, subwoofer) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB15m_UM_EN_4.1.pdf p.14 "SPECIFICATIONS"; p.10 "3.2 Connection to LA4 / LA4X"; p.11 "3.3 Connection to LA8".
**Compatible_Amplified_Controller 문서 내 표기 불일치**: SPECIFICATIONS 섹션은 "LA4X / LA8 / LA12X"(LA4 제외)로 명시하나, p.5 표는 "LA4, LA4X, LA8, LA12X"(LA4 포함)로 서술 — SPECIFICATIONS 섹션을 대표값으로 채택, LA4 호환 가능성은 각주 보존. KS28/KS21과 달리 LA2Xi 호환성은 원문 어디에도 없음.
**Max_Enclosures_Per_Controller**: KS28/KS21/X8/X12 어디에도 없던 신규 데이터 — SB15m_UM_EN_4.1.pdf가 컨트롤러별 상한을 명시.

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | 2 x coupling bars (SB15MRIG, LOCKTAB-equipped, stored at handle position); KIBU-SB flying frame (with 2 x bow shackle WLL 1t or CLAMP250 truss clamp); integrated 35 mm pole-mount socket | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | 2 | count |
| Weight_Net | 36 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: SB15m_AE_EN.docx "Description"; SB15m_UM_EN_4.1.pdf p.14 "SPECIFICATIONS"; SB15m_RM_EN_2.0.pdf p.5 "1.2 Rigging elements"(SB15MRIG/KIBU-SB/CLAMP250 상세).

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 579 | mm |
| Height_mm | 439 | mm |
| Depth_mm | 520 | mm |
| Cabinet_Material | premium grade Baltic beech and birch plywood | - |
| Front_Material | steel grill with anti-corrosion coating, Airnet acoustically neutral fabric | - |
| Rigging_Components_Material | High strength steel with anti-corrosion coating | - |
| Finish_Color | dark grey brown Pantone 426 C, pure white RAL 9010, custom RAL code on special order | - |
| IP_Rating | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB15m_AE_EN.docx "Physical data"("Dimensions (W, H, D): 579 mm, 439 mm, 520 mm"); SB15m_UM_EN_4.1.pdf p.14 "SPECIFICATIONS".

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| SB15m standard configuration | [SB15_100] | 40 - 120 | null | null |
| SB15m cardioid configuration | [SB15_100_C] | 40 - 120 | null | null |

### 주석 및 출처 (Notes & Sources)

**출처**: SB15m_UM_EN_4.1.pdf p.7 "2.1 Standard configuration", p.8 "2.2 Cardioid configuration".
**Recommended_Ratio/Minimum_Line_Length 미확인 사유**: SB15m 자신의 UM/AE에는 KIVA/XT 등 상대 라인소스와의 매칭 비율이나 최소 라인 길이가 SB15m 관점으로 기록되어 있지 않다(실제 조합 데이터는 X8/X12 등 1차 엘리먼트 자신의 파일에 기록됨).
**최소 간격 규정**: "최대 인접 음향중심 간격 1.7 m(표준/카디오이드 공통)."

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: SB15m은 이 카테고리의 모든 조합(KIVA II, X8, X12 등)에서 예외 없이 2차 엘리먼트(서브우퍼)로만 등장한다 — 실제 조합별 지연값은 각 1차 엘리먼트 자신의 delay_defaults 표에 SB15m을 Secondary_Element_Delay_ms로 이미 기록되어 있다(예: X8 "[X8]+[SB15_100]": 2ms/SB15m=0/X8=+ SB15m=-).

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| ground-stacked | no rigging accessory | null | 8 |
| flown | KIBU-SB + bow shackle WLL 1t | null | 8 |
| flown | KIBU-SB + CLAMP250 | null | 6 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | null | - |
| Max_Wind_Load | 6 | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: SB15m_RM_EN_2.0.pdf p.7 "2.1 Maximum configurations", "2.2 Assessing mechanical safety"; p.3 안전 지침("If the wind force exceeds 6 bft (Beaufort scale)...").
**Maximum configurations 표**: 원문이 "Maximum / Safe limit" 구분 없이 단일 값(8/8/6)만 표기 — Safe_Limit은 null, Maximum_Limit에 원문 값 채택.
**Safety_Factor 미확인**: SB15m_RM_EN_2.0.pdf는 "The overall safety factor of a specific mechanical configuration always corresponds to the lowest safety factor among all the linking points"로 서술하며 SOUNDVISION을 통한 가변 계산을 요구할 뿐 고정 비율 숫자를 명시하지 않는다.

## Null Report

**미확인**: Model_Number, WEEE_Marking, Frequency_Response_5/4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, Nominal_Directivity_Horizontal_deg, Nominal_Directivity_Vertical, Nominal_Impedance_Overall, Inter_Enclosure_Angles_deg, preset_guide_and_matching(4건), delay_defaults, mechanical_safety(Safe_Limit 전 행), Safety_Factor — 17건.
**비적용**: RMS_Power_Handling_Overall, Peak_Power_Handling_10ms_Overall — 2건.

**총계**: null 19건(미확인 17건 + 비적용 2건). 확정적 비존재(No): Passive_Crossover_Network 1건.

---

**[MR_v1.8 반영 메모]**: 이 파일은 `upload/SB15m_v1.4.md`를 이 저장소의 raw-spec으로 이관한 것이다(기존 역재구성본을 대체, 원본 파일 자체는 없어 폴더화하지 않음). `public/js/domains/speakers/data/la/subwoofers.data.js`에 Cardioid_Capability/Preset Guide/Mechanical Safety를 신규 반영했다. 기존 필드(dims/freqs/watt 등)는 대조 후 이상 없음.
