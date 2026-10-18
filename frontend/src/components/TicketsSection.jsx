import { ArrowUpRight, User, HeartHandshake, Baby, Blocks, Check } from "lucide-react";
import { TICKETS, TICKETS_URL } from "../data/content";
import { Reveal, MaskedLine } from "./Reveal";

const ICONS = { user: User, heart: HeartHandshake, baby: Baby, blocks: Blocks };

export const CtaButton = ({ testid, className = "" }) => {
  const href = TICKETS_URL;
  return (
    <a
      href={href || "#"}
      target={href ? "_blank" : undefined}
      rel={href ? "noreferrer" : undefined}
      onClick={(e) => {
        if (!href) e.preventDefault();
      }}
      data-testid={testid}
      className={`group inline-flex items-center gap-3 rounded-full bg-terra px-9 py-4 font-display text-base font-extrabold uppercase tracking-wide text-cream shadow-[0_18px_44px_-12px_rgba(195,90,66,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest ${className}`}
    >
      {TICKETS.cta}
      <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
};

export const TicketsSection = () => (
  <section id="ingressos" className="relative bg-sun/20 py-24 sm:py-32" data-testid="section-tickets">
    <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
      <div className="max-w-2xl">
        <Reveal>
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-terra sm:text-sm">
            {TICKETS.eyebrow}
          </p>
        </Reveal>
        <h2 className="mt-4 font-display text-4xl font-black leading-[1.05] tracking-tight text-forest sm:text-5xl lg:text-6xl">
          <MaskedLine>Garanta o seu lugar</MaskedLine>
          <MaskedLine delay={0.1}>
            no <span className="text-terra">primeiro Vila.</span>
          </MaskedLine>
        </h2>
        <Reveal delay={0.2}>
          <p className="mt-5 text-base leading-relaxed text-cocoa sm:text-lg">{TICKETS.intro}</p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {TICKETS.plans.map((plan, i) => {
          const Icon = ICONS[plan.icon];
          return (
            <Reveal key={plan.id} delay={i * 0.08} className="h-full">
              <div
                data-testid={`tickets-card-${plan.id}`}
                className={`flex h-full flex-col rounded-[28px] p-7 transition-transform duration-300 hover:-translate-y-1.5 ${
                  plan.highlight
                    ? "bg-forest text-cream shadow-[0_36px_70px_-30px_rgba(30,66,49,0.75)]"
                    : "border border-ink/[0.07] bg-[#FFFDF8] text-ink shadow-[0_24px_50px_-34px_rgba(51,38,29,0.45)]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-full ${
                      plan.highlight ? "bg-sun/15 text-sun" : "bg-terra/10 text-terra"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  {plan.tag && (
                    <span className="rounded-full bg-sun px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-forest">
                      {plan.tag}
                    </span>
                  )}
                </div>
                <h3 className="mt-5 font-display text-lg font-extrabold">{plan.name}</h3>
                <p className="mt-2 font-display text-5xl font-black tracking-tight">
                  {plan.price}
                </p>
                <p
                  className={`mt-3 flex-1 text-sm leading-relaxed ${
                    plan.highlight ? "text-cream/75" : "text-cocoa"
                  }`}
                >
                  {plan.desc}
                </p>
                <ul
                  className={`mt-5 space-y-1.5 text-xs ${
                    plan.highlight ? "text-cream/60" : "text-cocoa/70"
                  }`}
                >
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-sun" /> Acesso 14h às 18h
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-sun" /> Todas as experiências incluídas
                  </li>
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.15}>
        <div className="mt-14 flex flex-col items-center gap-3 text-center">
          <CtaButton testid="tickets-cta" />
          <p className="text-xs text-cocoa/70">{TICKETS.note}</p>
        </div>
      </Reveal>
    </div>
  </section>
);
