// The Giardino server: the pre-rendered website, the reservation-request API and the staff review area in one Node
// process with no dependencies beyond Node itself. createServer() is used by the CLI (index.ts) and by the tests.
import { createServer as createHttpServer, type IncomingMessage, type Server, type ServerResponse } from "node:http";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { addDays, zurichNow } from "../shared/schedule.ts";
import { DEFAULT_LIMITS, defaults, resolveSecret, type Options } from "./config.ts";
import { openStore, type Store } from "./store.ts";
import { RateLimiter, acceptLang, buildCsp, clientIp, json, securityHeaders, send } from "./http.ts";
import { StaticSite } from "./static.ts";
import { handleApi } from "./api.ts";
import { handleStaff } from "./staff.ts";

export type Notice = {
  type: "reservation.created" | "reservation.cancelled" | "message.created";
  ref: string;
  date: string | null;
  time: string | null;
  party: number | null;
  lang: string;
};

export type Ctx = {
  opts: Options;
  secret: string;
  store: Store;
  limiter: RateLimiter;
  now: () => Date;
  ip: (req: IncomingMessage) => string;
  log: (line: string) => void;
  notify: (n: Notice) => void;
};

export type App = {
  server: Server;
  store: Store;
  site: StaticSite | null;
  options: Options;
  csp: string;
  /** runs the retention clean-up now (it also runs at start and once a day) */
  purge: () => { reservations: number; messages: number };
  close: () => Promise<void>;
};

const MESSAGE_RETENTION_DAYS = 90;

export function createServer(partial: Partial<Options> = {}): App {
  const base = defaults();
  const opts: Options = { ...base, ...partial, limits: { ...DEFAULT_LIMITS, ...partial.limits } };
  const secret = resolveSecret(opts);
  const store = openStore(join(opts.dataDir, "giardino.sqlite"));
  const site = existsSync(opts.distDir) ? new StaticSite(opts.distDir) : null;
  const csp = buildCsp(site?.scriptHashes ?? []);
  const https = !!opts.publicOrigin?.startsWith("https://");
  const limiter = new RateLimiter();

  const notify = (n: Notice) => {
    if (!opts.notifyWebhook) return;
    const payload = { ...n, dashboard: `${opts.publicOrigin ?? ""}/staff` };
    fetch(opts.notifyWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    }).catch((e: Error) => opts.log(`notification failed: ${e.message}`));
  };

  const ctx: Ctx = { opts, secret, store, limiter, now: opts.now, ip: (req) => clientIp(req, opts.trustProxy), log: opts.log, notify };

  const handler = async (req: IncomingMessage, res: ServerResponse) => {
    try {
      securityHeaders(res, csp, https);
      let url: URL;
      try {
        url = new URL(req.url ?? "/", "http://localhost");
      } catch {
        req.resume();
        return send(res, 400, "Bad Request", { "Content-Type": "text/plain; charset=utf-8" });
      }
      if (url.pathname === "/api" || url.pathname.startsWith("/api/")) return await handleApi(ctx, req, res, url);
      if (url.pathname === "/staff" || url.pathname.startsWith("/staff/")) return await handleStaff(ctx, req, res, url);
      req.resume();
      if (site) return site.handle(req, res, url, acceptLang(req));
      return send(res, 404, "Not Found", { "Content-Type": "text/plain; charset=utf-8" });
    } catch (e) {
      opts.log(`error ${req.method} ${req.url}: ${(e as Error).stack ?? e}`);
      if (!res.headersSent) json(res, 500, { error: "server" });
      else res.destroy();
    }
  };

  const server = createHttpServer(handler);
  server.headersTimeout = 20_000;
  server.requestTimeout = 30_000;

  const purge = () => {
    const now = opts.now();
    const cutoff = addDays(zurichNow(now).date, -opts.retentionDays);
    const messagesBefore = new Date(now.getTime() - MESSAGE_RETENTION_DAYS * 86_400_000).toISOString();
    const out = store.purge(cutoff, messagesBefore, now.toISOString());
    if (out.reservations || out.messages) opts.log(`retention: personal data removed from ${out.reservations} requests, ${out.messages} messages deleted`);
    return out;
  };
  purge();
  const daily = setInterval(() => {
    try {
      purge();
    } catch (e) {
      opts.log(`retention failed: ${(e as Error).message}`);
    }
  }, 86_400_000);
  daily.unref();

  let closed = false;
  const close = () =>
    new Promise<void>((resolve) => {
      if (closed) return resolve();
      closed = true;
      clearInterval(daily);
      limiter.stop();
      const finish = () => {
        store.close();
        resolve();
      };
      if (!server.listening) return finish();
      server.close(() => finish());
      server.closeAllConnections();
    });

  return { server, store, site, options: opts, csp, purge, close };
}
