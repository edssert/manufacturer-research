# X4i (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(X6i/X8i와 동일 계열의 최소형 버전)

**스켈레톤 근거**: `speakers/LA/X6i_v1.0.md`를 뼈대로 사용 — X4i는 X6i/X8i와 같은 X 시리즈 설치형 2-way 패시브 동축 점음원이나 (1) **밀폐형(closed enclosure)** 음향 부하(X6i/X8i는 bass-reflex), (2) 임피던스 **16Ω**(X6i/X8i는 8Ω), (3) 커넥터가 terminal block(push-in)이 아닌 **screw terminal**(나사 단자), (4) 무대 모니터 틸트각 대신 별도 프리셋([X4_MO])만 존재(고정 틸트각 언급 없음), (5) 이중 프리셋명이 [X4i]/[X4i_XX]가 아닌 **[X4]/[X4_60]**(제품명 축약형)로 상이 — 아키텍처는 X4i 자신의 X4i_AE_EN.docx/X4i_OM_EN_6.0.pdf에서 독립 판정했다.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | X4i | - |
| Model_Number | null | - |
| Product_Series | X Series | - |
| Product_Category | short throw point source (installation version) | - |
| Product_Type | Short throw point source | - |
| Description | 2-way passive coaxial enclosure (installation version): 4" LF neodymium cone driver + 1.4" HF diaphragm compression driver, amplified by LA2Xi / LA4X / LA7.16i / LA12X | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | EN 62368-1:2014 Audio/video, information and communication technology equipment — Part 1: Safety requirements | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: X4i_AE_EN.docx; X4i_OM_EN_6.0.pdf(X4i owner's manual EN version 6.0) p.75 "X4i specifications", p.13 "Rigging system description".
**Product_Series/Product_Type(신규 Key, 사용자 지시 2026-07-17)**: X4i_AE_EN.docx 최상단 헤더("X4i - Short throw point source" / "X Series") — X6i/X8i는 동일 install 계열임에도 "Xi Series"로 표기되는 반면 X4i는 "X Series"(i 없음)로 표기됨, 원문 자체의 비일관성이나 임의로 통일하지 않고 그대로 채택.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz [1] | [X4_60]: 65 - 20000 / [X4]: 120 - 20000 | Hz |
| Frequency_Response_6dB_Hz [1] | [X4_60]: 77 - 20000 / [X4]: 145 - 20000 | Hz |
| Frequency_Response_3dB_Hz [1] | [X4_60]: 105 - 20000 / [X4]: 180 - 20000 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Max_SPL_Peak [1] | [X4]: 116 dB / [X4_60]: 110 dB | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | 110 (axisymmetric) | deg |
| Nominal_Directivity_Vertical | 110 (axisymmetric) | deg |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | X4, X4_60, X4_MO | - |
| Frequency_Response_4dB_Hz | null | Hz |

### 주석 및 출처 (Notes & Sources)

**출처**: X4i_AE_EN.docx "Technical requirements"; X4i_OM_EN_6.0.pdf p.75 "X4i specifications"("with preset [X4]"/"with preset [X4_60]" 표); p.25 "X4i point source"("[X4] preset ... Frequency range (-10 dB) 120 Hz").
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.
**[1] 프리셋-수치 짝짓기 소스 간 충돌**: X4i_AE_EN.docx는 "Preset 1: 65Hz(-10dB).../116dB"과 "Preset 2: 120Hz(-10dB).../110dB"로 서술하나, X4i_OM_EN_6.0.pdf의 스펙 표는 반대로 "[X4](120Hz)=116dB, [X4_60](65Hz)=110dB"로 짝지음 — 두 저역한계값(65Hz/120Hz)과 두 SPL값(116dB/110dB) 자체는 두 출처가 동일하게 제공하나 짝짓기가 반대다. L-Acoustics 브랜드 OM 우선 원칙(SKILL 출력 포맷 규칙 4)에 따라 OM의 짝짓기를 채택([X4]=120Hz/116dB, [X4_60]=65Hz/110dB) — 저역 확장이 적을수록(120Hz) SPL이 높다는 물리적 경향과도 정합. AE의 반대 짝짓기는 오기재로 추정되나 확정할 수 없어 이 각주에 병기.
**DSP_Preset_Name**: 다른 X 시리즈 제품과 달리 프리셋명이 "X4i"가 아닌 "X4"(제품명 축약형)로 표기됨 — 원문 그대로 채택. [X4_MO]는 무대 모니터용(p.31 근처, 저지연 프리셋) — X6i/X8i의 틸트각 기반 모니터 모드와 달리 X4i는 별도 고정 틸트각 서술 없이 프리셋 전환만으로 모니터 모드 지원.
**Cardioid_Capability=No(확정적 비존재)**: X4i_OM_EN_6.0.pdf/X4i_AE_EN.docx 전량을 "cardioid" 키워드로 스캔 — 0건 검출.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 4" neodymium cone driver | - |
| HF_Transducer | 1.4" diaphragm compression driver | - |
| LF_Acoustical_Load [1] | closed enclosure | - |
| HF_Acoustical_Load | null | - |
| Passive_Crossover_Network | Yes | - |
| LF_Nominal_Impedance | null | Ohm |
| HF_Nominal_Impedance | null | Ohm |
| Nominal_Impedance_Overall | 16 | Ohm |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_HF | null | W |
| RMS_Power_Handling_Overall | 42 | W |
| Peak_Power_Handling_10ms_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: X4i_AE_EN.docx "Technical requirements"; X4i_OM_EN_6.0.pdf p.75 "X4i specifications".
**Peak_Power_Handling_10ms_Overall(신규 Key)**: d&b CCL8에서 신설된 범용 Key(10ms 피크 파워 핸들링, 업계 표준 측정 조건) — 이 제품 자신의 RMS_Power_Handling_Overall은 실값을 보유하나 이번 일괄 동기화 라운드에서는 원본을 재조회하지 않고 소급 반영했으므로 미확인으로 유지(원본성 요건, LA12X 브릿징 Key 판단 사례와 동일 원칙).
**[1] LF_Acoustical_Load=closed enclosure**: X6i/X8i(bass-reflex)와 달리 X4i는 밀폐형 — 최소형 설계에 따른 차이로 원문 그대로 채택(임의 통일하지 않음).
**Nominal_Impedance_Overall=16Ω**: X6i/X8i(8Ω)와 다름 — 원문 그대로 채택.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector [1] | 1 x 2-point screw terminal | - |
| Link_Connector [1] | 1 x 2-point screw terminal | - |
| Screw_Terminal_Pinout_1 | + / - (combined LF+HF signal, internally split by passive crossover) | - |
| Screw_Terminal_Pinout_2 | Not linked | - |

### 주석 및 출처 (Notes & Sources)

**출처**: X4i_OM_EN_6.0.pdf p.13 "Connectors"("Internal pinout for L-Acoustics 2-way passive enclosures" — "Screw terminal points IN +/IN -"); X4i_AE_EN.docx "Connectors: 2 x 2-point screw terminal".
**[1] 신규 커넥터 모델 Key(Screw_Terminal_Pinout_*)**: X6i/X8i는 "terminal block with push-in connection"(스프링 방식 삽입 단자)인 반면 X4i는 원문이 명시적으로 "Screw terminal"(나사 조임 단자)로 구분 — 물리적으로 다른 커넥터 하드웨어이므로 기존 Terminal_Block_Pinout_*을 재사용하지 않고 신규 Key를 신설(SKILL v1.14/v1.16의 커넥터 모델 고유 Key 원칙 — 다른 제품 파일에 null 동기화하지 않음).

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA2Xi, LA4X, LA7.16i, LA12X | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type | Passive (2-way) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: X4i_OM_EN_6.0.pdf "X4i is driven by the LA2Xi / LA4X / LA7.16i / LA12X amplified controllers".

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | 1 x M5 insert + screw (X-U4i/X-B4i 마운트용), 2 x M6 inserts(리깅 액세서리용), 1 x M6 insert(보조 안전용) | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | 0 | count |
| Weight_Net | 1 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: X4i_OM_EN_6.0.pdf p.75 "X4i specifications"("Rigging and handling"); p.13 "Rigging system description".
**Handles=0(확정적 비존재)**: X4i_OM_EN_6.0.pdf/X4i_AE_EN.docx 전량 스캔 결과 "handle" 키워드 0건 검출 — 초소형(1kg) 설치용 제품 특성상 손잡이 없이 설계된 것으로 확정.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 116 | mm |
| Height_mm | 116 | mm |
| Depth_mm | 99 | mm |
| Dimensions_Raw [1] | 116 / 116 / 99 / 109 | mm |
| Cabinet_Material | premium grade Baltic birch plywood | - |
| Front_Material | coated steel grill, acoustically neutral 3D fabric | - |
| Rigging_Components_Material | null | - |
| Finish_Color | dark grey brown Pantone 426 C, pure white RAL 9010, custom RAL code on special order | - |
| IP_Rating [2] | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: X4i_AE_EN.docx "Physical data" - "Dimensions (W, H, D): 116 mm, 116 mm, 99 mm"; X4i_OM_EN_6.0.pdf p.76 "X4i dimensions"(치수 도면).
**[1] Dimensions_Raw**: 도면 4개 숫자(116/116/99/109mm) — AE 확정 W/H/D(116/116/99)와 3개 일치, 109는 커넥터 실링 플레이트 포함 깊이 등 부가 치수로 추정.
**[2] IP_Rating 조건부**: OM 각주 2 "With connector sealing plate" — X8i/X6i와 동일하게 커넥터 실링 플레이트 장착이 전제된 조건.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| X4i standalone (고SPL) | [X4] | 120 - 20000 | null | null |
| X4i point source with SB6i, closely coupled(200Hz) | [X4] + [SB6_200] | 32 - 20000 | 1 X4i : 1 SB6i | null |
| X4i point source with SB6i, coupled(100Hz) | [X4] + [SB6_100] | 29 - 20000 | 1 X4i : 1 SB6i | null |
| X4i point source with SB6i, separated(60Hz) [1] | [X4_60] + [SB6_60] | 29 - 20000 | 2 X4i : 1 SB6i | null |
| X4i point source with SB10i, closely coupled(200Hz) | [X4] + [SB10_200] | 29 - 20000 | 2 X4i : 1 SB10i | null |
| X4i point source with SB10i, coupled(100Hz) | [X4] + [SB10_100] | 27 - 20000 | 2 X4i : 1 SB10i | null |
| X4i point source with SB10i, separated(60Hz) | [X4_60] + [SB10_60] | 25 - 20000 | 3 X4i : 1 SB10i | null |

### 주석 및 출처 (Notes & Sources)

**출처**: X4i_OM_EN_6.0.pdf p.25-31 "Loudspeaker configurations"("X4i point source with low-frequency element", "X4i point source with SB6i" p.26-28, "X4i point source with SB10i" p.29-31).
**[1] Recommended_Ratio 정정**: v1.0에서 "1 X4i : 1 SB6i"로 오기재되어 있었으나, 원문 표(p.28 "Ratio" 행)를 직접 확인한 결과 실제 값은 "2 X4i : 1 SB6i"임을 확인 — 정정 채택(SB10i 조합 재조사 과정에서 함께 발견).
**SB10i 조합 상세**: v1.0에서는 SB6i 위주로 조사하고 SB10i는 프리셋 코드 존재만 확인한 채 "시간 배분상"(SKILL v1.17 금지 표현)이라는 사유로 미상세 처리했었음 — 재조사 결과 원문에 SB6i와 완전히 동일한 형식의 3단계(closely coupled/coupled/separated) 표가 명시적으로 존재해(p.29-31) 3개 행으로 분리, 실값 확보.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| [X4] or [X4_MO] + [SB6_200] | 0.6 | SB6i = 0 | X4i = + / SB6i = - |
| [X4] or [X4_MO] + [SB6_100] | 0 | SB6i = 0.4 | X4i = + / SB6i = + |
| [X4_60] + [SB6_60] | 1.8 | SB6i = 0 | X4i = + / SB6i = - |

### 주석 및 출처 (Notes & Sources)

**출처**: X4i_OM_EN_6.0.pdf p.26-28 "Pre-alignment delays"(p.28 "[X4_60] + [SB6_60]" 표). 극성은 색상 아이콘 표기라 Windows.Data.Pdf WinRT API로 페이지 이미지 렌더링해 육안 확인.
**[X4_60] + [SB6_60] 딜레이값 재조사로 확보**: v1.0에서는 이 조합의 딜레이값을 "시간 배분상"(SKILL v1.17 금지 표현) 미확보로 delay_defaults에서 제외했었으나, 재조사 결과 원문 p.28(다른 두 SB6i 조합과 동일 챕터, "Separated" 소제목 하단)에 명시적으로 존재함을 확인 — X4i=1.8ms/SB6i=0ms, 극성은 p.28 페이지 이미지 렌더링으로 X4i=회색(+)/SB6i=적색(-) 확인, 실값으로 채택.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| all configurations | X-U4i, X-B4i 등 (X6i/X8i와 유사 액세서리 체계) | 1 | 1 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 5:1 | - |
| Max_Wind_Load | null | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: X4i_OM_EN_6.0.pdf "The X4i rigging system complies with EN 62368-1: 2014...", "The deployments described in this manual achieve a safety factor of 5".
**Max_Wind_Load 미확인 사유**: X6i/X8i와 동일 사유 — 원문 전량 검색으로도 풍하중 수치 미발견.

## Null Report

**미확인(정보 부족)**: Model_Number, WEEE_Marking, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, LF_Nominal_Impedance, HF_Nominal_Impedance(단일 통합값만 존재), RMS_Power_Handling_LF/HF(단일 통합값만 존재), Peak_Power_Handling_10ms_Overall, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, Inter_Enclosure_Angles_deg, Rigging_Components_Material, Max_Wind_Load, preset_guide_and_matching 섹션 내 Recommended_Ratio/Minimum_Line_Length 셀(standalone 1행은 두 컬럼 다 null, SB6i/SB10i 조합 6행은 Minimum_Line_Length만 null; 1행×2열+6행×1열=8건) — 23건.
**비적용**: HF_Acoustical_Load — 1건. (PA_COM_Pinout_*/SpeakON_Pinout_*/Terminal_Block_Pinout_* 등 타 커넥터 고유 Key는 X4i 자신의 Screw_Terminal_Pinout_*으로 이미 표현되어 애초에 생성하지 않음, null 목록에서 제외.)

**총계**: null 24건 (미확인 23건 + 비적용 1건). 확정적 비존재(0/No)로 명시한 항목은 1건 — Handles(0, 원문 전량 스캔 근거). **v1.4 정정(각주 버전 참조 최신성 감사, 2026-07-18)**: 이전까지 preset_guide_and_matching의 null 셀을 "Minimum_Line_Length 전 행"이라는 서술로 뭉뚱그려 총계 산정 시 1건으로만 반영해왔으나(결합형 불릿 오카운트, K1/L2/A10 Focus/X12/X15 HiQ 등 다른 파일에서도 반복된 유형), 실제로는 7개 Configuration 행 중 standalone 1행은 Recommended_Ratio·Minimum_Line_Length 둘 다 null이고 나머지 6행(SB6i/SB10i 조합)은 Minimum_Line_Length만 null인 8개의 개별 null 셀이다 — 13건(단순 Key)+8건(preset 셀)=21건, 총계 15건 -> 22건으로 재계산. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — speakers 카테고리(X6i/X8i와 동일 계열의 최소형 버전). X6i_v1.0.md를 스켈레톤으로 사용, X4i_AE_EN.docx + X4i_OM_EN_6.0.pdf 통합. 밀폐형 음향 부하, 16Ω 임피던스, screw terminal 커넥터(신규 Key Screw_Terminal_Pinout_*), [X4]/[X4_60] 프리셋명(제품명 축약형) 등 신규 사실 확인. AE와 OM 간 프리셋-SPL 짝짓기 충돌 발견 및 OM 우선 원칙으로 해결(양쪽 값 모두 보존). preset_guide_and_matching/delay_defaults는 SB6i 조합 원문을 직접 조사해 실값 확보(극성은 PDF 페이지 이미지 렌더링). |
| v1.1 | SKILL v1.17 금지 표현("시간 배분상")으로 얼버무렸던 두 결측 항목을 X4i_OM_EN_6.0.pdf 재조사로 해소. (1) preset_guide_and_matching: SB10i 3단계 조합(closely coupled/coupled/separated)을 p.29-31에서 확인해 SB6i와 동일하게 3개 행으로 분리, Frequency_Range_10dB_Hz(29/27/25 Hz)·Recommended_Ratio(2:1/2:1/3:1) 실값 확보. 이 과정에서 기존 SB6i separated(60Hz) 행의 Recommended_Ratio 오기재("1 X4i : 1 SB6i")도 발견해 원문(p.28) 확인 후 "2 X4i : 1 SB6i"로 정정. (2) delay_defaults: [X4_60]+[SB6_60] 조합의 pre-alignment 딜레이가 p.28에 다른 두 SB6i 조합과 같은 챕터에 명시되어 있음을 확인(X4i=1.8ms/SB6i=0ms), 극성은 페이지 이미지 렌더링으로 X4i=+/SB6i=- 확인해 신규 행 추가. delay_defaults 컬럼명 K1_Delay_ms → Primary_Element_Delay_ms로 통일(2026-07-17 전체 파일 리네임 반영). |
| v1.2 | MF_Transducer/MF_Acoustical_Load/MF_Nominal_Impedance/RMS_Power_Handling_MF 4개 Key 삭제(SKILL v1.19) — 이 제품은 확인된 2-way 구조라 MF 대역 드라이버 자체가 없으므로, null 동기화 대상이 아니라 삭제 대상으로 재분류. 비적용 null 항목 6건 -> 4건, 미확인 16건 -> 14건, 총계 22건 -> 18건. |
| v1.3 | Product_Series(X Series, i 없음 — X6i/X8i의 "Xi Series" 표기와 다른 원문 자체의 비일관성을 그대로 채택)/Product_Type(Short throw point source) 신규 Key 2건 추가(X4i_AE_EN.docx 최상단 헤더, 사용자 지시 2026-07-17). Cardioid_Capability=No 추가 — X4i_OM_EN_6.0.pdf/X4i_AE_EN.docx 전량 스캔 0건 검출. signal_processing 섹션(CUT_Mode_Available/HFC_Function_Settings/Coupling_Function_Range, d&b 전용 개념)이 L-Acoustics 파일에 null 플레이스홀더로 잘못 추가되어 있던 것을 프로젝트 전역 동기화 라운드에서 삭제. Null Report 갱신(비적용 4건→1건, 총계 18건→15건). |
| v1.3 to v1.4 | (표기 정정, Minor) 각주 버전 참조 최신성 감사(2026-07-18)에서 preset_guide_and_matching의 Recommended_Ratio/Minimum_Line_Length 미확인이 "Minimum_Line_Length 전 행"이라는 서술로 뭉뚱그려져 실제로는 7개 Configuration 행에 걸친 8개 개별 null 셀(standalone 1행은 두 컬럼 다, SB6i/SB10i 조합 6행은 Minimum_Line_Length만)인데도 총계 산정 시 1건으로만 반영되어 있던 결합형 불릿 오카운트를 발견·정정. 미확인 14건→21건, 총계 15건→22건으로 재계산. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다. |
| v1.5 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-18, d&b 대량 배치 완료 후) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래, 미확인), `Peak_Power_Handling_10ms_Overall`(d&b CCL8 유래, 미확인) 반영. Null Report 24건(미확인 23건+비적용 1건)으로 갱신. |
