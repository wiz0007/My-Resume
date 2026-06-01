import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = document.querySelectorAll("section[id]");

      sections.forEach((section) => {
        const top = section.offsetTop - 120;
        const height = section.offsetHeight;

        if (
          window.scrollY >= top &&
          window.scrollY < top + height
        ) {
          setActive(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    "Home",
    "About",
    "Projects",
    "Skills",
    "Education",
    "Contact",
  ];

  return (
    <motion.header
      className={`${styles.navbar} ${
        isScrolled ? styles.scrolled : ""
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <a href="#home" className={styles.logo}>
        <div className={styles.logoIcon}>AM</div>

        <div className={styles.logoText}>
          <span>Ayushmaan Mishra</span>
          <small>Full-Stack Developer</small>
        </div>
      </a>

      {/* Desktop Navigation */}
      <nav className={styles.navLinks}>
        {links.map((link) => {
          const id = link.toLowerCase();

          return (
            <a
              key={link}
              href={`#${id}`}
              className={active === id ? styles.active : ""}
            >
              {link}
            </a>
          );
        })}

        <a
          href="/Ayushmaan_Mishra-Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.resumeBtn}
        >
          Resume
        </a>
      </nav>

      {/* Hamburger */}
      <button
        className={`${styles.hamburger} ${
          isOpen ? styles.open : ""
        }`}
        onClick={toggleMenu}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
              >
                {link}
              </a>
            ))}

            <a
              href="/Ayushmaan_Mishra-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileResume}
            >
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;