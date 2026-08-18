# JBL 런타임 대표 이미지 우선순위

기준일: 2026-08-18

- 270개 `img` 경로가 모두 존재하며 디코딩된다.
- 실제 제품 이미지 55개, 공용 `pending.svg` 215개로 실제 이미지 적용률은 20.37%다.
- 실제 이미지 55개를 육안 검토했으며 액세서리 또는 브래킷만 나온 대표 이미지는 없었다.
- 실제 이미지 55개 모두 source manifest의 `product-image` 원본 레코드와 `productIds`로 연결된다.
- 정확한 placeholder ID와 동일 이미지 SHA-256 그룹은 `jbl-runtime-image-audit.json`에 기록했다.

## P0 — 즉시 교체

- `spk-jbl-vtx-a8`: 대표 이미지 아래에 NAMM TEC Winner 배지가 포함되어 있다. 깨끗한 공식 A8 제품 이미지로 교체한다.

## P1 — 투어링·라이브·포터블 placeholder 55개

- SRX900 Series (9)
- VRX900 Series (7)
- PRX900 Series (7)
- PRX400 Series Passive (6)
- SRX800 Series Powered (5)
- SRX800 Series Passive (5)
- EON700 Series (5)
- JRX200 Series (4)
- IRX Series (3)
- EON ONE Series (2)
- Installable Portable PA Speakers (1)
- IRX ONE (1)

VTX 바로 다음의 사용자 노출도가 높은 제품군이므로 설치용 대량 placeholder보다 먼저 교체한다.

## P2 — 나머지 설치용 placeholder 160개

- AWC Compact & AW Series (15)
- PD6000 Series Medium-Format (13)
- Control 20 Series Small Format Ceiling (12)
- Control Contractor 20 Series Surface-Mount Speakers (12)
- CBT Series Passive Controlled-Coverage Columns (9)
- AE Series Entry Level (8)
- AE Series Compact (8)
- Control 10 Series Small Format Ceiling (7)
- Control 300 Series Large-Format Ceiling Speakers (7)
- Control 60 Series Pendant Speakers (7)
- VLA Series Large Format (6)
- PD500 Series Hornloaded Coaxial (5)
- Control Contractor 100 Series In-Wall Speakers (4)
- PD700i Series Large-Format (4)
- 8100 Series Ceiling with Stylized Grille (3)
- Control 200 Series Medium-Format Ceiling Speakers (3)
- Control 80 Series Landscape Speakers (3)
- VLA Series Compact (3)
- Control 50 Series Subwoofer/Satellite Speakers (3)
- 나머지 13개 제품군 28개는 감사 JSON의 `priorityQueue[P2].groups`에서 정확한 ID와 함께 확인한다.

## P3 — 동일 실이미지 재사용 5그룹 검토

- `spk-jbl-lct-81c-t` / `spk-jbl-lct-81c-tm`
- `spk-jbl-control-426c-t` / `spk-jbl-control-426c-t-ls`
- `spk-jbl-control-412c-t` / `spk-jbl-control-412c-t-va`
- `spk-jbl-control-416c-t` / `spk-jbl-control-416c-t-va`
- `spk-jbl-vtx-f35-64` / `spk-jbl-vtx-f35-95`

외형이 같은 변형일 수 있으므로 자동 오류로 처리하지 않는다. LS·VA·지향각 변형의 정확한 공식 이미지가 따로 있는지 확인하고, 재사용할 경우 근거를 manifest에 남긴다.

## P4 — 사용 가능하지만 개선할 이미지

- `spk-jbl-vtx-f12`, `spk-jbl-vtx-f15`, `spk-jbl-vtx-f18s`: 700×460으로 현재 카드 크기에서는 사용 가능하지만 더 큰 공식 원본이 있으면 교체한다.
- `spk-jbl-css8008`, `spk-jbl-css8018`: 폭이 좁은 측면 위주 이미지라 전면 또는 3/4 공식 뷰가 더 대표성이 높다.

## 교체 완료분 재검사

`Control 40CS/T`, `42C`, `45C/T`, `47HC`, `47LP`, `VTX A12W`, `VTX M22`의 최신 대표 이미지는 배지·액세서리-only·브래킷-only 문제가 없고 카드용 대표성도 통과했다.
