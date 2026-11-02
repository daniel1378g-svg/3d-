import { UI, type PageKey } from "@/i18n";
import { CONTACT, logo } from "@/contact";
import { useSite } from "@/site";
import { SiteLink } from "./SiteLink";
import { LanguageRow } from "./LanguageMenu";
import { FacebookIcon, InstagramIcon } from "./icons";

const PAGES: { page: PageKey; key: keyof typeof UI.nav; section?: string }[] = [
  { page: "pizzeria", key: "pizzeria" },
  { page: "steakhouse", key: "steakhouse" },
  { page: "choucalino", key: "choucalino" },
  { page: "menu", key: "menu" },
  { page: "anreise", key: "anreise" },
  { page: "home", key: "bilder", section: "bilder" },
  { page: "impressum", key: "impressum" },
];

export function Footer() {
  const { lang, book } = useSite();
  const link = "inline-flex min-h-11 items-center text-snow/85 underline-offset-4 hover:text-snow hover:underline";
  const ext = (href: string, label: string) => (
    <a href={href} target="_blank" rel="noopener" className={link}>
      {label}
      <span className="sr-only"> ({UI.newTab[lang]})</span>
    </a>
  );
  return (
    <footer className="on-dark gutter bg-ink pb-10 pt-16 text-snow">
      <div className="wrap grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <span className="inline-block rounded-2xl bg-snow px-4 py-3">
            <img src={logo()} alt="The Choucas Connection" width={468} height={122} loading="lazy" className="h-auto w-[200px]" />
          </span>
          <address className="mt-5 not-italic leading-relaxed text-snow/85">
            {CONTACT.name}
            <br />
            {CONTACT.street}, {CONTACT.city}
            <br />
            <a href={CONTACT.tel} className="underline-offset-4 hover:underline">
              {CONTACT.phone}
            </a>
            <br />
            <a href={CONTACT.mailto} className="underline-offset-4 hover:underline">
              {CONTACT.email}
            </a>
          </address>
          <button type="button" onClick={book} className="mt-5 inline-flex min-h-12 items-center rounded-full bg-beak px-6 font-bold text-ink hover:bg-white">
            {UI.book[lang]}
          </button>
        </div>
        <nav aria-label={UI.mainNav[lang]}>
          <ul className="grid gap-0.5">
            {PAGES.map((p) => (
              <li key={p.key}>
                <SiteLink page={p.page} section={p.section} className={link}>
                  {UI.nav[p.key][lang]}
                </SiteLink>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-beak">{UI.morePages[lang]}</p>
          <p className="mb-2 text-sm text-snow/60">{UI.livePageNote[lang]}</p>
          <ul className="grid gap-0.5" lang="de-CH">
            <li>{ext(CONTACT.live.jobs, UI.jobs[lang])}</li>
            <li>{ext(CONTACT.live.recipe, UI.recipe[lang])}</li>
            <li>{ext(CONTACT.live.colouring, UI.colouring[lang])}</li>
            <li>{ext(CONTACT.live.press, UI.press[lang])}</li>
            <li>{ext(CONTACT.live.friends, UI.friends[lang])}</li>
          </ul>
        </div>
        <div className="grid content-start gap-6">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-beak">{UI.follow[lang]}</p>
            <div className="flex flex-wrap gap-2">
              <a href={CONTACT.facebook} target="_blank" rel="noopener" className="grid size-11 place-items-center rounded-full border border-snow/30 hover:border-beak hover:text-beak">
                <FacebookIcon />
                <span className="sr-only">Facebook ({UI.newTab[lang]})</span>
              </a>
              <a href={CONTACT.instagram} target="_blank" rel="noopener" className="grid size-11 place-items-center rounded-full border border-snow/30 hover:border-beak hover:text-beak">
                <InstagramIcon />
                <span className="sr-only">Instagram ({UI.newTab[lang]})</span>
              </a>
              <a href={CONTACT.youtube} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center rounded-full border border-snow/30 px-4 text-sm font-semibold hover:border-beak hover:text-beak">
                YouTube<span className="sr-only"> ({UI.newTab[lang]})</span>
              </a>
              <a href={CONTACT.flickr} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center rounded-full border border-snow/30 px-4 text-sm font-semibold hover:border-beak hover:text-beak">
                Flickr<span className="sr-only"> ({UI.newTab[lang]})</span>
              </a>
              <a href={CONTACT.tripadvisor} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center rounded-full border border-snow/30 px-4 text-sm font-semibold hover:border-beak hover:text-beak">
                TripAdvisor<span className="sr-only"> ({UI.newTab[lang]})</span>
              </a>
            </div>
          </div>
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-beak">{UI.language[lang]}</p>
            <LanguageRow />
          </div>
        </div>
      </div>
      <p className="wrap mt-14 border-t border-snow/15 pt-6 text-sm text-snow/70">{UI.copyright}</p>
    </footer>
  );
}
