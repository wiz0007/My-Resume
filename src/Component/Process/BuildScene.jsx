import { createElement } from "react";
import { motion } from "framer-motion";
import { Check, Circle } from "lucide-react";
import { buildSlices, processScenes } from "./processSteps";
import SpatialSurface from "./SpatialSurface";
import styles from "./Process.module.scss";

const scene = processScenes[2];

const BuildScene = () => (
  <section className={`${styles.scene} ${styles.buildScene}`}>
    <motion.div
      className={styles.sceneCopy}
      initial={{ opacity: 0, x: -34 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.sceneLabel}>
        {createElement(scene.icon, { size: 17 })}
        <span>{scene.label}</span>
      </div>
      <h3>{scene.title}</h3>
      <p>{scene.text}</p>
      <div className={styles.tags}>
        {scene.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, x: 34 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      <SpatialSurface className={`${styles.spatialStage} ${styles.buildStage}`}>
        <div className={styles.buildBrowser}>
          <div className={styles.browserBar}>
            <span /><span /><span />
            <small>working slice</small>
          </div>
          <div className={styles.browserCanvas}>
            <div className={styles.browserSidebar} />
            <div className={styles.browserContent}>
              <i /><i /><i />
              <div />
            </div>
          </div>
        </div>

        <div className={styles.buildTerminal}>
          <span>integration.status</span>
          <strong><Check size={15} /> passing</strong>
          <code>ui → api → data</code>
        </div>

        <div className={styles.buildRail}>
          {buildSlices.map(({ label, value, icon }) => (
            <div key={label} className={styles.buildRailItem}>
              <span>{createElement(icon, { size: 15 })}</span>
              <div><strong>{label}</strong><small>{value}</small></div>
              <Circle size={8} fill="currentColor" />
            </div>
          ))}
        </div>
      </SpatialSurface>
    </motion.div>
  </section>
);

export default BuildScene;
