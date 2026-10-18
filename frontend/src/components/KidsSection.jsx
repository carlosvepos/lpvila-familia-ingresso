import { Blocks, HeartHandshake, Baby, Puzzle } from "lucide-react";
import { KIDS } from "../data/content";
import { Reveal, MaskedLine } from "./Reveal";

const ICONS = { blocks: Blocks, heart: HeartHandshake, baby: Baby, puzzle: Puzzle };

export const KidsSection = () => (
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
          <p className="max-w-md text-base leading-relaxed text-cocoa sm:text-lg">
            {KIDS.intro}
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <div className="group relative h-[320px] overflow-hidden rounded-[40px] sm:h-[460px]">
            <img
              src={KIDS.image}
              alt="Crianças brincando em estrutura de playground"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
            />
            <span className="absolute bottom-5 left-5 rounded-full bg-cream/90 px-5 py-2 font-display text-sm font-bold text-forest backdrop-blur">
              Uma tarde inteira de playground
            </span>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
          {KIDS.items.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="flex h-full items-start gap-4 rounded-[28px] border border-ink/[0.06] bg-[#FFFDF8] p-6 shadow-[0_20px_44px_-30px_rgba(51,38,29,0.35)] transition-transform duration-300 hover:-translate-y-1">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-terra/10 text-terra">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-extrabold text-forest">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-cocoa">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);
