import { useState } from "react";
import {
  ArrowLeft,
  Baby,
  CalendarDays,
  Check,
  Clock3,
  Info,
  MapPin,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Ticket,
  Users,
} from "lucide-react";
import { EVENT, TICKETS } from "../data/content";
import { GHL_CHECKOUT_URLS } from "../data/checkouts";

const RULE_ICONS = { baby: Baby, ticket: Ticket, users: Users, clock: Clock3, info: Info };

const parsePrice = (value) =>
  Number(value.replace(/[^\d,.-]/g, "").replace(/\.(?=\d{3}(?:,|$))/g, "").replace(",", "."));

const formatPrice = (value) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export const CheckoutPage = ({ loteId }) => {
  const lote = TICKETS.lotes.find((item) => item.id === loteId) || TICKETS.lotes[0];
  const [quantities, setQuantities] = useState({});
  const availableCombos = TICKETS.combos.filter((combo) => combo[lote.id]);
  const offers = [
    ...lote.prices.map((item, index) => ({
      id: `${lote.id}-ticket-${index}`,
      name: item.label,
      price: item.price,
      type: "Ingresso individual",
    })),
    ...availableCombos.map((combo) => ({
      id: `${lote.id}-${combo.id}`,
      name: combo.name,
      price: combo[lote.id],
      type: "Combo familiar",
    })),
  ];

  const selectedOffers = offers.filter((offer) => (quantities[offer.id] || 0) > 0);
  const totalQuantity = selectedOffers.reduce((sum, offer) => sum + quantities[offer.id], 0);
  const total = selectedOffers.reduce(
    (sum, offer) => sum + parsePrice(offer.price) * quantities[offer.id],
    0,
  );
  const officialLinkAvailable = Boolean(GHL_CHECKOUT_URLS[lote.id]);

  const updateQuantity = (offerId, change) => {
    setQuantities((current) => ({
      ...current,
      [offerId]: Math.max(0, (current[offerId] || 0) + change),
    }));
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-cream text-ink">
      <header className="border-b border-ink/10 bg-cream/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <a href="/#ingressos" aria-label="Voltar às informações do evento Vila Família">
            <img src="/img/logo-green.png" alt="Vila Família" className="h-9 w-auto sm:h-11" />
          </a>
          <a
            href="/#ingressos"
            className="inline-flex min-h-10 items-center gap-2 rounded-full px-3 py-2 text-xs font-bold text-forest transition-colors hover:bg-forest/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Voltar ao evento</span>
          </a>
        </div>
      </header>

      <main className="relative isolate">
        <div className="pointer-events-none absolute -right-28 top-8 -z-10 h-72 w-72 rounded-full bg-sun/20 blur-3xl sm:h-[28rem] sm:w-[28rem]" />
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-9 sm:px-8 sm:pb-24 sm:pt-14">
          <div className="mb-8 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-cocoa/70">
            <span>Ingressos</span><span aria-hidden="true">/</span>
            <span className="text-terra">Prévia de compra</span>
          </div>

          <div className="grid gap-9 lg:grid-cols-[minmax(0,1fr)_370px] lg:items-start lg:gap-12">
            <div>
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-terra sm:text-sm">
                    1º Encontro Vila Família
                  </p>
                  <h1 className="mt-3 max-w-2xl font-display text-4xl font-black leading-[1.03] tracking-tight text-forest sm:text-5xl lg:text-6xl">
                    Um dia especial começa com a sua família.
                  </h1>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-cocoa sm:text-lg">
                    Escolha o lote, selecione os ingressos ou combos e confira uma estimativa do total.
                  </p>
                </div>
                <span className="rounded-full bg-forest/8 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-forest">
                  Prévia local
                </span>
              </div>

              <section aria-label="Informações do evento" className="mt-7 rounded-[26px] border border-forest/10 bg-white/80 p-5 shadow-[0_24px_55px_-42px_rgba(30,66,49,0.45)] sm:p-6">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                  <p className="flex items-center gap-2.5 text-sm font-bold text-forest">
                    <CalendarDays className="h-4 w-4 text-terra" aria-hidden="true" />
                    {EVENT.date}
                  </p>
                  <p className="flex items-center gap-2.5 text-sm font-bold text-forest">
                    <Clock3 className="h-4 w-4 text-terra" aria-hidden="true" />
                    {EVENT.time}
                  </p>
                  <p className="flex items-center gap-2.5 text-sm font-bold text-forest">
                    <MapPin className="h-4 w-4 text-terra" aria-hidden="true" />
                    {EVENT.place}
                  </p>
                </div>
              </section>

              <section aria-labelledby="lot-title" className="mt-9">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-terra">Escolha o lote</p>
                    <h2 id="lot-title" className="mt-1 font-display text-2xl font-black text-forest sm:text-3xl">
                      Ingressos do {lote.name}
                    </h2>
                  </div>
                  <span className="rounded-full bg-sun/30 px-3 py-1.5 text-xs font-extrabold text-forest">{lote.tag}</span>
                </div>

                <nav aria-label="Selecionar lote" className="mt-5 grid grid-cols-3 gap-2 rounded-full bg-forest/[0.06] p-1.5">
                  {TICKETS.lotes.map((option) => {
                    const active = option.id === lote.id;
                    return (
                      <a
                        key={option.id}
                        href={`/?checkout=${option.id}`}
                        aria-current={active ? "page" : undefined}
                        className={`flex min-h-11 items-center justify-center gap-1.5 rounded-full px-2 text-xs font-extrabold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra sm:gap-2 sm:text-sm ${
                          active ? "bg-forest text-cream shadow-sm" : "text-cocoa hover:bg-white/80 hover:text-forest"
                        }`}
                      >
                        {active && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                        {option.name}
                      </a>
                    );
                  })}
                </nav>
              </section>

              <section aria-label="Opções de ingresso" className="mt-6 space-y-3">
                {offers.map((offer) => {
                  const quantity = quantities[offer.id] || 0;
                  return (
                    <article key={offer.id} className="flex flex-col gap-4 rounded-[24px] border border-ink/10 bg-white/85 p-4 shadow-[0_18px_45px_-38px_rgba(51,38,29,0.5)] sm:flex-row sm:items-center sm:justify-between sm:p-5">
                      <div className="flex min-w-0 items-start gap-3">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-terra/10 text-terra">
                          {offer.type === "Combo familiar" ? <Users className="h-5 w-5" aria-hidden="true" /> : <Ticket className="h-5 w-5" aria-hidden="true" />}
                        </span>
                        <div className="min-w-0">
                          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-terra">{offer.type}</p>
                          <h3 className="mt-1 font-display text-base font-extrabold leading-snug text-forest sm:text-lg">{offer.name}</h3>
                          <p className="mt-1 text-sm text-cocoa/75">{offer.price} <span className="text-xs">por unidade</span></p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-4 sm:justify-end">
                        <p className="min-w-20 text-right font-display text-lg font-black text-forest sm:text-xl">
                          {formatPrice(parsePrice(offer.price) * quantity)}
                        </p>
                        <div className="flex items-center gap-2 rounded-full border border-forest/15 bg-cream p-1" aria-label={`Quantidade de ${offer.name}`}>
                          <button
                            type="button"
                            onClick={() => updateQuantity(offer.id, -1)}
                            disabled={quantity === 0}
                            aria-label={`Diminuir ${offer.name}`}
                            className="grid h-9 w-9 place-items-center rounded-full text-forest transition-colors hover:bg-forest/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-terra disabled:cursor-not-allowed disabled:opacity-35"
                          >
                            <Minus className="h-4 w-4" aria-hidden="true" />
                          </button>
                          <output aria-live="polite" className="min-w-6 text-center text-sm font-extrabold text-forest">{quantity}</output>
                          <button
                            type="button"
                            onClick={() => updateQuantity(offer.id, 1)}
                            aria-label={`Adicionar ${offer.name}`}
                            className="grid h-9 w-9 place-items-center rounded-full bg-forest text-cream transition-colors hover:bg-terra focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-terra"
                          >
                            <Plus className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </section>

              <section aria-labelledby="rules-title" className="mt-8 rounded-[24px] bg-sun/15 p-5 sm:p-6">
                <h2 id="rules-title" className="font-display text-lg font-extrabold text-forest">Regras importantes</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {TICKETS.rules.map((rule) => {
                    const Icon = RULE_ICONS[rule.icon] || Info;
                    return (
                      <li key={rule.text} className="flex items-start gap-2.5 text-sm leading-relaxed text-cocoa">
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-terra" aria-hidden="true" />
                        <span>{rule.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </div>

            <aside aria-labelledby="summary-title" className="lg:sticky lg:top-8 lg:self-start">
              <div className="overflow-hidden rounded-[30px] bg-forest text-cream shadow-[0_34px_75px_-38px_rgba(20,42,30,0.65)]">
                <div className="border-b border-cream/10 px-6 py-6 sm:px-7">
                  <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-sun">Resumo do pedido</p>
                  <h2 id="summary-title" className="mt-2 font-display text-2xl font-black">{lote.name}</h2>
                  <p className="mt-1 text-sm text-cream/65">{EVENT.name}</p>
                </div>
                <div className="px-6 py-6 sm:px-7">
                  {selectedOffers.length > 0 ? (
                    <ul className="space-y-4">
                      {selectedOffers.map((offer) => (
                        <li key={offer.id} className="flex justify-between gap-3 text-sm">
                          <span className="min-w-0 text-cream/75">{quantities[offer.id]} × {offer.name}</span>
                          <span className="shrink-0 font-bold">{formatPrice(parsePrice(offer.price) * quantities[offer.id])}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="rounded-2xl bg-cream/[0.08] p-4 text-sm text-cream/70">
                      <ShoppingBag className="mb-2 h-5 w-5 text-sun" aria-hidden="true" />
                      Escolha os ingressos para montar seu pedido.
                    </div>
                  )}
                  <div className="mt-5 flex items-center justify-between border-t border-cream/15 pt-5 text-sm text-cream/70">
                    <span>Quantidade</span><span>{totalQuantity}</span>
                  </div>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <span className="font-bold text-cream">Total estimado</span>
                    <span className="font-display text-2xl font-black text-sun" aria-live="polite">{formatPrice(total)}</span>
                  </div>

                  <div className="mt-6 rounded-2xl bg-cream/[0.08] p-4">
                    <div className="flex gap-3">
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-sun" aria-hidden="true" />
                      <p className="text-sm leading-relaxed text-cream/75">
                        A compra será concluída no checkout oficial GHL/Mercado Pago quando o link real estiver disponível.
                      </p>
                    </div>
                  </div>
                  <button type="button" disabled aria-disabled="true" className="mt-5 inline-flex min-h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-cream/15 px-5 py-3 text-center font-extrabold text-cream/55">
                    Finalizar no checkout oficial
                    <ArrowLeft className="h-4 w-4 rotate-180" aria-hidden="true" />
                  </button>
                  <p className="mt-3 text-center text-xs leading-relaxed text-cream/55" role="status">
                    {officialLinkAvailable
                      ? "Esta prévia ainda não transfere o carrinho nem inicia cobranças."
                      : "Prévia local: o botão será ativado após conectar o link oficial e o carrinho."}
                  </p>
                </div>
              </div>
              <a href="/#ingressos" className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-forest/15 px-5 py-3 text-sm font-bold text-forest transition-colors hover:bg-forest/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Voltar às informações do evento
              </a>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};
