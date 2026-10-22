import { useEffect, Component } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { setLenis } from "./lib/scroll";
import { Cursor } from "./components/Cursor";
import { Navbar } from "./components/Navbar";
import { CinematicHero } from "./components/CinematicHero";
import { Marquee } from "./components/Marquee";
import { KidsSection } from "./components/KidsSection";
import { AdultsSection } from "./components/AdultsSection";
import { VenueSection } from "./components/VenueSection";
import { TicketsSection } from "./components/TicketsSection";
import { InviteSection } from "./components/InviteSection";
import { Footer } from "./components/Footer";
import { CancellationPolicyPage } from "./components/CancellationPolicyPage";

gsap.registerPlugin(ScrollTrigger);

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    if (this.state.error) {
      return (
        <div className="grid min-h-screen place-items-center bg-cream font-display text-xl font-bold text-forest">
          Algo deu errado. Recarregue a página.
        </div>
      );
    }
    return this.props.children;
  }
}

const SmoothScroll = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);
  return null;
};

function App() {
  const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
  const isCancellationPolicy = currentPath === "/politica-de-cancelamento";

  return (
    <ErrorBoundary>
      {isCancellationPolicy ? (
        <>
          <div className="grain" aria-hidden="true" />
          <Navbar />
          <CancellationPolicyPage />
          <Footer />
        </>
      ) : (
        <>
          <SmoothScroll />
          <Cursor />
          <div className="grain" aria-hidden="true" />
          <Navbar />
          <main className="bg-cream text-ink">
            <CinematicHero />
            <Marquee />
            <KidsSection />
            <AdultsSection />
            <VenueSection />
            <TicketsSection />
            <InviteSection />
          </main>
          <Footer />
        </>
      )}
    </ErrorBoundary>
  );
}

export default App;
