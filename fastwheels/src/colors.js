// Wrap colours. Names are our own descriptive names (not film manufacturers' codes), in the site's five
// languages: [fr, en, pt, it, de]. `effects` lists what each colour is offered in; the first is its default.
export const FAMILIES = ['neutral', 'warm', 'green', 'blue', 'special'];
export const FINISHES = ['gloss', 'satin', 'matte'];
export const EFFECTS = ['solid', 'metallic', 'pearl'];

const c = (id, hex, family, effects, name) => ({ id, hex, family, effects, name });
const S = 'solid', M = 'metallic', P = 'pearl';

export const COLORS = [
  // Whites, blacks, silvers and greys
  c('glacier-white', '#eef0ee', 'neutral', [S, P], ['Blanc glacier', 'Glacier white', 'Branco glaciar', 'Bianco ghiacciaio', 'Gletscherweiss']),
  c('ivory-pearl', '#e9e2d2', 'neutral', [P, S], ['Ivoire nacré', 'Ivory pearl', 'Marfim pérola', 'Avorio perlato', 'Elfenbein Perl']),
  c('liquid-silver', '#b9bdc2', 'neutral', [M], ['Argent liquide', 'Liquid silver', 'Prata líquida', 'Argento liquido', 'Flüssigsilber']),
  c('cement-grey', '#8a8f93', 'neutral', [S], ['Gris ciment', 'Cement grey', 'Cinzento cimento', 'Grigio cemento', 'Zementgrau']),
  c('storm-grey', '#5b6168', 'neutral', [S, M, P], ['Gris orage', 'Storm grey', 'Cinzento tempestade', 'Grigio tempesta', 'Sturmgrau']),
  c('graphite', '#34383e', 'neutral', [M, S], ['Graphite', 'Graphite', 'Grafite', 'Grafite', 'Graphit']),
  c('carbon-black', '#17191d', 'neutral', [M, S], ['Noir carbone', 'Carbon black', 'Preto carbono', 'Nero carbonio', 'Carbonschwarz']),
  c('jet-black', '#08090b', 'neutral', [S, M], ['Noir profond', 'Jet black', 'Preto profundo', 'Nero profondo', 'Tiefschwarz']),
  // Reds, oranges and yellows
  c('racing-red', '#c1121c', 'warm', [S, M], ['Rouge course', 'Racing red', 'Vermelho corrida', 'Rosso corsa', 'Rennrot']),
  c('candy-red', '#9d0b1e', 'warm', [M, P], ['Rouge candy', 'Candy red', 'Vermelho candy', 'Rosso candy', 'Candyrot']),
  c('burgundy', '#5a0f1c', 'warm', [S, M, P], ['Bordeaux', 'Burgundy', 'Bordeaux', 'Bordeaux', 'Bordeauxrot']),
  c('sunset-orange', '#e2571e', 'warm', [S, M], ['Orange couchant', 'Sunset orange', 'Laranja pôr do sol', 'Arancione tramonto', 'Abendorange']),
  c('papaya', '#f08a1c', 'warm', [S], ['Papaye', 'Papaya', 'Papaia', 'Papaya', 'Papaya']),
  c('signal-yellow', '#f2c417', 'warm', [S], ['Jaune signal', 'Signal yellow', 'Amarelo sinal', 'Giallo segnale', 'Signalgelb']),
  c('acid-yellow', '#d7e21f', 'warm', [S], ['Jaune acide', 'Acid yellow', 'Amarelo ácido', 'Giallo acido', 'Säuregelb']),
  // Greens and teals
  c('racing-green', '#0f4a2c', 'green', [S, M], ['Vert course', 'Racing green', 'Verde corrida', 'Verde corsa', 'Renngrün']),
  c('emerald', '#0c7a4b', 'green', [M, P], ['Émeraude', 'Emerald', 'Esmeralda', 'Smeraldo', 'Smaragd']),
  c('olive', '#5d6139', 'green', [S], ['Olive', 'Olive', 'Azeitona', 'Oliva', 'Oliv']),
  c('sage', '#8a9a83', 'green', [S], ['Sauge', 'Sage', 'Salva', 'Salvia', 'Salbei']),
  c('mint', '#9fd9c0', 'green', [S, P], ['Menthe', 'Mint', 'Menta', 'Menta', 'Minze']),
  c('petrol', '#0e5560', 'green', [S, M], ['Bleu pétrole', 'Petrol', 'Azul petróleo', 'Petrolio', 'Petrol']),
  c('turquoise', '#18a7a7', 'green', [S, M], ['Turquoise', 'Turquoise', 'Turquesa', 'Turchese', 'Türkis']),
  // Blues and purples
  c('midnight-blue', '#14246e', 'blue', [S, M, P], ['Bleu nuit', 'Midnight blue', 'Azul meia-noite', 'Blu notte', 'Mitternachtsblau']),
  c('navy', '#0f1b3d', 'blue', [S, M], ['Bleu marine', 'Navy', 'Azul marinho', 'Blu navy', 'Marineblau']),
  c('electric-blue', '#1f57d6', 'blue', [S, M], ['Bleu électrique', 'Electric blue', 'Azul elétrico', 'Blu elettrico', 'Elektroblau']),
  c('sky-blue', '#6fb1e6', 'blue', [S, P], ['Bleu ciel', 'Sky blue', 'Azul céu', 'Azzurro cielo', 'Himmelblau']),
  c('ultraviolet', '#5b2ba8', 'blue', [S, M, P], ['Ultraviolet', 'Ultraviolet', 'Ultravioleta', 'Ultravioletto', 'Ultraviolett']),
  c('aubergine', '#3a1657', 'blue', [M, P], ['Aubergine', 'Aubergine', 'Beringela', 'Melanzana', 'Aubergine']),
  c('lavender', '#a998dd', 'blue', [S, P], ['Lavande', 'Lavender', 'Lavanda', 'Lavanda', 'Lavendel']),
  // Pinks, bronze, champagne and other premium shades
  c('rose-pink', '#e88fb0', 'special', [S, P], ['Rose poudré', 'Rose pink', 'Rosa suave', 'Rosa cipria', 'Puderrosa']),
  c('magenta', '#c2187c', 'special', [S, M], ['Magenta', 'Magenta', 'Magenta', 'Magenta', 'Magenta']),
  c('rose-gold', '#c98f7d', 'special', [M, P], ['Or rose', 'Rose gold', 'Ouro rosa', 'Oro rosa', 'Roségold']),
  c('champagne', '#cdbb95', 'special', [M, P], ['Champagne', 'Champagne', 'Champanhe', 'Champagne', 'Champagner']),
  c('desert-sand', '#c7b08a', 'special', [S], ['Sable du désert', 'Desert sand', 'Areia do deserto', 'Sabbia del deserto', 'Wüstensand']),
  c('copper', '#b3622e', 'special', [M], ['Cuivre', 'Copper', 'Cobre', 'Rame', 'Kupfer']),
  c('bronze', '#7a5a3a', 'special', [M], ['Bronze', 'Bronze', 'Bronze', 'Bronzo', 'Bronze']),
];

export const DEFAULT_SELECTION = { vehicle: 'car', color: 'midnight-blue', finish: 'gloss', effect: 'solid' };
export const colorById = (id) => COLORS.find((x) => x.id === id) || COLORS.find((x) => x.id === DEFAULT_SELECTION.color);
