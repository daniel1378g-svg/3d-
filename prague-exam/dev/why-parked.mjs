import { runExam, world } from './bot.mjs';
const [place, seed] = process.argv.slice(2);
const hist = [];
const { result, car, exam } = runExam({ placeId: place, seed: Number(seed), minutes: 8, trace: ({ t, car, loc, exam, input, i }) => { if (i % 12 === 0) { hist.push(`${t.toFixed(1)} e${loc.e} d${loc.dir} s${loc.s.toFixed(0)}/${world().net.len[loc.e].toFixed(0)} off${loc.d.toFixed(2)} W${world().net.width[loc.e].toFixed(1)} J${loc.junction} v${car.speed.toFixed(1)} h${car.heading.toFixed(2)} st${input.steer.toFixed(2)} ${exam.instruction ? exam.instruction.key : ''} plan ${exam.plan.slice(0, 3).map((p) => p.e + ':' + p.turn).join(' ')}`); if (hist.length > 9) hist.shift(); } } });
const { net, statics } = world();
console.log(result.reason.code, result.reason.note, result.reason.street);
console.log(hist.join('\n'));
const fx = Math.sin(car.heading), fz = -Math.cos(car.heading);
statics.parkedNear(car.x, car.z, 8, (px, pz, h) => { const rx = px - car.x, rz = pz - car.z; const n = net.nearest(px, pz, 12); console.log(`parked fwd ${(rx * fx + rz * fz).toFixed(1)} right ${(rx * -fz + rz * fx).toFixed(1)} h ${h.toFixed(2)} | nearest edge e${n.e} s${n.s.toFixed(0)}/${net.len[n.e].toFixed(0)} lateral ${n.d.toFixed(2)} width ${net.width[n.e].toFixed(1)} rank ${net.rank[n.e]}`); });
