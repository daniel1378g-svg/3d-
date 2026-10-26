import { brand, contact, experience, flavour, footer, nav, press, stores } from "@/content/site";
import type { DrawnTitle as DrawnTitleData } from "@/lib/drawnTitles";
import { DrawnTitle } from "./DrawnTitle";
import { ArrowRight, ArrowUp, ArrowUpRight } from "./Icons";
import { Logo } from "./Logo";
import { Photo } from "./Photo";

function Lines({ lines }: { lines: readonly string[] }) {
  return (
    <>
      {lines.map((l) => (
        <span key={l} className="line">
          <span>{l}</span>
        </span>
      ))}
    </>
  );
}

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

/* ——— Tradição: the brand statement after the film ——— */
export function Tradition() {
  return (
    <section id="tradicao" className="tradition" aria-labelledby="tradition-title">
      <div className="wrap tradition__head">
        <div className="grid-12">
          <div className="tradition__meta">
            <p className="eyebrow" id="tradition-title">
              A Merendeira
            </p>
          </div>
          <p className="tradition__statement statement" data-words>
            <Words text={brand.statement} />
          </p>
          <dl className="stats">
            {brand.stats.map((s) => (
              <div key={s.label} className="stat" data-lines>
                <dt className="stat__label caps">{s.label}</dt>
                <dd className="stat__value" style={{ margin: 0, order: -1 }}>
                  <span className="line">
                    <span>{s.value}</span>
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="tradition__visual">
        <div className="bloom" data-bloom="0.34">
          <Photo id="hero-detalhe" sizes="100vw" />
        </div>
      </div>
    </section>
  );
}

/* ——— Lojas ——— */
export function Stores() {
  return (
    <section id="Lojas" className="stores section" aria-labelledby="stores-title">
      <div className="wrap">
        <div className="stores__head" data-lines>
          <div>
            <p className="eyebrow">Onde estamos</p>
            <h2 id="stores-title" className="display">
              <Lines lines={["As nossas", "lojas"]} />
            </h2>
          </div>
          <div className="stores__quick" aria-label="Atalhos para os mapas">
            {stores.map((s) => (
              <a key={s.id} className="btn btn--external" href={s.map} {...external}>
                {s.city} <ArrowUpRight />
                <span className="sr-only"> — ver no mapa (abre num novo separador)</span>
              </a>
            ))}
          </div>
        </div>
        <ol className="stores__list">
          {stores.map((s, i) => (
            <li key={s.id} className="store" id={`loja-${s.id}`}>
              <div className="store__media arch-frame">
                <Photo id={s.image} sizes="(max-width: 799px) 92vw, 46vw" />
              </div>
              <div className="store__body">
                <span className="store__num" aria-hidden="true">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="store__city">{s.city}</h3>
                  <address className="store__address">
                    {s.address.map((l) => (
                      <span key={l} style={{ display: "block" }}>
                        {l}
                      </span>
                    ))}
                  </address>
                  <a className="btn btn--external" href={s.map} {...external}>
                    Ver no mapa <ArrowUpRight />
                    <span className="sr-only"> — {s.city} (abre num novo separador)</span>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ——— Experiência e ambiente ——— */
const SPACE_PHOTOS = ["espaco-forno", "espaco-balcao", "espaco-arcadas", "espaco-arcos"] as const;

export function Ambience() {
  return (
    <section id="ambiente" className="ambience section" aria-labelledby="ambience-title">
      <div className="wrap">
        <div className="grid-12 ambience__head">
          <h2 id="ambience-title" className="display" data-lines>
            <Lines lines={experience.title} />
          </h2>
          <p className="ambience__text lead">{experience.text}</p>
        </div>
      </div>
      <div className="ambience__hero">
        <div className="bloom" data-bloom="0.3" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <Photo id="chourico-massa" sizes="100vw" />
        </div>
      </div>
      <div className="ambience__strip">
        <ul className="ambience__track" data-drift="-1">
          {SPACE_PHOTOS.map((id) => (
            <li key={id}>
              <Photo id={id} sizes="(max-width: 699px) 80vw, 34vw" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ——— O sabor em imagens ——— */
export function Flavour() {
  return (
    <section className="flavour section" aria-labelledby="flavour-title">
      <div className="wrap">
        <div className="flavour__grid">
          <div className="flavour__intro" data-lines>
            <p className="eyebrow">O sabor</p>
            <h2 id="flavour-title" className="display-2">
              <Lines lines={flavour.title} />
            </h2>
            <p>{flavour.text}</p>
            <a className="btn" href={flavour.cta.href}>
              {flavour.cta.label} <ArrowRight />
            </a>
          </div>
          <div className="flavour__a" style={{ overflow: "hidden" }}>
            <div data-parallax="5" style={{ height: "112%", marginTop: "-6%" }}>
              <Photo id="sabor-pao-caldo" sizes="(max-width: 899px) 92vw, 54vw" style={{ height: "100%" }} />
            </div>
          </div>
          <div className="flavour__b arch-frame">
            <Photo id="sabor-maos-massa" sizes="(max-width: 899px) 46vw, 23vw" style={{ height: "100%" }} />
          </div>
          <div className="flavour__c" style={{ overflow: "hidden" }}>
            <Photo id="sabor-cliente" sizes="(max-width: 899px) 46vw, 23vw" style={{ height: "100%" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ——— Opening of the menus: drawn title over the wood-fire ——— */
export function Fire({ title }: { title: DrawnTitleData }) {
  return (
    <section className="fire" aria-labelledby="fire-title">
      <div className="fire__title">
        <DrawnTitle data={title} as="p" id="fire-title" />
      </div>
      <div className="fire__stage">
        <div className="fire__bloom" data-bloom="0.4">
          <Photo id="lume" sizes="100vw" />
        </div>
        {/* Real cut-out of the baked loaf from the supplied video (frame at 4.2 s). */}
        <picture className="fire__loaf" data-loaf aria-hidden="true">
          <source media="(max-width: 699px)" srcSet="/images/cutouts/pao-com-chourico-960.webp" />
          <img src="/images/cutouts/pao-com-chourico.webp" alt="" width={1835} height={756} loading="lazy" decoding="async" />
        </picture>
      </div>
    </section>
  );
}

/* ——— Imprensa e recomendações ——— */
export function Press() {
  return (
    <section id="Media" className="press section" aria-labelledby="press-title">
      <div className="wrap">
        <div className="press__head" data-lines>
          <div style={{ gridColumn: "1 / span 9" }}>
            <p className="eyebrow">Notícias</p>
            <h2 id="press-title" className="display-2">
              <Lines lines={[press.title]} />
            </h2>
          </div>
        </div>
        {press.groups.map((g) => (
          <div key={g.id} className="press__group">
            <h3 className="press__group-label caps">
              <span>{g.label}</span>
              <span aria-hidden="true">{String(g.items.length).padStart(2, "0")}</span>
            </h3>
            <ul>
              {g.items.map((it) => (
                <li key={it.name}>
                  <a className="press__row" href={it.href} {...external}>
                    <span className="press__num">{it.number}</span>
                    <span className="press__type">{it.type}</span>
                    <span className="press__name">
                      {it.name}
                      {it.detail && <span className="press__detail">“{it.detail}”</span>}
                    </span>
                    <span className="press__arrow" aria-hidden="true">
                      <ArrowUpRight className="" />
                    </span>
                    <span className="sr-only"> (abre num novo separador)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ——— Hospitalidade ——— */
export function Welcome() {
  return (
    <section className="welcome" aria-label="Hospitalidade">
      <div className="bloom" data-bloom="0.42">
        <Photo id="servico" sizes="100vw" position="50% 40%" />
      </div>
      <p className="welcome__caption display-2" data-lines>
        <Lines lines={["Milhares de", "clientes felizes."]} />
      </p>
    </section>
  );
}

/* ——— Rodapé e contactos ——— */
export function Footer({ title }: { title: DrawnTitleData }) {
  return (
    <footer id="contact" className="footer" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__title">
            <DrawnTitle data={title} as="h2" id="contact-title" />
          </div>
          <address className="footer__contact">
            <a className="text-link" href={contact.phone.href}>
              {contact.phone.label}
            </a>
            <a className="text-link" href={contact.email.href}>
              {contact.email.label.toUpperCase()}
            </a>
          </address>
        </div>
        <div className="footer__cols">
          <nav aria-label="Rodapé">
            <h3>Site</h3>
            <ul>
              {footer.links.map((l) => (
                <li key={l.href}>
                  <a className="text-link" href={l.href}>
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a className="text-link" href={nav[3].href}>
                  {nav[3].label}
                </a>
              </li>
            </ul>
          </nav>
          <div>
            <h3>Redes sociais</h3>
            <ul>
              <li>
                <a className="text-link" href={contact.instagram.href} {...external}>
                  Instagram
                </a>
              </li>
              <li>
                <a className="text-link" href={contact.facebook.href} {...external}>
                  Facebook
                </a>
              </li>
            </ul>
          </div>
          <div className="footer__stores">
            <h3>Lojas</h3>
            {stores.map((s) => (
              <p key={s.id}>
                <a className="text-link" href={s.map} {...external}>
                  {s.city}
                </a>
                <br />
                {s.address.join(" ")}
              </p>
            ))}
          </div>
          <div>
            <h3>Voltar</h3>
            <a className="btn" href="#Top">
              Voltar ao topo <ArrowUp />
            </a>
          </div>
        </div>
        <div className="footer__legal">
          <span>{footer.copyright}</span>
          <span>{footer.privacy}</span>
          <a className="text-link" href={footer.credit.href} {...external}>
            {footer.credit.label}
          </a>
        </div>
      </div>
      <div className="footer__mark" aria-hidden="true">
        <Logo decorative />
      </div>
    </footer>
  );
}
