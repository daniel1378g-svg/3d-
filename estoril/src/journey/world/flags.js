// Waving flag on a pole: the cloth is a subdivided plane bent by a vertex-shader wave.
import { CylinderGeometry, DoubleSide, Mesh, MeshStandardMaterial, PlaneGeometry } from 'three';

const POLE_HEIGHT = 6; // metres
const CLOTH_WIDTH = 2.4; // metres, hinged at the pole and flying towards +X
const CLOTH_HEIGHT = 1.5;

/**
 * Adds a 6 m pole standing on (x, baseY, z) with a flag near its top to `parent`, and registers
 * an updater that drives the wave (uniform uTime = world time in seconds). Each flag gets its own
 * material so its wave phase can depend on x.
 */
function buildFlag(ctx, x, baseY, z, color, parent) {
  const { materials, updaters } = ctx;
  const pole = new Mesh(new CylinderGeometry(0.05, 0.06, POLE_HEIGHT, 6), materials.steel);
  pole.position.set(x, baseY + 3, z);
  parent.add(pole);

  const clothGeometry = new PlaneGeometry(CLOTH_WIDTH, CLOTH_HEIGHT, 16, 6);
  clothGeometry.translate(1.2, 0, 0); // left edge on the pole
  const material = new MeshStandardMaterial({ color, side: DoubleSide, roughness: 0.8 });
  // Wave amplitude grows from 0 at the pole (k = 0) to the free edge (k = 1).
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = { value: 0 };
    material.userData.sh = shader;
    shader.vertexShader =
      `uniform float uTime;
` +
      shader.vertexShader.replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        float k = position.x / 2.4;
        transformed.z += sin(position.x * 2.1 - uTime * 4.2 + ${(x * 0.1).toFixed(2)}) * .22 * k;
        transformed.y += sin(position.x * 1.3 - uTime * 3.1) * .06 * k;`,
      );
  };
  const cloth = new Mesh(clothGeometry, material);
  cloth.position.set(x, baseY + 5.1, z);
  cloth.castShadow = true;
  parent.add(cloth);
  updaters.push((time) => {
    if (material.userData.sh) material.userData.sh.uniforms.uTime.value = time;
  });
}

export { buildFlag };
