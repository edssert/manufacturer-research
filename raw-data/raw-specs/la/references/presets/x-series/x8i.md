# X8i 프리셋 구성 (Coaxial loudspeaker enclosures)

> 원본 출처: `preset_guide_EN.pdf` p.82 (owner's manual EN v29.0)
> 상위 references 폴더(`../../preset-guide-en.pdf`)에 전체 원본 PDF 보관.

X8i는 패시브 코액시얼 인클로저(원문 명시). KS21/KS21i는 동일 인클로저의
서로 다른 버전.

| Loudspeaker configuration | X8i preset | SB10i/KS21/Syva Sub | Acoustic properties |
|---|---|---|---|
| single enclosure [X8i] | [X8i] | — | 67 Hz - 20 kHz |
| single enclosure [X8i_40] | [X8i_40] | — | 43 Hz - 20 kHz |
| single enclosure (low latency) | [X8i_MO] | — | 59 Hz - 20 kHz, low latency |
| + coupled subwoofers | [X8i]/[X8i_40]/[X8i_MO] | [xxx_100] | down to 27 Hz(SB10i/Syva Sub)/31 Hz(KS21), reinforced LF contour |
| + separated subwoofers | [X8i]/[X8i_40] | [xxx_60] | down to 25 Hz(SB10i/KS21)/26 Hz(Syva Sub), reinforced LF contour |

카디오이드 배열 시 `[xxxx_xxx_C]`/`[xxxx_xxx_Cx]` 사용.
`[xx_MO]` 저지연 관련 안내는 a-series/x4i 문서와 동일.

출력 라우팅: `[X8i]`/`[X8i_40]`/`[X8i_MO]` 모두 OUT1/2=PA(IN A) + OUT3/4=PA(IN B).
