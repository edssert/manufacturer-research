# ARCHITECTURE.md — 기술 아키텍처 (개발자용)

> 대상 독자: 이 코드베이스를 수정하는 개발자/AI 에이전트.
> 입문자용 쉬운 설명은 `ARCHITECTURE_GUIDE.md`, 변경 이력은
> `CHANGELOG-dev-detailed.md`(개발자용)/`CHANGELOG.md`(일반용) 참고.
> 최종 반영: v1.8 (2026-07-15) — 모달/Split View URL 라우팅, 검색어
> 정규화, pane-interactions 모듈 분리.

## 1. 기술 스택

빌드 도구 없는 순수 Vanilla JS(ES Modules) SPA. 프레임워크·번들러·외부
런타임 의존성 없음(테스트만 jsdom). `index.html`이 `public/js/main.js`를
`type="module"`로 로드하면 브라우저가 import 그래프를 따라 전체를 로드한다.
정적 서버(예: `npx serve`)로 루트를 서빙하면 실행된다.

## 2. 디렉토리 구조

```
index.html              진입 HTML (루트 유지, 자산은 public/ 하위)
docs/                   프로젝트 문서 (이 파일 포함)
raw-data/               원문 스펙(raw-specs)·원본 이미지(raw-images) 아카이브
public/
  css/                  tokens → fonts → base → layout → nav → components 순 로드
  assets/               웹폰트(Pretendard)·제품 이미지(webp)
  tests/                node 기반 테스트 (amp.test / smoke.test / class-audit)
  js/
    main.js             진입점 — 도메인 등록·모달/라우터 부팅만
    core/               도메인 비의존 코어
      router.js         해시 라우터 + 모달/Split View 딥링크 (아래 4절)
      state.js          도메인별 상태 컨테이너 (q/chipFilters/range/sort)
      filter-engine.js  검색(정규화)·칩·범위 필터 판정 + 정렬
      dom.js            $, esc, uniq, debounce, getViews 유틸
    ui/                 공용 UI 프리미티브
      modal.js          모달 수명주기(열기/닫기/모바일 스택)
      pane-interactions.js  pane 내부 배선(뷰 전환·단위 토글·사진 확대·
                        섹션 토글·커스텀 스크롤바) — v1.8 에서 modal.js 분리
      split-view.js     나란히 보기(pane1/pane2) + 사진 확대 pane
      card-grid.js      필터→정렬→그룹핑→카드 그리드 렌더러
      filters.js        칩/범위 슬라이더 필터 패널 빌더
      nav.js legend.js theme.js media-toggle.js motion-toggle.js sticky-header.js
    relationships/cross-ref.js  도메인 간 역참조(스피커↔앰프↔액세서리)
    domains/<이름>/     도메인 = speakers·amplifiers·dsps·software·accessories·brand·test
      <이름>.controller.js  mount/unmount/render/모달 열기 + 라우터 등록
      <이름>.schema.js      검색·필터·정렬 규칙 선언 (filter-engine 이 소비)
      <이름>.view.js        카드/모달 마크업 순수 함수
      <이름>.data.js        데이터 배럴 (data/ 하위 시리즈별 파일 재수출)
```

원칙: **controller 만 상태를 가진다.** view 는 순수 함수, schema 는 선언,
core/ui 는 도메인 지식 없음. 새 도메인(탭) 추가 = 폴더 4파일 생성 +
main.js 에 init 호출 1줄 + index.html 에 `<div id="view-…" hidden>` 1줄.

## 3. 데이터 흐름

```
data.js → controller(mount) → buildFilters(schema) → renderGrid
  renderGrid: passes(filter-engine) → sortItems → groupBy → cardHTML → DOM
카드 클릭 → openXxxModal(id) → view.modalBodyHTML → openModalWith
  → wirePaneInteractions → setItemRoute(URL 반영)
모달 내 연관 항목 클릭 → openSplitPane(pane2) → setPane2Route
```

검색어는 `normalizeSearchText()`(소문자 + NFKC + 공백/하이픈/점/슬래시
/가운뎃점 제거)로 질의·대상 양쪽을 정규화해 비교한다 — "KS 28"/"ks-28"
/"KS28" 동치. 각 schema 의 `customSearchMatch` 도 같은 함수를 써야 한다.
검색 입력은 `debounce(120ms)` 로 렌더만 지연(상태 갱신은 즉시).

## 4. URL 라우팅 (v1.8)

해시 최대 3단: `#<도메인>/<카드id>/<pane2상태>`

| 예시 | 상태 |
|---|---|
| `#speakers` | 도메인 탭 |
| `#speakers/la-k2` | 카드 상세 모달 (딥링크·뒤로가기=닫기) |
| `#speakers/la-k2/amp-la-la12x` | Split View: 좌 카드 + 우 연관 항목 |
| `#speakers/la-k2/media~front` | Split View: 우측 = pane1 사진 확대(front 뷰) |
| `#speakers/la-k2/amp-la-la12x~media~front` | 우측 = 연관 항목의 사진 확대 |

- item(2단)은 `location.hash` 대입(히스토리 push) → 뒤로가기가 모달 닫기.
- pane2(3단)와 pane1 교체(`replaceItemRoute`)는 `history.replaceState` —
  히스토리를 어지럽히지 않고 공유 URL 에만 반영.
- 닫기 경로: X/ESC/배경 → `closeModal → clearItemRoute`(replaceState),
  뒤로가기 → 라우터 `applyRoute` → `onItemClose`(main.js 가 closeModal 연결).
- 딥링크 복원: 라우터가 `openItem(id)` 호출(활성 도메인에서 못 찾으면 전
  도메인 폴백 — Split View 에서 pane1 이 타 도메인 항목으로 교체된 URL 대응)
  후 pane2 스펙을 `onPane2Restore`(main.js `restorePane2FromRoute`)로 복원.
  복원은 별도 상태 저장소 없이 **실제 클릭 시뮬레이션**(연관 행/칩 →
  뷰 전환 버튼 → 사진 클릭)으로 수행 — 실사용 배선과 복원 로직이 어긋날
  수 없다.
- 알려진 한계: 모바일 "전체 교체" 스택의 뒤로가기 버튼은 URL 을 되감지
  않음(마지막 상태만 기록); 사진 확대 pane 뒤에 detach 보관되는 이전
  pane2 는 URL 에 포함되지 않음(보이는 상태만 기록).

## 5. 모달·Split View 구조

- `modal.js`: `openModalWith`(단일)·`pushMobileModal`(모바일 전체 교체
  스택)·`closeModal`. 860px 미만은 Split View 대신 전체 교체+뒤로가기.
- `split-view.js`: `openSplitPane`(pane2 열기/교체/paneId 토글 닫기),
  `replaceSplitPane1`, `openMediaSplitPane`(사진 확대 pane, detach 복원),
  `closeSplitView`(배경 클릭 — pane2 먼저 닫기).
- `pane-interactions.js`: `wirePaneInteractions(root)` 하나로 모든 pane
  공통 배선. 반복 호출 안전(onXxx 재할당 패턴 — addEventListener 누적 금지).
- 순환 import 회피: modal ↔ split-view 는 콜백 슬롯(`setSplitViewCloser`,
  `setMediaLightboxOpener`)으로 역전. core/router 는 ui 를 모름(main.js 가
  `onItemClose`/`onPane2Restore`/`onPane2Close` 연결).

## 6. 성능

- 카드/모달/확대 pane 이미지 전부 `loading="lazy" decoding="async"` —
  모달의 숨김 뷰 이미지는 표시 시점까지 로드 지연.
- Pretendard Regular/SemiBold woff2 `<link rel="preload">`.
- 검색 입력 디바운스(120ms). 그리드는 innerHTML 일괄 재생성(수백 장
  규모까지는 충분; 그 이상은 가상화 검토).

## 7. 테스트

`npm test` = `amp.test.mjs`(데이터 무결성·크로스레퍼런스·검색 정규화) →
`class-audit.mjs`(JS↔CSS 클래스 대조, 경고성) → `smoke.test.mjs`(jsdom
전체 부팅: 탭·카드·모달·Split View·URL 라우팅). jsdom 에는 matchMedia/
history 스텁이 필요하다(smoke.test 상단 참고).

## 8. 알려진 공백·로드맵

- d&b D40/D80/40D 앰프 상세 데이터 미입력(D90 만 존재) — amp.test 의
  KNOWN_MISSING 허용 목록과 db.data.js 노트 참고. 확정 시 재입력.
- D90 `relations.speakerIds` 의도적 공백(매칭 확정 대기).
- `speakers.view.js`(약 1,100줄)·`amplifiers.view.js`(약 860줄)는 순수
  템플릿 함수 집합 — 다음 리팩토링 후보: 카드/모달/표(프리셋·안전) 빌더
  분리. 데이터는 이미 시리즈별 파일로 분리 완료.
- class-audit 잔여 경고(card__img 등)는 동적 클래스 조합·오탐 포함 — 정리 후보.
