import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
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
import SectionAtmosphere from "../SectionAtmosphere/SectionAtmosphere";
import styles from "./Project.module.scss";

const projects = [
  {
    title: "SkillSphere",
    label: "Final Year Project",
    category: "Full-Stack + Web3",
    icon: GraduationCap,
    color: "#22d3ee",
    desc: "Skill-sharing platform with authentication, role-based access, database-backed workflows, and Polygon Amoy transaction verification.",
    stack: ["TypeScript", "MERN", "PostgreSQL", "MongoDB", "Polygon Amoy"],
    live: "https://skillsphere.online",
  },
  {
    title: "SchoolSys",
    label: "Under Development",
    category: "Under Development",
    icon: School,
    color: "#14b8a6",
    desc: "Under development school management platform for school profiles, students, staff, classes, and attendance with HTTP-only authentication, refresh-token rotation, and ownership validation.",
    stack: ["Angular", "Spring Boot", "PostgreSQL", "Laravel", "JWT"],
    live: "https://school-management-space-frontend.vercel.app",
  },
  {
    title: "Pipeline Builder & DAG Validator",
    label: "React Project",
    category: "Visual Workflow Tool",
    icon: Workflow,
    color: "#60a5fa",
    desc: "Visual node and edge editor with a FastAPI parser that returns node count, edge count, and DAG validation using DFS.",
    stack: ["React", "React Flow", "FastAPI", "Python", "DFS"],
    live: "https://react-node-project-lm7m.vercel.app",
  },
  {
    title: "E-Commerce Application",
    label: "MERN Web App",
    category: "Commerce System",
    icon: ShoppingBag,
    color: "#8b5cf6",
    desc: "Shopping flow with products, cart, authentication, orders, and payment integration.",
    stack: ["MERN", "REST APIs", "Authentication", "Payments"],
    live: "https://my-kart-taupe.vercel.app/",
  },
  {
    title: "Community Chat",
    label: "Real-time Web App",
    category: "Communication",
    icon: MessageCircle,
    color: "#10b981",
    desc: "MERN chat application with secure user access, message workflows, and reusable modules.",
    stack: ["MERN", "Real-time", "Authentication"],
    live: "https://we-chatt-ruby.vercel.app",
  },
  {
    title: "Fantasy Game",
    label: "Python Desktop App",
    category: "Game Logic",
    icon: Gamepad2,
    color: "#f59e0b",
    desc: "Python desktop application for team selection and score-based fantasy game logic.",
    stack: ["Python", "Desktop GUI", "Game Logic"],
    code: "https://github.com/wiz0007/Fantasy-Game-App",
  },
  {
    title: "Hotel Management",
    label: "Java Desktop App",
    category: "Management System",
    icon: Hotel,
    color: "#ef4444",
    desc: "Core Java desktop application for room booking, customer records, and hotel workflows.",
    stack: ["Core Java", "Desktop GUI", "Booking Logic"],
    code: "https://github.com/wiz0007/Hotel_management",
  },
  {
    title: "Portfolio Website",
    label: "Frontend Experience",
    category: "Interactive Portfolio",
    icon: PanelsTopLeft,
    color: "#38bdf8",
    desc: "Responsive React portfolio with animated sections, 3D experiences, project presentation, and SEO setup.",
    stack: ["React", "Three.js", "SCSS", "Framer Motion"],
    live: "https://ayushmaan-mishra-resume.vercel.app/",
  },
  {
    title: "Freelance Application",
    label: "Service Website",
    category: "Client Acquisition",
    icon: BriefcaseBusiness,
    color: "#a78bfa",
    desc: "Service-focused React website for showcasing work and generating client interest.",
    stack: ["React", "Landing Flow", "Project Showcase"],
    live: "https://innovatech-puce.vercel.app",
  },
];

const ProjectVisual = ({ project, large = false }) => {
  const Icon = project.icon;
  return (
    <div
      className={`${styles.projectVisual} ${large ? styles.largeVisual : ""}`}
      style={{ "--project-color": project.color }}
      aria-hidden="true"
    >
      <div className={styles.windowBar}>
        <span />
        <span />
        <span />
      </div>
      <div className={styles.visualGrid}>
        <span className={styles.visualIcon}><Icon size={large ? 34 : 25} /></span>
        <div className={styles.visualLines}>
          <i />
          <i />
          <i />
        </div>
        <div className={styles.visualPanel} />
      </div>
      <span className={styles.visualType}>{project.category}</span>
    </div>
  );
};

const Project = () => {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(null);

  const move = (direction) => {
    setActive((current) => (current + direction + projects.length) % projects.length);
  };

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") setSelected(null);
      if (!selected && event.key === "ArrowRight") move(1);
      if (!selected && event.key === "ArrowLeft") move(-1);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected]);

  const getOffset = (index) => {
    let offset = index - active;
    const half = Math.floor(projects.length / 2);
    if (offset > half) offset -= projects.length;
    if (offset < -half) offset += projects.length;
    return offset;
  };

  return (
    <section className={styles.projects} id="projects">
      <SectionAtmosphere accent="#8b5cf6" secondary="#22d3ee" side="left" subtle />
      <div className={styles.header}>
        <span>3D Project Gallery</span>
        <h2>Move through the systems I have designed and built.</h2>
      </div>

      <div className={styles.carouselShell}>
        <button type="button" className={styles.arrow} onClick={() => move(-1)} aria-label="Previous project" title="Previous project">
          <ChevronLeft />
        </button>

        <div className={styles.carousel} aria-live="polite">
          {projects.map((project, index) => {
            const offset = getOffset(index);
            const distance = Math.abs(offset);
            const visible = distance <= 2;

            return (
              <motion.article
                className={styles.card}
                key={project.title}
                initial={false}
                animate={{
                  x: offset * 285,
                  z: -distance * 110,
                  rotateY: offset * -17,
                  scale: 1 - distance * 0.11,
                  opacity: visible ? 1 - distance * 0.2 : 0,
                }}
                transition={{ type: "spring", stiffness: 180, damping: 24 }}
                style={{ zIndex: projects.length - distance, pointerEvents: visible ? "auto" : "none" }}
                onClick={() => setActive(index)}
              >
                <ProjectVisual project={project} />
                <span className={styles.projectLabel}>{project.label}</span>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <div className={styles.tags}>
                  {project.stack.slice(0, 3).map((tech) => <span key={tech}>{tech}</span>)}
                </div>
                <button
                  type="button"
                  className={styles.detailsBtn}
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelected(project);
                  }}
                >
                  View Details
                </button>
              </motion.article>
            );
          })}
        </div>

        <button type="button" className={styles.arrow} onClick={() => move(1)} aria-label="Next project" title="Next project">
          <ChevronRight />
        </button>
      </div>

      <div className={styles.pagination} aria-label="Project selection">
        {projects.map((project, index) => (
          <button
            type="button"
            key={project.title}
            className={active === index ? styles.activeDot : ""}
            onClick={() => setActive(index)}
            aria-label={`Show ${project.title}`}
          />
        ))}
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
              <div className={styles.tags}>
                {selected.stack.map((tech) => <span key={tech}>{tech}</span>)}
              </div>
              <div className={styles.modalActions}>
                {selected.live && (
                  <a href={selected.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={18} /> Live Demo
                  </a>
                )}
                {selected.code && (
                  <a href={selected.code} target="_blank" rel="noopener noreferrer">
                    <Github size={18} /> GitHub
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

