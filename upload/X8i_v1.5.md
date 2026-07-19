# X8i (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(X8의 install 파생형)

**스켈레톤 근거**: `speakers/LA/X8_v1.0.md`를 뼈대로 사용 — X8i는 X8과 동일한 2-way 패시브 동축 점음원 아키텍처이나 (1) 커넥터가 speakON이 아닌 **4-point terminal block**(push-in), (2) 지향각이 100°가 아닌 **90°**, (3) 무대 모니터 틸트각이 35° 하나가 아닌 **35°/55° 두 단계**, (4) 앰프 호환성이 LA4X/LA8/LA12X가 아닌 **LA2Xi/LA4X/LA7.16i/LA12X**, (5) IP55(X8은 IP43), (6) 가장 중요하게 **2개의 대체 팩토리 프리셋([X8i]/[X8i_40])이 서로 다른 대역폭/SPL을 제공**하는 신규 개념을 가진다 — 아키텍처는 X8i 자신의 X8i_AE_EN.docx/X8i_OM_EN_2.0.pdf에서 독립 판정했다.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | X8i | - |
| Model_Number | null | - |
| Product_Series | Xi Series | - |
| Product_Category | short throw point source (installation version) | - |
| Product_Type | Short throw point source | - |
| Description | 2-way passive coaxial enclosure (installation version): 8" LF cone driver + 1.5" HF diaphragm compression driver, amplified by LA2Xi / LA4X / LA7.16i / LA12X | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | EN 62368-1:2014 Audio/video, information and communication technology equipment — Part 1: Safety requirements | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: X8i_AE_EN.docx; X8i_OM_EN_2.0.pdf(X8i owner's manual EN version 2.0) p.189 "X8i specifications", p.22 "Mechanical safety".
**Product_Series/Product_Type(신규 Key, 사용자 지시 2026-07-17)**: X8i_AE_EN.docx 최상단 헤더("X8i - Short throw point source" / "Xi Series") — install 파생형은 "X Series"가 아닌 "Xi Series"로 별도 표기(X6i도 동일 패턴, A/K 계열의 "X Series Install" 표기와 다른 브랜드 관례, 원문 그대로 채택).

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz [1] | [X8i_40]: 43 - 20000 / [X8i]: 67 - 20000 | Hz |
| Frequency_Response_6dB_Hz [1] | [X8i_40]: 48 - 20000 / [X8i]: 75 - 20000 | Hz |
| Frequency_Response_3dB_Hz [1] | [X8i_40]: 54 - 20000 / [X8i]: 83 - 20000 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Max_SPL_Peak [2] | [X8i_40]: 123 dB / [X8i]: 129 dB (LA2Xi bridge/LA4X/LA7.16i/LA12X); [X8i_40]: 121 dB / [X8i]: 125 dB (LA2Xi single-ended) | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | 90 (axisymmetric) | deg |
| Nominal_Directivity_Vertical | 90 (axisymmetric) | deg |
| Cardioid_Capability | No | - |
| DSP_Preset_Name [1] | X8i, X8i_40 | - |
| Frequency_Response_4dB_Hz | null | Hz |

### 주석 및 출처 (Notes & Sources)

**출처**: X8i_AE_EN.docx "Technical requirements"; X8i_OM_EN_2.0.pdf p.189 "X8i specifications".
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.
**Cardioid_Capability=No(확정적 비존재)**: X8i_OM_EN_2.0.pdf/X8i_AE_EN.docx 전량을 "cardioid" 키워드로 스캔 — X8i 자신에 대한 언급 0건.
**[1] 이중 프리셋 구조(X8 대비 신규)**: X8i는 하나의 인클로저에 대해 서로 다른 대역폭/SPL 트레이드오프를 갖는 두 팩토리 프리셋을 제공한다 — [X8i](고SPL, 129dB, 67Hz~, 서브우퍼 병용 또는 보컬 강조 권장)와 [X8i_40](풀레인지, 123dB, 43Hz~, 단독/근접 청취 권장). 소스 간 충돌이 아니라 제품이 원래 제공하는 두 가지 정식 동작 모드이므로, Usable_Bandwidth_Hz/Frequency_Response_6dB/3dB_Hz/DSP_Preset_Name 모두 두 프리셋 값을 나란히 병기(대표값 하나를 임의로 고르지 않음).
**[2] Max_SPL_Peak 4중 구조**: 프리셋(2종) × 앰프 모드(LA2Xi 브릿지 또는 표준/LA4X·LA7.16i·LA12X 공통값 vs LA2Xi 단독모드) 조합으로 4개 값이 원문에 명시 — 전부 보존.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 8" cone driver | - |
| HF_Transducer | 1.5" diaphragm compression driver, neodymium | - |
| LF_Acoustical_Load | bass-reflex | - |
| HF_Acoustical_Load | null | - |
| Passive_Crossover_Network | Yes | - |
| LF_Nominal_Impedance | null | Ohm |
| HF_Nominal_Impedance | null | Ohm |
| Nominal_Impedance_Overall | 8 | Ohm |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_HF | null | W |
| RMS_Power_Handling_Overall | 197 | W |
| Peak_Power_Handling_10ms_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: X8i_AE_EN.docx "Technical requirements"; X8i_OM_EN_2.0.pdf p.189 "X8i specifications"("Internal pinout for L-Acoustics 2-way passive enclosures").
**Peak_Power_Handling_10ms_Overall(신규 Key)**: d&b CCL8에서 신설된 범용 Key(10ms 피크 파워 핸들링, 업계 표준 측정 조건) — 이 제품 자신의 RMS_Power_Handling_Overall은 실값을 보유하나 이번 일괄 동기화 라운드에서는 원본을 재조회하지 않고 소급 반영했으므로 미확인으로 유지(원본성 요건, LA12X 브릿징 Key 판단 사례와 동일 원칙).
**Passive_Crossover_Network=Yes/통합값**: X8와 동일 구조 — terminal block 1채널만 신호를 나름, 임피던스/파워 핸들링 통합값(8Ω/197W).

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector [1] | 1 x 4-point terminal block with push-in connection | - |
| Link_Connector [1] | 1 x 4-point terminal block with push-in connection | - |
| Terminal_Block_Pinout_1 | + / - (combined LF+HF signal, internally split by passive crossover) | - |
| Terminal_Block_Pinout_2 | Not linked | - |

### 주석 및 출처 (Notes & Sources)

**출처**: X8i_OM_EN_2.0.pdf p.16 "Connectors"("Internal pinout for L-Acoustics 2-way passive enclosures" — X8/Kiva II와 동일 표 제목); X8i_AE_EN.docx.
**[1] 커넥터 표기 차이(OM vs AE)**: OM 스펙 표는 "1 × 4-point terminal block"(단일 4포인트 블록, IN/LINK 겸용) 하나로 요약하는 반면, X8i_AE_EN.docx는 "IN: 1 x 2-point terminal block + LINK: 1 x 2-point terminal block"(2포인트씩 별도)으로 서술 — 실제로는 하나의 물리적 터미널 블록에 IN 2핀 + LINK 2핀이 함께 있는 구조로 판단, OM의 다이어그램과 핀아웃 표(IN +/- 만 존재, LINK는 표에 없음)를 기준으로 K3i/Kara IIi와 동일하게 Terminal_Block_Pinout_1(IN)/Terminal_Block_Pinout_2(LINK, not linked) 구조로 채택.

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA2Xi, LA4X, LA7.16i, LA12X | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type | Passive (2-way) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: X8i_OM_EN_2.0.pdf "X8i, SB10i(r), Syva Sub, and KS21(i) are driven by LA2Xi / LA4X / LA7.16i / LA12X". X8(LA4X/LA8/LA12X)과 달리 LA8 대신 LA2Xi/LA7.16i가 포함 — 설치용 라인의 앰프 매칭 차이로 원문 그대로 채택.

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type [1] | 8 x M6 threaded inserts; wall/ceiling/pole-mount 및 고정/가변 틸트각 액세서리(TILT-SUPPORT, WALLx2, PANx2, TILT5/15/40 등) 다수 조합 지원, 상세는 X8i mechanical configurations overview 참조 | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | null | count |
| Weight_Net | 11 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: X8i_OM_EN_2.0.pdf p.189 "X8i specifications"("Rigging and handling: 8 M6 inserts"); p.44-45 "Mechanical configurations overview"(복잡한 마운트 방식 매트릭스 — 생략 사유는 각주 [1] 참조).
**Handles 미확인 사유**: X8(1개 핸들 명시)와 달리 X8i 스펙 표에는 핸들 개수가 명시되지 않음 — 설치용 소형 제품이라 별도 손잡이가 없을 가능성이 있으나 원문에 "handle 없음"이라는 확정적 서술도 없어 미확인으로 유지.
**Monitoring_angle=35°/55°**: 무대 모니터 사용 시 두 단계 틸트각 지원(X8은 35° 한 단계) — acoustical_performance 섹션 각주 참조 대상이나 이 스키마에 대응 Key가 없어 여기 기록.
**[1] Rigging_System_Type 상세 생략**: 원문 "Mechanical configurations overview" 표는 설치 방향(수직/수평)×각도 모드(고정 0°/가변/고정각/가변 아지무스)×액세서리 조합의 매트릭스로 수십 개 조합을 나열 — 이 스키마의 단일 텍스트 Key로는 전부 표현하기 어려워 대표 액세서리명만 요약하고 상세 매트릭스는 원문 참조로 남김(임의 생략이 아니라 스키마 구조상 한계를 명시).

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 240 | mm |
| Height_mm | 490 | mm |
| Depth_mm | 217 | mm |
| Dimensions_Raw [1] | 240 / 480 / 222 / 217 | mm |
| Cabinet_Material | premium grade Baltic beech and birch plywood | - |
| Front_Material | coated steel grill, acoustically neutral 3D fabric | - |
| Rigging_Components_Material | null | - |
| Finish_Color | dark grey brown Pantone 426 C, pure white RAL 9010, custom RAL code on special order | - |
| IP_Rating [2] | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: X8i_AE_EN.docx "Physical data" - "Dimensions (W, H, D): 240 mm, 490 mm, 217 mm"; X8i_OM_EN_2.0.pdf p.190 "X8i dimensions"(치수 도면).
**[1] Dimensions_Raw**: 도면 4개 숫자(240/480/222/217mm) — AE 확정 W/H/D(240/490/217)와 240·217은 정확히 일치, 나머지(480 vs 490, 222)는 근사치/부가 치수로 판단해 원문 그대로 보존.
**[2] IP_Rating 조건부**: OM 각주 2 "With connector at the top and connector sealing plate" — 특정 설치 방향과 커넥터 실링 플레이트 장착이 전제된 조건부 IP55 등급, 조건 미충족 시 등급이 달라질 수 있음(수치 자체는 조건부이나 원문의 대표 스펙값이므로 그대로 채택하고 조건은 각주에 명기).

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| X8i standalone (고SPL) | [X8i] | 67 - 20000 | null | null |
| X8i standalone (풀레인지) | [X8i_40] | 43 - 20000 | null | null |
| X8i with SB10i(r), coupled [1] | [X8i] + [SB10_100] | 27 - 20000 | 1 X8i : 1 SB10i(r) | null |
| X8i with SB10i(r), separated [1] | [X8i_40] + [SB10_60] | 25 - 20000 | 1 X8i : 1 SB10i(r) | null |
| X8i with Syva Sub, coupled [1] | [X8i] + [SYVA SUB_100] | 27 - 20000 | 1 X8i : 1 Syva Sub | null |
| X8i with KS21(i), coupled [1] | [X8i] + [KS21_100] | 31 - 20000 | 1 X8i : 1 KS21(i) | null |

### 주석 및 출처 (Notes & Sources)

**출처**: X8i_OM_EN_2.0.pdf p.38-42 "Loudspeaker configurations"("X8i with SB10i(r)", "X8i with Syva Sub", "X8i with KS21(i)").
**[1] "coupled"/"separated" 거리 조건**: 각 조합은 X8i와 서브우퍼 간 최대/최소 1.7m 배치 거리를 전제(coupled=max 1.7m, separated=min 1.7m) — Recommended_Ratio 컬럼과 별도인 배치 조건이라 여기 요약. System_contour(저역 SPL 보강량, +6~+15dB) 정보도 원문에 있으나 이 스키마에 대응 컬럼이 없어 생략.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| [X8i] + [SB10_100] | 0 | SB10i = 0.5 | X8i = + / SB10i = + |
| [X8i_40] + [SB10_60] | 0 | SB10i = 3 | X8i = + / SB10i = + |
| [X8i] + [SYVA SUB_100] | 0 | Syva Sub = 0 | X8i = + / Syva Sub = - |

### 주석 및 출처 (Notes & Sources)

**출처**: X8i_OM_EN_2.0.pdf p.39-41 "Pre-alignment delays". 극성은 색상 아이콘 표기라 Windows.Data.Pdf WinRT API로 해당 페이지를 직접 이미지 렌더링해 육안 확인.
**[X8i] + [KS21_100] 딜레이값 없음**: 원문이 이 조합에 대해서만 "Do not forget to add the geometric delays"만 언급하고 "pre-alignment and geometric delays" 문구나 실제 딜레이 표를 제공하지 않음 — 사전 정렬 딜레이가 0으로 설계된 것인지 단순 누락인지 원문상 확정할 수 없어 이 조합은 delay_defaults 표에서 제외(preset_guide_and_matching에는 포함).

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| all configurations [1] | 다양(TILT-SUPPORT, WALLx2, PANx2, TILT5/15/40 등, p.44-45 참조) | 1 | 1 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 5:1 | - |
| Max_Wind_Load | null | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: X8i_OM_EN_2.0.pdf p.22 "Mechanical safety"("The deployments described in this manual achieve a safety factor of 5", "Safe/maximum limit: 1 — All the mechanical configurations described in this manual are destined to mount a single X8i").
**[1] 단일 행으로 요약**: 원문은 설치 방향/각도 모드/액세서리별 수십 개 조합 매트릭스를 제공하나, 모든 조합에 대해 "Safe/maximum limit: 1"이 공통 규칙으로 명시되어 있어(다중 X8i 플라잉 배열 자체가 존재하지 않음) 개별 조합을 전부 나열하지 않고 하나의 대표 행으로 요약.
**Max_Wind_Load 미확인 사유**: X8(6 bft 명시)와 달리 X8i 문서에서 풍하중 한계 수치를 원문 전량 검색으로도 발견하지 못함 — 벽/천장 설치 전용 제품이라 옥외/플라잉 배포 시나리오의 풍하중 규정이 별도로 필요하지 않을 가능성이 있으나, 확정적 비존재로 판단할 근거(명시적 "not applicable" 서술)가 없어 미확인으로 유지.

## Null Report

**미확인(정보 부족)**: Model_Number, WEEE_Marking, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, LF_Nominal_Impedance, HF_Nominal_Impedance(단일 통합값만 존재), RMS_Power_Handling_LF/HF(단일 통합값만 존재), Peak_Power_Handling_10ms_Overall, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, Inter_Enclosure_Angles_deg, Handles, Rigging_Components_Material, Max_Wind_Load, preset_guide_and_matching 섹션 내 Recommended_Ratio/Minimum_Line_Length 셀(standalone 고SPL/풀레인지 2행은 두 컬럼 다 null, SB10i(r)/Syva Sub/KS21(i) 조합 4행은 Minimum_Line_Length만 null; 2행×2열+4행×1열=8건) — 24건.
**비적용**: HF_Acoustical_Load — 1건. (PA_COM_Pinout_*/SpeakON_Pinout_* 등 타 커넥터 고유 Key는 X8i 자신의 Terminal_Block_Pinout_*으로 이미 표현되어 애초에 생성하지 않음, null 목록에서 제외. LC_Transducer류는 L2/L2D 고유 개념이라 애초에 생성하지 않음.)

**총계**: null 25건 (미확인 24건 + 비적용 1건). 확정적 비존재(0/No)로 명시한 항목은 0건 — Passive_Crossover_Network는 "Yes"로 실값 확보. **v1.4 정정(각주 버전 참조 최신성 감사, 2026-07-18)**: 이전까지 preset_guide_and_matching의 null 셀을 "Minimum_Line_Length 전 행"이라는 서술로 뭉뚱그려 총계 산정 시 1건으로만 반영해왔으나(결합형 불릿 오카운트, K1/L2/A10 Focus/X12/X15 HiQ/X4i/X4r/X6i/X8 등 다른 파일에서도 반복된 유형), 실제로는 6개 Configuration 행 중 standalone 고SPL/풀레인지 2행은 Recommended_Ratio·Minimum_Line_Length 둘 다 null이고 나머지 4행(SB10i(r)/Syva Sub/KS21(i) 조합)은 Minimum_Line_Length만 null인 8개의 개별 null 셀이다 — 14건(단순 Key)+8건(preset 셀)=22건, 총계 16건 -> 23건으로 재계산. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — speakers 카테고리(X8의 install 파생형). X8_v1.0.md를 스켈레톤으로 사용, X8i_AE_EN.docx + X8i_OM_EN_2.0.pdf 통합. X8 대비 커넥터(terminal block), 지향각(90° vs 100°), 앰프 호환성(LA2Xi/LA7.16i 추가, LA8 제외), IP55(vs IP43) 차이 확인. 가장 특징적으로 **이중 팩토리 프리셋 구조([X8i]/[X8i_40])**를 발견 — 대역폭/SPL Key들을 두 프리셋 값 병기로 표현. preset_guide_and_matching/delay_defaults는 SB10i(r)/Syva Sub/KS21(i) 3종 서브우퍼 조합 원문을 직접 조사해 실값으로 채움(극성은 PDF 페이지 이미지 렌더링으로 확인). |
| v1.1 | delay_defaults 표의 컬럼명 `K1_Delay_ms`를 `Primary_Element_Delay_ms`로 전면 개명(SKILL v1.18) — 값 변경 없음(사용자 지적 2026-07-17). |
| v1.2 | MF_Transducer/MF_Acoustical_Load/MF_Nominal_Impedance/RMS_Power_Handling_MF 4개 Key 삭제(SKILL v1.19) — 이 제품은 확인된 2-way 구조라 MF 대역 드라이버 자체가 없으므로, null 동기화 대상이 아니라 삭제 대상으로 재분류(K1 v1.4의 기존 반대 판단을 뒤집는 정책 변경, GSL의 Front_LF_Transducer와 동일 원칙 적용). MF_Nominal_Impedance가 미확인 목록의 결합형 "RMS_Power_Handling_LF/MF/HF" 항목과 별도 표기되어 있어 실제 삭제분은 미확인 -1(16→15)/비적용 -2(6→4)임을 검증 후 Null Report 수치 정정. |
| v1.3 | Product_Series(Xi Series — install 파생형 별도 표기, X6i와 동일 패턴)/Product_Type(Short throw point source) 신규 Key 2건 추가(X8i_AE_EN.docx 최상단 헤더, 사용자 지시 2026-07-17). Cardioid_Capability=No 추가 — X8i_OM_EN_2.0.pdf/X8i_AE_EN.docx 전량 스캔 0건 검출. signal_processing 섹션(CUT_Mode_Available/HFC_Function_Settings/Coupling_Function_Range, d&b 전용 개념)이 L-Acoustics 파일에 null 플레이스홀더로 잘못 추가되어 있던 것을 프로젝트 전역 동기화 라운드에서 삭제. mechanical_and_physical 출처 각주에서 SKILL v1.17 금지 표현("시간 관계상")을 제거하고 각주 [1](스키마 구조상 한계 명시)로 대체. Null Report 갱신(비적용 4건→1건, 총계 19건→16건). |
| v1.3 to v1.4 | (표기 정정, Minor) 각주 버전 참조 최신성 감사(2026-07-18)에서 preset_guide_and_matching의 Recommended_Ratio/Minimum_Line_Length 미확인이 "Minimum_Line_Length 전 행"이라는 서술로 뭉뚱그려져 실제로는 6개 Configuration 행에 걸친 8개 개별 null 셀(standalone 고SPL/풀레인지 2행은 두 컬럼 다, SB10i(r)/Syva Sub/KS21(i) 조합 4행은 Minimum_Line_Length만)인데도 총계 산정 시 1건으로만 반영되어 있던 결합형 불릿 오카운트를 발견·정정. 미확인 15건→22건, 총계 16건→23건으로 재계산. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다. |
| v1.5 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-18, d&b 대량 배치 완료 후) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래, 미확인), `Peak_Power_Handling_10ms_Overall`(d&b CCL8 유래, 미확인) 반영. Null Report 25건(미확인 24건+비적용 1건)으로 갱신. |
