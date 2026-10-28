# Chez Manu · redesign proposal

A rebuild of https://www.chez-manu-lausanne.ch, the Portuguese bakery, pastry shop and tea room at Rue du Maupas 30,
Lausanne: hyper animated, interactive, in five languages (Français by default, English, Português, Italiano, Deutsch).
Every text, price, photo and contact detail comes from the live site; translations change the language, never the facts.

**This is a design proposal.** Every page carries a permanent band ("Proposta de design · não é o site oficial", plus the
current language), the pages are `noindex` and `robots.txt` disallows crawling. The logo, photos and texts belong to
Chez Manu; the live site was not touched. The site goes live only with the owner's OK.

- **Preview:** https://claude.ai/artifact/WnD5dKJQtP8y2GRQkt6EdP (private until shared from its Share menu; built with `npm run build:artifact`)
- **Static site:** `npm run build` writes `dist/` (25 prerendered pages, sitemap, robots, Netlify `_redirects`)

## Commands

```bash
npm install
npm run dev               # http://127.0.0.1:5175  (dev/custard.html shows the hero shader alone)
npm run build             # dist/: 25 pages (5 languages × 5 pages), sitemap, robots, redirects
npm run check             # carte counts and prices, products, photos, strings ×5, legal blocks, built pages
npm run build:artifact    # artifact/: the claude.ai preview (one script, WebP only, Google Fonts)

npm run images                     # media/original → public/images (WebP + AVIF), public/brand
python3 -I scripts/extract_legal.py # content/raw/*.txt → content/legal.json (French legal text, verbatim)
node scripts/render-poster.mjs     # the custard poster stills, from the real shader (needs `npm run dev`)
node scripts/build-azulejos.mjs    # the azulejo texture
```

Launch build (owner approved): `VITE_PROPOSAL=0 VITE_FORM=netlify npm run build` drops the band and `noindex`, allows
crawling and sends the form through Netlify Forms.

## Where things are

| Brief | Where |
|---|---|
| Content, verbatim: carte (5 sections, 35 listings, 13 teas), products, photos, contact, hours | `content/carte.json`, `content/products.json`, `content/photos.json`, `content/facts.json`, `src/i18n.ts` (`TEXT`), snapshots of the live pages in `content/raw/` |
| Five languages, routes, `hreflang`, `<html lang>`, Bakery JSON-LD | `src/i18n.ts`, `src/seo.ts`, `scripts/postbuild-routes.mjs` |
| Home-page language chooser (flips to the welcome word), header and footer switchers | `src/components/LanguageChooser.tsx`, `src/components/LanguageSwitcher.tsx` |
| Welcome slide on every language change; first-visit intro (painted from the HTML, then slid away) | `src/components/WelcomeSlide.tsx`, `introShell` in `scripts/postbuild-routes.mjs` |
| Custard hero: shader, caramelises under the pointer or a finger, five slides from the live texts, swipe, pause | `src/three/custard.ts`, `src/components/home/Hero.tsx` |
| Logo slide strip: follows scroll speed and direction, pauses on hover and with its button | `src/components/home/LogoStrip.tsx` |
| Story scroll scene (GSAP ScrollTrigger): words light up, photo drifts, cup steams, «12 ans» count-up (off until confirmed) | `src/components/home/Story.tsx` |
| Logo biscuit (three.js): drag or flick to spin, settles facing front, ← →, «Faire tourner» | `src/three/biscuit.ts`, `src/components/home/LogoBiscuit.tsx` |
| Commitments bento with tilt, glare and Lottie icons | `src/components/home/Commitments.tsx`, `src/components/Tilt.tsx`, `src/lottie/` |
| La vitrine Portugal \| Suisse: logo handle (slider: ← → ↑ ↓ Home End), Portugal / Tout / Suisse, the counter, a full list | `src/components/home/Vitrine.tsx` |
| Cinnamon sprinkle on the pastel de nata | `src/components/home/Sprinkle.tsx` |
| La carte as a chalkboard: 5 tabs with a sliding underline, instant search, cups that fill like the drink | `src/components/offer/Carte.tsx`, `CupDrawing` in `src/components/Illustrations.tsx` |
| Breakfast builder (N°1 / N°2, hot drink, CHF 12.00) | `src/components/offer/BreakfastBuilder.tsx` |
| The 13 Sirocco teas as steaming chips | `src/components/offer/TeaChips.tsx` |
| Gallery wall: endless, drag with inertia, arrow keys, Enter, swipeable lightbox, «Afficher en grille» | `src/components/offer/GalleryWall.tsx`, `Lightbox.tsx` |
| Custom cake request with candles; hands its message to the contact form | `src/components/offer/CustomCake.tsx` |
| Contact form (Nom, E-mail, Téléphone, Message; live confirmation and error messages) | `src/components/ContactForm.tsx` |
| Live open / closed and terrace badges (Lausanne time) | `src/components/OpenBadge.tsx`, `src/hours.ts` |
| Map on click, «Itinéraire», magnetic buttons with ripple, cursor follower | `src/components/MapCard.tsx`, `Magnetic.tsx`, `CursorFollower.tsx` |
| Legal pages: French verbatim, translations marked for checking | `src/legal.ts`, `content/legal.json`, `src/pages/Legal.tsx` |

Reduced motion: crossfades instead of slides, a still custard poster, a flat logo, two shelves side by side, no
parallax, steam, sprinkles, candles animation or cursor follower, the gallery as a grid, the slideshow does not
auto-advance, sections are simply there. Every drag has a keyboard way and every product, price and photo is
reachable without hover or drag.

## Hand-off

### Results

- `npm run check`: 5 carte sections (8 / 1 / 2 / 10 / 14 = 35 listings), 13 teas, the 34 prices in the live page's order
  (the breakfast's single «12.0 chf» shown on both formulas as CHF 12.00), 32 products with no price, 18 shop photos all
  on the gallery wall with alt text in five languages, 1,025 interface strings filled in every language, no «ß», no
  template leftovers, 25 built pages with their own `<html lang>`, title, `hreflang` and Bakery JSON-LD.
- Lighthouse, mobile, on the built site: Performance 86–98 (home 86–95, Ce que nous proposons 95, Contact 98, legal 88),
  Accessibility 100, Best Practices 100. SEO 69 only because the proposal is `noindex` (the single failing audit is
  `is-crawlable`); the launch build (`VITE_PROPOSAL=0`) scores SEO 100.
- Checked at 375, 768, 1280 and 1920 px in all five languages (no horizontal scroll), with reduced motion, and by
  keyboard (chooser, slideshow, vitrine, carte tabs and search, breakfast builder, gallery and lightbox, cake card, form).
  No console errors. Shaders tested with a software renderer only (this machine has no GPU); real phones not tested.

### What was dropped or not done

- Nothing from the drop list was dropped.
- 21st.dev and motionsites.ai were not used: the 21st.dev MCP server is not connected in this session (no API key), so
  the comparison slider, marquee, tilt cards, magnetic buttons, text reveal and animated tabs were written by hand.
- The «12 ans» count-up is built but off (`content/facts.json` → `"yearsConfirmed": true` turns it on).
- The animated icons are Lottie animations drawn for this site and played with lottie-web, not downloaded dotLottie files.

### Decisions made without asking

- **Stack:** React 19, Vite 6, TypeScript, Tailwind 4, Motion 12, GSAP ScrollTrigger (story only), three.js directly
  (no react-three-fiber, no Spline), lottie-web, Lenis, react-router 7, a typed dictionary instead of i18next. No shadcn/ui
  components were needed. Fonts are self-hosted (DM Serif Display, Figtree, Caveat); the preview loads them from Google Fonts.
- **First paint:** the built pages paint the intro, the home hero, the offer hero and the contact title as static HTML;
  the app takes them over (same photo nodes, no replayed entrance) and boots once that first screen has loaded.
- **Photos:** I found 7 shop photos on the home page, not 5: the bread rolls, the bread basket, the pastéis de nata and
  the salad display, plus three photos used as section backgrounds (the tea room, the shop interior, the counter). There is
  no coffee-cup-with-croissant photo on the live home page. The only coffee photo on the site is an Adobe Stock picture of
  coffee cups behind the carte: left out (no stock photos). The gallery has 12 photos; its first one is labelled «three
  sandwiches with a "super frais" sign» by an automatic alt text, but it shows a Little Mermaid birthday cake, and is
  described as such. Contact has no photos. The paper textures (`bg-long-*.png`) and the template background were not used.
  18 photos in all, each with a new description in five languages.
- **Products in the vitrine:** Portuguese list → Portugal; traditional cakes and the viennoiserie (French names) →
  Suisse; breads (as the brief asks), biscuits, light meals, custom cakes and catering → «Des deux côtés». A product gets
  a photo only where a shop photo shows exactly that product (pastéis de nata, fruit tarts, walnut cake, chocolate cake,
  salads, custom cake); the others are labelled photo slots («photo à venir», «Photo : Bolo Rei» for screen readers) with
  a line illustration.
- **Names:** pastry, product and brand names stay as written in every language; generic names are translated with the
  French menu name shown underneath («Sur la carte : Chocolat Chaud») so they can be ordered at the counter. Short glosses
  in the other languages (Galão, Renverse, Café Viennois, the teas without a description) are not on the live site.
- **Hero slides:** ① the live title and tagline ② «Chez Manu : authentiques saveurs portugaises et suisses» and the first
  sentence of its text ③ «Des formules petits-déjeuners», CHF 12.00 ④ «Tea-room» (from «notre univers») and the indoor /
  terrace sentence ⑤ «Horaires d'ouverture» with «Appelez-nous».
- **Breakfast builder:** the hot drink is chosen from the 8 coffees; the page says to ask in the shop whether every hot
  drink is included.
- **Badges:** «Ouvert · ferme à 18:30», «Fermé · ouvre à 6:30» (or «ouvre demain à 6:30»); «Terrasse ouverte» from April
  to October while the shop is open, otherwise «Terrasse d'avril à octobre».
- **Map:** OpenStreetMap, loaded only after a click (coordinates from OpenStreetMap Nominatim); «Itinéraire» opens Google
  Maps directions. The preview cannot embed other sites, so there the button opens OpenStreetMap in a new tab.
- **Form:** Netlify Forms in the launch build (`VITE_FORM=netlify`; the form is declared in the built HTML, with a
  honeypot). In the preview and in any other build it is in **test mode**: it validates and shows the live confirmation,
  but nothing leaves the page (`?formerror` shows the live error message). The custom cake card fills the form's message.
- **Texts kept verbatim, typos included.** Suggested corrections for the owner: «1croissant» → «1 croissant»; «Vous pourrez
  y dégustez» → «y déguster»; «vous laissez tenter» → «vous laisser tenter»; «viennoiseries tels que» → «telles que»;
  «Côté tea room, Profitez» → «profitez»; «un buffet composés de bouchées et petits fours sucrés et salées» → «composé …
  salés»; «disponible à la vente» → «disponibles»; «passez nous voir» → «passez-nous voir»; «Renverse» → «Renversé».
  «Capuccino» and «Latte Machiatto» are kept as the shop's product names.
- **Legal pages:** French as written, except three things left out: a lone «/» line in section 9 of the privacy policy, the
  credit «© 2024 Réalisé par localsearch.ch» (it describes the old site), and the name of another business, «Sips
  Corner», in the legal page's title and description (now «Chez Manu»). The privacy policy is the previous web agency's
  template (it names localsearch, newsletters and an online shop) and does not mention the form service or the map: it
  should be reviewed before launch.
- **Thé Bio Sirocco:** the live name ends in an asterisk with no footnote; shown without it.
- **Translations:** Portuguese is European Portuguese (Lausana, esplanada, pequeno-almoço); German is Swiss («ss»,
  Guetzli, Rüebli, Baumnuss); «beignets à la crème pâtissière» became «bolas de Berlim com creme pasteleiro» in Portuguese.
- **Logo:** the largest published version is a 600 px PNG on white; the white is keyed out for the flour backgrounds and
  the biscuit. The favicon is the logo's heart on a flour disc.

### Open questions for the owner

1. The site says «Ouverte depuis 12 ans», and the e-mail address suggests 2007. Is «12 ans» still right? (The count-up stays off until then.)
2. Should the form send to chezmanu2007@gmail.com?
3. The gallery photo with the youpaq.com poster: is it the shop, or a supplier's photo?
4. Are there more photos, especially of the pastries (Bolo Rei, Pão de Ló, the Swiss classics, the viennoiserie), and may Instagram photos be used?
5. Is there a vector (SVG) version of the logo? It would sharpen the biscuit and the welcome slide.
6. The staff speak Italian and Portuguese: can someone check the Italian and Portuguese texts? Who checks the German, and the English?
7. Is every hot drink of the carte included in the breakfast formulas?
8. What does the asterisk after «Thé Bio Sirocco» refer to?
9. May the French typos listed above be corrected?
10. Who updates the privacy policy (form service, map, no online shop or newsletter)?

### Template leftovers not copied

The unfinished slider on the live home page («Slide title», «Write your caption here», a button labelled «Button»), the
«Button» labels under «notre univers» and in the gallery, the «Share by:» line, the template business name «Sips Corner»
in the legal page's title and description and in the form's auto-reply sender, and the form's German e-mail subject
«Nachricht aus dem Formular».

### Old addresses → new (redirects at launch)

| Old | New |
|---|---|
| `/` | `/fr/` (the app picks the saved language, else the browser's, else French; without JavaScript, French) |
| `/ce-que-nous-proposons` | `/fr/ce-que-nous-proposons` |
| `/contact` | `/fr/contact` |
| `/privacy` | `/fr/privacy` |
| `/mentions-legales` | `/fr/mentions-legales` |

Written to `dist/_redirects` (Netlify format, 301).

### Before launch

- The English, Portuguese, Italian and German texts (including the legal translations and the photo descriptions) need a
  native-speaker check.
- Set the Netlify form notification to the owner's confirmed address, build with `VITE_PROPOSAL=0 VITE_FORM=netlify`.

## Structure

```
content/            carte, products, photos, facts, legal (French), raw text snapshots of the live pages
media/original/     the shop's photos and logo, downloaded at -1920w from the live site's CDN
public/             images (WebP + AVIF), brand files, textures
src/i18n.ts         languages, routes, live texts (TEXT) and interface strings (UI), page titles (SEO)
src/legal.ts        legal translations
src/content.ts      typed access to content/
src/three/          custard shader, logo biscuit
src/components/     shared components; home/ and offer/ sections
src/pages/          Home, Offer, Contact, Legal (below-the-fold parts in their own chunks)
scripts/            images, legal extraction, prerender + redirects, checks, poster, artifact
```
