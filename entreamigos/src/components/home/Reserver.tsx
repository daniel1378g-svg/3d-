// Section 11: booking by phone or e-mail, today's hours, and "Combien êtes-vous ?" (from 10 people, the five
// dishes made to order appear as chips that open the group planner).
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS } from "@/content/site";
import { SplitReveal } from "../Reveal";
import { PartySize } from "../PartySize";
import { IconMail, IconPhone } from "../icons";
import { Bus } from "../Illustrations";
import { todayLine } from "../Contact";

export function Reserver() {
  const { lang } = useSite();
  return (
    <section id="reservation" className="relative overflow-hidden bg-marca py-24 text-branco md:py-36" aria-labelledby="res-title">
      <div className="container-x grid gap-14 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-destaque">11 / 16 · {UI.bookingTitle[lang]}</p>
          <SplitReveal as="h2" id="res-title" text={[UI.reserve[lang]]} className="mt-4 fs-mega font-extrabold" />
          <p className="eyebrow mt-8 text-suave">{UI.bookingLine[lang]}</p>
          <div className="mt-4 flex flex-col gap-3 sm:max-w-[460px]">
            <a href={`tel:${BUSINESS.phoneTel}`} className="btn btn--lg justify-between">
              <span className="btn-roll">
                <span>{BUSINESS.phone}</span>
                <span aria-hidden="true">{BUSINESS.phone}</span>
              </span>
              <IconPhone size={22} />
            </a>
            <a href={`mailto:${BUSINESS.email}`} className="btn btn--lg btn--cream justify-between normal-case tracking-[0.04em]">
              <span className="btn-roll">
                <span>{BUSINESS.email}</span>
                <span aria-hidden="true">{BUSINESS.email}</span>
              </span>
              <IconMail size={22} />
            </a>
          </div>
          <p className="mt-6 text-lg font-bold">{todayLine(lang)}</p>
          <Bus className="mt-12 w-[min(320px,80%)]" />
        </div>
        <div className="lg:pt-24">
          <PartySize />
        </div>
      </div>
    </section>
  );
}
