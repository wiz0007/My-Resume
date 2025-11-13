import React from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import styles from "./Contact.module.scss";

const contacts = [
  {
    icon: <FaPhone />,
    text: "+91 9149084611",
    link: "tel:+919149084611",
  },
  {
    icon: <FaEnvelope />,
    text: "ayush8171wiz@gmail.com",
    link: "mailto:ayush8171wiz@gmail.com",
  },
  {
    icon: <FaLinkedin />,
    text: "LinkedIn",
    link: "https://in.linkedin.com/in/ayushmaan-mishra-254020257",
  },
  {
    icon: <FaGithub />,
    text: "GitHub",
    link: "https://github.com/wiz0007",
  },
];

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
        Let’s Connect
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        viewport={{ once: true }}
      >
        Feel free to reach out via phone, email, or connect with me on socials.
      </motion.p>

      <div className={styles.contactGrid}>
        {contacts.map((item, i) => (
          <motion.a
            key={i}
            href={item.link}
            target={item.link.startsWith("http") ? "_blank" : "_self"}
            rel="noreferrer"
            className={styles.contactCard}
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
        © {new Date().getFullYear()} Ayushmaan Mishra — All Rights Reserved.
      </motion.div>
    </footer>
  );
};

export default Contact;
