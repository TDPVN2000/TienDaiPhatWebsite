import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { commonValidate } from "constants/ruleForm";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { LogoApp } from "assets/icon";
import LabelInput from "components/LabelInput";
import { useMutation } from "@tanstack/react-query";
import CustomNotification from "components/CustomNotification";
import { getErrorMessage, handleErrorMessage } from "utils/helper";
import { sendCodeForgotPwdApi, verifyCodeForgotPwdApi } from "api/auth";
import Loading from "components/Loading";
import { useEffect, useState } from "react";
import { ESessionlStorageKey } from "constants/enums";
import ModalAlertDeleteCate from "pages/MasterData/Category/components/ModalAlertDeleteCate";
import classNames from "classnames";
import { TIME_TO_VERIFY_CODE } from "utils/const/const";

export default function VerifyCodeOtp() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(TIME_TO_VERIFY_CODE);
  const [isReset, setIsReset] = useState(false);
  const [form] = Form.useForm();
  const [openModalAlert, setOpenModalAlert] = useState<boolean>(false);
  const [errAlert, setErrAlert] = useState<string>();
  const emailGetOtp = sessionStorage.getItem(ESessionlStorageKey.MAIL_GET_CODE);

  const handleConfirmOtp = async (payload: any) => {
    return await verifyCodeForgotPwdApi({ email: emailGetOtp, ...payload });
  };

  const onGetCodeAgain = () => {
    getOtp({
      email: emailGetOtp,
    });
  };

  const { mutate: confirmOtp, isLoading: loadingConfirmOtp } = useMutation(
    handleConfirmOtp,
    {
      onSuccess: (data: any) => {
        CustomNotification({
          type: "success",
          message: t("notification.success"),
        });
        sessionStorage.setItem(
          ESessionlStorageKey.CODE_OTP,
          form.getFieldValue("code")
        );
        navigate(`/forgot-password`);
      },
      onError: (err: any) => {
        setErrAlert(getErrorMessage(err) || err);
        setOpenModalAlert(true);
      },
    }
  );

  const { mutate: getOtp, isLoading: loadingGetCode } = useMutation(
    sendCodeForgotPwdApi,
    {
      onSuccess: (data: any) => {
        CustomNotification({
          type: "success",
          message: t("notification.success"),
        });
        handleReset();
      },
      onError: (err: any) => {
        handleErrorMessage(err);
      },
    }
  );

  useEffect(() => {
    if (isReset) {
      setSeconds(TIME_TO_VERIFY_CODE);
      setIsReset(false);
    }
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 1) {
          clearInterval(intervalId);
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isReset]);

  const handleReset = () => {
    setIsReset(true);
  };

  return (
    <div className={styles.container}>
      {(loadingConfirmOtp || loadingGetCode) && <Loading />}
      <div className={styles.header}>
        <span className={styles.logoWrap}>
          <LogoApp className={styles.logoApp} />
        </span>
        {/* <span className={styles.cssTitleLogin}>{t("common.webName")}</span> */}
      </div>
      <div className={styles.login}>
        <div className={styles.form}>
          <span className={styles.title}>{t("認証コード入力")}</span>
          <Form
            layout="vertical"
            labelAlign="left"
            onFinish={confirmOtp}
            className={styles.bodyFormLogin}
            form={form}
            validateTrigger="onChange"
          >
            <LabelInput title={t("認証コード")} isRequired />
            <Form.Item
              name="code"
              validateFirst
              rules={[commonValidate.required]}
            >
              <Input
                className="input"
                placeholder={t("認証コードを入力")}
                maxLength={255}
              />
            </Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              block
              className="button linear mt-16"
              loading={loadingConfirmOtp}
            >
              {t("次へ")}
            </Button>
          </Form>
          <div
            className={classNames([
              styles.btnNoneRound,
              // {
              //   [styles.btnDisabled]: seconds > 0,
              // },
            ])}
          >
            <Button
              onClick={onGetCodeAgain}
              loading={loadingGetCode}
              disabled={seconds > 0}
            >
              {"認証コードを再送信します"}
            </Button>
            <div className={styles.viewCountdown}>
              <div>（</div>
              <div className={styles.count}>{seconds} 秒</div>
              <div>）</div>
            </div>
          </div>
        </div>
      </div>
      <ModalAlertDeleteCate
        open={openModalAlert}
        toggle={() => {
          setOpenModalAlert(!openModalAlert);
        }}
        title={"認証コードが正しくない"}
        content={errAlert}
      />
    </div>
  );
}
