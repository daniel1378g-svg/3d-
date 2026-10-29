// Presse: the ten clippings as a wall, then one block per item with its title, its date and what its live
// post holds (a scan). No invented quotes or ratings.
import { useState } from "react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { PRESS } from "@/content/press";
import { PressClip, pressDate } from "@/components/PressClip";
import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/Reveal";
import { IconExternal } from "@/components/icons";
import { Lightbox } from "@/components/Lightbox";
import type { Photo } from "@/content/photos";

export default function PressePage() {
  const { lang } = useSite();
  const scans: Photo[] = PRESS.filter((p) => p.scan).map((p) => ({ id: p.id, cat: "salle", alt: { fr: p.title, en: p.title, pt: p.title, it: p.title, de: p.title }, w: p.scan!.w, h: p.scan!.h, src: p.scan!.src, sm: p.scan!.src }));
  const [open, setOpen] = useState<number | null>(null);
  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <>
      <PageHero lang={lang} tone="tex-azulejo bg-sal text-tinta" eyebrowTone="text-cortica" eyebrow={`${PRESS.length} · 2016`} title={[UI.presse[lang]]}>
        <ul className="mt-12 grid list-none grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {PRESS.map((p, i) => (
            <li key={p.id} className={i % 2 ? "sm:mt-6" : ""}>
              <PressClip item={p} lang={lang} index={i} href={`#${p.id}`} onOpen={() => jump(p.id)} titleAs="p" eager={i < 5} />
            </li>
          ))}
        </ul>
      </PageHero>
      <section className="bg-oceano py-20 text-branco md:py-28">
        <div className="container-x space-y-6">
          {PRESS.map((p, i) => (
            <FadeIn key={p.id} as="section" className="grid scroll-mt-40 gap-6 rounded-[24px] bg-branco/[0.06] p-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:p-10" style={{}}>
              <div id={p.id} className="scroll-mt-40">
                <p className="eyebrow text-dourado">
                  {String(i + 1).padStart(2, "0")} / {PRESS.length} · {pressDate(p.date, lang)}
                </p>
                <h2 lang="fr" className="mt-3 font-display text-[clamp(32px,3.4vw,56px)] font-extrabold uppercase leading-[0.95] [overflow-wrap:anywhere]">
                  {p.title}
                </h2>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="link mt-6 inline-flex items-center gap-2 text-espuma">
                  {UI.openPost[lang]} <IconExternal size={16} />
                  <span className="sr-only">{UI.externalNew[lang]}</span>
                </a>
              </div>
              {p.scan ? (
                <button type="button" onClick={() => setOpen(scans.findIndex((s) => s.id === p.id))} className="group overflow-hidden rounded-[14px] bg-branco p-3" aria-label={`${UI.openPhoto[lang]} · ${p.title}`}>
                  <img src={p.scan.src} alt="" width={p.scan.w} height={p.scan.h} loading="lazy" className="max-h-[560px] w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]" />
                </button>
              ) : (
                <p className="self-center rounded-[14px] bg-branco/5 p-6 text-espuma">{UI.scanMissing[lang]}</p>
              )}
            </FadeIn>
          ))}
        </div>
      </section>
      <Lightbox photos={scans} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
    </>
  );
}
