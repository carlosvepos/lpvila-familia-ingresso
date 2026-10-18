import { ArrowUpRight } from "lucide-react";
import { ADULTS } from "../data/content";
import { Reveal, MaskedLine } from "./Reveal";

export const AdultsSection = () => (
  <section className="relative bg-forest py-24 text-cream sm:py-32" data-testid="section-adults">
    <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:px-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <Reveal>
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-sun sm:text-sm">
            {ADULTS.eyebrow}
          </p>
        </Reveal>
        <h2 className="mt-4 font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          <MaskedLine>A diversão não é</MaskedLine>
          <MaskedLine delay={0.1}>
            exclusividade de <span className="text-sun">quem é pequeno.</span>
          </MaskedLine>
        </h2>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-md text-base leading-relaxed text-cream/75 sm:text-lg">
            {ADULTS.intro}
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="group relative mt-10 h-64 overflow-hidden rounded-[40px] sm:h-80">
            <img
              src={ADULTS.image}
              alt="Adultos conversando e relaxando em um encontro ao ar livre"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
            />
          </div>
        </Reveal>
      </div>

      <div>
        {ADULTS.items.map((item, i) => (
          <Reveal key={item} delay={i * 0.05}>
            <div
              className="group flex cursor-default items-center justify-between border-b border-cream/15 py-7 transition-colors duration-300 first:border-t hover:border-cream/40"
              data-testid={`adults-item-${item.toLowerCase()}`}
            >
              <div className="flex items-baseline gap-6">
                <span className="font-display text-sm font-bold text-sun/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-3xl font-extrabold tracking-tight transition-all duration-300 group-hover:translate-x-2 group-hover:text-sun sm:text-4xl">
                  {item}
                </span>
              </div>
              <ArrowUpRight className="h-7 w-7 -translate-x-2 text-sun opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
            </div>
          </Reveal>
        ))}
        <Reveal delay={0.2}>
          <p className="mt-8 font-hand text-2xl text-sun/90">
            Enquanto os pequenos exploram, a sua hora de relaxar também chega.
          </p>
        </Reveal>
      </div>
    </div>
  </section>
);
