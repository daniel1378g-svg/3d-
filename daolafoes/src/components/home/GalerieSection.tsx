// Section 8: the gallery. A grid of the restaurant's pictures (the dish cut-outs on cream, the kitchen photos),
// each opening the lightbox; scene C (the spatial gallery) sits on top for GPUs and loads later.
import { Suspense, lazy, useState } from "react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { GALLERY } from "@/content/photos";
import { TX } from "@/content/site";
import { cn, gpuWebGL } from "@/lib/utils";
import { useReduced } from "@/lib/useMedia";
import { FadeIn, SplitReveal } from "../Reveal";
import { Lightbox } from "../Lightbox";
import { IconGrid } from "../icons";

const GallerySpace = lazy(() => import("./GallerySpace"));

export function GalerieSection({ full = false }: { full?: boolean }) {
  const { lang } = useSite();
  const reduce = useReduced();
  const [open, setOpen] = useState<number | null>(null);
  const canSpace = !reduce && typeof window !== "undefined" && gpuWebGL();
  const [space, setSpace] = useState(canSpace);
  return (
    <section id="galerie" className="relative overflow-hidden bg-fundo py-20 text-marca md:py-28" aria-labelledby="gal-title">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-acento">{TX.n_galleryEyebrow[lang]} · {GALLERY.length} {UI.photos[lang]}</p>
            <SplitReveal as={full ? "h1" : "h2"} id="gal-title" text={TX.n_galleryTitle[lang]} className="mt-4 fs-xl font-semibold" />
          </div>
          {canSpace && (
            <button type="button" onClick={() => setSpace((s) => !s)} aria-pressed={!space} className="btn btn--ghost btn--sm">
              <IconGrid size={16} />
              <span className="btn-roll">
                <span>{space ? UI.gridView[lang] : UI.spaceView[lang]}</span>
                <span aria-hidden="true">{space ? UI.gridView[lang] : UI.spaceView[lang]}</span>
              </span>
            </button>
          )}
        </div>
        {space && canSpace ? (
          <Suspense fallback={<div className="mt-10 h-[70svh] rounded-[28px] bg-marca/10" />}>
            <GallerySpace onOpen={setOpen} />
          </Suspense>
        ) : (
          <ul className="mt-10 grid list-none grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {GALLERY.map((p, i) => (
              <FadeIn as="li" key={p.id} delay={(i % 4) * 0.05} className={cn(i % 7 === 0 && "col-span-2 row-span-2")}>
                <button type="button" onClick={() => setOpen(i)} aria-label={`${UI.openPhoto[lang]}: ${p.alt[lang]}`} className="group block h-full w-full overflow-hidden rounded-[20px] bg-branco">
                  <img src={p.sm} srcSet={`${p.sm} 800w, ${p.src} 1600w`} sizes="(min-width: 1024px) 25vw, 50vw" alt={p.alt[lang]} width={p.w} height={p.h} loading="lazy" decoding="async" className="aspect-square h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]" />
                </button>
              </FadeIn>
            ))}
          </ul>
        )}
      </div>
      <Lightbox photos={GALLERY} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
    </section>
  );
}
