import React, { ReactNode } from "react";
import styles from "./styles.module.scss";

interface IProps {
  label: string;
  children: ReactNode;
}

function TitleSearch({ label, children }: IProps) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      {children}
    </div>
  );
}

export default TitleSearch;
