import React from "react";
import styles from "./Project.module.scss";

const projects = [
  {
    title: "E-Commerce App",
    desc: "A full-stack MERN e-commerce platform with authentication, cart, and payment.",
    link: "https://my-kart-taupe.vercel.app/"
  },
  {
    title: "Portfolio Website",
    desc: "A responsive personal portfolio to showcase projects and skills.",
    link: "#"
  },
  {
    title: "Security Scanner",
    desc: "Ethical hacking project performing VAPT on OWASP Top 10 vulnerabilities.",
    link: "#"
  }
];

const Project = () => {
  return (
    <section className={styles.projects} id="projects">
      <h2>Projects</h2>
      <div className={styles.grid}>
        {projects.map((p, idx) => (
          <div key={idx} className={styles.card}>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <a href={p.link}>🔗 View</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Project;
