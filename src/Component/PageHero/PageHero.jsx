import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useNearViewport } from "../../hooks/useNearViewport";
import { usePageVisibility } from "../../hooks/usePageVisibility";
import { useReducedMotionPreference } from "../../hooks/useMediaPreferences";
import styles from "./PageHero.module.scss";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const PageHero = ({
  eyebrow,
  title,
  summary,
  meta = [],
  variant = "default",
  videoSrc = "/videos/professional-programmer-workstation.mp4",
  posterSrc,
  nextId,
}) => {
  const videoRef = useRef(null);
  const isNearViewport = useNearViewport(videoRef, {
    rootMargin: "160px 0px",
    threshold: 0.12,
    initial: true,
  });
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
    return () => video.pause();
  }, [isNearViewport, isPageVisible, reducedMotion]);

  return (
    <section className={`${styles.hero} ${styles[variant] || ""}`}>
      <video
        ref={videoRef}
        className={styles.video}
        src={videoSrc}
        poster={posterSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
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
          {eyebrow}
        </motion.p>
        <motion.h1 variants={itemVariants}>{title}</motion.h1>
        <motion.p className={styles.summary} variants={itemVariants}>
          {summary}
        </motion.p>

        {meta.length > 0 && (
          <motion.div className={styles.meta} variants={itemVariants}>
            {meta.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </motion.div>
        )}
      </motion.div>

      {nextId && (
        <a className={styles.scrollCue} href={`#${nextId}`} aria-label={`Scroll to ${nextId}`}>
          <ArrowDown size={22} />
        </a>
      )}
    </section>
  );
};

export default PageHero;
