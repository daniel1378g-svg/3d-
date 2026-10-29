// Section 11 (#infos, azulejo): a bento grid with live hours (Geneva time), the address and the three
// directions links, getting there as tabs, the seats and terrace, and payment with the euro helper.
import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { copy } from "@/copy";
import { CONTACT } from "@/contact";
import { LOCALE } from "@/i18n";
import { status, terraceOpen, type Status } from "@/hours";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";
import { Arrow, PhoneGlyph, Roll, SplitText } from "@/components/ui";
import { LottieIcon } from "@/lottie/LottieIcon";
import { Tram } from "@/components/illustrations";

const card = "rounded-[24px] p-[clamp(20px,2.4vw,32px)] grid content-start gap-4";

export function Infos() {
  const { lang } = useSite();
  const t = copy(lang);
  const [now, setNow] = useState<Status>(() => status(lang));
  useEffect(() => {
    setNow(status(lang));
    const id = setInterval(() => setNow(status(lang)), 30000);
    return () => clearInterval(id);
  }, [lang]);
  const terrace = terraceOpen();

  return (
    <section id="infos" className="tone-azulejo relative z-[2] py-[clamp(90px,11vw,160px)]" aria-labelledby="infos-title">
      <div className="container grid gap-[clamp(32px,4vw,56px)]">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <SplitText as="h2" id="infos-title" text={t.info.title} className="display fs-xxl text-branco" />
          <p className="meta text-azulejo-claro">{t.info.contactTitle}</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-12">
          {/* Hours, live */}
          <article className={cn(card, "bg-noite text-branco lg:col-span-5 lg:row-span-2")} aria-labelledby="hours-h">
            <div className="flex items-center justify-between gap-3">
              <h3 id="hours-h" className="eyebrow text-dourado">
                {t.info.hoursTitle}
              </h3>
              <span className="group">
                <LottieIcon name="clock" mode="hover" size={40} color="#FFFAF2" accent="#F2B84B" />
              </span>
            </div>
            <p className="flex items-start gap-3 rounded-2xl bg-white/[0.07] p-4" aria-live="polite">
              <span className={cn("pulse-dot mt-2", now.open ? "bg-dourado" : "bg-francesinha")} aria-hidden="true" />
              <span>
                <strong className="font-display text-2xl font-bold uppercase tracking-[0.04em]">{now.label}</strong>
                {now.detail && <span className="text-branco/85"> · {now.detail}</span>}
              </span>
            </p>
            <dl className="m-0 grid gap-0 text-[17px]">
              <div className="flex items-start justify-between gap-4 border-b border-white/15 py-3">
                <dt>{t.info.days}</dt>
                <dd className="m-0 whitespace-pre-line text-right font-bold">{t.info.openHours}</dd>
              </div>
              <div className="flex items-start justify-between gap-4 border-b border-white/15 py-3">
                <dt>{t.info.closedDays}</dt>
                <dd className="m-0 font-bold text-dourado">{t.info.closed}</dd>
              </div>
            </dl>
            <div className="grid gap-1">
              <p className="eyebrow text-dourado">{t.info.kitchenTitle}</p>
              <p>{t.info.kitchenText}</p>
              <p className="text-branco/75">{t.info.last}</p>
            </div>
            <p className="text-sm text-branco/60">{t.info.note}</p>
          </article>

          {/* Address and directions */}
          <article className={cn(card, "bg-branco text-tinta lg:col-span-4")} aria-labelledby="address-h">
            <h3 id="address-h" className="eyebrow text-francesinha">
              {t.info.addressTitle}
            </h3>
            <p className="font-display text-[clamp(28px,2.6vw,40px)] font-bold uppercase leading-[0.95] [hyphens:manual]">
              {CONTACT.street.replace(/-/g, "\u2011").replace(" 3", "\u00a03")}
              <br />
              <span className="text-azulejo">{t.city}</span>
            </p>
            <p className="meta text-[13px] text-cortica">{t.map.heading}</p>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  ["Google Maps", CONTACT.maps.google],
                  ["Apple Plans", CONTACT.maps.apple],
                  ["Waze", CONTACT.maps.waze],
                ] as const
              ).map(([label, url]) => (
                <a key={label} href={url} target="_blank" rel="noopener" className="btn btn--sm btn--azulejo">
                  <Roll>{label}</Roll>
                  <span className="sr-only">{t.ui.newWindow}</span>
                </a>
              ))}
            </div>
          </article>

          {/* Phone */}
          <article className={cn(card, "group bg-dourado text-tinta lg:col-span-3")} aria-labelledby="phone-h">
            <div className="flex items-center justify-between">
              <h3 id="phone-h" className="eyebrow">
                {t.info.phoneTitle}
              </h3>
              <LottieIcon name="phone" mode="hover" size={40} color="#1C1712" accent="#5A1626" />
            </div>
            <a href={CONTACT.phoneHref} className="font-display text-[clamp(30px,2.8vw,40px)] font-bold leading-none tracking-[0.02em] text-tinta no-underline">
              {CONTACT.phoneDisplay}
            </a>
            <p className="text-[15px]">{t.info.phoneText}</p>
            <div className="flex flex-wrap gap-4">
              <a href={CONTACT.facebook} target="_blank" rel="noopener" className="link-line">
                Facebook<span className="sr-only"> {t.ui.newWindow}</span>
              </a>
              <a href={CONTACT.instagram} target="_blank" rel="noopener" className="link-line">
                Instagram<span className="sr-only"> {t.ui.newWindow}</span>
              </a>
            </div>
          </article>

          {/* Getting there */}
          <GettingThere />

          {/* Seats and terrace */}
          <article className={cn(card, "group bg-francesinha text-branco lg:col-span-5")} aria-labelledby="spaces-h">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 id="spaces-h" className="eyebrow">
                {t.info.spacesTitle}
              </h3>
              <span className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-display text-[13px] font-semibold uppercase tracking-[0.12em]", terrace ? "bg-dourado text-tinta" : "bg-white/15 text-branco")}>
                <LottieIcon name="sun" mode="loop" size={22} color={terrace ? "#1C1712" : "#FFFAF2"} accent={terrace ? "#5A1626" : "#FFFAF2"} />
                {terrace ? t.ui.terraceOpen : t.ui.terraceClosed}
              </span>
            </div>
            <p className="font-display text-[clamp(26px,2.4vw,34px)] font-semibold leading-tight">{t.info.spacesText}</p>
          </article>

          {/* Payment and the euro helper */}
          <Payment />
        </div>
      </div>
    </section>
  );
}

function GettingThere() {
  const { lang } = useSite();
  const t = copy(lang);
  const reduce = useReducedMotion();
  const id = useId();
  const tabs = [
    { key: "tram", label: t.ui.tabs.tram, title: t.info.transitTitle, body: t.info.trams },
    { key: "car", label: t.ui.tabs.car, title: t.info.parkingTitle, body: t.info.parkingText },
    { key: "parking", label: t.ui.tabs.parking, title: t.info.parking, body: t.info.parkingBreak },
  ];
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const select = (i: number) => {
    const n = (i + tabs.length) % tabs.length;
    setActive(n);
    refs.current[n]?.focus();
  };
  return (
    <article className={cn(card, "bg-nata text-tinta lg:col-span-7")} aria-labelledby={`${id}-h`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 id={`${id}-h`} className="eyebrow text-francesinha">
          {t.info.route}
        </h3>
        <Tram className="w-[110px]" />
      </div>
      <div role="tablist" aria-labelledby={`${id}-h`} className="flex gap-1 border-b border-tinta/15">
        {tabs.map((tab, i) => (
          <button
            key={tab.key}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") (e.preventDefault(), select(active + 1));
              if (e.key === "ArrowLeft") (e.preventDefault(), select(active - 1));
              if (e.key === "Home") (e.preventDefault(), select(0));
              if (e.key === "End") (e.preventDefault(), select(tabs.length - 1));
            }}
            className={cn("relative min-h-12 cursor-pointer px-4 font-display text-lg font-semibold uppercase tracking-[0.1em]", active === i ? "text-azulejo" : "text-tinta/60")}
          >
            {tab.label}
            {active === i && (
              <motion.span layoutId={`${id}-underline`} className="absolute inset-x-2 -bottom-px h-[3px] rounded-full bg-azulejo" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 480, damping: 38 }} />
            )}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div key={tab.key} role="tabpanel" id={`${id}-panel-${i}`} aria-labelledby={`${id}-tab-${i}`} hidden={active !== i} className="grid gap-3">
          <p className="group flex items-center gap-3 font-display text-2xl font-bold uppercase">
            {tab.key === "tram" && <LottieIcon name="tram" mode="loop" size={40} color="#1F4E99" accent="#C23B26" />}
            {tab.title}
          </p>
          <p className="whitespace-pre-line text-[17px]">{tab.body}</p>
          {tab.key === "car" && (
            <div className="flex flex-wrap gap-4">
              {(
                [
                  ["Google Maps", CONTACT.maps.google],
                  ["Apple Plans", CONTACT.maps.apple],
                  ["Waze", CONTACT.maps.waze],
                ] as const
              ).map(([label, url]) => (
                <a key={label} href={url} target="_blank" rel="noopener" className="link-line text-azulejo">
                  {label} <Arrow external />
                  <span className="sr-only">{t.ui.newWindow}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </article>
  );
}

function Payment() {
  const { lang } = useSite();
  const t = copy(lang);
  const id = useId();
  const [chf, setChf] = useState("");
  const value = Number(chf.replace(",", ".").replace(/[^\d.]/g, ""));
  const eur = value > 0 ? new Intl.NumberFormat(LOCALE[lang], { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value / CONTACT.euroRate) : null;
  const methods = t.info.pay.split(" · ");
  return (
    <article className={cn(card, "bg-branco text-tinta lg:col-span-7")} aria-labelledby={`${id}-h`}>
      <h3 id={`${id}-h`} className="eyebrow text-francesinha">
        {t.info.payTitle}
      </h3>
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
        {methods.map((m) => (
          <li key={m} className="rounded-full bg-nata px-4 py-2 font-display text-[15px] font-semibold uppercase tracking-[0.08em]">
            {m}
          </li>
        ))}
      </ul>
      <p className="text-[15px] text-cortica">{t.info.payEuro}</p>
      <div className="grid gap-3 rounded-2xl bg-nata p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <label className="grid gap-1.5">
          <span className="meta text-[13px]">{t.ui.euroLabel}</span>
          <span className="flex items-center gap-2 rounded-xl bg-branco px-4 shadow-[inset_0_0_0_1.5px_rgba(28,23,18,0.15)] has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-dourado has-[:focus-visible]:shadow-[0_0_0_6px_var(--tinta)]">
            <span className="font-display font-semibold text-cortica">CHF</span>
            <input
              inputMode="decimal"
              autoComplete="off"
              value={chf}
              onChange={(e) => setChf(e.target.value)}
              placeholder="85.00"
              className="min-h-12 w-full min-w-0 bg-transparent text-lg focus-visible:shadow-none focus-visible:outline-none"
              aria-describedby={`${id}-hint`}
            />
          </span>
        </label>
        <output htmlFor={undefined} aria-live="polite" className="min-h-12 font-display text-[clamp(26px,2.6vw,34px)] font-bold leading-[48px] text-azulejo tnum">
          {eur ? t.ui.euroResult(eur) : "—"}
        </output>
        <p id={`${id}-hint`} className="text-sm text-tinta/70 sm:col-span-2">
          {t.ui.euroHint}
        </p>
      </div>
      <a href={CONTACT.phoneHref} className="btn btn--noite justify-self-start">
        <PhoneGlyph />
        <Roll>{t.info.callLabel}</Roll>
      </a>
    </article>
  );
}
