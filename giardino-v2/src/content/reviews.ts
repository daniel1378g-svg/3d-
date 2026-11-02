// Google reviews supplied by the owner as screenshots. The original wording is kept character for character and
// shown in every language; the German, French and Italian versions are marked as translations. No relative
// timestamps (the screenshots don't establish dates), no profile photos (initials instead), no overall rating or count.
import { l, type L } from "@/i18n";

export type Review = { id: string; name: string | null; rating: number; text: string; translation: L };

export const REVIEWS: Review[] = [
  {
    id: "luethi",
    name: "Alexander Luethi",
    rating: 5,
    text: "Good Pizza and nice, cozy atmosphere! Would recommend!",
    translation: l(
      "Gute Pizza und eine schöne, gemütliche Atmosphäre! Empfehlenswert!",
      "Bonne pizza et ambiance agréable et chaleureuse ! Je recommande !",
      "Good Pizza and nice, cozy atmosphere! Would recommend!",
      "Buona pizza e atmosfera bella e accogliente! Lo consiglio!",
    ),
  },
  {
    id: "ford",
    name: "Bryan Ford",
    rating: 5,
    text: "Really excellent pizza and pasta, both - surprisingly good for an obviously touristy place at the center of a touristy town!",
    translation: l(
      "Wirklich ausgezeichnete Pizza und Pasta, beides – überraschend gut für ein offensichtlich touristisches Lokal im Zentrum eines touristischen Ortes!",
      "Pizza et pâtes vraiment excellentes, les deux – étonnamment bon pour un lieu manifestement touristique au centre d’une ville touristique !",
      "Really excellent pizza and pasta, both - surprisingly good for an obviously touristy place at the center of a touristy town!",
      "Pizza e pasta davvero eccellenti, entrambe – sorprendentemente buone per un locale chiaramente turistico nel centro di una località turistica!",
    ),
  },
  {
    id: "greenwood",
    name: "Vineeta Greenwood",
    rating: 5,
    text: "Reasonable priced, vegan options and suitable for family. Great pizzas and soups",
    translation: l(
      "Preiswert, vegane Optionen und familienfreundlich. Tolle Pizzen und Suppen",
      "Prix raisonnables, options véganes et adapté aux familles. Excellentes pizzas et soupes",
      "Reasonable priced, vegan options and suitable for family. Great pizzas and soups",
      "Prezzi ragionevoli, opzioni vegane e adatto alle famiglie. Ottime pizze e zuppe",
    ),
  },
  {
    id: "miserez",
    name: "Rodolfo Miserez",
    rating: 5,
    text: "Goooood Pizzé Waitress are good and do care about how u doing, price are faire and the restaurant deco it's really nice",
    translation: l(
      "Suuuper Pizza. Die Servicemitarbeiterinnen sind gut und kümmern sich darum, wie es einem geht, die Preise sind fair und die Einrichtung des Restaurants ist wirklich schön",
      "Pizzas suuuper bonnes. Les serveuses sont bien et se soucient vraiment de comment ça va, les prix sont corrects et la déco du restaurant est vraiment jolie",
      "Goooood Pizzé Waitress are good and do care about how u doing, price are faire and the restaurant deco it's really nice",
      "Pizza buooonissima. Le cameriere sono brave e si preoccupano davvero di come stai, i prezzi sono onesti e l’arredamento del ristorante è davvero bello",
    ),
  },
  {
    id: "aranha",
    name: "Aymoré Aranha",
    rating: 5,
    text: "Excellent. Tasty food, good service, very pleasant atmosphere. Price ok. I recommend it",
    translation: l(
      "Ausgezeichnet. Leckeres Essen, guter Service, sehr angenehme Atmosphäre. Preis in Ordnung. Ich empfehle es",
      "Excellent. Nourriture savoureuse, bon service, ambiance très agréable. Prix correct. Je recommande",
      "Excellent. Tasty food, good service, very pleasant atmosphere. Price ok. I recommend it",
      "Eccellente. Cibo gustoso, buon servizio, atmosfera molto piacevole. Prezzo ok. Lo consiglio",
    ),
  },
  {
    // the author's name is cut off in the screenshot: no attribution rather than an invented one
    id: "anonymous",
    name: null,
    rating: 4,
    text: "Good pizza, good pasta, nice place, and great for kids with lots of stuff for them to play with!",
    translation: l(
      "Gute Pizza, gute Pasta, schönes Lokal und toll für Kinder, mit vielen Sachen zum Spielen!",
      "Bonne pizza, bonnes pâtes, bel endroit, et génial pour les enfants avec plein de choses pour jouer !",
      "Good pizza, good pasta, nice place, and great for kids with lots of stuff for them to play with!",
      "Buona pizza, buona pasta, bel posto, e fantastico per i bambini con tante cose con cui giocare!",
    ),
  },
];

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
