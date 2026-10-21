// ─────────────────────────────────────────────────────────────
// CONTEÚDO DO SITE — 1º Encontro Vila Família
// ─────────────────────────────────────────────────────────────

// ⚙️ URL DE COMPRA DOS INGRESSOS — será fornecida.
// Configure aqui (ex.: "https://ingressos.vilafamilia.com.br"). Enquanto vazia,
// os botões não navegam para fora da página.
export const TICKETS_URL = "";

export const EVENT = {
  name: "1º Encontro Vila Família",
  date: "31 de outubro de 2026",
  dateShort: "31 OUT 2026",
  time: "14h às 18h",
  place: "Quintal da Alegria — Itaparica, Vila Velha/ES",
};

export const HERO = {
  titleLine1: "Os pequenos brincam.",
  titleLine2: "Os grandes também.",
  subtitle:
    "Uma tarde para crianças e adultos viverem juntos uma experiência gostosa em família.",
  cta: "Quero participar",
};

export const STAGE_FOUR = {
  title: "Brincadeiras que criam conexões.",
  subtitle:
    "Enquanto as crianças exploram, brincam e vivem novas experiências, os adultos também têm um tempo para se divertir, relaxar, conversar e criar novas conexões.",
  items: [
    { icon: "blocks", label: "Experiências para as crianças" },
    { icon: "coffee", label: "Momentos para os adultos" },
    { icon: "heart", label: "Um encontro para toda a família" },
  ],
};

export const KIDS = {
  eyebrow: "03 — Experiências para crianças",
  title: "Feito para eles brincarem sem parar.",
  intro:
    "Uma estrutura completa pensada para cada idade: diversão com segurança, do começo ao fim da tarde.",
  items: [
    {
      icon: "blocks",
      title: "Recreação",
      desc: "Brincadeiras dirigidas para manter a energia lá em cima a tarde inteira.",
    },
    {
      icon: "heart",
      title: "Monitoria",
      desc: "Equipe presente cuidando de cada criança do início ao fim do encontro.",
    },
    {
      icon: "baby",
      title: "Espaço Baby · 0 a 3 anos",
      desc: "Cantinho seguro, lúdico e calmo para os menores do Vila.",
    },
    {
      icon: "puzzle",
      title: "Estrutura infantil",
      desc: "Playground, jogos e cantos de exploração para todas as idades.",
    },
  ],
  image:
    "https://images.pexels.com/photos/2253883/pexels-photo-2253883.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  imageAlt:
    "https://images.pexels.com/photos/5278823/pexels-photo-5278823.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
};

export const ADULTS = {
  eyebrow: "04 — Os adultos também aproveitam",
  title: "A diversão não é exclusividade de quem é pequeno.",
  intro:
    "Enquanto as crianças comandam o playground, a tarde dos adultos também foi pensada nos mínimos detalhes.",
  items: [
    "Jogos",
    "Desafios",
    "Dança",
    "Convivência",
    "Bate-papo",
    "Relaxamento",
  ],
  image:
    "https://images.pexels.com/photos/30478431/pexels-photo-30478431.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  imageAlt:
    "https://images.unsplash.com/photo-1755003842792-9d2b7ad08862?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwyfHxwYXJlbnRzJTIwcmVsYXhpbmclMjBwYXJrfGVufDB8fHx8MTc5MjM0NzU1OHww&ixlib=rb-4.1.0&q=85",
};

export const VENUE = {
  eyebrow: "05 — O espaço",
  title: "Quintal da Alegria",
  subtitle:
    "Um endereço feito para famílias: área externa ampla, ambiente climatizado e todas as comodidades para a tarde fluir leve.",
  features: [
    { icon: "sun", label: "Área externa ampla" },
    { icon: "wind", label: "Ambiente climatizado" },
    { icon: "coffee", label: "Comodidades para famílias" },
  ],
  image:
    "https://images.pexels.com/photos/17240976/pexels-photo-17240976.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  imageAlt:
    "https://images.pexels.com/photos/15937644/pexels-photo-15937644.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
};

export const TICKETS = {
  eyebrow: "06 — Ingressos",
  title: "Garanta o seu lugar no primeiro Vila.",
  intro:
    "Vagas limitadas para manter a experiência leve e acolhedora para todo mundo.",
  cta: "Quero participar",
  note: "Você será direcionado ao site de inscrições.",
  plans: [
    {
      id: "adulto",
      icon: "user",
      name: "Adultos",
      price: "R$ 110",
      desc: "Entrada individual para viver o Vila inteiro.",
      highlight: false,
    },
    {
      id: "social",
      icon: "heart",
      name: "Ingresso social",
      price: "R$ 105",
      desc: "+ 1 kg de alimento não perecível.",
      tag: "Mais solidário",
      highlight: true,
    },
    {
      id: "bebe",
      icon: "baby",
      name: "Crianças de 0 a 5 anos",
      price: "R$ 30",
      desc: "Pequenos com acompanhamento dos pais.",
      highlight: false,
    },
    {
      id: "kids6",
      icon: "blocks",
      name: "Crianças a partir de 6 anos",
      price: "R$ 45",
      desc: "Acesso completo às experiências infantis.",
      highlight: false,
    },
  ],
};

export const INVITE = {
  hand: "Vem viver",
  title: "o primeiro Vila com a gente.",
  cta: "Quero participar",
};

export const MARQUEE_ITEMS = [
  "Os pequenos brincam",
  "Os grandes também",
  "1º Encontro Vila Família",
  "31 de outubro de 2026",
  "Quintal da Alegria",
];

export const CONTACTS = {
  instagram: "https://www.instagram.com/vilafamilia.vv/",
  instagramLabel: "@vilafamilia.vv",
  whatsapp: "https://wa.me/5527988595100",
  whatsappLabel: "(27) 98859-5100",
};
