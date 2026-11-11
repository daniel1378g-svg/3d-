// Rule catalogue for the mock exam: what each fault means, what the rule requires and where the
// rule is written. Plain data, no imports, no DOM, so it runs in Node tests and in the bundle.
//
// Sources, all read in the wording in force on 11 November 2026 (see docs/rules-notes.md for the
// quotes and the research behind every entry):
//   - zákon č. 361/2000 Sb., o provozu na pozemních komunikacích (traffic rules)
//   - zákon č. 247/2000 Sb. and vyhláška č. 167/2002 Sb. (how the driving exam is run and assessed)
//   - vyhláška č. 294/2015 Sb. (traffic signs, road markings, light signals)
//
// Every `law` string cites a provision whose text was checked against those sources. Keep it that
// way: if you add a citation, read the provision first and note it in rules-notes.md.

// Number of minor faults at which the mock exam is failed: the fourth minor fault fails it.
//
// The real exam has no such number. The law knows only "prospěl" and "neprospěl" (§ 39 odst. 2
// zákona č. 247/2000 Sb.); the examiner weighs the whole drive against the criteria in § 19 odst. 4
// vyhlášky č. 167/2002 Sb., and only danger or an instructor intervention ends it on the spot
// (§ 43 odst. 3 zákona č. 247/2000 Sb.). Driving schools describe the practice as "a couple of
// small slips get lost, a repeated slip stops being small". A game needs a fixed line, so three
// minor faults are forgiven and the fourth is treated as a pattern. That is deliberately on the
// strict side, because the detector here is consistent where a human examiner is lenient.
export const MINOR_LIMIT = 4;

const ACT = 'zákona č. 361/2000 Sb.';
const EXAM_DECREE = 'vyhlášky č. 167/2002 Sb.';
const SIGN_DECREE = 'vyhlášky č. 294/2015 Sb.';

// { [code]: { severity, title, what, rule, law, cz } }
// `what` is a complete sentence so the game can append a detail after it ("62 km/h in a 50 zone").
// Serious faults end the exam at once, as § 43 odst. 3 of the exam act does for a breach that
// endangers traffic or forces the instructor to step in. Minor faults are counted.
export const LAWBOOK = {
  // ---------------------------------------------------------------- serious

  RED_LIGHT: {
    severity: 'serious',
    title: 'Ran a red light',
    what: 'You drove past a red signal.',
    rule: 'Red means stop before the stop line, or before the signal where there is no line. '
      + 'Amber means the same, unless you are already so close that you cannot stop safely.',
    law: `§ 70 odst. 2 písm. a) a d) ${ACT}`,
    cz: 'Jízda na signál „Stůj!“ (červená)',
  },

  STOP_SIGN: {
    severity: 'serious',
    title: 'Did not stop at STOP',
    what: 'You passed a STOP sign without bringing the car to a complete stop.',
    rule: 'At the STOP sign (P 6) you must stop completely, even when the road is empty. '
      + 'Stop at the line marked STOP, or where there is no line, at a point with a clear view '
      + 'into the junction. Then give way to traffic on the main road.',
    law: `§ 22 odst. 4 ${ACT}; značky P 6 a V 6b ${SIGN_DECREE}`,
    cz: 'Nezastavení na značce „Stůj, dej přednost v jízdě!“',
  },

  NO_YIELD_SIGN: {
    severity: 'serious',
    title: 'Did not give way at a sign',
    what: 'You entered the junction from a minor road and made a vehicle on the main road brake '
      + 'or swerve.',
    rule: 'The give-way sign (P 4) and the STOP sign (P 6) mark the minor road. '
      + 'You must give way to every vehicle arriving along the main road, from either side, '
      + 'including trams and cyclists. Wait until you can go without making anyone change speed or '
      + 'direction.',
    law: `§ 22 odst. 1 ${ACT}`,
    cz: 'Nedání přednosti v jízdě vozidlu na hlavní pozemní komunikaci',
  },

  NO_YIELD_RIGHT: {
    severity: 'serious',
    title: 'Did not give way to the right',
    what: 'You did not give way to a vehicle coming from your right at a junction where signs do '
      + 'not decide priority.',
    rule: 'Where signs and signals do not decide priority, the vehicle coming from the right goes '
      + 'first. The same applies between two vehicles that are both on the main road or both on '
      + 'minor roads. Slow down before every unsigned junction and look right.',
    law: `§ 22 odst. 2 ${ACT}`,
    cz: 'Nedání přednosti v jízdě vozidlu přijíždějícímu zprava',
  },

  NO_YIELD_LEFT_TURN: {
    severity: 'serious',
    title: 'Turned left across oncoming traffic',
    what: 'You turned left in front of an oncoming vehicle.',
    rule: 'When you turn left you must give way to oncoming vehicles, cyclists included, and to '
      + 'trams in both directions. A full green light does not change that; a green arrow '
      + 'pointing left does. Wait in the junction until the way is clear.',
    law: `§ 21 odst. 5 ${ACT}`,
    cz: 'Nedání přednosti protijedoucímu vozidlu při odbočování vlevo',
  },

  NO_YIELD_ROUNDABOUT: {
    severity: 'serious',
    title: 'Did not give way at a roundabout',
    what: 'You entered the roundabout in front of a vehicle that was already on it.',
    rule: 'Where the roundabout sign (C 1) stands together with the give-way or STOP sign, '
      + 'vehicles on the roundabout have priority. Wait at the entry until there is a gap in every '
      + 'lane you will cross.',
    law: `§ 22 odst. 5 ${ACT}`,
    cz: 'Nedání přednosti vozidlu jedoucímu po kruhovém objezdu',
  },

  NO_YIELD_TRAM: {
    severity: 'serious',
    title: 'Did not give way to a tram',
    what: 'You did not give way to a tram that had priority.',
    rule: 'Give way to trams in both directions when you turn left, and to a tram beside you that '
      + 'signals and turns across your path. Do not drive onto the tracks in front of a tram. '
      + 'At a stop without a platform island, stop behind the tram and wait until passengers are '
      + 'clear.',
    law: `§ 21 odst. 5 a 7, § 13 odst. 2 a § 15 odst. 1 ${ACT}`,
    cz: 'Nedání přednosti v jízdě tramvaji',
  },

  NO_YIELD_PULL_OUT: {
    severity: 'serious',
    title: 'Pulled out into traffic',
    what: 'You pulled away from the kerb in front of a vehicle that had to brake or swerve.',
    rule: 'When you move off from the edge of the road you must not endanger anyone. '
      + 'Signal, check the mirror, look over your shoulder and wait for a safe gap.',
    law: `§ 25 odst. 6 ${ACT}`,
    cz: 'Ohrožení jiného řidiče při vyjíždění od okraje vozovky',
  },

  PEDESTRIAN_CROSSING: {
    severity: 'serious',
    title: 'Did not let a pedestrian cross',
    what: 'You drove over a pedestrian crossing while a pedestrian was on it or clearly about to '
      + 'step onto it.',
    rule: 'You must not endanger or hinder a pedestrian who is crossing on a pedestrian crossing '
      + 'or clearly intends to. Slow down early and stop before the crossing when needed; when a '
      + 'vehicle beside you slows or stops there, do the same. When you turn into a street, you '
      + 'must not endanger pedestrians crossing it.',
    law: `§ 5 odst. 2 písm. f) a g) a § 5 odst. 1 písm. h) ${ACT}`,
    cz: 'Ohrožení nebo omezení chodce na přechodu pro chodce',
  },

  SPEEDING_MAJOR: {
    severity: 'serious',
    title: 'Well over the speed limit',
    what: 'You drove well over the speed limit.',
    rule: 'The limit in a built-up area is 50 km/h unless a sign sets another one. '
      + 'It is 20 km/h in a residential or pedestrian zone and 30 km/h in a zone 30. '
      + 'Read the signs and stay at or below the limit.',
    law: `§ 18 odst. 4 a § 39 odst. 5 ${ACT}; značky B 20a a IZ 8a ${SIGN_DECREE}`,
    cz: 'Výrazné překročení nejvyšší dovolené rychlosti',
  },

  WRONG_WAY: {
    severity: 'serious',
    title: 'Drove past a no-entry sign',
    what: 'You drove past a no-entry sign or against the direction of a one-way street.',
    rule: 'The no-entry sign (B 2) stands at the exit end of a one-way street, and the sign B 1 '
      + 'closes a road to all vehicles in both directions. Check the signs at every junction '
      + 'before you turn and take only a street you are allowed to enter.',
    law: `§ 4 písm. c) ${ACT}; značky B 1, B 2 a IP 4b ${SIGN_DECREE}`,
    cz: 'Vjezd do zákazu vjezdu, jízda v protisměru jednosměrné ulice',
  },

  TURN_RESTRICTION: {
    severity: 'serious',
    title: 'Ignored a turn restriction',
    what: 'You turned or drove in a direction that the signs prohibit.',
    rule: 'The no-turn signs (B 24a, B 24b) apply at the nearest junction, the no U-turn sign '
      + '(B 25) until the next junction, and the blue mandatory-direction signs (C 2a to C 2f) '
      + 'allow only the directions shown. When an instruction conflicts with a sign, the sign '
      + 'wins: take the next legal route.',
    law: `§ 4 písm. c) ${ACT}; značky B 24a, B 24b, B 25 a C 2a až C 2f ${SIGN_DECREE}`,
    cz: 'Nerespektování zákazu odbočování nebo přikázaného směru jízdy',
  },

  ONCOMING_LANE: {
    severity: 'serious',
    title: 'Drove in the oncoming lane',
    what: 'You drove on the left side of the road or crossed a continuous centre line.',
    rule: 'Drive on the right. A continuous centre line stays on your left; you may cross it only '
      + 'when that is necessary to pass an obstacle, to overtake a cyclist, or to turn into or out '
      + 'of a place off the road.',
    law: `§ 11 odst. 1 ${ACT}; značka V 1a ${SIGN_DECREE}`,
    cz: 'Jízda v protisměru, přejetí podélné čáry souvislé',
  },

  OFF_ROAD: {
    severity: 'serious',
    title: 'Left the carriageway',
    what: 'You drove off the carriageway, onto the kerb, pavement or verge.',
    rule: 'Keep the whole car on the carriageway. The pavement belongs to pedestrians and vehicles '
      + 'must not use it. Slow down before tight turns so that no wheel touches the kerb.',
    law: `§ 53 odst. 2 a § 4 písm. a) ${ACT}`,
    cz: 'Vyjetí mimo vozovku, najetí na obrubník nebo chodník',
  },

  COLLISION_VEHICLE: {
    severity: 'serious',
    title: 'Collision with a vehicle',
    what: 'You hit another vehicle.',
    rule: 'Keep enough distance to stop if the vehicle ahead brakes suddenly, and drive only as '
      + 'fast as lets you stop within the distance you can see. Check the mirrors and the blind '
      + 'spot before you change position.',
    law: `§ 4 písm. a), § 18 odst. 1 a § 19 odst. 1 ${ACT}`,
    cz: 'Střet s jiným vozidlem',
  },

  COLLISION_PEDESTRIAN: {
    severity: 'serious',
    title: 'Hit a pedestrian',
    what: 'You hit a pedestrian.',
    rule: 'You must drive so that you endanger no one. Watch the pavements as well as the road, '
      + 'take extra care near children, and slow down wherever a person could step out.',
    law: `§ 4 písm. a) a § 5 odst. 1 písm. b) a d) ${ACT}`,
    cz: 'Střet s chodcem',
  },

  COLLISION_OBJECT: {
    severity: 'serious',
    title: 'Hit an obstacle',
    what: 'You hit an obstacle on or beside the road.',
    rule: 'Give your full attention to driving and keep a safe gap to the side. '
      + 'Slow down in narrow places and during manoeuvres; stop and correct your line instead of '
      + 'forcing it.',
    law: `§ 4 písm. a) a § 5 odst. 1 písm. b) ${ACT}`,
    cz: 'Náraz do překážky',
  },

  RAIL_CROSSING: {
    severity: 'serious',
    title: 'Unsafe at a level crossing',
    what: 'You drove onto a level crossing when you were not allowed to.',
    rule: 'Before a level crossing, make sure you can cross safely. Do not enter when the red '
      + 'lights flash, the bell sounds, the barriers move or are down, a train is in sight or '
      + 'earshot, or there is no room to clear the crossing. Within 50 m of it the limit is '
      + '30 km/h, or 50 km/h while the white light flashes.',
    law: `§ 28 odst. 1 a 3 a § 29 odst. 1 ${ACT}`,
    cz: 'Vjezd na železniční přejezd v době, kdy je to zakázáno',
  },

  // ------------------------------------------------------------------ minor

  SPEEDING_MINOR: {
    severity: 'minor',
    title: 'Over the speed limit',
    what: 'You drove slightly over the speed limit.',
    rule: 'The limit is a maximum with no allowance on top: 50 km/h in a built-up area unless a '
      + 'sign sets another one, 30 km/h in a zone 30, 20 km/h in a residential or pedestrian zone. '
      + 'In the real exam, candidates fail for being a few km/h over.',
    law: `§ 18 odst. 4 a § 39 odst. 5 ${ACT}; značky B 20a a IZ 8a ${SIGN_DECREE}`,
    cz: 'Překročení nejvyšší dovolené rychlosti',
  },

  TOO_SLOW: {
    severity: 'minor',
    title: 'Drove needlessly slowly',
    what: 'You drove well below the limit with nothing in your way.',
    rule: 'You must not hold up traffic by driving slowly without a reason. '
      + 'When the road is clear and conditions are good, drive close to the limit.',
    law: `§ 18 odst. 2 písm. b) ${ACT}`,
    cz: 'Bezdůvodně pomalá jízda',
  },

  HESITATION: {
    severity: 'minor',
    title: 'Hesitated without reason',
    what: 'You waited when the way was clear and it was your turn to go.',
    rule: 'The examiner assesses a decisive way of driving, and holding up traffic without a '
      + 'reason is not allowed. When you have priority or a safe gap, go.',
    law: `§ 18 odst. 2 písm. b) ${ACT}; § 19 odst. 4 písm. a) ${EXAM_DECREE}`,
    cz: 'Nerozhodná jízda, omezování plynulosti provozu',
  },

  NO_SIGNAL_TURN: {
    severity: 'minor',
    title: 'Turned without signalling',
    what: 'You turned without using the indicator.',
    rule: 'Signal every turn at a junction and every turn off the road. '
      + 'Signal also when you follow a main road that bends at a junction, because you change '
      + 'direction.',
    law: `§ 21 odst. 1 a § 30 odst. 1 ${ACT}`,
    cz: 'Nedání znamení o změně směru jízdy při odbočování',
  },

  LATE_SIGNAL: {
    severity: 'minor',
    title: 'Signalled too late',
    what: 'You switched the indicator on only as you started the manoeuvre.',
    rule: 'Give the signal in good time before you start, so that the drivers behind you can '
      + 'react. Signal first, then brake and steer.',
    law: `§ 30 odst. 2 ${ACT}`,
    cz: 'Pozdní znamení o změně směru jízdy',
  },

  SIGNAL_LEFT_ON: {
    severity: 'minor',
    title: 'Left the indicator on',
    what: 'You kept the indicator flashing after the manoeuvre was finished.',
    rule: 'Keep the indicator on only until the change of direction or lane is complete. '
      + 'A signal left on misleads other drivers, so check that it has cancelled.',
    law: `§ 30 odst. 4 ${ACT}`,
    cz: 'Ponechané znamení o změně směru jízdy po dokončení úkonu',
  },

  NO_SIGNAL_PULL_OUT: {
    severity: 'minor',
    title: 'Moved off without signalling',
    what: 'You pulled away from the kerb without signalling.',
    rule: 'Signal before you move off from the edge of the road, and make sure you endanger no '
      + 'one as you go.',
    law: `§ 25 odst. 6 ${ACT}`,
    cz: 'Vyjetí od okraje vozovky bez znamení o změně směru jízdy',
  },

  NO_SIGNAL_PULL_OVER: {
    severity: 'minor',
    title: 'Pulled over without signalling',
    what: 'You pulled in to the kerb to stop without signalling.',
    rule: 'Signal before you move to the edge of the road to stop or park.',
    law: `§ 25 odst. 5 ${ACT}`,
    cz: 'Zajetí k okraji vozovky bez znamení o změně směru jízdy',
  },

  NO_SIGNAL_ROUNDABOUT_EXIT: {
    severity: 'minor',
    title: 'Left roundabout without signalling',
    what: 'You left the roundabout without signalling right.',
    rule: 'Do not signal when you enter a roundabout or drive around it, unless you change lanes. '
      + 'Signal right when you leave it.',
    law: `§ 30 odst. 5 ${ACT}`,
    cz: 'Výjezd z kruhového objezdu bez znamení o změně směru jízdy',
  },

  NO_SIGNAL_LANE_CHANGE: {
    severity: 'minor',
    title: 'Changed lane without signalling',
    what: 'You moved into another lane or out around an obstacle without signalling.',
    rule: 'Signal before every lane change and before you move out to pass a parked car or '
      + 'another obstacle. Change lanes only when you will not endanger or hinder a driver in the '
      + 'lane you are moving into.',
    law: `§ 12 odst. 5 a § 16 ${ACT}`,
    cz: 'Přejetí do jiného jízdního pruhu bez znamení o změně směru jízdy',
  },

  NO_OBSERVATION: {
    severity: 'minor',
    title: 'Did not look before moving',
    what: 'You did not check the mirrors or look over your shoulder before the manoeuvre.',
    rule: 'Watch the traffic around you the whole time. Before you move off, change lanes or '
      + 'turn, check the mirror and turn your head to cover the blind spot. '
      + 'The examiner has to see you look.',
    law: `§ 5 odst. 1 písm. b) ${ACT}; § 19 odst. 4 písm. i) ${EXAM_DECREE}`,
    cz: 'Nedostatečné sledování provozu (zrcátka, pohled přes rameno)',
  },

  WRONG_LANE: {
    severity: 'minor',
    title: 'Wrong lane for the turn',
    what: 'You took the turn from a lane or position that does not serve that direction.',
    rule: 'Before turning right, move as far right as you can. Before turning left, move as far '
      + 'left as the part of the road for your direction allows; in a one-way street that is the '
      + 'left edge. Where arrows mark the lanes, use the lane for your direction.',
    law: `§ 21 odst. 3 ${ACT}; značka V 9a ${SIGN_DECREE}`,
    cz: 'Nesprávné zařazení před odbočováním',
  },

  LANE_POSITION: {
    severity: 'minor',
    title: 'Poor position on the road',
    what: 'You drifted out of your lane or drove too far from the right side of the road.',
    rule: 'Drive on the right, near the right edge of the carriageway unless something prevents '
      + 'it. In a marked lane, keep the car inside the lines.',
    law: `§ 11 odst. 1 ${ACT}`,
    cz: 'Nesprávná poloha vozidla ve vozovce nebo v jízdním pruhu',
  },

  STOP_LINE_OVERRUN: {
    severity: 'minor',
    title: 'Stopped past the stop line',
    what: 'You stopped with the car over the stop line.',
    rule: 'At a red or amber light, stop before the solid line across your lane, or before the '
      + 'signal where there is no line. At a STOP sign, the line with the word STOP marks the '
      + 'place where you must stop.',
    law: `§ 70 odst. 2 písm. a) ${ACT}; značky V 5 a V 6b ${SIGN_DECREE}`,
    cz: 'Zastavení až za příčnou čárou souvislou',
  },

  BLOCKED_CROSSING: {
    severity: 'minor',
    title: 'Blocked a crossing or junction',
    what: 'You stopped in a queue on a pedestrian crossing or inside a junction.',
    rule: 'Do not enter a junction unless you can drive through and clear it. '
      + 'Treat a pedestrian crossing the same way, because a car standing on it hinders '
      + 'pedestrians. Wait in front of it until there is room for your car on the far side.',
    law: `§ 22 odst. 3 a § 5 odst. 2 písm. f) ${ACT}`,
    cz: 'Zastavení vozidla na přechodu pro chodce nebo v křižovatce',
  },

  HARSH_BRAKING: {
    severity: 'minor',
    title: 'Braked sharply without need',
    what: 'You braked hard when the traffic did not require it.',
    rule: 'You must not slow down or stop suddenly unless safety requires it. '
      + 'Look far ahead, lift off the accelerator early and brake smoothly.',
    law: `§ 18 odst. 2 písm. a) ${ACT}`,
    cz: 'Náhlé snížení rychlosti jízdy bez důvodu',
  },

  NO_BELT: {
    severity: 'minor',
    title: 'Seat belt not fastened',
    what: 'You drove with your seat belt unfastened.',
    rule: 'The driver must wear the seat belt whenever the car is being driven. '
      + 'Fasten it before you start the engine.',
    law: `§ 6 odst. 1 písm. a) ${ACT}`,
    cz: 'Jízda bez připoutání bezpečnostním pásem',
  },

  NO_LIGHTS: {
    severity: 'minor',
    title: 'Lights off',
    what: 'You drove without lights.',
    rule: 'A motor vehicle must have its dipped beam or daytime running lights on whenever it is '
      + 'driven, day and night, all year round. Switch the lights on before you move off.',
    law: `§ 32 odst. 1 ${ACT}`,
    cz: 'Jízda bez rozsvícených světel',
  },

  HANDBRAKE_ON: {
    severity: 'minor',
    title: 'Drove with the handbrake on',
    what: 'You moved off or drove with the handbrake applied.',
    rule: 'Release the handbrake fully as you move off. Correct use of the controls, the parking '
      + 'brake included, is part of what the examiner assesses.',
    law: `§ 19 odst. 4 písm. e) ${EXAM_DECREE}`,
    cz: 'Jízda se zataženou parkovací brzdou',
  },

  IGNORED_INSTRUCTION: {
    severity: 'minor',
    title: 'Did not follow the instruction',
    what: 'You did not go the way the examiner asked.',
    rule: 'Follow the examiner\'s directions whenever they are legal and safe. '
      + 'A wrong turn made safely breaks no traffic rule, but it shows you lost track of the '
      + 'drive. If you miss a turn, carry on safely and wait for the next instruction.',
    law: `Bez porušení ${ACT}; hodnotí se podle § 19 odst. 4 písm. a) ${EXAM_DECREE}`,
    cz: 'Nedodržení pokynu zkušebního komisaře',
  },

  PARKING: {
    severity: 'minor',
    title: 'Faulty stopping or parking',
    what: 'You stopped or parked the car incorrectly.',
    rule: 'Stop on the right, parallel to the edge of the road and as close to it as you can; in '
      + 'a one-way street you may use either side. Do not stop on a pedestrian crossing or within '
      + '5 m before it, in a junction or within 5 m of its boundary, at a public transport stop, '
      + 'or where signs or markings prohibit it.',
    law: `§ 25 odst. 1 a § 27 odst. 1 ${ACT}`,
    cz: 'Nesprávné zastavení nebo stání',
  },
};

// Examiner lines. Czech in the formal "vy" form and worded so that it fits a candidate of any
// gender; the grades "prospěl" and "neprospěl" are quoted as the legal names of the two results.
export const PHRASES = {
  intro: {
    cz: 'Dobrý den. Připravte si vozidlo k jízdě, a až budete mít všechno připraveno, '
      + 'můžete vyjet.',
    en: 'Hello. Get the car ready, and when everything is set, you can drive off.',
  },
  turnLeft: {
    cz: 'Na příští křižovatce odbočte vlevo.',
    en: 'At the next junction, turn left.',
  },
  turnRight: {
    cz: 'Na příští křižovatce odbočte vpravo.',
    en: 'At the next junction, turn right.',
  },
  straight: {
    cz: 'Na příští křižovatce pokračujte rovně.',
    en: 'At the next junction, go straight on.',
  },
  turnLeftAtLights: {
    cz: 'Na světelné křižovatce odbočte vlevo.',
    en: 'At the traffic lights, turn left.',
  },
  turnRightAtLights: {
    cz: 'Na světelné křižovatce odbočte vpravo.',
    en: 'At the traffic lights, turn right.',
  },
  secondLeft: {
    cz: 'Odbočte do druhé ulice vlevo.',
    en: 'Take the second street on the left.',
  },
  secondRight: {
    cz: 'Odbočte do druhé ulice vpravo.',
    en: 'Take the second street on the right.',
  },
  roundaboutExit1: {
    cz: 'Na kruhovém objezdu vyjeďte prvním výjezdem.',
    en: 'At the roundabout, take the first exit.',
  },
  roundaboutExit2: {
    cz: 'Na kruhovém objezdu vyjeďte druhým výjezdem.',
    en: 'At the roundabout, take the second exit.',
  },
  roundaboutExit3: {
    cz: 'Na kruhovém objezdu vyjeďte třetím výjezdem.',
    en: 'At the roundabout, take the third exit.',
  },
  roundaboutExit4: {
    cz: 'Na kruhovém objezdu vyjeďte čtvrtým výjezdem.',
    en: 'At the roundabout, take the fourth exit.',
  },
  followRoad: {
    cz: 'Pokračujte dál po této ulici, dokud neřeknu jinak.',
    en: 'Carry on along this street until I say otherwise.',
  },
  uturn: {
    cz: 'Až to bude bezpečné a dovolené, otočte vozidlo do protisměru.',
    en: 'When it is safe and allowed, turn the car around.',
  },
  pullOver: {
    cz: 'Kde to bude bezpečné a dovolené, zastavte u pravého okraje vozovky.',
    en: 'Where it is safe and allowed, stop at the right-hand kerb.',
  },
  park: {
    cz: 'Najděte si vhodné volné místo a zaparkujte.',
    en: 'Find a suitable free space and park the car.',
  },
  continue: {
    cz: 'Můžeme pokračovat. Až to bude bezpečné, vyjeďte.',
    en: 'We can carry on. Drive off when it is safe.',
  },
  finish: {
    cz: 'Tady vpravo zastavte a zajistěte vozidlo. Jízda je u konce.',
    en: 'Stop here on the right and secure the car. The drive is over.',
  },
  passed: {
    cz: 'Gratuluji. Zkoušku z praktické jízdy hodnotím stupněm „prospěl“.',
    en: 'Congratulations. You have passed the practical driving test.',
  },
  failed: {
    cz: 'Je mi líto. Zkoušku z praktické jízdy hodnotím stupněm „neprospěl“.',
    en: 'I am sorry. You have not passed the practical driving test.',
  },
  intervention: {
    cz: 'Učitel musel zasáhnout do řízení. Zkoušku tím končím, hodnocení je „neprospěl“.',
    en: 'The instructor had to step in. That ends the test, and the result is a fail.',
  },
  slowDown: {
    cz: 'Zpomalte, prosím. Jedete příliš rychle.',
    en: 'Slow down, please. You are driving too fast.',
  },
  checkBelt: {
    cz: 'Připoutejte se, prosím. Nemáte zapnutý bezpečnostní pás.',
    en: 'Fasten your seat belt, please. It is not done up.',
  },
  checkLights: {
    cz: 'Rozsviťte si, prosím, světla. Svítit se musí i ve dne.',
    en: 'Switch your lights on, please. They must be on in daytime too.',
  },
};

// Pre-drive items in the order a candidate works through them. The real exam starts with a wider
// check of the car itself (tyres, lights, fluids, dashboard: § 19 odst. 1 písm. a) vyhlášky
// č. 167/2002 Sb.); this list is the part done from the driver's seat.
export const CHECKLIST = [
  {
    id: 'seat',
    cz: 'Nastavit sedadlo a opěrku hlavy',
    en: 'Adjust the seat and head restraint',
    why: 'You need full reach of the pedals and the wheel before the car moves.',
  },
  {
    id: 'mirrors',
    cz: 'Nastavit zpětná zrcátka',
    en: 'Adjust the mirrors',
    why: 'Mirrors set for someone else leave you blind to the traffic behind.',
  },
  {
    id: 'belt',
    cz: 'Zapnout bezpečnostní pás',
    en: 'Fasten the seat belt',
    why: 'The driver must be belted whenever the car is driven.',
  },
  {
    id: 'engine',
    cz: 'Nastartovat motor',
    en: 'Start the engine',
    why: 'Start with your foot on the brake so the car cannot move.',
  },
  {
    id: 'lights',
    cz: 'Rozsvítit světla',
    en: 'Switch on the lights',
    why: 'Dipped beam or daytime running lights are mandatory at all times in Czechia.',
  },
  {
    id: 'gear',
    cz: 'Zařadit polohu D',
    en: 'Select D',
    why: 'Select the gear with the brake pedal pressed so the car stays still.',
  },
  {
    id: 'handbrake',
    cz: 'Odbrzdit parkovací brzdu',
    en: 'Release the handbrake',
    why: 'Driving against the handbrake wears the brakes and counts as poor control.',
  },
  {
    id: 'signal',
    cz: 'Dát znamení o změně směru jízdy vlevo',
    en: 'Signal left',
    why: 'You must signal before you pull away from the edge of the road.',
  },
  {
    id: 'observe',
    cz: 'Zrcátka a pohled přes levé rameno',
    en: 'Check the mirrors and look over your left shoulder',
    why: 'You must not endanger anyone when you pull out, and the mirror hides the blind spot.',
  },
];

// Official names from vyhláška č. 294/2015 Sb. (přílohy č. 1 to 5). The keys follow the map data
// and drop the space of the official numbering ("B 20a" becomes B20a).
// Two keys to watch, see rules-notes.md:
//   - A7a is "Nerovnost vozovky"; a speed hump warning is A 7b "Zpomalovací práh".
//   - IJ4b is the stop marker and IJ4c the bus stop; the tram stop is IJ 4d, added here as well.
export const SIGN_NAMES = {
  // Priority signs (příloha č. 2)
  P1: { cz: 'Křižovatka s vedlejší pozemní komunikací', en: 'Junction with a minor road' },
  P2: { cz: 'Hlavní pozemní komunikace', en: 'Main road' },
  P3: { cz: 'Konec hlavní pozemní komunikace', en: 'End of main road' },
  P4: { cz: 'Dej přednost v jízdě!', en: 'Give way' },
  P6: { cz: 'Stůj, dej přednost v jízdě!', en: 'Stop and give way' },
  P7: { cz: 'Přednost protijedoucích vozidel', en: 'Priority for oncoming vehicles' },
  P8: { cz: 'Přednost před protijedoucími vozidly', en: 'Priority over oncoming vehicles' },

  // Prohibitory signs (příloha č. 3)
  B1: { cz: 'Zákaz vjezdu všech vozidel v obou směrech', en: 'No vehicles in either direction' },
  B2: { cz: 'Zákaz vjezdu všech vozidel', en: 'No entry' },
  B20a: { cz: 'Nejvyšší dovolená rychlost', en: 'Speed limit' },
  B24a: { cz: 'Zákaz odbočování vpravo', en: 'No right turn' },
  B24b: { cz: 'Zákaz odbočování vlevo', en: 'No left turn' },
  B25: { cz: 'Zákaz otáčení', en: 'No U-turn' },
  B28: { cz: 'Zákaz zastavení', en: 'No stopping' },
  B29: { cz: 'Zákaz stání', en: 'No parking' },

  // Mandatory signs (příloha č. 4)
  C1: { cz: 'Kruhový objezd', en: 'Roundabout' },
  C2a: { cz: 'Přikázaný směr jízdy přímo', en: 'Straight ahead only' },
  C2b: { cz: 'Přikázaný směr jízdy vpravo', en: 'Turn right only' },
  C2c: { cz: 'Přikázaný směr jízdy vlevo', en: 'Turn left only' },
  C2d: { cz: 'Přikázaný směr jízdy přímo a vpravo', en: 'Straight ahead or right only' },
  C2e: { cz: 'Přikázaný směr jízdy přímo a vlevo', en: 'Straight ahead or left only' },
  C2f: { cz: 'Přikázaný směr jízdy vpravo a vlevo', en: 'Right or left only' },
  C4a: { cz: 'Přikázaný směr objíždění vpravo', en: 'Keep right' },
  C4b: { cz: 'Přikázaný směr objíždění vlevo', en: 'Keep left' },

  // Informative signs (příloha č. 5)
  IP4b: { cz: 'Jednosměrný provoz', en: 'One-way street' },
  IP6: { cz: 'Přechod pro chodce', en: 'Pedestrian crossing' },
  IP10a: { cz: 'Slepá pozemní komunikace', en: 'No through road' },
  IP11a: { cz: 'Parkoviště', en: 'Parking' },
  IZ5a: { cz: 'Obytná zóna', en: 'Residential zone' },
  IZ5b: { cz: 'Konec obytné zóny', en: 'End of residential zone' },
  IZ8a: { cz: 'Zóna s dopravním omezením', en: 'Restricted zone' },
  IZ8b: { cz: 'Konec zóny s dopravním omezením', en: 'End of restricted zone' },
  IJ4b: { cz: 'Označník zastávky', en: 'Stop marker' },
  IJ4c: { cz: 'Zastávka autobusu', en: 'Bus stop' },
  IJ4d: { cz: 'Zastávka tramvaje', en: 'Tram stop' },

  // Warning signs (příloha č. 1)
  A7a: { cz: 'Nerovnost vozovky', en: 'Uneven road' },
  A11: { cz: 'Přechod pro chodce', en: 'Pedestrian crossing ahead' },
  A12b: { cz: 'Děti', en: 'Children' },
  A25: { cz: 'Tramvaj', en: 'Tram' },
  A29: { cz: 'Železniční přejezd se závorami', en: 'Level crossing with barriers' },
  A30: { cz: 'Železniční přejezd bez závor', en: 'Level crossing without barriers' },
  A32a: {
    cz: 'Výstražný kříž pro železniční přejezd jednokolejný',
    en: 'Warning cross, single-track level crossing',
  },
};
