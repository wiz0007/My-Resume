import { createElement, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Braces, DatabaseZap, Layers3, ShieldCheck } from "lucide-react";
import profilepic from "../../assets/MyPic.jpeg";
import { useGsapRefreshOnReady } from "../../hooks/useGsapRefreshOnReady";
import styles from "./HeroStory.module.scss";

const highlights = [
  {
    icon: Layers3,
    eyebrow: "MERN + TypeScript",
    title: "I turn product ideas into structured, responsive web apps.",
    text: "React, TypeScript, Node.js, Express, reusable UI sections, clean route flow, and practical deployment habits.",
  },
  {
    icon: DatabaseZap,
    eyebrow: "Backend + APIs",
    title: "I care about what happens after the button is clicked.",
    text: "Spring Boot, FastAPI, REST APIs, MongoDB, PostgreSQL, schema design, validation, and database-backed workflows.",
  },
  {
    icon: ShieldCheck,
    eyebrow: "Auth + Verification",
    title: "I build with access, trust, and edge cases in mind.",
    text: "JWT authentication, RBAC, HTTP-only auth concepts, API testing, ownership checks, and Polygon Amoy verification.",
  },
  {
    icon: Braces,
    eyebrow: "Engineering Range",
    title: "My work spans web, desktop, logic-heavy tools, and UI polish.",
    text: "From visual DAG validation and commerce flows to Python GUI and Core Java desktop systems, I like complete working software.",
  },
];

const HeroStory = () => {
  const sectionRef = useRef(null);
  useGsapRefreshOnReady([]);

  useLayoutEffect(() => {
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
      const panels = gsap.utils.toArray(`.${styles.panel}`);
      const image = section.querySelector(`.${styles.imageFrame}`);

      gsap.set(panels, { autoAlpha: 0, y: 54 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${highlights.length * 82}%`,
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.fromTo(image, { scale: 0.96, y: 36 }, { scale: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0);

      panels.forEach((panel, index) => {
        if (index > 0) {
          timeline.to(panels[index - 1], { autoAlpha: 0, y: -42, duration: 0.35, ease: "power2.out" }, index);
          timeline.to(panel, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power3.out" }, index + 0.08);
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
    <section className={styles.story} id="profile-story" ref={sectionRef}>
      <div className={styles.inner}>
        <motion.div
          className={styles.imageColumn}
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.imageFrame}>
            <img src={profilepic} alt="Ayushmaan Mishra" loading="eager" />
            <div className={styles.imageBadge}>
              <span>Available for fresher roles</span>
              <strong>Full-stack developer</strong>
            </div>
          </div>
        </motion.div>

        <div className={styles.copyColumn}>
          <div className={styles.panels}>
            {highlights.map(({ icon: Icon, eyebrow, title, text }, index) => (
              <article className={styles.panel} key={eyebrow}>
                <div className={styles.count}>0{index + 1}</div>
                <div className={styles.icon}>{createElement(Icon, { size: 26 })}</div>
                <span>{eyebrow}</span>
                <h2>{title}</h2>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroStory;
