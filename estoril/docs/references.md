# Circuito Estoril: visual reference brief for the decorative three.js scene

**Source key.** `file.webp` = client photo in `/home/user/3d-/estoril/site/media/` (I viewed the `-m` versions). **OSM** = OpenStreetMap raceway, building and landcover ways, fetched with Overpass (ODbL). I only compared against them and did not copy any OSM data into the project. **[est]** means I estimated it from photos. **[?]** means uncertain or unverified. Hex values marked "sampled" are medians of regions in sRGB photos, so they are display targets and not albedo. "Base" is my recommended material colour.

---

## 1. Real circuit facts

| Item | Value | Source |
|---|---|---|
| Length | 4,182.72 m on the centre line (4,140.42 m on the ideal line) | [official technical data](https://www.circuito-estoril.pt/en/technical-data/) |
| Corners | 13: 9 right, 4 left. Wikipedia counts 14. | official; [ELMS](https://www.europeanlemansseries.com/en/news/estoril-circuit-presentation-5f06df416ded28690c6620e0/9747); [Wikipedia](https://en.wikipedia.org/wiki/Circuito_do_Estoril) |
| Direction | **Clockwise**. Confirmed by the signed area of the OSM loop; 9 right turns against 4 left agrees. | OSM; [lapmeta](https://lapmeta.com/de/track/variation/335/track_map) |
| Main straight | 985.686 m long, 14 m wide. Cars drive it on a real bearing of about 204° (SSW). | official; OSM way 363138868 |
| Track widths | T1–3 and T11–13: 14 m. T4–8: 10 m. T9/10 (Variante): 18 m | official |
| Gradient | Steepest climb 6.75%, steepest descent 5.56% | official |
| Elevation | About 116–140 m. Lowest at Curva 2/3 and before the Variante; highest at Parabólica Ayrton Senna. The straight falls about 12 m from the Parabólica exit (≈138 m) to T1 (≈126 m). **[?] EU-DEM 25 m, accurate to a few metres** | [OpenTopoData eudem25m](https://api.opentopodata.org/v1/eudem25m) |
| Facilities | 30 boxes, each 6.70 × 17.00 m, plus 3 technical boxes. Control tower. Paddock 24,500 m², support paddock 58,000 m², run-off 58,000 m², site 52 ha | official |
| History | 1972 opening. 1993: new pit zone, control tower and paddock tunnels. 1994: Variante replaces Curva do Tanque. Late 1990s rebuild of T1. Stand A closed since 24 Apr 2025. | [history](https://www.circuito-estoril.pt/en/history/); [statement](https://www.circuito-estoril.pt/en/?p=3445) |
| Setting | Rocky plateau near Alcabideche, about 9 km from Estoril. Strong Atlantic winds and rain squalls | Wikipedia; [grandprix.com](https://www.grandprix.com/circuits/estoril.html) |

## 2. Is track.json a verified layout?

**Method.** I chained the OSM GP ways in driving order: Recta da Meta → Curva 1 → Curva 2 → Descida → Curva 3 → Subida VIP → Curva VIP → Recta Interior → Parabólica Interior → Descida para o Triângulo → Orelha → Subida/Variante (Gancho) → Variante → Esses → Parabólica Ayrton Senna. The OSM loop measures 4,177 m. I then fitted track.json to it with a similarity fit (rotation, uniform scale, translation, with mirroring allowed).

**Result**
- Best fit: rotation 65.4°, scale 0.998, **no mirroring**. The track.json point order runs in the real direction of travel.
- Nearest-point deviation per section: max 13.1 m (Parabólica Interior), 10–11 m around Curva VIP and Triângulo/Orelha, under 6 m everywhere else. That is less than one track width throughout, and the chicane is present.
- track.json is 4,182 m long, matching the official figure. Its straight run is about 970 m against the official 985.7 m.
- The circuit logo, and therefore the favicon path, is a faithful tracing of the real circuit.

Overlay: [`track-osm-overlay.png`](track-osm-overlay.png) (black = OSM loop, north up; red = track.json, best similarity fit). Fit script: `tools/reference/osm-fit.py <overpass.json> <track.json> <out.png>`; the Overpass response is not stored in the repository (ODbL).

**Verdict.** As a 2D plan, the line is verified against an independent source: OSM, which is traced from aerial imagery but is not an official survey. Three things are not verified:
- **Elevation.** track.json is flat; the real circuit has about 24 m of relief.
- **Orientation.** The scene's X axis is the main straight, not north.
- **Everything around the track** is unverified.

The line itself no longer needs the "não é um mapa" caveat. I would reword the disclaimer rather than drop it, for example: "traçado fiel; envolvente ilustrativa".

**Real-world frame in track.json coordinates (x, z)** [via fit; ±15 m]
- North = (+0.911, −0.417), East = (+0.416, +0.909). The direction toward the sun at azimuth A is N·cosA + E·sinA:
  - Sunrise: A ≈ 60° in summer → (0.82, 0.58); 90° at the equinox → (0.42, 0.91); 120° in winter → (−0.10, 1.00).
  - Sunset: A ≈ 300° in summer → (0.10, −1.00); 270° → (−0.42, −0.91); 240° in winter → (−0.82, −0.58).
- Main straight: centre line at z ≈ 203. Traffic runs from x = 441 (Parabólica exit) to x = −528 (T1), in the −x direction.
- **Pits are on the infield (−z) side**, which is the driver's right:
  - Pit Boxes building: x −264…−15, z 154…177, 249 × 23 m.
  - Pit lane centre: z ≈ 188.5. Pit entry is at the Parabólica exit (x ≈ 361); pit exit rejoins on the inside after T1 (−517, 77).
  - Pit wall: about z 195–196.
  - Offices (Escritórios): x −11…40, z 172…181. Media Centre: x 49…94, z 161…173. Medical Centre: (139, 146). Bar Paddock: (6, 161). Paddock: behind the pits, between z ≈ 154 and the back straight [est].
- **Main grandstands are on the outside (+z) side**: Bancada A at x −98…45, z 222…250 (143 × 28 m); Bancada B at x −260…−142, z 222…251.
- Smaller "Bancada"/"Bancada E" stands sit in the infield around x 120…320, z −30…−100.
- Serra de Sintra lies about 4–7 km away to the north and north-west, so the skyline ridge belongs on the +x / −z horizon. The sea lies south and west (−x / +z and −z), where the horizon is flatter and lighter (`estoril02`). [? distances from map knowledge]

## 3. What the client photos show

- **`estoril01`, `estoril02`**: panoramas of the inner hairpin. Wide beige gravel trap; a black tyre wall along it; grey service road; green winter grass. Green painted strips run along both track edges. Pit/tower complex and floodlight masts on the left skyline. Orange/white-faced barrier and a grandstand on the right. Low tree and scrub horizon. Deep, clear blue sky.
- **`estoril03`–`estoril06`**: open corners with blue/white kerbs and a broad mint-green painted run-off behind the kerb. Pale gravel and sandy patches. A continuous dark tree belt 10–15 m tall with umbrella-pine crowns standing above it. Small white marshal huts with pyramid roofs. A tall red/white banded mast. Concrete walls with orange/white faces. Teal tyre stacks. A dark hill (the Serra) on the horizon in `estoril05`.
- **`estoril07`**: close-up of a kerb with alternating blue/white blocks and a green apron. Rounded white and orange barrier blocks. Catch fence on posts with cranked tops. Armco on the far side.
- **`estoril08`**: wide gravel trap and a tyre wall wrapped in orange/white belting. Stone pines on the left. An arched footbridge on a grassy berm on the right.
- **`estoril09`, `img-footer-circuito`, `estoril10`**:
  - Tower/office block: white render, dark-grey cladding, blue-green glass, masts, floodlight. The pit wall is grey concrete with stencilled logos.
  - Pit building: about 30 sky-blue roller-door bays between white piers. A band of small panels sits in each door at about mid-height. Upper terrace with steel railings and a light steel canopy. Wheeled extinguishers stand in front of each box.
- **`estoril11`, `dpng`, `kf5d2684`**: main grandstand with a tiered concrete structure and blue seats (teal-blue where sun-faded). A white tubular space-frame roof. Catch fence in front. Grey steel truss start gantry with black light boxes. Pit-wall lap boards.
- **`ak0i4981`, `img-7965`, `cr3-1504`, `frosa…`**: pit lane and straight during events. A navy "Circuito Estoril" banner bridge spans the straight. Spectators stand on the pit-roof terrace. A marshal in orange overalls. White houses with terracotta roofs beyond the trees.
- **`ls91100`, `kez16557`, `kez16419`, `kez15816`, `img-0704`**:
  - Vegetation: tall eucalyptus with reddish/grey trunks behind orange/white barriers and teal tyres; umbrella pines; dark evergreen scrub.
  - Summer verges: golden dry grass, ochre soil with rocks.
  - Track edges: double and triple armco.
  - Corner treatment: a blue painted apron with white zebra bars, plus a wide solid-blue painted run-off.
  - A green tractor (perimeter maintenance) in `kez15816`.
- **`53380-jdr`, `54450-jdr`**: dusk on a scrubby hillside with pampas-grass plumes, a pale sky with a pink horizon, and floodlights.
- **`img-2629`**: golden-hour backlight. Amber asphalt, white barrier covers glowing peach, fence silhouettes.
- **`upc`, `dpng`, `ls90381`, `cr3-2666`, `kf5d4996apng`**: garage and crew references (see §4.8).

## 4. Art direction

### 4.1 Terrain and backdrop
- Gently rolling plateau. Give the track about 24 m of total relief (see §1) [?]. Use soft, low berms around the gravel traps and grassy banks of 3–6 m behind the barriers (`estoril08`, `53380`).
- Skyline: one continuous dark tree belt, plus a single hazy ridge (the Serra) rising about 3–5° above the horizon on the N/NW side.
  - Morning colour: sampled #4A535C (`estoril05`) and #38454E (`240111`).
  - Add a few red/white masts and floodlight poles (`estoril03`, `estoril05`).
  - Scattered white houses with terracotta roofs at the edges (`cr3-1504`, `img-7965`).

### 4.2 Vegetation
Use evergreen Mediterranean–Atlantic cover. OSM landcover in the circuit envelope is roughly: scrub 25 ha, grassland and meadow 24 ha, wood and forest 19 ha, gravel ("shingle") 6 ha. One OSM wood is tagged "Carrascal" (way 556158048, *Quercus coccifera*). The Cascais study names maritime pine and kermes oak as the dominant native species, and eucalyptus as planted.

**Coverage of non-asphalt ground near the track** [est]
- About 35% grass.
- About 30% low scrub.
- About 25% tree clusters.
- About 7% gravel traps.
- The rest bare sand or soil patches.

**Tree species mix** [est from photos]

| Species | Share | Size | Look |
|---|---|---|---|
| Stone pine | 35% | 12–20 m tall; flat umbrella crown 8–15 m wide on a bare trunk; often leaning ([Wikipedia](https://en.wikipedia.org/wiki/Pinus_pinea)) | Crown sampled #232714 in shade, sunlit #4E5A2C; bark reddish-brown #6B4A35 |
| Eucalyptus globulus | 25% | 20–35 m tall, narrow open crown ([Wikipedia](https://en.wikipedia.org/wiki/Eucalyptus_globulus)) | Foliage grey-green #4F5E48 / #2A3326; trunks cream-grey #C9C3B3 with peeling brown strips #7A5E45 (`ls91100`) |
| Evergreen oaks / wild olive | 25% | 6–12 m, dense rounded crowns | #2B3320 |
| Maritime pine | 15% [?] | 15–25 m, irregular crown | Hard to tell apart from stone pine in the photos |

**Shrubs and grasses**
- Kermes oak and mastic: 0.5–2 m mounds, olive #4A491F to #5A5A2A ([Wikipedia](https://en.wikipedia.org/wiki/Quercus_coccifera)).
- Pampas grass (`53380`): clumps about 2 m tall with plumes about 3 m. Plumes #E8DFCB. Place a few on disturbed banks only.

**Clustering**
- Trees go in continuous belts 15–40 m deep outside the barriers. Pines and eucalyptus should stand 5–10 m above the belt.
- The infield stays open: grass, with occasional 2–6 m shrub clumps.
- Keep trees 25 m or more from the track edge; run-off and barriers go in between.
- Distant belt with aerial perspective: #36494F to #3B4139.

### 4.3 Ground and grass palette
Pick one season.

| Surface | Sampled | Base | Notes |
|---|---|---|---|
| Winter/spring grass, Nov–May (client hero photos) | #5D702E, #627639, #646E34, #4D5E2E | **#5F7134** | Variation #4A5A2A / #7A8A45 |
| Summer dry grass, Jun–Oct | #908255, #7A6128, #827960 (`img-0704`, `kez16419`, `ls93838`) | **#8C7C50** | Golden #A88B4A; green remnants #6B6E35 |
| Late spring (suggested default) | — | 60% #5F7134 / 40% #A08C5A | Patches |
| Soil / sand | Sunlit sand #DEC5AA (`estoril05`); dry soil #A28766 (`img-0704`) | **#B39C7C** | Pale limestone rocks about #C9BFAE [est] |

### 4.4 Track surfaces

**Asphalt**
- Sampled #585858, #4C5054, #494747 (pit lane); distant glare up to #7E7977.
- Base **#4E4D4C**. Rubbered racing line #3A3938. Visible tyre-mark arcs on the pit lane (`estoril10`).

**Lines**
- White #E8E8E6. Edge line about 0.2 m [?].
- Pit lane has two white lines and grid boxes on the straight (`estoril09`, `estoril11`).

**Kerbs: blue and white (not red)**
- Blue, sampled two ways:
  - Faded: #76C1EC, #82C9F7 (`estoril04`, `estoril05`).
  - Fresh: #0E6EC5, #047DC4 (`a-0d9727`, `ls93838`).
  - Base **#2F86D0**.
- White: base **#ECEEF0** (sampled #EEF0F3).
- Corner kerbs: equal blocks about 1.0 m (0.7–1.3 m) long, about 1 m wide (`cr3-1504`, `estoril07`) [est].
- Flat painted exit kerbs: long blocks of about 3–5 m (`ls93838`) [est].
- Outer aprons: blue with thin white zebra bars about 0.5 m white per 1 m blue (`kez16557`, `a-0d9727`) [est].

**Painted run-off**
- Mint-green strip 1–3 m wide behind the kerbs and along the edges: sampled #5BC2AF and #70CCB1, base **#4FB9A2** (`estoril01`, `estoril04`, `estoril07`).
- Some corners have a wide solid-blue painted run-off, base **#1F6FBF** (`kez16557`, `a-0d9727`).

**Gravel**
- Rounded beige-grey pebbles with a slight pink/warm cast. Not orange.
- Sampled #C1AB92, #AE9E92, #9D8A6F, #CAB787. Base **#B5A288** ±8% noise.
- Raked texture; darker #94806C where disturbed.

### 4.5 Barriers and fencing
OSM maps 9.3 km of guard rail and 6.6 km of fence inside the circuit envelope.

- **Armco**: double or triple W-beam on posts, 0.75–1.1 m tall. Galvanised, sunlit #A1A397, shade #363D3B (`kez15816`, `img-0704`, `1720…`).
- **Tyre walls**: black #2A2A2A with dust #5A554B on top, about 1 m high, running along the gravel traps (`estoril01`). At impact points, add an orange/white belt cover (`estoril08`) and teal-painted tyre stacks #067B7B (`ls91100`, `estoril06`).
- **Barrier blocks / covers**: rounded-top blocks, about 1 m high and 2–3 m long, alternating orange #E5772E and white #E9ECEE (`estoril07`, `ls91100`, `ls91745`). There is a stone/gabion wall behind them in `ls91745`.
- **Concrete**:
  - Pit wall: grey #686665 with stencilled logos.
  - White-painted walls along the outside of the straight (`frosa`, `cr3-1504`).
  - Some walls have dark-green padding, about #0B3A26 (`kf5d7622`).
- **Debris fence**: about 4–5 m tall with galvanised posts every about 3 m [est]. The top 1 m is cranked toward the track. Mesh.
- **Marshal posts**: small white huts about 2.5 m square and about 3 m tall [est], with dark or beige pyramid roofs (`estoril04`–`estoril07`, `a-0d9727`).
- **Bridges**: a white concrete footbridge with lettering (`240111`); an arched footbridge on a berm (`estoril08`); the navy banner bridge over the straight (`frosa`, `cr3-1504`).

### 4.6 Pit building, tower and grandstand

**Pit building** (footprint from OSM)
- 249 × 23 m; 30 bays of 6.7 m.
- White render #E9E9E7, grey plinth and surrounds #868993.
- Roller doors: sky blue, base **#2F86C0** (sampled #4C8BAF and #1780B4). Horizontal slats, with a band of small panels at about 60% of door height.
- Heights [est]: doors about 4 m; white cantilevered parapet at about 7 m; rooftop terrace with railings and a light open-truss canopy reaching about 11–12 m (`estoril10`, `img-footer`).

**Tower / offices**
- Next to the pits at their Parabólica end, on the straight [? exact position].
- 3–4 storeys. White, with dark-grey cladding #52535A and blue-green glass #5A777B / #849494. Flag masts and antennas (`estoril09`, `kf5d4996apng`).

**Main grandstands**
- Across the straight on the +z side: A is 143 × 28 m and B is 119 × 29 m (OSM). Raking concrete tiers about 12–15 m high [est].
- Seats blue #1A66AA, faded areas #5583A1.
- White tubular space-frame roof over part of the stand (`dpng`, `estoril11`).
- Stand A has been closed since 2025, so show it empty.

**Start gantry**
- Grey steel triangular truss #4D5467 [est] spanning the straight, with black light boxes (`estoril11`, `dpng`).

### 4.7 Paddock and pit-lane objects
- **Pit lane** (`estoril10`, `kf5d2684`, `img-7965`): wheeled extinguishers (black and red) at each box, pit-wall lap boards, cones.
- **Garages** (`upc`): sponsor backdrop boards, black tool chests with coloured stripes, red stands, bikes in tyre warmers, folding tables.
- **Paddock** (`base`): team trucks and hospitality, pop-up tents, feather flags, a podium stage, banner fences.
- Optional extras: scooters and golf carts [?], the maintenance tractor (`kez15816`).

### 4.8 Crew and people
- **Team mechanics**: black or dark-grey team polos or softshells, grey work trousers, black or grey trainers, caps. Some wear white/black polos with black shorts (`upc`, `dpng`, `kf5d2684`).
- **Vintage crews**: khaki coveralls with green caps (`ls90381`).
- **Marshals**: orange overalls with silver reflective bands (`img-7965`; also `ak0i4981` [?]).
- **Officials**: white shirts or blue overalls (`kf5d4996apng`, `cr3-2666`).
- **Riders and drivers**: leathers or race suits with white helmets.
- Fireproof team overalls for a car pit crew are not shown in the client set [?].

### 4.9 Lighting

**Morning arrival** (`estoril01`–`estoril11`)
- Very clean Atlantic air. Sky zenith sampled #518AD5 → horizon #94C9F1.
- Neutral-white sun at about 15–25° elevation, coming from behind the grandstands (+z side; vectors in §2).
- The pit facade and blue doors are front-lit. Fence and gantry shadows fall across the pit lane toward the garages, matching `estoril10`.
- Shadows cool blue-grey, high contrast.
- Optional thin mist on the Serra and in hollows: regional radiation fog ([Cascais study](https://www.cascais.pt/sites/default/files/anexos/gerais/2_caract_biofisica_paisagistica_ambiental.pdf), [Parques de Sintra](https://www.parquesdesintra.pt/en/about-us/blog/why-is-there-so-much-fog-and-rain-in-sintra/)). Fog at the circuit itself is only anecdotal ([overtake.gg](https://overtake.gg/news/comments/94891)) [?].

**Golden hour** (`img-2629`, `53380`)
- Sun about 3–8° high, behind the pit building and paddock (−z).
- The pit lane and pit facade fall into shadow. Long shadows of the building and gantry stretch across the straight toward a warmly lit grandstand.
- Key light is deep amber, about #FFA040; lit asphalt reads around #E9821F, and the white barriers glow peach.
- Strong rim light on cars and on the fence mesh.
- Suggested sky gradient: zenith #6E8FC0 → horizon #F2B572 (my suggestion, not sampled). For dusk, use a pale #D5ECFB sky with a pink horizon band.
- Vegetation silhouettes: dark olive-brown #413B35.

## 5. Uncertain or unverified
- Kerb block lengths, building heights, fence post spacing, and the species shares are estimated from photos.
- Barrier block type (Tecpro or foam) is unknown.
- Exact tower position along the pits is not confirmed.
- Elevation comes from DEM data, not an official profile.
- Serra distances come from map knowledge.
- The large building outside T1 (OSM, 208 × 75 m at x −392, z 343) is unidentified.

## Sources
- [Circuito Estoril technical data](https://www.circuito-estoril.pt/en/technical-data/) · [history](https://www.circuito-estoril.pt/en/history/) · [Stand A statement](https://www.circuito-estoril.pt/en/?p=3445)
- [Wikipedia: Circuito do Estoril](https://en.wikipedia.org/wiki/Circuito_do_Estoril) · [ELMS circuit presentation](https://www.europeanlemansseries.com/en/news/estoril-circuit-presentation-5f06df416ded28690c6620e0/9747) · [lapmeta](https://lapmeta.com/de/track/variation/335/track_map) · [grandprix.com](https://www.grandprix.com/circuits/estoril.html)
- OpenStreetMap via Overpass (overpass.kumi.systems), © OSM contributors, ODbL. Ways: 363138868 (Recta da Meta), 564953728 (Pit Boxes), 564953782 / 564953400 (Bancada A / B), 556158048 (Carrascal). Example: https://www.openstreetmap.org/way/564953728
- [OpenTopoData EU-DEM 25 m](https://api.opentopodata.org/v1/eudem25m)
- [CM Cascais biophysical and landscape study (PDF)](https://www.cascais.pt/sites/default/files/anexos/gerais/2_caract_biofisica_paisagistica_ambiental.pdf) · [ULisboa repository, stands between Estoril and Sintra (search summary only)](https://repositorio.ulisboa.pt/bitstreams/fcffed3c-1d28-4bd4-b3b7-3879d5647a3e/download) · [Infopédia: Parque Natural Sintra-Cascais (search summary only)](https://www.infopedia.pt/$parque-natural-de-sintra-cascais)
- Wikipedia: [Pinus pinea](https://en.wikipedia.org/wiki/Pinus_pinea), [Quercus coccifera](https://en.wikipedia.org/wiki/Quercus_coccifera), [Eucalyptus globulus](https://en.wikipedia.org/wiki/Eucalyptus_globulus)
- [Parques de Sintra: fog](https://www.parquesdesintra.pt/en/about-us/blog/why-is-there-so-much-fog-and-rain-in-sintra/) · [overtake.gg column](https://overtake.gg/news/comments/94891)
- Client photos in `/home/user/3d-/estoril/site/media/`, as cited per claim.

## Layout verdict

Yes, as a 2D plan: track.json matches the current 4.182 km GP layout. I checked it against the OpenStreetMap raceway ways; OSM is traced from aerial imagery, so it is not an official survey. After a 65.4° rotation and a 0.998 scale, with no mirroring, every real centre-line point lies within 13.1 m of the track.json line. The mean deviation is about 1–10 m per section, which is less than one track width, and the Variante chicane is included. Length (4182 m against the official 4182.72 m), direction (clockwise) and point order are all correct. The line is a scaled trace of the circuit logo, and the logo itself is faithful to the real track. Not verified: elevation (track.json is flat, while the real circuit spans roughly 116–140 m), compass orientation (the scene's X axis is the main straight, whose real bearing is about 204°), and all of the surroundings. The disclaimer "Ilustração 3D decorativa — não é um mapa do circuito" is therefore stricter than the line needs. I recommend rewording it (for example "traçado fiel; envolvente ilustrativa") rather than removing it, because the terrain, buildings and vegetation stay illustrative.
