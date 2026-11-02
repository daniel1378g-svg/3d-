// "Moments at Giardino": on desktop a pinned stage where scrolling moves a strip of photographs sideways (scrub .4 s),
// mixed sizes 40–62 svh with 20 px corners and the odd arch, a progress bar and counter, drag and arrow keys, and a
// Grid / Track switch. Phones swipe natively with snapping; reduced motion gets the grid. Filters: Food, Restaurant &
// Terrace, Families. A tap opens the lightbox.
import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { UI, type PageKey } from "@/i18n";
import { useSite } from "@/site";
import { TX } from "@/content/copy";
import { GALLERY, altOf, photo, type PhotoGroup } from "@/content/photos";
import { useIsDesktop, useReduced } from "@/lib/useMedia";
import { loadGsap } from "@/lib/useGsap";
import { cn } from "@/lib/utils";
import { Photo } from "@/components/Photo";
import { MaskPhoto, SplitReveal } from "@/components/Reveal";
import { Lightbox } from "@/components/Lightbox";
import { IconArrow, IconGrid, IconRows } from "@/components/icons";
import { PillLink } from "@/components/ui/Pill";
import type { ScrollTrigger as ST } from "gsap/ScrollTrigger";

const SIZES = ["h-[62svh] aspect-[4/5]", "h-[44svh] aspect-[4/3] self-end", "h-[54svh] aspect-[3/4] self-start", "h-[40svh] aspect-square self-center", "h-[58svh] aspect-[5/4] self-end"];
const GROUPS: { v: PhotoGroup; label: "food" | "restaurantTerrace" | "familiesCat" }[] = [
  { v: "food", label: "food" },
  { v: "restaurant", label: "restaurantTerrace" },
  { v: "families", label: "familiesCat" },
];

function GroupToggle({ value, onChange }: { value: PhotoGroup; onChange: (v: PhotoGroup) => void }) {
  const { lang } = useSite();
  return (
    <div role="group" aria-label={UI.galleryFilter[lang]} className="inline-flex flex-wrap gap-1 rounded-full bg-white/10 p-1">
      {GROUPS.map((g) => (
        <button key={g.v} type="button" aria-pressed={value === g.v} onClick={() => onChange(g.v)} className={cn("relative min-h-11 rounded-full px-4 py-2 font-display text-[14px] font-semibold uppercase tracking-[0.12em]", value === g.v ? "text-ink" : "text-white")}>
          {value === g.v && <motion.span layoutId="gal-group" className="absolute inset-0 rounded-full bg-gold" transition={{ type: "spring", stiffness: 480, damping: 38 }} />}
          <span className="relative">{UI[g.label][lang]}</span>
        </button>
      ))}
    </div>
  );
}

export function GallerySection({ page = false, initial = "food" }: { page?: boolean; initial?: PhotoGroup }) {
  const { lang, href, go } = useSite();
  const desktop = useIsDesktop();
  const reduce = useReduced();
  const [group, setGroup] = useState<PhotoGroup>(initial);
  const [grid, setGrid] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const st = useRef<ST | null>(null);
  const drag = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const ids = GALLERY[group];
  const pinned = desktop && !reduce && !grid;

  useLayoutEffect(() => {
    if (!pinned || !track.current || !section.current) return;
    let alive = true;
    let revert: (() => void) | null = null;
    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (!alive || !track.current) return;
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
            onUpdate: (self) => setCurrent(Math.min(ids.length - 1, Math.round(self.progress * (ids.length - 1)))),
          },
        });
        st.current = tween.scrollTrigger ?? null;
      }, section);
      ScrollTrigger.refresh();
      revert = () => ctx.revert();
    });
    return () => {
      alive = false;
      st.current = null;
      revert?.();
    };
  }, [pinned, group]); // eslint-disable-line react-hooks/exhaustive-deps

  /** Brings photo i into view inside the pinned strip (keyboard focus moves the page scroll). */
  const reveal = (i: number) => {
    const t = st.current;
    const item = track.current?.children[i] as HTMLElement | undefined;
    if (!t || !item || !track.current) return;
    const dist = track.current.scrollWidth - window.innerWidth;
    const x = Math.max(0, Math.min(dist, item.offsetLeft + item.offsetWidth / 2 - window.innerWidth / 2));
    window.scrollTo({ top: t.start + x, behavior: "auto" });
  };

  const toggle = (
    <button type="button" onClick={() => setGrid((g) => !g)} aria-pressed={grid} className="btn btn--ghost btn--sm text-white">
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
        <p className="eyebrow text-gold">
          {UI.gallery[lang]} · {ids.length} {UI.photos[lang]}
        </p>
        <SplitReveal as="h2" id="gal-title" text={TX.galleryTitle[lang]} className={cn("mt-4 font-extrabold", page ? "fs-xl" : "fs-xxl")} />
        <p className="mt-4 max-w-[720px] text-[clamp(17px,1.2vw,20px)] text-cream/90">{TX.galleryLead[lang]}</p>
        <div className="mt-6">
          <GroupToggle value={group} onChange={setGroup} />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {!reduce && desktop && toggle}
        {!page && (
          <PillLink
            href={href("gallery" as PageKey)}
            onClick={(e) => {
              e.preventDefault();
              go("gallery");
            }}
            iconRight={<IconArrow size={18} />}
            size="sm"
          >
            {UI.gallery[lang]}
          </PillLink>
        )}
      </div>
    </div>
  );

  return (
    <section id="gallery" data-anchor ref={section} className="relative bg-ink text-white" aria-labelledby="gal-title">
      {pinned ? (
        <div className="gal-stage flex h-[100svh] flex-col justify-center gap-7 overflow-hidden pt-[calc(var(--band-h)+76px)]">
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
              items[Math.max(0, Math.min(items.length - 1, i + (e.key === "ArrowRight" ? 1 : -1)))]?.focus();
              e.preventDefault();
            }}
          >
            {ids.map((id, i) => (
              <button
                key={id}
                type="button"
                onFocus={() => reveal(i)}
                onClick={() => !drag.current?.moved && setOpen(i)}
                aria-label={`${UI.openPhoto[lang]}: ${altOf(photo(id), lang)}`}
                className={cn("group relative shrink-0 overflow-hidden", i % 6 === 2 ? "arch-full h-[60svh] aspect-[3/4]" : cn("rounded-[20px]", SIZES[i % SIZES.length]))}
              >
                <Photo id={id} decorative sizes="44vw" draggable={false} className="block h-full w-full" imgClassName="transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]" />
              </button>
            ))}
          </div>
          <div className="container-x flex items-center gap-4">
            <span className="font-display text-sm font-semibold tracking-[0.2em] text-cream" aria-hidden="true">
              {String(current + 1).padStart(2, "0")} / {String(ids.length).padStart(2, "0")}
            </span>
            <span className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/15" aria-hidden="true">
              <span className="absolute inset-y-0 left-0 rounded-full bg-gold transition-[width] duration-200" style={{ width: `${((current + 1) / ids.length) * 100}%` }} />
            </span>
            <span className="meta text-[12px] text-cream/85">{UI.dragHint[lang]}</span>
          </div>
        </div>
      ) : (
        <div className="pb-24 pt-24 md:pb-32 md:pt-32">
          {heading}
          {grid || reduce ? (
            <div className="container-x mt-12 columns-2 gap-4 md:columns-3 lg:columns-4">
              {ids.map((id, i) => (
                <button key={id} type="button" onClick={() => setOpen(i)} aria-label={`${UI.openPhoto[lang]}: ${altOf(photo(id), lang)}`} className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-[18px]">
                  <MaskPhoto id={id} decorative sizes="(min-width: 1024px) 25vw, 50vw" delay={(i % 4) * 0.06} className="aspect-[4/3] w-full rounded-[18px]" />
                </button>
              ))}
            </div>
          ) : (
            <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--gutter)] pb-4" style={{ scrollPaddingInline: "var(--gutter)" }}>
              {ids.map((id, i) => (
                <button key={id} type="button" onClick={() => setOpen(i)} aria-label={`${UI.openPhoto[lang]}: ${altOf(photo(id), lang)}`} className={cn("relative h-[52svh] max-h-[520px] shrink-0 snap-start overflow-hidden", i % 6 === 2 ? "arch-full aspect-[3/4]" : "aspect-[4/5] rounded-[20px]")}>
                  <Photo id={id} decorative sizes="80vw" className="block h-full w-full" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      <Lightbox ids={ids} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
    </section>
  );
}
