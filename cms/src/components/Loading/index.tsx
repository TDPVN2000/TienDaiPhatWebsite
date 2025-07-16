import { Spin } from "antd";
import React from "react";
import styles from "./styles.module.scss";

export default function Loading() {
  return (
    <div className={styles.loading}>
      <Spin size="large" />
    </div>
  );
}
