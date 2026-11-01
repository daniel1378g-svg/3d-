// Reservation request: date → people → time → place → contact → review → send.
// Launch mode (VITE_PROPOSAL=0): the request goes to the restaurant's own server (server/), and the page says «request
// received – awaiting confirmation» until the team has actually confirmed it in the staff view.
// Proposal mode (default, and the claude.ai preview): nothing leaves the browser. «Send» opens the visitor's e-mail
// program with the finished request to info@pizzeriagiardino.ch, next to the phone number and a copyable summary.
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { useNow, useSite, API_BASE } from "@/site";
import { useReservation, type Draft, type Submission } from "./store";
import { BOOKING, HOURS, addDays, closureOn, dayState, parseYmd, slotsFor, upcomingClosures, weekday, ymd, type DayState, type Now, type ScheduleError } from "@shared/schedule";
import { validateContact, type FieldError, type Seating, type Wish, WISHES } from "@shared/reservation";
import { fmtDayLong, fmtDate, fmtTime, monthName, weekdayNames } from "@/lib/format";
import { RESTAURANT } from "@/content/restaurant";
import { Link, NewTabMark } from "@/components/Link";
import { Arrow, ArrowLeft, Check, Minus, Plus, Phone, Mail, ChevronLeft, Chevron } from "@/components/icons";
import type { Dict } from "@/i18n";
import { NoJsForm } from "./NoJsForm";

const STEPS = ["date", "party", "time", "seating", "contact", "review"] as const;
type StepKey = (typeof STEPS)[number];

/** Consent to storage is only asked where something is stored: in launch mode, on the restaurant's server. */
const NEEDS_CONSENT = API_BASE !== null;
export const contactErrors = (d: Draft) => validateContact(NEEDS_CONSENT ? d : { ...d, consent: true });
const selectable = (state: string) => state !== "past";

export function ReservationFlow({ compactHead = false }: { compactHead?: boolean }) {
  const { t, lang } = useSite();
  const now = useNow();
  const { draft, set, submission, setSubmission, reset } = useReservation();
  const [errors, setErrors] = useState<Partial<Record<string, FieldError | ScheduleError>>>({});
  const [sending, setSending] = useState(false);
  const [failure, setFailure] = useState<"network" | "server" | "rateLimited" | null>(null);
  const live = useRef<HTMLParagraphElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const headingId = useId();

  const done = useMemo(() => {
    const d = { date: false, party: false, time: false, seating: false, contact: false } as Record<StepKey, boolean>;
    if (!now) return d;
    d.date = !!draft.date && dayState(draft.date, now) === "open";
    d.party = d.date && draft.party >= 1 && draft.party <= BOOKING.maxPartyOnline;
    d.time = d.party && !!draft.time && slotsFor(draft.date!, now).some((s) => s.time === draft.time && selectable(s.state));
    d.seating = d.time;
    d.contact = d.seating && Object.keys(contactErrors(draft)).length === 0;
    return d;
  }, [draft, now]);
  const reachable = (i: number) => STEPS.slice(0, i).every((s) => done[s]);
  const step = Math.min(draft.step, STEPS.length - 1);
  const key = STEPS[step];

  const goStep = (i: number) => {
    if (i < 0 || i >= STEPS.length || !reachable(i)) return;
    set({ step: i });
    setFailure(null);
    requestAnimationFrame(() => body.current?.querySelector<HTMLElement>("h3")?.focus({ preventScroll: false }));
  };
  const next = () => {
    if (key === "contact") {
      const f = contactErrors(draft);
      setErrors(f);
      if (Object.keys(f).length) {
        live.current && (live.current.textContent = t.reserve.errors.fixFields);
        requestAnimationFrame(() => body.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
        return;
      }
    }
    goStep(step + 1);
  };

  const submit = async () => {
    if (!API_BASE || sending || !now) return;
    setSending(true);
    setFailure(null);
    try {
      const res = await fetch(`${API_BASE}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...draft, date: draft.date, time: draft.time, lang, website: "" }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 201 || (res.ok && data.ref)) {
        const sub: Submission = { ref: data.ref, token: data.token, status: data.status, duplicate: !!data.duplicate, checkedAt: new Date().toISOString() };
        setSubmission(sub);
        return;
      }
      if (res.status === 409 && Array.isArray(data.codes)) {
        const errs: Record<string, ScheduleError> = {};
        for (const c of data.codes as ScheduleError[]) errs[c.startsWith("party") ? "party" : c.startsWith("time") ? "time" : "date"] = c;
        setErrors(errs);
        const first = (data.codes as string[])[0];
        goStep(first.startsWith("date") ? 0 : first.startsWith("party") ? 1 : 2);
        return;
      }
      if (res.status === 422 && data.fields) {
        setErrors(data.fields);
        set({ step: 4 });
        return;
      }
      setFailure(res.status === 429 ? "rateLimited" : "server");
    } catch {
      setFailure("network");
    } finally {
      setSending(false);
    }
  };

  if (submission) return <Result submission={submission} onNew={reset} onUpdate={setSubmission} />;

  return (
    <>
    <NoJsForm />
    <div className="resv js-only">
      <div className="resv__card" aria-labelledby={headingId}>
        <h2 id={headingId} className="sr-only">{t.reserve.title}</h2>
        <ol className="steps" aria-label={t.reserve.title}>
          {STEPS.map((s, i) => (
            <li key={s}>
              <button type="button" onClick={() => goStep(i)} disabled={!reachable(i)} aria-current={i === step ? "step" : undefined} className={i < step && done[s] ? "done" : ""}>
                <span className="n" aria-hidden="true">{i < step && done[s] ? <Check width={14} height={14} /> : i + 1}</span>
                {t.reserve.steps[s]}
              </button>
            </li>
          ))}
        </ol>
        <div className="resv__body" ref={body}>
          {!now ? (
            <p className="muted">{t.a11y.loading}</p>
          ) : (
            <>
              <p className="kicker" style={{ marginBottom: 10 }}>{t.reserve.stepOf(step + 1, STEPS.length)}</p>
              {key === "date" && <DateStep now={now} draft={draft} set={set} error={errors.date as ScheduleError | undefined} />}
              {key === "party" && <PartyStep draft={draft} set={set} error={(errors.party ?? errors.children) as string | undefined} />}
              {key === "time" && <TimeStep now={now} draft={draft} set={set} error={errors.time as ScheduleError | undefined} />}
              {key === "seating" && <SeatingStep draft={draft} set={set} />}
              {key === "contact" && <ContactStep draft={draft} set={set} errors={errors as Record<string, FieldError>} />}
              {key === "review" && <ReviewStep draft={draft} now={now} failure={failure} sending={sending} onSubmit={submit} onEdit={goStep} />}
            </>
          )}
          <p className="sr-only" aria-live="assertive" ref={live} />
        </div>
        <div className="resv__nav">
          <button type="button" className="btn btn--ghost btn--small" onClick={() => goStep(step - 1)} disabled={step === 0}>
            <ArrowLeft />
            {t.reserve.back}
          </button>
          {key !== "review" && (
            <button type="button" className="btn btn--small" onClick={next} disabled={!now || (key !== "contact" && !done[key])}>
              {t.reserve.next}
              <Arrow />
            </button>
          )}
        </div>
      </div>
      <Summary draft={draft} compactHead={compactHead} />
    </div>
    </>
  );
}

// ---------------------------------------------------------------------------------------------------------------
function StepTitle({ children, hint }: { children: ReactNode; hint?: ReactNode }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <h3 className="resv__step-title" tabIndex={-1}>{children}</h3>
      {hint && <p className="muted" style={{ fontSize: 15 }}>{hint}</p>}
    </div>
  );
}

function DateStep({ now, draft, set, error }: { now: Now; draft: Draft; set: (p: Partial<Draft>) => void; error?: ScheduleError }) {
  const { t, lang } = useSite();
  // open on the first month with bookable days (e.g. after a seasonal closure)
  const first = parseYmd(draft.date ?? firstOpenDay(now));
  const [view, setView] = useState({ y: first.y, m: first.m });
  const [focus, setFocus] = useState(draft.date ?? firstOpenDay(now));
  const grid = useRef<HTMLTableElement>(null);
  const names = weekdayNames(lang, "short");
  const longNames = weekdayNames(lang, "long");
  const closure = (d: string) => closureOn(d);

  const days = useMemo(() => {
    const start = ymd(view.y, view.m, 1);
    const lead = (weekday(start) + 6) % 7; // Monday first
    const total = new Date(Date.UTC(view.y, view.m, 0)).getUTCDate();
    const cells: (string | null)[] = Array.from({ length: lead }, () => null);
    for (let d = 1; d <= total; d++) cells.push(ymd(view.y, view.m, d));
    while (cells.length % 7) cells.push(null);
    return cells;
  }, [view]);
  const weeks = Array.from({ length: days.length / 7 }, (_, i) => days.slice(i * 7, i * 7 + 7));
  const stateOf = (d: string): DayState => dayState(d, now);
  const label = (s: DayState) => (s === "weekly-closed" ? t.reserve.calendar.weekly : s === "closure" ? t.reserve.calendar.closure : s === "past" ? t.reserve.calendar.past : s === "beyond-horizon" ? t.reserve.calendar.beyond : t.reserve.calendar.legendOpen);

  const moveFocus = (d: string) => {
    const p = parseYmd(d);
    if (p.y !== view.y || p.m !== view.m) setView({ y: p.y, m: p.m });
    setFocus(d);
    requestAnimationFrame(() => grid.current?.querySelector<HTMLElement>(`[data-day="${d}"]`)?.focus());
  };
  const onKey = (e: KeyboardEvent) => {
    const map: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (e.key in map) {
      e.preventDefault();
      moveFocus(addDays(focus, map[e.key]));
    } else if (e.key === "PageUp" || e.key === "PageDown") {
      e.preventDefault();
      const p = parseYmd(focus);
      const m = p.m + (e.key === "PageUp" ? -1 : 1);
      const y = p.y + Math.floor((m - 1) / 12);
      const mm = ((m - 1 + 12) % 12) + 1;
      const last = new Date(Date.UTC(y, mm, 0)).getUTCDate();
      moveFocus(ymd(y, mm, Math.min(p.d, last)));
    } else if (e.key === "Home") {
      e.preventDefault();
      moveFocus(addDays(focus, -((weekday(focus) + 6) % 7)));
    } else if (e.key === "End") {
      e.preventDefault();
      moveFocus(addDays(focus, 6 - ((weekday(focus) + 6) % 7)));
    }
  };
  const pick = (d: string) => {
    if (stateOf(d) !== "open") return;
    set({ date: d });
  };
  const monthStart = ymd(view.y, view.m, 1);
  const canPrev = monthStart > ymd(parseYmd(now.date).y, parseYmd(now.date).m, 1);
  const canNext = monthStart < addDays(now.date, BOOKING.horizonDays);
  const shift = (n: number) => {
    const m = view.m + n;
    const y = view.y + Math.floor((m - 1) / 12);
    setView({ y, m: ((m - 1 + 12) % 12) + 1 });
  };
  const sel = draft.date ? closure(draft.date) : null;
  return (
    <div>
      <StepTitle hint={t.reserve.lead}>{t.reserve.calendar.label}</StepTitle>
      {upcomingClosures(now).map((c) => (
        <p key={c.id} className="notice notice--warn" style={{ marginTop: 14, fontSize: 14.5 }}>
          {t.reserve.closureNote(c.title[lang], fmtDate(c.from, lang, { day: "numeric", month: "long" }), fmtDate(c.to, lang, { day: "numeric", month: "long", year: "numeric" }), fmtDayLong(c.reopen, lang))}
        </p>
      ))}
      <div className="cal">
        <div className="cal__head">
          <p className="cal__month" aria-live="polite">{monthName(view.y, view.m, lang)}</p>
          <div className="cal__nav">
            <button type="button" className="round-btn" onClick={() => shift(-1)} disabled={!canPrev}>
              <ChevronLeft />
              <span className="sr-only">{t.reserve.calendar.prevMonth}</span>
            </button>
            <button type="button" className="round-btn" onClick={() => shift(1)} disabled={!canNext}>
              <Chevron />
              <span className="sr-only">{t.reserve.calendar.nextMonth}</span>
            </button>
          </div>
        </div>
        <table role="grid" ref={grid} onKeyDown={onKey} aria-label={monthName(view.y, view.m, lang)}>
          <thead>
            <tr>
              {names.map((n, i) => (
                <th key={n} scope="col" abbr={longNames[i]}>{n}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((w, i) => (
              <tr key={i}>
                {w.map((d, j) => {
                  if (!d) return <td key={j} role="gridcell" />;
                  const s = stateOf(d);
                  const selected = draft.date === d;
                  return (
                    <td key={d} role="gridcell" aria-selected={selected}>
                      <button
                        type="button"
                        data-day={d}
                        className={`cal__day ${s === "closure" ? "is-closure" : ""} ${d === now.date ? "is-today" : ""}`}
                        tabIndex={d === focus ? 0 : -1}
                        aria-disabled={s !== "open"}
                        aria-label={`${fmtDayLong(d, lang).replace(/(^|\s)1(er|°)(?=\s)/u, "$11")} – ${selected ? t.reserve.calendar.selected : label(s)}${d === now.date ? `, ${t.reserve.calendar.today}` : ""}`}
                        onClick={() => {
                          setFocus(d);
                          pick(d);
                        }}
                        onFocus={() => setFocus(d)}
                      >
                        {parseYmd(d).d}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="cal__legend" aria-hidden="true">
          <span><i />{t.reserve.calendar.legendOpen}</span>
          <span><i className="lg-closure" />{t.reserve.calendar.closure}</span>
          <span><i style={{ opacity: 0.3 }} />{t.reserve.calendar.weekly}</span>
          <span><i className="lg-sel" />{t.reserve.calendar.selected}</span>
        </div>
        {error && <p className="error" role="alert" style={{ marginTop: 12 }}>{t.reserve.errors[error]}</p>}
        {draft.date && <p style={{ marginTop: 16, fontWeight: 560 }}>{fmtDayLong(draft.date, lang)}</p>}
        {sel && <p className="error">{t.reserve.errors["date-closure"]}</p>}
      </div>
    </div>
  );
}
function firstOpenDay(now: Now) {
  let d = now.date;
  for (let i = 0; i < 400; i++) {
    if (dayState(d, now) === "open") return d;
    d = addDays(d, 1);
  }
  return now.date;
}

function PartyStep({ draft, set, error }: { draft: Draft; set: (p: Partial<Draft>) => void; error?: string }) {
  const { t } = useSite();
  const max = BOOKING.maxPartyOnline;
  const id = useId();
  return (
    <div>
      <StepTitle>{t.reserve.party.label}</StepTitle>
      <div className="party" role="group" aria-labelledby={`${id}-n`}>
        <button type="button" className="party__btn" onClick={() => set({ party: Math.max(1, draft.party - 1) })} disabled={draft.party <= 1}>
          <Minus />
          <span className="sr-only">{t.reserve.party.decrease}</span>
        </button>
        <output id={`${id}-n`} className="party__n" aria-live="polite" aria-label={t.reserve.party.persons(draft.party)}>{draft.party}</output>
        <button type="button" className="party__btn" onClick={() => set({ party: Math.min(max, draft.party + 1) })} disabled={draft.party >= max}>
          <Plus />
          <span className="sr-only">{t.reserve.party.increase}</span>
        </button>
      </div>
      <div className="party__quick" role="group" aria-label={t.reserve.party.label}>
        {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
          <button key={n} type="button" className="chip" aria-pressed={draft.party === n} onClick={() => set({ party: n })}>
            {t.reserve.party.persons(n)}
          </button>
        ))}
      </div>
      <p className="notice" style={{ marginTop: 22 }}>
        {t.reserve.party.largeGroup(max)}{" "}
        <a className="link num" href={RESTAURANT.phoneHref}>{RESTAURANT.phoneDisplay}</a>
      </p>
      <div className="field" style={{ marginTop: 22, maxWidth: 280 }}>
        <label htmlFor={`${id}-c`}>{t.reserve.party.children}</label>
        <select id={`${id}-c`} className="input select" value={draft.children} onChange={(e) => set({ children: Number(e.target.value) })} aria-describedby={`${id}-ch`}>
          {Array.from({ length: draft.party + 1 }, (_, i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
        <span className="hint" id={`${id}-ch`}>{t.reserve.party.childrenHint}</span>
      </div>
      {error && <p className="error" role="alert" style={{ marginTop: 12 }}>{(t.reserve.errors as Record<string, string>)[error] ?? t.reserve.errors["party-invalid"]}</p>}
    </div>
  );
}

function TimeStep({ now, draft, set, error }: { now: Now; draft: Draft; set: (p: Partial<Draft>) => void; error?: ScheduleError }) {
  const { t, lang } = useSite();
  if (!draft.date) return <StepTitle hint={t.reserve.time.chooseDate}>{t.reserve.time.label}</StepTitle>;
  const slots = slotsFor(draft.date, now);
  const groups = [
    { key: "lunch", title: t.reserve.time.lunch, slots: slots.filter((s) => s.service === "lunch") },
    { key: "dinner", title: t.reserve.time.dinner, slots: slots.filter((s) => s.service === "dinner") },
  ];
  const any = slots.some((s) => selectable(s.state));
  const chosen = slots.find((s) => s.time === draft.time);
  const short = chosen ? chosen.state === "short-notice" : slots.some((s) => s.state === "short-notice");
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].includes(e.key)) return;
    e.preventDefault();
    const avail = slots.filter((s) => selectable(s.state));
    const i = avail.findIndex((s) => s.time === draft.time);
    const n = avail[(i + (e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1) + avail.length) % avail.length];
    if (n) {
      set({ time: n.time });
      requestAnimationFrame(() => document.querySelector<HTMLElement>(`[data-slot="${n.time}"]`)?.focus());
    }
  };
  return (
    <div>
      <StepTitle hint={`${fmtDayLong(draft.date, lang)} · ${t.reserve.party.persons(draft.party)}`}>{t.reserve.time.label}</StepTitle>
      <div className="slots" role="radiogroup" aria-label={t.reserve.time.label} onKeyDown={onKey}>
        {groups.map((g) => (
          <div className="slots__group" key={g.key}>
            <h4 style={{ fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 600, marginBottom: 10 }}>{g.title}</h4>
            <div className="slots__grid">
              {g.slots.map((s) => {
                const checked = draft.time === s.time;
                const firstAvail = !draft.time && slots.find((x) => selectable(x.state))?.time === s.time;
                return (
                  <button
                    key={s.time}
                    type="button"
                    role="radio"
                    data-slot={s.time}
                    className="slot"
                    aria-checked={checked}
                    aria-disabled={!selectable(s.state)}
                    tabIndex={checked || firstAvail ? 0 : -1}
                    aria-label={`${fmtTime(s.time, lang)}${!selectable(s.state) ? ` – ${t.reserve.time.unavailable}` : ""}`}
                    onClick={() => selectable(s.state) && set({ time: s.time })}
                  >
                    {fmtTime(s.time, lang)}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gap: 8, marginTop: 20, fontSize: 14.5 }} className="muted">
        <p>{t.reserve.time.kitchen}</p>
        {short && <p className="notice">{t.reserve.time.shortNotice(Math.round(BOOKING.phoneHintMinutes / 60))} <a className="link num" href={RESTAURANT.phoneHref}>{RESTAURANT.phoneDisplay}</a></p>}
        {!any && <p className="notice notice--warn">{t.reserve.time.noSlots}</p>}
      </div>
      {error && <p className="error" role="alert" style={{ marginTop: 12 }}>{t.reserve.errors[error]}</p>}
    </div>
  );
}

function SeatingStep({ draft, set }: { draft: Draft; set: (p: Partial<Draft>) => void }) {
  const { t } = useSite();
  const id = useId();
  const options: { key: Seating; title: string; hint?: string }[] = [
    { key: "none", title: t.reserve.seating.none },
    { key: "inside", title: t.reserve.seating.inside },
    { key: "terrace", title: t.reserve.seating.terrace, hint: t.reserve.seating.terraceHint },
    { key: "playroom", title: t.reserve.seating.playroom, hint: t.reserve.seating.playroomHint },
  ];
  const wishLabel: Record<Wish, string> = { highchair: t.reserve.seating.highchair, stroller: t.reserve.seating.stroller, celebration: t.reserve.seating.celebration };
  const toggle = (w: Wish) => set({ wishes: draft.wishes.includes(w) ? draft.wishes.filter((x) => x !== w) : [...draft.wishes, w] });
  return (
    <div>
      <StepTitle hint={t.reserve.seating.hint}>{t.reserve.seating.label}</StepTitle>
      <div className="seats" role="radiogroup" aria-label={t.reserve.seating.label}>
        {options.map((o) => (
          <button key={o.key} type="button" role="radio" aria-checked={draft.seating === o.key} className="seat" onClick={() => set({ seating: o.key })}>
            <b>{o.title}</b>
            {o.hint && <span>{o.hint}</span>}
          </button>
        ))}
      </div>
      <p className="muted" style={{ fontSize: 13.5, marginTop: 12 }}>{t.reserve.seating.noMap}</p>
      <fieldset style={{ border: 0, padding: 0, margin: "26px 0 0" }}>
        <legend className="label" style={{ fontWeight: 600 }}>{t.reserve.seating.wishes}</legend>
        <p className="muted" style={{ fontSize: 13.5 }}>{t.reserve.seating.wishesHint}</p>
        <div className="wishes">
          {WISHES.map((w) => (
            <button key={w} type="button" className="chip" aria-pressed={draft.wishes.includes(w)} onClick={() => toggle(w)}>
              {draft.wishes.includes(w) && <Check width={14} height={14} />}
              {wishLabel[w]}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="field" style={{ marginTop: 22 }}>
        <label htmlFor={`${id}-notes`}>{t.reserve.seating.notes}</label>
        <textarea id={`${id}-notes`} className="textarea" maxLength={800} value={draft.notes} onChange={(e) => set({ notes: e.target.value })} placeholder={t.reserve.seating.notesPlaceholder} aria-describedby={`${id}-notes-h`} />
        <span className="hint" id={`${id}-notes-h`}>{t.reserve.seating.notesHint}</span>
      </div>
    </div>
  );
}

function ContactStep({ draft, set, errors }: { draft: Draft; set: (p: Partial<Draft>) => void; errors: Record<string, FieldError> }) {
  const { t, href } = useSite();
  const id = useId();
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const live = contactErrors(draft);
  const err = (f: "name" | "phone" | "email" | "consent") => (touched[f] ? live[f] : errors[f]);
  const msg = (e?: FieldError) => (e ? (e === "required" ? t.reserve.errors.required : (t.reserve.errors as Record<string, string>)[e]) : null);
  const field = (f: "name" | "phone" | "email", type: string, auto: string, hint?: string) => {
    const e = err(f);
    const required = f !== "email";
    return (
      <div className={`field ${f === "name" ? "full" : ""}`}>
        <label htmlFor={`${id}-${f}`}>
          {t.reserve.contact[f]} {required && <span className="req" aria-hidden="true">*</span>}
        </label>
        <input
          id={`${id}-${f}`}
          className="input"
          type={type}
          autoComplete={auto}
          inputMode={f === "phone" ? "tel" : f === "email" ? "email" : undefined}
          value={draft[f]}
          required={required}
          aria-required={required || undefined}
          aria-invalid={!!e}
          aria-describedby={`${id}-${f}-h ${id}-${f}-e`}
          onChange={(ev) => set({ [f]: ev.target.value } as Partial<Draft>)}
          onBlur={() => setTouched((x) => ({ ...x, [f]: true }))}
        />
        {hint && <span className="hint" id={`${id}-${f}-h`}>{hint}</span>}
        <span id={`${id}-${f}-e`}>{e && <span className="error">{msg(e)}</span>}</span>
      </div>
    );
  };
  return (
    <div>
      <StepTitle>{t.reserve.contact.title}</StepTitle>
      <div className="form-grid">
        {field("name", "text", "name")}
        {field("phone", "tel", "tel", t.reserve.contact.phoneHint)}
        {field("email", "email", "email", t.reserve.contact.emailHint)}
        {NEEDS_CONSENT && <div className="full">
          <label className="check">
            <input type="checkbox" checked={draft.consent} onChange={(e) => { set({ consent: e.target.checked }); setTouched((x) => ({ ...x, consent: true })); }} aria-invalid={!!err("consent")} aria-describedby={`${id}-consent-e`} />
            <span>
              {t.reserve.contact.consent}{" "}
              <Link href={href("privacy")} className="link" target="_blank">{t.reserve.contact.privacyLink}<NewTabMark /></Link> <span className="req" aria-hidden="true">*</span>
            </span>
          </label>
          <span id={`${id}-consent-e`}>{err("consent") && <span className="error">{msg(err("consent"))}</span>}</span>
        </div>}
        <p className="muted full" style={{ fontSize: 13 }}><span aria-hidden="true">* </span>{t.reserve.contact.required}</p>
      </div>
    </div>
  );
}

export function summaryText(d: Draft, t: Dict, lang: Parameters<typeof fmtDayLong>[1]) {
  const lines = [
    `${t.reserve.summary.date}: ${d.date ? fmtDayLong(d.date, lang) : "–"}`,
    `${t.reserve.summary.time}: ${d.time ? fmtTime(d.time, lang) : "–"}`,
    `${t.reserve.summary.party}: ${t.reserve.party.persons(d.party)}${d.children ? ` (${t.reserve.summary.children}: ${d.children})` : ""}`,
    `${t.reserve.summary.seating}: ${({ none: t.reserve.seating.none, inside: t.reserve.seating.inside, terrace: t.reserve.seating.terrace, playroom: t.reserve.seating.playroom } as Record<string, string>)[d.seating]}`,
  ];
  if (d.wishes.length) lines.push(`${t.reserve.summary.wishes}: ${d.wishes.map((w) => (t.reserve.seating as Record<string, string>)[w]).join(", ")}`);
  if (d.notes) lines.push(`${t.reserve.summary.notes}: ${d.notes}`);
  if (d.name) lines.push(`${t.reserve.summary.name}: ${d.name}`);
  if (d.phone) lines.push(`${t.reserve.summary.phone}: ${d.phone}`);
  if (d.email) lines.push(`${t.reserve.summary.email}: ${d.email}`);
  return lines.join("\n");
}

function useCopy(text: string) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };
  return { copied, copy };
}

/** The finished request as an e-mail in the visitor's language (proposal mode). */
export function mailtoFor(draft: Draft, t: Dict, lang: Parameters<typeof fmtDayLong>[1]) {
  const head = [draft.date ? fmtDate(draft.date, lang, { weekday: "short", day: "numeric", month: "long" }) : "", draft.time ? fmtTime(draft.time, lang) : "", t.reserve.party.persons(draft.party)].filter(Boolean).join(", ");
  const body = [t.reserve.handoff.mailGreeting, "", t.reserve.handoff.mailIntro, "", summaryText(draft, t, lang), "", t.reserve.handoff.mailOutro, draft.name.trim()].join("\n");
  return `mailto:${RESTAURANT.email}?subject=${encodeURIComponent(t.reserve.handoff.mailSubject(head))}&body=${encodeURIComponent(body)}`;
}

function Handoff({ draft, text }: { draft: Draft; text: string }) {
  const { t, lang } = useSite();
  const [prepared, setPrepared] = useState(false);
  const { copied, copy } = useCopy(text);
  return (
    <div style={{ display: "grid", gap: 16, marginTop: 26 }}>
      <p className="notice" role="note">{t.reserve.handoff.note}</p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <a className="btn btn--accent" href={mailtoFor(draft, t, lang)} onClick={() => setPrepared(true)}>
          <Mail />
          {t.reserve.handoff.mail}
        </a>
        <a className="btn btn--ghost" href={RESTAURANT.phoneHref}>
          <Phone />
          {t.reserve.handoff.call} <span className="num">{RESTAURANT.phoneDisplay}</span>
        </a>
        <button type="button" className="btn btn--ghost" onClick={copy}>{copied ? t.reserve.review.copied : t.reserve.review.copy}</button>
      </div>
      <div role="status" aria-live="polite">
        {prepared && (
          <div className="notice notice--ok">
            <strong>{t.reserve.handoff.title}</strong>
            <p>{t.reserve.handoff.body}</p>
            <p>{t.reserve.handoff.noMail}</p>
          </div>
        )}
      </div>
      <pre className="copybox" aria-label={t.reserve.summary.title}>{text}</pre>
    </div>
  );
}

function ReviewStep({ draft, now, failure, sending, onSubmit, onEdit }: { draft: Draft; now: Now; failure: string | null; sending: boolean; onSubmit: () => void; onEdit: (i: number) => void }) {
  const { t, lang } = useSite();
  const text = summaryText(draft, t, lang);
  const rows: [string, string, number][] = [
    [t.reserve.summary.date, draft.date ? fmtDayLong(draft.date, lang) : "–", 0],
    [t.reserve.summary.party, t.reserve.party.persons(draft.party) + (draft.children ? ` · ${t.reserve.summary.children}: ${draft.children}` : ""), 1],
    [t.reserve.summary.time, draft.time ? fmtTime(draft.time, lang) : "–", 2],
    [t.reserve.summary.seating, ({ none: t.reserve.seating.none, inside: t.reserve.seating.inside, terrace: t.reserve.seating.terrace, playroom: t.reserve.seating.playroom } as Record<string, string>)[draft.seating], 3],
    [t.reserve.summary.name, draft.name, 4],
    [t.reserve.summary.phone, draft.phone, 4],
  ];
  if (draft.email) rows.push([t.reserve.summary.email, draft.email, 4]);
  if (draft.wishes.length) rows.push([t.reserve.summary.wishes, draft.wishes.map((w) => (t.reserve.seating as Record<string, string>)[w]).join(", "), 3]);
  if (draft.notes) rows.push([t.reserve.summary.notes, draft.notes, 3]);
  void now;
  return (
    <div>
      <StepTitle hint={API_BASE ? t.reserve.review.note : undefined}>{t.reserve.review.title}</StepTitle>
      <dl style={{ margin: "18px 0 0", display: "grid" }}>
        {rows.map(([k, v, step], i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "140px 1fr auto", gap: 12, padding: "12px 0", borderTop: "1px solid var(--line)", alignItems: "baseline" }}>
            <dt className="muted" style={{ fontSize: 14 }}>{k}</dt>
            <dd style={{ margin: 0, overflowWrap: "anywhere" }}>{v}</dd>
            <button type="button" className="link" style={{ background: "none", border: 0, fontSize: 14, padding: 0 }} onClick={() => onEdit(step)}>
              {t.reserve.edit}
              <span className="sr-only"> – {k}</span>
            </button>
          </div>
        ))}
      </dl>
      {API_BASE ? (
        <div style={{ display: "grid", gap: 14, marginTop: 26 }}>
          {failure && (
            <div className="notice notice--warn" role="alert">
              <strong>{failure === "network" ? t.reserve.errors.network : failure === "rateLimited" ? t.reserve.errors.rateLimited : t.reserve.errors.server}</strong>
              <a className="link num" href={RESTAURANT.phoneHref}>{t.cta.callNumber}</a>
            </div>
          )}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <button type="button" className="btn btn--accent" onClick={onSubmit} disabled={sending} aria-busy={sending}>
              {sending ? t.reserve.review.sending : failure ? t.reserve.review.retry : t.reserve.review.submit}
              {!sending && <Arrow />}
            </button>
            <a className="textlink num" href={RESTAURANT.phoneHref}><Phone />{RESTAURANT.phoneDisplay}</a>
          </div>
        </div>
      ) : (
        <Handoff draft={draft} text={text} />
      )}
    </div>
  );
}

function Summary({ draft, compactHead }: { draft: Draft; compactHead: boolean }) {
  const { t, lang } = useSite();
  const seat = ({ none: t.reserve.seating.none, inside: t.reserve.seating.inside, terrace: t.reserve.seating.terrace, playroom: t.reserve.seating.playroom } as Record<string, string>)[draft.seating];
  return (
    <aside className="summary" aria-label={t.reserve.summary.title}>
      <div className="summary__head">
        <h2 style={compactHead ? { fontSize: 22 } : undefined}>{t.reserve.summary.title}</h2>
      </div>
      <dl>
        <div><dt>{t.reserve.summary.date}</dt><dd>{draft.date ? fmtDate(draft.date, lang, { weekday: "short", day: "numeric", month: "long" }) : "–"}</dd></div>
        <div><dt>{t.reserve.summary.party}</dt><dd>{t.reserve.party.persons(draft.party)}{draft.children ? ` · ${draft.children} ${t.reserve.summary.children}` : ""}</dd></div>
        <div><dt>{t.reserve.summary.time}</dt><dd>{draft.time ? fmtTime(draft.time, lang) : "–"}</dd></div>
        <div><dt>{t.reserve.summary.seating}</dt><dd>{seat}</dd></div>
      </dl>
      <div className="summary__foot">
        <p>{t.reserve.summary.kept}</p>
        <p>
          {t.reserve.phoneTitle} <a href={RESTAURANT.phoneHref} className="num">{RESTAURANT.phoneDisplay}</a>
          <br />
          {t.hours.phone}: {fmtTime(HOURS.phone.from, lang)}–{fmtTime(HOURS.phone.to, lang)}
        </p>
      </div>
    </aside>
  );
}

// ---------------------------------------------------------------------------------------------------------------
export function Result({ submission, onNew, onUpdate }: { submission: Submission; onNew: () => void; onUpdate: (s: Submission) => void }) {
  const { t, lang, href } = useSite();
  const { draft } = useReservation();
  const statusHref = `${href("status")}?ref=${encodeURIComponent(submission.ref)}&token=${encodeURIComponent(submission.token)}`;
  const [loading, setLoading] = useState(false);
  const refresh = async () => {
    if (!API_BASE) return;
    setLoading(true);
    try {
      const r = await fetch(`${API_BASE}/reservations/${encodeURIComponent(submission.ref)}?token=${encodeURIComponent(submission.token)}`, { headers: { Accept: "application/json" } });
      if (r.ok) {
        const d = await r.json();
        onUpdate({ ...submission, status: d.status, message: d.staffNote ?? null, checkedAt: new Date().toISOString() });
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (submission.status !== "pending") return;
    const id = window.setInterval(() => document.visibilityState === "visible" && refresh(), 30000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submission.status]);
  return (
    <div className="resv__card" style={{ maxWidth: 820 }}>
      <StatusView sub={submission} name={draft.name.trim().split(/\s+/)[0]} />
      <div className="result" style={{ paddingTop: 0 }}>
        <p className="muted" style={{ fontSize: 14 }}>{t.reserve.states.saveLink}</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href={statusHref} className="btn btn--ghost btn--small">{t.reserve.states.statusLink}</Link>
          <button type="button" className="btn btn--ghost btn--small" onClick={refresh} disabled={loading}>{t.reserve.states.refresh}</button>
          <button type="button" className="btn btn--small" onClick={onNew}>{t.reserve.states.newRequest}</button>
        </div>
        {submission.checkedAt && <p className="muted" style={{ fontSize: 13 }}>{t.reserve.states.checkedAt(new Intl.DateTimeFormat(lang === "en" ? "en-CH" : `${lang}-CH`, { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Zurich" }).format(new Date(submission.checkedAt)))}</p>}
      </div>
    </div>
  );
}

export function StatusView({ sub, name = "", details }: { sub: Pick<Submission, "ref" | "status" | "duplicate" | "message">; name?: string; details?: ReactNode }) {
  const { t } = useSite();
  const s = sub.status;
  const title = s === "confirmed" ? t.reserve.states.confirmed : s === "declined" ? t.reserve.states.declined : s === "cancelled" ? t.reserve.states.cancelled : t.reserve.states.pending;
  const bodyText = s === "confirmed" ? t.reserve.states.confirmedBody : s === "declined" ? t.reserve.states.declinedBody : s === "cancelled" ? t.reserve.states.cancelledBody : t.reserve.states.pendingBody(name);
  return (
    <div className="result" role="status" aria-live="polite">
      <span className={`result__badge result__badge--${s}`}>{s === "confirmed" ? <Check width={16} height={16} /> : null}{title}</span>
      <h2>{title}</h2>
      <p style={{ maxWidth: "58ch" }}>{name ? bodyText : bodyText.replace(/,\s*([!.])/, "$1").replace(/\s+,/, ",")}</p>
      {sub.duplicate && <p className="notice">{t.reserve.states.duplicate}</p>}
      {sub.message && (
        <div className="notice">
          <strong>{t.reserve.states.staffMessage}</strong>
          <p>{sub.message}</p>
        </div>
      )}
      <p>
        <span className="muted" style={{ fontSize: 13, letterSpacing: ".12em", textTransform: "uppercase" }}>{t.reserve.states.reference}</span>
        <br />
        <span className="ref">{sub.ref}</span>
      </p>
      {details}
      {(s === "declined" || s === "pending") && (
        <p>
          <a className="textlink num" href={RESTAURANT.phoneHref}><Phone />{RESTAURANT.phoneDisplay}</a>
        </p>
      )}
    </div>
  );
}
