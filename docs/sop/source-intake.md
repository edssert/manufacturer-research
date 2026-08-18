# SOP: 공식 원문 수집과 데이터 반영

제조사 공식 자료를 확보해 런타임 카탈로그 레코드로 만들 때까지의 표준 절차다.
근거가 되는 결정은 [ADR-0002](../adr/0002-source-and-runtime-layers.md),
[ADR-0003](../adr/0003-baseline-json-source-of-truth.md),
[ADR-0005](../adr/0005-official-series-order.md)에 있다. 이미지 처리는
[런타임 미디어 SOP](runtime-media.md)를 따른다.

## 0. 전제

- 저장소 규칙의 단일 원본은 [`AGENTS.md`](../../AGENTS.md)다.
- Node·npm 요구 버전은 [`package.json`](../../package.json)의 `engines`와
  [`.node-version`](../../.node-version)이 정한다.
- 원본 아카이브는 Git LFS로 추적된다([`.gitattributes`](../../.gitattributes)).
  작업 전에 LFS가 초기화되어 있는지 확인한다.

## 1. 범위 판정

런타임 카탈로그에는 현행 프로용 스피커만 넣는다. 액세서리·소프트웨어·앰프·소비자
제품·시리즈 소개 페이지만 있는 항목·레거시 전용 제품은 제외한다.

1. 제조사 현행 공식 제품 페이지와 공식 카탈로그에서 제품 목록을 확인한다.
2. 포함·제외 판정과 미해결 페이지를
   [`raw-data/catalog-inventory/<제조사>.json`](../../raw-data/catalog-inventory/)에
   기록한다. 형식은 같은 디렉터리의 `README.md`를 따른다.
3. 공식 시리즈 순서를 [`raw-data/series-order/<제조사>.json`](../../raw-data/series-order/)에
   기록한다. 필수 필드와 편집적 폴백 규칙은 [ADR-0005](../adr/0005-official-series-order.md)에 있다.

공식 디스트리뷰터 자료는 지역 정보의 보조 근거로만 쓴다. 제조사 근거를 말없이
덮어쓰지 않는다.

## 2. 원문 확보

### 2.1 자동 수집(등록된 호스트)

허용 호스트의 공식 문서는 스크립트로 받고 해시를 고정한다.

1. [`config/speaker-source-registry.json`](../../config/speaker-source-registry.json)에
   항목을 추가한다. `id`는 중복될 수 없고, `url`은 HTTPS이며 `retrievalPolicy.allowedHosts`에
   있는 호스트여야 한다. `localPath`는 `retrievalPolicy.archiveRoot` 안이어야 하고
   다른 항목과 겹칠 수 없다. `series`는 런타임에 실제로 존재하는 `제조사:시리즈`
   조합이어야 한다.
2. 내려받아 lock을 갱신한다. 이 명령은 네트워크에 접근한다.

   ```powershell
   npm run sources:speakers:fetch
   ```

3. 검증만 다시 실행한다. 아카이브 파일의 바이트·해시가
   [`config/speaker-source-lock.json`](../../config/speaker-source-lock.json)과
   같아야 한다.

   ```powershell
   npm run sources:speakers
   ```

리다이렉트가 허용 호스트를 벗어나거나 HTTP 상태가 실패면 수집이 중단된다. 새 호스트가
필요하면 `allowedHosts`를 근거와 함께 추가한다.

### 2.2 수동 확보

스크립트로 받을 수 없는 자료(로그인 필요, 호스트 미등록 등)는 직접 내려받아
`raw-data/official-docs/<제조사>/…`에 원본 그대로 저장한다. 파일을 열어 편집하거나
재저장하지 않는다.

### 2.3 provenance 기록

수집 방식과 무관하게 모든 원본은
[`raw-data/source-manifests/<제조사>.json`](../../raw-data/source-manifests/)에 기록한다.
필드 형식은 같은 디렉터리의 `README.md`에 있다.

- `path`는 저장소 상대 경로이고 `/`를 쓰며, `files[]`는 `path` 오름차순 정렬이다.
- `role`은 감사 스크립트가 정의한 어휘만 사용한다. 허용 목록의 단일 원본은
  [`scripts/audit-source-manifests.mjs`](../../scripts/audit-source-manifests.mjs)다.
- `productIds`는 등록된 스피커 ID여야 한다. 제조사 범위 문서(현행 카탈로그 스냅숏,
  다운로드 인덱스, 수명주기 제외 기록 등)만 빈 배열을 허용한다.
- `sourcePage`와 `sourceAsset`은 HTTPS URL, `retrievedAt`은 `YYYY-MM-DD`,
  `sha256`은 소문자 64자, `bytes`는 실제 파일 크기다.
- `canonical-spec` 역할은 `raw-data/raw-specs/` 아래여야 하고, 나머지는
  `raw-data/official-docs/` 또는 `raw-data/raw-assets/` 아래여야 한다.

## 3. canonical 근거 노트 작성

완료 상태로 등록할 제품마다
`raw-data/raw-specs/<제조사>/speakers/<시리즈>/<모델>.{md,json}`에 카드 대면 근거를
하나 남긴다. 원본 PDF/DOCX가 있으면 같은 제품 폴더에 함께 둔다.

- 출처 감사는 경로와 파일명만 확인한다. PDF/DOCX 본문을 자동 해석하지 않으므로
  노트 내용의 정확성은 사람이 책임진다.
- 독립 공식 사양이 없어 완료할 수 없는 제품은
  [`raw-data/research-gaps/`](../../raw-data/research-gaps/)에 검토 결과를 남긴다. 이
  기록은 canonical coverage로 계산되지 않으며 `pending`을 해제하지 못한다.

## 4. 런타임 레코드 반영

1. `public/js/domains/speakers/data/<제조사>.data.js`(또는 `data/<제조사>/<시리즈>.data.js`)에
   안정적인 `spk-` prefix ID로 레코드를 추가한다.
2. 확인이 끝나지 않은 레코드는 `pending: true`를 명시한다. 필드가 없으면 완료로
   간주되고 완료 레코드는 canonical 근거를 요구한다.
3. 누락 스펙을 유사 제품 값으로 추정하지 않는다. 해당 필드는 `null`/미기입으로 두고
   무엇이 없는지 3절의 기록에 남긴다.
4. 관계 ID는 등록된 엔터티만 가리킨다. 한쪽을 원본으로 삼는 관계는 역방향 값을
   중복 저장하지 않는다.
5. 시리즈 이름은 제조사 표기를 그대로 쓰고, 표시 순서는 1절에서 기록한 근거를 따른다.

## 5. 검증

작업 중에는 가장 작은 관련 검사부터 실행한다.

```powershell
npm run sources:speakers
npm run test:data
npm run test:audit:assets
```

조사 인벤토리를 다시 계산하려면 다음을 실행한다. 이 명령은
[`config/speaker-research.json`](../../config/speaker-research.json)을 덮어쓴다.

```powershell
npm run inventory:speakers
```

커밋 전에는 전체 파이프라인을 실행한다.

```powershell
npm run verify
```

각 게이트가 무엇을 지키는지는 [품질 게이트](../quality-gates.md)에 있다.

## 6. 커밋

- 의도한 파일만 스테이징한다. 원본 아카이브가 LFS 포인터로 staged 되었는지 확인한다.
- 임시 수집기와 추출 중간 파일은 저장소에 남기지 않는다.
- 원본 아카이브나 검토된 중복 파일은 명시적 승인 없이 삭제하지 않는다.
- 여러 에이전트가 나눠 작업했다면 공용 레지스트리·정책·거버넌스 수치는 마지막에
  통합한다.

## 체크리스트

- [ ] 현행 제품 범위와 제외 사유를 `raw-data/catalog-inventory/`에 기록했다
- [ ] 공식 시리즈 순서 근거를 `raw-data/series-order/`에 기록했다
- [ ] 원본을 수정 없이 `raw-data/official-docs/` 또는 `raw-data/raw-assets/`에 보존했다
- [ ] `raw-data/source-manifests/<제조사>.json`에 URL·수집일·SHA-256·바이트·MIME·연결 제품을 적었다
- [ ] 자동 수집 항목은 registry와 lock이 일치한다
- [ ] 완료 레코드마다 `raw-data/raw-specs/`에 canonical 근거가 있다
- [ ] 미완료 레코드에 `pending: true`가 있고 추정값이 없다
- [ ] `npm run verify`가 통과했다
