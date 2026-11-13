# FASTWHEELS GARAGE · Ardon

Website for FASTWHEELS GARAGE (Rue de la Greneye 11, 1957 Ardon, Switzerland): detailing, ceramic coating,
wrapping, ambient-light installation and starlight headliners. Five languages (French by default, English,
Portuguese, Italian, German).

Page order: header and hero → detailing and ceramic story → car / motorcycle wrap configurator →
appointment request and contact → interior sequence (door opens, cabin, ambient lighting, camera pans up,
starlight headliner) → final call to action and footer.

## Run it

```bash
npm install
node tools/build.mjs               # dist/           the deployable static site
node tools/build.mjs --artifact    # dist-artifact/  the claude.ai preview (adds the permanent "design proposal" strip)
node tools/serve.mjs 5174 dist-artifact &          # then open http://127.0.0.1:5174/preview.html
node tools/qa.mjs                  # end-to-end checks against that address
```

`dist/` is plain static files: any static host works.

## Business details

Everything is in `src/config.js`. Entries left as `null` are not shown anywhere (no label, no link):

| Entry | State |
| --- | --- |
| name, address, directions link, Instagram | filled in |
| `phone`, `whatsapp`, `email`, `hours` | **to be provided** by the garage |
| `booking.endpoint` | **to be connected**, see below |

No prices, reviews or opening hours are invented anywhere on the site.

## Appointment requests

The form validates in the browser and posts JSON to `booking.endpoint`. Until an endpoint is set it says plainly
that the request was **not sent** and offers to copy the request text and open Instagram. It never shows a
success message without a 2xx answer from the endpoint.

`server/booking-server.mjs` is a reference handler without dependencies (Node 18+): it validates the request,
appends it to `data/requests.jsonl` and, if `BOOKING_WEBHOOK_URL` is set, forwards it (mail relay, automation
tool, CRM). To connect:

```bash
BOOKING_ORIGIN=https://<site> BOOKING_WEBHOOK_URL=https://<your hook> node server/booking-server.mjs
```

then set `booking.endpoint` in `src/config.js` to `https://<host>/api/appointments` and rebuild, or set it at
deploy time without rebuilding: `<script>window.FW_CONFIG = { bookingEndpoint: '…' }</script>` before `app.js`.
Any service that accepts a JSON POST and answers 2xx works the same way. The claude.ai preview cannot reach
outside hosts, so the form always stays in its "not connected" state there.

Still to decide with the garage: where requests should arrive (e-mail, WhatsApp, a calendar) and the privacy
notice that goes with collecting names and phone numbers.

## 3D models and licences

| Vehicle | Model | Licence |
| --- | --- | --- |
| Car | [2021 BMW M4 Competition](https://sketchfab.com/3d-models/2021-bmw-m4-competition-d3f07b471d9f4a2c9a2acf79d88a3645) by Ricy | CC BY-NC 4.0 |
| Motorcycle | [BMW S1000 RR](https://sketchfab.com/3d-models/bmw-s1000-rr-1873aed292d6465694119bd81860a0c2) by VTX | CC BY-NC-SA 4.0 |

Both licences are **non-commercial**. They are credited in the footer and are fine for this design proposal.
Before the site goes live for the business, get the authors' written permission or replace the models with
commercially licensed ones (the pipeline below takes any GLB). BMW names, badges and vehicle designs belong to
BMW AG; check with the garage how it wants to show them.

The converted packs in `public/models/` are derivatives under the same licences. The source GLB files are not
committed. To rebuild the packs, put them at `dev/raw/m4.glb` and `dev/raw/s1000.glb` and run:

```bash
node tools/prepare-models.mjs      # GLB → public/models/*.json (real-size, merged meshes, WebP textures, gzip)
node tools/serve.mjs 5173 &
node tools/bake-cabin.mjs          # measures light-line paths and star positions on the M4 cabin → src/three/cabin-data.js
node tools/render-posters.mjs      # poster and before/after stills → public/img/
```

The models are scaled to the real vehicles: M4 length 4.794 m (wheelbase comes out at 2.855 m, real 2.857 m),
S 1000 RR length 2.073 m (wheelbase 1.465 m, real 1.457 m).

What is added on top of the M4 model: the wrap material (only the body-colour panels are repainted; glass,
lights, carbon roof, grilles, wheels and trim keep their own materials), a black leather tint for the cabin, the
ambient light lines and their spill light, and the fibre-optic stars on the headliner. The light lines follow
the measured trim but are an illustration of an installation, not BMW's factory lighting layout.

## How the page is put together

```
src/config.js      business details, booking endpoint, model credits
src/i18n.js        every interface string, one row per key: [fr, en, pt, it, de]
src/colors.js      36 wrap colours in 5 families, with the effects each one comes in
src/page.js        the markup (rendered at build time in French; data-i18n drives language changes)
src/styles.css     layout and theme
src/app.js         languages, navigation, configurator, form, scroll logic, hand-over to the 3D scene
src/story.js       hero and detailing picture transitions (plain WebGL, starts before the 3D bundle)
src/logo.js        the FASTWHEELS GARAGE wordmark traced from the supplied logo
src/three/         the 3D scene bundle, loaded on demand:
  scene.js           one canvas shared by the configurator and the interior sequence, render-on-demand
  experience.js      the interior sequence as a pure function of scroll progress (reversible)
  cabin.js           ambient light lines, spill lights, starlight headliner
  vehicles.js        paint zones, glass, door pivots for the two models
  stage.js           the garage and its light rig
  loader.js          pack loader (gzip → GLB → three.js)
```

Behaviour worth knowing:

- **Performance.** `app.js` is about 66 KB. The 3D bundle (760 KB) and the models (3 MB car, 5.5 MB motorcycle)
  load only when the configurator or the interior comes near; a poster shows until the first frame. Rendering
  stops when the canvas is off screen or the tab is hidden, and only redraws when something changes. Phones get
  a lower pixel ratio, no shadow map and fewer lights; a slow GPU sheds resolution automatically.
- **Reduced motion or no WebGL 2.** The detailing story becomes still images, the interior sequence becomes
  still images with Before / After switches, and nothing is pinned. The form and the colour choice work without 3D.
- **Navigation.** Long jumps (for example a booking button) go straight to the target instead of scrolling
  through the pinned sequences. The sequence has its own Skip control.
- **Language.** The choice is remembered (`localStorage`). Changing it keeps the scroll position, the
  configuration and everything typed into the form, and runs a short light sweep across the logo.

## Verified

`node tools/qa.mjs` covers: layouts at 360, 390, 430, 768 and 1440 px (no horizontal overflow, touch targets of
44 px or more, headings clear of the header), the five languages, phone menu and keyboard order, car /
motorcycle switching with a full 360° turn, colour and finish persistence, the full-screen configurator's Back
control, the appointment form (validation, not-connected state, loading, success and error against a mocked
endpoint), forward and reverse scroll through the interior sequence, reduced motion and the no-3D fallback.

Not verified here: real Mobile Safari and real phone GPUs (the checks run in headless Chromium with phone
emulation and software WebGL).

## Still needed

- Phone / WhatsApp, e-mail and opening hours.
- The booking endpoint and where requests should land; privacy notice text.
- Permission for, or commercial replacements of, the two 3D models.
- The logo as a vector file from the garage would be better than the trace from a screenshot (the small
  "ARDON. VALAIS 1957" line is re-set as text because it was too small to trace).
- Real photographs of the workshop and of finished work, to replace the illustrative hero images.
