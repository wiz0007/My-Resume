import { useEffect, useState } from "react";

const readVisibility = () =>
  typeof document === "undefined" ? true : !document.hidden;

export const usePageVisibility = () => {
  const [isPageVisible, setIsPageVisible] = useState(readVisibility);

  useEffect(() => {
    const handleVisibility = () => setIsPageVisible(!document.hidden);

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return isPageVisible;
};
