// ─────────────────────────────────────────────────────────────
// CONTEÚDO DO SITE — 1º Encontro Vila Família
// ─────────────────────────────────────────────────────────────

// URL oficial de inscrição do primeiro lote. Os CTAs de participação e ingresso
// e a rota interna /checkout direcionam o visitante para este endereço.
export const TICKETS_URL =
  "https://evento.vilafamilia.com.br/primeiro-lote?full_name={{contact.name}}&email={{contact.email}}&phone={{contact.phone_raw}}";

export const EVENT = {
  name: "1º Encontro Vila Família",
  date: "15 de novembro de 2026",
  dateShort: "15 NOV 2026",
  time: "10h às 14h",
  place: "Quintal da Alegria — Itaparica, Vila Velha/ES",
};

export const HERO = {
  titleLine1: "Os pequenos brincam.",
  titleLine2: "Os Adultos também.",
  subtitle:
    "Uma manhã para crianças e adultos viverem juntos uma experiência gostosa em família.",
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
    "Uma estrutura completa pensada para cada idade: diversão com segurança, do começo ao fim da manhã.",
  items: [
    {
      icon: "blocks",
      title: "Recreação",
      desc: "Brincadeiras dirigidas para manter a energia lá em cima a manhã inteira.",
    },
    {
      icon: "heart",
      title: "Monitoria",
      desc: "Equipe presente cuidando de cada criança em momentos pontuais.",
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
  recreationImage: "/img/kids-recreation-activity.png",
  monitoringImage: "/img/kids-monitoring.png",
  babyImage: "/img/kids-baby-space.webp",
  structureImage: "/img/kids-structure.webp",
};

export const ADULTS = {
  eyebrow: "04 — Os adultos também aproveitam",
  title: "A diversão não é exclusividade de quem é pequeno.",
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
    "Um endereço feito para famílias: área externa ampla, ambiente climatizado e todas as comodidades para a manhã fluir leve.",
  features: [
    { icon: "sun", label: "Área externa ampla" },
    { icon: "wind", label: "Ambiente climatizado" },
    { icon: "coffee", label: "Comodidades para famílias" },
  ],
  image: "/img/venue-quintal.png",
  imageAlt:
    "https://images.pexels.com/photos/15937644/pexels-photo-15937644.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
};

export const TICKETS = {
  eyebrow: "06 — Ingressos",
  title: "Garanta o seu lugar no primeiro Vila.",
  intro:
    "Lotes limitados para manter a experiência leve e acolhedora para todo mundo. O 1º lote é exclusivo das 15 primeiras famílias.",
  cta: "Comprar Ingresso",
  note: "Você será direcionado ao site de inscrições.",
  lotes: [
    {
      id: "lote1",
      name: "1º lote",
      tag: "15 primeiras famílias",
      highlight: true,
      prices: [
        { label: "Adulto", price: "R$ 110" },
        { label: "Criança de 5 meses a 5 anos", price: "R$ 40" },
        { label: "Criança a partir de 6 anos", price: "R$ 50" },
      ],
    },
    {
      id: "lote2",
      name: "2º lote",
      tag: "oficial",
      highlight: false,
    },
    {
      id: "lote3",
      name: "3º lote",
      tag: "No dia do Evento",
      highlight: false,
      prices: [
        { label: "Adulto", price: "R$ 155" },
        { label: "Criança de 5 meses a 5 anos", price: "R$ 55" },
        { label: "Criança a partir de 6 anos", price: "R$ 65" },
      ],
    },
  ],
  combos: [
    {
      id: "combo1",
      name: "1 adulto + 1 criança até 5 anos",
      lote1: "R$ 130",
      lote2: "R$ 155",
    },
    {
      id: "combo2",
      name: "2 adultos + 1 criança até 5 anos",
      lote1: "R$ 230",
      lote2: "R$ 270",
    },
    {
      id: "combo3",
      name: "2 adultos + 1 criança até 5 anos + 1 criança acima de 6",
      lote1: "R$ 255",
      lote2: "R$ 315",
    },
  ],
  rules: [
    {
      icon: "baby",
      text: "Bebês de até 4 meses completos não pagam, pois não participam das atividades.",
    },
    { icon: "ticket", text: "A cobrança infantil começa a partir dos 5 meses." },
    {
      icon: "users",
      text: "Famílias com mais crianças podem adquirir ingressos infantis avulsos adicionais ao combo.",
    },
    { icon: "clock", text: "O 1º lote é limitado às primeiras 15 famílias." },
    {
      icon: "info",
      text: "Os combos consideram pelo menos uma criança pagante. Famílias apenas com bebês de até 4 meses podem adquirir ingressos individuais para os adultos.",
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
  "Os Adultos também",
  "1º Encontro Vila Família",
  "15 de novembro de 2026",
  "Quintal da Alegria",
];

export const CONTACTS = {
  instagram: "https://www.instagram.com/vilafamilia.vv/",
  instagramLabel: "@vilafamilia.vv",
  whatsapp: "https://wa.me/5527988595100",
  whatsappLabel: "(27) 98859-5100",
};
