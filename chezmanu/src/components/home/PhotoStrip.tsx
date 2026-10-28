import { useRef } from "react";
import { TEXT, UI } from "@/i18n";
import { useSite } from "@/site";
import { prefersReducedMotion } from "@/lib/utils";
import { Photo } from "../Photo";
import { Reveal } from "../Reveal";
import { SiteLink } from "../SiteLink";
import { ArrowGlyph } from "../Glyphs";

const STRIP = ["bread-basket", "natas", "salads", "rolls", "fruit-tart", "walnut", "red-velvet", "counter", "tiered", "tearoom"];

/**
 * «notre univers»: the live trio (Boulangerie, Pâtisserie, Tea-room, with their photos) leading a strip of the
 * shop's photos. A native scroller (touch, trackpad, keyboard) that a mouse can also drag; arrows step by card.
 */
export function PhotoStrip() {
  const { lang } = useSite();
  const track = useRef<HTMLUListElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const labels: Record<string, string> = { "bread-basket": TEXT.universeBakery[lang], natas: TEXT.universePastry[lang], salads: TEXT.universeTea[lang] };
  const step = (d: number) => {
    const el = track.current!;
    const card = el.querySelector("li")!.getBoundingClientRect().width + 16;
    el.scrollBy({ left: d * card, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };
  return (
    <section id="univers" aria-labelledby="univers-title" className="gutter overflow-hidden bg-flour py-24 md:py-32">
      <div className="wrap">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="kicker">{TEXT.universeKicker[lang]}</p>
            <h2 id="univers-title" className="display mt-3 max-w-[24ch] text-[clamp(2rem,4vw,3.4rem)] leading-tight text-cocoa">
              {TEXT.universeTitle[lang]}
            </h2>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => step(-1)} className="grid h-12 w-12 place-items-center rounded-full ring-1 ring-espresso/25 hover:bg-espresso/5">
              <ArrowGlyph className="rotate-180" />
              <span className="sr-only">{UI.prevPhoto[lang]}</span>
            </button>
            <button type="button" onClick={() => step(1)} className="grid h-12 w-12 place-items-center rounded-full ring-1 ring-espresso/25 hover:bg-espresso/5">
              <ArrowGlyph />
              <span className="sr-only">{UI.nextPhoto[lang]}</span>
            </button>
          </div>
        </Reveal>
      </div>
      <ul
        ref={track}
        tabIndex={0}
        aria-label={UI.photosTitle[lang]}
        data-cursor="drag"
        className="no-scrollbar mx-auto mt-10 flex max-w-[1280px] snap-x snap-mandatory gap-4 overflow-x-auto pb-4 outline-offset-4 [scroll-padding-inline:0px]"
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") return;
          drag.current = { x: e.clientX, left: track.current!.scrollLeft, moved: false };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d) return;
          const dx = e.clientX - d.x;
          if (Math.abs(dx) > 4) {
            d.moved = true;
            track.current!.style.scrollSnapType = "none";
          }
          track.current!.scrollLeft = d.left - dx;
        }}
        onPointerUp={() => {
          drag.current = null;
          track.current!.style.scrollSnapType = "";
        }}
        onPointerLeave={() => {
          drag.current = null;
          if (track.current) track.current.style.scrollSnapType = "";
        }}
        onClickCapture={(e) => {
          if (drag.current?.moved) e.preventDefault();
        }}
      >
        {STRIP.map((id, i) => (
          <li key={id} className="w-[min(78vw,340px)] shrink-0 snap-start">
            <figure>
              <Photo id={id} sizes="340px" className={i % 3 === 1 ? "aspect-[4/5] rounded-[26px]" : "aspect-square rounded-[26px]"} />
              {labels[id] && <figcaption className="display mt-3 text-2xl text-cocoa">{labels[id]}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>
      <div className="wrap mt-8">
        <SiteLink page="offer" section="galerie" className="btn btn-dark">
          {UI.seeGallery[lang]} <ArrowGlyph />
        </SiteLink>
      </div>
    </section>
  );
}
