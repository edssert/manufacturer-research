# Manufacturer // Research (MR)

L-Acoustics · d&b audiotechnik · Meyer Sound 의 스피커/앰프/DSP/소프트웨어/
액세서리 사양을 검색·비교하고 앰프 매칭을 확인하는 리서치 도구.
빌드 도구 없는 순수 Vanilla JS(ES Modules) 단일 페이지 앱이다.

> **AI 에이전트 필독**: 클로드 지침(CLAUDE.md)만으로 정보가 부족하면
> **반드시 이 README 에서 먼저 찾아 읽고** 작업하라. 여기에도 없는
> 설정/규칙을 새로 확정했다면 **스스로 이 README 에 추가(업데이트)**
> 해 둘 것.

## 실행·테스트

- 실행: 정적 서버로 루트 서빙 — `npx serve .` 후 브라우저 접속.
- 테스트: `npm test` (amp 데이터 무결성 → CSS 클래스 감사 → jsdom 스모크).
  최초 1회 `npm i` 로 jsdom 설치.

## 문서 지도 (역할 분담)

| 문서 | 대상 | 내용 |
|---|---|---|
| `README.md` (이 파일) | 전원/AI | 프로젝트 개요·규칙·설정의 최상위 참조점 |
| `CLAUDE.md` | AI | 행동 원칙 + 절대 규칙만 (토큰 절약을 위해 최소화) |
| `docs/ARCHITECTURE.md` | 개발자 | 기술 아키텍처 상세 (라우팅·모듈 구조·성능) |
| `docs/ARCHITECTURE_GUIDE.md` | 비개발자 | 쉬운 구조 안내 |
| `docs/CHANGELOG.md` | 일반 | 쉬운 버전 업데이트 기록 |
| `docs/CHANGELOG-dev-detailed.md` | 개발자 | 파일/함수 단위 상세 변경 이력 |
| `docs/TODO.md` | AI | 세션 인수인계 임시 기록장 (평소 비움) |

## 폴더 구조 (요약)

```
index.html            진입 HTML
public/js/            앱 코드 — core(라우터·필터엔진) / ui(모달·그리드) /
                      domains/<도메인>/{controller,schema,view,data}
public/css/           tokens → … → components 순 로드
public/assets/        웹폰트·제품 이미지(webp)
public/tests/         node 테스트 3종
raw-data/raw-specs/   제조사 원문 스펙 보관(md + 원본 pdf/docx)
raw-data/raw-images/  원본 사진 아카이브
```

상세 구조·데이터 흐름·URL 라우팅 설계는 `docs/ARCHITECTURE.md` 참고.

## 핵심 동작 규칙 (프로젝트 고유)

1. **원문 스펙 보관 (필수)** — 신규 제품 스펙 수신 시 두 가지를 모두 해야
   완료다: ① `raw-data/raw-specs/<제조사>/<카테고리>/…/<모델>.md` 에 원문
   그대로 저장(원본 pdf/docx 파일도 같은 폴더에 백업), ② 해당 도메인
   `data.js` 에 구조화 반영. md 옆에 원본 파일이 함께 있으면 제품 전용
   폴더 `<모델>/` 로 묶는다(원본 없는 역재구성 md 는 폴더화하지 않음).
   폴더 이동 시 다른 파일 주석의 경로 문자열도 함께 갱신.
2. **원본 이미지 아카이빙 (필수)** — 제품 사진 원본 수신 시
   `raw-data/raw-images/<제조사>/<카테고리>/<시리즈>/` 에 원본 그대로 보관.
   웹 표시용은 webp 변환 후 `public/assets/img/…` 에 배치.
3. **출처 기록 + 교차검증 필수** — 스펙 수치는 출처를 md 에 남기고, 출처
   간 불일치는 확정 근거를 기록한다.
4. **데이터만 추가하면 UI 는 자동** — 카드/필터/모달은 data.js 를 읽어
   렌더링되므로 화면 코드는 원칙적으로 수정 불필요. 새 탭(도메인) 추가
   절차는 `public/js/main.js` 상단 주석 참고.

## 코드 컨벤션

- controller 만 상태 소유, view 는 순수 함수, schema 는 선언, core/ui 는
  도메인 지식 금지. BEM 클래스, 데이터는 시리즈별 파일로 분리.
- 모달/pane 배선은 onXxx 재할당 패턴(중복 addEventListener 금지) —
  `ui/pane-interactions.js` 참고.
- 검색 비교는 반드시 `normalizeSearchText()` 를 양쪽에 적용.
- URL 상태(카드/Split View)는 `core/router.js` 의 route API 로만 조작.

## 알려진 공백 (2026-07-15 기준)

- d&b D40/D80/40D 앰프 데이터 미입력(D90 만 존재), D90 의 스피커 매칭
  (`relations.speakerIds`) 의도적 공백 — 확정 자료 수신 시 채운다
  (amp.test 의 KNOWN_MISSING 목록도 함께 갱신할 것).
- 대형 view 파일 분리 로드맵: `docs/ARCHITECTURE.md` §8.
