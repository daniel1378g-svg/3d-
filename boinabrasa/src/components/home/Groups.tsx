// Company events and tour groups (home text of the live site), the four group packages with their guide prices.
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { fill } from "@/i18n";
import { useSite } from "@/site";
import { PRICES } from "@/content/facts";
import { EASE_OUT } from "@/lib/motion";
import { Img } from "../Img";
import { Reveal } from "../Reveal";
import { IconArrow, IconCar, IconCard, IconClock, IconUsers } from "../icons";

const ICONS = [IconUsers, IconClock, IconCar, IconCard];

export function Packages() {
  const { t } = useSite();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {t.groups.packages.map((p, i) => (
        <Reveal as="li" key={p.name} delay={i * 70} className="flex flex-col rounded-[var(--radius-card)] bg-white/60 p-6 ring-1 ring-tinta/10">
          <p className="kicker text-vinho-2">{fill(t.groups.packageLabel, { n: i })}</p>
          <h3 className="display mt-2 text-[2rem] text-vinho">{p.name}</h3>
          <p className="mt-2 font-display text-[1.25rem] font-bold text-tinta">{PRICES.groupPackages[i] ? p.price : p.price}</p>
          <button type="button" className="kicker mt-4 self-start text-[0.7rem] text-vinho-2 underline underline-offset-4" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
            {open === i ? t.groups.hideServices : t.groups.showServices}
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: EASE_OUT }} className="overflow-hidden">
                <p className="pt-3 text-tinta/85">{p.services}</p>
                <p className="pt-2 text-sm text-tinta/75">{p.note}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      ))}
    </ol>
  );
}

export function Groups() {
  const { t, go, href } = useSite();
  return (
    <section id="gruppen" data-anchor="gruppen" className="skin-creme py-24 md:py-32" aria-labelledby="groups-title">
      <div className="gutter">
        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <div>
              <p className="kicker text-vinho-2" data-lang-stagger>{t.groups.kicker}</p>
              <h2 id="groups-title" className="display mt-3 text-[clamp(3rem,7.5vw,7.4rem)] text-vinho">{t.groups.title}</h2>
              <p className="lead mt-6 max-w-[40rem] text-tinta/85">{t.groups.lead}</p>
            </div>
            <Reveal className="aspect-[16/10] overflow-hidden rounded-[var(--radius-xl2)]">
              <Img id="header-tische_2" sizes="(min-width: 1024px) 45vw, 100vw" className="h-full w-full" />
            </Reveal>
          </div>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.groups.features.map((f, i) => {
              const Icon = ICONS[i];
              return (
                <Reveal as="li" key={f.title} delay={i * 60} className="rounded-[var(--radius-card)] bg-creme-2 p-6">
                  <Icon size={26} className="text-brasa" />
                  <h3 className="mt-4 font-display text-[1.3rem] font-bold leading-tight text-tinta" style={{ fontStretch: "88%" }}>{f.title}</h3>
                  <p className="mt-2 text-tinta/75">{f.text}</p>
                </Reveal>
              );
            })}
          </ul>
          <div className="mt-14">
            <p className="kicker mb-4 text-vinho-2">{t.groups.packagesTitle} · {t.groups.guide}</p>
            <Packages />
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href={href("gruppen")} onClick={(e) => { e.preventDefault(); go("gruppen"); }} className="pill">{t.cta.groupRequest} <IconArrow size={17} className="arrow" /></a>
            <p className="text-tinta/70">{t.groups.support}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
