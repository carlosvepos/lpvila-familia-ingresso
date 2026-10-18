import { Logo } from "./Logo";

export const Footer = () => (
  <footer className="bg-forestdark py-10 text-cream/60" data-testid="footer">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 sm:px-10 md:flex-row lg:px-16">
      <Logo dark />
      <p className="text-center text-sm leading-relaxed md:text-right">
        31 de outubro de 2026 · 14h às 18h
        <br className="md:hidden" /> · Quintal da Alegria — Itaparica, Vila Velha/ES
      </p>
      <p className="text-xs">© 2026 Vila Família · 1º Encontro</p>
    </div>
  </footer>
);
