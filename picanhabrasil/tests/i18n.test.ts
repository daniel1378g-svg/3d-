import { test } from "node:test";
import assert from "node:assert/strict";
import { de } from "@/i18n/de";
import { en } from "@/i18n/en";
import { pt } from "@/i18n/pt";
import { fr } from "@/i18n/fr";
import { it } from "@/i18n/it";
import { LANGS, pathFor, routeFromSlug, SLUGS } from "@/i18n";

const keys = (o: unknown, p = ""): string[] =>
  typeof o === "object" && o !== null ? Object.entries(o).flatMap(([k, v]) => keys(v, `${p}.${k}`)) : [p];

test("every language has exactly the German keys", () => {
  const ref = keys(de).sort();
  for (const d of [en, pt, fr, it]) assert.deepEqual(keys(d).sort(), ref);
});

test("every page has a route in every language, and it resolves back", () => {
  for (const l of LANGS) for (const page of Object.keys(SLUGS[l]) as (keyof (typeof SLUGS)["de"])[]) {
    const path = pathFor(l, page);
    assert.equal(routeFromSlug(l, path.split("/").slice(2).join("/"))?.page, page, path);
  }
});
