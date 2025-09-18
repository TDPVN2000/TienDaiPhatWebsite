import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, Input, Upload } from "antd";
import {
  createCertificationApi,
  getDetailCertificationApi,
  updateCertificationApi,
} from "api/certification";
import { IconAddCircle, IconRemove } from "assets/icon";
import classNames from "classnames";
import CustomButton from "components/CustomButton";
import CustomNotification from "components/CustomNotification";
import HeaderContent from "components/HeaderContent";
import LabelInput from "components/LabelInput";
import Loading from "components/Loading";
import { ButtonType, QueryKey, SubMenu } from "constants/enums";
import { commonValidate } from "constants/ruleForm";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type { RcFile as OriRcFile } from "rc-upload/lib/interface";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { acceptedImageType } from "utils/const/const";
import { checkSizeImage, handleErrorMessage } from "utils/helper";
import useConvertHeic from "utils/hooks/useConvertHeic";
import useGenerateUrl from "utils/hooks/useGenerateUrl";
import styles from "./styles.module.scss";

dayjs.extend(utc);

export default function CertificationManagementStore() {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { getUrlImage } = useGenerateUrl();
  const { id } = useParams();
  const [avatar, setAvatar] = useState<any>();

  const onFinish = async (data: any) => {
    console.log("DATA-Submit-Form", data);

    if (!data) {
      return;
    }

    const payload = {
      ...data,
      field_id: SubMenu.MEDICAL_EQUIPMENT,
      image_url: await getUrlImage(data?.image_url),
    };

    if (id) {
      editCertificationApi({ project_id: Number(id), params: payload });
    } else {
      createCertification(payload);
    }
  };

  const { data, isLoading: loadingNotify } = useQuery(
    [QueryKey.DETAIL_CERTIFICATION, id],
    () => getDetailCertificationApi(id),
    {
      onSuccess: (res: any) => {
        setAvatar({
          url: res?.image_url,
          errorFile: "",
        });
        form.setFieldsValue({
          ...res,
        });
      },
      enabled: !!id,
    }
  );

  const { isConvertingHeic, convertHeicToAny } = useConvertHeic();

  const handleCreateCertificate = async (data: any) => {
    return await createCertificationApi(data);
  };

  const { mutate: editCertificationApi, isLoading: loadingEditCertification } =
    useMutation(updateCertificationApi, {
      onSuccess: () => {
        CustomNotification({
          type: "success",
          message: t("Cập nhật thành công"),
        });
        navigate(`/certification-management`);
      },
      onError: (err: any) => {
        handleErrorMessage(err);
      },
    });

  const { mutate: createCertification, isLoading: loadingCreateCertification } =
    useMutation(handleCreateCertificate, {
      onSuccess: (res) => {
        CustomNotification({
          type: "success",
          message: t("Cập nhật thành công"),
        });
        navigate(`/certification-management`);
      },
      onError: (err: any) => {
        handleErrorMessage(err);
      },
    });

  const onCancelModal = () => {
    if (id) {
      navigate(`/certification-management/detail/${id}`);
    } else {
      navigate("/certification-management");
    }
  };

  const beforeUpload = async (
    file: OriRcFile,
    setImage: any,
    nameImage?: any
  ) => {
    if (acceptedImageType?.find((type: any) => type === file?.type)) {
      if (checkSizeImage(file)) {
        if (!RegExp(/(heic|heif)/i).test(`${file.type} ${file?.name}`)) {
          const url = window.URL.createObjectURL(file);

          setImage({ url });
          form.setFieldsValue({
            [nameImage]: file,
          });
        } else {
          const conversionResult = await convertHeicToAny(file);
          const jpegFile = conversionResult?.fileAfterProcessed;
          const url = conversionResult?.urlImage;

          setImage({ url });
          form.setFieldsValue({
            [nameImage]: jpegFile,
          });
        }
      } else {
        setImage({ errorFile: t("common.maxSizeImage") });
      }
      return false;
    } else {
      setImage({ errorFile: t("common.typeErr") });
    }
    return false;
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      form.submit();
    } catch (errorInfo) {}
  };

  return (
    <div className={styles.container}>
      {((id && loadingNotify) || isConvertingHeic) && <Loading />}
      <HeaderContent
        title={id ? t("Chỉnh sửa nội dung dự án") : t("Tạo chứng chỉ")}
        hasBack
      />
      <div className={styles.body}>
        <Form onFinish={onFinish} form={form} layout="vertical">
          <div className={styles.viewInput}>
            <LabelInput title={t("Tên chứng chỉ")} isRequired />
            <Form.Item name="name" rules={[commonValidate.required]}>
              <Input
                className={classNames("input", [styles.phone])}
                placeholder={t("Nhập tên dự án vào đây ...")}
                maxLength={255}
              />
            </Form.Item>
            <LabelInput title={t("Mô tả")} isRequired />
            <Form.Item name="description" rules={[commonValidate.required]}>
              <Input
                className={classNames("input", [styles.phone])}
                placeholder={t("Mô tả dự án ...")}
                maxLength={255}
              />
            </Form.Item>
            <LabelInput title={t("Ảnh chứng chỉ")} isRequired />
            <div className={styles.viewImageLicense}>
              <div className={styles.upload}>
                {avatar?.url ? (
                  <div
                    className={styles.removeAvatar}
                    onClick={(e: any) => {
                      setAvatar({});
                      form.setFieldsValue({ image_url: undefined });
                      form.validateFields(["image_url"]);
                    }}
                  >
                    <IconRemove />
                  </div>
                ) : null}

                <Upload
                  accept={`${acceptedImageType.join(", ")}`}
                  showUploadList={false}
                  customRequest={() => null}
                  beforeUpload={(file: any) => {
                    beforeUpload(file, setAvatar, "image_url");
                  }}
                  className="mt-10"
                >
                  {avatar?.url ? (
                    <div className={styles.thumbnail}>
                      <img src={avatar?.url} alt="" />
                    </div>
                  ) : (
                    <div className={styles.placeholder}>
                      <IconAddCircle />
                      <div className={styles.titleUpload}>{t("upload")}</div>
                    </div>
                  )}
                </Upload>
                {avatar?.errorFile && (
                  <div className={styles.imageMaxSize}>{avatar?.errorFile}</div>
                )}
                <Form.Item
                  name={"image_url"}
                  rules={[commonValidate.required]}
                  className={classNames("fakeItem", [
                    {
                      [styles.hideError]: avatar?.errorFile || avatar?.url,
                    },
                  ])}
                ></Form.Item>
              </div>
            </div>

            <div className={styles.viewBtn}>
              <CustomButton
                title={t("Hủy")}
                onClick={onCancelModal}
                className={classNames([styles.btnSubmit])}
                isLoading={
                  loadingCreateCertification || loadingEditCertification
                }
                type={ButtonType.OUTLINE}
              />
              <CustomButton
                title={t("Gửi")}
                onClick={handleSubmit}
                className={classNames([styles.btnSubmit])}
                isLoading={
                  loadingCreateCertification || loadingEditCertification
                }
              />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
