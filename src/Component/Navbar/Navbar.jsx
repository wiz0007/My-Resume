import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.scss";
import { prefetchRoute } from "../../routes/prefetchRoutes";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const leftLinks = [
    { label: "Home", to: "/" },
    { label: "Projects", to: "/projects" },
    { label: "Process", to: "/process" },
    { label: "Skills", to: "/skills" },
  ];
  const rightLinks = [
    { label: "Profile", to: "/profile" },
    { label: "Contact", to: "/contact" },
  ];
  const mobileLinks = [...leftLinks, ...rightLinks];

  const linkClass = ({ isActive }) => (isActive ? styles.active : undefined);
  const warmRoute = (path) => () => prefetchRoute(path);

  return (
    <motion.header
      className={`${styles.navbar} ${
        isScrolled ? styles.scrolled : ""
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <nav className={`${styles.navLinks} ${styles.leftLinks}`} aria-label="Primary navigation left">
        {leftLinks.map((link) => (
          <NavLink
            key={link.label}
            to={link.to}
            className={linkClass}
            end={link.to === "/"}
            onMouseEnter={warmRoute(link.to)}
            onFocus={warmRoute(link.to)}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <Link to="/" className={styles.logo} aria-label="Ayushmaan Mishra home">
        Ayushmaan Mishra
      </Link>

      <nav className={`${styles.navLinks} ${styles.rightLinks}`} aria-label="Primary navigation right">
        {rightLinks.map((link) => (
          <NavLink
            key={link.label}
            to={link.to}
            className={linkClass}
            onMouseEnter={warmRoute(link.to)}
            onFocus={warmRoute(link.to)}
          >
            {link.label}
          </NavLink>
        ))}

        <a href="/Ayushmaan_Mishra-Resume.pdf" target="_blank" rel="noopener noreferrer">
          Resume
        </a>
      </nav>

      <button
        className={`${styles.hamburger} ${
          isOpen ? styles.open : ""
        }`}
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <span />
        <span />
        <span />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            {mobileLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={linkClass}
                onClick={() => setIsOpen(false)}
                onFocus={warmRoute(link.to)}
                end={link.to === "/"}
              >
                {link.label}
              </NavLink>
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
