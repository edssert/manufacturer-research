# Product source archive

제품 데이터는 원본, 정규화 문서, 런타임 자산을 분리한다.

```text
raw-data/
  official-docs/<mk>/<domain>/<series>/  제조사가 배포한 PDF·HTML 원본
  raw-assets/<mk>/<domain>/              제조사가 배포한 PNG·JPG·WebP 원본
  raw-specs/<mk>/<domain>/<series>/      제품별 정규화 Markdown
public/assets/                           앱에서 사용하는 검증된 파생 자산
```

## 불변 규칙

- `official-docs`와 `raw-assets`의 파일은 편집하지 않는다. URL, 회수 시각,
  크기, SHA-256은 소스 lock 파일에 기록한다.
- 제품별 정규화 문서는 원본 수치를 생략하지 않으며 출처 URL과 로컬 원본
  경로를 함께 기록한다.
- 카드 데이터는 정규화 문서를 거쳐 반영한다. 웹페이지를 보며 런타임 데이터에
  바로 옮기지 않는다.
- 제조사별 용어와 측정 조건을 보존한다. 서로 다른 `-3 dB`, `-5 dB`,
  `-10 dB`, `±4 dB` 범위를 같은 의미로 합치지 않는다.
- `public/assets`는 표시용 파생본이다. 배경 제거, 크롭, 색상 변환을 해도 원본
  파일과 해시를 유지한다.
- 공식 문서와 원본 자산은 배포 산출물 `dist`에 포함하지 않는다.

## 상태

`config/speaker-research.json`은 제품별 누락 필드와 문서·미디어 상태를 관리한다.
`config/speaker-source-registry.json`은 수집할 공식 출처를 선언하고,
`config/speaker-source-lock.json`은 실제로 받은 파일을 고정한다.

```powershell
npm.cmd run inventory:speakers
npm.cmd run sources:speakers
npm.cmd run sources:speakers:fetch
```
