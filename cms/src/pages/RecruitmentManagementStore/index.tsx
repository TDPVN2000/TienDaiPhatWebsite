import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, Input } from "antd";
import {
  createRecruitmentApi,
  getDetailRecruitmentApi,
  updateRecruitmentApi,
} from "api/recruitment";
import classNames from "classnames";
import CustomButton from "components/CustomButton";
import CustomNotification from "components/CustomNotification";
import HeaderContent from "components/HeaderContent";
import LabelInput from "components/LabelInput";
import Loading from "components/Loading";
import TextEditor from "components/TextEditor";
import { ButtonType, QueryKey } from "constants/enums";
import { commonValidate } from "constants/ruleForm";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { handleErrorMessage } from "utils/helper";
import styles from "./styles.module.scss";

dayjs.extend(utc);

export default function RecruitmentManagementStore() {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  const [inputContentError, setInputContentError] = useState<boolean>(false);

  const isDraftRef = useRef<boolean>();

  const onFinish = async (data: any) => {
    if (!data.des_position) {
      return;
    }
    const payload = {
      ...data,
      des_position: data?.des_position,
    };
    if (id) {
      editRecruitmentApi({ recruitment_id: Number(id), params: payload });
    } else {
      createNotify(payload);
    }
  };

  const onChangeContent = (value: string) => {
    form.setFieldsValue({
      des_position: value,
    });
    if (!value) {
      setInputContentError(true);
    } else {
      setInputContentError(false);
    }
  };

  const { data: dataDetailRecruitment, isLoading: loadingRecruitment } =
    useQuery(
      [QueryKey.DETAIL_RECRUITMENT, id],
      () => getDetailRecruitmentApi(id),
      {
        onSuccess: (res: any) => {
          form.setFieldsValue({
            ...res,
            position: res?.position,
            des_position: res?.des_position,
            address: res?.address,
          });
        },
        enabled: !!id,
      }
    );

  const handleCreateRecruitment = async (data: any) => {
    return await createRecruitmentApi(data);
  };

  const { mutate: editRecruitmentApi, isLoading: loadingEditNotify } =
    useMutation(updateRecruitmentApi, {
      onSuccess: () => {
        CustomNotification({
          type: "success",
          message: t("Cập nhật thành công"),
        });
        navigate(`/recruitment-management`);
      },
      onError: (err: any) => {
        handleErrorMessage(err);
      },
    });

  const { mutate: createNotify, isLoading: loadingCreateRecruitment } =
    useMutation(handleCreateRecruitment, {
      onSuccess: (res) => {
        CustomNotification({
          type: "success",
          message: t("Tạo bài viết thành công"),
        });
        navigate(`/recruitment-management`);
      },
      onError: (err: any) => {
        handleErrorMessage(err);
      },
    });

  const onCancelModal = () => {
    if (id) {
      navigate(`/recruitment-management/detail/${id}`);
    } else {
      navigate("/notification-management");
    }
  };

  return (
    <div className={styles.container}>
      {id && loadingRecruitment && <Loading />}
      <HeaderContent
        title={id ? t("Chỉnh sửa bài viết") : t("Tạo bài viết")}
        hasBack
      />
      <div className={styles.body}>
        <Form onFinish={onFinish} form={form} layout="vertical">
          <div className={styles.viewInput}>
            <LabelInput title={t("Vị trí")} isRequired />
            <Form.Item name="position" rules={[commonValidate.required]}>
              <Input
                className={classNames("input", [styles.phone])}
                placeholder={t("Vị trí")}
                maxLength={255}
              />
            </Form.Item>
            <LabelInput title={t("Địa chỉ làm việc")} isRequired />
            <Form.Item name="address" rules={[commonValidate.required]}>
              <Input
                className={classNames("input", [styles.phone])}
                placeholder={t("Địa chỉ làm việc")}
                maxLength={255}
              />
            </Form.Item>
            <LabelInput title={t("Mô tả")} isRequired />
            <Form.Item name="des_position">
              <TextEditor
                className={styles.customEditor}
                onChangeText={onChangeContent}
                data={dataDetailRecruitment?.des_position}
                placeholder={t("homePageNewsManagement.contentPlaceholder")}
              />
            </Form.Item>
            {inputContentError ? (
              <p className={styles.errorContent}>
                {t("validate.fieldIsRequired")}
              </p>
            ) : (
              ""
            )}

            <div className={styles.viewBtn}>
              <CustomButton
                title={t("Hủy")}
                onClick={onCancelModal}
                className={classNames([styles.btnSubmit])}
                isLoading={loadingCreateRecruitment || loadingEditNotify}
                type={ButtonType.OUTLINE}
              />
              <CustomButton
                title={t("Gửi")}
                onClick={() => {
                  const content = form.getFieldValue("des_position");
                  if (!content) {
                    setInputContentError(true);
                  }
                  form.submit();
                  isDraftRef.current = false;
                }}
                className={classNames([styles.btnSubmit])}
                isLoading={loadingCreateRecruitment || loadingEditNotify}
              />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
