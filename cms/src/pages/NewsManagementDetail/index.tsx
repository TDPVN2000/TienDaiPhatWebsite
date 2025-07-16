import { useQuery } from "@tanstack/react-query";
import { getDetailNewsApi } from "api/news";
import HeaderContent from "components/HeaderContent";
import { InfoDetailItem } from "components/InfoDetailItem";
import Loading from "components/Loading";
import { QueryKey } from "constants/enums";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.scss";

export default function NewsManagementDetail() {
  const [t] = useTranslation();
  const { id } = useParams();
  const navigation = useNavigate();

  const { data: dataDetailNew = {}, isLoading } = useQuery({
    queryKey: [QueryKey.DETAIL_NEW, id],
    queryFn: () => getDetailNewsApi(id),
  });

  return (
    <div className={styles.container}>
      {isLoading && <Loading />}
      <HeaderContent
        title={t("Chi tiết bài viết")}
        hasBack
        buttonAdd={{
          title: t("Chỉnh sửa"),
          onClick: () => navigation(`/news-management/store/${id}`),
          isLoading: isLoading,
        }}
      />
      <div className={styles.body}>
        <div className={styles.thumbnail}>
          <img src={dataDetailNew?.image} alt="" />
        </div>
        <InfoDetailItem
          title={t("Tiêu đề bài viểt")}
          content={dataDetailNew?.title}
        />
        <InfoDetailItem
          title={t("Mô tả")}
          content={dataDetailNew?.description}
        />
        <InfoDetailItem
          title={t("Nội dung bài viết")}
          content={
            <span
              dangerouslySetInnerHTML={{
                __html: dataDetailNew?.content
                  ?.replace(/\\"/g, '"')
                  ?.replace(/\\n/g, ""),
              }}
            />
          }
        />
      </div>
    </div>
  );
}
