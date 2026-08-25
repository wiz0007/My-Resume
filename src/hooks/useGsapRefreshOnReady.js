import { useEffect } from "react";

export const useGsapRefreshOnReady = (deps = []) => {
  useEffect(() => {
    let raf = 0;

    const refresh = async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      raf = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    refresh();
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
