// Section 10: booking by phone, with "Combien êtes-vous ?". Both phones as big pills and today's hours.
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TEXT } from "@/content/site";
import { SplitReveal } from "../Reveal";
import { PartySize } from "../PartySize";
import { TodayHours } from "../Hours";
import { IconPhone } from "../icons";
import { Skewer } from "../Illustrations";

export function Reserver() {
  const { lang } = useSite();
  return (
    <section id="reservation" className="relative overflow-hidden bg-marca py-24 text-branco md:py-36" aria-labelledby="res-title">
      <div className="container-x grid gap-14 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-destaque">10 / 15 · {UI.byPhone[lang]}</p>
          <SplitReveal as="h2" id="res-title" text={[UI.reserve[lang]]} className="mt-4 fs-mega font-extrabold" />
          <p className="mt-8 max-w-[560px] text-[clamp(19px,1.5vw,24px)] leading-snug">{TEXT.toBook[lang]}</p>
          <div className="mt-6 flex flex-col gap-3 sm:max-w-[460px]">
            {BUSINESS.phones.map((p, i) => (
              <a key={p.tel} href={`tel:${p.tel}`} className={`btn btn--lg justify-between ${i ? "btn--cream" : ""}`}>
                <span className="btn-roll">
                  <span>{p.label}</span>
                  <span aria-hidden="true">{p.label}</span>
                </span>
                <IconPhone size={22} />
              </a>
            ))}
          </div>
          <TodayHours className="mt-8" />
          <Skewer className="mt-12 w-[min(360px,86%)]" />
        </div>
        <div className="lg:pt-24">
          <PartySize />
        </div>
      </div>
    </section>
  );
}
