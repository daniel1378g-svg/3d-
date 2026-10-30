// Imprint and privacy. The imprint is Manna's own, as printed on its contact page (business address in Attikon, shop
// in the Archhöfe); this proposal's operator is not stated and nothing of WordPress is copied in.
import { useSite } from "@/site";
import { IMPRINT, URLS } from "@/content/facts";
import { PageHero } from "@/components/PageHero";

export function Legal() {
  const { t } = useSite();
  const l = t.legal;
  return (
    <>
      <PageHero kicker={t.footer.groups.legal} title={l.title} />
      <div className="skin-cream py-16 md:py-24"><div className="gutter"><div className="mx-auto max-w-[820px]">
        <section className="border-t border-ink/15 py-8">
          <h2 className="display text-[clamp(2rem,4vw,3rem)] text-plum">{l.imprintTitle}</h2>
          <address className="mt-4 not-italic leading-relaxed text-ink" lang="de-CH">
            {IMPRINT.business}, {IMPRINT.owner}<br />{IMPRINT.street}, {IMPRINT.place}<br />{IMPRINT.uid}<br />{IMPRINT.branch}
          </address>
          <p className="mt-4 text-sm text-ink/80">{l.imprintNote} <a className="link-u" href={URLS.contact} target="_blank" rel="noopener">manna-acai.ch<span className="sr-only"> {t.a11y.newTab}</span></a></p>
        </section>
        <section className="border-t border-ink/15 py-8">
          <h2 className="display text-[clamp(2rem,4vw,3rem)] text-plum">{l.proposalTitle}</h2>
          <p className="mt-3 max-w-[60ch] text-ink/90">{l.proposal}</p>
        </section>
        <section className="border-t border-ink/15 py-8">
          <h2 className="display text-[clamp(2rem,4vw,3rem)] text-plum">{l.privacyTitle}</h2>
          <p className="mt-3 max-w-[60ch] text-ink/90">{l.privacy}</p>
        </section>
      </div></div></div>
    </>
  );
}
