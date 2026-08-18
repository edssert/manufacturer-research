# Supabase PostgreSQL canonical database

이 디렉터리는 서비스형 Sound Systems Index의 canonical write model을 정의한다.
현재 정적 JavaScript 데이터는 운영 DB가 아니라 migration 입력이자 비교 기준선이다.

## 원칙

- Supabase 관리형 PostgreSQL을 운영 기준으로 하고 PostgreSQL 16 이상 호환 SQL을 유지한다.
- migration은 파일명 순서대로 한 번만 적용하고, 적용된 파일을 수정하지 않는다.
- 내부 참조는 UUID를 사용하되 현재 URL과 데이터의 stable ID는 `stable_key`로 보존한다.
- 원본 파일 바이트는 객체 저장소가 소유하고 DB에는 key, hash, 크기, MIME, 출처와 권리를 저장한다.
- 사실(`assertion`)과 화면용 파생 projection을 분리한다.
- 변경 제안과 승인을 분리하고 감사 로그는 append-only로 유지한다.
- canonical assertion 대상은 명시적 FK 열과 정확히 하나의 대상이라는 CHECK로 제한한다.
  immutable audit와 미적용 change operation의 typed key는 적용 함수가 검증한다.
- `unknown`, `not_applicable`, `not_published`, `verified`를 빈 문자열이나 `false`로 합치지 않는다.
- `catalog`은 브라우저에 직접 노출하지 않으며 관리자 쓰기는 제한된 PostgreSQL RPC만 통과한다.
- 인증은 Supabase Auth, 원본 파일은 Cloudflare R2가 소유한다.

## 설계 초안

1. `0001_catalog_core.sql`: 제품, 속성, 관계, 미디어, 출처, 사용자, 승인, 감사
2. `0002_knowledge_workflows.sql`: 공고, 요구조건, 적용 사례, 기술 지식, 연혁 설계 초안
3. `0003_supabase_auth.sql`: Supabase Auth identity 연결과 공개 PostgREST 역할 차단

이 세 파일은 설계 원본이다. `0002`는 미래 도메인 검토용 초안이며 Phase 1의 적용 대상에서
제외한다.

## 적용 migration과 검증

- 실제 migration history는 `supabase/migrations/`가 소유한다.
- `20260818000100_catalog_core.sql`은 core 설계를 적용한다.
- `20260818000200_supabase_auth.sql`은 Supabase Auth identity 경계를 적용한다.
- `20260818000300_workflow_guards.sql`은 상태 기계, 자기 승인 차단, audit 불변성, RPC,
  UUID evidence junction을 적용한다.
- `npm run db:reset`은 빈 로컬 DB를 재구성한다.
- `npm run db:test:integration`은 pgTAP 음성 테스트와 generated type drift를 검사한다.
- `database/generated/database.types.ts`는 `catalog`과 `api`의 재현 가능한 TypeScript 계약이다.
- GitHub Actions의 `database-tests.yml`은 reset 2회, pgTAP, type drift를 별도 job으로 실행한다.

`npm run test:database`의 정규식 검사는 빠른 설계 계약 검사로 유지하지만 실제 DB 적용을
대신하지 않는다.

운영 DB 자격 증명은 저장소나 브라우저에 넣지 않는다. 실제 공급자 생성, 비밀 등록,
백업·복구 검증과 migration 적용은 별도 인프라 페이즈에서 수행한다.

기술 선정 근거는 [ADR-0008](../docs/adr/0008-supabase-minimum-service-baseline.md), 실제 전환
순서는 [서비스 이행 계획](../docs/SERVICE_DELIVERY_PLAN.md)을 따른다.
