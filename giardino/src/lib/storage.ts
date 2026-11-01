// Browser storage can be missing or throw (private windows, blocked site data, the claude.ai preview). Every access
// goes through here and the site works without it.
type Kind = "local" | "session";
const area = (kind: Kind): Storage | null => {
  try {
    if (typeof window === "undefined") return null;
    return kind === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
};
export const storage = (kind: Kind) => ({
  get(key: string): string | null {
    try {
      return area(kind)?.getItem(key) ?? null;
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      area(kind)?.setItem(key, value);
    } catch {
      /* ignore */
    }
  },
  remove(key: string) {
    try {
      area(kind)?.removeItem(key);
    } catch {
      /* ignore */
    }
  },
  json<T>(key: string): T | null {
    const raw = this.get(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },
});
export const LANG_KEY = "giardino-lang";
