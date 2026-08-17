/**
 * @module domains/amplifiers/view
 * 앰프 카드 + 상세 모달 마크업 생성 (순수 함수 모음).
 *
 * 관련 CSS: css/components/card.css, css/components/spec-table.css
 */
import { esc, getViews } from "../../core/dom.js";
import { configurationsBySpeakerTableHTML } from "./amplifiers.configurations.js";
import { AMP_MFR } from "./amplifiers.schema.js";

/* ── Total Watt 게이지 스케일 — speakers.view.js 의 SPL_RANGE/setSplRange/
   splPct 와 동일한 패턴을 재사용해 스피커 탭의 SPL 바와 같은 시각 언어로
   앰프의 총 출력을 카드에서 한눈에 비교할 수 있게 한다.
   Rack 앰프(LA-RAK III/II AVB)는 채널당 4Ω 정격이 없어
   8Ω/2.7Ω 기준 총량(62,400W/40,000W)을 대신 쓰는데, 이 값이 일반 앰프의
   4Ω 기준 값(최대 17,600W)보다 훨씬 커서 같은 스케일이면 일반 앰프 바가
   전부 짧아 보인다 — Rack 과 일반 앰프(Standalone)를 별도 스케일로 분리. */
const WATT_RANGE = { lo: 0, hi: 0 };
const WATT_RANGE_RACK = { lo: 0, hi: 0 };

/**
 * Total Watt 게이지의 표시 범위를 설정한다 — amplifiers.controller.js 가
 * 빌드 시 호출.
 * @param {number} lo 데이터 최저 총 와트(4Ω 기준)
 * @param {number} hi 데이터 최고 총 와트(4Ω 기준)
 */
export function setWattRange(lo, hi) { WATT_RANGE.lo = lo; WATT_RANGE.hi = hi; }

/**
 * Rack 타입 앰프 전용 Total Watt 게이지 표시 범위를 설정한다.
 * @param {number} lo
 * @param {number} hi
 */
export function setRackWattRange(lo, hi) { WATT_RANGE_RACK.lo = lo; WATT_RANGE_RACK.hi = hi; }

/**
 * 와트 값 → 게이지 채움 비율(%) (최소 4% 보장으로 항상 보이게).
 *
 * **min-max 상대비교가 아니라 0 기준 절대비교(v/hi)다.** 최저~최고를 0~100%
 * 로 매핑하면 LA2Xi(2560W)처럼 그룹 내 최저값에 가까운 앰프가 결코 작지 않은
 * 출력인데도 게이지가 텅 빈 것처럼 보인다. hi 는 그룹별 최고 총 와트라 새
 * 앰프가 추가되면 스케일이 자동으로 맞춰진다.
 */
const wattPctFrom0 = (v, range) => Math.max(4, Math.min(100, (v / (range.hi || 1)) * 100));
const wattPct = v => wattPctFrom0(v, WATT_RANGE);
const rackWattPct = v => wattPctFrom0(v, WATT_RANGE_RACK);

/**
 * 카드 와트 게이지에 표시할 총 와트.
 *
 * **기준 임피던스가 앰프마다 다르다** — 이름에 4Ω 를 넣지 않은 이유다.
 * 대부분은 4Ω 채널당 정격("16 x 160 W")을 채널 수와 곱한 값이지만, 채널당
 * 정격이 없는 LA-RAK 계열은 제조사 총합 원문(8Ω·2.7Ω 기준)을 그대로 쓴다.
 * 그래서 이 값에 "@4Ω" 같은 라벨을 붙이면 랙에서 틀린 표기가 된다 — 기준
 * 임피던스는 카드 Output 칸의 배지가 각 앰프의 실제 값으로 보여준다.
 * 랙과 일반 앰프는 게이지 스케일도 분리돼 서로 비교되지 않는다.
 *
 * **주의: 단순 곱셈이라 모든 채널을 동시에 그 값으로 구동 가능한지는 보장하지
 * 않는다**(파워서플라이 정격 등). 참고용 비교 지표라는 전제. 검증된 공식 Total
 * 값을 가진 앰프가 확인되면 output.powerTotal 을 우선하도록 바꿀 것.
 * @param {Object} a 앰프 레코드
 * @returns {number|null} 게이지용 총 와트 (기준 임피던스는 앰프마다 다름)
 */
export function gaugeTotalWatt(a) {
  const raw = output4OhmRaw(a);
  if (raw) {
    const m = String(raw).match(/(\d+(?:\.\d+)?)\s*x\s*(\d+(?:\.\d+)?)/i);
    if (m) return parseFloat(m[1]) * parseFloat(m[2]);
  }
  // LA-RAK 계열 폴백 — 총합 원문("Up to 62,400 W at 8 ohms")의 숫자를 쓴다.
  const total = a.output && a.output.powerTotal;
  if (total) {
    const m = String(total).replace(/,/g, "").match(/(\d+(?:\.\d+)?)\s*W/i);
    if (m) return parseFloat(m[1]);
  }
  return null;
}

/**
 * output.power4ohms(없으면 powerByOhm 의 "4 Ω" 항목)에서 원본 문자열을
 * 그대로 읽는다 — gaugeTotalWatt(게이지용 숫자)과 output4OhmLabel(카드
 * 표기용 문자열)이 같은 원본을 공유하도록 분리한 헬퍼.
 * @param {Object} a 앰프 레코드
 * @returns {string|null}
 */
function output4OhmRaw(a) {
  const output = a.output || {};
  let raw = output.power4ohms;
  if (!raw && output.powerByOhm) {
    const hit = output.powerByOhm.find(p => p.ohm.replace(/\s/g, "").startsWith("4Ω"));
    if (hit) raw = hit.power;
  }
  return raw || null;
}

/**
 * 카드 Output 칸의 "4Ω 기준" 채널당 스펙 표기.
 * powerTotal 은 앰프마다 표기 임피던스가 2.7Ω/4Ω/8Ω 로 제각각이라 카드에서
 * 비교가 안 된다 — 항상 4Ω 값으로 통일한다.
 * @param {Object} a 앰프 레코드
 * @returns {string|null} 예: "4 x 3300 W(4Ω)" — 4Ω 데이터가 없으면 null
 */
function output4OhmLabel(a) {
  const raw = output4OhmRaw(a);
  return raw ? `${raw}(4Ω)` : null;
}

/**
 * 출력 문자열을 {value, impedance} 로 분리한다.
 * 두 형식을 모두 파싱한다 — 괄호형("16 x 1100 W(4Ω)")과, powerTotal 로 폴백할
 * 때 나오는 "at N ohms" 형("Up to 62,400 W at 8 ohms").
 * @param {Object} a 앰프 레코드
 * @returns {{value:string, impedance:string|null}}
 */
function outputParts(a) {
  const label = output4OhmLabel(a) || (a.output && a.output.powerTotal) || null;
  if (!label) return { value: "—", impedance: null };
  const paren = String(label).match(/^(.*?)\(([^)]+)\)\s*$/);
  if (paren) return { value: paren[1], impedance: paren[2] };
  const atOhms = String(label).match(/^(?:up to\s+)?(.*?)\s+at\s+([\d.]+)\s*ohms?\s*$/i);
  // "Up to " 접두사는 생략 — 다른 앰프도 이미 최고치 기준 표기라 중복이다.
  if (atOhms) return { value: atOhms[1], impedance: `${atOhms[2]}Ω` };
  return { value: label, impedance: null };
}

/**
 * 이름 옆 Connectivity 태그 — 스피커 카드의 titleTagsHTML 과 같은 자리·역할.
 * 스피커 카드가 4단(이름+태그 / 로우 배지 / SPL 게이지 / stats)인데 앰프는
 * 3단뿐이라 카드 높이가 어긋났고, 이 줄이 그 리듬을 맞춘다.
 * Type 은 카드에서 제외한다 — 이름이 이미 타입을 암시하고(LA1.16i) 태그 줄만
 * 길어진다.
 * @param {Object} a 앰프 레코드
 * @param {string} wrapClass 감싸는 div 클래스
 * @param {string} tagClass 태그 span 클래스
 * @returns {string}
 */
function ampTagsHTML(a, wrapClass, tagClass) {
  const tags = [...(a.connectivity || [])];
  if (!tags.length) return "";
  return `<div class="${wrapClass}">${tags.map(t => `<span class="${tagClass}">${esc(t)}</span>`).join("")}</div>`;
}

/**
 * 카드 전용 축약 모델명 — " AVB" 접미사를 뗀다.
 * "LA-RAK II AVB"는 태그 3개와 함께 좁은 카드에서 "LA-RAK II A..." 로 잘린다.
 * 프로토콜은 이름 옆 태그에 "Milan-AVB"로 이미 있어 정보 손실이 없다.
 * a.model 원본과 모달 제목은 영향받지 않는다.
 * @param {string} model 앰프 model 값
 * @returns {string}
 */
function cardModelLabel(model) {
  return model.replace(/\s+AVB$/, "");
}

/**
 * 카드 전용 축약 Architecture — 핵심 수치("4 x 4") 뒤의 부가 설명을 뗀다.
 * "with bridge modes"·"(48 channels of amplification)" 이 붙으면 좁은
 * stat-grid 칸에서 잘린다. 모달 표는 원본을 그대로 쓴다.
 * @param {string} architecture a.architecture 값
 * @returns {string}
 */
function cardArchitectureLabel(architecture) {
  return architecture
    .replace(/\s+with bridge modes?$/i, "")
    .replace(/\s*\([^)]*\)\s*$/, "");
}

/**
 * 앰프 카드 1장.
 *
 * 정보 우선순위는 "이 앰프로 무엇을 할 수 있는가"(실사용 스펙) — 스피커 카드와
 * 같은 원칙이다. "몇 개 스피커와 호환되는가"는 매칭 데이터가 갱신될 때마다
 * 바뀌는 부가 지표라 카드가 아니라 모달에 둔다. 대신 앰프 자체 스펙인 채널
 * 수를 노출한다.
 * @param {Object} a 앰프 레코드
 * @returns {string} .card 마크업
 */
export function cardHTML(a) {
  const M = AMP_MFR[a.mfr], color = M.color;
  // 카드 요약은 Architecture/Output 2칸. Usage 는 값이 길어 말줄임되고 모달
  // Type 태그로도 확인되므로 뺐고, Channels 는 Architecture 앞 숫자에 이미
  // 담겨 중복이라 뺐다.
  // 강조 값은 전역 accent 가 아니라 제조사 색(--mfr) — speakers 탭과 같은 원칙.
  const out = outputParts(a);
  const statsBlock = `<div class="stat-grid stat-grid--amp-2col">
      <div class="stat-grid__cell"><span class="stat-grid__key">Architecture</span><span class="stat-grid__value stat-grid__value--mfr">${a.architecture ? esc(cardArchitectureLabel(a.architecture)) : "—"}</span></div>
      <div class="stat-grid__cell"><span class="stat-grid__key">Output${out.impedance ? `<span class="stat-grid__key-badge">${esc(out.impedance)}</span>` : ""}</span><span class="stat-grid__value">${esc(out.value)}</span></div>
    </div>`;
  // 1U 랙마운트 앰프는 실물이 매우 가로로 길어(LA1.16i 약 10.6:1) 기본
  // max-width 80% 를 쓰면 max-height 보다 폭 제약이 먼저 걸려 렌더 높이가
  // 지나치게 얇아진다 — card__img--wide 로 폭만 94% 로 넓혀 세로 리듬은
  // 다른 카드와 맞춘 채 가로로 크게 보이게 한다.
  // 뷰가 2개 이상이면 스피커 카드와 같은 호버 크로스페이드.
  const views = getViews(a);
  const media = views.length
    ? (views.length > 1
        ? `<img class="card__img card__img--front card__img--wide" loading="lazy" src="${views[0].src}" alt="${esc(a.model)}"><img class="card__img card__img--back card__img--wide" loading="lazy" src="${views[1].src}" alt="${esc(a.model)} ${esc(views[1].label)}">`
        : `<img class="card__img card__img--wide" loading="lazy" src="${views[0].src}" alt="${esc(a.model)}">`)
    : `<div class="card__noimg">⚡</div>`;
  const nameTags = ampTagsHTML(a, "card__name-tags", "card__name-tag");
  // 스피커 탭의 SPL 바와 같은 시각 언어로 4Ω 기준 Total Watt 게이지를 그린다.
  // 값이 없으면 게이지 0% + "—"(레이아웃은 유지).
  // 미터에는 임피던스를 안 붙인다 — 바로 아래 Output 칸의 배지가 이미 표시한다.
  // Rack 앰프는 8Ω/2.7Ω 기준 총량이라 4Ω 기준값과 섞이면 비교가 왜곡된다 —
  // 별도 스케일(WATT_RANGE_RACK)을 쓰고 --rack 변경자로 바 색도 달리해 "다른
  // 기준"임을 드러낸다.
  const isRack = a.type === "Rack";
  const watt4 = gaugeTotalWatt(a);
  const wattPercent = watt4 == null ? 0 : (isRack ? rackWattPct(watt4) : wattPct(watt4));
  const wattMeter = `<div class="spl-meter${isRack ? " spl-meter--rack" : ""}"><div class="spl-meter__track"><div class="spl-meter__fill" style="width:${wattPercent}%"></div></div><div class="spl-meter__value">${watt4 != null ? watt4 : "—"}<small>W</small></div></div>`;
  return `<article class="card" style="--mfr:${color}" tabindex="0" data-id="${a.id}" role="button" aria-label="${esc(a.model)} 상세">
    <div class="card__media">${media}</div>
    <div class="card__body card__body--amp">
      <div class="eyebrow"><span class="eyebrow__brand">${esc(M.short)}</span> · ${esc(a.powerClass || "")}</div>
      <div class="card__name-row">
        <div class="card__name">${esc(cardModelLabel(a.model))}</div>
        ${nameTags}
      </div>
      ${wattMeter}
      <div class="card__stats">${statsBlock}</div>
    </div>
  </article>`;
}

/**
 * 사양 표 행 1개.
 *
 * **값이 없어도 행을 생략하지 않고 "—" 를 넣는다** — 스피커 쪽 specRow 와
 * 반대다. d&b 와 L-Acoustics 가 서로 다른 필드를 채워둬서, 생략하면 브랜드마다
 * 모달의 행 구성이 달라 보인다. 양식을 데이터 유무와 무관하게 고정한다.
 * @param {string} label 항목명
 * @param {*} val 값 (없으면 "—" 로 표시)
 * @param {boolean} [full] true 면 2열 전체 폭 사용
 */
function specRow(label, val, full) {
  const hasVal = val != null && String(val).trim() !== "";
  return `<div class="spec-table__cell${full ? ' spec-table__cell--full' : ''}"><div class="spec-table__key">${esc(label)}</div><div class="spec-table__value${hasVal ? '' : ' spec-table__value--na'}">${hasVal ? esc(val) : "—"}</div></div>`;
}

/**
 * 상세 스펙 섹션 1개 HTML — 제목(section-label) + spec-table.
 * rows 가 전부 빈 문자열(specRow 가 값 없어 생략한 경우)이면 섹션 자체를
 * 통째로 생략한다 — d&b 등 이 필드들이 없는 앰프에서 빈 제목만 남지 않게.
 * @param {string} title 섹션 제목
 * @param {string} rows specRow() 등으로 만든 spec-table__cell 마크업들의 연결
 * @returns {string}
 */
function detailSection(title, rows) {
  if (!rows || !rows.trim()) return "";
  return `<p class="section-label" style="margin-top:20px">${esc(title)}</p><div class="spec-table">${rows}</div>`;
}

/**
 * features(문자열 배열)를 칩 형태로 렌더링.
 * @param {string[]} list
 * @returns {string}
 */
function featureChips(list) {
  if (!list || !list.length) return "";
  return `<div class="chip-group">${list.map(f => `<span class="chip" style="cursor:default">${esc(f)}</span>`).join("")}</div>`;
}

/**
 * 배지(짧은 라벨) + 값 쌍의 목록을 스피커 모달의 Frequency Response와 같은
 * freq-list 그리드로 렌더링한다. Latency Standard/Low 처럼 같은 항목의
 * 서로 다른 모드를 한 셀 안에 나란히 묶어 보여줄 때 쓴다(각각 별도 행으로
 * 흩어놓지 않음). 값이 있는 항목만 표시하고, 전부 없으면 빈 문자열 반환.
 * @param {{label:string, value:*}[]} items
 * @returns {string} spec-table__value 안에 넣을 freq-list 마크업 (없으면 "")
 */
function badgeListHTML(items) {
  const rows = items.filter(it => it.value != null && String(it.value).trim() !== "")
    .map(it => `<div class="freq-list__row"><span class="freq-badge freq-badge--auto">${esc(it.label)}</span><span class="freq-list__val">${esc(it.value)}</span></div>`)
    .join("");
  return rows ? `<div class="freq-list">${rows}</div>` : "";
}

/**
 * label/value 쌍 배열(예: a.rack.content)을 spec-table 행들로 렌더링한다.
 * Rack 전용 필드들(content/audioDistribution/powerDistribution/cables)이
 * 모두 이 { label, value } 배열 형태를 공유하므로 공통 헬퍼로 뺐다.
 * @param {{label:string, value:string}[]} items
 * @returns {string} specRow 들의 연결 (항목 없으면 "")
 */
function rackRowsHTML(items) {
  if (!items || !items.length) return "";
  return items.map(it => specRow(it.label, it.value, true)).join("");
}

/**
 * 랙의 System Elements(액세서리)를 Type 별로 묶어 클릭 가능한 칩으로 렌더링.
 * 조회는 controller 가 미리 해 {id, name, type} 배열로 넘긴다 — view 는
 * cross-ref 를 직접 참조하지 않는 순수 함수를 유지한다.
 * 모달 최상단(General 위)에 접힌 토글로 둔다 — 클릭 배선은 공통
 * wireSectionToggle 이 처리하므로 마크업만 그 패턴에 맞추면 된다.
 * @param {{id:string, name:string, type:string}[]} accessories
 * @returns {string} 섹션 마크업 (없으면 "")
 */
function systemElementsHTML(accessories) {
  if (!accessories || !accessories.length) return "";
  const groups = new Map();
  accessories.forEach(acc => {
    const key = acc.type || "Other";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(acc);
  });
  const groupsHTML = [...groups.entries()].map(([type, items]) => `
    <div class="system-elements__group">
      <div class="system-elements__group-label">${esc(type)}</div>
      <div class="chip-group">
        ${items.map(acc => `<button type="button" class="chip" data-accessory-id="${esc(acc.id)}">${esc(acc.name)}</button>`).join("")}
      </div>
    </div>`).join("");
  return `<button type="button" class="section-label section-label--toggle" data-section-toggle="amp-system-elements" aria-expanded="false">System Elements<span class="section-label__arrow">▸</span></button><div data-section-toggle-body="amp-system-elements" hidden>${groupsHTML}</div>`;
}

/**
 * Rack 타입 앰프(LA-RAK III 등) 전용 모달 body.
 *
 * 개별 앰프와 데이터 우선순위가 근본적으로 달라 별도 함수다 — 랙은 "안에 무엇이
 * 들어있는가"(Content)가 최우선이고 그다음이 배전·케이블·물리·리깅이다. 개별
 * 앰프의 DSP/Ecosystem 섹션은 랙에 해당 없어(a.dsp/a.io 가 null) 등장하지 않는다.
 * @param {Object} a 앰프 레코드 (a.type === "Rack")
 * @param {string} media 이미지 마크업 (modalBodyHTML 에서 공통 생성해 전달)
 * @param {Object} physicalRowsExtra 물리 스펙 spec-table 행 문자열 (weight/dims 포함, modalBodyHTML 과 공유)
 * @param {{id:string, name:string, type:string}[]} relatedAccessories 연관 System Elements (controller 가 findAccessoryById 로 조회해 전달)
 * @returns {string} modal__body 마크업
 */
function rackBodyHTML(a, media, physicalRowsExtra, relatedAccessories) {
  const rack = a.rack || {};
  const generalRows = [
    specRow("Architecture", a.architecture, true),
    specRow("Output Power", a.output && a.output.powerTotal, true),
    specRow("Power Requirements", a.mains && a.mains.powerRequirements, true),
    specRow("Connectivity", (a.connectivity || []).join(" · "), true),
    specRow("Network", rack.network),
    specRow("Usage", a.usage),
  ].join("");

  const contentRows = rackRowsHTML(rack.content);
  const powerRows = rackRowsHTML(rack.powerDistribution);
  const audioRows = rackRowsHTML(rack.audioDistribution);
  const cableRows = rackRowsHTML(rack.cables);

  return `${media}
    <div class="modal__body">
      ${systemElementsHTML(relatedAccessories)}
      ${a.notes ? `<p class="modal__notes modal__notes--after-toggle">${esc(a.notes)}</p>` : ""}
      <p class="section-label">General</p>
      <div class="spec-table">
        ${generalRows}
      </div>
      ${detailSection("Content", contentRows)}
      ${detailSection("Power Distribution", powerRows)}
      ${detailSection("Audio Distribution", audioRows)}
      ${detailSection("Cables", cableRows)}
      ${a.features && a.features.length ? `<p class="section-label" style="margin-top:20px">Features</p>${featureChips(a.features)}` : ""}
      ${detailSection("Physical", physicalRowsExtra)}
      ${rack.rigging ? `<p class="section-label" style="margin-top:20px">Rigging & Handling</p><div class="spec-table">${specRow("Storage & Transportation", rack.rigging, true)}</div>` : ""}
    </div>`;
}

/**
 * 앰프 상세 모달의 head/body 마크업을 생성한다.
 * 매칭 스피커 칩에는 data-speaker-id 가 붙는다 — 클릭 → Split View 연결은
 * controller 가 담당 (앰프 → 스피커 방향).
 * @param {Object} a 앰프 레코드
 * @param {Function|null} resolveSpeakerName (speakerId) => 표시 이름
 * @param {string[]} [speakerIds] 매칭 스피커 id 목록. 미지정 시
 *   a.relations.speakerIds 로 폴백하지만 그 정적 필드는 대부분 비어 있다 —
 *   controller 가 cross-ref.findSpeakersMatchingAmp() 로 계산해 넘길 것.
 * @param {Object[]} [configsBySpeaker] Configurations 표의 원본 행
 *   (cross-ref.findAmpConfigsBySpeaker 가 스피커 쪽 데이터에서 역산). 매칭
 *   데이터는 스피커 레코드에만 입력하므로 이게 유일한 출처다.
 * @param {{id:string, name:string, type:string}[]} [relatedAccessories]
 *   Rack 앰프의 System Elements — controller 가 미리 조회해 전달.
 * @returns {{color: string, head: string, body: string}}
 */
export function modalBodyHTML(a, resolveSpeakerName, speakerIds, configsBySpeaker, relatedAccessories) {
  const M = AMP_MFR[a.mfr], color = M.color;
  const views = getViews(a);
  const viewSlug = label => label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  // 1U 랩마운트 앰프(LA1.16i 등)는 실물 비율이 매우 가로로 길어 기본
  // max-width 74% 를 쓰면 세로 크기가 지나치게 얇아진다 — card__img--wide
  // 와 동일한 이유로 modal__img--wide 변경자를 둬서 max-width 만 넓힌다.
  const media = views.length
    ? (views.length > 1
        ? `<div class="modal__media-wrap">
            <div class="modal__media">
              ${views.map((v, i) => `<img class="modal__img modal__img--wide" data-view="${viewSlug(v.label)}" src="${v.src}" alt="${esc(a.model)} ${esc(v.label)}" loading="lazy" decoding="async"${i === 0 ? "" : " hidden"}>`).join("")}
            </div>
            <div class="modal__view-switch" role="group" aria-label="이미지 보기 선택">
              ${views.map((v, i) => `<button type="button" class="modal__view-btn${i === 0 ? " is-active" : ""}" data-view-switch="${viewSlug(v.label)}">${esc(v.label)}</button>`).join("")}
            </div>
          </div>`
        : `<div class="modal__media"><img class="modal__img--wide" src="${views[0].src}" alt="${esc(a.model)}"></div>`)
    : "";
  const head = `<div class="modal__head">
      <div class="eyebrow"><span class="eyebrow__brand" style="color:${color}">${esc(M.name)}</span> · ${esc(a.powerClass || "")}</div>
      <div class="modal__title">${esc(a.model)}</div>
      <button class="modal__close" data-modal-close aria-label="닫기"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    </div>`;
  // 상세 스펙의 mains/io/output/dsp/ecosystem 등은 선택 필드다.
  // detailSection()이 빈 rows는 섹션째로 생략하므로, 필드가 없는
  // 앰프의 모달에는 자연스럽게 General/Configurations/Matched Speakers만
  // 남고 나머지 섹션은 나타나지 않는다.
  const mains = a.mains || {};
  const io = a.io || {};
  const output = a.output || {};
  const dsp = a.dsp || {};
  const eco = a.ecosystem || {};
  const note = a.note || {};

  // 섹션 순서는 실사용 중요도순이다 — General(이 앰프가 무엇인가) → Matched
  // Speakers·Configurations(가장 자주 보는 정보) → Mains → Connections &
  // Output → DSP → Ecosystem → Features → Notes → Physical(설치용 참고).
  // 묶는 기준 세 가지:
  //   - General 은 "무엇인가"(채널·파워클래스·타입·용도)만. IP 등급·랙유닛·
  //     무게·냉각·동작온도는 설치 때나 보는 스펙이라 Physical 로 내린다.
  //   - 입력/출력을 나누지 않고 Connections & Output 하나로 — 실사용에선
  //     "이 앰프의 연결·출력 스펙"으로 함께 본다. Connectivity 도 여기로.
  //   - Power Supply·External DSP Backup 은 전원 스펙이라 Mains 로.
  // output.channels 는 General 의 Channels 와 같은 값이라 쓰지 않는다.
  const generalRows = [
    specRow("Channels", a.channels != null ? a.channels + "ch" : null),
    specRow("Power Class", a.powerClass),
    specRow("Type", a.type),
    specRow("Usage", a.usage),
  ].join("");

  // Weight/Dimensions — speakers.view.js weightDimsIpRow 와 같은 kg/lb·mm/in
  // 토글 패턴. 버튼 배선은 ui/pane-interactions.js 의 wireDimsUnitSwitch/
  // wireWeightUnitSwitch 가 data-attribute 로 공통 처리하므로 마크업만 맞추면 된다.
  const weightLbCalc = a.weight != null ? (a.weightLb != null ? a.weightLb : Math.round(a.weight * 2.20462)) : null;
  const weightCell = a.weight != null ? `<div class="spec-table__key-row">
        <div class="spec-table__key">Weight</div>
        <div class="dims-unit-switch" role="group" aria-label="무게 단위 선택">
          <button type="button" class="dims-unit-btn is-active" data-weight-unit="kg">kg</button>
          <button type="button" class="dims-unit-btn" data-weight-unit="lb">lb</button>
        </div>
      </div>
      <div class="spec-table__value" data-weight-kg>${esc(a.weight + " kg")}</div>
      <div class="spec-table__value" data-weight-lb hidden>${esc(weightLbCalc + " lb")}</div>` : `<div class="spec-table__key">Weight</div><div class="spec-table__value spec-table__value--na">—</div>`;
  const dims = a.dimensions || {};
  const dimsCell = (dims.mm || dims.in) ? `<div class="spec-table__key-row">
        <div class="spec-table__key">Dimensions</div>
        <div class="dims-unit-switch" role="group" aria-label="치수 단위 선택">
          <button type="button" class="dims-unit-btn is-active" data-dims-unit="mm">mm</button>
          <button type="button" class="dims-unit-btn" data-dims-unit="in">in</button>
        </div>
      </div>
      <div class="spec-table__value" data-dims-mm>${esc(dims.mm || "—")}</div>
      <div class="spec-table__value" data-dims-in hidden>${esc(dims.in || "—")}</div>` : `<div class="spec-table__key">Dimensions</div><div class="spec-table__value spec-table__value--na">—</div>`;

  const physicalRows = [
    specRow("IP Rating", a.ipRating),
    specRow("Rack Unit", a.rackUnit != null ? a.rackUnit + "U" : null),
    specRow("Cooling", a.cooling),
    specRow("Operating Temp", a.operatingTemp),
    `<div class="spec-table__cell spec-table__cell--full"><div class="spec-table__tri" style="grid-template-columns:1fr 1fr"><div>${dimsCell}</div><div>${weightCell}</div></div></div>`,
    specRow("Material", a.material, true),
    specRow("Rigging & Handling", a.rigging, true),
  ].join("");

  const mainsRows = [
    specRow("Rating", mains.rating),
    specRow("Connector", mains.connector),
    specRow("Power Supply", a.powerSupply),
    specRow("External DSP Backup", a.externalDspBackup),
    specRow("Power Requirements", mains.powerRequirements, true),
  ].join("");

  // Connections & Output — 입력 연결(Connectivity/Analog/AES/Network)과
  // 출력 스펙(Connectors/Impedance/Power)을 한 섹션에 모은다. output.channels
  // 는 General 의 Channels 와 값이 항상 같아 제거했다(중복 정보 생략).
  // output.powerByOhm(예: LA12X — 2.7Ω/4Ω/8Ω 3가지 임피던스)이 있으면
  // 스피커 도메인의 wattByBand(LF/MF/HF 배지+값 리스트)와 동일한 패턴으로
  // badgeListHTML 을 재사용해 임피던스별 출력을 한 셀에 나란히 보여준다.
  // 기존 2임피던스(power8ohms/power4ohms)만 있는 앰프(LA1.16i 등)는 이
  // 필드가 없으므로 기존 개별 행 방식 그대로 유지된다.
  const powerByOhmList = badgeListHTML((output.powerByOhm || []).map(p => ({ label: p.ohm, value: p.power })));
  const ioRows = [
    specRow("Connectivity", (a.connectivity || []).join(" · "), true),
    specRow("Analog In", io.analogIn),
    specRow("AES In", io.aesIn),
    specRow("Network Audio", io.networkAudio),
    specRow("Network Redundancy", io.networkRedundancy),
    specRow("Connections", io.connections, true),
    specRow("Output Connectors", output.connectors),
    specRow("Min Impedance", output.minImpedance),
    specRow("Total Power", output.powerTotal),
    `<div class="spec-table__cell spec-table__cell--full"><div class="spec-table__key">Output Power (All Channels Loaded)</div><div class="spec-table__value${powerByOhmList ? '' : ' spec-table__value--na'}">${powerByOhmList || "—"}</div></div>`,
    specRow("Power @8Ω", output.power8ohms),
    specRow("Power @4Ω", output.power4ohms),
    specRow("Power BTL @8Ω", output.powerBtl8ohms),
    specRow("Max Voltage", output.maxVoltage),
    specRow("Max Current", output.maxCurrent),
    specRow("GPIO", a.gpio),
  ].join("");

  // Latency Standard/Low 와 Sample Rate Internal/AES In/Network In 모두
  // Frequency Response(-3dB/-6dB/-10dB)와 같은 방식으로 "모드 배지 + 값"을
  // 한 셀에 나란히 묶는다(badgeListHTML). Sample Rate 는 값이 길어 배지
  // 폭이 자동(freq-badge--auto)이라도 한 줄에 다 안 들어갈 수 있으므로
  // 병합 셀(--full)에 넣어 폭을 넉넉히 확보한다.
  const latencyList = badgeListHTML([
    { label: "Standard", value: dsp.latencyStandard },
    { label: "Low", value: dsp.latencyLow },
  ]);
  const sampleRateList = badgeListHTML([
    { label: "Internal", value: dsp.sampleRateInternal },
    { label: "AES In", value: dsp.sampleRateAesIn },
    { label: "Network In", value: dsp.sampleRateNetworkIn },
  ]);
  // 값이 하나도 없어도 "Sample Rate"/"Latency" 행 자체는
  // 항상 렌더링(brandconsistency) — specRow 와 동일하게 "—"로 표시.
  const dspRows = [
    specRow("Engine", dsp.engine),
    `<div class="spec-table__cell spec-table__cell--full"><div class="spec-table__key">Sample Rate</div><div class="spec-table__value${sampleRateList ? '' : ' spec-table__value--na'}">${sampleRateList || "—"}</div></div>`,
    specRow("Bit Depth", dsp.bitDepth),
    specRow("Routing", dsp.routing),
    specRow("EQ Specs", dsp.eqSpecs, true),
    specRow("Preset Library", dsp.presetLibrary),
    `<div class="spec-table__cell"><div class="spec-table__key">Latency</div><div class="spec-table__value${latencyList ? '' : ' spec-table__value--na'}">${latencyList || "—"}</div></div>`,
    specRow("Delay Setting", dsp.delaySetting),
    specRow("Dynamic Range", dsp.dynamicRange),
  ].join("");

  const ecoRows = [
    specRow("Control Software", eco.controlSoft),
    specRow("Integrations", (eco.integrations || []).join(" · ")),
  ].join("");

  const noteRows = [
    specRow("Model Type", note.modelType, true),
    specRow("Channel Processing", note.channelProcessing, true),
    specRow("Protection", note.protection, true),
    specRow("Interface", note.interface, true),
  ].join("");

  // Matched Speakers·Configurations 는 General 바로 아래 — pane2 로 스피커를
  // 오가며 가장 자주 쓰는 정보라 스크롤 없이 바로 닿아야 한다.
  // a.notes(문장형 서술)는 카드가 아니라 여기 General 표 위에 둔다.
  // Rack 은 데이터 우선순위가 근본적으로 달라 body 를 통째로 별도 렌더링하고
  // head/media 만 공유한다.
  if (a.type === "Rack") {
    return { color, head, body: rackBodyHTML(a, media, physicalRows, relatedAccessories) };
  }

  const body = `${media}
    <div class="modal__body">
      ${a.notes ? `<p class="modal__notes">${esc(a.notes)}</p>` : ""}
      <div class="spec-table">
        ${generalRows}
      </div>
      <button type="button" class="section-label section-label--toggle" style="margin-top:20px" data-section-toggle="amp-configs" aria-expanded="false">Configurations<span class="section-label__arrow">▸</span></button>
      <div data-section-toggle-body="amp-configs" hidden>
        ${configurationsBySpeakerTableHTML(configsBySpeaker || [])}
      </div>
      ${detailSection("Power", mainsRows)}
      ${detailSection("Connections & Output", ioRows)}
      ${detailSection("DSP", dspRows)}
      ${detailSection("Ecosystem", ecoRows)}
      ${a.features && a.features.length ? `<p class="section-label" style="margin-top:20px">Features</p>${featureChips(a.features)}` : ""}
      ${detailSection("Notes & Protection", noteRows)}
      ${detailSection("Physical", physicalRows)}
    </div>`;
  return { color, head, body };
}
