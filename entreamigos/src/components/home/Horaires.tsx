// Section 10: "Nos horaires". The week wheel on the left; on the right the hours line by line as the site
// writes them and the open-now status (Europe/Zurich), with a link to the access page.
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { TEXT } from "@/content/site";
import { SplitReveal } from "../Reveal";
import { WeekWheel } from "../WeekWheel";
import { HoursList, OpenNow } from "../Contact";
import { PillLink } from "../ui/Pill";
import { IconArrow } from "../icons";
import { LottieIcon } from "../lottie/LottieIcon";

export function Horaires() {
  const { lang, href, go } = useSite();
  return (
    <section id="horaires" className="relative overflow-hidden bg-acento py-24 text-branco md:py-36" aria-labelledby="hours-title">
      <div className="container-x">
        <p className="eyebrow flex items-center gap-3 text-fundo">
          <LottieIcon name="calendar" size={30} color="#FFFFFF" accent="#DD9933" mode="loop" />
          10 / 16 · {UI.horaires[lang]}
        </p>
        <SplitReveal as="h2" id="hours-title" text={[TEXT.hoursTitle[lang]]} className="mt-4 fs-xxl font-extrabold" />
        <div className="mt-14 grid items-center gap-14 lg:grid-cols-2">
          <WeekWheel />
          <div>
            <OpenNow large />
            <HoursList className="mt-8 text-[clamp(17px,1.2vw,20px)]" />
            <PillLink
              variant="cream"
              className="mt-8"
              href={href("acces")}
              onClick={(e) => {
                e.preventDefault();
                go("acces");
              }}
              iconRight={<IconArrow size={18} />}
            >
              {UI.hoursAccess[lang]}
            </PillLink>
          </div>
        </div>
      </div>
    </section>
  );
}
