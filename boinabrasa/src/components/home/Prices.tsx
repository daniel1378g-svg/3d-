// Prices from the live site on wine red: the adult price huge, children and buffet-only beside it, what is
// included, and a small calculator for a table (rodizio + buffet only; drinks and desserts are extra).
import { useState } from "react";
import { useSite } from "@/site";
import { PRICES, URLS } from "@/content/facts";
import { asset, cn } from "@/lib/utils";
import { Reveal } from "../Reveal";
import { IconArrow, IconExternal, IconMinus, IconPlus } from "../icons";

const chf = (n: number) => `CHF ${n}.–`;

function Stepper({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  const { t } = useSite();
  return (
    <div className="flex items-center justify-between gap-3 border-b border-creme/12 py-3">
      <span className="text-creme/85">{label}</span>
      <div className="flex items-center gap-2">
        <button type="button" className="icon-btn h-9 w-9 disabled:opacity-30" disabled={value <= 0} onClick={() => onChange(value - 1)} aria-label={`${label}: ${t.reservation.fewer}`}><IconMinus size={16} /></button>
        <output className="w-8 text-center font-display text-[1.2rem] font-bold tabular" aria-live="polite">{value}</output>
        <button type="button" className="icon-btn h-9 w-9" onClick={() => onChange(Math.min(99, value + 1))} aria-label={`${label}: ${t.reservation.more}`}><IconPlus size={16} /></button>
      </div>
    </div>
  );
}

export function Prices({ withLinks = true }: { withLinks?: boolean }) {
  const { t, go, href } = useSite();
  const [c, setC] = useState({ adults: 2, kids0: 0, kids6: 0, buffet: 0 });
  const total = c.adults * PRICES.adult + c.kids6 * PRICES.kids6to12 + c.buffet * PRICES.buffetOnly;
  return (
    <section id="preise" data-anchor="preise" className="skin-vinho relative overflow-hidden py-24 md:py-32" aria-labelledby="prices-title">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-screen" style={{ backgroundImage: `url(${asset("/images/restaurant-rodizio-960.webp")})`, backgroundSize: "720px auto" }} />
      <div className="gutter relative">
        <div className="wrap">
          <p className="kicker text-ouro" data-lang-stagger>{t.prices.kicker}</p>
          <h2 id="prices-title" className="display mt-3 text-[clamp(3rem,7vw,7rem)]">{t.prices.rodizioTitle}</h2>
          <p className="lead measure mt-5 text-creme/85">{t.prices.lead}</p>
          <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <Reveal>
              <p className="display text-[clamp(6rem,19vw,17rem)] leading-[0.8] text-ouro tabular">
                <span className="mr-3 align-top font-display text-[0.22em] font-bold tracking-[0.1em]">CHF</span>{PRICES.adult}.–
              </p>
              <p className="kicker mt-3 text-creme/80">{t.prices.perAdult}</p>
              <ul className="mt-8 flex max-w-[34rem] flex-col gap-3">
                {t.prices.included.map((x) => (
                  <li key={x} className="flex gap-3 text-creme/90"><span className="mt-1 text-brasa" aria-hidden="true">✱</span>{x}</li>
                ))}
              </ul>
            </Reveal>
            <div className="flex flex-col gap-4">
              <p className="kicker text-ouro">{t.prices.kidsTitle}</p>
              {[
                [t.prices.kids0, t.prices.free, ""],
                [t.prices.kids6, chf(PRICES.kids6to12), ""],
                [t.prices.buffetOnly, chf(PRICES.buffetOnly), t.prices.buffetOnlyNote],
              ].map(([a, b, note], i) => (
                <Reveal key={a} delay={i * 80} className="rounded-[24px] bg-carvao/35 p-5 ring-1 ring-creme/10">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-display text-[1.2rem] font-bold">{a}</p>
                    <p className="display text-[2.4rem] text-ouro tabular">{b}</p>
                  </div>
                  {note && <p className="mt-2 text-sm text-creme/70">{note}</p>}
                </Reveal>
              ))}
              <p className="text-sm text-creme/75">{t.prices.separate}</p>
              <p className="text-sm text-creme/70">{t.prices.vat}</p>
            </div>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div className="rounded-[var(--radius-card)] bg-carvao/45 p-6 ring-1 ring-creme/10">
              <p className="kicker text-ouro">{t.prices.calcTitle}</p>
              <div className="mt-3">
                <Stepper label={t.prices.calcAdults} value={c.adults} onChange={(n) => setC({ ...c, adults: n })} />
                <Stepper label={t.prices.calcKids0} value={c.kids0} onChange={(n) => setC({ ...c, kids0: n })} />
                <Stepper label={t.prices.calcKids6} value={c.kids6} onChange={(n) => setC({ ...c, kids6: n })} />
                <Stepper label={t.prices.calcBuffet} value={c.buffet} onChange={(n) => setC({ ...c, buffet: n })} />
              </div>
              <div className="mt-5 flex items-baseline justify-between">
                <span className="kicker text-creme/80">{t.prices.calcTotal}</span>
                <span className="display text-[3rem] text-ouro tabular" aria-live="polite">CHF {total}.–</span>
              </div>
              <p className="mt-2 text-xs text-creme/70">{t.prices.calcNote}</p>
            </div>
            {withLinks && (
              <div className="flex flex-col justify-end gap-3">
                <a href={href("preise")} onClick={(e) => { e.preventDefault(); go("preise"); }} className="pill pill-cream self-start">{t.prices.menuTitle} <IconArrow size={17} className="arrow" /></a>
                <div className="flex flex-wrap gap-2">
                  <a className="pill pill-ghost text-creme" href={URLS.menuPdf} target="_blank" rel="noopener">{t.cta.menuPdf}<IconExternal size={16} /><span className="sr-only">{t.a11y.newTab}</span></a>
                  <a className="pill pill-ghost text-creme" href={URLS.allergensPdf} target="_blank" rel="noopener">{t.cta.allergensPdf}<IconExternal size={16} /><span className="sr-only">{t.a11y.newTab}</span></a>
                </div>
                <p className={cn("mt-2 max-w-[34rem] text-sm text-creme/70")}>{t.prices.allergensText}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
