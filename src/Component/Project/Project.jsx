import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import styles from "./Project.module.scss";

const featuredProject = {
  title: "SkillSphere",
  label: "Final Year Project",
  desc: "A skill-sharing platform with secure authentication, role-based access, scalable backend APIs, database-backed user/project workflows, and blockchain-anchored transaction verification on Polygon Amoy.",
  stack: ["TypeScript", "MERN", "FastAPI concepts", "PostgreSQL", "MongoDB", "Polygon Amoy"],
  live: "https://skillsphere.online",
};

const projects = [
  {
    title: "E-Commerce Application",
    desc: "Built product, cart, authentication, order, and payment-integration workflows across a React frontend and Node/Express backend.",
    stack: ["MERN", "REST APIs", "Authentication", "Payments"],
    live: "https://my-kart-taupe.vercel.app/",
  },
  {
    title: "Community Chat Application",
    desc: "Created a real-time chat platform with secure user access, message workflows, and reusable frontend/backend modules.",
    stack: ["MERN", "Real-time", "Authentication"],
    live: "https://we-chatt-ruby.vercel.app",
  },
  {
    title: "Fantasy Game Application",
    desc: "Implemented team selection and live score-based point calculation workflows for a fantasy gaming experience.",
    stack: ["Full-stack", "Team management", "Live-score logic"],
    code: "https://github.com/wiz0007/Fantasy-Game-App",
  },
  {
    title: "Hotel Management System",
    desc: "Built room booking, customer records, and management workflows with API-oriented backend structure.",
    stack: ["Backend workflows", "Booking logic", "Customer records"],
    code: "https://github.com/wiz0007/Hotel_management",
  },
  {
    title: "Portfolio Website",
    desc: "Designed and developed a responsive React portfolio to present projects, technical skills, certifications, and contact paths.",
    stack: ["React", "SCSS", "Responsive UI"],
    live: "https://ayushmaan-mishra-resume.vercel.app/",
  },
  {
    title: "Freelance Application",
    desc: "Developed a service-oriented website for showcasing work and connecting with freelance opportunities.",
    stack: ["React", "Landing flow", "Project showcase"],
    live: "https://innovatech-puce.vercel.app",
  },
];

const projectVariants = {
  hidden: { opacity: 0, y: 34 },
  show: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: index * 0.08, ease: "easeOut" },
  }),
};

const Project = () => {
  return (
    <section className={styles.projects} id="projects">
      <div className={styles.mesh} aria-hidden="true" />
      <div className={styles.header}>
        <span>Featured Work</span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Projects that show full-stack ownership.
        </motion.h2>
      </div>

      <motion.article
        className={styles.featured}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div>
          <span className={styles.projectLabel}>{featuredProject.label}</span>
          <h3>{featuredProject.title}</h3>
          <p>{featuredProject.desc}</p>
          <div className={styles.tags}>
            {featuredProject.stack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
        <a href={featuredProject.live} target="_blank" rel="noopener noreferrer">
          <ExternalLink size={18} />
          View Live
        </a>
      </motion.article>

      <div className={styles.grid}>
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            className={styles.card}
            custom={index}
            variants={projectVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className={styles.content}>
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              <div className={styles.tags}>
                {project.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
            <a
              href={project.live || project.code}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {project.live ? <ExternalLink size={18} /> : <Github size={18} />}
              {project.live ? "Live Project" : "GitHub"}
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Project;
