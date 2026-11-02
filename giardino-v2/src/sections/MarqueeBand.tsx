// The pale-gold band: GIARDINO, PIZZA, PASTA, LEUKERBAD, FAMIGLIA … in oversized dark letters with small brand
// medallions and star separators. About 70 px/s, faster with scrolling and following its direction; pause button;
// it stops while off screen.
import { Medallion } from "@/components/Brand";
import { Marquee } from "@/components/Marquee";
import { Spark } from "@/components/icons";

const WORDS = ["Giardino", "Pizza", "Pasta", "Leukerbad", "Famiglia", "Risotto", "Gemmi"];

export function MarqueeBand() {
  return (
    <section aria-label="Pizzeria Giardino" className="relative z-10 bg-gold py-5 text-ink md:py-7">
      <p className="sr-only">{WORDS.join(" · ")}</p>
      <Marquee speed={70} pauseClassName="bg-ink text-gold">
        <span className="flex items-center gap-6 pr-6 md:gap-10 md:pr-10">
          {WORDS.map((w, i) => (
            <span key={w} className="flex items-center gap-6 md:gap-10">
              {i % 3 === 0 && <Medallion className="h-14 w-14 md:h-20 md:w-20" />}
              <span className="whitespace-nowrap font-display text-[clamp(44px,6.4vw,104px)] font-extrabold uppercase leading-none tracking-[-0.01em]">{w}</span>
              <Spark className="h-7 w-7 text-olive md:h-10 md:w-10" />
            </span>
          ))}
        </span>
      </Marquee>
    </section>
  );
}
