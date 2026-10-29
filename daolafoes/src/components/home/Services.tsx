// Section 7: the eight services of the live site as expandable panels (the live names verbatim, the pictures
// of the live site, a suggested line each, marked as a suggestion). "Reservierung" opens the booking drawer.
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TX } from "@/content/site";
import { SERVICES } from "@/content/services";
import { photo } from "@/content/photos";
import { cn } from "@/lib/utils";
import { FadeIn, SplitReveal } from "../Reveal";
import { PillButton, PillLink } from "../ui/Pill";
import { IconChevron, IconMail } from "../icons";

export function Services({ full = false }: { full?: boolean }) {
  const { lang, book } = useSite();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<string | null>(full ? "reservierung" : null);
  const badge = photo("s-parking-wifi");
  const title = (s: string) => s.toLowerCase().replace(/(^|\s|-)\p{L}/gu, (c) => c.toUpperCase());
  return (
    <section id="services" className="on-dark tex-azulejo relative overflow-hidden bg-marca py-20 text-fundo md:py-28" aria-labelledby="svc-title">
      <div className="container-x">
        <p className="eyebrow text-ember">{TX.service[lang]} · {TX.n_servicesEyebrow[lang]}</p>
        <SplitReveal as={full ? "h1" : "h2"} id="svc-title" text={TX.n_servicesTitle[lang]} className="mt-4 fs-xl font-semibold" />
        <FadeIn as="p" className="mt-5 max-w-[640px] text-[15px] leading-relaxed text-fundo/75">
          {TX.n_servicesLine[lang]}
        </FadeIn>
        <ul className="mt-10 grid list-none gap-3 md:grid-cols-2">
          {SERVICES.map((s, i) => {
            const on = open === s.id;
            const pic = photo(s.photo);
            const id = `svc-${s.id}`;
            return (
              <FadeIn as="li" key={s.id} delay={Math.min(i, 5) * 0.04} className={cn("rounded-[22px] bg-branco/[0.06] shadow-[inset_0_0_0_1px_rgba(253,249,246,0.12)] transition-colors", on && "bg-branco/[0.1]")}>
                <h3>
                  <button type="button" aria-expanded={on} aria-controls={id} onClick={() => setOpen(on ? null : s.id)} className="flex w-full items-center gap-4 p-4 text-left">
                    <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-fundo">
                      <img src={pic.sm} alt="" width={pic.w} height={pic.h} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                    </span>
                    <span className="flex-1">
                      <span className="eyebrow block text-ember">0{i + 1}</span>
                      <span className="block font-display text-[clamp(20px,1.6vw,26px)] font-semibold leading-tight">{title(TX[s.name][lang])}</span>
                    </span>
                    <IconChevron size={20} className={cn("shrink-0 transition-transform duration-300", on && "rotate-180")} />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div id={id} key="body" initial={reduce ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={reduce ? undefined : { height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                      <div className="grid gap-4 px-4 pb-5 sm:grid-cols-[minmax(0,1fr)_140px]">
                        <div>
                          <p className="text-[15px] leading-relaxed text-fundo/85">{TX[s.line][lang]}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {s.id === "reservierung" ? (
                              <PillButton size="sm" variant="orange" onClick={book}>
                                {UI.reserve[lang]}
                              </PillButton>
                            ) : (
                              <PillLink size="sm" variant="orange" href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent(title(TX[s.name][lang]))}`} icon={<IconMail size={16} />}>
                                {TX.n_svcAsk[lang]}
                              </PillLink>
                            )}
                            <a href={`tel:${BUSINESS.phones[0].tel}`} className="btn btn--ghost btn--sm text-fundo">
                              {BUSINESS.phones[0].show}
                            </a>
                          </div>
                        </div>
                        <img src={pic.sm} alt={pic.alt[lang]} width={pic.w} height={pic.h} loading="lazy" decoding="async" className="aspect-square w-full rounded-[16px] object-cover" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </FadeIn>
            );
          })}
        </ul>
        <FadeIn className="mt-6 flex items-center gap-3 text-[14px] text-fundo/75">
          <img src={badge.sm} alt={badge.alt[lang]} width={badge.w} height={badge.h} loading="lazy" className="h-10 w-10 rounded-[8px]" />
          {TX.n_svcParking[lang]}
        </FadeIn>
      </div>
    </section>
  );
}
