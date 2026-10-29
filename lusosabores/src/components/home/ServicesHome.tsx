// Section 11: three tiles from the services page: privatisation, the catering formulas, and meals on site or
// to take away. Text only from the live site, plus the tile labels; call buttons for both numbers.
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TEXT } from "@/content/site";
import { FadeIn, SplitReveal } from "../Reveal";
import { LottieIcon } from "../lottie/LottieIcon";
import type { IconName } from "../lottie/icons";
import { IconArrow, IconPhone } from "../icons";
import { PillLink } from "../ui/Pill";

export function ServicesHome() {
  const { lang, href, go } = useSite();
  const tiles: { title: string; text: string[]; icon: IconName }[] = [
    { title: TEXT.privTitle[lang], text: [TEXT.priv1[lang]], icon: "calendar" },
    { title: UI.formulas[lang], text: [TEXT.priv2[lang]], icon: "pot" },
    { title: UI.onSiteTakeaway[lang], text: [TEXT.takeaway[lang]], icon: "bag" },
  ];
  return (
    <section id="services-home" className="relative overflow-hidden bg-acento py-24 text-marca-escura md:py-36" aria-labelledby="svc-title">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">11 / 15</p>
            <SplitReveal as="h2" id="svc-title" text={[UI.services[lang]]} className="mt-4 fs-mega font-extrabold text-branco" />
          </div>
          <PillLink
            variant="dark"
            href={href("services")}
            onClick={(e) => {
              e.preventDefault();
              go("services");
            }}
            iconRight={<IconArrow size={18} />}
          >
            {UI.services[lang]}
          </PillLink>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {tiles.map((t, i) => (
            <FadeIn key={t.title} delay={i * 0.12} className="group flex min-h-[380px] flex-col justify-between rounded-[24px] bg-branco p-7 text-tinta shadow-[0_30px_60px_-34px_rgba(49,11,10,0.5)]">
              <span className="grid h-20 w-20 place-items-center rounded-full bg-fundo transition-transform duration-500 group-hover:-rotate-6">
                <LottieIcon name={t.icon} size={56} color="#310B0A" accent="#931A25" />
              </span>
              <div>
                <h3 className="font-display text-[clamp(30px,2.6vw,42px)] font-extrabold uppercase leading-[0.95] text-marca">{t.title}</h3>
                {t.text.map((x) => (
                  <p key={x} className="mt-3 text-[17px]">
                    {x}
                  </p>
                ))}
                <div className="mt-6 flex flex-wrap gap-2">
                  {BUSINESS.phones.map((p, k) => (
                    <a key={p.tel} href={`tel:${p.tel}`} className={`btn btn--sm ${k ? "btn--dark" : "btn--marca"}`}>
                      <IconPhone size={16} />
                      <span className="btn-roll">
                        <span>{p.label}</span>
                        <span aria-hidden="true">{p.label}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
