// Section 10: booking by phone and groups, with "Combien êtes-vous ?".
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TEXT } from "@/content/site";
import { SplitReveal } from "../Reveal";
import { PartySize } from "../PartySize";
import { IconMail, IconPhone } from "../icons";
import { Tram } from "../Illustrations";

export function Reserver() {
  const { lang } = useSite();
  return (
    <section id="reservation" className="relative overflow-hidden bg-azulejo py-24 text-branco md:py-36" aria-labelledby="res-title">
      <div className="container-x grid gap-14 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-dourado">10 / 15 · {UI.groups[lang]}</p>
          <SplitReveal as="h2" id="res-title" text={[UI.reserve[lang]]} className="mt-4 fs-mega font-extrabold" />
          <p className="eyebrow mt-8 text-espuma">{TEXT.booking[lang]}</p>
          <div className="mt-4 flex flex-col gap-3 sm:max-w-[460px]">
            {BUSINESS.phones.map((p, i) => (
              <a key={p.tel} href={`tel:${p.tel}`} className={`btn btn--lg justify-between ${i ? "btn--cream" : ""}`}>
                <span className="btn-roll">
                  <span>{p.label}</span>
                  <span aria-hidden="true">{p.label}</span>
                </span>
                <IconPhone size={22} />
              </a>
            ))}
            <a href={`mailto:${BUSINESS.email}`} className="btn btn--ghost justify-between">
              <span className="btn-roll normal-case tracking-[0.04em]">
                <span>{BUSINESS.email}</span>
                <span aria-hidden="true">{BUSINESS.email}</span>
              </span>
              <IconMail size={20} />
            </a>
          </div>
          <p className="mt-6 text-lg font-bold">{TEXT.closed[lang]}</p>
          <Tram className="mt-12 w-[min(320px,80%)]" />
        </div>
        <div className="lg:pt-24">
          <PartySize />
        </div>
      </div>
    </section>
  );
}
