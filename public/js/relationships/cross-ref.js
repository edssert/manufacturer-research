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
 * id 목록을 액세서리 {id, name, type} 배열로 변환한다 — 존재하지 않는
 * id(데이터 오타 등)는 조용히 걸러낸다. 스피커/앰프/액세서리의 System
 * Elements·Related Accessories 조회가 전부 이 형태를 쓴다.
 * @param {string[]} ids 액세서리 id 목록
 * @returns {{id:string, name:string, type:string}[]}
 */
export function accessoriesByIds(ids) {
  return (ids || []).map(findAccessoryById).filter(Boolean).map(a => ({ id: a.id, name: a.name, type: a.type }));
}

/**
 * 이 액세서리를 System Elements 로 쓰는 Rack 앰프 목록 (역방향 조회 —
 * amp.rack.relatedAccessoryIds 를 반대로 훑는다).
 * @param {string} accessoryId 액세서리 id (예: "acc-la-pow2")
 * @returns {{id:string, name:string}[]}
 */
export function findAmplifiersUsingAccessory(accessoryId) {
  return AMPLIFIERS
    .filter(a => a.rack && (a.rack.relatedAccessoryIds || []).includes(accessoryId))
    .map(a => ({ id: a.id, name: a.model }));
}

/**
 * 이 스피커가 System Elements 로 쓰는 액세서리 목록
 * (speaker.relations.accessoryIds — 예: K1 의 K1-BUMP/K1-CHARIOT2).
 * @param {string} speakerId 스피커 id (예: "spk-la-k1")
 * @returns {{id:string, name:string, type:string}[]}
 */
export function findAccessoriesForSpeaker(speakerId) {
  const speaker = findSpeakerById(speakerId);
  return accessoriesByIds(speaker && speaker.relations && speaker.relations.accessoryIds);
}

/**
 * 이 액세서리를 쓰는 스피커 목록 — findAmplifiersUsingAccessory 의 스피커 판.
 * @param {string} accessoryId 액세서리 id
 * @returns {{id:string, name:string}[]}
 */
export function findSpeakersUsingAccessory(accessoryId) {
  return SPEAKERS
    .filter(s => (s.relations && s.relations.accessoryIds || []).includes(accessoryId))
    .map(s => ({ id: s.id, name: s.name }));
}

/**
 * 짝을 이루는 다른 액세서리 목록 (예: K-BUMPFLIGHT ↔ K1-BUMP).
 * 짝 관계는 accessory.relatedAccessoryIds 에 양방향으로 기록해 둔다.
 * @param {string} accessoryId 액세서리 id
 * @returns {{id:string, name:string, type:string}[]}
 */
export function findRelatedAccessories(accessoryId) {
  const acc = findAccessoryById(accessoryId);
  return accessoriesByIds(acc && acc.relatedAccessoryIds);
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
 * 이 앰프에 매칭되는 스피커 id 목록.
 * 앰프의 relations.speakerIds(정적 필드, 대부분 미입력)를 믿지 않고 스피커 쪽
 * amps[].model 을 역해석한다 — 스피커 매칭 표와 같은 판정이라 양방향 표시가
 * 어긋나지 않고, 스피커 데이터만 갱신해도 자동으로 최신이 된다.
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
 * 앰프 모달의 "Configurations" 표를 스피커 쪽 데이터에서 역으로 구성한다.
 * 매칭 데이터는 스피커 레코드(amps[].configs)에만 입력한다 — 앰프 쪽에도 같은
 * 사실을 적으면 두 값이 어긋나므로 출처를 하나로 둔다. 행 기준은 앰프
 * 모델이 아니라 스피커 — "이 앰프로 어떤 스피커를 어떤 모드/프리셋으로 몇 대
 * 구동해 몇 dB 를 내는지"를 보여주기 위함.
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
