import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroShell from "../HeroShell/HeroShell";
import { useReducedMotionPreference } from "../../hooks/useMediaPreferences";
import styles from "./ProfileHero.module.scss";

const profileTags = ["Full-stack", "Backend-minded", "Open to roles"];

export const ProfileHero = () => {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotionPreference();

  // Scroll animation: editorial lines gently separate with depth parallax as you scroll towards the story
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const line1Shift = useTransform(scrollYProgress, [0, 1], ["0px", "-24px"]);
  const line2Shift = useTransform(scrollYProgress, [0, 1], ["0px", "24px"]);

  return (
    <HeroShell
      videoSrc="/videos/hero-profile.mp4"
      posterSrc="/videos/posters/hero-profile.webp"
      nextId="profile-story"
      variant="profile"
    >
      <div ref={containerRef} className={styles.container}>
        <h1 className={styles.title} aria-label="Engineer with product instincts.">
          <span className={styles.maskLine}>
            <motion.span
              className={styles.maskInner}
              initial={{ y: "115%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              style={reducedMotion ? undefined : { x: line1Shift }}
            >
              Engineer with
            </motion.span>
          </span>
          <span className={styles.maskLine}>
            <motion.span
              className={`${styles.maskInner} ${styles.silverAccent}`}
              initial={{ y: "115%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              style={reducedMotion ? undefined : { x: line2Shift }}
            >
              product instincts.
            </motion.span>
          </span>
        </h1>

        <motion.p
          className={styles.summary}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
        >
          Computer Engineering graduate building useful, complete software.
        </motion.p>

        <motion.div
          className={styles.metaGrid}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
        >
          {profileTags.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </motion.div>
      </div>
    </HeroShell>
  );
};

export default ProfileHero;
