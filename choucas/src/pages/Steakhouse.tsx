import { UI } from "@/i18n";
import { HOME, MENU_PAGE, STEAKHOUSE } from "@/copy";
import { brandImg } from "@/content";
import { useSite } from "@/site";
import { PageHero } from "@/components/PageHero";
import { LiveBadge } from "@/components/LiveBadge";
import { Heading } from "@/components/Reveal";
import { MenuBoard } from "@/components/MenuBoard";
import { HoursList } from "@/components/Contact";
import { SiteLink } from "@/components/SiteLink";
import { GauchoStory } from "@/components/GauchoStory";
import { Featured } from "@/components/Featured";
import { ArrowRight } from "@/components/icons";

export function Steakhouse() {
  const { lang, book } = useSite();
  return (
    <>
      <PageHero
        eyebrow={HOME.boxes.oasis.intro[lang]}
        title={STEAKHOUSE.title[lang]}
        lead={
          <>
            {STEAKHOUSE.text[lang]}{" "}
            <SiteLink page="home" section="bilder" className="font-semibold text-sand underline underline-offset-4 hover:text-snow">
              {STEAKHOUSE.photosLink[lang]}
            </SiteLink>
          </>
        }
        photoId="steakhouse"
        dot="bg-ember"
        accent="bg-[#24140c]"
      >
        <LiveBadge place="oasis" tone="dark" />
        <button type="button" onClick={book} className="inline-flex min-h-12 items-center rounded-full bg-beak px-6 font-bold text-ink hover:bg-white">
          {UI.book[lang]}
        </button>
        <span className="rounded-2xl bg-snow p-2">
          <img src={brandImg("lareunion-logo")} alt="LaReunion" width={160} height={162} loading="lazy" className="size-16 object-contain" />
        </span>
      </PageHero>
      <GauchoStory />

      <section aria-labelledby="featured-title" className="on-light gutter bg-sand/45 py-20 md:py-28">
        <div className="wrap">
          <Heading id="featured-title" eyebrow={MENU_PAGE.title[lang]} title={UI.grillPart[lang]} dot="bg-ember" />
          <Featured />
        </div>
      </section>

      <section aria-labelledby="oasis-menu" className="on-light gutter bg-snow py-20 md:py-28">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Heading id="oasis-menu" title={UI.nav.menu[lang]} dot="bg-ember" />
            <SiteLink page="menu" className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-bold text-snow hover:bg-ink-2">
              {UI.wholeMenu[lang]}
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </SiteLink>
          </div>
          <MenuBoard only="oasis" compact />
        </div>
      </section>

      <section aria-labelledby="oasis-hours" className="on-dark gutter bg-ink py-20 text-snow md:py-24">
        <div className="wrap max-w-3xl">
          <Heading id="oasis-hours" title={UI.hours[lang]} tone="dark" dot="bg-beak" />
          <div className="mt-8">
            <HoursList tone="dark" only="oasis" />
          </div>
        </div>
      </section>
    </>
  );
}
