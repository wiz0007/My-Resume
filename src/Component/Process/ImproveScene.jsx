import { createElement } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { processScenes, qualityChecks } from "./processSteps";
import SpatialSurface from "./SpatialSurface";
import styles from "./Process.module.scss";

const scene = processScenes[3];

const ImproveScene = () => (
  <section className={`${styles.scene} ${styles.improveScene}`}>
    <motion.div
      className={styles.sceneVisual}
      initial={{ opacity: 0, x: -36 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      <SpatialSurface className={`${styles.spatialStage} ${styles.qualityStage}`}>
        <div className={styles.qualityRingOne} />
        <div className={styles.qualityRingTwo} />
        <div className={styles.qualityCore}>
          <CheckCircle2 size={24} />
          <span>release</span>
          <strong>ready</strong>
        </div>

        {qualityChecks.map(({ label, icon }, index) => (
          <div key={label} className={`${styles.qualityNode} ${styles[`qualityNode${index + 1}`]}`}>
            {createElement(icon, { size: 17 })}
            <span>{label}</span>
          </div>
        ))}
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

export default ImproveScene;
