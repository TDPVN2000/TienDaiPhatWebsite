import { Modal } from "antd";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { IconAlert } from "assets/icon";
import classNames from "classnames";
import CustomButton from "components/CustomButton";
import { ButtonType } from "constants/enums";
import { IStaff, IUser } from "constants/interfaces";

interface IProps {
  open: boolean;
  toggle: () => void;
  onSubmit?: (param: any) => void;
  isLoading?: boolean;
  title?: string;
  content?: string;
  dataItem?: any;
}

export default function ModalAlertDeleteCate({
  open,
  toggle,
  onSubmit,
  isLoading,
  title,
  dataItem,
  content,
}: IProps) {
  const [t] = useTranslation();

  const onCancelModal = () => {
    toggle?.();
  };

  const onDelete = () => {
    onSubmit?.(dataItem?.id);
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
      width={358}
    >
      <div className={styles.body}>
        <IconAlert />
        <span
          className={classNames([
            styles.title,
            { [styles.title__hasContent]: content },
          ])}
        >
          {title}
        </span>
        {content && <span className={styles.content}>{content}</span>}
        <div className={styles.viewBtn}>
          <CustomButton
            title={t("common.btnConfirmDelete")}
            onClick={onCancelModal}
            className={classNames([styles.btnSubmit])}
            isLoading={isLoading}
          />
        </div>
      </div>
    </Modal>
  );
}
