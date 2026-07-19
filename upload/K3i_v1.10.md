# K3i (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1 (동일 브랜드 이기종, K3 대비)

**스켈레톤 근거**: `speakers/LA/K3_v1.0.md`를 뼈대로 사용 — K3i는 K3의 설치(install) 버전이며 음향 코어(대역폭/파워핸들링/Max SPL)는 K3와 동일하나, 커넥터가 speakON이 아닌 **2 x 4-point terminal blocks with push-in connection**이고 리깅 시스템이 설치용으로 단순화되어 있다(K3i 자신의 OM p.17-18, docx "Install-specific 2-way active enclosure" 확인).

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | K3i | - |
| Model_Number | null | - |
| Product_Series | K Series Install | - |
| Product_Category | long throw line source (install) | - |
| Product_Type | Variable Curvature Line Source | - |
| Description | Install-specific 2-way active enclosure with two weather-resistant premium 12 in transducers and one high-output 4 in diaphragm compression driver, user-adjustable horizontal directivity | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | 2006/42/EC Machinery Directive (rigging system, designed per BGV-C1 guidelines) | - |
| WEEE_Marking | Yes (EU) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: K3i_AE_EN.docx; K3i_OM_EN_3.1.pdf p.5-6("Safety > Instructions"; "This marking indicates that this product should not be disposed of with other household waste throughout the EU..." — K1/K3와 동일 WEEE 문구 원문 확인, 이전 버전 미확인을 재조사로 해소).
**Product_Series/Product_Type(신규 Key, 사용자 지시 2026-07-17, 2026-07-18 재정의)**: K3i_AE_EN.docx 최상단 헤더("K3i - Long throw line source" / "K Series Install" / "Incremental coverage with **variable** inter-element angles") — install 파생형은 "K Series"가 아닌 "K Series Install"로 별도 표기(K3의 "K Series"와 구분). Product_Type은 "variable inter-element angles"를 근거로 "Variable Curvature Line Source"로 재정의(사용자 지적 2026-07-18, 상세 근거는 K1_v1.10.md 참조).

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | 42 - 20000 | Hz |
| Frequency_Response_6dB_Hz | 46 - 20000 | Hz |
| Frequency_Response_3dB_Hz | 50 - 20000 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak | 143 | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| Max_SPL_Single_Module | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | 70/110 symmetric or 90 asymmetric | deg |
| Nominal_Directivity_Vertical | dependent upon the number of elements and the line source curvature | - |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | K3 70, K3 90, K3 110 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: K3i_AE_EN.docx "Technical requirements".
**음향 코어 동일성**: K3i의 대역폭/Max SPL/파워핸들링 수치가 K3와 완전히 동일(700W/130W/143dB) — 동일 트랜스듀서·앰프 세대를 공유하는 install 파생형으로 판단(원문에 직접적 "동일 코어" 서술은 없으나 수치 완전 일치로 추정, 각주로 명시).
**DSP_Preset_Name**: K3i OM에도 [K3 70]/[K3 90]/[K3 110] 프리셋명이 그대로 사용됨(별도 K3i 전용 프리셋명 없음).
**Cardioid_Capability=No(확정적 비존재)**: K3와 동일 사유(K3i_OM_EN_3.1.pdf 전량 스캔, 컴패니언 KS28 스펙 재수록·일반 반전 프리셋 안내뿐, K3i 자신의 속성 아님).
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 12" cone driver | - |
| HF_Transducer | 4" diaphragm compression driver | - |
| LF_Acoustical_Load | bass-reflex | - |
| HF_Acoustical_Load | null | - |
| Passive_Crossover_Network | No | - |
| LF_Nominal_Impedance | 8 | Ohm |
| Nominal_Impedance_Overall | null | Ohm |
| HF_Nominal_Impedance | 8 | Ohm |
| RMS_Power_Handling_LF | 700 | W |
| RMS_Power_Handling_HF | 130 | W |
| RMS_Power_Handling_Overall | null | W |
| Peak_Power_Handling_10ms_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: K3i_AE_EN.docx "Technical requirements".
**Passive_Crossover_Network=No**: K3와 동일 사유(2-way, K3i_OM_EN_3.1.pdf 전량 "crossover" 스캔 0건).
**Peak_Power_Handling_10ms_Overall(신규 Key)**: d&b CCL8에서 신설된 범용 Key — RMS_Power_Handling_Overall과 동일 사유로 비적용.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 2 x 4-point terminal blocks with push-in connection | - |
| Link_Connector | 2 x 4-point terminal blocks with push-in connection | - |
| Terminal_Block_Pinout_1 | LF+ / LF- | - |
| Terminal_Block_Pinout_2 | HF+ / HF- | - |

### 주석 및 출처 (Notes & Sources)

**출처**: K3i_OM_EN_3.1.pdf p.17 "Connectors"("Internal pinout for L-Acoustics 2-way active enclosures"); K3i_AE_EN.docx "Connectors: 2 x 4-point terminal blocks with push-in connection"(교차검증 일치).
**PA_COM_Pinout_*/SpeakON_Pinout_* 비적용 사유**: K3i는 터미널 블록 커넥터를 사용하며 PA-COM(K1/K2)이나 speakON(K3) 개념이 없음 — Terminal_Block_Pinout_1/2 신규 Key로 대체(K3의 SpeakON_Pinout_*과 동일 원칙, 타 파일에 강제 동기화하지 않음).

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA4X, LA8, LA12X | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type | Active (2-way) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: K3i_OM_EN_3.1.pdf p.723 부근 "K3i is driven by the LA4X / LA8 / LA12X amplified controllers" — K3와 동일 호환성.

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | simplified installation rigging with K3i-LINK(standard)/K3i-ENDLINK(end) rigging plates; 8x M8 inserts for flying/stacking, 2x M6 inserts for screen | - |
| Inter_Enclosure_Angles_deg | 0.25, 1, 2, 3, 4, 5, 7.5, 10 | deg |
| Handles | null | count |
| Weight_Net | 35 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: K3i_OM_EN_3.1.pdf p.17-18 "Rigging system description"; K3i_AE_EN.docx "Weight (net): 35 kg".
**Handles**: docx/OM에 핸들 개수 서술 없음(설치용 제품 특성상 핸들 대신 인서트 기반 취급으로 설계된 것으로 보이나, 명시적 서술 없어 임의 추정하지 않음) — 미확인.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 907 | mm |
| Height_mm | 357 | mm |
| Depth_mm | 429 | mm |
| Dimensions_Raw | null | mm |
| Cabinet_Material | premium grade Baltic birch plywood | - |
| Front_Material | coated steel grill, acoustically transparent fabric; optional acoustically transparent front screen | - |
| Rigging_Components_Material | null | - |
| Finish_Color | dark grey brown Pantone 426 C, pure white RAL 9010, custom RAL code on special order | - |
| IP_Rating | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: K3i_AE_EN.docx "Physical data".
**Finish_Color**: K3(단일 색상)와 달리 K3i는 설치 환경에 맞춘 3가지 옵션(표준 다크그레이, 화이트, 커스텀 RAL) — install 라인 특성 반영, 원문 그대로 병기.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| K3i line source | [K3 70] / [K3 90] / [K3 110] | 42 - 20000 | - | - |
| K3i + KS28 or KS21i | [K3 70/90/110] + [xxxx_60] | 25 - 20000 (KS28) / 29 - 20000 (KS21i) | 2 K3i : 1 KS28 / 3 K3i : 2 KS21i | - |
| K3i + Kara IIi downfill | [K3 70/90/110] + [KARAIIDOWNK3] | 42 - 20000 | - | - |

### 주석 및 출처 (Notes & Sources)

**출처**: K3i_OM_EN_3.1.pdf p.32-36 "Loudspeaker configurations" 전체(Line source / Line source with low-frequency element / Additional downfill element) 전량 조사(이전 버전의 "시간 제약상 미확보" 방치를 시정, SKILL v1.17). K3i는 K3와 달리 KS21이 아닌 **KS21i**(install 버전)와 짝을 이룸 — "Amplified controllers compatibility" 표에 LA2Xi/LA4X/LA8/LA12X별 KS28/KS21i 호환 여부가 별도로 명시됨(K3i-KS28 조합은 LA12X 전용).
**Kara IIi 다운필**: "Do not add any delay between the K3i and Kara IIi elements" 원문 명시 — delay_defaults에 반영하지 않음.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| [K3i] + [KS28_60] | 0.5 | KS28 = 0 | K3i = + / KS28 = − |
| [K3i] + [KS28_60_C] | 6 | KS28 = 0 | K3i = + / KS28 = − |
| [K3i] + [KS28_60_Cx] | 4 | KS28 = 0 | K3i = + / KS28 = − |
| [K3i] + [KS21i_60] | 0 | KS21i = 0 | K3i = + / KS21i = − |
| [K3i] + [KS21i_60_C] | 5.5 | KS21i = 0 | K3i = + / KS21i = − |
| [K3i] + [KS21i_60_Cx] | 5 | KS21i = 0 | K3i = + / KS21i = + |

### 주석 및 출처 (Notes & Sources)

**출처**: K3i_OM_EN_3.1.pdf p.35 "Pre-alignment delays"("K3 + KS28"/"K3 + KS21" 두 표) — 딜레이 수치는 텍스트로 확인, Polarity는 페이지 이미지 렌더링으로 회색 "+"/빨간 "-" 아이콘 전부 육안 확인(이전 "시간 제약상 미확보" 방치를 시정, SKILL v1.17).
**원문 라벨링 오류 정정**: 표 제목과 프리셋 표기가 "K3 + KS28"/"[K3]"/"KS21"로 되어 있으나, 이 챕터 나머지 본문은 전부 K3i/KS21i를 지칭하고("K3i line source with KS28 or KS21i", "K3i is driven by..." 등) 실제 앰프 호환성 표에도 KS21(non-i)이 아닌 KS21i만 등장 — X4r 사례와 동일한 K3 매뉴얼 복사·붙여넣기 라벨링 잔재로 판단해 K3i/KS21i로 정정 채택.
**[K3i]+[KS21i_60_Cx] 예외**: K3와 동일하게 이 조합만 KS21i 측 폴라리티가 정상(+)으로 렌더링 확인됨(다른 5개 조합은 서브우퍼 측이 전부 반전).

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| flown | K3i-BUMP + K3i-BAR + rigging plates | 12 | 24 |
| flown and pullback | K3i-RIGBAR x2 + rigging plates | 12 | 16 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 4:1 | - |
| Max_Wind_Load | 6 | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: K3i_OM_EN_3.1.pdf "Mechanical safety > Flown configurations"; Safety 섹션(Max_Wind_Load 원문 동일 "6 bft").
**범위 제한**: 천장 마운트(ceiling-mounted, 상한 3), Kara IIi 다운필 조합 등 추가 구성이 있으나 기본 플라잉 구성만 채택.

## Null Report

**미확인(정보 부족)**: Model_Number, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, HF_Acoustical_Load, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, Handles, Rigging_Components_Material, Dimensions_Raw(상위 호환) — 11건.
**비적용**: Nominal_Impedance_Overall/RMS_Power_Handling_Overall/Max_SPL_Single_Module(Kiva II/L2 투입으로 신설된 범용 Key — 단일 채널 패시브 아키텍처나 멀티모듈 구조에 적용되는 개념이며, K3i는 대역별 개별 임피던스·파워핸들링을 갖는 능동 구동 단일 모듈 구조라 해당 없음), Peak_Power_Handling_10ms_Overall(RMS_Power_Handling_Overall과 동일 사유) — 4건. (PA_COM_Pinout_*/SpeakON_Pinout_* 등 타 커넥터 고유 Key는 K3i 자신의 Terminal_Block_Pinout_*으로 이미 표현되어 애초에 생성하지 않음, null 목록에서 제외.)

**총계**: null 15건 (미확인 11건 + 비적용 4건). 확정적 비존재(0/No)로 명시한 항목은 1건 — Passive_Crossover_Network(No). **v1.8 정정(2026-07-18, 각주 버전 참조 최신성 감사에서 발견 — K1_v1.11.md와 동일 유형)**: 이전까지 이 총계 줄이 "Kiva II/L2 투입 이전 기준"에 머물러 있었고, 그로 인해 추가된 3건이 비적용 목록에 정식 반영되지 않은 채 각주 서술로만 존재해왔다 — 이번에 목록과 총계 모두 실제 상태(13건)로 정정했다. LC_Transducer/LC_Acoustical_Load/LC_Nominal_Impedance는 한때 동기화되어 있었으나 LC가 L2 라인 고유 설계 요소라는 사용자 지적(2026-07-17)에 따라 v1.4에서 삭제(SKILL v1.16). **v1.5에서 WEEE_Marking/preset_guide_and_matching/delay_defaults가 실값으로 채워지며 이전 미확인 목록에서 4개 항목(WEEE_Marking 1건 + 두 섹션 전체) 빠짐** — 이전 "시간 제약상" 사유는 SKILL v1.17 위반으로 판정되어 원본 재조사로 해소했다.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — speakers 카테고리 Phase 3-1(K3의 install 파생형). K3_v1.0.md를 스켈레톤으로 사용, K3i_AE_EN.docx + K3i_OM_EN_3.1.pdf 통합. 음향 코어는 K3와 완전 동일, 커넥터(터미널 블록)·리깅(설치용 단순화)·마감(화이트/커스텀 옵션)이 K3와 상이. 신규 Key(Terminal_Block_Pinout_1/2)는 SpeakON_Pinout_*과 동일 원칙으로 타 파일 비동기화. |
| v1.1 | Kiva II/L2(신규 제품) 투입으로 신설된 6개 Key(LC_Transducer, LC_Acoustical_Load, LC_Nominal_Impedance, Nominal_Impedance_Overall, RMS_Power_Handling_Overall, Max_SPL_Single_Module)를 이 제품에 비적용 null로 동기화 반영. |
| v1.4 | LC_Transducer/LC_Acoustical_Load/LC_Nominal_Impedance 삭제(사용자 피드백 2026-07-17) — LC는 L2 라인 고유의 물리적 설계 요소이지 업계 표준 대역 구분이 아니므로 v1.1의 범용 동기화 판단을 정정(SKILL v1.16). |

**참고(커넥터 핀아웃 Null Report 정확도)**: 위 총계는 이 파일이 처음 작성된 시점 기준이며, 이후 타 커넥터 모델 고유 Key(PA_COM_Pinout_*/SpeakON_Pinout_*/Terminal_Block_Pinout_* 중 이 제품 자신의 실제 커넥터가 아닌 것들)를 전부 삭제하는 후속 정리가 있었다(2026-07-17) — 삭제된 Key는 null 목록에도 더 이상 포함되지 않는다. 정확한 현재 Key 구성은 각 섹션 표를 직접 참조할 것.
| v1.2 | K3의 speakON 관련 커넥터 Key 삭제(사용자 피드백 2026-07-17) — 제품 자신의 실제 커넥터가 아닌 타 커넥터 모델(PA-COM/speakON/terminal block 등) 고유 핀아웃 Key를 null 목록에서도 완전히 제거. 이 제품의 실제 커넥터 핀아웃은 아래 표기된 자기 자신의 Key만으로 온전히 표현됨. |
| v1.3 | Null Report 산술 오류 정정 — 비적용 항목이 실제로는 7개(CUT_Mode_Available, HFC_Function_Settings, Coupling_Function_Range, MF_Transducer, MF_Acoustical_Load, MF_Nominal_Impedance, RMS_Power_Handling_MF)임에도 목록 자체 표기가 "8건", 총계 줄이 "11건"으로 서로 다르게 오기재되어 있던 것을 발견(2026-07-17 전수 감사)하고 7건으로 통일, 총계를 20건(13+7)으로 재계산. 데이터 자체(어느 Key가 null인지)는 변경 없음, 요약 산술만 정정. |
| v1.5 | "시간 제약상" 방치되어 있던 WEEE_Marking/preset_guide_and_matching/delay_defaults를 전면 재조사(SKILL v1.17 위반 시정) — WEEE_Marking은 OM p.5-6 Safety 섹션에서 K1/K3와 동일 문구 확인해 Yes(EU)로 확정. preset_guide_and_matching은 OM p.32-36 전체를 조사해 K3i 라인소스/KS28·KS21i 조합/Kara IIi 다운필 3개 구성 확보. delay_defaults는 OM p.35의 6개 조합을 확보하고 폴라리티는 페이지 이미지 렌더링으로 확인 — 원문 표 제목/프리셋 표기가 "K3"/"KS21"(i 접미사 누락)로 되어 있던 것을 K3 매뉴얼 복사 잔재로 판단해 K3i/KS21i로 정정(X4r 사례와 동일 유형의 라벨링 오류). delay_defaults 컬럼명 `K1_Delay_ms`를 `Primary_Element_Delay_ms`로 개명(SKILL v1.18). |
| v1.6 | MF_Transducer/MF_Acoustical_Load/MF_Nominal_Impedance/RMS_Power_Handling_MF 4개 Key 삭제(SKILL v1.19) — 이 제품은 확인된 2-way 구조라 MF 대역 드라이버 자체가 없으므로, null 동기화 대상이 아니라 삭제 대상으로 재분류(K1 v1.4의 기존 반대 판단을 뒤집는 정책 변경, GSL의 Front_LF_Transducer와 동일 원칙 적용). 검증 과정에서 v1.5부터 이어진 미확인 목록 산술 오류(실제 항목 10개인데 "9건"으로 표기)를 추가 발견해 정정(미확인 10건, 총계 13건). |
| v1.7 | Product_Series("K Series Install")/Product_Type 2개 Key 신규 반영(사용자 지시 2026-07-17, K3i_AE_EN.docx 헤더 근거 — install 파생형은 "K Series"가 아닌 "K Series Install"로 별도 표기. Product_Type은 "Variable Curvature Line Source"로 재정의, 근거는 K1_v1.10.md 참조). Cardioid_Capability=No 확정 반영 — K3와 동일 사유(K3i_OM_EN_3.1.pdf 전량 스캔, 컴패니언 KS28 스펙 재수록·일반 반전 프리셋 안내뿐, K3i 자신의 속성 아님). signal_processing 섹션(CUT_Mode_Available/HFC_Function_Settings/Coupling_Function_Range) 전체 삭제 — d&b 고유 개념 정리. 비적용 null 3건 -> 0건, 총계 13건 -> 10건으로 재계산. |
| v1.7 to v1.8 | (표기 정정, Minor) 각주 버전 참조 최신성 감사(2026-07-18)에서 Null Report 총계가 "Kiva II/L2 투입 이전 기준"에 머물러 있었고, Kiva II/L2 투입으로 추가된 3건(Nominal_Impedance_Overall/RMS_Power_Handling_Overall/Max_SPL_Single_Module)이 비적용 목록에 정식 반영되지 않은 채 각주 서술로만 존재해온 것을 발견(K1_v1.11.md와 동일 유형) — 비적용 목록에 3건을 정식 추가하고 총계를 10건에서 13건으로 정정했다. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다. |
| v1.10 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-18, d&b 대량 배치 완료 후) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래, 미확인), `Peak_Power_Handling_10ms_Overall`(d&b CCL8 유래, 비적용) 반영. Null Report 15건(미확인 11건+비적용 4건)으로 갱신. |
