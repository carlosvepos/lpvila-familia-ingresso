import { Reveal, MaskedLine } from "./Reveal";
import { CtaButton } from "./TicketsSection";
import { EVENT, INVITE } from "../data/content";

export const InviteSection = () => (
  <section className="relative bg-forest py-28 text-center sm:py-36" data-testid="section-invite">
    <div className="mx-auto max-w-4xl px-6 sm:px-10">
      <Reveal>
        <p className="font-hand text-4xl text-sun sm:text-5xl">Vem viver</p>
      </Reveal>
      <h2 className="mt-3 font-display text-4xl font-black leading-[1.06] tracking-tight text-cream sm:text-6xl lg:text-7xl">
        <MaskedLine>o primeiro Vila</MaskedLine>
        <MaskedLine delay={0.1}>
          com <span className="text-sun">a gente.</span>
        </MaskedLine>
      </h2>
      <Reveal delay={0.25}>
        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-cream/70 sm:text-lg">
          {EVENT.date} · {EVENT.time} · {EVENT.place}
        </p>
      </Reveal>
      <Reveal delay={0.35}>
        <div className="mt-10">
          <CtaButton testid="invite-cta" label={INVITE.cta} />
        </div>
      </Reveal>
    </div>
  </section>
);
