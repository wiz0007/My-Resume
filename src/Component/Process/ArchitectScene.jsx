import { createElement } from "react";
import { architectureLayers, processScenes } from "./processSteps";
import SpatialSurface from "./SpatialSurface";
import styles from "./Process.module.scss";

const scene = processScenes[1];

const ArchitectScene = () => (
  <section className={`${styles.scene} ${styles.architectScene}`}>
    <div className={styles.sceneVisual}>
      <SpatialSurface className={`${styles.spatialStage} ${styles.architectureStage}`}>
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
      </SpatialSurface>
    </div>

    <div className={styles.sceneCopy}>
      <div className={styles.sceneLabel}>
        {createElement(scene.icon, { size: 17 })}
        <span>{scene.label}</span>
      </div>
      <h3>{scene.title}</h3>
      <p>{scene.text}</p>
      <div className={styles.tags}>
        {scene.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
    </div>
  </section>
);

export default ArchitectScene;
