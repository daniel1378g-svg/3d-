import { UI } from "@/i18n";
import { CONTACT } from "@/content";
import { useSite } from "@/site";
import { LottieIcon } from "@/lottie/LottieIcon";
import { Magnetic } from "../Magnetic";
import { Photo } from "../Photo";
import { Reveal } from "../Reveal";

/** #reservation: three magnetic ways to get a table. */
export function Reserve() {
  const { lang, openBooking, toast } = useSite();
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      toast(UI.copied[lang]);
    } catch {
      window.location.href = `mailto:${CONTACT.email}`;
    }
  };
  return (
    <section id="reservation" aria-labelledby="reservation-title" className="charcoal on-dark gutter relative overflow-hidden py-24 md:py-32">
      <div className="wrap grid items-center gap-12 md:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <p className="kicker text-leaf-light">{UI.reservations[lang]}</p>
          <h2 id="reservation-title" className="display mt-2 text-[clamp(2.4rem,5.6vw,4.8rem)] font-semibold leading-none">{UI.navReservation[lang]}</h2>
          <p className="mt-5 max-w-[40ch] text-lg text-linen/80">{UI.reserveLead[lang]}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Magnetic>
              <button type="button" onClick={openBooking} className="btn btn-olive group min-h-14 px-6 text-base" data-cursor="book">
                <LottieIcon name="calendar" mode="hover" size={28} color="#1F2229" accent="#1F2229" />
                {UI.navReservation[lang]}
              </button>
            </Magnetic>
            <Magnetic>
              <a href={CONTACT.phoneHref} className="btn btn-ghost group min-h-14 px-6 text-base" data-cursor="call">
                <LottieIcon name="phone" mode="hover" size={28} color="#F6F1E7" accent="#84C054" />
                {UI.call[lang]} · {CONTACT.phone}
              </a>
            </Magnetic>
            <Magnetic>
              <a href={`mailto:${CONTACT.email}`} className="btn btn-ghost group min-h-14 px-6 text-base">
                <LottieIcon name="mail" mode="hover" size={28} color="#F6F1E7" accent="#84C054" />
                {UI.email[lang]}
              </a>
            </Magnetic>
          </div>
          <button type="button" onClick={copy} className="mt-4 text-sm font-semibold text-linen/70 underline underline-offset-4 hover:text-linen">
            {UI.copyEmail[lang]}: {CONTACT.email}
          </button>
        </Reveal>
        <Reveal delay={0.1} className="relative">
          <Photo id="own-10" living className="aspect-[4/3] w-full rounded-[28px] shadow-lift" sizes="(min-width: 768px) 560px, 100vw" />
        </Reveal>
      </div>
    </section>
  );
}
