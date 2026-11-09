# Model viewer

`index.html` is an interactive page for `exports/estoril-circuit.glb`. It shows the circuit and the car
full screen, with:
- **Views:** overview, track map, car, main straight, pits and paddock.
- **Labels:** pinned to the start / finish line, the pit building, the grandstand, the paddock and the car.
- **Drive a lap:** the car follows the track's centre line, with speeds worked out from the curvature
  of each corner.
- **Golden hour:** switches the light to a low, warm sun.
- **Quality:** a high / medium / fast setting.

Build the files the page loads (needs Python 3 with Pillow), then serve the folder:

```sh
python3 model-viewer/build-assets.py
node scripts/serve.mjs "$PWD/model-viewer/dist" 8310
```

`dist/` holds the page, `model.json`, the geometry as base64 text (`geometry-*.b64.txt`), the
textures as WebP (`tex/`) and the track's centre line (`track.json`). This layout is for hosts that
serve only text and image files. The page joins the geometry back into a binary glTF in memory
and loads it with three.js r170. `dist/` is generated and not committed.
