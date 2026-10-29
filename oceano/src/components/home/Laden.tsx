// Section 7: Unser Laden. The first shop paragraph on the left; on the right the shop photo in an arch, the
// shop's status today, its phone and "Jetzt bestellen".
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TX } from "@/content/site";
import { photo } from "@/content/photos";
import { MaskImage, SplitReveal } from "../Reveal";
import { OpenNow } from "../Contact";
import { PillLink } from "../ui/Pill";
import { IconArrow, IconExternal, IconPhone } from "../icons";
import { Basket } from "../Illustrations";

export function Laden() {
  const { lang, href, go } = useSite();
  const p = photo("laden-theke");
  return (
    <section id="laden" className="relative overflow-hidden bg-acento-escuro py-24 text-branco md:py-36" aria-labelledby="laden-title">
      <Basket className="pointer-events-none absolute -left-6 bottom-10 w-32 rotate-[-10deg] opacity-80 md:w-48" />
      <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)]">
        <div>
          <p className="eyebrow text-destaque">
            07 / 16 · {BUSINESS.shop} · {BUSINESS.laden.street}
          </p>
          <SplitReveal as="h2" id="laden-title" text={[UI.laden[lang]]} className="mt-4 fs-xxl font-extrabold" />
          <p className="mt-6 max-w-[760px] font-display text-[clamp(22px,2vw,32px)] font-semibold uppercase leading-[1.08]">{TX.ladenH2[lang]}</p>
          <p className="mt-6 max-w-[720px] text-[clamp(17px,1.2vw,20px)] text-branco/90">{TX.ladenP1[lang]}</p>
          <p className="mt-4 max-w-[720px] text-[clamp(17px,1.2vw,20px)] text-branco/80">{TX.ladenP2[lang]}</p>
          <PillLink
            variant="ghost"
            className="mt-8 text-branco"
            href={href("laden")}
            onClick={(e) => {
              e.preventDefault();
              go("laden");
            }}
            iconRight={<IconArrow size={18} />}
          >
            {UI.laden[lang]}
          </PillLink>
        </div>
        <div className="space-y-6">
          <MaskImage src={p.sm} srcSet={`${p.sm} 800w, ${p.src} 1600w`} sizes="(min-width: 1024px) 40vw, 92vw" alt={p.alt[lang]} w={p.w} h={p.h} className="arch aspect-[4/3] w-full" />
          <div className="rounded-[24px] bg-branco/[0.08] p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]">
            <OpenNow place="laden" />
            <p className="mt-4 text-suave">
              {BUSINESS.laden.street}, {BUSINESS.laden.city}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={`tel:${BUSINESS.laden.tel}`} className="btn btn--sm btn--cream">
                <IconPhone size={16} />
                <span className="btn-roll">
                  <span>{BUSINESS.laden.phone}</span>
                  <span aria-hidden="true">{BUSINESS.laden.phone}</span>
                </span>
              </a>
              <a href={BUSINESS.webShop} target="_blank" rel="noopener noreferrer" className="btn btn--sm">
                <span className="btn-roll">
                  <span>{TX.btnBestellen[lang]}</span>
                  <span aria-hidden="true">{TX.btnBestellen[lang]}</span>
                </span>
                <IconExternal size={16} />
                <span className="sr-only">{UI.externalNew[lang]}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
