import { createElement } from "react";
import { motion } from "framer-motion";
import { discoverySignals, processScenes } from "./processSteps";
import SpatialSurface from "./SpatialSurface";
import styles from "./Process.module.scss";

const scene = processScenes[0];

const DiscoverScene = () => (
  <section className={`${styles.scene} ${styles.discoverScene}`}>
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
      <SpatialSurface className={`${styles.spatialStage} ${styles.discoveryBoard}`}>
        <div className={styles.discoveryFocus}>
          <span>problem</span>
          <strong>mapped</strong>
        </div>
        <div className={styles.discoverySweep} />
        {discoverySignals.map(({ label, value, icon }, index) => (
          <motion.div
            key={label}
            className={`${styles.discoveryCard} ${styles[`discoveryCard${index + 1}`]}`}
            initial={{ opacity: 0, y: 30, rotateX: -8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
          >
            <div>{createElement(icon, { size: 17 })}</div>
            <span>{label}</span>
            <strong>{value}</strong>
          </motion.div>
        ))}
      </SpatialSurface>
    </motion.div>
  </section>
);

export default DiscoverScene;
