# X4i 프리셋 구성 (Coaxial loudspeaker enclosures)

> 원본 출처: `preset_guide_EN.pdf` p.77-78 (owner's manual EN v29.0)
> 상위 references 폴더(`../../preset-guide-en.pdf`)에 전체 원본 PDF 보관.

X4i는 패시브 코액시얼 인클로저(원문 명시).

| Loudspeaker configuration | X4i preset | SB6i/SB10i | Syva Sub | Acoustic properties |
|---|---|---|---|---|
| single enclosure | [X4] | — | — | 120 Hz - 20 kHz |
| single enclosure (low latency) | [X4_MO] | — | — | 120 Hz - 20 kHz, low latency |
| + closely coupled subwoofer | [X4] / [X4_MO] | [SBxx_200] | [SYVA SUB_200] | down to 32 Hz(SB6i)/29 Hz(SB10i, Syva Sub), reinforced LF contour |
| + coupled subwoofer | [X4] / [X4_MO] | [SBxx_100] | — | down to 29 Hz(SB6i)/27 Hz(SB10i), reinforced LF contour |
| + separated subwoofer | [X4_60] | [SBxx_60] | — | down to 29 Hz(SB6i)/25 Hz(SB10i), reinforced LF contour |

`[xx_MO]` 프리셋 저지연 관련 안내는 a-series 문서와 동일한 규칙 적용
(레거시 XT/MTD 제외 저지연 모드, LA4/LA8 2.66ms·LA2Xi/LA4X/LA12X 3.00ms 보정).

출력 라우팅: `[X4]`/`[X4_60]`/`[X4_MO]` 모두 OUT1/2=PA(IN A) + OUT3/4=PA(IN B).
