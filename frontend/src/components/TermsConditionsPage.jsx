import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { TERMS_DOCUMENT_LINES } from "../data/termsDocument";

const pageTitle = TERMS_DOCUMENT_LINES[0];
const pageSubtitle = TERMS_DOCUMENT_LINES[1];

const parseSections = (lines) => {
  const sections = [];
  let currentSection = null;

  lines.slice(2).forEach((line) => {
    const heading = line.match(/^(\d{1,2})\.\s+(.+)$/);

    if (heading) {
      currentSection = {
        number: heading[1].padStart(2, "0"),
        title: heading[2],
        lines: [],
      };
      sections.push(currentSection);
      return;
    }

    if (currentSection) currentSection.lines.push(line);
  });

  return sections;
};

const buildContentBlocks = (lines) => {
  const blocks = [];

  lines.forEach((line) => {
    const romanItem = line.match(/^([IVXLCDM]+)\s+[–—-]\s+(.+)$/);

    if (romanItem) {
      const lastBlock = blocks[blocks.length - 1];
      const listBlock = lastBlock?.type === "list"
        ? lastBlock
        : { type: "list", items: [] };

      if (lastBlock?.type !== "list") blocks.push(listBlock);
      listBlock.items.push({ marker: `${romanItem[1]} –`, text: romanItem[2] });
      return;
    }

    blocks.push({
      type: line.startsWith("[ ]") ? "acceptance" : "paragraph",
      text: line,
    });
  });

  return blocks;
};

const sections = parseSections(TERMS_DOCUMENT_LINES).map((section) => ({
  ...section,
  blocks: buildContentBlocks(section.lines),
}));

export const TermsConditionsPage = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${pageTitle} | Vila Família`;
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
            {pageSubtitle}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-3xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {pageTitle}
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-4 px-6 py-10 sm:space-y-5 sm:px-10 sm:py-16" aria-label={pageTitle}>
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
                <h2 className="font-display text-lg font-extrabold leading-tight text-forest sm:text-2xl">
                  {section.title}
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-7 text-cocoa sm:text-base sm:leading-8">
                  {section.blocks.map((block, index) => {
                    if (block.type === "list") {
                      return (
                        <ul key={`list-${index}`} className="space-y-2 pl-1">
                          {block.items.map((item) => (
                            <li key={item.marker} className="flex items-start gap-3">
                              <span className="shrink-0 font-bold text-terra">{item.marker}</span>
                              <span>{item.text}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }

                    if (block.type === "acceptance") {
                      return (
                        <p
                          key={`acceptance-${index}`}
                          className="rounded-xl border border-sun/50 bg-sun/10 px-4 py-3 font-semibold text-forest"
                        >
                          {block.text}
                        </p>
                      );
                    }

                    return <p key={`paragraph-${index}`}>{block.text}</p>;
                  })}
                </div>
              </div>
            </div>
          </section>
        ))}

        <aside className="mt-8 flex flex-col gap-5 rounded-[28px] bg-forest p-6 text-cream sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="font-display text-xl font-extrabold">Inscrição do evento</h2>
            <p className="mt-1 text-sm leading-relaxed text-cream/70">
              Consulte o formulário oficial para continuar sua inscrição.
            </p>
          </div>
          <a
            href="/checkout"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-sun px-5 py-3 text-sm font-extrabold text-forest transition-colors hover:bg-cream"
          >
            Voltar ao checkout
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </aside>
      </main>
    </div>
  );
};
