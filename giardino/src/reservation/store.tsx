// The reservation being built. It lives above the pages, so it survives page changes and language switches, and it
// is kept in sessionStorage (cleared when the tab closes) so a reload doesn't lose it either.
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react";
import { storage } from "@/lib/storage";
import type { Seating, Status, Wish } from "@shared/reservation";

export type Draft = {
  key: string;
  step: number;
  date: string | null;
  party: number;
  children: number;
  time: string | null;
  seating: Seating;
  wishes: Wish[];
  notes: string;
  name: string;
  phone: string;
  email: string;
  consent: boolean;
};
export type Submission = { ref: string; token: string; status: Status; duplicate: boolean; message?: string | null; checkedAt?: string };

const KEY = "giardino-reservation";
const SUB = "giardino-reservation-sent";
const newKey = () => {
  try {
    return crypto.randomUUID();
  } catch {
    return `k${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}${Math.random().toString(36).slice(2, 12)}`;
  }
};
export const emptyDraft = (): Draft => ({ key: newKey(), step: 0, date: null, party: 2, children: 0, time: null, seating: "none", wishes: [], notes: "", name: "", phone: "", email: "", consent: false });

type Action = { type: "set"; patch: Partial<Draft> } | { type: "reset" } | { type: "load"; draft: Draft };
function reducer(state: Draft, a: Action): Draft {
  if (a.type === "reset") return emptyDraft();
  if (a.type === "load") return a.draft;
  const next = { ...state, ...a.patch };
  // a new date can invalidate the chosen time
  if (a.patch.date !== undefined && a.patch.date !== state.date && a.patch.time === undefined) next.time = null;
  if (next.children > next.party) next.children = next.party;
  return next;
}

type Ctx = {
  draft: Draft;
  set: (patch: Partial<Draft>) => void;
  reset: () => void;
  submission: Submission | null;
  setSubmission: (s: Submission | null) => void;
};
const C = createContext<Ctx | null>(null);

export function ReservationProvider({ children }: { children: ReactNode }) {
  // start from an empty draft (identical on server and client), then load the saved one after hydration
  const [draft, dispatch] = useReducer(reducer, undefined, () => ({ ...emptyDraft(), key: "ssr-placeholder-key-000" }));
  const [submission, setSub] = useReducer((_: Submission | null, s: Submission | null) => s, null);
  useEffect(() => {
    const saved = storage("session").json<Draft>(KEY);
    dispatch({ type: "load", draft: saved && typeof saved.key === "string" && saved.key.length >= 16 && saved.key !== "ssr-placeholder-key-000" ? { ...emptyDraft(), ...saved } : emptyDraft() });
    const sent = storage("session").json<Submission>(SUB);
    if (sent?.ref && sent.token) setSub(sent);
  }, []);
  useEffect(() => {
    if (draft.key !== "ssr-placeholder-key-000") storage("session").set(KEY, JSON.stringify(draft));
  }, [draft]);
  const setSubmission = useCallback((s: Submission | null) => {
    setSub(s);
    if (s) storage("session").set(SUB, JSON.stringify(s));
    else storage("session").remove(SUB);
  }, []);
  const set = useCallback((patch: Partial<Draft>) => dispatch({ type: "set", patch }), []);
  const reset = useCallback(() => {
    dispatch({ type: "reset" });
    setSubmission(null);
  }, [setSubmission]);
  const value = useMemo(() => ({ draft, set, reset, submission, setSubmission }), [draft, set, reset, submission, setSubmission]);
  return <C.Provider value={value}>{children}</C.Provider>;
}

export function useReservation() {
  const c = useContext(C);
  if (!c) throw new Error("useReservation outside <ReservationProvider>");
  return c;
}
