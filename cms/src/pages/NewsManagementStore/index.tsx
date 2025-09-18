import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, Input, Upload } from "antd";
import { createNewsApi, getDetailNewsApi, updateNewsApi } from "api/news";
import { IconAddCircle, IconRemove } from "assets/icon";
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
import type { RcFile as OriRcFile } from "rc-upload/lib/interface";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { acceptedImageType } from "utils/const/const";
import { checkSizeImage, handleErrorMessage } from "utils/helper";
import useConvertHeic from "utils/hooks/useConvertHeic";
import useGenerateUrl from "utils/hooks/useGenerateUrl";
import styles from "./styles.module.scss";

dayjs.extend(utc);

export default function NewsManagementStore() {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { getUrlImage } = useGenerateUrl();
  const { id } = useParams();
  const [inputContentError, setInputContentError] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<any>();

  const isDraftRef = useRef<boolean>();

  const onFinish = async (data: any) => {
    if (!data.content) {
      return;
    }

    const payload = {
      ...data,
      content: data?.content,
      image_url: await getUrlImage(data?.image_url),
    };

    if (id) {
      editNewsApi({ news_id: Number(id), params: payload });
    } else {
      createNews(payload);
    }
  };

  const onChangeContent = (value: string) => {
    form.setFieldsValue({
      content: value,
    });
    if (!value) {
      setInputContentError(true);
    } else {
      setInputContentError(false);
    }
  };

  const { data: dataDetailNews, isLoading: loadingNews } = useQuery(
    [QueryKey.DETAIL_NEW, id],
    () => getDetailNewsApi(id),
    {
      onSuccess: (res: any) => {
        setAvatar({
          url: res?.image_url,
          errorFile: "",
        });
        form.setFieldsValue({
          ...res,
          title: res?.title,
          content: res?.content,
          description: res?.description,
        });
      },
      enabled: !!id,
    }
  );

  const { isConvertingHeic, convertHeicToAny } = useConvertHeic();

  const handleCreateNews = async (data: any) => {
    return await createNewsApi(data);
  };

  const { mutate: editNewsApi, isLoading: loadingEditNotify } = useMutation(
    updateNewsApi,
    {
      onSuccess: () => {
        CustomNotification({
          type: "success",
          message: t("Cập nhật thành công"),
        });
        navigate(`/news-management`);
      },
      onError: (err: any) => {
        handleErrorMessage(err);
      },
    }
  );

  const { mutate: createNews, isLoading: loadingCreateNews } = useMutation(
    handleCreateNews,
    {
      onSuccess: (res) => {
        CustomNotification({
          type: "success",
          message: t("Tạo bài viết thành công"),
        });
        navigate(`/news-management`);
      },
      onError: (err: any) => {
        handleErrorMessage(err);
      },
    }
  );

  const onCancelModal = () => {
    if (id) {
      navigate(`/news-management/detail/${id}`);
    } else {
      navigate("/notification-management");
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

  return (
    <div className={styles.container}>
      {((id && loadingNews) || isConvertingHeic) && <Loading />}
      <HeaderContent
        title={id ? t("Chỉnh sửa tin tức") : t("Tạo tin tức")}
        hasBack
      />
      <div className={styles.body}>
        <Form onFinish={onFinish} form={form} layout="vertical">
          <div className={styles.viewInput}>
            <LabelInput title={t("Tiêu đề")} isRequired />
            <Form.Item name="title" rules={[commonValidate.required]}>
              <Input
                className={classNames("input", [styles.phone])}
                placeholder={t("Tiêu đề")}
                maxLength={255}
              />
            </Form.Item>
            <LabelInput title={t("Mô tả")} isRequired />
            <Form.Item name="description" rules={[commonValidate.required]}>
              <Input
                className={classNames("input", [styles.phone])}
                placeholder={t("Mô tả")}
                maxLength={255}
              />
            </Form.Item>
            <LabelInput title={t("Nội dung")} isRequired />
            <Form.Item name="content">
              <TextEditor
                className={styles.customEditor}
                onChangeText={onChangeContent}
                data={dataDetailNews?.content}
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
            <LabelInput title={t("Thumbnail")} isRequired />
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
                isLoading={loadingCreateNews || loadingEditNotify}
                type={ButtonType.OUTLINE}
              />
              <CustomButton
                title={t("Gửi")}
                onClick={() => {
                  const content = form.getFieldValue("content");
                  if (!content) {
                    setInputContentError(true);
                  }
                  form.submit();
                  isDraftRef.current = false;
                }}
                className={classNames([styles.btnSubmit])}
                isLoading={loadingCreateNews || loadingEditNotify}
              />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
