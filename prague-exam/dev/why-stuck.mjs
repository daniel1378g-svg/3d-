import { runExam, world } from './bot.mjs';
const { net } = world();
let done = false;
runExam({ placeId: process.argv[2], seed: Number(process.argv[3]), minutes: 8, trace: ({ t, car, loc, exam, input, i }) => {
  if (done || t < Number(process.argv[4])) return; done = true;
  const tr = exam.__traffic, fx = Math.sin(car.heading), fz = -Math.cos(car.heading);
  console.log('bot', `e${loc.e} d${loc.dir} s${loc.s.toFixed(0)} rem${loc.rem.toFixed(1)} J${loc.junction} node${loc.node} arms${net.arms[loc.node].length} ctrl${net.ctrl[loc.e * 2 + loc.end]} v${car.speed.toFixed(1)} plan ${exam.plan.slice(0, 3).map((p) => p.e + ':' + p.turn).join(' ')} instr ${exam.instruction && exam.instruction.key}`);
  const rel = (m) => { const rx = m.x - car.x, rz = m.z - car.z; return `fwd ${(rx * fx + rz * fz).toFixed(1)} right ${(rx * -fz + rz * fx).toFixed(1)}`; };
  for (const c of tr.cars) if (Math.hypot(c.x - car.x, c.z - car.z) < 60) console.log('car', c.id, rel(c), `v${c.v.toFixed(1)} e${c.e} d${c.dir} rem${(c.dir > 0 ? net.len[c.e] - c.s : c.s).toFixed(0)} ${c.junc ? 'J' : ''} why:${c.why} wait:${c.waitT.toFixed(0)} next:${c.next ? c.next.e + ':' + c.next.turn : '-'} waitingFor:${c.waitingFor ? (c.waitingFor.isPlayer ? 'PLAYER' : c.waitingFor.id) : '-'}`);
  for (const p of tr.peds) if (Math.hypot(p.x - car.x, p.z - car.z) < 40) console.log('ped', rel(p), p.state, 'waited', p.waited.toFixed(0), 'edge', p.cross.e, p.cross.signal ? 'signal' : 'zebra');
  for (const l of net.linesOn(loc.e, loc.dir)) console.log('line kind', l.kind, 's', l.s.toFixed(0), l.ctrlId >= 0 ? ['RED', 'RA', 'GREEN', 'AMBER'][net.signalState(l.ctrlId, l.phase, t)] : '');
} });
