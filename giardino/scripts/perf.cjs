// Lab performance of the built site (BRIEF §13): Lighthouse on /de, /de/essen-geniessen and /de/reservation, served by
// the real server (dist/ + CSP) over HTTPS with HTTP/2 – as any production host serves it (a temporary self-signed
// certificate; PERF_PROTOCOL=h1 measures plain HTTP/1.1 instead) – with Lighthouse's default mobile emulation
// (Moto G Power viewport, 4× CPU slowdown, simulated "Slow 4G": 150 ms RTT, 1.6 Mbit/s). Headless Chromium has no
// GPU, so the 3D scene is measured as its poster fallback (the live scene never loads on mobile anyway).
// Writes content/qa/perf-<method>[-h1].json.
//
// Lighthouse is not a project dependency (it is large): install it anywhere and point LIGHTHOUSE at its CLI, e.g.
//   npm i -g lighthouse            → LIGHTHOUSE=lighthouse
//   npm i --prefix /tmp/lh lighthouse → LIGHTHOUSE=/tmp/lh/node_modules/.bin/lighthouse
// Usage: LIGHTHOUSE=… node scripts/perf.cjs   (run `npm run build` first)
const { spawn, spawnSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { chromium } = require("playwright");

const root = path.join(__dirname, "..");
const LH = process.env.LIGHTHOUSE || "lighthouse";
// "simulate" (Lighthouse's default, Lantern) or "devtools" (the same throttling applied to the real load)
const METHOD = process.env.PERF_METHOD === "devtools" ? "devtools" : "simulate";
const H2 = process.env.PERF_PROTOCOL !== "h1";
const PORT = 4393;
const ROUTES = ["/de", "/de/essen-geniessen", "/de/reservation"];

(async () => {
  const data = fs.mkdtempSync(path.join(os.tmpdir(), "giardino-perf-"));
  const tlsEnv = {};
  if (H2) {
    const cert = path.join(data, "cert.pem");
    const key = path.join(data, "key.pem");
    const r = spawnSync("openssl", ["req", "-x509", "-newkey", "rsa:2048", "-nodes", "-keyout", key, "-out", cert, "-days", "2", "-subj", "/CN=127.0.0.1", "-addext", "subjectAltName=IP:127.0.0.1"], { stdio: "ignore" });
    if (r.status !== 0) throw new Error("openssl is needed for the HTTP/2 measurement (or run with PERF_PROTOCOL=h1)");
    Object.assign(tlsEnv, { TLS_CERT: cert, TLS_KEY: key });
  }
  const server = spawn(process.execPath, ["--disable-warning=ExperimentalWarning", path.join(root, "dist-server/server.mjs")], {
    env: { ...process.env, PORT: String(PORT), DIST_DIR: path.join(root, "dist"), DATA_DIR: data, ...tlsEnv },
    stdio: "ignore",
  });
  await new Promise((r) => setTimeout(r, 1500));
  const chrome = chromium.executablePath();
  const results = {
    method: METHOD,
    protocol: H2 ? "HTTP/2 over TLS (self-signed, local)" : "HTTP/1.1 (local)",
    conditions:
      METHOD === "simulate"
        ? "Lighthouse mobile defaults: 412×823 @1.75x, 4× CPU slowdown, simulated Slow 4G (Lantern: 150 ms RTT, 1638 kbit/s); headless Chromium without GPU (WebGL → poster); median of 3 runs"
        : "Lighthouse mobile emulation 412×823 @1.75x with applied throttling (devtools method): 4× CPU slowdown, 562.5 ms request latency, 1474 kbit/s down; headless Chromium without GPU (WebGL → poster); median of 3 runs",
    runs: 3,
    routes: {},
  };
  for (const route of ROUTES) {
    const samples = [];
    for (let i = 0; i < 3; i++) {
      const out = path.join(data, `lh-${i}.json`);
      const url = `${H2 ? "https" : "http"}://127.0.0.1:${PORT}${route}`;
      const flags = `--chrome-flags=--headless=new --no-sandbox${H2 ? " --ignore-certificate-errors" : ""}`;
      // best-practices would only flag the self-signed certificate
      const r = spawnSync(LH, [url, "--quiet", `--only-categories=performance,accessibility${H2 ? "" : ",best-practices"}`, "--output=json", `--output-path=${out}`, `--throttling-method=${METHOD}`, flags], { env: { ...process.env, CHROME_PATH: chrome }, encoding: "utf8" });
      if (r.status !== 0) throw new Error(`lighthouse failed for ${route}: ${r.stderr.slice(0, 400)}`);
      const j = JSON.parse(fs.readFileSync(out, "utf8"));
      const a = j.audits;
      samples.push({
        lcp: a["largest-contentful-paint"].numericValue,
        cls: a["cumulative-layout-shift"].numericValue,
        tbt: a["total-blocking-time"].numericValue,
        fcp: a["first-contentful-paint"].numericValue,
        si: a["speed-index"].numericValue,
        perf: j.categories.performance.score,
        a11y: j.categories.accessibility.score,
        bp: j.categories["best-practices"]?.score ?? null,
        lcpElement: a["lcp-breakdown-insight"]?.details?.items?.[1]?.selector ?? null,
        js: (a["network-requests"].details.items || []).filter((x) => x.resourceType === "Script").reduce((n, x) => n + x.transferSize, 0),
        bytes: a["total-byte-weight"].numericValue,
      });
    }
    const med = (k) => samples.map((s) => s[k]).sort((x, y) => x - y)[1];
    results.routes[route] = {
      lcpS: +(med("lcp") / 1000).toFixed(2),
      cls: +med("cls").toFixed(3),
      tbtMs: Math.round(med("tbt")),
      fcpS: +(med("fcp") / 1000).toFixed(2),
      speedIndexS: +(med("si") / 1000).toFixed(2),
      performance: med("perf"),
      accessibility: med("a11y"),
      bestPractices: med("bp"),
      scriptKB: Math.round(med("js") / 1024),
      totalKB: Math.round(med("bytes") / 1024),
      lcpElement: samples[1].lcpElement,
    };
    console.log(route, JSON.stringify(results.routes[route]));
  }
  server.kill();
  fs.mkdirSync(path.join(root, "content/qa"), { recursive: true });
  fs.writeFileSync(path.join(root, `content/qa/perf-${METHOD}${H2 ? "" : "-h1"}.json`), JSON.stringify(results, null, 1));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
