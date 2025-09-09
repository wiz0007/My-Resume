import React from "react";
import styles from "./About.module.scss";

const About = () => {
  return (
    <section className={styles.about} id="about">
      <h2>About Me</h2>
      <p>
        Hi, I'm <strong>Ayushmaan Mishra</strong>, currently pursuing a 
        <strong> B.Tech in Computer Science</strong> (2022–2026) from the 
        College of Technology, Pantnagar. I completed my high school in 2019 
        and intermediate in 2021.  
      </p>
      <p>
        My journey in programming started with C, and over time I expanded into 
        <strong> Web Development, Python, C++, Java, and Ethical Hacking</strong>.  
        With hands-on training and projects, I’ve developed a strong foundation 
        in building scalable applications and securing them.
      </p>
    </section>
  );
};

export default About;
