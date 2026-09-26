import { createElement } from "react";
import { motion } from "framer-motion";
import { Braces, Database, Layers, Server, ShieldCheck, Workflow } from "lucide-react";
import styles from "./SkillsArchitecture.module.scss";

const systems = [
  {
    icon: Layers,
    title: "Interface layer",
    text: "Responsive React interfaces, reusable sections, accessible controls, and polished motion.",
  },
  {
    icon: Server,
    title: "Service layer",
    text: "REST APIs, authentication flow, request validation, role boundaries, and integration habits.",
  },
  {
    icon: Database,
    title: "Data layer",
    text: "MongoDB, PostgreSQL, schema thinking, persistence, ownership, and verification workflows.",
  },
  {
    icon: Workflow,
    title: "Product flow",
    text: "Routing, forms, modal states, deployment readiness, debugging, and complete working slices.",
  },
  {
    icon: ShieldCheck,
    title: "Trust layer",
    text: "JWT concepts, RBAC, API validation, secure defaults, testing habits, and edge-case handling.",
  },
  {
    icon: Braces,
    title: "Programming base",
    text: "JavaScript, TypeScript, Python, Java, C/C++, desktop logic, and backend fundamentals.",
  },
];

const SkillsArchitecture = () => (
  <section className={styles.architecture} id="skills-architecture" aria-labelledby="skills-architecture-title">
    <div className={styles.sectionHeader}>
      <span>Architecture Map</span>
      <h2 id="skills-architecture-title">The stack grouped into working layers.</h2>
    </div>

    <div className={styles.grid}>
      {systems.map(({ icon: Icon, title, text }, index) => (
        <motion.article
          key={title}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
        >
          <span>{createElement(Icon, { size: 22 })}</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </motion.article>
      ))}
    </div>
  </section>
);

export default SkillsArchitecture;
