import { HTML_LANG, UI } from "@/i18n";
import { TEASER } from "@/copy";
import { CONTACT, chf, descIn, findDish, photo, photoAlt, photoSize } from "@/content";
import { useSite } from "@/site";
import { SiteLink } from "../SiteLink";
import { TiltCard } from "../TiltCard";
import { Reveal } from "../Reveal";
import { ArrowRight, ExternalIcon } from "../icons";
import { LottieIcon } from "@/lottie/LottieIcon";

// The three dishes of the live home page, with the photos it shows for them.
const CARDS = [
  { dish: findDish("incontournables", "Bacalhau à lagareiro"), photo: "ze-do-pipo-fotos-y-video0032", section: "poissons", icon: "fish" as const },
  { dish: findDish("viandes", "Bitoque de vaca"), photo: "bitoque-500", section: "viandes", icon: "grill" as const },
  { dish: findDish("entrees", "Saladinha de Polvo"), photo: "ze-do-pipo-fotos-y-video0044", section: "entrees", icon: "fish" as const },
];

export function MenuTeaser() {
  const { lang } = useSite();
  return (
    <section id="notre-menu" aria-labelledby="teaser-title" className="on-light gutter bg-linen py-20 md:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-[0.9fr_1.6fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-[calc(var(--header-h)+var(--label-h)+40px)] lg:self-start">
          <h2 id="teaser-title" className="font-display text-[clamp(3rem,8vw,6.5rem)] font-extrabold leading-[0.85] tracking-[-0.04em] text-bordeaux">
            {TEASER.title[lang]}
          </h2>
          <p className="mt-6 font-display text-xl font-semibold text-charcoal md:text-2xl">{TEASER.line1[lang]}</p>
          <p className="mt-3 text-lg text-ink-soft">{TEASER.line2[lang]}</p>
          <p className="mt-5">
            <a href={CONTACT.delivery} target="_blank" rel="noopener" className="group inline-flex items-start gap-2 text-[17px] font-semibold text-bordeaux underline decoration-bordeaux/30 underline-offset-4 hover:decoration-bordeaux">
              <LottieIcon name="scooter" color="#6B1E2E" accent="#E0612B" size={28} mode="hover" className="-mt-0.5" />
              <span>
                {TEASER.justEat[lang]}
                <ExternalIcon className="ml-1 inline" />
                <span className="sr-only"> ({UI.newTab[lang]})</span>
              </span>
            </a>
          </p>
          <SiteLink page="menu" className="group mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-bordeaux px-6 font-bold text-linen transition-colors hover:bg-bordeaux-deep">
            {TEASER.full[lang]}
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </SiteLink>
        </Reveal>

        <div>
          <Reveal>
            <h3 className="font-hand text-3xl font-semibold text-ember-deep md:text-4xl">{TEASER.specialities[lang]}</h3>
          </Reveal>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {CARDS.map((c, i) => {
              const [w, h] = photoSize(c.photo);
              return (
                <Reveal as="li" key={c.dish.id} delay={i * 0.08} className={i === 1 ? "xl:translate-y-10" : undefined}>
                  <TiltCard className="h-full">
                    <SiteLink
                      page="menu"
                      section={c.section}
                      data-cursor="view"
                      className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_30px_60px_-36px_rgba(27,20,20,0.55)] ring-1 ring-charcoal/8"
                    >
                      <span className="relative block aspect-[4/3] overflow-hidden">
                        <img
                          src={photo(c.photo)}
                          srcSet={`${photo(c.photo, true)} 480w, ${photo(c.photo)} ${w}w`}
                          sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 92vw"
                          width={w}
                          height={h}
                          alt={photoAlt(c.photo, lang)}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]"
                        />
                        <span className="absolute left-3 top-3 rounded-full bg-linen/95 px-3 py-1 font-display text-sm font-bold text-bordeaux">{chf(c.dish)}</span>
                      </span>
                      <span className="flex flex-1 flex-col gap-2 p-5 [transform:translateZ(30px)]">
                        <span className="flex items-center gap-2">
                          <LottieIcon name={c.icon} color="#6B1E2E" accent="#E0612B" size={30} mode="hover" />
                          <span className="font-display text-xl font-bold leading-tight text-charcoal">{c.dish.name}</span>
                        </span>
                        <span lang={HTML_LANG[lang]} className="text-[15px] leading-relaxed text-ink-soft">
                          {descIn(c.dish, lang)}
                        </span>
                      </span>
                    </SiteLink>
                  </TiltCard>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
