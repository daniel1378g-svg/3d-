"use client";

import { useContent } from "@/content/i18n";
import type { ImageId } from "@/lib/images";
import { ArrowUp, ArrowUpRight, Facebook, Instagram } from "./Icons";
import { Logo } from "./Logo";
import { Photo } from "./Photo";

function Words({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          <span className="word">{w}</span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

const external = { target: "_blank", rel: "noopener noreferrer" } as const;
const SPACE_PHOTOS = ["espaco-forno", "espaco-balcao", "espaco-arcadas", "espaco-arcos"] as const;

/* ——— História e experiência: statement, numbers, and the photographs of the place ——— */
export function Story() {
  const { brand, experience, ui } = useContent();
  return (
    <section id="historia" className="story" aria-labelledby="story-title">
      <div className="wrap story__intro">
        <h2 id="story-title" className="kicker">
          {ui.historyEyebrow}
        </h2>
        <p className="story__statement" data-words>
          <Words text={brand.statement} />
        </p>
        <dl className="story__stats">
          {brand.stats.map((s, i) => (
            <div key={s.label} className="stat" data-reveal style={{ ["--d" as string]: `${i * 120}ms` }}>
              <dt className="stat__label">{s.label}</dt>
              <dd className="stat__value">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="wrap story__mosaic">
        <figure className="tile tile--bread" data-reveal>
          <Photo id="hero-detalhe" sizes="(max-width: 899px) 92vw, 62vw" />
        </figure>
        <figure className="tile tile--fire" data-reveal style={{ ["--d" as string]: "140ms" }}>
          <Photo id="lume" sizes="(max-width: 899px) 92vw, 30vw" position="40% 50%" />
        </figure>
        <div className="story__experience" data-reveal>
          <h3 className="h-lg">
            {experience.title.map((l, i) => (
              <span key={l} className={i ? "h-soft" : undefined}>
                {l}
              </span>
            ))}
          </h3>
          <p>{experience.text}</p>
        </div>
        <figure className="tile tile--dough" data-reveal style={{ ["--d" as string]: "100ms" }}>
          <Photo id="chourico-massa" sizes="(max-width: 899px) 92vw, 54vw" />
        </figure>
        <figure className="tile tile--service" data-reveal>
          <Photo id="servico" sizes="(max-width: 899px) 92vw, 84vw" position="50% 35%" />
          <figcaption className="tile__caption">
            {ui.welcome.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </figcaption>
        </figure>
      </div>

      <div className="story__strip">
        <ul className="story__track" data-drift="-1">
          {SPACE_PHOTOS.map((id) => (
            <li key={id}>
              <Photo id={id} sizes="(max-width: 699px) 72vw, 30vw" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ——— Lojas e contactos ——— */
export function Places() {
  const { stores, contact, ui } = useContent();
  return (
    <section id="Lojas" className="places" aria-labelledby="places-title">
      <div className="wrap">
        <header className="places__head">
          <p className="kicker">{ui.whereWeAre}</p>
          <h2 id="places-title" className="h-xl" data-lines>
            {ui.storesTitle.map((l) => (
              <span key={l} className="line">
                <span>{l}</span>
              </span>
            ))}
          </h2>
        </header>
        <div className="places__grid">
          {stores.map((s, i) => (
            <article key={s.id} id={`loja-${s.id}`} className={`place place--${i + 1}`} aria-labelledby={`loja-${s.id}-title`}>
              <div className="place__media" data-reveal>
                <Photo id={s.image as ImageId} sizes="(max-width: 899px) 92vw, 34vw" />
              </div>
              <div className="place__body" data-reveal style={{ ["--d" as string]: "120ms" }}>
                <h3 id={`loja-${s.id}-title`} className="place__city">
                  {s.city}
                </h3>
                <address className="place__address">
                  {s.address.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </address>
                <a className="btn btn--ghost" href={s.map} {...external}>
                  {ui.seeOnMap} <ArrowUpRight />
                  <span className="sr-only">
                    {" "}— {s.city}
                    {ui.newTab}
                  </span>
                </a>
              </div>
            </article>
          ))}

          <aside id="contact" className="contact-card" aria-labelledby="contact-title" data-reveal style={{ ["--d" as string]: "200ms" }}>
            <h3 id="contact-title" className="h-lg">
              {ui.contactTitle}
            </h3>
            <dl className="contact-card__list">
              <div>
                <dt>{ui.phone}</dt>
                <dd>
                  <a className="link" href={contact.phone.href}>
                    {contact.phone.label}
                  </a>
                </dd>
              </div>
              <div>
                <dt>{ui.email}</dt>
                <dd>
                  <a className="link" href={contact.email.href}>
                    {contact.email.label}
                  </a>
                </dd>
              </div>
            </dl>
            <ul className="contact-card__social">
              <li>
                <a className="btn btn--ghost" href={contact.instagram.href} {...external}>
                  <Instagram className="btn__icon" /> Instagram
                  <span className="sr-only">{ui.newTab}</span>
                </a>
              </li>
              <li>
                <a className="btn btn--ghost" href={contact.facebook.href} {...external}>
                  <Facebook className="btn__icon" /> Facebook
                  <span className="sr-only">{ui.newTab}</span>
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ——— Imprensa e recomendações ——— */
export function Press() {
  const { press, ui } = useContent();
  const items = press.groups.flatMap((g) => g.items.map((it) => ({ ...it, group: g.label })));
  return (
    <section id="Media" className="press" aria-labelledby="press-title">
      <div className="wrap">
        <header className="press__head">
          <p className="kicker">{ui.pressEyebrow}</p>
          <h2 id="press-title" className="h-xl" data-lines>
            <span className="line">
              <span>{press.title}</span>
            </span>
          </h2>
        </header>
        <ul className="press__grid">
          {items.map((it, i) => (
            <li key={it.name} className={`press-card${it.detail ? " press-card--article" : ""}`} data-reveal style={{ ["--d" as string]: `${(i % 3) * 80}ms` }}>
              <a href={it.href} {...external}>
                <span className="press-card__type">{it.type}</span>
                <span className="press-card__name">{it.name}</span>
                {it.detail && <span className="press-card__detail">“{it.detail}”</span>}
                <span className="press-card__arrow" aria-hidden="true">
                  <ArrowUpRight className="" />
                </span>
                <span className="sr-only">{ui.newTab}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ——— Rodapé ——— */
export function Footer() {
  const { contact, footer, nav, ui } = useContent();
  return (
    <footer className="footer" aria-label={ui.footerAria}>
      <div className="wrap">
        <div className="footer__mark">
          <Logo decorative />
        </div>
        <div className="footer__cols">
          <nav aria-label={ui.footerSite}>
            <h2 className="footer__label">{ui.footerSite}</h2>
            <ul>
              {nav.map((l) => (
                <li key={l.href}>
                  <a className="link" href={l.href}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="footer__label">{ui.footerSocial}</h2>
            <ul>
              <li>
                <a className="link" href={contact.instagram.href} {...external}>
                  Instagram<span className="sr-only">{ui.newTab}</span>
                </a>
              </li>
              <li>
                <a className="link" href={contact.facebook.href} {...external}>
                  Facebook<span className="sr-only">{ui.newTab}</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="footer__back">
            <a className="btn btn--primary" href="#Top">
              {ui.backToTop} <ArrowUp />
            </a>
          </div>
        </div>
        <div className="footer__legal">
          <span>{footer.copyright}</span>
          <span>{footer.privacy}</span>
          <a className="link" href={footer.credit.href} {...external}>
            {footer.credit.label}
            <span className="sr-only">{ui.newTab}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

