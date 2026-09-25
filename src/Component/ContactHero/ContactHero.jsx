import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroShell from "../HeroShell/HeroShell";
import { useReducedMotionPreference } from "../../hooks/useMediaPreferences";
import styles from "./ContactHero.module.scss";

const textWords = [
  { word: "Let’s", isAccent: false },
  { word: "build", isAccent: false },
  { word: "something", isAccent: true },
  { word: "useful.", isAccent: true },
];

const contactTags = ["Roles", "Collaboration", "Technical conversations"];

export const ContactHero = () => {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotionPreference();

  // Scroll animation: gentle scale and lift into the contact form
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const scrollDrift = useTransform(scrollYProgress, [0, 1], ["0px", "-24px"]);

  let globalCharIndex = 0;

  return (
    <HeroShell
      videoSrc="/videos/hero-contact.mp4"
      posterSrc="/videos/posters/hero-contact.webp"
      nextId="contact"
      variant="contact"
      enableSpotlight={true}
    >
      <div ref={containerRef} className={styles.container}>
        <motion.h1
          className={styles.title}
          style={reducedMotion ? undefined : { scale: scrollScale, y: scrollDrift }}
          aria-label="Let’s build something useful."
        >
          {textWords.map(({ word, isAccent }) => {
            const chars = word.split("");
            return (
              <span key={word} className={styles.wordBlock}>
                {chars.map((char) => {
                  const delay = 0.12 + globalCharIndex * 0.032;
                  globalCharIndex += 1;

                  return (
                    <motion.span
                      key={globalCharIndex}
                      className={`${styles.charLuminous} ${isAccent ? styles.silverAccent : ""}`}
                      initial={
                        reducedMotion
                          ? { opacity: 1 }
                          : {
                              opacity: 0,
                              y: 28,
                              filter: "blur(8px)",
                            }
                      }
                      animate={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                      }}
                      transition={{
                        duration: 0.7,
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
          Open to full-stack, frontend, backend, and software engineering opportunities.
        </motion.p>

        <motion.div
          className={styles.metaChips}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75, ease: "easeOut" }}
        >
          {contactTags.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </motion.div>
      </div>
    </HeroShell>
  );
};

export default ContactHero;
