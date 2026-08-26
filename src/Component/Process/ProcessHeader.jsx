import React from "react";
import { motion } from "framer-motion";
import ProcessIllustration from "./ProcessIllustration";
import styles from "./Process.module.scss";

const ProcessHeader = () => (
  <motion.header
    className={styles.header}
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
  >
    <span>Process</span>
    <h2>How I move an idea from brief to shipped software.</h2>
    <p>
      A portfolio should prove judgment, not only tools. This is the working style behind the projects.
    </p>
    <ProcessIllustration />
  </motion.header>
);

export default ProcessHeader;
