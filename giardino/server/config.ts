// Server settings, read from the environment (README.md lists them). Every value has a safe default; the staff area
// stays closed until STAFF_PASSWORD is set.
import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { join, resolve } from "node:path";

export type Limit = { max: number; windowMs: number };
export type Limits = { reservations: Limit; messages: Limit; status: Limit; auth: Limit };

/** Per IP address, in memory. `auth` counts failed staff logins only. */
export const DEFAULT_LIMITS: Limits = {
  reservations: { max: 6, windowMs: 10 * 60_000 },
  messages: { max: 4, windowMs: 10 * 60_000 },
  status: { max: 60, windowMs: 60_000 },
  auth: { max: 20, windowMs: 10 * 60_000 },
};

export type Options = {
  port: number;
  host: string;
  /** SQLite database and the generated secret live here */
  dataDir: string;
  /** the built site (vite build + prerender); when missing, only the API and the staff area are served */
  distDir: string;
  staffUser: string;
  /** HTTP Basic password for /staff; null keeps the staff area closed (503) */
  staffPassword: string | null;
  /** Bearer token for the JSON staff API; null disables it */
  staffToken: string | null;
  /** optional URL that receives a small JSON notice (no personal data) for every new request or message */
  notifyWebhook: string | null;
  /** e.g. https://pizzeriagiardino.ch – used for links in notices and the same-origin check behind a proxy */
  publicOrigin: string | null;
  /** number of trusted reverse proxies in front of the server (0 = use the socket address) */
  trustProxy: number;
  /** personal data of a request is blanked this many days after the reservation date */
  retentionDays: number;
  /** HMAC secret for tokens and CSRF; generated into DATA_DIR/secret when not given */
  secret: string | null;
  /** PEM files: with both, the server speaks HTTPS with HTTP/2 (and HTTP/1.1 for old clients) itself */
  tlsCert: string | null;
  tlsKey: string | null;
  now: () => Date;
  limits: Limits;
  log: (line: string) => void;
};

export function defaults(): Options {
  return {
    port: 4340,
    host: "127.0.0.1",
    dataDir: resolve("data"),
    distDir: resolve("dist"),
    staffUser: "giardino",
    staffPassword: null,
    staffToken: null,
    notifyWebhook: null,
    publicOrigin: null,
    trustProxy: 0,
    retentionDays: 30,
    secret: null,
    now: () => new Date(),
    tlsCert: null,
    tlsKey: null,
    limits: DEFAULT_LIMITS,
    log: (line) => console.log(`[giardino] ${line}`),
  };
}

const nonEmpty = (v: string | undefined) => (v && v.trim() ? v.trim() : null);

export function fromEnv(env: NodeJS.ProcessEnv = process.env): Options {
  const o = defaults();
  const int = (v: string | undefined, fallback: number) => {
    const n = Number(v);
    return v !== undefined && v.trim() !== "" && Number.isFinite(n) && n >= 0 ? Math.floor(n) : fallback;
  };
  o.port = int(env.PORT, o.port);
  o.host = nonEmpty(env.HOST) ?? o.host;
  o.dataDir = resolve(nonEmpty(env.DATA_DIR) ?? o.dataDir);
  o.distDir = resolve(nonEmpty(env.DIST_DIR) ?? o.distDir);
  o.staffUser = nonEmpty(env.STAFF_USER) ?? o.staffUser;
  o.staffPassword = nonEmpty(env.STAFF_PASSWORD);
  o.staffToken = nonEmpty(env.STAFF_TOKEN);
  o.notifyWebhook = nonEmpty(env.NOTIFY_WEBHOOK_URL);
  o.publicOrigin = nonEmpty(env.PUBLIC_ORIGIN)?.replace(/\/+$/, "") ?? null;
  o.trustProxy = env.TRUST_PROXY === "true" ? 1 : int(env.TRUST_PROXY, 0);
  o.retentionDays = int(env.RETENTION_DAYS, o.retentionDays);
  o.secret = nonEmpty(env.SECRET);
  o.tlsCert = nonEmpty(env.TLS_CERT);
  o.tlsKey = nonEmpty(env.TLS_KEY);
  // a fixed clock for tests only – never in production
  const fake = env.NODE_ENV === "test" ? nonEmpty(env.GIARDINO_FAKE_NOW) : null;
  if (fake) {
    const at = new Date(fake);
    if (!Number.isNaN(at.getTime())) o.now = () => new Date(at);
  }
  return o;
}

/** The HMAC secret: given, or read from DATA_DIR/secret, or generated there once (mode 0600). */
export function resolveSecret(o: Options) {
  if (o.secret) return o.secret;
  mkdirSync(o.dataDir, { recursive: true });
  const file = join(o.dataDir, "secret");
  if (existsSync(file)) {
    const s = readFileSync(file, "utf8").trim();
    if (s.length >= 32) return s;
  }
  const s = randomBytes(32).toString("hex");
  writeFileSync(file, s + "\n", { mode: 0o600 });
  chmodSync(file, 0o600);
  return s;
}
