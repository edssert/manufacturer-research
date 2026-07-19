# L-Acoustics System Elements — Cables (Accessories)

> **원문** — l-acoustics.com/products/ 카탈로그 목록 페이지에서 사용자가
> 붙여넣은 원문 그대로 보관. 각 제품명은 l-acoustics.com/products/<slug>/
> 페이지 링크.

## Cables

- **POW2** — 32A Power Link 2m — https://www.l-acoustics.com/products/pow2/
- **DOE2** — Dual AVB network cable CAT6A: etherCON™ 2m length — https://www.l-acoustics.com/products/doe2/
- **DOE45** — Dual AVB network cable CAT6A: etherCON™ 45m length — https://www.l-acoustics.com/products/doe45/
- **DOE100** — Dual AVB network cable CAT6A: etherCON™ 100m length — https://www.l-acoustics.com/products/doe100/
- **DOM45** — 6 pair multiconductor cable CROSS LINK 45m length — https://www.l-acoustics.com/products/dom45/
- **DOM30** — 6 pair multiconductor cable CROSS LINK 30m length — https://www.l-acoustics.com/products/dom30/
- **DOM2** — 6 pair multiconductor cable AMP LINK 2m length — https://www.l-acoustics.com/products/dom2/
- **DOMP-2** — Male/Male adapter LINK-EXTEND for AMP & CROSS LINK — https://www.l-acoustics.com/products/domp-2/
- **DOMF** — Multipair cable adapter LINK-BREAKOUT 6 LR3 female — https://www.l-acoustics.com/products/domf/
- **DOMM** — Multipair cable adapter LINK-BREAKOUT 6 LR3 male — https://www.l-acoustics.com/products/domm/
- **SP25** — Speaker cable: 4 x 4mm² NL4 25m length — https://www.l-acoustics.com/products/sp25/
- **SP10** — Speaker cable: 4 x 4mm² NL4 10m length — https://www.l-acoustics.com/products/sp10/
- **SP5** — Speaker cable: 4 x 4mm² NL4 5m length — https://www.l-acoustics.com/products/sp5/
- **SP.7** — Speaker cable: 4 x 4mm² NL4 0.7m length — https://www.l-acoustics.com/products/sp-7/
- **SP-Y1** — Y split speaker cable: 2 x 2.5mm² NL4 1m length (with CC4FP adaptator) — https://www.l-acoustics.com/products/sp-y1/
- **DO25** — Speaker cable: 8 x 4mm² CA-COM 25m length — https://www.l-acoustics.com/products/do25/
- **DO10** — Speaker cable: 8 x 4mm² CA-COM 10m length — https://www.l-acoustics.com/products/do10/
- **DO5** — Speaker cable: 8 x 4mm² CA-COM 5m length — https://www.l-acoustics.com/products/do5/
- **DO.7** — Speaker cable: 8 x 4mm² CA-COM 0.7m length — https://www.l-acoustics.com/products/do-7/
- **DOFILL-LA8** — Speaker cable extension for active 2 way enclosures CA-COM > 2 NL-4 length 3.5m — https://www.l-acoustics.com/products/dofill-la8/
- **DO3WFILL** — Speaker cable breakout CA-COM > 2 NL-2 + 1 NL4 3m length — https://www.l-acoustics.com/products/do3wfill/
- **DOSUB-LA8** — Speaker cable breakout for passive enclosures CA-COM > 4 NL-2 length 5m — https://www.l-acoustics.com/products/dosub-la8/
- **BOB32** — Breakout box: SC32 to 2 x CA-COM + 8 x NL4 — https://www.l-acoustics.com/products/bob32/
- **SC32-4DO** — Speaker cable breakout: SC32 to 4 x CA-COM 2m length — https://www.l-acoustics.com/products/sc32-4do/
- **SC32-5** — Speaker cable: 32 x 1.5mm² 5m length — https://www.l-acoustics.com/products/sc32-5/
- **SC32-10** — Speaker cable: 32 x 1.5mm² 10m length — https://www.l-acoustics.com/products/sc32-10/
- **SC32-25** — Speaker cable: 32 x 1.5mm² 25m length — https://www.l-acoustics.com/products/sc32-25/
- **SC32-50** — Speaker cable: 32 x 1.5mm² 50m length — https://www.l-acoustics.com/products/sc32-50/

총 28개 항목 (LA-RAK III 제품 페이지에서 확인된 SC32 계열/BOB32 6개 포함).

## DO3WFILL — 추가 출처 (사용자 업로드 이미지, 2026-07-13)

- 출처: 사용자가 Upload 폴더에 추가한 공식 제품 이미지 2장.
  - `raw-data/raw-images/la/accessories/cables/DO3WFILL_01.png` — 실물 케이블 사진.
  - `raw-data/raw-images/la/accessories/cables/DO3WFILL_signal-flow.png` — 공식 signal flow 다이어그램.
- 다이어그램 표기: 길이 **3.5m** (라인 29의 카탈로그 텍스트 "3m"과 불일치).
- **교차검증**: 다이어그램은 제조사가 배포한 상세 도면으로 치수 표기 신뢰도가
  카탈로그 목록 페이지 요약 텍스트보다 높다고 판단해 **3.5m를 최종 채택**
  (`js/domains/accessories/data/la.data.js`의 `acc-la-do3wfill.lengths` 반영).
- 다이어그램상 출력 라벨 순서: 2WAY(NL-4) → SUB1(NL-2) → SUB2(NL-2).

## DOE — 추가 출처 (사용자 업로드 이미지, 2026-07-13)

- 출처: 사용자가 Upload 폴더에 추가한 실물 케이블 사진.
  - `raw-data/raw-images/la/accessories/cables/DOE_01.png`
- 라인 10의 카탈로그 텍스트("Dual AVB network cable CAT6A: etherCON™")대로
  양끝 모두 CAT6A etherCON 커넥터 2개씩(Dual) 있는 대칭 케이블임을 사진으로
  확인. `js/domains/accessories/data/la.data.js`의 `acc-la-doe.connection`에
  "etherCON CAT6A x2 ↔ etherCON CAT6A x2" 양방향 다이어그램으로 반영.

## DOFILL-LA8 — 추가 출처 (사용자 업로드 이미지, 2026-07-13)

- 출처: 사용자가 Upload 폴더에 추가한 이미지 2장.
  - `raw-data/raw-images/la/accessories/cables/DOFILL-LA8_01.png` — 실물 케이블 사진(투명 배경).
  - `raw-data/raw-images/la/accessories/cables/DOFILL-LA8_02.png` — 커넥터+케이블 표기(투명 배경) 사진, "Prof. Speakercable 4 x 4,0 mm²" 라벨 포함.
- 두 사진 모두 `js/domains/accessories/data/la.data.js`의 `acc-la-dofill-la8.views`에
  Front/Spec 순서로 반영(이미지만 추가, notes/스펙 필드는 변경하지 않음 — 사용자 확인).

## DOM (CROSS LINK) — 커넥터 정보 추가 (웹 검색 조사, 2026-07-13)

- 사용자 요청으로 connection 다이어그램 추가를 위해 웹 검색으로 커넥터
  스펙 조사(제품 사진 없음, 공식 제품 페이지 자체엔 스펙 미기재).
- 출처: (1) manuals.plus의 "L-Acoustics Cables: Feature Overview and
  Specifications" 검색 스니펫 — "DOM cables utilize a 19-pin CA-COM
  connector, of which 18 pins are used to transport 6 channels of balanced
  analog audio... Available versions include DOM2, DOM30, DOM45 with female
  19-pin CA-COM connectors". (2) Klotz AIS 유통사 페이지
  (shop.klotz-ais.com "PolyLITE - RMP 19p F/F - DOM") — 19핀, Female/Female
  구성 교차 확인.
- 18핀(6쌍, pair당 +/-/ground 3핀)이 "6 pair multiconductor" 스펙과 일치 —
  두 출처가 일치해 신뢰도 있다고 판단, CA-COM 19-pole(F) 양방향으로 채택.
  `acc-la-dom-cross.connection`에 반영. 공식 PDF 원문 대조는 아직 못함
  (PDF 직접 파싱 불가) — 추후 사용자가 실물 사진/공식 PDF 제공 시 재검증 권장.

## DOM(CROSS LINK) + DOM2(AMP LINK) 통합 (사용자 요청, 2026-07-13)

- 원문(라인 15/16) 상 DOM45/DOM30은 "CROSS LINK", DOM2는 "AMP LINK"로 링크
  타입 명칭이 다르지만, 웹 검색 결과(Fairlight/Bekafun/Solotech 등 유통사
  페이지)로 둘 다 동일한 19핀 CA-COM Female 커넥터를 쓰는 같은 케이블
  계열임을 확인 — DOMP-2 어댑터도 "Male/Male adapter LINK-EXTEND for AMP
  & CROSS LINK"로 양쪽 겸용 명시.
- 결론: 실질적으로 길이(2/30/45m)만 다른 변형으로 판단해 `acc-la-dom-cross`
  카드 1개로 통합(`lengths`에 2m 추가), name을
  "DOM (CROSS/AMP LINK)"로 변경. `acc-la-dom2` id는 lengths 항목의 id로
  보존.

## DOM — 사진 반영 (사용자 업로드 이미지, 2026-07-13)

- 출처: 사용자가 Upload 폴더에 추가한 실물 케이블 사진.
  - `raw-data/raw-images/la/accessories/cables/DOM_01.png` — 19핀 Female
    커넥터 양끝 대칭 구조(크로마키 초록 배경, 알파 채널로 이미 투명 처리됨).
- 사진상 양끝 커넥터가 동일 19핀 Female인 것을 육안으로도 확인 — 앞서
  웹 검색으로 채택한 CA-COM 19-pole(F) 양방향 connection과 일치.
  `js/domains/accessories/data/la.data.js`의 `acc-la-dom-cross.img`에 반영.

## DOMF — 사진 반영 및 connection 추가 (사용자 업로드 이미지, 2026-07-13)

- 출처: 사용자가 Upload 폴더에 추가한 실물 케이블 사진.
  - `raw-data/raw-images/la/accessories/cables/DOMF_01.png` — 입력단 19핀
    Female CA-COM 커넥터(DOM과 동일 형태) 1개가 LR3 female 커넥터 6개로
    갈라지는 breakout 어댑터.
- 원문(라인 17) notes "Multipair cable adapter LINK-BREAKOUT 6 LR3 female"과
  사진이 일치 — DO3WFILL과 같은 in→out breakout 다이어그램 패턴으로
  `acc-la-domf.connection`에 "CA-COM 19-pole(F) → LR3(F) x6" 반영.

### "LR3" = XLR3 표기 확인 (웹 검색 조사, 2026-07-13)

- 사용자 질문("LR3가 뭐냐")으로 조사. 출처: jsfrance.com(프랑스 L-Acoustics
  중고/신품 유통사)의 DOMF 상품 페이지 — URL 슬러그와 상품명이
  "xlr3-femelle"(XLR3 female)이고, 같은 페이지의 "Accessories" 탭에
  이 제품과 짝지어지는 부품으로 "L-ACOUSTICS - Female plug **3 poles
  XLR**"이 연결되어 있음.
- 결론: "LR3"는 별도 규격이 아니라 표준 3핀 XLR 커넥터(XLR3)를 가리키는
  L-Acoustics 카탈로그의 축약/오타 표기로 판단. 왜 X를 뺐는지(오타인지
  의도된 자체 약어인지)는 공식 출처로 확인 못함 — L-Acoustics가 공식
  설명을 낸 적이 없어 보임. `acc-la-domf.connection`의 다이어그램
  표기는 사용자 확인에 따라 실제 규격명 "XLR3"로 정정, `notes` 원문
  텍스트("LR3")는 카탈로그 원문 그대로 보존.

## 기존 다이어그램 M/F(Male/Female) 표기 일괄 조사 (웹 검색, 2026-07-13)

- 사용자 요청으로 DOM/DOMF 외 기존 connection 다이어그램(DO, DOFILL-LA8,
  DO3WFILL, DOSUB-LA8, SC32-4DO, BOB32)의 커넥터 성별을 웹 검색으로 조사.
- 출처: manuals.plus "L-Acoustics Cables: Feature Overview and
  Specifications" 검색 스니펫, Klotz AIS 유통사 페이지(shop.klotz-ais.com
  lpa4sns.html/lpa2fns.html), device.report 미러 문서 검색 스니펫.
- 확인되어 반영한 것:
  - DO(25/10/5/.7): 양끝 8핀 CA-COM, 한쪽 Male·한쪽 Female(양끝 동일
    성별 아님) — 기존에 "CA-COM → CA-COM" 대칭으로만 표기했던 것을
    "CA-COM (M) → CA-COM (F)"로 정정.
  - DOFILL-LA8, DO3WFILL: CA-COM 쪽 8핀 Male(locking ring) 확인 —
    in을 "CA-COM (M)"으로 표기. NL2/NL4 쪽 성별은 출처 못 찾아 미기재.
  - DOSUB-LA8: CA-COM(Male, 앰프측) 확인.
  - SC32-4DO: SC32 쪽 Male type 확인 — in을 "SC32 (M)"으로 표기. CA-COM
    쪽 성별은 출처 못 찾아 미기재.
- 확인 안 되어 그대로 둔 것: BOB32(SC32 자체가 M&F 양쪽 존재한다는 것은
  확인했으나, BOB32 박스의 SC32 입력 포트 성별은 특정 못함).

### [정정] NL2/NL4(speakON) 쪽 M/F 표기 제거 (사용자 질문 계기, 2026-07-13)

- 사용자 질문("뉴트릭 스피콘에도 male/female이 있냐")으로 재검토.
- speakON(NL2/NL4/NL8 등)은 XLR·CA-COM과 달리 "male 핀 노출 / female
  소켓"으로 나뉘는 커넥터가 아니다 — 케이블용 플러그(예: NL4FX)와 패널/
  섀시 마운트용(예: NL4MP)으로 구분되는 방식이며, 뉴트릭 공식 제품 라인업
  명칭 자체에 male/female 구분이 없음.
- DOSUB-LA8에 붙였던 "NL-2 (F)" 표기를 제거하고 "NL-2"(M/F 없음)로 정정.
  CA-COM/SC32/XLR3/CA-COM 19-pole 등 실제 male/female 구분이 있는
  커넥터의 M/F 표기는 그대로 유지.

## DOMM — 사진 반영 (사용자 업로드 이미지, 2026-07-13)

- 출처: 사용자가 Upload 폴더에 추가한 실물 케이블 사진.
  - `raw-data/raw-images/la/accessories/cables/DOMM_01.png` — 입력단 19핀
    Female CA-COM 1개가 XLR3(3핀 XLR, Neutrik 각인) Male 커넥터 6개로
    갈라지는 breakout 어댑터(크로마키 초록 배경, 알파 채널로 이미 투명
    처리됨). DOMF와 대칭(성별만 반대) 구조를 사진으로 확인.
- `js/domains/accessories/data/la.data.js`의 `acc-la-domm.connection`에
  "CA-COM 19-pole(F) → XLR3(M) x6" 반영, `img`에도 반영.

## DO — 케이블 전체 사진 추가 (사용자 업로드 이미지, 2026-07-13)

- 출처: 사용자가 Upload 폴더에 추가한 실물 케이블 전체 사진.
  - `raw-data/raw-images/la/accessories/cables/DO_01.png` — "L-ACOUSTICS
    CABLE HAUT PARLEUR 8x4mm²" 각인 확인, 8핀 CA-COM 양끝(한쪽 Male 핀
    노출, 한쪽 Female 소켓)이 명확히 보여 앞서 웹 검색으로 채택한
    "CA-COM (M) → CA-COM (F)" connection과 일치 재확인.
    (최초 업로드본 → 사용자가 Photoroom 배경제거본 "DO cable-Photoroom.png"
    으로 재교체 요청해 `DO_01.png`/`acc-la-do-full.webp` 둘 다 덮어씀.)
- `acc-la-do.img`(단일 필드, 기존 커넥터 단품 사진)를 `views` 배열로
  전환 — 신규 전체 사진을 Front(메인), 기존 CA-COM 커넥터 단품 사진
  (`acc-la-do.webp`)을 두번째(Connector)로 배치(사용자 요청).

## DOMP-2 — 사진 반영 (사용자 업로드 이미지, 2026-07-13)

- 출처: 사용자가 Upload 폴더에 추가한 실물 어댑터 사진.
  - `raw-data/raw-images/la/accessories/cables/DOMP-2_01.png` — "CC19BFPM-2"
    각인, 19핀 CA-COM 커넥터 양끝 모두 핀이 노출된 Male 타입 확인 — 원문
    notes "Male/Male adapter LINK-EXTEND"와 일치.
- `acc-la-domp-2.connection`에 "CA-COM 19-pole(M) ↔ CA-COM 19-pole(M)"
  (DOE와 동일 패턴, bidirectional) 반영, `img`에도 반영.

## POW2 — 사진 반영 및 커넥터 규격 조사 (사용자 업로드 이미지, 2026-07-13)

- 사용자가 "르그랑(Legrand) 소켓 아니냐"고 질문 → 웹 검색으로 조사.
- 출처: 사용자가 Upload 폴더에 추가한 실물 케이블 사진
  (`raw-data/raw-images/la/accessories/cables/POW2_01.png`) — 커넥터
  몸체에 "PCE" 각인, 케이블에 "NEXANS" 각인이 명확히 보임. "Legrand"
  각인은 사진 어디에도 없음.
- 웹 검색(CPC/Farnell "32A, 400V, Cable Mount CEE Plug - Pce" 등)으로
  이 빨간 5핀 32A 커넥터가 CEE(IEC 60309) 규격이며 PCE가 제조사임을
  교차 확인. Legrand는 같은 CEE 32A 규격의 여러 제조사 중 하나일 뿐,
  이 특정 제품의 실제 브랜드는 아닌 것으로 판단.
- `acc-la-pow2.connection`에 "CEE 32A (M) → CEE 32A (F)"(사진상 한쪽
  Male 핀 노출·한쪽 Female 소켓 확인) 반영, `img`에도 반영.

## SC32 / SC32-4DO — 사진 반영 (사용자 업로드 이미지, 2026-07-13)

- 출처: 사용자가 Upload 폴더에 추가한 실물 케이블 사진.
  - `raw-data/raw-images/la/accessories/cables/SC32_01.png` — 양끝 37핀
    커넥터(흰 배경, 배경 제거 처리). 웹 검색으로 확인한 "male & female
    양끝 SC32 커넥터" 구성 그대로, 사진상 실제 구분은 없지만 사용자
    요청으로 "SC32 (M) → SC32 (F)" connection 반영.
  - `raw-data/raw-images/la/accessories/cables/SC32-4DO_01.png` — 입력단
    SC32(37핀, 그물망 케이블 마감), 출력단 CA-COM(8핀) 4개 breakout —
    이전에 채택한 "SC32 (M) → CA-COM x4" connection과 일치 재확인.
- `acc-la-sc32.img`, `acc-la-sc32-4do.img`에 각각 반영.

## SP / SP-Y1 — 사진 반영 (사용자 업로드 이미지, 2026-07-13)

- 출처: 사용자가 Upload 폴더에 추가한 이미지.
  - `raw-data/raw-images/la/accessories/cables/SP_01.png` — KLOTZ
    "MULTICORE SPEAKER CABLE" 각인, 양끝 NL4(speakON) 커넥터. 사용자
    요청으로 "NL4 ↔ NL4"(DOE와 동일 대칭 패턴) connection 반영.
  - `raw-data/raw-images/la/accessories/cables/SP-Y1_01.png` — 실물 Y분기
    케이블 사진(Photoroom 배경 제거본).
  - `raw-data/raw-images/la/accessories/cables/SP-Y1_signal-flow.jpg` —
    공식 signal flow 다이어그램: 입력 NL4(원형 CC4FP 어댑터 표시) →
    CH(1)/CH(2)로 분기, 각 NL4, 1m. AB Service 유통사 도면으로 추정.
- **[connection 확정, 웹 검색 조사]** 사용자가 "NL4 → NL2 x2"로 제안했으나
  원문 notes("2 x 2.5mm² NL4")와 다이어그램 이미지 커넥터 모양이 모두
  NL4로 보여 재검토 요청 → 웹 검색으로 조사.
  - 출처: L-Acoustics X12 공식 유저 매뉴얼(manualslib.com, "Using SP-Y1
    cables" 페이지) 배선도 원문 — "Connect an SP cable... to the
    OUT1/OUT2 and OUT3/OUT4 speakON connectors... Use the CC4FP adapter
    of an SP-Y1 cable to split the signal into two channels, each
    feeding one enclosure." 배선 체인: "SP → SP-Y1 → CC4FP → SP → SP-Y1".
  - 1차 결론(오류): X12 매뉴얼 배선도 라벨만 보고 "SP-Y1 자체 입출력
    커넥터가 모두 NL4"라고 판단해 "NL4 → NL4 x2"로 반영했었음.

### [재정정] SP-Y1 connection: NL4 → NL2 x2 (사용자 질문 계기, 추가 웹 검색)

- 사용자가 "NL4 하나가 NL4 두개로 될 때 핀이 어떻게 연결되냐"고 질문 →
  핀 매핑을 조사하려고 재검색하다 SP-Y1 스펙 자체가 잘못됐음을 발견.
- 출처: l-audio.com(L-Acoustics 리셀러) SP-Y1 제품 페이지 등 다수 검색
  스니펫 — "SP-Y1 is a breakout cable for two passive enclosures...
  **Converts from 4-point SpeakON to 2 × 2-point SpeakON**, provided
  with a CC4FP adapter."
- 결론: 원문 notes의 "2 x 2.5mm² NL4"는 케이블 도체 굵기/규격 설명이지
  출력 커넥터가 NL4라는 뜻이 아니었음(원문 문구를 오독한 1차 판단 실수).
  실제로는 입력 NL4(4핀, 1개) → 출력 NL2(2핀) x2 breakout이 맞음 —
  사용자가 최초에 제안한 "NL2 x2"가 정확했음. `acc-la-sp-y1.connection`
  을 "NL4 → NL2 x2"로 최종 정정.
- **핀 매핑(사용자 질문 답변)**: NL4는 4단자(1+/1-/2+/2-)로 앰프의 독립
  2채널을 한 케이블에 함께 실어 나르는 구조 — CC4FP/SP-Y1은 전기적으로
  신호를 나누는 "분배기"가 아니라, 원래 NL4 안에 있던 두 채널을 물리
  적으로 "분리"한다. 채널1(1+/1-)이 그대로 첫 NL2의 +/-로, 채널2
  (2+/2-)가 그대로 두번째 NL2의 +/-로 연결되어 각 인클로저가 서로
  다른 앰프 채널을 받는다(X12 매뉴얼 "each feeding one enclosure"와
  일치). 출처: 뉴트릭 NL4/NL2 커넥터 핀아웃 관련 검색 스니펫(Audio
  University, audiopile.net NL4-to-2xNL2 breakout 제품 설명 등).
