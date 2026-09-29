import { useState, useEffect, useRef, useCallback } from "react";
import {
  Braces,
  Database,
  GitBranch,
  Layers,
  Server,
  Shield
} from "lucide-react";
import styles from "./SkillsGlobe.module.scss";

const skillsList = [
  {
    id: "react",
    name: "React",
    category: "frontend",
    color: "#22d3ee",
    desc: "Primary frontend framework for constructing responsive, component-driven user interfaces, stateful hooks, and atomic design systems.",
    ecosystem: ["typescript", "vite", "scss"],
    metrics: { Layer: "UI Framework", "Core API": "Hooks & Context", Paradigm: "Declarative", Performance: "Concurrent" },
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    color: "#22d3ee",
    desc: "Strict type boundaries, utility generics, robust interfaces, and end-to-end type safety across both frontend and backend codebases.",
    ecosystem: ["react", "nodejs", "express"],
    metrics: { Typings: "Static / Strict", Mode: "ESNext / Node", Architecture: "Full Stack", Tooling: "tsc / esbuild" },
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    color: "#8b5cf6",
    desc: "High-performance asynchronous runtime for REST API servers, authentication microservices, middleware routing, and backend systems.",
    ecosystem: ["express", "jwt", "postgres"],
    metrics: { Engine: "V8 LTS", Architecture: "Event Loop", Concurrency: "Non-blocking", Packaging: "npm / pnpm" },
  },
  {
    id: "express",
    name: "Express",
    category: "backend",
    color: "#8b5cf6",
    desc: "Fast, unopinionated backend web framework for structuring robust API endpoints, secure middleware, and controller layers.",
    ecosystem: ["nodejs", "jwt", "mongo"],
    metrics: { Role: "HTTP Router", Architecture: "Middleware Gate", Protocol: "REST / JSON", Sessions: "Stateless" },
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "backend",
    color: "#8b5cf6",
    desc: "Modern high-speed Python web framework for asynchronous microservices, automatic Swagger OpenAPI docs, and strict Pydantic validation.",
    ecosystem: ["python", "postgres", "jwt"],
    metrics: { Runtime: "Python 3.11+", Standard: "ASGI / Uvicorn", Typing: "Pydantic v2", Latency: "Sub-20ms" },
  },
  {
    id: "python",
    name: "Python",
    category: "languages",
    color: "#f59e0b",
    desc: "General-purpose language for backend API services, algorithmic workflows, data parsing, automation, and AI integrations.",
    ecosystem: ["fastapi", "postgres", "cpp"],
    metrics: { Paradigm: "Multi-paradigm", Version: "3.11+", Ecosystem: "FastAPI / Pandas", Async: "asyncio" },
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    category: "data",
    color: "#10b981",
    desc: "Production relational database managing structured schemas, foreign integrity constraints, B-Tree indexes, and ACID compliance.",
    ecosystem: ["fastapi", "express", "polygon"],
    metrics: { Model: "Relational RDBMS", Concurrency: "MVCC", Pooling: "pgBouncer", Indexing: "B-Tree / GIN" },
  },
  {
    id: "mongo",
    name: "MongoDB",
    category: "data",
    color: "#10b981",
    desc: "NoSQL document database powering flexible document models, compound queries, and high-velocity JSON data persistence.",
    ecosystem: ["nodejs", "express", "jwt"],
    metrics: { Format: "BSON / Documents", Cluster: "Atlas Managed", Queries: "Aggregation Pipeline", Scaling: "Horizontal" },
  },
  {
    id: "jwt",
    name: "JWT Auth",
    category: "security",
    color: "#ef4444",
    desc: "Stateless authentication via cryptographically signed tokens (HS256), payload claims, HTTP-only cookie security, and rotation.",
    ecosystem: ["rbac", "nodejs", "express"],
    metrics: { Standard: "RFC 7519", Algorithm: "HMAC-SHA256", Scope: "Route Guards", Cookies: "Secure / SameSite" },
  },
  {
    id: "rbac",
    name: "RBAC",
    category: "security",
    color: "#ef4444",
    desc: "Role-Based Access Control enforcing least-privilege security boundaries between Admin, Developer, and Visitor tiers.",
    ecosystem: ["jwt", "fastapi", "express"],
    metrics: { Strategy: "Permission Matrix", Enforcement: "Middleware Filter", Audits: "Access Logs", Layer: "API Gateway" },
  },
  {
    id: "vite",
    name: "Vite",
    category: "tools",
    color: "#38bdf8",
    desc: "Next-generation frontend tooling providing lightning-fast HMR, native ES module compilation, and optimized production bundling.",
    ecosystem: ["react", "typescript", "scss"],
    metrics: { "Dev Server": "Native ESM", Bundler: "Rollup", Transform: "ESBuild", "Build Speed": "<400ms" },
  },
  {
    id: "git",
    name: "Git & GitHub",
    category: "tools",
    color: "#38bdf8",
    desc: "Distributed version control, atomic commits, trunk-based branching, GitHub Actions CI/CD workflows, and release automation.",
    ecosystem: ["vite", "react", "nodejs"],
    metrics: { VCS: "Git CLI", Hosting: "GitHub", Automation: "Workflows", Branching: "Trunk-based" },
  },
  {
    id: "polygon",
    name: "Polygon Amoy",
    category: "data",
    color: "#10b981",
    desc: "Decentralized blockchain testnet for cryptographic credential anchoring, smart contract verification, and immutable records.",
    ecosystem: ["postgres", "mongo"],
    metrics: { Network: "Polygon PoS", Standard: "EVM Compatible", Proofs: "On-Chain Hashes", Finality: "Deterministic" },
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "languages",
    color: "#f59e0b",
    desc: "Core web language mastering ESNext asynchronous patterns, event loop queues, closures, DOM orchestration, and web APIs.",
    ecosystem: ["typescript", "react", "nodejs"],
    metrics: { Standards: "ESNext / TC39", Engine: "V8 / SpiderMonkey", Paradigms: "Functional + Prototype", Async: "Promises / Async" },
  },
  {
    id: "cpp",
    name: "C / C++",
    category: "languages",
    color: "#f59e0b",
    desc: "Foundational systems programming, memory models, pointers, manual allocations, and algorithmic time complexity optimizations.",
    ecosystem: ["java", "python"],
    metrics: { Dialects: "C++17 / C99", Memory: "Manual / RAII", Speed: "Bare Metal", Scope: "Data Structures" },
  },
  {
    id: "java",
    name: "Java",
    category: "languages",
    color: "#f59e0b",
    desc: "Enterprise object-oriented software engineering, class encapsulation, concurrency patterns, and design principles.",
    ecosystem: ["cpp", "python"],
    metrics: { Platform: "JVM Runtime", Paradigm: "Strict OOP", Architecture: "Layered Services", Garbage: "G1 Collector" },
  },
  {
    id: "scss",
    name: "SCSS Modules",
    category: "frontend",
    color: "#22d3ee",
    desc: "CSS modules with variables, nesting, mixins, fluid clamp typography, and performant hardware-accelerated animations.",
    ecosystem: ["react", "vite"],
    metrics: { System: "CSS Modules", Animations: "Hardware GPU", Typography: "Fluid Clamps", Tokens: "Custom Tokens" },
  },
  {
    id: "postman",
    name: "Postman",
    category: "tools",
    color: "#38bdf8",
    desc: "API test suites, automated mock environments, contract testing, and pre-deployment endpoint verification.",
    ecosystem: ["express", "fastapi", "jwt"],
    metrics: { Role: "API Testing", Runs: "Automated Collections", Variables: "Environments", Checks: "Status & Headers" },
  },
];

const categoryIcons = {
  frontend: Layers,
  backend: Server,
  languages: Braces,
  data: Database,
  security: Shield,
  tools: GitBranch,
};

const SkillsGlobe = () => {
  const [activeSkillId, setActiveSkillId] = useState("react");
  const [hoveredSkillId, setHoveredSkillId] = useState(null);
  const [filterCat, setFilterCat] = useState("all");

  const viewportRef = useRef(null);
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0.0028, y: 0.0014 });
  const rotationRef = useRef({ x: 0.2, y: 0.4 });
  const speedMultiplierRef = useRef(1.0);
  const rafIdRef = useRef(null);
  const sphereNodesRef = useRef([]);
  const [tagPositions, setTagPositions] = useState([]);

  const currentSkill = skillsList.find((s) => s.id === (hoveredSkillId || activeSkillId)) || skillsList[0];
  const CurrentIcon = categoryIcons[currentSkill.category] || Layers;

  // Responsive radius calculation
  const getRadius = useCallback(() => {
    if (typeof window === "undefined") return 180;
    const width = window.innerWidth;
    if (width < 440) return 115;
    if (width < 680) return 130;
    if (width < 1024) return 150;
    return 180;
  }, []);

  // Initialize and update 3D Fibonacci sphere distribution based on responsive radius
  const updateSphereDistribution = useCallback(() => {
    const radius = getRadius();
    sphereNodesRef.current = skillsList.map((skill, index) => {
      const N = skillsList.length;
      const phi = Math.acos(1 - (2 * (index + 0.5)) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (index + 0.5);
      return {
        ...skill,
        baseX: radius * Math.cos(theta) * Math.sin(phi),
        baseY: radius * Math.sin(theta) * Math.sin(phi),
        baseZ: radius * Math.cos(phi),
        radius,
      };
    });
  }, [getRadius]);

  useEffect(() => {
    updateSphereDistribution();
    const handleResize = () => updateSphereDistribution();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateSphereDistribution]);

  // Animation frame loop with smooth deceleration on hover
  useEffect(() => {
    const fov = 380; // Perspective field of view

    const render = () => {
      if (!isDraggingRef.current) {
        // Smoothly ease rotation speed on hover (gentle float) vs unhover (cruise)
        const targetMultiplier = hoveredSkillId ? 0.2 : 1.0;
        speedMultiplierRef.current += (targetMultiplier - speedMultiplierRef.current) * 0.08;

        rotationRef.current.y += velocityRef.current.x * speedMultiplierRef.current;
        rotationRef.current.x += velocityRef.current.y * speedMultiplierRef.current;
      }

      const radX = rotationRef.current.x;
      const radY = rotationRef.current.y;
      const sinX = Math.sin(radX);
      const cosX = Math.cos(radX);
      const sinY = Math.sin(radY);
      const cosY = Math.cos(radY);

      const computed = sphereNodesRef.current.map((node) => {
        // Rotate around Y-axis
        const x1 = node.baseX * cosY - node.baseZ * sinY;
        const z1 = node.baseZ * cosY + node.baseX * sinY;

        // Rotate around X-axis
        const y2 = node.baseY * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.baseY * sinX;

        // Perspective depth projection
        const scale = (fov + z2) / fov;
        const opacity = Math.max(0.18, Math.min(1, (z2 + 200) / 370));
        const zIndex = Math.round((z2 + 200) * 10);

        return {
          id: node.id,
          name: node.name,
          category: node.category,
          color: node.color,
          x: x1 * scale,
          y: y2 * scale,
          scale: Math.max(0.6, scale),
          opacity,
          zIndex,
        };
      });

      setTagPositions(computed);
      rafIdRef.current = requestAnimationFrame(render);
    };

    rafIdRef.current = requestAnimationFrame(render);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [hoveredSkillId]);

  // Pointer drag to spin the 3D globe in any direction
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
    if (viewportRef.current) {
      viewportRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;

    rotationRef.current.y += dx * 0.0055;
    rotationRef.current.x -= dy * 0.0055;

    velocityRef.current = { x: dx * 0.001, y: -dy * 0.001 };
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e) => {
    isDraggingRef.current = false;
    if (viewportRef.current && viewportRef.current.hasPointerCapture(e.pointerId)) {
      viewportRef.current.releasePointerCapture(e.pointerId);
    }
    velocityRef.current = { x: 0.0028, y: 0.0014 };
  };

  return (
    <div className={styles.globeStudio}>
      {/* Left Column: Seamless Floating 3D Tech Sphere (Unboxed) */}
      <div className={styles.globeStage}>
        <div
          ref={viewportRef}
          className={styles.sphereViewport}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Ambient Orbital Rings */}
          <div className={styles.ambientRings} aria-hidden="true" />

          {/* Floating Projected 3D Tags */}
          {tagPositions.map((tag) => {
            const isSelected = tag.id === (hoveredSkillId || activeSkillId);
            const isDimmed = filterCat !== "all" && tag.category !== filterCat;

            return (
              <button
                key={tag.id}
                type="button"
                className={`${styles.tagPill} ${isSelected ? styles.activeTag : ""} ${isDimmed ? styles.dimmed : ""}`}
                style={{
                  "--tag-color": tag.color,
                  transform: `translate3d(calc(-50% + ${tag.x}px), calc(-50% + ${tag.y}px), 0) scale(${tag.scale})`,
                  opacity: isSelected ? 1 : tag.opacity,
                  zIndex: isSelected ? 9999 : tag.zIndex,
                }}
                onMouseEnter={() => setHoveredSkillId(tag.id)}
                onMouseLeave={() => setHoveredSkillId(null)}
                onClick={() => setActiveSkillId(tag.id)}
              >
                <span className={styles.tagDot} />
                <span>{tag.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Skill Dossier & Telemetry */}
      <div className={styles.dossierPanel}>
        {/* Category Filter Chips */}
        <div className={styles.filterRow}>
          {[
            { id: "all", label: "All Layers" },
            { id: "frontend", label: "Frontend", color: "#22d3ee" },
            { id: "backend", label: "Backend", color: "#8b5cf6" },
            { id: "languages", label: "Languages", color: "#f59e0b" },
            { id: "data", label: "Data+Web3", color: "#10b981" },
            { id: "security", label: "Security", color: "#ef4444" },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={filterCat === cat.id ? styles.filterActive : ""}
              style={{ "--cat-accent": cat.color || "#38bdf8" }}
              onClick={() => {
                setFilterCat(cat.id);
                if (cat.id !== "all") {
                  const match = skillsList.find((s) => s.category === cat.id);
                  if (match) setActiveSkillId(match.id);
                }
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dossier Card */}
        <article className={styles.dossierCard} style={{ "--skill-color": currentSkill.color }}>
          <div>
            <div className={styles.dossierHeader}>
              <div className={styles.dossierNameGroup}>
                <span className={styles.dossierIconWrap}>
                  <CurrentIcon size={24} />
                </span>
                <div className={styles.dossierTitleInfo}>
                  <h3>{currentSkill.name}</h3>
                  <span>{currentSkill.category.toUpperCase()} STACK</span>
                </div>
              </div>
              <span className={styles.levelBadge}>PRODUCTION</span>
            </div>

            <p className={styles.dossierDesc}>{currentSkill.desc}</p>

            {/* Related Ecosystem Links */}
            <div className={styles.ecosystemBox}>
              <span className={styles.ecoLabel}>Direct Ecosystem Connections:</span>
              <div className={styles.ecoList}>
                {currentSkill.ecosystem.map((ecoId) => {
                  const neighbor = skillsList.find((s) => s.id === ecoId);
                  if (!neighbor) return null;
                  return (
                    <button
                      key={ecoId}
                      type="button"
                      onClick={() => setActiveSkillId(neighbor.id)}
                    >
                      {neighbor.name} &rarr;
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Technical Parameters Grid */}
            <div className={styles.metricsGrid}>
              {Object.entries(currentSkill.metrics).map(([mKey, mVal]) => (
                <div key={mKey} className={styles.metricTile}>
                  <span className={styles.mKey}>{mKey}</span>
                  <span className={styles.mVal}>{mVal}</span>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default SkillsGlobe;
