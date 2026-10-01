import { motion } from "framer-motion";
import HeroShell from "../HeroShell/HeroShell";
import { useReducedMotionPreference, useStaticHeroMotion } from "../../hooks/useMediaPreferences";
import styles from "./ProcessHero.module.scss";

const textWords = [
  { word: "Brief", isAccent: false },
  { word: "to", isAccent: false },
  { word: "shipped", isAccent: true },
  { word: "software.", isAccent: true },
];

const steps = ["Discover", "Architect", "Build", "Improve"];

export const ProcessHero = () => {
  const reducedMotion = useReducedMotionPreference();
  const staticMotion = useStaticHeroMotion();

  let globalCharIndex = 0;

  return (
    <HeroShell
      videoSrc="/videos/professional-programmer-workstation.mp4"
      posterSrc="/videos/posters/hero-home.webp"
      nextId="process"
      variant="process"
    >
      <div className={styles.container}>
        <motion.h1
          className={styles.title}
          aria-label="Brief to shipped software."
        >
          {textWords.map(({ word, isAccent }) => {
            const chars = word.split("");
            return (
              <span key={word} className={styles.wordBlock}>
                {chars.map((char) => {
                  const delay = 0.12 + globalCharIndex * 0.035;
                  globalCharIndex += 1;

                  return (
                    <motion.span
                      key={globalCharIndex}
                      className={`${styles.char3D} ${isAccent ? styles.silverAccent : ""}`}
                      initial={
                        staticMotion
                          ? false
                          : {
                              opacity: 0,
                              rotateX: 85,
                              y: 42,
                              filter: "blur(6px)",
                            }
                      }
                      animate={{
                        opacity: 1,
                        rotateX: 0,
                        y: 0,
                        filter: "blur(0px)",
                      }}
                      transition={{
                        duration: 0.75,
                        delay,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            );
          })}
        </motion.h1>

        <motion.p
          className={styles.summary}
          initial={staticMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        >
          A compact view of how I plan, build, validate, and refine.
        </motion.p>

        <motion.div
          className={styles.stepPills}
          initial={staticMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75, ease: "easeOut" }}
        >
          {steps.map((step, index) => (
            <button
              key={step}
              type="button"
              className={styles.pill}
              onClick={() => {
                const sequence = document.querySelector('[data-process-sticky="true"]');
                if (sequence) {
                  // Use the stable sticky frame height, not the changing browser viewport.
                  const start = sequence.getBoundingClientRect().top + window.scrollY;
                  const distance = Math.max(0, sequence.offsetHeight - sequence.firstElementChild.offsetHeight);
                  window.scrollTo({ top: start + distance * index / (steps.length - 1),
                    behavior: reducedMotion ? "instant" : "smooth" });
                } else if (window.processScrollTrigger) {
                  const st = window.processScrollTrigger;
                  const targetRatios = [0, 0.33, 0.65, 0.96];
                  const targetScroll = st.start + (st.end - st.start) * (targetRatios[index] ?? 0);
                  if (window.lenis) {
                    window.lenis.scrollTo(targetScroll, { duration: 1.2 });
                  } else {
                    window.scrollTo({ top: targetScroll, behavior: reducedMotion ? "instant" : "smooth" });
                  }
                } else {
                  const targetEl = document.getElementById(`process-${step.toLowerCase()}`);
                  if (targetEl) {
                    if (window.lenis) {
                      window.lenis.scrollTo(targetEl, { duration: 1.2 });
                    } else {
                      targetEl.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "start" });
                    }
                  }
                }
              }}
            >
              {step}
            </button>
          ))}
        </motion.div>
      </div>
    </HeroShell>
  );
};

export default ProcessHero;
