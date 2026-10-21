# PRD — 1º Encontro Vila Família (Landing Page Cinematográfica)

## Problema original
Landing page para o **1º Encontro Vila Família** (31/10/2026, 14h–18h, Quintal da Alegria — Itaparica, Vila Velha/ES) com hero cinematográfico em que **o scroll do usuário controla o frame do vídeo** (não autoplay): `video.currentTime = scrollProgress * video.duration`. Direção de arte derivada do logo (verde, terracota, amarelo quente, marrom, creme), tipografia moderna arredondada, visual acolhedor e premium. Textos 100% HTML sobre o vídeo (nada queimado nos frames). Após o vídeo, seções normais: experiências das crianças, adultos, o espaço, ingressos e convite final.

## Decisões do usuário (confirmadas via ask_human)
1. CTA de ingressos: **placeholder configurável** (`TICKETS_URL` em `src/data/content.js`; vazio = botões não navegam para fora).
2. Poster/fallback: **frames do próprio vídeo** (poster-first = composição da família; fallback estático = mesmo frame limpo).
3. Scrub **em todos os dispositivos**, com heurística de mobile fraco (`deviceMemory`, `saveData`, UA) para usar a versão 720p.

## Arquitetura
- React (CRA) + Tailwind + GSAP ScrollTrigger + framer-motion + lenis (lint via hot reload, sem build no pod).
- `CinematicHero.jsx`: wrapper 400vh + bloco `sticky` 100svh. ScrollTrigger (scrub) grava progresso-alvo; loop rAF com lerp (0.13) aplica `currentTime` só quando a diferença > 0.008s (evita sobrecarga de decode). Timeline GSAP separada (0–1) controla: dica de scroll (0–6%), saída do Estágio 01 (20–40%), entrada do Estágio 04 (74–90%).
- Cadeia de fontes do player: MP4 1080p → WebM VP9 720p (navegadores sem H.264) → fallback de imagem com poster. `prefers-reduced-motion` = hero estático com poster.
- Vídeo: **"Video Project 4"** (21/10/2026) — menina no escorregador de espuma; uso integral 9,33s (sem queimados; a plaquinha "Vem pro VILA Família!" é prop físico no vídeo). Keyframes a cada 3 frames (30fps). 1080p 19MB / 720p 9MB / WebM 8,2MB. **Versão vertical 1080x1920 (8,6s)** enviada em 21/10/2026 ("vem pro vila familia cel.mp4") — usada automaticamente quando a tela está em retrato (`window.innerHeight > innerWidth`), com WebM vertical de fallback (7,8MB) e poster próprio.
- Coreografia de texto (atualizada 21/10/2026 a pedido): **Estágio 01** (título + subtítulo + info + CTA) visível nos primeiros 3s (fade em 0,30–0,42); **card "1º Encontro / Brincadeiras que criam conexões"** entra quando a menina sai do quadro (~5s = 0,50) e sai quando ela volta com a plaquinha (~7s = 0,70); 0,77–1,0 só o vídeo com a plaquinha até o pin soltar no letreiro.
- Lenis integrado ao ticker do GSAP; `ScrollTrigger.update` no evento de scroll; limpeza completa em unmount.
- Logo original SVG (casinha verde + coração amarelo) usado na navbar, hero, footer e favicon.
- Seções: Marquee editorial lento, Crianças (bento com foto + 4 cards), Adultos (lista editorial numerada 01–06 + foto, fundo verde), O Espaço (parallax + card de comodidades sobreposto), Ingressos (4 cards com preços exatos do brief + CTA), Convite final + footer. Grain overlay, cursor customizado (desktop), badges rotativos.

## Estado atual (21/10/2026)
- Implementado e verificado no preview: scrub bidirecional com o vídeo novo (0s no topo com textos, quadro vazio + card aos ~5,2s, menina com plaquinha aos ~8,3s sem card), sem overflow no mobile 390px, CTA da hero rola até #ingressos, preços exatos, marquee, parallax, grain.
- Preview Chromium não tem H.264 → a experiência roda via WebM VP9 lá; em Chrome/Safari reais o MP4 toca (cadeia testada até o WebM no preview).
- MOCKED/não configurável ainda: URL de compra (`TICKETS_URL = ""`), imagens das seções vêm de Pexels/Unsplash (referência) — substituir por fotos reais do Quintal da Alegria quando existirem.

## Backlog priorizado
- P0: Configurar `TICKETS_URL` quando o link de compra for fornecido (`/app/frontend/src/data/content.js`).
- P1: Trocar fotos de referência (Pexels/Unsplash) por fotos reais do evento/espaço.
- P2: Formulário de interesse (backend) caso o cliente queira capturar leads sem gateway de pagamento.
- P2: OG image dedicada + analytics simples.
