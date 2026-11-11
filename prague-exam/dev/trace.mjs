import { runExam, world } from './bot.mjs';
const [place, seed, from, to] = process.argv.slice(2);
const { net } = world();
runExam({ placeId: place, seed: Number(seed), minutes: 8, trace: ({ t, car, loc, exam, input, i }) => {
  if (t < Number(from) || t > Number(to) || i % 15) return;
  console.log(t.toFixed(2), `e${loc.e} d${loc.dir} s${loc.s.toFixed(1)}/${net.len[loc.e].toFixed(0)} off${loc.d.toFixed(2)} lane${loc.lane}/${loc.lanes} J${loc.junction} rem${loc.rem.toFixed(1)}`, `v${car.speed.toFixed(1)} h${car.heading.toFixed(2)} st${input.steer.toFixed(2)} thr${input.throttle.toFixed(1)} br${input.brake.toFixed(1)} ind:${car.indicator}`, 'plan', exam.plan.slice(0, 3).map((p) => `${p.e}:${p.turn}`).join(' '), exam.instruction ? exam.instruction.key : '');
} });
