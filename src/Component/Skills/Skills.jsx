import React from "react";
import { motion } from "framer-motion";
import { Braces, Database, GitBranch, Layers, Server, Shield } from "lucide-react";
import styles from "./Skills.module.scss";

const skillGroups = [
  {
    title: "Languages",
    icon: <Braces size={24} />,
    skills: ["C", "C++", "Java", "Python", "JavaScript", "TypeScript", "PHP"],
  },
  {
    title: "Frontend",
    icon: <Layers size={24} />,
    skills: ["React.js", "HTML5", "CSS3", "SCSS", "Responsive UI", "Reusable components"],
  },
  {
    title: "Backend",
    icon: <Server size={24} />,
    skills: ["Node.js", "Express.js", "FastAPI", "REST APIs", "JWT auth", "RBAC"],
  },
  {
    title: "Databases",
    icon: <Database size={24} />,
    skills: ["MongoDB", "PostgreSQL", "Schema design", "Database workflows"],
  },
  {
    title: "Blockchain",
    icon: <Shield size={24} />,
    skills: ["Polygon Amoy", "Anchored transactions", "Web3 basics", "Verification concepts"],
  },
  {
    title: "Tools",
    icon: <GitBranch size={24} />,
    skills: ["Git", "GitHub", "Postman", "API testing", "Debugging", "Deployment basics"],
  },
];

const skillVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: index * 0.08, ease: "easeOut" },
  }),
};

const Skills = () => {
  return (
    <section className={styles.skills} id="skills">
      <div className={styles.bgCode} aria-hidden="true">
        {"{ }"}
      </div>
      <div className={styles.header}>
        <span>Technical Capability</span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Skills organized by how I build.
        </motion.h2>
      </div>

      <motion.div
        className={styles.grid}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {skillGroups.map((group, index) => (
          <motion.article
            className={styles.card}
            key={group.title}
            custom={index}
            variants={skillVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
          >
            <div className={styles.cardHeader}>
              <span className={styles.icon}>{group.icon}</span>
              <h3>{group.title}</h3>
            </div>
            <div className={styles.tags}>
              {group.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
