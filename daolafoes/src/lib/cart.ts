// The take-away cart: browser-only, in localStorage ("dl-cart"), a test-mode front-end that never sends an
// order. Components read it through useCart (useSyncExternalStore) so every counter stays in step.
import { useSyncExternalStore } from "react";
import { storage } from "./utils";

export type CartLine = { id: string; qty: number };
const KEY = "dl-cart";
let lines: CartLine[] = read();
const subs = new Set<() => void>();
function read(): CartLine[] {
  try {
    const v = JSON.parse(storage("local").get(KEY) ?? "[]");
    return Array.isArray(v) ? v.filter((l) => l && typeof l.id === "string" && Number.isFinite(l.qty) && l.qty > 0) : [];
  } catch {
    return [];
  }
}
function write(next: CartLine[]) {
  lines = next;
  storage("local").set(KEY, JSON.stringify(next));
  subs.forEach((f) => f());
}
export const cart = {
  get: () => lines,
  add: (id: string, n = 1) => write(lines.some((l) => l.id === id) ? lines.map((l) => (l.id === id ? { ...l, qty: l.qty + n } : l)) : [...lines, { id, qty: n }]),
  set: (id: string, qty: number) => write(qty <= 0 ? lines.filter((l) => l.id !== id) : lines.some((l) => l.id === id) ? lines.map((l) => (l.id === id ? { ...l, qty } : l)) : [...lines, { id, qty }]),
  remove: (id: string) => write(lines.filter((l) => l.id !== id)),
  clear: () => write([]),
  count: () => lines.reduce((n, l) => n + l.qty, 0),
};
const subscribe = (f: () => void) => {
  subs.add(f);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      lines = read();
      f();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    subs.delete(f);
    window.removeEventListener("storage", onStorage);
  };
};
export const useCart = () => useSyncExternalStore(subscribe, cart.get, cart.get);
export const qtyOf = (id: string) => lines.find((l) => l.id === id)?.qty ?? 0;
