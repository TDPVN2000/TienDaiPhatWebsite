import { useTranslation } from "react-i18next";
import { InfoDetailItem } from "components/InfoDetailItem";
import styles from "./styles.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { QueryKey } from "constants/enums";
import { useQuery } from "@tanstack/react-query";
import { getDetailNotifyApi } from "api/notify";
import Loading from "components/Loading";
import HeaderContent from "components/HeaderContent";
import { getDetailProjectsApi } from "api/projects";
import { formatDate, formatYearMonthDay } from "utils/helper";

export default function ProjectsManagementDetail() {
  const [t] = useTranslation();
  const { id } = useParams();
  const navigation = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.DETAIL_PROJECT, id],
    queryFn: () => getDetailProjectsApi(id),
  });

  return (
    <div className={styles.container}>
      {isLoading && <Loading />}
      <HeaderContent
        title={t("Chi tiết dự án")}
        hasBack
        buttonAdd={{
          title: t("Chỉnh sửa"),
          onClick: () => navigation(`/projects-management/store/${id}`),
          isLoading: isLoading,
        }}
      />
      <div className={styles.body}>
        <InfoDetailItem title={t("Tên dự án")} content={data?.name} />
        <InfoDetailItem title={t("Mô tả")} content={data?.description} />
        <InfoDetailItem
          title={t("Thời gian tạo bài viết")}
          content={formatYearMonthDay(data?.created_at, formatDate)}
        />
        <div className={styles.thumbnail}>
          <img src={data?.image_url} alt="" />
        </div>
      </div>
    </div>
  );
}
