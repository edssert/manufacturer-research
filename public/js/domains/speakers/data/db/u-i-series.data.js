// d&b audiotechnik Ui 스피커(설치형) 데이터 (2개 모델).
// U 시리즈 설치형은 서브우퍼(Bi10/Bi10N)만 별도 모델로 존재한다.
// 스펙 조사 전 — 제조사 공식 이미지만 등록된 상태다(pending: true).
// 스펙 필드는 전부 null/빈 배열로 두고, 파생 태그(wayCount/network/
// lowUnitConfig)는 speakers.schema.js 의 normalize* 가 pending 항목을
// 건너뛰므로 생성되지 않는다 — 조사도 안 한 제품이 Passive 등으로
// 잘못 분류되는 것을 막기 위함.
// 이미지 출처: dbaudio.com 제품 페이지(원본은 OneDrive MR-Raw-Assets/db/
// speakers/web/<시리즈>/). 여러 장인 경우 라인어레이는 가로 자세(horizontal),
// 그 외는 정면 단품 샷을 대표사진으로 골랐다.
export const DB_U_I_SERIES = [
{
  "id": "spk-db-bi10-sub",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "Bi10-SUB",
  "series": "U Series",
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
  "img": "public/assets/img/speakers/db/u/spk-db-bi10-sub.png",
  "relations": {
    "ampIds": []
  },
  "watt": null,
  "mechanicalSafety": null,
  "presets": null,
  "cardioidCapability": null,
  "pending": true
},
{
  "id": "spk-db-bi10n-sub",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "Bi10N-SUB",
  "series": "U Series",
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
  "img": "public/assets/img/speakers/db/u/spk-db-bi10n-sub.png",
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
