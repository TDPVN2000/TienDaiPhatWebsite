import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Row, message } from "antd";
import { changePasswordApi } from "api/auth";
import { commonValidate } from "constants/ruleForm";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { text } from "utils/const/const";
import { handleErrorMessage } from "utils/helper";

interface IProps {
  open: boolean;
  toggle: (visible?: boolean) => void;
}
export default function ModalChangePassword({ open, toggle }: IProps) {
  const [form] = Form.useForm();
  const [t] = useTranslation();

  const onCancel = () => {
    toggle(false);
  };

  const handleChangePassword = async (data: any) => {
    const formatNewPassword = data.newPassword.trim();
    try {
      await changePasswordApi({
        newPassword: formatNewPassword,
      });
      message.success(t("message.success"));
      toggle(false);
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  useEffect(() => {
    if (!open) {
      form.setFieldsValue({
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [form, open]);

  return (
    <Modal
      title={
        <>
          <div> {t("myPage.titleChangePass")}</div>
          <div onClick={() => toggle(false)}>
            <CloseCircleOutlined />
          </div>
        </>
      }
      className="modalCustom"
      open={open}
      closable={false}
      footer={null}
    >
      <Form layout="vertical" onFinish={handleChangePassword} form={form}>
        <Form.Item
          label={t("myPage.newPass")}
          name="newPassword"
          rules={[
            commonValidate.passRequired(t("common.password")),
            commonValidate.whiteSpace,
            commonValidate.password,
          ]}
          validateFirst
        >
          <Input.Password
            className="input"
            maxLength={20}
            placeholder={t("common.placeholderPassword")}
          />
        </Form.Item>
        <Form.Item
          label={t("myPage.confirmPass")}
          name="confirmPassword"
          dependencies={["newPassword"]}
          rules={[
            commonValidate.passRequired(t("common.confirmPass")),
            commonValidate.password,
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(text.twoPasswordDontMatch));
              },
            }),
          ]}
          validateFirst
        >
          <Input.Password
            maxLength={20}
            className="input"
            placeholder={t("common.placeholderPassword")}
          />
        </Form.Item>
        <Row justify={"center"}>
          <Button className="button mr-10" onClick={onCancel}>
            {t("common.cancel")}
          </Button>
          <Button className="button" htmlType="submit" type="primary">
            {t("common.ok")}
          </Button>
        </Row>
      </Form>
    </Modal>
  );
}
