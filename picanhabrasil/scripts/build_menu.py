"""content/raw/foods.json (the live menu of picanha-brasil.ch, captured from its ordering widget on 30.10.2026)
→ content/menu.json: sections, dishes, variants and prices exactly as published, plus the German descriptions
translated into en / pt / fr / it. Dish names stay Portuguese, as on the restaurant's menu.

Run: python3 -I scripts/build_menu.py
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
raw = json.loads((ROOT / "content/raw/foods.json").read_text(encoding="utf-8"))

SECTION = {
    88: ("vorspeisen", {"de": "Vorspeisen", "en": "Starters", "pt": "Tira-gosto", "fr": "Entrées", "it": "Antipasti"}),
    89: ("hauptspeisen", {"de": "Hauptspeisen", "en": "Main courses", "pt": "Pratos principais", "fr": "Plats principaux", "it": "Piatti principali"}),
    90: ("desserts", {"de": "Desserts", "en": "Desserts", "pt": "Sobremesas", "fr": "Desserts", "it": "Dessert"}),
    91: ("ohne-alkohol", {"de": "Getränke ohne Alkohol", "en": "Soft drinks & juices", "pt": "Bebidas sem álcool", "fr": "Boissons sans alcool", "it": "Bevande analcoliche"}),
    92: ("mit-alkohol", {"de": "Alkoholische Getränke", "en": "Beer, cocktails & wine", "pt": "Bebidas alcoólicas", "fr": "Boissons alcoolisées", "it": "Bevande alcoliche"}),
}
SECTION_NOTE = {
    89: {
        "de": "Alle Gerichte sind pro Person und werden mit Reis, Bohnen und Pommes oder Maniok serviert.",
        "en": "Every dish is for one person and comes with rice, beans and fries or cassava.",
        "pt": "Todos os pratos são individuais e são servidos com arroz, feijão e batata frita ou mandioca.",
        "fr": "Chaque plat est pour une personne et servi avec riz, haricots et frites ou manioc.",
        "it": "Ogni piatto è per una persona ed è servito con riso, fagioli e patatine o manioca.",
    },
    92: {
        "de": "Kein Verkauf von Alkohol an Minderjährige.",
        "en": "No alcohol is sold to minors.",
        "pt": "Proibida a venda de bebidas alcoólicas a menores.",
        "fr": "Pas de vente d'alcool aux mineurs.",
        "it": "Nessuna vendita di alcolici ai minorenni.",
    },
}

# German text as published → en, pt, fr, it
T = {
    "Teigtaschen panniert & frittiert": ("Breaded & fried savoury dough pockets", "Salgado empanado e frito", "Chaussons panés et frits", "Fagottini impanati e fritti"),
    "Teigtaschen frittiert": ("Fried pastry pockets", "Pastel frito", "Chaussons frits", "Fagottini fritti"),
    "Spiegelei": ("Fried egg", "Ovo frito", "Œuf au plat", "Uovo al tegamino"),
    "Rindfleischrippen mit Maniok Suppe": ("Beef rib and cassava soup", "Caldo de costela com mandioca", "Soupe de côtes de bœuf au manioc", "Zuppa di costine di manzo e manioca"),
    "Crevetten-Mais-Suppe": ("Prawn and corn soup", "Caldo de milho com camarão", "Soupe de maïs aux crevettes", "Zuppa di mais e gamberi"),
    "Frittierte Kartoffeln oder Maniok": ("Fried potatoes or cassava", "Batata ou mandioca frita", "Pommes de terre ou manioc frits", "Patate o manioca fritte"),
    "Frittierte Banane": ("Fried banana", "Banana frita", "Banane frite", "Banana fritta"),
    "Salat": ("Salad", "Salada", "Salade", "Insalata"),
    "Ovo, queijo parmesão e peito de frango (Ei, Käse, Parmesan, Pouletbrust)": (
        "Egg, cheese, parmesan and chicken breast", "Ovo, queijo parmesão e peito de frango",
        "Œuf, fromage, parmesan et blanc de poulet", "Uovo, formaggio, parmigiano e petto di pollo"),
    "Rindshüft, kleine Portion, 150g, mit Reis und Bohnen": ("Beef rump cap, small portion, 150 g, with rice and beans", "Picanha, porção pequena, 150 g, com arroz e feijão", "Aiguillette de rumsteck, petite portion, 150 g, avec riz et haricots", "Codone di manzo, porzione piccola, 150 g, con riso e fagioli"),
    "Rindshüft, grosse Portion, 200g, mit Reis und Bohnen": ("Beef rump cap, large portion, 200 g, with rice and beans", "Picanha, porção grande, 200 g, com arroz e feijão", "Aiguillette de rumsteck, grande portion, 200 g, avec riz et haricots", "Codone di manzo, porzione grande, 200 g, con riso e fagioli"),
    "Trockenfleisch, kleine Portion, 150g, mit Reis und Bohnen": ("Dried salted beef, small portion, 150 g, with rice and beans", "Carne seca, porção pequena, 150 g, com arroz e feijão", "Viande séchée, petite portion, 150 g, avec riz et haricots", "Carne secca, porzione piccola, 150 g, con riso e fagioli"),
    "Trockenfleisch, grosse Portion, 200g, mit Reis und Bohnen": ("Dried salted beef, large portion, 200 g, with rice and beans", "Carne seca, porção grande, 200 g, com arroz e feijão", "Viande séchée, grande portion, 200 g, avec riz et haricots", "Carne secca, porzione grande, 200 g, con riso e fagioli"),
    "Rinderkotelett, 380g, mit Reis und Bohnen": ("Beef chop, 380 g, with rice and beans", "Bisteca bovina, 380 g, com arroz e feijão", "Côte de bœuf, 380 g, avec riz et haricots", "Costata di manzo, 380 g, con riso e fagioli"),
    "Pouletbrust, 180g, mit Reis und Bohnen": ("Chicken breast, 180 g, with rice and beans", "Peito de frango, 180 g, com arroz e feijão", "Blanc de poulet, 180 g, avec riz et haricots", "Petto di pollo, 180 g, con riso e fagioli"),
    "Rinderleber, 180g, mit Reis und Bohnen": ("Beef liver with onions, 180 g, with rice and beans", "Fígado bovino acebolado, 180 g, com arroz e feijão", "Foie de bœuf aux oignons, 180 g, avec riz et haricots", "Fegato di manzo con cipolle, 180 g, con riso e fagioli"),
    "Fischfilet, 180g, mit Reis und Bohnen": ("Fish fillet, 180 g, with rice and beans", "Filé de peixe, 180 g, com arroz e feijão", "Filet de poisson, 180 g, avec riz et haricots", "Filetto di pesce, 180 g, con riso e fagioli"),
    "Crevetten mit Knoblauch, 9 Stk, mit Reis und Bohnen": ("Garlic prawns, 9 pieces, with rice and beans", "Camarão ao alho, 9 unidades, com arroz e feijão", "Crevettes à l'ail, 9 pièces, avec riz et haricots", "Gamberi all'aglio, 9 pezzi, con riso e fagioli"),
    "Stockfisch mit Peperoni, mit Reis und Bohnen": ("Salt cod with peppers, with rice and beans", "Bacalhau com pimentão, com arroz e feijão", "Morue aux poivrons, avec riz et haricots", "Baccalà con peperoni, con riso e fagioli"),
    "Bohneneintopf - Nur Samstags und Sonntags": ("Black bean and meat stew – Saturdays and Sundays only", "Feijoada – só aos sábados e domingos", "Ragoût de haricots noirs – samedi et dimanche uniquement", "Stufato di fagioli neri – solo sabato e domenica"),
    "Passionsfruchtmousse": ("Passion fruit mousse", "Mousse de maracujá", "Mousse aux fruits de la passion", "Mousse al frutto della passione"),
    "Kondensmilchpudding": ("Condensed milk flan", "Pudim de leite condensado", "Flan au lait concentré", "Budino al latte condensato"),
    "Kuchen": ("Cake", "Bolo", "Gâteau", "Torta"),
}
STYLE = {
    "Picanha (Rindshuft)": ("Picanha (beef rump cap)", "Picanha", "Picanha (aiguillette de rumsteck)", "Picanha (codone di manzo)"),
    "Carne-Seca (Trockenfleisch)": ("Carne seca (dried beef)", "Carne-seca", "Carne seca (viande séchée)", "Carne seca (carne secca)"),
    "Frango (Poulet)": ("Frango (chicken)", "Frango", "Frango (poulet)", "Frango (pollo)"),
    "Queijo (Käse)": ("Queijo (cheese)", "Queijo", "Queijo (fromage)", "Queijo (formaggio)"),
    "Carne (Rindfleisch)": ("Carne (beef)", "Carne", "Carne (bœuf)", "Carne (manzo)"),
    "Gemischt": ("Mixed", "Misto", "Mixte", "Misto"),
    "Porção Pequena (kleine Portion)": ("Porção pequena (small)", "Porção pequena", "Porção pequena (petite)", "Porção pequena (piccola)"),
    "Porção Grande (grosse Portion)": ("Porção grande (large)", "Porção grande", "Porção grande (grande)", "Porção grande (grande)"),
    "Mit Pommes": ("With fries", "Com batata frita", "Avec frites", "Con patatine"),
    "Mit Maniok": ("With cassava", "Com mandioca", "Avec manioc", "Con manioca"),
    "Mit Reis": ("With rice", "Com arroz", "Avec riz", "Con riso"),
    "Mit frittierten Bananen": ("With fried banana", "Com banana frita", "Avec bananes frites", "Con banane fritte"),
    "Mit Kohl": ("With collard greens", "Com couve", "Avec chou", "Con cavolo"),
    "Mit Salat Vinaigrette": ("With vinaigrette salad", "Com vinagrete", "Avec salade vinaigrette", "Con insalata vinaigrette"),
    "Limette": ("Lime", "Limão", "Citron vert", "Lime"),
    "Orange": ("Orange", "Laranja", "Orange", "Arancia"),
}
NAME = {  # only the German parts of names are translated
    "Diverse Säfte I": ("Juices I", "Sucos I", "Jus I", "Succhi I"),
    "Diverse Säfte II": ("Juices II", "Sucos II", "Jus II", "Succhi II"),
    "Diverse Säfte III": ("Juices III", "Sucos III", "Jus III", "Succhi III"),
    "Diverse Säfte I (mit Milch)": ("Juices I (with milk)", "Sucos I (com leite)", "Jus I (au lait)", "Succhi I (con latte)"),
    "Diverse Säfte II (mit Milch)": ("Juices II (with milk)", "Sucos II (com leite)", "Jus II (au lait)", "Succhi II (con latte)"),
    "Diverse Säfte III (mit Milch)": ("Juices III (with milk)", "Sucos III (com leite)", "Jus III (au lait)", "Succhi III (con latte)"),
    "Frischgepresste Säfte": ("Freshly squeezed juice", "Suco natural espremido na hora", "Jus fraîchement pressé", "Spremuta fresca"),
    "Salada da casa (Haussalat)": ("Salada da casa (house salad)", "Salada da casa", "Salada da casa (salade maison)", "Salada da casa (insalata della casa)"),
}
LANGS = ["en", "pt", "fr", "it"]

def tr(table, de):
    if de is None: return None
    import re
    if re.fullmatch(r"\d+\.\d+l", de):  # volumes: "0.4l" → "0,4 l" (en: "0.4 l")
        n = de[:-1]
        return {"de": f"{n.replace('.', ',')} l", **{l: (f"{n} l" if l == "en" else f"{n.replace('.', ',')} l") for l in LANGS}}
    if de not in table:
        if table is NAME: return None
        if table is STYLE: return {"de": de, **{l: de for l in LANGS}}  # Portuguese fruit names stay as they are
        raise SystemExit(f"missing translation: {de!r}")
    return {"de": de, **dict(zip(LANGS, table[de]))}

def slug(s):
    import re, unicodedata
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")

sections = []
for c in raw:
    sid, title = SECTION[c["id"]]
    items = []
    for f in c["foods"]:
        variants = [{"label": tr(STYLE, d["style"]), "cents": round(d["price"] * 100)} for d in f["food_details"]]
        items.append({
            "id": slug(f["name"]),
            "name": f["name"],
            "nameI18n": tr(NAME, f["name"]),
            "desc": tr(T, f["description"]),
            "variants": variants,
        })
    sections.append({"id": sid, "title": title, "titlePt": c["name"], "note": SECTION_NOTE.get(c["id"]), "cutout": f"cutout-{c['img']}", "items": items})

out = {
    "_source": "picanha-brasil.ch ordering widget (data.bigbites.ch/restaurant/58JN5J/foods), captured 2026-10-30. Prices in integer centimes (CHF).",
    "checked": "2026-10-30",
    "sourceUrl": "https://picanha-brasil.ch/#order",
    "sections": sections,
}
(ROOT / "content/menu.json").write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")
print(sum(len(s["items"]) for s in sections), "dishes,", sum(len(i["variants"]) for s in sections for i in s["items"]), "prices")
