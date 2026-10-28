import { UI } from "@/i18n";
import { CONTACT, logo } from "@/contact";
import { useSite } from "@/site";
import { SiteLink } from "./SiteLink";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { FacebookIcon, InstagramIcon } from "./icons";

export function Footer() {
  const { lang, book } = useSite();
  const link = "inline-flex min-h-11 items-center text-linen/90 underline-offset-4 hover:text-linen hover:underline";
  return (
    <footer className="on-dark tex-grill gutter bg-charcoal pb-10 pt-14 text-linen">
      <div className="wrap grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="flex items-start gap-4">
          <img src={logo()} alt="" width={72} height={72} loading="lazy" className="h-18 w-18 rounded-full" />
          <div>
            <p className="font-display text-2xl font-bold">Zé-do-Pipo</p>
            <address className="mt-1 not-italic leading-relaxed text-linen/85">
              {CONTACT.street}
              <br />
              {CONTACT.city}
              <br />
              <a href={CONTACT.tel} className="underline-offset-4 hover:underline">
                {CONTACT.phone}
              </a>
            </address>
          </div>
        </div>
        <nav aria-label={UI.mainNav[lang]}>
          <ul className="grid gap-0.5">
            <li>
              <SiteLink page="home" section="a-propos" className={link}>
                {UI.infos[lang]}
              </SiteLink>
            </li>
            <li>
              <SiteLink page="menu" className={link}>
                {UI.menu[lang]}
              </SiteLink>
            </li>
            <li>
              <button type="button" onClick={book} className={link}>
                {UI.booking[lang]}
              </button>
            </li>
            <li>
              <a href={CONTACT.delivery} target="_blank" rel="noopener" className={link}>
                {UI.delivery[lang]}
                <span className="sr-only"> ({UI.newTab[lang]})</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="grid content-start gap-5">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-gold">{UI.follow[lang]}</p>
            <div className="flex gap-2">
              <a href={CONTACT.instagram} target="_blank" rel="noopener" className="grid h-11 w-11 place-items-center rounded-full border border-linen/30 hover:border-gold hover:text-gold">
                <InstagramIcon />
                <span className="sr-only">Instagram ({UI.newTab[lang]})</span>
              </a>
              <a href={CONTACT.facebook} target="_blank" rel="noopener" className="grid h-11 w-11 place-items-center rounded-full border border-linen/30 hover:border-gold hover:text-gold">
                <FacebookIcon />
                <span className="sr-only">Facebook ({UI.newTab[lang]})</span>
              </a>
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-gold">{UI.language[lang]}</p>
            <LanguageSwitcher inline />
          </div>
        </div>
      </div>
      <p className="wrap mt-12 border-t border-linen/15 pt-6 text-sm text-linen/75">© Zédopipo 2021</p>
    </footer>
  );
}
