# X15 HiQ (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(X 시리즈 최초의 진짜 능동 2-way 제품)

**스켈레톤 근거**: `speakers/LA/K3_v1.6.md`를 뼈대로 사용 — X15 HiQ는 지금까지 파싱된 모든 X 시리즈 제품(X8/X12/X6i/X4i/X4r, 전부 겉보기엔 능동처럼 보이나 실제로는 Kiva_II식 단일 채널 패시브)과 달리, 자체 OM 커넥터 핀아웃 표가 **"Internal pinout for L-Acoustics 2-way active enclosures"**로 명시되고(LF+/LF-/HF+/HF- 4핀 분리, K3와 동일 패턴) LF/HF 임피던스·파워핸들링도 대역별 분리값(8Ω/8Ω, 322W/62W)으로 독립 보고되는 **진짜 능동 2-way** 아키텍처다 — 이 카테고리 X 시리즈 최초 사례(SKILL v1.11 "이름과 아키텍처는 무관" 원칙의 정반대 증거: "이름/설명이 능동처럼 보이는 X 시리즈는 실제로는 대부분 패시브"라는 이 프로젝트의 기존 경험적 패턴을 이번엔 뒤집는 예외 사례이므로, 반드시 자체 핀아웃 표로 재확인해야 하는 이유를 보여주는 사례로 기록). 컴패니언 서브우퍼는 SB18/KS21(X12와 동일 조합).

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | X15 HiQ | - |
| Model_Number | null | - |
| Product_Series | X Series | - |
| Product_Category | short throw point source | - |
| Product_Type | Short throw point source | - |
| Description | 2-way active coaxial enclosure: 15" LF cone driver + 3" HF diaphragm compression driver, amplified by LA4X / LA8 / LA12X | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | EN 62368-1:2014 Audio/video, information and communication technology equipment — Part 1: Safety requirements | - |
| WEEE_Marking | Yes (EU) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: X15_HiQ_OM_EN.pdf(X15 HiQ owner's manual EN version 2.0) p.77 "X15 HiQ specifications", p.4 "Safety > Instructions"(Compliance_Standards/WEEE_Marking).
**Product_Series/Product_Type(신규 Key, 사용자 지시 2026-07-17)**: X15_HiQ_AE_EN.docx 최상단 헤더("X15 HiQ - Short throw point source" / "X Series")에서 채택 — 진짜 능동 아키텍처(X15_HiQ_v1.1.md 스켈레톤 근거 참조)이지만 시리즈 소속은 여전히 "X Series"로 명시(Xi Series가 아님, install 파생형이 아니므로).

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | [X15]: 55 - 20000 | Hz |
| Frequency_Response_6dB_Hz | 62 - 20000 | Hz |
| Frequency_Response_3dB_Hz | 70 - 20000 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak | 138 | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg [1] | 40 (ellipsoid, symmetric) | deg |
| Nominal_Directivity_Vertical [1] | 60 (ellipsoid, symmetric) / Monitoring: 35 or 55 (무대 모니터 틸트각) | deg |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | X15, X15_MO | - |

### 주석 및 출처 (Notes & Sources)

**출처**: X15_HiQ_OM_EN.pdf p.77 "X15 HiQ specifications"; X15HiQ_AE_EN.docx "Technical requirements"(6dB/3dB 임계값 출처).
**[1] Ellipsoid 지향각**: 원문 "Nominal directivity (-6 dB): vertical: 60° / horizontal: 40°" — X12와 마찬가지로 이 카테고리에서 흔한 axisymmetric(X8/X6i/X4i)이 아닌 **타원형(ellipsoid) 비대칭** 지향각(수직 60° ≠ 수평 40°). Monitoring angle(무대 모니터 틸트, 35°/55° 라이저 유무에 따라)은 Nominal_Directivity_Vertical에 별도 병기(K1의 이중 개념 표기 관례).
**Cardioid_Capability=No(확정적 비존재)**: X15_HiQ_OM_EN.pdf/X15HiQ_AE_EN.docx 전량을 "cardioid" 키워드로 스캔 — 0건 검출(자체 인클로저에는 카디오이드 기능 없음, 다만 컴패니언 서브우퍼 SB18/KS21과의 조합에서 [xxxx_xx_C]/[xxxx_xx_Cx] 프리셋으로 서브우퍼 자신의 array-based 카디오이드 구성은 가능 — 이는 X15 HiQ 자신의 속성이 아니라 SB18/KS21 자신의 속성이므로 이 Key에는 영향 없음).
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 1 x 15" cone driver | - |
| HF_Transducer | 1 x 3" diaphragm compression driver, neodymium | - |
| LF_Acoustical_Load | bass-reflex, L-Vents | - |
| HF_Acoustical_Load | ellipsoidal waveguide | - |
| Passive_Crossover_Network | No | - |
| LF_Nominal_Impedance | 8 | Ohm |
| HF_Nominal_Impedance | 8 | Ohm |
| Nominal_Impedance_Overall | null | Ohm |
| RMS_Power_Handling_LF | 322 | W |
| RMS_Power_Handling_HF | 62 | W |
| RMS_Power_Handling_Overall | null | W |
| Peak_Power_Handling_10ms_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: X15_HiQ_OM_EN.pdf p.77 "X15 HiQ specifications"; X15HiQ_AE_EN.docx "Technical requirements"(RMS_Power_Handling_LF/HF 출처).
**Peak_Power_Handling_10ms_Overall(신규 Key, 비적용)**: d&b CCL8에서 신설된 범용 Key — RMS_Power_Handling_Overall과 동일 사유(LF/HF 대역별 분리 보고, 통합값 개념 자체가 무의미)로 비적용.
**Passive_Crossover_Network=No**: X15_HiQ_OM_EN.pdf 전문을 "crossover" 키워드로 전량 스캔 — 0건 검출, 커넥터 핀아웃 표가 "2-way active enclosures"로 명시하는 것과 일치(K3와 동일 근거, X8/X12 등 기존 X 시리즈의 단일 채널 패시브와 대조).
**LF/HF_Nominal_Impedance 대역별 분리**: 기존 X 시리즈(단일 채널 패시브)는 Nominal_Impedance_Overall 통합값만 존재했으나, X15 HiQ는 진짜 능동 2-way라 LF_Nominal_Impedance/HF_Nominal_Impedance로 대역별 분리 보고됨(K3와 동일 구조) — Nominal_Impedance_Overall은 비적용(개념 자체가 통합되지 않음).

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 4-point speakON (IN, IN/LINK 구분) | - |
| Link_Connector | 1 x 4-point speakON (LINK) | - |
| SpeakON_Pinout_1 | LF+ / LF- | - |
| SpeakON_Pinout_2 | HF+ / HF- | - |

### 주석 및 출처 (Notes & Sources)

**출처**: X15_HiQ_OM_EN.pdf p.12 "Connectors"("Internal pinout for L-Acoustics 2-way active enclosures" 표 — SpeakON points 1+/1-/2+/2- = Transducer connectors LF+/LF-/HF+/HF-); p.77 "X15 HiQ specifications"("Connectors: IN: 1 x 4-point speakON / LINK: 1 x 4-point speakON").
**K3와 동일 패턴, 기존 X 시리즈와 대조**: X8/X12/X6i/X4i/X4r의 SpeakON_Pinout_1은 전부 "+ / -"(단일 채널, 내부에서 패시브 크로스오버로 LF/HF 분리)이었으나, X15 HiQ는 SpeakON 2채널 각각이 LF와 HF를 독립적으로 담당(K3/Kara_II와 동일한 진짜 능동 다채널 구조) — IN/LINK도 K1/K2식 고정 구분(상호 교환 불가로 추정, 원문에 "interchangeable" 서술 없음).

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA4X, LA8, LA12X | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type | Active (2-way) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: X15_HiQ_OM_EN.pdf "The X15 HiQ enclosure is driven by the LA4X / LA8 / LA12X amplified controllers"(복수 위치에서 반복 확인) — LA2Xi/LA7.16i 비포함(X8/X12와 동일 앰프 목록, install 계열 X8i/X6i/X4i와 다름).
**Max_Enclosures_Per_Controller_Output/Total 미확인**: Soka/Syva와 달리 X15 HiQ 자신의 OM에는 "Enclosure drive capacity per amplified controller" 형태의 앰프별 대수 표가 없음(원문 전량 검색 결과 해당 챕터 자체 부재) — 구조적 부재로 판단, 미확인 유지.

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | 1 x DIN580-compatible M8 threaded insert(보조 안전용), 4 x M10 threaded inserts(외부 리깅용), 2 x 35mm pole socket | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | 2 | count |
| Weight_Net | 21 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: X15_HiQ_OM_EN.pdf p.77 "X15 HiQ specifications"("Rigging and handling: 2 handles, 1 DIN580-compatible M8 threaded insert, 4 M10 threaded inserts, 2 x 35 mm pole sockets"; "Weight (net): 21 kg").
**Inter_Enclosure_Angles_deg**: 단일 유닛 배치 전용 포인트소스(X8/X12와 동일 사유) — 개념 자체가 원문에 없어 미확인.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 430 | mm |
| Height_mm | 580 | mm |
| Depth_mm | 375 | mm |
| Dimensions_Raw [1] | 430 / 580 / 375 / 471 / 500 / 403 / 341 | mm |
| Cabinet_Material | premium grade Baltic beech and birch plywood | - |
| Front_Material [2] | steel with anti-corrosion coating, acoustically neutral 3D fabric | - |
| Rigging_Components_Material | null | - |
| Finish_Color [3] | dark grey brown Pantone 426 C, custom RAL code on special order | - |
| IP_Rating | IP43 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: X15_HiQ_OM_EN.pdf p.78 "X15 HiQ dimensions"(치수 도면); X15HiQ_AE_EN.docx "Physical data" - "Dimensions (W, H, D): 430 mm, 580 mm, 375 mm"(도면 7개 숫자 중 430/580/375는 AE와 일치, 나머지 471/500/403/341은 마운팅 홀 간격 등 부가 치수로 추정, 도면 이미지 육안 재확인은 하지 않음 — TODO.md 치수 W/H/D 축 구분 신뢰도 감사 항목 참조).
**[2] Front_Material**: 원문 "steel with anti-corrosion coating" — 다른 X 시리즈의 "coated steel grill"과 표현이 다름(원문 그대로 채택, 임의 통일하지 않음).
**[3] Finish_Color 소스 간 불일치**: OM 스펙 표는 "dark grey brown Pantone 426 C / custom RAL code on special order" 2가지만 명시하나, AE는 "pure white RAL 9010"까지 포함 3가지를 명시 — OM 표를 채택하고 AE의 3번째 옵션은 이 각주에 보존(데이터 충돌 보존 원칙).
**IP_Rating=IP43**: Soka(IP54)/Syva(IP54)보다 낮은 등급 — 투어링 지향 X 시리즈의 원문 그대로 채택.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| X15 HiQ standalone point source | [X15] | 55 - 20000 | null | null |
| X15 HiQ with SB18 | [X15] + [SB18_100] | 32 - 20000 | 1 X15 HiQ : 1 SB18 | null |
| X15 HiQ with KS21 | [X15] + [KS21_100] | 31 - 20000 | 1 X15 HiQ : 1 KS21 | null |
| X15 HiQ stage monitor (단독) | [X15_MO] | 52 - 20000 | null | null |
| X15 HiQ stage monitor with SB18 | [X15_MO] + [SB18_100] | 32 - 20000 | 1 X15 HiQ : 1 SB18 | null |
| X15 HiQ stage monitor with KS21 | [X15_MO] + [KS21_60] or [KS21_100] | 29 - 20000([KS21_60]) / 31 - 20000([KS21_100]) | 1 X15 HiQ : 1 KS21 | null |

### 주석 및 출처 (Notes & Sources)

**출처**: X15_HiQ_OM_EN.pdf p.24-31 "Loudspeaker configurations"("X15 HiQ point source" / "X15 HiQ point source with LF" — SB18 p.25-26, KS21 p.27-28 / "X15 HiQ stage monitor" / "X15 HiQ stage monitor with LF" — SB18 p.29-30, KS21 p.30-31) 전량 조사.
**SB18 IIi/KS21i 호환성**: 원문에 "Values and ratios are the same for SB18 IIi"/"KS21i" 명시 — 동일 수치가 SB18 IIi/KS21i 조합에도 적용됨(단, KS21i는 pole-mounted 구성과 기계적 비호환이라는 제약이 별도로 명시됨).

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| [X15] + [SB18_100] | 4 | SB18 = 0 | X15 HiQ = + / SB18 = − |
| [X15] + [SB18_100_C] | 9.7 | SB18 = 0 | X15 HiQ = + / SB18 = − |
| [X15] + [SB18_100_Cx] | 8.25 | SB18 = 0 | X15 HiQ = + / SB18 = + |
| [X15] + [KS21_100] | 0 | KS21 = 1.5 | X15 HiQ = + / KS21 = + |
| [X15] + [KS21_100_C] | 3.9 | KS21 = 0 | X15 HiQ = + / KS21 = + |
| [X15] + [KS21_100_Cx] | 2.6 | KS21 = 0 | X15 HiQ = + / KS21 = − |
| [X15_MO] + [SB18_100] | 0 | SB18 = 1 | X15 HiQ = + / SB18 = + |
| [X15_MO] + [KS21_100] | 0 | KS21 = 1.5 | X15 HiQ = + / KS21 = + |

### 주석 및 출처 (Notes & Sources)

**출처**: X15_HiQ_OM_EN.pdf p.27(SB18 point source), p.28(KS21 point source), p.30(SB18 monitor), p.31(KS21 monitor) "Pre-alignment delays" 표 — 딜레이 수치는 텍스트로 확인, Polarity는 4개 페이지 전부 PowerShell+Windows.Data.Pdf로 이미지 렌더링해 회색 "+"/빨간 "-" 아이콘을 전부 육안 확인.
**저지연 모니터 모드 참고**: [X15_MO] 프리셋은 앰프 컨트롤러의 저지연 동작 모드를 사용하며(3.84ms→1.18ms(LA8)/0.84ms(LA4X/LA12X)), 서브우퍼가 별도 컨트롤러의 표준 프리셋으로 구동될 경우 [xx_MO] 저지연 채널에 추가 딜레이(LA8=2.66ms, LA4X/LA12X=3.00ms)를 수동 설정해야 한다는 원문 서술이 있으나, 이는 delay_defaults 표 자체의 값이 아니라 커스텀 프리셋 구성 시 참고사항이라 표에는 반영하지 않음.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| wall-mounted | X-US1215 / X-UL15 + X-UTILT (optional) | 1 | 1 |
| ceiling-mounted | X-US1215 / X-UL15 | 1 | 1 |
| flown | X-BAR + CLAMP250 | 1 | 1 |
| pole-mounted | 35 mm pole (+ EMBi and X-US1215 optional) | 1 | 1 |
| ground-stacked | no rigging accessory | 1 | 1 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 5:1 | - |
| Max_Wind_Load | null | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: X15_HiQ_OM_EN.pdf "Mechanical safety"("The X15 HiQ rigging system complies with EN 62368-1: 2014... The deployments described in this manual achieve a safety factor of 5").
**Max_Wind_Load 미확인**: 원문 전량 검색으로도 풍하중 수치 미발견(X8/X12 등 기존 X 시리즈와 동일 사유).

## Null Report

**미확인(정보 부족)**: Model_Number, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, Inter_Enclosure_Angles_deg, Rigging_Components_Material, Max_Wind_Load, preset_guide_and_matching 섹션 내 Recommended_Ratio/Minimum_Line_Length 셀(standalone point source/stage monitor 단독 2행은 두 컬럼 다 null, SB18/KS21 point source·SB18/KS21 stage monitor 4행은 Minimum_Line_Length만 null; 2행×2열+4행×1열=8건) — 18건.
**비적용**: Nominal_Impedance_Overall, RMS_Power_Handling_Overall, Peak_Power_Handling_10ms_Overall — 3건. (PA_COM_Pinout_*/Terminal_Block_Pinout_* 등 타 커넥터 고유 Key는 X15 HiQ 자신의 SpeakON_Pinout_*으로 이미 표현되어 애초에 생성하지 않음, null 목록에서 제외.)

**총계**: null 21건 (미확인 18건 + 비적용 3건). 확정적 비존재(0/No)로 명시한 항목은 2건 — Passive_Crossover_Network(No, 원문 전량 스캔 근거), Cardioid_Capability(No, 원문 전량 스캔 근거). **v1.2 정정(각주 버전 참조 최신성 감사, 2026-07-18)**: 이전까지 preset_guide_and_matching의 null 셀을 "Recommended_Ratio/Minimum_Line_Length 전 행"이라는 서술로 뭉뚱그려 총계 산정 시 1건으로만 반영해왔으나(결합형 불릿 오카운트, K1/L2/A10 Focus/X12 등 다른 파일에서도 반복된 유형), 실제로는 6개 Configuration 행 중 standalone point source/stage monitor 단독 2행은 Recommended_Ratio·Minimum_Line_Length 둘 다 null이고 나머지 4행(SB18/KS21 point source·SB18/KS21 stage monitor)은 Minimum_Line_Length만 null인 8개의 개별 null 셀이다 — 9건(단순 Key)+8건(preset 셀)=17건, 총계 12건 -> 19건으로 재계산. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — speakers 카테고리 신규 제품(X 시리즈 최초의 진짜 능동 2-way 코액시얼 포인트소스). K3_v1.6.md를 스켈레톤으로 사용, OM(X15 HiQ owner's manual EN version 2.0) + X15HiQ_AE_EN.docx 통합. 커넥터 핀아웃 표가 "2-way active enclosures"(LF+/LF-/HF+/HF- 4핀 분리)로 명시되어 기존 X8/X12/X6i/X4i/X4r(전부 단일 채널 패시브)와 근본적으로 다른 아키텍처임을 확인 — 이 카테고리에서 "X 시리즈는 대부분 패시브"라는 기존 경험적 패턴을 뒤집는 최초 예외 사례. 컴패니언 서브우퍼 SB18/KS21과의 조합 8개(point source 6개 + stage monitor 2개) 전량 delay_defaults 확보, 폴라리티 전부 이미지 렌더링으로 확인. OM/AE 간 Finish_Color 옵션 수 불일치(OM 2종 vs AE 3종) 발견 및 보존. Cardioid_Capability=No 최초 확인(자체 인클로저 기준, 컴패니언 서브우퍼의 자체 카디오이드 속성과는 별개). |
| v1.1 | Product_Series(X Series)/Product_Type(Short throw point source) 신규 Key 2건 추가 — X15_HiQ_AE_EN.docx 최상단 헤더에서 채택. 진짜 능동 아키텍처이지만 install 파생형이 아니므로 Xi Series가 아닌 X Series로 명시(사용자 지시 2026-07-17). signal_processing 섹션(CUT_Mode_Available/HFC_Function_Settings/Coupling_Function_Range, d&b 전용 개념)이 L-Acoustics 파일에 null 플레이스홀더로 잘못 추가되어 있던 것을 프로젝트 전역 동기화 라운드에서 삭제. Null Report 갱신(비적용 5건→2건, 총계 15건→12건). |
| v1.1 to v1.2 | (표기 정정, Minor) 각주 버전 참조 최신성 감사(2026-07-18)에서 preset_guide_and_matching의 Recommended_Ratio/Minimum_Line_Length 미확인이 "전 행"이라는 서술로 뭉뚱그려져 실제로는 6개 Configuration 행에 걸친 8개 개별 null 셀(standalone point source/stage monitor 단독 2행은 두 컬럼 다, SB18/KS21 조합 4행은 Minimum_Line_Length만)인데도 총계 산정 시 1건으로만 반영되어 있던 결합형 불릿 오카운트를 발견·정정. 미확인 10건→17건, 총계 12건→19건으로 재계산. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다. |
| v1.3 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-18, d&b 대량 배치 완료 후) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래, 미확인), `Peak_Power_Handling_10ms_Overall`(d&b CCL8 유래, 비적용 — RMS_Power_Handling_Overall과 동일 사유) 반영. Null Report 21건(미확인 18건+비적용 3건)으로 갱신. |
