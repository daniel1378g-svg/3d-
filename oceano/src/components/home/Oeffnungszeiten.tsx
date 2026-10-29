// Section 10: "Öffnungszeiten". The double clock; beside it both sets of hours as text, line by line as on the
// site, and the live status of each place.
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { TX } from "@/content/site";
import { SplitReveal } from "../Reveal";
import { DoubleClock } from "../DoubleClock";
import { HoursList, OpenNow } from "../Contact";
import { LottieIcon } from "../lottie/LottieIcon";

export function Oeffnungszeiten() {
  const { lang } = useSite();
  return (
    <section id="oeffnungszeiten" className="relative overflow-hidden bg-acento py-24 text-branco md:py-36" aria-labelledby="hours-title">
      <div className="container-x">
        <p className="eyebrow flex items-center gap-3 text-fundo">
          <LottieIcon name="calendar" size={30} color="#FFFFFF" accent="#DFCE9B" mode="loop" />
          10 / 16 · {UI.hours[lang]}
        </p>
        <SplitReveal as="h2" id="hours-title" text={[TX.oeffnungszeiten[lang]]} className="mt-4 fs-xxl font-extrabold" />
        <div className="mt-14 grid items-start gap-14 lg:grid-cols-2">
          <DoubleClock />
          <div className="grid gap-10">
            <div>
              <OpenNow place="restaurant" large />
              <p className="eyebrow mt-6 text-fundo">{TX.oeffnungszeitenRestaurant[lang]}</p>
              <HoursList place="restaurant" className="mt-3 text-[clamp(17px,1.2vw,20px)]" />
              <p className="mt-2 font-hand text-[22px] text-destaque">{UI.pastMidnight[lang]} · Fr · Sa</p>
            </div>
            <div>
              <OpenNow place="laden" large />
              <p className="eyebrow mt-6 text-fundo">{TX.oeffnungszeitenLaden[lang]}</p>
              <HoursList place="laden" className="mt-3 text-[clamp(17px,1.2vw,20px)]" />
            </div>
            <p className="text-[13px] text-fundo/80">{UI.localTime[lang]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
