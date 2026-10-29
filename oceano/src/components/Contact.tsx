// Contact pieces shared by the home bento, the drawer, the kontakt page and the footer: the open-now status
// of each place (Europe/Zurich, past-midnight nights handled), the hours as the site writes them, the "Route"
// tabs with a Restaurant / Laden switch, the map that loads only on tap, the MyLocalina widget that loads only
// on tap, and the contact form with the live fields and messages.
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import * as Tabs from "@radix-ui/react-tabs";
import { UI, type Lang } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TX } from "@/content/site";
import { HOURS, HOUR_LINES, dayName, localNow, show, showSlots, status, type Place, type Status } from "@/content/hours";
import { cn } from "@/lib/utils";
import { IconExternal, IconPin } from "./icons";

export function useStatus(place: Place) {
  const [s, setS] = useState<Status>(() => status(place));
  useEffect(() => {
    setS(status(place));
    const id = setInterval(() => setS(status(place)), 60_000);
    return () => clearInterval(id);
  }, [place]);
  return s;
}

export function statusText(s: Status, lang: Lang) {
  if (s.open) return { head: UI.openNow[lang], tail: `${UI.until[lang]} ${show(s.until, lang)}` };
  if (!s.next) return { head: UI.closedNow[lang], tail: "" };
  const today = localNow().day;
  const when = s.next.day === today ? "" : s.next.day === (today + 1) % 7 ? `${UI.tomorrow[lang]} ` : `${dayName(s.next.day, lang)} `;
  return { head: UI.closedNow[lang], tail: `${UI.opens[lang]} ${when}${UI.at[lang]} ${show(s.next.from, lang)}` };
}

/** Today's restaurant hours as one line ("Heute 11:00 - 22:00"). */
export function todayLine(place: Place, lang: Lang) {
  const day = localNow().day;
  return `${UI.today[lang]} · ${showSlots(HOURS[place][day], lang, UI.closedDay[lang])}`;
}

export function OpenNow({ place, className, large = false }: { place: Place; className?: string; large?: boolean }) {
  const { lang } = useSite();
  const s = useStatus(place);
  const t = statusText(s, lang);
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <p className={cn("flex items-center gap-3 font-display font-extrabold uppercase leading-none", large ? "text-[clamp(28px,2.6vw,42px)]" : "text-[24px]")}>
        <span className={cn("relative h-3.5 w-3.5 shrink-0 rounded-full", s.open ? "bg-destaque" : "bg-suave/40")}>{s.open && <span className="absolute inset-0 rounded-full bg-destaque [animation:pulse-dot_1.8s_ease-out_3]" />}</span>
        {place === "laden" ? UI.shopPlace[lang] : UI.restaurant[lang]} · {t.head}
      </p>
      {t.tail && <p className="font-display text-[16px] font-semibold uppercase tracking-[0.12em] opacity-85">{t.tail}</p>}
    </div>
  );
}

/** The hours, line by line as on the site. */
export function HoursList({ place, className }: { place: Place; className?: string }) {
  const { lang } = useSite();
  return (
    <dl className={cn("grid gap-2", className)}>
      {HOUR_LINES[place].map((h, i) => (
        <div key={i} className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-current/15 pb-2">
          <dt>{h.days[lang]}</dt>
          <dd className="font-display text-[18px] font-semibold tracking-[0.06em]">{showSlots(h.slots, lang, TX.geschlossen[lang])}</dd>
        </div>
      ))}
    </dl>
  );
}

function TabsBar({ id, value, items, label }: { id: string; value: string; items: { id: string; label: string }[]; label: string }) {
  return (
    <Tabs.List aria-label={label} className="relative flex flex-wrap gap-1 border-b border-current/20">
      {items.map((t) => (
        <Tabs.Trigger key={t.id} value={t.id} className="relative px-3 pb-3 pt-1 font-display text-[16px] font-semibold uppercase tracking-[0.1em] opacity-75 data-[state=active]:opacity-100">
          {t.label}
          {value === t.id && <motion.span layoutId={id} className="absolute inset-x-2 -bottom-px h-[3px] rounded-full bg-destaque" transition={{ type: "spring", stiffness: 480, damping: 38 }} />}
        </Tabs.Trigger>
      ))}
    </Tabs.List>
  );
}

/** "Route": Google Maps, Waze, Apple Karten, with a Restaurant / Laden switch for the destination. */
export function RouteTabs({ className, id = "route-line" }: { className?: string; id?: string }) {
  const { lang } = useSite();
  const [tab, setTab] = useState("google");
  const [place, setPlace] = useState<Place>("restaurant");
  const m = BUSINESS.maps[place];
  const items = [
    { id: "google", label: "Google Maps", url: m.google },
    { id: "waze", label: "Waze", url: m.waze },
    { id: "apple", label: UI.appleMaps[lang], url: m.apple },
  ];
  return (
    <div className={className}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="eyebrow opacity-80">{UI.route[lang]}</p>
        <PlaceToggle value={place} onChange={setPlace} id={`${id}-place`} />
      </div>
      <Tabs.Root value={tab} onValueChange={setTab} className="mt-3">
        <TabsBar id={id} value={tab} items={items} label={UI.route[lang]} />
        {items.map((t) => (
          <Tabs.Content key={t.id} value={t.id} className="pt-4 outline-none">
            <a href={t.url} target="_blank" rel="noopener noreferrer" className="btn btn--sm">
              <IconPin size={16} />
              <span className="btn-roll">
                <span>
                  {UI.openRoute[lang]} · {place === "laden" ? BUSINESS.laden.street : BUSINESS.restaurant.street}
                </span>
                <span aria-hidden="true">
                  {UI.openRoute[lang]} · {place === "laden" ? BUSINESS.laden.street : BUSINESS.restaurant.street}
                </span>
              </span>
              <span className="sr-only">{UI.externalNew[lang]}</span>
            </a>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
}

/** "Restaurant / Laden" (or "/ Beide") with a sliding pill. */
export function PlaceToggle<T extends string>({ value, onChange, id, both = false, className }: { value: T; onChange: (v: T) => void; id: string; both?: boolean; className?: string }) {
  const { lang } = useSite();
  const items = [
    { v: "restaurant", label: UI.restaurant[lang] },
    { v: "laden", label: UI.shopPlace[lang] },
    ...(both ? [{ v: "both", label: UI.both[lang] }] : []),
  ];
  return (
    <div role="group" aria-label={`${UI.restaurant[lang]} / ${UI.shopPlace[lang]}`} className={cn("inline-flex rounded-full bg-marca-escura/35 p-1", className)}>
      {items.map((it) => (
        <button key={it.v} type="button" aria-pressed={value === it.v} onClick={() => onChange(it.v as T)} className={cn("relative rounded-full px-4 py-2 font-display text-[14px] font-semibold uppercase tracking-[0.12em]", value === it.v && "text-marca-escura")}>
          {value === it.v && <motion.span layoutId={id} className="absolute inset-0 rounded-full bg-destaque" transition={{ type: "spring", stiffness: 480, damping: 38 }} />}
          <span className="relative">{it.label}</span>
        </button>
      ))}
    </div>
  );
}

/** Google Maps loads only once the visitor asks for it (privacy). The preview can't embed other sites. */
export function MapEmbed({ className }: { className?: string }) {
  const { lang } = useSite();
  const [on, setOn] = useState(false);
  const [place, setPlace] = useState<Place>("restaurant");
  if (on && !__ARTIFACT__)
    return (
      <div className={cn("space-y-3", className)}>
        <PlaceToggle value={place} onChange={setPlace} id="map-place" />
        <iframe title={`${UI.route[lang]} · ${place}`} src={BUSINESS.maps[place].embed} className="h-[420px] w-full rounded-[20px] border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>
    );
  return (
    <div className={cn("grid min-h-[320px] place-items-center rounded-[20px] bg-branco/10 p-6 text-center", className)}>
      <div className="flex flex-col items-center gap-3">
        <IconPin size={36} className="text-destaque" />
        <p className="max-w-[320px] text-[15px] opacity-85">{UI.mapNote[lang]}</p>
        {on && __ARTIFACT__ ? (
          <a href={BUSINESS.maps.restaurant.google} target="_blank" rel="noopener noreferrer" className="btn btn--sm">
            Google Maps <span className="sr-only">{UI.externalNew[lang]}</span>
          </a>
        ) : (
          <button type="button" onClick={() => setOn(true)} className="btn btn--sm">
            <span className="btn-roll">
              <span>{UI.showMap[lang]}</span>
              <span aria-hidden="true">{UI.showMap[lang]}</span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

/** The MyLocalina widget, loaded only when asked (privacy). If it can't sit in a frame, a button opens it in a new tab. */
export function BookingWidget({ className }: { className?: string }) {
  const { lang } = useSite();
  const [on, setOn] = useState(false);
  const [failed, setFailed] = useState(false);
  const timer = useRef<number | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);
  return (
    <div className={cn("rounded-[20px] bg-branco/10 p-4", className)}>
      {on && !__ARTIFACT__ && !failed ? (
        <iframe
          title={UI.online[lang]}
          src={BUSINESS.booking}
          className="h-[560px] w-full rounded-[14px] border-0 bg-branco"
          onLoad={() => timer.current && clearTimeout(timer.current)}
          ref={() => {
            if (!timer.current) timer.current = window.setTimeout(() => setFailed(true), 12_000);
          }}
        />
      ) : (
        <div className="flex flex-col items-start gap-3">
          <p className="text-[15px] opacity-85">{UI.widgetNote[lang]}</p>
          {!on && !__ARTIFACT__ && (
            <button type="button" onClick={() => setOn(true)} className="btn btn--sm">
              <span className="btn-roll">
                <span>{UI.widgetLoad[lang]}</span>
                <span aria-hidden="true">{UI.widgetLoad[lang]}</span>
              </span>
            </button>
          )}
        </div>
      )}
      <a href={BUSINESS.booking} target="_blank" rel="noopener noreferrer" className="btn btn--sm btn--cream mt-3">
        <span className="btn-roll">
          <span>
            {UI.online[lang]} · {UI.widgetNew[lang]}
          </span>
          <span aria-hidden="true">
            {UI.online[lang]} · {UI.widgetNew[lang]}
          </span>
        </span>
        <IconExternal size={16} />
        <span className="sr-only">{UI.externalNew[lang]}</span>
      </a>
    </div>
  );
}

const ENDPOINT = (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) ?? "";

/** The live form: Vorname*, Nachname*, E-Mail*, Telefon, Nachricht, with its own success and error lines.
 *  Honeypot and a minimum fill time instead of a captcha; Formspree-compatible endpoint (VITE_FORM_ENDPOINT). */
export function ContactForm({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const { lang } = useSite();
  const [state, setState] = useState<"idle" | "sending" | "sent" | "test" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const opened = useRef(Date.now());
  const field = cn("mt-1.5 w-full rounded-[14px] px-4 py-3 text-[16px] outline-none transition-shadow focus-visible:shadow-[0_0_0_3px_var(--color-destaque)]", tone === "dark" ? "bg-branco/10 text-branco placeholder:text-suave/60" : "bg-fundo text-tinta");
  const label = "font-display text-[13px] font-semibold uppercase tracking-[0.16em]";
  const fields: { name: string; key: "formVorname" | "formNachname" | "formEmail" | "formTelefon"; type?: string; required?: boolean; auto: string }[] = [
    { name: "firstName", key: "formVorname", required: true, auto: "given-name" },
    { name: "lastName", key: "formNachname", required: true, auto: "family-name" },
    { name: "email", key: "formEmail", type: "email", required: true, auto: "email" },
    { name: "phone", key: "formTelefon", type: "tel", auto: "tel" },
  ];

  const validate = (form: HTMLFormElement) => {
    const data = new FormData(form);
    const errs: Record<string, string> = {};
    for (const f of fields) {
      const v = String(data.get(f.name) ?? "").trim();
      if (f.required && !v) errs[f.name] = UI.fieldMissing[lang];
      else if (f.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) errs[f.name] = UI.emailInvalid[lang];
    }
    return errs;
  };
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) {
      form.querySelector<HTMLInputElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    const data = new FormData(form);
    if (data.get("company") || Date.now() - opened.current < 2500) return setState("sent"); // bots
    if (!ENDPOINT) return setState("test");
    setState("sending");
    try {
      const res = await fetch(ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: data });
      setState(res.ok ? "sent" : "error");
      if (res.ok) form.reset();
    } catch {
      setState("error");
    }
  };

  return (
    <form
      noValidate
      onSubmit={submit}
      onBlur={(e) => {
        // fields check themselves as you leave them
        const name = (e.target as unknown as HTMLInputElement).name;
        if (name) setErrors((prev) => ({ ...prev, [name]: validate(e.currentTarget)[name] ?? "" }));
      }}
      className={cn("grid gap-4", className)}
      aria-describedby="form-status"
    >
      {!ENDPOINT && <p className="rounded-[14px] bg-destaque px-4 py-3 text-[14px] text-tinta">{UI.testMode[lang]}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <label key={f.name} className="block">
            <span className={label}>
              {TX[f.key][lang]}
              {f.required && "*"} {f.required && <span className="normal-case tracking-normal opacity-70">({UI.required[lang]})</span>}
            </span>
            <input name={f.name} type={f.type ?? "text"} autoComplete={f.auto} required={f.required} aria-invalid={!!errors[f.name]} aria-describedby={errors[f.name] ? `err-${f.name}` : undefined} className={field} />
            {errors[f.name] && (
              <motion.span id={`err-${f.name}`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-1 block text-[14px] text-destaque">
                {errors[f.name]}
              </motion.span>
            )}
          </label>
        ))}
      </div>
      <label className="block">
        <span className={label}>{TX.formNachricht[lang]}</span>
        <textarea name="message" rows={5} className={cn(field, "resize-y")} />
      </label>
      <label aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        Company
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
      <input type="hidden" name="_subject" value="Restaurant Oceano · Website" />
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={state === "sending"} className="btn">
          <span className="btn-roll">
            <span>{state === "sending" ? UI.sending[lang] : UI.send[lang]}</span>
            <span aria-hidden="true">{state === "sending" ? UI.sending[lang] : UI.send[lang]}</span>
          </span>
        </button>
        <p id="form-status" role="status" className="text-[15px]">
          {state === "sent" && TX.formSuccess[lang]}
          {state === "test" && UI.testSent[lang]}
          {state === "error" && (
            <>
              {TX.formError[lang]}{" "}
              <a className="link" href={`mailto:${BUSINESS.email}`}>
                {BUSINESS.email}
              </a>
            </>
          )}
        </p>
      </div>
    </form>
  );
}
