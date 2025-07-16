import { Modal } from "antd";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { IconAlert } from "assets/icon";
import classNames from "classnames";
import CustomButton from "components/CustomButton";
import { ButtonType } from "constants/enums";
import { IStaff, IUser } from "constants/interfaces";
import { ReactNode } from "react";

interface IProps {
  open: boolean;
  toggle: () => void;
  onSubmit: (param: any) => void;
  isLoading?: boolean;
  title?: string;
  dataItem?: any;
  width?: number;
  fullWidthBtn?: boolean;
  children?: ReactNode;
}

export default function ModalDeleteItem({
  open,
  toggle,
  onSubmit,
  isLoading,
  title,
  dataItem,
  width = 358,
  fullWidthBtn = false,
  children,
}: IProps) {
  const [t] = useTranslation();

  const onCancelModal = () => {
    toggle?.();
  };

  const onDeleteStaff = () => {
    onSubmit(dataItem?.id);
  };

  return (
    <Modal
      className={classNames([styles.modalDeleteItem])}
      open={open}
      onCancel={onCancelModal}
      closable={false}
      footer={null}
      destroyOnClose={true}
      centered
      width={width}
    >
      <div className={styles.body}>
        <IconAlert />
        <span className={styles.title}>{title}</span>
        <div className={classNames(styles.width100)}>{children}</div>
        <div
          className={classNames(styles.viewBtn, {
            [styles.width100]: fullWidthBtn,
          })}
        >
          <CustomButton
            title={t("Hủy")}
            onClick={onCancelModal}
            className={classNames(styles.btnSubmit, {
              [styles.width100]: fullWidthBtn,
            })}
            isLoading={isLoading}
            type={ButtonType.OUTLINE}
          />
          <CustomButton
            title={t("OK")}
            onClick={onDeleteStaff}
            className={classNames(styles.btnSubmit, {
              [styles.width100]: fullWidthBtn,
            })}
            isLoading={isLoading}
          />
        </div>
      </div>
    </Modal>
  );
}
