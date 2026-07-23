# ALi90 (d&b audiotechnik) — Master Schema

**Category**: speakers | **Brand**: d&b audiotechnik (db) | **Schema Phase**: Phase 4 (ALi60과 동시 투입, 90° 지향각 형제 제품)

**스켈레톤 근거**: `speakers/db/ALi60_v1.0.md`(형제 파일) — 음향/드라이버/파워/치수/커넥터/신호처리/리깅 전 항목이 ALi60과 완전 동일(동일 원본 문서 조합: arch-specs txt+datasheet+ALi60/ALi90 공용 매뉴얼). 베리언트 종속 차이는 수평 지향각(60°→90°)·유지 하한 주파수(550→370Hz)·Model_Number·EN54 제품코드뿐.

**원본 문서 특이사항 — AE 자체 결함(신규 발견)**: `ALi90_AE_EN.txt` 원문 말미에 "The dimensions... shall weigh no more than 22 kg (48.5 lb). The loudspeaker shall be..." 문장이 나온 직후, 동일한 치수 문장이 **중복 서술**되며 이번엔 "shall weigh no more than 20 kg (44 lb)"로 다른 무게가 재등장한다 — 22kg과 20kg 두 무게가 한 문서 안에서 충돌하는, 문서 생성 시스템의 중복/병합 오류로 추정되는 결함(ALi60_AE_EN.txt에는 이런 중복이 없음, ALi90에서만 발생). 아래 각주에서 이 결함을 그대로 보존한다.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | ALi90 | - |
| Model_Number | Z0733 | - |
| Product_Series | A-Series | - |
| Product_Category | augmented array loudspeaker for medium scale sound reinforcement applications | - |
| Product_Type | Line array loudspeaker | - |
| Description | 2-way bipolar passive loudspeaker, 2 x 10" neodymium LF drivers + 1 x 1.4" exit HF compression driver, 90° x 30° nominal dispersion, passive crossover network, installation specific | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards [1] | in conformity with the provisions of the respective directives (specific directive names not enumerated in OM); EN54-24:2008/ISO 7240-24:2016 certified (WR/SWR/SVS variants, Z0733.541/542/543), certified by Kiwa Nederland B.V. | - |
| WEEE_Marking | Yes (EU), WEEE-Reg.-Nr. DE: 13421928 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: ALi90_AE_EN.txt; ALi90_SPS_EN_1.1.pdf; ALi60_ALi90_OM_EN_1.4.pdf(공용 매뉴얼) p.13.
**Model_Number**: OM p.13 "d&b Z0733 ALi90 loudspeaker".
**[1] Compliance_Standards**: OM p.13 "EN54 Approval" — Z0733.541(WR)/542(SWR)/543(SVS), ALi60과 동일 인증 구조(제품코드만 다름).

## acoustical_performance

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | null | Hz |
| Frequency_Response_6dB_Hz | null | Hz |
| Frequency_Response_5dB_Hz | 60 - 18000 | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Frequency_Response_3dB_Hz | null | Hz |
| Max_SPL_Peak | 139 | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| Max_SPL_Single_Module | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg [1] | 90 | deg |
| Nominal_Directivity_Vertical | null | - |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | AL90 PS; AL90 Out; AL90 In; AL90 AP | - |

### 주석 및 출처 (Notes & Sources)

**출처**: ALi90_SPS_EN_1.1.pdf; OM p.11.
**[1] Nominal_Directivity_Horizontal_deg**: "Broadband horizontal directivity control of 90° shall be maintained down to 370 Hz" — ALi60(550Hz)보다 낮은 하한.
**나머지 근거**: ALi60_v1.0.md와 동일(Max_SPL_Peak 앰프 조건, Cardioid_Capability 전량 스캔 등).

## signal_processing

ALi60_v1.0.md와 완전 동일.

| Key | Value | Unit |
|---|---|---|
| CUT_Mode_Available | Yes | - |
| HFA_Function_Settings | PS setup only; HF roll-off begins at 1 kHz, approx. -3 dB at 10 kHz | - |
| CUT_Mode_Frequency_Response_5dB_Hz | 95 - 18000 | Hz |
| CUT_Mode_Frequency_Response_10dB_Hz | null | Hz |
| HFC_Function_Settings | HFC1: >15 m additional distance; HFC2: >25 m additional distance (reference: 40% RH) | - |
| Coupling_Function_Range | attenuation 0 to -9 dB (begins ~1kHz, max below 400Hz); optional boost 0 to +5 dB at ~65Hz (full range mode without subwoofers) | dB |

### 주석 및 출처 (Notes & Sources)

**출처 및 근거**: ALi60_v1.0.md와 동일(OM p.9).

## transducers

| Key | Value | Unit |
|---|---|---|
| LF_Transducer | 2 x 10" neodymium | - |
| HF_Transducer | 1 x 1.4" exit compression driver with 3" coil/diaphragm, dedicated wave shaping device | - |
| LF_Acoustical_Load | null | - |
| HF_Acoustical_Load | dedicated wave shaping device | - |
| Passive_Crossover_Network | Yes | - |
| LF_Nominal_Impedance | null | Ohm |
| HF_Nominal_Impedance | null | Ohm |
| Nominal_Impedance_Overall | 8 | Ohm |
| RMS_Power_Handling_LF | null | W |
| RMS_Power_Handling_HF | null | W |
| RMS_Power_Handling_Overall | 400 | W |
| Peak_Power_Handling_10ms_Overall | 1800 | W |

### 주석 및 출처 (Notes & Sources)

**출처 및 근거**: ALi60_v1.0.md와 동일(LF/HF_Nominal_Impedance·RMS_Power_Handling_LF/HF 비적용 사유 포함) — 드라이버/파워/임피던스 완전 동일 재확인.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector | 4-pole Phoenix connector socket (Type DFK PC 4/4 GF) | - |
| Link_Connector | pins 3/4 (same socket, linked internally to pins 1/2) | - |
| Phoenix_Pinout_Pin1 | LF+HF signal + | - |
| Phoenix_Pinout_Pin2 | LF+HF signal - | - |
| Phoenix_Pinout_Pin3 | linked to Pin1 (link-through +) | - |
| Phoenix_Pinout_Pin4 | linked to Pin2 (link-through -) | - |

### 주석 및 출처 (Notes & Sources)

**출처 및 근거**: ALi60_v1.0.md와 동일(OM p.6).

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller [1] | 30D (recommended); D20, D80 (also usable per SPS) | - |
| Max_Enclosures_Per_Controller_Output | 2 | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type | Passive (2-way) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: ALi90_SPS_EN_1.1.pdf "The installation specific d&b 30D amplifier is recommended to drive the ALi90... The d&b D20 and D80 amplifiers can also be used."; OM p.7 "Applicable d&b amplifiers: 30D | 40D".
**[1] Compatible_Amplified_Controller**: ALi60과 동일한 SPS-OM 상충(30D+D20/D80 vs 30D+40D) — 상세 근거는 ALi60_v1.0.md 참조.

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type | 3 x M10 threaded inserts (one side panel) for dedicated flying adapter; WR option cover plate with single/dual PG13.5 cable glands | - |
| Inter_Enclosure_Angles_deg | 20, 25, 30, 35, 40 | deg |
| Handles | null | - |
| Weight_Net [1] | 23 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: ALi90_SPS_EN_1.1.pdf "Weight 23 kg (51 lb)"; OM p.11 "Weight 23 kg (51 lb)".
**Handles=null**: ALi60과 동일 사유(원문에 handle 서술 없음).
**[1] Weight_Net — 소스 3중 불일치**: SPS와 OM은 일치되게 23kg을 명시하나, ALi90_AE_EN.txt는 파일 서두에 서술한 대로 "22 kg" 문구 뒤에 중복된 문장에서 "20 kg"이 다시 등장하는 원본 자체의 결함이 있다(파일 서두 "원본 문서 특이사항" 참조). SPS/OM 양쪽이 일치하는 23kg을 대표값으로 채택, AE의 22kg/20kg 두 값 모두 미상으로 병기 보존(AE 문서 자체의 중복 오류로 판단, 신뢰도 낮음).

## physical

| Key | Value | Unit |
|---|---|---|
| Width_mm | 700 | mm |
| Height_mm | 322 | mm |
| Depth_mm | 356 | mm |
| Dimensions_Raw | null | mm |
| Cabinet_Material | marine plywood | - |
| Front_Material | rigid metal grill backed by acoustically transparent fabric | - |
| Rigging_Components_Material | null | - |
| Finish_Color | black (standard); special colors per RAL table upon request | - |
| Finish_Type | impact resistant black paint finish (standard); impact and weather protected black PCP finish (WR option) | - |
| IP_Rating [1] | null | - |

### 주석 및 출처 (Notes & Sources)

**출처 및 근거**: ALi60_v1.0.md와 동일(Finish 판단 근거 포함).
**[1] IP_Rating**: ALi90_AE_EN.txt에도 ALi60과 동일한 병합필드 오류("[ERROR: Missing definition for variable "IP_rating_1"!]")가 그대로 있음 — 동일 사유로 미확인 유지.

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| null | null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: ALi60_v1.0.md와 동일.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms |
|---|---|---|
| null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: ALi60_v1.0.md와 동일.

## mechanical_safety

| Configuration | Rigging_Accessory | Safe_Limit | Maximum_Limit |
|---|---|---|---|
| flown | Z5455 AL Flying frame | null | 4 |
| horizontal cluster | Z5456 AL Flying adapter | null | 4 |
| ground-stacked | Z5458 AL Base plate | null | 3 |

| Key | Value | Unit |
|---|---|---|
| Safety_Factor | null | - |
| Max_Wind_Load | null | Beaufort |

### 주석 및 출처 (Notes & Sources)

**출처 및 근거**: ALi60_v1.0.md와 동일(OM p.5, Vi-SUB/Vi-GSUB 베이스플레이트 병용).

## Null Report

**미확인(정보 부족)**: Usable_Bandwidth_Hz, Frequency_Response_6dB_Hz, Frequency_Response_4dB_Hz, Frequency_Response_3dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, Max_SPL_Single_Module, AES75_Max_Linear_SPL, Nominal_Directivity_Vertical, LF_Acoustical_Load, Max_Enclosures_Per_Controller_Total, Handles, Rigging_Components_Material, IP_Rating, CUT_Mode_Frequency_Response_10dB_Hz, preset_guide_and_matching(전 항목), delay_defaults(전 항목), mechanical_safety(Safe_Limit 3건), Safety_Factor, Max_Wind_Load — 20건.
**비적용**: LF_Nominal_Impedance, HF_Nominal_Impedance, RMS_Power_Handling_LF, RMS_Power_Handling_HF(단일 통합값만 존재) — 4건.

**총계**: null 24건 (미확인 20건 + 비적용 4건). 확정적 비존재(0/No)로 명시한 항목은 1건 — Cardioid_Capability(No). ALi60과 총계까지 일치.

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — ALi60과 동시 투입(2026-07-19), ALi60_v1.0.md를 스켈레톤으로 사용(형제 파일). 베리언트 종속 값(Nominal_Directivity_Horizontal_deg=90°, 유지 하한=370Hz, Model_Number=Z0733, EN54 제품코드 Z0733.541/542/543)만 자신의 원문값으로 대입. 신규 발견: ALi90_AE_EN.txt 원문 자체에 무게 수치 중복 오류(22kg 서술 직후 20kg으로 재서술) — SPS/OM이 일치하는 23kg을 채택하고 AE의 두 값 모두 보존. 나머지 전 섹션은 ALi60과 완전 동일. Null Report 24건(미확인 20건+비적용 4건), ALi60과 총계까지 일치. |
