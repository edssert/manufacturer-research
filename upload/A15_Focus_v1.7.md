# A15 Focus (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(A10 Focus의 대형 버전, 15" LF)

**스켈레톤 근거**: `speakers/LA/A10_Focus_v1.0.md`를 뼈대로 사용 — A15 Focus는 A10 Focus와 완전히 동일한 아키텍처(단일 채널 패시브 크로스오버, speakON, 10° 고정 각도)이나 더 큰 트랜스듀서(15" LF + 3" HF, medium throw 45m)와 다른 앰프 호환성(LA2Xi/LA4X/LA7.16/LA7.16i/LA12X — LA8 없음, LA2Xi/LA7.16 계열 추가)을 가진다.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | A15 Focus | - |
| Model_Number | null | - |
| Product_Series | A Series | - |
| Product_Category | medium throw line source | - |
| Product_Type | Constant Curvature Line Source | - |
| Description | 2-way passive constant curvature WST 10° enclosure: 15" LF cone driver + 3" HF diaphragm compression driver, amplified by LA2Xi / LA4X / LA7.16 / LA7.16i / LA12X | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | 2006/42/EC Machinery Directive (rigging system, designed per BGV-C1 guidelines) | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: A15_AE_EN.docx("A15 Focus" 섹션); A15_OM_EN.pdf(A15 owner's manual EN version 3.3) p.136 "A15 Focus specifications".
**Product_Series/Product_Type(신규 Key, 사용자 지시 2026-07-17, 2026-07-18 재정의)**: A15_AE_EN.docx 최상단 헤더("A15 - Medium throw line source" / "A Series" / "Incremental coverage with **fixed** inter-element angles"). Product_Type은 "fixed inter-element angles"를 근거로 "Constant Curvature Line Source"로 재정의(사용자 지적 2026-07-18, 상세 근거는 A10_Focus_v1.4.md 참조).

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | 41 - 20000 | Hz |
| Frequency_Response_6dB_Hz | 44 - 20000 | Hz |
| Frequency_Response_3dB_Hz | 47 - 20000 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak | 144 | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | 10 (enclosure) / 70-110 symmetric or 90 asymmetric (L-Fins) | deg |
| Nominal_Directivity_Vertical | 10 | deg |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | A15, A15_FI, A15_MO | - |

### 주석 및 출처 (Notes & Sources)

**Cardioid_Capability=No(확정적 비존재)**: A15_OM_EN_3.3.pdf/A15_AE_EN.docx 전량을 "cardioid" 키워드로 스캔 — A15 Focus 자신에 대한 언급 0건, 검출된 언급은 전부 컴패니언 서브우퍼의 반전 배치 프리셋 안내뿐.

**출처**: A15_AE_EN.docx "Technical requirements"; A15_OM_EN.pdf p.136 "A15 Focus specifications".
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 15" neodymium cone driver | - |
| HF_Transducer | 3" neodymium diaphragm compression driver | - |
| LF_Acoustical_Load | bass-reflex, L-Vents | - |
| HF_Acoustical_Load | DOSC waveguide, L-Fins | - |
| Passive_Crossover_Network | Yes | - |
| LF_Nominal_Impedance | null | Ohm |
| HF_Nominal_Impedance | null | Ohm |
| Nominal_Impedance_Overall | 8 | Ohm |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_HF | null | W |
| RMS_Power_Handling_Overall | 446 | W |
| Peak_Power_Handling_10ms_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: A15_AE_EN.docx "Technical requirements"; A15_OM_EN.pdf p.136 "A15 Focus specifications".
**Peak_Power_Handling_10ms_Overall(신규 Key)**: d&b CCL8에서 신설된 범용 Key(10ms 피크 파워 핸들링, 업계 표준 측정 조건) — 이 제품 자신의 RMS_Power_Handling_Overall은 실값을 보유하나 이번 일괄 동기화 라운드에서는 원본을 재조회하지 않고 소급 반영했으므로 미확인으로 유지(원본성 요건, LA12X 브릿징 Key 판단 사례와 동일 원칙).

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 2 x 4-point speakON (IN/LINK interchangeable, only 1 channel carries signal) | - |
| Link_Connector | 2 x 4-point speakON (IN/LINK interchangeable, only 1 channel carries signal) | - |
| SpeakON_Pinout_1 | + / - (combined LF+HF signal, internally split by passive crossover) | - |
| SpeakON_Pinout_2 | Not linked | - |

### 주석 및 출처 (Notes & Sources)

**출처**: A15_OM_EN.pdf "Connectors"("Internal pinout for L-Acoustics 2-way passive enclosures" — A10과 동일 표 제목/구조).

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA2Xi, LA4X, LA7.16, LA7.16i, LA12X | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type | Passive (2-way) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: A15_OM_EN.pdf "The A15 Wide/Focus enclosures are driven by the LA2Xi / LA4X / LA7.16 / LA7.16i / LA12X amplified controllers". A10(LA8 포함, LA2Xi/LA7.16 계열 없음)와 앰프 매칭이 다름 — 더 큰 트랜스듀서로 인한 전력 요구량 차이로 추정, 원문 그대로 채택.

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | flush-fitting 2-point rigging system(rotating rigging arm + spring-loaded pin) | - |
| Inter_Enclosure_Angles_deg | 10 | deg |
| Handles | 2 | count |
| Weight_Net | 35 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: A15_OM_EN.pdf p.136 "A15 Focus specifications"("Rigging and handling").

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 762 | mm |
| Height_mm | 427 | mm |
| Depth_mm | 490 | mm |
| Dimensions_Raw [1] | 764 / 427 / 347 / 431 / 752 / 490 / 522 | mm |
| Cabinet_Material | premium grade Baltic beech and birch plywood | - |
| Front_Material | coated steel grill, acoustically neutral 3D fabric | - |
| Rigging_Components_Material | high grade steel with anti-corrosion coating | - |
| Finish_Color | dark grey brown Pantone 426 C | - |
| IP_Rating | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: A15_AE_EN.docx "Physical data" - "Dimensions (W, H, D): 762 mm, 427 mm, 490 mm"; A15_OM_EN.pdf p.137 "A15 Focus dimensions"(치수 도면, 이미지 렌더링으로 확인).
**[1] Dimensions_Raw**: 도면 7개 숫자(상면도 764/427, 배면 리깅플레이트 347/431, 측면도 752/490/522) 중 427/490은 AE와 일치, 상면 폭은 AE 762mm 대비 도면 764mm로 근사 표기(A10 Focus의 354/350 사례와 동일 패턴) — 나머지는 부가 치수로 도면에서 직접 확인.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| A15 Focus line source (단독) | [A15] | 41 - 20000 | null | null |
| A15 Focus line source element (단일) | [A15_FI] | 42 - 20000 | null | null |
| A15 Focus with KS21 [1] | [A15] + [KS21_60] | 29 - 20000 | 1 A15 Focus : 1 KS21 | null |

### 주석 및 출처 (Notes & Sources)

**출처**: A15_OM_EN.pdf p.49-52 "Loudspeaker configurations"("A15 Wide/Focus line source", "...line source with low-frequency element", "...line source element"). "line source element" 단독 구성의 Frequency_Range는 A15 Focus 42Hz(원문 그대로), A15 line source 단독 구성은 41Hz — 두 구성이 서로 다른 하한을 가짐을 원문 그대로 반영(오기재 아님, 서로 다른 프리셋/구성).
**[1] 배치 간격**: coupled(3 A15:2 KS21) 최대 2.8m 또는 separated(1:1) 조건 — 원문에 두 배치 방식이 있으나 Recommended_Ratio 컬럼에는 대표 1:1 비율만 채택.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| [A15] or [A15_FI] or [A15_MO] + [KS21_60] | 0 | KS21 = 2.3 | A15 Focus = + / KS21 = + |
| [A15] or [A15_FI] + [KS21_60_C] | 9 | KS21 = 0 | A15 Focus = + / KS21 = - |
| [A15] or [A15_FI] + [KS21_60_Cx] | 8 | KS21 = 0 | A15 Focus = + / KS21 = + |

### 주석 및 출처 (Notes & Sources)

**출처**: A15_OM_EN.pdf p.51-52 "Pre-alignment delays"("A15 Wide/Focus line source with low-frequency element"). 극성은 색상 아이콘 표기라 Windows.Data.Pdf WinRT API로 해당 페이지(PDF 51-52페이지)를 직접 이미지 렌더링해 육안 확인.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| flown | X-BAR | 1 | 1 |
| vertical array | A15-BUMP + M-BAR (optional) | 8 | 8 |
| vertical array | A15-RIGBAR | 4 | 4 |
| vertical array with pullback | A15-BUMP + M-BAR (optional) + A15-RIGBAR | 8 | 8 |
| vertical array with pullback | 2 x A15-RIGBAR | 4 | 4 |
| stacked vertical array | no rigging accessory | 1 | 1 |
| stacked vertical array | KS21-OUTRIG | 4 | 4 |
| pole-mounted | A-MOUNT | 1 | 1 |
| stacked on KS21, angle adjustment [1] | A-TILT + KS21-OUTRIG or KS21-CHARIOT with K2-JACK | 4 (KS21 포함) | 4 A15 Focus + 4 KS21 |
| stacked on KS21 [1] | KS21-OUTRIG or KS21-CHARIOT with K2-JACK | 3 A15 Focus | 3 KS21 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 4:1 | - |
| Max_Wind_Load | 6 | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: A15_OM_EN.pdf p.47-48 "Mechanical safety"("2006/42/EC Machinery Directive", "safety factor of 4"); Safety 섹션(Max_Wind_Load, "6 bft", K1 계열과 동일 관례로 확인).
**A15-BUMP+M-BAR+A15-RIGBAR 행**: 원문 "A15 Wide: 5 / A15 Focus: 8 / A15 Wide/Focus: 8" — A15 Focus 자신의 값(8)만 채택.
**[1] KS21 스택 구성**: "A15 Wide/Focus on KS21" 표 — Safe_Limit/Maximum_Limit이 제품별로 다른 값을 가지는 복합 표기(예: "3 A15 Focus / 2 A15 Wide")라 A15 Focus 자신의 값만 채택.
**Radial array(A15-LIFT) 행 생략**: 원문에 A15-LIFT 1개/2개/3개 조합별 세부 배치 각도(1,3 / 2,4,5,6 / 7,8,9 등)가 있으나 안전 한계 숫자가 아닌 배치 위치 인덱스라 이 표 구조에 대응되지 않아 생략.

## Null Report

**미확인(정보 부족)**: Model_Number, WEEE_Marking, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, LF_Nominal_Impedance, HF_Nominal_Impedance(단일 통합값만 존재), RMS_Power_Handling_LF/HF(단일 통합값만 존재), Peak_Power_Handling_10ms_Overall, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, preset_guide_and_matching(Recommended_Ratio null 2행 + Minimum_Line_Length null 전 3행 = 5건: A15 Focus 단독/line source element 2개 Configuration 행은 Recommended_Ratio·Minimum_Line_Length 둘 다 null, A15 Focus+KS21 행은 Minimum_Line_Length만 null) — 17건.
**비적용**: 없음 — 0건. (PA_COM_Pinout_*/Terminal_Block_Pinout_* 등 타 커넥터 고유 Key는 A15 Focus 자신의 SpeakON_Pinout_*으로 이미 표현되어 애초에 생성하지 않음, null 목록에서 제외.)

**총계**: null 17건 (미확인 17건 + 비적용 0건). 확정적 비존재(0/No)로 명시한 항목은 0건. **v1.6 정정(2026-07-18, 각주 버전 참조 최신성 감사 중 발견)**: 이전까지 preset_guide_and_matching의 Recommended_Ratio/Minimum_Line_Length 미확인을 "Recommended_Ratio 2행/Minimum_Line_Length 전 행"이라는 서술로만 표기하고 총계 산정 시 1건으로만 반영해왔으나(결합형 불릿 오카운트, K1/L2 등 다른 파일에서도 반복된 유형), 실제로는 Recommended_Ratio null 2개 + Minimum_Line_Length null 3개 = 5개의 개별 null 셀이다 — 미확인 11건→15건, 총계 11건→15건으로 재계산. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — speakers 카테고리(A10 Focus의 대형 버전). A10_Focus_v1.0.md를 스켈레톤으로 사용, A15_AE_EN.docx("A15 Focus" 섹션) + A15_OM_EN.pdf(A15 Wide/Focus 공용 매뉴얼) 통합. 15"/3" 트랜스듀서, medium throw 45m, 다른 앰프 호환성(LA2Xi/LA7.16/LA7.16i 추가, LA8 없음) 확인. 남은 대량 제품 처리 일정상 preset_guide/delay/mechanical_safety 상세는 A10 대비 축소. |
| v1.1 | 사용자 피드백(2026-07-17) — "시간 배분상 미확인"으로 남겨둔 delay_defaults/mechanical_safety/preset_guide_and_matching을 원문(A15_OM_EN.pdf p.47-52) 직접 조사로 실값 채움. KS21 조합 delay 3건(극성은 PDF 페이지 이미지 렌더링으로 확인) 및 mechanical_safety 10개 구성(flown/vertical array/stacked/pole-mounted/KS21 스택) 실값 확보. |
| v1.2 | Dimensions_Raw의 "시간 배분상 별도 추출하지 않음" 방치를 수정(SKILL v1.17 위반) — A15_OM_EN.pdf p.137 "A15 Focus dimensions" 도면을 이미지 렌더링해 7개 수치(764/427/347/431/752/490/522mm) 확보. |
| v1.3 | delay_defaults 표의 컬럼명 `K1_Delay_ms`를 `Primary_Element_Delay_ms`로 전면 개명(SKILL v1.18) — K1이 스키마 최초 origin 제품이라는 이유만으로 이름이 고정되어 있던 것을 범용 역할 기반 이름으로 정정, 값 변경 없음(사용자 지적 2026-07-17). |
| v1.4 | MF_Transducer/MF_Acoustical_Load/MF_Nominal_Impedance/RMS_Power_Handling_MF 4개 Key 삭제(SKILL v1.19) — 이 제품은 확인된 2-way 구조라 MF 대역 드라이버 자체가 없으므로, null 동기화 대상이 아니라 삭제 대상으로 재분류(K1 v1.4의 기존 반대 판단을 뒤집는 정책 변경, GSL의 Front_LF_Transducer와 동일 원칙 적용). MF_Nominal_Impedance가 미확인 목록의 결합형 "RMS_Power_Handling_LF/MF/HF" 항목과 별도 표기되어 있어 실제 삭제분은 미확인 -1(12→11)/비적용 -2(5→3)임을 검증 후 Null Report 수치 정정. |
| v1.5 | Cardioid_Capability 신규 Key 적용(No). d&b 고유 signal_processing 섹션 삭제(사용자 지적 2026-07-18). Product_Series/Product_Type 신규 Key 적용 — Series="A Series", Type="Constant Curvature Line Source"(상세는 A10_Focus_v1.4.md 참조). |
| v1.5 to v1.6 | (표기 정정, Minor) 각주 버전 참조 최신성 감사(2026-07-18)에서 preset_guide_and_matching의 Recommended_Ratio/Minimum_Line_Length 미확인이 "Recommended_Ratio 2행/Minimum_Line_Length 전 행"이라는 서술로 뭉뚱그려져 실제로는 5개의 개별 null 셀(Recommended_Ratio 2개+Minimum_Line_Length 3개)인데도 총계 산정 시 1건으로만 반영되어 있던 결합형 불릿 오카운트를 발견·정정(K1_v1.11.md/L2_v1.7.md와 동일 유형). 미확인 11건→15건, 총계 11건→15건으로 재계산. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다. |
| v1.7 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-18, d&b 대량 배치 완료 후) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래, 미확인), `Peak_Power_Handling_10ms_Overall`(d&b CCL8 유래, 미확인) 반영. Null Report 17건(미확인 17건+비적용 0건)으로 갱신. |
