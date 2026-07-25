// d&b audiotechnik 독립 서브우퍼 데이터 (1개 모델).
// B22 는 특정 문자 시리즈에 속하지 않아 d&b 공식 사이트도 별도 'Subwoofers'
// 분류로 싣는다 — 앱에서도 같은 이름의 독립 시리즈로 둔다.
// 스펙 조사 전 — 제조사 공식 이미지만 등록된 상태다(pending: true).
// 스펙 필드는 전부 null/빈 배열로 두고, 파생 태그(wayCount/network/
// lowUnitConfig)는 speakers.schema.js 의 normalize* 가 pending 항목을
// 건너뛰므로 생성되지 않는다 — 조사도 안 한 제품이 Passive 등으로
// 잘못 분류되는 것을 막기 위함.
// 이미지 출처: dbaudio.com 제품 페이지(원본은 OneDrive MR-Raw-Assets/db/
// speakers/web/<시리즈>/). 여러 장인 경우 라인어레이는 가로 자세(horizontal),
// 그 외는 정면 단품 샷을 대표사진으로 골랐다.
export const DB_SUBWOOFERS = [
{
  "id": "spk-db-b22-sub",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "B22-SUB",
  "series": "Subwoofers",
  "throwCat": null,
  "type": null,
  "throw": null,
  "lowInch": null,
  "lowQty": null,
  "crossover": null,
  "crossoverTags": [],
  "spl": null,
  "cov": null,
  "freqs": [],
  "weight": null,
  "transducers": null,
  "connectors": null,
  "ip": null,
  "dims": null,
  "amps": [],
  "ampRaw": null,
  "notes": null,
  "img": "public/assets/img/speakers/db/subwoofers/spk-db-b22-sub.png",
  "relations": {
    "ampIds": []
  },
  "watt": null,
  "mechanicalSafety": null,
  "presets": null,
  "cardioidCapability": null,
  "pending": true
}
];
