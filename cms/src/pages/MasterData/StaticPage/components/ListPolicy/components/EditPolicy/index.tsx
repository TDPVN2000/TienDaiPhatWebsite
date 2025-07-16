import HeaderContent from "components/HeaderContent";
import Loading from "components/Loading";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import TextEditor from "components/TextEditor";
import LabelInput from "components/LabelInput";
import { Button, Form, Modal } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import CustomNotification from "components/CustomNotification";
import { handleErrorMessage } from "utils/helper";
import { QueryKey } from "constants/enums";
import { useState } from "react";
import { objectMasterData } from "utils/const/const";
import { getDetailPolicyApi, updatePolicyApi } from "api/masterData";

export default function EditPolicy() {
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

  const handleEditPolicy = async (param: any) => {
    await updatePolicyApi({
      ...param,
      type,
    });
  };

  const {
    data: dataDetailPolicy,
    isLoading: loadingInfoPolicy,
    refetch,
  } = useQuery({
    queryKey: [QueryKey.DETAIL_POLICY],
    queryFn: () => getDetailPolicyApi(type),
  });

  const {
    mutate: editPolicy,
    isLoading: loadingEditPolicy,
    isSuccess,
  } = useMutation(handleEditPolicy, {
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

  const handleSavePolicy = () => {
    form.submit()
    changeOpenModal(false)
  };

  return (
    <div className={styles.container}>
      {(loadingEditPolicy || loadingInfoPolicy) && <Loading />}
      <HeaderContent
        title={t(`プライバシーポリシー（${titleType})`)}
        hasBack
        buttonAdd={{
          title: t("保存"),
          onClick: () => changeOpenModal(true),
          isLoading: loadingEditPolicy,
          disabled: disableBtnConfirm,
        }}
      />
      <div className={styles.body}>
        <Form
          onFinish={editPolicy}
          form={form}
          name="termPolicy"
          layout="vertical"
        >
          <div className={styles.viewInput}>
            <LabelInput title={t("内容")} />
            <Form.Item name="content">
              <TextEditor
                onChangeText={onChangeContent}
                data={dataDetailPolicy?.content}
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
          <Button type="primary" onClick={handleSavePolicy}>
            {t("modal.ok")}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
