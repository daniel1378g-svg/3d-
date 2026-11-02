// The head of an inner page: olive ground, tracked eyebrow, oversized title rising line by line, a lead, and the
// page's photograph in a tall arch.
import type { ReactNode } from "react";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";
import { FadeIn, MaskPhoto, SplitReveal } from "./Reveal";

export function PageHero({ eyebrow, title, lead, photo, focus, children, tone = "olive" }: { eyebrow: string; title: string; lead?: string; photo?: string; focus?: string; children?: ReactNode; tone?: "olive" | "ink" | "green" }) {
  const { introDone } = useSite();
  // the title shrinks with its longest word, so long German or French words never clip beside the photo
  const longest = Math.max(...title.split(/\s+/).map((w) => w.length));
  const size = longest > 13 ? "fs-xl" : longest > 9 ? "fs-xxl" : "fs-mega";
  return (
    <section id="top" data-anchor className={cn("tex-leaf relative overflow-hidden pb-20 text-white md:pb-28", tone === "olive" ? "bg-olive" : tone === "ink" ? "bg-ink" : "bg-green")} style={{ paddingTop: "calc(var(--band-h) + 150px)" }}>
      <div className={cn("container-x grid items-end gap-12", photo && "lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]")}>
        <div>
          <p className="eyebrow text-gold">{eyebrow}</p>
          <SplitReveal as="h1" text={title} ready={introDone} className={cn("mt-5 font-extrabold leading-[0.88]", size)} />
          {lead && (
            <FadeIn as="p" className="lede mt-7 max-w-[680px] text-cream/95">
              {lead}
            </FadeIn>
          )}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
        {photo && <MaskPhoto id={photo} eager sizes="(min-width: 1024px) 32vw, 92vw" className="arch-full aspect-[4/5] w-full max-w-[480px] justify-self-end" focus={focus} />}
      </div>
    </section>
  );
}
