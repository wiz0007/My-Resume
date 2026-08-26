import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import "./App.css";
import AllRoutes from "./routes/AllRoutes";
import ScrollToTop from "./routes/ScrollToTop";
import Loader from "./Component/Loader/Loader";

function App() {
  const [loading, setLoading] = useState(() => {
    if (typeof window === "undefined") return false;
    const alreadyLoaded = window.sessionStorage.getItem("portfolio-initialized");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return !alreadyLoaded && !reduceMotion;
  });

  useEffect(() => {
    if (!loading) return undefined;

    const timer = setTimeout(() => {
      window.sessionStorage.setItem("portfolio-initialized", "true");
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => {
        window.history.scrollRestoration = previousRestoration;
      };
    }

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      touchMultiplier: 1.15,
    });

    window.lenis = lenis;

    let frame = null;

    const raf = (time) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };

    const startRaf = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(raf);
    };

    const stopRaf = () => {
      if (frame === null) return;
      window.cancelAnimationFrame(frame);
      frame = null;
    };

    const handleVisibility = () => {
      if (document.hidden) {
        lenis.stop();
        stopRaf();
        return;
      }

      lenis.start();
      lenis.resize();
      startRaf();
    };

    const handlePageShow = () => {
      lenis.start();
      lenis.resize();
      startRaf();
    };

    if (!document.hidden) startRaf();
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      stopRaf();
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pageshow", handlePageShow);
      lenis.destroy();
      delete window.lenis;
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">{loading && <Loader />}</AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6, delay: loading ? 0 : 0.1 }}
      >
        <ScrollToTop />
        <AllRoutes />
      </motion.div>
    </>
  );
}

export default App;
