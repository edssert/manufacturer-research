/**
 * @module relationships/cross-ref
 * 도메인 간 ID 해석 레지스트리.
 * 스피커 ↔ 앰프처럼 서로를 참조해야 하는 도메인들이 데이터 모듈을 직접
 * import 하지 않도록, 각 도메인이 로드 시 자기 데이터를 여기 등록하고
 * 상대 도메인은 find 함수로만 조회한다 (순환 의존 방지).
 */
let AMPLIFIERS = [];
let SPEAKERS = [];
let ACCESSORIES = [];

/**
 * 앰프 데이터 등록 — amplifiers.controller.js 가 로드 시 1회 호출.
 * @param {Object[]} list 전체 앰프 배열
 */
export function registerAmplifiers(list) { AMPLIFIERS = list; }

/**
 * 스피커 데이터 등록 — speakers.controller.js 가 로드 시 1회 호출.
 * @param {Object[]} list 전체 스피커 배열
 */
export function registerSpeakers(list) { SPEAKERS = list; }

/**
 * 액세서리(System Elements) 데이터 등록 — accessories.controller.js 가
 * 로드 시 1회 호출. Rack 타입 앰프(LA-RAK III 등)가 자신의 케이블/리깅
 * 부속품을 id 로 참조할 때 조회한다(amp.rack.relatedAccessoryIds).
 * @param {Object[]} list 전체 액세서리 배열
 */
export function registerAccessories(list) { ACCESSORIES = list; }

/**
 * ID 로 앰프 레코드 조회.
 * @param {string} id 앰프 id (예: "amp-la-la12x")
 * @returns {Object|null}
 */
export function findAmplifierById(id) {
  return AMPLIFIERS.find(a => a.id === id) || null;
}

/**
 * ID 로 스피커 레코드 조회.
 * @param {string} id 스피커 id (예: "spk-la-k2")
 * @returns {Object|null}
 */
export function findSpeakerById(id) {
  return SPEAKERS.find(s => s.id === id) || null;
}

/**
 * ID 로 액세서리(System Elements) 레코드 조회.
 * @param {string} id 액세서리 id (예: "acc-la-pow2")
 * @returns {Object|null}
 */
export function findAccessoryById(id) {
  return ACCESSORIES.find(a => a.id === id) || null;
}

/**
 * 특정 액세서리(System Elements)를 System Elements 로 참조하는 Rack 타입
 * 앰프 목록을 역으로 찾는다. amp.rack.relatedAccessoryIds(앰프 → 액세서리
 * 방향, amplifiers.controller.js relatedAccessoriesOf 가 정방향으로 쓰는
 * 필드)를 반대로 훑어 이 액세서리 id 를 포함하는 앰프를 모은다 — 액세서리
 * 모달에서도 "이 부속품을 어떤 랙 앰프가 쓰는지" 역방향으로 보여주기 위함
 * (사용자 요청, speakers/amplifiers 의 Matched Speakers/Amplifier Matching
 * 양방향 표시와 동일한 취지).
 * @param {string} accessoryId 액세서리 id (예: "acc-la-pow2")
 * @returns {{id:string, name:string}[]} 이 액세서리를 쓰는 앰프 목록
 */
export function findAmplifiersUsingAccessory(accessoryId) {
  return AMPLIFIERS
    .filter(a => a.rack && (a.rack.relatedAccessoryIds || []).includes(accessoryId))
    .map(a => ({ id: a.id, name: a.model }));
}

/**
 * 특정 스피커가 System Elements 로 참조하는 액세서리 목록을 조회한다
 * (스피커 → 액세서리 방향). speaker.relations.accessoryIds(예: K1의
 * K1-BUMP/K1-CHARIOT2 등 리깅/프로텍션 부속품, 사용자 제공 System Elements)
 * 를 실제 {id, name, type} 객체로 변환 — amplifiers.controller.js
 * relatedAccessoriesOf 와 동일한 패턴.
 * @param {string} speakerId 스피커 id (예: "spk-la-k1")
 * @returns {{id:string, name:string, type:string}[]}
 */
export function findAccessoriesForSpeaker(speakerId) {
  const speaker = findSpeakerById(speakerId);
  if (!speaker) return [];
  const ids = (speaker.relations && speaker.relations.accessoryIds) || [];
  return ids.map(id => findAccessoryById(id)).filter(Boolean).map(acc => ({ id: acc.id, name: acc.name, type: acc.type }));
}

/**
 * 특정 액세서리(System Elements)를 System Elements 로 참조하는 스피커
 * 목록을 역으로 찾는다(액세서리 → 스피커 방향). speaker.relations.
 * accessoryIds 를 반대로 훑어 이 액세서리 id 를 포함하는 스피커를 모은다 —
 * findAmplifiersUsingAccessory 의 스피커 버전(액세서리 모달에서 "이
 * 부속품을 어떤 스피커가 쓰는지" 보여주기 위함, 사용자 요청).
 * @param {string} accessoryId 액세서리 id
 * @returns {{id:string, name:string}[]} 이 액세서리를 쓰는 스피커 목록
 */
export function findSpeakersUsingAccessory(accessoryId) {
  return SPEAKERS
    .filter(s => (s.relations && s.relations.accessoryIds || []).includes(accessoryId))
    .map(s => ({ id: s.id, name: s.name }));
}

/**
 * 특정 액세서리와 짝을 이루는 다른 액세서리 목록을 조회한다(액세서리 →
 * 액세서리 방향). 예: K-BUMPFLIGHT(수납 케이스) ↔ K1-BUMP(수납 대상),
 * K1-CHARIOTCOV(커버) ↔ K1-CHARIOT2(카트) — 서로 짝이 되는 부속품을
 * accessory.relatedAccessoryIds 에 양방향으로 기록해두고 그대로 조회한다
 * (findAccessoriesForSpeaker 와 동일한 패턴, 액세서리 모달의 Related
 * Accessories 섹션에서 사용, 사용자 요청).
 * @param {string} accessoryId 액세서리 id
 * @returns {{id:string, name:string, type:string}[]}
 */
export function findRelatedAccessories(accessoryId) {
  const acc = findAccessoryById(accessoryId);
  if (!acc) return [];
  const ids = acc.relatedAccessoryIds || [];
  return ids.map(id => findAccessoryById(id)).filter(Boolean).map(rel => ({ id: rel.id, name: rel.name, type: rel.type }));
}

/**
 * 스피커의 제조사 키 + 원본 앰프 모델 문자열로 실제 앰프 id 를 찾는다.
 * 원본 데이터의 병합 표기("D40 / D80 / D90 / 40D")는 첫 모델로 해석한다.
 * @param {string} mk 제조사 키 ("la" | "db" | "my")
 * @param {string} model 스피커 데이터에 저장된 앰프 모델 문자열
 * @returns {string|null} 앰프 id, 못 찾으면 null
 */
export function resolveAmpIdForModel(mk, model) {
  const hit = AMPLIFIERS.find(a => a.mfr === mk && a.model === model);
  if (hit) return hit.id;
  if (model && model.includes(" / ")) {
    const first = model.split(" / ")[0].trim();
    const hit2 = AMPLIFIERS.find(a => a.mfr === mk && a.model === first);
    if (hit2) return hit2.id;
  }
  return null;
}

/**
 * 특정 앰프를 실제로 매칭하는 스피커 id 목록을 동적으로 계산한다.
 * 앰프 레코드의 `relations.speakerIds`(정적 필드, 현재 미입력)에 의존하지
 * 않고, 스피커 쪽 `amps[].model`을 resolveAmpIdForModel() 로 역해석해
 * 매칭 여부를 판정한다 — 스피커 매칭 표(Amplifier Matching)에 이미 쓰이는
 * 것과 동일한 판정 로직이라 두 방향(스피커→앰프, 앰프→스피커)의 "클릭
 * 가능/매칭됨" 표시가 항상 일치한다. 스피커 데이터가 갱신돼도 별도 동기화
 * 없이 항상 최신 상태를 반영한다.
 * @param {string} ampId 앰프 id (예: "amp-la-la1dot16i")
 * @returns {string[]} 매칭되는 스피커 id 배열
 */
export function findSpeakersMatchingAmp(ampId) {
  const amp = findAmplifierById(ampId);
  if (!amp) return [];
  return SPEAKERS
    .filter(s => (s.amps || []).some(a => resolveAmpIdForModel(s.mk, a.model) === ampId))
    .map(s => s.id);
}

/**
 * 특정 앰프의 "Configurations" 표(모드별 Links/ch·Max/amp·Preset·Max SPL)를
 * 스피커 쪽 매칭 데이터에서 역으로 구성한다. 앰프 자체 필드(a.configs)는
 * L-Acoustics 신형 앰프(LA1.16i 등)에 아직 입력되지 않은 경우가 많은데,
 * 같은 정보가 스피커의 amps[].configs(스피커 매칭 표 · ampMatchingHTML 이
 * 쓰는 원본, splByPreset 의 프리셋별 SPL 포함)에 이미 존재하므로 중복 입력
 * 없이 그대로 재사용한다 — SPL 도 스피커 매칭 표와 동일하게 프리셋별로
 * 펼쳐서 포함(빠뜨리지 않음). 왼쪽 열이 앰프 모델명이 아니라 "이 앰프로
 * 어떤 스피커를 어떤 모드/프리셋으로 몇 대 구동해 몇 dB 를 내는지"를
 * 보여주도록 스피커 이름을 기준으로 행을 만든다.
 * @param {string} ampId 앰프 id
 * @returns {{speakerId:string, speakerName:string, mode:string, preset:string|null, perCh:number|null, total:number|null, spl:number|null}[]}
 */
export function findAmpConfigsBySpeaker(ampId) {
  const amp = findAmplifierById(ampId);
  if (!amp) return [];
  const rows = [];
  SPEAKERS.forEach(s => {
    (s.amps || []).forEach(a => {
      if (resolveAmpIdForModel(s.mk, a.model) !== ampId) return;
      (a.configs || []).forEach(c => {
        const byPreset = c.splByPreset ? c.splByPreset.filter(p => p.spl != null) : null;
        if (byPreset && byPreset.length) {
          byPreset.forEach(p => {
            rows.push({ speakerId: s.id, speakerName: s.name, mode: c.mode || "", preset: p.preset, perCh: c.perCh != null ? c.perCh : null, total: c.total != null ? c.total : null, spl: p.spl });
          });
        } else {
          rows.push({ speakerId: s.id, speakerName: s.name, mode: c.mode || "", preset: null, perCh: c.perCh != null ? c.perCh : null, total: c.total != null ? c.total : null, spl: c.spl != null ? c.spl : null });
        }
      });
    });
  });
  return rows;
}
