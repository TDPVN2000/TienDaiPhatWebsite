import { Form, Input } from "antd";
import Modal from "antd/es/modal/Modal";
import { IconLock } from "assets/icon";
import classNames from "classnames";
import CustomButton from "components/CustomButton";
import LabelInput from "components/LabelInput";
import { ActionModal } from "constants/enums";
import { commonValidate } from "constants/ruleForm";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface IProps {
  open: boolean;
  toggle: () => void;
  type?: ActionModal;
  onSubmit: (param?: any) => any;
  isLoading?: boolean;
  data?: any;
  isSuccessEdit?: boolean;
}

function ModalChangePassword({
  open,
  toggle,
  type,
  onSubmit,
  isLoading,
  data,
  isSuccessEdit,
}: IProps) {
  const [t] = useTranslation();
  const [form] = Form.useForm();

  const onResetForm = () => {
    form.resetFields();
  };
  const onCancelModal = () => {
    toggle?.();
    onResetForm();
  };

  useEffect(() => {
    if (open) {
      form.resetFields();
    }
  }, [form, open]);

  return (
    <Modal
      title={
        <>
          <div>{t("パスワード変更")}</div>
        </>
      }
      open={open}
      onCancel={onCancelModal}
      footer={null}
      className="modalCustom"
      closable={false}
      width={638}
      destroyOnClose
    >
      <Form layout="vertical" form={form} onFinish={onSubmit}>
        <div className={styles.body}>
          <LabelInput title={t("現在のパスワード")} />
          <Form.Item
            name="old_password"
            validateFirst
            required
            rules={[commonValidate.required, commonValidate.password]}
          >
            <Input.Password
              className="input"
              size="middle"
              maxLength={32}
              placeholder={t("現在のパスワード")}
              prefix={<IconLock />}
            />
          </Form.Item>
          <LabelInput title={t("新しいパスワードを入力")} />
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
          <LabelInput title={t("パスワードを再入力")} />
          <Form.Item
            name="new_password_confirmation"
            validateFirst
            required
            rules={[commonValidate.required, commonValidate.password]}
          >
            <Input.Password
              className="input"
              size="middle"
              maxLength={32}
              placeholder={t("パスワードを再入力")}
              prefix={<IconLock />}
            />
          </Form.Item>
          <div className={styles.viewBtn}>
            <CustomButton
              title={t("保存")}
              onClick={() => {
                form.submit();
              }}
              className={classNames([styles.btnSubmit])}
              isLoading={isLoading}
            />
          </div>
        </div>
      </Form>
    </Modal>
  );
}

export default ModalChangePassword;
