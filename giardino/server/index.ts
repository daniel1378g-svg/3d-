// Command line entry: `node server/index.ts` (development, types stripped by Node) or `node dist-server/server.mjs`
// (built by scripts/build-server.mjs). Settings come from the environment – see server/config.ts and README.md.
import { createServer } from "./app.ts";
import { fromEnv } from "./config.ts";

export { createServer };

const options = fromEnv(process.env);
const app = createServer(options);
app.server.listen(options.port, options.host, () => {
  const where = `${options.tlsCert && options.tlsKey ? "https" : "http"}://${options.host}:${options.port}`;
  options.log(`listening on ${where}`);
  options.log(app.site ? `site: ${options.distDir} (${app.site.rules.length} redirects)` : `no site at ${options.distDir} – API and staff area only`);
  options.log(`data: ${options.dataDir}`);
  options.log(options.staffPassword ? `staff area: ${where}/staff (user «${options.staffUser}»)` : "staff area closed – set STAFF_PASSWORD to open it");
});

let stopping = false;
for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => {
    if (stopping) return;
    stopping = true;
    options.log(`${signal}: shutting down`);
    app.close().then(() => process.exit(0));
    setTimeout(() => process.exit(1), 5000).unref();
  });
}
