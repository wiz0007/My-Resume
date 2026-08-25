import { useEffect, useState } from "react";

export const useNearViewport = (ref, options = {}) => {
  const {
    rootMargin = "700px 0px",
    threshold = 0,
    once = false,
    initial = false,
  } = options;
  const [isNearViewport, setIsNearViewport] = useState(initial);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setIsNearViewport(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearViewport(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { rootMargin, threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, ref, rootMargin, threshold]);

  return isNearViewport;
};
