# SB15m (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1 (동일 브랜드 이기종 — 기존 서브우퍼 계열에 신규 제품 투입)

**스켈레톤 근거**: `speakers/LA/KS28_v1.5.md`를 뼈대로 사용 — SB15m은 KS28/KS21과 마찬가지로 **단일 대역 LF 전용 서브우퍼**(Way_Count=1, HF 대역 없음), speakON 커넥터, 외부 앰프(LA4X/LA8/LA12X)로 구동되는 패시브 인클로저 아키텍처를 가진다. 아키텍처는 SB15m 자신의 SB15m_UM_EN_4.1.pdf/SB15m_AE_EN.docx/SB15m_RM_EN_2.0.pdf에서 독립 판정했다 — X8_v1.2.md/X12_v1.2.md가 SB15m을 컴패니언 서브우퍼로 참조하고 있었으나 그 파일들의 delay_defaults 각주만으로 아키텍처를 추정하지 않았다. KS28/KS21 대비 실제로 다른 점이 다수 확인됐다: (1) LINK 커넥터가 "Not linked"가 아니라 **실제로 신호를 전달하는 기능성 커넥터**(LA8 사용 시 병렬 연결 가능), (2) 컨트롤러별 **연결 가능 대수 상한이 원문에 명시**(LA4/LA4X: 출력당 1대, 최대 4대 / LA8: 출력당 2대, 최대 6대) — KS28/KS21/X8/X12 어디에도 없던 신규 확보 데이터, (3) 준수 규격이 "2006/42/EC Machinery Directive"가 아니라 **BGV-C1(2012)/DIN 18800/EN ISO 12100-1(2004)** 조합(SB15m_RM_EN_2.0.pdf 전문 스캔 결과 "2006/42/EC" 키워드 0건), (4) LA2Xi 호환성 없음(LA4/LA4X/LA8/LA12X만 해당, 문서 내에서도 구간별로 다르게 서술 — 각주 참조).

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
| Compliance_Standards [1] | BGV-C1 (2012), DIN 18800, EN ISO 12100-1 (2004) | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB15m_UM_EN_4.1.pdf(SB15m user manual EN version 4.1, `speakers/LA/Original_PDFs/SB15m/`) p.4 "SB15m subwoofer enclosure", p.5 "1.1 Loudspeaker enclosure"; SB15m_AE_EN.docx "Short description"/"Description"; SB15m_RM_EN_2.0.pdf(rigging manual EN version 2.0) p.7 "2.1 Maximum configurations".
**[1] Compliance_Standards**: SB15m_RM_EN_2.0.pdf p.7 "The SB15m rigging system complies with BGV-C1 (2012), DIN 18800 and EN ISO 12100-1 (2004) when the following vertical arrays are deployed." — K1~KS21 계열이 공통으로 명시하는 "2006/42/EC Machinery Directive"는 SB15m_UM_EN_4.1.pdf/SB15m_AE_EN.docx/SB15m_RM_EN_2.0.pdf 전문을 "2006/42" 키워드로 전량 스캔한 결과 0건 검출 — SB15m 자신의 문서는 이 표기를 쓰지 않으므로 임의로 통일하지 않고 RM에 실제 명시된 표기를 그대로 채택.
**Way_Count=1**: 서브우퍼는 LF 단일 대역만 재생 — KS28/KS21과 동일.
**Product_Series/Product_Type(신규 Key, 사용자 지시 2026-07-17)**: SB15m_AE_EN.docx 최상단 헤더("SB15m - Subwoofer" / "15' Subwoofer") — Product_Type="Subwoofer" 채택, 시리즈명 줄이 없어 Product_Series는 null.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz [1] | 40 - 120 | Hz |
| Frequency_Response_6dB_Hz [1] | 46 - 102 | Hz |
| Frequency_Response_3dB_Hz [1] | 49 - 85 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak [2] | 137 | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | null | deg |
| Nominal_Directivity_Vertical | null | - |
| Cardioid_Capability | Array-based only (4대 어레이 중 1대 반전 배치 필요) | - |
| DSP_Preset_Name | SB15_100, SB15_100_C | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB15m_AE_EN.docx "Technical requirements"; SB15m_UM_EN_4.1.pdf p.14 "SPECIFICATIONS".
**Cardioid_Capability=Array-based only**: SB15m_UM_EN_4.1.pdf "2.2 Cardioid configuration"("The cardioid configuration corresponds to the use of subwoofers as cardioid subwoofer arrays... The [SB15_100_C] preset features a 100 Hz upper frequency limit and delay settings optimized for cardioid SB15m arrays") — KS21/KS28과 동일 유형(4대 어레이 중 1대 반전 배치), 단 SB15m은 [SB15_100_Cx](반전 버전)는 원문에서 확인되지 않고 [SB15_100_C] 1종만 확인됨(KS21/SB18의 C/Cx 이원 구조와 다름 — 임의로 Cx를 추정 생성하지 않음, X8/X12 파일이 참조하는 [SB15_100_Cx]는 TODO.md에 별도 불일치 항목으로 이미 기록됨).
**[1] Usable_Bandwidth_Hz/Frequency_Response_6dB/3dB_Hz**: SB15m_UM_EN_4.1.pdf 스펙 표는 "Low frequency limit (-10 dB): 40 Hz ([SB15_100] preset)"만 명시하고 상한 및 6dB/3dB 임계값이 없으나, SB15m_AE_EN.docx가 "Usable bandwidth: 40 Hz - 120 Hz (-10 dB), 46 Hz - 102 Hz (-6 dB), 49 Hz - 85 Hz (-3 dB)"로 3개 dB 임계값 전체를 명시 — 하한(40Hz)은 UM/AE 양쪽 일치, 상한 및 6dB/3dB 값은 AE로 확보. 두 프리셋([SB15_100]/[SB15_100_C]) 모두 UM에서 동일하게 "LF extension (-10 dB): 40 Hz"로 명시되어 있어 이 대역폭 값은 두 프리셋에 공통 적용.
**[2] Max_SPL_Peak**: UM(137 dB, [SB15_100] preset)과 AE(137 dB Peak level at 1 m under half space conditions using pink noise with crest factor 4)가 정확히 일치 — 충돌 없음. 측정 조건: 1m, half space, crest factor 4 pink noise.
**Nominal_Directivity 미확인 사유**: AE "Enclosure directivity: standard or cardioid" — KS28/KS21과 동일하게 각도가 아닌 배치 모드(표준/카디오이드) 서술이라 Horizontal/Vertical deg Key로 표현되지 않음(완전한 미확인은 아니며, 정보 자체는 존재).
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.
**DSP_Preset_Name**: SB15m_UM_EN_4.1.pdf Appendix A "PRESET DESCRIPTION"에 [SB15_100]/[SB15_100_C] 2개 프리셋만 수록 — X8_v1.2.md/X12_v1.2.md의 delay_defaults 표에는 [SB15_100_Cx]라는 3번째 프리셋이 추가로 등장하나, SB15m 자신의 UM(버전 4.1, 2022-08-24)에는 이 프리셋이 전혀 언급되지 않음(전문 "Cx" 키워드 스캔 0건). X8/X12의 OM(버전 2.0)이 SB15m UM보다 더 최신 프리셋 라이브러리를 반영하고 있을 가능성이 있으나 SB15m 자신의 문서로는 확인 불가 — 이 파일에는 SB15m 자신의 원본에 실제 존재하는 2개 프리셋만 기재하고, [SB15_100_Cx]는 임의로 추가하지 않음(무결성 원칙).

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 1 x 15" weather-resistant cone driver | - |
| LF_Acoustical_Load | bass-reflex, laminar vents | - |
| Passive_Crossover_Network [1] | No | - |
| LF_Nominal_Impedance | 8 | Ohm |
| Nominal_Impedance_Overall | null | Ohm |
| RMS_Power_Handling_LF [2] | 600 | W |
| RMS_Power_Handling_Overall | null | W |
| Peak_Power_Handling_10ms_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: SB15m_AE_EN.docx "Technical requirements"; SB15m_UM_EN_4.1.pdf p.14 "SPECIFICATIONS".
**Peak_Power_Handling_10ms_Overall(신규 Key)**: d&b CCL8에서 신설된 범용 Key — RMS_Power_Handling_Overall과 동일 사유로 비적용.
**[1] Passive_Crossover_Network=No**: SB15m_UM_EN_4.1.pdf/SB15m_AE_EN.docx/SB15m_RM_EN_2.0.pdf 전문을 "crossover" 키워드로 전량 스캔 — 0건 검출(단일 대역 서브우퍼라 크로스오버 개념 자체가 구조적으로 불필요하다는 정황과도 일치, KS28/KS21과 동일 판단).
**[2] RMS_Power_Handling_LF 소스 간 충돌**: UM 스펙 표는 "RMS power handling: 600 W"(반올림된 값으로 추정)로 명시하는 반면, SB15m_AE_EN.docx는 "RMS power handling (Calculated using the mean impedance measured on the usable bandwidth): 608 W"로 더 정밀한 계산값을 제공 — 두 값 모두 보존, L-Acoustics 브랜드 OM(UM) 우선 원칙에 따라 600W를 대표값으로 채택하고 AE의 608W를 병기.
**LF_Transducer**: UM "Transducer: 1 x 15\" weather-resistant, bass-reflex"(트랜스듀서와 음향 부하를 한 필드에 결합 서술), AE "LF transducer: 15\" cone driver"(트랜스듀서만 별도 서술) — 두 소스를 종합해 "weather-resistant" 수식어(UM에만 등장하나 원문에 실제로 있는 수식어이므로 임의 추론 아님)를 유지하고, 음향 부하 서술은 LF_Acoustical_Load Key로 분리.
**LF_Acoustical_Load="laminar vents"**: KS28/KS21/SB6i/SB6r 등은 브랜드 상표명 "L-Vents"를 사용하나, SB15m 자신의 문서(UM/AE)는 이 상표명을 전혀 쓰지 않고 "laminar vents"(AE) / "vent features a progressive profile allowing laminar airflow"(UM 서술)로만 표현 — 원문 그대로 채택, "L-Vents"로 임의 통일하지 않음(전문 "L-Vents" 키워드 스캔 0건).

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 4-point speakON (IN) | - |
| Link_Connector [1] | 1 x 4-point speakON (LINK) | - |
| SpeakON_Pinout_1 | LF+ / LF- | - |
| SpeakON_Pinout_2 | Not used | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB15m_UM_EN_4.1.pdf p.9 "3.1 Connectors"("Internal pinout for L-ACOUSTICS subwoofer enclosures" 표); p.14 "SPECIFICATIONS"("Connectors: IN: 1 x 4-point SpeakON LINK: 1 x 4-point SpeakON"); SB15m_AE_EN.docx "Connectors: 2 x 4-point speakON"(교차검증 일치, IN+LINK 합산 2개).
**[1] Link_Connector=실값(KS28/KS21과의 핵심 차이)**: KS28/KS21은 LINK 커넥터가 스펙 표에 아예 등장하지 않거나("Not linked") 물리적으로 신호를 나르지 않는 반면, SB15m은 원문에 "The IN connector allows receiving the audio signal and the LINK connector allows routing it to another SB15m enclosure in parallel"로 명시되어 실제로 신호를 다음 SB15m 인클로저로 전달하는 기능성 커넥터다. 다만 "The SB15m connection in parallel is only possible with the LA8 amplified controller"라는 제약이 있음(LA4/LA4X에서는 병렬 연결 불가) — Link_Connector Key 자체는 실값으로 채우되 이 제약은 각주로 별도 보존.
**SpeakON_Pinout_2="Not used"**: 원문 표기가 KS28의 "Not linked"와 다르게 "Not used"(핀 2+/2-가 사용되지 않는다는 의미, 커넥터 자체가 링크 기능이 없다는 뜻이 아님) — SB15m은 IN/LINK 두 물리 커넥터가 모두 존재하고 각 커넥터 내부에서 1+/1-만 신호를 나르고 2+/2-는 미사용이라는 뜻으로, 원문 표현을 그대로 채택.

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller [1] | LA4X, LA8, LA12X | - |
| Max_Enclosures_Per_Controller_Output [2] | LA4/LA4X: 1 / LA8: 2 | count |
| Max_Enclosures_Per_Controller_Total [2] | LA4/LA4X: 4 / LA8: 6 | count |
| Crossover_Type | Active (1-way, subwoofer) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB15m_UM_EN_4.1.pdf p.14 "SPECIFICATIONS"("Description: Subwoofer enclosure, amplified by LA4X / LA8 / LA12X"); p.10 "3.2 Connection to LA4 / LA4X"; p.11 "3.3 Connection to LA8".
**[1] Compatible_Amplified_Controller 문서 내 표기 불일치**: SPECIFICATIONS 섹션(가장 상세하고 대표적인 위치)은 "amplified by LA4X / LA8 / LA12X"(LA4 제외)로 명시하나, p.5 "1.2 Powering and driving system" 표는 "LA4, LA4X, LA8, LA12X"(LA4 포함)로, p.4 도입부 서술은 "driven and amplified by the LA4X or the LA8 controller"(LA12X도 제외)로 각각 다르게 서술 — 세 곳 모두 다른 부분집합이다. L-Acoustics 브랜드 OM 우선 원칙 및 SPECIFICATIONS 섹션이 가장 공식적인 스펙 요약이라는 판단에 따라 "LA4X, LA8, LA12X"를 대표값으로 채택하고, p.5 표에 LA4(구형 컨트롤러)도 호환 가능하다고 명시된 사실은 각주로 보존(데이터 충돌 보존 원칙). KS28/KS21과 달리 LA2Xi 호환성은 원문 어디에도 없음(LA2Xi 키워드 스캔 0건).
**[2] Max_Enclosures_Per_Controller 신규 실값 확보**: KS28/KS21/X8/X12 어디에도 없던 신규 데이터 — SB15m_UM_EN_4.1.pdf가 "Maximum of 4 enclosures per LA4 / LA4X"("1 SB15m can be connected to each output channel")와 "Maximum of 6 enclosures per LA8"("LA8 can drive up to 2 SB15m per output, but no more than 6 per controller")로 컨트롤러별 상한을 명시 — 부하 임피던스 참고: LA4/LA4X는 8Ω(1대), LA8은 8Ω(1대)/4Ω(2대).

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type [1] | 2 x coupling bars (SB15MRIG, LOCKTAB-equipped, stored at handle position); KIBU-SB flying frame (with 2 x bow shackle WLL 1t or CLAMP250 truss clamp); integrated 35 mm pole-mount socket | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | 2 | count |
| Weight_Net | 36 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: SB15m_AE_EN.docx "Description"("two ergonomic handles and a 35mm pole-mount socket. Two coupling bars..."); SB15m_UM_EN_4.1.pdf p.14 "SPECIFICATIONS"("Rigging components: Integrated pole-mount socket / Coupling bars stored at handle position"); SB15m_RM_EN_2.0.pdf p.5 "1.2 Rigging elements"(SB15MRIG/KIBU-SB/CLAMP250 상세).
**[1] Rigging_System_Type 구성 요소**: SB15MRIG(SB15m 전용 커플링 바, LOCKTAB 잠금 탭 장착, SB15m 출하 시 동봉), KIBU-SB(KIVA와 SB15m를 라인 엘리먼트 또는 독립/혼합 어레이로 플라잉하기 위한 프레임, WLL 1t 보우 셰클 2개 동봉), CLAMP250(트러스 클램프, 셰클 대체 옵션) — RM p.5-11 종합.
**Weight_Net**: UM(36kg)과 AE(36kg) 일치, 충돌 없음.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 579 | mm |
| Height_mm | 439 | mm |
| Depth_mm | 520 | mm |
| Dimensions_Raw [1] | 579 / 439 / 520 | mm |
| Cabinet_Material [2] | premium grade Baltic beech and birch plywood | - |
| Front_Material [3] | steel grill with anti-corrosion coating, Airnet acoustically neutral fabric | - |
| Rigging_Components_Material | High strength steel with anti-corrosion coating | - |
| Finish_Color | dark grey brown Pantone 426 C, pure white RAL 9010, custom RAL code on special order | - |
| IP_Rating | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB15m_AE_EN.docx "Physical data"("Dimensions (W, H, D): 579 mm, 439 mm, 520 mm"); SB15m_UM_EN_4.1.pdf p.14 "SPECIFICATIONS"(치수 다이어그램 포함 표).
**[1] Dimensions_Raw**: SB15m_UM_EN_4.1.pdf p.14의 "Dimensions" 다이어그램은 텍스트 레이어(pdftotext -layout)에서 숫자 라벨이 추출되지 않음(래스터/도면 이미지로 내장된 것으로 추정) — SKILL의 PDF 이미지 분석 예외는 극성/위상 기호에 한정되므로 치수 숫자 확인을 위한 별도 이미지 렌더링은 수행하지 않았다. AE가 확정한 W/H/D 3개 숫자(579/439/520mm)만 Dimensions_Raw에 반영하고, KS28/X8/X12처럼 도면에서 추가로 발견되는 보조 치수는 이 제품에서는 확보하지 못했다(텍스트 레이어 부재로 미확인, 축 자체는 AE로 확정).
**[2] Cabinet_Material**: UM 스펙 표는 "Cabinet: Baltic birch plywood"(축약형)로, AE는 "premium grade Baltic beech and birch plywood"(상세형)로 서술 — 동일 사실의 서술 상세도 차이로 판단, AE의 상세 표현을 대표값으로 채택(KS28/KS21 등 타 제품과 동일 표현이기도 함).
**[3] Front_Material**: UM "Front: Steel grill with anti-corrosion coating / Airnet® acoustically neutral fabric"(상표명 Airnet 명시), AE "The transducer front is protected by a coated steel grill and an acoustically transparent fabric"(상표명 없이 "acoustically transparent"로 서술) — UM의 더 구체적인 서술(상표명 포함)을 대표값으로 채택, AE의 "acoustically transparent" 표현 차이를 각주로 보존.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| SB15m standard configuration | [SB15_100] | 40 - 120 | null | null |
| SB15m cardioid configuration | [SB15_100_C] | 40 - 120 | null | null |

### 주석 및 출처 (Notes & Sources)

**출처**: SB15m_UM_EN_4.1.pdf p.7 "2.1 Standard configuration", p.8 "2.2 Cardioid configuration"("The standard configuration corresponds to the use of subwoofers as single elements or as standard subwoofer arrays... omni-directional directivity pattern" / "The cardioid configuration corresponds to the use of subwoofers as cardioid subwoofer arrays... rear SPL rejection").
**Recommended_Ratio/Minimum_Line_Length 미확인 사유**: SB15m 자신의 UM/AE에는 KIVA/XT 등 상대 라인소스와의 매칭 비율이나 최소 라인 길이가 SB15m 관점으로 기록되어 있지 않다(KS28/KS21과 동일한 구조적 이유 — 실제 조합 데이터는 X8_v1.2.md/X12_v1.2.md 등 1차 엘리먼트 자신의 파일에 그 제품 관점으로 기록됨). 프리셋별 카디오이드 배열 내부 기본 파라미터(예: [SB15_100_C]에서 반전 엘리먼트가 OUT 1에 위치, 나머지는 Gain 0dB/Delay 0ms/Polarity +)는 UM Appendix A에 별도로 존재하나, 이는 SB15m 어레이 자체 내부 구성이지 "1차 엘리먼트+SB15m" 조합 데이터가 아니므로 이 표의 Configuration/Recommended_Ratio/Minimum_Line_Length 컬럼에 대응되지 않아 별도 Key 신설 없이 각주에만 기록.
**최소 간격 규정**: "Place the subwoofer enclosures side by side. If not possible, the maximum distance between two adjacent acoustic centers must be 1.7 m."(표준/카디오이드 공통) — Minimum_Line_Length 컬럼과 무관한 배치 간격 정보라 각주 보존(X8/X12와 동일 패턴).

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유(조사 완료 후 확정)**: KS28/KS21과 동일한 구조적 이유 — SB15m_UM_EN_4.1.pdf도 "When combining a line source with subwoofers, delays may have to be added to the presets. Refer to the PRESET GUIDE to obtain the pre-alignment delay values."로 별도 공용 문서를 참조하도록 명시하며, SB15m은 이 카테고리의 모든 조합(KIVA II, X8, X12 등)에서 예외 없이 2차 엘리먼트(서브우퍼)로만 등장한다 — SB15m 자신을 1차 엘리먼트로 하는 Primary_Element_Delay_ms 개념 자체가 원본에 존재하지 않는다. 실제 조합별 지연값은 각 1차 엘리먼트 자신의 delay_defaults 표에 SB15m을 Secondary_Element_Delay_ms로 이미 기록되어 있다 — X8_v1.2.md("[X8]+[SB15_100]": 2ms/SB15m=0/X8=+ SB15m=-, "[X8]+[SB15_100_C]": 5.7ms, "[X8]+[SB15_100_Cx]": 3.8ms, "[X8_MO]+[SB15_100]": 0ms/SB15m=3/양쪽 +), X12_v1.2.md("[X12]+[SB15_100]": 1.5ms, "[X12]+[SB15_100_C]": 5.1ms, "[X12]+[SB15_100_Cx]": 3ms, 전부 X12=+/SB15m=-).
**충돌 사항(X8/X12 파일과의 불일치, X8/X12 파일은 수정하지 않음)**: X8_v1.2.md/X12_v1.2.md의 delay_defaults 표는 [SB15_100_Cx]라는 프리셋을 포함하나, SB15m 자신의 UM(버전 4.1, 2022-08-24) Appendix A "PRESET DESCRIPTION"에는 [SB15_100]과 [SB15_100_C] 2개만 수록되어 있고 [SB15_100_Cx]는 전혀 언급되지 않는다(acoustical_performance 섹션 각주에서 상술). X8/X12의 OM은 버전 2.0으로 SB15m UM(4.1)보다 발행 시점이 더 최신일 가능성이 있으나, SB15m 자신의 문서만으로는 이 프리셋의 존재를 확인할 수 없다 — SB15m 자신의 원본을 근거로 하지 않는 한 X8/X12 파일을 수정하지 않으며(작업 지시 준수), 이 불일치는 향후 SB15m UM이 갱신되면 재검토가 필요하다.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| ground-stacked | no rigging accessory | null | 8 |
| flown | KIBU-SB + bow shackle WLL 1t | null | 8 |
| flown | KIBU-SB + CLAMP250 | null | 6 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor [1] | null | - |
| Max_Wind_Load | 6 | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: SB15m_RM_EN_2.0.pdf p.7 "2.1 Maximum configurations"(표), "2.2 Assessing mechanical safety"; p.3 안전 지침 12번("If the wind force exceeds 6 bft (Beaufort scale)...").
**Maximum configurations 표**: 원문이 "Maximum / Safe limit" 구분 없이 단일 값(8/8/6)만 표기 — KS28의 ground-stacked/stacked upright 처리와 동일하게 Safe_Limit은 null, Maximum_Limit에 원문 값 채택.
**[1] Safety_Factor 미확인(KS28/KS21과의 차이)**: KS28(5:1)/K1~Kiva II(4:1)는 원문에 고정 안전계수 숫자가 명시되나, SB15m_RM_EN_2.0.pdf는 "The overall safety factor of a specific mechanical configuration always corresponds to the lowest safety factor among all the linking points"로 서술하며 SOUNDVISION 소프트웨어를 통한 배열별 가변 계산을 요구할 뿐 고정 비율 숫자를 문서에 명시하지 않는다(전문 "safety factor" 키워드 전량 스캔 결과 숫자 비율 표기 0건) — KS28처럼 고정값으로 채택하지 않고 정직하게 미확인 처리.

## Null Report

**미확인(정보 부족)**: Model_Number, WEEE_Marking, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, Nominal_Directivity_Horizontal_deg, Nominal_Directivity_Vertical(실제로는 "standard or cardioid" 정보가 있으나 기존 Key 구조로 미표현), Nominal_Impedance_Overall, Inter_Enclosure_Angles_deg, preset_guide_and_matching(Recommended_Ratio/Minimum_Line_Length 전 2행 각 2열=4건), delay_defaults(SB15m은 모든 조합에서 2차 엘리먼트라 Primary_Element_Delay_ms 개념 자체가 성립하지 않음), mechanical_safety(Safe_Limit 전 행), Safety_Factor — 17건.
**비적용**: RMS_Power_Handling_Overall, Peak_Power_Handling_10ms_Overall — 2건. (PA_COM_Pinout_*/Terminal_Block_Pinout_* 등 타 커넥터 고유 Key는 SB15m 자신의 SpeakON_Pinout_*으로 이미 표현되어 애초에 생성하지 않음, null 목록에서 제외. Link_Connector는 KS28/KS21과 달리 SB15m 자신이 실제 기능 커넥터를 가지고 있어 실값으로 채워졌으므로 이 목록에서 제외. Max_Enclosures_Per_Controller_Output/Total도 원문에 실값이 있어 이 목록에서 제외.)

**총계**: null 19건 (미확인 17건 + 비적용 2건). 확정적 비존재(0/No)로 명시한 항목은 1건 — Passive_Crossover_Network(No, SB15m_UM_EN_4.1.pdf/SB15m_AE_EN.docx/SB15m_RM_EN_2.0.pdf 전문 "crossover" 키워드 전량 스캔 0건 근거). **v1.2 정정(2026-07-18, 각주 버전 참조 최신성 감사 중 발견)**: preset_guide_and_matching의 Recommended_Ratio/Minimum_Line_Length 미확인을 "전 행"이라는 서술로 뭉뚱그려 총계 산정 시 1건으로만 반영해온 결합형 불릿 오카운트(K1_v1.11.md/L2_v1.7.md와 동일 유형)를 발견 — 실제로는 2개 Configuration 행(standard/cardioid) × 2개 컬럼(Recommended_Ratio/Minimum_Line_Length) = 4개의 개별 null 셀이다. 미확인 13건→16건, 총계 14건→17건으로 재계산. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — speakers 카테고리(기존 서브우퍼 계열에 신규 제품 투입, X8/X12 파일에 컴패니언 서브우퍼로 이미 참조되어 있었으나 최초 파싱은 이번이 처음). KS28_v1.5.md를 스켈레톤으로 사용, SB15m_UM_EN_4.1.pdf(user manual) + SB15m_AE_EN.docx(A&E) + SB15m_RM_EN_2.0.pdf(rigging manual) 통합. KS28/KS21과 구분되는 신규 사실 확인: (1) 실제로 신호를 전달하는 기능성 LINK 커넥터(LA8 사용 시에만 병렬 연결 가능), (2) 컨트롤러별 연결 가능 대수 상한 실값 확보(LA4/LA4X 출력당 1대·최대 4대, LA8 출력당 2대·최대 6대), (3) 준수 규격이 2006/42/EC가 아닌 BGV-C1/DIN 18800/EN ISO 12100-1, (4) LA2Xi 비호환. RMS_Power_Handling_LF(UM 600W vs AE 608W)는 소스 간 충돌로 양쪽 보존. X8_v1.2.md/X12_v1.2.md의 delay_defaults가 참조하는 [SB15_100_Cx] 프리셋이 SB15m 자신의 UM(버전 4.1)에는 존재하지 않는 불일치를 발견 — SB15m 자신의 원본 근거가 없어 이 파일에는 추가하지 않았고, X8/X12 파일도 수정하지 않음(작업 지시 준수). |
| v1.1 | 프로젝트 전역 동기화 라운드(사용자 지시 2026-07-17). Product_Series(null)/Product_Type(Subwoofer) Key 신설 — SB15m_AE_EN.docx 최상단 헤더 기준, 시리즈명 줄이 없어 Product_Series는 null. Cardioid_Capability="Array-based only(4대 어레이 중 1대 반전 배치 필요)" 신설 — SB15m_UM_EN_4.1.pdf "2.2 Cardioid configuration"([SB15_100_C] 프리셋 확인) 근거, KS21/KS28과 동일 유형이나 [SB15_100_Cx](반전 버전)는 원문에서 확인되지 않아 임의로 생성하지 않음. d&b 고유 개념인 signal_processing 섹션(CUT_Mode_Available/HFC_Function_Settings/Coupling_Function_Range) 삭제 — L-Acoustics 제품에는 해당 개념 자체가 없어 비적용 표기에서 섹션 삭제로 정리. null 총계 17건(비적용 4건)에서 14건(비적용 1건)으로 갱신. |
| v1.1 to v1.2 | (표기 정정, Minor) 각주 버전 참조 최신성 감사(2026-07-18)에서 preset_guide_and_matching의 Recommended_Ratio/Minimum_Line_Length 미확인이 "전 행"이라는 서술로 뭉뚱그려져 실제로는 2개 Configuration 행×2개 컬럼=4개 셀인데도 총계 산정 시 1건으로만 반영되어 있던 결합형 불릿 오카운트를 발견·정정(K1_v1.11.md/L2_v1.7.md와 동일 유형). 미확인 13건→16건, 총계 14건→17건으로 재계산. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다. |
| v1.4 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-18, d&b 대량 배치 완료 후) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래, 미확인), `Peak_Power_Handling_10ms_Overall`(d&b CCL8 유래, 비적용) 반영. Null Report 19건(미확인 17건+비적용 2건)으로 갱신. |
