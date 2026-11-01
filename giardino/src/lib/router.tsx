// A small router: path, query, hash, state and a key per navigation. Browser history on the site; in memory for the
// server renderer and for the claude.ai preview (which mirrors the path into a "#de-essen-geniessen" hash).
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Loc = { pathname: string; search: string; hash: string; state: unknown; key: string };
export type NavOpts = { state?: unknown; replace?: boolean };
type Nav = (to: string, opts?: NavOpts) => void;
const Ctx = createContext<{ loc: Loc; navigate: Nav } | null>(null);

let n = 0;
const newKey = () => `k${Date.now().toString(36)}${(n++).toString(36)}`;
const parse = (to: string, state: unknown = null, key = "default"): Loc => {
  const u = new URL(to, "http://x");
  return { pathname: u.pathname, search: u.search, hash: u.hash, state, key };
};
function fromWindow(): Loc {
  const h = (history.state ?? {}) as { state?: unknown; key?: string };
  return { pathname: location.pathname, search: location.search, hash: location.hash, state: h.state ?? null, key: h.key ?? "default" };
}

export function Router({ memory = false, initial = "/", children, onNavigate }: { memory?: boolean; initial?: string; children: ReactNode; onNavigate?: (loc: Loc) => void }) {
  const [loc, setLoc] = useState<Loc>(() => (memory || typeof window === "undefined" ? parse(initial) : fromWindow()));
  useEffect(() => {
    if (memory) return;
    const on = () => setLoc(fromWindow());
    window.addEventListener("popstate", on);
    return () => window.removeEventListener("popstate", on);
  }, [memory]);
  const navigate = useCallback<Nav>(
    (to, opts) => {
      const next = parse(to, opts?.state ?? null, newKey());
      if (!memory) history[opts?.replace ? "replaceState" : "pushState"]({ state: next.state, key: next.key }, "", next.pathname + next.search + next.hash);
      setLoc(next);
      onNavigate?.(next);
    },
    [memory, onNavigate],
  );
  const value = useMemo(() => ({ loc, navigate }), [loc, navigate]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

function useRouter() {
  const c = useContext(Ctx);
  if (!c) throw new Error("outside <Router>");
  return c;
}
export const useLocation = () => useRouter().loc;
export const useNavigate = () => useRouter().navigate;

/** Reads and writes query parameters without a full navigation (menu search and filters). */
export function useQueryParam(name: string): [string, (v: string) => void] {
  const { loc, navigate } = useRouter();
  const value = new URLSearchParams(loc.search).get(name) ?? "";
  const set = useCallback(
    (v: string) => {
      const p = new URLSearchParams(loc.search);
      if (v) p.set(name, v);
      else p.delete(name);
      const qs = p.toString();
      navigate(loc.pathname + (qs ? "?" + qs : "") + loc.hash, { replace: true, state: { keepScroll: true } });
    },
    [loc.pathname, loc.search, loc.hash, name, navigate],
  );
  return [value, set];
}
