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
- `unknown`, `not_applicable`, `not_published`, `verified`를 빈 문자열이나 `false`로 합치지 않는다.
- `catalog`은 브라우저에 직접 노출하지 않으며 Cloudflare Workers API가 제한된 DB 역할로 접근한다.
- 인증은 Supabase Auth, 원본 파일은 Cloudflare R2가 소유한다.

## migration

1. `0001_catalog_core.sql`: 제품, 속성, 관계, 미디어, 출처, 사용자, 승인, 감사
2. `0002_knowledge_workflows.sql`: 공고, 요구조건, 적용 사례, 기술 지식, 연혁
3. `0003_supabase_auth.sql`: Supabase Auth identity 연결과 공개 PostgREST 역할 차단

## 적용 예시

```powershell
psql $env:DATABASE_URL -v ON_ERROR_STOP=1 -f database/migrations/0001_catalog_core.sql
psql $env:DATABASE_URL -v ON_ERROR_STOP=1 -f database/migrations/0002_knowledge_workflows.sql
psql $env:DATABASE_URL -v ON_ERROR_STOP=1 -f database/migrations/0003_supabase_auth.sql
npm run test:database
```

운영 DB 자격 증명은 저장소나 브라우저에 넣지 않는다. 실제 공급자 생성, 비밀 등록,
백업·복구 검증과 migration 적용은 별도 인프라 페이즈에서 수행한다.

기술 선정 근거와 전환 순서는 [ADR-0007](../docs/adr/0007-service-technology-stack.md)을 따른다.
