import React from "react";
import { motion } from "framer-motion";
import { Code2, Database, ShieldCheck } from "lucide-react";
import styles from "./About.module.scss";

const strengths = [
  {
    icon: <Code2 size={24} />,
    title: "Application Flow",
    text: "Comfortable explaining the path from React UI to REST API, authentication checks, database operation, and response handling.",
  },
  {
    icon: <Database size={24} />,
    title: "Backend Thinking",
    text: "Focused on API design, database-backed workflows, schema decisions, debugging, and Postman-based testing.",
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Secure Systems",
    text: "Hands-on with JWT authentication, role-based access control, and verification-oriented blockchain concepts.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: index * 0.1, ease: "easeOut" },
  }),
};

const About = () => {
  return (
    <section className={styles.about} id="about">
      <div className={styles.accentLine} aria-hidden="true" />
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className={styles.copy}>
          <span className={styles.kicker}>Professional Summary</span>
          <h2>Full-stack developer with backend depth and project ownership.</h2>
          <p>
            I am a final-year Computer Engineering student at College of
            Technology, Pantnagar, building production-style projects across
            frontend, backend, databases, authentication, and deployment basics.
          </p>
          <p>
            My strongest work is in MERN stack applications, TypeScript-driven
            project structure, REST API flows, JWT authentication, MongoDB and
            PostgreSQL workflows, and blockchain-backed verification features.
          </p>
          <a className={styles.cta} href="#projects">
            Review Featured Work
          </a>
        </div>

        <div className={styles.strengthGrid}>
          {strengths.map((item, index) => (
            <motion.article
              className={styles.strength}
              key={item.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              whileHover={{ y: -8 }}
            >
              <span>{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
