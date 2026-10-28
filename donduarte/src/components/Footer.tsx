import { UI } from "@/i18n";
import { CONTACT, DESSERTS, PLATS, VINS } from "@/content";
import { useSite } from "@/site";
import { Logo } from "./Logo";
import { SiteLink } from "./SiteLink";
import { PdfButton } from "./PdfButton";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer() {
  const { lang } = useSite();
  return (
    <footer className="on-dark gutter bg-green-deep pb-10 pt-16 text-white">
      <div className="wrap grid gap-12 md:grid-cols-[1.1fr_1fr_1fr]">
        <div className="grid content-start gap-5">
          <SiteLink page="home" className="w-fit rounded-2xl" aria-label={`Restaurant Don Duarte, ${UI.home[lang]}`}>
            <Logo alt="" className="w-[200px] px-3 py-2" />
          </SiteLink>
          <p className="max-w-xs text-white/75">{UI.tagline[lang]}</p>
          <address className="not-italic text-white/90">
            {CONTACT.street}, {CONTACT.city}
            <br />
            <a className="underline-offset-4 hover:underline" href={CONTACT.tel}>{CONTACT.phone}</a>
            <br />
            <a className="underline-offset-4 hover:underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </address>
        </div>
        <nav aria-label={UI.mainNav[lang]} className="grid content-start gap-3">
          <SiteLink page="plats" className="font-display text-2xl hover:text-gold">{UI.titlePlats[lang]}</SiteLink>
          <SiteLink page="vins" className="font-display text-2xl hover:text-gold">{UI.titleVins[lang]}</SiteLink>
          <SiteLink page="desserts" className="font-display text-2xl hover:text-gold">{UI.titleDesserts[lang]}</SiteLink>
          <SiteLink page="home" section="horaires" className="font-display text-2xl hover:text-gold">{UI.navHours[lang]}</SiteLink>
          <div className="mt-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-white/60">{UI.follow[lang]}</p>
            <div className="flex gap-4 font-semibold">
              <a href={CONTACT.facebook} target="_blank" rel="noopener" className="underline-offset-4 hover:underline">Facebook</a>
              <a href={CONTACT.instagram} target="_blank" rel="noopener" className="underline-offset-4 hover:underline">Instagram</a>
            </div>
          </div>
        </nav>
        <div className="grid content-start gap-3">
          <PdfButton tone="dark" lang={lang} href={PLATS.pdf} label={UI.dlPlats[lang]} />
          <PdfButton tone="dark" lang={lang} href={VINS.pdfHome!} label={UI.dlVins[lang]} />
          <PdfButton tone="dark" lang={lang} href={DESSERTS.pdf} label={UI.dlDesserts[lang]} />
          <div className="mt-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-white/60">{UI.language[lang]}</p>
            <LanguageSwitcher inline tone="dark" />
          </div>
        </div>
      </div>
      <p className="wrap mt-14 border-t border-white/15 pt-6 text-sm text-white/60" lang="fr">{UI.copyright}</p>
    </footer>
  );
}
