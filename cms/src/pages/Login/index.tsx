import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";

import { commonValidate } from "constants/ruleForm";
import { Navigate, useNavigate } from "react-router-dom";
import { useLogin } from "utils/helper/authentication";
import storage from "utils/helper/storage";
import styles from "./styles.module.scss";
import { IconLock, IconSms, LogoApp } from "assets/icon";
import LabelInput from "components/LabelInput";

export default function Login() {
  const isAuthenticated = !!storage.getToken();
  const { t } = useTranslation();
  const { login, loadingLogin } = useLogin();
  const navigate = useNavigate();

  const handleLogin = (payload: any) => {
    if (!loadingLogin) {
      login({
        email: payload?.email,
        password: payload?.password,
      });
    }
  };
  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.logoWrap}>
          <LogoApp className={styles.logoApp} />
        </span>
        {/* <span className={styles.cssTitleLogin}>{t("common.webName")}</span> */}
      </div>
      <div className={styles.login}>
        <div className={styles.form}>
          <span className={styles.title}>{t("common.login")}</span>
          <Form
            layout="vertical"
            labelAlign="left"
            onFinish={handleLogin}
            className={styles.bodyFormLogin}
            validateTrigger="onChange"
          >
            <LabelInput title={t("common.email")} />
            <Form.Item
              name="email"
              validateFirst
              rules={[commonValidate.required, commonValidate.email]}
            >
              <Input
                className="input"
                prefix={<IconSms />}
                placeholder={t("placeholders.email")}
                maxLength={255}
              />
            </Form.Item>

            <LabelInput title={t("common.password")} />
            <Form.Item
              name="password"
              validateFirst
              required
              rules={[commonValidate.required, commonValidate.password]}
              className="mb-0"
            >
              <Input.Password
                className="input"
                size="middle"
                maxLength={32}
                placeholder={t("placeholders.passwordLogin")}
                prefix={<IconLock />}
              />
            </Form.Item>
            <div className={styles.btnNoneRound}>
              <div />
              <Button
                onClick={() => navigate(`/forgot-password-get-code`)}
                loading={false}
              >
                {"Forgot your password?"}
              </Button>
            </div>
            <Button
              htmlType="submit"
              type="primary"
              block
              className="button linear"
            >
              {t("common.login")}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
