import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ExternalLink,
  Gamepad2,
  Github,
  GraduationCap,
  Hotel,
  MessageCircle,
  PanelsTopLeft,
  School,
  ShoppingBag,
  Sparkles,
  Workflow,
} from "lucide-react";
import styles from "./Project.module.scss";

const projects = [
  {
    id: "skillsphere",
    title: "SkillSphere",
    label: "Final Year Project",
    category: "Full-Stack + Web3",
    filterGroup: "fullstack",
    icon: GraduationCap,
    desc: "A skill-learning marketplace where learners discover courses, compare tutors, book live sessions, access recorded content, and manage learning activity through role-aware workflows.",
    outcome: "Built as a multi-role product with learner, tutor, and admin experiences plus wallet transaction audit verification on Polygon Amoy.",
    role: "Full-stack product engineering",
    focus: "Marketplace + role workflows",
    status: "Production project",
    statusType: "live",
    bentoSpan: "span7",
    capabilities: [
      "Learner, tutor, and administrator flows",
      "Live-session, recorded-course, review, and support journeys",
      "SkillCoin wallet activity with blockchain-backed audit proof",
    ],
    stack: ["TypeScript", "React", "Node.js", "Express", "MongoDB", "Socket.IO", "Polygon Amoy"],
    live: "https://skillsphere.online",
  },
  {
    id: "schoolsys",
    title: "SchoolSys",
    label: "Under Development",
    category: "School Platform",
    filterGroup: "fullstack",
    icon: School,
    desc: "A school management platform designed around secure operational workflows for school profiles, students, staff, classes, attendance, and role-safe access.",
    outcome: "The architecture emphasizes secure authentication, refresh-token rotation, tenancy boundaries, and maintainable school administration flows.",
    role: "Full-stack platform development",
    focus: "Secure school operations",
    status: "In development",
    statusType: "dev",
    bentoSpan: "span5",
    capabilities: [
      "Student, staff, class, and attendance management",
      "HTTP-only authentication with refresh-token rotation",
      "Role-safe data access and administrative workflows",
    ],
    stack: ["Angular", "Spring Boot", "PostgreSQL", "Laravel", "JWT"],
    live: "https://school-management-space-frontend.vercel.app",
  },
  {
    id: "pipeline-builder",
    title: "Pipeline Builder & DAG Validator",
    label: "React Project",
    category: "Visual Workflow Tool",
    filterGroup: "systems",
    icon: Workflow,
    desc: "A visual node-and-edge editor paired with a FastAPI parser that converts the canvas into structured graph information and validates whether the graph is a directed acyclic graph.",
    outcome: "Transforms an interactive workflow canvas into immediate node counts, edge counts, and graph validation feedback.",
    role: "Frontend + API integration",
    focus: "Graph interaction + validation",
    status: "Completed",
    statusType: "completed",
    bentoSpan: "span6",
    capabilities: [
      "Visual node and edge construction with React Flow",
      "FastAPI parsing endpoint for submitted pipelines",
      "Depth-first-search based directed acyclic graph validation",
    ],
    stack: ["React", "React Flow", "FastAPI", "Python", "DFS"],
    live: "https://react-node-project-lm7m.vercel.app",
  },
  {
    id: "e-commerce",
    title: "E-Commerce Application",
    label: "MERN Web App",
    category: "Commerce System",
    filterGroup: "fullstack",
    icon: ShoppingBag,
    desc: "A full shopping journey covering product discovery, cart state, authentication, order workflows, and payment-oriented checkout behavior.",
    outcome: "Brings the essential commerce path into one application, from browsing products through authenticated order creation.",
    role: "Full-stack development",
    focus: "Commerce journey",
    status: "Completed",
    statusType: "completed",
    bentoSpan: "span6",
    capabilities: [
      "Product browsing and cart workflows",
      "Authenticated customer experience",
      "Order and payment-oriented application flow",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js", "REST APIs", "Authentication"],
    live: "https://my-kart-taupe.vercel.app/",
  },
  {
    id: "community-chat",
    title: "Community Chat",
    label: "Real-time Web App",
    category: "Communication",
    filterGroup: "fullstack",
    icon: MessageCircle,
    desc: "A community chat application centered on authenticated access, real-time conversations, message workflows, and reusable communication modules.",
    outcome: "Packages real-time messaging patterns into an authenticated web experience that can grow with additional community features.",
    role: "Full-stack development",
    focus: "Real-time communication",
    status: "Completed",
    statusType: "completed",
    bentoSpan: "span4",
    capabilities: [
      "Authenticated user access",
      "Real-time message workflows",
      "Reusable chat and community interface modules",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js", "Real-time", "Authentication"],
    live: "https://we-chatt-ruby.vercel.app",
  },
  {
    id: "fantasy-game",
    title: "Fantasy Game",
    label: "Python Desktop App",
    category: "Game Logic",
    filterGroup: "systems",
    icon: Gamepad2,
    desc: "A Python desktop application for assembling a fantasy team and evaluating selections through score-based game rules.",
    outcome: "Combines desktop interface structure with selection constraints and scoring logic in an interactive application.",
    role: "Desktop application development",
    focus: "Selection + scoring logic",
    status: "Completed",
    statusType: "completed",
    bentoSpan: "span4",
    capabilities: [
      "Interactive team selection workflow",
      "Rule-driven score calculation",
      "Desktop graphical user interface structure",
    ],
    stack: ["Python", "Desktop GUI", "Game Logic"],
    code: "https://github.com/wiz0007/Fantasy-Game-App",
  },
  {
    id: "hotel-management",
    title: "Hotel Management",
    label: "Java Desktop App",
    category: "Management System",
    filterGroup: "systems",
    icon: Hotel,
    desc: "A Core Java desktop application that models practical hotel operations around rooms, bookings, customers, and record management.",
    outcome: "Turns common hotel operations into a structured desktop CRUD workflow with clear domain-oriented screens.",
    role: "Desktop application development",
    focus: "Operational CRUD workflows",
    status: "Completed",
    statusType: "completed",
    bentoSpan: "span4",
    capabilities: [
      "Room and booking management",
      "Customer record workflows",
      "Desktop-oriented operational interface",
    ],
    stack: ["Core Java", "Desktop GUI", "Booking Logic"],
    code: "https://github.com/wiz0007/Hotel_management",
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    label: "Frontend Experience",
    category: "Interactive Portfolio",
    filterGroup: "frontend",
    icon: PanelsTopLeft,
    desc: "This portfolio itself: a responsive React experience combining cinematic hero sections, motion, 3D scenes, project storytelling, and performance-aware page architecture.",
    outcome: "Treats the portfolio as a product experience rather than a static résumé page, while keeping the content responsive and navigable.",
    role: "Frontend experience engineering",
    focus: "Motion + spatial presentation",
    status: "Live",
    statusType: "live",
    bentoSpan: "span6",
    capabilities: [
      "Animated multi-page portfolio architecture",
      "Three-dimensional and scroll-driven visual experiences",
      "Responsive styling, navigation, and search-engine setup",
    ],
    stack: ["React", "Three.js", "SCSS", "Framer Motion", "GSAP"],
    live: "https://ayushmaan-mishra-resume.vercel.app/",
  },
  {
    id: "rogue-ai",
    title: "Rogue AI",
    label: "Service Website",
    category: "Client Acquisition",
    filterGroup: "frontend",
    icon: BriefcaseBusiness,
    desc: "A service-focused React website designed to introduce an offer, showcase relevant work, and move a potential client toward starting a conversation.",
    outcome: "Structures project evidence and service messaging into a focused client-acquisition experience.",
    role: "Frontend development",
    focus: "Service positioning",
    status: "Live",
    statusType: "live",
    bentoSpan: "span6",
    capabilities: [
      "Service-led landing experience",
      "Project presentation and navigation",
      "Clear contact-oriented conversion path",
    ],
    stack: ["React", "Landing Flow", "Project Showcase"],
    live: "https://rogueai-puce.vercel.app/",
  },
];

const filterCategories = [
  { id: "all", label: "All Systems", count: 9 },
  { id: "fullstack", label: "Full-Stack & Web3", count: 4 },
  { id: "systems", label: "Desktop & Algorithms", count: 3 },
  { id: "frontend", label: "Frontend & UI", count: 2 },
];

const ProjectBentoCard = ({ project, index, isFiltered }) => {
  const Icon = project.icon;
  const isFeatured = project.bentoSpan === "span7" || project.bentoSpan === "span5";

  return (
    <article
      className={`${styles.bentoCard} ${!isFiltered ? styles[project.bentoSpan] : styles.cardUniform}`}
    >
      <div className={styles.bentoCardGlow} aria-hidden="true" />

      <header className={styles.bentoHeader}>
        <div className={styles.bentoIdentity}>
          <span className={styles.bentoNumberBadge}>{String(index + 1).padStart(2, "0")}</span>
          <span className={styles.bentoCategoryBadge}>{project.category}</span>
        </div>

        <div className={`${styles.bentoStatusBadge} ${styles[`status_${project.statusType}`]}`}>
          <span className={styles.statusPulseDot} />
          <span>{project.status}</span>
        </div>
      </header>

      <div className={styles.bentoTitleGroup}>
        <div className={styles.bentoIconWrapper}>
          <Icon size={22} strokeWidth={1.75} />
        </div>
        <div className={styles.bentoTitleText}>
          <span className={styles.bentoLabel}>{project.label}</span>
          <h3 className={styles.bentoTitle}>{project.title}</h3>
        </div>
      </div>

      <p className={styles.bentoDesc}>{project.desc}</p>

      <div className={styles.bentoOutcome}>
        <div className={styles.bentoOutcomeLabel}>
          <Sparkles size={13} className={styles.outcomeIcon} />
          <span>Core Outcome</span>
        </div>
        <p>{project.outcome}</p>
      </div>

      {isFeatured && (
        <div className={styles.bentoCapabilities}>
          <span className={styles.bentoCapTitle}>Key Demonstrations</span>
          <ul>
            {project.capabilities.slice(0, 2).map((cap) => (
              <li key={cap}>
                <Check size={13} />
                <span>{cap}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.bentoStackRow}>
        {project.stack.map((tech) => (
          <span key={tech} className={styles.techPill}>
            {tech}
          </span>
        ))}
      </div>

      <footer className={styles.bentoActions}>
        <div className={styles.directLinks}>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bentoLiveBtn}
            >
              <span>Live Demo</span>
              <ExternalLink size={14} />
            </a>
          )}
          {project.code && (
            <a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bentoCodeBtn}
            >
              <span>Source</span>
              <Github size={14} />
            </a>
          )}
        </div>
      </footer>
    </article>
  );
};

const ProjectSystemVisual = ({ project, index }) => {
  const Icon = project.icon;
  return (
    <div className={styles.systemVisual}>
      <div className={styles.visualGrid} aria-hidden="true" />
      <div className={styles.visualGlow} aria-hidden="true" />
      <div className={styles.visualTopline}>
        <span>System Topology // 0{index + 1}</span>
        <span>{project.category}</span>
      </div>
      <div className={styles.orbitStage} aria-hidden="true">
        <span className={`${styles.orbit} ${styles.orbitOne}`} />
        <span className={`${styles.orbit} ${styles.orbitTwo}`} />
        <span className={`${styles.orbit} ${styles.orbitThree}`} />
        <div className={styles.coreNode}>
          {Icon && <Icon size={26} strokeWidth={1.8} />}
          <span>{project.focus}</span>
        </div>
        {project.stack.slice(0, 4).map((tech, i) => (
          <span key={tech} className={`${styles.techNode} ${styles[`techNode${i + 1}`]}`}>
            {tech}
          </span>
        ))}
      </div>
      <div className={styles.visualRoute}>
        <span>Client</span>
        <i />
        <span>Core Flow</span>
        <i />
        <span>Output</span>
      </div>
    </div>
  );
};

const ProjectCommandCenter = ({ projects, selectedIndex, onSelectIndex }) => {
  const railListRef = useRef(null);
  const currentProject = projects[selectedIndex] || projects[0] || {};
  const Icon = currentProject?.icon;

  const handlePrev = () => {
    onSelectIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    onSelectIndex((prev) => Math.min(projects.length - 1, prev + 1));
  };

  useEffect(() => {
    if (!railListRef.current) return;
    const activeEl = railListRef.current.children[selectedIndex];
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedIndex]);

  return (
    <div className={styles.commandCenter}>
      {/* Systems Directory Rail */}
      <aside className={styles.consoleRail}>
        <div className={styles.railHeader}>
          <div className={styles.railStatus}>
            <span className={styles.consoleBlinkDot} aria-hidden="true" />
            <span className={styles.railStatusText}>SYSTEMS DIRECTORY</span>
          </div>
          <div className={styles.railHeaderRight}>
            <div className={styles.railScrollBtns}>
              <button
                type="button"
                className={styles.railScrollBtn}
                onClick={handlePrev}
                disabled={selectedIndex === 0}
                aria-label="Previous system"
              >
                <ChevronLeft size={14} />
              </button>
              <span className={styles.railCountBadge}>
                {String(selectedIndex + 1).padStart(2, "0")}/
                {String(projects.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                className={styles.railScrollBtn}
                onClick={handleNext}
                disabled={selectedIndex === projects.length - 1}
                aria-label="Next system"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.railListWrapper}>
          <div className={styles.railScrollGradientHint} aria-hidden="true" />
          <div className={styles.railList} ref={railListRef}>
            {projects.map((proj, idx) => {
              const ItemIcon = proj.icon;
              const isActive = idx === selectedIndex;
              return (
                <button
                  key={proj.id}
                  type="button"
                  className={`${styles.railItem} ${isActive ? styles.activeRailItem : ""}`}
                  onClick={() => onSelectIndex(idx)}
                  aria-pressed={isActive}
                >
                  {isActive && <span className={styles.activeRailIndicator} aria-hidden="true" />}
                  <div className={styles.railItemHeader}>
                    <span className={styles.railIndex}>{String(idx + 1).padStart(2, "0")}</span>
                    <span
                      className={`${styles.railStatusDot} ${styles[`status_${proj.statusType}`]}`}
                    />
                    <span className={styles.railCategory}>{proj.category}</span>
                  </div>
                  <div className={styles.railItemBody}>
                    <div className={styles.railItemIcon}>
                      {ItemIcon && <ItemIcon size={16} />}
                    </div>
                    <div className={styles.railItemTitleGroup}>
                      <h4 className={styles.railItemTitle}>{proj.title}</h4>
                      <span className={styles.railItemRole}>{proj.role}</span>
                    </div>
                  </div>
                  <div className={styles.railTechTags}>
                    {proj.stack.slice(0, 3).map((tech) => (
                      <span key={tech} className={styles.railTechTag}>
                        {tech}
                      </span>
                    ))}
                    {proj.stack.length > 3 && (
                      <span className={styles.railTechMore}>+{proj.stack.length - 3}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Stage Console Pane */}
      <main className={styles.consoleStage}>
        <div className={styles.consoleStageInner}>
          <header className={styles.stageHeader}>
            <div className={styles.stageTitleGroup}>
              <div className={styles.stageIconBox}>
                {Icon && <Icon size={24} strokeWidth={1.8} />}
              </div>
              <div className={styles.stageTitleText}>
                <div className={styles.stageBadges}>
                  <span className={styles.stageIndexBadge}>
                    SYSTEM // {String(selectedIndex + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.stageCategoryBadge}>{currentProject.category}</span>
                  <div
                    className={`${styles.stageStatusBadge} ${
                      styles[`status_${currentProject.statusType}`]
                    }`}
                  >
                    <span className={styles.statusPulseDot} />
                    <span>{currentProject.status}</span>
                  </div>
                </div>
                <h3 className={styles.stageTitle}>{currentProject.title}</h3>
              </div>
            </div>

            <div className={styles.stageActions}>
              {currentProject.live && (
                <a
                  href={currentProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.stageLiveBtn}
                >
                  <span>Live Demo</span>
                  <ExternalLink size={14} />
                </a>
              )}
              {currentProject.code && (
                <a
                  href={currentProject.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.stageCodeBtn}
                >
                  <span>Source</span>
                  <Github size={14} />
                </a>
              )}
            </div>
          </header>

          <div className={styles.stageBody}>
            {/* Left: Narrative Pane */}
            <div className={styles.stageNarrativePane}>
              <div className={styles.stageSectionBlock}>
                <span className={styles.stageSectionLabel}>System Overview</span>
                <p className={styles.stageDesc}>{currentProject.desc}</p>
              </div>

              <div className={styles.stageMetaGrid}>
                <div className={styles.stageMetaItem}>
                  <span>Role & Scope</span>
                  <strong>{currentProject.role}</strong>
                </div>
                <div className={styles.stageMetaItem}>
                  <span>Architecture Focus</span>
                  <strong>{currentProject.focus}</strong>
                </div>
                <div className={styles.stageMetaItem}>
                  <span>Operational Status</span>
                  <strong>{currentProject.status}</strong>
                </div>
              </div>

              <div className={styles.stageSectionBlock}>
                <span className={styles.stageSectionLabel}>Key Demonstrations</span>
                <ul className={styles.stageCapList}>
                  {currentProject.capabilities?.map((cap) => (
                    <li key={cap}>
                      <Check size={14} className={styles.capCheck} />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.stageSectionBlock}>
                <span className={styles.stageSectionLabel}>Technology Stack</span>
                <div className={styles.stageStackWrap}>
                  {currentProject.stack?.map((tech) => (
                    <span key={tech} className={styles.stageStackTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Visual Topology & Outcome */}
            <div className={styles.stageVisualPane}>
              <div className={styles.stageVisualWrapper}>
                <ProjectSystemVisual project={currentProject} index={selectedIndex} />
              </div>
              <div className={styles.stageOutcomeCard}>
                <div className={styles.stageOutcomeHeader}>
                  <Sparkles size={14} className={styles.outcomeSparkle} />
                  <span>Core System Outcome</span>
                </div>
                <p>{currentProject.outcome}</p>
                <ArrowUpRight size={18} className={styles.outcomeArrow} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const Project = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isBentoExpanded, setIsBentoExpanded] = useState(false);
  const [selectedConsoleIndex, setSelectedConsoleIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= 860
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 860);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;
    return project.filterGroup === activeFilter;
  });

  const safeConsoleIndex = Math.min(
    selectedConsoleIndex,
    Math.max(0, filteredProjects.length - 1)
  );

  const displayedBentoProjects =
    isBentoExpanded || filteredProjects.length <= 4
      ? filteredProjects
      : filteredProjects.slice(0, 4);

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    setSelectedConsoleIndex(0);
    setIsBentoExpanded(false);
  };

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitleRow}>
          <span className={styles.sectionLabel}>Engineering Portfolio</span>
          <span className={styles.sectionSubtext}>
            {filteredProjects.length} {filteredProjects.length === 1 ? "System" : "Systems"} Exhibited
          </span>
        </div>

        {/* Interactive Controls Bar */}
        <div className={styles.controlsBar}>
          <div className={styles.filterPills} role="tablist" aria-label="Filter projects by domain">
            {filterCategories.map((category) => {
              const isActive = activeFilter === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.filterBtn} ${isActive ? styles.activeFilter : ""}`}
                  onClick={() => handleFilterChange(category.id)}
                >
                  <span>{category.label}</span>
                  <span className={styles.filterCount}>{category.count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {isMobile ? (
        <ProjectCommandCenter
          projects={filteredProjects}
          selectedIndex={safeConsoleIndex}
          onSelectIndex={setSelectedConsoleIndex}
        />
      ) : (
        <div className={styles.bentoContainer}>
          <div className={styles.bentoGrid}>
            {displayedBentoProjects.map((project) => {
              const originalIndex = projects.findIndex((p) => p.id === project.id);
              return (
                <ProjectBentoCard
                  key={project.id}
                  project={project}
                  index={originalIndex !== -1 ? originalIndex : 0}
                  isFiltered={activeFilter !== "all"}
                />
              );
            })}
          </div>

          {filteredProjects.length > 4 && (
            <div className={styles.bentoExpandWrapper}>
              {!isBentoExpanded && <div className={styles.bentoFadeTease} aria-hidden="true" />}
              <button
                type="button"
                className={styles.bentoToggleBtn}
                onClick={() => {
                  if (isBentoExpanded) {
                    setIsBentoExpanded(false);
                    const section = document.getElementById("projects");
                    if (section) {
                      if (window.lenis) {
                        window.lenis.scrollTo(section, { offset: -70 });
                      } else {
                        section.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }
                  } else {
                    setIsBentoExpanded(true);
                  }
                }}
                aria-expanded={isBentoExpanded}
              >
                <span>
                  {isBentoExpanded
                    ? "Show Less Systems"
                    : `Show More Projects (+${filteredProjects.length - 4} Systems)`}
                </span>
                {isBentoExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Project;
