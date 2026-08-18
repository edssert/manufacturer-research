# ADR-0004: 런타임 이미지 금지 콘텐츠와 예외 provenance

- **상태**: 채택
- **날짜**: 2026-08-18
- **관련**: [ADR-0002](0002-source-and-runtime-layers.md), [ADR-0003](0003-baseline-json-source-of-truth.md), [런타임 미디어 SOP](../sop/runtime-media.md), [육안 검수 SOP](../sop/visual-review.md)

## 맥락

카드 그리드는 제품을 식별하고 비교하는 화면이다. 모든 카드가 같은 순백 스테이지를
쓰고 정보 위계도 같기 때문에, 이미지 한 장에 수상 배지나 기능 설명 콜아웃이 섞이면
그 카드만 광고처럼 보이고 비교가 깨진다.

그런데 제조사 공식 자료에도 이런 요소가 자주 들어 있다. 실제로 이 저장소에서
확인된 사례는 두 가지다.

- d&b audiotechnik KSL 계열 공식 렌더에 Red Dot 수상 마크가 제품 옆에 떨어져 있었다.
- Martin Audio CDD-WR 계열 공식 이미지에 트랜스포머 탭 기능 콜아웃이 겹쳐 있었다.

[`AGENTS.md`](../../AGENTS.md)는 이런 이미지를 대표 이미지로 쓰지 말 것과, 생성형
편집으로 제품 형상을 다시 그리지 말 것을 함께 요구한다. 두 요구를 동시에 만족시키려면
"고치지 않는다"와 "그냥 쓴다" 사이에 검증 가능한 세 번째 경로가 필요하다.

## 결정

### 금지 콘텐츠

대표 이미지에 다음이 포함되면 그대로 쓰지 않는다. 목록의 단일 원본은
[`config/asset-policy.json`](../../config/asset-policy.json)의
`normalization.representativeMedia.prohibitedContent`다.

- 수상 배지, 홍보 마크, 텍스트 오버레이, 기능 설명 콜아웃, 무관한 시리즈 이미지

여기에 더해 액세서리 레일·브래킷·포장 이미지, 설치 현장 사진, 소프트웨어 화면도
제품 대표 이미지가 아니다.

### 선택 순서

같은 설정 파일의 `selectionOrder`가 우선순위를 정한다. 위에서부터 시도하고, 가능한
가장 높은 단계를 쓴다.

1. `clean-official-view` — 금지 콘텐츠가 없는 공식 제품 뷰
2. `official-manufacturer-variant-alias` — 같은 제조사가 공식적으로 제공하는 변형
   모델의 깨끗한 이미지로 대체
3. `documented-local-mask` — 근거를 남긴 로컬 마스크 파생본

### 로컬 마스크의 조건

3단계는 다음을 모두 만족해야 한다(`normalization.representativeMedia.localMaskRequires`).

- `immutable-raw-source` — 원본은 `raw-data/`에 그대로 보존
- `source-and-output-sha256` — 원본과 출력의 해시를 모두 기록
- `declared-edit-bounds` — 편집 영역을 픽셀 좌표로 선언
- `pixel-diff-contained-in-bounds` — 실제 변경 픽셀이 선언 영역을 벗어나지 않음
- `product-pixels-unchanged` — 제품 픽셀은 바뀌지 않음

생성형 편집은 어느 단계에서도 허용하지 않는다.

### 예외 provenance

2단계와 3단계는 예외이므로 반드시
[`config/runtime-media-overrides.json`](../../config/runtime-media-overrides.json)에
기록한다. 이 파일은 두 종류의 항목을 갖는다.

- `maskedDerivatives` — 로컬 마스크. 원본 경로와 해시, 출력 경로와 해시, 치수,
  편집 경계, 변경 픽셀 수, `productPixelsChanged: false`, `generativeEditing: false`
- `officialSubstitutions` — 공식 변형 대체. 제품 ID, 은퇴한 런타임 경로, 거부한
  원본 경로와 해시, 채택한 런타임 경로와 해시, 대체 사유, 근거 문서 경로

거부된 이미지를 런타임에 남겨 두지 않는다. 대체가 끝나면 은퇴 경로의 파일을 삭제하고
제품 레코드의 `views`에서도 제거한다.

## 검토한 대안

| 대안                                        | 채택하지 않은 이유                                                                                       |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| 배지·콜아웃이 있어도 그대로 사용            | 카드 비교가 깨지고 특정 제조사만 홍보처럼 보인다. 무채색 공통 카드 계약과 정면으로 충돌한다.             |
| 생성형 편집으로 배경과 제품을 다시 그림     | 제품 형상·단자·그릴·로고가 사실과 달라질 수 있다. 기술 카탈로그에서 이는 데이터 오염이다.               |
| 해당 제품을 카탈로그에서 제외                | 이미지 문제로 현행 제품이 사라진다. 제품 범위는 이미지 품질이 아니라 제품 수명주기가 결정해야 한다.     |
| 자유로운 수동 리터치 후 육안 확인만         | 무엇이 얼마나 바뀌었는지 증명할 수 없다. 리뷰어가 diff에서 판단할 근거가 남지 않는다.                    |
| 편집 결과만 커밋하고 원본은 폐기            | 재검증이 불가능하다. [ADR-0002](0002-source-and-runtime-layers.md)의 원본 불변 계층과 충돌한다.          |
| 배지 위치를 자동 검출해 일괄 제거           | 오탐이 제품 픽셀을 지울 위험이 있다. 사례가 소수인 현재 단계에서는 근거 기록이 더 안전하고 저렴하다.     |

## 결과

- 예외는 자동으로 늘어나지 않는다. 새 예외마다 사람이 근거를 적고 리뷰를 받는다.
- 예외 항목은 픽셀 단위로 검사된다. 마스크가 선언 경계를 1픽셀이라도 벗어나면 테스트가
  실패한다.
- 공식 변형 대체는 근거 문서에서 제품 정체성이 확인되어야 한다. 검사는 근거 HTML에
  해당 모델 식별자가 실제로 등장하는지 확인한다.
- 대표 이미지가 바뀌면 해시가 달라지므로 override 파일도 같은 커밋에서 갱신해야 한다.
- 현재 등록된 예외의 개수와 내용은 문서가 아니라 override 파일이 답한다
  ([ADR-0003](0003-baseline-json-source-of-truth.md)).

## 검증

| 검사                                                                                            | 확인 대상                                                                        |
| ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [`public/tests/runtime-media-cleanliness.test.mjs`](../../public/tests/runtime-media-cleanliness.test.mjs) | 원본·출력 해시, 치수, 변경 픽셀의 경계 포함 여부와 개수, 제품 픽셀 불변, 생성형 편집 금지, 은퇴 경로 삭제, 근거 문서의 제품 정체성 |
| [`public/tests/product-media-surface.test.mjs`](../../public/tests/product-media-surface.test.mjs)         | 모든 Speaker 카드·상세가 동일한 흰 제품 스테이지 변경자를 사용                    |
| `npm run test:audit:assets`                                                                       | 참조 누락·고아 자산 0, 공식 출처 자산 해시, 중복 baseline                        |
| [육안 검수 SOP](../sop/visual-review.md)                                                          | 자동 검사가 판단할 수 없는 초점·크롭·저화질 업스케일·배지 잔존                    |

`runtime-media-cleanliness.test.mjs`는 `npm run test:unit`에, 자산 감사는
`npm run test:audit:assets`에 포함된다. 둘 다 `npm run verify` 경로에 있다.

## 재검토 조건

- 제조사가 문제 이미지를 깨끗한 공식 뷰로 교체해 예외를 없앨 수 있을 때
- 새로운 금지 콘텐츠 유형이 반복해서 나타날 때
- 예외 항목이 손으로 관리하기 어려운 규모로 늘어나 자동 검출이 필요해질 때
- 대표 이미지 선택 순서에 새로운 단계(예: 제조사 제공 공식 누끼 API)가 생길 때
