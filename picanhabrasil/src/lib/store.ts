// Tiny shared stores that outlive page and language changes (the reservation the visitor is putting together).
import { useSyncExternalStore } from "react";

export function createStore<T>(initial: T) {
  let state = initial;
  const subs = new Set<() => void>();
  return {
    get: () => state,
    set(patch: Partial<T> | ((s: T) => Partial<T>)) {
      const p = typeof patch === "function" ? (patch as (s: T) => Partial<T>)(state) : patch;
      state = { ...state, ...p };
      subs.forEach((f) => f());
    },
    subscribe(f: () => void) {
      subs.add(f);
      return () => subs.delete(f);
    },
  };
}
export function useStore<T>(store: ReturnType<typeof createStore<T>>) {
  return useSyncExternalStore(store.subscribe, store.get, store.get);
}

/** The reservation being put together: guests, ISO date (yyyy-mm-dd) and "hh:mm". */
export const booking = createStore<{ guests: number; date: string | null; time: string | null }>({ guests: 2, date: null, time: null });
