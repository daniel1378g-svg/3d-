import { UI } from "@/i18n";
import { CONTACT } from "@/content";
import { useSite } from "@/site";
import { LottieIcon } from "@/lottie/LottieIcon";
import type { IconName } from "@/lottie/icons";
import { Magnetic } from "../Magnetic";
import { Heading, Reveal } from "../Reveal";
import { LiveBadge } from "../LiveBadge";
import { ExternalIcon } from "../icons";

/** Three big magnetic choices: book (MyLocalina drawer), delivery (Just Eat, new tab), call. */
export function BookOrder() {
  const { lang, book } = useSite();
  const card = "group flex min-h-[200px] w-full flex-col items-start justify-between gap-6 rounded-[28px] p-6 text-left transition-colors md:min-h-[240px] md:p-8";
  const inner = (icon: IconName, title: string, sub: string, color: string, accent: string, external = false) => (
    <>
      <LottieIcon name={icon} color={color} accent={accent} size={56} mode="hover" />
      <span>
        <span className="flex items-center gap-2 font-display text-3xl font-bold leading-tight md:text-4xl">
          {title}
          {external && <ExternalIcon size={18} className="opacity-70" />}
        </span>
        <span className="mt-1 block text-[15px] font-semibold opacity-85">{sub}</span>
      </span>
    </>
  );
  return (
    <section id="reserver" aria-labelledby="book-title" className="on-dark tex-grill gutter bg-bordeaux py-20 text-linen md:py-28">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Heading id="book-title" eyebrow="MyLocalina · JUST EAT" title={UI.bookTitle[lang]} tone="dark" />
            <Reveal delay={0.05}>
              <p className="mt-4 max-w-[52ch] text-lg text-linen/90">{UI.bookLead[lang]}</p>
            </Reveal>
          </div>
          <LiveBadge />
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          <Reveal as="li">
            <Magnetic className="w-full" strength={0.18}>
              <button type="button" onClick={book} className={`${card} bg-linen text-bordeaux hover:bg-white`}>
                {inner("calendar", UI.book[lang], UI.booking[lang], "#6B1E2E", "#E0612B")}
              </button>
            </Magnetic>
          </Reveal>
          <Reveal as="li" delay={0.06}>
            <Magnetic className="w-full" strength={0.18}>
              <a href={CONTACT.delivery} target="_blank" rel="noopener" className={`${card} bg-ember text-charcoal hover:bg-gold`}>
                {inner("scooter", UI.delivery[lang], "JUST EAT", "#1B1414", "#6B1E2E", true)}
                <span className="sr-only">({UI.newTab[lang]})</span>
              </a>
            </Magnetic>
          </Reveal>
          <Reveal as="li" delay={0.12}>
            <Magnetic className="w-full" strength={0.18}>
              <a href={CONTACT.tel} className={`${card} bg-charcoal text-linen ring-1 ring-linen/15 hover:bg-charcoal-2`}>
                {inner("phone", UI.call[lang], CONTACT.phone, "#F5EEE4", "#C9A44A")}
              </a>
            </Magnetic>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
