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
