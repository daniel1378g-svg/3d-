import { test } from "node:test";
import assert from "node:assert/strict";
import { de } from "@/i18n/de";
import { en } from "@/i18n/en";
import { pt } from "@/i18n/pt";
import { fr } from "@/i18n/fr";
import { it } from "@/i18n/it";
import { LANGS, pathFor, routeFromSlug, SLUGS } from "@/i18n";
import { PRODUCTS } from "@/content/products";

const keys = (o: unknown, p = ""): string[] =>
  typeof o === "object" && o !== null ? Object.entries(o).flatMap(([k, v]) => keys(v, `${p}.${k}`)) : [p];
const ph = (s: string) => (s.match(/\{\w+\}/g) ?? []).sort().join();

test("every language has exactly the German keys and placeholders", () => {
  const ref = keys(de).sort();
  for (const d of [en, pt, fr, it]) {
    assert.deepEqual(keys(d).sort(), ref);
    const get = (o: unknown, path: string) => path.split(".").slice(1).reduce((x: any, k) => x?.[k], o);
    for (const k of ref) assert.equal(ph(String(get(d, k))), ph(String(get(de, k))), k);
  }
});

test("every product has a label and description in every language", () => {
  for (const d of [de, en, pt, fr, it]) for (const p of PRODUCTS) {
    assert.ok(d.products.items[p.id].label.trim(), p.id);
    assert.ok(d.products.items[p.id].desc.trim(), p.id);
  }
});

test("every page has a route in every language, and it resolves back", () => {
  for (const l of LANGS) for (const page of Object.keys(SLUGS[l]) as (keyof (typeof SLUGS)["de"])[]) {
    const path = pathFor(l, page);
    assert.equal(routeFromSlug(l, path.split("/").slice(2).join("/"))?.page, page, path);
  }
});
