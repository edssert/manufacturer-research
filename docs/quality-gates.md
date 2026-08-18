# 품질 게이트

`npm run verify`가 통과해야 커밋과 배포가 가능하다. 이 문서는 각 게이트가 무엇을
지키는지 설명한다. 명령의 정확한 정의는 언제나
[`package.json`](../package.json)의 `scripts`가 단일 원본이다. 이 문서는 명령의
목록이 아니라 의미를 설명하며, 명령이 추가·변경되면 `package.json`을 먼저 본다.

## 전체 구조

```text
npm run verify
├── npm run lint            ESLint (경고도 실패)
├── npm run format:check    Prettier 형식 검사
├── npm run typecheck       TypeScript checkJs
├── npm test
│   ├── test:unit           런타임 순수 모듈과 데이터 투영 계약
│   ├── test:data           데이터·출처 거버넌스와 원본 lock
│   ├── test:amp            앰프 관계 무결성과 configuration 렌더링
│   ├── test:audit          클래스·주석·CSS layout·자산 감사
│   ├── test:security       CSP 정책과 preview 서버 경계
│   └── test:ui             smoke·회귀·접근성·관계 이동
├── npm run test:build      import 그래프 거부 사례와 반복 빌드 결정성
└── npm run verify:dist     최종 dist 경계·해시·그래프 검증
```

## 정적 게이트

| 게이트                 | 지키는 계약                                                                              |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| `npm run lint`         | ESLint 규칙. `--max-warnings=0`이므로 경고도 실패로 처리한다.                             |
| `npm run format:check` | 프로젝트 설정과 지정된 핵심 소스의 Prettier 형식. 대상 목록은 `package.json`에 있다.      |
| `npm run typecheck`    | JSDoc 기반 `checkJs` 타입 계약. 런타임 코드에 TypeScript 문법을 도입하지 않는다.          |

## 단위 게이트 (`npm run test:unit`)

| 검사                              | 지키는 계약                                                                 |
| --------------------------------- | --------------------------------------------------------------------------- |
| route codec                       | 해시 파싱·직렬화·인코딩과 유효하지 않은 라우트 판정                          |
| manufacturers                     | 제조사 ID·표시 메타데이터의 단일 원본                                        |
| entity registry                   | ID 중복 금지, 동결 스냅숏, 상수 시간 조회, revision                          |
| data contracts                    | 도메인 레코드의 최소 구조                                                    |
| speaker catalog purity            | 런타임 카탈로그가 원본 배열을 오염시키지 않음                                |
| speaker card model / driver values | 카드 표시 모델 투영과 드라이버 값 계약                                      |
| JBL catalog groups / hierarchy audit | 카탈로그 그룹 구성과 현행/레거시 수명주기 판정 ([ADR-0005](adr/0005-official-series-order.md)) |
| Martin series order               | 런타임 표시 순서와 공식 근거 JSON 일치 ([ADR-0005](adr/0005-official-series-order.md)) |
| speaker product order             | 시리즈 내 제품의 안정적 표시 위치                                            |
| product media surface             | 모든 Speaker 카드·상세의 흰 제품 스테이지 ([ADR-0004](adr/0004-runtime-image-content-policy.md)) |
| runtime media cleanliness         | 대표 이미지 예외의 픽셀 단위 provenance ([ADR-0004](adr/0004-runtime-image-content-policy.md)) |
| color system                      | 단일 라이트 팔레트와 핵심 대비                                               |

## 데이터 게이트 (`npm run test:data`)

| 검사                        | 지키는 계약                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------- |
| `data-audit.mjs`            | 전역 ID·prefix·제조사, 도메인별 최소 구조, 관계 대상, 자산 참조                              |
| `provenance-audit.mjs`      | `raw-data/raw-specs/`의 경로·파일명과 거버넌스 설정 대조. 문서 본문은 해석하지 않는다.       |
| `audit-speaker-research.mjs` | 런타임 데이터에서 조사 인벤토리 재계산                                                       |
| `fetch-speaker-sources.mjs` | 원문 registry와 lock의 개수·URL·경로·해시 일치                                               |

기대 개수, 허용된 결손, 비대칭 관계 같은 baseline은 문서가 아니라
[`config/data-governance.json`](../config/data-governance.json)이 정한다. 근거는
[ADR-0003](adr/0003-baseline-json-source-of-truth.md)에 있다.

## 관계 게이트 (`npm run test:amp`)

앰프 관계 무결성, 파생 값의 순수성, configuration 그룹화·변형 병합·대표 행 정렬·HTML
escape·DOM 훅·입력 불변성을 검증한다.

## 감사 게이트 (`npm run test:audit`)

| 하위 명령                    | 지키는 계약                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------------- |
| `test:audit:classes`         | JS/HTML의 정적·동적 클래스 토큰과 CSS 정의의 대조                                                 |
| `test:audit:comments`        | 주석의 교차 참조·함수·저장소 경로·CSS 클래스가 실제로 존재하는지와 주석 작성 규칙. 문서와 데이터 원문은 검사 범위 밖이다. |
| `test:audit:css-layout`      | 상세 표의 반응형 열 구조와 stylesheet 로드 순서                                                   |
| `test:audit:assets`          | 자산 참조·고아(허용량 0), 완전 중복 baseline, 공식 출처 자산 해시, source manifest 전수, 런타임 미디어 manifest 계약 |

자산 정책 baseline은 [`config/asset-policy.json`](../config/asset-policy.json)이,
원본 provenance는 [`raw-data/source-manifests/`](../raw-data/source-manifests/)가 정한다
([ADR-0002](adr/0002-source-and-runtime-layers.md)).

## 보안 게이트 (`npm run test:security`)

`index.html`의 CSP 계약과 로컬 preview 서버의 경로 경계를 검증한다. preview 서버는
지정한 루트 밖의 파일을 서빙하지 않아야 한다.

## UI 게이트 (`npm run test:ui`)

| 하위 명령                | 지키는 계약                                     |
| ------------------------ | ----------------------------------------------- |
| `test:ui:smoke`          | 전체 부팅과 도메인 mount                        |
| `test:ui:regression`     | 카드·상세 DOM 계약                              |
| `test:ui:accessibility`  | ARIA·포커스 수명주기                            |
| `test:ui:navigation`     | 관계 항목의 공통 상세 이동                      |

jsdom 기반이므로 실제 렌더링·확대·터치는 검증하지 않는다. 화면 변경은
[브라우저 검수 SOP](sop/browser-review.md)로 보완한다.

## 배포 게이트

| 명령                  | 지키는 계약                                                                     |
| --------------------- | ------------------------------------------------------------------------------- |
| `npm run test:build`  | import 그래프 거부 사례 fixture와 반복 빌드 manifest 결정성                      |
| `npm run verify:dist` | `dist/` 최상위 항목, 허용 디렉터리·확장자, 소스 전용 경로 부재, 심볼릭 링크 금지, `index.html` 로컬 참조, 배포 JS 집합과 도달 가능 그래프의 정확한 일치, manifest 정렬·경로·크기·해시·합계 |

근거는 [ADR-0001](adr/0001-static-deployment-boundary.md)에 있다.

## 파이프라인 밖 검사

`npm run verify`에 포함되지 않지만 해당 작업에서는 반드시 실행한다.

| 명령                           | 언제                                                       |
| ------------------------------ | ---------------------------------------------------------- |
| `npm run sources:speakers:fetch` | 공식 원문을 새로 받거나 갱신할 때 (네트워크 접근)         |
| `npm run inventory:speakers`   | 조사 인벤토리를 다시 생성할 때 (파일을 덮어쓴다)           |
| `npm run media:runtime:dry`    | 런타임 파생 계획을 만들 때                                 |
| `npm run media:runtime:apply`  | 승인된 계획을 적용할 때                                    |
| `npm run media:runtime:verify` | 적용된 미디어 manifest를 확인할 때                         |
| `python scripts/montage_check.py` | 이미지 육안 검수 그리드를 만들 때                       |

절차는 [원문 수집 SOP](sop/source-intake.md), [런타임 미디어 SOP](sop/runtime-media.md),
[육안 검수 SOP](sop/visual-review.md)에 있다.

## CI

[`.github/workflows/ci-pages.yml`](../.github/workflows/ci-pages.yml)은 모든 pull
request와 push에서 `npm ci → npm run verify → npm run build`를 실행한다. Node 버전은
[`.node-version`](../.node-version)에서 읽는다. `main` push가 통과했을 때만 `dist/`를
Pages artifact로 업로드하고 별도 job이 배포한다.

[`.github/workflows/security.yml`](../.github/workflows/security.yml)은 pull request의
의존성 변경 검토(moderate 이상 실패)와 JavaScript·Python CodeQL 분석을 실행하며 주 1회
예약 실행도 한다. [`.github/dependabot.yml`](../.github/dependabot.yml)은 npm과 GitHub
Actions 의존성을 정기 검사하고, 업데이트도 같은 게이트를 통과해야 한다.

## 실패했을 때

- 게이트를 우회하거나 baseline을 근거 없이 늘리지 않는다.
- baseline이 바뀐 이유를 확인한 뒤 해당 `config/*.json`을 근거와 함께 갱신한다.
- 실패가 화면 계약에서 왔다면 [브라우저 검수 SOP](sop/browser-review.md)로 재현 조건을
  확인하고, 고정 가능한 계약이면 회귀 테스트로 남긴다.
