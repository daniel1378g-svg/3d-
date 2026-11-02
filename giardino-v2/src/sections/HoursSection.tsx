// Opening hours: the dial, and beside it the live status of the restaurant and the kitchen, the closure notice in the
// restaurant's own words (it overrides the week and disappears after its last day) and the ordinary table.
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { TX } from "@/content/copy";
import { SplitReveal } from "@/components/Reveal";
import { HoursDial } from "@/components/HoursDial";
import { ClosureNotice, HoursTable, OpenStatus } from "@/components/Hours";
import { PillButton } from "@/components/ui/Pill";

export function HoursSection() {
  const { lang, book } = useSite();
  return (
    <section id="hours" data-anchor data-nav="hours" className="tex-leaf relative overflow-hidden bg-olive py-24 text-white md:py-36" aria-labelledby="hours-title">
      <div className="container-x">
        <p className="eyebrow text-gold">Orari · {UI.localTime[lang]}</p>
        <SplitReveal as="h2" id="hours-title" text={TX.hoursTitle[lang]} className="mt-4 fs-xxl font-extrabold" />
        <p className="mt-5 font-display text-[clamp(20px,1.8vw,28px)] font-semibold uppercase leading-tight tracking-[0.04em] text-cream">
          {TX.hoursLine[lang]}
          <br />
          <span className="text-gold">{TX.kitchenLine[lang]}</span>
        </p>
        <div className="mt-14 grid items-start gap-14 lg:grid-cols-2">
          <HoursDial />
          <div className="grid gap-8">
            <ClosureNotice />
            <div className="grid gap-6 sm:grid-cols-2">
              <OpenStatus large />
              <OpenStatus place="kitchen" large />
            </div>
            <HoursTable className="text-[clamp(16px,1.15vw,19px)]" />
            <p className="text-[14px] text-cream/85">{TX.hoursNote[lang]}</p>
            <div>
              <PillButton onClick={book}>{UI.reserve[lang]}</PillButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
