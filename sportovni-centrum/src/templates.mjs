// HTML templates. All words come from content/*.json (page copy in content/pages/, shared labels in
// content/site.json → "ui"). Output is static HTML that works without JavaScript.
import { icon, pictogram, lanes, gymGraphic } from "./icons.mjs";

/* Text helpers ----------------------------------------------------------------------------------- */
export const esc = (s = "") => String(s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Czech typesetting ("vlna"): a one-letter preposition/conjunction (a i k o s u v z) and an ordinal
// number ("1.", "3.") never end a line – the following space becomes a no-break space. Text only;
// the stored content (and the live news titles) stay unchanged.
const NBSP = "\u00a0";
export function vlna(s = "") {
  let out = String(s);
  for (let i = 0; i < 3; i++) { // repeated for chains such as "a v Semilech"
    out = out.replace(/(^|[\s(„"])([aikosuvzAIKOSUVZ])[ \t]+(?=\S)/g, `$1$2${NBSP}`);
  }
  return out.replace(/(^|\s)(\d{1,2}\.)[ \t]+(?=[\p{L}\d])/gu, `$1$2${NBSP}`);
}
export const text = (s) => esc(vlna(s));

// Links allowed in content: web, mail, phone, in-page and site-relative. Anything else is dropped.
const SAFE_URL = /^(https?:\/\/|mailto:|tel:|#|\/(?!\/))/i;

export function createRenderer({ site, images, base = "/" }) {
  const ui = site.ui;
  const abs = (href) => {
    if (!SAFE_URL.test(href)) throw new Error(`Unsupported link "${href}" in content – use https://, mailto:, tel:, # or a /path`);
    return /^\/(?!\/)/.test(href) ? site.origin + href : href;
  };
  const url = (href) => esc(abs(href));
  const asset = (p) => `${base}${p}`;
  const newWin = `<span class="sr-only"> ${text(ui.newWindow)}</span>`;

  // Rich text: escaped, then a small trusted subset of inline markup is restored
  // (<strong>, <em>, <br>, <a href="…">); link targets go through the same URL check.
  const rich = (s = "") => text(s)
    .replace(/&lt;(\/?)(strong|em)&gt;/g, "<$1$2>")
    .replace(/&lt;br\s*\/?&gt;/g, "<br>")
    .replace(/&lt;a href=&quot;(.*?)&quot;&gt;/g, (_, href) => `<a href="${url(href.replace(/&amp;/g, "&").replace(/\u00a0/g, " "))}">`)
    .replace(/&lt;\/a&gt;/g, "</a>");

  const pick = (map, key, where) => {
    if (!map[key]) throw new Error(`Unknown icon "${key}" at ${where} – use one of: ${Object.keys(map).join(", ")}`);
    return map[key]();
  };
  const imageMeta = (rel, where) => {
    const meta = images[rel];
    if (!meta) throw new Error(`Image "${rel}" (${where}) is not in content/images.json – add the original to source/originals/ and run npm run images`);
    return meta;
  };

  function picture(rel, { alt, sizes, loading = "lazy", priority = false, where = "" }) {
    const meta = imageMeta(rel, where);
    const set = (type) => meta.variants.filter((v) => v.type === type).map((v) => `${asset(v.src)} ${v.width}w`).join(", ");
    const sources = ["image/avif", "image/webp"].map((type) => set(type) && `<source type="${type}" srcset="${set(type)}" sizes="${sizes}">`).filter(Boolean).join("");
    return `<picture>${sources}<img src="${asset(rel)}" width="${meta.width}" height="${meta.height}" alt="${text(alt)}" loading="${loading}" decoding="async"${priority ? ' fetchpriority="high"' : ""}></picture>`;
  }
  const largest = (rel, type) => imageMeta(rel).variants.filter((v) => v.type === type).sort((a, b) => b.width - a.width)[0];

  /* Header ---------------------------------------------------------------------------------- */
  function header(currentPath) {
    const isCurrent = (href) => href === currentPath;
    const inSection = (item) => item.columns?.some((col) => col.some((l) => isCurrent(l.href)));
    const subLink = (l) => {
      const attrs = l.newWindow ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<li><a class="subnav-link${l.emphasis ? " subnav-link--external" : ""}" href="${url(l.href)}"${attrs}${isCurrent(l.href) ? ' aria-current="page"' : ""}>
          <span>${text(l.label)}${l.note ? `<small>${text(l.note)}</small>` : ""}</span>${l.external ? icon.external() : ""}${l.newWindow ? newWin : ""}</a></li>`;
    };
    const items = site.nav.map((item, n) => {
      if (!item.columns) {
        return `<li class="nav-item"><div class="nav-row"><a class="nav-link" href="${url(item.href)}"${isCurrent(item.href) ? ' aria-current="page"' : ""}>${text(item.label)}</a></div></li>`;
      }
      const id = `podnabidka-${n}`;
      const count = item.columns.flat().length;
      return `<li class="nav-item has-sub${inSection(item) ? " is-active" : ""}" data-sub>
        <div class="nav-row">
          <a class="nav-link" href="${url(item.href)}">${text(item.label)}</a>
          <button class="sub-toggle" type="button" aria-expanded="false" aria-controls="${id}">
            <span class="sr-only">${text(ui.submenu)} ${text(item.label)}</span>${icon.chevron()}
          </button>
        </div>
        <div class="subnav${count > 6 ? " subnav--wide" : ""}" id="${id}">
          <div class="subnav-cols" style="--cols:${count > 6 ? item.columns.length : 1}">
            ${item.columns.map((col) => `<ul class="subnav-list">${col.map(subLink).join("")}</ul>`).join("")}
          </div>
        </div>
      </li>`;
    }).join("");

    return `<header class="site-header" data-header>
  <div class="container header-inner">
    <a class="brand" href="${url(site.logo.href)}"><img src="${asset(site.logo.src)}" width="${site.logo.width}" height="${site.logo.height}" alt="${text(site.logo.alt)}"></a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="hlavni-navigace" data-nav-toggle>
      <span class="nav-toggle-icon" aria-hidden="true"><span></span><span></span><span></span></span>
      <span data-nav-label data-open="${esc(ui.menuOpen)}" data-close="${esc(ui.menuClose)}">${text(ui.menuOpen)}</span>
    </button>
    <nav class="site-nav" id="hlavni-navigace" aria-label="${esc(ui.mainNav)}" data-nav>
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
  ${lanes({ cls: "footer-lanes", count: 5, green: -1, width: 900, cx: 380, cy: 520, r0: 200, step: 46, height: 520 + 200 + 4 * 46 + 8 })}
  <div class="container">
    <div class="footer-main">
      <section aria-labelledby="kontakt-nadpis">
        <h2 class="footer-title" id="kontakt-nadpis">${text(c.title)}</h2>
        <p class="footer-sub">${text(c.intro)}</p>
        <dl class="contact-list">
          <div class="contact-row"><dt>${text(c.labels.address)}</dt><dd>${text(c.address)}</dd></div>
          <div class="contact-row"><dt>${text(c.labels.phones)}</dt><dd><ul class="phone-list">${c.phones.map((p) => `<li><a href="tel:${esc(p.tel)}">${esc(p.label).replace(/ /g, "&nbsp;")}</a></li>`).join("")}</ul></dd></div>
          <div class="contact-row"><dt>${text(c.labels.email)}</dt><dd><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></dd></div>
          <div class="contact-row"><dt>${text(c.labels.more)}</dt><dd><a class="link-arrow" href="${url(c.more.href)}">${text(c.more.label)} ${icon.arrow()}</a></dd></div>
        </dl>
        <div class="footer-links">
          <a class="link-arrow" href="${url(c.gdpr.href)}">${text(c.gdpr.label)} ${icon.arrow()}</a>
        </div>
      </section>
      <div class="footer-aside">
        ${note ? `<section class="footer-card" aria-labelledby="poznamka-nadpis">
          <h2 class="footer-title footer-title--small" id="poznamka-nadpis">${text(note.title)}</h2>
          <p>${rich(note.text)}</p>
          <a class="link-arrow" href="${url(note.href)}">${text(note.linkLabel)} ${icon.external()}</a>
        </section>` : ""}
        <div class="footer-card">
          <a class="social-link" href="${url(site.social.href)}" target="_blank" rel="noopener">
            <img src="${asset(site.social.icon)}" width="${site.social.width}" height="${site.social.height}" alt="" loading="lazy">
            <span>${text(site.social.label)}</span>${newWin}
          </a>
        </div>
      </div>
    </div>
    <section class="partners" aria-label="${esc(ui.partnersLabel)}">
      <ul class="partner-list">
        ${site.partners.map((p) => `<li><a class="partner-link" href="${url(p.href)}" target="_blank" rel="${esc(p.rel)}">
          <img src="${asset(p.src)}" width="${p.width}" height="${p.height}" alt="${text(p.alt)}" loading="lazy">${newWin}</a></li>`).join("")}
      </ul>
    </section>
    <div class="footer-bottom">
      <span>${text(site.siteName)}</span>
      <a class="to-top" href="#top">${text(ui.toTop)} ${icon.arrowUp()}</a>
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

    const crumbs = page.breadcrumbs.map((b, i, all) => i === all.length - 1
      ? `<li><span aria-current="page">${text(b.label)}</span></li>`
      : `<li><a href="${url(b.href)}">${text(b.label)}</a></li>`).join("");

    const hero = `<section class="hero on-dark" aria-labelledby="nadpis-stranky">
  ${lanes({ cls: "hero-lanes draw", count: 6, green: 2, cy: 870, r0: 250, step: 40 })}
  <div class="container">
    <nav class="breadcrumbs" aria-label="${esc(ui.breadcrumbs)}"><ol>${crumbs}</ol></nav>
    <div class="hero-grid">
      <div class="hero-copy">
        <p class="eyebrow" data-enter style="--i:0">${text(h.eyebrow)}</p>
        <h1 id="nadpis-stranky" data-enter style="--i:1">${text(h.title)}</h1>
        <p class="hero-lead" data-enter style="--i:2">${rich(h.lead)}</p>
        <p class="hero-organiser" data-enter style="--i:3">${icon.shield()}<span>${rich(h.organiser)}</span></p>
        <div class="hero-actions" data-enter style="--i:4">
          <a class="btn" href="${url(h.primary.href)}">${text(h.primary.label)} ${icon.external()}<span class="sr-only"> (${text(h.primary.srHint)})</span></a>
          <a class="btn btn--ghost" href="${url(h.secondary.href)}">${text(h.secondary.label)} ${icon.arrowDown()}</a>
        </div>
      </div>
      <figure class="hero-media">
        <div class="hero-photo" data-enter style="--i:2">
          ${picture(h.image.src, { alt: h.image.alt, sizes: "(min-width: 1320px) 600px, (min-width: 900px) 46vw, calc(100vw - 2rem)", loading: "eager", priority: true, where: "hero.image" })}
        </div>
        <figcaption data-enter style="--i:4">${icon.camera()}<span>${text(h.image.caption)}</span></figcaption>
      </figure>
    </div>
  </div>
</section>`;

    const factsHtml = `<section class="facts" aria-label="${esc(facts.label)}">
  <div class="container">
    <ul class="facts-list">
      ${facts.items.map((f, i) => `<li class="fact" data-reveal style="--i:${i}">
        <span class="fact-icon">${pick(factIcon, f.icon, `facts.items[${i}].icon`)}</span>
        <h2>${text(f.title)}</h2>
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
      <p class="eyebrow">${text(o.eyebrow)}</p>
      <h2 id="o-pripravce">${text(o.title)}</h2>
      ${o.paragraphs.map((p) => `<p class="source-text">${rich(p)}</p>`).join("")}
      <dl class="organiser-card">
        ${o.organiser.map((row) => `<dt>${text(row.term)}</dt><dd>${row.href ? `<a href="${url(row.href)}">${text(row.value)}</a>` : text(row.value)}</dd>`).join("")}
      </dl>
    </div>
    <div>
      <ul class="disciplines" aria-label="${esc(o.disciplinesLabel)}">
        ${o.disciplines.map((d, i) => `<li class="discipline" data-reveal style="--i:${i}">
          ${lanes({ cls: "discipline-lanes", count: 4, green: -1, width: 400, height: 300, cx: 220, cy: 330, r0: 70, step: 26 })}
          <span class="discipline-num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
          ${pick(discIcon, d.icon, `overview.disciplines[${i}].icon`)}
          <h3>${text(d.label)}</h3>
        </li>`).join("")}
      </ul>
      <p class="disciplines-caption" data-reveal>${text(o.disciplinesCaption)}</p>
    </div>
  </div>
</section>`;

    const t = page.training;
    const panel = (p, i) => `<article class="panel" data-reveal style="--i:${i}">
      ${p.image
        ? `<figure class="panel-media">${picture(p.image.src, { alt: p.image.alt, sizes: "(min-width: 1320px) 610px, (min-width: 820px) 48vw, calc(100vw - 2rem)", where: `training.panels[${i}].image` })}<figcaption>${text(p.image.caption)}</figcaption></figure>`
        : `<div class="panel-graphic">${gymGraphic()}</div>`}
      <div class="panel-body">
        <span class="panel-label${p.kind === "winter" ? " panel-label--winter" : ""}">${p.kind === "winter" ? icon.snow() : icon.stadium()}${text(p.label)}</span>
        <h3>${text(p.title)}</h3>
        <p>${rich(p.text)}</p>
        ${p.link ? `<a class="link-arrow" href="${url(p.link.href)}">${text(p.link.label)} ${icon.arrow()}</a>` : ""}
      </div>
    </article>`;
    const training = `<section class="section section--paper training" id="treninky" aria-labelledby="treninky-nadpis">
  <div class="container">
    <div class="section-head" data-reveal>
      <p class="eyebrow">${text(t.eyebrow)}</p>
      <h2 id="treninky-nadpis">${text(t.title)}</h2>
      ${t.intro ? `<p class="section-lead">${rich(t.intro)}</p>` : ""}
    </div>
    <div class="training-panels">${t.panels.map(panel).join("")}</div>
    <div class="cta-band on-dark" data-reveal>
      ${lanes({ cls: "cta-lanes draw", count: 5, green: 1, cx: 600, cy: 640, r0: 200, step: 40 })}
      <div>
        <h3>${text(t.cta.title)}</h3>
        <p>${rich(t.cta.text)}</p>
      </div>
      <div>
        <a class="btn btn--light" href="${url(t.cta.href)}">${text(t.cta.label)} ${icon.external()}</a>
        <span class="cta-url">${text(t.cta.urlLabel)}</span>
      </div>
    </div>
  </div>
</section>`;

    const g = page.gallery;
    const gallery = `<section class="section gallery-section" aria-labelledby="galerie-nadpis">
  <div class="container">
    <div class="section-head" data-reveal>
      <p class="eyebrow">${text(g.eyebrow)}</p>
      <h2 id="galerie-nadpis">${text(g.title)}</h2>
      <p class="section-lead">${rich(g.intro)}</p>
      <p class="gallery-note">${icon.info()}<span>${text(g.note)}</span></p>
    </div>
    <ul class="gallery-grid">
      ${g.items.map((it, i) => {
        const meta = imageMeta(it.src, `gallery.items[${i}]`);
        const avif = largest(it.src, "image/avif");
        const webp = largest(it.src, "image/webp");
        return `<li data-reveal style="--i:${i % 3}">
        <a class="gallery-item" href="${asset(it.src)}" data-gallery-item data-caption="${text(it.caption)}" data-width="${meta.width}" data-height="${meta.height}"${avif ? ` data-avif="${asset(avif.src)}"` : ""}${webp ? ` data-webp="${asset(webp.src)}"` : ""}>
          ${picture(it.src, { alt: it.alt, sizes: i === 0 ? "(min-width: 900px) 50vw, calc(100vw - 2rem)" : "(min-width: 900px) 25vw, 50vw", where: `gallery.items[${i}]` })}
          <span class="gallery-zoom">${icon.zoom()}</span>
          <span class="sr-only"> – ${text(ui.lightbox.open.replace("{n}", i + 1).replace("{total}", g.items.length))}</span>
        </a>
      </li>`;
      }).join("")}
    </ul>
    <div class="gallery-foot" data-reveal>
      <span>${text(g.credit)}</span>
      <span class="gallery-links">
        ${g.links.map((l) => `<a class="link-arrow" href="${url(l.href)}">${text(l.label)} ${icon.arrow()}</a>`).join("")}
      </span>
    </div>
  </div>
  <dialog class="lightbox on-dark" data-lightbox aria-label="${esc(g.lightboxLabel)}" data-counter="${esc(ui.lightbox.counter)}">
    <div class="lightbox-top">
      <span class="lightbox-counter" data-lb-counter aria-live="polite"></span>
      <button class="lb-btn" type="button" data-lb-close>${icon.close()}<span class="sr-only">${text(ui.lightbox.close)}</span></button>
    </div>
    <div class="lightbox-stage"><picture><source type="image/avif" data-lb-avif><source type="image/webp" data-lb-webp><img data-lb-img src="data:," alt=""></picture></div>
    <div class="lightbox-bottom">
      <button class="lb-btn" type="button" data-lb-prev>${icon.prev()}<span class="sr-only">${text(ui.lightbox.prev)}</span></button>
      <p class="lightbox-caption" data-lb-caption></p>
      <button class="lb-btn" type="button" data-lb-next>${icon.next()}<span class="sr-only">${text(ui.lightbox.next)}</span></button>
    </div>
  </dialog>
</section>`;

    const r = page.related;
    const related = `<section class="section section--paper" aria-labelledby="krouzky-nadpis">
  <div class="container">
    <div class="section-head" data-reveal>
      <p class="eyebrow">${text(r.eyebrow)}</p>
      <h2 id="krouzky-nadpis">${text(r.title)}</h2>
    </div>
    <ul class="related-list">
      ${r.items.map((it, i) => `<li data-reveal style="--i:${i}">${it.href === page.path
        ? `<a class="related-link" href="${url(it.href)}" aria-current="page"><span>${text(it.label)}</span><span class="related-current">${text(ui.currentPage)}</span></a>`
        : `<a class="related-link" href="${url(it.href)}"><span>${text(it.label)}</span>${icon.arrow()}</a>`}</li>`).join("")}
    </ul>
  </div>
</section>`;

    const n = page.news;
    const newsHtml = `<section class="section" aria-labelledby="novinky-nadpis">
  <div class="container news-wrap">
    <div class="section-head news-head" data-reveal>
      <p class="eyebrow">${text(n.eyebrow)}</p>
      <h2 id="novinky-nadpis">${text(n.title)}</h2>
      <p class="news-index"><a class="link-arrow" href="${url(site.newsIndex.href)}">${text(site.newsIndex.label)} ${icon.arrow()}</a></p>
    </div>
    <ol class="news-list" data-reveal>
      ${news.items.map((item) => `<li><a href="${url(item.href)}"><span class="news-title">${text(item.title.trim())}</span>${icon.arrow()}</a></li>`).join("")}
    </ol>
  </div>
</section>`;

    return hero + factsHtml + overview + training + gallery + related + newsHtml;
  }

  /* Document ---------------------------------------------------------------------------------- */
  function document({ page, news, css, js, boot }) {
    const m = page.meta;
    const ogRel = m.ogImage.replace(`${site.origin}/`, "");
    const og = imageMeta(ogRel, "meta.ogImage");
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
<meta property="og:image:width" content="${og.width}">
<meta property="og:image:height" content="${og.height}">
<link rel="icon" href="${asset("templates/yoo_infinite/favicon.ico")}" sizes="16x16">
<link rel="preload" href="${asset("assets/fonts/archivo-latin.woff2")}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${asset("assets/fonts/archivo-latin-ext.woff2")}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${asset(css)}">
<script>${boot}</script>
<script src="${asset(js)}" defer></script>
<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>
</head>
<body id="top">
<a class="skip-link" href="#obsah">${text(ui.skipLink)}</a>
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
