// Section 11: the three services of the live services line.
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TEXT } from "@/content/site";
import { FadeIn, SplitReveal } from "../Reveal";
import { LottieIcon } from "../lottie/LottieIcon";
import type { IconName } from "../lottie/icons";
import { IconMail, IconPhone } from "../icons";

const TILES: { key: "takeaway" | "catering" | "wineSales"; icon: IconName }[] = [
  { key: "takeaway", icon: "bag" },
  { key: "catering", icon: "pot" },
  { key: "wineSales", icon: "glass" },
];

export function Services() {
  const { lang } = useSite();
  return (
    <section className="relative overflow-hidden bg-coral py-24 text-branco md:py-36" aria-labelledby="svc-title">
      <div className="container-x">
        <p className="eyebrow text-sal">11 / 15</p>
        <SplitReveal as="h2" id="svc-title" text={[UI.services[lang]]} className="mt-4 text-[clamp(40px,7.6vw,136px)] font-extrabold" />
        <p className="mt-6 max-w-[820px] text-lg">{TEXT.services[lang]}</p>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {TILES.map((t, i) => (
            <FadeIn key={t.key} delay={i * 0.12} className="group flex min-h-[340px] flex-col justify-between rounded-[24px] bg-branco p-7 text-tinta">
              <span className="grid h-20 w-20 place-items-center rounded-full bg-sal transition-transform duration-500 group-hover:-rotate-6">
                <LottieIcon name={t.icon} size={56} />
              </span>
              <div>
                <h3 className="font-display text-[clamp(34px,3vw,48px)] font-extrabold uppercase leading-[0.95]">{UI[t.key][lang]}</h3>
                <div className="mt-6 flex flex-wrap gap-2">
                  <a href={`tel:${BUSINESS.phones[0].tel}`} className="btn btn--sm btn--coral">
                    <IconPhone size={16} />
                    <span className="btn-roll">
                      <span>{UI.call[lang]}</span>
                      <span aria-hidden="true">{UI.call[lang]}</span>
                    </span>
                  </a>
                  <a href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent(UI[t.key][lang])}`} className="btn btn--sm btn--dark">
                    <IconMail size={16} />
                    <span className="btn-roll">
                      <span>{UI.email[lang]}</span>
                      <span aria-hidden="true">{UI.email[lang]}</span>
                    </span>
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
