import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Code2, DatabaseZap, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import profilepic from "../../assets/MyPic.jpeg";
import styles from "./HomeProfile.module.scss";

const strengths = [
  {
    icon: Code2,
    title: "Full-stack build",
    text: "React, TypeScript, APIs, authentication, and clean deployment flow.",
  },
  {
    icon: DatabaseZap,
    title: "Backend-minded",
    text: "I think through data models, validation, ownership, and persistence.",
  },
  {
    icon: ShieldCheck,
    title: "Trust and polish",
    text: "Access control, verification, responsive UI, and motion with restraint.",
  },
];

const HomeProfile = () => (
  <section className={styles.profile} aria-labelledby="home-profile-title">
    <motion.div
      className={styles.imageFrame}
      initial={{ opacity: 0, x: -36, rotateY: 5 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <img src={profilepic} alt="Ayushmaan Mishra" loading="lazy" decoding="async" />
      <div className={styles.imageBadge}>
        <span>Available for fresher roles</span>
        <strong>Full-stack developer</strong>
      </div>
    </motion.div>

    <motion.div
      className={styles.copy}
      initial={{ opacity: 0, x: 36 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className={styles.eyebrow}>Profile</span>
      <h2 id="home-profile-title">Practical engineering with a product-first mindset.</h2>
      <p>
        I am Ayushmaan Mishra, a Computer Engineering graduate building complete web
        products across interfaces, APIs, databases, authentication, and deployment.
      </p>

      <div className={styles.strengths}>
        {strengths.map(({ icon: Icon, title, text }) => (
          <article key={title}>
            <span>{React.createElement(Icon, { size: 20 })}</span>
            <div>
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>

      <Link className={styles.link} to="/profile">
        Open full profile <ArrowUpRight size={17} />
      </Link>
    </motion.div>
  </section>
);

export default HomeProfile;
