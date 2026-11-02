// A small router: the site needs only a path, a hash, a state object and a key per navigation. Browser
// history on the real site; in-memory history for the claude.ai preview, which owns the address bar.
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Loc = { pathname: string; hash: string; state: unknown; key: string };
type Nav = (to: string, opts?: { state?: unknown; replace?: boolean }) => void;
const Ctx = createContext<{ loc: Loc; navigate: Nav } | null>(null);

const newKey = () => Math.random().toString(36).slice(2, 9);
function fromWindow(): Loc {
  const h = history.state as { state?: unknown; key?: string } | null;
  return { pathname: location.pathname, hash: location.hash, state: h?.state ?? null, key: h?.key ?? "default" };
}

export function Router({ memory = false, initial = "/", children }: { memory?: boolean; initial?: string; children: ReactNode }) {
  const [loc, setLoc] = useState<Loc>(() => {
    if (!memory) return fromWindow();
    const u = new URL(initial, "http://x");
    return { pathname: u.pathname, hash: u.hash, state: null, key: "default" };
  });
  useEffect(() => {
    if (memory) return;
    const on = () => setLoc(fromWindow());
    window.addEventListener("popstate", on);
    return () => window.removeEventListener("popstate", on);
  }, [memory]);
  const navigate = useCallback<Nav>(
    (to, opts) => {
      const u = new URL(to, "http://x");
      const next: Loc = { pathname: u.pathname, hash: u.hash, state: opts?.state ?? null, key: newKey() };
      if (!memory) history[opts?.replace ? "replaceState" : "pushState"]({ state: next.state, key: next.key }, "", u.pathname + u.hash);
      setLoc(next);
    },
    [memory],
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

/** Replaces the current entry once rendered. */
export function Redirect({ to }: { to: string }) {
  const navigate = useNavigate();
  useEffect(() => navigate(to, { replace: true }), [to, navigate]);
  return null;
}
