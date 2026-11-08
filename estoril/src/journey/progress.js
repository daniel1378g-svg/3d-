// Journey progress: the page's scroll target → the smoothed progress the scene renders, plus the
// intro fly-in timeline and the stage list.
//
// Progress is a scalar in [0, 1] along the whole home-page journey. The page sets a target
// (createJourney().setProgress) and every rendered frame eases the displayed value towards it with
// a critically damped spring, so fast scroll flicks become smooth camera moves instead of jumps.
import { clamp, easeInOutCubic } from './util/math.js';

/** Progress at which each stage starts: arrival, pit lane, on track, paddock, golden hour. */
const STAGES = [0, 0.2, 0.425, 0.665, 0.885];

/** Spring smooth time in seconds (≈ the time it takes to close most of the gap to the target). */
const SMOOTH_TIME = 0.26;

/** Length of the intro fly-in, in seconds of rendered time. */
const INTRO_SECONDS = 2.6;

/** The intro also ends as soon as the scroll target passes this progress. */
const INTRO_SKIP_PROGRESS = 0.01;

/**
 * One step of a critically damped spring towards `target` (the SmoothDamp formulation: exact for
 * a critically damped oscillator, with a cubic approximation of exp()). `spring.velocity` carries
 * the velocity between calls, in progress units per second. Never overshoots the target.
 */
function smoothDamp(spring, current, target, dt) {
  const omega = 2 / SMOOTH_TIME;
  const x = omega * dt;
  const decay = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
  const offset = current - target;
  const impulse = (spring.velocity + omega * offset) * dt;
  spring.velocity = (spring.velocity - omega * impulse) * decay;
  let next = target + (offset + impulse) * decay;
  // overshoot guard: if this step crossed (or reached) the target, land on it and stop
  if (target - current > 0 == next > target) {
    next = target;
    spring.velocity = 0;
  }
  return next;
}

/**
 * Mutable progress state shared by the frame loop and the public API.
 *   target     where the page wants to be (scroll position), 0..1
 *   value      what is rendered (spring-smoothed `target`)
 *   velocity   spring velocity (progress units / s)
 *   intro      intro timeline 0..1 (the fly-in along the main straight)
 *   introDone  intro finished or skipped
 *   snap       set by renderAt(): render `target` exactly, without smoothing
 */
function createProgress() {
  const state = {
    target: 0,
    value: 0,
    velocity: 0,
    intro: 0,
    introDone: false,
    snap: false,
    /** One frame step of `dt` seconds: runs the intro clock and the spring. */
    advance(dt) {
      if (!state.introDone) {
        state.intro += dt / INTRO_SECONDS;
        if (state.intro >= 1 || state.target > INTRO_SKIP_PROGRESS) state.finishIntro();
      }
      // the spring always runs (it updates `velocity`); a snap then overrides its result
      state.value = smoothDamp(state, state.value, state.target, dt);
      if (state.snap) {
        state.value = state.target;
        state.velocity = 0;
      }
    },
    finishIntro() {
      state.intro = 1;
      state.introDone = true;
    },
    /** Eased intro amount 0..1 that blends the camera in from its intro pose (1 = no blend). */
    get introEase() {
      return easeInOutCubic(clamp(state.intro, 0, 1));
    },
  };
  return state;
}

export { STAGES, createProgress };
