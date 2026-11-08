// World-space surface shading for the ground, track and props: small onBeforeCompile patches of the
// built-in materials (lighting, shadows, fog and tone mapping stay three.js's own).
//
// Every patch reads the shared noise image (env/noise.js) and the surface detail image
// (textures.js surfaceDetailTexture) at WORLD positions, at several unrelated scales, so nothing
// repeats on a visible grid from the ground or from the aerial shots:
//   - macro variation: noise at 60–1700 m scales (tone, dry/green patches, wear, clumps);
//   - detail: a 512 px tile (aggregate, grass, pebbles) sampled twice per scale with offsets chosen
//     by a slow noise and blended (Quilez's "texture repetition" technique 3), at two scales;
//   - a little bump from the detail height (derivative bump mapping), faded out with distance.
// Strips that follow the track keep their UVs for what belongs to the track frame (across / along:
// kerb blocks, worn edges, repairs, tyre marks); the asphalt detail itself is world-projected, so
// the old v-coordinate seam at the closing sample (T1 entry) has no texture to show.
//
// Each patched material gets a fixed customProgramCacheKey, so programs are shared and stable. The
// uniforms are kept in material.userData.uniforms (tools/env/probe.mjs counts their textures).
// Colours below are linear-RGB albedos converted from the sRGB values in docs/references.md §4.3–4.4.
import { Color, DataTexture, LinearFilter, RepeatWrapping, RGBAFormat, Vector4 } from 'three';
import { noiseTexture } from './noise.js';

/** The grass shader's dry/green threshold on its noise sum (vegetation.js reads the same). */
const DRY_EDGES = [0.42, 0.7];
/**
 * The reference grass bases (#5F7134 / #9C8B5E, luminance ≈ 0.14) are photo colours; real grass
 * albedo is nearer 0.25, which is also what the previous ground displayed under the same lights
 * (measured: a plain #5F7134 ground shows as rgb 48/54/42, the previous grass as 81/89/71).
 */
const GRASS_GAIN = 1.9;

/** GLSL vec3 of an sRGB hex colour converted to linear RGB, scaled by `k`. */
function linear(hex, k = 1) {
  const c = new Color(hex); // three converts sRGB hex to linear working space
  return `vec3(${(c.r * k).toFixed(4)}, ${(c.g * k).toFixed(4)}, ${(c.b * k).toFixed(4)})`;
}

const VERTEX_HEAD = /* glsl */ `
varying vec3 vEnvPos;
varying vec2 vEnvUv;
`;

/** World position (instancing included) and the raw uv, after project_vertex. */
const VERTEX_BODY = /* glsl */ `
{
  vec4 envWorld = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
    envWorld = instanceMatrix * envWorld;
  #endif
  vEnvPos = (modelMatrix * envWorld).xyz;
  vEnvUv = uv;
}
`;

const FRAGMENT_HEAD = /* glsl */ `
uniform sampler2D envNoise;
uniform sampler2D envDetail;
varying vec3 vEnvPos;
varying vec2 vEnvUv;
float envHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
/* tiling texture without visible repetition: two offset lookups chosen and blended by a slow noise */
vec4 envNoTile(sampler2D tex, vec2 uv, float variation) {
  float k = texture(envNoise, uv * variation).r;
  vec2 dx = dFdx(uv);
  vec2 dy = dFdy(uv);
  float l = k * 8.0;
  float f = fract(l);
  float ia = floor(l);
  vec2 offa = sin(vec2(3.0, 7.0) * ia);
  vec2 offb = sin(vec2(3.0, 7.0) * (ia + 1.0));
  vec4 ca = textureGrad(tex, uv + offa, dx, dy);
  vec4 cb = textureGrad(tex, uv + offb, dx, dy);
  return mix(ca, cb, smoothstep(0.2, 0.8, f - 0.1 * dot(ca - cb, vec4(1.0))));
}
/* derivative bump mapping (Mikkelsen 2010): perturbs the view-space normal by height h */
vec3 envBump(vec3 surfPos, vec3 surfNorm, float h, float strength) {
  vec3 dpx = dFdx(surfPos);
  vec3 dpy = dFdy(surfPos);
  vec3 r1 = cross(dpy, surfNorm);
  vec3 r2 = cross(surfNorm, dpx);
  float det = dot(dpx, r1);
  vec3 grad = sign(det) * (dFdx(h) * r1 + dFdy(h) * r2);
  return normalize(abs(det) * surfNorm - strength * grad);
}
`;

let shared = null;

/** Uniforms shared by every patched material (same objects, so one upload each). */
function sharedUniforms(detail) {
  if (!shared) shared = { envNoise: { value: noiseTexture() }, envDetail: { value: detail } };
  return shared;
}

/**
 * Patches `material` so its shader gets the world position (vEnvPos), the uv (vEnvUv) and the
 * shared samplers, then replaces whole chunks of the fragment shader:
 *   fragment[chunk] = GLSL replacing `#include <chunk>` (the original chunk is kept where the
 *   replacement contains the marker `#include <chunk>` itself).
 */
function patchMaterial(
  material,
  key,
  detail,
  { uniforms = {}, fragmentHead = '', fragment = {}, vertex = {} },
) {
  const all = { ...sharedUniforms(detail), ...uniforms };
  material.userData.uniforms = all;
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, all);
    let vs = shader.vertexShader
      .replace('#include <common>', '#include <common>\n' + VERTEX_HEAD + (vertex.head || ''))
      .replace('#include <project_vertex>', '#include <project_vertex>\n' + VERTEX_BODY);
    for (const [chunk, code] of Object.entries(vertex)) {
      if (chunk === 'head') continue;
      vs = vs.replace(`#include <${chunk}>`, code);
    }
    let fs = shader.fragmentShader.replace(
      '#include <common>',
      '#include <common>\n' + FRAGMENT_HEAD + fragmentHead,
    );
    for (const [chunk, code] of Object.entries(fragment)) fs = fs.replace(`#include <${chunk}>`, code);
    shader.vertexShader = vs;
    shader.fragmentShader = fs;
  };
  material.customProgramCacheKey = () => 'env-' + key;
  material.needsUpdate = true;
  return material;
}

/** Bump only near the camera (it would only alias farther away). */
const BUMP_FADE = /* glsl */ `(1.0 - smoothstep(6.0, 40.0, length(vViewPosition)))`;

/**
 * Terrain grass: late-spring palette (references §4.3: about 60 % green #5F7134, 40 % dry #A08C5A),
 * greener clumps, sun-bleached and bare-soil patches, all from world-space noise; blade detail at
 * 2.7 m and 9.1 m. The vertex colours (terrain.js) still multiply the result.
 */
function shadeGrass(material, detail) {
  material.map = null;
  material.color.set(0xffffff);
  const empty = new DataTexture(new Uint8Array(4), 1, 1, RGBAFormat);
  empty.needsUpdate = true;
  return patchMaterial(material, 'grass', detail, {
    uniforms: { envCanopy: { value: empty }, envCanopyBounds: { value: new Vector4(0, 0, 1, 1) } },
    fragmentHead: 'uniform sampler2D envCanopy;\nuniform vec4 envCanopyBounds;\n',
    fragment: {
      map_fragment: /* glsl */ `
      {
        vec2 p = vEnvPos.xz;
        float broad = texture(envNoise, p / 1730.0 + vec2(0.31, 0.77)).r;
        float mid = texture(envNoise, p / 523.0).r;
        float small = texture(envNoise, p / 151.0 + 0.5).g;
        float clump = texture(envNoise, p / 230.0 + 0.6).g;
        float dry = smoothstep(${DRY_EDGES[0]}, ${DRY_EDGES[1]}, broad * 0.45 + mid * 0.35 + small * 0.2);
        vec3 col = mix(${linear(0x5f7134)}, ${linear(0x9c8b5e)}, dry);
        col = mix(col, ${linear(0x4d5e2e)}, smoothstep(0.55, 0.8, clump) * (1.0 - dry) * 0.7);
        col = mix(col, ${linear(0xb8a878)}, smoothstep(0.62, 0.9, small) * dry * 0.55);
        float soil = smoothstep(0.72, 0.85, texture(envNoise, p / 410.0 + 0.2).g) * smoothstep(0.45, 0.75, dry);
        col = mix(col, ${linear(0xb39c7c)}, soil * 0.65);
        float d1 = envNoTile(envDetail, p / 2.7, 0.05).g;
        float d2 = envNoTile(envDetail, p / 9.1 + 0.37, 0.02).g;
        // mottling at 1–5 m: tussocks and thin patches, visible where the blade detail has blurred out
        float tussock = texture(envNoise, p / 14.0).g * 0.6 + texture(envNoise, p / 43.0 + 0.3).r * 0.4;
        float canopy = texture(envCanopy, (p - envCanopyBounds.xy) / (envCanopyBounds.zw - envCanopyBounds.xy)).r;
        diffuseColor.rgb *= col * ${GRASS_GAIN.toFixed(2)} * (0.7 + 0.6 * mix(d1, d2, 0.4)) * (0.8 + 0.4 * tussock)
          * (1.0 - 0.55 * canopy);
      }`,
    },
  });
}

/**
 * Asphalt (track and pit/paddock). Aggregate detail at 2.3 m and 7.9 m, tone patches at 97 m and
 * 331 m, a matching roughness change and a faint bump. On the track (trackFrame) also: lighter,
 * dustier edges where cars do not run, and track-aligned repair patches (fresh dark or old pale
 * sealant) in 31 m cells, none within 40 m of the closing sample. On the pit lane and paddock:
 * dark oil spots and tyre streaks along the pit lane's fast lane.
 */
function shadeAsphalt(material, detail, { trackFrame, lapLength = 1 }) {
  material.map = null;
  return patchMaterial(material, trackFrame ? 'asphalt-track' : 'asphalt-pit', detail, {
    uniforms: trackFrame ? { envLapLength: { value: lapLength }, envAlongScale: { value: 12 } } : {},
    fragmentHead: trackFrame
      ? 'uniform float envLapLength; uniform float envAlongScale;\nfloat envAsphaltH;\n'
      : 'float envAsphaltH;\n',
    fragment: {
      map_fragment: /* glsl */ `
      {
        vec2 p = vEnvPos.xz;
        float a1 = envNoTile(envDetail, p / 2.3, 0.03).r;
        float a2 = envNoTile(envDetail, p / 7.9 + 0.5, 0.011).r;
        envAsphaltH = a1;
        float macro = texture(envNoise, p / 97.0).r * 0.6 + texture(envNoise, p / 331.0 + 0.3).r * 0.4;
        vec3 col = vec3((0.84 + 0.32 * macro) * (0.72 + 0.56 * mix(a1, a2, 0.5)));
        ${
          trackFrame
            ? /* glsl */ `
        float across = vEnvUv.x * 12.0;
        float along = vEnvUv.y * envAlongScale;
        float edge = min(across, 14.0 - across);
        col *= mix(1.12, 1.0, smoothstep(0.3, 2.2, edge));
        float cell = floor(along / 31.0);
        float h = envHash(vec2(cell, 7.0));
        if (h > 0.76) {
          float h2 = envHash(vec2(cell, 11.0));
          float h3 = envHash(vec2(cell, 13.0));
          float h4 = envHash(vec2(cell, 17.0));
          float s0 = cell * 31.0 + 2.0 + h2 * 12.0;
          float s1 = s0 + 4.0 + h3 * 12.0;
          float c0 = 0.6 + h4 * 7.5;
          float c1 = min(13.6, c0 + 2.0 + h2 * 4.5);
          if (s0 > 40.0 && s1 < envLapLength - 40.0) {
            float w = fwidth(along) + fwidth(across) + 0.03;
            float inside = smoothstep(-w, w, along - s0) * smoothstep(-w, w, s1 - along)
              * smoothstep(-w, w, across - c0) * smoothstep(-w, w, c1 - across);
            col *= mix(1.0, h > 0.88 ? 0.8 : 1.13, inside);
          }
        }`
            : /* glsl */ `
        float oil = smoothstep(0.7, 0.85, texture(envNoise, p / 97.0 + 0.4).g) * smoothstep(0.55, 0.75, texture(envNoise, p / 9.0).g);
        col *= 1.0 - 0.32 * oil * texture(envNoise, p / 3.1).g;
        float lane = smoothstep(189.0, 191.0, p.y) * (1.0 - smoothstep(195.5, 197.0, p.y));
        float streak = smoothstep(0.55, 0.8, texture(envNoise, vec2(p.x / 41.0, p.y / 0.9)).g);
        col *= 1.0 - 0.22 * lane * streak;`
        }
        diffuseColor.rgb *= col;
      }`,
      roughnessmap_fragment: /* glsl */ `
      float roughnessFactor = roughness * (0.92 + 0.16 * envAsphaltH);`,
      normal_fragment_maps: /* glsl */ `
      normal = envBump(-vViewPosition, normal, envAsphaltH, 0.004 * ${BUMP_FADE});`,
    },
  });
}

/**
 * The racing-line rubber decal (MeshBasicMaterial; its across-profile map is set by
 * track-surfaces.js): streaky along the lap, two tyre tracks, darker in the braking zones and on
 * corner exits, from the lap texture (createLapTexture: r braking, g traction, sampled by the decal's
 * v, which is metres along the lap).
 */
function shadeRubber(material, detail, lapTexture, lapLength) {
  return patchMaterial(material, 'rubber', detail, {
    uniforms: { envLap: { value: lapTexture }, envLapLength: { value: lapLength } },
    fragmentHead: 'uniform sampler2D envLap; uniform float envLapLength;\n',
    fragment: {
      map_fragment: /* glsl */ `
      {
        float profile = texture2D(map, vMapUv).a;
        float across = vMapUv.x;
        float along = vMapUv.y;
        vec4 lap = texture2D(envLap, vec2(along / envLapLength, 0.5));
        float tracks = smoothstep(0.1, 0.0, abs(abs(across - 0.5) - 0.15) - 0.04);
        float streak = texture2D(envNoise, vec2(across * 2.3, along / 37.0)).g;
        float amount = profile * (0.45 + 0.55 * streak) * (0.65 + 1.5 * lap.r + 0.7 * lap.g);
        amount += tracks * profile * (0.25 + 0.9 * lap.r);
        diffuseColor.a *= clamp(amount, 0.0, 2.6);
      }`,
    },
  });
}

/** White paint worn down to the asphalt in world-space patches and specks. */
function shadeLines(material, detail) {
  return patchMaterial(material, 'lines', detail, {
    fragment: {
      map_fragment: /* glsl */ `
      {
        vec2 p = vEnvPos.xz;
        float wear = texture(envNoise, p / 9.7).g * 0.55 + texture(envNoise, p / 2.3).g * 0.3
          + texture(envNoise, p / 0.71).a * 0.15;
        float worn = smoothstep(0.5, 0.82, wear);
        diffuseColor.rgb = mix(diffuseColor.rgb, ${linear(0x6b6b6a)}, worn * 0.7);
      }`,
    },
  });
}

/**
 * Kerbs: the block texture (map, u across, v = metres / 6 along) faded from fresh #2F86D0 towards
 * sun-faded #76C1EC in world-space patches, rubber streaks on the half next to the asphalt, dust on
 * the outer edge.
 */
function shadeKerb(material, detail) {
  return patchMaterial(material, 'kerb', detail, {
    fragment: {
      map_fragment: /* glsl */ `
      {
        vec4 block = texture2D(map, vMapUv);
        vec2 p = vEnvPos.xz;
        float across = vMapUv.x;
        float along = vMapUv.y * 6.0;
        float fade = texture(envNoise, p / 23.0).r * 0.65 + texture(envNoise, p / 4.1).g * 0.35;
        float blue = clamp((block.b - block.r) * 1.6, 0.0, 1.0);
        vec3 faded = mix(block.rgb * 0.93, ${linear(0x76c1ec)}, blue);
        vec3 col = mix(block.rgb, faded, 0.7 * smoothstep(0.5, 0.85, fade));
        float marks = smoothstep(0.6, 0.85, texture(envNoise, vec2(across * 1.7, along / 19.0)).g)
          * (1.0 - smoothstep(0.15, 0.6, across));
        col *= 1.0 - 0.4 * marks;
        col = mix(col, ${linear(0x9d927e)}, smoothstep(0.8, 1.0, across) * 0.45);
        diffuseColor.rgb *= col;
      }`,
    },
  });
}

/**
 * Painted run-off, mint green #4FB9A2 (references §4.4): dirt patches, grey tyre marks along the
 * corner, and gravel spilled onto its outer edge (u → 1, where the gravel trap starts).
 */
function shadeRunoff(material, detail) {
  material.color.set(0x4fb9a2);
  return patchMaterial(material, 'runoff', detail, {
    fragment: {
      map_fragment: /* glsl */ `
      {
        vec2 p = vEnvPos.xz;
        float dirt = texture(envNoise, p / 13.0).g;
        float marks = smoothstep(0.58, 0.82, texture(envNoise, vec2(vEnvUv.x * 1.3, vEnvUv.y / 9.0)).g);
        vec3 col = vec3(0.86 + 0.24 * dirt);
        col = mix(col, vec3(0.42), marks * 0.4);
        float speck = texture(envNoise, p / 6.0).a;
        float zone = smoothstep(0.6, 1.0, vEnvUv.x);
        float w = fwidth(speck) + 0.02;
        float spill = smoothstep(1.0 - zone * 0.6 - w, 1.0 - zone * 0.6 + w, speck) * zone;
        diffuseColor.rgb = mix(diffuseColor.rgb * col, ${linear(0xb5a288)}, spill * 0.85);
      }`,
    },
  });
}

/**
 * Gravel traps: base #B5A288 (references §4.4), pebbles from the detail image at 1.45 m and 4.3 m,
 * darker raked-up clumps #94806C, faint furrows along the trap, darker disturbed gravel along the
 * inner edge where cars run off, and pebble bump close up.
 */
function shadeGravel(material, detail) {
  material.map = null;
  material.color.set(0xffffff);
  return patchMaterial(material, 'gravel', detail, {
    fragmentHead: 'float envPebbleH;\n',
    fragment: {
      map_fragment: /* glsl */ `
      {
        vec2 p = vEnvPos.xz;
        vec4 g1 = envNoTile(envDetail, p / 1.45, 0.07);
        vec4 g2 = envNoTile(envDetail, p / 4.3 + 0.21, 0.03);
        envPebbleH = g1.a;
        float clumps = texture(envNoise, p / 90.0 + 0.2).g * 0.6 + texture(envNoise, p / 13.0).g * 0.4;
        float broad = texture(envNoise, p / 71.0).r;
        vec3 col = ${linear(0xb5a288)} * (0.78 + 0.44 * mix(g1.b, g2.b, 0.35)) * (0.9 + 0.2 * broad);
        col = mix(col, ${linear(0x94806c)}, smoothstep(0.55, 0.85, clumps) * 0.55);
        float rake = 0.5 + 0.5 * sin(vEnvUv.x * 95.0 + texture(envNoise, p / 11.0).g * 6.0);
        col *= 0.95 + 0.07 * rake;
        col = mix(col, ${linear(0x8a7660)}, (1.0 - smoothstep(0.0, 0.12, vEnvUv.x)) * 0.5 * texture(envNoise, p / 7.0).g);
        diffuseColor.rgb *= col;
      }`,
      normal_fragment_maps: /* glsl */ `
      normal = envBump(-vViewPosition, normal, envPebbleH, 0.02 * ${BUMP_FADE});`,
    },
  });
}

/**
 * Per-lap data for the rubber decal: 2048 texels around the lap (2 m each), r = braking (ramps up
 * over the 110 m before each sub-corner, strongest 15 m before it, gone 15 m into it, scaled by
 * the corner's total turn), g = traction (the 40 m after each corner). Filled by fillLapTexture()
 * once the track model exists (zeros until then).
 */
const LAP_TEXELS = 2048;
function createLapTexture() {
  const texture = new DataTexture(new Uint8Array(LAP_TEXELS * 4), LAP_TEXELS, 1, RGBAFormat);
  texture.wrapS = RepeatWrapping;
  texture.magFilter = texture.minFilter = LinearFilter;
  texture.generateMipmaps = false;
  texture.name = 'env-lap';
  texture.needsUpdate = true;
  return texture;
}

function fillLapTexture(texture, model) {
  const { line, corners } = model;
  const count = line.count;
  const braking = new Float64Array(count);
  const traction = new Float64Array(count);
  for (const corner of corners)
    for (const sub of corner.subCorners || [corner]) {
      let turn = 0; // radians turned through the sub-corner
      for (let i = sub.first; i <= sub.last; i++) turn += Math.abs(line.curvature[i % count]) * line.spacing;
      const severity = Math.min(1, turn / 1.2);
      for (let d = -110; d <= 15; d++) {
        const i = (((sub.first + Math.round(d / line.spacing)) % count) + count) % count;
        const w = d < -15 ? (d + 110) / 95 : 1 - (d + 15) / 30;
        braking[i] = Math.max(braking[i], severity * w * w);
      }
      for (let d = 0; d <= 40; d++) {
        const i = (sub.last + Math.round(d / line.spacing)) % count;
        traction[i] = Math.max(traction[i], severity * (1 - d / 40));
      }
    }
  const bytes = texture.image.data;
  for (let k = 0; k < LAP_TEXELS; k++) {
    const i = Math.min(count - 1, Math.floor(((k + 0.5) / LAP_TEXELS) * count));
    bytes[4 * k] = Math.round(255 * braking[i]);
    bytes[4 * k + 1] = Math.round(255 * traction[i]);
    bytes[4 * k + 3] = 255;
  }
  texture.needsUpdate = true;
}

/** Applies the surface patches to the world material table (materials.js). */
function shadeWorldSurfaces(materials, detail, lapTexture) {
  shadeGrass(materials.ground, detail);
  shadeAsphalt(materials.asphalt, detail, { trackFrame: true, lapLength: 4176.6 });
  shadeAsphalt(materials.pitAsphalt, detail, { trackFrame: false });
  shadeRubber(materials.rubber, detail, lapTexture, 4176.6);
  shadeLines(materials.line, detail);
  shadeKerb(materials.kerb, detail);
  shadeRunoff(materials.runoff, detail);
  shadeGravel(materials.gravel, detail);
}

/** Sets the lap length (metres) once the track model is known, and fills the lap texture. */
function bindTrackModel(materials, lapTexture, model) {
  const length = model.line.length;
  materials.asphalt.userData.uniforms.envLapLength.value = length;
  // asphalt v is metres × round(L / 12) / L (track-surfaces.js), so metres = v × L / round(L / 12)
  materials.asphalt.userData.uniforms.envAlongScale.value = length / Math.round(length / 12);
  materials.rubber.userData.uniforms.envLapLength.value = length;
  fillLapTexture(lapTexture, model);
}

export { DRY_EDGES, bindTrackModel, createLapTexture, linear, patchMaterial, shadeWorldSurfaces };
