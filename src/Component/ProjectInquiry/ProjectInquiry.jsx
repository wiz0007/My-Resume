import { createElement } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Braces,
  Boxes,
  Database,
  Layers3,
  Mail,
} from "lucide-react";
import styles from "./ProjectInquiry.module.scss";

const backgroundNodes = [
  { label: "Interfaces", icon: Layers3, className: styles.bgNodeOne },
  { label: "Full-Stack", icon: Boxes, className: styles.bgNodeTwo },
  { label: "APIs & Cloud", icon: Braces, className: styles.bgNodeThree },
  { label: "Data Architecture", icon: Database, className: styles.bgNodeFour },
];

const scopeTags = [
  "Product UI / UX",
  "Full-Stack Apps",
  "Dashboards & Data",
  "Interactive Web",
  "APIs & Systems",
];

const ProjectInquiry = () => (
  <section className={styles.inquiry} aria-label="Project enquiries">
    <div className={styles.bannerShell}>
      {/* 3D Atmospheric Depth Layer */}
      <div className={styles.atmosphericCanvas} aria-hidden="true">
        <div className={styles.bgRadialAura} />
        <div className={styles.bgPerspectivePlane} />
        <div className={`${styles.orbitCircle} ${styles.orbitCircleInner}`} />
        <div className={`${styles.orbitCircle} ${styles.orbitCircleOuter}`} />

        {/* Ambient Peripheral Nodes in Depth */}
        {backgroundNodes.map(({ label, icon: Icon, className }) => (
          <div key={label} className={`${styles.ambientChip} ${className}`}>
            {createElement(Icon, { size: 12, className: styles.ambientIcon })}
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Foreground Centered Content - Compact & High-Impact */}
      <div className={styles.bannerCenterContent}>
        <div className={styles.statusPill}>
          <span className={styles.pulseDot} />
          <span>Available for Selected Engagements</span>
        </div>

        <h2 className={styles.bannerHeadline}>
          Have a product, platform, or web experience in mind?
        </h2>

        <p className={styles.bannerSubhead}>
          Partnering on ambitious web applications, high-performance interfaces, and modern full-stack architectures.
        </p>

        <div className={styles.scopeStrip} aria-label="Core services">
          {scopeTags.map((tag) => (
            <span key={tag} className={styles.scopeTag}>
              {tag}
            </span>
          ))}
        </div>

        <div className={styles.bannerActions}>
          <Link to="/contact" className={styles.primaryAction}>
            <span>Discuss a project</span>
            <ArrowUpRight size={16} />
          </Link>
          <a href="mailto:ayush8171wiz@gmail.com" className={styles.secondaryAction}>
            <Mail size={15} />
            <span>Email directly</span>
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default ProjectInquiry;
