import Modal from "antd/es/modal/Modal";
import classNames from "classnames";
import { ButtonType } from "constants/enums";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import CustomButton from "components/CustomButton";
import { IconClose } from "assets/icon";
import { InfoDetailItem } from "components/InfoDetailItem";
import { optionsCheckboxTypeHuman } from "utils/const/const";
import { formatDateString } from "utils/helper";

interface IProps {
  open: boolean;
  dataItem?: any;
  toggle: () => void;
  onSubmit?: (param?: any) => void;
}

function ModalDetailNotification({ open, dataItem, onSubmit, toggle }: IProps) {
  const [t] = useTranslation();

  const onCancelModal = () => {
    toggle?.();
  };
  const newTypeArr = (dataItem?.type?.length ? dataItem?.type : [])?.map(
    (infoType: any) => {
      return optionsCheckboxTypeHuman?.find(
        (item: any) => item?.value === infoType
      )?.label;
    }
  );
  return (
    <Modal
      title={
        <>
          <div>{t("modal.detailNotiModalTitle")}</div>
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
        <InfoDetailItem title={t("noti.title")} content={dataItem?.title} />
        <InfoDetailItem title={t("noti.content")} content={dataItem?.content} />
        <InfoDetailItem
          title={t("noti.type")}
          content={newTypeArr.join(", ")}
        />
        <InfoDetailItem
          title={t("noti.publicAt")}
          content={formatDateString(dataItem?.published_at)}
        />
        <div className={styles.viewBtn}>
          <CustomButton
            title={t("noti.delete")}
            onClick={() => onSubmit?.()}
            className={classNames([styles.btnSubmit])}
            type={ButtonType.OUTLINE}
          />
        </div>
      </div>
    </Modal>
  );
}

export default ModalDetailNotification;
