import React, { lazy, Suspense, useState } from "react";
import { Braces, Database, GitBranch, Layers, Server, Shield } from "lucide-react";
import SectionAtmosphere from "../SectionAtmosphere/SectionAtmosphere";
import styles from "./Skills.module.scss";

const SkillOrbitScene = lazy(() => import("../../three/SkillOrbitScene"));

const skillGroups = [
  {
    id: "frontend",
    title: "Frontend",
    icon: Layers,
    color: "#22d3ee",
    description: "Responsive interfaces, reusable components, motion, and accessible UI structure.",
    skills: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "SCSS"],
  },
  {
    id: "backend",
    title: "Backend",
    icon: Server,
    color: "#8b5cf6",
    description: "API design, authentication, role-based access, and backend application flow.",
    skills: ["Node.js", "Express", "FastAPI", "REST APIs", "JWT", "RBAC"],
  },
  {
    id: "languages",
    title: "Languages",
    icon: Braces,
    color: "#f59e0b",
    description: "Programming foundations across web, desktop, systems, and scripting projects.",
    skills: ["C", "C++", "Java", "Python", "JavaScript", "TypeScript"],
  },
  {
    id: "data",
    title: "Data + Web3",
    icon: Database,
    color: "#10b981",
    description: "Database-backed workflows and blockchain-anchored verification concepts.",
    skills: ["MongoDB", "PostgreSQL", "Schema Design", "Polygon Amoy", "Web3", "Verification"],
  },
  {
    id: "security",
    title: "Security",
    icon: Shield,
    color: "#ef4444",
    description: "Secure access flows, authentication checks, and tamper-aware records.",
    skills: ["JWT Auth", "RBAC", "API Validation", "Ethical Hacking", "Postman", "Debugging"],
  },
  {
    id: "tools",
    title: "Tools",
    icon: GitBranch,
    color: "#38bdf8",
    description: "Tools used to build, test, version, debug, and deploy applications.",
    skills: ["Git", "GitHub", "Postman", "Vite", "Deployment", "DevTools"],
  },
];

const Skills = () => {
  const [activeId, setActiveId] = useState("frontend");
  const active = skillGroups.find((group) => group.id === activeId);

  return (
    <section className={styles.skills} id="skills">
      <SectionAtmosphere accent="#06b6d4" secondary="#10b981" side="right" subtle />
      <div className={styles.header}>
        <span>3D Technical System</span>
        <h2>Explore the stack orbiting around how I build.</h2>
      </div>

      <div className={styles.experience}>
        <Suspense fallback={<div className={styles.sceneFallback}>Loading skill system...</div>}>
          <SkillOrbitScene skills={active.skills} color={active.color} title={active.title} />
        </Suspense>

        <article className={styles.details} style={{ "--category-color": active.color }}>
          <span className={styles.detailLabel}>Selected category</span>
          <h3>{active.title}</h3>
          <p>{active.description}</p>
          <div className={styles.tags}>
            {active.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </article>
      </div>

      <div className={styles.controls} role="tablist" aria-label="Skill categories">
        {skillGroups.map((group) => {
          const Icon = group.icon;
          return (
            <button
              type="button"
              role="tab"
              aria-selected={activeId === group.id}
              className={activeId === group.id ? styles.active : ""}
              style={{ "--control-color": group.color }}
              key={group.id}
              onClick={() => setActiveId(group.id)}
            >
              <Icon size={18} />
              {group.title}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
