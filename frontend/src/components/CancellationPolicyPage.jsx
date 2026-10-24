import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight, MessageCircle } from "lucide-react";
import { CONTACTS } from "../data/content";

const sections = [
  {
    number: "01",
    title: "Direito de arrependimento",
    paragraphs: [
      "Para inscrições realizadas pela internet, o participante poderá solicitar o cancelamento em até 7 dias corridos após a contratação, com reembolso integral dos valores pagos, conforme o artigo 49 do Código de Defesa do Consumidor e a legislação aplicável.",
      "O pedido deverá ser realizado pelo canal oficial de atendimento do Vila Família.",
    ],
  },
  {
    number: "02",
    title: "Desistência após o prazo legal",
    paragraphs: [
      "Após o prazo de arrependimento, solicitações de cancelamento por motivos pessoais serão analisadas conforme a legislação aplicável e as condições informadas no momento da inscrição.",
      "Como alternativa, o participante poderá solicitar a transferência gratuita da inscrição para outra família.",
    ],
  },
  {
    number: "03",
    title: "Transferência da inscrição",
    paragraphs: [
      "Caso a família não possa comparecer, poderá transferir gratuitamente sua inscrição para outra família, mediante atualização dos dados dos participantes.",
      "A transferência deverá ser solicitada pelo canal oficial do Vila Família, permitindo a identificação dos novos participantes e a atualização da lista de credenciamento.",
    ],
  },
  {
    number: "04",
    title: "Não comparecimento",
    paragraphs: [
      "O não comparecimento ao evento, sem solicitação prévia de cancelamento ou transferência, não gera automaticamente direito a reembolso, ressalvadas as hipóteses previstas em lei.",
    ],
  },
  {
    number: "05",
    title: "Cancelamento pela organização",
    paragraphs: [
      "Caso o Vila Experiências seja cancelado pela organização, os participantes terão direito ao reembolso integral dos valores pagos, incluindo eventuais taxas cobradas na aquisição da inscrição.",
    ],
  },
  {
    number: "06",
    title: "Adiamento ou alteração relevante",
    paragraphs: [
      "Caso o evento seja adiado ou sofra alteração relevante, os participantes serão comunicados pelos canais cadastrados e poderão escolher entre:",
    ],
    options: [
      "Manter a inscrição para a nova data;",
      "Receber crédito para uma edição futura;",
      "Solicitar o reembolso integral dos valores pagos.",
    ],
  },
  {
    number: "07",
    title: "Procedimento de reembolso",
    paragraphs: [
      "Quando devido, o reembolso será realizado preferencialmente pelo mesmo meio utilizado na compra, observados os prazos legais e os procedimentos da instituição de pagamento.",
      "O participante receberá a confirmação do processamento da solicitação.",
    ],
  },
  {
    number: "08",
    title: "Atendimento",
    paragraphs: [
      "As solicitações de cancelamento, transferência ou reembolso deverão ser encaminhadas ao canal oficial de atendimento do Vila Família, informando o nome do responsável e os dados necessários para localizar a inscrição.",
      "O Vila Família se compromete a conduzir todas as solicitações com transparência, respeito e observância dos direitos dos participantes.",
    ],
  },
];

export const CancellationPolicyPage = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Política de Cancelamento, Transferência e Reembolso | Vila Família";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <header className="relative overflow-hidden bg-forest pb-16 pt-32 text-cream sm:pb-20 sm:pt-40">
        <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full border border-cream/10 sm:right-8 sm:top-8" />
        <div className="pointer-events-none absolute -right-12 -top-20 h-56 w-56 rounded-full border border-cream/10 sm:right-20 sm:top-20" />
        <div className="relative mx-auto max-w-5xl px-6 sm:px-10">
          <a
            href="/#topo"
            className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-sm font-semibold text-cream/80 transition-colors hover:border-sun hover:text-sun"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar ao site
          </a>
          <p className="mt-10 text-xs font-extrabold uppercase tracking-[0.28em] text-sun sm:text-sm">
            Vila Experiências | Vila Família
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Política de Cancelamento, Transferência e Reembolso
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/75 sm:text-lg">
            Informações sobre cancelamento, transferência de inscrições e reembolsos do evento.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10 sm:px-10 sm:py-16" aria-label="Política de cancelamento">
        <div className="mb-6 rounded-2xl border border-ink/[0.07] bg-white/70 px-5 py-4 text-sm leading-relaxed text-cocoa sm:px-6">
          Leia as condições para solicitar cancelamento, transferir uma inscrição ou pedir reembolso.
          Em caso de necessidade, fale com o atendimento oficial do Vila Família.
        </div>

        <div className="space-y-4 sm:space-y-5">
          {sections.map((section) => (
            <section
              key={section.number}
              className="rounded-[24px] border border-ink/[0.07] bg-[#FFFDF8] p-5 shadow-[0_20px_48px_-38px_rgba(51,38,29,0.45)] sm:rounded-[28px] sm:p-8"
            >
              <div className="flex items-start gap-4 sm:gap-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sun/25 font-display text-sm font-black text-forest sm:h-12 sm:w-12">
                  {section.number}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-xl font-extrabold leading-tight text-forest sm:text-2xl">
                    {section.title}
                  </h2>
                  <div className="mt-3 space-y-3 text-sm leading-7 text-cocoa sm:text-base sm:leading-8">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.options && (
                      <ul className="list-disc space-y-2 pl-5 marker:text-terra">
                        {section.options.map((option) => (
                          <li key={option}>{option}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <aside className="mt-8 flex flex-col gap-5 rounded-[28px] bg-forest p-6 text-cream sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cream/10 text-sun">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-display text-xl font-extrabold">Precisa falar com a gente?</h2>
              <p className="mt-1 text-sm leading-relaxed text-cream/70">
                O atendimento oficial pode ajudar a localizar a inscrição e orientar sua solicitação.
              </p>
            </div>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto">
            <a
              href="/checkout"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-sun px-5 py-3 text-sm font-extrabold text-forest transition-colors hover:bg-cream"
            >
              Voltar ao checkout
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={CONTACTS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/25 px-5 py-3 text-sm font-bold text-cream transition-colors hover:border-sun hover:text-sun"
            >
              Falar com o Vila Família
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </aside>
      </main>
    </div>
  );
};
