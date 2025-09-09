import React from "react";
import styles from "./Hero.module.scss";
import profilepic from '../../assets/profilepic.jpg'

const Hero = () => {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.content}>
        <h1>
          Hi, I’m <span className={styles.highlight}>Ayushmaan Mishra</span>
        </h1>
        <p>
          A passionate <strong>Full-Stack Developer</strong> building modern web
          applications with MERN stack.
        </p>
        <div className={styles.buttons}>
          <a href="#projects" className={styles.btnPrimary}>View Projects</a>
          <a href="#contact" className={styles.btnSecondary}>Contact Me</a>
        </div>
      </div>
      <div className={styles.imageWrapper}>
        <img
          src="/profile.png" 
          alt={profilepic}
          loading="eager"
        />
      </div>
    </section>
  );
};

export default Hero;
