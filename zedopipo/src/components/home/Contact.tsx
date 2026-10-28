import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HTML_LANG, UI } from "@/i18n";
import { CONTACT, FORM_ENDPOINT } from "@/content";
import { PREFILL_EVENT, useSite } from "@/site";
import { cn } from "@/lib/utils";
import { LottieIcon } from "@/lottie/LottieIcon";
import { Heading, Reveal } from "../Reveal";
import { LiveBadge } from "../LiveBadge";
import { ExternalIcon, FacebookIcon, InstagramIcon } from "../icons";

export function Contact() {
  const { lang } = useSite();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the number stays visible */
    }
  };
  const label = "text-xs font-bold uppercase tracking-[0.16em] text-bordeaux";
  const dt = `${label} flex items-center gap-2`;
  return (
    <section id="contact" aria-labelledby="contact-title" className="on-light gutter bg-linen py-20 md:py-28">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading id="contact-title" eyebrow={UI.nearCornavin[lang]} title={UI.contactTitle[lang]} />
          <LiveBadge tone="light" />
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal className="grid content-start gap-8">
            <dl className="grid gap-7 sm:grid-cols-2">
              <div className="group">
                <dt className={dt}>
                  <LottieIcon name="pin" color="#6B1E2E" accent="#E0612B" size={32} mode="hover" />
                  {UI.address[lang]}
                </dt>
                <dd className="mt-1 pl-10 text-lg leading-snug text-charcoal">
                    {CONTACT.street}
                    <br />
                  {CONTACT.city}, {UI.country[lang]}
                </dd>
              </div>
              <div className="group">
                <dt className={dt}>
                  <LottieIcon name="phone" color="#6B1E2E" accent="#E0612B" size={32} mode="hover" />
                  {UI.phone[lang]}
                </dt>
                <dd className="mt-1 flex flex-wrap items-center gap-2 pl-10 text-lg text-charcoal">
                    <a href={CONTACT.tel} className="font-semibold underline decoration-bordeaux/30 underline-offset-4 hover:decoration-bordeaux">
                      {CONTACT.phone}
                    </a>
                    <button type="button" onClick={copy} className="inline-flex min-h-9 items-center rounded-full border border-charcoal/15 px-3 text-xs font-bold text-charcoal hover:border-bordeaux">
                      <span aria-live="polite">{copied ? UI.copied[lang] : UI.copy[lang]}</span>
                    </button>
                </dd>
              </div>
              <div className="group sm:col-span-2">
                <dt className={dt}>
                  <LottieIcon name="clock" color="#6B1E2E" accent="#E0612B" size={32} mode="hover" />
                  {UI.hours[lang]}
                </dt>
                <dd className="mt-1 pl-10 text-lg text-charcoal">
                    <span className="font-semibold">{UI.monSat[lang]}</span>
                    <br />
                    <span className="tabular-nums">12:00 - 14:00 // 19:00 - 22:30</span>
                    <br />
                    <span className="text-ink-soft">
                      {UI.sunday[lang]} : {UI.closed[lang].toLowerCase()}
                    </span>
                </dd>
              </div>
            </dl>
            <MapCard />
            <div>
              <p className={label}>{UI.follow[lang]}</p>
              <div className="mt-3 flex gap-2">
                <a href={CONTACT.instagram} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-charcoal/15 px-4 font-semibold text-charcoal hover:border-bordeaux hover:text-bordeaux">
                  <InstagramIcon />
                  Instagram
                  <span className="sr-only"> ({UI.newTab[lang]})</span>
                </a>
                <a href={CONTACT.facebook} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-charcoal/15 px-4 font-semibold text-charcoal hover:border-bordeaux hover:text-bordeaux">
                  <FacebookIcon />
                  Facebook
                  <span className="sr-only"> ({UI.newTab[lang]})</span>
                </a>
              </div>
            </div>
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
function MapCard() {
  const { lang } = useSite();
  const [show, setShow] = useState(false);
  return (
    <div className="overflow-hidden rounded-[24px] bg-white ring-1 ring-charcoal/10">
      {show && !__ARTIFACT__ ? (
        <iframe title={UI.mapTitle[lang]} src={CONTACT.mapsEmbed} className="aspect-[16/10] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      ) : (
        <div className="relative grid aspect-[16/10] place-items-center bg-[radial-gradient(circle_at_50%_45%,#fff_0,#ebe1d2_70%)] p-6 text-center">
          <svg aria-hidden="true" viewBox="0 0 400 250" className="absolute inset-0 h-full w-full text-bordeaux/15" preserveAspectRatio="xMidYMid slice">
            <path d="M-10 170 C80 150 140 190 230 160 S360 120 420 140" stroke="currentColor" strokeWidth="18" fill="none" />
            <path d="M120 -10 L180 260 M300 -10 L250 260 M-10 80 L410 60" stroke="currentColor" strokeWidth="6" fill="none" />
          </svg>
          <div className="relative grid justify-items-center gap-3">
            {show && __ARTIFACT__ ? (
              <p className="max-w-[36ch] text-[15px] font-semibold text-charcoal">{UI.previewNoEmbed[lang]}</p>
            ) : (
              <>
                <button type="button" onClick={() => setShow(true)} className="inline-flex min-h-11 items-center rounded-full bg-bordeaux px-5 font-bold text-linen hover:bg-bordeaux-deep">
                  {UI.showMap[lang]}
                </button>
                <p className="max-w-[36ch] text-sm text-ink-soft">{UI.mapPrivacy[lang]}</p>
              </>
            )}
          </div>
        </div>
      )}
      <a href={CONTACT.maps} target="_blank" rel="noopener" className="flex min-h-12 items-center justify-between gap-2 border-t border-charcoal/10 px-5 font-semibold text-bordeaux hover:bg-linen">
        {UI.openMaps[lang]}
        <ExternalIcon />
        <span className="sr-only">({UI.newTab[lang]})</span>
      </a>
    </div>
  );
}

type Field = "name" | "phone" | "email" | "message";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function ContactForm() {
  const { lang } = useSite();
  const id = useId();
  const [values, setValues] = useState<Record<Field, string>>({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "test" | "error">("idle");
  const refs = { name: useRef<HTMLInputElement>(null), phone: useRef<HTMLInputElement>(null), email: useRef<HTMLInputElement>(null), message: useRef<HTMLTextAreaElement>(null) };
  const test = !FORM_ENDPOINT;

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const msg = (e as CustomEvent<string>).detail;
      setValues((v) => ({ ...v, message: msg }));
      setState("idle");
      setTimeout(() => refs.name.current?.focus({ preventScroll: true }), 700);
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validate = (v = values) => {
    const e: Partial<Record<Field, string>> = {};
    if (!EMAIL.test(v.email.trim())) e.email = UI.emailError[lang];
    if (!v.message.trim()) e.message = UI.messageError[lang];
    return e;
  };
  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    const first = (["email", "message"] as Field[]).find((f) => e[f]);
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
        body: JSON.stringify({ ...values, language: lang, _subject: `Zé-do-Pipo · ${values.name || values.email}` }),
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
      "mt-2 w-full rounded-xl border-2 bg-white px-4 text-[16px] text-charcoal transition-colors placeholder:text-ink-soft/70 focus:border-bordeaux",
      errors[f] ? "border-ember-deep" : "border-charcoal/12",
    );
  const fieldLabel = (f: Field, text: string, required = false) => (
    <label htmlFor={`${id}-${f}`} className="text-sm font-bold text-charcoal">
      {text}
      {required && (
        <>
          <span aria-hidden="true" className="text-ember-deep"> *</span>
          <span className="sr-only"> ({UI.required[lang]})</span>
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
    <form noValidate onSubmit={submit} lang={HTML_LANG[lang]} className="rounded-[32px] bg-white p-6 shadow-[0_40px_80px_-50px_rgba(27,20,20,0.6)] ring-1 ring-charcoal/8 md:p-8" aria-labelledby={`${id}-title`}>
      <h3 id={`${id}-title`} className="font-display text-3xl font-bold text-bordeaux">
        {UI.writeUs[lang]}
      </h3>
      {test && <p className="mt-3 rounded-xl bg-linen-2 px-4 py-3 text-sm text-charcoal">{UI.testMode[lang]}</p>}
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          {fieldLabel("name", UI.formName[lang])}
          <input ref={refs.name} id={`${id}-name`} name="name" autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} className={cn(input("name"), "h-12")} />
        </div>
        <div>
          {fieldLabel("phone", UI.formPhone[lang])}
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
      <button type="submit" disabled={state === "sending"} className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-bordeaux px-8 font-bold text-linen transition-colors hover:bg-bordeaux-deep disabled:opacity-60">
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
              className={cn("mt-4 rounded-xl px-4 py-3 text-[15px] font-semibold", state === "error" ? "bg-[#fbe4da] text-[#7a2a12]" : "bg-linen-2 text-charcoal")}
            >
              {state === "sent" ? UI.sent[lang] : state === "test" ? UI.testSent[lang] : UI.sendError[lang]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
