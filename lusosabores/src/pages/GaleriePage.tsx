// Galerie: every photo of the live site as a masonry grid with mask reveals and the lightbox, grouped after
// looking at them: the dishes (in the live menu order) and the event photo.
import { useState } from "react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { PHOTOS, srcSet } from "@/content/photos";
import { MaskImage, SplitReveal } from "@/components/Reveal";
import { Lightbox } from "@/components/Lightbox";
import { Counter } from "@/components/Counter";

export default function GaleriePage() {
  const { lang } = useSite();
  const [open, setOpen] = useState<number | null>(null);
  const groups = [
    { key: "plats", title: UI.dishesGroup[lang], items: PHOTOS.filter((p) => p.cat === "plats") },
    { key: "evenements", title: UI.eventGroup[lang], items: PHOTOS.filter((p) => p.cat === "evenements") },
  ];
  return (
    <>
      <section className="relative overflow-hidden bg-marca-escura pb-10 text-branco" style={{ paddingTop: "calc(var(--label-h) + 130px)" }}>
        <div className="container-x">
          <p className="eyebrow text-destaque">
            <Counter to={PHOTOS.length} /> {UI.photos[lang]}
          </p>
          <SplitReveal as="h1" text={[UI.galerie[lang]]} className="mt-4 fs-mega font-extrabold" />
        </div>
      </section>
      <section className="on-dark bg-marca-escura pb-24 text-branco">
        {groups.map((g) => (
          <div key={g.key} className="container-x pt-12">
            <h2 className="eyebrow mb-6 text-suave">
              {g.title} · {g.items.length}
            </h2>
            <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
              {g.items.map((p, i) => (
                <button key={p.id} type="button" onClick={() => setOpen(PHOTOS.indexOf(p))} aria-label={`${UI.openPhoto[lang]} · ${p.dish ?? p.alt[lang]}`} className="group mb-4 block w-full break-inside-avoid text-left">
                  <MaskImage src={p.sm} srcSet={srcSet(p)} sizes="(min-width: 1024px) 25vw, 46vw" alt={p.alt[lang]} w={p.w} h={p.h} delay={(i % 4) * 0.06} eager={g.key === "plats" && i < 4} className={i === 0 && g.key === "plats" ? "arch w-full" : "w-full rounded-[18px]"} imgClassName="h-auto" />
                  {p.dish && (
                    <span lang="pt-PT" className="dish-name mt-2 block font-display text-[15px] font-semibold uppercase tracking-[0.08em] text-suave">
                      {p.dish}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>
      <Lightbox photos={PHOTOS} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
    </>
  );
}
