import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchVideosData, IVideoData, saveVideo } from "api/videoManager";
import classNames from "classnames";
import CustomNotification from "components/CustomNotification";
import HeaderContent from "components/HeaderContent";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { handleErrorMessage } from "utils/helper";
import VideoUploadComponent from "./components/VideoUploadComponent";
import styles from "./styles.module.scss";

export default function LpVideoManager() {
  const { t } = useTranslation();
  const TITLE = [
    t("lpVideo.userUpload"),
    t("lpVideo.workerUpload"),
    t("lpVideo.shopUpload"),
  ];
  const [updateData, setUpdateData] = useState<IVideoData[]>(
    Array.from({ length: 3 }, (_, index) => ({
      area: index + 1,
      link: "",
      is_active: false,
    }))
  );
  const [isUpdateBtnDisabled, setUpdateBtnDisabled] = useState(true);

  const saveVideosData = useMutation({
    mutationKey: ["save-video"],
    mutationFn: (videos: IVideoData[]) => saveVideo({ videos }),
    onSuccess: () => {
      CustomNotification({
        type: "success",
        message: t("notification.success"),
      });
    },
    onError: (err: any) => {
      handleErrorMessage(err);
    },
  });

  const { data: videoData, isLoading: isFetchingVideoData } = useQuery({
    queryKey: ["fetch-videos"],
    queryFn: fetchVideosData,
  });

  useEffect(() => {
    if (isFetchingVideoData || saveVideosData.isLoading)
      setUpdateBtnDisabled(true);
  }, [isFetchingVideoData, saveVideosData.isLoading]);

  useEffect(() => {
    if (!videoData) return;
    if (videoData.length < 3)
      return setUpdateData([
        ...videoData,
        ...Array.from({ length: 3 - videoData.length }, (_, index) => ({
          area: videoData.length + index + 1,
          link: "",
          is_active: false,
        })),
      ]);
    return setUpdateData([...videoData.sort((a, b) => a.area - b.area)]);
  }, [videoData]);

  const onChangeComponentData = useCallback(
    (idx: number, data: Partial<IVideoData>) => {
      setUpdateData((prev) => {
        prev[idx] = { ...prev[idx], ...data };
        return [...prev];
      });
      setUpdateBtnDisabled(false);
    },
    []
  );

  const updateVideosData = () => {
    saveVideosData.mutate({ ...updateData });
  };

  return (
    <>
      <HeaderContent
        title={t("lpVideo.title")}
        buttonAdd={{
          title: t("lpVideo.confirmBtn"),
          onClick: () => updateVideosData(),
          disabled: isUpdateBtnDisabled,
        }}
      />
      <div className={classNames(styles.contentContainer)}>
        {updateData &&
          updateData.map((e, idx) => (
            <VideoUploadComponent
              key={idx}
              index={idx}
              title={TITLE[idx]}
              value={e.link}
              isPublic={e.is_active}
              onChangeComponentData={onChangeComponentData}
            />
          ))}
      </div>
    </>
  );
}
