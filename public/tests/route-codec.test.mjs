import {
  formatHashRoute,
  formatPaneSpec,
  parseHashRoute,
  parsePaneSpec,
} from "../js/core/route-codec.js";

let passes = 0;
let failures = 0;

function check(name, condition) {
  if (condition) passes += 1;
  else failures += 1;
  console.log(`${condition ? "PASS" : "FAIL"} — ${name}`);
}

const route = {
  key: "speakers",
  item: "spk/한글 100%",
  pane2: "amp:id?x=1&y=2",
};
const hash = formatHashRoute(route);
check("hash codec가 예약 문자와 Unicode를 왕복함", JSON.stringify(parseHashRoute(hash)) === JSON.stringify({ ...route, valid: true }));
check("hash codec가 빈 선택 필드를 생략함", formatHashRoute({ key: "brand" }) === "#brand");
check("잘못된 percent encoding을 유효하지 않다고 표시함", parseHashRoute("#speakers/%E0%A4%A").valid === false);
check("과다 hash segment를 거부함", parseHashRoute("#speakers/a/b/c").valid === false);
check("item 없는 pane 계층을 거부함", parseHashRoute("#speakers//pane").valid === false);

/** @type {Array<[Parameters<typeof formatPaneSpec>[0], string]>} */
const paneCases = [
  [{ kind: "entity", entityId: "amp-la-la12x" }, "amp-la-la12x"],
  [{ kind: "media", mediaSlug: "rear view" }, "media~rear view"],
  [{ kind: "entity-media", entityId: "amp-la-la12x", mediaSlug: "front" }, "amp-la-la12x~media~front"],
];
for (const [value, encoded] of paneCases) {
  check(`pane codec 왕복: ${value.kind}`, formatPaneSpec(value) === encoded && JSON.stringify(parsePaneSpec(encoded)) === JSON.stringify(value));
}

for (const invalid of ["", "media~", "~media~front", "entity~other~front", "entity~media~front~extra"]) {
  check(`잘못된 pane spec 거부: ${invalid || "(empty)"}`, parsePaneSpec(invalid) === null);
}

let invalidHierarchyRejected = false;
try {
  formatHashRoute({ key: "speakers", pane2: "media~front" });
} catch {
  invalidHierarchyRejected = true;
}
check("직렬화 시 item 없는 pane 계층을 거부함", invalidHierarchyRejected);

let delimiterRejected = false;
try {
  formatPaneSpec({ kind: "entity", entityId: "amp~invalid" });
} catch {
  delimiterRejected = true;
}
check("pane token의 예약 구분자를 거부함", delimiterRejected);

console.log(`\n결과: ${passes} PASS / ${failures} FAIL`);
process.exit(failures ? 1 : 0);
