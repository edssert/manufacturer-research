# CHANGELOG-dev-detailed.md — 버전별 업데이트 기록 (개발자용 상세본)

> 프로그래밍 전문가용 기술 중심 체인지로그 — 파일명/클래스/함수 단위
> 구현 세부를 기록한다. 일반인용 쉬운 요약은 같은 폴더의 `CHANGELOG.md`.
> (v1.8 부터 이 파일을 다시 정식 관리한다 — 과거 "갱신 중단" 방침 폐기,
> `raw-data/legacy/` → `docs/` 이동.)

이 문서는 프로젝트의 버전별 변경사항을 기록한다. 최신 버전이 맨 위에 온다.

---

## v1.8 (2026-07-15) — 세션 8 (URL 라우팅·검색 정규화·모듈 분리·테스트 현행화)

### 모달/Split View URL 라우팅 (딥링크)
- `core/router.js` 확장 — 해시 3단 `#<domain>/<itemId>/<pane2Spec>`.
  신규 API: `setItemRoute`(push) / `replaceItemRoute` / `clearItemRoute` /
  `setPane2Route` / `clearPane2Route`(모두 replaceState) + 콜백 등록
  `onItemClose`/`onPane2Restore`/`onPane2Close`(main.js 가 연결 — core→ui
  의존 없음). `applyRoute` 는 활성 도메인 `openItem` 실패 시 전 도메인
  폴백(Split View pane1 교체 URL 대응).
- 5개 카드 도메인 controller: `openXxxModal` 이 `setItemRoute(id)` 호출
  + boolean 반환, `registerDomain` 에 `openItem` 등록. pane1 교체 경로
  (`wireSplitPaneSpeakerChips`/`wireSplitPaneAmpRows`)는 `replaceItemRoute`.
- `split-view.js`: `openSplitPane` 성공 시 `setPane2Route(paneId)`,
  `closeSplitPane2` 시 clear. 사진 확대 pane 은 `media~<slug>` 또는
  `<sourceId>~media~<slug>` 스펙(뷰 전환 시 URL 갱신). `wireMediaLightbox`
  (pane-interactions.js)가 sourceId(pane2 의 paneId)를 오프너에 전달.
- `main.js` `restorePane2FromRoute`: 상태 저장소 없이 실제 클릭 시뮬레이션
  (data-*-id 요소 → [data-view-switch] → .modal__media)으로 pane2 복원.
- `modal.js` `closeModal` → `clearItemRoute()` (X/ESC/배경 닫기 시 URL 원복).

### 검색어 정규화 + 디바운스
- `core/filter-engine.js` `normalizeSearchText()`: lowercase + NFKC +
  `[\s\-_./·]+` 제거. `passes()` 의 검색 비교 양측 정규화.
- 5개 schema 의 `customSearchMatch` 도 동일 함수로 제조사명 정규화.
- `core/dom.js` `debounce(fn, 120)` 신규 — 5개 controller 검색 input 의
  렌더 호출만 지연(상태 대입은 즉시).

### 모듈 분리 (AI 친화)
- `ui/modal.js`(689줄) → `ui/modal.js`(수명주기 ~240줄) +
  `ui/pane-interactions.js`(wire* 배선·커스텀 스크롤바·lightbox 오프너
  슬롯, ~470줄). split-view.js import 경로 갱신. 로직 변경 없음.
- 잔여 후보(로드맵): `speakers.view.js`(~1.1k)·`amplifiers.view.js`(~860).

### 모바일/성능/UI
- 모달·확대 pane 의 뷰 이미지 전부 `loading="lazy" decoding="async"`
  (speakers/amplifiers/accessories view, split-view) — hidden 뷰는 표시
  시점까지 로드 지연.
- `index.html`: Pretendard Regular/SemiBold `<link rel="preload">`.
- `spec-table.css` 모바일(≤480px): 4열(mech-safety)/6열(amp-view·기본)
  match-table 가로 스크롤 + row min-width(480/560/520px), 셀 패딩 축소
  (10/12→8/10), `.spec-table__tri` 를 Dimensions 전폭 + Weight/IP 2열로
  재배치.
- **파일 꼬리 유실 복구**: `spec-table.css` 끝이 과거 세션 동기화 문제로
  잘려 `.footnote__sublist`/`.hint-text` 정의가 유실돼 있었음(class-audit
  경고와 일치) — 재정의로 복구.

### 테스트 현행화 (전부 통과)
- `amp.test.mjs`: 앰프 8개(LA-RAK II AVB/III 포함) 반영, d&b D40/D80/40D
  미입력 공백은 `KNOWN_MISSING_AMP_IDS` 허용 목록으로 분리, D90 기준
  merged-model/CCL8 케이스 재작성, 정규화 검색 테스트(Test8b) 추가,
  실패 시 exit 1.
- `smoke.test.mjs`: jsdom 에 `matchMedia`/`history` 스텁, 탭 7개(Accessories
  ·Test 추가), pane2 닫기 셀렉터 `[data-modal-close]` 현행화, URL 라우팅
  검증 4건 추가(모달 열림/pane2 기록/제거), 브랜드 탭 단일 페이지 방식
  반영. 결과 25 PASS / 0 FAIL.

### 문서/구조 정리
- `raw-data/legacy/CHANGELOG-dev-detailed.md` → `docs/` 이동, legacy 폴더
  삭제. `docs/TODO.md` 를 "컨텍스트 임시 기록장" 용도로 초기화.
- `ARCHITECTURE.md`(전문가용)/`ARCHITECTURE_GUIDE.md`(입문자용) 전면
  재작성, 루트 `README.md` 신설(AI 에이전트 공통 참조 문서).

## v1.7 (2026-07-14) — 세션 7 (K1 Mechanical Safety 섹션 신규 추가)

### 원문 데이터 정리
`K1_OM_EN.pdf` "Mechanical safety" 섹션(p.31-33)을 pdfplumber 텍스트
추출 + PyMuPDF 이미지 렌더링(p.31/32, 표 구조 재확인)으로 파싱. K1
자체에 해당하는 부분만 발췌(K1-SB/KS28/CS1의 리깅 한계 표는 각자 제품
데이터 몫이라 제외) — 사용자가 텍스트 설명 부분(Flown configurations
일반 원칙, 경고 3개, Assessing mechanical safety 5개 항목)도 참고
사항 토글로 가려질 테니 빠짐없이 정리해달라고 요청해 전문 번역 포함.
`raw-data/raw-specs/la/speakers/k-series/k1.md`에 "출처 3" 섹션으로
추가 — Flown/Stacked 표, 경고 3개, Assessing mechanical safety 5개
항목(WLL 한계·Soundvision 모델링·안전계수 산정·그라운드스택 경고·2차
안전장치·특수환경) 전문 반영.

### 앱 데이터 반영
- `js/domains/speakers/data/la/k-series.data.js`: K1 `presets` 객체
  형제 필드로 `mechanicalSafety` 신규 — `flownRows`(K1-BUMP 2행 +
  KARA-DOWNK1 다운필 1행), `stackedRows`(K1-CHARIOT 1행), `warnings`
  (경고 3개, 배열), `notes`({text, subs?} 배열 — Safe/Maximum limit
  정의, 2006/42/EC 준수 문구, Assessing mechanical safety 5개 항목을
  subs로 중첩), `source`.
- `js/domains/speakers/speakers.view.js`: `mechanicalSafetyHTML(d)`
  신규 함수 — Preset Guide(`presetGuideHTML`)와 동급 레벨의
  `data-section-toggle` 섹션(기본 접힘)으로 렌더. Flown/Stacked 표
  2개는 섹션을 펼치면 항상 바로 보이고(Delay Defaults와 동일 패턴),
  경고문은 `.mech-safety-warning`(항상 노출, danger 톤 강조 박스)으로,
  참고 사항(notes)은 별도 하위 토글(`spk-mech-safety-notes`)로 접어
  둔다. `modalBodyHTML` 마지막(`presetGuideHTML(d)` 다음)에
  `${mechanicalSafetyHTML(d)}` 호출 추가.
- `css/components/spec-table.css`: `.match-table--mech-safety`(4열:
  구성/리깅 액세서리/safe limit/maximum limit, rigging accessory 열이
  "14 K1 + 3 LA-RAK II AVB"급 길어 가장 넓게 잡음), `.mech-safety-warning`
  (li마다 danger 톤 border-left + panel-2 배경 박스, 참고 사항의 흐린
  footnote 스타일과 시각적으로 구분) 신규.

### 검증
`node --check`로 `k-series.data.js`/`speakers.view.js` 문법 오류 없음
확인. 실제 브라우저 렌더링 확인은 사용자 재확인 필요.

---

## v1.7 (2026-07-14) — 세션 6 (사진 확대 pane 배경 클릭 close 시 onClose 누락 버그)

### 증상
사용자 리포트: Split View 오른쪽 pane2(다른 제품 모달)의 사진을 클릭해
확대 pane(`js/ui/split-view.js openMediaSplitPane`)을 연 뒤, 오른쪽 위
X 버튼이 아니라 화면 좌우 빈 공간(모달 오버레이 배경)을 클릭해 닫으면
원래 pane2(사진 확대 이전의 다른 제품 모달)로 복원되지 않고 Split View
자체가 완전히 꺼져 pane1만 남았다.

### 원인
`openMediaSplitPane`은 사진 확대 pane을 열 때 기존 pane2 DOM 노드를
detach해서 클로저에 보관해두고, `openSplitPane({ onClose })`로 넘긴
`onClose` 콜백(→ `restorePane2`)이 그 노드를 되살리는 구조다. 그런데
이 `onClose`는 X 버튼(`closeBtn.onclick`, openSplitPane 내부)에서만
호출되고 있었다. 배경 클릭은 `modal.js`의 `modalBgEl` 클릭 리스너 →
`setSplitViewCloser(closeSplitView)`로 등록된 `closeSplitView()`
(split-view.js)를 타는데, 이 함수는 `closeSplitPane2(modalEl,
container)`만 호출할 뿐 pane2에 연결된 `onClose`를 전혀 몰랐다 — 그래서
`restorePane2`가 실행되지 않고 `closeSplitPane2`의 기본 동작(Split
View 완전 해제, pane1만 단일 모달로 복귀)만 일어났다.

### 수정
- `js/ui/split-view.js` `openSplitPane()`: pane2 생성 직후
  `pane2._onClose = onClose || null;`로 콜백을 DOM 노드 자체에 매달아
  둔다(모듈 스코프 변수 대신 노드에 붙인 이유: pane2가 교체될 때마다
  자연스럽게 최신 콜백으로 갱신되고 별도 정리/추적이 필요 없음).
- `js/ui/split-view.js` `closeSplitView()`: `closeSplitPane2` 호출
  *전에* 현재 pane2의 `_onClose`를 읽어두고, `closeSplitPane2`가 pane2를
  지운 *뒤에* 그 콜백을 호출 — X 버튼 경로(`closeBtn.onclick`)와 동일한
  순서(닫기 → onClose)를 배경 클릭 경로에도 맞췄다. 사진 확대가 아닌
  일반 pane2(앰프 등, `_onClose`가 없음)는 기존과 동일하게 그냥 Split
  View가 닫힌다 — 회귀 없음.

### 검증
`node --check js/ui/split-view.js` 통과. 실제 브라우저 동작(사진 확대
→ 배경 클릭 → 원래 pane2 복원) 확인은 사용자 재확인 필요.

## v1.7 (2026-07-14) — 세션 6-2 (같은 세션, 후속) restorePane2 사진 영역 소실 버그

### 증상
사용자 재확인: 위 세션 6 수정 후 "배경 클릭 시 원래 pane2로 복원"
자체는 되는데, 복원된 pane2(예: LA12X 앰프 모달)의 사진 영역이 비어
보임(K1 단일 모달 → LA12X Split View → LA12X 사진 확대 → 배경 클릭
재현 케이스).

### 원인
`modal.js` `wireMediaLightbox`는 사진 클릭 시 그 사진이 속한
`.modal__media-wrap`에 `modal__media-wrap--collapsing`(max-height:0,
opacity:0 — "사진이 위로 접히며 사라지는" 트랜지션용) 클래스를 건다.
`openMediaSplitPane`이 확대 pane을 열기 위해 기존 pane2(LA12X)를
detach할 때, 그 pane2 DOM 안의 wrap에는 이미 이 collapsing 클래스가
걸려 있는 상태 그대로 보관된다. `closeSplitPane2`는 pane1(왼쪽)에
대해서는 이 클래스를 정상적으로 떼어내는 로직이 있지만(371-391행 부근,
`wrap.classList.remove(...)`), pane2를 되살리는 `restorePane2`에는
동일한 처리가 없어 — 복원된 pane2가 collapsing 상태(높이 0·투명) 그대로
남아 사진 영역이 비어 보였다.

### 수정
- `js/ui/split-view.js` `restorePane2()`: `pane2El` 복원 직후
  `.modal__media-wrap--collapsing`를 찾아 클래스를 제거하는 처리 추가.

### 검증
`node --check js/ui/split-view.js` 통과. 실제 브라우저 재검증 필요.

## v1.7 (2026-07-14) — 세션 6-3 (같은 세션, 후속) pane1 사진 collapsing 잔존 — pane2 "교체" 경로

### 증상
사용자 재확인: K1 pane1 + 사진 확대 pane2 상태에서, 오른쪽 확대뷰가
아니라 왼쪽 K1 pane1 안의 다른 요소(Amplifier Matching의 LA12X 행)를
클릭해 pane2를 LA12X로 바꾸면, 왼쪽 K1의 사진 영역이 계속 비어 있음
(세션 6-2에서 고친 "복원(restorePane2)" 경로와는 다른 경로).

### 원인
세션 6-2에서 고친 `restorePane2`는 "사진 확대 pane을 닫고 원래 있던
pane2로 되돌아가는" 경로에서만 실행된다. 이번 케이스는 그 경로를 타지
않는다 — `speakers.controller.js` `wireSpeakerModalAmpClicks`의 앰프
행 클릭 핸들러가 `openSplitPane`을 직접 호출하고,
`openSplitPane`(split-view.js)은 "기존 pane2(oldPane2)를 그냥
remove() 하고 새 pane2를 붙이는" 교체 로직만 갖고 있어
`closeSplitPane2`도 `restorePane2`도 거치지 않는다. 즉 pane1(K1)에 걸린
`modal__media-wrap--collapsing`를 풀어줄 코드 경로 자체가 없었다.

### 수정
- `js/ui/split-view.js` `openSplitPane()`: 기존 pane2(`oldPane2`)를
  remove()하기 직전에, 그 pane2가 `split-view__pane--media`(사진 확대
  전용 클래스)였는지 검사 — 맞으면 pane1의
  `.modal__media-wrap--collapsing`를 찾아 클래스를 제거한 뒤에
  oldPane2를 지운다. 사진 확대가 아닌 일반 pane2 교체(앰프→다른 앰프
  등)는 이 조건에 안 걸려 기존과 동일하게 동작 — 회귀 없음.

### 정리 — 이번 버그 계열 3건의 공통 원인
`wireMediaLightbox`(modal.js)가 pane1 사진 클릭 시 그 pane1 안의
`.modal__media-wrap`에 `--collapsing` 클래스를 걸어두는데, 이 클래스를
정상적으로 떼어내는 코드는 원래 `closeSplitPane2`(X 버튼으로 사진
확대를 닫는 "정상" 경로) 단 한 곳에만 있었다. 사진 확대 상태에서
벗어나는 경로가 실제로는 세 갈래(① X 버튼 → closeSplitPane2, ② 배경
클릭 → closeSplitView → closeSplitPane2, ③ pane1 안의 다른 항목 클릭
→ openSplitPane의 교체 로직)였는데 ②는 pane2쪽 복원 누락(6-1),
③은 pane1쪽 collapsing 해제 누락(6-3)이 있었고, 복원되는 pane2 자체도
collapsing 잔존 문제(6-2)가 있었다 — 세 경로 모두 각자 다른 코드
지점이라 한 번에 발견되지 않고 순차적으로 드러났다.

### 검증
`node --check js/ui/split-view.js` 통과. 실제 브라우저 재검증 필요.

---

## v1.7 (2026-07-14) — 세션 5-2 (Delay Defaults 극성 오류 정정 — pdfplumber 텍스트 추출 누락)

### 증상
사용자 지적: Delay Defaults 표(K1)에서 KS28/CS1/[K1SB_100_NC] 극성이
전부 "+"로 기재됐는데, 원문 p.37/38/40/42 표에는 K1은 회색 [+] 배지,
K1-SB/KS28/CS1은 조합에 따라 빨간 [-] 배지가 아이콘으로 박혀 있어
실제로는 다르다는 리포트.

### 원인
pdfplumber 텍스트 추출은 PDF 안의 배지형 아이콘(사각형 배경+기호)을
텍스트 레이어로 인식하지 못해 극성 정보 자체가 통째로 누락됐다 — 이전
세션에서 이 누락을 놓치고 "값 옆에 극성 언급이 없으니 전부 +"로
잘못 일반화해 기재함.

### 검증 방법
PyMuPDF(`fitz`)로 p.37/38/40/42를 300dpi(zoom matrix 3x)로 페이지
이미지 렌더링 후 Read 툴로 직접 시각 확인. 결과:
- p.37(K1+KS28 X, K1+K1SB_60): K1 회색[+], K1-SB 회색[+] — 둘 다 정상.
- p.38([K1SB_100_NC]): K1 회색[+], K1-SB 빨간[-] — K1-SB만 반전.
- p.40(K1+KS28 전 조합): K1 회색[+], KS28 빨간[-] — KS28은 항상 반전.
- p.42(K1+CS1 전 조합): K1 회색[+], CS1 빨간[-] — CS1도 항상 반전.

### 수정 (1차)
- `js/domains/speakers/data/la/k-series.data.js` `presets.delayDefaults.
  rows[].values`: 극성 정상(+)은 표시를 생략(기본값이라 당연하므로)하고
  반전인 경우만 "(−)" 접미사 추가. `notes`의 극성 설명 문구도 정정.
- `js/domains/speakers/speakers.view.js` presetGuideHTML: `values`
  렌더링에 `highlightPolarityFlip()` 추가 — wrapBreakable 처리 후
  "−" 문자만(괄호는 일반색 유지, 사용자 요청) `.polarity-flip` span으로
  감싸 빨간 글씨로 강조. 표 헤더도 "Pre-alignment delay (polarity +)"
  → "Pre-alignment delay & Polarity"로 수정(더 이상 전부 +가 아니므로).
- `css/components/spec-table.css`: `.polarity-flip { color: var(--danger,
  #e5484d); font-weight: 700; }` 신규(--danger 토큰이 프로젝트에 없어
  폴백 값 직접 지정).
- `raw-data/raw-specs/la/references/presets/k-series/k1.md`: 구성별
  상세 섹션(3~6번, K1-SB 서브/NC/KS28/CS1) 딜레이 표에 극성 값 추가·
  정정, 출처 각주에 "PyMuPDF 이미지 렌더링으로 재확인" 명시.

### 수정 (2차 — 같은 세션 내 사용자 추가 요청)
- 값 구분자를 텍스트 문자 "·"/"|" 대신 실제 표 구분선으로 바꿔달라는
  요청 — `k-series.data.js` `delayDefaults.rows[].values`(문자열) →
  `rows[].items`(문자열 배열, K1/K1-SB/KS28 등 엘리먼트별 값 하나씩)로
  구조 변경. `speakers.view.js` presetGuideHTML이 각 item을
  `<span class="delay-item">`으로 감싸 나열하고, `spec-table.css`
  `.delay-item + .delay-item { border-left: 1px solid var(--line-2) }`
  로 표 위아래 가로선과는 끊긴 짧은 세로 구분선을 그린다(`.match-table__
  cell--delay-items { display:flex; flex-wrap:wrap }`로 셀 레이아웃 구성).
- notes 첫 항목 문구가 "딜레이 + 극성 기본값"이라고 적혀 있어 "극성은
  항상 +"로 오독될 수 있다는 지적 — "딜레이와 극성 기본값을 함께
  표기한 것"으로 중립적으로 수정하고, +/− 여부 판단은 이미 있던 두
  번째 note 항목(반전 규칙 설명)에 전적으로 맡기도록 정리.

### 검증
`node --check` 문법 확인 통과. 실제 화면(브라우저) 렌더링 확인은
Task #6(FHD 사진 잘림)과 함께 다음 세션에서 필요.

## v1.7 (2026-07-14) — 세션 5 (FHD 100% 줌 Array 사진 하단 클리핑 버그 — 검증 대기)

### 증상
사용자 리포트: FHD 해상도 + Chrome 전체화면 + 브라우저 줌 100%에서만
(90% 이하로 낮추면 재현 안 됨) 세로로 긴 Array 이미지(예:
`spk-la-k1-array2.webp`, 342×888px, 종횡비 0.39)를 Split View 확대
pane(`js/ui/split-view.js openMediaSplitPane`)에서 볼 때 사진 하단만
잘림(상단은 정상). QHD에서는 재현 안 됨.

### 원인 분석 (스크린샷 없이 코드 정적 분석만으로 진행 — 확답 아님)
`.media-split-pane__body`(modal.css)는 `display: grid; place-items:
center; flex: 1; height: auto`이고 부모 `.split-view__pane--media`에는
`overflow-y: hidden`이 걸려 스크롤 폴백이 없다. grid item인
`.media-split-pane__img`의 암묵적 `min-height`가 기본값 `auto`(=콘텐츠
고유 크기)라, 세로로 긴 원본 이미지가 grid 트랙 계산에서 `max-height:
100%`보다 먼저 자기 고유 크기로 반영되려는 순환 참조가 생긴다.
브라우저 줌 배율에 따른 서브픽셀 반올림이 100% 근방에서만 이 계산을
살짝 어긋나게 만들어 셀이 미세하게 넘치고, 넘친 만큼이 부모의
`overflow-y: hidden`에 걸려 잘린 것으로 추정(중앙 정렬 특성상 위보다
아래가 더 잘려 보임 — 사용자 확인: 실제로 위는 안 잘리고 아래만 잘림).

### 수정
- `css/components/modal.css` `.media-split-pane__body`: `overflow:
  hidden` 추가(경계 밖 클리핑을 명시적으로 보장, 정상 케이스는 영향 없음).
- `css/components/modal.css` `.media-split-pane__img`: `min-height: 0`
  추가(grid item의 암묵적 auto min-size를 해제해 근본 원인 차단).

### 검증 (같은 세션 내 사용자 확인)
사용자가 실제 FHD 화면 + Chrome 100% 줌에서 확인 — 더 이상 잘리지
않음을 확인. 다만 이미지가 박스 경계에 거의 딱 맞게 꽉 차 아래쪽 여백이
"아주아주아주 미세하게"도 안 보인다는 후속 피드백을 받아 추가 조정:
- `.media-split-pane__img` / `.modal__media img.media-split-pane__img`
  의 `max-height: 100%` → `98%`로 변경 — object-fit: contain 특성상
  세로가 긴 이미지는 세로 기준으로 박스에 꽉 차는데, 100%가 아닌
  98%로 살짝 줄여 항상 최소한의 여백이 남게 했다(육안상 사진이 작아
  보이지는 않는 수준).
Task #6 완료 처리.

## v1.7 (2026-07-14) — 세션 4 (K1_OM_EN.pdf 반영: Preset Guide ratio/minLine/delayDefaults)

### 원문 데이터 정리
`uploads/K1_OM_EN.pdf`(K1 owner's manual EN version 4.0, 160p) 중 목차
(Contents p.3-5), Preset description(p.16), Loudspeaker configurations
(p.34-45)를 pdfplumber로 텍스트 추출해 확인.
`raw-data/raw-specs/la/references/presets/k-series/k1.md`를 전면 갱신:
OM 목차 요약표, 구성별(K1 단독/K1-SB LF확장·서브/KS28/CS1/Kara II
다운필/K2 다운필) 상세 섹션(매칭 비율·최소 라인 길이·pre-alignment
딜레이·geometric 딜레이), p.16 출력 라우팅 재검증 표를 기존
preset_guide_EN.pdf 기반 내용에 추가(교차검증, 값 상충 없음).

### 앱 데이터 반영
- `js/domains/speakers/data/la/k-series.data.js`: K1 `presets.rows`에
  `ratio`(권장 매칭 비율)·`minLine`(최소 라인 길이) 필드 추가(값이 있는
  행만), Kara II/K2 다운필 구성 2행 신규 추가. `presets.delayDefaults`
  객체 신규(rows: 프리셋 조합별 pre-alignment 딜레이, notes: geometric
  딜레이·동일 라인소스 내 딜레이 미적용 규칙, source). `presets.source`에
  K1_OM_EN.pdf 출처 병기.
- `js/domains/speakers/speakers.view.js` `presetGuideHTML()`: config 셀에
  ratio/minLine 값이 있으면 `.preset-guide__ratio` 보조 줄로 표시(없는
  행은 기존과 동일). `delayDefaults`가 있으면 Preset Guide 하위에
  "Delay Defaults" 토글 섹션(표 2열 + notes + source)을 추가 렌더 —
  `data-section-toggle` 패턴 재사용, wireSectionToggle 자동 배선이라 JS
  추가 배선 불필요.
- `css/components/spec-table.css`: `.match-table--preset-guide-delay`
  (2열 grid, Preset Guide 표와 동일한 셀 스타일) 신규,
  `.preset-guide__ratio`(작은 흐린 색 보조 텍스트) 신규.

### 검증
`node --check`로 `k-series.data.js`/`speakers.view.js` 문법 오류 없음 확인.

## v1.7 (2026-07-13) — 세션 3 (K-series/L-series 실사 이미지 대량 추가, connectors 필드 수정)

### 이미지 아카이빙 + 최적화 반영
사용자가 `Upload/<mk>/speakers/<series-slug>/` 하위에 제조사 실사(3D 렌더,
알파채널 투명배경 처리 완료 상태)를 폴더별로 정리해 제공. 전부
`raw-data/raw-images/la/speakers/k-series/<model>/`,
`raw-data/raw-images/la/speakers/l-series/<model>/`에 원본 그대로 복사
아카이빙 후, Python/PIL로 최대 900px 리사이즈 + webp 변환해
`assets/img/speakers/la/k-series/`, `assets/img/speakers/la/l-series/`에
저장, 각 `data.js`의 `views` 배열에 반영. 처리 대상: K1(3장), K1-SB(3장),
K2(5장, panflex 디테일 클로즈업 포함), K3(4장, KS28 조합 포함), K3i(4장),
Kara II(4장, SB18 조합 포함), Kara IIi(4장, SB18 IIi 조합 포함),
KIVA II(3장), L2/L2D(4장, 공용 Line/Chariot 뷰 2장 포함).

- `js/domains/speakers/data/la/k-series.data.js`: 8개 모델 `views` 배열에
  각각 신규 뷰 추가(라벨: Array (Nx + 액세서리명), Horizontal, Vertical,
  With <서브우퍼명> 등). K1은 사용자 요청으로 기존 `spk-la-k1.webp`/
  `spk-la-k1-array.webp` 뷰 제거, `img` 필드도 `spk-la-k1-horizontal.webp`로
  교체, 순서를 Horizontal → Vertical → Array(8x+BUMP)로 재배열.
- `js/domains/speakers/data/la/subwoofers.data.js`: KS28/SB18/SB18 IIi에
  기존 `views` 필드가 없어(단일 `img`만 존재) 신규로 `views` 배열 생성,
  Front + With <K-series 모델명> 조합 뷰 2개씩 추가.
- `js/domains/speakers/data/la/l-series.data.js`: L2/L2D 각각에 Alt(단일
  샷 다른 각도) + Line(공용, 두 모델 동일 소스) + On Chariot(공용) 3개
  뷰 추가.
- `js/domains/accessories/data/la.data.js`: `acc-la-k1-bump` — 기존
  `img: null` → K1+BUMP 조합 웹프로 교체, `views` 배열 신설(With K1 /
  With K1-SB 2개 뷰). 다른 BUMP류(K2-BUMP, K3-BUMP, K3i-BUMP, M-BUMP,
  M-BARi 등)는 accessories 데이터에 카드 자체가 없어 대상 아님.
- K2 panflex 디테일 뷰(`spk-la-k2-panflex-detail.webp`, 4096×1862 원본,
  우하단 넓게 알파 투명 처리)는 `object-fit: contain` 기본 중앙 정렬 시
  실제 내용(좌상단)이 프레임 중앙에서 비어 보여, `css/components/modal.css`에
  `.modal__media img[data-view="panflex-detail"] { object-position: left top; }`
  전용 규칙 추가(라벨 "Panflex Detail" → viewSlug 변환 결과 사용).

### connectors 필드 수정 (K-series 전체)
사용자가 K1 `connectors: "8-point PA-COM"`이 실제로는 IN+LINK 2개 아니냐고
질문 → raw-specs(`k1.md` line 35 "IN 1 × 8-point PA-COM / LINK 1 ×
8-point PA-COM", line 118 "2 × 8-point PA-COM") 교차확인 → K-series
전체(K1, K2, K3, K3i, Kara II, Kara IIi, KIVA II — K1-SB 제외, 실제
1개) 동일 문제 확인. WebSearch + `mcp__workspace__web_fetch`로 각 모델
공식 오너스 매뉴얼(manualslib.com 게재본) "Connectors" 섹션 직접 확인 결과:
K3/Kara II/KIVA II(speakON) 매뉴얼에 "SpeakON connectors can be used
interchangeably as IN or LINK connector" 명시 확인 — K1/K2(PA-COM)처럼
고정 역할이 아님. K3i/Kara IIi(terminal block)는 매뉴얼에 개수(2×)만
명시, 상호교환 문구 없음. 사용자의 "다른 스피커도 2개면 IN/LINK일 것"
가설은 K1/K2에만 해당, 나머지는 반박 근거를 사용자에게 보고 후 확정:
- K1/K2: `"8-point PA-COM x2 (IN 1 + LINK 1)"`
- K3/Kara II/KIVA II: `"4-point speakON x2 (IN/LINK 상호교환)"`
- K3i/Kara IIi: `"4-point terminal block x2"`
- K1-SB: 변경 없음.

### 정리
`Upload/` 폴더(사용자 원본 35장, 전량 raw-images 아카이빙 완료 확인 후
`allow_cowork_file_delete` 승인받아 삭제) 제거.

---

## v1.7 (2026-07-13) — 세션 2 (accessories 도메인/모달 뷰 전환)

### 액세서리 관련 데이터/뷰
- `la.data.js`: K1-CHARIOT2/K-BUMPFLIGHT `img` 필드에 실제 최적화 이미지
  경로 반영. `relatedAccessoryIds` 필드 신설 — K1-BUMP↔K1-DELTA↔
  K-BUMPFLIGHT, K1-CHARIOT2↔K1-CHARIOTCOV.
- `cross-ref.js`: `findRelatedAccessories(accessoryId)` 추가.
- `accessories.controller.js`: `wireAccessoryModalRelatedClicks()` 추가,
  `openAccessoryModal`에서 `findRelatedAccessories` 조회해
  `accModalBodyHTML`에 `related` 파라미터로 전달.
- `accessories.view.js`:
  - `usedInHTML(amps, speakers, related)` — 기존 `relatedAccessoriesHTML`을
    병합, "Accessories" chip-group으로 Used In 섹션에 통합.
  - `lengthsRow`를 `spec-table__cell--full` → 일반 `spec-table__cell`
    (half-width, Type 옆에 배치).
  - `views.length === 0`일 때 `modal__media--noimg` placeholder(⚙) 렌더.
  - `modalBodyHTML` 섹션 순서 변경: General(spec-table) → connectionHTML
    → usedInHTML (기존 usedInHTML → connectionHTML → General에서 역순).
    `connectionDiagramHTML(a.connection, false)`로 `afterUsedIn` 인자
    하드코딩(순서 변경으로 `connection--after-used-in` 스타일 무의미해짐).
- `card.css`: `.spec-table + .connection { margin-top: 20px; }` 추가
  (섹션 순서 변경으로 필요해진 간격).
- `modal.css`: `.modal:not(.modal--split)`에 `height: calc(100vh - 80px)`
  추가(기존 `max-height`와 함께 — 콘텐츠 짧은 모달도 항상 최대 높이).

### 모달 뷰 전환(Front/Rear, Signal Flow 등) 크로스페이드 시도 — 미해결
`js/ui/modal.js`의 `wireViewSwitch`가 뷰 버튼 클릭 시 `img.hidden` 속성을
토글하는 기존 방식에서, DO3WFILL(Signal Flow 흰 배경 다이어그램) 전환 시
흰 사각형 실루엣이 도드라져 보이는 버그 리포트. 다음 순서로 시도했으나
모두 미해결 상태로 세션 종료:
1. `hidden` 토글 → `is-active` 클래스 + `opacity` 크로스페이드(.25s)로
   전환, `.modal__media-wrap:has()` 배경 전환에도 `.25s` 트랜지션 추가.
   → 배경/이미지 페이드 타이밍 불일치로 여전히 실루엣 발생.
2. 이미지 쪽에 `transition-delay: .12s`(배경이 먼저 바뀐 후 이미지
   페이드인), 나갈 때는 반대로 배경에 `.13s` delay(이미지 먼저 사라짐).
   → 여전히 개선 안 됨, 사용자 요청으로 delay 방식 폐기.
3. 원본 이미지(554×554) 자체에 흰 캔버스 패딩 추가
   (`acc-la-do3wfill-signal-flow.webp`, 1218×554 → 이후 1662×1662,
   raw-images 원본은 미변경) — `object-fit: contain`은 비율 유지 축소라
   패딩을 늘려도 반드시 여백이 남는 구조적 한계로 무효.
4. 크로스페이드/딜레이 전부 제거, `hidden` 즉시 토글로 복귀 + 배경
   트랜지션도 제거(완전 동시 전환) → 여전히 동일 증상 리포트.
5. `:has()` CSS 선택자 대신 `wireViewSwitch`에서 `wrap.style.background`를
   JS로 직접 지정(hidden 토글과 원자적 동기화 시도) → 여전히 동일 증상.
6. whitebg 이미지에 `object-fit: cover` + `width/height:100%` 적용해
   wrap 배경이 아예 보이지 않게(박스를 이미지가 완전히 채움) 시도 →
   이미지가 흰 여백까지 꽉 채우며 크롭돼 다이어그램 내용 자체가 안 보이는
   역효과 발생, 미해결.
- 최종 상태: `wireViewSwitch`는 원래의 단순 `hidden` 토글로 복귀,
  `.modal__media-wrap`의 `:has()` 흰 배경 매칭 규칙 제거, whitebg 이미지에
  `object-fit: cover` CSS만 남아있는 상태(문제 있음 — 다음 세션에서
  `cover` 제거 또는 이미지 크롭 비율 재조정부터 재검토 필요).
- `acc-la-do3wfill-signal-flow.webp`는 1662×1662(3배 패딩)로 교체된
  상태로 남아있음 — 원본 다이어그램 크기 자체는 변경 없음.

---

## v1.7 (2026-07-13)

모달/Split View 스크롤·레이아웃 안정화, K1 Preset Guide 섹션 신설.

### 스피커 상세 — Preset Guide (speakers.view.js, la/k-series.data.js)
- K1 레코드에 `presets: { rows, notes, source }` 필드 추가(원문:
  `raw-data/raw-specs/la/references/presets/k-series/k1.md`).
- `presetGuideHTML(d)`: `match-table--preset-guide` 3열 표(Loudspeaker
  Configuration/Preset/Acoustic Properties) + notes + source, 기존
  `section-label--toggle`/`data-section-toggle` 패턴으로 기본 접힘.
- `wrapBreakable(text)`: `` 마커로 ", "/"+ " 뒤만 `<wbr>` 삽입,
  나머지 공백은 `&nbsp;` — 콤마/플러스 뒤에서만 줄바꿈 허용.
- `spec-table.css` `.match-table--preset-guide`: `grid-template-columns:
  1.3fr 1fr 1.7fr`, 셀에 `overflow-wrap: anywhere` 폴백.

### 모달 폭/정렬 (modal.css, split-view.css)
- `.modal-overlay`를 flex → grid로 전환. `grid-template-columns:
  min(1272px, calc(100vw-48px))` 정렬 트랙 + `justify-content: center` +
  `justify-items: start`로, 단일 모달(628px)이든 Split View(1272px)든
  왼쪽 시작 위치 고정. 1272px/628px 근거: `layout.css .content-wrap`
  콘텐츠 폭(1320px - padding 24px×2).
- `.modal`/`.modal--split`/`.split-view__pane` 폭을 전부 고정 px로
  (628px / 1272px / 628px), circular sizing 방지.
- `.split-view__pane`: `flex: 0 1 628px`, 자체 카드 껍데기(배경/테두리/
  그림자/강조선/둥근모서리) 독립 보유, `overflow-y: auto` 독립 스크롤.
- `.split-view__pane .modal__media` 축소 오버레이(140px/110px, margin
  16px) 제거 — 단일 모달과 완전히 동일한 크기(190px/158px)로 통일.

### 커스텀 스크롤바 (modal.js wireScrollbarAutoShow/removeScrollbarTrack)
- webkit `::-webkit-scrollbar-thumb`는 트랙 대비 콘텐츠 비율로 브라우저가
  강제 렌더링해 margin/min-height/`background-clip`+`border` 트릭으로도
  실제 점유 길이를 줄일 수 없었음 — 네이티브 스크롤바(`scrollbar-width:
  none`, `::-webkit-scrollbar { display:none }`)를 완전히 숨기고
  `.modal__scrollbar-track`/`-thumb` 커스텀 오버레이로 교체.
- 트랙은 `document.body`에 직접 append, `position: fixed` +
  `getBoundingClientRect()`로 매 프레임 좌표 계산 — 스크롤 컨테이너
  자식으로 두면 `position: fixed`라도 `scrollHeight`를 부풀리는 문제 발생.
- `root._scrollbarTrack`에 트랙 참조 저장(재사용), `removeScrollbarTrack
  (root)` export — Split View pane1/pane2 생성·해제, `closeModal()`
  시점마다 호출해 고아 트랙 방지.
- `SCROLLBAR_MARGIN=28`(라운드 모서리 회피), `SCROLLBAR_MIN_THUMB=24`,
  `SCROLLBAR_MAX_THUMB=160`(최초 70 → 스크롤량 대비 이동 비율 부자연스러워
  상향).
- `is-visible` 클래스를 `scroll`/`mouseenter`/`mouseleave`(700ms 디바운스
  `_scrollHideTimer`)로 토글, `onXxx` 속성 할당 방식(중복 리스너 방지,
  기존 wire* 패턴과 통일).
- 오픈 애니메이션(`.modal--pop-in`, `modal-pop` 0.18s) 종료 후
  `setTimeout(update, 200)`으로 재계산 — 애니메이션 도중 좌표를 읽으면
  최종 위치가 아닌 중간값이 잡혀 트랙이 살짝 왼쪽에 붙어 보이던 버그 수정.

### Split View 스크롤 위치 유지 (split-view.js)
- `openSplitPane` isFirstOpen 분기: `pane1` 생성 전 `modalEl.scrollTop`
  캡처 → `pane1.scrollTop`에 복원. `removeScrollbarTrack(modalEl)` 후
  `wirePaneInteractions(pane1)`로 pane1 전용 트랙 신규 생성.
- `closeSplitPane2`: **반드시 `modal--split` 클래스 제거 *전*에**
  `pane1.scrollTop` 캡처(클래스 제거 시 즉시 리레이아웃되며 pane1이 아직
  `.split-view` 안에 있어 scrollHeight<=clientHeight로 꺾이는 버그 있었음).
  `removeScrollbarTrack(pane1)` → DOM 이관 → `modalEl.scrollTop` 복원 →
  `wirePaneInteractions(modalEl)`로 modalEl 전용 트랙 재생성.
- `closeModal()`: pane1/pane2 각각 `removeScrollbarTrack` 호출 후 DOM
  정리, 마지막에 `removeScrollbarTrack(modalEl)`.

### 애니메이션 분리 (modal.css, modal.js)
- `animation: modal-pop`을 `.modal` 기본 규칙에서 분리해 `.modal--pop-in`
  전용 클래스로 이동. `openModalWith`만 이 클래스를 붙임 — `modal--split`
  토글 시 `.modal`의 class 변경만으로 애니메이션이 재생돼(Chromium이
  class 변경 시 스타일 재계산 과정에서 animation shorthand를 재적용)
  Split View 여닫을 때마다 카드 전체가 `translateY(8px)→none`으로
  위아래 살짝 움직이던 버그의 원인이었음.

### 헤더 sticky 고정 (modal.css)
- `.modal__head { position: sticky; top: 0; z-index: 4; background:
  var(--panel); }` — 스크롤해도 제품명·태그 영역이 항상 상단 고정.
  불투명 배경 명시 필수(기본 투명 시 본문이 비쳐 보임).

### 배경 스크롤 완전 잠금 (modal.js)
- `document.body.style.overflow = "hidden"`만으로는 `html`이
  `base.css`에서 `overflow-y: scroll`(스크롤바 자리 고정용)로 고정돼 있어
  배경(카드 그리드) 스크롤이 막히지 않던 버그. `openModalWith`/
  `closeModal` 모두에서 `document.documentElement.style.overflow`도
  함께 잠금/해제하도록 수정.

### 모달 재오픈 시 스크롤 리셋 (modal.js)
- `modalEl.scrollTop = 0`을 오버레이가 아직 `display:none`인 시점
  (`modal-overlay--open` 클래스 추가 *전*)에 대입하면 Chrome이 이후 다시
  보이는 순간 이전 스크롤 위치를 복원해 리셋이 무효화되던 버그 — 대입
  시점을 오버레이를 연 *뒤*로 이동.

---

## v1.6 (2026-07-12)

카드 UI 색상 일관성(브랜드색 전면 적용), sticky nav 재구성, match-table
레이아웃 조정, Configurations 표 스피커 이름 자동 병합 기능 신설.

### 앰프 카드 (amplifiers.view.js, amplifiers.controller.js)
- `cardModelLabel(model)`: "LA-RAK II AVB" → "LA-RAK II" (카드 전용 표시,
  `.card__name`), 모달 타이틀은 원래 이름 유지.
- `cardArchitectureLabel(architecture)`: "with bridge mode(s)"·괄호
  부가설명 제거 (카드 전용, `stat-grid__value`).
- `outputParts(a)`: `output4OhmLabel`/`powerTotal`에서 값과 임피던스를
  분리 파싱. "(NΩ)"·"at N ohms" 두 형식 모두 지원, "Up to " 접두사 제거.
  임피던스는 `stat-grid__key-badge`로 "OUTPUT" 라벨 옆에 배지 표시.
- `WATT_RANGE`/`WATT_RANGE_RACK` 두 게이지 스케일 분리, `setWattRange`/
  `setRackWattRange` export. `wattPctFrom0(v, range)`: 0 기준 절대비교
  (`v / range.hi`)로 최종 변경(기존 min-max 상대비교에서 전환).
- `totalWatt4Ohm(a)`: `power4ohms` 없을 때 `powerTotal` 문자열에서 총
  와트 숫자 파싱하는 fallback 추가(LA-RAK III/II AVB 대응).
- `cardHTML`: `isRack = a.type === "Rack"` 분기로 `.spl-meter--rack`
  클래스 및 `WATT_RANGE_RACK` 적용.
- `la.data.js`: LA-RAK II AVB `architecture`를 `"12 channels of
  amplification"` → `"3 x LA12X (12 channels of amplification)"`.
- `configsBySpeakerTableHTML(rows)`: 스피커 이름 유사성 + 설정 데이터
  (`mode/preset/perCh/total/spl`) 완전 일치 시 그룹 병합.
  - `isPrefix` (startsWith 접두사): K3/K3i, SB18/SB18 IIi, Soka/Soka
    inWall.
  - `findSingleIInsertionIndex`: "i" 한 글자가 문자열 중간에 삽입된
    관계 감지 — A10 Focus/A10i Focus, A15 Wide/A15i Wide 등 A시리즈.
  - `isTrailingRIVariant`: 길이 동일 + 마지막 글자만 r↔i 치환 —
    SB10r/SB10i, SB6r/SB6i, X4r/X4i 이름 패턴만 추가(단, 실측 결과
    이 세 페어는 i버전에만 LA1.16i 매칭 항목이 더 있어 `rowsSignature`
    불일치로 실제로는 병합되지 않음 — 사용자 확인: "완전 일치할때만
    병합").
  - 병합 그룹은 `nameParts` 배열(`{text, id}[]`)로 이름을 파트별로
    분리 보관 — 렌더링 시 각 파트가 독립된 `data-speaker-id`를 가진
    `<span class="match-table__model-name-part">`로 출력되어, "K3"
    파트 클릭 시 K3 상세로, "(i)" 파트 클릭 시 K3i 상세로 각각 이동.
  - `amplifiers.controller.js` `wireAmpModalSpeakerClicks`: 파트 클릭
    시 `e.stopPropagation()`으로 부모 행(`match-table__row--clickable`)
    리스너 중복 실행 방지, `sid === "null"` 가드로 id 없는 공통 텍스트
    파트(base) 클릭 무시.
  - **[버그 수정] 오탐 방지**: 전체 스피커 이름(약 44개) 전수
    pairwise 검증 결과 순수 `startsWith` 접두사 조건만으로는
    "K1"↔"K1-SB", "L1"↔"L1D", "L2"↔"L2D", "Syva"↔"Syva Low"/"Syva
    Sub"처럼 실제로는 별개 제품인데 병합 후보가 되는 케이스 5건 발견.
    `isPrefix` 판단을 "접두사 뒤 나머지가 빈 문자열, 'i'로 끝나는
    표기(`/i$/`), 또는 'inWall'일 때만" 허용하도록 좁혀 수정
    (`prefixSuffix` 변수 도입). K3/K3i, SB18/SB18 IIi, Soka/Soka
    inWall, Kara II/IIi, KS21/KS21i, X8/X8i 등 정상 케이스는 그대로
    유지, 5건의 오탐 후보는 제외됨을 스크립트로 재검증 완료.
    rowsSignature(데이터 완전 일치) 조건이 이미 최종 방어선이었지만
    이름 패턴 단계에서도 걸러지도록 이중 안전장치 추가.

### 스타일 강조색 전역 → 브랜드색 전환 (전 도메인)
- `dsps.view.js`, `software.view.js`, `accessories.view.js`,
  `speakers.view.js`: `stat-grid__value--accent` → `stat-grid__value
  --mfr` (Inputs/Outputs, Price, Compatible, Amp 모델명, Self-Powered).
- `card.css`: `.stat-grid__value--mfr { color: var(--mfr, var(--accent)); }`
  신규.
- `spec-table.css`: `.section-label { color: var(--mfr, var(--accent)); }`,
  `.freq-badge { color/background/border: var(--mfr, ...) 기반 }` 로 전환.
- `.section-label--toggle`: `font-family: inherit; font-weight: 700;`
  (fontsize 부작용 있던 `font: inherit` 시도 후 `font-family`만으로 축소).

### tokens.css
- `--gauge-amber-start/end`, `--gauge-rack-start/end`,
  `--card-media-start`, `--card-media-bg` 변수 신설(다크/라이트 각각).
- `--la`: 다크/라이트 모두 최종 `#FFB020`(전역 `--accent`와 동일 톤,
  match-table 모델명 색상 기준과 통일). 라이트모드 대비 낮음(bg 1.69:1
  / panel 1.83:1, WCAG 미달) — 주석에 명시.

### nav / sticky header (신규 파일 포함)
- `js/ui/sticky-header.js`(신규): `initStickyHeader(topnavEl)` —
  topnav 높이를 ResizeObserver로 실측해 `--topnav-h` CSS 변수 갱신.
- `js/ui/nav.js`: `renderNav()`에 `topnav__row`(`topnav__inner` +
  `topnav__tools`) 구조 추가, 사진/다크모드 토글 버튼을 topbar에서
  이곳으로 이동.
- `js/ui/media-toggle.js`(신규): `body.hide-media` 클래스 토글,
  localStorage(`mr-hide-media`) 저장.
- `main.js`: `initTheme`/`initMediaToggle` 호출을 `renderNav()` 이후로
  재배치(버튼이 renderNav가 생성한 뒤에 존재).
- `nav.css`: `.topnav { position: sticky; top: 0; z-index: 41; }` 유지,
  topbar는 sticky 원복(`layout.css` `position: relative`).
- `controls.css`: `.controls { top: var(--topnav-h, 45px); }`,
  `.search-box { flex: 1; }`.

### match-table 레이아웃 (spec-table.css)
- `.match-table__row { grid-template-columns: 1.3fr .5fr 1.15fr .68fr
  .68fr .7fr; }` (Preset 열 확장, Mode 열 축소, 스피커 모달 Amplifier
  Matching 표).
- `.match-table--amp-view .match-table__row { grid-template-columns:
  1.5fr .45fr 1.25fr .6fr .6fr .65fr; }` (앰프 모달 Configurations 표,
  Speaker/Preset 열 모두 확장).
- `.match-table__model-name-part:hover { text-decoration: underline;
  text-decoration-color: var(--accent); }` (병합된 이름 파트 개별
  클릭 가능 표시, 신규).

### 사진 교체 (원본 아카이빙 + webp 반영 동시 처리)
- 원본: `raw-data/raw-images/la/speakers/k-series/`(K3i, K3),
  `raw-data/raw-images/la/speakers/a-series/`(A10i Focus/Wide, A15i
  Focus/Wide).
- 반영본: `assets/img/speakers/la/k-series/spk-la-k3i.webp`,
  `spk-la-k3.webp`, `assets/img/speakers/la/a-series/spk-la-a10i-
  focus.webp`, `spk-la-a10i-wide.webp`, `spk-la-a15i-focus.webp`,
  `spk-la-a15i-wide.webp` (PIL `.convert("RGBA")` 후 webp 저장, 전부
  alpha=0 투명 배경 확인).

### card-grid.js
- 그룹 섹션 접기/펼치기: `collapsedGroups` 모듈 전역 `Set`,
  `<section class="card-group">` → `<button class="card-group__head">`
  로 감싸 클릭 시 `.card-group--collapsed` 토글. 전 도메인(스피커/앰프/
  DSP/소프트웨어/액세서리) 공통 적용.

## v1.5 (2026-07-10)

L-Acoustics 원문 스펙 아카이브(`raw-data/raw-specs/`) 구축 세션. K Series
전체 원문 확보·검증, 라인업 공용 참조 문서(Amplification Reference,
Preset Guide) 정리, 코드 변경 없음(문서 전용 세션).

### 추가 — K Series 원문 스펙 정리
- K1/K1-SB/K2/K3/K3i/Kara II/Kara IIi/Kiva II 8개 모델의 공식 docx
  스펙시트 + 사용자 채팅 제공 텍스트를 `raw-data/raw-specs/la/speakers/
  k-series/*.md`에 "## 출처 1"/"## 출처 2" 구조로 병합 보관(원본 docx도
  같은 폴더에 함께 보관).
- K3i·Kara IIi의 물리 스펙(weight/dims/connectors/ip/transducers)이
  기존에 K3/Kara II와 동일할 것으로 추정해 `null`로 비워뒀던 부분을
  전용 스펙시트 기준 실측값으로 채움(`k-series.data.js`). 두 install
  버전은 원본과 인클로저 자체가 달라 치수/무게가 상이함을 확인.
- 출처 간 수치 불일치 발견 시 임의로 하나를 취사선택하지 않고 각주로
  기록(예: Kara II depth 383mm(docx) vs 500mm(채팅 텍스트) — 기존
  data.js 값(500mm) 유지로 확정).
- `raw-data/raw-specs/README.md`의 "역재구성본 예외" 목록에서 K Series
  8개 모델 전체를 정상 상태로 갱신.

### 추가 — A10i/A15i/KS21i/SB18 IIi 원문 스펙 확보 및 물리 스펙 반영
- A10i Focus/Wide, A15i Focus/Wide, KS21i, SB18 IIi 6개 모델의 공식
  스펙시트(A10i_AE_EN.docx, A15i_AE_EN.docx, KS21i_AE_EN.docx,
  SB18_IIi_AE_EN.docx)를 확보. `raw-data/raw-specs/README.md`의
  "역재구성본" 상태였던 해당 6개 `.md` 파일을 원본 docx 보관 + "## 출처
  1" 구조의 정식 정리본으로 교체(원본 docx도 각 시리즈 폴더에 함께
  보관: `a-series/`, `subwoofers/`).
- 6개 모델의 물리 스펙(weight/dims/connectors/ip/transducers)이
  기존에 `null`로 비어 있던 부분을 전용 스펙시트 기준 실측값으로
  채움(`a-series.data.js`, `subwoofers.data.js`). KS21i(46kg,
  752×569×602mm)·SB18 IIi(48kg, 701×540×728mm)는 각각 비-install
  버전(KS21 49kg/764×571×601mm, SB18 52kg/750×553×707mm)과 무게·치수가
  달라 별개 인클로저 실측치임을 확인. connectors 필드도 비-i 모델의
  "speakON" 대신 스펙시트 기재값인 "4-point terminal block with
  push-in connection"으로 통일 반영.

### 추가 — S Series 원문 스펙 확보 및 데이터 수정, Soka inWall 신규 카드
- Soka/Syva/Syva Low/Syva Sub 4개 모델의 공식 스펙시트
  (Soka_AE_EN.docx, Syva_AE_EN.docx, Syva_Low_AE_EN.docx,
  Syva_Sub_AE_EN.docx) + 사용자가 채팅으로 제공한 L-Acoustics 공식
  홈페이지 텍스트(Electroacoustic/Physical specs 형식)를 확보.
  `raw-data/raw-specs/README.md`의 "역재구성본" 상태였던 4개 `.md`를 "## 출처
  1"(docx)/"## 출처 2"(홈페이지 텍스트) 구조로 교체(원본 docx도
  `s-series/`에 함께 보관).
- **Syva Low dims 버그 수정**: 기존 data.js에 `"334 x 549 x 350 mm"`로
  잘못 입력돼 있던 것을 확인. 두 원본 docx(Syva Low·Syva Sub) 모두
  `849 x 334 x 350 mm`로 일치하고, 사용자 제공 홈페이지 텍스트의
  "549 mm (33.4 in)" 표기는 자체 모순(549mm=21.6in ≠ 33.4in, 반면
  849mm=33.4in 정확히 일치)임을 계산으로 확인해 `849 x 334 x 350 mm`로
  수정.
- **connectors 출처 우선순위 원칙 확정**: Soka의 connectors가 출처마다
  다름(docx: "terminal block with push-in connection" vs 홈페이지
  텍스트: "4-point screw terminal", 기존 data.js와 일치). 사용자 확인
  결과 홈페이지 텍스트(Electroacoustic/Physical specs 형식)가 제조사가
  유일하게 제공하는 최신 공식 자료이므로 이후 이런 형식의 텍스트를
  docx보다 우선 채택하기로 확정 — `CLAUDE.md`에 "출처 신뢰도 우선순위"
  섹션으로 규칙화.
- **Soka inWall 신규 카드 추가**: 사용자가 제공한 홈페이지 텍스트에서
  Soka inWall의 weight(11.7kg)가 Soka(9.4kg)와 다른 것을 발견 — 별도
  SKU로 판단해 `spk-la-soka-inwall`을 s-series.data.js에 신규 추가(음향
  스펙은 Soka와 동일, weight만 다름). 기존 Soka 카드에 있던 "Install
  (In-Wall)" 뷰 이미지가 실제로 이 신규 카드의 사진인지는 사진 검증
  작업 시 재확인 필요(notes 필드에 남겨둠) — 이번 세션은 사용자 요청대로
  데이터만 먼저 반영, 이미지 작업은 보류.

### 수정 — S Series 카드 정렬 순서
- `speakers.controller.js` `sortWithinGroup`(약 150줄)에 Soka 예외 조건
  추가. 기존 로직(저역 드라이버 lowInch 큰 순)만으로는 Soka(3.5")가
  Syva(5")보다 뒤로 가지만 Syva Low/Syva Sub(둘 다 type: "Subwoofer")
  보다는 앞서 표시됐음. 사용자 요청으로 Soka를 이름 기준 예외 처리해
  항상 그룹 맨 뒤로 — 최종 순서 Syva → Syva Low → Syva Sub → Soka.
- Soka inWall 카드 추가 후 조건을 `a.name === "Soka"`에서
  `a.name.startsWith("Soka")`로 변경 — Soka 계열(Soka, Soka inWall)이
  전부 그룹 맨 뒤로 가고, 계열 내부는 이름순 정렬(localeCompare)로 Soka
  → Soka inWall 순서가 자연스럽게 유지됨. 최종 순서 Syva → Syva Low →
  Syva Sub → Soka → Soka inWall.

### 추가 — 라인업 공용 참조 문서 (`raw-data/raw-specs/la/references/`)
- 신규 `references/` 폴더 관례 도입: 특정 모델이 아닌 라인업 전체에
  걸친 technical bulletin류는 원본 파일 + 마크다운 정리본을 나란히 보관.
- **Amplification Reference TB v16.0**: Impedance load, Drive capacity,
  Max SPL 표를 pdfplumber로 셀 경계선(도형 좌표) 재추출·검증. 1차
  추출에서 SPL 표의 LA4X 컬럼이 누락됐던 문제와, PDF상 시각적으로
  병합된 셀(LA7.16(i)/LA12X 등)을 행마다 개별 검증해 병합 여부에 따라
  동일 값을 각 컬럼에 복제하거나 원래 값대로 분리 처리(K1/K1-SB/KS28/
  L2/L2D/CS1 일부 행은 실제로 컬럼이 분리되어 있음을 확인).
- **Preset Guide (owner's manual EN v29.0, 126p)**: 목차/개정이력/
  preset design 요약/Impedance·Drive·SPL 크로스레퍼런스만 `preset-guide-
  en.md`에 남기고, 시리즈별 프리셋 구성표(loudspeaker configuration/
  preset/acoustic properties, -10dB 대역폭 등)는 `presets/` 하위에
  기존 `speakers/` 시리즈 폴더명과 동일하게 폴더링(k-series/a-series/
  l-series/s-series/x-series/subwoofers/legacy)해 모델별 파일 20개로
  분리.

### 추가 — LA-RAK III System Elements(연관 액세서리) 모달 반영
- 원문 데이터(사용자가 채팅으로 제공한 L-Acoustics 카탈로그 목록 텍스트,
  Rigging 3종 + Cables 22종 총 25개)를 기존 단일 파일
  `raw-data/raw-specs/la/accessories/system-elements.md`에서
  `rigging.md`/`cables.md` 두 파일로 분리 보관(기존 파일은 그대로 유지).
- `amplifiers.view.js`에 `systemElementsHTML(accessories)` 함수 추가 —
  연관 액세서리를 type(Rigging/Cables)별로 그룹핑해 `.chip` 버튼
  (`data-accessory-id`)으로 렌더링. `rackBodyHTML()`/`modalBodyHTML()`에
  `relatedAccessories` 매개변수 추가.
- `amplifiers.controller.js`에 `relatedAccessoriesOf(a)`(cross-ref의
  `findAccessoryById`로 `a.rack.relatedAccessoryIds` 해석) +
  `wireAmpModalAccessoryClicks(amp)`(칩 클릭 → `accessories.view.js`의
  `modalBodyHTML` → `openSplitPane`, 스피커↔앰프 Split View와 동일 패턴)
  추가.
- `spec-table.css`에 `.system-elements__group`/`.system-elements__group-
  label` 최소 스타일 추가.
- [사용자 요청 반영] System Elements 섹션을 모달 최상단(General 위)으로
  이동하고, 기존 Configurations 섹션과 동일한 `section-label--toggle`/
  `data-section-toggle` 패턴(기본 접힘)을 적용 — 클릭 배선은
  `js/ui/modal.js`의 `wireSectionToggle` 공통 로직이 도메인 무관하게
  처리하므로 마크업만 패턴에 맞춤(컨트롤러 추가 수정 불필요).
- LA-RAK III에서 브라우저 실제 동작 확인 완료(사용자 확인).

## v1.4 (2026-07-09)

preset_guide_EN.pdf(v29.0) 기반 install 버전(i-suffix) 신규 카드 6개 추가,
Upload 폴더 이미지 대량 반영, 모달 이미지/토글 확대 상호작용 버그 수정,
카드 UI 정리(배지 축약·정렬 순서·태그 줄바꿈) 위주 세션.

### 추가 — 신규 카드 6개 (install 버전)
- **A10i Focus/Wide, A15i Focus/Wide, K3i, Kara IIi, KS21i, SB18 IIi**를
  각각 원본 제품(A10/A15/K3/Kara II/KS21/SB18)과 별도 카드로 신규 등록.
  PDF에 "동일 인클로저의 설치용(install) 버전 — 팩토리 프리셋·앰프 매칭
  공유"로 명시된 근거에 따라 핵심 스펙(lowInch/lowQty/crossover/type/cov/
  freqs/spl/amps/ampRaw/watt)은 원본과 동일하게, 물리 스펙(무게/치수/
  커넥터/IP/트랜스듀서)은 미확인 상태로 `null`(카드에는 "—" 표시) 처리.
  SB18 IIi는 SB18(i/m)과 다른 신규 프리셋 계열([SB18_100])이지만 drive
  capacity 표에서 동일 행으로 병기되어 앰프 매칭 값은 SB18과 동일하게
  반영.
- 6개 카드 모두 대표 이미지 확보(어워드 배지 제거+크롭) 및 K1 패턴과
  동일한 Array 추가 뷰 반영 완료.

### 추가 — 기존 카드 이미지/뷰 대량 보강
- **X8i 신규 카드**(전 세션 시작, 이번 세션에서 이미지 순서 정리):
  Front(Black) → Rear(White) → Front(White) 뷰 순서로 확정.
- SB10i/SB6i: Rear + Front(White) 뷰 추가, SB10i는 이후 더 고해상도의
  검정 정면 사진으로 대표 이미지 교체.
- SB10r/SB6r/X4r: Install(In-Tile/In-Wall) 뷰 추가.
- Soka/SB6i/SB10i/X4i: Install(In-Situ, 실제 벽 시공 장면) 뷰 추가.
- X4i/X6i: White 컬러 Front(/Rear) 뷰 추가.
- L2/L2D: Rear + Single Unit(+Array, L2만) 뷰 추가(대표 이미지는 기존
  array 컷 유지).
- CS1: Rear 뷰 신규 추가 — 원본이 흰 배경 스튜디오 사진이라 배경 제거
  과정에서 여러 차례 시행착오(임계값 기반 방식은 바닥 그림자가 배경과
  밝기 차이가 작아 깨끗이 안 지워짐) 끝에, 스피커 실루엣을 좌표로 직접
  지정한 다각형 마스크 방식으로 최종 해결.
- A10/A15(Focus/Wide 전체), K2/K3/Kara II/Kiva II/K1-SB: 기존 카드에
  Array 추가 뷰 반영(Upload의 번들 렌더 활용, K1 Front/Array 패턴 재사용).

### 버그 수정 — 모달 이미지 확대(hover-zoom) ↔ Front/Rear/Array 토글
- 여러 라운드의 반복 진단 끝에 확정된 최종 동작: 사진 배경 그라디언트는
  `.modal__media-wrap` 전체(사진+토글 바)에 걸쳐 끊김 없이 이어지고,
  이미지 확대 시에도 토글 바 영역까지 자연스럽게 퍼져 보이되(의도된
  동작), 토글 버튼은 `z-index`로 항상 그 위에 떠서 가려지지 않고
  클릭 가능해야 한다는 요구사항으로 정리됨.
  - `.modal__media`에서 `overflow:hidden` 제거, 클리핑 책임을
    `.modal__media-wrap`으로 이전.
  - `.modal__view-switch`에 `position:relative; z-index:1` 추가.
  - `.modal__view-btn.is-active`의 배경색(`--panel-3`) 제거 — 활성
    토글도 배경이 불투명하면 확대된 이미지가 그 뒤로 비치지 않는
    문제가 있어, 활성 여부는 글자색+테두리만으로 구분하도록 변경.
  - Split View 파트(`split-view.css`)도 동일 구조 유지 확인.

### 개선 — 카드 UI
- **카드 배지 축약**: 모달(`titleTagsHTML`)은 `crossoverTags` 원본을
  그대로 보여주지만, 카드는 새 `cardTagsHTML` 헬퍼로 축약본을 쓰도록
  분리. 괄호 상세 제거(예: `"passive (side LF+MF+HF)"` → `"passive"`),
  `"1ch"`처럼 정보 가치 낮은 단독 태그 생략, `wayCount`(예: `"3-way"`,
  `normalizeCrossover`가 파생) 추가, active 계열 태그가 있으면 중복되는
  `"passive"` 단독 태그는 제거(d&b GSL/KSL/XSL 시리즈처럼 액티브 분할+
  수동 인클로저가 혼재된 경우).
  - 원인이었던 버그: `.card__name-tags`에 `min-width:0`이 없어 긴 배지
    (`"passive (front+rear cardioid)"` 등)가 부모 폭을 밀어내며 카드
    경계와 겹쳐 보이던 문제도 함께 수정(`card.css`).
- **앰프 카드 정렬 순서 커스텀화**: 기본 정렬이 알파벳순
  (LA1.16i/LA12X/LA2Xi/LA4X/LA7.16)이던 것을, 사용자 요청에 따라
  `LA7.16 → LA1.16i → LA12X → LA4X → LA2Xi` 고정 순서로 변경
  (`amplifiers.schema.js`의 `compareModel`, "제조사/타입별" 기본 그룹
  정렬(`amplifiers.controller.js` groupBy.sortWithinGroup)에도 동일하게
  반영해야 실제로 화면에 적용됨 — 스키마만 고치고 컨트롤러의 하드코딩된
  `sortWithinGroup`은 놓치기 쉬운 지점이었음).

## v1.3 (2026-07-08)

### 버그 수정 — Amplifier Matching 표 이름 잘림
- 스피커 모달의 Amplifier Matching 표에서 클릭 가능한 행(화살표 ›)이면서
  설정이 여러 개(+N 토글 배지)인 경우, 이름+배지+화살표가 한 셀에 모두
  들어가면서 "LA1.16i +1 ›"가 "L… +1 ›"로 잘리는 문제 수정(5XT 프리셋
  등). `spec-table.css` `.match-table__row` 기본 그리드 비율을
  `.85fr .68fr 1.35fr .68fr .68fr .7fr` → `1.3fr .68fr .9fr .68fr .68fr
  .7fr` 로 조정(모달 폭 600px 기준 표 폭 552px 실측 — 이름(7자 bold)+
  gap+토글배지(26px)+gap+화살표가 함께 들어가려면 Amplifier 열이
  최소 133px는 필요한데 1차 수정(1.05fr, 실폭 117px)로는 여전히
  부족해 재조정. Amplifier 열 실폭 ≈145px 확보, 그만큼 Preset 열에서
  가져옴. `match-table--amp-view`/`--cols-3` 변형자는 별도 규칙이라
  영향 없음.

## v1.2 (2026-07-05)

개선사항 문서(v4) Step 1~4 적용 + 사용자 요청 2건(브랜드 색 로고 기준 확정,
Amplifier Matching +N 토글 전면 적용·Split View 사진 소실 버그 수정).

### 앰프 데이터 전체 리뉴얼 (통일 스키마)
- LA1.16i/LA12X/LA4X/LA7.16(`la.data.js`), D90(`db.data.js`) 5개 앰프
  레코드를 사용자가 원래 제공한 스펙 텍스트 기준으로 처음부터 재작성 —
  두 브랜드가 완전히 동일한 필드 집합(mains/io/output/dsp/ecosystem/
  features/note/circuitProtection/interfaceInfo/gpio/dimensions 등)을
  갖도록 통일. 데이터 없는 필드는 전부 `null` 로 명시(이전에는 필드
  자체가 누락되어 브랜드 간 모달 섹션 구성이 달라 보였음).
- 중복 필드 정리: `thirdPartyManagement` 가 `ecosystem.integrations` 와
  완전히 같은 값을 담고 있던 것을 확인, `thirdPartyManagement` 를
  제거하고 `ecosystem.integrations` 하나로 통일.
- `dimensions` 필드를 스피커와 동일하게 `{mm, in}` 구조로 변경, D90의
  기존 문자열("2 RU x 19" x 512 mm / 20.2"")을 분해해 반영. LA 4개
  앰프는 원본 스펙에 치수 정보가 없어 `null` 유지.
- **앰프 모달에 Weight(kg/lb)·Dimensions(mm/in) 토글 추가** — 스피커
  모달과 동일한 `.dims-unit-switch` 패턴 재사용(`amplifiers.view.js`
  physicalRows). 버튼 배선은 `modal.js` 의 `wireDimsUnitSwitch`/
  `wireWeightUnitSwitch` 가 도메인 구분 없이 공통 처리하므로 마크업만
  추가.
- `a.gpio` 필드를 Connections & Output 섹션에 렌더링 추가(기존에는 데이터는
  있어도 화면에 안 보이던 필드).
- 모달의 "Matched Speakers (N)" 레이블 줄 제거 — 바로 아래 Configurations
  토글에서 동일 정보를 이미 확인할 수 있어 중복이었음(칩 목록 자체는 유지).

### 추가
- **LA12X 앰프 신규 등록**: 사용자 제공 공식 스펙 텍스트(Amplification and
  power supply / DSP / Inputs / Outputs / Circuit protection / Interface /
  Remote control / Physical data)를 LA1.16i 와 동일한 상세 필드 구조로
  매핑해 `js/domains/amplifiers/data/la.data.js`에 추가(id `amp-la-la12x`,
  4채널·Class D·IP20·2U·14.5kg). 기존 필드로 표현이 안 되는 항목(2.7Ω/4Ω/8Ω
  3단 임피던스별 출력, 회로 보호 mains/power-output 구분, 인터페이스
  display/navigation 구분)은 새 필드(`output.powerByOhm`,
  `circuitProtection`, `interfaceInfo`)로 우선 보존 — 아직 뷰에 렌더링
  연결은 안 돼 있고(`note.protection`/`note.interface` 문자열 요약으로는
  화면에 나옴), 추후 다시 정리 예정. `output.powerByOhm`만
  `amplifiers.view.js`의 badgeListHTML(스피커 wattByBand 와 동일한 배지+값
  리스트 패턴)로 렌더링 연결함 — Connections & Output 섹션에 "Output Power
  (All Channels Loaded)" 행으로 표시. 이미지(`views`)는 아직 없어 빈 배열로
  둠(카드/모달 모두 이미지 영역 자동 생략).
  참고: 스피커 데이터(a/k/s-series, subwoofers, x-series) 30곳에서 이미
  "LA12X"를 앰프로 참조하고 있었는데 앰프 레코드 자체가 없어 매칭이 항상
  실패했었다 — 이번 추가로 `resolveAmpIdForModel` 매칭이 정상 작동해
  Amplifier Matching 표·Matched Speakers 칩이 모두 채워진다(부수 효과,
  스피커 데이터는 건드리지 않음).
- **LA4X, LA7.16 앰프 신규 등록**: 사용자 제공 스펙을 동일한 패턴으로 추가
  (`amp-la-la4x`, `amp-la-la7dot16`). LA4X 는 4채널·4/8Ω 동일 출력(4x1000W),
  LA7.16 은 16채널·High-efficiency Class D·4/8/16Ω 3단 출력(powerByOhm)·
  32A powerCON·GPIO 등 상세 스펙 반영. 스피커 데이터에서 각각 25곳, 28곳
  참조 중이었던 매칭도 이번 등록으로 활성화됨(LA12X 와 동일한 부수 효과).
- **앰프 `architecture` 필드 추가**: LA12X/LA4X/LA7.16 공통으로 제공된
  "4 x 4"/"16 x 16" 같은 라우팅 아키텍처 표기를 위해 신규 필드 추가,
  카드 stat-grid 의 Usage 칸을 Architecture 로 교체(아래 변경 항목 참고).
- **LA12X 제품 사진 3장 추가**: 사용자 제공 Front/Rear/Perspective 이미지를
  투명 배경 트리밍 후 webp 로 변환해 등록(`assets/img/amplifiers/la/
  amp-la-la12x-{front,rear,isometric}.webp`), `views` 배열 연결. LA1.16i 와
  같은 Front/Rear/Isometric 전환 버튼이 카드·모달에 자동으로 생김.
- **LA1.16i 아이소메트릭 사진 교체**: 기존 이미지가 배경이 어색해 사용자
  제공 새 이미지로 교체(투명 배경 트리밍 후 webp 변환, 동일 경로
  `amp-la-la1dot16i-isometric.webp`에 덮어씀).
- **LA1.16i Front/Rear 사진 화질 개선**: 사용자가 더 높은 해상도의 렌더
  소스를 제공해 기존 Front/Rear webp 를 덮어씀(투명 배경 트리밍 동일 처리).
- **앰프 카드 4Ω 기준 Total Watt 게이지**: 스피커 탭의 SPL 바(spl-meter)와
  동일한 시각 언어로, 앰프 카드에도 4Ω 기준 총 출력(N×W)을 게이지로 표시.
  `output.power4ohms`("16 x 160 W" 등 "N x W" 문자열)를 정규식으로 파싱해
  총 와트를 계산하는 `totalWatt4Ohm()`을 신규 추가, 필드가 없는 LA12X는
  `output.powerByOhm`에서 "4 Ω" 항목을 찾아 대체 사용. 스피커의
  setSplRange/splPct 와 동일한 패턴으로 `setWattRange`/`wattPct`를
  `amplifiers.view.js`에 추가하고 `amplifiers.controller.js`의
  `buildAmplifiersUI`에서 전체 앰프 min/max 로 스케일 설정.
- **d&b D90 앰프 전면 재작성**: 기존 D80/D90/D40/40D(레거시 단순 스키마 —
  channels/powerClass/connectivity/configs 뿐인 자리표시 데이터) 4개를 모두
  삭제하고, 사용자 제공 d&b 공식 제품 페이지 스펙(Amplification/DSP/
  Connectors/Circuit protection/Interface/Physical data)으로 D90 하나만
  LA1.16i 와 동일한 상세 필드 구조로 새로 작성(`amp-db-d90`, 4채널·Class D·
  4x5400/2700W at 4/8Ω·2U·18.8kg). 기존 D80/D40/40D 에 걸려 있던
  relations.speakerIds 매칭도 함께 삭제됨(사용자 확인 후 진행, 추후
  스피커 매칭 데이터 재확정 필요).
- **LA4X 상세 스펙 보강**: 기존에 architecture/output 정도만 있던 LA4X를
  사용자 제공 상세 스펙(DSP SHARC 32-bit, Milan-AVB/AES-EBU/analog 입력,
  IP30, 2U, 11.3kg/24.9lb, circuit protection, interface 등)으로 전면
  업데이트(`amp-la-la4x`).

### 변경
- **앰프 카드 이름 옆 태그: Connectivity 만 표시**: 스피커 카드의
  name-row+태그(nameTags) 패턴을 앰프에도 적용하되(`ampTagsHTML`), 처음엔
  Type+Connectivity 를 함께 넣었다가 사용자 요청으로 Type("Amplified
  Controller" 등)은 빼고 Connectivity(AES3/Milan-AVB/AES67/analog 등)만
  남김 — 태그 줄이 이름과 다른 줄로 크게 벌어지는 문제 완화 목적도 겸함.
- **카드 이름 태그(.card__name-tag) 크기 축소**: 앰프 카드는 태그가 최대
  4개까지 붙어 스피커 카드보다 한 줄에 들어가야 할 텍스트가 많다 — 패딩
  (2px 7px→1.5px 5px)·폰트(9.5px→8.5px)·태그 간 gap(4px→3px) 축소로 한 줄에
  들어갈 확률을 높임(`card.css`, 스피커/앰프 공용 클래스라 양쪽 다 적용).
- **앰프 카드 세로 높이를 스피커 카드에 맞춤**: 두 카드의 콘텐츠 블록 수가
  달라(스피커: eyebrow/name-row/config/spl-meter/stats 5블록, 앰프는
  기존 eyebrow/name/stats 3블록) 세로 크기가 서로 달랐다. 이름 옆 태그 줄
  (위 항목)과 4Ω Total Watt 게이지(아래 항목)를 추가해 4블록으로 늘리고,
  남는 차이(스피커의 config 배지 한 블록 분)만 `.card__body--amp`
  min-height 로 보정(`card.css`).
- **앰프 카드 stat-grid: Usage → Architecture**: configs 없는 앰프
  (LA12X/LA4X/LA7.16 등) 카드에서 "Installation only"처럼 긴 값이 잘리던
  Usage 칸을 Architecture(예: "4 x 4")로 교체. Usage 필드 자체는 삭제하지
  않고 모달 General 섹션에는 그대로 남아 있음(`amplifiers.view.js`
  cardHTML). Output 값("4 x 3300 W(2.7Ω)" 등)도 세 칸 중 가장 길어
  말줄임으로 잘리는 문제가 있어, 단위를 "ohms"→"Ω" 기호로 줄이고 "at 2.7
  ohms"를 "(2.7Ω)"로 압축했음에도 여전히 잘려 stat-grid 전용 변경자
  `.stat-grid--amp`(그리드 비율 .8fr 1.7fr .6fr, `card.css`)를 추가해
  Output 칸을 넓힘.
  - `.stat-grid--amp` — 세 칸 중 Output 이 가장 길다는 전제로 Architecture/
    Channels 칸 폭을 줄여 Output 에 배분.
- **앰프 모달 "Mains" 섹션 → "Power"로 개명**: Rating/Connector/Power
  Supply/External DSP Backup/Power Requirements 를 담는 섹션이 "Mains"
  라는 이름이 전원 전반을 아우르기엔 좁아 보여 "Power"로 변경
  (`amplifiers.view.js`, 내부 변수명 `mains`/`mainsRows`는 유지).
- **앰프 모달 Configurations 섹션 기본 접힘(토글)**: 카드를 눌러 모달을
  열면 "Configurations" 표가 항상 펼쳐져 있어 스크롤이 길었는데, 이제
  section-label 자체를 클릭 가능한 토글 버튼으로 바꿔(화살표 아이콘 포함)
  기본 접힘 상태로 시작하고 클릭 시 펼쳐지도록 변경. 표 안의 개별 행
  펼치기(+N)와는 별개의 상위 레벨 토글(`data-section-toggle`/
  `data-section-toggle-body`, `modal.js`의 `wireSectionToggle` 신규 추가,
  `spec-table.css`의 `.section-label--toggle`).
- **스피커 카드 사진 위 Type 배지 제거**: 카드 사진 우상단의
  `.card__type-badge`(예: "Line Array")가 이름 옆 태그(`card__name-tags`,
  titleTagsHTML)와 완전히 같은 정보를 중복 표시하고 있어 사진 위 배지를
  제거(`speakers.view.js` cardHTML). dsps/software 도메인은 동일 클래스를
  계속 쓰므로 CSS(`card__type-badge`)는 그대로 유지.

### 버그 수정
- **Split View pane 2 인터랙션 무반응 (0-1)**: `wireViewSwitch`·
  `wireDimsUnitSwitch`·`wireMediaZoom`·`+N 토글`이 `openModalWith()`에서만
  배선돼 pane 2(스피커↔앰프 교차 상세)의 뷰 전환·mm/in·줌·펼치기가 전부
  죽어 있었다. 네 배선을 `wirePaneInteractions(root)`로 묶어 export
  (`js/ui/modal.js`)하고 `openSplitPane()`이 pane 2 생성 직후 호출.
  도메인 고유 배선은 새 `onMounted(pane2El)` 콜백으로 전달
  (`speakers.controller.js` 의 스피커 칩 배선). +N 토글 배선은
  amplifiers.controller 전용 `wireAmpConfigsToggle()`을 modal.js 의
  `wireConfigsToggle(root)`로 승격(도메인 무관, root 범위 탐색).
- **Split View 진입 시 모달 사진 소실**: pane 1 래핑 시 `.modal__head` 와
  `#modal-body-main` 만 골라 옮기고 그 사이의 `.modal__media(-wrap)` 은
  버려져, 스피커 모달에서 앰프 행 클릭 시 사진이 사라졌다. 모달의 모든
  자식을 순서 그대로 pane 1 로 이동하도록 수정(`js/ui/split-view.js`).

### 변경
- **Inter-element Splay 를 Horizontal 과 같은 행에 배치**: splayList 가
  있는 스피커(K2 등)는 Splay 행이 `--full`(혼자 한 행)이라 Horizontal 과
  분리돼 있었는데, splayList 가 없는 스피커(L2 등, Horizontal+Vertical 이
  이미 한 행에 나란히 배치)와 동일한 패턴으로 통일 — Splay 도 half 로
  바꿔 Horizontal 과 같은 행에 오도록 변경(`coverageRows`, 각도 값이 많아
  길어지는 경우는 기존 word-break 로 자연 줄바꿈).
- **Physical+Connectivity → General 섹션 통합**: Physical(Dimensions/Weight/
  IP Rating) 과 Connectivity(Connectors) 를 하나의 "General" 섹션으로 합침
  — 각 섹션 항목이 1~2개뿐이라 나눌 실익이 적고, 합친 뒤에는 "Physical"
  이라는 이름이 Connectors 까지 아우르기 어색해 더 포괄적인 이름으로 교체
  (`speakers.view.js` modalBodyHTML, `generalRows`).
- **Dimensions/Weight/IP Rating 3분할 한 행 배치**: 기존 Weight+Dimensions
  고정 쌍(2열) + IP Rating 별도 행 구조를, 세 항목 모두 한 행에 3열로
  나란히 배치하도록 변경(순서: Dimensions·Weight·IP Rating — Dimensions 가
  "(W×H×D)" 힌트 + mm/in 토글까지 있어 라벨이 가장 길게 잘리므로 첫 칸에
  두고 그리드 비율도 1.6fr 1fr 1fr 로 가장 넓게 배분). `weightDimsRows`를
  `weightDimsIpRow`로 재작성(단일 `--full` 행 반환)하고, `spec-table.css`에
  `.spec-table__tri`(3열 내부 그리드, 부모 --full 셀 패딩과 정확히 맞물리는
  음수 마진 트릭) 추가.
- **Weight kg/lb 토글 추가**: Dimensions 의 mm/in 토글과 동일한 패턴으로
  Weight 에도 kg/lb 전환 버튼을 추가. 원본 데이터에 lb 값이 없어
  kg × 2.20462 를 정수로 반올림해 계산(`weightDimsIpRow`). 버튼 배선은
  `modal.js`에 `wireWeightUnitSwitch` 신규 추가 후 `wirePaneInteractions`
  에 등록(Split View pane 2 에서도 동작).
- **mm/in/kg/lb 토글 버튼 소문자 표기 + 크기 통일**: `.dims-unit-btn`의
  `text-transform: uppercase` 를 제거해 "MM"처럼 강제 대문자로 보이던 걸
  원본 그대로("mm") 소문자로 표시. "mm"(넓은 문자)과 "in"(좁은 문자)처럼
  라벨 텍스트 폭 차이로 버튼 크기가 들쭉날쭉했던 것도 `min-width: 20px`
  고정으로 통일(`spec-table.css`).

### 삭제
- **Amplifier Matching 표 footnote 제거**: 모든 스피커 모달의 Amplifier
  Matching 표 아래 있던 Links/ch·Max/amp·Max SPL 설명 + 출처(L-Acoustics
  Amplification Reference v.16.0) footnote 를 전체 삭제(`speakers.view.js`
  ampMatchingHTML). 추후 다시 정리해서 첨부 예정.

### 추가
- **스피커 모달 Acoustical 섹션 배치 변경**: Max SPL·RMS Power Handling
  (Total)·Transducers·By Band 순서를 Max SPL/RMS Total 한 행, Transducers/By
  Band 한 행으로 재배치(`speakers.view.js` acousticalRows, `maxWattRows`의
  고정 쌍 `pin="maxwatt"` 제거). By Band 가 없는 패시브 스피커는 Transducers/
  Low Driver 가 혼자 한 행 전체를 차지하도록 처리.
- **스피커 모달 이미지 영역 레이아웃 통일**: 뷰가 1개(Front 단일 이미지)뿐인
  스피커도 K1(Front/Rear, Front/Array 등 여러 뷰)과 동일하게
  `.modal__media-wrap` + `.modal__view-switch` 바(라벨 버튼 + 구분선)를
  항상 렌더링하도록 변경(`speakers.view.js` modalBodyHTML, `views.length > 1`
  분기 제거). 제조사·시리즈 무관 전 스피커에 적용.
- **범례 공용화 (0-2)**: speakers 컨트롤러 전용이던 `renderLegend()`를
  `js/ui/legend.js` 공용 모듈로 승격 — 5개 도메인 전부 mount 시 자기
  데이터·MFR 맵으로 범례를 갱신한다.
- **Amplifier Matching +N 토글 (전 스피커)**: 앰프 모달 Configurations 표와
  동일한 패턴으로, 앰프별 대표 행(Max/amp 최대) 1개만 기본 표시하고
  나머지 모드×프리셋 조합은 `+N` 버튼으로 펼침(`ampMatchingHTML()` 재작성,
  `match-table--toggleable`). 행 클릭(Split View 이동)과 +N 클릭(펼치기)은
  stopPropagation 으로 분리.
- **모달 스펙 표 3섹션 구분 (2-1)**: Acoustical / Physical / Connectivity 를
  `.section-label` 로 분리. 연속 섹션 간 간격 규칙 추가
  (`.spec-table + .section-label` 등, spec-table.css).
- **메타 일괄 + 네이티브 다크 톤 (1-4/8-1)**: `description`·OG·
  `theme-color(#0E1116)`·레벨바 사이글 SVG data-URI favicon(index.html),
  `:root { color-scheme: dark; }`(base.css).

### 변경
- **제조사 색 토큰 — 실제 로고 기준 확정 (1-1 수정판)**: 문서 v4 의 제안
  (`--la` 레드/`--db` 그린) 대신 사용자가 제공한 공식 로고에서 추출:
  `--la: #B4914F`(골드, 6.4:1) · `--db: #F2F4F6`(화이트, 17:1) ·
  `--my: #5B7FBE`(로고 블루, 4.7:1). 주의: L-A 골드는 앰버 `--accent` 와
  계열이 가깝고, d&b 화이트는 `--ink` 와 톤이 가까워 시각 확인 필요.
- **타입 스케일 5단 고정 (1-2)**: `--fs-xs(11)/-sm(12)/-md(13)/-lg(16)/-xl(20)`
  토큰 추가, 10~20px 사이 0.5px 변주(10/10.5/11/11.5/12/12.5/13/13.5/16/
  16.5/20px)를 전 CSS 에서 토큰으로 수렴. 14/15/17px 이상·9px대 이하는 유지.
- **muted-2 텍스트 사용 금지 (1-2)**: 푸터·탭 카운트·각주·힌트·placeholder 등
  텍스트 사용처 9곳을 `--muted` 로 승격. `--muted-2` 는 비활성 보더·장식
  전용(카드 noimg 글리프, disabled 칩만 유지).
- **스펙 표 직렬화 리팩토링 (2-2)**: HTML 문자열을 정규식으로 재파싱하던
  `fillOrphanHalfCells()` 후처리를 제거하고, 행을 `{key, value, full, pin}`
  객체 배열로 모아 `serializeSpecRows()`가 배치 계산(고아 half 승격·pin
  고정 쌍)과 직렬화를 한 번에 수행(`speakers.view.js`).

### 참고
- 검증: jsdom 통합 테스트로 5개 탭 범례 갱신·pane 2 토글/단위 전환·사진
  유지·+N 접기/펼치기 전부 통과. 기존 smoke 테스트의 FAIL 2건(첫 카드
  K1 의 LA12X 미등록, 앰프 카드 9장 기대)은 수정 전부터 있던 데이터 공백/
  스테일 테스트로 이번 변경과 무관.
- 미적용(다음 세션): Step 5(4-1 포커스 트랩·4-2 딥링크), Step 6(6-1 레포
  버저닝), Step 7(1-3 시그니처·1-5 푸터 — 푸터 교체 시 8-5 출처·3-3 버전
  표기 함께 해결), Step 8(3-1 모바일 overflow·5-1 검색 정규화), Step 9(7-x),
  Step 10(나머지 하·참고 항목).

---

## v1.1 (2026-07-03)

카드/모달 UI 다듬기, 필터 확장, 제품 이미지 정리·구조 개편, 다중 이미지 뷰
(Front/Rear/Array) 기능 추가, L-Acoustics 앰프 데이터를 상세 스펙 구조로 전면 개편.

### 추가
- **스피커 모달 Weight/Dimensions mm↔in 토글**: 두 값을 한 셀에 항상 병기하던
  Dimensions 텍스트가 길어 표가 흐트러지던 것을, mm/in 버튼으로 하나씩만
  보여주도록 개선(`dims-unit-switch`, `js/ui/modal.js`의
  `wireDimsUnitSwitch()`). Weight와 Dimensions는 항상 같은 행에 나란히
  붙는 고정 쌍(`data-pin="weightdims"`)으로 만들어 다른 셀이 사이에 끼어
  갈라놓지 않게 했고, Dimensions 라벨 옆에 "(W×H×D)" 축(순서) 힌트를 추가
  (`weightDimsRow()`, `speakers.view.js`).
- **RMS Power Handling(Max Watt) Active/Passive 표시 분리**: K1처럼
  LF/MF/HF 대역별 소비 전력(`wattByBand`)이 있는 Active 스피커는 Total과
  밴드별 값을 항상 같은 행에 나란히 붙는 고정 쌍으로, 밴드별 값이 없는
  Passive 스피커는 다른 항목과 우연히 병합되지 않도록 무조건 한 행 전체
  (`--full`)를 차지하도록 분리(`maxWattRow()`). By Band 안에는 라벨에 이미
  "RMS"가 들어가 있어 중복되는 "RMS" 단어를 생략.
- **2-way 이상 멀티밴드 스피커 Transducers 표시**: K1처럼 로우 대역 외에도
  MF/HF 등 대역이 2개 이상인 스피커는, 로우 드라이버 하나만 보여주는 기존
  Low Driver 행 대신 그 자리를 LF/MF/HF 배지+값 리스트(Frequency Response와
  동일한 `freq-list` 컴포넌트 재사용)로 전면 교체해 전체 대역 구성을 한눈에
  보여줌(`isMultiBand`/`transducerBandsHalfRow()`, `speakers.view.js`).
  로우 대역 하나뿐인 서브우퍼는 기존처럼 Low Driver만 표시(중복 없음).
- **라인어레이 Vertical 커버리지 숨김**: 라인어레이는 Inter-element
  Splay(선택 각도) 자체가 실질적 수직 커버리지이고, `cov.v`(예: "10°")는
  낱장 엘리먼트 하나의 고정 방사각이라 사실상 의미 없는 값(데이터상
  거의 항상 동일값)임을 확인 — splayList가 있으면 Vertical 행을 표시에서
  생략(`coverageRows()`). 필터 사이드바의 Vertical 슬라이더(`vRange`)는
  그대로 유지, 표시 로직만 조건부로 숨김.
- **d&b D40/D80/D90/40D 앰프 분리**: cl-series.data.js에서 "D40 / D80 /
  D90 / 40D"로 병합 표기되던 항목을 LA12X/LA4X 처럼 4개의 독립된 앰프
  항목으로 분리(configs는 동일하게 복제).
- **L-Acoustics 앰프 상세 스펙 표준화**: 기존 LA12X/LA4X/LA7.16/LA2Xi/LA1-16i
  (channels·powerClass·connectivity 정도의 단순 필드)를 전부 제거하고, 제조사
  스펙시트 수준의 상세 구조를 가진 LA1.16i 1개로 교체. `mains`(전원)·`io`(입출력)·
  `output`(출력)·`dsp`(신호처리)·`ecosystem`(연동 소프트웨어)·`features`(기능
  목록)·`note`(모델 타입/보호회로/인터페이스 설명) 등 중첩 필드를 신설했고,
  이 구조를 앞으로 추가되는 모든 L-Acoustics 앰프의 표준 스키마로 채택
  (`js/domains/amplifiers/data/la.data.js`). 모달에는 Mains/I·O/Output/DSP/
  Ecosystem/Features/Notes & Protection 섹션이 값이 있는 것만 자동으로
  나타나도록 구현해, 이 상세 필드가 없는 기존 d&b 앰프의 모달은 예전과 동일하게
  표시됨(`amplifiers.view.js`의 `detailSection()`이 빈 섹션을 자동 생략).
  필터에 Usage(Installation only 등) 칩도 추가.
- 이 앰프 개편에 따라 L-Acoustics 스피커 데이터(K/L/X/S/A Series·Subwoofers,
  총 6개 시리즈 파일)에서 삭제된 앰프를 참조하던 `relations.ampIds`·`amps`·
  `ampRaw` 필드를 정리(빈 배열/`null`로 정규화). 스펙 수치·이미지 경로 등
  앰프와 무관한 필드는 그대로 유지.
- **앰프 매칭 표시 데이터 복구 + 클릭 가능 여부 시각 구분**: 위 정리에서
  같이 지워졌던 `amps`(모델별 configs·SPL 프리셋)·`ampRaw` 표시용 데이터를
  사용자 백업본에서 34개 스피커 전체(32개 매칭 보유, L1/L1D는 원본부터
  매칭 없음) 복구. 단 `relations.ampIds`(cross-ref 무결성 필드)는 LA12X 등
  현재 앰프 DB에 없는 구형 모델 참조를 걸러내고 실존 앰프(LA1.16i)만 남김 —
  `amps`(표시)와 `relations.ampIds`(무결성)의 책임을 분리. 앰프 매칭 표
  (match-table)에서 `resolveAmpId()`로 실제 등록된 모델만 클릭 가능하게
  구분: 클릭 가능 행은 화살표(›) 인디케이터 + hover 배경(`--clickable`),
  등록되지 않은 구형 모델 행은 모델명 색을 muted 로 낮춰 비활성처럼 보이게
  함(`--static`) — 행 자체는 지우지 않아 과거 매칭 정보는 그대로 열람 가능.
- **앰프 모달의 Matched Speakers 동적 계산**: LA1.16i는 정적 필드
  `relations.speakerIds`가 비어있어 앰프 모달에서 "매칭된 스피커가
  없습니다"로 표시되던 문제 수정. `cross-ref.js`에 `findSpeakersMatchingAmp()`
  를 신설해 스피커 쪽 `amps[].model`(이미 스피커 매칭 표가 쓰는 원본 데이터)을
  역으로 스캔, 실제 이 앰프를 매칭하는 스피커를 항상 최신 상태로 계산.
  앰프 탭 mount 시 전체 앰프의 `relations.speakerIds`를 이 값으로 동기화해
  카드의 Speakers 개수·정렬(매칭 스피커 많은순)·모달의 Matched Speakers 칩이
  모두 하나의 소스(스피커 데이터)에서 일관되게 나온다. LA1.16i는 현재
  Soka·SB10i·SB6i·X8·X6i·5XT·X4i 7개 스피커와 매칭됨.
- **Ecosystem 섹션 레이아웃**: Control Software 옆이 빈 셀로 남던 문제 수정 —
  Integrations 를 병합 셀(`--full`)에서 일반 셀로 바꿔 Control Software 와
  같은 행(2열 1행)에 나란히 배치.
- **General 섹션 Notes 행 제거**: 카드 요약에도 쓰이는 `a.notes` 문구가
  모달 General 섹션에도 중복 표시되던 것을 모달에서만 생략.
- **Matched Speakers/Configurations를 모달 상단으로 이동**: Split View 로
  스피커를 오갈 때 상세 스펙(Mains/I·O/Output/DSP/...)을 지나 스크롤해야
  하는 불편을 줄이기 위해, 두 섹션을 General 바로 아래로 재배치.
- **Configurations 표를 스피커 기준 데이터로 대체(Preset·Max SPL 포함)**:
  LA1.16i처럼 앰프 자체 `configs` 필드가 비어있어 "설정 데이터가
  없습니다"만 뜨던 문제를, 스피커 매칭 표(Amplifier Matching)가 이미 갖고
  있는 `amps[].configs`(모드·Links/ch·Max/amp·`splByPreset`의 프리셋별 Max
  SPL)를 역으로 모아서 채우도록 수정. `cross-ref.js`에
  `findAmpConfigsBySpeaker()`를 신설 — 처음에는 mode/perCh/total만 옮겨
  Preset·SPL이 빠졌던 것을 스피커 매칭 표와 동일하게 프리셋별로 펼쳐
  Preset·Max SPL 열까지 포함하도록 보강(LA1.16i 기준 27행). 왼쪽 열이
  앰프 모델명이 아니라 "이 앰프로 어떤 스피커를 어떤 모드/프리셋으로 몇
  대까지 구동해 몇 dB를 내는지" 스피커 이름이 되는 6열 표(스피커 모달의
  Amplifier Matching과 동일한 기본 `.match-table` 구조 재사용,
  `configsBySpeakerTableHTML()`)를 새로 추가하고, 행 클릭 시 Split View 로
  해당 스피커 상세를 여는 것도 기존 Matched Speakers 칩과 동일하게 지원.
  d&b 등 앰프 자체 `configs`가 이미 입력된 앰프는 기존 3열 표(모델 고정,
  `--cols-3`)를 그대로 사용.
- **Configurations 표: 스피커별 대표 행 + 접기/펼치기**: 스피커 1개가
  모드×프리셋 조합만큼(예: Soka 는 SE/BTL × 3개 프리셋 = 6행) 반복 등장해
  표가 길고 스피커 이름이 계속 반복되어 복잡해 보이던 문제 수정. 스피커별로
  Max/amp 가 가장 큰 대표 설정 1행만 기본 노출하고, 나머지는 대표 행 옆
  `+N` 토글 버튼을 눌러야 펼쳐지는 하위 행(`match-table__row--sub`)으로
  숨김. 스피커 이름 클릭(Split View 이동)과 `+N` 버튼 클릭(펼치기)의 클릭
  영역을 분리해 서로 간섭하지 않게 하고(`wireAmpConfigsToggle()`,
  `amplifiers.controller.js`), 펼친 뒤엔 버튼이 "−"로 바뀌어 다시 누르면
  접힘. LA1.16i 기준 스피커 7개·27행이 대표 7행 + 펼치면 보이는 20행으로
  요약됨.
- **버그 수정: 접힌 하위 행이 실제로는 숨겨지지 않던 문제**: 위 접기/펼치기
  구현 직후, `hidden` 속성을 줬는데도 하위 행이 화면에 그대로 보이는 버그
  발견. 원인은 `.match-table__row { display: grid }` 규칙이 브라우저 기본
  `[hidden] { display: none }` 규칙보다 우선 적용되어 `hidden` 자체가
  무시된 것 — `.match-table__row[hidden] { display: none }`을 그 뒤에
  추가해 우선순위를 명시적으로 확보(`spec-table.css`).
- **버그 수정: Configurations 표의 +N 배지·› 화살표 세로 정렬 어긋남**:
  스피커 이름 길이(SB10i·Soka·X6i 등)가 제각각이라 이름 뒤에 바로 붙는 +N
  토글 배지와 › 화살표가 행마다 다른 x좌표에 위치해 세로선이 어긋나 보이던
  문제 수정. `.match-table__cell--model`을 flex 컨테이너로 바꾸고 이름을
  `<span class="match-table__model-name">`으로 감싸 `margin-right: auto`를
  줌 — 아이템이 2개(이름+화살표)든 3개(이름+토글배지+화살표)든 배지·화살표가
  항상 셀 오른쪽 끝에 나란히 모이고 중간에 벌어지지 않는다. 이름이 길면
  이름 쪽만 말줄임(ellipsis)되어 정렬은 그대로 유지됨.
- **버그 수정: +N 배지 크기 들쭉날쭉 + Links/ch·Max/amp 헤더 잘림**:
  토글 배지가 자릿수(+1 vs +5)에 따라 폭이 달라 보이던 것을 `min-width:
  26px` + `font-variant-numeric: tabular-nums`로 고정폭 처리. 동시에
  Links/ch·Max/amp·Max SPL 헤더 텍스트가 좁은 열 폭에서 "LINKS/..."/
  "MAX/A..."로 잘리던 문제를, `match-table__row`의 6열 grid 비율을
  `1.1fr .75fr 1fr .65fr .65fr .75fr`에서 `1.25fr .7fr .95fr .85fr .8fr
  .75fr`로 재조정(Links/ch·Max/amp 열에 더 여유를 주고 Mode 열은 줄임)하고
  헤더 letter-spacing 을 `.1em`→`.04em`으로 좁혀 해결.
- **Split View pane 2 여닫이 토글**: 앰프 모달의 Matched Speakers 칩·
  Configurations 표 대표 행이나, 스피커 모달의 앰프 매칭 행을 클릭해 pane 2
  가 열린 상태에서 같은 대상(같은 스피커/앰프)을 다시 클릭하면, 오른쪽 위
  X 버튼까지 마우스를 옮기지 않아도 pane 2 가 곧바로 닫히도록 개선.
  `openSplitPane()`에 `paneId` 파라미터를 추가해 `.split-view` 컨테이너의
  `dataset.paneId`로 현재 열려있는 대상을 추적하고, 같은 id 로 다시 호출되면
  토글 닫기, 다른 id 면 기존처럼 교체하도록 분기(`ui/split-view.js`). X
  버튼 클릭과 토글 닫기가 동일한 `closeSplitPane2()` 헬퍼를 공유해 모달을
  닫았다 다시 열 때 `.split-view` 잔재 DOM이 남지 않도록 유지.
- **Split View 전환 모션 재설계(리플로우 어색함 해결)**: 기존에는 pane1·
  pane2 를 `flex: 1 1 50%`로 반씩 나누고 모달 `max-width`를 트랜지션시켰는데,
  그 결과 pane1(원래 모달 콘텐츠)의 폭이 갑자기 절반으로 줄면서 폰트·표
  열 폭이 순간 재배치(리플로우)돼 전환이 어색해 보이던 문제를 해결. pane1을
  원래 모달과 동일한 고정 폭(`--pane1-w: 600px`)으로 완전히 고정해 pane1
  내부는 전환 중 전혀 리사이즈되지 않고, pane2만 오른쪽에 별도 고정 폭
  (`--pane2-w: 560px`)으로 붙어 나타난다(`css/components/split-view.css`).
  pane2 진입 애니메이션도 좌우로 미끄러지는 `translateX`(패널이 밀고 들어오는
  듯한 인상) 대신 순수 페이드 + 살짝의 확대(`scale(.98)→1`)로 바꾸고, 모달
  폭 확장 트랜지션(modal.css, `.22s`)이 끝난 직후(`animation-delay: .2s`)
  시작하도록 타이밍을 맞춰 "먼저 폭이 넓어지고 그 다음 내용이 자연스럽게
  드러나는" 순서가 되게 함. pane2 폭이 넉넉해져(패딩 제외 약 510px) 기존에
  match-table을 억지로 축소하던 스타일도 대부분 제거하고 1080px 이하
  좁은 화면에서만 축소 적용. 세로 스택(860px 이하)에서는 두 pane 모두
  폭을 auto로 되돌려 가로 스크롤이 생기지 않게 처리.
- **Split View pane1/pane2 헤더 완전 통일(X 버튼 위치·제목 표기 불일치
  해결)**: pane2(Split View 로 새로 여는 상세)가 pane1(원래 모달)과 다른
  전용 헤더 마크업(`.split-view__pane-head`, 브랜드·모델명이 한 줄로 붙은
  작은 텍스트 + 별도 스타일의 닫기 버튼)을 써서, 좌우 X 버튼 위치와 제목
  표기 방식이 서로 어긋나 보이던 문제 수정. `openSplitPane()`이 `paneTitle`
  문자열 대신 각 도메인 `modalBodyHTML()`이 반환하는 `head`(= pane1과
  동일한 `.modal__head`: eyebrow + `.modal__title` + 우측 상단 고정
  `.modal__close`)를 그대로 받도록 시그니처를 변경(`headHTML` 파라미터,
  `ui/split-view.js`)하고, 이를 호출하는 4개 컨트롤러
  (`speakers.controller.js`/`amplifiers.controller.js`/
  `dsps.controller.js`/`software.controller.js`) 모두 `head`를 함께
  구조분해해 전달하도록 수정. `.split-view__pane`에 주던 자체 padding도
  제거해(내부 `.modal__head`/`.modal__body`가 이미 padding을 담당) pane1과
  pane2가 여백까지 픽셀 단위로 동일해짐. 이제 두 pane 모두 X 버튼이 항상
  각 pane 우측 상단 끝의 같은 오프셋(top:18px, right:18px)에 있고, 제목도
  "제조사·부가정보(eyebrow) 위에 큰 모델명" 2단 구조로 통일됨.
- **각도 범위 필터**: Max SPL·Max Watt처럼 Inter-element Splay(선택 각도)·수평
  커버리지·수직 커버리지도 범위 슬라이더로 필터링 가능. `cov.h`/`cov.v`/
  `cov.splayList` 원본 문자열을 `[min,max]` 구간으로 파싱하는
  `parseAngleRange()`를 신설하고, `core/filter-engine.js`가 배열형(`isRange`)
  필드와 스칼라 구간이 겹치는지(overlap) 판정하도록 확장.
- **서브우퍼 모달의 Low Driver/Transducers 중복 표시 제거**: K1-SB처럼
  로우 대역 1개짜리 서브우퍼는 `transducers`("LF: 2 × 15″")가 바로 위의
  `Low Driver`("2 × 15″") 행과 실질적으로 같은 값이라 두 행이 같은 정보를
  반복해서 보여주고 있었음. 카드에서 이미 쓰던 `otherBandCount()`(로우
  드라이버를 제외한 나머지 대역 수를 세는 헬퍼)를 모달에도 재사용해, 이
  값이 0(대역이 로우 하나뿐)이면 Transducers 행 자체를 생략하도록
  `modalBodyHTML()`을 수정(`speakers.view.js`). LC/LF/MF/HF 등 대역이
  2개 이상인 스피커(K1, K2 등)는 Transducers 가 Low Driver 에 없는 정보를
  담고 있으므로 그대로 유지. 전체 데이터 감사 결과 L-Acoustics 서브우퍼
  11개(K1-SB·Syva Low·Syva Sub·KS28·KS21·SB18·SB15m·SB10r·SB10i·SB6r·SB6i)
  가 이 조건에 해당해 중복이 사라짐.
- **Type/Crossover 요약 태그를 head 영역으로 이동**: `Type`(Line Array 등)·
  `Crossover`(3-way/active 등) 항목을 spec-table 안의 일반 행 대신, 모달
  제목(`.modal__title`) 오른쪽과 카드 이름(`.card__name`) 오른쪽에 작은
  해시태그형 배지로 나란히 노출하도록 변경. `speakers.view.js`에
  `titleTagsHTML(d, wrapClass, tagClass)` 헬퍼를 신설해 Type은 카드 배지와
  같은 축약 라벨(`TYPE_BADGE_LABEL`)로, Crossover는 `crossoverTags` 원본
  그대로 배지화하며, wrapper/배지 클래스를 인자로 받아 모달
  (`modal__title-tags`/`modal__title-tag`)과 카드
  (`card__name-tags`/`card__name-tag`) 양쪽에서 같은 로직을 재사용한다.
  모달은 `.modal__head-row`(flex, `align-items: center`)로 제목과 태그를
  세로 중앙 정렬해 한 행에 배치하고, 태그가 많으면 제목보다 먼저
  줄바꿈되어 다음 줄로 내려간다. 카드는 `.card__name-row`로 감싸 이름은
  줄어들지 않게 고정하고, 태그 그룹에 `margin-left: auto`를 줘 카드
  우측 끝에 정렬되도록 처리(`card.css`). Split View pane2(폭이 약간
  좁음)에서는 배지를 살짝 축소(`split-view.css`). 표에만 있던 정보를
  시각적 "요약 라벨"로도 함께 보여줘 표를 안 봐도 제품 유형을 한눈에
  파악할 수 있게 됨.
- **Crossover 태그 정렬 순서**: `crossoverTags` 데이터 원본 순서("3-way",
  "active")와 달리, 표시 시에는 능동/수동 여부(active/passive)가 대역 수
  (N-way)보다 앞에 오도록 정렬(예: "Line Array, active, 3-way"). 데이터
  자체는 건드리지 않고 `titleTagsHTML()` 내부에서 `/active|passive/`
  매칭 여부로 정렬 키를 부여하는 stable sort 로 표시 순서만 조정.
- **모달 헤더 태그·닫기 버튼 정렬 미세 조정**: 태그 배지들을 제목과 세로
  중앙 정렬(`align-items: center`, 기존 `flex-start`)로 변경. 닫기 버튼을
  32px→20px로 축소하고 제목 줄이 아닌 eyebrow(제조사·시리즈) 줄 높이로
  옮겨, 태그 그룹이 닫기 버튼을 피해 안쪽 여백을 두지 않고도 아래
  spec-table/match-table 의 실제 우측 끝(`.modal__body`와 동일한 24px
  padding 기준선)까지 그대로 닿을 수 있게 함 — 닫기 버튼의 `right`도
  24px로 맞춰 두 기준선이 일치하도록 정리. 이어서 카드 태그는
  `margin-left: auto`로 카드 우측 끝 정렬로 변경(`.card__name-tags`).
  닫기 버튼 아이콘이 살짝 아래로 치우쳐 보이던 것은 svg 를
  `display: block` + flex 중앙정렬로 바꿔 해결. 태그(`border-radius:
  999px`, 완전 알약형)와 닫기 버튼(각진 사각형)의 곡률이 서로 달라
  나란히 있을 때 이질감을 주던 것을 두 요소 모두 `border-radius: 8px`로
  통일했고, 태그를 `inline-block`→`inline-flex` 중앙정렬로 바꿔 텍스트가
  박스 안에서 살짝 치우쳐 보이던 것도 정리(`modal.css`).
- **카드의 로우 드라이버 배지 폰트 크기 통일**: `.card__low-badge` 안의
  `<b>`(예: "2×8″")가 부모 컨텍스트에 따라 옆의 "+N개 대역"
  (`.card__low-extra`, 11px)보다 커 보이는 경우가 있던 것을, 배지
  부모(`.card__low-badge`)에 `font-size: 11px`를 직접 고정하고 자식
  (`b`/`small`)은 `em` 배수(1em/.68em)로만 지정해 항상 옆 텍스트와
  동일한 실제 렌더 크기를 갖도록 수정. 배지 padding 도 살짝 줄여 박스
  크기 축소(`card.css`).
- **앰프/DSP/Software 탭에 제조사별 그룹 헤더 추가**: 스피커 탭처럼
  "L-Acoustics · Amplified Controller" 형태의 그룹 헤더(제조사 뱃지 +
  분류명 + 개수)를 카드 그리드 상단에 표시. 앰프는 `type` 필드
  (예: "Amplified Controller")를, 값이 없으면(d&b D80/D90 등 기존
  단순 스키마 — 실제로는 랙형 투어링 앰프) 기본값 "Amplifier"로 묶는다
  (`ampTypeOf()`). DSP는 이미 있던 `category` 필드(예: "AVB Processor &
  Measurement")를, Software 는 이미 있던 `type` 필드를 그대로 재사용해
  그룹핑. 세 탭 모두 정렬 셀렉트에 "정렬 · 제조사/타입별"(DSP/Software는
  "정렬 · 제조사별") 옵션을 추가하고 기본 정렬로 승격 — 스피커 탭의
  "정렬 · 시리즈별" 그룹핑 UX(제조사 순서 고정 `*_MK_ORDER`, 서브그룹
  알파벳순, 그룹 내 이름순)를 그대로 재사용(`amplifiers.controller.js`,
  `dsps.controller.js`, `software.controller.js`의 `renderGrid`
  `groupBy` 옵션).
- **탭 전환 시 스크롤바 유무로 인한 페이지 좌우 흔들림 수정**: 탭마다
  콘텐츠 높이가 달라 세로 스크롤바가 생겼다 사라졌다 했는데, 스크롤바는
  뷰포트의 실사용 폭에 영향을 줘 중앙 정렬된 `max-width` 컨테이너
  (`.app-footer` 등)가 탭을 옮길 때마다 몇 px씩 좌우로 밀리는 것처럼
  보였음. `html { scrollbar-gutter: stable; overflow-y: scroll; }`을
  추가해 스크롤바가 필요 없을 때도 그 자리를 항상 빈 여백으로 확보,
  콘텐츠 높이와 무관하게 사용 가능한 폭이 항상 동일하도록 고정
  (`base.css`).
- **L-Acoustics LA1.16i 제품 이미지(Front/Rear/Isometric) 추가**: 배경이 이미
  투명 처리된 원본 3장을 여백만 최소화(0.3%, `assets/img/normalize_images.py`)
  정규화해 `assets/img/amplifiers/la/`에 배치. 앰프 도메인에도 스피커와 동일한
  `getViews()`/다중 뷰 패턴을 도입해 카드는 Front→Rear 호버 크로스페이드,
  모달은 Front/Rear/Isometric 전환 버튼을 지원(`amplifiers.view.js`).
- **앰프 카드/모달 이미지 폭 최적화**: 1U 랙마운트 앰프(약 10.6:1 종횡비)는
  기본 max-width(카드 80%/모달 74%)를 그대로 쓰면 극단적으로 얇게 렌더링되던
  문제를, `card__img--wide`/`modal__img--wide` 변경자로 폭을 100%(모달은 96%)
  까지 채우도록 수정. 이 과정에서 발견한 CSS 특이도 버그도 함께 수정 —
  `.card__media img`/`.modal__media img`(태그+클래스, 특이도 0,0,2)가 단일
  클래스 변경자(0,0,1)보다 항상 이겨서 max-width 오버라이드가 무시되던 것을
  `img.card__img--wide`처럼 태그+클래스로 특이도를 맞춰 해결(`card.css`,
  `modal.css`).
- **모달 이미지 커서 추적 확대(zoom)**: 모달 사진에 마우스를 올리면 커서가
  위치한 지점을 중심으로 확대되는 인터랙션 추가. `js/ui/modal.js`의
  `wireMediaZoom()`이 mousemove로 `--zoom-x`/`--zoom-y` CSS 변수를 갱신하고
  `transform-origin`이 이를 참조(`modal.css`). 일반 이미지(스피커 등)는 1.4배,
  1U 랙마운트처럼 가로로 긴 이미지(`modal__img--wide`)는 프레임 안에서 작아
  보이는 특성을 고려해 2.8배로 배율을 분리.
- **제품 이미지 다중 뷰(Front/Rear/Array 등)**: 스피커 카드에 마우스를 올리면
  두 번째 뷰(뒷모습/배열 사진 등)로 크로스페이드되고, 모달에서는 뷰 개수만큼
  버튼이 자동 생성되어 전환할 수 있음(`getViews()` 헬퍼, `js/domains/speakers/
  speakers.view.js`). 데이터에는 `views: [{label, src}, ...]` 배열을 선언하며,
  레거시 `img`+`imgBack` 필드도 자동으로 같은 구조로 변환되어 하위호환됨.
  - L-Acoustics L1D: Front/Rear 적용
  - L-Acoustics K1: Front/Array 적용
- **L-Acoustics L Series 재분류**: L1/L1D/L2/L2D의 `type`을 "Line Array"에서
  "Progressive Ultra-Dense Line Source"(PULS)로 변경. 카드 배지는 공간 제약상
  "PULS"로 축약 표시하고, 필터 칩·모달의 Type 행은 풀스펠링 유지
  (`TYPE_BADGE_LABEL` 매핑, `speakers.schema.js`).
- **이미지 자산 폴더 구조 개편**: `assets/img/{도메인}/{제조사}/{시리즈}/파일명.webp`
  형태로 스펙 데이터 폴더 구조(`js/domains/speakers/data/{mk}/{series}.data.js`)와
  1:1 대응되게 재편. 향후 이미지 추가 시 같은 규칙을 따르면 됨.
- **이미지 정규화 스크립트**: `assets/img/normalize_images.py`(여백 비율 통일),
  `assets/img/montage_check.py`(전체 썸네일 일괄 점검) 추가 — 재귀 탐색 지원.

- **앰프 카드/모달 정보 구조 재정리**: speakers.view.js의 "실사용에 필요한
  정보 우선" 원칙을 앰프에도 적용.
  - 카드 stat-grid에서 매칭 정보가 바뀔 때마다 값이 흔들리는 부가 지표인
    Speakers(개수) 대신 앰프 자체 스펙인 Channels를 노출.
  - 카드의 자유 서술문(`a.notes`)을 제거 — 스피커 카드의 `card__config`는
    스펙 요약(로우드라이버 배지 등)인데 반해 앰프는 문장형이라 카드 첫
    화면에 어울리지 않음. 정보 자체는 유실하지 않고 모달 상세 첫 줄
    (General 표 바로 위, `.modal__notes`)로 이동.
  - 카드 이미지 위 채널 배지("16ch")를 제거 — stat-grid의 Channels와 중복.
  - 카드 stat-grid 라벨/값 말줄임 수정: "Output Power"→"Output"으로 축약해
    라벨 잘림 해결, `a.usage`("Installation only")는 모달 표시용 원본은
    그대로 두고 카드에서만 "only"를 생략해 값 잘림 해결.
  - 모달 섹션을 General(개요만: Channels·Power Class·Type·Usage) →
    Matched Speakers/Configurations → Mains(Power Supply·External DSP
    Backup 통합) → Connections & Output(I/O+Output 통합, 중복이던
    `output.channels` 제거) → DSP → Ecosystem → Features → Notes &
    Protection → Physical(IP Rating·Rack Unit·Weight·Cooling·Operating
    Temp — 설치 시에나 참고하는 부가 스펙이라 맨 아래로 이동) 순으로
    재구성. 섹션 수 6개→5개(주요 스펙)+Physical 로 정리, 중복 정보 제거.
  - Configurations 표(앰프 모달의 `configsBySpeakerTableHTML`)가 스피커
    모달의 Amplifier Matching 표와 6열 컬럼 비율을 공유하던 것을 분리
    (`match-table--amp-view`). 두 표는 왼쪽 열 콘텐츠가 반대라(하나는
    짧은 앰프 모델명, 하나는 스피커 모델명 — 최장 "A15 Focus" 9자) 공유
    비율로는 스피커 이름이 "S...", "5..."처럼 잘렸음.

### 변경
- 필터 패널 토글이 사이트 진입 시 기본적으로 접힌 상태로 시작.
- 표(spec-table·match-table·freq-list) 셀 크기를 고정 그리드 비율로 통일해
  브라우저/글자수에 따라 셀 폭이 흔들리던 문제 해결.
- 데스크탑 카드 그리드 3열 → 4열 확보, 모바일 반응형 밀도 최적화(1열 유지).
- 범위 슬라이더(Max SPL/Watt/각도 등) 트랙 폭을 고정 픽셀로 통일해 슬라이더
  길이가 항목마다 들쭉날쭉하던 문제 해결.
- Frequency Response의 -3dB/-6dB/-10dB 배지 크기를 고정폭으로 통일하고 옆
  Hz 텍스트 시작 위치를 정렬.
- 카드 배지의 드라이버 구성 표기 방식을 전면 개편: 텍스트 나열(LC/LF/MF/HF ×
  치수) 방식이 1줄에 들어가지 않던 문제를, 로우 드라이버(lowInch/lowQty)만
  제조사 색상 강조 박스로 표시하고 나머지는 "+N개 대역"으로 축약하는 방식으로
  교체(`card__low-badge`/`card__low-extra`, `card.css`). 강조 박스 폰트 크기를
  옆의 "+N개 대역" 텍스트와 시각적 무게감이 비슷하도록 축소.
- 43개 스피커 제품 이미지의 상하 여백 비율을 알파 채널 bounding box 기준으로
  통일(CCL12/CCL8이 다른 스피커보다 작아 보이던 문제 해결 포함).
- L1D, L2D 이미지의 바닥 그림자(반투명 회색 잔여물)를 제거 — 어두운 카드
  배경에서 흰 얼룩처럼 도드라지던 문제 해결.

### 수정 (버그)
- **fillOrphanHalfCells 셀 인덱스 밀림**: K1-SB(Passive)에서 RMS Power
  Handling 옆에 빈 회색 칸이 남던 버그. 원인은 `.filter(Boolean)`이 템플릿
  리터럴 들여쓰기로 생긴 공백뿐인 조각("\n        ")을 걸러내지 못해
  `blocks[0]`으로 남고 이후 모든 셀 인덱스가 하나씩 밀리는 것 —
  `.filter(b => b.trim() !== "")`로 수정(`speakers.view.js`).
- 스플릿뷰(카드 나란히 비교) 닫았다 다시 열 때 이전 스플릿 상태 DOM이
  잔재로 남아 있던 문제 수정 (`js/ui/modal.js`의 `closeModal()`,
  `js/ui/split-view.js`의 pane2 닫기 로직).
- 스플릿뷰 상태에서 표 셀 폭이 줄어들며 글자가 잘리던 문제 수정.
- 모달의 Front/Rear 전환 버튼이 사진 위에 겹쳐 사진을 가리던 문제 수정 —
  버튼을 사진 영역 바깥 별도 바로 이동. 사진 영역과 버튼 바를 같은 그라디언트
  wrapper(`.modal__media-wrap`)로 감싸 배경색이 중간에 끊기지 않고 자연스럽게
  이어지도록 마무리.

### 정리
- LA1.16i 이미지 작업 중 생긴 원본 PNG·디버그 스크립트·중간 산출물이 남아있던
  `upload/` 임시 작업 폴더를 v1.1 배포 전 전체 삭제(최종 결과물은 이미
  `assets/img/amplifiers/la/`에 반영되어 있어 유실되는 정보 없음).

---

## v1.0

최초 버전. 음향 장비(스피커·앰프·DSP·소프트웨어·브랜드) 리서치 대시보드
기본 구조 구축.

- 도메인 자기등록 아키텍처(controller/schema/view/data 4파일 패턴)
- schema 주도 범용 필터/정렬 엔진(`core/filter-engine.js`)
- 카드 그리드 + 모달 상세 뷰 + Split View(나란히 비교) 기본 기능
- L-Acoustics·d&b audiotechnik 스피커/앰프 데이터 및 크로스레퍼런스(cross-ref)
- 상세 구조는 `ARCHITECTURE.md` 참고
