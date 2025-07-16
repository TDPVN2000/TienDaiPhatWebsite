import { Spin, Switch } from "antd";
import { IconAddCircle, IconRemove } from "assets/icon";
import ReactPlayer from "react-player";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { useMutation } from "@tanstack/react-query";
import { IVideoData, uploadVideo } from "api/videoManager";

interface IProps {
  index: number;
  title: string;
  value: any;
  isPublic: boolean;
  onChangeComponentData: (idx: number, data: Partial<IVideoData>) => void;
}
export default function VideoUploadComponent(props: IProps) {
  const { index, title, isPublic, value, onChangeComponentData } = props;
  const [validateText, setValidateText] = useState<string | null>(null);
  const uploadRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const uploadVideoMutation = useMutation({
    mutationKey: ["upload-video"],
    mutationFn: (data: FormData) => uploadVideo(data),
    onSuccess(data, variables, context) {
      onChangeComponentData(index, { link: data.file_url });
      setValidateText(null);
    },
  });

  const onClickNewUploadArea = () => {
    if (!uploadRef.current) return;
    uploadRef.current.click();
  };

  const onChangeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("files", file);
    uploadVideoMutation.mutate(formData);
  };

  const handleClickRemoveUpload = () => {
    onChangeComponentData(index, { link: "", is_active: false });
    if (uploadRef.current?.files) uploadRef.current.files = null;
    setValidateText(title + t("validate.fieldIsRequired"));
  };

  const handleClickIsPublic = () => {
    onChangeComponentData(index, { is_active: !isPublic });
  };

  return (
    <div className={classNames(styles.uploadContainer)}>
      <p className={styles.title}>
        {title}
        <span className={styles.red}>*</span>
      </p>
      <div className={styles.uploadArea}>
        <input
          type="file"
          accept="video/*"
          onChange={onChangeFileUpload}
          hidden
          ref={uploadRef}
        />
        {value ? (
          <div className={styles.existedUpload}>
            <div className={styles.btnArea}>
              <IconRemove onClick={handleClickRemoveUpload} />
            </div>
            <ReactPlayer
              url={value}
              width="100%"
              height="100%"
              playIcon={<></>}
            />
          </div>
        ) : (
          <div className={styles.newUploadArea} onClick={onClickNewUploadArea}>
            {uploadVideoMutation.isLoading ? (
              <Spin />
            ) : (
              <>
                <IconAddCircle />
                <p>{t("lpVideo.upload")}</p>
              </>
            )}
          </div>
        )}
        {validateText && <p style={{ color: "red" }}>{validateText}</p>}
      </div>
      <div className={styles.releaseControlArea}>
        <span>{t("lpVideo.public")}</span>
        <Switch value={isPublic} onChange={handleClickIsPublic} />
      </div>
    </div>
  );
}
