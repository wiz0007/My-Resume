import { useEffect } from "react";

export const useGsapRefreshOnReady = (deps = []) => {
  useEffect(() => {
    let raf = 0;
    let cancelled = false;

    const refresh = async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      raf = window.requestAnimationFrame(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });
    };

    refresh();

    return () => {
      cancelled = true;
      if (raf) window.cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
