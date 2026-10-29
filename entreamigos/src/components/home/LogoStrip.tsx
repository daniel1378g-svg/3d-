// Section 4: an endless band in the buttons' gold with dark ink. It speeds up with scrolling, reverses with the
// scroll direction, and has a pause button.
import { TEXT } from "@/content/site";
import { asset } from "@/lib/utils";
import { Marquee } from "../Marquee";

export function LogoStrip() {
  const words = TEXT.strip;
  return (
    <section aria-label="Entre Amigos" className="relative z-10 bg-destaque py-5 text-marca-escura md:py-7">
      <p className="sr-only">{words.join(" · ")}</p>
      <Marquee speed={70} pauseClassName="bg-marca-escura text-destaque">
        <span className="flex items-center gap-6 pr-6 md:gap-10 md:pr-10">
          <span className="grid h-14 place-items-center rounded-full bg-marca px-5 md:h-20 md:px-7">
            <img src={asset("brand/logo.webp")} alt="" width={900} height={366} className="h-9 w-auto md:h-14" />
          </span>
          {words.map((w) => (
            <span key={w} className="flex items-center gap-6 md:gap-10">
              <span className="whitespace-nowrap font-display text-[clamp(40px,6vw,92px)] font-extrabold uppercase leading-none tracking-[-0.01em]">{w}</span>
              <span aria-hidden="true" className="font-display text-[clamp(40px,5vw,80px)] font-extrabold leading-none text-marca">
                *
              </span>
            </span>
          ))}
        </span>
      </Marquee>
    </section>
  );
}
