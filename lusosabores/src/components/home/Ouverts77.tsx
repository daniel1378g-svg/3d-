// Section 9: "Ouverts 7/7". The week wheel on the left; on the right the live paragraph, "REPAS SUR PLACE OU À
// L'EMPORTER" and the plate with the logo (drag to spin it). Then a link to the hours and directions.
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { TEXT } from "@/content/site";
import { SplitReveal } from "../Reveal";
import { WeekWheel } from "../WeekWheel";
import { Plate } from "../Plate";
import { PillLink } from "../ui/Pill";
import { IconArrow } from "../icons";
import { Counter } from "../Counter";

export function Ouverts77() {
  const { lang, href, go } = useSite();
  return (
    <section id="horaires" className="on-dark tex-grill relative overflow-hidden bg-marca-escura py-24 text-branco md:py-36" aria-labelledby="o77-title">
      <div className="container-x">
        <p className="eyebrow text-destaque">09 / 15 · {UI.hours[lang]}</p>
        <h2 id="o77-title" className="sr-only">
          {TEXT.openTitle[lang]}
        </h2>
        <p aria-hidden="true" className="mt-4 flex flex-wrap items-baseline gap-x-6 fs-mega font-display font-extrabold uppercase leading-[0.88]">
          <SplitReveal as="span" text={[TEXT.openTitle[lang].replace(/\s*7\/7$/, "")]} />
          <span className="text-destaque">
            <Counter to={7} from={1} />
            /7
          </span>
        </p>
        <div className="mt-14 grid items-center gap-14 lg:grid-cols-2">
          <WeekWheel />
          <div>
            <p className="max-w-[620px] text-[clamp(18px,1.4vw,22px)] leading-relaxed">{TEXT.open77[lang]}</p>
            <p className="mt-6 font-display text-[clamp(24px,2.2vw,34px)] font-bold uppercase leading-none text-destaque">{TEXT.onSite[lang]}</p>
            <div className="mt-8 flex items-center gap-6">
              <Plate className="w-[min(300px,62vw)] shrink-0" />
              <p className="meta max-w-[180px] text-[12px] text-suave">{UI.spinHint[lang]}</p>
            </div>
            <PillLink
              className="mt-8"
              href={href("contact")}
              onClick={(e) => {
                e.preventDefault();
                go("contact");
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
