import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import styles from "./Project.module.scss";

const featuredProject = {
  title: "SkillSphere",
  label: "Final Year Project",
  desc: "Skill-sharing platform with authentication, role-based access, database-backed workflows, and Polygon Amoy transaction verification.",
  stack: ["TypeScript", "MERN", "FastAPI concepts", "PostgreSQL", "MongoDB", "Polygon Amoy"],
  live: "https://skillsphere.online",
};

const projects = [
  {
    title: "E-Commerce Application",
    desc: "MERN shopping flow with products, cart, auth, orders, and payment integration.",
    stack: ["MERN", "REST APIs", "Authentication", "Payments"],
    live: "https://my-kart-taupe.vercel.app/",
  },
  {
    title: "Community Chat Application",
    desc: "MERN chat app with user access, message workflows, and reusable modules.",
    stack: ["MERN", "Real-time", "Authentication"],
    live: "https://we-chatt-ruby.vercel.app",
  },
  {
    title: "Fantasy Game Application",
    desc: "Python desktop application for team selection and score-based fantasy game logic.",
    stack: ["Python", "Desktop GUI", "Game logic"],
    code: "https://github.com/wiz0007/Fantasy-Game-App",
  },
  {
    title: "Hotel Management System",
    desc: "Core Java desktop application for room booking, customer records, and hotel workflows.",
    stack: ["Core Java", "Desktop GUI", "Booking logic"],
    code: "https://github.com/wiz0007/Hotel_management",
  },
  {
    title: "Portfolio Website",
    desc: "Responsive React portfolio with animated sections, project cards, and SEO setup.",
    stack: ["React", "SCSS", "Responsive UI"],
    live: "https://ayushmaan-mishra-resume.vercel.app/",
  },
  {
    title: "Freelance Application",
    desc: "Service-focused React website for showcasing work and generating client interest.",
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
          Projects across web, backend, and desktop development.
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
