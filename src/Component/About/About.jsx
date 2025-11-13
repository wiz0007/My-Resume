import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./About.module.scss";

const About = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section className={styles.about} id="about">
      {/* Animated Background */}
      <motion.div className={styles.bg} style={{ y }} />

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2>About Me</h2>
        <div className={styles.underline}></div>

        <p>
          Hi, I'm <strong>Ayushmaan Mishra</strong>, currently pursuing a{" "}
          <strong>B.Tech in Computer Science</strong> (2022–2026) from the
          College of Technology, Pantnagar. I completed my high school in 2019
          and intermediate in 2021.
        </p>

        <p>
          My journey in programming started with C, and over time I expanded
          into <strong>Web Development, Python, C++, Java, and Ethical Hacking</strong>.
          With hands-on projects and training, I’ve developed a strong foundation
          in building scalable applications and securing them.
        </p>

        <motion.a
          href="#projects"
          className={styles.cta}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore My Work
        </motion.a>
      </motion.div>
    </section>
  );
};

export default About;
