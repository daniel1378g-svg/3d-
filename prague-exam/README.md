# Prague Exam Drive

A first-person mock of the Czech practical driving exam (category B) on the real streets of
north-east Prague: about 7 × 7 km around the tram stop Arena Libeň jih, covering Libeň, Vysočany,
Prosek, Střížkov, Kobylisy, Hloubětín, Karlín and the north of Žižkov. It runs in a phone browser.

You sit in the driver's seat. An examiner gives directions in Czech with an English translation,
other cars, trams and pedestrians follow the priority rules, and the drive ends with a result
sheet: pass or fail, what went wrong, where, what the rule requires and the legal reference.

## What is real and what is not

- **Streets** come from OpenStreetMap: road shapes, lanes, one-way streets, speed limits, traffic
  lights, pedestrian crossings, tram tracks, turn restrictions, and the give-way and stop signs
  that are mapped.
- **Priority at junctions without mapped signs is inferred** from the road classes: a classified
  road is treated as the signed main road, two residential streets as a right-hand-rule junction.
  Most junctions will match the street, some will not.
- **Buildings** stand in their real positions with their real footprints and mapped heights, as
  simplified blocks with generic facades. They do not look like the actual buildings.
- **The ground is flat.** Prague's hills are not modelled yet.
- **The clutch is not simulated.** The car has a P-R-N-D selector. This trains rules, observation
  and signalling, not the feel of a manual car.
- **The fault rules** follow zákon č. 361/2000 Sb.; `docs/rules-notes.md` lists every provision
  with a quote from the text. The real exam has no fixed number of tolerated minor faults; this
  mock fails the drive at the fourth.

## Run it

```bash
npm install
npm run build      # dist/site (any web host) and dist/artifact (claude.ai Artifact)
npm run serve      # http://127.0.0.1:4173/
npm test           # simulation tests, including a full headless exam
```

Keyboard on a desktop: `W A S D` or the arrows drive, `Q` and `E` indicate, `B` belt, `I` engine,
`L` lights, `F` drive gear, `Space` handbrake, `C` and `V` look over the shoulder, `Esc` pauses.

## Rebuilding the map

The generated map is committed in `data/`. To rebuild it from OpenStreetMap:

```bash
curl -o .cache/praha.osm.pbf https://download.openstreetmap.fr/extracts/europe/czech_republic/praha-latest.osm.pbf
pip install osmium
npm run extract    # .cache/raw.json: everything inside the game area
npm run data       # data/graph.pack, buildings.pack, ground.pack
```

`tools/steps/10-graph.mjs` builds the road network and its rules, `40-buildings.mjs` the
buildings, `50-ground.mjs` the ground cover, trees and lamps. To move or resize the area, change
the constants in `src/js/data/geo.js` and `tools/extract.py` together.

## How it is put together

- `src/js/sim/` is the simulation, plain JavaScript with no browser dependencies:
  `roadnet.js` (geometry, signals, who yields to whom), `vehicle.js`, `traffic.js`,
  `exam.js` (route, directions, fault detection, result), `lawbook.js` (texts and references).
- `src/js/render/` draws the world with three.js in 240 m chunks around the car.
- `src/js/ui/` has the touch and keyboard controls, the dashboard and the screens.
- `dev/bot.mjs` is a test driver that takes a full exam through the same controls a player has.
  `node dev/bot.mjs <placeId> <seed> <minutes>` prints every fault with its position;
  `node dev/bot-batch.mjs` runs every start place. A fault the careful driver collects is either
  an examiner bug or a weakness of the driver, and both are worth looking at.
- `docs/ARCHITECTURE.md` has the conventions and the shared data shapes.

## Credits

Map data © OpenStreetMap contributors, available under the Open Database License.
