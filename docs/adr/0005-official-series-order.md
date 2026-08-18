# ADR-0005: 공식 시리즈 순서 우선

- **상태**: 채택
- **날짜**: 2026-08-18
- **관련**: [ADR-0002](0002-source-and-runtime-layers.md), [ADR-0003](0003-baseline-json-source-of-truth.md), [원문 수집 SOP](../sop/source-intake.md)

## 맥락

카탈로그 화면은 제품을 시리즈로 묶어 보여 준다. 이 그룹의 순서는 사용자가 제조사의
제품 위계를 읽는 방식 자체를 결정한다. 플래그십이 목록 중간에 있으면 사용자는 그
제조사의 라인업 구조를 잘못 이해한다.

순서를 정하는 방법은 여러 가지가 있고, 모두 그럴듯하다. 알파벳순, SPL순, 크기순,
앱이 만든 Long/Medium/Short Throw 분류 등이다. 그러나 이들은 전부 앱의 판단이며
제조사의 판단이 아니다. [`AGENTS.md`](../../AGENTS.md)는 제조사의 정확한 시리즈
이름을 보존하고, 플래그십·현행 시스템 위계의 근거를 `raw-data/series-order/`에 남길
것을 요구한다. [`DESIGN.md`](../../DESIGN.md)도 제조사 공통 용어가 아닌 앱 자체
분류를 그룹 헤더에 노출하지 않는다고 정한다.

## 결정

시리즈와 시리즈 내 제품의 표시 순서는 **제조사의 현행 공식 제품 페이지 또는 공식
카탈로그 순서를 1차 근거로** 삼는다.

### 근거 기록

제조사마다 [`raw-data/series-order/<제조사>.json`](../../raw-data/series-order/)에
근거를 남긴다. 최소 형식은 [`raw-data/series-order/README.md`](../../raw-data/series-order/README.md)에
있고, 실제 파일은 다음을 담는다.

- `manufacturerId`, `source`(또는 `sourcePage`), `retrievedAt`
- `basis` — 어떤 공식 자료의 어떤 순서를 읽었는지
- 원문 순서를 보존한 `series[]` 인벤토리
- 화면에 쓸 `displaySeriesOrder`
- 원문 순서와 표시 순서가 다르면 그 사유를 적은 `displayPolicy`

### 런타임 투영

런타임의 [`SERIES_ORDER_BY_MANUFACTURER`](../../public/js/domains/speakers/speakers.schema.js)와
`PRODUCT_ORDER_BY_SERIES`는 이 근거의 투영이다. `seriesRank()`와 `productRank()`는
목록에 없는 값에 `Number.MAX_SAFE_INTEGER`를 돌려주므로, 등록되지 않은 시리즈는
임의 위치로 끼어들지 않고 뒤로 밀린다.

### 편집적 폴백

공식 순서가 존재하지 않거나 현행 제품 위계를 표현하지 못할 때만 편집적 기준
(플래그십 규모, 현행 시스템 계층, 제품 유형)을 사용한다. 이 경우에도 판단 근거를
같은 JSON의 `displayPolicy`에 적는다. 예를 들어 Martin Audio는 공식 시리즈 페이지가
알파벳 가까운 순서를 쓰기 때문에, 원문 인벤토리를 보존한 채 공식 프리미엄 3종
(Wavefront Precision, TORUS, FlexPoint)을 앞세우는 표시 순서를 별도로 기록한다.

### 현행/레거시 판정

순서와 별개로 "카탈로그에 남길 제품인가"는 수명주기 판정이다. 근거는
[`raw-data/catalog-inventory/`](../../raw-data/catalog-inventory/)의 감사 파일에 남기고,
현행 제품군만 런타임에 포함한다.

## 검토한 대안

| 대안                                     | 채택하지 않은 이유                                                                                    |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 알파벳순 정렬                            | 구현은 가장 단순하지만 제품 위계를 완전히 지운다. 플래그십과 보급형이 무작위로 섞인다.                 |
| SPL·크기 등 수치 기준 정렬               | 수치가 없는 pending 레코드를 배치할 수 없고, 서브우퍼처럼 척도가 다른 제품군을 같은 축에 놓게 된다.   |
| 앱 자체 Long/Medium/Short Throw 분류     | 제조사 공통 용어가 아니다. 같은 제품을 제조사마다 다르게 분류하게 되고 근거를 댈 수 없다.             |
| 데이터 배열의 물리적 순서만 사용          | 근거가 코드에만 남는다. 배열을 재정렬한 이유를 나중에 확인할 수 없고, 병합 시 조용히 뒤바뀐다.        |
| 표시 순서를 화면 코드에서 즉석 계산       | 정렬 규칙이 view에 흩어져 도메인별로 달라진다. 순수 함수와 테스트로 고정할 대상이 사라진다.           |

## 결과

- 새 시리즈나 제품을 추가할 때 근거 JSON을 함께 갱신해야 한다. 갱신 없이 런타임
  순서만 바꾸면 대조 테스트가 실패한다.
- 제조사 공식 페이지가 개편되면 `retrievedAt`을 갱신하고 순서를 다시 읽는다.
- 시리즈 이름은 제조사 표기를 그대로 쓴다. 화면용 그룹 이름을 따로 만들어야 하면
  근거 JSON에 매핑을 남긴다.
- 현재는 Martin Audio와 JBL Professional이 전용 대조 테스트로 고정되어 있고, 나머지
  제조사는 근거 JSON과 런타임 배열을 리뷰에서 대조한다. 전 제조사 자동 대조는 아직
  적용되지 않았다.

## 검증

| 검사                                                                                              | 확인 대상                                                                            |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [`public/tests/martin-series-order.test.mjs`](../../public/tests/martin-series-order.test.mjs)     | 런타임 표시 순서와 `raw-data/series-order/martin.json`의 `displaySeriesOrder` 일치, 공식 시리즈 전수 1회 포함, 프리미엄 3종 선두 |
| [`public/tests/speaker-product-order.test.mjs`](../../public/tests/speaker-product-order.test.mjs) | 시리즈 내 제품 순서(EAW ADAPTive·Newport, Martin 공식 소스 순서)                     |
| [`public/tests/jbl-current-hierarchy-audit.test.mjs`](../../public/tests/jbl-current-hierarchy-audit.test.mjs) | 런타임 제품 수와 감사 파일 일치, VTX 수명주기 분류, 권장 표시 순서의 전수 포함     |
| [`public/tests/jbl-catalog-groups.test.mjs`](../../public/tests/jbl-catalog-groups.test.mjs)       | JBL 카탈로그 그룹 구성                                                               |

모두 `npm run test:unit`에 포함되며 `npm run verify` 경로에 있다.

## 재검토 조건

- 제조사가 공식 제품 페이지의 구조나 시리즈 명칭을 개편할 때
- 편집적 폴백을 쓰는 제조사가 늘어나 판단 기준이 제각각이 될 때
- 전 제조사 근거 JSON ↔ 런타임 순서 자동 대조 테스트를 도입할 때
- 스피커 외 도메인에도 시리즈 위계 표시가 필요해질 때
