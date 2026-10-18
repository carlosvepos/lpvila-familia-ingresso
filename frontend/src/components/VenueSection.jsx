import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sun, Wind, Coffee } from "lucide-react";
import { VENUE } from "../data/content";
import { Reveal, MaskedLine } from "./Reveal";

const ICONS = { sun: Sun, wind: Wind, coffee: Coffee };

export const VenueSection = () => {
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);

  return (
    <section className="relative overflow-hidden py-24 sm:py-32" data-testid="section-venue">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-terra sm:text-sm">
                {VENUE.eyebrow}
              </p>
            </Reveal>
            <h2 className="mt-4 font-display text-4xl font-black leading-[1.05] tracking-tight text-forest sm:text-5xl lg:text-6xl">
              <MaskedLine>
                {VENUE.title} <span className="text-terra">te espera.</span>
              </MaskedLine>
            </h2>
          </div>
          <Reveal delay={0.15} className="lg:col-span-5">
            <p className="max-w-md text-base leading-relaxed text-cocoa sm:text-lg">
              {VENUE.subtitle}
            </p>
          </Reveal>
        </div>
      </div>

      <div ref={imgRef} className="relative mt-14 h-[58vh] overflow-hidden sm:h-[68vh]">
        <motion.img
          style={{ y }}
          src={VENUE.image}
          alt="Espaço externo acolhedor do Quintal da Alegria"
          loading="lazy"
          className="h-[118%] w-full object-cover"
        />
      </div>

      <div className="mx-auto -mt-14 max-w-4xl px-6 sm:px-10">
        <Reveal>
          <div className="grid gap-4 rounded-[32px] border border-ink/[0.06] bg-cream p-6 shadow-[0_36px_80px_-40px_rgba(51,38,29,0.5)] sm:grid-cols-3 sm:p-8">
            {VENUE.features.map((f) => {
              const Icon = ICONS[f.icon];
              return (
                <div
                  key={f.label}
                  className="flex items-center gap-3.5 sm:flex-col sm:gap-3 sm:text-center"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-forest/[0.07] text-forest">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="font-display text-base font-bold text-forest sm:text-lg">
                    {f.label}
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
