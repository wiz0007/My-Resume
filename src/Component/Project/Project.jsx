import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import styles from "./Project.module.scss";

const projects = [
  {
    title: "E-Commerce App",
    desc: "A full-stack MERN e-commerce platform with authentication, product management, cart, and payment gateway integration.",
    link: "https://my-kart-taupe.vercel.app/",
  },
  {
    title: "Portfolio Website",
    desc: "A responsive personal portfolio built with React and SCSS to showcase my skills and projects.",
    link: "https://ayushmaan-mishra-resume.vercel.app/",
  },
  {
    title: "Community Chat Application",
    desc: "An community chat application with MERN where people can connect and socialize",
    link: "we-chatt-ruby.vercel.app",
  },
];

const Project = () => {
  return (
    <section className={styles.projects} id="projects">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Projects
      </motion.h2>

      <div className={styles.grid}>
        {projects.map((p, idx) => (
          <motion.a
            key={idx}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
            whileHover={{ scale: 1.05, y: -6 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className={styles.content}>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
            <div className={styles.link}>
              <ExternalLink size={18} />
              <span>View Project</span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default Project;
