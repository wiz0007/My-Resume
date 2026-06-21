import React from "react";
import { motion } from "framer-motion";
import { BookOpen, BriefcaseBusiness, Code2, Trophy } from "lucide-react";
import { pointerTilt } from "../../utils/pointerTilt";
import SectionAtmosphere from "../SectionAtmosphere/SectionAtmosphere";
import styles from "./About.module.scss";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, delay, ease: "easeOut" },
  }),
};

const About = () => (
  <section className={styles.about} id="about">
    <SectionAtmosphere accent="#22d3ee" secondary="#8b5cf6" side="right" />

    <motion.header
      className={styles.header}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.45 }}
    >
      <motion.span variants={reveal}>Inside the build</motion.span>
      <motion.h2 variants={reveal} custom={0.06}>
        I care about the whole system, not only the screen.
      </motion.h2>
      <motion.p variants={reveal} custom={0.12}>
        A little depth, a lot of practical engineering.
      </motion.p>
    </motion.header>

    <div className={styles.bento}>
      <motion.article
        className={`${styles.card} ${styles.profileCard}`}
        style={{ "--accent": "#22d3ee" }}
        onPointerMove={pointerTilt.onPointerMove}
        onPointerLeave={pointerTilt.onPointerLeave}
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className={styles.cardGlow} aria-hidden="true" />
        <div className={styles.cardCopy}>
          <span className={styles.cardLabel}>01 · About</span>
          <h3>Builder of useful, complete software.</h3>
          <p>
            I’m Ayushmaan Mishra, a final-year Computer Engineering student
            building across MERN, TypeScript, FastAPI, PostgreSQL, MongoDB,
            Python GUI, and Core Java.
          </p>
          <div className={styles.pills}>
            <span>Full-stack</span>
            <span>Backend-minded</span>
            <span>Open to roles</span>
          </div>
        </div>
        <div className={styles.depthVisual} aria-hidden="true">
          <div className={styles.depthPlane} />
          <div className={styles.depthPlane} />
          <div className={styles.depthPlane}>
            <Code2 size={54} />
            <strong>AM</strong>
          </div>
          <span className={styles.orbit} />
        </div>
      </motion.article>

      <motion.article
        className={`${styles.card} ${styles.educationCard}`}
        style={{ "--accent": "#8b5cf6" }}
        onPointerMove={pointerTilt.onPointerMove}
        onPointerLeave={pointerTilt.onPointerLeave}
        variants={reveal}
        initial="hidden"
        whileInView="show"
        custom={0.08}
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className={styles.cardGlow} aria-hidden="true" />
        <div className={styles.iconBlock}><BookOpen size={28} /></div>
        <span className={styles.cardLabel}>02 · Education</span>
        <h3>Computer Engineering</h3>
        <p>Systems, databases, software design, and the engineering foundations behind every build.</p>
        <div className={styles.cardFooter}><strong>2026</strong><span>B.Tech graduation</span></div>
      </motion.article>

      <motion.article
        className={`${styles.card} ${styles.experienceCard}`}
        style={{ "--accent": "#06b6d4" }}
        onPointerMove={pointerTilt.onPointerMove}
        onPointerLeave={pointerTilt.onPointerLeave}
        variants={reveal}
        initial="hidden"
        whileInView="show"
        custom={0.14}
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className={styles.cardGlow} aria-hidden="true" />
        <div className={styles.iconBlock}><BriefcaseBusiness size={28} /></div>
        <span className={styles.cardLabel}>03 · Experience</span>
        <h3>Interface to database.</h3>
        <p>React UI, APIs, authentication, database workflows, testing, and verification concepts.</p>
        <div className={styles.signal} aria-hidden="true"><i /><i /><i /><i /></div>
      </motion.article>

      <motion.article
        className={`${styles.card} ${styles.achievementCard}`}
        style={{ "--accent": "#10b981" }}
        onPointerMove={pointerTilt.onPointerMove}
        onPointerLeave={pointerTilt.onPointerLeave}
        variants={reveal}
        initial="hidden"
        whileInView="show"
        custom={0.2}
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className={styles.cardGlow} aria-hidden="true" />
        <div className={styles.iconBlock}><Trophy size={28} /></div>
        <span className={styles.cardLabel}>04 · Momentum</span>
        <div className={styles.metric}><strong>6+</strong><span>projects built across multiple stacks</span></div>
        <a href="#journey">See the journey <span aria-hidden="true">↗</span></a>
      </motion.article>
    </div>
  </section>
);

export default About;