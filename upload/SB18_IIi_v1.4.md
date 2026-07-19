# SB18 IIi (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1(동일 브랜드 이기종 서브우퍼 추가 — Kara IIi의 delay_defaults가 이미 참조하던 "SB18 IIi"의 실제 원본 최초 투입)

**스켈레톤 근거**: `speakers/LA/SB6i_v1.2.md`를 뼈대로 사용 — SB18 IIi는 SB6i와 동일한 install 전용 terminal block 서브우퍼 아키텍처(외부 리깅 키트, push-in 터미널 블록, IP55)를 가진다. 단, SB6i는 2 x 6.5" LF 드라이버 초박형(depth 99mm) 제품인 반면 SB18 IIi는 **단일 18" 대구경 드라이버**의 대형 제품(701 x 540 x 728mm, 48kg)이라는 점이 다르다.

**"SB18_IIi" 정체 확정(원본 재검토 결과, 이름과 추정에 의존하지 않고 독립 판정)**: 업로드된 `SB18_IIi_OM_EN_3.0.pdf`(Document reference: "SB18 IIi owner's manual (EN) version 3.0")는 SB18(투어용, `SB18_UM_EN_6.0.pdf`)과는 **완전히 별개의 독립 문서**이며, 표지/본문 전체에서 자기 자신을 일관되게 "SB18 IIi"로만 지칭한다(SB18/SB18i처럼 복수 베리언트를 한 문서에서 함께 다루지 않음). Introduction 챕터가 명시: "SB18 IIi is a compact subwoofer designed to extend the bandwidth of **the Kara IIi system** in installation applications... SB18 IIi is the dedicated subwoofer for Kara IIi." — 이는 `Kara_IIi_v1.6.md`의 delay_defaults/preset_guide_and_matching이 "SB18 IIi"를 참조하는 것과 정확히 일치한다. 리깅 액세서리명(KARAIIi-BUMP, KARAIIi-RIGBAR, KARAIIi-FIXBRACKET, SB18IIi-LINK 등)도 전부 "Kara IIi" 세대 전용 명명 체계를 공유해, SB18(투어, Kara II 세대)과는 리깅 하드웨어 자체가 호환되지 않는 별개 제품임을 뒷받침한다. 결론: **SB18_IIi는 SB18_UM에 등장하는 "SB18i"(소문자, "Karai"용 구세대 install 베리언트)와도 다른, Kara IIi 세대에 맞춰 새로 설계된 별도 제품**이다 — 커넥터부터 다르다(SB18i는 speakON 2개, SB18 IIi는 terminal block 1개).

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | SB18 IIi | - |
| Model_Number | null | - |
| Product_Series | null | - |
| Product_Category | high-power compact subwoofer (installation version) | - |
| Product_Type | Subwoofer | - |
| Description | High-power compact subwoofer (installation version), 1 x 18" high-excursion direct-radiating transducer, dual bass-reflex, dedicated subwoofer for Kara IIi, amplified by LA2Xi / LA4X / LA8 / LA12X | - |
| Way_Count | 1 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | 2006/42/EC Machinery Directive (rigging system, designed per BGV-C1 guidelines) | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB18_IIi_OM_EN_3.0.pdf(`speakers/LA/Original_PDFs/SB18_IIi/`) p.7("Introduction"), p.73("Specifications"); SB18_IIi_AE_EN.docx "Short description"/"Description".
**Product_Series/Product_Type(신규 Key, 사용자 지시 2026-07-17)**: SB18_IIi_AE_EN.docx 최상단 헤더("SB18 IIi - Subwoofer" / "Install-specific 18' Subwoofer") — Product_Type="Subwoofer" 채택, 시리즈명 줄이 없어 Product_Series는 null.
**Compliance_Standards**: OM p.22("Mechanical safety > Flown configurations") — "The SB18 IIi rigging system complies with 2006/42/EC: Machinery Directive. It has been designed following the guidelines of BGV-C1." SB18(투어)의 RM과 달리 이 제품 자신의 OM은 2006/42/EC를 명시적으로 인용한다.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz [1] | [SB18_100]: 32-110 / [SB18_60]: 32-80 | Hz |
| Frequency_Response_6dB_Hz [1] | [SB18_100]: 34-100 / [SB18_60]: 32-70 | Hz |
| Frequency_Response_3dB_Hz [1] | [SB18_100]: 37-82 / [SB18_60]: 35-60 | Hz |
| Frequency_Response_5dB_Hz | null | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Max_SPL_Peak [2] | 138 | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg | null | deg |
| Nominal_Directivity_Vertical | null | - |
| Cardioid_Capability [4] | Array-based only (4대 어레이 중 1대 반전 배치 필요) | - |
| DSP_Preset_Name [3] | SB18_60, SB18_100, SB18_60_C, SB18_60_Cx, SB18_100_C, SB18_100_Cx | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB18_IIi_AE_EN.docx "Technical requirements"; SB18_IIi_OM_EN_3.0.pdf p.24-25("Loudspeaker configurations"), p.73(Specifications), p.31("Listening test": "SB18 IIi [SB18_100] 32 Hz - 110 Hz").
**[1] Usable_Bandwidth_Hz/6dB/3dB 프리셋 귀속(추론 근거 명시)**: AE_EN.docx는 라벨 없이 두 세트의 대역폭 수치를 슬래시로 병기한다 — "32-110Hz(-10dB)/34-100Hz(-6dB)/37-82Hz(-3dB) / 32-80Hz(-10dB)/32-70Hz(-6dB)/35-60Hz(-3dB)". 원문 자체에는 어느 세트가 어느 프리셋인지 명시적 라벨이 없으나, 첫 번째 세트(32-110/34-100/37-82)가 SB18(투어)의 AE_EN.docx 수치 및 SB18_IIi 자신의 OM p.31 Listening test 표("[SB18_100] 32Hz-110Hz")와 정확히 일치하므로 [SB18_100] 세트로, 두 번째 세트(상한이 더 낮은 32-80/32-70/35-60)를 [SB18_60](60Hz 상한, 더 좁은 대역) 세트로 귀속했다 — OM 자신의 명시적 라벨이 아닌 정황적 대조에 근거한 추론이므로 이 각주에 근거를 남긴다.
**[4] Cardioid_Capability=Array-based only**: OM "SB18 IIi in cardioid configuration"("Deployed in a cardioid configuration, an SB18 IIi system produces a rear SPL rejection. The deployment consists of an array of four SB18 IIi with one element turned towards the rear (reversed)") — KS21/SB18(투어)과 동일 유형, C/Cx 이원 구조 모두 확인됨.
**[2] Max_SPL_Peak 소스 간 충돌**: OM Specifications(p.73)는 "138 dB ([SB18_100]) with LA2Xi (bridge mode) / LA4X / LA8 / LA12X" / "133 dB ([SB18_100]) with LA2Xi"로 앰프 조건별 값을 구분 제공하는 반면, AE_EN.docx는 "138 dB Peak level at 1m under half space conditions"로 앰프 조건 구분 없이 단일값만 제공 — L-Acoustics OM 우선 원칙에 따라 138dB(브릿지모드/LA4X/LA8/LA12X 조건)를 대표값으로 채택, LA2Xi 비-브릿지 조건의 133dB는 이 각주에 병기(데이터 손실 없음).
**[3] DSP_Preset_Name — 프리셋명에 "IIi" 접미사 없음**: OM p.11/24-25 "Preset description" 전 항목이 "[SB18_60]"/"[SB18_100]"/"[SB18_60_C]"/"[SB18_60_Cx]"/"[SB18_100_C]"/"[SB18_100_Cx]"로, 제품명(SB18 IIi)과 달리 프리셋 브래킷 표기 자체는 "SB18"(접미사 없음)을 그대로 사용 — `Kara_IIi_v1.6.md`의 delay_defaults가 참조하는 프리셋명과 완전히 일치하며, SB18(투어)의 프리셋명과도 표기가 동일함을 확인(제품 세대와 무관하게 프리셋 브래킷 이름 자체는 공유 네이밍 체계).
**Directivity**: OM "Directivity: standard or cardioid" — Nominal_Directivity_Horizontal/Vertical Key로 미표현(SB18/KS28과 동일 처리).
**Frequency_Response_4dB_Hz(신규 Key)**: Meyer Sound 배치(750-LFC 등)에서 신설된 범용 Key(-4dB 기준 대역폭) — 이 제품 자신의 원본에서 아직 재확인되지 않아 미확인 유지.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 1 x 18" cone driver | - |
| LF_Acoustical_Load | dual bass-reflex, L-Vents | - |
| Passive_Crossover_Network [1] | No | - |
| LF_Nominal_Impedance | 8 | Ohm |
| Nominal_Impedance_Overall | null | Ohm |
| RMS_Power_Handling_LF | 387 | W |
| RMS_Power_Handling_Overall | null | W |
| Peak_Power_Handling_10ms_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: SB18_IIi_AE_EN.docx "Technical requirements"; SB18_IIi_OM_EN_3.0.pdf p.73(Specifications), p.7("Introduction": "one high-excursion, direct-radiating 18\" transducer... features L-Vents that substantially reduce turbulence and port noise").
**Peak_Power_Handling_10ms_Overall(신규 Key)**: d&b CCL8에서 신설된 범용 Key — RMS_Power_Handling_Overall과 동일 사유로 비적용.
**RMS_Power_Handling_LF**: OM 본문/스펙 표에는 파워 핸들링 수치가 없음 — AE_EN.docx에서만 확보(387W, SB18 투어와 동일 수치).
**[1] Passive_Crossover_Network=No**: SB18_IIi_OM_EN_3.0.pdf, SB18_IIi_AE_EN.docx 2개 문서 전체를 "crossover" 키워드로 전량 스캔 — 0건 검출. 단일 대역 서브우퍼로 크로스오버 개념 자체가 구조적으로 불필요.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 4-point terminal block with push-in connection | - |
| Link_Connector | null | - |
| Terminal_Block_Pinout_1 | LF+ / LF- | - |
| Terminal_Block_Pinout_2 | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB18_IIi_OM_EN_3.0.pdf p.11("Electro-acoustical description > Connectors": "Internal pinout for L-Acoustics subwoofers" 표 — "Terminal block points IN+/IN-, Transducer connectors LF+/LF-"), p.57-59("Cabling SB18 IIi").
**Link_Connector 미확인 사유**: SB6i와 동일하게 별도 LINK 터미널 블록은 없음 — 다만 OM p.57("Cabling SB18 IIi")이 "connector sealing plate에 케이블 글랜드 2개(입력용 1개, 병렬 연결용 1개)가 있다"고 명시해 동일 터미널 블록을 통한 병렬(parallel) 연결이 실제로 가능함을 확인했다. 이는 KS28의 "Not linked"처럼 확정적 비적용이라 보기 어렵고(병렬 연결 자체는 가능), 그렇다고 별도의 독립된 LINK 커넥터 모델도 아니어서 기존 Link_Connector Key 정의(별도 커넥터 유무)에 깔끔히 대응되지 않아 미확인으로 유지.

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA2Xi, LA4X, LA8, LA12X | - |
| Max_Enclosures_Per_Controller_Output [1] | LA2Xi: 1 (SE) / 1 (BTL) / LA4X: 1 / LA8: 2 / LA12X: 3 | count |
| Max_Enclosures_Per_Controller_Total [1] | LA2Xi: 4 (SE) / 2 (BTL) / LA4X: 4 / LA8: 6 (at high level) / LA12X: 12 | count |
| Crossover_Type | Active (1-way, subwoofer) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB18_IIi_OM_EN_3.0.pdf p.24("The SB18 IIi subwoofer is driven by the LA2Xi / LA4X / LA8 / LA12X amplified controllers"), p.54("Enclosure drive capacity per amplified controller" 표).
**[1] Max_Enclosures_Per_Controller**: OM p.54 표가 4개 컨트롤러 전부에 대해 "per output / total" 값을 명시적으로 제공 — SB18(투어)의 UM에는 없던 구조화된 표(LA12X 값 포함)를 이 제품에서 신규 확보. LA2Xi는 SE(Single-Ended)/BTL(Bridge-Tied Load) 모드별로 값이 다름을 원문 각주(*)에서 확인해 그대로 반영. LA8은 "출력당 최대 2대, 단 고레벨 시 컨트롤러당 최대 6대"라는 단서(**)가 원문에 있어 병기.

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | external rigging kits (12 M6 inserts for rigging, 8 M6 inserts for screens) | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles [1] | 0 | count |
| Weight_Net | 48 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: SB18_IIi_OM_EN_3.0.pdf p.12-13("Rigging system description"), p.73(Specifications).
**[1] Handles=0(확정적 비존재)**: SB18_IIi_OM_EN_3.0.pdf, SB18_IIi_AE_EN.docx 2개 문서 전체를 "handle" 키워드로 전량 스캔 — 0건 검출. SB18(투어)는 AE가 "four ergonomic handles"를 명시하는 것과 대조적으로, SB18 IIi는 인체공학적 핸들 대신 전량 외부 리깅 키트(SB18IIi-LINK/ENDLINK, KARAIIi-FIXBRACKET 등)로만 취급하도록 설계된 install 전용 제품 구조 — 자기 자신의 원본 전량 스캔에 근거해 0으로 확정.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 701 | mm |
| Height_mm | 540 | mm |
| Depth_mm | 728 | mm |
| Dimensions_Raw [1] | 701 / 701 / 540 / 728 | mm |
| Cabinet_Material [2] | premium grade Baltic birch plywood | - |
| Front_Material | coated steel grill, acoustically neutral 3D fabric | - |
| Rigging_Components_Material | null | - |
| Finish_Color | dark grey brown Pantone 426 C, pure white RAL 9010, custom RAL code on special order | - |
| IP_Rating | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: SB18_IIi_AE_EN.docx "Physical data"("Dimensions (W, H, D): 701 mm, 540 mm, 728 mm"); SB18_IIi_OM_EN_3.0.pdf p.74("SB18 IIi dimensions" 도면), p.73(Specifications).
**[1] Dimensions_Raw**: 도면 텍스트 레이어에서 4개 숫자(701/701/540/728mm) 추출 — 701이 두 번 표기되어 있으나(도면상 폭 치수가 앞/뒤 두 시점에 각각 라벨링된 것으로 추정) AE의 W/H/D(701/540/728) 3개와 정확히 일치, 별도 부가 치수는 없음.
**[2] Cabinet_Material 소스 내 표기 불일치**: SB18_IIi_AE_EN.docx는 "Description" 단락과 "Physical data" 불릿 양쪽 모두 "premium grade Baltic beech and birch plywood"로 일관되게 서술하는 반면, OM Specifications(p.73)는 "Cabinet: premium grade Baltic birch plywood"로 beech를 뺀 축약형이다 — SB18(투어)과 동일 유형의 불일치가 이 제품에서도 발견됨(다만 이번엔 AE 내부는 일관되고 OM만 축약형). L-Acoustics OM 우선 원칙에 따라 OM의 축약형을 대표값으로 채택, AE의 확장형("beech and birch")은 이 각주에 병기.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| SB18 IIi standard configuration | [SB18_60] / [SB18_100] | [SB18_100]: 32-110 / [SB18_60]: 32-80 | null | null |
| SB18 IIi cardioid configuration | [SB18_60_C]/[SB18_60_Cx] / [SB18_100_C]/[SB18_100_Cx] | [SB18_100]: 32-110 / [SB18_60]: 32-80 | null | null |

### 주석 및 출처 (Notes & Sources)

**출처**: SB18_IIi_OM_EN_3.0.pdf p.24("SB18 IIi in standard configuration"), p.25("SB18 IIi in cardioid configuration").
**Recommended_Ratio/Minimum_Line_Length**: Kara IIi와의 실제 조합별 매칭 비율/최소 라인 길이는 SB18 IIi 자신의 원본에 없고, `Kara_IIi_v1.6.md`(예: "Coupled SB18 IIi or KS21i" 행)에 그 제품 관점으로 이미 기록되어 있다.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유(조사 완료 후 확정)**: OM p.24-25("Delay values": "When combining a line source with subwoofers, delays may have to be added to the presets. Refer to the Preset Guide to obtain the pre-alignment delay values.")가 별도 공용 문서를 참조하도록 명시하며, SB18 IIi 자신의 원본(OM/AE)에는 조합별 지연값이 없다. SB18(투어)/KS28과 동일한 구조적 이유로 SB18 IIi는 모든 조합에서 2차 엘리먼트로만 등장하며, 실제 지연값은 `Kara_IIi_v1.6.md`의 delay_defaults 표에 이미 기록되어 있다(예: "[Kara IIi] + [SB18 IIi_100]" 행).

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| flown | KARAIIi-BUMP + rigging plates | 12 | 16 |
| flown | KARAIIi-BUMP + M-BARi + rigging plates | 8 | 16 |
| flown with pullback | KARAIIi-BUMP + M-BARi + KARAIIi-RIGBAR + rigging plates | 8 | 12 |
| flown with pullback | KARAIIi-RIGBAR x2 + rigging plates | 4 | 6 |
| ceiling-mounted | KARAIIi-FIXBRACKET + rigging plates | null | 2 |
| stacked | KARAIIi-FIXBRACKET (optional) + rigging plates | null | 4 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 4 | - |
| Max_Wind_Load | 6 | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: SB18_IIi_OM_EN_3.0.pdf p.22("Mechanical safety > Flown configurations / Other configurations").
**Safety_Factor=4**: 원문 "2006/42/EC: Machinery Directive specifies a safety factor of 4 against the rupture. The own deployments described in this manual achieve a safety factor of 4 or more." — K1~Kiva II 계열과 동일한 값(KS28의 5보다는 낮음).
**Ceiling-mounted/Stacked 행**: 원문이 safe/maximum limit을 단일 값(각 2/4)으로 표기 — safe limit 별도 명시 없어 null, maximum limit만 채택.

## Null Report

**미확인(정보 부족)**: Model_Number, WEEE_Marking, Frequency_Response_5dB_Hz, Frequency_Response_4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, Nominal_Directivity_Horizontal_deg, Nominal_Directivity_Vertical, Nominal_Impedance_Overall, RMS_Power_Handling_Overall, Link_Connector, Terminal_Block_Pinout_2, Inter_Enclosure_Angles_deg, Rigging_Components_Material, preset_guide_and_matching(Recommended_Ratio/Minimum_Line_Length 전 2행 각 2열=4건), delay_defaults(전 항목), mechanical_safety(ceiling-mounted/stacked의 Safe_Limit 2칸) — 20건.
**비적용**: Peak_Power_Handling_10ms_Overall — 1건. (PA_COM_Pinout_*/SpeakON_Pinout_* 등 타 커넥터 고유 Key는 SB18 IIi 자신의 Terminal_Block_Pinout_*으로 이미 표현되어 애초에 생성하지 않음, null 목록에서 제외. MF/HF 관련 8개 Key는 LF 전용 서브우퍼 구조상 애초에 생성하지 않음, SKILL v1.19.)

**총계**: null 21건 (미확인 20건 + 비적용 1건). 확정적 비존재(0/No)로 명시한 항목은 2건 — Handles(0, OM+AE 전량 스캔 "handle" 0건 검출), Passive_Crossover_Network(No, 전량 스캔 "crossover" 0건 검출). **v1.2 정정(2026-07-18, 각주 버전 참조 최신성 감사 중 발견)**: preset_guide_and_matching의 Recommended_Ratio/Minimum_Line_Length 미확인을 "양 행"이라는 서술로 뭉뚱그려 총계 산정 시 1건으로만 반영해온 결합형 불릿 오카운트(K1_v1.11.md/L2_v1.7.md와 동일 유형)를 발견 — 실제로는 2개 Configuration 행(standard/cardioid) × 2개 컬럼(Recommended_Ratio/Minimum_Line_Length) = 4개의 개별 null 셀이다. 미확인 16건→19건, 총계 16건→19건으로 재계산. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — speakers 카테고리(Kara_IIi의 delay_defaults가 기존에 참조만 하던 "SB18 IIi"의 실제 원본 최초 투입). SB6i_v1.2.md를 스켈레톤으로 사용(install 전용 terminal block 아키텍처 공유, 단 SB18 IIi는 단일 18" 대구경). SB18_IIi_OM_EN_3.0.pdf 본문이 "SB18 IIi is the dedicated subwoofer for Kara IIi"로 명시해, 이름 유사성이 아닌 원본 근거로 SB18(투어, Kara II 짝)/SB18i(구세대 install, "Karai" 짝)와 완전히 별개의 제품임을 확정. AE의 라벨 없는 이중 대역폭 세트를 SB18(투어) 및 자신의 Listening test 표와 대조해 [SB18_100]/[SB18_60] 프리셋으로 귀속(추론 근거 각주 명시). OM p.54 "Enclosure drive capacity per amplified controller" 표에서 4개 컨트롤러(LA2Xi/LA4X/LA8/LA12X)별 SE/BTL 구분 포함 상세 매칭 수치를 신규 확보. Handles=0을 원본 전량 스캔으로 확정(SB18 투어는 4개 핸들 보유와 대조). mechanical_safety 6개 구성 전부 실값 확보(폴라리티 이미지 렌더링 불필요 — 이 섹션은 아이콘이 아닌 텍스트 수치 표). |
| v1.1 | 프로젝트 전역 동기화 라운드(사용자 지시 2026-07-17). Product_Series(null)/Product_Type(Subwoofer) Key 신설 — SB18_IIi_AE_EN.docx 최상단 헤더 기준, 시리즈명 줄이 없어 Product_Series는 null. Cardioid_Capability="Array-based only(4대 어레이 중 1대 반전 배치 필요)" 신설 — OM "SB18 IIi in cardioid configuration"(4대 어레이 중 1대 반전 배치) 근거, KS21/SB18(투어)과 동일 유형이며 C/Cx 이원 구조 모두 확인됨. d&b 고유 개념인 signal_processing 섹션(CUT_Mode_Available/HFC_Function_Settings/Coupling_Function_Range) 삭제 — L-Acoustics 제품에는 해당 개념 자체가 없어 비적용 표기에서 섹션 삭제로 정리. null 총계 19건(비적용 3건)에서 16건(비적용 0건)으로 갱신. |
| v1.1 to v1.2 | (표기 정정, Minor) 각주 버전 참조 최신성 감사(2026-07-18)에서 preset_guide_and_matching의 Recommended_Ratio/Minimum_Line_Length 미확인이 "양 행"이라는 서술로 뭉뚱그려져 실제로는 2개 Configuration 행×2개 컬럼=4개 셀인데도 총계 산정 시 1건으로만 반영되어 있던 결합형 불릿 오카운트를 발견·정정(K1_v1.11.md/L2_v1.7.md와 동일 유형). 미확인 16건→19건, 총계 16건→19건으로 재계산. 데이터(Key/Value/Unit) 자체는 전혀 변경하지 않았다. |
