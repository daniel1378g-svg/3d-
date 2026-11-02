// Bundles tests/*.test.ts (with the @/ alias) and runs them with node:test.
import { build } from "esbuild";
import { readdirSync, rmSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = new URL("..", import.meta.url).pathname;
const out = join(root, ".cache/tests");
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
const files = readdirSync(join(root, "tests")).filter((f) => f.endsWith(".test.ts"));
await build({
  entryPoints: files.map((f) => join(root, "tests", f)),
  outdir: out,
  bundle: true,
  platform: "node",
  format: "esm",
  outExtension: { ".js": ".mjs" },
  alias: { "@": join(root, "src") },
  loader: { ".json": "json" },
  define: { __ARTIFACT__: "false", "import.meta.env.BASE_URL": '"/"' },
  logLevel: "warning",
});
const run = spawnSync(process.execPath, ["--test", ...files.map((f) => join(out, f.replace(/\.ts$/, ".mjs")))], { stdio: "inherit" });
process.exit(run.status ?? 1);
