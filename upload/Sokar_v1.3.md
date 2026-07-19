# Sokar (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(Soka의 매입형/recessed 파생형)

**스켈레톤 근거**: `speakers/LA/Soka_v1.0.md`를 뼈대로 사용 — Sokar는 Soka의 매입형(in-wall) 버전으로, 자체 OM(Sokar owner's manual EN version 1.0) 도입부가 "Sokar ultra-shallow colinear source"로 Soka와 동일 제품군임을 명시하고, 음향/전기 스펙(대역폭/SPL/지향각/트랜스듀서/임피던스/커넥터)이 Sokar 자신의 스펙 표(p.38 "Sokar specifications")에서 Soka와 완전히 동일하게 독립 확인된다(SB6r/X4r와 동일한 검증 패턴). A&E 시방서는 제공되지 않아 OM 단일 소스 기준. 차이점은 매입형 특성(중량 8.7kg vs 9.4kg, 단일 마감색상, Sokar-inW/Soka-Screen 전용 액세서리)뿐이다.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | Sokar | - |
| Model_Number | null | - |
| Product_Series | null | - |
| Product_Category | medium throw ultra-shallow colinear source (recessed version) | - |
| Product_Type | Ultra-shallow colinear source | - |
| Description | 2-way passive colinear enclosure (recessed version): 9 x 3.5" LF neodymium cone drivers + 3 x 1" HF diaphragm compression drivers, amplified by LA2Xi / LA4X / LA7.16i / LA12X | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | EN 62368-1:2014 Audio/video, information and communication technology equipment — Part 1: Safety requirements | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Sokar_OM_EN.pdf(Sokar owner's manual EN version 1.0) p.9 "System components", p.38 "Sokar specifications", p.5 "Safety > Instructions"(Compliance_Standards). A&E 시방서 미제공.
**Product_Series/Product_Type(신규 Key, 사용자 지시 2026-07-17)**: Sokar 자신은 A&E가 없어, Soka_AE_EN.docx 헤더("SOKa - ULTRA-SHALLOW colinear source", 시리즈명 줄 없음)를 install/recessed 상속 정책과 동일 근거로 적용 — Product_Type="Ultra-shallow colinear source"(대문자 강조 정규화), Product_Series는 Soka도 null이라 상속할 값 없음.
**WEEE_Marking 미확인**: Soka와 달리 Sokar의 Safety > Instructions 챕터에서 WEEE 마킹 관련 문구를 확인하지 못함(원문 페이지 수가 Soka보다 짧음, p.5 한 페이지에 압축) — 미확인 유지, Soka의 값(Yes)을 임의로 끌어오지 않음(미확인 원본성 요건).

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | [SOKA_60]: 60 - 20000 / [SOKA]: 100 - 20000 / [SOKA_200]: 200 - 20000 | Hz |
| Frequency_Response_6dB_Hz [2] | [SOKA_60]: 70 - 20000 / [SOKA]: 115 - 20000 / [SOKA_200]: 250 - 20000 | Hz |
| Frequency_Response_3dB_Hz [2] | [SOKA_60]: 100 - 20000 / [SOKA]: 135 - 20000 / [SOKA_200]: 300 - 20000 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak [1] | [SOKA_60]: 124 dB / [SOKA]: 130 dB / [SOKA_200]: 133 dB (with LA2Xi bridge mode/LA4X/LA7.16i/LA12X) | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | 140 | deg |
| Nominal_Directivity_Vertical | +5/-21 (J-shape, > 2 kHz) | deg |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | SOKA_60, SOKA, SOKA_200 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Sokar_OM_EN.pdf p.38 "Sokar specifications", p.11 "Directivity".
**[1] Max_SPL_Peak**: Soka와 완전 동일값(124/130/133dB) — Sokar 자신의 스펙 표에서 독립 재확인.
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.
**Frequency_Response_6dB/3dB_Hz 미확인**: A&E 시방서가 없어(Soka는 AE로 6dB/3dB 임계값 확보) 이 두 세부 임계값은 Sokar 자신의 OM 스펙 표에 없음 — Soka의 값(6dB: 70/115/250, 3dB: 100/135/300)을 끌어오지 않고 정직하게 미확인 유지(SB6r과 동일한 "미확인 원본성 요건" 적용).
**Cardioid_Capability=No(확정적 비존재)**: Sokar_OM_EN.pdf 전량을 "cardioid" 키워드로 스캔 — 0건 검출.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 9 x 3.5" neodymium cone driver | - |
| HF_Transducer | 3 x 1" neodymium diaphragm compression driver | - |
| LF_Acoustical_Load | closed enclosure | - |
| HF_Acoustical_Load | conical waveguide, L-Fins | - |
| Passive_Crossover_Network | Yes | - |
| LF_Nominal_Impedance | null | Ohm |
| HF_Nominal_Impedance | null | Ohm |
| Nominal_Impedance_Overall | 8 | Ohm |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_HF | null | W |
| RMS_Power_Handling_Overall [2] | 133 | W |
| Peak_Power_Handling_10ms_Overall [3] | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: Sokar_OM_EN.pdf p.38 "Sokar specifications"("Transducers: LF: 9 x 3.5" neodymium cone driver / HF: 3 x 1" neodymium").
**[2] Frequency_Response_6dB/3dB_Hz, RMS_Power_Handling_Overall = Soka 값 상속(v1.1, 사용자 정책 지침 2026-07-18)**: Sokar 자신의 OM에는 이 3개 수치가 없어(A&E 미제공, OM 스펙 표에도 파워 핸들링 항목 자체가 없음) v1.0에서는 미확인으로 유지했으나, 사용자가 명시적으로 "설치형(install)/매입형(recessed) 버전과 표준형 간에 치수·무게 외 다른 특이사항이 없다면 드라이버·인클로저 구성이 동일 스펙이므로 주파수 응답이나 파워 핸들링은 상속 가능하다"는 정책을 지침으로 제공 — Sokar와 Soka는 이미 Sokar 자신의 OM(p.38 "Sokar specifications")으로 트랜스듀서/임피던스/대역폭/SPL/커넥터/드라이브 커패시티/딜레이 6개 조합 수치가 전부 Soka와 완전 동일함이 독립 확인되어 있고(스켈레톤 근거 각주 참조), 매입형 특유의 차이는 무게(8.7kg vs 9.4kg)·마감·전용 액세서리뿐이라 이 3개 Key도 동일하게 적용 가능 — Soka_v1.0.md의 값(Frequency_Response_6dB_Hz/3dB_Hz/RMS_Power_Handling_Overall=133W)을 채택. **WEEE_Marking은 이 정책의 적용 범위에서 제외**: 규제/물리 마킹은 드라이버·인클로저 스펙과 무관하게 인클로저 표면에 실제로 마킹되어 있는지 여부의 문제이므로(Sokar 자신의 문서가 실제로 더 짧아 확인 자체가 안 됨) 계속 미확인으로 유지, 사용자 지침도 WEEE_Marking을 상속 대상으로 명시하지 않음.
**[3] Peak_Power_Handling_10ms_Overall(신규 Key)**: d&b CCL8에서 신설된 범용 Key(10ms 피크 파워 핸들링, 업계 표준 측정 조건) — 이 제품 자신의 RMS_Power_Handling_Overall은 실값을 보유하나 이번 일괄 동기화 라운드에서는 원본을 재조회하지 않고 소급 반영했으므로 미확인으로 유지(원본성 요건, LA12X 브릿징 Key 판단 사례와 동일 원칙).

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 4-point terminal block with push-in connection (IN/LINK interchangeable) | - |
| Link_Connector | 1 x 4-point terminal block with push-in connection (IN/LINK interchangeable) | - |
| Terminal_Block_Pinout_1 | + / - (combined LF+HF signal, internally split by passive crossover) | - |
| Terminal_Block_Pinout_2 | Not linked | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Sokar_OM_EN.pdf p.12 "Connectors"("Internal pinout for L-Acoustics 2-way passive enclosures" — Soka와 동일 구조, "Screw terminal points IN +/IN -").

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA2Xi, LA4X, LA7.16i, LA12X | - |
| Max_Enclosures_Per_Controller_Output | LA2Xi: 1(SE)/1(BTL) / LA4X: 2 / LA7.16i: 1 / LA12X: 3 | count |
| Max_Enclosures_Per_Controller_Total | LA2Xi: 4(SE)/2(BTL) / LA4X: 8 / LA7.16i: 16 / LA12X: 12 | count |
| Crossover_Type | Passive (2-way) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Sokar_OM_EN.pdf "Enclosure drive capacity per amplified controller" 표 — Soka와 완전 동일값, Sokar 자신의 표에서 독립 재확인.

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | Sokar-inW(매입 프레임) + Soka-Screen(음향 투과 스크린) | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | null | count |
| Weight_Net | 8.7 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: Sokar_OM_EN.pdf p.38 "Sokar specifications"("Weight (net): 8.7 kg"); p.14 "Rigging system description"(Sokar-inW/Soka-Screen).
**Weight_Net**: Soka(9.4kg)보다 가벼움 — 매입형이라 전면 그릴 등 일부 부품이 없는 것으로 추정(SB6r과 동일 패턴).

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 99 | mm |
| Height_mm | 1064 | mm |
| Depth_mm | 99 | mm |
| Dimensions_Raw [1] | 99 / 1064 / 99 / 104.2 | mm |
| Cabinet_Material | premium grade Baltic beech and birch plywood | - |
| Front_Material | null | - |
| Rigging_Components_Material | null | - |
| Finish_Color | dark grey brown Pantone 426 C | - |
| IP_Rating [2] | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: Sokar_OM_EN.pdf p.39 "Sokar dimensions"(치수 도면, Soka와 완전 동일 수치), p.38 "Sokar specifications".
**[1] Dimensions_Raw / Width·Height·Depth_mm 축 확정(재조사 완료, 2026-07-18)**: Soka와 동일 도면 수치(99/1064/99/104.2mm) — Sokar 자신의 도면에서 독립 확인. 이번에 p.39 도면을 PowerShell+Windows.Data.Pdf로 이미지 렌더링해 육안 재확인, 전면도(드라이버 노출면)에 가로 99mm(폭)·세로 1064mm(높이), 측면 입면도 상단에 99mm(깊이)로 명확히 표기됨을 확인했다. 측면도 하단의 104.2mm는 별도 작은 구획(후면 리깅 인서트 관련 부가 치수)에 표기되어 있어 깊이 값(Depth_mm)과 구분되는 부가 치수로 판단, Dimensions_Raw에만 원문 그대로 보존한다(TODO.md 치수 W/H/D 축 구분 신뢰도 감사 항목 해소).
**Front_Material 비적용 사유**: 매입형(recessed) 제품이라 전면 그릴/패브릭 스펙이 원문 표에서 빠짐(X4r/SB6r과 동일 패턴 — Soka-Screen이 별도 액세서리로 그 역할을 대신함).
**Finish_Color 단순화**: Soka는 3가지 마감을 제공하나 Sokar는 원문에 "dark grey brown Pantone 426 C" 1가지만 명시.
**[2] IP_Rating 조건부**: OM 각주 "When integrated in-wall or in-ceiling with screen and connector sealing plate" — Soka와 동일 조건부 표기.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| Sokar colinear source (단독) | [SOKA] | null | null | null |
| Sokar with SB6r, closely coupled(200Hz) | [SOKA_200] + [SB6_200] | 32 - 20000 | 1 Sokar : 2 SB6r | null |
| Sokar with SB6r, coupled(100Hz) | [SOKA] + [SB6_100] | 29 - 20000 | 1 Sokar : 2 SB6r | null |
| Sokar with SB6r, separated(60Hz) | [SOKA_60] + [SB6_60] | 29 - 20000 | 1 Sokar : 2 SB6r | null |
| Sokar with SB10r, closely coupled(200Hz) | [SOKA_200] + [SB10_200] | 29 - 20000 | 1 Sokar : 2 SB10r | null |
| Sokar with SB10r, coupled(100Hz) | [SOKA] + [SB10_100] | 27 - 20000 | 1 Sokar : 2 SB10r | null |
| Sokar with SB10r, separated(60Hz) | [SOKA_60] + [SB10_60] | 25 - 20000 | 1 Sokar : 1 SB10r | null |

### 주석 및 출처 (Notes & Sources)

**출처**: Sokar_OM_EN.pdf p.18-24 "Loudspeaker configurations"("Sokar colinear source" p.18, "Sokar with SB6r" p.19-21, "Sokar with SB10r" p.22-24) — 6개 조합 전량 조사, Soka와 완전 동일한 수치를 Sokar 자신의 문서에서 독립 확인.
**Sokar colinear source(단독) Frequency_Range_10dB_Hz 미확인**: 원문 p.18 "Sokar colinear source" 챕터에 Enclosure/Preset 표만 있고 Frequency range 행이 생략됨(Soka는 100-20000Hz로 명시) — Sokar 자신의 문서에는 이 값이 없어 미확인 유지.
**원문 라벨링 오류 정정**: Sokar 자신의 OM 델레이/구성 표가 "Soka"/"SB6i"/"SB10i"(매입형 접미사 r 누락, 표준형 명칭 그대로)로 표기되어 있음 — K3i/Kara_IIi/X4r 사례와 동일한 유형의 매뉴얼 복사 잔재로 판단해 이 파일에서는 Sokar/SB6r/SB10r로 정정 채택.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| [SOKA_200] + [SB6_200] | 1.9 | SB6r = 0 | Sokar = + / SB6r = + |
| [SOKA] + [SB6_100] | 1.4 | SB6r = 0 | Sokar = + / SB6r = + |
| [SOKA_60] + [SB6_60] | 3.6 | SB6r = 0 | Sokar = + / SB6r = − |
| [SOKA_200] + [SB10_200] | 3.2 | SB10r = 0 | Sokar = + / SB10r = + |
| [SOKA] + [SB10_100] | 2.6 | SB10r = 0 | Sokar = + / SB10r = + |
| [SOKA_60] + [SB10_60] | 9 | SB10r = 0 | Sokar = + / SB10r = − |

### 주석 및 출처 (Notes & Sources)

**출처**: Sokar_OM_EN.pdf p.20(SB6r closely coupled/coupled), p.21(SB6r separated), p.22(SB10r closely coupled), p.23(SB10r coupled), p.24(SB10r separated) "Pre-alignment delays" 표 — 딜레이 수치는 텍스트로 확인, Polarity는 5개 페이지 전부 PowerShell+Windows.Data.Pdf로 이미지 렌더링해 육안 확인(Soka와 완전 동일한 값/패턴을 Sokar 자신의 문서에서 독립 재확인).
**원문 라벨링 오류**: preset_guide_and_matching과 동일 — 원문 표 자체가 "Soka"/"SB6i"/"SB10i"로 표기되어 있으나 이 파일에서는 Sokar/SB6r/SB10r로 정정.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| in-wall | Sokar-inW + Soka-Screen | 1 | 1 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 5:1 | - |
| Max_Wind_Load | null | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: Sokar_OM_EN.pdf p.17 "Mechanical safety"("The Sokar rigging system complies with EN 62368-1: 2014...", "achieve a safety factor of 5").
**Configuration 단순화**: Soka는 6개 리깅 구성(wall-mounted 4종 + ceiling/flown + pole-mounted)이 있으나 Sokar는 매입형 특성상 "in-wall" 단일 구성만 원문에 존재.

## Null Report

**미확인(정보 부족)**: Model_Number, WEEE_Marking, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, LF_Nominal_Impedance, HF_Nominal_Impedance, RMS_Power_Handling_LF/HF, Peak_Power_Handling_10ms_Overall, Inter_Enclosure_Angles_deg, Handles, Rigging_Components_Material, Front_Material, Max_Wind_Load, preset_guide_and_matching(단독 구성(Sokar colinear source)의 Frequency_Range_10dB_Hz/Recommended_Ratio/Minimum_Line_Length 3개 컬럼 + 나머지 6개 조합 행의 Minimum_Line_Length 각 1건=3+6=9건) — 24건.
**비적용**: 없음 — 0건. (PA_COM_Pinout_*/SpeakON_Pinout_*/Screw_Terminal_Pinout_* 등 타 커넥터 고유 Key는 Sokar 자신의 Terminal_Block_Pinout_*으로 이미 표현되어 애초에 생성하지 않음, null 목록에서 제외.)

**총계**: null 24건 (미확인 24건 + 비적용 0건). 확정적 비존재(0/No)로 명시한 항목은 1건 — Cardioid_Capability(No, 원문 전량 스캔 근거). **v1.2 정정(2026-07-18, 각주 버전 참조 최신성 감사 중 발견)**: preset_guide_and_matching의 null 셀을 "단독 구성 Frequency_Range_10dB_Hz, Minimum_Line_Length 전 행"이라는 서술로 뭉뚱그려 총계 산정 시 1건으로만 반영해온 결합형 불릿 오카운트(K1_v1.11.md/L2_v1.7.md와 동일 유형)를 발견 — 실제로는 단독 구성(Sokar colinear source) 행의 Frequency_Range_10dB_Hz/Recommended_Ratio/Minimum_Line_Length 3개 컬럼 + 나머지 6개 조합 행 각각의 Minimum_Line_Length 1개 컬럼 = 3+6=9개의 개별 null 셀이다. 미확인 14건→22건, 총계 14건→22건으로 재계산. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다. 이 파일은 아직 git에 커밋되지 않은 상태(untracked)이므로 버전 번호는 v1.2를 유지하고 이 자리에서 직접 정정했다.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — speakers 카테고리(Soka의 recessed/매입형 파생형). Soka_v1.0.md를 스켈레톤으로 사용, OM(Sokar owner's manual EN version 1.0) 단일 소스(A&E 시방서 미제공). 스펙 표 수치(대역폭/SPL/지향각/트랜스듀서/임피던스/커넥터/드라이브 커패시티/딜레이 6개 조합 전부)가 Soka와 완전 동일함을 Sokar 자신의 문서에서 독립 확인(폴라리티 5개 페이지 이미지 렌더링 포함), 원문 자체의 "Soka"/"SB6i"/"SB10i" 라벨링 오류(r 접미사 누락)를 K3i/X4r 사례와 동일 유형으로 판단해 정정. A&E 부재로 Frequency_Response_6dB/3dB_Hz, RMS_Power_Handling_Overall, WEEE_Marking은 Soka에서 끌어오지 않고 정직하게 미확인 유지(SKILL "미확인 원본성 요건" 원칙 준수). |
| v1.1 | d&b 고유 signal_processing(CUT_Mode/HFC/Coupling) 섹션 삭제(사용자 지적 2026-07-18, `speakers/CLAUDE.md` 규칙 2 위반 시정). Product_Series/Product_Type 신규 Key 미적용(다음 라운드 예정). **사용자 정책 지침(2026-07-18)에 따라 Frequency_Response_6dB_Hz/3dB_Hz/RMS_Power_Handling_Overall을 Soka_v1.0.md 값으로 상속** — install/recessed 버전이 표준형과 치수·무게 외 특이사항이 없다면 드라이버·인클로저 구성이 동일 스펙이므로 주파수 응답·파워 핸들링 상속이 허용됨(Sokar 자신의 OM으로 이미 다른 6개 항목의 완전 동일성이 독립 확인되어 있어 이 정책의 전제 조건 충족). WEEE_Marking은 이 정책 범위 밖(규제 마킹은 스펙과 무관)이라 계속 미확인 유지. Null Report 17건(미확인)→14건으로 감소. |
| v1.2 | 치수 W/H/D 축 구분 신뢰도 감사(TODO.md, 2026-07-18) — A&E 시방서 미제공으로 축 확정 근거가 약했던 Width/Height/Depth_mm을 p.39 도면 PowerShell+Windows.Data.Pdf 이미지 렌더링으로 육안 재확인, 기존 값(99/1064/99mm)이 정확함을 확정(변경 없음, 각주만 보강). **(표기 정정, 2026-07-18 각주 버전 참조 최신성 감사 중 발견)** preset_guide_and_matching의 null 셀이 "단독 구성 Frequency_Range_10dB_Hz, Minimum_Line_Length 전 행"으로 뭉뚱그려져 총계 산정 시 1건으로만 반영되어 있던 결합형 불릿 오카운트를 발견·정정(K1_v1.11.md/L2_v1.7.md와 동일 유형) — 실제로는 3+6=9개의 개별 null 셀. 미확인 14건→22건, 총계 14건→22건으로 재계산. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다. 파일이 아직 untracked 상태라 버전 번호(v1.2) 변경 없이 같은 파일에서 직접 정정. |
| v1.3 | speakers 카테고리 전체 일괄 동기화 라운드(2026-07-18, d&b 대량 배치 완료 후) — 신규 Key `Frequency_Response_4dB_Hz`(Meyer Sound 배치 유래, 미확인), `Peak_Power_Handling_10ms_Overall`(d&b CCL8 유래, 미확인 — RMS_Power_Handling_Overall은 실값 보유하나 원본 재조회 없이 소급 반영) 반영. Null Report 24건(미확인 24건+비적용 0건)으로 갱신. |
