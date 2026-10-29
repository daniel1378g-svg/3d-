// Section 12: the 24 photos. On desktop a pinned horizontal track (scroll or drag moves the photos sideways,
// mixed sizes, one inside an arch, with a counter); on phones a swipe row that snaps; tap opens the lightbox;
// "Voir en grille" shows a plain grid. Reduced motion: the grid.
import { useLayoutEffect, useRef, useState } from "react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { PHOTOS as ALL, type PhotoCat } from "@/content/photos";
import { TX } from "@/content/site";
import { PlaceToggle } from "../Contact";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsDesktop, useReduced } from "@/lib/useMedia";
import { cn } from "@/lib/utils";
import { MaskImage, SplitReveal } from "../Reveal";
import { Lightbox } from "../Lightbox";
import { IconArrow, IconGrid, IconRows } from "../icons";
import { PillLink } from "../ui/Pill";

const SIZES = ["h-[62svh] aspect-[4/5]", "h-[44svh] aspect-[4/3] self-end", "h-[54svh] aspect-[3/4] self-start", "h-[40svh] aspect-square self-center", "h-[58svh] aspect-[5/4] self-end"];

export function GalerieSection() {
  const [cat, setCat] = useState<PhotoCat>("restaurant");
  const PHOTOS = ALL.filter((p) => p.cat === cat);
  const { lang, href, go } = useSite();
  const desktop = useIsDesktop();
  const reduce = useReduced();
  const [grid, setGrid] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const st = useRef<ScrollTrigger | null>(null);
  const drag = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const pinned = desktop && !reduce && !grid;

  useLayoutEffect(() => {
    if (!pinned || !track.current || !section.current) return;
    const el = track.current;
    const distance = () => Math.max(0, el.scrollWidth - window.innerWidth);
    const ctx = gsap.context(() => {
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: ".gal-stage",
          scrub: 0.4,
          invalidateOnRefresh: true,
          onUpdate: (self) => setCurrent(Math.min(PHOTOS.length - 1, Math.round(self.progress * (PHOTOS.length - 1)))),
        },
      });
      st.current = tween.scrollTrigger ?? null;
    }, section);
    return () => {
      st.current = null;
      ctx.revert();
    };
  }, [pinned]);

  /** Brings photo i to the middle of the screen (keyboard focus moves the page scroll). */
  const reveal = (i: number) => {
    const t = st.current;
    const item = track.current?.children[i] as HTMLElement | undefined;
    if (!t || !item || !track.current) return;
    const dist = track.current.scrollWidth - window.innerWidth;
    const x = Math.max(0, Math.min(dist, item.offsetLeft + item.offsetWidth / 2 - window.innerWidth / 2));
    window.scrollTo({ top: t.start + x, behavior: "auto" });
  };

  const toggle = (
    <button type="button" onClick={() => setGrid((g) => !g)} aria-pressed={grid} className="btn btn--ghost btn--sm text-branco">
      {grid ? <IconRows size={18} /> : <IconGrid size={18} />}
      <span className="btn-roll">
        <span>{grid ? UI.trackView[lang] : UI.gridView[lang]}</span>
        <span aria-hidden="true">{grid ? UI.trackView[lang] : UI.gridView[lang]}</span>
      </span>
    </button>
  );
  const heading = (
    <div className="container-x flex flex-wrap items-end justify-between gap-6">
      <div>
        <p className="eyebrow text-destaque">
          13 / 16 · {UI.galerie[lang]} · {PHOTOS.length} {UI.photos[lang]}
        </p>
        <SplitReveal as="h2" id="gal-title" text={[TX.augeTitle[lang]]} className="mt-4 fs-xxl font-extrabold" />
        <p className="mt-4 max-w-[720px] text-[clamp(17px,1.2vw,20px)] text-suave">{TX.augeShort[lang]}</p>
        <PlaceToggle value={cat} onChange={setCat} id="gal-place" className="mt-6" />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {!reduce && toggle}
        <PillLink
          href={href("galerie")}
          onClick={(e) => {
            e.preventDefault();
            go("galerie");
          }}
          iconRight={<IconArrow size={18} />}
          size="sm"
        >
          {UI.galerie[lang]}
        </PillLink>
      </div>
    </div>
  );

  return (
    <section id="galerie" ref={section} className="on-dark relative bg-marca-escura text-branco" aria-labelledby="gal-title">
      {pinned ? (
        <div className="gal-stage flex h-[100svh] flex-col justify-center gap-8 overflow-hidden pt-[calc(var(--label-h)+70px)]">
          {heading}
          <div
            ref={track}
            className="flex cursor-grab items-center gap-6 pl-[var(--gutter)] pr-[25vw] active:cursor-grabbing"
            onPointerDown={(e) => (drag.current = { x: e.clientX, y: window.scrollY, moved: false })}
            onPointerMove={(e) => {
              if (!drag.current || e.buttons !== 1) return;
              const dx = e.clientX - drag.current.x;
              if (Math.abs(dx) > 4) drag.current.moved = true;
              window.scrollTo({ top: drag.current.y - dx * 1.2, behavior: "auto" });
            }}
            onPointerUp={() => setTimeout(() => (drag.current = null), 0)}
            onKeyDown={(e) => {
              if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
              const items = [...(track.current?.querySelectorAll<HTMLButtonElement>("button") ?? [])];
              const i = items.indexOf(document.activeElement as HTMLButtonElement);
              const n = Math.max(0, Math.min(items.length - 1, i + (e.key === "ArrowRight" ? 1 : -1)));
              items[n]?.focus();
              e.preventDefault();
            }}
          >
            {PHOTOS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onFocus={() => reveal(i)}
                onClick={() => !drag.current?.moved && setOpen(i)}
                aria-label={`${UI.openPhoto[lang]} · ${p.alt[lang]}`}
                className={cn("relative shrink-0 overflow-hidden", i === 6 ? "arch-full h-[62svh] aspect-[3/4]" : cn("rounded-[20px]", SIZES[i % SIZES.length]))}
              >
                <img src={p.sm} srcSet={`${p.sm} 800w, ${p.src} 1200w`} sizes="40vw" alt="" width={p.w} height={p.h} loading="lazy" draggable={false} className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out)] hover:scale-[1.04]" />
              </button>
            ))}
          </div>
          <div className="container-x flex items-center gap-4">
            <span className="font-display text-sm font-semibold tracking-[0.2em] text-suave">
              {String(current + 1).padStart(2, "0")} / {PHOTOS.length}
            </span>
            <span className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-branco/15">
              <span className="absolute inset-y-0 left-0 rounded-full bg-acento transition-[width] duration-200" style={{ width: `${((current + 1) / PHOTOS.length) * 100}%` }} />
            </span>
            <span className="meta text-[12px] text-suave/80">{UI.dragHint[lang]}</span>
          </div>
        </div>
      ) : (
        <div className="py-24 md:py-32">
          {heading}
          {grid || reduce ? (
            <div className="container-x mt-12 columns-2 gap-4 md:columns-3 lg:columns-4">
              {PHOTOS.map((p, i) => (
                <button key={p.id} type="button" onClick={() => setOpen(i)} aria-label={`${UI.openPhoto[lang]} · ${p.alt[lang]}`} className="mb-4 block w-full break-inside-avoid">
                  <MaskImage src={p.sm} alt="" w={p.w} h={p.h} delay={(i % 4) * 0.06} className="w-full rounded-[18px]" imgClassName="h-auto" />
                </button>
              ))}
            </div>
          ) : (
            <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--gutter)] pb-4" style={{ scrollPaddingInline: "var(--gutter)" }}>
              {PHOTOS.map((p, i) => (
                <button key={p.id} type="button" onClick={() => setOpen(i)} aria-label={`${UI.openPhoto[lang]} · ${p.alt[lang]}`} className={cn("relative h-[56svh] shrink-0 snap-start overflow-hidden", i === 6 ? "arch-full aspect-[3/4]" : "aspect-[4/5] rounded-[20px]")}>
                  <img src={p.sm} alt="" width={p.w} height={p.h} loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      <Lightbox photos={PHOTOS} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
    </section>
  );
}
