import { createElement } from "react";
import { CheckCircle2 } from "lucide-react";
import { processScenes, qualityChecks } from "./processSteps";
import SpatialSurface from "./SpatialSurface";
import styles from "./Process.module.scss";

const scene = processScenes[3];

const ImproveScene = () => (
  <SpatialSurface className={`${styles.spatialStage} ${styles.qualityStage}`}>
    {/* Embedded Left Narrative */}
    <div className={styles.embeddedCopy}>
      <div className={styles.sceneLabel}>
        {createElement(scene.icon, { size: 17 })}
        <span>{scene.label}</span>
      </div>
      <h3>{scene.title}</h3>
      <p>{scene.text}</p>
      <div className={styles.tags} aria-label="Improve tags">
        {scene.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>

    {/* Embedded Right 3D Visual Animation */}
    <div className={styles.embeddedVisual} aria-hidden="true">
      <div className={styles.qualityRingOne} />
      <div className={styles.qualityRingTwo} />
      <div className={styles.qualityCore}>
        <CheckCircle2 size={24} />
        <span>release</span>
        <strong>ready</strong>
      </div>

      {qualityChecks.map(({ label, icon }, index) => (
        <div
          key={label}
          className={`${styles.qualityNode} ${styles[`qualityNode${index + 1}`]}`}
        >
          {createElement(icon, { size: 17 })}
          <span>{label}</span>
        </div>
      ))}
    </div>
  </SpatialSurface>
);

export default ImproveScene;
