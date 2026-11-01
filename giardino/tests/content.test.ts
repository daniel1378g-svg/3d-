// Menus, routes, dictionaries and formats: the content the site promises to show exactly.
import { test } from "node:test";
import assert from "node:assert/strict";
import { MENUS, FILTER_TAGS, MENU_REVIEW, type Item } from "@/content/menu";
import { LANGS } from "@/i18n/langs";
import de from "@/i18n/de";
import en from "@/i18n/en";
import fr from "@/i18n/fr";
import it from "@/i18n/it";
import { PAGE_KEYS, SLUGS, pathFor, matchPath, LEGACY_REDIRECTS, LEGACY_FILES, INDEXED } from "@/routes";
import { fmtChf, fmtAmount } from "@/lib/format";
import { LABELS, MENU_PDF_LIVE, RESTAURANT } from "@/content/restaurant";
import IMAGES from "@/data/images.json";
import ASSETS from "@content/assets.json";

const all = (menuId?: string) =>
  MENUS.filter((m) => !menuId || m.id === menuId).flatMap((m) => m.sections.flatMap((s) => s.groups.flatMap((g) => g.items.map((i) => ({ menu: m.id, section: s.id, item: i })))));
const find = (name: string, menuId?: string) => all(menuId).find(({ item }) => item.name.de === name || item.id === name)?.item;
const prices = (i: Item | undefined) => i?.prices.map((p) => p.chf);

test("the spot-check list of BRIEF §5.4 matches the printed menus exactly", () => {
  const cases: [string, number[], string?][] = [
    ["Margherita", [18]],
    ["Gamberoni", [28]],
    ["Sofia Loren", [28]],
    ["Niklas", [29]],
    ["Spaghetti Napoli", [20]],
    ["lasagne", [24.5]],
    ["walliserteller", [30.5]], // «Walliserteller mit Roggenbrot» – «mit Roggenbrot» is its description
    ["entrecote", [46]],
    ["schweineschnitzel", [39]],
    ["Kaffee Creme", [4.4]],
    ["Kindersalat", [6]],
    ["Banana Split", [12.9]],
  ];
  for (const [name, expect] of cases) {
    const item = find(name);
    assert.ok(item, `${name} is on the menu`);
    assert.deepEqual(prices(item), expect, `${name}: ${prices(item)}`);
  }
  // matrices
  const cola = find("coca-cola", "drinks"); // printed «Coca Cola», shown with the brand spelling
  assert.deepEqual(prices(cola), [3.7, 4.7, 5.7, 9.7], "Coca Cola 2dl/3dl/5dl/1lt");
  const pinot = all("drinks").find(({ item }) => /Pinot.?Noir Leukersonne|Leukersonne/.test(item.name.de) && /Pinot|Dôle/.test(item.name.de))?.item;
  assert.ok(pinot, "Pinot-Noir Leukersonne");
  const appenzeller = find("Appenzeller", "drinks");
  assert.ok(appenzeller?.prices.some((p) => p.chf === 8.5), "Appenzeller 4cl 8.50");
  const gin = all("drinks").find(({ item }) => /Gin Tonic/.test(item.name.de))?.item;
  assert.ok(gin?.prices.some((p) => p.chf === 11.5), "Gin Tonic 11.50");
  const moretti = find("moretti-stange", "drinks");
  assert.ok(moretti?.prices.some((p) => p.chf === 4.8), "Stange Moretti 3dl 4.80");
});

test("item counts per menu", () => {
  const count = (id: string) => MENUS.find((m) => m.id === id)!.sections.reduce((n, s) => n + s.groups.reduce((a, g) => a + g.items.length, 0), 0);
  const food = MENUS.find((m) => m.id === "food")!;
  assert.equal(food.sections.reduce((n, s) => n + s.groups.reduce((a, g) => a + g.items.length, 0), 0), 51, "51 dishes on the food menu");
  assert.ok(count("drinks") >= 100, `drinks: ${count("drinks")}`);
  assert.equal(MENUS.find((m) => m.id === "kids")!.sections.find((s) => s.id === "kinder-essen")!.groups.reduce((a, g) => a + g.items.length, 0), 8, "8 kids dishes");
});

test("every price is a positive amount in Rappen precision, and every item has a name in all languages", () => {
  for (const { menu, item } of all()) {
    for (const l of LANGS) assert.ok(item.name[l]?.trim(), `${menu}/${item.id}: name in ${l}`);
    for (const p of item.prices) {
      assert.ok(p.chf > 0 && p.chf < 500, `${item.id}: ${p.chf}`);
      assert.ok(Math.abs(p.chf * 100 - Math.round(p.chf * 100)) < 1e-6, `${item.id}: ${p.chf} is a whole number of Rappen`);
    }
  }
});

test("no dietary filter; the vegan marker only where the dessert menu prints it", () => {
  assert.ok(!FILTER_TAGS.includes("vegan"));
  const vegan = all().filter(({ item }) => item.tags?.includes("vegan")).map(({ item }) => item.name.de);
  assert.deepEqual([...new Set(vegan)].sort(), ["Aprikose", "Citron", "Himbeer"]);
});

test("unresolved menu lines are listed for review", () => {
  for (const id of ["salat-bueffet", "hugo-grapefrizz", "sirup-kids", "fleisch", "gluten"]) assert.ok(MENU_REVIEW.some((r) => r.id === id), id);
});

test("prices read «CHF 12.90» in every language: decimal point, two decimals, narrow no-break space", () => {
  assert.equal(fmtChf(12.9), "CHF 12.90");
  assert.equal(fmtChf(4), "CHF 4.00");
  assert.equal(fmtAmount(1234.5), "1’234.50");
  for (const l of LANGS) assert.equal(fmtChf(18, l), "CHF 18.00");
});

test("routes: every page × language round-trips, and slugs are unique per language", () => {
  for (const l of LANGS) {
    const seen = new Set<string>();
    for (const p of PAGE_KEYS) {
      const path = pathFor(l, p);
      assert.ok(!seen.has(path), `duplicate ${path}`);
      seen.add(path);
      assert.deepEqual(matchPath(path), { lang: l, page: p }, path);
      assert.deepEqual(matchPath(path + "/"), { lang: l, page: p }, path + "/");
    }
  }
  assert.ok(!INDEXED.includes("status"));
  assert.equal(SLUGS.de.menu, "essen-geniessen");
  assert.equal(SLUGS.en.reserve, "bookings");
});

test("every live slug is a route or a 301 source", () => {
  const live = [
    "/de", "/en", "/fr", "/it",
    "/de/essen-geniessen", "/en/eat-enjoy", "/fr/manger-et-savourer", "/it/mangia-e-divertiti",
    "/de/kids", "/en/kids", "/fr/enfants", "/it/kids",
    "/de/gastgeber", "/en/host", "/fr/hotes", "/it/la-casa",
    "/de/reservation", "/en/bookings", "/fr/reservation", "/it/prenotazione",
    "/de/partnerhotels", "/en/partner-hotels", "/fr/hotel-partner", "/it/partner-albergos",
    "/de/impressum", "/en/imprint", "/fr/empreinte", "/it/impronta",
    "/de/allgemein/jobs", "/en/meta/jobs", "/fr/meta/emplois", "/it/meta/lavoro",
    "/de/allgemein/anreise", "/en/meta/arrival", "/fr/meta/arrivee", "/it/meta/come-arrivare",
    "/de/allgemein/rundgang", "/en/meta/virtual-tour", "/fr/meta/tour-virtuel", "/it/meta/tour-virtuale",
    "/de/allgemein/presse", "/en/meta/press", "/fr/meta/presse", "/it/meta/stampa",
    "/de/allgemein/kontakt", "/en/meta/contact", "/fr/meta/contact", "/it/meta/contatto",
    "/de/datenschutz", "/de/allgemein/impressionen",
  ];
  for (const p of live) assert.ok(matchPath(p) || LEGACY_REDIRECTS[p], `${p} has no route or redirect`);
  for (const target of Object.values(LEGACY_REDIRECTS)) assert.ok(target.startsWith("https://") || matchPath(target), `redirect target ${target} exists`);
  assert.deepEqual(Object.keys(LEGACY_FILES).sort(), ["124", "158", "159", "15a"]);
  for (const id of Object.keys(LEGACY_FILES)) assert.ok(Object.values(MENU_PDF_LIVE).some((u) => u.endsWith(`resource_link_id=${id}`)));
});

test("the four dictionaries have the same shape", () => {
  const shape = (o: unknown, p = ""): string[] =>
    o && typeof o === "object" ? Object.entries(o).flatMap(([k, v]) => shape(v, `${p}.${k}`)) : [`${p}:${typeof o === "function" ? `fn${(o as () => void).length}` : typeof o}`];
  const ref = shape(de).sort();
  for (const [l, d] of Object.entries({ en, fr, it })) assert.deepEqual(shape(d).sort(), ref, `${l} differs from de`);
});

test("Swiss German and fr-CH conventions in the dictionaries", () => {
  const text = (o: unknown): string => (typeof o === "string" ? o : typeof o === "function" ? "" : o && typeof o === "object" ? Object.values(o).map(text).join("\n") : "");
  assert.ok(!/ß/.test(text(de)), "no ß in Swiss German");
  assert.ok(!/Reservierung/.test(text(de)), "Reservation, not Reservierung");
  assert.ok(!/[   ][;!?]/.test(text(fr)), "no space before ; ! ? in fr-CH");
});

test("every photograph is published with alt text in four languages and an image entry", () => {
  const assets = (ASSETS as { assets: { id: string; alt: Record<string, string> }[] }).assets;
  for (const a of assets) {
    assert.ok((IMAGES as Record<string, unknown>)[a.id], `${a.id} has image files`);
    for (const l of LANGS) assert.ok(a.alt[l]?.trim(), `${a.id} alt ${l}`);
  }
});

test("facts: address, phone and e-mail as published; labels without Google+ and food4family", () => {
  assert.equal(RESTAURANT.street, "Thermenstrasse 9");
  assert.equal(RESTAURANT.phoneHref, "tel:+41275300584");
  assert.equal(RESTAURANT.email, "info@pizzeriagiardino.ch");
  assert.ok(!LABELS.some((l) => /plus\.google|food4family/.test(l.href)));
  for (const l of LABELS) for (const lang of LANGS) assert.ok(l.alt[lang]?.trim(), `${l.id} alt ${lang}`);
});
