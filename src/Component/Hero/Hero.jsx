import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import styles from "./Hero.module.scss";
import profilepic from "../../assets/MyPic.jpeg";
import HeroBackground from "../../three/HeroBackground";

const slides = [
  {
    title: "MERN + TypeScript",
    text: "React, Node.js, Express, REST APIs, JWT auth, and reusable UI systems.",
  },
  {
    title: "Backend + APIs",
    text: "Spring Boot, MongoDB, API testing, role-based access, and backend flow design.",
  },
  {
    title: "Blockchain Verification",
    text: "Polygon Amoy anchored transactions for tamper-aware records.",
  },
];

const stats = [
  { value: "6+", label: "Projects built" },
  { value: "2026", label: "B.Tech graduation" },
  { value: "MERN", label: "Web stack" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.hero} id="home">
      <HeroBackground />
      <div className={styles.container}>
        <motion.div
          className={styles.textContent}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.p className={styles.eyebrow} variants={itemVariants}>
            Full-Stack Developer | MERN | TypeScript | FastAPI | Spring Boot
          </motion.p>

          <motion.h1 className={styles.srOnly} variants={itemVariants}>
            Ayushmaan Mishra - Full Stack Developer Portfolio
          </motion.h1>

          <motion.p className={styles.summary} variants={itemVariants}>
            I am Ayushmaan Mishra, a final-year Computer Engineering student
            working across MERN, TypeScript, Spring Boot, MongoDB, Python GUI,
            and Core Java projects.
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className={styles.slide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                {slides[current].title}
              </motion.h2>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {slides[current].text}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <motion.div className={styles.buttons} variants={itemVariants}>
            <motion.a
              href="#projects"
              className={styles.btnPrimary}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>

            <motion.a
              href="/Ayushmaan_Mishra-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnSecondary}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={18} />
              Resume
            </motion.a>
          </motion.div>

          <motion.div
            className={styles.socials}
            aria-label="Professional links"
            variants={itemVariants}
          >
            <a
              href="https://github.com/wiz0007"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://in.linkedin.com/in/ayushmaan-mishra-254020257"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a href="mailto:ayush8171wiz@gmail.com" aria-label="Email">
              <Mail size={20} />
            </a>
          </motion.div>

          <div className={styles.dots}>
            {slides.map((_, index) => (
              <button
                type="button"
                key={index}
                className={`${styles.dot} ${current === index ? styles.active : ""}`}
                onClick={() => setCurrent(index)}
                aria-label={`Show slide ${index + 1}`}
                aria-current={current === index}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.imageWrapper}
          initial={{ opacity: 0, scale: 0.9, x: -50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className={styles.profileMeta}>
            <span>Available for fresher roles</span>
            <strong>Full-Stack Developer</strong>
          </div>
          <motion.img
            src={profilepic}
            alt="Ayushmaan Mishra Full Stack Developer"
          />
        </motion.div>
      </div>

      <motion.div
        className={styles.stats}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.7 }}
      >
        {stats.map((item) => (
          <div className={styles.stat} key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;
