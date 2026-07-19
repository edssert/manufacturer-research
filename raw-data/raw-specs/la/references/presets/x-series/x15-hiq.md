# X15 HiQ 프리셋 구성 (Coaxial loudspeaker enclosures)

> 원본 출처: `preset_guide_EN.pdf` p.84 (owner's manual EN v29.0)
> 상위 references 폴더(`../../preset-guide-en.pdf`)에 전체 원본 PDF 보관.

X15 HiQ는 액티브 코액시얼 인클로저(원문 명시, 다른 X-series는 대부분 패시브).

| Loudspeaker configuration | X15 HiQ preset | SB18/KS21 | Acoustic properties |
|---|---|---|---|
| single enclosure | [X15] | — | 55 Hz - 20 kHz |
| single enclosure (low latency) | [X15_MO] | — | 52 Hz - 20 kHz, low latency |
| + subwoofer | [X15]/[X15_MO] | [xxxx_100] | down to 32 Hz, reinforced LF contour |

카디오이드 배열 시 `[xxxx_100_C]`/`[xxxx_100_Cx]` 사용.
`[xx_MO]` 저지연 관련 안내는 a-series/x4i 문서와 동일.

출력 라우팅(액티브 인클로저라 LF/HF 2웨이 라우팅): `[X15]`/`[X15_MO]` 모두
OUT1=LF/OUT2=HF(IN A) + OUT3=LF/OUT4=HF(IN B).
