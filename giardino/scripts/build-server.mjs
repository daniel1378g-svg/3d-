// Bundles the server (server/*.ts + shared/*.ts) into one file, dist-server/server.mjs, run by `npm start`.
// Node built-ins stay external; there are no other dependencies.
import { build } from "esbuild";
import { statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const outfile = join(root, "dist-server/server.mjs");
await build({
  entryPoints: [join(root, "server/index.ts")],
  outfile,
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node22",
  external: ["node:*"],
  legalComments: "none",
  logLevel: "warning",
  banner: { js: "// Pizzeria Giardino – website, reservation requests and staff review (built from server/*.ts)" },
});
console.log(`dist-server/server.mjs ${Math.round(statSync(outfile).size / 1024)} KB`);
