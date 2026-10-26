// Every text and link below comes from https://amerendeira.pt/ (survey of 26/10/2026, see
// docs/content-inventory.md). Nothing here is invented: no prices, hours, reviews or services.
// The only editorial changes are listed in the inventory (stray "t" in Menu Bebida, wrong
// hero button target, swapped press images).

export const brand = {
  name: "A Merendeira",
  tagline: "Pão com chouriço feito à moda antiga. Com forno a lenha e alma portuguesa. Milhares de clientes felizes.",
  sideNote: ["O pão com chouriço", "é rei e a tradição", "é servida quente."],
  statement:
    "A Merendeira celebra a tradição portuguesa com o autêntico pão com chouriço, assado em fornos a lenha. Com foco na qualidade e na cultura gastronómica, preservamos o sabor da tradição para o prazer das pessoas e a riqueza da nossa herança.",
  stats: [
    { value: "2", label: "Localizações" },
    { value: "36", label: "Anos a servir" },
  ],
} as const;

// Captions of the scroll film. Each one reuses a phrase of the original site and is shown only
// while the matching action is on screen (see src/lib/videoTimeline.ts).
export const filmChapters = [
  { id: "massa", label: "Massa", text: "Feito à moda antiga." },
  { id: "chourico", label: "Chouriço", text: "O pão com chouriço é rei." },
  { id: "forno", label: "Forno", text: "Assado em forno a lenha." },
  { id: "quente", label: "Quente", text: "E a tradição é servida quente." },
] as const;

export const nav = [
  { label: "Lojas", href: "#Lojas" },
  { label: "Menus", href: "#menus" },
  { label: "Notícias", href: "#Media" },
  { label: "Contactos", href: "#contact" },
] as const;

export const contact = {
  phone: { label: "+351 21 397 2726", href: "tel:+351213972726" },
  email: { label: "geral@amerendeira.pt", href: "mailto:geral@amerendeira.pt" },
  instagram: { label: "Instagram", href: "https://www.instagram.com/amerendeira.pt/" },
  facebook: { label: "Facebook", href: "https://www.facebook.com/AMerendeira/" },
} as const;

export const stores = [
  {
    id: "lisboa",
    city: "Lisboa",
    address: ["Av. 24 de Julho 54,", "1200-657 Lisboa"],
    map: "https://maps.app.goo.gl/YGrR9Q1cRhXgSeTN6",
    image: "loja-lisboa",
  },
  {
    id: "costa-da-caparica",
    city: "Costa da Caparica",
    address: ["R. dos Pescadores 20,", "2825-386 Costa da Caparica"],
    map: "https://maps.app.goo.gl/L7vDcLWHxvQPhHgB8",
    image: "loja-caparica",
  },
] as const;

export const experience = {
  title: ["Experiência", "e ambiente"],
  text: "Mais do que uma refeição, visitar a Merendeira é uma celebração da mesa portuguesa. Do crepitar da lenha no forno ao cheiro inconfundível do pão acabado de sair, tudo convida a abrandar e saborear.",
} as const;

export const flavour = {
  title: ["O sabor", "em imagens"],
  text: "Conhece o nosso espaço, os nossos pratos e os momentos especiais partilhados à volta da mesa. Cada imagem, uma história de sabor.",
  cta: { label: "Conhece os menus", href: "#menus" },
} as const;

export const menusIntro = {
  eyebrow: "Produtos",
  title: "Os nossos menus",
  note: "Todos os nossos produtos são confecionados com base na sua receita original de 1972",
} as const;

export const menus = [
  {
    id: "menu-bebida",
    number: "01",
    name: "Menu Bebida",
    image: "menu-bebida",
    // Original ends with a stray "t" ("…sabor caseiro.t"); removed, nothing else changed.
    text: "Simples, direto e delicioso. Um pão com chouriço estaladiço, assado no nosso forno a lenha, servido com a tua bebida favorita, seja uma cerveja fresca, refrigerante ou água. Ideal para uma pausa rápida com sabor caseiro.",
  },
  {
    id: "menu-duo",
    number: "02",
    name: "Menu Duo",
    image: "menu-duo",
    text: "Dois clássicos que falam por si. O nosso pão com chouriço junta-se ao caldo verde, com aquele toque de chouriço que aquece. Uma bebida para refrescar e está feito: simples, português e reconfortante.",
  },
  {
    id: "menu-merendeira",
    number: "03",
    name: "Menu Merendeira",
    image: "menu-merendeira",
    text: "Um menu completo para quem quer saborear tudo. Pão com chouriço assado em forno de lenha, caldo verde à moda antiga, uma taça de arroz doce, café expresso e bebida à escolha. Perfeito para almoços ou jantares cheios de sabor e memória.",
  },
  {
    id: "menu-sopa",
    number: "04",
    name: "Menu Sopa",
    image: "menu-sopa",
    text: "Uma opção mais leve. Pão estaladiço assado no forno a lenha, acompanhado por uma sopa à tua escolha. Simples, nutritivo e cheio de sabor. Ideal para quem prefere alternativas mais completas.",
  },
] as const;

// "O que dizem sobre nós". Types are the original labels; article titles were read on the
// destination pages during the survey (Tripadvisor and Yelp block automated browsers).
export const press = {
  title: "O que dizem sobre nós",
  groups: [
    {
      id: "imprensa",
      label: "Na imprensa",
      items: [
        {
          number: "01",
          type: "Notícia",
          name: "NiT",
          detail: "Onde comer pão com chouriço quente de madrugada em Lisboa",
          href: "https://www.nit.pt/comida/10-07-2016-onde-comer-pao-com-chourico-de-madrugada-em-lisboa/attachment/1981",
        },
        {
          number: "02",
          type: "Notícia",
          name: "El País",
          detail: "Seis tascas autênticas para comer com gosto e barato em Lisboa",
          href: "https://brasil.elpais.com/brasil/2018/01/04/elviajero/1515072432_714377.html",
        },
      ],
    },
    {
      id: "recomendacoes",
      label: "Recomendações",
      items: [
        {
          number: "03",
          type: "Recomendação",
          name: "Tripadvisor",
          detail: null,
          href: "https://www.tripadvisor.pt/Restaurant_Review-g189158-d5977644-Reviews-A_Merendeira-Lisbon_Lisbon_District_Central_Portugal.html",
        },
        { number: "04", type: "Recomendação", name: "Yelp", detail: null, href: "https://www.yelp.com/biz/a-merendeira-lisboa" },
        {
          number: "05",
          type: "Recomendação",
          name: "Guia da Cidade",
          detail: null,
          href: "https://www.guiadacidade.pt/pt/r/restaurante-a-merendeira-28728",
        },
      ],
    },
  ],
} as const;

export const gallery = {
  eyebrow: "Galeria",
  title: ["Galeria", "de sabores"],
  hint: "Abre uma fotografia para a ver em grande.",
  images: [
    "galeria-letreiro",
    "galeria-maos-paes",
    "galeria-caldo",
    "galeria-preparacao",
    "galeria-forno",
    "mesa-composta",
  ],
} as const;

export const footer = {
  links: [
    { label: "Lojas", href: "#Lojas" },
    { label: "Menus", href: "#menus" },
    { label: "Media", href: "#Media" },
  ],
  copyright: "©A Merendeira",
  // No privacy page exists on the original site (the link points to "#"). Kept as text and
  // flagged in docs/content-inventory.md until the document is supplied.
  privacy: "Política de Privacidade",
  credit: { label: "Site original por Flowwwzy", href: "https://www.lukas-rudrof.de" },
} as const;

// Interface text (Portuguese). The English version of everything lives in site.en.ts.
export const ui = {
  skip: "Saltar para o conteúdo",
  logoAria: "A Merendeira — voltar ao início",
  navAria: "Principal",
  menu: "Menu",
  close: "Fechar",
  langSwitch: "EN",
  langSwitchAria: "Ver o site em inglês",
  contacts: "Contactos",
  shops: "Lojas",
  mapNewTab: " — ver no mapa (abre num novo separador)",
  newTab: " (abre num novo separador)",
  seeMenus: "Ver menus",
  findShop: "Encontrar uma loja",
  scroll: "Desce",
  scrollSr: "para a história da Merendeira",
  coverAlt: "Massa de pão crua sobre fundo claro, antes de ir ao forno",
  finalAlt: "Pão com chouriço acabado de cozer, dourado, com o chouriço à vista e vapor a subir",
  filmAria: "Vídeo controlado pelo scroll: a massa cresce, abre-se e mostra o chouriço, a crosta doura e o pão sai a fumegar.",
  watchVideo: "Ver o vídeo (8 s, sem som)",
  closeVideo: "Fechar o vídeo",
  whereWeAre: "Onde estamos",
  ourShops: ["As nossas", "lojas"],
  mapShortcuts: "Atalhos para os mapas",
  seeOnMap: "Ver no mapa",
  flavourEyebrow: "O sabor",
  pressEyebrow: "Notícias",
  welcomeAria: "Hospitalidade",
  welcome: ["Milhares de", "clientes felizes."],
  footerAria: "Rodapé",
  footerSite: "Site",
  footerSocial: "Redes sociais",
  footerBack: "Voltar",
  backToTop: "Voltar ao topo",
  jumpAria: "Ir para um menu",
  galleryOpen: "Ver em grande: ",
  galleryDialog: "Fotografia em grande",
  galleryPrev: "Fotografia anterior",
  galleryNext: "Fotografia seguinte",
  proposal: "Proposta de design · não é o site oficial da A Merendeira",
};

// The drawn titles are Portuguese drawings; in English they are set as text.
export const drawnText = { hero: "é boa nas horas", menus: "os nossos menus", contact: "fala connosco" };

export const pt = { brand, filmChapters, nav, contact, stores, experience, flavour, menusIntro, menus, press, gallery, footer, ui, drawnText };

type Widen<T> = T extends string ? string : T extends readonly (infer U)[] ? readonly Widen<U>[] : T extends object ? { readonly [K in keyof T]: Widen<T[K]> } : T;
export type Content = Widen<typeof pt>;
