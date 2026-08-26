import { createElement } from "react";
import { motion } from "framer-motion";
import { architectureLayers, processScenes } from "./processSteps";
import SpatialSurface from "./SpatialSurface";
import styles from "./Process.module.scss";

const scene = processScenes[1];

const ArchitectScene = () => (
  <section className={`${styles.scene} ${styles.architectScene}`}>
    <motion.div
      className={styles.sceneVisual}
      initial={{ opacity: 0, x: -36 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      <SpatialSurface className={`${styles.spatialStage} ${styles.architectureStage}`}>
        <div className={styles.architectureBeam} />
        <div className={styles.architectureAxis} />
        <div className={styles.architectureStack}>
          {architectureLayers.map(({ label, detail, icon }, index) => (
            <motion.div
              key={label}
              className={styles.architectureLayer}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
            >
              <div>{createElement(icon, { size: 17 })}</div>
              <span>{label}</span>
              <small>{detail}</small>
            </motion.div>
          ))}
        </div>
      </SpatialSurface>
    </motion.div>

    <motion.div
      className={styles.sceneCopy}
      initial={{ opacity: 0, x: 34 }}
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
  </section>
);

export default ArchitectScene;
