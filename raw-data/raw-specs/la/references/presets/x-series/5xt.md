# 5XT 프리셋 구성 (Coaxial loudspeaker enclosures)

> 원본 출처: `preset_guide_EN.pdf` p.79 (owner's manual EN v29.0)
> 상위 references 폴더(`../../preset-guide-en.pdf`)에 전체 원본 PDF 보관.

5XT는 패시브 코액시얼 인클로저(원문 명시).

| Loudspeaker configuration | 5XT preset | SB15m/SB10i | Acoustic properties |
|---|---|---|---|
| single enclosure | [5XT] | — | 95 Hz - 20 kHz |
| single enclosure (low latency) | [5XT_MO] | — | 95 Hz - 20 kHz, low latency |
| + subwoofer | [5XT] / [5XT_MO] | [xxxx_100] | down to 40 Hz(SB15m)/27 Hz(SB10i), reinforced LF contour |

카디오이드 배열 시 `[SB15_100_C]`/`[SB15_100_Cx]` 사용.

`[xx_MO]` 저지연 관련 안내는 a-series/x4i 문서와 동일.

출력 라우팅: `[5XT]`/`[5XT_MO]` 모두 OUT1/2=PA(IN A) + OUT3/4=PA(IN B).
