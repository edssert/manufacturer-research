# A10i Focus (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(A10 Focus의 install 파생형)

**스켈레톤 근거**: `speakers/LA/A10_Focus_v1.0.md`를 뼈대로 사용 — A10i Focus는 A10 Focus와 동일 아키텍처(단일 채널 패시브 크로스오버, 10° 고정 인클로저 각도)이나 커넥터가 speakON이 아닌 **4-point terminal block**(push-in)이며 앰프 호환성이 LA4X/LA8/LA12X가 아닌 **LA1.16i/LA2Xi/LA4X/LA7.16i/LA12X**(5종)로 확장된다. A10i Focus/Wide 별도 파일 분리는 A10과 동일 원칙(사용자 지시 2026-07-17).

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | A10i Focus | - |
| Model_Number | null | - |
| Product_Series | A Series Install | - |
| Product_Category | medium throw line source (installation version) | - |
| Product_Type | Constant Curvature Line Source | - |
| Description | 2-way passive constant curvature WST 10° enclosure (installation version): 10" LF cone driver + 2.5" HF diaphragm compression driver, amplified by LA1.16i / LA2Xi / LA4X / LA7.16i / LA12X | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | 2006/42/EC Machinery Directive (rigging system, designed per BGV-C1 guidelines) | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: A10i_AE_EN.docx("A10i Focus" 섹션); A10i_OM_EN.pdf(A10i owner's manual EN version 5.0) p.157 "A10i Focus specifications".
**Product_Series/Product_Type(신규 Key, 사용자 지시 2026-07-17, 2026-07-18 재정의)**: A10i_AE_EN.docx 최상단 헤더("A10i - Medium throw line source" / "A Series Install" / "Incremental coverage with **fixed** inter-element angles") — install 파생형은 "A Series"가 아닌 "A Series Install"로 별도 표기됨(A10 Focus/Wide의 "A Series"와 구분, 원문 그대로 채택). Product_Type은 "fixed inter-element angles"를 근거로 "Constant Curvature Line Source"로 재정의(사용자 지적 2026-07-18, 상세 근거는 A10_Focus_v1.4.md 참조).

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | 66 - 20000 | Hz |
| Frequency_Response_6dB_Hz | 70 - 20000 | Hz |
| Frequency_Response_3dB_Hz | 75 - 20000 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak [1] | 140 dB(LA2Xi bridge/LA4X/LA7.16i/LA12X) / 136 dB(LA2Xi) / 135 dB(LA1.16i bridge) | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | 10 (enclosure) / 70-110 symmetric or 90 asymmetric (L-Fins) | deg |
| Nominal_Directivity_Vertical | 10 | deg |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | A10, A10_FI, A10_MO | - |

### 주석 및 출처 (Notes & Sources)

**Cardioid_Capability=No(확정적 비존재)**: A10i_OM_EN_5.0.pdf/A10i_AE_EN.docx 전량을 "cardioid" 키워드로 스캔 — A10i Focus 자신에 대한 언급 0건, 검출된 언급은 전부 컴패니언 서브우퍼(SB18 IIi/KS21i 등)의 반전 배치 프리셋·전용 액세서리(KS21i-SCREEN 등) 안내뿐.

**출처**: A10i_AE_EN.docx "Technical requirements"; A10i_OM_EN.pdf p.157 "A10i Focus specifications".
**[1] Max_SPL_Peak 앰프별 3단계**: A10(단일값 140dB)과 달리 A10i는 앰프 조건별 3개 값을 명시 — 전부 보존.
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 10" cone driver | - |
| HF_Transducer | 2.5" diaphragm compression driver, neodymium | - |
| LF_Acoustical_Load | bass-reflex, L-Vents | - |
| HF_Acoustical_Load | DOSC waveguide, L-Fins | - |
| Passive_Crossover_Network | Yes | - |
| LF_Nominal_Impedance | null | Ohm |
| HF_Nominal_Impedance | null | Ohm |
| Nominal_Impedance_Overall | 8 | Ohm |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_HF | null | W |
| RMS_Power_Handling_Overall | 296 | W |
| Peak_Power_Handling_10ms_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: A10i_AE_EN.docx "Technical requirements"; A10i_OM_EN.pdf p.21 "Connectors", p.157 "A10i Focus specifications".
**Peak_Power_Handling_10ms_Overall(신규 Key)**: d&b CCL8에서 신설된 범용 Key(10ms 피크 파워 핸들링, 업계 표준 측정 조건) — 이 제품 자신의 RMS_Power_Handling_Overall은 실값을 보유하나 이번 일괄 동기화 라운드에서는 원본을 재조회하지 않고 소급 반영했으므로 미확인으로 유지(원본성 요건, LA12X 브릿징 Key 판단 사례와 동일 원칙).

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 4-point terminal block with push-in connection + connector sealing plate with cable gland | - |
| Link_Connector | 1 x 4-point terminal block with push-in connection + connector sealing plate with cable gland | - |
| Terminal_Block_Pinout_1 | + / - (combined LF+HF signal, internally split by passive crossover) | - |
| Terminal_Block_Pinout_2 | Not linked | - |

### 주석 및 출처 (Notes & Sources)

**출처**: A10i_OM_EN.pdf p.21 "Connectors"("Internal pinout for L-Acoustics 2-way passive enclosures" — A10i Wide/Focus 공용 표).

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA1.16i, LA2Xi, LA4X, LA7.16i, LA12X | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type | Passive (2-way) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: A10i_OM_EN.pdf "The A10i Wide/Focus enclosures are driven by the LA1.16i / LA2Xi / LA4X / LA7.16i / LA12X amplified controllers".

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | external rigging kits; M6 inserts(rigging plates), M8 inserts(A10-Ui), 4 M6 inserts(rigging accessory), 1 DIN580-compatible M8 insert(secondary safety) | - |
| Inter_Enclosure_Angles_deg | 10 | deg |
| Handles | null | count |
| Weight_Net | 19 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: A10i_OM_EN.pdf p.157 "A10i Focus specifications".
**Handles 미확인 사유**: A10(2개 명시)와 달리 A10i 스펙 표에 핸들 개수 없음 — 설치용 제품이라 별도 손잡이가 없을 가능성이 있으나 확정적 서술 부재로 미확인.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 569 | mm |
| Height_mm | 350 | mm |
| Depth_mm | 339 | mm |
| Dimensions_Raw [1] | 569 / 350 / 339 / 366 / 294 / 367 | mm |
| Cabinet_Material | premium grade Baltic beech and birch plywood | - |
| Front_Material | coated steel grill, acoustically neutral 3D fabric | - |
| Rigging_Components_Material | null | - |
| Finish_Color | dark grey brown Pantone 426 C, pure white RAL 9010, custom RAL code on special order | - |
| IP_Rating | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: A10i_AE_EN.docx "Physical data" - "Dimensions (W, H, D): 569 mm, 350 mm, 339 mm"; A10i_OM_EN.pdf p.157 "A10i Focus dimensions"(치수 도면).
**[1] Dimensions_Raw**: 도면 6개 숫자 중 569/350/339는 AE와 일치, 나머지(366/294/367)는 부가 치수.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| A10i Focus line source (단독) | [A10] | 66 - 20000 | null | null |
| A10i Focus line source element (단일) | [A10_FI] | 66 - 20000 | null | null |
| A10i Focus with KS21i [1] | [A10] + [KS21_100] | 31 - 20000 | 1 A10i Focus : 1 KS21i | null |

### 주석 및 출처 (Notes & Sources)

**출처**: A10i_OM_EN.pdf p.51-53 "Loudspeaker configurations"("A10i Wide/Focus line source", "...line source with low-frequency element").
**[1] 배치 간격**: coupled(2:1) 최대 1.7m 또는 separated(1:1) 조건 — 대표 1:1 비율 채택.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| [A10] or [A10_FI] or [A10_MO] + [KS21_100] | 0 | KS21i = 0 | A10i Focus = + / KS21i = + |
| [A10] or [A10_FI] + [KS21_100_C] | 5.5 | KS21i = 0 | A10i Focus = + / KS21i = + |
| [A10] or [A10_FI] + [KS21_100_Cx] | 0 | KS21i = 0 | A10i Focus = + / KS21i = + |

### 주석 및 출처 (Notes & Sources)

**출처**: A10i_OM_EN.pdf p.53 "Pre-alignment delays". 극성은 색상 아이콘 표기라 Windows.Data.Pdf WinRT API로 페이지 이미지 렌더링해 육안 확인(KS21i는 모든 조합에서 "+"로 일관, KS28/KS21 계열과 달리 반전이 필요 없음).
**원문 라벨 정정**: 원문 표는 "A10 Wide/Focus"/"KS21"로 표기(i 접미사 누락, A10 매뉴얼에서 복사된 것으로 추정) — A10i Focus/KS21i로 정정 채택(X4r에서 확인된 동일 라벨링 관행).

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| vertical array | A10i-BUMP + rigging plates | 8 | 8 |
| vertical array | A10-Ui | 1 | 1 |
| vertical array | A10-Ui + A10i-ULINK II | 2 | 2 |
| vertical array with pullback | A10i-BUMP + rigging plates + A10i-RIGBAR | 12 | 12 |
| vertical array with pullback | A10i-RIGBAR x2 + rigging plates | 12 | 12 |
| stacked vertical array | Ai-FIXBRACKET + rigging plates | 4 | 4 |
| stacked vertical array with angle adjustment | A10i-TILTBRACKET + rigging plates | 4 | 4 |
| stacked on KS21i [1] | Ai-FIXBRACKET + rigging plates | 4 A10i Focus | 4 KS21i |
| stacked on KS21i, angle adjustment [1] | Ai-FIXBRACKET + A10i-TILT + rigging plates | 4 A10i Focus | 4 KS21i |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 4:1 | - |
| Max_Wind_Load | null | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: A10i_OM_EN.pdf p.49-50 "Mechanical safety"("2006/42/EC Machinery Directive", "safety factor of 4"). A10i-BUMP+rigging plates+A10i-RIGBAR 행은 원문 "A10i Wide: 8 / A10i Focus: 12 / A10i Wide/Focus: 12"에서 A10i Focus 값(12) 채택.
**[1] KS21i 스택 구성**: "4 KS21i / 4 A10i Wide/Focus" 원문 표기 — 제품 구분 없이 공통값(4/4)이라 Focus/Wide 동일 채택.
**Max_Wind_Load 미확인 사유**: 원문 전량 검색으로도 미발견(A10과 달리 이 수치는 별도 챕터에 없거나 발견되지 않음).
**벽/천장 마운트 구성 생략**: 원문에 Wall-mounted(horizontal/vertical)/Ceiling-mounted 조합도 있으나(A10-Ui/A10i-ULINK II 등, 값은 1~2) 대표적인 vertical array/stacked 구성 위주로 채택하고 이들은 생략(값 자체는 위 vertical array 행들과 대체로 중복).

## Null Report

**미확인(정보 부족)**: Model_Number, WEEE_Marking, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, LF_Nominal_Impedance, HF_Nominal_Impedance(단일 통합값만 존재), RMS_Power_Handling_LF/HF(단일 통합값만 존재), Peak_Power_Handling_10ms_Overall, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, Handles, Rigging_Components_Material, Max_Wind_Load, preset_guide_and_matching 섹션 내 Recommended_Ratio/Minimum_Line_Length 셀(3개 Configuration 행 중 단독/단일 엘리먼트 2행은 두 컬럼 다 null, KS21i 조합 1행은 Minimum_Line_Length만 null; 2행×2열+1행×1열=5건) — 20건.
**비적용**: 없음 — 0건. (PA_COM_Pinout_*/SpeakON_Pinout_* 등 타 커넥터 고유 Key는 A10i Focus 자신의 Terminal_Block_Pinout_*으로 이미 표현되어 애초에 생성하지 않음, null 목록에서 제외.)

**총계**: null 20건 (미확인 20건 + 비적용 0건). 확정적 비존재(0/No)로 명시한 항목은 0건. (v1.1: delay_defaults와 mechanical_safety를 "시간 배분상 미확인"으로 방치하지 않고 원문(OM p.49-53) 직접 조사로 실값 채움 — 사용자 피드백 2026-07-17.) **v1.5 정정(각주 버전 참조 최신성 감사, 2026-07-18)**: 이전까지 preset_guide_and_matching의 null 셀을 "Recommended_Ratio 2행/Minimum_Line_Length 전 행"이라는 서술로 열거는 정확히 했으나(2행+3행=5셀), 총계 산정 시 이 서술 전체를 단일 불릿 1건으로만 반영해왔다(결합형 불릿 오카운트, K1/L2 등 다른 파일에서도 반복된 유형) — 실제로는 3개 Configuration 행 중 2행은 두 컬럼 다 null이고 1행은 Minimum_Line_Length만 null인 5개의 개별 null 셀이다. 13건(단순 Key)+5건(preset 셀)=18건, 총계 14건 -> 18건으로 재계산. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — speakers 카테고리(A10 Focus의 install 파생형). A10_Focus_v1.0.md를 스켈레톤으로 사용, A10i_AE_EN.docx("A10i Focus" 섹션) + A10i_OM_EN.pdf(A10i Wide/Focus 공용 매뉴얼) 통합. 커넥터(terminal block), 앰프 호환성 확장(LA1.16i/LA7.16i 추가), 앰프별 3단계 Max SPL 확인. 남은 대량 제품 처리 일정상 preset_guide_and_matching/delay_defaults/mechanical_safety 상세는 A10 대비 축소(핵심 스펙 위주로 우선 확보). |
| v1.1 | 사용자 피드백(2026-07-17) — "시간 배분상 미확인" 플레이스홀더를 원문(A10i_OM_EN.pdf p.49-53) 직접 조사로 교체. KS21i 조합 delay 3건(극성은 PDF 페이지 이미지 렌더링, KS21i는 전 조합 "+"로 일관 확인) 및 mechanical_safety 9개 구성 실값 확보. 원문 딜레이 표의 "A10 Wide/Focus"/"KS21" 라벨(i 접미사 누락) 정정 채택. |
| v1.2 | delay_defaults 표의 컬럼명 `K1_Delay_ms`를 `Primary_Element_Delay_ms`로 전면 개명(SKILL v1.18) — 값 변경 없음(사용자 지적 2026-07-17). |
| v1.3 | MF_Transducer/MF_Acoustical_Load/MF_Nominal_Impedance/RMS_Power_Handling_MF 4개 Key 삭제(SKILL v1.19) — 이 제품은 확인된 2-way 구조라 MF 대역 드라이버 자체가 없으므로, null 동기화 대상이 아니라 삭제 대상으로 재분류(K1 v1.4의 기존 반대 판단을 뒤집는 정책 변경, GSL의 Front_LF_Transducer와 동일 원칙 적용). MF_Nominal_Impedance가 미확인 목록의 결합형 "RMS_Power_Handling_LF/MF/HF" 항목과 별도 표기되어 있어 실제 삭제분은 미확인 -1(15→14)/비적용 -2(5→3)임을 검증 후 Null Report 수치 정정. |
| v1.4 | Cardioid_Capability 신규 Key 적용(No). d&b 고유 signal_processing 섹션 삭제(사용자 지적 2026-07-18). Product_Series/Product_Type 신규 Key 적용 — Series="A Series Install", Type="Constant Curvature Line Source"(AE 헤더 5번째 줄 "fixed inter-element angles" 근거, 사용자 지적 2026-07-18로 재정의 — 상세는 A10_Focus_v1.4.md 참조). |
| v1.4 to v1.5 | (표기 정정, Minor) 각주 버전 참조 최신성 감사(2026-07-18)에서 preset_guide_and_matching의 null 셀 서술("Recommended_Ratio 2행/Minimum_Line_Length 전 행")이 열거 자체는 정확했음에도 총계 산정 시 이 서술 전체가 단일 불릿 1건으로만 반영되어 있던 결합형 불릿 오카운트를 발견·정정(K1_v1.11.md/L2_v1.7.md와 동일 유형) — 실제로는 3개 Configuration 행 중 2행(두 컬럼 다 null)+1행(Minimum_Line_Length만 null)=5개의 개별 null 셀. 미확인 14건→18건, 총계 14건→18건으로 재계산. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다. |
| v1.6 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-18, d&b 대량 배치 완료 후) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래, 미확인), `Peak_Power_Handling_10ms_Overall`(d&b CCL8 유래, 미확인) 반영. Null Report 20건(미확인 20건+비적용 0건)으로 갱신. |
