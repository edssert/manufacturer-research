# Syva (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(신규 제품, S Series 대표 colinear source)

**스켈레톤 근거**: `speakers/LA/Soka_v1.0.md`를 뼈대로 사용 — Syva는 Soka와 같은 "colinear source" 폼팩터(세로형 컬럼, 2-way 패시브 단일채널)이자 medium throw(35m) 카테고리이나, (1) 크기가 더 크고(6x5"+3x1.75" vs Soka의 9x3.5"+3x1"), (2) 자체 OM이 "S Series"로 명명된 신규 제품군(Soka와 별개 라인, Syva Low/Syva Sub 전용 컴패니언 서브우퍼 보유), (3) 입력 커넥터가 speakON/screw terminal/AutoConnect 3종 중 택1(Soka는 terminal block 단일), (4) Compliance_Standards가 2006/42/EC Machinery Directive(Soka는 EN 62368-1:2014)로 상이 — 아키텍처는 Syva 자신의 OM/AE에서 독립 판정했다. Syva Low/Syva Sub는 물리적으로 별개 제품(자체 OM 스펙 표/치수 도면 보유, GSL8/GSL12 분리 전례와 동일 원칙)이라 `Syva_Low_v1.0.md`/`Syva_Sub_v1.0.md`로 별도 파일 분리.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | Syva | - |
| Model_Number | null | - |
| Product_Series | S Series | - |
| Product_Category | medium throw colinear source | - |
| Product_Type | Medium throw colinear source | - |
| Description | 2-way passive enclosure: 6 x 5" LF/MF cone drivers + 3 x 1.75" HF diaphragm compression drivers, amplified by LA2Xi / LA4X / LA7.16i / LA12X | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | 2006/42/EC Machinery Directive (rigging system, designed per BGV-C1 guidelines) | - |
| WEEE_Marking | Yes (EU) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Syva_OM_EN.pdf(Syva owner's manual EN version 2.0) p.7 "Syva Colinear Source", p.70 "Syva specifications", p.4 "Safety > Instructions"(Compliance_Standards/WEEE_Marking); Syva_AE_EN.docx.
**Product_Series/Product_Type(신규 Key, 사용자 지시 2026-07-17)**: Syva_AE_EN.docx 최상단 헤더("Syva - Medium throw colinear source" / "S Series")에서 채택 — Soka(동일 colinear 계열이나 시리즈명 없음)와 대조적으로 Syva 계열(Syva/Syva Low/Syva Sub)은 전부 "S Series" 명시.
**Description "LF/MF" 병기**: OM 자신의 문서 내부에서 이 6x5" 드라이버를 두 곳이 서로 다르게 명명하는 내부 불일치를 발견 — 스펙 표의 "Description" 행은 "6 × 5" **LF**"로, 같은 표의 "Transducers" 행은 "**MF**: 6 × 5" cone drivers"로 명명(AE 시방서도 "MF transducer"로 서술, OM 내부 표기와 일치). Soka(OM 전체가 일관되게 "LF"만 사용)와 달리 Syva는 OM 자기 자신 안에서도 명명이 갈려, 어느 한쪽을 정답으로 채택하지 않고 Description Key에 "LF/MF" 병기, transducers 섹션에는 다수 표기(Transducers 행="MF")를 채택 후 각주로 충돌 보존.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | [SYVA]: 87 - 20000 | Hz |
| Frequency_Response_6dB_Hz | [SYVA]: 92 - 20000 | Hz |
| Frequency_Response_3dB_Hz | [SYVA]: 102 - 20000 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak [1] | 137 dB (with LA2Xi bridge mode/LA4X/LA12X) / 130 dB (with LA2Xi) | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | 140 | deg |
| Nominal_Directivity_Vertical | +5/-21 | deg |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | SYVA | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Syva_OM_EN.pdf p.70 "Syva specifications", p.25 "Syva colinear source"; Syva_AE_EN.docx "Technical requirements".
**[1] Max_SPL_Peak 앰프별 2단계**: LA7.16i가 브릿지 조건 그룹에 명시되지 않음(LA2Xi bridge mode/LA4X/LA12X만) — 원문 표기 그대로 채택, LA7.16i 조건은 원문에 없어 임의 포함하지 않음.
**Nominal_Directivity_Vertical**: Soka와 달리 "J-shape (>2kHz)" 한정 서술 없이 "+5°/-21°"만 명시 — 원문 차이 그대로 보존.
**Cardioid_Capability=No(확정적 비존재)**: Syva_OM_EN.pdf/Syva_AE_EN.docx 전량을 "cardioid" 키워드로 스캔 — 0건 검출.
**DSP_Preset_Name**: 단독 프리셋은 [SYVA] 하나뿐(Soka의 3단계 [SOKA_60]/[SOKA]/[SOKA_200]과 달리 Syva 자신은 단일 프리셋 구조) — 서브우퍼 결합형 하이브리드 프리셋([SYVA LOW SYVA]/[SYVA SUB SYVA])은 preset_guide_and_matching에 별도 기재.
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer [1] | null | - |
| MF_Transducer [1] | 6 x 5" cone driver | - |
| HF_Transducer | 3 x 1.75" diaphragm compression driver | - |
| LF_Acoustical_Load | null | - |
| MF_Acoustical_Load | bass-reflex, L-Vents | - |
| HF_Acoustical_Load | DOSC waveguide, L-Fins | - |
| Passive_Crossover_Network | Yes | - |
| LF_Nominal_Impedance | null | Ohm |
| MF_Nominal_Impedance | null | Ohm |
| HF_Nominal_Impedance | null | Ohm |
| Nominal_Impedance_Overall | 8 | Ohm |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_MF | null | W |
| RMS_Power_Handling_HF | null | W |
| RMS_Power_Handling_Overall | 454 | W |
| Peak_Power_Handling_10ms_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: Syva_OM_EN.pdf p.70 "Syva specifications"("Transducers: MF: 6 × 5" cone drivers / HF: 3 × 1.75", diaphragm compression drivers"); Syva_AE_EN.docx "Technical requirements".
**[1] LF_Transducer=null/MF_Transducer=값 채택**: OM 스펙 표의 "Transducers" 행 자체가 "MF: 6×5""로 명명(AE도 동일) — general 섹션 Description 행의 "LF" 표기와 내부 불일치하나, transducers 섹션은 원문 다수 표기(Transducers 행+AE 양쪽 "MF")를 채택. Syva는 3-way가 아닌 2-way(MF+HF만, LF 대역 자체가 없음)이므로 LF_Transducer는 null(비적용이 아니라 원문상 개념 부재로 미확인). Way_Count=2 확인 근거: OM/AE 모두 "2-way(-passive) enclosure"로 명시.
**RMS_Power_Handling_Overall=454W**: AE "RMS power handling: 454 W" — LF/MF/HF 대역별 분리 없이 통합값만 제공.
**Peak_Power_Handling_10ms_Overall(신규 Key)**: d&b CCL8에서 신설된 범용 Key(10ms 피크 파워 핸들링, 업계 표준 측정 조건) — 이 제품 자신의 RMS_Power_Handling_Overall은 실값을 보유하나 이번 일괄 동기화 라운드에서는 원본을 재조회하지 않고 소급 반영했으므로 미확인으로 유지(원본성 요건, LA12X 브릿징 Key 판단 사례와 동일 원칙).

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector [1] | 1 x 4-point speakON OR 1 x 2-point screw terminal OR 1 x AutoConnect proprietary connector (택1) | - |
| Link_Connector | null | - |
| SpeakON_Pinout_1 | + / - (combined LF/MF+HF signal, internally split by passive crossover) | - |
| SpeakON_Pinout_2 | Not linked | - |
| Screw_Terminal_Pinout_1 | IN + / IN - (동일 신호, speakON과 동일 회로) | - |
| AutoConnect_Pinout [2] | 1+/1- = LF+/LF- / 2+/2- = MF/HF+/MF/HF- | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Syva_OM_EN.pdf p.14-15 "Connectors"("Syva offers three types of connectors. Use one type of connector at a time." — "Internal pinout for L-Acoustics 2-way passive enclosures" 표, "AutoConnect internal pinout" 표).
**[1] 3종 커넥터 중 택1**: speakON(SP 케이블용)과 screw terminal(스피커 와이어용)은 둘 다 표준 2-way 패시브 단일채널(+/-) 배선이며 동시 사용 불가 — 그중 하나만 실제 연결. AutoConnect는 Syva를 Syva Low/Syva Sub 위에 스택(하이브리드 구성)할 때 하부 서브우퍼의 커넥터 플레이트를 통해 전원이 라우팅되는 전용 커넥터로 speakON/screw terminal과 병용 금지("Do not use the speakON connector or screw terminals on Syva when using AutoConnect").
**[2] AutoConnect_Pinout 신규 Key**: 다른 제품에 없는 신규 커넥터 개념 — speakON/screw terminal 입력은 LF/MF+HF를 하나로 합친 단일 채널(+/-)이지만, AutoConnect는 내부적으로 LF와 MF/HF를 분리한 2채널 구조(1+/1-=LF, 2+/2-=MF/HF)로 확인됨(하부 서브우퍼와의 신호 조율을 위한 설계로 추정) — 이 제품 고유 커넥터 모델 Key이므로 타 파일에 동기화하지 않음(SKILL v1.14 원칙).

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA2Xi, LA4X, LA7.16i, LA12X | - |
| Max_Enclosures_Per_Controller_Output | LA2Xi: 1(SE)/1(BTL) / LA4X: 1 / LA7.16i: 1 / LA12X: 3 | count |
| Max_Enclosures_Per_Controller_Total | LA2Xi: 4(SE)/2(BTL) / LA4X: 4 / LA7.16i: 10 / LA12X: 12 | count |
| Crossover_Type | Passive (2-way) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Syva_OM_EN.pdf "Syva is driven by the LA2Xi / LA4X / LA7.16i / LA12X amplified controllers"; "Enclosure drive capacity per amplified controller" 표.

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | DIN580-compatible M8 threaded insert, 2 x integrated inserts for rigging accessory | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | null | count |
| Weight_Net | 21 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: Syva_OM_EN.pdf p.70 "Syva specifications"("Rigging and handling"), "Weight (net): 21 kg".
**Handles 미확인**: 원문 스펙 표에 핸들 개수 서술 없음(다른 부분에서 "handle"은 Syva Base 등 액세서리 취급 관련 언급뿐).
**Inter_Enclosure_Angles_deg**: 단일 유닛 배치 전용 제품(colinear source, K1/K3처럼 여러 유닛을 각도 조정해 어레이를 구성하는 방식이 아님) — 개념 자체가 원문에 없어 미확인.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 144 | mm |
| Height_mm | 1304 | mm |
| Depth_mm | 209 | mm |
| Dimensions_Raw [1] | 144 / 1304 / 209 / 1301 / 170 | mm |
| Cabinet_Material | premium grade Baltic beech and birch plywood | - |
| Front_Material | coated steel grill, acoustically neutral 3D fabric | - |
| Rigging_Components_Material | null | - |
| Finish_Color | dark grey brown Pantone 426 C, pure white RAL 9010, custom RAL code on special order | - |
| IP_Rating | IP54 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Syva_OM_EN.pdf p.71 "Syva dimensions"(치수 도면); Syva_AE_EN.docx "Physical data" - "Dimensions (W, H, D): 144 mm, 1304 mm, 209 mm".
**[1] Dimensions_Raw**: 도면 5개 숫자 중 144/1304/209는 AE 확정 W/H/D와 일치, 1301(높이 근사 중복 표기)/170(부가 치수, 폭 관련 추정)은 부가치수로 보존 — 어느 변에 해당하는지 도면 이미지 육안 재확인은 하지 않음(TODO.md에 이 프로젝트 전반의 "치수 W/H/D 축 구분 신뢰도" 감사 항목으로 별도 기록됨, 2026-07-17).
**IP_Rating=IP54**: Soka(IP55)보다 낮은 등급 — 원문 그대로 채택, 임의 통일하지 않음.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| Syva colinear source (단독) | [SYVA] | 87 - 20000 | null | null |
| Syva with Syva Low, closely coupled(hybrid, AutoConnect) | [SYVA LOW SYVA] | 42 - 20000 | null | null |
| Syva with Syva Low, coupled | [SYVA] + [SYVA LOW_100] | 40 - 20000 | null | null |
| Syva with Syva Sub, closely coupled(hybrid, AutoConnect) | [SYVA SUB SYVA] | 28 - 20000 | null | null |
| Syva with Syva Sub, coupled | [SYVA] + [SYVA SUB_100] | 27 - 20000 | null | null |
| Syva with Syva Low and Syva Sub, closely coupled(hybrid) | [SYVA LOW SYVA] + [SYVA SUB_100] | 27 - 20000 | 1 Syva : 1 Syva Low : 2 Syva Sub | null |
| Syva with Syva Low and Syva Sub, coupled | [SYVA] + [SYVA LOW_100] + [SYVA SUB_100] | 27 - 20000 | 1 Syva : 1 Syva Low : 2 Syva Sub | null |

### 주석 및 출처 (Notes & Sources)

**출처**: Syva_OM_EN.pdf p.25-31 "Loudspeaker configurations"("Syva colinear source" / "Syva colinear source with low-frequency element" — "Syva with Syva Low" p.26-27, "Syva with Syva Sub" p.28-29, "Syva with Syva Low and Syva Sub" p.30-31) 전량 조사.
**AutoConnect 하이브리드 구성**: [SYVA LOW SYVA]/[SYVA SUB SYVA] 프리셋은 Syva가 Syva Low/Syva Sub 위에 물리적으로 스택되고 AutoConnect로 전원이 라우팅되는 전용 구성 — 원문에 "No pre-alignment delay values are required for this configuration" 명시(자동 정렬로 추정), delay_defaults에는 반영하지 않음.
**Recommended_Ratio 대부분 null**: coupled/hybrid 2제품 조합에는 원문에 비율 서술이 없음(3제품 조합에만 "1 Syva : 1 Syva Low : 2 Syva Sub" 명시) — 임의로 1:1 등 추정하지 않고 미확인 유지.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| [SYVA] + [SYVA SUB_100] | 0 | Syva Sub = 2.6 | Syva = + / Syva Sub = + |
| [SYVA] + [SYVA LOW_100] + [SYVA SUB_100] | 0 | Syva Low = 0 / Syva Sub = 3.8 | Syva = + / Syva Low = + / Syva Sub = + |

### 주석 및 출처 (Notes & Sources)

**출처**: Syva_OM_EN.pdf p.29("[SYVA]+[SYVA SUB_100]"), p.31("[SYVA]+[SYVA LOW_100]+[SYVA SUB_100]") "Pre-alignment delays" 표 — 딜레이 수치는 텍스트로 확인, Polarity는 두 페이지 전부 PowerShell+Windows.Data.Pdf로 이미지 렌더링해 회색 "+" 아이콘 확인(두 조합 모두 전 엘리먼트 정상(+), 반전 조합 없음).
**AutoConnect 하이브리드 조합(2건) delay_defaults 미포함**: [SYVA LOW SYVA]/[SYVA SUB SYVA]/[SYVA LOW SYVA]+[SYVA SUB_100] 조합은 원문에 "No pre-alignment delay values are required for this configuration" 명시 — 정렬 개념 자체가 적용되지 않는 구조(AutoConnect 자동 처리로 추정)라 delay_defaults 표에 포함하지 않음(preset_guide_and_matching에는 구성 자체를 기록).

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| flown | Syva Bar | 1 | 1 |
| wall-mounted | Syva Wall | 1 | 1 |
| ground-stacked | Syva Base | 1 | 1 |
| pole-mounted | Syva Pole | 1 | 1 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 4:1 | - |
| Max_Wind_Load | null | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: Syva_OM_EN.pdf p.22-23 "Mechanical safety > Flown configurations / Other configurations"("The Syva rigging system complies with 2006/42/EC: Machinery Directive... specifies a safety factor of 4 against the rupture. The own deployments described in this manual achieve a safety factor of 5 or more").
**Safety_Factor=4:1 채택**: 원문이 "지침 자체는 4를 요구하나 실제 배치는 5 이상 달성"이라는 이중 서술 — K1 계열과의 일관성을 위해 지침 요구 최소값(4)을 Safety_Factor Key로 채택하고 "5 이상 달성" 사실은 이 각주에 보존.
**Max_Wind_Load 미확인**: 원문 전량 검색으로도 풍하중 수치 미발견.

## Null Report

**미확인(정보 부족)**: Model_Number, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, LF_Transducer, LF_Acoustical_Load, LF_Nominal_Impedance, MF_Nominal_Impedance, HF_Nominal_Impedance, RMS_Power_Handling_LF/MF/HF, Peak_Power_Handling_10ms_Overall, Handles, Inter_Enclosure_Angles_deg, Rigging_Components_Material, Max_Wind_Load, preset_guide_and_matching(Recommended_Ratio 5행 + Minimum_Line_Length 전 7행=5+7=12건) — 30건.
**비적용**: Link_Connector(AutoConnect가 그 역할을 대신함) — 1건. (PA_COM_Pinout_*/Terminal_Block_Pinout_* 등 타 커넥터 고유 Key는 Syva 자신의 SpeakON_Pinout_*/Screw_Terminal_Pinout_*/AutoConnect_Pinout으로 이미 표현되어 애초에 생성하지 않음, null 목록에서 제외.)

**총계**: null 31건 (미확인 30건 + 비적용 1건). 확정적 비존재(0/No)로 명시한 항목은 1건 — Cardioid_Capability(No, 원문 전량 스캔 근거). **v1.2 정정(2026-07-18, 각주 버전 참조 최신성 감사 중 발견)**: preset_guide_and_matching의 null 셀을 "Recommended_Ratio 5행, Minimum_Line_Length 전 행"으로 서술하면서도 총계 산정 시 2건으로만 반영해온 결합형 불릿 오카운트(K1_v1.11.md/L2_v1.7.md와 동일 유형)를 발견 — 실제로는 Recommended_Ratio가 5개 행(단독/Syva Low hybrid/Syva Low coupled/Syva Sub hybrid/Syva Sub coupled)에서 null이고 Minimum_Line_Length는 7개 행 전부에서 null이므로 5+7=12개의 개별 null 셀이다. 미확인 18건→28건, 총계 19건→29건으로 재계산. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — speakers 카테고리 신규 제품(S Series 대표, medium throw colinear source, 6x5" + 3x1.75"). Soka_v1.0.md를 스켈레톤으로 사용, OM(Syva owner's manual EN version 2.0) + Syva_AE_EN.docx 통합. OM 자체 내부의 LF/MF 명명 불일치 발견(Description 행="LF" vs Transducers 행="MF", AE도 "MF") 및 다수 표기(MF) 채택 후 각주 보존. 신규 커넥터 개념 AutoConnect 발견(Syva Low/Syva Sub와의 스택형 하이브리드 구성 전용, 내부적으로 LF/MF+HF 분리 2채널) — 신규 Key AutoConnect_Pinout 신설. preset_guide_and_matching/delay_defaults는 Syva Low/Syva Sub 각각과의 hybrid(AutoConnect)/coupled 조합 및 3제품 조합까지 전량 원문 조사, 폴라리티 이미지 렌더링 포함. Cardioid_Capability=No 최초 확인. |
| v1.1 | 프로젝트 전역 동기화 라운드(사용자 지시 2026-07-17). Product_Series(S Series)/Product_Type(Medium throw colinear source) Key 신설 — Syva_AE_EN.docx 최상단 헤더("Syva - Medium throw colinear source" / "S Series") 기준, Soka(동일 colinear 계열이나 시리즈명 없음)와 대조적으로 Syva 계열(Syva/Syva Low/Syva Sub)은 전부 "S Series" 명시. d&b 고유 개념인 signal_processing 섹션(CUT_Mode_Available/HFC_Function_Settings/Coupling_Function_Range) 삭제 — L-Acoustics 제품에는 해당 개념 자체가 없어 비적용 표기에서 섹션 삭제로 정리(Link_Connector는 AutoConnect가 그 역할을 대신하므로 비적용으로 잔류). null 총계 22건(비적용 4건)에서 19건(비적용 1건)으로 갱신. |
| v1.1 to v1.2 | (표기 정정, Minor) 각주 버전 참조 최신성 감사(2026-07-18)에서 preset_guide_and_matching의 null 셀이 "Recommended_Ratio 5행, Minimum_Line_Length 전 행"으로 서술되면서도 총계 산정 시 2건으로만 반영되어 있던 결합형 불릿 오카운트를 발견·정정(K1_v1.11.md/L2_v1.7.md와 동일 유형). 실제로는 Recommended_Ratio 5행 + Minimum_Line_Length 전 7행=5+7=12개 셀. 미확인 18건→28건, 총계 19건→29건으로 재계산. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다. |
| v1.3 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-18, d&b 대량 배치 완료 후) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래, 미확인), `Peak_Power_Handling_10ms_Overall`(d&b CCL8 유래, 미확인) 반영. Null Report 31건(미확인 30건+비적용 1건)으로 갱신. |
