import { test } from "node:test";
import assert from "node:assert/strict";
import assets from "@content/assets.json";
import { CATEGORIES, GALLERY_ONLY, PRODUCTS, productsIn, searchProducts } from "@/content/products";
import { EMAIL, PHONE, SOCIAL, URLS } from "@/content/facts";
import { de } from "@/i18n/de";

const text = (id: keyof typeof de.products.items) => `${de.products.items[id].label} ${de.products.items[id].desc}`;

test("the range page's eleven products, in four categories, nothing invented", () => {
  assert.equal(PRODUCTS.length, 11);
  assert.deepEqual(CATEGORIES.map((c) => productsIn(c).length), [4, 1, 4, 2]);
  // no price, size or topping fields exist anywhere in the product data
  for (const p of PRODUCTS) for (const k of Object.keys(p)) assert.ok(!/price|cents|chf|size|topping/i.test(k), `${p.id}.${k}`);
  // only Caldo de Cana has published variants: pur, Zitrone, Ingwer, Ananas & Minze
  assert.deepEqual(PRODUCTS.filter((p) => p.variants).map((p) => [p.id, p.variants]), [["caldo-de-cana", ["pur", "zitrone", "ingwer", "ananasMinze"]]]);
  assert.deepEqual(PRODUCTS.filter((p) => p.buildYourOwn).map((p) => p.id), ["acai-im-becher", "bubble-waffel"]);
});

test("every product image and gallery-only picture is a public asset", () => {
  const pub = new Set((assets as { assets: { id: string; public: boolean }[] }).assets.filter((a) => a.public).map((a) => a.id));
  for (const p of PRODUCTS) for (const i of p.images) assert.ok(pub.has(i), i);
  for (const i of GALLERY_ONLY) assert.ok(pub.has(i), i);
  // photos of identifiable people are kept out of the demo
  const people = (assets as { assets: { category: string; public: boolean }[] }).assets.filter((a) => a.category === "people");
  assert.equal(people.length, 9);
  assert.ok(people.every((a) => !a.public));
});

test("search: names, localized text and flavours, accents ignored", () => {
  const ids = (q: string) => searchProducts(q, (p) => text(p.id)).map((p) => p.id);
  assert.deepEqual(ids("cupuacu"), ["acai-cupuacu", "bowls-smoothies"]);
  assert.deepEqual(ids("Zuckerrohr"), ["caldo-de-cana"]);
  assert.deepEqual(ids("caldo do cana"), ["caldo-de-cana"]); // the live site's spelling still finds it
  assert.deepEqual(ids("waffel"), ["bubble-waffel", "frappes"]);
  assert.equal(ids("").length, 11);
  assert.deepEqual(ids("pizza"), []);
});

test("contact links are the working forms", () => {
  assert.equal(PHONE.href, "tel:+41763107195");
  assert.equal(EMAIL, "info@manna-acai.ch");
  assert.equal(SOCIAL.instagram.url, "https://www.instagram.com/acaiteriamanna");
  assert.equal(SOCIAL.facebook.url, "https://www.facebook.com/acaiteriamanna");
  assert.ok(URLS.maps.startsWith("https://www.google.com/maps/search/?api=1&query="));
});
