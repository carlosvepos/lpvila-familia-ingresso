import { ArrowUpRight, Baby, Ticket, Users, Clock3, Info } from "lucide-react";
import { TICKETS } from "../data/content";
import { CHECKOUT_URLS } from "../data/checkouts";
import { Reveal, MaskedLine } from "./Reveal";

const RULE_ICONS = { baby: Baby, ticket: Ticket, users: Users, clock: Clock3, info: Info };

export const CtaButton = ({ testid, className = "", href = "#ingressos", children }) => {
  return (
    <a
      href={href || undefined}
      aria-disabled={!href || undefined}
      data-testid={testid}
      className={`group inline-flex items-center gap-3 rounded-full bg-terra px-9 py-4 font-display text-base font-extrabold uppercase tracking-wide text-cream shadow-[0_18px_44px_-12px_rgba(195,90,66,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest ${!href ? "pointer-events-none opacity-60" : ""} ${className}`}
    >
      {children || TICKETS.cta}
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

      <Reveal>
        <h3 className="mt-14 font-display text-2xl font-extrabold tracking-tight text-forest sm:text-3xl">
          Ingressos individuais
        </h3>
      </Reveal>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {TICKETS.lotes.map((lote, i) => (
          <Reveal key={lote.id} delay={i * 0.08} className="h-full">
            <div
              data-testid={`tickets-card-${lote.id}`}
              className={`flex h-full flex-col rounded-[28px] p-7 transition-transform duration-300 hover:-translate-y-1.5 ${
                lote.highlight
                  ? "bg-forest text-cream shadow-[0_36px_70px_-30px_rgba(30,66,49,0.75)]"
                  : "border border-ink/[0.07] bg-[#FFFDF8] text-ink shadow-[0_24px_50px_-34px_rgba(51,38,29,0.45)]"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h4 className="font-display text-xl font-extrabold">{lote.name}</h4>
                <span
                  className={`whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em] ${
                    lote.highlight ? "bg-sun text-forest" : "bg-terra/10 text-terra"
                  }`}
                >
                  {lote.tag}
                </span>
              </div>
              <ul className="mt-6 flex-1">
                {lote.prices.map((p) => (
                  <li
                    key={p.label}
                    className={`flex items-baseline justify-between gap-3 border-t py-3.5 ${
                      lote.highlight ? "border-cream/15" : "border-ink/[0.07]"
                    }`}
                  >
                    <span className={`text-sm ${lote.highlight ? "text-cream/75" : "text-cocoa"}`}>
                      {p.label}
                    </span>
                    <span className="font-display text-2xl font-black tracking-tight">
                      {lote.id === "lote2" ? "Em breve" : p.price}
                    </span>
                  </li>
                ))}
              </ul>
              {lote.id === "lote1" && (
                <CtaButton
                  testid={`checkout-${lote.id}`}
                  href={CHECKOUT_URLS[lote.id]}
                  className="mt-5 justify-center px-5 text-sm"
                >
                  Escolher {lote.name}
                </CtaButton>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <h3 className="mt-14 font-display text-2xl font-extrabold tracking-tight text-forest sm:text-3xl">
          Combos familiares
        </h3>
      </Reveal>
      <div className="mt-6 space-y-4">
        {TICKETS.combos.map((combo, i) => (
          <Reveal key={combo.id} delay={i * 0.06}>
            <div
              data-testid={`tickets-${combo.id}`}
              className="flex flex-col gap-4 rounded-[24px] border border-ink/[0.07] bg-[#FFFDF8] p-6 shadow-[0_24px_50px_-34px_rgba(51,38,29,0.45)] transition-transform duration-300 hover:-translate-y-1 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="font-display text-base font-extrabold text-forest sm:text-lg">
                {combo.name}
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                <a href={CHECKOUT_URLS.lote1 || undefined} aria-disabled={!CHECKOUT_URLS.lote1 || undefined} aria-label={`Comprar ${combo.name} no 1º lote por ${combo.lote1}; escolha o combo no checkout`} data-testid={`checkout-${combo.id}-lote1`} className={`inline-flex items-baseline gap-2 rounded-full bg-terra px-4 py-2 text-cream transition-colors hover:bg-forest ${!CHECKOUT_URLS.lote1 ? "pointer-events-none opacity-60" : ""}`}>
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] opacity-80">
                    1º lote
                  </span>
                  <span className="font-display text-lg font-black">{combo.lote1}</span>
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <h3 className="mt-14 font-display text-2xl font-extrabold tracking-tight text-forest sm:text-3xl">
          Regras definidas
        </h3>
      </Reveal>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {TICKETS.rules.map((rule, i) => {
          const Icon = RULE_ICONS[rule.icon];
          return (
            <Reveal key={rule.text} delay={i * 0.05} className="h-full">
              <div className="flex h-full items-start gap-3.5 rounded-[22px] border border-ink/[0.06] bg-[#FFFDF8] p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-terra/10 text-terra">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="text-sm leading-relaxed text-cocoa">{rule.text}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.15}>
        <div className="mt-14 flex flex-col items-center gap-3 text-center">
          <CtaButton testid="tickets-cta" />
          <p className="text-xs text-cocoa/70">Escolha o lote acima e selecione os ingressos ou combos no checkout.</p>
        </div>
      </Reveal>
    </div>
  </section>
);
