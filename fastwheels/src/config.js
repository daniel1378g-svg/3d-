// Everything about the business in one place. Entries left as null are not shown anywhere on the site:
// no link, no label, no placeholder. Fill them in when the garage confirms them.
export const CONFIG = {
  brand: {
    name: 'FASTWHEELS GARAGE',
    tagline: 'ARDON. VALAIS 1957',
  },
  address: {
    street: 'Rue de la Greneye 11',
    postalCode: '1957',
    city: 'Ardon',
    country: 'Switzerland',            // shown translated (key: contact.country)
    // Opens directions to the garage in the visitor's maps app or browser.
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Rue+de+la+Greneye+11%2C+1957+Ardon%2C+Switzerland',
  },
  instagram: { handle: '@fastwheels1957', url: 'https://www.instagram.com/fastwheels1957/' },

  // TO BE PROVIDED by the garage. Use international format for numbers, e.g. '+41 27 000 00 00'.
  phone: null,
  whatsapp: null,                      // digits only, with country code, e.g. '41790000000'
  email: null,
  // Opening hours: an array of { days: 'mon-fri', open: '08:00', close: '18:00' }, or null.
  hours: null,

  defaultLanguage: 'fr',

  booking: {
    // URL that accepts the appointment request as a JSON POST and answers 2xx on success
    // (see server/booking-server.mjs for a reference handler and the payload). null = not connected:
    // the form then says clearly that nothing was sent and offers to copy the request instead.
    endpoint: null,
    timeoutMs: 12000,
  },

  // 3D model credits (required by the models' Creative Commons licences).
  credits: [
    { title: '2021 BMW M4 Competition', author: 'Ricy', url: 'https://sketchfab.com/3d-models/2021-bmw-m4-competition-d3f07b471d9f4a2c9a2acf79d88a3645', license: 'CC BY-NC 4.0' },
    { title: 'BMW S1000 RR', author: 'VTX', url: 'https://sketchfab.com/3d-models/bmw-s1000-rr-1873aed292d6465694119bd81860a0c2', license: 'CC BY-NC-SA 4.0' },
  ],
};
