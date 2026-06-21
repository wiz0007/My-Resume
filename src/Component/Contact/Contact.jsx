import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import SectionAtmosphere from "../SectionAtmosphere/SectionAtmosphere";
import styles from "./Contact.module.scss";

const socials = [
  {
    icon: <Github size={19} />,
    title: "GitHub",
    detail: "wiz0007",
    href: "https://github.com/wiz0007",
  },
  {
    icon: <Linkedin size={19} />,
    title: "LinkedIn",
    detail: "Ayushmaan Mishra",
    href: "https://in.linkedin.com/in/ayushmaan-mishra-254020257",
  },
  {
    icon: <Mail size={19} />,
    title: "Email",
    detail: "ayush8171wiz@gmail.com",
    href: "mailto:ayush8171wiz@gmail.com",
  },
];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur" });

  const onSubmit = ({ name, email, message }) => {
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
    setSubmitted(true);
    window.location.href = `mailto:ayush8171wiz@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <footer className={styles.contact} id="contact">
      <SectionAtmosphere accent="#22d3ee" secondary="#8b5cf6" side="right" subtle />
      <div className={styles.scene} aria-hidden="true">
        <div className={styles.orbit}><i /><i /><i /></div>
        <div className={styles.codePlane}>
          <span>connection.status</span>
          <strong>AVAILABLE</strong>
          <i /><i /><i />
        </div>
        <div className={styles.beam} />
      </div>

      <div className={styles.content}>
        <motion.div
          className={styles.intro}
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <span className={styles.eyebrow}>Start a conversation</span>
          <h2>Have a product, role, or technical problem in mind?</h2>
          <p>
            I am open to full-stack, frontend, backend, and software engineering opportunities where thoughtful interfaces meet dependable systems.
          </p>

          <div className={styles.location}><MapPin size={18} /> India - Available for fresher roles</div>

          <div className={styles.socials}>
            {socials.map(({ icon, title, detail, href }) => (
              <a key={title} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                <span>{icon}</span>
                <div><strong>{title}</strong><small>{detail}</small></div>
                <ArrowUpRight size={17} />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          initial={{ opacity: 0, x: 36, rotateY: -5 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65 }}
        >
          <div className={styles.formTop}>
            <div><i /><i /><i /></div>
            <span>new-message.tsx</span>
            <b>01</b>
          </div>

          <label>
            <span>Name</span>
            <input
              type="text"
              autoComplete="name"
              placeholder="Your name"
              aria-invalid={Boolean(errors.name)}
              {...register("name", { required: "Please enter your name", minLength: { value: 2, message: "Use at least 2 characters" } })}
            />
            {errors.name && <small role="alert">{errors.name.message}</small>}
          </label>

          <label>
            <span>Email</span>
            <input
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              aria-invalid={Boolean(errors.email)}
              {...register("email", {
                required: "Please enter your email",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" },
              })}
            />
            {errors.email && <small role="alert">{errors.email.message}</small>}
          </label>

          <label>
            <span>Message</span>
            <textarea
              rows="5"
              placeholder="Tell me what you are building or hiring for..."
              aria-invalid={Boolean(errors.message)}
              {...register("message", { required: "Please add a short message", minLength: { value: 12, message: "Add a little more detail" } })}
            />
            {errors.message && <small role="alert">{errors.message.message}</small>}
          </label>

          <button type="submit" disabled={isSubmitting}>
            <Send size={18} /> {submitted ? "Open email client" : "Send message"}
          </button>
          <p className={styles.formNote}>Submitting opens your email app with the message prepared.</p>
        </motion.form>
      </div>

      <div className={styles.footerLine}>
        <span>Copyright {new Date().getFullYear()} Ayushmaan Mishra</span>
        <a href="#home">Back to top <ArrowUpRight size={15} /></a>
      </div>
    </footer>
  );
};

export default Contact;
