# Restaurante Oliveira · redesign proposal

A rebuild of https://www.oliveira-winterthur.ch, made from the brief in [`PROMPT.md`](PROMPT.md): a living,
photo-real site in five languages (Deutsch by default, Português, English, Italiano, Français) for the
Portuguese and Swiss restaurant at Stationsstrasse 3, Winterthur-Töss.

**This is a design proposal.** Every page carries a permanent banner ("Proposta de design · não é o site
oficial", plus the current language), the preview is `noindex`, and `robots.txt` disallows crawling. The logo,
photos and texts belong to Restaurante Oliveira; the live WordPress site was not touched.

- **Preview:** https://claude.ai/artifact/LRdxrENiJ1uTeRErgKNq2r (private until shared; built with `npm run build:artifact`).
- **Static site:** `npm run build` writes `dist/` (deploys to any static host; `_redirects` is in Netlify format).

## What's in it

| Brief | Where |
|---|---|
| Hero: lunch under a procedural olive tree, lit by the real sun over Winterthur (day, golden hour, night with a lantern); pointer gusts flip leaves silver; Wind and pause buttons; tap an olive and it falls | `src/three/oliveTree.ts`, `src/three/sun.ts`, `src/components/home/Hero.tsx` (`?sun=2026-06-21T20:45` previews a time) |
| Living photos: depth parallax (Depth Anything V2 maps), rising steam, glisten, heat shimmer on the grill, device tilt | `src/three/living.ts`, `src/components/Photo.tsx`, `content/photos.json` (`living` ellipses) |
| "Portugal → Winterthur" route that draws itself on scroll, with an olive-branch badge riding the line (fully drawn with reduced motion) | `src/components/home/Route.tsx` |
| Welcome slide on every language change, intro on the first visit (prerendered, so it paints before the app runs) | `src/components/WelcomeSlide.tsx`, `scripts/postbuild-routes.mjs` |
| Compact language pill (DE ▾) in the header next to Menu on every width; list in the footer and mobile menu | `src/components/LanguageSwitcher.tsx` |
| Split-flap story: OLD PULLMANN → KAFI FROSCH → OLIVEIRA, words light up, the signature writes itself, the tree grows out of the "O" | `src/components/home/Story.tsx`, `src/components/SplitFlap.tsx` |
| "Served" dish cards with tilt and glare; the photo morphs into the detail | `src/components/Dishes.tsx` |
| Küche page: Portugal / Schweiz / Alle, instant search, Tagesmenü strip, no prices | `src/pages/Kitchen.tsx`, `content/dishes.json` |
| Photo slider of all 27 photos: swipe, mouse drag, arrows, snap with a peek, counter; tap for the full-screen lightbox | `src/components/home/Gallery.tsx` |
| Five Google reviews, quoted as written (labels and dates follow the language) | `src/components/home/Reviews.tsx`, `content/reviews.json` |
| MyLocalina in a drawer (bottom sheet you can drag down on phones), magnetic buttons, copy e-mail | `src/components/BookingDrawer.tsx`, `src/components/home/Reserve.tsx` |
| Live open/closed badge in Winterthur time, provisional hours, palette map with a dropping pin, OpenStreetMap on click | `src/components/OpenBadge.tsx`, `src/components/home/Contact.tsx`, `content/hours.json` |
| Logo strip that follows scroll speed and direction; Lottie icons; film grain; cursor follower; optional sound | `src/components/home/LogoStrip.tsx`, `src/lottie/`, `src/components/CursorFollower.tsx`, `src/lib/sound.ts` |
| Impressum (German verbatim, courtesy translations) and a draft privacy notice | `src/legal.ts`, `src/pages/Legal.tsx` |

Reduced motion: no smooth scroll, no parallax or steam, still poster instead of the tree, crossfades instead of
slides, no grain, the route drawn in full. Every drag has a keyboard way (slider, arrow keys, buttons).

## Commands

```bash
npm install
npm run dev               # http://127.0.0.1:5174  (dev/hero.html shows the 3D scene alone)
npm run build             # dist/: 20 prerendered pages, sitemap, redirects
npm run check             # strings ×5, photos + alt ×5, banned files, facts, axe, screenshots (.cache/check)
npm run build:artifact    # artifact/: the claude.ai preview (one script, WebP only, Google Fonts)

npm run images            # media/ → public/images, depth/, masks/, brand/ (Python + Pillow with AVIF)
npm run depth             # Depth Anything V2 Small depth maps into media/depth (downloads the model once)
npm run poster            # renders the hero stills from the real scene (needs `npm run dev` running)
node scripts/build-azulejos.mjs
```

## Hand-off

### Decisions made without asking

- **Stack:** three.js directly instead of react-three-fiber/drei (one small scene module, and the shared
  living-photo renderer is simpler to write by hand). GSAP was dropped: Motion's scroll hooks cover the story.
  Animated icons use lottie-web with icon data drawn for this site (no third-party Lottie files).
  The dish detail morph uses Motion's shared layout (`layoutId`) rather than the View Transitions API, so it
  works in every browser.
- **Living photos** render in one shared WebGL context and are copied into each photo's own canvas, so labels
  and overlays keep their place. Steam and gloss masks are generated from ellipses in `content/photos.json`
  instead of hand-painted masks.
- **No GPU, no 3D:** a software WebGL renderer (no graphics card, or a blocked one) counts as "no WebGL", so the
  page shows the still poster and the plain photos instead of freezing.
- **Texts:** five typos fixed in the live German ("sie" → "Sie", "Portugiesischen" → "portugiesischen",
  "Portugiesischer" → "portugiesischer", "Addresse" → "Adresse", "Resrervationen" → "Reservationen") and the
  motto set with an en dash. The Impressum is verbatim, including a missing full stop
  ("…Verantwortungsbereichs Es wird…").
- **Hours** come from a directory listing (oeffnungszeitenbuch.de, April 2026), are labelled provisional and
  stay out of the JSON-LD until `content/hours.json` says `"confirmed": true`.
- **Photos:** the six supplied photos carry "Symbolbild" until confirmed; their three dishes are
  `onMenu: "unconfirmed"`. The supplied caldo verde (Food and Journeys watermark) is not used; the restaurant's
  own is. The olive-grove photo and the WordPress template images are not used. The six `tagesmenue` files make
  a "Tagesmenü" strip, named after the restaurant's own file names.
- **No contact form** (the live site has none): phone, e-mail and MyLocalina only, so no form service is needed.
- **Fonts** are self-hosted in the real build; only the Artifact preview loads them from Google Fonts.
- **Map:** a palette-tinted map made at build time from OpenStreetMap tiles (© OpenStreetMap contributors),
  with the live OpenStreetMap loading only on click. The address was geocoded with OpenStreetMap Nominatim.
- **First paint without JavaScript:** the intro and the home and Küche heroes are written into the HTML, and
  the app takes them over.
- **Preview limits:** the claude.ai viewer cannot embed other sites, so there the booking drawer and the map
  link out to MyLocalina and OpenStreetMap instead of embedding them. Device tilt does nothing in the preview.

### Not done

- The optional AI cinemagraphs (the shader steam and glisten are used instead).
- Depth of field on far leaves and light shafts through the canopy (desktop extras in the brief).
- Lighthouse mobile Performance ≥ 85 is not met: the home page scores 71 with real (devtools) throttling and
  75 with the simulated default, and the Küche page about 55. Desktop scores 97. Accessibility is 100 and Best
  Practices 100. SEO shows 69 only because the preview is `noindex` (the single failing audit is
  `is-crawlable`). What's in the way: React and Motion (176 KB gzipped) start up on a 4×-throttled CPU, and the
  heroes are swapped from the static HTML to React. Prerendering with hydration (or Preact) would close the gap.
  This container has no GPU, so the 3D was measured off.

### Open questions for the owner

1. Are the opening hours right (Mo Ruhetag, Di–Do 10–22, Fr–Sa 10–23, So 10–18)?
2. Can you send the current menu (Speisekarte, Tagesmenü, Sonntagsmenü, drinks) with prices? Is there a daily
   menu, and may the site say so?
3. Where are the six supplied photos from, may the site use them, and do they show Oliveira's own food? Three
   look like stock or AI-generated images, one like a food-blog photo.
4. Are the mixed fish and seafood grill, the octopus with potatoes and the chicken plate on your menu?
5. Is there a vector logo, and are there larger originals of the 800 px photos?
6. Is the olive-grove photo (`oliveira-login-bg.jpg`) yours?
7. Is there an Instagram account?
8. Who reviews the privacy notice draft?
9. Are the five typo fixes all right, and should the Impressum's missing full stop be added?
10. Who proofreads the Portuguese, English, Italian and French texts?

### Old URLs → new

| Old | New |
|---|---|
| `/` | `/de/` (the app picks the saved or browser language; without JavaScript, German) |
| `/impressum-haftungsausschluss/` | `/de/impressum` |
| `#ueber-uns`, `#reservation`, `#kontakt` | kept on the home page in every language |

### Generated rather than photographed

The olive tree, table, plates and paving (procedural three.js), the hero posters (rendered from that scene), the
azulejo tiles, the depth maps (Depth Anything V2 Small), the steam and gloss masks, the stylised map, the
grain, the animated icons and the optional sounds (Web Audio).

### Before launch

- All Portuguese, English, Italian and French texts need a native-speaker check; the privacy notice is a draft.
- Build with `VITE_PROPOSAL=0 npm run build` to drop the banner and `noindex`, and replace `public/robots.txt`.
- Set `"confirmed": true` in `content/hours.json` and `"illustrative": false` on confirmed photos.
