import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroShell from "../HeroShell/HeroShell";
import { useReducedMotionPreference } from "../../hooks/useMediaPreferences";
import styles from "./SkillsHero.module.scss";

const textWords = [
  { word: "Stack,", isAccent: false },
  { word: "grouped", isAccent: false },
  { word: "by", isAccent: false },
  { word: "product", isAccent: true },
  { word: "layers.", isAccent: true },
];

const stackItems = [
  { name: "React", color: "#38bdf8" },
  { name: "TypeScript", color: "#60a5fa" },
  { name: "Node", color: "#34d399" },
  { name: "Spring Boot", color: "#10b981" },
  { name: "FastAPI", color: "#06b6d4" },
  { name: "MongoDB", color: "#a855f7" },
  { name: "PostgreSQL", color: "#818cf8" },
  { name: "JWT", color: "#f59e0b" },
];

export const SkillsHero = () => {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotionPreference();

  // Scroll animation: characters physically tumble downward under gravity as you scroll into the 3D orbit
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scrollGravityFall = useTransform(scrollYProgress, [0, 1], ["0px", "90px"]);
  const scrollTumble = useTransform(scrollYProgress, [0, 1], ["0deg", "12deg"]);
  const scrollTumbleRev = useTransform(scrollYProgress, [0, 1], ["0deg", "-12deg"]);

  let globalCharIndex = 0;

  return (
    <HeroShell
      videoSrc="/videos/hero-skills.mp4"
      posterSrc="/videos/posters/hero-skills.webp"
      nextId="skills-architecture"
      variant="skills"
    >
      <div ref={containerRef} className={styles.container}>
        <h1
          className={styles.title}
          aria-label="Stack, grouped by product layers."
        >
          {textWords.map(({ word, isAccent }) => {
            const chars = word.split("");
            return (
              <span key={word} className={styles.wordBlock}>
                {chars.map((char) => {
                  const charIdx = globalCharIndex;
                  globalCharIndex += 1;

                  const fallDelay = 0.12 + charIdx * 0.024;
                  const initialY = -140 - (charIdx % 4) * 25;
                  const initialRotate = ((charIdx * 7) % 25) - 12;

                  const scrollStyle = reducedMotion
                    ? undefined
                    : {
                        y: scrollGravityFall,
                        rotateZ: charIdx % 2 === 0 ? scrollTumble : scrollTumbleRev,
                      };

                  return (
                    <motion.span
                      key={charIdx}
                      className={`${styles.charFalling} ${isAccent ? styles.titleAccent : ""}`}
                      style={scrollStyle}
                      initial={
                        reducedMotion
                          ? { opacity: 1 }
                          : {
                              opacity: 0,
                              y: initialY,
                              rotateZ: initialRotate,
                              filter: "blur(6px)",
                            }
                      }
                      animate={{
                        opacity: 1,
                        y: 0,
                        rotateZ: 0,
                        filter: "blur(0px)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                        mass: 0.8,
                        delay: fallDelay,
                      }}
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            );
          })}
        </h1>

        <motion.p
          className={styles.summary}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
        >
          Interface, services, data, security, tools, and programming fundamentals.
        </motion.p>

        <motion.div
          className={styles.stackGrid}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
        >
          {stackItems.map((item) => (
            <span
              key={item.name}
              className={styles.skillChip}
              style={{ "--chip-accent": item.color }}
            >
              <span
                className={styles.chipDot}
                style={{
                  backgroundColor: item.color,
                  boxShadow: `0 0 8px ${item.color}88`,
                }}
                aria-hidden="true"
              />
              <span className={styles.chipName}>{item.name}</span>
            </span>
          ))}
        </motion.div>
      </div>
    </HeroShell>
  );
};

export default SkillsHero;
