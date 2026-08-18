# ADR-0008: Supabase 최소 서비스 기준선과 측정 후 확장

- **상태**: 채택
- **날짜**: 2026-08-18
- **대체**: [ADR-0007](0007-service-technology-stack.md)
- **관련**: [ADR-0002](0002-source-and-runtime-layers.md), [ADR-0006](0006-service-catalog-and-admin-authoring.md)

## 맥락

ADR-0007은 PostgreSQL·인증·객체 저장소·관리자 UI의 방향을 정했지만, 초기 단계부터
Cloudflare Workers와 Hyperdrive를 API 경계로 고정하고 자체 관리자 UI를 확정했다.
적대적 재검토 결과 다음 사실이 드러났다.

- 공개 카탈로그는 버전된 정적 projection으로 제공할 수 있어 초기 공개 요청이 DB에
  연결될 필요가 없다.
- 관리자 수와 쓰기량이 적은 동안 Supabase Auth와 제한된 PostgreSQL RPC만으로 서버
  검증 쓰기 경계를 만들 수 있다.
- R2 presigned URL은 서명 작업이므로 Supabase Edge Function에서도 발급할 수 있다.
- Workers와 Supabase Edge Function의 메모리·CPU·실행 시간은 대형 PDF·ZIP·OCR 처리에
  적합하지 않다.
- Payload나 Directus 같은 관리 플랫폼은 자동 UI라는 장점이 있지만 field-level
  provenance와 DB 수준 자기 승인 차단에 커스텀이 필요하다. 문서 검토만으로 비용 우위를
  확정할 수 없다.

따라서 공급자와 런타임을 먼저 늘리지 않고, 한 vertical slice의 실측으로 다음 기술을
도입할지를 결정한다.

## 검토한 대안

| 대안 | 판단 |
| --- | --- |
| ADR-0007의 Workers·Hyperdrive 초기 도입 유지 | 정적 projection과 적은 관리자 쓰기에는 이득이 측정되지 않아 보류 |
| Supabase Storage까지 단일화 | 운영은 단순하지만 대규모 공개 원본의 저장·전송 비용을 R2와 실측 비교하기 전에는 채택하지 않음 |
| Payload 또는 Directus를 canonical owner로 사용 | 자동 관리자 UI는 장점이지만 field-level provenance와 DB 승인 강제의 커스텀 비용이 미확정이라 spike 대상으로 보류 |
| 자체 React 관리자 UI 즉시 확정 | 편집 생산성과 구현 비용 비교 없이 확정할 수 없어 Payload와 동일 task로 비교 |
| 공개 앱까지 Next.js로 재작성 | 데이터 전환과 UI 전환을 동시에 수행하므로 제외 |

## 결정

### 초기 기준선에 포함

- Supabase 관리형 PostgreSQL을 canonical write model로 사용한다.
- Supabase Auth의 GitHub OAuth를 관리자 인증에 사용한다.
- `catalog` 스키마는 브라우저 역할에 직접 노출하지 않는다. 관리 쓰기는 역할을 다시
  확인하는 `SECURITY DEFINER` RPC만 통과한다.
- Cloudflare R2는 공식 원본 이미지·문서의 바이트를 소유한다. 공개 다운로드는 custom
  domain을 사용한다.
- Supabase Edge Function은 JWT·역할을 확인한 뒤 임시 R2 object용 짧은 presigned PUT
  URL을 발급하는 등 짧고 가벼운 작업만 담당한다.
- 공개 앱은 현재 Vanilla JS를 유지하고, canonical DB에서 재현 가능한 버전형 JSON
  projection을 읽는다.
- importer, projection 생성, 대형 문서 추출·OCR·압축 해제는 요청 경로 밖의 container
  runner가 수행한다.
- migration 개발과 CI는 Supabase CLI local stack을 사용한다.

### 실험 후 결정

- 관리자 UI는 자체 React·TypeScript 구현과 Payload 기반 구현을 같은 local DB와 동일한
  acceptance task로 하루 동안 비교한 뒤 별도 ADR로 선택한다.
- 공개 UI의 동적 API, Workers, Hyperdrive는 정적 projection이나 Supabase RPC의 측정된
  한계가 생길 때만 도입한다.
- 전용 검색엔진은 버전된 client-side projection이 실제 성능 목표를 반복적으로 넘을 때만
  검토한다.

### 초기 범위에서 제외

- Cloudflare Workers, Hyperdrive, Queues, Cron
- 공개 UI의 React·Next.js 전면 재작성
- Meilisearch, Typesense, OpenSearch, 별도 벡터 DB
- 조달·적용 사례·기술·연혁을 한 번에 운영 DB에 적용하는 작업

## 책임 경계

| 경계 | 소유 책임 | 소유하지 않는 것 |
| --- | --- | --- |
| Supabase PostgreSQL | canonical facts, 관계, evidence, 변경 요청, 승인, 감사 | 원본 파일 바이트, 공개 UI |
| Supabase Auth | 로그인 identity와 JWT | 앱 역할·승인 권한 |
| Supabase Edge Function | 짧은 인증된 서명·webhook | PDF/OCR, 장시간 batch, canonical 직접 편집 |
| R2 | immutable original과 승인된 공개 object | 제품 사양, 승인 상태 |
| Container runner | import, 검증, extraction, projection, object 검사 | 사용자 요청 응답, 장기 canonical 소유 |
| 정적 공개 앱 | projection 조회·검색·비교·딥링크 | canonical write, 비밀, 관리자 권한 판정 |
| GitHub | 코드, migration, 정책, 검증 snapshot | 실시간 운영 DB, 브라우저용 비밀 |

runner는 인간 `app_user` 역할이 아니라 별도 DB service principal이다. 작업별 최소 권한과
job identity를 가지며 승인 결정을 할 수 없다.

## 관리자 UI 실험

Payload와 자체 관리자 UI는 다음 작업을 동일하게 수행한다.

1. 제품 표시명 변경 요청을 만들고 다른 사용자가 승인한다.
2. 작성자가 자기 요청을 승인하면 DB가 거부한다.
3. 제품 사양 한 필드에 assertion과 source locator 두 개를 연결한다.
4. media placement를 drag reorder하고 감사 로그를 확인한다.
5. R2 임시 업로드, 검사, 승인, projection 재생성 상태를 한 화면에서 추적한다.

작업별 소요 시간, 커스텀 코드량, 프레임워크 우회 횟수, 스키마 중복, 실제 편집 시간을
측정한다. Payload가 canonical 테이블의 소유권 이전이나 중복 테이블을 요구하면 실험을
중단하고 자체 관리자 UI를 선택한다.

## 결과

- 초기 운영 경계가 Supabase와 R2로 줄어 인증·DB·관찰 지점이 단순해진다.
- Workers와 Hyperdrive는 폐기하지 않고 측정 기반 escalation option으로 남는다.
- 대형 문서 처리가 edge request와 분리되어 실제 파일 크기와 처리 시간에 맞는 실행 환경을
  선택할 수 있다.
- 관리자 UI 선택은 기능 목록이 아니라 대표 편집 작업의 생산성으로 결정한다.

## 검증

- `supabase db reset`이 빈 local stack에서 모든 적용 대상 migration을 재현한다.
- legacy source → DB → projection의 stable ID·관계·미디어 SHA diff가 0이다.
- 자기 승인, 불법 상태 전이, 감사 로그 변경·삭제·truncate가 DB에서 실패한다.
- `anon`, `authenticated`, `service_role`의 canonical 직접 접근이 거부된다.
- R2 임시 업로드의 SHA-256·MIME·크기·금지 콘텐츠 검사가 승인 전에 완료된다.
- 가장 큰 대표 PDF·ZIP extraction의 peak memory·wall time·실패 복구가 기록된다.
- 한국 staging 환경에서 Auth·RPC·서명 발급 지연과 월 예상 비용을 측정한다.

## 재검토 조건

- 공개 projection의 갱신 시간·용량·검색 지연이 합의한 목표를 넘을 때
- 관리자 RPC p95가 직접 경로로는 목표를 반복적으로 넘을 때
- 관리자 UI 실험에서 Payload 또는 다른 플랫폼의 총비용이 자체 구현보다 낮을 때
- R2의 요청 비용·운영 복잡도가 Supabase Storage 단일화보다 커질 때
- 조달 문서 처리량이 단일 container runner의 처리 목표를 넘을 때

## 공식 근거

- [Supabase local development workflow](https://supabase.com/docs/guides/local-development/cli-workflows)
- [Supabase Edge Function limits](https://supabase.com/docs/guides/functions/limits)
- [R2 presigned URLs](https://developers.cloudflare.com/r2/api/s3/presigned-urls/)
- [Cloudflare Workers limits](https://developers.cloudflare.com/workers/platform/limits/)
- [Cloudflare Queues limits](https://developers.cloudflare.com/queues/platform/limits/)
- [Payload concepts](https://payloadcms.com/docs/getting-started/concepts)
- [Payload Postgres adapter](https://payloadcms.com/docs/database/postgres)
- [Payload versions](https://payloadcms.com/docs/versions/overview)
