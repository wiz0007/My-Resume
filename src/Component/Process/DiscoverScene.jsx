import { createElement } from "react";
import { discoverySignals, processScenes } from "./processSteps";
import SpatialSurface from "./SpatialSurface";
import styles from "./Process.module.scss";

const scene = processScenes[0];

const DiscoverScene = () => (
  <SpatialSurface className={`${styles.spatialStage} ${styles.discoveryBoard}`}>
    {/* Embedded Left Narrative */}
    <div className={styles.embeddedCopy}>
      <div className={styles.sceneLabel}>
        {createElement(scene.icon, { size: 17 })}
        <span>{scene.label}</span>
      </div>
      <h3>{scene.title}</h3>
      <p>{scene.text}</p>
      <div className={styles.tags} aria-label="Discovery tags">
        {scene.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>

    {/* Embedded Right 3D Visual Animation */}
    <div className={styles.embeddedVisual} aria-hidden="true">
      <div className={styles.discoveryFocus}>
        <span>problem</span>
        <strong>mapped</strong>
      </div>
      <div className={styles.discoverySweep} />
      <svg className={styles.discoveryConnectors} viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="26" y1="26" x2="50" y2="50" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="74" y1="26" x2="50" y2="50" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="26" y1="74" x2="50" y2="50" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="74" y1="74" x2="50" y2="50" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
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
    </div>
  </SpatialSurface>
);

export default DiscoverScene;
