# L2D (L-Acoustics) — Master Schema

**Category**: speakers | **Brand**: L-Acoustics (LA) | **Schema Phase**: Phase 3-1 (동일 브랜드 이기종 — L2의 자매품)

**스켈레톤 근거**: `speakers/LA/L2_v1.3.md`를 뼈대로 사용 — L2D는 L2와 동일한 원본 OM(L2 owner's manual EN version 5.0)에서 함께 다뤄지는 자매품이다. L2D 전용 A&E 시방서(`L2D_AE_EN.docx`)로 L2D 고유 스펙(60° 커버리지, 저중량, 상이한 Directivity/치수/Max SPL)을 OM 부록 스펙 표와 A&E 양쪽에서 교차 확인했다. 트랜스듀서 구성(4x12" LC + 8x10" LF + 8x3" HF)·커넥터(37-point, 32핀)·앰프 호환성은 L2와 완전 동일 — 차이는 수직 커버리지(10° vs 60°), 하부 2개 모듈의 고정 프로그레시브 지향각(110°-140°), 중량(158kg vs 149kg), Max SPL(155/147dB vs 151/147dB)에 있다.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | L2D | - |
| Model_Number | null | - |
| Product_Series | L Series | - |
| Product_Category | 16-channel active progressive curvature WST enclosure | - |
| Product_Type | Progressive Curvature Line Source | - |
| Description | 16-channel active progressive curvature WST 60 deg enclosure: 4 x 12" LC + 8 x 10" LF + 8 x 3" HF, amplified by LA7.16 / LA7.16i | - |
| Way_Count | 3 (LC/LF/HF) | - |
| Onboard_Amplification | No | - |
| Compliance_Standards | 2006/42/EC Machinery Directive (rigging system, designed per BGV-C1 guidelines) | - |
| WEEE_Marking | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: L2_OM_EN_5.0.pdf(L2 owner's manual EN version 5.0) p.181 "L2D specifications", p.6("Safety > Instructions", L2/L2D 공용 챕터); L2D_AE_EN.docx "Description"/"Short description".
**Product_Series/Product_Type**: L2D_AE_EN.docx 최상단 헤더("L2D - Long throw PROGRESSIVE line source" / "L Series" / "Progressive 60 degree vertical coverage") — L2와 동일 근거로 "Progressive Curvature Line Source" 채택.
**Compliance_Standards**: L2와 공용되는 "Mechanical safety" 챕터에서 채택 — L2D 전용 별도 조항은 없음.

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | 45 - 20000 | Hz |
| Frequency_Response_6dB_Hz | null | Hz |
| Frequency_Response_3dB_Hz | null | Hz |
| Max_SPL_Peak | 151 | dB |
| Max_SPL_Single_Module | 147 | dB |
| Nominal_Directivity_Horizontal_deg | (upper 2 modules) 70/110 symmetric or 90 asymmetric; (lower 2 modules) fixed progressive 110-140 | deg |
| Nominal_Directivity_Vertical | 60 | deg |
| Cardioid_Capability | Built-in per-element (전용 LC 드라이버군 + 프리셋 선택, 반전 유닛 불필요) | - |
| DSP_Preset_Name | L2D 70 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: L2_OM_EN_5.0.pdf p.181 "L2D specifications"; L2D_AE_EN.docx "Technical requirements".
**Usable_Bandwidth_Hz -10dB 확정**: L2와 동일 사유 — OM 스펙 표에는 dB 임계값이 없으나 L2D_AE_EN.docx가 "Usable bandwidth: 45 Hz - 20 kHz (-10 dB)"로 명시.
**Max_SPL_Peak/Max_SPL_Single_Module**: 원문(OM) "Maximum SPL: entire enclosure module 151 dB([L2D 70]) / 1 only 147 dB([L2D 70])" — L2(155/147dB)보다 entire-enclosure 값이 낮음(60° 커버리지로 인한 음향 출력 분산 차이로 추정).
**Nominal_Directivity_Horizontal_deg 구조 상이**: L2는 전 모듈이 동일한 수평 지향각 설정을 공유하나, L2D는 상부 2개 모듈만 사용자 조정 가능(70/110/90)하고 하부 2개 모듈은 고정된 프로그레시브 지향각(110°→140°)을 가짐 — L2D가 어레이 최하단 전용으로 설계된 것과 관련.
**Nominal_Directivity_Vertical=60**: L2(10°)와 구분되는 L2D의 핵심 아키텍처 차이 — 어레이 최하단에 배치되어 넓은 수직 커버리지를 담당하도록 설계됨.
**Cardioid_Capability**: L2와 동일 근거·동일 유형(공용 챕터) — 전용 LC 드라이버군(4x12") 내장 + standard array + 프리셋 선택으로 성립, 반전 유닛 불필요.

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 8 x 10" neodymium cone drivers | - |
| HF_Transducer | 8 x 3" neodymium diaphragm compression drivers | - |
| LC_Transducer | 4 x 12" neodymium cone drivers | - |
| LF_Acoustical_Load | bass-reflex, L-Vents | - |
| HF_Acoustical_Load | DOSC waveguide, L-Fins (upper part) | - |
| LC_Acoustical_Load | bass-reflex, L-Vents | - |
| Passive_Crossover_Network | No | - |
| LF_Nominal_Impedance | 8 | Ohm |
| HF_Nominal_Impedance | 8 | Ohm |
| LC_Nominal_Impedance | 8 | Ohm |
| Nominal_Impedance_Overall | null | Ohm |
| RMS_Power_Handling_LC | 561 | W |
| RMS_Power_Handling_LF | 644 | W |
| RMS_Power_Handling_HF | 381 | W |
| RMS_Power_Handling_Overall | null | W |

### 주석 및 출처 (Notes & Sources)

**출처**: L2_OM_EN_5.0.pdf p.181 "L2D specifications"; L2D_AE_EN.docx "Technical requirements".
**트랜스듀서 스펙 L2와 완전 동일**: 드라이버 구성·재질·임피던스(모두 8Ω)·RMS 파워 핸들링(LC 561W/LF 644W/HF 381W) 모두 L2와 동일값 — L2D_AE_EN.docx와 L2_AE_EN.docx의 대응 항목이 문자 그대로 일치함을 직접 대조 확인.
**HF_Acoustical_Load "(upper part)" 한정**: 원문 "HF: DOSC waveguide, L-Fins (upper part)" — L2는 이 한정어가 없는 반면 L2D는 상부 2개 모듈에만 해당 웨이브가이드 구조가 적용됨을 명시.
**Passive_Crossover_Network=No**: L2와 동일 사유(공용 OM 텍스트, 16채널 완전 개별 구동 구조).

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 1 x 37-point male connector (32 points used) | - |
| Link_Connector | null | - |
| Connector_16Channel_Pinout | A/B=LC1, C/D=LF1/LF2, E/F=HF1, G/H=HF2, J/K=LC2, L/M=LF3/LF4, N/P=HF3, R/S=HF4, T/U=LC3, V/W=LF5/LF6, X/Z=HF5, a/b=HF6, c/d=LC4, e/f=LF7/LF8, g/h=HF7, j/k=HF8, m/n/p/r/s=not used | - |

### 주석 및 출처 (Notes & Sources)

**출처**: L2_OM_EN_5.0.pdf p.24 "Connectors" — L2/L2D 공용 페이지, "L2 ... 1 x 37-point male connector (32 points used) / L2D ... 1 x 37-point male connector (32 points used)"로 병기되고 핀아웃 표는 하나만 제공됨.
**Connector_16Channel_Pinout 값 L2와 동일**: 원문이 L2/L2D 공용 단일 표로 제공 — 별도 L2D 전용 핀아웃 없음.
**Link_Connector 비적용 사유**: L2와 동일 — IN 1개(37-point)만 명시.

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller | LA7.16, LA7.16i | - |
| Max_Enclosures_Per_Controller_Output | null | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type | Active (16-channel) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: L2_OM_EN_5.0.pdf p.51 "Loudspeaker configurations"("L2/L2D can be driven by the LA7.16 / LA7.16i amplified controllers"), p.181 "L2D specifications" Description 행.

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | flush-fitting 4-point captive rigging system compatible with L2; front rotating arm + rear sliding arm, automatic latch system | - |
| Inter_Enclosure_Angles_deg | null | deg |
| Handles | 4 | count |
| Weight_Net | 149 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: L2_OM_EN_5.0.pdf p.181 "L2D specifications"; p.24-25 "Rigging system description"; L2D_AE_EN.docx "Physical data"(Weight_Net 교차 확인).
**Handles=4, ground runner 없음**: 원문(OM) "Rigging and handling: flush-fitting 4-point captive rigging system compatible with L2 / 4 handles" — L2는 "4 handles / 4 ground runners"로 그라운드 러너가 별도 명시되나 L2D는 handles만 명시 — L2D가 항상 어레이 최하단에 위치해 별도 지면 접지 러너가 불필요한 설계로 추정.

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 850 | mm |
| Height_mm | 1252 | mm |
| Depth_mm | 559 | mm |
| Dimensions_Raw | 850 / 1207 / 1252 / 559 | mm |
| Cabinet_Material | premium grade Baltic beech and birch plywood | - |
| Front_Material | coated steel grill, acoustically neutral 3D fabric | - |
| Rigging_Components_Material | high grade steel with anti-corrosion coating | - |
| Finish_Color | dark grey brown Pantone 426 C, pure white RAL 9010, custom RAL code on special order | - |
| IP_Rating | IP55 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: L2_OM_EN_5.0.pdf p.181-182 "L2D specifications"/"L2D dimensions"; L2D_AE_EN.docx "Physical data" - "Dimensions (W, H, D): 850 mm, 1252 mm, 559 mm".
**Width/Height/Depth_mm 축 확정**: L2D_AE_EN.docx가 축을 명시적으로 확정. Dimensions_Raw는 OM 도면에서 추출된 4개 숫자(850/1207/1252/559)를 그대로 보존.
**Weight_Net=149kg**: L2(158kg)보다 9kg 가벼움 — OM/AE 양쪽 모두 149kg으로 일치.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| L2D line source (단독) | [L2D 70] / [L2D 90] / [L2D 110] / [L2D 70_S] / [L2D 90_S] / [L2D 110_S] | 45 - 20000 | null | null |
| L2D line source with coupled KS28 | [L2D 70]/[L2D 90]/[L2D 110]/[L2D 70_S]/[L2D 90_S]/[L2D 110_S] + [KS28 L2_C]/[KS28 L2_Cx] | 25 - 20000 | null | null |
| L2D line source with separated KS28 | [L2D 70]/[L2D 90]/[L2D 110]/[L2D 70_S]/[L2D 90_S]/[L2D 110_S] + [KS28 L2]/[KS28 L2_C]/[KS28 L2_Cx] | 25 - 20000 | null | null |

### 주석 및 출처 (Notes & Sources)

**출처**: L2_OM_EN_5.0.pdf p.51-53 "Loudspeaker configurations"(L2/L2D 공용 챕터).
**Recommended_Ratio/Minimum_Line_Length null 사유**: L2와 동일 — 원문이 비율/최소 길이가 아닌 물리적 거리(coupled) 또는 최대 간격(separated)으로 정보를 제공.
**Coupled KS28 배치 거리**: L2와 완전 동일 값 — "KS28 behind: 1 m to 2 m(권장)" / "KS28 beside: 0.5 m to 1 m".
**Separated KS28 간격**: L2와 동일 — 최대 인접 서브우퍼 간격 2.8 m(상한 주파수 60Hz 기준).

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms | Polarity |
|---|---|---|---|
| [L2D] + [KS28 L2] | 0 | KS28 = 5 | L2D = + / KS28 = - |
| [L2D] + [KS28 L2_C] | 0 | KS28 = 0 | L2D = + / KS28 = - |
| [L2D] + [KS28 L2_Cx] | 0 | KS28 = 5 | L2D = + / KS28 = - |

### 주석 및 출처 (Notes & Sources)

**출처**: L2_OM_EN_5.0.pdf p.54 "Pre-alignment delays"("L2/L2D + KS28" 표, L2/L2D 공용). 극성 데이터는 색상 아이콘 표기라 페이지 이미지 렌더링으로 육안 확인 — L2D도 항상 "+", KS28은 항상 "-".

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| flown | L2-ROLL | 1 L2D | 1 L2D |
| stacked | L2D-CHARIOT + K2-JACK | 1 L2D | 1 L2D |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | 4:1 | - |
| Max_Wind_Load | 6 | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처**: L2_OM_EN_5.0.pdf "Mechanical safety > Flown configurations / Other configurations"(L2/L2D 공용 챕터, "L2 or L2D or L2 + L2D" 표); Safety 섹션(Max_Wind_Load, "6 bft", L2와 공용).
**순수 L2D 단독 값만 채택**: 원문 표는 L2/L2D 혼합 배열까지 함께 표기하는 복잡한 구조("4 L2 or 3 L2 + 1 L2D" 등)이며, L2D는 설계상 항상 어레이 최하단 1개 엘리먼트로 사용되도록 되어 있어 순수 L2D만으로 구성된 다중 배열 숫자는 원문에 없음 — 애매함 없이 "L2D 단독" 값이 명시된 두 행만 채택.

## Null Report

**미확인**: Model_Number, WEEE_Marking, Frequency_Response_6/3/5/4dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, AES75_Max_Linear_SPL, RMS_Power_Handling_Overall, Nominal_Impedance_Overall, Max_Enclosures_Per_Controller_Output/Total, Inter_Enclosure_Angles_deg, preset_guide_and_matching(6건) — 19건.
**비적용**: Link_Connector, Peak_Power_Handling_10ms_Overall — 2건.

**총계**: null 21건(미확인 19건 + 비적용 2건). 확정적 비존재(No): Passive_Crossover_Network 1건.

---

**[MR_v1.8 반영 메모]**: 이 파일은 `upload/L2D_v1.6.md`를 이 저장소의 raw-spec으로 이관한 것이다(기존 역재구성본을 대체, 원본 파일 자체는 없어 폴더화하지 않음). `public/js/domains/speakers/data/la/l-series.data.js`에 Cardioid_Capability/Preset Guide/Delay Defaults/Mechanical Safety를 신규 반영했다. 기존 필드(dims/freqs/watt 등)는 대조 후 이상 없음.
