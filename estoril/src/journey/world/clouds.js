// Cloud sprites in a ring around the circuit, drifting slowly towards +X.
import { Group, Sprite, SpriteMaterial } from 'three';
import { puffTexture } from '../textures.js';

/**
 * Group 'clouds': 22 sprites at density ≥ 0.5 (11 below), each with its own puff texture, placed
 * 900–2200 m from the origin at 220–480 m altitude, 380–800 m wide (0.42 aspect). Not fogged.
 * Uses ctx.rng after the vegetation (see vegetation.js). The updater moves each cloud
 * 2.2·v m/s along +X (v = 0.6–1.8) and wraps it from x 2400 back to -2400.
 */
function buildClouds(ctx) {
  const { rng, root, updaters, density } = ctx;
  const clouds = new Group();
  clouds.name = 'clouds';
  root.add(clouds);
  const count = Math.round(22 * Math.max(0.5, density));
  for (let i = 0; i < count; i++) {
    const material = new SpriteMaterial({
      map: puffTexture(i + 3),
      transparent: true,
      depthWrite: false,
      fog: false,
      opacity: 0.85,
    });
    const cloud = new Sprite(material);
    const angle = rng() * Math.PI * 2;
    const distance = 900 + rng() * 1300;
    cloud.position.set(Math.cos(angle) * distance, 220 + rng() * 260, Math.sin(angle) * distance);
    const width = 380 + rng() * 420;
    cloud.scale.set(width, width * 0.42, 1);
    cloud.userData.v = 0.6 + rng() * 1.2; // drift speed factor
    clouds.add(cloud);
  }
  updaters.push((time, dt) => {
    for (const cloud of clouds.children) {
      cloud.position.x += cloud.userData.v * dt * 2.2;
      if (cloud.position.x > 2400) cloud.position.x = -2400;
    }
  });
}

export { buildClouds };
