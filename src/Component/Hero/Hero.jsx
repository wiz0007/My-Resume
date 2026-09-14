import { useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Download } from "lucide-react";
import { useNearViewport } from "../../hooks/useNearViewport";
import { usePageVisibility } from "../../hooks/usePageVisibility";
import { useReducedMotionPreference } from "../../hooks/useMediaPreferences";
import styles from "./Hero.module.scss";

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const summaryText =
  "I design and build clean web products where polished interfaces, dependable APIs, authentication, and database workflows work together as one complete experience.";

const splitWords = (text) => text.split(" ");

const Hero = () => {
  const heroRef = useRef(null);
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

    return () => {
      video.pause();
    };
  }, [isNearViewport, isPageVisible, reducedMotion]);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero || reducedMotion) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const summaryWords = Array.from(hero.querySelectorAll(`.${styles.summaryWord}`));
    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop: "(min-width: 761px)",
        mobile: "(max-width: 760px)",
      },
      (matchContext) => {
        const { desktop } = matchContext.conditions;
        const summaryX = desktop ? 150 : 64;
        const summaryY = desktop ? 76 : 46;

        const summaryFrom = (index) => {
          const lane = index % 6;
          const direction = index % 2 === 0 ? -1 : 1;
          const xMagnitude = summaryX * (0.36 + lane * 0.1);
          const yMagnitude = summaryY * (((index * 7) % 5) / 4 - 0.5);

          return {
            x: direction * xMagnitude,
            y: yMagnitude,
            rotation: ((index * 11) % 9) - 4,
            skewX: ((index * 5) % 7) - 3,
            scale: 0.95 + (index % 3) * 0.015,
            autoAlpha: 0.12 + (index % 4) * 0.05,
            filter: `blur(${3 + (index % 3)}px)`,
          };
        };

        summaryWords.forEach((word, index) => gsap.set(word, summaryFrom(index)));

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: () => `+=${Math.max(window.innerHeight * (desktop ? 0.82 : 0.68), 420)}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline.to(summaryWords, {
          x: 0,
          y: 0,
          rotation: 0,
          skewX: 0,
          scale: 1,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 0.72,
          stagger: {
            each: 0.012,
            from: "edges",
          },
          ease: "none",
        });

        timeline.to({}, { duration: 0.2 });
      }
    );

    ScrollTrigger.refresh();

    return () => mm.revert();
  }, [reducedMotion]);

  return (
    <section className={styles.hero} id="home" ref={heroRef}>
      <video
        ref={videoRef}
        className={styles.video}
        src="/videos/professional-programmer-workstation.mp4"
        poster="/videos/posters/hero-home.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <motion.p
          className={styles.eyebrow}
          variants={itemVariants}
          initial="hidden"
          animate="show"
        >
          Full-stack developer
        </motion.p>

        <h1 className={styles.title}>Ayushmaan Mishra</h1>

        <p className={styles.summary} aria-label={summaryText}>
          {splitWords(summaryText).map((word, index) => (
            <span className={styles.summaryWord} key={`${word}-${index}`}>
              {word}
            </span>
          ))}
        </p>

        <motion.div
          className={styles.actions}
          variants={itemVariants}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.18 }}
        >
          <a href="/Ayushmaan_Mishra-Resume.pdf" target="_blank" rel="noopener noreferrer">
            <Download size={17} />
            Resume
          </a>
        </motion.div>
      </div>

      <a className={styles.scrollCue} href="#explore" aria-label="Scroll to site sections">
        <ArrowDown size={22} />
      </a>
    </section>
  );
};

export default Hero;
