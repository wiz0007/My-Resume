import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // 1. Immediate synchronous reset
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true, force: true });
      window.lenis.resize();
    }

    // 2. Multi-frame follow-up to ensure lazy components & hero elements anchor at 0
    let firstFrame = 0;
    let secondFrame = 0;

    firstFrame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true, force: true });
        window.lenis.resize();
      }

      secondFrame = window.requestAnimationFrame(() => {
        window.lenis?.resize();
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [location.pathname]);

  return null;
};

export default ScrollToTop;
