# 릴리스 체크리스트

`main`에 반영해 GitHub Pages로 배포하기 전에 확인하는 순서다. 각 검사가 무엇을
지키는지는 [품질 게이트](quality-gates.md)에 있다.

## 1. 작업 트리 정리

- [ ] `git status`로 의도하지 않은 변경이 남아 있지 않은지 확인한다
- [ ] 임시 수집기와 추출 중간 파일, 검수용 생성물이 저장소에 없다
- [ ] `dist/`를 직접 편집하지 않았다 ([ADR-0001](adr/0001-static-deployment-boundary.md))
- [ ] 원본 아카이브와 검토된 중복 파일을 승인 없이 지우지 않았다
- [ ] 여러 작업으로 나눠 진행했다면 공용 레지스트리·정책·거버넌스 수치를 통합했다

## 2. 환경 확인

- [ ] Node·npm 버전이 [`package.json`](../package.json)의 `engines`와
      [`.node-version`](../.node-version)에 맞는다
- [ ] 의존성이 최신 lock 기준이다

```powershell
npm ci
```

## 3. 데이터와 출처

데이터·원문·이미지가 바뀐 릴리스에서만 해당한다.

- [ ] 완료 레코드마다 canonical 근거가 있고 미완료 레코드는 `pending: true`다
- [ ] 추정값으로 채운 필드가 없다
- [ ] 새 원본이 source manifest에 등록되어 있다 ([원문 수집 SOP](sop/source-intake.md))
- [ ] 시리즈·제품 표시 순서 근거가 갱신되어 있다 ([ADR-0005](adr/0005-official-series-order.md))

```powershell
npm run test:data
npm run sources:speakers
```

## 4. 이미지

런타임 이미지가 바뀐 릴리스에서만 해당한다.

- [ ] [런타임 미디어 SOP](sop/runtime-media.md)의 dry-run → apply → verify를 거쳤다
- [ ] 대표 이미지 예외가 `config/runtime-media-overrides.json`에 기록되어 있다
      ([ADR-0004](adr/0004-runtime-image-content-policy.md))
- [ ] [육안 검수 SOP](sop/visual-review.md)를 수행했다

```powershell
npm run media:runtime:verify
npm run test:audit:assets
```

## 5. 전체 검증

- [ ] 전체 파이프라인이 통과한다

```powershell
npm run verify
```

## 6. 배포 산출물 확인

- [ ] 빌드가 성공하고 `dist/`가 재생성된다
- [ ] 미리보기에서 배포 산출물이 정상 동작한다

```powershell
npm run build
npm run preview
```

주소는 `http://127.0.0.1:4173/manufacturer-research/`다. `preview`는 소스가 아니라
`dist/`를 서빙한다.

## 7. 브라우저 검수

- [ ] [브라우저 검수 SOP](sop/browser-review.md)를 데스크톱과 모바일 폭에서 수행했다
- [ ] 콘솔 오류·CSP 위반·404 자산·외부 요청이 없다
- [ ] 키보드 조작과 딥링크 복원이 정상이다

## 8. 커밋과 푸시

- [ ] 의도한 파일만 스테이징했다
- [ ] 원본 아카이브가 Git LFS 포인터로 staged 되었다
- [ ] staged diff를 직접 확인했다
- [ ] Git 이력을 승인 없이 재작성하지 않았다

필수 검사가 모두 통과한 뒤 커밋하고 푸시한다.

## 9. CI와 배포 확인

- [ ] [CI and Pages](../.github/workflows/ci-pages.yml) 워크플로의 verify job이 통과했다
- [ ] [Security](../.github/workflows/security.yml) 워크플로에 새 실패가 없다
- [ ] `main` push의 deploy job이 성공했다
- [ ] 저장소의 Pages source 설정이 **GitHub Actions**로 유지되고 있다
- [ ] 배포된 사이트에서 첫 화면과 상세 모달이 정상 동작한다

## 문서 동기화

릴리스에 다음 변경이 포함되면 관련 문서를 같은 범위에서 갱신한다.

| 변경                          | 갱신 대상                                                                 |
| ----------------------------- | ------------------------------------------------------------------------- |
| 되돌리기 어려운 구조적 결정   | 새 [ADR](adr/) 추가                                                       |
| 작업 절차 변경                | 해당 [SOP](sop/)                                                          |
| 검증 명령 추가·변경           | [`package.json`](../package.json) 먼저, 필요하면 [품질 게이트](quality-gates.md) |
| 모듈 경계·라우팅·빌드 변경    | [기술 아키텍처](ARCHITECTURE.md)                                          |
| 시각·상호작용 계약 변경       | [`DESIGN.md`](../DESIGN.md)                                               |

개수·결손 목록 같은 변동 수치는 문서에 적지 않는다
([ADR-0003](adr/0003-baseline-json-source-of-truth.md)).
