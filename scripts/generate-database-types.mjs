import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const outputPath = resolve(root, "database/generated/database.types.ts");
const cliPath = resolve(root, "node_modules/supabase/dist/supabase.js");
const useLocalNodeCli = process.platform === "win32" && existsSync(cliPath);
const result = spawnSync(
  useLocalNodeCli ? process.execPath : "supabase",
  [...(useLocalNodeCli ? [cliPath] : []), "gen", "types", "typescript", "--local", "--schema", "catalog,api"],
  { cwd: root, encoding: "utf8" },
);

if (result.status !== 0) {
  process.stderr.write(result.stderr || result.stdout);
  process.exit(result.status ?? 1);
}

const generated = `${result.stdout.replaceAll("\r\n", "\n").trimEnd()}\n`;

if (process.argv.includes("--check")) {
  const committed = readFileSync(outputPath, "utf8").replaceAll("\r\n", "\n");
  if (committed !== generated) {
    console.error("database types are stale; run npm run db:types");
    process.exit(1);
  }
  console.log("database types: PASS");
} else {
  writeFileSync(outputPath, generated, "utf8");
  console.log(`database types written: ${outputPath}`);
}
