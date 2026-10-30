// Contact form with the live site's fields (Name, E-Mail, Betreff, Nachricht, Datenschutzhinweis). With
// VITE_FORM_ENDPOINT (Formspree-compatible) it sends; without it — as in this preview — it never pretends to send:
// it opens the visitor's e-mail program with the finished message to info@boinabrasa.ch.
import { useState, type FormEvent } from "react";
import { fill } from "@/i18n";
import { useSite } from "@/site";
import { EMAIL, PHONE } from "@/content/facts";
import { cn } from "@/lib/utils";
import { IconMail, IconPhone } from "../icons";

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;
type Errors = Partial<Record<"name" | "email" | "subject" | "message" | "consent", string>>;

export function ContactForm() {
  const { t, href, go } = useSite();
  const [v, setV] = useState({ name: "", email: "", subject: "", message: "", consent: false, website: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "mailto" | "error">("idle");
  const set = (k: keyof typeof v) => (e: { target: { value: string; checked?: boolean } }) => setV({ ...v, [k]: k === "consent" ? !!e.target.checked : e.target.value });
  const validate = () => {
    const e: Errors = {};
    if (!v.name.trim()) e.name = t.contact.fieldMissing;
    if (!v.email.trim()) e.email = t.contact.fieldMissing;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = t.contact.emailInvalid;
    if (!v.subject.trim()) e.subject = t.contact.fieldMissing;
    if (!v.message.trim()) e.message = t.contact.fieldMissing;
    if (!v.consent) e.consent = t.contact.consentMissing;
    return e;
  };
  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (v.website) return; // honeypot
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`cf-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    if (!ENDPOINT) {
      const body = `${v.message}\n\n— ${v.name} <${v.email}>`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(v.subject)}&body=${encodeURIComponent(body)}`;
      setState("mailto");
      return;
    }
    setState("sending");
    try {
      const r = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ name: v.name, email: v.email, subject: v.subject, message: v.message }) });
      setState(r.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  };
  const field = (k: "name" | "email" | "subject", type = "text", auto?: string) => (
    <label className="block">
      <span className="label">{t.contact[k]} <span aria-hidden="true">*</span></span>
      <input id={`cf-${k}`} className="field" type={type} value={v[k]} onChange={set(k)} autoComplete={auto} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `cf-${k}-err` : undefined} required />
      {errors[k] && <span id={`cf-${k}-err`} className="mt-1.5 block text-sm text-[#ff9b85]">{errors[k]}</span>}
    </label>
  );
  const n = Object.keys(errors).length;
  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5" aria-labelledby="cf-title">
      <h3 id="cf-title" className="display text-[2.4rem]">{t.contact.formTitle}</h3>
      <p className="text-sm opacity-70">{t.contact.requiredNote}</p>
      {n > 0 && <p role="alert" className="rounded-[14px] bg-[#e3593a]/15 p-3 text-sm">{fill(t.contact.errorsTitle, { n })}</p>}
      <div className="grid gap-5 sm:grid-cols-2">
        {field("name", "text", "name")}
        {field("email", "email", "email")}
      </div>
      {field("subject")}
      <label className="block">
        <span className="label">{t.contact.message} <span aria-hidden="true">*</span></span>
        <textarea id="cf-message" className="field min-h-[150px] resize-y" value={v.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "cf-message-err" : undefined} required />
        {errors.message && <span id="cf-message-err" className="mt-1.5 block text-sm text-[#ff9b85]">{errors.message}</span>}
      </label>
      <input type="text" name="website" value={v.website} onChange={set("website")} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label className="flex items-start gap-3 text-sm">
        <input id="cf-consent" type="checkbox" checked={v.consent} onChange={set("consent")} className="mt-1 h-5 w-5 accent-[#f26a2e]" aria-invalid={!!errors.consent} aria-describedby="cf-consent-text" />
        <span id="cf-consent-text">
          <strong>{t.contact.privacy} *</strong> — {t.contact.consent}{" "}
          <a className="link-u" href={href("datenschutz")} onClick={(e) => { e.preventDefault(); go("datenschutz"); }}>{t.nav.datenschutz}</a>
          {errors.consent && <span className="mt-1 block text-[#ff9b85]">{errors.consent}</span>}
        </span>
      </label>
      {!ENDPOINT && <p className="text-sm opacity-70">{t.contact.mailtoNote}</p>}
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="pill" disabled={state === "sending"}>{state === "sending" ? t.contact.sending : t.contact.submit}</button>
        <p role="status" className={cn("text-sm", state === "error" && "text-[#ff9b85]")}>
          {state === "sent" ? t.contact.sent : state === "mailto" ? t.contact.mailtoDone : state === "error" ? t.contact.error : ""}
        </p>
      </div>
    </form>
  );
}

export function ContactSection() {
  const { t } = useSite();
  return (
    <section id="kontakt" data-anchor="kontakt" className="skin-mato py-24 md:py-32" aria-labelledby="contact-title">
      <div className="gutter">
        <div className="wrap grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="kicker text-[#9fd8b6]" data-lang-stagger>{t.contact.kicker}</p>
            <h2 id="contact-title" className="display mt-3 text-[clamp(3rem,7vw,7rem)]">{t.contact.title}</h2>
            <div className="mt-8 flex flex-col gap-3">
              <a className="pill pill-cream self-start" href={PHONE.href}><IconPhone size={18} />{PHONE.display}</a>
              <a className="pill pill-ghost self-start text-creme" href={`mailto:${EMAIL}`}><IconMail size={18} />{EMAIL}</a>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
