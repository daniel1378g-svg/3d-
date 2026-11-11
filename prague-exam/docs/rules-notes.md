# Rule notes for `sim/lawbook.js`

Research behind the fault catalogue of the mock exam. Every legal reference below was read in the
text of the provision on 11 November 2026. Quotes are verbatim, one line each, in Czech.

A real exam is decided by a zkušební komisař, not by this file. Where the law leaves room for
judgement, the note says so.

## Sources

| Short name | Text used | Wording |
| --- | --- | --- |
| ZSP | zákon č. 361/2000 Sb., o provozu na pozemních komunikacích, <https://www.zakonyprolidi.cz/cs/2000-361> | in force 1. 1. 2026 to 31. 12. 2026 (version 63) |
| ZA | zákon č. 247/2000 Sb., o získávání a zdokonalování odborné způsobilosti k řízení motorových vozidel, <https://www.zakonyprolidi.cz/cs/2000-247> | in force from 1. 7. 2025 (version 27) |
| VA | vyhláška č. 167/2002 Sb., kterou se provádí zákon č. 247/2000 Sb., <https://www.zakonyprolidi.cz/cs/2002-167> | in force from 14. 3. 2016 (version 7, last amended by 76/2016 Sb.) |
| VZ | vyhláška č. 294/2015 Sb., kterou se provádějí pravidla provozu na pozemních komunikacích, <https://www.zakonyprolidi.cz/cs/2015-294> | in force from 1. 7. 2025 (version 5) |

e-sbirka.cz serves its texts through a script-only page that could not be read here, so all four
texts come from zakonyprolidi.cz. That site shows the current wording of ZSP ending on
31 December 2026, so an amended wording starts on 1 January 2027; recheck the citations then.

Secondary sources, used for teaching practice and for question 14 only:

- Bezpečné cesty (road-safety portal): right-hand rule, trams, roundabouts, junction blocking,
  bus and tram stops, <https://www.bezpecnecesty.cz/cz/bezpecnost-na-silnicich/bezpecna-jizda-v-aute>
- Garáž.cz, interview with Aleš Horčička, chairman of the Asociace autoškol ČR,
  <https://www.garaz.cz/clanek/zajimavosti-za-tohle-se-pri-zaverecnych-jizdach-vyhazuje-nejcasteji-zkuseny-autoskolak-rekl-v-cem-zaci-neustale-chybuji-21016472>
- Auto.cz, <https://www.auto.cz/jak-udelat-jizdy-v-autoskole-vyvarujte-se-techto-nejcastejsich-chyb-148099>
- Autoškola BuBu (Praha 8 Střížkov, Kladno, Statenice),
  <https://www.autoskolabubu.cz/post/4-nejčastější-chyby-kvůli-kterým-lidé-neudělají-zkoušku-v-autoškole>
- Autoškola Jurečka (Nový Jičín), <https://www.autoskolajurecka.cz/blog/chyby-u-zkousky/> and
  <https://www.autoskolajurecka.cz/blog/zkouska-v-autoskole/>
- Autoškola Novas (Nový Jičín), <https://www.a-novas.cz/news/pripravujeme-novou-kolekci>
- AutoTrip.cz, a candidate's account of an exam in Prague-Dejvice,
  <https://autotrip.cz/ocima-studenta-jak-vypada-zaverecna-jizda-v-autoskole/>

## Three definitions everything else rests on

> *ZSP § 2 písm. q):* dát přednost v jízdě znamená povinnost řidiče nezahájit jízdu nebo jízdní úkon nebo v nich nepokračovat, jestliže by řidič, který má přednost v jízdě, musel náhle změnit směr nebo rychlost jízdy,

> *ZSP § 2 písm. l):* nesmět ohrozit znamená povinnost počínat si tak, aby jinému účastníku provozu na pozemních komunikacích nevzniklo žádné nebezpečí,

> *ZSP § 2 písm. m):* nesmět omezit znamená povinnost počínat si tak, aby jinému účastníku provozu na pozemních komunikacích nebylo nijak překáženo,

For the rule engine: a give-way fault exists when the driver with priority has to change speed or
direction suddenly. "Nesmět omezit" is stricter than "nesmět ohrozit": it is broken as soon as the
other party is held up at all.

A tram is a vehicle and its driver is a driver, so the general junction rules bind trams too:

> *ZSP § 2 písm. f):* vozidlo je motorové vozidlo, nemotorové vozidlo nebo tramvaj,

## 1. Junction priority

**Signs.** A driver arriving on a road marked P 4 or P 6 gives way to everything arriving on the
main road, whichever way either of them is going.

> *ZSP § 22 odst. 1:* Řidič přijíždějící na křižovatku po vedlejší pozemní komunikaci označené dopravní značkou "Dej přednost v jízdě!" nebo "Stůj, dej přednost v jízdě!" musí dát přednost v jízdě vozidlům nebo jezdcům na zvířatech přijíždějícím po hlavní pozemní komunikaci nebo organizované skupině chodců nebo průvodcům hnaných zvířat se zvířaty přicházejícím po hlavní pozemní komunikaci.

> *VZ příloha č. 2, P 4:* Značka označuje vedlejší pozemní komunikaci.

> *VZ příloha č. 2, P 2:* Značka označuje zejména v obci hlavní pozemní komunikaci v nejbližší křižovatce nebo uvnitř rozsáhlé nebo složitější křižovatky.

Priority signs apply to the nearest junction only, and working traffic lights override them:

> *VZ § 3 odst. 5:* Značky upravující přednost „Křižovatka s vedlejší pozemní komunikací“, „Hlavní pozemní komunikace“, „Konec hlavní pozemní komunikace“, „Dej přednost v jízdě!“, „Dej přednost v jízdě tramvaji!“ a „Stůj, dej přednost v jízdě!“ platí pro nejbližší křižovatku.

> *ZSP § 76 odst. 6:* Světelné signály jsou nadřazeny svislým dopravním značkám upravujícím přednost.

**Right-hand rule.** Wherever paragraph 1 does not decide, the vehicle from the right goes first.
That covers unsigned junctions and also two vehicles of equal rank at a signed junction.

> *ZSP § 22 odst. 2:* Nevyplývá-li přednost v jízdě z ustanovení odstavce 1, musí dát řidič přednost v jízdě vozidlům nebo jezdcům na zvířatech přijíždějícím zprava nebo organizované skupině chodců nebo průvodcům hnaných zvířat se zvířaty přicházejícím zprava.

**Turning left.** The left-turner gives way to oncoming vehicles and to trams in both directions.

> *ZSP § 21 odst. 5:* Řidič odbočující vlevo musí dát přednost v jízdě protijedoucím motorovým i nemotorovým vozidlům, jezdcům na zvířeti, protijdoucím organizovaným útvarům chodců a průvodcům hnaných zvířat se zvířaty, tramvajím jedoucím v obou směrech a vozidlům jedoucím ve vyhrazeném jízdním pruhu, pro něž je tento jízdní pruh vyhrazen, a cyklistům jedoucím v jízdním pruhu pro cyklisty.

**Main road that bends (plate E 2b under P 2 or P 4).** The plate shows which arms are the main
road. The law has no special rule for this shape; the result follows from § 22:

> *VZ příloha č. 6, E 2b:* Tabulka vyznačuje skutečný tvar křižovatky a upřesňuje, která komunikace je hlavní a která vedlejší.

- A vehicle on either main arm has priority over a vehicle on either minor arm (§ 22 odst. 1),
  also when it leaves the main road by driving geometrically straight on.
- Two vehicles that are both on the main road have equal rank, so § 22 odst. 2 decides between
  them: the one that has the other on its right gives way. This matters when at least one of them
  leaves the main road, because only then do their paths cross.
- Two vehicles that both come from minor roads also have equal rank: right-hand rule again, and
  if they face each other, the one turning left gives way under § 21 odst. 5. Both of them first
  give way to everything on the main road.
- Following the bending main road is a change of direction, so it needs the indicator
  (§ 30 odst. 1). Driving straight on off the main road is not a change of direction.

The Bezpečné cesty portal teaches the same reading: "Přednost zprava platí i na některých
křižovatkách s dopravními značkami. Např. tam, kde hlavní silnice zatáčí a na ni navazují vedlejší
silnice", and for two cars from minor roads "mají obě auta stejná „práva“ a musí dodržovat pravidlo
pravé ruky".

**Places that always give way.** Leaving a residential or pedestrian zone, a service road or any
place off the road is not covered by the right-hand rule: the driver gives way to both sides.

> *ZSP § 23 odst. 1:* Při vjíždění z místa ležícího mimo pozemní komunikaci na pozemní komunikaci musí dát řidič přednost v jízdě vozidlům nebo jezdcům na zvířatech jedoucím po pozemní komunikaci nebo organizovanému útvaru chodců nebo průvodcům hnaných zvířat se zvířaty jdoucím po pozemní komunikaci. To platí i při vjíždění z účelové pozemní komunikace nebo ze stezky pro cyklisty nebo z obytné, pěší nebo cyklistické zóny na jinou pozemní komunikaci.

**Order of evaluation for the engine**

1. Lights working: follow the signal (section 3). Lights off or flashing amber: signs apply.
2. Approach from a zone, service road or off-road place: gives way to all (§ 23 odst. 1).
3. Minor road (P 4, P 6) gives way to main road (§ 22 odst. 1).
4. Among approaches of equal rank: give way to the vehicle from the right (§ 22 odst. 2); a
   left-turner also gives way to oncoming traffic and to trams in both directions (§ 21 odst. 5).
5. Tram exceptions from section 4.
6. Pedestrians from section 5, on top of everything above.

## 2. STOP sign: where to stop

> *ZSP § 22 odst. 4:* Na příkaz dopravní značky "Stůj, dej přednost v jízdě!" musí řidič zastavit vozidlo na takovém místě, odkud má do křižovatky náležitý rozhled.

> *VZ příloha č. 8, V 6b:* Značka vyznačuje místo, kde je řidič povinen zastavit vozidlo na příkaz značky „Stůj, dej přednost v jízdě!“.

So: where the line with the word STOP (V 6b) is painted, stop at that line. Where there is no
line, stop at a point with a proper view into the junction; the boundary of the junction is then
where the kerb starts to curve (ZSP § 2 písm. x). The stop must be complete. Driving schools add
that if the view from the line is not enough, the driver moves forward slowly after stopping and
stops again if needed; that is practice, not statute.

At a level crossing with a STOP sign the stopping point is the warning cross:

> *VZ příloha č. 1, A 32a:* Je-li řidič povinen před železničním přejezdem zastavit vozidlo, zastaví před touto značkou.

## 3. Traffic lights

> *ZSP § 70 odst. 2 písm. a):* signál s červeným světlem "Stůj!" povinnost zastavit vozidlo před dopravní značkou "Příčná čára souvislá", "Příčná čára souvislá se symbolem Dej přednost v jízdě!" a "Příčná čára souvislá s nápisem STOP", a kde taková dopravní značka není, před světelným signalizačním zařízením,

> *ZSP § 70 odst. 2 písm. b):* signál se současně svítícím červeným a žlutým světlem "Pozor!" povinnost připravit se k jízdě,

> *ZSP § 70 odst. 2 písm. c):* signál se zeleným plným kruhovým světlem "Volno" možnost pokračovat v jízdě, a dodrží-li ustanovení o odbočování, může odbočit vpravo nebo vlevo, přičemž musí dát přednost chodcům přecházejícím ve volném směru po přechodu pro chodce a cyklistům přejíždějícím ve volném směru po přejezdu pro cyklisty.

> *ZSP § 70 odst. 2 písm. d):* signál se žlutým světlem "Pozor!" povinnost zastavit vozidlo před dopravní značkou "Příčná čára souvislá", "Příčná čára souvislá se symbolem Dej přednost v jízdě!" a "Příčná čára souvislá s nápisem STOP", a kde taková dopravní značka není, před světelným signalizačním zařízením; je-li však toto vozidlo při rozsvícení tohoto signálu již tak blízko, že by řidič nemohl vozidlo bezpečně zastavit, smí pokračovat v jízdě.

> *ZSP § 70 odst. 2 písm. e):* signál se zelenou směrovou šipkou nebo šipkami (například "Signál pro přímý směr", "Kombinovaný signál pro přímý směr a odbočování vpravo") možnost pokračovat v jízdě jen ve směru, kterým šipka nebo šipky ukazují. Směřuje-li zelená šipka vlevo, neplatí pro odbočování vlevo § 21 odst. 5,

> *ZSP § 70 odst. 2 písm. g):* signál "Doplňková zelená šipka" svítící současně se signálem s červeným světlem "Stůj!" nebo se žlutým světlem "Pozor!" možnost pokračovat v jízdě jen ve směru, kterým šipka nebo šipky ukazují; přitom řidič musí dát přednost v jízdě vozidlům a jezdcům na zvířatech jedoucím ve volném směru a útvarům chodců jdoucím ve volném směru; přitom nesmí ohrozit ani omezit přecházející chodce.

In plain terms:

- **Red:** stop before the stop line, or before the signal head where there is no line.
- **Red with amber:** get ready. It is not permission to go.
- **Amber alone:** stop. The only exception is a car already so close when amber comes on that it
  cannot stop safely. Amber is not a "last chance to get through".
- **Full green:** you may go and may turn, but the turning rules still apply. Turning left, you
  give way to oncoming vehicles and to trams in both directions (§ 21 odst. 5). Turning either
  way, you give way to pedestrians and cyclists crossing with their own green.
- **Green arrow (directional signal):** go only in the direction of the arrow. With a green arrow
  pointing left, § 21 odst. 5 does not apply: oncoming traffic is held. A yellow walking-figure
  light next to the arrow (S 4a) warns that pedestrians cross the street you turn into.
- **Additional green arrow lit next to red (S 5):** go only that way, give way to vehicles moving
  on their green, and do not endanger or hinder pedestrians.
- **Flashing amber:** the junction is not controlled by lights; signs or the right-hand rule apply
  (last sentence of § 70 odst. 2 písm. d).
- A full green with the "signal for leaving the junction" (S 6) lit in the far corner also
  switches § 21 odst. 5 off (last sentence of § 70 odst. 2 písm. c).

Even on green you must not enter a junction you cannot clear:

> *ZSP § 22 odst. 3:* Řidič nesmí vjet do křižovatky, nedovoluje-li mu situace pokračovat v jízdě v křižovatce a za křižovatkou, takže by byl nucen zastavit vozidlo v křižovatce.

## 4. Trams

**The tram has priority over the car**

| Situation | Who gives way | Provision |
| --- | --- | --- |
| Car turns left, tram comes from the front or from behind on the tracks the car crosses | car | ZSP § 21 odst. 5 |
| Car turns right across tracks on its right, where driving along the tram on the left is allowed | car | ZSP § 21 odst. 6 |
| Tram runs beside the car in the same direction, signals and turns or otherwise changes direction across the car's path | car | ZSP § 21 odst. 7 |
| Car drives onto the tram strip (to pass, turn, or for lack of room) | car must not endanger or hinder the tram | ZSP § 13 odst. 2 |
| Sign P 5 "Dej přednost v jízdě tramvaji!" | car | VZ příloha č. 2 |
| Tram on the main road, car on the minor road | car | ZSP § 22 odst. 1 |
| Unsigned junction, tram comes from the car's right | car | ZSP § 22 odst. 2 |
| Shared zone (IZ 10a) | everyone else | ZSP § 39b odst. 2 |
| Tram standing at a stop with no platform island and no platform on a raised tram strip | car stops behind the tram | ZSP § 15 odst. 1 |

> *ZSP § 21 odst. 7:* Tramvaj, která při odbočování nebo jiné změně směru jízdy křižuje směr jízdy vozidla jedoucího po její pravé nebo levé straně a dává znamení o změně směru jízdy, má přednost v jízdě.

> *ZSP § 21 odst. 6:* Řidič odbočující vpravo musí dát přednost v jízdě vozidlům jedoucím ve vyhrazeném jízdním pruhu, pro něž je tento jízdní pruh vyhrazen, a cyklistům jedoucím v jízdním pruhu pro cyklisty. Tam, kde je povolena jízda podél tramvaje vlevo, musí dát přednost v jízdě i tramvaji.

> *ZSP § 13 odst. 2:* Při vjíždění na tramvajový pás nesmí řidič ohrozit ani omezit v jízdě tramvaj.

> *ZSP § 15 odst. 1:* Za vozidlem hromadné dopravy osob, které zastavilo v obci v zastávce bez nástupního ostrůvku nebo bez nástupiště na zvýšeném tramvajovém pásu, musí řidič jiného vozidla zastavit vozidlo; je-li v zastávce více vozidel hromadné dopravy osob, musí zastavit za druhým z nich. V jízdě smí pokračovat teprve tehdy, neohrozí-li již cestující, kteří nastupují nebo vystupují.

> *ZSP § 39b odst. 2:* Řidiče tramvaje nesmí ostatní účastníci provozu na pozemních komunikacích ani omezit a tramvaj má vždy přednost v jízdě.

> *VZ příloha č. 2, P 5:* Značka se používá v místě, kde má řidič povinnost dát přednost v jízdě tramvaji, a to zejména mimo křižovatku.

Notes on the stop rule: the car stops behind the tram (behind the second one if two stand there)
and may move only when boarding and alighting passengers are no longer endangered. Bezpečné
cesty advises letting everyone board and alight and, best of all, driving on only after the tram
has left. Stops with a platform island are passed on the right with extra care (§ 13 odst. 1).

**The tram does not have priority**

- Tram on a road marked P 4 or P 6, car on the main road: the tram gives way (§ 22 odst. 1).
- Unsigned junction, tram comes from the car's left: the tram gives way to the car on its right
  (§ 22 odst. 2). This follows from the text; the law gives trams no exemption here.
- Tram turning left across oncoming traffic: the tram gives way (§ 21 odst. 5). § 21 odst. 7
  covers only vehicles running beside the tram. Bezpečné cesty states it the same way: "Pokud
  tramvaj odbočuje z hlavní silnice vlevo, a tím křižuje dráhu protijedoucím vozidlům jedoucím a
  pokračujícím po hlavní silnici, musí jim dát přednost."
- Tram turning without the indicator: § 21 odst. 7 requires the signal. Do not rely on this in
  the game or on the road.
- Tram and car both going straight side by side: no priority question arises.
- At working lights the tram follows its own signals (§ 72) and the car follows the car signals.

Pedestrians give way to trams, also on a pedestrian crossing (§ 54 odst. 3, § 5 odst. 2 písm. f),
which is why the car that stops for a pedestrian may see the tram keep going.

## 5. Pedestrians

> *ZSP § 5 odst. 2 písm. f):* ohrozit nebo omezit chodce, který přechází pozemní komunikaci po přechodu pro chodce nebo který zjevně hodlá přecházet pozemní komunikaci po přechodu pro chodce, v případě potřeby je řidič povinen i zastavit vozidlo před přechodem pro chodce; tyto povinnosti se nevztahují na řidiče tramvaje,

> *ZSP § 5 odst. 2 písm. g):* ohrozit chodce přecházejícího pozemní komunikaci, na kterou řidič odbočuje, a dále nesmí ohrozit chodce při odbočování na místo ležící mimo pozemní komunikaci, při vjíždění na pozemní komunikaci a při otáčení nebo couvání,

> *ZSP § 5 odst. 1 písm. h):* snížit rychlost jízdy nebo zastavit vozidlo před přechodem pro chodce, sníží-li rychlost jízdy nebo zastaví-li vozidlo před přechodem pro chodce i řidiči ostatních vozidel jedoucích stejným směrem,

> *ZSP § 27 odst. 1 písm. c):* na přechodu pro chodce nebo na přejezdu pro cyklisty a ve vzdálenosti kratší než 5 m před nimi,

- The statutory words are "zjevně hodlá přecházet" (clearly intends to cross), not "zřejmě". The
  Act does not define them. For the engine, treat a person who stands at the kerb facing the
  crossing, or walks towards it, as intending to cross. The duty is not to endanger and not to
  hinder: the pedestrian must not have to stop, wait or step back because of the car.
- When a vehicle in the next lane slows or stops before a crossing, you must slow or stop too.
- Turning into a street, you must not endanger pedestrians crossing it, marked crossing or not.
  On a marked crossing the stricter duty of letter f) applies as well.
- At lights, a turning driver on full green gives way to pedestrians crossing on their green
  (§ 70 odst. 2 písm. c).
- No stopping or parking on a crossing or within 5 m before it; no overtaking on a crossing or
  just before it (§ 17 odst. 5 písm. d); no turning round or reversing on it (§ 24 odst. 4
  písm. c).
- Queuing: the Act has an express ban only for junctions (§ 22 odst. 3). There is no sentence
  that says "do not enter a crossing you cannot clear"; a car left standing on one hinders
  pedestrians, which letter f) forbids. The lawbook cites both for `BLOCKED_CROSSING`.
- The pedestrian has duties too, which matters when the engine assigns blame:

> *ZSP § 54 odst. 3:* Chodec nesmí vstupovat na přechod pro chodce nebo na vozovku bezprostředně před blížícím se vozidlem.

- A "místo pro přecházení" (V 7b) is not a pedestrian crossing: the driver must not endanger a
  pedestrian there, but the pedestrian has no priority.

## 6. Roundabouts

> *ZSP § 22 odst. 5:* Řidič vjíždějící na kruhový objezd označený dopravními značkami "Kruhový objezd" společně se značkou "Dej přednost v jízdě!" nebo "Kruhový objezd" společně se značkou "Stůj, dej přednost v jízdě" musí dát přednost v jízdě vozidlům a jezdcům na zvířatech jedoucím po kruhovém objezdu a organizovanému útvaru chodců a průvodci vedených a hnaných zvířat se zvířaty jdoucími po kruhovém objezdu.

> *ZSP § 30 odst. 5:* Při vjíždění na kruhový objezd a jízdě po kruhovém objezdu, nepřejíždí-li z jednoho jízdního pruhu do druhého podle § 12 odst. 5, řidič nedává znamení o změně směru jízdy; při vyjíždění z kruhového objezdu řidič je povinen dát znamení o změně směru jízdy.

- C 1 with P 4 (or P 6): the entering driver gives way to vehicles on the roundabout, in every
  lane of it.
- C 1 alone, without P 4 or P 6: the roundabout is an ordinary junction and the right-hand rule
  applies, so the vehicle on the roundabout gives way to the one entering from its right. Rare,
  but it exists in residential areas (Bezpečné cesty: "Kruhový objezd je křižovatka jako každá
  jiná. Je řízena značkami nebo zde platí přednost zprava.").
- Indicator: none when entering, none while driving round. Signal when changing lanes on the
  roundabout. Signal right when leaving, always, including at the first exit.
- Pedestrian crossings on the exits are ordinary crossings: § 5 odst. 2 písm. f) applies.

## 7. Indicators

> *ZSP § 30 odst. 1:* Znamení o změně směru jízdy musí řidič dávat kromě případů uvedených v jednotlivých ustanoveních také vždy při změně směru jízdy, vybočování z něho, nebo jestliže to vyžaduje bezpečnost provozu na pozemních komunikacích.

> *ZSP § 30 odst. 2:* Znamení o změně směru jízdy musí řidič dávat včas před započetím jízdního úkonu s ohledem na okolnosti provozu na pozemních komunikacích, zejména na řidiče jedoucí za ním a na povahu jízdního úkonu.

> *ZSP § 30 odst. 4:* Znamení o změně směru jízdy dávané směrovými světly ponechá řidič jen do doby ukončení změny směru jízdy, vybočení z něho, nebo pokud vozidlo nezaujme místo v jízdním pruhu, do kterého přejíždí.

| Manoeuvre | Provision | Quote |
| --- | --- | --- |
| Turning at a junction or off the road | ZSP § 21 odst. 1 | see below |
| Turning the car round | ZSP § 24 odst. 1 | the rules on turning apply |
| Changing lanes | ZSP § 12 odst. 5 | see below |
| Moving out round a stopped vehicle, an obstacle or a pedestrian | ZSP § 16 | "Přitom musí dávat znamení o změně směru jízdy." |
| Overtaking: moving out and moving back in | ZSP § 17 odst. 2 a 3 | also for every cyclist overtaken |
| Pulling in to the kerb | ZSP § 25 odst. 5 | see section 12 |
| Pulling away from the kerb | ZSP § 25 odst. 6 | see section 12 |
| Leaving a roundabout | ZSP § 30 odst. 5 | see section 6 |

> *ZSP § 21 odst. 1:* Při odbočování na křižovatce nebo na místo ležící mimo pozemní komunikaci musí řidič dávat znamení o změně směru jízdy; při odbočování nesmí ohrozit řidiče jedoucí za ním a musí dbát zvýšené opatrnosti.

> *ZSP § 12 odst. 5:* Přejíždět z jednoho jízdního pruhu do druhého smí řidič jen tehdy, neohrozí-li a neomezí-li řidiče jedoucího v jízdním pruhu, do kterého přejíždí; přitom musí dávat znamení o změně směru jízdy.

The law sets no number of seconds or metres for "včas". The test is whether the drivers behind
could react before the manoeuvre began, so the signal comes before braking and steering.

## 8. Speed

> *ZSP § 18 odst. 4:* V obci smí jet řidič rychlostí nejvýše 50 km.h-1, a jde-li o dálnici nebo silnici pro motorová vozidla, nejvýše 80 km.h-1.

> *ZSP § 39 odst. 5:* V obytné zóně a pěší zóně smí řidič jet rychlostí nejvýše 20 km.h-1. Přitom musí dbát zvýšené ohleduplnosti vůči chodcům, které nesmí ohrozit; v případě nutnosti musí zastavit vozidlo.

> *VZ příloha č. 5, IZ 8a:* Značka označuje oblast, zejména část obce, kde platí výstraha, zákaz, omezení nebo příkaz vyplývající z příslušných vyobrazení značky nebo značek, pokud místní úpravou provozu na pozemních komunikacích uvnitř oblasti není stanoveno jinak

> *VZ příloha č. 3, B 20a:* Značka zakazuje řidiči překročit rychlost vyjádřenou na značce číslem v kilometrech za hodinu.

> *ZSP § 28 odst. 3:* Ve vzdálenosti 50 m před železničním přejezdem a při jeho přejíždění smí řidič jet rychlostí nejvýše 30 km.h-1. Svítí-li přerušované bílé světlo signálu přejezdového zabezpečovacího zařízení, smí 50 m před železničním přejezdem a při jeho přejíždění jet rychlostí nejvýše 50 km.h-1.

> *ZSP § 18 odst. 2 písm. b):* omezovat plynulost provozu na pozemních komunikacích, zejména bezdůvodně pomalou jízdou a pomalým předjížděním.

> *ZSP § 18 odst. 1:* Rychlost jízdy musí řidič přizpůsobit zejména svým schopnostem, vlastnostem vozidla a nákladu, předpokládanému stavebnímu a dopravně technickému stavu pozemní komunikace, její kategorii a třídě, povětrnostním podmínkám a jiným okolnostem, které je možno předvídat; smí jet jen takovou rychlostí, aby byl schopen zastavit vozidlo na vzdálenost, na kterou má rozhled.

- Built-up area: 50 km/h. Signs can lower it, or raise it by at most 30 km/h (§ 18 odst. 6 a 7).
- Residential zone (IZ 5a) and pedestrian zone (IZ 6a): 20 km/h. Shared zone (IZ 10a): 20 km/h
  (§ 39b odst. 4). Cycle zone (IZ 9a): 30 km/h (§ 39a odst. 4).
- "Zone 30" is the sign IZ 8a showing a B 20a with the number 30. It holds until the
  end-of-zone sign IZ 8b (VZ § 3 odst. 6). Where a junction inside the zone has no priority
  signs, the right-hand rule applies.
- A single B 20a ends at the next junction or at the end sign:

> *VZ § 3 odst. 3:* Zákaz, omezení nebo příkaz je ukončen nejbližší křižovatkou nebo příslušnou dopravní značkou.

- Level crossing: 30 km/h from 50 m before it and across it, 50 km/h while the white light
  flashes.
- Needlessly slow driving is itself a breach (§ 18 odst. 2 písm. b), and the exam criteria name
  it (VA § 19 odst. 4 písm. n): "nejet nepřiměřeně nízkou rychlostí při optimálních podmínkách
  dovolujících rychlost vyšší").
- The law gives no tolerance above the limit. How the game splits `SPEEDING_MINOR` from
  `SPEEDING_MAJOR` is a game decision; real candidates fail for a few km/h over (Garáž.cz:
  "Překročení rychlosti v obci. Mnohdy i o pár km/h.").

## 9. Lights and seat belts

> *ZSP § 32 odst. 1:* Motorové vozidlo musí mít za jízdy rozsvícena obrysová světla a potkávací světla nebo světla pro denní svícení, pokud je jimi vybaveno podle zvláštního právního předpisu2).

> *ZSP § 6 odst. 1 písm. a):* být za jízdy připoután na sedadle bezpečnostním pásem, pokud jím je sedadlo povinně vybaveno podle zvláštního právního předpisu2),

Lights are required whenever the vehicle is driven, day and night, all year. In reduced
visibility daytime running lights are not enough: dipped or main beam is required (§ 32 odst. 2).
Passengers must be belted too (§ 9 odst. 1 písm. a). The driver's belt duty does not apply while
reversing (§ 6 odst. 2 písm. a).

## 10. One-way streets, no entry, turn rules, keeping right, lanes, centre line

> *VZ příloha č. 3, B 2:* Značka zakazuje vjezd všem druhům vozidel na jednosměrnou pozemní komunikaci, v níž je provoz veden opačným směrem.

> *VZ příloha č. 5, IP 4b:* Značka označuje směr jízdy vozidel na jednosměrné pozemní komunikaci.

> *VZ příloha č. 3, B 24a:* Značka zakazuje odbočování vpravo na nejbližší křižovatce, na účelovou komunikaci v místě jejího připojení nebo na místo ležící mimo pozemní komunikaci.

> *VZ příloha č. 4, C 2a:* Značka přikazuje jízdu ve směru přímo.

> *ZSP § 4 písm. c):* řídit se světelnými, případně i doprovodnými akustickými signály, dopravními značkami, dopravními zařízeními a zařízeními pro provozní informace.

> *ZSP § 11 odst. 1:* Na pozemní komunikaci se jezdí vpravo, a pokud tomu nebrání zvláštní okolnosti, při pravém okraji vozovky, pokud není stanoveno jinak.

> *ZSP § 12 odst. 2:* V obci na pozemní komunikaci o dvou nebo více jízdních pruzích vyznačených na vozovce v jednom směru jízdy smí řidič motorového vozidla užívat k jízdě kteréhokoliv jízdního pruhu; přitom se nepovažuje za předjíždění, jedou-li vozidla v jednom z jízdních pruhů rychleji než vozidla v jiném jízdním pruhu.

> *ZSP § 21 odst. 3:* Před odbočováním vpravo se musí řidič zařadit co nejblíže k pravému okraji vozovky; musí-li přitom s ohledem na rozměry vozidla nebo nákladu vybočit ze směru své jízdy vlevo, dává vždy jen znamení o změně směru jízdy vpravo. Před odbočováním vlevo se musí zařadit co nejdále vlevo v části vozovky určené pro jeho směr jízdy s ohledem na rozměry vozidla nebo nákladu a šířku vozovky.

> *VZ příloha č. 8, V 1a:* Značku je zakázáno přejíždět nebo ji nákladem přesahovat, pokud to není nutné k objíždění, předjíždění cyklisty, odbočování na místo ležící mimo pozemní komunikaci nebo vjíždění na pozemní komunikaci z místa ležícího mimo pozemní komunikaci.

- B 2 is the red disc with the white bar at the wrong end of a one-way street. B 1 (white disc,
  red rim) closes the road to all vehicles in both directions.
- In a one-way street the whole width is "your direction": before turning left, move to the left
  edge. You may stop and park on either side (§ 25 odst. 1 písm. a). You must not turn round or
  reverse there, except to reverse as far as needed, for example into a parking space
  (§ 24 odst. 4 písm. g).
- B 24a and B 24b ban the turn at the nearest junction. B 25 bans turning round. C 2a to C 2f
  allow only the directions shown. When the examiner's instruction would break one of them, the
  sign decides.
- In town any marked lane in your direction may be used. Where arrows (V 9a) mark the lanes, the
  lane decides the direction.
- A continuous centre line (V 1a) must stay on your left. Turning left at a junction is not among
  the listed exceptions for crossing it.

## 11. Level crossings

> *ZSP § 28 odst. 1:* Před železničním přejezdem si musí řidič počínat zvlášť opatrně, zejména se přesvědčit, zda může železniční přejezd bezpečně přejet.

> *ZSP § 29 odst. 1 písm. a):* je-li dávána výstraha dvěma červenými střídavě přerušovanými světly signálu přejezdového zabezpečovacího zařízení,

> *ZSP § 28 odst. 5:* Před železničním přejezdem, u kterého je umístěna dopravní značka "Stůj, dej přednost v jízdě!", musí řidič zastavit vozidlo na takovém místě, odkud má náležitý rozhled na trať.

The driver must not enter the crossing (§ 29 odst. 1) when:

- a) two red lights flash alternately,
- b) the horn or bell sounds,
- c) the barriers are coming down, are down, or are going up,
- d) a train is already visible or audible (not when the white light flashes),
- e) a railway employee signals stop with a flag or a red light,
- f) the situation beyond the crossing does not allow the car to clear it.

You must stop in all of those cases, and always at a crossing with a STOP sign (P 6), at the
warning cross. Other duties: 30 km/h from 50 m before the crossing, or 50 km/h with the white
light (§ 28 odst. 3); no overtaking on or just before it (§ 17 odst. 5 písm. g); no turning round
or reversing (§ 24 odst. 4 písm. e); no stopping or parking on it or within 15 m before and after
it (§ 27 odst. 1 písm. g); cross without delay (§ 28 odst. 3, last sentence).

## 12. Pulling away from the kerb, stopping and parking

> *ZSP § 25 odst. 6:* Řidič vozidla, které zastavilo nebo stálo a opět vyjíždí od okraje pozemní komunikace nebo od chodníku, musí dávat znamení o změně směru jízdy a nesmí ohrozit ostatní účastníky provozu na pozemních komunikacích.

> *ZSP § 25 odst. 5:* Zajíždí-li řidič za účelem zastavení nebo stání k okraji pozemní komunikace nebo k chodníku, musí dávat znamení o změně směru jízdy.

> *ZSP § 25 odst. 1 písm. a):* vpravo ve směru jízdy co nejblíže k okraji pozemní komunikace a na jednosměrné pozemní komunikaci vpravo i vlevo,

> *ZSP § 27 odst. 1 písm. d):* na křižovatce a ve vzdálenosti kratší než 5 m před hranicí křižovatky a 5 m za ní; tento zákaz neplatí v obci na křižovatce tvaru "T" na protější straně vyúsťující pozemní komunikace,

Pulling away: signal, and endanger nobody. The driver who pulls out has no priority over anyone.
A bus, trolleybus or tram leaving a stop in town is the exception the other way round: other
drivers must let it out, by slowing or stopping (§ 25 odst. 6, second sentence).

Stopping and parking rules that come up in an exam:

| Rule | Provision |
| --- | --- |
| On the right, as close to the edge as possible; either side in a one-way street | § 25 odst. 1 písm. a) |
| In one row, parallel to the edge; a car up to 3.5 t may stand at right angles or at an angle in town if that endangers nobody | § 25 odst. 1 písm. b) |
| While parked, one lane at least 3 m wide must stay free for each direction | § 25 odst. 3 |
| Not on a pedestrian or cycle crossing, nor within 5 m before it | § 27 odst. 1 písm. c) |
| Not in a junction, nor within 5 m before its boundary and 5 m after it (except the far side of a T junction in town) | § 27 odst. 1 písm. d) |
| Not at a public transport stop without an island: from the stop sign to 5 m past the stop marker, or 30 m before and 5 m after the marker where there is no sign | § 27 odst. 1 písm. f) |
| Not on a level crossing, nor within 15 m before and after it | § 27 odst. 1 písm. g) |
| Not where the car would hide a traffic sign or lane arrows | § 27 odst. 1 písm. h) |
| Not on a bridge, not on a tram strip, not in front of a driveway | § 27 odst. 1 písm. l), p), n) |
| Not where a 3.5 m lane would not stay free between the car and the nearest tram rail, 5.00 to 19.00 | § 27 odst. 2 |
| Residential and pedestrian zones: parking only in marked places | § 39 odst. 5 |
| Signs B 28 (no stopping) and B 29 (no parking), yellow lines V 12c and V 12d | VZ přílohy č. 3 a 8 |
| Before leaving the car, secure it against movement and misuse | § 26 odst. 2 |
| Open a door only when that endangers nobody | § 26 odst. 1 |

## 13. The exam itself

**Who is in the car.** The candidate drives. The instructor (učitel výcviku) of the candidate's
driving school sits in the instructor's seat with the second set of pedals. The zkušební komisař
is an employee of the municipal office with extended powers who holds an examiner's card
(ZA § 33 odst. 2); in practice the komisař sits in the back and gives the directions. An
interpreter or a state supervisor may also ride along.

> *ZA § 43 odst. 4:* Zkoušky se účastní učitel výcviku autoškoly, která žadatele přihlásila ke zkoušce. Učitel výcviku sedí ve vozidle na sedadle pro učitele výcviku.

**Duration.** At least 10 minutes for the first part and at least 20 minutes for the second, so
at least 30 minutes for category B. The 30-minute setting of the game matches the legal minimum.

> *ZA § 43 odst. 1:* Zkouška z praktické jízdy musí trvat v první části nejméně 10 minut a v druhé části nejméně 20 minut, pokud má být řidičské oprávnění uděleno pro skupinu AM, A1, A2, A, B1, B, B+E nebo T, a nejméně 35 minut pro ostatní skupiny vozidel.

**Evaluation.** Two results only, no points and no percentage.

> *ZA § 39 odst. 2:* Výsledek každé zkoušky se hodnotí stupněm „prospěl“ nebo „neprospěl“. Jestliže žadatel o řidičské oprávnění neprospěl v některé zkoušce, může tuto zkoušku nejvýše dvakrát opakovat.

> *ZA § 42 odst. 1:* Žadatel o řidičské oprávnění, který při zkoušce neprokáže základní znalosti u každé ze dvou částí, je hodnocen stupněm "neprospěl".

**What fails it, and what ends it at once.**

> *ZA § 43 odst. 2:* Chyby v řízení nebo nebezpečné vedení bezprostředně snižující bezpečnost výcvikového vozidla, jeho osádky nebo jiných účastníků provozu vozidel na pozemních komunikacích se hodnotí stupněm "neprospěl" bez ohledu na to, zda zkušební komisař nebo učitel výcviku zasáhnou (verbálně nebo přímo) do ovládacích prvků vozidla.

> *ZA § 43 odst. 3:* Dojde-li při zkoušce k takovému porušení pravidel provozu na pozemních komunikacích, které ohrozilo nebo může ohrozit vážným způsobem bezpečnost provozu na pozemních komunikacích, anebo k situaci, kdy musel do řízení motorového vozidla zasáhnout učitel, zkouška se okamžitě ukončí a žadatel je hodnocen stupněm "neprospěl".

So the exam ends immediately on (1) a breach of the traffic rules that seriously endangered
traffic or could have, or (2) any intervention by the instructor in the driving. A driving error
that directly reduces safety is a fail even when nobody intervened. Not every breach of a rule
ends the exam on the spot: the text requires serious danger, actual or potential.

**Tolerance for small errors.** There is no official number. The law and the decree contain no
count of permitted minor faults. The examiner assesses the whole drive against the criteria in
VA § 19 odst. 4 (safe, anticipating, considerate, decisive driving; obeying the rules; use of
controls; observation; priority; signs and signals; distance; position; speed; signalling). A
written record of the exam is made (ZA § 42 odst. 1).

> *VA § 19 odst. 4 písm. a):* bezpečný, předvídavý, ohleduplný, přizpůsobivý a rozhodný způsob jízdy,

**Before driving off.** Category B candidates are asked to check the car and prepare the
driver's place, then start and move off smoothly.

> *VA § 19 odst. 1 písm. a) bod 1:* před zahájením jízdy prověřit stav pneumatik, osvětlení vozidla a směrových světel, zvukového výstražného zařízení, funkčnost řízení a brzd, čelního skla, stěračů, provozních kapalin, přístrojové desky a funkčnost sdělovačů, přizpůsobit si sedadlo a opěrku hlavy do správné polohy, přizpůsobit si zpětná zrcátka, zapnout si bezpečnostní pás a ověřit, že jsou zavřeny všechny dveře,

The game's `CHECKLIST` covers the part done from the driver's seat. In a real exam the komisař
often asks short questions at the car first: tyres and tread depth, lights, fluids, dashboard
warning lights, mandatory equipment (Autoškola Jurečka, AutoTrip.cz).

**Manoeuvres.**

> *VA § 19 odst. 1 písm. a) bod 2:* následně nastartovat motor a provést plynulé rozjetí vozidla (v průběhu zkoušky provést rozjezd do kopce a z kopce), couvat se zatáčením vlevo i vpravo, zabrzdit vozidlo na přesnost zastavení, zaparkovat vozidlo a opustit parkovací prostor, zajet k obrubníku a vyjet od něho, objet stojící vozidla a překážky, u skupiny vozidel B a B1 navíc otočit vozidlo přední částí do protisměru za použití chodu vpřed a zpětného chodu,

The Act lists the first part in ZA § 42 odst. 3 (preparing the car, moving off, stopping,
reversing, driving into and out of a confined space, parallel, angled and perpendicular parking,
hill start, driving at up to 30 km/h) and the second part in § 42 odst. 4 (traffic of varying
density, different road types, a junction with traffic lights, streets with public transport and
pedestrian crossings, driving outside town, or in large cities at least a multi-lane road with a
limit above 50 km/h).

**Theory test, for reference.** 25 questions, 50 points, pass mark 43, time limit 30 minutes.
Answers are worth 1, 2 or 4 points (VA § 17 odst. 7). The theory test comes first and must be
passed before the drive (ZA § 39 odst. 4).

> *VA § 17 odst. 1:* Test, kterým se provádí zkouška z předpisů o provozu na pozemních komunikacích a zdravotnické přípravy, je složen z 25 otázek s možností získání 50 bodů.

> *VA § 17 odst. 8:* Pro hodnocení testu stupněm "prospěl" je potřebné získání nejméně 43 bodů.

> *ZA § 40 odst. 2:* Na vykonání zkoušky se stanoví doba 30 minut.

**Retakes and fees.** A failed part may be repeated twice; after that, new training is required
before the next attempt (ZA § 39 odst. 2). Everything must be passed within 12 months of the
first exam (ZA § 39 odst. 6). The fee is 700 Kč for the exam and 400 Kč for a repeated practical
drive, 100 Kč for a repeated theory test (ZA § 39a).

## 14. Why candidates fail in practice

No official statistics on reasons for failing in Prague were found. The list below is what
driving schools and the chairman of the driving-school association report. The first source is a
school with a branch in Praha 8 (Střížkov), in or next to the area the game covers.

Autoškola BuBu (Praha 8, Kladno, Statenice), four most common reasons:

1. Poor observation of the traffic around, mostly at junctions and when turning. "Komisař musí
   vidět pohyb hlavy."
2. Mirrors not used, or used only for show: lane changes, pulling away from the kerb.
3. Priority at junctions, above all uncertainty at unsigned ones.
4. Stress: one small slip leads to panic and more errors.

Aleš Horčička, Asociace autoškol ČR (Garáž.cz):

1. Pedestrian crossings: not letting a pedestrian who stands at the crossing go.
2. Speed in town, "mnohdy i o pár km/h".
3. Speed in residential zones: the sign is missed and 20 km/h is exceeded.
4. One-way streets: not using the whole width; turning left out of one from the middle instead
   of the left edge.
5. Unsigned junctions: the right-hand rule is not noticed or not applied.
6. Lights: misjudging the change and passing on amber or red.

Auto.cz and the schools in Nový Jičín add: forgotten seat belt, lights not switched on, rolling
through a STOP sign, late or missing indicator (most often leaving a roundabout), indicator left
on, no shoulder check before moving off or changing lanes, splashing pedestrians, accepting
priority offered by a driver who actually has it, and entering a street closed by a no-entry sign
when the examiner gives no direction.

For the game this points to the situations worth generating most often: pedestrians at
crossings, unsigned junctions in zones 30, one-way streets, left turns across tram tracks, tram
stops without islands, and lights that change on approach. The AutoTrip.cz account of a Prague
exam describes most of the drive inside a zone 30 with right-hand-rule junctions and one-way
streets, a tram junction, and parallel parking at the end.

## Choices made in `lawbook.js`

**`MINOR_LIMIT = 4`.** The real exam has no fixed number of tolerated small errors (section 13).
The game needs one. Schools describe the practice as "pár drobností se ztratí, jenže když se
stejná drobnost opakuje pořád dokola, přestává být drobností" (Autoškola Jurečka). Three minor
faults are forgiven and the fourth fails the mock exam. That is strict on purpose: the detector
notices every missing signal, where a human examiner may let one go, and a learner is better
served by a mock that is harder than the real thing.

**Severity.** No code was moved between the groups of the architecture document. Notes:

- `SPEEDING_MINOR` stays minor so that the game can separate a small excess from a large one. In
  a real exam a small excess can already fail the candidate; the `rule` text says so.
- `NO_BELT` and `NO_LIGHTS` stay minor because the game reminds the player (`checkBelt`,
  `checkLights`). Both are plain breaches of the Act, and one school reports that moving off
  unbelted ends its candidates' exams.
- `STOP_SIGN` is serious: not stopping breaks an express command and removes the view the rule
  exists to secure. Stopping, but beyond the line, is `STOP_LINE_OVERRUN` (minor).
- `NO_OBSERVATION` is minor when nobody was affected. If someone was, the engine should raise
  `NO_YIELD_PULL_OUT` or a collision instead.
- `IGNORED_INSTRUCTION` breaks no traffic rule. It is kept as a minor fault of the mock; the
  `law` field says that it is assessed under the exam decree only.
- `BLOCKED_CROSSING` is written to cover both a pedestrian crossing and a junction.

**What each `law` field relies on.** All provisions cited in `LAWBOOK` are quoted or listed in the
sections above, except these, which were also read: ZSP § 4 písm. a), § 5 odst. 1 písm. b) a d),
§ 19 odst. 1, § 53 odst. 2; VA § 19 odst. 4 písm. e) a i); VZ V 5, V 9a, B 1, B 24b, B 25.

> *ZSP § 4 písm. a):* chovat se ohleduplně a ukázněně, aby svým jednáním neohrožoval život, zdraví nebo majetek jiných osob ani svůj vlastní, aby nepoškozoval životní prostředí ani neohrožoval život zvířat, své chování je povinen přizpůsobit zejména stavebnímu a dopravně technickému stavu pozemní komunikace,1) povětrnostním podmínkám, situaci v provozu na pozemních komunikacích, svým schopnostem a svému zdravotnímu stavu,

> *ZSP § 5 odst. 1 písm. b):* věnovat se plně řízení vozidla nebo jízdě na zvířeti a sledovat situaci v provozu na pozemních komunikacích,

> *ZSP § 19 odst. 1:* Řidič vozidla jedoucí za jiným vozidlem musí ponechat za ním bezpečnou vzdálenost, aby mohl zastavit vozidlo v případě náhlého snížení rychlosti nebo náhlého zastavení vozidla, které jede před ním.

> *ZSP § 53 odst. 2:* Jiní účastníci provozu na pozemních komunikacích než chodci nesmějí chodníku nebo stezky pro chodce užívat, pokud není v tomto zákoně stanoveno jinak nebo pokud nejde o užití chodníku vozidlem základní složky integrovaného záchranného systému nezbytné k plnění úkolů souvisejících s výkonem zvláštních povinností nebo vozidlem Inspekce silniční dopravy nebo obecní policie při plnění jejich úkolů.

> *ZSP § 18 odst. 2 písm. a):* snížit náhle rychlost jízdy nebo náhle zastavit, pokud to nevyžaduje bezpečnost provozu na pozemních komunikacích,

> *VA § 19 odst. 4 písm. e):* správné používání ovládacích prvků s ohledem na způsob a kvalitu jízdy, ovládání spojky, převodovky, akcelerátoru, řízení, brzdového systému včetně pomocných brzdových systémů, je-li jimi vozidlo vybaveno, používání jiných postupů zpomalování jízdy než brzdění a využívání parkovací brzdy k bezpečnému rozjezdu do svahu,

> *VA § 19 odst. 4 písm. i):* pozorovací schopnosti, panoramatické vidění, správné a včasné používání zpětných zrcátek, vidění na dlouhé, střední a krátké vzdálenosti v souvislosti se schopností včasné a správné reakce,

## Sign codes

All names in `SIGN_NAMES` are the official names from the annexes of vyhláška č. 294/2015 Sb. in
the wording in force from 1 July 2025. Three keys may not mean what the map data assumes:

| Key | Official name | Note |
| --- | --- | --- |
| `A7a` | Nerovnost vozovky | General uneven road. The warning for a speed hump is A 7b "Zpomalovací práh"; the sign at the hump itself is IP 2 "Zpomalovací práh". |
| `IJ4b` | Označník zastávky | The stop marker, for any scheduled service. IJ 4a has the same name. It is not the bus-stop sign. |
| `IJ4c` | Zastávka autobusu | The tram stop is IJ 4d "Zastávka tramvaje", the trolleybus stop IJ 4e. `IJ4d` was added to `SIGN_NAMES` for that reason. |

The other keys match the official numbering once the space is removed (B 20a, C 2a, IP 4b,
IZ 8a and so on). IP 4a and IP 4b carry the same name, "Jednosměrný provoz".

## Not verified in a legal text

- **Earliest date of a retake.** Autoškola Jurečka states that a failed part can be repeated "nejdřív
  za 5 pracovních dnů". No such period was found in the current text of zákon č. 247/2000 Sb. The
  lawbook does not use it.
- **Who the examiners are in Prague.** The Act says "obecní úřad obce s rozšířenou působností"
  (ZA § 33); that this is the Magistrát hlavního města Prahy for exams in Prague was not checked
  against a source in this session.
- **Where the komisař sits.** The Act fixes only the instructor's seat. "In the back" comes from
  driving-school descriptions.
- **Stopping again after the STOP line when the view is poor** is teaching practice, not a
  quoted provision.
- **Tram from the left at an unsigned junction gives way to the car** is a direct reading of
  § 22 odst. 2 with § 2 písm. f). The secondary sources say in general terms that a tram follows
  the same rules as cars outside the special cases; none was found that draws this exact picture.
- **Queuing on a pedestrian crossing** has no dedicated provision (section 5).

Everything else cited by paragraph, subsection and letter was read in the provision itself.
