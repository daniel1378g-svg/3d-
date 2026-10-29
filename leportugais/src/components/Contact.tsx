// Contact pieces shared by the home bento and the contact page: today's status (Geneva time), getting
// there as tabs, the map that loads only on tap, and the contact form.
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import * as Tabs from "@radix-ui/react-tabs";
import { LOCALE, UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TEXT } from "@/content/site";
import { genevaToday, isClosedDay } from "@/lib/time";
import { cn } from "@/lib/utils";
import { LottieIcon } from "./lottie/LottieIcon";
import { IconExternal, IconPin } from "./icons";

/** "Ouvert aujourd'hui" Tuesday to Saturday, else "Fermé aujourd'hui · ouvert dès mardi". No times: the live site gives none. */
export function OpenToday({ className }: { className?: string }) {
  const { lang } = useSite();
  const [today, setToday] = useState(() => genevaToday());
  useEffect(() => {
    const id = setInterval(() => setToday(genevaToday()), 60_000);
    return () => clearInterval(id);
  }, []);
  const closed = isClosedDay(today);
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <p className="eyebrow text-espuma">
        {UI.today[lang]} · {new Intl.DateTimeFormat(LOCALE[lang], { weekday: "long", day: "numeric", month: "long", timeZone: "Europe/Zurich" }).format(new Date())}
      </p>
      <p className="flex items-center gap-3 font-display text-[clamp(30px,2.6vw,42px)] font-extrabold uppercase leading-none">
        <span className={cn("relative h-3.5 w-3.5 shrink-0 rounded-full", closed ? "bg-coral" : "bg-[#5fd08a]")}>
          <span className={cn("absolute inset-0 rounded-full [animation:pulse-dot_1.8s_ease-out_3]", closed ? "bg-coral" : "bg-[#5fd08a]")} />
        </span>
        {closed ? UI.closedToday[lang] : UI.openToday[lang]}
      </p>
      <p className="font-bold">{TEXT.closed[lang]}</p>
      <p className="text-[13px] text-espuma">{UI.genevaTime[lang]}</p>
    </div>
  );
}

export function GettingThere({ className, full = false }: { className?: string; full?: boolean }) {
  const { lang } = useSite();
  const [tab, setTab] = useState("tram");
  const tabs = [
    { id: "tram", label: UI.tram[lang], icon: "tram" as const },
    { id: "leman", label: "Léman Express", icon: "tram" as const },
    { id: "parking", label: UI.parking[lang], icon: "bag" as const },
  ];
  return (
    <Tabs.Root value={tab} onValueChange={setTab} className={className}>
      <Tabs.List aria-label={UI.gettingThere[lang]} className="relative flex flex-wrap gap-1 border-b border-branco/20">
        {tabs.map((t) => (
          <Tabs.Trigger key={t.id} value={t.id} className="relative px-3 pb-3 pt-1 font-display text-[16px] font-semibold uppercase tracking-[0.1em] text-espuma data-[state=active]:text-branco">
            {t.label}
            {tab === t.id && <motion.span layoutId={full ? "gt-line-page" : "gt-line"} className="absolute inset-x-2 -bottom-px h-[3px] rounded-full bg-dourado" transition={{ type: "spring", stiffness: 480, damping: 38 }} />}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <Tabs.Content value="tram" className="group pt-5 outline-none">
        <div className="flex items-start gap-4">
          <LottieIcon name="tram" size={48} color="#FFFAF2" accent="#F2C05A" mode="loop" />
          <div>
            <p className="eyebrow text-espuma">{TEXT.tpg[lang]}</p>
            <ul className="mt-2 list-none space-y-2">
              <li>{TEXT.tramA[lang]}</li>
              <li>{TEXT.tramB[lang]}</li>
            </ul>
          </div>
        </div>
      </Tabs.Content>
      <Tabs.Content value="leman" className="pt-5 outline-none">
        <div className="flex items-start gap-4">
          <LottieIcon name="tram" size={48} color="#FFFAF2" accent="#F2C05A" mode="loop" />
          <p>{TEXT.leman[lang]}</p>
        </div>
      </Tabs.Content>
      <Tabs.Content value="parking" className="pt-5 outline-none">
        <p className="flex items-start gap-4">
          <span aria-hidden="true" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-branco font-display text-2xl font-extrabold text-azulejo">
            P
          </span>
          <span>{TEXT.parking[lang]}</span>
        </p>
      </Tabs.Content>
    </Tabs.Root>
  );
}

export function MapLinks({ className }: { className?: string }) {
  const { lang } = useSite();
  const links = [
    { label: UI.planAcces[lang], url: BUSINESS.mapUrl },
    { label: UI.appleMaps[lang], url: BUSINESS.appleUrl },
    { label: "Waze", url: BUSINESS.wazeUrl },
  ];
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {links.map((k, i) => (
        <a key={k.url} href={k.url} target="_blank" rel="noopener noreferrer" className={cn("btn btn--sm", i ? "btn--ghost text-branco" : "")}>
          {i === 0 ? <IconPin size={16} /> : <IconExternal size={16} />}
          <span className="btn-roll">
            <span>{k.label}</span>
            <span aria-hidden="true">{k.label}</span>
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
  if (on && !__ARTIFACT__)
    return <iframe title={UI.planAcces[lang]} src={BUSINESS.mapEmbed} className={cn("h-full min-h-[320px] w-full rounded-[20px] border-0", className)} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />;
  return (
    <div className={cn("grid min-h-[320px] place-items-center rounded-[20px] bg-branco/10 p-6 text-center", className)}>
      <div className="flex flex-col items-center gap-3">
        <IconPin size={36} className="text-dourado" />
        <p className="max-w-[320px] text-[15px] text-espuma">{UI.mapNote[lang]}</p>
        {on && __ARTIFACT__ ? (
          <a href={BUSINESS.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn--sm">
            {UI.planAcces[lang]} <span className="sr-only">{UI.externalNew[lang]}</span>
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

const ENDPOINT = (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) ?? "";

/**
 * The contact form: name and e-mail required, subject, message. Spam protection: a hidden honeypot field and
 * a minimum fill time instead of the old captcha. It posts to a Formspree-compatible endpoint
 * (VITE_FORM_ENDPOINT); without one it runs in test mode and says so.
 */
export function ContactForm({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const { lang } = useSite();
  const [state, setState] = useState<"idle" | "sending" | "sent" | "test" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const opened = useRef(Date.now());
  const field = cn("mt-1.5 w-full rounded-[14px] px-4 py-3 text-[16px] outline-none transition-shadow focus-visible:shadow-[0_0_0_3px_var(--color-dourado)]", tone === "dark" ? "bg-branco/10 text-branco placeholder:text-espuma/60" : "bg-sal text-tinta");
  const label = "font-display text-[13px] font-semibold uppercase tracking-[0.16em]";

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const errs: Record<string, string> = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    if (!name) errs.name = UI.fieldMissing[lang];
    if (!email) errs.email = UI.fieldMissing[lang];
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = UI.emailInvalid[lang];
    setErrors(errs);
    if (Object.keys(errs).length) {
      form.querySelector<HTMLInputElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    // bots fill the hidden field or submit within a second or two
    if (data.get("company") || Date.now() - opened.current < 2500) {
      setState("sent");
      return;
    }
    if (!ENDPOINT) {
      setState("test");
      return;
    }
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
    <form noValidate onSubmit={submit} className={cn("grid gap-4", className)} aria-describedby="form-status">
      {!ENDPOINT && <p className={cn("rounded-[14px] px-4 py-3 text-[14px]", "bg-dourado text-tinta")}>{UI.testMode[lang]}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={label}>
            {UI.name[lang]} <span className="normal-case tracking-normal">({UI.required[lang]})</span>
          </span>
          <input name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} className={field} />
          {errors.name && (
            <span id="err-name" className="mt-1 block text-[14px] text-dourado">
              {errors.name}
            </span>
          )}
        </label>
        <label className="block">
          <span className={label}>
            {UI.yourEmail[lang]} <span className="normal-case tracking-normal">({UI.required[lang]})</span>
          </span>
          <input name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} className={field} />
          {errors.email && (
            <span id="err-email" className="mt-1 block text-[14px] text-dourado">
              {errors.email}
            </span>
          )}
        </label>
      </div>
      <label className="block">
        <span className={label}>{UI.subject[lang]}</span>
        <input name="subject" className={field} />
      </label>
      <label className="block">
        <span className={label}>{UI.message[lang]}</span>
        <textarea name="message" rows={5} className={cn(field, "resize-y")} />
      </label>
      <label aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        Company
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
      <input type="hidden" name="_subject" value="Le Portugais · site" />
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={state === "sending"} className="btn">
          <span className="btn-roll">
            <span>{state === "sending" ? UI.sending[lang] : UI.send[lang]}</span>
            <span aria-hidden="true">{state === "sending" ? UI.sending[lang] : UI.send[lang]}</span>
          </span>
        </button>
        <p id="form-status" role="status" className="text-[15px]">
          {state === "sent" && UI.sent[lang]}
          {state === "test" && UI.testSent[lang]}
          {state === "error" && (
            <>
              {UI.formError[lang]}{" "}
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
