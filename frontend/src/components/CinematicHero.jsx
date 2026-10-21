import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  CalendarDays,
  Clock,
  MapPin,
  Blocks,
  Coffee,
  Heart,
} from "lucide-react";
import { HERO, EVENT, STAGE_FOUR } from "../data/content";
import { scrollToId } from "../lib/scroll";
import { LogoMark } from "./Logo";

gsap.registerPlugin(ScrollTrigger);

const SRC_1080 = "/videos/vila-familia-1080.mp4";
const SRC_720 = "/videos/vila-familia-720.mp4";
const SRC_WEBM = "/videos/vila-familia-720.webm";
const EASE = [0.16, 1, 0.3, 1];

// Cadeia de fontes: mp4 → webm (navegadores sem H.264) — mobile fraco começa no 720p
const pickSources = () => {
  if (typeof navigator === "undefined") return [SRC_1080, SRC_WEBM];
  const conn = navigator.connection || {};
  const weak = (navigator.deviceMemory && navigator.deviceMemory <= 2) || conn.saveData;
  const mobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
  return mobile || weak ? [SRC_720, SRC_WEBM] : [SRC_1080, SRC_WEBM];
};

const STAGE4_ICONS = { blocks: Blocks, coffee: Coffee, heart: Heart };

const HeroLine = ({ i, children }) => (
  <span className="block overflow-hidden">
    <motion.span
      className="block"
      initial={{ y: "112%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1.05, delay: 0.35 + i * 0.14, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

const RotatingBadge = () => (
  <div className="absolute bottom-10 right-10 z-20 hidden lg:block" data-testid="hero-badge">
    <svg viewBox="0 0 120 120" className="animate-spin-slow h-28 w-28 opacity-90">
      <defs>
        <path id="badge-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
      </defs>
      <text className="fill-cream font-display text-[10px] font-extrabold uppercase" letterSpacing="1.6">
        <textPath href="#badge-circle">
          1º Encontro Vila Família · {EVENT.dateShort} ·
        </textPath>
      </text>
      <circle cx="60" cy="60" r="5" className="fill-sun" />
    </svg>
  </div>
);

export const CinematicHero = () => {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const stage1Ref = useRef(null);
  const stage4Ref = useRef(null);
  const hintRef = useRef(null);
  const [sources] = useState(pickSources);
  const [srcIdx, setSrcIdx] = useState(0);
  const [failed, setFailed] = useState(false);
  const reduced = useReducedMotion();
  const staticMode = reduced || failed;

  useEffect(() => {
    if (staticMode) return;
    const video = videoRef.current;
    const wrap = wrapRef.current;
    if (!video || !wrap) return;

    const state = { target: 0, current: 0, dur: 0 };
    let raf = 0;

    const onMeta = () => {
      state.dur = video.duration || 0;
      ScrollTrigger.refresh();
    };
    video.addEventListener("loadedmetadata", onMeta);

    // Timeline de texto (posições = % do scrub; vídeo novo 9,33s):
    // Estágio 01 visível 0–3s (0,00–0,30) · card entra quando a menina sai do quadro (~5s = 0,50)
    // card sai quando ela volta com a plaquinha (~7s = 0,70)
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: wrap,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          state.target = self.progress;
        },
      },
    });
    state.target = tl.scrollTrigger.progress;
    state.current = state.target;
    tl.to(hintRef.current, { autoAlpha: 0, y: 14, duration: 0.05 }, 0);
    tl.to(stage1Ref.current, { autoAlpha: 0, y: -80, duration: 0.12, ease: "power1.in" }, 0.3);
    tl.fromTo(stage4Ref.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.07 }, 0.5);
    tl.fromTo(
      ".stage4-item",
      { autoAlpha: 0, y: 44 },
      { autoAlpha: 1, y: 0, duration: 0.05, stagger: 0.02 },
      0.52
    );
    tl.to(stage4Ref.current, { autoAlpha: 0, y: -40, duration: 0.08, ease: "power1.in" }, 0.7);
    tl.to({}, { duration: 0.02 }, 0.98);

    // Sync do frame com easing — evita sobrecarregar a decodificação
    const tick = () => {
      const diff = state.target - state.current;
      state.current =
        Math.abs(diff) > 0.0004 ? state.current + diff * 0.13 : state.target;
      if (state.dur > 0) {
        const t = Math.min(0.999, Math.max(0, state.current)) * state.dur;
        if (Math.abs(video.currentTime - t) > 0.008) video.currentTime = t;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", onMeta);
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [staticMode, srcIdx]);

  return (
    <section
      ref={wrapRef}
      id="topo"
      data-testid="cinematic-hero"
      className={`relative w-full ${staticMode ? "" : "h-[400vh]"}`}
      style={{ height: staticMode ? "100svh" : undefined }}
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden bg-[#10170F]"
        style={{ height: "100svh" }}
      >
        {!failed ? (
          <video
            ref={videoRef}
            key={sources[srcIdx]}
            className="absolute inset-0 h-full w-full object-cover"
            src={sources[srcIdx]}
            poster="/img/poster-first.jpg"
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            onError={() => {
              if (srcIdx < sources.length - 1) setSrcIdx(srcIdx + 1);
              else setFailed(true);
            }}
            aria-hidden="true"
            tabIndex={-1}
            data-testid="hero-video"
          />
        ) : (
          <img
            src="/img/poster-first.jpg"
            alt="Família abraçada no playground do Quintal da Alegria"
            className="absolute inset-0 h-full w-full object-cover"
            data-testid="hero-fallback"
          />
        )}

        {/* Vinhetas de leitura */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/5 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-3/5 bg-gradient-to-r from-black/50 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1/4 bg-gradient-to-b from-black/40 to-transparent" />

        {/* ESTÁGIO 01 — Hero */}
        <div ref={stage1Ref} className="absolute inset-0 z-20 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
            <div className="max-w-2xl">
              <motion.div {...fadeUp(0.15)} className="flex items-center gap-3">
                <LogoMark className="h-10 w-10 drop-shadow-lg lg:h-12 lg:w-12" />
                <span className="font-display text-2xl font-black tracking-tight text-cream drop-shadow-lg lg:text-3xl">
                  Vila<span className="text-sun">Família</span>
                </span>
              </motion.div>

              <motion.p
                {...fadeUp(0.3)}
                className="mt-7 text-xs font-extrabold uppercase tracking-[0.3em] text-sun sm:text-sm"
              >
                1º Encontro Vila Família
              </motion.p>

              <h1 className="mt-3 font-display text-[2.55rem] font-black leading-[1.02] tracking-tight text-cream drop-shadow-lg sm:text-6xl lg:text-7xl">
                <HeroLine i={0}>{HERO.titleLine1}</HeroLine>
                <HeroLine i={1}>
                  <span className="text-sun">{HERO.titleLine2}</span>
                </HeroLine>
              </h1>

              <motion.p
                {...fadeUp(0.78)}
                className="mt-5 max-w-md text-base leading-relaxed text-cream/90 sm:text-lg"
              >
                {HERO.subtitle}
              </motion.p>

              <motion.ul
                {...fadeUp(0.92)}
                className="mt-6 space-y-2 text-sm text-cream/90 sm:text-base"
              >
                <li className="flex items-center gap-2.5">
                  <CalendarDays className="h-4 w-4 shrink-0 text-sun" />
                  {EVENT.date}
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 shrink-0 text-sun" />
                  {EVENT.time}
                </li>
                <li className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 shrink-0 text-sun" />
                  {EVENT.place}
                </li>
              </motion.ul>

              <motion.div {...fadeUp(1.06)}>
                <button
                  onClick={() => scrollToId("#ingressos")}
                  data-testid="hero-cta-quero-participar"
                  className="group mt-8 inline-flex items-center gap-3 rounded-full bg-terra px-8 py-4 font-display text-base font-extrabold uppercase tracking-wide text-cream shadow-[0_18px_44px_-12px_rgba(195,90,66,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-sun hover:text-forest sm:text-lg"
                >
                  {HERO.cta}
                  <ArrowDown className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" />
                </button>
              </motion.div>
            </div>
          </div>
          <RotatingBadge />
        </div>

        {/* ESTÁGIO 04 — Segunda dobra */}
        <div
          ref={stage4Ref}
          style={{ opacity: 0 }}
          className="absolute inset-0 z-20 flex items-end justify-center sm:items-center"
        >
          <div className="flex w-full max-w-7xl justify-center px-4 pb-20 sm:justify-end sm:px-10 sm:pb-0 lg:px-16">
            <div className="w-full max-w-xl rounded-[32px] bg-cream p-7 shadow-[0_44px_90px_-30px_rgba(15,25,12,0.6)] sm:p-10">
              <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-terra">
                1º Encontro Vila Família
              </p>
              <h2 className="mt-4 font-display text-3xl font-black leading-[1.05] tracking-tight text-forest sm:text-5xl">
                {STAGE_FOUR.title.split("conexões.")[0]}
                <span className="text-terra">conexões.</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-cocoa sm:text-base">
                {STAGE_FOUR.subtitle}
              </p>
              <ul className="mt-7 space-y-3">
                {STAGE_FOUR.items.map((item) => {
                  const Icon = STAGE4_ICONS[item.icon];
                  return (
                    <li
                      key={item.label}
                      className="stage4-item flex items-center gap-4 rounded-2xl bg-forest/[0.06] px-5 py-3.5"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-terra/10 text-terra">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-display text-base font-bold text-forest sm:text-lg">
                        {item.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Dica de scroll */}
        <div
          ref={hintRef}
          style={{ opacity: staticMode ? 0 : undefined }}
          className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2.5 text-cream/85"
          data-testid="hero-scroll-hint"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.32em]">
            Role para explorar
          </span>
          <span className="scroll-line block h-10 w-px bg-cream/70" />
        </div>
      </div>
    </section>
  );
};
