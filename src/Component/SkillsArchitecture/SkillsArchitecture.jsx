import { createElement, useEffect, useRef, useCallback } from "react";
import { Braces, ChevronLeft, ChevronRight, Database, Layers, Server, ShieldCheck, Workflow } from "lucide-react";
import { useReducedMotionPreference } from "../../hooks/useMediaPreferences";
import { useNearViewport } from "../../hooks/useNearViewport";
import { usePageVisibility } from "../../hooks/usePageVisibility";
import styles from "./SkillsArchitecture.module.scss";

const systems = [
  {
    icon: Layers,
    title: "Interface layer",
    text: "Responsive React interfaces, reusable sections, accessible controls, and polished motion.",
  },
  {
    icon: Server,
    title: "Service layer",
    text: "REST APIs, authentication flow, request validation, role boundaries, and integration habits.",
  },
  {
    icon: Database,
    title: "Data layer",
    text: "MongoDB, PostgreSQL, schema thinking, persistence, ownership, and verification workflows.",
  },
  {
    icon: Workflow,
    title: "Product flow",
    text: "Routing, forms, modal states, deployment readiness, debugging, and complete working slices.",
  },
  {
    icon: ShieldCheck,
    title: "Trust layer",
    text: "JWT concepts, RBAC, API validation, secure defaults, testing habits, and edge-case handling.",
  },
  {
    icon: Braces,
    title: "Programming base",
    text: "JavaScript, TypeScript, Python, Java, C/C++, desktop logic, and backend fundamentals.",
  },
];

// 3 identical sets ensure seamless, infinite scrolling in both directions
const railItems = [...systems, ...systems, ...systems];

const AnimatedArchitecture = () => {
  const containerRef = useRef(null);
  const nearViewport = useNearViewport(containerRef);
  const pageVisible = usePageVisibility();
  const reducedMotion = useReducedMotionPreference();
  const isHoveredRef = useRef(false);
  const isInteractingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const rafIdRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const momentumRafRef = useRef(null);
  const isTouchingRef = useRef(false);

  // Wraparound helper: seamlessly keeps scrollLeft within the center set
  const handleInfiniteWrap = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const singleSetWidth = container.scrollWidth / 3;
    if (singleSetWidth <= 0) return;

    if (container.scrollLeft >= singleSetWidth * 2) {
      container.scrollLeft -= singleSetWidth;
    } else if (container.scrollLeft < singleSetWidth * 0.5) {
      container.scrollLeft += singleSetWidth;
    }
  }, []);

  // Initialize scroll position in the center set
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const initScroll = () => {
      const singleSetWidth = container.scrollWidth / 3;
      if (singleSetWidth > 0 && container.scrollLeft === 0) {
        container.scrollLeft = singleSetWidth;
      }
    };

    initScroll();
    const raf = requestAnimationFrame(initScroll);
    return () => cancelAnimationFrame(raf);
  }, []);

  const scheduleResume = useCallback((delay = 1200) => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, delay);
  }, []);

  // Smooth continuous auto-scroll loop: moves endlessly when user is not interacting or hovering
  useEffect(() => {
    if (reducedMotion || !nearViewport || !pageVisible) return;

    let lastTime = performance.now();
    const speed = 0.65; // pixels per frame for smooth continuous gliding

    const tick = (now) => {
      const delta = Math.min((now - lastTime) / 16.667, 2);
      lastTime = now;

      const container = containerRef.current;
      if (
        container &&
        !isHoveredRef.current &&
        !isInteractingRef.current &&
        !isDraggingRef.current &&
        !isTouchingRef.current
      ) {
        container.scrollLeft += speed * delta;
        handleInfiniteWrap();
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [handleInfiniteWrap, nearViewport, pageVisible, reducedMotion]);

  useEffect(() => () => {
    if (momentumRafRef.current) cancelAnimationFrame(momentumRafRef.current);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, []);

  // Touch gesture handling via non-passive listeners to allow smooth horizontal finger scrolling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;
    let isScrolling = null; // null = undecided, true = vertical page scroll, false = horizontal drag

    const onTouchStart = (e) => {
      if (!e.touches || !e.touches[0]) return;
      if (momentumRafRef.current) cancelAnimationFrame(momentumRafRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);

      isInteractingRef.current = true;
      isTouchingRef.current = true;
      isScrolling = null;

      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      lastX = touch.clientX;
      lastTime = performance.now();
      velocity = 0;
    };

    const onTouchMove = (e) => {
      if (!isTouchingRef.current || !e.touches || !e.touches[0]) return;

      const touch = e.touches[0];
      const currentX = touch.clientX;
      const currentY = touch.clientY;
      const diffX = currentX - startX;
      const diffY = currentY - startY;

      if (isScrolling === null) {
        if (Math.abs(diffX) > 6 || Math.abs(diffY) > 6) {
          // If vertical movement is greater, let browser scroll the page
          isScrolling = Math.abs(diffY) > Math.abs(diffX);
        }
      }

      if (isScrolling === false) {
        // Horizontal finger swipe: prevent page jitter and scrub cards
        if (e.cancelable) e.preventDefault();

        const now = performance.now();
        const dt = now - lastTime;
        if (dt > 8) {
          velocity = (lastX - currentX) / dt;
          lastTime = now;
        }

        const deltaX = lastX - currentX;
        lastX = currentX;

        container.scrollLeft += deltaX;
        handleInfiniteWrap();
      }
    };

    const onTouchEnd = () => {
      if (!isTouchingRef.current) return;
      isTouchingRef.current = false;

      // Apply flick momentum decay for quick swipes
      if (isScrolling === false && Math.abs(velocity) > 0.12) {
        let vel = velocity * 15;
        const glide = () => {
          if (!isTouchingRef.current && Math.abs(vel) > 0.3 && containerRef.current) {
            containerRef.current.scrollLeft += vel;
            handleInfiniteWrap();
            vel *= 0.92;
            momentumRafRef.current = requestAnimationFrame(glide);
          }
        };
        momentumRafRef.current = requestAnimationFrame(glide);
      }

      isScrolling = null;
      scheduleResume(1800);
    };

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    container.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [handleInfiniteWrap, scheduleResume]);

  // Mouse drag handling for desktop users
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    const container = containerRef.current;
    if (!container) return;

    isInteractingRef.current = true;
    isDraggingRef.current = true;
    startXRef.current = e.clientX;

    const onMouseMove = (moveEvent) => {
      if (!isDraggingRef.current || !containerRef.current) return;
      const deltaX = startXRef.current - moveEvent.clientX;
      startXRef.current = moveEvent.clientX;
      containerRef.current.scrollLeft += deltaX;
      handleInfiniteWrap();
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      scheduleResume(1200);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  // Infinite wrapping check on scroll
  const handleScroll = () => {
    handleInfiniteWrap();
  };

  // Hover states to pause auto-scroll calmly while mouse is over the container
  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    if (!isDraggingRef.current) {
      scheduleResume(600);
    }
  };

  // One-click step scroll (Prev / Next buttons)
  const handleScrollStep = (direction) => {
    const container = containerRef.current;
    if (!container) return;

    isInteractingRef.current = true;
    const cardEl = container.querySelector(`.${styles.card}`);
    const stepSize = (cardEl ? cardEl.offsetWidth + 24 : 340) * direction;
    container.scrollBy({ left: stepSize, behavior: "smooth" });
    setTimeout(handleInfiniteWrap, 350);
    scheduleResume(2000);
  };

  return (
    <section className={styles.architecture} id="skills-architecture" aria-labelledby="skills-architecture-title">
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow}>Architectural Layers</span>
        <h2 id="skills-architecture-title">
          The stack grouped into <span className={styles.accent}>working layers.</span>
        </h2>
        <p className={styles.subtitle}>
          End-to-end capabilities mapped across product interface, backend services, and reliable persistence.
        </p>
      </div>

      <div className={styles.railWrapper}>
        <button
          type="button"
          className={`${styles.navBtn} ${styles.prev}`}
          onClick={() => handleScrollStep(-1)}
          aria-label="Scroll to previous flow"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          className={`${styles.navBtn} ${styles.next}`}
          onClick={() => handleScrollStep(1)}
          aria-label="Scroll to next flow"
        >
          <ChevronRight size={20} />
        </button>

        <div
          ref={containerRef}
          className={styles.railContainer}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles.railSleepers} aria-hidden="true" />
          <div className={styles.track}>
            {railItems.map(({ icon: Icon, title, text }, i) => (
              <article className={styles.card} key={`${title}-${i}`}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardIcon}>{createElement(Icon, { size: 20 })}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <div className={styles.connector} aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedArchitecture;
