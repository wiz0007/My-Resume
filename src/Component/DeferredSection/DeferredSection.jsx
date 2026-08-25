import React, { useRef } from "react";
import { useNearViewport } from "../../hooks/useNearViewport";
import styles from "./DeferredSection.module.scss";

const DeferredSection = ({ children, minHeight = "60svh", rootMargin = "700px 0px" }) => {
  const ref = useRef(null);
  const shouldMount = useNearViewport(ref, { rootMargin, once: true });

  return (
    <div ref={ref} className={styles.deferred} style={{ minHeight: shouldMount ? undefined : minHeight }}>
      {shouldMount ? children : <div className={styles.placeholder} aria-hidden="true" />}
    </div>
  );
};

export default DeferredSection;
