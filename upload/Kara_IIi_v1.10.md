# Kara IIi (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1 (동일 브랜드 이기종, Kara II 대비)

**스켈레톤 근거**: `speakers/LA/Kara_II_v1.0.md`를 뼈대로 사용 — Kara IIi는 Kara II의 설치(install) 버전(K3i가 K3의 install 버전인 것과 동일 패턴). 음향 코어 동일(280W/75W/142dB), 터미널 블록 커넥터, 설치용 단순화 리깅.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | Kara IIi | - |
| Model_Number | null | - |
| Product_Series | K Series Install | - |
| Product_Category | long throw line source (install) | - |
| Product_Type | Variable Curvature Line Source | - |
| Description | Install-specific 2-way active enclosure with two weather-resistant premium 8 in transducers and high-output 3 in diaphragm compression driver, user-adjustable horizontal directivity | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | 2006/42/EC Machinery Directive (rigging system, designed per BGV-C1 guidelines) | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Kara_IIi_AE_EN.docx; Kara_IIi_OM_EN_5.0.pdf(Kara IIi owner's manual EN version 5.0).
**Product_Series/Product_Type(신규 Key, 사용자 지시 2026-07-17, 2026-07-18 재정의)**: Kara_IIi_AE_EN.docx 최상단 헤더("Kara IIi - Long throw line source" / "K Series Install" / "Incremental coverage with **variable** inter-element angles"). Product_Type은 "variable inter-element angles"를 근거로 "Variable Curvature Line Source"로 재정의(사용자 지적 2026-07-18, 상세 근거는 K1_v1.10.md 참조).

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | 55 - 20000 | Hz |
| Frequency_Response_6dB_Hz | 63 - 20000 | Hz |
| Frequency_Response_3dB_Hz | 80 - 19000 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak | 142 | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| Max_SPL_Single_Module | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | 70/110 symmetric or 90 asymmetric (35/90) | deg |
| Nominal_Directivity_Vertical | dependent upon the number of elements and the line source curvature | - |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | KARA II 70, KARA II 90, KARA II 110 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Kara_IIi_AE_EN.docx "Technical requirements" — Kara II와 완전 동일 수치(음향 코어 공유).
**Cardioid_Capability=No(확정적 비존재)**: Kara_IIi_OM_EN_5.0.pdf 전량을 "cardioid" 키워드로 스캔 — Kara IIi 자신에 대한 언급 0건, 검출된 언급은 전부 컴패니언 서브우퍼(SB18 IIi, KS21i)의 반전 배치 프리셋/전용 액세서리(KARAIIi-TILT, SB18IIi-SCREEN) 안내뿐.
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 2 x 8" cone drivers | - |
| HF_Transducer | 3" diaphragm compression driver | - |
| LF_Acoustical_Load | bass-reflex | - |
| HF_Acoustical_Load | null | - |
| Passive_Crossover_Network | No | - |
| LF_Nominal_Impedance | 8 | Ohm |
| Nominal_Impedance_Overall | null | Ohm |
| HF_Nominal_Impedance | 8 | Ohm |
| RMS_Power_Handling_LF | 280 | W |
| RMS_Power_Handling_HF | 75 | W |
| RMS_Power_Handling_Overall | null | W |
| Peak_Power_Handling_10ms_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: Kara_IIi_AE_EN.docx "Technical requirements".
**Passive_Crossover_Network=No**: Kara_IIi_OM_EN_5.0.pdf 전문 "crossover" 키워드 전량 스캔 — 0건 검출.
**Peak_Power_Handling_10ms_Overall(신규 Key)**: d&b CCL8에서 신설된 범용 Key — RMS_Power_Handling_Overall과 동일 사유로 비적용.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 2 x 4-point terminal block with push-in connection | - |
| Link_Connector | 2 x 4-point terminal block with push-in connection | - |
| Terminal_Block_Pinout_1 | LF+ / LF- | - |
| Terminal_Block_Pinout_2 | HF+ / HF- | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Kara_IIi_OM_EN_5.0.pdf p.16 "Connectors" > "Internal pinout for L-Acoustics 2-way active enclosures"(자기 자신의 OM 원본 핀아웃 표를 직접 재조사해 독립 검증, SKILL v1.17 위반 시정 — 이전 버전의 "K3i와 동일 구조로 판단, 완전한 독립 검증 아님" 방치를 해소); Kara_IIi_AE_EN.docx "Connectors: 2 x 4-point terminal block with push-in connection"(교차검증 일치). OM 핀아웃 표는 "Terminal block points 1+/1-/2+/2-"에 "Transducer connectors LF+/LF-/HF+/HF-"를 매핑 — 결과적으로 K3i와 동일한 핀 배열이지만, 이번에는 Kara IIi 자신의 원본에서 독립적으로 확인한 값이다.

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA2Xi, LA4X, LA8, LA12X | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type | Active (2-way) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Kara_IIi_OM_EN_5.0.pdf "The Kara IIi enclosure is driven by the LA2Xi / LA4X / LA8 / LA12X amplified controllers"(2곳에서 반복 확인).
**Kara II 대비 확장된 호환성**: Kara II(LA4X/LA12X만)와 달리 Kara IIi는 LA2Xi/LA8도 호환 — install 라인이 투어링 라인보다 더 넓은 앰프 호환성을 갖는 사례(임의 추정 아님, 각 제품 자신의 원본에서 독립 확인).

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | simplified installation rigging with rigging plates; KARAIIi-BUMP main lifting accessory | - |
| Inter_Enclosure_Angles_deg | 0, 1, 2, 3, 4, 5, 7.5, 10 | deg |
| Handles | null | count |
| Weight_Net | 21 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: Kara_IIi_OM_EN_5.0.pdf "Mechanical safety" 절(리깅 액세서리명); Kara_IIi_AE_EN.docx "Weight (net): 21 kg"; Kara_IIi_OM_EN_5.0.pdf p.18 "With KARAIIi-LINK, the inter-element angle between two Kara IIi can be set to 0°, 1°, 2°, 3°, 4°, 5°, 7.5° or 10°."(v1.5, 원본 재조사로 확보 — Kara II와 동일 각도 세트, K3i(0.25° 최솟값)와는 상이).

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 701 | mm |
| Height_mm | 252 | mm |
| Depth_mm | 409 | mm |
| Dimensions_Raw | null | mm |
| Cabinet_Material | premium grade Baltic birch plywood | - |
| Front_Material | coated steel grill, acoustically transparent fabric; optional acoustically transparent front screen | - |
| Rigging_Components_Material | null | - |
| Finish_Color | dark grey brown Pantone 426 C, pure white RAL 9010, custom RAL code on special order | - |
| IP_Rating | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Kara_IIi_AE_EN.docx "Physical data".

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| Kara IIi line source (단독) | [KARA II 70] / [KARA II 90] / [KARA II 110] | 55 - 20000 | - | - |
| Coupled SB18 IIi or KS21i | [KARA II 70/90/110] + [xxxx_100] | 32 (SB18 IIi) / 31 (KS21i) - 20000 | 3 Kara IIi : 1 SB18 IIi or KS21i | 9 Kara IIi + 3 SB18 IIi |
| Separated SB18 IIi or KS21i | [KARA II 70/90/110] + [xxxx_60] | 32 (SB18 IIi) / 29 (KS21i) - 20000 | 3 Kara IIi : 2 SB18 IIi or KS21i | - |
| Coupled SB18 IIi or KS21i with KS28 or SB28 | [KARA II 70/90/110] + [xxxx_100] + [xx28_60] | 25 - 20000 | 3 Kara IIi : 1 SB18 IIi or KS21i : 1 KS28 or SB28 | 9 Kara IIi + 3 SB18 IIi |
| Line source element (단독) | [KARA II_FI] | 85 - 20000 | - | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Kara_IIi_OM_EN_5.0.pdf p.38-46 "Loudspeaker configurations" 전체(Line source / Line source with low-frequency element(Coupled/Separated/Coupled with KS28 or SB28) / Line source element) 전량 조사(이전 버전의 "시간 제약상 미확보" 방치를 시정, SKILL v1.17).
**Kara II 대비 구성 수 차이**: Kara IIi의 OM에는 Kara II에 있던 "Line source element with LF element"와 "Stage monitor" 구성이 없다(전문 "stage monitor"/"_MO]" 키워드 전량 스캔 0건) — install 라인 특성상 스테이지 모니터 구성이 애초에 제공되지 않는 것으로 판단, 5개 구성만 채택.
**Kara IIi 대비 KS28/SB28 확장**: Kara II의 OM은 3중 조합에서 KS28만 제공했으나 Kara IIi는 KS28과 SB28 양쪽 모두 제공("Coupled SB18 IIi or KS21i with KS28 or SB28") — install 라인이 더 넓은 서브우퍼 조합 옵션을 갖는 사례.
**KS21i 비고**: 각주에 "KS21i cannot be mechanically coupled with a Kara IIi line source in an array — KS21i와 Kara IIi 어레이는 각각 독립적으로 플라잉해야 함" 명시.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| [Kara IIi] + [SB18 IIi_100] | 0 | SB18 IIi = 0 | Kara IIi = + / SB18 IIi = + |
| [Kara IIi] + [SB18 IIi_100_C] | 5.5 | SB18 IIi = 0 | Kara IIi = + / SB18 IIi = + |
| [Kara IIi] + [SB18 IIi_100_Cx] | 4 | SB18 IIi = 0 | Kara IIi = + / SB18 IIi = − |
| [Kara IIi] + [KS21i_100] | 0 | KS21i = 0.5 | Kara IIi = + / KS21i = + |
| [Kara IIi] + [KS21i_100_C] | 5 | KS21i = 0 | Kara IIi = + / KS21i = + |
| [Kara IIi] + [KS21i_100_Cx] | 4 | KS21i = 0 | Kara IIi = + / KS21i = − |
| [Kara IIi] + [SB18 IIi_60] | 2.5 | SB18 IIi = 0 | Kara IIi = + / SB18 IIi = + |
| [Kara IIi] + [SB18 IIi_60_C] | 8 | SB18 IIi = 0 | Kara IIi = + / SB18 IIi = + |
| [Kara IIi] + [SB18 IIi_60_Cx] | 6.5 | SB18 IIi = 0 | Kara IIi = + / SB18 IIi = − |
| [Kara IIi] + [KS21i_60] | 0.5 | KS21i = 0 | Kara IIi = + / KS21i = + |
| [Kara IIi] + [KS21i_60_C] | 6 | KS21i = 0 | Kara IIi = + / KS21i = + |
| [Kara IIi] + [KS21i_60_Cx] | 5.5 | KS21i = 0 | Kara IIi = + / KS21i = − |
| [Kara IIi] + [SB18 IIi_100] + [SB28_60] | 0 | SB18 IIi = 0 / SB28 = 5.5 | Kara IIi = + / SB18 IIi = + / SB28 = − |
| [Kara IIi] + [SB18 IIi_100] + [SB28_60_C] | 0 | SB18 IIi = 0 / SB28 = 0 | Kara IIi = + / SB18 IIi = + / SB28 = − |
| [Kara IIi] + [SB18 IIi_100] + [SB28_60_Cx] | 5.5 | SB18 IIi = 5.5 / SB28 = 0 | Kara IIi = + / SB18 IIi = + / SB28 = + |
| [Kara IIi] + [SB18 IIi_100] + [KS28_60] | 0 | SB18 IIi = 0 / KS28 = 5.5 | Kara IIi = + / SB18 IIi = + / KS28 = − |
| [Kara IIi] + [SB18 IIi_100] + [KS28_60_C] | 0 | SB18 IIi = 0 / KS28 = 0 | Kara IIi = + / SB18 IIi = + / KS28 = − |
| [Kara IIi] + [SB18 IIi_100] + [KS28_60_Cx] | 5.5 | SB18 IIi = 5.5 / KS28 = 0 | Kara IIi = + / SB18 IIi = + / KS28 = + |
| [Kara IIi] + [KS21i_100] + [SB28_60] | 0 | KS21i = 0.5 / SB28 = 5.5 | Kara IIi = + / KS21i = + / SB28 = − |
| [Kara IIi] + [KS21i_100] + [SB28_60_C] | 0 | KS21i = 0.5 / SB28 = 0 | Kara IIi = + / KS21i = + / SB28 = − |
| [Kara IIi] + [KS21i_100] + [SB28_60_Cx] | 5.5 | KS21i = 6 / SB28 = 0 | Kara IIi = + / KS21i = + / SB28 = + |
| [Kara IIi] + [KS21i_100] + [KS28_60] | 0 | KS21i = 0 / KS28 = 5.5 | Kara IIi = + / KS21i = + / KS28 = − |
| [Kara IIi] + [KS21i_100] + [KS28_60_C] | 0 | KS21i = 0.5 / KS28 = 0 | Kara IIi = + / KS21i = + / KS28 = − |
| [Kara IIi] + [KS21i_100] + [KS28_60_Cx] | 5.5 | KS21i = 6 / KS28 = 0 | Kara IIi = + / KS21i = + / KS28 = + |

### 주석 및 출처 (Notes & Sources)

**출처**: Kara_IIi_OM_EN_5.0.pdf p.41(Coupled SB18 IIi/KS21i), p.43(Separated SB18 IIi/KS21i), p.45(Coupled with KS28 or SB28) "Pre-alignment delays" 표 전체 24개 조합 — 딜레이 수치는 텍스트로 확인, Polarity는 3개 페이지 전부 PowerShell+Windows.Data.Pdf로 이미지 렌더링해 회색 "+"/빨간 "-" 아이콘을 전부 육안 확인(이전 "시간 제약상 미확보" 방치를 시정, SKILL v1.17).
**원문 라벨링 오류 정정**: 표 제목과 프리셋 표기가 "[KARA II]"/"SB18"/"KS21"(i 접미사 누락)로 되어 있으나, 이 챕터 나머지 본문(구성 설명, 앰프 호환성 표)은 전부 "Kara IIi"/"SB18 IIi"/"KS21i"를 지칭 — K3i/X4r 사례와 동일한 매뉴얼 복사·붙여넣기 라벨링 잔재로 판단해 Kara IIi/SB18 IIi/KS21i로 정정 채택. SB28/KS28은 원문에도 install 전용 "i" 변형명이 없어(본문에서도 "SB28"/"KS28" 그대로 지칭) 그대로 유지.
**Kara II와 수치 완전 일치**: 24개 조합의 딜레이 값·폴라리티가 Kara_II_v1.5.md의 delay_defaults와 전부 동일(음향 코어 및 프리셋을 공유하는 install 파생형이므로 예상된 결과) — 다만 Kara IIi 자신의 OM(p.41/43/45)에서 독립적으로 재확인했다.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| flown | KARAIIi-BUMP + M-BARi (optional) + rigging plates | 12 | 24 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 4:1 | - |
| Max_Wind_Load | 6 | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: Kara_IIi_OM_EN_5.0.pdf "Mechanical safety > Flown configurations"; Safety 섹션(Max_Wind_Load, "6 bft").
**범위 제한**: 풀백/천장마운트 등 추가 구성 있으나 기본 플라잉 구성만 채택.

## Null Report

**미확인(정보 부족)**: Model_Number, WEEE_Marking, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, HF_Acoustical_Load, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, Handles, Rigging_Components_Material, Dimensions_Raw(상위 호환) — 12건.
**비적용**: Nominal_Impedance_Overall/RMS_Power_Handling_Overall/Max_SPL_Single_Module(Kiva II/L2 투입으로 신설된 범용 Key — 단일 채널 패시브 아키텍처나 멀티모듈 구조에 적용되는 개념이며, Kara IIi는 대역별 개별 임피던스·파워핸들링을 갖는 능동 구동 단일 모듈 구조라 해당 없음), Peak_Power_Handling_10ms_Overall(RMS_Power_Handling_Overall과 동일 사유) — 4건. (PA_COM_Pinout_*/SpeakON_Pinout_* 등 타 커넥터 고유 Key는 Kara IIi 자신의 Terminal_Block_Pinout_*으로 이미 표현되어 애초에 생성하지 않음, null 목록에서 제외.)

**총계**: null 16건 (미확인 12건 + 비적용 4건). 확정적 비존재(0/No)로 명시한 항목은 1건 — Passive_Crossover_Network(No). **v1.8 정정(2026-07-18, 각주 버전 참조 최신성 감사에서 발견 — K1_v1.11.md와 동일 유형)**: 이전까지 이 총계 줄이 "Kiva II/L2 투입 이전 기준"에 머물러 있었고, 그로 인해 추가된 3건이 비적용 목록에 정식 반영되지 않은 채 각주 서술로만 존재해왔다 — 이번에 목록과 총계 모두 실제 상태(14건)로 정정했다. LC_Transducer/LC_Acoustical_Load/LC_Nominal_Impedance는 한때 동기화되어 있었으나 LC가 L2 라인 고유 설계 요소라는 사용자 지적(2026-07-17)에 따라 v1.4에서 삭제(SKILL v1.16). (v1.3: 비적용 항목 수 표기 오류 수정 — 목록에 나열된 실제 Key 7개와 불일치하던 "8건"/"11건" 표기를 목록과 일치하도록 정정, 총계 재계산.) **v1.5에서 Inter_Enclosure_Angles_deg/preset_guide_and_matching/delay_defaults가 실값으로 채워지며 이전 미확인 목록에서 3개 항목 빠짐** — 이전 "시간 제약상" 사유는 SKILL v1.17 위반으로 판정되어 원본 재조사로 해소했다. connectivity 섹션의 Terminal_Block_Pinout_1/2는 값 자체는 이전과 동일(LF+/-·HF+/-)하나 근거가 "K3i 참고 추정"에서 "Kara IIi 자신의 OM p.16 원본 재확인"으로 격상되어 null 건수에는 영향 없음.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — speakers 카테고리 Phase 3-1(Kara II의 install 파생형). Kara_II_v1.0.md를 스켈레톤으로 사용, Kara_IIi_AE_EN.docx + Kara_IIi_OM_EN_5.0.pdf 통합. Kara II 대비 확장된 앰프 호환성(LA2Xi/LA8 추가) 확인. |
| v1.1 | Kiva II/L2(신규 제품) 투입으로 신설된 6개 Key(LC_Transducer, LC_Acoustical_Load, LC_Nominal_Impedance, Nominal_Impedance_Overall, RMS_Power_Handling_Overall, Max_SPL_Single_Module)를 이 제품에 비적용 null로 동기화 반영. |
| v1.4 | LC_Transducer/LC_Acoustical_Load/LC_Nominal_Impedance 삭제(사용자 피드백 2026-07-17) — LC는 L2 라인 고유의 물리적 설계 요소이지 업계 표준 대역 구분이 아니므로 v1.1의 범용 동기화 판단을 정정(SKILL v1.16). |

**참고(커넥터 핀아웃 Null Report 정확도)**: 위 총계는 이 파일이 처음 작성된 시점 기준이며, 이후 타 커넥터 모델 고유 Key(PA_COM_Pinout_*/SpeakON_Pinout_*/Terminal_Block_Pinout_* 중 이 제품 자신의 실제 커넥터가 아닌 것들)를 전부 삭제하는 후속 정리가 있었다(2026-07-17) — 삭제된 Key는 null 목록에도 더 이상 포함되지 않는다. 정확한 현재 Key 구성은 각 섹션 표를 직접 참조할 것.
| v1.2 | K3의 PA-COM/speakON 커넥터 Key 삭제(사용자 피드백 2026-07-17) — 제품 자신의 실제 커넥터가 아닌 타 커넥터 모델(PA-COM/speakON/terminal block 등) 고유 핀아웃 Key를 null 목록에서도 완전히 제거. 이 제품의 실제 커넥터 핀아웃은 아래 표기된 자기 자신의 Key만으로 온전히 표현됨. |
| v1.3 | Null Report 산술 오류 정정 — 비적용 항목이 실제로는 7개(CUT_Mode_Available, HFC_Function_Settings, Coupling_Function_Range, MF_Transducer, MF_Acoustical_Load, MF_Nominal_Impedance, RMS_Power_Handling_MF)임에도 목록 자체 표기가 "8건", 총계 줄이 "11건"으로 서로 다르게 오기재되어 있던 것을 발견(2026-07-17 전수 감사)하고 7건으로 통일, 총계를 21건(14+7)으로 재계산. 데이터 자체(어느 Key가 null인지)는 변경 없음, 요약 산술만 정정. |
| v1.5 | "시간 제약상" 방치되어 있던 connectivity(Terminal_Block_Pinout_1/2 근거)/preset_guide_and_matching/delay_defaults를 전면 재조사(SKILL v1.17 위반 시정). Terminal_Block_Pinout_1/2는 OM p.16 "Internal pinout for L-Acoustics 2-way active enclosures" 표를 Kara IIi 자신의 원본에서 직접 확인 — 값(LF+/-·HF+/-)은 이전 K3i 참고 추정치와 동일하게 확정되었으나 근거가 독립 검증으로 격상됨. preset_guide_and_matching은 OM p.38-46 전체를 조사해 5개 구성(단독 라인소스/Coupled/Separated/Coupled+KS28 또는 SB28/엘리먼트 단독) 확보 — Kara II와 달리 스테이지 모니터·엘리먼트+LF 구성이 없음을 전문 검색으로 확인, 대신 3중 조합에서 KS28뿐 아니라 SB28도 지원. delay_defaults는 OM p.41/43/45 3개 페이지의 24개 조합 전부 확보, 폴라리티는 페이지 이미지 렌더링으로 확인 — Kara II의 24개 조합과 수치가 완전히 동일함을 재확인. 원문 표 제목/프리셋 표기가 "Kara II"/"SB18"/"KS21"(i 접미사 누락)로 되어 있던 것을 K3i/X4r 사례와 동일 유형의 매뉴얼 복사 잔재로 판단해 Kara IIi/SB18 IIi/KS21i로 정정(SB28/KS28은 원문에도 install 전용 변형명이 없어 그대로 유지). delay_defaults 컬럼명 `K1_Delay_ms`를 `Primary_Element_Delay_ms`로 개명(SKILL v1.18). 아울러 Inter_Enclosure_Angles_deg를 OM p.18("With KARAIIi-LINK, the inter-element angle... 0°, 1°, 2°, 3°, 4°, 5°, 7.5° or 10°")에서 확보(Kara II와 동일 각도 세트) — 이 Key는 원래 시간 제약상 문구가 없던 단순 미확인이었으나 delay_defaults 조사 과정에서 함께 발견되어 반영. |
| v1.6 | MF_Transducer/MF_Acoustical_Load/MF_Nominal_Impedance/RMS_Power_Handling_MF 4개 Key 삭제(SKILL v1.19) — 이 제품은 확인된 2-way 구조라 MF 대역 드라이버 자체가 없으므로, null 동기화 대상이 아니라 삭제 대상으로 재분류. 비적용 null 항목 7건 -> 3건, 총계 18건 -> 14건. |
| v1.7 | Product_Series("K Series Install")/Product_Type 2개 Key 신규 반영(사용자 지시 2026-07-17, Kara_IIi_AE_EN.docx 헤더 근거, Product_Type은 "Variable Curvature Line Source"로 재정의 — 근거는 K1_v1.10.md 참조). Cardioid_Capability=No 확정 반영 — Kara_IIi_OM_EN_5.0.pdf 전량을 "cardioid" 키워드로 스캔, Kara IIi 자신에 대한 언급 0건(컴패니언 서브우퍼 SB18 IIi/KS21i의 반전 배치 프리셋·전용 액세서리 KARAIIi-TILT/SB18IIi-SCREEN 안내뿐). signal_processing 섹션(CUT_Mode_Available/HFC_Function_Settings/Coupling_Function_Range) 전체 삭제 — d&b 고유 개념 정리. 비적용 null 3건 -> 0건, 총계 14건 -> 11건으로 재계산. |
| v1.7 to v1.8 | (표기 정정, Minor) 각주 버전 참조 최신성 감사(2026-07-18)에서 Null Report 총계가 "Kiva II/L2 투입 이전 기준"에 머물러 있었고, Kiva II/L2 투입으로 추가된 3건(Nominal_Impedance_Overall/RMS_Power_Handling_Overall/Max_SPL_Single_Module)이 비적용 목록에 정식 반영되지 않은 채 각주 서술로만 존재해온 것을 발견(K1_v1.11.md와 동일 유형) — 비적용 목록에 3건을 정식 추가하고 총계를 11건에서 14건으로 정정했다. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다. |
| v1.10 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-18, d&b 대량 배치 완료 후) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래, 미확인), `Peak_Power_Handling_10ms_Overall`(d&b CCL8 유래, 비적용) 반영. Null Report 16건(미확인 12건+비적용 4건)으로 갱신. |
