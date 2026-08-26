import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Blocks, Code2, Fingerprint, Mail, Route } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./HomeGateway.module.scss";

const gateways = [
  {
    title: "Projects",
    label: "Selected Work",
    text: "A focused view of full-stack, workflow, commerce, chat, and desktop projects.",
    to: "/projects",
    icon: Blocks,
  },
  {
    title: "Process",
    label: "Build Method",
    text: "How I move from product idea to interface, API, data flow, and deployment.",
    to: "/process",
    icon: Route,
  },
  {
    title: "Skills",
    label: "Technical Stack",
    text: "Frontend, backend, databases, languages, tools, and engineering range.",
    to: "/skills",
    icon: Code2,
  },
  {
    title: "Profile",
    label: "Background",
    text: "About me, education, certifications, and the experience behind the work.",
    to: "/profile",
    icon: Fingerprint,
  },
  {
    title: "Contact",
    label: "Next Step",
    text: "Reach out for roles, collaboration, or a closer look at the resume.",
    to: "/contact",
    icon: Mail,
  },
];

const HomeGateway = () => (
  <section className={styles.gateway} id="explore" aria-labelledby="site-gateway-title">
    <div className={styles.header}>
      <span>Explore</span>
      <h2 id="site-gateway-title">Choose the part of the portfolio you want to inspect.</h2>
      <p>
        The site is now split into focused pages, so each area can breathe and show the right
        amount of detail.
      </p>
    </div>

    <div className={styles.grid}>
      {gateways.map(({ title, label, text, to, icon: Icon }, index) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 28, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link className={styles.card} to={to}>
            <span className={styles.icon}>
              {React.createElement(Icon, { size: 23 })}
            </span>
            <span className={styles.label}>{label}</span>
            <strong>{title}</strong>
            <p>{text}</p>
            <span className={styles.action}>
              Open page <ArrowUpRight size={17} />
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  </section>
);

export default HomeGateway;
