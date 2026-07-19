# Kara II / Kara IIi 프리셋 구성 (Variable Curvature WST systems)

> 원본 출처: `preset_guide_EN.pdf` p.55-56 (owner's manual EN v29.0)
> 상위 references 폴더(`../../preset-guide-en.pdf`)에 전체 원본 PDF 보관.

Kara II와 Kara IIi는 동일 인클로저의 서로 다른 버전(원문 명시). SB18/SB18 IIi,
KS21/KS21i도 마찬가지.

| Loudspeaker configuration | Kara II | SB18 or KS21 | KS28 or SB28 | Acoustic properties |
|---|---|---|---|---|
| line source | [KARA II xxx] | — | — | 55 Hz - 20 kHz |
| line source + coupled subwoofers | [KARA II xxx] | [xxxx_100] | — | down to 32 Hz(SB18)/31 Hz(KS21)/25 Hz(KS28/SB28) |
| line source + separated subwoofers | [KARA II xxx] | [xxxx_60] | — | reinforced LF contour |
| line source + coupled subwoofers + KS28/SB28 | [KARA II xxx] | [xxxx_100] | [xxxx_60] | reinforced LF contour, high-pass at 100 Hz |
| single or pair of enclosures | [KARA II_FI] | — | — | flat response |
| single/pair + coupled subwoofers | [KARA II_FI] | [xxxx_100] | — | down to 32 Hz(SB18) or 31 Hz(KS21), reinforced LF contour |
| up to three enclosures | [KARA II_MO] | — | — | 55 Hz - 20 kHz, low latency |
| up to three + coupled subwoofers | [KARA II_MO] | [xxxx_60] | — | down to 32 Hz(SB18) or 29 Hz(KS21), reinforced LF contour, low latency |

카디오이드 배열 시 `[xxxx_xx_C]`/`[xxxx_xx_Cx]` 사용.

조정핀: [KARA II 70]=70º, [KARA II 90]=90º, [KARA II 110]=110º.
`[KARA II_FI]`/`[KARA II_MO]`는 110° 핀 설정에 최적화.

**주의(원문 경고)**: Kara와 Kara II는 같은 라인 소스에서 함께 쓰지 말 것 —
두 시스템 간 음향 커플링이 최적이 아님.

출력 라우팅: `[KARA II 70]`/`[KARA II 90]`/`[KARA II 110]`은 OUT1=LF/OUT2=HF
(IN A) + OUT3=LF/OUT4=HF (IN A). `[KARA II_FI]`/`[KARA II_MO]`는 OUT1=LF/
OUT2=HF (IN A) + OUT3=LF/OUT4=HF (IN B) — fill/monitor 프리셋은 뒤 2채널이
별도 입력(IN B)으로 분리됨.
