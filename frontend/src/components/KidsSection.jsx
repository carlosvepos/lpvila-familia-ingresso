import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Blocks, HeartHandshake, Baby, Puzzle } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { KIDS } from "../data/content";
import { Reveal, MaskedLine } from "./Reveal";

const ICONS = { blocks: Blocks, heart: HeartHandshake, baby: Baby, puzzle: Puzzle };
const VISUALS = [
  {
    src: "/img/kids-recreation-net.webp",
    alt: "Criança atravessando uma ponte suspensa na recreação",
  },
  { src: KIDS.image, alt: "Crianças se divertindo no playground" },
  { src: KIDS.babyImage, alt: "Espaço Baby seguro e acolhedor para os pequenos" },
  { src: KIDS.structureImage, alt: "Estrutura infantil para brincar e explorar" },
];

gsap.registerPlugin(ScrollTrigger);

export const KidsSection = () => {
  const [activeVisual, setActiveVisual] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    const triggers = itemRefs.current.map((item, index) => {
      if (!item) return null;
      return ScrollTrigger.create({
        trigger: item,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveVisual(index),
        onEnterBack: () => setActiveVisual(index),
      });
    });

    return () => triggers.forEach((trigger) => trigger?.kill());
  }, []);

  return (
    <section id="criancas" className="relative py-24 sm:py-32" data-testid="section-kids">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-terra sm:text-sm">
                {KIDS.eyebrow}
              </p>
            </Reveal>
            <h2 className="mt-4 font-display text-4xl font-black leading-[1.05] tracking-tight text-forest sm:text-5xl lg:text-6xl">
              <MaskedLine>Feito para eles</MaskedLine>
              <MaskedLine delay={0.1}>
                brincarem <span className="text-terra">sem parar.</span>
              </MaskedLine>
            </h2>
          </div>
          <Reveal delay={0.15} className="lg:col-span-5">
            <p className="max-w-md text-base leading-relaxed text-cocoa sm:text-lg">{KIDS.intro}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-24">
              <div className="group relative h-[320px] overflow-hidden rounded-[40px] bg-forest sm:h-[460px]">
                {VISUALS.map((visual, index) => (
                  <img
                    key={visual.src + index}
                    src={visual.src}
                    alt={visual.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
                      activeVisual === index ? "opacity-100" : "opacity-0"
                    }`}
                    data-testid={`kids-scroll-visual-${index + 1}`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <span className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-cream/90 px-5 py-2 font-display text-sm font-bold text-forest shadow-lg backdrop-blur">
                  <span className="mr-2 text-terra">{String(activeVisual + 1).padStart(2, "0")}</span>
                  {KIDS.items[activeVisual]?.title || "Recreação"}
                </span>
                <span className="absolute bottom-6 right-6 font-display text-xs font-bold tracking-[0.2em] text-white/90">
                  {String(activeVisual + 1).padStart(2, "0")} / {String(VISUALS.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {KIDS.items.map((item, index) => {
              const Icon = ICONS[item.icon];
              return (
                <div
                  key={item.title}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  className="kids-activity-marker"
                  data-testid={`kids-activity-${index + 1}`}
                >
                  <Reveal delay={index * 0.08} className="h-full">
                    <div className="flex h-full flex-col items-start gap-4 rounded-[28px] border border-ink/[0.06] bg-[#FFFDF8] p-5 shadow-[0_20px_44px_-30px_rgba(51,38,29,0.35)] transition-transform duration-300 hover:-translate-y-1 sm:p-6">
                      <img
                        src={VISUALS[index].src}
                        alt={VISUALS[index].alt}
                        loading="lazy"
                        className="h-36 w-full rounded-[20px] object-cover lg:hidden"
                      />
                      <div className="flex items-start gap-4">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-terra/10 text-terra">
                          <Icon className="h-6 w-6" />
                        </span>
                        <div>
                          <h3 className="font-display text-lg font-extrabold text-forest">{item.title}</h3>
                          <p className="mt-1 text-sm leading-relaxed text-cocoa">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
