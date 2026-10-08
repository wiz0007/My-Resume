import { createElement } from "react";
import { Check, Circle } from "lucide-react";
import { buildSlices, processScenes } from "./processSteps";
import SpatialSurface from "./SpatialSurface";
import styles from "./Process.module.scss";

const scene = processScenes[2];

const BuildScene = () => (
  <SpatialSurface className={`${styles.spatialStage} ${styles.buildStage}`}>
    {/* Embedded Left Narrative */}
    <div className={styles.embeddedCopy}>
      <div className={styles.sceneLabel}>
        {createElement(scene.icon, { size: 17 })}
        <span>{scene.label}</span>
      </div>
      <h3>{scene.title}</h3>
      <p>{scene.text}</p>
      <div className={styles.tags} aria-label="Build tags">
        {scene.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>

    {/* Embedded Right 3D Visual Animation */}
    <div className={styles.embeddedVisual} aria-hidden="true">
      <div className={styles.buildBrowser}>
        <div className={styles.browserBar}>
          <span />
          <span />
          <span />
          <small>working slice</small>
        </div>
        <div className={styles.browserCanvas}>
          <div className={styles.browserSidebar} />
          <div className={styles.browserContent}>
            <i />
            <i />
            <i />
            <div />
          </div>
        </div>
      </div>

      <div className={styles.buildTerminal}>
        <span>integration.status</span>
        <strong>
          <Check size={15} /> passing
        </strong>
        <code>ui → api → data</code>
      </div>

      <div className={styles.buildRail}>
        {buildSlices.map(({ label, value, icon }) => (
          <div key={label} className={styles.buildRailItem}>
            <span>{createElement(icon, { size: 15 })}</span>
            <div>
              <strong>{label}</strong>
              <small>{value}</small>
            </div>
            <Circle size={8} fill="currentColor" />
          </div>
        ))}
      </div>
    </div>
  </SpatialSurface>
);

export default BuildScene;
