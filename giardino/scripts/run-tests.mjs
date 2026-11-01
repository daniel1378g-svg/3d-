// Runs the test suite: every tests/*.test.ts is bundled with esbuild (so tests can import src/ with the same aliases
// as the app: @ → src, @shared → shared, @content → content) and then run with Node's built-in test runner.
// Usage: node scripts/run-tests.mjs [name-filter …]
import { build } from "esbuild";
import { mkdirSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = new URL("..", import.meta.url).pathname;
const outdir = join(root, ".cache/tests");
const filters = process.argv.slice(2);
const files = readdirSync(join(root, "tests"))
  .filter((f) => f.endsWith(".test.ts") && (!filters.length || filters.some((x) => f.includes(x))))
  .sort();
if (!files.length) {
  console.error("no test files match");
  process.exit(1);
}

const ALIASES = { "@": "src", "@shared": "shared", "@content": "content" };
const aliases = {
  name: "aliases-and-externals",
  setup(b) {
    // @/…, @shared/…, @content/… → the project folders
    b.onResolve({ filter: /^@(shared|content)?\// }, (args) => {
      const [, scope = ""] = /^@(shared|content)?\//.exec(args.path);
      const base = ALIASES[scope ? `@${scope}` : "@"];
      const rest = args.path.slice(scope ? scope.length + 2 : 2);
      return b.resolve(`./${rest}`, { resolveDir: join(root, base), kind: args.kind, importer: args.importer });
    });
    // packages stay external and are loaded from node_modules at run time
    b.onResolve({ filter: /^[^./]/ }, (args) => ({ path: args.path, external: true }));
  },
};

rmSync(outdir, { recursive: true, force: true });
mkdirSync(outdir, { recursive: true });
await build({
  entryPoints: files.map((f) => join(root, "tests", f)),
  outdir,
  outExtension: { ".js": ".mjs" },
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node22",
  sourcemap: "inline",
  jsx: "automatic",
  loader: { ".json": "json", ".css": "empty" },
  define: { __ARTIFACT__: "false", __PROPOSAL__: "true", "import.meta.env": "{}" },
  plugins: [aliases],
  logLevel: "warning",
});

const bundles = files.map((f) => join(outdir, f.replace(/\.ts$/, ".mjs")));
const run = spawnSync(process.execPath, ["--test", "--test-reporter=spec", "--disable-warning=ExperimentalWarning", ...bundles], {
  cwd: root,
  stdio: "inherit",
  env: { ...process.env, NODE_ENV: "test" },
});
process.exit(run.status ?? 1);
