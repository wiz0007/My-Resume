import React from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import styles from "./Contact.module.scss";

const contacts = [
  {
    icon: <FaPhone />,
    text: "+91 9149084611",
    link: "tel:+919149084611",
    label: "Call Ayushmaan Mishra",
  },
  {
    icon: <FaEnvelope />,
    text: "ayush8171wiz@gmail.com",
    link: "mailto:ayush8171wiz@gmail.com",
    label: "Email Ayushmaan Mishra",
  },
  {
    icon: <FaLinkedin />,
    text: "LinkedIn",
    link: "https://in.linkedin.com/in/ayushmaan-mishra-254020257",
    label: "Ayushmaan Mishra LinkedIn Profile",
  },
  {
    icon: <FaGithub />,
    text: "GitHub",
    link: "https://github.com/wiz0007",
    label: "Ayushmaan Mishra GitHub Profile",
  },
];

const contactVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: index * 0.08,
    },
  }),
};

const Contact = () => {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.overlay}></div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        Contact Ayushmaan Mishra - Full Stack Developer
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        viewport={{ once: true }}
      >
        I am currently seeking opportunities as a Full Stack Developer,
        React Developer, Node.js Developer, MERN Stack Developer,
        Backend Developer, Software Engineer, or Software Developer.
        Feel free to connect regarding internships, fresher roles,
        freelance projects, or collaboration opportunities.
      </motion.p>

      <div className={styles.contactGrid}>
        {contacts.map((item, index) => (
          <motion.a
            key={item.text}
            href={item.link}
            aria-label={item.label}
            target={item.link.startsWith("http") ? "_blank" : "_self"}
            rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
            className={styles.contactCard}
            custom={index}
            variants={contactVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 250 }}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.text}>{item.text}</span>
          </motion.a>
        ))}
      </div>

      <motion.div
        className={styles.footerNote}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        viewport={{ once: true }}
      >
        © {new Date().getFullYear()} Ayushmaan Mishra | Full Stack Developer |
        React Developer | Node.js Developer
      </motion.div>
    </footer>
  );
};

export default Contact;