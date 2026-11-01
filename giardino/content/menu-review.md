# Menu review – Pizzeria Giardino

This file lists the open points in the four printed menus, and the decisions taken while turning them into HTML. Only the restaurant can resolve the open points. The data lives in `src/content/menu.ts`, the source of truth. `content/menu.json` is generated from it by `node scripts/export-content.mjs`. The machine check against the PDFs is `node scripts/check-menu.mjs`.

## Sources and method

| Menu | File as linked on the live site | Pages | Text layer | How it was read |
|---|---|---|---|---|
| Speisekarte (food) | `Speisekarte-Menu.pdf` (`resource_link_id=124`) | 6, A4 | none (300-dpi scans) | visual transcription from the 300-dpi renders; Tesseract OCR (`deu+fra`) as a cross-check (`content/sources/ocr/speise-00N.txt`) |
| Getränkekarte (drinks) | `Getraenkekarte.pdf` (`15a`) | 6, A4 | none (scans) | same, with matrix prices assigned to size columns by the printed column position (`content/sources/ocr/getraenke-00N.txt`) |
| Speisekarte Kids | `Speisekarte_Kids.pdf` (`158`) | 2, wide | yes (Frisco template 2026 – FRH26242) | visual and text layer (`content/sources/ocr/kids-text-layer.txt`) |
| Dessertkarte | `Dessertkarte.PDF` (`159`) | 2, wide | yes (Frisco template 2026 – FRH26243) | visual and text layer (`content/sources/ocr/dessert-text-layer.txt`) |

Local copies are kept only under `content/raw/pdf/`; the site links to the live PDF URLs. Running `bash scripts/render-pdfs.sh` writes the 300-dpi renders to `content/raw/pdf/<menu>/p-NN.png`; they are gitignored because they can be regenerated (about 106 MB).

**Machine check:** every item's prices and at least 85 % of its German words are found on its page in the OCR output or the text layer. Every price printed on a page belongs to an item or a note. Status: **235/235 entries confirmed.** That is 157 `ocr+visual` and 78 `text-layer+visual`; the flavours and ice novelties are counted in both the dessert and the kids menu.

## Spot checks (BRIEF §5.4) – 18/18 exact

| Printed | Expected | Site (`menu.ts`) | Page | Verification | Result |
|---|---|---|---|---|---|
| Margherita | 18.00 | 18.00 | Speisekarte p. 2 | ocr+visual | exact |
| Gamberoni | 28.00 | 28.00 | Speisekarte p. 2 | ocr+visual | exact |
| Sofia Loren | 28.00 | 28.00 | Speisekarte p. 3 | ocr+visual | exact |
| Niklas | 29.00 | 29.00 | Speisekarte p. 4 | ocr+visual | exact |
| Spaghetti Napoli | 20.00 | 20.00 | Speisekarte p. 5 | ocr+visual | exact |
| Hausgemachte Lasagne | 24.50 | 24.50 | Speisekarte p. 5 | ocr+visual | exact |
| Walliserteller mit Roggenbrot | 30.50 | 30.50 | Speisekarte p. 1 | ocr+visual | exact |
| Slow cooked Entrecote (AUS) | 46.00 | 46.00 | Speisekarte p. 6 | ocr+visual | exact |
| Schweineschnitzel paniert (CH) | 39.00 | 39.00 | Speisekarte p. 6 | ocr+visual | exact |
| Appenzeller 4cl | 8.50 | 4 cl 8.50 | Getränkekarte p. 1 | ocr+visual | exact |
| Gin Tonic 2cl | 11.50 | 2 cl 11.50 | Getränkekarte p. 1 | ocr+visual | exact |
| Coca Cola 2dl / 3dl / 5dl / 1lt | 3.70 / 4.70 / 5.70 / 9.70 | same | Getränkekarte p. 2 | ocr+visual | exact |
| Stange Moretti 3dl | 4.80 | 3 dl 4.80 | Getränkekarte p. 2 | ocr+visual | exact |
| Pinot-Noir Leukersonne 7/10 / 5/10 / 3/8 / 1/10 | 45.50 / 32.50 / 25.00 / 6.50 | same | Getränkekarte p. 3 | ocr+visual | exact |
| Kaffee Creme | 4.40 | 4.40 | Getränkekarte p. 5 | ocr+visual | exact |
| Kindersalat | 6.00 | 6.00 | Kids p. 1 | text-layer+visual | exact |
| Banana Split | 12.90 | 12.90 | Dessertkarte p. 1 | text-layer+visual | exact |
| Kugel (Preis pro Kugel) | 4.00 | 4.00 (dessert and kids) | Dessertkarte p. 2, Kids p. 2 | text-layer+visual | exact |

## Item counts against BRIEF §2

| Menu | BRIEF | Site | Note |
|---|---|---|---|
| Food | 51 dishes: Vorspeisen 7, Aus der Region 2, Pizzen 24, Risotto 2, Teigwaren 13, Fleisch 3 | 51, same split | – |
| Drinks | 14 categories, about 106 lines, about 150 prices | 106 lines in 15 sections | The site splits «Aperitifs» from «Aperitifs ohne Alkohol» and «Walliser Weissweine / Rosé / Rotweine» as printed. |
| Kids | 8 dishes, 9 ice novelties, 13 flavours | 8 dishes, 9 ice items, 13 flavours | The 9 ice items are the 8 Frisco novelties plus «Frappé – Aroma nach Wahl» (kids p. 1: Maxibon Pops, Hello Kitty Sandwich, Cool Lemon, Frappé, Smarties Cornet, Teddy Boy, Dino‘s, Coupe Smiley Oreo, Wonder-Bibi). Nothing is missing. |
| Dessert | 27 coupes | 27: 21 «Coupes & Desserts» including Frappé, 5 «Mit Schuss», 1 Panna Cotta (Hausgemacht) | Plus the same 13 flavours and 8 novelties as the kids leaflet, deduplicated in the data and shown on both menus. |

## Unresolved lines – shown exactly as printed, never guessed

| Item | Printed | What the site shows | Question for the owners |
|---|---|---|---|
| Gemischter Salat vom Büffet (food p. 1) | «Fr. 12.00 Fr. 21.50», no size labels | both prices as printed, marked as two prices | Are these a small and a large plate? |
| Hugo Sprizz, Grapefr’izz (drinks p. 1) | one line, «17% vol Fr. 11.50» | one line, one price | Is CHF 11.50 the price of each of the two drinks? |
| Sirup Kids (drinks p. 2) | «1.00 3.00» in the 2 dl / 3 dl columns | 2 dl 1.00 · 3 dl 3.00 | Please confirm both prices (1.00 looks low). |
| Kaffee GIARDINO (drinks p. 5) | «Fr. 9.60», no description | name and price only | What is in it? (optional description) |
| Alpen Glüh (drinks p. 5) | «Fr. 8.00», no description | name and price only | Same. |
| Hausgemachter Ice Tee (drinks p. 2) | «5.80 7.50» under a 2dl/3dl/5dl/1lt header | 3 dl 5.80 · 5 dl 7.50, from the printed column position | BRIEF lists the partial size matrices as unresolved. Please confirm the sizes. |
| Rivella rot (drinks p. 2) | «5.00 9.80» | 3 dl 5.00 · 1 l 9.80, from the printed column position | Please confirm the sizes. |
| Single-price soft drinks (Coca Zero, Fanta, Rivella blau, Apfelsaft, Apfelschorle) | one price in the 3 dl column | 3 dl 5.00 | Confirm 3 dl. |

**Rule.** BRIEF §5.5 asks for unclear lines to show the item name with «Preis siehe Karte». The site instead shows the printed figures verbatim and flags them; no price is guessed. If the owners prefer «Preis siehe Karte» for these lines, set `review: true` items to render the price-on-request text in `src/pages/Menu.tsx`.

## Hours conflict (decision: website hours shown, PDF meat hours withheld)

- **Food PDF, p. 6:** «Unsere Fleischgerichte – Servieren wir von 11.30 – 14.00 und 17.00 bis 21.00 Uhr» (FR: «Nous servons de 11.30 — 14.00 et de 17.00 au 21.00 heure»).
- **Website (all pages):** «Warme Küche von 11:30 bis 15:00 Uhr und 17:00 bis 21:30 Uhr.»
- **Decision.** The website is the master for hours (BRIEF §2/§4). The site shows the kitchen hours only, and the reservation form offers times inside them. The meat-course window is not shown, neither in the hours list nor as the intro of the «Unsere Fleischgerichte» section.
- **Open question:** are meat dishes really only served until 14.00 and 21.00? If so, the owners can confirm and the line can be restored with its source.

## Dietary and allergen decisions

- **Shown, because printed:**
  - **VEGAN** on the apricot, lemon and raspberry sorbets. These are badges on Dessertkarte p. 2, verified on the render.
  - **«Mocca* – *enthält Haselnuss»** on Dessertkarte p. 2 and Kids p. 2.
  - The allergies sentence on Speisekarte p. 6: «Bei Allergien wenden Sie sich bitte an die Servicemitarbeiter. Danke», in four languages.
- **Kids leaflet.** It prints the same three sorbets without the VEGAN badge, so the kids menu on the site shows them without it too (the shared flavour list drops the marker there). Only the dessert menu shows the mark, with the footnote that cites the source («Vegan laut Dessertkarte: Sorbets Aprikose, Citron und Himbeer»).
  - **Open question:** is the kids-menu sorbet the same vegan product?
- **No dietary filters.** No verified data supports them, so the menu filters (`FILTER_TAGS`) are limited to printed, non-dietary markers: `homemade` where printed, `swiss-meat` (origin CH) and `dyhrberg` (fish logo). The vegan mark is shown on the three sorbets but cannot be used as a filter.
- **No derived markers.** Only what the menus print is marked. The hazelnut note stays on the Mocca flavour; the coupes that contain Mocca ice cream (Jazz Dance, Chocamo, Café Glace, Baileys) are not marked. Descriptions keep the printed words «scharf», «pikant», chilli and spicy salami, but no «spicy» marker or filter is derived from them.
- **Gluten-free.** It is signalled only by the old page title «Glutenfreie Pizzeria im Wallis» and the IG Zöliakie «ohne Gluten» logo of 2014. No menu marks gluten-free dishes. The site shows the Zöliakie label with «please ask the team» and makes no coeliac or health claim.
  - **Questions:** which dishes can be served gluten-free, and is the 2014 certification still valid?
- **Allergens per dish.** None are printed. The site shows only the printed sentence.
- **«Hausgemacht».** It is printed for the three Tagliolini dishes («Hausgemachte Tagliolini»), «Hausgemachte Lasagne», «Hausgemachter Ice Tee» and «Panna Cotta (Hausgemacht)», and is used only there.

## Spelling fixes made while transcribing (printed → shown)

| Menu | Page | Printed | Shown | Why |
|---|---|---|---|---|
| food | 1 | Assiette Méditerranée | Assiette méditerranéenne | French adjective |
| food | 1 | Assiette de Fromage Rebibe | Assiette de rebibes «Badner Alpen» | French plural; German name added in French |
| food | 2 | peperonis (FR) | poivrons | French word for bell peppers |
| food | 3 | Calzone (zugedeckt/ fermé) | Calzone (zugedeckt) / (fermée) | one language per line |
| food | 4 | huile de truffes, tranche de viande séchée | huile de truffe, tranches de viande séchée | French grammar |
| food | 4 | mais (FR) | maïs | French spelling |
| food | 4 | demie portion (FR) | petite portion | matches «kleine Portion» |
| food | 4 | tomates cerise | tomates cerises | French plural |
| food | 5 | a la sauce tomates | à la sauce tomate | French spelling |
| food | 5 | flambés (crevettes) | flambées | French agreement |
| food | 5 | Ruccola | Rucola | spelling used elsewhere on the menu |
| food | 5 | à la bolognese (viande de boeuf) | Penne bolognaise, viande de bœuf | French spelling |
| food | 6 | „Saltim Bocca“ | «Saltimbocca» | usual spelling, as on the French line |
| food | 6 | Poitrine de poulet … (FR line without ham and sage) | au jambon cru et à la sauge | completed from the German line |
| food | 6 | amplificateurs de performance | stimulateurs de performance | French term |
| drinks | 1 | Hollunderblüte | Holunderblüte | German spelling |
| drinks | 2 | Coca Cola | Coca-Cola | brand spelling |
| drinks | 2 | Aqua Panna San Pellegrino | Acqua Panna | brand spelling |
| drinks | 2 | Fusetea | Fuze Tea | brand spelling |
| drinks | 3 | Vins blanc / rosé / rouge du Valais | Vins blancs / rosés / rouges du Valais | French plural |
| drinks | 3 | Maitre de Chais | Maître de Chais | French spelling |
| drinks | 3 | Pinot-Noir | Pinot Noir | usual spelling |
| drinks | 4 | Gran Sasso, Pulia | Gran Sasso, Puglia | Italian region name |
| drinks | 5 | Maroccan Mint | Moroccan Mint | tea name |
| drinks | 6 | Ramazotti | Ramazzotti | brand spelling |
| drinks | 6 | Grand-Marnier | Grand Marnier | brand spelling |
| drinks | 6 | Crème Brulée Fassbind | Crème Brûlée Fassbind | French spelling |
| drinks | 6 | Brandy Vecchina Romagna | Brandy Vecchia Romagna | brand spelling |

## Other notes

- The kids leaflet is titled «Kids World» on its cover (Kids p. 2) and calls the cream supplement «Rahmzuschlag». The dessert leaflet says «Zuschlag frischer Rahm». Both are CHF 1.50.
- The Frisco product photos and brand marks on the kids and dessert leaflets are Nestlé/Frisco property and are not reused (BRIEF §5.3).
- Footnotes are shown with their menu, as printed. They cover origin (CH, AUS), bread from Bäckerei la Bohème, Dyhrberg fish, seafood and smoked-salmon origin, the AUS meat note, the allergies sentence and «MwSt inbegriffen».
- Every price is CHF including VAT and is stored once in integer Rappen in `menu.json`. It is rendered as «CHF 12.90» (narrow no-break space, decimal point) in all four languages.
