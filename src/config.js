// ─────────────────────────────────────────────────────────────────────────────
// Business details. Everything in [brackets] is an editable placeholder:
// replace it with your verified company information before going live.
// ─────────────────────────────────────────────────────────────────────────────
export const BUSINESS = {
  brand: 'Nur Atelier',
  tagline: 'Turkish mosaic lighting · Switzerland',
  street: '[Street and number]',
  city: '[Postcode] [City]',
  country: 'Switzerland',
  phone: '+41 [00 000 00 00]',
  email: 'hello@[your-domain].ch',
  uid: 'CHE-[000.000.000]',
  workshop: '[Partner workshop, city], Türkiye',
  showroomHours: '[Tue–Sat, 10:00–18:00]',
  deliveryWeeks: '[3–5]',
  handHours: '[40]',
};

// Glass palettes: slot colours for the mosaic motif
// slots → [white glass, rosette core, petals, small stars, corner star, grout]
export const PALETTES = {
  iznik:    { swatch: ['#1f3fa8', '#1fa39a', '#c8322b', '#e9b824'], slots: ['#f1ece0', '#c8322b', '#159488', '#1f3fa8', '#e2ad1c'], grout: '#d8d0bf' },
  safran:   { swatch: ['#e8a33d', '#c76b1f', '#8a3b12', '#f2d27a'], slots: ['#f6e7c3', '#b5481a', '#e39a2d', '#7a3410', '#f0c851'], grout: '#d9c9a3' },
  bosphorus:{ swatch: ['#0e7c86', '#3fb6b2', '#1b4f8a', '#a7dbd8'], slots: ['#e4f1ee', '#1b4f8a', '#2aa7a2', '#0d6470', '#8fd3cf'], grout: '#c9d3cf' },
  gece:     { swatch: ['#1b2a6b', '#4b2a7b', '#2f5fa8', '#c9c9d6'], slots: ['#26357f', '#d9d9e6', '#6a35a0', '#a9bdf0', '#e2e2ee'], grout: '#4a4a5c' },
  gul:      { swatch: ['#b3304a', '#e27a8c', '#7a1f35', '#f0c9a8'], slots: ['#f5e4d6', '#7a1f35', '#d4566f', '#a32a44', '#eab08c'], grout: '#dccbbd' },
};

export const FINISHES = {
  antique:  { color: '#a9844f', rough: 0.42, surcharge: 0 },
  polished: { color: '#e0b860', rough: 0.2, surcharge: 0 },
  copper:   { color: '#b8683f', rough: 0.34, surcharge: 90 },
  noir:     { color: '#3b3029', rough: 0.5, surcharge: 160 },
};

export const BASE_PRICE = { 3: 1290, 5: 1890, 7: 2590 };

export const DEFAULT_CONFIG = { palette: 'iznik', finish: 'antique', globes: 5 };

export function priceOf(cfg) {
  return BASE_PRICE[cfg.globes] + FINISHES[cfg.finish].surcharge;
}

export const PRODUCTS = [
  { id: 'yildiz',    name: 'Yıldız',   palette: 'iznik',     finish: 'antique',  globes: 5 },
  { id: 'lale',      name: 'Lale',     palette: 'iznik',     finish: 'polished', globes: 3 },
  { id: 'gece',      name: 'Gece',     palette: 'gece',      finish: 'noir',     globes: 5 },
  { id: 'safran',    name: 'Safran',   palette: 'safran',    finish: 'polished', globes: 7 },
  { id: 'bosphorus', name: 'Boğaziçi', palette: 'bosphorus', finish: 'copper',   globes: 7 },
  { id: 'gul',       name: 'Gül',      palette: 'gul',       finish: 'antique',  globes: 3 },
];
