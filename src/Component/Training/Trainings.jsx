import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, X } from "lucide-react";
import SectionAtmosphere from "../SectionAtmosphere/SectionAtmosphere";
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

const Trainings = () => {
  const [openPDF, setOpenPDF] = useState(null);

  return (
    <section className={styles.trainings} id="trainings">
      <SectionAtmosphere accent="#8b5cf6" secondary="#10b981" side="left" subtle />
      <div className={styles.header}>
        <span>Certifications</span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Training credentials that support the stack.
        </motion.h2>
      </div>

      <div className={styles.grid}>
        {trainings.map((training, index) => (
          <motion.article
            key={training.title}
            className={styles.card}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -8 }}
          >
            <span className={styles.icon}>
              <Award size={24} />
            </span>

            <h3>{training.title}</h3>
            <p>Issued by {training.issuer}</p>

            <button
              type="button"
              onClick={() => setOpenPDF(training.file)}
              className={styles.viewBtn}
            >
              View Certificate
            </button>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {openPDF && (
          <motion.div
            className={styles.modalOverlay}
            onClick={() => setOpenPDF(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.modalContent}
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <iframe src={openPDF} title="Certificate" />
              <button className={styles.closeBtn} type="button" onClick={() => setOpenPDF(null)} aria-label="Close certificate">
                <X size={18} />
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Trainings;
