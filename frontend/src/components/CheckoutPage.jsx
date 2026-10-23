import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Ticket,
} from "lucide-react";
import { CONTACTS, EVENT, TICKETS } from "../data/content";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const amountFromPrice = (price) => Number(String(price).replace(/\D/g, ""));

const ticketGroups = TICKETS.lotes
  .filter((lote) => lote.id === "lote1")
  .map((lote) => ({
    id: lote.id,
    title: lote.name,
    subtitle: lote.tag,
    options: lote.prices.map((item, index) => ({
      id: `${lote.id}-individual-${index}`,
      name: item.label,
      price: amountFromPrice(item.price),
      unit: "por ingresso",
    })),
  }));

const comboOptions = TICKETS.combos.map((combo) => ({
  id: `${combo.id}-lote1`,
  name: combo.name,
  price: amountFromPrice(combo.lote1),
  unit: "por combo",
}));

const allOptions = [...ticketGroups.flatMap((group) => group.options), ...comboOptions];

export const CheckoutPage = () => {
  const [quantities, setQuantities] = useState({});
  const [responsibleName, setResponsibleName] = useState("");

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Checkout | Vila Família";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  const selected = useMemo(
    () => allOptions
      .map((option) => ({ ...option, quantity: quantities[option.id] || 0 }))
      .filter((option) => option.quantity > 0),
    [quantities],
  );
  const total = selected.reduce((sum, option) => sum + option.price * option.quantity, 0);
  const selectedCount = selected.reduce((sum, option) => sum + option.quantity, 0);

  const updateQuantity = (id, difference) => {
    setQuantities((current) => ({
      ...current,
      [id]: Math.max(0, (current[id] || 0) + difference),
    }));
  };

  const message = [
    `Olá! Quero continuar minha inscrição para o ${EVENT.name}.`,
    responsibleName.trim() ? `Responsável: ${responsibleName.trim()}` : null,
    "",
    "Minha seleção:",
    ...selected.map((item) => `${item.quantity}x ${item.name} — ${currency.format(item.price * item.quantity)}`),
    `Total estimado: ${currency.format(total)}`,
    "Pode me orientar sobre a disponibilidade e a forma de pagamento?",
  ].filter((line) => line !== null).join("\n");
  const whatsappHref = selectedCount > 0
    ? `${CONTACTS.whatsapp}?text=${encodeURIComponent(message)}`
    : null;

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="relative overflow-hidden bg-forest pb-12 pt-32 text-cream sm:pb-16 sm:pt-40">
        <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full border border-cream/10 sm:right-8 sm:top-8" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <a
            href="/#ingressos"
            className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-sm font-semibold text-cream/80 transition-colors hover:border-sun hover:text-sun"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar aos ingressos
          </a>
          <p className="mt-9 text-xs font-extrabold uppercase tracking-[0.28em] text-sun sm:text-sm">
            {EVENT.name} · {EVENT.date}
          </p>
          <h1 className="mt-3 font-display text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            Sua família tem lugar no Vila.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-cream/75 sm:text-lg">
            Escolha os ingressos ou um combo familiar e confira o resumo antes de continuar.
          </p>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-8 px-6 py-10 pb-32 sm:px-10 sm:py-14 sm:pb-36 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12 lg:px-16 lg:pb-14">
        <div className="space-y-10">
          <section aria-labelledby="individual-title">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-terra/10 text-terra">
                <Ticket className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 id="individual-title" className="font-display text-2xl font-extrabold text-forest sm:text-3xl">
                  Ingressos individuais
                </h2>
                <p className="mt-1 text-sm text-cocoa">Selecione as quantidades para sua família.</p>
              </div>
            </div>

            <div className="space-y-5">
              {ticketGroups.map((group) => (
                <div key={group.id} className="overflow-hidden rounded-[24px] border border-ink/[0.08] bg-[#FFFDF8] shadow-[0_20px_48px_-38px_rgba(51,38,29,0.45)]">
                  <div className={`flex flex-wrap items-center justify-between gap-2 px-5 py-4 sm:px-6 ${group.id === "lote1" ? "bg-forest text-cream" : "bg-white"}`}>
                    <h3 className={`font-display text-lg font-extrabold ${group.id === "lote1" ? "text-cream" : "text-forest"}`}>
                      {group.title}
                    </h3>
                    <span className={`text-xs font-bold uppercase tracking-[0.12em] ${group.id === "lote1" ? "text-sun" : "text-terra"}`}>
                      {group.subtitle}
                    </span>
                  </div>
                  <div className="divide-y divide-ink/[0.07] px-5 sm:px-6">
                    {group.options.map((option) => (
                      <ProductRow
                        key={option.id}
                        option={option}
                        quantity={quantities[option.id] || 0}
                        onChange={updateQuantity}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </section>

          <section aria-labelledby="combos-title">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-sun/25 text-forest">
                <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 id="combos-title" className="font-display text-2xl font-extrabold text-forest sm:text-3xl">
                  Combos familiares
                </h2>
                <p className="mt-1 text-sm text-cocoa">Escolha um combo do 1º lote.</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-[24px] border border-ink/[0.08] bg-[#FFFDF8] px-5 sm:px-6">
              {comboOptions.map((option) => (
                <ProductRow
                  key={option.id}
                  option={option}
                  quantity={quantities[option.id] || 0}
                  onChange={updateQuantity}
                />
              ))}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-cocoa/75">
              Os valores dos combos seguem as condições do 1º lote.
            </p>
          </section>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-forest">Nome do responsável <span className="font-normal text-cocoa/70">(opcional)</span></span>
            <input
              type="text"
              value={responsibleName}
              onChange={(event) => setResponsibleName(event.target.value)}
              autoComplete="name"
              placeholder="Como podemos chamar você?"
              className="w-full rounded-2xl border border-ink/10 bg-[#FFFDF8] px-4 py-3.5 text-base text-ink outline-none transition focus:border-terra focus:ring-2 focus:ring-terra/15"
            />
          </label>
        </div>

        <aside className="h-fit rounded-[28px] border border-ink/[0.08] bg-[#FFFDF8] p-6 shadow-[0_28px_60px_-36px_rgba(51,38,29,0.5)] lg:sticky lg:top-28 sm:p-7" aria-label="Resumo da inscrição">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-extrabold text-forest">Resumo</h2>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-sun/25 text-forest">
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            </span>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-cocoa">{EVENT.date} · {EVENT.time}</p>
          <p className="text-sm leading-relaxed text-cocoa">{EVENT.place}</p>

          <div className="my-5 border-t border-ink/10" />
          {selected.length === 0 ? (
            <p className="py-4 text-sm leading-relaxed text-cocoa/75" aria-live="polite">
              Sua seleção aparecerá aqui. Use os botões + e − para escolher as quantidades.
            </p>
          ) : (
            <ul className="space-y-4" aria-live="polite">
              {selected.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-4 text-sm">
                  <span className="leading-relaxed text-cocoa">{item.quantity} × {item.name}</span>
                  <span className="shrink-0 font-bold text-ink">{currency.format(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="my-5 border-t border-ink/10" />
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-bold text-forest">Total estimado</span>
            <span className="font-display text-3xl font-black tracking-tight text-terra">{currency.format(total)}</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-cocoa/70">
            O atendimento confirma a disponibilidade e orienta a finalização e o pagamento.
          </p>

          {whatsappHref ? (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="mt-6 hidden w-full items-center justify-center gap-2 rounded-full bg-terra px-5 py-4 text-center text-sm font-extrabold text-cream transition-all hover:-translate-y-0.5 hover:bg-forest lg:inline-flex"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Continuar pelo WhatsApp
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="mt-6 hidden w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-ink/10 px-5 py-4 text-center text-sm font-extrabold text-cocoa/55 lg:inline-flex"
            >
              Selecione seus ingressos
            </button>
          )}

          <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-cocoa/70">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-forest" aria-hidden="true" />
            Nenhum dado de cartão é solicitado nesta página. A conversa será iniciada somente quando você clicar no botão.
          </p>
        </aside>
      </main>
      <div
        className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-[#FFFDF8]/95 px-5 pt-3 shadow-[0_-12px_35px_-18px_rgba(51,38,29,0.45)] backdrop-blur lg:hidden"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
        data-testid="checkout-sticky-bar"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-cocoa">Total</p>
            <p className="truncate font-display text-2xl font-black leading-none text-forest" aria-live="polite">
              {currency.format(total)}
            </p>
          </div>
          {whatsappHref ? (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              aria-label={`Comprar ingressos, total ${currency.format(total)}`}
              className="inline-flex min-w-[120px] items-center justify-center gap-2 rounded-full bg-terra px-6 py-3.5 text-sm font-extrabold text-cream shadow-lg transition hover:bg-forest"
              data-testid="checkout-sticky-buy"
            >
              Comprar
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : (
            <button
              type="button"
              disabled
              aria-label="Selecione ingressos para comprar"
              className="inline-flex min-w-[120px] cursor-not-allowed items-center justify-center rounded-full bg-ink/10 px-6 py-3.5 text-sm font-extrabold text-cocoa/55"
              data-testid="checkout-sticky-buy"
            >
              Comprar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductRow = ({ option, quantity, onChange }) => (
  <div className="flex items-center justify-between gap-4 py-4 sm:py-5">
    <div className="min-w-0">
      <p className="font-semibold leading-snug text-ink">{option.name}</p>
      <p className="mt-1 text-sm text-cocoa/80">{currency.format(option.price)} <span className="text-cocoa/60">{option.unit}</span></p>
    </div>
    <div className="flex shrink-0 items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(option.id, -1)}
        disabled={quantity === 0}
        aria-label={`Remover uma unidade: ${option.name}`}
        className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-forest transition hover:border-terra hover:text-terra disabled:cursor-not-allowed disabled:opacity-35"
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <span className="w-6 text-center font-bold tabular-nums text-forest" aria-label={`${quantity} selecionados`}>
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(option.id, 1)}
        aria-label={`Adicionar uma unidade: ${option.name}`}
        className="grid h-9 w-9 place-items-center rounded-full bg-forest text-cream transition hover:bg-terra"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  </div>
);
