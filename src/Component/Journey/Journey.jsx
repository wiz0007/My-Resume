import { motion } from "framer-motion";
import { Braces, Code2, Database, Rocket, Workflow } from "lucide-react";
import SectionAtmosphere from "../SectionAtmosphere/SectionAtmosphere";
import styles from "./Journey.module.scss";

const milestones = [
  {
    year: "2022",
    title: "Programming foundations",
    copy: "Built a strong base in C, C++, Java, data structures, and object-oriented programming.",
    icon: Braces,
    color: "#f59e0b",
  },
  {
    year: "2023",
    title: "Web interfaces",
    copy: "Moved from static pages to responsive JavaScript interfaces with deliberate UI systems.",
    icon: Code2,
    color: "#22d3ee",
  },
  {
    year: "2024",
    title: "Full-stack systems",
    copy: "Connected React applications to Node.js APIs, authentication, and real-time workflows.",
    icon: Workflow,
    color: "#8b5cf6",
  },
  {
    year: "2025",
    title: "Data and verification",
    copy: "Designed PostgreSQL and MongoDB flows, then added blockchain-backed record verification.",
    icon: Database,
    color: "#10b981",
  },
  {
    year: "2026",
    title: "Production-ready delivery",
    copy: "Combining product thinking, frontend craft, backend security, testing, and deployment.",
    icon: Rocket,
    color: "#60a5fa",
  },
];

const Journey = () => (
  <section className={styles.journey} id="journey" aria-labelledby="journey-title">
    <SectionAtmosphere accent="#10b981" secondary="#8b5cf6" side="left" />
    <header className={styles.header}>
      <span>Development journey</span>
      <h2 id="journey-title">From foundations to complete digital products.</h2>
      <p>Each milestone added another layer: interface, architecture, data, security, and delivery.</p>
    </header>

    <div className={styles.roadmap}>
      <motion.div
        className={styles.energyLine}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />

      {milestones.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.article
            className={styles.milestone}
            style={{ "--accent": item.color }}
            key={item.year}
            initial={{ opacity: 0, y: 40, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
          >
            <div className={styles.node} aria-hidden="true"><Icon size={20} /></div>
            <div className={styles.surface}>
              <span className={styles.year}>{item.year}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <div className={styles.signal} aria-hidden="true"><i /><i /><i /></div>
            </div>
          </motion.article>
        );
      })}
    </div>
  </section>
);

export default Journey;
