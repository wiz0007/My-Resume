import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";
import AllRoutes from "./routes/AllRoutes";
import ScrollToTop from "./routes/ScrollToTop";
import Loader from "./Component/Loader/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
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
