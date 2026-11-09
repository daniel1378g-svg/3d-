// Events pages (site/eventos, site/categorias and their English twins): keeps the date-driven lists,
// heroes, counts and "ended" notes right after the day the static HTML was rendered for (see ./events.js).
// Built to site/assets/js/events.js and loaded as a module, so older browsers keep the static render.

import { initEvents } from './events.js';

try {
  initEvents(document);
} catch (err) {
  console.warn('[events] could not update the event blocks', err);
}
