# Refeitório e Balneários · 3D walkthrough

A furnished, lit, walkable 3D model of the ground-floor plan "Planta geral – proposta geral – Refeitório e
Balneários" (estudo prévio, versão 5, esc. 1/100): the 80-seat canteen with its servery and dishwashing
wing, the circulation hall, the women's and men's changing rooms (53 places each), the transition rooms,
the entrance airlock, the accessible WC and the plant room.

It runs in the browser (desktop and phone): drag to look, W A S D or tap the floor to walk, doors open as
you approach. There is a guided tour, a list of rooms with the areas from the plan's *quadro de áreas*,
a plan inset you can click to jump, and a "maquete" mode that lifts the ceilings off and lets you orbit
the whole floor.

The source PDF is not part of this repository. Only the geometry surveyed from it is (`data/`, `pipeline/plan.py`).

## How it is made

```
plan PDF ──► survey (walls from the hatch, openings, rooms, fixtures)        pipeline/plan.py, data/walls_survey.json
         ──► architecture mesher (walls, lintels, sills, floors, ceilings)   pipeline/arch.py
         ──► joinery, furniture, fittings, lights, signage, site             pipeline/joinery.py, props.py, furnish.py, lights.py, signs.py, site.py
         ──► lightmap UVs + atlas packing                                    pipeline/lightmap.py
         ──► Cycles bake of the global illumination, denoised                pipeline/bake.py, oidn.py
         ──► model.glb + scene.json + lightmaps                              pipeline/export.py  →  web/public/assets/
         ──► three.js viewer                                                 web/
```

* **Dimensions.** Walls come from the hatched wall areas of the vector PDF, snapped to the wall outlines
  (millimetre-level agreement with the dimensions printed on the sheet: 18,56 m, 12,41 m, 14,32 m, 3,57 m, …).
  Door, window and fixture positions were read off the drawing by hand, in metres.
* **Lighting.** Sun and sky through the four canteen windows and the glazed entrance, plus recessed LED
  panels and downlights. The light is path-traced once (Blender Cycles) into two lightmap atlases; the
  viewer only has to draw textures, so it stays fast on a phone.
* **Reflections.** Each room captures a small reflection probe from the lightmapped scene when the page
  loads (box-projected, so floors reflect their own room); the two long wash-room mirrors are true
  planar reflections.

## Assumptions (not on the plan)

The plan is a preliminary study, so these are choices made for the visualisation and are easy to change
in `pipeline/plan.py`, `materials.py` and `furnish.py`:

| | |
| --- | --- |
| Ceiling heights | canteen 3,20 m · circulation 3,00 m · changing rooms, kitchen, transition rooms 2,80 m · staff rooms 2,60 m |
| Doors / windows | door head 2,10 m · canteen windows 1,60 × 1,50 m with a 0,95 m sill · glazed main entrance to 2,60 m |
| Finishes | porcelain floor tiles, painted walls and a mineral-tile ceiling in the public rooms; wall tiles to 2,10 m in the changing rooms; white tiles and a resin floor in the kitchen wing; hygienic panels and a vinyl floor in the transition rooms |
| Shower partitions | built to 2,10 m, tiled |
| The five square units on the canteen's north wall | read as pedal bins for waste sorting |
| The box across the opening between changing room and transition room | read as a hygiene step-over bench |
| Outside, the existing corridor, offices and EDP room | shown only as simple volumes; doors leading out of the modelled area stay closed |

## Run it

```bash
npm install
npm run dev                 # http://127.0.0.1:5173
npm run build               # static site in dist/
npm run build:artifact      # also packs artifact/ (page + files) for the claude.ai Artifact preview
npm test                    # behaviour checks in headless Chromium (needs Playwright)
```

`npm test` walks the model by stepping the viewer's own logic: collisions with walls and furniture,
doors opening on approach, crossing the step-over bench, the whole guided tour without touching a wall,
the room list, the model view and the language switch. `scripts/shot.cjs` takes screenshots at any
viewpoint (`?shot=1&at=REF`, `&mode=overview`, `&x=…&z=…&yaw=…`).

Useful URL parameters: `at=<room id>` to start somewhere else, `tm=agx|aces|neutral` and `exp=<number>`
to compare tone mapping.

## Rebuild the model

Needs Python 3.13 with `bpy` 5.2 (Blender as a module), `numpy`, `Pillow` and `shapely`.

```bash
pip install bpy==5.2.3 numpy pillow shapely
python3 -m pipeline.textures                          # procedural textures → textures/
python3 -m pipeline.run build lm:4096 export bake:64  # scene → lightmap UVs → model.glb + scene.json → lightmaps
python3 -m pipeline.run build preview:ref_ne,balf     # quick Cycles stills into build/preview/
```

The bake takes about 40 minutes on four CPU cores (two 4096 px atlases at roughly 64 texels per metre,
64 samples per texel, adaptive). The raw result is kept in `build/`, so the denoising and encoding can be
redone in a minute with `python3 -m pipeline.run refinish`. `web/public/assets/model.glb` is a standard glTF
binary and opens in Blender or any glTF viewer (the lightmaps are applied by the web viewer, through the
second UV set).
