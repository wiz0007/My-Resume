import { createElement, useEffect, useRef, useCallback } from "react";
import { Braces, ChevronLeft, ChevronRight, Database, Layers, Server, ShieldCheck, Workflow } from "lucide-react";
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

const SkillsArchitecture = () => {
  const containerRef = useRef(null);
  const isInteractingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const rafIdRef = useRef(null);
  const resumeTimerRef = useRef(null);

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

    const singleSetWidth = container.scrollWidth / 3;
    if (singleSetWidth > 0 && container.scrollLeft === 0) {
      container.scrollLeft = singleSetWidth;
    }
  }, []);

  const scheduleResume = useCallback((delay = 1200) => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, delay);
  }, []);

  // Smooth continuous auto-scroll loop
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    let lastTime = performance.now();
    const speed = 0.65; // pixels per frame for smooth continuous gliding

    const tick = (now) => {
      const delta = Math.min((now - lastTime) / 16.667, 2);
      lastTime = now;

      const container = containerRef.current;
      if (container && !isInteractingRef.current && !isDraggingRef.current) {
        container.scrollLeft += speed * delta;
        handleInfiniteWrap();
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [handleInfiniteWrap]);

  // Pointer drag handling for mouse drag (horizontal scrubbing)
  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    const container = containerRef.current;
    if (!container) return;

    if (e.pointerType !== "touch") {
      isInteractingRef.current = true;
      isDraggingRef.current = true;
      startXRef.current = e.clientX;
      startScrollLeftRef.current = container.scrollLeft;
      container.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const container = containerRef.current;
    if (!container) return;

    const diff = e.clientX - startXRef.current;
    container.scrollLeft = startScrollLeftRef.current - diff;
    handleInfiniteWrap();
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const container = containerRef.current;
    if (container && container.hasPointerCapture(e.pointerId)) {
      container.releasePointerCapture(e.pointerId);
    }
    scheduleResume(1200);
  };

  // Hover states to pause auto-scroll and allow user inspection
  const handleMouseEnter = () => {
    isInteractingRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const handleMouseLeave = () => {
    if (!isDraggingRef.current) {
      scheduleResume(500);
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
        <h2 id="skills-architecture-title">The stack grouped into working layers.</h2>
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
          onScroll={handleInfiniteWrap}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
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

export default SkillsArchitecture;
