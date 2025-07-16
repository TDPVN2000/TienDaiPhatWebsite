import HeaderContent from "components/HeaderContent";
import Loading from "components/Loading";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import TextEditor from "components/TextEditor";
import LabelInput from "components/LabelInput";
import { Form } from "antd";
import { objectMasterData } from "utils/const/const";
import { useState } from "react";
import { handleErrorMessage } from "utils/helper";
import CustomNotification from "components/CustomNotification";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKey } from "constants/enums";
import { getDetailLawApi, updateLawApi } from "api/masterData";

export default function EditCommerLaw() {
  const [t] = useTranslation();
  const { type } = useParams();

  const titleType = objectMasterData?.find(
    (item: any) => item?.value?.toString() === type
  )?.label;
  const [form] = Form.useForm();
  const [disableBtnConfirm, setDisableBtnConfirm] = useState<boolean>(true);

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

  const handleEditLaw = async (param: any) => {
    await updateLawApi({
      ...param,
      type,
    });
  };

  const {
    data: dataDetailLaw,
    isLoading: loadingInfoLaw,
    refetch,
  } = useQuery({
    queryKey: [QueryKey.DETAIL_LAW],
    queryFn: () => getDetailLawApi(type),
  });

  const {
    mutate: editLaw,
    isLoading: loadingEditLaw,
    isSuccess,
  } = useMutation(handleEditLaw, {
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
      {(loadingEditLaw || loadingInfoLaw) && <Loading />}
      <HeaderContent
        title={t(`特定商取引法の表示（${titleType})`)}
        hasBack
        buttonAdd={{
          title: t("保存"),
          onClick: () => form.submit(),
          isLoading: loadingEditLaw,
          disabled: disableBtnConfirm,
        }}
      />
      <div className={styles.body}>
        <Form onFinish={editLaw} form={form} name="commerLaw" layout="vertical">
          <div className={styles.viewInput}>
            <LabelInput title={t("内容")} />
            <Form.Item name="content">
              <TextEditor
                onChangeText={onChangeContent}
                data={dataDetailLaw?.content}
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}
