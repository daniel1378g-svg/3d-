// Galerie: all 24 photos as a masonry grid with mask reveals and the lightbox, grouped after looking at them.
import { useState } from "react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { PHOTOS, photo, type PhotoCat } from "@/content/photos";
import { TX } from "@/content/site";
import { MaskImage } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { Lightbox } from "@/components/Lightbox";

const GROUPS: { cat: PhotoCat; key: "restaurant" | "shopPlace"; tone: string }[] = [
  { cat: "restaurant", key: "restaurant", tone: "bg-marca-escura text-branco" },
  { cat: "laden", key: "shopPlace", tone: "bg-fundo text-tinta" },
];

export default function GaleriePage() {
  const { lang } = useSite();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <PageHero lang={lang} eyebrow={`${PHOTOS.length} ${UI.photos[lang]} · ${TX.augeShort[lang]}`} title={[TX.augeTitle[lang]]} photo={photo("steak-chips")} />
      {GROUPS.map((g, gi) => {
        const items = PHOTOS.filter((p) => p.cat === g.cat);
        return (
          <section key={g.cat} className={`py-20 md:py-28 ${g.tone}`} aria-labelledby={`g-${g.cat}`}>
            <div className="container-x">
              <p className="eyebrow opacity-80">
                0{gi + 1} / 03 · {items.length} {UI.photos[lang]}
              </p>
              <h2 id={`g-${g.cat}`} className="mt-3 fs-xxl font-extrabold">
                {UI[g.key][lang]}
              </h2>
              <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
                {items.map((p, i) => (
                  <button key={p.id} type="button" onClick={() => setOpen(PHOTOS.indexOf(p))} aria-label={`${UI.openPhoto[lang]} · ${p.alt[lang]}`} className="group mb-4 block w-full break-inside-avoid text-left">
                    <MaskImage src={p.sm} srcSet={`${p.sm} 800w, ${p.src} 1200w`} sizes="(min-width: 1024px) 33vw, 100vw" alt="" w={p.w} h={p.h} delay={(i % 3) * 0.08} className={i === 0 ? "arch w-full" : "w-full rounded-[18px]"} imgClassName="h-auto transition-transform duration-700 group-hover:scale-[1.06]" />
                    <span className="mt-2 block text-[14px] opacity-75">{p.alt[lang]}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        );
      })}
      <Lightbox photos={PHOTOS} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
    </>
  );
}
