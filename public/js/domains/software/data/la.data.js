// 이미지 출처: l-acoustics.com/software/ 랜딩 페이지 카드. 원본은 OneDrive
// MR-Raw-Assets/la/software/web/<slug>/landing/ 에 제품당 1장씩 정리돼 있다.
// (제품 API 의 featured_media 는 제품 이미지가 아니라 사례 사진이라 쓰지 않는다.)
//
// 소프트웨어 도메인은 현재 전 항목이 스펙 조사 전이다 — 이미지·이름만 등록하고
// platform/price/notes/relations 는 비워 둔다. type 만 남긴 이유는 필터 칩과
// 정렬 키(softwareSchema)가 이 값을 요구하기 때문.
// 조사가 끝난 항목은 pending 을 제거하고 나머지 필드를 채운다.
export const LA_SOFTWARE = [
  {
    "id": "sw-la-soundvision",
    "mfr": "la",
    "name": "Soundvision",
    "type": ["Design & Simulation"],
    "platform": null,
    "price": null,
    "img": "public/assets/img/software/la/sw-la-soundvision.png",
    "pending": true,
    "notes": null,
    "relations": { "dspIds": [] }
  },
  {
    "id": "sw-la-network-manager",
    "mfr": "la",
    "name": "LA Network Manager",
    "type": ["Control & Monitoring"],
    "platform": null,
    "price": null,
    "img": "public/assets/img/software/la/sw-la-network-manager.png",
    "pending": true,
    "notes": null,
    "relations": { "dspIds": [] }
  },
  {
    "id": "sw-la-soundvision-connect",
    "mfr": "la",
    "name": "Soundvision Connect",
    "type": ["Design & Simulation"],
    "platform": null,
    "price": null,
    "img": "public/assets/img/software/la/sw-la-soundvision-connect.png",
    "pending": true,
    "notes": null,
    "relations": { "dspIds": [] }
  },
  {
    "id": "sw-la-l-isa-controller",
    "mfr": "la",
    "name": "L-ISA Controller",
    "type": ["Spatial Audio", "Control & Monitoring"],
    "platform": null,
    "price": null,
    "img": "public/assets/img/software/la/sw-la-l-isa-controller.png",
    "pending": true,
    "notes": null,
    "relations": { "dspIds": [] }
  },
  {
    "id": "sw-la-l-isa-studio",
    "mfr": "la",
    "name": "L-ISA Studio",
    "type": ["Spatial Audio"],
    "platform": null,
    "price": null,
    "img": "public/assets/img/software/la/sw-la-l-isa-studio.png",
    "pending": true,
    "notes": null,
    "relations": { "dspIds": [] }
  },
  {
    "id": "sw-la-source-intelligence",
    "mfr": "la",
    "name": "Source Intelligence",
    "type": ["Signal Processing"],
    "platform": null,
    "price": null,
    "img": "public/assets/img/software/la/sw-la-source-intelligence.png",
    "pending": true,
    "notes": null,
    "relations": { "dspIds": [] }
  }
];
