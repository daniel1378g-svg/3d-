// Gift vouchers: choose one of the shop's ten motifs and an amount, type the names, see the card. Buying happens in
// the official shop (coupons.boinabrasa.ch); motif and amount are chosen there again (the shop takes no parameters).
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSite } from "@/site";
import { URLS, VOUCHER_AMOUNTS, VOUCHER_MOTIFS, type VoucherMotif } from "@/content/facts";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Img } from "../Img";
import { IconExternal, IconGift } from "../icons";

export function Vouchers() {
  const { t, reduce } = useSite();
  const [motif, setMotif] = useState<VoucherMotif>("gaucho");
  const [amount, setAmount] = useState(100);
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  return (
    <section id="gutscheine" data-anchor="gutscheine" className="skin-ouro relative overflow-hidden py-24 md:py-32" aria-labelledby="vouchers-title">
      <div className="gutter">
        <div className="wrap">
          <p className="kicker flex items-center gap-2 text-vinho" data-lang-stagger><IconGift size={16} />{t.vouchers.kicker}</p>
          <h2 id="vouchers-title" className="display mt-3 max-w-[18ch] text-[clamp(2.8rem,6.4vw,6.4rem)] text-carvao">{t.vouchers.title}</h2>
          <p className="lead mt-5 max-w-[40rem] text-carvao/80">{t.vouchers.lead}</p>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.25fr_1fr]">
            {/* live preview */}
            <div>
              <div className="relative aspect-[1592/1080] overflow-hidden rounded-[26px] shadow-[0_40px_80px_-30px_rgba(40,10,0,0.6)]">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.div
                    key={motif}
                    className="absolute inset-0"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "scale(1.04) rotate(-1deg)" }}
                    animate={{ opacity: 1, transform: "scale(1) rotate(0deg)" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE_OUT }}
                  >
                    <Img id={`voucher-${motif}`} alt="" sizes="(min-width: 1024px) 55vw, 100vw" className="h-full w-full" />
                  </motion.div>
                </AnimatePresence>
                {/* the motifs leave white boxes for the text, as in the shop */}
                <div className="pointer-events-none absolute inset-x-[4%] bottom-[5%] flex items-end justify-between gap-4 text-carvao">
                  <div className="rounded-[10px] bg-white/92 px-3 py-2 text-[clamp(0.6rem,1.4vw,0.85rem)] leading-tight shadow">
                    <p><span className="opacity-60">{t.vouchers.to}:</span> <strong>{to || t.vouchers.toPh}</strong></p>
                    <p><span className="opacity-60">{t.vouchers.from}:</span> <strong>{from || t.vouchers.fromPh}</strong></p>
                  </div>
                  <p className="rounded-[10px] bg-white/92 px-3 py-1.5 font-display text-[clamp(1rem,2.6vw,1.8rem)] font-extrabold shadow tabular">CHF {amount}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-carvao/70">{t.vouchers.digital} · {t.vouchers.validity}</p>
            </div>

            {/* controls */}
            <div className="flex flex-col gap-7">
              <fieldset>
                <legend className="label text-carvao">{t.vouchers.motif}</legend>
                <div className="grid grid-cols-5 gap-2" role="radiogroup" aria-label={t.vouchers.motif}>
                  {VOUCHER_MOTIFS.map((m) => (
                    <button
                      key={m}
                      type="button"
                      role="radio"
                      aria-checked={motif === m}
                      aria-label={t.vouchers.motifs[m]}
                      title={t.vouchers.motifs[m]}
                      onClick={() => setMotif(m)}
                      className={cn("overflow-hidden rounded-[12px] ring-2 transition-[transform,box-shadow] duration-200 active:scale-95", motif === m ? "ring-carvao" : "ring-transparent hover:ring-carvao/40")}
                    >
                      <Img id={`voucher-${m}`} alt="" sizes="96px" className="aspect-[1592/1080] w-full" />
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-sm font-semibold text-carvao">{t.vouchers.motifs[motif]}</p>
              </fieldset>
              <fieldset>
                <legend className="label text-carvao">{t.vouchers.amount}</legend>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={t.vouchers.amount}>
                  {VOUCHER_AMOUNTS.map((a) => (
                    <button key={a} type="button" role="radio" aria-checked={amount === a} onClick={() => setAmount(a)} className={cn("chip text-carvao", amount === a && "!bg-carvao !text-ouro")}>CHF {a}</button>
                  ))}
                </div>
              </fieldset>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="label text-carvao">{t.vouchers.to}</span>
                  <input className="field text-carvao" value={to} maxLength={40} onChange={(e) => setTo(e.target.value)} placeholder={t.vouchers.toPh} autoComplete="off" />
                </label>
                <label className="block">
                  <span className="label text-carvao">{t.vouchers.from}</span>
                  <input className="field text-carvao" value={from} maxLength={40} onChange={(e) => setFrom(e.target.value)} placeholder={t.vouchers.fromPh} autoComplete="name" />
                </label>
              </div>
              <div>
                <a className="pill pill-dark" href={URLS.vouchers} target="_blank" rel="noopener">{t.vouchers.toShop}<IconExternal size={16} /><span className="sr-only">{t.a11y.newTab}</span></a>
                <p className="mt-3 text-sm text-carvao/70">{t.vouchers.shopNote}</p>
                <p className="mt-1 text-sm text-carvao/70">{t.vouchers.perks.join(" · ")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
