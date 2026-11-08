# Alpine studio · 3D model

An interactive 3D model of the studio apartment from the walkthrough video, built with Three.js in a single file (`index.html`).

## What's in the model

- **Living and sleeping room** (≈ 3.5 × 5.15 m). Along the bed side: the wardrobe, the desk and chair, and the single bed. Along the TV side: the low table with the yellow bowl, the chest of drawers, the TV unit, the three-spot wall lamp and the road bike. The window end has the open balcony door, the two-pane window, the radiator, the plaid curtain and the wooden shutter box.
- **Shower room** (≈ 2.25 × 2.15 m). Beige wall tiles, the toilet, the shower tray with the white curtain with black branches and red blossoms, and the basin with the mirror cabinet and light.
- **Hall and kitchenette.** The entrance door, the white kitchen unit with two hot plates, a small sink and wall cupboards.
- **Outside.** The terrace with the dog, nearby chalets and the mountains.

All sizes are estimates from the video. To change them, edit the constants at the top of the script (`W`, `L`, `H`, `PZ0`, `BX0`, …).

## Using it

- **Overview / Floor plan:** drag to orbit, scroll or pinch to zoom. The walls facing you are cut away.
- **Room, From the window, Kitchenette, Shower room:** eye-level views. Drag to look around, use W A S D or the arrow keys (or scroll) to walk. Esc returns to the overview.
- **Double-click the floor** anywhere to stand there.
- **Evening** switches on the lamps.

## Run locally

Open the file through any static server, for example:

```bash
cd studio-3d && python3 -m http.server 8000   # http://localhost:8000
```

Three.js 0.170.0 is loaded from jsDelivr, so the page needs an internet connection.
