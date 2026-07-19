# Syva 프리셋 구성 (Colinear systems)

> 원본 출처: `preset_guide_EN.pdf` p.74-75 (owner's manual EN v29.0)
> 상위 references 폴더(`../../preset-guide-en.pdf`)에 전체 원본 PDF 보관.

| Loudspeaker configuration | Syva | Syva Low | Syva Sub | Acoustic properties |
|---|---|---|---|---|
| colinear source | [SYVA] | — | — | 87 Hz - 20 kHz |
| + closely coupled Syva Low | [SYVA LOW SYVA] | — | — | down to 42 Hz, reinforced LF contour |
| + coupled Syva Low | [SYVA] | [SYVA LOW_100] | — | down to 40 Hz, reinforced LF contour |
| + closely coupled Syva Sub | [SYVA SUB SYVA] | — | [SYVA SUB SYVA] | down to 28 Hz |
| + coupled Syva Sub | [SYVA] | — | [SYVA SUB_100] | down to 27 Hz |
| + closely coupled Syva Low + Syva Sub | [SYVA LOW SYVA] | — | [SYVA SUB_100] | down to 27 Hz, reinforced LF contour |
| + separated Syva Low + Syva Sub | [SYVA] | [SYVA LOW_100] | [SYVA SUB_100] | down to 27 Hz, reinforced LF contour |

주(원문): `[SYVA]`+`[SYVA SUB_100]` 조합 시 Syva 게인을 5dB 낮춰야 평탄 응답.
하이브리드 프리셋(`[SYVA LOW SYVA]`, `[SYVA SUB SYVA]`)은 Syva가 Syva Low/
Syva Sub 위에 AutoConnect로 결합된 경우에만 사용 — 더 떨어뜨려 배치할 경우
LA Network Manager에서 `[SYVA]`+`[SYVA LOW_100]`/`[SYVA SUB_100]` 조합의
커스텀 프리셋을 만들 것. `[SYVA SUB_200]`은 Syva와 병용 금지 — X4i `[X4]`
프리셋 전용 최적화(X4i.md 참고).

출력 라우팅: `[SYVA]`는 OUT1-4 전부 PA(IN A). `[SYVA LOW SYVA]`는
OUT1=Syva Low(LF, IN A) + OUT2=Syva(PA, IN A) + OUT3=Syva Low(LF, IN B) +
OUT4=Syva(PA, IN B). `[SYVA SUB SYVA]`도 동일 구조(Syva Sub가 LF 역할).
