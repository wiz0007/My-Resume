import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";
import AllRoutes from "./routes/AllRoutes";
import ScrollToTop from "./routes/ScrollToTop";
import Loader from "./Component/Loader/Loader";

function App() {
  const [loading, setLoading] = useState(() => {
    if (typeof window === "undefined") return false;
    const alreadyLoaded = window.sessionStorage.getItem("portfolio-loaded");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return !alreadyLoaded && !reduceMotion;
  });

  useEffect(() => {
    if (!loading) return undefined;

    const timer = setTimeout(() => {
      window.sessionStorage.setItem("portfolio-loaded", "true");
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, [loading]);

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
