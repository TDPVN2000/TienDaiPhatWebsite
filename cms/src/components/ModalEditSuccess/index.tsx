import { Modal } from "antd";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { IconEditSuccess } from "assets/icon";
import classNames from "classnames";
import CustomButton from "components/CustomButton";

interface IProps {
  open: boolean;
  toggle: () => void;
  onSubmit?: (param?: any) => void;
  isLoading?: boolean;
  title?: string;
  content?: string;
  dataItem?: any;
}

export default function ModalEditSuccess({
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
        <IconEditSuccess />
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
            onClick={onSubmit}
            className={classNames([styles.btnSubmit])}
            isLoading={isLoading}
          />
        </div>
      </div>
    </Modal>
  );
}
