import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { commonValidate } from "constants/ruleForm";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { IconSms, LogoApp } from "assets/icon";
import LabelInput from "components/LabelInput";
import CustomNotification from "components/CustomNotification";
import { handleErrorMessage } from "utils/helper";
import { useMutation } from "@tanstack/react-query";
import { sendCodeForgotPwdApi } from "api/auth";
import Loading from "components/Loading";
import { ESessionlStorageKey } from "constants/enums";

export default function GetCodeOtp() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { mutate: getOtp, isLoading: loadingGetCode } = useMutation(
    sendCodeForgotPwdApi,
    {
      onSuccess: (data: any) => {
        CustomNotification({
          type: "success",
          message: t("notification.success"),
        });
        navigate(`/forgot-password-verify-code`);
        sessionStorage.setItem(
          ESessionlStorageKey.MAIL_GET_CODE,
          form.getFieldValue("email")
        );
      },
      onError: (err: any) => {
        handleErrorMessage(err);
      },
    }
  );

  return (
    <div className={styles.container}>
      {loadingGetCode && <Loading />}
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
            onFinish={getOtp}
            className={styles.bodyFormLogin}
            validateTrigger="onChange"
            form={form}
          >
            <LabelInput title={t("メールアドレス")} isRequired />
            <Form.Item
              name="email"
              validateFirst
              rules={[commonValidate.required, commonValidate.email]}
            >
              <Input
                className="input"
                prefix={<IconSms />}
                placeholder={t("メールアドレス入力")}
                maxLength={255}
              />
            </Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              block
              className="button linear mt-16"
            >
              {t("送信")}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
