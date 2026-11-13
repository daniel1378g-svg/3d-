// Entry of the lazily loaded 3D bundle. The page loads it as a classic script and talks to window.FWScene.
import { createScene, detectTier, isSupported, PHASES, AMBIENT_READY, STILLS, SEQUENCES } from './scene.js';

window.FWScene = { createScene, detectTier, isSupported, PHASES, AMBIENT_READY, STILLS, SEQUENCES };
window.dispatchEvent(new Event('fwscene'));
