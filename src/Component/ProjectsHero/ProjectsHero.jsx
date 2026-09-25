import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroShell from "../HeroShell/HeroShell";
import TerminalDecrypt from "./TerminalDecrypt";
import { useReducedMotionPreference } from "../../hooks/useMediaPreferences";
import styles from "./ProjectsHero.module.scss";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const modules = ["MERN", "Spring Boot", "FastAPI", "Desktop"];

export const ProjectsHero = () => {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotionPreference();

  // Scroll animation: module chips subtly expand horizontally as you scroll into the Bento Grid
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const spreadOffsetLeft = useTransform(scrollYProgress, [0, 1], ["0px", "-16px"]);
  const spreadOffsetRight = useTransform(scrollYProgress, [0, 1], ["0px", "16px"]);

  return (
    <HeroShell
      videoSrc="/videos/hero-projects.mp4"
      posterSrc="/videos/posters/hero-projects.webp"
      nextId="projects"
      variant="projects"
    >
      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h1 className={styles.title} variants={itemVariants}>
          <TerminalDecrypt
            text="Projects as working systems."
            highlightText="working systems"
            duration={1300}
            startDelay={180}
            enableHoverReplay={true}
          />
        </motion.h1>

        <motion.p className={styles.summary} variants={itemVariants}>
          Full-stack builds, visual tools, commerce flows, and desktop software.
        </motion.p>

        <motion.div className={styles.metaGrid} variants={itemVariants}>
          {modules.map((item, index) => {
            const spreadStyle =
              !reducedMotion && index === 0
                ? { x: spreadOffsetLeft }
                : !reducedMotion && index === modules.length - 1
                ? { x: spreadOffsetRight }
                : undefined;

            return (
              <motion.span
                key={item}
                className={styles.moduleChip}
                style={spreadStyle}
              >
                <span className={styles.modulePrefix}>#</span>
                <span>{item}</span>
              </motion.span>
            );
          })}
        </motion.div>
      </motion.div>
    </HeroShell>
  );
};

export default ProjectsHero;
