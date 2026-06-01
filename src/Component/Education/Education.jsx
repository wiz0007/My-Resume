import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import styles from "./Education.module.scss";

const education = [
  {
    title: "Intermediate (PCM)",
    school: "Shivalik Holy Mount Academy, Kashipur",
    year: "2021",
    desc: "Completed Intermediate in the PCM stream with 96%.",
    link: "https://www.shivalikhma.com/",
  },
  {
    title: "B.Tech in Computer Engineering",
    school: "College of Technology, Pantnagar",
    year: "2022-2026",
    desc: "Pursuing Bachelor of Technology in Computer Engineering with a full-stack and backend development focus.",
    link: "https://www.gbpuat.ac.in/",
  },
];

const Education = () => {
  return (
    <section className={styles.education} id="education">
      <div className={styles.header}>
        <span>Academic Base</span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Education that supports the engineering path.
        </motion.h2>
      </div>

      <div className={styles.grid}>
        {education.map((e, idx) => (
          <motion.a
            key={e.title}
            href={e.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 190, damping: 18 }}
          >
            <div className={styles.content}>
              <h3>{e.title}</h3>
              <h4>{e.school}</h4>
              <span className={styles.year}>{e.year}</span>
              <p>{e.desc}</p>
            </div>

            <div className={styles.link}>
              <ExternalLink size={18} />
              <span>Visit Site</span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default Education;
