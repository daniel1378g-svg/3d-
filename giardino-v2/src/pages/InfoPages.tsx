// Jobs, Press, Imprint and Privacy: plain, well set text pages in the site's language.
import type { ReactNode } from "react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS } from "@/content/business";
import { PX } from "@/content/pages";
import { PageHero } from "@/components/PageHero";
import { ExtLink, PillLink } from "@/components/ui/Pill";

function Body({ children }: { children: ReactNode }) {
  return (
    <section id="content" data-anchor className="tex-leaf bg-ivory py-20 text-ink md:py-28">
      <div className="container-x max-w-[980px] space-y-10">{children}</div>
    </section>
  );
}
const Block = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="rounded-[26px] bg-white p-7 shadow-[0_24px_50px_-40px_rgba(27,27,27,0.5)] md:p-9">
    <h2 className="font-display text-[clamp(28px,2.4vw,40px)] font-extrabold uppercase leading-none">{title}</h2>
    <div className="mt-4 space-y-3 text-[17px] leading-relaxed">{children}</div>
  </div>
);

export function JobsPage() {
  const { lang } = useSite();
  return (
    <>
      <PageHero eyebrow="Lavoro · Team" title={UI.jobs[lang]} lead={PX.jobsTitle[lang]} photo="interior-room" />
      <Body>
        <Block title={PX.jobsTitle[lang]}>
          <p>{PX.jobsText[lang]}</p>
          <p>
            {PX.jobsBoard[lang]} <ExtLink href={BUSINESS.jobsBoard}>hoteljob-schweiz.de</ExtLink>
          </p>
          <p>
            {PX.jobsApply[lang]}{" "}
            <a className="link font-semibold" href={`mailto:${BUSINESS.email}`}>
              {BUSINESS.email}
            </a>
          </p>
        </Block>
      </Body>
    </>
  );
}

export function PressPage() {
  const { lang } = useSite();
  return (
    <>
      <PageHero eyebrow="Stampa · Media" title={UI.press[lang]} lead={PX.pressTitle[lang]} photo="door-lettering" />
      <Body>
        <Block title={PX.pressRro[lang]}>
          <p>rro.ch · YouTube</p>
          <PillLink href={BUSINESS.press.rro} external variant="dark" size="sm">
            {PX.pressRroCta[lang]}
          </PillLink>
        </Block>
        <Block title={PX.pressCunda[lang]}>
          <blockquote>
            <p>{PX.pressCundaQuote[lang]}</p>
          </blockquote>
          <p className="text-[14px] text-muted">{PX.pressCundaNote[lang]}</p>
        </Block>
      </Body>
    </>
  );
}

export function ImprintPage() {
  const { lang } = useSite();
  return (
    <>
      <PageHero eyebrow="Note legali" title={UI.imprint[lang]} />
      <Body>
        <Block title={PX.imprintResponsible[lang]}>
          <address className="not-italic">
            {BUSINESS.name}
            <br />
            {BUSINESS.hosts}
            <br />
            {BUSINESS.street}
            <br />
            {BUSINESS.postcode} {BUSINESS.town}
            <br />
            <a className="link" href={`tel:${BUSINESS.tel}`}>
              {BUSINESS.phone}
            </a>
            <br />
            <a className="link" href={`mailto:${BUSINESS.email}`}>
              {BUSINESS.email}
            </a>
          </address>
        </Block>
        <Block title={PX.imprintPhotos[lang]}>
          <p>
            {BUSINESS.photographer.name}, {BUSINESS.photographer.town}
          </p>
          <p className="text-[15px] text-muted">{PX.imprintPhotosNote[lang]}</p>
        </Block>
      </Body>
    </>
  );
}

export function PrivacyPage() {
  const { lang } = useSite();
  return (
    <>
      <PageHero eyebrow="Privacy" title={PX.privacyTitle[lang]} />
      <Body>
        {PX.privacyBlocks.map((b) => (
          <Block key={b.h.en} title={b.h[lang]}>
            <p>{b.p[lang]}</p>
          </Block>
        ))}
        <p className="text-[16px]">
          <ExtLink href={BUSINESS.officialPrivacy}>{PX.privacyOfficial[lang]}</ExtLink>
        </p>
        <p className="text-[14px] text-muted">{PX.updated[lang]}</p>
      </Body>
    </>
  );
}
