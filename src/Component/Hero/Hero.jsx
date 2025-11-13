import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Hero.module.scss";
import profilepic from "../../assets/profile.png";

const slides = [
  {
    title: "Full-Stack Developer",
    text: "Building modern, scalable web applications using the MERN stack with precision and style.",
  },
  {
    title: "UI/UX Enthusiast",
    text: "Designing beautiful, accessible, and responsive interfaces that elevate digital experiences.",
  },
  {
    title: "Problem Solver",
    text: "Transforming complex challenges into elegant, efficient, and user-focused solutions.",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.hero} id="home">
      <div className={styles.container}>
        {/* Left Animated Text Section */}
        <div className={styles.textContent}>
          <h1>
            Hi, I’m <span>Ayushmaan Mishra</span>
          </h1>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className={styles.slide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            >
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                {slides[current].title}
              </motion.h2>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.2 }}
              >
                {slides[current].text}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <div className={styles.buttons}>
            <motion.a
              href="#projects"
              className={styles.btnPrimary}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>

            <motion.a
              href="#contact"
              className={styles.btnSecondary}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </div>

          <div className={styles.dots}>
            {slides.map((_, index) => (
              <div
                key={index}
                className={`${styles.dot} ${
                  current === index ? styles.active : ""
                }`}
                onClick={() => setCurrent(index)}
              />
            ))}
          </div>
        </div>

        {/* Right Animated Image */}
        <motion.div
          className={styles.imageWrapper}
          key={`image-${current}`}
          initial={{ opacity: 0, scale: 0.9, x: -50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.9, x: 50 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <motion.img
            src={profilepic}
            alt="Profile"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

