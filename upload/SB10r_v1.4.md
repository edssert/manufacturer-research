# SB10r (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 4(SB10i의 recessed/매입형 파생형, 신규 제품 최초 투입)

**스켈레톤 근거**: `speakers/LA/SB10i_v1.0.md`를 뼈대로 사용 — SB10r은 원문이 명시적으로 "SB10r is the recessed version of the SB10i enclosure"라 서술하는 매입형 파생품(SB6r/SB6i 관계와 동일 패턴)이며, 스펙 표 핵심 수치(저역한계/Max SPL: 25Hz/119dB, 27Hz/122dB, 29Hz/124dB — 3개 프리셋 전부, 앰프 모드별 이원 구조 포함)가 SB10i와 완전히 일치함을 SB10r 자신의 OM(p.45)에서 직접 확인했다. A&E 시방서는 제공되지 않아 OM(SB10r owner's manual EN version 1.1) 단일 소스 기준.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | SB10r | - |
| Model_Number | null | - |
| Product_Series | null | - |
| Product_Category | ultra-compact subwoofer (recessed version) | - |
| Product_Type | Subwoofer | - |
| Description | Ultra-compact subwoofer (recessed version): 1 x 10" direct-radiating cone driver, amplified by LA2Xi / LA4X / LA7.16i / LA12X | - |
| Way_Count | 1 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | EN 62368-1: 2014 Audio/video, information and communication technology equipment - Part 1: Safety requirements (rigging system) | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB10r_OM_EN.pdf(SB10r owner's manual EN version 1.1) p.45 "SB10r specifications"(A&E 시방서 미제공), p.17 "Mechanical safety"(Compliance_Standards, SB10i와 동일하게 SB10r 자신의 원문에서 "EN 62368-1: 2014"로 독립 확인 — SB6r처럼 형제 제품 값을 유추하지 않음).
**Product_Series/Product_Type(신규 Key, 사용자 지시 2026-07-17)**: SB10r 자신의 문서에는 series/type 헤더가 없어(A&E 미제공), SB10i_AE_EN.docx 헤더("SB10i - Subwoofer")를 install/recessed 상속 정책과 동일 근거로 적용 — Product_Type="Subwoofer", Product_Series는 SB10i도 null이라 상속할 값 자체가 없어 null.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz [1] | [SB10_60]: 25 - null / [SB10_100]: 27 - null / [SB10_200]: 29 - null | Hz |
| Frequency_Response_6dB_Hz [3] | [SB10_60]: 27-64 / [SB10_100]: 30-96 / [SB10_200]: 32-125 | Hz |
| Frequency_Response_3dB_Hz [3] | [SB10_60]: 30-55 / [SB10_100]: 33-80 / [SB10_200]: 35-87 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak [2] | [SB10_60]: 119 dB / [SB10_100]: 122 dB / [SB10_200]: 124 dB (LA2Xi bridge mode/LA4X/LA7.16i/LA12X); [SB10_60]: 119 dB / [SB10_100]: 120 dB / [SB10_200]: 122 dB (LA2Xi single-ended) | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | null | deg |
| Nominal_Directivity_Vertical | null | - |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | SB10_60, SB10_100, SB10_200 | - |

### 주석 및 출처 (Notes & Sources)

**Cardioid_Capability=No(확정적 비존재)**: SB10r_OM_EN_1.1.pdf(단일 소스, A&E 미제공) 전량을 "cardioid" 키워드로 스캔 — 0건 검출, SB6i/SB10i와 동일 근거.

**출처**: SB10r_OM_EN.pdf p.11 "Preset description", p.18 "Loudspeaker configurations"("Low frequency limit (-10 dB)"), p.45 "SB10r specifications".
**[1] Usable_Bandwidth_Hz 상한 미확인**: OM 스펙 표(p.45)와 p.18 표 모두 "Low frequency limit (-10 dB)"만 제공하고 상한(예: 118Hz, 180Hz)을 명시하지 않음 — SB10i는 자체 A&E 시방서로 상한 및 -6dB/-3dB 세부값을 확보했으나, SB10r은 A&E 미제공이라 원문에 없는 수치를 SB10i에서 끌어와 채우지 않음(SB10i와 저역한계·Max SPL이 완전히 동일하다는 사실은 SB10r 자신의 OM으로 확인되었으나, 상한/중간 dB 임계값까지 동일하다고 단정할 근거는 SB10r 자신의 문서에 없음 — SB6r과 동일한 "미확인 원본성 요건" 적용).
**[2] Max_SPL_Peak**: SB10r 자신의 OM 스펙 표(p.45)가 SB10i와 동일한 앰프 모드별 이원 구조(LA2Xi 브릿지/LA4X/LA7.16i/LA12X 공통값 vs LA2Xi 단독모드)를 독립적으로 명시 — SB10i에서 끌어온 값이 아니라 SB10r 자신의 문서에서 재확인한 값.
**[3] Frequency_Response_6dB_Hz/3dB_Hz = SB10i 값 상속(사용자 정책 지침 2026-07-18)**: install/recessed 버전이 표준형과 치수·무게·리깅 외 특이사항이 없다면 드라이버·인클로저 구성이 동일 스펙이므로 상속 가능하다는 사용자 지침에 따라 SB10i_v1.1.md 값 채택 — SB10r 자신의 스켈레톤 근거 각주 및 [1]/[2]에서 이미 SB10i와의 스펙 완전 동일성(저역한계/Max SPL 3개 프리셋+앰프모드 이원 구조 전부)이 독립 확인되어 있어 이 정책의 전제 조건 충족. RMS_Power_Handling_LF도 동일 근거로 상속(각주 [4] 참조).
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 1 x 10" cone driver | - |
| LF_Acoustical_Load | bass-reflex, L-Vents | - |
| Passive_Crossover_Network | No | - |
| LF_Nominal_Impedance | 8 | Ohm |
| Nominal_Impedance_Overall | null | Ohm |
| RMS_Power_Handling_LF [4] | 146 | W |
| RMS_Power_Handling_Overall | null | W |
| Peak_Power_Handling_10ms_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: SB10r_OM_EN.pdf p.45 "SB10r specifications".
**[4] RMS_Power_Handling_LF = SB10i 값 상속(사용자 정책 지침 2026-07-18)**: SB10i는 자체 A&E로 146W를 확보했으나 SB10r은 A&E 미제공에 OM 스펙 표(p.45)에도 파워 핸들링 항목 자체가 없어 v1.0에서는 미확인 유지했음 — install/recessed 상속 정책에 따라 SB10i_v1.1.md 값(146W) 채택. RMS_Power_Handling_Overall은 SB10i 자신도 이 Key가 구조적 비적용(LF 단일값 형태로만 보고)이므로 상속 대상 없음(계속 null).
**Peak_Power_Handling_10ms_Overall(신규 Key)**: d&b CCL8에서 신설된 범용 Key — RMS_Power_Handling_Overall과 동일 사유로 비적용.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 4-point terminal block with push-in connection | - |
| Link_Connector | null | - |
| Terminal_Block_Pinout_1 | + / - | - |
| Terminal_Block_Pinout_2 | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB10r_OM_EN.pdf p.11 "Connectors"("Internal pinout for L-Acoustics subwoofers" — SB10i와 동일 구조), p.42-43 "Cabling SB10r".
**Link_Connector 미확인 사유**: SB10i와 동일 — 별도 LINK 커넥터 없이 단일 4-point 터미널 블록의 두 번째 케이블 글랜드 홀로 병렬 연결.

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA2Xi, LA4X, LA7.16i, LA12X | - |
| Max_Enclosures_Per_Controller_Output [1] | LA2Xi: 2(SE)/1(BTL), LA4X: 2, LA7.16i: 2, LA12X: 3 | count |
| Max_Enclosures_Per_Controller_Total [1] | LA2Xi: 8(SE)/2(BTL), LA4X: 8, LA7.16i: 32, LA12X: 12 | count |
| Crossover_Type | Active (1-way, subwoofer) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB10r_OM_EN.pdf p.40 "Enclosure drive capacity per amplified controller"("The SB10r subwoofer is driven by the LA2Xi / LA4X / LA7.16i / LA12X amplified controllers").
**[1] Max_Enclosures_Per_Controller**: SB10r 자신의 OM이 SB10i와 수치까지 동일한 앰프별 표를 독립적으로 제공(SB10i 값을 차용한 것이 아니라 SB10r 자신의 p.40에서 재확인). 각주 원문: "For passive loudspeakers, the value corresponds to the number of enclosures in parallel on the output."

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | 12 x M6 threaded inserts for rigging accessories | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles [1] | 0 | count |
| Weight_Net | 13 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: SB10r_OM_EN.pdf p.45 "SB10r specifications"("Rigging and handling"), p.51 "Specifications for custom rigging"("SB10r has 12 threaded M6 inserts available for rigging"). SB10i(14kg)보다 가벼움(13kg) — 매입형이라 전면 그릴 등 일부 부품이 없는 것으로 추정.
**[1] Handles 확정적 비존재(0)**: SB10r_OM_EN.txt 전량을 "handle" 키워드로 검색한 결과 0건 검출 — 별도 손잡이 없음, 확정적 비존재로 처리.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 539 | mm |
| Height_mm | 547 | mm |
| Depth_mm | 169 | mm |
| Dimensions_Raw | 539 / 547 / 169 | mm |
| Cabinet_Material | premium grade Baltic birch plywood | - |
| Front_Material | null | - |
| Rigging_Components_Material [1] | high grade steel with anti-corrosion coating (SB10r-inW/-inC); steel with anti-corrosion coating (SB10r-Screen/-Tilescreen) | - |
| Finish_Color | dark grey brown Pantone 426 C | - |
| IP_Rating [2] | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB10r_OM_EN.pdf p.45 "SB10r specifications"/"SB10r dimensions"(치수 도면), p.46-49 "SB10r-inW/-inC/-Screen/-Tilescreen specifications".
**[1] Width/Height/Depth_mm 축 확정(재조사 완료, 2026-07-18)**: A&E 시방서 미제공이라 문서 간 교차 확인은 불가했으나, p.45 도면을 PowerShell+Windows.Data.Pdf로 이미지 렌더링해 육안 확인 — 전면도(우퍼 콘 노출면)에 가로 539mm(폭)·세로 547mm(높이), 하단 측면 입면도에 169mm(깊이)로 각 치수선이 명확히 표기되어 있어 축 대응을 직접 확정했다(TODO.md 치수 W/H/D 축 구분 신뢰도 감사 항목 해소).
**Dimensions 비고**: 도면이 539mm(폭)/547mm(높이)/169mm(깊이)로 각각 명확히 라벨링되어(A&E 부재로 확정 W/H/D 비교 불가) SB10i(539x539mm 정사각형)와 달리 폭≠높이 — SB10r 고유의 매입형 프레임 형상 차이로 판단.
**Front_Material 비적용 사유**: 매입형(recessed) 제품이라 전면 그릴/패브릭 스펙이 원문 표에서 빠짐(SB6r/X4r과 동일 패턴).
**[1] Rigging_Components_Material**: SB10r 전용 리깅 액세서리 4종의 재질을 원문에서 개별 확인 — SB10r-inW/SB10r-inC는 "high grade steel with anti-corrosion coating"(p.46, p.47), SB10r-Screen/SB10r-Tilescreen은 "steel with anti-corrosion coating"(p.48, p.49)으로 표기가 다름(고급 대 일반 강재) — SB6r에서는 미확인이었으나 SB10r은 원문에 액세서리별 재질표가 별도로 존재해 실값 확보.
**[2] IP_Rating 조건부**: OM 각주 2 "When integrated in-wall or in-ceiling with screen and connector sealing plate."

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| SB10r standard configuration | [SB10_60] / [SB10_100] / [SB10_200] | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: OM 자신의 스펙 표에 저역한계만 있고 전체 대역 범위(상한 포함)가 없어 Frequency_Range_10dB_Hz를 채울 수 없음. X6i/X8i/X4i 계열과의 조합 데이터는 SB10r 자신의 문서에서 별도 확인하지 못함(X-시리즈 매뉴얼에는 "SB10i(r)" 표기로 SB10i와 SB10r을 함께 지칭하는 조합 프리셋이 있으나, SB10r 자신의 문서에는 상세 조합표가 없음).

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유(조사 완료 후 확정)**: SB10i와 동일한 구조적 이유 — SB10r은 항상 2차 엘리먼트로만 등장. X6i/X8i/X4i 매뉴얼의 "SB10i(r)" 표기가 SB10i와 SB10r을 공용으로 다루는 것으로 보이나(즉, X-시리즈 파일의 SB10i 명의 딜레이 값은 SB10r에도 동일 적용될 가능성이 있음), 정확한 SB10r 전용 딜레이 값은 SB10r 자신의 원본 문서(p.18 "Loudspeaker configurations")에 "Refer to the Preset Guide to obtain the pre-alignment delay values" 안내만 있을 뿐 실제 수치/극성 표가 없어 이 파일에서는 미확인으로 유지.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| in-wall | SB10r-inW + SB10r-Screen | 1 | 1 |
| in-ceiling | SB10r-inC + SB10r-Screen | 1 | 1 |
| in-tile | SB10r-Tilescreen | 1 | 1 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 5:1 | - |
| Max_Wind_Load [1] | null | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: SB10r_OM_EN.pdf p.17 "Mechanical safety"("The deployments described in this manual achieve a safety factor of 5").
**Safe_Limit/Maximum_Limit 표기**: 원문 표(p.17)에서 in-wall/in-ceiling/in-tile 3개 행이 "safe/maximum limit" 열 값 "1"을 세로 병합 셀로 공유 — PDF 페이지 이미지 렌더링으로 병합 셀 확인(pdftotext -layout에서는 in-ceiling 행에만 "1"이 표시되고 in-wall/in-tile 행은 공백으로 추출되어 텍스트만으로는 오인 가능했던 부분) — 3개 행 모두 1/1로 채택.
**[1] Max_Wind_Load 미확인 사유**: SB10r_OM_EN.txt 전량을 "bft"/"beaufort"/"wind" 키워드로 검색한 결과 0건 검출(SB10i는 6 bft 명시와 대조) — SB10r은 in-wall/in-ceiling/in-tile 매입형 전용 구조로 옥외/그라운드스택 등 풍하중이 문제되는 배치 시나리오 자체가 없어 원문에 언급이 없는 것으로 추정되나, 명시적 "not applicable" 서술이 없어 확정적 비적용으로 단정하지 않고 미확인으로 유지.

## Null Report

**미확인(정보 부족)**: Model_Number, WEEE_Marking, Usable_Bandwidth_Hz(상한), Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, Nominal_Directivity_Horizontal_deg, Nominal_Directivity_Vertical, Link_Connector, Terminal_Block_Pinout_2, preset_guide_and_matching(Frequency_Range_10dB_Hz/Recommended_Ratio/Minimum_Line_Length), delay_defaults(전 항목), Max_Wind_Load — 14건.
**비적용**: Nominal_Impedance_Overall, RMS_Power_Handling_Overall, Peak_Power_Handling_10ms_Overall, Inter_Enclosure_Angles_deg, Front_Material — 5건. (PA_COM_Pinout_*/SpeakON_Pinout_* 등 타 커넥터 고유 Key는 SB10r 자신의 Terminal_Block_Pinout_*으로 이미 표현되어 애초에 생성하지 않음, null 목록에서 제외. MF_*/HF_* 8개 Key는 LF 전용 서브우퍼 구조상 애초에 생성하지 않음.)

**총계**: null 19건 (미확인 14건 + 비적용 5건). 확정적 비존재(0/No)로 명시한 항목은 2건 — Passive_Crossover_Network(No), Handles(0, 원본 전량 검색 결과 'handle' 키워드 0건 검출).

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — speakers 카테고리 Phase 4(SB10i의 recessed/매입형 파생형, 신규 제품 최초 투입). SB10i_v1.0.md를 스켈레톤으로 사용, OM(SB10r owner's manual EN version 1.1) 단일 소스(A&E 시방서 미제공). 스펙 표 핵심 수치(저역한계/Max SPL, 앰프 모드별 이원 구조, Max_Enclosures_Per_Controller, Compliance_Standards)가 SB10i와 완전 동일함을 SB10r 자신의 OM으로 각각 독립 재확인. A&E 부재로 대역 상한/RMS 파워 핸들링/X-시리즈 조합 데이터는 SB10i에서 끌어오지 않고 정직하게 미확인으로 유지(SKILL "미확인 원본성 요건" 준수, SB6r과 동일 원칙). mechanical_safety 표의 병합 셀(safe/maximum limit=1, 3개 행 공유)을 pdftotext 텍스트만으로는 오인할 뻔했으나 PDF 페이지 이미지 렌더링으로 정확히 확인. Rigging_Components_Material은 SB6r과 달리 액세서리별(SB10r-inW/-inC vs -Screen/-Tilescreen) 재질표가 원문에 있어 실값 확보. |
| v1.1 | Cardioid_Capability 신규 Key 적용(No, 원문 전량 스캔 근거). d&b 고유 signal_processing(CUT_Mode/HFC/Coupling) 섹션 삭제(사용자 지적 2026-07-18, `speakers/CLAUDE.md` 규칙 2 위반 시정). **사용자 정책 지침(2026-07-18)에 따라 Frequency_Response_6dB_Hz/3dB_Hz/RMS_Power_Handling_LF를 SB10i_v1.1.md 값으로 상속**(146W 등) — install/recessed 버전이 표준형과 치수·무게·리깅 외 특이사항이 없다면 드라이버·인클로저 구성이 동일 스펙이므로 상속 허용(스켈레톤 근거 각주로 스펙 완전 동일성 이미 확인됨). RMS_Power_Handling_Overall은 SB10i 자신도 구조적 비적용이라 상속 대상 없음. Null Report 16건(미확인)→13건으로 감소. Product_Series/Product_Type 신규 Key는 다음 라운드 예정(미적용). |
| v1.2 | 치수 W/H/D 축 구분 신뢰도 감사(TODO.md, 2026-07-18) — A&E 시방서 미제공으로 축 확정 근거가 약했던 Width/Height/Depth_mm을 p.45 도면 PowerShell+Windows.Data.Pdf 이미지 렌더링으로 육안 재확인, 기존 값(539/547/169mm)이 정확함을 확정(변경 없음, 각주만 보강). |
| v1.4 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-18, d&b 대량 배치 완료 후) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래, 미확인), `Peak_Power_Handling_10ms_Overall`(d&b CCL8 유래, 비적용) 반영. Null Report 19건(미확인 14건+비적용 5건)으로 갱신. |
