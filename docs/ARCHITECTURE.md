# 기술 아키텍처

이 문서는 현재 코드의 런타임, 데이터, 빌드, 배포 경계를 설명한다. 실행과
작업 규칙은 [루트 README](../README.md), 비개발자용 설명은
[쉬운 구조 안내](ARCHITECTURE_GUIDE.md)를 참고한다.

## 1. 시스템 경계

Manufacturer Research는 정적 단일 페이지 앱이다.

- 브라우저 런타임: Vanilla JavaScript ES modules, HTML, CSS
- 서버 측 런타임·API·데이터베이스: 없음
- 런타임 외부 패키지와 CDN: 없음
- 개발 도구: Node.js, npm, ESLint, Prettier, TypeScript `checkJs`, jsdom
- 배포 대상: 검증을 거쳐 생성한 `dist/`

`npm run build`는 번들러가 아니다. JavaScript를 합치거나 변환·축소하지
않고, 브라우저가 읽는 상대 import 구조를 그대로 보존한다. 빌드의 역할은
도달 가능한 런타임 파일을 선택하고 배포 경계를 검증하며, 재현 가능한
artifact를 만드는 것이다.

## 2. 소스와 배포 디렉터리

```text
index.html
config/
  asset-policy.json          런타임 자산과 중복 baseline
  data-governance.json       출처 coverage와 허용된 데이터 공백
docs/
raw-data/
  raw-specs/                 canonical 원문 사양
public/
  assets/
    fonts/
    img/
  css/
    tokens.css
    fonts.css
    base.css
    layout.css
    nav.css
    components/
  js/
    bootstrap-preferences.js 초기 표시 선호 적용용 classic script
    main.js                  ES module 진입점과 의존성 조립
    core/
    domains/
    relationships/
    ui/
  tests/
scripts/
  audit-assets.mjs
  build.mjs
  build.test.mjs
  serve.mjs
  serve.test.mjs
  verify-dist.mjs
  normalize_images.py
  montage_check.py
dist/                        빌드 생성물
```

경계는 다음과 같다.

- `raw-data/raw-specs/`는 출처 보관 영역이며 브라우저와 배포 artifact에
  포함되지 않는다.
- `public/tests/`, `docs/`, `config/`, 개발 스크립트와 package 파일도
  배포하지 않는다.
- `public/js/core/data-contracts.js`처럼 테스트에서만 도달 가능한 모듈은
  소스에는 존재하지만 `dist/`에는 포함되지 않는다.
- `dist/`는 `scripts/build.mjs`만 생성하며 사람이 직접 수정하지 않는다.

## 3. 브라우저 부팅

`index.html`은 두 JavaScript 엔트리를 가진다.

1. `bootstrap-preferences.js`가 저장된 테마·사진 표시 선호를 CSS 로드 전에
   적용해 초기 깜빡임을 줄인다.
2. `main.js`가 모달, 관계 이동, 도메인, 내비게이션, 토글, 라우터를
   초기화한다.

`main.js`는 구현 세부를 소유하지 않고 의존성을 조립한다.

```text
initModal + initRelationNavigation
  → router callback 연결
  → 각 domain controller 초기화
  → nav와 표시 토글 렌더/배선
  → hash router 시작
  → sticky header 시작
```

`core/router.js`가 `ui/modal.js`나 `ui/split-view.js`를 직접 import하지 않도록
`main.js`가 `onItemClose`, `onPane2Restore`, `onPane2Close` 콜백을 연결한다.
이 의존성 역전은 core와 DOM UI 사이의 순환 import를 막는다.

`index.html`의 CSP는 스크립트·폰트·이미지를 자기 출처로 제한하고 연결,
폼 전송, object, worker, base URI를 막는다. JavaScript가 제조사 색상 등
인라인 style 속성을 설정하므로 `style-src`에는 현재 `'unsafe-inline'`이
포함된다. 실행 JavaScript 자체에는 인라인 허용이 없다.

## 4. 모듈 책임

### 4.1 core

| 모듈                     | 책임                                                    |
| ------------------------ | ------------------------------------------------------- |
| `core/router.js`         | 도메인 등록, 활성 탭, 상세/Split View URL과 이력 동기화 |
| `core/route-codec.js`    | 해시와 pane 상태의 DOM 없는 파싱·직렬화·검증            |
| `core/state.js`          | 도메인 목록 화면의 질의·칩·범위·정렬 상태               |
| `core/filter-engine.js`  | 정규화 검색, 필터 판정, 정렬                            |
| `core/dom.js`            | DOM 선택, escape, debounce 등 범용 유틸리티             |
| `core/manufacturers.js`  | 제조사 ID·이름·색상·순서의 단일 원본                    |
| `core/data-contracts.js` | 테스트용 도메인 레코드 최소 계약                        |

`data-contracts.js`는 UI 필터 선언인 `*.schema.js`와 별개다. schema는
“어떻게 찾고 정렬할지”를, 데이터 계약은 “레코드가 어떤 최소 구조를
가져야 하는지”를 검증한다.

### 4.2 domains

일반적인 제품 도메인은 다음 책임으로 나뉜다.

```text
domains/<domain>/
  <domain>.data.js           시리즈/제조사 데이터 barrel
  data/*.data.js             실제 레코드
  <domain>.schema.js         검색·필터·정렬 선언과 순수 파생 함수
  <domain>.view.js           카드·상세 HTML 생성 함수
  <domain>.detail.js         관계 인덱스 및 상세 provider 등록
  <domain>.controller.js     목록 상태, mount/unmount, route 등록
  <domain>.<feature>.js      복잡한 도메인 전용 순수 변환·렌더링(필요할 때)
```

Brand처럼 관계 상세 이동이 필요하지 않은 특수 도메인은 `detail.js`가 없을 수
있다. 공통 원칙은 다음과 같다.

- controller만 목록 화면 상태와 수명주기를 소유한다.
- view는 입력 레코드를 수정하지 않는 마크업 함수다.
- schema는 선언과 순수 파생만 담당한다.
- 다른 도메인의 data/schema/view를 controller나 view에서 직접 import하지
  않는다. 교차 도메인 조회는 relationships 계층을 통한다.
- 원본 배열에 UI 파생 값을 써넣지 않는다. 스피커는
  `createSpeakerCatalog()`가 동결된 런타임 모델을 만들고, 앰프의 매칭 개수는
  `withDerivedSpeakerCount()`가 조회 함수를 통해 계산한다.

앰프 상세의 Configuration 표는
`domains/amplifiers/amplifiers.configurations.js`에 분리되어 있다. 이 순수
모듈은 관계 인덱스가 반환한 행을 스피커별로 그룹화하고, 설정 signature가
같은 지원 대상 변형 모델만 병합하고, `Max/amp`가 큰 행을 대표로 정렬한 뒤
HTML을 만든다. `amplifiers.view.js`는 이 결과를 호출할 뿐 그룹화 규칙을
소유하지 않는다. 출력은 관계 이동용 `data-speaker-id`와 접기/펼치기용
`data-toggle-group`/`data-toggle-member` 계약을 유지한다.
`amplifier-configurations.test.mjs`가 변형 병합·대표 행·escape·DOM 훅과 입력
불변성을 검증한다.

목록형 도메인은 `ui/domain-tab.js`의 `createDomainTab()`에 data, schema,
카드 렌더러, 상세 열기 함수를 전달한다. mount 시 필터 UI를 한 번 만들고,
상태 변경 시 filter → sort → group → card HTML 순으로 그리드를 갱신한다.

### 4.3 relationships

관계 계층은 ID 조회와 상세 렌더링을 분리한다.

`EntityRegistry`는 다음 계약을 가진다.

- 배열을 복사하고 동결한 등록 순서 스냅샷
- ID 중복과 잘못된 레코드를 등록 전에 검증
- `Map`을 사용한 상수 시간 ID 조회
- 재등록 시 revision 증가

`cross-ref.js`는 speaker, amplifier, accessory 레지스트리를 조립하고 원본
관계에서 필요한 역방향 인덱스를 지연 생성한다. 예를 들어 스피커의
`amps[]`가 스피커→앰프 관계의 원본이고, 앰프→스피커 목록과 configuration
행은 그 원본을 투영한다. 등록 데이터가 바뀌면 파생 인덱스를 무효화한다.

`DetailRegistry`는 도메인별 provider를 등록한다.

```js
{
  kind,
  attribute, // 예: data-speaker-id
  records,
  label,
  render,
}
```

kind, `data-*` attribute, 모든 엔터티 ID는 전역에서 겹칠 수 없다. `render`는
`{ color, head, body }`를 반환하고 레지스트리가 공통 pane 계약으로
정규화한다.

`ui/relation-navigation.js`는 영속적인 `#modal`에 클릭 listener를 한 번만
등록한다. 현재 DOM의 가장 가까운 등록 `data-*` 훅을 찾고 상세 레지스트리로
해석하므로, pane 내용이 교체돼도 도메인별 재배선이 필요 없다. 관계 표는 행의
`data-*`로 빈 영역 마우스 클릭을 유지하되, 키보드 진입점은 모델명 native
button으로 분리한다. 펼치기 `+N`은 관계 button의 sibling이라 인터랙티브
요소가 중첩되지 않는다.

### 4.4 ui

| 모듈                        | 책임                                            |
| --------------------------- | ----------------------------------------------- |
| `ui/domain-tab.js`          | 목록형 도메인의 mount/build/reset/render 골격   |
| `ui/card-grid.js`           | 필터·정렬·그룹·카드 그리드 렌더링               |
| `ui/filters.js`             | 칩·범위·정렬 UI와 접힌 패널 접근성 상태         |
| `ui/modal.js`               | dialog 수명주기, 포커스, 배경 잠금, 모바일 스택 |
| `ui/split-view.js`          | 데스크톱 pane 비교, pane 교체, 이미지 확대      |
| `ui/pane-interactions.js`   | pane 안 보기·단위·섹션·미디어 상호작용          |
| `ui/relation-navigation.js` | 등록된 관계 항목의 공통 상세 이동               |
| `ui/nav.js`                 | ARIA tablist와 상단 도구 렌더링                 |

반복 렌더되는 노드는 `onclick` 같은 교체 가능한 핸들러 또는 영속 루트 이벤트
위임을 사용한다. 반복 호출 때 `addEventListener`가 누적되지 않게 하는 것이
수명주기 계약이다.

## 5. 데이터 흐름

목록과 상세의 주요 흐름은 다음과 같다.

```text
domain data
  → detail 초기화: entity/cross-ref/detail provider 등록
  → controller: router domain 등록
  → mount: schema로 필터 구성
  → filter-engine 판정·정렬
  → card-grid + view 카드 HTML

카드 선택
  → openDetailModal(id, expectedKind)
  → DetailRegistry.resolve(id)
  → openModalWith(...)
  → pane interactions 배선
  → setItemRoute(id)

관계 행 선택
  → #modal 단일 이벤트 위임
  → DetailRegistry.resolve(id)
  → 데스크톱: pane2 열기/교체
     모바일: 전체 상세 교체 + 내부 뒤로가기 스택
  → pane2 또는 pane1 URL 갱신
```

검색은 질의와 대상 양쪽에 `normalizeSearchText()`를 적용한다. 소문자화,
NFKC 정규화와 구분 문자 제거로 `KS 28`, `ks-28`, `KS28` 같은 표현을 같은
값으로 비교한다. 검색 입력은 상태를 즉시 갱신하되 렌더는 debounce한다.

## 6. URL과 브라우저 이력

라우트는 최대 3단 해시다.

| 예시                                           | 화면 상태                     |
| ---------------------------------------------- | ----------------------------- |
| `#speakers`                                    | Speaker 탭                    |
| `#speakers/spk-la-k2`                          | K2 상세 모달                  |
| `#speakers/spk-la-k2/amp-la-la12x`             | K2와 LA12X 상세 Split View    |
| `#speakers/spk-la-k2/media~horizontal`         | K2 이미지 pane                |
| `#speakers/spk-la-k2/amp-la-la12x~media~front` | LA12X 관계 pane의 이미지 확대 |

`route-codec.js`는 각 해시 segment를 URI 인코딩하고, 잘못된 percent encoding,
3단 초과, item 없는 pane 상태를 유효하지 않은 라우트로 반환한다. 라우터는
유효한 도메인이 남아 있으면 그 도메인 루트로 안전하게 정리한다.

- item을 처음 열 때는 `location.hash`로 이력 entry를 추가한다. 브라우저
  뒤로가기는 모달 닫기로 동작한다.
- pane2 변경과 Split View의 pane1 교체는 `history.replaceState`를 사용한다.
  비교 중 여러 번 바꿔도 이력을 늘리지 않고 공유 URL만 최신 상태로 만든다.
- X, Escape, 배경 클릭으로 닫을 때도 `replaceState`로 item/pane 상태를
  제거한다.
- 딥링크 복원 시 item은 도메인의 `openItem`을 먼저 사용하고, Split View에서
  pane1이 다른 도메인으로 교체된 URL은 다른 등록 도메인까지 조회한다.
- 관계 엔터티 pane은 `DetailRegistry`에서 직접 복원한다. media 상태는
  구조화한 pane spec을 바탕으로 실제 보기 전환·미디어 UI 훅을 사용한다.
  유효하지 않거나 등록되지 않은 ID는 URL에서 제거한다.

URL에는 현재 보이는 pane 상태만 기록된다. 모바일 내부 뒤로가기 스택은 각
화면의 pane spec도 함께 보관해 pop할 때 URL과 DOM을 같이 복원하지만, 스택과
이미지 pane 뒤에 잠시 보관한 DOM 자체를 별도 URL 이력으로 추가하지는 않는다.

## 7. 모달, Split View, 접근성

모달은 열린 동안 다음 상태를 함께 바꾼다.

- 오버레이에 `role="dialog"`, `aria-modal="true"`, pane1 제목 기반
  `aria-labelledby` 부여
- 앱의 나머지 body 자식에 `inert`와 `aria-hidden` 적용
- `html`과 `body` 배경 스크롤 잠금
- 새 영역 제목으로 초기 포커스 이동
- Tab/Shift+Tab 포커스 트랩
- 닫을 때 원래 카드나 활성 탭으로 포커스 복귀

860px 초과에서는 `split-view.js`가 두 pane을 나란히 관리한다. 관계 행에서
pane2를 열면 새 pane 제목으로 포커스가 이동하고, pane2를 닫으면 열었던
관계 항목으로 돌아간다. Escape와 배경 클릭은 이미지 확대 pane(뒤에 보관한
관계 pane이 있으면 먼저 복원) → 관계 pane2 → 전체 모달 순으로 한 단계씩
닫는다.

860px 이하에서는 관계 상세를 모달 전체 내용으로 교체하고 내부 스택에 이전
HTML, 색상, mount callback, pane spec, 포커스 토큰을 저장한다. 뒤로가기는
이전 내용을 다시 배선하고 가능한 같은 관계 button으로 포커스를 복원한다.
열린 모달에서 860px 경계를 넘으면 media query 변경 listener가 현재 URL을
다시 적용해 split DOM과 모바일 스택을 원자적으로 재구성한다. 이때 이전 pane의
커스텀 scrollbar track도 먼저 정리한다.

상단 도메인 탭은 roving `tabindex`와 방향키/Home/End 이동을 사용한다. 접힌
필터 패널은 `aria-hidden`과 `inert`를 함께 사용하고, 관계 모델 button은
키보드로 실행할 수 있다. `prefers-reduced-motion`과 앱의 모션 끄기 설정은 전환 효과를
비활성화한다.

## 8. CSS 구조

CSS는 `index.html`에서 명시적인 순서로 로드한다.

```text
tokens → fonts → base → layout → nav
       → controls → card → section-nav → spec-table
       → modal → split-view → brand
```

클래스는 BEM을 기본으로 한다. `spec-table.css`에는 사양 표와 amplifier
matching/configuration 표가 있고, `split-view.css`는 Split View에서 필요한
변경자에만 좁혀 덮어쓴다. `class-audit.mjs`는 정적·동적 클래스 토큰을
JS/HTML과 CSS 사이에서 대조하며, `css-layout-contract.test.mjs`는 중요한
표 grid와 반응형 selector 계약을 검사한다.

## 9. 데이터 계약과 출처 거버넌스

`config/data-governance.json`이 다음 상태의 기계 판독 단일 원본이다.

- canonical 출처 루트와 legacy staging의 역할
- 도메인별 record 또는 collection coverage 방식
- 완료·pending 판정 규칙
- canonical 문서가 없는 완료 레코드의 명시적 허용 목록
- 해석하지 못한 speaker→amplifier 모델
- 의도적으로 남은 비대칭 관계

`pending: true`는 조사가 끝나지 않은 레코드에만 쓴다. 필드가 없으면 완료로
간주하며, 완료 레코드는 canonical 출처를 요구한다. pending 레코드는 빈
스펙 필드가 필터용 기본값으로 파생되지 않게 한다.

`public/tests/data-audit.mjs`는 전체 ID, prefix, 제조사, 도메인별 최소 구조,
관계 대상과 자산 참조를 검사한다. `provenance-audit.mjs`는
`raw-data/raw-specs/`의 Markdown 경로·파일명과 거버넌스 설정을 대조한다.
이 감사는 파일 내용을 추출하지 않으며 PDF/DOCX를 파싱하지 않는다.

현재 결손과 예외는 문서에 별도 복제하지 않는다. 변경 시
`config/data-governance.json`을 근거와 함께 갱신하고 `npm run test:data`로
baseline을 확인한다.

## 10. 자산 거버넌스

`config/asset-policy.json`이 런타임 자산 루트, 허용 확장자, 누락·고아 허용량,
원본 아카이브 위치, 정규화 정책, 완전 중복 baseline을 정의한다.

`scripts/audit-assets.mjs`는 다음을 수행한다.

- HTML, CSS, JavaScript에서 `public/assets/` 참조 수집
- 런타임 파일과 참조의 누락·고아 양방향 대조
- 파일별 SHA-256과 바이트 수 계산
- 완전 중복 그룹과 회수 가능 바이트를 정책 baseline과 비교

중복은 내용이 같은 파일일 뿐 의미상 같은 제품 자산이라는 보장이 없으므로
자동 삭제하지 않는다.

`scripts/normalize_images.py`는 PNG/JPEG/WebP를 확장자 그대로 처리한다.
기본 `dry` 모드는 원본과 예상 출력의 크기·해상도·알파·SHA-256 manifest를
만들 뿐 파일을 바꾸지 않는다. `apply`는 현재 재계산 결과가 검토한 dry-run
manifest와 완전히 같을 때만 모든 검증을 먼저 끝낸 뒤 파일별 원자 교체를
수행한다. 무알파, 전체 프레임 알파, 명시적 제외 이미지는 자동 적용하지
않는다. `montage_check.py`는 수동 육안 검수용 생성물을 만들며 그 결과는
런타임 자산으로 커밋하지 않는다.

## 11. 빌드 artifact

`scripts/build.mjs`의 복사 계획은 다음으로 한정된다.

1. `index.html`
2. 허용 확장자의 `public/assets/`
3. `public/css/`
4. HTML의 로컬 script 엔트리에서 import/export 그래프로 도달 가능한
   `public/js/`

그래프 수집기는 side-effect import, import-from, export-from, 정적 문자열
dynamic import를 인식한다. 외부 URL, bare specifier, 경계 밖 상대 경로,
누락 파일, 심볼릭 링크, 문자열 결합 dynamic import를 거부한다. 인라인
script 본문도 배포 그래프에서 허용하지 않는다.

빌드는 정확히 루트의 `dist/`만 교체하고, artifact 경로 순으로 파일 크기와
SHA-256을 기록한 `asset-manifest.json`을 만든다. `verify-dist.mjs`는 다음을
다시 검증한다.

- 최상위 항목과 허용 디렉터리·확장자
- 소스 전용 디렉터리와 package 파일의 부재
- 일반 파일과 심볼릭 링크 금지
- `index.html` 로컬 참조 존재 여부
- 배포 JavaScript 집합과 도달 가능한 import 그래프의 정확한 일치
- manifest 정렬, 경로, 크기, 해시, 합계

`build.test.mjs`는 그래프 거부 사례를 fixture로 시험하고 실제 빌드를 두 번
실행해 manifest 해시가 같은지 확인한다.

## 12. 검증 계층

`npm run verify`의 순서는 다음과 같다.

1. ESLint
2. Prettier 형식 검사
3. TypeScript `checkJs`
4. 단위 테스트: route codec, 제조사, entity registry, 데이터 계약,
   speaker catalog 순수성
5. 데이터 테스트: 전체 데이터 감사, 출처 거버넌스
6. amplifier 관계 무결성, 파생 순수성, Configuration 그룹화·렌더링 계약
7. 감사: CSS 클래스, 주석, CSS layout, 자산
8. 보안: CSP 정책, 경계가 제한된 preview server
9. UI: 전체 부팅 smoke, 회귀, 접근성, 관계 이동
10. import graph와 반복 빌드 결정성
11. 최종 `dist/` 검증

jsdom 테스트는 실제 브라우저 API 중 필요한 부분을 stub하고, UI의 DOM 계약과
상태 전이를 검증한다. 배포 전에는 필요에 따라 실제 브라우저에서 데스크톱과
모바일 레이아웃, 키보드 흐름, 콘솔·네트워크 오류도 확인한다.

## 13. GitHub Actions 배포

`.github/workflows/ci-pages.yml`은 pull request와 모든 push에서 verify job을
실행한다. Node 24 환경에서 `npm ci`, `npm run verify`, `npm run build`가
성공해야 한다.

`main` push일 때만 verify job이 `dist/`를 GitHub Pages artifact로
업로드하고, 별도 deploy job이 그 artifact를 배포한다. 소스 저장소 전체나
브랜치 루트를 Pages에 직접 노출하지 않는다. 저장소의 Pages source는
워크플로와 별개인 GitHub 설정이므로 **GitHub Actions**로 선택해야 한다.

`.github/dependabot.yml`은 npm과 GitHub Actions 의존성을 정기 검사한다.
자동 업데이트가 들어와도 같은 verify 경계를 통과해야 한다.

## 14. 확장 절차

### 제품 추가

1. canonical 원문을 `raw-data/raw-specs/`의 제조사·도메인 구조에 보존한다.
2. 해당 `data/*.data.js`에 안정적인 prefix ID를 가진 레코드를 추가한다.
3. 관계는 등록된 ID만 사용하고, 한쪽을 원본으로 삼는 관계는 역방향 값을
   중복 저장하지 않는다.
4. 런타임 자산은 `public/assets/`에 추가하고 코드의 참조 경로와 실제
   확장자를 일치시킨다.
5. `npm run verify`를 실행한다.

### 도메인 추가

1. data, schema, view, controller를 만들고 관계 상세가 있으면 detail provider를
   추가한다.
2. controller에서 `registerDomain()`으로 mount/unmount/count/openItem을
   등록한다.
3. `main.js`에서 초기화 순서를 연결한다.
4. `index.html`에 ARIA로 연결된 tabpanel 컨테이너를 추가한다.
5. `core/data-contracts.js`, 데이터 감사, route/UI/a11y 테스트에 새 도메인
   계약을 추가한다.
6. 배포 import graph에 실제로 도달하는지 `npm run test:build`로 확인한다.
