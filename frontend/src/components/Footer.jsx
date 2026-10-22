import { Instagram, MessageCircle } from "lucide-react";
import { CONTACTS } from "../data/content";

export const Footer = () => (
  <footer className="bg-forestdark py-12 text-cream/60" data-testid="footer">
    <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
        <img
          src="/img/logo-white.png"
          alt="Vila Família"
          className="h-11 w-auto"
          data-testid="footer-logo"
        />
        <div className="flex flex-col items-center gap-3 md:items-start">
          <a
            href={CONTACTS.instagram}
            target="_blank"
            rel="noreferrer"
            data-testid="footer-instagram-link"
            className="group flex items-center gap-2.5 text-sm text-cream/70 transition-colors duration-300 hover:text-sun"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-cream/[0.07] transition-colors duration-300 group-hover:bg-terra/20">
              <Instagram className="h-4 w-4" />
            </span>
            {CONTACTS.instagramLabel}
          </a>
          <a
            href={CONTACTS.whatsapp}
            target="_blank"
            rel="noreferrer"
            data-testid="footer-whatsapp-link"
            className="group flex items-center gap-2.5 text-sm text-cream/70 transition-colors duration-300 hover:text-sun"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-cream/[0.07] transition-colors duration-300 group-hover:bg-terra/20">
              <MessageCircle className="h-4 w-4" />
            </span>
            {CONTACTS.whatsappLabel}
          </a>
          <a
            href="/politica-de-cancelamento"
            className="mt-1 text-sm text-cream/70 underline decoration-cream/25 underline-offset-4 transition-colors hover:text-sun hover:decoration-sun"
          >
            Política de Cancelamento, Transferência e Reembolso
          </a>
        </div>
        <p className="text-center text-sm leading-relaxed md:text-right">
          31 de outubro de 2026 · 14h às 18h
          <br className="md:hidden" /> · Quintal da Alegria — Itaparica, Vila Velha/ES
        </p>
      </div>
      <p className="mt-10 border-t border-cream/10 pt-6 text-center text-xs">
        © 2026 Vila Família · 1º Encontro
      </p>
    </div>
  </footer>
);
