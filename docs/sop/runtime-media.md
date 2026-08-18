# SOP: 런타임 미디어 파이프라인

제조사 원본 이미지를 런타임 대표 이미지로 만들 때까지의 표준 절차다. 근거가 되는
결정은 [ADR-0002](../adr/0002-source-and-runtime-layers.md)와
[ADR-0004](../adr/0004-runtime-image-content-policy.md)에 있다. 원본 확보 자체는
[원문 수집 SOP](source-intake.md)를 먼저 따른다.

## 0. 전제

- 원본은 `raw-data/raw-assets/` 또는 `raw-data/official-docs/`에 보존되어 있고
  source manifest에 등록되어 있어야 한다. 등록되지 않은 이미지는 파이프라인이
  파생 대상으로 인정하지 않는다.
- 런타임 이미지 경로는 `public/assets/img/{도메인}/{제조사}/{시리즈 슬러그}/`
  규칙을 따른다. 파일명·슬러그 규칙은
  [`public/assets/img/README.md`](../../public/assets/img/README.md)에 있다.
- 정책 값(허용 확장자, 누락·고아 허용량, 중복 baseline, 정규화 정책)의 단일 원본은
  [`config/asset-policy.json`](../../config/asset-policy.json)이다.

## 1. 대표 이미지 선택

[ADR-0004](../adr/0004-runtime-image-content-policy.md)의 선택 순서를 위에서부터
적용한다.

1. **깨끗한 공식 제품 뷰** — 금지 콘텐츠가 없으면 그대로 쓴다.
2. **공식 변형 모델 별칭** — 같은 제조사가 공식 제공하는 변형 모델의 깨끗한
   이미지로 대체한다.
3. **근거를 남긴 로컬 마스크** — 위 둘이 불가능할 때만 사용한다.

대표 이미지는 제품 본체를 보여야 한다. 액세서리 레일·브래킷·포장·수상 배지·홍보
마크·텍스트 오버레이·무관한 시리즈 이미지는 대표 이미지가 아니다. 픽셀 크기만 보고
통과시키지 않는다. 판정 기준은 [육안 검수 SOP](visual-review.md)를 따른다.

2단계와 3단계는 예외이므로
[`config/runtime-media-overrides.json`](../../config/runtime-media-overrides.json)에
반드시 기록한다.

- `officialSubstitutions` — 제품 ID, 은퇴 런타임 경로, 거부한 원본 경로와 해시,
  채택 경로와 해시, 사유, 근거 문서 경로
- `maskedDerivatives` — 원본 경로·해시, 출력 경로·해시, 치수, 편집 경계,
  변경 픽셀 수, `productPixelsChanged: false`, `generativeEditing: false`

대체가 끝나면 은퇴한 런타임 파일을 삭제하고 제품 레코드의 `views`에서도 제거한다.
검사가 잔존 여부를 확인한다.

## 2. 공개 원본 동기화

공식 raw 원본을 공개 이미지 표면에 동기화하는 작업은
[`scripts/runtime-media-pipeline.mjs`](../../scripts/runtime-media-pipeline.mjs)의
3단계로만 수행한다. 실제 `img src`는 원본 확장자·메타데이터·바이트를 유지해야 하며,
사람이 이미지 편집기로 만든 결과를 근거 없이 직접 넣지 않는다.

### 2.1 dry-run

```powershell
npm run media:runtime:dry
```

계획은 `tmp/runtime-media-plan.json`에 만들어진다(`tmp/`는 Git 제외 경로다). 이
단계는 파일을 바꾸지 않고 다음을 계산한다.

- 스피커 데이터 파일이 참조하는 런타임 이미지 수집
- 각 이미지의 SHA-256·바이트·해상도·알파·포맷·색공간 확인
- source manifest 해시로 대응 원본 존재 여부(`verifiedRawCopy`) 판정
- 공개 사본이 필요한 이미지에 `restore-original`, 이미 동일한 항목에 `preserve-original` 표시

원본 표면 정책과 대상 브랜드는 계획 파일과
[`config/runtime-media-manifest.json`](../../config/runtime-media-manifest.json)의
`policy`, `targetBrands`, `excludedBrands`가 원본이다. 문서에 복제하지 않는다.

계획을 검토한다. `action`, `reason`, 출력 경로, 예상 치수가 의도와 같은지 확인하고,
`raw-byte-match-unavailable`로 남은 항목이 있으면 원본 등록부터 다시 한다.

### 2.2 apply

```powershell
npm run media:runtime:apply
```

`apply`는 승인한 계획을 그대로 다시 계산해 완전히 같을 때만 진행한다. 그 사이 참조나
이미지가 하나라도 바뀌었으면 중단되므로 dry-run부터 다시 실행한다.

적용 중 다음 불변식이 강제된다. 하나라도 어긋나면 실패한다.

- 원본이 검증된 raw 사본이어야 한다
- 출력 SHA-256과 바이트 크기가 raw 원본과 정확히 같아야 한다
- 출력 포맷·치수·메타데이터를 바꾸지 않아야 한다
- 제품 데이터의 `img`·`views[].src`가 최적화 파생본을 가리키지 않아야 한다
- 이전 런타임 파일을 지우기 전에 해시가 계획과 같아야 한다

성공하면 데이터 파일의 이미지 경로가 공식 원본 사본으로 갱신되고, 결과가
`config/runtime-media-manifest.json`에 `mode: "applied"`로 기록된다.

### 2.3 verify

```powershell
npm run media:runtime:verify
```

적용된 manifest와 실제 파일 상태가 같은지 확인한다. 이미지를 손으로 바꾸면 여기서
드러난다.

## 3. 공식 출처 자산 등록

원본 URL이 확인된 런타임 이미지는
[`config/media-sources.json`](../../config/media-sources.json)에 등록한다. 감사는
다음을 확인한다.

- `runtimePath`가 `public/assets/img/` 안이고 실제로 존재하며 바이트·해시가 일치
- `sourcePage`, `sourceAsset`, `officialVisualArchive`가 HTTPS이고 승인된 공식 호스트
- `originalPath`가 있으면 `raw-data/raw-assets/` 안이고 바이트·해시가 일치
- PNG는 시그니처와 헤더 해상도가 manifest와 일치

승인된 공식 호스트 목록의 단일 원본은
[`scripts/audit-media-sources.mjs`](../../scripts/audit-media-sources.mjs)다.

## 4. 여백 정규화(선택)

투명 제품 렌더의 여백 비율을 맞출 때만 사용한다. 기본은 분석 전용이다.

```powershell
python scripts/normalize_images.py dry --manifest image-normalize-plan.json
```

`apply`는 검토한 동일 manifest를 `--approved-manifest`로 넘긴 경우에만 실행된다.
알파가 없거나 전체 프레임이 불투명한 이미지, 명시적 제외 목록의 이미지는 자동 적용
대상이 아니라 수동 검수 대상이다. 세부 사용법과 제외 목록은
[`public/assets/img/README.md`](../../public/assets/img/README.md)에 있다.

## 5. 검증

```powershell
npm run media:runtime:verify
npm run test:audit:assets
npm run test:unit
```

- `test:audit:assets`: 참조 누락·고아 자산(허용량 0), 공식 출처 자산 해시,
  source manifest 전수 대조, 런타임 미디어 manifest 계약
- `test:unit`: 대표 이미지 예외의 픽셀 단위 검사와 흰 제품 스테이지 계약

완전 중복 그룹은 내용이 같을 뿐 의미가 같다는 보장이 없으므로 자동 삭제하지 않는다.
baseline이 달라졌다면 원인을 확인한 뒤 `config/asset-policy.json`을 근거와 함께
갱신한다. Git 이력 재작성은 별도 승인 범위다.

커밋 전에는 `npm run verify`를 실행한다.

## 체크리스트

- [ ] 원본이 보존되어 있고 source manifest에 등록되어 있다
- [ ] 대표 이미지에 금지 콘텐츠가 없다(또는 예외를 override에 기록했다)
- [ ] dry-run에서 원본 경로·공개 파일명·충돌 여부를 검토한 뒤 apply를 실행했다
- [ ] `npm run media:runtime:verify`가 통과했다
- [ ] 공식 URL이 있는 자산을 `config/media-sources.json`에 등록했다
- [ ] 은퇴한 런타임 이미지와 `views` 항목을 제거했다
- [ ] [육안 검수 SOP](visual-review.md)를 실제 화면에서 수행했다
- [ ] `npm run verify`가 통과했다
