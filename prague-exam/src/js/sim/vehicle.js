// The player's car: a kinematic bicycle model that is easy to control on a touch screen.
// The clutch is not simulated; the gearbox is a simple P-R-N-D selector.

const MAX_STEER = 0.6;           // rad at the front wheels
const LAT_ACC = 5.2;             // m/s^2 the steering may ask for at speed
const BRAKE = 8.5;               // m/s^2 at full pedal
const SHIFT = [0, 4.5, 9.5, 15.5, 22, 30];   // m/s at which the simulated gear changes (for sound and rpm)

export function createVehicle({ x = 0, z = 0, heading = 0 } = {}) {
  return {
    x, y: 0, z, heading, pitch: 0, roll: 0,
    speed: 0, accel: 0, steer: 0, throttle: 0, brake: 0,
    gear: 'P', engineOn: false, handbrake: true, belt: false,
    indicator: 'off', lights: 'off', horn: false,
    rpm: 0, simGear: 1,
    length: 4.4, width: 1.8, wheelbase: 2.6,
    odometer: 0,
    _turned: 0,                  // how far the wheel has been turned since the indicator went on
  };
}

// One-shot controls from the input module. Returns false when the action was refused.
export function applyAction(car, action) {
  const still = Math.abs(car.speed) < 0.4;
  switch (action) {
    case 'indicatorLeft': car.indicator = car.indicator === 'left' ? 'off' : 'left'; car._turned = 0; return true;
    case 'indicatorRight': car.indicator = car.indicator === 'right' ? 'off' : 'right'; car._turned = 0; return true;
    case 'hazard': car.indicator = car.indicator === 'hazard' ? 'off' : 'hazard'; return true;
    case 'lights': car.lights = car.lights === 'off' ? 'dipped' : 'off'; return true;
    case 'belt': car.belt = !car.belt; return true;
    case 'handbrake': car.handbrake = !car.handbrake; return true;
    case 'engine': if (!still) return false; car.engineOn = !car.engineOn; return true;
    case 'gearP': if (!still) return false; car.gear = 'P'; return true;
    case 'gearN': car.gear = 'N'; return true;
    case 'gearR': if (car.speed > 0.6) return false; car.gear = 'R'; return true;
    case 'gearD': if (car.speed < -0.6) return false; car.gear = 'D'; return true;
    default: return false;
  }
}

export function stepVehicle(car, input, dt) {
  const v = car.speed, av = Math.abs(v);
  car.throttle = input.throttle; car.brake = input.brake;

  // Steering: full deflection always means "as tight as is safe at this speed".
  const limit = Math.min(MAX_STEER, Math.atan((LAT_ACC * car.wheelbase) / Math.max(1, v * v)));
  const target = Math.max(-1, Math.min(1, input.steer)) * limit;
  const rate = 1.9 * dt;
  car.steer += Math.max(-rate, Math.min(rate, target - car.steer));

  // Drive force.
  let a = 0;
  const driving = car.engineOn && (car.gear === 'D' || car.gear === 'R');
  if (driving) {
    const sign = car.gear === 'D' ? 1 : -1;
    const pull = car.gear === 'D' ? 3.1 / (1 + Math.pow(av / 17, 2)) : 2.0 * (av < 5 ? 1 : 0);
    a += sign * input.throttle * pull;
    // Idle creep, as an automatic does, so tight manoeuvres need only the brake.
    if (input.throttle < 0.05 && sign * v < 1.2 && !car.handbrake) a += sign * 0.9;
    if (input.throttle < 0.05 && sign * v > 1.4) a -= sign * 0.45;                    // engine braking
  }
  // Resistance and brakes always act against the motion.
  const resist = 0.12 + 0.0007 * v * v + input.brake * BRAKE + (car.handbrake ? 3.5 : 0);
  if (av > 0.01) {
    const dv = a * dt - Math.sign(v) * resist * dt;
    const nv = v + dv;
    // Brakes may stop the car but never reverse it.
    car.speed = Math.sign(v) !== Math.sign(nv) && Math.abs(a) < resist ? 0 : nv;
  } else {
    const hold = input.brake * BRAKE + (car.handbrake ? 3.5 : 0) + (car.gear === 'P' ? 10 : 0);
    car.speed = Math.abs(a) > hold + 0.12 ? (a - Math.sign(a) * (hold + 0.12)) * dt : 0;
  }
  if (car.gear === 'P') car.speed = 0;
  car.accel = (car.speed - v) / dt;

  // Motion.
  const d = car.speed * dt;
  car.heading += (car.speed * Math.tan(car.steer) / car.wheelbase) * dt;
  if (car.heading > Math.PI) car.heading -= 2 * Math.PI; else if (car.heading < -Math.PI) car.heading += 2 * Math.PI;
  car.x += Math.sin(car.heading) * d;
  car.z -= Math.cos(car.heading) * d;
  car.odometer += Math.abs(d);
  // Body motion for the camera: a little dive under braking and lean in bends.
  const lat = car.speed * car.speed * Math.tan(car.steer) / car.wheelbase;
  car.pitch += ((car.accel * 0.0045) - car.pitch) * Math.min(1, dt * 6);   // + = nose up
  car.roll += ((lat * 0.006) - car.roll) * Math.min(1, dt * 6);

  // Indicator self-cancels after the wheel has been turned and straightened again.
  if (car.indicator === 'left' || car.indicator === 'right') {
    const side = car.indicator === 'left' ? -1 : 1;
    if (car.steer * side > 0.1 && av > 1) car._turned = Math.max(car._turned, car.steer * side);
    if (car._turned > 0.1 && Math.abs(car.steer) < 0.025) { car.indicator = 'off'; car._turned = 0; }
  }

  // Simulated gear and revs (sound and the rev counter only).
  if (!car.engineOn) car.rpm += (0 - car.rpm) * Math.min(1, dt * 5);
  else {
    let g = car.simGear;
    if (g < 5 && av > SHIFT[g] + 0.8) g++;
    else if (g > 1 && av < SHIFT[g - 1] - 0.8) g--;
    car.simGear = g;
    const lo = SHIFT[g - 1], hi = SHIFT[g];
    const want = 850 + Math.max(0, Math.min(1.15, (av - lo) / (hi - lo))) * 2100 + input.throttle * 450;
    car.rpm += (want - car.rpm) * Math.min(1, dt * 7);
  }
  return car;
}

// Corners of the car's footprint, for collision tests. Returns [x0, z0, x1, z1, x2, z2, x3, z3]
// in the order front-left, front-right, rear-right, rear-left.
export function footprint(car, out = new Float32Array(8), grow = 0) {
  const fx = Math.sin(car.heading), fz = -Math.cos(car.heading), rx = -fz, rz = fx;
  const hl = car.length / 2 + grow, hw = car.width / 2 + grow;
  out[0] = car.x + fx * hl - rx * hw; out[1] = car.z + fz * hl - rz * hw;
  out[2] = car.x + fx * hl + rx * hw; out[3] = car.z + fz * hl + rz * hw;
  out[4] = car.x - fx * hl + rx * hw; out[5] = car.z - fz * hl + rz * hw;
  out[6] = car.x - fx * hl - rx * hw; out[7] = car.z - fz * hl - rz * hw;
  return out;
}
