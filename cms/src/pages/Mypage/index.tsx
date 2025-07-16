import { Form } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export default function MyPage() {
  const [form] = Form.useForm();
  const [t] = useTranslation();

  return (
    <div>
      <div className={styles.change_password}>aaaaaaaa</div>
    </div>
  );
}
