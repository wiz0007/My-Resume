import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { useNearViewport } from "../../hooks/useNearViewport";
import { usePageVisibility } from "../../hooks/usePageVisibility";
import { useReducedMotionPreference } from "../../hooks/useMediaPreferences";
import styles from "./Hero.module.scss";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const Hero = () => {
  const videoRef = useRef(null);
  const isNearViewport = useNearViewport(videoRef, { rootMargin: "160px 0px", threshold: 0.12, initial: true });
  const isPageVisible = usePageVisibility();
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    if (reducedMotion || !isNearViewport || !isPageVisible) {
      video.pause();
      return undefined;
    }

    video.play().catch(() => {});
    return () => {
      video.pause();
    };
  }, [isNearViewport, isPageVisible, reducedMotion]);

  return (
    <section className={styles.hero} id="home">
      <video
        ref={videoRef}
        className={styles.video}
        src="/videos/professional-programmer-workstation.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className={styles.overlay} aria-hidden="true" />

      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.p className={styles.eyebrow} variants={itemVariants}>
          Full-stack developer
        </motion.p>

        <motion.h1 variants={itemVariants}>Ayushmaan Mishra</motion.h1>

        <motion.p className={styles.summary} variants={itemVariants}>
          I design and build clean web products where polished interfaces,
          dependable APIs, authentication, and database workflows work together
          as one complete experience.
        </motion.p>

        <motion.div className={styles.actions} variants={itemVariants}>
          <a href="/Ayushmaan_Mishra-Resume.pdf" target="_blank" rel="noopener noreferrer">
            <Download size={17} />
            Resume
          </a>
        </motion.div>
      </motion.div>

      <a className={styles.scrollCue} href="#explore" aria-label="Scroll to site sections">
        <ArrowDown size={22} />
      </a>
    </section>
  );
};

export default Hero;
