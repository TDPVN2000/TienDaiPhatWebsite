import Modal from "antd/es/modal/Modal";
import classNames from "classnames";
import { ActionModal, ButtonType } from "constants/enums";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import CustomButton from "components/CustomButton";
import { commonValidate } from "constants/ruleForm";
import { Form, Input } from "antd";
import LabelInput from "components/LabelInput";
import { useEffect } from "react";

interface IProps {
  open: boolean;
  toggle: () => void;
  onSubmit: (param?: any) => void;
  isLoading?: boolean;
  title?: string;
  dataItem?: any;
  type?: ActionModal;
}

function ModalEditCategory({
  open,
  toggle,
  onSubmit,
  isLoading,
  title,
  dataItem,
  type,
}: IProps) {
  const [t] = useTranslation();
  const [form] = Form.useForm();

  const onCancelModal = () => {
    toggle?.();
  };

  const onConfirm = (param?: any) => {
    onSubmit?.(param);
    form.resetFields();
    toggle?.();
  };

  const checkTypeModal = (typeChecking: ActionModal) => {
    return type === typeChecking;
  };

  useEffect(() => {
    if (!checkTypeModal(ActionModal.CREATE) && dataItem) {
      form.setFieldsValue({
        category_name: dataItem?.category_name,
      });
    }
  }, [dataItem, type, open]);

  return (
    <Modal
      className={classNames([styles.modalUpdateItem])}
      open={open}
      onCancel={onCancelModal}
      closable={false}
      footer={null}
      destroyOnClose={true}
      centered
      width={576}
    >
      <div className={styles.body}>
        <span className={styles.title}>{title}</span>
        <Form
          onFinish={onConfirm}
          form={form}
          name="editCate"
          style={{ width: "100%" }}
        >
          <LabelInput title={t("カテゴリー名")} isRequired />
          <Form.Item name="category_name" rules={[commonValidate.required]}>
            <Input
              maxLength={255}
              className="input"
              placeholder={t("カテゴリー名を入力")}
            />
          </Form.Item>
        </Form>
        <div className={styles.viewBtn}>
          <CustomButton
            title={t(checkTypeModal(ActionModal.CREATE) ? "登録" : "保存")}
            onClick={() => {
              form.submit();
            }}
            className={classNames([styles.btnSubmit])}
            isLoading={isLoading}
          />
        </div>
      </div>
    </Modal>
  );
}

export default ModalEditCategory;
