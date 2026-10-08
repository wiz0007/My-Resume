import { createElement } from "react";
import { architectureLayers, processScenes } from "./processSteps";
import SpatialSurface from "./SpatialSurface";
import styles from "./Process.module.scss";

const scene = processScenes[1];

const ArchitectScene = () => (
  <SpatialSurface className={`${styles.spatialStage} ${styles.architectureStage}`}>
    {/* Embedded Left Narrative */}
    <div className={styles.embeddedCopy}>
      <div className={styles.sceneLabel}>
        {createElement(scene.icon, { size: 17 })}
        <span>{scene.label}</span>
      </div>
      <h3>{scene.title}</h3>
      <p>{scene.text}</p>
      <div className={styles.tags} aria-label="Architecture tags">
        {scene.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>

    {/* Embedded Right 3D Visual Animation */}
    <div className={styles.embeddedVisual} aria-hidden="true">
      <div className={styles.architectureBeam} />
      <div className={styles.architectureAxis} />
      <div className={styles.architectureStack}>
        {architectureLayers.map(({ label, detail, icon }) => (
          <div key={label} className={styles.architectureLayer}>
            <div>{createElement(icon, { size: 17 })}</div>
            <span>{label}</span>
            <small>{detail}</small>
          </div>
        ))}
      </div>
    </div>
  </SpatialSurface>
);

export default ArchitectScene;
