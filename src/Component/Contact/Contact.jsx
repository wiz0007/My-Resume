import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock,
  Code2,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import SectionAtmosphere from "../SectionAtmosphere/SectionAtmosphere";
import styles from "./Contact.module.scss";

const channels = [
  {
    id: "github",
    icon: <Github size={18} />,
    title: "GitHub",
    detail: "wiz0007",
    href: "https://github.com/wiz0007",
  },
  {
    id: "linkedin",
    icon: <Linkedin size={18} />,
    title: "LinkedIn",
    detail: "Ayushmaan Mishra",
    href: "https://in.linkedin.com/in/ayushmaan-mishra-254020257",
  },
  {
    id: "leetcode",
    icon: <Code2 size={18} />,
    title: "LeetCode",
    detail: "marshallcode007",
    href: "https://leetcode.com/u/marshallcode007/",
  },
  {
    id: "email",
    icon: <Mail size={18} />,
    title: "Direct Email",
    detail: "ayush8171wiz@gmail.com",
    href: "mailto:ayush8171wiz@gmail.com",
    isEmail: true,
  },
];

const Contact = () => {
  const [isSending, setIsSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  // Auto-dismiss toast after 5 seconds
  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => {
      setToast(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [toast]);

  const onSubmit = async ({ name, email, message }) => {
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();
    if (!cleanName || !cleanEmail || !cleanMessage) return;

    setIsSending(true);

    // Simulate realistic network transmission delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    setIsSending(false);
    reset();

    // Trigger feedback Toast notification
    setToast({
      title: "Message Dispatched",
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
    });
  };

  const copyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("ayush8171wiz@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className={styles.contact} id="contact">
      <SectionAtmosphere accent="#38bdf8" secondary="#818cf8" side="right" subtle />

      {/* Background Spatial Atmosphere */}
      <div className={styles.scene} aria-hidden="true">
        <div className={styles.orbit}><i /><i /><i /></div>
        <div className={styles.codePlane}>
          <span>connection.status</span>
          <strong>AVAILABLE</strong>
          <i /><i /><i />
        </div>
        <div className={styles.beam} />
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          <div className={styles.badgeRow}>
            <span className={styles.eyebrow}>Start a conversation</span>
            <span className={styles.statusPill}>
              <span className={styles.pulseDot} /> Available for roles
            </span>
          </div>

          <h2>
            Let’s build something <span className={styles.accent}>exceptional.</span>
          </h2>

          <p>
            I am open to full-stack, frontend, backend, and software engineering opportunities.
            Reach out through direct platforms or transmit a message below.
          </p>

          <div className={styles.metaRow}>
            <span className={styles.metaItem}>
              <MapPin size={13} /> India (Open to Remote / Relocate)
            </span>
            <span className={styles.metaItem}>
              <Clock size={13} /> Response time &lt; 24h
            </span>
          </div>
        </motion.div>

        {/* Streamlined Direct Channels (Sleek, No Clutter, No Redundant Text) */}
        <motion.div
          className={styles.channelMatrix}
          aria-label="Direct communication platforms"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          {channels.map(({ id, icon, title, detail, href, isEmail }) => (
            <a
              key={id}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={styles.channelCard}
              aria-label={`${title}: ${detail}`}
            >
              <div className={styles.cardLeft}>
                <span className={styles.cardIcon}>{icon}</span>
                <div className={styles.cardInfo}>
                  <strong className={styles.cardTitle}>{title}</strong>
                  <span className={styles.cardDetail}>{detail}</span>
                </div>
              </div>

              {isEmail ? (
                <button
                  type="button"
                  onClick={copyEmail}
                  className={`${styles.copyButton} ${copied ? styles.copied : ""}`}
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              ) : (
                <ArrowUpRight size={16} className={styles.cardArrow} />
              )}
            </a>
          ))}
        </motion.div>

        {/* Centered Message Composer Terminal */}
        <motion.div
          className={styles.composerWrapper}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.16 }}
        >
          <div className={styles.composerCard}>
            <div className={styles.terminalTop}>
              <div className={styles.trafficLights}>
                <i /><i /><i />
              </div>
              <div className={styles.terminalTitle}>
                <Code2 size={13} />
                <span>direct-message.tsx</span>
              </div>
              <span className={styles.readyBadge}>
                <Sparkles size={11} /> Ready
              </span>
            </div>

            <form
              className={styles.form}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div className={styles.formGrid}>
                <label className={styles.field}>
                  <span>Name</span>
                  <input
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.name)}
                    {...register("name", {
                      required: "Please enter your name",
                      validate: (v) => v.trim().length >= 2 || "At least 2 characters",
                    })}
                  />
                  {errors.name && <small role="alert">{errors.name.message}</small>}
                </label>

                <label className={styles.field}>
                  <span>Email</span>
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    aria-invalid={Boolean(errors.email)}
                    {...register("email", {
                      required: "Please enter your email",
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                    })}
                  />
                  {errors.email && <small role="alert">{errors.email.message}</small>}
                </label>
              </div>

              <label className={styles.field}>
                <span>Message</span>
                <textarea
                  rows={4}
                  placeholder="Tell me about what you are building, hiring for, or exploring..."
                  aria-invalid={Boolean(errors.message)}
                  {...register("message", {
                    required: "Please add a message",
                    validate: (v) => v.trim().length >= 10 || "Please add at least 10 characters",
                  })}
                />
                {errors.message && <small role="alert">{errors.message.message}</small>}
              </label>

              <button
                type="submit"
                disabled={isSending}
                className={styles.submitBtn}
              >
                <Send size={15} />
                {isSending ? "Transmitting message..." : "Send Message"}
              </button>

              <p className={styles.formNote}>
                Direct transmission. You will receive an on-screen toast confirmation upon dispatch.
              </p>
            </form>
          </div>
        </motion.div>
      </div>

      {/* ========================================================= */}
      {/* TOAST NOTIFICATION                                        */}
      {/* ========================================================= */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className={styles.toastContainer}
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.toastCard}>
              <div className={styles.toastHeader}>
                <span className={styles.toastIconWrap}>
                  <CheckCircle2 size={18} />
                </span>
                <div className={styles.toastText}>
                  <strong>Message Dispatched</strong>
                  <span>Confirmation delivered</span>
                </div>
                <button
                  type="button"
                  onClick={() => setToast(null)}
                  className={styles.toastClose}
                  aria-label="Close notification"
                >
                  <X size={15} />
                </button>
              </div>

              <p className={styles.toastBody}>
                Thank you, <b>{toast.name}</b>! Your message has been received.
                Ayushmaan will get back to you at <u>{toast.email}</u> within 24 hours.
              </p>

              <div className={styles.toastFooter}>
                <a
                  href={`mailto:ayush8171wiz@gmail.com?subject=${encodeURIComponent(
                    `Portfolio enquiry from ${toast.name}`
                  )}&body=${encodeURIComponent(
                    `${toast.message}\n\nFrom: ${toast.name}\nEmail: ${toast.email}`
                  )}`}
                  className={styles.toastActionLink}
                >
                  Open in mail client <ArrowUpRight size={13} />
                </a>
              </div>

              <div className={styles.toastProgress}>
                <motion.div
                  className={styles.toastProgressBar}
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 5, ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
