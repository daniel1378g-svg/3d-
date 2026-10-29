// Warenkorb and Kasse: the cart lines, the live checkout's steps (Abrechnungsdaten, Versand, Zahlung,
// Bestätigung) reduced to an honest three-step preview: Warenkorb → Ihre Angaben → Vorschau. Nothing is sent.
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TX } from "@/content/site";
import { useCart } from "@/lib/cart";
import { dishById, dishName, money, pdfRow, priceNumber } from "@/content/menu";
import { CANTONS, Field, fieldCls } from "@/components/Contact";
import { CartLines, cartTotal } from "@/components/CartDrawer";
import { PageHero } from "@/components/PageHero";
import { PillLink } from "@/components/ui/Pill";
import { cn } from "@/lib/utils";
import { IconCheck, IconPhone } from "@/components/icons";

export default function WarenkorbPage() {
  const { lang, href, go } = useSite();
  const reduce = useReducedMotion();
  const lines = useCart();
  const { total, unpriced } = cartTotal(lines);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [data, setData] = useState<Record<string, string>>({});
  const steps = [TX.n_checkoutStep1[lang], TX.n_checkoutStep2[lang], TX.n_checkoutStep3[lang]];
  const required = ["last_name", "email", "tel", "address", "plz", "city"];
  const submitDetails = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const errs: Record<string, string> = {};
    for (const k of required) if (!String(d.get(k) ?? "").trim()) errs[k] = UI.fieldMissing[lang];
    const em = String(d.get("email") ?? "").trim();
    if (em && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) errs.email = UI.emailInvalid[lang];
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setData(Object.fromEntries([...d.entries()].map(([k, v]) => [k, String(v)])));
    setStep(2);
  };
  const field = fieldCls();
  return (
    <>
      <PageHero eyebrow={`${TX.kasse[lang]} · ${UI.testMode[lang]}`} title={TX.n_cartTitle[lang]} lang={lang}>
        <p className="mt-6 max-w-[640px] text-[clamp(16px,1.2vw,19px)] leading-relaxed text-fundo/80">{TX.n_cartLine[lang]}</p>
      </PageHero>
      <section className="bg-fundo py-16 text-marca md:py-24">
        <div className="container-x max-w-[1000px]">
          <ol className="flex list-none flex-wrap gap-2" aria-label={TX.kasseVerfahren[lang]}>
            {steps.map((s, i) => (
              <li key={s} className={cn("flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.1em]", i === step ? "bg-marca text-fundo" : i < step ? "bg-suave text-marca" : "bg-marca/[0.06] text-linha")} aria-current={i === step ? "step" : undefined}>
                <span className="grid h-6 w-6 place-items-center rounded-full bg-branco/70 text-[12px] text-marca">{i < step ? <IconCheck size={14} /> : i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={step} initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="paper mt-8 p-6 md:p-10">
              {step === 0 && (
                <>
                  <h2 className="font-display text-[26px] font-semibold">{TX.n_checkoutStep1[lang]}</h2>
                  <div className="mt-5">
                    <CartLines />
                  </div>
                  {lines.length > 0 && (
                    <div className="mt-5 flex items-baseline justify-between border-t border-marca/15 pt-4">
                      <span className="eyebrow text-linha">{TX.n_cartTotal[lang]}</span>
                      <span className="font-display text-[28px] font-semibold tabular-nums">{money(total)}</span>
                    </div>
                  )}
                  {unpriced > 0 && <p className="mt-2 text-[13px] text-linha">{TX.n_cartOnRequest[lang]}</p>}
                  <div className="mt-6 flex flex-wrap gap-3">
                    {lines.length > 0 ? (
                      <button type="button" onClick={() => setStep(1)} className="btn">
                        {TX.n_checkoutNext[lang]}
                      </button>
                    ) : null}
                    <PillLink
                      variant="soft"
                      href={href("takeaway")}
                      onClick={(e) => {
                        e.preventDefault();
                        go("takeaway");
                      }}
                    >
                      {TX.n_cartContinue[lang]}
                    </PillLink>
                  </div>
                </>
              )}
              {step === 1 && (
                <form noValidate onSubmit={submitDetails} className="grid gap-5">
                  <h2 className="font-display text-[26px] font-semibold">{TX.stepAbrechnung[lang]}</h2>
                  <p className="text-[14px] text-linha">
                    {TX.coLine1[lang]} {TX.coLine2[lang]} {TX.coLine3[lang]}
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label={TX.vorname[lang]} name="first_name" auto="given-name" />
                    <Field label={TX.nameL[lang]} name="last_name" required auto="family-name" error={errors.last_name} />
                    <Field label={TX.emailL[lang]} name="email" type="email" required auto="email" error={errors.email} />
                    <Field label={TX.telL[lang]} name="tel" type="tel" required auto="tel" error={errors.tel} />
                    <Field label={TX.firmaL[lang]} name="company" auto="organization" />
                    <Field label={TX.adresseL[lang]} name="address" required auto="street-address" error={errors.address} />
                    <Field label={TX.plzL[lang]} name="plz" required auto="postal-code" error={errors.plz} />
                    <Field label={TX.stadtL[lang]} name="city" required auto="address-level2" error={errors.city} />
                    <Field label={TX.landL[lang]} name="country">
                      <input name="country" defaultValue={TX.fSchweiz[lang]} className={field} />
                    </Field>
                    <Field label={TX.kantonL[lang]} name="state">
                      <select name="state" className={field} defaultValue="">
                        <option value="">{UI.choose[lang]}</option>
                        {CANTONS.map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <button type="button" onClick={() => setStep(0)} className="btn btn--soft">
                      {TX.n_checkoutBack[lang]}
                    </button>
                    <button type="submit" className="btn">
                      {TX.n_checkoutFinish[lang]}
                    </button>
                    <span className="text-[13px] opacity-70">{TX.coRequired[lang]}</span>
                  </div>
                </form>
              )}
              {step === 2 && (
                <>
                  <h2 className="font-display text-[26px] font-semibold">{TX.n_checkoutStep3[lang]}</h2>
                  <p role="status" className="mt-4 rounded-[14px] bg-marca px-4 py-3 text-[15px] text-fundo">
                    {TX.n_checkoutPreview[lang]}
                  </p>
                  <table className="mt-6 w-full text-[15px]">
                    <thead>
                      <tr className="text-left text-[12px] uppercase tracking-[0.12em] text-linha">
                        <th className="pb-2 font-semibold">{TX.produktName[lang]}</th>
                        <th className="pb-2 font-semibold">{TX.menge[lang]}</th>
                        <th className="pb-2 text-right font-semibold">{TX.preis[lang]}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lines.map((l) => {
                        const d = dishById(l.id);
                        if (!d) return null;
                        const p = priceNumber(pdfRow(d));
                        return (
                          <tr key={l.id} className="border-t border-marca/10">
                            <td className="py-2 font-display font-semibold">{dishName(d, lang)}</td>
                            <td className="py-2">{l.qty}</td>
                            <td className="py-2 text-right tabular-nums">{p === null ? TX.n_onRequest[lang] : money(p * l.qty)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-marca">
                        <td className="pt-3 font-semibold" colSpan={2}>
                          {TX.summe[lang]}
                        </td>
                        <td className="pt-3 text-right font-display text-[20px] font-semibold tabular-nums">{money(total)}</td>
                      </tr>
                    </tfoot>
                  </table>
                  <dl className="mt-6 grid gap-1 text-[14px] sm:grid-cols-2">
                    {Object.entries(data)
                      .filter(([, v]) => v)
                      .map(([k, v]) => (
                        <div key={k} className="flex gap-2">
                          <dt className="text-linha">{k}</dt>
                          <dd>{v}</dd>
                        </div>
                      ))}
                  </dl>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href={`tel:${BUSINESS.phones[0].tel}`} className="btn btn--orange">
                      <IconPhone size={16} /> {BUSINESS.phones[0].show}
                    </a>
                    <button type="button" onClick={() => setStep(1)} className="btn btn--soft">
                      {TX.n_checkoutBack[lang]}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
