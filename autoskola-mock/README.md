# Jízda Nanečisto · mock Czech driving exam

A browser game that plays like the practical exam for category B in a manual car. One file, no build:
open `index.html`, or publish it as it is.

The examiner gives directions in Czech with an English translation. The route takes about three minutes and
covers the situations that fail candidates most often:

| Where | What is tested |
| --- | --- |
| Start | seat belt, mirrors, lights; mirror check and left signal before moving off |
| Unmarked junction | priority from the right (a car comes from the right) |
| Pedestrian crossings | giving way to a pedestrian who is crossing |
| Give-way sign, turning right | joining the main road without cutting a car off |
| 30 zone and traffic lights | speed limit; stopping on red |
| Main road, turning left | giving way to an oncoming car |
| STOP sign, turning left | a full stop, then a gap in both directions |
| Unmarked junction | going when you have priority (a car from the left waits for you) |
| Unmarked junction, turning left | priority from the right again |
| End | mirrors, right signal, stopping close to the kerb |

A serious mistake ends the exam, as an instructor's intervention would; the player can then practise that
part again. Minor faults (late signal, no mirror check, stalling, slightly over the limit) are counted, and
five or more also fail. Every fault comes with a short explanation of the rule.

The car has a clutch, five gears and an engine that stalls: letting the clutch up in a high gear without
gas, or braking to a stop in gear, kills it. "Watch a model drive" shows a clean run with the pedals, gear
and signals visible.

It trains rules, the order of actions and decisions. It cannot teach the feel of a real clutch, and the rule
summaries are a study aid, not a substitute for the official Czech rules and the autoškola's teaching.

## Controls

Keyboard: arrows (gas, brake, steer), Space = clutch (hold), E / Q or 1–5 and 0 = gears, Z / C = indicators,
M = mirrors, Enter = start the engine. Touch: on-screen pedals, steering pad and buttons; the clutch is a
toggle so one thumb is free to steer.

## Tests

`node test.cjs` (needs Playwright) runs the model drive and then breaks each rule on purpose, checking that
every mistake is caught: 17 checks.
