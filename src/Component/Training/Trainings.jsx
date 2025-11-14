import React, { useState } from "react";
import styles from "./Trainings.module.scss";
import { motion } from "framer-motion";
import { FaCertificate } from "react-icons/fa";

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
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Trainings & Certifications
      </motion.h2>

      <div className={styles.grid}>
        {trainings.map((t, index) => (
          <motion.div
            key={index}
            className={styles.card}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <FaCertificate className={styles.icon} />

            <h3>{t.title}</h3>
            <p>Issued by {t.issuer}</p>

            <button
              onClick={() => setOpenPDF(t.file)}
              className={styles.viewBtn}
            >
              View Certificate
            </button>
          </motion.div>
        ))}
      </div>

      {/* PDF MODAL VIEWER */}
      {openPDF && (
        <div className={styles.modalOverlay} onClick={() => setOpenPDF(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <iframe src={openPDF} title="Certificate" />
            <button className={styles.closeBtn} onClick={() => setOpenPDF(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Trainings;

