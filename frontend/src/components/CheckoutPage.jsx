import { useEffect } from "react";
import { TICKETS_URL } from "../data/content";

export const CheckoutPage = () => {
  const destination = TICKETS_URL || "/#ingressos";

  useEffect(() => {
    document.title = "Inscrição · Vila Família";
    window.location.replace(destination);
  }, [destination]);

  return (
    <main className="grid min-h-screen place-items-center bg-cream px-6 text-center text-forest">
      <div role="status" aria-live="polite">
        <h1 className="font-display text-2xl font-extrabold">
          Redirecionando para o primeiro lote…
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cocoa">
          Se o redirecionamento não acontecer automaticamente, continue pelo link abaixo.
        </p>
        <a
          href={destination}
          className="mt-6 inline-flex rounded-full bg-terra px-7 py-3.5 font-extrabold text-cream transition-colors hover:bg-forest"
        >
          Acessar o primeiro lote
        </a>
      </div>
    </main>
  );
};
