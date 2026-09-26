import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, Download, Send, Sparkles } from "lucide-react";
import { usePageVisibility } from "../../hooks/usePageVisibility";
import { useReducedMotionPreference } from "../../hooks/useMediaPreferences";
import myPic from "../../assets/MyPic.jpeg";
import styles from "./Hero.module.scss";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const titleFirst = "Ayushmaan";
const titleLast = "Mishra";

const charVariants = {
  hidden: {
    opacity: 0,
    z: -140,
    scale: 0.65,
    rotateX: 40,
    filter: "blur(6px)",
  },
  show: (i) => ({
    opacity: 1,
    z: 0,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 18,
      mass: 0.75,
      delay: 0.12 + i * 0.032,
    },
  }),
};

const summaryWordVariants = {
  hidden: {
    opacity: 0,
    y: 16,
    z: -30,
    filter: "blur(4px)",
  },
  show: (i) => ({
    opacity: 1,
    y: 0,
    z: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.5 + i * 0.015,
    },
  }),
};

const specializations = [
  "Full-Stack Web Systems",
  "Scalable APIs & Microservices",
  "High-Performance Interfaces",
  "React • Spring Boot • FastAPI",
];

const summaryText =
  "I design and build clean web products where polished interfaces, dependable APIs, authentication, and database workflows work together as one complete experience.";

const splitWords = (text) => text.split(" ");

const Hero = () => {
  const heroRef = useRef(null);
  const isPageVisible = usePageVisibility();
  const reducedMotion = useReducedMotionPreference();

  const [activeSpecIndex, setActiveSpecIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  // Rotating specialization ticker
  useEffect(() => {
    if (reducedMotion || !isPageVisible) return undefined;
    const interval = setInterval(() => {
      setActiveSpecIndex((prev) => (prev + 1) % specializations.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [reducedMotion, isPageVisible]);

  // Interactive mouse spotlight and 3D typography tilt
  const handleMouseMove = (e) => {
    if (reducedMotion) return;
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
  };

  // Smooth optical scroll parallax (natural, non-pinning)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-16%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);
  const portraitParallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  // Calculate subtle 3D typography tilt based on cursor position
  const tiltX =
    mousePos.x >= 0 && heroRef.current
      ? (mousePos.y / heroRef.current.offsetHeight - 0.5) * -8
      : 0;
  const tiltY =
    mousePos.x >= 0 && heroRef.current
      ? (mousePos.x / heroRef.current.offsetWidth - 0.5) * 10
      : 0;

  return (
    <section
      className={styles.hero}
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={styles.portraitWrapper}
        style={reducedMotion ? undefined : { y: portraitParallaxY }}
        aria-hidden="true"
      >
        <img
          src={myPic}
          alt=""
          className={styles.portraitImage}
          loading="eager"
          decoding="async"
        />
        <div className={styles.portraitOverlay} />
      </motion.div>

      {/* Reactive cursor spotlight */}
      <div
        className={styles.cursorSpotlight}
        style={{
          opacity: mousePos.x >= 0 ? 1 : 0,
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.12), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <motion.div
        className={styles.content}
        style={reducedMotion ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        {/* Status indicator bar */}
        <motion.div
          className={styles.statusBadge}
          variants={itemVariants}
          initial="hidden"
          animate="show"
        >
          <span className={styles.statusPulse} aria-hidden="true">
            <span className={styles.pulseDot} />
            <span className={styles.pulseRing} />
          </span>
          <span className={styles.statusText}>Available for Roles</span>
          <span className={styles.statusSep}>•</span>
          <span className={styles.statusSub}>B.Tech Computer Engineering</span>
        </motion.div>

        {/* 3D Kinetic Depth Title: letters spring forward from Z-depth */}
        <h1
          className={styles.title}
          aria-label="Ayushmaan Mishra"
          style={
            reducedMotion
              ? undefined
              : {
                  transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                }
          }
        >
          <span className={styles.titleWord} aria-hidden="true">
            {titleFirst.split("").map((char, index) => (
              <motion.span
                key={`first-${index}`}
                className={styles.titleChar}
                custom={index}
                variants={charVariants}
                initial={reducedMotion ? { opacity: 1 } : "hidden"}
                animate="show"
              >
                {char}
              </motion.span>
            ))}
          </span>{" "}
          <span className={`${styles.titleWord} ${styles.titleAccent}`} aria-hidden="true">
            {titleLast.split("").map((char, index) => (
              <motion.span
                key={`last-${index}`}
                className={`${styles.titleChar} ${styles.titleAccentChar}`}
                custom={titleFirst.length + index}
                variants={charVariants}
                initial={reducedMotion ? { opacity: 1 } : "hidden"}
                animate="show"
              >
                {char}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Rotating specialization ticker with 3D perspective flip */}
        <div className={styles.tickerWrapper}>
          <div className={styles.tickerTrack}>
            <AnimatePresence mode="wait">
              <motion.span
                key={activeSpecIndex}
                className={styles.tickerText}
                initial={{ opacity: 0, rotateX: -75, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, rotateX: 0, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, rotateX: 75, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {specializations[activeSpecIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Summary text with cascading wave and interactive word hover */}
        <p className={styles.summary} aria-label={summaryText}>
          {splitWords(summaryText).map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              className={styles.summaryWord}
              custom={index}
              variants={summaryWordVariants}
              initial={reducedMotion ? { opacity: 1 } : "hidden"}
              animate="show"
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      color: "#7dd3fc",
                      textShadow: "0 0 14px rgba(56, 189, 248, 0.45)",
                      y: -2,
                      transition: { duration: 0.12 },
                    }
              }
            >
              {word}
            </motion.span>
          ))}
        </p>

        {/* Key capabilities strip (desktop only, hidden on mobile for clean hero) */}
        <motion.div
          className={styles.capabilityStrip}
          variants={itemVariants}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.7 }}
        >
          <div className={styles.capItem}>
            <span className={styles.capValue}>9+</span>
            <span className={styles.capLabel}>Systems</span>
          </div>
          <div className={styles.capDivider} />
          <div className={styles.capItem}>
            <span className={styles.capValue}>Full-Stack</span>
            <span className={styles.capLabel}>React • Spring • FastAPI</span>
          </div>
          <div className={styles.capDivider} />
          <div className={styles.capItem}>
            <span className={styles.capValue}>Specialty</span>
            <span className={styles.capLabel}>Architecture</span>
          </div>
        </motion.div>

        {/* Multi-action launchpad */}
        <motion.div
          className={styles.actions}
          variants={itemVariants}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.78 }}
        >
          <Link
            to="/projects"
            className={styles.primaryBtn}
            aria-label="Explore Systems"
            title="Explore Systems"
          >
            <Sparkles size={18} />
            <span className={styles.btnLabel}>Explore Systems</span>
            <ArrowRight size={15} className={styles.btnArrow} />
            <span className={styles.tooltip} aria-hidden="true">Explore Systems</span>
          </Link>

          <Link
            to="/contact"
            className={styles.secondaryBtn}
            aria-label="Contact Ayushmaan"
            title="Contact"
          >
            <Send size={17} />
            <span className={styles.btnLabel}>Contact</span>
            <span className={styles.tooltip} aria-hidden="true">Contact</span>
          </Link>

          <a
            href="/Ayushmaan_Mishra-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.resumeBtn}
            aria-label="Download Resume (PDF)"
            title="Download Resume"
          >
            <Download size={17} />
            <span className={styles.btnLabel}>Resume</span>
            <span className={styles.tooltip} aria-hidden="true">Resume</span>
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
