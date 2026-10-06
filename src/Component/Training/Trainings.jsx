import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  ExternalLink,
  X,
  CheckCircle2,
  FileCheck,
  Code2,
  Shield,
  Layers,
  BookOpen,
} from "lucide-react";
import SectionAtmosphere from "../SectionAtmosphere/SectionAtmosphere";
import styles from "./Trainings.module.scss";

const CERTIFICATES = [
  {
    id: "web-dev",
    title: "Web Development Training",
    issuer: "Internshala Trainings",
    accent: "#38bdf8",
    icon: Code2,
    skills: ["HTML5 / CSS3", "JavaScript", "React", "REST APIs", "DBMS"],
    file: "/certificates/Web_Development.pdf",
  },
  {
    id: "python",
    title: "Programming with Python",
    issuer: "Internshala Trainings",
    accent: "#38bdf8",
    icon: Award,
    skills: ["OOP", "Data Structures", "APIs", "PyQt", "Automation"],
    file: "/certificates/Python.pdf",
  },
  {
    id: "java",
    title: "Core Java Specialization",
    issuer: "Internshala Trainings",
    accent: "#38bdf8",
    icon: Layers,
    skills: ["Core Java", "Collections Framework", "Multithreading", "OOP Design"],
    file: "/certificates/Java.pdf",
  },
  {
    id: "cpp",
    title: "Programming with C & C++",
    issuer: "Internshala Trainings",
    accent: "#38bdf8",
    icon: Code2,
    skills: ["Memory Management", "Pointers", "Data Structures", "Algorithms"],
    file: "/certificates/C_CPP.pdf",
  },
  {
    id: "ethical-hacking",
    title: "Ethical Hacking & Cyber Security",
    issuer: "Internshala Trainings",
    accent: "#38bdf8",
    icon: Shield,
    skills: ["Network Security", "Vulnerability Assessment", "OWASP", "Pen-testing"],
    file: "/certificates/Ethical_Hacking.pdf",
  },
  {
    id: "matlab",
    title: "MATLAB® Scientific Computing",
    issuer: "Internshala Trainings",
    accent: "#38bdf8",
    icon: BookOpen,
    skills: ["Numerical Computing", "Matrix Analysis", "Algorithm Prototyping", "Data Modeling"],
    file: "/certificates/MATLAB_Training.pdf",
  },
];

const Trainings = () => {
  const [openPDF, setOpenPDF] = useState(null);

  const closeModal = useCallback(() => setOpenPDF(null), []);

  // Keyboard Escape and body scroll lock while modal is open
  useEffect(() => {
    if (!openPDF) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (window.lenis) {
      window.lenis.stop();
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      if (window.lenis) {
        window.lenis.start();
      }
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openPDF, closeModal]);

  return (
    <section className={styles.trainings} id="certificates">
      <SectionAtmosphere accent="#38bdf8" secondary="#818cf8" side="left" subtle />

      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerTitleGroup}>
            <span className={styles.categoryLabel}>Credentials</span>
            <h2 className={styles.sectionHeading}>
              Verified <span className={styles.accent}>Certifications</span>
            </h2>
            <p className={styles.subtitle}>
              Specialized industry trainings and formal capability assessments.
            </p>
          </div>
        </header>

        {/* Compact Credential Matrix */}
        <div className={styles.compactList}>
          {CERTIFICATES.map((cert) => {
            const Icon = cert.icon;
            return (
              <article
                key={cert.id}
                className={styles.compactRow}
                style={{ "--row-accent": cert.accent }}
              >
                <div className={styles.compactLeft}>
                  <div className={styles.compactIconWrap}>
                    <Icon size={18} className={styles.compactIcon} />
                  </div>
                  <div className={styles.compactTitleGroup}>
                    <div className={styles.compactTopLine}>
                      <h3 className={styles.compactTitle}>{cert.title}</h3>
                      <span className={styles.compactIssuerBadge}>{cert.issuer}</span>
                    </div>
                    <div className={styles.compactSkills}>
                      {cert.skills.map((s) => (
                        <span key={s} className={styles.compactSkillPill}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.compactRight}>
                  <span className={styles.verifiedTag}>
                    <CheckCircle2 size={12} />
                    <span>Verified</span>
                  </span>

                  <div className={styles.compactActions}>
                    <button
                      type="button"
                      onClick={() => setOpenPDF(cert)}
                      className={styles.compactActionBtn}
                      aria-label={`View ${cert.title} Certificate`}
                      title="View Certificate"
                    >
                      <FileCheck size={14} />
                      <span className={styles.btnText}>View</span>
                    </button>

                    <a
                      href={cert.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.compactExternalBtn}
                      aria-label={`Open ${cert.title} in new tab`}
                      title="Open in new tab"
                    >
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* ================= TRUE PORTAL-BASED FULLSCREEN MODAL VIEWER ================= */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {openPDF && (
              <motion.div
                className={styles.modalOverlay}
                onClick={closeModal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                role="dialog"
                aria-modal="true"
                aria-label={`${openPDF.title} Certificate Viewer`}
              >
                <motion.div
                  className={styles.modalContent}
                  onClick={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.96 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Modal Header Bar - Fixed Top Right Controls */}
                  <div className={styles.modalHeader}>
                    <div className={styles.modalTitleGroup}>
                      <Award size={18} className={styles.modalAwardIcon} />
                      <div className={styles.modalTitleTextWrap}>
                        <h4>{openPDF.title}</h4>
                        <span className={styles.modalIssuerBadge}>{openPDF.issuer}</span>
                      </div>
                    </div>

                    <div className={styles.modalHeaderActions}>
                      <a
                        href={openPDF.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.modalExternalBtn}
                        aria-label="Open Certificate in New Tab"
                        title="Open in New Tab"
                      >
                        <ExternalLink size={15} />
                        <span className={styles.externalBtnText}>Open in New Tab</span>
                      </a>

                      <button
                        type="button"
                        onClick={closeModal}
                        className={styles.modalCloseBtn}
                        aria-label="Close certificate viewer"
                        title="Close Viewer"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Responsive PDF Viewer Frame (Full Height, No Double Scroll) */}
                  <div className={styles.iframeContainer}>
                    <iframe
                      src={`${openPDF.file}#view=FitH`}
                      title={`${openPDF.title} Certificate`}
                      className={styles.pdfIframe}
                    />
                  </div>

                  {/* Modal Footer with Verification & Direct Download */}
                  <div className={styles.modalFooter}>
                    <div className={styles.modalFooterMeta}>
                      <span className={styles.modalFooterTag}>
                        <CheckCircle2 size={13} />
                        <span>Verified Credential</span>
                      </span>
                      <span className={styles.modalFooterIssuer}>
                        {openPDF.issuer} • Issued to Ayushmaan Mishra
                      </span>
                    </div>

                    <div className={styles.modalFooterActions}>
                      <a
                        href={openPDF.file}
                        download={`${openPDF.title.replace(/[\s&/]+/g, '_')}_Certificate.pdf`}
                        className={styles.modalDownloadBtn}
                      >
                        Download PDF
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};

export default Trainings;
