// Section 4: an endless gold band in night ink. It speeds up with scrolling, reverses with the scroll
// direction, and has a pause button.
import { useSite } from "@/site";
import { TEXT } from "@/content/site";
import { asset } from "@/lib/utils";
import { Marquee } from "../Marquee";
import { Star } from "../Illustrations";

export function LogoStrip() {
  const { lang } = useSite();
  const words = TEXT.strip.map((w) => (w === "DEPUIS 1973" ? TEXT.stripSince[lang] : w));
  return (
    <section aria-label="Le Portugais · Marisqueira" className="relative z-10 bg-dourado py-5 text-oceano md:py-7">
      <p className="sr-only">{words.join(" · ")}</p>
      <Marquee speed={70} pauseClassName="bg-oceano text-dourado">
        <span className="flex items-center gap-6 pr-6 md:gap-10 md:pr-10">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-sal md:h-20 md:w-20">
            <img src={asset("brand/logo.webp")} alt="" width={500} height={512} className="h-11 w-auto md:h-16" />
          </span>
          {words.map((w) => (
            <span key={w} className="flex items-center gap-6 md:gap-10">
              <span className="whitespace-nowrap font-display text-[clamp(40px,6vw,92px)] font-extrabold uppercase leading-none tracking-[-0.01em]">{w}</span>
              <Star className="h-7 w-7 text-azulejo md:h-10 md:w-10" />
            </span>
          ))}
        </span>
      </Marquee>
    </section>
  );
}
