import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SpatialSurface from "./SpatialSurface";
import styles from "./Process.module.scss";

const nodes = [
  { label: "Brief", className: styles.overviewNodeBrief },
  { label: "Flow", className: styles.overviewNodeFlow },
  { label: "API", className: styles.overviewNodeApi },
  { label: "Data", className: styles.overviewNodeData },
  { label: "Release", className: styles.overviewNodeRelease },
];

const ProcessOverview = () => (
  <section className={styles.overview} aria-labelledby="process-overview-title">
    <motion.div
      className={styles.overviewCopy}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className={styles.kicker}>Process</span>
      <h2 id="process-overview-title">A build is a connected system.</h2>
      <p>
        I move from product decisions to implementation without treating the interface, API and data as separate problems.
      </p>
      <div className={styles.overviewRoute} aria-hidden="true">
        <span>Think</span>
        <ArrowRight size={15} />
        <span>Shape</span>
        <ArrowRight size={15} />
        <span>Ship</span>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 36 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <SpatialSurface className={styles.overviewScene}>
        <div className={styles.overviewGrid} />
        <div className={styles.overviewOrbit} />
        <div className={styles.overviewLineOne} />
        <div className={styles.overviewLineTwo} />

        {nodes.map((node) => (
          <div key={node.label} className={`${styles.overviewNode} ${node.className}`}>
            <span>{node.label}</span>
          </div>
        ))}

        <div className={styles.overviewCore}>
          <CheckCircle2 size={19} />
          <span>working system</span>
        </div>
      </SpatialSurface>
    </motion.div>
  </section>
);

export default ProcessOverview;
