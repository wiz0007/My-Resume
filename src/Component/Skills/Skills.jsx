import React from "react";
import styles from "./Skills.module.scss";

const skills = [
  "C", "C++", "Java", "Python", "JavaScript", "React", "Node.js",
  "MongoDB", "Express", "DBMS", "PHP", "Ethical Hacking"
];

const Skills = () => {
  return (
    <section className={styles.skills} id="skills">
      <h2>Skills</h2>
      <div className={styles.grid}>
        {skills.map((skill, idx) => (
          <div key={idx} className={styles.card}>{skill}</div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
