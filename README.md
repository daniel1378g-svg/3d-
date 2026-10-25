# Nur Atelier · Turkish mosaic chandeliers, Switzerland

An interactive showroom website built around a real 3D model of a five-globe Turkish mosaic
chandelier. The chandelier hangs in an evening interior (charcoal plaster, travertine, a window
onto an Alpine lake at dusk) and stays the centrepiece from the intro to the configurator.

**Languages:** English (default), Français, Português, Deutsch (Swiss spelling), Italiano.
**Prices:** CHF, including 8.1 % Swiss VAT.

## What's inside

- **Intro**: the poster frame appears at once. When the model has loaded, the canvas fades in
  over it, the globes light one after another with a short filament flicker, and the camera eases
  in. The intro is skippable (button, scroll, key, drag) and plays only once per session.
- **Interaction**: drag to rotate with inertia (spinning swings the globes outwards), pinch or
  ctrl/⌘ + wheel to zoom, tap a globe for a close-up with its details. The dock has a light
  switch, a dimmer (the light gets warmer as it dims), zoom, reset and globe buttons. On the
  focused canvas: arrows rotate, + / − zoom, `L` switches the light, `1`–`7` inspect a globe,
  `Esc` returns.
- **Scroll story**: hero → mosaic glass close-up → brass crown → the collection and
  craftsmanship panels slide over the scene → configurator.
- **Configurator**: five glass palettes, four brass finishes, and arrangements of 3, 5 or 7
  globes, all rebuilt live from the real model parts. Glass pieces change colour one by one.
  The light thrown on the ceiling and walls takes on the colour of the glass. Design links use
  plain anchors (`#cfg-iznik-antique-5`).
- **Persistence**: language and configuration are kept in `localStorage` and survive language
  switches and reloads.
- **Accessibility**: keyboard alternatives for every gesture, live announcements, labelled
  controls in every language, and visible focus. With `prefers-reduced-motion` there is no
  smooth scrolling and the camera cuts instead of travelling.
- **Ambient sound**: generated with Web Audio and off by default.

## Business details to fill in

Everything shown in `[brackets]` on the site is a placeholder. Edit `src/config.js` → `BUSINESS`
(address, phone, email, UID, opening hours, delivery time, hours of handwork). Prices are in
`BASE_PRICE` and `FINISHES[*].surcharge`. The contact form validates and confirms on screen, but
it does not send anything yet. Connect it to your email or CRM service in `src/ui/contact.js`.

## Develop

```bash
npm install
npm run dev               # http://127.0.0.1:5173
npm run build             # static site in dist/
npm run build:artifact    # also writes dist/artifact.html + dist/artifact-files.json
```

`dev/scene-test.html?cam=hero|glass|metal|config&light=off&globes=7&palette=gece` renders the
3D scene alone, which helps when tuning lights and materials.

## Assets and how they were made

| Asset | Source |
| --- | --- |
| `public/models/chandelier.glb` | The supplied `turkish.FBX` (FBX 6.1 binary), converted with FBX2glTF and compressed with glTF-Transform (Meshopt, UVs kept). 221k triangles, 0.85 MB. |
| Mosaic glass | Generated at load time (`src/scene/mosaicGen.js`) in a Web Worker. Each tessera is its own cell with a grout line, a slight tilt (normal map) and its own colour variation. |
| Brass, plaster, travertine, dusk view | Baked with `npm run textures` (`scripts/bake_textures.py`, needs numpy and Pillow) |
| Poster and product photos | Rendered from the same scene with `npm run photos` while the dev server runs (needs Playwright). |

The original `.max`/`.FBX` sources are not committed. To re-export the model:

```bash
npx fbx2gltf --binary -i turkish.FBX -o chandelier
npx @gltf-transform/cli optimize chandelier.glb public/models/chandelier.glb \
  --compress meshopt --simplify false --instance false --join false --palette false \
  --texture-compress false --prune-attributes false
```

## Structure

```
index.html              page markup; every string carries a translation key
src/main.js             wiring, intro, photo mode
src/config.js           business placeholders, palettes, finishes, products, prices
src/i18n.js             EN / FR / PT / DE / IT strings and the 26 cantons
src/state.js            language + configuration, persisted
src/scene/              Three.js: stage (renderer, camera, post), room, chandelier, materials, mosaic
src/ui/                 language selector, controls, scroll, collection, configurator, contact, audio
scripts/                texture baking, photo rendering, artifact packaging
```
