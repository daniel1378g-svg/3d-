// Section 4: an endless apricot band in dark ink. It speeds up with scrolling, reverses with the scroll
// direction, and has a pause button.
import { useSite } from "@/site";
import { TEXT } from "@/content/site";
import { asset } from "@/lib/utils";
import { Marquee } from "../Marquee";
import { Star } from "../Illustrations";

export function LogoStrip() {
  const { lang } = useSite();
  const words = TEXT.strip[lang].split(" · ");
  return (
    <section aria-label={words.join(" · ")} className="relative z-10 bg-destaque py-5 text-marca-escura md:py-7">
      <Marquee speed={70} pauseClassName="bg-marca-escura text-destaque">
        <span className="flex items-center gap-6 pr-6 md:gap-10 md:pr-10">
          <span className="grid h-14 w-20 place-items-center rounded-full bg-branco md:h-20 md:w-28">
            <img src={asset("brand/logo.webp")} alt="" width={600} height={420} className="h-11 w-auto md:h-16" />
          </span>
          {words.map((w) => (
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
