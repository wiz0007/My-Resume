import {
  Braces,
  DatabaseZap,
  Layers3,
  ShieldCheck,
} from "lucide-react";

export const profilePillars = [
  {
    id: "interface",
    phase: "01",
    tag: "MERN + TypeScript",
    title: "Interface Systems Architecture",
    lead: "I turn product ideas into structured, responsive, and resilient user interfaces.",
    stack: ["React 19", "TypeScript", "SCSS Modules", "Framer Motion", "Responsive UI"],
    specs: {
      "UI Paradigm": "Declarative Components",
      "Type Safety": "Strict TypeScript",
      "Animations": "Hardware GPU Springs",
      "State Model": "Hooks & Context",
    },
    projects: [
      { name: "SkillSphere", to: "/projects", label: "Marketplace UI" },
      { name: "Pipeline Builder", to: "/projects", label: "Visual Graph Canvas" },
    ],
    icon: Layers3,
    accent: "#38bdf8",
  },
  {
    id: "backend",
    phase: "02",
    tag: "Spring Boot + FastAPI + Node",
    title: "Backend Services & API Gateways",
    lead: "I care deeply about what happens after the button is clicked.",
    stack: ["Spring Boot", "FastAPI", "Node.js", "Express", "REST APIs"],
    specs: {
      "Runtimes": "Node LTS / Python 3.11 / JVM",
      "Frameworks": "Spring Boot / FastAPI / Express",
      "Validation": "Pydantic & Middleware Gates",
      "Latency": "Sub-20ms async endpoints",
    },
    projects: [
      { name: "SchoolSys Platform", to: "/projects", label: "Spring Boot + Postgres" },
      { name: "DAG Validator", to: "/projects", label: "FastAPI Graph Parser" },
    ],
    icon: DatabaseZap,
    accent: "#8b5cf6",
  },
  {
    id: "data",
    phase: "03",
    tag: "PostgreSQL + MongoDB + Web3",
    title: "Data Persistence, Security & Trust",
    lead: "Architecting reliable data models, access boundaries, and audit verification.",
    stack: ["PostgreSQL", "MongoDB Atlas", "JWT Auth", "RBAC", "Polygon Amoy"],
    specs: {
      "Relational": "PostgreSQL ACID RDBMS",
      "Document": "MongoDB Atlas BSON",
      "Auth Standard": "RFC 7519 JWT + RBAC",
      "Audit Proofs": "Polygon Amoy Blockchain",
    },
    projects: [
      { name: "SkillSphere Wallet", to: "/projects", label: "On-Chain Audit" },
      { name: "SchoolSys Auth", to: "/projects", label: "HTTP-Only Refresh Token" },
    ],
    icon: ShieldCheck,
    accent: "#10b981",
  },
  {
    id: "range",
    phase: "04",
    tag: "Web + Desktop + Systems",
    title: "Engineering Range & Working Momentum",
    lead: "Bridging web experiences, visual tools, algorithms, and native desktop software.",
    stack: ["DFS Algorithms", "Python GUI", "Core Java", "C / C++", "React Flow"],
    specs: {
      "Algorithms": "DFS Graph Cycle Detection",
      "Desktop Platforms": "Java Swing / Python GUI",
      "Range": "Web + Desktop Systems",
      "Track Record": "6+ Deployed Systems",
    },
    projects: [
      { name: "Pipeline DAG Builder", to: "/projects", label: "Graph Cycle Engine" },
      { name: "E-Commerce", to: "/projects", label: "Commerce State Machine" },
    ],
    icon: Braces,
    accent: "#f59e0b",
  },
];
