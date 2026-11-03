// Rebuilt pages: original public URL → content file → built file inside dist/.
// Built pages live in dist/pages/ (not in a physical /krouzky/ folder) so they never shadow Joomla's
// own routes such as /krouzky. The web server maps the URL to the file (see deploy/apache-rewrite.conf).
export const pages = [
  {
    path: "/krouzky/atleticka-pripravka",
    content: "content/pages/atleticka-pripravka.json",
    file: "pages/krouzky-atleticka-pripravka.html",
  },
];
