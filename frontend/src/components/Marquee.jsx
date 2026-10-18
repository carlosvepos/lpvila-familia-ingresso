import { Star } from "lucide-react";
import { MARQUEE_ITEMS } from "../data/content";

export const Marquee = () => (
  <section
    aria-label="Vila Família"
    className="relative z-10 overflow-hidden border-y border-forest/20 bg-forest py-6"
    data-testid="marquee"
  >
    <div className="marquee-track items-center">
      {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
        <span
          key={i}
          aria-hidden={i >= MARQUEE_ITEMS.length}
          className="flex items-center whitespace-nowrap font-display text-xl font-extrabold uppercase tracking-[0.18em] text-cream sm:text-2xl"
        >
          <span className="px-8">{item}</span>
          <Star className="h-5 w-5 shrink-0 text-sun" fill="currentColor" />
        </span>
      ))}
    </div>
  </section>
);
