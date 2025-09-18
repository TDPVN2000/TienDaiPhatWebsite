import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, Input, Radio, Upload } from "antd";
import {
  createProjectsApi,
  getDetailProjectsApi,
  updateProjectsApi,
} from "api/projects";
import { IconAddCircle, IconRemove } from "assets/icon";
import classNames from "classnames";
import CustomButton from "components/CustomButton";
import CustomNotification from "components/CustomNotification";
import HeaderContent from "components/HeaderContent";
import LabelInput from "components/LabelInput";
import Loading from "components/Loading";
import { ButtonType, QueryKey } from "constants/enums";
import { commonValidate } from "constants/ruleForm";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type { RcFile as OriRcFile } from "rc-upload/lib/interface";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  acceptedImageType,
  optionsCheckboxTypeProject,
} from "utils/const/const";
import { checkSizeImage, handleErrorMessage } from "utils/helper";
import useConvertHeic from "utils/hooks/useConvertHeic";
import useGenerateUrl from "utils/hooks/useGenerateUrl";
import styles from "./styles.module.scss";

dayjs.extend(utc);

export default function ProjectsManagementStore() {
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
      image_url: await getUrlImage(data?.image_url),
      year_completed: Number(data?.year_completed),
    };

    if (id) {
      editProjectApi({ project_id: Number(id), params: payload });
    } else {
      createProject(payload);
    }
  };

  const { data: dataDetailNotify, isLoading: loadingNotify } = useQuery(
    [QueryKey.DETAIL_PROJECT, id],
    () => getDetailProjectsApi(id),
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

  const handleCreateProject = async (data: any) => {
    return await createProjectsApi(data);
  };

  const { mutate: editProjectApi, isLoading: loadingEditProject } = useMutation(
    updateProjectsApi,
    {
      onSuccess: () => {
        CustomNotification({
          type: "success",
          message: t("Cập nhật thành công"),
        });
        navigate(`/projects-management`);
      },
      onError: (err: any) => {
        handleErrorMessage(err);
      },
    }
  );

  const { mutate: createProject, isLoading: loadingCreateProject } =
    useMutation(handleCreateProject, {
      onSuccess: (res) => {
        CustomNotification({
          type: "success",
          message: t("Cập nhật thành công"),
        });
        navigate(`/projects-management/detail/${res.id}`);
      },
      onError: (err: any) => {
        handleErrorMessage(err);
      },
    });

  const onCancelModal = () => {
    if (id) {
      navigate(`/projects-management/detail/${id}`);
    } else {
      navigate("/projects-management");
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
        title={id ? t("Chỉnh sửa nội dung dự án") : t("Tạo nội dung dự án")}
        hasBack
      />
      <div className={styles.body}>
        <Form onFinish={onFinish} form={form} layout="vertical">
          <div className={styles.viewInput}>
            <LabelInput title={t("Tên dự án")} isRequired />
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
            <LabelInput title={t("Năm hoàn thành")} isRequired />
            <Form.Item
              name="year_completed"
              rules={[
                { required: true, message: t("validate.fieldIsRequired") },
                {
                  pattern: /^[0-9]{4}$/,
                  message: t("Năm phải là 4 chữ số"),
                },
              ]}
            >
              <Input
                className={classNames("input", [styles.phone])}
                placeholder={t("Năm hoàn thành ...")}
                maxLength={4}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </Form.Item>
            <LabelInput title={t("Thumbnail dự án")} isRequired />
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
                <LabelInput title={t("Loại dự án")} isRequired />
                <Form.Item name="field_id" rules={[commonValidate.required]}>
                  <Radio.Group
                    options={optionsCheckboxTypeProject}
                    className="checkboxGroup"
                  />
                </Form.Item>
              </div>
            </div>

            <div className={styles.viewBtn}>
              <CustomButton
                title={t("Hủy")}
                onClick={onCancelModal}
                className={classNames([styles.btnSubmit])}
                isLoading={loadingCreateProject || loadingEditProject}
                type={ButtonType.OUTLINE}
              />
              <CustomButton
                title={t("Gửi")}
                onClick={handleSubmit}
                className={classNames([styles.btnSubmit])}
                isLoading={loadingCreateProject || loadingEditProject}
              />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
