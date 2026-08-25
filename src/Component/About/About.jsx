import React, { createElement } from "react";
import { motion } from "framer-motion";
import { BookOpen, BriefcaseBusiness, Code2, Database, Trophy } from "lucide-react";
import styles from "./About.module.scss";

const pages = [
  {
    id: "01",
    label: "About",
    title: "Builder of useful, complete software.",
    text: "I am Ayushmaan Mishra, a Computer Engineering graduate from GBPUAT Pantnagar building practical full-stack products across React, TypeScript, Spring Boot, FastAPI, MongoDB, Python GUI, and Core Java.",
    meta: ["Full-stack", "Backend-minded", "Open to roles"],
    icon: Code2,
  },
  {
    id: "02",
    label: "Education",
    title: "Computer Engineering foundation.",
    text: "Completed B.Tech in Computer Engineering in June 2026 with a foundation in systems, databases, software design, and engineering fundamentals.",
    meta: ["June 2026", "GBPUAT Pantnagar", "B.Tech completed"],
    icon: BookOpen,
  },
  {
    id: "03",
    label: "Experience",
    title: "Interfaces connected to dependable data flow.",
    text: "I think from the screen to the API to the database: React UI, authentication, validation, testing, ownership checks, and verification workflows.",
    meta: ["React UI", "REST APIs", "Auth workflows"],
    icon: Database,
  },
  {
    id: "04",
    label: "Momentum",
    title: "Projects across practical stacks.",
    text: "Built web, desktop, workflow, commerce, chat, and verification projects with a focus on complete working systems instead of placeholder demos.",
    meta: ["6+ projects", "Multiple stacks", "Live builds"],
    icon: Trophy,
    href: "#projects",
  },
];

const pageVariants = {
  hidden: { opacity: 0, y: 90, rotateX: 8, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

const About = () => (
  <section className={styles.about} id="about">
    <div className={styles.pageTrack}>
      {pages.map(({ id, label, title, text, meta, icon: Icon, href }, index) => (
        <motion.article
          className={styles.page}
          variants={pageVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.44, margin: "-80px 0px -120px 0px" }}
          key={label}
          style={{ "--index": index }}
        >
          <div className={styles.copy}>
            <div className={styles.pageLabel}>
              <span>{id}</span>
              <strong>{label}</strong>
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
            <div className={styles.meta}>
              {meta.map((item) => (
                <span key={item}>{item}</span>
              ))}
              {href && <a href={href}>See projects</a>}
            </div>
          </div>

          <div className={styles.visual} aria-hidden="true">
            <div className={styles.visualIcon}>{createElement(Icon, { size: 42 })}</div>
            <div className={styles.visualLines}>
              <i />
              <i />
              <i />
            </div>
            <BriefcaseBusiness className={styles.watermark} size={160} />
          </div>
        </motion.article>
      ))}
    </div>
  </section>
);

export default About;
