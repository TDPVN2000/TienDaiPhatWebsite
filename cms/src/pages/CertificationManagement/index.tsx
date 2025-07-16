import { useQuery } from "@tanstack/react-query";
import { Pagination } from "antd";
import { getCertificationApi } from "api/certification";
import HeaderContent from "components/HeaderContent";
import Loading from "components/Loading";
import { QueryKey } from "constants/enums";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import TableProjects from "./components/TableCertification";
import styles from "./styles.module.scss";

export default function CertificationManagement() {
  const [t] = useTranslation();
  useState<boolean>(false);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const {
    data: certificationData = [],
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [QueryKey.LIST_CERTIFICATION],
    queryFn: () => getCertificationApi(),
  });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const visibleCertification = certificationData.slice(startIndex, endIndex);

  const handleChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.container}>
      {isFetching && <Loading />}
      <HeaderContent
        title={t("Danh sách chứng chỉ")}
        buttonAdd={{
          title: t("Tạo thông tin chứng chỉ"),
          onClick: () => navigate("/certification-management/store"),
        }}
      />
      <div className={styles.body}>
        <div className={styles.viewFilter}>
          <div className={styles.viewTotalNotifications}>
            <span className={styles.totalNotifications}>
              Số lượng chứng chỉ: {certificationData?.length}
            </span>
          </div>
        </div>
        <div className="content-page">
          <TableProjects
            data={visibleCertification || []}
            isLoading={false}
            onRefetch={refetch}
          />

          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={certificationData.length}
            onChange={handleChange}
            className={styles.pagination}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
}
