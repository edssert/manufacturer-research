# ADR-0007: 서비스 기술 스택과 단계적 전환

- **상태**: 대체됨 — [ADR-0008](0008-supabase-minimum-service-baseline.md)
- **날짜**: 2026-08-18
- **관련**: [ADR-0001](0001-static-deployment-boundary.md), [ADR-0002](0002-source-and-runtime-layers.md), [ADR-0006](0006-service-catalog-and-admin-authoring.md)

> 이 결정은 서비스형 전환 방향은 유지하지만 Workers·Hyperdrive를 초기 필수 경계로
> 둔 점과 관리자 UI를 실험 없이 확정한 점 때문에 ADR-0008로 대체됐다.

## 맥락

현재 앱은 정적 JavaScript 카탈로그로 공개 조회를 안정적으로 제공하지만, 앞으로 필요한
기능은 정적 파일 편집의 범위를 넘는다.

- 복수 관리자의 제품·사양·미디어 편집, 검토, 승인, 감사
- 필드 단위 출처와 원문 위치, 원본 이미지·문서의 장기 보존
- 나라장터·조달청 공고의 반복 수집과 버전 비교
- 입찰 요구조건을 제품 또는 구성안과 대조하고 근거를 설명하는 추천
- 공연장·객석 규모·설치 제품을 연결한 적용 사례
- 제조사 연혁과 제품·WFS·가변잔향 등 기술 연혁의 분리 및 연결

공개 읽기는 많고 쓰기는 적지만 한 번의 쓰기가 여러 관계와 감사 기록을 원자적으로
바꿔야 한다. 현재 공개 스피커 이미지 자체가 수 GB이고 공식 원본 아카이브는 그보다
훨씬 크므로 DB와 대용량 파일 저장소도 분리해야 한다. 반면 기존 공개 UI는 이미 동작하고
있어 전면 재작성은 위험 대비 이득이 작다.

## 평가 기준

후보 기술은 다음 순서로 평가한다.

1. 관계·단위·출처·승인 이력을 트랜잭션으로 보존할 수 있는가
2. 여러 관리자에게 서버 검증 인증과 역할 권한을 제공하는가
3. 원본 파일을 변형 없이 저장하고 공개 다운로드 비용을 통제할 수 있는가
4. 공고 수집·문서 추출 같은 비동기 작업으로 확장할 수 있는가
5. 기존 공개 카탈로그를 중단하지 않고 점진적으로 이전할 수 있는가
6. 공급자 종속성과 운영 복잡도가 얻는 이익보다 크지 않은가

## 검토한 대안

| 대안 | 장점 | 제외 또는 보류 이유 |
| --- | --- | --- |
| GitHub Pages + Git/JSON 유지 | 가장 단순하고 현재 동작함 | 다중 편집, 트랜잭션, 서버 권한, 감사 질의, 공고 수집에 부적합 |
| Cloudflare D1 + R2 + Workers | 한 공급자, 엣지 친화적 | canonical 모델의 관계·검증·승인 질의에는 PostgreSQL 생태계와 기능이 더 적합 |
| Neon PostgreSQL + 별도 Auth + Cloudflare | 조합 자유도와 scale-to-zero | 인증·역할·관리 운영을 별도로 조합할 이유가 아직 없음 |
| Supabase 전체 사용 | PostgreSQL·Auth·Storage·Functions 통합 | 대규모 공개 원본의 저장·전송을 DB/Auth와 같은 공급자에 묶을 필요가 없음 |
| Next.js 등으로 공개 UI까지 즉시 재작성 | 단일 현대 프레임워크 | 현재 공개 UI의 기능 기준선을 잃고 DB 전환과 UI 재작성을 동시에 수행하게 됨 |

## 결정

### 1. Canonical 데이터와 인증

- **Supabase 관리형 PostgreSQL**을 canonical write model로 사용한다.
- **Supabase Auth**의 GitHub OAuth를 초기 관리자 로그인으로 사용한다.
- 제품·출처·관계·승인·감사 테이블은 공개 API 스키마에서 분리한 `catalog` 스키마에 둔다.
- 브라우저가 canonical 테이블을 직접 수정하지 않는다. 관리자 쓰기는 API만 통과한다.
- 인증 공급자 ID와 앱 사용자를 매핑하고 `owner`, `maintainer`, `editor`, `reviewer` 역할은
  앱 DB가 소유한다. 작성자와 승인자는 동일할 수 없도록 서비스와 DB 함수 양쪽에서 검사한다.

Supabase는 PostgreSQL, JWT 기반 Auth와 RLS를 함께 제공하며 GitHub OAuth를 공식 지원한다.
Free 프로젝트는 비활성 시 일시 정지되므로 운영은 Pro 이상을 전제로 예산화한다.

### 2. API와 백그라운드 작업

- **Cloudflare Workers + TypeScript**를 공개·관리자 API 경계로 사용한다.
- Workers는 Supabase JWT를 검증하고 제한된 DB 사용자로 **Hyperdrive**를 통해 PostgreSQL에
  연결한다. canonical 테이블의 광범위한 직접 권한 대신 승인된 함수와 최소 권한을 사용한다.
- 공고 폴링은 Cron Trigger, 긴 문서 처리와 재시도는 Queue 소비자로 분리한다.
- 응답 캐시가 쓰기 직후 오래된 값을 제공하지 않도록 mutable 관리자 질의는 Hyperdrive
  query cache를 사용하지 않고, 공개 projection만 버전 키로 캐시한다.

### 3. 원본 이미지와 문서

- **Cloudflare R2**를 공식 원본 이미지·PDF·ZIP의 object store로 사용한다.
- DB에는 object key, SHA-256, byte size, MIME, 권리 상태, 출처, 다운로드 파일명만 저장한다.
- 공개 전송은 R2 custom domain을 사용하고 `r2.dev`는 개발에만 쓴다.
- 관리자가 올린 파일은 임시 key에 저장하고 해시·MIME·금지 마크 검사와 승인 후 canonical
  key로 승격한다. 원본은 덮어쓰지 않고 새 object/version으로 남긴다.

R2는 인터넷 egress가 무료이고 표준 저장 단가가 GB-month 기준으로 계산되므로, 공개 원본이
수 GB이고 raw archive가 더 큰 현재 구조에 적합하다. 다만 요청 연산 비용과 수명주기 정책은
월별로 관찰한다.

### 4. 프론트엔드

- **공개 카탈로그는 현재 Vanilla JS UI를 유지**하고 데이터 공급만 정적 모듈에서 버전된
  JSON projection/API로 교체한다.
- **관리자 화면은 React + TypeScript + Vite의 별도 진입점**으로 만든다. 드래그 순서,
  다단계 폼, 변경 diff, 승인 큐처럼 상태가 복잡한 화면에만 컴포넌트 프레임워크를 사용한다.
- 공개 UI의 React/Next.js 전면 전환은 SSR·SEO·팀 생산성 측정으로 필요성이 입증될 때만
  별도 ADR로 검토한다.

### 5. 검색과 추천

- 1차 검색은 PostgreSQL full-text search, `pg_trgm`, 정규화 속성 인덱스로 구현한다.
- 입찰 추천은 먼저 결정론적 조건 평가와 근거 assertion ID를 반환한다. 벡터 검색이나 LLM은
  후보 확장·문서 추출 보조에만 쓰며, 적합 판정의 단독 근거로 사용하지 않는다.
- Meilisearch·Typesense·OpenSearch·벡터 DB는 실제 검색 지연이나 품질 목표를 PostgreSQL이
  충족하지 못할 때만 추가한다.

## 보안 경계

- 브라우저에는 Supabase publishable key만 허용하며 service role, DB 비밀번호, GitHub PAT를
  넣지 않는다.
- `catalog` 스키마는 `anon`/일반 `authenticated` 역할에 직접 쓰기 권한을 주지 않는다.
- Workers가 JWT 발급자·서명·만료·대상을 검증하고 DB 역할을 다시 조회한다.
- 승인·감사·원본 교체 API는 idempotency key와 append-only audit를 요구한다.
- R2 업로드는 짧은 만료의 제한된 signed URL 또는 Worker streaming을 사용한다.

## 단계적 전환

1. 현재 JS 데이터에서 PostgreSQL staging으로 가져오는 재실행 가능한 importer와 diff report 작성
2. stable ID·관계·출처·미디어 해시를 1:1 검증한 뒤 read-only JSON projection 생성
3. 공개 UI가 projection을 읽도록 전환하고 기존 정적 모듈과 병렬 비교
4. Auth와 관리자 read-only 화면 도입
5. 변경 요청→검토→승인→적용의 한 vertical slice를 제품 표시명과 미디어 순서에 먼저 적용
6. 제품 사양·출처·관계로 편집 범위 확대
7. 공고 수집, 요구조건 추출, 근거 기반 후보 평가를 별도 worker로 추가
8. 검증과 rollback rehearsal 후 GitHub Pages를 비상 snapshot으로만 유지

## 결과

- PostgreSQL은 정형 데이터와 이력, R2는 파일 바이트, GitHub는 코드·migration·검증 snapshot을
  각각 소유한다.
- 현재 공개 UI를 유지하므로 사용자 경험 개선과 데이터 서비스 이행을 분리할 수 있다.
- 공급자가 둘로 늘지만, 인증·관계 데이터는 Supabase에 모으고 대용량 전송은 R2에 두어 역할이
  명확하다.
- 이 ADR은 공급자 계정을 만들거나 운영 비밀을 저장소에 추가하는 권한을 부여하지 않는다.

## 검증

- migration을 빈 DB와 최신 snapshot DB 양쪽에 적용
- current product·stable ID·관계·필드별 근거·미디어 SHA의 source/DB/projection 3자 비교
- 역할별 허용/거부, JWT 위조·만료, 작성자-승인자 분리, 감사 로그 변경 거부 테스트
- R2 업로드 hash/MIME/size, 원본 다운로드 filename, orphan object 검사
- 공고 중복 수집과 문서 버전 hash의 idempotency 테스트
- 공개 카탈로그의 필터·정렬·딥링크·접근성·성능 회귀 테스트

## 재검토 조건

- 공개 검색 p95 또는 facet 갱신 목표를 PostgreSQL projection이 반복적으로 충족하지 못할 때
- R2 요청 비용 또는 관리 복잡도가 Supabase Storage 단일화 비용보다 커질 때
- 규정·조달 보안 요구가 현재 관리형 서비스 지역과 인증 수준을 허용하지 않을 때
- 공개 UI에서 SSR/SEO가 측정 가능한 핵심 요구가 될 때
- 관리자 수와 편집량이 전용 PIM/DAM 도입의 총비용보다 커질 때

## 공식 근거

- [Supabase Database overview](https://supabase.com/docs/guides/database/overview)
- [Supabase Auth architecture](https://supabase.com/docs/guides/auth/architecture)
- [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase GitHub login](https://supabase.com/docs/guides/auth/social-login/auth-github)
- [Supabase pricing](https://supabase.com/pricing)
- [Cloudflare R2 pricing](https://developers.cloudflare.com/r2/pricing/)
- [Cloudflare R2 limits](https://developers.cloudflare.com/r2/platform/limits/)
- [Cloudflare Hyperdrive](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/)
- [Connecting Workers to PostgreSQL](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/)
- [Cloudflare Workers limits](https://developers.cloudflare.com/workers/platform/limits/)
