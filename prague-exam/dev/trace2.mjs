import { runExam, world } from './bot.mjs';
const { net } = world();
const names = ['RED', 'RED_AMBER', 'GREEN', 'AMBER'];
runExam({ placeId: 'vozovna-z-iz-kov', seed: 1, minutes: 8, trace: ({ t, car, loc, exam, input, i }) => {
  if (t < 11 || t > 16.6 || i % 12) return;
  console.log(t.toFixed(1), `e${loc.e} d${loc.dir} s${loc.s.toFixed(0)} rem${loc.rem.toFixed(0)} J${loc.junction} v${car.speed.toFixed(1)} thr${input.throttle.toFixed(1)} br${input.brake.toFixed(1)}`, 'sig69/1', names[net.signalState(69, 1, t)], 'sig69/0', names[net.signalState(69, 0, t)], 'plan', exam.plan.slice(0, 3).map((p) => `${p.e}:${p.dir}`).join(' '), 'lines here', net.linesOn(loc.e, loc.dir).map((l) => `${l.kind}@${l.s.toFixed(0)}`).join(','));
} });
console.log('e3463 len', net.len[3463], 'e11616 len', net.len[11616], 'lines 11616 -1', JSON.stringify(net.linesOn(11616, -1)), 'ctrl', JSON.stringify(net.controllers[69]));
