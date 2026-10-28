import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { HTML_LANG, LOCALE, TEXT, UI, fill } from "@/i18n";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";
import { Photo } from "../Photo";
import { Reveal } from "../Reveal";

const MAX_CANDLES = 10;

/** An illustrated cake whose candles light up one by one as the number of people grows. */
function CandleCake({ people }: { people: number }) {
  const reduce = useReducedMotion();
  const lit = Math.min(MAX_CANDLES, people);
  return (
    <svg viewBox="0 0 320 240" className="h-auto w-full" aria-hidden="true">
      <ellipse cx="160" cy="222" rx="132" ry="12" fill="rgb(42 26 18 / 0.12)" />
      <path d="M40 214 h240" stroke="#2A1A12" strokeWidth="4" strokeLinecap="round" />
      <rect x="58" y="120" width="204" height="94" rx="14" fill="#F7E2B6" stroke="#2A1A12" strokeWidth="3.5" />
      <path d="M58 150 q17 14 34 0 t34 0 t34 0 t34 0 t34 0 t34 0" fill="none" stroke="#9A5A24" strokeWidth="5" strokeLinecap="round" />
      <path d="M58 132 q17 16 34 0 t34 0 t34 0 t34 0 t34 0 t34 0 v-12 h-204 z" fill="#FBF6EC" stroke="#2A1A12" strokeWidth="3" strokeLinejoin="round" />
      {[86, 126, 166, 206, 236].map((x, i) => (
        <circle key={i} cx={x} cy={180 + (i % 2) * 10} r="5" fill={["#D52B1E", "#1F4E9E", "#D4932B", "#3f8f3a", "#D52B1E"][i]} />
      ))}
      {Array.from({ length: MAX_CANDLES }, (_, i) => {
        const x = 76 + i * 18.5;
        const on = i < lit;
        return (
          <g key={i}>
            <rect x={x - 3.5} y="80" width="7" height="40" rx="2" fill={i % 2 ? "#F2C14E" : "#FBF6EC"} stroke="#2A1A12" strokeWidth="2" />
            <path d={`M${x} 80 v-6`} stroke="#2A1A12" strokeWidth="2" strokeLinecap="round" />
            <motion.path
              d={`M${x} 52 c-6 8 -6 16 0 20 c6 -4 6 -12 0 -20z`}
              fill="#F39C12"
              initial={false}
              animate={on ? { opacity: 1, scale: reduce ? 1 : [0.4, 1.15, 1] } : { opacity: 0, scale: 0.4 }}
              transition={{ duration: reduce ? 0 : 0.45 }}
              style={{ transformOrigin: `${x}px 72px` }}
            />
            <motion.path d={`M${x} 60 c-3 4 -3 8 0 10 c3 -2 3 -6 0 -10z`} fill="#FFF3B0" initial={false} animate={{ opacity: on ? 1 : 0 }} transition={{ duration: reduce ? 0 : 0.3 }} />
          </g>
        );
      })}
    </svg>
  );
}

/**
 * «Du sur mesure pour vos évènements !»: the live texts, then a request card (occasion, people, date, idea)
 * that hands its message to the contact form, which sends it.
 */
export function CustomCake() {
  const { lang, go } = useSite();
  const id = useId();
  const [occasion, setOccasion] = useState<"birthday" | "other">("birthday");
  const [people, setPeople] = useState(8);
  const [date, setDate] = useState("");
  const [idea, setIdea] = useState("");
  const today = new Date().toISOString().slice(0, 10);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const when = date ? new Intl.DateTimeFormat(LOCALE[lang], { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`)) : UI.noDate[lang];
    const message = fill(UI.cakeMessage[lang], { occasion: occasion === "birthday" ? UI.birthday[lang] : UI.otherEvent[lang], people, date: when, idea }).trim();
    go("contact", "formulaire", { message, fromCake: true });
  };

  return (
    <section id="sur-mesure" aria-labelledby={`${id}-title`} className="tiles gutter bg-flour-deep py-20 md:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <p className="kicker">{TEXT.customKicker[lang]}</p>
          <h2 id={`${id}-title`} className="display mt-3 text-[clamp(2.1rem,4.4vw,3.6rem)] leading-tight text-cocoa">
            {TEXT.customTitle[lang]}
          </h2>
          <p className="mt-6 text-lg">{TEXT.custom1[lang]}</p>
          <p className="mt-4">{TEXT.custom2[lang]}</p>
          <p className="mt-4">{TEXT.custom3[lang]}</p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {["tiered", "ariel", "red-velvet"].map((p) => (
              <Photo key={p} id={p} sizes="(min-width: 1024px) 190px, 30vw" className="aspect-[4/5] rounded-2xl" />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={submit} className="rounded-[30px] bg-flour p-6 shadow-lift ring-1 ring-espresso/10 md:p-9" aria-labelledby={`${id}-card`}>
            <h3 id={`${id}-card`} className="display text-3xl text-cocoa">{UI.cakeTitle[lang]}</h3>
            <p className="mt-2 text-sm text-espresso/80">{UI.cakeLead[lang]}</p>
            <div className="mx-auto mt-4 max-w-[340px]">
              <CandleCake people={people} />
            </div>
            <p className="sr-only" aria-live="polite">{fill(UI.candles[lang], { n: Math.min(MAX_CANDLES, people) })}</p>

            <fieldset className="mt-4">
              <legend className="kicker mb-2">{UI.occasion[lang]}</legend>
              <div className="grid grid-cols-2 gap-2">
                {(["birthday", "other"] as const).map((o) => (
                  <label key={o} className={cn("cursor-pointer rounded-full px-4 py-3 text-center font-semibold ring-1 has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-azulejo", occasion === o ? "bg-espresso text-flour ring-espresso" : "ring-espresso/20 hover:ring-espresso/50")}>
                    <input type="radio" name={`${id}-occ`} value={o} checked={occasion === o} onChange={() => setOccasion(o)} className="sr-only" />
                    {o === "birthday" ? UI.birthday[lang] : UI.otherEvent[lang]}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={`${id}-people`} className="kicker mb-2 block">{UI.people[lang]}</label>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setPeople((n) => Math.max(1, n - 1))} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-flour-deep text-xl font-bold ring-1 ring-espresso/15 hover:bg-custard/40">
                    <span aria-hidden="true">−</span>
                    <span className="sr-only">{UI.fewer[lang]}</span>
                  </button>
                  <input
                    id={`${id}-people`}
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={500}
                    value={people}
                    onChange={(e) => setPeople(Math.max(1, Math.min(500, Number(e.target.value) || 1)))}
                    className="price h-12 w-full min-w-0 rounded-xl bg-white text-center text-lg font-semibold ring-1 ring-espresso/20 focus:outline-none focus:ring-2 focus:ring-azulejo"
                  />
                  <button type="button" onClick={() => setPeople((n) => Math.min(500, n + 1))} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-flour-deep text-xl font-bold ring-1 ring-espresso/15 hover:bg-custard/40">
                    <span aria-hidden="true">+</span>
                    <span className="sr-only">{UI.more[lang]}</span>
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor={`${id}-date`} className="kicker mb-2 block">{UI.date[lang]}</label>
                <input id={`${id}-date`} type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} lang={HTML_LANG[lang]} className="h-12 w-full rounded-xl bg-white px-3 ring-1 ring-espresso/20 focus:outline-none focus:ring-2 focus:ring-azulejo" />
              </div>
            </div>
            <label htmlFor={`${id}-idea`} className="kicker mb-2 mt-5 block">{UI.yourIdea[lang]}</label>
            <textarea id={`${id}-idea`} rows={3} value={idea} onChange={(e) => setIdea(e.target.value)} lang={HTML_LANG[lang]} className="w-full rounded-xl bg-white p-3 ring-1 ring-espresso/20 focus:outline-none focus:ring-2 focus:ring-azulejo" />
            <button type="submit" className="btn btn-dark mt-6 w-full">{UI.continueToForm[lang]}</button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
