// The red line that draws itself around the circuit during the aerial shots
// (visible over progress ≈ 0.334–0.408).
//
// A flat ribbon on the track model's centre line (world/track-analysis.js): one vertex pair per
// model sample, so it follows the asphalt and the other surfaces exactly, and the lap closes on
// sample 0 without a zero-length segment. It lies at LAYERS.highlight (above every ground layer)
// and is pulled further towards the camera with polygonOffset; it is depth-tested, so buildings,
// walls and trees hide it, and writes no depth. Unlit brand red (MeshBasicMaterial), no fog.
//
// Width: WIDTH metres, widened in the vertex shader (up to MAX_WIDTH) wherever the line would be
// thinner on screen than the minimum core width, measured across the line's own screen direction:
// MIN_SCREEN_FRACTION of the viewport's smaller side (on a portrait phone the camera widens its
// view, so the circuit's scale follows the width), and never less than MIN_CSS_PIXELS CSS pixels
// (the drawing buffer can be smaller than the canvas: pixel-ratio cap, dynamic resolution) nor
// MIN_BUFFER_PIXELS drawing-buffer pixels. The widening stays in the ground plane, so the line
// keeps lying on the road and its depth test stays right, and it stays readable at the grazing
// 0.345 view (16° elevation, 200–600 m away), where a flat ribbon of constant width shrinks below
// a pixel. The core is fully opaque: the quad is one pixel wider on each side than the core and
// only that extra pixel fades (anti-aliased edge), so a thin line is never blended with the road.
//
// Reveal: the fragment shader compares each fragment's arc-length fraction with the head
// (uniform uHead) and fades the last FEATHER metres, so the head is smooth at any angle and any
// speed (no draw range, no partial triangles). The head follows a target that eases over progress
// REVEAL_START..REVEAL_END, moving at most MAX_SPEED laps per second and lagging it by a smooth
// first-order response (LAG seconds), integrated exactly per frame: a quick scroll no longer jumps
// the head hundreds of metres in one frame, and the motion is the same at any frame rate.
// update(..., snap = true) (renderAt) puts it on the target, so captures stay deterministic.
// update() allocates nothing.
import { BufferGeometry, Float32BufferAttribute, Mesh, MeshBasicMaterial, Vector2, Vector4 } from 'three';
import { clamp, smoothstep } from './util/math.js';
import { LAYERS } from './world/layers.js';

const COLOR = 0xe93325; // brand red
const OPACITY = 1;
const WIDTH = 4.5; // metres (the track is 13–14 m wide)
const MIN_SCREEN_FRACTION = 0.006; // of the smaller viewport side: 5.4 px at 1440×900, 3.6 at 960×600
const MIN_CSS_PIXELS = 3; // the core is never thinner than this many CSS pixels…
const MIN_BUFFER_PIXELS = 1.5; // …nor than this many drawing-buffer pixels
const MAX_WIDTH = 30; // metres: the widening never goes beyond this
const FEATHER = 50; // metres of soft fade behind the head
const REVEAL_START = 0.334;
const REVEAL_END = 0.388;
const FADE_IN = 0.008; // progress over which the line fades in from REVEAL_START
const FADE_OUT_START = 0.39;
const FADE_OUT_END = 0.408;
const MAX_SPEED = 0.9; // laps per second
const LAG = 0.15; // seconds

const VERTEX_PARS = `attribute float aSide;
attribute float aArc;
attribute vec2 aAcross;
uniform float uWidth;
uniform float uMaxWidth;
uniform float uMinPixels;
uniform vec2 uViewport;
varying float vArc;
varying float vSidePixels;
varying float vHalfPixels;
`;

// Widen the ribbon so its core is at least uMinPixels thick on screen: project 1 m along and 1 m
// across the track from the centre-line point of this vertex pair (so both vertices of a pair
// agree), and measure the screen distance across the line (the part of the across step that is
// perpendicular to the line's own screen direction), in pixels per metre of width. Each edge then
// moves out by half the extra width plus one pixel (the anti-aliased fringe); vSidePixels runs
// from -vHalfPixels to +vHalfPixels across the quad.
const VERTEX_WIDEN = `#include <begin_vertex>
{
  vec3 across = vec3(aAcross.x, 0.0, aAcross.y);
  vec3 along = vec3(aAcross.y, 0.0, -aAcross.x);
  vec4 world = modelMatrix * vec4(position - across * aSide * 0.5 * uWidth, 1.0);
  mat4 viewProjection = projectionMatrix * viewMatrix;
  vec4 c0 = viewProjection * world;
  vec4 cAlong = viewProjection * (world + vec4(along, 0.0));
  vec4 cAcross = viewProjection * (world + vec4(across, 0.0));
  float halfWidth = 0.5 * uWidth;
  float halfPixels = 1e4; // no screen measure (at or behind the eye): a hard edge
  if (c0.w > 1.0 && cAlong.w > 0.5 && cAcross.w > 0.5) {
    vec2 s0 = c0.xy / c0.w;
    vec2 t = (cAlong.xy / cAlong.w - s0) * 0.5 * uViewport;
    vec2 l = (cAcross.xy / cAcross.w - s0) * 0.5 * uViewport;
    float pixelsPerMetre = max(abs(t.x * l.y - t.y * l.x) / max(length(t), 1e-4), 1e-4);
    float core = clamp(uMinPixels / pixelsPerMetre, uWidth, uMaxWidth);
    halfWidth = min(0.5 * core + 1.0 / pixelsPerMetre, 0.5 * uMaxWidth + 1.0);
    halfPixels = halfWidth * pixelsPerMetre;
  }
  transformed += across * aSide * (halfWidth - 0.5 * uWidth);
  vArc = aArc;
  vSidePixels = aSide * halfPixels;
  vHalfPixels = halfPixels;
}`;

const FRAGMENT_PARS = `uniform float uHead;
uniform float uFeather;
varying float vArc;
varying float vSidePixels;
varying float vHalfPixels;
`;

// soft head along the lap; across it, an opaque core and a one-pixel fade outside it
const FRAGMENT_MASK = `#include <color_fragment>
diffuseColor.a *= 1.0 - smoothstep(uHead - uFeather, uHead, vArc);
diffuseColor.a *= clamp(vHalfPixels - abs(vSidePixels), 0.0, 1.0);`;

/** Ribbon geometry: vertex pairs (right, left) at every model sample, closing on sample 0. */
function ribbonGeometry(model) {
  const { line } = model;
  const count = line.count;
  const positions = new Float32Array((count + 1) * 6);
  const across = new Float32Array((count + 1) * 4);
  const sides = new Float32Array((count + 1) * 2);
  const arcs = new Float32Array((count + 1) * 2);
  const normals = new Float32Array((count + 1) * 6);
  for (let k = 0; k <= count; k++) {
    const i = k % count;
    for (const [j, side] of [
      [0, 1],
      [1, -1],
    ]) {
      const v = 2 * k + j;
      positions.set(
        [
          line.x[i] + line.nx[i] * side * WIDTH * 0.5,
          LAYERS.highlight,
          line.z[i] + line.nz[i] * side * WIDTH * 0.5,
        ],
        v * 3,
      );
      across.set([line.nx[i], line.nz[i]], v * 2);
      sides[v] = side;
      arcs[v] = (k * line.spacing) / line.length; // 0 at sample 0 … 1 back at sample 0
      normals[v * 3 + 1] = 1;
    }
  }
  const indices = [];
  // edge A (right, +normal) lies right of edge B: (A_k, A_k+1, B_k) faces up
  for (let k = 0; k < count; k++) indices.push(2 * k, 2 * k + 2, 2 * k + 1, 2 * k + 1, 2 * k + 2, 2 * k + 3);
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new Float32BufferAttribute(normals, 3));
  geometry.setAttribute('aAcross', new Float32BufferAttribute(across, 2));
  geometry.setAttribute('aSide', new Float32BufferAttribute(sides, 1));
  geometry.setAttribute('aArc', new Float32BufferAttribute(arcs, 1));
  geometry.setIndex(indices);
  geometry.computeBoundingSphere();
  geometry.boundingSphere.radius += MAX_WIDTH; // the shader widens it to MAX_WIDTH + 2 m at most
  return geometry;
}

/** `model`: the shared track model (world/track-analysis.js), so the line follows the surfaces. */
function createTrackHighlight(model) {
  const uniforms = {
    uHead: { value: 0 },
    uFeather: { value: FEATHER / model.line.length },
    uWidth: { value: WIDTH },
    uMaxWidth: { value: MAX_WIDTH },
    uMinPixels: { value: 3 },
    uViewport: { value: new Vector2(1, 1) },
  };
  const material = new MeshBasicMaterial({
    color: COLOR,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    fog: false,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -4,
  });
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = VERTEX_PARS + shader.vertexShader.replace('#include <begin_vertex>', VERTEX_WIDEN);
    shader.fragmentShader =
      FRAGMENT_PARS + shader.fragmentShader.replace('#include <color_fragment>', FRAGMENT_MASK);
  };
  const mesh = new Mesh(ribbonGeometry(model), material);
  mesh.name = 'track-highlight';
  // after the renderOrder-1 decals (rubber line, AO fades), so they never tint the line
  mesh.renderOrder = 2;
  const viewport = new Vector4();
  let pixelRatio = 1; // drawing-buffer pixels per CSS pixel (set by update)
  mesh.onBeforeRender = (renderer) => {
    renderer.getCurrentViewport(viewport);
    uniforms.uViewport.value.set(viewport.z, viewport.w);
    uniforms.uMinPixels.value = Math.max(
      MIN_SCREEN_FRACTION * Math.min(viewport.z, viewport.w),
      MIN_CSS_PIXELS * pixelRatio,
      MIN_BUFFER_PIXELS,
    );
  };

  // the head: `limited` chases the target at no more than MAX_SPEED laps per second, `reveal`
  // follows it through a first-order low-pass with time constant LAG, integrated exactly for the
  // linear motion of `limited` within a frame, so any frame rate gives the same motion
  let limited = 0;
  let reveal = 0;

  return {
    mesh,
    /**
     * `progress` journey progress, `dt` frame time (s), `snap` true to jump to the target
     * (renderAt / captures), `ratio` drawing-buffer pixels per CSS pixel (minimum line width).
     */
    update(progress, dt, snap = false, ratio = 1) {
      pixelRatio = ratio;
      const target = smoothstep(clamp((progress - REVEAL_START) / (REVEAL_END - REVEAL_START), 0, 1));
      if (snap || !(dt > 0)) {
        limited = reveal = target;
      } else {
        const from = limited;
        const step = MAX_SPEED * dt;
        limited = target > limited ? Math.min(target, limited + step) : Math.max(target, limited - step);
        const speed = (limited - from) / dt;
        const decay = Math.exp(-dt / LAG);
        reveal = limited - speed * LAG * (1 - decay) + (reveal - from) * decay;
      }
      const fadeIn = clamp((progress - REVEAL_START) / FADE_IN, 0, 1);
      const fadeOut =
        1 - smoothstep(clamp((progress - FADE_OUT_START) / (FADE_OUT_END - FADE_OUT_START), 0, 1));
      material.opacity = fadeIn * fadeOut * OPACITY * Math.min(1, reveal * 40);
      mesh.visible = material.opacity > 0.01;
      // the head runs past 1 by the feather, so the whole lap is solid at the end
      uniforms.uHead.value = reveal * (1 + uniforms.uFeather.value);
    },
  };
}

export { createTrackHighlight };
