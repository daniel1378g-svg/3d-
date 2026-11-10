export const STR = {
  pt: {
    kicker: 'Piso 0 · Estudo prévio', tour: 'Visita guiada', tourStop: 'Parar visita', rooms: 'Divisões', overview: 'Maquete', walk: 'Andar', options: 'Opções',
    roomsTitle: 'Quadro de áreas', speed: 'Velocidade a andar', quality: 'Qualidade', qAuto: 'Automática', qHigh: 'Alta', qLow: 'Económica', language: 'Idioma',
    mouseLook: 'Olhar com o rato', fullscreen: 'Ecrã inteiro', howTo: 'Como andar', kMove: 'andar', kDrag: 'Arrastar — olhar em volta', kClick: 'Clicar ou tocar no chão — ir até lá',
    kRun: 'mais depressa', kDoors: 'As portas abrem ao aproximar',
    notice: 'Visualização 3D de estudo prévio · não é um documento oficial do projeto',
    introKicker: 'Planta geral · Piso 0 · Esc. 1/100',
    introLead: 'Percorra a proposta em 3D: refeitório de 80 lugares, copa, balneários feminino e masculino, salas de transição e zona de circulação, construídos a partir das cotas da planta.',
    fArea: 'Área bruta', fSeats: 'Refeitório', fLockers: 'Balneários', seats: 'lugares', loading: 'A carregar o modelo…', preparing: 'A preparar a luz…', ready: 'Pronto.',
    enter: 'Entrar', enterTour: 'Ver a visita guiada', introFine: 'Arraste para olhar, toque ou clique no chão para andar. No computador pode usar W A S D.',
    hintDesktop: 'Arraste para olhar · W A S D ou clique no chão para andar', hintTouch: 'Arraste para olhar · toque no chão para andar · canto inferior esquerdo: joystick',
    hintOverview: 'Arraste para rodar · roda do rato ou dois dedos para aproximar · toque numa divisão para entrar', hintLock: 'Esc para libertar o rato',
    exterior: 'Exterior', failed: 'Não foi possível carregar o modelo.', noWebgl: 'Este navegador não tem WebGL disponível.',
  },
  en: {
    kicker: 'Ground floor · Preliminary study', tour: 'Guided tour', tourStop: 'Stop tour', rooms: 'Rooms', overview: 'Model view', walk: 'Walk', options: 'Options',
    roomsTitle: 'Schedule of areas', speed: 'Walking speed', quality: 'Quality', qAuto: 'Automatic', qHigh: 'High', qLow: 'Economy', language: 'Language',
    mouseLook: 'Mouse look', fullscreen: 'Full screen', howTo: 'Getting around', kMove: 'walk', kDrag: 'Drag — look around', kClick: 'Click or tap the floor — walk there',
    kRun: 'faster', kDoors: 'Doors open as you approach',
    notice: '3D visualisation of a preliminary study · not an official project document',
    introKicker: 'General plan · Ground floor · Scale 1:100',
    introLead: 'Walk through the proposal in 3D: an 80-seat canteen, servery, women’s and men’s changing rooms, transition rooms and the circulation hall, built from the dimensions on the plan.',
    fArea: 'Gross area', fSeats: 'Canteen', fLockers: 'Changing rooms', seats: 'places', loading: 'Loading the model…', preparing: 'Preparing the lighting…', ready: 'Ready.',
    enter: 'Enter', enterTour: 'Watch the guided tour', introFine: 'Drag to look, tap or click the floor to walk. On a computer you can use W A S D.',
    hintDesktop: 'Drag to look · W A S D or click the floor to walk', hintTouch: 'Drag to look · tap the floor to walk · bottom-left corner: joystick',
    hintOverview: 'Drag to rotate · wheel or two fingers to zoom · tap a room to step inside', hintLock: 'Esc releases the mouse',
    exterior: 'Outside', failed: 'The model could not be loaded.', noWebgl: 'WebGL is not available in this browser.',
  },
};

// the plan's own room names stay in Portuguese; English gets a gloss next to them
export const ROOM_EN = {
  REF: 'Canteen', CIRC: 'Circulation hall', BALF: 'Women’s changing room', BALM: 'Men’s changing room', TRF: 'Transition room (women)', TRM: 'Transition room (men)',
  ANTE: 'Entrance airlock', ISMC: 'Accessible WC', TEC: 'Plant room', CORR: 'Staff corridor', VEST: 'Staff changing room', DESC: 'Food delivery',
  LIMPOS: 'Clean zone (servery)', SUJOS: 'Dishwashing', LIMPEZA: 'Cleaning store', TRAY: 'Tray return', EXC: 'Existing corridor', EXT: 'Outside',
};
export const NOTE_EN = { '80 lugares': '80 seats', '53 lugares': '53 places' };

export function pickLang() {
  try { const s = localStorage.getItem('rb3d.lang'); if (s && STR[s]) return s; } catch { /* storage may be blocked */ }
  return (navigator.language || 'pt').toLowerCase().startsWith('pt') ? 'pt' : 'en';
}
