import React from "react";
import styles from "./Trainings.module.scss";

const trainings = [
  {
    title: "Web Development Training",
    issuer: "Internshala",
    file: "/certificates/Web_Development.pdf", // place PDFs in public/certificates/
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
  return (
    <section className={styles.trainings} id="trainings">
      <h2>Trainings & Certifications</h2>
      <div className={styles.trainingList}>
        {trainings.map((t, index) => (
          <div key={index} className={styles.trainingCard}>
            <h3>{t.title}</h3>
            <p>Issued by {t.issuer}</p>
            <a href={t.file} target="_blank" rel="noopener noreferrer">
              View Certificate
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trainings;
