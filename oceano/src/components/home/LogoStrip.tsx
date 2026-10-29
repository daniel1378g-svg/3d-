// Section 4: an endless band in the buttons' sand with dark ink. It speeds up with scrolling, reverses with the
// scroll direction, and has a pause button.
import { STRIP } from "@/content/site";
import { asset } from "@/lib/utils";
import { Marquee } from "../Marquee";
import { Star } from "../Illustrations";

export function LogoStrip() {
  return (
    <section aria-label="Restaurant Oceano" className="relative z-10 bg-destaque py-5 text-marca-escura md:py-7">
      <p className="sr-only">{STRIP.join(" · ")}</p>
      <Marquee speed={70} pauseClassName="bg-marca-escura text-destaque">
        <span className="flex items-center gap-6 pr-6 md:gap-10 md:pr-10">
          <span className="grid h-14 place-items-center rounded-full bg-marca-escura px-6 md:h-20 md:px-8">
            <img src={asset("brand/logo-white.png")} alt="" width={310} height={88} className="h-7 w-auto md:h-10" />
          </span>
          {STRIP.map((w) => (
            <span key={w} className="flex items-center gap-6 md:gap-10">
              <span className="whitespace-nowrap font-display text-[clamp(40px,6vw,92px)] font-extrabold uppercase leading-none tracking-[-0.01em]">{w}</span>
              <Star className="h-7 w-7 text-marca md:h-10 md:w-10" />
            </span>
          ))}
        </span>
      </Marquee>
    </section>
  );
}
