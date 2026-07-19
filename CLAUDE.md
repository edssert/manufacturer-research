# CLAUDE.md
Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.
**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.
## 1. Think Before Coding
**Don't assume. Don't hide confusion. Surface tradeoffs.**
Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.
## 2. Simplicity First
**Minimum code that solves the problem. Nothing speculative.**
- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.
Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.
## 3. Surgical Changes
**Touch only what you must. Clean up only your own mess.**
When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.
When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.
The test: Every changed line should trace directly to the user's request.
## 4. Goal-Driven Execution
**Define success criteria. Loop until verified.**
Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"
For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```
Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.
---
**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

---
# 프로젝트 고유 규칙

## README 우선 참조 (필수)
작업을 수행할 때 클로드 시스템 지침만으로 정보나 컨텍스트가 부족하다고
판단될 경우, 반드시 최상단 루트의 `README.md` 파일에서 필요한 부분을
먼저 찾아 읽고 작업을 진행하라. 만약 `README.md`를 확인했는데도 필요한
프로젝트 설정이나 규칙이 빠져있다면, 해당 내용을 스스로 판단하여
`README.md`에 추가(업데이트)해 둘 것.

## 원문 스펙 보관 (필수)
신규 제품 스펙 수신 시: `raw-data/raw-specs/<mk>/speakers|amplifiers/.../<model>.md`에
원문 그대로 저장 + `js/domains/.../data.js`에 구조화 반영. 둘 다 해야 완료.
원본 파일(pdf/docx 등) 자체도 같은 폴더에 원본 그대로 함께 백업한다 — md로
옮겨적는 것과 별개로 원본 파일 백업도 필수.

`<model>.md` 옆에 원본 파일(pdf/docx 등)이 하나라도 함께 있으면(즉 md 단독이
아니게 되면) 그 제품 전용 폴더 `<model>/`를 만들어 md + 원본 파일을 그 안에
모은다(`raw-data/raw-specs/<mk>/speakers/.../<model>/<model>.md` +
`<model>/<원본파일>`). 원본 파일 하나를 여러 md가 공유하는 경우(예: 같은
docx 안에 Focus/Wide 두 제품이 함께 수록)는 그 md들과 원본을 함께 폴더
하나에 묶는다. 원본이 아예 없는 md(역재구성본 등)는 폴더화하지 않고 그대로
둔다. 폴더로 옮긴 뒤에는 다른 파일(data.js 등)의 개발 주석에 적힌 경로
문자열도 실제 이동한 경로로 함께 갱신한다.

## 원본 이미지 아카이빙 (필수)
제품 사진 원본 수신 시: `raw-data/raw-images/<mk>/speakers/<series>/`에 원본 그대로 보관한다.

## Changelog/데이터 파싱은 이 프로젝트 담당 아님 (필수)
버전 변경 이력(changelog) 업데이트와 원본 스펙(PDF/docx 등) 파싱 작업은
별도 프로젝트("오디오 스펙 파싱")에서 수행한다. 이 프로젝트(MR_v1.8)는
그 결과물(`upload/` 폴더의 마스터 스키마 `.md`)을 받아서 앱 데이터
(`raw-data/raw-specs/...`, `js/domains/.../data.js`)에 반영하는 역할만
한다. 따라서:
- 이 프로젝트 안에서 changelog/버전 이력 파일을 직접 만들거나 갱신하지
  않는다.
- 원본 PDF/docx를 직접 파싱해 마스터 스키마를 새로 작성하지 않는다 —
  그 산출물은 항상 `upload/` 폴더에서 받아온다.
- `upload/` 폴더에 아직 없는 제품은 원본 파싱이 안 된 것이므로, 먼저
  파싱해달라고 요청할 것이지 이 프로젝트에서 임의로 파싱을 시도하지 않는다.
