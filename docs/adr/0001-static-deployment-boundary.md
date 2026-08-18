# ADR-0001: 정적 배포 경계

- **상태**: 채택
- **날짜**: 2026-08-18
- **관련**: [ADR-0002](0002-source-and-runtime-layers.md), [품질 게이트](../quality-gates.md), [릴리스 체크리스트](../release-checklist.md)

## 맥락

이 저장소는 배포 대상인 브라우저 코드와, 배포하면 안 되는 자료를 같은 작업
트리에 함께 둔다.

- 배포 대상: `index.html`, `public/css/`, `public/assets/`, `public/js/`에서
  실제로 도달 가능한 모듈
- 비배포 대상: `raw-data/`(제조사 원문·원본 미디어 아카이브), `public/tests/`,
  `config/`, `scripts/`, `docs/`, `upload/`(레거시 staging), 패키지 파일

저장소 루트를 그대로 GitHub Pages에 노출하면 제조사 원문 아카이브와 개발
설정이 함께 공개된다. 반대로 배포 파일을 손으로 고르면 참조가 끊긴 자산이나
고아 모듈이 조용히 섞인다. 런타임은 프레임워크 없는 Vanilla ES modules이므로
브라우저가 읽는 상대 import 구조 자체가 배포 경계의 근거가 될 수 있다.

## 결정

배포 산출물은 오직 `scripts/build.mjs`가 만든 루트 `dist/`뿐이다. 빌드는
번들러가 아니며 소스를 합치거나 변환·축소하지 않는다.

복사 계획은 다음으로 한정한다.

1. `index.html`
2. `public/assets/` 중 [`config/asset-policy.json`](../../config/asset-policy.json)의
   허용 확장자에 해당하는 파일
3. `public/css/`
4. `index.html`의 로컬 script 엔트리에서 정적 import/export 그래프로 도달하는
   `public/js/` 파일

빌드와 [`scripts/verify-dist.mjs`](../../scripts/verify-dist.mjs)는 다음을 거부한다.

- 외부 URL import, bare specifier, 경계를 벗어난 상대 경로, 누락 파일
- 심볼릭 링크, 문자열 결합으로 만든 dynamic import, 인라인 script 본문
- `dist/` 안의 `docs`, `node_modules`, `raw-data`, `tests`, `upload` 경로 세그먼트와
  `package.json`/`package-lock.json`

빌드는 `dist/`를 통째로 교체하고, artifact 경로 순으로 크기와 SHA-256을 기록한
`dist/asset-manifest.json`을 만든다. `public/assets/img/README.md`처럼 소스에만
필요한 파일은 명시적으로 제외한다.

CI는 [`.github/workflows/ci-pages.yml`](../../.github/workflows/ci-pages.yml)에서
모든 pull request와 push에 `npm ci → npm run verify → npm run build`를 실행하고,
`main` push가 통과했을 때만 `dist/`를 Pages artifact로 업로드해 배포한다.

## 검토한 대안

| 대안                                     | 채택하지 않은 이유                                                                       |
| ---------------------------------------- | ---------------------------------------------------------------------------------------- |
| 저장소 루트를 Pages 소스로 직접 공개     | 원문 아카이브·테스트·개발 설정이 함께 공개된다. 배포 경계를 검증할 방법이 없다.           |
| `.gitignore`/`.nojekyll`과 제외 규칙만 사용 | 제외는 선언일 뿐 실제 산출물을 검증하지 않는다. 새 디렉터리가 생기면 조용히 새어 나간다. |
| 번들러(Vite, esbuild 등) 도입            | 런타임 의존성이 없는 프로젝트에 빌드 도구 의존성과 소스 맵 문제를 추가한다. 브라우저가 읽는 구조와 배포 구조가 달라져 디버깅 경계가 흐려진다. |
| 배포 파일 목록을 수동 관리               | 모듈이 늘어날수록 목록이 코드보다 먼저 낡는다. 도달 불가능한 파일을 걸러내지 못한다.      |

## 결과

- `dist/`는 생성물이므로 사람이 직접 편집하지 않는다. 변경은 소스에서 하고 다시
  빌드한다.
- 테스트에서만 도달하는 모듈(`public/js/core/data-contracts.js` 등)은 소스에
  존재하지만 `dist/`에는 포함되지 않는다. 정상 동작이다.
- 새 모듈은 import 그래프에 실제로 연결되어야 배포된다. 연결 없이 파일만 추가하면
  빌드에서 제외되고, 반대로 참조만 남으면 빌드가 실패한다.
- dynamic import는 정적 문자열 형태만 사용할 수 있다.
- 같은 입력을 두 번 빌드하면 같은 manifest가 나와야 하므로, 빌드 과정에 시각·난수
  같은 비결정 요소를 넣을 수 없다.

## 검증

| 명령                  | 확인 대상                                              |
| --------------------- | ------------------------------------------------------ |
| `npm run build`       | 복사 계획 실행 후 즉시 `dist/` 검증                    |
| `npm run test:build`  | 그래프 거부 사례 fixture와 반복 빌드 manifest 결정성    |
| `npm run verify:dist` | 기존 `dist/`의 경계·파일·해시·import 그래프 일치       |
| `npm run verify`      | 위 검사를 포함한 전체 파이프라인                       |

세부 순서는 [품질 게이트](../quality-gates.md)를 따른다.

## 재검토 조건

- 런타임이 외부 패키지나 CDN을 요구하게 될 때
- 코드 분할·번들·트랜스파일이 실제로 필요해질 때
- GitHub Pages 외의 호스팅으로 옮기거나 `dist/` 외의 artifact를 추가로 배포할 때
- 저장소의 Pages source 설정이 **GitHub Actions**에서 바뀔 때
