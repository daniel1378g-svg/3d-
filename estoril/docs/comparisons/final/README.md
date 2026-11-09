# Final comparison: published site vs final build

The same journey positions rendered by the scripts published on 23 Oct 2026 (BEFORE, served with
`node scripts/serve.mjs site 8090 --reference`) and by the final build (AFTER). Both are deterministic stills
through the page's capture hook (`?capture=1&3d=force&q=high`, `window.__cap(t, 0)`), with the page UI hidden so
only the 3D canvas is compared:

    node scripts/capture.mjs --base http://127.0.0.1:8090/ --t 0.05,0.25,0.345,0.375,0.40,0.5,0.72,0.95 \
      --size 1440x900 --hideui 1 --prefix before- --out <dir>
    node scripts/capture.mjs --base http://127.0.0.1:8080/ ... --prefix after-          (and --size 390x844)

Headless Chromium with SwiftShader, `q=high`, device scale 1.

* [overview-1440x900.jpg](overview-1440x900.jpg): all eight positions, before | after.
* One sheet per position at 1440x900 (each half 720x450):
  [arrival close-up 0.05](arrival-close-1440x900.jpg), [pit lane 0.25](pit-lane-1440x900.jpg),
  [aerial climb 0.345](aerial-rise-1440x900.jpg), [overhead 0.375](aerial-1440x900.jpg),
  [dive 0.40](aerial-return-1440x900.jpg), [on track 0.5](on-track-1440x900.jpg),
  [paddock 0.72](paddock-1440x900.jpg), [golden hour 0.95](golden-hour-1440x900.jpg).
* [phone-390x844.jpg](phone-390x844.jpg): arrival, overhead, on track and golden hour on a 390x844 phone.

What changes, position by position:

| t | before | after |
|---|---|---|
| 0.05 arrival | a close-up from the front, low-poly umbrella trees on a bare verge | low behind the car on the main straight, framed to the right of the panel (hidden here): PBR paint and tyres, the catch fence, the control tower, kerbs and the tree belt |
| 0.25 pit lane | one crew member standing into the front wheel, plain white garage doors | the open pit box with a crew posed around the car (lollipop, jack, wheel change, tyre), the team's garages along the pit row |
| 0.345 aerial climb | over the grandstand: round blob trees, broken run-off and kerbs | the drone climbs over the pit building and the paddock (team trucks, hospitality units), with the woods and the circuit beyond |
| 0.375 overhead | broken kerbs and run-off, a 3.3 m red tube, half the circuit outside the frame | the whole circuit framed for the actual aspect, a flat highlight ribbon on the racing line, intact surfaces, woods in belts and clearings |
| 0.40 dive | motion blur while airborne smears the frame | sharp: the blur only runs on the lap chase, near the ground |
| 0.5 on track | the background and clouds smeared by the blur, the car close and centred, a bare verge | the chase camera beside the car on the lap, the car to the right of the panel: Armco, kerbs, grass tufts, the grandstand and the tree line. This still is drawn at rest (dt 0), so the final blur, which follows the frame-to-frame motion, does not show |
| 0.72 paddock | the car stands across a bay line, close to the camera | behind the stopped car in its bay beside the parked cars, with people, the paddock buildings and pines |
| 0.95 golden hour | the car lit by an orange sky | the low sun lights the grandstand above the long shadow of the pit building, which the car and the lane sit in (references.md 4.9) |

The 15 px white strip at the right edge of every BEFORE frame is the published build's canvas stopping short of the
viewport (it was sized without the scrollbar gutter). The final canvas covers the viewport exactly
(`scripts/test-loop.mjs`, "canvas covers the viewport").

On the phone the final build frames the car in the band above the bottom sheet (hidden here), which is why it sits
higher and smaller than in the published build, where the sheet covered it.
