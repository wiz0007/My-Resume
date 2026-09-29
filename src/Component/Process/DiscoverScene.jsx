import { createElement } from "react";
import { discoverySignals, processScenes } from "./processSteps";
import SpatialSurface from "./SpatialSurface";
import styles from "./Process.module.scss";

const scene = processScenes[0];

const DiscoverScene = () => (
  <section className={`${styles.scene} ${styles.discoverScene}`}>
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

    <div className={styles.sceneVisual}>
      <SpatialSurface className={`${styles.spatialStage} ${styles.discoveryBoard}`}>
        <div className={styles.discoveryFocus}>
          <span>problem</span>
          <strong>mapped</strong>
        </div>
        <div className={styles.discoverySweep} />
        {discoverySignals.map(({ label, value, icon }, index) => (
          <div
            key={label}
            className={`${styles.discoveryCard} ${styles[`discoveryCard${index + 1}`]}`}
          >
            <div>{createElement(icon, { size: 17 })}</div>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </SpatialSurface>
    </div>
  </section>
);

export default DiscoverScene;
