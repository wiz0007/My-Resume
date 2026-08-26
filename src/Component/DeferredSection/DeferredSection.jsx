import React from "react";
import styles from "./DeferredSection.module.scss";

const DeferredSection = ({ children, minHeight = "60svh" }) => (
  <div
    className={styles.deferred}
    style={{ "--deferred-section-height": minHeight }}
  >
    {children}
  </div>
);

export default DeferredSection;
