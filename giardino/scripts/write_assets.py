# Writes content/assets.json: every original photograph of pizzeriagiardino.ch with its source URL, the original's
# pixel size and checksum (from media/originals, fetched by `npm run fetch`), where the live site used it (liveOn),
# where the new site uses it (usedOn, read from the components in src/), a category, rights and credit, people and
# consent notes, and factual alt texts in four languages. Rerun after changing the components:
#   python3 -I scripts/write_assets.py
import glob, hashlib, json, os, re, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
B = "https://pizzeriagiardino.ch/data/Ressources/"
C = "https://pizzeriagiardino.ch/data/Cache/"
A = []
def add(id, file, year, cat, de, en, fr, it, pages, people=None, url=None, note=None, hero=False, focus="50% 50%"):
    A.append({"id": id, "source": url or (B + file), "file": file, "year": year, "category": cat, "alt": {"de": de, "en": en, "fr": fr, "it": it},
              "liveOn": pages, "people": people, "note": note, "hero": hero, "focus": focus})
# 2012 – interior, HDR series (_J7A…)
add("interior-bar", "1355477987-_J7A0250_1_2_3_4_5_fused.jpg", 2012, "ambience", "Gaststube mit Holzdecke, Hängeleuchten und Bar", "Dining room with a timber ceiling, pendant lights and the bar", "Salle au plafond de bois, avec suspensions et bar", "Sala con soffitto in legno, lampade a sospensione e bar", ["de/allgemein/impressionen"])
add("interior-room", "1355478039-_J7A0132_3_4_5_7_8_9_fused.jpg", 2012, "ambience", "Blick durch die Gaststube zur Bar und zu den Fenstern", "View across the dining room to the bar and the windows", "Vue de la salle vers le bar et les fenêtres", "Vista della sala verso il bar e le finestre", ["de/allgemein/impressionen"])
add("entrance-bar", "1355506397-_J7A0168_69_70_71_72_73_74_fused.jpg", 2012, "ambience", "Eingangsbereich mit Stehtischen und Barhockern", "Entrance area with high tables and bar stools", "Entrée avec tables hautes et tabourets de bar", "Ingresso con tavoli alti e sgabelli", ["de/reservation", "en/bookings", "fr/reservation", "it/prenotazione"])
add("interior-stone", "1355506659-_J7A0256_57_58_59_60_fused.jpg", 2012, "ambience", "Gaststube mit Natursteinwand und gedeckten Tischen", "Dining room with a natural stone wall and laid tables", "Salle avec mur de pierre naturelle et tables dressées", "Sala con parete in pietra naturale e tavoli apparecchiati", ["de/reservation", "en/bookings", "fr/reservation", "it/prenotazione", "de/allgemein/impressionen"])
add("detail-bottle-light", "_src29f786f67147c22604ca0bc6ee1f3192_pard41f122b3f5daa56f9f2f05dd8554b49_dat1355416127.jpeg", 2012, "ambience", "Hängeleuchte aus roten Aperitif-Fläschchen über der Gaststube", "Pendant light made of small red aperitif bottles above the dining room", "Suspension faite de petites bouteilles rouges d’apéritif au-dessus de la salle", "Lampada a sospensione fatta di bottigliette rosse da aperitivo sopra la sala", ["site background (de, en, fr, it)"], url=C + "2/29/29f/29f7/_src29f786f67147c22604ca0bc6ee1f3192_pard41f122b3f5daa56f9f2f05dd8554b49_dat1355416127.jpeg", note="Full-screen background of the current site; only the 3200 px cache copy is online, the original file is not linked.", hero=True, focus="70% 30%")
add("detail-mini-bottles", "_srcc4a4a0297bcc29a9ad80ae23b02d7871_pard41f122b3f5daa56f9f2f05dd8554b49_dat1355416005.jpeg", 2012, "ambience", "Regal «1 Meter» mit Miniaturflaschen von Likören und Bränden", "A “1 Meter” shelf of miniature liqueur and spirit bottles", "Étagère «1 Meter» de mignonnettes de liqueurs et d’eaux-de-vie", "Mensola «1 Meter» con bottigliette mignon di liquori e distillati", ["site background (de, en, fr, it)"], url=C + "c/c4/c4a/c4a4/_srcc4a4a0297bcc29a9ad80ae23b02d7871_pard41f122b3f5daa56f9f2f05dd8554b49_dat1355416005.jpeg", note="Full-screen background of the current site; only the 3200 px cache copy is online.", focus="45% 55%")
# Family Destination graphic
add("family-destination", "1450684058-family.png", 2015, "kids", "Thermi, das Maskottchen der «Family Destination» Leukerbad", "Thermi, mascot of the Leukerbad “Family Destination”", "Thermi, la mascotte de la «Family Destination» Loèche-les-Bains", "Thermi, la mascotte della «Family Destination» Leukerbad", ["de/kids", "en/kids", "fr/enfants", "it/kids"], note="Graphic (label of the destination), not a photograph.")
# 2016 – 5DSR series
add("terrace-flowers", "1474895677-5DSR6281.jpg", 2016, "terrace", "Sonnenterrasse mit pinkfarbenen Blumen und Sonnenschirmen", "Sun terrace with pink flowers and parasols", "Terrasse ensoleillée avec fleurs roses et parasols", "Terrazza soleggiata con fiori rosa e ombrelloni", ["de", "en", "fr", "it"], people="guests in the background, not identifiable")
add("terrace-view", "1474895684-5DSR6265-HDR.jpg", 2016, "terrace", "Terrasse unter dem Glasdach mit Blick in die Berge und dem Schild «Pizzeria»", "Terrace under the glass roof with a view of the mountains and the “Pizzeria” sign", "Terrasse sous le toit vitré, vue sur les montagnes et panneau «Pizzeria»", "Terrazza sotto il tetto in vetro, con vista sulle montagne e l’insegna «Pizzeria»", ["de", "en", "fr", "it", "de/allgemein/impressionen"], people="guests at tables, small", hero=True, focus="50% 60%")
add("door-hours", "1474895692-5DSR6223.jpg", 2016, "ambience", "Giardino-Logo auf der Eingangstür: Öffnungszeiten 11.00–23.00 Uhr, Mittwoch Ruhetag", "The Giardino logo on the entrance door: open 11.00–23.00, closed on Wednesdays", "Logo Giardino sur la porte d’entrée : ouvert de 11 h à 23 h, fermé le mercredi", "Logo Giardino sulla porta d’ingresso: aperto dalle 11.00 alle 23.00, chiuso il mercoledì", ["de", "en", "fr", "it"], focus="40% 50%")
add("entrance-terrace", "1474895697-5DSR6211.jpg", 2016, "terrace", "Eingang mit Terrasse, Pflanzen und Schild «Giardino»", "Entrance with terrace, plants and the “Giardino” sign", "Entrée avec terrasse, plantes et enseigne «Giardino»", "Ingresso con terrazza, piante e insegna «Giardino»", ["de", "en", "fr", "it", "de/gastgeber", "en/host", "fr/hotes", "it/la-casa"])
add("pirate-masts", "1474898022-5DSR6307.jpg", 2016, "kids", "Masten des Piratenschiffs vor den Felswänden über Leukerbad", "Masts of the pirate ship against the cliffs above Leukerbad", "Mâts du bateau de pirates devant les falaises au-dessus de Loèche-les-Bains", "Alberi della nave dei pirati davanti alle pareti rocciose sopra Leukerbad", ["de/allgemein/impressionen"])
add("door-lettering", "1474898047-5DSR6219.jpg", 2016, "ambience", "Schriftzug «Giardino Pizzeria» auf der Glastür", "“Giardino Pizzeria” lettering on the glass door", "Inscription «Giardino Pizzeria» sur la porte vitrée", "Scritta «Giardino Pizzeria» sulla porta a vetri", ["de/gastgeber", "en/host", "fr/hotes", "it/la-casa", "de/allgemein/impressionen"], note="Uploaded twice on the current site (1474898047 and 1474899873); identical files.")
add("terrace-roof", "1474898052-5DSR6200.jpg", 2016, "terrace", "Blumen auf der Terrasse unter dem Glasdach", "Flowers on the terrace under the glass roof", "Fleurs sur la terrasse sous le toit vitré", "Fiori sulla terrazza sotto il tetto in vetro", ["de/allgemein/impressionen"])
add("terrace-blooms", "1474898055-5DSR6195.jpg", 2016, "terrace", "Pinkfarbene Blüten vor der Terrasse", "Pink blooms in front of the terrace", "Fleurs roses devant la terrasse", "Fiori rosa davanti alla terrazza", ["de/allgemein/impressionen"])
add("toy-cars", "1474898106-5DSR5947.jpg", 2016, "kids", "Spielzeugautos und Pylonen im Spielzimmer", "Toy cars and traffic cones in the playroom", "Petites voitures et cônes dans la salle de jeux", "Macchinine e coni nella sala giochi", ["de/allgemein/impressionen"])
add("pirate-kids", "1474898970-5DSR6139.jpg", 2016, "kids", "Kinder auf dem Piratenschiff", "Children on the pirate ship", "Enfants sur le bateau de pirates", "Bambini sulla nave dei pirati", ["de/kids", "en/kids", "fr/enfants", "it/kids"], people="identifiable children – published on the current site; consent should be reconfirmed")
add("pirate-climb", "1474898973-5DSR6113.jpg", 2016, "kids", "Ein Kind klettert am Piratenschiff", "A child climbing the pirate ship", "Un enfant grimpe sur le bateau de pirates", "Un bambino si arrampica sulla nave dei pirati", ["de/kids", "en/kids", "fr/enfants", "it/kids"], people="identifiable child – published on the current site; consent should be reconfirmed")
add("pirate-slide", "1474898981-5DSR6101.jpg", 2016, "kids", "Ein Kind auf der roten Rutsche des Piratenschiffs", "A child on the pirate ship’s red slide", "Un enfant sur le toboggan rouge du bateau de pirates", "Un bambino sullo scivolo rosso della nave dei pirati", ["de/kids", "en/kids", "fr/enfants", "it/kids"], people="identifiable child – published on the current site; consent should be reconfirmed")
# 2025 – shoot of 20 June 2025
S = "1750{}-2025-06-20_giardino{}_2048px.jpg"
add("ship-mountains", "1750941286-2025-06-20_giardino-8940_2048px.jpg", 2025, "kids", "Spielplatz mit Piratenschiff und Rutsche vor den Bergen", "Playground with pirate ship and slide in front of the mountains", "Aire de jeux avec bateau de pirates et toboggan devant les montagnes", "Parco giochi con nave dei pirati e scivolo davanti alle montagne", ["de/kids", "en/kids", "fr/enfants", "it/kids"])
add("ship-slide", "1750941305-2025-06-20_giardino-8933_2048px.jpg", 2025, "kids", "Piratenschiff mit Rutsche unter den Felswänden", "Pirate ship with slide beneath the cliffs", "Bateau de pirates avec toboggan au pied des falaises", "Nave dei pirati con scivolo ai piedi delle pareti rocciose", ["de/kids", "en/kids", "fr/enfants", "it/kids"])
add("ship-cliffs", "1750941318-2025-06-20_giardino-8931_2048px.jpg", 2025, "kids", "Piratenschiff und Spielplatz, dahinter die Felswände über Leukerbad", "Pirate ship and playground, with the cliffs above Leukerbad behind", "Bateau de pirates et aire de jeux, avec les falaises au-dessus de Loèche-les-Bains", "Nave dei pirati e parco giochi, sullo sfondo le pareti rocciose sopra Leukerbad", ["de/kids", "en/kids", "fr/enfants", "it/kids", "de/allgemein/impressionen"], hero=True, focus="50% 40%", note="Uploaded twice on the current site (1750941318 and 1750943528); identical files.")
add("ship-above", "1750941350-2025-06-20_giardino_70200.-8591_2048px.jpg", 2025, "kids", "Spielplatz mit Piratenschiff von oben", "Playground and pirate ship from above", "Aire de jeux et bateau de pirates vus d’en haut", "Parco giochi e nave dei pirati visti dall’alto", ["de/kids", "en/kids", "fr/enfants", "it/kids"])
add("playroom-football", "1750941424-2025-06-20_giardino-8895_2048px.jpg", 2025, "kids", "Spielzimmer mit Tischfussball", "Playroom with table football", "Salle de jeux avec baby-foot", "Sala giochi con calcio balilla", ["de/kids", "en/kids", "fr/enfants", "it/kids"])
add("playroom-climber", "1750941448-2025-06-20_giardino-8920_2048px.jpg", 2025, "kids", "Spielzimmer mit Kletterturm und Rutsche", "Playroom with climbing tower and slide", "Salle de jeux avec tour d’escalade et toboggan", "Sala giochi con torre per arrampicarsi e scivolo", ["de", "en", "fr", "it", "de/kids", "en/kids", "fr/enfants", "it/kids"], hero=True)
add("playroom-mural", "1750941455-2025-06-20_giardino-8921_2048px.jpg", 2025, "kids", "Spielzimmer mit Wandbild und Spielblöcken", "Playroom with a mural and play blocks", "Salle de jeux avec fresque murale et blocs de jeu", "Sala giochi con murale e blocchi da gioco", ["de/kids", "en/kids", "fr/enfants", "it/kids"])
add("playroom-ride-on", "1750941506-2025-06-20_giardino-8899_2048px.jpg", 2025, "kids", "Schwarzes Rutschauto im Spielzimmer", "Black ride-on car in the playroom", "Porteur noir dans la salle de jeux", "Macchinina cavalcabile nera nella sala giochi", ["de", "en", "fr", "it", "de/kids", "en/kids", "fr/enfants", "it/kids"])
add("dish-chicken-risotto", "1750941770-2025-06-20_giardino_70200.-8347_2048px.jpg", 2025, "food", "Pouletbrust mit Risotto und dunkler Sauce", "Chicken breast with risotto and a dark sauce", "Poitrine de poulet, risotto et sauce brune", "Petto di pollo con risotto e salsa scura", ["de/essen-geniessen", "en/eat-enjoy", "fr/manger-et-savourer", "it/mangia-e-divertiti"])
add("dish-spaghetti-bacon", "1750941771-2025-06-20_giardino_70200.-8361_2048px.jpg", 2025, "food", "Spaghetti mit Speck in cremiger Sauce", "Spaghetti with bacon in a creamy sauce", "Spaghettis au lard, sauce crémeuse", "Spaghetti con pancetta in salsa cremosa", ["de/essen-geniessen", "en/eat-enjoy", "fr/manger-et-savourer", "it/mangia-e-divertiti"])
add("dessert-coupe", "1750941788-2025-06-20_giardino_70200.-8645_2048px.jpg", 2025, "food", "Glace mit Früchten und Waffelröllchen", "Ice cream with fruit and a rolled wafer", "Glace aux fruits et cigarette russe", "Gelato con frutta e cialda arrotolata", ["de/essen-geniessen", "en/eat-enjoy", "fr/manger-et-savourer", "it/mangia-e-divertiti"])
add("dessert-panna-cotta", "1750941788-2025-06-20_giardino_70200.-8649_2048px.jpg", 2025, "food", "Panna Cotta mit Beerensauce im Glas", "Panna cotta with berry sauce in a glass", "Panna cotta et coulis de baies en verrine", "Panna cotta con salsa ai frutti di bosco nel bicchiere", ["de", "en", "fr", "it", "de/essen-geniessen", "en/eat-enjoy", "fr/manger-et-savourer", "it/mangia-e-divertiti"])
add("pizza-egg", "1750941839-2025-06-20_giardino_70200.-8539_2048px.jpg", 2025, "food", "Pizza mit Ei, Peperoni, Artischocken, Sardellen und Schinken", "Pizza with egg, bell peppers, artichokes, anchovies and ham", "Pizza à l’œuf, poivrons, artichauts, anchois et jambon", "Pizza con uovo, peperoni, carciofi, acciughe e prosciutto", ["de/essen-geniessen", "en/eat-enjoy", "fr/manger-et-savourer", "it/mangia-e-divertiti"])
add("starter-salmon", "1750942100-2025-06-20_giardino_70200.-8456_2048px.jpg", 2025, "food", "Rauchlachs mit Dillsenfsauce, Kapernäpfeln, Kirschtomaten und Zitrone auf einer Schieferplatte", "Smoked salmon with dill-mustard sauce, caper berries, cherry tomatoes and lemon on a slate", "Saumon fumé, sauce aneth-moutarde, câpres, tomates cerises et citron sur une ardoise", "Salmone affumicato con salsa all’aneto e senape, capperi, pomodorini e limone su ardesia", ["de/essen-geniessen", "en/eat-enjoy", "fr/manger-et-savourer", "it/mangia-e-divertiti"], hero=True)
add("dish-prawns", "1750942250-2025-06-20_giardino_70200.-8412_2048px.jpg", 2025, "food", "Spaghetti mit Riesencrevetten in einem türkisfarbenen Teller", "Spaghetti with king prawns in a turquoise bowl", "Spaghettis aux grosses crevettes dans une assiette turquoise", "Spaghetti con gamberoni in un piatto turchese", ["de/essen-geniessen", "en/eat-enjoy", "fr/manger-et-savourer", "it/mangia-e-divertiti"], hero=True)
add("dish-pesto", "1750942299-2025-06-20_giardino_70200.-8377_2048px.jpg", 2025, "food", "Spaghetti mit grünem Pesto", "Spaghetti with green pesto", "Spaghettis au pesto vert", "Spaghetti al pesto verde", ["de/essen-geniessen", "en/eat-enjoy", "fr/manger-et-savourer", "it/mangia-e-divertiti"])
add("pizza-ham-rocket", "1750942387-2025-06-20_giardino_70200.-8531_2048px.jpg", 2025, "food", "Pizza mit Rohschinken, Rucola und Grana-Spänen", "Pizza with cured ham, rocket and grana shavings", "Pizza au jambon cru, roquette et copeaux de grana", "Pizza con prosciutto crudo, rucola e scaglie di grana", ["de/essen-geniessen", "en/eat-enjoy", "fr/manger-et-savourer", "it/mangia-e-divertiti"], hero=True)
add("aerial-village", "1750943367-2025-06-20_giardino_luft--4_2048px.jpg", 2025, "terrace", "Luftaufnahme: das Giardino mit dem Spielplatz, dahinter Leukerbad unter den Felswänden", "Aerial view: Giardino and its playground, with Leukerbad and the cliffs behind", "Vue aérienne : le Giardino et son aire de jeux, avec Loèche-les-Bains au pied des falaises", "Veduta aerea: il Giardino con il parco giochi, sullo sfondo Leukerbad ai piedi delle pareti rocciose", ["de", "en", "fr", "it", "de/allgemein/impressionen"], hero=True, focus="58% 62%")
add("aerial-front", "1750943391-2025-06-20_giardino_luft--22_2048px.jpg", 2025, "terrace", "Luftaufnahme von Haus, Terrasse und Spielplatz", "Aerial view of the building, terrace and playground", "Vue aérienne de la maison, de la terrasse et de l’aire de jeux", "Veduta aerea della casa, della terrazza e del parco giochi", ["de/allgemein/impressionen"])
add("ship-portrait", "1750943490-2025-06-20_giardino_70200.-8600_2048px.jpg", 2025, "kids", "Piratenschiff, dahinter Häuser von Leukerbad und die Berge", "Pirate ship with houses of Leukerbad and the mountains behind", "Bateau de pirates, avec des maisons de Loèche-les-Bains et les montagnes", "Nave dei pirati, sullo sfondo case di Leukerbad e le montagne", ["de/allgemein/impressionen"])
add("playroom-slide", "1750943509-2025-06-20_giardino-8900_2048px.jpg", 2025, "kids", "Spielzimmer mit Rutsche und rotem Rutschauto", "Playroom with slide and a red ride-on car", "Salle de jeux avec toboggan et porteur rouge", "Sala giochi con scivolo e macchinina rossa", ["de/allgemein/impressionen"])
add("hosts", "1750943766-2025-06-20_giardino-8915_2048px.jpg", 2025, "hosts", "Pascal und Anja Loretan an der Bar des Giardino", "Pascal and Anja Loretan at the Giardino bar", "Pascal et Anja Loretan au bar du Giardino", "Pascal e Anja Loretan al bar del Giardino", ["de", "en", "fr", "it", "de/gastgeber", "en/host", "fr/hotes", "it/la-casa", "de/allgemein/impressionen"], people="the hosts (identified from the Gastgeber page and the rro.ch interview; please confirm)", hero=True, focus="62% 45%", note="Uploaded twice on the current site (1750943766 and 1750944045); identical files.")
add("pizza-rocket", "1750943817-2025-06-20_giardino_70200.-8355_2048px.jpg", 2025, "food", "Pizza mit Rucola, Kirschtomaten und Mozzarella", "Pizza with rocket, cherry tomatoes and mozzarella", "Pizza à la roquette, tomates cerises et mozzarella", "Pizza con rucola, pomodorini e mozzarella", ["de", "en", "fr", "it", "de/allgemein/impressionen"], hero=True)
add("detail-spaghetti", "1750943817-2025-06-20_giardino_70200.-8370_2048px.jpg", 2025, "food", "Spaghetti in einem türkisblauen Teller, daneben Gabel und Messer", "Spaghetti in a turquoise bowl beside a fork and knife", "Spaghettis dans une assiette turquoise, à côté d’une fourchette et d’un couteau", "Spaghetti in un piatto turchese accanto a forchetta e coltello", ["de/allgemein/impressionen"])
add("dish-schnitzel", "1750943817-2025-06-20_giardino_70200.-8379_2048px.jpg", 2025, "food", "Paniertes Schnitzel mit Zitrone und Pommes Frites", "Breaded schnitzel with lemon and French fries", "Escalope panée, citron et pommes frites", "Cotoletta impanata con limone e patatine fritte", ["de/allgemein/impressionen"])
add("dish-lasagne", "1750943817-2025-06-20_giardino_70200.-8445_2048px.jpg", 2025, "food", "Lasagne in der Auflaufform mit Kirschtomate", "Lasagne in a baking dish with a cherry tomato", "Lasagnes dans un plat à gratin avec une tomate cerise", "Lasagne nella pirofila con un pomodorino", ["de/allgemein/impressionen"])
add("dish-penne", "1750943818-2025-06-20_giardino_70200.-8406_2048px.jpg", 2025, "food", "Penne mit Tomatensauce in einem gemusterten Teller", "Penne with tomato sauce in a patterned bowl", "Penne à la sauce tomate dans une assiette décorée", "Penne al pomodoro in un piatto decorato", ["de/allgemein/impressionen"])
add("garden-view", "1750943878-2025-06-20_giardino_70200.-8618_2048px.jpg", 2025, "terrace", "Blick durch das Laub auf die Pizzeria, das Hotel Heilquelle und die Berge", "View through the leaves to the pizzeria, Hotel Heilquelle and the mountains", "Vue à travers le feuillage sur la pizzeria, l’hôtel Heilquelle et les montagnes", "Vista tra le foglie sulla pizzeria, l’hotel Heilquelle e le montagne", ["de", "en", "fr", "it", "de/allgemein/impressionen"], hero=True, focus="62% 55%")
add("aerial-terrace", "1750943915-2025-06-20_giardino_luft--5_2048px.jpg", 2025, "terrace", "Luftaufnahme von Terrasse, Spielplatz und Nachbarhäusern", "Aerial view of the terrace, playground and neighbouring buildings", "Vue aérienne de la terrasse, de l’aire de jeux et des maisons voisines", "Veduta aerea della terrazza, del parco giochi e delle case vicine", ["de/allgemein/impressionen"])
add("dish-penne-chili", "1750943969-2025-06-20_giardino_70200.-8568_2048px.jpg", 2025, "food", "Penne mit Tomatensauce und einer Chilischote", "Penne with tomato sauce and a chilli pepper", "Penne à la sauce tomate et un piment", "Penne al pomodoro con un peperoncino", ["de/allgemein/impressionen"])

# ---------------------------------------------------------------------------------------------------------------
# original pixel size and checksum (media/originals is gitignored; without it the previous values are kept)
OUT = os.path.join(ROOT, "content/assets.json")
previous = {}
if os.path.exists(OUT):
    previous = {a["id"]: a for a in json.load(open(OUT, encoding="utf-8")).get("assets", [])}
try:
    from PIL import Image
except ImportError:
    Image = None
for a in A:
    path = os.path.join(ROOT, "media", "originals", a["file"])
    if os.path.exists(path) and Image:
        with Image.open(path) as im:
            w, h = im.size
        data = open(path, "rb").read()
        a["original"] = {"width": w, "height": h, "bytes": len(data), "sha256": hashlib.sha256(data).hexdigest()}
    elif previous.get(a["id"], {}).get("original"):
        a["original"] = previous[a["id"]]["original"]

# ---------------------------------------------------------------------------------------------------------------
# rights, credit and consent (BRIEF §2, §12)
RIGHTS = "© Pizzeria Giardino – published on pizzeriagiardino.ch; used only for this unofficial design proposal"
for a in A:
    if a["id"] == "family-destination":
        a["rights"] = "Leukerbad «Family Destination» label with the mascot Thermi – a destination graphic, not the restaurant's photograph; shown as on the live Kids page"
        a["credit"] = None
        a["creditNote"] = "graphic of the destination label; no photographer"
        continue
    a["rights"] = RIGHTS
    if a["year"] in (2012, 2016):
        a["credit"] = "Christian Pfammatter, Visp"
        a["creditNote"] = "The Impressum credits Christian Pfammatter for the photography without naming the photos; attributed to the 2012 and 2016 sets – to confirm with the owners"
    else:
        a["credit"] = None
        a["creditNote"] = "uncredited on the live site (2025 photo and drone set)"
IDENTIFIABLE = {
    "pirate-kids": "identifiable children",
    "pirate-climb": "identifiable child",
    "pirate-slide": "identifiable child",
    "hosts": "the hosts, identifiable",
    "terrace-flowers": "guests at the tables, small but recognisable to people who know them",
    "terrace-view": "guests at the tables, small but recognisable to people who know them",
}
for a in A:
    if a["id"] in IDENTIFIABLE:
        a["consent"] = "consent to confirm with owners"
        a["consentWhy"] = IDENTIFIABLE[a["id"]]
    else:
        a["consent"] = None
    if a["id"] == "terrace-blooms" and not a.get("people"):
        a["people"] = "guests far out of focus in the background, not identifiable"

# ---------------------------------------------------------------------------------------------------------------
# usedOn: where the new site shows each image, read from the components (context-aware, so a page key such as
# "hosts" or a gallery category is not mistaken for the photo with the same id)
IDS = {a["id"] for a in A}
PAGE_OF_FILE = {
    "src/home/Hero.tsx": "home",
    "src/home/Sections.tsx": "home",
    "src/pages/Kids.tsx": "kids",
    "src/pages/Hosts.tsx": "hosts",
    "src/pages/Reserve.tsx": "reserve",
    "src/pages/Visit.tsx": {"Visit": "visit", "ContactPage": "contact"},
    "src/pages/Info.tsx": {"Hotels": "hotels", "Jobs": "jobs", "Press": "press", "Tour": "tour", "Imprint": "imprint", "Privacy": "privacy", "NotFound": "404"},
    "src/pages/Menu.tsx": "menu",
    "src/seo.ts": "og:image",
}
ARRAY_SECTION = {"JOURNEY": "Kitchen (dish journey)", "MOSAIC": "GalleryTeaser", "photos": "Story", "PLAYROOM": "playroom", "SHIP": "pirate ship", "ARCHIVE": "2016 archive"}
used = {i: set() for i in IDS}
def enclosing(src, pos):
    m = None
    for m2 in re.finditer(r"(?:export\s+)?(?:default\s+)?function\s+(\w+)", src[:pos]):
        m = m2
    return m.group(1) if m else None
def where(fname, src, pos, array=None):
    page = PAGE_OF_FILE.get(fname)
    fn = enclosing(src, pos)
    if isinstance(page, dict):
        return page.get(fn, fn or "?")
    if page == "home":
        return f"home: {ARRAY_SECTION.get(array) or ('Hero' if fname.endswith('Hero.tsx') else fn or '?')}"
    if page in ("kids",) and array:
        return f"kids: {ARRAY_SECTION.get(array, array)}"
    return page or fname
for fname in sorted(glob.glob(os.path.join(ROOT, "src", "**", "*.ts*"), recursive=True)):
    rel = os.path.relpath(fname, ROOT)
    if rel.endswith(".json"):
        continue
    src = open(fname, encoding="utf-8").read()
    for m in re.finditer(r'(?:<Img\b[^>]*?\sid=|photo=|poster=|photo:\s*|PHOTO\s*=\s*)"([a-z0-9-]+)"', src):
        if m.group(1) in IDS:
            used[m.group(1)].add(where(rel, src, m.start()))
    if rel == "src/seo.ts":
        # social preview image per page, and the image list of the Restaurant JSON-LD (launch mode only)
        for line in src.splitlines():
            if "images/" in line:
                label = "JSON-LD image (launch mode)" if re.search(r"\bimage:\s*\[", line) else "og:image"
                for q in re.findall(r'"([a-z0-9-]+)"', line) + re.findall(r"images/([a-z0-9-]+?)-\d+\.webp", line):
                    if q in IDS:
                        used[q].add(label)
        continue
    for m in re.finditer(r'images/([a-z0-9-]+?)-\d+\.webp', src):
        if m.group(1) in IDS:
            used[m.group(1)].add(where(rel, src, m.start()))
    for m in re.finditer(r"const\s+(\w+)(?::[^=]+)?\s*=\s*\[(.*?)\];", src, re.S):
        quoted = re.findall(r'"([a-z0-9-]+)"', m.group(2))
        ids = [q for q in quoted if q in IDS]
        if len(ids) >= 2 and len(ids) >= 0.6 * len([q for q in quoted if not q in ("food", "drinks", "desserts", "kids") and not re.match(r"^(vorspeisen|pizzen|pasta|fleisch|coupes|risotto)$", q)]):
            for q in ids:
                used[q].add(where(rel, src, m.start(), m.group(1)))
    if rel == "src/pages/Gallery.tsx" and "ASSET_LIST.filter" in src:
        for i in IDS - {"family-destination"}:
            used[i].add("gallery (all photographs, with lightbox)")
for a in A:
    a["usedOn"] = sorted(used[a["id"]])

photos = [a for a in A if a["id"] != "family-destination"]
placed = [a for a in photos if a["usedOn"]]
outside = [a for a in photos if any(u != "gallery (all photographs, with lightbox)" for u in a["usedOn"])]
out = {
    "note": "Every original photograph of pizzeriagiardino.ch (crawled 01.11.2026): 47 distinct files in data/Ressources (4 more are byte-identical re-uploads; one of the 47 is the Family Destination graphic) plus the two full-screen site backgrounds that exist only as 3200 px cache copies – 48 photographs and 1 graphic. liveOn = pages of the live site; usedOn = places on the new site (every page exists in de/en/fr/it). Consent notes are for the owners.",
    "counts": {"photographs": len(photos), "placed": len(placed), "placedOutsideGallery": len(outside), "graphics": len(A) - len(photos), "consentToConfirm": sum(1 for a in A if a.get("consent"))},
    "assets": A,
}
json.dump(out, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
open(os.path.join(ROOT, "content", "raw", "originals.sha256"), "w").write(
    "".join(f"{a['original']['sha256']}  media/originals/{a['file']}\n" for a in A if a.get("original")))
print(len(A), "assets ·", len(placed), "of", len(photos), "photographs placed ·", len(outside), "outside the gallery ·",
      out["counts"]["consentToConfirm"], "with consent to confirm")
for a in photos:
    if not a["usedOn"]:
        print("  not placed:", a["id"])
