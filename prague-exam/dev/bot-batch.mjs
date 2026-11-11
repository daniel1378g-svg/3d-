// Runs the test driver over several places and seeds and tallies the outcome.
import { runExam, world } from './bot.mjs';
const { net } = world();
const minutes = Number(process.argv[2]) || 8, seeds = (process.argv[3] || '1,2').split(',').map(Number), density = process.argv[4] || 'normal';
const tally = {}; let pass = 0, runs = 0;
for (const place of net.places) for (const seed of seeds) {
  const { result } = runExam({ placeId: place.id, seed, minutes, density });
  runs++;
  if (!result) { console.log(place.id.padEnd(16), seed, 'NO RESULT'); continue; }
  if (result.passed) pass++;
  for (const f of result.faults) tally[f.code] = (tally[f.code] || 0) + 1;
  console.log(place.id.padEnd(16), seed, result.passed ? 'pass' : `FAIL ${result.reason.code}`.padEnd(28), `${result.stats.distance} m ${result.stats.duration} s`, result.faults.map((f) => `${f.code}@${f.t}s(${f.x.toFixed(0)},${f.z.toFixed(0)})${f.note ? ' ' + f.note : ''}`).join('; '));
}
console.log(`\n${pass}/${runs} passed`, tally);
