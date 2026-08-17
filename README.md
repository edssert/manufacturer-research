# Manufacturer // Research (MR)

L-Acoustics, d&b audiotechnik, Meyer Sound의 스피커·앰프·DSP·소프트웨어·
액세서리 사양을 검색하고 관계를 비교하는 정적 웹 앱이다. 브라우저 런타임은
프레임워크 없는 Vanilla JavaScript ES modules이며, 서버나 데이터베이스가
필요하지 않다.

배포 전에는 빌드 단계가 있다. 이 단계는 소스를 번들링·변환·축소하지 않고,
`index.html`의 스크립트 엔트리에서 도달 가능한 모듈과 허용된 정적 자산만
`dist/`에 복사해 검증 가능한 배포 artifact를 만든다.

## 빠른 시작

필요 환경은 Node.js `24.18 이상, 25 미만`과 npm `11.16 이상, 12 미만`이다. CI의 정확한 Node.js 버전은 [`.node-version`](./.node-version)에 고정되어 있다.

```powershell
npm ci
npm run verify
npm run build
npm run preview
```

미리보기 주소는
`http://127.0.0.1:4173/manufacturer-research/`이다. `preview`는 소스가
아니라 `dist/`를 서빙하므로 먼저 `npm run build`를 실행해야 한다.

### 주요 명령

| 명령                        | 역할                                                             |
| --------------------------- | ---------------------------------------------------------------- |
| `npm test`                  | 단위·데이터·관계·감사·보안·UI 테스트 실행                        |
| `npm run lint`              | ESLint 오류 및 경고 검사                                         |
| `npm run format:check`      | 프로젝트 설정과 핵심 소스의 Prettier 형식 검사                   |
| `npm run typecheck`         | JavaScript의 TypeScript `checkJs` 검사                           |
| `npm run test:data`         | 데이터 계약과 출처 거버넌스 검사                                 |
| `npm run test:audit:assets` | 런타임 자산 참조·누락·고아·완전 중복 baseline 검사               |
| `npm run build`             | 결정적 `dist/` artifact 생성 및 즉시 검증                        |
| `npm run verify:dist`       | 기존 `dist/`의 경계·파일·해시·import 그래프 검사                 |
| `npm run verify`            | lint, 형식, 타입, 전체 테스트, 반복 빌드, `dist/` 검증 통합 실행 |

## 구조 요약

```text
index.html                   앱 셸, CSP, CSS/JavaScript 엔트리
config/                      데이터·자산 거버넌스의 기계 판독 설정
docs/                        아키텍처와 사용 안내
raw-data/raw-specs/          제조사 원문 사양의 canonical 아카이브
public/
  assets/                    배포되는 폰트와 가공 이미지
  css/                       토큰·레이아웃·컴포넌트 스타일
  js/
    core/                    라우터, 상태, 검색, 데이터 계약
    domains/                 제품 도메인별 data/schema/view/detail/controller
    relationships/           엔터티·상세 provider·역참조 레지스트리
    ui/                      탭, 필터, 모달, Split View, 관계 이동
  tests/                     Node/jsdom 기반 테스트
scripts/                     빌드·배포 검증·미리보기·자산 도구
dist/                        생성되는 배포 artifact; 직접 편집하지 않음
```

자세한 의존성, 데이터 흐름, URL 계약은
[기술 아키텍처](docs/ARCHITECTURE.md)를, 쉬운 설명은
[구조 안내](docs/ARCHITECTURE_GUIDE.md)를 참고한다.

## 런타임 아키텍처

- `index.html`은 저장된 표시 선호를 적용하는
  `public/js/bootstrap-preferences.js`와 ES module 엔트리
  `public/js/main.js`를 로드한다.
- 각 도메인은 데이터(`data`), 검색·필터 선언(`schema`), 순수 마크업
  생성(`view`), 상세 provider(`detail`), 상태와 수명주기(`controller`)로
  책임을 나눈다.
- 복잡한 도메인 전용 변환은 별도 순수 모듈로 둔다. 앰프 상세의
  `amplifiers.configurations.js`는 configuration 그룹화·변형 병합·대표 행
  정렬·표 렌더링을 맡고 view는 결과만 사용한다.
- `relationships/entity-registry.js`는 ID 조회용 불변 배열 스냅샷을,
  `relationships/cross-ref.js`는 원본 관계에서 지연 생성한 역방향 인덱스를
  관리한다.
- `relationships/detail-registry.js`는 도메인 레코드와 상세 렌더러를 등록한다.
  `ui/relation-navigation.js`는 `#modal`의 단일 이벤트 위임으로 어떤 도메인의
  관계 항목이든 같은 경로로 연다.
- `core/route-codec.js`가 해시 URL을 DOM과 분리해 파싱·직렬화하고,
  `core/router.js`가 탭·상세·Split View 상태를 브라우저 이력과 동기화한다.
- 모달은 dialog 이름, 배경 `inert`, 포커스 트랩·초기 이동·복귀를 관리한다.
  데스크톱 Split View와 모바일 전체 교체 스택도 같은 포커스 수명주기를
  따른다.

## 데이터와 출처

데이터 변경은 구조화 데이터와 근거 문서를 함께 다룬다.

1. 제조사 원문 사양은 `raw-data/raw-specs/` 아래에 보존한다. 원본
   PDF/DOCX가 있으면 Markdown과 같은 제품 폴더에 보관한다.
2. 해당 도메인의 `public/js/domains/<도메인>/data/`에 구조화 데이터를
   반영한다.
3. 확인이 끝나지 않은 레코드는 `pending: true`를 사용한다. `pending`이
   없으면 완료 레코드로 간주하며, 완료 레코드는 canonical 출처가 필요하다.
4. `npm run test:data`와 `npm run verify`를 실행한다.

출처 coverage, 허용된 결손, 비대칭 관계의 현재 기준은
[`config/data-governance.json`](config/data-governance.json)이 단일 참조점이다.
감사는 canonical Markdown의 경로와 파일명만 확인하며 PDF/DOCX 본문을
자동 해석하지 않는다. 수동으로 적은 개수나 과거 결손 목록 대신 이 설정과
`public/tests/provenance-audit.mjs`의 결과를 따른다.

## 이미지와 정적 자산

- 제품 사진 원본 아카이브는 저장소 밖
  `OneDrive/03.Resources/MR-Raw-Assets`에 둔다. 저장소에는 런타임에 쓰는
  가공본만 `public/assets/img/`에 둔다.
- 런타임 이미지는 PNG, JPEG, WebP 등 실제 확장자를 유지한다. 처리 규칙은
  [`config/asset-policy.json`](config/asset-policy.json)과
  [`public/assets/img/README.md`](public/assets/img/README.md)를 따른다.
- `npm run test:audit:assets`는 코드/CSS의 참조와 실제 파일을 대조하고,
  SHA-256으로 완전 중복 baseline을 확인한다. 누락과 고아 파일은 허용하지
  않는다.
- 정규화는 먼저 아래처럼 변경 없는 dry-run manifest를 만든다.

  ```powershell
  python scripts/normalize_images.py dry --manifest image-normalize-plan.json
  ```

- `apply`는 검토한 동일 manifest를 `--approved-manifest`로 전달한 경우에만
  실행된다. 알파 채널이 없거나 전체 프레임이 불투명한 이미지는 자동 적용
  대상이 아니라 수동 검수 대상이다. 완전 중복 파일도 의미 검수 없이 자동
  삭제하지 않으며 Git 이력 재작성은 별도 승인 범위다.

## 빌드와 GitHub Pages

`scripts/build.mjs`는 다음 배포 경계를 강제한다.

- `index.html`, 허용 확장자의 `public/assets/`, `public/css/` 복사
- HTML 스크립트 엔트리에서 정적 import/export 그래프로 도달 가능한
  `public/js/` 파일만 복사
- 외부·bare import, 경계를 벗어난 경로, 누락 파일, 심볼릭 링크,
  비정적 dynamic import 거부
- 파일 경로·크기·SHA-256을 정렬한 `dist/asset-manifest.json` 생성
- 같은 입력을 두 번 빌드했을 때 동일 manifest가 나오는지 테스트

[`CI and Pages`](.github/workflows/ci-pages.yml)는 pull request와 push에서
검증을 실행한다. `main` push가 통과하면 오직 `dist/`만 Pages artifact로
업로드하고 GitHub Pages에 배포한다. 저장소의 Pages 소스 설정도
**GitHub Actions**로 선택되어 있어야 이 워크플로가 실제 배포 경로가 된다.
의존성 업데이트 감시는
[`dependabot.yml`](.github/dependabot.yml)이 npm과 GitHub Actions를 대상으로
수행한다.

## 코드 변경 원칙

- controller만 도메인 상태를 소유하고, view는 입력을 바꾸지 않는 마크업
  함수로 유지한다. schema는 검색·필터·정렬 선언이고 데이터 계약은
  `core/data-contracts.js`에 별도로 둔다.
- 제조사 ID와 표시 메타데이터는 `core/manufacturers.js`를 사용한다.
- 검색 비교는 질의와 대상 모두 `normalizeSearchText()`를 거친다.
- URL 상태는 `core/router.js`와 `core/route-codec.js` API로만 바꾼다.
- 관계 ID 조회와 상세 열기는 레지스트리를 사용한다. controller나 view가
  다른 도메인의 데이터·schema·view를 직접 import하지 않는다.
- UI 재배선은 누적 listener를 만들지 않는다. 영속 루트의 이벤트 위임 또는
  반복 호출에 안전한 배선 함수를 사용한다.
- `dist/`는 생성물이다. 변경은 소스에서 하고 `npm run build`로 다시 만든다.

## 문서 지도

| 문서                                         | 역할                                 |
| -------------------------------------------- | ------------------------------------ |
| [README](README.md)                          | 실행, 규칙, 현재 운영 경계           |
| [기술 아키텍처](docs/ARCHITECTURE.md)        | 모듈·라우팅·빌드·데이터 설계 상세    |
| [쉬운 구조 안내](docs/ARCHITECTURE_GUIDE.md) | 비개발자용 구조와 작업 흐름          |
| [CLAUDE.md](CLAUDE.md)                       | 저장소 작업 시 지켜야 할 핵심 불변식 |
