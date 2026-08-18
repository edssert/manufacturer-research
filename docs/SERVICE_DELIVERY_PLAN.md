# 서비스 이행·검증 계획

목표는 파일을 많이 만드는 것이 아니라 현재 70 수준의 설계 신뢰도를 실행 증거로 90
이상까지 높이는 것이다. 각 phase는 이전 phase의 exit gate를 통과해야 시작한다.

## 1. 진행 원칙

- 현재 정적 앱은 비교 기준선이자 rollback 수단이다.
- migration과 importer는 재실행 가능하고 입력을 수정하지 않는다.
- 한 제품군 vertical slice가 통과하기 전 전체 카탈로그를 전환하지 않는다.
- 외부 계정 생성과 비용 발생은 로컬 gate 통과 후 별도 승인한다.
- 설계 판단과 실측 결과가 다르면 ADR을 갱신한 뒤 구현을 바꾼다.

## 2. Phase와 신뢰도

| Phase | 목표 | 주요 산출물 | Exit gate | 예상 신뢰도 |
| --- | --- | --- | --- | ---: |
| 0 | 설계 기준선 | ADR-0008, 설계도, 보안·이행 계획 | 문서 링크·상충 0, 독립 검수 | 75 |
| 1 | 실제 migration | Supabase CLI local stack, DB 상태 기계 | `db reset` 성공, 권한·승인 음성 테스트 | 80 |
| 2 | 무손실 vertical slice | importer, projection, diff report | 대표 제품군 3자 diff 0 | 85 |
| 3 | 실행 환경 측정 | extraction benchmark, R2 mock/fixture | 최대 표본 처리·복구·resource 기록 | 87 |
| 4 | 관리자 UI 결정 | Payload vs 자체 UI 1일 spike | 5개 task 비교와 새 ADR | 89 |
| 5 | hosted staging | Auth, R2, RPC, backup restore | 한국 p95·보안·비용·복구 통과 | 92 |
| 6 | pilot 운영 | 실제 관리자와 제한 제품군 | 한 달 오류·비용·생산성 목표 | 95 |

### 현재 진행 상태 — 2026-08-18

| Phase | 상태 | 실행 증거 |
| --- | --- | --- |
| 0 | 완료 | 문서 상충 0, 독립 재검수 PASS, 전체 저장소 verify 통과 |
| 1 | 로컬 완료·CI 대기 | Supabase CLI 2.114.0, PostgreSQL 17 local reset 반복 성공, pgTAP 20개 통과, generated type hash 재현 |
| 2 | 다음 | 대표 제품군 importer·projection vertical slice |
| 3–6 | 대기 | 앞 phase exit gate 이후 시작 |

## 3. Phase 0 — 설계도서

### 작업

- ADR-0007을 대체하고 초기 포함·제외·측정 후 도입을 구분한다.
- 현재와 목표 아키텍처, 데이터·미디어·문서 흐름을 연결한다.
- 자기 승인·감사·R2 업로드 위협과 테스트를 정의한다.
- DB 초안이 설계보다 앞서 확정되지 않도록 적용 상태를 명시한다.

### Exit gate

- 문서가 현재 구현과 미래 계획을 혼동하지 않는다.
- 모든 미래 기능은 owner, input, output, canonical 여부가 정해져 있다.
- Fable 5와 SOL의 독립 검수에서 P0 설계 상충이 0이다.

## 4. Phase 1 — Supabase 로컬 기준선

### 작업

1. Supabase CLI와 local stack을 재현 가능한 개발 도구로 고정한다.
2. 적용할 core migration을 `supabase/migrations/` 규약으로 옮긴다.
3. 조달·사례·기술 초안 migration은 적용 대상에서 분리한다.
4. author≠reviewer, 상태 전이, audit 불변성, 직접 접근 차단을 DB에 구현한다.
5. UUID 배열 근거를 FK 정션 테이블로 교체하고 polymorphic 참조 정책을 결정한다.
6. CI에서 local stack을 초기화하고 migration·음성 SQL 테스트를 실행한다.

### Exit gate

- 빈 DB `db reset`과 두 번째 reset이 모두 성공한다.
- 자기 승인, 불법 전이, audit UPDATE/DELETE/TRUNCATE가 실패한다.
- `anon`, `authenticated`, `service_role`의 canonical 직접 쓰기가 실패한다.
- 같은 idempotency key 재시도가 중복 변경을 만들지 않고 같은 결과를 반환한다.
- migration history와 generated TypeScript type이 재현된다.

## 5. Phase 2 — 대표 vertical slice

대표군은 variant, 관계, 복수 media, field-level evidence를 모두 가진 하나의 스피커 제품군으로
선택한다.

### 비교 항목

- stable ID와 slug
- family/group/variant axes
- typed attributes와 null semantics
- relation 방향·역관계
- source document·locator·assertion
- original media hash·placement·download filename
- 카드·상세·필터·딥링크 projection

### Exit gate

- source JS → canonical DB → JSON projection의 항목·관계·해시 diff가 0이다.
- importer를 두 번 실행해도 결과가 같다.
- 원본 source 파일과 raw evidence의 hash가 바뀌지 않는다.
- 현재 앱과 projection 앱의 브라우저 회귀가 같다.

## 6. Phase 3 — extraction runner benchmark

작은 문서만 성공시키지 않고 보유한 최대 PDF, 최대 ZIP, 스캔 PDF, 복잡한 표 문서를 표본으로
선택한다.

### 기록

- 입력 hash·bytes·pages·archive entries
- tool·model·parser version
- wall time, peak RSS, CPU, disk, network
- page·section·table·quote locator 품질
- timeout·retry·resume·poison job 처리
- 같은 입력의 결정성

runner 공급자는 이 결과로 필요한 memory·duration·disk를 만족하는 후보만 비교한다.

## 7. Phase 4 — 관리자 UI spike

Payload와 자체 React·TypeScript UI가 ADR-0008의 동일한 다섯 작업을 수행한다. 하루가 끝나면
기능 수가 아니라 실제 task completion과 canonical 우회 여부로 결정한다.

### 판정

- task 1 또는 2가 canonical schema 복제·이전을 요구하면 해당 후보 탈락
- 두 후보가 모두 통과하면 구현 시간 30%, 유지보수·우회 30%, 관리자 작업 시간 25%,
  export·종속성 15%로 비교
- 결과를 새 ADR로 기록하고 패배 후보 spike를 제품 코드에 남기지 않는다.

## 8. Phase 5 — hosted staging

### 사전 결정

- 리전, 환경 분리, 관리자 allowlist, 2FA
- R2 custom domain·CORS·credential scope
- 월 예산 상한과 알림
- pilot RPO 24시간·RTO 4시간의 수용 여부

### Exit gate

- 한국 네트워크에서 Auth·RPC·서명 발급 p95 500ms 이하 또는 합의한 대체 목표
- 두 관리자 계정의 작성→승인→projection 전체 흐름 성공
- R2 원본 다운로드 hash와 download filename 일치
- DB backup restore와 projection rollback rehearsal 성공
- 비밀 스캔·권한 거부·rate-limit 테스트 통과
- Phase 6에서 사용할 편집 시간·오류율·projection 지연·월 비용의 수치 목표 확정

## 9. Phase 6 — pilot과 확장

한 제품군과 제한된 관리자부터 운영한다. 한 달 동안 편집 시간, 실패율, projection 지연,
스토리지·operation 비용을 기록한다. 목표를 통과한 뒤에만 전체 제품, 조달 공고, 적용 사례,
기술·연혁 순서로 확장한다.

## 10. 중단·재설계 조건

- importer가 stable ID·관계·media를 무손실로 표현하지 못함
- 승인 우회가 DB 권한만으로 가능함
- Payload와 자체 UI 모두 field-level evidence 작업을 실용적으로 지원하지 못함
- hosted latency·비용·지역·보안 요구가 수용 기준을 넘음
- extraction 표본이 선택 가능한 runner 한계를 넘음

중단은 실패가 아니라 더 비싼 전환 전에 잘못된 가정을 제거한 결과다.
