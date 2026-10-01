import { useEffect, useState } from "react";

const readQuery = (query) =>
  typeof window !== "undefined" && window.matchMedia(query).matches;

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => readQuery(query));

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const updateMatch = () => setMatches(mediaQuery.matches);

    updateMatch();
    mediaQuery.addEventListener("change", updateMatch);
    return () => mediaQuery.removeEventListener("change", updateMatch);
  }, [query]);

  return matches;
};

export const useReducedMotionPreference = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

// Touch scrolling stays on the browser compositor; avoid nested JS parallax.
export const useStaticHeroMotion = () => {
  const reduced = useReducedMotionPreference();
  const compactOrTouch = useMediaQuery("(max-width: 980px), (pointer: coarse)");
  return reduced || compactOrTouch;
};
