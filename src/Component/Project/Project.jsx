import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  BriefcaseBusiness,
  ExternalLink,
  Gamepad2,
  Github,
  GraduationCap,
  Hotel,
  MessageCircle,
  PanelsTopLeft,
  School,
  ShoppingBag,
  Workflow,
  X,
} from "lucide-react";
import styles from "./Project.module.scss";

const projects = [
  {
    title: "SkillSphere",
    label: "Final Year Project",
    category: "Full-Stack + Web3",
    icon: GraduationCap,
    desc: "Skill-sharing platform with authentication, role-based access, database-backed workflows, and Polygon Amoy transaction verification.",
    outcome: "Built as a final-year product with multi-role workflows and blockchain-backed verification.",
    stack: ["TypeScript", "MERN", "PostgreSQL", "MongoDB", "Polygon Amoy"],
    live: "https://skillsphere.online",
  },
  {
    title: "SchoolSys",
    label: "Under Development",
    category: "School Platform",
    icon: School,
    desc: "School management platform for profiles, students, staff, classes, and attendance with HTTP-only authentication and refresh-token rotation.",
    outcome: "Focuses on secure tenancy boundaries, token rotation, and admin-grade school operations.",
    stack: ["Angular", "Spring Boot", "PostgreSQL", "Laravel", "JWT"],
    live: "https://school-management-space-frontend.vercel.app",
  },
  {
    title: "Pipeline Builder & DAG Validator",
    label: "React Project",
    category: "Visual Workflow Tool",
    icon: Workflow,
    desc: "Visual node and edge editor with a FastAPI parser that returns node count, edge count, and DAG validation using DFS.",
    outcome: "Turns a visual workflow into structured graph analysis with immediate validation feedback.",
    stack: ["React", "React Flow", "FastAPI", "Python", "DFS"],
    live: "https://react-node-project-lm7m.vercel.app",
  },
  {
    title: "E-Commerce Application",
    label: "MERN Web App",
    category: "Commerce System",
    icon: ShoppingBag,
    desc: "Shopping flow with products, cart, authentication, orders, and payment integration.",
    outcome: "Covers the core commerce journey from browsing to checkout-oriented order flow.",
    stack: ["MERN", "REST APIs", "Authentication", "Payments"],
    live: "https://my-kart-taupe.vercel.app/",
  },
  {
    title: "Community Chat",
    label: "Real-time Web App",
    category: "Communication",
    icon: MessageCircle,
    desc: "MERN chat application with secure user access, message workflows, and reusable modules.",
    outcome: "Packages real-time communication patterns into a reusable authenticated web experience.",
    stack: ["MERN", "Real-time", "Authentication"],
    live: "https://we-chatt-ruby.vercel.app",
  },
  {
    title: "Fantasy Game",
    label: "Python Desktop App",
    category: "Game Logic",
    icon: Gamepad2,
    desc: "Python desktop application for team selection and score-based fantasy game logic.",
    outcome: "Applies desktop UI structure and scoring rules to an interactive selection workflow.",
    stack: ["Python", "Desktop GUI", "Game Logic"],
    code: "https://github.com/wiz0007/Fantasy-Game-App",
  },
  {
    title: "Hotel Management",
    label: "Java Desktop App",
    category: "Management System",
    icon: Hotel,
    desc: "Core Java desktop application for room booking, customer records, and hotel workflows.",
    outcome: "Models operational CRUD workflows around booking, rooms, and customer records.",
    stack: ["Core Java", "Desktop GUI", "Booking Logic"],
    code: "https://github.com/wiz0007/Hotel_management",
  },
  {
    title: "Portfolio Website",
    label: "Frontend Experience",
    category: "Interactive Portfolio",
    icon: PanelsTopLeft,
    desc: "Responsive React portfolio with animated sections, 3D experiences, project presentation, and SEO setup.",
    outcome: "Uses Framer Motion, Three.js, and responsive SCSS to present project evidence with polish.",
    stack: ["React", "Three.js", "SCSS", "Framer Motion"],
    live: "https://ayushmaan-mishra-resume.vercel.app/",
  },
  {
    title: "Freelance Application",
    label: "Service Website",
    category: "Client Acquisition",
    icon: BriefcaseBusiness,
    desc: "Service-focused React website for showcasing work and generating client interest.",
    outcome: "Structures a service offer around clear messaging, navigation, and project presentation.",
    stack: ["React", "Landing Flow", "Project Showcase"],
    live: "https://innovatech-puce.vercel.app",
  },
];

const ProjectVisual = ({ project, large = false }) => {
  const Icon = project.icon;

  return (
    <div className={`${styles.projectVisual} ${large ? styles.largeVisual : ""}`} aria-hidden="true">
      <div className={styles.windowBar}>
        <span />
        <span />
        <span />
      </div>
      <div className={styles.visualBody}>
        <div className={styles.visualHeader}>
          <span>{project.category}</span>
          <Icon size={large ? 34 : 28} />
        </div>
        <div className={styles.visualLines}>
          <i />
          <i />
          <i />
        </div>
        <div className={styles.visualFooter}>
          <span>{project.stack[0]}</span>
          <span>{project.stack[1]}</span>
        </div>
      </div>
    </div>
  );
};

const ProjectRow = ({ project, index, active, onActivate, onOpen }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.62, margin: "-20% 0px -35% 0px" });
  const isActive = active === index;

  useEffect(() => {
    if (inView) onActivate(index);
  }, [inView, index, onActivate]);

  return (
    <motion.article
      ref={ref}
      className={`${styles.projectRow} ${isActive ? styles.activeRow : ""}`}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => onActivate(index)}
      onFocus={() => onActivate(index)}
    >
      <button type="button" className={styles.rowButton} onClick={() => onOpen(project)}>
        <span className={styles.rowIndex}>{String(index + 1).padStart(2, "0")}</span>
        <span className={styles.rowMain}>
          <span className={styles.projectLabel}>{project.label}</span>
          <strong>{project.title}</strong>
          <span>{project.outcome}</span>
        </span>
        <span className={styles.rowMeta}>
          {project.stack.slice(0, 3).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </span>
      </button>
    </motion.article>
  );
};

const Project = () => {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(null);
  const featured = projects[active];

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") setSelected(null);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.header}>
        <span>Selected Work</span>
        <h2>Projects built as working systems.</h2>
      </div>

      <div className={styles.showcase}>
        <aside className={styles.featured} aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={featured.title}
              className={styles.featuredInner}
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectVisual project={featured} large />
              <span className={styles.projectLabel}>{featured.label}</span>
              <h3>{featured.title}</h3>
              <p>{featured.desc}</p>
              <div className={styles.tags}>
                {featured.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <div className={styles.actions}>
                <button type="button" onClick={() => setSelected(featured)}>View details</button>
                {featured.live && (
                  <a href={featured.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={17} /> Live
                  </a>
                )}
                {featured.code && (
                  <a href={featured.code} target="_blank" rel="noopener noreferrer">
                    <Github size={17} /> GitHub
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </aside>

        <div className={styles.projectList}>
          {projects.map((project, index) => (
            <ProjectRow
              key={project.title}
              project={project}
              index={index}
              active={active}
              onActivate={setActive}
              onOpen={setSelected}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.article
              className={styles.modal}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button type="button" className={styles.closeBtn} onClick={() => setSelected(null)} aria-label="Close project details" title="Close">
                <X />
              </button>
              <ProjectVisual project={selected} large />
              <span className={styles.projectLabel}>{selected.label}</span>
              <h3>{selected.title}</h3>
              <p>{selected.desc}</p>
              <p className={styles.modalOutcome}>{selected.outcome}</p>
              <div className={styles.tags}>
                {selected.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <div className={styles.actions}>
                {selected.live && (
                  <a href={selected.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={17} /> Live Demo
                  </a>
                )}
                {selected.code && (
                  <a href={selected.code} target="_blank" rel="noopener noreferrer">
                    <Github size={17} /> GitHub
                  </a>
                )}
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Project;
