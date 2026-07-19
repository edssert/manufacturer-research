# Raw Specs Archive

스피커/앰프 등 신규 카드를 추가할 때 사용자가 붙여넣는 **원문 스펙 텍스트**를
그대로 보관하는 폴더입니다. 목적은 데이터를 나중에 업데이트하거나 오타를
검증할 때 "무엇을 근거로 이 값을 입력했는지" 원본을 다시 찾아볼 수 있게
하는 것입니다.

## 구조

```
raw-data/raw-specs/
  <mk>/                          제조사 축약형 (la / db / my)
    speakers/
      <series>/                  시리즈 폴더 (예: a-series, k-series, panther-series)
        <model>.md                제품 1개당 파일 1개
    amplifiers/
      <type>/                    앰프 타입 폴더 (예: amplified-controller, rack)
        <model>.md                제품 1개당 파일 1개
```

파일명은 모델명을 소문자-kebab-case로 표기한다(예: `A10 Focus` → `a10-focus.md`,
`LA1.16i` → `la1dot16i.md` — 마침표는 데이터 파일의 id 규칙과 맞춰 `dot`으로 표기).

## 관례

- 사용자가 새 제품 스펙 텍스트를 붙여넣으면, 데이터 파일(`js/domains/...data.js`)
  작성과 별개로 **원문 내용을 요약·생략 없이 그대로** 이 폴더의 해당 `.md`
  파일에 저장한다. 다만 가독성을 위해 마크다운 문법(헤더/리스트/굵게 등)으로
  구조화하는 것은 허용 — 오히려 권장한다. 즉 "내용은 하나도 빼지 않되, 형식은
  마크다운답게 정리"가 원칙. 문장을 요약하거나 수치를 임의로 다듬거나 항목을
  제외하는 것은 금지.
  같은 제품에 대해 여러 출처(docx + 사용자가 채팅으로 준 추가 텍스트 등)가
  있으면 파일 하나에 "## 출처 1", "## 출처 2"처럼 구분해서 모두 보존한다.
  같은 시리즈에 모델이 추가되면 해당 series/type 폴더에 새 파일을 만든다.
- 문서 상단에 출처(예: 제조사 공식 스펙시트 파일명, PDF, 웹페이지 URL)를
  파악할 수 있으면 함께 남긴다.
- 스피커는 시리즈별 하위 폴더, 앰프는 타입별 하위 폴더로 분류한다. 앰프
  타입은 데이터 파일의 `type` 필드를 그대로 폴더명으로 사용한다(예:
  `Amplified Controller` → `amplified-controller/`, `Rack` → `rack/`).
- 특정 모델 1개가 아니라 라인업 전체에 걸친 공용 참조 문서(예: preset guide,
  amplification reference 등 technical bulletin류)는 `<mk>/references/`
  폴더에 저장한다. 원본 파일(pdf/docx 등)과 마크다운 정리본을 같은 폴더에
  나란히 둔다 — 정리본은 원문 표/문단을 요약·생략 없이 마크다운 구조(표,
  헤더, 리스트)로 옮긴 것. 표가 복잡해 열 병합 등으로 셀 매핑이 헷갈리는
  경우, 반드시 코드로 표를 재추출해 검증한 뒤 정리본에 반영하고 검증
  여부를 문서에 남긴다(예: "✅ pdfplumber로 재추출 검증 완료" 각주).

## 예외 — 역재구성본

아래 파일들은 이 관례가 생기기 **이전에** 이미 데이터 파일로 반영된 뒤라
원문 자체가 유실되었습니다. 각 파일 상단에 "역재구성본"임이 명시되어 있고,
데이터 파일에서 역으로 재구성한 참고용 스펙시트입니다. 향후 같은 제품의
새 스펙을 받으면 해당 파일을 원문으로 교체해 정상 상태로 되돌립니다.

- `la/speakers/**` 대부분(A/K/L/S/X Series, Subwoofers) — 29개 모델
  (**예외**: K Series 8개 모델(K1/K1-SB/K2/K3/K3i/Kara II/Kara IIi/Kiva II)은
  이 "역재구성본" 목록에서 빠짐 — 사용자가 원본 docx + 채팅 텍스트를 제공해
  정상 상태(원문 확보)로 교체됐기 때문. 2026-07-10)
- `la/amplifiers/amplified-controller/{la1dot16i,la12x,la4x,la7dot16}.md`
  (LA2Xi는 예외 — 사용자 제공 원본 문서 기반으로 신뢰도 높음)
- `db/speakers/**` 전체(CL Series, SL Series) — 9개 모델
- `db/amplifiers/amplified-controller/d90.md`
- `my/speakers/**` 전체(PANTHER/LEOPARD/TIGRA/LINA Series) — 9개 모델

## 원문 대기 중

- `la/amplifiers/rack/la-rak-iii.md` — 사용자가 원문 텍스트를 붙여넣어
  주셨으나 저장을 놓쳐 유실. 데이터 파일에는 반영되어 있음. 원문을 다시
  받으면 이 파일에 그대로 저장.

## references/ 처리 현황 (2026-07-10)

- `la/references/amplification-reference-tb-en.{pdf,md}` — technical
  bulletin v16.0. Drive capacity/SPL 표는 pdfplumber로 셀 경계선(도형
  좌표) 재추출 검증 완료(✅ 각주 표시).
- `la/references/preset-guide-en.{pdf,md}` — owner's manual EN v29.0
  (126페이지). 목차/개정이력/preset design 요약/Impedance·Drive·SPL
  크로스레퍼런스만 본 파일에 남기고, 시리즈별 프리셋 구성표(loudspeaker
  configuration/preset/acoustic properties)는 `presets/` 하위에 기존
  `speakers/` 시리즈 폴더명과 동일하게 폴더링해 모델별 파일로 분리
  (k-series/a-series/l-series/s-series/x-series/subwoofers/legacy).
