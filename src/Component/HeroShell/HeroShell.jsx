import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useNearViewport } from "../../hooks/useNearViewport";
import { usePageVisibility } from "../../hooks/usePageVisibility";
import { useReducedMotionPreference } from "../../hooks/useMediaPreferences";
import styles from "./HeroShell.module.scss";

export const HeroShell = ({
  videoSrc = "/videos/professional-programmer-workstation.mp4",
  posterSrc,
  nextId,
  variant = "default",
  enableSpotlight = false,
  className = "",
  children,
}) => {
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  const isNearViewport = useNearViewport(videoRef, {
    rootMargin: "160px 0px",
    threshold: 0.12,
    initial: true,
  });
  const isPageVisible = usePageVisibility();
  const reducedMotion = useReducedMotionPreference();

  // Scroll animations synchronized with Lenis
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0px", "-48px"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.78, 1], [1, 0.85, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);

  // Video autoplay/pause management
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

  // Optional mouse tracking for electromagnetic spotlight (e.g. Contact)
  const handleMouseMove = (e) => {
    if (!enableSpotlight || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    heroRef.current.style.setProperty("--mouse-x", `${x}px`);
    heroRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleScrollCueClick = (e) => {
    if (!nextId) return;
    e.preventDefault();
    const targetEl = document.getElementById(nextId);
    if (targetEl) {
      if (window.lenis) {
        window.lenis.scrollTo(targetEl, { offset: -70 });
      } else {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const getVideoClass = () => {
    if (variant === "process") return styles.processVideo;
    if (variant === "projects") return styles.projectsVideo;
    if (variant === "skills") return styles.skillsVideo;
    if (variant === "profile") return styles.profileVideo;
    if (variant === "contact") return styles.contactVideo;
    return "";
  };

  return (
    <section
      className={`${styles.hero} ${className}`}
      ref={heroRef}
      onMouseMove={handleMouseMove}
    >
      {/* Background Video with Smooth Parallax */}
      <div className={styles.videoWrap}>
        <motion.video
          ref={videoRef}
          className={`${styles.video} ${getVideoClass()}`}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          style={
            reducedMotion
              ? undefined
              : {
                  y: videoY,
                  scale: videoScale,
                }
          }
        />
      </div>

      <div className={styles.overlay} aria-hidden="true" />
      {enableSpotlight && <div className={styles.spotlightLayer} aria-hidden="true" />}

      {/* Hero Content with Scroll Fade & Shift */}
      <motion.div
        className={styles.content}
        style={
          reducedMotion
            ? undefined
            : {
                y: contentY,
                opacity: contentOpacity,
              }
        }
      >
        {children}
      </motion.div>

      {/* Floating Bottom Scroll Cue */}
      {nextId && (
        <motion.a
          className={styles.scrollCue}
          href={`#${nextId}`}
          onClick={handleScrollCueClick}
          aria-label={`Scroll to ${nextId}`}
          style={reducedMotion ? undefined : { opacity: cueOpacity }}
        >
          <ArrowDown size={22} />
        </motion.a>
      )}
    </section>
  );
};

export default HeroShell;
