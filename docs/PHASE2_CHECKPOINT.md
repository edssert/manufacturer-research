# Phase 2 재개 체크포인트

기준일은 2026-08-18이다. 이 문서는 작업 중단 후 동일한 검증 지점에서 안전하게 재개하기
위한 실행 기록이며 Phase 2 완료 선언이 아니다.

## 현재 통과한 범위

- 대표군: L-Acoustics K Series 8제품
- legacy source: `public/js/domains/speakers/data/la/k-series.data.js`
- canonical write: 로컬 Supabase PostgreSQL `catalog` schema
- round trip: legacy JS → typed canonical rows → legacy-compatible JSON
- 수량: product 8, attribute/assertion 179, accessory relation 16, media placement 33
- importer를 연속 두 번 실행한 뒤 import 결과와 projection이 동일하다.
- projection 8개 레코드가 legacy JS와 deep equality를 만족한다.
- importer 실행 전후 legacy source SHA-256이 같다.
- 33개 media는 source manifest, runtime manifest, public 파일의 SHA-256이 같다.

추가 migration `20260818000400_vertical_slice_support.sql`은 제품 display order, original media와
정적 delivery path 분리, import source/evidence hash와 결과 기록을 추가한다.

## 아직 남은 Exit gate

- DB projection을 별도 버전형 JSON artifact로 빌드에 포함한다.
- 현재 JS reader와 projection reader를 같은 브라우저 시나리오로 비교한다.
- 카드·상세·필터·딥링크 결과와 console/network 오류가 동일한지 확인한다.
- rollback artifact를 만들고 reader cutover 없이 되돌릴 수 있음을 확인한다.
- 위 결과가 모두 통과한 뒤에만 Phase 2를 완료로 바꾼다.

## 8월 21일 재개 순서

PowerShell에서 Docker Desktop을 먼저 실행한 뒤 다음 순서를 지킨다.

```powershell
$env:Path = 'C:\Users\User\AppData\Local\Programs\DockerDesktop\resources\bin;' + $env:Path
npm.cmd ci
npm.cmd run db:start
npm.cmd run db:reset
npm.cmd run catalog:k-series:verify
npm.cmd run db:types:check
npm.cmd run verify
```

첫 구현 작업은 `project-k-series-slice.mjs` 결과를 시간값이 없는 deterministic version artifact로
생성하는 것이다. 그 다음 현재 K Series import를 직접 읽는 임시 reader를 별도 feature flag로
연결하고 Playwright 또는 기존 jsdom 시나리오로 legacy reader와 비교한다. 전체 카탈로그 이관,
관리자 UI, hosted Supabase 계정 생성은 이 gate 전에 시작하지 않는다.

## 재개 시 주의

- `CATALOG_DATABASE_URL`은 hosted 환경에서만 사용하며 저장소에 자격 증명을 넣지 않는다.
- `--local`은 Supabase CLI의 고정 로컬 주소만 사용한다.
- 기존 JS와 raw evidence는 importer 입력이므로 수정하지 않는다.
- raw/public 이미지 삭제나 전체 제품군 전환을 이 체크포인트 작업과 섞지 않는다.
- Phase 2 구현은 `product-data-system`의 migration playbook과 provenance 경계를 계속 따른다.
