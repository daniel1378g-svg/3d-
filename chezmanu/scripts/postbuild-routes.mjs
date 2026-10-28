// After `vite build`: one static HTML file per page and language, each with its own <html lang>, title,
// description, canonical, hreflang alternates and Bakery JSON-LD, so crawlers and link previews get the right
// head without running the app; a <noscript> card with the address, phone and hours; the sitemap, robots.txt,
// Netlify redirects (old addresses → French pages) and the static declaration of the «contact» Netlify form.
// Adapted from ../oliveira/scripts/postbuild-routes.mjs.
import { build } from "esbuild";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const dist = join(root, "dist");
const tmp = join(root, ".cache/seo.cjs");
await build({
  stdin: { contents: 'export { headTags, ORIGIN } from "./src/seo"; export { LANGS, SLUGS, HTML_LANG, TEXT } from "./src/i18n"; export { CONTACT, photo } from "./src/content"; export { WELCOME, UI } from "./src/i18n";', resolveDir: root, loader: "ts" },
  bundle: true, platform: "node", format: "cjs", outfile: tmp, logLevel: "warning",
  alias: { "@": join(root, "src"), "@content": join(root, "content") },
  define: { __ARTIFACT__: "false" },
});
const { headTags, ORIGIN, LANGS, SLUGS, HTML_LANG, TEXT, CONTACT, WELCOME, UI, photo } = createRequire(import.meta.url)(tmp);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const proposal = process.env.VITE_PROPOSAL !== "0";
let shell = readFileSync(join(dist, "index.html"), "utf8");
if (!proposal) shell = shell.replace('<meta name="robots" content="noindex" />\n', "");
// The app boots once the static first screen (intro, hero shell and its photos) is loaded, or after 3 s at the
// latest, so it never competes with the first paint.
shell = shell.replace(
  /<script type="module" crossorigin src="([^"]+)"><\/script>/,
  (_, src) =>
    `<script>(function(){var done=false;function boot(){if(done)return;done=true;var s=document.createElement("script");s.type="module";s.crossOrigin="";s.src="${src}";document.head.appendChild(s)}if(document.readyState==="complete")boot();else{addEventListener("load",function(){requestAnimationFrame(boot)});setTimeout(boot,3000)}})()</script>`,
);
// The two faces of the first screen (headings and text), so they arrive with the CSS instead of after it.
const fonts = readdirSync(join(dist, "assets")).filter((f) => /^(dm-serif-display-latin-400-normal|figtree-latin-wght-normal)-.*\.woff2$/.test(f));
shell = shell.replace("<!--head-seo-->", fonts.map((f) => `<link rel="preload" as="font" type="font/woff2" href="/assets/${f}" crossorigin />`).join("") + "\n    <!--head-seo-->");

const posterPreload =
  '<link rel="preload" as="image" type="image/avif" href="/images/custard-poster.avif" media="(min-aspect-ratio: 4/5)" fetchpriority="high" />' +
  '<link rel="preload" as="image" type="image/avif" href="/images/custard-poster-portrait.avif" media="(max-aspect-ratio: 4/5)" fetchpriority="high" />';
const netlifyForm =
  '<form name="contact" data-netlify="true" netlify-honeypot="bot-field" hidden><input name="bot-field" /><input name="name" /><input name="email" /><input name="phone" /><textarea name="message"></textarea><input name="langue" /></form>';
const noscript = (lang) =>
  `<noscript><div style="font-family:system-ui,sans-serif;max-width:40rem;margin:2rem auto;padding:1.5rem;background:#fbf6ec;color:#2a1a12;border-radius:16px"><h1 style="margin:0 0 .5rem">Chez Manu</h1><p style="margin:0 0 1rem">${esc(TEXT.heroTitle[lang])}</p><p style="margin:0">${esc(CONTACT.street)}, ${CONTACT.zip} ${CONTACT.city}<br><a href="${CONTACT.phoneHref}">${CONTACT.phone}</a> · <a href="mailto:${CONTACT.email}">${CONTACT.email}</a></p><p style="margin:1rem 0 0">${esc(TEXT.hoursTitle[lang])}: ${esc(TEXT.weekdays[lang])} 6:30 – 18:30 · ${esc(TEXT.weekend[lang])} 6:30 – 18:00</p></div></noscript>`;

// The first-visit intro, painted before the app runs; the app slides this same element away (WelcomeSlide).
// A visitor who has already seen it in this session never sees it: the inline script removes it before paint.
const introShell = (lang) =>
  `<div id="shell-intro" class="dust fixed inset-0 z-[500] grid cursor-pointer place-items-center overflow-hidden bg-flour text-espresso" role="status"><div class="flex flex-col items-center gap-4 px-6 text-center md:gap-6"><img class="shell-logo w-[min(70vw,420px)]" src="/brand/logo.webp" alt="" width="569" height="290"><p lang="${HTML_LANG[lang]}" class="shell-word display overflow-hidden pb-1 text-[clamp(3.2rem,12vw,6.5rem)] leading-none text-cocoa">${[...WELCOME[lang].word].map((ch, i) => `<span style="animation-delay:${(0.1 + i * 0.025).toFixed(3)}s">${esc(ch)}</span>`).join("")}</p><p lang="${HTML_LANG[lang]}" class="shell-line display text-[clamp(1.3rem,3.6vw,2.2rem)] italic text-caramel">${esc(WELCOME[lang].line)}</p></div></div><script>try{if(sessionStorage.getItem("chezmanu-welcomed")==="1")document.getElementById("shell-intro").remove()}catch(e){}</script>`;

// The home hero's first slide as static HTML, in the classes the app renders, so the takeover is invisible.
const natas = photo("natas");
const natasSet = (ext) => natas.widths.map((w) => `/images/${natas.name}-${w}.${ext} ${w}w`).join(", ");
const heroShell = (lang) =>
  `<section id="shell-hero" class="relative isolate flex min-h-[100svh] flex-col overflow-hidden text-espresso"><div aria-hidden="true" class="absolute inset-0 -z-10 overflow-hidden bg-custard"><picture><source media="(max-aspect-ratio: 4/5)" type="image/avif" srcset="/images/custard-poster-portrait.avif"><source media="(max-aspect-ratio: 4/5)" type="image/webp" srcset="/images/custard-poster-portrait.webp"><source type="image/avif" srcset="/images/custard-poster.avif"><img alt="" width="1600" height="1000" fetchpriority="high" class="absolute inset-0 h-full w-full object-cover" src="/images/custard-poster.webp"></picture><div class="absolute inset-0 bg-[radial-gradient(ellipse_62%_70%_at_24%_58%,rgb(247_214_138/0.82),rgb(247_214_138/0.35)_55%,transparent_80%)] max-md:bg-[radial-gradient(ellipse_120%_60%_at_50%_70%,rgb(247_214_138/0.85),rgb(247_214_138/0.4)_60%,transparent_85%)]"></div></div>` +
  `<h1 class="sr-only">Chez Manu – ${esc(TEXT.heroTitle[lang])}</h1><div class="gutter relative flex flex-1 items-center pb-28 pt-[calc(var(--header-h)+var(--label-h)+24px)] md:pb-32"><div class="wrap"><div class="grid items-center gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-16"><div class="order-2 max-w-[640px] md:order-1"><p class="kicker mb-4 inline-flex rounded-full bg-flour/80 px-3 py-1.5 !text-cocoa">Chez Manu</p><p class="display text-[clamp(2.4rem,6.4vw,5.4rem)] leading-[0.98] text-cocoa" aria-hidden="true"><span lang="${HTML_LANG[lang]}">${esc(TEXT.heroTitle[lang])}</span></p><div class="mt-5 max-w-[46ch] text-[clamp(1.02rem,1.5vw,1.2rem)] font-medium leading-relaxed"><p>${esc(TEXT.heroLine1[lang])}</p><p class="mt-1">${esc(TEXT.heroLine2[lang])}</p></div><div class="mt-7 flex flex-wrap gap-3"><a href="/${lang}/#histoire" class="btn btn-dark">${esc(TEXT.learnMore[lang])}<span class="sr-only"> – ${esc(TEXT.introTitle[lang])}</span> <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></a></div></div>` +
  `<div class="order-1 mx-auto w-[min(64vw,300px)] md:order-2 md:w-full md:max-w-[440px]"><div class="relative" data-shell-visual><div class="relative aspect-square w-full overflow-hidden rounded-full shadow-lift ring-[10px] ring-flour"><div class="photo is-loaded h-full w-full" style="background-image:url(${natas.lqip})"><picture><source type="image/avif" srcset="${natasSet("avif")}" sizes="(min-width: 1024px) 440px, (min-width: 768px) 38vw, min(64vw, 300px)"><source type="image/webp" srcset="${natasSet("webp")}" sizes="(min-width: 1024px) 440px, (min-width: 768px) 38vw, min(64vw, 300px)"><img alt="${esc(natas.alt[lang])}" width="${natas.w}" height="${natas.h}" fetchpriority="high" src="/images/${natas.name}-960.webp"></picture></div></div><div class="absolute -bottom-6 -left-6 w-[58%] rounded-[24px] bg-flour px-4 py-3 shadow-lift md:-left-10"><img src="/brand/logo-300.webp" alt="" width="284" height="145" class="h-auto w-full"></div></div></div></div></div></div></section>`;

// Ce que nous proposons: the hero band (shop photo, title, lead) as static HTML; the app adopts the photo node.
const shop = photo("shop");
const shopSet = (ext) => shop.widths.map((w) => `/images/${shop.name}-${w}.${ext} ${w}w`).join(", ");
const offerShell = (lang) =>
  `<section id="shell-offer" class="espresso on-dark relative isolate flex min-h-[78svh] items-end overflow-hidden"><div data-shell-photo class="photo is-loaded absolute inset-0 -z-10 h-full w-full opacity-70" style="background-image:url(${shop.lqip})"><picture><source type="image/avif" srcset="${shopSet("avif")}" sizes="100vw"><source type="image/webp" srcset="${shopSet("webp")}" sizes="100vw"><img alt="${esc(shop.alt[lang])}" width="${shop.w}" height="${shop.h}" fetchpriority="high" src="/images/${shop.name}-960.webp"></picture></div><div aria-hidden="true" class="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(42_26_18/0.95),rgb(42_26_18/0.35)_60%,rgb(42_26_18/0.55))]"></div><div class="gutter w-full pb-16 pt-[calc(var(--header-h)+var(--label-h)+20vh)] md:pb-20"><div class="wrap"><h1 class="display max-w-[20ch] text-[clamp(2.5rem,6.5vw,5.6rem)] leading-[0.98] text-flour"><span lang="${HTML_LANG[lang]}">${esc(TEXT.offerTitle[lang])}</span></h1><p class="mt-6 max-w-[60ch] text-[clamp(1.05rem,1.6vw,1.25rem)] text-flour/90">${esc(TEXT.offerLead[lang])}</p><a href="/${lang}/${SLUGS[lang].offer}#carte" class="btn btn-custard mt-8">${esc(TEXT.learnMore[lang])}<span class="sr-only"> – ${esc(TEXT.carteKicker[lang])}</span> <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></a></div></div></section>`;

// Contact: the custard band with the live title and text.
const contactShell = (lang) =>
  `<section id="shell-contact" class="gutter bg-custard pb-16 pt-[calc(var(--header-h)+var(--label-h)+56px)] md:pb-20"><div class="wrap"><h1 class="display max-w-[22ch] text-[clamp(2rem,5.6vw,4.8rem)] leading-[1.02] text-cocoa"><span lang="${HTML_LANG[lang]}">${esc(TEXT.contactTitle[lang])}</span></h1><p class="mt-6 max-w-[64ch] text-[clamp(1.05rem,1.6vw,1.25rem)] font-medium">${esc(TEXT.contactText[lang])}</p></div></section>`;

const shopPreload = `<link rel="preload" as="image" type="image/avif" imagesrcset="${shopSet("avif")}" imagesizes="100vw" fetchpriority="high" />`;

// The permanent design-proposal band, from the first paint (the app swaps in its own copy, same place).
const labelShell = (lang) =>
  proposal
    ? `<p id="shell-label" class="proposal-label" role="note"><span lang="pt-PT">${esc(UI.proposal)}</span>${UI.proposalLocal[lang] ? `<span class="local" lang="${HTML_LANG[lang]}">· ${esc(UI.proposalLocal[lang])}</span>` : ""}</p>`
    : "";

let count = 0;
for (const lang of LANGS) {
  for (const page of Object.keys(SLUGS[lang])) {
    const head = headTags(lang, page);
    let html = shell
      .replace('<html lang="fr">', `<html lang="${HTML_LANG[lang]}">`)
      .replace(/<title>[^<]*<\/title>/, `<title>${esc(head.title)}</title>`)
      .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(head.description)}" />`)
      .replace("<!--head-seo-->", head.html + (page === "home" ? "\n    " + posterPreload : page === "offer" ? "\n    " + shopPreload : ""))
      .replace('<div id="root"></div>', `${labelShell(lang)}${noscript(lang)}${introShell(lang)}<div id="root">${page === "home" ? heroShell(lang) : page === "offer" ? offerShell(lang) : page === "contact" ? contactShell(lang) : ""}</div>${page === "contact" ? netlifyForm : ""}`);
    const file = join(dist, lang, SLUGS[lang][page], "index.html");
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
    count++;
  }
}
// `/` picks the visitor's saved language, else the browser's, else French (in the app); without JavaScript, French.
writeFileSync(
  join(dist, "index.html"),
  shell
    .replace("<!--head-seo-->", `<link rel="alternate" hreflang="x-default" href="${ORIGIN}/fr/" />\n    <noscript><meta http-equiv="refresh" content="0; url=/fr/" /></noscript>`)
    .replace('<div id="root"></div>', `<div id="root"></div>${netlifyForm}`),
);
writeFileSync(join(dist, "404.html"), readFileSync(join(dist, "fr", "index.html"), "utf8"));

const urls = [];
for (const lang of LANGS)
  for (const page of Object.keys(SLUGS[lang])) {
    const alts = LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${HTML_LANG[l]}" href="${ORIGIN}/${l}/${SLUGS[l][page]}"/>`).join("\n");
    urls.push(`  <url>\n    <loc>${ORIGIN}/${lang}/${SLUGS[lang][page]}</loc>\n${alts}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}/fr/${SLUGS.fr[page]}"/>\n  </url>`);
  }
writeFileSync(join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`);
writeFileSync(join(dist, "robots.txt"), proposal ? "# Design proposal: not to be indexed.\nUser-agent: *\nDisallow: /\n" : `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);

// The live site's addresses → their French pages (Netlify format; the same list is in the README).
const redirects = [
  ["/ce-que-nous-proposons", "/fr/ce-que-nous-proposons"],
  ["/contact", "/fr/contact"],
  ["/privacy", "/fr/privacy"],
  ["/mentions-legales", "/fr/mentions-legales"],
];
writeFileSync(
  join(dist, "_redirects"),
  redirects.map(([from, to]) => `${from}  ${to}  301\n${from}/  ${to}  301`).join("\n") + "\n/*  /404.html  404\n",
);
console.log(`${count} pages written, sitemap with ${urls.length} URLs, ${redirects.length} redirects${proposal ? " (proposal: noindex)" : ""}`);
