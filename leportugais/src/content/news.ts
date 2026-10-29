// The six posts of the live blog (https://www.leportugais.ch/restaurant-plainpalais/), verbatim in French,
// with their dates, images and links, and translated into the four other languages.
import type { L, Lang } from "@/i18n";
import { asset } from "@/lib/utils";

type Para = Record<Lang, string>;
export type Post = {
  id: string;
  date: string;
  dateline: L;
  paras: Para[];
  links: string[];
  image?: { src: string; w: number; h: number; alt: L; href?: string };
  /** an image of the live post that is no longer on the server */
  missingImage?: string;
};
const p = (fr: string, en: string, pt: string, it: string, de: string): Para => ({ fr, en, pt, it, de });

export const NEWS: Post[] = [
  {
    id: "2021-12-13",
    date: "2021-12-13",
    dateline: p("Genève, le 13 décembre 2021", "Geneva, 13 December 2021", "Genebra, 13 de dezembro de 2021", "Ginevra, 13 dicembre 2021", "Genf, 13. Dezember 2021"),
    paras: [
      p(
        "En cette période que chacun définira comme il le souhaite, une petite vidéo du bon vieux temps, qui vous donnera des idées pour une soirée festive. Si vous n’avez pas de morue sous la main, une chair de poisson frais fera l’affaire !!!!",
        "At this time of year, which everyone will call as they wish, a little video from the good old days to give you ideas for a festive evening. If you have no salt cod to hand, fresh fish will do the trick!!!!",
        "Nesta época, que cada um definirá como quiser, um pequeno vídeo dos bons velhos tempos, que vos dará ideias para uma noite festiva. Se não tiverem bacalhau à mão, um peixe fresco servirá!!!!",
        "In questo periodo, che ognuno definirà come preferisce, un piccolo video dei bei vecchi tempi, che vi darà qualche idea per una serata di festa. Se non avete baccalà sotto mano, andrà bene anche del pesce fresco!!!!",
        "In dieser Zeit, die jeder nennen mag, wie er will, ein kleines Video aus der guten alten Zeit, das Ihnen Ideen für einen festlichen Abend gibt. Wenn Sie keinen Stockfisch zur Hand haben, tut es auch frischer Fisch!!!!",
      ),
    ],
    links: [
      "https://www.pique-assiette.ch/recettes/431",
      "https://naturopac.ch/pique-assiette-invite-les-chefs-bacalhau-a-gomes-de-sa-morue-effeuillee-aux-pommes-de-terre-et-aux-oignons-par-fernando-martins/",
    ],
  },
  {
    id: "2018-01-08",
    date: "2018-01-08",
    dateline: p("Genève, le 8 janvier 2018", "Geneva, 8 January 2018", "Genebra, 8 de janeiro de 2018", "Ginevra, 8 gennaio 2018", "Genf, 8. Januar 2018"),
    paras: [
      p("Chers ami(e)s, chers client(e)s,", "Dear friends, dear customers,", "Caros amigos e amigas, caros clientes,", "Cari amici, cari clienti,", "Liebe Freundinnen und Freunde, liebe Gäste,"),
      p(
        "car les représentants de la culture portugaise et autres artistes lusitaniens sont bien rares à Genève je vous fais partager l’affiche de l’AMR et son programme WELCOME LUSITANIA !",
        "as representatives of Portuguese culture and other Lusitanian artists are very rare in Geneva, I am sharing with you the AMR poster and its WELCOME LUSITANIA programme!",
        "como os representantes da cultura portuguesa e outros artistas lusitanos são bem raros em Genebra, partilho convosco o cartaz da AMR e o seu programa WELCOME LUSITANIA!",
        "poiché i rappresentanti della cultura portoghese e gli altri artisti lusitani sono assai rari a Ginevra, condivido con voi il manifesto dell’AMR e il suo programma WELCOME LUSITANIA!",
        "da Vertreter der portugiesischen Kultur und andere lusitanische Künstler in Genf sehr selten sind, teile ich mit Ihnen das Plakat des AMR und sein Programm WELCOME LUSITANIA!",
      ),
      p(
        "Je profite de l’occasion pour vous remercier de votre fidélité tout au long de ces 45 années d’existence du Restaurant Le Portugais-Marisqueira.",
        "I take this opportunity to thank you for your loyalty throughout these 45 years of the Restaurant Le Portugais-Marisqueira.",
        "Aproveito a ocasião para vos agradecer a fidelidade ao longo destes 45 anos de existência do Restaurante Le Portugais-Marisqueira.",
        "Colgo l’occasione per ringraziarvi della vostra fedeltà in questi 45 anni di vita del Ristorante Le Portugais-Marisqueira.",
        "Ich nutze die Gelegenheit, Ihnen für Ihre Treue während dieser 45 Jahre des Restaurants Le Portugais-Marisqueira zu danken.",
      ),
      p(
        "Quelques changements et nouveautés vous attendent chez nous en 2018 et je vous en tiendrai informés, mais pour l’instant…..musique!!!",
        "A few changes and new things await you here in 2018 and I will keep you informed, but for now… music!!!",
        "Algumas mudanças e novidades esperam-vos na nossa casa em 2018 e irei mantendo-vos informados, mas por agora… música!!!",
        "Alcuni cambiamenti e novità vi attendono da noi nel 2018 e vi terrò informati, ma per ora… musica!!!",
        "Einige Änderungen und Neuheiten erwarten Sie bei uns im Jahr 2018, und ich werde Sie darüber informieren, aber jetzt erst einmal… Musik!!!",
      ),
    ],
    links: [],
    image: {
      src: asset("blog/lusitania-flyer.webp"),
      w: 189,
      h: 267,
      alt: p("Affiche « Welcome Lusitania ! » de l’AMR", "AMR “Welcome Lusitania!” poster", "Cartaz «Welcome Lusitania!» da AMR", "Manifesto «Welcome Lusitania!» dell’AMR", "Plakat «Welcome Lusitania!» des AMR"),
    },
  },
  {
    id: "2017-10-03",
    date: "2017-10-03",
    dateline: p("Genève, le 3 octobre 2017", "Geneva, 3 October 2017", "Genebra, 3 de outubro de 2017", "Ginevra, 3 ottobre 2017", "Genf, 3. Oktober 2017"),
    paras: [
      p("Chers ami(e)s, chers client(e)s", "Dear friends, dear customers", "Caros amigos e amigas, caros clientes", "Cari amici, cari clienti", "Liebe Freundinnen und Freunde, liebe Gäste"),
      p(
        "Aujourd’hui sort le GaultMillau Suisse 2018, dans lequel, une fois encore, nous sommes couronnés d’une très belle critique qui, je l’espère, fera plaisir à tous nos fidèles et surtout ceux qui au long de toutes ces années ne comprennent pas le 12/2o qui nous honore mais qui d’après eux ne correspond pas à la réalité du travail fourni et de la passion qui nous habite.",
        "Today the GaultMillau Suisse 2018 comes out, in which, once again, we are crowned with a very fine review which I hope will please all our regulars, and above all those who over all these years have not understood the 12/20 that honours us but which, in their view, does not match the reality of the work done and the passion that drives us.",
        "Sai hoje o GaultMillau Suisse 2018, no qual, mais uma vez, somos distinguidos com uma crítica muito bonita que, espero, agradará a todos os nossos fiéis e sobretudo àqueles que, ao longo de todos estes anos, não compreendem o 12/20 que nos honra mas que, segundo eles, não corresponde à realidade do trabalho feito e da paixão que nos move.",
        "Oggi esce il GaultMillau Suisse 2018, nel quale, ancora una volta, siamo premiati con una bellissima recensione che, spero, farà piacere a tutti i nostri clienti fedeli e soprattutto a coloro che in tutti questi anni non capiscono il 12/20 che ci onora ma che secondo loro non corrisponde alla realtà del lavoro svolto e della passione che ci anima.",
        "Heute erscheint der GaultMillau Schweiz 2018, in dem wir einmal mehr mit einer sehr schönen Kritik ausgezeichnet werden, die hoffentlich all unsere treuen Gäste freut, vor allem jene, die all die Jahre die 12/20 nicht verstehen, die uns ehren, die aber ihrer Meinung nach nicht der geleisteten Arbeit und der Leidenschaft entsprechen, die uns antreibt.",
      ),
      p("A ceux là je voudrais dire : qu’importe la note, pourvu que l’on se régale !!!", "To them I would like to say: never mind the score, as long as we enjoy our food!!!", "A esses gostaria de dizer: pouco importa a nota, desde que nos deliciemos!!!", "A loro vorrei dire: poco importa il voto, purché ci si goda il pasto!!!", "Ihnen möchte ich sagen: Was zählt die Note, solange man geniesst!!!"),
      p(
        "Je ne suis pas dans un esprit de compétition et rien que le fait d’être référencé dans ces excellents guides que sont le GaultMillau et le Michelin, me satisfait pleinement et récompense le travail de notre petite équipe à qui je voudrais aussi rendre hommage!!!",
        "I am not in a competitive spirit, and simply being listed in excellent guides such as GaultMillau and Michelin fully satisfies me and rewards the work of our small team, to whom I would also like to pay tribute!!!",
        "Não estou num espírito de competição, e o simples facto de estar referenciado em guias excelentes como o GaultMillau e o Michelin satisfaz-me plenamente e recompensa o trabalho da nossa pequena equipa, a quem gostaria também de prestar homenagem!!!",
        "Non ho spirito di competizione, e il solo fatto di essere citati in guide eccellenti come il GaultMillau e la Michelin mi soddisfa pienamente e premia il lavoro della nostra piccola squadra, alla quale vorrei anche rendere omaggio!!!",
        "Ich denke nicht in Kategorien des Wettbewerbs, und allein die Tatsache, in so hervorragenden Führern wie dem GaultMillau und dem Michelin aufgeführt zu sein, erfüllt mich voll und ganz und belohnt die Arbeit unseres kleinen Teams, dem ich ebenfalls meine Anerkennung aussprechen möchte!!!",
      ),
      p(
        "J’aimerais aussi vous signaler que le GaultMillau à mis en ligne un excellent site que je vous invite à visiter:",
        "I would also like to point out that GaultMillau has put an excellent website online, which I invite you to visit:",
        "Gostaria ainda de vos assinalar que o GaultMillau pôs online um excelente site que vos convido a visitar:",
        "Vorrei anche segnalarvi che il GaultMillau ha messo online un ottimo sito che vi invito a visitare:",
        "Ich möchte Sie auch darauf hinweisen, dass der GaultMillau eine ausgezeichnete Website aufgeschaltet hat, die ich Ihnen zu besuchen empfehle:",
      ),
      p("[link:0]", "[link:0]", "[link:0]", "[link:0]", "[link:0]"),
      p(
        "Dès ce mois d’octobre nous préparerons un ou deux plats de gibier à la portugaise, plus d’informations sur la page d’accueil dès mercredi 4 octobre.",
        "From this October we will prepare one or two Portuguese-style game dishes; more information on the home page from Wednesday 4 October.",
        "A partir deste mês de outubro vamos preparar um ou dois pratos de caça à portuguesa; mais informações na página inicial a partir de quarta-feira, 4 de outubro.",
        "Da questo mese di ottobre prepareremo uno o due piatti di selvaggina alla portoghese; maggiori informazioni sulla pagina iniziale da mercoledì 4 ottobre.",
        "Ab diesem Oktober bereiten wir ein oder zwei Wildgerichte nach portugiesischer Art zu; mehr Informationen auf der Startseite ab Mittwoch, 4. Oktober.",
      ),
      p("Au plaisir de vous retrouver et d’ici là….faites vous plaisir !!!", "Looking forward to seeing you again, and until then… enjoy yourselves!!!", "Até breve e, até lá… deliciem-se!!!", "A presto e, nel frattempo… concedetevi qualcosa di buono!!!", "Bis bald, und bis dahin… lassen Sie es sich gut gehen!!!"),
      p("Fernando Martins", "Fernando Martins", "Fernando Martins", "Fernando Martins", "Fernando Martins"),
    ],
    links: ["https://www.gaultmillau.ch/fr/"],
  },
  {
    id: "2017-01",
    date: "2017-01-01",
    dateline: p("Genève, janvier 2017", "Geneva, January 2017", "Genebra, janeiro de 2017", "Ginevra, gennaio 2017", "Genf, Januar 2017"),
    paras: [
      p("Chers amis, chers clients,", "Dear friends, dear customers,", "Caros amigos, caros clientes,", "Cari amici, cari clienti,", "Liebe Freunde, liebe Gäste,"),
      p("Nous vous souhaitons une bonne et heureuse année 2017, pleine de joies, de bonheur et de bons plats.", "We wish you a good and happy 2017, full of joy, happiness and good food.", "Desejamos-vos um bom e feliz ano de 2017, cheio de alegria, felicidade e bons pratos.", "Vi auguriamo un buono e felice 2017, pieno di gioia, felicità e buoni piatti.", "Wir wünschen Ihnen ein gutes und glückliches Jahr 2017, voller Freude, Glück und guter Gerichte."),
      p(
        "Antonina et moi nous réjouissons de vous retrouver du mardi au samedi. Nous n’insisterons jamais assez sur la nécessité de réserver votre table, tant à midi comme le soir, ce qui nous permet de mieux vous accueillir et de mieux vous servir.",
        "Antonina and I look forward to seeing you from Tuesday to Saturday. We cannot stress enough how important it is to book your table, at lunch as in the evening, so that we can welcome and serve you better.",
        "A Antonina e eu teremos todo o gosto em receber-vos de terça a sábado. Nunca é demais insistir na necessidade de reservar a vossa mesa, tanto ao almoço como ao jantar, o que nos permite receber-vos e servir-vos melhor.",
        "Antonina e io saremo lieti di ritrovarvi dal martedì al sabato. Non insisteremo mai abbastanza sulla necessità di prenotare il vostro tavolo, sia a pranzo sia a cena: ci permette di accogliervi e servirvi meglio.",
        "Antonina und ich freuen uns, Sie von Dienstag bis Samstag wiederzusehen. Wir können nicht genug betonen, wie wichtig es ist, Ihren Tisch zu reservieren, mittags wie abends: So können wir Sie besser empfangen und bedienen.",
      ),
      p(
        "N’hésitez pas à me joindre même sur mon portable, je me réjouis de vous informer sur nos arrivages du jour et nos disponibilités.",
        "Do not hesitate to reach me, even on my mobile; I am happy to tell you about the day’s arrivals and our availability.",
        "Não hesitem em contactar-me, mesmo no telemóvel; terei todo o gosto em informar-vos sobre as chegadas do dia e a nossa disponibilidade.",
        "Non esitate a contattarmi anche sul cellulare: sarò lieto di informarvi sugli arrivi del giorno e sulla nostra disponibilità.",
        "Zögern Sie nicht, mich auch auf dem Handy anzurufen; ich informiere Sie gerne über die Lieferungen des Tages und unsere freien Plätze.",
      ),
      p("Au plaisir de vous retrouver…à bientôt!!!", "Looking forward to seeing you… see you soon!!!", "Até breve… até já!!!", "Al piacere di ritrovarvi… a presto!!!", "Auf ein baldiges Wiedersehen… bis bald!!!"),
      p("Antonina et Fernando", "Antonina and Fernando", "Antonina e Fernando", "Antonina e Fernando", "Antonina und Fernando"),
    ],
    links: [],
  },
  {
    id: "2016-05-23",
    date: "2016-05-23",
    dateline: p("Genève, le 23 mai 2016", "Geneva, 23 May 2016", "Genebra, 23 de maio de 2016", "Ginevra, 23 maggio 2016", "Genf, 23. Mai 2016"),
    paras: [
      p("[link:0]", "[link:0]", "[link:0]", "[link:0]", "[link:0]"),
      p(
        "Dernière émission à laquelle j’ai participé, l’expérience fut rude mais le résultat est assez concluant. Le reportage diffusé avant la partie dégustation est très intéressant.",
        "The latest programme I took part in: the experience was tough but the result is quite conclusive. The report broadcast before the tasting part is very interesting.",
        "O último programa em que participei: a experiência foi dura, mas o resultado é bastante conclusivo. A reportagem transmitida antes da parte da prova é muito interessante.",
        "L’ultima trasmissione a cui ho partecipato: l’esperienza è stata dura, ma il risultato è piuttosto convincente. Il servizio trasmesso prima della parte di degustazione è molto interessante.",
        "Die letzte Sendung, an der ich teilgenommen habe: Die Erfahrung war hart, aber das Ergebnis ist ziemlich überzeugend. Die Reportage vor dem Degustationsteil ist sehr interessant.",
      ),
      p("Fernando Martins", "Fernando Martins", "Fernando Martins", "Fernando Martins", "Fernando Martins"),
    ],
    links: ["http://www.rts.ch/emissions/abe/7627531-sardines-en-boite-bientot-rares-et-cheres.html"],
    missingImage: "serrees-comme-des-sardines-en-boite-300x221.jpg",
  },
  {
    id: "2016-05-09",
    date: "2016-05-09",
    dateline: p("Genève, le 9 mai 2016", "Geneva, 9 May 2016", "Genebra, 9 de maio de 2016", "Ginevra, 9 maggio 2016", "Genf, 9. Mai 2016"),
    paras: [
      p(
        "Chers amis, chers clients, Antonina et moi voulions utiliser ce premier message sur notre blog pour vous remercier de votre fidélité au long de ces 43 ans pour certains et moins longtemps pour d’autres, mais tous nous visitent avec assiduité.",
        "Dear friends, dear customers, Antonina and I wanted to use this first message on our blog to thank you for your loyalty over these 43 years for some of you, and for a shorter time for others, but all of you visit us faithfully.",
        "Caros amigos, caros clientes, a Antonina e eu quisemos usar esta primeira mensagem no nosso blogue para vos agradecer a fidelidade ao longo destes 43 anos para alguns, e há menos tempo para outros, mas todos nos visitam com assiduidade.",
        "Cari amici, cari clienti, Antonina e io volevamo usare questo primo messaggio sul nostro blog per ringraziarvi della vostra fedeltà in questi 43 anni per alcuni, e da meno tempo per altri, ma tutti ci fate visita con assiduità.",
        "Liebe Freunde, liebe Gäste, Antonina und ich wollten diese erste Nachricht in unserem Blog nutzen, um Ihnen für Ihre Treue zu danken, manchen von Ihnen seit 43 Jahren, anderen seit kürzerer Zeit, doch alle besuchen uns regelmässig.",
      ),
      p(
        "Mais il faut avoir à l’esprit que l’existence d’un établissement comme le notre reste fragile car totalement indépendant de tout groupe d’investisseurs ou autres entreprises.",
        "But it must be borne in mind that the existence of an establishment like ours remains fragile, as it is completely independent of any group of investors or other companies.",
        "Mas é preciso ter em mente que a existência de um estabelecimento como o nosso continua frágil, porque é totalmente independente de qualquer grupo de investidores ou outras empresas.",
        "Ma bisogna tenere presente che l’esistenza di un locale come il nostro resta fragile, perché è del tutto indipendente da qualsiasi gruppo di investitori o altre imprese.",
        "Man muss sich aber bewusst sein, dass ein Betrieb wie der unsere zerbrechlich bleibt, denn er ist völlig unabhängig von jeder Investorengruppe oder anderen Unternehmen.",
      ),
      p(
        "Pour pouvoir survivre dans la jungle qu’est devenu le marché de l’alimentation, de la restauration en particulier, il faut faire part d’abnégation et de sacrifices.",
        "To survive in the jungle that the food market, and the restaurant trade in particular, has become, self-denial and sacrifice are needed.",
        "Para sobreviver na selva em que se tornou o mercado da alimentação, e o da restauração em particular, é preciso abnegação e sacrifícios.",
        "Per sopravvivere nella giungla che è diventato il mercato dell’alimentazione, e della ristorazione in particolare, servono abnegazione e sacrifici.",
        "Um im Dschungel zu überleben, zu dem der Lebensmittelmarkt und besonders die Gastronomie geworden ist, braucht es Selbstverleugnung und Opfer.",
      ),
      p("C’est pour ces raisons que bon nombre d’établissements ferment ou changent de main chaque année.", "That is why many establishments close or change hands every year.", "É por estas razões que muitos estabelecimentos fecham ou mudam de mãos todos os anos.", "È per queste ragioni che molti locali chiudono o cambiano proprietario ogni anno.", "Aus diesen Gründen schliessen viele Betriebe jedes Jahr oder wechseln den Besitzer."),
      p("Le monde de la restauration n’est pas un métier. C’est une vocation.", "The restaurant world is not a trade. It is a vocation.", "O mundo da restauração não é um ofício. É uma vocação.", "Il mondo della ristorazione non è un mestiere. È una vocazione.", "Die Gastronomie ist kein Beruf. Sie ist eine Berufung."),
      p("Il ne faut pas avoir l’argent ou l’appât du gain comme but final mais la passion. Passion des produits, du goût, du service.", "The final aim must not be money or the lure of profit but passion. Passion for produce, for taste, for service.", "O objetivo final não deve ser o dinheiro nem a ganância, mas a paixão. Paixão pelos produtos, pelo sabor, pelo serviço.", "Lo scopo finale non deve essere il denaro o la sete di guadagno, ma la passione. Passione per i prodotti, per il gusto, per il servizio.", "Das Endziel darf nicht das Geld oder die Gewinnsucht sein, sondern die Leidenschaft. Leidenschaft für die Produkte, den Geschmack, den Service."),
      p(
        "Pour cela, nous confectionnons nous même tout les plats proposés et n’utilisons aucun produit du convenience food pour vous procurer le plus grand plaisir. Seules les glaces sont préparées artisanalement à l’extérieur car nous n’arrivions pas à suivre.",
        "That is why we make every dish we offer ourselves and use no convenience food, to give you the greatest pleasure. Only the ice creams are made by an artisan outside, because we could not keep up.",
        "Por isso confecionamos nós próprios todos os pratos propostos e não usamos nenhum produto de convenience food, para vos dar o maior prazer. Só os gelados são preparados artesanalmente fora, porque não conseguíamos acompanhar.",
        "Per questo prepariamo noi stessi tutti i piatti proposti e non usiamo alcun prodotto di convenience food, per darvi il massimo piacere. Solo i gelati sono preparati artigianalmente all’esterno, perché non riuscivamo a stare al passo.",
        "Darum bereiten wir alle angebotenen Gerichte selbst zu und verwenden kein Convenience Food, um Ihnen das grösste Vergnügen zu bereiten. Nur die Glace wird ausser Haus handwerklich hergestellt, weil wir nicht nachkamen.",
      ),
      p("Chaque jour est un combat pour vous servir à votre goût et dans les meilleurs délais.", "Every day is a fight to serve you to your taste and as quickly as possible.", "Cada dia é uma luta para vos servir a vosso gosto e no menor tempo possível.", "Ogni giorno è una battaglia per servirvi secondo i vostri gusti e nel minor tempo possibile.", "Jeder Tag ist ein Kampf, um Sie nach Ihrem Geschmack und so rasch wie möglich zu bedienen."),
      p("Ce restaurant a vécu au fil de ces décennies car mes parents ont eu la chance de trouver en moi un repreneur dans la continuité.", "This restaurant has lived through these decades because my parents were lucky enough to find in me a successor to carry it on.", "Este restaurante atravessou estas décadas porque os meus pais tiveram a sorte de encontrar em mim um sucessor que lhe deu continuidade.", "Questo ristorante ha attraversato i decenni perché i miei genitori hanno avuto la fortuna di trovare in me un successore che ne portasse avanti la continuità.", "Dieses Restaurant hat die Jahrzehnte überdauert, weil meine Eltern das Glück hatten, in mir einen Nachfolger zu finden, der es weiterführt."),
      p("Le temps passe et il n’est pas sur que l’un de nos enfants reprenne le flambeau, mais vogue ce petit bateau , cette institution genevoise qu’est Le Portugais.", "Time passes and it is not certain that one of our children will take up the torch, but sail on, little boat, this Geneva institution that is Le Portugais.", "O tempo passa e não é certo que um dos nossos filhos pegue no testemunho, mas que navegue este pequeno barco, esta instituição genebrina que é o Le Portugais.", "Il tempo passa e non è certo che uno dei nostri figli raccolga il testimone, ma navighi questa piccola barca, questa istituzione ginevrina che è Le Portugais.", "Die Zeit vergeht, und es ist nicht sicher, dass eines unserer Kinder die Fackel übernimmt, doch segle weiter, kleines Boot, diese Genfer Institution, die Le Portugais ist."),
      p("Des écrivains, des acteurs, des comédiens, des chanteurs, des musiciens, des politiciens, tous d’ici ou d’ailleurs, ont fréquenté Le Portugais, mais aussi tous les inconnus gastronomes à qui nous voulons rendre hommage.", "Writers, actors, comedians, singers, musicians and politicians, from here and elsewhere, have come to Le Portugais, but so have all the unknown food lovers to whom we want to pay tribute.", "Escritores, atores, comediantes, cantores, músicos, políticos, daqui e de outros lugares, frequentaram o Le Portugais, mas também todos os gastrónomos anónimos a quem queremos prestar homenagem.", "Scrittori, attori, comici, cantanti, musicisti, politici, di qui e d’altrove, hanno frequentato Le Portugais, ma anche tutti i buongustai sconosciuti a cui vogliamo rendere omaggio.", "Schriftsteller, Schauspieler, Komiker, Sänger, Musiker und Politiker, von hier und anderswo, sind im Le Portugais eingekehrt, aber auch all die unbekannten Feinschmecker, denen wir unsere Anerkennung aussprechen möchten."),
      p(
        "Par ce premier message, nous voulions vous rappeler que nous ne sommes pas un restaurant comme les autres, nous sommes un restaurant avant tout familial, non pas seulement dans le sens où nous sommes une seule famille qui tenons l’établissement depuis deux générations, ni non plus que nous sommes un couple présent en permanence, de l’ouverture à la fermeture, mais bien parce que les clients qui nous fréquentent font partie, petit à petit, de notre famille, la famille du Portugais.",
        "With this first message we wanted to remind you that we are not a restaurant like the others: we are above all a family restaurant, not only in the sense that we are one family who have run the place for two generations, nor because we are a couple who are always here from opening to closing, but because the customers who come to us gradually become part of our family, the family of Le Portugais.",
        "Com esta primeira mensagem quisemos lembrar-vos que não somos um restaurante como os outros: somos antes de mais um restaurante familiar, não só no sentido de sermos uma única família que gere o estabelecimento há duas gerações, nem por sermos um casal sempre presente, da abertura ao fecho, mas sim porque os clientes que nos frequentam passam, pouco a pouco, a fazer parte da nossa família, a família do Le Portugais.",
        "Con questo primo messaggio volevamo ricordarvi che non siamo un ristorante come gli altri: siamo prima di tutto un ristorante di famiglia, non solo nel senso che siamo un’unica famiglia che gestisce il locale da due generazioni, né perché siamo una coppia sempre presente, dall’apertura alla chiusura, ma perché i clienti che ci frequentano entrano a far parte, poco a poco, della nostra famiglia, la famiglia del Portugais.",
        "Mit dieser ersten Nachricht wollten wir Sie daran erinnern, dass wir kein Restaurant wie die anderen sind: Wir sind vor allem ein Familienrestaurant, nicht nur weil wir eine einzige Familie sind, die den Betrieb seit zwei Generationen führt, und auch nicht, weil wir ein Paar sind, das von der Öffnung bis zur Schliessung immer da ist, sondern weil die Gäste, die zu uns kommen, nach und nach zu unserer Familie gehören, der Familie des Portugais.",
      ),
      p(
        "En espérant vous retrouver très rapidement, en tant que restaurateurs ou en tant qu’amis, nous vous souhaitons tout le bonheur du monde et nous continuerons à vous recevoir et à vous servir le plus longtemps possible, jusqu’à notre dernier souffle.",
        "Hoping to see you again very soon, as restaurateurs or as friends, we wish you all the happiness in the world, and we will go on welcoming and serving you for as long as possible, until our last breath.",
        "Esperando reencontrar-vos muito em breve, como restauradores ou como amigos, desejamos-vos toda a felicidade do mundo e continuaremos a receber-vos e a servir-vos o mais tempo possível, até ao nosso último suspiro.",
        "Sperando di ritrovarvi molto presto, come ristoratori o come amici, vi auguriamo tutta la felicità del mondo e continueremo ad accogliervi e a servirvi il più a lungo possibile, fino al nostro ultimo respiro.",
        "In der Hoffnung, Sie sehr bald wiederzusehen, als Gastgeber oder als Freunde, wünschen wir Ihnen alles Glück der Welt, und wir werden Sie so lange wie möglich empfangen und bedienen, bis zu unserem letzten Atemzug.",
      ),
      p("Antonina et Fernando", "Antonina and Fernando", "Antonina e Fernando", "Antonina e Fernando", "Antonina und Fernando"),
    ],
    links: [],
    image: {
      src: asset("blog/antonina-fernando.webp"),
      w: 1200,
      h: 798,
      alt: p("Antonina et Fernando Martins dans la salle", "Antonina and Fernando Martins in the dining room", "Antonina e Fernando Martins na sala", "Antonina e Fernando Martins in sala", "Antonina und Fernando Martins im Saal"),
    },
  },
];
