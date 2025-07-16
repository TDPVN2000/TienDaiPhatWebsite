import Modal from "antd/es/modal/Modal";
import classNames from "classnames";
import { ButtonType } from "constants/enums";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import CustomButton from "components/CustomButton";
import { IconClose } from "assets/icon";
import { InfoDetailItem } from "components/InfoDetailItem";
import { optionsDropdownContactStatus } from "utils/const/const";
import { formatDateString } from "utils/helper";

interface IProps {
  open: boolean;
  dataItem?: any;
  toggle: () => void;
  onSubmit?: (param?: any) => void;
}

function ModalDetailContact({ open, dataItem, onSubmit, toggle }: IProps) {
  const [t] = useTranslation();

  const onCancelModal = () => {
    toggle?.();
  };
  return (
    <Modal
      title={
        <>
          <div>{t("modal.detailContactModalTitle")}</div>
          <IconClose onClick={onCancelModal} />
        </>
      }
      className={classNames("modalCustom", [styles.modalDetail])}
      open={open}
      onCancel={onCancelModal}
      closable={false}
      footer={null}
      destroyOnClose={true}
    >
      <div className={styles.body}>
        <InfoDetailItem title={t("contact.title")} content={dataItem?.title} />
        <InfoDetailItem
          title={t("contact.content")}
          content={dataItem?.content}
        />
        <InfoDetailItem title={t("contact.email")} content={dataItem?.email} />
        <InfoDetailItem
          title={t("contact.sendAt")}
          content={formatDateString(dataItem?.created_at)}
        />
        <InfoDetailItem
          title={t("contact.status")}
          content={
            optionsDropdownContactStatus?.find(
              (item: any) => item?.value === dataItem?.status
            )?.label
          }
        />
        <div className={styles.viewBtn}>
          <a href={`mailto:${dataItem?.email}`} target="_blank">
            <CustomButton
              title={t("contact.reply")}
              onClick={() => onSubmit?.()}
              className={classNames([styles.btnSubmit])}
              type={ButtonType.ACTION}
            />
          </a>
        </div>
      </div>
    </Modal>
  );
}

export default ModalDetailContact;
