import React from "react";
import styles from "./SectionAtmosphere.module.scss";

const particleSeeds = [
  [7, 16, 2, 0], [14, 72, 3, 4], [21, 38, 2, 7], [28, 84, 4, 2],
  [36, 10, 2, 9], [43, 58, 3, 5], [50, 27, 2, 1], [57, 91, 3, 8],
  [64, 44, 2, 3], [71, 17, 4, 6], [78, 68, 2, 10], [85, 34, 3, 2],
  [92, 79, 2, 7], [11, 48, 2, 11], [25, 22, 3, 5], [39, 76, 2, 9],
  [54, 52, 3, 1], [68, 88, 2, 4], [82, 8, 3, 8], [95, 55, 2, 6],
];

const SectionAtmosphere = ({ accent = "#22d3ee", secondary = "#8b5cf6", side = "right", subtle = false }) => (
  <div
    className={`${styles.atmosphere} ${styles[side]} ${subtle ? styles.subtle : ""}`}
    style={{ "--ambient-accent": accent, "--ambient-secondary": secondary }}
    aria-hidden="true"
  >
    <div className={styles.particles}>
      {particleSeeds.map(([x, y, size, delay], index) => (
        <i
          key={`${x}-${y}`}
          style={{
            "--particle-x": `${x}%`,
            "--particle-y": `${y}%`,
            "--particle-size": `${size}px`,
            "--particle-delay": `${delay * -0.7}s`,
            "--particle-duration": `${10 + (index % 5) * 2}s`,
          }}
        />
      ))}
    </div>

    <div className={styles.orbit}>
      <span /><span /><span />
      <b /><b />
    </div>

    <div className={styles.perspectiveGrid} />
    <div className={styles.horizon} />
  </div>
);

export default SectionAtmosphere;