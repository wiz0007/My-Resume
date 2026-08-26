import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
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
} from "lucide-react";
import styles from "./Project.module.scss";

const projects = [
  {
    title: "SkillSphere",
    label: "Final Year Project",
    category: "Full-Stack + Web3",
    icon: GraduationCap,
    desc: "A skill-learning marketplace where learners discover courses, compare tutors, book live sessions, access recorded content, and manage learning activity through role-aware workflows.",
    outcome: "Built as a multi-role product with learner, tutor, and admin experiences plus wallet transaction audit verification on Polygon Amoy.",
    role: "Full-stack product engineering",
    focus: "Marketplace + role workflows",
    status: "Production project",
    capabilities: [
      "Learner, tutor, and administrator flows",
      "Live-session, recorded-course, review, and support journeys",
      "SkillCoin wallet activity with blockchain-backed audit proof",
    ],
    stack: ["TypeScript", "React", "Node.js", "Express", "MongoDB", "Socket.IO", "Polygon Amoy"],
    live: "https://skillsphere.online",
  },
  {
    title: "SchoolSys",
    label: "Under Development",
    category: "School Platform",
    icon: School,
    desc: "A school management platform designed around secure operational workflows for school profiles, students, staff, classes, attendance, and role-safe access.",
    outcome: "The architecture emphasizes secure authentication, refresh-token rotation, tenancy boundaries, and maintainable school administration flows.",
    role: "Full-stack platform development",
    focus: "Secure school operations",
    status: "In development",
    capabilities: [
      "Student, staff, class, and attendance management",
      "HTTP-only authentication with refresh-token rotation",
      "Role-safe data access and administrative workflows",
    ],
    stack: ["Angular", "Spring Boot", "PostgreSQL", "Laravel", "JWT"],
    live: "https://school-management-space-frontend.vercel.app",
  },
  {
    title: "Pipeline Builder & DAG Validator",
    label: "React Project",
    category: "Visual Workflow Tool",
    icon: Workflow,
    desc: "A visual node-and-edge editor paired with a FastAPI parser that converts the canvas into structured graph information and validates whether the graph is a directed acyclic graph.",
    outcome: "Transforms an interactive workflow canvas into immediate node counts, edge counts, and graph validation feedback.",
    role: "Frontend + API integration",
    focus: "Graph interaction + validation",
    status: "Completed",
    capabilities: [
      "Visual node and edge construction with React Flow",
      "FastAPI parsing endpoint for submitted pipelines",
      "Depth-first-search based directed acyclic graph validation",
    ],
    stack: ["React", "React Flow", "FastAPI", "Python", "DFS"],
    live: "https://react-node-project-lm7m.vercel.app",
  },
  {
    title: "E-Commerce Application",
    label: "MERN Web App",
    category: "Commerce System",
    icon: ShoppingBag,
    desc: "A full shopping journey covering product discovery, cart state, authentication, order workflows, and payment-oriented checkout behavior.",
    outcome: "Brings the essential commerce path into one application, from browsing products through authenticated order creation.",
    role: "Full-stack development",
    focus: "Commerce journey",
    status: "Completed",
    capabilities: [
      "Product browsing and cart workflows",
      "Authenticated customer experience",
      "Order and payment-oriented application flow",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js", "REST APIs", "Authentication"],
    live: "https://my-kart-taupe.vercel.app/",
  },
  {
    title: "Community Chat",
    label: "Real-time Web App",
    category: "Communication",
    icon: MessageCircle,
    desc: "A community chat application centered on authenticated access, real-time conversations, message workflows, and reusable communication modules.",
    outcome: "Packages real-time messaging patterns into an authenticated web experience that can grow with additional community features.",
    role: "Full-stack development",
    focus: "Real-time communication",
    status: "Completed",
    capabilities: [
      "Authenticated user access",
      "Real-time message workflows",
      "Reusable chat and community interface modules",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js", "Real-time", "Authentication"],
    live: "https://we-chatt-ruby.vercel.app",
  },
  {
    title: "Fantasy Game",
    label: "Python Desktop App",
    category: "Game Logic",
    icon: Gamepad2,
    desc: "A Python desktop application for assembling a fantasy team and evaluating selections through score-based game rules.",
    outcome: "Combines desktop interface structure with selection constraints and scoring logic in an interactive application.",
    role: "Desktop application development",
    focus: "Selection + scoring logic",
    status: "Completed",
    capabilities: [
      "Interactive team selection workflow",
      "Rule-driven score calculation",
      "Desktop graphical user interface structure",
    ],
    stack: ["Python", "Desktop GUI", "Game Logic"],
    code: "https://github.com/wiz0007/Fantasy-Game-App",
  },
  {
    title: "Hotel Management",
    label: "Java Desktop App",
    category: "Management System",
    icon: Hotel,
    desc: "A Core Java desktop application that models practical hotel operations around rooms, bookings, customers, and record management.",
    outcome: "Turns common hotel operations into a structured desktop CRUD workflow with clear domain-oriented screens.",
    role: "Desktop application development",
    focus: "Operational CRUD workflows",
    status: "Completed",
    capabilities: [
      "Room and booking management",
      "Customer record workflows",
      "Desktop-oriented operational interface",
    ],
    stack: ["Core Java", "Desktop GUI", "Booking Logic"],
    code: "https://github.com/wiz0007/Hotel_management",
  },
  {
    title: "Portfolio Website",
    label: "Frontend Experience",
    category: "Interactive Portfolio",
    icon: PanelsTopLeft,
    desc: "This portfolio itself: a responsive React experience combining cinematic hero sections, motion, 3D scenes, project storytelling, and performance-aware page architecture.",
    outcome: "Treats the portfolio as a product experience rather than a static résumé page, while keeping the content responsive and navigable.",
    role: "Frontend experience engineering",
    focus: "Motion + spatial presentation",
    status: "Live",
    capabilities: [
      "Animated multi-page portfolio architecture",
      "Three-dimensional and scroll-driven visual experiences",
      "Responsive styling, navigation, and search-engine setup",
    ],
    stack: ["React", "Three.js", "SCSS", "Framer Motion", "GSAP"],
    live: "https://ayushmaan-mishra-resume.vercel.app/",
  },
  {
    title: "Freelance Application",
    label: "Service Website",
    category: "Client Acquisition",
    icon: BriefcaseBusiness,
    desc: "A service-focused React website designed to introduce an offer, showcase relevant work, and move a potential client toward starting a conversation.",
    outcome: "Structures project evidence and service messaging into a focused client-acquisition experience.",
    role: "Frontend development",
    focus: "Service positioning",
    status: "Live",
    capabilities: [
      "Service-led landing experience",
      "Project presentation and navigation",
      "Clear contact-oriented conversion path",
    ],
    stack: ["React", "Landing Flow", "Project Showcase"],
    live: "https://innovatech-puce.vercel.app",
  },
];

const ProjectSystemVisual = ({ project, index }) => {
  const Icon = project.icon;
  const visualStack = project.stack.slice(0, 5);

  return (
    <div className={styles.systemVisual} aria-hidden="true">
      <div className={styles.visualGrid} />
      <div className={styles.visualGlow} />

      <div className={styles.visualTopline}>
        <span>System map</span>
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>

      <div className={styles.orbitStage}>
        <span className={`${styles.orbit} ${styles.orbitOne}`} />
        <span className={`${styles.orbit} ${styles.orbitTwo}`} />
        <span className={`${styles.orbit} ${styles.orbitThree}`} />

        <div className={styles.coreNode}>
          <Icon size={30} strokeWidth={1.7} />
          <span>{project.category}</span>
        </div>

        {visualStack.map((tech, techIndex) => (
          <span
            key={tech}
            className={`${styles.techNode} ${styles[`techNode${techIndex + 1}`]}`}
          >
            {tech}
          </span>
        ))}
      </div>

      <div className={styles.visualRoute}>
        <span>idea</span>
        <i />
        <span>architecture</span>
        <i />
        <span>working system</span>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, index, activeIndex, total }) => {
  const isActive = index === activeIndex;
  const isArchived = index === activeIndex - 1;
  const isBuried = index < activeIndex - 1;

  const cardState = isActive
    ? styles.activeCard
    : isArchived
      ? styles.archivedCard
      : isBuried
        ? styles.buriedCard
        : styles.futureCard;

  return (
    <article
      className={`${styles.projectCard} ${cardState}`}
      style={{ "--project-index": index }}
      aria-current={isActive ? "true" : undefined}
    >
      <div className={styles.cardSurface}>
        <header className={styles.cardHeader}>
          <div className={styles.headerIdentity}>
            <span className={styles.projectNumber}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <span className={styles.projectLabel}>{project.label}</span>
              <strong>{project.title}</strong>
            </div>
          </div>

          <div className={styles.headerState}>
            <span>{project.status}</span>
            <span>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
          </div>
        </header>

        <div className={styles.cardBody}>
          <div className={styles.projectNarrative}>
            <div className={styles.categoryRow}>
              <span>{project.category}</span>
              <span>Case file</span>
            </div>

            <h3>{project.title}</h3>
            <p className={styles.description}>{project.desc}</p>

            <div className={styles.metaGrid}>
              <div>
                <span>Role</span>
                <strong>{project.role}</strong>
              </div>
              <div>
                <span>Focus</span>
                <strong>{project.focus}</strong>
              </div>
              <div>
                <span>Status</span>
                <strong>{project.status}</strong>
              </div>
            </div>

            <div className={styles.capabilityBlock}>
              <span className={styles.blockLabel}>What it demonstrates</span>
              <ul>
                {project.capabilities.map((capability) => (
                  <li key={capability}>
                    <Check size={15} />
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.stackBlock}>
              <span className={styles.blockLabel}>Technology stack</span>
              <div className={styles.tags}>
                {project.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>

            <div className={styles.actions}>
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                  View live <ExternalLink size={16} />
                </a>
              )}
              {project.code && (
                <a href={project.code} target="_blank" rel="noopener noreferrer">
                  Source code <Github size={16} />
                </a>
              )}
              {!project.live && !project.code && (
                <span className={styles.privateProject}>Project details available on request</span>
              )}
            </div>
          </div>

          <div className={styles.projectEvidence}>
            <ProjectSystemVisual project={project} index={index} />
            <div className={styles.outcomePanel}>
              <span>Build outcome</span>
              <p>{project.outcome}</p>
              <ArrowUpRight size={19} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

const Project = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const markerRefs = useRef([]);

  useEffect(() => {
    let frameId = null;

    const syncActiveProject = () => {
      frameId = null;
      const markers = markerRefs.current;
      const triggerLine = window.innerHeight * 0.68;
      let nextIndex = 0;

      for (let index = 0; index < markers.length; index += 1) {
        const marker = markers[index];
        if (!marker) continue;

        if (marker.getBoundingClientRect().top <= triggerLine) {
          nextIndex = index;
        } else {
          break;
        }
      }

      setActiveIndex((currentIndex) =>
        currentIndex === nextIndex ? currentIndex : nextIndex,
      );
    };

    const requestSync = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(syncActiveProject);
    };

    syncActiveProject();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);

    return () => {
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.sectionLabel}>Selected work</div>

      <div className={styles.stackFrame}>
        <div className={styles.projectStack}>
          {projects.map((project, index) => (
            <React.Fragment key={project.title}>
              <span
                ref={(node) => {
                  markerRefs.current[index] = node;
                }}
                className={styles.projectMarker}
                data-project-marker={index}
                aria-hidden="true"
              />
              <ProjectCard
                project={project}
                index={index}
                activeIndex={activeIndex}
                total={projects.length}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Project;
