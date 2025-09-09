import React from "react";
import styles from "./Contact.module.scss";
import { FaPhone, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

const Contact = () => {
  return (
    <section className={styles.contactSection} id="contact">
      <h2>Contact Me</h2>
      <p>Let’s connect! Feel free to reach out via phone, email, or social links.</p>

      <div className={styles.contactGrid}>
        <div className={styles.contactItem}>
          <FaPhone className={styles.icon} />
          <a href="tel:+919149084611">+91 9149084611</a>
        </div>

        <div className={styles.contactItem}>
          <FaEnvelope className={styles.icon} />
          <a href="mailto:ayush8171wiz@gmail.com">ayush8171wiz@gmail.com</a>
        </div>

        <div className={styles.contactItem}>
          <FaLinkedin className={styles.icon} />
          <a
            href="https://in.linkedin.com/in/ayushmaan-mishra-254020257"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>

        <div className={styles.contactItem}>
          <FaGithub className={styles.icon} />
          <a
            href="https://github.com/wiz0007"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
