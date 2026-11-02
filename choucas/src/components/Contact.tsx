import { useId, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HTML_LANG, UI } from "@/i18n";
import { CONTACT, FORM_ENDPOINT } from "@/content";
import { HOME } from "@/copy";
import { HOURS, hhmm, type Place } from "@/hours";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";
import { LottieIcon } from "@/lottie/LottieIcon";
import { Heading, Reveal } from "./Reveal";
import { LiveBadge } from "./LiveBadge";
import { ExternalIcon } from "./icons";

const PLACES: { place: Place; name: string; dot: string }[] = [
  { place: "pizzeria", name: "Pizzeria Choucas", dot: "bg-oven" },
  { place: "oasis", name: "Oasis Steakhouse", dot: "bg-ember" },
  { place: "choucalino", name: "Choucalino® Kid’s Club", dot: "bg-sky" },
];
const LINES = { pizzeria: HOME.boxes.pizzeria.hours, oasis: HOME.boxes.oasis.hours, choucalino: HOME.boxes.choucalino.hours };

/** Hours per place with a live badge each (home page figures). */
export function HoursList({ tone = "light", only }: { tone?: "light" | "dark"; only?: Place }) {
  const { lang } = useSite();
  return (
    <ul className="grid gap-3">
      {PLACES.filter((p) => !only || p.place === only).map((p) => (
        <li key={p.place} className={cn("grid gap-2 rounded-2xl p-4 sm:grid-cols-[1fr_auto] sm:items-center", tone === "dark" ? "bg-snow/8" : "bg-white ring-1 ring-ink/8")}>
          <div>
            <p className="flex items-center gap-2 font-display text-xl font-bold">
              <span aria-hidden="true" className={cn("size-2.5 rounded-full", p.dot)} />
              {p.name}
            </p>
            <p className={cn("mt-0.5 tabular-nums", tone === "dark" ? "text-snow/80" : "text-muted")}>
              {LINES[p.place][lang]}
              <span className="sr-only">
                {" "}
                ({hhmm(HOURS[p.place].open)}–{hhmm(HOURS[p.place].close)})
              </span>
            </p>
          </div>
          <LiveBadge place={p.place} tone={tone} />
        </li>
      ))}
    </ul>
  );
}

/** Address, phone, email, booking, hours per place, the map on click and the contact form. */
export function ContactSection({ id = "kontakt", title }: { id?: string; title?: string }) {
  const { lang, book } = useSite();
  const label = "text-xs font-bold uppercase tracking-[0.16em] text-brand-ink";
  const dt = `${label} flex items-center gap-2`;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="on-light gutter bg-snow py-20 md:py-28">
      <div className="wrap">
        <Heading id={`${id}-title`} eyebrow={CONTACT.name} title={title ?? UI.contactTitle[lang]} dot="bg-beak" />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal className="grid content-start gap-8">
            <dl className="grid gap-7 sm:grid-cols-2">
              <div className="group">
                <dt className={dt}>
                  <LottieIcon name="pin" color="#161414" accent="#EE7A00" size={32} mode="hover" />
                  {UI.address[lang]}
                </dt>
                <dd className="mt-1 pl-10 text-lg leading-snug">
                  {CONTACT.name}
                  <br />
                  {CONTACT.street}
                  <br />
                  {CONTACT.city}, {UI.country[lang]}
                </dd>
              </div>
              <div className="group">
                <dt className={dt}>
                  <LottieIcon name="phone" color="#161414" accent="#EE7A00" size={32} mode="hover" />
                  {UI.phone[lang]} · {UI.email[lang]}
                </dt>
                <dd className="mt-1 grid justify-items-start gap-1 pl-10 text-lg">
                  <a href={CONTACT.tel} className="font-semibold underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                    {CONTACT.phone}
                  </a>
                  <a href={CONTACT.mailto} className="underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                    {CONTACT.email}
                  </a>
                </dd>
              </div>
              <div className="group sm:col-span-2">
                <dt className={dt}>
                  <LottieIcon name="calendar" color="#161414" accent="#EE7A00" size={32} mode="hover" />
                  {UI.reservations[lang]}
                </dt>
                <dd className="mt-2 pl-10">
                  <button type="button" onClick={book} className="inline-flex min-h-12 items-center rounded-full bg-beak px-6 font-bold text-ink transition-colors hover:bg-ink hover:text-snow">
                    {UI.book[lang]}
                  </button>
                </dd>
              </div>
              <div className="group sm:col-span-2">
                <dt className={dt}>
                  <LottieIcon name="clock" color="#161414" accent="#EE7A00" size={32} mode="hover" />
                  {UI.hours[lang]}
                </dt>
                <dd className="mt-3">
                  <HoursList />
                  <p className="mt-3 text-sm text-muted">{UI.hoursConflict[lang]}</p>
                </dd>
              </div>
            </dl>
            <MapCard />
          </Reveal>
          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Nothing from Google loads until the visitor asks for the map. */
export function MapCard() {
  const { lang } = useSite();
  const [show, setShow] = useState(false);
  return (
    <div className="overflow-hidden rounded-[24px] bg-white ring-1 ring-ink/10">
      {show && !__ARTIFACT__ ? (
        <iframe title={UI.mapTitle[lang]} src={CONTACT.mapsEmbed} className="aspect-[16/10] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      ) : (
        <div className="relative grid aspect-[16/10] place-items-center bg-[radial-gradient(circle_at_50%_45%,#fff_0,#ece6da_70%)] p-6 text-center">
          <svg aria-hidden="true" viewBox="0 0 400 250" className="absolute inset-0 h-full w-full text-brand/25" preserveAspectRatio="xMidYMid slice">
            <path d="M-10 170 C80 150 140 190 230 160 S360 120 420 140" stroke="currentColor" strokeWidth="18" fill="none" />
            <path d="M120 -10 L180 260 M300 -10 L250 260 M-10 80 L410 60" stroke="currentColor" strokeWidth="6" fill="none" />
          </svg>
          <div className="relative grid justify-items-center gap-3">
            {show && __ARTIFACT__ ? (
              <p className="max-w-[36ch] text-[15px] font-semibold text-ink">{UI.mapPreviewNote[lang]}</p>
            ) : (
              <>
                <button type="button" onClick={() => setShow(true)} className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 font-bold text-snow hover:bg-ink-2">
                  {UI.showMap[lang]}
                </button>
                <p className="max-w-[36ch] text-sm text-muted">{UI.mapPrivacy[lang]}</p>
              </>
            )}
          </div>
        </div>
      )}
      <a href={CONTACT.maps} target="_blank" rel="noopener" className="flex min-h-12 items-center justify-between gap-2 border-t border-ink/10 px-5 font-semibold text-brand-ink hover:bg-snow">
        {UI.openMaps[lang]}
        <ExternalIcon />
        <span className="sr-only">({UI.newTab[lang]})</span>
      </a>
    </div>
  );
}

type Field = "name" | "phone" | "email" | "message";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactForm() {
  const { lang } = useSite();
  const id = useId();
  const [values, setValues] = useState<Record<Field, string>>({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "test" | "error">("idle");
  const refs = { name: useRef<HTMLInputElement>(null), phone: useRef<HTMLInputElement>(null), email: useRef<HTMLInputElement>(null), message: useRef<HTMLTextAreaElement>(null) };
  const test = !FORM_ENDPOINT;

  const validate = (v = values) => {
    const e: Partial<Record<Field, string>> = {};
    if (!v.name.trim()) e.name = UI.nameError[lang];
    if (!EMAIL.test(v.email.trim())) e.email = UI.emailError[lang];
    if (!v.message.trim()) e.message = UI.messageError[lang];
    return e;
  };
  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    const first = (["name", "email", "message"] as Field[]).find((f) => e[f]);
    if (first) {
      refs[first].current?.focus();
      return;
    }
    if (test) {
      setState("test");
      return;
    }
    setState("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, language: lang, _subject: `choucas.ch · ${values.name}` }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("sent");
      setValues({ name: "", phone: "", email: "", message: "" });
    } catch {
      setState("error");
    }
  };
  const set = (f: Field, v: string) => {
    setValues((s) => ({ ...s, [f]: v }));
    if (errors[f]) setErrors((er) => ({ ...er, [f]: validate({ ...values, [f]: v })[f] }));
  };
  const input = (f: Field) =>
    cn(
      "mt-2 w-full rounded-xl border-2 bg-white px-4 text-[16px] text-ink transition-colors placeholder:text-muted/70 focus:border-ink",
      errors[f] ? "border-oven" : "border-ink/15",
    );
  const fieldLabel = (f: Field, text: string, required = false) => (
    <label htmlFor={`${id}-${f}`} className="text-sm font-bold text-ink">
      {text}
      {required && (
        <>
          <span aria-hidden="true" className="text-oven"> *</span>
        </>
      )}
    </label>
  );
  const error = (f: Field) =>
    errors[f] && (
      <p id={`${id}-${f}-err`} className="mt-1.5 text-sm font-semibold text-[#a3381a]">
        {errors[f]}
      </p>
    );

  return (
    <form noValidate onSubmit={submit} lang={HTML_LANG[lang]} className="rounded-[32px] bg-white p-6 shadow-[0_40px_80px_-50px_rgba(22,20,20,0.6)] ring-1 ring-ink/8 md:p-8" aria-labelledby={`${id}-title`}>
      <h3 id={`${id}-title`} className="font-display text-3xl font-bold text-ink">
        {UI.formTitle[lang]}
      </h3>
      {test && <p className="mt-3 rounded-xl bg-snow-2 px-4 py-3 text-sm text-ink">{UI.testMode[lang]}</p>}
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          {fieldLabel("name", UI.formName[lang], true)}
          <input
            ref={refs.name}
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            required
            aria-invalid={!!errors.name || undefined}
            aria-describedby={errors.name ? `${id}-name-err` : undefined}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            className={cn(input("name"), "h-12")}
          />
          {error("name")}
        </div>
        <div>
          {fieldLabel("phone", `${UI.formPhone[lang]} (${UI.optional[lang]})`)}
          <input ref={refs.phone} id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" inputMode="tel" value={values.phone} onChange={(e) => set("phone", e.target.value)} className={cn(input("phone"), "h-12")} />
        </div>
        <div className="sm:col-span-2">
          {fieldLabel("email", UI.formEmail[lang], true)}
          <input
            ref={refs.email}
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            aria-invalid={!!errors.email || undefined}
            aria-describedby={errors.email ? `${id}-email-err` : undefined}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => values.email && setErrors((er) => ({ ...er, email: validate().email }))}
            className={cn(input("email"), "h-12")}
          />
          {error("email")}
        </div>
        <div className="sm:col-span-2">
          {fieldLabel("message", UI.formMessage[lang], true)}
          <textarea
            ref={refs.message}
            id={`${id}-message`}
            name="message"
            rows={5}
            required
            aria-invalid={!!errors.message || undefined}
            aria-describedby={errors.message ? `${id}-message-err` : undefined}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            className={cn(input("message"), "resize-y py-3 leading-relaxed")}
          />
          {error("message")}
        </div>
      </div>
      <button type="submit" disabled={state === "sending"} className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-8 font-bold text-snow transition-colors hover:bg-ink-2 disabled:opacity-60">
        {UI.send[lang]}
      </button>
      <div aria-live="polite" className="min-h-0">
        <AnimatePresence>
          {(state === "sent" || state === "test" || state === "error") && (
            <motion.p
              key={state}
              initial={{ opacity: 0, transform: "translateY(6px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              exit={{ opacity: 0 }}
              className={cn("mt-4 rounded-xl px-4 py-3 text-[15px] font-semibold", state === "error" ? "bg-[#fbe4da] text-[#7a2a12]" : "bg-snow-2 text-ink")}
            >
              {state === "sent" ? UI.sent[lang] : state === "test" ? UI.testSent[lang] : UI.sendError[lang]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
