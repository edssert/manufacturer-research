# 5XT (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(동일 브랜드 이기종 — X 시리즈/점음원)

**스켈레톤 근거**: `speakers/LA/X8_v1.2.md`를 뼈대로 사용 — 5XT는 X8과 마찬가지로 **2-way 패시브 크로스오버**(단일 speakON 채널, 인클로저 내부에서 LF/HF 분리, 임피던스/파워핸들링 통합값)를 가진 동축(coaxial) 점음원 스피커다(자체 커넥터 핀아웃 표 "Internal pinout for L-Acoustics 2-way passive enclosures"로 X8과 동일 구조 확인). X8과의 차이점: (1) 5XT는 X8보다 한 단계 더 작은 초소형 제품(5" LF+1" HF, 정육면체 165×165×165mm 캐비닛)이며, (2) speakON 외에 **2x2-point screw terminal**이 IN/LINK 겸용 대체 커넥터로 추가 제공되고(Soka/Sokar의 Terminal_Block_Pinout과 별개의 독자 방식 — screw terminal이 speakON과 병렬 배선되어 상호 대체 가능), (3) 리깅 방식이 인클로저 내장 나사산 인서트(X8의 M10)가 아닌 전용 ETR5 U-브라켓 1종(M6 인서트 2개)+마이크스탠드 인서트(3/8")뿐이다.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | 5XT | - |
| Model_Number | null | - |
| Product_Series | X Series | - |
| Product_Category | short throw point source | - |
| Product_Type | Short throw point source | - |
| Description | 2-way passive coaxial enclosure: 5" LF cone driver + 1" HF diaphragm, amplified by LA2Xi / LA4X / LA8 / LA12X | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | EN 62368-1:2014 Audio/video, information and communication technology equipment — Part 1: Safety requirements | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: 5XT_OM_EN_4.0.pdf(5XT owner's manual EN version 4.0) p.39 "5XT specifications", p.13 "Mechanical safety"; 5XT_AE_EN.docx.
**Product_Series/Product_Type(신규 Key, 사용자 지시 2026-07-17)**: 5XT_AE_EN.docx 최상단 헤더("5XT - Short throw point source" / "X Series")에서 채택.
**WEEE_Marking 미확인**: X8과 달리 5XT 자신의 OM/AE 전량 검색으로도 WEEE 마킹 관련 서술 미발견(X15 HiQ와 달리 이 제품엔 해당 챕터 자체가 없음) — 구조적 부재로 판단.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | [5XT]: 95 - 20000 | Hz |
| Frequency_Response_6dB_Hz | 105 - 20000 | Hz |
| Frequency_Response_3dB_Hz | 115 - 20000 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak | 121 | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg [1] | 110 (axisymmetric) | deg |
| Nominal_Directivity_Vertical [1] | 110 (axisymmetric) | deg |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | 5XT, 5XT_MO | - |

### 주석 및 출처 (Notes & Sources)

**출처**: 5XT_OM_EN_4.0.pdf p.6("110° axisymmetric"), p.39 "5XT specifications"; 5XT_AE_EN.docx "Technical requirements"(6dB/3dB 임계값 출처).
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.
**[1] Nominal_Directivity axisymmetric**: X8과 동일 사유 — 점음원 동축 드라이버 구조라 수평/수직 구분 없이 축대칭 단일값(110°)으로 보고됨, Horizontal/Vertical 두 Key 모두 동일값 채택.
**Cardioid_Capability=No(확정적 비존재)**: 5XT_OM_EN_4.0.pdf/5XT_AE_EN.docx 전량을 "cardioid" 키워드로 스캔 — 5XT 자신의 인클로저에 대한 언급은 0건(컴패니언 서브우퍼 SB15m/SB10i와의 조합에서 [xxxx_xx_C]/[xxxx_xx_Cx] 프리셋으로 서브우퍼 자신의 array-based 카디오이드 구성은 가능하나, 이는 SB15m/SB10i 자신의 속성이지 5XT의 속성이 아니므로 이 Key에는 영향 없음, X15 HiQ와 동일 처리).

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 1 x 5" cone driver | - |
| HF_Transducer | 1 x 1" diaphragm compression driver | - |
| LF_Acoustical_Load | bass-reflex | - |
| HF_Acoustical_Load | null | - |
| Passive_Crossover_Network | Yes | - |
| LF_Nominal_Impedance | null | Ohm |
| HF_Nominal_Impedance | null | Ohm |
| Nominal_Impedance_Overall | 16 | Ohm |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_HF | null | W |
| RMS_Power_Handling_Overall | 66 | W |
| Peak_Power_Handling_10ms_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: 5XT_OM_EN_4.0.pdf p.39 "5XT specifications"; 5XT_AE_EN.docx "Technical requirements"(RMS_Power_Handling_Overall=66W은 OM 표에 없고 AE에만 명시, "Calculated using the mean impedance measured on the usable bandwidth" 조건부).
**Peak_Power_Handling_10ms_Overall(신규 Key)**: d&b CCL8에서 신설된 범용 Key(10ms 피크 파워 핸들링, 업계 표준 측정 조건) — 이 제품 자신의 RMS_Power_Handling_Overall은 실값을 보유하나 이번 일괄 동기화 라운드에서는 원본을 재조회하지 않고 소급 반영했으므로 미확인으로 유지(원본성 요건, LA12X 브릿징 Key 판단 사례와 동일 원칙).
**Nominal_Impedance_Overall=16Ω**: X8(8Ω)/X15 HiQ와 다른 값 — 5XT 자신의 문서 그대로 채택, 다른 X 시리즈 제품과 임의로 통일하지 않음.
**Passive_Crossover_Network=Yes/통합값**: X8과 동일 구조 — speakON 2채널 중 1채널만 신호를 나름, HF_Acoustical_Load는 원문에 LF만 별도 명시되고 HF는 언급 없어 null 유지(X8과 달리 5XT는 원문 자체에 웨이브가이드 서술 없음).

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 4-point speakON + 2-point screw terminal(IN/LINK 겸용, speakON과 병렬 배선) | - |
| Link_Connector | 1 x 4-point speakON + 2-point screw terminal(IN/LINK 겸용, speakON과 병렬 배선) | - |
| SpeakON_Pinout_1 | + / - (combined LF+HF signal, internally split by passive crossover) | - |
| SpeakON_Pinout_2 | Not linked | - |
| Screw_Terminal_Pinout | IN+ / IN- (IN과 LINK 겸용, speakON과 전기적으로 동일 신호를 병렬로 나름) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: 5XT_OM_EN_4.0.pdf p.11 "Connectors"("The 5XT is a 2-way passive enclosure equipped with two 4-point speakON connectors wired in parallel and 2 screw terminals... Each screw terminal acts as IN and LINK. SpeakON connectors can be used interchangeably as IN or LINK connectors."); "Internal pinout for L-Acoustics 2-way passive enclosures" 표(speakON 1+/1-=+/-, 2+/2-=Not linked).
**AE와의 커넥터 서술 불일치**: 5XT_AE_EN.docx "Connectors: 2 x 4-point speakON"로 screw terminal을 언급하지 않음 — OM이 더 상세하므로 OM 우선 채택, screw terminal은 OM 고유 서술로 보존.
**Screw_Terminal_Pinout 신규 도입**: Soka/Sokar의 Terminal_Block_Pinout(4-point push-in, LF/HF 별도 채널)과 달리, 5XT의 screw terminal은 2-point뿐이며 speakON 채널과 동일한 단일 신호(+/-)를 병렬로 나르는 대체 접속 수단 — 별개 Key로 신설(브랜드 고유 물리 커넥터 개념, 다른 제품에 null 동기화하지 않음).

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA2Xi, LA4X, LA8, LA12X | - |
| Max_Enclosures_Per_Controller_Output | LA2Xi=4(SE) / LA4X=4 / LA8=6 / LA12X=6 | count |
| Max_Enclosures_Per_Controller_Total | LA2Xi=16(SE) / LA4X=16 / LA8=24 / LA12X=24 | count |
| Crossover_Type | Passive (2-way) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: 5XT_OM_EN_4.0.pdf p.27 "Enclosure drive capacity per amplified controller" 표.
**LA2Xi=SE만 표기**: 원문 표에 "LA2Xi" 열 아래 "4/16(SE)" 단일 값만 존재 — Soka 등 타 제품에서 흔한 SE/BTL 이중 모드 구분(예: "4(SE)/2(BTL)")이 이 표에는 없음, BTL 모드 값은 원문 전량 검색으로도 미발견(구조적 부재로 판단, 임의 추정하지 않음). X8/X15 HiQ와 달리 5XT는 LA2Xi도 호환 앰프 목록에 포함(더 소형 제품이라 저용량 앰프도 지원하는 것으로 추정).

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | 2 x M6 insert(측면, ETR5 U-브라켓 전용) + 1 x 3/8" insert(하단, 마이크스탠드용) | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | 0 | count |
| Weight_Net | 3.5 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: 5XT_OM_EN_4.0.pdf p.12 "Rigging system description"("5XT features one M6 insert and screw on each side to connect ETR5. One 3/8" microphone-stand insert is available on the bottom face"); p.39 "5XT specifications"("Weight (net): 3.5 kg").
**Handles=0(확정적 비존재)**: 원문 "Rigging and handling" 항목에 핸들 서술 자체가 없음(X8=1개, SB15m=2개와 대조) — 초소형 제품 특성상 손잡이가 물리적으로 없는 것으로 판단, 전량 검색으로 확인.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 165 | mm |
| Height_mm | 165 | mm |
| Depth_mm | 165 | mm |
| Dimensions_Raw [1] | 165 / 165 / 165 | mm |
| Cabinet_Material | premium grade Baltic birch plywood | - |
| Front_Material [2] | steel with anti-corrosion coating | - |
| Rigging_Components_Material | null | - |
| Finish_Color | dark grey brown Pantone 426 C, pure white RAL 9010, custom RAL code on special order | - |
| IP_Rating [3] | IP30 / IP54 (5XT-SEALPLATE 장착+하향 20°이상 틸트 시) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: 5XT_AE_EN.docx "Physical data" - "Dimensions (W, H, D): 165 mm, 165 mm, 165 mm"(A&E 명시적 축 라벨링으로 확정, TODO.md 치수 감사 기준 (1) 충족); 5XT_OM_EN_4.0.pdf p.39 "5XT dimensions" 도면(단일 숫자 "165 mm"만 표기, AE의 3축 동일값과 일치 확인).
**[1] Dimensions_Raw=165/165/165(정육면체)**: 도면에 숫자가 1개("165mm")만 있는 이유는 3축이 전부 동일한 정육면체 캐비닛이라 하나의 치수로 충분하기 때문 — AE의 "(W, H, D): 165, 165, 165"와 정확히 일치해 축 구분 모호성 자체가 없는 예외적으로 신뢰도 높은 사례(TODO.md의 W/H/D 축 구분 신뢰도 문제와 무관, 3축 값이 동일해 오분류 가능성이 구조적으로 없음).
**[2] Front_Material 소스 간 표현 차이**: OM 스펙표는 "steel with anti-corrosion coating"(도장 처리)이나 AE 서술문은 "protected by a coated steel grill"(그릴) — 동일 부품을 다르게 서술, OM 표를 채택하고 AE 표현을 각주 보존(X15 HiQ와 동일 유형의 소스 간 표현 차이).
**[3] IP_Rating**: 원문 "IP30 / IP54 with optional connector sealing plate and a down-tilt angle of 20° and more" — 별매 5XT-SEALPLATE 장착 및 20°이상 하향 틸트 조건에서만 IP54(X8의 조건 없는 고정 IP43과 다른 조건부 등급 구조, GSL8/GSL12의 조건부 IP 표기 관례와 유사).

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| 5XT point source (단독) | [5XT] | 95 - 20000 | null | null |
| 5XT point source with SB15m | [5XT] + [SB15_100] | 40 - 20000 | 1 5XT : 1 SB15m | null |
| 5XT point source with SB10i | [5XT] + [SB10_100] | 27 - 20000 | 1 5XT : 1 SB10i | null |
| 5XT stage monitor (단독) | [5XT_MO] | 95 - 20000 | null | null |
| 5XT stage monitor with SB15m | [5XT_MO] + [SB15_100] | 40 - 20000 | 1 5XT : 1 SB15m | null |
| 5XT stage monitor with SB10i | [5XT_MO] + [SB10_100] | 27 - 20000 | 1 5XT : 1 SB10i | null |

### 주석 및 출처 (Notes & Sources)

**출처**: 5XT_OM_EN_4.0.pdf p.13-18 "Loudspeaker configurations"("5XT point source" / "5XT point source with low-frequency element" — SB15m p.14, SB10i p.15 / "5XT stage monitor" / "5XT stage monitor with low-frequency element" — SB15m p.17, SB10i p.18) 전량 조사.
**저지연 모니터 모드**: [5XT_MO] 프리셋은 3.84ms→1.18ms(LA8)/0.84ms(LA2Xi/LA4X/LA12X)로 지연시간을 줄이는 저지연 동작 모드 사용(X8/X15 HiQ와 동일 개념, 다만 5XT는 LA2Xi도 저지연 대상에 포함).

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| [5XT] + [SB15_100] | 없음(No pre-alignment delay values required) | 없음 | 없음 |
| [5XT] + [SB10_100] | 0 | SB10i = 1.6 | 5XT = + / SB10i = − |
| [5XT_MO] + [SB15_100] | 0.2 | SB15m = 0 | 5XT = + / SB15m = + |
| [5XT_MO] + [SB10_100] | 0 | SB10i = 1.6 | 5XT = + / SB10i = − |

### 주석 및 출처 (Notes & Sources)

**출처**: 5XT_OM_EN_4.0.pdf p.14("No pre-alignment delay values are required for this configuration" — SB15m point source 조합), p.15(SB10i point source), p.17(SB15m stage monitor), p.18(SB10i stage monitor) "Pre-alignment delays" 표 — 딜레이 수치는 텍스트로 확인, Polarity는 3개 페이지(15/17/18) 전부 PowerShell+Windows.Data.Pdf로 이미지 렌더링해 회색 "+"/빨간 "-" 아이콘을 전부 육안 확인. [5XT]+[SB15_100] 조합은 원문 자체가 딜레이값이 필요 없다고 명시(AutoConnect류와 유사하게 값 자체가 존재하지 않는 구조적 비적용, Syva 전례와 동일 처리).
**SB10i 조합은 point source/stage monitor 공용**: "[5XT] or [5XT_MO] + [SB10_100]" 원문 표기 그대로 — 동일 딜레이값이 두 구성 모두에 적용됨(X8/SB15m 조합과 달리 이 조합은 구성 무관 단일 값).

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| wall-mounted / ceiling-mounted | ETR5 | 1 | 1 |
| pole-mounted | microphone stand | 1 | 1 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 5:1 | - |
| Max_Wind_Load | 6 | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: 5XT_OM_EN_4.0.pdf p.13 "Mechanical safety"("The deployments described in this manual achieve a safety factor of 5"); Safety 섹션("If the wind force exceeds 6 bft...").
**flown/ground-stacked 구성 없음**: X8(5가지 구성: wall/ceiling/flown/pole/ground-stacked)과 달리 5XT는 원문 표에 wall-mounted/ceiling-mounted(ETR5 공용 1행)와 pole-mounted 2행만 존재 — 초소형 제품이라 플라잉/그라운드스택 구성 자체가 원문에 없는 것으로 판단, 임의로 행을 추가하지 않음.

## Null Report

**미확인(정보 부족)**: Model_Number, WEEE_Marking, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, LF_Nominal_Impedance, HF_Nominal_Impedance(단일 통합값만 존재), RMS_Power_Handling_LF/HF(단일 통합값만 존재), Peak_Power_Handling_10ms_Overall, Inter_Enclosure_Angles_deg, Rigging_Components_Material, preset_guide_and_matching 섹션 내 Recommended_Ratio/Minimum_Line_Length 셀(6개 Configuration 행 중 point source 단독/stage monitor 단독 2행은 두 컬럼 다 null, 나머지 SB15m/SB10i 조합 4행은 Minimum_Line_Length만 null; 2행×2열+4행×1열=8건) — 20건.
**비적용**: HF_Acoustical_Load — 1건. (PA_COM_Pinout_*/Terminal_Block_Pinout_* 등 타 커넥터 고유 Key는 5XT 자신의 SpeakON_Pinout_*/Screw_Terminal_Pinout으로 이미 표현되어 애초에 생성하지 않음, null 목록에서 제외.)

**총계**: null 21건 (미확인 20건 + 비적용 1건). 확정적 비존재(0/No)로 명시한 항목은 2건 — Handles(0, 원문 전량 검색 근거), Cardioid_Capability(No, 원문 전량 스캔 근거). Passive_Crossover_Network는 "Yes"로 실값 확보. **v1.2 정정(각주 버전 참조 최신성 감사, 2026-07-18)**: 이전까지 preset_guide_and_matching의 null 셀을 "Minimum_Line_Length 전 행"이라는 서술로 뭉뚱그려 총계 산정 시 1건으로만 반영해왔으나(결합형 불릿 오카운트, K1/L2 등 다른 파일에서도 반복된 유형), 실제로는 6개 Configuration 행 중 2행은 Recommended_Ratio·Minimum_Line_Length 둘 다 null이고 나머지 4행은 Minimum_Line_Length만 null인 8개의 개별 null 셀이다 — 10건(단순 Key)+8건(preset 셀)=18건으로 재계산, 총계 12건 -> 19건. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — speakers 카테고리 신규 제품(X 시리즈 최소형 점음원, 정육면체 동축 스피커). X8_v1.2.md를 스켈레톤으로 사용, OM(5XT owner's manual EN version 4.0) + 5XT_AE_EN.docx 통합. 2-way 패시브 코액시얼(X8과 동일 구조), speakON 외 2-point screw terminal 병렬 대체 커넥터 신규 확인(신규 Key `Screw_Terminal_Pinout` 도입), 정육면체 캐비닛(165×165×165mm, AE 명시 축 라벨링과 도면 단일 숫자가 완전 일치하는 신뢰도 최고 사례) 확인. 컴패니언 서브우퍼 SB15m/SB10i와의 조합 4개(point source 2개+stage monitor 2개) 전부 원문 직접 조사, 폴라리티 3개 페이지 전부 이미지 렌더링으로 확인. [5XT]+[SB15_100] 조합은 원문이 "딜레이값 불필요"로 명시한 구조적 비적용 사례로 처리(Syva AutoConnect 전례와 동일 원칙). Cardioid_Capability=No(원문 전량 스캔 0건). Handles=0(확정적 비존재, 원문 전량 검색). Max_Enclosures_Per_Controller 표에서 LA2Xi는 SE 모드 값만 존재(BTL 값 원문 부재, 임의 추정하지 않음). |
| v1.1 | Product_Series(X Series)/Product_Type(Short throw point source) 신규 Key 2건 추가(5XT_AE_EN.docx 최상단 헤더에서 채택, 사용자 지시 2026-07-17). signal_processing 섹션(CUT_Mode_Available/HFC_Function_Settings/Coupling_Function_Range, d&b 전용 개념)이 L-Acoustics 파일에 null 플레이스홀더로 잘못 추가되어 있던 것을 프로젝트 전역 동기화 라운드에서 삭제. Null Report 갱신(비적용 4건→1건, 총계 15건→12건). |
| v1.1 to v1.2 | (표기 정정, Minor) 각주 버전 참조 최신성 감사(2026-07-18)에서 preset_guide_and_matching의 null 셀이 "Minimum_Line_Length 전 행"이라는 서술로 뭉뚱그려져 실제로는 6개 Configuration 행에 걸친 8개 개별 null 셀(단독 구성 2행은 Recommended_Ratio·Minimum_Line_Length 둘 다, SB15m/SB10i 조합 4행은 Minimum_Line_Length만)인데도 총계 산정 시 1건으로만 반영되어 있던 결합형 불릿 오카운트를 발견·정정(K1_v1.11.md/L2_v1.7.md와 동일 유형). 미확인 11건→18건, 총계 12건→19건으로 재계산. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다. |
| v1.3 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-18, d&b 대량 배치 완료 후) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래, 미확인), `Peak_Power_Handling_10ms_Overall`(d&b CCL8 유래, 미확인) 반영. Null Report 21건(미확인 20건+비적용 1건)으로 갱신. |
