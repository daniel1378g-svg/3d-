// After `vite build`: one static HTML file per page and language, each with its own <html lang>, title,
// description, canonical, hreflang alternates and Restaurant JSON-LD, so crawlers and link previews get
// the right head without running the app. Also the sitemap and the root redirect. Adapted from Don Duarte.
import { build } from "esbuild";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const dist = join(root, "dist");
const tmp = join(root, ".cache/seo.cjs");
await build({
  stdin: { contents: 'export { headTags, ORIGIN } from "./src/seo"; export { LANGS, SLUGS, HTML_LANG, TEXT, UI, WELCOME } from "./src/i18n"; export { PHOTOS } from "./src/content";', resolveDir: root, loader: "ts" },
  bundle: true, platform: "node", format: "cjs", outfile: tmp, logLevel: "warning", alias: { "@": join(root, "src") },
  define: { __ARTIFACT__: "false" },
});
const { headTags, ORIGIN, LANGS, SLUGS, HTML_LANG, TEXT, UI, WELCOME, PHOTOS } = createRequire(import.meta.url)(tmp);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// The first paint of the home page, before the app runs: the hero poster and its words, in the classes
// the React hero renders, so the swap is invisible. The app replaces it when it mounts.
const posterShell = `<div id="shell-poster" aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[100svh]"><picture><source media="(max-aspect-ratio: 4/5)" type="image/avif" srcset="/images/hero-poster-portrait.avif"><source media="(max-aspect-ratio: 4/5)" type="image/webp" srcset="/images/hero-poster-portrait.webp"><source type="image/avif" srcset="/images/hero-poster-960.avif 960w, /images/hero-poster.avif 1600w" sizes="100vw"><img src="/images/hero-poster.webp" alt="" width="1600" height="1000" fetchpriority="high" class="absolute inset-0 h-full w-full object-cover"></picture></div>`;
// The first-visit intro, painted before the app runs (the app then slides it away). A visitor who has
// already seen it in this session never sees it: the inline script removes it before the first paint.
const introShell = (lang) => `<div id="shell-intro" class="linen fixed inset-0 z-[400] grid place-items-center overflow-hidden text-leaf" role="status"><div class="flex flex-col items-center gap-3 px-6 text-center md:gap-4"><img class="w-[min(46vw,260px)]" src="/brand/logo.webp" alt="" width="600" height="741"><p lang="${HTML_LANG[lang]}" class="display pb-1 text-6xl font-semibold leading-none text-charcoal md:text-8xl">${esc(WELCOME[lang].word)}</p><p lang="${HTML_LANG[lang]}" class="display text-xl italic text-leaf md:text-3xl" style="opacity:.85">${esc(WELCOME[lang].line)}</p><p class="script text-3xl text-apetite-text md:text-4xl"><span lang="pt-PT">Bom apetite</span> – <span lang="gsw">en guete!</span></p></div></div><script>try{if(sessionStorage.getItem("oliveira-welcomed")==="1")document.getElementById("shell-intro").remove()}catch(e){}</script>`;
// The Küche page's hero, painted before the app runs: the caldo verde and the title.
const caldo = PHOTOS.find((p) => p.id === "own-06");
const srcset = (ext) => caldo.widths.map((w) => `/images/${caldo.name}-${w}.${ext} ${w}w`).join(", ");
const kitchenShell = (lang) => `<section class="charcoal on-dark relative isolate flex min-h-[72svh] items-end overflow-hidden"><div class="photo is-loaded absolute inset-0 -z-10 h-full w-full opacity-85"><picture><source type="image/avif" srcset="${srcset("avif")}" sizes="100vw"><source type="image/webp" srcset="${srcset("webp")}" sizes="100vw"><img src="/images/${caldo.name}-960.webp" alt="${esc(caldo.alt[lang])}" width="${caldo.w}" height="${caldo.h}" fetchpriority="high"></picture></div><div aria-hidden="true" class="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(31_34_41/0.92),rgb(31_34_41/0.25)_60%,rgb(31_34_41/0.5))]"></div><div class="gutter w-full pb-16 pt-[calc(var(--header-h)+var(--label-h)+18vh)] md:pb-20"><div class="wrap"><h1 class="display text-[clamp(3rem,9vw,7.5rem)] font-semibold leading-[0.9]">${esc(UI.navKitchen[lang])}</h1><p class="display mt-4 max-w-[34ch] text-[clamp(1.2rem,2.4vw,1.8rem)] italic text-linen/90">${esc(UI.kitchenHero[lang])}</p></div></div></section>`;
const heroShell = (lang) => `<section class="relative isolate flex min-h-[100svh] flex-col overflow-hidden text-charcoal"><div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_55%_at_30%_62%,rgb(246_241_231/0.7),transparent_72%)] max-md:bg-[radial-gradient(ellipse_100%_50%_at_50%_70%,rgb(246_241_231/0.78),transparent_75%)]"></div><div class="gutter relative mt-auto pb-24 pt-[calc(var(--header-h)+var(--label-h)+36vh)] md:pb-28 md:pt-[calc(var(--header-h)+var(--label-h)+18vh)]"><div class="wrap"><p class="kicker mb-5 inline-block rounded-full bg-linen/75 px-3 py-1.5 text-charcoal backdrop-blur-sm">Restaurante Oliveira · Winterthur-Töss</p><h1 class="display text-[clamp(2.9rem,8.4vw,7.6rem)] font-semibold leading-[0.92]" style="--soft:100"><span lang="pt-PT" class="block">Bom apetite</span><span lang="gsw" class="mt-1 block pl-[0.6em] text-apetite-text">– en guete!</span></h1><p class="display mt-6 max-w-[30ch] text-[clamp(1.25rem,2.4vw,2rem)] italic leading-snug">${esc(TEXT.heroLine[lang])}</p></div></div></section>`;

const proposal = process.env.VITE_PROPOSAL !== "0";
let shell = readFileSync(join(dist, "index.html"), "utf8");
if (!proposal) shell = shell.replace('<meta name="robots" content="noindex" />\n', "");
const noPreload = (html) => html.replace(/<!--hero-preload-->[\s\S]*?<!--\/hero-preload-->/, "");
let count = 0;
for (const lang of LANGS) {
  for (const page of Object.keys(SLUGS[lang])) {
    const head = headTags(lang, page);
    let html = shell
      .replace('<html lang="de-CH">', `<html lang="${HTML_LANG[lang]}">`)
      .replace(/<title>[^<]*<\/title>/, `<title>${esc(head.title)}</title>`)
      .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(head.description)}" />`)
      .replace("<!--head-seo-->", head.html);
    if (page === "kueche") html = noPreload(html).replace('<div id="root"></div>', `${introShell(lang)}<div id="root">${kitchenShell(lang)}</div>`);
    else if (page !== "home") html = noPreload(html).replace('<div id="root"></div>', `${introShell(lang)}<div id="root"></div>`);
    else html = html.replace('<div id="root"></div>', `${introShell(lang)}${posterShell}<div id="root">${heroShell(lang)}</div>`);
    const file = join(dist, lang, SLUGS[lang][page], "index.html");
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
    count++;
  }
}
// `/` picks the visitor's language in the app; without JavaScript it goes to German.
writeFileSync(join(dist, "index.html"), shell.replace("<!--head-seo-->", `<link rel="alternate" hreflang="x-default" href="${ORIGIN}/de/" />\n    <noscript><meta http-equiv="refresh" content="0; url=/de/" /></noscript>`));
writeFileSync(join(dist, "404.html"), readFileSync(join(dist, "de", "index.html"), "utf8"));
const urls = [];
for (const lang of LANGS) for (const page of Object.keys(SLUGS[lang])) {
  const alts = LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${HTML_LANG[l]}" href="${ORIGIN}/${l}/${SLUGS[l][page]}"/>`).join("\n");
  urls.push(`  <url>\n    <loc>${ORIGIN}/${lang}/${SLUGS[lang][page]}</loc>\n${alts}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}/de/${SLUGS.de[page]}"/>\n  </url>`);
}
writeFileSync(join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`);
console.log(`${count} pages written, sitemap with ${urls.length} URLs${proposal ? " (proposal: noindex)" : ""}`);
