# X4r (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(X4i의 recessed/매입형 파생형)

**스켈레톤 근거**: `speakers/LA/X4i_v1.0.md`를 뼈대로 사용 — X4r은 X4i와 음향/전기 스펙이 완전히 동일한 "recessed version"(벽/천장 매입형)이다. 원문 자체에 "recessed version"으로 명시되어 있으며, 스펙 표 수치([X4]=120Hz/116dB, [X4_60]=65Hz/110dB, 110° axisymmetric, 4"/1.4" 트랜스듀서, 밀폐형, 16Ω, screw terminal)가 X4i와 완전히 일치함을 확인했다. 차이는 전면 그릴 유무(매입형이라 별도 전면 그릴 없음), 중량(0.94kg vs 1kg), 리깅 하드웨어(X4r-inCW 매입 액세서리) 정도다. A&E 시방서는 제공되지 않아 OM(X4r owner's manual EN version 1.0) 단일 소스 기준. **원문 데이터 품질 이슈**: OM의 Loudspeaker configurations 챕터 딜레이 표가 "X4i"/"SB6i"/"SB10i" 라벨을 그대로 사용(X4i 매뉴얼에서 복사된 것으로 추정되는 라벨링 오류) — 실제로는 X4r/SB6r/SB10r을 가리키는 것으로 판단해 정정 채택.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | X4r | - |
| Model_Number | null | - |
| Product_Series | X Series | - |
| Product_Category | short throw point source (recessed version) | - |
| Product_Type | Short throw point source | - |
| Description | 2-way passive coaxial enclosure (recessed version): 4" LF neodymium cone driver + 1.4" HF diaphragm compression driver, amplified by LA2Xi / LA4X / LA7.16i / LA12X | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | EN 62368-1:2014 Audio/video, information and communication technology equipment — Part 1: Safety requirements | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: X4r_OM_EN.pdf(X4r owner's manual EN version 1.0) p.37 "X4r specifications"(A&E 시방서 미제공).
**Product_Series/Product_Type(신규 Key, 사용자 지시 2026-07-17)**: X4r 자신의 문서에는 series/type 헤더가 없어(A&E 미제공), X4i_AE_EN.docx 헤더("X4i - Short throw point source" / "X Series")를 install/recessed 상속 정책과 동일 근거로 적용(X4i와 스펙 완전 동일성 이미 확인됨).

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | [X4_60]: 65 - 20000 / [X4]: 120 - 20000 | Hz |
| Frequency_Response_6dB_Hz [2] | [X4_60]: 77 - 20000 / [X4]: 145 - 20000 | Hz |
| Frequency_Response_3dB_Hz [2] | [X4_60]: 105 - 20000 / [X4]: 180 - 20000 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Max_SPL_Peak | [X4]: 116 dB / [X4_60]: 110 dB | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | 110 (axisymmetric) | deg |
| Nominal_Directivity_Vertical | 110 (axisymmetric) | deg |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | X4, X4_60, X4_MO | - |
| Frequency_Response_4dB_Hz | null | Hz |

### 주석 및 출처 (Notes & Sources)

**출처**: X4r_OM_EN.pdf p.37 "X4r specifications"(X4i와 수치 완전 일치, 독립 확인).
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.
**Frequency_Response_6dB/3dB_Hz 미확인 사유**: A&E 시방서 미제공(X4i는 AE로 확보했으나 X4r은 OM만 제공되어 이 세부 임계값이 원문에 없음).
**Cardioid_Capability=No(확정적 비존재)**: X4r_OM_EN_1.0.pdf 전량을 "cardioid" 키워드로 스캔 — 0건 검출.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 4" neodymium cone driver | - |
| HF_Transducer | 1.4" diaphragm compression driver | - |
| LF_Acoustical_Load | closed enclosure | - |
| HF_Acoustical_Load | null | - |
| Passive_Crossover_Network | Yes | - |
| LF_Nominal_Impedance | null | Ohm |
| HF_Nominal_Impedance | null | Ohm |
| Nominal_Impedance_Overall | 16 | Ohm |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_HF | null | W |
| RMS_Power_Handling_Overall [2] | 42 | W |
| Peak_Power_Handling_10ms_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: X4r_OM_EN.pdf p.37 "X4r specifications".
**Peak_Power_Handling_10ms_Overall(신규 Key)**: d&b CCL8에서 신설된 범용 Key(10ms 피크 파워 핸들링, 업계 표준 측정 조건) — 이 제품 자신의 RMS_Power_Handling_Overall은 실값을 보유하나(X4i 상속값) 이번 일괄 동기화 라운드에서는 원본을 재조회하지 않고 소급 반영했으므로 미확인으로 유지(원본성 요건, LA12X 브릿징 Key 판단 사례와 동일 원칙).
**[2] Frequency_Response_6dB/3dB_Hz, RMS_Power_Handling_Overall = X4i 값 상속(사용자 정책 지침 2026-07-18)**: X4r 자신의 OM에는 이 수치들이 없어(A&E 미제공, OM 스펙 표에도 파워 핸들링/6dB/3dB 항목 자체가 없음) 이전에는 null로 유지했으나, install/recessed 버전이 표준형과 치수·무게·리깅 외 특이사항이 없다면 드라이버·인클로저 구성이 동일 스펙이므로 상속 가능하다는 사용자 지침에 따라 반영 — 스켈레톤 근거 각주에서 이미 X4r 자신의 스펙 표(저역한계/SPL/지향각/트랜스듀서/임피던스 전부)가 X4i와 완전히 일치함을 독립 확인했고, 차이는 전면 그릴 유무·중량·리깅 하드웨어뿐이라 이 조건을 충족 — X4i_v1.3.md의 값(Frequency_Response_6dB_Hz/3dB_Hz, RMS_Power_Handling_Overall=42W)을 채택. WEEE_Marking(양쪽 다 미확인)은 규제 마킹이라 이 정책의 적용 대상이 아님(원래도 두 파일 모두 null이라 영향 없음).

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 2-point screw terminal | - |
| Link_Connector | 1 x 2-point screw terminal | - |
| Screw_Terminal_Pinout_1 | + / - (combined LF+HF signal, internally split by passive crossover) | - |
| Screw_Terminal_Pinout_2 | Not linked | - |

### 주석 및 출처 (Notes & Sources)

**출처**: X4r_OM_EN.pdf "Connectors"("Internal pinout for L-Acoustics 2-way passive enclosures" — X4i와 동일 표 제목/구조).

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA2Xi, LA4X, LA7.16i, LA12X | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type | Passive (2-way) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: X4r_OM_EN.pdf "X4r is driven by the LA2Xi / LA4X / LA7.16i / LA12X amplified controllers".

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | 2 x M5 inserts(X4r-inCW/X-U4i 마운트용), 2 x M6 inserts(리깅 액세서리용), 1 x M6 insert(보조 안전용) | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | 0 | count |
| Weight_Net | 0.94 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: X4r_OM_EN.pdf p.37 "X4r specifications"("Rigging and handling").
**Handles=0**: X4i와 동일 사유(원문 전량 스캔, "handle" 키워드 0건) — 매입형이라 손잡이 개념 자체가 X4i보다도 더 명확히 불필요.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 116 | mm |
| Height_mm | 116 | mm |
| Depth_mm | 99 | mm |
| Dimensions_Raw [1] | 116 / 116 / 99 / 109 | mm |
| Cabinet_Material | premium grade Baltic birch plywood | - |
| Front_Material | null | - |
| Rigging_Components_Material | null | - |
| Finish_Color | dark grey brown Pantone 426 C | - |
| IP_Rating [2] | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: X4r_OM_EN.pdf p.37 "X4r specifications", "X4r dimensions"(치수 도면, X4i와 동일 수치).
**[1] Dimensions_Raw / Width·Height·Depth_mm 축 확정(재조사 완료, 2026-07-18)**: X4i와 동일 도면 수치(116/116/99/109mm). 이번에 X4r 자신의 p.38 도면(주의: OM 목차 페이지 표기와 실제 페이지가 달라 p.37이 아닌 p.38임을 재확인)을 PowerShell+Windows.Data.Pdf로 이미지 렌더링해 육안 재확인, 전면도(드라이버 노출면)에 가로 116mm(폭)·세로 116mm(높이), 측면 입면도 상단에 99mm(깊이)로 명확히 표기됨을 확인했다. 하단의 109mm는 별도 후면 박스형 구획(마운팅 브래킷 관련 부가 치수로 추정)에 표기되어 있어 깊이 값(Depth_mm)과 구분되는 부가 치수로 판단, Dimensions_Raw에만 원문 그대로 보존한다(TODO.md 치수 W/H/D 축 구분 신뢰도 감사 항목 해소).
**Front_Material 비적용 사유**: 매입형(recessed) 제품이라 전면 그릴/패브릭 스펙이 원문 표에서 아예 빠짐(X4i는 "coated steel grill, acoustically neutral 3D fabric" 명시) — X4r은 스크린/커버 액세서리(X4r-inCW 등)가 별도이며 인클로저 자체 스펙에는 전면 마감이 없음.
**Finish_Color 단순화**: X4i는 3가지 마감(dark grey brown/pure white/custom RAL)을 제공하나 X4r은 원문에 "dark grey brown Pantone 426 C" 1가지만 명시 — 매입형이라 마감 옵션이 적은 것으로 판단, 원문 그대로 채택(임의로 추가하지 않음).
**[2] IP_Rating 조건부**: OM 각주 2 "When integrated in-wall or in-ceiling with screen and connector sealing plate" — X4i와 유사하나 매입 시공 자체가 조건.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| X4r standalone (고SPL) | [X4] | 120 - 20000 | null | null |
| X4r with SB6r, closely coupled(200Hz) | [X4] + [SB6_200] | 32 - 20000 | 1 X4r : 1 SB6r | null |
| X4r with SB6r, coupled(100Hz) | [X4] + [SB6_100] | 29 - 20000 | 1 X4r : 1 SB6r | null |
| X4r with SB6r, separated(60Hz) | [X4_60] + [SB6_60] | 29 - 20000 | 2 X4r : 1 SB6r | null |
| X4r with SB10r, closely coupled(200Hz) | [X4] + [SB10_200] | 29 - 20000 | 2 X4r : 1 SB10r | null |
| X4r with SB10r, coupled(100Hz) | [X4] + [SB10_100] | 27 - 20000 | 2 X4r : 1 SB10r | null |
| X4r with SB10r, separated(60Hz) | [X4_60] + [SB10_60] | 25 - 20000 | 3 X4r : 1 SB10r | null |

### 주석 및 출처 (Notes & Sources)

**출처**: X4r_OM_EN.pdf p.17-24 "Loudspeaker configurations"("X4r point source with SB6r", "X4r point source with SB10r"). X4i와 달리 이 6개 조합 모두 원문에서 Ratio가 명시적으로 상이함을 확인(closely coupled/coupled는 1:1(SB6r)/2:1(SB10r), separated는 2:1(SB6r)/3:1(SB10r)) — X4i 파일 작성 시 SB10i 조합을 상세 조사하지 않았던 것과 달리 X4r은 6개 조합 전부 조사.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| [X4] or [X4_MO] + [SB6_200] | 0.6 | SB6r = 0 | X4r = + / SB6r = - |
| [X4] or [X4_MO] + [SB6_100] | 0 | SB6r = 0.4 | X4r = + / SB6r = + |
| [X4_60] + [SB6_60] | 1.8 | SB6r = 0 | X4r = + / SB6r = - |
| [X4] + [SB10_200] | 1.9 | SB10r = 0 | X4r = + / SB10r = - |
| [X4_MO] + [SB10_200] | 0 | SB10r = 0 | X4r = + / SB10r = + |
| [X4] or [X4_MO] + [SB10_100] | 0.8 | SB10r = 0 | X4r = + / SB10r = + |
| [X4_60] + [SB10_60] | 7.2 | SB10r = 0 | X4r = + / SB10r = - |

### 주석 및 출처 (Notes & Sources)

**출처**: X4r_OM_EN.pdf p.19-24 "Pre-alignment delays". 극성은 색상 아이콘 표기라 Windows.Data.Pdf WinRT API로 페이지 이미지 렌더링해 육안 확인. 원문 표의 "X4i"/"SB6i"/"SB10i" 라벨은 X4r/SB6r/SB10r로 정정 채택(파일 서두 "원문 데이터 품질 이슈" 참조).
**[X4_60] + [SB10_60] Polarity (v1.1 확정)**: p.24 "Separated" 섹션의 pre-alignment delay 표를 페이지 이미지로 렌더링해 육안 확인 — X4r(회색 박스) = +, SB10r(빨간 박스) = -. 같은 "separated(60Hz)" 유형인 [X4_60]+[SB6_60] 조합(X4r = + / SB6r = -)과 극성 패턴이 일치.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| all configurations | X4r-inCW, X-U4i 등 | 1 | 1 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 5:1 | - |
| Max_Wind_Load | null | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: X4r_OM_EN.pdf "Mechanical safety"(X4i와 동일 서술 — EN 62368-1, safety factor 5).

## Null Report

**미확인(정보 부족)**: Model_Number, WEEE_Marking, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, LF_Nominal_Impedance, HF_Nominal_Impedance(단일 통합값만 존재), RMS_Power_Handling_LF/HF(단일 통합값만 존재), Peak_Power_Handling_10ms_Overall, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, Inter_Enclosure_Angles_deg, Front_Material, Rigging_Components_Material, Max_Wind_Load(16건) + preset_guide_and_matching 섹션 내 Recommended_Ratio/Minimum_Line_Length 셀(standalone 1행은 두 컬럼 다 null, SB6r/SB10r 조합 6행은 Minimum_Line_Length만 null; 1행×2열+6행×1열=8건) — 24건.
**비적용**: HF_Acoustical_Load — 1건. (PA_COM_Pinout_*/SpeakON_Pinout_*/Terminal_Block_Pinout_* 등 타 커넥터 고유 Key는 X4r 자신의 Screw_Terminal_Pinout_*으로 이미 표현되어 애초에 생성하지 않음, null 목록에서 제외.)

**총계**: null 25건 (미확인 24건 + 비적용 1건). 확정적 비존재(0/No)로 명시한 항목은 1건 — Handles(0, 원문 전량 스캔 근거). **정정(각주 버전 참조 최신성 감사, 2026-07-18)**: 이전까지 preset_guide_and_matching의 null 셀을 "Minimum_Line_Length 전 행"이라는 서술로 뭉뚱그려 놓고 총계 산정 시에는 아예 반영조차 되지 않은 채 다른 14개 단순 Key 항목만으로 미확인 14건이 집계되어 있었다(결합형 불릿 오카운트, K1/L2/A10 Focus/X12/X15 HiQ/X4i 등 다른 파일에서도 반복된 유형 중 가장 심한 사례 — 이 파일은 preset 항목이 총계에 1건조차 반영되지 않았음). 실제로는 7개 Configuration 행 중 standalone 1행은 Recommended_Ratio·Minimum_Line_Length 둘 다 null이고 나머지 6행(SB6r/SB10r 조합)은 Minimum_Line_Length만 null인 8개의 개별 null 셀이다 — 14건(단순 Key)+8건(preset 셀)=22건, 총계 15건 -> 23건으로 재계산. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — speakers 카테고리(X4i의 recessed/매입형 파생형). X4i_v1.0.md를 스켈레톤으로 사용, OM(X4r owner's manual EN version 1.0) 단일 소스(A&E 시방서 미제공). 음향/전기 스펙은 X4i와 완전 동일함을 확인, 물리적 차이(전면 그릴 없음, 중량, 마감 옵션 축소)만 반영. preset_guide_and_matching/delay_defaults는 SB6r/SB10r 6개 조합(closely coupled/coupled/separated × 2 서브우퍼) 전부 원문 직접 조사로 실값 확보(극성은 PDF 페이지 이미지 렌더링, 1개 조합만 시간 배분상 미확인) — X4i보다 더 상세한 조사. 원문 딜레이 표의 "X4i/SB6i/SB10i" 라벨링 오류(X4i 매뉴얼에서 복사된 것으로 추정)를 발견하고 정정. |
| v1.1 | delay_defaults의 [X4_60]+[SB10_60] Polarity null 해소 — p.24 페이지 이미지 렌더링으로 육안 확인(X4r = +, SB10r = -). v1.0의 "시간 배분상" 미확인 사유는 SKILL v1.17 기준 금지된 null 정당화 사유이므로 제거. delay_defaults 컬럼명 K1_Delay_ms → Primary_Element_Delay_ms로 변경(2026-07-17 전 파일 공통 리네이밍 반영). |
| v1.2 | MF_Transducer/MF_Acoustical_Load/MF_Nominal_Impedance/RMS_Power_Handling_MF 4개 Key 삭제(SKILL v1.19) — 이 제품은 확인된 2-way 구조라 MF 대역 드라이버 자체가 없으므로, null 동기화 대상이 아니라 삭제 대상으로 재분류. MF_Nominal_Impedance는 미확인 목록의 결합형 "RMS_Power_Handling_LF/MF/HF/Overall" 항목과 별도 표기되어 있었으므로 실제로는 미확인 -1(18→17)만 해당 — 비적용 6건→4건은 정확했으나 미확인/총계 표기가 과다 차감(16/20건)되어 있던 것을 검증 후 정정(미확인 17건, 총계 21건). |
| v1.3 | Cardioid_Capability 신규 Key 적용(No, 원문 전량 스캔 근거). d&b 고유 signal_processing(CUT_Mode/HFC/Coupling) 섹션 삭제(사용자 지적 2026-07-18, `speakers/CLAUDE.md` 규칙 2 위반 시정). **사용자 정책 지침(2026-07-18)에 따라 Frequency_Response_6dB_Hz/3dB_Hz/RMS_Power_Handling_Overall을 X4i_v1.3.md 값으로 상속** — install/recessed 버전이 표준형과 치수·무게·리깅 외 특이사항이 없다면 드라이버·인클로저 구성이 동일 스펙이므로 상속 허용(X4r 자신의 스켈레톤 근거 각주로 이미 스펙 완전 동일성 확인됨). WEEE_Marking은 양쪽 다 미확인이라 영향 없음. Null Report 17건(미확인)→14건으로 감소. Product_Series/Product_Type 신규 Key는 다음 라운드 예정(미적용). |
| v1.4 | 치수 W/H/D 축 구분 신뢰도 감사(TODO.md, 2026-07-18) — A&E 시방서 미제공으로 축 확정 근거가 약했던 Width/Height/Depth_mm을 p.38 도면(OM 목차 표기 p.37과 실제 페이지 불일치 재확인) PowerShell+Windows.Data.Pdf 이미지 렌더링으로 육안 재확인, 기존 값(116/116/99mm)이 정확함을 확정(변경 없음, 각주만 보강). (표기 정정) 각주 버전 참조 최신성 감사(2026-07-18)에서 Null Report의 preset_guide_and_matching 결합형 불릿 오카운트를 발견·정정 — 7개 Configuration 행에 걸친 8개 개별 null 셀(standalone 1행은 두 컬럼 다, SB6r/SB10r 조합 6행은 Minimum_Line_Length만)이 총계에 전혀 반영되지 않고 있던 것을 확인, 미확인 14건→22건, 총계 15건→23건으로 재계산. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다. |
| v1.5 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-18, d&b 대량 배치 완료 후) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래, 미확인), `Peak_Power_Handling_10ms_Overall`(d&b CCL8 유래, 미확인) 반영. Null Report 25건(미확인 24건+비적용 1건)으로 갱신. |
