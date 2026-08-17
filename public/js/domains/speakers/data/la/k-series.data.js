// L-Acoustics K Series 스피커 데이터 (8개 모델).
// 필드 스키마 설명은 speakers.schema.js 참조.
// 파생 필드(wayCount / network / lowUnitConfig)는 로드 시 normalize 함수가 생성하므로 저장하지 않는다.
export const LA_K_SERIES = [
  {
    "id": "spk-la-k1",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "K1",
    "series": "K Series",
    "throwCat": "Long Throw",
    "type": "Line Array",
    "throw": "Long throw >35m",
    "lowInch": 15,
    "lowQty": 2,
    "crossover": "3-way, active",
    "crossoverTags": [
      "3-way",
      "active"
    ],
    "spl": 149,
    "cov": {
      "h": "90°",
      "splayList": [
        0.25,
        1,
        2,
        3,
        4,
        5
      ]
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "42 Hz",
        "hi": "19 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "38 Hz",
        "hi": "19 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "35 Hz",
        "hi": "20 kHz"
      }
    ],
    // [지향성] Cardioid_Capability — 원문:
    // raw-data/raw-specs/la/speakers/k-series/k1/k1.md acoustical_performance 섹션.
    "cardioidCapability": "No",
    "weight": 106,
    "transducers": "LF: 2 × 15″ · MF: 4 × 6.5″ · HF: 3 × 3″",
    "connectors": "8-point PA-COM x2 (IN 1 + LINK 1)",
    // [커넥터] PA-COM 8핀 그룹별 매핑.
    // 원문: k1.md connectivity 섹션(OM p.17 "Connectors" 내부 핀아웃 표).
    "paComPinout": { "ab": "left LF", "cd": "right LF", "ef": "MF", "gh": "HF" },
    "ip": "IP43",
    "dims": "1342 x 438 x 520 mm / 52.8 x 17.2 x 20.5 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 2,
            "total": 2,
            "splByPreset": [
              {
                "preset": "[K1]",
                "spl": 149
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(2/2)",
    "img": "public/assets/img/speakers/la/official/k-series/k1/01-3dr-k1-3-4-avant-catalogue-01.runtime.webp",
    "views": [
      {
        "label": "K1 3 4 Avant Catalogue 01",
        "src": "public/assets/img/speakers/la/official/k-series/k1/01-3dr-k1-3-4-avant-catalogue-01.runtime.webp"
      },
      {
        "label": "K1 3 4 Horizontal 01",
        "src": "public/assets/img/speakers/la/official/k-series/k1/02-3dr-k1-3-4-horizontal-01.runtime.webp"
      },
      {
        "label": "8xK1+K1-BUMP 01",
        "src": "public/assets/img/speakers/la/official/k-series/k1/03-3dr-8xk1-k1-bump-01.runtime.webp"
      }
    ],
    // 모달 내 뷰 순서(Horizontal/Vertical/Array)는 그대로
    // 유지하되, 카드 목록에서 마우스를 올렸을 때(hover)만 Vertical 대신
    // Array 뷰가 보이도록 지정. speakers.view.js cardHTML 참고.
    "cardHoverView": "Array (8x + K1-BUMP)",
    "relations": {
      "ampIds": [],
      // [시스템 구성] accessories.data.js의 최상위 id를 참조하며
      // cross-ref.findAccessoriesForSpeaker()로 조회한다. 기준 자료는
      // raw-data/raw-specs/la/speakers/k-series/k1/k1.md의 System Elements다.
      // LA12X/LA-RAK II AVB는 amps에서 연결하므로 제외하고, 길이 변형을
      // 통합한 DO 케이블은 액세서리 관계에 포함한다.
      "accessoryIds": ["acc-la-k1-bump", "acc-la-k1-delta", "acc-la-la-sling2t", "acc-la-k1-bpchain", "acc-la-k2-link", "acc-la-kara-downk1", "acc-la-k1-lasermount", "acc-la-laser-magplate", "acc-la-k1-chariot2", "acc-la-k1-chariotcov", "acc-la-k-bumpflight", "acc-la-k1-pla", "acc-la-k1-cov", "acc-la-tech-toolcase-ii", "acc-la-maintenance-toolcase", "acc-la-do"]
    },
    "watt": 1118,
    "wattByBand": [
      { "band": "LF", "watt": 422 },
      { "band": "MF", "watt": 497 },
      { "band": "HF", "watt": 199 }
    ],
    // [프리셋] 모달 최하단의 구성 섹션 기준 자료:
    // raw-data/raw-specs/la/references/presets/k-series/k1.md
    // ratio와 minLine은 명시된 구성에만 둔다. presetGuideHTML은 해당 값이
    // 있는 행만 골라 별도 "Matching Ratio & Minimum Line Length" 표로
    // 표시해 기본 3열 표의 밀도를 유지한다.
    "presets": {
      "rows": [
        { "config": "K1 line source", "preset": "[K1]", "acoustic": "35 Hz - 20 kHz", "acousticShort": "35 Hz - 20 kHz" },
        { "config": "K1 + K1-SB (on top)", "preset": "[K1] + [K1SB_X]", "acoustic": "enhanced LF throw, down to 30 Hz", "acousticShort": "enhanced throw, down to 30 Hz", "ratio": "2 K1 : 1 K1-SB", "minLine": "8 K1 + 4 K1-SB" },
        { "config": "K1 + coupled K1-SB (beside/behind)", "preset": "[K1] + [K1SB_60]", "acoustic": "reinforced LF contour, LF rejection(side polarized or rear cardioid), down to 33 Hz", "acousticShort": "side/rear cardioid, down to 33 Hz", "ratio": "1 K1 : 1 subwoofer" },
        { "config": "K1 + coupled K1-SB (behind, NC)", "preset": "[K1] + [K1SB_100_NC]", "acoustic": "reinforced LF contour, LF rejection(rear cardioid), down to 25 Hz", "acousticShort": "rear cardioid, down to 25 Hz", "ratio": "1 K1 : 1 subwoofer" },
        { "config": "K1 + subwoofers (KS28/SB28)", "preset": "[K1] + [xx28_60]", "acoustic": "reinforced LF contour, down to 25 Hz", "acousticShort": "reinforced contour, down to 25 Hz", "ratio": "1 K1 : 1 subwoofer" },
        { "config": "K1 + coupled CS1 (beside/behind)", "preset": "[K1] + [CS1_60]", "acoustic": "reinforced LF contour, LF rejection(rear cardioid), down to 25 Hz", "acousticShort": "rear cardioid, down to 25 Hz", "ratio": "2 K1 : 1 CS1" },
        { "config": "K1 + coupled CS1 (supercardioid)", "preset": "[K1] + [CS1_60_S]", "acoustic": "reinforced LF contour, supercardioid pattern, down to 25 Hz", "acousticShort": "supercardioid, down to 25 Hz", "ratio": "2 K1 : 1 CS1" },
        { "config": "K1 + Kara II (downfill)", "preset": "[K1] + [KARAIIDOWNK1]", "acoustic": "35 Hz - 20 kHz, extends vertical coverage to closer audience", "acousticShort": "35 Hz - 20 kHz, downfill", "ratio": "up to 6 Kara II" },
        { "config": "K1 + K2 (downfill)", "preset": "[K1] + [K2 110]", "acoustic": "35 Hz - 20 kHz, same horizontal coverage as K1 for optimal downfill", "acousticShort": "35 Hz - 20 kHz, downfill" }
      ],
      // [프리셋 안내] [K1]/[K2 xxx]는 OUT1=left LF, OUT2=right LF,
      // OUT3=MF, OUT4=HF로 나뉜다. K1-SB 프리셋은 OUT1~4를 모두 SB로
      // 라우팅한다. 나머지 기본 파라미터는 Delay Defaults 표를 따른다.
      // notes는 { text, subs? } 구조를 사용해 여러 갈래 정보만 중첩 목록으로
      // 렌더링한다. 각 참고 사항은 관련 표 바로 아래에 둔다.
      // - 메인 표(notes): Acoustic Properties 각주, 카디오이드 프리셋,
      //   호환성 주의, 출력 라우팅 — 전부 rows(Loudspeaker Configuration/
      //   Preset/Acoustic Properties) 열과 직접 관련된 내용만 남김.
      // - Matching Ratio 표(ratioNotes): Downfill 옵션(K2/Kara/Kara II
      //   프리셋 목록)을 이쪽으로 이동 — ratio/minLine 자체가 "몇 대를
      //   어떻게 매칭하느냐"는 질문이라 Downfill 목록과 같은 맥락.
      // - Delay Defaults 표(delayDefaults.notes): 딜레이 관련 각주.
      "notes": [
        { "text": "Acoustic Properties 열의 주파수 대역(예: \"35 Hz - 20 kHz\", \"down to 25 Hz\")은 원문 서문(p.49)에 명시된 대로 -10 dB 기준 대역폭/저역 한계다." },
        { "text": "카디오이드 배열(측면·후면으로 향하는 저역을 상쇄해 무대 뒤나 옆으로 새는 저음을 줄이는 배치)로 세울 때는 [xx28_60_C] 또는 [xx28_60_Cx] 프리셋을 쓴다." },
        { "text": "호환성 주의: 프리셋 라이브러리 4.0 버전을 기점으로 [K1] · [KARADOWNK1] · [K2 xxx] 프리셋의 내부 구성이 바뀌어, 4.0 이후 버전과 4.0 이전 버전은 서로 호환되지 않는다. 같은 라인 소스(어레이) 안의 모든 유닛은 반드시 동일한 라이브러리 버전을 써야 한다(일부만 다른 버전이면 유닛 간 특성이 어긋난다)." },
        {
          "text": "출력 라우팅(공식 매뉴얼 Preset Description, p.50/p.16 기준)은 프리셋 그룹에 따라 다음 두 가지로 나뉜다. 게인·딜레이·극성 등 나머지 파라미터 기본값은 Delay Defaults 표 참고.",
          "subs": [
            "[K1] / [K2 xxx] 계열: OUT1=좌측 LF, OUT2=우측 LF, OUT3=MF, OUT4=HF.",
            "[K1SB_X] / [K1SB_60] / [K1SB_100_NC] 등 K1-SB 서브우퍼 계열: OUT1~4 네 채널 전부 SB(서브우퍼) 채널로 통일."
          ]
        }
      ],
      "ratioNotes": [
        {
          "text": "Downfill(무대 바로 앞 관객 등 어레이 아래쪽 사각지대를 보완하는 추가 수직 커버리지) 프리셋은 라인마다 다르다. 위 표의 K1(신형) 라인 외에 구형 라인은 다음 프리셋을 쓴다.",
          "subs": [
            "K2 라인: [K2 110] / [K2 90] / [K2 70]",
            "Kara: [KARADOWNK1]",
            "Kara II: [KARAIIDOWNK1](110°) / [KARAIIDOWNK1 70] / [KARAIIDOWNK1 90](이 중 [KARAIIDOWNK1]은 Kara II를 110° 핀 설정으로 조립했을 때 맞춰 최적화된 프리셋)."
          ]
        }
      ],
      "ratioSource": "K1_OM_EN.pdf (K1 owner's manual EN version 4.0) p.35-45; preset_guide_EN.pdf p.49-50 (owner's manual EN v29.0)",
      // [극성] 극성 아이콘은 PDF 텍스트 레이어에 없으므로 표 이미지를
      // 기준으로 읽어야 한다. 서브우퍼 계열별 규칙은 다음과 같다.
      // - K1: 모든 조합에서 항상 +
      // - K1-SB: [K1SB_X]/[K1SB_60](라인소스 편입/측면·후면 배치용) 조합
      //   에서는 +, [K1SB_100_NC](노이즈 컨트롤 카디오이드) 조합에서는 -
      // - KS28: 모든 조합(단독/K1-SB 병용 불문)에서 항상 -
      // - CS1: 모든 조합(단독/K1-SB 병용 불문)에서 항상 -
      // +(정상)는 기본값이므로
      // 표시를 생략하고, −(반전)만 "(−)"로 표기 — 렌더링(presetGuideHTML)
      // 이 이 문자열 안의 "−" 기호만 빨간색으로 강조한다(괄호 자체는
      // 일반 색 그대로, polarity-flip span은 "−"만 감쌈).
      // [표 구분] values는 문자열 배열(items)로 구조화해 렌더링이 각 항목을
      // 별도 span으로 나누고 그 사이에 실제 CSS border-left 세로 구분선을
      // 그린다. 단일 문자열 values 필드는 사용하지 않는다.
      "delayDefaults": {
        "rows": [
          { "combo": "[K1] + [K1SB_X]", "items": ["K1 = 0 ms", "K1-SB = 0 ms"] },
          { "combo": "[K1] + [K1SB_60]", "items": ["K1 = 6 ms", "K1-SB = 0 ms"] },
          { "combo": "[K1] + [K1SB_100_NC]", "items": ["K1 = 8.3 ms", "K1-SB = 0 ms (−)"] },
          { "combo": "[K1] + [KS28_60]", "items": ["K1 = 0.5 ms", "KS28 = 0 ms (−)"] },
          { "combo": "[K1] + [KS28_60_C]", "items": ["K1 = 6 ms", "KS28 = 0 ms (−)"] },
          { "combo": "[K1] + [KS28_60_Cx]", "items": ["K1 = 4 ms", "KS28 = 0 ms (−)"] },
          { "combo": "[K1] + [K1SB_X] + [KS28_60]", "items": ["K1 = 0 ms", "K1-SB = 0 ms", "KS28 = 0 ms (−)"] },
          { "combo": "[K1] + [K1SB_X] + [KS28_60_C]", "items": ["K1 = 5.5 ms", "K1-SB = 5.5 ms", "KS28 = 0 ms (−)"] },
          { "combo": "[K1] + [K1SB_X] + [KS28_60_Cx]", "items": ["K1 = 3.5 ms", "K1-SB = 3.5 ms", "KS28 = 0 ms (−)"] },
          { "combo": "[K1] + [CS1_60] / [CS1_60_S]", "items": ["K1 = 7.5 ms", "CS1 = 0 ms (−)"] },
          { "combo": "[K1] + [K1SB_X] + [CS1_60] / [CS1_60_S]", "items": ["K1 = 7.5 ms", "K1-SB = 7.5 ms", "CS1 = 0 ms (−)"] }
        ],
        // [극성 안내] 첫 항목은 딜레이와 극성이 표에 함께 있음을 설명하고,
        // 두 번째 항목이 조합별 정상(+)/반전(−) 판단을 전담한다.
        "notes": [
          { "text": "위 표의 값은 pre-alignment(사전 정렬) 딜레이와 극성 기본값을 함께 표기한 것이며, 실제 현장에서는 여기에 배치 간격에 따른 geometric(기하학적) 딜레이를 추가로 더해야 한다(극성은 geometric 딜레이와 무관하게 표에 적힌 그대로 유지)." },
          { "text": "별도 표기가 없으면 극성은 반전 없는 정상(+). 빨간색 (−) 표시가 있는 엘리먼트만 반전이다. K1은 모든 조합에서 항상 정상(+). K1-SB는 [K1SB_X]/[K1SB_60] 조합에서는 정상, [K1SB_100_NC](노이즈 컨트롤) 조합에서는 반전. KS28과 CS1은 K1과 병용하는 모든 조합에서 항상 반전(카디오이드/서브우퍼 위상 상쇄를 위한 의도된 설정)." },
          { "text": "geometric 딜레이(K1-SB를 서브우퍼로 배치 시): 간격 1.5 m(5 ft)면 4.5 ms, 2 m(7 ft)면 6 ms 추가." },
          { "text": "[K1]과 [K1SB_X]([K1-SB]를 K1과 같은 라인소스 안에 편입할 때)는 서로 딜레이를 추가하지 않는다(동일 라인소스 내 엘리먼트이기 때문). K1-Kara II, K1-K2(다운필) 조합도 마찬가지로 딜레이 추가 금지." }
        ],
        "source": "K1_OM_EN.pdf (K1 owner's manual EN version 4.0) p.37-38, 40, 42"
      },
      "source": "preset_guide_EN.pdf p.49-50 (owner's manual EN v29.0); K1_OM_EN.pdf (owner's manual EN v4.0) p.16, 34-45"
    },
    // K1 owner's manual "Mechanical safety"(p.31-33) 중 K1
    // 자체에 해당하는 부분만 발췌 — K1-SB/KS28/CS1의 리깅 한계 표는
    // 각자 제품 데이터에 정리할 항목이라 여기서는 제외(원문 전체는
    // raw-data/raw-specs/la/speakers/k-series/k1/k1.md 출처 3 참고).
    // 렌더링은 speakers.view.js mechanicalSafetyHTML 이 Preset Guide와
    // 동급(섹션 레벨) 토글로 그린다.
    "mechanicalSafety": {
      // [기계 안전] Safety_Factor/Max_Wind_Load —
      // 원문: k1.md mechanical_safety 섹션(OM p.6 "Safety > Instructions").
      "safetyFactor": "4:1",
      "maxWindLoad": "6 Beaufort",
      "flownRows": [
        { "config": "flown", "accessory": "K1-BUMP", "safeLimit": "16", "maxLimit": "24" },
        { "config": "flown", "accessory": "K1-BUMP", "safeLimit": "14 K1 + 3 LA-RAK II AVB", "maxLimit": "23 K1 + 4 LA-RAK II AVB" },
        { "config": "flown with a downfill", "accessory": "KARA-DOWNK1", "safeLimit": "6 Kara II", "maxLimit": "6 Kara II" }
      ],
      "stackedRows": [
        { "config": "stacked", "accessory": "K1-CHARIOT", "safeLimit": "4", "maxLimit": "4" }
      ],
      "warnings": [
        "항상 혼합 어레이(mixed array)의 안전계수는 Soundvision을 참조할 것. K1 어레이를 Kara II 다운필과 함께 플라잉할 때는 시스템 전체 엘리먼트의 기계적 안전을 고려해야 하며, 위 표의 maximum limit은 K1에만 적용된다.",
        "LA-RAK II AVB를 위에 얹은 K1 어레이에는 풀백(pullback)을 적용하지 말 것.",
        "Kara II 다운필이 있는 K1 어레이에는 풀백을 적용하지 말 것."
      ],
      "notes": [
        { "text": "Safe limit: 이 매뉴얼에 정의된 용도 내에서, 사이트 각도·인터엘리먼트 각도 등 다른 배치 변수와 무관하게 2006/42/EC 기계지침 기준을 항상 만족하는 최대 엘리먼트 수." },
        { "text": "Maximum limit: 다른 배치 변수가 최선의 기계적 조건을 제공할 때 2006/42/EC 기준을 만족할 수 있는 최대 엘리먼트 수." },
        { "text": "K1 리깅 시스템은 2006/42/EC 기계지침을 준수하며 BGV-C1 가이드라인에 따라 설계됐다. 이 지침은 파단에 대해 안전계수 4를 요구하며, 이 매뉴얼에 기술된 플라잉 배치는 안전계수 4 이상을 달성한다. 특정 배치의 정확한 안전계수는 Soundvision을 참조." },
        {
          "text": "안전성 평가 원칙(Assessing mechanical safety, p.33): 정격 WLL만으로는 복합 기계 시스템의 안전성을 판단할 수 없다.",
          "subs": [
            "각 연결점의 작업 하중과 안전계수는 어레이 구성(인클로저 종류·수량·스플레이 각도)과 플라잉/스태킹 구조(플라잉 포인트 수·위치, 사이트 각도)에 좌우되며 Soundvision의 복합 기계 모델링 없이는 판단 불가.",
            "전체 안전계수는 항상 모든 연결점 중 가장 낮은 값을 따른다. Soundvision Mechanics view에서 가장 약한 연결점을 확인할 것.",
            "그라운드 스택 어레이는 Soundvision에서 별도 전도 위험(tipping hazard) 경고가 표시된다(어레이 고정 및 경고 무시 여부는 사용자 책임).",
            "플라잉 시 사용 가능한 홀을 활용해 2차 안전장치(secondary safety)를 구현할 것.",
            "극한 고온/저온, 강풍, 장기간 염수 노출 등 특수 환경에서는 더 높은 안전계수가 권장되며, 리깅 전문가와 상담할 것."
          ]
        }
      ],
      "source": "K1_OM_EN.pdf (K1 owner's manual EN version 4.0) p.31-33"
    }
  },
  {
    "id": "spk-la-k2",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "K2",
    "series": "K Series",
    "throwCat": "Long Throw",
    "type": "Line Array",
    "throw": "Long throw >35m",
    "lowInch": 12,
    "lowQty": 2,
    "crossover": "3-way, active",
    "crossoverTags": [
      "3-way",
      "active"
    ],
    "spl": 147,
    "cov": {
      "h": "110°,70°,55°/35°,35°/55°",
      "v": "10°",
      "splayList": [
        0.25,
        1,
        2,
        3,
        4,
        5,
        7.5,
        10
      ]
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "40 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "38 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "35 Hz",
        "hi": "20 kHz"
      }
    ],
    // [지향성] Cardioid_Capability.
    "cardioidCapability": "No",
    "weight": 56,
    "transducers": "LF: 2 × 12″ · MF: 4 × 6.5″ · HF: 2 × 3″",
    "connectors": "8-point PA-COM x2 (IN 1 + LINK 1)",
    // [커넥터] PA-COM 8핀 그룹별 매핑(K1과 동일).
    "paComPinout": { "ab": "left LF", "cd": "right LF", "ef": "MF", "gh": "HF" },
    "ip": "IP55",
    "dims": "1338 x 354 x 400 mm / 52.7 x 13.9 x 15.7 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 3,
            "total": 3,
            "splByPreset": [
              {
                "preset": "[K2 70]",
                "spl": 147
              }
            ]
          }
        ]
      },
      {
        "model": "LA4X",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 1,
            "splByPreset": [
              {
                "preset": "[K2 70]",
                "spl": 147
              }
            ]
          }
        ]
      },
      {
        "model": "LA7.16",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[K2 70]",
                "spl": 147
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/3), LA4X(1/1), LA7.16(1/4)",
    // 기존 Front(spk-la-k2.webp)/Array(spk-la-k2-array.webp)
    // 사진 삭제. 메인 이미지를 Horizontal 로 교체.
    "img": "public/assets/img/speakers/la/official/k-series/k2/01-3dr-k2-3-4-avant-catalogue-03.runtime.webp",
    "views": [
      {
        "label": "K2 3 4 Avant Catalogue 03",
        "src": "public/assets/img/speakers/la/official/k-series/k2/01-3dr-k2-3-4-avant-catalogue-03.runtime.webp"
      },
      {
        "label": "K2 Perspective 01",
        "src": "public/assets/img/speakers/la/official/k-series/k2/02-3dr-k2-perspective-01.runtime.webp"
      },
      {
        "label": "K2 Detail Catalogue 01",
        "src": "public/assets/img/speakers/la/official/k-series/k2/03-3dr-k2-detail-catalogue-01.runtime.webp"
      },
      {
        "label": "12xK2+K2-BUMP+K2-BAR 01",
        "src": "public/assets/img/speakers/la/official/k-series/k2/04-3dr-12xk2-k2-bump-k2-bar-01.runtime.webp"
      },
      {
        "label": "4xK2+K2-CHARIOT+2xK2-JACK 01",
        "src": "public/assets/img/speakers/la/official/k-series/k2/05-3dr-4xk2-k2-chariot-2xk2-jack-01.runtime.webp"
      }
    ],
    // 모달 뷰 전환 토글에서 Horizontal/Vertical/Panflex
    // Detail 3개를 세로로 쌓은 그룹으로 묶는다(speakers.view.js
    // modalBodyHTML STACK_LABELS 참고). 기본값(Vertical (Panflex))과
    // 라벨이 달라 개별 지정이 필요.
    "viewStackLabels": ["Horizontal", "Vertical", "Panflex Detail"],
    // 카드 hover 대상을 Array(12x + K2-BUMP + K2-BAR)로 지정
    // (K1 과 동일한 cardHoverView 패턴, speakers.view.js cardHTML 참고).
    "cardHoverView": "Array (12x + K2-BUMP + K2-BAR)",
    "relations": {
      "ampIds": []
    },
    "watt": 752,
    // 원문: raw-data/raw-specs/la/references/presets/k-series/k2.md
    // (출처: preset_guide_EN.pdf p.51-52, owner's manual EN v29.0).
    "presets": {
      "rows": [
        { "config": "K2 line source", "preset": "[K2 xxx]", "acoustic": "35 Hz - 20 kHz, adjustable horizontal directivity", "acousticShort": "35 Hz - 20 kHz, adjustable directivity" },
        { "config": "K2 + K1-SB (on top)", "preset": "[K2 xxx] + [K1SB_X K2]", "acoustic": "enhanced LF throw, down to 30 Hz", "acousticShort": "enhanced throw, down to 30 Hz", "ratio": "3 K2 : 1 K1-SB", "minLine": "12 K2 + 4 K1-SB" },
        { "config": "K2 + coupled K1-SB (beside/behind)", "preset": "[K2 xxx] + [K1SB_60]", "acoustic": "reinforced LF contour, LF rejection(side polarized or rear cardioid), down to 33 Hz", "acousticShort": "side/rear cardioid, down to 33 Hz", "ratio": "3 K2 : 2 subwoofers", "minLine": "12 K2 + 8 K1-SB" },
        { "config": "K2 + coupled K1-SB (behind, NC)", "preset": "[K2 xxx] + [K1SB_100_NC]", "acoustic": "reinforced LF contour, LF rejection(rear cardioid), down to 25 Hz", "acousticShort": "rear cardioid, down to 25 Hz", "ratio": "3 K2 : 2 subwoofers" },
        { "config": "K2 + subwoofers (KS28/SB28)", "preset": "[K2 xxx] + [xx28_60]", "acoustic": "reinforced LF contour, down to 25 Hz", "acousticShort": "reinforced contour, down to 25 Hz", "ratio": "3 K2 : 2 subwoofers" },
        { "config": "K2 + coupled CS1 (beside/behind)", "preset": "[K2 xxx] + [CS1_60]", "acoustic": "reinforced LF contour, LF rejection(rear cardioid), down to 25 Hz", "acousticShort": "rear cardioid, down to 25 Hz", "ratio": "3 K2 : 1 CS1" },
        { "config": "K2 + coupled CS1 (supercardioid)", "preset": "[K2 xxx] + [CS1_60_S]", "acoustic": "reinforced LF contour, supercardioid pattern, down to 25 Hz", "acousticShort": "supercardioid, down to 25 Hz", "ratio": "3 K2 : 1 CS1" },
        { "config": "K2 + Kara II (downfill)", "preset": "[K2 xxx] + [KARAIIDOWNK2]", "acoustic": "35 Hz - 20 kHz, extends vertical coverage to closer audience", "acousticShort": "35 Hz - 20 kHz, downfill", "ratio": "up to 6 Kara II" }
      ],
      "notes": [
        { "text": "Acoustic Properties 열의 주파수 대역(예: \"35 Hz - 20 kHz\", \"down to 25 Hz\")은 원문 서문(p.49)에 명시된 대로 -10 dB 기준 대역폭/저역 한계다." },
        { "text": "카디오이드 배열 시 [xx28_60_C] 또는 [xx28_60_Cx] 프리셋을 쓴다." },
        { "text": "[K2 xxx]의 xxx는 70/90/110(조정 가능한 수평 지향각). 반드시 K2 조정핀 설정과 일치하는 프리셋을 선택할 것: [K2 70]=70º, [K2 90]=90º, [K2 110]=110º." },
        {
          "text": "출력 라우팅(p.52 기준)은 프리셋 그룹에 따라 다음과 같다.",
          "subs": [
            "[K2 xxx]: OUT1=좌측 LF, OUT2=우측 LF, OUT3=MF, OUT4=HF. 전부 입력 IN A · 게인 0dB · 딜레이 0ms · 정상 극성(+) · 뮤트 해제(ON).",
            "[K1SB_X K2] / [K1SB_60] / [K1SB_100_NC]: OUT1~4 전부 SB 채널. [K1SB_X K2]는 10 dB 헤드룸 제공."
          ]
        }
      ],
      "ratioNotes": [
        {
          "text": "Downfill(무대 바로 앞 관객 등 어레이 아래쪽 사각지대를 보완하는 추가 수직 커버리지) 프리셋은 라인마다 다르다. 위 표의 Kara II 다운필 외에 다음 프리셋도 쓸 수 있다.",
          "subs": [
            "Kara: [KARADOWNK2]",
            "Kara II: [KARAIIDOWNK2](110°) / [KARAIIDOWNK2 70] / [KARAIIDOWNK2 90](11 dB 헤드룸 제공, [KARAIIDOWNK2]는 Kara II 110° 핀 설정에 최적화)."
          ]
        }
      ],
      "ratioSource": "K2_OM_EN_4.0.pdf p.32-43",
      "delayDefaults": {
        "rows": [
          { "combo": "[K2 70]/[K2 90]/[K2 110] + [K1SB_X K2]", "items": ["K2 = 0 ms", "K1-SB = 0 ms"] },
          { "combo": "[K2 70]/[K2 90]/[K2 110] + [K1SB_60]", "items": ["K2 = 6 ms", "K1-SB = 0 ms"] },
          { "combo": "[K2 70]/[K2 90]/[K2 110] + [K1SB_100_NC]", "items": ["K2 = 8.3 ms", "K1-SB = 0 ms (−)"] },
          { "combo": "[K2 70]/[K2 90]/[K2 110] + [KS28_60]", "items": ["K2 = 0.5 ms", "KS28 = 0 ms (−)"] },
          { "combo": "[K2 70]/[K2 90]/[K2 110] + [KS28_60_C]", "items": ["K2 = 6 ms", "KS28 = 0 ms (−)"] },
          { "combo": "[K2 70]/[K2 90]/[K2 110] + [KS28_60_Cx]", "items": ["K2 = 4 ms", "KS28 = 0 ms (−)"] },
          { "combo": "[K2 70]/[K2 90]/[K2 110] + [K1SB_X K2] + [KS28_60]", "items": ["K2 = 0 ms", "K1-SB = 0 ms", "KS28 = 0 ms (−)"] },
          { "combo": "[K2 70]/[K2 90]/[K2 110] + [K1SB_X K2] + [KS28_60_C]", "items": ["K2 = 5.5 ms", "K1-SB = 5.5 ms", "KS28 = 0 ms (−)"] },
          { "combo": "[K2 70]/[K2 90]/[K2 110] + [K1SB_X K2] + [KS28_60_Cx]", "items": ["K2 = 3.5 ms", "K1-SB = 3.5 ms", "KS28 = 0 ms (−)"] },
          { "combo": "[K2 70]/[K2 90]/[K2 110] + [K1SB_60] + [KS28_60]", "items": ["K2 = 6 ms", "K1-SB = 0 ms", "KS28 = 6 ms (−)"] },
          { "combo": "[K2 70]/[K2 90]/[K2 110] + [K1SB_60] + [KS28_60_C]", "items": ["K2 = 6 ms", "K1-SB = 0 ms", "KS28 = 0.5 ms (−)"] },
          { "combo": "[K2 70]/[K2 90]/[K2 110] + [K1SB_60] + [KS28_60_Cx]", "items": ["K2 = 6 ms", "K1-SB = 0 ms", "KS28 = 4 ms (−)"] },
          { "combo": "[K2 70]/[K2 90]/[K2 110] + [CS1_60] / [CS1_60_S]", "items": ["K2 = 7.5 ms", "CS1 = 0 ms (−)"] },
          { "combo": "[K2 70]/[K2 90]/[K2 110] + [K1SB_X K2] + [CS1_60] / [CS1_60_S]", "items": ["K2 = 7.5 ms", "K1-SB = 7.5 ms", "CS1 = 0 ms (−)"] }
        ],
        "notes": [
          { "text": "위 표의 값은 pre-alignment(사전 정렬) 딜레이와 극성 기본값을 함께 표기한 것이며, 실제 현장에서는 여기에 배치 간격에 따른 geometric(기하학적) 딜레이를 추가로 더해야 한다." },
          { "text": "별도 표기가 없으면 극성은 반전 없는 정상(+). 빨간색 (−) 표시가 있는 엘리먼트만 반전이다. K2는 모든 조합에서 항상 정상(+). K1-SB는 [K1SB_X K2]/[K1SB_60] 조합에서는 정상, [K1SB_100_NC](노이즈 컨트롤) 조합에서는 반전. KS28과 CS1은 K2와 병용하는 모든 조합에서 항상 반전 — K1과 완전히 동일한 패턴." },
          { "text": "[K2]+[K1SB_X K2](동일 라인소스 내 엘리먼트), K2-Kara II(다운필) 조합은 서로 딜레이를 추가하지 않는다." }
        ],
        "source": "K2_OM_EN_4.0.pdf p.36-42"
      },
      "source": "preset_guide_EN.pdf p.51-52 (owner's manual EN v29.0); K2_OM_EN_4.0.pdf p.32-43"
    },
    // [기계 안전] mechanical_safety 섹션(OM
    // p.29-30 "Mechanical safety", p.6 "Safety > Instructions") 전체 반영.
    "mechanicalSafety": {
      "flownRows": [
        { "config": "flown", "accessory": "K2-BUMP", "safeLimit": "16", "maxLimit": "24" },
        { "config": "flown with a downfill", "accessory": "KARADOWNK2", "safeLimit": "6 Kara II", "maxLimit": "6 Kara II" }
      ],
      "stackedRows": [
        { "config": "ground-stacked", "accessory": "K2-BUMP", "safeLimit": "4", "maxLimit": "6" },
        { "config": "stacked", "accessory": "K2-CHARIOT with K2-JACK", "safeLimit": "4", "maxLimit": "6" }
      ],
      "notes": [
        { "text": "Safe limit: 배치 변수와 무관하게 2006/42/EC 기계지침 기준을 항상 만족하는 최대 엘리먼트 수. Maximum limit: 다른 배치 변수가 최선의 기계적 조건을 제공할 때 만족 가능한 최대 엘리먼트 수." },
        { "text": "KARADOWNK2 행의 safe/maximum limit은 원문 표에서 \"6 Kara II\" 값이 한 번만 추출되어 두 열이 실제로 같은 값인지 완전히 확정할 수 없다 — 참고용으로 취급." },
        { "text": "K2-BUMP+K2-BAR(풀백), K2-LINK under K1-BUMP, K2-RIGBAR 등 추가 리깅 옵션이 매뉴얼에 더 있으나 기본 플라잉/그라운드스택/스택 구성만 반영했다." }
      ],
      "safetyFactor": "4:1",
      "maxWindLoad": "6 Beaufort",
      "source": "K2_OM_EN_4.0.pdf p.29-30, p.6"
    }
  },
  {
    "id": "spk-la-k3",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "K3",
    "series": "K Series",
    "throwCat": "Long Throw",
    "type": "Line Array",
    "throw": "Long throw >35m",
    "lowInch": 12,
    "lowQty": 2,
    "crossover": "2-way, active",
    "crossoverTags": [
      "2-way",
      "active"
    ],
    "spl": 143,
    "cov": {
      "h": "110°,70°,55°/35°,35°/55°",
      "v": "10°",
      "splayList": [
        0.25,
        1,
        2,
        3,
        4,
        5,
        7.5,
        10
      ]
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "50 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "46 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "42 Hz",
        "hi": "20 kHz"
      }
    ],
    // [지향성] Cardioid_Capability.
    "cardioidCapability": "No",
    "weight": 43,
    "transducers": "LF: 2 × 12″ · HF: 1 × 4″",
    "connectors": "4-point speakON x2 (IN/LINK 상호교환)",
    "ip": "IP55",
    // [치수] K3_AE_EN.docx "Physical data"의 축 라벨에 따라
    // Height=355mm, Depth=402mm를 사용한다.
    "dims": "950 x 355 x 402 mm / 37.4 x 14.0 x 15.8 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 3,
            "total": 6,
            "splByPreset": [
              {
                "preset": "[K3 70]",
                "spl": 143
              }
            ]
          }
        ]
      },
      {
        "model": "LA4X",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 2,
            "splByPreset": [
              {
                "preset": "[K3 70]",
                "spl": 143
              }
            ]
          }
        ]
      },
      {
        "model": "LA7.16",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[K3 70]",
                "spl": 143
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/6), LA4X(1/2), LA7.16(1/8)",
    // 기존 Front 사진(spk-la-k3.webp)을 Horizontal로 개명
    // (실 파일도 spk-la-k3-horizontal.webp로 리네임), 단독 Array 사진
    // (spk-la-k3-array.webp)은 삭제. 순서: Horizontal/Vertical/
    // Array(12x+K3-BUMP+K3-BAR)/Rigging/With KS28.
    "img": "public/assets/img/speakers/la/official/k-series/k3/01-3dr-k3-3-4-front-catalogue-01.runtime.webp",
    "views": [
      {
        "label": "K3 3 4 Front Catalogue 01",
        "src": "public/assets/img/speakers/la/official/k-series/k3/01-3dr-k3-3-4-front-catalogue-01.runtime.webp"
      },
      {
        "label": "12xK3+K3-BUMP+K3-BAR 01",
        "src": "public/assets/img/speakers/la/official/k-series/k3/02-3dr-12xk3-k3-bump-k3-bar-01.runtime.webp"
      },
      {
        "label": "4xK3+2xKS28+K3-TILT 01",
        "src": "public/assets/img/speakers/la/official/k-series/k3/03-3dr-4xk3-2xks28-k3-tilt-01.runtime.webp"
      },
      {
        "label": "8xK3+2xK3-RIGBAR 01",
        "src": "public/assets/img/speakers/la/official/k-series/k3/04-3dr-8xk3-2xk3-rigbar-01.runtime.webp"
      },
      {
        "label": "4xK3+K3-CHARIOT+K3-CHARIOTCOV+K3-LID 01",
        "src": "public/assets/img/speakers/la/official/k-series/k3/05-3dr-4xk3-k3-chariot-k3-chariotcov-k3-lid-01.runtime.webp"
      }
    ],
    // 카드 hover 대상을 Array(12x + K3-BUMP + K3-BAR)로 지정
    // (K1/K2 와 동일한 cardHoverView 패턴, speakers.view.js cardHTML 참고).
    "cardHoverView": "Array (12x + K3-BUMP + K3-BAR)",
    "relations": {
      "ampIds": []
    },
    "watt": 830,
    // 원문: raw-data/raw-specs/la/references/presets/k-series/k3.md
    // (출처: preset_guide_EN.pdf p.53-54, owner's manual EN v29.0).
    // K3/K3i는 동일 인클로저의 다른 버전 — 팩토리 프리셋/권장 구성 공유(원문 명시).
    "presets": {
      "rows": [
        { "config": "K3 line source", "preset": "[K3 xxx]", "acoustic": "42 Hz - 20 kHz, adjustable horizontal directivity", "acousticShort": "42 Hz - 20 kHz, adjustable directivity" },
        { "config": "K3 + subwoofers (KS28/KS21)", "preset": "[K3 xxx] + [KSxx_60]", "acoustic": "reinforced LF contour, down to 29 Hz (KS21) or 25 Hz (KS28)", "acousticShort": "reinforced contour, down to 29/25 Hz", "ratio": "2 K3 : 1 KS28 / 3 K3 : 2 KS21" },
        { "config": "K3 + coupled CS1 (beside/behind)", "preset": "[K3 xxx] + [CS1_60]", "acoustic": "reinforced LF contour, LF rejection(rear cardioid), down to 25 Hz", "acousticShort": "rear cardioid, down to 25 Hz" },
        { "config": "K3 + coupled CS1 (supercardioid)", "preset": "[K3 xxx] + [CS1_60_S]", "acoustic": "reinforced LF contour, supercardioid pattern, down to 25 Hz", "acousticShort": "supercardioid, down to 25 Hz" }
      ],
      "notes": [
        { "text": "Acoustic Properties 열의 주파수 대역(예: \"42 Hz - 20 kHz\", \"down to 25 Hz\")은 원문 서문(p.49)에 명시된 대로 -10 dB 기준 대역폭/저역 한계다." },
        { "text": "카디오이드 배열 시 [KSxx_xx_C] 또는 [KSxx_xx_Cx] 프리셋을 쓴다." },
        { "text": "[K3 xxx] 조정핀: [K3 70]=70º, [K3 90]=90º, [K3 110]=110º. 반드시 선택한 프리셋과 일치시킬 것." },
        { "text": "출력 라우팅(p.53-54 기준): [K3 xxx] 및 Downfill 프리셋 모두 OUT1=LF, OUT2=HF(IN A) + OUT3=LF, OUT4=HF(IN A), 게인 0dB · 딜레이 0ms · 정상 극성(+) · 뮤트 해제(ON)." }
      ],
      "ratioNotes": [
        {
          "text": "Downfill(어레이 아래쪽 추가 수직 커버리지) 옵션은 K3/K3i에 따라 다르다(15 dB 헤드룸 제공).",
          "subs": [
            "K3용: Kara [KARADOWNK3] 또는 Kara II [KARAIIDOWNK3](110°) / [KARAIIDOWNK3 70] / [KARAIIDOWNK3 90]",
            "K3i용: Kara IIi [KARAIIDOWNK3](110°) / [KARAIIDOWNK3 70] / [KARAIIDOWNK3 90]",
            "[KARAIIDOWNK3]은 Kara II(i) 110° 핀 설정에 최적화."
          ]
        }
      ],
      "ratioSource": "K3_OM_EN_4.1.pdf p.37-38",
      "delayDefaults": {
        "rows": [
          { "combo": "[K3] + [KS28_60]", "items": ["K3 = 0.5 ms", "KS28 = 0 ms (−)"] },
          { "combo": "[K3] + [KS28_60_C]", "items": ["K3 = 6 ms", "KS28 = 0 ms (−)"] },
          { "combo": "[K3] + [KS28_60_Cx]", "items": ["K3 = 4 ms", "KS28 = 0 ms (−)"] },
          { "combo": "[K3] + [KS21_60]", "items": ["K3 = 0 ms", "KS21 = 0 ms (−)"] },
          { "combo": "[K3] + [KS21_60_C]", "items": ["K3 = 5.5 ms", "KS21 = 0 ms (−)"] },
          { "combo": "[K3] + [KS21_60_Cx]", "items": ["K3 = 5 ms", "KS21 = 0 ms"] }
        ],
        "notes": [
          { "text": "위 표의 값은 pre-alignment(사전 정렬) 딜레이와 극성 기본값을 함께 표기한 것이며, 실제 현장에서는 여기에 배치 간격에 따른 geometric(기하학적) 딜레이를 추가로 더해야 한다." },
          { "text": "별도 표기가 없으면 극성은 반전 없는 정상(+). 빨간색 (−) 표시가 있는 엘리먼트만 반전이다. K3는 모든 조합에서 항상 정상(+). KS28/KS21은 대부분 반전이나, [K3]+[KS21_60_Cx] 조합만 유일하게 KS21이 예외적으로 정상(+)이다." }
        ],
        "source": "K3_OM_EN_4.1.pdf p.40"
      },
      "source": "preset_guide_EN.pdf p.53-54 (owner's manual EN v29.0); K3_OM_EN_4.1.pdf p.37-38"
    },
    // [기계 안전] mechanical_safety 섹션(OM
    // "Mechanical safety" 챕터) 전체 반영.
    "mechanicalSafety": {
      "flownRows": [
        { "config": "flown", "accessory": "K3-BUMP", "safeLimit": "16", "maxLimit": "24" }
      ],
      "stackedRows": [
        { "config": "stacked", "accessory": "K3-CHARIOT + K2-JACK", "safeLimit": "4", "maxLimit": "6" },
        { "config": "stacked", "accessory": "K3-BUMP", "safeLimit": "4", "maxLimit": "6" }
      ],
      "notes": [
        { "text": "K3-BUMP+K3-BAR, K3-RIGBAR(풀백), Kara II 다운필(KARA-DOWNK3), K3+KS28 스택 등 추가 구성이 매뉴얼에 더 있으나 기본 플라잉/스택 구성만 반영했다." }
      ],
      "safetyFactor": "4:1",
      "maxWindLoad": "6 Beaufort",
      "source": "K3_OM_EN_4.1.pdf"
    }
  },
  {
    "id": "spk-la-k3i",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "K3i",
    "series": "K Series",
    "throwCat": "Long Throw",
    "type": "Line Array",
    "throw": "Long throw >35m",
    "lowInch": 12,
    "lowQty": 2,
    "crossover": "2-way, active",
    "crossoverTags": [
      "2-way",
      "active"
    ],
    "spl": 143,
    "cov": {
      "h": "110°,70°,55°/35°,35°/55°",
      "v": "10°",
      "splayList": [
        0.25,
        1,
        2,
        3,
        4,
        5,
        7.5,
        10
      ]
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "50 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "46 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "42 Hz",
        "hi": "20 kHz"
      }
    ],
    // [지향성] Cardioid_Capability.
    "cardioidCapability": "No",
    "weight": 35,
    "transducers": "LF: 2 × 12″ · HF: 1 × 4″",
    "connectors": "4-point terminal block x2",
    "ip": "IP55",
    "dims": "907 x 357 x 429 mm / 35.7 x 14.1 x 16.9 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 3,
            "total": 6,
            "splByPreset": [
              {
                "preset": "[K3 70]",
                "spl": 143
              }
            ]
          }
        ]
      },
      {
        "model": "LA4X",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 2,
            "splByPreset": [
              {
                "preset": "[K3 70]",
                "spl": 143
              }
            ]
          }
        ]
      },
      {
        "model": "LA7.16",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[K3 70]",
                "spl": 143
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/6), LA4X(1/2), LA7.16(1/8)",
    // 기존 Front(spk-la-k3i.webp)/단독 Array(spk-la-k3i-array.webp)
    // 사진 삭제. 순서: Horizontal/Vertical/Array White/Array Black.
    "img": "public/assets/img/speakers/la/official/k-series/k3i/01-3dr-k3i-3-4-avant-catalogue-01.runtime.webp",
    "views": [
      {
        "label": "K3i 3 4 Avant Catalogue 01",
        "src": "public/assets/img/speakers/la/official/k-series/k3i/01-3dr-k3i-3-4-avant-catalogue-01.runtime.webp"
      },
      {
        "label": "K3i Perspective 01",
        "src": "public/assets/img/speakers/la/official/k-series/k3i/02-3dr-k3i-perspective-01.runtime.webp"
      },
      {
        "label": "8xK3i 70�+K3i-BUMP+K3i-BAR 01",
        "src": "public/assets/img/speakers/la/official/k-series/k3i/03-3dr-8xk3i-70-k3i-bump-k3i-bar-01.runtime.webp"
      },
      {
        "label": "8xK3i+K3i-BUMP+K3i-SCREENS White RAL 01",
        "src": "public/assets/img/speakers/la/official/k-series/k3i/04-3dr-8xk3i-k3i-bump-k3i-screens-white-ral-01.runtime.webp"
      }
    ],
    // 카드 hover 대상을 Array White RAL로 지정
    // (K1/K2/K3 와 동일한 cardHoverView 패턴, speakers.view.js cardHTML 참고).
    "cardHoverView": "Array White RAL (8x + K3i-BUMP + K3i-SCREENS)",
    "notes": "K3의 설치용(install) 버전. 전용 인클로저로 K3와 치수/무게가 다름(K3i_AE_EN.docx 원문 확보, raw-data/raw-specs/la/speakers/k-series/k3i/k3i.md 참고).",
    "relations": {
      "ampIds": []
    },
    "watt": 830,
    // 원문: raw-data/raw-specs/la/references/presets/k-series/k3.md
    // (출처: preset_guide_EN.pdf p.53-54, owner's manual EN v29.0).
    // K3i는 K3와 동일 인클로저의 다른 버전 — 팩토리 프리셋/권장 구성 공유(원문 명시).
    "presets": {
      "rows": [
        { "config": "K3i line source", "preset": "[K3 xxx]", "acoustic": "42 Hz - 20 kHz, adjustable horizontal directivity", "acousticShort": "42 Hz - 20 kHz, adjustable directivity" },
        { "config": "K3i + KS28 or KS21i", "preset": "[K3 xxx] + [KSxx_60]", "acoustic": "reinforced LF contour, down to 29 Hz (KS21i) or 25 Hz (KS28)", "acousticShort": "reinforced contour, down to 29/25 Hz", "ratio": "2 K3i : 1 KS28 / 3 K3i : 2 KS21i" },
        { "config": "K3 + coupled CS1 (beside/behind)", "preset": "[K3 xxx] + [CS1_60]", "acoustic": "reinforced LF contour, LF rejection(rear cardioid), down to 25 Hz", "acousticShort": "rear cardioid, down to 25 Hz" },
        { "config": "K3 + coupled CS1 (supercardioid)", "preset": "[K3 xxx] + [CS1_60_S]", "acoustic": "reinforced LF contour, supercardioid pattern, down to 25 Hz", "acousticShort": "supercardioid, down to 25 Hz" },
        { "config": "K3i + Kara IIi (downfill)", "preset": "[K3 xxx] + [KARAIIDOWNK3]", "acoustic": "42 Hz - 20 kHz, extends vertical coverage to closer audience", "acousticShort": "42 Hz - 20 kHz, downfill" }
      ],
      "notes": [
        { "text": "Acoustic Properties 열의 주파수 대역(예: \"42 Hz - 20 kHz\", \"down to 25 Hz\")은 원문 서문(p.49)에 명시된 대로 -10 dB 기준 대역폭/저역 한계다." },
        { "text": "카디오이드 배열 시 [KSxx_xx_C] 또는 [KSxx_xx_Cx] 프리셋을 쓴다." },
        { "text": "[K3 xxx] 조정핀: [K3 70]=70º, [K3 90]=90º, [K3 110]=110º. 반드시 선택한 프리셋과 일치시킬 것." },
        { "text": "출력 라우팅(p.53-54 기준): [K3 xxx] 및 Downfill 프리셋 모두 OUT1=LF, OUT2=HF(IN A) + OUT3=LF, OUT4=HF(IN A), 게인 0dB · 딜레이 0ms · 정상 극성(+) · 뮤트 해제(ON)." }
      ],
      "ratioNotes": [
        {
          "text": "Downfill(어레이 아래쪽 추가 수직 커버리지) 옵션은 K3i용으로 Kara IIi를 사용한다(15 dB 헤드룸 제공).",
          "subs": [
            "Kara IIi: [KARAIIDOWNK3](110°) / [KARAIIDOWNK3 70] / [KARAIIDOWNK3 90]",
            "[KARAIIDOWNK3]은 Kara II(i) 110° 핀 설정에 최적화."
          ]
        }
      ],
      "ratioSource": "K3i_OM_EN_3.1.pdf p.32-36",
      "delayDefaults": {
        "rows": [
          { "combo": "[K3i] + [KS28_60]", "items": ["K3i = 0.5 ms", "KS28 = 0 ms (−)"] },
          { "combo": "[K3i] + [KS28_60_C]", "items": ["K3i = 6 ms", "KS28 = 0 ms (−)"] },
          { "combo": "[K3i] + [KS28_60_Cx]", "items": ["K3i = 4 ms", "KS28 = 0 ms (−)"] },
          { "combo": "[K3i] + [KS21i_60]", "items": ["K3i = 0 ms", "KS21i = 0 ms (−)"] },
          { "combo": "[K3i] + [KS21i_60_C]", "items": ["K3i = 5.5 ms", "KS21i = 0 ms (−)"] },
          { "combo": "[K3i] + [KS21i_60_Cx]", "items": ["K3i = 5 ms", "KS21i = 0 ms"] }
        ],
        "notes": [
          { "text": "위 표의 값은 pre-alignment(사전 정렬) 딜레이와 극성 기본값을 함께 표기한 것이며, 실제 현장에서는 여기에 배치 간격에 따른 geometric(기하학적) 딜레이를 추가로 더해야 한다." },
          { "text": "별도 표기가 없으면 극성은 반전 없는 정상(+). 빨간색 (−) 표시가 있는 엘리먼트만 반전이다. K3i는 모든 조합에서 항상 정상(+). KS28/KS21i는 대부분 반전이나, [K3i]+[KS21i_60_Cx] 조합만 유일하게 KS21i가 예외적으로 정상(+)이다(K3와 동일 패턴)." }
        ],
        "source": "K3i_OM_EN_3.1.pdf p.35"
      },
      "source": "preset_guide_EN.pdf p.53-54 (owner's manual EN v29.0); K3i_OM_EN_3.1.pdf p.32-36"
    },
    // [기계 안전] mechanical_safety 섹션(OM
    // "Mechanical safety > Flown configurations") 전체 반영.
    "mechanicalSafety": {
      "flownRows": [
        { "config": "flown", "accessory": "K3i-BUMP + K3i-BAR + rigging plates", "safeLimit": "12", "maxLimit": "24" },
        { "config": "flown and pullback", "accessory": "K3i-RIGBAR x2 + rigging plates", "safeLimit": "12", "maxLimit": "16" }
      ],
      "notes": [
        { "text": "천장 마운트(ceiling-mounted, 상한 3), Kara IIi 다운필 조합 등 추가 구성이 매뉴얼에 더 있으나 기본 플라잉 구성만 반영했다." }
      ],
      "safetyFactor": "4:1",
      "maxWindLoad": "6 Beaufort",
      "source": "K3i_OM_EN_3.1.pdf"
    }
  },
  {
    "id": "spk-la-kara-ii",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "Kara II",
    "series": "K Series",
    "throwCat": "Long Throw",
    "type": "Line Array",
    "throw": "Long throw >35m",
    "lowInch": 8,
    "lowQty": 2,
    "crossover": "2-way, active",
    "crossoverTags": [
      "2-way",
      "active"
    ],
    "spl": 142,
    "cov": {
      "h": "110°,70°,55°/35°,35°/55°",
      "v": "10°",
      "splayList": [
        0,
        1,
        2,
        3,
        4,
        5,
        7.5,
        10
      ]
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "80 Hz",
        "hi": "19 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "63 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "55 Hz",
        "hi": "20 kHz"
      }
    ],
    // [지향성] Cardioid_Capability.
    "cardioidCapability": "No",
    "weight": 26,
    "transducers": "LF: 2 × 8″ · HF: 1 × 3″",
    "connectors": "4-point speakON x2 (IN/LINK 상호교환)",
    "ip": "IP55",
    // [치수] Kara_II_AE_EN.docx "Physical data" 기준으로
    // 730×250×383mm를 사용한다.
    "dims": "730 x 250 x 383 mm / 28.7 x 9.8 x 15.1 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 3,
            "total": 6,
            "splByPreset": [
              {
                "preset": "[KARA II 70]",
                "spl": 142
              }
            ]
          }
        ]
      },
      {
        "model": "LA2Xi",
        "configs": [
          {
            "mode": "SE",
            "perCh": 2,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[KARA II 70]",
                "spl": 137
              }
            ]
          }
        ]
      },
      {
        "model": "LA4X",
        "configs": [
          {
            "mode": "",
            "perCh": 2,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[KARA II 70]",
                "spl": 142
              }
            ]
          }
        ]
      },
      {
        "model": "LA7.16",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[KARA II 70]",
                "spl": 142
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/6), LA2Xi(SE2/4), LA4X(2/4), LA7.16(1/8)",
    // 기존 Front 사진(spk-la-kara-ii.webp)을 Horizontal로
    // 개명(실 파일도 spk-la-kara-ii-horizontal.webp로 리네임), 단독 Array
    // 사진(spk-la-kara-ii-array.webp)은 삭제. 순서: Horizontal/Vertical/
    // Vertical(Panflex)/Array(12x+M-BUMP+M-BAR)/With SB18.
    "img": "public/assets/img/speakers/la/official/k-series/kara-ii/01-3dr-kara-ii-3-4-avant-catalogue-01.runtime.webp",
    "views": [
      {
        "label": "Kara II 3 4 Avant Catalogue 01",
        "src": "public/assets/img/speakers/la/official/k-series/kara-ii/01-3dr-kara-ii-3-4-avant-catalogue-01.runtime.webp"
      },
      {
        "label": "Kara II 3 4 Avant Catalogue 02",
        "src": "public/assets/img/speakers/la/official/k-series/kara-ii/02-3dr-kara-ii-3-4-avant-catalogue-02.runtime.webp"
      },
      {
        "label": "12xKara II+M-Bump+M-Bar 01",
        "src": "public/assets/img/speakers/la/official/k-series/kara-ii/03-3dr-12xkara-ii-m-bump-m-bar-01.runtime.webp"
      },
      {
        "label": "3xSB18+9xKARA II 01",
        "src": "public/assets/img/speakers/la/official/k-series/kara-ii/04-3dr-3xsb18-9xkara-ii-01.runtime.webp"
      }
    ],
    // 카드 hover 대상을 Array(12x + M-BUMP + M-BAR)로 지정
    // (K1/K2/K3/K3i 와 동일한 cardHoverView 패턴, speakers.view.js cardHTML 참고).
    "cardHoverView": "Array (12x + M-BUMP + M-BAR)",
    "relations": {
      "ampIds": []
    },
    "watt": 355,
    // 원문: raw-data/raw-specs/la/references/presets/k-series/kara-ii.md
    // (출처: preset_guide_EN.pdf p.55-56, owner's manual EN v29.0).
    // Kara II/Kara IIi는 동일 인클로저의 다른 버전 — 팩토리 프리셋/권장 구성 공유(원문 명시).
    "presets": {
      "rows": [
        { "config": "line source", "preset": "[KARA II xxx]", "acoustic": "55 Hz - 20 kHz", "acousticShort": "55 Hz - 20 kHz" },
        { "config": "line source + coupled subwoofers (SB18/KS21)", "preset": "[KARA II xxx] + [xxxx_100]", "acoustic": "down to 32 Hz(SB18)/31 Hz(KS21)/25 Hz(KS28/SB28)", "acousticShort": "down to 32/31/25 Hz", "ratio": "3 Kara II : 1 SB18 or KS21", "minLine": "9 Kara II + 3 SB18" },
        { "config": "line source + separated subwoofers", "preset": "[KARA II xxx] + [xxxx_60]", "acoustic": "reinforced LF contour", "acousticShort": "reinforced LF contour", "ratio": "3 Kara II : 2 SB18 or KS21" },
        { "config": "line source + coupled subwoofers + KS28/SB28", "preset": "[KARA II xxx] + [xxxx_100] + [xxxx_60]", "acoustic": "reinforced LF contour, high-pass at 100 Hz", "acousticShort": "reinforced contour, HPF 100 Hz", "ratio": "3 Kara II : 1 SB18 or KS21 : 1 KS28", "minLine": "9 Kara II + 3 SB18" },
        { "config": "single or pair of enclosures", "preset": "[KARA II_FI]", "acoustic": "flat response", "acousticShort": "flat response" },
        { "config": "single/pair + coupled subwoofers (SB18/KS21)", "preset": "[KARA II_FI] + [xxxx_100]", "acoustic": "down to 32 Hz(SB18) or 31 Hz(KS21), reinforced LF contour", "acousticShort": "down to 32/31 Hz, reinforced contour" },
        { "config": "up to three enclosures", "preset": "[KARA II_MO]", "acoustic": "55 Hz - 20 kHz, low latency", "acousticShort": "55 Hz - 20 kHz, low latency" },
        { "config": "up to three + coupled subwoofers", "preset": "[KARA II_MO] + [xxxx_60]", "acoustic": "down to 32 Hz(SB18) or 29 Hz(KS21), reinforced LF contour, low latency", "acousticShort": "down to 32/29 Hz, low latency" }
      ],
      "notes": [
        { "text": "Acoustic Properties 열의 주파수 대역(예: \"55 Hz - 20 kHz\", \"down to 25 Hz\")은 원문 서문(p.49)에 명시된 대로 -10 dB 기준 대역폭/저역 한계다." },
        { "text": "카디오이드 배열 시 [xxxx_xx_C] 또는 [xxxx_xx_Cx] 프리셋을 쓴다." },
        { "text": "조정핀: [KARA II 70]=70º, [KARA II 90]=90º, [KARA II 110]=110º. [KARA II_FI]/[KARA II_MO]는 110° 핀 설정에 최적화." },
        { "text": "주의(원문 경고): Kara와 Kara II는 같은 라인 소스에서 함께 쓰지 말 것(두 시스템 간 음향 커플링이 최적이 아님)." },
        {
          "text": "출력 라우팅(p.56 기준)은 프리셋 그룹에 따라 다음과 같다.",
          "subs": [
            "[KARA II 70]/[KARA II 90]/[KARA II 110]: OUT1=LF, OUT2=HF(IN A) + OUT3=LF, OUT4=HF(IN A).",
            "[KARA II_FI]/[KARA II_MO]: OUT1=LF, OUT2=HF(IN A) + OUT3=LF, OUT4=HF(IN B). 뒤 2채널이 별도 입력(IN B)으로 분리됨."
          ]
        }
      ],
      "ratioSource": "Kara_II_OM_EN_5.0.pdf p.32-40",
      "delayDefaults": {
        "rows": [
          { "combo": "[KARA II] + [SB18_100]", "items": ["Kara II = 0 ms", "SB18 = 0 ms"] },
          { "combo": "[KARA II] + [SB18_100_C]", "items": ["Kara II = 5.5 ms", "SB18 = 0 ms"] },
          { "combo": "[KARA II] + [SB18_100_Cx]", "items": ["Kara II = 4 ms", "SB18 = 0 ms (−)"] },
          { "combo": "[KARA II] + [KS21_100]", "items": ["Kara II = 0 ms", "KS21 = 0.5 ms"] },
          { "combo": "[KARA II] + [KS21_100_C]", "items": ["Kara II = 5 ms", "KS21 = 0 ms"] },
          { "combo": "[KARA II] + [KS21_100_Cx]", "items": ["Kara II = 4 ms", "KS21 = 0 ms (−)"] },
          { "combo": "[KARA II] + [SB18_60]", "items": ["Kara II = 2.5 ms", "SB18 = 0 ms"] },
          { "combo": "[KARA II] + [SB18_60_C]", "items": ["Kara II = 8 ms", "SB18 = 0 ms"] },
          { "combo": "[KARA II] + [SB18_60_Cx]", "items": ["Kara II = 6.5 ms", "SB18 = 0 ms (−)"] },
          { "combo": "[KARA II] + [KS21_60]", "items": ["Kara II = 0.5 ms", "KS21 = 0 ms"] },
          { "combo": "[KARA II] + [KS21_60_C]", "items": ["Kara II = 6 ms", "KS21 = 0 ms"] },
          { "combo": "[KARA II] + [KS21_60_Cx]", "items": ["Kara II = 5.5 ms", "KS21 = 0 ms (−)"] },
          { "combo": "[KARA II] + [SB18_100] + [KS28_60]", "items": ["Kara II = 0 ms", "SB18 = 0 ms", "KS28 = 5.5 ms (−)"] },
          { "combo": "[KARA II] + [SB18_100] + [KS28_60_C]", "items": ["Kara II = 0 ms", "SB18 = 0 ms", "KS28 = 0 ms (−)"] },
          { "combo": "[KARA II] + [SB18_100] + [KS28_60_Cx]", "items": ["Kara II = 5.5 ms", "SB18 = 5.5 ms", "KS28 = 0 ms"] },
          { "combo": "[KARA II] + [KS21_100] + [KS28_60]", "items": ["Kara II = 0 ms", "KS21 = 0 ms", "KS28 = 5.5 ms (−)"] },
          { "combo": "[KARA II] + [KS21_100] + [KS28_60_C]", "items": ["Kara II = 0 ms", "KS21 = 0.5 ms", "KS28 = 0 ms (−)"] },
          { "combo": "[KARA II] + [KS21_100] + [KS28_60_Cx]", "items": ["Kara II = 5.5 ms", "KS21 = 6 ms", "KS28 = 0 ms"] },
          { "combo": "[KARA II_FI] + [SB18_100]", "items": ["Kara II = 3 ms", "SB18 = 0 ms"] },
          { "combo": "[KARA II_FI] + [SB18_100_C]", "items": ["Kara II = 8.5 ms", "SB18 = 0 ms"] },
          { "combo": "[KARA II_FI] + [SB18_100_Cx]", "items": ["Kara II = 7 ms", "SB18 = 0 ms (−)"] },
          { "combo": "[KARA II_FI] + [KS21_100]", "items": ["Kara II = 0 ms", "KS21 = 2.5 ms (−)"] },
          { "combo": "[KARA II_FI] + [KS21_100_C]", "items": ["Kara II = 3 ms", "KS21 = 0 ms (−)"] },
          { "combo": "[KARA II_FI] + [KS21_100_Cx]", "items": ["Kara II = 2 ms", "KS21 = 0 ms"] }
        ],
        "notes": [
          { "text": "위 표의 값은 pre-alignment(사전 정렬) 딜레이와 극성 기본값을 함께 표기한 것이며, 실제 현장에서는 여기에 배치 간격에 따른 geometric(기하학적) 딜레이를 추가로 더해야 한다." },
          { "text": "별도 표기가 없으면 극성은 반전 없는 정상(+). 빨간색 (−) 표시가 있는 엘리먼트만 반전이다. K1/K2/K3와 달리 Kara II는 표준 조합(비-Cx)에서는 서브우퍼가 대부분 정상(+)이고, Cx(카디오이드 반전) 조합에서만 반전(-)되는 경향을 보인다 — 단 KS28을 포함한 3중 조합의 Cx 케이스는 KS28이 오히려 +로 뒤집히는 등 단순 규칙으로 일반화되지 않는다." }
        ],
        "source": "Kara_II_OM_EN_5.0.pdf p.35, 36, 38, 40"
      },
      "source": "preset_guide_EN.pdf p.55-56 (owner's manual EN v29.0); Kara_II_OM_EN_5.0.pdf p.32-40"
    },
    // [기계 안전] mechanical_safety 섹션.
    "mechanicalSafety": {
      "flownRows": [
        { "config": "flown", "accessory": "M-BUMP + M-BAR (optional)", "safeLimit": "16", "maxLimit": "24" },
        { "config": "flown", "accessory": "KARA-MINIBU", "safeLimit": "6", "maxLimit": "6" }
      ],
      "notes": [
        { "text": "KARA-MINIBU 행은 원문에 \"maximum/safe limit\" 단일 값(6)만 표기되어 두 열 모두 6으로 채택했다." }
      ],
      "safetyFactor": "4:1",
      "maxWindLoad": "6 Beaufort",
      "source": "Kara_II_OM_EN_5.0.pdf"
    }
  },
  {
    "id": "spk-la-kara-iii",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "Kara IIi",
    "series": "K Series",
    "throwCat": "Long Throw",
    "type": "Line Array",
    "throw": "Long throw >35m",
    "lowInch": 8,
    "lowQty": 2,
    "crossover": "2-way, active",
    "crossoverTags": [
      "2-way",
      "active"
    ],
    "spl": 142,
    "cov": {
      "h": "110°,70°,55°/35°,35°/55°",
      "v": "10°",
      "splayList": [
        0,
        1,
        2,
        3,
        4,
        5,
        7.5,
        10
      ]
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "80 Hz",
        "hi": "19 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "63 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "55 Hz",
        "hi": "20 kHz"
      }
    ],
    // [지향성] Cardioid_Capability.
    "cardioidCapability": "No",
    "weight": 21,
    "transducers": "LF: 2 × 8″ · HF: 1 × 3″",
    "connectors": "4-point terminal block x2",
    "ip": "IP55",
    "dims": "701 x 252 x 409 mm / 27.6 x 9.9 x 16.1 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 3,
            "total": 6,
            "splByPreset": [
              {
                "preset": "[KARA II 70]",
                "spl": 142
              }
            ]
          }
        ]
      },
      {
        "model": "LA2Xi",
        "configs": [
          {
            "mode": "SE",
            "perCh": 2,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[KARA II 70]",
                "spl": 137
              }
            ]
          }
        ]
      },
      {
        "model": "LA4X",
        "configs": [
          {
            "mode": "",
            "perCh": 2,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[KARA II 70]",
                "spl": 142
              }
            ]
          }
        ]
      },
      {
        "model": "LA7.16",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[KARA II 70]",
                "spl": 142
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/6), LA2Xi(SE2/4), LA4X(2/4), LA7.16(1/8)",
    // 기존 Front 사진(spk-la-kara-iii.webp)을 Horizontal로
    // 개명(실 파일도 spk-la-kara-iii-horizontal.webp로 리네임). 기존 단독
    // Array 사진(spk-la-kara-iii-array.webp)은 삭제하지 않고 "Array White
    // (8x + KARAIIi-BUMP)"로 재라벨링, 기존 "Array (8x+KARAIIi-BUMP+M-BARi)"
    // 는 "Array Black"으로 재라벨링. 순서: Horizontal/Vertical/
    // Vertical(Panflex)/Array White/Array Black/With SB18.
    "img": "public/assets/img/speakers/la/official/k-series/kara-iii/01-3dr-kara-iii-3-4-avant-catalogue-01.runtime.webp",
    "views": [
      {
        "label": "Kara IIi 3 4 Avant Catalogue 01",
        "src": "public/assets/img/speakers/la/official/k-series/kara-iii/01-3dr-kara-iii-3-4-avant-catalogue-01.runtime.webp"
      },
      {
        "label": "Kara IIi 3 4 Avant Catalogue Ailettes Fermees 01",
        "src": "public/assets/img/speakers/la/official/k-series/kara-iii/02-3dr-kara-iii-3-4-avant-catalogue-ailettes-fermees-01.runtime.webp"
      },
      {
        "label": "3xSB18 IIi+9xKara IIi+KARAIIi-BUMP 01",
        "src": "public/assets/img/speakers/la/official/k-series/kara-iii/03-3dr-3xsb18-iii-9xkara-iii-karaiii-bump-01.runtime.webp"
      },
      {
        "label": "8xKara IIi+KARAIIi-BUMP+M-BARi 01",
        "src": "public/assets/img/speakers/la/official/k-series/kara-iii/04-3dr-8xkara-iii-karaiii-bump-m-bari-01.runtime.webp"
      }
    ],
    // 카드 hover 대상을 Array White로 지정
    // (K1/K2/K3/K3i/Kara II 와 동일한 cardHoverView 패턴, speakers.view.js cardHTML 참고).
    "cardHoverView": "Array White (8x + KARAIIi-BUMP)",
    "notes": "Kara II의 설치용(install) 버전. 전용 인클로저로 Kara II와 치수/무게가 다름(Kara_IIi_AE_EN.docx 원문 확보, raw-data/raw-specs/la/speakers/k-series/kara-iii/kara-iii.md 참고). Depth 치수는 출처 간 미세 불일치(409mm vs 403mm)가 있어 docx 값을 채택했다(각주 참고).",
    "relations": {
      "ampIds": []
    },
    "watt": 355,
    // 원문: raw-data/raw-specs/la/references/presets/k-series/kara-ii.md
    // (출처: preset_guide_EN.pdf p.55-56, owner's manual EN v29.0).
    // Kara IIi는 Kara II와 동일 인클로저의 다른 버전 — 팩토리 프리셋/권장 구성 공유(원문 명시).
    "presets": {
      "rows": [
        { "config": "line source", "preset": "[KARA II xxx]", "acoustic": "55 Hz - 20 kHz", "acousticShort": "55 Hz - 20 kHz" },
        { "config": "line source + coupled subwoofers (SB18/KS21)", "preset": "[KARA II xxx] + [xxxx_100]", "acoustic": "down to 32 Hz(SB18)/31 Hz(KS21)/25 Hz(KS28/SB28)", "acousticShort": "down to 32/31/25 Hz", "ratio": "3 Kara II : 1 SB18 or KS21", "minLine": "9 Kara II + 3 SB18" },
        { "config": "line source + separated subwoofers", "preset": "[KARA II xxx] + [xxxx_60]", "acoustic": "reinforced LF contour", "acousticShort": "reinforced LF contour", "ratio": "3 Kara II : 2 SB18 or KS21" },
        { "config": "line source + coupled subwoofers + KS28/SB28", "preset": "[KARA II xxx] + [xxxx_100] + [xxxx_60]", "acoustic": "reinforced LF contour, high-pass at 100 Hz", "acousticShort": "reinforced contour, HPF 100 Hz", "ratio": "3 Kara II : 1 SB18 or KS21 : 1 KS28", "minLine": "9 Kara II + 3 SB18" },
        { "config": "single or pair of enclosures", "preset": "[KARA II_FI]", "acoustic": "flat response", "acousticShort": "flat response" },
        { "config": "single/pair + coupled subwoofers (SB18/KS21)", "preset": "[KARA II_FI] + [xxxx_100]", "acoustic": "down to 32 Hz(SB18) or 31 Hz(KS21), reinforced LF contour", "acousticShort": "down to 32/31 Hz, reinforced contour" },
        { "config": "up to three enclosures", "preset": "[KARA II_MO]", "acoustic": "55 Hz - 20 kHz, low latency", "acousticShort": "55 Hz - 20 kHz, low latency" },
        { "config": "up to three + coupled subwoofers", "preset": "[KARA II_MO] + [xxxx_60]", "acoustic": "down to 32 Hz(SB18) or 29 Hz(KS21), reinforced LF contour, low latency", "acousticShort": "down to 32/29 Hz, low latency" }
      ],
      "notes": [
        { "text": "Acoustic Properties 열의 주파수 대역(예: \"55 Hz - 20 kHz\", \"down to 25 Hz\")은 원문 서문(p.49)에 명시된 대로 -10 dB 기준 대역폭/저역 한계다." },
        { "text": "카디오이드 배열 시 [xxxx_xx_C] 또는 [xxxx_xx_Cx] 프리셋을 쓴다." },
        { "text": "조정핀: [KARA II 70]=70º, [KARA II 90]=90º, [KARA II 110]=110º. [KARA II_FI]/[KARA II_MO]는 110° 핀 설정에 최적화." },
        { "text": "주의(원문 경고): Kara와 Kara II는 같은 라인 소스에서 함께 쓰지 말 것(두 시스템 간 음향 커플링이 최적이 아님)." },
        {
          "text": "출력 라우팅(p.56 기준)은 프리셋 그룹에 따라 다음과 같다.",
          "subs": [
            "[KARA II 70]/[KARA II 90]/[KARA II 110]: OUT1=LF, OUT2=HF(IN A) + OUT3=LF, OUT4=HF(IN A).",
            "[KARA II_FI]/[KARA II_MO]: OUT1=LF, OUT2=HF(IN A) + OUT3=LF, OUT4=HF(IN B). 뒤 2채널이 별도 입력(IN B)으로 분리됨."
          ]
        }
      ],
      "ratioSource": "Kara_IIi_OM_EN_5.0.pdf p.38-46",
      "delayDefaults": {
        "rows": [
          { "combo": "[Kara IIi] + [SB18 IIi_100]", "items": ["Kara IIi = 0 ms", "SB18 IIi = 0 ms"] },
          { "combo": "[Kara IIi] + [SB18 IIi_100_C]", "items": ["Kara IIi = 5.5 ms", "SB18 IIi = 0 ms"] },
          { "combo": "[Kara IIi] + [SB18 IIi_100_Cx]", "items": ["Kara IIi = 4 ms", "SB18 IIi = 0 ms (−)"] },
          { "combo": "[Kara IIi] + [KS21i_100]", "items": ["Kara IIi = 0 ms", "KS21i = 0.5 ms"] },
          { "combo": "[Kara IIi] + [KS21i_100_C]", "items": ["Kara IIi = 5 ms", "KS21i = 0 ms"] },
          { "combo": "[Kara IIi] + [KS21i_100_Cx]", "items": ["Kara IIi = 4 ms", "KS21i = 0 ms (−)"] },
          { "combo": "[Kara IIi] + [SB18 IIi_60]", "items": ["Kara IIi = 2.5 ms", "SB18 IIi = 0 ms"] },
          { "combo": "[Kara IIi] + [SB18 IIi_60_C]", "items": ["Kara IIi = 8 ms", "SB18 IIi = 0 ms"] },
          { "combo": "[Kara IIi] + [SB18 IIi_60_Cx]", "items": ["Kara IIi = 6.5 ms", "SB18 IIi = 0 ms (−)"] },
          { "combo": "[Kara IIi] + [KS21i_60]", "items": ["Kara IIi = 0.5 ms", "KS21i = 0 ms"] },
          { "combo": "[Kara IIi] + [KS21i_60_C]", "items": ["Kara IIi = 6 ms", "KS21i = 0 ms"] },
          { "combo": "[Kara IIi] + [KS21i_60_Cx]", "items": ["Kara IIi = 5.5 ms", "KS21i = 0 ms (−)"] },
          { "combo": "[Kara IIi] + [SB18 IIi_100] + [SB28_60]", "items": ["Kara IIi = 0 ms", "SB18 IIi = 0 ms", "SB28 = 5.5 ms (−)"] },
          { "combo": "[Kara IIi] + [SB18 IIi_100] + [SB28_60_C]", "items": ["Kara IIi = 0 ms", "SB18 IIi = 0 ms", "SB28 = 0 ms (−)"] },
          { "combo": "[Kara IIi] + [SB18 IIi_100] + [SB28_60_Cx]", "items": ["Kara IIi = 5.5 ms", "SB18 IIi = 5.5 ms", "SB28 = 0 ms"] },
          { "combo": "[Kara IIi] + [SB18 IIi_100] + [KS28_60]", "items": ["Kara IIi = 0 ms", "SB18 IIi = 0 ms", "KS28 = 5.5 ms (−)"] },
          { "combo": "[Kara IIi] + [SB18 IIi_100] + [KS28_60_C]", "items": ["Kara IIi = 0 ms", "SB18 IIi = 0 ms", "KS28 = 0 ms (−)"] },
          { "combo": "[Kara IIi] + [SB18 IIi_100] + [KS28_60_Cx]", "items": ["Kara IIi = 5.5 ms", "SB18 IIi = 5.5 ms", "KS28 = 0 ms"] },
          { "combo": "[Kara IIi] + [KS21i_100] + [SB28_60]", "items": ["Kara IIi = 0 ms", "KS21i = 0.5 ms", "SB28 = 5.5 ms (−)"] },
          { "combo": "[Kara IIi] + [KS21i_100] + [SB28_60_C]", "items": ["Kara IIi = 0 ms", "KS21i = 0.5 ms", "SB28 = 0 ms (−)"] },
          { "combo": "[Kara IIi] + [KS21i_100] + [SB28_60_Cx]", "items": ["Kara IIi = 5.5 ms", "KS21i = 6 ms", "SB28 = 0 ms"] },
          { "combo": "[Kara IIi] + [KS21i_100] + [KS28_60]", "items": ["Kara IIi = 0 ms", "KS21i = 0 ms", "KS28 = 5.5 ms (−)"] },
          { "combo": "[Kara IIi] + [KS21i_100] + [KS28_60_C]", "items": ["Kara IIi = 0 ms", "KS21i = 0.5 ms", "KS28 = 0 ms (−)"] },
          { "combo": "[Kara IIi] + [KS21i_100] + [KS28_60_Cx]", "items": ["Kara IIi = 5.5 ms", "KS21i = 6 ms", "KS28 = 0 ms"] }
        ],
        "notes": [
          { "text": "위 표의 값은 pre-alignment(사전 정렬) 딜레이와 극성 기본값을 함께 표기한 것이며, 실제 현장에서는 여기에 배치 간격에 따른 geometric(기하학적) 딜레이를 추가로 더해야 한다." },
          { "text": "별도 표기가 없으면 극성은 반전 없는 정상(+). 빨간색 (−) 표시가 있는 엘리먼트만 반전이다. Kara II와 수치가 완전히 동일하다(음향 코어 및 프리셋을 공유하는 install 파생형)." }
        ],
        "source": "Kara_IIi_OM_EN_5.0.pdf p.41, 43, 45"
      },
      "source": "preset_guide_EN.pdf p.55-56 (owner's manual EN v29.0); Kara_IIi_OM_EN_5.0.pdf p.38-46"
    },
    // [기계 안전] mechanical_safety 섹션.
    "mechanicalSafety": {
      "flownRows": [
        { "config": "flown", "accessory": "KARAIIi-BUMP + M-BARi (optional) + rigging plates", "safeLimit": "12", "maxLimit": "24" }
      ],
      "safetyFactor": "4:1",
      "maxWindLoad": "6 Beaufort",
      "source": "Kara_IIi_OM_EN_5.0.pdf"
    }
  },
  {
    "id": "spk-la-kiva-ii",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "KIVA II",
    "series": "K Series",
    "throwCat": "Long Throw",
    "type": "Line Array",
    "throw": "Long throw >35m",
    "lowInch": 6.5,
    "lowQty": 2,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 138,
    "cov": {
      "h": "100°",
      "splayList": [
        0,
        1,
        2,
        3,
        4,
        5,
        7.5,
        10,
        12.5,
        15
      ]
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "84 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "75 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "70 Hz",
        "hi": "20 kHz"
      }
    ],
    // [지향성] Cardioid_Capability.
    "cardioidCapability": "No",
    "weight": 14,
    "transducers": "LF: 2 × 6.5″ · HF: 1 × 1.75″",
    "connectors": "4-point speakON x2 (IN/LINK 상호교환)",
    "ip": "IP55",
    "dims": "525 x 202 x 357 mm / 20.7 x 8 x 14.1 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 6,
            "total": 24,
            "splByPreset": [
              {
                "preset": "[KIVA II]",
                "spl": 138
              }
            ]
          }
        ]
      },
      {
        "model": "LA2Xi",
        "configs": [
          {
            "mode": "BTL",
            "perCh": 2,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[KIVA II]",
                "spl": 138
              }
            ]
          }
        ]
      },
      {
        "model": "LA2Xi",
        "configs": [
          {
            "mode": "SE",
            "perCh": 2,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[KIVA II]",
                "spl": 133
              }
            ]
          }
        ]
      },
      {
        "model": "LA4X",
        "configs": [
          {
            "mode": "",
            "perCh": 2,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[KIVA II]",
                "spl": 138
              }
            ]
          }
        ]
      },
      {
        "model": "LA7.16",
        "configs": [
          {
            "mode": "",
            "perCh": 2,
            "total": 32,
            "splByPreset": [
              {
                "preset": "[KIVA II]",
                "spl": 138
              }
            ]
          }
        ]
      },
      {
        "model": "LA1.16i",
        "configs": [
          {
            "mode": "BTL",
            "perCh": 2,
            "total": 10,
            "splByPreset": [
              {
                "preset": "[KIVA II]",
                "spl": 132
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(6/24), LA2Xi(BTL2/4), LA2Xi(SE2/8), LA4X(2/8), LA7.16(2/32), LA1.16i(BTL2/10)",
    "img": "public/assets/img/speakers/la/official/k-series/kiva-ii/01-l-acoustics-kivaii-front.jpg",
    "views": [
      {
        "label": "KivaII Front",
        "src": "public/assets/img/speakers/la/official/k-series/kiva-ii/01-l-acoustics-kivaii-front.jpg"
      },
      {
        "label": "Kiva-II",
        "src": "public/assets/img/speakers/la/official/k-series/kiva-ii/02-kiva-ii.jpg"
      },
      {
        "label": "KivaII 6",
        "src": "public/assets/img/speakers/la/official/k-series/kiva-ii/03-l-acoustics-kivaii-6.jpg"
      },
      {
        "label": "KivaII Rear",
        "src": "public/assets/img/speakers/la/official/k-series/kiva-ii/04-l-acoustics-kivaii-rear.jpg"
      }
    ],
    "relations": {
      "ampIds": []
    },
    "watt": 186,
    // 원문: raw-data/raw-specs/la/references/presets/k-series/kiva-ii.md
    // (출처: preset_guide_EN.pdf p.58, owner's manual EN v29.0).
    "presets": {
      "rows": [
        { "config": "line source", "preset": "[KIVA II]", "acoustic": "70 Hz - 20 kHz", "acousticShort": "70 Hz - 20 kHz" },
        { "config": "line source + coupled subwoofer (SB15m/SB18)", "preset": "[KIVA II] + [SB15_100] / [SB18_60]", "acoustic": "down to 32 Hz(SB18)/40 Hz(SB15m), reinforced LF contour", "acousticShort": "down to 32/40 Hz, reinforced contour", "ratio": "3 Kiva II : 1 SB15m / 2 Kiva II : 1 SB15m", "minLine": "12 Kiva II + 4 SB15m" },
        { "config": "up to three enclosures", "preset": "[KIVA II_FI]", "acoustic": "70 Hz - 20 kHz, flat response", "acousticShort": "70 Hz - 20 kHz, flat response" },
        { "config": "up to three + coupled subwoofer (SB15m)", "preset": "[KIVA II_FI] + [SB15_100]", "acoustic": "down to 40 Hz, reinforced LF contour", "acousticShort": "down to 40 Hz, reinforced contour", "ratio": "3 Kiva II : 1 SB15m / 2 Kiva II : 1 SB15m" }
      ],
      "notes": [
        { "text": "Acoustic Properties 열의 주파수 대역(예: \"70 Hz - 20 kHz\", \"down to 40 Hz\")은 원문 서문(p.49)에 명시된 대로 -10 dB 기준 대역폭/저역 한계다." },
        { "text": "카디오이드 배열 시 [SB1x_xx_C] 또는 [SB1x_xx_Cx] 프리셋을 쓴다." },
        {
          "text": "출력 라우팅(p.58 기준)은 프리셋에 따라 다음과 같다.",
          "subs": [
            "[KIVA II]: OUT1~4 전부 PA 채널, IN A, 게인 0dB · 딜레이 0ms · 정상 극성(+) · 뮤트 해제(ON).",
            "[KIVA II_FI]: OUT1/2=PA(IN A) + OUT3/4=PA(IN B)."
          ]
        }
      ],
      "ratioSource": "Kiva_II_OM_EN_3.0.pdf p.23-29",
      "delayDefaults": {
        "rows": [
          { "combo": "[KIVA II] + [SB15_100]", "items": ["Kiva II = 0 ms", "SB15m = 1 ms"] },
          { "combo": "[KIVA II] + [SB15_100_C]", "items": ["Kiva II = 2.5 ms", "SB15m = 0 ms"] },
          { "combo": "[KIVA II] + [SB15_100] + [SB18_60]", "items": ["Kiva II = 0 ms", "SB15m = 1 ms", "SB18 = 1 ms (−)"] },
          { "combo": "[KIVA II] + [SB15_100] + [SB18_60_C]", "items": ["Kiva II = 4.5 ms", "SB15m = 5.5 ms", "SB18 = 0 ms (−)"] },
          { "combo": "[KIVA II] + [SB15_100_C] + [SB18_60]", "items": ["Kiva II = 2.5 ms", "SB15m = 0 ms", "SB18 = 3.5 ms (−)"] },
          { "combo": "[KIVA II] + [SB15_100_C] + [SB18_60_C]", "items": ["Kiva II = 4.5 ms", "SB15m = 2 ms", "SB18 = 0 ms (−)"] },
          { "combo": "[KIVA II_FI] + [SB15_100]", "items": ["Kiva II = 0 ms", "SB15m = 1 ms"] },
          { "combo": "[KIVA II_FI] + [SB15_100_C]", "items": ["Kiva II = 2.5 ms", "SB15m = 0 ms"] }
        ],
        "notes": [
          { "text": "위 표의 값은 pre-alignment(사전 정렬) 딜레이와 극성 기본값을 함께 표기한 것이며, 실제 현장에서는 여기에 배치 간격에 따른 geometric(기하학적) 딜레이를 추가로 더해야 한다." },
          { "text": "별도 표기가 없으면 극성은 반전 없는 정상(+). 빨간색 (−) 표시가 있는 엘리먼트만 반전이다. Kiva II와 SB15m은 모든 조합에서 정상(+)이며, SB18은 3중 조합 4개 전부에서 반전(-)이다 — Kara II/K1~K3와도 다른 Kiva II 고유 패턴." }
        ],
        "source": "Kiva_II_OM_EN_3.0.pdf p.26, 27, 29"
      },
      "source": "preset_guide_EN.pdf p.58 (owner's manual EN v29.0); Kiva_II_OM_EN_3.0.pdf p.23-29"
    },
    // [기계 안전] mechanical_safety 섹션.
    "mechanicalSafety": {
      "flownRows": [
        { "config": "flown", "accessory": "KIBU-SB", "safeLimit": "8", "maxLimit": "20" },
        { "config": "flown", "accessory": "KIBU II", "safeLimit": "8", "maxLimit": "20" }
      ],
      "stackedRows": [
        { "config": "ceiling-mounted", "accessory": "KIET II", "safeLimit": "—", "maxLimit": "3" }
      ],
      "safetyFactor": "4:1",
      "maxWindLoad": "6 Beaufort",
      "source": "Kiva_II_OM_EN_3.0.pdf"
    }
  },
  {
    "id": "spk-la-k1-sb",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "K1-SB",
    "series": "K Series",
    "throwCat": "Long Throw",
    "type": "Subwoofer",
    "throw": "Low-end extension",
    "lowInch": 15,
    "lowQty": 2,
    "crossover": "passive",
    "crossoverTags": [
      "passive"
    ],
    "spl": 141,
    "cov": null,
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "38 Hz",
        "hi": "61 Hz"
      },
      {
        "db": "-6 dB",
        "lo": "35 Hz",
        "hi": "70 Hz"
      },
      {
        "db": "-10 dB",
        "lo": "30 Hz",
        "hi": "80 Hz"
      }
    ],
    // [지향성] Cardioid_Capability — 원문:
    // K1-SB_AE_EN.docx/K1-SB_SP_EN_2.0.pdf 전량 "cardioid" 스캔 0건,
    // AE가 "Omni configuration"/"Enclosure directivity: omnidirectional"로
    // 직접 확정.
    "cardioidCapability": "No",
    "weight": 83,
    "transducers": "LF: 2 × 15″",
    "connectors": "4-point speakON",
    "ip": "IP45",
    "dims": "1342 x 438 x 520 mm / 52.8 x 17.2 x 20.5 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[K1SB_60]",
                "spl": 141
              },
              {
                "preset": "[K1SB_100_NC]",
                "spl": 142
              },
              {
                "preset": "[K1SB_X]",
                "spl": 145
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(1/4)",
    "img": "public/assets/img/speakers/la/official/k-series/k1-sb/01-3dr-k1-sb-perspective-01-800x400-1.png",
    "views": [
      {
        "label": "k1-sb-perspective-01-800x400-1",
        "src": "public/assets/img/speakers/la/official/k-series/k1-sb/01-3dr-k1-sb-perspective-01-800x400-1.png"
      },
      {
        "label": "K1-SB 3 4 Avant Catalogue 01",
        "src": "public/assets/img/speakers/la/official/k-series/k1-sb/02-3dr-k1-sb-3-4-avant-catalogue-01.runtime.webp"
      },
      {
        "label": "K1-SB Perspective 01",
        "src": "public/assets/img/speakers/la/official/k-series/k1-sb/03-3dr-k1-sb-perspective-01.runtime.webp"
      },
      {
        "label": "8xK1-SB+K1-BUMP 01",
        "src": "public/assets/img/speakers/la/official/k-series/k1-sb/04-3dr-8xk1-sb-k1-bump-01.runtime.webp"
      }
    ],
    "relations": {
      "ampIds": []
    },
    "watt": 930,
    // [기계 안전] Mechanical Safety 필드
    // 반영. preset_guide_and_matching/delay_defaults는 K1-SB 자신의
    // 원본에 데이터가 없고(항상 2차 엘리먼트) K1/K2 자신의 presets에
    // 이미 K1-SB 관점으로 기록되어 있어 여기에는 추가하지 않았다.
    "mechanicalSafety": {
      "safetyFactor": "4:1",
      "maxWindLoad": "6 Beaufort",
      "flownRows": [
        { "config": "flown", "accessory": "K1-BUMP", "safeLimit": "20", "maxLimit": "24" },
        { "config": "flown, with LA-RAK II AVB", "accessory": "K1-BUMP", "safeLimit": "18 K1-SB + 3 LA-RAK II AVB", "maxLimit": "24 K1-SB + 4 LA-RAK II AVB" }
      ],
      "source": "K1_OM_EN_4.0.pdf p.31"
    }
  }
];
