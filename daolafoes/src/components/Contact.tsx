// Contact pieces shared by the home, the drawer, the kontakt page and the footer: the live open status
// (Europe/Zurich, Dienstag Ruhetag), the hours as the site writes them, the route links, the map that loads only
// on tap, and the reservation form with the live fields (test mode: it checks, it never sends).
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { UI, type Lang } from "@/i18n";
import { PARTY_EVENT, getParty, useSite } from "@/site";
import { BUSINESS, TX, fill } from "@/content/site";
import { HOURS, HOUR_LINES, dayName, localNow, show, showSlots, status, type Status } from "@/content/hours";
import { cn } from "@/lib/utils";
import { IconExternal, IconPin } from "./icons";

export function useStatus() {
  const [s, setS] = useState<Status>(() => status());
  useEffect(() => {
    setS(status());
    const id = setInterval(() => setS(status()), 60_000);
    return () => clearInterval(id);
  }, []);
  return s;
}

export function statusText(s: Status, lang: Lang) {
  if (s.open) return { head: UI.openNow[lang], tail: `${UI.until[lang]} ${show(s.until, lang)}` };
  if (!s.next) return { head: UI.closedNow[lang], tail: "" };
  const today = localNow().day;
  const when = s.next.day === today ? "" : s.next.day === (today + 1) % 7 ? `${UI.tomorrow[lang]} ` : `${dayName(s.next.day, lang)} `;
  return { head: UI.closedNow[lang], tail: `${UI.opens[lang]} ${when}${UI.at[lang]} ${show(s.next.from, lang)}` };
}

export function todayLine(lang: Lang) {
  const day = localNow().day;
  return `${UI.today[lang]} · ${showSlots(HOURS[day], lang, UI.closedDay[lang])}`;
}

export function OpenNow({ className, large = false }: { className?: string; large?: boolean }) {
  const { lang } = useSite();
  const s = useStatus();
  const t = statusText(s, lang);
  const tuesday = localNow().day === 2;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <p className={cn("flex items-center gap-3 font-display font-semibold leading-none", large ? "text-[clamp(26px,2.4vw,40px)]" : "text-[22px]")}>
        <span className={cn("relative h-3.5 w-3.5 shrink-0 rounded-full", s.open ? "bg-destaque" : "bg-current/30")}>{s.open && <span className="absolute inset-0 rounded-full bg-destaque [animation:pulse-dot_1.8s_ease-out_3]" />}</span>
        {t.head}
      </p>
      {t.tail && <p className="eyebrow opacity-80">{tuesday && !s.open ? `${TX.n_closedTuesday[lang]} · ${t.tail}` : t.tail}</p>}
    </div>
  );
}

/** The hours, line by line as on the site. */
export function HoursList({ className }: { className?: string }) {
  const { lang } = useSite();
  return (
    <dl className={cn("grid gap-2", className)}>
      {HOUR_LINES.map((h, i) => (
        <div key={i} className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-current/15 pb-2">
          <dt>{h.days[lang]}</dt>
          <dd className="font-display text-[18px] font-semibold">{showSlots(h.slots, lang, UI.closedDay[lang])}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Route links built from the published GPS point. */
export function RouteLinks({ className }: { className?: string }) {
  const { lang } = useSite();
  const items = [
    { label: "Google Maps", url: BUSINESS.maps.google },
    { label: "Waze", url: BUSINESS.maps.waze },
    { label: UI.appleMaps[lang], url: BUSINESS.maps.apple },
  ];
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((t) => (
        <a key={t.label} href={t.url} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--sm">
          <IconPin size={16} />
          <span className="btn-roll">
            <span>{t.label}</span>
            <span aria-hidden="true">{t.label}</span>
          </span>
          <span className="sr-only">{UI.externalNew[lang]}</span>
        </a>
      ))}
    </div>
  );
}

/** Google Maps loads only once the visitor asks for it (privacy). The preview can't embed other sites. */
export function MapEmbed({ className }: { className?: string }) {
  const { lang } = useSite();
  const [on, setOn] = useState(false);
  if (on && !__ARTIFACT__) return <iframe title={`${UI.route[lang]} · ${BUSINESS.street}`} src={BUSINESS.maps.embed} className={cn("h-[420px] w-full rounded-[20px] border-0", className)} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />;
  return (
    <div className={cn("grid min-h-[300px] place-items-center rounded-[20px] bg-marca/[0.06] p-6 text-center", className)}>
      <div className="flex flex-col items-center gap-3">
        <IconPin size={36} className="text-destaque" />
        <p className="font-display text-[20px] font-semibold">{BUSINESS.street}, {BUSINESS.city}</p>
        <p className="max-w-[320px] text-[14px] text-linha">{UI.mapNote[lang]}</p>
        {on && __ARTIFACT__ ? (
          <a href={BUSINESS.maps.google} target="_blank" rel="noopener noreferrer" className="btn btn--sm">
            Google Maps <IconExternal size={14} /> <span className="sr-only">{UI.externalNew[lang]}</span>
          </a>
        ) : (
          <button type="button" onClick={() => setOn(true)} className="btn btn--sm">
            <span className="btn-roll">
              <span>{TX.n_mapTap[lang]}</span>
              <span aria-hidden="true">{TX.n_mapTap[lang]}</span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export const CANTONS = ["Zürich", "Aargau", "Appenzell Ausserrhoden", "Appenzell Innerrhoden", "Basel-Landschaft", "Basel-Stadt", "Bern", "Freiburg", "Genf", "Glarus", "Graubünden", "Jura", "Luzern", "Neuenburg", "Nidwalden", "Obwalden", "Schaffhausen", "Schwyz", "Solothurn", "St. Gallen", "Tessin", "Thurgau", "Uri", "Zug", "Waadt", "Wallis"];
const HOURS_OPTS = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "00:00"];

export const fieldCls = (tone: "light" | "dark" = "light") => cn("mt-1.5 w-full rounded-[14px] px-4 py-3 text-[16px] outline-none transition-shadow focus-visible:shadow-[0_0_0_3px_var(--color-destaque)]", tone === "light" ? "bg-fundo text-tinta shadow-[inset_0_0_0_1px_rgba(81,53,40,0.15)]" : "bg-branco/10 text-fundo placeholder:text-fundo/50");
export const labelCls = "font-body text-[12px] font-semibold uppercase tracking-[0.16em]";

export function Field({ label, name, type = "text", required, auto, error, tone = "light", children, hint }: { label: string; name: string; type?: string; required?: boolean; auto?: string; error?: string; tone?: "light" | "dark"; children?: React.ReactNode; hint?: string }) {
  const { lang } = useSite();
  return (
    <label className="block">
      <span className={labelCls}>
        {label}
        {required && "*"} {hint && <span className="normal-case tracking-normal opacity-70">({hint})</span>}
      </span>
      {children ?? <input name={name} type={type} autoComplete={auto} required={required} aria-invalid={!!error} aria-describedby={error ? `err-${name}` : undefined} className={fieldCls(tone)} />}
      {error && (
        <motion.span id={`err-${name}`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-1 block text-[14px] text-acento">
          {error}
        </motion.span>
      )}
      {required && <span className="sr-only">({UI.required[lang]})</span>}
    </label>
  );
}

/** The live reservation form, field for field (subject, name*, Firma, Adresse*, Stadt*, Land, Kanton, PLZ,
 *  E-Mail*, Telefon*, consent, Zusatzinformationen, Datum bis, Uhr bis), in test mode. The party size from the
 *  table widget lands in "Zusatzinformationen". */
export function ReservationForm({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const { lang } = useSite();
  const [state, setState] = useState<"idle" | "test">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [info, setInfo] = useState(() => fill(TX.n_emailSubject[lang], { n: getParty() }));
  useEffect(() => {
    const on = (e: Event) => setInfo((v) => (v.trim() === "" || /^\D*\d+\D*$/.test(v) ? fill(TX.n_emailSubject[lang], { n: (e as CustomEvent<number>).detail }) : v));
    window.addEventListener(PARTY_EVENT, on);
    return () => window.removeEventListener(PARTY_EVENT, on);
  }, [lang]);
  const required = ["name", "address", "city", "email", "phone", "date1"];
  const validate = (form: HTMLFormElement) => {
    const data = new FormData(form);
    const errs: Record<string, string> = {};
    for (const k of required) if (!String(data.get(k) ?? "").trim()) errs[k] = UI.fieldMissing[lang];
    const em = String(data.get("email") ?? "").trim();
    if (em && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) errs.email = UI.emailInvalid[lang];
    if (!data.get("call_me")) errs.call_me = UI.consentMissing[lang];
    return errs;
  };
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate(e.currentTarget);
    setErrors(errs);
    if (Object.keys(errs).length) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setState("test");
  };
  const f = fieldCls(tone);
  return (
    <form
      id="formular"
      noValidate
      onSubmit={submit}
      onBlur={(e) => {
        const name = (e.target as unknown as HTMLInputElement).name;
        if (name) setErrors((prev) => ({ ...prev, [name]: validate(e.currentTarget)[name] ?? "" }));
      }}
      className={cn("grid gap-4", className)}
      aria-describedby="res-status"
    >
      <p className="rounded-[14px] bg-suave px-4 py-3 text-[14px] text-marca">{TX.n_formLine[lang]}</p>
      <input type="hidden" name="subject" value="Reservierung" />
      <Field label={TX.fName[lang]} name="name" required auto="name" error={errors.name} tone={tone} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={TX.fFirma[lang]} name="company" auto="organization" tone={tone} />
        <Field label={TX.fAdresse[lang]} name="address" required auto="street-address" error={errors.address} tone={tone} />
        <Field label={TX.fStadt[lang]} name="city" required auto="address-level2" error={errors.city} tone={tone} />
        <Field label={TX.fPlz[lang]} name="plz" auto="postal-code" tone={tone} />
        <Field label={TX.fLand[lang]} name="country" tone={tone}>
          <select name="country" className={f} defaultValue="Schweiz">
            <option value="Schweiz">{TX.fSchweiz[lang]}</option>
          </select>
        </Field>
        <Field label={TX.fKanton[lang]} name="state" tone={tone}>
          <select name="state" className={f} defaultValue="">
            <option value="">{UI.choose[lang]}</option>
            {CANTONS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label={TX.fEmail[lang]} name="email" type="email" required auto="email" error={errors.email} tone={tone} />
        <Field label={TX.fTel[lang]} name="phone" type="tel" required auto="tel" error={errors.phone} tone={tone} />
      </div>
      <label className="flex items-start gap-3 text-[14px] leading-snug">
        <input type="checkbox" name="call_me" className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-destaque)]" aria-invalid={!!errors.call_me} />
        <span>
          {TX.fConsent[lang]}
          {errors.call_me && <span className="mt-1 block text-acento">{errors.call_me}</span>}
        </span>
      </label>
      <label className="block">
        <span className={labelCls}>
          {TX.fZusatz[lang]} <span className="normal-case tracking-normal opacity-70">{TX.fOptional[lang]}</span>
        </span>
        <textarea name="information" rows={3} value={info} onChange={(e) => setInfo(e.target.value)} className={cn(f, "resize-y")} />
      </label>
      <fieldset className="grid gap-4 rounded-[18px] border border-current/15 p-4 sm:grid-cols-2">
        <legend className={cn(labelCls, "px-2")}>{TX.fBedingungen[lang]}</legend>
        <Field label={TX.fDatum[lang]} name="date1" type="date" required error={errors.date1} tone={tone} />
        <Field label={`${TX.fDatum[lang]} · ${TX.fBis[lang]}`} name="date2" type="date" tone={tone} />
        <Field label={TX.fUhr[lang]} name="hours1" tone={tone}>
          <select name="hours1" className={f} defaultValue="19:00">
            {HOURS_OPTS.map((h) => (
              <option key={h}>{h}</option>
            ))}
          </select>
        </Field>
        <Field label={`${TX.fUhr[lang]} · ${TX.fBis[lang]}`} name="hours2" tone={tone}>
          <select name="hours2" className={f} defaultValue="21:00">
            {HOURS_OPTS.map((h) => (
              <option key={h}>{h}</option>
            ))}
          </select>
        </Field>
      </fieldset>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn">
          <span className="btn-roll">
            <span>{TX.fReservieren[lang]}</span>
            <span aria-hidden="true">{TX.fReservieren[lang]}</span>
          </span>
        </button>
        <p className="text-[13px] opacity-70">{TX.fRequired[lang]}</p>
      </div>
      <p id="res-status" role="status" className="text-[15px]">
        {state === "test" && (
          <span className="inline-block rounded-[14px] bg-marca px-4 py-3 text-fundo">
            {TX.n_formChecked[lang]}{" "}
            <a className="link" href={`tel:${BUSINESS.phones[0].tel}`}>
              {BUSINESS.phones[0].show}
            </a>
          </span>
        )}
      </p>
    </form>
  );
}

/** Address + phones + e-mail + GPS as one block. */
export function ContactBlock({ className }: { className?: string }) {
  const { lang } = useSite();
  return (
    <div className={cn("space-y-4", className)}>
      <address className="not-italic leading-relaxed">
        <span className="font-display text-[22px] font-semibold">{BUSINESS.name}</span>
        <br />
        <span className="opacity-75">{TX.kantonZh[lang]}</span>
        <br />
        {BUSINESS.street}
        <br />
        {BUSINESS.city}
      </address>
      <dl className="grid gap-2 text-[16px]">
        <div className="flex gap-3">
          <dt className="w-16 shrink-0 opacity-70">{TX.telLabel[lang]}</dt>
          <dd className="flex flex-col">
            {BUSINESS.phones.map((p) => (
              <a key={p.tel} className="link w-fit" href={`tel:${p.tel}`}>
                {p.show}
              </a>
            ))}
          </dd>
        </div>
        <div className="flex gap-3">
          <dt className="w-16 shrink-0 opacity-70">{TX.emailLabel[lang]}</dt>
          <dd>
            <a className="link" href={`mailto:${BUSINESS.email}`}>
              {BUSINESS.email}
            </a>
          </dd>
        </div>
        <div className="flex gap-3">
          <dt className="w-16 shrink-0 opacity-70">{TX.gpsLabel[lang].replace(/:$/, ":")}</dt>
          <dd className="tabular-nums">{BUSINESS.gps.show}</dd>
        </div>
      </dl>
    </div>
  );
}
