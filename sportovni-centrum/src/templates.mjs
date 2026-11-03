// HTML templates. Content comes from content/*.json; nothing here is page copy except
// generic interface labels (Czech). All output is static HTML that works without JavaScript.
import { icon, pictogram, lanes, gymGraphic } from "./icons.mjs";

export const esc = (s = "") => String(s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Rich text fields may contain a tiny, trusted subset of inline markup written by staff in the JSON
// (<strong>, <em>, <a href>, <br>); everything else is escaped.
const rich = (s = "") => esc(s)
  .replace(/&lt;(\/?)(strong|em|br)&gt;/g, "<$1$2>")
  .replace(/&lt;a href=&quot;([^"&]+)&quot;&gt;/g, '<a href="$1">').replace(/&lt;\/a&gt;/g, "</a>");

export function createRenderer({ site, images, root }) {
  const abs = (href) => (/^(https?:|mailto:|tel:|#)/.test(href) ? href : site.origin + href);
  const asset = (p) => `${root}${p}`;
  const newWin = '<span class="sr-only"> (otevře se v novém okně)</span>';

  function picture(rel, { alt, sizes, loading = "lazy", priority = false, cls = "" }) {
    const meta = images[rel];
    if (!meta) throw new Error(`Image ${rel} missing from content/images.json – run npm run images`);
    const set = (type) => meta.variants.filter((v) => v.type === type).map((v) => `${asset(v.src)} ${v.width}w`).join(", ");
    return `<picture>
      <source type="image/avif" srcset="${set("image/avif")}" sizes="${sizes}">
      <source type="image/webp" srcset="${set("image/webp")}" sizes="${sizes}">
      <img class="${cls}" src="${asset(rel)}" width="${meta.width}" height="${meta.height}" alt="${esc(alt)}" loading="${loading}" decoding="async"${priority ? ' fetchpriority="high"' : ""}>
    </picture>`;
  }

  /* Header ---------------------------------------------------------------------------------- */
  function header(currentPath) {
    const isCurrent = (href) => href === currentPath;
    const inSection = (item) => item.columns?.some((col) => col.some((l) => isCurrent(l.href)));
    const subLink = (l) => {
      const ext = l.external;
      const attrs = l.newWindow ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<li><a class="subnav-link${l.emphasis ? " subnav-link--external" : ""}" href="${esc(abs(l.href))}"${attrs}${isCurrent(l.href) ? ' aria-current="page"' : ""}>
          <span>${esc(l.label)}${l.note ? `<small>${esc(l.note)}</small>` : ""}</span>${ext ? icon.external() : ""}${l.newWindow ? newWin : ""}</a></li>`;
    };
    const items = site.nav.map((item, n) => {
      if (!item.columns) {
        return `<li class="nav-item"><div class="nav-row"><a class="nav-link" href="${esc(abs(item.href))}"${isCurrent(item.href) ? ' aria-current="page"' : ""}>${esc(item.label)}</a></div></li>`;
      }
      const id = `podnabidka-${n}`;
      const wide = item.columns.length > 1;
      return `<li class="nav-item has-sub${inSection(item) ? " is-active" : ""}" data-sub>
        <div class="nav-row">
          <a class="nav-link" href="${esc(abs(item.href))}">${esc(item.label)}</a>
          <button class="sub-toggle" type="button" aria-expanded="false" aria-controls="${id}">
            <span class="sr-only">Podnabídka ${esc(item.label)}</span>${icon.chevron()}
          </button>
        </div>
        <div class="subnav${wide ? " subnav--wide" : ""}" id="${id}">
          <div class="subnav-cols" style="--cols:${item.columns.length}">
            ${item.columns.map((col) => `<ul class="subnav-list">${col.map(subLink).join("")}</ul>`).join("")}
          </div>
        </div>
      </li>`;
    }).join("");

    return `<header class="site-header" data-header>
  <div class="container header-inner">
    <a class="brand" href="${esc(site.logo.href)}"><img src="${asset(site.logo.src)}" width="${site.logo.width}" height="${site.logo.height}" alt="${esc(site.logo.alt)}"></a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="hlavni-navigace" data-nav-toggle>
      <span class="nav-toggle-icon" aria-hidden="true"><span></span><span></span><span></span></span>
      <span data-nav-label>Menu</span>
    </button>
    <nav class="site-nav" id="hlavni-navigace" aria-label="Hlavní navigace" data-nav>
      <ul class="nav-list">${items}</ul>
    </nav>
  </div>
</header>`;
  }

  /* Footer ---------------------------------------------------------------------------------- */
  function footer(page) {
    const c = site.contact;
    const note = page.footerNote;
    return `<footer class="site-footer on-dark">
  ${lanes({ cls: "footer-lanes", count: 5, green: -1, cx: 700, cy: 640, r0: 220, step: 46 })}
  <div class="container">
    <div class="footer-main">
      <section aria-labelledby="kontakt-nadpis">
        <h2 class="footer-title" id="kontakt-nadpis">${esc(c.title)}</h2>
        <p class="footer-sub">${esc(c.intro)}</p>
        <dl class="contact-list">
          <div class="contact-row"><dt>Adresa</dt><dd>${esc(c.address)}</dd></div>
          <div class="contact-row"><dt>Recepce</dt><dd><ul class="phone-list">${c.phones.map((p) => `<li><a href="tel:${esc(p.tel)}">${esc(p.label)}</a></li>`).join("")}</ul></dd></div>
          <div class="contact-row"><dt>E-mail</dt><dd><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></dd></div>
          <div class="contact-row"><dt>Více info</dt><dd><a class="link-arrow" href="${esc(abs(c.more.href))}">${esc(c.more.label)} ${icon.arrow()}</a></dd></div>
        </dl>
        <div class="footer-links">
          <a class="link-arrow" href="${esc(abs(c.gdpr.href))}">${esc(c.gdpr.label)} ${icon.arrow()}</a>
        </div>
      </section>
      <div class="footer-aside">
        ${note ? `<section class="footer-card" aria-labelledby="poznamka-nadpis">
          <h2 class="footer-title" id="poznamka-nadpis">${esc(note.title)}</h2>
          <p>${rich(note.text)}</p>
          <a class="link-arrow" href="${esc(note.href)}">${esc(note.linkLabel)} ${icon.external()}</a>
        </section>` : ""}
        <div class="footer-card">
          <a class="social-link" href="${esc(site.social.href)}" target="_blank" rel="noopener">
            <img src="${asset(site.social.icon)}" width="${site.social.width}" height="${site.social.height}" alt="" loading="lazy">
            <span>${esc(site.social.label)}</span>${newWin}
          </a>
        </div>
      </div>
    </div>
    <section class="partners" aria-labelledby="partneri-nadpis">
      <h2 id="partneri-nadpis">Partneři</h2>
      <ul class="partner-list">
        ${site.partners.map((p) => `<li><a class="partner-link" href="${esc(p.href)}" target="_blank" rel="${esc(p.rel)}">
          <img src="${asset(p.src)}" width="${p.width}" height="${p.height}" alt="${esc(p.alt)}" loading="lazy">${newWin}</a></li>`).join("")}
      </ul>
    </section>
    <div class="footer-bottom">
      <span>${esc(site.siteName)}</span>
      <a class="to-top" href="#top">Zpět nahoru ${icon.arrowUp()}</a>
    </div>
  </div>
</footer>`;
  }

  /* Athletics page ---------------------------------------------------------------------------- */
  function athleticsPage(page, news) {
    const h = page.hero;
    const facts = page.facts;
    const factIcon = { users: icon.users, activity: icon.activity, calendar: icon.calendar };
    const discIcon = { run: pictogram.run, jump: pictogram.jump, throw: pictogram.throw };
    const extLink = (href) => (new URL(href, site.origin).origin !== site.origin);

    const crumbs = page.breadcrumbs.map((b, i, all) => i === all.length - 1
      ? `<li><span aria-current="page">${esc(b.label)}</span></li>`
      : `<li><a href="${esc(abs(b.href))}">${esc(b.label)}</a></li>`).join("");

    const hero = `<section class="hero on-dark" aria-labelledby="nadpis-stranky">
  ${lanes({ cls: "hero-lanes draw", count: 6, green: 2, cy: 870, r0: 250, step: 40 })}
  <div class="container">
    <nav class="breadcrumbs" aria-label="Drobečková navigace"><ol>${crumbs}</ol></nav>
    <div class="hero-grid">
      <div class="hero-copy">
        <p class="eyebrow" data-enter style="--i:0">${esc(h.eyebrow)}</p>
        <h1 id="nadpis-stranky" data-enter style="--i:1">${esc(h.title)}</h1>
        <p class="hero-lead" data-enter style="--i:2">${rich(h.lead)}</p>
        <p class="hero-organiser" data-enter style="--i:3">${icon.shield()}<span>${rich(h.organiser)}</span></p>
        <div class="hero-actions" data-enter style="--i:4">
          <a class="btn" href="${esc(h.primary.href)}">${esc(h.primary.label)} ${icon.external()}<span class="sr-only"> (${esc(h.primary.srHint)})</span></a>
          <a class="btn btn--ghost" href="${esc(h.secondary.href)}">${esc(h.secondary.label)} ${icon.arrowDown()}</a>
        </div>
      </div>
      <figure class="hero-media">
        <div class="hero-photo" data-enter style="--i:2">
          ${picture(h.image.src, { alt: h.image.alt, sizes: "(min-width: 1320px) 600px, (min-width: 900px) 46vw, calc(100vw - 2rem)", loading: "eager", priority: true })}
        </div>
        <figcaption data-enter style="--i:4">${icon.camera()}<span>${esc(h.image.caption)}</span></figcaption>
      </figure>
    </div>
  </div>
</section>`;

    const factsHtml = `<section class="facts" aria-label="${esc(facts.label)}">
  <div class="container">
    <ul class="facts-list">
      ${facts.items.map((f, i) => `<li class="fact" data-reveal style="--i:${i}">
        <span class="fact-icon">${factIcon[f.icon]()}</span>
        <h2>${esc(f.title)}</h2>
        <p class="fact-value">${rich(f.value)}</p>
        <p>${rich(f.text)}</p>
      </li>`).join("")}
    </ul>
  </div>
</section>`;

    const o = page.overview;
    const overview = `<section class="section section--tight-top" aria-labelledby="o-pripravce">
  <div class="container overview-grid">
    <div class="overview-text" data-reveal>
      <p class="eyebrow">${esc(o.eyebrow)}</p>
      <h2 id="o-pripravce">${esc(o.title)}</h2>
      ${o.paragraphs.map((p) => `<p class="source-text">${rich(p)}</p>`).join("")}
      <dl class="organiser-card">
        ${o.organiser.map((row) => `<dt>${esc(row.term)}</dt><dd>${row.href ? `<a href="${esc(row.href)}">${esc(row.value)}</a>` : esc(row.value)}</dd>`).join("")}
      </dl>
    </div>
    <div>
      <ul class="disciplines" aria-label="${esc(o.disciplinesLabel)}">
        ${o.disciplines.map((d, i) => `<li class="discipline" data-reveal style="--i:${i}">
          ${lanes({ cls: "discipline-lanes", count: 4, green: -1, width: 400, height: 300, cx: 220, cy: 330, r0: 70, step: 26 })}
          <span class="discipline-num">${String(i + 1).padStart(2, "0")}</span>
          ${discIcon[d.icon]()}
          <h3>${esc(d.label)}</h3>
        </li>`).join("")}
      </ul>
      <p class="disciplines-caption" data-reveal>${esc(o.disciplinesCaption)}</p>
    </div>
  </div>
</section>`;

    const t = page.training;
    const panel = (p) => `<article class="panel" data-reveal style="--i:${p.i}">
      ${p.image
        ? `<figure class="panel-media" style="margin:0">${picture(p.image.src, { alt: p.image.alt, sizes: "(min-width: 1320px) 610px, (min-width: 820px) 48vw, calc(100vw - 2rem)" })}<figcaption>${esc(p.image.caption)}</figcaption></figure>`
        : `<div class="panel-graphic">${gymGraphic()}</div>`}
      <div class="panel-body">
        <span class="panel-label${p.kind === "winter" ? " panel-label--winter" : ""}">${p.kind === "winter" ? icon.snow() : icon.stadium()}${esc(p.label)}</span>
        <h3>${esc(p.title)}</h3>
        <p>${rich(p.text)}</p>
        ${p.link ? `<a class="link-arrow" href="${esc(abs(p.link.href))}">${esc(p.link.label)} ${icon.arrow()}</a>` : ""}
      </div>
    </article>`;
    const training = `<section class="section section--paper training" id="treninky" aria-labelledby="treninky-nadpis">
  <div class="container">
    <div class="section-head" data-reveal>
      <p class="eyebrow">${esc(t.eyebrow)}</p>
      <h2 id="treninky-nadpis">${esc(t.title)}</h2>
      ${t.intro ? `<p>${rich(t.intro)}</p>` : ""}
    </div>
    <div class="training-panels">${t.panels.map((p, i) => panel({ ...p, i })).join("")}</div>
    <div class="cta-band on-dark" data-reveal>
      ${lanes({ cls: "cta-lanes draw", count: 5, green: 1, cx: 600, cy: 640, r0: 200, step: 40 })}
      <div>
        <h3>${esc(t.cta.title)}</h3>
        <p>${rich(t.cta.text)}</p>
      </div>
      <div>
        <a class="btn btn--light" href="${esc(t.cta.href)}">${esc(t.cta.label)} ${icon.external()}</a>
        <span class="cta-url">${esc(t.cta.urlLabel)}</span>
      </div>
    </div>
  </div>
</section>`;

    const g = page.gallery;
    const gallery = `<section class="section gallery-section" aria-labelledby="galerie-nadpis">
  <div class="container">
    <div class="section-head" data-reveal>
      <p class="eyebrow">${esc(g.eyebrow)}</p>
      <h2 id="galerie-nadpis">${esc(g.title)}</h2>
      <p>${rich(g.intro)}</p>
      <p class="gallery-note">${icon.info()}<span>${esc(g.note)}</span></p>
    </div>
    <ul class="gallery-grid">
      ${g.items.map((it, i) => {
        const meta = images[it.src];
        return `<li data-reveal style="--i:${i % 3}">
        <a class="gallery-item" href="${asset(it.src)}" data-gallery-item data-caption="${esc(it.caption)}" data-width="${meta.width}" data-height="${meta.height}">
          ${picture(it.src, { alt: it.alt, sizes: i === 0 ? "(min-width: 900px) 50vw, calc(100vw - 2rem)" : "(min-width: 900px) 25vw, 50vw" })}
          <span class="gallery-zoom">${icon.zoom()}</span>
          <span class="sr-only"> – zobrazit fotografii ${i + 1} z ${g.items.length} ve větší velikosti</span>
        </a>
      </li>`;
      }).join("")}
    </ul>
    <div class="gallery-foot" data-reveal>
      <span>${esc(g.credit)}</span>
      <span style="display:flex;flex-wrap:wrap;gap:0.5rem 1.5rem">
        ${g.links.map((l) => `<a class="link-arrow" href="${esc(abs(l.href))}">${esc(l.label)} ${icon.arrow()}</a>`).join("")}
      </span>
    </div>
  </div>
  <dialog class="lightbox on-dark" data-lightbox aria-label="Fotografie městského stadionu">
    <div class="lightbox-top">
      <span class="lightbox-counter" data-lb-counter aria-live="polite"></span>
      <button class="lb-btn" type="button" data-lb-close>${icon.close()}<span class="sr-only">Zavřít náhled</span></button>
    </div>
    <div class="lightbox-stage"><img data-lb-img src="data:," alt=""></div>
    <div class="lightbox-bottom">
      <button class="lb-btn" type="button" data-lb-prev>${icon.prev()}<span class="sr-only">Předchozí fotografie</span></button>
      <p class="lightbox-caption" data-lb-caption></p>
      <button class="lb-btn" type="button" data-lb-next>${icon.next()}<span class="sr-only">Další fotografie</span></button>
    </div>
  </dialog>
</section>`;

    const r = page.related;
    const related = `<section class="section section--paper" aria-labelledby="krouzky-nadpis">
  <div class="container">
    <div class="section-head" data-reveal>
      <p class="eyebrow">${esc(r.eyebrow)}</p>
      <h2 id="krouzky-nadpis">${esc(r.title)}</h2>
    </div>
    <nav aria-labelledby="krouzky-nadpis">
      <ul class="related-list">
        ${r.items.map((it, i) => `<li data-reveal style="--i:${i}">${it.href === page.path
          ? `<a class="related-link" href="${esc(abs(it.href))}" aria-current="page"><span>${esc(it.label)}</span><span class="related-current">Právě prohlížíte</span></a>`
          : `<a class="related-link" href="${esc(abs(it.href))}"><span>${esc(it.label)}</span>${icon.arrow()}</a>`}</li>`).join("")}
      </ul>
    </nav>
  </div>
</section>`;

    const n = page.news;
    const newsHtml = `<section class="section" aria-labelledby="novinky-nadpis">
  <div class="container news-wrap">
    <div class="section-head" data-reveal style="margin-bottom:0">
      <p class="eyebrow">${esc(n.eyebrow)}</p>
      <h2 id="novinky-nadpis">${esc(n.title)}</h2>
      <p style="margin-top:1.5rem"><a class="link-arrow" href="${esc(abs(site.newsIndex.href))}">${esc(site.newsIndex.label)} ${icon.arrow()}</a></p>
    </div>
    <ol class="news-list" data-reveal>
      ${news.items.map((item) => `<li><a href="${esc(item.href)}"><span class="news-title">${esc(item.title.trim())}</span>${icon.arrow()}</a></li>`).join("")}
    </ol>
  </div>
</section>`;

    return hero + factsHtml + overview + training + gallery + related + newsHtml;
  }

  /* Document ---------------------------------------------------------------------------------- */
  function document({ page, news, css, js, boot }) {
    const m = page.meta;
    const ld = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: page.breadcrumbs.map((b, i) => ({ "@type": "ListItem", position: i + 1, name: b.label, item: abs(b.href) })),
    };
    return `<!DOCTYPE html>
<html lang="cs" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(m.title)}</title>
<meta name="description" content="${esc(m.description)}">
<link rel="canonical" href="${esc(m.canonical)}">
<meta name="theme-color" content="#0b2540">
<meta property="og:type" content="website">
<meta property="og:locale" content="cs_CZ">
<meta property="og:site_name" content="${esc(site.siteName)}">
<meta property="og:title" content="${esc(m.ogTitle)}">
<meta property="og:description" content="${esc(m.description)}">
<meta property="og:url" content="${esc(m.canonical)}">
<meta property="og:image" content="${esc(m.ogImage)}">
<meta property="og:image:width" content="930">
<meta property="og:image:height" content="500">
<link rel="icon" href="${asset("templates/yoo_infinite/favicon.ico")}" sizes="16x16">
<link rel="preload" href="${asset("assets/fonts/archivo-latin.woff2")}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${asset("assets/fonts/archivo-latin-ext.woff2")}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${asset(css)}">
<script>${boot}</script>
<script src="${asset(js)}" defer></script>
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body id="top">
<a class="skip-link" href="#obsah">Přeskočit na obsah</a>
${header(page.path)}
<main id="obsah" tabindex="-1">
${athleticsPage(page, news)}
</main>
${footer(page)}
</body>
</html>
`;
  }

  return { document };
}
