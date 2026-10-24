import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ADULTS } from "../data/content";
import { Reveal, MaskedLine } from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 120;
const DESKTOP_QUERY = "(min-width: 1024px)";
const DESKTOP_POSTER = "/frames/adults/a001.jpg";
const MOBILE_POSTER = "/frames/adults-mobile/m001.jpg";
const desktopFrameUrl = (index) => `/frames/adults/a${String(index + 1).padStart(3, "0")}.jpg`;
const mobileFrameUrl = (index) => `/frames/adults-mobile/m${String(index + 1).padStart(3, "0")}.jpg`;

const useScrollFrameCanvas = (wrapRef, canvasRef, frameUrl, canvasSize) => {
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return undefined;

    const context = canvas.getContext("2d");
    const state = { target: 0, current: 0 };
    const frames = new Array(FRAME_COUNT).fill(null);
    const pending = new Map();
    const nextFree = [0, 1, 2, 3, 4];
    let raf = 0;
    let alive = true;
    let mediaStarted = false;
    let lastDrawn = -1;

    // Requisições deduplicadas: o frame pedido pelo scroll tem prioridade,
    // enquanto cinco cadeias carregam progressivamente o restante da sequência.
    const requestFrame = (index, onLoaded) => {
      if (!alive || index < 0 || index >= FRAME_COUNT) return;
      if (frames[index]) {
        if (onLoaded) onLoaded();
        return;
      }

      const existing = pending.get(index);
      if (existing) {
        if (onLoaded) existing.callbacks.push(onLoaded);
        return;
      }

      const entry = { callbacks: onLoaded ? [onLoaded] : [] };
      pending.set(index, entry);
      const image = new Image();
      image.onload = () => {
        if (!alive) return;
        frames[index] = image;
        pending.delete(index);
        entry.callbacks.forEach((callback) => callback());
      };
      image.onerror = () => pending.delete(index);
      image.src = frameUrl(index);
    };

    const loadChain = (chain) => {
      if (!alive) return;
      const index = nextFree[chain];
      if (index >= FRAME_COUNT) return;
      nextFree[chain] += nextFree.length;
      requestFrame(index, () => loadChain(chain));
    };

    const startLoading = () => {
      if (mediaStarted || !alive) return;
      mediaStarted = true;
      for (let chain = 0; chain < nextFree.length; chain += 1) loadChain(chain);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          startLoading();
          observer.disconnect();
        }
      },
      { rootMargin: "150% 0px" }
    );
    observer.observe(wrap);

    const trigger = ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        state.target = self.progress;
        const requestedIndex = Math.round(self.progress * (FRAME_COUNT - 1));
        if (mediaStarted && !frames[requestedIndex]) requestFrame(requestedIndex);
      },
    });
    state.target = trigger.progress;
    state.current = state.target;

    const tick = () => {
      const difference = state.target - state.current;
      state.current =
        Math.abs(difference) > 0.0004
          ? state.current + difference * 0.13
          : state.target;
      const index = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(state.current * (FRAME_COUNT - 1)))
      );

      if (mediaStarted && !frames[index]) requestFrame(index);
      if (index !== lastDrawn || !frames[index]) {
        let image = frames[index];
        if (!image) {
          for (let distance = 1; distance < FRAME_COUNT; distance += 1) {
            image = frames[index - distance] || frames[index + distance];
            if (image) break;
          }
        }
        if (image) {
          context.drawImage(image, 0, 0, canvasSize.width, canvasSize.height);
          lastDrawn = index;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      alive = false;
      observer.disconnect();
      cancelAnimationFrame(raf);
      trigger.kill();
    };
  }, [canvasSize.height, canvasSize.width, frameUrl, wrapRef, canvasRef]);
};

const useScrollCopyTimeline = (wrapRef, introRef, momentsRef, hintRef) => {
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;

    const timeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: wrap,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
    timeline.to(hintRef.current, { autoAlpha: 0, y: 12, duration: 0.05 }, 0);
    timeline.to(
      introRef.current,
      { autoAlpha: 0, y: -38, duration: 0.12, ease: "power1.in" },
      0.27
    );
    timeline.fromTo(
      momentsRef.current,
      { autoAlpha: 0, y: 28 },
      { autoAlpha: 1, y: 0, duration: 0.1 },
      0.36
    );
    const momentItems = momentsRef.current?.querySelectorAll(".adult-moment") || [];
    timeline.fromTo(
      momentItems,
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, duration: 0.06, stagger: 0.018 },
      0.4
    );
    timeline.to(
      momentsRef.current,
      { autoAlpha: 0, y: -24, duration: 0.1, ease: "power1.in" },
      0.84
    );
    timeline.to({}, { duration: 0.02 }, 0.98);

    return () => {
      if (timeline.scrollTrigger) timeline.scrollTrigger.kill();
      timeline.kill();
    };
  }, [wrapRef, introRef, momentsRef, hintRef]);
};

const ActivityChips = ({ mobile = false }) => (
  <div className={mobile ? "grid grid-cols-2 gap-2" : "flex max-w-5xl flex-wrap gap-3"}>
    {ADULTS.items.map((item, index) => (
      <span
        key={item}
        className={`adult-moment inline-flex items-center gap-2.5 rounded-full border border-cream/30 bg-black/25 font-bold text-cream shadow-lg backdrop-blur-md ${
          mobile ? "px-3 py-2.5 text-xs" : "px-5 py-3 text-base"
        }`}
      >
        <span className="font-display text-xs font-black text-sun/90">
          {String(index + 1).padStart(2, "0")}
        </span>
        {item}
      </span>
    ))}
  </div>
);

const AdultsDesktopSection = () => {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const introRef = useRef(null);
  const momentsRef = useRef(null);
  const hintRef = useRef(null);
  useScrollFrameCanvas(wrapRef, canvasRef, desktopFrameUrl, { width: 1280, height: 720 });
  useScrollCopyTimeline(wrapRef, introRef, momentsRef, hintRef);

  return (
    <section
      ref={wrapRef}
      id="adultos"
      className="relative h-[350vh] bg-[#10170F] text-cream"
      data-testid="section-adults-desktop"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ height: "100svh" }}>
        <img src={DESKTOP_POSTER} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        <canvas ref={canvasRef} width={1280} height={720} className="absolute inset-0 h-full w-full object-cover" aria-hidden="true" data-testid="adults-desktop-canvas" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/75 via-black/25 to-black/10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-3/5 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1/5 bg-gradient-to-b from-black/35 to-transparent" />

        <div ref={introRef} className="absolute inset-0 z-20 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-10 lg:px-16">
            <div className="max-w-3xl">
              <p className="text-sm font-extrabold uppercase tracking-[0.3em] text-sun">{ADULTS.eyebrow}</p>
              <h2 className="mt-5 font-display text-6xl font-black leading-[0.98] tracking-tight drop-shadow-lg lg:text-7xl">{ADULTS.title}</h2>
            </div>
          </div>
        </div>

        <div ref={momentsRef} style={{ opacity: 0 }} className="absolute inset-x-0 bottom-0 z-20 pb-24">
          <div className="mx-auto max-w-7xl px-10 lg:px-16">
            <p className="mb-5 text-sm font-extrabold uppercase tracking-[0.28em] text-sun">Uma manhã pensada para aproveitar junto</p>
            <ActivityChips />
            <p className="mt-5 font-hand text-2xl text-cream drop-shadow">Enquanto os pequenos exploram, a sua hora de relaxar também chega.</p>
          </div>
        </div>

        <div ref={hintRef} className="absolute bottom-7 right-10 z-20 flex items-center gap-2.5 text-cream/85" data-testid="adults-scroll-hint">
          <span className="text-[11px] font-bold uppercase tracking-[0.28em]">Role para viver a experiência</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

const AdultsMobileSection = () => {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const introRef = useRef(null);
  const momentsRef = useRef(null);
  const hintRef = useRef(null);
  useScrollFrameCanvas(wrapRef, canvasRef, mobileFrameUrl, { width: 720, height: 1280 });
  useScrollCopyTimeline(wrapRef, introRef, momentsRef, hintRef);

  return (
    <section
      ref={wrapRef}
      id="adultos"
      className="relative h-[300vh] bg-[#10170F] text-cream"
      data-testid="section-adults-mobile"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ height: "100svh" }}>
        <img src={MOBILE_POSTER} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        <canvas ref={canvasRef} width={720} height={1280} className="absolute inset-0 h-full w-full object-cover" aria-hidden="true" data-testid="adults-mobile-canvas" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-black/10" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-3/5 bg-gradient-to-b from-black/75 via-black/25 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-3/5 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

        <div ref={introRef} className="absolute inset-x-0 top-0 z-20 px-5 pt-24">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-sun">{ADULTS.eyebrow}</p>
          <h2 className="mt-3 max-w-sm font-display text-5xl font-black leading-[0.94] tracking-tight drop-shadow-lg">
            A diversão também é <span className="text-sun">para os adultos.</span>
          </h2>
          <p className="mt-5 max-w-sm text-lg font-medium leading-relaxed text-cream drop-shadow-lg sm:text-xl">
            Um espaço pensado para os adultos se divertirem também, relaxar, jogar, conversar e muito mais.
          </p>
        </div>

        <div ref={momentsRef} style={{ opacity: 0 }} className="absolute inset-x-0 bottom-0 z-20 px-5 pb-16">
          <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-sun">Uma manhã para aproveitar junto</p>
          <ActivityChips mobile />
          <p className="mt-3 font-hand text-lg leading-tight text-cream drop-shadow">Enquanto os pequenos exploram, sua hora de relaxar também chega.</p>
        </div>

        <div ref={hintRef} className="absolute bottom-4 right-5 z-20 flex items-center gap-2 text-cream/90" data-testid="adults-mobile-scroll-hint">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Role para ver</span>
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

const AdultsStaticSection = () => (
  <section className="relative bg-forest py-24 text-cream sm:py-32" data-testid="section-adults-static">
    <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:px-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <Reveal>
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-sun sm:text-sm">{ADULTS.eyebrow}</p>
        </Reveal>
        <h2 className="mt-4 font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          <MaskedLine>A diversão não é</MaskedLine>
          <MaskedLine delay={0.1}>exclusividade de <span className="text-sun">quem é pequeno.</span></MaskedLine>
        </h2>
        <Reveal delay={0.25}>
          <div className="group relative mt-10 h-64 overflow-hidden rounded-[40px] sm:h-80">
            <img src={ADULTS.image} alt="Adultos conversando e relaxando em um encontro ao ar livre" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]" />
          </div>
        </Reveal>
      </div>

      <div>
        {ADULTS.items.map((item, index) => (
          <Reveal key={item} delay={index * 0.05}>
            <div className="group flex cursor-default items-center justify-between border-b border-cream/15 py-7 transition-colors duration-300 first:border-t hover:border-cream/40" data-testid={`adults-item-${item.toLowerCase()}`}>
              <div className="flex items-baseline gap-6">
                <span className="font-display text-sm font-bold text-sun/70">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-display text-3xl font-extrabold tracking-tight transition-all duration-300 group-hover:translate-x-2 group-hover:text-sun sm:text-4xl">{item}</span>
              </div>
              <ArrowUpRight className="h-7 w-7 -translate-x-2 text-sun opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
            </div>
          </Reveal>
        ))}
        <Reveal delay={0.2}>
          <p className="mt-8 font-hand text-2xl text-sun/90">Enquanto os pequenos exploram, a sua hora de relaxar também chega.</p>
        </Reveal>
      </div>
    </div>
  </section>
);

export const AdultsSection = () => {
  const [layout, setLayout] = useState(() => {
    if (typeof window === "undefined") return "static";
    return window.matchMedia(DESKTOP_QUERY).matches ? "desktop" : "mobile";
  });

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    const updateLayout = (event) => setLayout(event.matches ? "desktop" : "mobile");
    setLayout(media.matches ? "desktop" : "mobile");
    media.addEventListener("change", updateLayout);
    return () => media.removeEventListener("change", updateLayout);
  }, []);

  if (layout === "desktop") return <AdultsDesktopSection />;
  if (layout === "mobile") return <AdultsMobileSection />;
  return <AdultsStaticSection />;
};
