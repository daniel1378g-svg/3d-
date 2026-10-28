import { TEXT, UI } from "@/i18n";
import { CONTACT } from "@/content";
import { useSite } from "@/site";
import { asset } from "@/lib/utils";
import { HOURS_ROWS, hm } from "@/hours";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SiteLink } from "./SiteLink";
import { FacebookGlyph, InstagramGlyph, MailGlyph, PhoneGlyph, PinGlyph } from "./Glyphs";

/** Logo, address, phone, e-mail, hours, social links, languages and «Politique de confidentialité | Mentions légales». */
export function Footer() {
  const { lang } = useSite();
  return (
    <footer className="espresso on-dark gutter pb-10 pt-16 md:pt-20">
      <div className="wrap grid gap-12 md:grid-cols-[1.1fr_1fr_1fr]">
        <div>
          <span className="inline-block rounded-[28px] bg-flour px-6 py-4">
            <img src={asset("brand/logo-300.webp")} alt="Chez Manu" width={284} height={145} className="h-auto w-[180px]" loading="lazy" />
          </span>
          <p className="mt-5 text-sm text-flour/75">{UI.footerTagline[lang]}</p>
        </div>
        <address className="not-italic">
          <ul className="space-y-3 text-[15px]">
            <li className="flex gap-3">
              <span className="mt-1 text-custard"><PinGlyph /></span>
              <span>
                {CONTACT.street}
                <br />
                {CONTACT.zip} {CONTACT.city}
              </span>
            </li>
            <li>
              <a href={CONTACT.phoneHref} className="flex min-h-11 items-center gap-3 underline-offset-4 hover:underline" data-cursor="call">
                <span className="text-custard"><PhoneGlyph /></span>
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="flex min-h-11 items-center gap-3 break-all underline-offset-4 hover:underline">
                <span className="text-custard"><MailGlyph /></span>
                {CONTACT.email}
              </a>
            </li>
          </ul>
        </address>
        <div className="space-y-6">
          <div>
            <h2 className="kicker mb-2">{TEXT.hoursTitle[lang]}</h2>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-[15px]">
              {HOURS_ROWS.map((r) => (
                <div key={r.key} className="contents">
                  <dt className="font-semibold">{TEXT[r.key][lang]}</dt>
                  <dd className="price">
                    {hm(r.open)} – {hm(r.close)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="kicker mb-2">{UI.follow[lang]}</h2>
            <ul className="flex gap-2">
              <li>
                <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-flour/30 transition-colors hover:bg-flour/10">
                  <FacebookGlyph />
                  <span className="sr-only">Facebook {UI.newTab[lang]}</span>
                </a>
              </li>
              <li>
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-flour/30 transition-colors hover:bg-flour/10">
                  <InstagramGlyph />
                  <span className="sr-only">Instagram {UI.newTab[lang]}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="wrap mt-14 flex flex-col gap-6 border-t border-flour/15 pt-8 md:flex-row md:items-center md:justify-between">
        <LanguageSwitcher inline tone="dark" />
        <p className="text-sm text-flour/80">
          <SiteLink page="privacy" className="underline-offset-4 hover:underline">{TEXT.privacy[lang]}</SiteLink>
          <span aria-hidden="true" className="mx-2">|</span>
          <SiteLink page="legal" className="underline-offset-4 hover:underline">{TEXT.legal[lang]}</SiteLink>
        </p>
      </div>
    </footer>
  );
}
