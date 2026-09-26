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

const DropWords = ({ text, className, delay = 0, as = "span" }) => {
  const MotionTag = as === "p" ? motion.p : as === "strong" ? motion.strong : motion.span;
  const words = text.trim().split(/\s+/);

  return (
    <MotionTag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.7 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: 0.045,
          },
        },
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className={styles.dropWord}
          aria-hidden="true"
          variants={{
            hidden: {
              opacity: 0,
              y: -52,
              rotateZ: index % 2 === 0 ? -2.4 : 2.4,
            },
            visible: {
              opacity: 1,
              y: 0,
              rotateZ: 0,
              transition: {
                type: "spring",
                stiffness: 210,
                damping: 20,
                mass: 0.72,
              },
            },
          }}
        >
          {word}
        </motion.span>
      ))
      .flatMap((wordNode, index) =>
        index < words.length - 1 ? [wordNode, " "] : [wordNode]
      )}
    </MotionTag>
  );
};

const HomeProfile = () => (
  <section className={styles.profile} id="explore" aria-labelledby="home-profile-title">
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

    <div className={styles.copy}>
      <h2 id="home-profile-title">Practical engineering with a product-first mindset.</h2>

      <DropWords
        as="p"
        className={styles.intro}
        text="I am Ayushmaan Mishra, a Computer Engineering graduate building complete web products across interfaces, APIs, databases, authentication, and deployment."
        delay={0.05}
      />

      <div className={styles.strengths}>
        {strengths.map(({ icon: Icon, title, text }, cardIndex) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{
              duration: 0.42,
              delay: cardIndex * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span>{React.createElement(Icon, { size: 20 })}</span>
            <div>
              <DropWords
                as="strong"
                className={styles.strengthTitle}
                text={title}
                delay={0.05 + cardIndex * 0.04}
              />
              <DropWords
                as="p"
                className={styles.strengthText}
                text={text}
                delay={0.1 + cardIndex * 0.04}
              />
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: -24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 20,
          delay: 0.2,
        }}
      >
        <Link className={styles.link} to="/profile">
          Open full profile <ArrowUpRight size={17} />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default HomeProfile;
