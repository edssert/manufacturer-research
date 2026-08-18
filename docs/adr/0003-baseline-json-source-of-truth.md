# ADR-0003: 기준선 JSON 단일 진실원천

- **상태**: 채택
- **날짜**: 2026-08-18
- **관련**: [ADR-0002](0002-source-and-runtime-layers.md), [ADR-0004](0004-runtime-image-content-policy.md), [ADR-0005](0005-official-series-order.md), [품질 게이트](../quality-gates.md)

## 맥락

이 프로젝트에는 계속 변하는 수치와 목록이 많다. 제조사 수, 제품 수, 완료/미완료
레코드 수, 출처가 없는 예외 목록, 해석하지 못한 앰프 모델, 비대칭 관계, 중복
이미지 그룹과 회수 가능 바이트, 파생 대상 브랜드 등이다.

이런 값을 Markdown 본문에 적으면 두 가지가 동시에 벌어진다. 첫째, 데이터가 늘어난
직후부터 문서가 사실과 어긋난다. 둘째, 어긋난 문서를 근거로 판단한 작업이 잘못된
방향으로 진행된다. 실제로 이 저장소의 문서에는 제조사 5곳·스피커 198개 같은 과거
수치가 오래 남아 있었고, 그 사이 런타임 데이터는 훨씬 커졌다.

## 결정

변동 가능한 모든 기준선은 기계 판독 JSON에 두고, 문서는 그 파일을 링크만 한다.

| 기준선 파일                                                                           | 관리 대상                                                                    |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [`config/data-governance.json`](../../config/data-governance.json)                     | 출처 루트 역할, 도메인별 coverage 방식과 기대 개수, 완료/pending 판정, 허용된 결손, 미해석 앰프 모델, 비대칭 관계 |
| [`config/asset-policy.json`](../../config/asset-policy.json)                           | 런타임 자산 루트와 허용 확장자, 누락·고아 허용량, 원본 아카이브 위치와 저장 방식, 정규화 정책, 대표 이미지 정책, 완전 중복 baseline |
| [`config/speaker-research.json`](../../config/speaker-research.json)                   | 스피커 카드 조사 인벤토리: 전체·완료·미완료 레코드 수, 미완료 그룹, 필드별 결손 수 |
| [`config/speaker-source-registry.json`](../../config/speaker-source-registry.json)     | 수집 대상 공식 원문 목록, 허용 호스트, 아카이브 루트                          |
| [`config/speaker-source-lock.json`](../../config/speaker-source-lock.json)             | 수집된 원문의 고정 해시·바이트                                                |
| [`config/media-sources.json`](../../config/media-sources.json)                         | 공식 출처가 확인된 런타임 이미지의 URL·해시·해상도·보존 원본                  |
| [`config/runtime-media-manifest.json`](../../config/runtime-media-manifest.json)       | 적용된 런타임 파생 계획: 정책 값, 대상·제외 브랜드, 레코드별 입출력 해시      |
| [`config/runtime-media-overrides.json`](../../config/runtime-media-overrides.json)     | 대표 이미지 예외의 provenance ([ADR-0004](0004-runtime-image-content-policy.md)) |
| [`raw-data/series-order/*.json`](../../raw-data/series-order/)                         | 공식 시리즈 순서 근거 ([ADR-0005](0005-official-series-order.md))              |
| [`raw-data/catalog-inventory/*.json`](../../raw-data/catalog-inventory/)               | 현행/레거시 판정과 카탈로그 대조 감사                                         |
| [`package.json`](../../package.json)                                                   | Node·npm 요구 버전, 실행 가능한 모든 검증 명령                                |

문서 작성 규칙은 다음과 같다.

- 문서 본문에 개수를 복제하지 않는다. "현재 몇 개인가"는 위 파일 또는 감사 출력이
  답한다.
- 결손 목록·예외 목록·허용 목록을 문서에 다시 나열하지 않는다. 변경할 때는 JSON을
  근거와 함께 갱신한다.
- 문서는 "무엇이 어디에서 결정되는가"와 "어떤 검사가 그것을 강제하는가"를 설명한다.
- 값이 여러 곳에 필요하면 한 파일을 원본으로 정하고 나머지는 그 파일을 읽는다.
  예를 들어 스피커 조사 인벤토리는 `npm run inventory:speakers`가 런타임 데이터에서
  다시 생성한다.

## 검토한 대안

| 대안                                       | 채택하지 않은 이유                                                                             |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| 문서 안의 표로 현황 관리                   | 사람이 갱신을 잊는 순간 조용히 거짓이 된다. 자동 검사가 문서를 읽어 판단할 수도 없다.           |
| 테스트 코드에 기대값을 하드코딩            | 정책 변경과 코드 변경이 뒤섞여 리뷰에서 근거를 구분하기 어렵다. 정책만 바꾸는 커밋이 불가능해진다. |
| 데이터베이스나 외부 스프레드시트 도입      | 정적 배포 원칙([ADR-0001](0001-static-deployment-boundary.md))과 어긋나고, 리뷰·이력 추적이 Git 밖으로 나간다. |
| 기준선을 아예 두지 않고 감사 출력만 신뢰   | 회귀를 감지할 기준선이 없어진다. 중복 이미지가 늘어나도 "원래 그랬다"와 구분되지 않는다.        |
| 모든 기준선을 하나의 거대 JSON으로 통합    | 서로 다른 주기·담당으로 바뀌는 값이 한 파일에서 충돌한다. 병렬 작업 시 병합 비용이 커진다.     |

## 결과

- 문서 리뷰가 가벼워진다. 수치가 바뀌어도 문서를 고칠 필요가 없다.
- 정책 변경에는 반드시 JSON 변경이 따르고, 그 diff가 리뷰 대상이 된다. 근거 없이
  baseline을 늘리는 변경은 diff에서 바로 드러난다.
- 감사 스크립트는 문서가 아니라 JSON을 읽으므로, 문서가 낡아도 검증은 정확하다.
- 이 결정 이후에도 문서에 남는 수치는 "거의 변하지 않는 구조적 값"뿐이다(예: 해시
  라우트 최대 3단, Split View 경계 860px, 카드 미디어 높이 같은 디자인 계약).
- `AGENTS.md`가 요구하는 "공용 레지스트리·정책·거버넌스 수치는 작업이 끝난 뒤
  통합한다"는 규칙이 실제 파일 경계와 일치한다.

## 검증

| 명령                        | 확인 대상                                                                     |
| --------------------------- | ----------------------------------------------------------------------------- |
| `npm run test:data`         | 데이터 감사와 출처 거버넌스 baseline, 조사 인벤토리 재계산, 원본 lock 일치     |
| `npm run inventory:speakers` | 런타임 데이터에서 `config/speaker-research.json`을 다시 생성                  |
| `npm run sources:speakers`  | registry와 lock의 개수·URL·경로·해시 일치                                     |
| `npm run test:audit:assets` | 자산 정책 baseline과 실제 파일 상태 대조                                      |

`npm run inventory:speakers`는 `--write`로 실행되어 파일을 갱신한다. 검증만 하려면
`npm run test:data`에 포함된 읽기 전용 실행을 사용한다.

## 재검토 조건

- 기준선 파일이 늘어나 서로 모순되는 값을 갖게 될 때
- 어떤 값이 어느 파일의 원본인지 판단하기 어려워질 때
- 스키마 버전(`schemaVersion`)을 올리는 변경이 필요할 때
- 기준선을 사람이 손으로 편집하는 빈도가 감사 자동 생성보다 높아질 때
