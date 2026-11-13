// FASTWHEELS GARAGE, Ardon (Switzerland). Entries left as null are not shown anywhere on the site.
export default {
  key: 'fastwheels',
  brand: { name: 'FASTWHEELS GARAGE', title: 'FASTWHEELS GARAGE', tagline: 'ARDON. VALAIS 1957' },
  address: {
    street: 'Rue de la Greneye 11', postalCode: '1957', city: 'Ardon',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Rue+de+la+Greneye+11%2C+1957+Ardon%2C+Switzerland',
  },
  instagram: { handle: '@fastwheels1957', url: 'https://www.instagram.com/fastwheels1957/' },
  facebook: null, youtube: null,
  // TO BE PROVIDED by the garage. Use international format for numbers, e.g. '+41 27 000 00 00'.
  phone: null,
  whatsapp: null,                      // digits only, with country code, e.g. '41790000000'
  email: null,
  hours: null,                         // [{ days: 'mon-fri', open: '08:00', close: '18:00' }] or null
  links: {},
  defaultLanguage: 'fr',
  booking: { endpoint: null, timeoutMs: 12000 },

  nav: [['detailing', 'nav.detailing'], ['ceramic', 'nav.ceramic'], ['wrap', 'nav.wrap'], ['ambient', 'nav.ambient'], ['starlight', 'nav.starlight']],
  story: { grade: null, steps: [[1, 'detailing', 'b_foam'], [2, '', 'c_clean'], [3, 'ceramic', 'e_macro'], [4, '', 'd_bike']] },
  services: ['detailing', 'ceramic', 'wrap', 'ambient', 'starlight'],
  wrapService: { car: 'wrap', bike: 'wrap' },
  interior: 'lights',                  // the interior sequence shows ambient lighting and the starlight headliner
  defaultSelection: null,
  scene: { accent: null },
  strings: {},
  extras: null,
  css: null,
};
