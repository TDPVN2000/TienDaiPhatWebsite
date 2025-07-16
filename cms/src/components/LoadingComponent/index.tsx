import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import styles from "./styles.module.scss";

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

interface IProps {
  height?: number;
}

function LoadingComponent({ height = 200 }: IProps) {
  return (
    <div className={styles.container} style={{ height }}>
      <Spin indicator={antIcon} />
    </div>
  );
}

export default LoadingComponent;
