# 3D model of the circuit and the car

`estoril-circuit.glb` (25.4 MB, binary glTF 2.0) holds the whole scene of the home page's 3D journey,
exported from the page itself by `scripts/export-glb.mjs`:

- **The circuit:** terrain and hills, the track with its kerbs, run-off and gravel, the pit lane and pit
  building, grandstand, start gantry, paddock, armco and tyre walls, fences and every tree and grass tuft
  (22,119 instances in all).
- **The hero car:** body, glass, lights and wheels with brakes. It sits on the pit straight where the
  journey opens (t = 0.05), around x 326–330, z 205–207.
- **The parked paddock cars.**

The file has about 1.17 million triangles drawn and 233 meshes. Every part is named (`track`,
`ground-circuit`, `pits`, `grandstand`, `armco`, `stonePine-far`, `hero-car`, `wheel-rim`, …).

| | |
| --- | --- |
| Units, axes | metres, +Y up (glTF's convention); the start/finish straight runs along X |
| Extensions it needs | `EXT_mesh_gpu_instancing` (trees, barriers, posts, seats: each model is stored once), `KHR_mesh_quantization` (the car's compact vertices) |
| Other extensions | `KHR_materials_clearcoat` (car paint), `KHR_materials_unlit`, `KHR_texture_transform`, `KHR_materials_emissive_strength`, `EXT_materials_bump`, `KHR_lights_punctual` (the garage lamp) |
| Checked with | Khronos glTF Validator 2.0.0-dev.3.10: 0 errors, 1 warning (a generated tangent space); three.js r170 `GLTFLoader` (`preview-aerial.jpg`, `preview-car.jpg` are renders of this file) |

Any viewer that supports those two extensions opens it, such as the three.js editor at
threejs.org/editor. Viewers without `EXT_mesh_gpu_instancing` refuse the file. Only three.js's loader
has been tried here; for Blender, check that your version's glTF importer lists `EXT_mesh_gpu_instancing`.

## How it differs from the page

- **Ground and track colours are baked.** On the page, the grass, asphalt, kerbs, lines, rubber, run-off
  and gravel are coloured by shaders from world-space noise, which glTF cannot carry. The export renders
  those surfaces straight down under flat white light, which gives their true colours, and stores the
  result as images:
  - the circuit area at 8192 × 3614 px (15.7 cm per pixel);
  - the surrounding ground at 2048 × 1463 px (2 m per pixel).

  The painted lines and tyre rubber are part of those images. Their own overlay meshes are left out,
  because they would sit flush on the asphalt and flicker.
- **Trees:** every tree uses the coarse model the aerial shots show. The page swaps in a detailed model
  only near the camera.
- **Left out:** the sky, clouds, sun and sky light (a viewer brings its own lighting), the red aerial
  track highlight, and the car's contact-shadow quad.

## Regenerate

```sh
npm run build
node scripts/serve.mjs "$PWD/site" 8080 &
node scripts/export-glb.mjs --base http://127.0.0.1:8080/
```

Options:
- `--t <0..1>`: where the car is placed along the journey.
- `--res <px>`: size of the circuit-area image.
- `--q high|mid|low`: quality tier (tree and grass density).
- `--no-vegetation`: leave out the trees and grass tufts.
- `--no-people`: leave out the paddock cars, and any crew or visitors shown at `--t`.
- `--out <file>`: output path.
