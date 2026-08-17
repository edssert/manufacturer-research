// L-Acoustics 액세서리 데이터 (리깅 툴/케이블 등). 필드 스키마는
// accessories.view.js 의 cardHTML/modalBodyHTML 참고
// (name/mfr/type/price/weight/material/compatibleWith/notes/img/lengths).
// 원문: raw-data/raw-specs/la/accessories/cables.md, rigging.md
// (l-acoustics.com/products/ 카탈로그 목록, "System Elements" 전량 — 타입별 분리).
// price/weight/material 은 카탈로그 목록 페이지에 없어 미확인(null) —
// 개별 제품 페이지 확인 시 보강.
// 같은 케이블의 길이만 다른 변형(예: SP25/SP10/SP5/SP.7)은
// 카드를 따로 만들지 않고 1개 레코드로 통합해 `lengths` 배열(칩 목록)로
// 보여준다 — DOE(2/45/100m), DOM CROSS LINK(30/45m), SP(0.7/5/10/25m),
// DO(0.7/5/10/25m) 4개 계열을 통합. 나머지 단일 길이 품목은 그대로 유지.
// lengths 각 항목의 id 는 통합 전 원래 개별 제품 id 를 보존한다(참조용).
export const LA_ACCESSORIES = [
  { "id": "acc-la-la-rak-bump-iii", "mfr": "la", "name": "LA-RAK BUMP III", "type": "Rigging", "price": null, "weight": null, "material": null, "compatibleWith": "All LA-RAK versions", "notes": "Structure for flying 4 LA-RAK", "img": null },
  { "id": "acc-la-la-rakmount", "mfr": "la", "name": "LA-RAKMOUNT", "type": "Rigging", "price": null, "weight": null, "material": null, "compatibleWith": null, "notes": "Mounting cradles for 1 LA-RAK", "img": null },
  { "id": "acc-la-k2-rakmount", "mfr": "la", "name": "K2-RAKMOUNT", "type": "Rigging", "price": null, "weight": null, "material": null, "compatibleWith": null, "notes": "4 mounting cradle for LA-RAK (incl. rack stabilizer)", "img": null },
  {
    "id": "acc-la-pow2", "mfr": "la", "name": "POW2", "type": "Cables", "price": null, "weight": null, "material": null, "compatibleWith": null,
    "notes": "32A Power Link",
    "img": "public/assets/img/accessories/la/acc-la-pow2.webp",
    "lengths": [{ "id": "acc-la-pow2", "value": "2m" }],
    // [사진 근거] 몸체의 "PCE"와 케이블의 "NEXANS" 각인 및 커넥터 형상이
    // CEE(IEC 60309) 32A 규격에 대응한다. 한쪽은 Male(핀 노출), 다른 쪽은
    // Female(소켓)이다.
    "connection": { "in": "CEE 32A (M)", "out": ["CEE 32A (F)"] }
  },
  {
    "id": "acc-la-doe",
    "mfr": "la", "name": "DOE", "type": "Cables", "price": null, "weight": null, "material": null, "compatibleWith": null,
    "notes": "Dual AVB network cable CAT6A: etherCON™",
    "img": "public/assets/img/accessories/la/acc-la-doe.webp",
    "lengths": [
      { "id": "acc-la-doe100", "value": "100m" },
      { "id": "acc-la-doe45", "value": "45m" },
      { "id": "acc-la-doe2", "value": "2m" }
    ],
    // DOE는 양끝 모두 CAT6A etherCON 커넥터가 2개씩(Dual) 있는
    // 대칭 케이블 — 분기(in→out)가 아니라 양방향 연결이라 bidirectional:
    // true로 표시하면 connectionDiagramHTML이 화살표를 →가 아닌 ↔로 렌더링.
    "connection": { "in": "etherCON CAT6A x2", "out": ["etherCON CAT6A x2"], "bidirectional": true }
  },
  {
    // DOM(CROSS LINK, 30/45m)과 DOM2(AMP
    // LINK, 2m)는 원문 카탈로그 notes가 다르지만(링크 타입 명칭만 다름),
    // 검색 결과(Fairlight/Bekafun/Solotech 등 유통사 페이지 교차 확인)로
    // 둘 다 동일한 19핀 CA-COM Female 커넥터를 쓰는 같은 케이블 계열임을
    // 확인 — DOMP-2 어댑터도 "AMP & CROSS LINK" 겸용으로 명시되어 있어
    // 실질적으로 길이만 다른 변형으로 판단, 카드 1개로 통합.
    "id": "acc-la-dom-cross",
    "mfr": "la", "name": "DOM (CROSS/AMP LINK)", "type": "Cables", "price": null, "weight": null, "material": null, "compatibleWith": null,
    "notes": "6 pair multiconductor cable CROSS/AMP LINK",
    "img": "public/assets/img/accessories/la/acc-la-dom-cross.webp",
    "lengths": [
      { "id": "acc-la-dom45", "value": "45m" },
      { "id": "acc-la-dom30", "value": "30m" },
      { "id": "acc-la-dom2", "value": "2m" }
    ],
    // DOM(CROSS LINK)은 DOE와 동일하게 양끝이 같은 커넥터(19핀 CA-COM,
    // Female)인 대칭 케이블 — 18핀이 6채널 밸런스드 오디오(6 pair) 전송에
    // 쓰임. bidirectional: true로 ↔ 표시.
    "connection": { "in": "CA-COM 19-pole (F)", "out": ["CA-COM 19-pole (F)"], "bidirectional": true }
  },
  {
    "id": "acc-la-domp-2", "mfr": "la", "name": "DOMP-2", "type": "Cables", "price": null, "weight": null, "material": null, "compatibleWith": "AMP & CROSS LINK",
    "notes": "Male/Male adapter LINK-EXTEND",
    "img": "public/assets/img/accessories/la/acc-la-domp-2.webp",
    // [사진 근거] "CC19BFPM-2" 각인과 노출된 핀 형상은 양쪽 모두 19핀
    // CA-COM Male임을 보여 주며 notes의 "Male/Male adapter"와 일치한다.
    // DOE와 동일하게 양끝 동일 커넥터인 대칭 어댑터라 bidirectional 사용.
    "connection": { "in": "CA-COM 19-pole (M)", "out": ["CA-COM 19-pole (M)"], "bidirectional": true }
  },
  {
    "id": "acc-la-domf", "mfr": "la", "name": "DOMF", "type": "Cables", "price": null, "weight": null, "material": null, "compatibleWith": null,
    "notes": "Multipair cable adapter LINK-BREAKOUT 6 LR3 female",
    "img": "public/assets/img/accessories/la/acc-la-domf.webp",
    // [커넥터] DOM 계열과 동일한 19핀 CA-COM(F) 입력이 XLR3(3핀 XLR)
    // Female 6개로 갈라진다. 카탈로그 notes의 "LR3"는 XLR3를 가리키므로
    // 다이어그램에는 실제 규격명인 XLR3를 사용한다(cables.md 각주 참고).
    // DO3WFILL과 같은 in→out 다이어그램 패턴.
    "connection": { "in": "CA-COM 19-pole (F)", "out": ["XLR3 (F)", "XLR3 (F)", "XLR3 (F)", "XLR3 (F)", "XLR3 (F)", "XLR3 (F)"] }
  },
  {
    "id": "acc-la-domm", "mfr": "la", "name": "DOMM", "type": "Cables", "price": null, "weight": null, "material": null, "compatibleWith": null,
    "notes": "Multipair cable adapter LINK-BREAKOUT 6 LR3 male",
    "img": "public/assets/img/accessories/la/acc-la-domm.webp",
    // [커넥터] DOMF와 대칭으로, 19핀 CA-COM(F) 입력이 XLR3(3핀 XLR,
    // Neutrik) Male 6개로 갈라진다.
    // 원문 notes의 "LR3"는 XLR3 축약/오타 표기(cables.md 각주 참고).
    "connection": { "in": "CA-COM 19-pole (F)", "out": ["XLR3 (M)", "XLR3 (M)", "XLR3 (M)", "XLR3 (M)", "XLR3 (M)", "XLR3 (M)"] }
  },
  {
    "id": "acc-la-sp",
    "mfr": "la", "name": "SP", "type": "Cables", "price": null, "weight": null, "material": null, "compatibleWith": null,
    "notes": "Speaker cable: 4 x 4mm² NL4",
    "img": "public/assets/img/accessories/la/acc-la-sp.webp",
    // DOE와 동일 패턴 — 양끝 동일 NL4 커넥터인 대칭 케이블.
    "connection": { "in": "NL4", "out": ["NL4"], "bidirectional": true },
    "lengths": [
      { "id": "acc-la-sp25", "value": "25m" },
      { "id": "acc-la-sp10", "value": "10m" },
      { "id": "acc-la-sp5", "value": "5m" },
      { "id": "acc-la-sp-7", "value": "0.7m" }
    ]
  },
  {
    "id": "acc-la-sp-y1", "mfr": "la", "name": "SP-Y1", "type": "Cables", "price": null, "weight": null, "material": null, "compatibleWith": null,
    "notes": "Y split speaker cable: 2 x 2.5mm² NL4 (with CC4FP adaptator)",
    "views": [
      { "label": "Front", "src": "public/assets/img/accessories/la/acc-la-sp-y1.webp" },
      { "label": "Signal Flow", "src": "public/assets/img/accessories/la/acc-la-sp-y1-signal-flow.webp", "whitebg": true, "whitebg2": true }
    ],
    "lengths": [{ "id": "acc-la-sp-y1", "value": "1m" }],
    // [커넥터] 공식 제품 설명의 "4-point SpeakON to 2 × 2-point SpeakON"에
    // 따라 NL4 입력을 NL2 출력 2개로 분리한다. notes의 "2 x 2.5mm²"는
    // 케이블 굵기와 도체 규격이며 출력 커넥터 규격이 아니다.
    // [핀 매핑] NL4는 4단자(1+/1-/2+/2-)로 앰프 2채널을 한 케이블에
    // 실어 나르는 구조 — 전기적 분기가 아니라 채널1(1+/1-)을 그대로
    // 첫 NL2로, 채널2(2+/2-)를 그대로 두번째 NL2로 "분리"해 각기 다른
    // 인클로저로 보낸다(X12 매뉴얼 "each feeding one enclosure"와 일치).
    "connection": { "in": "NL4", "out": ["NL2", "NL2"] }
  },
  {
    "id": "acc-la-do",
    "mfr": "la", "name": "DO", "type": "Cables", "price": null, "weight": null, "material": null, "compatibleWith": null,
    "notes": "Speaker cable: 8 x 4mm² CA-COM",
    // [이미지] 전체 케이블 사진에는 L-ACOUSTICS 및 8x4mm² 각인이 보여 Front로,
    // CA-COM 단품 사진은 Connector로 표시한다. 두 원본이 외부 자산 저장소에
    // 없으므로 이미지를 재가공하기 전에 원본을 확보해야 한다.
    "views": [
      { "label": "Front", "src": "public/assets/img/accessories/la/acc-la-do-full.webp" },
      { "label": "Connector", "src": "public/assets/img/accessories/la/acc-la-do.webp" }
    ],
    // DO는 breakout(분기)이 아니라 양끝이 CA-COM 8핀 커넥터인
    // 일반 스피커케이블 — connectionDiagramHTML을 그대로 재사용해
    // "CA-COM → CA-COM"을 시각적으로 표시.
    // [커넥터] 양끝은 같은 성별이 아니며 한쪽은 Male, 다른 쪽은 locking
    // ring이 있는 Female이다(cables.md 각주 참고).
    "connection": { "in": "CA-COM (M)", "out": ["CA-COM (F)"] },
    "lengths": [
      { "id": "acc-la-do25", "value": "25m" },
      { "id": "acc-la-do10", "value": "10m" },
      { "id": "acc-la-do5", "value": "5m" },
      { "id": "acc-la-do-7", "value": "0.7m" }
    ]
  },
  {
    "id": "acc-la-dofill-la8", "mfr": "la", "name": "DOFILL-LA8", "type": "Cables", "price": null, "weight": null, "material": null,
    "compatibleWith": "Active 2 way enclosures", "notes": "Speaker cable extension for active 2 way enclosures",
    "views": [
      { "label": "Front", "src": "public/assets/img/accessories/la/acc-la-dofill-la8.webp" },
      { "label": "Spec", "src": "public/assets/img/accessories/la/acc-la-dofill-la8-spec.webp" }
    ],
    "lengths": [{ "id": "acc-la-dofill-la8", "value": "3.5m" }],
    // "CA-COM > 2 NL-4" 같은 커넥터 변환 표기를 텍스트로만
    // 두지 않고 입력→출력 다이어그램으로 시각화 — connection: { in, out[] }.
    // [커넥터] CA-COM 쪽은 locking ring이 있는 8핀 Male이다. NL4 쪽은
    // 성별을 뒷받침하는 근거가 없으므로 표기하지 않는다.
    "connection": { "in": "CA-COM (M)", "out": ["NL-4", "NL-4"] }
  },
  {
    "id": "acc-la-do3wfill", "mfr": "la", "name": "DO3WFILL", "type": "Cables", "price": null, "weight": null, "material": null,
    "compatibleWith": null, "notes": "Speaker cable breakout",
    "views": [
      { "label": "Front", "src": "public/assets/img/accessories/la/acc-la-do3wfill.webp" },
      { "label": "Signal Flow", "src": "public/assets/img/accessories/la/acc-la-do3wfill-signal-flow.webp", "whitebg": true }
    ],
    // [길이] 카탈로그 텍스트의 3m보다 공식 신호 흐름도의 치수 표기 3.5m가
    // 구체적이므로 length에는 3.5m를 사용한다.
    "lengths": [{ "id": "acc-la-do3wfill", "value": "3.5m" }],
    // [커넥터] CA-COM 쪽은 locking ring이 있는 8핀 Male이다. NL2/NL4 쪽은
    // 성별을 뒷받침하는 근거가 없으므로 표기하지 않는다.
    "connection": { "in": "CA-COM (M)", "out": ["NL-4", "NL-2", "NL-2"] }
  },
  {
    "id": "acc-la-dosub-la8", "mfr": "la", "name": "DOSUB-LA8", "type": "Cables", "price": null, "weight": null, "material": null,
    "compatibleWith": "Passive enclosures", "notes": "Speaker cable breakout for passive enclosures",
    "img": "public/assets/img/accessories/la/acc-la-dosub-la8.webp",
    "lengths": [{ "id": "acc-la-dosub-la8", "value": "5m" }],
    // [커넥터] SPK1~4 라벨과 형상에 따라 CA-COM 쪽은 locking ring이 있는
    // Male이다. NL2(speakON)는 케이블용 plug와 패널마운트 chassis로 구분하므로
    // XLR/CA-COM처럼 M/F를 표기하지 않는다.
    "connection": { "in": "CA-COM (M)", "out": ["NL-2", "NL-2", "NL-2", "NL-2"] }
  },
  {
    "id": "acc-la-sc32",
    "mfr": "la", "name": "SC32", "type": "Cables", "price": null, "weight": null, "material": null, "compatibleWith": null,
    "notes": "Speaker cable: 32 x 1.5mm²",
    "img": "public/assets/img/accessories/la/acc-la-sc32.webp",
    // 양끝 37핀 커넥터, 웹 검색으로 확인한 male & female
    // 구성을 사진상 실제 구분 없이 그대로 반영 — SC32(M) → SC32(F).
    "connection": { "in": "SC32 (M)", "out": ["SC32 (F)"] },
    "lengths": [
      { "id": "acc-la-sc32-50", "value": "50m" },
      { "id": "acc-la-sc32-25", "value": "25m" },
      { "id": "acc-la-sc32-10", "value": "10m" },
      { "id": "acc-la-sc32-5", "value": "5m" }
    ]
  },
  {
    "id": "acc-la-sc32-4do", "mfr": "la", "name": "SC32-4DO", "type": "Cables", "price": null, "weight": null, "material": null,
    "compatibleWith": null, "notes": "Speaker cable breakout: SC32 to 4 x CA-COM",
    "img": "public/assets/img/accessories/la/acc-la-sc32-4do.webp",
    "lengths": [{ "id": "acc-la-sc32-4do", "value": "2m" }],
    // [커넥터] SC32 쪽은 Male이다. CA-COM 쪽은 성별을 뒷받침하는 근거가
    // 없으므로 표기하지 않는다.
    "connection": { "in": "SC32 (M)", "out": ["CA-COM", "CA-COM", "CA-COM", "CA-COM"] }
  },
  {
    "id": "acc-la-bob32", "mfr": "la", "name": "BOB32", "type": "Breakout box", "price": null, "weight": null, "material": null,
    "compatibleWith": null, "notes": "Breakout box: SC32 to 2 x CA-COM + 8 x NL4",
    "img": "public/assets/img/accessories/la/acc-la-bob32-front.webp",
    // [이미지] 01은 CA-COM/NL4 출력이 있는 Front, 02는 SC32 입력이 있는 Rear다.
    // 원본은 MR-Raw-Assets/la/accessories/web/cables/bob32/overview/의
    // BOB32_CA-COM_01.png, BOB32_SC32_02.png (OneDrive).
    "views": [
      { "label": "Front", "src": "public/assets/img/accessories/la/acc-la-bob32-front.webp" },
      { "label": "Rear", "src": "public/assets/img/accessories/la/acc-la-bob32-rear.webp" }
    ],
    "connection": { "in": "SC32", "out": ["CA-COM", "CA-COM", "NL4", "NL4", "NL4", "NL4", "NL4", "NL4", "NL4", "NL4"] }
  },
  // [시스템 구성] K1 System Elements의 기준 자료:
  // raw-data/raw-specs/la/speakers/k-series/k1/k1.md (System Elements 섹션),
  // raw-data/raw-specs/la/accessories/rigging.md,
  // protections-transportations.md 참고.
  { "id": "acc-la-k1-bump", "mfr": "la", "name": "K1-BUMP", "type": "Rigging", "price": null, "weight": null, "material": null, "compatibleWith": "K1, K1-SB", "notes": "Structure for flying & stacking K1 and K1-SB arrays", "img": "public/assets/img/speakers/la/k-series/spk-la-k1-array.png", "views": [
    { "label": "With K1 (8x K1 + K1-BUMP)", "src": "public/assets/img/speakers/la/k-series/spk-la-k1-array.png" },
    { "label": "With K1-SB (8x K1-SB + K1-BUMP)", "src": "public/assets/img/speakers/la/k-series/spk-la-k1-sb-array.png" }
  ], "relatedAccessoryIds": ["acc-la-k1-delta", "acc-la-k-bumpflight"] },
  { "id": "acc-la-k1-delta", "mfr": "la", "name": "K1-DELTA", "type": "Rigging", "price": null, "weight": null, "material": null, "compatibleWith": "K1-BUMP", "notes": "Rigging accessory for rear attachment of 2 motors to K1-BUMP", "img": null, "relatedAccessoryIds": ["acc-la-k1-bump"] },
  { "id": "acc-la-la-sling2t", "mfr": "la", "name": "LA-SLING2T", "type": "Rigging", "price": null, "weight": null, "material": null, "compatibleWith": null, "notes": "1m chain sling with two-leg bridles rated 2 tons", "img": null },
  { "id": "acc-la-k1-bpchain", "mfr": "la", "name": "K1-BPCHAIN", "type": "Rigging", "price": null, "weight": null, "material": null, "compatibleWith": "K1, K2", "notes": "Extension sling for K1 and K2", "img": null },
  { "id": "acc-la-k2-link", "mfr": "la", "name": "K2-LINK", "type": "Rigging", "price": null, "weight": null, "material": null, "compatibleWith": "K2 below K1", "notes": "Rigging accessory for rear attachment of K2 below K1", "img": null },
  { "id": "acc-la-kara-downk1", "mfr": "la", "name": "KARA-DOWNK1", "type": "Rigging", "price": null, "weight": null, "material": null, "compatibleWith": "Kara (II) below K1", "notes": "Interface for flying Kara (II) below K1", "img": null },
  { "id": "acc-la-k1-lasermount", "mfr": "la", "name": "K1-LASERMOUNT", "type": "Rigging", "price": null, "weight": null, "material": null, "compatibleWith": "TEQSAS / SSE Prosight / Align Array / KSG", "notes": "K1 Laser mount", "img": null },
  { "id": "acc-la-laser-magplate", "mfr": "la", "name": "LASER-MAGPLATE", "type": "Rigging", "price": null, "weight": null, "material": null, "compatibleWith": "TEQSAS LAP-TEQ PLUS", "notes": "Magnetic plate for laser inclinometer", "img": null },
  { "id": "acc-la-k1-chariot2", "mfr": "la", "name": "K1-CHARIOT2", "type": "Protections & Transportations", "price": null, "weight": null, "material": null, "compatibleWith": "4 x K1 or 4 x K1-SB", "notes": "Chariot for 4 K1 or 4 K1-SB", "img": "public/assets/img/accessories/la/acc-la-k1-chariot2.webp", "relatedAccessoryIds": ["acc-la-k1-chariotcov"] },
  { "id": "acc-la-k1-chariotcov", "mfr": "la", "name": "K1-CHARIOTCOV", "type": "Protections & Transportations", "price": null, "weight": null, "material": null, "compatibleWith": "K1/K1-SB on CHARIOT", "notes": "Protective cover for 4 K1/K1-SB on CHARIOT", "img": null, "relatedAccessoryIds": ["acc-la-k1-chariot2"] },
  { "id": "acc-la-k-bumpflight", "mfr": "la", "name": "K-BUMPFLIGHT", "type": "Protections & Transportations", "price": null, "weight": null, "material": null, "compatibleWith": "2 x K1-BUMP or 2 x K2-BUMP", "notes": "Modular flight case for 2 K1-BUMP or 2 K2-BUMP", "img": "public/assets/img/accessories/la/acc-la-k-bumpflight.webp", "relatedAccessoryIds": ["acc-la-k1-bump"] },
  { "id": "acc-la-k1-pla", "mfr": "la", "name": "K1-PLA", "type": "Protections & Transportations", "price": null, "weight": null, "material": null, "compatibleWith": "K1 or K1-SB", "notes": "Removable front dolly for K1 or K1-SB enclosure", "img": null },
  { "id": "acc-la-k1-cov", "mfr": "la", "name": "K1-COV", "type": "Protections & Transportations", "price": null, "weight": null, "material": null, "compatibleWith": "K1", "notes": "Protective cover for K1 enclosure", "img": null },
  { "id": "acc-la-tech-toolcase-ii", "mfr": "la", "name": "TECH TOOLCASE II", "type": "Protections & Transportations", "price": null, "weight": null, "material": null, "compatibleWith": null, "notes": "System technician tool case to perform room measurements and line source array setup.", "img": null },
  { "id": "acc-la-maintenance-toolcase", "mfr": "la", "name": "MAINTENANCE TOOLCASE", "type": "Protections & Transportations", "price": null, "weight": null, "material": null, "compatibleWith": null, "notes": "Maintenance tool case fully loaded", "img": null }
];
