import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import styles from "./Trainings.module.scss";

const trainings = [
  {
    title: "Web Development Training",
    issuer: "Internshala",
    file: "/certificates/Web_Development.pdf",
  },
  {
    title: "Programming with Python",
    issuer: "Internshala",
    file: "/certificates/Python.pdf",
  },
  {
    title: "Programming with C & C++",
    issuer: "Internshala",
    file: "/certificates/C_CPP.pdf",
  },
  {
    title: "Core Java",
    issuer: "Internshala",
    file: "/certificates/Java.pdf",
  },
  {
    title: "Ethical Hacking",
    issuer: "Internshala",
    file: "/certificates/Ethical_Hacking.pdf",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
};

const Trainings = () => {
  return (
    <section className={styles.trainings} id="trainings">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Trainings & Certifications
      </motion.h2>

      <motion.div
        className={styles.trainingList}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {trainings.map((t, index) => (
          <motion.div
            key={index}
            className={styles.trainingCard}
            variants={cardVariants}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className={styles.iconWrapper}>
              <Award size={36} strokeWidth={1.6} />
            </div>
            <h3>{t.title}</h3>
            <p>Issued by {t.issuer}</p>
            <a href={t.file} target="_blank" rel="noopener noreferrer">
              View Certificate
            </a>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Trainings;
