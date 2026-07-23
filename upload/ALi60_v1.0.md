# ALi60 (d&b audiotechnik) — Master Schema

**Category**: speakers | **Brand**: d&b audiotechnik (db) | **Schema Phase**: Phase 4 (d&b 11번째 제품군, AL60 대비 설치용 버전)

**스켈레톤 근거**: `speakers/db/AL60_v1.0.md`를 뼈대로 사용 — 음향/드라이버/파워/치수는 AL60과 동일하나, 설치용(i) 버전 차이가 XSLi8 사례보다 훨씬 크다: **커넥터가 NLT4가 아닌 Phoenix 전용**(NLT4 옵션 자체 없음), **핸들 없음**(원문에 handle 서술 자체가 없음, AL60은 명시적으로 있음), **마감이 PCP가 아닌 impact resistant black paint**(날씨방수는 WR 옵션으로만), **이 브랜드 최초로 EN54(화재경보/음성경보 방재) 인증 확보**.

## general

| Key | Value | Unit |
|---|---|---|
| Product_Name | ALi60 | - |
| Model_Number | Z0732 | - |
| Product_Series | A-Series | - |
| Product_Category | augmented array loudspeaker for medium scale sound reinforcement applications | - |
| Product_Type | Line array loudspeaker | - |
| Description | 2-way bipolar passive loudspeaker, 2 x 10" neodymium LF drivers + 1 x 1.4" exit HF compression driver, 60° x 30° nominal dispersion, passive crossover network, installation specific | - |
| Way_Count | 2 | - |
| Onboard_Amplification | No | - |
| Compliance_Standards [1] | in conformity with the provisions of the respective directives (specific directive names not enumerated in OM); EN54-24:2008/ISO 7240-24:2016 certified (WR/SWR/SVS variants, Z0732.541/542/543), certified by Kiwa Nederland B.V. | - |
| WEEE_Marking | Yes (EU), WEEE-Reg.-Nr. DE: 13421928 | - |

### 주석 및 출처 (Notes & Sources)

**출처**: ALi60_AE_EN.txt; ALi60_SPS_EN_1.1.pdf; ALi60_ALi90_OM_EN_1.4.pdf(공용 매뉴얼) p.13 "Manufacturer's declarations".
**Model_Number**: OM p.13 "d&b Z0732 ALi60 loudspeaker".
**[1] Compliance_Standards — 이 브랜드 최초 EN54 인증(신규 발견)**: OM p.13 "3.2 EN54 Approval" — 화재경보/음성경보 시스템용 유럽 표준(EN54-24) 인증. 3개 하위 제품코드(Z0732.541=WR/542=SWR/543=SVS 변형)별로 개별 인증됨, Kiwa Nederland B.V.가 인증기관. 기존 db 제품에는 없던 완전히 새로운 컴플라이언스 카테고리 — 별도 Key 신설보다 Compliance_Standards 확장 서술로 충분하다고 판단(범용 "규격 준수" 개념 범주 내).

## acoustical_performance

ALi60은 AL60과 동일한 음향 스펙(형제 파일 근거 동일).

| Key | Value | Unit |
|---|---|---|
| Usable_Bandwidth_Hz | null | Hz |
| Frequency_Response_6dB_Hz | null | Hz |
| Frequency_Response_5dB_Hz | 60 - 18000 | Hz |
| Frequency_Response_4dB_Hz | null | Hz |
| Frequency_Response_3dB_Hz | null | Hz |
| Max_SPL_Peak [1] | 139 | dB |
| Max_SPL_4x_Array_Far_Field_Scaled_1m | null | dB |
| Max_SPL_Single_Module | null | dB |
| AES75_Max_Linear_SPL | null | - |
| Nominal_Directivity_Horizontal_deg [2] | 60 | deg |
| Nominal_Directivity_Vertical | null | - |
| Cardioid_Capability | No | - |
| DSP_Preset_Name | AL60 PS; AL60 Out; AL60 In; AL60 AP | - |

### 주석 및 출처 (Notes & Sources)

**출처**: ALi60_SPS_EN_1.1.pdf; OM p.11.
**[1] Max_SPL_Peak**: 원문 "with 30D/D20: 138 dB / with D80: 139 dB" — AL60과 동일 두 조건, 더 높은 값(139dB) 채택.
**[2] Nominal_Directivity_Horizontal_deg — 유지 하한 주파수**: "Broadband horizontal directivity control of 60° shall be maintained down to 550 Hz" — AL60과 동일.
**DSP_Preset_Name**: OM p.7 표에 "AL60 PS/Out/In/AP" 표기 그대로 등장(ALi60 자신의 이름이 아니라 AL60 표기를 재사용 — 원문 그대로 보존, 오기재로 추정되나 임의 수정하지 않음).
**Cardioid_Capability=No**: ALi60_AE_EN.txt/ALi60_SPS_EN_1.1.pdf/OM 전량 "cardioid" 스캔 — 0건.

## signal_processing

AL60_v1.0.md와 완전 동일(OM p.9 "Controller settings" 서술이 AL/ALi 두 매뉴얼에 동일하게 수록됨).

| Key | Value | Unit |
|---|---|---|
| CUT_Mode_Available | Yes | - |
| HFA_Function_Settings | PS setup only; HF roll-off begins at 1 kHz, approx. -3 dB at 10 kHz | - |
| CUT_Mode_Frequency_Response_5dB_Hz | 95 - 18000 | Hz |
| CUT_Mode_Frequency_Response_10dB_Hz | null | Hz |
| HFC_Function_Settings | HFC1: >15 m additional distance; HFC2: >25 m additional distance (reference: 40% RH) | - |
| Coupling_Function_Range | attenuation 0 to -9 dB (begins ~1kHz, max below 400Hz); optional boost 0 to +5 dB at ~65Hz (full range mode without subwoofers) | dB |

### 주석 및 출처 (Notes & Sources)

**출처 및 근거**: AL60_v1.0.md와 동일(OM p.9).

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

**출처 및 근거**: AL60_v1.0.md와 동일(단일 채널 통합값 채택 원칙, LF/HF_Nominal_Impedance·RMS_Power_Handling_LF/HF 비적용 사유 포함) — 드라이버/파워/임피던스 완전 동일 재확인.

## connectivity

| Key | Value | Unit |
|---|---|---|
| Input_Connector [1] | 4-pole Phoenix connector socket (Type DFK PC 4/4 GF) | - |
| Link_Connector | pins 3/4 (same socket, linked internally to pins 1/2) | - |
| Phoenix_Pinout_Pin1 | LF+HF signal + | - |
| Phoenix_Pinout_Pin2 | LF+HF signal - | - |
| Phoenix_Pinout_Pin3 | linked to Pin1 (link-through +) | - |
| Phoenix_Pinout_Pin4 | linked to Pin2 (link-through -) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: OM p.6 "2.2 Connections" — "The cabinets are fitted with a 4-pole Phoenix connector socket (Type: DFK PC 4/4 GF) using the pin assignment 1:+, 2:-, 3:+, 4:-. Pins 1/3 and 2/4 are linked. A corresponding Phoenix plug (Type: SPC 5/4) is enclosed with the cabinet. Using pin 1/2 as the input, pin 3/4 allows for direct connection to a second cabinet."
**[1] Input_Connector — AL60과 근본적으로 다른 커넥터 체계**: AL60(NLT4 F/M 기본+NL4 옵션)과 달리 ALi60은 Phoenix 소켓 하나만 제공, NLT4/NL4 옵션 자체가 원문에 없음 — XSLi8(NLT4 기본+Phoenix 옵션 병존)과도 다른 패턴, ALi60/90은 Phoenix 단독.

## amplification_requirements

| Key | Value | Unit |
|---|---|---|
| Compatible_Amplified_Controller [1] | 30D (recommended); D20, D80 (also usable per SPS) | - |
| Max_Enclosures_Per_Controller_Output | 2 | count |
| Max_Enclosures_Per_Controller_Total | null | count |
| Crossover_Type | Passive (2-way) | - |

### 주석 및 출처 (Notes & Sources)

**출처**: ALi60_SPS_EN_1.1.pdf "The installation specific d&b 30D amplifier is recommended to drive the ALi60... The d&b D20 and D80 amplifiers can also be used."; OM p.7 "Applicable d&b amplifiers: 30D | 40D".
**[1] Compatible_Amplified_Controller — SPS와 OM 간 상충**: SPS는 30D(권장)+D20/D80(대안)을 명시하는 반면, OM의 공식 "Applicable d&b amplifiers" 표는 "30D | 40D"로 D20/D80 대신 40D를 명시 — 두 목록이 서로 다른 앰프(40D vs D20/D80)를 제시하는 명백한 상충. SPS의 서술을 대표값으로 채택(권장 앰프까지 구체적으로 명시)하되 OM의 40D 언급을 각주로 보존, 어느 쪽이 최신 정보인지 판단할 근거 없음.

## rigging_handling

| Key | Value | Unit |
|---|---|---|
| Rigging_System_Type [1] | 3 x M10 threaded inserts (one side panel) for dedicated flying adapter; WR option cover plate with single/dual PG13.5 cable glands | - |
| Inter_Enclosure_Angles_deg | 20, 25, 30, 35, 40 | deg |
| Handles [2] | null | - |
| Weight_Net | 23 | kg |

### 주석 및 출처 (Notes & Sources)

**출처**: ALi60_AE_EN.txt "Three M10 threaded inserts shall be integrated in one side panel..."; OM p.6 "WR option (Weather Resistance)".
**[1] WR 옵션**: OM — "The WR option enables operation of loudspeakers in changing ambient conditions... not intended to enable permanent, unprotected operation outdoors." WR 캐비닛은 impact and weather protected black PCP 마감 + PG13.5 케이블 글랜드 커버플레이트 장착. 표준(비WR) 버전은 impact resistant black paint 마감만(방수 아님).
**[2] Handles=null**: AL60_AE_EN.txt는 "one handle in each side panel"을 명시하나, ALi60_AE_EN.txt/SPS/OM 어디에도 handle 관련 서술이 없음 — AL60과의 실제 차이인지 단순 누락인지 원문만으로 확정할 수 없어 미확인으로 보수적 처리(임의로 "AL60과 같다"고 가정하지 않음).

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
| Finish_Color [1] | black (standard); special colors per RAL table upon request | - |
| Finish_Type [1] | impact resistant black paint finish (standard); impact and weather protected black PCP finish (WR option) | - |
| IP_Rating [2] | null | - |

### 주석 및 출처 (Notes & Sources)

**출처**: ALi60_AE_EN.txt "The cabinet enclosure shall be constructed from marine plywood with an impact resistant black paint finish. Special colors according to RAL table and a weather resistant option shall be available upon request."
**[1] Finish — AL60과 다른 기본 마감**: AL60은 PCP(날씨방수)가 기본이나, ALi60은 black paint가 기본이고 PCP는 WR 옵션에서만 적용 — 설치용 버전이 실내 사용을 기본 전제하는 것으로 판단됨.
**[2] IP_Rating — 원본 문서 자체의 병합필드 오류(신규 발견)**: ALi60_AE_EN.txt 원문에 "The cabinet shall be **[ERROR: Missing definition for variable "IP_rating_1"!]** rated in accordance to IEC529."라는 문구가 그대로 남아있다 — 이 시방서를 생성한 문서 자동화 시스템의 병합필드(mail-merge)가 채워지지 않은 채 발간된 것으로 보이는 원본 자체의 결함. 실제 IP 등급 숫자를 어느 소스에서도 확정할 수 없어 미확인 유지(SPS/OM 정식 스펙 표에도 IP 등급 행 자체가 없음, AL60과 동일 상황).

## preset_guide_and_matching

| Configuration | Preset(s) | Frequency_Range_10dB_Hz | Recommended_Ratio | Minimum_Line_Length |
|---|---|---|---|---|
| null | null | null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: AL60_v1.0.md와 동일.

## delay_defaults

| Preset_Combo | Primary_Element_Delay_ms | Secondary_Element_Delay_ms |
|---|---|---|
| null | null | null |

### 주석 및 출처 (Notes & Sources)

**미확인 사유**: AL60_v1.0.md와 동일.

## mechanical_safety

AL60_v1.0.md와 동일한 리깅 액세서리 체계(공용 A-Series 액세서리), 단 베이스플레이트는 db 서브우퍼 Vi-SUB/Vi-GSUB(설치용 계열) 위에도 배치 가능.

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

**출처**: OM p.5 "A-Series rigging components" — "The d&b Z5458 AL Base plate allows ground stack setups of up to three TOP cabinets... or placed on top of applicable d&b subwoofers, such as the Vi-SUB or Vi-GSUB."(AL60/90 매뉴얼은 V-SUB/V-GSUB로 표기 — 설치용 서브우퍼 계열명 Vi- 접두사 차이, 원문 그대로 보존).
**Safe_Limit/Safety_Factor/Max_Wind_Load=미확인**: AL60_v1.0.md와 동일 사유(전용 Mechanical safety 챕터 부재).

## Null Report

**미확인(정보 부족)**: Usable_Bandwidth_Hz, Frequency_Response_6dB_Hz, Frequency_Response_4dB_Hz, Frequency_Response_3dB_Hz, Max_SPL_4x_Array_Far_Field_Scaled_1m, Max_SPL_Single_Module, AES75_Max_Linear_SPL, Nominal_Directivity_Vertical, LF_Acoustical_Load, Max_Enclosures_Per_Controller_Total, Handles, Rigging_Components_Material, IP_Rating, CUT_Mode_Frequency_Response_10dB_Hz, preset_guide_and_matching(전 항목), delay_defaults(전 항목), mechanical_safety(Safe_Limit 3건), Safety_Factor, Max_Wind_Load — 20건.
**비적용**: LF_Nominal_Impedance, HF_Nominal_Impedance, RMS_Power_Handling_LF, RMS_Power_Handling_HF(단일 통합값만 존재) — 4건.

**총계**: null 24건 (미확인 20건 + 비적용 4건). 확정적 비존재(0/No)로 명시한 항목은 1건 — Cardioid_Capability(No).

## 버전 변경 이력

| Version | 변경 내용 |
|---|---|
| v1.0 | 최초 작성 — d&b audiotechnik 11번째 제품군(ALi60) 최초 투입(2026-07-19), AL60_v1.0.md를 스켈레톤으로 사용. AL60과 아키텍처는 동일하나 설치용 버전 차이가 큼: Phoenix 전용 커넥터(4핀 전체 배정 확인), Handles=미확인(원문에 서술 없음, AL60과 다를 가능성), 기본 마감이 black paint(PCP는 WR 옵션), 이 브랜드 최초 EN54(화재/음성경보) 인증 확보(Z0732.541/542/543, Kiwa Nederland B.V.). Compatible_Amplified_Controller에서 SPS(30D+D20/D80)와 OM(30D+40D) 간 상충 발견·보존. ALi60_AE_EN.txt 원문 자체에 IP 등급 병합필드 오류(`[ERROR: Missing definition...]`)가 있어 IP_Rating 미확인 유지. Null Report 24건(미확인 20건+비적용 4건). |
