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
    year: "2022–2026",
    desc: "Pursuing Bachelor of Technology in Computer Engineering.",
    link: "https://www.gbpuat.ac.in/",
  },
];

const Education = () => {
  return (
    <section className={styles.education} id="education">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Education
      </motion.h2>

      <div className={styles.grid}>
        {education.map((e, idx) => (
          <motion.a
            key={idx}
            href={e.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
            whileHover={{ scale: 1.05, y: -6 }}
            transition={{ type: "spring", stiffness: 200 }}
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
