import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { Logo } from "./Logo";
import { EVENT } from "../data/content";
import { scrollToId } from "../lib/scroll";

export const Navbar = () => (
  <motion.header
    initial={{ y: -32, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6"
  >
    <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-ink/10 bg-cream/85 py-2.5 pl-5 pr-2.5 shadow-[0_18px_50px_-24px_rgba(30,66,49,0.5)] backdrop-blur-md">
      <a
        href="#topo"
        onClick={(e) => {
          e.preventDefault();
          scrollToId("#topo");
        }}
        data-testid="navbar-logo-link"
        aria-label="Voltar ao topo"
      >
        <Logo />
      </a>
      <div className="flex items-center gap-3">
        <span className="hidden items-center gap-2 rounded-full bg-forest/[0.07] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-forest md:flex">
          <CalendarDays className="h-3.5 w-3.5 text-terra" />
          {EVENT.dateShort}
        </span>
        <button
          onClick={() => scrollToId("#ingressos")}
          data-testid="navbar-cta"
          className="whitespace-nowrap rounded-full bg-terra px-4 py-2.5 text-xs font-extrabold uppercase tracking-wide text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest sm:px-5 sm:text-sm"
        >
          Quero participar
        </button>
      </div>
    </div>
  </motion.header>
);
