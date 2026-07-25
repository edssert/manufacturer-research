// Meyer Sound Ashby 실링(매입형) 스피커 데이터 (2개 모델).
//
// 스펙 조사 전 — 제조사 공식 이미지만 등록된 상태다(pending: true).
// 스펙 필드는 전부 null/빈 배열로 두고, 파생 태그(wayCount/network/
// lowUnitConfig)는 speakers.schema.js 의 normalize* 가 pending 항목을
// 건너뛰므로 생성되지 않는다. selfPowered 도 null 로 둔다 — Meyer 제품
// 대부분이 파워드지만 조사 전에 단정하지 않는다.
// 이미지 출처: OneDrive MR-Raw-Assets/my/speakers/web/<분류>/<모델>/card/
// 의 카탈로그 썸네일(흰 배경)을 누끼 처리해 투명 PNG 로 변환. 모델 전용
// 카드가 없는 UP-4slim/MM-4XP 만 제품군 대표 샷을 썼다.
export const MY_ASHBY_SERIES = [
  {
    "id": "spk-my-ashby-5c",
    "mfr": "Meyer Sound",
    "mk": "my",
    "name": "Ashby-5C",
    "cardioidCapability": null,
    "series": "Ashby Series",
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
    "selfPowered": null,
    "ampRaw": null,
    "img": "public/assets/img/speakers/my/ashby-series/spk-my-ashby-5c.png",
    "relations": {
      "ampIds": []
    },
    "watt": null,
    "wattByBand": null,
    "notes": null,
    "pending": true
  },
  {
    "id": "spk-my-ashby-8c",
    "mfr": "Meyer Sound",
    "mk": "my",
    "name": "Ashby-8C",
    "cardioidCapability": null,
    "series": "Ashby Series",
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
    "selfPowered": null,
    "ampRaw": null,
    "img": "public/assets/img/speakers/my/ashby-series/spk-my-ashby-8c.png",
    "relations": {
      "ampIds": []
    },
    "watt": null,
    "wattByBand": null,
    "notes": null,
    "pending": true
  }
];
