// Bundles tests/*.test.ts with esbuild (same aliases as the app) and runs them with node's built-in test runner,
// so no test framework is needed.
import { build } from "esbuild";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = new URL("..", import.meta.url).pathname;
const files = readdirSync(join(root, "tests")).filter((f) => f.endsWith(".test.ts"));
const outdir = join(root, ".cache/tests");
await build({
  entryPoints: files.map((f) => join(root, "tests", f)),
  bundle: true, platform: "node", format: "esm", outdir, outExtension: { ".js": ".mjs" }, logLevel: "warning",
  alias: { "@": join(root, "src"), "@content": join(root, "content") },
  loader: { ".json": "json" },
  define: { "import.meta.env": JSON.stringify({ BASE_URL: "/", DEV: false }), __ARTIFACT__: "false" },
  external: ["node:*"],
});
const r = spawnSync(process.execPath, ["--test", ...files.map((f) => join(outdir, f.replace(/\.ts$/, ".mjs")))], { stdio: "inherit" });
process.exit(r.status ?? 1);
