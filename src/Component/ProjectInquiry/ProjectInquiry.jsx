import { createElement } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Braces,
  Boxes,
  Database,
  Layers3,
  Mail,
  MessageSquareMore,
} from "lucide-react";
import styles from "./ProjectInquiry.module.scss";

const orbitItems = [
  { label: "Interfaces", icon: Layers3, className: styles.orbitItemOne },
  { label: "Full-stack", icon: Boxes, className: styles.orbitItemTwo },
  { label: "APIs", icon: Braces, className: styles.orbitItemThree },
  { label: "Data", icon: Database, className: styles.orbitItemFour },
];

const ProjectInquiry = () => (
  <section className={styles.inquiry} aria-label="Project enquiries">
    <div className={styles.shell}>
      <div className={styles.copy}>
        <span className={styles.eyebrow}>Available for selected project work</span>
        <p className={styles.lead}>Have a product, platform, or web experience in mind?</p>

        <div className={styles.offerRow} aria-label="Project capabilities">
          <span>Product UI</span>
          <span>Full-stack apps</span>
          <span>Dashboards</span>
          <span>Interactive web</span>
        </div>

        <div className={styles.actions}>
          <Link to="/contact">
            Discuss a project <ArrowUpRight size={17} />
          </Link>
          <a href="mailto:ayush8171wiz@gmail.com">
            <Mail size={16} /> Email
          </a>
        </div>
      </div>

      <div className={styles.spatialBoard} aria-hidden="true">
        <div className={styles.gridPlane} />
        <span className={`${styles.ring} ${styles.ringOne}`} />
        <span className={`${styles.ring} ${styles.ringTwo}`} />
        <span className={`${styles.ring} ${styles.ringThree}`} />

        <div className={styles.centerCard}>
          <span className={styles.availability}><i /> Open</span>
          <MessageSquareMore size={26} />
          <strong>Let&apos;s build</strong>
          <small>Design + engineering</small>
        </div>

        {orbitItems.map(({ label, icon: Icon, className }) => (
          <span key={label} className={`${styles.orbitItem} ${className}`}>
            {createElement(Icon, { size: 15 })} {label}
          </span>
        ))}

        <span className={`${styles.techPlate} ${styles.techPlateOne}`}>React / TypeScript</span>
        <span className={`${styles.techPlate} ${styles.techPlateTwo}`}>Node / APIs</span>
        <span className={`${styles.techPlate} ${styles.techPlateThree}`}>Motion / 3D</span>
      </div>
    </div>
  </section>
);

export default ProjectInquiry;
