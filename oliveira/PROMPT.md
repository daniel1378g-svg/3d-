# Redesign Restaurante Oliveira (oliveira-winterthur.ch): a living, photo-real site in five languages

**Languages:** Deutsch (default, Swiss spelling) · Português · English · Italiano · Français · **Time limit:** none, follow the build order in section 10 · **Deliver:** a working preview link, the code, and the hand-off in section 12

You are rebuilding https://www.oliveira-winterthur.ch, the website of Restaurante Oliveira, a Portuguese and Swiss restaurant at Stationsstrasse 3 in Winterthur-Töss, run by Arlindo Ribeiro Oliveira and his wife Ekaterina. "Oliveira" means olive tree in Portuguese and is also the family name. The house greeting is **"Bom apetite – en guete!"**, Portuguese and Swiss German in a single line, and the menu runs **"Von BACALHAU bis Käseschnitte «Walliser Art»"**. Build the whole design around that pairing: a Portuguese family's olive tree with its roots in Portugal, growing in Winterthur.

Make it **hyper animated and photo-real**. Visitors should feel the sun through olive leaves, steam rising off the caldo verde and gloss on the francesinha sauce, and everything they drag should have weight. Add five languages, offered right on the home page; every language change slides the logo over the whole screen with "welcome" in that language. Keep every text and contact detail exactly as it is today, use the restaurant's own photos plus the six photos supplied with this brief, and invent nothing. Don't stop to ask me questions: when something is unclear, decide, and list the decision in your hand-off.

### What "realistic" means in this brief

1. **Real light.** The hero is lit by the actual position of the sun over Winterthur right now: morning light, golden hour and, at night, warm lamplight.
2. **Real materials.** Olive leaves are dark green on top and silver underneath, and they flip in the wind. Tiles are glazed, so a highlight slides over them. Steam curls and rises, and sauces catch the light.
3. **Real physics.** Everything you can drag has mass, inertia and a spring. Nothing interactive moves on a linear tween. Things that fall bounce, and things that are set down cast a shadow first.
4. **Real food.** Only real photographs of the dishes. Never let a generative tool change the food, a portion or a plate. Motion is added on top of the photo, and the photo itself is never altered.

## 0. Skills, stack and tools

If you are Claude and these skills are installed, use them:

- `/threejs-fundamentals`, `/threejs-react-three-fiber`: the scene setup, one canvas tracking several DOM areas.
- `/threejs-shaders`: the olive-tree hero (instanced leaves, wind, the silver leaf flip, dappled shadows) and the "living photos" shader (depth parallax, steam, glisten).
- `/threejs-interaction`: the pointer or finger as a gust of wind, tapping an olive to drop it.
- `/threejs-animation`: the camera's slow breathing drift, and the olive's fall and bounce.
- `/gsap-scrolltrigger`, `/gsap-performance`: the pinned split-flap story, scroll-scrubbed text, the logo strip's scroll velocity.
- `/motion-framer`, `/apple-design`: the welcome slide, layout animations in the dish board, springs, drag with momentum, and the "served" plate landing.
- `/lottie-animations`: small dotLottie icons recoloured to the palette (phone, clock, calendar, map pin, envelope, olive branch, fork and knife, glass). They play on hover or tap.
- `/21st-ui`: components from 21st.dev (see section 2).
- `/animation-performance`, `/mobile-native`: the frame budget, and making it feel native on a phone.

Not Claude, or the skills aren't installed? Use the same libraries directly.

**Stack:** React + Vite + TypeScript + Tailwind + shadcn/ui + Motion, react-router, three.js through @react-three/fiber + drei (+ postprocessing on desktop only), GSAP ScrollTrigger, Lenis (smooth scroll, off for reduced motion), `suncalc`, @lottiefiles/dotlottie-react, and a small typed i18n dictionary. The output is a static build that deploys to a preview URL. If your platform has a fixed stack, use its nearest equivalent.

**Build-time tools:** `sharp` (AVIF/WebP at 480, 960, 1600 and 2400 px, plus a 24 px blurred placeholder per photo), Depth Anything V2 Small (Apache-2.0; for example `@huggingface/transformers` with `pipeline("depth-estimation", "onnx-community/depth-anything-v2-small")`) to write a depth map per photo, `potrace` to trace the logo's tree silhouette into an SVG mask, and Playwright to render the hero poster and run the checks.

**If you are Claude Code in the `3d-` repository:** build in `oliveira/`. The six supplied photos are already in `oliveira/media/supplied/`. Reuse the patterns in `donduarte/scripts/` (`extract_live.py`, `prepare_images.py`, `postbuild-routes.mjs`, `build-azulejos.mjs`, `build-artifact.mjs`). Follow `CLAUDE.md`: publish the preview as an Artifact with the permanent banner described in section 9.

## 1. Facts and content (source of truth: the live site)

The live site is small: one German page (https://www.oliveira-winterthur.ch/) with the anchors `#ueber-uns`, `#reservation` and `#kontakt`, plus an Impressum (https://www.oliveira-winterthur.ch/impressum-haftungsausschluss/). It has no menu, no prices, no opening hours, no map and no Instagram. **Don't invent any of these.** Build places for them that fill in once the owner sends the details (section 1.8). Before you build, open both pages and confirm that the texts below are still current. If they've changed, the live site wins; say so in the hand-off.

### 1.1 The restaurant

| Fact | Value (copy exactly) |
|---|---|
| Name | "Restaurante Oliveira" (logo and site title "Restaurante Oliveira Winterthur"). The Impressum says "Restaurant Oliveira" and the story says "OLIVEIRA". Use "Restaurante Oliveira" in running text. |
| Cuisine | Portugiesische & Schweizer Küche (as on the logo) |
| Address | Stationsstrasse 3, 8406 Winterthur (Winterthur-Töss), Schweiz |
| Phone | 044 730 71 71, shown as on the live site · link `tel:+41447307171` · international form +41 44 730 71 71 |
| Email | info@oliveira-winterthur.ch (`mailto:`) |
| Owner | Arlindo Oliveira, Inhaber (Impressum). The story names him Arlindo Ribeiro Oliveira, together with his wife Ekaterina. |
| Booking | MyLocalina, ID `e029b875-9b04-46d5-bc61-592b59f3d9e1` |
| Facebook | https://www.facebook.com/RestauranteOliveiraWinterthur/ |
| Footer | "Copyright © {current year} Restaurante Oliveira Winterthur" (the live footer shows the current year) |

### 1.2 Texts (German, from the live home page, verbatim apart from five typo fixes)

```text
[Navigation]  Über uns (#ueber-uns) · Online Reservation (#reservation) · Kontakt (#kontakt)
              mobile menu label: Menü

[Hero]        Bom apetite – en guete!
              Von BACALHAU bis Käseschnitte «Walliser Art»

[#ueber-uns]  Der Name «Oliveira» bedeutet Olivenbaum auf Portugiesisch und ist auch unser Familienname.
              Wir freuen uns, Sie in unserem Restaurant in Winterthur-Töss mit portugiesischen und
              Schweizer Speisen und Getränken verwöhnen zu dürfen.

              Bacalhau (Kabeljau) ist das Nationalgericht der Portugiesen und hat eine grosse historische,
              wirtschaftliche und kulturelle Bedeutung. Der Kabeljau ist der Hauptbestandteil unzähliger
              Rezepte, so wie eines unserer wechselnden Sonntagsmenüs mit Kichererbsen und Eiern.

              Arlindo Ribeiro Oliveira

              Portugal vai para Winterthur-Töss
              Der letzte Wirt des «Old Pullmann», Arlindo Oliveira, eröffnet zusammen mit seiner Frau
              Ekaterina im ehemaligen «Kafi Frosch» ihr neues Restaurant OLIVEIRA mit portugiesischer
              und Schweizer Küche.

              [button] Lageplan → #kontakt

[#reservation] [button] Online Reservation

[#kontakt]    Telefon · 044 730 71 71
              Adresse · Restaurante Oliveira, Stationsstrasse 3, 8406 Winterthur
              Email · info@oliveira-winterthur.ch

[Footer]      Stationsstrasse 3 · CH-8406 Winterthur · Schweiz · Facebook
              Quick links: Über uns · Kontakt · Impressum & Haftungsausschluss
              Reservationen · Telefon 044 730 71 71
              Copyright © {year} Restaurante Oliveira Winterthur
```

- **Typos fixed above** (list each one in the hand-off so the owner sees it): "sie" → "Sie", "Portugiesischen" → "portugiesischen", "Portugiesischer" → "portugiesischer", "Addresse" → "Adresse", "Resrervationen" → "Reservationen". The live heading writes "Bom apetite - en guete!" with a hyphen; set it with an en dash. Change nothing else.
- **Keep untranslated in every language:** the motto "Bom apetite – en guete!" (mark it up `<span lang="pt-PT">Bom apetite</span> – <span lang="gsw">en guete!</span>`), the heading "Portugal vai para Winterthur-Töss", the names «Old Pullmann», «Kafi Frosch» and «Walliser Art», dish names, the address and the phone number.
- **Impressum:** copy the German page verbatim (Kontaktadresse, Vertretungsberechtigte Personen: Arlindo Oliveira, Inhaber, Haftungsausschluss, Haftung für Links, Urheberrechte, Quelle). Translate it as a courtesy, with one line in each translation saying the German version is binding.
- Swiss German spelling throughout: "ss", never "ß". Quotation marks «…» in German, French and Italian.

### 1.3 Links to keep exactly

- **Online Reservation:** the live site loads `https://www.mylocalina.ch/script/widget.js` and calls `Localina.startBooking('e029b875-9b04-46d5-bc61-592b59f3d9e1', 'https://www.mylocalina.ch')`. The same booking opens directly at https://www.mylocalina.ch/widget/?id=e029b875-9b04-46d5-bc61-592b59f3d9e1. Use that URL in a drawer iframe, and fall back to a new tab if framing is blocked. Load either one only after a click.
- **Facebook:** https://www.facebook.com/RestauranteOliveiraWinterthur/
- **Email and phone:** as in 1.1.

### 1.4 Opening hours (not on the live site: provisional)

The live site publishes no hours. A directory listing (oeffnungszeitenbuch.de, updated April 2026) gives: **Monday closed · Tuesday–Thursday 10:00–22:00 · Friday–Saturday 10:00–23:00 · Sunday 10:00–18:00.** Sundays fit the live site's "wechselnde Sonntagsmenüs". Put these in `content/hours.json` with `"confirmed": false`. While the hours are unconfirmed:

- the live badge works, and shows a small line under it: "Zeiten provisorisch – bitte telefonisch bestätigen" (translated);
- leave opening hours out of the JSON-LD.

The owner confirms them by setting `"confirmed": true`.

### 1.5 Photos

#### A. The restaurant's own (from the live site's media library)

All files are under `https://www.oliveira-winterthur.ch/wp-content/uploads/2021/03/` unless the table says otherwise. These are the full-size originals; most are only 800 px wide, so don't stretch them beyond about 800 CSS px (on 2× screens, accept the softness or use them smaller).

| Id | File | What it shows | Use |
|---|---|---|---|
| logo | `oliveira-logo-210310-web-ba.png` (600×741) | The full logo on light: olive tree, "RESTAURANTE" arc, OLIVEIRA, "Portugiesische & Schweizer Küche", red script "Bom apetite!" | Header, intro, welcome slide |
| logo-dark | `oliveira-logo-210224-inv..png` (500×530, two dots in the name) | The logo with white type, for dark backgrounds | Dark sections, footer |
| wordmark | `oliveira-logo-text-white-02.png` (500×104) | The OLIVEIRA wordmark in white | Compact header on dark |
| ring | `oliveira-favicon.png` (600×600) | The green "O" ring | Favicon, divider handle, strip separator |
| own-01 | `Fk3cuwzJ4Yz9thpv63RdPE.jpg` (2001×1299) | Arlindo in the dining room (the live "Über uns" background) | Über uns, large |
| own-02 | `arlindo-oliveira-gino.jpg` | Arlindo at a table with his small dog (live alt text: "Arlindo Oliveira mit Gino") | Über uns |
| own-03 | `oliveira-aussen-001-web.jpg` (1920×1440) | The green façade with the OLIVEIRA sign, a church tower behind | Story finale, Kontakt (living photo) |
| own-04 | `restaurante-oliveira-bacalhau-01.jpg` | Bacalhau with chickpeas, egg, carrots and potatoes (the Sunday menu the story describes) | Divider, Portugal side |
| own-05 | `oliveira-käseschnitte.jpg`, URL-encoded as `oliveira-ka%CC%88seschnitte.jpg` (the "ä" is decomposed) | Käseschnitte «Walliser Art» with a fried egg, gherkins and pickled onions | Divider, Schweiz side |
| own-06 | `oliveira-caldo-verde-003.jpg` (1920×1053); `-002`, `-004`, `-005`, `-005-1` and `-005-2` are crops of the same shot | Caldo verde with chouriço, wine and coffee behind | Living photo with steam |
| own-07 | `restaurante-oliveira-francesinha-01.jpg` | Francesinha with fries | Küche, gloss |
| own-08 | `restaurante-oliveira-gegrillter-octopus-01.jpg` | Grilled octopus with lemon and potatoes | Küche |
| own-09 | `restaurante-oliveira-pasteis-bacalhau-01.jpg` | Pastéis de bacalhau with fries and salad | Küche |
| own-10 | `pastel-de-nata.jpg` (1920×1280) | Pastéis de nata with coffee. The live background `restaurante-oliveira-hintergrundbild.jpg` is a faded copy of it. | Desserts, coffee moment |
| own-11 | `pastel-de-nata-1.jpg` | Three pastéis de nata on burlap | Desserts |
| own-12 | `restaurante-oliveira-pasta-01.jpg` | Spaghetti in a creamy sauce with peas | Küche |
| own-13 | `oliveira-salat-005.jpg` | Mixed salad | Küche |
| own-14 | `oliveira-fleisch-002.jpg` | Braised meat on the bone with peas, carrots and mash | Küche |
| own-15…20 | `restaurante-oliveira-tagesmenue-01.jpg` … `-06.jpg` | 01 chicken wings, fries, salad · 02 meat skewers with pineapple, rice and potatoes · 03 prawns with fries · 04 fried calamari rings with lemon · 05 a golden filled roll with salad and corn · 06 sliced roast in gravy with potatoes and greens | "Tagesmenü" strip (the restaurant's own file names) |
| own-21 | `/wp-content/uploads/2022/07/Superbock.jpg` | A Super Bock bottle on the table | Drinks, strip |

**Never use:** the images that came with the WordPress template (`foodiesfeed.com_*`, `fooodiesfeed.com_*`, `1000x1000-*`, `1000x1200-*`, `1080x1080-*`, `1920x1080-*`, `img-1/2/3.jpg`, `25388788904_72d2f5ec6f_z.jpg`, `Vintage-Logo.png`), the template icons (`icon-*-3.png`; use Lottie icons instead), `weiss.png`, and `oliveira-login-bg.jpg` (an olive grove at sunset; probably stock, so use it only if the owner confirms it's theirs).

#### B. Supplied with this brief (in `oliveira/media/supplied/`, or attached)

| Id | File | Size | What it shows | Use |
|---|---|---|---|---|
| sup-01 | `supplied-01-pastel-de-nata-azulejo.jpg` | 941×1672 | Pastéis de nata on a blue-and-white plate, an azulejo sign "Pastel de Nata · Portugal", coffee | Portrait hero slide on phones, desserts |
| sup-02 | `supplied-02-grelhada-mista-peixe-marisco.jpg` | 1024×1024 | Mixed grill of fish and seafood: sea bream, sardines, prawns, squid, octopus, lemon | Portugal side, gallery, heat shimmer |
| sup-03 | `supplied-03-polvo-batatas-colorau.jpg` | 600×797 | Octopus with potatoes, olive oil and paprika | Cards only: never wider than 600 px (a faithful 2× upscale is allowed, then check it by eye) |
| sup-04 | `supplied-04-frango-arroz-batatas-salada.jpg` | 1200×1600 | Grilled chicken with rice, fries and salad on a terracotta plate, on a tiled tablecloth | Küche, gallery; the tablecloth inspires the tile palette |
| sup-05 | `supplied-05-pasteis-de-bacalhau.jpg` | 828×826 | Pastéis de bacalhau with parsley | Küche, gallery |
| sup-06 | `supplied-06-francesinha.jpg` | 1200×1600 | Francesinha with egg and sauce, fries, a beer | Küche, gloss on the sauce |

- A seventh supplied photo, a caldo verde, carries the watermark of the food blog *Food and Journeys*. It is their photo. **Don't use it, and don't crop or retouch the watermark out.** The restaurant has its own caldo verde (own-06), which is better anyway.
- Until the owner confirms that a supplied photo shows Oliveira's own food, it carries a small, quiet label in the photo corner: "Symbolbild" · "Imagem ilustrativa" · "Illustrative photo" · "Immagine illustrativa" · "Photo d'illustration". Keep a flag `illustrative: true` in `content/photos.json`; the owner turns it off per photo.

#### Rules for every photo

- Every photo in A and B (27 in all) appears somewhere on the new site, at least in the gallery wall.
- Serve AVIF with a WebP fallback through `<picture>` with `srcset`. Every photo starts as its blurred 24 px placeholder and crossfades to the full image (opacity only).
- Write alt text for every photo in all five languages (the live site has almost none). Describe what is on the plate; don't sell.
- Allowed edits: crop, exposure, white balance, the faithful upscale for sup-03. Not allowed: generative fill, "AI enhance" that redraws food, removing watermarks or signs.

### 1.6 The dishes we can show: `content/dishes.json`

There is no menu on the live site, so the "Küche" board shows **dishes, not a menu**: name, photo, short description, cuisine tag, and **no price**. Under the board: "Aktuelle Karte, Tagesmenü und Preise: 044 730 71 71" (translated), with a call button.

```jsonc
{
  "id": "bacalhau",
  "name": "Bacalhau",                       // dish names stay as written in every language
  "cuisine": "pt",                          // "pt", "ch" or null (neither: shows under "Alle" only)
  "desc": { "de": "…", "pt": "…", "en": "…", "it": "…", "fr": "…" },  // only what the photo or the live text shows
  "photos": ["own-04"],
  "source": "live-text",                    // "live-text", "own-photo" or "supplied"
  "onMenu": true,                           // false or "unconfirmed" for supplied dishes until the owner says so
  "price": null                             // stays null until the owner sends the menu
}
```

- **Portugal:** Bacalhau (with chickpeas and eggs, one of the changing Sunday menus, as the story says), Caldo verde, Francesinha, Polvo grelhado, Pastéis de bacalhau, Pastel de nata, Super Bock. From the supplied photos, all `onMenu: "unconfirmed"`: grelhada mista de peixe e marisco, polvo com batatas, frango with rice, fries and salad.
- **Schweiz:** Käseschnitte «Walliser Art».
- **Neither (`null`):** pasta, salad, the braised meat dish, and the six Tagesmenü photos (a strip of their own, captioned only with what is on the plate).
- Write descriptions only from what the photo or the live text shows. No prices, no "homemade", no "award-winning", no origin claims.

### 1.7 Pages and URLs

| Page | Deutsch (default) | Português | English | Italiano | Français |
|---|---|---|---|---|---|
| Home | /de/ | /pt/ | /en/ | /it/ | /fr/ |
| Küche | /de/kueche | /pt/cozinha | /en/kitchen | /it/cucina | /fr/cuisine |
| Impressum | /de/impressum | /pt/aviso-legal | /en/legal-notice | /it/note-legali | /fr/mentions-legales |
| Datenschutz | /de/datenschutz | /pt/privacidade | /en/privacy | /it/privacy | /fr/confidentialite |

- On the home page in every language, keep the anchor ids `ueber-uns`, `reservation` and `kontakt` (in German) so old links still land.
- `/` sends visitors to their saved language, else the browser's, else German. `x-default` points to /de/. Redirect `/impressum-haftungsausschluss/` to /de/impressum.
- **Datenschutz:** the live site has none, but the new site embeds a map and a booking widget, and Swiss data-protection law (revDSG) expects a privacy notice. Draft one, label the page "Entwurf – vom Inhaber zu prüfen", and list it as an open question.

### 1.8 Open questions for the owner (don't guess; list them in the hand-off)

1. Are the opening hours in 1.4 right?
2. Can you send the current menu (Speisekarte, Tagesmenü, Sonntagsmenü, drinks) with prices? Until then the site shows dishes without prices. Six of your photos are named "tagesmenue": is there a daily menu, and may the site say so?
3. The six supplied photos: where are they from, may the site use them, and do they show Oliveira's own food? sup-01 to sup-03 look like stock or AI-generated images, and sup-05 looks like a food-blog photo. Photos from Google reviews belong to the reviewers.
4. Are the supplied dishes (mixed fish and seafood grill, octopus with potatoes, chicken plate) on your menu?
5. Is there a vector logo (SVG/AI/PDF), and are there larger originals of the 800 px photos?
6. Is the olive-grove photo (`oliveira-login-bg.jpg`) yours?
7. Is there an Instagram account?
8. Who reviews the privacy notice draft?
9. Are the five typo fixes in 1.2 all right?
10. Who proofreads the Portuguese, English, Italian and French texts?

## 2. Inspiration (10 minutes at most, then build)

- **21st.dev:** look for a before/after comparison slider (the Portugal | Schweiz divider), a split-flap or flip-text display, an infinite draggable image wall, 3D tilt cards with glare, magnetic buttons, a scroll-velocity marquee, animated tabs, text reveals and a language selector. Restyle everything to the palette.
- **motionsites.ai:** borrow ideas for the hero entrance, text reveals and scroll scenes. Take the motion, not its dark-SaaS look. Use only free items or items I hold a licence for.
- **Real-world references:** dappled light under olive trees, Swiss railway split-flap boards, glazed azulejo panels, steam over a soup bowl filmed against a dark background.

Adapt, don't clone.

## 3. Design direction

- **Concept:** "Oliveira: a tree with roots in Portugal, at home in Winterthur." Olive-grove sunlight, a white linen table, blue-and-white tiles on the Portuguese side, warm wood and melting cheese on the Swiss side. (The concept guides the design; it isn't copy for the site.)
- **Palette** (sampled from the logo and the live site; contrast checked on the background it's used on):

| Role | Hex | Use |
|---|---|---|
| Oliveira green | `#4AA400` | The logo green: graphics, primary button with charcoal text (5.0:1), the "O" ring |
| Leaf dark | `#3E6B1F` | Green text on cream (5.6:1) |
| Leaf light | `#84C054` | Highlights, sunlit leaves |
| Silver leaf | `#A9B39B` | Olive-leaf undersides, fine lines, muted text on charcoal (7.3:1) |
| Bark | `#483C3C` | Deep brown accents, the trunk |
| Charcoal | `#1F2229` | Dark sections (the live site's dark) |
| Linen | `#F6F1E7` | Light sections, the welcome panel, the hero tablecloth |
| Apetite red | `#ED1B2E` | The motto and large accents only (3.9:1 on linen: large text only) |
| Apetite red, text | `#B0121F` | Red text on linen (6.3:1) |
| Azulejo cobalt | `#1E4FA3` | The Portugal side, tiles (6.9:1 on linen) |
| Walliser gold | `#E8B04A` | The Schweiz side, melted-cheese highlights (8.1:1 on charcoal) |

- **Type:** Fraunces (variable: weight, optical size, and the SOFT and WONK axes) for headings and the welcome word; animate SOFT and weight slightly on scroll and hover so headlines feel warm and alive. Instrument Sans for text. A brush script close to the logo's red "Bom apetite!" (for example Caveat Brush) only for the motto and the "Arlindo Ribeiro Oliveira" signature. All three must cover ã, ç, é, è, à, ä, ö, ü and « ».
- **Layout:** big type, big photos, full-bleed sections alternating linen and charcoal, generous spacing. The header is sticky and shrinks on scroll; as it does, the logo's tree morphs into the green "O" ring.
- **Texture:** film grain (one 256 px noise tile at 3 % opacity on a fixed layer, translated by random steps 8 times a second, transform only). A faint linen weave on light sections and a faint azulejo line pattern on Portugal moments, each at 5 % opacity at most.
- **Shadows:** layered, soft and slightly warm; never a single hard box-shadow. Anything that is "set down" (cards, plates, tiles) gets a contact shadow plus a wider ambient one.

## 4. Signature scenes

These carry the "realistic" brief. Build them with care, and give each a static fallback that still looks good.

### 4.1 Logo intro: the tree grows (first visit of a session, ≤ 1.6 s, skippable)

The page opens on linen. The logo's olive tree is revealed from the trunk upward (an SVG mask traced from the PNG with potrace, or a `clip-path` wipe; never redraw the logo), a handful of olive leaves blow across, OLIVEIRA rises letter by letter, and the red "Bom apetite!" fades in. Then the panel slides away to the left to reveal the hero. This is the same component as the welcome slide (section 6), with `intro`. A click, a tap or Esc skips it. With reduced motion it's a 0.2 s fade.

### 4.2 Hero: lunch under the olive tree (WebGL, lazy-loaded)

A sunny table under an olive tree. The canopy fills the top of the frame, a linen tablecloth fills the bottom, and the leaves' shadows play across the cloth, behind the headline "Bom apetite – en guete!" and the line "Von BACALHAU bis Käseschnitte «Walliser Art»". Calls to action: Online Reservation, Anrufen, Lageplan. The live hours badge sits beside them.

- **The tree:** procedural, so no licence is needed. A gnarled, twisting trunk (a tube along a curve with noise in its radius, triplanar bark normals), 3 levels of branches, and instanced lanceolate leaves (about 8,000 on desktop, about 3,000 on phones) with clusters of olives from green to near-black. Use MeshStandardMaterial with `onBeforeCompile` (or a TSL node material) so the leaves keep real lighting and shadows. Inject the sway in the vertex stage and choose the colour with `gl_FrontFacing`: dark olive on top, silver `#A9B39B` underneath. Give the leaves a `customDepthMaterial` with the same sway, so the shadows move with the leaves.
- **Wind:** every leaf sways on its own phase, with slow gusts from noise over time and position. The pointer (or a finger) is a gust: its speed sends a wave through the canopy that flips the leaves it passes up to about 160° around their midrib, so a **silver ripple** runs through the tree and settles back with a spring. A visible "Wind" button (also Space while the hero is focused) sends a gust for keyboard and screen-reader users.
- **Real sun:** `suncalc` gives the sun's position over Winterthur-Töss for the visitor's current time (starting point below). Above 6° elevation it's day (a warm white sun, crisp shadows). Between −6° and 6° it's golden hour (`#FFB46B`, long soft shadows, light shafts through the leaves on desktop). Below −6° it's night: no sun, warm lamplight `#FFA65C` from low at the side, a cool sky ambient, and the cloth glows. `?sun=2026-06-21T20:45` overrides the time for testing.
- **Olives:** tap or click an olive and it drops with gravity, bounces twice on the cloth with a small contact shadow, and rolls out of frame. Each olive can drop once per visit. This is decoration only.
- **Camera:** a slow breathing drift, pointer parallax of ±2°, and device tilt on phones (iOS needs a tap on "Bewegung aktivieren" to ask permission). Depth of field on far leaves on desktop only.
- **Poster:** render the scene at build time with Playwright (in day light) to an AVIF of 120 KB or less. That poster is what paints first (the LCP image). The canvas loads after first paint, fades in over it once its first frame is ready, and the poster stays visible if WebGL fails, with reduced motion, with Save-Data, or on weak devices. The poster gets a CSS fallback: the leaf-shadow layer drifts slowly over it.

Starting point for the sun:

```ts
// sun.ts
import SunCalc from "suncalc";

const LAT = 47.49, LNG = 8.71; // Winterthur-Töss: close enough for the sun. Geocode the exact address for the map pin.

export function sunAt(date = new Date()) {
  const { altitude, azimuth } = SunCalc.getPosition(date, LAT, LNG); // radians; azimuth from south, positive towards west
  const elevation = (altitude * 180) / Math.PI;
  const phase = elevation > 6 ? "day" : elevation > -6 ? "golden" : "night";
  // Direction towards the sun in three.js space (y up, +z south, +x east)
  const dir: [number, number, number] = [
    -Math.sin(azimuth) * Math.cos(altitude),
    Math.sin(altitude),
    Math.cos(azimuth) * Math.cos(altitude),
  ];
  return { elevation, phase, dir } as const;
}
```

### 4.3 "Von Bacalhau bis Käseschnitte": the Portugal | Schweiz divider

A full-width scene with two living photos (4.4) on top of each other: **Bacalhau** (own-04, Portugal, cobalt and azulejo light, steam) on the left and **Käseschnitte «Walliser Art»** (own-05, Schweiz, gold and warm wood, glisten on the cheese and yolk) on the right. The handle is the green "O" ring on a linen disc.

- Dragging moves the divider with momentum and a spring that snaps to 0 %, 50 % and 100 %. Where supported, a 10 ms vibration marks each snap.
- At 0 % or 100 %, a button appears: "Ganz Portugal" or "Ganz Schweiz" (translated). It opens the Küche board filtered to that side.
- Labels: Portugal · Schweiz (Portugal · Suíça · Switzerland · Svizzera · Suisse). Under the Portugal side, the live Bacalhau paragraph. Under the Schweiz side, only the dish name: there is no live text for it, so don't write one.
- The handle is a slider (`role="slider"`, `aria-valuenow`): ← and → move it by 10 %, and Home and End jump to the ends.

### 4.4 Living photos (the realism system for food photos)

Food photos aren't flat images here: they sit in a shared WebGL layer that tracks their `<img>`. The `<img>` stays in the DOM for SEO, accessibility and fallback.

- **Depth parallax:** a depth map per photo (Depth Anything V2, made at build time and committed). The pointer, or the phone's tilt, shifts near things more than far things: about 1.2 % of the width at most, smoothed with a spring.
- **Steam:** two layers of curling, rising noise inside a painted mask (soups, bacalhau, the grill, coffee). Subtle, never cartoon smoke.
- **Glisten:** a soft highlight that slides over the wet surfaces painted in a gloss mask (sauce, yolk, olive oil, melted cheese) as the light follows the pointer.
- **Heat shimmer:** a faint refraction above the mixed grill (sup-02) only.
- **Performance:** at most two WebGL contexts on the whole site: one for the hero, and one shared by all living photos (drei `<View>` or scissoring). Never one context per photo. Only photos in view animate, two at most at once. Cap the device pixel ratio at 1.5. Render on demand, and stop when the tab is hidden.
- **Fallback:** the plain `<img>`, which is also what reduced motion, Save-Data and missing WebGL get.

Starting point for the shader:

```glsl
// livingPhoto.frag (three.js ShaderMaterial; textures use SRGBColorSpace)
uniform sampler2D uPhoto;
uniform sampler2D uDepth;   // Depth Anything map, white = near
uniform sampler2D uMasks;   // R = where steam may rise, G = what glistens
uniform vec2  uPointer;     // -1..1, spring-smoothed pointer or device tilt
uniform vec2  uLight;       // highlight position in uv; trails the pointer
uniform float uTime;
uniform float uParallax;    // about 0.012; 0 with reduced motion
uniform float uSteam;       // 0..1 per photo; 0 with reduced motion
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = (vUv - 0.5) / 1.04 + 0.5;                // 4 % overscan hides the edges when shifting
  float depth = texture2D(uDepth, uv).r;
  uv += uPointer * (depth - 0.5) * uParallax;         // near moves more than far
  vec3 col = texture2D(uPhoto, uv).rgb;
  vec4 m = texture2D(uMasks, vUv);

  vec2 p = vec2(vUv.x * 3.0, vUv.y * 2.0 - uTime * 0.07);           // rises (vUv.y = 1 is the top)
  float s = fbm(p + 1.5 * fbm(p * 1.3 + vec2(0.0, -uTime * 0.04)));  // curl it
  s = smoothstep(0.52, 0.85, s) * m.r * uSteam;
  col = mix(col, vec3(0.97), s * 0.22);

  float g = pow(max(0.0, 1.0 - distance(vUv, uLight) * 2.2), 5.0) * m.g;
  col += g * 0.14;

  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
```

**Optional, AI cinemagraphs:** if you have an image-to-video tool (for example Higgsfield, Runway, Kling or Veo), you may make 4–6 s seamless loops from the restaurant's **own** hero photos, but only with steam, a shift of light, or a slow camera push. The food, the plate and the portion must stay exactly as photographed: reject any clip where they change. Encode H.264 plus AV1 or VP9 at 1.5 MB or less, muted, `playsinline`, looping, with the photo as the poster. Never play them with reduced motion or Save-Data. Mark them as generated in the hand-off. The shader version is the default; these are a bonus.

### 4.5 Über uns: "Old Pullmann → Kafi Frosch → OLIVEIRA" (pinned scroll story)

The story section pins while you scroll. A **Swiss-railway split-flap board** (a nod to Stationsstrasse and the «Old Pullmann») flips from `OLD PULLMANN` to `KAFI FROSCH` to `OLIVEIRA`. Each flap falls with real hinge physics: it accelerates, overshoots slightly, shows a shadow on the lower half and settles. The story text lights up word by word as you scroll. "Arlindo Ribeiro Oliveira" writes itself as a signature. The scene ends on the façade photo (own-03) as a living photo, and the logo's tree grows out of the "O".

- Use only the names and sentences from 1.2: no dates, no invented history.
- Photos: own-01 large with slow parallax, own-02 as a framed photo that tilts slightly toward the pointer.
- Reduced motion: the three names side by side with arrows, the text plain, the signature static.
- It is fully readable without the effect, including the text in the DOM.

### 4.6 "Served": dish cards that land like plates

When the dish cards (home teaser and Küche board) enter the view, they slide in from the edge as if a waiter set them down. A shadow appears on the "table" first, then the card lands with a small spring overshoot (about 0.35 s each, staggered by 60 ms, at most 0.4 s in total). On hover or focus the card tilts toward the pointer with a moving glare. Tapping a card opens its detail with a **View Transition**: the photo morphs from the card into the detail view (Motion `layoutId` where View Transitions aren't supported).

### 4.7 Gallery: the azulejo wall

An endless wall of blue-and-white tiles, generated procedurally (in the repo: reuse `donduarte/scripts/build-azulejos.mjs`). Each tile is a glazed 3D slab with a visible edge, and a specular highlight slides across the glaze as the pointer moves. Hovering, focusing or tapping a tile flips it on its edge to reveal a photo. Every one of the 27 photos sits behind at least one tile. The wall drags in any direction with inertia. A click opens a swipeable lightbox with captions and the "Symbolbild" label where it applies. Build it with CSS 3D and Motion, not WebGL.

## 5. Motion and interaction

### Motion

| Moment | What the visitor sees | Use | Budget |
|---|---|---|---|
| Logo intro | The tree grows (4.1) | Motion | ≤ 1.6 s, once per session, skippable |
| Hero entrance | The poster paints first; the canvas fades in; the headline's letters rise on a spring while Fraunces' SOFT axis warms; the CTAs land last | Motion | Readable at 0 s |
| Logo strip | Endless strip: "O" ring · Bom apetite – en guete! · Bacalhau · Käseschnitte «Walliser Art» · Caldo verde · Francesinha · Pastel de nata · Polvo · Super Bock · Portugal vai para Winterthur-Töss · Winterthur-Töss. It speeds up with scrolling and reverses with scroll direction. | 21st.dev marquee + Motion | Pauses on hover; pause button |
| Split-flap story | 4.5 | `/gsap-scrolltrigger` | Fully readable without it |
| Served cards | 4.6 | Motion | Stagger ≤ 0.4 s in total |
| Reveals and page changes | Sections fade and rise into place; pages change with a short linen wipe (≤ 0.4 s). The full welcome slide is only for language changes. | Motion, View Transitions | ≤ 0.4 s |
| Header | Shrinks on scroll; the tree morphs into the "O" ring | Motion | Transform only |
| Lottie icons | Phone, clock, calendar, map pin, envelope, olive branch, fork and knife, glass play on hover or tap | `/lottie-animations` | Small dotLottie files |
| Film grain | Section 3, Texture | CSS | Off with reduced motion |

### Interaction (the visitor drives it)

| Interaction | What the visitor does and sees | Touch | Keyboard | Reduced motion |
|---|---|---|---|---|
| Olive-tree hero | Moves the pointer to send a gust: a silver ripple runs through the leaves. Taps an olive and it falls, bounces and rolls away. | Drag to gust; tap an olive; tilt the phone | "Wind" button / Space | Poster, still |
| Portugal \| Schweiz divider | Drags the "O" handle between Bacalhau and Käseschnitte; it snaps with a spring; at the ends it offers the filtered board | Drag | Slider: ← → Home End | No spring, no steam |
| Living photos | Moves the pointer or tilts the phone: depth parallax, steam, glisten | Tilt (after permission) | Decorative: nothing needed | Plain `<img>` |
| Language chooser | Section 6: each button flips to its welcome word; a click plays the welcome slide | Tap | Tab, Enter | Fade |
| Küche board | Toggles Portugal / Schweiz / Alle and the cards rearrange with layout animation; sticky tabs with a sliding underline; instant search; a card opens its detail with the photo morph | Tap | Tab, Enter, Esc | No reflow animation |
| Azulejo wall | Drags the wall with inertia; tiles flip to photos; a click opens the lightbox | Drag, tap, swipe | Arrows move, Enter opens, a "Als Raster" toggle | Plain grid |
| Reserve and call | Magnetic "Online Reservation", "Anrufen" and "E-Mail" buttons with a ripple. "Online Reservation" opens MyLocalina in a drawer (or a new tab). "E-Mail" opens mail and offers "Adresse kopieren" with a toast. | Tap | Tab, Enter; Esc closes the drawer | No drawer animation |
| Live hours badge | "Geöffnet · schliesst in 35 Min." or "Geschlossen · öffnet Dienstag um 10:00", computed in Europe/Zurich time from `hours.json`, with a pulsing dot and the provisional line (1.4) | Nothing to do | Plain text | No pulse |
| Lageplan | Shows a stylised map card with the pin dropping onto Stationsstrasse 3; the real OpenStreetMap loads only on click; route links open Google Maps and Apple Maps | Tap | Enter | No pin drop |
| Cursor follower | On desktop, a small olive-green ring follows the pointer with a spring and shows a word over interactive things ("Ziehen", "Ansehen", "Reservieren") | Off | Off | Off |
| Sound (optional) | Off by default; a footer toggle turns on a soft split-flap clack and a quiet leaf rustle on gusts, both generated with Web Audio | Tap | Enter | Unchanged (sound is opt-in) |

Rules:

- Every interaction has a touch way and a keyboard way. Nothing essential sits only behind hover or drag: every text, dish and photo is reachable by everyone. Phones have no hover.
- `prefers-reduced-motion`: crossfades instead of slides, no parallax, no smooth scroll, still shaders, no grain, no falling olives.
- Animate `transform` and `opacity` only (shaders aside). Aim for 60 fps on a mid-range phone, checked with 4× CPU throttling.
- Anything that moves for more than five seconds (the logo strip, the hero wind) gets a visible pause control; the hero's pause also freezes the wind.
- At most two WebGL contexts (4.4). Lazy-load all 3D after first paint, pause it off-screen and when the tab is hidden, and give each scene its static fallback.
- Keep the normal cursor visible; the follower is decoration only.
- Content is readable before any animation finishes, and the skip controls work at any moment.

## 6. Languages, the home-page chooser and the welcome slide

- German is the default, with the routes in 1.7. Remember the visitor's choice (wrap storage in try/catch).
- **On the home page itself**, right under the hero: a language chooser with five big buttons in native names: Deutsch · Português · English · Italiano · Français. Hovering or focusing a button flips it to show its welcome word; the current language is marked. Clicking one plays the welcome slide and switches the whole site.
- A compact switcher in the header and the footer of every page as well. Native names, no flags. Switching keeps the visitor on the same page and section.
- The live texts exist only in German. Translate everything else into pt-PT ("ementa", not "cardápio"), English, Italian and French: alt text, page titles, meta descriptions and the Impressum (as a courtesy). Section 1.2 lists what never changes.
- `hreflang` links on every page; `<html lang>` = `de-CH`, `pt-PT`, `en`, `it`, `fr`.

### The welcome slide

Every time the visitor changes language, from the chooser or a switcher, a linen panel slides over the whole screen. The logo slides in across it while a few olive leaves blow past, the big word rises letter by letter with the small line under it, and the motto appears in red script. The language switches while the screen is covered, then the panel slides away to reveal the same page, translated.

| Language | Big word | Small line | Under it (every language) |
|---|---|---|---|
| Deutsch | Willkommen | im Restaurante Oliveira | Bom apetite – en guete! |
| Português | Bem-vindos | ao Restaurante Oliveira | Bom apetite – en guete! |
| English | Welcome | to Restaurante Oliveira | Bom apetite – en guete! |
| Italiano | Benvenuti | al Restaurante Oliveira | Bom apetite – en guete! |
| Français | Bienvenue | au Restaurante Oliveira | Bom apetite – en guete! |

Timeline, about 1.9 s:

| Time | What happens |
|---|---|
| 0–0.40 s | The panel slides in from the right and covers the screen. The chooser and the switchers stop taking clicks. |
| 0.40 s | Screen covered: switch the language, the URL (same page, other language), `<html lang>` and the saved choice. |
| 0.40–1.25 s | The logo springs in from the left and settles in the centre; leaves blow across; the big word rises letter by letter; the small line and the motto fade up. |
| 1.25–1.50 s | Hold. |
| 1.50–1.95 s | The panel and the logo slide out to the left, revealing the translated page. |

- A click, a tap or Esc skips straight to the reveal (the language still switches).
- Reduced motion: no sliding. The panel fades in (0.2 s), the language switches, the panel fades out (0.25 s).
- The first visit of a session plays the `intro` variant (4.1) in the current language, once.
- The overlay sits above the header and both WebGL layers. The logo is on linen, so keep it readable.

Starting point (adapt it to your setup):

```tsx
// WelcomeSlide.tsx
import { stagger, useAnimate, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

export type Lang = "de" | "pt" | "en" | "it" | "fr";

export const HTML_LANG: Record<Lang, string> = { de: "de-CH", pt: "pt-PT", en: "en", it: "it", fr: "fr" };

export const WELCOME: Record<Lang, { word: string; line: string }> = {
  de: { word: "Willkommen", line: "im Restaurante Oliveira" },
  pt: { word: "Bem-vindos", line: "ao Restaurante Oliveira" },
  en: { word: "Welcome", line: "to Restaurante Oliveira" },
  it: { word: "Benvenuti", line: "al Restaurante Oliveira" },
  fr: { word: "Bienvenue", line: "au Restaurante Oliveira" },
};

const EASE = [0.76, 0, 0.24, 1] as const;
const LEAF = "M1 8C9 1 25 0 39 4 27 12 11 14 1 8Z"; // a narrow olive leaf, 40 × 14

type Props = {
  lang: Lang;            // the language being switched to
  logoSrc: string;       // oliveira-logo-210310-web-ba.png
  onCovered: () => void; // switch language + route here, while the page is hidden
  onDone: () => void;    // unmount the overlay
  intro?: boolean;       // first visit: the panel is already up and the tree grows instead
};

export function WelcomeSlide({ lang, logoSrc, onCovered, onDone, intro = false }: Props) {
  const [scope, animate] = useAnimate();
  const reduce = useReducedMotion();
  const covered = useRef(false);
  const finished = useRef(false);
  const { word, line } = WELCOME[lang];

  const cover = () => {
    if (!covered.current) {
      covered.current = true;
      onCovered();
    }
  };
  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    cover();
    onDone();
  };

  useEffect(() => {
    let alive = true;
    const run = async () => {
      if (reduce) {
        if (!intro) await animate(scope.current, { opacity: [0, 1] }, { duration: 0.2 });
        cover();
        await animate(scope.current, { opacity: 0 }, { duration: 0.25, delay: 0.3 });
      } else {
        if (!intro) await animate(scope.current, { x: ["100%", "0%"] }, { duration: 0.4, ease: EASE });
        cover();
        // The leaves aren't awaited: they leave with the panel.
        animate(".ws-leaf", { x: ["-15vw", "115vw"], y: [0, -40], rotate: [-30, 260] },
          { duration: 0.9, ease: [0.3, 0.1, 0.3, 1], delay: stagger(0.04) });
        await Promise.all([
          intro
            ? animate(".ws-logo", { clipPath: ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"], y: [24, 0] },
                { duration: 0.7, ease: [0.22, 1, 0.36, 1] })
            : animate(".ws-logo", { x: ["-35vw", "0vw"], rotate: [-6, 0], opacity: [0, 1] },
                { type: "spring", bounce: 0.25, duration: 0.6 }),
          animate(".ws-letter", { y: ["110%", "0%"] },
            { duration: 0.35, delay: stagger(0.03, { startDelay: 0.12 }) }),
          animate(".ws-line", { opacity: [0, 0.85], y: [12, 0] }, { duration: 0.4, delay: 0.3 }),
          animate(".ws-motto", { opacity: [0, 1], y: [10, 0] }, { duration: 0.4, delay: 0.45 }),
        ]);
        await animate(scope.current, { x: "-100%" }, { duration: 0.45, ease: EASE, delay: 0.25 });
      }
      if (alive) finish();
    };
    run();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      alive = false;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hidden = (cls: string) => (reduce ? cls : `${cls} opacity-0`); // reduced motion never animates these in

  return (
    <div
      ref={scope}
      role="status"
      aria-live="polite"
      onClick={finish}
      className="fixed inset-0 z-[100] grid cursor-pointer place-items-center overflow-hidden bg-[var(--linen)] text-[var(--leaf-dark)]"
      style={reduce ? { opacity: intro ? 1 : 0 } : { transform: intro ? "none" : "translateX(100%)" }}
    >
      <span className="sr-only" lang={HTML_LANG[lang]}>{`${word} ${line}`}</span>
      {!reduce &&
        Array.from({ length: 7 }, (_, i) => (
          <svg key={i} aria-hidden="true" viewBox="0 0 40 14"
            className="ws-leaf absolute left-0 w-10 fill-[var(--leaf-dark)]"
            style={{ top: `${14 + i * 11}%`, opacity: 0.55 + (i % 3) * 0.15, transform: "translateX(-15vw)" }}>
            <path d={LEAF} />
          </svg>
        ))}
      <div aria-hidden="true" className="flex flex-col items-center gap-4 px-6 text-center">
        <img className="ws-logo w-[min(46vw,300px)]" src={logoSrc} alt=""
          style={intro && !reduce ? { clipPath: "inset(100% 0% 0% 0%)" } : undefined} />
        <p lang={HTML_LANG[lang]} className="overflow-hidden font-display text-5xl leading-none md:text-7xl">
          {[...word].map((ch, i) => (
            <span key={i} className="ws-letter inline-block"
              style={reduce ? undefined : { transform: "translateY(110%)" }}>{ch}</span>
          ))}
        </p>
        <p lang={HTML_LANG[lang]} className={hidden("ws-line text-lg md:text-2xl")}>{line}</p>
        <p className={hidden("ws-motto font-script text-2xl text-[var(--apetite-text)] md:text-3xl")}>
          <span lang="pt-PT">Bom apetite</span> – <span lang="gsw">en guete!</span>
        </p>
      </div>
    </div>
  );
}
```

```tsx
// In the layout (--linen: #F6F1E7; --leaf-dark: #3E6B1F; --apetite-text: #B0121F)
const [pending, setPending] = useState<Lang | null>(null);

function requestLanguage(next: Lang) {
  if (pending || next === currentLang) return; // ignore clicks while the slide runs
  setPending(next);
}

{pending && (
  <WelcomeSlide
    key={pending}
    lang={pending}
    logoSrc={logoUrl}
    onCovered={() => applyLanguage(pending)} // same page in `pending`, <html lang>, saved choice
    onDone={() => setPending(null)}
  />
)}
```

For the first-visit intro, render `<WelcomeSlide intro lang={currentLang} onCovered={() => {}} … />` once when `sessionStorage` has no `welcomed` flag, then set the flag (in try/catch). Render it in the first paint, so the page never flashes before it.

### The home-page chooser, starting point

```tsx
// LanguageChooser.tsx (home page, right under the hero)
import { HTML_LANG, WELCOME, type Lang } from "./WelcomeSlide";

const LANGS: { code: Lang; label: string }[] = [
  { code: "de", label: "Deutsch" },
  { code: "pt", label: "Português" },
  { code: "en", label: "English" },
  { code: "it", label: "Italiano" },
  { code: "fr", label: "Français" },
];

export function LanguageChooser({ current, onPick }: { current: Lang; onPick: (lang: Lang) => void }) {
  return (
    <nav aria-label="Sprache · Língua · Language · Lingua · Langue" className="py-10">
      <ul className="flex flex-wrap justify-center gap-3">
        {LANGS.map(({ code, label }) => (
          <li key={code}>
            <button
              type="button"
              lang={HTML_LANG[code]}
              aria-current={code === current ? "true" : undefined}
              onClick={() => onPick(code)}
              className="group relative h-14 min-w-40 overflow-hidden rounded-full border border-current px-7 text-lg aria-[current=true]:bg-[var(--leaf-dark)] aria-[current=true]:text-[var(--linen)]"
            >
              <span className="block transition-transform duration-300 group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:transition-none">
                {label}
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 grid translate-y-full place-items-center font-display transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:transition-none"
              >
                {WELCOME[code].word}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

Pass `requestLanguage` as `onPick`, so the chooser and the switchers all go through the welcome slide.

## 7. Pages and sections

**Home**

1. **Header:** the logo (links home), then Über uns · Küche · Online Reservation · Kontakt, the language switcher and an "Anrufen" button. It is sticky, shrinks on scroll and morphs the tree into the ring.
2. **Hero:** lunch under the olive tree (4.2), with the motto, the line, the CTAs and the live badge.
3. The **language chooser**.
4. The **logo strip**.
5. **Portugal | Schweiz** divider (4.3).
6. **Küche teaser:** six served cards (Bacalhau, Caldo verde, Francesinha, Käseschnitte «Walliser Art», Polvo grelhado, Pastel de nata), the line about the current menu and the phone number, and "Alle Gerichte" (translated).
7. **Über uns** (`#ueber-uns`): the split-flap story (4.5), the live texts, Arlindo's photos and the signature.
8. **Galerie:** the azulejo wall (4.7).
9. **Online Reservation** (`#reservation`): the magnetic buttons and the MyLocalina drawer.
10. **Kontakt** (`#kontakt`): the live badge, the provisional hours, address, phone, email, the Lageplan map (on click) and Facebook.
11. **Footer:** the dark logo, the quick links (Über uns · Kontakt · Impressum · Datenschutz), "Reservationen · Telefon 044 730 71 71", the language switcher, the sound toggle (if built) and the copyright line.

**Küche:** a hero band with the bacalhau living photo; the Portugal / Schweiz / Alle toggle; instant search; the served cards with their detail views; the Tagesmenü strip; the "Symbolbild" labels; the current-menu line with the call button; "Online Reservation".

**Impressum** and **Datenschutz:** quiet, typographic, readable. A short linen wipe on entry, nothing else.

## 8. Quality bar

- **Lighthouse on mobile:** Performance ≥ 85 (the hero poster is the LCP, and all 3D loads after first paint), Accessibility ≥ 95, SEO ≥ 95. If a target is missed, say what is in the way.
- **Budgets:** initial JavaScript ≤ 200 KB gzipped, without the lazy 3D chunk; the hero poster ≤ 120 KB; first-view images on the home page ≤ 600 KB in total; LCP ≤ 2.5 s on a throttled 4G mobile profile.
- **Layout:** checked at 375, 768, 1280 and 1920 px, in all five languages (the German and Portuguese words are the longest).
- **Keyboard:** the chooser, the hero "Wind" button, the divider, the board, the tabs, the wall, the lightbox and the drawer all work without a mouse. Focus is visible, and Esc closes overlays.
- **SEO:** a title and meta description per page and language, `hreflang`, and `Restaurant` JSON-LD with name, address, telephone, email, `servesCuisine` ["Portuguese", "Swiss"], `acceptsReservations` (the MyLocalina URL), `sameAs` (Facebook) and image. Add `openingHoursSpecification` only once the hours are confirmed. No `menu` property until there is a menu.
- **Privacy:** the map and MyLocalina load only on click; no analytics without the owner's say-so.
- **Automated checks** (`npm run check`, exits non-zero on failure):
  - every translation key exists in all five languages;
  - all 27 photos are used at least once, and each has alt text in five languages;
  - no file from the "never use" list is referenced;
  - every fact in 1.1 appears exactly as written;
  - axe-core reports no serious or critical violations;
  - Playwright screenshots of every page at the four widths, with and without reduced motion;
  - no console errors.

## 9. The preview is a design proposal

This is a preview of a real business's website. Leave the live WordPress site alone: the logo, the photos and the texts belong to Restaurante Oliveira, and the new site goes live only with the owner's OK. Until then, every preview page carries a **permanent banner**, readable and not dismissable: "Proposta de design · não é o site oficial", followed by the current language's version ("Designvorschlag · nicht die offizielle Website", "Design proposal · not the official website", "Proposta di design · non è il sito ufficiale", "Proposition de design · pas le site officiel"). Add `noindex` to the preview.

## 10. Build order

There's no time limit. Work in this order and finish each phase before the next:

| Phase | Do | Done when |
|---|---|---|
| 1. Content and assets | Re-read the live pages; save the texts in 1.2; download the logos and the 21 own photos at full size; add the 6 supplied ones; make AVIF/WebP sets, placeholders, depth maps, and steam and gloss masks; write `dishes.json`, `photos.json` and `hours.json` | All 27 photos processed; `npm run check` passes its content checks |
| 2. Pages and languages | Routes, the four pages, the home sections with real content, responsive layout; the chooser, the switchers and all five languages; the welcome slide and the intro | Every page in five languages, switching through the welcome slide from every page |
| 3. Hero | The olive tree, the wind, the real sun, the pointer gust, the olives, the poster and the fallbacks | Day, golden and night all look right (`?sun=`); 60 fps on a throttled phone |
| 4. Living photos and the divider | The shared WebGL layer, parallax, steam, glisten, heat shimmer, tilt permission; the Portugal \| Schweiz divider | Works with touch and keyboard, and falls back cleanly |
| 5. Motion | Logo strip, split-flap story, served cards, reveals, header morph, page changes, Lottie icons, grain | Every row of the motion table works |
| 6. Interaction | Küche board, azulejo wall and lightbox, MyLocalina drawer, magnetic buttons, live badge, Lageplan, cursor follower, sound | Every row of the interaction table works with touch, keyboard and reduced motion |
| 7. Checks and delivery | Lighthouse, 375 px, reduced motion, keyboard, console, the full `npm run check`; deploy the preview with the banner; write the hand-off | Definition of done ticked |

If something has to give, drop in this order: the sound, the cursor follower, the falling olives, device tilt, the AI cinemagraphs, the heat shimmer and the gloss (keep the steam and the parallax), the azulejo wall (keep a swipe carousel with a lightbox), the split-flap physics (keep a plain flip). If even the 3D tree has to go, keep the poster with the drifting leaf-shadow layer.

**Never cut:** every fact and text; every own and supplied photo (except the watermarked one); all five languages; the home-page chooser; the welcome slide on every language change; the logo intro; the hero (the tree, or at least its poster with moving leaf light); living photos on at least the bacalhau, the caldo verde and the Käseschnitte; the draggable Portugal | Schweiz divider; keyboard and reduced-motion support; the proposal banner; the preview link.

## 11. Definition of done

- [ ] The facts in 1.1 and the texts in 1.2 are exact in German (typo fixes listed), and translated into pt-PT, English, Italian and French. MyLocalina, phone, email and Facebook all work.
- [ ] All 27 photos and the logos are used, with alt text in five languages. The supplied photos carry "Symbolbild" until confirmed. The watermarked caldo verde and the template images are nowhere.
- [ ] The Küche board shows dishes without prices, tagged Portugal, Schweiz or neither; nothing on it is invented.
- [ ] The hours are marked provisional, and are left out of the JSON-LD until confirmed.
- [ ] Every page exists in five languages. The chooser is on the home page. Switching from any page lands on the same page; the URL and `<html lang>` update; the choice is remembered.
- [ ] The welcome slide plays on every language change with the right word and line, can be skipped, and fades for reduced motion. The intro plays once per session.
- [ ] The hero responds to the real sun, the wind and the pointer, with its poster fallback. The living photos and the divider work with touch and keyboard.
- [ ] Every row of the motion and interaction tables works, with touch and keyboard ways and reduced-motion versions.
- [ ] It works on a 375 px phone with no console errors; `npm run check` passes; the Lighthouse targets are met or explained.
- [ ] The preview carries the proposal banner and `noindex`.
- [ ] Hand-off sent.

## 12. Hand-off (send me this at the end)

- The preview link.
- What you dropped, and the decisions you made on your own, including the typo fixes and the provisional hours.
- The open questions for the owner from 1.8.
- A map from the old URLs to the new ones for redirects at launch: `/` → `/de/`; `/impressum-haftungsausschluss/` → `/de/impressum`; the `#ueber-uns`, `#reservation` and `#kontakt` anchors are kept.
- What is generated rather than photographed: the 3D tree, the tiles, the depth maps and masks, any cinemagraphs.
- A note that all Portuguese, English, Italian and French texts need a native-speaker check before launch, and that the privacy notice is a draft.
