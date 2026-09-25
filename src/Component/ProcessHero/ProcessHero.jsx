import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroShell from "../HeroShell/HeroShell";
import { useReducedMotionPreference } from "../../hooks/useMediaPreferences";
import styles from "./ProcessHero.module.scss";

const textWords = [
  { word: "Brief", isAccent: false },
  { word: "to", isAccent: false },
  { word: "shipped", isAccent: true },
  { word: "software.", isAccent: true },
];

const steps = ["Discover", "Architect", "Build", "Improve"];

export const ProcessHero = () => {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotionPreference();

  // Scroll animation: characters rotate on 3D X-axis with velocity tilt on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scrollTilt = useTransform(scrollYProgress, [0, 1], ["0deg", "-35deg"]);
  const scrollDrift = useTransform(scrollYProgress, [0, 1], ["0px", "-28px"]);

  let globalCharIndex = 0;

  return (
    <HeroShell
      videoSrc="/videos/hero-process.mp4"
      posterSrc="/videos/posters/hero-process.webp"
      nextId="process"
      variant="process"
    >
      <div ref={containerRef} className={styles.container}>
        <motion.h1
          className={styles.title}
          style={reducedMotion ? undefined : { rotateX: scrollTilt, y: scrollDrift }}
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
                        reducedMotion
                          ? { opacity: 1 }
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
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        >
          A compact view of how I plan, build, validate, and refine.
        </motion.p>

        <motion.div
          className={styles.stepPills}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75, ease: "easeOut" }}
        >
          {steps.map((step) => (
            <span key={step} className={styles.pill}>
              {step}
            </span>
          ))}
        </motion.div>
      </div>
    </HeroShell>
  );
};

export default ProcessHero;
