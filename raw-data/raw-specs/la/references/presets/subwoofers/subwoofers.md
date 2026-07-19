# Subwoofer 프리셋 구성 전반 (Subwoofer loudspeaker enclosures presets)

> 원본 출처: `preset_guide_EN.pdf` p.87-90 (owner's manual EN v29.0)
> 상위 references 폴더(`../../preset-guide-en.pdf`)에 전체 원본 PDF 보관.

## 헤드룸 관련 원문 안내 (p.87)

- LA1.16i SE/BTL, LA2Xi SE 모드에서는 인클로저 타입별로 특정 규칙이 적용되어
  파워 게이지가 실제 가용 파워를 반영함 — Soundvision/LA Network Manager의
  파워 게이지 표시 참고.
- **SB15m 헤드룸**: `[SB15_100]`/`[SB15_100_C]`는 프리셋 라이브러리 v5.6(.5)부터
  8dB 헤드룸. `[SB15_100_Cx]`는 8dB 헤드룸. 이전 버전 프리셋과 `[KIVA_SB15]`는 4dB.
- **K1-SB, KS28, SB28, SB18, SB218, SB118 헤드룸**: 프리셋 라이브러리 6.0에서
  8dB 헤드룸 제공을 위해 일부 서브우퍼 프리셋의 출력 게인이 조정됨. 6.0 이전
  버전에서 만든 세션 파일 업데이트 시 게인 보정 필요:
  - `[SB28_60]`, `[SB218_60]`: +4 dB
  - `[KS28_60]`, `[SB_28_100]`, `[SB18_60]`, `[SB18_100]`, `[SB218_100]`,
    `[SB118_60]`, `[SB118_100]`: +3 dB
  - `[KS28_100]`: +2 dB
  - `[K1SB_60]`: +1 dB

## Optimal subwoofer compatibilities (p.87-88, 현역 서브우퍼 발췌)

| Subwoofer | Preset(s) | Optimal compatibility |
|---|---|---|
| CS1 | [CS1_60] / [CS1_60_S] | K1, K2, K3(i), L2, L2D |
| KS28 | [KS28_60] / [KS28_60_C] / [KS28_60_Cx] | K1, K2, K3(i), Kara II(i), ARCS II (및 discontinued 시스템) |
| KS28 | [KS28 L2] / [KS28 L2_C] / [KS28 L2_Cx] | L2, L2D |
| KS21(i) | [KS21_60] / [KS21_60_C] / [KS21_60_Cx] | A15(i) Wide/Focus, Kara II(i), K3(i), X8i |
| KS21(i) | [KS21_100] / [KS21_100_C] / [KS21_100_Cx] | A10(i) Wide/Focus, X15 HiQ, X12, Kara II(i), X8i |
| SB18(i/m) / SB18 IIi | [SB18_60] / [SB18_60_C] / [SB18_60_Cx] | Kara II(i) (및 discontinued 시스템) |
| SB18(i/m) / SB18 IIi | [SB18_100] / [SB18_100_C] / [SB18_100_Cx] | Kara II(i), X series, Kiva II |
| SB15m | [SB15_100] / [SB15_100_C] / [SB15_100_Cx] | X12, X8 (및 discontinued Kiva/Kiva II 병기 표현) |
| SB10i | [SB10_60] | X8i, X6i |
| SB10i | [SB10_100] | X4i(결합), 5XT, X8i, X6i |
| SB10i | [SB10_200] | X6i(밀결합) |
| SB6i | [SB6_60] | X4i, X6i |
| SB6i | [SB6_100] | X4i(결합), X6i(결합) |
| SB6i | [SB6_200] | X6i(밀결합) |
| Syva Low | [SYVA LOW SYVA] | Syva(결합), Syva+Syva Sub(결합) |
| Syva Low | [SYVA LOW_100] | Syva, Syva+Syva Sub |
| Syva Sub | [SYVA SUB_60] | Soka, X8i, X6i |
| Syva Sub | [SYVA SUB_100] | Syva/Syva Low, Syva/Syva Low(결합), X8i |
| Syva Sub | [SYVA SUB_200] | X4i |

(discontinued 서브우퍼 SB28/SB218/SB118의 optimal compatibility는 원본 PDF
p.88 참고 — 대부분 V-DOSC/Kudo/dV-DOSC/dV-SUB/ARCS 등 단종 시스템용.)

## Acoustic properties of subwoofers (p.89, 대역별 LF 한계)

| Configuration | Preset(s) | LF 한계 (down to) |
|---|---|---|
| standard | [xxxx_60]/[xxxx_100]/[xxxx_200] | 25 Hz(KS28/SB28/SB218/SB10i), 26 Hz(Syva Sub), 27 Hz(Syva Low), 29 Hz(KS21, SB6i), 32 Hz(SB18/SB118), 40 Hz(SB15m, Syva Low) |
| cardioid C | [xxxx_60_C]/[xxxx_100_C] | 25 Hz(KS28/SB28), 29 Hz(KS21), 32 Hz(SB18/SB118), 40 Hz(SB15m) — cardioid directivity |
| cardioid Cx | [xxxx_60_Cx]/[xxxx_100_Cx] | 25 Hz(KS28/SB28), 29 Hz(KS21), 32 Hz(SB18), 40 Hz(SB15m) — extended cardioid directivity |
| cardioid (CS1) | [CS1_xx] | 25 Hz(CS1) — cardioid directivity |
| supercardioid (CS1) | [CS1_xx_S] | 25 Hz(CS1) — supercardioid pattern |

참고(원문 각주): SB28/SB218은 LA8·LA12X 전용 구동. KS28은 LA2Xi·LA12X 전용
구동. CS1은 LA7.16·LA12X 전용 구동. 각 서브우퍼 배포 패턴은 해당 서브우퍼
매뉴얼 참고.

## 출력 라우팅 (p.90)

- `[xxxx_60]`/`[xxxx_100]`/`[xxxx_200]`: OUT1-4 전부 SB, IN A, 0dB, 0ms, + 극성.
- `[xxxx_60_C]`/`[xxxx_100_C]`/`[xxxx_60_Cx]`/`[xxxx_100_Cx]`: OUT1=SR,
  OUT2/3/4=SB, 전부 IN A(카디오이드 배열 — SR: 정방향 유닛, SB: 서브우퍼 유닛).
- `[CS1_xx]`/`[CS1_xx_S]`: OUT1=SC, OUT2/3=SB, OUT4=SC, 전부 IN A
  (SC: 카디오이드 서브우퍼 — CS1은 양 측면에 SC 유닛 2개 내장, 표준 배열 시
  광대역 카디오이드 패턴으로 후방 저역 SPL 최소화).
