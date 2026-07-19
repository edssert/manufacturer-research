# Preset Guide (L-Acoustics)

> 원본 출처: `preset_guide_EN.pdf` — owner's manual (EN) version 29.0, distribution date May 20, 2026
> (동일 폴더에 원본 PDF 보관: `preset-guide-en.pdf`, 총 126페이지)

이 문서는 126페이지 분량의 대형 매뉴얼이라, 전체를 요약·생략 없이 옮기는
대신 목차/구조/개정이력과 다른 raw-specs 문서와 겹치지 않는 핵심 발견사항만
정리했다. 프리셋별 상세 라우팅 테이블(출력/채널/게인/딜레이 등), 특정
시스템의 프리셋 조합표, pre-alignment delay 상세값 등은 아래 목차의 페이지
번호를 참고해 원본 PDF에서 직접 확인할 것. 프로젝트에서 특정 섹션이 필요해질
때(예: TODO #9 프리셋별 주파수/컨투어 데이터 보강 작업 시) 해당 페이지를
추가로 파싱해 이 문서 하단에 보강한다.

## 목차 (Contents, p.3-4)

- Introduction — p.5
  - Revision history — p.6
- Preset design — p.8
- Onboard preset libraries — p.11
  - LA2Xi preset library — p.11
  - LA4 preset library — p.15
  - LA4X preset library — p.19
  - LA8 preset library — p.24
  - LA12X preset library — p.32
  - LA7.16i layout library — p.38
  - LA7.16 layout library — p.42
- FLAT presets — p.46
- Progressive ultra-dense line source presets — p.47
  - L2 / L2D — p.47
- Variable Curvature WST systems presets — p.49
  - K1 — p.49
  - K2 — p.51
  - K3 — p.53
  - Kara II — p.55
  - Kara — p.57
  - Kiva II — p.58
  - Kiva SB15m — p.59
  - Kiva Kilo — p.60
  - Kudo — p.62
  - V-DOSC — p.63
  - dV-DOSC — p.65
- Constant Curvature WST systems presets — p.67
  - ARCS Wide / ARCS Focus — p.67
  - A10 Wide/Focus — p.68
  - A15 Wide/Focus — p.70
  - ARCS II — p.72
  - ARCS — p.73
- Colinear systems presets — p.74
  - Syva — p.74
  - Soka — p.76
- Coaxial loudspeaker enclosures presets — p.77
  - X4i — p.77
  - 5XT — p.79
  - X6i — p.80
  - X8 — p.81
  - X8i — p.82
  - X12 — p.83
  - X15 HiQ — p.84
  - 8XT, 12XTP, MTD108a, MTD112b, MTD115bP — p.85
  - 12XTA, 115XT, 115XT HiQ, MTD115bA — p.86
- Subwoofer loudspeaker enclosures presets — p.87
- Pre-alignment delay values — p.91
  - Progressive ultra-dense line sources — p.92
  - Variable curvature WST systems — p.93
  - Constant curvature WST systems — p.107
  - Colinear systems — p.110
  - Coaxial loudspeaker enclosures — p.111
- Impedance load — p.119
- Enclosure drive capacity per amplified controller — p.120
  - Enclosure drive capacity per LA4 / LA8 — p.122
- Enclosure maximum SPL per amplified controller — p.124

## Revision history 요약 (p.6-7, 전체 원문 보존)

버전 1.0(2013.03)부터 29.0(2026.05)까지 전체 개정 이력. 이 프로젝트와 특히
관련된 항목만 발췌(전체 이력은 원본 PDF p.6-7 참고):

- **15.0 (2020.10)**: LA2Xi 추가, **K3 시스템 추가**
- **14.0 (2020.04)**: **Kara II 시스템 추가**
- **16.0 (2021.03)**: **Kara IIi 시스템 추가**
- **17.0 (2021.07)**: **K3i 시스템 추가**
- **13.0 (2019.10)**: A15i Wide/Focus 추가, **A10(i) Wide/Focus 시스템 추가**, Cardioid eXtended 프리셋 정보 추가
- **12.0 (2019.06)**: A15 Wide/Focus 시스템 추가
- **18.0 (2022.02)**: SB10i 추가, [A10_MO]/[A15_MO]/[5XT_MO]/[X4_MO] 프리셋 추가
- **20.0 (2022.11)**: SB6i 추가
- **21.0 (2023.03)**: Soka 추가
- **22.0 (2023.06)**: L2 / L2D 시스템 추가
- **23.0 (2024.02)**: X8i, X6i 추가
- **28.0 (2026.01)**: K1-SB Noise Control(NC) 구성 추가, [K1SB_100_NC] 프리셋 추가
- **29.0 (2026.05, 최신)**: **CS1 추가**

즉 이 문서(v29.0)는 우리 프로젝트의 K3i/Kara IIi 관련 각주("preset_guide_EN.pdf
drive capacity 표에 K3(i)/Kara II(i)로 병기")의 실제 근거 문서이며, K series
데이터 파일(`k-series.data.js`)에 달아둔 노트들이 정확히 이 문서를 가리키고
있었음을 확인.

## Preset design 핵심 내용 (p.8-10)

- **Gain structure**: 모든 팩토리 프리셋은 기준 핑크노이즈 신호(0 dBu 아날로그
  / -22 dBFS 디지털)로 캘리브레이션됨. 기본적으로 8 dB의 헤드룸을 제공하되,
  소형 포맷(MTD108A, X4i, 5XT, X8, 8XT, Kiva, Kilo, SB10i, SB6i, Soka)은
  4 dB 헤드룸.
- **Frequency response contour**: 시스템군별로 컨투어 프리셋 체계가 다름.
  - X Series(coaxial): 표준 프리셋 + `_MO`(모니터용)
  - 레거시 XT/MTD Series: `_FR`(FOH) / `_FI`(fill, 성악·클래식·재즈) / `_MO`(모니터)
  - A Series, Kara II(WST): 메인 프리셋(FOH) / `_FI`(fill) / `_MO`(모니터)
  - 기타 WST 시스템: 메인 프리셋 + `_FI`(일부만)
  - 최구형 WST: `_HI`/`_LO` 레거시 구조
- **LF polar pattern**: L2/L2D, CS1은 사이드에 카디오이드 LF 유닛(LC/SC) 내장
  — `[xxx]`=표준 카디오이드, `[xxx_S]`=수퍼카디오이드(측면 SPL 최소화)
- **Standard / Cardioid C / Cardioid Cx** 서브우퍼 구성 3종 — 각각 옴니,
  카디오이드(주요 대역 후방 차폐), 확장 카디오이드(광대역 후방 차폐)
- **K1-SB Noise Control(NC) 구성**: K1-SB 어레이를 K1/K2 어레이 뒤에 배치하고
  `[xxxx_100_NC]` 프리셋 사용 — 광대역 후방 차폐, 전방 SPL 손실 최소.

## 시리즈별 프리셋 구성표 (별도 파일로 분리)

각 시스템의 "loudspeaker configuration → preset(s) → acoustic properties"
구성표(-10dB 대역폭/LF 한계/컨투어 특성 포함, 요약·생략 없이 마크다운 표로
정리)는 `presets/` 하위에 시리즈별 폴더·파일로 분리되어 있다
(discontinued 제외: Kara·Kiva·Kilo·Kudo·V-DOSC·dV-DOSC·구형 XT/MTD 시리즈는
파일화하지 않음 — 필요 시 원본 PDF 해당 페이지 직접 참고):

```
presets/
  k-series/
    k1.md        (p.49-50)
    k2.md        (p.51-52)
    k3.md        (p.53-54, K3i 포함)
    kara-ii.md   (p.55-56, Kara IIi 포함)
    kiva-ii.md   (p.58)
  a-series/
    a10.md       (p.68-69, A10i 포함)
    a15.md       (p.70-71, A15i 포함)
  l-series/
    l2-l2d.md    (p.47-48, Progressive Ultra-Dense)
  s-series/
    syva.md      (p.74-75, Colinear)
    soka.md      (p.76, Colinear)
  x-series/
    x4i.md, 5xt.md, x6i.md, x8.md, x8i.md, x12.md, x15-hiq.md  (p.77-84, Coaxial)
  subwoofers/
    subwoofers.md  (p.87-90, 서브우퍼 전반 — compatibility 표 + acoustic properties)
  legacy/
    arcs-wide-focus.md  (p.67)
    arcs-ii.md          (p.72)
```

각 파일은 해당 원본 페이지 범위를 명시하고 있으며, 상위 폴더의 원본 PDF
(`../../preset-guide-en.pdf`)를 함께 참고할 수 있다.

## Impedance load / Drive capacity / Max SPL (p.119-125)

이 세 섹션(Impedance load, Enclosure drive capacity per amplified controller,
Enclosure drive capacity per LA4/LA8, Enclosure maximum SPL per amplified
controller)은 **`amplification-reference-tb-en.pdf`/`.md`(technical bulletin
v16.0)와 사실상 동일한 데이터**임을 확인했다(K series 관련 수치 전부
대조 완료, 100% 일치). 차이점은 이 Preset Guide 쪽이 discontinued 제품
(8XT, MTD 시리즈, Kudo, V-DOSC, dV-DOSC, SB28, SB218, SB118 등)과 LA4/LA8
전용 앰프의 drive capacity까지 포함해 더 범위가 넓다는 것.

- **LA4 / LA8 전용 Drive capacity 표**(p.122-123, amplification-reference-tb-en
  에는 없는 정보): Kiva/Kilo, Kudo, V-DOSC, dV-DOSC, KS28, SB28, KS21(i),
  SB18계열, SB218, SB118, SB15m, SB10i, Syva Low, Syva Sub, dV-SUB의
  LA4/LA8 기준 수치. K series는 LA4/LA8로 구동하지 않아 이 표에 없음.
- 상세 수치는 `amplification-reference-tb-en.md`를 우선 참고하고, discontinued
  제품이나 LA4/LA8 값이 필요할 때만 이 문서(원본 PDF p.119-125)를 직접 확인.

## 활용 메모

- TODO.md의 "#9 프리셋별 주파수/컨투어 데이터 보강" 작업(5XT부터 시작 예정)
  시, 5XT는 Coaxial loudspeaker enclosures presets 섹션(p.77-86) 소속 —
  해당 페이지의 loudspeaker configuration/preset/acoustic properties 표를
  참고해 `splByPreset`에 필드를 추가하면 된다.
- K series 데이터 파일의 기존 주석("preset_guide_EN.pdf(v29.0) drive capacity
  표에 K3(i)로 병기" 등)은 이 문서 p.120-125 기준으로 정확히 확인됨 — 이번에
  원본을 확보했으므로 향후 같은 근거를 인용할 때 이 파일과 원본 PDF를 함께
  참고 가능.
