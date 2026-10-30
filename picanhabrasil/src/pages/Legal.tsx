// Imprint and privacy for the proposal. The official site's legal notice belongs to its platform (bigbites.ch),
// which also runs reservations and orders; this page says so and links there.
import { useSite } from "@/site";
import { PageHero } from "@/components/PageHero";

export function Legal() {
  const { t } = useSite();
  const l = t.legal;
  const block = (title: string, text: string) => (
    <section className="border-t border-tinta/15 py-8">
      <h2 className="display text-[clamp(2rem,4vw,3rem)] text-vinho">{title}</h2>
      <p className="mt-3 max-w-[60ch] text-tinta/85">{text}</p>
    </section>
  );
  return (
    <>
      <PageHero kicker={t.footer.groups.company} title={l.title} />
      <div className="skin-creme py-16 md:py-24"><div className="gutter"><div className="mx-auto max-w-[820px]">
        {block(l.imprintTitle, l.imprint)}
        {block(l.proposalTitle, l.proposal)}
        {block(l.privacyTitle, l.privacy)}
        <p className="mt-4"><a className="link-u text-tinta" href="https://bigbites.ch/impressum" target="_blank" rel="noopener">{l.platformLink}<span className="sr-only"> {t.a11y.newTab}</span></a></p>
      </div></div></div>
    </>
  );
}
