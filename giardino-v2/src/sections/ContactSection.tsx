// "Visit & contact": the address with routes in Google Maps, Apple Maps and Waze, the phone (reservations 10–23 h),
// the e-mail, today's status and the contact form with the live site's fields.
// The form posts only when a real endpoint is configured (VITE_FORM_ENDPOINT, Formspree-compatible). Without one it
// says so and hands the finished message to the visitor's own e-mail program – it never claims to have sent anything.
import { useRef, useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { UI, type PageKey } from "@/i18n";
import { useSite } from "@/site";
import { TX } from "@/content/copy";
import { BUSINESS } from "@/content/business";
import { cn } from "@/lib/utils";
import { FadeIn, SplitReveal } from "@/components/Reveal";
import { ClosureNotice, OpenStatus, TodayLine } from "@/components/Hours";
import { PillButton } from "@/components/ui/Pill";
import { IconExternal, IconMail, IconPhone, IconPin } from "@/components/icons";

const ENDPOINT = (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) ?? "";
type Field = "message" | "name" | "address" | "city" | "phone" | "email" | "consent";
type ErrorCode = "missing" | "email" | "consent";

export function Directions({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const { lang } = useSite();
  const links = [
    { label: "Google Maps", href: BUSINESS.maps.googleDirections },
    { label: TX.appleMaps[lang], href: BUSINESS.maps.apple },
    { label: "Waze", href: BUSINESS.maps.waze },
  ];
  return (
    <div className={className}>
      <p className="eyebrow opacity-80">{TX.directions[lang]}</p>
      <ul className="mt-3 flex list-none flex-wrap gap-2">
        {links.map((x) => (
          <li key={x.label}>
            <a href={x.href} target="_blank" rel="noopener noreferrer" className={cn("btn btn--sm", tone === "dark" ? "btn--dark" : "btn--cream")}>
              <IconPin size={16} />
              <span className="btn-roll">
                <span>{x.label}</span>
                <span aria-hidden="true">{x.label}</span>
              </span>
              <IconExternal size={14} className="opacity-70" />
              <span className="sr-only"> ({UI.newTab[lang]})</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ContactForm({ className }: { className?: string }) {
  const { lang, href, go } = useSite();
  const [errors, setErrors] = useState<Partial<Record<Field, ErrorCode>>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "handed" | "failed">("idle");
  const [summary, setSummary] = useState("");
  const [copied, setCopied] = useState(false);
  const opened = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const msg = (c?: ErrorCode) => (c === "email" ? UI.emailInvalid[lang] : c === "consent" ? UI.consentMissing[lang] : c ? UI.fieldMissing[lang] : "");

  const validate = (form: HTMLFormElement) => {
    const d = new FormData(form);
    const v = (k: string) => String(d.get(k) ?? "").trim();
    const e: Partial<Record<Field, ErrorCode>> = {};
    if (!v("message")) e.message = "missing";
    if (!v("name")) e.name = "missing";
    if (!v("email")) e.email = "missing";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v("email"))) e.email = "email";
    if (!d.get("consent")) e.consent = "consent";
    return e;
  };
  const body = (d: FormData) =>
    [
      `${TX.fMessage[lang]}:`,
      String(d.get("message") ?? "").trim(),
      "",
      `${TX.fName[lang]}: ${d.get("name") ?? ""}`,
      `${TX.fAddress[lang]}: ${d.get("address") ?? ""}`,
      `${TX.fCity[lang]}: ${d.get("city") ?? ""}`,
      `${TX.fPhone[lang]}: ${d.get("phone") ?? ""}`,
      `${TX.fEmail[lang]}: ${d.get("email") ?? ""}`,
    ].join("\n");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const errs = validate(form);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      setState("idle");
      return;
    }
    const d = new FormData(form);
    if (d.get("company")) return; // a filled honeypot: a bot – nothing happens, nothing is claimed
    const text = body(d);
    setSummary(text);
    if (!ENDPOINT) {
      const subject = `Pizzeria Giardino · ${TX.mailSubject[lang]}`;
      window.location.href = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
      setState("handed");
      return;
    }
    if (Date.now() - opened.current < 1500) return;
    setState("sending");
    try {
      d.append("_subject", `Pizzeria Giardino · ${TX.mailSubject[lang]}`);
      d.append("language", lang);
      const res = await fetch(ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: d });
      if (res.ok) {
        setState("sent");
        form.reset();
      } else setState("failed");
    } catch {
      setState("failed");
    }
  };

  const input = "mt-1.5 w-full rounded-[14px] bg-white px-4 py-3 text-[16px] text-ink shadow-[inset_0_0_0_1px_rgba(27,27,27,0.18)] outline-none transition-shadow focus-visible:shadow-[inset_0_0_0_2px_var(--color-olive),0_0_0_3px_var(--color-gold)] aria-[invalid=true]:shadow-[inset_0_0_0_2px_#b42318]";
  const label = "font-display text-[13px] font-semibold uppercase tracking-[0.16em]";
  const err = (f: Field) =>
    errors[f] ? (
      <motion.span id={`err-${f}`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 block text-[14px] font-semibold text-[#b42318]">
        {msg(errors[f])}
      </motion.span>
    ) : null;
  const field = (f: Exclude<Field, "message" | "consent">, text: string, opts: { type?: string; auto: string; required?: boolean }) => (
    <label className="block">
      <span className={label}>
        {text} <span className="normal-case tracking-normal text-muted">({opts.required ? UI.required[lang] : UI.optional[lang]})</span>
      </span>
      <input name={f} type={opts.type ?? "text"} autoComplete={opts.auto} required={opts.required} aria-required={opts.required || undefined} aria-invalid={!!errors[f] || undefined} aria-describedby={errors[f] ? `err-${f}` : undefined} className={input} />
      {err(f)}
    </label>
  );
  const privacyHref = href("privacy" as PageKey);
  const [before, after] = TX.fConsent[lang].split("{privacy}");
  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={submit}
      onChange={(e) => {
        // a field that has shown an error re-checks itself while it is being corrected (not on blur: the message
        // disappearing would move the layout under the pointer); read the form now, React clears currentTarget later
        const name = (e.target as unknown as HTMLInputElement).name as Field;
        if (!name || !errors[name]) return;
        const next = validate(e.currentTarget)[name];
        setErrors((prev) => ({ ...prev, [name]: next }));
      }}
      className={cn("grid gap-4", className)}
      aria-describedby="form-mode"
    >
      <p id="form-mode" className="rounded-[14px] bg-gold/70 px-4 py-3 text-[14px] leading-snug text-ink">
        {ENDPOINT ? TX.formLead[lang] : TX.formNoBackend[lang]}
      </p>
      {hasErrors && (
        <p role="alert" className="rounded-[14px] bg-[#b42318] px-4 py-3 text-[14px] font-semibold text-white">
          {UI.formErrors[lang]}
        </p>
      )}
      <label className="block">
        <span className={label}>
          {TX.fMessage[lang]} <span className="normal-case tracking-normal text-muted">({UI.required[lang]})</span>
        </span>
        <textarea name="message" rows={5} required aria-required aria-invalid={!!errors.message || undefined} aria-describedby={errors.message ? "err-message" : undefined} className={cn(input, "resize-y")} />
        {err("message")}
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        {field("name", TX.fName[lang], { auto: "name", required: true })}
        {field("email", TX.fEmail[lang], { type: "email", auto: "email", required: true })}
        {field("address", TX.fAddress[lang], { auto: "street-address" })}
        {field("city", TX.fCity[lang], { auto: "address-level2" })}
        {field("phone", TX.fPhone[lang], { type: "tel", auto: "tel" })}
      </div>
      <div>
        <label className="flex items-start gap-3">
          <input name="consent" type="checkbox" required aria-required aria-invalid={!!errors.consent || undefined} aria-describedby={errors.consent ? "err-consent" : undefined} className="mt-0.5 h-6 w-6 shrink-0 accent-[#6e6140]" />
          <span className="text-[15px] leading-snug">
            {before}
            <a
              className="link font-semibold"
              href={privacyHref}
              onClick={(e) => {
                e.preventDefault();
                go("privacy");
              }}
            >
              {TX.fConsentLink[lang]}
            </a>
            {after} <span className="text-muted">({UI.required[lang]})</span>
          </span>
        </label>
        {err("consent")}
      </div>
      <label aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        Company
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={state === "sending"} className="btn btn--dark">
          <IconMail size={18} />
          <span className="btn-roll">
            <span>{state === "sending" ? UI.sending[lang] : ENDPOINT ? UI.send[lang] : UI.openInMail[lang]}</span>
            <span aria-hidden="true">{state === "sending" ? UI.sending[lang] : ENDPOINT ? UI.send[lang] : UI.openInMail[lang]}</span>
          </span>
        </button>
      </div>
      <div role="status" aria-live="polite" className="text-[15px] leading-relaxed">
        {state === "sent" && <p className="rounded-[14px] bg-olive px-4 py-3 text-white">{TX.formSent[lang]}</p>}
        {state === "failed" && (
          <p className="rounded-[14px] bg-[#b42318] px-4 py-3 text-white">
            {TX.formFailed[lang]}{" "}
            <a className="link font-semibold" href={`mailto:${BUSINESS.email}`}>
              {BUSINESS.email}
            </a>
          </p>
        )}
        {state === "handed" && (
          <div className="rounded-[14px] bg-cream px-4 py-3 text-ink">
            <p>{TX.formHanded[lang]}</p>
            <button
              type="button"
              className="btn btn--sm btn--olive mt-3"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(`${BUSINESS.email}\n\n${summary}`);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2400);
                } catch {
                  setCopied(false);
                }
              }}
            >
              <span className="btn-roll">
                <span>{copied ? TX.copied[lang] : TX.copyText[lang]}</span>
                <span aria-hidden="true">{copied ? TX.copied[lang] : TX.copyText[lang]}</span>
              </span>
            </button>
          </div>
        )}
      </div>
    </form>
  );
}

export function ContactSection({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  const { lang, book } = useSite();
  return (
    <section id="contact" data-anchor data-nav="contact" className="tex-leaf relative overflow-hidden bg-olive py-24 text-white md:py-36" aria-labelledby="contact-title">
      <div className="container-x">
        <p className="eyebrow text-gold">Contatti · {BUSINESS.town}</p>
        <SplitReveal as={heading} id="contact-title" text={TX.contactTitle[lang]} className="mt-4 fs-xxl font-extrabold" />
        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <FadeIn className="rounded-[28px] bg-cream p-7 text-ink lg:col-span-5 md:p-9">
            <div id="arrival" data-anchor>
              <p className="eyebrow text-muted">{TX.centre[lang]}</p>
              <address className="mt-4 font-display text-[clamp(30px,2.8vw,44px)] font-extrabold uppercase not-italic leading-[0.95]">
                {BUSINESS.street}
                <br />
                {BUSINESS.postcode} {BUSINESS.town}
              </address>
              <Directions className="mt-7" />
            </div>
          </FadeIn>
          <FadeIn delay={0.06} className="flex flex-col justify-between gap-6 rounded-[28px] bg-gold p-7 text-ink lg:col-span-4 md:p-9">
            <div>
              <p className="eyebrow">{UI.bookingTitle[lang]}</p>
              <a href={`tel:${BUSINESS.tel}`} className="mt-4 block font-display text-[clamp(32px,3vw,46px)] font-extrabold leading-none tracking-[0.01em]">
                <span className="link">{BUSINESS.phone}</span>
              </a>
              <p className="mt-3 text-[15px]">{UI.phoneHours[lang]}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href={`tel:${BUSINESS.tel}`} className="btn btn--dark btn--sm">
                <IconPhone size={16} />
                <span className="btn-roll">
                  <span>{UI.call[lang]}</span>
                  <span aria-hidden="true">{UI.call[lang]}</span>
                </span>
              </a>
              <PillButton size="sm" variant="cream" onClick={book}>
                {UI.reserve[lang]}
              </PillButton>
            </div>
          </FadeIn>
          <FadeIn delay={0.12} className="flex flex-col justify-between gap-6 rounded-[28px] bg-ink p-7 lg:col-span-3 md:p-9">
            <p className="eyebrow text-gold">E-mail</p>
            <a href={`mailto:${BUSINESS.email}`} className="break-words font-display text-[clamp(22px,1.8vw,28px)] font-bold leading-tight">
              <span className="link">{BUSINESS.email}</span>
            </a>
            <OpenStatus />
            <TodayLine className="text-[14px] text-cream/85" />
          </FadeIn>
          <div className="grid gap-5 lg:col-span-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <FadeIn className="rounded-[28px] bg-olive-deep p-7 md:p-9">
              <h3 className="font-display text-[clamp(34px,3vw,52px)] font-extrabold uppercase leading-none">{TX.formTitle[lang]}</h3>
              <p className="mt-4 text-[17px] leading-relaxed text-cream/90">{TX.formLead[lang]}</p>
              <ClosureNotice className="mt-6" />
            </FadeIn>
            <FadeIn delay={0.06} className="rounded-[28px] bg-ivory p-6 text-ink md:p-9">
              <ContactForm />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
