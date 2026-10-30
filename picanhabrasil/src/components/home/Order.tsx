// Pick-up and delivery, from the ordering widget's own data: the zones with their fees, the minimum order, payment
// on receipt, kitchen hours. A postcode check answers from that list only; the order itself happens in the
// restaurant's ordering system.
import { useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { fill } from "@/i18n";
import { useSite } from "@/site";
import { DELIVERY_MIN, DELIVERY_ZONES, URLS, ADDRESS } from "@/content/facts";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { IconCard, IconClock, IconExternal, IconPin } from "../icons";

export function Order({ asPage }: { asPage?: boolean }) {
  const { t, reduce } = useSite();
  const o = t.order;
  const [zip, setZip] = useState("");
  const [result, setResult] = useState<{ kind: "found" | "none" | "invalid"; text: string; zip?: number } | null>(null);
  const maxFee = Math.max(...DELIVERY_ZONES.map((z) => z.fee));
  const check = (e: FormEvent) => {
    e.preventDefault();
    const z = zip.trim();
    if (!/^\d{4}$/.test(z)) { setResult({ kind: "invalid", text: o.zipInvalid }); return; }
    const n = Number(z);
    const zone = DELIVERY_ZONES.find((x) => x.places.some((p) => p.zip === n));
    if (!zone) { setResult({ kind: "none", text: fill(o.zipNotFound, { zip: z }) }); return; }
    const place = zone.places.filter((p) => p.zip === n).map((p) => `${p.zip} ${p.city}`).join(" / ");
    setResult({ kind: "found", zip: n, text: fill(o.zipFound, { place, fee: zone.fee, min: DELIVERY_MIN }) });
  };
  const rows = useMemo(() => DELIVERY_ZONES.flatMap((z) => z.places.map((p) => ({ ...p, fee: z.fee }))), []);
  const H = asPage ? "h2" : "h2";

  return (
    <section id="bestellen" data-anchor="bestellen" className="skin-ouro relative overflow-hidden py-24 md:py-32" aria-labelledby="order-title">
      <div className="gutter">
        <div className="wrap">
          <p className="kicker text-vinho" data-lang-stagger>{o.kicker}</p>
          <H id="order-title" className="display mt-3 text-[clamp(3.2rem,9vw,9rem)] text-carvao">{o.title}</H>
          <p className="lead mt-5 max-w-[44rem] text-carvao/85">{o.lead}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a className="pill pill-dark" href={URLS.order} target="_blank" rel="noopener">{t.cta.orderNow}<IconExternal size={16} /><span className="sr-only">{t.a11y.newTab}</span></a>
            <p className="text-sm text-carvao/75">{o.ctaNote}</p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            <div className="rounded-[var(--radius-card)] bg-carvao p-6 text-creme">
              <p className="kicker flex items-center gap-2 text-ouro"><IconPin size={16} />{o.pickupTitle}</p>
              <p className="mt-3 text-creme/85">{o.pickupText}</p>
              <p className="mt-2 text-sm text-creme/60">{ADDRESS.street}, {ADDRESS.zip} {ADDRESS.city}</p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-vinho p-6 text-creme">
              <p className="kicker text-ouro">{o.deliveryTitle}</p>
              <p className="mt-3 text-creme/85">{fill(o.deliveryText, { min: DELIVERY_MIN })}</p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-creme p-6 text-tinta">
              <p className="kicker flex items-center gap-2 text-vinho-2"><IconCard size={16} />{o.paymentTitle}</p>
              <p className="mt-3">{o.payment.card} · {o.payment.twint}</p>
              <p className="kicker mt-5 flex items-center gap-2 text-vinho-2"><IconClock size={16} />{o.kitchenTitle}</p>
              <p className="mt-2 text-sm tabular">{t.hours.monFri}: {t.hours.monFriHours}<br />{t.hours.satSun}: {t.hours.satSunHours}</p>
            </div>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h3 className="display text-[clamp(2.2rem,4.4vw,3.6rem)] text-carvao">{o.zonesTitle}</h3>
              <form onSubmit={check} className="mt-6 flex flex-wrap items-end gap-3" noValidate>
                <label className="block min-w-[12rem] flex-1">
                  <span className="label text-carvao">{o.zipLabel}</span>
                  <input className="field bg-creme/60 text-carvao" inputMode="numeric" autoComplete="postal-code" maxLength={4} placeholder={o.zipPlaceholder} value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))} aria-describedby="zip-result" aria-invalid={result?.kind === "invalid"} />
                </label>
                <button type="submit" className="pill pill-dark">{o.zipCheck}</button>
              </form>
              <div id="zip-result" aria-live="polite" className="min-h-[4.5rem]">
                <AnimatePresence mode="wait">
                  {result && (
                    <motion.p
                      key={result.text}
                      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: EASE_OUT }}
                      className={cn("mt-4 rounded-[16px] px-4 py-3 text-[0.95rem]", result.kind === "found" ? "bg-mato-2 text-creme" : "bg-carvao/10 text-carvao")}
                    >
                      {result.text}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <p className="mt-3 text-sm text-carvao/70">{o.zonesNote}</p>
            </div>
            <ul className="flex flex-col" aria-label={o.zonesTitle}>
              {rows.map((r) => (
                <li key={`${r.zip}-${r.city}`} className={cn("flex items-center gap-4 border-b border-carvao/15 py-3 transition-colors", result?.zip === r.zip && "bg-carvao/10")}>
                  <span className="w-14 font-display font-bold tabular text-carvao">{r.zip}</span>
                  <span className="flex-1 text-carvao">{r.city}</span>
                  <span className="hidden h-2 flex-[0_0_30%] overflow-hidden rounded-full bg-carvao/10 sm:block" aria-hidden="true">
                    <span className="block h-full rounded-full bg-vinho" style={{ width: `${(r.fee / maxFee) * 100}%` }} />
                  </span>
                  <span className="w-24 text-right tabular text-carvao"><span className="sr-only">{o.fee}: </span>CHF {r.fee}.–</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
