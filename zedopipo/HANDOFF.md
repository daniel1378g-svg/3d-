# Zé-do-Pipo · proposta de redesign

**Pré-visualização:** https://claude.ai/artifact/6NXTtuvGGsR1DmK63FG92E
(privada; abre-se pelo menu Partilhar para a mostrar a alguém)

É uma proposta. O site WordPress em zedopipo.ch não foi tocado. O logótipo, as fotografias e os textos pertencem ao Zé-do-Pipo, por isso o site novo só vai para o ar com o acordo dos donos. Até lá, todas as páginas mostram a faixa fixa "Proposta de design · não é o site oficial".

## Como correr e publicar

```bash
npm install
npm run dev              # http://localhost:5173/fr/
npm run build            # site estático em dist/ (10 páginas, sitemap, robots, _redirects)
npm run build:artifact   # a versão para a pré-visualização claude.ai, em artifact/
npm run count            # confere a ementa com a cópia guardada do site atual
```

- `VITE_FORM_ENDPOINT=https://formspree.io/f/xxxx` liga o formulário de contacto. Sem esta variável, o formulário fica em modo de teste: valida os campos mas não envia nada, e diz isso ao visitante.
- `VITE_PROPOSAL=0` tira a faixa de proposta. Só se usa quando os donos aprovarem.
- `dist/` funciona em qualquer alojamento estático. O ficheiro `_redirects` segue o formato da Netlify e da Cloudflare Pages.

## O que está feito

**Página inicial, por esta ordem:**

1. Cabeçalho com Infos, Menu, Réservation (abre a gaveta), Livraison, idioma e Appeler; encolhe ao fazer scroll.
2. Hero Mar | Terra em WebGL: de um lado, a água do Atlântico com cáusticas; do outro, brasas com grelha e faúlhas.
   - O divisor arrasta-se pelo logótipo num disco de linho. É um slider acessível: ← →, Home, End.
   - O ponteiro faz ondas na água e atiça as brasas.
   - Os pratos sobem e flutuam, cada um do seu lado.
   - Os 2 diapositivos do site atual aparecem letra a letra, avançam a cada 6 s e aceitam swipe; há botão de pausa e anterior/seguinte.
3. Escolha de idioma: 5 botões grandes que viram para mostrar "bem-vindo" nessa língua.
4. Faixa do logótipo: a velocidade segue o scroll e inverte com a direção; tem botão de pausa.
5. Notre menu: 3 cartões que inclinam com o rato, a frase JUST EAT e "Voir le menu complet".
6. Plat du jour: a semana de segunda a domingo com o dia de hoje marcado (hora de Genebra), mais as sugestões desde CHF 20.
7. Réservation de groupe: o texto atual e um cartão de pedido (tipo, número de pessoas, data, mesa com cadeiras que aparecem). Envia pelo formulário de contacto, já preenchido.
8. Notre histoire (`#a-propos`):
   - as palavras acendem com o scroll;
   - o ano conta até 1989;
   - a assinatura Maria & José escreve-se;
   - a moeda 3D com o logótipo roda ao arrastar, com as setas ou com o botão.
9. Galerie: parede infinita com as 31 fotos, que se atira com inércia. Tem lightbox (← →, Esc, swipe) e "Afficher en grille".
10. Réserver et commander: 3 botões magnéticos.
    - Reservar abre a gaveta MyLocalina, que só carrega ao abrir e tem link para novo separador.
    - Entregas abre a eat.ch num novo separador.
    - Ligar.
11. Contact et horaires:
    - selo ao vivo "Ouvert · ferme dans 35 min" / "Fermé · ouvre à 19:00";
    - morada, telefone com botão copiar e horário;
    - mapa Google só depois do clique;
    - formulário;
    - Instagram e Facebook.
12. Rodapé "© Zédopipo 2021".

**Página da ementa:**

- Faixa "Bienvenue chez Zé-do-Pipo".
- Filtro Tout / Mar / Terra com animação de layout.
- Separadores fixos com sublinhado que desliza e acompanha o scroll.
- Pesquisa instantânea nas 5 línguas, sem acentos (por exemplo "polvo" ou "octopus").
- Foto que segue o cursor no computador; toque para abrir o prato e ver a foto.
- 3 fotos por secção, as notas (½ frango, preço por pessoa…), piri piri com faúlhas e botões Reservar/Entregas.

**Em todo o site:**

- Diapositivo de boas-vindas a cada troca de idioma: painel de linho, logótipo, palavra e frase na língua nova, cerca de 1,7 s.
- Na primeira visita, uma versão de cerca de 1,1 s. Ambas saltam-se com clique ou Esc e, com movimento reduzido, passam a um fade.
- Cursor que segue o rato, só no computador.

## Verificações (no build de produção)

| Verificação | Resultado |
|---|---|
| Ementa | 7 secções, 44 pratos, os mesmos nomes e preços pela mesma ordem (`npm run count`) |
| Fotos | as 31 do site, todas na galeria, com texto alternativo nas 5 línguas |
| Lighthouse (telemóvel) | página inicial: desempenho 86–89, acessibilidade 100, boas práticas 100, SEO 100 |
| | ementa: desempenho 93, acessibilidade 100, boas práticas 100, SEO 100 |
| 375 px | sem scroll horizontal nas 10 páginas (5 línguas × 2 páginas) |
| Movimento reduzido | diaporama e faixa parados até "Reprendre"; boas-vindas em fade; sem WebGL animado |
| Teclado | ordem de tabulação lógica; slider, moeda, parede, lightbox e gaveta funcionam com teclas; o foco fica preso na gaveta e no lightbox e volta ao fechar |
| Consola | sem erros |
| WebGL | 2 cenas no máximo (hero e moeda), carregadas depois da primeira pintura, DPR ≤ 1,5, pausadas fora do ecrã |

**O que pode afetar os números:** o Lighthouse corre num Chrome sem GPU. Nesse caso, e em qualquer aparelho sem GPU, o site não carrega o three.js e mostra o fundo em CSS, que também segue o divisor. Os números acima são desse caminho. Num telemóvel com GPU o WebGL carrega depois da primeira pintura e não mexe no LCP. A variação entre corridas é de cerca de ±3 pontos.

## O que ficou de fora e decisões tomadas

Da lista de cortes (cursor, faúlhas, moeda, parede, shader das brasas, cadeiras) não foi preciso cortar nada.

**Ferramentas:**

- **Componentes**: não usei shadcn/ui nem a 21st.dev, porque o MCP da 21st.dev pede uma chave API que esta sessão não tem. Os componentes foram feitos à medida.
- **Ícones animados**: em vez de ficheiros dotLottie, os ícones são animações Lottie desenhadas aqui, recoloridas com a paleta e tocadas com o lottie-web light:
  - chama, peixe, grelha, copo de vinho, relógio, telefone, pin, scooter, calendário.
- **Moeda**: feita em three.js, sem Spline.
- **Traduções**: um dicionário tipado, sem i18next.

**Conteúdo:**

- **Preços**: aparecem como "CHF 39.50" em todas as línguas (no site atual: "CHF 39,50 .-"). O valor é o mesmo; `livePrice` guarda o texto original.
- **Domingo**: aparece como fechado, porque o site diz "du lundi au samedi" e não fala do domingo.
- **Diapositivos**: o 1 ("Une cuisine généreuse et populaire") inclina o divisor para a Terra e o 2 ("Un voyage culinaire entre mer et terre") para o Mar.
  - Em EN e PT, o texto do 1 vem da frase que os donos usam na ementa para o plat du jour.
  - O título e o texto do 2 foram traduzidos.
- **Títulos**: o título principal é "ZÉ-DO-PIPO." (com ponto, como no briefing; no HTML atual o ponto não aparece).
- **Textos verbatim e traduções**:
  - A história em FR, EN e PT é a dos donos, letra a letra (incluindo "Zé-do-pipo").
  - As descrições da ementa em FR, EN e PT também são as originais; faltavam 3 e foram acrescentadas: Amêijoas em PT, Spaghettis em FR e Leite creme em EN.
  - Tudo em IT e DE é tradução minha.
- **Fotografias**: são 31, porque às 27 do briefing juntei 2 fundos do hero e 2 faixas de sala que as páginas atuais também usam. Ficou de fora a foto de grupo da Pixabay, que não é do restaurante.
- **Morada**: "Rue de Lausanne 57, 1202 Genève, Suisse", como no rodapé atual.

**Comportamento:**

- **Filtro Mar/Terra**: cada prato tem uma etiqueta mar, terra, ambos ou nenhuma (`content/menu.json`).
  - "Mar" mostra mar e ambos; "Terra" mostra terra e ambos.
  - Saladas sem peixe nem carne, sobremesas, queijo e sopa só aparecem em "Tout".
- **Pedido de grupo**: não envia nada sozinho. Preenche a mensagem do formulário de contacto e leva o visitante até lá, para haver um único canal.
- **Primeira visita**: o painel de boas-vindas já está no ecrã na primeira pintura e depois abre como uma cortina. Assim, o LCP não espera pela animação.
- **Pré-visualização claude.ai**: não pode embutir outros sites. Lá, a gaveta de reservas e o mapa mostram uma nota e o link para novo separador; no site publicado aparecem embutidos.

## Perguntas em aberto para os donos

1. **Formulário**: para que email devem ir as mensagens? Com o endereço, liga-se um serviço como Formspree, Basin ou Getform (qualquer endpoint compatível com Formspree serve) através de `VITE_FORM_ENDPOINT`.
2. **Domingo**: está fechado? Se abrir, muda `src/hours.ts` e o JSON-LD em `src/seo.ts`.
3. **Logótipo**: há uma versão vetorial (SVG)? O atual é um PNG de 512 px.
4. **Fotos**: há fotografias maiores dos pratos (as atuais têm 500 px) e autorização para usar fotos do Instagram?
5. **Copyright**: manter "© Zédopipo 2021" ou atualizar o ano?
6. **IT e DE**: um falante nativo deve rever todos os textos em italiano e alemão (interface, história, descrições da ementa) antes de publicar. O PT é de Portugal (pt-PT) e o DE usa a grafia suíça (de-CH, "ss").
7. **Grupos**: há um número mínimo de pessoas para reserva de grupo?

## Redirecionamentos (para quando o site novo substituir o WordPress)

| Antigo | Novo |
|---|---|
| `/` | `/fr/` (ou a língua guardada / do navegador; sem JavaScript vai para `/fr/`) |
| `/menu`, `/menu/` | `/fr/menu` (301) |
| `/#a-propos` | mantém-se: a secção da história continua com `id="a-propos"` |

**Endereços novos:**

| Página | FR | EN | PT | IT | DE |
|---|---|---|---|---|---|
| Início | `/fr/` | `/en/` | `/pt/` | `/it/` | `/de/` |
| Ementa | `/fr/menu` | `/en/menu` | `/pt/ementa` | `/it/menu` | `/de/speisekarte` |

Cada página tem o seu `<html lang>` (fr, en, pt-PT, it, de-CH), título, descrição, canonical, hreflang e o JSON-LD Restaurant:

- horário: Mo-Sa 12:00-14:00 e 19:00-22:30;
- `acceptsReservations`: MyLocalina;
- `foundingDate`: 1989;
- `sameAs`: Instagram e Facebook.

## Privacidade

Nada da Google nem da MyLocalina carrega antes de um clique: o mapa só aparece depois de "Afficher la carte" e o módulo de reservas só quando a gaveta abre. As fontes vêm do Google Fonts; se os donos preferirem, podem passar a ser servidas pelo próprio site.
