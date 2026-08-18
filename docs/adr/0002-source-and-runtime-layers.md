# ADR-0002: 공식 원본 아카이브 + 공개 원본 표면 이중 계층

- **상태**: 채택
- **날짜**: 2026-08-18
- **관련**: [ADR-0001](0001-static-deployment-boundary.md), [ADR-0003](0003-baseline-json-source-of-truth.md), [ADR-0004](0004-runtime-image-content-policy.md), [원문 수집 SOP](../sop/source-intake.md), [런타임 미디어 SOP](../sop/runtime-media.md)

## 맥락

[`AGENTS.md`](../../AGENTS.md)는 내려받은 공식 원본을 수정하지 않고 보존하고,
출처 URL·수집일·SHA-256·바이트 크기·MIME·연결 제품을 source manifest에 기록할 것을
요구한다. 제품 이미지는 다른 문서에서도 재사용할 수 있어야 하므로 카드·상세의
`img src` 역시 제조사 원본 바이트를 가리켜야 한다. PDF·HTML 문서는 카드 화면의
입력이 아니며 배포 대상에서 제외한다.

원본을 저장소 밖(예: 개인 클라우드 폴더)에 두는 방식도 시도할 수 있지만, 그렇게
하면 CI가 원본 해시를 검증할 수 없고 파생본이 어떤 원본에서 나왔는지 자동으로
확인할 방법이 사라진다. 근거와 화면이 같은 커밋에서 검증되지 않으면 "이 이미지가
정말 공식 자료인가"라는 질문에 코드로 답할 수 없다.

## 결정

증거 계층과 런타임 계층을 저장소 안에서 분리하되, 둘 다 저장소가 추적한다.

**증거 계층** — 배포 제외([ADR-0001](0001-static-deployment-boundary.md)), Git LFS 추적
([`.gitattributes`](../../.gitattributes))

| 위치                          | 역할                                                             |
| ----------------------------- | ---------------------------------------------------------------- |
| `raw-data/official-docs/`     | 내려받은 제조사 데이터시트·매뉴얼·카탈로그·제품 페이지 스냅숏     |
| `raw-data/raw-assets/`        | 가공 전 제조사 원본 이미지·미디어                                |
| `raw-data/raw-specs/`         | 완료 레코드마다 하나씩 두는 canonical 근거 노트                  |
| `raw-data/research-gaps/`     | 독립 공식 사양이 없어 미완료로 남긴 검토 결과                    |
| `raw-data/source-manifests/`  | 위 원본 전체의 기계 판독 provenance (`<제조사>.json`)            |
| `raw-data/series-order/`      | 공식 시리즈 순서 근거([ADR-0005](0005-official-series-order.md)) |
| `raw-data/catalog-inventory/` | 현행/레거시 판정과 카탈로그 대조 감사 결과                       |

**런타임 계층** — 배포 포함

| 위치                 | 역할                                          |
| -------------------- | --------------------------------------------- |
| `public/assets/img/` | 카드·상세에서 직접 여는 공식 원본 이미지 사본 |
| `public/js/domains/` | 화면이 읽는 구조화 레코드                     |

계층 사이의 계약은 다음과 같다.

- 원본은 불변이다. 원본을 고쳐야 할 이유가 생기면 원본을 다시 받고 새 항목으로
  기록한다.
- 모든 런타임 이미지는 보존된 원본에서 유래하며, 그 관계를 manifest가 증명한다.
  [`raw-data/source-manifests/*.json`](../../raw-data/source-manifests/)은 항목마다
  `path`, `role`, `productIds`, `sourcePage`, `sourceAsset`, `retrievedAt`, `sha256`,
  `bytes`, `mimeType`를 요구하고, 감사가 실제 파일의 크기·해시와 대조한다.
- 원본 수집은 [`config/speaker-source-registry.json`](../../config/speaker-source-registry.json)에
  선언하고 [`config/speaker-source-lock.json`](../../config/speaker-source-lock.json)으로
  고정한다. HTTPS와 허용 호스트만 사용하며 리다이렉트가 허용 호스트를 벗어나면
  실패한다.
- 공개 원본 표면은 [`scripts/runtime-media-pipeline.mjs`](../../scripts/runtime-media-pipeline.mjs)의
  `dry-run → apply → verify` 3단계로만 동기화한다. `apply`는 승인된 dry-run manifest와
  현재 상태가 완전히 같을 때만 실행되고, 공식 raw 파일을 확장자·메타데이터·바이트를
  바꾸지 않고 `public/assets/img/`에 복사한다. 결과는
  [`config/runtime-media-manifest.json`](../../config/runtime-media-manifest.json)에
  기록된다. 제품 레코드의 실제 `img`·`views[].src`에는 `.runtime.webp` 같은 최적화
  파생 경로를 허용하지 않는다. 예외적인 로컬 마스크는 ADR-0004의 근거·픽셀 검증을
  통과한 경우에만 별도 공개 자산으로 허용한다.
- 데이터 완료 판정은 canonical 근거를 요구한다. `pending: true`가 없는 레코드는
  완료 레코드로 간주하며 `raw-data/raw-specs/`에 대응 문서가 있어야 한다. 판정
  규칙과 허용된 예외는 [`config/data-governance.json`](../../config/data-governance.json)에
  있다.

절차는 [원문 수집 SOP](../sop/source-intake.md)와 [런타임 미디어 SOP](../sop/runtime-media.md)에 있다.

## 검토한 대안

| 대안                                       | 채택하지 않은 이유                                                                                             |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| 원본을 저장소 밖 클라우드 폴더에 보관      | CI가 원본 해시를 검증할 수 없다. 파생본과 원본의 연결이 사람의 기억에만 남고, 리뷰어가 근거를 확인할 수 없다. |
| 제품 이미지를 최적화 파생본으로만 제공      | 우클릭·새 탭·문서 재사용 시 제조사 원본을 얻을 수 없고 파일명·포맷·메타데이터가 달라진다.                       |
| 파생본만 저장하고 원본은 폐기              | 재가공·재검증이 불가능해진다. "제품 형상을 바꾸지 않았다"는 주장을 증명할 기준이 사라진다.                     |
| 파생을 이미지 편집기로 수동 처리           | 동일 입력에 동일 결과를 보장할 수 없고, 어떤 변환이 적용됐는지 기록이 남지 않는다.                              |
| 원본을 일반 Git blob으로 추적              | 바이너리 이력이 clone 비용을 계속 키운다. LFS 포인터로 추적하면 필요할 때만 내려받는다.                        |

## 결과

- 저장소는 Git LFS를 요구한다. 클론 후 원본이 포인터 파일로만 보이면 LFS가 설치·초기화되지
  않은 상태다.
- 이미지나 문서를 교체하면 manifest도 같은 커밋에서 갱신해야 한다. 해시 하나만 어긋나도
  자산 감사가 실패한다.
- 원본이 없는 이미지는 런타임에 올릴 수 없다. 새 제품을 추가할 때는 원본 확보가 첫 단계다.
- 저장소 밖 보관을 전제로 한 과거 안내(개인 클라우드 원본 아카이브)는 이 결정으로
  대체되었다. 현재 원본 보관 위치의 단일 원본은
  [`config/asset-policy.json`](../../config/asset-policy.json)의 `originalArchive` 필드다.
- 공개 원본은 용량이 크다. 향후 성능 최적화가 필요하면 `<picture>`의 별도 전송 후보를
  검토하되, 사용자가 직접 여는 `<img src>`와 다운로드 표면은 공식 원본으로 유지한다.

## 검증

| 명령                        | 확인 대상                                                                    |
| --------------------------- | ---------------------------------------------------------------------------- |
| `npm run test:audit:assets` | 자산 참조·고아·중복 baseline, 공식 출처 자산 해시, source manifest 전수 대조 |
| `npm run media:runtime:verify` | 적용된 런타임 미디어 manifest와 실제 파일의 일치                          |
| `npm run test:data`         | 데이터 계약, 출처 거버넌스, 원본 lock, 조사 인벤토리                         |
| `npm run verify`            | 위 검사를 포함한 전체 파이프라인                                             |

## 재검토 조건

- 원본 아카이브 총량이 Git LFS 저장·대역폭 한도를 압박할 때
- 런타임 이미지를 외부 CDN이나 이미지 서비스로 옮길 때
- 스피커 외 도메인(앰프·DSP·액세서리)에 같은 수준의 원본 미디어 계층이 필요해질 때
- source manifest 스키마 버전이 올라갈 때
