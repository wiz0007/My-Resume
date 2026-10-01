import { useState } from "react";
import {
  Braces,
  ChevronDown,
  Database,
  GitBranch,
  Layers,
  Server,
  Shield
} from "lucide-react";
import styles from "./SkillsMobile.module.scss";

const categories = [
  {
    id: "frontend",
    title: "Frontend Architecture",
    icon: Layers,
    color: "#22d3ee",
    desc: "Responsive React interfaces, custom performance hooks, accessible UI design systems, and fluid motion choreography.",
    skills: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "SCSS", "Responsive UI"],
    specs: { "UI Core": "React 19", "Type Safety": "Strict TS", Styling: "SCSS Modules", Motion: "CSS Springs" },
  },
  {
    id: "backend",
    title: "Backend & APIs",
    icon: Server,
    color: "#8b5cf6",
    desc: "RESTful microservices, Express & FastAPI route handlers, JWT authentication, and strict request validation.",
    skills: ["Node.js", "Express", "FastAPI", "REST APIs", "JWT", "RBAC", "Middleware"],
    specs: { Runtimes: "Node.js / Python", Auth: "JWT + RBAC", Protocol: "REST / JSON", Validations: "Zod / Schemas" },
  },
  {
    id: "languages",
    title: "Languages & Core Logic",
    icon: Braces,
    color: "#f59e0b",
    desc: "Multi-paradigm programming foundations across systems-level performance (C/C++), enterprise Java, and modern typed web.",
    skills: ["TypeScript", "JavaScript", "Python", "Java", "C", "C++", "Algorithms"],
    specs: { Typings: "Multi-paradigm", Systems: "C / C++ / Java", Scripting: "Python / JS", Model: "Async Event Loop" },
  },
  {
    id: "data",
    title: "Data Persistence & Web3",
    icon: Database,
    color: "#10b981",
    desc: "Relational PostgreSQL database schemas with B-Tree indexing, document storage with MongoDB, and Polygon Amoy on-chain verification.",
    skills: ["PostgreSQL", "MongoDB", "Schema Design", "Polygon Amoy", "Web3", "Verification"],
    specs: { Relational: "PostgreSQL", Document: "MongoDB Atlas", Web3: "Polygon Amoy", Integrity: "ACID Constraints" },
  },
  {
    id: "security",
    title: "Security & Authorization",
    icon: Shield,
    color: "#ef4444",
    desc: "Role-Based Access Control (RBAC), signed cryptographic JWT tokens, input sanitization, and defensive API validation.",
    skills: ["JWT Auth", "RBAC", "API Validation", "Ethical Hacking", "Sanitization", "Postman"],
    specs: { Strategy: "Zero Trust", Protocol: "HS256 Tokens", Cookies: "Secure HTTP-Only", Guards: "Route Middleware" },
  },
  {
    id: "tools",
    title: "DevOps & Tooling",
    icon: GitBranch,
    color: "#38bdf8",
    desc: "Fast Vite build tooling, Git version control, Postman API collections, and automated cloud edge deployment workflows.",
    skills: ["Git", "GitHub", "Vite", "Postman", "DevTools", "CI/CD Actions", "Cloud Edge"],
    specs: { Bundler: "Vite 5 / ESBuild", Speed: "<400ms Build", VCS: "Git / GitHub", Deploy: "Edge Hosting" },
  },
];

const SkillsMobile = () => {
  // Independent open states so opening an item unfolds downwards in-place without shifting scroll
  const [openCats, setOpenCats] = useState(() => new Set(["frontend"]));

  const toggleCategory = (id) => {
    setOpenCats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={styles.mobileContainer}>
      <div className={styles.accordionList}>
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isOpen = openCats.has(cat.id);

          return (
            <div
              key={cat.id}
              className={`${styles.accordionItem} ${isOpen ? styles.itemOpen : ""}`}
              style={{ "--cat-accent": cat.color }}
            >
              <button
                type="button"
                className={styles.accordionHeader}
                onClick={() => toggleCategory(cat.id)}
                aria-expanded={isOpen}
                aria-controls={`skills-panel-${cat.id}`}
              >
                <div className={styles.accordionHeaderLeft}>
                  <span className={styles.catIconBox}>
                    <Icon size={18} />
                  </span>
                  <div className={styles.catTitleWrap}>
                    <h4>{cat.title}</h4>
                    <span>{cat.skills.length} core technologies</span>
                  </div>
                </div>
                <ChevronDown className={`${styles.chevronIcon} ${isOpen ? styles.rotated : ""}`} size={18} />
              </button>

              {/* Smooth CSS Grid Expansion: Unfolds smoothly downwards without layout jumps */}
              <div
                id={`skills-panel-${cat.id}`}
                className={`${styles.accordionBodyWrapper} ${isOpen ? styles.bodyOpen : ""}`}
                role="region"
                aria-label={cat.title}
              >
                <div className={styles.accordionBodyInner}>
                  <div className={styles.accordionBody}>
                    <p>{cat.desc}</p>
                    <div className={styles.skillsPillCloud}>
                      {cat.skills.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>

                    <div className={styles.specsGrid}>
                      {Object.entries(cat.specs).map(([key, val]) => (
                        <div key={key} className={styles.specItem}>
                          <span className={styles.sKey}>{key}</span>
                          <span className={styles.sVal}>{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsMobile;
