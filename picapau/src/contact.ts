// Contact details and links, exactly as the live site gives them.
export const CONTACT = {
  name: "Pica Pau",
  street: "Rue Hugo-de-Senger 3",
  postcode: "1205",
  town: "Genève",
  phoneDisplay: "022 321 60 60",
  phoneHref: "tel:+41223216060",
  phoneIntl: "+41 22 321 60 60",
  facebook: "https://www.facebook.com/p/Pica-Pau-61561834623205/",
  instagram: "https://www.instagram.com/picapauge/",
  /** The TheFork booking widget the live Réserver section embeds. */
  booking: "https://widget.thefork.com/a9bb2546-0ace-42d0-9a9f-aea31c830868?theme=dark&background=dark",
  /** The Facebook page plugin the live "Les plats du jour" dialog embeds. */
  facebookPlugin:
    "https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fp%2FPica-Pau-61561834623205%2F&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=true&show_facepile=false",
  maps: {
    google: "https://www.google.com/maps/search/?api=1&query=Rue%20Hugo-de-Senger%203%2C%201205%20Gen%C3%A8ve",
    apple: "https://maps.apple.com/?address=Rue%20Hugo-de-Senger%203,%201205%20Gen%C3%A8ve",
    waze: "https://waze.com/ul?q=Rue%20Hugo-de-Senger%203%2C%201205%20Gen%C3%A8ve",
  },
  /** 1 € = 0.90 CHF in cash, so a bill in CHF is CHF ÷ 0.90 in euros. */
  euroRate: 0.9,
} as const;
