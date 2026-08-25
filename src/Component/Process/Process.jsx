import { createElement, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Blocks, Hammer, Rocket, Search } from "lucide-react";
import SectionAtmosphere from "../SectionAtmosphere/SectionAtmosphere";
import { useGsapRefreshOnReady } from "../../hooks/useGsapRefreshOnReady";
import styles from "./Process.module.scss";

const steps = [
  {
    icon: Search,
    label: "Discover",
    title: "Clarify the user flow and data model first.",
    text: "I start by reducing the problem into roles, permissions, screens, API boundaries, and failure states.",
  },
  {
    icon: Blocks,
    label: "Architect",
    title: "Design the path from interface to database.",
    text: "The build plan covers component structure, routes, authentication, validation, and how records move through the system.",
  },
  {
    icon: Hammer,
    label: "Build",
    title: "Ship usable slices, then deepen the polish.",
    text: "I prefer working software over vague mockups: responsive UI, API integration, meaningful states, and practical testing.",
  },
  {
    icon: Rocket,
    label: "Improve",
    title: "Tune performance, accessibility, and handoff quality.",
    text: "The final pass checks motion preferences, links, layout stability, deploy readiness, and the details that make work feel dependable.",
  },
];

const Process = () => {
  const sectionRef = useRef(null);
  useGsapRefreshOnReady([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let ctx;
    let cancelled = false;

    const setupAnimation = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(`.${styles.step}`);
      const progress = section.querySelector(`.${styles.progressBar}`);

      gsap.set(cards, { opacity: 0.34, y: 42 });
      gsap.set(cards[0], { opacity: 1, y: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${steps.length * 72}%`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.to(progress, { scaleY: 1, ease: "none" }, 0);

      cards.forEach((card, index) => {
        timeline.to(
          card,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
          },
          index * 0.55
        );

        if (index > 0) {
          timeline.to(
            cards[index - 1],
            {
              opacity: 0.48,
              y: -18,
              duration: 0.35,
              ease: "power2.out",
            },
            index * 0.55
          );
        }
      });
      }, section);
    };

    setupAnimation();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section className={styles.process} id="process" ref={sectionRef}>
      <SectionAtmosphere accent="#10b981" secondary="#f59e0b" side="left" subtle />

      <div className={styles.inner}>
        <motion.header
          className={styles.header}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          <span>Process</span>
          <h2>How I move an idea from brief to shipped software.</h2>
          <p>
            A portfolio should prove judgment, not only tools. This is the working style behind the projects.
          </p>
        </motion.header>

        <div className={styles.timeline} aria-hidden="true">
          <div className={styles.progressTrack}>
            <div className={styles.progressBar} />
          </div>
        </div>

        <div className={styles.steps}>
          {steps.map(({ icon: Icon, label, title, text }, index) => (
            <article className={styles.step} key={label}>
              <div className={styles.stepIndex}>0{index + 1}</div>
              <div className={styles.stepIcon}>
                {createElement(Icon, { size: 24 })}
              </div>
              <div>
                <span>{label}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
