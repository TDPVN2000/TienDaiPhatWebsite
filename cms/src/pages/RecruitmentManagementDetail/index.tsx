import { useQuery } from "@tanstack/react-query";
import { getDetailRecruitmentApi } from "api/recruitment";
import HeaderContent from "components/HeaderContent";
import { InfoDetailItem } from "components/InfoDetailItem";
import Loading from "components/Loading";
import { QueryKey } from "constants/enums";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.scss";

export default function RecruitmentManagementDetail() {
  const [t] = useTranslation();
  const { id } = useParams();
  const navigation = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.DETAIL_RECRUITMENT, id],
    queryFn: () => getDetailRecruitmentApi(id),
  });

  return (
    <div className={styles.container}>
      {isLoading && <Loading />}
      <HeaderContent
        title={t("Chi tiết tuyển dụng")}
        hasBack
        buttonAdd={{
          title: t("Chỉnh sửa"),
          onClick: () => navigation(`/recruitment-management/store/${id}`),
          isLoading: isLoading,
        }}
      />
      <div className={styles.body}>
        <div className={styles.thumbnail}>
          <img src={data?.image} alt="" />
        </div>
        <InfoDetailItem
          title={t("Vị trí tuyển dụng")}
          content={data?.position}
        />
        <InfoDetailItem title={t("Địa chỉ làm việc")} content={data?.address} />
        <InfoDetailItem title={t("Trạng thái")} content={data?.status} />
        <InfoDetailItem
          title={t("Mô tả công việc")}
          content={
            <span
              dangerouslySetInnerHTML={{
                __html: data?.des_position,
              }}
            />
          }
        />
      </div>
    </div>
  );
}
