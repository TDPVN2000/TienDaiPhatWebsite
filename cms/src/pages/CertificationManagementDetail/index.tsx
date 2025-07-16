import { useQuery } from "@tanstack/react-query";
import { getDetailCertificationApi } from "api/certification";
import HeaderContent from "components/HeaderContent";
import { InfoDetailItem } from "components/InfoDetailItem";
import Loading from "components/Loading";
import { QueryKey } from "constants/enums";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.scss";

export default function CertificationManagementDetail() {
  const [t] = useTranslation();
  const { id } = useParams();
  const navigation = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.DETAIL_CERTIFICATION, id],
    queryFn: () => getDetailCertificationApi(id),
  });

  return (
    <div className={styles.container}>
      {isLoading && <Loading />}
      <HeaderContent
        title={t("Chi tiết chứng chỉ")}
        hasBack
        buttonAdd={{
          title: t("Chỉnh sửa"),
          onClick: () => navigation(`/certification-management/store/${id}`),
          isLoading: isLoading,
        }}
      />
      <div className={styles.body}>
        <InfoDetailItem title={t("Tên chứng chỉ")} content={data?.name} />
        <InfoDetailItem title={t("Mô tả")} content={data?.description} />
        <div className={styles.thumbnail}>
          <img src={data?.image_url} alt="" />
        </div>
      </div>
    </div>
  );
}
