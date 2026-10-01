import { useState, useEffect, useRef, useCallback } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { prefetchRoute } from "../../routes/prefetchRoutes";
import styles from "./Navbar.module.scss";

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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const location = useLocation();

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Edge case 1: Auto-close on route change
  useEffect(() => {
    closeMenu();
  }, [location.pathname, closeMenu]);

  // Edge cases 2, 3, 4: Tap/click outside, Escape key, desktop resize, and scroll lock
  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (e) => {
      // Tap outside check: close if event occurs outside both menu and hamburger button
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target)
      ) {
        closeMenu();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeMenu();
        hamburgerRef.current?.focus();
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 1320) {
        closeMenu();
      }
    };

    // Lock page scrolling while mobile menu is open to prevent background bleed-through
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (window.lenis) {
      window.lenis.stop();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = originalOverflow;
      if (window.lenis) {
        window.lenis.start();
      }
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, closeMenu]);

  const linkClass = ({ isActive }) => (isActive ? styles.active : undefined);
  const warmRoute = (path) => () => prefetchRoute(path);

  return (
    <motion.header
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
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

      <Link to="/" className={styles.logo} aria-label="Ayushmaan Mishra home" onMouseEnter={warmRoute("/")}>
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
        ref={hamburgerRef}
        className={`${styles.hamburger} ${isOpen ? styles.open : ""}`}
        onClick={toggleMenu}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        <span />
        <span />
        <span />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay: handles outside clicks/touches and dims background */}
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              aria-hidden="true"
            />

            <motion.div
              id="mobile-navigation"
              ref={menuRef}
              className={styles.mobileMenu}
              initial={{ opacity: 0, y: -15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
            >
              {mobileLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  className={linkClass}
                  onClick={closeMenu}
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
                onClick={closeMenu}
              >
                Resume
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
