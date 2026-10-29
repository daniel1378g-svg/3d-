# Le Portugais · proposta de redesign

**Pré-visualização:** https://claude.ai/artifact/FrYxTRmVJLb1nr4fYgoaQS
(a partilha gere-se no menu Partilhar da página)

É uma proposta. O site WordPress em leportugais.ch não foi tocado. O logótipo, as fotografias e os textos pertencem ao Le Portugais, por isso o site novo só vai para o ar com o acordo dos donos. Até lá, todas as páginas mostram a faixa fixa "Proposta de design · não é o site oficial".

Na pré-visualização, as páginas abrem-se pelo fim do endereço: `#fr`, `#fr-carte`, `#de-speisekarte`, `#pt-imprensa`, `#en-wines`… Sem nada, abre na língua do navegador (francês por defeito).

## Como correr e publicar

```bash
npm install
npm run dev              # http://127.0.0.1:5180/fr/
npm run build            # site estático em dist/ (35 páginas, sitemap, robots, _redirects)
npm run build:artifact   # a versão para a pré-visualização claude.ai, em artifact/
npm run count            # confere a carta e os vinhos com a cópia guardada do site atual
npm run content          # volta a extrair a carta e os vinhos de content/raw/
npm run images           # volta a gerar as imagens de public/ a partir de media/
```

- `VITE_FORM_ENDPOINT=https://formspree.io/f/xxxx` liga o formulário de contacto. Sem esta variável, o formulário fica em modo de teste: valida os campos mas não envia nada, e diz isso ao visitante.
- `VITE_PROPOSAL=0` tira a faixa de proposta. Só se usa quando os donos aprovarem.
- `dist/` funciona em qualquer alojamento estático. Cada endereço tem o seu HTML com título, descrição, `canonical`, `hreflang` e JSON-LD do restaurante. O ficheiro `_redirects` segue o formato da Netlify e da Cloudflare Pages.
- Pilha: React 19, Vite 6, TypeScript, Tailwind 4, Motion 12, GSAP ScrollTrigger, three.js, lottie-web, Radix (diálogo e separadores).

## O que está feito

**Em todo o site:**

- 5 línguas: francês (por defeito), inglês, português (pt-PT), italiano e alemão da Suíça (com "ss"). Cada página tem o seu endereço em cada língua (`/fr/carte`, `/en/menu`, `/pt/ementa`, `/it/menu`, `/de/speisekarte`…).
- O menu de idioma está no topo de todas as páginas, também nos telemóveis. Mudar de língua mostra o diapositivo de boas-vindas ("Bienvenue au Portugais", "Willkommen im Le Portugais"…), mantém o visitante no mesmo sítio da página, muda o endereço e o `<html lang>` e fica guardado.
- Introdução na primeira visita (uma vez por sessão, só quando a visita começa na página inicial): o logótipo num disco de linho, as letras LE PORTUGAIS, "Restaurant Marisqueira · 1973", e depois o logótipo voa para o cabeçalho enquanto o arco do hero se abre. Pode saltar-se com o botão, Esc ou um clique.
- Cabeçalho em pílula de vidro, com a secção atual marcada. Gaveta "Réserver" com os dois telefones, o e-mail, os dias de fecho e o seletor de pessoas.
- Com `prefers-reduced-motion`, as cenas de scroll ficam estáticas, sem introdução e sem o mar animado, e as mudanças de língua só fazem um fade.

**Página inicial, por esta ordem:**

1. Hero: "Le meilleur bacalhau de Genève" nos lados de um arco com o Atlântico ao pôr do sol em WebGL. O ponteiro ou o dedo fazem ondas na água. Há botão de pausa.
2. A história de 1973 (cena fixa): o arco cresce até o mar encher o ecrã, "1973" conta a partir de 1900 e afasta-se, e os textos da página atual aparecem como 3 legendas numeradas, com a assinatura José & Sotera Martins a escrever-se. Acaba na frase do sem glúten e nos botões.
3. Quatro pratos do mar (folha que sobe sobre o mar): Peixes grelhados, Bacalhau assado, Polvo e Gambas, cada um com a sua foto, a descrição e o preço da carta. O tentáculo enrola-se sobre o Polvo.
4. Faixa do logótipo: a velocidade segue o scroll e inverte com a direção; tem pausa.
5. 3 plats du jour: Viande, Poisson, Vegan a 25.-, com o selo "fermé" ao domingo e à segunda.
6. La carte: as 4 secções com as contagens (7 · 8 · 11 · 9), colagem de fotos e o selo sem glúten a rodar.
7. Sur commande · 72 h: os 11 pratos e o planeador de 72 horas (ver as decisões).
8. A frase da fundação em letras enormes, que acendem palavra a palavra; um bacalhau atravessa a secção.
9. La cave: o mapa de Portugal com as 9 regiões e a Champagne, tinto/rosé/branco, pesquisa e as fichas dos vinhos. A base de copo em cortiça com o logótipo roda ao arrastar ou com as setas.
10. Réserver: os dois telefones, o e-mail, os dias de fecho e "Combien êtes-vous ?". De 1 a 19 pessoas, mesa e botões de chamada; a partir de 20, o texto dos grupos e do forfait.
11. Services: take-away, traiteur, venda e entrega de vinhos e portos, com ícones animados (Lottie) e botões ligar/e-mail.
12. Galerie: faixa horizontal fixa no computador, deslizar no telemóvel, lightbox e "Voir en grille".
13. Presse: a parede de recortes com pioneses e a última notícia ao lado.
14. Contact: "Ouvert aujourd'hui" / "Fermé aujourd'hui" na hora de Genebra, morada, mapas, telefones, transportes em separadores, mapa Google só depois do clique e formulário.
15. Rodapé com os 6 links, Facebook e o copyright atual.

**Outras páginas:** carte (pesquisa sem acentos, separadores fixos que acompanham o scroll, "Planifier (72 h)" em cada prato sur commande), vins (contagens, mapa, lista completa por cor e região, nota de rodapé), galerie (salle, plats, banquets), presse (os 10 artigos), actualités (os 6 textos de 2016–2021) e contact.

## Verificações (no build de produção)

- **Contagens** (`npm run count`): 4 secções e 35 pratos (7 + 8 + 11 + 9), todos os preços presentes; 43 vinhos em 14 grupos regionais (26 tintos, 3 rosés, 14 brancos), todos com o grau; descrições nas 5 línguas para os 35 pratos.
- **Lighthouse, telemóvel** (Chrome sem GPU, rede e CPU simuladas):

  | Página | Desempenho | Acessibilidade | Boas práticas | SEO |
  |---|---|---|---|---|
  | /fr/ | 85 | 100 | 100 | 100 |
  | /fr/carte | 86 | 100 | 100 | 100 |
  | /de/galerie | 85 | 100 | 100 | 100 |
  | /pt/imprensa | 88 | 100 | 100 | 100 |
  | /en/wines | 96 | 100 | 100 | 100 |
  | /it/contact | 87 | 100 | 100 | 100 |

  O que ainda pesa: as páginas são desenhadas no navegador. O LCP (2,4–4,1 s) espera pelo JavaScript principal: 143 KB comprimidos, com o React, o Motion e os textos das 5 línguas. O próximo passo seria pré-gerar o HTML de cada página no build. O mar em WebGL, o GSAP e o Lottie só carregam depois da primeira pintura. Os números variam cerca de ±3 pontos entre corridas.
- Larguras 375, 390, 768, 1280, 1440 e 1920 sem scroll horizontal. As 5 línguas foram percorridas à procura de texto francês esquecido.
- Teclado: link para saltar ao conteúdo, menu de idioma com setas e Esc, gaveta e lightbox devolvem o foco, seletor de pessoas com setas, calendário do planeador com setas e Enter, base de cortiça com setas.
- Sem erros na consola. O mar continua a mexer mesmo num computador lento (ver as decisões).

**Capturas de ecrã:** `docs/screenshots/1440/` e `docs/screenshots/390/`: cada secção da página inicial (o hero e os quatro pratos em 4 momentos do scroll), la carte e les vins.

## O que ficou de fora e decisões tomadas

**Ferramentas:**

- `/design-taste-frontend` não existe nesta sessão. O `/21st-ui` precisa do servidor da 21st.dev, que não estava ligado (sem chave). Os componentes de interface seguem o estilo shadcn sobre Radix.
- Os ícones animados usam lottie-web com JSON feito à mão. O dotLottie precisa de WebAssembly, que a pré-visualização claude.ai bloqueia.

**Desenho:**

- O coral do brief (`#B8432C`) passou para o vermelho do logótipo, `#A22E1E`, com o mesmo contraste com o branco.
- O Polvo e as Gambas não têm foto na galeria atual: mostram uma ilustração e um espaço "Photo : …" para quando houver foto.
- O mar: primeiro aparece uma imagem fixa tirada do próprio shader, e depois a animação. Se o computador for lento, a água baixa de resolução e de cadência, mas nunca para. Sem placa gráfica (renderização por software) fica a imagem fixa. `?gl=1` força a animação para testes.

**Conteúdo:**

- Todos os textos, preços e contactos estão como no site atual. As traduções mudam a língua, nunca os factos.
- A única correção: "marché" passou a "marche" na linha do elétrico 12 e 18 (6 minutos a pé), como pedia o brief.
- A frase do hero ficou tal e qual, incluindo o espaço antes do ponto em "plats du jour .".
- Os nomes dos pratos mantêm a grafia do site ("Estaçao", "Feijao", "Camarao", "Braz") até os donos decidirem.
- "la boule" passou a preço por bola e "dès" a "desde": o número ficou o mesmo.
- "Culture biodynamique" e "mousseux" estavam colados aos nomes dos vinhos: passaram a etiquetas na ficha, sem mudar o nome.
- A frase inglesa da página atual ("ver a página francesa para o peixe da semana") ficou em espírito: "Welcome! Ask us which fresh fish we have this week.", só em inglês.
- Sem horário: só os dias de fecho. "Ouvert aujourd'hui" vem apenas de terça a sábado.
- Os links do Google+ saíram (o Google+ fechou em 2019).
- `/` leva à língua guardada, senão à do navegador, senão a `/fr/`.

**Comportamento:**

- **Regra das 72 horas:** conta em dias de calendário. O pedido tem de chegar 3 dias antes da visita; se esse dia for domingo ou segunda, recua até ao último dia aberto (sábado). Exemplos: visita terça → pedir até sábado; quarta → sábado; quinta → sábado; sexta → terça. Domingos e segundas não se podem escolher, e um dia só se oferece se a data-limite ainda não passou (hora de Genebra). O planeador abre um e-mail já preenchido com o prato e a data.
- O mapa do Google só carrega depois do clique (privacidade). Na pré-visualização claude.ai não se pode embutir outros sites, por isso aparece um link.
- **Formulário:** compatível com o Formspree (`VITE_FORM_ENDPOINT`), com campo-isco escondido e tempo mínimo de preenchimento no lugar do captcha. Na pré-visualização está em modo de teste. Para enviar para leportugais@bluewin.ch é preciso o acordo dos donos e uma conta Formspree (ou o serviço de formulários do alojamento escolhido).

**Fotos e recortes:**

- As 24 fotos do site atual estão todas usadas, com texto alternativo nas 5 línguas.
- Os recortes foram feitos só a partir dessas fotos:

  | Recorte | Foto de origem |
  |---|---|
  | peixes | restaurant-de-poisson-geneve |
  | mariscos | poisson-arrivage-journalier-geneve |
  | tomates | poisson-arrivage-journalier-geneve |
  | polvo | restaurant-specialites-de-la-mer-geneve |
  | travessa | specialites-fruits-de-mer-plainpalais |
  | batatas | plats-du-jour-plainpalais |
  | feijao | restaurant-plats-du-jour-plainpalais-1 |

- **Pares prato-foto** (só onde o prato se vê; a confirmar pelos donos):

  | Prato | Foto |
  |---|---|
  | Bacalhau assado na grelha | plats-du-jour-plainpalais |
  | Filetes de polvo grelhados | fruits-de-mer-plainpalais-geneve, restaurant-specialites-de-la-mer-geneve |
  | Peixes grelhados segundo as chegadas | restaurant-de-poisson-geneve (peixe cru das chegadas) |
  | Travessa de degustação para dois | specialites-fruits-de-mer-plainpalais |
  | Sortido de sobremesas caseiras | restaurant-plainpalais |

**O que não consegui ler no site atual:**

- 4 recortes de imprensa (envios de 2016/03) dão erro 404: Guide des 100 Bistrots 2, Hebdo – Manger chi…, HEBDO e L'eau à la bouche. Na página Presse dizem que a digitalização falta.
- A imagem da notícia das sardinhas (RTS, 23 de maio de 2016) dá 404.
- `/en/dishes/` e `/en/contact/` não carregam.
- O Wayback Machine estava bloqueado, por isso não consegui recuperar as imagens em falta.
- Títulos copiados tal e qual, mas que parecem gralhas: "Manger chi pour moins de CHF100.-" (chic?) e "Guide des 100 Bistrots 2" (o "2" vem do endereço?).

## Perguntas em aberto para os donos

- **Horário:** a que horas abre ao almoço e ao jantar? O site só diz que fecha ao domingo e à segunda.
- **Telefones:** qual é o número principal para reservas, o 022 ou o 079?
- **Plats du jour:** continuam a 25.-, todos os dias abertos ao almoço? Podem publicar-se os três pratos de cada semana?
- **Peixe grelhado:** a "proposition de saison" dos Peixes grelhados pode ir para o site?
- **Grafia:** os nomes dos pratos mantêm a grafia atual ou levam os acentos do português padrão?
- **Moeda:** os preços devem dizer CHF?
- **Vinhos:** a lista deve mostrar preços? Está atualizada?
- **Reservas online:** querem, ou só telefone e e-mail?
- **Imprensa:** manter os artigos de 2016? Há uma menção mais recente no GaultMillau ou noutro guia?
- **Notícias:** manter o arquivo de 2016–2021 ou começar de novo?
- **Fotos:** há fotos mais recentes ou maiores? Os pratos podem ser recortados? Que prato está em que foto?
- **Logótipo:** há uma versão vetorial (SVG)?
- **Revisão:** quem revê os textos em inglês, português, italiano e alemão?
- **Endereços antigos:** redirecionar todos como na tabela abaixo?

## Redirecionamentos (301, para quando o site novo substituir o WordPress)

Já estão em `dist/_redirects`, com e sem a barra final.

| Endereço antigo | Endereço novo |
|---|---|
| / | /fr/ (ou a língua guardada / do navegador) |
| /cusine-gastronomique-portugaise-geneve/ | /fr/carte |
| /restaurant-de-poisson-geneve/ | /fr/vins |
| /meilleur-bacalhau-geneve/ | /fr/#reservation |
| /meilleur-restaurant-portugais-geneve/ | /fr/presse |
| /restaurant-portugais-fruits-de-mer-geneve/ | /fr/galerie |
| /restaurant-plainpalais/ | /fr/actualites |
| /restaurant-specialites-portugaise-plainpalais/ | /fr/#contact (os links passam para o rodapé) |
| /plats-du-jour-plainpalais-geneve/ | /fr/contact |
| /tribune-de-geneve-plainpalais-2/ | /fr/presse#tribune-de-geneve-plainpalais |
| /tribune-de-geneve-plainpalais-2-2/ | /fr/presse#tribune-de-geneve-plainpalais-2 |
| /article-portugais/ | /fr/presse#article-portugais |
| /fines-gueules/ | /fr/presse#fines-gueules |
| /gault-millau-suisse/ | /fr/presse#gault-millau-suisse |
| /guide-des-100-bistrots-2/ | /fr/presse#guide-des-100-bistrots |
| /hebdo-manger-chi-pour-moins-de-chf100-a-geneve/ | /fr/presse#hebdo-manger-chi |
| /hebdo/ | /fr/presse#hebdo |
| /leau-a-la-bouche/ | /fr/presse#leau-a-la-bouche |
| /les-meilleures-adresses-exotiques-de-geneve/ | /fr/presse#les-meilleures-adresses-exotiques |
| /en/homepage-english/ | /en/ |
| /en/dishes/ | /en/menu |
| /en/best-bacalhau-geneva/ | /en/#reservation |
| /en/best-restaurant-portuguese-geneva/ | /en/press |
| /en/restaurant-portuguese-sea-fruits-geneva/ | /en/gallery |
| /en/restaurant-plainpalais-geneva/ | /en/news |
| /en/daily-specials-plainpalais-geneva/ | /en/contact |
| /en/restaurant-portuguese-centre/ | /en/ |

## Revisão das traduções

O francês é o do site. O inglês, o português, o italiano e o alemão foram escritos para esta proposta e precisam de ser revistos por falantes nativos antes de o site ir para o ar.
