# A15i Wide (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(A15i Focus의 30° 자매품)

**스켈레톤 근거**: `speakers/LA/A15i_Focus_v1.0.md`를 뼈대로 사용 — A15 Wide/Focus와 동일 관계.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | A15i Wide | - |
| Model_Number | null | - |
| Product_Series | A Series Install | - |
| Product_Category | medium throw line source (installation version) | - |
| Product_Type | Constant Curvature Line Source | - |
| Description | 2-way passive constant curvature WST 30° enclosure (installation version): 15" LF cone driver + 3" HF diaphragm compression driver, amplified by LA2Xi / LA4X / LA7.16 / LA7.16i / LA12X | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | 2006/42/EC Machinery Directive (rigging system, designed per BGV-C1 guidelines) | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: A15i_AE_EN.docx("A15i Wide" 섹션); A15i_OM_EN.pdf(A15i owner's manual EN version 5.1) p.147 "A15i Wide specifications".
**Product_Series/Product_Type(신규 Key, 사용자 지시 2026-07-17, 2026-07-18 재정의)**: A15i_AE_EN.docx 최상단 헤더("A15i - Medium throw line source" / "A Series Install") — A15i Focus와 공용 AE, 동일 헤더. Product_Type은 "fixed inter-element angles"를 근거로 "Constant Curvature Line Source"로 재정의(사용자 지적 2026-07-18, 상세 근거는 A10_Focus_v1.4.md 참조).

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | 42 - 20000 | Hz |
| Frequency_Response_6dB_Hz | 47 - 20000 | Hz |
| Frequency_Response_3dB_Hz | 52 - 19000 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak | 141 dB(LA2Xi bridge/LA4X/LA7.16/LA7.16i/LA12X) / 136 dB(LA2Xi) | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | 30 (enclosure) / 70-110 symmetric or 90 asymmetric (L-Fins) | deg |
| Nominal_Directivity_Vertical | 30 | deg |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | A15, A15_FI, A15_MO | - |

### 주석 및 출처 (Notes & Sources)

**Cardioid_Capability=No(확정적 비존재)**: A15i_OM_EN_5.1.pdf/A15i_AE_EN.docx 전량을 "cardioid" 키워드로 스캔 — A15i Wide 자신에 대한 언급 0건, 검출된 언급은 전부 컴패니언 서브우퍼(SB18 IIi/KS21i 등)의 반전 배치 프리셋·전용 액세서리 안내뿐.

**출처**: A15i_AE_EN.docx "Technical requirements"; A15i_OM_EN.pdf p.147 "A15i Wide specifications"(정확한 페이지 번호는 인접 Focus 표(p.145) 기준 추정).
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 15" cone driver | - |
| HF_Transducer | 3" diaphragm compression driver, neodymium | - |
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

**출처**: A15i_AE_EN.docx "Technical requirements"; A15i_OM_EN.pdf "A15i Wide specifications".
**Peak_Power_Handling_10ms_Overall(신규 Key)**: d&b CCL8에서 신설된 범용 Key(10ms 피크 파워 핸들링, 업계 표준 측정 조건) — 이 제품 자신의 RMS_Power_Handling_Overall은 실값을 보유하나 이번 일괄 동기화 라운드에서는 원본을 재조회하지 않고 소급 반영했으므로 미확인으로 유지(원본성 요건, LA12X 브릿징 Key 판단 사례와 동일 원칙).

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 4-point terminal block with push-in connection | - |
| Link_Connector | 1 x 4-point terminal block with push-in connection | - |
| Terminal_Block_Pinout_1 | + / - (combined LF+HF signal, internally split by passive crossover) | - |
| Terminal_Block_Pinout_2 | Not linked | - |

### 주석 및 출처 (Notes & Sources)

**출처**: A15i_OM_EN.pdf "Connectors"(A15i Wide/Focus 공용 표).

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA2Xi, LA4X, LA7.16, LA7.16i, LA12X | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type | Passive (2-way) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: A15i_OM_EN.pdf "The A15i Wide/Focus enclosures are driven by the LA2Xi / LA4X / LA7.16 / LA7.16i / LA12X amplified controllers".

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | external rigging kits; M6 inserts(rigging plates), M8 inserts(A15KS-Ui), 4 M6 inserts(rigging accessory), 1 DIN580-compatible M8 insert(secondary safety) | - |
| Inter_Enclosure_Angles_deg | 30 | deg |
| Handles | null | count |
| Weight_Net | 29 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: A15i_OM_EN.pdf "A15i Wide specifications". AE_EN.docx도 동일하게 29kg 명시(A15i Focus의 AE/OM 충돌과 달리 여기는 일치).

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 752 | mm |
| Height_mm | 424 | mm |
| Depth_mm | 494 | mm |
| Dimensions_Raw [1] | 752 / 424 / 180 / 494 | mm |
| Cabinet_Material | premium grade Baltic beech and birch plywood | - |
| Front_Material | coated steel grill, acoustically neutral 3D fabric | - |
| Rigging_Components_Material | null | - |
| Finish_Color | dark grey brown Pantone 426 C, pure white RAL 9010, custom RAL code on special order | - |
| IP_Rating | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: A15i_AE_EN.docx "Physical data" - "Dimensions (W, H/h, D): 752 mm, 424 mm/180 mm, 494 mm".
**[1] Height 이중 표기**: A15 Wide와 동일 사유(웨지형 인클로저 앞/뒤 높이 424mm/180mm).

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| A15i Wide line source (단독) | [A15] | 42 - 20000 | null | null |
| A15i Wide line source element (단일) | [A15_FI] | 43 - 20000 | null | null |
| A15i Wide with KS21i | [A15] + [KS21_60] | 29 - 20000 | 1 A15i Wide : 1 KS21i | null |

### 주석 및 출처 (Notes & Sources)

**출처**: A15i_OM_EN.pdf p.47-50 "Loudspeaker configurations"(A15i Focus와 동일 구조 공유).

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| [A15] or [A15_FI] or [A15_MO] + [KS21_60] | 0 | KS21i = 2.3 | A15i Wide = + / KS21i = + |
| [A15] or [A15_FI] + [KS21_60_C] | 9 | KS21i = 0 | A15i Wide = + / KS21i = - |
| [A15] or [A15_FI] + [KS21_60_Cx] | 8 | KS21i = 0 | A15i Wide = + / KS21i = + |

### 주석 및 출처 (Notes & Sources)

**출처**: A15i_OM_EN.pdf p.49-50 "Pre-alignment delays"(A15i Focus와 공용 표, 동일 수치). 극성은 A15i Focus와 동일 페이지에서 이미지 렌더링으로 확인.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| vertical array | A15i-BUMP + M-BARi (optional) + rigging plates | 8 | 8 |
| vertical array | A15KS-Ui | 1 | 1 |
| vertical array | A15KS-Ui + A15i-ULINK II | 2 | 2 |
| vertical array with pullback | A15i-BUMP + rigging plates + A15i-RIGBAR | 6 | 6 |
| vertical array with pullback | A15i-RIGBAR x2 + rigging plates | 8 | 8 |
| stacked vertical array | Ai-FIXBRACKET + rigging plates | 4 | 4 |
| stacked vertical array with angle adjustment | A15i-TILTBRACKET + rigging plates | 4 | 4 |
| stacked on KS21i, pullback | A15i-BUMP + A15i-TILT (optional) + rigging plates + A15i-RIGBAR | 4 A15i Wide | 4 KS21i |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 4:1 | - |
| Max_Wind_Load | null | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: A15i_OM_EN.pdf p.44-45 "Mechanical safety"(A15i Focus와 공용 챕터).
**A15i-BUMP+rigging plates+A15i-RIGBAR 행**: 원문 "A15i Wide: 6 / A15i Focus: 12 / A15i Wide/Focus: 12"에서 A15i Wide 값(6) 채택(Focus의 12와 다름).

## Null Report

**미확인(정보 부족)**: Model_Number, WEEE_Marking, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, LF_Nominal_Impedance, HF_Nominal_Impedance(단일 통합값만 존재), RMS_Power_Handling_LF/HF(단일 통합값만 존재), Peak_Power_Handling_10ms_Overall, Max_Enclosures_Per_Controller_Output, Max_Enclosures_Per_Controller_Total, Handles, Rigging_Components_Material, Max_Wind_Load, preset_guide_and_matching(Recommended_Ratio null 2행 + Minimum_Line_Length null 전 3행 = 5건: A15i Wide 단독/line source element 2개 Configuration 행은 Recommended_Ratio·Minimum_Line_Length 둘 다 null, A15i Wide+KS21i 행은 Minimum_Line_Length만 null) — 20건.
**비적용**: 없음 — 0건. (PA_COM_Pinout_*/SpeakON_Pinout_* 등 타 커넥터 고유 Key는 A15i Wide 자신의 Terminal_Block_Pinout_*으로 이미 표현되어 애초에 생성하지 않음, null 목록에서 제외.)

**총계**: null 20건 (미확인 20건 + 비적용 0건). 확정적 비존재(0/No)로 명시한 항목은 0건. (v1.1: delay_defaults와 mechanical_safety를 원문 직접 조사로 실값 채움 — 사용자 피드백 2026-07-17.) **v1.5 정정(2026-07-18, 각주 버전 참조 최신성 감사 중 발견)**: 이전까지 preset_guide_and_matching의 Recommended_Ratio/Minimum_Line_Length 미확인을 "Minimum_Line_Length 전 행"이라는 서술로만 표기(Recommended_Ratio가 2개 행에서도 null이라는 사실이 누락됨)하고 총계 산정 시 1건으로만 반영해왔으나(결합형 불릿 오카운트, K1/L2 등 다른 파일에서도 반복된 유형), 실제로는 Recommended_Ratio null 2개 + Minimum_Line_Length null 3개 = 5개의 개별 null 셀이다 — 미확인 14건→18건, 총계 14건→18건으로 재계산. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — speakers 카테고리(A15i Focus의 30° 자매품). A15i_Focus_v1.0.md를 스켈레톤으로 사용, A15i_AE_EN.docx("A15i Wide" 섹션) + A15i_OM_EN.pdf(공용 매뉴얼) 통합. |
| v1.1 | 사용자 피드백(2026-07-17) — delay_defaults/mechanical_safety/preset_guide_and_matching을 원문 직접 조사로 실값 채움(A15i Focus v1.1과 동일 라운드). A15i Wide 고유값(A15i-BUMP+rigging plates+A15i-RIGBAR=6)을 Focus(12)와 구분해 반영. |
| v1.2 | delay_defaults 표의 컬럼명 `K1_Delay_ms`를 `Primary_Element_Delay_ms`로 전면 개명(SKILL v1.18) — 값 변경 없음(사용자 지적 2026-07-17). |
| v1.3 | MF_Transducer/MF_Acoustical_Load/MF_Nominal_Impedance/RMS_Power_Handling_MF 4개 Key 삭제(SKILL v1.19) — 이 제품은 확인된 2-way 구조라 MF 대역 드라이버 자체가 없으므로, null 동기화 대상이 아니라 삭제 대상으로 재분류(K1 v1.4의 기존 반대 판단을 뒤집는 정책 변경, GSL의 Front_LF_Transducer와 동일 원칙 적용). MF_Nominal_Impedance가 미확인 목록의 결합형 "RMS_Power_Handling_LF/MF/HF" 항목과 별도 표기되어 있어 실제 삭제분은 미확인 -1(15→14)/비적용 -2(5→3)임을 검증 후 Null Report 수치 정정. |
| v1.4 | Cardioid_Capability 신규 Key 적용(No). d&b 고유 signal_processing 섹션 삭제(사용자 지적 2026-07-18). Product_Series/Product_Type 신규 Key 적용 — Series="A Series Install", Type="Constant Curvature Line Source"(상세는 A10_Focus_v1.4.md 참조). |
| v1.4 to v1.5 | (표기 정정, Minor) 각주 버전 참조 최신성 감사(2026-07-18)에서 preset_guide_and_matching의 Recommended_Ratio/Minimum_Line_Length 미확인이 "Minimum_Line_Length 전 행"이라는 서술로 뭉뚱그려져(Recommended_Ratio가 2개 행에서도 null이라는 사실이 누락된 채) 실제로는 5개의 개별 null 셀(Recommended_Ratio 2개+Minimum_Line_Length 3개)인데도 총계 산정 시 1건으로만 반영되어 있던 결합형 불릿 오카운트를 발견·정정(K1_v1.11.md/L2_v1.7.md와 동일 유형). 미확인 14건→18건, 총계 14건→18건으로 재계산. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다. |
| v1.6 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-18, d&b 대량 배치 완료 후) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래, 미확인), `Peak_Power_Handling_10ms_Overall`(d&b CCL8 유래, 미확인) 반영. Null Report 20건(미확인 20건+비적용 0건)으로 갱신. |
