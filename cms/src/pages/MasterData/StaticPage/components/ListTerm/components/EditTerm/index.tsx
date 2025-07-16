import HeaderContent from "components/HeaderContent";
import Loading from "components/Loading";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import TextEditor from "components/TextEditor";
import LabelInput from "components/LabelInput";
import { Button, Form, Modal } from "antd";
import { objectMasterData } from "utils/const/const";
import { useMutation, useQuery } from "@tanstack/react-query";
import CustomNotification from "components/CustomNotification";
import { handleErrorMessage } from "utils/helper";
import { getDetailTermApi, updateTermApi } from "api/masterData";
import { QueryKey } from "constants/enums";
import { useState } from "react";

export default function EditTerm() {
  const [t] = useTranslation();
  const { type } = useParams();
  const titleType = objectMasterData?.find(
    (item: any) => item?.value?.toString() === type
  )?.label;
  const [form] = Form.useForm();
  const [disableBtnConfirm, setDisableBtnConfirm] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const changeOpenModal = (value: boolean) => {
    setOpenModal(value);
  };

  const onChangeContent = (value: any) => {
    const dataContent = form.getFieldValue("content");
    if (value !== dataContent) {
      setDisableBtnConfirm(false);
    } else {
      setDisableBtnConfirm(true);
    }
    form.setFieldsValue({
      content: value,
    });
  };

  const handleEditTerm = async (param: any) => {
    await updateTermApi({
      ...param,
      type,
    });
  };

  const {
    data: dataDetailTerm,
    isLoading: loadingInfoTerm,
    refetch,
  } = useQuery({
    queryKey: [QueryKey.DETAIL_TERM],
    queryFn: () => getDetailTermApi(type),
  });

  const handleSaveTerm = () => {
    form.submit()
    changeOpenModal(false)
  };

  const {
    mutate: editTerm,
    isLoading: loadingEditTerm,
    isSuccess,
  } = useMutation(handleEditTerm, {
    onSuccess: () => {
      CustomNotification({
        type: "success",
        message: t("notification.success"),
      });
      setDisableBtnConfirm(true);
    },
    onError: (err: any) => {
      handleErrorMessage(err);
    },
  });

  return (
    <div className={styles.container}>
      {(loadingEditTerm || loadingInfoTerm) && <Loading />}
      <HeaderContent
        title={t(`利用規約（${titleType})`)}
        hasBack
        buttonAdd={{
          title: t("保存"),
          onClick: () => changeOpenModal(true),
          isLoading: loadingEditTerm,
          disabled: disableBtnConfirm,
        }}
      />
      <div className={styles.body}>
        <Form
          onFinish={editTerm}
          form={form}
          name="termPolicy"
          layout="vertical"
        >
          <div className={styles.viewInput}>
            <LabelInput title={t("内容")} />
            <Form.Item name="content">
              <TextEditor
                onChangeText={onChangeContent}
                data={dataDetailTerm?.content}
              />
            </Form.Item>
          </div>
        </Form>
      </div>
      <Modal open={openModal} closable={false} footer={false} centered>
        <h4>{t("modal.saveConfirmTitle")}</h4>
        <div className={styles.modalBtnGroup}>
          <Button onClick={() => changeOpenModal(false)}>
            {t("modal.cancel")}
          </Button>
          <Button type="primary" onClick={handleSaveTerm}>
            {t("modal.ok")}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
