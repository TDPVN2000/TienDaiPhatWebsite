import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";

import { commonValidate } from "constants/ruleForm";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { IconLock, LogoApp } from "assets/icon";
import LabelInput from "components/LabelInput";
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordApi } from "api/auth";
import { ESessionlStorageKey } from "constants/enums";
import CustomNotification from "components/CustomNotification";
import { handleErrorMessage } from "utils/helper";
import Loading from "components/Loading";

export default function NewPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const emailGetOtp = sessionStorage.getItem(ESessionlStorageKey.MAIL_GET_CODE);
  const codeOtp = sessionStorage.getItem(ESessionlStorageKey.CODE_OTP);

  const onSettingNewPassword = async (payload: any) => {
    await forgotPasswordApi({
      ...payload,
      code: codeOtp,
      email: emailGetOtp,
    });
  };

  const { mutate: settingNewPassword, isLoading: loadingNewPassword } =
    useMutation(onSettingNewPassword, {
      onSuccess: (data: any) => {
        CustomNotification({
          type: "success",
          message: t("notification.success"),
        });
        navigate(`/`);
      },
      onError: (err: any) => {
        handleErrorMessage(err);
      },
    });

  return (
    <div className={styles.container}>
      {loadingNewPassword && <Loading />}
      <div className={styles.header}>
        <span className={styles.logoWrap}>
          <LogoApp className={styles.logoApp} />
        </span>
        {/* <span className={styles.cssTitleLogin}>{t("common.webName")}</span> */}
      </div>
      <div className={styles.login}>
        <div className={styles.form}>
          <span className={styles.title}>{t("パスワード再発行")}</span>
          <Form
            layout="vertical"
            labelAlign="left"
            onFinish={settingNewPassword}
            className={styles.bodyFormLogin}
            validateTrigger="onChange"
          >
            <LabelInput title={t("新しいパスワード")} />
            <Form.Item
              name="new_password"
              validateFirst
              required
              rules={[commonValidate.required, commonValidate.password]}
            >
              <Input.Password
                className="input"
                size="middle"
                maxLength={32}
                placeholder={t("新しいパスワードを入力")}
                prefix={<IconLock />}
              />
            </Form.Item>

            <LabelInput title={t("新しいパスワードを再入力")} />
            <Form.Item
              name="new_password_confirmation"
              validateFirst
              required
              rules={[commonValidate.required, commonValidate.password]}
              className="mb-32"
            >
              <Input.Password
                className="input"
                size="middle"
                maxLength={32}
                placeholder={t("新しいパスワードを再入力")}
                prefix={<IconLock />}
              />
            </Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              block
              className="button linear"
            >
              {t("変更")}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
