export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

/** localStorage / sessionStorage that never throws (private mode, blocked storage, previews). */
export function storage(kind: "local" | "session") {
  const get = () => {
    try {
      return kind === "local" ? window.localStorage : window.sessionStorage;
    } catch {
      return null;
    }
  };
  return {
    get(key: string) {
      try { return get()?.getItem(key) ?? null; } catch { return null; }
    },
    set(key: string, value: string) {
      try { get()?.setItem(key, value); } catch { /* ignore */ }
    },
  };
}

export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Asset path that works on the real site (/images/x) and in the claude.ai preview (images/x, next to the page). */
export const asset = (p: string) => (__ARTIFACT__ ? p.replace(/^\//, "") : p.startsWith("/") ? p : "/" + p);
