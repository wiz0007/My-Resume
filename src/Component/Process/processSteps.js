import {
  Accessibility,
  Blocks,
  Braces,
  Database,
  Gauge,
  GitBranch,
  Layers3,
  MonitorSmartphone,
  Network,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";

export const discoverySignals = [
  { label: "Users", value: "roles + intent", icon: UsersRound },
  { label: "Flow", value: "screens + states", icon: GitBranch },
  { label: "Data", value: "entities + rules", icon: Database },
  { label: "Risk", value: "edge cases", icon: ShieldCheck },
];

export const architectureLayers = [
  { label: "Interface", detail: "components + routes", icon: MonitorSmartphone },
  { label: "API", detail: "contracts + validation", icon: Network },
  { label: "Logic", detail: "auth + permissions", icon: Braces },
  { label: "Data", detail: "models + persistence", icon: Database },
];

export const buildSlices = [
  { label: "UI", value: "responsive states", icon: Blocks },
  { label: "API", value: "integrated", icon: Network },
  { label: "Data", value: "validated", icon: Database },
];

export const qualityChecks = [
  { label: "Performance", icon: Gauge },
  { label: "Accessibility", icon: Accessibility },
  { label: "Responsive", icon: MonitorSmartphone },
  { label: "Deploy", icon: Rocket },
];

export const processScenes = [
  {
    key: "discover",
    label: "Discover",
    icon: Search,
    title: "Define the problem before touching the build.",
    text: "Roles, flows, data and failure states become a clear working model before implementation starts.",
    tags: ["User flow", "Scope", "Data model", "Edge cases"],
  },
  {
    key: "architect",
    label: "Architect",
    icon: Layers3,
    title: "Give every responsibility a clear boundary.",
    text: "The interface, API, business logic and data layer are shaped around simple contracts that are easier to extend.",
    tags: ["Routes", "API contracts", "Auth", "Ownership"],
  },
  {
    key: "build",
    label: "Build",
    icon: Braces,
    title: "Ship working slices, not isolated screens.",
    text: "Each slice connects interface, API and data so progress stays testable and useful throughout the build.",
    tags: ["Responsive UI", "Integration", "States", "Testing"],
  },
  {
    key: "improve",
    label: "Improve",
    icon: Sparkles,
    title: "Polish the system where users can feel it.",
    text: "Performance, accessibility, responsiveness and deployment readiness get a final deliberate pass.",
    tags: ["Performance", "A11y", "Stability", "Deploy"],
  },
];
